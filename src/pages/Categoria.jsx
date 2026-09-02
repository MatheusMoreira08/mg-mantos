import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import ProdutoCard from "../components/ProdutoCard";
import productsData from "../data/products.json";

const sinonimos = {
  brasileirao: ["nacional", "brasileirao"],
  "times-internacionais": ["europeus", "internacional"],
  feminina: ["feminina"],
  selecoes: ["selecoes"],
  retro: ["retro"],
  jogador: ["jogador"],
};

export default function Categoria() {
  const { slug } = useParams();

  const removerAcentos = (str) =>
    (str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const [produtos, setProdutos] = useState(() => {
    const slugNormalizado = removerAcentos(slug).toLowerCase();
    const tagsParaBuscar = sinonimos[slugNormalizado] || [slugNormalizado];
    const termoNome = slugNormalizado.replace(/-/g, " ");
    const filtrados = productsData.filter((p) => {
      const pTags = p.tags || [];
      const pNome = (p.name || "").toLowerCase();
      const bateTag = tagsParaBuscar.some((t) => pTags.includes(t));
      const bateNome = pNome.includes(termoNome);
      return bateTag || bateNome;
    });
    return filtrados.length > 0 ? filtrados : productsData.slice(0, 12);
  });
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchEFiltrarCategoria = async () => {
      setCarregando(true);
      const slugNormalizado = removerAcentos(slug).toLowerCase();
      const tagsParaBuscar = sinonimos[slugNormalizado] || [slugNormalizado];
      const termoNome = slugNormalizado.replace(/-/g, " ");

      try {
        const { data } = await supabase
          .from("products")
          .select("*")
          .or(`tags.ov.{${tagsParaBuscar.join(",")}},name.ilike.%${termoNome}%`);

        if (data && data.length > 0) {
          setProdutos(data);
        } else {
          // Fallback para products.json local
          const filtrados = productsData.filter((p) => {
            const pTags = p.tags || [];
            const pNome = (p.name || "").toLowerCase();
            const bateTag = tagsParaBuscar.some((t) => pTags.includes(t));
            const bateNome = pNome.includes(termoNome);
            return bateTag || bateNome;
          });
          setProdutos(filtrados.length > 0 ? filtrados : productsData.slice(0, 12));
        }
      } catch {
        const filtrados = productsData.filter((p) => {
          const pTags = p.tags || [];
          const pNome = (p.name || "").toLowerCase();
          const bateTag = tagsParaBuscar.some((t) => pTags.includes(t));
          const bateNome = pNome.includes(termoNome);
          return bateTag || bateNome;
        });
        setProdutos(filtrados.length > 0 ? filtrados : productsData.slice(0, 12));
      } finally {
        setCarregando(false);
      }
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
