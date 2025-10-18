import React from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {AIQuotaInfoDto} from "../services/dto/aiQuotaInfoDto.ts";

interface AIQuotaProgressProps {
    quota: AIQuotaInfoDto | null;
}

const AIQuotaProgress: React.FC<AIQuotaProgressProps> = ({ quota }) => {
    useTranslation();

    const percentageUsed = quota?.percentageUsed ?? 0;
    const usedTokens = quota?.usedTokens ?? 0;
    const totalTokens = quota?.totalTokens ?? 1;
    const isUnderLimit = quota?.isUnderLimit ?? true;

    const getProgressFillClass = (percentage: number) => {
        if (percentage >= 90) return 'bg-red-600';
        if (percentage >= 70) return 'bg-yellow-500';
        return 'progress-fill';
    };

    const getContainerColor = (percentage: number) => {
        if (percentage >= 90) {
            return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
        }
        if (percentage >= 70) {
            return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
        }
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    };

    const isNearLimit = percentageUsed >= 70;
    const isAtLimit = !isUnderLimit;

    return (
        <div className={`p-3 rounded-lg border ${getContainerColor(percentageUsed)}`}>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <Sparkles className={`h-4 w-4 ${
                        isAtLimit
                            ? 'text-red-600 dark:text-red-400'
                            : isNearLimit
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-blue-600 dark:text-blue-400'
                    }`} />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        AI Usage
                    </span>
                </div>
                <span className={`text-sm font-semibold ${
                    isAtLimit
                        ? 'text-red-700 dark:text-red-300'
                        : isNearLimit
                            ? 'text-yellow-700 dark:text-yellow-300'
                            : 'text-blue-700 dark:text-blue-300'
                }`}>
                    {percentageUsed}%
                </span>
            </div>

            <div className="progress-bar mb-2">
                <div
                    className={getProgressFillClass(percentageUsed)}
                    style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                />
            </div>

            <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                    {usedTokens.toLocaleString()} / {totalTokens.toLocaleString()} tokens
                </span>
                {isAtLimit && (
                    <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
                        <AlertCircle className="h-3 w-3" />
                        <span className="font-medium">Limit reached</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIQuotaProgress;
