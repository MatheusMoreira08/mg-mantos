import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarrinhoContext } from "../context/carrinho-context";
import { supabase } from "../services/supabase";
import { useToast } from "../context/ToastContext";
import AddressForm from "../components/AddressForm";
import { listarEnderecos, salvarEndereco } from "../services/addressService";
import { calcularFrete } from "../services/shippingService";
import { normalizarIdBanco } from "../services/productService";
import { CUPOM_LOCAL, cupomLocalValido } from "../services/cupomService";

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
  const [carregandoEnderecos, setCarregandoEnderecos] = useState(true);

  // Estados de frete (opções calculadas + opção selecionada)
  const [opcoesFrete, setOpcoesFrete] = useState([]);
  const [freteId, setFreteId] = useState("");
  const [calculandoFrete, setCalculandoFrete] = useState(false);

  // Cupom de desconto / retirada local
  const [cupom, setCupom] = useState("");

  // Endereço selecionado (usado para validar o cupom local).
  const enderecoAtual = enderecos.find((e) => e.id === enderecoSelecionado) || null;

  // Cupom "MARINGALOCAL": só aplica quando o endereço é de Maringá/Nova Esperança.
  const cupomLocalDigitado = cupom.trim().toUpperCase() === CUPOM_LOCAL;
  const cupomAplicado = cupomLocalValido(cupom, enderecoAtual);
  const FRETE_LOCAL = {
    id: "maringalocal",
    name: "Retirada/Entrega Local (Maringá)",
    price: 0,
    delivery_time: null,
    prazo_entrega: "15 a 20",
    estimated: false,
  };

  // Derivados: opção de frete selecionada, valor e total final do pedido
  const freteSelecionado = cupomAplicado
    ? FRETE_LOCAL
    : opcoesFrete.find((o) => o.id === freteId) || null;
  const freteValor = freteSelecionado ? Number(freteSelecionado.price) : 0;
  const totalFinal = valorTotal + freteValor;

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
    let ativo = true;

    const carregarDadosUsuario = async (session) => {
      // Sessão do Supabase restaurou: busca endereços com o id real.
      if (session?.user) {
        if (ativo) setUsuario(session.user);
        await carregarEnderecos(session.user.id);
        return;
      }

      // Fallback demo (DEV): sessão local.
      if (import.meta.env.DEV) {
        const localSession = localStorage.getItem("mg_mantos_user_session");
        if (localSession) {
          const parsed = JSON.parse(localSession);
          if (ativo) setUsuario(parsed);
          if (parsed.id) await carregarEnderecos(parsed.id);
          return;
        }
      }

      setCarregandoEnderecos(false);
    };

    // onAuthStateChange emite INITIAL_SESSION assim que a sessão é restaurada
    // do storage, garantindo que a busca de endereços só rode com o userId
    // válido (evita userId nulo após F5).
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      carregarDadosUsuario(session);
    });

    return () => {
      ativo = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Sempre que o endereço selecionado (ou a lista) mudar, recalcula o frete
  // usando o CEP desse endereço.
  useEffect(() => {
    let ativo = true;

    async function carregarFrete() {
      const endereco = enderecos.find((e) => e.id === enderecoSelecionado);

      // Devolve o controle antes de qualquer setState, evitando setState
      // síncrono no corpo do efeito (cascading renders).
      await new Promise((resolve) => setTimeout(resolve, 0));

      if (!endereco?.cep) {
        if (!ativo) return;
        setOpcoesFrete([]);
        setFreteId("");
        setCalculandoFrete(false);
        return;
      }

      if (!ativo) return;
      setCalculandoFrete(true);
      setOpcoesFrete([]);
      setFreteId("");

      try {
        const resultado = await calcularFrete(endereco.cep);
        if (!ativo) return;
        setOpcoesFrete(resultado.opcoes || []);
        setFreteId(resultado.opcoes?.[0]?.id || "");
      } catch {
        if (!ativo) return;
        setOpcoesFrete([]);
        setFreteId("");
      } finally {
        if (ativo) setCalculandoFrete(false);
      }
    }

    carregarFrete();

    return () => {
      ativo = false;
    };
  }, [enderecoSelecionado, enderecos]);

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

  const handleCupomChange = (valor) => {
    setCupom(valor);
    if (
      valor.trim().toUpperCase() === CUPOM_LOCAL &&
      !cupomLocalValido(valor, enderecoAtual)
    ) {
      showToast(
        "O cupom MARINGALOCAL é válido apenas para Maringá e Nova Esperança.",
        "error",
      );
    }
  };

  const finalizarCompra = async () => {
    if (!usuario) {
      showToast("Você precisa iniciar sessão para finalizar a compra!", "warning");
      navigate("/minha-conta");
      return;
    }

    // Validações de entrada antes de persistir/enviar ao Mercado Pago
    if (!carrinho || carrinho.length === 0) {
      showToast("Seu carrinho está vazio.", "warning");
      return;
    }

    if (!enderecoSelecionado) {
      showToast("Selecione ou cadastre um endereço de entrega.", "warning");
      return;
    }

    if (!freteSelecionado) {
      showToast("Selecione uma opção de frete para continuar.", "warning");
      return;
    }

    setProcessando(true);

    try {
      // 1. Cria o Pedido principal com os valores do checkout.
      //    O backend revalida preços/frete antes de cobrar, mas já persistimos
      //    aqui para ter um registro inicial coerente.
      const { data: pedido, error: erroPedido } = await supabase
        .from("orders")
        .insert([
          {
            user_id: usuario.id,
            address_id: enderecoSelecionado,
            total: totalFinal,
            frete: freteSelecionado.name,
            frete_valor: freteValor,
            cupom: cupomAplicado ? CUPOM_LOCAL : null,
            status: "pendente",
          },
        ])
        .select()
        .single();

      if (erroPedido)
        throw new Error("Erro na tabela orders: " + erroPedido.message);

      // 2. Prepara os itens (quantidade validada >= 1)
      //    product_id é normalizado para o tipo do banco (BIGINT), garantindo
      //    compatibilidade com a FK `order_items.product_id -> products(id)`.
      const itensDoPedido = carrinho.map((item) => ({
        order_id: pedido.id,
        product_id: normalizarIdBanco(item.id),
        quantidade: Math.max(1, Number(item.quantidade) || 1),
        preco_unitario: Number(item.price) || 0,
      }));

      // 3. Salva os itens
      const { error: erroItens } = await supabase
        .from("order_items")
        .insert(itensDoPedido);
      if (erroItens)
        throw new Error("Erro na tabela order_items: " + erroItens.message);

      // 4. Cria preferência de pagamento no Mercado Pago (Checkout Pro).
      //    Enviamos apenas orderId + freteId + cupom; preços e frete são
      //    recalculados no backend (nunca confiam no frontend).
      const resPreferencia = await fetch("/api/criar-preferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: pedido.id,
          freteId: freteSelecionado.id,
          cupom: cupomAplicado ? CUPOM_LOCAL : null,
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
      console.error("[Carrinho] Erro ao finalizar compra:", error);
      showToast("Não foi possível finalizar o pedido. Tente novamente.", "error");
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

              {/* CUPOM DE DESCONTO / RETIRADA LOCAL */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <input
                  type="text"
                  placeholder="Cupom de desconto (ex: MARINGALOCAL)"
                  value={cupom}
                  onChange={(e) => handleCupomChange(e.target.value)}
                  style={{
                    flex: "1",
                    padding: "12px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>
              {cupom.trim() !== "" && (
                <p
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: cupomAplicado ? "var(--success)" : "var(--error)",
                  }}
                >
                  {cupomAplicado
                    ? "Cupom MARINGALOCAL aplicado: retirada local com frete grátis!"
                    : cupomLocalDigitado
                    ? "O cupom MARINGALOCAL é válido apenas para Maringá e Nova Esperança."
                    : "Cupom inválido."}
                </p>
              )}

              {/* SESSÃO DE ENDEREÇO INTEGRADA */}
              {carregandoEnderecos && usuario ? (
                <div
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid var(--border)",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
                    Carregando endereços...
                  </p>
                </div>
              ) : !usuario ? (
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

              {/* SESSÃO DE FRETE */}
              {usuario && enderecos.length > 0 && !mostrarFormEndereco && (
                <div
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      margin: "0 0 12px 0",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    🚚 Forma de Envio
                  </p>

                  {cupomAplicado ? (
                    <div
                      style={{
                        padding: "10px 12px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--success)",
                        backgroundColor: "rgba(45, 158, 90, 0.12)",
                      }}
                    >
                      <span style={{ fontSize: "13px", fontWeight: "bold", color: "var(--text-primary)" }}>
                        {FRETE_LOCAL.name}
                      </span>
                      <p style={{ margin: "4px 0 0", fontSize: "11px", color: "var(--success)", fontWeight: "bold" }}>
                        Frete grátis — retirada/entrega local em Maringá.
                      </p>
                      {FRETE_LOCAL.prazo_entrega && (
                        <p style={{ margin: "2px 0 0", fontSize: "11px", color: "var(--success)", fontWeight: "bold" }}>
                          Prazo de envio estimado: {FRETE_LOCAL.prazo_entrega} dias úteis
                        </p>
                      )}
                    </div>
                  ) : calculandoFrete ? (
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
                      Calculando frete...
                    </p>
                  ) : opcoesFrete.length === 0 ? (
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
                      Não foi possível calcular o frete. Atualize o endereço e tente novamente.
                    </p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {opcoesFrete.map((opcao) => {
                        const selecionada = freteSelecionado?.id === opcao.id;
                        return (
                          <label
                            key={opcao.id}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "10px",
                              padding: "10px 12px",
                              borderRadius: "var(--radius-md)",
                              border: selecionada
                                ? "1px solid var(--accent)"
                                : "1px solid var(--border)",
                              backgroundColor: selecionada
                                ? "rgba(106, 13, 173, 0.12)"
                                : "var(--bg-primary)",
                              cursor: "pointer",
                            }}
                          >
                            <input
                              type="radio"
                              name="frete"
                              checked={selecionada}
                              onChange={() => setFreteId(opcao.id)}
                              style={{ marginTop: "3px", cursor: "pointer" }}
                            />
                            <div style={{ flex: "1" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span style={{ fontSize: "13px", fontWeight: "bold", color: "var(--text-primary)" }}>
                                  {opcao.name}
                                </span>
                                <span style={{ fontSize: "13px", fontWeight: "900", color: "var(--accent)" }}>
                                  R$ {Number(opcao.price).toFixed(2).replace(".", ",")}
                                </span>
                              </div>
                              {opcao.delivery_time && (
                                <p style={{ margin: "2px 0 0", fontSize: "11px", color: "var(--text-secondary)" }}>
                                  Transportadora: {opcao.delivery_time} dias úteis após o envio.
                                </p>
                              )}
                              {opcao.prazo_entrega && (
                                <p style={{ margin: "2px 0 0", fontSize: "11px", color: "var(--success)", fontWeight: "bold" }}>
                                  Prazo de envio estimado: {opcao.prazo_entrega} dias úteis
                                </p>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TOTAL E BOTÃO FINALIZAR */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  fontWeight: "500",
                }}
              >
                <span>Frete</span>
                <span>R$ {freteValor.toFixed(2).replace(".", ",")}</span>
              </div>

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
                  R$ {totalFinal.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <button
                onClick={finalizarCompra}
                disabled={
                  processando ||
                  mostrarFormEndereco ||
                  !usuario ||
                  enderecos.length === 0 ||
                  !freteSelecionado
                }
                style={{
                  backgroundColor:
                    processando || mostrarFormEndereco || !usuario || enderecos.length === 0 || !freteSelecionado
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
                    processando || mostrarFormEndereco || !usuario || enderecos.length === 0 || !freteSelecionado
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
                  : !freteSelecionado
                  ? "SELECIONE O FRETE"
                  : "FINALIZAR COMPRA"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
