// --- 1. BANCO DE DADOS DE PRODUTOS ---

// Função Ajudante: Cria os caminhos das fotos automaticamente
function criarImagens(pasta) {
  return [
    `${pasta}/principal.jpg`,
    `${pasta}/costas.jpg`,
    `${pasta}/detalhe.jpg`
  ];
}

const products = [
  // --- EXEMPLO 1: BARCELONA (Manga Longa) ---
  {
    id: 20,
    name: "Camisa Barcelona Home I 25/26 – Manga Longa",
    price: "R$ 189,90",
    // Você só coloca a pasta base aqui!
    image: "img/produtos/25-26/torcedor/barcelona/manga-longa/principal.jpeg",
    images: [
      "img/produtos/25-26/torcedor/barcelona/manga-longa/principal.jpeg",
      "img/produtos/25-26/torcedor/barcelona/manga-longa/costas.jpeg",
      "img/produtos/25-26/torcedor/barcelona/manga-longa/detalhe.jpeg"
    ],
    // Nota: O Barcelona manga longa suas fotos estavam como .jpeg e nomes diferentes
    // Se você renomear para o padrão, poderia usar a função criarImagens também.
    tags: ["lancamento", "destaque", "europeus"],
    badge: "Novo",
    link: "produto.html"
  },

  // --- EXEMPLO 2: MILAN (Usando o Jeito Rápido) ---
  {
    id: 21,
    name: "Camisa Milan Home 25/26 - Jogador (Puma)",
    price: "R$ 189,90",
    image: "img/produtos/25-26/jogador/milan/principal.jpg",
    // OLHA A MÁGICA AQUI:
    images: criarImagens("img/produtos/25-26/jogador/milan"),
    tags: ["lancamento", "europeus", "internacional"],
    badge: "Novo",
    link: "produto.html"
  },

  // --- EXEMPLO 3: FLAMENGO (Vamos supor que você baixou a pasta) ---
  {
    id: 1,
    name: "Camisa Flamengo I 24/25 - Torcedor",
    price: "R$ 159,90",
    image: "img/produtos/24-25/torcedor/flamengo/principal.jpg",
    // Basta apontar a pasta
    images: criarImagens("img/produtos/24-25/torcedor/flamengo"),
    tags: ["lancamento", "destaque", "nacional"],
    badge: "Novo",
    link: "produto.html"
  },

  // --- EXEMPLO 4: REAL MADRID ---
  {
    id: 5,
    name: "Camisa Real Madrid Home 24/25",
    price: "R$ 179,90",
    image: "img/produtos/24-25/torcedor/real-madrid/principal.jpg",
    images: criarImagens("img/produtos/24-25/torcedor/real-madrid"),
    tags: ["destaque", "internacional"],
    badge: "Best Seller",
    link: "produto.html"
  },

  // --- OUTROS (Exemplos genéricos) ---
  { id: 1, name: "Camisa Flamengo I 24/25 - Torcedor", price: "R$ 159,90", image: "img/fla1.jpg", tags: ["lancamento", "destaque"], badge: "Novo", link: "produto.html" },
  { id: 2, name: "Camisa Palmeiras Home 24/25 - Puma", price: "R$ 179,90", image: "img/palm1.jpg", tags: ["lancamento"], badge: "Novo", link: "produto.html" },
  { id: 5, name: "Camisa Real Madrid Home 24/25", price: "R$ 179,90", image: "img/real1.jpg", tags: ["destaque", "internacional"], badge: "Best Seller", link: "produto.html" },
  { id: 6, name: "Camisa Man City Home 24/25", price: "R$ 169,90", image: "img/city1.jpg", tags: ["destaque", "internacional"], badge: "Oferta", link: "produto.html" },
  { id: 7, name: "Camisa Brasil 2002 Retrô", price: "R$ 199,90", image: "img/br02.jpg", tags: ["destaque"], badge: "Clássico", link: "produto.html" },

  // FEMININAS
  { id: 8, name: "Camisa Brasil Feminina 2024", price: "R$ 149,90", image: "img/fem1.jpg", tags: ["feminina"], badge: "Linda", link: "produto.html" },
  { id: 9, name: "Camisa EUA Feminina Home", price: "R$ 159,90", image: "img/fem2.jpg", tags: ["feminina"], badge: "Novo", link: "produto.html" },

  // INTERNACIONAL
  { id: 14, name: "Camisa Inter Miami Messi", price: "R$ 149,90", image: "img/miami.jpg", tags: ["internacional", "destaque"], badge: "Messi", link: "produto.html" },
  { id: 15, name: "Camisa Al Nassr CR7", price: "R$ 159,90", image: "img/nassr.jpg", tags: ["internacional"], badge: "CR7", link: "produto.html" },
];

// --- 2. RENDERIZAR CARROSSEL (HOME) ---
function renderCarouselTrack(containerId, filterTag) {
  const container = document.getElementById(containerId);
  if (!container) return; // Se não achar o container, para a função

  const filtered = products.filter(p => p.tags.includes(filterTag));

  filtered.forEach(product => {
    const badgeHTML = product.badge ? `<span class="badge ${product.badge === 'Novo' ? 'new' : ''}">${product.badge}</span>` : '';
    // Garante que o link leve o ID do produto
    const linkUrl = product.link ? `${product.link}?id=${product.id}` : "#";

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

// Inicializa os carrosseis
renderCarouselTrack('grid-lancamentos', 'lancamento');
renderCarouselTrack('grid-destaques', 'destaque');
renderCarouselTrack('grid-feminina', 'feminina');
renderCarouselTrack('grid-internacional', 'internacional');


// --- 3. INTERAÇÕES DE UI (TEMA, MENU, SCROLL) ---

function scrollCarousel(containerId, direction) {
  const container = document.getElementById(containerId);
  if (container) {
    const scrollAmount = 280 * direction;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const icon = document.getElementById('theme-icon');
  if (icon) {
    // CORREÇÃO:
    // Se está no modo claro (light-mode), mostra a LUA ('dark_mode')
    // Se está no modo escuro, mostra o SOL ('light_mode')
    icon.textContent = document.body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar) { sidebar.classList.toggle('open'); }
  if (overlay) { overlay.classList.toggle('show'); }
}


// --- 4. SLIDER HERO (BANNER TOPO) ---
if (document.querySelector('.slider')) {
  let slideIndex = 0;
  showSlides();

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Muda a cada 5 segundos
  }

  window.plusSlides = function (n) {
    let slides = document.getElementsByClassName("slide");
    slideIndex += n;
    if (slideIndex > slides.length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }
}


// --- 5. LÓGICA DA PÁGINA DE PRODUTO (DINÂMICA) ---
// Verifica se estamos na página produto.html
if (window.location.pathname.includes("produto.html")) {

  // 1. Pega o ID da URL (ex: produto.html?id=21)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // 2. Procura o produto na lista 'products'
  const product = products.find(p => p.id == productId);

  // 3. Se achar o produto, preenche a tela
  if (product) {
    // Preenche Título e Preço
    const titleEl = document.getElementById('prod-title');
    const priceEl = document.getElementById('prod-price');
    const breadName = document.getElementById('bread-name');

    if (titleEl) titleEl.innerText = product.name;
    if (priceEl) priceEl.innerText = product.price;
    if (breadName) breadName.innerText = product.name.substring(0, 20) + "..."; // Encurta nome no breadcrumb

    // Preenche Imagem Principal
    const mainImg = document.getElementById('currentImg');
    if (mainImg) mainImg.src = product.image;

    // Preenche Galeria de Miniaturas
    const thumbContainer = document.getElementById('thumb-container');
    if (thumbContainer) {
      thumbContainer.innerHTML = ''; // Limpa antes de adicionar

      // Verifica se tem galeria extra
      if (product.images && product.images.length > 0) {
        product.images.forEach((imgSrc, index) => {
          const activeClass = index === 0 ? 'active' : '';
          // Cria o HTML da miniatura
          thumbContainer.innerHTML += `<img src="${imgSrc}" onclick="changeImage(this)" class="${activeClass}">`;
        });
        // Garante que a foto principal comece com a primeira da galeria
        if (mainImg) mainImg.src = product.images[0];
      } else {
        // Se não tiver galeria, repete a imagem principal como miniatura única
        thumbContainer.innerHTML += `<img src="${product.image}" class="active">`;
      }
    }
  } else {
    // Se não achar ID (ex: entrou na página direto sem clicar), avisa ou redireciona
    console.log("Produto não encontrado ou ID inválido.");
  }
}