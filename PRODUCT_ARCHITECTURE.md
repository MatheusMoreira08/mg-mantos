# PRODUCT_ARCHITECTURE.md - Estrutura e Organização das Camisas no MG Mantos

Este documento detalha o funcionamento técnico, o modelo de dados, a organização de arquivos, a hierarquia de versões e as regras de negócio das camisas de futebol no projeto **MG Mantos**. 

Utilize este documento como **contexto técnico suplementar ao `DESIGN.md`** para agentes de IA e ferramentas de prototipação como o **Google Stitch** (`stitch.withgoogle.com`).

---

## 1. Modelo de Dados do Produto

Todas as camisas do catálogo são estruturadas na tabela `products` do Supabase e espelhadas no arquivo `src/data/products.json`.

### Schema do Objeto Produto
```json
{
  "id": 701,
  "name": "Camisa Brasil Home 26/27",
  "price": 129.90,
  "image": "img/produtos/26-27/torcedor/BRASIL/principal-home.webp",
  "images": [
    "img/produtos/26-27/torcedor/BRASIL/principal-home.webp",
    "img/produtos/26-27/torcedor/BRASIL/detalhes-home.webp",
    "img/produtos/26-27/torcedor/BRASIL/neymar.webp"
  ],
  "tags": [
    "selecoes",
    "lancamento",
    "destaque"
  ],
  "badge": "Torcedor"
}
```

---

## 2. Estrutura de Imagens (100% Padronizadas em `.webp`)

Todas as fotos de produtos estão organizadas no diretório estático `public/img/produtos/` seguindo a seguinte convenção de pastas:

```text
public/img/produtos/
├── {temporada}/               # ex: 26-27, 25-26, 24-25, retro
│   ├── {modelo}/              # ex: torcedor, jogador
│   │   ├── {NOME_DO_TIME}/    # ex: BRASIL, BARCELONA, FLAMENGO, MILAN
│   │   │   ├── principal-home.webp
│   │   │   ├── costas-home.webp
│   │   │   └── detalhes-home.webp
```

### Padrão de Nomenclatura das Imagens
- **`image` (Foto Capa/Vitrine):** Aponta para a imagem principal (ex: `principal-home.webp` ou `principal-jogador.webp`).
- **`images` (Galeria na Página do Produto):** Array de caminhos `.webp` contendo a capa, foto das costas e detalhes de tecido/patches.

---

## 3. Categorização & Sistema de Tags

A navegação e a filtragem por categorias utilizam tags dinâmicas no banco de dados e sinônimos amigáveis para URLs.

| Categoria (Slug URL) | Tags Correspondentes no Banco | Descrição |
| :--- | :--- | :--- |
| `/categoria/brasileirao` | `nacional`, `brasileirao` | Times brasileiros da Série A/B. |
| `/categoria/times-internacionais` | `europeus`, `internacional`, `ingles`, `italiano`, `espanhol` | Clubes da Europa e Américas. |
| `/categoria/selecoes` | `selecoes` | Seleções nacionais masculinas e femininas. |
| `/categoria/feminina` | `feminina` | Camisas de corte feminino / acinturado. |
| `/categoria/retro` | `retro` | Réplicas clássicas e edições históricas. |
| `/categoria/jogador` | `jogador` | Camisas com tecnologia de atleta (corte slim). |

---

## 4. Hierarquia de Versões, Preços e Personalização

### 4.1 Tipos de Versão (Badges)
- **Torcedor (Padrão):** R$ 129,90 | Corte tradicional / conforto.
- **Jogador (Performance):** R$ 159,90 | Corte atlético / slim fit, tecido mais leve com escudos termocolados.
- **Manga Longa / Edições Especiais:** R$ 169,90 | Modelos especiais de inverno ou comemorativos.

### 4.2 Lógica de Personalização do Manto
- **Preço Base:** Valor do modelo selecionado (ex: R$ 129,90).
- **Adicional de Personalização:** **+ R$ 25,00** quando o usuário preenche os campos de **Nome** e/ou **Número**.
- **Grade de Tamanhos Disponíveis:** `P`, `M`, `G`, `GG`, `2GG`, `3GG`.

---

## 5. Arquitetura dos Componentes React

1. **`src/pages/Produto.jsx` (Página Detalhada do Manto):**
   - Gerencia a galeria interativa de imagens (troca de foto ativa ao clicar na miniatura).
   - Seleção obrigatória de tamanho antes de liberar a compra.
   - Campos opcionais de personalização (Nome e Número) com atualização imediata do subtotal.
   - Módulo de cálculo de frete por CEP via chamada de API (`/api/frete?cep=...`).
   - Adiciona o produto formatado ao `CarrinhoContext`.

2. **`src/components/ProdutoCard.jsx` (Card na Vitrine/Grid):**
   - Renderiza a capa do manto com fallback automático (`/placeholder-camisa.png`) em caso de erro.
   - Exibe tag/badge (ex: *Jogador*, *Novo*), título, preço formatado e parcelamento em até 10x sem juros.

3. **`src/pages/Categoria.jsx` (Página de Categoria):**
   - Executa consultas otimizadas no Supabase usando o operador `.or()` para combinar busca em array de `tags` e busca textual no `name`.

---

## 6. Orientações para Ajustes de Design no Google Stitch

Ao solicitar alterações visuais no Stitch com base nesta estrutura, utilize os seguintes termos de contexto:

- **Galeria Visual de Mantos:** Referencie como uma lista vertical de miniaturas à esquerda com foco grande na imagem principal `.webp`.
- **Seletor de Versão (Torcedor vs Jogador):** Peça componentes do tipo *Pill Toggle* ou *Segmented Control*, destacando a diferença de preço ("A partir de R$ 129,90").
- **Seletor de Tamanhos:** Botões em bloco quadrado ou circular com estado `:active` destacado na cor de acento `var(--accent)` (`#6a0dad`).
- **Formulário de Personalização ("Personalize seu Manto"):** Card colapsável ou destacado com borda roxa sutil, contendo inputs para *Nome da Camisa* e *Número do Jogador* (+ R$ 25,00).
