import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0a0a0a",
        color: "#fff",
        fontFamily: "sans-serif",
        paddingTop: "60px",
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
              src="/img/front-page/logo.png"
              alt="MG Mantos"
              style={{ height: "40px", objectFit: "contain" }}
            />
            <span
              style={{
                fontWeight: "900",
                fontSize: "22px",
                color: "#fff",
                letterSpacing: "-1px",
              }}
            >
              MG <span style={{ color: "rgb(106, 13, 173)" }}>MANTOS</span>
            </span>
          </div>

          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "15px",
            }}
          >
            Central de Atendimento
          </h4>
          <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "10px" }}>
            Horário de atendimento:
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 25px 0",
              fontSize: "13px",
              color: "#ccc",
              lineHeight: "1.8",
            }}
          >
            <li>• Segunda à sexta-feira – 09h às 18h</li>
            <li>• Sábado – 09h às 13h</li>
          </ul>

          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "15px",
            }}
          >
            Contato
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 25px 0",
              fontSize: "13px",
              color: "#ccc",
              lineHeight: "1.8",
            }}
          >
            <li>
              • <strong>Email:</strong> atendimento@mgmantos.com
            </li>
            <li>
              • <strong>WhatsApp:</strong> (31) 90000-0000
            </li>
          </ul>

          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "15px",
            }}
          >
            Siga-nos: 👇
          </h4>
          <div style={{ display: "flex", gap: "10px" }}>
            <span
              style={{
                width: "35px",
                height: "35px",
                border: "1px solid #333",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              📸
            </span>
            <span
              style={{
                width: "35px",
                height: "35px",
                border: "1px solid #333",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              ✈️
            </span>
          </div>
        </div>

        {/* COLUNA 2 - Acesso Rápido */}
        <div style={{ flex: "1", minWidth: "200px" }}>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "20px",
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
              <Link to="/" style={{ color: "#ccc", textDecoration: "none" }}>
                Início
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "#ccc", textDecoration: "none" }}>
                Políticas de Privacidade
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "#ccc", textDecoration: "none" }}>
                Política de Reembolso e Devoluções
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "#ccc", textDecoration: "none" }}>
                Política de Envio
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "#ccc", textDecoration: "none" }}>
                Termos e Condições
              </Link>
            </li>
            <li>
              <Link to="#" style={{ color: "#ccc", textDecoration: "none" }}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUNA 3 - Minha Conta */}
        <div style={{ flex: "1", minWidth: "200px" }}>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "20px",
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
                style={{ color: "#ccc", textDecoration: "none" }}
              >
                Minha conta
              </Link>
            </li>
            <li>
              <Link
                to="/minha-conta"
                style={{ color: "#ccc", textDecoration: "none" }}
              >
                Histórico de Pedidos
              </Link>
            </li>
            <li>
              <Link
                to="/minha-conta"
                style={{ color: "#ccc", textDecoration: "none" }}
              >
                Endereços
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUNA 4 - Segurança e Apps */}
        <div
          style={{
            flex: "1",
            minWidth: "200px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              color: "#fff",
              marginBottom: "10px",
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

          {/* Selos emulados com botões */}
          <div
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "10px",
              borderRadius: "4px",
              display: "inline-block",
              fontWeight: "900",
              fontSize: "18px",
              width: "fit-content",
              letterSpacing: "-0.5px",
            }}
          >
            Reclame<span style={{ color: "#00c853" }}>AQUI</span>
          </div>

          <button
            style={{
              backgroundColor: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              width: "fit-content",
              marginTop: "10px",
            }}
          >
            <span style={{ fontSize: "24px" }}>🍏</span>
            <div style={{ textAlign: "left", color: "#000" }}>
              <div style={{ fontSize: "10px" }}>Disponível na</div>
              <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                App Store
              </div>
            </div>
          </button>

          <button
            style={{
              backgroundColor: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            <span style={{ fontSize: "24px" }}>▶️</span>
            <div style={{ textAlign: "left", color: "#000" }}>
              <div style={{ fontSize: "10px" }}>Disponível no</div>
              <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                Google Play
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid #222",
          marginTop: "50px",
          padding: "20px 0",
          textAlign: "center",
          fontSize: "12px",
          color: "#888",
          fontWeight: "500",
        }}
      >
        Copyright © MG MANTOS 2026 Todos direitos reservados.
      </div>
    </footer>
  );
}
