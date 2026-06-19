import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function Produto() {
  const { id } = useParams();
  const { adicionarAoCarrinho, carrinho } = useContext(CarrinhoContext);
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
      <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#aaa' }}>Carregando detalhes do manto...</h2>
      </div>
    );
  }

  if (!produto) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
        <h2>Manto não encontrado 😕</h2>
        <Link to="/" style={{ color: '#6a0dad', textDecoration: 'none', fontWeight: 'bold' }}>Voltar para a vitrine</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      
      {/* HEADER IDENTICO À HOME */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#050505', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ margin: 0, fontSize: '26px', color: '#fff', fontWeight: '900', letterSpacing: '1px' }}>
            MG <span style={{ color: '#6a0dad' }}>MANTOS</span>
          </h1>
        </Link>

        <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>INÍCIO</Link>
          <Link to="/minha-conta" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>MINHA CONTA</Link>
          
          <Link to="/carrinho" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#fff' }}>
            <span style={{ fontSize: '22px' }}>🛒</span>
            {carrinho.length > 0 && (
              <span style={{ backgroundColor: '#6a0dad', color: '#fff', borderRadius: '50%', padding: '2px 7px', fontSize: '12px', fontWeight: 'bold', position: 'absolute', top: '-8px', right: '-12px' }}>
                {carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
              </span>
            )}
          </Link>
        </nav>
      </header>

      {/* CONTEÚDO DO PRODUTO */}
      <main style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>
        <Link to="/" style={{ color: '#6a0dad', textDecoration: 'none', marginBottom: '30px', display: 'inline-block', fontWeight: 'bold', fontSize: '14px' }}>
          &larr; VOLTAR PARA A VITRINE
        </Link>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', marginTop: '10px' }}>
          
          {/* COLUNA ESQUERDA: GALERIA */}
          <div style={{ flex: '1.2', minWidth: '320px' }}>
            {/* Moldura da Foto Principal */}
            <div style={{ backgroundColor: '#141414', borderRadius: '12px', padding: '30px', border: '1px solid #222', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '420px' }}>
              <img 
                src={`/${imagemPrincipal}`} 
                alt={produto.name} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: '0.3s' }} 
              />
            </div>
            
            {/* Miniaturas */}
            {produto.images && produto.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', overflowX: 'auto', paddingBottom: '5px' }}>
                {produto.images.map((img, index) => (
                  <div 
                    key={index}
                    onClick={() => setImagemPrincipal(img)}
                    style={{ 
                      width: '85px', height: '85px', backgroundColor: '#141414', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: '0.2s',
                      border: imagemPrincipal === img ? '2px solid #6a0dad' : '1px solid #222',
                      boxShadow: imagemPrincipal === img ? '0 0 8px rgba(106, 13, 173, 0.4)' : 'none'
                    }}
                  >
                    <img src={`/${img}`} alt={`Miniatura ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COLUNA DIREITA: INFORMAÇÕES DE COMPRA */}
          <div style={{ flex: '1', minWidth: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Categoria / Badge */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ color: '#777', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                Importada Tailandesa 1:1
              </span>
              {produto.badge && (
                <span style={{ backgroundColor: '#6a0dad', color: '#fff', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {produto.badge}
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 15px 0', lineHeight: '1.2', letterSpacing: '-0.5px' }}>
              {produto.name}
            </h1>
            
            {/* Tags estilizadas como pequenas cápsulas */}
            {produto.tags && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '25px', flexWrap: 'wrap' }}>
                {produto.tags.map((tag, index) => (
                  <span key={index} style={{ backgroundColor: '#141414', padding: '4px 12px', borderRadius: '15px', fontSize: '12px', color: '#aaa', border: '1px solid #222', fontWeight: '500' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Preço Premium */}
            <div style={{ backgroundColor: '#141414', padding: '20px', borderRadius: '8px', border: '1px solid #222', marginBottom: '30px' }}>
              <p style={{ color: '#2ecc71', fontWeight: '900', fontSize: '38px', margin: 0, display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>R$</span> 
                {Number(produto.price).toFixed(2).replace('.', ',')}
              </p>
              <p style={{ color: '#aaa', fontSize: '13px', margin: '5px 0 0 0' }}>Disponível para envio imediato • Até 3x sem juros</p>
            </div>

            <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '15px', marginBottom: '35px' }}>
              Manto de altíssima qualidade com tecido respirável tecnológico, acabamento de costura impecável e todos os selos oficiais. Perfeito para colecionadores e adeptos exigentes.
            </p>

            {/* Botão de Compra */}
            <button 
              onClick={() => {
                adicionarAoCarrinho(produto);
                navigate('/carrinho');
              }}
              style={{ 
                backgroundColor: '#2ecc71', color: '#fff', border: 'none', padding: '16px', borderRadius: '6px', 
                fontWeight: 'bold', fontSize: '16px', width: '100%', cursor: 'pointer', textTransform: 'uppercase',
                letterSpacing: '1px', boxShadow: '0 4px 15px rgba(46, 204, 113, 0.2)', transition: 'background 0.3s' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2ecc71'}
            >
              Adicionar ao Carrinho 🛒
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}