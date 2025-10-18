import {supabase} from "../lib/supabaseClient.ts";
import {PracticeExerciseQuestionBoxDto} from "./dto/PracticeExerciseQuestionBoxDto.ts";
import {GeneratedQuestionsDto} from "./dto/generatedQuestionsDto.ts";

const AI_QUESTIONS_FUNCTION = 'ai-questions';

export async function generateQuestions(hint: string, lesson_id: number): Promise<PracticeExerciseQuestionBoxDto[]> {
    try {
        const { data, error } = await supabase.functions
            .invoke(AI_QUESTIONS_FUNCTION, {
                body: { hint },
            })

        if (error)
            throw error;

        const exercises: GeneratedQuestionsDto[] = JSON.parse(data);

        return convertQuestions(exercises, lesson_id);
    } finally {
        // Do nothing
    }
}

function convertQuestions(questions: GeneratedQuestionsDto[], lesson_id: number): PracticeExerciseQuestionBoxDto[]
{
    // Incremental value for question_id.
    let question_index: number = 1;
    
    const result: PracticeExerciseQuestionBoxDto[] = [];
    for (const q of questions) {
        result.push({
            question_id: question_index++,
            lesson_id: lesson_id,
            question: q.question,
            options: q.options,
            correct_answer_index: q.correct_answer_index,
            reason: q.reason,
        });
    }
    return result;
}