'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    id: '1',
    name: 'Renata',
    university: 'PoliMi Student',
    year: '2024',
    quote:
      'The courses were incredibly well-organized with an interactive platform, engaging lectures, and tons of practice questions from past entrance tests.',
    highlight: 'Preparing is so much easier when you\'re not alone.',
    color: '#b8d4e8',
  },
  {
    id: '2',
    name: 'Darya',
    university: 'PoliMi Graduate',
    year: '2023',
    quote:
      'The webinars and notes are super structured and even with my terrible history knowledge, I was able to understand and learn so much!',
    highlight: 'Thank you so much for making this possible.',
    color: '#c7b8e8',
  },
  {
    id: '3',
    name: 'Milana',
    university: 'PoliMi Student',
    year: '2024',
    quote:
      'The consistent preparation actions throughout the course, rather than cramming everything in one month, made all the difference.',
    highlight: 'A structured approach beats last-minute cramming.',
    color: '#e8c4c4',
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#f8f9fc] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-[#ebe4f7] rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#e0f0fa] rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-[#f7e8e8] text-[#01278b] rounded-full text-sm font-medium mb-4"
          >
            Success Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            What our{' '}
            <span className="text-[#01278b]">students say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-gray-600"
          >
            Hear from students who turned their dream of studying architecture in Italy into reality
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="relative bg-white rounded-2xl p-6 h-full shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
                {/* Quote icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: testimonial.color }}
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Quote */}
                <blockquote className="mb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="mt-3 font-semibold text-[#01278b] text-sm">
                    {testimonial.highlight}
                  </p>
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gray-100 my-4" />

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-gray-700 text-sm"
                      style={{ backgroundColor: testimonial.color }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {testimonial.university}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    {testimonial.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-6 md:gap-8 px-6 py-4 bg-white rounded-full shadow-soft border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#01278b]">90+</div>
              <div className="text-xs text-gray-500">Students</div>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#01278b]">5</div>
              <div className="text-xs text-gray-500">Years</div>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#01278b]">100%</div>
              <div className="text-xs text-gray-500">Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
