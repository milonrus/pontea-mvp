'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const teamMembers = [
  {
    id: '1',
    name: 'Diana Nigmatullina',
    role: 'Co-founder, PoliMi Graduate',
    image: 'DN',
    color: '#F5B041',
  },
  {
    id: '2',
    name: 'Renata Ramazanova',
    role: 'Co-founder, PoliMi Graduate',
    image: 'RR',
    color: '#3B82F6',
  },
  {
    id: '3',
    name: 'Diana Nakhodkina',
    role: 'Art History & Drawing Expert',
    image: 'DN',
    color: '#EC4899',
  },
  {
    id: '4',
    name: 'Egor Pravdin',
    role: 'Student Success Expert',
    image: 'EP',
    color: '#10B981',
  },
  {
    id: '5',
    name: 'Mikhail Chernyavsky',
    role: 'History Teacher',
    image: 'MC',
    color: '#8B5CF6',
  },
];

export function Team() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            Our Team
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from professionals who successfully passed these exams and now
            study or work in Italy
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-4">
                <div
                  className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: member.color }}
                >
                  {member.image}
                </div>
                <div
                  className="absolute inset-0 w-32 h-32 mx-auto rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: member.color }}
                />
              </div>
              <h3 className="font-semibold text-[#1a1a2e] text-lg">
                {member.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
