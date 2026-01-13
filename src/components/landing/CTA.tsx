'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../shared/Button';

interface CTAProps {
  onStartAssessment: () => void;
}

export function CTA({ onStartAssessment }: CTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="assessment" ref={ref} className="py-24 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F5B041]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-[#F5B041]/10 border border-[#F5B041]/30 rounded-full text-[#F5B041] text-sm font-medium mb-6">
            Free Assessment
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Ready to Start Your{' '}
            <span className="text-[#F5B041]">Architecture Journey?</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Take our free 5-minute assessment to discover your level and get a
            personalized study plan
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <Button onClick={onStartAssessment} size="lg">
              Start Free Assessment
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-center space-x-8 text-gray-400 text-sm"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-400"
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
              No credit card required
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-400"
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
              5 minutes only
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-400"
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
              Personalized results
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
