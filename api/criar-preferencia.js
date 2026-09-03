import { MercadoPagoConfig, Preference } from "mercadopago";
import { supabaseAdmin } from "./_lib/supabase.js";
import { calcularOpcoesFrete, selecionarFrete } from "./_lib/frete.js";

/**
 * Cria a preferência de pagamento do Mercado Pago (Checkout Pro).
 *
 * SEGURANÇA: este endpoint NUNCA confia em preços/frete enviados pelo frontend.
 * Todo o cálculo é refeito do lado do servidor:
 *  - Preços dos produtos: lidos direto da tabela `products` (fonte da verdade).
 *  - Frete: recalculado via Melhor Envio usando o CEP do endereço do pedido.
 *  - Total: subtotal (autoritativo) + frete (autoritativo).
 *
 * Body esperado: { orderId, freteId, cupom }
 *  - orderId: ID do pedido recém-criado na tabela `orders`.
 *  - freteId: ID da opção de frete escolhida no checkout (apenas para seleção;
 *             o VALOR é sempre recalculado aqui).
 *  - cupom:   código do cupom aplicado (ex.: "MARINGALOCAL"). Quando presente,
 *             o frete é zerado e o envio vira "Retirada/Entrega Local (Maringá)".
 */

// Cupom que zera o frete (retirada/entrega local em Maringá).
const CUPOM_LOCAL = "MARINGALOCAL";

const FRETE_LOCAL = {
  id: CUPOM_LOCAL.toLowerCase(),
  name: "Retirada/Entrega Local (Maringá)",
  price: 0,
};

// Regras de elegibilidade do cupom local (Maringá e Nova Esperança).
function cepEhLocal(cep = "") {
  const c = String(cep || "").replace(/\D/g, "");
  if (c.length !== 8) return false;
  const n = Number(c);
  // Maringá: 87000-000 a 87110-999 | Nova Esperança: 87160-000 a 87169-999
  return (n >= 87000000 && n <= 87109999) || (n >= 87160000 && n <= 87169999);
}

function cidadeEhLocal(cidade = "") {
  const c = String(cidade || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return c === "maringa" || c === "nova esperanca";
}

function enderecoEhLocal(endereco) {
  if (!endereco) return false;
  return cidadeEhLocal(endereco.cidade) || cepEhLocal(endereco.cep);
}

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const origin = req.headers?.origin || "";
  const { orderId, freteId, cupom } = req.body || {};

  // Normaliza o cupom enviado (case-insensitive, sem espaços).
  const cupomAplicado = String(cupom || "").trim().toUpperCase();
  const usarRetiradaLocal = cupomAplicado === CUPOM_LOCAL;

  if (!orderId) {
    return res.status(400).json({ error: "Missing required field: orderId" });
  }

  try {
    // 1. Carrega o pedido (retorna 404 se não existir).
    const { data: pedido, error: erroPedido } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (erroPedido || !pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    // 2. Lê os itens do pedido (apenas referência de produto + quantidade).
    const { data: itens, error: erroItens } = await supabaseAdmin
      .from("order_items")
      .select("product_id, quantidade")
      .eq("order_id", orderId);

    if (erroItens || !itens || itens.length === 0) {
      return res.status(400).json({ error: "Pedido sem itens." });
    }

    // 3. Preços AUTORITATIVOS dos produtos direto do banco (ignora o frontend).
    const idsProdutos = itens.map((i) => i.product_id);
    const { data: produtos, error: erroProdutos } = await supabaseAdmin
      .from("products")
      .select("id, name, price")
      .in("id", idsProdutos);

    if (erroProdutos || !produtos || produtos.length === 0) {
      return res.status(400).json({ error: "Produtos não encontrados." });
    }

    const produtoPorId = new Map(produtos.map((p) => [String(p.id), p]));

    let subtotal = 0;
    const mpItems = [];

    for (const item of itens) {
      const prod = produtoPorId.get(String(item.product_id));
      if (!prod) {
        return res.status(400).json({ error: `Produto inválido: ${item.product_id}` });
      }

      const quantidade = Math.max(1, Number(item.quantidade) || 1);
      const unitPrice = Number(prod.price) || 0;

      subtotal += unitPrice * quantidade;

      mpItems.push({
        id: String(prod.id),
        title: prod.name,
        quantity: quantidade,
        unit_price: unitPrice,
        currency_id: "BRL",
      });
    }

    // 4. Frete: busca o endereço do pedido (para validação do cupom local e
    //    cálculo de frete autoritativo).
    let endereco = null;
    if (pedido.address_id) {
      const { data } = await supabaseAdmin
        .from("addresses")
        .select("cep, cidade")
        .eq("id", pedido.address_id)
        .single();
      endereco = data;
    }

    let frete = null;
    if (usarRetiradaLocal) {
      // Cupom MARINGALOCAL: só é válido para Maringá/Nova Esperança.
      if (!enderecoEhLocal(endereco)) {
        return res.status(400).json({
          error: "O cupom MARINGALOCAL é válido apenas para Maringá e Nova Esperança.",
        });
      }
      frete = FRETE_LOCAL;
    } else if (endereco?.cep) {
      const cepLimpo = String(endereco.cep).replace(/\D/g, "");
      const opcoes = await calcularOpcoesFrete(cepLimpo);
      frete = selecionarFrete(opcoes, freteId);
    }

    if (!frete) {
      return res.status(400).json({ error: "Não foi possível determinar o frete." });
    }

    const total = subtotal + frete.price;

    // 5. Persiste os valores AUTORITATIVOS no pedido (sobrescreve o que o front
    //    enviou, eliminando qualquer tentativa de manipulação de preço).
    const { error: erroUpdate } = await supabaseAdmin
      .from("orders")
      .update({
        total,
        frete: frete.name,
        frete_valor: frete.price,
        cupom: usarRetiradaLocal ? CUPOM_LOCAL : null,
      })
      .eq("id", orderId);

    if (erroUpdate) {
      console.error("[preferencia] Erro ao atualizar pedido:", erroUpdate.message);
    }

    // 6. E-mail do pagador (do Supabase Auth, com fallback ao corpo).
    let payerEmail = "";
    try {
      if (pedido.user_id) {
        const { data: userData } = await supabaseAdmin.auth.admin.getUserById(pedido.user_id);
        payerEmail = userData?.user?.email || "";
      }
    } catch (e) {
      console.warn("[preferencia] Falha ao obter e-mail do usuário:", e.message);
    }
    if (!payerEmail) {
      payerEmail = req.body?.email || "";
    }

    // 7. Cria a preferência com o frete explícito no custo de envio (shipments).
    const preference = new Preference(mpClient);
    const response = await preference.create({
      body: {
        external_reference: orderId,
        items: mpItems,
        ...(payerEmail ? { payer: { email: payerEmail } } : {}),
        shipments: {
          mode: "not_specified",
          cost: frete.price,
        },
        back_urls: {
          success: `${origin}/pedido-confirmado/${orderId}`,
          failure: `${origin}/carrinho`,
          pending: `${origin}/carrinho`,
        },
        auto_return: "approved",
      },
    });

    return res.status(200).json({ init_point: response.init_point });
  } catch (e) {
    console.error("[preferencia] Erro ao criar preferência:", e);
    return res.status(500).json({
      error: e?.message || "Failed to create payment preference",
      details: e?.cause || null,
    });
  }
}