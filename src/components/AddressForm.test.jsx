import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddressForm from "./AddressForm";
import { ToastProvider } from "../context/ToastContext";
import * as viaCepService from "../services/viaCepService";

describe("Componente AddressForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("deve renderizar os campos do formulário de endereço", () => {
    render(
      <ToastProvider>
        <AddressForm onSalvar={vi.fn()} />
      </ToastProvider>
    );

    expect(screen.getByPlaceholderText(/CEP/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Rua \/ Logradouro/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Número/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Bairro/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Cidade/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/UF/i)).toBeDefined();
  });

  it("deve preencher os campos automaticamente ao digitar 8 dígitos de CEP", async () => {
    vi.spyOn(viaCepService, "buscarEnderecoPorCep").mockResolvedValue({
      cep: "01001-000",
      rua: "Praça da Sé",
      bairro: "Sé",
      cidade: "São Paulo",
      estado: "SP",
    });

    render(
      <ToastProvider>
        <AddressForm onSalvar={vi.fn()} />
      </ToastProvider>
    );

    const cepInput = screen.getByPlaceholderText(/CEP/i);
    fireEvent.change(cepInput, { target: { value: "01001000" } });

    await waitFor(() => {
      const ruaInput = screen.getByPlaceholderText(/Rua \/ Logradouro/i);
      expect(ruaInput.value).toBe("Praça da Sé");
      const bairroInput = screen.getByPlaceholderText(/Bairro/i);
      expect(bairroInput.value).toBe("Sé");
      const cidadeInput = screen.getByPlaceholderText(/Cidade/i);
      expect(cidadeInput.value).toBe("São Paulo");
      const ufInput = screen.getByPlaceholderText(/UF/i);
      expect(ufInput.value).toBe("SP");
    });
  });

  it("deve chamar onSalvar com os dados do formulário preenchidos", async () => {
    vi.spyOn(viaCepService, "buscarEnderecoPorCep").mockResolvedValue({
      cep: "30130-100",
      rua: "Avenida Afonso Pena",
      bairro: "Centro",
      cidade: "Belo Horizonte",
      estado: "MG",
    });

    const handleSalvar = vi.fn();
    render(
      <ToastProvider>
        <AddressForm onSalvar={handleSalvar} />
      </ToastProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/CEP/i), { target: { value: "30130100" } });

    await waitFor(() => {
      const ruaInput = screen.getByPlaceholderText(/Rua \/ Logradouro/i);
      expect(ruaInput.value).toBe("Avenida Afonso Pena");
    });

    fireEvent.change(screen.getByPlaceholderText(/Número/i), { target: { value: "1500" } });

    const submitBtn = screen.getByRole("button", { name: /SALVAR ENDEREÇO/i });
    expect(submitBtn.disabled).toBe(false);
    fireEvent.click(submitBtn);

    expect(handleSalvar).toHaveBeenCalledTimes(1);
    expect(handleSalvar).toHaveBeenCalledWith({
      cep: "30130-100",
      rua: "Avenida Afonso Pena",
      numero: "1500",
      bairro: "Centro",
      cidade: "Belo Horizonte",
      estado: "MG",
    });
  });
});
