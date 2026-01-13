'use client';

import { motion } from 'framer-motion';
import { AssessmentResult } from '@/types';

interface ScoreCardProps {
  result: AssessmentResult;
}

const levelConfig = {
  beginner: {
    label: 'Beginner',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    description: 'Needs comprehensive preparation',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    description: 'Good foundation, needs focused work',
  },
  ready: {
    label: 'Ready',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    description: 'Strong foundation, needs polish',
  },
};

export function ScoreCard({ result }: ScoreCardProps) {
  const config = levelConfig[result.level];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8 text-center"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
        Your Assessment Results
      </h1>
      <p className="text-gray-600 mb-8">{result.userInfo.name}</p>

      {/* Score Circle */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="#f3f4f6"
            strokeWidth="12"
            fill="none"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke={
              result.level === 'ready'
                ? '#22c55e'
                : result.level === 'intermediate'
                ? '#3b82f6'
                : '#f97316'
            }
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 553' }}
            animate={{
              strokeDasharray: `${(result.percentage / 100) * 553} 553`,
            }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-[#1a1a2e]"
          >
            {result.totalScore}/{result.totalQuestions}
          </motion.span>
          <span className="text-gray-500">Correct</span>
        </div>
      </div>

      {/* Level Badge */}
      <div
        className={`inline-flex items-center px-6 py-3 rounded-full ${config.bgColor} mb-4`}
      >
        <span className={`text-xl font-bold ${config.color}`}>
          {config.label}
        </span>
      </div>
      <p className="text-gray-600">{config.description}</p>

      {/* Time taken */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-gray-500">
          Completed in{' '}
          <span className="font-semibold text-[#1a1a2e]">
            {Math.floor(result.timeTaken / 60)} minutes{' '}
            {result.timeTaken % 60} seconds
          </span>
        </p>
      </div>
    </motion.div>
  );
}
