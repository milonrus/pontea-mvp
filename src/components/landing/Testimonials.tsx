'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    id: '1',
    name: 'Renata',
    university: 'PoliMi Student',
    quote:
      'The courses were incredibly well-organized with an interactive platform, engaging lectures, and tons of practice questions from past entrance tests. Beyond the materials, the courses helped with motivation because they were genuinely interesting. Preparing is so much easier when you\'re not alone.',
    color: '#F5B041',
  },
  {
    id: '2',
    name: 'Darya',
    university: 'PoliMi Graduate',
    quote:
      'Thank you so much! I was preparing before the course but it was very hard because of Italian. The webinars and notes are super structured and even with my terrible history knowledge, I was able to understand and learn so much!',
    color: '#3B82F6',
  },
  {
    id: '3',
    name: 'Milana',
    university: 'PoliMi Student',
    quote:
      'The most useful thing is immediately immersing yourself in the language and atmosphere without needing time to acclimatize. The consistent preparation actions throughout the course, rather than cramming everything in one month, made all the difference.',
    color: '#10B981',
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Students
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Hear from students who achieved their dream of studying architecture in Italy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonial.university}
                    </p>
                  </div>
                </div>

                <svg
                  className="w-8 h-8 text-[#F5B041] mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-gray-300 leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
