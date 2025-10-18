import { VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_URL } from "../constants/environmentConfigs";

export type AIUsageResponse = {
    user_input_usage: number;
    user_output_usage: number;
    user_total_usage: number;
    ai_system_limit: {
        system_id: number;
        token_limit: number;
        created_date: string;
        modified_date: string;
    };
    is_usage_under_limit: boolean;
    billing_period: string;
};

export type AIQuotaInfo = {
    usedTokens: number;
    totalTokens: number;
    percentageUsed: number;
    isUnderLimit: boolean;
    billingPeriod: string;
};

export const fetchAIUsage = async (): Promise<AIQuotaInfo | null> => {
    try {
        const apiUrl = `${VITE_SUPABASE_URL}/functions/v1/ai-usage`;

        const headers = {
            'Authorization': `Bearer ${VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
        };

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            console.error('Failed to fetch AI usage:', response.statusText);
            return null;
        }

        const data: AIUsageResponse = await response.json();

        const usedTokens = data.user_total_usage;
        const totalTokens = data.ai_system_limit.token_limit;
        const percentageUsed = totalTokens > 0 ? Math.round((usedTokens / totalTokens) * 100) : 0;

        return {
            usedTokens,
            totalTokens,
            percentageUsed,
            isUnderLimit: data.is_usage_under_limit,
            billingPeriod: data.billing_period
        };
    } catch (error) {
        console.error('Error fetching AI usage:', error);
        return null;
    }
};
