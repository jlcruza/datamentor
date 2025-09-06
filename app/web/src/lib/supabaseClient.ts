// Supabase client initialization
// Replace the placeholders below with your project's values.
// Tip: Prefer using environment variables (e.g., import.meta.env.VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)
// and pass them here instead of hardcoding in source code.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";

const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

// Create a single Supabase client instance for the app
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/*
Only password-based auth is used by this app:
- Create Account: supabase.auth.signUp({ email, password, options: { data, emailRedirectTo } })
- Sign In: supabase.auth.signInWithPassword({ email, password })
- Reset Password: supabase.auth.resetPasswordForEmail(email, { redirectTo })
For OAuth or magic link, do not add any buttons/calls here (intentionally unsupported).
*/
