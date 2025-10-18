import {supabase} from "../lib/supabaseClient.ts";
import {AIQuotaInfoDto} from "./dto/aiQuotaInfoDto.ts";

const AI_USAGE_FUNCTION = 'ai-usage';

export const fetchAIUsage = async (): Promise<AIQuotaInfoDto | null> => {
    try {

        const { data, error } = await supabase.functions
            .invoke(AI_USAGE_FUNCTION)

        if (error)
            throw error;

        const usedTokens = data.user_total_usage;
        const totalTokens = data.ai_system_limit.token_limit;
        const percentageUsed = totalTokens > 0 ? Math.round((usedTokens / totalTokens) * 100) : 0;

        return {
            usedTokens: usedTokens,
            totalTokens: totalTokens,
            percentageUsed: percentageUsed,
            isUnderLimit: data.is_usage_under_limit,
            billingPeriod: data.billing_period
        };
    } catch (error) {
        console.error('Error fetching AI usage:', error);
        return null;
    }
};
