import { createContext, useState, useEffect } from "react";

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    try {
      const salvo = localStorage.getItem("mg_mantos_carrinho");
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("mg_mantos_carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((carrinhoAtual) => {
      const itemExistente = carrinhoAtual.find(
        (item) =>
          item.id === produto.id &&
          item.tamanho === produto.tamanho &&
          item.personalizacao === produto.personalizacao,
      );
      if (itemExistente) {
        return carrinhoAtual.map((item) =>
          item.id === produto.id &&
          item.tamanho === produto.tamanho &&
          item.personalizacao === produto.personalizacao
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      } else {
        return [...carrinhoAtual, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (produtoId, tamanho) => {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter(
        (item) => !(item.id === produtoId && item.tamanho === tamanho),
      ),
    );
  };

  const limparCarrinho = () => setCarrinho([]);

  const valorTotal = carrinho.reduce(
    (total, item) => total + Number(item.price) * item.quantidade,
    0,
  );

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
