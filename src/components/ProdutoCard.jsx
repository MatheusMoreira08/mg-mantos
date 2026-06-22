import { Link } from "react-router-dom";

export default function ProdutoCard({ produto }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        border: "1px solid #f0f0f0",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
        borderRadius: "4px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: "100%",
          height: "220px",
          backgroundColor: "#f6f6f6",
          overflow: "hidden",
          borderRadius: "4px",
        }}
      >
        <img
          src={`/${produto.image || produto.imagem}`}
          alt={produto.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
            color: "#333",
            marginTop: "15px",
            fontWeight: "500",
            minHeight: "36px",
          }}
        >
          {produto.name}
        </h3>
        <p
          style={{
            color: "#000",
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
            backgroundColor: "rgb(106, 13, 173)",
            color: "#fff",
            border: "none",
            padding: "12px 0",
            width: "100%",
            fontWeight: "bold",
            fontSize: "12px",
            cursor: "pointer",
            textTransform: "uppercase",
            borderRadius: "0 0 4px 4px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#550aad")}
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "rgb(106, 13, 173)")
          }
        >
          Ver Produto
        </button>
      </Link>
    </div>
  );
}
