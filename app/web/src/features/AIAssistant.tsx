import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Bot, User, Lightbulb, BookOpen } from 'lucide-react';
import {askTutor, ASSISTANT_ROLE, Msg, USER_ROLE} from "../services/OpenAiService.ts";
import CustomReactViewer from "../components/CustomReactViewer.tsx";

const AIAssistant: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Msg[]>([
    {
      content: t('aiAssistant.welcomeMessage', "Hello! I'm your AI database assistant. I can help you with SQL queries, database concepts, normalization, relationships, and much more. What would you like to learn about?"),
      role: ASSISTANT_ROLE
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Msg = {
      content: inputMessage,
      role: USER_ROLE
    };

    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Add user message to the list
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Small delay to ensure the UI updates before making the API call
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      // Send request with the updated messages list (without id property)
      const aiResponse = await askTutor({
        prompt: currentInput,
        hint: "",
        messages: updatedMessages
      });

      // Add AI response to the list
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = t('aiAssistant.quickQuestionsList', { returnObjects: true }) as string[];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('aiAssistant.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('aiAssistant.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Questions */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-500 dark:text-yellow-400" />
              {t('aiAssistant.quickQuestions')}
            </h2>
            
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="w-full text-left p-3 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="mt-6 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-purple-900/50 dark:to-cyan-900/50 rounded-lg border border-blue-200 dark:border-purple-500/30">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{t('aiAssistant.studyTip')}</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {t('aiAssistant.studyTipText')}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-96 lg:h-[600px]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-purple-600 dark:to-cyan-600 rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{t('aiAssistant.title')}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('aiAssistant.alwaysReady')}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}-${message.content.substring(0, 20)}`}
                  className={`flex ${message.role === USER_ROLE ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg break-words overflow-hidden ${
                      message.role === USER_ROLE
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-purple-600 dark:to-cyan-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    } rounded-xl px-4 py-3 shadow-lg`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === ASSISTANT_ROLE && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
                      )}
                      {message.role === USER_ROLE && (
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0 text-white/80" />
                      )}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="text-sm">
                            <CustomReactViewer fitParent selectedLesson={null} markdownText={message.content}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 max-w-xs shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 dark:bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 dark:bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 dark:bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t('aiAssistant.askAboutDatabases')}
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-purple-600 dark:to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 dark:hover:from-purple-700 dark:hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-purple-500/25"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;