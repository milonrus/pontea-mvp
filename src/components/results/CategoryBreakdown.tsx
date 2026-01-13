'use client';

import { motion } from 'framer-motion';
import { CategoryScore, Category } from '@/types';

interface CategoryBreakdownProps {
  scores: CategoryScore[];
}

const categoryConfig: Record<
  Category,
  { label: string; color: string; bgColor: string }
> = {
  math: { label: 'Mathematics', color: '#3b82f6', bgColor: '#eff6ff' },
  logic: { label: 'Logic', color: '#8b5cf6', bgColor: '#f5f3ff' },
  art_history: { label: 'Art History', color: '#f59e0b', bgColor: '#fffbeb' },
};

function getStrengthLabel(percentage: number): { text: string; color: string } {
  if (percentage >= 75) return { text: 'Strong', color: 'text-green-500' };
  if (percentage >= 50) return { text: 'Needs Work', color: 'text-yellow-500' };
  return { text: 'Critical', color: 'text-red-500' };
}

export function CategoryBreakdown({ scores }: CategoryBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">
        Performance by Category
      </h2>

      <div className="space-y-6">
        {scores.map((score, index) => {
          const config = categoryConfig[score.category];
          const strength = getStrengthLabel(score.percentage);

          return (
            <motion.div
              key={score.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="font-medium text-[#1a1a2e]">
                    {config.label}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-medium ${strength.color}`}>
                    {strength.text}
                  </span>
                  <span className="text-gray-500">
                    {score.correct}/{score.total}
                  </span>
                </div>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: config.bgColor }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: config.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span className="text-gray-600">Strong (75%+)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
            <span className="text-gray-600">Needs Work (50-74%)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <span className="text-gray-600">Critical (&lt;50%)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
