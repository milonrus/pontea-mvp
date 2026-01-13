'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AssessmentResult } from '@/types';
import { ScoreCard } from '@/components/results/ScoreCard';
import { CategoryBreakdown } from '@/components/results/CategoryBreakdown';
import { Roadmap } from '@/components/results/Roadmap';
import { Button } from '@/components/shared/Button';
import { ConsultationModal } from '@/components/ConsultationModal';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  useEffect(() => {
    // Get result from sessionStorage
    const storedResult = sessionStorage.getItem('assessmentResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      // No result, redirect to assessment
      router.push('/assessment');
    }
  }, [router]);

  const handleDownloadPlan = () => {
    alert('Coming soon! Your personalized study plan will be available for download shortly.');
  };

  const scrollToPricing = () => {
    router.push('/#pricing');
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#F5B041] rounded-lg flex items-center justify-center">
                <span className="text-[#1a1a2e] font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-[#1a1a2e]">PONTEA</span>
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-[#1a1a2e] transition-colors text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Score Card */}
          <div className="lg:col-span-1">
            <ScoreCard result={result} />
          </div>

          {/* Right column - Breakdown and Roadmap */}
          <div className="lg:col-span-2 space-y-8">
            <CategoryBreakdown scores={result.categoryScores} />
            <Roadmap result={result} />
          </div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">
              Ready to Start Your Preparation?
            </h2>
            <p className="text-gray-600">
              Take the next step towards your architecture career in Italy
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => setIsConsultationModalOpen(true)} size="lg">
              Book Free Consultation
            </Button>
            <Button onClick={scrollToPricing} variant="outline" size="lg">
              View Course Options
            </Button>
            <Button onClick={handleDownloadPlan} variant="ghost" size="lg">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Study Plan
            </Button>
          </div>
        </motion.div>

        {/* Retake assessment link */}
        <div className="text-center mt-8">
          <Link
            href="/assessment"
            className="text-gray-500 hover:text-[#1a1a2e] transition-colors text-sm underline"
          >
            Retake Assessment
          </Link>
        </div>
      </main>

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </div>
  );
}
