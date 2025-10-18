import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Sparkles } from 'lucide-react';
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
import {AIQuotaInfoDto} from "../services/dto/aiQuotaInfoDto.ts";
import {generateQuestions} from "../services/AiPracticeExerciseService.ts";

interface LearningContentProps {
    lessons: LearningContentDto[];
    onLessonsSet: (newLessons: LearningContentDto[]) => void;
    user: User | null;
    aiQuota?: AIQuotaInfoDto | null;
    onRefreshQuota?: () => Promise<void>;
}

const LearningContent: React.FC<LearningContentProps> = ({ lessons, onLessonsSet, user, aiQuota, onRefreshQuota }) => {
  const { t } = useTranslation();
  const [selectedLesson, setSelectedLesson] = useState<LearningContentDto | null>(null);
  const [questions, setQuestions] = useState<PracticeExerciseQuestionBoxDto[]>([]);
  const [aiGeneratedQuestions, setAiGeneratedQuestions] = useState<PracticeExerciseQuestionBoxDto[]>([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
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
          setAiGeneratedQuestions([]);
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

  const handleGenerateAIQuestions = async () => {
    if (!selectedLesson || isGeneratingQuestions || (aiQuota && !aiQuota.isUnderLimit)) {
      return;
    }

    setIsGeneratingQuestions(true);
    try {
      const generatedQuestions = await generateQuestions(
        selectedLesson.lesson_name,
        selectedLesson.lesson_id
      );
      setAiGeneratedQuestions(generatedQuestions);

      if (onRefreshQuota) {
        await onRefreshQuota();
      }
    } catch (error) {
      console.error('Error generating AI questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const markLessonComplete = async () => {
    if (selectedLesson && user != null) {
        await ProgressRepository.saveProgress(user, selectedLesson, true);
        setIsCompleted(true);

      // Update the lessons array with the completed status
      const updatedLessons = lessons.map(lesson =>
        lesson.lesson_id === selectedLesson.lesson_id
          ? { ...lesson, completed: true }
          : lesson
      );
      onLessonsSet(updatedLessons);
      setSelectedLesson({...selectedLesson, completed: true});
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
      case 'principiante': return 'bg-green-100 text-green-800';
      case 'intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'avanzado': return 'bg-red-100 text-red-800';
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <BackToLessonButton onSelectedLesson={setSelectedLesson}/>
          
          <div className="flex items-start justify-between mb-4">
              <LessonHeader selectedLesson={selectedLesson} getDifficultyColor={getDifficultyColor}/>

              <CompletedBadge show={isCompleted}/>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
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
            <div className="relative w-full overflow-hidden -mx-6 px-2 sm:px-6">
              {/* AI Chat Button */}
                <AIChatButton openAIChat={openAIChat}/>
                <div className="w-full overflow-hidden max-w-full">
                  <CustomReactViewer selectedLesson={selectedLesson} markdownText={null}/>
                </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('learningContent.practiceQuestions')}</h2>
                <p className="text-gray-600 dark:text-gray-400">{t('learningContent.practiceSubtitle')}</p>
              </div>

              {questions.length > 0 ? (
                <div className="space-y-6">
                  {questions.map((question, index) =>
                  {
                      return (
                          <PracticeQuestionBox key={`db-${index}`} question={question} index={index}/>
                      )})}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>{t('learningContent.noPracticeQuestions')}</p>
                  <p className="text-sm mt-1">{t('learningContent.checkBackLater')}</p>
                </div>
              )}

              {questions.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Want more practice?</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Generate additional AI-powered questions</p>
                    </div>
                    <button
                      onClick={handleGenerateAIQuestions}
                      disabled={isGeneratingQuestions || (aiQuota !== null && !aiQuota.isUnderLimit)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-purple-600 dark:to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 dark:hover:from-purple-700 dark:hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-purple-500/25"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>{isGeneratingQuestions ? 'Generating...' : 'Generate AI Questions'}</span>
                    </button>
                  </div>

                  {aiGeneratedQuestions.length > 0 && (
                    <div className="space-y-6">
                      {aiGeneratedQuestions.map((question, index) =>
                      {
                          return (
                              <PracticeQuestionBox key={`ai-${index}`} question={question} index={questions.length + index}/>
                          )})}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Mark Complete Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <CompletedLessonFooter isCompleted={isCompleted}
                                     onMarkComplete={markLessonComplete}/>
          </div>
        </div>

        {/* AI Chat Popup */}
        {showAIChat && (
            <AIChatMessageBox selectedLesson={selectedLesson}
                              chatMessages={chatMessages}
                              setShowAIChat={setShowAIChat}
                              setChatMessages={setChatMessages}
                              aiQuota={aiQuota}
                              onRefreshQuota={onRefreshQuota} />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('learningContent.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
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