# ⚽ MG Mantos | E-commerce de Camisas de Futebol

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

> **MG Mantos** é uma aplicação Front-end de uma loja virtual moderna, responsiva e dinâmica, especializada na venda de camisas de futebol de alta qualidade. Desenvolvida inteiramente com Vanilla JS (sem frameworks), com checkout via WhatsApp e deploy na Vercel.

---

## 🚀 Funcionalidades

- **🛍️ Vitrine Dinâmica:** Carrosséis de produtos com rolagem horizontal
- **⚡ Renderização Inteligente:** Template único (`produto.html`) com carregamento dinâmico via JSON
- **🌗 Tema Claro/Escuro:** Alternância com CSS Variables e LocalStorage
- **📱 Design Responsivo:** Layout adaptável com menu hambúrguer
- **📸 Galeria Interativa:** Troca de imagens por miniaturas
- **🛒 Carrinho com Agrupamento:** Itens agrupados por variante com controle de quantidade
- **🚚 Cálculo de Frete:** Integração com API Melhor Envio (Vercel Function)
- **🔍 Busca Fuzzy:** Pesquisa inteligente com Fuse.js
- **📄 Paginação:** Navegação por páginas na listagem de categorias

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estruturação semântica |
| **CSS3** | Flexbox, Grid, Custom Properties, Media Queries |
| **JavaScript (ES6+)** | DOM, Fetch API, URLSearchParams, LocalStorage |
| **Fuse.js** | Busca fuzzy client-side (via CDN com SRI) |
| **Vercel Functions** | API serverless para cálculo de frete |

---

## 📂 Arquitetura

```
mg-mantos/
├── api/
│   └── frete.js              # Vercel Function (Melhor Envio)
├── css/
│   └── style.css             # Estilos globais
├── js/
│   ├── config.js             # Configurações globais
│   ├── main.js               # Ponto de entrada (carrinho, busca, rotas)
│   └── data/
│       └── products.json     # Catálogo de produtos
├── img/                      # Imagens e assets
├── index.html                # Página inicial
├── categoria.html            # Categoria / Busca (com paginação)
├── produto.html              # Detalhe do produto
├── carrinho.html             # Checkout / Resumo
├── robots.txt
└── sitemap.xml
```

---

## 💻 Como Executar

```bash
git clone https://github.com/MatheusMoreira08/mg-mantos.git
cd mg-mantos
```

Abra `index.html` no navegador ou use o **Live Server** do VS Code.

> Para a API de frete funcionar localmente, configure a variável `MELHOR_ENVIO_TOKEN` e use o Vercel CLI.

---

## 🌐 Deploy

Deploy automático na **Vercel** via push para o branch `main`.

---

<div align="center">
  Desenvolvido por <strong>Matheus Moreira</strong>
</div>
