import {ProgressManager} from "../types/progress.ts";
import {BarChart3, CheckCircle, Clock} from "lucide-react";
import React from "react";
import {Lesson} from "../App.tsx";

type LessonCardProps = {
    lesson: Lesson;
    getDifficultyColor: (difficulty: string) => string;
    onSelectLesson: (lesson: Lesson) => void; // parent passes setSelectedLesson method
};

const LessonCard: React.FC<LessonCardProps> = ({
                                                   lesson,
                                                   getDifficultyColor,
                                                   onSelectLesson
                                               }) => {

    return (
        <div
            key={lesson.id}
            className={`lesson-card ${ProgressManager.isLessonComplete(lesson.id) ? 'completed-lesson' : ''}`}
            onClick={() => onSelectLesson(lesson)}
        >
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white text-lg leading-tight flex-1">
                    {lesson.title}
                </h3>
                <div className="flex items-center space-x-2 ml-3">
                    {ProgressManager.isLessonComplete(lesson.id) && (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {lesson.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>{lesson.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                </div>
            </div>
        </div>
    )
}

export default LessonCard;