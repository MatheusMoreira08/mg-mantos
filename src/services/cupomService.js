/**
 * Regras do cupom MARINGALOCAL (retirada/entrega local com frete grátis).
 * O cupom só é válido para endereços de Maringá e Nova Esperança (PR),
 * validados pela cidade OU pela faixa de CEP.
 */

export const CUPOM_LOCAL = "MARINGALOCAL";

/** Faixas de CEP atendidas (Maringá e Nova Esperança). */
export function cepEhLocal(cep = "") {
  const c = String(cep ?? "").replace(/\D/g, "");
  if (c.length !== 8) return false;
  const n = Number(c);
  // Maringá: 87000-000 a 87110-999 | Nova Esperança: 87160-000 a 87169-999
  return (n >= 87000000 && n <= 87109999) || (n >= 87160000 && n <= 87169999);
}

/** Valida a cidade (ignora acentos/caixa). */
export function cidadeEhLocal(cidade = "") {
  const c = String(cidade ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return c === "maringa" || c === "nova esperanca";
}

/** Um endereço é elegível ao cupom local por cidade OU por CEP. */
export function enderecoEhLocal(endereco) {
  if (!endereco) return false;
  return cidadeEhLocal(endereco.cidade) || cepEhLocal(endereco.cep);
}

/**
 * Valida o cupom MARINGALOCAL contra o endereço selecionado.
 * Retorna true apenas se o código for o cupom local E o endereço for elegível.
 */
export function cupomLocalValido(codigo, endereco) {
  if (String(codigo ?? "").trim().toUpperCase() !== CUPOM_LOCAL) return false;
  return enderecoEhLocal(endereco);
}