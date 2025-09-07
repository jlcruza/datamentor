import {supabase} from "../lib/supabaseClient.ts";
import {LessonsDto} from "./db_types/lessonsDto.ts";

const LESSON_TABLE = 'lessons';

export class LessonRepository {

    static async getAllLessons(): Promise<LessonsDto[]> {
        const {data, error} = await supabase.from(LESSON_TABLE)
            .select('*');

        if (error) {
            console.error('Error fetching lessons:', error);
            return [];
        }

        return data;
    }

}