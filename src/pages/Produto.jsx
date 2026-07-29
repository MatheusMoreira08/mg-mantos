import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { CarrinhoContext } from "../context/carrinho-context";

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
      const res = await fetch('/api/frete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cepDestino: cepLimpo })
      });
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
      <div style={{ textAlign: "center", marginTop: "80px", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
        <p style={{ fontSize: "48px" }}>\U0001f455</p>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "var(--text-primary)" }}>
          Produto n\u00e3o encontrado.
        </p>
        <p
          onClick={() => navigate("/")}
          style={{
            color: "var(--accent)",
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
      <p style={{ textAlign: "center", marginTop: "50px", color: "var(--text-secondary)" }}>
        Carregando...
      </p>
    );

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
        padding: "40px 0",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "20px" }}>
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
              alignSelf: "flex-start",
              minWidth: "300px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "var(--bg-card)",
              boxShadow: "var(--shadow-card)",
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
                maxWidth: "520px",
                maxHeight: "560px",
                objectFit: "contain",
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
                color: "var(--text-primary)",
              }}
            >
              {produto.name}
            </h1>
            <p
              style={{
                fontSize: "36px",
                fontWeight: "900",
                color: "var(--accent)",
                marginBottom: "5px",
              }}
            >
              R$ {Number(produto.price).toFixed(2).replace(".", ",")}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                paddingBottom: "20px",
                borderBottom: "1px solid var(--border)",
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
                          ? "2px solid var(--accent)"
                            : "1px solid var(--border)",
                      backgroundColor:
                          tamanhoSelecionado === tam ? "rgba(106, 13, 173, 0.16)" : "var(--bg-secondary)",
                      color:
                        tamanhoSelecionado === tam
                            ? "var(--accent)"
                            : "var(--text-secondary)",
                      fontWeight: "bold",
                      fontSize: "13px",
                        borderRadius: "var(--radius-md)",
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
                backgroundColor: "var(--bg-card)",
                padding: "20px",
                borderRadius: "var(--radius-lg)",
                marginBottom: "30px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
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
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    outline: "none",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
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
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    outline: "none",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "8px" }}>
                Ex: NEYMAR JR | 10
              </p>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "var(--text-secondary)",
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
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    outline: "none",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                  }}
                />
                <button
                  onClick={handleCalcularFrete}
                  disabled={calculandoFrete}
                  style={{
                    padding: "0 20px",
                    backgroundColor: calculandoFrete ? "var(--bg-card-hover)" : "var(--accent)",
                    color: "var(--text-primary)",
                    border: "none",
                    borderRadius: "var(--radius-md)",
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
                    <p style={{ color: "var(--error)" }}>{freteResultado.erro}</p>
                  ) : Array.isArray(freteResultado) ? (
                    freteResultado.map((opcao, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          backgroundColor: "rgba(45, 158, 90, 0.14)",
                          padding: "8px 12px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid rgba(45, 158, 90, 0.28)",
                          marginBottom: "6px",
                          color: "var(--text-primary)",
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
                    <p style={{ color: "var(--text-secondary)" }}>Nenhuma opção disponível.</p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleAdicionarAoCarrinho}
              style={{
                width: "100%",
                padding: "18px",
                backgroundColor: adicionado ? "var(--success)" : "var(--accent)",
                color: "var(--text-primary)",
                fontSize: "16px",
                fontWeight: "900",
                border: "none",
                borderRadius: "var(--radius-md)",
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
                  color: "var(--accent)",
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
