'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const universities = [
  {
    name: 'Politecnico di Milano',
    shortName: 'PoliMi',
    location: 'Milan',
    color: '#0d6efd',
  },
  {
    name: 'Politecnico di Torino',
    shortName: 'PoliTo',
    location: 'Turin',
    color: '#004B93',
  },
  {
    name: 'Università di Bologna',
    shortName: 'UniBo',
    location: 'Bologna',
    color: '#A1232B',
  },
  {
    name: 'Sapienza Università di Roma',
    shortName: 'Sapienza',
    location: 'Rome',
    color: '#8B0000',
  },
  {
    name: 'IUAV Venezia',
    shortName: 'IUAV',
    location: 'Venice',
    color: '#FF6B00',
  },
  {
    name: 'Università di Padova',
    shortName: 'UniPD',
    location: 'Padua',
    color: '#8B0000',
  },
];

export function Universities() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="universities" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            Universities Waiting for You
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our program prepares you for admission to Italy&apos;s most prestigious architecture schools
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {universities.map((uni, index) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white font-bold text-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: uni.color }}
                >
                  {uni.shortName.slice(0, 2)}
                </div>
                <h3 className="font-semibold text-[#1a1a2e] text-sm">
                  {uni.shortName}
                </h3>
                <p className="text-gray-500 text-xs mt-1">{uni.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            And many more Italian universities offering architecture programs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
