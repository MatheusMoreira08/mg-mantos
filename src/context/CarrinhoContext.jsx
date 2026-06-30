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

  // BUGFIX: agora também diferencia por personalizacao, igual ao adicionarAoCarrinho.
  // Antes: removia TODOS os itens com mesmo id+tamanho, ignorando personalizações diferentes.
  const removerDoCarrinho = (produtoId, tamanho, personalizacao) => {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter(
        (item) =>
          !(
            item.id === produtoId &&
            item.tamanho === tamanho &&
            item.personalizacao === personalizacao
          ),
      ),
    );
  };

  // NOVO (opcional): permite alterar a quantidade diretamente, ex: botões +/- no carrinho.
  // Se a quantidade chegar a 0 ou menos, remove o item.
  const atualizarQuantidade = (
    produtoId,
    tamanho,
    personalizacao,
    novaQuantidade,
  ) => {
    setCarrinho((carrinhoAtual) => {
      if (novaQuantidade <= 0) {
        return carrinhoAtual.filter(
          (item) =>
            !(
              item.id === produtoId &&
              item.tamanho === tamanho &&
              item.personalizacao === personalizacao
            ),
        );
      }
      return carrinhoAtual.map((item) =>
        item.id === produtoId &&
        item.tamanho === tamanho &&
        item.personalizacao === personalizacao
          ? { ...item, quantidade: novaQuantidade }
          : item,
      );
    });
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
        atualizarQuantidade,
        limparCarrinho,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
