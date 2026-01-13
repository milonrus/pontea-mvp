// Question types for assessment
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'math' | 'logic' | 'art_history';

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface UserInfo {
  name: string;
  email: string;
  targetUniversity: string;
}

export interface AssessmentState {
  currentQuestionIndex: number;
  answers: number[];
  correctAnswers: boolean[];
  startTime: number;
  endTime?: number;
}

export interface CategoryScore {
  category: Category;
  correct: number;
  total: number;
  percentage: number;
}

export interface AssessmentResult {
  userInfo: UserInfo;
  totalScore: number;
  totalQuestions: number;
  percentage: number;
  level: 'beginner' | 'intermediate' | 'ready';
  categoryScores: CategoryScore[];
  timeTaken: number; // in seconds
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  duration: string;
  features: { text: string; included: boolean }[];
  popular?: boolean;
  ctaText: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  university: string;
  quote: string;
  imageUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
