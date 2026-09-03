import { Link } from "react-router-dom";

/** Página inicial do painel administrativo. */
export default function AdminHome() {
  return (
    <div style={{ maxWidth: "700px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "900", textTransform: "uppercase" }}>
        Painel Administrativo
      </h1>
      <p style={{ color: "var(--text-secondary)" }}>
        Gerencie o catálogo de camisas da MG Mantos.
      </p>

      <Link
        to="/admin/produtos"
        style={{
          display: "inline-block",
          marginTop: "16px",
          backgroundColor: "var(--accent)",
          color: "var(--text-primary)",
          textDecoration: "none",
          padding: "14px 24px",
          borderRadius: "var(--radius-md)",
          fontWeight: "900",
        }}
      >
        Gerenciar Produtos →
      </Link>
    </div>
  );
}