import { describe, it, expect, vi, beforeEach } from "vitest";
import { formatarCep, limparCep, buscarEnderecoPorCep } from "./viaCepService";

describe("viaCepService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("formatarCep e limparCep", () => {
    it("deve formatar CEP com máscara 00000-000", () => {
      expect(formatarCep("01001000")).toBe("01001-000");
      expect(formatarCep("01001-000")).toBe("01001-000");
      expect(formatarCep("123")).toBe("123");
    });

    it("deve limpar caracteres não numéricos do CEP", () => {
      expect(limparCep("01001-000")).toBe("01001000");
      expect(limparCep("CEP: 30.130-100")).toBe("30130100");
    });
  });

  describe("buscarEnderecoPorCep", () => {
    it("deve rejeitar CEP com menos de 8 dígitos", async () => {
      await expect(buscarEnderecoPorCep("12345")).rejects.toThrow(
        "O CEP deve conter 8 dígitos."
      );
    });

    it("deve retornar dados mapeados com sucesso ao consultar ViaCEP", async () => {
      const mockViaCepResponse = {
        cep: "01001-000",
        logradouro: "Praça da Sé",
        bairro: "Sé",
        localidade: "São Paulo",
        uf: "SP",
      };

      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => mockViaCepResponse,
        })
      );

      const resultado = await buscarEnderecoPorCep("01001000");

      expect(resultado).toEqual({
        cep: "01001-000",
        rua: "Praça da Sé",
        bairro: "Sé",
        cidade: "São Paulo",
        estado: "SP",
      });
      expect(fetch).toHaveBeenCalledWith("https://viacep.com.br/ws/01001000/json/");
    });

    it("deve lançar erro quando o CEP não for encontrado (erro: true)", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({ erro: true }),
        })
      );

      await expect(buscarEnderecoPorCep("99999999")).rejects.toThrow("CEP não encontrado.");
    });
  });
});
