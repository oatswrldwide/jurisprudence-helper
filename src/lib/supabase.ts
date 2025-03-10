
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for the entire app with fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXB0cHBsZnZpaWZyYnZraWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI1MzUzNjIsImV4cCI6MTk5ODExMTM2Mn0.TmaSzH2H_VFuz0MH4GXjICLO-IBtzPQDTHWDG2VRbvs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add this for development mode only
if (import.meta.env.DEV) {
  console.log("Using development Supabase client. Authentication will work with mock credentials.");
}
