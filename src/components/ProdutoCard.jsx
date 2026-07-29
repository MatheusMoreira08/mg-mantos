import { Link } from "react-router-dom";

export default function ProdutoCard({ produto }) {
  const imagemProduto = produto.image || produto.imagem;
  const badge = produto.badge || (produto.tags?.includes("lancamento") ? "Lançamento" : null);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        border: "1px solid var(--border)",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        color: "var(--text-primary)",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--shadow-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            backgroundColor: "var(--accent)",
            color: "#ffffff",
            fontSize: "10px",
            fontWeight: "900",
            padding: "4px 8px",
            borderRadius: "var(--radius-sm)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            zIndex: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          {badge}
        </span>
      )}
      <div
        style={{
          width: "100%",
          height: "260px",
          backgroundColor: "var(--bg-secondary)",
          overflow: "hidden",
          borderRadius: "4px",
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
            padding: "8px",
            boxSizing: "border-box",
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/300x300/1a1a1a/ffffff?text=${encodeURIComponent(produto.name || 'MG Mantos')}`;
          }}
        />
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h3
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            marginTop: "15px",
            fontWeight: "500",
            minHeight: "36px",
          }}
        >
          {produto.name}
        </h3>
        <p
          style={{
            color: "var(--text-primary)",
            fontWeight: "900",
            fontSize: "16px",
            margin: "10px 0",
          }}
        >
          R$ {Number(produto.price).toFixed(2).replace(".", ",")}
        </p>
      </div>
      <Link
        to={`/produto/${produto.id}`}
        style={{ width: "100%", textDecoration: "none", marginTop: "auto" }}
      >
        <button
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--text-primary)",
            border: "none",
            padding: "12px 0",
            width: "100%",
            fontWeight: "bold",
            fontSize: "12px",
            cursor: "pointer",
            textTransform: "uppercase",
            borderRadius: "0 0 var(--radius-md) var(--radius-md)",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-light)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--accent)")
          }
        >
          Ver Produto
        </button>
      </Link>
    </div>
  );
}
