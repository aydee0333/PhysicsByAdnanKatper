export interface BaseQuestion {
  id: string;
  question: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
  correctIndex: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'trueFalse';
  correctAnswer: boolean;
}

export interface DragDropQuestion extends BaseQuestion {
  type: 'dragDrop';
  items: { id: string; label: string }[];
  categories: { id: string; label: string }[];
  correctMapping: Record<string, string>;
}

export interface MatchQuestion extends BaseQuestion {
  type: 'match';
  pairs: { left: string; right: string }[];
}

export interface NumericalQuestion extends BaseQuestion {
  type: 'numerical';
  correctAnswer: number;
  tolerance: number;
  unit?: string;
  hint?: string;
}

export interface ConceptTestQuestion extends BaseQuestion {
  type: 'conceptTest';
  scenario: string;
  subQuestions: (MCQQuestion | TrueFalseQuestion | NumericalQuestion)[];
}

export type QuizQuestion =
  | MCQQuestion
  | TrueFalseQuestion
  | DragDropQuestion
  | MatchQuestion
  | NumericalQuestion
  | ConceptTestQuestion;

export interface QuizConfig {
  unitId: string;
  quizKey: string;
  title?: string;
  questions: QuizQuestion[];
  showExplanations?: boolean;
  shuffleOptions?: boolean;
  onComplete?: (result: QuizResult) => void;
}

export interface QuestionResult {
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  answers: Record<string, QuestionResult>;
}
