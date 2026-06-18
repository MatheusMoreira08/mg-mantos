import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MinhaConta from './pages/MinhaConta'; // <-- Importamos aqui!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Página Inicial em Construção</h1>} />
        <Route path="/login" element={<Login />} /> 
        {/* Trocamos o h1 pelo componente MinhaConta */}
        <Route path="/minha-conta" element={<MinhaConta />} /> 
        <Route path="/carrinho" element={<h1>Carrinho de Compras</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;