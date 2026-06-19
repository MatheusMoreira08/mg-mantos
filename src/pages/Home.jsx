import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const { carrinho } = useContext(CarrinhoContext);

  // Lógica do Carrossel de Banners
  const banners = [
    '/img/front-page/banner1.webp', 
    '/img/front-page/banner2.webp', 
    '/img/front-page/banner3.webp', 
    '/img/front-page/banner4.webp'
  ];
  const [bannerAtual, setBannerAtual] = useState(0);

  // Efeito que troca o banner a cada 4 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setBannerAtual((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(intervalo); // Limpa o intervalo se sair da página
  }, []);

  // Efeito que carrega os produtos
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        setProdutos(data);
      } catch (erro) {
        console.error('Erro ao carregar produtos:', erro.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarProdutos();
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#050505', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ margin: 0, fontSize: '26px', color: '#fff', fontWeight: '900', letterSpacing: '1px' }}>
            MG <span style={{ color: '#6a0dad' }}>MANTOS</span>
          </h1>
        </Link>

        <div style={{ flex: '1', maxWidth: '500px', margin: '0 20px' }}>
          <div style={{ display: 'flex', backgroundColor: '#141414', borderRadius: '25px', padding: '10px 20px', border: '1px solid #222' }}>
            <input 
              type="text" 
              placeholder="Buscar camisas..." 
              style={{ border: 'none', backgroundColor: 'transparent', color: '#fff', width: '100%', outline: 'none', fontSize: '15px' }} 
            />
            <span style={{ cursor: 'pointer', color: '#888' }}>🔍</span>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link to="/minha-conta" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', transition: 'color 0.3s' }}>MINHA CONTA</Link>
          
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

      {/* CARROSSEL DE BANNERS DINÂMICO */}
      <section style={{ width: '100%', maxHeight: '450px', overflow: 'hidden', backgroundColor: '#111', position: 'relative' }}>
        <img 
          src={banners[bannerAtual]} 
          alt={`Banner ${bannerAtual + 1}`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '300px', transition: 'opacity 0.5s ease-in-out' }}
        />
        
        {/* Bolinhas indicadoras do carrossel */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
          {banners.map((_, index) => (
            <div 
              key={index}
              onClick={() => setBannerAtual(index)}
              style={{ 
                width: '12px', height: '12px', borderRadius: '50%', cursor: 'pointer', transition: '0.3s',
                backgroundColor: index === bannerAtual ? '#6a0dad' : 'rgba(255, 255, 255, 0.5)',
                boxShadow: index === bannerAtual ? '0 0 10px #6a0dad' : 'none'
              }}
            />
          ))}
        </div>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <main style={{ padding: '50px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #222', paddingBottom: '15px', marginBottom: '40px' }}>
          <h2 style={{ margin: 0, fontSize: '28px', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '1px' }}>
            OS MAIS VENDIDOS
          </h2>
          <Link to="/" style={{ color: '#6a0dad', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>VER TODOS</Link>
        </div>

        {carregando ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h3 style={{ color: '#aaa' }}>Carregando os melhores mantos...</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '30px' }}>
            {produtos.map((produto) => (
              <div key={produto.id} style={{ backgroundColor: '#141414', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222', position: 'relative', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                
                {produto.badge && (
                  <span style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: '#6a0dad', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', zIndex: 10 }}>
                    {produto.badge}
                  </span>
                )}

                <div style={{ backgroundColor: '#0a0a0a', padding: '20px', height: '280px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={`/${produto.image}`} alt={produto.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                
                <div style={{ padding: '20px' }}>
                  <p style={{ color: '#777', fontSize: '12px', margin: '0 0 5px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>Importada Tailandesa 1:1</p>
                  <h3 style={{ fontSize: '16px', margin: '0 0 15px 0', minHeight: '44px', lineHeight: '1.4', fontWeight: '600' }}>
                    {produto.name}
                  </h3>
                  
                  <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', margin: '0 0 5px 0' }}>
                    R$ {Number(produto.price).toFixed(2).replace('.', ',')}
                  </p>
                  <p style={{ color: '#aaa', fontSize: '12px', margin: '0 0 20px 0' }}>em até 3x sem juros</p>
                  
                  <Link 
                    to={`/produto/${produto.id}`}
                    style={{ display: 'block', backgroundColor: '#fff', color: '#000', textDecoration: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', fontSize: '14px', transition: 'background 0.3s' }}
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#050505', padding: '40px', textAlign: 'center', borderTop: '1px solid #1a1a1a', marginTop: '40px' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#fff' }}>MG <span style={{ color: '#6a0dad' }}>MANTOS</span></h2>
        <p style={{ color: '#666', fontSize: '14px' }}>A Casa do Torcedor. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}