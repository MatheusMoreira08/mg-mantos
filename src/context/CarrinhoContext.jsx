import { createContext, useState, useEffect } from 'react';

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem('mg_mantos_carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  useEffect(() => {
    localStorage.setItem('mg_mantos_carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((carrinhoAtual) => {
      const itemExistente = carrinhoAtual.find((item) => item.id === produto.id);
      if (itemExistente) {
        return carrinhoAtual.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...carrinhoAtual, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho((carrinhoAtual) => carrinhoAtual.filter((item) => item.id !== produtoId));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const valorTotal = carrinho.reduce((total, item) => total + (item.price * item.quantidade), 0);

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, valorTotal }}>
      {children}
    </CarrinhoContext.Provider>
  );
}