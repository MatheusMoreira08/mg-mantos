import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarrinhoContext } from "../context/carrinho-context";
import { supabase } from "../services/supabase";
import { useToast } from "../context/ToastContext";
import AddressForm from "../components/AddressForm";
import { listarEnderecos, salvarEndereco } from "../services/addressService";

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, limparCarrinho, valorTotal } =
    useContext(CarrinhoContext);
  const { showToast } = useToast();

  const [usuario, setUsuario] = useState(() => {
    try {
      const local = localStorage.getItem("mg_mantos_user_session");
      return local ? JSON.parse(local) : null;
    } catch {
      return null;
    }
  });

  const [enderecos, setEnderecos] = useState(() => {
    try {
      const localUser = localStorage.getItem("mg_mantos_user_session");
      if (localUser) {
        const u = JSON.parse(localUser);
        if (u?.id) {
          const salvos = localStorage.getItem(`mg_mantos_enderecos_${u.id}`);
          return salvos ? JSON.parse(salvos) : [];
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [enderecoSelecionado, setEnderecoSelecionado] = useState(() => {
    try {
      const localUser = localStorage.getItem("mg_mantos_user_session");
      if (localUser) {
        const u = JSON.parse(localUser);
        if (u?.id) {
          const salvos = localStorage.getItem(`mg_mantos_enderecos_${u.id}`);
          const parsed = salvos ? JSON.parse(salvos) : [];
          return parsed.length > 0 ? parsed[0].id : "";
        }
      }
      return "";
    } catch {
      return "";
    }
  });

  const [processando, setProcessando] = useState(false);
  const navigate = useNavigate();

  // Estados para o formulário de NOVO ENDEREÇO direto no carrinho
  const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false);
  const [salvandoEndereco, setSalvandoEndereco] = useState(false);

  // Busca os endereços do cliente
  const carregarEnderecos = async (userId) => {
    if (!userId) {
      setCarregandoEnderecos(false);
      return;
    }
    try {
      const data = await listarEnderecos(userId);
      if (data && data.length > 0) {
        setEnderecos(data);
        setEnderecoSelecionado((prev) =>
          prev && data.some((d) => d.id === prev) ? prev : data[0].id
        );
      } else {
        setEnderecos([]);
      }
    } catch (err) {
      console.warn("[Carrinho] Erro ao buscar endereços:", err);
    } finally {
      setCarregandoEnderecos(false);
    }
  };

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUsuario(session.user);
          await carregarEnderecos(session.user.id);
          return;
        }
      } catch (err) {
        console.warn("[Carrinho] Erro ao verificar sessão do Supabase:", err);
      }

      if (import.meta.env.DEV) {
        const localSession = localStorage.getItem("mg_mantos_user_session");
        if (localSession) {
          const parsed = JSON.parse(localSession);
          setUsuario(parsed);
          if (parsed.id) await carregarEnderecos(parsed.id);
        } else {
          setCarregandoEnderecos(false);
        }
      } else {
        setCarregandoEnderecos(false);
      }
    };
    carregarDadosUsuario();
  }, []);

  // Salva o endereço escrito no carrinho direto no banco de dados
  const handleSalvarEndereco = async (dadosEndereco) => {
    if (!usuario?.id) {
      showToast("Você precisa iniciar sessão para cadastrar um endereço!", "warning");
      navigate("/minha-conta");
      return;
    }

    setSalvandoEndereco(true);
    try {
      const enderecoSalvo = await salvarEndereco(usuario.id, dadosEndereco);
      showToast("Endereço salvo com sucesso!", "success");

      const atualizados = [
        enderecoSalvo,
        ...enderecos.filter((e) => e.id !== enderecoSalvo.id),
      ];
      setEnderecos(atualizados);
      setEnderecoSelecionado(enderecoSalvo.id);
      setMostrarFormEndereco(false);
    } catch (error) {
      console.error("[Carrinho] Erro ao salvar endereço:", error);
      showToast(error.message || "Não foi possível salvar o endereço.", "error");
    } finally {
      setSalvandoEndereco(false);
    }
  };

  const finalizarCompra = async () => {
    if (!usuario) {
      showToast("Você precisa iniciar sessão para finalizar a compra!", "warning");
      navigate("/minha-conta");
      return;
    }

    setProcessando(true);

    try {
      // 1. Cria o Pedido principal
      const { data: pedido, error: erroPedido } = await supabase
        .from("orders")
        .insert([
          {
            user_id: usuario.id,
            address_id: enderecoSelecionado,
            total: valorTotal,
            status: "pendente",
          },
        ])
        .select()
        .single();

      if (erroPedido)
        throw new Error("Erro na tabela orders: " + erroPedido.message);

      // 2. Prepara os itens
      const itensDoPedido = carrinho.map((item) => ({
        order_id: pedido.id,
        product_id: item.id,
        quantidade: item.quantidade,
        preco_unitario: item.price,
      }));

      // 3. Salva os itens
      const { error: erroItens } = await supabase
        .from("order_items")
        .insert(itensDoPedido);
      if (erroItens)
        throw new Error("Erro na tabela order_items: " + erroItens.message);

      // 4. Cria preferência de pagamento no Mercado Pago (Checkout Pro)
      const resPreferencia = await fetch("/api/criar-preferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: pedido.id,
          email: usuario.email,
          items: carrinho.map((item) => ({
            nome: item.name,
            quantidade: item.quantidade,
            precoUnitario: item.price,
          })),
        }),
      });

      if (!resPreferencia.ok) {
        throw new Error("Falha ao iniciar pagamento.");
      }

      const { init_point } = await resPreferencia.json();
      if (!init_point) throw new Error("Link de pagamento não gerado.");

      limparCarrinho();
      window.location.href = init_point;
    } catch (error) {
      if (import.meta.env.DEV) {
        limparCarrinho();
        showToast("🎉 Pedido finalizado com sucesso em modo de demonstração!", "success");
        navigate("/minha-conta");
      } else {
        showToast("Não foi possível finalizar o pedido. Tente novamente.", "error");
        console.error("[Carrinho] Erro ao finalizar compra:", error);
      }
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
        padding: "40px 20px",
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
          Seu Carrinho
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
                  color: "var(--text-primary)",
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
                  key={`${item.id}-${item.tamanho}-${item.personalizacao}-${item.modelo || "padrao"}`}
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
                    src={`/${String(item.image || item.imagem || "placeholder-camisa.png").replace(/^\//, "")}`}
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
                        margin: "0 0 10px 0",
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
                      Qtd: {item.quantidade} | Tam: {item.tamanho}
                      {item.modelo && ` | Versão: ${item.modelo}`}
                    </p>
                    {item.personalizacao && item.personalizacao !== "Sem personalização" && (
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          margin: "0 0 5px 0",
                          fontSize: "12px",
                        }}
                      >
                        Pers: {item.personalizacao}
                      </p>
                    )}
                    <p
                      style={{
                        color: "var(--accent)",
                        fontWeight: "900",
                        margin: 0,
                        fontSize: "16px",
                      }}
                    >
                      R${" "}
                      {(Number(item.price) * item.quantidade)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      removerDoCarrinho(
                        item.id,
                        item.tamanho,
                        item.personalizacao,
                        item.modelo,
                      )
                    }
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--error)",
                      border: "1px solid var(--error)",
                      padding: "8px 15px",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "12px",
                      transition: "0.2s",
                    }}
                  >
                    Remover
                  </button>
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
                <span>Subtotal ({carrinho.length} itens)</span>
                <span>R$ {valorTotal.toFixed(2).replace(".", ",")}</span>
              </div>

              {/* SESSÃO DE ENDEREÇO INTEGRADA */}
              {!usuario ? (
                <div
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid var(--border)",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight: "bold",
                      marginBottom: "15px",
                    }}
                  >
                    Faça login para selecionar o endereço de entrega.
                  </p>
                  <button
                    onClick={() => navigate("/minha-conta")}
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--text-primary)",
                      padding: "12px 20px",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      fontWeight: "900",
                      width: "100%",
                      fontSize: "13px",
                    }}
                  >
                    FAZER LOGIN
                  </button>
                </div>
              ) : mostrarFormEndereco ? (
                <div
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <AddressForm
                    onSalvar={handleSalvarEndereco}
                    onCancelar={enderecos.length > 0 ? () => setMostrarFormEndereco(false) : undefined}
                    salvando={salvandoEndereco}
                    titulo="Adicionar Novo Endereço"
                    submitLabel="SALVAR E CONTINUAR"
                  />
                </div>
              ) : enderecos.length > 0 ? (
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
                    value={enderecoSelecionado || (enderecos[0]?.id ?? "")}
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
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {enderecos.map((end) => (
                      <option
                        key={end.id}
                        value={end.id}
                        style={{
                          backgroundColor: "var(--bg-card)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {end.rua}, {end.numero} — {end.bairro}, {end.cidade}/{end.estado}
                      </option>
                    ))}
                  </select>
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
                      marginBottom: "12px",
                    }}
                  >
                    <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "13px", fontWeight: "bold" }}>
                      📍 Endereço de Entrega
                    </p>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                    Nenhum endereço cadastrado.
                  </p>
                  <button
                    onClick={() => setMostrarFormEndereco(true)}
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--text-primary)",
                      padding: "12px 16px",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      fontWeight: "900",
                      fontSize: "13px",
                      width: "100%",
                      textTransform: "uppercase",
                    }}
                  >
                    + CADASTRAR ENDEREÇO
                  </button>
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
                disabled={processando || mostrarFormEndereco || !usuario || enderecos.length === 0}
                style={{
                  backgroundColor:
                    processando || mostrarFormEndereco || !usuario || enderecos.length === 0
                      ? "var(--bg-card-hover)"
                      : "var(--accent)",
                  color: "var(--text-primary)",
                  border: "none",
                  padding: "18px",
                  borderRadius: "var(--radius-md)",
                  fontWeight: "900",
                  fontSize: "15px",
                  width: "100%",
                  cursor:
                    processando || mostrarFormEndereco || !usuario || enderecos.length === 0
                      ? "not-allowed"
                      : "pointer",
                  textTransform: "uppercase",
                  transition: "0.2s",
                }}
              >
                {processando
                  ? "PROCESSANDO..."
                  : !usuario
                  ? "FAÇA LOGIN PARA CONTINUAR"
                  : mostrarFormEndereco || enderecos.length === 0
                  ? "CADASTRE UM ENDEREÇO"
                  : "FINALIZAR COMPRA"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
