import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarrinhoContext } from "../context/CarrinhoContext";
import { supabase } from "../services/supabase";

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, limparCarrinho, valorTotal } =
    useContext(CarrinhoContext);

  const [usuario, setUsuario] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [processando, setProcessando] = useState(false);
  const navigate = useNavigate();

  // Estados para o formulário de NOVO ENDEREÇO direto no carrinho
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

  // Busca os endereços do cliente
  const carregarEnderecos = async (userId) => {
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
      setMostrarFormEndereco(true); // Se não tem endereço, abre o formulário logo de cara!
    }
  };

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUsuario(session.user);
        carregarEnderecos(session.user.id);
      }
    };
    carregarDadosUsuario();
  }, []);

  // Salva o endereço escrito no carrinho direto no banco de dados
  const handleSalvarEndereco = async () => {
    if (!novoEndereco.cep || !novoEndereco.rua || !novoEndereco.numero) {
      return alert("Por favor, preencha pelo menos o CEP, Rua e Número.");
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
      carregarEnderecos(usuario.id); // Recarrega para mostrar o endereço salvo
    } catch (error) {
      alert(
        "Erro ao salvar endereço: Certifique-se que a tabela 'addresses' tem as colunas corretas. Erro: " +
          error.message,
      );
    } finally {
      setSalvandoEndereco(false);
    }
  };

  const finalizarCompra = async () => {
    if (!usuario) {
      alert("Você precisa iniciar sessão para finalizar a compra!");
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
            status: "Pedido Recebido",
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

      limparCarrinho();
      alert("🎉 Pedido finalizado com sucesso! O seu manto está garantido.");
      navigate("/minha-conta");
    } catch (error) {
      console.error("Erro ao finalizar:", error);
      alert("ERRO: " + error.message);
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        color: "#333",
        minHeight: "100vh",
        fontFamily: "sans-serif",
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
            color: "#000",
          }}
        >
          Seu Carrinho
        </h2>

        {carrinho.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #eaeaea",
              boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
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
              }}
            >
              Sua sacola está vazia
            </h3>
            <p style={{ color: "#666", marginBottom: "30px" }}>
              Navegue pelas nossas categorias e descubra os melhores mantos!
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                backgroundColor: "#00bfa5",
                color: "#fff",
                textDecoration: "none",
                padding: "15px 40px",
                borderRadius: "4px",
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
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "15px",
                    border: "1px solid #eaeaea",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`/${item.image || item.imagem}`}
                    alt={item.name}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "contain",
                      backgroundColor: "#f6f6f6",
                      borderRadius: "4px",
                      padding: "5px",
                    }}
                  />
                  <div style={{ flex: "1" }}>
                    <h4
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        color: "#888",
                        margin: "0 0 5px 0",
                        fontSize: "13px",
                      }}
                    >
                      Qtd: {item.quantidade} | Tam: {item.tamanho}
                    </p>
                    {item.personalizacao !== "Sem personalização" && (
                      <p
                        style={{
                          color: "#888",
                          margin: "0 0 5px 0",
                          fontSize: "12px",
                        }}
                      >
                        Pers: {item.personalizacao}
                      </p>
                    )}
                    <p
                      style={{
                        color: "rgb(106, 13, 173)",
                        fontWeight: "900",
                        margin: 0,
                        fontSize: "16px",
                      }}
                    >
                      R$ {Number(item.price).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <button
                      onClick={() => removerDoCarrinho(item.id, item.tamanho)}
                    style={{
                      backgroundColor: "#fff",
                      color: "#ff4757",
                      border: "1px solid #ff4757",
                      padding: "8px 15px",
                      borderRadius: "4px",
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
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "8px",
                border: "1px solid #eaeaea",
                height: "fit-content",
                boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px 0",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "15px",
                  fontWeight: "900",
                  fontSize: "18px",
                }}
              >
                Resumo do Pedido
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  color: "#666",
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
                    borderBottom: "1px solid #eee",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#ff4757",
                      fontSize: "13px",
                      fontWeight: "bold",
                      marginBottom: "15px",
                    }}
                  >
                    Inicie sessão para inserir o endereço de entrega.
                  </p>
                  <button
                    onClick={() => navigate("/minha-conta")}
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      width: "100%",
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
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <p
                    style={{
                      color: "#000",
                      marginBottom: "15px",
                      fontSize: "13px",
                      fontWeight: "900",
                      textTransform: "uppercase",
                    }}
                  >
                    📍 Adicionar Endereço de Entrega
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="CEP"
                      value={novoEndereco.cep}
                      onChange={(e) =>
                        setNovoEndereco({
                          ...novoEndereco,
                          cep: e.target.value,
                        })
                      }
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "13px",
                        outline: "none",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Rua / Morada"
                      value={novoEndereco.rua}
                      onChange={(e) =>
                        setNovoEndereco({
                          ...novoEndereco,
                          rua: e.target.value,
                        })
                      }
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "13px",
                        outline: "none",
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
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          fontSize: "13px",
                          outline: "none",
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
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          fontSize: "13px",
                          outline: "none",
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
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          fontSize: "13px",
                          outline: "none",
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Estado (UF)"
                        value={novoEndereco.estado}
                        onChange={(e) =>
                          setNovoEndereco({
                            ...novoEndereco,
                            estado: e.target.value,
                          })
                        }
                        style={{
                          flex: 1,
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          fontSize: "13px",
                          outline: "none",
                        }}
                      />
                    </div>
                    <button
                      onClick={handleSalvarEndereco}
                      disabled={salvandoEndereco}
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        marginTop: "5px",
                        fontSize: "13px",
                      }}
                    >
                      {salvandoEndereco
                        ? "A GUARDAR..."
                        : "GUARDAR E CONTINUAR"}
                    </button>
                    {enderecos.length > 0 && (
                      <button
                        onClick={() => setMostrarFormEndereco(false)}
                        style={{
                          backgroundColor: "transparent",
                          color: "#666",
                          border: "none",
                          fontSize: "12px",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #eee",
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
                        color: "#555",
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
                        color: "rgb(106, 13, 173)",
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
                      backgroundColor: "#f9f9f9",
                      color: "#333",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
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
                <span style={{ color: "rgb(106, 13, 173)" }}>
                  R$ {valorTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <button
                onClick={finalizarCompra}
                disabled={processando || mostrarFormEndereco || !usuario}
                style={{
                  backgroundColor:
                    processando || mostrarFormEndereco || !usuario
                      ? "#ccc"
                      : "#00c853",
                  color: "#fff",
                  border: "none",
                  padding: "18px",
                  borderRadius: "4px",
                  fontWeight: "900",
                  fontSize: "15px",
                  width: "100%",
                  cursor:
                    processando || mostrarFormEndereco || !usuario
                      ? "not-allowed"
                      : "pointer",
                  textTransform: "uppercase",
                  transition: "0.2s",
                }}
              >
                {processando
                  ? "A PROCESSAR..."
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
