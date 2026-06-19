import { useState, useEffect } from "react";

export default function BannerCarousel({ imagens }) {
  const [atual, setAtual] = useState(0);

  // Efeito para passar a imagem automaticamente
  useEffect(() => {
    const intervalo = setInterval(() => {
      setAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
    }, 5000); // 5000 = 5 segundos
    return () => clearInterval(intervalo);
  }, [imagens.length]);

  const proximo = () => setAtual(atual === imagens.length - 1 ? 0 : atual + 1);
  const anterior = () => setAtual(atual === 0 ? imagens.length - 1 : atual - 1);

  if (!imagens || imagens.length === 0) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <img
        src={imagens[atual]}
        alt={`Banner ${atual + 1}`}
        style={{
          width: "100%",
          display: "block",
          objectFit: "cover",
          maxHeight: "500px",
          animation: "fadeIn 0.5s", // Suaviza a troca
        }}
      />

      {/* Seta Esquerda */}
      <button
        onClick={anterior}
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.8)",
          border: "none",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          fontSize: "20px",
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
        }}
      >
        ❮
      </button>

      {/* Seta Direita */}
      <button
        onClick={proximo}
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.8)",
          border: "none",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          fontSize: "20px",
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
        }}
      >
        ❯
      </button>
    </div>
  );
}
