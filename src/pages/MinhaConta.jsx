import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function MinhaConta() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  // Estados de Autenticação
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [processando, setProcessando] = useState(false);

  // Estados de Endereço
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

  const buscarDadosUsuario = async (userId) => {
    // 1. Busca Pedidos
    const { data: dadosPedidos, error: erroPedidos } = await supabase
      .from("orders")
      .select("*, order_items(id, quantidade, preco_unitario, products(name))")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (dadosPedidos) setPedidos(dadosPedidos);
    if (erroPedidos) console.error("Erro ao buscar pedidos:", erroPedidos);

    // 2. Busca Endereços (Certifique-se que a tabela se chama 'addresses' no Supabase)
    const { data: dadosEnderecos, error: erroEnderecos } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId);

    if (dadosEnderecos) setEnderecos(dadosEnderecos);
    if (erroEnderecos)
      console.error("Erro ao buscar endereços:", erroEnderecos);
  };

  useEffect(() => {
    const carregarDados = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUsuario(session.user);
        buscarDadosUsuario(session.user.id);
      }
      setCarregando(false);
    };
    carregarDados();
  }, []);

  const handleAutenticacao = async (e) => {
    e.preventDefault();
    setProcessando(true);
    try {
      if (modo === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });
        if (error) throw error;
        setUsuario(data.user);
        buscarDadosUsuario(data.user.id);
      } else if (modo === "cadastro") {
        const { error } = await supabase.auth.signUp({
          email,
          password: senha,
        });
        if (error) throw error;
        alert("Conta criada com sucesso! Faça o login.");
        setModo("login");
        setSenha("");
      } else if (modo === "recuperar") {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        alert("Instruções enviadas para o seu e-mail!");
        setModo("login");
      }
    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setProcessando(false);
    }
  };

  const handleSalvarEndereco = async (e) => {
    e.preventDefault();
    setSalvandoEndereco(true);
    try {
      const { error } = await supabase.from("addresses").insert([
        {
          user_id: usuario.id,
          cep: novoEndereco.cep,
          rua: novoEndereco.rua,
          numero: novoEndereco.numero,
          bairro: novoEndereco.bairro,
          cidade: novoEndereco.cidade,
          estado: novoEndereco.estado,
        },
      ]);

      if (error) throw error;

      alert("Endereço salvo com sucesso!");
      setMostrarFormEndereco(false);
      setNovoEndereco({
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      buscarDadosUsuario(usuario.id);
    } catch (error) {
      alert(
        "Erro ao salvar o endereço no banco de dados. Verifique as colunas da tabela 'addresses'. Detalhe: " +
          error.message,
      );
    } finally {
      setSalvandoEndereco(false);
    }
  };

  const sair = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    setEmail("");
    setSenha("");
    navigate("/");
  };

  if (carregando)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>A carregar...</div>
    );

  if (!usuario) {
    return (
      <div
        style={{
          backgroundColor: "#fafafa",
          minHeight: "100vh",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "450px",
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            border: "1px solid #eaeaea",
            height: "fit-content",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "900",
              marginBottom: "30px",
              textAlign: "center",
              color: "#000",
              textTransform: "uppercase",
            }}
          >
            {modo === "login"
              ? "ACESSAR CONTA"
              : modo === "cadastro"
                ? "CRIAR NOVA CONTA"
                : "RECUPERAR SENHA"}
          </h1>
          <form
            onSubmit={handleAutenticacao}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
            {modo !== "recuperar" && (
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            )}
            {modo === "login" && (
              <p
                onClick={() => setModo("recuperar")}
                style={{
                  textAlign: "right",
                  fontSize: "12px",
                  color: "rgb(106, 13, 173)",
                  cursor: "pointer",
                  fontWeight: "bold",
                  margin: "0",
                }}
              >
                Esqueceu a senha?
              </p>
            )}
            <button
              type="submit"
              disabled={processando}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "15px",
                border: "none",
                borderRadius: "4px",
                fontWeight: "900",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              {processando
                ? "AGUARDE..."
                : modo === "login"
                  ? "ENTRAR"
                  : modo === "cadastro"
                    ? "CADASTRAR"
                    : "ENVIAR LINK"}
            </button>
          </form>
          <div
            style={{ textAlign: "center", marginTop: "30px", fontSize: "14px" }}
          >
            {modo === "login" ? (
              <p>
                Ainda não tem conta?{" "}
                <span
                  onClick={() => {
                    setModo("cadastro");
                    setSenha("");
                  }}
                  style={{
                    color: "rgb(106, 13, 173)",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Cadastre-se
                </span>
              </p>
            ) : (
              <p>
                Já tem conta?{" "}
                <span
                  onClick={() => {
                    setModo("login");
                    setSenha("");
                  }}
                  style={{
                    color: "rgb(106, 13, 173)",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Faça Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        color: "#333",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            paddingBottom: "20px",
            borderBottom: "1px solid #eaeaea",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0 0 5px 0",
                fontSize: "28px",
                fontWeight: "900",
                color: "#000",
              }}
            >
              Minha Conta
            </h1>
            <p style={{ color: "#666", margin: 0 }}>
              Bem-vindo(a), <strong>{usuario?.email}</strong>
            </p>
          </div>
          <button
            onClick={sair}
            style={{
              backgroundColor: "#fff",
              color: "#ff4757",
              border: "1px solid #ff4757",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Sair da Conta
          </button>
        </header>

        {/* SECÇÃO 1: PEDIDOS */}
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "900",
            marginBottom: "20px",
            textTransform: "uppercase",
          }}
        >
          Meus Pedidos
        </h2>
        {pedidos.length === 0 ? (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "8px",
              border: "1px solid #eaeaea",
              textAlign: "center",
            }}
          >
            <p
              style={{ fontSize: "16px", color: "#666", marginBottom: "15px" }}
            >
              Você ainda não realizou nenhum pedido.
            </p>
            <Link
              to="/"
              style={{
                color: "rgb(106, 13, 173)",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Voltar à Loja
            </Link>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                style={{
                  backgroundColor: "#fff",
                  padding: "25px",
                  borderRadius: "8px",
                  border: "1px solid #eaeaea",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "15px",
                  }}
                >
                  <span style={{ fontWeight: "900", fontSize: "14px" }}>
                    PEDIDO: #{pedido.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#e6f9ed",
                      color: "#00c853",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {pedido.status}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0 0 5px 0",
                        fontSize: "13px",
                        color: "#888",
                      }}
                    >
                      Data: {new Date(pedido.created_at).toLocaleDateString()}
                    </p>
                    <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>
                      <strong>{pedido.order_items?.length || 0}</strong>{" "}
                      item(ns)
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        margin: "0 0 5px 0",
                        fontSize: "12px",
                        color: "#888",
                      }}
                    >
                      Total
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: "900",
                        color: "rgb(106, 13, 173)",
                      }}
                    >
                      R$ {Number(pedido.total).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECÇÃO 2: ENDEREÇOS (AGORA ESTÁ AQUI!) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "50px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "900",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Meus Endereços
          </h2>
          {!mostrarFormEndereco && (
            <button
              onClick={() => setMostrarFormEndereco(true)}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              + NOVO ENDEREÇO
            </button>
          )}
        </div>

        {mostrarFormEndereco ? (
          <form
            onSubmit={handleSalvarEndereco}
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              border: "1px solid #eaeaea",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Adicionar Novo Endereço
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <input
                type="text"
                required
                placeholder="CEP"
                value={novoEndereco.cep}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, cep: e.target.value })
                }
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
              <input
                type="text"
                required
                placeholder="Rua / Morada"
                value={novoEndereco.rua}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, rua: e.target.value })
                }
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
              <input
                type="text"
                required
                placeholder="Número"
                value={novoEndereco.numero}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, numero: e.target.value })
                }
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
              <input
                type="text"
                required
                placeholder="Bairro"
                value={novoEndereco.bairro}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, bairro: e.target.value })
                }
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
              <input
                type="text"
                required
                placeholder="Cidade"
                value={novoEndereco.cidade}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, cidade: e.target.value })
                }
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
              <input
                type="text"
                required
                placeholder="Estado (UF)"
                value={novoEndereco.estado}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, estado: e.target.value })
                }
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                type="submit"
                disabled={salvandoEndereco}
                style={{
                  flex: 1,
                  backgroundColor: "#00c853",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {salvandoEndereco ? "A SALVAR..." : "SALVAR ENDEREÇO"}
              </button>
              <button
                type="button"
                onClick={() => setMostrarFormEndereco(false)}
                style={{
                  flex: 1,
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  border: "1px solid #ddd",
                  padding: "12px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                CANCELAR
              </button>
            </div>
          </form>
        ) : enderecos.length === 0 ? (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "8px",
              border: "1px solid #eaeaea",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
              Você ainda não tem nenhum endereço cadastrado.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {enderecos.map((end) => (
              <div
                key={end.id}
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid #eaeaea",
                }}
              >
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {end.rua}, {end.numero}
                </p>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  Bairro: {end.bairro}
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                  {end.cidade} - {end.estado} | CEP: {end.cep}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
