
import { createClient } from '@supabase/supabase-js';

// Provide default values for development to prevent runtime errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not found in environment variables. Using default values.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
