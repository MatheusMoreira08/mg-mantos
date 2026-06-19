import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CarrinhoContext } from '../context/CarrinhoContext';
import { supabase } from '../services/supabase';

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, limparCarrinho, valorTotal } = useContext(CarrinhoContext);
  
  const [usuario, setUsuario] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState('');
  const [processando, setProcessando] = useState(false);
  const navigate = useNavigate();

  // Verifica se o usuário tá logado e puxa os endereços dele
  useEffect(() => {
    const carregarDados = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUsuario(session.user);
        const { data: dataEnderecos } = await supabase.from('addresses').select('*');
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
      navigate('/login');
      return;
    }
    if (enderecos.length === 0) {
      alert("Você precisa cadastrar um endereço de entrega na página Minha Conta!");
      navigate('/minha-conta');
      return;
    }

    setProcessando(true);

    try {
      // 1. Cria o Pedido principal
      const { data: pedido, error: erroPedido } = await supabase
        .from('orders')
        .insert([{
          user_id: usuario.id,
          address_id: enderecoSelecionado,
          total: valorTotal,
          status: 'Pedido Recebido'
        }])
        .select()
        .single();

      if (erroPedido) throw erroPedido;

      // 2. Prepara os itens do carrinho para salvar no banco
      const itensDoPedido = carrinho.map(item => ({
        order_id: pedido.id,
        product_id: item.id,
        quantidade: item.quantidade,
        preco_unitario: item.price
      }));

      // 3. Salva os itens na tabela order_items
      const { error: erroItens } = await supabase.from('order_items').insert(itensDoPedido);
      if (erroItens) throw erroItens;

      // Sucesso! Limpa o carrinho e avisa o cliente
      limparCarrinho();
      alert("🎉 Compra realizada com sucesso! Obrigado por comprar na MG Mantos.");
      navigate('/minha-conta'); // Manda de volta pra conta pra ele ver o pedido depois

    } catch (error) {
      console.error("Erro ao finalizar:", error);
      alert("Houve um erro ao processar seu pedido. Tente novamente.");
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#0a0a0a', borderBottom: '1px solid #222' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#fff', fontWeight: '900', letterSpacing: '1px' }}>
          MG <span style={{ color: '#6a0dad' }}>MANTOS</span>
        </h1>
        <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>INÍCIO</Link>
          <Link to="/minha-conta" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>MINHA CONTA</Link>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '20px' }}>🛒</span>
            <span style={{ backgroundColor: '#6a0dad', color: '#fff', borderRadius: '50%', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold', marginLeft: '-5px', marginTop: '-10px' }}>
              {carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
            </span>
          </div>
        </nav>
      </header>

      <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '30px', textTransform: 'uppercase', borderBottom: '2px solid #222', paddingBottom: '10px' }}>
          Seu Carrinho
        </h2>

        {carrinho.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#141414', borderRadius: '8px', border: '1px solid #222' }}>
            <span style={{ fontSize: '60px', display: 'block', marginBottom: '20px' }}>🛍️</span>
            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Sua sacola está vazia</h3>
            <Link to="/" style={{ display: 'inline-block', backgroundColor: '#6a0dad', color: '#fff', textDecoration: 'none', padding: '12px 30px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
            {/* Lista de Produtos */}
            <div style={{ flex: '2', minWidth: '300px' }}>
              {carrinho.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '20px', backgroundColor: '#141414', padding: '20px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #222', alignItems: 'center' }}>
                  <img src={`/${item.image}`} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'contain', backgroundColor: '#0a0a0a', borderRadius: '4px' }} />
                  <div style={{ flex: '1' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{item.name}</h4>
                    <p style={{ color: '#aaa', margin: '0 0 5px 0', fontSize: '13px' }}>Qtd: {item.quantidade}</p>
                    <p style={{ color: '#2ecc71', fontWeight: 'bold', margin: 0 }}>R$ {Number(item.price).toFixed(2).replace('.', ',')}</p>
                  </div>
                  <button onClick={() => removerDoCarrinho(item.id)} style={{ backgroundColor: 'transparent', color: '#ff4757', border: '1px solid #ff4757', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Remover
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo e Checkout */}
            <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#141414', padding: '30px', borderRadius: '8px', border: '1px solid #222', height: 'fit-content' }}>
              <h3 style={{ margin: '0 0 20px 0', textTransform: 'uppercase', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Resumo do Pedido</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#aaa' }}>
                <span>Subtotal ({carrinho.length} itens)</span>
                <span>R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              
              {/* Seleção de Endereço */}
              <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #333' }}>
                <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '14px' }}>Endereço de Entrega:</p>
                {enderecos.length > 0 ? (
                  <select 
                    value={enderecoSelecionado} 
                    onChange={(e) => setEnderecoSelecionado(e.target.value)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0f0f0f', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
                  >
                    {enderecos.map(end => (
                      <option key={end.id} value={end.id}>{end.rua}, {end.numero} - {end.cidade}</option>
                    ))}
                  </select>
                ) : (
                  <p style={{ color: '#ff4757', fontSize: '13px' }}>Cadastre um endereço para continuar.</p>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '20px', fontWeight: 'bold' }}>
                <span>Total</span>
                <span style={{ color: '#2ecc71' }}>R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
              </div>

              <button 
                onClick={finalizarCompra} 
                disabled={processando}
                style={{ backgroundColor: processando ? '#666' : '#2ecc71', color: '#fff', border: 'none', padding: '15px', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px', width: '100%', cursor: processando ? 'not-allowed' : 'pointer', textTransform: 'uppercase' }}
              >
                {processando ? 'Processando...' : 'Finalizar Compra'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}