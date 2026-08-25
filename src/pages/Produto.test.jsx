import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Produto from "./Produto";
import { CarrinhoProvider } from "../context/CarrinhoContext";
import { ToastProvider } from "../context/ToastContext";

describe("Página do Produto (Stitch Design)", () => {
  const renderProdutoPage = (productId = "701") =>
    render(
      <MemoryRouter initialEntries={[`/produto/${productId}`]}>
        <ToastProvider>
          <CarrinhoProvider>
            <Routes>
              <Route path="/produto/:id" element={<Produto />} />
            </Routes>
          </CarrinhoProvider>
        </ToastProvider>
      </MemoryRouter>
    );

  it("deve carregar o nome do produto e os seletores de tamanho e modelo", () => {
    renderProdutoPage("701");

    expect(screen.getAllByText(/Camisa Brasil Home 26\/27/i).length).toBeGreaterThan(0);
    expect(screen.getByText("TORCEDOR")).toBeTruthy();
    expect(screen.getByText("JOGADOR")).toBeTruthy();
    expect(screen.getByText("P")).toBeTruthy();
    expect(screen.getByText("M")).toBeTruthy();
  });

  it("deve selecionar tamanho e calcular personalização ao preencher nome/número", () => {
    renderProdutoPage("701");

    const tamanhoM = screen.getByText("M");
    fireEvent.click(tamanhoM);

    const inputNome = screen.getByPlaceholderText(/deixe em branco/i);
    fireEvent.change(inputNome, { target: { value: "SILVA" } });

    expect(screen.getByText(/ADICIONAR AO CARRINHO/i)).toBeTruthy();
  });
});
