import { supabase, isSupabaseConfigured } from "./supabase";

/**
 * Serviço de persistência e gerenciamento de endereços com Supabase
 * e suporte a fallback local
 */

// Regex semântica de UUID (v1-v5), usada para evitar queries com IDs inválidos.
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function listarEnderecos(userId) {
  // Valida antes de consultar: sem userId (undefined/null) ou sem UUID válido,
  // retorna vazio sem chamar o Supabase (evita erro na FK uuid).
  if (!userId || (isSupabaseConfigured && !UUID_REGEX.test(String(userId)))) {
    return [];
  }

  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) return data;
    }

    // Fallback de desenvolvimento local
    const dadosLocais = localStorage.getItem(`mg_mantos_enderecos_${userId}`);
    return dadosLocais ? JSON.parse(dadosLocais) : [];
  } catch (error) {
    console.error("Erro Supabase Endereços:", error);
    const dadosLocais = localStorage.getItem(`mg_mantos_enderecos_${userId}`);
    return dadosLocais ? JSON.parse(dadosLocais) : [];
  }
}

export async function salvarEndereco(userId, dados) {
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  const novoEndereco = {
    user_id: userId,
    cep: String(dados.cep || "").replace(/\D/g, ""),
    rua: String(dados.rua || "").trim(),
    numero: String(dados.numero || "").trim(),
    complemento: String(dados.complemento || "").trim(),
    bairro: String(dados.bairro || "").trim(),
    cidade: String(dados.cidade || "").trim(),
    estado: String(dados.estado || "").trim().toUpperCase(),
    is_default: Boolean(dados.is_default),
  };

  if (
    !novoEndereco.cep ||
    !novoEndereco.rua ||
    !novoEndereco.numero ||
    !novoEndereco.bairro ||
    !novoEndereco.cidade ||
    !novoEndereco.estado
  ) {
    throw new Error("Preencha todos os campos obrigatórios do endereço.");
  }

  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("addresses")
        .insert([novoEndereco])
        .select()
        .single();

      if (error) throw error;
      if (data) return data;
    }

    // Fallback local caso Supabase não esteja configurado
    const mockEndereco = {
      id: "end-" + Date.now(),
      ...novoEndereco,
      created_at: new Date().toISOString(),
    };
    const dadosLocais = localStorage.getItem(`mg_mantos_enderecos_${userId}`);
    const listaAtual = dadosLocais ? JSON.parse(dadosLocais) : [];
    const listaAtualizada = [mockEndereco, ...listaAtual.filter((e) => e.id !== mockEndereco.id)];
    localStorage.setItem(`mg_mantos_enderecos_${userId}`, JSON.stringify(listaAtualizada));
    return mockEndereco;
  } catch (error) {
    console.warn("[addressService] Erro ao salvar endereço no Supabase:", error?.message || error);

    // Se estiver em dev ou erro de rede, salva localmente para não travar o fluxo
    if (import.meta.env.DEV || String(error?.message || "").includes("fetch failed")) {
      const mockEndereco = {
        id: "end-" + Date.now(),
        ...novoEndereco,
        created_at: new Date().toISOString(),
      };
      const dadosLocais = localStorage.getItem(`mg_mantos_enderecos_${userId}`);
      const listaAtual = dadosLocais ? JSON.parse(dadosLocais) : [];
      const listaAtualizada = [mockEndereco, ...listaAtual.filter((e) => e.id !== mockEndereco.id)];
      localStorage.setItem(`mg_mantos_enderecos_${userId}`, JSON.stringify(listaAtualizada));
      return mockEndereco;
    }

    throw error;
  }
}

export async function removerEndereco(enderecoId, userId) {
  if (!enderecoId || !userId) return;

  try {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from("addresses")
        .delete()
        .eq("id", enderecoId)
        .eq("user_id", userId);

      if (error) throw error;
    }

    const dadosLocais = localStorage.getItem(`mg_mantos_enderecos_${userId}`);
    if (dadosLocais) {
      const filtrados = JSON.parse(dadosLocais).filter((e) => e.id !== enderecoId);
      localStorage.setItem(`mg_mantos_enderecos_${userId}`, JSON.stringify(filtrados));
    }
  } catch (error) {
    console.warn("[addressService] Erro ao excluir endereço:", error);
    const dadosLocais = localStorage.getItem(`mg_mantos_enderecos_${userId}`);
    if (dadosLocais) {
      const filtrados = JSON.parse(dadosLocais).filter((e) => e.id !== enderecoId);
      localStorage.setItem(`mg_mantos_enderecos_${userId}`, JSON.stringify(filtrados));
    }
  }
}
