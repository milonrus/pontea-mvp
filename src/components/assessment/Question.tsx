'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Question as QuestionType, Category } from '@/types';

interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
}

const categoryLabels: Record<Category, string> = {
  math: 'Mathematics',
  logic: 'Logic',
  art_history: 'Art History',
};

const categoryColors: Record<Category, string> = {
  math: 'bg-blue-100 text-blue-700',
  logic: 'bg-purple-100 text-purple-700',
  art_history: 'bg-amber-100 text-amber-700',
};

export function Question({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);

    // Show feedback briefly, then move to next question
    setTimeout(() => {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }, 800);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-2xl mx-auto"
    >
      {/* Question header */}
      <div className="flex items-center justify-between mb-6">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            categoryColors[question.category]
          }`}
        >
          {categoryLabels[question.category]}
        </span>
        <span className="text-gray-500 text-sm">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-8">
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => {
          let optionStyles = 'border-gray-200 hover:border-[#F5B041] hover:bg-[#F5B041]/5';

          if (selectedAnswer === index) {
            if (isSubmitted) {
              optionStyles = isCorrect
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50';
            } else {
              optionStyles = 'border-[#F5B041] bg-[#F5B041]/10';
            }
          } else if (isSubmitted && index === question.correctAnswer) {
            optionStyles = 'border-green-500 bg-green-50';
          }

          return (
            <motion.button
              key={index}
              whileHover={!isSubmitted ? { scale: 1.01 } : {}}
              whileTap={!isSubmitted ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(index)}
              disabled={isSubmitted}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionStyles} ${
                isSubmitted ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-medium ${
                    selectedAnswer === index
                      ? isSubmitted
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-[#F5B041] text-[#1a1a2e]'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span
                  className={`${
                    selectedAnswer === index && !isSubmitted
                      ? 'text-[#1a1a2e] font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {option}
                </span>

                {isSubmitted && index === question.correctAnswer && (
                  <svg
                    className="w-5 h-5 ml-auto text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Submit button */}
      <motion.button
        whileHover={selectedAnswer !== null && !isSubmitted ? { scale: 1.02 } : {}}
        whileTap={selectedAnswer !== null && !isSubmitted ? { scale: 0.98 } : {}}
        onClick={handleSubmit}
        disabled={selectedAnswer === null || isSubmitted}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
          selectedAnswer !== null && !isSubmitted
            ? 'bg-[#F5B041] text-[#1a1a2e] hover:bg-[#e6a439] cursor-pointer'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isSubmitted ? (isCorrect ? 'Correct!' : 'Moving on...') : 'Submit Answer'}
      </motion.button>
    </motion.div>
  );
}
