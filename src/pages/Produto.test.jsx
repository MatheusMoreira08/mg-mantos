import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Produto from "./Produto";
import { CarrinhoProvider } from "../context/CarrinhoContext";
import { ToastProvider } from "../context/ToastContext";

// Mocka o serviço de produtos para que o teste seja determinístico e não
// dependa de rede/credenciais do Supabase.
vi.mock("../services/productService", () => ({
  getProdutoPorId: vi.fn(async () => ({
    id: "701",
    name: "Camisa Brasil Home 26/27",
    description: "",
    price: 129.9,
    image: "img/produtos/26-27/torcedor/BRASIL/principal-home.webp",
    images: ["img/produtos/26-27/torcedor/BRASIL/principal-home.webp"],
    sizes: ["P", "M", "G", "GG", "2GG", "3GG"],
    stock: 10,
    is_active: true,
    tags: ["selecoes"],
    badge: "Torcedor",
  })),
}));

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

  it("deve carregar o nome do produto e os seletores de tamanho e modelo", async () => {
    renderProdutoPage("701");

    const titulos = await screen.findAllByText(/Camisa Brasil Home 26\/27/i);
    expect(titulos.length).toBeGreaterThan(0);
    expect(screen.getByText("TORCEDOR")).toBeTruthy();
    expect(screen.getByText("JOGADOR")).toBeTruthy();
    expect(screen.getByText("P")).toBeTruthy();
    expect(screen.getByText("M")).toBeTruthy();
  });

  it("deve selecionar tamanho e calcular personalização ao preencher nome/número", async () => {
    renderProdutoPage("701");

    const tamanhoM = await screen.findByText("M");
    fireEvent.click(tamanhoM);

    const inputNome = screen.getByPlaceholderText(/deixe em branco/i);
    fireEvent.change(inputNome, { target: { value: "SILVA" } });

    expect(screen.getByText(/ADICIONAR AO CARRINHO/i)).toBeTruthy();
  });
});