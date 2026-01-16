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
    <section id="pricing" ref={ref} className="py-20 md:py-28 bg-[#f8f9fc] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#ebe4f7] rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e0f0fa] rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-[#e0f0fa] text-[#01278b] rounded-full text-sm font-medium mb-4"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Choose your{' '}
            <span className="text-[#01278b]">perfect plan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-gray-600"
          >
            Select the program that aligns with your goals and learning style
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${tier.popular ? 'md:-mt-4 md:mb-[-16px]' : ''}`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-2 bg-[#01278b] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`h-full rounded-2xl transition-all duration-300 ${
                  tier.popular
                    ? 'bg-white shadow-xl border-2 border-[#01278b]'
                    : 'bg-white shadow-soft hover:shadow-medium border border-gray-100'
                }`}
              >
                {/* Card header */}
                <div className={`p-6 ${tier.popular ? 'pt-10' : ''}`}>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    tier.id === 'study-guide' ? 'bg-[#e0f0fa] text-[#01278b]' :
                    tier.id === 'full-course' ? 'bg-[#ebe4f7] text-[#01278b]' :
                    'bg-[#f7e8e8] text-[#01278b]'
                  }`}>
                    {tier.duration}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {tier.name}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      €{tier.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    €{tier.monthlyPrice.toFixed(0)}/month over {tier.duration}
                  </p>
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-gray-100" />

                {/* Features */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full bg-[#b8e8d4] flex items-center justify-center">
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
                        ) : (
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18 12H6"
                              />
                            </svg>
                          </div>
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? 'text-gray-700' : 'text-gray-400'
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 pt-0">
                  <Button
                    onClick={() => onSelectTier(tier)}
                    variant={tier.popular ? 'primary' : 'outline'}
                    fullWidth
                  >
                    {tier.ctaText}
                  </Button>

                  <p className="mt-3 text-center text-xs text-gray-500">
                    Installment plans available
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-gray-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0f0fa] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#01278b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            Secure payment
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ebe4f7] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#01278b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            Instant access
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f7e8e8] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#01278b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            Flexible payments
          </div>
        </motion.div>
      </div>
    </section>
  );
}
