/**
 * Utilitários para tratamento e consulta de CEP via API do ViaCEP
 */

export function formatarCep(valor = "") {
  const digits = valor.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return digits;
}

export function limparCep(cep = "") {
  return cep.replace(/\D/g, "").slice(0, 8);
}

export async function buscarEnderecoPorCep(cep) {
  const cepLimpo = limparCep(cep);

  if (cepLimpo.length !== 8) {
    throw new Error("O CEP deve conter 8 dígitos.");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

  if (!response.ok) {
    throw new Error("Não foi possível conectar ao serviço de CEP.");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  return {
    cep: formatarCep(data.cep || cepLimpo),
    rua: data.logradouro || "",
    bairro: data.bairro || "",
    cidade: data.localidade || "",
    estado: data.uf || "",
  };
}
