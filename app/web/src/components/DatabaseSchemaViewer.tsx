import {Database} from "lucide-react";
import { useTranslation } from 'react-i18next';
import {sampleTables} from "../data/sampleDatabase.ts";
import React, {useState} from "react";
import DatabaseTableButton from "./DatabaseTableButton.tsx";
import DatabaseTableColumnList from "./DatabaseTableColumnList.tsx";
import SampleQueryButton from "./SampleQueryButton.tsx";

type DatabaseSchemaViewerProps = {
    onSelectedQuery: (query: string) => void;
}


const DatabaseSchemaViewer: React.FC<DatabaseSchemaViewerProps> = (
    { onSelectedQuery }
) => {
    const { t } = useTranslation();
    const [selectedTable, setSelectedTable] = useState<string>('students');

    const sampleQueries = [
        {
            title: t('queryPractice.basicSelect'),
            query: 'SELECT * FROM students WHERE ROWNUM <= 5;;',
            description: t('queryPractice.getFirstStudents')
        },
        {
            title: t('queryPractice.joinExample'),
            query: 'SELECT s.name, c.title, e.grade\nFROM students s\nJOIN enrollments e ON s.id = e.student_id\nJOIN courses c ON e.course_id = c.id\nWHERE e.grade > 85;',
            description: t('queryPractice.studentsWithGrades')
        },
        {
            title: t('queryPractice.aggregateFunctions'),
            query: 'SELECT c.title, COUNT(*) as enrolled_count\nFROM courses c\nJOIN enrollments e ON c.id = e.course_id\nGROUP BY c.id, c.title\nORDER BY enrolled_count DESC;',
            description: t('queryPractice.courseEnrollmentCounts')
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Database className="h-5 w-5 mr-2 text-blue-600 dark:text-purple-400" />
                {t('queryPractice.databaseSchema')}
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
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">{t('queryPractice.sampleQueries')}</h3>
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