// --- 1. BANCO DE DADOS DE PRODUTOS (FORMATO COMPACTO & COMPLETO) ---
const products = [
  // --- CAMISAS 25/26 (LANÇAMENTOS FUTUROS - JOGADOR) ---
  { id: 20, name: "Camisa Barcelona Home I 25/26 – Manga Longa", price: "R$ 169,90", image: "img/produtos/25-26/torcedor/barcelona/manga-longa/principal.jpeg", images: ["img/produtos/25-26/torcedor/barcelona/manga-longa/principal.jpeg", "img/produtos/25-26/torcedor/barcelona/manga-longa/detalhes.jpeg", "img/produtos/25-26/torcedor/barcelona/manga-longa/costas.jpeg"], tags: ["lancamento", "destaque", "europeus"], badge: "Novo", link: "produto.html" },
  // MILAN (CORRIGIDO: Agora está como Europeu)
  { id: 21, name: "Camisa Milan Home 25/26 - Jogador (Puma)", price: "R$ 149,90", image: "img/produtos/25-26/jogador/milan/principal.jpg", images: ["img/produtos/25-26/jogador/milan/principal.jpg", "img/produtos/25-26/jogador/milan/costas.jpg", "img/produtos/25-26/jogador/milan/detalhe.jpg"], tags: ["lancamento", "europeus"], badge: "Jogador", link: "produto.html" },

  // NOVOS 25/26 JOGADOR
  { id: 120, name: "Camisa Aston Villa Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/ASTON VILLA/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/ASTON VILLA/principal-HOME.jpg", "img/produtos/25-26/jogador/ASTON VILLA/costas-HOME.jpg", "img/produtos/25-26/jogador/ASTON VILLA/detalhes-HOME.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 121, name: "Camisa Chelsea Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/CHELSEA/principal-AZUL.jpg", images: ["img/produtos/25-26/jogador/CHELSEA/principal-AZUL.jpg", "img/produtos/25-26/jogador/CHELSEA/costas-AZUL.jpg", "img/produtos/25-26/jogador/CHELSEA/detalhes-AZUL.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 122, name: "Camisa Inter de Milão Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/INTER DE MILAO/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/INTER DE MILAO/principal-HOME.jpg", "img/produtos/25-26/jogador/INTER DE MILAO/costas-HOME.jpg", "img/produtos/25-26/jogador/INTER DE MILAO/detalhes-HOME.jpg"], tags: ["lancamento", "europeus", "italiano"], badge: "Jogador", link: "produto.html" },
  { id: 123, name: "Camisa Juventus Away 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/JUVENTUS/principal-AWAY.jpg", images: ["img/produtos/25-26/jogador/JUVENTUS/principal-AWAY.jpg", "img/produtos/25-26/jogador/JUVENTUS/costas-AWAY.jpg", "img/produtos/25-26/jogador/JUVENTUS/detalhes-AWAY.jpg"], tags: ["lancamento", "europeus", "italiano"], badge: "Jogador", link: "produto.html" },
  { id: 124, name: "Camisa Liverpool Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/LIVERPOOL/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/LIVERPOOL/principal-HOME.jpg", "img/produtos/25-26/jogador/LIVERPOOL/costas-HOME.jpg", "img/produtos/25-26/jogador/LIVERPOOL/detalhes-HOME.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 125, name: "Camisa Man City Edição Especial 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/MAN. CITY/principal-ESPECIAL.jpg", images: ["img/produtos/25-26/jogador/MAN. CITY/principal-ESPECIAL.jpg", "img/produtos/25-26/jogador/MAN. CITY/costas-ESPECIAL.jpg", "img/produtos/25-26/jogador/MAN. CITY/detalhes-ESPECIAL.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 126, name: "Camisa Real Madrid Away 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES1.jpg", images: ["img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES1.jpg", "img/produtos/25-26/jogador/REAL MADRID/costas-VERSÕES1.jpg", "img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES1.jpg"], tags: ["lancamento", "europeus", "espanhol"], badge: "Jogador", link: "produto.html" },
  { id: 127, name: "Camisa Real Madrid Dragon 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES3.jpg", images: ["img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES3.jpg", "img/produtos/25-26/jogador/REAL MADRID/costas-VERSÕES3.jpg", "img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES3.jpg"], tags: ["lancamento", "europeus", "espanhol"], badge: "Exclusivo", link: "produto.html" },
  { id: 128, name: "Camisa São Paulo Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/SÃO PAULO/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/SÃO PAULO/principal-HOME.jpg", "img/produtos/25-26/jogador/SÃO PAULO/costas-HOME.jpg", "img/produtos/25-26/jogador/SÃO PAULO/detalhes-HOME.jpg"], tags: ["lancamento", "nacional", "brasileirao"], badge: "Jogador", link: "produto.html" },
  { id: 129, name: "Camisa Tottenham Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/TOTTENHAM/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/TOTTENHAM/principal-HOME.jpg", "img/produtos/25-26/jogador/TOTTENHAM/costas-HOME.jpg", "img/produtos/25-26/jogador/TOTTENHAM/detalhes-HOME.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 130, name: "Camisa Tottenham Away 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/TOTTENHAM/principal-PRETA.jpg", images: ["img/produtos/25-26/jogador/TOTTENHAM/principal-PRETA.jpg", "img/produtos/25-26/jogador/TOTTENHAM/costas-PRETA.jpg", "img/produtos/25-26/jogador/TOTTENHAM/detalhes-PRETA.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },

  // --- TEMPORADA 24/25 (TORCEDOR) ---
  // GRUPO A
  { id: 30, name: "Camisa Al-Hilal Home 24/25 - Puma", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/AL-HILAL/principal.jpg", images: ["img/produtos/24-25/torcedor/AL-HILAL/principal.jpg", "img/produtos/24-25/torcedor/AL-HILAL/costas.jpg", "img/produtos/24-25/torcedor/AL-HILAL/detalhes.jpg"], tags: ["internacional", "saudita"], badge: "Neymar", link: "produto.html" },
  { id: 31, name: "Camisa Arsenal Home 24/25 - Adidas", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ARSENAL/principal.jpg", images: ["img/produtos/24-25/torcedor/ARSENAL/principal.jpg", "img/produtos/24-25/torcedor/ARSENAL/costas.jpg", "img/produtos/24-25/torcedor/ARSENAL/detalhes.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 32, name: "Camisa Atalanta Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATALANTA/principal.jpeg", images: ["img/produtos/24-25/torcedor/ATALANTA/principal.jpeg", "img/produtos/24-25/torcedor/ATALANTA/detalhes.jpeg", "img/produtos/24-25/torcedor/ATALANTA/detalhes2.jpeg"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 33, name: "Camisa Atlético de Madrid Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/principal.jpg", images: ["img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/principal.jpg", "img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/detalhes.jpg", "img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/detalhes2.jpg"], tags: ["europeus", "espanhol"], link: "produto.html" },

  // GRUPO B
  { id: 40, name: "Camisa Barcelona Edição Especial 304", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BARCELONA/principal-EDICAO O ESPECIAL .jpg", images: ["img/produtos/24-25/torcedor/BARCELONA/principal-EDICAO O ESPECIAL .jpg", "img/produtos/24-25/torcedor/BARCELONA/costas-EDICAO ESPECIAL.jpg", "img/produtos/24-25/torcedor/BARCELONA/detalhes-EDICAO ESPECIAL .jpg"], tags: ["europeus", "destaque"], badge: "Exclusivo", link: "produto.html" },
  { id: 41, name: "Camisa Barcelona Away Preta Spotify", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BARCELONA/principal-SPOTIFY Y PRETA -.jpg", images: ["img/produtos/24-25/torcedor/BARCELONA/principal-SPOTIFY Y PRETA -.jpg", "img/produtos/24-25/torcedor/BARCELONA/costas-SPOTIFY PRETA .jpg", "img/produtos/24-25/torcedor/BARCELONA/detalhes-SPOTIFY PRETA .jpg"], tags: ["europeus", "lancamento"], link: "produto.html" },
  { id: 42, name: "Camisa Bayer Leverkusen Away Branca", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/princial-BRANCa.jpg", images: ["img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/princial-BRANCa.jpg", "img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/costas-BRANCA.jpg", "img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/detalhes-BRANCA.jpg"], tags: ["europeus", "alemao"], link: "produto.html" },
  { id: 43, name: "Camisa Betis Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BETIS/principal-HOME.jpg", images: ["img/produtos/24-25/torcedor/BETIS/principal-HOME.jpg", "img/produtos/24-25/torcedor/BETIS/detalhes-HOME.jpg", "img/produtos/24-25/torcedor/BETIS/detalhes2-HOME.jpg"], tags: ["europeus", "espanhol"], link: "produto.html" },
  { id: 44, name: "Camisa Boca Juniors Away Branca", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BOCA JUNIORS/principal-BRANCA.jpg", images: ["img/produtos/24-25/torcedor/BOCA JUNIORS/principal-BRANCA.jpg", "img/produtos/24-25/torcedor/BOCA JUNIORS/costas-BRANCA.jpg", "img/produtos/24-25/torcedor/BOCA JUNIORS/detalhes-BRANCA.jpg"], tags: ["internacional", "sulamericano"], link: "produto.html" },
  { id: 50, name: "Camisa Botafogo Home - Patch Libertadores", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BOTAFOGO/principal-HOME + PATCH LIBERTADORES.jpg", images: ["img/produtos/24-25/torcedor/BOTAFOGO/principal-HOME + PATCH LIBERTADORES.jpg", "img/produtos/24-25/torcedor/BOTAFOGO/costas-HOME + PATCH LIBERTADORES.jpg", "img/produtos/24-25/torcedor/BOTAFOGO/detalhes-HOME + PATCH LIBERTADORES.jpg"], tags: ["nacional", "brasileirao"], badge: "Libertadores", link: "produto.html" },
  { id: 51, name: "Camisa Botafogo Goleiro Roxa", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BOTAFOGO/principal-ROXA.jpg", images: ["img/produtos/24-25/torcedor/BOTAFOGO/principal-ROXA.jpg", "img/produtos/24-25/torcedor/BOTAFOGO/costas-ROXA.jpg", "img/produtos/24-25/torcedor/BOTAFOGO/detalhes-ROXA.jpg"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 52, name: "Camisa Brighton Away Amarela", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BRIGHTON/principal-AWAY.jpg", images: ["img/produtos/24-25/torcedor/BRIGHTON/principal-AWAY.jpg", "img/produtos/24-25/torcedor/BRIGHTON/costas-AWAY.jpg", "img/produtos/24-25/torcedor/BRIGHTON/detalhes-AWAY.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },

  // GRUPO C
  { id: 60, name: "Camisa Chelsea Away Branca 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CHEALSEA/principal-BRANCA.jpeg", images: ["img/produtos/24-25/torcedor/CHEALSEA/principal-BRANCA.jpeg", "img/produtos/24-25/torcedor/CHEALSEA/costas-BRANCA.jpeg", "img/produtos/24-25/torcedor/CHEALSEA/detalhes-BRANCA.jpeg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 61, name: "Camisa Chelsea Treino Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CHEALSEA/principal-PRETA.jpeg", images: ["img/produtos/24-25/torcedor/CHEALSEA/principal-PRETA.jpeg", "img/produtos/24-25/torcedor/CHEALSEA/costas-PRETA.jpeg", "img/produtos/24-25/torcedor/CHEALSEA/detalhes-PRETA.jpeg"], tags: ["europeus", "treino"], link: "produto.html" },
  { id: 65, name: "Camisa Colômbia Edição Especial", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/COLOMBIA/principal-EDICAO O ESPECIAL.jpg", images: ["img/produtos/24-25/torcedor/COLOMBIA/principal-EDICAO O ESPECIAL.jpg", "img/produtos/24-25/torcedor/COLOMBIA/costas-EDICAO ESPECIAL.jpg", "img/produtos/24-25/torcedor/COLOMBIA/detalhes-EDICAO ESPECIAL.jpg"], tags: ["selecoes", "destaque"], badge: "Centenário", link: "produto.html" },
  { id: 66, name: "Camisa Coreia do Sul Home Vermelha", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/COREA DO SUL/principal-VERMELHA.jpg", images: ["img/produtos/24-25/torcedor/COREA DO SUL/principal-VERMELHA.jpg", "img/produtos/24-25/torcedor/COREA DO SUL/costas-VERMELHA.jpg", "img/produtos/24-25/torcedor/COREA DO SUL/detalhes-VERMELHA.jpg"], tags: ["selecoes", "asiatico"], link: "produto.html" },
  { id: 67, name: "Camisa Coreia do Sul Away Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/COREA DO SUL/principal-PRETA.jpg", images: ["img/produtos/24-25/torcedor/COREA DO SUL/principal-PRETA.jpg", "img/produtos/24-25/torcedor/COREA DO SUL/costas-PRETA.jpg", "img/produtos/24-25/torcedor/COREA DO SUL/detalhes-PRETA.jpg"], tags: ["selecoes"], link: "produto.html" },
  { id: 70, name: "Camisa Corinthians Home Feminina 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CORINTHIANS/principal-HOME FEMININA.jpg", images: ["img/produtos/24-25/torcedor/CORINTHIANS/principal-HOME FEMININA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/costas-HOME FEMININA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-HOME FEMININA.jpg"], tags: ["nacional", "feminina"], badge: "Feminina", link: "produto.html" },
  { id: 71, name: "Camisa Corinthians III 24/25 - Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.jpg", images: ["img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-PRETA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes2-PRETA.jpg"], tags: ["nacional", "lancamento"], badge: "Antirracista", link: "produto.html" },
  { id: 75, name: "Camisa Cruzeiro Treino Azul", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CRUZEIRO/principal-TREINO.jpg", images: ["img/produtos/24-25/torcedor/CRUZEIRO/principal-TREINO.jpg", "img/produtos/24-25/torcedor/CRUZEIRO/costas-TREINO.jpg", "img/produtos/24-25/torcedor/CRUZEIRO/detalhes-TREINO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },

  // GRUPO F
  { id: 80, name: "Camisa Flamengo Goleiro Amarela 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principla-GOLEIRO.jpg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principla-GOLEIRO.jpg", "img/produtos/24-25/torcedor/FLAMENGO/costas-GOLEIRO.jpg", "img/produtos/24-25/torcedor/FLAMENGO/detalhesGOLEIRO.jpg"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 81, name: "Camisa Flamengo Identidade Marrom", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-IDENTIDADE MARROM.jpg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-IDENTIDADE MARROM.jpg", "img/produtos/24-25/torcedor/FLAMENGO/costas-IDENTIDADE MARROM.jpg", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-IDENTIDADE MARROM.jpg"], tags: ["nacional", "destaque"], badge: "Black", link: "produto.html" },
  { id: 82, name: "Camisa Flamengo Lifestyler Feminina", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER FEMININA.jpg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER FEMININA.jpg", "img/produtos/24-25/torcedor/FLAMENGO/costas-LIFESTYLER FEMININA.jpg", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-LIFESTYLER FEMININA.jpg"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 83, name: "Camisa Flamengo Lifestyler Masculina", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER.jpeg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER.jpeg", "img/produtos/24-25/torcedor/FLAMENGO/costas-LIFESTYLER.jpeg", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-LIFESTYLER.jpeg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 84, name: "Camisa Flamengo Treino Azul", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-TREINO.jpg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-TREINO.jpg", "img/produtos/24-25/torcedor/FLAMENGO/costas-TREINO.jpg", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-TREINO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 90, name: "Camisa Fortaleza Away 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FORTALEZA/principal-FORTALEZA AWAY.jpeg", images: ["img/produtos/24-25/torcedor/FORTALEZA/principal-FORTALEZA AWAY.jpeg", "img/produtos/24-25/torcedor/FORTALEZA/costas-FORTALEZA AWAY.jpeg", "img/produtos/24-25/torcedor/FORTALEZA/detalhes-FORTALEZA AWAY.jpeg"], tags: ["nacional", "brasileirao"], link: "produto.html" },

  // GRUPO J
  { id: 91, name: "Camisa Japão Away 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JAPÃO/principal-AWAY.jpg", images: ["img/produtos/24-25/torcedor/JAPÃO/principal-AWAY.jpg", "img/produtos/24-25/torcedor/JAPÃO/costas-AWAY.jpg", "img/produtos/24-25/torcedor/JAPÃO/detalhes-AWAY.jpg"], tags: ["selecoes", "asiatico"], link: "produto.html" },
  { id: 92, name: "Camisa Japão Treino Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JAPÃO/principal-PRETA.jpg", images: ["img/produtos/24-25/torcedor/JAPÃO/principal-PRETA.jpg", "img/produtos/24-25/torcedor/JAPÃO/costas-PRETA.jpg", "img/produtos/24-25/torcedor/JAPÃO/detalhes-PRETA.jpg"], tags: ["selecoes", "treino"], link: "produto.html" },
  { id: 93, name: "Camisa Juventus Lifestyle", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JUVENTUS/principal-LIFESTYLE.jpeg", images: ["img/produtos/24-25/torcedor/JUVENTUS/principal-LIFESTYLE.jpeg", "img/produtos/24-25/torcedor/JUVENTUS/costas-LIFESTYLE.jpeg", "img/produtos/24-25/torcedor/JUVENTUS/detalhes-LIFESTYLE.jpeg"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 94, name: "Camisa Juventus da Mooca Home", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/principal-HOME.jpeg", images: ["img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/principal-HOME.jpeg", "img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/costas-HOME.jpeg", "img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/detalhes-HOME.jpeg"], tags: ["nacional", "classico"], link: "produto.html" },

  // GRUPO L
  { id: 95, name: "Camisa Liverpool Pré-Jogo Vermelha", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/LIVERPOOL/principal-PRE JOGO VERMELHA.jpg", images: ["img/produtos/24-25/torcedor/LIVERPOOL/principal-PRE JOGO VERMELHA.jpg", "img/produtos/24-25/torcedor/LIVERPOOL/costas-PRE JOGO VERMELHA.jpg", "img/produtos/24-25/torcedor/LIVERPOOL/detalhes-PRE JOGO VERMELHA.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },

  // GRUPO M (MILAN CORRIGIDO: Tag 'europeus')
  { id: 96, name: "Camisa Milan 125 Anos Curta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/MILAN/principal-125 ANOS CURTA.jpg", images: ["img/produtos/24-25/torcedor/MILAN/principal-125 ANOS CURTA.jpg", "img/produtos/24-25/torcedor/MILAN/costas-125 ANOS CURTA.jpg", "img/produtos/24-25/torcedor/MILAN/detalhes-125 ANOS CURTA.jpg"], tags: ["europeus", "italiano"], badge: "Comemorativa", link: "produto.html" },
  { id: 97, name: "Camisa Milan Third 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/MILAN/principal-THIRD.jpg", images: ["img/produtos/24-25/torcedor/MILAN/principal-THIRD.jpg", "img/produtos/24-25/torcedor/MILAN/costas-THIRD.jpg", "img/produtos/24-25/torcedor/MILAN/detalhes-THIRD.jpg"], tags: ["europeus", "italiano"], link: "produto.html" },

  // GRUPO P
  { id: 98, name: "Camisa Paysandu Away", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/PAYSANDU/principal-AWAY.jpg", images: ["img/produtos/24-25/torcedor/PAYSANDU/principal-AWAY.jpg", "img/produtos/24-25/torcedor/PAYSANDU/costas-AWAY.jpg", "img/produtos/24-25/torcedor/PAYSANDU/detalhes-AWAY.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 99, name: "Camisa Peñarol Home", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/PEÑAROL/principal-HOME.jpg", images: ["img/produtos/24-25/torcedor/PEÑAROL/principal-HOME.jpg", "img/produtos/24-25/torcedor/PEÑAROL/costas-HOME.jpg", "img/produtos/24-25/torcedor/PEÑAROL/detalhes-HOME.jpg"], tags: ["internacional", "sulamericano"], link: "produto.html" },

  // GRUPO R
  { id: 100, name: "Camisa Roma Branca com Laranja", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ROMA/principal-BRANCA COM LARANJA.jpg", images: ["img/produtos/24-25/torcedor/ROMA/principal-BRANCA COM LARANJA.jpg", "img/produtos/24-25/torcedor/ROMA/costas-BRANCA COM LARANJA.jpg", "img/produtos/24-25/torcedor/ROMA/detalhes-BRANCA COM LARANJA.jpg"], tags: ["europeus", "italiano"], link: "produto.html" },

  // GRUPO S
  { id: 101, name: "Camisa Santos Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SANTOS/principal-HOME.jpg", images: ["img/produtos/24-25/torcedor/SANTOS/principal-HOME.jpg", "img/produtos/24-25/torcedor/SANTOS/costas-HOME.jpg", "img/produtos/24-25/torcedor/SANTOS/detalhes-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 102, name: "Camisa Santos Laranja (Goleiro/Treino)", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SANTOS/principal-LARANJA.jpg", images: ["img/produtos/24-25/torcedor/SANTOS/principal-LARANJA.jpg", "img/produtos/24-25/torcedor/SANTOS/costas-LARANJA.jpg", "img/produtos/24-25/torcedor/SANTOS/detalhes-LARANJA.jpg"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 103, name: "Camisa Santos Treino Azul", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SANTOS/principal-TREINO.jpg", images: ["img/produtos/24-25/torcedor/SANTOS/principal-TREINO.jpg", "img/produtos/24-25/torcedor/SANTOS/costas-TREINO.jpg", "img/produtos/24-25/torcedor/SANTOS/detalhes-TREINO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 104, name: "Camisa Sport Recife Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SPORT/principal-PRETA.jpeg", images: ["img/produtos/24-25/torcedor/SPORT/principal-PRETA.jpeg", "img/produtos/24-25/torcedor/SPORT/costas-PRETA.jpeg", "img/produtos/24-25/torcedor/SPORT/detalhes-PRETA.jpeg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 105, name: "Camisa Sport Recife Third Vermelha", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SPORT/principal-THIRD.jpg", images: ["img/produtos/24-25/torcedor/SPORT/principal-THIRD.jpg", "img/produtos/24-25/torcedor/SPORT/costas-THIRD.jpg", "img/produtos/24-25/torcedor/SPORT/detalhes-THIRD.jpg"], tags: ["nacional", "destaque"], link: "produto.html" },

  // GRUPO V
  { id: 106, name: "Camisa Vasco Third 24/25 - Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/VASCO/principal-THIRD PRETA.jpeg", images: ["img/produtos/24-25/torcedor/VASCO/principal-THIRD PRETA.jpeg", "img/produtos/24-25/torcedor/VASCO/costas-THIRD.jpg", "img/produtos/24-25/torcedor/VASCO/detalhes-THIRD PRETA.jpeg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 107, name: "Camisa Vasco Off-White Diagonais", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/VASCO/principal-THIRD.jpg", images: ["img/produtos/24-25/torcedor/VASCO/principal-THIRD.jpg", "img/produtos/24-25/torcedor/VASCO/costas-THIRD.jpg", "img/produtos/24-25/torcedor/VASCO/detalhes-THIRD.jpg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 108, name: "Camisa Vasco Pré-Jogo Branca", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/VASCO/principal-PRÉ JOGO.jpg", images: ["img/produtos/24-25/torcedor/VASCO/principal-PRÉ JOGO.jpg", "img/produtos/24-25/torcedor/VASCO/detalhes-PRÉ JOGO.jpg"], tags: ["nacional", "treino"], link: "produto.html" }
];

// --- 2. FUNÇÕES GLOBAIS DE INTERAÇÃO ---

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = document.body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar) { sidebar.classList.toggle('open'); }
  if (overlay) { overlay.classList.toggle('show'); }
}

function scrollCarousel(containerId, direction) {
  const container = document.getElementById(containerId);
  if (container) {
    const scrollAmount = 280 * direction;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

// Variáveis globais para galeria
let currentImageIndex = 0;
let currentProductImages = [];

function nextImage(direction) {
  if (currentProductImages.length > 0) {
    let newIndex = currentImageIndex + direction;
    if (newIndex >= currentProductImages.length) newIndex = 0;
    if (newIndex < 0) newIndex = currentProductImages.length - 1;
    jumpToImage(newIndex);
  }
}

function jumpToImage(index) {
  const mainImg = document.getElementById('currentImg');
  if (mainImg && currentProductImages.length > 0) {
    currentImageIndex = index;
    mainImg.src = currentProductImages[index];
    updateThumbnails();
  }
}

function updateThumbnails() {
  document.querySelectorAll('.thumbnails img').forEach((img, i) => {
    img.classList.remove('active');
    if (i === currentImageIndex) img.classList.add('active');
  });
}

// --- 3. LÓGICA DE INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {

  // A) Lógica da HOME
  if (document.getElementById('grid-lancamentos')) {
    function renderCarouselTrack(containerId, filterTag) {
      const container = document.getElementById(containerId);
      if (!container) return;
      const filtered = products.filter(p => p.tags.includes(filterTag));
      filtered.forEach(product => {
        const badgeHTML = product.badge ? `<span class="badge ${product.badge === 'Novo' ? 'new' : ''}">${product.badge}</span>` : '';
        const linkUrl = `produto.html?id=${product.id}`;
        const html = `
                    <a href="${linkUrl}" class="product-card" style="text-decoration: none;">
                        <div class="p-img">
                            ${badgeHTML}
                            <img src="${product.image}" onerror="this.src='https://via.placeholder.com/300?text=Foto+Indisponível'" alt="${product.name}">
                        </div>
                        <div class="p-info">
                            <div class="p-cat">Importada Tailandesa 1:1</div>
                            <div class="p-name">${product.name}</div>
                            <div class="p-price">${product.price}</div>
                            <div class="p-installments">em até 3x sem juros</div>
                        </div>
                    </a>`;
        container.innerHTML += html;
      });
    }
    renderCarouselTrack('grid-lancamentos', 'lancamento');
    renderCarouselTrack('grid-destaques', 'destaque');
    renderCarouselTrack('grid-feminina', 'feminina');
    renderCarouselTrack('grid-internacional', 'internacional');

    if (document.querySelector('.slider')) {
      let slideIndex = 0;
      showSlides();
      function showSlides() {
        let slides = document.getElementsByClassName("slide");
        for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 5000);
      }
      window.plusSlides = function (n) {
        let slides = document.getElementsByClassName("slide");
        slideIndex += n;
        if (slideIndex > slides.length) { slideIndex = 1 }
        if (slideIndex < 1) { slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
        slides[slideIndex - 1].style.display = "block";
      }
    }
  }

  // B) Lógica da PÁGINA DE PRODUTO
  if (window.location.pathname.includes("produto.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = products.find(p => p.id == productId);

    currentImageIndex = 0;
    currentProductImages = [];

    if (product) {
      const titleEl = document.getElementById('prod-title');
      if (titleEl) titleEl.innerText = product.name;
      const priceEl = document.getElementById('prod-price');
      if (priceEl) priceEl.innerText = product.price;
      const breadName = document.getElementById('bread-name');
      if (breadName) breadName.innerText = product.name.substring(0, 20) + "...";

      const mainImg = document.getElementById('currentImg');
      const thumbContainer = document.getElementById('thumb-container');

      if (product.images && product.images.length > 0) {
        currentProductImages = product.images;
      } else {
        currentProductImages = [product.image];
      }
      if (mainImg) mainImg.src = currentProductImages[0];

      if (thumbContainer) {
        thumbContainer.innerHTML = '';
        currentProductImages.forEach((imgSrc, index) => {
          const activeClass = index === 0 ? 'active' : '';
          thumbContainer.innerHTML += `<img src="${imgSrc}" onclick="jumpToImage(${index})" class="${activeClass}">`;
        });
      }
    } else {
      const container = document.querySelector('.product-container');
      if (container) container.innerHTML = '<h2>Produto não encontrado.</h2><a href="index.html">Voltar ao início</a>';
    }
  }

  // C) Lógica da PÁGINA DE CATEGORIA
  if (window.location.pathname.includes("categoria.html")) {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    const container = document.getElementById('grid-categoria');
    const title = document.getElementById('cat-title');
    const count = document.getElementById('cat-count');

    const titulos = { 'lancamento': 'Lançamentos 🔥', 'nacional': 'Brasileirão & Nacionais', 'europeus': 'Futebol Europeu', 'selecoes': 'Seleções Mundiais', 'retro': 'Relíquias Retrô', 'feminina': 'Futebol Feminino', 'internacional': 'Times Internacionais' };

    if (tag && container) {
      const filtered = products.filter(p => p.tags.includes(tag));
      if (title) title.innerText = titulos[tag] || "Produtos";
      if (count) count.innerText = `${filtered.length} produtos encontrados`;
      container.innerHTML = '';
      if (filtered.length > 0) {
        filtered.forEach(product => {
          const badgeHTML = product.badge ? `<span class="badge ${product.badge === 'Novo' ? 'new' : ''}">${product.badge}</span>` : '';
          const linkUrl = `produto.html?id=${product.id}`;
          const html = `
                        <a href="${linkUrl}" class="product-card" style="text-decoration: none;">
                            <div class="p-img">
                                ${badgeHTML}
                                <img src="${product.image}" onerror="this.src='https://via.placeholder.com/300?text=Foto+Indisponível'" alt="${product.name}">
                            </div>
                            <div class="p-info">
                                <div class="p-cat">Importada Tailandesa 1:1</div>
                                <div class="p-name">${product.name}</div>
                                <div class="p-price">${product.price}</div>
                                <div class="p-installments">em até 3x sem juros</div>
                            </div>
                        </a>`;
          container.innerHTML += html;
        });
      } else {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">Nenhum produto encontrado nesta categoria.</p>';
      }
    }
  }
});