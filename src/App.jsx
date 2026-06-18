import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MinhaConta from './pages/MinhaConta';
import Produto from './pages/Produto'; 
import Carrinho from './pages/Carrinho'; // <-- Importamos a página do carrinho aqui!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Produto />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/minha-conta" element={<MinhaConta />} /> 
        {/* Trocamos o h1 pelo componente Carrinho */}
        <Route path="/carrinho" element={<Carrinho />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;