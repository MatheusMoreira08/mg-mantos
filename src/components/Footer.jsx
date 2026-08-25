import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
        paddingTop: "60px",
        textAlign: "left" /* <-- A MÁGICA ACONTECE AQUI */,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "40px",
        }}
      >
        {/* COLUNA 1 - Logo e Contato */}
        <div style={{ flex: "1", minWidth: "250px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "25px",
            }}
          >
            <img
              src="/img/front-page/logo.webp"
              alt="MG Mantos"
              style={{ height: "40px", objectFit: "contain" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span
              style={{
                fontWeight: "900",
                fontSize: "22px",
                color: "var(--text-primary)",
                letterSpacing: "-1px",
              }}
            >
              MG <span style={{ color: "var(--accent)" }}>MANTOS</span>
            </span>
          </div>

          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "15px",
              color: "var(--text-primary)",
            }}
          >
            Central de Atendimento
          </h4>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>
            Horário de atendimento:
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 25px 0",
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
            }}
          >
            <li>Segunda à sexta-feira – 09h às 18h</li>
            <li>Sábado – 09h às 13h</li>
          </ul>

          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "15px",
              color: "var(--text-primary)",
            }}
          >
            Contato
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: "1.8",
            }}
          >
            <li>
              <strong>Email:</strong> mg.mantos01@gmail.com
            </li>
            <li>
              <strong>WhatsApp:</strong> (44) 99821-5198
            </li>
          </ul>
        </div>

        {/* COLUNA 2 - Acesso Rápido */}
        <div style={{ flex: "1", minWidth: "200px" }}>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "20px",
              color: "var(--text-primary)",
            }}
          >
            Acesso Rápido
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "13px",
              lineHeight: "2.5",
            }}
          >
            <li>
              <Link to="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
                Início
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
                Políticas de Privacidade
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
                Política de Reembolso e Devoluções
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
                Política de Envio
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
                Termos e Condições
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUNA 3 - Minha Conta & Segurança */}
        <div style={{ flex: "1", minWidth: "200px" }}>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "20px",
              color: "var(--text-primary)",
            }}
          >
            Minha Conta
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "13px",
              lineHeight: "2.5",
            }}
          >
            <li>
              <Link
                to="/minha-conta"
                style={{ color: "var(--text-secondary)", textDecoration: "none" }}
              >
                Minha conta
              </Link>
            </li>
            <li>
              <Link
                to="/minha-conta"
                style={{ color: "var(--text-secondary)", textDecoration: "none" }}
              >
                Histórico de Pedidos
              </Link>
            </li>
            <li>
              <Link
                to="/minha-conta"
                style={{ color: "var(--text-secondary)", textDecoration: "none" }}
              >
                Endereços
              </Link>
            </li>
          </ul>

          {/* Selo de Segurança */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              color: "var(--text-primary)",
              marginTop: "40px",
            }}
          >
            <span style={{ fontSize: "30px" }}>🔒</span>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                lineHeight: "1.2",
              }}
            >
              VOCÊ ESTÁ EM UM
              <br />
              <span style={{ fontSize: "14px" }}>SITE SEGURO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          marginTop: "50px",
          padding: "20px 0",
          textAlign:
            "center" /* Este continua centralizado para ficar no meio certinho */,
          fontSize: "12px",
          color: "var(--text-secondary)",
          fontWeight: "500",
        }}
      >
        Copyright © MG MANTOS 2026 Todos os direitos reservados.
      </div>
    </footer>
  );
}
