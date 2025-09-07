import React from "react";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";

type LessonHeaderProps = {
    selectedLesson: LearningContentDto,
    getDifficultyColor: (difficulty: string) => string;
}

const LessonHeader: React.FC<LessonHeaderProps> = (
    {
        selectedLesson,
        getDifficultyColor
    }) => {

    return (
        <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">
                {selectedLesson.lesson_name}
            </h1>
            <p className="text-gray-400 mb-4">{selectedLesson.difficulty_name}</p>
            <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedLesson.difficulty_name)}`}>
                  {selectedLesson.difficulty_name}
                </span>
                <span className="text-sm text-gray-400">
                  {selectedLesson.module_name}
                </span>
            </div>
        </div>
    )
}

export default LessonHeader;