import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ToastProvider, useToast } from "./ToastContext";

function TestComponent() {
  const { showToast } = useToast();
  return (
    <div>
      <button onClick={() => showToast("Manto adicionado!", "success")}>
        Toast Sucesso
      </button>
      <button onClick={() => showToast("Erro no frete", "error")}>
        Toast Erro
      </button>
      <button onClick={() => showToast("Selecione um tamanho", "warning")}>
        Toast Aviso
      </button>
    </div>
  );
}

describe("ToastContext e ToastProvider", () => {
  it("deve disparar e exibir notificação de sucesso ao clicar no botão", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const btn = screen.getByText("Toast Sucesso");
    act(() => {
      btn.click();
    });

    expect(screen.getByText("Manto adicionado!")).toBeTruthy();
  });

  it("deve exibir notificação de aviso corretamente", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const btn = screen.getByText("Toast Aviso");
    act(() => {
      btn.click();
    });

    expect(screen.getByText("Selecione um tamanho")).toBeTruthy();
  });

  it("deve permitir fechar a notificação ao clicar nela", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const btn = screen.getByText("Toast Erro");
    act(() => {
      btn.click();
    });

    const toast = screen.getByText("Erro no frete");
    expect(toast).toBeTruthy();

    act(() => {
      toast.click();
    });

    expect(screen.queryByText("Erro no frete")).toBeNull();
  });
});
