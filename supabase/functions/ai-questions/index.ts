// deno task serve
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
    DataMentorResponse_BAD_REQUEST,
    DataMentorResponse_NO_CONTENT,
    DataMentorResponse_UNAUTHORIZED,
    getCorsHeaders
} from "../services/dataMentorResponse.ts";
import {getSupabaseUser} from "../services/supabaseClient.ts";
import {
    getGeneratedQuestions, getGeneratedQuestionsOutputObject,
    getResponseInputTokenUsage,
    getResponseOutputTokenUsage
} from "../services/openaiClient.ts";
import {AiUsageRepository} from "../repository/aiUsageRepository.ts";
import {AiUsageDto} from "../repository/dtos/aiUsageDto.ts";
import {AiSystemDto} from "../repository/dtos/aiSystemDto.ts";
import {AiSystemRepository} from "../repository/aiSystemRepository.ts";
import {isUsageUnderLimit} from "../services/aiUsageValidator.ts";

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

    if (!isUsageUnderLimit(currentAiUsage, aiSystemLimit)){
        console.log("Usage limit exceeded");
        return DataMentorResponse_BAD_REQUEST(req, "Usage limit exceeded");
    }

    const {hint} = await req.json()
        .catch(() => ({hint: null})) as {
        hint?: string | null;
    };

    // Compose the request for OpenAI Responses API, with streaming
    const openAIResponse = await getGeneratedQuestions(hint);

    let aiUsage: AiUsageDto = {
        student_id: user.id,
        total_input_token: getResponseInputTokenUsage(openAIResponse),
        total_output_token: getResponseOutputTokenUsage(openAIResponse),
        billing_period: AiUsageRepository.getCurrentMonth()
    }

    await AiUsageRepository.saveAiUsage(req, currentAiUsage, aiUsage);

    return new Response(JSON.stringify(getGeneratedQuestionsOutputObject(openAIResponse)), {
        headers: {
            ...getCorsHeaders(req),
            "Content-Type": "text/plain"
        },
    });
});
