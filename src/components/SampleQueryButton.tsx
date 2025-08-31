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
            className="w-full text-left p-3 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600"
        >
            <div className="font-medium text-white">{sample.title}</div>
            <div className="text-gray-400 text-xs mt-1">{sample.description}</div>
        </button>
    )
}

export default SampleQueryButton;