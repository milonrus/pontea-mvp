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
    <section id="assessment" ref={ref} className="py-20 md:py-28 bg-[#01278b] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

      {/* Floating shapes */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 hidden md:block"
      >
        <div className="w-6 h-6 bg-[#c7b8e8] rounded-lg opacity-60" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-32 left-20 hidden md:block"
      >
        <div className="w-5 h-5 bg-[#b8d4e8] rounded-md opacity-60" />
      </motion.div>

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-6">
              Free Assessment
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to start your
              <br />
              <span className="text-[#b8d4e8]">architecture journey?</span>
            </h2>

            <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
              Take our free 5-minute assessment to discover your current level
              and receive a personalized study plan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Button
              onClick={onStartAssessment}
              size="lg"
              className="bg-white text-[#01278b] hover:bg-gray-100 shadow-lg"
            >
              Start Free Assessment
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#b8e8d4] flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              No credit card
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#b8e8d4] flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              5 minutes
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#b8e8d4] flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              Personalized
            </div>
          </motion.div>

          {/* Decorative avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex justify-center"
          >
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#b8d4e8] border-2 border-white/20" />
                <div className="w-6 h-6 rounded-full bg-[#c7b8e8] border-2 border-white/20" />
                <div className="w-6 h-6 rounded-full bg-[#e8c4c4] border-2 border-white/20" />
              </div>
              <span className="text-xs text-white/80">Join 90+ students</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
