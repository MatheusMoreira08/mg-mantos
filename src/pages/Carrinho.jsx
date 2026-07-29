import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarrinhoContext } from "../context/carrinho-context";
import { supabase, isSupabaseConfigured } from "../services/supabase";

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho, valorTotal } =
    useContext(CarrinhoContext);

  const [usuario, setUsuario] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [processando, setProcessando] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const navigate = useNavigate();

  // Estados para o formulário de NOVO ENDEREÇO
  const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [salvandoEndereco, setSalvandoEndereco] = useState(false);

  // Busca os endereços do cliente se Supabase estiver ativo
  const carregarEnderecos = async (userId) => {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", userId);
      if (error) console.error("Erro ao puxar endereços:", error);

      if (data && data.length > 0) {
        setEnderecos(data);
        setEnderecoSelecionado(data[0].id);
        setMostrarFormEndereco(false);
      } else {
        setMostrarFormEndereco(true);
      }
    } catch (e) {
      console.warn("Erro ao buscar endereços:", e);
    }
  };

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      if (!isSupabaseConfigured) return;
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setUsuario(session.user);
          carregarEnderecos(session.user.id);
        }
      } catch (e) {
        console.warn("Sem sessão ativa:", e);
      }
    };
    carregarDadosUsuario();
  }, []);

  // AUTO-PREENCHIMENTO DE CEP VIA VIACEP
  const handleCepChange = async (e) => {
    const valor = e.target.value;
    setNovoEndereco((prev) => ({ ...prev, cep: valor }));

    const cepLimpo = valor.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      setBuscandoCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setNovoEndereco((prev) => ({
            ...prev,
            rua: data.logradouro || prev.rua,
            bairro: data.bairro || prev.bairro,
            cidade: data.localidade || prev.cidade,
            estado: data.uf || prev.estado,
          }));
        }
      } catch (err) {
        console.warn("Erro ao consultar ViaCEP:", err);
      } finally {
        setBuscandoCep(false);
      }
    }
  };

  // Salva o endereço escrito no carrinho
  const handleSalvarEndereco = async () => {
    if (!novoEndereco.cep || !novoEndereco.rua || !novoEndereco.numero) {
      return alert("Por favor, preencha pelo menos o CEP, Rua e Número.");
    }

    if (!usuario || !isSupabaseConfigured) {
      // Salva localmente caso offline/sem login
      const enderecoLocal = {
        id: "local-" + Date.now(),
        ...novoEndereco,
      };
      setEnderecos((prev) => [...prev, enderecoLocal]);
      setEnderecoSelecionado(enderecoLocal.id);
      setMostrarFormEndereco(false);
      return;
    }

    setSalvandoEndereco(true);
    try {
      const { error } = await supabase
        .from("addresses")
        .insert([
          {
            user_id: usuario.id,
            cep: novoEndereco.cep,
            rua: novoEndereco.rua,
            numero: novoEndereco.numero,
            bairro: novoEndereco.bairro,
            cidade: novoEndereco.cidade,
            estado: novoEndereco.estado,
          },
        ])
        .select();

      if (error) throw new Error(error.message);

      alert("Endereço salvo com sucesso!");
      setNovoEndereco({
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      carregarEnderecos(usuario.id);
    } catch (error) {
      alert("Erro ao salvar endereço: " + error.message);
    } finally {
      setSalvandoEndereco(false);
    }
  };

  const finalizarCompra = async () => {
    if (isSupabaseConfigured && !usuario) {
      alert("Você precisa iniciar sessão para finalizar a compra!");
      navigate("/minha-conta");
      return;
    }

    setProcessando(true);

    try {
      let orderId = "PED-" + Math.floor(100000 + Math.random() * 900000);

      // Se o Supabase estiver configurado e o usuário estiver logado
      if (isSupabaseConfigured && usuario) {
        const { data: pedido, error: erroPedido } = await supabase
          .from("orders")
          .insert([
            {
              user_id: usuario.id,
              address_id: enderecoSelecionado || null,
              total: valorTotal,
              status: "pendente",
            },
          ])
          .select()
          .single();

        if (erroPedido) throw new Error("Erro ao criar pedido: " + erroPedido.message);
        orderId = pedido.id;

        const itensDoPedido = carrinho.map((item) => ({
          order_id: pedido.id,
          product_id: item.id,
          quantidade: item.quantidade,
          preco_unitario: item.price,
        }));

        await supabase.from("order_items").insert(itensDoPedido);
      }

      // Tenta criar preferência no Mercado Pago
      const mpItems = carrinho.map((item) => ({
        nome: item.name,
        quantidade: item.quantidade,
        precoUnitario: Number(item.price),
      }));

      try {
        const prefResp = await fetch("/api/criar-preferencia", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderId,
            items: mpItems,
            email: usuario?.email || "cliente@mgmantos.com.br",
          }),
        });

        if (prefResp.ok) {
          const prefData = await prefResp.json();
          limparCarrinho();
          if (prefData.init_point) {
            window.location.href = prefData.init_point;
            return;
          }
        }
      } catch (e) {
        console.warn("Servidor Vercel API não disponível localmente, usando fallback de confirmação direta:", e);
      }

      // Fallback de confirmação local
      limparCarrinho();
      navigate(`/pedido-confirmado/${orderId}`);
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      alert("ERRO: " + error.message);
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        minHeight: "100vh",
        fontFamily: "var(--font-body)",
        padding: "40px 20px 80px",
      }}
    >
      <main style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "30px",
            textTransform: "uppercase",
            fontWeight: "900",
            color: "var(--text-primary)",
          }}
        >
          Sua Sacola de Compras
        </h2>

        {carrinho.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              backgroundColor: "var(--bg-card)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span
              style={{
                fontSize: "60px",
                display: "block",
                marginBottom: "20px",
              }}
            >
              🛒
            </span>
            <h3
              style={{
                fontSize: "24px",
                marginBottom: "15px",
                fontWeight: "900",
                textTransform: "uppercase",
                color: "var(--text-primary)",
              }}
            >
              Sua sacola está vazia
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>
              Navegue pelas nossas categorias e descubra os melhores mantos!
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                backgroundColor: "var(--accent)",
                color: "#ffffff",
                textDecoration: "none",
                padding: "15px 40px",
                borderRadius: "var(--radius-md)",
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            {/* ITENS DO CARRINHO */}
            <div style={{ flex: "2", minWidth: "300px" }}>
              {carrinho.map((item) => (
                <div
                  key={`${item.id}-${item.tamanho}-${item.personalizacao}`}
                  style={{
                    display: "flex",
                    gap: "20px",
                    backgroundColor: "var(--bg-card)",
                    padding: "20px",
                    borderRadius: "var(--radius-lg)",
                    marginBottom: "15px",
                    border: "1px solid var(--border)",
                    alignItems: "center",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <img
                    src={`/${item.image || item.imagem}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/100x100/1a1a1a/ffffff?text=${encodeURIComponent(item.name)}`;
                    }}
                    alt={item.name}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "contain",
                      backgroundColor: "var(--bg-secondary)",
                      borderRadius: "var(--radius-md)",
                      padding: "5px",
                    }}
                  />
                  <div style={{ flex: "1" }}>
                    <h4
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "var(--text-primary)",
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        margin: "0 0 5px 0",
                        fontSize: "13px",
                      }}
                    >
                      Tamanho: <strong>{item.tamanho}</strong>
                    </p>
                    {item.personalizacao !== "Sem personalização" && (
                      <p
                        style={{
                          color: "var(--accent)",
                          margin: "0 0 8px 0",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        ✍️ {item.personalizacao}
                      </p>
                    )}

                    {/* CONTROLE DE QUANTIDADE (+ e -) */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Qtd:</span>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          overflow: "hidden",
                          backgroundColor: "var(--bg-secondary)",
                        }}
                      >
                        <button
                          onClick={() =>
                            atualizarQuantidade(
                              item.id,
                              item.tamanho,
                              item.personalizacao,
                              item.quantidade - 1
                            )
                          }
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            color: "var(--text-primary)",
                            padding: "4px 12px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          -
                        </button>
                        <span style={{ padding: "4px 10px", fontSize: "13px", fontWeight: "bold" }}>
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() =>
                            atualizarQuantidade(
                              item.id,
                              item.tamanho,
                              item.personalizacao,
                              item.quantidade + 1
                            )
                          }
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            color: "var(--text-primary)",
                            padding: "4px 12px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        color: "var(--accent)",
                        fontWeight: "900",
                        margin: "0 0 10px 0",
                        fontSize: "16px",
                      }}
                    >
                      R${" "}
                      {(Number(item.price) * item.quantidade)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                    <button
                      onClick={() =>
                        removerDoCarrinho(
                          item.id,
                          item.tamanho,
                          item.personalizacao
                        )
                      }
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--error)",
                        border: "1px solid var(--error)",
                        padding: "6px 12px",
                        borderRadius: "var(--radius-md)",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "11px",
                        transition: "0.2s",
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RESUMO DO PEDIDO E ENDEREÇO */}
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                backgroundColor: "var(--bg-card)",
                padding: "30px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                height: "fit-content",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px 0",
                  textTransform: "uppercase",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "15px",
                  fontWeight: "900",
                  fontSize: "18px",
                  color: "var(--text-primary)",
                }}
              >
                Resumo do Pedido
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  color: "var(--text-secondary)",
                  fontWeight: "500",
                }}
              >
                <span>Subtotal ({carrinho.reduce((a, b) => a + b.quantidade, 0)} itens)</span>
                <span>R$ {valorTotal.toFixed(2).replace(".", ",")}</span>
              </div>

              {/* SESSÃO DE ENDEREÇO INTEGRADA COM VIACEP */}
              {mostrarFormEndereco || enderecos.length === 0 ? (
                <div
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      color: "var(--text-primary)",
                      marginBottom: "15px",
                      fontSize: "13px",
                      fontWeight: "900",
                      textTransform: "uppercase",
                    }}
                  >
                    📍 Endereço de Entrega
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        placeholder="CEP (Auto-preenchimento)"
                        value={novoEndereco.cep}
                        onChange={handleCepChange}
                        maxLength={9}
                        style={{
                          width: "100%",
                          padding: "10px",
                          boxSizing: "border-box",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          fontSize: "13px",
                          outline: "none",
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                        }}
                      />
                      {buscandoCep && (
                        <span
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                            fontSize: "11px",
                            color: "var(--accent)",
                          }}
                        >
                          Buscando CEP...
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Rua / Logradouro"
                      value={novoEndereco.rua}
                      onChange={(e) =>
                        setNovoEndereco({
                          ...novoEndereco,
                          rua: e.target.value,
                        })
                      }
                      style={{
                        padding: "10px",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "13px",
                        outline: "none",
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="text"
                        placeholder="Número"
                        value={novoEndereco.numero}
                        onChange={(e) =>
                          setNovoEndereco({
                            ...novoEndereco,
                            numero: e.target.value,
                          })
                        }
                        style={{
                          flex: 1,
                          padding: "10px",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          fontSize: "13px",
                          outline: "none",
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Bairro"
                        value={novoEndereco.bairro}
                        onChange={(e) =>
                          setNovoEndereco({
                            ...novoEndereco,
                            bairro: e.target.value,
                          })
                        }
                        style={{
                          flex: 2,
                          padding: "10px",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          fontSize: "13px",
                          outline: "none",
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="text"
                        placeholder="Cidade"
                        value={novoEndereco.cidade}
                        onChange={(e) =>
                          setNovoEndereco({
                            ...novoEndereco,
                            cidade: e.target.value,
                          })
                        }
                        style={{
                          flex: 2,
                          padding: "10px",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          fontSize: "13px",
                          outline: "none",
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                        }}
                      />
                      <input
                        type="text"
                        placeholder="UF"
                        value={novoEndereco.estado}
                        onChange={(e) =>
                          setNovoEndereco({
                            ...novoEndereco,
                            estado: e.target.value,
                          })
                        }
                        maxLength={2}
                        style={{
                          flex: 1,
                          padding: "10px",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          fontSize: "13px",
                          outline: "none",
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                        }}
                      />
                    </div>
                    <button
                      onClick={handleSalvarEndereco}
                      disabled={salvandoEndereco}
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "#ffffff",
                        padding: "12px",
                        borderRadius: "var(--radius-md)",
                        fontWeight: "bold",
                        cursor: "pointer",
                        marginTop: "5px",
                        fontSize: "13px",
                        border: "none",
                      }}
                    >
                      {salvandoEndereco ? "SALVANDO..." : "SALVAR ENDEREÇO"}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      📍 Entregar em:
                    </p>
                    <button
                      onClick={() => setMostrarFormEndereco(true)}
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--accent)",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      + Novo
                    </button>
                  </div>
                  <select
                    value={enderecoSelecionado}
                    onChange={(e) => setEnderecoSelecionado(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      outline: "none",
                      fontSize: "13px",
                    }}
                  >
                    {enderecos.map((end) => (
                      <option key={end.id} value={end.id}>
                        {end.rua}, {end.numero} - {end.cidade}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* TOTAL E BOTÃO FINALIZAR */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                  fontSize: "22px",
                  fontWeight: "900",
                }}
              >
                <span>Total</span>
                <span style={{ color: "var(--accent)" }}>
                  R$ {valorTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <button
                onClick={finalizarCompra}
                disabled={processando || mostrarFormEndereco}
                style={{
                  backgroundColor:
                    processando || mostrarFormEndereco
                      ? "var(--bg-card-hover)"
                      : "var(--accent)",
                  color: "#ffffff",
                  border: "none",
                  padding: "18px",
                  borderRadius: "var(--radius-md)",
                  fontWeight: "900",
                  fontSize: "15px",
                  width: "100%",
                  cursor:
                    processando || mostrarFormEndereco
                      ? "not-allowed"
                      : "pointer",
                  textTransform: "uppercase",
                  transition: "0.2s",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {processando
                  ? "PROCESSANDO..."
                  : mostrarFormEndereco
                  ? "CADASTRE UM ENDEREÇO"
                  : "FINALIZAR COMPRA 💳"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
