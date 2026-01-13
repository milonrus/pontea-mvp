import { Question, Category, Difficulty } from '@/types';

// Math Questions
const mathQuestions: Question[] = [
  // Easy
  {
    id: 'math-easy-1',
    category: 'math',
    difficulty: 'easy',
    question: 'If a rectangular room has dimensions 4m × 6m, what is its area?',
    options: ['10m²', '20m²', '24m²', '48m²'],
    correctAnswer: 2,
  },
  {
    id: 'math-easy-2',
    category: 'math',
    difficulty: 'easy',
    question: 'What is 15% of 200?',
    options: ['15', '30', '45', '60'],
    correctAnswer: 1,
  },
  {
    id: 'math-easy-3',
    category: 'math',
    difficulty: 'easy',
    question: 'A square has a perimeter of 32cm. What is the length of one side?',
    options: ['4cm', '8cm', '16cm', '32cm'],
    correctAnswer: 1,
  },
  // Medium
  {
    id: 'math-medium-1',
    category: 'math',
    difficulty: 'medium',
    question: 'A scale model of a building is 1:100. If the model is 15cm tall, how tall is the actual building?',
    options: ['1.5m', '15m', '150m', '1500m'],
    correctAnswer: 1,
  },
  {
    id: 'math-medium-2',
    category: 'math',
    difficulty: 'medium',
    question: 'If the ratio of width to height of a window is 3:5, and the width is 90cm, what is the height?',
    options: ['54cm', '120cm', '150cm', '180cm'],
    correctAnswer: 2,
  },
  {
    id: 'math-medium-3',
    category: 'math',
    difficulty: 'medium',
    question: 'A triangle has angles measuring 45° and 65°. What is the third angle?',
    options: ['60°', '70°', '80°', '90°'],
    correctAnswer: 1,
  },
  // Hard
  {
    id: 'math-hard-1',
    category: 'math',
    difficulty: 'hard',
    question: 'A circular column has radius 0.5m. What is its circumference? (Use π ≈ 3.14)',
    options: ['1.57m', '3.14m', '0.785m', '6.28m'],
    correctAnswer: 1,
  },
  {
    id: 'math-hard-2',
    category: 'math',
    difficulty: 'hard',
    question: 'A building\'s shadow is 45m long when a 2m pole casts a 3m shadow. How tall is the building?',
    options: ['22.5m', '30m', '67.5m', '90m'],
    correctAnswer: 1,
  },
  {
    id: 'math-hard-3',
    category: 'math',
    difficulty: 'hard',
    question: 'A rectangular room has a floor area of 48m² and a perimeter of 28m. What are its dimensions?',
    options: ['4m × 12m', '6m × 8m', '3m × 16m', '8m × 8m'],
    correctAnswer: 1,
  },
];

// Logic Questions
const logicQuestions: Question[] = [
  // Easy
  {
    id: 'logic-easy-1',
    category: 'logic',
    difficulty: 'easy',
    question: 'Complete the sequence: 2, 4, 8, 16, ___',
    options: ['20', '24', '32', '64'],
    correctAnswer: 2,
  },
  {
    id: 'logic-easy-2',
    category: 'logic',
    difficulty: 'easy',
    question: 'Which shape comes next: △ □ △ □ △ ___',
    options: ['△', '□', '○', '◇'],
    correctAnswer: 1,
  },
  {
    id: 'logic-easy-3',
    category: 'logic',
    difficulty: 'easy',
    question: 'If A > B and B > C, then:',
    options: ['C > A', 'A = C', 'A > C', 'Cannot determine'],
    correctAnswer: 2,
  },
  // Medium
  {
    id: 'logic-medium-1',
    category: 'logic',
    difficulty: 'medium',
    question: 'If all architects are designers, and some designers are artists, which must be true?',
    options: ['All architects are artists', 'Some architects may be artists', 'No architects are artists', 'All artists are architects'],
    correctAnswer: 1,
  },
  {
    id: 'logic-medium-2',
    category: 'logic',
    difficulty: 'medium',
    question: 'Complete the pattern: 1, 1, 2, 3, 5, 8, ___',
    options: ['10', '11', '13', '16'],
    correctAnswer: 2,
  },
  {
    id: 'logic-medium-3',
    category: 'logic',
    difficulty: 'medium',
    question: 'In a row of buildings, A is taller than B. C is shorter than B. D is taller than A. Which is shortest?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 2,
  },
  // Hard
  {
    id: 'logic-hard-1',
    category: 'logic',
    difficulty: 'hard',
    question: 'A cube is painted red on all sides and cut into 27 equal smaller cubes. How many small cubes have exactly 2 painted faces?',
    options: ['6', '8', '12', '18'],
    correctAnswer: 2,
  },
  {
    id: 'logic-hard-2',
    category: 'logic',
    difficulty: 'hard',
    question: 'If the day after tomorrow is Wednesday, what day was it the day before yesterday?',
    options: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    correctAnswer: 3,
  },
  {
    id: 'logic-hard-3',
    category: 'logic',
    difficulty: 'hard',
    question: 'A clock shows 3:15. What is the angle between the hour and minute hands?',
    options: ['0°', '7.5°', '15°', '22.5°'],
    correctAnswer: 1,
  },
];

// Art History Questions
const artHistoryQuestions: Question[] = [
  // Easy
  {
    id: 'art-easy-1',
    category: 'art_history',
    difficulty: 'easy',
    question: 'Who designed the Guggenheim Museum in Bilbao?',
    options: ['Frank Lloyd Wright', 'Frank Gehry', 'Zaha Hadid', 'Renzo Piano'],
    correctAnswer: 1,
  },
  {
    id: 'art-easy-2',
    category: 'art_history',
    difficulty: 'easy',
    question: 'The Colosseum is located in which city?',
    options: ['Athens', 'Rome', 'Paris', 'Barcelona'],
    correctAnswer: 1,
  },
  {
    id: 'art-easy-3',
    category: 'art_history',
    difficulty: 'easy',
    question: 'Who painted the ceiling of the Sistine Chapel?',
    options: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Donatello'],
    correctAnswer: 2,
  },
  // Medium
  {
    id: 'art-medium-1',
    category: 'art_history',
    difficulty: 'medium',
    question: 'The Bauhaus school was founded in which country?',
    options: ['France', 'Italy', 'Germany', 'United States'],
    correctAnswer: 2,
  },
  {
    id: 'art-medium-2',
    category: 'art_history',
    difficulty: 'medium',
    question: 'Which architect is famous for saying "Less is more"?',
    options: ['Le Corbusier', 'Ludwig Mies van der Rohe', 'Walter Gropius', 'Frank Lloyd Wright'],
    correctAnswer: 1,
  },
  {
    id: 'art-medium-3',
    category: 'art_history',
    difficulty: 'medium',
    question: 'The Duomo in Florence is famous for its dome designed by:',
    options: ['Michelangelo', 'Brunelleschi', 'Bramante', 'Bernini'],
    correctAnswer: 1,
  },
  // Hard
  {
    id: 'art-hard-1',
    category: 'art_history',
    difficulty: 'hard',
    question: 'Which architectural movement is characterized by exposed concrete, geometric forms, and a "truth to materials" philosophy?',
    options: ['Art Nouveau', 'Brutalism', 'Deconstructivism', 'Postmodernism'],
    correctAnswer: 1,
  },
  {
    id: 'art-hard-2',
    category: 'art_history',
    difficulty: 'hard',
    question: 'The Villa Savoye, a masterpiece of Modern architecture, was designed by:',
    options: ['Alvar Aalto', 'Le Corbusier', 'Oscar Niemeyer', 'Louis Kahn'],
    correctAnswer: 1,
  },
  {
    id: 'art-hard-3',
    category: 'art_history',
    difficulty: 'hard',
    question: 'Which Renaissance architect wrote "The Four Books of Architecture"?',
    options: ['Leon Battista Alberti', 'Andrea Palladio', 'Filippo Brunelleschi', 'Donato Bramante'],
    correctAnswer: 1,
  },
];

export const allQuestions: Question[] = [
  ...mathQuestions,
  ...logicQuestions,
  ...artHistoryQuestions,
];

export function getQuestionsByCategory(category: Category): Question[] {
  return allQuestions.filter(q => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: Difficulty): Question[] {
  return allQuestions.filter(q => q.difficulty === difficulty);
}

export function getQuestion(category: Category, difficulty: Difficulty): Question | undefined {
  const questions = allQuestions.filter(
    q => q.category === category && q.difficulty === difficulty
  );
  return questions[Math.floor(Math.random() * questions.length)];
}

// Generate a set of 12 questions (4 per category) with adaptive difficulty support
export function generateQuestionSet(): { category: Category; startDifficulty: Difficulty }[] {
  const categories: Category[] = ['math', 'logic', 'art_history'];
  const questionPlan: { category: Category; startDifficulty: Difficulty }[] = [];

  // 4 questions per category, all starting at medium
  categories.forEach(category => {
    for (let i = 0; i < 4; i++) {
      questionPlan.push({ category, startDifficulty: 'medium' });
    }
  });

  return questionPlan;
}
