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
      imagem:
        "https://upload.wikimedia.org/wikipedia/pt/thumb/b/b4/Corinthians_simbolo.png/120px-Corinthians_simbolo.png",
      link: "/categoria/corinthians",
    },
    {
      nome: "Palmeiras",
      imagem:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/120px-Palmeiras_logo.svg.png",
      link: "/categoria/palmeiras",
    },
    {
      nome: "Vasco",
      imagem: "/img/times/vasco.svg",
      link: "/categoria/vasco",
    },
    {
      nome: "Cruzeiro",
      imagem:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/120px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png",
      link: "/categoria/cruzeiro",
    },
    {
      nome: "Atlético MG",
      imagem:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/120px-Atletico_mineiro_galo.png",
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
        imagem:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/9/98/Real_Madrid.png/120px-Real_Madrid.png",
        link: "/categoria/real-madrid",
      },
      {
        nome: "Barcelona",
        imagem:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/4/43/FCBarcelona.svg/120px-FCBarcelona.svg.png",
        link: "/categoria/barcelona",
      },
      {
        nome: "Atlético de Madrid",
        imagem:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/c/c1/Atletico_Madrid_logo.svg/120px-Atletico_Madrid_logo.svg.png",
        link: "/categoria/atletico-madrid",
      },
    ],
    "Premier League": [
      {
        nome: "Manchester City",
        imagem:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/0/02/Manchester_City_Football_Club.png/120px-Manchester_City_Football_Club.png",
        link: "/categoria/manchester-city",
      },
      {
        nome: "Arsenal",
        imagem:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/5/53/Arsenal_FC.svg/120px-Arsenal_FC.svg.png",
        link: "/categoria/arsenal",
      },
      {
        nome: "Liverpool",
        imagem:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/0/0c/Liverpool_FC.svg/120px-Liverpool_FC.svg.png",
        link: "/categoria/liverpool",
      },
      {
        nome: "Chelsea",
        imagem:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/c/cc/Chelsea_FC.svg/120px-Chelsea_FC.svg.png",
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
        imagem:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Juventus_FC_2023_Brand_Mark.svg/120px-Juventus_FC_2023_Brand_Mark.svg.png",
        link: "/categoria/juventus",
      },
      {
        nome: "Milan",
        imagem:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/120px-Logo_of_AC_Milan.svg.png",
        link: "/categoria/milan",
      },
      {
        nome: "Inter de Milão",
        imagem:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/120px-FC_Internazionale_Milano_2021.svg.png",
        link: "/categoria/inter-de-milao",
      },
    ],
    Bundesliga: [
      {
        nome: "Bayern Munique",
        imagem:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/120px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
        link: "/categoria/bayern-munique",
      },
      {
        nome: "Borussia Dortmund",
        imagem:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/120px-Borussia_Dortmund_logo.svg.png",
        link: "/categoria/borussia-dortmund",
      },
      {
        nome: "Bayer Leverkusen",
        imagem:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/5/5f/Bayer_04_Leverkusen_logo.svg/120px-Bayer_04_Leverkusen_logo.svg.png",
        link: "/categoria/bayer-leverkusen",
      },
    ],
    "Ligue 1": [
      {
        nome: "PSG",
        imagem:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Paris_Saint-Germain.svg/120px-Paris_Saint-Germain.svg.png",
        link: "/categoria/psg",
      },
      {
        nome: "Olympique Marseille",
        imagem:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/120px-Olympique_Marseille_logo.svg.png",
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
