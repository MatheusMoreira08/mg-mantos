import { createClient } from '@supabase/supabase-js';

// Valores padrão seguros para evitar que o app quebre se as env vars não estiverem setadas
const defaultUrl = "https://placeholder-project.supabase.co";
const defaultKey = "placeholder-key";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultKey;

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

if (import.meta.env.DEV && !isSupabaseConfigured) {
  console.warn(
    '[MG Mantos] Variáveis de ambiente do Supabase não encontradas. O app funcionará utilizando o catálogo offline (products.json).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);