import {supabase} from "../lib/supabaseClient.ts";
import {User} from "../types/user.ts";

const STUDENT_TABLE = 'students';

export class StudentRepository {

    static async saveStudent(student: User) {
        await this.saveStudentWithIdAndName(student.id, student.name);
    }
    static async saveStudentWithIdAndName(studentId: string, studentName: string) {
        await supabase.from(STUDENT_TABLE)
            .insert({
                student_id: studentId,
                student_name: studentName
            }
        );
    }
}