import React from 'react';
import { Sparkles } from 'lucide-react';
import { AIQuotaInfo } from '../services/AIUsageService';

interface AIQuotaIndicatorProps {
    quota: AIQuotaInfo | null;
    isLoading?: boolean;
}

const AIQuotaIndicator: React.FC<AIQuotaIndicatorProps> = ({ quota, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600">
                <Sparkles className="h-4 w-4 text-gray-400 animate-pulse" />
                <span className="text-sm text-gray-500 dark:text-gray-400">...</span>
            </div>
        );
    }

    if (!quota) {
        return null;
    }

    const getColorClasses = (percentage: number) => {
        if (percentage >= 90) {
            return {
                icon: 'text-red-600 dark:text-red-400',
                text: 'text-red-700 dark:text-red-300',
                bg: 'bg-red-50 dark:bg-red-900/20',
                border: 'border-red-200 dark:border-red-800'
            };
        } else if (percentage >= 70) {
            return {
                icon: 'text-yellow-600 dark:text-yellow-400',
                text: 'text-yellow-700 dark:text-yellow-300',
                bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                border: 'border-yellow-200 dark:border-yellow-800'
            };
        }
        return {
            icon: 'text-blue-600 dark:text-blue-400',
            text: 'text-blue-700 dark:text-blue-300',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            border: 'border-blue-200 dark:border-blue-800'
        };
    };

    const colors = getColorClasses(quota.percentageUsed);

    return (
        <div className={`flex items-center space-x-2 ${colors.bg} px-3 py-1.5 rounded-lg border ${colors.border}`}>
            <Sparkles className={`h-4 w-4 ${colors.icon}`} />
            <span className={`text-sm font-medium ${colors.text}`}>
                {quota.percentageUsed}%
            </span>
        </div>
    );
};

export default AIQuotaIndicator;
