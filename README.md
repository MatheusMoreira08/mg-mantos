# ⚽ MG Mantos | E-commerce de Camisas de Futebol

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

> **MG Mantos** é uma aplicação Front-end de uma loja virtual moderna, responsiva e dinâmica, especializada na venda de camisas de futebol de alta qualidade. Desenvolvida inteiramente com Vanilla JS (sem frameworks), demonstrando fortes fundamentos de manipulação de DOM e lógica de programação.

---

## 🚀 Funcionalidades Principais

- **🛍️ Vitrine Dinâmica:** Carrosséis de produtos ("Lançamentos" e "Mais Vendidos") com rolagem horizontal contínua e suporte a touch em dispositivos móveis.
- **⚡ Renderização Inteligente de Produtos:** Sistema de template único (`produto.html`). A página identifica a camisa clicada através de parâmetros de URL (`?id=X`) e injeta os dados (fotos, nome, preço, descrição) dinamicamente via JavaScript.
- **🌗 Tema Claro/Escuro (Dark Mode):** Alternância completa do esquema de cores da interface com apenas um clique, gerenciado através de Variáveis CSS (`:root`) e salvo no LocalStorage.
- **📱 Design 100% Responsivo:** Layout adaptável (Mobile-First) com menu hambúrguer, otimização da barra de busca em telas menores e reestruturação de grids usando Flexbox e CSS Grid.
- **📸 Galeria Interativa:** Visualização detalhada na página do produto, permitindo a troca da imagem principal ao clicar nas miniaturas.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído priorizando tecnologias base da web para garantir alta performance e aprofundamento nos fundamentos:

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estruturação semântica visando acessibilidade e SEO |
| **CSS3** | Flexbox, CSS Grid, Media Queries e Custom Properties (temas) |
| **JavaScript (ES6+)** | Manipulação de DOM, URLSearchParams e simulação de banco de dados |

---

## 📂 Arquitetura do Projeto
```text
📦 mg-mantos
 ┣ 📂 css
 ┃ ┗ 📜 style.css       # Estilos globais, variáveis e media queries
 ┣ 📂 js
 ┃ ┣ 📜 database.js     # Array de objetos simulando o banco de dados (API)
 ┃ ┗ 📜 main.js         # Lógica de renderização, temas e interatividade
 ┣ 📂 img               # Ativos visuais, banners e mockups das camisas
 ┣ 📜 index.html        # Landing page e vitrines
 ┗ 📜 produto.html      # Template de renderização dinâmica de produtos
```

---

## 💻 Como Executar o Projeto

Como o projeto é estático (apenas Front-end), não é necessária a instalação de dependências ou servidores complexos.

**1. Clone este repositório:**
```bash
[git clone [https://github.com/MatheusMoreira08/mg-mantos.git]
```

**2. Navegue até o diretório do projeto:**
```bash
cd mg-mantos
```

**3. Abra o arquivo `index.html` no seu navegador de preferência.**

> 💡 **Dica:** Se estiver usando o VS Code, utilize a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para uma melhor experiência de desenvolvimento.

---

## 🗺️ Próximos Passos (Roadmap)

- [ ] Implementar funcionalidade de **Adicionar ao Carrinho** (usando LocalStorage)
- [ ] Criar página de **Checkout / Resumo do Pedido**
- [ ] Adicionar **filtros por categoria** (Nacionais, Internacionais, Seleções)
- [ ] Integrar com uma **API real** (substituir o `database.js` por Fetch API)

---

<div align="center">
  Desenvolvido com ☕ e 💻 por <strong>Matheus Moreira</strong>
</div>
