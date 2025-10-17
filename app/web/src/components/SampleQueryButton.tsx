import React from "react";

type SampleQueryButtonProps = {
    index: number;
    sample: {
        title: string;
        query: string;
        description: string;
    };
    onSelectedQuery: (query: string) => void;
}

const SampleQueryButton: React.FC<SampleQueryButtonProps> = ({
    index,
    sample,
    onSelectedQuery
}) => {

    return (
        <button
            key={index}
            onClick={() => onSelectedQuery(sample.query)}
            className="w-full text-left p-3 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-300 dark:border-gray-600"
        >
            <div className="font-medium text-gray-900 dark:text-white">{sample.title}</div>
            <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">{sample.description}</div>
        </button>
    )
}

export default SampleQueryButton;