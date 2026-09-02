import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { CarrinhoContext } from "../context/carrinho-context";
import { useToast } from "../context/ToastContext";
import productsData from "../data/products.json";

export default function Produto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const localInicial = productsData.find((p) => String(p.id) === String(id));
  const [produto, setProduto] = useState(localInicial || null);
  const [imagemAtiva, setImagemAtiva] = useState(() => {
    if (!localInicial) return "/placeholder-camisa.png";
    const img = localInicial.image || localInicial.imagem || (Array.isArray(localInicial.images) && localInicial.images[0]) || "";
    return img ? `/${img.replace(/^\//, "")}` : "/placeholder-camisa.png";
  });
  const [freteResultado, setFreteResultado] = useState(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const { adicionarAoCarrinho } = useContext(CarrinhoContext);

  const [modeloSelecionado, setModeloSelecionado] = useState(() => {
    return localInicial?.badge?.toLowerCase().includes("jogador") ? "JOGADOR" : "TORCEDOR";
  });
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [nomePersonalizacao, setNomePersonalizacao] = useState("");
  const [numeroPersonalizacao, setNumeroPersonalizacao] = useState("");
  const [cep, setCep] = useState("");
  const [erroProduto, setErroProduto] = useState(!localInicial);

  const tamanhos = ["P", "M", "G", "GG", "2GG", "3GG"];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const fetchProduto = async () => {
      try {
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();
        if (data) {
          setProduto(data);
          const imgInicial =
            data.image ||
            data.imagem ||
            (Array.isArray(data.images) && data.images[0]) ||
            "";
          setImagemAtiva(
            imgInicial ? `/${imgInicial.replace(/^\//, "")}` : "/placeholder-camisa.png"
          );
          if (data.badge && data.badge.toLowerCase().includes("jogador")) {
            setModeloSelecionado("JOGADOR");
          }
          setErroProduto(false);
        }
      } catch {
        // Supabase offline: mantem produto local ja carregado instantaneamente
      }
    };
    fetchProduto();
  }, [id]);

  const precoBase = produto ? Number(produto.price) : 129.9;
  const precoModelo = modeloSelecionado === "JOGADOR" ? precoBase + 30 : precoBase;
  const temPersonalizacao = nomePersonalizacao.trim() !== "" || numeroPersonalizacao.trim() !== "";
  const precoFinal = temPersonalizacao ? precoModelo + 25 : precoModelo;

  const handleCalcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      showToast("Digite um CEP válido com 8 dígitos.", "warning");
      return;
    }
    setCalculandoFrete(true);
    setFreteResultado(null);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setFreteResultado({ erro: "CEP não encontrado. Verifique os dígitos." });
        return;
      }

      const localidade = data.localidade && data.uf ? `${data.localidade} - ${data.uf}` : "Sua região";

      setFreteResultado({
        localidade,
        opcoes: [
          { name: `PAC (Econômico)`, price: 19.9, delivery_time: "4 a 7" },
          { name: `SEDEX (Expresso)`, price: 32.9, delivery_time: "2 a 3" },
        ],
      });
    } catch {
      setFreteResultado({
        localidade: "Brasil",
        opcoes: [
          { name: "PAC (Econômico)", price: 19.9, delivery_time: "4 a 7" },
          { name: "SEDEX (Expresso)", price: 34.9, delivery_time: "2 a 3" },
        ],
      });
    } finally {
      setCalculandoFrete(false);
    }
  };

  const handleAdicionarAoCarrinho = () => {
    if (!tamanhoSelecionado) {
      showToast("Por favor, selecione um tamanho antes de comprar!", "warning");
      return;
    }
    adicionarAoCarrinho({
      ...produto,
      price: precoFinal,
      modelo: modeloSelecionado,
      tamanho: tamanhoSelecionado,
      personalizacao: temPersonalizacao
        ? `${nomePersonalizacao} - ${numeroPersonalizacao}`
        : "Sem personalização",
      quantidade: 1,
    });
    showToast("Manto adicionado ao carrinho com sucesso!", "success");
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2500);
  };

  if (erroProduto)
    return (
      <div style={{ textAlign: "center", marginTop: "80px", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
        <p style={{ fontSize: "48px" }}>👕</p>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "var(--text-primary)" }}>
          Produto não encontrado.
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
          Voltar para o início
        </p>
      </div>
    );

  if (!produto)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
        Carregando manto...
      </p>
    );

  const listaImagens = Array.isArray(produto.images) && produto.images.length > 0
    ? produto.images.map(img => `/${img.replace(/^\//, '')}`)
    : [imagemAtiva];

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
        {/* Breadcrumbs */}
        <nav style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }} className="hover:text-primary">
            Home
          </Link>
          <span>›</span>
          <span style={{ color: "var(--text-primary)" }}>{produto.name}</span>
        </nav>

        {/* Product Grid Layout (Stitch Style) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
          
          {/* Esquerda: Galeria de Imagens */}
          <div style={{ display: "flex", gap: "16px", flexDirection: "row" }}>
            
            {/* Thumbnails Verticais */}
            {listaImagens.length > 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "80px", flexShrink: 0 }} className="hide-scrollbar">
                {listaImagens.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImagemAtiva(img)}
                    style={{
                      width: "80px",
                      height: "90px",
                      borderRadius: "var(--radius-md)",
                      border: imagemAtiva === img ? "2px solid var(--accent)" : "1px solid var(--border)",
                      backgroundColor: "var(--bg-card)",
                      overflow: "hidden",
                      cursor: "pointer",
                      padding: "4px",
                      opacity: imagemAtiva === img ? 1 : 0.6,
                      transition: "all 0.2s",
                    }}
                  >
                    <img
                      src={img}
                      alt={`${produto.name} ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onError={(e) => { e.target.src = "/placeholder-camisa.png"; }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Imagem Principal */}
            <div
              style={{
                flex: "1",
                minHeight: "420px",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--bg-card)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <img
                src={imagemAtiva}
                onError={(e) => { e.target.src = "/placeholder-camisa.png"; }}
                alt={produto.name}
                style={{
                  width: "100%",
                  maxHeight: "520px",
                  objectFit: "contain",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Direita: Detalhes e Compra */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "36px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                margin: "0 0 12px 0",
                color: "var(--text-primary)",
              }}
            >
              {produto.name}
            </h1>

            {/* Preço com hierarquia igual ao Stitch */}
            <p style={{ fontSize: "22px", fontWeight: "bold", color: "var(--accent-light)", margin: "0 0 24px 0" }}>
              A partir de R$ {precoModelo.toFixed(2).replace(".", ",")}
              <span style={{ fontSize: "14px", fontWeight: "normal", color: "var(--text-muted)", marginLeft: "10px" }}>
                (Jogador: R$ {(precoBase + 30).toFixed(2).replace(".", ",")})
              </span>
            </p>

            {/* Seletor de Modelo (Torcedor vs Jogador) */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                Modelo
              </label>
              <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                {["TORCEDOR", "JOGADOR"].map((mod) => (
                  <button
                    key={mod}
                    onClick={() => setModeloSelecionado(mod)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "var(--radius-sm)",
                      border: modeloSelecionado === mod ? "2px solid var(--accent)" : "1px solid var(--border)",
                      backgroundColor: modeloSelecionado === mod ? "rgba(106, 13, 173, 0.15)" : "var(--bg-card)",
                      color: modeloSelecionado === mod ? "var(--accent-light)" : "var(--text-primary)",
                      fontWeight: "900",
                      fontSize: "12px",
                      letterSpacing: "0.5px",
                      cursor: "pointer",
                    }}
                  >
                    {mod}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic", margin: 0 }}>
                * Jogador: Performance / Slim Fit (mais justo). Torcedor: Ajuste padrão (conforto).
              </p>
            </div>

            {/* Seletor de Tamanhos com Guia de Medidas */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)" }}>
                  Tamanho
                </label>
                <a href="#guia-medidas" onClick={(e) => { e.preventDefault(); showToast("Guia de Medidas: P (70x50 cm) | M (72x52 cm) | G (74x54 cm) | GG (76x56 cm) | 2GG (78x58 cm) | 3GG (80x60 cm)", "info"); }} style={{ fontSize: "12px", color: "var(--accent-light)", textDecoration: "underline" }}>
                  Guia de Medidas
                </a>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {tamanhos.map((tam) => (
                  <button
                    key={tam}
                    onClick={() => setTamanhoSelecionado(tam)}
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "var(--radius-md)",
                      border: tamanhoSelecionado === tam ? "2px solid var(--accent)" : "1px solid var(--border)",
                      backgroundColor: tamanhoSelecionado === tam ? "rgba(106, 13, 173, 0.18)" : "var(--bg-card)",
                      color: tamanhoSelecionado === tam ? "var(--accent-light)" : "var(--text-primary)",
                      fontFamily: "var(--font-ui)",
                      fontWeight: "bold",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {tam}
                  </button>
                ))}
              </div>
            </div>

            {/* Caixa de Personalização do Manto (Stitch Design) */}
            <div
              style={{
                backgroundColor: "var(--bg-card)",
                padding: "16px 20px",
                borderRadius: "var(--radius-lg)",
                marginBottom: "24px",
                border: "1px dashed var(--border)",
              }}
            >
              <h3 style={{ fontSize: "12px", fontWeight: "900", letterSpacing: "1px", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 12px 0" }}>
                ✏️ PERSONALIZAÇÃO DO MANTO <span style={{ fontSize: "11px", color: "var(--accent-light)", fontWeight: "normal" }}>(+R$ 25,00)</span>
              </h3>
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Nome (Deixe em branco para sem nome)"
                  value={nomePersonalizacao}
                  onChange={(e) => setNomePersonalizacao(e.target.value.toUpperCase())}
                  style={{
                    flex: "2",
                    padding: "10px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Nº (Ex: 10)"
                  value={numeroPersonalizacao}
                  onChange={(e) => setNumeroPersonalizacao(e.target.value)}
                  style={{
                    flex: "1",
                    padding: "10px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Cálculo de Frete por CEP */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "12px", fontWeight: "900", letterSpacing: "1px", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                🚚 Consultar Frete e Prazo
              </label>
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
                    padding: "10px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleCalcularFrete}
                  disabled={calculandoFrete}
                  style={{
                    padding: "0 20px",
                    backgroundColor: calculandoFrete ? "var(--bg-card-hover)" : "var(--border)",
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
                    <p style={{ color: "var(--error)", margin: "4px 0 0" }}>{freteResultado.erro}</p>
                  ) : freteResultado.opcoes ? (
                    <div>
                      {freteResultado.localidade && (
                        <p style={{ fontSize: "12px", color: "var(--accent-light)", fontWeight: "bold", margin: "0 0 8px 0" }}>
                          📍 Entrega para {freteResultado.localidade}:
                        </p>
                      )}
                      {freteResultado.opcoes.map((opcao, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "rgba(45, 158, 90, 0.12)",
                            padding: "10px 14px",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid rgba(45, 158, 90, 0.3)",
                            marginBottom: "8px",
                            color: "var(--text-primary)",
                          }}
                        >
                          <span>🚚 {opcao.name} ({opcao.delivery_time} dias úteis)</span>
                          <strong style={{ color: "var(--success)" }}>
                            R$ {Number(opcao.price).toFixed(2).replace(".", ",")}
                          </strong>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Ações Principais (Botão Roxo Glowing + Favorito ♡) */}
            <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
              <button
                onClick={handleAdicionarAoCarrinho}
                className="glowing-btn"
                style={{
                  flex: "1",
                  padding: "16px",
                  backgroundColor: adicionado ? "var(--success)" : "var(--accent)",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                🛒 {adicionado ? "✓ ADICIONADO AO CARRINHO!" : "ADICIONAR AO CARRINHO"}
              </button>

              <button
                onClick={() => setFavorito(!favorito)}
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-card)",
                  color: favorito ? "var(--error)" : "var(--text-primary)",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                {favorito ? "❤️" : "♡"}
              </button>
            </div>

            {adicionado && (
              <p
                onClick={() => navigate("/carrinho")}
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "var(--accent-light)",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginTop: "12px",
                }}
              >
                Ir para o carrinho →
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
