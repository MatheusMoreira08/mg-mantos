import { describe, it, expect, vi, beforeEach } from "vitest";
import { listarEnderecos, salvarEndereco, removerEndereco } from "./addressService";
import { supabase } from "./supabase";

// UUID válido para os testes que exercitam o caminho do Supabase.
const UUID_VALIDO = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

describe("addressService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("deve retornar array vazio se userId não for fornecido", async () => {
    const res = await listarEnderecos(null);
    expect(res).toEqual([]);
  });

  it("deve retornar array vazio se userId não for um UUID válido", async () => {
    const res = await listarEnderecos("nao-e-um-uuid");
    expect(res).toEqual([]);
  });

  it("deve salvar e listar endereços com sucesso via Supabase", async () => {
    const mockEndereco = {
      id: "addr-1",
      user_id: UUID_VALIDO,
      cep: "01001000",
      rua: "Praça da Sé",
      numero: "100",
      bairro: "Sé",
      cidade: "São Paulo",
      estado: "SP",
    };

    vi.spyOn(supabase, "from").mockImplementation((table) => {
      if (table === "addresses") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({ data: [mockEndereco], error: null }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: mockEndereco, error: null }),
            }),
          }),
          delete: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockResolvedValue({ error: null }),
            }),
          }),
        };
      }
      return {};
    });

    const enderecoSalvo = await salvarEndereco(UUID_VALIDO, {
      cep: "01001-000",
      rua: "Praça da Sé",
      numero: "100",
      bairro: "Sé",
      cidade: "São Paulo",
      estado: "SP",
    });

    expect(enderecoSalvo).toEqual(mockEndereco);

    const lista = await listarEnderecos(UUID_VALIDO);
    expect(lista).toEqual([mockEndereco]);
  });

  it("deve salvar e listar endereços com fallback local se o Supabase falhar", async () => {
    vi.spyOn(supabase, "from").mockImplementation(() => {
      throw new Error("fetch failed");
    });

    const dadosEndereco = {
      cep: "01001-000",
      rua: "Praça da Sé",
      numero: "100",
      bairro: "Sé",
      cidade: "São Paulo",
      estado: "SP",
    };

    const enderecoSalvo = await salvarEndereco(UUID_VALIDO, dadosEndereco);

    expect(enderecoSalvo).toBeDefined();
    expect(enderecoSalvo.rua).toBe("Praça da Sé");
    expect(enderecoSalvo.numero).toBe("100");
    expect(enderecoSalvo.user_id).toBe(UUID_VALIDO);

    const lista = await listarEnderecos(UUID_VALIDO);
    expect(lista.length).toBe(1);
    expect(lista[0].id).toBe(enderecoSalvo.id);
  });

  it("deve validar campos obrigatórios ao salvar endereço", async () => {
    await expect(
      salvarEndereco(UUID_VALIDO, {
        cep: "01001-000",
        rua: "",
        numero: "100",
        bairro: "Sé",
        cidade: "São Paulo",
        estado: "SP",
      })
    ).rejects.toThrow("Preencha todos os campos obrigatórios");
  });

  it("deve remover endereço cadastrado", async () => {
    vi.spyOn(supabase, "from").mockImplementation(() => {
      throw new Error("fetch failed");
    });

    const endereco = await salvarEndereco(UUID_VALIDO, {
      cep: "01001-000",
      rua: "Rua Teste",
      numero: "123",
      bairro: "Centro",
      cidade: "Belo Horizonte",
      estado: "MG",
    });

    let lista = await listarEnderecos(UUID_VALIDO);
    expect(lista.length).toBe(1);

    await removerEndereco(endereco.id, UUID_VALIDO);
    lista = await listarEnderecos(UUID_VALIDO);
    expect(lista.length).toBe(0);
  });
});