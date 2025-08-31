import React from "react";

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


    return (
        <button
            onClick={() => onSelect(tableName)}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                selected
                    ? 'border-purple-500 bg-purple-900/30 text-purple-300'
                    : 'border-gray-600 hover:bg-gray-700 text-gray-300'
            }`}
        >
            <div className="font-medium">{tableName}</div>
            <div className="text-sm text-gray-400 mt-1">
                {tableData.length} records
            </div>
        </button>
    )
}

export default DatabaseTableButton;