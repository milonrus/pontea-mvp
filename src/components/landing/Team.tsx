'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const teamMembers = [
  {
    id: '1',
    name: 'Diana Nigmatullina',
    role: 'Co-founder',
    credential: 'PoliMi Graduate',
    initials: 'DN',
    color: '#b8d4e8',
  },
  {
    id: '2',
    name: 'Renata Ramazanova',
    role: 'Co-founder',
    credential: 'PoliMi Graduate',
    initials: 'RR',
    color: '#c7b8e8',
  },
  {
    id: '3',
    name: 'Diana Nakhodkina',
    role: 'Art History & Drawing',
    credential: 'Expert Instructor',
    initials: 'DN',
    color: '#e8c4c4',
  },
  {
    id: '4',
    name: 'Egor Pravdin',
    role: 'Student Success',
    credential: 'Expert Advisor',
    initials: 'EP',
    color: '#b8e8d4',
  },
  {
    id: '5',
    name: 'Mikhail Chernyavsky',
    role: 'History',
    credential: 'Expert Teacher',
    initials: 'MC',
    color: '#f0e6b8',
  },
];

export function Team() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" ref={ref} className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ebe4f7] rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#e0f0fa] rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-[#ebe4f7] text-[#01278b] rounded-full text-sm font-medium mb-4"
          >
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Learn from{' '}
            <span className="text-[#01278b]">the best</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-gray-600"
          >
            Our team of graduates and professionals who have successfully navigated the Italian architecture education system
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-5 text-center shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 card-hover">
                {/* Avatar placeholder */}
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-4 relative overflow-hidden"
                  style={{ backgroundColor: member.color }}
                >
                  <span className="relative text-gray-700">{member.initials}</span>
                </div>

                {/* Info */}
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {member.name}
                </h3>
                <p className="text-[#01278b] text-xs font-medium mt-1">{member.role}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {member.credential}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-500 text-sm">
            Want to join our team?{' '}
            <a href="mailto:pontea.school@gmail.com" className="text-[#01278b] hover:underline font-medium">
              Get in touch
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
