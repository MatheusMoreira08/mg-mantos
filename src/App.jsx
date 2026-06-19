import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Importe o Footer
import Home from "./pages/Home";
import Produto from "./pages/Produto";
import Categoria from "./pages/Categoria";
import Carrinho from "./pages/Carrinho";
import MinhaConta from "./pages/MinhaConta";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/categoria/:slug" element={<Categoria />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/minha-conta" element={<MinhaConta />} />
      </Routes>
      <Footer /> {/* O Footer entra aqui, fechando o site! */}
    </Router>
  );
}
