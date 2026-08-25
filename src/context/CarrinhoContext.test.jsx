import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CarrinhoProvider } from "./CarrinhoContext";
import { CarrinhoContext } from "./carrinho-context";
import { useContext } from "react";

describe("Gerenciador de Estado do Carrinho (CarrinhoContext)", () => {
  const wrapper = ({ children }) => <CarrinhoProvider>{children}</CarrinhoProvider>;

  it("deve iniciar com o carrinho vazio e valorTotal 0", () => {
    const { result } = renderHook(() => useContext(CarrinhoContext), { wrapper });
    expect(result.current.carrinho).toEqual([]);
    expect(result.current.valorTotal).toBe(0);
  });

  it("deve adicionar item ao carrinho e calcular o valor total", () => {
    const { result } = renderHook(() => useContext(CarrinhoContext), { wrapper });

    const item = {
      id: 701,
      name: "Camisa Brasil Home 26/27",
      price: 129.9,
      tamanho: "M",
      quantidade: 1,
    };

    act(() => {
      result.current.adicionarAoCarrinho(item);
    });

    expect(result.current.carrinho.length).toBe(1);
    expect(result.current.valorTotal).toBe(129.9);
  });

  it("deve limpar o carrinho corretamente", () => {
    const { result } = renderHook(() => useContext(CarrinhoContext), { wrapper });

    act(() => {
      result.current.adicionarAoCarrinho({
        id: 701,
        name: "Camisa Brasil Home 26/27",
        price: 129.9,
        tamanho: "G",
      });
      result.current.limparCarrinho();
    });

    expect(result.current.carrinho).toEqual([]);
    expect(result.current.valorTotal).toBe(0);
  });
});
