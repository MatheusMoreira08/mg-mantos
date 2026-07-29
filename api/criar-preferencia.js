import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { orderId, items, email } = req.body || {};
  if (!orderId || !Array.isArray(items) || !email) {
    return res.status(400).json({ error: "Missing required fields: orderId, items, email" });
  }

  const mpItems = items.map((it) => ({
    title: it.nome,
    quantity: Number(it.quantidade),
    unit_price: Number(it.precoUnitario),
    currency_id: "BRL",
  }));

  const origin = req.headers?.origin || "";

  try {
    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        external_reference: orderId,
        items: mpItems,
        payer: { email },
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
    console.error("Erro ao criar preferencia no Mercado Pago:", e);
    return res.status(500).json({ error: "Failed to create payment preference" });
  }
}
