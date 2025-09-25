export type PracticeExerciseQuestionBoxDto = {
    question_id: number,
    lesson_id: number,
    question: string,
    options: string[],
    correct_answer_index: number,
    reason: string,
}