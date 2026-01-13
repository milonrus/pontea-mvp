'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const faqItems = [
  {
    id: '1',
    question: 'What language is the course taught in?',
    answer:
      'The course is taught in English with Russian support available. All exam materials are in English to match the actual ARCHED and TIL-A exams.',
  },
  {
    id: '2',
    question: 'Do you help with document preparation?',
    answer:
      'Yes! We guide you through the entire application process including visa documents, university registration, and scholarship applications.',
  },
  {
    id: '3',
    question: 'Is there support during the course?',
    answer:
      'Absolutely! You get access to group chats, can ask questions to curators anytime, and join regular live Q&A sessions.',
  },
  {
    id: '4',
    question: 'How long is the course?',
    answer:
      'Our standard course runs for 4 months, timed to prepare you perfectly for the July exam session.',
  },
  {
    id: '5',
    question: 'What topics are covered in the ARCHED exam?',
    answer:
      'The ARCHED exam covers Mathematics, Logic, Art History, and General Culture. Our course provides comprehensive preparation for all these sections with focused practice materials.',
  },
  {
    id: '6',
    question: 'Can I start the course at any time?',
    answer:
      'We have specific course start dates aligned with exam schedules. Contact us to learn about the next available session and reserve your spot.',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-[#1a1a2e] group-hover:text-[#F5B041] transition-colors pr-8">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <svg
            className={`w-6 h-6 ${isOpen ? 'text-[#F5B041]' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" ref={ref} className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about our program
          </p>
        </motion.div>

        {isInView && (
          <div className="bg-gray-50 rounded-2xl p-8">
            {faqItems.map((item, index) => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openId === item.id}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
