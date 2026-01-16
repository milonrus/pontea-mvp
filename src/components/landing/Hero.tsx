'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Button } from '../shared/Button';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

function AnimatedStat({ value, suffix, label, delay = 0 }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const stepValue = value / steps;
        let current = 0;
        const interval = setInterval(() => {
          current += stepValue;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(interval);
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, duration / steps);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-[#01278b]">
        {displayValue}{suffix}
      </div>
      <div className="text-xs md:text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

// Decorative star component
function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

interface HeroProps {
  onStartAssessment: () => void;
  onBookConsultation: () => void;
}

export function Hero({ onStartAssessment, onBookConsultation }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#ebe4f7] rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#e0f0fa] rounded-full blur-3xl opacity-60 translate-x-1/2" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#f7e8e8] rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              A new way to{' '}
              <span className="text-[#01278b]">prepare</span>
              <br />
              & get into Italy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-lg text-gray-600 max-w-lg"
            >
              Learn from expert tutors anytime, anywhere with resources designed
              specifically for ARCHED & TIL-A entrance exams
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button onClick={onStartAssessment} size="lg">
                join now
              </Button>
              <Button onClick={onBookConsultation} variant="outline" size="lg">
                learn more
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 flex items-center gap-6 md:gap-8"
            >
              <AnimatedStat value={90} suffix="+" label="students" delay={0} />
              <div className="w-px h-10 bg-gray-200" />
              <AnimatedStat value={40} suffix="+" label="hours of video" delay={100} />
              <div className="w-px h-10 bg-gray-200" />
              <AnimatedStat value={6} suffix="" label="expert teachers" delay={200} />
            </motion.div>
          </div>

          {/* Right side - Photo collage */}
          <div className="relative h-[500px] lg:h-[550px] hidden md:block">
            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-1/4 z-20"
            >
              <Star className="w-5 h-5 text-[#c7b8e8]" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-24 left-0 z-20"
            >
              <Star className="w-4 h-4 text-[#e8c4c4]" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/3 right-0 z-20"
            >
              <Star className="w-4 h-4 text-[#b8d4e8]" />
            </motion.div>

            {/* Main photo card - Blue background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-8 left-4 w-52 h-64 rounded-3xl bg-[#b8d4e8] overflow-hidden shadow-lg z-10"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/30 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="mt-3 text-white/80 text-sm">Student photo</p>
                </div>
              </div>

              {/* Floating arrow icon */}
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 w-12 h-12 bg-[#01278b] rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Second photo card - Lavender background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-4 right-4 w-44 h-56 rounded-3xl bg-[#c7b8e8] overflow-hidden shadow-lg z-10"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="mt-3 text-white/80 text-sm">Student photo</p>
                </div>
              </div>
            </motion.div>

            {/* Third photo card - Pink background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-8 left-16 w-56 h-48 rounded-3xl bg-[#e8c4c4] overflow-hidden shadow-lg z-10"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="mt-3 text-white/80 text-sm">Student photo</p>
                </div>
              </div>
            </motion.div>

            {/* Floating search icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute bottom-24 left-0 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center z-20"
            >
              <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>

            {/* Floating pill badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute bottom-4 right-0 bg-[#ebe4f7] rounded-full px-4 py-2 shadow-md z-20"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#01278b] border-2 border-white" />
                  <div className="w-6 h-6 rounded-full bg-[#c7b8e8] border-2 border-white" />
                  <div className="w-6 h-6 rounded-full bg-[#b8d4e8] border-2 border-white" />
                </div>
                <span className="text-xs font-medium text-gray-700">90+ students</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
