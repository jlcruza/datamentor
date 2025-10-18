export type AiUsageDto = {
    usage_id: number,
    student_id: string,
    total_input_token: number,
    total_output_token: number,
    billing_period: string,
    created_date: string,
    modified_date: string
}