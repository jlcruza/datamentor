import {ArrowLeft} from "lucide-react";
import { useTranslation } from 'react-i18next';
import React from "react";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";

type BackToLessonButtonProps = {
    onSelectedLesson: (lesson: LearningContentDto | null) => void;
};

const BackToLessonButton: React.FC<BackToLessonButtonProps> = (
    {
        onSelectedLesson,
    }) => {
    const { t } = useTranslation();

    return <button
        onClick={() => onSelectedLesson(null)}
        className="text-purple-400 hover:text-purple-300 mb-4 flex items-center space-x-2 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>{t('common.back')}</span>
    </button>
}

export default BackToLessonButton;