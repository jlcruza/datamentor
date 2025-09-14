import {ORDS_BASE, ORDS_ADMIN_USER, ORDS_ADMIN_PASS, SBX_OWNER} from "./environment.ts";

function b64(username: string, password: string) {
    return typeof btoa === "function"
        ? btoa(`${username}:${password}`)
        : Buffer.from(`${username}:${password}`).toString("base64");
}

export async function ordsSql({
                                  schema,
                                  sql,
                                  authUser,
                                  authPass,
                              }: {
    schema: string;
    sql: string;
    authUser: string;
    authPass: string;
}) {
    const oracleUrl = `${ORDS_BASE}/${encodeURIComponent(schema)}/_/sql`;
    const oracleResponse = await fetch(oracleUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/sql",
            "Authorization": `Basic ${b64(authUser, authPass)}`,
        },
        body: sql,
    });
    const text = await oracleResponse.text();
    if (!oracleResponse.ok) {
        throw new Error(`ORDS ${oracleResponse.status}: ${text}`);
    }

    console.log(`ORDS ${oracleResponse.status}: ${text}`);
    return text; // ORDS returns JSON text (string). Let caller JSON.parse if needed.
}

// Provisioning runs as the admin/provisioning user against ADMIN (or any schema path)
// We’ll still call via /ords/<any>/_/sql; the schema in the SQL determines privileges.
export async function runAsAdmin(sql: string) {
    console.log("Running as admin:", sql);
    const schemaPath = SBX_OWNER.toLowerCase();
    return ordsSql({
        schema: schemaPath,
        sql,
        authUser: ORDS_ADMIN_USER,
        authPass: ORDS_ADMIN_PASS,
    });
}

// tiny helper
export function randomSandboxUser(prefix = "SBX", len = 8) {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = prefix + "_";
    for (let i = 0; i < len; i++) {
        s += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return s;
}

// generate a strong Oracle password (must meet complexity)
export function randomOraclePassword() {
    // at least 12 chars, mix of upper/lower/digit/symbol
    const U = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const L = "abcdefghijkmnopqrstuvwxyz";
    const D = "23456789";
    const S = "#$%&*+-_!?";
    const pick = (set: string) => set[Math.floor(Math.random() * set.length)];
    let pwd = pick(U) + pick(L) + pick(D) + pick(S);
    const all = U + L + D + S;
    while (pwd.length < 16) pwd += pick(all);
    return pwd;
}
