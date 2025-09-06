import {MessageCircle} from "lucide-react";
import React from "react";

type AIButtonProps = {
    openAIChat: () => void;
}

const AIChatButton: React.FC<AIButtonProps> = (
    {
        openAIChat
    }
) => {


    return (
        <button
            onClick={openAIChat}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-3 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 z-10"
            title="Chat with AI about this lesson"
        >
            <MessageCircle className="h-6 w-6" />
        </button>
    )
}

export default AIChatButton;