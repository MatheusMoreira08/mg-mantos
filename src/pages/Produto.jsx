import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { CarrinhoContext } from "../context/CarrinhoContext";

export default function Produto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);

  // 1. Puxando a função de adicionar ao carrinho do seu Contexto
  const { adicionarAoCarrinho } = useContext(CarrinhoContext);

  // Estados do Produto
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [nomePersonalizacao, setNomePersonalizacao] = useState("");
  const [numeroPersonalizacao, setNumeroPersonalizacao] = useState("");
  const [cep, setCep] = useState("");

  const tamanhos = ["P", "M", "G", "GG", "2GG", "3GG"];

  useEffect(() => {
    const fetchProduto = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (data) setProduto(data);
    };
    fetchProduto();
  }, [id]);

  // 2. Função real para processar a adição ao carrinho
  const handleAdicionarAoCarrinho = () => {
    if (!tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho antes de comprar!");
      return;
    }

    const temPersonalizacao =
      nomePersonalizacao.trim() !== "" || numeroPersonalizacao.trim() !== "";

    // Calcula o preço final (Soma R$ 25 se tiver personalização)
    const precoBase = Number(produto.price);
    const precoFinal = temPersonalizacao ? precoBase + 25 : precoBase;

    // Monta o objeto que vai ser salvo no CarrinhoContext
    const itemParaCarrinho = {
      ...produto,
      price: precoFinal, // Preço atualizado
      tamanho: tamanhoSelecionado,
      personalizacao: temPersonalizacao
        ? `${nomePersonalizacao} - ${numeroPersonalizacao}`
        : "Sem personalização",
      quantidade: 1, // Começa com 1 unidade
    };

    // Chama a função do seu contexto (certifique-se que o nome da função no seu Context é adicionarAoCarrinho)
    adicionarAoCarrinho(itemParaCarrinho);

    alert(
      `Sucesso! ${produto.name} (Tamanho: ${tamanhoSelecionado}) foi adicionado ao seu carrinho.`,
    );

    // Opcional: Redirecionar o cliente automaticamente para o carrinho após adicionar
    navigate("/carrinho");
  };

  if (!produto)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "#000" }}>
        Carregando...
      </p>
    );

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        padding: "40px 0",
        color: "#333",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* Breadcrumb (Caminho) */}
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "20px" }}>
          Início {">"} {produto.name}
        </p>

        <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
          {/* ESQUERDA: Imagem com Borda */}
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              border: "1px solid #eaeaea",
              borderRadius: "8px",
              padding: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={produto.image || produto.imagem}
              alt={produto.name}
              style={{ width: "100%", maxWidth: "450px", objectFit: "contain" }}
            />
          </div>

          {/* DIREITA: Informações e Compra */}
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "900",
                textTransform: "uppercase",
                marginBottom: "15px",
                letterSpacing: "1px",
              }}
            >
              {produto.name}
            </h1>

            <p
              style={{
                fontSize: "36px",
                fontWeight: "900",
                color: "rgb(106, 13, 173)",
                marginBottom: "5px",
              }}
            >
              R$ {Number(produto.price).toFixed(2).replace(".", ",")}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#888",
                paddingBottom: "20px",
                borderBottom: "1px solid #eaeaea",
                marginBottom: "30px",
              }}
            >
              em até 3x sem juros
            </p>

            {/* SELETOR DE TAMANHOS */}
            <div style={{ marginBottom: "25px" }}>
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  fontSize: "13px",
                }}
              >
                Tamanho:
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {tamanhos.map((tam) => (
                  <button
                    key={tam}
                    onClick={() => setTamanhoSelecionado(tam)}
                    style={{
                      padding: "8px 16px",
                      border:
                        tamanhoSelecionado === tam
                          ? "2px solid rgb(106, 13, 173)"
                          : "1px solid #ddd",
                      backgroundColor: "#fff",
                      color:
                        tamanhoSelecionado === tam
                          ? "rgb(106, 13, 173)"
                          : "#555",
                      fontWeight: "bold",
                      fontSize: "13px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {tam}
                  </button>
                ))}
              </div>
            </div>

            {/* CAIXA DE PERSONALIZAÇÃO */}
            <div
              style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "30px",
                border: "1px solid #eaeaea",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#555",
                  marginBottom: "10px",
                  fontWeight: "500",
                }}
              >
                Personalização +R$25,00 (Opcional):
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Nome"
                  value={nomePersonalizacao}
                  onChange={(e) =>
                    setNomePersonalizacao(e.target.value.toUpperCase())
                  }
                  style={{
                    flex: "2",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    outline: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Nº"
                  value={numeroPersonalizacao}
                  onChange={(e) => setNumeroPersonalizacao(e.target.value)}
                  style={{
                    flex: "1",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    outline: "none",
                  }}
                />
              </div>
              <p style={{ fontSize: "11px", color: "#aaa", marginTop: "8px" }}>
                Ex: NEYMAR JR | 10
              </p>
            </div>

            {/* CALCULAR FRETE */}
            <div style={{ marginBottom: "30px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#555",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                🚚 CALCULAR PRAZOS E PREÇOS
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  style={{
                    flex: "1",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    padding: "0 20px",
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  CONSULTAR
                </button>
              </div>
            </div>

            {/* BOTÃO COMPRAR VERDE */}
            <button
              onClick={handleAdicionarAoCarrinho}
              style={{
                width: "100%",
                padding: "18px",
                backgroundColor: "#00c853",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "900",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#00b248")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#00c853")}
            >
              ADICIONAR AO CARRINHO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
