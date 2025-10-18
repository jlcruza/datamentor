import {getSupabaseClient} from "../services/supabaseClient.ts";
import {AiUsageDto} from "./dtos/aiUsageDto.ts";

const AI_USAGE_TABLE = 'ai_usage';
const AI_MONTH_USAGE_VIEW = 'current_month_ai_usage';

export class AiUsageRepository {

    static getCurrentMonth(): string{
        // Set billing_period to the first day of the current month (UTC)
        const now = new Date();
        return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
    }

    static async getAiUsage(req): Promise<AiUsageDto | null> {
        const {data, error} = await getSupabaseClient(req).from(AI_MONTH_USAGE_VIEW)
            .select('*')
            .maybeSingle();

        if (error) {
            console.error('[AiUsageRepository] getAiUsage: error fetching aiUsage:', error);
            return null;
        } else {
            if (!data) {
                console.log('[AiUsageRepository] getAiUsage: no aiUsage found');
                return null;
            }
            console.log('[AiUsageRepository] getAiUsage: aiUsage fetched', data);
            return data;
        }
    }

    static async saveAiUsage(req, currentUsage: AiUsageDto | null, aiUsage: AiUsageDto): Promise<void> {
        if (currentUsage !== null)
        {
            aiUsage.total_input_token += currentUsage.total_input_token;
            aiUsage.total_output_token += currentUsage.total_output_token;
        }

        aiUsage.modified_date = new Date().toISOString();

        const {data, error} = await getSupabaseClient(req).from(AI_USAGE_TABLE)
            .insert(aiUsage);

        if (error) {
            console.error('[AiUsageRepository] saveAiUsage: error inserting aiUsage:', error);
        } else {
            console.log('[AiUsageRepository] saveAiUsage: inserted aiUsage successfully:', data);
        }
        
    }
}
