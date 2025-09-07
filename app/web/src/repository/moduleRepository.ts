import {supabase} from "../lib/supabaseClient.ts";
import {ModulesDto} from "./db_types/modulesDto.ts";

const MODULE_TABLE = 'modules';

export class ModuleRepository {
    static async getAllModules(): Promise<ModulesDto[]> {
        const {data, error} = await supabase.from(MODULE_TABLE)
            .select('*');
        if (error) {
            console.error('Error fetching modules:', error);
            return [];
        } else {
            return data;
        }
    }
}