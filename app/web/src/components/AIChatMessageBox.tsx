import {Bot, Send, X} from "lucide-react";
import React, {useState} from "react";
import {askTutor, Msg, USER_ROLE} from "../services/OpenAiService.ts";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";
import {useTranslation} from "react-i18next";
import {useTheme} from "../contexts/ThemeContext.tsx";
import AIQuotaProgress from "./AIQuotaProgress.tsx";
import { AIQuotaInfo } from "../services/AIUsageService.ts";

type AIChatMessageBoxProps = {
    selectedLesson: LearningContentDto;
    chatMessages: Msg[];
    setShowAIChat: (state: boolean) => void;
    setChatMessages: React.Dispatch<React.SetStateAction<Msg[]>>;
    aiQuota?: AIQuotaInfo | null;
    onRefreshQuota?: () => Promise<void>;
}

const AIChatMessageBox: React.FC<AIChatMessageBoxProps> = (
    {
        selectedLesson,
        chatMessages,
        setShowAIChat,
        setChatMessages,
        aiQuota,
        onRefreshQuota,
    }
) => {
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const { t } = useTranslation();
    const { theme } = useTheme();

    const sendChatMessage = async () => {
        if (!chatInput.trim() || isChatLoading) return;

        if (aiQuota && !aiQuota.isUnderLimit) {
            return;
        }

        const userMessage: Msg = {
            content: chatInput,
            role: USER_ROLE
        };

        setChatMessages((prev: Msg[]) => [...prev, userMessage]);
        setChatInput('');
        setIsChatLoading(true);

        const aiResponse = await askTutor({
            prompt: chatInput,
            hint: selectedLesson.lesson_name,
            messages: chatMessages
        });

        setChatMessages(prev => [...prev, aiResponse]);
        setIsChatLoading(false);

        if (onRefreshQuota) {
            await onRefreshQuota();
        }
    };

    const closeAIChat = () => {
        setShowAIChat(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md h-[500px] border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-purple-600 dark:to-cyan-600 rounded-full">
                                <Bot className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{t("aiAssistant.helpWith")}{selectedLesson.lesson_name}</p>
                            </div>
                        </div>
                        <button
                            onClick={closeAIChat}
                            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <AIQuotaProgress quota={aiQuota ?? null} />
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((message, index) => (
                        <div
                            key={`${message.role}-${index}`}
                            className={`flex ${message.role === USER_ROLE ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs ${
                                    message.role === USER_ROLE
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-purple-600 dark:to-cyan-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                                } rounded-lg px-3 py-2 shadow-lg`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}

                    {isChatLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 max-w-xs shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-blue-400 dark:bg-purple-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-400 dark:bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-blue-400 dark:bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                            placeholder={
                                aiQuota && !aiQuota.isUnderLimit
                                    ? "AI quota limit reached"
                                    : "Ask about this lesson..."
                            }
                            className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent text-sm"
                            disabled={isChatLoading || (aiQuota !== null && !aiQuota.isUnderLimit)}
                        />
                        <button
                            onClick={sendChatMessage}
                            disabled={!chatInput.trim() || isChatLoading || (aiQuota !== null && !aiQuota.isUnderLimit)}
                            className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-purple-600 dark:to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 dark:hover:from-purple-700 dark:hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center shadow-lg"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AIChatMessageBox;