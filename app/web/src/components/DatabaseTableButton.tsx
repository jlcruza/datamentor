import React from "react";
import { useTranslation } from 'react-i18next';

type DatabaseTableButtonProps = {
    tableName: string;
    tableData: Record<string, unknown>[];
    selected: boolean;
    onSelect: (table: string) => void;

}

const DatabaseTableButton: React.FC<DatabaseTableButtonProps> = ({
    tableName,
    tableData,
    selected,
    onSelect
}) => {
    const { t } = useTranslation();

    return (
        <button
            onClick={() => onSelect(tableName)}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                selected
                    ? 'border-blue-500 dark:border-purple-500 bg-blue-50 dark:bg-purple-900/30 text-blue-700 dark:text-purple-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300'
            }`}
        >
            <div className="font-medium">{tableName}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('queryPractice.records', { count: tableData.length })}
            </div>
        </button>
    )
}

export default DatabaseTableButton;