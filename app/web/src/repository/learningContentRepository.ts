import {supabase} from "../lib/supabaseClient.ts";
import {LearningContentDto} from "./db_types/learningContentDto.ts";

const LEARNING_CONTENT_VIEW = 'learning_content';

export class LearningContentRepository {

    static async getAllLearningContent(): Promise<LearningContentDto[]> {
        const {data, error} = await supabase.from(LEARNING_CONTENT_VIEW)
            .select('*');
        if (error) {
            console.error('Error fetching learning content:', error);
            return [];
        } else {
            return data;
        }
    }

}