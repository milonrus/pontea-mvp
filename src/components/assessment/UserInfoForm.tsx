'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../shared/Button';
import { UserInfo } from '@/types';

interface UserInfoFormProps {
  onSubmit: (info: UserInfo) => void;
}

const targetUniversities = [
  { value: 'polimi', label: 'Politecnico di Milano' },
  { value: 'polito', label: 'Politecnico di Torino' },
  { value: 'both', label: 'Both (PoliMi & PoliTo)' },
  { value: 'other', label: 'Other Italian University' },
  { value: 'not_sure', label: 'Not sure yet' },
];

export function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetUniversity, setTargetUniversity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, targetUniversity });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
          Before We Start
        </h2>
        <p className="text-gray-600">
          Tell us a bit about yourself so we can personalize your results
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F5B041] focus:border-transparent outline-none transition-all"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F5B041] focus:border-transparent outline-none transition-all"
            placeholder="Enter your email"
          />
          <p className="text-xs text-gray-500 mt-1">
            We&apos;ll send your results to this email
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target University *
          </label>
          <select
            required
            value={targetUniversity}
            onChange={(e) => setTargetUniversity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F5B041] focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="">Select your target university</option>
            {targetUniversities.map((uni) => (
              <option key={uni.value} value={uni.value}>
                {uni.label}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" fullWidth size="lg" disabled={!name || !email || !targetUniversity}>
          Start Questions
        </Button>
      </form>
    </motion.div>
  );
}
