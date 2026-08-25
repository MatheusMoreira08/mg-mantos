import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { ToastProvider } from "../context/ToastContext";

describe("Página de Login", () => {
  const renderLogin = () =>
    render(
      <BrowserRouter>
        <ToastProvider>
          <Login />
        </ToastProvider>
      </BrowserRouter>
    );

  it("deve renderizar os campos de email, senha e o botão Entrar", () => {
    renderLogin();

    expect(screen.getByPlaceholderText(/seu e-mail/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/sua senha/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeTruthy();
  });

  it("deve alternar entre os modos Entrar e Criar conta", () => {
    renderLogin();

    const linkCriarConta = screen.getByText("Criar conta");
    fireEvent.click(linkCriarConta);

    expect(screen.getByRole("button", { name: /criar conta/i })).toBeTruthy();
  });
});
