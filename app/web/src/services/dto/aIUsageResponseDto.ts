export type AIUsageResponseDto = {
    user_input_usage: number;
    user_output_usage: number;
    user_total_usage: number;
    ai_system_limit: number;
    is_usage_under_limit: boolean;
    billing_period: string;
};