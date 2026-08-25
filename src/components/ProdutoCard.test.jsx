import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProdutoCard from "./ProdutoCard";

describe("Componente ProdutoCard", () => {
  const produtoMock = {
    id: 701,
    name: "Camisa Brasil Home 26/27",
    price: 129.9,
    badge: "Lançamento",
    image: "img/camisas/brasil-home.webp",
  };

  it("deve renderizar o nome do produto e o preço formatado em BRL", () => {
    render(
      <BrowserRouter>
        <ProdutoCard produto={produtoMock} />
      </BrowserRouter>
    );

    expect(screen.getByText("Camisa Brasil Home 26/27")).toBeTruthy();
    expect(screen.getByText(/129,90/)).toBeTruthy();
  });

  it("deve renderizar a tag badge do produto", () => {
    render(
      <BrowserRouter>
        <ProdutoCard produto={produtoMock} />
      </BrowserRouter>
    );

    expect(screen.getByText("Lançamento")).toBeTruthy();
  });
});
