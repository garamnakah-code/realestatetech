import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return _client;
}

// Safe accessor — returns null if env is not configured.
export const supabase = supabaseUrl && supabaseAnonKey ? getClient() : null;

export const EDGE_FUNCTION_URL = `${supabaseUrl}/functions/v1/ai-sales-partner`;

export async function trackProspectusDownload(source: string) {
  if (!supabase) return;
  try {
    await supabase.from('prospectus_downloads').insert({ source });
  } catch {
    // best-effort
  }
}

export async function submitInspectionRequest(data: {
  name: string;
  email: string;
  phone: string;
  preferred_date?: string;
  notes?: string;
}) {
  if (!supabase) return { error: new Error('Database not configured') as any };
  return supabase.from('inspection_requests').insert(data);
}
