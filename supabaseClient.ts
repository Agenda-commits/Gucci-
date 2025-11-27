
import { createClient } from '@supabase/supabase-js';

// Placeholder URL yang valid secara format untuk mencegah error "Invalid URL" saat inisialisasi.
// Ganti string ini dengan Project URL & Anon Key asli dari Dashboard Supabase Anda agar fitur simpan data berfungsi.
const supabaseUrl = 'https://placeholder.supabase.co'; 
const supabaseKey = 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
