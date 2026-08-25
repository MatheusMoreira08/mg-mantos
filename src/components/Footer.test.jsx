import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Componente Footer", () => {
  it("deve renderizar as seções de informações, copyright e métodos de pagamento", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/MG Mantos/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Todos os direitos reservados/i)).toBeTruthy();
  });
});
