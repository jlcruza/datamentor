import React from "react";

type DatabaseTableColumnListProps = {
    tableData: Record<string, unknown>[];
}

const DatabaseTableColumnList: React.FC<DatabaseTableColumnListProps> = (
    { tableData }
) => {


    return (
        <div className="mt-2 ml-2 text-xs">
            <div className="font-medium text-gray-300 mb-1">Columns:</div>
            <div className="space-y-1">
                {tableData.length > 0 && Object.keys(tableData[0]).map(column => (
                    <div key={column} className="text-gray-400">
                        • {column}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DatabaseTableColumnList