import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Produto from "./pages/Produto";
import Categoria from "./pages/Categoria";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import MinhaConta from "./pages/MinhaConta";
import PedidoConfirmado from "./pages/PedidoConfirmado";
import NaoEncontrada from "./pages/NaoEncontrada";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/index";
import AdminProdutos from "./pages/admin/Produtos";

function AppShell() {
  const location = useLocation();
  // O painel admin tem layout próprio (barra lateral), sem Header/Footer da loja.
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/categoria/:slug" element={<Categoria />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/login" element={<Login />} />
        <Route path="/minha-conta" element={<MinhaConta />} />
        <Route path="/pedido-confirmado/:orderId" element={<PedidoConfirmado />} />

        {/* Painel administrativo (protegido pela AdminRoute) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="produtos" element={<AdminProdutos />} />
        </Route>

        {/* Rota 404 dedicada (em vez de redirecionar silenciosamente para a home) */}
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <AppShell />
      </Router>
    </ErrorBoundary>
  );
}