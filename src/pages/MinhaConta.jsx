import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function MinhaConta() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setCarregando(false);
        return; // Usuário não logado, a tela de login vai aparecer
      }

      setUsuario(session.user);

      // Busca os pedidos deste usuário no banco
      const { data } = await supabase
        .from("orders")
        .select(
          "*, order_items(id, quantidade, preco_unitario, products(name))",
        )
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (data) setPedidos(data);
      setCarregando(false);
    };
    carregarDados();
  }, [navigate]);

  const sair = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    navigate("/");
  };

  if (carregando)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          fontFamily: "sans-serif",
        }}
      >
        Carregando...
      </div>
    );

  // SE O USUÁRIO NÃO ESTIVER LOGADO (Tela de Login)
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
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "900",
              marginBottom: "30px",
              textAlign: "center",
              color: "#000",
            }}
          >
            ACESSAR CONTA
          </h1>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#555",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                E-MAIL
              </label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#555",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                SENHA
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <p
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

            <button
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "15px",
                border: "none",
                borderRadius: "4px",
                fontWeight: "900",
                cursor: "pointer",
                marginTop: "10px",
                transition: "0.2s",
              }}
            >
              ENTRAR
            </button>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            Ainda não tem conta?{" "}
            <span
              style={{
                color: "rgb(106, 13, 173)",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Cadastre-se aqui
            </span>
          </p>
        </div>
      </div>
    );
  }

  // SE O USUÁRIO ESTIVER LOGADO (Painel de Controle)
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
              Bem-vindo, <strong>{usuario?.email}</strong>
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
              transition: "0.2s",
            }}
          >
            Sair da Conta
          </button>
        </header>

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
                  <span
                    style={{
                      fontWeight: "900",
                      fontSize: "14px",
                      color: "#000",
                    }}
                  >
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
      </div>
    </div>
  );
}
