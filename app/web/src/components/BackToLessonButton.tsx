import {ArrowLeft} from "lucide-react";
import React from "react";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";

type BackToLessonButtonProps = {
    onSelectedLesson: (lesson: LearningContentDto | null) => void;
};

const BackToLessonButton: React.FC<BackToLessonButtonProps> = (
    {
        onSelectedLesson,
    }) => {

    return <button
        onClick={() => onSelectedLesson(null)}
        className="text-purple-400 hover:text-purple-300 mb-4 flex items-center space-x-2 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to lessons</span>
    </button>
}

export default BackToLessonButton;