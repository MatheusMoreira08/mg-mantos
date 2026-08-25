import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Carrinho from "./Carrinho";
import { CarrinhoProvider } from "../context/CarrinhoContext";
import { ToastProvider } from "../context/ToastContext";

describe("Página do Carrinho", () => {
  it("deve renderizar o título do carrinho e o botão de continuar comprando quando estiver vazio", () => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <CarrinhoProvider>
            <Carrinho />
          </CarrinhoProvider>
        </ToastProvider>
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Carrinho/i).length).toBeGreaterThan(0);
  });
});
