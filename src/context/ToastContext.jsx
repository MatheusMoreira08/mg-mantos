/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";

const ToastContext = createContext({
  showToast: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Memoiza as funções e o valor do Provider para evitar re-renders em cascata
  // (flicker) em todos os consumidores de useToast() a cada mudança de estado.
  const showToast = useCallback((mensagem, tipo = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, mensagem, tipo }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  const getStyleForType = (tipo) => {
    switch (tipo) {
      case "error":
        return {
          borderColor: "var(--error)",
          backgroundColor: "rgba(230, 57, 70, 0.15)",
          icon: "⚠️",
        };
      case "success":
        return {
          borderColor: "var(--success)",
          backgroundColor: "rgba(45, 158, 90, 0.15)",
          icon: "✓",
        };
      case "warning":
        return {
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.15)",
          icon: "⚡",
        };
      default:
        return {
          borderColor: "var(--accent)",
          backgroundColor: "rgba(106, 13, 173, 0.25)",
          icon: "ℹ️",
        };
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "380px",
          width: "calc(100% - 48px)",
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => {
          const styleConfig = getStyleForType(toast.tipo);
          return (
            <div
              key={toast.id}
              onClick={() => removeToast(toast.id)}
              style={{
                pointerEvents: "auto",
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                border: `1.5px solid ${styleConfig.borderColor}`,
                borderRadius: "var(--radius-lg)",
                padding: "14px 18px",
                boxShadow: "var(--shadow-hover)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                animation: "toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{styleConfig.icon}</span>
              <span style={{ flex: 1, lineHeight: "1.4" }}>{toast.mensagem}</span>
              <span style={{ opacity: 0.5, fontSize: "14px", marginLeft: "4px" }}>✕</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
