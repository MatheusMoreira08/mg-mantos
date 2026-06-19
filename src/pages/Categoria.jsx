import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import ProdutoCard from "../components/ProdutoCard";

export default function Categoria() {
  const { slug } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Função para remover acentos da URL antes de comparar com as tags
  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // DICIONÁRIO DE SINÔNIMOS
  // Mapeia o termo que vem na URL para as tags exatas que você colocou no JSON
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

      // Puxa todos os produtos do Supabase
      const { data } = await supabase.from("products").select("*");

      if (data) {
        const slugNormalizado = removerAcentos(slug).toLowerCase();

        // Descobre quais tags buscar baseado no dicionário ou no próprio slug da URL
        const tagsParaBuscar = sinonimos[slugNormalizado] || [slugNormalizado];

        // Filtro otimizado para a estrutura de array do novo JSON
        const filtrados = data.filter((p) => {
          const nome = p.name?.toLowerCase() || "";

          // Transforma o array de tags do banco em uma string única para busca flexível
          const tagsDoProduto =
            p.tags && Array.isArray(p.tags)
              ? p.tags.map((t) => removerAcentos(t).toLowerCase())
              : [];

          // 1. Verifica se o nome do produto contém o termo digitado na URL
          const matchNome = nome.includes(slugNormalizado.replace(/-/g, " "));

          // 2. Verifica se alguma das tags do produto bate com a categoria selecionada
          const matchTags = tagsParaBuscar.some((termo) =>
            tagsDoProduto.includes(termo),
          );

          return matchNome || matchTags;
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
            <p style={{ fontSize: "14px", color: "#888", marginTop: "10px" }}>
              Tente cadastrar tags equivalentes no banco de dados ou mude de
              liga.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
