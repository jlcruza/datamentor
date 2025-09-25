import {CheckCircle} from "lucide-react";
import { useTranslation } from 'react-i18next';
import React, {useState} from "react";
import {PracticeExerciseQuestionBoxDto} from "../services/dto/PracticeExerciseQuestionBoxDto.ts";

type PracticeQuestionBoxProps = {
    question: PracticeExerciseQuestionBoxDto,
    index: number,
}

const PracticeQuestionBox: React.FC<PracticeQuestionBoxProps> = (
    {
        question,
        index,
    }) => {
    const { t } = useTranslation();
    const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, number>>({});

    const userAnswer = answeredQuestions[question.question_id];
    const isAnswered = userAnswer !== undefined;
    const isCorrect = userAnswer === question.correct_answer_index;

    const handleAnswerQuestion = (questionId: number, selectedAnswer: number) => {
        setAnsweredQuestions(prev => ({
            ...prev,
            [questionId]: selectedAnswer
        }));
    };

    return (
        <div key={question.question_id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <div className="mb-4">
                <h3 className="text-lg font-medium text-white mb-3">
                    {t('practiceQuestions.question', { number: index + 1 })} {question.question}
                </h3>
            </div>

            <div className="space-y-3 mb-4">
                {question.options.map((option, optionIndex) => {
                    let buttonClass = "w-full text-left p-3 rounded-lg border transition-all duration-200 ";

                    if (isAnswered) {
                        if (optionIndex === question.correct_answer_index) {
                            buttonClass += "border-green-500 bg-green-900/30 text-green-300";
                        } else if (optionIndex === userAnswer && !isCorrect) {
                            buttonClass += "border-red-500 bg-red-900/30 text-red-300";
                        } else {
                            buttonClass += "border-gray-600 bg-gray-800 text-gray-400";
                        }
                    } else {
                        buttonClass += "border-gray-600 bg-gray-800 text-gray-300 hover:border-purple-500 hover:bg-gray-700 cursor-pointer";
                    }

                    return (
                        <button
                            key={optionIndex}
                            onClick={() => !isAnswered && handleAnswerQuestion(question.question_id, optionIndex)}
                            disabled={isAnswered}
                            className={buttonClass}
                        >
                            <div className="flex items-center space-x-3">
                                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold">
                                    {String.fromCharCode(65 + optionIndex)}
                                  </span>
                                <span>{option}</span>
                                {isAnswered && optionIndex === question.correct_answer_index && (
                                    <CheckCircle className="h-5 w-5 text-green-400 ml-auto" />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {isAnswered && (
                <div className={`p-4 rounded-lg border ${
                    isCorrect
                        ? 'bg-green-900/30 border-green-500/30 text-green-300'
                        : 'bg-red-900/30 border-red-500/30 text-red-300'
                }`}>
                    <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className={`h-5 w-5 ${isCorrect ? 'text-green-400' : 'text-red-400'}`} />
                        <span className="font-medium">
                                {isCorrect ? t('practiceQuestions.correct') : t('practiceQuestions.incorrect')}
                              </span>
                    </div>
                    <p className="text-sm">{question.reason}</p>
                </div>
            )}
        </div>
    )
}

export default PracticeQuestionBox;