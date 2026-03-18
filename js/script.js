const products = [
  // LANÇAMENTOS 25/26 e 26/27 (FUTURO/JOGADOR)
  { id: 701, name: "Camisa Brasil Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/BRASIL/principal-home.webp", images: ["img/produtos/26-27/torcedor/BRASIL/principal-home.webp", "img/produtos/26-27/torcedor/BRASIL/detalhes-home.webp", "img/produtos/26-27/torcedor/BRASIL/neymar.webp"], tags: ["selecoes", "lancamento", "destaque"], badge: "Futuro", link: "produto.html" },
  { id: 20, name: "Camisa Barcelona Home I 25/26 – Manga Longa", price: "R$ 169,90", image: "img/produtos/25-26/torcedor/BARCELONA/principal-MANGALONGA.webp", images: ["img/produtos/25-26/torcedor/BARCELONA/principal-MANGALONGA.webp", "img/produtos/25-26/torcedor/BARCELONA/detalhe-MANGALONGA.webp", "img/produtos/25-26/torcedor/BARCELONA/costas-MANGALONGA.webp"], tags: ["lancamento", "destaque", "europeus"], badge: "Novo", link: "produto.html" },
  { id: 21, name: "Camisa Milan Home 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/MILAN/principal.webp", images: ["img/produtos/25-26/jogador/milan/principal.webp", "img/produtos/25-26/jogador/milan/costas.webp", "img/produtos/25-26/jogador/MILAN/detalhes.webp"], tags: ["lancamento", "europeus"], badge: "Jogador", link: "produto.html" },
  { id: 120, name: "Camisa Aston Villa Home 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/ASTON VILLA/principal-HOME.webp", images: ["img/produtos/25-26/jogador/ASTON VILLA/principal-HOME.webp", "img/produtos/25-26/jogador/ASTON VILLA/costas-HOME.webp", "img/produtos/25-26/jogador/ASTON VILLA/detalhes-HOME.webp"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 202, name: "Camisa Chelsea Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CHEALSEA/principal-AZUL.webp", images: ["img/produtos/25-26/torcedor/CHEALSEA/principal-AZUL.webp", "img/produtos/25-26/torcedor/CHEALSEA/costas-AZUL.webp", "img/produtos/25-26/torcedor/CHEALSEA/detalhes-AZUL.webp"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 122, name: "Camisa Inter de Milão Home 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/INTER DE MILAO/principal-HOME.webp", images: ["img/produtos/25-26/jogador/INTER DE MILAO/principal-HOME.webp", "img/produtos/25-26/jogador/INTER DE MILAO/costas-HOME.webp", "img/produtos/25-26/jogador/INTER DE MILAO/detalhes-HOME.webp"], tags: ["lancamento", "europeus", "italiano"], badge: "Jogador", link: "produto.html" },
  { id: 123, name: "Camisa Juventus Away 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/JUVENTUS/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/JUVENTUS/principal-AWAY.webp", "img/produtos/25-26/torcedor/JUVENTUS/costas-AWAY.webp", "img/produtos/25-26/torcedor/JUVENTUS/detalhes-AWAY.webp"], tags: ["lancamento", "europeus", "italiano"], link: "produto.html" },
  { id: 124, name: "Camisa Liverpool Home 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/LIVERPOOL/principal-HOME.webp", images: ["img/produtos/25-26/jogador/LIVERPOOL/principal-HOME.webp", "img/produtos/25-26/jogador/LIVERPOOL/costas-HOME.webp", "img/produtos/25-26/jogador/LIVERPOOL/detalhes-HOME.webp"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 125, name: "Camisa Man City Edição Especial 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/MAN. CITY/principal-ESPECIAL.webp", images: ["img/produtos/25-26/jogador/MAN. CITY/principal-ESPECIAL.webp", "img/produtos/25-26/jogador/MAN. CITY/costas-ESPECIAL.webp", "img/produtos/25-26/jogador/MAN. CITY/detalhes-ESPECIAL.webp"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 219, name: "Camisa Man. United Especial 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/MAN. UNITED/principal-ESPECIAL+GOLA.webp", images: ["img/produtos/25-26/torcedor/MAN. UNITED/principal-ESPECIAL+GOLA.webp", "img/produtos/25-26/torcedor/MAN. UNITED/costas-ESPECIAL+GOLA.webp", "img/produtos/25-26/torcedor/MAN. UNITED/detalhes-ESPECIAL+GOLA.webp"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 220, name: "Camisa Man. City Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/MAN. CITY/principal-AZUL.webp", images: ["img/produtos/25-26/torcedor/MAN. CITY/principal-AZUL.webp", "img/produtos/25-26/torcedor/MAN. CITY/costas-AZUL.webp", "img/produtos/25-26/torcedor/MAN. CITY/detalhes-AZUL.webp"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 226, name: "Camisa Real Madrid Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/REAL MADRID/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/REAL MADRID/principal-HOME.webp", "img/produtos/25-26/torcedor/REAL MADRID/costas-HOME.webp", "img/produtos/25-26/torcedor/REAL MADRID/detalhes-HOME.webp"], tags: ["europeus", "espanhol"], link: "produto.html" },
  { id: 225, name: "Camisa Real Madrid Away 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/REAL MADRID/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/REAL MADRID/principal-AWAY.webp", "img/produtos/25-26/torcedor/REAL MADRID/costas-AWAY.webp", "img/produtos/25-26/torcedor/REAL MADRID/detalhes-AWAY.webp"], tags: ["europeus", "espanhol"], link: "produto.html" },
  { id: 127, name: "Camisa Real Madrid Dragon 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES3.webp", images: ["img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES3.webp", "img/produtos/25-26/jogador/REAL MADRID/costas-VERSÕES3.webp", "img/produtos/25-26/jogador/REAL MADRID/principal-VERSÕES3.webp"], tags: ["lancamento", "europeus", "espanhol"], badge: "Exclusivo", link: "produto.html" },
  { id: 227, name: "Camisa Red Bull Salzburg Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/RED BULL SALZBURG/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/RED BULL SALZBURG/principal-HOME.webp", "img/produtos/25-26/torcedor/RED BULL SALZBURG/costas-HOME.webp", "img/produtos/25-26/torcedor/RED BULL SALZBURG/detalhes-HOME.webp"], tags: ["europeus", "destaque"], link: "produto.html" },
  { id: 129, name: "Camisa Tottenham Home 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/TOTTENHAM/principal-HOME.webp", images: ["img/produtos/25-26/jogador/TOTTENHAM/principal-HOME.webp", "img/produtos/25-26/jogador/TOTTENHAM/costas-HOME.webp", "img/produtos/25-26/jogador/TOTTENHAM/detalhes-HOME.webp"], tags: ["lancamento", "europeus", "ingles"], badge: "Jogador", link: "produto.html" },
  { id: 130, name: "Camisa Tottenham Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/TOTTENHAM/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/TOTTENHAM/principal-AWAY.webp", "img/produtos/25-26/torcedor/TOTTENHAM/costas-AWAY.webp", "img/produtos/25-26/torcedor/TOTTENHAM/detalhes-AWAY.webp"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 702, name: "Camisa Argentina Home 26/27 - Jogador", price: "R$ 159,90", image: "img/produtos/26-27/jogador/ARGENTINA/principal-jogador.webp", images: ["img/produtos/26-27/jogador/ARGENTINA/principal-jogador.webp", "img/produtos/26-27/jogador/ARGENTINA/detalhes-jogador.webp"], tags: ["selecoes", "lancamento"], badge: "Jogador", link: "produto.html" },
  { id: 703, name: "Camisa México Away 26/27 - Jogador", price: "R$ 159,90", image: "img/produtos/26-27/jogador/MEXICO/principal-away.webp", images: ["img/produtos/26-27/jogador/MEXICO/principal-away.webp", "img/produtos/26-27/jogador/MEXICO/costas-away.webp"], tags: ["selecoes", "lancamento"], badge: "Jogador", link: "produto.html" },
  { id: 704, name: "Camisa Arábia Saudita Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/ARABIA SAUDITA/principal-home.webp", images: ["img/produtos/26-27/torcedor/ARABIA SAUDITA/principal-home.webp"], tags: ["selecoes", "lancamento"], link: "produto.html" },
  { id: 705, name: "Camisa Argentina Feminina 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/ARGENTINA/principal-feminina.webp", images: ["img/produtos/26-27/torcedor/ARGENTINA/principal-feminina.webp"], tags: ["selecoes", "feminina"], link: "produto.html" },
  { id: 706, name: "Camisa Atlético Mineiro Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/ATLETICO MINEIRO/principal-home.webp", images: ["img/produtos/26-27/torcedor/ATLETICO MINEIRO/principal-home.webp", "img/produtos/26-27/torcedor/ATLETICO MINEIRO/detalhes-home.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 707, name: "Camisa Brasil Away 26/27 - Jogador", price: "R$ 159,90", image: "img/produtos/26-27/jogador/BRASIL/principal-jogador2.webp", images: ["img/produtos/26-27/jogador/BRASIL/principal-jogador2.webp", "img/produtos/26-27/jogador/BRASIL/detalhes-jogador2.webp"], tags: ["selecoes", "destaque"], badge: "Jogador", link: "produto.html" },
  { id: 708, name: "Camisa Brasil Away 26/27 - Torcedor", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/BRASIL/principal-away.webp", images: ["img/produtos/26-27/torcedor/BRASIL/principal-away.webp", "img/produtos/26-27/torcedor/BRASIL/costas-away.webp"], tags: ["selecoes"], link: "produto.html" },
  { id: 709, name: "Camisa Canadá Home 26/27 - Jogador", price: "R$ 159,90", image: "img/produtos/26-27/jogador/CANADA/principal-jogador.webp", images: ["img/produtos/26-27/jogador/CANADA/principal-jogador.webp", "img/produtos/26-27/jogador/CANADA/detalhes-jogador.webp"], tags: ["selecoes"], badge: "Jogador", link: "produto.html" },
  { id: 710, name: "Camisa Catar Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CATAR/principal-home.webp", images: ["img/produtos/26-27/torcedor/CATAR/principal-home.webp", "img/produtos/26-27/torcedor/CATAR/costas-home.webp"], tags: ["selecoes"], link: "produto.html" },
  { id: 711, name: "Camisa Colômbia Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/COLOMBIA/principal-away.webp", images: ["img/produtos/26-27/torcedor/COLOMBIA/principal-away.webp", "img/produtos/26-27/torcedor/COLOMBIA/costas-away.webp"], tags: ["selecoes"], link: "produto.html" },
  { id: 712, name: "Camisa Costa Rica Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/COSTA RICA/principal-home.webp", images: ["img/produtos/26-27/torcedor/COSTA RICA/principal-home.webp", "img/produtos/26-27/torcedor/COSTA RICA/costas-home.webp"], tags: ["selecoes"], link: "produto.html" },
  { id: 713, name: "Camisa Croácia Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CROACIA/principal-home.webp", images: ["img/produtos/26-27/torcedor/CROACIA/principal-home.webp", "img/produtos/26-27/torcedor/CROACIA/costas-home.webp"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 714, name: "Camisa Croácia Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CROACIA/principal-away.webp", images: ["img/produtos/26-27/torcedor/CROACIA/principal-away.webp", "img/produtos/26-27/torcedor/CROACIA/costas-away.webp"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 715, name: "Camisa Cruzeiro Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CRUZEIRO/principal-home.webp", images: ["img/produtos/26-27/torcedor/CRUZEIRO/principal-home.webp", "img/produtos/26-27/torcedor/CRUZEIRO/detalhes-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 716, name: "Camisa Cruzeiro Polo 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CRUZEIRO/principal-polo.webp", images: ["img/produtos/26-27/torcedor/CRUZEIRO/principal-polo.webp", "img/produtos/26-27/torcedor/CRUZEIRO/detalhes-polo.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 717, name: "Camisa Espanha Goleiro 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/ESPANHA/principal-goleiro.webp", images: ["img/produtos/26-27/torcedor/ESPANHA/principal-goleiro.webp", "img/produtos/26-27/torcedor/ESPANHA/detalhes-goleiro.webp"], tags: ["selecoes", "goleiro"], link: "produto.html" },
  { id: 718, name: "Camisa Flamengo Home 26/27 - Jogador", price: "R$ 159,90", image: "img/produtos/26-27/jogador/FLAMENGO/principal-jogador.webp", images: ["img/produtos/26-27/jogador/FLAMENGO/principal-jogador.webp", "img/produtos/26-27/torcedor/FLAMENGO/detalhes-home.webp"], tags: ["nacional", "brasileirao"], badge: "Jogador", link: "produto.html" },
  { id: 719, name: "Camisa Flamengo Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLAMENGO/principal-away.webp", images: ["img/produtos/26-27/torcedor/FLAMENGO/principal-away.webp", "img/produtos/26-27/torcedor/FLAMENGO/detalhes-AWAY2.webp"], tags: ["nacional"], link: "produto.html" },
  { id: 720, name: "Camisa Fluminense Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLUMINENSE/principal-home.webp", images: ["img/produtos/26-27/torcedor/FLUMINENSE/principal-home.webp", "img/produtos/26-27/torcedor/FLUMINENSE/costas-home.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 721, name: "Camisa Irlanda Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/IRLANDA/principal-home.webp", images: ["img/produtos/26-27/torcedor/IRLANDA/principal-home.webp", "img/produtos/26-27/torcedor/IRLANDA/detalhes-home.webp"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 722, name: "Camisa Palmeiras Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PALMEIRAS/principal-HOME.webp", images: ["img/produtos/26-27/torcedor/PALMEIRAS/principal-HOME.webp", "img/produtos/26-27/torcedor/PALMEIRAS/costas-home.webp", "img/produtos/26-27/torcedor/PALMEIRAS/detalhes-home.webp"], tags: ["nacional", "brasileirao", "lancamento"], link: "produto.html" },
  { id: 723, name: "Camisa Palmeiras Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PALMEIRAS/principal-AWAY.webp", images: ["img/produtos/26-27/torcedor/PALMEIRAS/principal-AWAY.webp", "img/produtos/26-27/torcedor/PALMEIRAS/costas-away.webp", "img/produtos/26-27/torcedor/PALMEIRAS/detalhes-away.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 724, name: "Camisa Peru Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PERU/principal-home.webp", images: ["img/produtos/26-27/torcedor/PERU/principal-home.webp", "img/produtos/26-27/torcedor/PERU/costas-home.webp", "img/produtos/26-27/torcedor/PERU/detalhes-home.webp"], tags: ["selecoes", "sulamericano"], link: "produto.html" },
  { id: 725, name: "Camisa Portugal Away 26/27 - Jogador", price: "R$ 159,90", image: "img/produtos/26-27/jogador/PORTUGAL/principal-jogador.webp", images: ["img/produtos/26-27/jogador/PORTUGAL/principal-jogador.webp", "img/produtos/26-27/jogador/PORTUGAL/detalhes-jogador.webp"], tags: ["selecoes", "europeus"], badge: "Jogador", link: "produto.html" },
  { id: 726, name: "Camisa Portugal Away 26/27 - Torcedor", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PORTUGAL/principal-away.webp", images: ["img/produtos/26-27/torcedor/PORTUGAL/principal-away.webp", "img/produtos/26-27/torcedor/PORTUGAL/costas-away.webp", "img/produtos/26-27/torcedor/PORTUGAL/detalhes-away.webp"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 727, name: "Camisa Real Madrid Especial 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/REAL MADRID/principal-especial.webp", images: ["img/produtos/26-27/torcedor/REAL MADRID/principal-especial.webp", "img/produtos/26-27/torcedor/REAL MADRID/costas-especial.webp", "img/produtos/26-27/torcedor/REAL MADRID/detalhes-especial.webp"], tags: ["europeus", "espanhol", "destaque"], badge: "Novo", link: "produto.html" },
  { id: 728, name: "Camisa Ucrânia Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/UCRANIA/principal-home.webp", images: ["img/produtos/26-27/torcedor/UCRANIA/principal-home.webp", "img/produtos/26-27/torcedor/UCRANIA/costas-home.webp"], tags: ["selecoes", "europeus"], link: "produto.html" },
  { id: 729, name: "Camisa Uruguai Home 26/27 - Jogador", price: "R$ 159,90", image: "img/produtos/26-27/jogador/URUGUAI/principal-jogador.webp", images: ["img/produtos/26-27/jogador/URUGUAI/principal-jogador.webp", "img/produtos/26-27/jogador/URUGUAI/costas-jogador.webp"], tags: ["selecoes", "sulamericano"], badge: "Jogador", link: "produto.html" },
  { id: 730, name: "Camisa Vasco Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/VASCO/principal-home.webp", images: ["img/produtos/26-27/torcedor/VASCO/principal-home.webp", "img/produtos/26-27/torcedor/VASCO/costas-home.webp", "img/produtos/26-27/torcedor/VASCO/detalhes-home.webp"], tags: ["nacional", "brasileirao", "destaque"], link: "produto.html" },
  { id: 731, name: "Camisa Man. United Especial 26/27", price: "R$ 159,90", image: "img/produtos/26-27/torcedor/MAN. UNITED/principal-especial.webp", images: ["img/produtos/26-27/torcedor/MAN. UNITED/principal-especial.webp", "img/produtos/26-27/torcedor/MAN. UNITED/costas-especial.webp", "img/produtos/26-27/torcedor/MAN. UNITED/detalhes-especial.webp"], tags: ["europeus", "ingles"], badge: "Exclusivo", link: "produto.html" },
  // TIMES NACIONAIS (25/26 e 26/27)
  { id: 410, name: "Camisa Athletico Paranaense Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO PARANAENSE/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/ATLETICO PARANAENSE/principal-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 400, name: "Camisa Atlético Mineiro Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 401, name: "Camisa Atlético Mineiro Away Branca", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 402, name: "Camisa Atlético Mineiro Third Preta", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-PRETA.webp", images: ["img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-PRETA.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 403, name: "Camisa Atlético Mineiro Treino", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-TREINO-PATROCINIO.png", images: ["img/produtos/25-26/torcedor/ATLETICO MINEIRO/principal-TREINO-PATROCINIO.png"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 500, name: "Camisa Bahia Home 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/BAHIA/principal-HOME.webp", images: ["img/produtos/25-26/jogador/BAHIA/principal-HOME.webp"], tags: ["nacional", "brasileirao"], badge: "Jogador", link: "produto.html" },
  { id: 501, name: "Camisa Bahia Away 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/BAHIA/principal-AWAY.webp", images: ["img/produtos/25-26/jogador/BAHIA/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], badge: "Jogador", link: "produto.html" },
  { id: 502, name: "Camisa Bahia Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BAHIA/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/BAHIA/principal-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 503, name: "Camisa Bahia Away 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BAHIA/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/BAHIA/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 504, name: "Camisa Bahia Super Man", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BAHIA/principal-SUPERMAN.webp", images: ["img/produtos/25-26/torcedor/BAHIA/principal-SUPERMAN.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 510, name: "Camisa Botafogo Home 25/26 - Jogador", price: "R$ 159,90", image: "img/produtos/25-26/jogador/BOTAFOGO/principal-HOME.webp", images: ["img/produtos/25-26/jogador/BOTAFOGO/principal-HOME.webp"], tags: ["nacional", "brasileirao"], badge: "Jogador", link: "produto.html" },
  { id: 511, name: "Camisa Botafogo Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR2.webp", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR2.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 512, name: "Camisa Botafogo Away Branca 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR6.webp", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR6.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Roxa 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR7.webp", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR7.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Amarela 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR1.webp", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR1.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Azul 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR3.webp", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR3.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Preta II 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR4.webp", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR4.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Roxa Clara 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR8.webp", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR8.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Branca 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR9.webp", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR9.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 513, name: "Camisa Botafogo Preta 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR5.webp", images: ["img/produtos/25-26/torcedor/BOTAFOGO/principal-TORCEDOR5.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 520, name: "Camisa Bragantino Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BRAGANTINO/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/BRAGANTINO/principal-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 521, name: "Camisa Bragantino Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/BRAGANTINO/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/BRAGANTINO/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 200, name: "Camisa Ceará Third 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CEARA/principal-THIRD.webp", images: ["img/produtos/25-26/torcedor/CEARA/principal-THIRD.webp", "img/produtos/25-26/torcedor/CEARA/costas-THIRD.webp", "img/produtos/25-26/torcedor/CEARA/detalhes-THIRD.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 201, name: "Camisa Ceará Torcida Organizada", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CEARA/principal-TORCIDA ORGANIZADA.webp", images: ["img/produtos/25-26/torcedor/CEARA/principal-TORCIDA ORGANIZADA.webp", "img/produtos/25-26/torcedor/CEARA/costas-TORCIDA ORGANIZADA.webp", "img/produtos/25-26/torcedor/CEARA/detalhes-TORCIDA ORGANIZADA.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 205, name: "Camisa Corinthians Especial Blackout", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.webp", images: ["img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.webp", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes2-PRETA.webp", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-PRETA.webp"], tags: ["nacional", "destaque"], badge: "Black", link: "produto.html" },
  { id: 206, name: "Camisa Corinthians Especial 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-ESPECIAL.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-ESPECIAL.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-ESPECIAL.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-ESPECIAL.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 207, name: "Camisa Corinthians Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-HOME.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-HOME.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 208, name: "Camisa Corinthians Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-SEGUNDA CAMISA.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-SEGUNDA CAMISA.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-SEGUNDA CAMISA.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-SEGUNDA CAMISA.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 209, name: "Camisa Corinthians Treino Roxa 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO ROXA.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO ROXA.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-TREINO ROXA.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-TREINO ROXA.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 210, name: "Camisa Corinthians Treino 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-TREINO.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-TREINO.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 630, name: "Camisa Cruzeiro Third 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-3.webp", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-3.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 631, name: "Camisa Cruzeiro Away Branca 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 632, name: "Camisa Cruzeiro Third 25/26 (Com Patrocínio)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-3-PATROCINIO.png", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-3-PATROCINIO.png"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 633, name: "Camisa Cruzeiro Away 25/26 (Com Patrocínio)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-AWAY-PATROCINIO.png", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-AWAY-PATROCINIO.png"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 634, name: "Camisa Cruzeiro Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-HOME.png", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-HOME.png"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 635, name: "Camisa Cruzeiro Home 25/26 (Com Patrocínio)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-HOME-PATROCINIO.png", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-HOME-PATROCINIO.png"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 636, name: "Camisa Cruzeiro Especial Cinza 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-CINZA.webp", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-CINZA.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 637, name: "Camisa Cruzeiro Treino Verde Raposa", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-RAPOSA.webp", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-RAPOSA.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 638, name: "Camisa Cruzeiro Treino Menta Raposa", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CRUZEIRO/principal-RAPOSA2.webp", images: ["img/produtos/25-26/torcedor/CRUZEIRO/principal-RAPOSA2.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 530, name: "Camisa Cruzeiro Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/CRUZEIRO/principal-HOME.webp", images: ["img/produtos/26-27/torcedor/CRUZEIRO/principal-HOME.webp"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  { id: 210, name: "Camisa Flamengo Especial Geométrica", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-ESPECIAL.webp", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-ESPECIAL.webp", "img/produtos/25-26/torcedor/FLAMENGO/costas-ESPECIAL.webp", "img/produtos/25-26/torcedor/FLAMENGO/detalhes-ESPECIAL.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 211, name: "Camisa Flamengo Goleiro 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-GOLEIRO.webp", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-GOLEIRO.webp", "img/produtos/25-26/torcedor/FLAMENGO/costas-GOLEIRO.webp", "img/produtos/25-26/torcedor/FLAMENGO/detalhes1-GOLEIRO.webp"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 212, name: "Camisa Flamengo Home 25/26 (Com Patrocínio)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-HOME+PATROCINIO.webp", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-HOME+PATROCINIO.webp", "img/produtos/25-26/torcedor/FLAMENGO/costas-HOME+PATROCINIO.webp", "img/produtos/25-26/torcedor/FLAMENGO/detalhes-HOME+PATROCINIO.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 213, name: "Camisa Flamengo Home 25/26 (Limpa)", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-HOME.webp", "img/produtos/25-26/torcedor/FLAMENGO/costas-HOME.webp", "img/produtos/25-26/torcedor/FLAMENGO/detalhes2-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 214, name: "Camisa Flamengo Treino Azul Claro", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-TREINO1.webp", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-TREINO1.webp", "img/produtos/25-26/torcedor/FLAMENGO/costas-TREINO1.webp", "img/produtos/25-26/torcedor/FLAMENGO/detalhes-TREINO1.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 215, name: "Camisa Flamengo Treino Azul Escuro", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLAMENGO/principal-TREINO.webp", images: ["img/produtos/25-26/torcedor/FLAMENGO/principal-TREINO.webp", "img/produtos/25-26/torcedor/FLAMENGO/costas-TREINO.webp", "img/produtos/25-26/torcedor/FLAMENGO/detalhes-TREINO.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 640, name: "Camisa Flamengo Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLAMENGO/principal-HOME.webp", images: ["img/produtos/26-27/torcedor/FLAMENGO/principal-HOME.webp"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  //{ id: 641, name: "Camisa Flamengo Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLAMENGO/principal-AWAY.webp", images: ["img/produtos/26-27/torcedor/FLAMENGO/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  { id: 642, name: "Camisa Flamengo Away II 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/FLAMENGO/principal-AWAY2.webp", images: ["img/produtos/26-27/torcedor/FLAMENGO/principal-AWAY2.webp"], tags: ["nacional", "destaque"], badge: "Futuro", link: "produto.html" },
  { id: 650, name: "Camisa Fluminense Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLUMINENSE/principal-HOME.png", images: ["img/produtos/25-26/torcedor/FLUMINENSE/principal-HOME.png"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 651, name: "Camisa Fluminense Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/jogador/FLUMINENSE/principal-AWAY.webp", images: ["img/produtos/25-26/jogador/FLUMINENSE/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 652, name: "Camisa Fluminense Feminina", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FLUMINENSE/principal-FEMININA.png", images: ["img/produtos/25-26/torcedor/FLUMINENSE/principal-FEMININA.png"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 216, name: "Camisa Fortaleza Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/FORTALEZA/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/FORTALEZA/principal-AWAY.webp", "img/produtos/25-26/torcedor/FORTALEZA/costas-AWAY.webp", "img/produtos/25-26/torcedor/FORTALEZA/detalhes-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 660, name: "Camisa Grêmio Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/GREMIO/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/GREMIO/principal-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 661, name: "Camisa Grêmio Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/GREMIO/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/GREMIO/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 232, name: "Camisa Internacional Casual 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/INTERNACIONAL/principal-CASUAL.webp", images: ["img/produtos/25-26/torcedor/INTERNACIONAL/principal-CASUAL.webp", "img/produtos/25-26/torcedor/INTERNACIONAL/costas-CASUAL.webp", "img/produtos/25-26/torcedor/INTERNACIONAL/detalhes-CASUAL.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 233, name: "Camisa Internacional Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/INTERNACIONAL/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/INTERNACIONAL/principal-HOME.webp", "img/produtos/25-26/torcedor/INTERNACIONAL/costas-HOME.webp", "img/produtos/25-26/torcedor/INTERNACIONAL/detalhes-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 234, name: "Camisa Internacional Polo 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/INTERNACIONAL/principal-POLO.webp", images: ["img/produtos/25-26/torcedor/INTERNACIONAL/principal-POLO.webp", "img/produtos/25-26/torcedor/INTERNACIONAL/costas-POLO.webp", "img/produtos/25-26/torcedor/INTERNACIONAL/detalhes-POLO.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 235, name: "Camisa Internacional Treino Cinza 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/INTERNACIONAL/principal-BRANCA.webp", images: ["img/produtos/25-26/torcedor/INTERNACIONAL/principal-BRANCA.webp", "img/produtos/25-26/torcedor/INTERNACIONAL/costas-BRANCA.webp", "img/produtos/25-26/torcedor/INTERNACIONAL/detalhes-BRANCA.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 221, name: "Camisa Palmeiras Branca Total 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/PALMEIRAS/principal-BRANCA TOTAL.webp", images: ["img/produtos/25-26/torcedor/PALMEIRAS/principal-BRANCA TOTAL.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 222, name: "Camisa Palmeiras Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/PALMEIRAS/principal-BRANCA.webp", images: ["img/produtos/25-26/torcedor/PALMEIRAS/principal-BRANCA.webp", "img/produtos/25-26/torcedor/PALMEIRAS/costas-BRANCA.webp", "img/produtos/25-26/torcedor/PALMEIRAS/detalhes-BRANCA.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 223, name: "Camisa Palmeiras Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/PALMEIRAS/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/PALMEIRAS/principal-HOME.webp", "img/produtos/25-26/torcedor/PALMEIRAS/costas-HOME.webp", "img/produtos/25-26/torcedor/PALMEIRAS/detalhes-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 670, name: "Camisa Palmeiras Home 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PALMEIRAS/principal-HOME.webp", images: ["img/produtos/26-27/torcedor/PALMEIRAS/principal-HOME.webp"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  { id: 671, name: "Camisa Palmeiras Away 26/27", price: "R$ 129,90", image: "img/produtos/26-27/torcedor/PALMEIRAS/principal-AWAY.webp", images: ["img/produtos/26-27/torcedor/PALMEIRAS/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], badge: "Futuro", link: "produto.html" },
  { id: 672, name: "Camisa Palmeiras Amarela 25/26", price: "R$ 129,90", image: "img/produtos/25-26/jogador/PALMEIRAS/principal-AMARELA.webp", images: ["img/produtos/25-26/jogador/PALMEIRAS/principal-AMARELA.webp"], tags: ["nacional", "destaque"], badge: "Jogador", link: "produto.html" },
  { id: 224, name: "Camisa Paysandu Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/PAYSANDU/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/PAYSANDU/principal-HOME.webp", "img/produtos/25-26/torcedor/PAYSANDU/costas-HOME.webp", "img/produtos/25-26/torcedor/PAYSANDU/detalhes-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 228, name: "Camisa Remo Especial 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/REMO/principal-ESPECIAL.webp", images: ["img/produtos/25-26/torcedor/REMO/principal-ESPECIAL.webp", "img/produtos/25-26/torcedor/REMO/costas-ESPECIAL.webp", "img/produtos/25-26/torcedor/REMO/detalhes-ESPECIAL.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 229, name: "Camisa Santa Cruz Feminina 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SANTA CRUZ/principal-FEMININA.webp", images: ["img/produtos/25-26/torcedor/SANTA CRUZ/principal-FEMININA.webp", "img/produtos/25-26/torcedor/SANTA CRUZ/costas-FEMININA.webp", "img/produtos/25-26/torcedor/SANTA CRUZ/detalhes-FEMININA.webp"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 101, name: "Camisa Santos Home Neymar", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SANTOS/principal-NEYMAR 10.webp", images: ["img/produtos/25-26/torcedor/SANTOS/principal-NEYMAR 10.webp", "img/produtos/25-26/torcedor/SANTOS/costas-NEYMAR 10.webp", "img/produtos/25-26/torcedor/SANTOS/detalhes-NEYMAR 10.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 680, name: "Camisa Santos Home Listrada", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SANTOS/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/SANTOS/principal-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 681, name: "Camisa Santos Azul 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SANTOS/principal-AZUL.webp", images: ["img/produtos/25-26/torcedor/SANTOS/principal-AZUL.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 128, name: "Camisa São Paulo Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SAO PAULO/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/SAO PAULO/principal-HOME.webp", "img/produtos/25-26/torcedor/SAO PAULO/costas-HOME.webp", "img/produtos/25-26/torcedor/SAO PAULO/detalhes-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 690, name: "Camisa São Paulo Home 25/26 - Torcedor", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SAO PAULO/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/SAO PAULO/principal-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 691, name: "Camisa São Paulo Away Listrada 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SAO PAULO/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/SAO PAULO/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 692, name: "Camisa São Paulo Feminina Home", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/SAO PAULO/HOME FEMININA.webp", images: ["img/produtos/25-26/torcedor/SAO PAULO/HOME FEMININA.webp"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 236, name: "Camisa Tigres Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/TIGRES/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/TIGRES/principal-HOME.webp", "img/produtos/25-26/torcedor/TIGRES/costas-HOME.webp", "img/produtos/25-26/torcedor/TIGRES/detalhes-HOME.webp"], tags: ["internacional", "destaque"], link: "produto.html" },
  { id: 540, name: "Camisa Vitória Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/VITORIA/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/VITORIA/principal-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 541, name: "Camisa Vitória Away 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/VITORIA/principal-AWAY.webp", images: ["img/produtos/25-26/torcedor/VITORIA/principal-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },

  // TEMPORADA 24/25 (RESTORED FULL LIST)
  { id: 30, name: "Camisa Al-Hilal Home 24/25 - Puma", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/AL-HILAL/principal.webp", images: ["img/produtos/24-25/torcedor/AL-HILAL/principal.webp", "img/produtos/24-25/torcedor/AL-HILAL/costas.webp", "img/produtos/24-25/torcedor/AL-HILAL/detalhes.webp"], tags: ["internacional", "saudita"], badge: "Neymar", link: "produto.html" },
  { id: 31, name: "Camisa Arsenal Home 24/25 - Adidas", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ARSENAL/principal.webp", images: ["img/produtos/24-25/torcedor/ARSENAL/principal.webp", "img/produtos/24-25/torcedor/ARSENAL/costas.webp", "img/produtos/24-25/torcedor/ARSENAL/detalhes.webp"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 32, name: "Camisa Atalanta Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATALANTA/principal.webp", images: ["img/produtos/24-25/torcedor/ATALANTA/principal.webp", "img/produtos/24-25/torcedor/ATALANTA/detalhes.webp", "img/produtos/24-25/torcedor/ATALANTA/detalhes2.webp"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 33, name: "Camisa Atlético de Madrid Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/principal.webp", images: ["img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/principal.webp", "img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/detalhes.webp", "img/produtos/24-25/torcedor/ATLÉTICO DE MADRID/detalhes2.webp"], tags: ["europeus", "espanhol"], link: "produto.html" },
  { id: 411, name: "Camisa Athletico Paranaense Feminina Dourada", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATLETICO PARANAENSE/principal-FEMININA.webp", images: ["img/produtos/24-25/torcedor/ATLETICO PARANAENSE/principal-FEMININA.webp"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 411, name: "Camisa Athletico Paranaense Feminina Classica", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ATLETICO PARANAENSE/principal-FEMININA2.webp", images: ["img/produtos/24-25/torcedor/ATLETICO PARANAENSE/principal-FEMININA2.webp"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 40, name: "Camisa Barcelona Edição Especial 304", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BARCELONA/principal-EDICAO ESPECIAL .webp", images: ["img/produtos/24-25/torcedor/BARCELONA/principal-EDICAO ESPECIAL .webp", "img/produtos/24-25/torcedor/BARCELONA/costas-EDICAO ESPECIAL.webp", "img/produtos/24-25/torcedor/BARCELONA/detalhes-EDICAO ESPECIAL .webp"], tags: ["europeus", "destaque"], badge: "Exclusivo", link: "produto.html" },
  { id: 41, name: "Camisa Barcelona Away Preta Spotify", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BARCELONA/principal-SPOTIFY PRETA -.webp", images: ["img/produtos/24-25/torcedor/BARCELONA/principal-SPOTIFY PRETA -.webp", "img/produtos/24-25/torcedor/BARCELONA/costas-SPOTIFY PRETA .webp", "img/produtos/24-25/torcedor/BARCELONA/detalhes-SPOTIFY PRETA .webp"], tags: ["europeus", "lancamento"], link: "produto.html" },
  { id: 42, name: "Camisa Bayer Leverkusen Away Branca", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/princial-BRANCa.webp", images: ["img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/princial-BRANCa.webp", "img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/costas-BRANCA.webp", "img/produtos/24-25/torcedor/BAYERN LEVERKUSEN/detalhes-BRANCA.webp"], tags: ["europeus", "alemao"], link: "produto.html" },
  { id: 43, name: "Camisa Betis Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BETIS/principal-HOME.webp", images: ["img/produtos/24-25/torcedor/BETIS/principal-HOME.webp", "img/produtos/24-25/torcedor/BETIS/detalhes-HOME.webp", "img/produtos/24-25/torcedor/BETIS/detalhes2-HOME.webp"], tags: ["europeus", "espanhol"], link: "produto.html" },
  { id: 44, name: "Camisa Boca Juniors Away Branca", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BOCA JUNIORS/principal-BRANCA.webp", images: ["img/produtos/24-25/torcedor/BOCA JUNIORS/principal-BRANCA.webp", "img/produtos/24-25/torcedor/BOCA JUNIORS/costas-BRANCA.webp", "img/produtos/24-25/torcedor/BOCA JUNIORS/detalhes-BRANCA.webp"], tags: ["internacional", "sulamericano"], link: "produto.html" },
  { id: 50, name: "Camisa Botafogo Home - Patch Libertadores", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BOTAFOGO/principal-HOME+PATCH-LIBERTADORES.webp", images: ["img/produtos/24-25/torcedor/BOTAFOGO/principal-HOME+PATCH-LIBERTADORES.webp", "img/produtos/24-25/torcedor/BOTAFOGO/costas-HOME+PATCH-LIBERTADORES.webp", "img/produtos/24-25/torcedor/BOTAFOGO/detalhes-HOME+PATCH-LIBERTADORES.webp"], tags: ["nacional", "brasileirao"], badge: "Libertadores", link: "produto.html" },
  { id: 51, name: "Camisa Botafogo Goleiro Roxa", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BOTAFOGO/principal-ROXA.webp", images: ["img/produtos/24-25/torcedor/BOTAFOGO/principal-ROXA.webp", "img/produtos/24-25/torcedor/BOTAFOGO/costas-ROXA.webp", "img/produtos/24-25/torcedor/BOTAFOGO/detalhes-ROXA.webp"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 52, name: "Camisa Brighton Away Amarela", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/BRIGHTON/principal-AWAY.webp", images: ["img/produtos/24-25/torcedor/BRIGHTON/principal-AWAY.webp", "img/produtos/24-25/torcedor/BRIGHTON/costas-AWAY.webp", "img/produtos/24-25/torcedor/BRIGHTON/detalhes-AWAY.webp"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 60, name: "Camisa Chelsea Away Branca 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CHELSEA/principal-BRANCA.webp", images: ["img/produtos/24-25/torcedor/CHELSEA/principal-BRANCA.webp", "img/produtos/24-25/torcedor/CHELSEA/costas-BRANCA.webp", "img/produtos/24-25/torcedor/CHELSEA/detalhes-BRANCA.webp"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 61, name: "Camisa Chelsea Treino Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CHELSEA/principal-PRETA.webp", images: ["img/produtos/24-25/torcedor/CHELSEA/principal-PRETA.webp", "img/produtos/24-25/torcedor/CHELSEA/costas-PRETA.webp", "img/produtos/24-25/torcedor/CHELSEA/detalhes-PRETA.webp"], tags: ["europeus", "treino"], link: "produto.html" },
  { id: 65, name: "Camisa Colômbia Edição Especial", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/COLOMBIA/principal-EDICAO ESPECIAL.webp", images: ["img/produtos/24-25/torcedor/COLOMBIA/principal-EDICAO ESPECIAL.webp", "img/produtos/24-25/torcedor/COLOMBIA/costas-EDICAO ESPECIAL.webp", "img/produtos/24-25/torcedor/COLOMBIA/detalhes-EDICAO ESPECIAL.webp"], tags: ["selecoes", "destaque"], badge: "Centenário", link: "produto.html" },
  { id: 66, name: "Camisa Coreia do Sul Home Vermelha", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/COREA DO SUL/principal-VERMELHA.webp", images: ["img/produtos/24-25/torcedor/COREA DO SUL/principal-VERMELHA.webp", "img/produtos/24-25/torcedor/COREA DO SUL/costas-VERMELHA.webp", "img/produtos/24-25/torcedor/COREA DO SUL/detalhes-VERMELHA.webp"], tags: ["selecoes", "asiatico"], link: "produto.html" },
  { id: 67, name: "Camisa Coreia do Sul Away Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/COREA DO SUL/principal-PRETA.webp", images: ["img/produtos/24-25/torcedor/COREA DO SUL/principal-PRETA.webp", "img/produtos/24-25/torcedor/COREA DO SUL/costas-PRETA.webp", "img/produtos/24-25/torcedor/COREA DO SUL/detalhes-PRETA.webp"], tags: ["selecoes"], link: "produto.html" },
  { id: 70, name: "Camisa Corinthians Home Feminina 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-HOME FEMININA.webp", images: ["img/produtos/24-25/torcedor/CORINTHIANS/detalhes-HOME FEMININA.webp", "img/produtos/24-25/torcedor/CORINTHIANS/costas-HOME FEMININA.webp", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-HOME FEMININA.webp"], tags: ["nacional", "feminina"], badge: "Feminina", link: "produto.html" },
  { id: 71, name: "Camisa Corinthians III 24/25 - Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.webp", images: ["img/produtos/24-25/torcedor/CORINTHIANS/principal-PRETA.webp", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes-PRETA.webp", "img/produtos/24-25/torcedor/CORINTHIANS/detalhes2-PRETA.webp"], tags: ["nacional", "lancamento"], badge: "Antirracista", link: "produto.html" },
  { id: 206, name: "Camisa Corinthians Home 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-HOME.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-HOME.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-HOME.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 207, name: "Camisa Corinthians II 25/26", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-SEGUNDA CAMISA.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-SEGUNDA CAMISA.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-SEGUNDA CAMISA.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-SEGUNDA CAMISA.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 208, name: "Camisa Corinthians Treino Roxa", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO ROXA.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO ROXA.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-TREINO ROXA.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-TREINO ROXA.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 209, name: "Camisa Corinthians Treino Cinza", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-TREINO.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-TREINO.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-TREINO.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 210, name: "Camisa Corinthians Especial Blackout", price: "R$ 129,90", image: "img/produtos/25-26/torcedor/CORINTHIANS/principal-ESPECIAL.webp", images: ["img/produtos/25-26/torcedor/CORINTHIANS/principal-ESPECIAL.webp", "img/produtos/25-26/torcedor/CORINTHIANS/costas-ESPECIAL.webp", "img/produtos/25-26/torcedor/CORINTHIANS/detalhes-ESPECIAL.webp"], tags: ["nacional", "especial"], link: "produto.html" },
  { id: 80, name: "Camisa Flamengo Goleiro Amarela 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principla-GOLEIRO.webp", images: ["img/produtos/24-25/torcedor/FLAMENGO/principla-GOLEIRO.webp", "img/produtos/24-25/torcedor/FLAMENGO/costas-GOLEIRO.webp", "img/produtos/24-25/torcedor/FLAMENGO/detalhesGOLEIRO.webp"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 81, name: "Camisa Flamengo Identidade Marrom", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-IDENTIDADE MARROM.webp", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-IDENTIDADE MARROM.webp", "img/produtos/24-25/torcedor/FLAMENGO/costas-IDENTIDADE MARROM.webp", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-IDENTIDADE MARROM.webp"], tags: ["nacional", "destaque"], badge: "Black", link: "produto.html" },
  { id: 82, name: "Camisa Flamengo Lifestyler Feminina", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER FEMININA.webp", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER FEMININA.webp", "img/produtos/24-25/torcedor/FLAMENGO/costas-LIFESTYLER FEMININA.webp", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-LIFESTYLER FEMININA.webp"], tags: ["nacional", "feminina"], link: "produto.html" },
  { id: 83, name: "Camisa Flamengo Lifestyler Masculina", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER.webp", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-LIFESTYLER.webp", "img/produtos/24-25/torcedor/FLAMENGO/costas-LIFESTYLER.webp", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-LIFESTYLER.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 84, name: "Camisa Flamengo Treino Azul", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FLAMENGO/principal-TREINO.webp", images: ["img/produtos/24-25/torcedor/FLAMENGO/principal-TREINO.webp", "img/produtos/24-25/torcedor/FLAMENGO/costas-TREINO.webp", "img/produtos/24-25/torcedor/FLAMENGO/detalhes-TREINO.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 90, name: "Camisa Fortaleza Away 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/FORTALEZA/principal-FORTALEZA AWAY.webp", images: ["img/produtos/24-25/torcedor/FORTALEZA/principal-FORTALEZA AWAY.webp", "img/produtos/24-25/torcedor/FORTALEZA/costas-FORTALEZA AWAY.webp", "img/produtos/24-25/torcedor/FORTALEZA/detalhes-FORTALEZA AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 91, name: "Camisa Japão Away 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JAPÃO/principal-AWAY.webp", images: ["img/produtos/24-25/torcedor/JAPÃO/principal-AWAY.webp", "img/produtos/24-25/torcedor/JAPÃO/costas-AWAY.webp", "img/produtos/24-25/torcedor/JAPÃO/detalhes-AWAY.webp"], tags: ["selecoes", "asiatico"], link: "produto.html" },
  { id: 92, name: "Camisa Japão Treino Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JAPÃO/principal-PRETA.webp", images: ["img/produtos/24-25/torcedor/JAPÃO/principal-PRETA.webp", "img/produtos/24-25/torcedor/JAPÃO/costas-PRETA.webp", "img/produtos/24-25/torcedor/JAPÃO/detalhes-PRETA.webp"], tags: ["selecoes", "treino"], link: "produto.html" },
  { id: 93, name: "Camisa Juventus Lifestyle", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JUVENTUS/principal-LIFESTYLE.webp", images: ["img/produtos/24-25/torcedor/JUVENTUS/principal-LIFESTYLE.webp", "img/produtos/24-25/torcedor/JUVENTUS/costas-LIFESTYLE.webp", "img/produtos/24-25/torcedor/JUVENTUS/detalhes-LIFESTYLE.webp"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 94, name: "Camisa Juventus da Mooca Home", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/principal-HOME.webp", images: ["img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/principal-HOME.webp", "img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/costas-HOME.webp", "img/produtos/24-25/torcedor/JUVENTUS DA MOOCA/detalhes-HOME.webp"], tags: ["nacional", "classico"], link: "produto.html" },
  { id: 95, name: "Camisa Liverpool Pré-Jogo Vermelha", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/LIVERPOOL/principal-PRE JOGO VERMELHA.webp", images: ["img/produtos/24-25/torcedor/LIVERPOOL/principal-PRE JOGO VERMELHA.webp", "img/produtos/24-25/torcedor/LIVERPOOL/costas-PRE JOGO VERMELHA.webp", "img/produtos/24-25/torcedor/LIVERPOOL/detalhes-PRE JOGO VERMELHA.webp"], tags: ["europeus", "ingles"], link: "produto.html" },
  { id: 96, name: "Camisa MILAN 125 Anos Curta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/MILAN/principal-125 ANOS CURTA.webp", images: ["img/produtos/24-25/torcedor/MILAN/principal-125 ANOS CURTA.webp", "img/produtos/24-25/torcedor/MILAN/costas-125 ANOS CURTA.webp", "img/produtos/24-25/torcedor/MILAN/detalhes-125 ANOS CURTA.webp"], tags: ["europeus", "italiano"], badge: "Comemorativa", link: "produto.html" },
  { id: 97, name: "Camisa MILAN Third 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/MILAN/principal-THIRD.webp", images: ["img/produtos/24-25/torcedor/MILAN/principal-THIRD.webp", "img/produtos/24-25/torcedor/MILAN/costas-THIRD.webp", "img/produtos/24-25/torcedor/MILAN/detalhes-THIRD.webp"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 98, name: "Camisa Paysandu Away 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/PAYSANDU/principal-AWAY.webp", images: ["img/produtos/24-25/torcedor/PAYSANDU/principal-AWAY.webp", "img/produtos/24-25/torcedor/PAYSANDU/costas-AWAY.webp", "img/produtos/24-25/torcedor/PAYSANDU/detalhes-AWAY.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 99, name: "Camisa Peñarol Home", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/PEÑAROL/principal-HOME.webp", images: ["img/produtos/24-25/torcedor/PEÑAROL/principal-HOME.webp", "img/produtos/24-25/torcedor/PEÑAROL/costas-HOME.webp", "img/produtos/24-25/torcedor/PEÑAROL/detalhes-HOME.webp"], tags: ["internacional", "sulamericano"], link: "produto.html" },
  { id: 100, name: "Camisa Roma Branca com Laranja", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/ROMA/principal-BRANCA COM LARANJA.webp", images: ["img/produtos/24-25/torcedor/ROMA/principal-BRANCA COM LARANJA.webp", "img/produtos/24-25/torcedor/ROMA/costas-BRANCA COM LARANJA.webp", "img/produtos/24-25/torcedor/ROMA/detalhes-BRANCA COM LARANJA.webp"], tags: ["europeus", "italiano"], link: "produto.html" },
  { id: 101, name: "Camisa Santos Home 24/25", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SANTOS/principal-HOME.webp", images: ["img/produtos/24-25/torcedor/SANTOS/principal-HOME.webp", "img/produtos/24-25/torcedor/SANTOS/costas-HOME.webp", "img/produtos/24-25/torcedor/SANTOS/detalhes-HOME.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 102, name: "Camisa Santos Laranja (Goleiro/Treino)", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SANTOS/principal-LARANJA.webp", images: ["img/produtos/24-25/torcedor/SANTOS/principal-LARANJA.webp", "img/produtos/24-25/torcedor/SANTOS/costas-LARANJA.webp", "img/produtos/24-25/torcedor/SANTOS/detalhes-LARANJA.webp"], tags: ["nacional", "goleiro"], link: "produto.html" },
  { id: 103, name: "Camisa Santos Treino Azul", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SANTOS/principal-TREINO.webp", images: ["img/produtos/24-25/torcedor/SANTOS/principal-TREINO.webp", "img/produtos/24-25/torcedor/SANTOS/costas-TREINO.webp", "img/produtos/24-25/torcedor/SANTOS/detalhes-TREINO.webp"], tags: ["nacional", "treino"], link: "produto.html" },
  { id: 104, name: "Camisa Sport Recife Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SPORT/principal-PRETA.webp", images: ["img/produtos/24-25/torcedor/SPORT/principal-PRETA.webp", "img/produtos/24-25/torcedor/SPORT/costas-PRETA.webp", "img/produtos/24-25/torcedor/SPORT/detalhes-PRETA.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 105, name: "Camisa Sport Recife Third Vermelha", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/SPORT/principal-THIRD.webp", images: ["img/produtos/24-25/torcedor/SPORT/principal-THIRD.webp", "img/produtos/24-25/torcedor/SPORT/costas-THIRD.webp", "img/produtos/24-25/torcedor/SPORT/detalhes-THIRD.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 106, name: "Camisa Vasco Third 24/25 - Preta", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/VASCO/principal-THIRD PRETA.webp", images: ["img/produtos/24-25/torcedor/VASCO/principal-THIRD PRETA.webp", "img/produtos/24-25/torcedor/VASCO/costas-THIRD.webp", "img/produtos/24-25/torcedor/VASCO/detalhes-THIRD PRETA.webp"], tags: ["nacional", "brasileirao"], link: "produto.html" },
  { id: 107, name: "Camisa Vasco Off-White Diagonais", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/VASCO/principal-THIRD.webp", images: ["img/produtos/24-25/torcedor/VASCO/principal-THIRD.webp", "img/produtos/24-25/torcedor/VASCO/costas-THIRD.webp", "img/produtos/24-25/torcedor/VASCO/detalhes-THIRD.webp"], tags: ["nacional", "destaque"], link: "produto.html" },
  { id: 108, name: "Camisa Vasco Pré-Jogo Branca", price: "R$ 129,90", image: "img/produtos/24-25/torcedor/VASCO/principal-PRÉ JOGO.webp", images: ["img/produtos/24-25/torcedor/VASCO/principal-PRÉ JOGO.webp", "img/produtos/24-25/torcedor/VASCO/detalhes-PRÉ JOGO.webp"], tags: ["nacional", "treino"], link: "produto.html" },

  // RETRÔ (R$ 179,90)
  { id: 300, name: "Camisa Alemanha 1998 Retrô", price: "R$ 179,90", image: "img/produtos/retro/ALEMANHA/principal-1998.webp", images: ["img/produtos/retro/ALEMANHA/principal-1998.webp", "img/produtos/retro/ALEMANHA/costas-1998.webp", "img/produtos/retro/ALEMANHA/detalhes-1998.webp"], tags: ["retro", "selecoes", "europeus"], link: "produto.html" },
  { id: 301, name: "Camisa Alemanha 2014 Özil", price: "R$ 179,90", image: "img/produtos/retro/ALEMANHA/principal-OZIL-2014.webp", images: ["img/produtos/retro/ALEMANHA/principal-OZIL-2014.webp", "img/produtos/retro/ALEMANHA/costas-OZIL-2014.webp", "img/produtos/retro/ALEMANHA/detalhes-OZIL-2014.webp", "img/produtos/retro/ALEMANHA/detalhes1-OZIL-2014.webp"], tags: ["retro", "selecoes", "europeus"], badge: "7x1", link: "produto.html" },
  { id: 302, name: "Camisa Atl. Madrid F. Torres", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO DE MADRID/principal-FERNANDO TORRES.webp", images: ["img/produtos/retro/ATLETICO DE MADRID/principal-FERNANDO TORRES.webp", "img/produtos/retro/ATLETICO DE MADRID/costas-FERNANDO TORRES.webp", "img/produtos/retro/ATLETICO DE MADRID/detalhes-FERNANDO TORRES.webp"], tags: ["retro", "europeus", "espanhol"], link: "produto.html" },
  { id: 303, name: "Camisa Barcelona 10/11 Home", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-BARCELONA HOME-10_11.webp", images: ["img/produtos/retro/BARCELONA/principal-BARCELONA HOME-10_11.webp", "img/produtos/retro/BARCELONA/costas-BARCELONA HOME-10_11.webp", "img/produtos/retro/BARCELONA/detalhes-BARCELONA HOME-10_11.webp"], tags: ["retro", "europeus", "espanhol"], badge: "Pep Team", link: "produto.html" },
  { id: 304, name: "Camisa Barcelona 16/17 Neymar", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-NEYMAR-16_17.webp", images: ["img/produtos/retro/BARCELONA/principal-NEYMAR-16_17.webp", "img/produtos/retro/BARCELONA/costas-NEYMAR-16_17.webp", "img/produtos/retro/BARCELONA/detalhes-NEYMAR-16_17.webp"], tags: ["retro", "europeus", "espanhol"], link: "produto.html" },
  { id: 305, name: "Camisa Barcelona 2010 Ronaldinho", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-RONALDINHO - 2010.webp", images: ["img/produtos/retro/BARCELONA/principal-RONALDINHO - 2010.webp", "img/produtos/retro/BARCELONA/costas-RONALDINHO - 2010.webp", "img/produtos/retro/BARCELONA/detalhes-RONALDINHO - 2010.webp"], tags: ["retro", "europeus", "espanhol"], badge: "R10", link: "produto.html" },
  { id: 306, name: "Camisa Barcelona 03/04 Away", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-AWAY - 03_04.webp", images: ["img/produtos/retro/BARCELONA/principal-AWAY - 03_04.webp", "img/produtos/retro/BARCELONA/detalhes-AWAY - 03_04.webp", "img/produtos/retro/BARCELONA/detalhes2-AWAY - 03_04.webp"], tags: ["retro", "europeus", "espanhol"], link: "produto.html" },
  { id: 307, name: "Camisa Barcelona 16/17 Roxa Messi", price: "R$ 179,90", image: "img/produtos/retro/BARCELONA/principal-ROXA - MESSI - 16_17.webp", images: ["img/produtos/retro/BARCELONA/principal-ROXA - MESSI - 16_17.webp", "img/produtos/retro/BARCELONA/detalhes-ROXA - MESSI - 16_17.webp", "img/produtos/retro/BARCELONA/detalhes1-ROXA - MESSI - 16_17.webp"], tags: ["retro", "europeus", "espanhol"], badge: "Messi", link: "produto.html" },
  { id: 308, name: "Camisa Bayern 13/14 Home", price: "R$ 179,90", image: "img/produtos/retro/BAYERN/principal-HOME 13_14.webp", images: ["img/produtos/retro/BAYERN/principal-HOME 13_14.webp", "img/produtos/retro/BAYERN/costas-HOME 13_14.webp", "img/produtos/retro/BAYERN/detalhes-HOME 13_14.webp"], tags: ["retro", "europeus", "alemao"], link: "produto.html" },
  { id: 309, name: "Camisa Brasil 2002 Ronaldo", price: "R$ 179,90", image: "img/produtos/retro/BRASIL/principal-RONALDO_2002.webp", images: ["img/produtos/retro/BRASIL/principal-RONALDO_2002.webp", "img/produtos/retro/BRASIL/costas-RONALDO_2002.webp", "img/produtos/retro/BRASIL/detalhes-RONALDO_2002.webp", "img/produtos/retro/BRASIL/detalhes1-RONALDO_2002.webp"], tags: ["retro", "selecoes", "destaque"], badge: "Penta", link: "produto.html" },
  //  { id: 314, name: "Camisa França 1998 Zidane", price: "R$ 179,90", image: "img/produtos/retro/FRANÇA/principal-ZIDANE.webp", images: ["img/produtos/retro/FRANÇA/principal-ZIDANE.webp", "img/produtos/retro/FRANÇA/costas-ZIDANE.webp", "img/produtos/retro/FRANÇA/detalhes-ZIDANE.webp"], tags: ["retro", "selecoes"], badge: "Campeã 98", link: "produto.html" },
  //  { id: 315, name: "Camisa Inglaterra 1994 Retrô", price: "R$ 179,90", image: "img/produtos/retro/INGLATERRA/principal-1994.webp", images: ["img/produtos/retro/INGLATERRA/principal-1994.webp", "img/produtos/retro/INGLATERRA/costas-1994.webp", "img/produtos/retro/INGLATERRA/detalhes-1994.webp"], tags: ["retro", "selecoes"], link: "produto.html" },
  //  { id: 316, name: "Camisa Inglaterra 1998 Retrô", price: "R$ 179,90", image: "img/produtos/retro/INGLATERRA/principal-1998.webp", images: ["img/produtos/retro/INGLATERRA/principal-1998.webp", "img/produtos/retro/INGLATERRA/costas-1998.webp", "img/produtos/retro/INGLATERRA/detalhes-1998.webp"], tags: ["retro", "selecoes"], link: "produto.html" },
  { id: 317, name: "Camisa Inter de Milão 2010", price: "R$ 179,90", image: "img/produtos/retro/INTER DE MILÃO/principal-2010.webp", images: ["img/produtos/retro/INTER DE MILÃO/principal-2010.webp", "img/produtos/retro/INTER DE MILÃO/detalhes-2010.webp"], tags: ["retro", "europeus", "italiano"], link: "produto.html" },
  { id: 318, name: "Camisa Inter 2010 Sneijder", price: "R$ 179,90", image: "img/produtos/retro/INTER DE MILÃO/principal-SNEIJDER 10.webp", images: ["img/produtos/retro/INTER DE MILÃO/principal-SNEIJDER 10.webp", "img/produtos/retro/INTER DE MILÃO/costas-SNEIJDER 10.webp", "img/produtos/retro/INTER DE MILÃO/detalhes-SNEIJDER 10.webp"], tags: ["retro", "europeus", "italiano"], link: "produto.html" },
  { id: 319, name: "Camisa Inter 2010 Eto'o", price: "R$ 179,90", image: "img/produtos/retro/INTER DE MILÃO/principal-ETO-9.webp", images: ["img/produtos/retro/INTER DE MILÃO/principal-ETO-9.webp", "img/produtos/retro/INTER DE MILÃO/costas-ETO-9.webp", "img/produtos/retro/INTER DE MILÃO/detalhes-ETO-9.webp"], tags: ["retro", "europeus", "italiano"], link: "produto.html" },
  { id: 420, name: "Camisa Atlético Mineiro Retrô 1995", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO MINEIRO/principal-RETRO-1995.webp", images: ["img/produtos/retro/ATLETICO MINEIRO/principal-RETRO-1995.webp"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 421, name: "Camisa Atlético Mineiro Retrô 2003", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO MINEIRO/principal-RETRO-2003.webp", images: ["img/produtos/retro/ATLETICO MINEIRO/principal-RETRO-2003.webp"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 422, name: "Camisa Atlético Mineiro Retrô Clássica", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO MINEIRO/principal-RETRO.webp", images: ["img/produtos/retro/ATLETICO MINEIRO/principal-RETRO.webp"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 423, name: "Camisa Athletico Paranaense Retrô", price: "R$ 179,90", image: "img/produtos/retro/ATLETICO PARANAENSE/principal-RETRO.webp", images: ["img/produtos/retro/ATLETICO PARANAENSE/principal-RETRO.webp"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 505, name: "Camisa Bahia Retrô Renner", price: "R$ 179,90", image: "img/produtos/retro/BAHIA/principal-RETRO2.webp", images: ["img/produtos/retro/BAHIA/principal-RETRO2.webp"], tags: ["retro", "nacional"], link: "produto.html" },
  { id: 506, name: "Camisa Bahia Retrô Coca-Cola", price: "R$ 179,90", image: "img/produtos/retro/BAHIA/principal-RETRO4.webp", images: ["img/produtos/retro/BAHIA/principal-RETRO4.webp"], tags: ["retro", "nacional"], link: "produto.html" }
];

// --- 2. FUNÇÕES GLOBAIS DE INTERAÇÃO ---

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  const icon = document.getElementById('theme-icon');

  if (icon) {
    icon.textContent = isLight ? 'dark_mode' : 'light_mode';
  }

  localStorage.setItem('theme', isLight ? 'light' : 'dark');
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

// --- 3. LÓGICA DE INICIALIZAÇÃO ATUALIZADA ---
document.addEventListener('DOMContentLoaded', () => {

  const savedTheme = localStorage.getItem('theme');
  const icon = document.getElementById('theme-icon');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (icon) icon.textContent = 'dark_mode';
  } else {
    document.body.classList.remove('light-mode');
    if (icon) icon.textContent = 'light_mode';
  }

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

  // A) Lógica da HOME - Organizada conforme as novas seções
  if (document.getElementById('grid-lancamentos') || document.getElementById('grid-destaques')) {

    function renderCarouselTrack(containerId, filterTag, specificFilter = null) {
      const container = document.getElementById(containerId);
      if (!container) return;

      // Filtro inteligente: por Tag e, opcionalmente, por texto no nome (ex: "26/27")
      let filtered = products.filter(p => p.tags.includes(filterTag));

      if (specificFilter) {
        filtered = filtered.filter(p => p.name.includes(specificFilter));
      }

      container.innerHTML = ''; // Limpa antes de renderizar

      filtered.forEach(product => {
        const badgeHTML = product.badge ? `<span class="badge ${product.badge === 'Novo' ? 'new' : ''}">${product.badge}</span>` : '';
        const linkUrl = `produto.html?id=${product.id}`;
        const html = `
            <a href="${linkUrl}" class="product-card" style="text-decoration: none;">
                <div class="p-img">
                    ${badgeHTML}
                    <img src="${product.image}" onerror="this.src='img/front-page/logo.webp'" alt="${product.name}">
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

    renderCarouselTrack('grid-destaques', 'destaque');    // Mais Vendidos
    renderCarouselTrack('grid-lancamentos', 'lancamento', '26/27'); // Lançamentos (Só 26/27)
    renderCarouselTrack('grid-feminina', 'feminina');     // Futebol Feminino
    renderCarouselTrack('grid-internacional', 'internacional');
  }

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
                                <img src="${product.image}" onerror="this.src='img/front-page/logo.webp'" alt="${product.name}">
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
      message += `*${i + 1}. ${item.name}*%0A   📏 Tam: ${item.size} `;
      if (item.personalization) message += `   🎨 ${item.personalization}%0A`;
      message += `%0A`;
    });

    message += `---------------------------------------------------------%0A`;
    message += `Gostaria de prosseguir para o pagamento.`;
    const phone = "5544988215198";
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

});