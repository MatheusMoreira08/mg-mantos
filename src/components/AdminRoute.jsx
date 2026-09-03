import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isCurrentUserAdmin } from "../services/adminService";

/**
 * Guarda de rota para o painel `/admin`.
 * Enquanto verifica a sessão, exibe um loading; se o usuário não for admin,
 * redireciona para a tela de login/conta.
 */
export default function AdminRoute({ children }) {
  const [estado, setEstado] = useState("loading"); // "loading" | "admin" | "nao-autorizado"

  useEffect(() => {
    let ativo = true;

    isCurrentUserAdmin()
      .then((admin) => {
        if (!ativo) return;
        setEstado(admin ? "admin" : "nao-autorizado");
      })
      .catch(() => {
        if (ativo) setEstado("nao-autorizado");
      });

    return () => {
      ativo = false;
    };
  }, []);

  if (estado === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
        }}
      >
        Verificando permissões...
      </div>
    );
  }

  if (estado === "nao-autorizado") {
    return <Navigate to="/minha-conta" replace />;
  }

  return children;
}