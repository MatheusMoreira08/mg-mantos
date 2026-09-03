/**
 * Serviço de frete do frontend.
 * Consulta a API serverless `/api/frete` (origem fixa em Maringá/PR) e devolve
 * as opções normalizadas para exibição e seleção no checkout.
 *
 * Cada opção tem o formato:
 * { id, name, price, delivery_time, prazo_entrega, estimated }
 *  - delivery_time: prazo apenas da transportadora (ex: "4 a 7" dias).
 *  - prazo_entrega: prazo TOTAL exibido ao cliente ("15 a 25" ou "15 a 20" dias úteis).
 */

import { formatarCep } from "./viaCepService";

/** Garante que uma opção tenha todos os campos esperados pelo frontend. */
function normalizarOpcao(opcao, indice) {
  const price = typeof opcao.price === "string"
    ? Number(opcao.price.replace(",", "."))
    : Number(opcao.price);

  return {
    id: String(opcao.id ?? `frete-${indice}`),
    name: opcao.name || "Frete",
    price: Number.isFinite(price) ? price : 0,
    delivery_time: opcao.delivery_time ?? null,
    prazo_entrega: opcao.prazo_entrega ?? opcao.delivery_time ?? null,
    estimated: Boolean(opcao.estimated),
  };
}

/**
 * Consulta o frete para um CEP. Lança erro apenas para CEP inválido; falhas de
 * rede/backend retornam um fallback estimado para não bloquear a compra.
 */
export async function calcularFrete(cep) {
  const cepLimpo = String(cep ?? "").replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    throw new Error("O CEP deve conter 8 dígitos.");
  }

  try {
    const res = await fetch("/api/frete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cepDestino: cepLimpo }),
    });

    if (!res.ok) {
      throw new Error(`Falha no cálculo de frete (${res.status}).`);
    }

    const data = await res.json();

    let opcoes = [];
    if (Array.isArray(data)) {
      opcoes = data.map(normalizarOpcao);
    } else if (data && Array.isArray(data.opcoes)) {
      opcoes = data.opcoes.map(normalizarOpcao);
    }

    if (opcoes.length > 0) return { cep: formatarCep(cepLimpo), opcoes };
    throw new Error("Nenhuma opção de frete retornada.");
  } catch {
    // Fallback estimado (mantém a origem fixa e o prazo total comunicado).
    return {
      cep: formatarCep(cepLimpo),
      opcoes: [
        {
          id: "estimado-pac",
          name: "PAC (Econômico)",
          price: 14.9,
          delivery_time: "4 a 7",
          prazo_entrega: "15 a 25",
          estimated: true,
        },
        {
          id: "estimado-sedex",
          name: "SEDEX (Expresso)",
          price: 24.9,
          delivery_time: "2 a 3",
          prazo_entrega: "15 a 20",
          estimated: true,
        },
      ],
    };
  }
}