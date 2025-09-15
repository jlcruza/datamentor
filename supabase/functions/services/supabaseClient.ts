import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.1?target=deno";
import {SUPABASE_URL, SUPABASE_ANON_KEY} from "../_shared/environment.ts";

export function getSupabaseClient(req) {
    // Grab the auth header from the request
    const authHeader = req.headers.get("Authorization")!;

    // Build a "user-scoped" client that forwards the caller’s JWT
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: authHeader } },
    });
}

export async function getSupabaseUser(req) {

    // Now you can safely validate the token
    return getSupabaseClient(req).auth.getUser();
}