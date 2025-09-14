import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { runAsAdmin } from "../_shared/oracle.ts";
import {HTTP_RESPONSE_CODES} from "../constants/httpResponseCodes.ts";
import {SandboxRepository} from "../repository/sandboxRepository.ts";

serve(async (req) => {
    try {
        const { data: { user } } = await createClient(req).auth.getUser();
        if (!user) return new Response('Unauthorized', { status: HTTP_RESPONSE_CODES.UNAUTHORIZED });

        const isSandboxActive = await SandboxRepository.doesActiveSandboxExist();
        if (!isSandboxActive) return new Response("Missing sandboxId", { status: HTTP_RESPONSE_CODES.BAD_REQUEST });

        let sandbox = await SandboxRepository.getActiveSandbox();

        const quoted = `"${sandbox.oracle_username}"`;
        const sql = `
BEGIN
  EXECUTE IMMEDIATE 'DROP USER ${quoted} CASCADE';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -01918 THEN -- user does not exist
      RAISE;
    END IF;
END;
/
`;
        await runAsAdmin(sql);

        await SandboxRepository.disableAllSandboxes();

        // Mark in your DB as deleted
        return new Response(JSON.stringify({ ok: true }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        return new Response(`Error: ${e.message}`, { status: HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR });
    }
});
