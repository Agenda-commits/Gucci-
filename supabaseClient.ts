import { createClient } from '@supabase/supabase-js';

// GANTI DENGAN URL DAN ANON KEY SUPABASE ANDA
// Masuk ke Dashboard Supabase -> Project Settings -> API
const supabaseUrl = 'YOUR_SUPABASE_URL'; 
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);