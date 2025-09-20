import {OPENAI_API_KEY, OPENAI_GPT_MODEL} from "../_shared/environment.ts";
import OpenAI from "https://deno.land/x/openai@v4.69.0/mod.ts";

export type Msg = { role: "system" | "user" | "assistant"; content: string };
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export class OpenAiClient {

    static async getResponse(messages: Msg[], hint: string): Promise<string> {

        // Single, strong system prompt + optional context line
        const system = [
            "You are a concise, friendly database tutor for Computer Engineering students.",
            "If the SQL dialect is unclear, do not ask and default to Oracle.",
            "Prefer short explanations, then show a correct code example. Offer one quick follow-up question at the end.",
            "Be careful with facts. If you’re unsure or the answer depends on version-specific details, say so briefly and explain how to verify.",
            hint ? `Student context: ${hint}` : null
        ].filter(Boolean).join("\n");

        // Compose the request for OpenAI Responses API, with streaming
        const response = await openai.responses.create({
            model: OPENAI_GPT_MODEL,
            input: [
                { role: "system", content: system },
                ...((messages ?? []) as Msg[]),
            ],
            temperature: 0.3,
            stream: false
        });

        return resp.output_text ?? "";
    }
}