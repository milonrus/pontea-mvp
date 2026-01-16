'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const universities = [
  { name: 'Politecnico di Milano', shortName: 'PoliMi', location: 'Milan', color: '#b8d4e8' },
  { name: 'Politecnico di Torino', shortName: 'PoliTo', location: 'Turin', color: '#c7b8e8' },
  { name: 'Università di Bologna', shortName: 'UniBo', location: 'Bologna', color: '#e8c4c4' },
  { name: 'Sapienza Università di Roma', shortName: 'Sapienza', location: 'Rome', color: '#b8e8d4' },
  { name: 'IUAV Venezia', shortName: 'IUAV', location: 'Venice', color: '#f0e6b8' },
  { name: 'Università di Padova', shortName: 'UniPD', location: 'Padua', color: '#e0f0fa' },
];

export function Universities() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="universities" ref={ref} className="py-20 md:py-28 bg-white relative overflow-hidden">
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
            className="inline-block px-4 py-2 bg-[#e0f0fa] text-[#01278b] rounded-full text-sm font-medium mb-4"
          >
            Destinations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Top universities{' '}
            <span className="text-[#01278b]">waiting for you</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-gray-600"
          >
            Our program prepares you for admission to Italy&apos;s most prestigious architecture schools
          </motion.p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {universities.map((uni, index) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-4 h-full text-center shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 card-hover">
                {/* Logo placeholder */}
                <div
                  className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-gray-700 font-bold text-sm mb-3"
                  style={{ backgroundColor: uni.color }}
                >
                  {uni.shortName.slice(0, 2)}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {uni.shortName}
                </h3>
                <p className="text-gray-500 text-xs mt-1">{uni.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center text-gray-500 text-sm"
        >
          And many more Italian universities offering architecture programs
        </motion.p>
      </div>
    </section>
  );
}
