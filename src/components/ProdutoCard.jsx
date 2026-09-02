import { Link } from "react-router-dom";

export default function ProdutoCard({ produto }) {
  const imagemProduto = produto.image || produto.imagem;

  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        border: "1px solid var(--border)",
        transition: "all 0.3s ease",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
        color: "var(--text-primary)",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--shadow-hover)";
        e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {/* Badge / Tag de Destaque se existir */}
      {produto.badge && (
        <span
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "var(--accent)",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: "900",
            padding: "4px 8px",
            borderRadius: "var(--radius-sm)",
            zIndex: 2,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {produto.badge}
        </span>
      )}

      {/* Imagem do Produto */}
      <div
        style={{
          width: "100%",
          height: "250px",
          backgroundColor: "var(--bg-secondary)",
          overflow: "hidden",
          borderRadius: "var(--radius-md)",
          position: "relative",
        }}
      >
        <img
          src={imagemProduto ? `/${imagemProduto}` : "/placeholder-camisa.png"}
          alt={produto.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: "12px",
            boxSizing: "border-box",
            transition: "transform 0.4s ease",
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder-camisa.png";
          }}
        />
      </div>

      {/* Título & Preço */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: "12px 4px 16px",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            color: "var(--text-primary)",
            fontWeight: "600",
            margin: "0 0 8px 0",
            lineHeight: "1.3",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {produto.name}
        </h3>
        <div>
          <p
            style={{
              color: "var(--accent-light)",
              fontWeight: "900",
              fontSize: "18px",
              margin: "4px 0 0 0",
            }}
          >
            R$ {Number(produto.price).toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>

      {/* Botão de Ver Produto */}
      <Link
        to={`/produto/${produto.id}`}
        style={{ width: "100%", textDecoration: "none" }}
      >
        <button
          style={{
            backgroundColor: "var(--accent)",
            color: "#ffffff",
            border: "none",
            padding: "12px 0",
            width: "100%",
            fontWeight: "900",
            fontSize: "12px",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "1px",
            borderRadius: "var(--radius-md)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-light)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
        >
          Ver Manto
        </button>
      </Link>
    </div>
  );
}
