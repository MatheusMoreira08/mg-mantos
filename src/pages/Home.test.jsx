import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { CarrinhoProvider } from "../context/CarrinhoContext";
import { ThemeProvider } from "../context/ThemeContext";

describe("Página Home", () => {
  it("deve renderizar a vitrine de produtos e categorias principais", () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <CarrinhoProvider>
            <Home />
          </CarrinhoProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("NACIONAIS")).toBeTruthy();
    expect(screen.getByText("EUROPEUS")).toBeTruthy();
    expect(screen.getByText("SELEÇÕES")).toBeTruthy();
  });
});
