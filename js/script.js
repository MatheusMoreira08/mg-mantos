const products = [
  // LANÇAMENTOS 25/26 e 26/27 (FUTURO/JOGADOR)
  { id: 701, name: "Camisa Brasil Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/BRASIL/principal-home.jpeg", images: ["img/produtos/26-27/torcedor/BRASIL/principal-home.jpeg", "img/produtos/26-27/torcedor/BRASIL/detalhes-home.jpeg", "img/produtos/26-27/torcedor/BRASIL/neymar.jpeg"], tags: ["selecoes", "lancamento", "destaque"], badge: "Futuro", link: "produto.html" },
  { id: 20, name: "Camisa Barcelona Home I 25/26 – Manga Longa", price: "R$ 169,90", image: "img/produtos/25-26/torcedor/BARCELONA/principal-MANGALONGA.jpeg", images: ["img/produtos/25-26/torcedor/BARCELONA/principal-MANGALONGA.jpeg", "img/produtos/25-26/torcedor/BARCELONA/detalhe-MANGALONGA.jpeg", "img/produtos/25-26/torcedor/BARCELONA/costas-MANGALONGA.jpeg"], tags: ["lancamento", "destaque", "europeus"], badge: "Novo", link: "produto.html" },
  { id: 21, name: "Camisa Milan Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/MILAN/principal.jpg", images: ["img/produtos/25-26/jogador/milan/principal.jpg", "img/produtos/25-26/jogador/milan/costas.jpg", "img/produtos/25-26/jogador/MILAN/detalhes.jpg"], tags: ["lancamento", "europeus"], badge: "Jogador", link: "produto.html" },
  { id: 120, name: "Camisa Aston Villa Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/ASTON VILLA/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/ASTON VILLA/principal-HOME.jpg", "img/produtos/25-26/jogador/ASTON VILLA/costas-HOME.jpg", "img/produtos/25-26/jogador/ASTON VILLA/detalhes-HOME.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 202, name: "Camisa Chelsea Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CHEALSEA/principal-AZUL.jpg", images: ["img/produtos/25-26/torcedor/CHEALSEA/principal-AZUL.jpg", "img/produtos/25-26/torcedor/CHEALSEA/costas-AZUL.jpg", "img/produtos/25-26/torcedor/CHEALSEA/detalhes-AZUL.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 122, name: "Camisa Inter de Milão Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/INTER DE MILAO/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/INTER DE MILAO/principal-HOME.jpg", "img/produtos/25-26/jogador/INTER DE MILAO/costas-HOME.jpg", "img/produtos/25-26/jogador/INTER DE MILAO/detalhes-HOME.jpg"], tags: ["lancamento", "europeus", "italiano"], badge: "Jogador", link: "produto.html" },
  { id: 123, name: "Camisa Juventus Away 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/JUVENTUS/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/JUVENTUS/principal-AWAY.jpg", "img/produtos/25-26/torcedor/JUVENTUS/costas-AWAY.jpg", "img/produtos/25-26/torcedor/JUVENTUS/detalhes-AWAY.jpg"], tags: ["lancamento", "europeus", "italiano"], link: "produto.html" },
  { id: 124, name: "Camisa Liverpool Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/LIVERPOOL/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/LIVERPOOL/principal-HOME.jpg", "img/produtos/25-26/jogador/LIVERPOOL/costas-HOME.jpg", "img/produtos/25-26/jogador/LIVERPOOL/detalhes-HOME.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 125, name: "Camisa Man City Edição Especial 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/MAN. CITY/principal-ESPECIAL.jpg", images: ["img/produtos/25-26/jogador/MAN. CITY/principal-ESPECIAL.jpg", "img/produtos/25-26/jogador/MAN. CITY/costas-ESPECIAL.jpg", "img/produtos/25-26/jogador/MAN. CITY/detalhes-ESPECIAL.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 219, name: "Camisa Man. United Especial 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/MAN. UNITED/principal-ESPECIAL + GOLA.jpg", images: ["img/produtos/25-26/torcedor/MAN. UNITED/principal-ESPECIAL + GOLA.jpg", "img/produtos/25-26/torcedor/MAN. UNITED/costas-ESPECIAL + GOLA.jpg ", "img/produtos/25-26/torcedor/MAN. UNITED/detalhes-ESPECIAL + GOLA.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 220, name: "Camisa Man. City Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/MAN. CITY/principal-AZUL.jpg", images: ["img/produtos/25-26/torcedor/MAN. CITY/principal-AZUL.jpg", "img/produtos/25-26/torcedor/MAN. CITY/costas-AZUL.jpg", "img/produtos/25-26/torcedor/MAN. CITY/detalhes-AZUL.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 226, name: "Camisa Real Madrid Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/REAL MADRID/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/REAL MADRID/principal-HOME.jpg", "img/produtos/25-26/torcedor/REAL MADRID/costas-HOME.jpg", "img/produtos/25-26/torcedor/REAL MADRID/detalhes-HOME.jpg"], tags: ["europeus", "espanhol"], link: "produto.html" },
  { id: 225, name: "Camisa Real Madrid Away 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/REAL MADRID/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/REAL MADRID/principal-AWAY.jpg", "img/produtos/25-26/torcedor/REAL MADRID/costas-AWAY.jpg", "img/produtos/25-26/torcedor/REAL MADRID/detalhes-AWAY.jpg"], tags: ["europeus", "espanhol"], link: "produto.html" },
  { id: 127, name: "Camisa Real Madrid Dragon 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES3.jpg", images: ["img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES3.jpg", "img/produtos/25-26/jogador/REAL MADRID/costas-VERSÕES3.jpg", "img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES3.jpg"], tags: ["lancamento", "europeus", "espanhol"], badge: "Exclusivo", link: "produto.html" },
  { id: 227, name: "Camisa Red Bull Salzburg Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/RED BULL SALZBURG/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/RED BULL SALZBURG/principal-HOME.jpg", "img/produtos/25-26/torcedor/RED BULL SALZBURG/costas-HOME.jpg", "img/produtos/25-26/torcedor/RED BULL SALZBURG/detalhes-HOME.jpg"], tags: ["europeus", "destaque"], link: "produto.html" },
  { id: 129, name: "Camisa Tottenham Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/TOTTENHAM/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/TOTTENHAM/principal-HOME.jpg", "img/produtos/25-26/jogador/TOTTENHAM/costas-HOME.jpg", "img/produtos/25-26/jogador/TOTTENHAM/detalhes-HOME.jpg"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 130, name: "Camisa Tottenham Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/TOTTENHAM/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/TOTTENHAM/principal-AWAY.jpg", "img/produtos/25-26/torcedor/TOTTENHAM/costas-AWAY.jpg", "img/produtos/25-26/torcedor/TOTTENHAM/detalhes-AWAY.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 702, name: "Camisa Argentina Home 26/27 - Jogador", price: "R$ 149,90", image: "img/produtos/26-27/jogador/ARGENTINA/principal-jogador.jpg", images: ["img/produtos/26-27/jogador/ARGENTINA/principal-jogador.jpg", "img/produtos/26-27/jogador/ARGENTINA/detalhes-jogador.jpg"], tags: ["selecoes", "lancamento"], badge: "Jogador", link: "produto.html" },
  { id: 703, name: "Camisa México Away 26/27 - Jogador", price: "R$ 149,90", image: "img/produtos/26-27/jogador/MEXICO/principal-away.jpg", images: ["img/produtos/26-27/jogador/MEXICO/principal-away.jpg", "img/produtos/26-27/jogador/MEXICO/costas-away.jpg"], tags: ["selecoes", "lancamento"], badge: "Jogador", link: "produto.html" },
  { id: 704, name: "Camisa Arábia Saudita Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/ARABIA SAUDITA/principal-home.jpg", images: ["img/produtos/26-27/torcedor/ARABIA SAUDITA/principal-home.jpg"], tags: ["selecoes", "lancamento"], link: "produto.html" },
  { id: 705, name: "Camisa Argentina Feminina 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/ARGENTINA/principal-feminina.jpg", images: ["img/produtos/26-27/torcedor/ARGENTINA/principal-feminina.jpg"], tags: ["selecoes", "feminina"], link: "produto.html" },
  { id: 706, name: "Camisa Atlético Mineiro Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/ATLETICO MINEIRO/principal-home.jpg", images: ["img/produtos/26-27/torcedor/ATLETICO MINEIRO/principal-home.jpg", "img/produtos/26-27/torcedor/ATLETICO MINEIRO/detalhes-home.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 707, name: "Camisa Brasil Away 26/27 - Jogador", price: "R$ 149,90", image: "img/produtos/26-27/jogador/BRASIL/principal-jogador2.jpg", images: ["img/produtos/26-27/jogador/BRASIL/principal-jogador2.jpg", "img/produtos/26-27/jogador/BRASIL/detalhes-jogador2.jpg"], tags: ["selecoes", "destaque"], badge: "Jogador", link: "produto.html" },
  { id: 708, name: "Camisa Brasil Away 26/27 - Torcedor", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/BRASIL/principal-away.jpg", images: ["img/produtos/26-27/torcedor/BRASIL/principal-away.jpg", "img/produtos/26-27/torcedor/BRASIL/costas-away.jpg"], tags: ["selecoes"], link: "produto.html" },
  { id: 709, name: "Camisa Canadá Home 26/27 - Jogador", price: "R$ 149,90", image: "img/produtos/26-27/jogador/CANADA/principal-jogador.jpg", images: ["img/produtos/26-27/jogador/CANADA/principal-jogador.jpg", "img/produtos/26-27/jogador/CANADA/detalhes-jogador.jpg"], tags: ["selecoes"], badge: "Jogador", link: "produto.html" },
  { id: 710, name: "Camisa Catar Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CATAR/principal-home.jpg", images: ["img/produtos/26-27/torcedor/CATAR/principal-home.jpg", "img/produtos/26-27/torcedor/CATAR/costas-home.jpg"], tags: ["selecoes"], link: "produto.html" },
  { id: 711, name: "Camisa Colômbia Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/COLOMBIA/principal-away.jpg", images: ["img/produtos/26-27/torcedor/COLOMBIA/principal-away.jpg", "img/produtos/26-27/torcedor/COLOMBIA/costas-away.jpg"], tags: ["selecoes"], link: "produto.html" },
  { id: 712, name: "Camisa Costa Rica Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/COSTA RICA/principal-home.jpg", images: ["img/produtos/26-27/torcedor/COSTA RICA/principal-home.jpg", "img/produtos/26-27/torcedor/COSTA RICA/costas-home.jpg"], tags: ["selecoes"], link: "produto.html" },
  { id: 713, name: "Camisa Croácia Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CROACIA/principal-home.jpg", images: ["img/produtos/26-27/torcedor/CROACIA/principal-home.jpg", "img/produtos/26-27/torcedor/CROACIA/costas-home.jpg"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 714, name: "Camisa Croácia Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CROACIA/principal-away.jpg", images: ["img/produtos/26-27/torcedor/CROACIA/principal-away.jpg", "img/produtos/26-27/torcedor/CROACIA/costas-away.jpg"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 715, name: "Camisa Cruzeiro Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CRUZEIRO/principal-home.jpg", images: ["img/produtos/26-27/torcedor/CRUZEIRO/principal-home.jpg", "img/produtos/26-27/torcedor/CRUZEIRO/detalhes-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 716, name: "Camisa Cruzeiro Polo 26/27", price: "R$ 139,90", image: "img/produtos/26-27/torcedor/CRUZEIRO/principal-polo.jpg", images: ["img/produtos/26-27/torcedor/CRUZEIRO/principal-polo.jpg", "img/produtos/26-27/torcedor/CRUZEIRO/detalhes-polo.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 717, name: "Camisa Espanha Goleiro 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/ESPANHA/principal-goleiro.jpg", images: ["img/produtos/26-27/torcedor/ESPANHA/principal-goleiro.jpg", "img/produtos/26-27/torcedor/ESPANHA/detalhes-goleiro.jpg"], tags: ["selecoes", "goleiro"], link: "produto.html" },
  { id: 718, name: "Camisa Flamengo Home 26/27 - Jogador", price: "R$ 149,90", image: "img/produtos/26-27/jogador/FLAMENGO/principal-jogador.jpg", images: ["img/produtos/26-27/jogador/FLAMENGO/principal-jogador.jpg", "img/produtos/26-27/torcedor/FLAMENGO/detalhes-home.jpg"], tags: ["nacional", "brasileirao"], badge: "Jogador", link: "produto.html" },
  { id: 719, name: "Camisa Flamengo Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLAMENGO/principal-away.jpg", images: ["img/produtos/26-27/torcedor/FLAMENGO/principal-away.jpg", "img/produtos/26-27/torcedor/FLAMENGO/detalhes-AWAY2.jpg"], tags: ["nacional"], link: "produto.html" },
  { id: 720, name: "Camisa Fluminense Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLUMINENSE/principal-home.jpg", images: ["img/produtos/26-27/torcedor/FLUMINENSE/principal-home.jpg", "img/produtos/26-27/torcedor/FLUMINENSE/costas-home.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 721, name: "Camisa Irlanda Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/IRLANDA/principal-home.jpg", images: ["img/produtos/26-27/torcedor/IRLANDA/principal-home.jpg", "img/produtos/26-27/torcedor/IRLANDA/detalhes-home.jpg"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 722, name: "Camisa Palmeiras Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PALMEIRAS/principal-HOME.jpg", images: ["img/produtos/26-27/torcedor/PALMEIRAS/principal-HOME.jpg", "img/produtos/26-27/torcedor/PALMEIRAS/costas-home.jpg", "img/produtos/26-27/torcedor/PALMEIRAS/detalhes-home.jpg"], tags: ["nacional", "brasileirao", "lancamento"], link: "produto.html" },
  { id: 723, name: "Camisa Palmeiras Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PALMEIRAS/principal-AWAY.jpg", images: ["img/produtos/26-27/torcedor/PALMEIRAS/principal-AWAY.jpg", "img/produtos/26-27/torcedor/PALMEIRAS/costas-away.jpg", "img/produtos/26-27/torcedor/PALMEIRAS/detalhes-away.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 724, name: "Camisa Peru Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PERU/principal-home.jpg", images: ["img/produtos/26-27/torcedor/PERU/principal-home.jpg", "img/produtos/26-27/torcedor/PERU/costas-home.jpg", "img/produtos/26-27/torcedor/PERU/detalhes-home.jpg"], tags: ["selecoes", "sulamericano"], link: "produto.html" },
  { id: 725, name: "Camisa Portugal Away 26/27 - Jogador", price: "R$ 149,90", image: "img/produtos/26-27/jogador/PORTUGAL/principal-jogador.jpg", images: ["img/produtos/26-27/jogador/PORTUGAL/principal-jogador.jpg", "img/produtos/26-27/jogador/PORTUGAL/detalhes-jogador.jpg"], tags: ["selecoes", "europeus"], badge: "Jogador", link: "produto.html" },
  { id: 726, name: "Camisa Portugal Away 26/27 - Torcedor", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PORTUGAL/principal-away.jpg", images: ["img/produtos/26-27/torcedor/PORTUGAL/principal-away.jpg", "img/produtos/26-27/torcedor/PORTUGAL/costas-away.jpg", "img/produtos/26-27/torcedor/PORTUGAL/detalhes-away.jpg"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 727, name: "Camisa Real Madrid Especial 26/27", price: "R$ 139,90", image: "img/produtos/26-27/torcedor/REAL MADRID/principal-especial.jpg", images: ["img/produtos/26-27/torcedor/REAL MADRID/principal-especial.jpg", "img/produtos/26-27/torcedor/REAL MADRID/costas-especial.jpg", "img/produtos/26-27/torcedor/REAL MADRID/detalhes-especial.jpg"], tags: ["europeus", "espanhol", "destaque"], badge: "Novo", link: "produto.html" },
  { id: 728, name: "Camisa Ucrânia Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/UCRANIA/principal-home.jpg", images: ["img/produtos/26-27/torcedor/UCRANIA/principal-home.jpg", "img/produtos/26-27/torcedor/UCRANIA/costas-home.jpg"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 729, name: "Camisa Uruguai Home 26/27 - Jogador", price: "R$ 149,90", image: "img/produtos/26-27/jogador/URUGUAI/principal-jogador.jpg", images: ["img/produtos/26-27/jogador/URUGUAI/principal-jogador.jpg", "img/produtos/26-27/jogador/URUGUAI/costas-jogador.jpg"], tags: ["selecoes", "sulamericano"], badge: "Jogador", link: "produto.html" },
  { id: 730, name: "Camisa Vasco Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/VASCO/principal-home.jpg", images: ["img/produtos/26-27/torcedor/VASCO/principal-home.jpg", "img/produtos/26-27/torcedor/VASCO/costas-home.jpg", "img/produtos/26-27/torcedor/VASCO/detalhes-home.jpg"], tags: ["nacional", "brasileirao", "destaque"], link: "produto.html" },
  { id: 731, name: "Camisa Man. United Especial 26/27", price: "R$ 149,90", image: "img/produtos/26-27/torcedor/MAN. UNITED/principal-especial.jpg", images: ["img/produtos/26-27/torcedor/MAN. UNITED/principal-especial.jpg", "img/produtos/26-27/torcedor/MAN. UNITED/costas-especial.jpg", "img/produtos/26-27/torcedor/MAN. UNITED/detalhes-especial.png"], tags: ["europeus", "ingles"], badge: "Exclusivo", link: "produto.html" },
  // TIMES NACIONAIS (25/26 e 26/27)
  { id: 410, name: "Camisa Athletico Paranaense Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO PARANAENSE/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/ATLETICO PARANAENSE/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 400, name: "Camisa Atlético Mineiro Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 401, name: "Camisa Atlético Mineiro Away Branca", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-AWAY.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 402, name: "Camisa Atlético Mineiro Third Preta", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-PRETA.JPG", images: ["img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-PRETA.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 403, name: "Camisa Atlético Mineiro Treino", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-TREINO-PATROCINIO.png", images: ["img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-TREINO-PATROCINIO.png"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 500, name: "Camisa Bahia Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/BAHIA/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/BAHIA/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], badge: "Jogador", link: "produto.html" },
  { id: 501, name: "Camisa Bahia Away 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/BAHIA/principal-AWAY.jpg", images: ["img/produtos/25-26/jogador/BAHIA/principal-AWAY.jpg"], tags: ["nacional", "brasileirao"], badge: "Jogador", link: "produto.html" },
  { id: 502, name: "Camisa Bahia Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BAHIA/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/BAHIA/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 503, name: "Camisa Bahia Away 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BAHIA/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/BAHIA/principal-AWAY.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 504, name: "Camisa Bahia Super Man", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BAHIA/principal-SUPERMAN.JPG", images: ["img/produtos/25-26/torcedor/BAHIA/principal-SUPERMAN.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 510, name: "Camisa Botafogo Home 25/26 - Jogador", price: "R$ 149,90", image: "img/produtos/25-26/jogador/BOTAFOGO/principal-HOME.jpg", images: ["img/produtos/25-26/jogador/BOTAFOGO/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], badge: "Jogador", link: "produto.html" },
  { id: 511, name: "Camisa Botafogo Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR2.jpg", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR2.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 512, name: "Camisa Botafogo Away Branca 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR6.JPG", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR6.JPG"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Roxa 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR7.JPG", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR7.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Amarela 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR1.JPG", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR1.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Azul 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR3.JPG", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR3.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Preta II 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR4.JPG", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR4.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Roxa Clara 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR8.JPG", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR8.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Branca 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR9.JPG", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR9.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Preta 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR5.JPG", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR5.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 520, name: "Camisa Bragantino Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BRAGANTINO/principal-HOME.JPG", images: ["img/produtos/25-26/torcedor/BRAGANTINO/principal-HOME.JPG"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 521, name: "Camisa Bragantino Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BRAGANTINO/principal-AWAY.JPG", images: ["img/produtos/25-26/torcedor/BRAGANTINO/principal-AWAY.JPG"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 200, name: "Camisa Ceará Third 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CEARA/principal-THIRD.jpg", images: ["img/produtos/25-26/torcedor/CEARA/principal-THIRD.jpg", "img/produtos/25-26/torcedor/CEARA/costas-THIRD.jpg", "img/produtos/25-26/torcedor/CEARA/detalhes-THIRD.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 201, name: "Camisa Ceará Torcida Organizada", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CEARA/principal-TORCIDA ORGANIZADA.jpg", images: ["img/produtos/25-26/torcedor/CEARA/principal-TORCIDA ORGANIZADA.jpg", "img/produtos/25-26/torcedor/CEARA/costas-TORCIDA ORGANIZADA.jpg", "img/produtos/25-26/torcedor/CEARA/detalhes-TORCIDA ORGANIZADA.jpg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 205, name: "Camisa Corinthians Especial Blackout", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.jpg", images: ["img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes2-PRETA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-PRETA.jpg"], tags: ["nacional", "destaque"], badge: "Black", link: "produto.html" },
  { id: 206, name: "Camisa Corinthians Especial 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-ESPECIAL.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-ESPECIAL.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-ESPECIAL.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-ESPECIAL.jpg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 207, name: "Camisa Corinthians Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-HOME.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-HOME.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 208, name: "Camisa Corinthians Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-SEGUNDA CAMISA.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-SEGUNDA CAMISA.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-SEGUNDA CAMISA.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-SEGUNDA CAMISA.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 209, name: "Camisa Corinthians Treino Roxa 25/26", price: "R$ 119,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO ROXA.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO ROXA.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-TREINO ROXA.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-TREINO ROXA.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 210, name: "Camisa Corinthians Treino 25/26", price: "R$ 119,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-TREINO.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-TREINO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 630, name: "Camisa Cruzeiro Third 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-3-.JPG", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-3-.JPG"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 631, name: "Camisa Cruzeiro Away Branca 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-AWAY.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 632, name: "Camisa Cruzeiro Third 25/26 (Com Patrocínio)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-3-PATROCINIO-.PNG", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-3-PATROCINIO-.PNG"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 633, name: "Camisa Cruzeiro Away 25/26 (Com Patrocínio)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-AWAY-PATROCINIO.PNG", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-AWAY-PATROCINIO.PNG"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 634, name: "Camisa Cruzeiro Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-HOME.png", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-HOME.png"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 635, name: "Camisa Cruzeiro Home 25/26 (Com Patrocínio)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-HOME-PATROCINIO.PNG", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-HOME-PATROCINIO.PNG"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 636, name: "Camisa Cruzeiro Especial Cinza 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-CINZA.JPG", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-CINZA.JPG"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 637, name: "Camisa Cruzeiro Treino Verde Raposa", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-RAPOSA.jpg", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-RAPOSA.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 638, name: "Camisa Cruzeiro Treino Menta Raposa", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-RAPOSA2.jpg", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-RAPOSA2.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 530, name: "Camisa Cruzeiro Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CRUZEIRO/principal-HOME.jpg", images: ["img/produtos/26-27/torcedor/CRUZEIRO/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  { id: 210, name: "Camisa Flamengo Especial Geométrica", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-ESPECIAL.jpg", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-ESPECIAL.jpg", "img/produtos/25-26/torcedor/FLAMENGO/costas-ESPECIAL.jpg", "img/produtos/25-26/torcedor/FLAMENGO/detalhes-ESPECIAL.jpg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 211, name: "Camisa Flamengo Goleiro 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-GOLEIRO.jpg", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-GOLEIRO.jpg", "img/produtos/25-26/torcedor/FLAMENGO/costas-GOLEIRO.jpg", "img/produtos/25-26/torcedor/FLAMENGO/detalhes1-GOLEIRO.jpg"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 212, name: "Camisa Flamengo Home 25/26 (Com Patrocínio)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-HOME + PATROCINIO.jpg", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-HOME + PATROCINIO.jpg", "img/produtos/25-26/torcedor/FLAMENGO/costas-HOME + PATROCINIO.jpg", "img/produtos/25-26/torcedor/FLAMENGO/detalhes-HOME + PATROCINIO.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 213, name: "Camisa Flamengo Home 25/26 (Limpa)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-HOME.jpg", "img/produtos/25-26/torcedor/FLAMENGO/costas-HOME.jpg", "img/produtos/25-26/torcedor/FLAMENGO/detalhes2-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 214, name: "Camisa Flamengo Treino Azul Claro", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-TREINO1.jpg", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-TREINO1.jpg", "img/produtos/25-26/torcedor/FLAMENGO/costas-TREINO1.jpg", "img/produtos/25-26/torcedor/FLAMENGO/detalhes-TREINO1.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 215, name: "Camisa Flamengo Treino Azul Escuro", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-TREINO.jpg", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-TREINO.jpg", "img/produtos/25-26/torcedor/FLAMENGO/costas-TREINO.jpg", "img/produtos/25-26/torcedor/FLAMENGO/detalhes-TREINO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 640, name: "Camisa Flamengo Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLAMENGO/principal-HOME.JPG", images: ["img/produtos/26-27/torcedor/FLAMENGO/principal-HOME.JPG"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  //{ id: 641, name: "Camisa Flamengo Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLAMENGO/principal-AWAY.jpg", images: ["img/produtos/26-27/torcedor/FLAMENGO/principal-AWAY.jpg"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  { id: 642, name: "Camisa Flamengo Away II 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLAMENGO/principal-AWAY2.jpg", images: ["img/produtos/26-27/torcedor/FLAMENGO/principal-AWAY2.jpg"], tags: ["nacional", "destaque"], badge: "Futuro", link: "produto.html" },
  { id: 650, name: "Camisa Fluminense Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLUMINENSE/principal-HOME.png", images: ["img/produtos/25-26/torcedor/FLUMINENSE/principal-HOME.png"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 651, name: "Camisa Fluminense Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/jogador/FLUMINENSE/principal-AWAY.JPG", images: ["img/produtos/25-26/jogador/FLUMINENSE/principal-AWAY.JPG"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 652, name: "Camisa Fluminense Feminina", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLUMINENSE/principal-FEMININA.png", images: ["img/produtos/25-26/torcedor/FLUMINENSE/principal-FEMININA.png"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 216, name: "Camisa Fortaleza Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FORTALEZA/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/FORTALEZA/principal-AWAY.jpg", "img/produtos/25-26/torcedor/FORTALEZA/costas-AWAY.jpg", "img/produtos/25-26/torcedor/FORTALEZA/detalhes-AWAY.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 660, name: "Camisa Grêmio Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/GREMIO/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/GREMIO/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 661, name: "Camisa Grêmio Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/GREMIO/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/GREMIO/principal-AWAY.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 232, name: "Camisa Internacional Casual 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/INTERNACIONAL/principal-CASUAL.jpg", images: ["img/produtos/25-26/torcedor/INTERNACIONAL/principal-CASUAL.jpg", "img/produtos/25-26/torcedor/INTERNACIONAL/costas-CASUAL.jpg", "img/produtos/25-26/torcedor/INTERNACIONAL/detalhes-CASUAL.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 233, name: "Camisa Internacional Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/INTERNACIONAL/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/INTERNACIONAL/principal-HOME.jpg", "img/produtos/25-26/torcedor/INTERNACIONAL/costas-HOME.jpg", "img/produtos/25-26/torcedor/INTERNACIONAL/detalhes-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 234, name: "Camisa Internacional Polo 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/INTERNACIONAL/principal-POLO.jpg", images: ["img/produtos/25-26/torcedor/INTERNACIONAL/principal-POLO.jpg", "img/produtos/25-26/torcedor/INTERNACIONAL/costas-POLO.jpg", "img/produtos/25-26/torcedor/INTERNACIONAL/detalhes-POLO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 235, name: "Camisa Internacional Treino Cinza 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/INTERNACIONAL/principal-BRANCA.jpg", images: ["img/produtos/25-26/torcedor/INTERNACIONAL/principal-BRANCA.jpg", "img/produtos/25-26/torcedor/INTERNACIONAL/costas-BRANCA.jpg", "img/produtos/25-26/torcedor/INTERNACIONAL/detalhes-BRANCA.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 221, name: "Camisa Palmeiras Branca Total 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/PALMEIRAS/principal-BRANCA TOTAL.jpg", images: ["img/produtos/25-26/torcedor/PALMEIRAS/principal-BRANCA TOTAL.jpg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 222, name: "Camisa Palmeiras Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/PALMEIRAS/principal-BRANCA.jpg", images: ["img/produtos/25-26/torcedor/PALMEIRAS/principal-BRANCA.jpg", "img/produtos/25-26/torcedor/PALMEIRAS/costas-BRANCA.jpg", "img/produtos/25-26/torcedor/PALMEIRAS/detalhes-BRANCA.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 223, name: "Camisa Palmeiras Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/PALMEIRAS/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/PALMEIRAS/principal-HOME.jpg", "img/produtos/25-26/torcedor/PALMEIRAS/costas-HOME.jpg", "img/produtos/25-26/torcedor/PALMEIRAS/detalhes-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 670, name: "Camisa Palmeiras Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PALMEIRAS/principal-HOME.jpg", images: ["img/produtos/26-27/torcedor/PALMEIRAS/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  { id: 671, name: "Camisa Palmeiras Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PALMEIRAS/principal-AWAY.JPG", images: ["img/produtos/26-27/torcedor/PALMEIRAS/principal-AWAY.JPG"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  { id: 672, name: "Camisa Palmeiras Amarela 25/26", price: "R$ 129,90", image: "img/produtos/25-26/jogador/PALMEIRAS/principal-AMARELA.JPG", images: ["img/produtos/25-26/jogador/PALMEIRAS/principal-AMARELA.JPG"], tags: ["nacional", "destaque"], badge: "Jogador", link: "produto.html" },
  { id: 224, name: "Camisa Paysandu Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/PAYSANDU/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/PAYSANDU/principal-HOME.jpg", "img/produtos/25-26/torcedor/PAYSANDU/costas-HOME.jpg", "img/produtos/25-26/torcedor/PAYSANDU/detalhes-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 228, name: "Camisa Remo Especial 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/REMO/principal-ESPECIAL.jpg", images: ["img/produtos/25-26/torcedor/REMO/principal-ESPECIAL.jpg", "img/produtos/25-26/torcedor/REMO/costas-ESPECIAL.jpg", "img/produtos/25-26/torcedor/REMO/detalhes-ESPECIAL.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 229, name: "Camisa Santa Cruz Feminina 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SANTA CRUZ/principal-FEMININA.jpg", images: ["img/produtos/25-26/torcedor/SANTA CRUZ/principal-FEMININA.jpg", "img/produtos/25-26/torcedor/SANTA CRUZ/costas-FEMININA.jpg", "img/produtos/25-26/torcedor/SANTA CRUZ/detalhes-FEMININA.jpg"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 101, name: "Camisa Santos Home Neymar", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SANTOS/principal-NEYMAR 10.jpg", images: ["img/produtos/25-26/torcedor/SANTOS/principal-NEYMAR 10.jpg", "img/produtos/25-26/torcedor/SANTOS/costas-NEYMAR 10.jpg", "img/produtos/25-26/torcedor/SANTOS/detalhes-NEYMAR 10.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 680, name: "Camisa Santos Home Listrada", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SANTOS/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/SANTOS/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 681, name: "Camisa Santos Azul 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SANTOS/principal-AZUL.jpg", images: ["img/produtos/25-26/torcedor/SANTOS/principal-AZUL.jpg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 128, name: "Camisa São Paulo Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SAO PAULO/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/SAO PAULO/principal-HOME.jpg", "img/produtos/25-26/torcedor/SAO PAULO/costas-HOME.jpg", "img/produtos/25-26/torcedor/SAO PAULO/detalhes-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 690, name: "Camisa São Paulo Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SAO PAULO/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/SAO PAULO/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 691, name: "Camisa São Paulo Away Listrada 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SAO PAULO/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/SAO PAULO/principal-AWAY.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 692, name: "Camisa São Paulo Feminina Home", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SAO PAULO/HOME FEMININA.jpg", images: ["img/produtos/25-26/torcedor/SAO PAULO/HOME FEMININA.jpg"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 236, name: "Camisa Tigres Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/TIGRES/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/TIGRES/principal-HOME.jpg", "img/produtos/25-26/torcedor/TIGRES/costas-HOME.jpg", "img/produtos/25-26/torcedor/TIGRES/detalhes-HOME.jpg"], tags: ["internacional", "destaque"], link: "produto.html" },
  { id: 540, name: "Camisa Vitória Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/VITORIA/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/VITORIA/principal-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 541, name: "Camisa Vitória Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/VITORIA/principal-AWAY.jpg", images: ["img/produtos/25-26/torcedor/VITORIA/principal-AWAY.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },

  // TEMPORADA 24/25 (RESTORED FULL LIST)
  { id: 30, name: "Camisa Al-Hilal Home 24/25 - Puma", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/AL-HILAL/principal.jpg", images: ["img/produtos/24-25/torcedor/AL-HILAL/principal.jpg", "img/produtos/24-25/torcedor/AL-HILAL/costas.jpg", "img/produtos/24-25/torcedor/AL-HILAL/detalhes.jpg"], tags: ["internacional", "saudita"], badge: "Neymar", link: "produto.html" },
  { id: 31, name: "Camisa Arsenal Home 24/25 - Adidas", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ARSENAL/principal.jpg", images: ["img/produtos/24-25/torcedor/ARSENAL/principal.jpg", "img/produtos/24-25/torcedor/ARSENAL/costas.jpg", "img/produtos/24-25/torcedor/ARSENAL/detalhes.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 32, name: "Camisa Atalanta Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATALANTA/principal.jpeg", images: ["img/produtos/24-25/torcedor/ATALANTA/principal.jpeg", "img/produtos/24-25/torcedor/ATALANTA/detalhes.jpeg", "img/produtos/24-25/torcedor/ATALANTA/detalhes2.jpeg"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 33, name: "Camisa Atlético de Madrid Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/principal.jpg", images: ["img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/principal.jpg", "img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/detalhes.jpg", "img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/detalhes2.jpg"], tags: ["europeus", "espanhol"], link: "produto.html" },
  { id: 411, name: "Camisa Athletico Paranaense Feminina Dourada", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATLETICO PARANAENSE/principal-FEMININA.jpg", images: ["img/produtos/24-25/torcedor/ATLETICO PARANAENSE/principal-FEMININA.jpg"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 411, name: "Camisa Athletico Paranaense Feminina Classica", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATLETICO PARANAENSE/principal-FEMININA2.jpg", images: ["img/produtos/24-25/torcedor/ATLETICO PARANAENSE/principal-FEMININA2.jpg"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 40, name: "Camisa Barcelona Edição Especial 304", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BARCELONA/principal-EDICAO ESPECIAL .jpg", images: ["img/produtos/24-25/torcedor/BARCELONA/principal-EDICAO ESPECIAL .jpg", "img/produtos/24-25/torcedor/BARCELONA/costas-EDICAO ESPECIAL.jpg", "img/produtos/24-25/torcedor/BARCELONA/detalhes-EDICAO ESPECIAL .jpg"], tags: ["europeus", "destaque"], badge: "Exclusivo", link: "produto.html" },
  { id: 41, name: "Camisa Barcelona Away Preta Spotify", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BARCELONA/principal-SPOTIFY PRETA -.jpg", images: ["img/produtos/24-25/torcedor/BARCELONA/principal-SPOTIFY PRETA -.jpg", "img/produtos/24-25/torcedor/BARCELONA/costas-SPOTIFY PRETA .jpg", "img/produtos/24-25/torcedor/BARCELONA/detalhes-SPOTIFY PRETA .jpg"], tags: ["europeus", "lancamento"], link: "produto.html" },
  { id: 42, name: "Camisa Bayer Leverkusen Away Branca", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/princial-BRANCa.jpg", images: ["img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/princial-BRANCa.jpg", "img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/costas-BRANCA.jpg", "img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/detalhes-BRANCA.jpg"], tags: ["europeus", "alemao"], link: "produto.html" },
  { id: 43, name: "Camisa Betis Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BETIS/principal-HOME.jpg", images: ["img/produtos/24-25/torcedor/BETIS/principal-HOME.jpg", "img/produtos/24-25/torcedor/BETIS/detalhes-HOME.jpg", "img/produtos/24-25/torcedor/BETIS/detalhes2-HOME.jpg"], tags: ["europeus", "espanhol"], link: "produto.html" },
  { id: 44, name: "Camisa Boca Juniors Away Branca", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BOCA JUNIORS/principal-BRANCA.jpg", images: ["img/produtos/24-25/torcedor/BOCA JUNIORS/principal-BRANCA.jpg", "img/produtos/24-25/torcedor/BOCA JUNIORS/costas-BRANCA.jpg", "img/produtos/24-25/torcedor/BOCA JUNIORS/detalhes-BRANCA.jpg"], tags: ["internacional", "sulamericano"], link: "produto.html" },
  { id: 50, name: "Camisa Botafogo Home - Patch Libertadores", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BOTAFOGO/principal-HOME + PATCH LIBERTADORES.jpg", images: ["img/produtos/24-25/torcedor/BOTAFOGO/principal-HOME + PATCH LIBERTADORES.jpg", "img/produtos/24-25/torcedor/BOTAFOGO/costas-HOME + PATCH LIBERTADORES.jpg", "img/produtos/24-25/torcedor/BOTAFOGO/detalhes-HOME + PATCH LIBERTADORES.jpg"], tags: ["nacional", "brasileirao"], badge: "Libertadores", link: "produto.html" },
  { id: 51, name: "Camisa Botafogo Goleiro Roxa", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BOTAFOGO/principal-ROXA.jpg", images: ["img/produtos/24-25/torcedor/BOTAFOGO/principal-ROXA.jpg", "img/produtos/24-25/torcedor/BOTAFOGO/costas-ROXA.jpg", "img/produtos/24-25/torcedor/BOTAFOGO/detalhes-ROXA.jpg"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 52, name: "Camisa Brighton Away Amarela", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BRIGHTON/principal-AWAY.jpg", images: ["img/produtos/24-25/torcedor/BRIGHTON/principal-AWAY.jpg", "img/produtos/24-25/torcedor/BRIGHTON/costas-AWAY.jpg", "img/produtos/24-25/torcedor/BRIGHTON/detalhes-AWAY.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 60, name: "Camisa Chelsea Away Branca 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CHELSEA/principal-BRANCA.jpeg", images: ["img/produtos/24-25/torcedor/CHELSEA/principal-BRANCA.jpeg", "img/produtos/24-25/torcedor/CHELSEA/costas-BRANCA.jpeg", "img/produtos/24-25/torcedor/CHELSEA/detalhes-BRANCA.jpeg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 61, name: "Camisa Chelsea Treino Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CHELSEA/principal-PRETA.jpeg", images: ["img/produtos/24-25/torcedor/CHELSEA/principal-PRETA.jpeg", "img/produtos/24-25/torcedor/CHELSEA/costas-PRETA.jpeg", "img/produtos/24-25/torcedor/CHELSEA/detalhes-PRETA.jpeg"], tags: ["europeus", "treino"], link: "produto.html" },
  { id: 65, name: "Camisa Colômbia Edição Especial", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/COLOMBIA/principal-EDICAO ESPECIAL.jpg", images: ["img/produtos/24-25/torcedor/COLOMBIA/principal-EDICAO ESPECIAL.jpg", "img/produtos/24-25/torcedor/COLOMBIA/costas-EDICAO ESPECIAL.jpg", "img/produtos/24-25/torcedor/COLOMBIA/detalhes-EDICAO ESPECIAL.jpg"], tags: ["selecoes", "destaque"], badge: "Centenário", link: "produto.html" },
  { id: 66, name: "Camisa Coreia do Sul Home Vermelha", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/COREA DO SUL/principal-VERMELHA.jpg", images: ["img/produtos/24-25/torcedor/COREA DO SUL/principal-VERMELHA.jpg", "img/produtos/24-25/torcedor/COREA DO SUL/costas-VERMELHA.jpg", "img/produtos/24-25/torcedor/COREA DO SUL/detalhes-VERMELHA.jpg"], tags: ["selecoes", "asiatico"], link: "produto.html" },
  { id: 67, name: "Camisa Coreia do Sul Away Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/COREA DO SUL/principal-PRETA.jpg", images: ["img/produtos/24-25/torcedor/COREA DO SUL/principal-PRETA.jpg", "img/produtos/24-25/torcedor/COREA DO SUL/costas-PRETA.jpg", "img/produtos/24-25/torcedor/COREA DO SUL/detalhes-PRETA.jpg"], tags: ["selecoes"], link: "produto.html" },
  { id: 70, name: "Camisa Corinthians Home Feminina 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-HOME FEMININA.jpg", images: ["img/produtos/24-25/torcedor/CORINTHIANS/detalhes-HOME FEMININA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/costas-HOME FEMININA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-HOME FEMININA.jpg"], tags: ["nacional", "feminina"], badge: "Feminina", link: "produto.html" },
  { id: 71, name: "Camisa Corinthians III 24/25 - Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.jpg", images: ["img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-PRETA.jpg", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes2-PRETA.jpg"], tags: ["nacional", "lancamento"], badge: "Antirracista", link: "produto.html" },
  { id: 206, name: "Camisa Corinthians Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-HOME.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-HOME.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-HOME.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 207, name: "Camisa Corinthians II 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-SEGUNDA CAMISA.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-SEGUNDA CAMISA.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-SEGUNDA CAMISA.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-SEGUNDA CAMISA.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 208, name: "Camisa Corinthians Treino Roxa", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO ROXA.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO ROXA.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-TREINO ROXA.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-TREINO ROXA.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 209, name: "Camisa Corinthians Treino Cinza", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-TREINO.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-TREINO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 210, name: "Camisa Corinthians Especial Blackout", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-ESPECIAL.jpg", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-ESPECIAL.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/costas-ESPECIAL.jpg", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-ESPECIAL.jpg"], tags: ["nacional", "especial"], link: "produto.html" },
  { id: 80, name: "Camisa Flamengo Goleiro Amarela 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principla-GOLEIRO.jpg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principla-GOLEIRO.jpg", "img/produtos/24-25/torcedor/FLAMENGO/costas-GOLEIRO.jpg", "img/produtos/24-25/torcedor/FLAMENGO/detalhesGOLEIRO.jpg"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 81, name: "Camisa Flamengo Identidade Marrom", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-IDENTIDADE MARROM.jpg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-IDENTIDADE MARROM.jpg", "img/produtos/24-25/torcedor/FLAMENGO/costas-IDENTIDADE MARROM.jpg", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-IDENTIDADE MARROM.jpg"], tags: ["nacional", "destaque"], badge: "Black", link: "produto.html" },
  { id: 82, name: "Camisa Flamengo Lifestyler Feminina", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER FEMININA.jpg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER FEMININA.jpg", "img/produtos/24-25/torcedor/FLAMENGO/costas-LIFESTYLER FEMININA.jpg", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-LIFESTYLER FEMININA.jpg"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 83, name: "Camisa Flamengo Lifestyler Masculina", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER.jpeg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER.jpeg", "img/produtos/24-25/torcedor/FLAMENGO/costas-LIFESTYLER.jpeg", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-LIFESTYLER.jpeg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 84, name: "Camisa Flamengo Treino Azul", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-TREINO.jpg", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-TREINO.jpg", "img/produtos/24-25/torcedor/FLAMENGO/costas-TREINO.jpg", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-TREINO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 90, name: "Camisa Fortaleza Away 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FORTALEZA/principal-FORTALEZA AWAY.jpeg", images: ["img/produtos/24-25/torcedor/FORTALEZA/principal-FORTALEZA AWAY.jpeg", "img/produtos/24-25/torcedor/FORTALEZA/costas-FORTALEZA AWAY.jpeg", "img/produtos/24-25/torcedor/FORTALEZA/detalhes-FORTALEZA AWAY.jpeg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 91, name: "Camisa Japão Away 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JAPÃO/principal-AWAY.jpg", images: ["img/produtos/24-25/torcedor/JAPÃO/principal-AWAY.jpg", "img/produtos/24-25/torcedor/JAPÃO/costas-AWAY.jpg", "img/produtos/24-25/torcedor/JAPÃO/detalhes-AWAY.jpg"], tags: ["selecoes", "asiatico"], link: "produto.html" },
  { id: 92, name: "Camisa Japão Treino Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JAPÃO/principal-PRETA.jpg", images: ["img/produtos/24-25/torcedor/JAPÃO/principal-PRETA.jpg", "img/produtos/24-25/torcedor/JAPÃO/costas-PRETA.jpg", "img/produtos/24-25/torcedor/JAPÃO/detalhes-PRETA.jpg"], tags: ["selecoes", "treino"], link: "produto.html" },
  { id: 93, name: "Camisa Juventus Lifestyle", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JUVENTUS/principal-LIFESTYLE.jpeg", images: ["img/produtos/24-25/torcedor/JUVENTUS/principal-LIFESTYLE.jpeg", "img/produtos/24-25/torcedor/JUVENTUS/costas-LIFESTYLE.jpeg", "img/produtos/24-25/torcedor/JUVENTUS/detalhes-LIFESTYLE.jpeg"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 94, name: "Camisa Juventus da Mooca Home", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/principal-HOME.jpeg", images: ["img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/principal-HOME.jpeg", "img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/costas-HOME.jpeg", "img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/detalhes-HOME.jpeg"], tags: ["nacional", "classico"], link: "produto.html" },
  { id: 95, name: "Camisa Liverpool Pré-Jogo Vermelha", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/LIVERPOOL/principal-PRE JOGO VERMELHA.jpg", images: ["img/produtos/24-25/torcedor/LIVERPOOL/principal-PRE JOGO VERMELHA.jpg", "img/produtos/24-25/torcedor/LIVERPOOL/costas-PRE JOGO VERMELHA.jpg", "img/produtos/24-25/torcedor/LIVERPOOL/detalhes-PRE JOGO VERMELHA.jpg"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 96, name: "Camisa MILAN 125 Anos Curta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/MILAN/principal-125 ANOS CURTA.jpg", images: ["img/produtos/24-25/torcedor/MILAN/principal-125 ANOS CURTA.jpg", "img/produtos/24-25/torcedor/MILAN/costas-125 ANOS CURTA.jpg", "img/produtos/24-25/torcedor/MILAN/detalhes-125 ANOS CURTA.jpg"], tags: ["europeus", "italiano"], badge: "Comemorativa", link: "produto.html" },
  { id: 97, name: "Camisa MILAN Third 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/MILAN/principal-THIRD.jpg", images: ["img/produtos/24-25/torcedor/MILAN/principal-THIRD.jpg", "img/produtos/24-25/torcedor/MILAN/costas-THIRD.jpg", "img/produtos/24-25/torcedor/MILAN/detalhes-THIRD.jpg"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 98, name: "Camisa Paysandu Away 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/PAYSANDU/principal-AWAY.jpg", images: ["img/produtos/24-25/torcedor/PAYSANDU/principal-AWAY.jpg", "img/produtos/24-25/torcedor/PAYSANDU/costas-AWAY.jpg", "img/produtos/24-25/torcedor/PAYSANDU/detalhes-AWAY.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 99, name: "Camisa Peñarol Home", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/PEÑAROL/principal-HOME.jpg", images: ["img/produtos/24-25/torcedor/PEÑAROL/principal-HOME.jpg", "img/produtos/24-25/torcedor/PEÑAROL/costas-HOME.jpg", "img/produtos/24-25/torcedor/PEÑAROL/detalhes-HOME.jpg"], tags: ["internacional", "sulamericano"], link: "produto.html" },
  { id: 100, name: "Camisa Roma Branca com Laranja", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ROMA/principal-BRANCA COM LARANJA.jpg", images: ["img/produtos/24-25/torcedor/ROMA/principal-BRANCA COM LARANJA.jpg", "img/produtos/24-25/torcedor/ROMA/costas-BRANCA COM LARANJA.jpg", "img/produtos/24-25/torcedor/ROMA/detalhes-BRANCA COM LARANJA.jpg"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 101, name: "Camisa Santos Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SANTOS/principal-HOME.jpg", images: ["img/produtos/24-25/torcedor/SANTOS/principal-HOME.jpg", "img/produtos/24-25/torcedor/SANTOS/costas-HOME.jpg", "img/produtos/24-25/torcedor/SANTOS/detalhes-HOME.jpg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 102, name: "Camisa Santos Laranja (Goleiro/Treino)", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SANTOS/principal-LARANJA.jpg", images: ["img/produtos/24-25/torcedor/SANTOS/principal-LARANJA.jpg", "img/produtos/24-25/torcedor/SANTOS/costas-LARANJA.jpg", "img/produtos/24-25/torcedor/SANTOS/detalhes-LARANJA.jpg"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 103, name: "Camisa Santos Treino Azul", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SANTOS/principal-TREINO.jpg", images: ["img/produtos/24-25/torcedor/SANTOS/principal-TREINO.jpg", "img/produtos/24-25/torcedor/SANTOS/costas-TREINO.jpg", "img/produtos/24-25/torcedor/SANTOS/detalhes-TREINO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 104, name: "Camisa Sport Recife Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SPORT/principal-PRETA.jpeg", images: ["img/produtos/24-25/torcedor/SPORT/principal-PRETA.jpeg", "img/produtos/24-25/torcedor/SPORT/costas-PRETA.jpeg", "img/produtos/24-25/torcedor/SPORT/detalhes-PRETA.jpeg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 105, name: "Camisa Sport Recife Third Vermelha", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SPORT/principal-THIRD.jpg", images: ["img/produtos/24-25/torcedor/SPORT/principal-THIRD.jpg", "img/produtos/24-25/torcedor/SPORT/costas-THIRD.jpg", "img/produtos/24-25/torcedor/SPORT/detalhes-THIRD.jpg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 106, name: "Camisa Vasco Third 24/25 - Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/VASCO/principal-THIRD PRETA.jpeg", images: ["img/produtos/24-25/torcedor/VASCO/principal-THIRD PRETA.jpeg", "img/produtos/24-25/torcedor/VASCO/costas-THIRD.jpg", "img/produtos/24-25/torcedor/VASCO/detalhes-THIRD PRETA.jpeg"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 107, name: "Camisa Vasco Off-White Diagonais", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/VASCO/principal-THIRD.jpg", images: ["img/produtos/24-25/torcedor/VASCO/principal-THIRD.jpg", "img/produtos/24-25/torcedor/VASCO/costas-THIRD.jpg", "img/produtos/24-25/torcedor/VASCO/detalhes-THIRD.jpg"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 108, name: "Camisa Vasco Pré-Jogo Branca", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/VASCO/principal-PRÉ JOGO.jpg", images: ["img/produtos/24-25/torcedor/VASCO/principal-PRÉ JOGO.jpg", "img/produtos/24-25/torcedor/VASCO/detalhes-PRÉ JOGO.jpg"], tags: ["nacional", "treino"], link: "produto.html" },

  // RETRÔ (R$ 179,90)
  { id: 300, name: "Camisa Alemanha 1998 Retrô", price: "R$ 179,90", image: "img/produtos/retro/ALEMANHA/principal-1998.jpg", images: ["img/produtos/retro/ALEMANHA/principal-1998.jpg", "img/produtos/retro/ALEMANHA/costas-1998.jpg", "img/produtos/retro/ALEMANHA/detalhes-1998.jpg"], tags: ["retro", "selecoes", "europeus"], link: "produto.html" },
  { id: 301, name: "Camisa Alemanha 2014 Özil", price: "R$ 179,90", image: "img/produtos/retro/ALEMANHA/principal-OZIL-2014.jpeg", images: ["img/produtos/retro/ALEMANHA/principal-OZIL-2014.jpeg", "img/produtos/retro/ALEMANHA/costas-OZIL-2014.jpeg", "img/produtos/retro/ALEMANHA/detalhes-OZIL-2014.jpeg", "img/produtos/retro/ALEMANHA/detalhes1-OZIL-2014.jpeg"], tags: ["retro", "selecoes", "europeus"], badge: "7x1", link: "produto.html" },
  { id: 302, name: "Camisa Atl. Madrid F. Torres", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO DE MADRID/principal-FERNANDO TORRES.jpeg", images: ["img/produtos/retro/ATLETICO DE MADRID/principal-FERNANDO TORRES.jpeg", "img/produtos/retro/ATLETICO DE MADRID/costas-FERNANDO TORRES.jpeg", "img/produtos/retro/ATLETICO DE MADRID/detalhes-FERNANDO TORRES.jpeg"], tags: ["retro", "europeus", "espanhol"], link: "produto.html" },
  { id: 303, name: "Camisa Barcelona 10/11 Home", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-BARCELONA HOME-10_11.jpeg", images: ["img/produtos/retro/BARCELONA/principal-BARCELONA HOME-10_11.jpeg", "img/produtos/retro/BARCELONA/costas-BARCELONA HOME-10_11.jpeg", "img/produtos/retro/BARCELONA/detalhes-BARCELONA HOME-10_11.jpeg"], tags: ["retro", "europeus", "espanhol"], badge: "Pep Team", link: "produto.html" },
  { id: 304, name: "Camisa Barcelona 16/17 Neymar", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-NEYMAR-16_17.jpeg", images: ["img/produtos/retro/BARCELONA/principal-NEYMAR-16_17.jpeg", "img/produtos/retro/BARCELONA/costas-NEYMAR-16_17.jpeg", "img/produtos/retro/BARCELONA/detalhes-NEYMAR-16_17.jpeg"], tags: ["retro", "europeus", "espanhol"], link: "produto.html" },
  { id: 305, name: "Camisa Barcelona 2010 Ronaldinho", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-RONALDINHO - 2010.jpeg", images: ["img/produtos/retro/BARCELONA/principal-RONALDINHO - 2010.jpeg", "img/produtos/retro/BARCELONA/costas-RONALDINHO - 2010.jpeg", "img/produtos/retro/BARCELONA/detalhes-RONALDINHO - 2010.jpeg"], tags: ["retro", "europeus", "espanhol"], badge: "R10", link: "produto.html" },
  { id: 306, name: "Camisa Barcelona 03/04 Away", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-AWAY - 03_04.jpeg", images: ["img/produtos/retro/BARCELONA/principal-AWAY - 03_04.jpeg", "img/produtos/retro/BARCELONA/detalhes-AWAY - 03_04.jpeg", "img/produtos/retro/BARCELONA/detalhes2-AWAY - 03_04.jpeg"], tags: ["retro", "europeus", "espanhol"], link: "produto.html" },
  { id: 307, name: "Camisa Barcelona 16/17 Roxa Messi", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-ROXA - MESSI - 16_17.jpeg", images: ["img/produtos/retro/BARCELONA/principal-ROXA - MESSI - 16_17.jpeg", "img/produtos/retro/BARCELONA/detalhes-ROXA - MESSI - 16_17.jpeg", "img/produtos/retro/BARCELONA/detalhes1-ROXA - MESSI - 16_17.jpeg"], tags: ["retro", "europeus", "espanhol"], badge: "Messi", link: "produto.html" },
  { id: 308, name: "Camisa Bayern 13/14 Home", price: "R$ 179,90", image: "img/produtos/retro/BAYERN/principal-HOME 13_14.jpg", images: ["img/produtos/retro/BAYERN/principal-HOME 13_14.jpg", "img/produtos/retro/BAYERN/costas-HOME 13_14.jpg", "img/produtos/retro/BAYERN/detalhes-HOME 13_14.jpg"], tags: ["retro", "europeus", "alemao"], link: "produto.html" },
  { id: 309, name: "Camisa Brasil 2002 Ronaldo", price: "R$ 179,90", image: "img/produtos/retro/BRASIL/principal-RONALDO_2002.jpeg", images: ["img/produtos/retro/BRASIL/principal-RONALDO_2002.jpeg", "img/produtos/retro/BRASIL/costas-RONALDO_2002.jpeg", "img/produtos/retro/BRASIL/detalhes-RONALDO_2002.jpeg", "img/produtos/retro/BRASIL/detalhes1-RONALDO_2002.jpeg"], tags: ["retro", "selecoes", "destaque"], badge: "Penta", link: "produto.html" },
  //  { id: 314, name: "Camisa França 1998 Zidane", price: "R$ 179,90", image: "img/produtos/retro/FRANÇA/principal-ZIDANE.jpeg", images: ["img/produtos/retro/FRANÇA/principal-ZIDANE.jpeg", "img/produtos/retro/FRANÇA/costas-ZIDANE.jpeg", "img/produtos/retro/FRANÇA/detalhes-ZIDANE.jpeg"], tags: ["retro", "selecoes"], badge: "Campeã 98", link: "produto.html" },
  //  { id: 315, name: "Camisa Inglaterra 1994 Retrô", price: "R$ 179,90", image: "img/produtos/retro/INGLATERRA/principal-1994.jpeg", images: ["img/produtos/retro/INGLATERRA/principal-1994.jpeg", "img/produtos/retro/INGLATERRA/costas-1994.jpeg", "img/produtos/retro/INGLATERRA/detalhes-1994.jpeg"], tags: ["retro", "selecoes"], link: "produto.html" },
  //  { id: 316, name: "Camisa Inglaterra 1998 Retrô", price: "R$ 179,90", image: "img/produtos/retro/INGLATERRA/principal-1998.jpeg", images: ["img/produtos/retro/INGLATERRA/principal-1998.jpeg", "img/produtos/retro/INGLATERRA/costas-1998.jpeg", "img/produtos/retro/INGLATERRA/detalhes-1998.jpeg"], tags: ["retro", "selecoes"], link: "produto.html" },
  { id: 317, name: "Camisa Inter de Milão 2010", price: "R$ 179,90", image: "img/produtos/retro/INTER DE MILÃO/principal-2010.jpg", images: ["img/produtos/retro/INTER DE MILÃO/principal-2010.jpg", "img/produtos/retro/INTER DE MILÃO/detalhes-2010.jpg"], tags: ["retro", "europeus", "italiano"], link: "produto.html" },
  { id: 318, name: "Camisa Inter 2010 Sneijder", price: "R$ 179,90", image: "img/produtos/retro/INTER DE MILÃO/principal-SNEIJDER 10.jpeg", images: ["img/produtos/retro/INTER DE MILÃO/principal-SNEIJDER 10.jpeg", "img/produtos/retro/INTER DE MILÃO/costas-SNEIJDER 10.jpeg", "img/produtos/retro/INTER DE MILÃO/detalhes-SNEIJDER 10.jpeg"], tags: ["retro", "europeus", "italiano"], link: "produto.html" },
  { id: 319, name: "Camisa Inter 2010 Eto'o", price: "R$ 179,90", image: "img/produtos/retro/INTER DE MILÃO/principal-ETO-9.jpg", images: ["img/produtos/retro/INTER DE MILÃO/principal-ETO-9.jpg", "img/produtos/retro/INTER DE MILÃO/costas-ETO-9.jpg", "img/produtos/retro/INTER DE MILÃO/detalhes-ETO-9.jpg"], tags: ["retro", "europeus", "italiano"], link: "produto.html" },
  { id: 420, name: "Camisa Atlético Mineiro Retrô 1995", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO MINEIRO/principal-RETRO-1995.jpg", images: ["img/produtos/retro/ATLETICO MINEIRO/principal-RETRO-1995.jpg"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 421, name: "Camisa Atlético Mineiro Retrô 2003", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO MINEIRO/principal-RETRO-2003.jpg", images: ["img/produtos/retro/ATLETICO MINEIRO/principal-RETRO-2003.jpg"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 422, name: "Camisa Atlético Mineiro Retrô Clássica", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO MINEIRO/principal-RETRO.jpg", images: ["img/produtos/retro/ATLETICO MINEIRO/principal-RETRO.jpg"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 423, name: "Camisa Athletico Paranaense Retrô", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO PARANAENSE/principal-RETRO.jpg", images: ["img/produtos/retro/ATLETICO PARANAENSE/principal-RETRO.jpg"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 505, name: "Camisa Bahia Retrô Renner", price: "R$ 179,90", image: "img/produtos/retro/BAHIA/principal-RETRO2.jpg", images: ["img/produtos/retro/BAHIA/principal-RETRO2.jpg"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 506, name: "Camisa Bahia Retrô Coca-Cola", price: "R$ 179,90", image: "img/produtos/retro/BAHIA/principal-RETRO4.jpg", images: ["img/produtos/retro/BAHIA/principal-RETRO4.jpg"], tags: ["retro", "nacional"], link: "produto.html" }
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

  const searchInput = document.querySelector('.search-bar input');
  const searchIcon = document.querySelector('.search-bar .search-icon');

  function performSearch() {
    const term = searchInput.value.trim();
    if (term) {
      window.location.href = `categoria.html?busca=${encodeURIComponent(term)}`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
  if (searchIcon) {
    searchIcon.addEventListener('click', performSearch);
  }

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
                            <img src="${product.image}" onerror="this.src='img/front-page/logo.png'" alt="${product.name}">
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

  // C) Lógica da PÁGINA DE CATEGORIA (AGORA COM BUSCA)
  if (window.location.pathname.includes("categoria.html")) {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    const searchTerm = params.get('busca'); // Pega o que foi digitado na busca
    const container = document.getElementById('grid-categoria');
    const title = document.getElementById('cat-title');
    const count = document.getElementById('cat-count');

    const titulos = { 'lancamento': 'Lançamentos 🔥', 'nacional': 'Brasileirão & Nacionais', 'europeus': 'Futebol Europeu', 'selecoes': 'Seleções Mundiais', 'retro': 'Relíquias Retrô', 'feminina': 'Futebol Feminino', 'internacional': 'Times Internacionais' };

    let filtered = [];

    // LÓGICA DE FILTRO (TAG OU BUSCA)
    if (searchTerm) {
      filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.includes(searchTerm.toLowerCase()))
      );
      if (title) title.innerText = `Resultados para: "${searchTerm}"`;
    } else if (tag) {
      filtered = products.filter(p => p.tags.includes(tag));
      if (title) title.innerText = titulos[tag] || "Produtos";
    }

    if (container) {
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
                                <img src="${product.image}" onerror="this.src='img/front-page/logo.png'" alt="${product.name}">
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
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; font-size: 1.2rem; margin-top: 50px;">Nenhum produto encontrado.</p>';
      }
    }
  }

  // --- LÓGICA DO CARRINHO (VERSÃO MODAL POPUP) ---

  let cart = JSON.parse(localStorage.getItem('mgMantosCart')) || [];
  updateCartIcon();

  window.openCartModal = function (isAddedAction = false) {
    const overlay = document.getElementById('cart-modal-overlay');
    const modal = document.getElementById('cart-modal');
    const title = document.getElementById('modal-title');

    if (isAddedAction) {
      title.innerText = "Este produto foi adicionado ao seu carrinho!";
      title.style.color = "#00c853";
    } else {
      title.innerText = "Seu Carrinho de Compras";
      title.style.color = "#333";
    }

    renderModalItems();

    overlay.style.display = 'block';
    modal.style.display = 'flex';

    setTimeout(() => {
      overlay.classList.add('show');
      modal.classList.add('show');
    }, 10);
  }

  window.closeCartModal = function () {
    const overlay = document.getElementById('cart-modal-overlay');
    const modal = document.getElementById('cart-modal');

    overlay.classList.remove('show');
    modal.classList.remove('show');

    setTimeout(() => {
      overlay.style.display = 'none';
      modal.style.display = 'none';
    }, 300);
  }

  // BOTÃO "ADICIONAR AO CARRINHO"
  const buyBtn = document.querySelector('.buy-btn');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      const sizeBtn = document.querySelector('.size-btn.selected');
      if (!sizeBtn) {
        alert("Por favor, selecione um tamanho!");
        return;
      }

      const product = {
        id: Date.now(),
        name: document.getElementById('prod-title').innerText,
        price: document.getElementById('prod-price').innerText,
        image: document.getElementById('currentImg').src,
        size: sizeBtn.innerText,
        personalization: getPersonalization()
      };

      cart.push(product);
      saveCart();
      updateCartIcon();

      openCartModal(true);
    });
  }

  // 3.1 Botão da Sacola (Header)
  const bagIconDiv = document.querySelector('.header-actions .action-item:last-child');
  if (bagIconDiv) {
    bagIconDiv.onclick = function () { openCartModal(false); };
  }

  // 4. Renderizar Itens no Modal
  function renderModalItems() {
    const container = document.getElementById('modal-cart-items');
    const totalEl = document.getElementById('modal-total-price');

    if (cart.length === 0) {
      container.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Seu carrinho está vazio.</p>';
      totalEl.innerText = "R$ 0,00";
      return;
    }

    container.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const priceNumber = parseFloat(item.price.replace('R$', '').replace('.', '').replace(',', '.'));
      totalPrice += priceNumber;

      const html = `
                <div class="modal-item">
                    <img src="${item.image}" alt="Produto">
                    <div class="modal-item-info">
                        <h4>${item.name}</h4>
                        <p>Tam: <strong>${item.size}</strong></p>
                        ${item.personalization ? `<p style="color:#d32f2f; font-size:0.75rem">${item.personalization}</p>` : ''}
                        <p style="margin-top:5px; font-weight:bold; color: #00c853;">${item.price}</p>
                    </div>
                    <span class="material-icons-outlined modal-remove-btn" onclick="removeItem(${index})">delete</span>
                </div>
            `;
      container.innerHTML += html;
    });

    totalEl.innerText = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function getPersonalization() {
    const name = document.getElementById('cust-name')?.value.trim();
    const number = document.getElementById('cust-number')?.value.trim();
    return (name || number) ? `Nome: ${name} | Nº: ${number}` : null;
  }

  window.removeItem = function (index) {
    cart.splice(index, 1);
    saveCart();
    renderModalItems();
    updateCartIcon();
  }

  function saveCart() {
    localStorage.setItem('mgMantosCart', JSON.stringify(cart));
  }

  function updateCartIcon() {
    const bagContainer = document.querySelector('.header-actions .action-item:last-child');
    if (!bagContainer) return;

    let badge = bagContainer.querySelector('.cart-count-badge');

    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-count-badge';
      badge.style.cssText = "position:absolute; top:-5px; right:-5px; background:red; color:white; font-size:10px; width:16px; height:16px; border-radius:50%; display:flex; justify-content:center; align-items:center; font-weight:bold;";
      bagContainer.style.position = 'relative';
      bagContainer.appendChild(badge);
    }

    badge.innerText = cart.length;
    badge.style.display = cart.length > 0 ? 'flex' : 'none';
  }

  // FINALIZAR PEDIDO (WHATSAPP)
  window.finalizeOrder = function () {
    if (cart.length === 0) return alert("Seu carrinho está vazio!");

    let message = `*NOVO PEDIDO DO SITE*%0A%0A`;
    let total = 0;

    cart.forEach((item, i) => {
      const val = parseFloat(item.price.replace('R$', '').replace('.', '').replace(',', '.'));
      total += val;
      message += `*${i + 1}. ${item.name}*%0A   📏 Tam: ${item.size} | 💰 ${item.price}%0A`;
      if (item.personalization) message += `   🎨 ${item.personalization}%0A`;
      message += `%0A`;
    });

    message += `------------------------------%0A`;
    message += `*TOTAL: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*%0A`;
    message += `------------------------------%0A`;
    message += `Gostaria de prosseguir para o pagamento.`;
    const phone = "5544988215198";
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

});