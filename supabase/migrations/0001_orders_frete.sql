-- ============================================================
-- Migração: frete + integridade referencial da tabela `orders`
-- Rode este arquivo no SQL Editor do Supabase (ou `supabase db push`).
--
-- ✅ ANTES DE RODAR, confira no painel do Supabase (Table Editor) os TIPOS
--    reais das colunas de ID, e ajuste os comandos se necessário:
--
--    [ ] products.id          -> CONFIRMADO: int8 (bigint)  ✅
--    [ ] order_items.product_id -> deve ser BIGINT (esta migração corrige)
--    [ ] orders.id            -> confirme (padrão: uuid = gen_random_uuid())
--    [ ] orders.user_id       -> confirme (uuid, ref. auth.users)
--    [ ] orders.address_id    -> confirme (uuid, ref. addresses.id)
--    [ ] addresses.id         -> confirme (uuid)
--    [ ] order_items.order_id -> confirme (uuid, ref. orders.id)
--
--   Se algum ID for `text`, troque UUID/BIGINT nos comandos conforme o caso.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Colunas de frete em `orders`
-- ------------------------------------------------------------
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS frete TEXT;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS frete_valor NUMERIC(10, 2) DEFAULT 0;

-- ------------------------------------------------------------
-- 2. Integridade referencial (chaves estrangeiras)
-- ------------------------------------------------------------

-- 2.1 `orders.user_id` -> `auth.users(id)`
--     Usuário excluído mantém o pedido (SET NULL).
ALTER TABLE public.orders
  ADD CONSTRAINT orders_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users (id)
  ON DELETE SET NULL;

-- 2.2 `orders.address_id` -> `addresses(id)`
ALTER TABLE public.orders
  ADD CONSTRAINT orders_address_id_fkey
  FOREIGN KEY (address_id) REFERENCES public.addresses (id)
  ON DELETE SET NULL;

-- 2.3 `order_items.order_id` -> `orders(id)`
--     Excluir o pedido remove os itens (CASCADE).
ALTER TABLE public.order_items
  ADD CONSTRAINT order_items_order_id_fkey
  FOREIGN KEY (order_id) REFERENCES public.orders (id)
  ON DELETE CASCADE;

-- 2.4 `order_items.product_id` -> `products(id)`   [products.id = int8/bigint]
--     a) Garante que a coluna seja BIGINT, casando o tipo com products.id.
ALTER TABLE public.order_items
  ALTER COLUMN product_id TYPE BIGINT USING product_id::bigint;

--     b) Cria a FK impedindo exclusão de produto ainda em pedidos (RESTRICT).
ALTER TABLE public.order_items
  ADD CONSTRAINT order_items_product_id_fkey
  FOREIGN KEY (product_id) REFERENCES public.products (id)
  ON DELETE RESTRICT;