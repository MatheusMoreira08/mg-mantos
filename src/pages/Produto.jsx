import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function Produto() {
  const { id } = useParams();
  const { adicionarAoCarrinho } = useContext(CarrinhoContext);
  const navigate = useNavigate();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemPrincipal, setImagemPrincipal] = useState('');

  useEffect(() => {
    const buscarProdutoPorId = async () => {
      try {
        setCarregando(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setProduto(data);
        setImagemPrincipal(data.image);
      } catch (erro) {
        console.error('Erro ao buscar detalhes do produto:', erro.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarProdutoPorId();
  }, [id]);

  if (carregando) {
    return (
      <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Carregando detalhes do manto...</h2>
      </div>
    );
  }

  if (!produto) {
    return (
      <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', textAlign: 'center', padding: '50px' }}>
        <h2>Manto não encontrado 😕</h2>
        <Link to="/" style={{ color: '#2ecc71', textDecoration: 'none', fontWeight: 'bold' }}>Voltar para a vitrine</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      <header style={{ padding: '20px 40px', backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>MG Mantos</Link>
      </header>

      <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <Link to="/" style={{ color: '#aaa', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
          &larr; Voltar para a vitrine
        </Link>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '20px' }}>
          
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '20px', border: '1px solid #2d2d2d', textAlign: 'center' }}>
              <img src={`/${imagemPrincipal}`} alt={produto.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
            </div>
            {produto.images && produto.images.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px', overflowX: 'auto' }}>
                {produto.images.map((img, index) => (
                  <img 
                    key={index} 
                    src={`/${img}`} 
                    alt={`${produto.name} vista ${index + 1}`} 
                    onClick={() => setImagemPrincipal(img)}
                    style={{ 
                      width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer',
                      border: imagemPrincipal === img ? '2px solid #2ecc71' : '2px solid #333'
                    }} 
                  />
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            {produto.badge && (
              <span style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {produto.badge}
              </span>
            )}
            <h1 style={{ marginTop: '15px', fontSize: '28px' }}>{produto.name}</h1>
            
            {produto.tags && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                {produto.tags.map((tag, index) => (
                  <span key={index} style={{ backgroundColor: '#333', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', color: '#ccc' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <p style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '32px', margin: '20px 0' }}>
              R$ {Number(produto.price).toFixed(2).replace('.', ',')}
            </p>

            <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '30px' }}>
              Manto de alta qualidade, tecido respirável e tecnologia de absorção de suor. Perfeito para jogos, coleção ou para demonstrar a paixão pelo seu clube no dia a dia.
            </p>

            <button 
              onClick={() => {
                adicionarAoCarrinho(produto);
                navigate('/carrinho');
              }}
              style={{ backgroundColor: '#2ecc71', color: '#fff', border: 'none', padding: '15px 30px', borderRadius: '4px', fontWeight: 'bold', fontSize: '18px', width: '100%', cursor: 'pointer', transition: 'background 0.3s' }}
            >
              Adicionar ao Carrinho 🛒
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}