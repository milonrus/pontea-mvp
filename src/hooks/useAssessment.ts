'use client';

import { useState, useCallback, useMemo } from 'react';
import { Question, Category, Difficulty, UserInfo, AssessmentResult, CategoryScore } from '@/types';
import { allQuestions } from '@/data/questions';

interface AssessmentState {
  phase: 'intro' | 'userInfo' | 'questions' | 'complete';
  userInfo: UserInfo | null;
  currentQuestionIndex: number;
  selectedQuestions: Question[];
  answers: (number | null)[];
  startTime: number | null;
}

const QUESTIONS_PER_CATEGORY = 4;
const categories: Category[] = ['math', 'logic', 'art_history'];

// Get next difficulty based on current performance
function getNextDifficulty(currentDifficulty: Difficulty, wasCorrect: boolean): Difficulty {
  if (wasCorrect) {
    if (currentDifficulty === 'easy') return 'medium';
    if (currentDifficulty === 'medium') return 'hard';
    return 'hard';
  } else {
    if (currentDifficulty === 'hard') return 'medium';
    if (currentDifficulty === 'medium') return 'easy';
    return 'easy';
  }
}

// Select initial questions with medium difficulty
function selectInitialQuestions(): Question[] {
  const selected: Question[] = [];
  const usedIds = new Set<string>();

  categories.forEach(category => {
    const categoryQuestions = allQuestions.filter(q => q.category === category);

    // Start with medium questions
    let mediumQuestions = categoryQuestions.filter(q => q.difficulty === 'medium');

    for (let i = 0; i < QUESTIONS_PER_CATEGORY; i++) {
      // Try to get a medium question first
      let pool = mediumQuestions.filter(q => !usedIds.has(q.id));

      // If no medium available, use any from category
      if (pool.length === 0) {
        pool = categoryQuestions.filter(q => !usedIds.has(q.id));
      }

      if (pool.length > 0) {
        const question = pool[Math.floor(Math.random() * pool.length)];
        selected.push(question);
        usedIds.add(question.id);
      }
    }
  });

  // Shuffle the questions so categories are mixed
  return shuffleArray(selected);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Adapt a question based on previous performance in same category
function adaptQuestion(
  category: Category,
  currentDifficulty: Difficulty,
  wasCorrect: boolean,
  usedIds: Set<string>
): Question | null {
  const newDifficulty = getNextDifficulty(currentDifficulty, wasCorrect);

  // First try to find a question with the new difficulty
  let candidates = allQuestions.filter(
    q => q.category === category && q.difficulty === newDifficulty && !usedIds.has(q.id)
  );

  // If none available, try any difficulty in that category
  if (candidates.length === 0) {
    candidates = allQuestions.filter(
      q => q.category === category && !usedIds.has(q.id)
    );
  }

  if (candidates.length === 0) return null;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function useAssessment() {
  const [state, setState] = useState<AssessmentState>({
    phase: 'intro',
    userInfo: null,
    currentQuestionIndex: 0,
    selectedQuestions: [],
    answers: [],
    startTime: null,
  });

  const startAssessment = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'userInfo' }));
  }, []);

  const setUserInfo = useCallback((info: UserInfo) => {
    const questions = selectInitialQuestions();
    setState(prev => ({
      ...prev,
      phase: 'questions',
      userInfo: info,
      selectedQuestions: questions,
      answers: new Array(questions.length).fill(null),
      startTime: Date.now(),
    }));
  }, []);

  const answerQuestion = useCallback((answerIndex: number) => {
    setState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = answerIndex;

      const currentQuestion = prev.selectedQuestions[prev.currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctAnswer;

      // Check if we should adapt future questions
      let newQuestions = [...prev.selectedQuestions];
      const usedIds = new Set(prev.selectedQuestions.map(q => q.id));

      // Find next question of same category and potentially adapt it
      const currentCategory = currentQuestion.category;
      for (let i = prev.currentQuestionIndex + 1; i < newQuestions.length; i++) {
        if (newQuestions[i].category === currentCategory) {
          const adaptedQuestion = adaptQuestion(
            currentCategory,
            currentQuestion.difficulty,
            isCorrect,
            usedIds
          );
          if (adaptedQuestion) {
            newQuestions[i] = adaptedQuestion;
            usedIds.add(adaptedQuestion.id);
          }
          break; // Only adapt the next question of same category
        }
      }

      const isLastQuestion = prev.currentQuestionIndex === prev.selectedQuestions.length - 1;

      return {
        ...prev,
        answers: newAnswers,
        selectedQuestions: newQuestions,
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        phase: isLastQuestion ? 'complete' : 'questions',
      };
    });
  }, []);

  const currentQuestion = useMemo(() => {
    if (state.phase !== 'questions' || state.selectedQuestions.length === 0) return null;
    return state.selectedQuestions[state.currentQuestionIndex];
  }, [state.phase, state.selectedQuestions, state.currentQuestionIndex]);

  const progress = useMemo(() => {
    if (state.selectedQuestions.length === 0) return 0;
    return ((state.currentQuestionIndex + 1) / state.selectedQuestions.length) * 100;
  }, [state.currentQuestionIndex, state.selectedQuestions.length]);

  const result = useMemo((): AssessmentResult | null => {
    if (state.phase !== 'complete' || !state.userInfo) return null;

    const endTime = Date.now();
    const timeTaken = state.startTime ? Math.round((endTime - state.startTime) / 1000) : 0;

    // Calculate scores
    let totalCorrect = 0;
    const categoryCorrect: Record<Category, number> = {
      math: 0,
      logic: 0,
      art_history: 0,
    };
    const categoryTotal: Record<Category, number> = {
      math: 0,
      logic: 0,
      art_history: 0,
    };

    state.selectedQuestions.forEach((question, index) => {
      const answer = state.answers[index];
      categoryTotal[question.category]++;

      if (answer === question.correctAnswer) {
        totalCorrect++;
        categoryCorrect[question.category]++;
      }
    });

    const totalQuestions = state.selectedQuestions.length;
    const percentage = Math.round((totalCorrect / totalQuestions) * 100);

    // Determine level
    let level: 'beginner' | 'intermediate' | 'ready';
    if (totalCorrect <= 4) {
      level = 'beginner';
    } else if (totalCorrect <= 8) {
      level = 'intermediate';
    } else {
      level = 'ready';
    }

    const categoryScores: CategoryScore[] = categories.map(category => ({
      category,
      correct: categoryCorrect[category],
      total: categoryTotal[category],
      percentage: categoryTotal[category] > 0
        ? Math.round((categoryCorrect[category] / categoryTotal[category]) * 100)
        : 0,
    }));

    return {
      userInfo: state.userInfo,
      totalScore: totalCorrect,
      totalQuestions,
      percentage,
      level,
      categoryScores,
      timeTaken,
    };
  }, [state]);

  const resetAssessment = useCallback(() => {
    setState({
      phase: 'intro',
      userInfo: null,
      currentQuestionIndex: 0,
      selectedQuestions: [],
      answers: [],
      startTime: null,
    });
  }, []);

  return {
    phase: state.phase,
    userInfo: state.userInfo,
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    totalQuestions: state.selectedQuestions.length,
    progress,
    result,
    startAssessment,
    setUserInfo,
    answerQuestion,
    resetAssessment,
  };
}
