import {getSupabaseClient} from "../services/supabaseClient.ts";
import {AiSystemDto} from "./dtos/aiSystemDto.ts";

const AI_USAGE_TABLE = 'ai_system';

export class AiSystemRepository {

    static async getAiSystemLimit(req): Promise<AiSystemDto | null> {
        const {data, error} = await getSupabaseClient(req).from(AI_USAGE_TABLE)
            .select('*')
            .maybeSingle();

        if (error) {
            console.error('[AiSystemRepository] getAiSystemLimit: error fetching ai_system:', error);
            return null;
        } else {
            if (!data) {
                console.log('[AiSystemRepository] getAiSystemLimit: no ai_system found');
                return null;
            }
            console.log('[AiSystemRepository] getAiSystemLimit: aiUai_systemsage fetched', data);
            return data;
        }
    }
}
