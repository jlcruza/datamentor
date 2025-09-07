// Supabase client initialization

import { createClient } from '@supabase/supabase-js';
import {VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY} from '../constants/environmentConfigs.ts'

// Create a single Supabase client instance for the app
export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);
