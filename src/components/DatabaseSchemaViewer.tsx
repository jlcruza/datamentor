import {Database} from "lucide-react";
import {sampleTables} from "../data/sampleDatabase.ts";
import React, {useState} from "react";
import DatabaseTableButton from "./DatabaseTableButton.tsx";
import DatabaseTableColumnList from "./DatabaseTableColumnList.tsx";
import SampleQueryButton from "./SampleQueryButton.tsx";

type DatabaseSchemaViewerProps = {
    onSelectedQuery: (query: string) => void;
}

const sampleQueries = [
    {
        title: 'Basic SELECT',
        query: 'SELECT * FROM students LIMIT 5;',
        description: 'Get first 5 students'
    },
    {
        title: 'JOIN Example',
        query: 'SELECT s.name, c.title, e.grade\nFROM students s\nJOIN enrollments e ON s.id = e.student_id\nJOIN courses c ON e.course_id = c.id\nWHERE e.grade > 85;',
        description: 'Students with grades above 85'
    },
    {
        title: 'Aggregate Functions',
        query: 'SELECT c.title, COUNT(*) as enrolled_count\nFROM courses c\nJOIN enrollments e ON c.id = e.course_id\nGROUP BY c.id, c.title\nORDER BY enrolled_count DESC;',
        description: 'Course enrollment counts'
    }
];

const DatabaseSchemaViewer: React.FC<DatabaseSchemaViewerProps> = (
    { onSelectedQuery }
) => {
    const [selectedTable, setSelectedTable] = useState<string>('students');

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sticky top-4">
            <h2 className="font-semibold text-white mb-4 flex items-center">
                <Database className="h-5 w-5 mr-2 text-purple-400" />
                Database Schema
            </h2>

            <div className="space-y-3">
                {Object.entries(sampleTables).map(([tableName, tableData]) => (
                    <div key={tableName}>
                        {/* Shows the table name and number of records */}
                        <DatabaseTableButton tableName={tableName} tableData={tableData} onSelect={setSelectedTable} selected={(selectedTable === tableName)}/>

                        {/* Shows columns for the selected table*/}
                        {selectedTable === tableName && (
                            <DatabaseTableColumnList tableData={tableData}/>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <h3 className="font-medium text-white mb-3">Sample Queries</h3>
                <div className="space-y-2">
                    {sampleQueries.map((sample, index) => (
                        // Shows the sample query and description
                        <SampleQueryButton index={index} sample={sample} onSelectedQuery={onSelectedQuery}/>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default DatabaseSchemaViewer;