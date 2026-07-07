import { Link } from "react-router-dom";

export default function ProdutoCard({ produto }) {
  const imagemProduto = produto.image || produto.imagem;

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
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "var(--shadow-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
      }}
    >
      <div
        style={{
          width: "100%",
          height: "260px",
          backgroundColor: "var(--bg-secondary)",
          overflow: "hidden",
          borderRadius: "4px",
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
            e.currentTarget.src = "/placeholder-camisa.png";
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
