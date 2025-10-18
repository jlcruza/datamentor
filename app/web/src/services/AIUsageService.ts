import {supabase} from "../lib/supabaseClient.ts";
import {AIQuotaInfoDto} from "./dto/aiQuotaInfoDto.ts";

const AI_USAGE_FUNCTION = 'ai-usage';

export const fetchAIUsage = async (): Promise<AIQuotaInfoDto | null> => {
    try {

        const { data, error } = await supabase.functions
            .invoke(AI_USAGE_FUNCTION)

        if (error)
            throw error;

        const response = JSON.parse(data);

        console.log("Found quota: ", response)

        const usedTokens = response.user_total_usage;
        const totalTokens = response.ai_system_limit;
        const percentageUsed = totalTokens > 0 ? Math.round((usedTokens / totalTokens) * 100) : 0;

        const aiQuotaInfo: AIQuotaInfoDto = {
            usedTokens: usedTokens,
            totalTokens: totalTokens,
            percentageUsed: percentageUsed,
            isUnderLimit: response.is_usage_under_limit,
            billingPeriod: response.billing_period
        }

        console.log("Quota: ", aiQuotaInfo)

        return aiQuotaInfo;
    } catch (error) {
        console.error('Error fetching AI usage:', error);
        return null;
    }
};
