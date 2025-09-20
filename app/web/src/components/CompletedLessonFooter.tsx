import {CheckCircle} from "lucide-react";
import { useTranslation } from 'react-i18next';
import React from "react";

type CompletedLessonFooterProps = {
    isCompleted: boolean;
    onMarkComplete: () => void;
}

const CompletedLessonFooter: React.FC<CompletedLessonFooterProps> = (
    {
        isCompleted,
        onMarkComplete
    }) => {
    const { t } = useTranslation();

    if (isCompleted) {
        return (
            <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">{t('learningContent.completed')}</span>
            </div>
        )
    }

return (
        <button
            onClick={onMarkComplete}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
            <CheckCircle className="h-5 w-5" />
            <span>{t('learningContent.markComplete')}</span>
        </button>
    )
}

export default CompletedLessonFooter;