import React from "react";
import { useTranslation } from 'react-i18next';

type DatabaseTableColumnListProps = {
    tableData: Record<string, unknown>[];
}

const DatabaseTableColumnList: React.FC<DatabaseTableColumnListProps> = (
    { tableData }
) => {
    const { t } = useTranslation();

    return (
        <div className="mt-2 ml-2 text-xs">
            <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">{t('queryPractice.columns')}</div>
            <div className="space-y-1">
                {tableData.length > 0 && Object.keys(tableData[0]).map(column => (
                    <div key={column} className="text-gray-600 dark:text-gray-400">
                        • {column}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DatabaseTableColumnList