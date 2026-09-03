import { Component } from "react";

/**
 * Error Boundary de nível superior: captura erros de renderização em qualquer
 * componente filho e exibe uma tela de erro amigável em vez de quebrar a app.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Em produção, envie para uma ferramenta de observabilidade (Sentry, etc.)
    console.error("[ErrorBoundary] Erro não tratado:", error, info);
  }

  render() {
    if (this.state.hasError) {
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
          <span style={{ fontSize: "56px" }}>⚠️</span>
          <h1 style={{ fontSize: "24px", fontWeight: "900", margin: "16px 0 8px" }}>
            Algo deu errado
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "420px", margin: "0 0 24px" }}>
            Ocorreu um erro inesperado. Recarregue a página ou volte à loja para continuar.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--text-primary)",
              border: "none",
              padding: "14px 32px",
              borderRadius: "var(--radius-md)",
              fontWeight: "900",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            Voltar para a Loja
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}