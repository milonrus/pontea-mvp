'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../shared/Button';
import { PricingTier } from '@/types';

const tiers: PricingTier[] = [
  {
    id: 'study-guide',
    name: 'Study Guide',
    price: 690,
    monthlyPrice: 172.5,
    duration: '4 months',
    features: [
      { text: 'Theory summaries (250+ pages)', included: true },
      { text: '1000+ practice questions', included: true },
      { text: 'Practice exams', included: true },
      { text: 'Video lectures', included: false },
      { text: 'Live seminars', included: false },
      { text: 'Progress tracking', included: false },
      { text: 'Support chat', included: false },
    ],
    ctaText: 'Get Started',
  },
  {
    id: 'full-course',
    name: 'Full Course',
    price: 1190,
    monthlyPrice: 297.5,
    duration: '4 months',
    popular: true,
    features: [
      { text: 'Everything in Study Guide', included: true },
      { text: '40+ hours of video lectures', included: true },
      { text: 'Weekly live seminars', included: true },
      { text: 'Progress monitoring', included: true },
      { text: 'Group support chat', included: true },
      { text: 'Q&A sessions', included: true },
      { text: 'Mock exam reviews', included: true },
    ],
    ctaText: 'Join Now',
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 2750,
    monthlyPrice: 687.5,
    duration: '4 months',
    features: [
      { text: 'Everything in Full Course', included: true },
      { text: 'Personalized study program', included: true },
      { text: '1-on-1 lessons with teachers', included: true },
      { text: '3 consultations with founders', included: true },
      { text: 'Priority support', included: true },
      { text: 'Guaranteed feedback', included: true },
      { text: 'Application assistance', included: true },
    ],
    ctaText: 'Apply for VIP',
  },
];

interface PricingProps {
  onSelectTier: (tier: PricingTier) => void;
}

export function Pricing({ onSelectTier }: PricingProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pricing" ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            Choose Your Path
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Select the program that fits your needs and start your journey to Italy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-[#F5B041] text-[#1a1a2e] text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`h-full bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-2 ${
                  tier.popular
                    ? 'border-[#F5B041] scale-105'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#1a1a2e]">{tier.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#1a1a2e]">
                      €{tier.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-2">
                    {tier.duration} = €{tier.monthlyPrice.toFixed(2)}/month
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
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
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      <span
                        className={
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onSelectTier(tier)}
                  variant={tier.popular ? 'primary' : 'outline'}
                  fullWidth
                >
                  {tier.ctaText}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Installment plans available
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
