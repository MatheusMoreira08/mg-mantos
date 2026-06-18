import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Importamos o Provedor do Carrinho que criámos
import { CarrinhoProvider } from './context/CarrinhoContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos o App inteiro com o CarrinhoProvider! */}
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </React.StrictMode>,
)