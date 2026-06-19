import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase'; // A tua ligação ao Supabase!

export default function Login() {
  // O React guarda o estado do e-mail, da palavra-passe e dos erros
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  
  // Hook para redirecionar o utilizador de página
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que a página recarregue
    setErro(''); // Limpa erros anteriores

    // Chamada ao Supabase igual à que tinhas no vanilla JS
    const { error } = await supabase.auth.signInWithPassword({
      email: email, 
      password: senha 
    });

    if (error) {
      setErro('E-mail ou palavra-passe inválidos.');
      return;
    }

    // Login ok -> redireciona para a área de cliente
    navigate('/minha-conta');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Iniciar Sessão</h2>
      <form id="form-login" onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="email" 
          placeholder="O teu e-mail" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="A tua palavra-passe" 
          required 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Entrar</button>
        
        {/* Só mostra o parágrafo de erro se a variável 'erro' tiver algum texto */}
        {erro && <p id="erro" style={{ color: 'red' }}>{erro}</p>}
      </form>
    </div>
  );
}