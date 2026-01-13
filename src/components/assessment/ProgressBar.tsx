'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
  elapsedTime?: number;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function ProgressBar({
  progress,
  currentQuestion,
  totalQuestions,
  elapsedTime,
}: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>
        {elapsedTime !== undefined && (
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {formatTime(elapsedTime)}
          </span>
        )}
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-[#F5B041] to-[#e6a439] rounded-full"
        />
      </div>
    </div>
  );
}
