import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, {useEffect, useState} from "react";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";
import {supabase} from "../lib/supabaseClient.ts";
import {VITA_SUPABASE_BUCKET_NAME} from "../constants/environmentConfigs.ts"

type CustomReactViewerProps = {
    selectedLesson: LearningContentDto;
};

const CustomReactViewer: React.FC<CustomReactViewerProps> = (
    {
        selectedLesson,
    }
) => {
    const [md, setMd] = useState<string>('');

    useEffect(() => {
        let isMounted = true;
        (async () => {
            // Public bucket: you can either build a public URL and fetch(),
            // or use storage.download which returns a Blob.
            const { data, error } = await supabase.storage.from(VITA_SUPABASE_BUCKET_NAME).download(selectedLesson.content_path);
            if (!error && data && isMounted) {
                const text = await data.text();
                setMd(text);
            }
        })();
        return () => { isMounted = false; };
    });


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
                {md}
            </ReactMarkdown>
        </div>
    )
}

export default CustomReactViewer;
