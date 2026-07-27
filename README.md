# MG Mantos

E-commerce de camisas de futebol (mantos), feito sob encomenda — cada pedido é comprado e enviado individualmente após a confirmação do pagamento (modelo dropshipping, sem estoque próprio).

Projeto migrado de HTML/CSS/JS vanilla para **React + Vite**, com **Supabase** como backend (banco de dados e autenticação) e **Mercado Pago** para pagamentos.

## 🚀 Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Supabase](https://supabase.com/) — banco de dados (Postgres) e autenticação
- [Mercado Pago](https://www.mercadopago.com.br/developers) — checkout de pagamentos (Checkout Pro)
- API de frete: [Melhor Envio](https://melhorenvio.com.br/)
- Vercel Functions (`api/`) para lógica de backend serverless

## 📦 Funcionalidades

- Catálogo de produtos com listagem por categoria/liga e página individual de produto
- Carrinho de compras (persistido em `localStorage`)
- Cálculo de frete em tempo real via API do Melhor Envio (com fallback estimado se a chave de API não estiver configurada)
- Cadastro, login e recuperação de senha via Supabase Auth
- Checkout integrado com Mercado Pago (Checkout Pro)
- Confirmação de status de pagamento via webhook
- Página de confirmação de pedido com resumo da compra
- Histórico de pedidos na área "Minha Conta"

## 🛠️ Rodando localmente

### Pré-requisitos

- Node.js 18+
- Uma conta no [Supabase](https://supabase.com/) com um projeto criado
- Uma conta de desenvolvedor no [Mercado Pago](https://www.mercadopago.com.br/developers/panel) (para o `MERCADOPAGO_ACCESS_TOKEN`)
- (Opcional) Uma chave de API do [Melhor Envio](https://melhorenvio.com.br/) para cálculo de frete real

### Instalação

```bash
git clone https://github.com/MatheusMoreira08/mg-mantos.git
cd mg-mantos
git checkout migracao-react-nova
npm install
```

### Variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `VITE_SUPABASE_URL` | URL do seu projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima/pública do Supabase (usada no frontend) |
| `MELHOR_ENVIO_TOKEN` | Token da API do Melhor Envio, usado no cálculo real de frete |
| `MERCADOPAGO_ACCESS_TOKEN` | Access token da sua conta Mercado Pago (obtenha no painel de desenvolvedor) |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave secreta do Supabase (Project Settings > API > `service_role`). **Nunca exponha no frontend** — usada apenas pelo webhook do Mercado Pago para atualizar o status do pedido no servidor |

### Rodando em desenvolvimento

```bash
npm run dev
```

> ⚠️ As rotas em `api/` (frete, criação de preferência de pagamento e webhook) são funções serverless no padrão Vercel. Para testá-las localmente com o comportamento mais próximo de produção, recomenda-se usar `vercel dev` no lugar de `npm run dev`, ou configurar um proxy equivalente.

### Build de produção

```bash
npm run build
```

## 🗄️ Estrutura do banco (Supabase)

Tabelas principais utilizadas pelo app:

- `products` — catálogo de produtos
- `orders` — pedidos (com coluna `status`: `pendente`, `aprovado`, `rejeitado`)
- `order_items` — itens de cada pedido
- `addresses` — endereços de entrega dos usuários

> Certifique-se de que as políticas de **Row Level Security (RLS)** estejam habilitadas nessas tabelas, garantindo que cada usuário só acesse seus próprios pedidos e endereços.

## 💳 Fluxo de pagamento

1. O usuário monta o carrinho e finaliza a compra.
2. Um pedido é criado no Supabase com status `pendente`.
3. O front-end chama `api/criar-preferencia.js`, que cria uma preferência de pagamento no Mercado Pago (Checkout Pro).
4. O usuário é redirecionado para o checkout hospedado pelo Mercado Pago.
5. Após o pagamento, o Mercado Pago notifica `api/webhook-mercadopago.js`, que consulta o status real do pagamento e atualiza o pedido no Supabase (`aprovado` ou `rejeitado`).
6. O usuário é redirecionado de volta para `/pedido-confirmado/:orderId`, onde vê o resumo do pedido.

## 📋 Roadmap / pendências conhecidas

- [ ] Registrar a rota `/pedido-confirmado/:orderId` em `src/App.jsx` (criada mas ainda não registrada)
- [ ] Confirmar/ajustar os nomes reais de coluna usados em `PedidoConfirmado.jsx` contra o schema de `order_items`
- [ ] Painel administrativo para gestão de produtos e pedidos
- [ ] E-mail transacional de confirmação de pedido
- [ ] SEO básico (`robots.txt`, `sitemap.xml`)
- [ ] Arquivo de configuração de deploy (`vercel.json`)
- [ ] Media queries adicionais para telas muito pequenas (< 360px)

## 📄 Licença

Projeto pessoal/privado. Direitos reservados a [Matheus Moreira](https://linkedin.com/in/matheus-moreira-zs).
