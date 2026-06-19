import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { CarrinhoContext } from "../context/CarrinhoContext";

export default function Header() {
  const { carrinho } = useContext(CarrinhoContext); // Puxa o carrinho real para o contador
  const navigate = useNavigate();

  // Categorias atualizadas (limpas)
  const categorias = [
    "Brasileirão",
    "Times Internacionais",
    "Seleções",
    "Feminina",
    "Retrô",
    "Jogador",
  ];

  // Estados para a Busca Dinâmica
  const [termoBusca, setTermoBusca] = useState("");
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  // Efeito que busca no banco de dados enquanto o usuário digita
  useEffect(() => {
    const buscarProdutos = async () => {
      // Só busca se tiver pelo menos 2 letras
      if (termoBusca.length < 2) {
        setResultadosBusca([]);
        setMostrarDropdown(false);
        return;
      }

      const { data } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${termoBusca}%`) // Busca qualquer parte do nome
        .limit(5); // Limita a 5 resultados no dropdown

      if (data) {
        setResultadosBusca(data);
        setMostrarDropdown(true);
      }
    };

    // Pequeno "delay" (debounce) para não travar o banco de dados a cada letra digitada
    const timeoutId = setTimeout(() => buscarProdutos(), 300);
    return () => clearTimeout(timeoutId);
  }, [termoBusca]);

  // Função para lidar com o clique em um produto da busca
  const handleProdutoClick = (id) => {
    navigate(`/produto/${id}`);
    setMostrarDropdown(false);
    setTermoBusca(""); // Limpa a busca ao entrar no produto
  };

  // Calcula o total e a quantidade real do carrinho
  const quantidadeCarrinho = carrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0,
  );
  const valorTotalCarrinho = carrinho.reduce(
    (acc, item) => acc + item.price * item.quantidade,
    0,
  );

  return (
    <header style={{ width: "100%", fontFamily: "sans-serif" }}>
      {/* 1. BARRA SUPERIOR (Logo, Busca e Ícones) */}
      <div
        style={{
          backgroundColor: "#000",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="./img/front-page/logo.png"
            alt="MG Mantos"
            style={{ height: "45px", objectFit: "contain" }}
          />
          <span
            style={{
              fontWeight: "900",
              fontSize: "24px",
              color: "#fff",
              letterSpacing: "-1px",
            }}
          >
            MG <span style={{ color: "rgb(106, 13, 173)" }}>MANTOS</span>
          </span>
        </Link>

        {/* BARRA DE BUSCA DINÂMICA */}
        <div
          style={{
            flex: "1",
            maxWidth: "600px",
            margin: "0 40px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Pesquisar Produtos"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              onFocus={() => termoBusca.length >= 2 && setMostrarDropdown(true)}
              onBlur={() => setTimeout(() => setMostrarDropdown(false), 200)} // Fecha se clicar fora
              style={{
                width: "100%",
                padding: "12px 20px",
                borderRadius: "4px 0 0 4px",
                border: "none",
                backgroundColor: "#fff",
                color: "#333",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              style={{
                backgroundColor: "#00bfa5",
                border: "none",
                borderRadius: "0 4px 4px 0",
                padding: "0 20px",
                cursor: "pointer",
                color: "#fff",
                fontSize: "16px",
              }}
            >
              🔍
            </button>
          </div>

          {/* DROPDOWN DE RESULTADOS */}
          {mostrarDropdown && resultadosBusca.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "4px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                zIndex: 1000,
                marginTop: "5px",
                border: "1px solid #eee",
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
                    borderBottom: "1px solid #f0f0f0",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9f9f9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff")
                  }
                >
                  <img
                    src={produto.image || produto.imagem}
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
                        color: "#333",
                        fontWeight: "bold",
                      }}
                    >
                      {produto.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#00bfa5",
                        fontWeight: "900",
                      }}
                    >
                      R$ {produto.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ícones da Direita */}
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <Link
            to="/minha-conta"
            style={{
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            👤
          </Link>
          <Link
            to="/carrinho"
            style={{
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "bold",
            }}
          >
            <div style={{ position: "relative" }}>
              🛍️
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  backgroundColor: "#00bfa5",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "10px",
                }}
              >
                {quantidadeCarrinho}
              </span>
            </div>
            <span>R$ {valorTotalCarrinho.toFixed(2).replace(".", ",")}</span>
          </Link>
        </div>
      </div>

      {/* 2. BARRA DE CATEGORIAS INFERIOR */}
      <nav
        style={{
          backgroundColor: "#1a1a1a",
          padding: "12px 40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          flexWrap: "wrap",
          borderTop: "1px solid #333",
        }}
      >
        <Link
          to="/carrinho"
          style={{
            color: "#fff",
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
            to={`/categoria/${cat.toLowerCase().replace(" ", "-")}`}
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "bold",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "rgb(106, 13, 173)")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
          >
            {cat}
          </Link>
        ))}
      </nav>
    </header>
  );
}
