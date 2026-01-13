'use client';

import { motion } from 'framer-motion';
import { AssessmentResult, CategoryScore } from '@/types';

interface RoadmapProps {
  result: AssessmentResult;
}

function getWeakestCategories(scores: CategoryScore[]): string[] {
  return scores
    .filter(s => s.percentage < 75)
    .sort((a, b) => a.percentage - b.percentage)
    .map(s => {
      switch (s.category) {
        case 'math':
          return 'Mathematics';
        case 'logic':
          return 'Logic';
        case 'art_history':
          return 'Art History';
        default:
          return s.category;
      }
    });
}

function generateRoadmap(result: AssessmentResult): { month: number; title: string; description: string }[] {
  const weakCategories = getWeakestCategories(result.categoryScores);
  const level = result.level;

  if (level === 'beginner') {
    return [
      {
        month: 1,
        title: 'Foundation Building',
        description: `Focus on fundamentals across all areas. Start with ${weakCategories[0] || 'Art History'} basics. Study 2-3 hours daily with structured note-taking. Complete diagnostic quizzes to track progress.`,
      },
      {
        month: 2,
        title: 'Core Knowledge Development',
        description: `Deep dive into ${weakCategories.length > 1 ? weakCategories.slice(0, 2).join(' and ') : 'all exam topics'}. Begin practice question sets. Join study groups for accountability and discussion.`,
      },
      {
        month: 3,
        title: 'Intensive Practice',
        description: 'Daily practice tests covering all topics. Focus on time management. Weekly mock exams to simulate test conditions. Review and reinforce weak areas.',
      },
    ];
  } else if (level === 'intermediate') {
    return [
      {
        month: 1,
        title: 'Targeted Improvement',
        description: `Focus on strengthening ${weakCategories.length > 0 ? weakCategories.join(' and ') : 'weaker areas'}. Daily practice with progressively harder questions. Build speed and accuracy.`,
      },
      {
        month: 2,
        title: 'Advanced Practice',
        description: 'Work through complex problem sets. Practice time-pressured exercises. Deep dive into Italian architecture history and mathematical problem-solving techniques.',
      },
      {
        month: 3,
        title: 'Exam Simulation',
        description: 'Full-length practice tests twice weekly. Perfect your exam strategy. Final review of high-impact topics. Mental preparation and confidence building.',
      },
    ];
  } else {
    return [
      {
        month: 1,
        title: 'Strategy & Polish',
        description: `Refine your approach to ${weakCategories.length > 0 ? weakCategories.join(' and ') : 'challenging questions'}. Focus on speed optimization. Practice under strict time limits.`,
      },
      {
        month: 2,
        title: 'Advanced Topics',
        description: 'Master the most challenging question types. Study edge cases and unusual problem formats. Build mental stamina for exam day.',
      },
      {
        month: 3,
        title: 'Peak Performance',
        description: 'Maintain your strong foundation with regular practice. Focus on consistency and confidence. Light review of all topics. Rest well before exam day.',
      },
    ];
  }
}

export function Roadmap({ result }: RoadmapProps) {
  const roadmap = generateRoadmap(result);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">
        Your Personalized 3-Month Roadmap
      </h2>
      <p className="text-gray-600 mb-8">
        Based on your assessment results, here&apos;s your recommended study plan
      </p>

      <div className="space-y-6">
        {roadmap.map((item, index) => (
          <motion.div
            key={item.month}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.15 }}
            className="relative pl-8 pb-6 last:pb-0"
          >
            {/* Timeline line */}
            {index < roadmap.length - 1 && (
              <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gray-200" />
            )}

            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#F5B041] flex items-center justify-center text-[#1a1a2e] text-xs font-bold">
              {item.month}
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-[#1a1a2e] mb-2">
                Month {item.month}: {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommendation box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-8 bg-[#F5B041]/10 border border-[#F5B041]/30 rounded-xl p-6"
      >
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-[#F5B041] mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <div>
            <h4 className="font-semibold text-[#1a1a2e] mb-1">
              Recommended Course
            </h4>
            <p className="text-gray-600 text-sm">
              Based on your {result.level} level, we recommend the{' '}
              <span className="font-semibold text-[#1a1a2e]">
                {result.level === 'beginner' ? 'Full Course' : result.level === 'intermediate' ? 'Full Course or VIP' : 'Study Guide or Full Course'}
              </span>{' '}
              for optimal preparation.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
