import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { CarrinhoProvider } from "../context/CarrinhoContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastProvider } from "../context/ToastContext";

describe("Componente Header", () => {
  const renderHeader = () =>
    render(
      <BrowserRouter>
        <ThemeProvider>
          <CarrinhoProvider>
            <ToastProvider>
              <Header />
            </ToastProvider>
          </CarrinhoProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

  it("deve renderizar o título/logo MG MANTOS e links das categorias", () => {
    renderHeader();
    expect(screen.getAllByText(/MANTOS/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Brasileirão")).toBeTruthy();
    expect(screen.getByText("Times Internacionais")).toBeTruthy();
    expect(screen.getByText("Seleções")).toBeTruthy();
  });

  it("deve filtrar produtos localmente ao digitar no campo de busca", async () => {
    renderHeader();
    const searchInput = screen.getByPlaceholderText(/pesquisar produtos/i);

    fireEvent.change(searchInput, { target: { value: "Brasil" } });

    // Aguarda debounce do timeout
    await new Promise((resolve) => setTimeout(resolve, 350));

    const itemEncontrado = await screen.findByText(/Brasil/i);
    expect(itemEncontrado).toBeTruthy();
  });
});
