import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import ProdutoCard from "../components/ProdutoCard";

export default function Categoria() {
  const { slug } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const removerAcentos = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const sinonimos = {
    brasileirao: ["nacional", "brasileirao"],
    "times-internacionais": ["europeus", "internacional"],
    feminina: ["feminina"],
    selecoes: ["selecoes"],
    retro: ["retro"],
    jogador: ["jogador"],
  };

  useEffect(() => {
    const fetchEFiltrarCategoria = async () => {
      setCarregando(true);
      const { data } = await supabase.from("products").select("*").limit(60);
      if (data) {
        const slugNormalizado = removerAcentos(slug).toLowerCase();
        const tagsParaBuscar = sinonimos[slugNormalizado] || [slugNormalizado];
        const filtrados = data.filter((p) => {
          const nome = p.name?.toLowerCase() || "";
          const tagsDoProduto =
            p.tags && Array.isArray(p.tags)
              ? p.tags.map((t) => removerAcentos(t).toLowerCase())
              : [];
          return (
            nome.includes(slugNormalizado.replace(/-/g, " ")) ||
            tagsParaBuscar.some((termo) => tagsDoProduto.includes(termo))
          );
        });
        setProdutos(filtrados);
      }
      setCarregando(false);
    };
    fetchEFiltrarCategoria();
  }, [slug]);

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
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        padding: "50px 0",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 20px" }}>
        <h1
          style={{
            textAlign: "center",
            textTransform: "capitalize",
            marginBottom: "40px",
            color: "#000",
            fontSize: "32px",
            fontWeight: "900",
          }}
        >
          {formatarTitulo(slug)}
        </h1>
        {carregando ? (
          <p style={{ textAlign: "center", color: "#666", fontWeight: "bold" }}>
            Buscando produtos...
          </p>
        ) : produtos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              backgroundColor: "#fff",
              padding: "60px 20px",
              borderRadius: "8px",
              border: "1px solid #eaeaea",
            }}
          >
            <span style={{ fontSize: "50px" }}>👕</span>
            <p
              style={{
                fontSize: "18px",
                color: "#333",
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
