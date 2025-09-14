import {supabaseClient} from "../services/supabaseClient.ts";
import {SandboxDto} from "./dtos/sandboxDto.ts";

const SANDBOX_TABLE = 'sandboxes';

export class SandboxRepository {

    static async disableAllSandboxes(): Promise<void> {
        await supabaseClient.from(SANDBOX_TABLE)
            .update({is_active: false, modified_date: new Date().toISOString()})
            .eq('is_active', true);
    }

    static async insertSandbox(sandbox: SandboxDto): Promise<void> {
        await SandboxRepository.disableAllSandboxes();

        sandbox.is_active = true;
        sandbox.created_date = new Date().toISOString();
        sandbox.modified_date = new Date().toISOString();
        await supabaseClient.from(SANDBOX_TABLE)
            .insert(sandbox);
    }

    static async getActiveSandbox(): Promise<SandboxDto | null> {
        const {data, error} = await supabaseClient.from(SANDBOX_TABLE)
            .select('*')
            .filter('is_active', 'eq', true)
            .maybeSingle();

        if (error) {
            console.error('Error fetching sandbox:', error);
            return null;
        } else {
            return data;
        }
    }

    static async doesActiveSandboxExist(): Promise<boolean> {
        const activeSandbox = await SandboxRepository.getActiveSandbox();
        if (activeSandbox === null)
            return false;

        if(activeSandbox.expire_at < new Date().toISOString())
            await SandboxRepository.disableAllSandboxes();
            return false;

        return true;
    }
}