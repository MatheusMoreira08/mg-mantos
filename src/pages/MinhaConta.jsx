import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

export default function MinhaConta() {
  const [usuario, setUsuario] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estados do formulário de novo endereço
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const navigate = useNavigate();

  // Carrega os dados do usuário e seus endereços salvos
  useEffect(() => {
    const carregarDadosConta = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate('/login');
        return;
      }

      setUsuario(session.user);

      // Busca os endereços do usuário logado
      const { data: dataEnderecos, error } = await supabase
        .from('addresses')
        .select('*');

      if (!error && dataEnderecos) {
        setEnderecos(dataEnderecos);
      }
      setCarregando(false);
    };

    carregarDadosConta();
  }, [navigate]);

  // Função para salvar um novo endereço no Supabase
  const handleCadastrarEndereco = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('addresses')
      .insert([
        {
          user_id: usuario.id,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado
        }
      ])
      .select();

    if (error) {
      alert('Erro ao salvar endereço: ' + error.message);
      return;
    }

    // Atualiza a lista na tela e limpa o formulário
    setEnderecos([...enderecos, data[0]]);
    setCep(''); setRua(''); setNumero(''); setBairro(''); setCidade(''); setEstado('');
    alert('Endereço salvo com sucesso! 🎉');
  };

  const handleSair = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (carregando) {
    return <p style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>Carregando dados da conta...</p>;
  }

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#0a0a0a', borderBottom: '1px solid #222' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '24px', fontWeight: '900' }}>
          MG <span style={{ color: '#6a0dad' }}>MANTOS</span>
        </Link>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>VOLTAR À LOJA</Link>
      </header>

      <main style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* Coluna 1: Dados e Endereços Existentes */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2>Minha Conta</h2>
          <p style={{ color: '#aaa' }}>Bem-vindo de volta, <strong>{usuario.email}</strong></p>
          
          <button onClick={handleSair} style={{ backgroundColor: '#ff4757', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
            Sair da Conta
          </button>

          <h3 style={{ marginTop: '40px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>Meus Endereços Salvos</h3>
          {enderecos.length === 0 ? (
            <p style={{ color: '#666', italic: 'true' }}>Nenhum endereço cadastrado ainda.</p>
          ) : (
            enderecos.map((end) => (
              <div key={end.id} style={{ backgroundColor: '#141414', padding: '15px', borderRadius: '6px', marginBottom: '10px', border: '1px solid #222' }}>
                <p style={{ margin: '0 0 5px 0' }}><strong>{end.rua}, Nº {end.numero}</strong></p>
                <p style={{ margin: '0', color: '#aaa', fontSize: '14px' }}>{end.bairro} - {end.cidade}/{end.estado}</p>
                <p style={{ margin: '5px 0 0 0', color: '#6a0dad', fontSize: '13px', fontWeight: 'bold' }}>CEP: {end.cep}</p>
              </div>
            ))
          )}
        </div>

        {/* Coluna 2: Formulário de Cadastro */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#141414', padding: '25px', borderRadius: '8px', border: '1px solid #222' }}>
          <h3>Cadastrar Novo Endereço</h3>
          <form onSubmit={handleCadastrarEndereco} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
            <input type="text" placeholder="CEP" required value={cep} onChange={e => setCep(e.target.value)} style={{ padding: '10px', backgroundColor: '#0f0f0f', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <input type="text" placeholder="Rua / Logradouro" required value={rua} onChange={e => setRua(e.target.value)} style={{ padding: '10px', backgroundColor: '#0f0f0f', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <input type="text" placeholder="Número" required value={numero} onChange={e => setNumero(e.target.value)} style={{ padding: '10px', backgroundColor: '#0f0f0f', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <input type="text" placeholder="Bairro" required value={bairro} onChange={e => setBairro(e.target.value)} style={{ padding: '10px', backgroundColor: '#0f0f0f', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <input type="text" placeholder="Cidade" required value={cidade} onChange={e => setCidade(e.target.value)} style={{ padding: '10px', backgroundColor: '#0f0f0f', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <input type="text" placeholder="Estado (UF)" required maxLength="2" value={estado} onChange={e => setEstado(e.target.value)} style={{ padding: '10px', backgroundColor: '#0f0f0f', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            
            <button type="submit" style={{ backgroundColor: '#2ecc71', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase' }}>
              Salvar Endereço
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}