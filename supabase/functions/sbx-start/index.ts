import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import {
    randomSandboxUser,
    randomOraclePassword,
} from "../_shared/oracle.ts";
import {
    SANDBOX_TTL_MIN,
    ORDS_ADMIN_USER,
    ORDS_ADMIN_PASS,
    ORDS_BASE,
    ORDS_CREATE_SANDBOX_ENDPOINT
} from "../_shared/environment.ts";
import {SandboxDto} from "../repository/dtos/sandboxDto.ts";
import {SandboxRepository} from "../repository/sandboxRepository.ts";
import {
    DataMentorResponse_INTERNAL_SERVER_ERROR, DataMentorResponse_NO_CONTENT, DataMentorResponse_OK,
    DataMentorResponse_UNAUTHORIZED
} from "../services/dataMentorResponse.ts";
import {getSupabaseUser} from "../services/supabaseClient.ts";

const BASE_10 = 10;
const TTL_MIN = parseInt(SANDBOX_TTL_MIN, BASE_10);

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
        if (isSandboxActive) {
            const existingSandbox = await SandboxRepository.getActiveSandbox(req);

            return DataMentorResponse_OK(
                req,
                JSON.stringify({
                    sandboxId: existingSandbox.oracle_username,
                    expiresAt: existingSandbox.expire_at,
                }),
            );
        }

        const sandbox: SandboxDto = {
            student_id: user.id,
            oracle_username: randomSandboxUser("SBX"),
            oracle_password: randomOraclePassword(),
            expire_at: new Date(Date.now() + TTL_MIN * 60_000).toISOString()
        };

        const requestBody = {
            USER_ID: sandbox.oracle_username,
            PASSWORD: sandbox.oracle_password,
        };

        // 3. Prepare Basic Auth Header for Oracle
        const basicAuth = btoa(`${ORDS_ADMIN_USER}:${ORDS_ADMIN_PASS}`);

        // 4. Call Oracle ORDS Endpoint
        const createSandboxUrl = `${ORDS_BASE}/${ORDS_CREATE_SANDBOX_ENDPOINT}`;
        const oracleResponse = await fetch(createSandboxUrl, {
            method: 'POST',
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

        await SandboxRepository.insertSandbox(req, sandbox);

        return DataMentorResponse_OK(
            req,
            JSON.stringify({
                sandboxId: sandbox.oracle_username,
                expiresAt: sandbox.expire_at,
                result: oracleResponse.text,
            }),
        );
    } catch (e) {
        return DataMentorResponse_INTERNAL_SERVER_ERROR(req, `Error: ${e.message}`);
    }
});
