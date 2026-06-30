import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Aviso em desenvolvimento se as variáveis estiverem faltando
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.error(
    '[MG Mantos] Variáveis de ambiente do Supabase não encontradas.\n' +
    'Crie um arquivo .env na raiz do projeto com:\n' +
    '  VITE_SUPABASE_URL=...\n' +
    '  VITE_SUPABASE_ANON_KEY=...'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);