import {supabase} from "../lib/supabaseClient.ts";

const CREATE_SANDBOX_FUNCTION = 'sbx-start';
const RUN_QUERY_FUNCTION = 'sbx-exec';
const DELETE_SANDBOX_FUNCTION = 'sbx-reset';

export async function createSandbox()
{
    try {
        const { data, error } = await supabase.functions
            .invoke(CREATE_SANDBOX_FUNCTION);

        if (error)
            throw error;

        return data;
    } finally {
        // Do nothing
    }
}

export async function runSandboxQuery(sql: string)
{
    try {
        const { data, error } = await supabase.functions
            .invoke(RUN_QUERY_FUNCTION, {
                body: { sql },
            });

        if (error)
            throw error;

        return typeof data === 'string' ? { raw: JSON.parse(data) } : { raw: data };
    }
    finally {
        // Do nothing
    }
}


export async function deleteSandbox()
{
    try {
        const { data, error } = await supabase.functions
            .invoke(DELETE_SANDBOX_FUNCTION);

        if (error)
            throw error;

        return data;
    } finally {
        // Do nothing
    }
}