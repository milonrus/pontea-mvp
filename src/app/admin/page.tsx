'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { addQuestion } from '@/lib/questionsService';
import { Category, Difficulty } from '@/types';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    category: 'math' as Category,
    difficulty: 'medium' as Difficulty,
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: 0
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.question || !formData.option1 || !formData.option2 || !formData.option3 || !formData.option4) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await addQuestion({
        category: formData.category,
        difficulty: formData.difficulty,
        question: formData.question,
        options: [formData.option1, formData.option2, formData.option3, formData.option4],
        correctAnswer: formData.correctAnswer
      });

      setSuccess(true);
      setFormData({
        category: 'math' as Category,
        difficulty: 'medium' as Difficulty,
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: 0
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save question');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You must be signed in to access the admin panel.</p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-[#01278b] text-white py-2 px-4 rounded-lg hover:bg-[#011d6b] transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">New Question</h1>
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-red-800 font-semibold">Something went wrong</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 font-semibold">Question added successfully!</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01278b] focus:border-transparent"
              >
                <option value="math">Math</option>
                <option value="logic">Logic</option>
                <option value="art_history">Art History</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Difficulty })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01278b] focus:border-transparent"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01278b] focus:border-transparent"
              placeholder="Enter your question..."
            />
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-sm font-medium text-gray-700">Answer Options</h3>

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={formData.correctAnswer === num - 1}
                  onChange={() => setFormData({ ...formData, correctAnswer: num - 1 })}
                  className="w-4 h-4 text-[#01278b] focus:ring-[#01278b]"
                />
                <input
                  type="text"
                  value={formData[`option${num}` as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [`option${num}`]: e.target.value })}
                  placeholder={`Option ${num}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01278b] focus:border-transparent"
                />
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-2">Select the radio button for the correct answer</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#01278b] text-white py-3 px-4 rounded-lg hover:bg-[#011d6b] transition-colors font-medium"
          >
            Add Question
          </button>
        </form>
      </main>
    </div>
  );
}
