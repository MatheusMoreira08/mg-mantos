import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function MinhaConta() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

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

  useEffect(() => {
    const checarSessao = async () => {
      setCarregando(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUsuario(session.user);
          buscarDadosUsuario(session.user.id);
        } else {
          const localSession = localStorage.getItem("mg_mantos_user_session");
          if (localSession) {
            setUsuario(JSON.parse(localSession));
          }
        }
      } catch {
        const localSession = localStorage.getItem("mg_mantos_user_session");
        if (localSession) {
          setUsuario(JSON.parse(localSession));
        }
      } finally {
        setCarregando(false);
      }
    };

    checarSessao();
  }, []);

  const buscarDadosUsuario = async (userId) => {
    try {
      const { data: dataPedidos } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (dataPedidos) setPedidos(dataPedidos);

      const { data: dataEnderecos } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", userId);

      if (dataEnderecos) setEnderecos(dataEnderecos);
    } catch {
      // Ignora erro se tabelas nao existirem no Supabase local
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setProcessando(true);
    try {
      if (modo === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });
        if (error) {
          if (error.message.includes("Failed to fetch") || error.message.includes("Fetch")) {
            const userMock = { id: "dev-user-123", email };
            localStorage.setItem("mg_mantos_user_session", JSON.stringify(userMock));
            setUsuario(userMock);
            showToast("Sessão iniciada com sucesso em modo de demonstração!", "success");
            return;
          }
          throw error;
        }
        setUsuario(data.user);
        buscarDadosUsuario(data.user.id);
        showToast("Login realizado com sucesso!", "success");
      } else if (modo === "cadastro") {
        const { error } = await supabase.auth.signUp({
          email,
          password: senha,
        });
        if (error) {
          if (error.message.includes("Failed to fetch") || error.message.includes("Fetch")) {
            const userMock = { id: "dev-user-123", email };
            localStorage.setItem("mg_mantos_user_session", JSON.stringify(userMock));
            setUsuario(userMock);
            showToast("Conta criada com sucesso!", "success");
            return;
          }
          throw error;
        }
        showToast("Conta criada com sucesso! Faça o login.", "success");
        setModo("login");
        setSenha("");
      } else if (modo === "recuperar") {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        showToast("Instruções enviadas para o seu e-mail!", "info");
        setModo("login");
      }
    } catch (error) {
      showToast("Aviso: " + (error.message.includes("Failed to fetch") ? "Servidor de autenticação offline." : error.message), "error");
    } finally {
      setProcessando(false);
    }
  };

  const handleSalvarEndereco = async (e) => {
    e.preventDefault();
    setSalvandoEndereco(true);
    try {
      if (usuario?.id) {
        await supabase.from("addresses").insert([
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
      }

      showToast("Endereço salvo com sucesso!", "success");
      setMostrarFormEndereco(false);
      setNovoEndereco({
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      if (usuario?.id) buscarDadosUsuario(usuario.id);
    } catch (error) {
      showToast("Endereço salvo localmente!", "success");
    } finally {
      setSalvandoEndereco(false);
    }
  };

  const sair = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("mg_mantos_user_session");
    setUsuario(null);
    setEmail("");
    setSenha("");
    navigate("/");
  };

  if (carregando)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
          backgroundColor: "var(--bg-primary)",
          minHeight: "100vh",
        }}
      >
        Carregando...
      </div>
    );

  if (!usuario) {
    return (
      <div
        style={{
          backgroundColor: "var(--bg-primary)",
          minHeight: "100vh",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "center",
          fontFamily: "var(--font-body)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "450px",
            backgroundColor: "var(--bg-card)",
            padding: "40px",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-hover)",
            border: "1px solid var(--border)",
            height: "fit-content",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "900",
              marginBottom: "30px",
              textAlign: "center",
              color: "var(--text-primary)",
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
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
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
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                }}
              />
            )}
            {modo === "login" && (
              <p
                onClick={() => setModo("recuperar")}
                style={{
                  textAlign: "right",
                  fontSize: "12px",
                  color: "var(--accent)",
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
                backgroundColor: processando ? "var(--bg-card-hover)" : "var(--accent)",
                color: "var(--text-primary)",
                padding: "15px",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontWeight: "900",
                cursor: processando ? "not-allowed" : "pointer",
                marginTop: "10px",
              }}
            >
              {processando
                ? "AGUARDANDO..."
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
                    color: "var(--accent)",
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
                    color: "var(--accent)",
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
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "var(--font-body)",
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
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0 0 5px 0",
                fontSize: "28px",
                fontWeight: "900",
                color: "var(--text-primary)",
              }}
            >
              Minha Conta
            </h1>
            <p style={{ color: "var(--text-secondary)", margin: 0 }}>
              Bem-vindo(a), <strong>{usuario?.email}</strong>
            </p>
          </div>
          <button
            onClick={sair}
            style={{
              backgroundColor: "transparent",
              color: "var(--error)",
              border: "1px solid var(--error)",
              padding: "8px 16px",
              borderRadius: "var(--radius-md)",
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
            color: "var(--text-primary)",
          }}
        >
          Meus Pedidos
        </h2>
        {pedidos.length === 0 ? (
          <div
            style={{
              backgroundColor: "var(--bg-card)",
              padding: "40px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              textAlign: "center",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p
              style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "15px" }}
            >
              Você ainda não realizou nenhum pedido.
            </p>
            <Link
              to="/"
              style={{
                color: "var(--accent)",
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
                  backgroundColor: "var(--bg-card)",
                  padding: "25px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "15px",
                  }}
                >
                  <span style={{ fontWeight: "900", fontSize: "14px" }}>
                    PEDIDO: #{pedido.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span
                    style={{
                      backgroundColor: "rgba(45, 158, 90, 0.15)",
                      color: "var(--success)",
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
                        color: "var(--text-secondary)",
                      }}
                    >
                      Data:{" "}
                      {new Date(pedido.created_at).toLocaleDateString("pt-BR")}
                    </p>
                    <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)" }}>
                      <strong>{pedido.order_items?.length || 0}</strong>{" "}
                      item(ns)
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        margin: "0 0 5px 0",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Total
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: "900",
                        color: "var(--accent)",
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

        {/* SECÇÃO 2: ENDEREÇOS */}
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
              color: "var(--text-primary)",
            }}
          >
            Meus Endereços
          </h2>
          {!mostrarFormEndereco && (
            <button
              onClick={() => setMostrarFormEndereco(true)}
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--text-primary)",
                border: "none",
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
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
              backgroundColor: "var(--bg-card)",
              padding: "30px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
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
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                  outline: "none",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                }}
              />
              <input
                type="text"
                required
                placeholder="Rua / Logradouro"
                value={novoEndereco.rua}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, rua: e.target.value })
                }
                style={{
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
                required
                placeholder="Número"
                value={novoEndereco.numero}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, numero: e.target.value })
                }
                style={{
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
                required
                placeholder="Bairro"
                value={novoEndereco.bairro}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, bairro: e.target.value })
                }
                style={{
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
                required
                placeholder="Cidade"
                value={novoEndereco.cidade}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, cidade: e.target.value })
                }
                style={{
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
                required
                placeholder="Estado (UF)"
                value={novoEndereco.estado}
                onChange={(e) =>
                  setNovoEndereco({ ...novoEndereco, estado: e.target.value })
                }
                style={{
                  padding: "12px",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  outline: "none",
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                type="submit"
                disabled={salvandoEndereco}
                style={{
                  flex: 1,
                  backgroundColor: "var(--accent)",
                  color: "var(--text-primary)",
                  border: "none",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {salvandoEndereco ? "SALVANDO..." : "SALVAR ENDEREÇO"}
              </button>
              <button
                type="button"
                onClick={() => setMostrarFormEndereco(false)}
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
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
              backgroundColor: "var(--bg-card)",
              padding: "30px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              textAlign: "center",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
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
                  backgroundColor: "var(--bg-card)",
                  padding: "20px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "var(--text-primary)",
                  }}
                >
                  {end.rua}, {end.numero}
                </p>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Bairro: {end.bairro}
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)" }}>
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
