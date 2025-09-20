import {CheckCircle} from "lucide-react";
import { useTranslation } from 'react-i18next';
import React from "react";

type CompletedBadgeProps = {
    show: boolean;
}

const CompletedBadge: React.FC<CompletedBadgeProps> = (
    {
        show
    }) => {
    const { t } = useTranslation();

    if (show) {
        return  (
            <div className="flex items-center space-x-2 bg-green-900/30 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{t('learningContent.completedBadge')}</span>
            </div>
        )
    }
}

export default CompletedBadge;