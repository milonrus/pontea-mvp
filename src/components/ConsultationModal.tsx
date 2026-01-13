'use client';

import { useState } from 'react';
import { Modal } from './shared/Modal';
import { Button } from './shared/Button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 'form' ? 'Book a Free Consultation' : 'Request Sent!'}
    >
      {step === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-gray-600 mb-6">
            Schedule a free 30-minute consultation with our team to discuss your
            goals and how we can help you succeed.
          </p>

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
              Tell us about your goals (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F5B041] focus:border-transparent outline-none transition-all resize-none"
              placeholder="What university are you targeting? When do you plan to take the exam?"
            />
          </div>

          <Button type="submit" fullWidth size="lg">
            Request Consultation
          </Button>
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
          <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your request. Our team will contact you within 24
            hours to schedule your free consultation.
          </p>
          <Button onClick={handleClose} variant="outline">
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
}
