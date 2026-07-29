import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function PedidoConfirmado() {
  const { orderId } = useParams();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [itens, setItens] = useState([]);
  const [endereco, setEndereco] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      // Obtém sessão para validar dono do pedido
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setErro("É necessário estar logado para visualizar o pedido.");
        setCarregando(false);
        return;
      }

      // Busca o pedido
      const { data: ord, error: errOrd } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();
      if (errOrd || !ord) {
        setErro("Pedido não encontrado.");
        setCarregando(false);
        return;
      }

      // Verifica se o pedido pertence ao usuário logado
      if (ord.user_id !== session.user.id) {
        setErro("Pedido não encontrado.");
        setCarregando(false);
        return;
      }

      setPedido(ord);

      // Busca itens do pedido
      const { data: it, error: errIt } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);
      if (!errIt && it) setItens(it);

      // Busca endereço, se houver
      if (ord.address_id) {
        const { data: end, error: errEnd } = await supabase
          .from("addresses")
          .select("*")
          .eq("id", ord.address_id)
          .single();
        if (!errEnd && end) setEndereco(end);
      }

      setCarregando(false);
    };
    buscarDados();
  }, [orderId]);

  if (carregando) {
    return (
      <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)", padding: "40px", fontFamily: "var(--font-body)" }}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)", padding: "40px", fontFamily: "var(--font-body)", textAlign: "center" }}>
        <p>{erro}</p>
        <Link to="/" style={{ color: "var(--accent)", textDecoration: "none" }}>
          Voltar para a loja
        </Link>
      </div>
    );
  }

  // Mensagem de status amigável
  let mensagemStatus = "";
  switch (pedido.status) {
    case "aprovado":
      mensagemStatus = "Pagamento confirmado! Seu manto está garantido.";
      break;
    case "pendente":
      mensagemStatus = "Estamos aguardando a confirmação do pagamento.";
      break;
    case "rejeitado":
      mensagemStatus = "O pagamento não foi aprovado. Tente novamente.";
      break;
    default:
      mensagemStatus = `Status do pedido: ${pedido.status}`;
  }

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)", padding: "40px", fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "900", marginBottom: "20px" }}>
          Pedido #{String(pedido.id).slice(0, 8).toUpperCase()}
        </h2>
        <p style={{ marginBottom: "10px", fontWeight: "500" }}>{mensagemStatus}</p>
        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Itens</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {itens.map((it) => (
            <li key={it.id} style={{ marginBottom: "8px" }}>
              {it.quantity || it.quantidade || 1} x {it.product_name || it.name || "Produto"} – R$ {Number(it.unit_price || it.preco_unitario).toFixed(2).replace(".", ",")}
            </li>
          ))}
        </ul>
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>Total: R$ {Number(pedido.total).toFixed(2).replace(".", ",")}</p>
        {endereco && (
          <div style={{ marginTop: "20px" }}>
            <h3>Endereço de entrega</h3>
            <p>{endereco.rua}, {endereco.numero} - {endereco.bairro}</p>
            <p>{endereco.cidade} - {endereco.estado}, CEP: {endereco.cep}</p>
          </div>
        )}
        <div style={{ marginTop: "30px" }}>
          <Link to="/" style={{ backgroundColor: "var(--accent)", color: "var(--text-primary)", padding: "12px 24px", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
            Voltar para a loja
          </Link>
        </div>
      </div>
    </div>
  );
}
