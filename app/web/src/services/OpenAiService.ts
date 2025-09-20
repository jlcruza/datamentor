import {supabase} from "../lib/supabaseClient.ts";

const TUTOR_FUNCTION = 'tutor';
export const ASSISTANT_ROLE = 'assistant';
export const USER_ROLE = 'user';
export const SYSTEM_ROLE = 'system';

export type Msg = { role: "system" | "user" | "assistant"; content: string };

export type TutorPrompt = {
    prompt: string,
    hint: string,
    messages: Msg[]
}

export async function askTutor({prompt, hint, messages}: TutorPrompt): Promise<Msg[]> {
    try {
        messages.push({ role: USER_ROLE, content: prompt });

        const { data, error } = await supabase.functions
            .invoke(TUTOR_FUNCTION, {
                body: { messages, hint },
            })

        if (error)
            throw error;

        messages.push({ role: ASSISTANT_ROLE, content: data });

        return messages;
    } finally {
        // Do nothing
    }
}