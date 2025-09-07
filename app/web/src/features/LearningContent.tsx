import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import type {ChatMessage} from '../App.tsx';
import CourseDirectory from "../components/CourseDirectory.tsx";
import LessonCard from "../components/LessonCard.tsx";
import BackToLessonButton from "../components/BackToLessonButton.tsx";
import CompletedBadge from "../components/CompletedBadge.tsx";
import CustomReactViewer from "../components/CustomReactViewer.tsx";
import LessonHeader from "../components/LessonHeader.tsx";
import LessonTabButton from "../components/LessonTabButton.tsx";
import CompletedLessonFooter from "../components/CompletedLessonFooter.tsx";
import AIChatButton from "../components/AIChatButton.tsx";
import AIChatMessageBox from "../components/AIChatMessageBox.tsx";
import PracticeQuestionBox from "../components/PracticeQuestionBox.tsx";
import {Question} from "../types/question.ts";
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";
import {User} from "../types/user.ts";
import {ProgressRepository} from "../repository/progressRepository.ts";

interface LearningContentProps {
  lessons: LearningContentDto[];
  user: User | null;
}

const LearningContent: React.FC<LearningContentProps> = ({ lessons, user }) => {
  const [selectedLesson, setSelectedLesson] = useState<LearningContentDto | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (selectedLesson && user) {
        try {
          const progress = await ProgressRepository.getStudentProgressOnLesson(user as User, selectedLesson);
          if (isMounted) setIsCompleted(!!progress?.completed);
        } catch {
          if (isMounted) setIsCompleted(false);
        }
      } else if (isMounted) {
        setIsCompleted(false);
      }
    })();
    return () => { isMounted = false; };
  }, [selectedLesson, user]);

  const markLessonComplete = async () => {
    if (selectedLesson && user != null) {
        await ProgressRepository.saveProgress(user, selectedLesson, true);
        setIsCompleted(true);
      
      // Force re-render by updating state
      setSelectedLesson({...selectedLesson});
    }
  };

  const categories = [...new Set(lessons.map(lesson => lesson.module_name))];
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionsForLesson = (lessonId: number): Question[] => {
    const questionBank: Record<string, Question[]> = {
      1: [
        {
          id: '1-1',
          question: 'What is a database?',
          options: [
            'A collection of unorganized data',
            'An organized collection of structured information',
            'A single file containing data',
            'A programming language'
          ],
          correctAnswer: 1,
          explanation: 'A database is an organized collection of structured information, typically stored electronically and managed by a DBMS.'
        },
        {
          id: '1-2',
          question: 'Which of the following is NOT a benefit of using databases?',
          options: [
            'Data organization',
            'Data integrity',
            'Increased storage requirements',
            'Concurrent access'
          ],
          correctAnswer: 2,
          explanation: 'Databases actually help optimize storage through normalization and efficient data structures, reducing redundancy.'
        }
      ],
      2: [
        {
          id: '2-1',
          question: 'What uniquely identifies each row in a table?',
          options: [
            'Foreign key',
            'Primary key',
            'Index',
            'Column name'
          ],
          correctAnswer: 1,
          explanation: 'A primary key is a unique identifier for each row in a table and cannot contain NULL values.'
        },
        {
          id: '2-2',
          question: 'In the relational model, what is a tuple?',
          options: [
            'A column in a table',
            'A row in a table',
            'A table relationship',
            'A database constraint'
          ],
          correctAnswer: 1,
          explanation: 'A tuple is another term for a row in a relational database table, representing a single record.'
        }
      ],
      3: [
        {
          id: '3-1',
          question: 'Which SQL clause is used to filter rows?',
          options: [
            'ORDER BY',
            'GROUP BY',
            'WHERE',
            'HAVING'
          ],
          correctAnswer: 2,
          explanation: 'The WHERE clause is used to filter rows based on specified conditions.'
        },
        {
          id: '3-2',
          question: 'What does SELECT * mean in SQL?',
          options: [
            'Select all tables',
            'Select all columns',
            'Select all databases',
            'Select all rows'
          ],
          correctAnswer: 1,
          explanation: 'SELECT * means select all columns from the specified table(s).'
        }
      ],
      4: [
        {
          id: '4-1',
          question: 'In a one-to-many relationship, how many records in Table B can relate to one record in Table A?',
          options: [
            'Exactly one',
            'Zero or one',
            'Multiple',
            'None'
          ],
          correctAnswer: 2,
          explanation: 'In a one-to-many relationship, one record in Table A can relate to multiple records in Table B.'
        }
      ],
      5: [
        {
          id: '5-1',
          question: 'Which JOIN returns only matching records from both tables?',
          options: [
            'LEFT JOIN',
            'RIGHT JOIN',
            'INNER JOIN',
            'FULL OUTER JOIN'
          ],
          correctAnswer: 2,
          explanation: 'INNER JOIN returns only the records that have matching values in both tables.'
        }
      ]
    };

    return questionBank[lessonId] || [];
  };

  const openAIChat = () => {
    setShowAIChat(true);
    if (chatMessages.length === 0 && selectedLesson) {
      setChatMessages([{
        id: '1',
        content: `Hi! I'm here to help you understand "${selectedLesson.lesson_name}". I can explain concepts, answer questions, or provide additional examples. What would you like to know?`,
        sender: 'ai',
        timestamp: new Date()
      }]);
    }
  };


  if (selectedLesson) {
    const questions = getQuestionsForLesson(selectedLesson.lesson_id);
    
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
            <BackToLessonButton onSelectedLesson={setSelectedLesson}/>
          
          <div className="flex items-start justify-between mb-4">
              <LessonHeader selectedLesson={selectedLesson} getDifficultyColor={getDifficultyColor}/>

              <CompletedBadge show={isCompleted}/>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-700 p-1 rounded-lg">
              <LessonTabButton activeTab={activeTab}
                               onActiveTabSet={setActiveTab}
                               stateText={'theory'}
                               buttonText={'Theory'}/>
              <LessonTabButton activeTab={activeTab}
                               onActiveTabSet={setActiveTab}
                               stateText={'practice'}
                               buttonText={'Practice ({questions.length} questions)'}/>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'theory' && (
            <div className="relative">
              {/* AI Chat Button */}
                <AIChatButton openAIChat={openAIChat}/>
                <CustomReactViewer selectedLesson={selectedLesson}/>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Practice Questions</h2>
                <p className="text-gray-400">Test your understanding of the concepts from this lesson.</p>
              </div>

              {questions.length > 0 ? (
                <div className="space-y-6">
                  {questions.map((question, index) =>
                  {
                      return (
                          <PracticeQuestionBox question={question} index={index}/>
                      )})}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No practice questions available for this lesson yet.</p>
                  <p className="text-sm mt-1">Check back later for interactive exercises!</p>
                </div>
              )}
            </div>
          )}
          
          {/* Mark Complete Button */}
          <div className="mt-8 pt-6 border-t border-gray-700">
              <CompletedLessonFooter isCompleted={isCompleted}
                                     onMarkComplete={markLessonComplete}/>
          </div>
        </div>

        {/* AI Chat Popup */}
        {showAIChat && (
            <AIChatMessageBox selectedLesson={selectedLesson}
                              chatMessages={chatMessages}
                              setShowAIChat={setShowAIChat}
                              setChatMessages={setChatMessages}/>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Learning Materials</h1>
        <p className="text-gray-400">
          Comprehensive database concepts and tutorials for computer engineering students
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/*  Shows all the categories and lessons in the database */}
        <CourseDirectory categories={categories} lessons={lessons} onSelectLesson={setSelectedLesson}/>

        {/*  Shows all the lessons in different cards*/}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map(lesson => (
                <LessonCard lesson={lesson} getDifficultyColor={getDifficultyColor} onSelectLesson={setSelectedLesson} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningContent;