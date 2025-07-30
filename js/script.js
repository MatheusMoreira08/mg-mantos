document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("bannerCarousel");
  const slidesContainer = carousel.querySelector(".carousel-slides");
  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const indicatorsContainer = carousel.querySelector(".indicators");
  const total = slides.length;

  let index = 0;
  let isTransitioning = false;

  // 1) Clonar primeiro e último slide
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[total - 1].cloneNode(true);
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slides[0]);
  
  // 2) Posicionar no slide “verdadeiro” de índice zero
  const slideWidth = carousel.offsetWidth;
  slidesContainer.style.transform = `translateX(-${slideWidth}px)`;

  // 3) Criar indicadores
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    dot.classList.add("indicator");
    if (i === 0) dot.classList.add("active");
    dot.dataset.slide = i;
    indicatorsContainer.append(dot);
  }
  const indicators = Array.from(indicatorsContainer.children);

  // 4) Funções de navegação
  function updateIndicators() {
    indicators.forEach(d => d.classList.remove("active"));
    indicators[index].classList.add("active");
  }

  function goToSlide(i) {
    if (isTransitioning) return;
    isTransitioning = true;
    index = (i + total) % total;
    slidesContainer.style.transition = `transform var(--transition-time) ease`;
    slidesContainer.style.transform = `translateX(-${(index + 1) * slideWidth}px)`;
    updateIndicators();
  }

  function handleTransitionEnd() {
    isTransitioning = false;
    // Corrige o loop “infinito”
    if (index < 0) {
      slidesContainer.style.transition = "none";
      index = total - 1;
      slidesContainer.style.transform = `translateX(-${(index + 1) * slideWidth}px)`;
    } else if (index >= total) {
      slidesContainer.style.transition = "none";
      index = 0;
      slidesContainer.style.transform = `translateX(-${slideWidth}px)`;
    }
  }

  // 5) Auto‑play
  let intervalId = setInterval(() => goToSlide(index + 1), 6000);

  // 6) Eventos
  slidesContainer.addEventListener("transitionend", handleTransitionEnd);

  // clique no slide para avançar
  slidesContainer.addEventListener("click", () => {
    clearInterval(intervalId);
    goToSlide(index + 1);
    intervalId = setInterval(() => goToSlide(index + 1), 6000);
  });

  // clique nas bolinhas
  indicators.forEach(dot => {
    dot.addEventListener("click", () => {
      clearInterval(intervalId);
      goToSlide(Number(dot.dataset.slide));
      intervalId = setInterval(() => goToSlide(index + 1), 6000);
    });
  });

  // reajuste em resize
  window.addEventListener("resize", () => {
    const newWidth = carousel.offsetWidth;
    slidesContainer.style.transition = "none";
    slidesContainer.style.transform = `translateX(-${(index + 1) * newWidth}px)`;
  });
});
