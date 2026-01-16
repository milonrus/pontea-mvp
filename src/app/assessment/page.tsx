'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAssessment } from '@/hooks/useAssessment';
import { IntroScreen } from '@/components/assessment/IntroScreen';
import { UserInfoForm } from '@/components/assessment/UserInfoForm';
import { Question } from '@/components/assessment/Question';
import { ProgressBar } from '@/components/assessment/ProgressBar';

export default function AssessmentPage() {
  const router = useRouter();
  const {
    phase,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    result,
    startAssessment,
    setUserInfo,
    answerQuestion,
  } = useAssessment();

  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer for elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (phase === 'questions') {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase]);

  // Navigate to results when complete
  useEffect(() => {
    if (phase === 'complete' && result) {
      // Store result in sessionStorage for results page
      sessionStorage.setItem('assessmentResult', JSON.stringify(result));
      router.push('/results');
    }
  }, [phase, result, router]);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#01278b] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">PONTEA</span>
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-[#01278b] transition-colors text-sm font-medium"
            >
              Exit Assessment
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 sm:px-8 py-12">
        {phase === 'questions' && (
          <ProgressBar
            progress={progress}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            elapsedTime={elapsedTime}
          />
        )}

        <AnimatePresence mode="wait">
          {phase === 'intro' && <IntroScreen key="intro" onStart={startAssessment} />}

          {phase === 'userInfo' && (
            <UserInfoForm key="userInfo" onSubmit={setUserInfo} />
          )}

          {phase === 'questions' && currentQuestion && (
            <Question
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              onAnswer={answerQuestion}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
