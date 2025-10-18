import {AiUsageDto} from "../repository/dtos/aiUsageDto.ts";

export class AiUsageValidator {

    static nullUsageToDefault(aiUsage: AiUsageDto | null): AiUsageDto {
        return aiUsage ?? {
            usage_id: 0,
            student_id: "",
            total_input_token: 0,
            total_output_token: 0,
            billing_period: AiUsageRepository.getCurrentMonth(),
            created_date: new Date().toISOString(),
            modified_date: new Date().toISOString()
        }
    }

    static nullLimitToDefault(aiSystemLimit: AiSystemDto | null): AiSystemDto {
        return aiSystemLimit ?? {
            system_id: 0,
            token_limit: 0,
            created_date: new Date().toISOString(),
            modified_date: new Date().toISOString()
        }
    }

    static isUsageUnderLimit(currentUsage: AiUsageDto, aiSystemLimit: AiSystemDto): boolean {
        if (!aiSystemLimit || !aiSystemLimit.token_limit) {
            console.warn("[AiUsageValidator] No AI system limit found, assuming unlimited usage.");
            return true; // No limit defined, so usage is always under limit
        }

        let currentUsageNotNull = AiUsageValidator.nullUsageToDefault(currentUsage);

        const currentTotalUsage = currentUsageNotNull.total_input_token + currentUsageNotNull.total_output_token;

        return currentTotalUsage <= aiSystemLimit.token_limit;
    }

}