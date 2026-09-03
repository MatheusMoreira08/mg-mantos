-- ============================================================
-- Migração 0004: tabela `addresses` (persistência de endereços)
-- Rode no SQL Editor do Supabase (ou `supabase db push`).
--
-- A tabela já é utilizada pelo app (Carrinho/Minha Conta). Esta migração:
--  - Garante a estrutura completa (incluindo `complemento` e `is_default`).
--  - Aplica RLS para que cada usuário só veja/edite os PRÓPRIOS endereços.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  rua text NOT NULL,
  numero text NOT NULL,
  complemento text,
  bairro text NOT NULL,
  cidade text NOT NULL,
  estado text NOT NULL,
  cep text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Garante as colunas novas caso a tabela já exista (sem `complemento`/`is_default`).
ALTER TABLE public.addresses
  ADD COLUMN IF NOT EXISTS complemento text;
ALTER TABLE public.addresses
  ADD COLUMN IF NOT EXISTS is_default boolean DEFAULT false;

-- ------------------------------------------------------------
-- Row Level Security (opcional, recomendado)
-- ATENÇÃO: só habilite se `addresses.user_id` for do tipo uuid (igual a
-- auth.users.id). O backend (service_role) continua funcionando, pois
-- service_role ignora RLS.
-- ------------------------------------------------------------
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "enderecos_owner_select" ON public.addresses;
CREATE POLICY "enderecos_owner_select"
  ON public.addresses FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "enderecos_owner_insert" ON public.addresses;
CREATE POLICY "enderecos_owner_insert"
  ON public.addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "enderecos_owner_update" ON public.addresses;
CREATE POLICY "enderecos_owner_update"
  ON public.addresses FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "enderecos_owner_delete" ON public.addresses;
CREATE POLICY "enderecos_owner_delete"
  ON public.addresses FOR DELETE
  USING (auth.uid() = user_id);