export type AIUsageResponseDto = {
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