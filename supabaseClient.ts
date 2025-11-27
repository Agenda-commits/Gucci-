import { createClient } from '@supabase/supabase-js';

// Gunakan URL placeholder yang valid secara sintaksis untuk mencegah error "Invalid URL" saat startup.
// Ganti nilai ini dengan URL & Key asli dari Project Supabase Anda.
const supabaseUrl = 'https://placeholder.supabase.co'; 
const supabaseKey = 'placeholder-key';

let client;

try {
  // Mencoba menginisialisasi client
  client = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.warn('Supabase client failed to initialize, using fallback mode:', error);
  // Fallback: Mock object agar aplikasi tidak crash (White Screen)
  client = {
    from: () => ({
      insert: async () => ({ error: { message: 'Supabase not configured correctly.' } }),
      select: async () => ({ error: { message: 'Supabase not configured correctly.' } }),
    }),
  } as any;
}

export const supabase = client;