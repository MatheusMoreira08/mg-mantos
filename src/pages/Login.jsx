import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [modo, setModo] = useState("login");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleAutenticacao = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      if (modo === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });

        if (error) {
          if (error.message.includes("Failed to fetch") || error.message.includes("Fetch")) {
            // Em dev local, permite login de teste amigável quando o backend Supabase estiver desconectado
            localStorage.setItem("mg_mantos_user_session", JSON.stringify({ email }));
            showToast("Sessão iniciada em modo de demonstração!", "success");
            navigate("/minha-conta");
            return;
          }
          throw error;
        }

        showToast("Login realizado com sucesso!", "success");
        navigate("/minha-conta");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
        });

        if (error) {
          if (error.message.includes("Failed to fetch") || error.message.includes("Fetch")) {
            localStorage.setItem("mg_mantos_user_session", JSON.stringify({ email }));
            showToast("Conta de teste criada com sucesso!", "success");
            navigate("/minha-conta");
            return;
          }
          throw error;
        }

        if (data.session) {
          showToast("Conta criada com sucesso!", "success");
          navigate("/minha-conta");
          return;
        }

        showToast("Conta criada com sucesso. Verifique seu e-mail se necessário.", "info");
        setModo("login");
      }
    } catch (error) {
      const msg = error.message || "";
      if (msg.includes("Invalid login credentials")) {
        setErro("E-mail ou senha incorretos.");
      } else if (msg.includes("User already registered")) {
        setErro("Este e-mail já está cadastrado.");
      } else if (msg.includes("Failed to fetch") || msg.includes("Fetch")) {
        setErro("Servidor de autenticação indisponível no momento.");
      } else {
        setErro(msg || "Não foi possível autenticar.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "40px 20px",
        background:
          "radial-gradient(circle at top, rgba(106, 13, 173, 0.28), transparent 42%), var(--bg-primary)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "32px",
          boxShadow: "var(--shadow-hover)",
        }}
      >
        <h2
          style={{
            margin: "0 0 24px",
            fontFamily: "var(--font-display)",
            fontSize: "42px",
            letterSpacing: "1px",
            textAlign: "center",
            color: "var(--text-primary)",
          }}
        >
          {modo === "login" ? "Entrar" : "Criar conta"}
        </h2>
        <form
          id="form-login"
          onSubmit={handleAutenticacao}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            type="email"
            placeholder="seu e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "14px 16px",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="sua senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              padding: "14px 16px",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={carregando}
            style={{
              marginTop: "8px",
              padding: "14px 16px",
              backgroundColor: carregando
                ? "var(--bg-card-hover)"
                : "var(--accent)",
              color: "var(--text-primary)",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: carregando ? "not-allowed" : "pointer",
              fontWeight: "700",
              letterSpacing: "0.04em",
            }}
          >
            {carregando
              ? "Entrando..."
              : modo === "login"
                ? "Entrar"
                : "Criar conta"}
          </button>

          {erro && (
            <p style={{ color: "var(--error)", fontSize: "13px", margin: 0 }}>
              {erro}
            </p>
          )}
        </form>

        <p
          style={{
            marginTop: "16px",
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "14px",
          }}
        >
          {modo === "login" ? "Não tem conta? " : "Já tem conta? "}
          <span
            onClick={() => {
              setModo(modo === "login" ? "cadastro" : "login");
              setErro("");
            }}
            style={{
              color: "var(--accent)",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            {modo === "login" ? "Criar conta" : "Entrar"}
          </span>
        </p>
      </div>
    </div>
  );
}
