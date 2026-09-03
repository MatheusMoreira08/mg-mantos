import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProdutoCard from "../components/ProdutoCard";
import { getProdutosPorCategoria, getProdutos } from "../services/productService";

export default function Categoria() {
  const { slug } = useParams();

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    (async () => {
      await new Promise((r) => setTimeout(r, 0));
      if (!ativo) return;
      setCarregando(true);

      try {
        const resultado = await getProdutosPorCategoria(slug);
        if (!ativo) return;
        if (!resultado || resultado.length === 0) {
          const destaques = await getProdutos(12);
          if (ativo) setProdutos(destaques || []);
        } else {
          setProdutos(resultado);
        }
      } catch {
        if (!ativo) return;
        const destaques = await getProdutos(12);
        if (ativo) setProdutos(destaques || []);
      } finally {
        if (ativo) setCarregando(false);
      }
    })();

    return () => {
      ativo = false;
    };
  }, [slug]);

  const removerAcentos = (str) =>
    (str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const formatarTitulo = (texto) => {
    const limpo = removerAcentos(texto).toLowerCase();
    if (limpo === "brasileirao") return "Brasileirão";
    if (limpo === "times-internacionais") return "Times Internacionais";
    if (limpo === "selecoes") return "Seleções";
    if (limpo === "retro") return "Retrô";
    return texto.replace(/-/g, " ");
  };

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
        padding: "50px 0",
        fontFamily: "var(--font-body)",
        color: "var(--text-primary)",
      }}
    >
      <div style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 20px" }}>
        <h1
          style={{
            textAlign: "center",
            textTransform: "capitalize",
            marginBottom: "40px",
            color: "var(--text-primary)",
            fontSize: "32px",
            fontWeight: "900",
          }}
        >
          {formatarTitulo(slug)}
        </h1>
        {carregando ? (
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontWeight: "bold" }}>
            Buscando produtos...
          </p>
        ) : produtos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              backgroundColor: "var(--bg-card)",
              padding: "60px 20px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span style={{ fontSize: "50px" }}>👕</span>
            <p
              style={{
                fontSize: "18px",
                color: "var(--text-primary)",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "25px",
            }}
          >
            {produtos.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}