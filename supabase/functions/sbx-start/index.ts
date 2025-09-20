import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import {
    runAsAdmin,
    randomSandboxUser,
    randomOraclePassword,
} from "../_shared/oracle.ts";
import {SBX_OWNER, SANDBOX_TTL_MIN} from "../_shared/environment.ts";
import {ALL_TABLES} from "../_shared/tables.ts";
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

        const quotedUser = `"${sandbox.oracle_username}"`;
        const quotedOwner = `"${SBX_OWNER}"`;
        const seedCtas = ALL_TABLES.map(
            (t) =>
                `EXECUTE IMMEDIATE 'CREATE TABLE ${quotedUser}."${t}" AS SELECT * FROM ${quotedOwner}."${t}"';`,
        ).join("\n");

        const sql = `
DECLARE
  v_exists NUMBER;
BEGIN
  -- 1) Create user (tablespace names on ADB are typically DATA & TEMP)
  EXECUTE IMMEDIATE 'CREATE USER ${quotedUser} IDENTIFIED BY "${sandbox.oracle_password}" QUOTA 100M ON DATA';
  -- 2) Grants (minimum viable for CRUD + basic DDL/PLSQL demos)
  EXECUTE IMMEDIATE 'GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE, CREATE PROCEDURE, CREATE TRIGGER TO ${quotedUser}';
  -- Optional: allow synonyms, types if you need them
  -- EXECUTE IMMEDIATE 'GRANT CREATE TYPE, CREATE SYNONYM TO ${quotedUser}';

  -- 3) Copy seed tables (explicit list)
  ${seedCtas}

  -- 4) Enable ORDS on the new schema
  ORDS.ENABLE_SCHEMA(
    p_enabled             => TRUE,
    p_schema              => ${quotedUser},
    p_url_mapping_type    => 'BASE_PATH',
    p_url_mapping_pattern => LOWER(${quotedUser}),
    p_auto_rest_auth      => FALSE
  );
  COMMIT;
END;
/
`;

        // Run the provisioning script
        await runAsAdmin(sql);

        await SandboxRepository.insertSandbox(req, sandbox);

        return DataMentorResponse_OK(
            req,
            JSON.stringify({
                sandboxId: sandbox.oracle_username,  // e.g. "SBX_7H4F2KQ9"
                expiresAt: sandbox.expire_at,
            }),
        );
    } catch (e) {
        return DataMentorResponse_INTERNAL_SERVER_ERROR(req, `Error: ${e.message}`);
    }
});
