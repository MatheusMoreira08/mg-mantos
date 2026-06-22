import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CarrinhoProvider } from "./context/CarrinhoContext.jsx";
import "./styles/tokens.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </React.StrictMode>,
);
