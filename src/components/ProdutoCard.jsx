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
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* CAIXA TRAVADA: Usando objectFit: 'cover' para forçar o preenchimento igual */}
      <div
        style={{
          width: "100%",
          height: "220px",
          backgroundColor: "#f6f6f6",
          overflow: "hidden",
        }}
      >
        <img
          src={produto.imagem || produto.image}
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
          }}
        >
          {produto.name}
        </h3>
        <p
          style={{
            color: "#000",
            fontWeight: "900",
            fontSize: "16px",
            margin: "15px 0",
          }}
        >
          R$ {produto.price}
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
          }}
        >
          Adicionar ao Carrinho
        </button>
      </Link>
    </div>
  );
}
