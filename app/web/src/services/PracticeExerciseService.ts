import {PracticeExerciseRepository} from "../repository/practiceExerciseRepository.ts";
import {PracticeExerciseDto} from "../repository/db_types/practiceExerciseDto.ts";
import {PracticeExerciseQuestionBoxDto} from "./dto/PracticeExerciseQuestionBoxDto.ts";

export class PracticeExerciseService {

    static async getPracticeExerciseByLessonId(lesson_id: number): Promise<PracticeExerciseQuestionBoxDto[]> {
        try {
            const rows = await PracticeExerciseRepository.getPracticeExerciseByLessonId(lesson_id);
            return PracticeExerciseService.buildPracticeExerciseForQuestionBox(rows);
        } catch (error) {
            console.error('Error fetching learning content:', error);
            return [];
        }
    }

    static buildPracticeExerciseForQuestionBox(data: PracticeExerciseDto[]): PracticeExerciseQuestionBoxDto[]{
        if (data == null || data.length === 0) { return []; }

        // Group rows by exercise_id
        const byExercise = new Map<number, PracticeExerciseDto[]>();
        for (const row of data) {
            const arr = byExercise.get(row.exercise_id);
            if (arr) {
                arr.push(row);
            } else {
                byExercise.set(row.exercise_id, [row]);
            }
        }

        // Build one question box per exercise
        const result: PracticeExerciseQuestionBoxDto[] = [];
        const orderedEntries = Array.from(byExercise.entries()).sort((a, b) => a[0] - b[0]);

        for (const [, rows] of orderedEntries) {
            // Ensure deterministic option order
            const sortedRows = rows.slice().sort((a, b) => a.exercise_option_id - b.exercise_option_id);

            const options = sortedRows.map(r => r.text);
            const correct_answer_index = sortedRows.findIndex(r => r.is_correct);

            result.push({
                question_id: sortedRows[0].exercise_id,
                lesson_id: sortedRows[0].lesson_id,
                question: sortedRows[0].question,
                options,
                correct_answer_index,
                reason: sortedRows[0].reason,
            });
        }

        return result;
    }
}