// js/main.js - Ponto de entrada da aplicação

let _products = [];
let _fuseInstance = null;

// =========================================================================
// LOAD PRODUCTS
// =========================================================================

async function loadProducts() {
  try {
    const response = await fetch(APP.PRODUCTS_URL);
    if (!response.ok) throw new Error('Failed to load products');
    _products = await response.json();
    return _products;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

// =========================================================================
// SEARCH (inline to share products reference)
// =========================================================================

function normalizarTexto(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function formatMoney(value) {
  if (typeof value === 'string') {
    value = parseFloat(value.replace('R$', '').replace(/\./g, '').replace(',', '.'));
  }
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function parseMoneyToNumber(value) {
  return parseFloat(String(value || '0').replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;
}

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(str || '').replace(/[&<>"']/g, m => map[m]);
}

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function generateAliases(produto) {
  const base = normalizarTexto(produto.name);
  const compact = base.replace(/\s+/g, '');
  const tagString = (produto.tags || []).map(normalizarTexto).join(' ');
  const extra = (produto.aliases || []).map(normalizarTexto).join(' ');
  const set = new Set([base, compact, tagString, extra].filter(Boolean));
  return Array.from(set);
}

function buildFuseIndex() {
  if (!typeof Fuse !== 'undefined') return null;
  const produtosIndexados = _products.map(produto => ({
    produto,
    nomeBusca: normalizarTexto(produto.name),
    tagsBusca: normalizarTexto((produto.tags || []).join(' ')),
    aliasesBusca: generateAliases(produto).join(' ')
  }));
  return new Fuse(produtosIndexados, {
    keys: ['nomeBusca', 'tagsBusca', 'aliasesBusca'],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 2
  });
}

function getOrCreateFuse() {
  if (!_fuseInstance) {
    _fuseInstance = buildFuseIndex();
  }
  return _fuseInstance;
}

function isExactTeamMatch(term) {
  const t = normalizarTexto(term).trim();
  if (!t) return [];
  const regex = new RegExp('\\b' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
  return _products.filter(produto => {
    const nome = normalizarTexto(produto.name);
    const tags = (produto.tags || []).map(normalizarTexto).join(' ');
    if (tags.includes(t)) return true;
    if (regex.test(nome)) return true;
    if (nome.includes(t)) return true;
    return false;
  });
}

function buscarProdutosPorTermo(termo) {
  const termoNormalizado = normalizarTexto(termo).trim();
  if (!termoNormalizado) return [];

  if (termoNormalizado === 'brasil') {
    return _products.filter(p => p.tags && p.tags.includes('selecoes') && normalizarTexto(p.name).includes('brasil'));
  }

  const preMatches = isExactTeamMatch(termoNormalizado);
  if (preMatches.length > 0) return preMatches;

  if (termoNormalizado === 'selecao' || termoNormalizado === 'selecoes' || termoNormalizado === 'seleção') {
    return _products.filter(p => p.tags && p.tags.includes('selecoes'));
  }

  const fuse = getOrCreateFuse();
  if (fuse) {
    return fuse.search(termoNormalizado).map(r => r.item.produto);
  }

  return _products.filter(p => {
    const nome = normalizarTexto(p.name);
    const tags = (p.tags || []).map(normalizarTexto);
    return nome.includes(termoNormalizado) || tags.some(tag => tag.includes(termoNormalizado));
  });
}

// =========================================================================
// CART
// =========================================================================

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(APP.STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(APP.STORAGE_KEY, JSON.stringify(cart));
}

function getCartGroupKey(item) {
  return [item.name, item.price, item.image, item.size || '', item.personalization || ''].join('||');
}

function getGroupedCart(cart) {
  const grupos = new Map();
  cart.forEach(item => {
    const key = getCartGroupKey(item);
    if (!grupos.has(key)) {
      grupos.set(key, { key, name: item.name, price: item.price, image: item.image, size: item.size, personalization: item.personalization || '', quantity: 0 });
    }
    grupos.get(key).quantity += 1;
  });
  return Array.from(grupos.values());
}

function getCartSubtotal(cart) {
  return cart.reduce((total, item) => total + parseMoneyToNumber(item.price), 0);
}

function addToCart(product) {
  const cart = getCart();
  cart.push({
    id: generateId(),
    name: product.name,
    price: product.price,
    image: product.image,
    size: product.size,
    personalization: product.personalization || null
  });
  saveCart(cart);
  return cart;
}

function removeItemFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  return cart;
}

function updateGroupQuantity(key, delta) {
  const cart = getCart();
  const groups = getGroupedCart(cart);
  const target = groups.find(g => g.key === key);
  if (!target) return cart;

  target.quantity += delta;
  const newCart = [];
  groups.forEach(group => {
    const qty = group.key === key ? target.quantity : group.quantity;
    if (qty > 0) {
      for (let i = 0; i < qty; i++) {
        newCart.push({ id: generateId(), name: group.name, price: group.price, image: group.image, size: group.size, personalization: group.personalization || null });
      }
    }
  });
  saveCart(newCart);
  return newCart;
}

function removeGroupFromCart(key) {
  const cart = getCart().filter(item => getCartGroupKey(item) !== key);
  saveCart(cart);
  return cart;
}

function updateGroupPersonalization(key, value) {
  const cart = getCart();
  const groups = getGroupedCart(cart);
  const target = groups.find(g => g.key === key);
  if (!target) return cart;
  target.personalization = value.trim();
  const newCart = [];
  groups.forEach(group => {
    for (let i = 0; i < group.quantity; i++) {
      newCart.push({ id: generateId(), name: group.name, price: group.price, image: group.image, size: group.size, personalization: group.personalization || null });
    }
  });
  saveCart(newCart);
  return newCart;
}

function buildOrderMessage(items) {
  let message = `*NOVO PEDIDO DO SITE*\n\n`;
  items.forEach((item, index) => {
    message += `*${index + 1}. ${item.name}*\n`;
    message += `   Tamanho: ${item.size || '-'}\n`;
    message += `   Qtd: ${item.quantity || 1}\n`;
    if (item.personalization) message += `   Personalização: ${item.personalization}\n`;
    message += `\n`;
  });
  message += `-------------------------------------------------------\n`;
  message += `Gostaria de prosseguir para o pagamento.`;
  return message;
}

function finalizeOrder() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  const groups = getGroupedCart(cart);
  const message = buildOrderMessage(groups);
  window.open(`https://wa.me/${APP.WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
}

function updateCartIcon(count) {
  const bagContainer = document.querySelector('.header-actions .action-item:last-child');
  if (!bagContainer) return;

  let badge = bagContainer.querySelector('.cart-count-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'cart-count-badge';
    badge.style.cssText = "position:absolute;top:-5px;right:-5px;background:red;color:white;font-size:10px;width:16px;height:16px;border-radius:50%;display:flex;justify-content:center;align-items:center;font-weight:bold;";
    bagContainer.style.position = 'relative';
    bagContainer.appendChild(badge);
  }
  badge.innerText = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

// =========================================================================
// MODAL DO CARRINHO
// =========================================================================

function openCartModal(isAddedAction = false) {
  const overlay = document.getElementById('cart-modal-overlay');
  const modal = document.getElementById('cart-modal');
  const title = document.getElementById('modal-title');
  const finalizeBtn = document.querySelector('.btn-finalize');

  if (isAddedAction) {
    title.innerText = "Este produto foi adicionado ao seu carrinho!";
    title.style.color = "#00c853";
  } else {
    title.innerText = "Seu Carrinho de Compras";
    title.style.color = "";
  }

  if (finalizeBtn && !window.location.pathname.includes('carrinho.html')) {
    finalizeBtn.innerText = 'Ir para Carrinho';
    finalizeBtn.onclick = () => window.location.href = 'carrinho.html';
  }

  renderModalItems();

  overlay.style.display = 'block';
  modal.style.display = 'flex';
  setTimeout(() => {
    overlay.classList.add('show');
    modal.classList.add('show');
  }, 10);
}

function closeCartModal() {
  const overlay = document.getElementById('cart-modal-overlay');
  const modal = document.getElementById('cart-modal');
  overlay.classList.remove('show');
  modal.classList.remove('show');
  setTimeout(() => {
    overlay.style.display = 'none';
    modal.style.display = 'none';
  }, 300);
}

function renderModalItems() {
  const cart = getCart();
  const container = document.getElementById('modal-cart-items');
  const totalEl = document.getElementById('modal-total-price');

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:20px;color:#888;">Seu carrinho está vazio.</p>';
    totalEl.innerText = "R$ 0,00";
    return;
  }

  let totalPrice = 0;
  const html = cart.map((item, index) => {
    const priceNumber = parseMoneyToNumber(item.price);
    totalPrice += priceNumber;
    return `
      <div class="modal-item">
        <img src="${escapeHtml(item.image)}" alt="Produto">
        <div class="modal-item-info">
          <h4>${escapeHtml(item.name)}</h4>
          <p>Tam: <strong>${escapeHtml(item.size)}</strong></p>
          ${item.personalization ? `<p style="color:#d32f2f;font-size:0.75rem">${escapeHtml(item.personalization)}</p>` : ''}
          <p style="margin-top:5px;font-weight:bold;color:#00c853;">${item.price}</p>
        </div>
        <span class="material-icons-outlined modal-remove-btn" onclick="window.removeItem(${index})">delete</span>
      </div>`;
  }).join('');

  container.innerHTML = html;
  totalEl.innerText = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

window.removeItem = function(index) {
  const cart = removeItemFromCart(index);
  renderModalItems();
  updateCartIcon(cart.length);
};

// =========================================================================
// THEME & SIDEBAR
// =========================================================================

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = isLight ? 'dark_mode' : 'light_mode';
  localStorage.setItem(APP.THEME_KEY, isLight ? 'light' : 'dark');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}

function scrollCarousel(containerId, direction) {
  const container = document.getElementById(containerId);
  if (container) container.scrollBy({ left: 280 * direction, behavior: 'smooth' });
}

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// =========================================================================
// HOME PAGE
// =========================================================================

function createProductCardHTML(product) {
  const badgeHTML = product.badge
    ? `<span class="badge ${product.badge === 'Novo' ? 'new' : ''}">${escapeHtml(product.badge)}</span>`
    : '';
  return `
    <a href="produto.html?id=${product.id}" class="product-card" style="text-decoration: none;">
      <div class="p-img">
        ${badgeHTML}
        <img loading="lazy" src="${escapeHtml(product.image)}" onerror="this.src='img/front-page/logo.webp'" alt="${escapeHtml(product.name)}">
      </div>
      <div class="p-info">
        <div class="p-cat">Importada Tailandesa 1:1</div>
        <div class="p-name">${escapeHtml(product.name)}</div>
        <div class="p-price">${formatMoney(product.price)}</div>
        <div class="p-installments">em até 3x sem juros</div>
      </div>
    </a>`;
}

function renderCarouselTrack(containerId, filterTag, specificFilter = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let filtered = _products.filter(p => p.tags && p.tags.includes(filterTag));
  if (specificFilter) filtered = filtered.filter(p => p.name.includes(specificFilter));
  if (filtered.length === 0) return;
  container.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
}

function initSlider() {
  if (!document.querySelector('.slider')) return;
  let slideIndex = 0;
  showSlides();
  function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
  }
  window.plusSlides = function(n) {
    const slides = document.getElementsByClassName("slide");
    slideIndex += n;
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex < 1) slideIndex = slides.length;
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slides[slideIndex - 1].style.display = "block";
  };
}

function initHomePage() {
  if (!document.getElementById('grid-lancamentos') && !document.getElementById('grid-destaques')) return false;
  renderCarouselTrack('grid-destaques', 'destaque');
  renderCarouselTrack('grid-lancamentos', 'lancamento', '26/27');
  renderCarouselTrack('grid-feminina', 'feminina');
  renderCarouselTrack('grid-internacional', 'internacional');
  initSlider();
  return true;
}

// =========================================================================
// PRODUCT PAGE
// =========================================================================

let currentImageIndex = 0;
let currentProductImages = [];

function jumpToImage(index) {
  const mainImg = document.getElementById('currentImg');
  if (mainImg && currentProductImages.length > 0) {
    currentImageIndex = index;
    mainImg.src = currentProductImages[index];
    updateThumbnails();
  }
}

function nextImage(direction) {
  if (currentProductImages.length > 0) {
    let newIndex = currentImageIndex + direction;
    if (newIndex >= currentProductImages.length) newIndex = 0;
    if (newIndex < 0) newIndex = currentProductImages.length - 1;
    jumpToImage(newIndex);
  }
}

function updateThumbnails() {
  document.querySelectorAll('.thumbnails img').forEach((img, i) => {
    img.classList.remove('active');
    if (i === currentImageIndex) img.classList.add('active');
  });
}

function initProductPage() {
  if (!document.getElementById('prod-title')) return false;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = _products.find(p => p.id == productId);

  currentImageIndex = 0;
  currentProductImages = [];

  if (!product) {
    const container = document.querySelector('.product-container');
    if (container) container.innerHTML = '<h2>Produto não encontrado.</h2><a href="index.html">Voltar ao início</a>';
    return true;
  }

  document.getElementById('prod-title').innerText = product.name;
  document.getElementById('prod-price').innerText = formatMoney(product.price);
  const breadName = document.getElementById('bread-name');
  if (breadName) breadName.innerText = product.name.substring(0, 20) + "...";

  currentProductImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const mainImg = document.getElementById('currentImg');
  if (mainImg) mainImg.src = currentProductImages[0];

  const thumbContainer = document.getElementById('thumb-container');
  if (thumbContainer) {
    thumbContainer.innerHTML = currentProductImages.map((src, i) =>
      `<img loading="lazy" src="${escapeHtml(src)}" onclick="jumpToImage(${i})" class="${i === 0 ? 'active' : ''}">`
    ).join('');
  }

  window.nextImage = nextImage;
  window.jumpToImage = jumpToImage;

  // Setup add to cart
  const buyBtn = document.querySelector('.buy-btn');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      const sizeBtn = document.querySelector('.size-btn.selected');
      if (!sizeBtn) { alert("Por favor, selecione um tamanho!"); return; }
      const custName = document.getElementById('cust-name')?.value.trim() || '';
      const custNumber = document.getElementById('cust-number')?.value.trim() || '';
      const personalization = (custName || custNumber) ? `Nome: ${custName} | Nº: ${custNumber}` : null;
      addToCart({ name: product.name, price: formatMoney(product.price), image: document.getElementById('currentImg').src, size: sizeBtn.innerText, personalization });
      updateCartIcon(getCart().length);
      openCartModal(true);
    });
  }

  return true;
}

// =========================================================================
// CATEGORY PAGE (with pagination)
// =========================================================================

const CATEGORY_TITLES = {
  'lancamento': 'Lançamentos', 'nacional': 'Brasileirão & Nacionais',
  'europeus': 'Futebol Europeu', 'selecoes': 'Seleções Mundiais',
  'retro': 'Relíquias Retrô', 'feminina': 'Futebol Feminino',
  'internacional': 'Times Internacionais', 'destaque': 'Mais Vendidos',
  'ingles': 'Futebol Inglês', 'espanhol': 'Futebol Espanhol',
  'italiano': 'Futebol Italiano', 'brasileirao': 'Brasileirão',
  'goleiro': 'Goleiro', 'treino': 'Treino', 'sulamericano': 'Sul-Americanos',
  'asiatico': 'Asiáticos', 'alemao': 'Futebol Alemão'
};

let _categoryFiltered = [];
let _categoryPage = 1;

function goToPage(page) {
  const totalPages = Math.ceil(_categoryFiltered.length / APP.PRODUCTS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  _categoryPage = page;
  renderCategoryPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCategoryPage() {
  const container = document.getElementById('grid-categoria');
  if (!container) return;

  const start = (_categoryPage - 1) * APP.PRODUCTS_PER_PAGE;
  const end = start + APP.PRODUCTS_PER_PAGE;
  const pageItems = _categoryFiltered.slice(start, end);
  const totalPages = Math.ceil(_categoryFiltered.length / APP.PRODUCTS_PER_PAGE);

  const html = pageItems.map(product => `
    <a href="produto.html?id=${product.id}" class="product-card" style="text-decoration: none;">
      <div class="p-img">
        ${product.badge ? `<span class="badge ${product.badge === 'Novo' ? 'new' : ''}">${escapeHtml(product.badge)}</span>` : ''}
        <img loading="lazy" src="${escapeHtml(product.image)}" onerror="this.src='img/front-page/logo.webp'" alt="${escapeHtml(product.name)}">
      </div>
      <div class="p-info">
        <div class="p-cat">Importada Tailandesa 1:1</div>
        <div class="p-name">${escapeHtml(product.name)}</div>
        <div class="p-price">${formatMoney(product.price)}</div>
        <div class="p-installments">em até 3x sem juros</div>
      </div>
    </a>`).join('');

  // Pagination
  let pagination = '';
  if (totalPages > 1) {
    pagination = '<div style="display:flex;justify-content:center;align-items:center;gap:8px;margin:40px 0;flex-wrap:wrap;">';
    pagination += `<button onclick="goToPage(${_categoryPage - 1})" ${_categoryPage === 1 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''} style="padding:8px 16px;border:1px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--text-main);cursor:pointer;">&laquo; Anterior</button>`;
    const maxVisible = 5;
    let s = Math.max(1, _categoryPage - Math.floor(maxVisible / 2));
    let e = Math.min(totalPages, s + maxVisible - 1);
    if (e - s < maxVisible - 1) s = Math.max(1, e - maxVisible + 1);
    if (s > 1) {
      pagination += `<button onclick="goToPage(1)" style="padding:8px 16px;border:1px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--text-main);cursor:pointer;">1</button>`;
      if (s > 2) pagination += '<span style="color:var(--text-muted);padding:0 4px;">...</span>';
    }
    for (let i = s; i <= e; i++) {
      const active = i === _categoryPage;
      pagination += `<button onclick="goToPage(${i})" style="padding:8px 16px;border:1px solid ${active ? 'var(--accent)' : 'var(--border)'};border-radius:8px;background:${active ? 'var(--accent)' : 'var(--bg-card)'};color:${active ? '#fff' : 'var(--text-main)'};cursor:pointer;font-weight:${active ? 'bold' : 'normal'};">${i}</button>`;
    }
    if (e < totalPages) {
      if (e < totalPages - 1) pagination += '<span style="color:var(--text-muted);padding:0 4px;">...</span>';
      pagination += `<button onclick="goToPage(${totalPages})" style="padding:8px 16px;border:1px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--text-main);cursor:pointer;">${totalPages}</button>`;
    }
    pagination += `<button onclick="goToPage(${_categoryPage + 1})" ${_categoryPage === totalPages ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''} style="padding:8px 16px;border:1px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--text-main);cursor:pointer;">Próximo &raquo;</button>`;
    pagination += '</div>';
  }

  container.innerHTML = html + pagination;
}

function initCategoryPage() {
  if (!document.getElementById('grid-categoria')) return false;

  const params = new URLSearchParams(window.location.search);
  const tag = params.get('tag');
  const searchTerm = params.get('busca');
  const title = document.getElementById('cat-title');
  const count = document.getElementById('cat-count');

  if (searchTerm) {
    _categoryFiltered = buscarProdutosPorTermo(searchTerm);
    if (title) title.innerText = `Resultados para: "${escapeHtml(searchTerm)}"`;
  } else if (tag) {
    _categoryFiltered = _products.filter(p => p.tags && p.tags.includes(tag));
    if (title) title.innerText = CATEGORY_TITLES[tag] || "Produtos";
  }

  if (count) count.innerText = `${_categoryFiltered.length} produto${_categoryFiltered.length !== 1 ? 's' : ''} encontrado${_categoryFiltered.length !== 1 ? 's' : ''}`;

  if (_categoryFiltered.length === 0) {
    const container = document.getElementById('grid-categoria');
    if (container) container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#888;font-size:1.2rem;margin-top:50px;">Nenhum produto encontrado.</p>';
    return true;
  }

  _categoryPage = 1;
  renderCategoryPage();
  window.goToPage = goToPage;
  return true;
}

// =========================================================================
// CHECKOUT PAGE
// =========================================================================

function findCheckoutElements() {
  return {
    container: document.getElementById('checkout-items'),
    subtotal: document.getElementById('checkout-subtotal'),
    total: document.getElementById('checkout-total'),
    count: document.getElementById('checkout-count'),
    panelCount: document.getElementById('checkout-cart-counter'),
    summaryCount: document.getElementById('checkout-summary-count'),
    emptyState: document.getElementById('checkout-empty'),
    whatsappBtn: document.getElementById('checkout-whatsapp-btn'),
    cartBadge: document.getElementById('checkout-cart-badge')
  };
}

function syncCheckoutSummary() {
  const cart = getCart();
  const el = findCheckoutElements();
  const totalItens = cart.length;
  const subtotalValue = getCartSubtotal(cart);
  if (el.subtotal) el.subtotal.innerText = formatMoney(subtotalValue);
  if (el.total) el.total.innerText = formatMoney(subtotalValue);
  if (el.count) el.count.innerText = `${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`;
  if (el.panelCount) el.panelCount.innerText = totalItens;
  if (el.summaryCount) el.summaryCount.innerText = totalItens;
  if (el.cartBadge) { el.cartBadge.innerText = totalItens; el.cartBadge.style.display = totalItens > 0 ? 'flex' : 'none'; }
}

function renderCheckoutPage() {
  const cart = getCart();
  const groups = getGroupedCart(cart);
  const el = findCheckoutElements();
  if (!el.container || !el.emptyState) return;

  if (groups.length === 0) {
    el.container.innerHTML = '';
    el.emptyState.style.display = 'block';
    if (el.whatsappBtn) el.whatsappBtn.disabled = true;
    syncCheckoutSummary();
    return;
  }

  el.emptyState.style.display = 'none';
  if (el.whatsappBtn) el.whatsappBtn.disabled = false;

  el.container.innerHTML = groups.map(group => {
    const subtotalItem = parseMoneyToNumber(group.price) * group.quantity;
    const safeKey = group.key.replace(/'/g, "\\'");
    return `
      <article class="checkout-item" data-key="${safeKey}">
        <img loading="lazy" class="checkout-item-image" src="${escapeHtml(group.image)}" alt="${escapeHtml(group.name)}" onerror="this.src='img/front-page/logo.png'">
        <div class="checkout-item-info">
          <div class="checkout-item-head">
            <div>
              <h3>${escapeHtml(group.name)}</h3>
              <p>Tamanho: <strong>${escapeHtml(group.size || '-')}</strong></p>
              <p class="checkout-item-price">${formatMoney(group.price)}</p>
            </div>
            <button class="checkout-remove-btn" onclick="checkoutRemoveGroup('${safeKey}')">Remover</button>
          </div>
          <div class="checkout-item-controls">
            <div class="checkout-qty-control">
              <button onclick="checkoutChangeQuantity('${safeKey}', -1)">-</button>
              <span>${group.quantity}</span>
              <button onclick="checkoutChangeQuantity('${safeKey}', 1)">+</button>
            </div>
            <label class="checkout-personalization">
              <span>Personalização</span>
              <textarea maxlength="35" rows="2" oninput="checkoutUpdatePersonalization('${safeKey}', this.value)">${escapeHtml(group.personalization || '')}</textarea>
            </label>
          </div>
          <div class="checkout-item-footer">
            <span>Subtotal do item</span>
            <strong>${formatMoney(subtotalItem)}</strong>
          </div>
        </div>
      </article>`;
  }).join('');

  syncCheckoutSummary();
}

window.checkoutChangeQuantity = function(key, delta) {
  const cart = updateGroupQuantity(key, delta);
  renderCheckoutPage();
  updateCartIcon(cart.length);
};

window.checkoutUpdatePersonalization = function(key, value) {
  updateGroupPersonalization(key, value);
  renderCheckoutPage();
};

window.checkoutRemoveGroup = function(key) {
  const cart = removeGroupFromCart(key);
  renderCheckoutPage();
  updateCartIcon(cart.length);
};

window.checkoutFinalizeOrder = function() {
  finalizeOrder();
};

function initCheckoutPage() {
  if (!document.getElementById('checkout-items')) return false;
  renderCheckoutPage();
  syncCheckoutSummary();
  return true;
}

// =========================================================================
// SEARCH BAR
// =========================================================================

function initSearchBar() {
  const searchInput = document.getElementById('inputBusca');
  const searchIcon = document.querySelector('.search-bar .search-icon');
  const caixaDeResultados = document.getElementById('caixaResultados');

  if (!searchInput || !caixaDeResultados || typeof Fuse === 'undefined') return;

  searchInput.addEventListener('input', function(e) {
    const term = e.target.value.trim();
    if (term.length < 2) { caixaDeResultados.style.display = 'none'; return; }

    const resultados = buscarProdutosPorTermo(term);
    if (resultados.length > 0) {
      caixaDeResultados.innerHTML = resultados.slice(0, 5).map(manto => `
        <a href="produto.html?id=${manto.id}" class="resultado-item">
          <img src="${escapeHtml(manto.image)}" alt="${escapeHtml(manto.name)}" onerror="this.src='img/front-page/logo.png'">
          <div class="resultado-info">
            <p>${escapeHtml(manto.name)}</p>
            <span>${formatMoney(manto.price)}</span>
          </div>
        </a>`).join('');
    } else {
      caixaDeResultados.innerHTML = '<div style="padding:15px;text-align:center;font-size:13px;color:#666;">Nenhum manto encontrado.</div>';
    }
    caixaDeResultados.style.display = 'block';
  });

  const doSearch = () => {
    const term = searchInput.value.trim();
    if (term) window.location.href = `categoria.html?busca=${encodeURIComponent(term)}`;
  };

  searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
  if (searchIcon) searchIcon.addEventListener('click', doSearch);

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-bar')) caixaDeResultados.style.display = 'none';
  });
}

// =========================================================================
// FRETE (inline)
// =========================================================================

function initFrete() {
  const inputCep = document.getElementById('inputCep');
  const btnCalcularFrete = document.getElementById('btnCalcularFrete');
  const divResultado = document.getElementById('resultadoFrete');

  if (!inputCep || !btnCalcularFrete || !divResultado) return;

  inputCep.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
  });

  btnCalcularFrete.addEventListener('click', async () => {
    const cep = inputCep.value;
    if (cep.length < 9) {
      divResultado.innerHTML = "<span style='color:#d32f2f;font-size:13px;'>Por favor, digite um CEP válido.</span>";
      return;
    }
    divResultado.innerHTML = "<span style='font-size:13px;color:inherit;opacity:0.7;'>Calculando prazos e preços...</span>";

    try {
      const resposta = await fetch('/api/frete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cepDestino: cep })
      });

      if (!resposta.ok) throw new Error('Erro na API');
      const transportadoras = await resposta.json();
      divResultado.innerHTML = '';

      if (!transportadoras || transportadoras.error || transportadoras.length === 0) {
        divResultado.innerHTML = "<span style='color:#d32f2f;font-size:13px;'>Não conseguimos cotar para este CEP.</span>";
        return;
      }

      const transportadorasDesejadas = ["PAC", "SEDEX", ".Package", ".Com", "Total Express", "Buslog"];
      const transportadorasVistas = new Set();
      let htmlOpcoes = `<div style="margin-top:20px;border-top:1px solid var(--border-color,#444);padding-top:15px;">`;

      transportadoras.forEach(opcao => {
        if (!opcao.error && transportadorasDesejadas.some(nome => opcao.name.toLowerCase().includes(nome.toLowerCase()))) {
          let nomeExibicao = opcao.name.toUpperCase();
          if (nomeExibicao.includes('.PACKAGE')) nomeExibicao = "JADLOG PACKAGE";
          if (nomeExibicao.includes('.COM')) nomeExibicao = "JADLOG COM";
          if (nomeExibicao.includes('TOTAL EXPRESS')) nomeExibicao = "TOTAL EXPRESS";
          if (nomeExibicao.includes('BUSLOG')) nomeExibicao = "BUSLOG";
          if (transportadorasVistas.has(nomeExibicao)) return;
          transportadorasVistas.add(nomeExibicao);

          const previsaoData = calcularDataPrevisao(opcao.delivery_time);
          htmlOpcoes += `
            <div style="padding:12px 0;border-bottom:1px solid var(--border-color,#444);">
              <span style="font-weight:600;font-size:14px;">${nomeExibicao}</span>
              <span style="font-weight:600;font-size:14px;"> - R$ ${opcao.price}</span>
              <span style="font-size:13px;color:inherit;opacity:0.7;"> - até ${opcao.delivery_time} dias úteis - Previsão ${previsaoData}</span>
            </div>`;
        }
      });

      htmlOpcoes += '</div>';
      divResultado.innerHTML = htmlOpcoes;
    } catch (erro) {
      console.error('Erro ao calcular frete:', erro);
      divResultado.innerHTML = "<span style='color:#d32f2f;font-size:13px;'>Erro ao conectar com as transportadoras.</span>";
    }
  });
}

function calcularDataPrevisao(diasUteis) {
  let data = new Date();
  let diasAdicionados = 0;
  while (diasAdicionados < diasUteis) {
    data.setDate(data.getDate() + 1);
    if (data.getDay() !== 0 && data.getDay() !== 6) diasAdicionados++;
  }
  return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
}

// =========================================================================
// INIT
// =========================================================================

document.addEventListener('DOMContentLoaded', async () => {
  // Load theme
  const savedTheme = localStorage.getItem(APP.THEME_KEY);
  const icon = document.getElementById('theme-icon');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (icon) icon.textContent = 'dark_mode';
  } else {
    document.body.classList.remove('light-mode');
    if (icon) icon.textContent = 'light_mode';
  }

  // Load products
  await loadProducts();

  // Init search bar (all pages)
  initSearchBar();

  // Init cart icon
  updateCartIcon(getCart().length);

  // Make global functions available
  window.toggleTheme = toggleTheme;
  window.toggleSidebar = toggleSidebar;
  window.scrollCarousel = scrollCarousel;
  window.selectSize = selectSize;
  window.openCartModal = openCartModal;
  window.closeCartModal = closeCartModal;
  window.finalizeOrder = finalizeOrder;

  // Route to the correct page
  const path = window.location.pathname;
  if (path.includes('produto.html')) {
    initProductPage();
  } else if (path.includes('categoria.html')) {
    initCategoryPage();
  } else if (path.includes('carrinho.html')) {
    initCheckoutPage();
  } else {
    initHomePage();
  }

  // Init frete (product and checkout pages)
  initFrete();
});
