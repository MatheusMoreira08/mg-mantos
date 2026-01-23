// --- 1. BANCO DE DADOS ---
const products = [
  // 1. BARCELONA (Corrigido para .jpeg)
  {
    id: 20,
    name: "Camisa Barcelona Home I 25/26 – Azul e Grená (Manga Longa)",
    price: "R$ 189,90",
    // AQUI ESTÁ A MUDANÇA: O caminho exato que você pediu
    image: "./img/barca_frente.jpeg",
    // Lista de fotos extras para a página de detalhes
    images: ["./img/barca_frente.jpeg", "./img/barca_detalhe.jpeg", "./img/barca_costas.jpeg"],
    tags: ["lancamento", "destaque", "europeus"],
    badge: "Novo",
    link: "produto.html"
  },
  // 2. OUTROS PRODUTOS...
  { id: 1, name: "Camisa Flamengo I 24/25 - Torcedor", price: "R$ 159,90", image: "img/fla1.jpg", tags: ["lancamento", "destaque"], badge: "Novo" },
  { id: 2, name: "Camisa Palmeiras Home 24/25 - Puma", price: "R$ 179,90", image: "img/palm1.jpg", tags: ["lancamento"], badge: "Novo" },
  { id: 3, name: "Camisa Corinthians II 24/25 - Nike", price: "R$ 179,90", image: "img/cor2.jpg", tags: ["lancamento"], badge: "Quente" },
  { id: 4, name: "Camisa São Paulo I 24/25 - NB", price: "R$ 179,90", image: "img/sp1.jpg", tags: ["lancamento"] },

  // DESTAQUES
  { id: 5, name: "Camisa Real Madrid Home 24/25", price: "R$ 179,90", image: "img/real1.jpg", tags: ["destaque", "internacional"], badge: "Best Seller" },
  { id: 6, name: "Camisa Man City Home 24/25", price: "R$ 169,90", image: "img/city1.jpg", tags: ["destaque", "internacional"], badge: "Oferta" },
  { id: 7, name: "Camisa Brasil 2002 Retrô", price: "R$ 199,90", image: "img/br02.jpg", tags: ["destaque"], badge: "Clássico" },

  // FEMININA
  { id: 8, name: "Camisa Brasil Feminina 2024", price: "R$ 149,90", image: "img/fem1.jpg", tags: ["feminina"], badge: "Linda" },
  { id: 9, name: "Camisa EUA Feminina Home", price: "R$ 159,90", image: "img/fem2.jpg", tags: ["feminina"], badge: "Novo" },
  { id: 10, name: "Camisa Barcelona Feminina", price: "R$ 169,90", image: "img/fem3.jpg", tags: ["feminina"] },

  // INTERNACIONAL
  { id: 12, name: "Camisa PSG Home 24/25", price: "R$ 179,90", image: "img/psg.jpg", tags: ["internacional"], badge: "Novo" },
  { id: 14, name: "Camisa Inter Miami Messi", price: "R$ 149,90", image: "img/miami.jpg", tags: ["internacional", "destaque"], badge: "Messi" },
  { id: 15, name: "Camisa Al Nassr CR7", price: "R$ 159,90", image: "img/nassr.jpg", tags: ["internacional"], badge: "CR7" },
];

// --- 2. RENDERIZAR CARROSSEL ---
function renderCarouselTrack(containerId, filterTag) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const filtered = products.filter(p => p.tags.includes(filterTag));

  filtered.forEach(product => {
    const badgeHTML = product.badge ? `<span class="badge ${product.badge === 'Novo' ? 'new' : ''}">${product.badge}</span>` : '';
    const linkUrl = product.link ? product.link : "#";

    const html = `
            <a href="${linkUrl}?id=${product.id}" class="product-card" style="text-decoration: none;">
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

// Inicializa
renderCarouselTrack('grid-lancamentos', 'lancamento');
renderCarouselTrack('grid-destaques', 'destaque');
renderCarouselTrack('grid-feminina', 'feminina');
renderCarouselTrack('grid-internacional', 'internacional');

// Funções de rolagem e tema
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
  icon.textContent = document.body.classList.contains('light-mode') ? 'light_mode' : 'dark_mode';
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar) { sidebar.classList.toggle('open'); }
  if (overlay) { overlay.classList.toggle('show'); }
}

// Slider Hero (Banner Topo)
if (document.querySelector('.slider')) {
  let slideIndex = 0;
  showSlides();
  function showSlides() {
    let i; let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
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

// Carregar página de produto (se estiver nela)
if (window.location.pathname.includes("produto.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = products.find(p => p.id == productId);

  if (product) {
    document.getElementById('prod-title').innerText = product.name;
    document.getElementById('prod-price-current').innerText = product.price;
    // Carrega a imagem principal
    if (product.images && product.images.length > 0) {
      document.getElementById('currentImg').src = product.images[0];
      // Atualiza miniaturas
      const thumbContainer = document.getElementById('thumb-container');
      if (thumbContainer) {
        thumbContainer.innerHTML = '';
        product.images.forEach((imgSrc, index) => {
          const activeClass = index === 0 ? 'active' : '';
          thumbContainer.innerHTML += `<img src="${imgSrc}" onclick="changeImage(this)" class="${activeClass}">`;
        });
      }
    } else {
      document.getElementById('currentImg').src = product.image;
    }
  }
}