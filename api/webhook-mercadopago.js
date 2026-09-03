import { MercadoPagoConfig, Payment } from "mercadopago";
import { supabaseAdmin } from "./_lib/supabase.js";

/**
 * Webhook do Mercado Pago.
 *
 * SEGURANÇA: nunca confiamos cegamente no payload recebido. Usamos apenas o
 * `data.id` do pagamento e re-buscamos o pagamento real via API, evitando
 * notificações forjadas.
 *
 * Quando o pagamento é aprovado, também notificamos o admin via WhatsApp,
 * usando a Evolution API.
 */
const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

function mapearStatus(statusMercadoPago) {
  if (statusMercadoPago === "approved") return "aprovado";
  if (statusMercadoPago === "rejected") return "rejeitado";
  return "pendente";
}

/** Resolve o nome do cliente (metadata do auth, com fallback para o e-mail). */
async function buscarNomeCliente(userId) {
  if (!userId) return "";
  try {
    const { data } = await supabaseAdmin.auth.admin.getUserById(userId);
    const user = data?.user;
    return (
      user?.user_metadata?.name ||
      user?.user_metadata?.full_name ||
      user?.email ||
      ""
    );
  } catch (e) {
    console.warn("[webhook] Falha ao obter dados do usuário:", e.message);
    return "";
  }
}

/** Envia a notificação de pedido aprovado ao admin via Evolution API. */
async function notificarAdminWhatsApp(pedido, cliente) {
  const apiUrl = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;
  const instancia = process.env.EVOLUTION_INSTANCE;
  const numero = process.env.SEU_NUMERO_WHATSAPP;

  // Sem configuração, não tenta enviar (não quebra o webhook em dev).
  if (!apiUrl || !apiKey || !instancia || !numero) {
    console.warn("[webhook] Evolution API não configurada; notificação ignorada.");
    return;
  }

  const freteValor = Number(pedido.frete_valor || 0).toFixed(2).replace(".", ",");
  const total = Number(pedido.total || 0).toFixed(2).replace(".", ",");
  const freteTipo = pedido.frete || "—";
  const cupom = pedido.cupom || "Nenhum";

  const text = [
    "🛍️ *Novo Pedido Confirmado!*",
    "",
    `*ID do Pedido:* ${pedido.id}`,
    `*Cliente:* ${cliente || "—"}`,
    `*Frete:* R$ ${freteValor} (${freteTipo})`,
    `*Cupom Utilizado:* ${cupom}`,
    `*Total:* R$ ${total}`,
  ].join("\n");

  try {
    const url = `${apiUrl.replace(/\/+$/, "")}/message/sendText/${instancia}`;
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify({ number: numero, text }),
    });

    if (!resposta.ok) {
      console.error("[webhook] Evolution API retornou status:", resposta.status);
    }
  } catch (e) {
    console.error("[webhook] Falha ao notificar WhatsApp:", e.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = req.body || {};
    const type = body.type || req.query.type;
    const paymentId = body.data?.id || req.query["data.id"];
    const requestId = body.id || req.headers["x-request-id"] || null;

    if (type !== "payment" || !paymentId) {
      return res.status(200).json({ received: true });
    }

    const payment = new Payment(mpClient);
    // Re-busca o pagamento real (não confia no payload).
    const pagamento = await payment.get({ id: paymentId });

    const orderId = pagamento.external_reference;
    const statusMapeado = mapearStatus(pagamento.status);

    if (!orderId) {
      console.warn("[webhook] Pagamento sem external_reference:", { paymentId, requestId });
      return res.status(200).json({ received: true });
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status: statusMapeado })
      .eq("id", orderId);

    if (error) {
      console.error("[webhook] Erro ao atualizar pedido:", error.message);
    } else {
      console.log("[webhook] Pedido atualizado:", { orderId, status: statusMapeado, requestId });
    }

    // Notificação via WhatsApp apenas quando o pagamento for aprovado.
    if (pagamento.status === "approved") {
      const { data: pedido } = await supabaseAdmin
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (pedido) {
        const cliente = await buscarNomeCliente(pedido.user_id);
        await notificarAdminWhatsApp(pedido, cliente);
      }
    }

    return res.status(200).json({ received: true });
  } catch (e) {
    // Sempre responde 200 para o Mercado Pago não re-enviar infinitamente.
    console.error("[webhook] Erro:", e);
    return res.status(200).json({ received: true });
  }
}