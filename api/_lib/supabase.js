import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com privilégios de service_role.
 * Usado APENAS nas Serverless Functions (nunca no frontend) para operações
 * administrativas: ler pedidos, revalidar preços e atualizar status via webhook.
 *
 * A chave service_role ignora as Row Level Security (RLS), então é crucial que
 * este módulo jamais seja importado/empacotado no bundle do navegador.
 */
export const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);