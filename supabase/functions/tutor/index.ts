// deno task serve
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
    DataMentorResponse_NO_CONTENT,
    DataMentorResponse_UNAUTHORIZED,
    getCorsHeaders
} from "../services/dataMentorResponse.ts";
import {getSupabaseUser} from "../services/supabaseClient.ts";
import {OpenAiClient, Msg} from "../services/openaiClient.ts";

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        console.log("CORS preflight");
        return DataMentorResponse_NO_CONTENT(req);
    }

    const { data: { user }, error } = await getSupabaseUser(req);
    if (!user || error) {
        console.log("Unauthorized");
        return DataMentorResponse_UNAUTHORIZED(req);
    }

    const {  messages, hint } = await req.json()
        .catch(() => ({ messages: [], hint: null})) as {
        messages: Msg[];
        hint?: string | null;
    };

    // Compose the request for OpenAI Responses API, with streaming
    const openAIResponse = await OpenAiClient.getResponse(messages, hint)

    return new Response(openAIResponse, {
        headers: {
            ...getCorsHeaders(req),
            "Content-Type": "text/event-stream" },
    });
});
