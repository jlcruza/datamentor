import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, {useEffect, useState} from "react";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";
import {supabase} from "../lib/supabaseClient.ts";
import {VITE_SUPABASE_BUCKET_NAME} from "../constants/environmentConfigs.ts"
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';

SyntaxHighlighter.registerLanguage('sql', sql);

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
            const { data, error } = await supabase.storage.from(VITE_SUPABASE_BUCKET_NAME).download(selectedLesson.content_path);
            if (!error && data && isMounted) {
                const text = await data.text();
                setMd(text);
            }
        })();
        return () => { isMounted = false; };
    });


    return (
        <div className="prose prose-invert max-w-none w-full overflow-hidden">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({children}) => <h1 className="text-2xl font-bold text-purple-300 mb-4 break-words">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-semibold text-purple-400 mb-3 break-words">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-medium text-purple-500 mb-2 break-words">{children}</h3>,
                    p: ({children}) => <p className="text-gray-300 mb-3 leading-relaxed break-words">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside text-gray-300 mb-3 space-y-1 break-words">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside text-gray-300 mb-3 space-y-1 break-words">{children}</ol>,
                    li: ({children}) => <li className="text-gray-300 break-words">{children}</li>,
                    code: ({className, children, ...props}) => {
                        const isBlock = /language-(\w+)/.exec(className || '');
                        return !isBlock ? (
                            <code className="bg-gray-700 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono break-all">
                                {children}
                            </code>
                        ) : (
                            <div className="overflow-x-auto">
                                <SyntaxHighlighter
                                    style={atomDark}
                                    language="sql"
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        );
                    },
                    blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400 mb-3 bg-gray-900/50 py-2 rounded-r-lg break-words">
                            {children}
                        </blockquote>
                    ),
                    table: ({children}) => (
                        <div className="overflow-x-auto mb-4 w-full">
                            <table className="min-w-full border border-gray-600 rounded-lg">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({children}) => (
                        <th className="border border-gray-600 px-3 py-2 bg-gray-700 text-purple-300 font-semibold text-left break-words">
                            {children}
                        </th>
                    ),
                    td: ({children}) => (
                        <td className="border border-gray-600 px-3 py-2 text-gray-300 break-words">
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
