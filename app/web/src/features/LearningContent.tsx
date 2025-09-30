import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';
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
import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";
import {User} from "../types/user.ts";
import {ProgressRepository} from "../repository/progressRepository.ts";
import {ASSISTANT_ROLE, Msg} from "../services/OpenAiService.ts";
import {PracticeExerciseService} from "../services/PracticeExerciseService.ts";
import {PracticeExerciseQuestionBoxDto} from "../services/dto/PracticeExerciseQuestionBoxDto.ts";

interface LearningContentProps {
  lessons: LearningContentDto[];
  user: User | null;
}

const LearningContent: React.FC<LearningContentProps> = ({ lessons, user }) => {
  const { t } = useTranslation();
  const [selectedLesson, setSelectedLesson] = useState<LearningContentDto | null>(null);
  const [questions, setQuestions] = useState<PracticeExerciseQuestionBoxDto[]>([]);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Msg[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (selectedLesson && user) {
        try {
          const progress = await ProgressRepository.getStudentProgressOnLesson(user as User, selectedLesson);
          const exercises = await PracticeExerciseService.getPracticeExerciseByLessonId(selectedLesson.lesson_id);
          setQuestions(exercises);
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

  const categories = [
    ...new Map(
        lessons
            .sort((a, b) => a.module_id - b.module_id) // sort by module_id ascending
            .map((lesson) => [lesson.module_id, lesson.module_name]) // create [id, name] pairs
    ).values() // extract only the names
  ];


    const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openAIChat = () => {
    setShowAIChat(true);
    if (chatMessages.length === 0 && selectedLesson) {
      setChatMessages([{
        content: t('aiAssistant.contextualHelp', { lessonTitle: selectedLesson.lesson_name }),
        role: ASSISTANT_ROLE
      }]);
    }
  };


  if (selectedLesson) {
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
                               buttonText={t('learningContent.theory')}/>
              <LessonTabButton activeTab={activeTab}
                               onActiveTabSet={setActiveTab}
                               stateText={'practice'}
                               buttonText={t('learningContent.practice', { count: questions.length })}/>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'theory' && (
            <div className="relative w-full overflow-hidden">
              {/* AI Chat Button */}
                <AIChatButton openAIChat={openAIChat}/>
                <div className="w-full overflow-hidden">
                  <CustomReactViewer selectedLesson={selectedLesson}/>
                </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">{t('learningContent.practiceQuestions')}</h2>
                <p className="text-gray-400">{t('learningContent.practiceSubtitle')}</p>
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
                  <p>{t('learningContent.noPracticeQuestions')}</p>
                  <p className="text-sm mt-1">{t('learningContent.checkBackLater')}</p>
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
        <h1 className="text-3xl font-bold text-white mb-2">{t('learningContent.title')}</h1>
        <p className="text-gray-400">
          {t('learningContent.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/*  Shows all the categories and lessons in the database */}
        <CourseDirectory categories={categories} lessons={lessons} onSelectLesson={setSelectedLesson}/>

        {/*  Shows all the lessons in different cards*/}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons
                .sort((a, b) => a.lesson_id - b.lesson_id)
                .map(lesson => (
                <LessonCard lesson={lesson} getDifficultyColor={getDifficultyColor} onSelectLesson={setSelectedLesson} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningContent;