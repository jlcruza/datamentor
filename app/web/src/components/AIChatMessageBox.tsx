import {Bot, Send, X} from "lucide-react";
import React, {useState} from "react";
import type {ChatMessage, Lesson} from "../App.tsx";

type AIChatMessageBoxProps = {
    selectedLesson: Lesson;
    chatMessages: ChatMessage[];
    setShowAIChat: (state: boolean) => void;
    setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const AIChatMessageBox: React.FC<AIChatMessageBoxProps> = (
    {
        selectedLesson,
        chatMessages,
        setShowAIChat,
        setChatMessages,
    }
) => {
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);

    const generateContextualAIResponse = (userInput: string, lesson: Lesson | null): string => {
        if (!lesson) return "I'm here to help with your database questions!";

        const input = userInput.toLowerCase();
        const lessonTitle = lesson.title.toLowerCase();

        // Context-aware responses based on current lesson
        if (lessonTitle.includes('introduction') && lessonTitle.includes('database')) {
            if (input.includes('what') || input.includes('explain')) {
                return `Great question about databases! From this lesson, remember that a database is an organized collection of structured information. Think of it like a digital filing cabinet where:\n\n• **Data** = Raw facts (like "John", "25", "Engineer")\n• **Information** = Processed data with meaning (like "John is a 25-year-old Engineer")\n• **Database** = The organized system storing this information\n• **DBMS** = The software managing it all\n\nThe key benefits we covered are organization, integrity, security, concurrent access, and recovery. Would you like me to elaborate on any of these concepts?`;
            }
            return `I can help explain any concepts from "${lesson.title}". This lesson covers the fundamentals of what databases are, why we use them, and the different types available. What specific part would you like me to clarify?`;
        }

        if (lessonTitle.includes('relational') && lessonTitle.includes('model')) {
            if (input.includes('table') || input.includes('relation')) {
                return `Perfect! You're asking about the core of this lesson. In the relational model:\n\n• **Tables** organize data into rows and columns\n• **Rows** (tuples) represent individual records\n• **Columns** (attributes) represent data fields\n• **Primary keys** uniquely identify each row\n• **Foreign keys** create relationships between tables\n\nRemember the key properties: unique table names, unique column names within tables, unique rows, and atomic values in each cell. Does this help clarify the relational model structure?`;
            }
            return `This lesson focuses on how relational databases organize data into tables with rows and columns. I can explain tables, relationships, keys, or any other concept from this lesson. What would you like to explore?`;
        }

        if (lessonTitle.includes('select')) {
            if (input.includes('where') || input.includes('filter')) {
                return `Great question about filtering! The WHERE clause from this lesson is crucial for getting specific data:\n\n\`\`\`sql\nSELECT name, major \nFROM students \nWHERE major = 'Computer Science';\n\`\`\`\n\nThis filters to show only Computer Science students. You can use operators like =, !=, >, <, >=, <= to create different conditions. Try combining conditions with AND/OR for more complex filtering!`;
            }
            if (input.includes('order') || input.includes('sort')) {
                return `ORDER BY is covered in this lesson! It sorts your results:\n\n\`\`\`sql\nSELECT name, email \nFROM students \nORDER BY name ASC;\n\`\`\`\n\n• **ASC** = Ascending (A to Z, 1 to 10)\n• **DESC** = Descending (Z to A, 10 to 1)\n\nYou can sort by multiple columns too: \`ORDER BY major, name\` sorts by major first, then by name within each major.`;
            }
            return `This lesson covers SELECT statements - the foundation of data retrieval! I can help explain SELECT syntax, WHERE clauses, ORDER BY, LIMIT, or any other concept from this lesson. What would you like to practice?`;
        }

        if (lessonTitle.includes('relationship')) {
            return `This lesson covers the three main relationship types! I can explain one-to-one, one-to-many, or many-to-many relationships, plus how foreign keys implement them. Which relationship type would you like me to clarify?`;
        }

        if (lessonTitle.includes('join')) {
            return `JOINs are powerful! From this lesson, remember:\n\n• **INNER JOIN** = Only matching records\n• **LEFT JOIN** = All from left table + matches from right\n• **RIGHT JOIN** = All from right table + matches from left\n• **FULL OUTER JOIN** = All records from both tables\n\nWhich JOIN type would you like me to explain further with examples?`;
        }

        // Default contextual response
        return `I'm here to help with "${lesson.title}"! I can explain any concepts from this lesson, provide additional examples, or answer questions about the material. What specific part would you like to discuss?`;
    };


    const sendChatMessage = async () => {
        if (!chatInput.trim() || isChatLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            content: chatInput,
            sender: 'user',
            timestamp: new Date()
        };

        setChatMessages((prev: ChatMessage[]) => [...prev, userMessage]);
        setChatInput('');
        setIsChatLoading(true);

        // Simulate AI response with lesson context
        setTimeout(() => {
            const aiResponse = generateContextualAIResponse(chatInput, selectedLesson);
            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                content: aiResponse,
                sender: 'ai',
                timestamp: new Date()
            };

            setChatMessages(prev => [...prev, aiMessage]);
            setIsChatLoading(false);
        }, 800 + Math.random() * 700);
    };

    const closeAIChat = () => {
        setShowAIChat(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md h-96 border border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full">
                            <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">AI Assistant</h3>
                            <p className="text-xs text-gray-400">Help with: {selectedLesson.title}</p>
                        </div>
                    </div>
                    <button
                        onClick={closeAIChat}
                        className="p-1 text-gray-400 hover:text-white rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs ${
                                    message.sender === 'user'
                                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                                        : 'bg-gray-700 text-gray-100'
                                } rounded-lg px-3 py-2 shadow-lg`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                    message.sender === 'user' ? 'text-white/60' : 'text-gray-400'
                                }`}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isChatLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-700 rounded-lg px-3 py-2 max-w-xs shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                            placeholder="Ask about this lesson..."
                            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                            disabled={isChatLoading}
                        />
                        <button
                            onClick={sendChatMessage}
                            disabled={!chatInput.trim() || isChatLoading}
                            className="px-3 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center shadow-lg"
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