import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { ordsSql } from "../_shared/oracle.ts";
import {HTTP_RESPONSE_CODES} from "../constants/httpResponseCodes.ts";
import {SandboxRepository} from "../repository/sandboxRepository.ts";

serve(async (req) => {
    try {
        const { data: { user } } = await createClient(req).auth.getUser();
        if (!user) return new Response('Unauthorized', { status: HTTP_RESPONSE_CODES.UNAUTHORIZED });

        const { sql } = await req.json();
        if (!sql) {
            return new Response("Missing sandboxId or sql", { status: HTTP_RESPONSE_CODES.BAD_REQUEST });
        }

        // Guardrails (optional): reject dangerous statements
        const blacklist = [/ALTER\s+SYSTEM/i, /CREATE\s+USER/i, /DROP\s+USER/i];
        if (blacklist.some((re) => re.test(sql))) {
            return new Response("Statement not allowed", { status: HTTP_RESPONSE_CODES.BAD_REQUEST });
        }

        let isSandboxActive = await SandboxRepository.doesActiveSandboxExist();
        if (!isSandboxActive) {
            return new Response("Sandbox is not active", { status: HTTP_RESPONSE_CODES.BAD_REQUEST });
        }

        const sandbox = await SandboxRepository.getActiveSandbox();

        // Timeout via AbortController
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 10_000); // 10s

        let resText;
        try {
            resText = await ordsSql({
                schema: sandbox.oracle_username.toLowerCase(),
                sql,
                authUser: sandbox.oracle_username,
                authPass: sandbox.oracle_password,
                // forward the abort signal so ordsSql (and any internal fetch) can be cancelled
                signal: controller.signal,
            });
        } finally {
            clearTimeout(t);
        }

        return new Response(resText, { headers: { "Content-Type": "application/json" } });
    } catch (e) {
        const isAbort = e?.name === "AbortError";
        return new Response(isAbort ? "Query timeout" : `Error: ${e.message}`, {
            status: isAbort ? HTTP_RESPONSE_CODES.GATEWAY_TIMEOUT : HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR,
        });
    }
});
