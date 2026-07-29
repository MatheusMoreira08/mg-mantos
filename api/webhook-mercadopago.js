import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@supabase/supabase-js";

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function mapearStatus(statusMercadoPago) {
  if (statusMercadoPago === "approved") return "aprovado";
  if (statusMercadoPago === "rejected") return "rejeitado";
  return "pendente";
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

    if (type !== "payment" || !paymentId) {
      return res.status(200).json({ received: true });
    }

    const payment = new Payment(mpClient);
    const pagamento = await payment.get({ id: paymentId });

    const orderId = pagamento.external_reference;
    const statusMapeado = mapearStatus(pagamento.status);

    if (orderId) {
      const { error } = await supabaseAdmin
        .from("orders")
        .update({ status: statusMapeado })
        .eq("id", orderId);

      if (error) {
        console.error("Erro ao atualizar pedido no Supabase:", error.message);
      }
    }

    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("Erro no webhook do Mercado Pago:", e);
    return res.status(200).json({ received: true });
  }
}
