import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, BookOpen } from 'lucide-react';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI database assistant. I can help you with SQL queries, database concepts, normalization, relationships, and much more. What would you like to learn about?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('join') || input.includes('relationship')) {
      return "Great question about JOINs! In relational databases, JOINs are used to combine data from multiple tables based on related columns. Here are the main types:\n\n• **INNER JOIN**: Returns only matching records from both tables\n• **LEFT JOIN**: Returns all records from the left table, plus matched records from the right\n• **RIGHT JOIN**: Returns all records from the right table, plus matched records from the left\n• **FULL OUTER JOIN**: Returns all records when there's a match in either table\n\nWould you like me to show you some examples with our sample database?";
    }
    
    if (input.includes('primary key') || input.includes('foreign key')) {
      return "Keys are fundamental to relational databases!\n\n**Primary Key:**\n• Uniquely identifies each record in a table\n• Cannot contain NULL values\n• Each table can have only one primary key\n• Can be composed of multiple columns (composite key)\n\n**Foreign Key:**\n• Creates a link between two tables\n• References the primary key of another table\n• Helps maintain referential integrity\n• Can contain NULL values (unless specified otherwise)\n\nIn our sample database, 'id' fields are primary keys, and fields like 'student_id' in the enrollments table are foreign keys!";
    }
    
    if (input.includes('normalization') || input.includes('normal form')) {
      return "Database normalization helps eliminate data redundancy and improve data integrity!\n\n**1st Normal Form (1NF):**\n• Each column contains atomic values\n• No repeating groups\n\n**2nd Normal Form (2NF):**\n• Must be in 1NF\n• No partial dependencies on composite primary keys\n\n**3rd Normal Form (3NF):**\n• Must be in 2NF\n• No transitive dependencies\n\nNormalization helps reduce storage space and prevents update anomalies. Would you like me to explain any specific normal form in more detail?";
    }
    
    if (input.includes('sql') || input.includes('query') || input.includes('select')) {
      return "SQL (Structured Query Language) is the standard language for interacting with relational databases. Here are some key concepts:\n\n**Basic SQL Commands:**\n• SELECT: Retrieve data\n• INSERT: Add new records\n• UPDATE: Modify existing records\n• DELETE: Remove records\n\n**Query Structure:**\n```sql\nSELECT columns\nFROM table\nWHERE conditions\nGROUP BY columns\nHAVING group_conditions\nORDER BY columns;\n```\n\nTry practicing with our Query Practice section! What specific SQL topic would you like to explore?";
    }
    
    if (input.includes('index') || input.includes('performance')) {
      return "Database indexes are crucial for query performance!\n\n**What are indexes?**\n• Data structures that improve query speed\n• Like an index in a book - helps find information quickly\n• Trade-off: faster reads, slower writes\n\n**Types of indexes:**\n• Clustered: Determines physical storage order\n• Non-clustered: Separate structure pointing to data\n• Unique: Ensures uniqueness\n• Composite: Covers multiple columns\n\n**When to use indexes:**\n✅ Frequently queried columns\n✅ Columns used in WHERE, JOIN, ORDER BY\n❌ Small tables\n❌ Frequently updated columns\n\nWould you like to learn about query optimization strategies?";
    }

    // Default response
    return "I'm here to help with database concepts! I can assist with:\n\n• SQL queries and syntax\n• Database design principles\n• Normalization and relationships\n• Joins and advanced queries\n• Performance optimization\n• Data modeling\n\nFeel free to ask me anything specific about databases, or try asking about topics like 'What are JOINs?', 'Explain normalization', or 'How do indexes work?'";
  };

  const quickQuestions = [
    "What are database relationships?",
    "Explain SQL JOINs",
    "What is normalization?",
    "How do indexes work?",
    "Primary vs Foreign keys"
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">AI Database Assistant</h1>
        <p className="text-gray-400">
          Get instant help with database concepts, SQL queries, and more from our AI assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Questions */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sticky top-4">
            <h2 className="font-semibold text-white mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
              Quick Questions
            </h2>
            
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="w-full text-left p-3 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 text-gray-300"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="mt-6 p-3 bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-lg border border-purple-500/30">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-white">Study Tip</span>
              </div>
              <p className="text-xs text-gray-300">
                Practice queries in the Query Practice section after learning concepts here!
              </p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex flex-col h-96 lg:h-[600px]">
            <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-white">Database AI Assistant</h2>
                <p className="text-sm text-gray-400">Always ready to help with database questions</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    } rounded-xl px-4 py-3 shadow-lg`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'ai' && (
                        <Bot className="h-4 w-4 mt-0.5 text-gray-400" />
                      )}
                      {message.sender === 'user' && (
                        <User className="h-4 w-4 mt-0.5 text-white/80" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/60' : 'text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-xl px-4 py-3 max-w-xs shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-gray-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about databases, SQL, or any related topic..."
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center shadow-lg hover:shadow-purple-500/25"
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