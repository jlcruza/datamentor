/**
 * supabase/functions/example.ts
 *
 * Example Supabase Edge Function (Deno) that accepts a SQL statement from the client,
 * forwards it to an Oracle Autonomous Database REST endpoint (e.g. ORDS / OCI REST endpoint),
 * and returns the response back to the caller.
 *
 * IMPORTANT:
 * - This function uses fetch to call a REST endpoint for Oracle. Native Oracle drivers
 *   (e.g. oracledb) are not available in the Edge (Deno) runtime.
 * - Configure the following environment variables in your Supabase Function settings:
 *   - ORACLE_REST_ENDPOINT: full URL of the Oracle REST endpoint that accepts SQL requests
 *     (for example: https://my-ords-host/ords/my_schema/sql or an OCI REST API endpoint).
 *   - ORACLE_API_KEY (optional): if your Oracle endpoint uses a bearer token/API key.
 *   - ORACLE_USER and ORACLE_PASS (optional): if your Oracle endpoint uses Basic auth.
 *
 * SECURITY:
 * - Do NOT store database secrets in source control; use Supabase function environment variables.
 * - Restrict ORACLE_REST_ENDPOINT and credentials appropriately.
 *
 * USAGE:
 * - POST JSON: { "sql": "SELECT * FROM my_table WHERE id = :id", "params": { "id": 1 } }
 * - GET query param: /?sql=SELECT+1
 *
 * NOTE:
 * - This example assumes your Oracle REST endpoint accepts a JSON payload like:
 *   { sql: "...", params: { ... } } and returns JSON with a "rows" property.
 *   Adapt payload/response parsing to match your REST gateway (ORDS/OCI/etc).
 */

import { serve } from "std/server";

type OracleRequestPayload = {
  sql: string;
  params?: Record<string, unknown>;
};

function getOracleAuthHeader(): string | null {
  const apiKey = Deno.env.get("ORACLE_API_KEY");
  if (apiKey) {
    return `Bearer ${apiKey}`;
  }

  const user = Deno.env.get("ORACLE_USER");
  const pass = Deno.env.get("ORACLE_PASS");
  if (user && pass) {
    const b = btoa(`${user}:${pass}`);
    return `Basic ${b}`;
  }

  return null;
}

function corsHeaders() {
  // In development you can allow all origins; in production restrict this to your app origin.
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

serve(async (req: Request) => {
  // Handle preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders(),
      },
    });
  }

  const oracleEndpoint = Deno.env.get("ORACLE_REST_ENDPOINT");
  if (!oracleEndpoint) {
    return new Response(
      JSON.stringify({ error: "ORACLE_REST_ENDPOINT environment variable is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders() } }
    );
  }

  // Parse incoming SQL from JSON body or query param
  let payload: OracleRequestPayload | null = null;
  try {
    if (req.headers.get("content-type")?.includes("application/json")) {
      const body = await req.json().catch(() => null);
      if (body && typeof body === "object" && "sql" in body) {
        payload = { sql: String((body as any).sql), params: (body as any).params };
      }
    }

    // fallback to query param ?sql=...
    if (!payload) {
      const url = new URL(req.url);
      const q = url.searchParams.get("sql");
      if (q) {
        payload = { sql: q };
      }
    }

    if (!payload || !payload.sql) {
      return new Response(
        JSON.stringify({ error: "Missing 'sql' in request body or 'sql' query parameter." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid request body.", details: String(err) }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders() } }
    );
  }

  // Build request to Oracle REST gateway
  const authHeader = getOracleAuthHeader();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (authHeader) headers["Authorization"] = authHeader;

  // Construct body according to your Oracle REST API contract.
  // Many ORDS/REST gateways accept a shape like { sql: "...", params: {...} } or a SQL/POST payload.
  const oracleBody = JSON.stringify({
    sql: payload.sql,
    params: payload.params ?? {},
  });

  try {
    const resp = await fetch(oracleEndpoint, {
      method: "POST",
      headers,
      body: oracleBody,
    });

    const text = await resp.text();
    const contentType = resp.headers.get("content-type") ?? "";
    let data: unknown;

    if (contentType.includes("application/json")) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }
    } else {
      // Non-JSON response: return as text
      data = { raw: text };
    }

    // You may want to massage the Oracle response to a safer shape for the client:
    // - limit number of rows
    // - remove sensitive metadata
    // Example normalization: try to pick rows property if present
    const normalized =
      data && typeof data === "object" && "rows" in (data as any)
        ? { rows: (data as any).rows, meta: (data as any).meta ?? null }
        : { data };

    return new Response(JSON.stringify(normalized), {
      status: resp.ok ? 200 : 502,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to contact Oracle endpoint.", details: String(err) }),
      { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders() } }
    );
  }
});