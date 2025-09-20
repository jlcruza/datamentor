import {BarChart3, CheckCircle, Clock} from "lucide-react";
import { useTranslation } from 'react-i18next';
import React from "react";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";

type LessonCardProps = {
    lesson: LearningContentDto ;
    getDifficultyColor: (difficulty: string) => string;
    onSelectLesson: (lesson: LearningContentDto) => void; // parent passes setSelectedLesson method
};

const LessonCard: React.FC<LessonCardProps> = ({
                                                   lesson,
                                                   getDifficultyColor,
                                                   onSelectLesson
                                               }) => {
    const { t } = useTranslation();

    return (
        <div
            key={lesson.lesson_id}
            className={`lesson-card ${lesson.completed ? 'completed-lesson' : ''}`}
            onClick={() => onSelectLesson(lesson)}
        >
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white text-lg leading-tight flex-1">
                    {lesson.lesson_name}
                </h3>
                <div className="flex items-center space-x-2 ml-3">
                    {lesson.completed && (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty_name)}`}>
                      {lesson.difficulty_name}
                    </span>
                </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {lesson.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>{lesson.module_name}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>5 {t('learningContent.minRead')}</span>
                </div>
            </div>
        </div>
    )
}

export default LessonCard;