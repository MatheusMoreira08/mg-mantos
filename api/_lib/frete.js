/**
 * Lógica compartilhada de frete.
 *
 * Modelo de negócio: as camisas são adquiridas via agente (CSSBuy), chegam no
 * galpão de conferência em Maringá/PR e, então, são despachadas ao cliente via
 * Correios/Transportadora. Por isso:
 *  - O CEP de ORIGEM é fixo (Maringá/PR).
 *  - O prazo entregue ao cliente = preparação/importação + prazo da transportadora.
 */

// CEP de origem fixo: galpão de conferência em Maringá/PR.
const CEP_ORIGEM = "87030201";

/**
 * Prazo TOTAL de envio (importação/preparação + transporte) exibido ao cliente,
 * definido por tipo de método de envio:
 *  - PAC (Envio Nacional)          -> 15 a 25 dias úteis
 *  - SEDEX / Expresso / Local      -> 15 a 20 dias úteis
 */
function prazoEntregaParaMetodo(name = "") {
  const n = String(name || "").toUpperCase();
  if (n.includes("PAC")) return "15 a 25";
  return "15 a 20";
}

/**
 * Opções estimadas (fallback) usadas quando o token da Melhor Envio não está
 * configurado. Mantêm preços/prazos aceitáveis para não travar o checkout.
 */
const OPCOES_ESTIMADAS = [
  { id: "pac", name: "PAC (Econômico)", price: 14.9, min: 4, max: 7 },
  { id: "sedex", name: "SEDEX (Expresso)", price: 24.9, min: 2, max: 3 },
  { id: "jadlog-package", name: "JADLOG PACKAGE", price: 19.9, min: 5, max: 7 },
  { id: "jadlog-com", name: "JADLOG COM", price: 22.9, min: 4, max: 6 },
  { id: "total-express", name: "TOTAL EXPRESS", price: 21.9, min: 4, max: 6 },
  { id: "buslog", name: "BUSLOG", price: 18.9, min: 6, max: 8 },
];

export function opcoesFreteEstimadas() {
  return OPCOES_ESTIMADAS.map((o) => ({
    id: o.id,
    name: o.name,
    price: o.price,
    delivery_time: `${o.min} a ${o.max}`,
    prazo_entrega: prazoEntregaParaMetodo(o.name),
    estimated: true,
  }));
}

/** Normaliza a resposta bruta da Melhor Envio para um formato único e estável. */
function normalizarMelhorEnvio(data) {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data
    .map((o) => {
      const id = String(o.company?.id ?? o.id ?? "");
      const price = Number(o.price);
      if (!id || !Number.isFinite(price)) return null;

      const min = Number(o.custom_delivery_range?.min ?? o.delivery_time ?? 0);
      const max = Number(o.custom_delivery_range?.max ?? o.delivery_time ?? min);

      const name = o.name || o.company?.name || "Frete";

      return {
        id,
        name,
        price,
        delivery_time: min === max ? `${min}` : `${min} a ${max}`,
        prazo_entrega: prazoEntregaParaMetodo(name),
        estimated: false,
      };
    })
    .filter(Boolean);
}

/**
 * Calcula as opções de frete disponíveis para um CEP de destino.
 * Retorna `[{ id, name, price, delivery_time, prazo_entrega, estimated }]`.
 */
export async function calcularOpcoesFrete(cepLimpo) {
  const token = process.env.MELHOR_ENVIO_TOKEN;

  if (!token) {
    return opcoesFreteEstimadas();
  }

  const payload = {
    from: { postal_code: CEP_ORIGEM },
    to: { postal_code: cepLimpo },
    products: [
      {
        id: "manto",
        width: 20,
        height: 5,
        length: 25,
        weight: 0.3,
        insurance_value: 129.9,
        quantity: 1,
      },
    ],
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(
      "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "User-Agent": "MGMantos",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    if (!response.ok) {
      console.error("[frete] Melhor Envio retornou status:", response.status);
      return opcoesFreteEstimadas();
    }

    const data = await response.json();
    const opcoes = normalizarMelhorEnvio(data);
    return opcoes.length > 0 ? opcoes : opcoesFreteEstimadas();
  } catch (err) {
    console.error("[frete] Erro/timeout na Melhor Envio:", err.message);
    return opcoesFreteEstimadas();
  }
}

/**
 * Seleciona a opção de frete escolhida pelo cliente a partir do ID enviado.
 * Se o ID não for encontrado, usa a primeira opção disponível (authoritative).
 */
export function selecionarFrete(opcoes, freteId) {
  if (!Array.isArray(opcoes) || opcoes.length === 0) return null;
  const encontrada = opcoes.find((o) => o.id === String(freteId));
  return encontrada || opcoes[0];
}