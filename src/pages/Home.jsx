import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import ProdutoCard from "../components/ProdutoCard";
import BannerCarousel from "../components/BannerCarousel";
import productsData from "../data/products.json";

export default function Home() {
  const [produtos, setProdutos] = useState(productsData);
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

  const escudosTimesBR = [
    {
      nome: "Flamengo",
      imagem: "/img/times/flamengo.svg",
      link: "/categoria/flamengo",
    },
    {
      nome: "São Paulo",
      imagem: "/img/times/sao-paulo.svg",
      link: "/categoria/sao-paulo",
    },
    {
      nome: "Corinthians",
      imagem: "/img/times/corinthians.svg",
      link: "/categoria/corinthians",
    },
    {
      nome: "Palmeiras",
      imagem: "/img/times/palmeiras.svg",
      link: "/categoria/palmeiras",
    },
    {
      nome: "Vasco",
      imagem: "/img/times/vasco.svg",
      link: "/categoria/vasco",
    },
    {
      nome: "Cruzeiro",
      imagem: "/img/times/cruzeiro.svg",
      link: "/categoria/cruzeiro",
    },
    {
      nome: "Atlético MG",
      imagem: "/img/times/atletico-mg.svg",
      link: "/categoria/atletico-mg",
    },
    {
      nome: "Grêmio",
      imagem: "/img/times/gremio.svg",
      link: "/categoria/gremio",
    },
  ];

  const timesPorLiga = {
    "La Liga": [
      {
        nome: "Real Madrid",
        imagem: "/img/times/real-madrid.svg",
        link: "/categoria/real-madrid",
      },
      {
        nome: "Barcelona",
        imagem: "/img/times/barcelona.svg",
        link: "/categoria/barcelona",
      },
      {
        nome: "Atlético de Madrid",
        imagem: "/img/times/atletico-madrid.svg",
        link: "/categoria/atletico-madrid",
      },
    ],
    "Premier League": [
      {
        nome: "Manchester City",
        imagem: "/img/times/manchester-city.svg",
        link: "/categoria/manchester-city",
      },
      {
        nome: "Arsenal",
        imagem: "/img/times/arsenal.svg",
        link: "/categoria/arsenal",
      },
      {
        nome: "Liverpool",
        imagem: "/img/times/liverpool.svg",
        link: "/categoria/liverpool",
      },
      {
        nome: "Chelsea",
        imagem: "/img/times/chelsea.svg",
        link: "/categoria/chelsea",
      },
      {
        nome: "Manchester United",
        imagem: "/img/times/manchester-united.svg",
        link: "/categoria/manchester-united",
      },
    ],
    "Serie A": [
      {
        nome: "Juventus",
        imagem: "/img/times/juventus.svg",
        link: "/categoria/juventus",
      },
      {
        nome: "Milan",
        imagem: "/img/times/milan.svg",
        link: "/categoria/milan",
      },
      {
        nome: "Inter de Milão",
        imagem: "/img/times/inter-de-milao.svg",
        link: "/categoria/inter-de-milao",
      },
    ],
    Bundesliga: [
      {
        nome: "Bayern Munique",
        imagem: "/img/times/bayern-munique.svg",
        link: "/categoria/bayern-munique",
      },
      {
        nome: "Borussia Dortmund",
        imagem: "/img/times/borussia-dortmund.svg",
        link: "/categoria/borussia-dortmund",
      },
      {
        nome: "Bayer Leverkusen",
        imagem: "/img/times/bayer-leverkusen.svg",
        link: "/categoria/bayer-leverkusen",
      },
    ],
    "Ligue 1": [
      {
        nome: "PSG",
        imagem: "/img/times/psg.svg",
        link: "/categoria/psg",
      },
      {
        nome: "Olympique Marseille",
        imagem: "/img/times/olympique.svg",
        link: "/categoria/olympique",
      },
    ],
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const { data } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(15);
        if (data && data.length > 0) {
          setProdutos(data);
        } else {
          setProdutos(productsData);
        }
      } catch {
        setProdutos(productsData);
      }
    };
    fetchProdutos();
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
