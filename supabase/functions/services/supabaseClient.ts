import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.1";
import {SUPABASE_URL, SUPABASE_ANON_KEY} from "../_shared/environment.ts";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)