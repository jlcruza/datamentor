import {supabase} from "../lib/supabaseClient.ts";
import {PracticeExerciseDto} from "./db_types/practiceExerciseDto.ts";

const PRACTICE_EXERCISE_VIEW = 'practice_exercises';

export class PracticeExerciseRepository {

    static async getAllPracticeExercises(): Promise<PracticeExerciseDto[]> {
        const {data, error} = await supabase.from(PRACTICE_EXERCISE_VIEW)
            .select('*');
        if (error) {
            console.error('Error fetching learning content:', error);
            return [];
        } else {
            return data;
        }
    }

    static async getPracticeExerciseByLessonId(lessonId: number): Promise<PracticeExerciseDto[]> {
        const {data, error} = await supabase.from(PRACTICE_EXERCISE_VIEW)
            .select('*')
            .eq('lesson_id', lessonId);
        if (error) {
            console.error('Error fetching learning content:', error);
            return [];
        }
        return data;
    }

}