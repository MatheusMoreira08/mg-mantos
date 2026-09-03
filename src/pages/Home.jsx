import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProdutoCard from "../components/ProdutoCard";
import BannerCarousel from "../components/BannerCarousel";
import { getProdutos } from "../services/productService";
import { escudosTimesBR, timesPorLiga } from "../data/teamBadges";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [abaPrincipal, setAbaPrincipal] = useState("Lançamentos");
  const [ligaAtiva, setLigaAtiva] = useState("La Liga");


  const meusBanners = [
    "/img/front-page/banner1.webp",
    "/img/front-page/banner2.webp",
    "/img/front-page/banner3.webp",
    "/img/front-page/banner4.webp",
  ];

  const blocosCategorias = [
    {
      nome: "NACIONAIS",
      imagem: "/img/front-page/nacional.webp",
      link: "/categoria/brasileirao",
    },
    {
      nome: "EUROPEUS",
      imagem: "/img/front-page/europeu.webp",
      link: "/categoria/times-internacionais",
    },
    {
      nome: "SELEÇÕES",
      imagem: "/img/front-page/selecoess.avif",
      link: "/categoria/selecoes",
    },
    {
      nome: "LANÇAMENTOS",
      imagem: "/img/front-page/lancamento.webp",
      link: "/categoria/lancamentos",
    },
    {
      nome: "FEMININAS",
      imagem: "/img/front-page/fem-marta.webp",
      link: "/categoria/feminina",
    },
    {
      nome: "RESTO DO MUNDO",
      imagem: "/img/front-page/restodomundo.avif",
      link: "/categoria/resto-do-mundo",
    },
  ];

  useEffect(() => {
    getProdutos(50)
      .then((lista) => setProdutos(lista || []))
      .catch(() => setProdutos([]));
  }, []);

  return (
    <div
      style={{
          backgroundColor: "var(--bg-primary)",
        width: "100%",
        overflowX: "hidden",
          fontFamily: "var(--font-body)",
          color: "var(--text-primary)",
      }}
    >
      <BannerCarousel imagens={meusBanners} />

      <div
        style={{ maxWidth: "1250px", margin: "50px auto", padding: "0 20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginBottom: "30px",
            fontWeight: "bold",
            fontSize: "14px",
            textTransform: "uppercase",
          }}
        >
          <span
            onClick={() => setAbaPrincipal("Lançamentos")}
            style={{
                color:
                  abaPrincipal === "Lançamentos"
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
              borderBottom:
                abaPrincipal === "Lançamentos"
                  ? "2px solid var(--accent)"
                  : "none",
              paddingBottom: "5px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Lançamentos
          </span>
          <span
            onClick={() => setAbaPrincipal("Mais Vendidos")}
            style={{
                color:
                  abaPrincipal === "Mais Vendidos"
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
              borderBottom:
                abaPrincipal === "Mais Vendidos"
                  ? "2px solid var(--accent)"
                  : "none",
              paddingBottom: "5px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Mais Vendidos
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {abaPrincipal === "Lançamentos"
            ? produtos
                ?.slice(0, 5)
                .map((p) => <ProdutoCard key={p.id} produto={p} />)
            : produtos
                ?.slice(5, 10)
                .map((p) => <ProdutoCard key={p.id} produto={p} />)}
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          margin: "60px 0",
           backgroundColor: "var(--bg-secondary)",
          padding: "40px 0",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
             color: "var(--text-secondary)",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          Separamos para você!
        </p>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "900",
            margin: "0 0 40px 0",
             color: "var(--text-primary)",
          }}
        >
          DIVERSIFIQUE SEU PEDIDO
        </h2>
        <div
          style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 20px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "20px",
            }}
          >
            {blocosCategorias.slice(0, 3).map((cat, index) => (
              <Link
                key={index}
                to={cat.link}
                style={{
                  display: "block",
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                <img
                  src={cat.imagem}
                  alt={cat.nome}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "var(--bg-card)",
                    color: "var(--text-primary)",
                    padding: "10px 30px",
                    fontWeight: "900",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    borderRadius: "4px",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {cat.nome}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1250px",
          margin: "50px auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            textTransform: "uppercase",
            fontWeight: "bold",
            marginBottom: "30px",
             color: "var(--text-secondary)",
          }}
        >
          BRASILEIRÃO
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {escudosTimesBR.map((time) => (
            // Adicionado textDecoration none e color transparent para não ficar com link azul feio se a imagem quebrar
            <Link
              key={time.nome}
              to={time.link}
              style={{
                transition: "transform 0.2s",
                textDecoration: "none",
                color: "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={time.imagem}
                alt={time.nome}
                style={{ width: "60px", height: "60px", objectFit: "contain" }}
                title={time.nome}
                onError={(e) => {
                  const inicial = time.nome.charAt(0).toUpperCase();
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/60x60/1a1a1a/f0f0f0?text=${encodeURIComponent(inicial)}`;
                }}
              />
            </Link>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: "1250px",
          margin: "30px auto 50px",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {produtos?.slice(5, 10).map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>

      <div
        style={{ maxWidth: "1250px", margin: "60px auto", padding: "0 20px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "20px",
          }}
        >
          {blocosCategorias.slice(3, 6).map((cat, index) => (
            <Link
              key={index}
              to={cat.link}
              style={{
                display: "block",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                textDecoration: "none",
              }}
            >
              <img
                src={cat.imagem}
                alt={cat.nome}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "50%",
                  transform: "translateX(-50%)",
                    backgroundColor: "var(--bg-card)",
                    color: "var(--text-primary)",
                  padding: "10px 30px",
                  fontWeight: "900",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  borderRadius: "4px",
                    boxShadow: "var(--shadow-card)",
                }}
              >
                {cat.nome}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "48px 0 28px" }}>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          As principais ligas do mundo
        </p>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "900",
            margin: "0 0 20px 0",
            color: "var(--text-primary)",
          }}
        >
          COMPRE POR LIGA 🏆
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "18px",
            fontWeight: "bold",
            fontSize: "13px",
            textTransform: "uppercase",
            flexWrap: "wrap",
            padding: "0 20px",
          }}
        >
          {Object.keys(timesPorLiga).map((liga) => (
            <span
              key={liga}
              onClick={() => setLigaAtiva(liga)}
              style={{
                color:
                  ligaAtiva === liga
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                borderBottom:
                  ligaAtiva === liga ? "2px solid var(--accent)" : "none",
                paddingBottom: "5px",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
            >
              {liga}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "22px",
            flexWrap: "wrap",
            marginBottom: "24px",
            minHeight: "44px",
          }}
        >
          {timesPorLiga[ligaAtiva].map((time, index) => (
            <Link
              key={index}
              to={time.link}
              style={{
                transition: "transform 0.2s",
                textDecoration: "none",
                color: "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={time.imagem}
                alt={time.nome}
                style={{ width: "52px", height: "52px", objectFit: "contain" }}
                title={time.nome}
                onError={(e) => {
                  const inicial = time.nome.charAt(0).toUpperCase();
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/52x52/1a1a1a/f0f0f0?text=${encodeURIComponent(inicial)}`;
                }}
              />
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "11px",
                  lineHeight: "1.1",
                  color: "var(--text-secondary)",
                  maxWidth: "82px",
                }}
              >
                {time.nome}
              </div>
            </Link>
          ))}
        </div>

        <div
          style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 20px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {produtos?.slice(10, 15).map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>

      {/* Retiramos a faixa de Comunidade e os banners vazios daqui para limpar o design */}
    </div>
  );
}
