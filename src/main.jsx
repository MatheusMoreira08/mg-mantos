import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CarrinhoProvider } from "./context/CarrinhoContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./styles/tokens.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CarrinhoProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </CarrinhoProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
