import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { useToast } from "../../context/ToastContext";

/**
 * Layout do painel administrativo (com barra lateral de navegação).
 * As rotas filhas são renderizadas via <Outlet />.
 */
export default function AdminLayout() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const sair = async () => {
    await supabase.auth.signOut();
    showToast("Sessão encerrada.", "info");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Barra lateral */}
      <aside
        style={{
          width: "220px",
          backgroundColor: "var(--bg-card)",
          borderRight: "1px solid var(--border)",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "900",
            margin: "0 0 16px 0",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Admin MG Mantos
        </h2>

        <Link
          to="/admin/produtos"
          style={{
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
            color: "var(--text-primary)",
            fontWeight: "bold",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          📦 Produtos
        </Link>

        <Link
          to="/"
          style={{
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
            color: "var(--text-secondary)",
            fontWeight: "bold",
          }}
        >
          ← Ver Loja
        </Link>

        <button
          onClick={sair}
          style={{
            marginTop: "auto",
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--error)",
            backgroundColor: "transparent",
            color: "var(--error)",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </aside>

      {/* Conteúdo */}
      <main style={{ flex: "1", padding: "32px" }}>
        <Outlet />
      </main>
    </div>
  );
}