import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { CarrinhoContext } from "../context/CarrinhoContext";

export default function Produto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [freteResultado, setFreteResultado] = useState(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const { adicionarAoCarrinho } = useContext(CarrinhoContext);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [nomePersonalizacao, setNomePersonalizacao] = useState("");
  const [numeroPersonalizacao, setNumeroPersonalizacao] = useState("");
  const [cep, setCep] = useState("");
  const [erroProduto, setErroProduto] = useState(false);
  const tamanhos = ["P", "M", "G", "GG", "2GG", "3GG"];

  useEffect(() => {
    const fetchProduto = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (data) {
        setProduto(data);
      } else {
        console.error("Produto n\u00e3o encontrado:", error?.message);
        setErroProduto(true);
      }
    };
    fetchProduto();
  }, [id]);

  const handleCalcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos.");
      return;
    }
    setCalculandoFrete(true);
    setFreteResultado(null);
    try {
      const res = await fetch(`/api/frete?cep=${cepLimpo}`);
      const data = await res.json();
      setFreteResultado(data);
    } catch {
      setFreteResultado({
        erro: "Não foi possível calcular o frete. Tente novamente.",
      });
    } finally {
      setCalculandoFrete(false);
    }
  };

  const handleAdicionarAoCarrinho = () => {
    if (!tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho antes de comprar!");
      return;
    }
    const temPersonalizacao =
      nomePersonalizacao.trim() !== "" || numeroPersonalizacao.trim() !== "";
    const precoFinal = temPersonalizacao
      ? Number(produto.price) + 25
      : Number(produto.price);
    adicionarAoCarrinho({
      ...produto,
      price: precoFinal,
      tamanho: tamanhoSelecionado,
      personalizacao: temPersonalizacao
        ? `${nomePersonalizacao} - ${numeroPersonalizacao}`
        : "Sem personalização",
      quantidade: 1,
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2500);
  };

  if (erroProduto)
    return (
      <div style={{ textAlign: "center", marginTop: "80px", color: "#666" }}>
        <p style={{ fontSize: "48px" }}>\U0001f455</p>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
          Produto n\u00e3o encontrado.
        </p>
        <p
          onClick={() => navigate("/")}
          style={{
            color: "rgb(106, 13, 173)",
            cursor: "pointer",
            textDecoration: "underline",
            marginTop: "10px",
          }}
        >
          Voltar para o in\u00edcio
        </p>
      </div>
    );

  if (!produto)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "#666" }}>
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
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "20px" }}>
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/")}
          >
            Início
          </span>{" "}
          {">"} {produto.name}
        </p>
        <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
          {/* BLOCO DA IMAGEM AJUSTADO PARA FICAR IGUAL AO EXEMPLO */}
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              border: "1px solid #eaeaea",
              borderRadius: "8px",
              padding: "20px" /* Bordinha branca mais sutil */,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={
                produto.image || produto.imagem
                  ? `/${produto.image || produto.imagem}`
                  : "/placeholder-camisa.png"
              }
              onError={(e) => {
                e.target.src = "/placeholder-camisa.png";
              }}
              alt={produto.name}
              style={{
                width: "100%",
                maxWidth: "400px" /* Impede a camisa de ficar gigante */,
                maxHeight: "450px" /* Controla a altura */,
                objectFit: "contain" /* Mantém as proporções sem cortar */,
                display: "block",
              }}
            />
          </div>

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
                color: "#000",
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
                      backgroundColor:
                        tamanhoSelecionado === tam ? "#f3e8ff" : "#fff",
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

            <div style={{ marginBottom: "30px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#555",
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
                  onKeyDown={(e) => e.key === "Enter" && handleCalcularFrete()}
                  maxLength={9}
                  style={{
                    flex: "1",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleCalcularFrete}
                  disabled={calculandoFrete}
                  style={{
                    padding: "0 20px",
                    backgroundColor: calculandoFrete ? "#999" : "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    cursor: calculandoFrete ? "not-allowed" : "pointer",
                    fontSize: "12px",
                  }}
                >
                  {calculandoFrete ? "..." : "CONSULTAR"}
                </button>
              </div>
              {freteResultado && (
                <div style={{ marginTop: "12px", fontSize: "13px" }}>
                  {freteResultado.erro ? (
                    <p style={{ color: "#ff4757" }}>{freteResultado.erro}</p>
                  ) : Array.isArray(freteResultado) ? (
                    freteResultado.map((opcao, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          backgroundColor: "#f0faf0",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          border: "1px solid #d4edda",
                          marginBottom: "6px",
                        }}
                      >
                        <span>
                          {opcao.name} — {opcao.delivery_time} dias úteis
                        </span>
                        <strong>
                          R$ {Number(opcao.price).toFixed(2).replace(".", ",")}
                        </strong>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#888" }}>Nenhuma opção disponível.</p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleAdicionarAoCarrinho}
              style={{
                width: "100%",
                padding: "18px",
                backgroundColor: adicionado ? "#00b248" : "#00c853",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "900",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "background 0.3s",
                marginBottom: "12px",
              }}
            >
              {adicionado
                ? "✓ ADICIONADO AO CARRINHO!"
                : "ADICIONAR AO CARRINHO"}
            </button>

            {adicionado && (
              <p
                onClick={() => navigate("/carrinho")}
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "rgb(106, 13, 173)",
                  cursor: "pointer",
                  textDecoration: "underline",
                  margin: 0,
                }}
              >
                Ver carrinho →
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
