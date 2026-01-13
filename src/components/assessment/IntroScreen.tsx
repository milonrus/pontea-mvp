'use client';

import { motion } from 'framer-motion';
import { Button } from '../shared/Button';

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="w-24 h-24 bg-[#F5B041]/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg
          className="w-12 h-12 text-[#F5B041]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
        Free Level Assessment
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        In just 5 minutes, we&apos;ll identify your current level and create a
        personalized learning plan to help you succeed in the ARCHED & TIL-A exams.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#F5B041]">12</div>
          <div className="text-sm text-gray-500">Questions</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#F5B041]">5</div>
          <div className="text-sm text-gray-500">Minutes</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#F5B041]">3</div>
          <div className="text-sm text-gray-500">Categories</div>
        </div>
      </div>

      <div className="space-y-4 text-left max-w-md mx-auto mb-10">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
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
          <span className="text-gray-600">
            Questions adapt to your level for accurate assessment
          </span>
        </div>
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
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
          <span className="text-gray-600">
            Covers Math, Logic, and Art History - all exam areas
          </span>
        </div>
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
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
          <span className="text-gray-600">
            Get a personalized 3-month study roadmap
          </span>
        </div>
      </div>

      <Button onClick={onStart} size="lg">
        Begin Assessment
      </Button>
    </motion.div>
  );
}
