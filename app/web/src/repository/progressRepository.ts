import {User} from "../types/user.ts";
import {supabase} from "../lib/supabaseClient.ts";
import {ProgressDto} from "./db_types/progressDto.ts";
import {LearningContentDto} from "./db_types/learningContentDto.ts";

const PROGRESS_TABLE = 'progress';

export class ProgressRepository {

    static async getStudentProgressOnLesson(student:User, lesson:LearningContentDto): Promise<ProgressDto>
    {
        return await this.getStudentProgressOnLessonWithId(student.id, lesson.lesson_id);
    }

    static async getStudentProgressOnLessonWithId(studentId:string, lessonId:number): Promise<ProgressDto>
    {
        const {data, error} = await supabase.from(PROGRESS_TABLE)
            .select('*')
            .eq('student_id', studentId)
            .eq('lesson_id', lessonId)
            .maybeSingle();

        if (error) {
            console.error('Error fetching student progress:', error);
            return this.getDefaultProgress(studentId, lessonId);
        }

        return data;
    }

    static async getAllStudentProgress(student: User): Promise<ProgressDto[]> {
        return await this.getAllStudentProgressWithId(student.id);
    }

    static async getAllStudentProgressWithId(studentId: string): Promise<ProgressDto[]> {
        const {data, error} = await supabase.from(PROGRESS_TABLE)
            .select('*')
            .eq('student_id', studentId);

        if (error) {
            console.error('Error fetching student progress:', error);
            return [];
        }

        return data;
    }

    static async saveProgress(student: User, lesson: LearningContentDto, completed: boolean) {
        await this.saveProgressWithId(student.id, lesson.lesson_id, completed);
    }

    static async saveProgressWithId(studentId: string, lessonId: number, completed: boolean) {
        const existingProgress = await this.getStudentProgressOnLessonWithId(studentId, lessonId);
        if (existingProgress.progress_id > 0) {
            await supabase.from(PROGRESS_TABLE)
                .update({
                    completed: completed,
                })
                .eq('student_id', studentId)
                .eq('lesson_id', lessonId);
        }
        else {
            await supabase.from(PROGRESS_TABLE)
                .insert({
                    student_id: studentId,
                    lesson_id: lessonId,
                    completed: completed,
                })
        }
    }

    static getDefaultProgress(studentId: string, lessonId:number): ProgressDto {
        return  {
            created_date: "",
            lesson_id: lessonId,
            modified_date: "",
            progress_id: 0,
            student_id: studentId,
            completed: false};
    }
}