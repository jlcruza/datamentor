import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import {
    runAsAdmin,
    randomSandboxUser,
    randomOraclePassword,
} from "../_shared/oracle.ts";
import {SBX_OWNER, SANDBOX_TTL_MIN} from "../_shared/environment.ts";
import {ALL_TABLES} from "../_shared/tables.ts";
import {HTTP_RESPONSE_CODES} from "../constants/httpResponseCodes.ts";
import {SandboxDto} from "../repository/dtos/sandboxDto.ts";
import {SandboxRepository} from "../repository/sandboxRepository.ts";

const BASE_10 = 10;
const TTL_MIN = parseInt(SANDBOX_TTL_MIN, BASE_10);

serve(async (req) => {
    try {
        const { data: { user } } = await createClient(req).auth.getUser();
        if (!user) return new Response('Unauthorized', { status: HTTP_RESPONSE_CODES.UNAUTHORIZED });

        sandbox: SandboxDto = {
            student_id = user.id,
            oracle_username = randomSandboxUser("SBX"),
            oracle_password = randomOraclePassword(),
            expire_at = new Date(Date.now() + TTL_MIN * 60_000).toISOString()
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
  EXECUTE IMMEDIATE 'CREATE USER ${quotedUser} IDENTIFIED BY "${oraclePass}" QUOTA 100M ON DATA';
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

        await SandboxRepository.insertSandbox(sandbox);

        // Return a handle for follow-up calls (client never sees the Oracle password)
        // Your frontend should only call your functions; your functions will use the stored creds.
        return new Response(
            JSON.stringify({
                sandboxId: sandbox.oracle_username,  // e.g. "SBX_7H4F2KQ9"
                expiresAt: sandbox.expire_at,
            }),
            { headers: { "Content-Type": "application/json" } },
        );
    } catch (e) {
        return new Response(`Error: ${e.message}`, { status: HTTP_RESPONSE_CODES.INTERNAL_SERVER_ERROR });
    }
});
