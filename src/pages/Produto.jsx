import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProdutoPorId, getProdutosPorCategoria } from "../services/productService";
import { CarrinhoContext } from "../context/carrinho-context";
import ProdutoCard from "../components/ProdutoCard";

export default function Produto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [imagemAtiva, setImagemAtiva] = useState("");
  const [produtosRelacionados, setProdutosRelacionados] = useState([]);
  const [freteResultado, setFreteResultado] = useState(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const { adicionarAoCarrinho } = useContext(CarrinhoContext);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [nomePersonalizacao, setNomePersonalizacao] = useState("");
  const [numeroPersonalizacao, setNumeroPersonalizacao] = useState("");
  const [cep, setCep] = useState("");
  const [erroProduto, setErroProduto] = useState(false);
  const [mostrarTabelaMedidas, setMostrarTabelaMedidas] = useState(false);

  const tamanhos = ["P", "M", "G", "GG", "2GG", "3GG"];

  const tabelaMedidas = [
    { tamanho: "P", altura: "69-71 cm", largura: "49-51 cm", peso: "50-65 kg" },
    { tamanho: "M", altura: "71-73 cm", largura: "51-53 cm", peso: "65-75 kg" },
    { tamanho: "G", altura: "73-75 cm", largura: "53-55 cm", peso: "75-85 kg" },
    { tamanho: "GG", altura: "76-78 cm", largura: "56-58 cm", peso: "85-95 kg" },
    { tamanho: "2GG", altura: "79-81 cm", largura: "59-61 cm", peso: "95-105 kg" },
    { tamanho: "3GG", altura: "82-84 cm", largura: "62-64 cm", peso: "105+ kg" },
  ];

  useEffect(() => {
    const fetchProduto = async () => {
      setErroProduto(false);
      setProduto(null);
      const data = await getProdutoPorId(id);
      if (data) {
        setProduto(data);
        setImagemAtiva(data.image || (data.images && data.images[0]) || "");

        // Carrega produtos relacionados por tag ou nome
        const categoriaRelacionada = data.tags && data.tags[0] ? data.tags[0] : "nacional";
        const relacionados = await getProdutosPorCategoria(categoriaRelacionada);
        setProdutosRelacionados(relacionados.filter((p) => String(p.id) !== String(id)).slice(0, 4));
      } else {
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
      const res = await fetch("/api/frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cepDestino: cepLimpo }),
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
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          color: "var(--text-secondary)",
          fontFamily: "var(--font-body)",
          backgroundColor: "var(--bg-primary)",
          minHeight: "80vh",
        }}
      >
        <p style={{ fontSize: "50px", marginBottom: "10px" }}>👕</p>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "var(--text-primary)",
          }}
        >
          Produto não encontrado.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--text-primary)",
            padding: "12px 24px",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Voltar para o início
        </button>
      </div>
    );

  if (!produto)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
          color: "var(--text-secondary)",
          backgroundColor: "var(--bg-primary)",
          minHeight: "80vh",
        }}
      >
        Carregando detalhes do manto...
      </div>
    );

  const listaImagens =
    Array.isArray(produto.images) && produto.images.length > 0
      ? produto.images
      : [produto.image];

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
        padding: "40px 0 80px",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 20px" }}>
        {/* BREADCRUMB */}
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
            marginBottom: "25px",
          }}
        >
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/")}
          >
            Início
          </span>{" "}
          {">"} {produto.name}
        </p>

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {/* GALERIA DE IMAGENS (COLUNA ESQUERDA) */}
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "20px",
                backgroundColor: "var(--bg-card)",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src={
                  imagemAtiva
                    ? `/${imagemAtiva}`
                    : "/placeholder-camisa.png"
                }
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/500x500/1a1a1a/ffffff?text=${encodeURIComponent(produto.name)}`;
                }}
                alt={produto.name}
                style={{
                  width: "100%",
                  maxHeight: "520px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* MINIATURAS DA GALERIA */}
            {listaImagens.length > 1 && (
              <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
                {listaImagens.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImagemAtiva(img)}
                    style={{
                      border:
                        imagemAtiva === img
                          ? "2px solid var(--accent)"
                          : "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      padding: "4px",
                      backgroundColor: "var(--bg-card)",
                      cursor: "pointer",
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <img
                      src={`/${img}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/70x70/1a1a1a/ffffff?text=${idx + 1}`;
                      }}
                      alt={`Miniatura ${idx + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETALHES E COMPRA (COLUNA DIREITA) */}
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
                fontSize: "24px",
                fontWeight: "900",
                textTransform: "uppercase",
                marginBottom: "10px",
                letterSpacing: "0.5px",
                color: "var(--text-primary)",
              }}
            >
              {produto.name}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "900",
                  color: "var(--accent)",
                  margin: 0,
                }}
              >
                R$ {Number(produto.price).toFixed(2).replace(".", ",")}
              </p>
              <span
                style={{
                  backgroundColor: "rgba(45, 158, 90, 0.15)",
                  color: "var(--success)",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Em Estoque - Envio Imediato
              </span>
            </div>

            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                paddingBottom: "20px",
                borderBottom: "1px solid var(--border)",
                marginBottom: "25px",
              }}
            >
              💳 em até <strong>3x sem juros</strong> de R${" "}
              {(Number(produto.price) / 3).toFixed(2).replace(".", ",")} no cartão
            </p>

            {/* SELEÇÃO DE TAMANHO */}
            <div style={{ marginBottom: "25px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <p style={{ fontWeight: "bold", fontSize: "13px" }}>
                  Selecione o Tamanho:
                </p>
                <button
                  onClick={() => setMostrarTabelaMedidas(true)}
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--accent)",
                    border: "none",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  📏 Guia de Medidas
                </button>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {tamanhos.map((tam) => (
                  <button
                    key={tam}
                    onClick={() => setTamanhoSelecionado(tam)}
                    style={{
                      padding: "10px 18px",
                      border:
                        tamanhoSelecionado === tam
                          ? "2px solid var(--accent)"
                          : "1px solid var(--border)",
                      backgroundColor:
                        tamanhoSelecionado === tam
                          ? "rgba(106, 13, 173, 0.16)"
                          : "var(--bg-secondary)",
                      color:
                        tamanhoSelecionado === tam
                          ? "var(--accent)"
                          : "var(--text-primary)",
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

            {/* SEÇÃO DE PERSONALIZAÇÃO */}
            <div
              style={{
                backgroundColor: "var(--bg-card)",
                padding: "20px",
                borderRadius: "var(--radius-lg)",
                marginBottom: "25px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                  fontWeight: "700",
                }}
              >
                ✍️ Personalização Oficial (+R$ 25,00):
              </p>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Nome (ex: NEYMAR JR)"
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
                    fontSize: "13px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Nº (ex: 10)"
                  value={numeroPersonalizacao}
                  onChange={(e) => setNumeroPersonalizacao(e.target.value)}
                  maxLength={3}
                  style={{
                    flex: "1",
                    padding: "12px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    outline: "none",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "13px",
                  }}
                />
              </div>

              {(nomePersonalizacao || numeroPersonalizacao) && (
                <div
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "10px 15px",
                    borderRadius: "var(--radius-md)",
                    border: "1px dashed var(--accent)",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "var(--accent)",
                    fontWeight: "bold",
                  }}
                >
                  PREVIEW: {nomePersonalizacao || "NOME"} #{numeroPersonalizacao || "00"}
                </div>
              )}
            </div>

            {/* CÁLCULO DE FRETE */}
            <div style={{ marginBottom: "25px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "var(--text-secondary)",
                }}
              >
                🚚 SIMULAR FRETE E PRAZO DE ENTREGA:
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Informe seu CEP"
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
                    fontSize: "13px",
                  }}
                />
                <button
                  onClick={handleCalcularFrete}
                  disabled={calculandoFrete}
                  style={{
                    padding: "0 20px",
                    backgroundColor: calculandoFrete
                      ? "var(--bg-card-hover)"
                      : "var(--accent)",
                    color: "var(--text-primary)",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    fontWeight: "bold",
                    cursor: calculandoFrete ? "not-allowed" : "pointer",
                    fontSize: "12px",
                  }}
                >
                  {calculandoFrete ? "..." : "CALCULAR"}
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
                    <p style={{ color: "var(--text-secondary)" }}>
                      Nenhuma opção de frete disponível.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* BOTÃO COMPRAR */}
            <button
              onClick={handleAdicionarAoCarrinho}
              style={{
                width: "100%",
                padding: "18px",
                backgroundColor: adicionado
                  ? "var(--success)"
                  : "var(--accent)",
                color: "var(--text-primary)",
                fontSize: "16px",
                fontWeight: "900",
                border: "none",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "background 0.3s",
                boxShadow: "var(--shadow-card)",
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
                  fontWeight: "bold",
                }}
              >
                Ir para a sacola de compras →
              </p>
            )}
          </div>
        </div>

        {/* MODAL TABELA DE MEDIDAS */}
        {mostrarTabelaMedidas && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              padding: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--bg-card)",
                padding: "30px",
                borderRadius: "var(--radius-lg)",
                maxWidth: "600px",
                width: "100%",
                boxShadow: "var(--shadow-hover)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "900",
                    textTransform: "uppercase",
                  }}
                >
                  📏 Tabela de Medidas (Tamanhos)
                </h3>
                <button
                  onClick={() => setMostrarTabelaMedidas(false)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                  }}
                >
                  ✕
                </button>
              </div>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                  marginBottom: "20px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)", textAlign: "left" }}>
                    <th style={{ padding: "10px", borderBottom: "1px solid var(--border)" }}>Tamanho</th>
                    <th style={{ padding: "10px", borderBottom: "1px solid var(--border)" }}>Altura</th>
                    <th style={{ padding: "10px", borderBottom: "1px solid var(--border)" }}>Largura</th>
                    <th style={{ padding: "10px", borderBottom: "1px solid var(--border)" }}>Peso Sugerido</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelaMedidas.map((m) => (
                    <tr key={m.tamanho}>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--border)", fontWeight: "bold" }}>{m.tamanho}</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--border)" }}>{m.altura}</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--border)" }}>{m.largura}</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--border)" }}>{m.peso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p style={{ fontSize: "11px", color: "var(--text-secondary)", fontStyle: "italic" }}>
                * As medidas são aproximadas e podem variar de 1 a 2 cm dependendo do lote do fabricante.
              </p>
            </div>
          </div>
        )}

        {/* PRODUTOS RELACIONADOS */}
        {produtosRelacionados.length > 0 && (
          <div style={{ marginTop: "70px" }}>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "900",
                marginBottom: "30px",
                textTransform: "uppercase",
              }}
            >
              Quem viu este manto também gostou 🔥
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {produtosRelacionados.map((rel) => (
                <ProdutoCard key={rel.id} produto={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
