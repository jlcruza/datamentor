import React, {SetStateAction} from "react";

type LessonTabButtonProps = {
    activeTab: string;
    onActiveTabSet: (tab: SetStateAction<'theory' | 'practice'>) => void;
    stateText: "theory" | "practice";
    buttonText: string;
}

const LessonTabButton:React.FC<LessonTabButtonProps> = (
    {
        activeTab,
        onActiveTabSet,
        stateText,
        buttonText,
    }) => {

    return (
        <button
            onClick={() => onActiveTabSet(stateText)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === stateText
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-600'
            }`}
        >
            {buttonText}
        </button>
    )
}

export default LessonTabButton;