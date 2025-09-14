import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { runAsAdmin } from "../_shared/oracle.ts";
import {SandboxRepository} from "../repository/sandboxRepository.ts";
import {
    DataMentorResponse_BAD_REQUEST, DataMentorResponse_INTERNAL_SERVER_ERROR,
    DataMentorResponse_NO_CONTENT, DataMentorResponse_OK,
    DataMentorResponse_UNAUTHORIZED
} from "../services/dataMentorResponse.ts";
import {getSupabaseUser} from "../services/supabaseClient.ts";

serve(async (req) => {
    try {
        if (req.method === "OPTIONS") {
            console.log("CORS preflight");
            return DataMentorResponse_NO_CONTENT(req);
        }

        const { data: { user }, error } = await getSupabaseUser(req);
        if (!user || error) {
            console.log("Unauthorized");
            return DataMentorResponse_UNAUTHORIZED(req);
        }

        const isSandboxActive = await SandboxRepository.doesActiveSandboxExist(req);
        if (!isSandboxActive) return DataMentorResponse_BAD_REQUEST(req, "Missing sandboxId");

        let sandbox = await SandboxRepository.getActiveSandbox(req);

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

        await SandboxRepository.disableAllSandboxes(req);

        // Mark in your DB as deleted
        return DataMentorResponse_OK(req, JSON.stringify({ ok: true }));
    } catch (e) {
        return DataMentorResponse_INTERNAL_SERVER_ERROR(req, `Error: ${e.message}`);
    }
});
