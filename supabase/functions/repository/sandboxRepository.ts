import {getSupabaseClient} from "../services/supabaseClient.ts";
import {SandboxDto} from "./dtos/sandboxDto.ts";

const SANDBOX_TABLE = 'sandboxes';

/**
 * Repository for sandbox operations against Supabase.
 * Provides methods to disable all sandboxes, insert a new sandbox,
 * fetch the currently active sandbox, and check whether an active sandbox exists.
 */
export class SandboxRepository {

    /**
     * Disable all sandboxes by setting is_active = false and updating modified_date.
     * Logs the action and any errors encountered.
     */
    static async disableAllSandboxes(req): Promise<void> {
        console.log('[SandboxRepository] disableAllSandboxes: starting to disable all active sandboxes');
        const {data, error} = await getSupabaseClient(req).from(SANDBOX_TABLE)
            .update({is_active: false, modified_date: new Date().toISOString()})
            .eq('is_active', true);

        if (error) {
            console.error('[SandboxRepository] disableAllSandboxes: error disabling sandboxes:', error);
        } else {
            // Supabase may return inserted/updated rows in `data`; log count when available
            try {
                const affected = Array.isArray(data) ? data.length : (data ? 1 : 0);
                console.log('[SandboxRepository] disableAllSandboxes: success, rows affected:', affected);
            } catch {
                console.log('[SandboxRepository] disableAllSandboxes: success');
            }
        }
    }

    /**
     * Insert a new sandbox. This will first disable any existing active sandboxes,
     * then mark the new sandbox as active and set created/modified timestamps.
     * @param sandbox SandboxDto object to insert
     */
    static async insertSandbox(req, sandbox: SandboxDto): Promise<void> {
        console.log('[SandboxRepository] insertSandbox: received sandbox to insert', sandbox);
        await SandboxRepository.disableAllSandboxes(req);

        sandbox.is_active = true;
        sandbox.created_date = new Date().toISOString();
        sandbox.modified_date = new Date().toISOString();

        const {data, error} = await getSupabaseClient(req).from(SANDBOX_TABLE)
            .insert(sandbox);

        if (error) {
            console.error('[SandboxRepository] insertSandbox: error inserting sandbox:', error);
        } else {
            console.log('[SandboxRepository] insertSandbox: inserted sandbox successfully:', data);
        }
    }

    /**
     * Fetch the currently active sandbox from the database.
     * Returns the active SandboxDto or null if none is found or an error occurs.
     */
    static async getActiveSandbox(req): Promise<SandboxDto | null> {
        console.log('[SandboxRepository] getActiveSandbox: fetching active sandbox');
        const {data, error} = await getSupabaseClient(req).from(SANDBOX_TABLE)
            .select('*')
            .filter('is_active', 'eq', true)
            .maybeSingle();

        if (error) {
            console.error('[SandboxRepository] getActiveSandbox: error fetching sandbox:', error);
            return null;
        } else {
            if (!data) {
                console.log('[SandboxRepository] getActiveSandbox: no active sandbox found');
                return null;
            }
            console.log('[SandboxRepository] getActiveSandbox: active sandbox fetched', data);
            return data;
        }
    }

    /**
     * Check whether an active sandbox exists and is not expired.
     * If the active sandbox has expired it will be disabled and the method returns false.
     * @returns true if a non-expired active sandbox exists, false otherwise
     */
    static async doesActiveSandboxExist(req): Promise<boolean> {
        console.log('[SandboxRepository] doesActiveSandboxExist: checking for active sandbox');
        const activeSandbox = await SandboxRepository.getActiveSandbox(req);
        if (activeSandbox === null) {
            console.log('[SandboxRepository] doesActiveSandboxExist: no active sandbox present');
            return false;
        }

        // If expire_at is set and is in the past, disable it and return false
        if (activeSandbox.expire_at && activeSandbox.expire_at < new Date().toISOString()) {
            console.log('[SandboxRepository] doesActiveSandboxExist: active sandbox has expired at', activeSandbox.expire_at);
            await SandboxRepository.disableAllSandboxes(req);
            return false;
        }

        console.log('[SandboxRepository] doesActiveSandboxExist: active sandbox exists and is valid');
        return true;
    }
}