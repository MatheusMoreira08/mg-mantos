import { Link, useLocation } from "react-router-dom";

/**
 * Página 404 amigável exibida para rotas inexistentes.
 */
export default function NaoEncontrada() {
  const location = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "72px" }}>👕</span>
      <h1 style={{ fontSize: "28px", fontWeight: "900", margin: "16px 0 8px" }}>
        404 - Página não encontrada
      </h1>
      <p style={{ color: "var(--text-secondary)", margin: "0 0 24px" }}>
        A rota <strong>{location.pathname}</strong> não existe.
      </p>
      <Link
        to="/"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--text-primary)",
          textDecoration: "none",
          padding: "14px 32px",
          borderRadius: "var(--radius-md)",
          fontWeight: "900",
          textTransform: "uppercase",
        }}
      >
        Voltar para a Loja
      </Link>
    </div>
  );
}