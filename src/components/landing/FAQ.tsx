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
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border-b border-gray-100 last:border-b-0"
    >
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <span className="flex items-center gap-3">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
            isOpen ? 'bg-[#01278b] text-white' : 'bg-[#e0f0fa] text-[#01278b] group-hover:bg-[#ebe4f7]'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`font-medium text-sm transition-colors ${
            isOpen ? 'text-[#01278b]' : 'text-gray-900 group-hover:text-[#01278b]'
          }`}>
            {question}
          </span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-4"
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-[#01278b]' : 'bg-gray-100 group-hover:bg-[#ebe4f7]'
          }`}>
            <svg
              className={`w-3.5 h-3.5 transition-colors ${isOpen ? 'text-white' : 'text-gray-500'}`}
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
          </div>
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
            <div className="pb-4 pl-10">
              <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
            </div>
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
    <section id="faq" ref={ref} className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#ebe4f7] rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#e0f0fa] rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-2 bg-[#e0f0fa] text-[#01278b] rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Got{' '}
            <span className="text-[#01278b]">questions?</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            Everything you need to know about our program
          </p>
        </motion.div>

        {/* FAQ Items */}
        {isInView && (
          <div className="bg-[#f8f9fc] rounded-2xl p-5 md:p-6 shadow-soft">
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

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Still have questions?{' '}
            <a href="mailto:pontea.school@gmail.com" className="text-[#01278b] hover:underline font-medium">
              Send us an email
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
