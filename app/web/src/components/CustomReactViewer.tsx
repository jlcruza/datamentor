import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, {useEffect, useState} from "react";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";
import {supabase} from "../lib/supabaseClient.ts";
import {VITE_SUPABASE_BUCKET_NAME} from "../constants/environmentConfigs.ts"
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import {useTheme} from "../contexts/ThemeContext.tsx";

SyntaxHighlighter.registerLanguage('sql', sql);

type CustomReactViewerProps = {
    selectedLesson: LearningContentDto | null;
    markdownText: string | null;
    fitParent?: boolean;
};

const CustomReactViewer: React.FC<CustomReactViewerProps> = (
    {
        selectedLesson,
        markdownText,
        fitParent = false,
    }
) => {
    const [md, setMd] = useState<string>('');
    const { theme } = useTheme();

    useEffect(() => {
        let isMounted = true;
        (async () => {
            if (markdownText != null && markdownText != "")
            {
                setMd(markdownText);
            }
            else
            {
                if (selectedLesson == null || selectedLesson.content_path == null)
                {
                    setMd("");
                }
                else{
                    const { data, error } = await supabase.storage.from(VITE_SUPABASE_BUCKET_NAME)
                        .download(selectedLesson.content_path);

                    if (!error && data && isMounted) {
                        const text = await data.text();
                        setMd(text);
                    }
                }
            }
        })();
        return () => { isMounted = false; };
    });

    const containerPadding = fitParent ? "" : "px-2 sm:px-4";
    const codeWrapperClass = fitParent
        ? "overflow-x-auto my-2 max-w-full"
        : "overflow-x-auto my-2 sm:my-4 -mx-2 sm:-mx-4 px-2 sm:px-4";
    const tableWrapperClass = fitParent
        ? "overflow-x-auto mb-2 sm:mb-4 w-full"
        : "overflow-x-auto mb-2 sm:mb-4 w-full -mx-2 sm:-mx-4 px-2 sm:px-4";

    return (
        <div className={`prose dark:prose-invert max-w-none w-full ${fitParent ? 'overflow-x-auto' : 'overflow-hidden'} ${containerPadding}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({children}) => <h1 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-purple-300 mb-3 sm:mb-4 break-words hyphens-auto">{children}</h1>,
                    h2: ({children}) => <h2 className="text-lg sm:text-xl font-semibold text-blue-700 dark:text-purple-400 mb-2 sm:mb-3 break-words hyphens-auto">{children}</h2>,
                    h3: ({children}) => <h3 className="text-base sm:text-lg font-medium text-blue-800 dark:text-purple-500 mb-2 break-words hyphens-auto">{children}</h3>,
                    p: ({children}) => <p className="text-gray-800 dark:text-gray-300 mb-2 sm:mb-3 leading-relaxed break-words hyphens-auto text-sm sm:text-base">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 mb-2 sm:mb-3 space-y-1 break-words text-sm sm:text-base pl-2 sm:pl-4">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside text-gray-800 dark:text-gray-300 mb-2 sm:mb-3 space-y-1 break-words text-sm sm:text-base pl-2 sm:pl-4">{children}</ol>,
                    li: ({children}) => <li className="text-gray-800 dark:text-gray-300 break-words hyphens-auto">{children}</li>,
                    code: ({className, children, ...props}) => {
                        const isBlock = /language-(\w+)/.exec(className || '');
                        return !isBlock ? (
                            <code className="bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-cyan-300 px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono break-all">
                                {children}
                            </code>
                        ) : (
                            <div className={codeWrapperClass}>
                                <SyntaxHighlighter
                                    style={theme === 'light' ? prism : atomDark}
                                    language="sql"
                                    PreTag="div"
                                    customStyle={fitParent ? {
                                        maxWidth: '100%',
                                        fontSize: '0.75rem',
                                        margin: 0,
                                    } : undefined}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        );
                    },
                    blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-blue-500 dark:border-purple-500 pl-2 sm:pl-4 italic text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 bg-blue-50 dark:bg-gray-900/50 py-2 rounded-r-lg break-words text-sm sm:text-base">
                            {children}
                        </blockquote>
                    ),
                    table: ({children}) => (
                        <div className={tableWrapperClass}>
                            <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({children}) => (
                        <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-1 sm:py-2 bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-purple-300 font-semibold text-left break-words">
                            {children}
                        </th>
                    ),
                    td: ({children}) => (
                        <td className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-1 sm:py-2 text-gray-800 dark:text-gray-300 break-words">
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
