import { describe, it, expect } from "vitest";
import productsData from "./products.json";

describe("Catálogo de Produtos (products.json)", () => {
  it("deve carregar uma lista não vazia de produtos", () => {
    expect(Array.isArray(productsData)).toBe(true);
    expect(productsData.length).toBeGreaterThan(0);
  });

  it("todo produto deve ter campos obrigatórios válidos (id, name, price)", () => {
    productsData.forEach((produto) => {
      expect(produto.id).toBeDefined();
      expect(produto.name).toBeTruthy();
      expect(Number(produto.price)).toBeGreaterThan(0);
    });
  });

  it("todas as camisas devem utilizar imagens padronizadas em .webp", () => {
    productsData.forEach((produto) => {
      const img = produto.image || produto.imagem || "";
      expect(img).toMatch(/\.webp$/i);
    });
  });
});
