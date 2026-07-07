import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { CarrinhoContext } from "../context/carrinho-context";
import { ThemeContext } from "../context/theme-context";

export default function Header() {
  const { carrinho } = useContext(CarrinhoContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const categorias = [
    "Brasileirão",
    "Times Internacionais",
    "Seleções",
    "Feminina",
    "Retrô",
    "Jogador",
  ];

  const [termoBusca, setTermoBusca] = useState("");
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  useEffect(() => {
    const buscarProdutos = async () => {
      if (termoBusca.length < 2) {
        setResultadosBusca([]);
        setMostrarDropdown(false);
        return;
      }
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image, imagem")
        .ilike("name", `%${termoBusca}%`)
        .limit(5);
      if (data) {
        setResultadosBusca(data);
        setMostrarDropdown(true);
      }
    };
    const timeoutId = setTimeout(() => buscarProdutos(), 300);
    return () => clearTimeout(timeoutId);
  }, [termoBusca]);

  const handleProdutoClick = (id) => {
    navigate(`/produto/${id}`);
    setMostrarDropdown(false);
    setTermoBusca("");
  };

  // NOVO: se tiver só 1 resultado, vai direto pro produto.
  // Se tiver mais de 1, mantém o dropdown aberto (o usuário escolhe).
  const handleBuscar = () => {
    if (resultadosBusca.length === 1) {
      handleProdutoClick(resultadosBusca[0].id);
    } else if (resultadosBusca.length > 1) {
      setMostrarDropdown(true);
    }
  };

  const handleBuscaKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBuscar();
    }
  };

  const quantidadeCarrinho = carrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0,
  );
  const valorTotalCarrinho = carrinho.reduce(
    (acc, item) => acc + Number(item.price) * item.quantidade,
    0,
  );

  return (
    <header
      style={{
        width: "100%",
        fontFamily: "var(--font-body)",
        boxSizing: "border-box",
        color: "var(--text-primary)",
      }}
    >
      {/* BARRA SUPERIOR */}
      <div
        style={{
          backgroundColor: "var(--bg-primary)",
          width: "100%",
          boxSizing: "border-box",
          padding: "15px 20px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <img
              src="/img/front-page/logo.png"
              alt="MG Mantos"
              style={{ height: "45px", objectFit: "contain" }}
            />
            <span
              style={{
                fontWeight: "900",
                fontSize: "24px",
                color: "var(--text-primary)",
                letterSpacing: "-1px",
              }}
            >
              MG <span style={{ color: "var(--accent)" }}>MANTOS</span>
            </span>
          </Link>

          {/* BUSCA */}
          <div style={{ flex: "1", maxWidth: "600px", position: "relative" }}>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="Pesquisar Produtos"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                onFocus={() =>
                  termoBusca.length >= 2 && setMostrarDropdown(true)
                }
                onBlur={() => setTimeout(() => setMostrarDropdown(false), 200)}
                onKeyDown={handleBuscaKeyDown}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-primary)",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
              <button
                type="button"
                onClick={handleBuscar}
                style={{
                  backgroundColor: "var(--accent)",
                  border: "none",
                  borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                  padding: "0 20px",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  fontSize: "16px",
                  flexShrink: 0,
                }}
              >
                🔍
              </button>
            </div>

            {/* DROPDOWN */}
            {mostrarDropdown && resultadosBusca.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  backgroundColor: "var(--bg-card)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-hover)",
                  zIndex: 1000,
                  marginTop: "5px",
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                }}
              >
                {resultadosBusca.map((produto) => (
                  <div
                    key={produto.id}
                    onClick={() => handleProdutoClick(produto.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "10px 15px",
                      borderBottom: "1px solid var(--border)",
                      cursor: "pointer",
                      backgroundColor: "var(--bg-card)",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "var(--bg-card-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "var(--bg-card)")
                    }
                  >
                    <img
                      src={`/${produto.image || produto.imagem}`}
                      alt={produto.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                      }}
                    />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          color: "var(--text-primary)",
                          fontWeight: "bold",
                        }}
                      >
                        {produto.name}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          color: "var(--accent)",
                          fontWeight: "900",
                        }}
                      >
                        R$ {Number(produto.price).toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ÍCONES */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                borderRadius: "var(--radius-full)",
                padding: "10px 14px",
                cursor: "pointer",
                fontWeight: "900",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
                boxShadow: "var(--shadow-card)",
                whiteSpace: "nowrap",
              }}
            >
              {theme === "dark" ? "☀️ Claro" : "🌙 Escuro"}
            </button>
            <Link
              to="/minha-conta"
              style={{
                color: "var(--text-primary)",
                textDecoration: "none",
                fontSize: "20px",
              }}
            >
              👤
            </Link>
            <Link
              to="/carrinho"
              style={{
                color: "var(--text-primary)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontWeight: "bold",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "24px" }}>🛍️</span>
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-8px",
                    backgroundColor: "var(--accent)",
                    color: "var(--text-primary)",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "900",
                  }}
                >
                  {quantidadeCarrinho}
                </span>
              </div>
              <span>R$ {valorTotalCarrinho.toFixed(2).replace(".", ",")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* BARRA DE CATEGORIAS */}
      <nav
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          width: "100%",
          boxSizing: "border-box",
          padding: "12px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/carrinho"
            style={{
              color: "var(--text-primary)",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "900",
              textTransform: "uppercase",
            }}
          >
            VER CARRINHO 🛒
          </Link>
          {categorias.map((cat) => (
            <Link
              key={cat}
              to={`/categoria/${cat.toLowerCase().replace(/ /g, "-")}`}
              style={{
                color: "var(--text-primary)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
