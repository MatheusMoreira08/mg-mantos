import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProdutosPorCategoria } from "../services/productService";
import ProdutoCard from "../components/ProdutoCard";

export default function Categoria() {
  const { slug } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const removerAcentos = (str = "") =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  useEffect(() => {
    const carregarCategoria = async () => {
      setCarregando(true);
      const data = await getProdutosPorCategoria(slug);
      setProdutos(data || []);
      setCarregando(false);
    };
    carregarCategoria();
  }, [slug]);

  const formatarTitulo = (texto = "") => {
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
        padding: "50px 0 80px",
        fontFamily: "var(--font-body)",
        color: "var(--text-primary)",
      }}
    >
      <div style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 20px" }}>
        <h1
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: "10px",
            color: "var(--text-primary)",
            fontSize: "32px",
            fontWeight: "900",
            letterSpacing: "1px",
          }}
        >
          {formatarTitulo(slug)}
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            marginBottom: "40px",
            fontSize: "14px",
          }}
        >
          Confira nossa seleção exclusiva para {formatarTitulo(slug)}
        </p>

        {carregando ? (
          <p
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              fontWeight: "bold",
              padding: "60px 0",
            }}
          >
            Buscando mantos...
          </p>
        ) : produtos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
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
              Nenhum produto encontrado nesta categoria no momento.
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
