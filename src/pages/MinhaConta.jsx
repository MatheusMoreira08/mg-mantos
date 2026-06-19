import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Link, useNavigate } from 'react-router-dom';

export default function MinhaConta() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      setUsuario(session.user);

      // Busca os pedidos deste usuário no banco
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(id, quantidade, preco_unitario, products(name))')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (data) setPedidos(data);
    };
    carregarDados();
  }, [navigate]);

  const sair = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>&larr; VOLTAR À LOJA</Link>
        <button onClick={sair} style={{ backgroundColor: '#ff4757', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Sair da Conta</button>
      </header>

      <h1>Minha Conta</h1>
      <p style={{ color: '#aaa', marginBottom: '40px' }}>Bem-vindo, {usuario?.email}</p>

      <h2>Meus Pedidos</h2>
      {pedidos.length === 0 ? (
        <p style={{ marginTop: '20px' }}>Você ainda não realizou nenhum pedido.</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {pedidos.map((pedido) => (
            <div key={pedido.id} style={{ backgroundColor: '#141414', padding: '20px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #222' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Pedido: {pedido.id.slice(0, 8).toUpperCase()}</span>
                <span style={{ color: '#2ecc71' }}>{pedido.status}</span>
              </div>
              <p>Total: R$ {Number(pedido.total).toFixed(2).replace('.', ',')}</p>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
                Data: {new Date(pedido.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}