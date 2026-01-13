'use client';

import { useState } from 'react';
import { Modal } from './shared/Modal';
import { Button } from './shared/Button';
import { PricingTier } from '@/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: PricingTier | null;
}

type PaymentMethod = 'card' | 'bank' | 'installments';

export function PaymentModal({ isOpen, onClose, tier }: PaymentModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setName('');
    setEmail('');
    setPhone('');
    setPaymentMethod('card');
    onClose();
  };

  if (!tier) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={step === 'form' ? `Enroll in ${tier.name}` : 'Success!'}>
      {step === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#1a1a2e]">{tier.name}</span>
              <span className="text-2xl font-bold text-[#1a1a2e]">
                €{tier.price.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{tier.duration}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F5B041] focus:border-transparent outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F5B041] focus:border-transparent outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone (optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F5B041] focus:border-transparent outline-none transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#F5B041] bg-[#F5B041]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg
                  className={`w-6 h-6 mx-auto mb-2 ${
                    paymentMethod === 'card' ? 'text-[#F5B041]' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span
                  className={`text-sm ${
                    paymentMethod === 'card' ? 'text-[#1a1a2e]' : 'text-gray-500'
                  }`}
                >
                  Card
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'bank'
                    ? 'border-[#F5B041] bg-[#F5B041]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg
                  className={`w-6 h-6 mx-auto mb-2 ${
                    paymentMethod === 'bank' ? 'text-[#F5B041]' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
                <span
                  className={`text-sm ${
                    paymentMethod === 'bank' ? 'text-[#1a1a2e]' : 'text-gray-500'
                  }`}
                >
                  Bank
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('installments')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'installments'
                    ? 'border-[#F5B041] bg-[#F5B041]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg
                  className={`w-6 h-6 mx-auto mb-2 ${
                    paymentMethod === 'installments'
                      ? 'text-[#F5B041]'
                      : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-sm ${
                    paymentMethod === 'installments'
                      ? 'text-[#1a1a2e]'
                      : 'text-gray-500'
                  }`}
                >
                  Installments
                </span>
              </button>
            </div>
          </div>

          <Button type="submit" fullWidth size="lg">
            Complete Enrollment
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By enrolling, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-500"
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
          </div>
          <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">
            Thank You!
          </h3>
          <p className="text-gray-600 mb-6">
            Our team will contact you within 24 hours to complete your enrollment.
          </p>
          <Button onClick={handleClose} variant="outline">
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
}
