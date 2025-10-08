import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import {ordsSql, runAsAdmin} from "../_shared/oracle.ts";
import {SandboxRepository} from "../repository/sandboxRepository.ts";
import {
    DataMentorResponse_BAD_REQUEST, DataMentorResponse_GATEWAY_TIMEOUT, DataMentorResponse_INTERNAL_SERVER_ERROR,
    DataMentorResponse_NO_CONTENT, DataMentorResponse_OK,
    DataMentorResponse_UNAUTHORIZED
} from "../services/dataMentorResponse.ts";
import {getSupabaseUser} from "../services/supabaseClient.ts";
import {SBX_OWNER_PASS, SBX_OWNER_USER} from "../_shared/environment.ts";


serve(async (req) => {
    const ALTER_SYSTEM: RegExp = /ALTER\s+SYSTEM/i
    const CREATE_USER: RegExp = /CREATE\s+USER/i
    const DROP_USER: RegExp = /DROP\s+USER/i
    const CREATE_TABLE: RegExp = /CREATE\s+TABLE/i
    const ALTER_TABLE: RegExp = /ALTER\s+TABLE/i
    const DROP_TABLE: RegExp = /DROP\s+TABLE/i

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

        const { sql } = await req.json();
        if (!sql) {
            return DataMentorResponse_BAD_REQUEST(req, "Missing sql");
        }

        // Guardrails (optional): reject dangerous statements
        const blacklist = [ALTER_SYSTEM, CREATE_USER, DROP_USER];
        if (blacklist.some((re) => re.test(sql))) {
            return DataMentorResponse_BAD_REQUEST(req, "Statement not allowed")
        }

        let isSandboxActive = await SandboxRepository.doesActiveSandboxExist(req);
        if (!isSandboxActive) {
            return DataMentorResponse_BAD_REQUEST(req, "Sandbox is not active");
        }

        const sandbox = await SandboxRepository.getActiveSandbox(req);

        let resText;
        try {
            console.log("Executing SQL: ", sql);
            console.log("Executing AS: ", sandbox.oracle_username);
            resText = await ordsSql({
                schema: sandbox.oracle_username.toLowerCase(),
                sql,
                authUser: sandbox.oracle_username,
                authPass: sandbox.oracle_password,
            });
        }
        catch (e) {
            console.error("Error executing SQL:", e);
            throw e;
        }
        finally {
            // Do nothing
        }

        return DataMentorResponse_OK(req, resText)
    } catch (e) {
        const isAbort = e?.name === "AbortError";
        let body = isAbort ? "Query timeout" : `Error: ${e.message}`;
        return isAbort ? DataMentorResponse_GATEWAY_TIMEOUT(req, body)
            : DataMentorResponse_INTERNAL_SERVER_ERROR(req, body);
    }
});
