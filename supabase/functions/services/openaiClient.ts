import {OPENAI_API_KEY, OPENAI_GPT_MODEL} from "../_shared/environment.ts";
import OpenAI from "jsr:@openai/openai";
import {GeneratedQuestionsDto} from "./dto/generatedQuestionsDto.ts";
import { zodTextFormat } from "jsr:@openai/openai/helpers/zod";
import { z } from "jsr:@std/zod";

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

export async function getGeneratedQuestions(hint: string): Promise<Object> {

    const QuestionFormat = z.object({
        question: z.string().min(1),
        options: z.array(z.string().min(1)).min(3).max(6),
        correct_answer_index: z.number().int().nonnegative(),
        reason: z.string().min(1),
    }).refine(
        (q) => q.correct_answer_index < q.options.length,
        {message: "correct_answer_index must be within options bounds"}
    );

    const QuestionsListFormat = z.array(QuestionFormat).min(3).max(5);

    // Single, strong system prompt + optional context line
    const system = [
        "You are a concise, friendly database tutor for Computer Engineering students.",
        "Generate 3–5 multiple-choice questions about the lesson.",
        "Output must be ONLY JSON that strictly matches the provided schema. No extra text, markdown, or code fences.",
        "Constraint 1: Language: Spanish (neutral).",
        "Constraint 2: SQL dialect: Oracle only; do not use features from other SQL variants.",
        "Constraint 3: Bloom’s taxonomy: include a mix of levels (e.g., recordar, aplicar, analizar).",
        "Constraint 4: Each question must have 3–6 unique options, exactly one correct answer.",
        "Constraint 5: Ensure correct_answer_index is within the options array bounds.",
        hint ?`Context:  ${hint}` : null,
    ].filter(Boolean).join("\n");

    // Compose the request for OpenAI Responses API, with streaming
    const response = await openai.responses.create({
        model: OPENAI_GPT_MODEL,
        input: [
            {role: "system", content: system},
            {role: "user", content: "Genera entre 3 y 5 preguntas siguiendo el formato estrictamente."}
        ],
        text: {format: zodTextFormat(QuestionsListFormat, "questions")},
        stream: false
    });

    console.log("Response: ", response);
    console.log("Response object: ", response.output_parsed);

    return response;
}

export function getResponseText(response): string{
    return response.output_text ?? "";
}

export function getGeneratedQuestionsOutputObject(response): GeneratedQuestionsDto[]{
    return response.output_parsed ?? [];
}
export function getResponseInputTokenUsage(response): number{
    return response?.usage?.input_tokens ?? 0;
}
export function getResponseOutputTokenUsage(response): number{
    return response?.usage?.output_tokens ?? 0;
}