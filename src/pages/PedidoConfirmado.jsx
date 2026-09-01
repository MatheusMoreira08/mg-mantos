import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../services/supabase";

export default function PedidoConfirmado() {
  const { orderId } = useParams();
  const [carregando, setCarregando] = useState(true);
  const [pedido, setPedido] = useState(null);
  const [itens, setItens] = useState([]);
  const [endereco, setEndereco] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (isSupabaseConfigured && session?.user) {
        try {
          const { data: ord } = await supabase
            .from("orders")
            .select("*")
            .eq("id", orderId)
            .eq("user_id", session.user.id)
            .single();

          if (ord) {
            setPedido(ord);

            const { data: it } = await supabase
              .from("order_items")
              .select("*, products(name)")
              .eq("order_id", orderId);
            if (it) setItens(it);

            if (ord.address_id) {
              const { data: end } = await supabase
                .from("addresses")
                .select("*")
                .eq("id", ord.address_id)
                .eq("user_id", session.user.id)
                .single();
              if (end) setEndereco(end);
            }

            setCarregando(false);
            return;
          }
          setCarregando(false);
          return;
        } catch (e) {
          console.warn("Erro ao buscar pedido no Supabase:", e);
          setCarregando(false);
          return;
        }
      }

      // Fallback para exibição de pedido simulado apenas em dev local
      if (import.meta.env.DEV) {
        setPedido({
          id: orderId || "PED-849201",
          status: "aprovado",
          total: 129.9,
          created_at: new Date().toISOString(),
        });
        setItens([
          {
            id: 1,
            quantity: 1,
            name: "Camisa de Futebol Oficial",
            preco_unitario: 129.9,
          },
        ]);
      }

      setCarregando(false);
    };
    buscarDados();
  }, [orderId]);

  if (carregando) {
    return (
      <div
        style={{
          backgroundColor: "var(--bg-primary)",
          minHeight: "100vh",
          color: "var(--text-primary)",
          padding: "80px 20px",
          fontFamily: "var(--font-body)",
          textAlign: "center",
        }}
      >
        <p>Carregando informações do seu pedido...</p>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div
        style={{
          backgroundColor: "var(--bg-primary)",
          minHeight: "100vh",
          color: "var(--text-primary)",
          padding: "80px 20px",
          fontFamily: "var(--font-body)",
          textAlign: "center",
        }}
      >
        <h2>Pedido não encontrado</h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Não foi possível localizar este pedido para a sua conta.
        </p>
        <Link to="/" style={{ color: "var(--accent)", fontWeight: "bold" }}>
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
        color: "var(--text-primary)",
        padding: "50px 20px 80px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "var(--bg-card)",
          padding: "40px",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* CABEÇALHO COM ÍCONE DE SUCESSO */}
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <span style={{ fontSize: "60px", display: "block", marginBottom: "15px" }}>🎉</span>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "900",
              textTransform: "uppercase",
              margin: "0 0 10px 0",
              color: "var(--text-primary)",
            }}
          >
            Pedido Confirmado!
          </h1>
          <p style={{ color: "var(--success)", fontWeight: "bold", fontSize: "16px" }}>
            Obrigado por comprar na MG Mantos! Seu manto está garantido.
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginTop: "5px" }}>
            Código do pedido: <strong>#{String(pedido.id).slice(0, 10).toUpperCase()}</strong>
          </p>
        </div>

        {/* TIMELINE DE STATUS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "var(--bg-secondary)",
            padding: "20px",
            borderRadius: "var(--radius-md)",
            marginBottom: "35px",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "center", flex: 1 }}>
            <span style={{ fontSize: "20px" }}>✅</span>
            <p style={{ fontSize: "11px", fontWeight: "bold", margin: "4px 0 0" }}>Pedido Realizado</p>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <span style={{ fontSize: "20px" }}>💳</span>
            <p style={{ fontSize: "11px", fontWeight: "bold", margin: "4px 0 0", color: "var(--accent)" }}>
              Pagamento Aprovado
            </p>
          </div>
          <div style={{ textAlign: "center", flex: 1, opacity: 0.6 }}>
            <span style={{ fontSize: "20px" }}>📦</span>
            <p style={{ fontSize: "11px", margin: "4px 0 0" }}>Em Separação</p>
          </div>
          <div style={{ textAlign: "center", flex: 1, opacity: 0.6 }}>
            <span style={{ fontSize: "20px" }}>🚚</span>
            <p style={{ fontSize: "11px", margin: "4px 0 0" }}>Enviado</p>
          </div>
        </div>

        {/* RESUMO DOS ITENS */}
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "900",
            textTransform: "uppercase",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "10px",
            marginBottom: "15px",
          }}
        >
          Itens do Pedido
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "25px" }}>
          {itens.map((it, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              <span>
                <strong>{it.quantity || it.quantidade || 1}x</strong>{" "}
                {it.products?.name || it.product_name || it.name || "Manto de Futebol Exclusivo"}
              </span>
              <strong style={{ color: "var(--accent)" }}>
                R$ {Number(it.unit_price || it.preco_unitario || 129.9).toFixed(2).replace(".", ",")}
              </strong>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            fontWeight: "900",
            borderTop: "1px solid var(--border)",
            paddingTop: "15px",
            marginBottom: "30px",
          }}
        >
          <span>Valor Total</span>
          <span style={{ color: "var(--accent)" }}>
            R$ {Number(pedido.total).toFixed(2).replace(".", ",")}
          </span>
        </div>

        {/* ENDEREÇO DE ENTREGA */}
        {endereco && (
          <div
            style={{
              backgroundColor: "var(--bg-secondary)",
              padding: "20px",
              borderRadius: "var(--radius-md)",
              marginBottom: "30px",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "bold" }}>
              📍 Endereço de Entrega Cadastrado:
            </h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
              {endereco.rua}, {endereco.numero} - {endereco.bairro}
              <br />
              {endereco.cidade} - {endereco.estado} | CEP: {endereco.cep}
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link
            to="/"
            style={{
              backgroundColor: "var(--accent)",
              color: "#ffffff",
              padding: "15px 35px",
              borderRadius: "var(--radius-md)",
              textDecoration: "none",
              fontWeight: "900",
              textTransform: "uppercase",
              display: "inline-block",
              boxShadow: "var(--shadow-card)",
            }}
          >
            Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
}
