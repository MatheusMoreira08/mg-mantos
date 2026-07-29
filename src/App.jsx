import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Produto from "./pages/Produto";
import Categoria from "./pages/Categoria";
import Carrinho from "./pages/Carrinho";
import MinhaConta from "./pages/MinhaConta";
import PedidoConfirmado from "./pages/PedidoConfirmado";


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
        <Route path="/pedido-confirmado/:orderId" element={<PedidoConfirmado />} />

        {/* Rota 404: qualquer URL desconhecida volta para a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}
