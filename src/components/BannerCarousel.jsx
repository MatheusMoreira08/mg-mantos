import { useState, useEffect, useCallback } from "react";

export default function BannerCarousel({ imagens }) {
  const [atual, setAtual] = useState(0);
  const [ticker, setTicker] = useState(0); // resetar o autoplay ao clicar

  // BUG 1 FIX: keyframes fadeIn inline para não depender de CSS externo
  const estiloFade = `
    @keyframes fadeIn {
      from { opacity: 0.4; }
      to   { opacity: 1; }
    }
  `;

  const proximo = useCallback(() => {
    setAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
    setTicker((t) => t + 1); // BUG 3 FIX: reseta o timer
  }, [imagens.length]);

  const anterior = useCallback(() => {
    setAtual((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
    setTicker((t) => t + 1); // BUG 3 FIX: reseta o timer
  }, [imagens.length]);

  // BUG 3 FIX: depende de 'ticker' para reiniciar o intervalo após clique manual
  useEffect(() => {
    const intervalo = setInterval(() => {
      setAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(intervalo);
  }, [imagens.length, ticker]);

  if (!imagens || imagens.length === 0) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      {/* BUG 1 FIX: injeta keyframes */}
      <style>{estiloFade}</style>

      <img
        key={atual}
        src={imagens[atual]}
        alt={`Banner ${atual + 1}`}
        style={{
          width: "100%",
          display: "block",
          objectFit: "cover",
          maxHeight: "500px",
          animation: "fadeIn 0.5s ease",
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
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          fontSize: "20px",
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-primary)",
          boxShadow: "var(--shadow-card)",
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
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          fontSize: "20px",
          cursor: "pointer",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-primary)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        ❯
      </button>

      {/* BUG 2 FIX: dots de posição */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {imagens.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setAtual(i);
              setTicker((t) => t + 1);
            }}
            style={{
              width: i === atual ? "20px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: i === atual ? "var(--accent)" : "var(--border)",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
