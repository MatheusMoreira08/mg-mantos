# DESIGN.md - MG Mantos

Este documento define o sistema de design, a linguagem visual, os tokens de estilo, componentes de UI e as diretrizes estéticas do **MG Mantos**, e-commerce especializado em mantos sagrados e camisas de futebol.

---

## 1. Visão Geral & Conceito de Design

- **Nome da Aplicação:** MG Mantos
- **Público-Alvo:** Apaixonados por futebol, colecionadores e torcedores em busca de camisas oficiais e retrôs.
- **Conceito Estético:** Esportivo moderno, vibrante e premium. Combina a energia dos estádios com uma interface limpa, elegante e intuitiva.
- **Destaques de UI:** Suporte a **Dark/Light Mode**, tipografia marcante para títulos em caixa alta, acentos na cor roxa royal neon (`#6a0dad`) com efeitos de brilho (glow), e cards com micro-interações suaves.

---

## 2. Design Tokens & Sistema de Cores

### 2.1 Paleta de Cores (Light & Dark Theme)

O sistema utiliza CSS Custom Properties vinculadas ao atributo `data-theme` para alternância dinâmica.

```css
:root {
  color-scheme: light;
  
  /* Cores Base - Tema Claro */
  --bg-primary: #ffffff;
  --bg-secondary: #f4f5f8;
  --bg-card: #ffffff;
  --bg-card-hover: #eef0f4;
  
  /* Acento Vibrante (Roxo MG Mantos) */
  --accent: #6a0dad;
  --accent-light: #8b2be2;
  --accent-glow: rgba(106, 13, 173, 0.18);
  
  /* Tipografia */
  --text-primary: #111111;
  --text-secondary: #4f4f56;
  --text-muted: #7d7d86;
  
  /* Bordas e Divisores */
  --border: #d9dbe3;
  --border-accent: #6a0dad;
  
  /* Feedback / Status */
  --success: #2d9e5a;
  --error: #e63946;
  
  /* Sombras */
  --shadow-card: 0 2px 12px rgba(15, 23, 42, 0.08);
  --shadow-accent: 0 0 20px rgba(106, 13, 173, 0.18);
  --shadow-hover: 0 12px 28px rgba(15, 23, 42, 0.12);
}

[data-theme='dark'] {
  color-scheme: dark;
  
  /* Cores Base - Tema Escuro */
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-card: #1a1a1a;
  --bg-card-hover: #222222;
  
  /* Acento Vibrante */
  --accent: #6a0dad;
  --accent-light: #8b2be2;
  --accent-glow: rgba(106, 13, 173, 0.25);
  
  /* Tipografia */
  --text-primary: #f0f0f0;
  --text-secondary: #999999;
  --text-muted: #555555;
  
  /* Bordas e Divisores */
  --border: #2a2a2a;
  --border-accent: #6a0dad;
  
  /* Sombras */
  --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.4);
  --shadow-accent: 0 0 20px rgba(106, 13, 173, 0.3);
  --shadow-hover: 0 8px 32px rgba(0, 0, 0, 0.6);
}
```

---

## 3. Tipografia

A tipografia reflete a identidade esportiva e moderna do projeto.

| Função | Família Tipográfica | Aplicação / Estilo |
| :--- | :--- | :--- |
| **Display / Títulos** | `'Bebas Neue', sans-serif` | Cabeçalhos principais (`h1`, `h2`), títulos de banners e destaques. Caixa alta, espaçamento condensado e impacto visual. |
| **Body / Texto Geral** | `'Inter', sans-serif` | Textos de corpo, descrições de produtos, parágrafos e formulários. Excelente legibilidade em telas. |
| **UI / Badges / Contadores** | `'Oswald', sans-serif` | Preços, contadores do carrinho, seletores de tamanho e tags de categoria. |

### Hierarquia de Tamanhos

- `h1`: 56px (Desktop) / 36px (Mobile) | Line Height: 1.1 | Letter-spacing: -1.68px
- `h2`: 24px (Desktop) / 20px (Mobile) | Line Height: 1.2 | Letter-spacing: -0.24px
- `h3`: 18px | Line Height: 1.3
- `Body Standard`: 16px | Line Height: 1.5
- `Caption / Badges`: 12px - 14px | Font-weight: 600

---

## 4. Sistema de Espaçamento e Elevação

### 4.1 Espaçamento
- **XS (`--space-xs`):** 4px
- **SM (`--space-sm`):** 8px
- **MD (`--space-md`):** 16px
- **LG (`--space-lg`):** 24px
- **XL (`--space-xl`):** 40px
- **2XL (`--space-2xl`):** 64px

### 4.2 Arredondamento (Border Radius)
- **SM (`--radius-sm`):** 6px (Botões secundários, inputs, tags)
- **MD (`--radius-md`):** 10px (Cards de produtos, dropdowns, modais)
- **LG (`--radius-lg`):** 16px (Banners principais, containers destacados)
- **Full (`--radius-full`):** 9999px (Pills, contadores de quantidade, badges)

---

## 5. Especificação de Componentes de UI

### 5.1 Header & Navegação (`Header.jsx`)
- **Fundo:** Translúcido com efeito `backdrop-filter: blur(12px)` e borda inferior sutil `var(--border)`.
- **Barra de Busca com Autocomplete:**
  - Input arredondado com busca em tempo real (debounce 300ms via Supabase).
  - Dropdown com pré-visualização de imagem, nome do produto e preço.
- **Categorias (Menu de Filtro Rápido):**
  - Links: *Brasileirão, Times Internacionais, Seleções, Feminina, Retrô, Jogador*.
  - Hover: Efeito de sublinhado animado e mudança de cor para `var(--accent-light)`.
- **Ações Rápidas:** Botão de alternância de Tema (Sol/Lua) e Ícone do Carrinho com badge de quantidade com background `var(--accent)`.

### 5.2 Card de Produto (`ProdutoCard.jsx`)
- **Estrutura:**
  - Imagem do manto com efeito `zoom` (`scale(1.05)`) ao passar o mouse.
  - Tag de categoria / edição (ex: "Versão Jogador", "Retrô").
  - Título do produto com fonte `Bebas Neue` ou `Inter` semi-bold.
  - Preço original (riscado) e Preço promocional em destaque.
  - Informação de parcelamento (ex: "em até 10x sem juros").
  - Botão de ação rápida "Adicionar ao Carrinho" com feedback visual imediato.

### 5.3 Banner Carousel (`BannerCarousel.jsx`)
- **Estilo:** Carrossel rotativo de alta resolução destacando lançamentos e ofertas imperdíveis.
- **Navegação:** Setas laterais de navegação e indicadores (dots) na parte inferior.
- **Call-to-Action:** Botões com gradiente `linear-gradient(135deg, var(--accent), var(--accent-light))` e efeito de brilho no hover.

### 5.4 Página do Produto (`Produto.jsx`)
- **Layout:** 2 colunas no desktop (Galeria de fotos à esquerda, Painel de compra e personalização à direita).
- **Seletor de Tamanhos:** Pills interativas (`P`, `M`, `G`, `GG`, `XGG`).
- **Personalização:** Campo para acréscimo de Nome, Número e Patches Oficiais.

### 5.5 Carrinho & Checkout (`Carrinho.jsx`)
- **Lista de Itens:** Imagem em miniatura, detalhes de personalização, controle de quantidade (+/-) e botão de remoção.
- **Resumo do Pedido:** Cálculo de frete por CEP, campo de cupom de desconto e valor total destacado.

---

## 6. Micro-interações & Transições

1. **Troca de Tema (Dark/Light):** Transição suave de fundo e cores: `transition: background-color 0.2s ease, color 0.2s ease`.
2. **Hover nos Botões:** Elevação leve `transform: translateY(-2px)` com expansão de sombra `var(--shadow-hover)`.
3. **Pressionamento do Botão (Click):** Efeito tátil `transform: scale(0.98)`.
4. **Entrada de Modais e Dropdowns:** Animação de fade-in e slide vertical (`translateY(8px)` para `0px`).

---

## 7. Responsividade e Breakpoints

- **Mobile (< 640px):**
  - Grid de produtos em 1 ou 2 colunas.
  - Menu de navegação colapsável estilo Drawer / Hambúrguer.
- **Tablet (640px - 1024px):**
  - Grid de produtos em 3 colunas.
- **Desktop (> 1024px):**
  - Grid de produtos em 4 colunas.
  - Header fixo completo com menu estendido.

---

## 8. Guia de Integração com Agentes AI & Stitch

Para utilizar este arquivo no **Google Stitch** (`stitch.withgoogle.com`) ou em outros agentes de codificação:
1. Mantenha as variáveis de CSS em `src/styles/tokens.css` sincronizadas com este documento.
2. Certifique-se de que novos componentes reutilizem as classes utilitárias e tokens `--accent`, `--bg-card`, `--font-display` e `--font-body`.
3. Não insira cores fixas (hexadecimal/RGB) diretamente nos componentes JSX; sempre faça referência a `var(--token)`.
