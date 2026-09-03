import { supabase } from "./supabase";

/**
 * Serviços do painel administrativo.
 * As operações de escrita dependem das políticas RLS criadas na migration
 * 0003 (apenas administradores com user_metadata.is_admin = true).
 */

/** Verifica se o usuário atual é administrador. */
export async function isCurrentUserAdmin() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const meta = session?.user?.user_metadata;
    return Boolean(meta?.is_admin === true || meta?.is_admin === "true");
  } catch {
    return false;
  }
}

/** Rol do usuário atual (útil para a guarda de rota). */
export async function getUserRole() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) return "anon";
  return session.user.user_metadata?.is_admin ? "admin" : "comum";
}

/** Lista TODOS os produtos (incluindo inativos), para o painel. */
export async function listarProdutos() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/** Atualiza um produto (preço, estoque, título, etc.). */
export async function atualizarProduto(id, patch) {
  const { data, error } = await supabase
    .from("products")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Cria um novo produto. */
export async function criarProduto(payload) {
  // Gera um id numérico único (timestamp em ms) quando o formulário não
  // informa. Isso garante compatibilidade com `products.id` do tipo int8/bigint,
  // que não é auto-increment (identity) na tabela atual.
  const novo = {
    ...payload,
    id: payload?.id ?? Date.now(),
  };

  const { data, error } = await supabase
    .from("products")
    .insert([novo])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Exclui um produto. */
export async function excluirProduto(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

/**
 * Faz upload de uma imagem para o bucket `products` do Storage e retorna a
 * URL pública. O bucket deve existir no Supabase (Storage > new bucket).
 */
export async function uploadImagemProduto(file) {
  if (!file) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const caminho = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(caminho, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from("products").getPublicUrl(caminho);
  return data?.publicUrl || null;
}

/** Remove uma imagem do bucket pelo caminho/URL pública. */
export async function removerImagemProduto(caminho) {
  const { error } = await supabase.storage.from("products").remove([caminho]);
  if (error) throw error;
}