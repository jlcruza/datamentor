import {BookOpen, CheckCircle, ChevronDown, ChevronRight} from "lucide-react";
import { useTranslation } from 'react-i18next';
import React, {useState} from "react";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";

type CourseDirectoryProps = {
    categories: string[];
    lessons: LearningContentDto[];
    onSelectLesson: (lesson: LearningContentDto) => void; // parent passes setSelectedLesson method
};

const CourseDirectory: React.FC<CourseDirectoryProps> = (
    {
        categories,
        lessons,
        onSelectLesson,
    }) => {
    const { t } = useTranslation();
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !(prev[category] ?? false)
        }));
    };

    return <div className="lg:col-span-1">
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sticky top-4">
            <h2 className="font-semibold text-white mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                {t('learningContent.courseTopics')}
            </h2>

            {categories.map(category => (
                <div key={category} className="mb-3">
                    {/*Here we show the category name*/}
                    <button
                        onClick={() => toggleCategory(category)}
                        className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <span className="font-medium text-white">{category}</span>
                        {expandedCategories[category] ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                    </button>

                    {/*Here are the lessons in the category.
                    If the category is expanded, show the lessons*/}
                    {expandedCategories[category] && (
                        <div className="ml-4 mt-1 space-y-1">
                            {lessons
                                .filter(lesson => lesson.module_name === category)
                                .map(lesson => (
                                    <button
                                        key={lesson.lesson_id}
                                        onClick={() => onSelectLesson(lesson)}
                                        className="flex items-center justify-between w-full text-left p-2 text-sm text-gray-400 hover:text-purple-400 hover:bg-gray-700 rounded-md transition-colors"
                                    >
                                        <span>{lesson.lesson_name}</span>
                                        {lesson.completed && (
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                        )}
                                    </button>
                                ))
                            }
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
}

export default CourseDirectory;