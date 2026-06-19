import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarrinhoContext } from "../context/CarrinhoContext";
import { supabase } from "../services/supabase";

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, limparCarrinho, valorTotal } =
    useContext(CarrinhoContext);

  const [usuario, setUsuario] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [processando, setProcessando] = useState(false);
  const navigate = useNavigate();

  // Verifica se o usuário tá logado e puxa os endereços dele
  useEffect(() => {
    const carregarDados = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUsuario(session.user);
        const { data: dataEnderecos } = await supabase
          .from("addresses")
          .select("*");
        if (dataEnderecos && dataEnderecos.length > 0) {
          setEnderecos(dataEnderecos);
          setEnderecoSelecionado(dataEnderecos[0].id); // Seleciona o 1º endereço por padrão
        }
      }
    };
    carregarDados();
  }, []);

  // A função que salva a compra no Supabase!
  const finalizarCompra = async () => {
    if (!usuario) {
      alert("Você precisa fazer login para finalizar a compra!");
      navigate("/minha-conta"); // Direciona para a página de conta que agora é o login
      return;
    }
    if (enderecos.length === 0) {
      alert(
        "Você precisa cadastrar um endereço de entrega na página Minha Conta!",
      );
      navigate("/minha-conta");
      return;
    }

    setProcessando(true);

    try {
      // 1. Cria o Pedido principal
      const { data: pedido, error: erroPedido } = await supabase
        .from("orders")
        .insert([
          {
            user_id: usuario.id,
            address_id: enderecoSelecionado,
            total: valorTotal,
            status: "Pedido Recebido",
          },
        ])
        .select()
        .single();

      if (erroPedido) throw erroPedido;

      // 2. Prepara os itens do carrinho para salvar no banco
      const itensDoPedido = carrinho.map((item) => ({
        order_id: pedido.id,
        product_id: item.id,
        quantidade: item.quantidade,
        preco_unitario: item.price,
      }));

      // 3. Salva os itens na tabela order_items
      const { error: erroItens } = await supabase
        .from("order_items")
        .insert(itensDoPedido);
      if (erroItens) throw erroItens;

      // Sucesso! Limpa o carrinho e avisa o cliente
      limparCarrinho();
      alert(
        "🎉 Compra realizada com sucesso! Obrigado por comprar na MG Mantos.",
      );
      navigate("/minha-conta"); // Manda de volta pra conta pra ele ver o pedido depois
    } catch (error) {
      console.error("Erro ao finalizar:", error);
      alert("Houve um erro ao processar seu pedido. Tente novamente.");
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        color: "#333",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        padding: "40px 20px",
      }}
    >
      <main style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "30px",
            textTransform: "uppercase",
            fontWeight: "900",
            color: "#000",
          }}
        >
          Seu Carrinho
        </h2>

        {carrinho.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #eaeaea",
              boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
            }}
          >
            <span
              style={{
                fontSize: "60px",
                display: "block",
                marginBottom: "20px",
              }}
            >
              🛒
            </span>
            <h3
              style={{
                fontSize: "24px",
                marginBottom: "15px",
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              Sua sacola está vazia
            </h3>
            <p style={{ color: "#666", marginBottom: "30px" }}>
              Navegue pelas nossas categorias e descubra os melhores mantos!
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                backgroundColor: "#00bfa5",
                color: "#fff",
                textDecoration: "none",
                padding: "15px 40px",
                borderRadius: "4px",
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            {/* Lista de Produtos (Lado Esquerdo) */}
            <div style={{ flex: "2", minWidth: "300px" }}>
              {carrinho.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "15px",
                    border: "1px solid #eaeaea",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`/${item.image || item.imagem}`}
                    alt={item.name}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "contain",
                      backgroundColor: "#f6f6f6",
                      borderRadius: "4px",
                      padding: "5px",
                    }}
                  />
                  <div style={{ flex: "1" }}>
                    <h4
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        color: "#888",
                        margin: "0 0 5px 0",
                        fontSize: "13px",
                      }}
                    >
                      Qtd: {item.quantidade}
                    </p>
                    <p
                      style={{
                        color: "rgb(106, 13, 173)",
                        fontWeight: "900",
                        margin: 0,
                        fontSize: "16px",
                      }}
                    >
                      R$ {Number(item.price).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <button
                    onClick={() => removerDoCarrinho(item.id)}
                    style={{
                      backgroundColor: "#fff",
                      color: "#ff4757",
                      border: "1px solid #ff4757",
                      padding: "8px 15px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "12px",
                      transition: "0.2s",
                    }}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo e Checkout (Lado Direito) */}
            <div
              style={{
                flex: "1",
                minWidth: "300px",
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "8px",
                border: "1px solid #eaeaea",
                height: "fit-content",
                boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px 0",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "15px",
                  fontWeight: "900",
                  fontSize: "18px",
                }}
              >
                Resumo do Pedido
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  color: "#666",
                  fontWeight: "500",
                }}
              >
                <span>Subtotal ({carrinho.length} itens)</span>
                <span>R$ {valorTotal.toFixed(2).replace(".", ",")}</span>
              </div>

              {/* Seleção de Endereço */}
              <div
                style={{
                  marginBottom: "20px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <p
                  style={{
                    color: "#555",
                    marginBottom: "10px",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  Endereço de Entrega:
                </p>
                {enderecos.length > 0 ? (
                  <select
                    value={enderecoSelecionado}
                    onChange={(e) => setEnderecoSelecionado(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#f9f9f9",
                      color: "#333",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      outline: "none",
                    }}
                  >
                    {enderecos.map((end) => (
                      <option key={end.id} value={end.id}>
                        {end.rua}, {end.numero} - {end.cidade}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p
                    style={{
                      color: "#ff4757",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Cadastre um endereço em "Minha Conta" para continuar.
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                  fontSize: "22px",
                  fontWeight: "900",
                }}
              >
                <span>Total</span>
                <span style={{ color: "rgb(106, 13, 173)" }}>
                  R$ {valorTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <button
                onClick={finalizarCompra}
                disabled={processando}
                style={{
                  backgroundColor: processando ? "#aaa" : "#00c853",
                  color: "#fff",
                  border: "none",
                  padding: "15px",
                  borderRadius: "4px",
                  fontWeight: "900",
                  fontSize: "16px",
                  width: "100%",
                  cursor: processando ? "not-allowed" : "pointer",
                  textTransform: "uppercase",
                  transition: "0.2s",
                }}
              >
                {processando ? "Processando..." : "Finalizar Compra"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
