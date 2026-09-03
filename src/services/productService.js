import { supabase, isSupabaseConfigured } from "./supabase";
import localProducts from "../data/products.json";

function removerAcentos(str = "") {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Converte um ID para o tipo esperado pelo banco na inserção de itens.
 * Se o ID for numérico (ex.: bigint/integer), retorna `Number`; caso contrário
 * (uuid/texto), retorna a string original. Isso evita falha na FK
 * `order_items.product_id -> products(id)` quando a coluna é numeric.
 */
export function normalizarIdBanco(id) {
  const str = String(id ?? "").trim();
  if (/^\d+$/.test(str)) return Number(str);
  return str;
}

function normalizarProduto(item) {
  if (!item) return null;
  const image = item.image || item.imagem || "";
  const images = Array.isArray(item.images) && item.images.length > 0
    ? item.images
    : (image ? [image] : []);

  return {
    id: String(item.id),
    name: item.name || item.nome || item.title || "Manto Exclusivo",
    description: item.description || "",
    price: Number(item.price || item.preco || 129.9),
    image: image,
    images: images,
    sizes: Array.isArray(item.sizes) ? item.sizes : [],
    stock: Number.isFinite(Number(item.stock)) ? Number(item.stock) : 0,
    is_active: item.is_active !== false,
    tags: Array.isArray(item.tags) ? item.tags : [],
    badge: item.badge || (item.tags?.includes("lancamento") ? "Lançamento" : null),
  };
}

export async function getProdutos(limite = 50) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(limite);

      if (!error && data && data.length > 0) {
        return data.map(normalizarProduto);
      }
    } catch (err) {
      console.warn("[productService] Falha ao consultar Supabase, usando localProducts:", err);
    }
  }

  return localProducts.slice(0, limite).map(normalizarProduto);
}

export async function getProdutoPorId(id) {
  const targetId = String(id);
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (!error && data) {
        return normalizarProduto(data);
      }
    } catch (err) {
      console.warn("[productService] Erro ao buscar produto no Supabase:", err);
    }
  }

  const localMatch = localProducts.find((p) => String(p.id) === targetId);
  return localMatch ? normalizarProduto(localMatch) : null;
}

export async function getProdutosPorCategoria(slug) {
  const slugNormalizado = removerAcentos(slug).toLowerCase();
  const termo = slugNormalizado.replace(/-/g, " ");

  if (isSupabaseConfigured) {
    try {
      const sinonimos = {
        brasileirao: ["nacional", "brasileirao"],
        "times-internacionais": ["europeus", "internacional"],
        feminina: ["feminina"],
        selecoes: ["selecoes"],
        retro: ["retro"],
        jogador: ["jogador"],
      };

      const tagsParaBuscar = sinonimos[slugNormalizado] || [slugNormalizado];

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .or(`tags.ov.{${tagsParaBuscar.join(",")}},name.ilike.%${termo}%`);

      if (!error && data && data.length > 0) {
        return data.map(normalizarProduto);
      }
    } catch (err) {
      console.warn("[productService] Falha na busca por categoria via Supabase:", err);
    }
  }

  return localProducts
    .filter((p) => {
      const nameMatch = removerAcentos(p.name || "").toLowerCase().includes(termo);
      const tagMatch = p.tags?.some((t) =>
        removerAcentos(t).toLowerCase().includes(slugNormalizado) ||
        termo.includes(removerAcentos(t).toLowerCase())
      );
      return nameMatch || tagMatch;
    })
    .map(normalizarProduto);
}

export async function buscarProdutos(termo, limite = 8) {
  if (!termo || termo.trim().length < 2) return [];
  const termoLimpo = removerAcentos(termo.trim()).toLowerCase();

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .ilike("name", `%${termo}%`)
        .limit(limite);

      if (!error && data && data.length > 0) {
        return data.map(normalizarProduto);
      }
    } catch (err) {
      console.warn("[productService] Erro na busca via Supabase:", err);
    }
  }

  return localProducts
    .filter((p) =>
      removerAcentos(p.name || "")
        .toLowerCase()
        .includes(termoLimpo)
    )
    .slice(0, limite)
    .map(normalizarProduto);
}
