export const ORDS_BASE = Deno.env.get("ORDS_BASE")!;
export const ORDS_ADMIN_USER = Deno.env.get("ORDS_ADMIN_USER")!;
export const ORDS_ADMIN_PASS = Deno.env.get("ORDS_ADMIN_PASS")!;
export const SBX_OWNER = Deno.env.get("SBX_OWNER") ?? "SBX_OWNER";
export const SANDBOX_TTL_MIN = Deno.env.get("SANDBOX_TTL_MIN") ?? "60";
export const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
export const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");