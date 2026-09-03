-- ============================================================
-- Migração 0003: Painel Admin (catálogo de camisas)
-- Evolui a tabela `products` EXISTENTE (id int8, coluna `name`),
-- adicionando os campos do catálogo administrável e as regras de
-- acesso de administrador.
-- Rode no SQL Editor do Supabase (ou `supabase db push`).
-- ============================================================

-- ------------------------------------------------------------
-- 1. Novas colunas no `products`
--    (mantém id int8 e a coluna `name` já usadas pela loja)
-- ------------------------------------------------------------
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS description TEXT;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS sizes TEXT[] DEFAULT '{}';

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- (a coluna `images` já existe; se ainda não for array de texto, ajuste:)
-- ALTER TABLE public.products ALTER COLUMN images TYPE TEXT[] USING
--   CASE WHEN images IS NULL THEN '{}' ELSE ARRAY[images::text] END;

-- ------------------------------------------------------------
-- 2. Helper para identificar administradores
--    Baseado no user_metadata.is_admin do Supabase Auth.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    ((auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin'),
    'false'
  ) = 'true';
$$;

-- ------------------------------------------------------------
-- 3. Promoção de um usuário a admin (execute manualmente):
--    substitua '<USER_UUID>' pelo id do usuário (auth.users.id)
-- ------------------------------------------------------------
-- UPDATE auth.users
-- SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
-- WHERE id = '<USER_UUID>';

-- ------------------------------------------------------------
-- 4. Row Level Security (RLS) no `products`
--    - Leitura pública (vitrine funciona sem login).
--    - Escrita (insert/update/delete) restrita a admins.
-- ------------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "produtos_leitura_publica" ON public.products;
CREATE POLICY "produtos_leitura_publica"
  ON public.products
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "produtos_inserir_admin" ON public.products;
CREATE POLICY "produtos_inserir_admin"
  ON public.products
  FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "produtos_atualizar_admin" ON public.products;
CREATE POLICY "produtos_atualizar_admin"
  ON public.products
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "produtos_excluir_admin" ON public.products;
CREATE POLICY "produtos_excluir_admin"
  ON public.products
  FOR DELETE
  USING (public.is_admin());