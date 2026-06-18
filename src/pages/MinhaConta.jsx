import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

export default function MinhaConta() {
  // O estado 'usuario' vai guardar os dados do Supabase
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // O useEffect roda automaticamente assim que a página abre
  useEffect(() => {
    const verificarSessao = async () => {
      // Pergunta pro Supabase: "Tem alguém logado aí?"
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Se não tiver sessão, expulsa de volta pro login
        navigate('/login');
      } else {
        // Se tiver logado, pega os dados do usuário e salva no estado
        setUsuario(session.user);
      }
    };

    verificarSessao();
  }, [navigate]);

  // Função para fazer o Log out
  const handleSair = async () => {
    await supabase.auth.signOut(); // Desloga do Supabase
    navigate('/login'); // Manda de volta pro login
  };

  // Enquanto o useEffect tá verificando no banco, mostra um "Carregando"
  if (!usuario) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Carregando dados da conta...</p>;
  }

  // A tela principal da Minha Conta
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '40px auto', backgroundColor: '#1e1e1e', color: '#fff', borderRadius: '8px' }}>
      <h2>Minha Conta</h2>
      <hr style={{ borderColor: '#333' }} />
      
      <div style={{ marginTop: '20px' }}>
        <h3>Meus Dados</h3>
        <p><strong>E-mail cadastrado:</strong> {usuario.email}</p>
        <p><strong>ID de Segurança:</strong> {usuario.id}</p>
        {/* Futuramente vamos puxar os pedidos do banco de dados e listar aqui! */}
      </div>

      <button 
        onClick={handleSair} 
        style={{ marginTop: '30px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
      >
        Sair da Conta
      </button>
    </div>
  );
}