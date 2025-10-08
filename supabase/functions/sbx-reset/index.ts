import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import {SandboxRepository} from "../repository/sandboxRepository.ts";
import {
    DataMentorResponse_BAD_REQUEST, DataMentorResponse_INTERNAL_SERVER_ERROR,
    DataMentorResponse_NO_CONTENT, DataMentorResponse_OK,
    DataMentorResponse_UNAUTHORIZED
} from "../services/dataMentorResponse.ts";
import {getSupabaseUser} from "../services/supabaseClient.ts";
import {
    ORDS_ADMIN_PASS,
    ORDS_ADMIN_USER,
    ORDS_BASE,
    ORDS_DELETE_SANDBOX_ENDPOINT
} from "../_shared/environment.ts";

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
        await SandboxRepository.disableAllSandboxes(req);

        const requestBody = {
            USER_ID: sandbox.oracle_username
        };
        // 3. Prepare Basic Auth Header for Oracle
        const basicAuth = btoa(`${ORDS_ADMIN_USER}:${ORDS_ADMIN_PASS}`);

        // 4. Call Oracle ORDS DELETE Endpoint
        const deleteSandboxUrl = `${ORDS_BASE}/${ORDS_DELETE_SANDBOX_ENDPOINT}`;
        const oracleResponse = await fetch(deleteSandboxUrl, {
            method: 'DELETE', // Use DELETE method
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${basicAuth}`,
            },
            body: JSON.stringify(requestBody),
        });

        console.log("Oracle Response: ", oracleResponse);
        console.log("Oracle Response Status: ", oracleResponse.status);
        console.log("Oracle Response Status Text: ", oracleResponse.statusText);
        console.log("Oracle Response Text: ", oracleResponse.text());
        console.log("Oracle Response Body: ", oracleResponse.body);

        // Mark in your DB as deleted
        return DataMentorResponse_OK(req, JSON.stringify({ ok: true }));
    } catch (e) {
        return DataMentorResponse_INTERNAL_SERVER_ERROR(req, `Error: ${e.message}`);
    }
});
