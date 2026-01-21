import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Question, Category, Difficulty } from '@/types';

const QUESTIONS_COLLECTION = 'questions';

// Add a new question to Firestore
export async function addQuestion(question: Omit<Question, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), {
      ...question,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding question:', error);
    throw new Error('Error saving question: Missing or insufficient permissions.. Check your permissions.');
  }
}

// Get all questions from Firestore
export async function getAllQuestions(): Promise<Question[]> {
  try {
    const querySnapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));
    const questions: Question[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      questions.push({
        id: doc.id,
        category: data.category,
        difficulty: data.difficulty,
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer
      });
    });

    return questions;
  } catch (error) {
    console.error('Error getting questions:', error);
    throw error;
  }
}

// Get questions by category
export async function getQuestionsByCategory(category: Category): Promise<Question[]> {
  try {
    const q = query(
      collection(db, QUESTIONS_COLLECTION),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    const questions: Question[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      questions.push({
        id: doc.id,
        category: data.category,
        difficulty: data.difficulty,
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer
      });
    });

    return questions;
  } catch (error) {
    console.error('Error getting questions by category:', error);
    throw error;
  }
}

// Get questions by difficulty
export async function getQuestionsByDifficulty(difficulty: Difficulty): Promise<Question[]> {
  try {
    const q = query(
      collection(db, QUESTIONS_COLLECTION),
      where('difficulty', '==', difficulty)
    );
    const querySnapshot = await getDocs(q);
    const questions: Question[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      questions.push({
        id: doc.id,
        category: data.category,
        difficulty: data.difficulty,
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer
      });
    });

    return questions;
  } catch (error) {
    console.error('Error getting questions by difficulty:', error);
    throw error;
  }
}

// Update a question
export async function updateQuestion(id: string, question: Partial<Question>): Promise<void> {
  try {
    const questionRef = doc(db, QUESTIONS_COLLECTION, id);
    await updateDoc(questionRef, {
      ...question,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
}

// Delete a question
export async function deleteQuestion(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, QUESTIONS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
}
