import {Lesson} from "../App.tsx";
import React from "react";

type LessonHeaderProps = {
    selectedLesson: Lesson,
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
                {selectedLesson.title}
            </h1>
            <p className="text-gray-400 mb-4">{selectedLesson.description}</p>
            <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedLesson.difficulty)}`}>
                  {selectedLesson.difficulty}
                </span>
                <span className="text-sm text-gray-400">
                  {selectedLesson.category}
                </span>
            </div>
        </div>
    )
}

export default LessonHeader;