/**
 * Validação e sanitização de entradas do usuário.
 * Todas as strings que chegam do usuário (formulários, checkout, personalização)
 * DEVEM passar por estas funções antes de serem renderizadas ou persistidas,
 * prevenindo XSS, injeção e dados inválidos.
 */

/** Remove espaços extras e caracteres de controle de uma string. */
export function sanearTexto(valor = "", maxLen = 255) {
  return String(valor ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);
}

/** Sanitiza HTML básico evitando XSS em textos que possam ser renderizados. */
export function sanearHTML(valor = "") {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** E-mail válido (case-insensitive, trim). */
export function validarEmail(email = "") {
  const limpo = sanearTexto(email, 254);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(limpo) ? limpo : "";
}

/** CEP: mantém somente dígitos, valida 8 dígitos. */
export function validarCep(cep = "") {
  const limpo = String(cep ?? "").replace(/\D/g, "").slice(0, 8);
  return limpo.length === 8 ? limpo : "";
}

/** Nome de personalização de camisa: apenas letras (com acento), espaços e hífen. */
export function validarNomePersonalizacao(valor = "", maxLen = 15) {
  const limpo = String(valor ?? "")
    .normalize("NFC")
    .replace(/[^a-zA-ZÀ-ÿ\u00C0-\u024F\s'-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
  return limpo;
}

/** Número da camisa: apenas dígitos, máx 2 (0-99). */
export function validarNumeroPersonalizacao(valor = "") {
  const limpo = String(valor ?? "").replace(/\D/g, "").slice(0, 2);
  return limpo;
}

/** UF brasileira: 2 letras maiúsculas válidas. */
const UFS = new Set([
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
]);

export function validarUF(uf = "") {
  const limpo = String(uf ?? "").trim().toUpperCase().slice(0, 2);
  return UFS.has(limpo) ? limpo : "";
}

/** Preço/número: garante número não-negativo e sanitizado. */
export function validarNumero(valor, fallback = null) {
  const n = Number(valor);
  if (Number.isFinite(n) && n >= 0) return n;
  return fallback;
}