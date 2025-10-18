import {OPENAI_API_KEY, OPENAI_GPT_MODEL, OPENAI_TEMPERATURE} from "../_shared/environment.ts";
import OpenAI from "jsr:@openai/openai";

export type Msg = { role: "system" | "user" | "assistant"; content: string };
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getResponse(messages: Msg[], hint: string): Promise<Object> {

    // Single, strong system prompt + optional context line
    const system = [
        "You are a concise, friendly database tutor for Computer Engineering students.",
        "If the SQL dialect is unclear, do not ask and default to Oracle.",
        "Prefer short explanations, then show a correct code example. Offer one quick follow-up question at the end.",
        "Be careful with facts. If you’re unsure or the answer depends on version-specific details, say so briefly and explain how to verify.",
        "Always answer in the same language as the student.",
        "Your response will be displayed in a markdown reader, leverage the markdown syntax to make it more readable.",
        hint ? `Student context: ${hint}` : null
    ].filter(Boolean).join("\n");

    // Compose the request for OpenAI Responses API, with streaming
    const response = await openai.responses.create({
        model: OPENAI_GPT_MODEL,
        input: [
            { role: "system", content: system },
            ...((messages ?? []) as Msg[]),
        ],
        stream: false
    });

    console.log("Response: ", response);
    console.log("Response text: ", response.output_text);

    return response;
}

export function getResponseText(response): string{
    return response.output_text ?? "";
}
export function getResponseInputTokenUsage(response): number{
    return response?.usage?.input_tokens ?? 0;
}
export function getResponseOutputTokenUsage(response): number{
    return response?.usage?.output_tokens ?? 0;
}