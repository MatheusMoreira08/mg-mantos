import { calcularOpcoesFrete } from "./_lib/frete.js";

/**
 * Endpoint público de cálculo de frete.
 * A origem é fixa (Maringá/PR) — definida em `_lib/frete.js` — e o destino é o
 * CEP do cliente informado no corpo da requisição.
 *
 * Body: { cepDestino: "00000000" }
 * Response: [{ id, name, price, delivery_time, prazo_entrega, estimated }]
 */
export default async function handler(req, res) {
  const origensPermitidas = (
    process.env.ALLOWED_ORIGINS ||
    "https://mg-mantos.vercel.app,https://www.mg-mantos.com.br"
  )
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  const origin = req.headers?.origin || "";

  if (origensPermitidas.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido." });
  }

  const { cepDestino } = req.body || {};
  if (!cepDestino) {
    return res.status(400).json({ erro: "CEP de destino não informado." });
  }

  const cepLimpo = String(cepDestino).replace(/\D/g, "");
  if (cepLimpo.length !== 8) {
    return res.status(400).json({ erro: "CEP de destino inválido." });
  }

  try {
    const opcoes = await calcularOpcoesFrete(cepLimpo);
    return res.status(200).json(opcoes);
  } catch (err) {
    console.error("[frete] Erro inesperado:", err.message);
    return res.status(500).json({ erro: "Falha ao calcular o frete." });
  }
}