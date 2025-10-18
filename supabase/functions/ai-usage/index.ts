// deno task serve
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
    DataMentorResponse_NO_CONTENT,
    DataMentorResponse_UNAUTHORIZED,
    getCorsHeaders
} from "../services/dataMentorResponse.ts";
import {getSupabaseUser} from "../services/supabaseClient.ts";
import {AiUsageRepository} from "../repository/aiUsageRepository.ts";
import {AiUsageDto} from "../repository/dtos/aiUsageDto.ts";
import {nullUsageToDefault, nullLimitToDefault, isUsageUnderLimit} from "../services/aiUsageValidator.ts";
import {AiSystemDto} from "../repository/dtos/aiSystemDto.ts";
import {AiSystemRepository} from "../repository/aiSystemRepository.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        console.log("CORS preflight");
        return DataMentorResponse_NO_CONTENT(req);
    }

    const {data: {user}, error} = await getSupabaseUser(req);
    if (!user || error) {
        console.log("Unauthorized");
        return DataMentorResponse_UNAUTHORIZED(req);
    }

    const currentAiUsage: AiUsageDto = await AiUsageRepository.getAiUsage(req);
    const aiSystemLimit: AiSystemDto = await AiSystemRepository.getAiSystemLimit(req);

    const nonNullUsage: AiUsageDto = nullUsageToDefault(currentAiUsage);
    const nonNullLimit: AiSystemDto = nullLimitToDefault(aiSystemLimit);

    const response = {
        user_input_usage: nonNullUsage.total_input_token,
        user_output_usage: nonNullUsage.total_output_token,
        user_total_usage: nonNullUsage.total_input_token + nonNullUsage.total_output_token,
        ai_system_limit: nonNullLimit,
        is_usage_under_limit: isUsageUnderLimit(nonNullUsage, nonNullLimit),
        billing_period: nonNullUsage.billing_period
    }

    return new Response(JSON.stringify(response), {
        headers: {
            ...getCorsHeaders(req),
            "Content-Type": "text/plain"
        },
    });
});
