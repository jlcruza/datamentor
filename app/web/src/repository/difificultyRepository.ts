import {supabase} from "../lib/supabaseClient.ts";
import {DifficultiesDto} from "./db_types/difficultiesDto.ts";

const DIFFICULTY_TABLE = 'difficulties';

export class DificultyRepository {

    static async getAllDificulties(): Promise<DifficultiesDto[]> {
        const {data, error} = await supabase.from(DIFFICULTY_TABLE)
            .select('*');
        if (error) {
            console.error('Error fetching dificulties:', error);
            return [];
        } else {
            return data;
        }
    }

}