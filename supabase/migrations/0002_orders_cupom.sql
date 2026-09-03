-- Migração: coluna `cupom` na tabela `orders`.
-- Suporte ao cupom MARINGALOCAL (retirada/entrega local com frete grátis).

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS cupom TEXT;