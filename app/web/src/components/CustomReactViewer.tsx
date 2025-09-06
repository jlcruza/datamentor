import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import {Lesson} from "../App.tsx";

type CustomReactViewerProps = {
    selectedLesson: Lesson;
};

const CustomReactViewer: React.FC<CustomReactViewerProps> = (
    {
        selectedLesson,
    }
) => {


    return (
        <div className="prose prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({children}) => <h1 className="text-2xl font-bold text-purple-300 mb-4">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-semibold text-purple-400 mb-3">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-medium text-purple-500 mb-2">{children}</h3>,
                    p: ({children}) => <p className="text-gray-300 mb-3 leading-relaxed">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside text-gray-300 mb-3 space-y-1">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside text-gray-300 mb-3 space-y-1">{children}</ol>,
                    li: ({children}) => <li className="text-gray-300">{children}</li>,
                    code: ({children, className}) => {
                        const isInline = !className;
                        return isInline ? (
                            <code className="bg-gray-700 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono">
                                {children}
                            </code>
                        ) : (
                            <pre className="bg-gray-900 text-cyan-300 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-600">
                          <code className="font-mono text-sm">{children}</code>
                        </pre>
                        );
                    },
                    blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400 mb-3 bg-gray-900/50 py-2 rounded-r-lg">
                            {children}
                        </blockquote>
                    ),
                    table: ({children}) => (
                        <div className="overflow-x-auto mb-4">
                            <table className="min-w-full border border-gray-600 rounded-lg">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({children}) => (
                        <th className="border border-gray-600 px-3 py-2 bg-gray-700 text-purple-300 font-semibold text-left">
                            {children}
                        </th>
                    ),
                    td: ({children}) => (
                        <td className="border border-gray-600 px-3 py-2 text-gray-300">
                            {children}
                        </td>
                    ),
                }}
            >
                {selectedLesson.content}
            </ReactMarkdown>
        </div>
    )
}

export default CustomReactViewer;