// === Content System Type Definitions ===
// All schemas for the structured educational content system.

import type { QuizQuestion as RichQuizQuestion } from '../components/quiz/types';

export type Lang = 'en' | 'ur' | 'sd';

// Re-export the rich quiz question type so content files can use all 6 question types
export type ContentQuizQuestion = RichQuizQuestion;

// === Content Block Types ===

export interface DefinitionBlock {
  type: 'definition';
  term: string;
  definition: string;
  example?: string;
}

export interface FormulaBlock {
  type: 'formula';
  name: string;
  formula: string;
  variables?: { symbol: string; meaning: string }[];
  derivation?: string;
}

export interface ExampleBlock {
  type: 'example';
  title: string;
  problem: string;
  solution: string[];
  answer?: string;
}

export interface QuizBlock {
  type: 'quiz';
  questions: ContentQuizQuestion[];
}

export interface NumericalBlock {
  type: 'numerical';
  title: string;
  problem: string;
  given: { label: string; value: string; unit?: string }[];
  find: string;
  solution: string[];
  answer: string;
}

export interface ExerciseBlock {
  type: 'exercise';
  questions: { number: number; question: string; answer?: string }[];
}

export interface InteractiveBlock {
  type: 'interactive';
  component: string;
  props?: Record<string, unknown>;
}

// === Union of all block types ===

export type ContentBlock =
  | DefinitionBlock
  | FormulaBlock
  | ExampleBlock
  | QuizBlock
  | NumericalBlock
  | ExerciseBlock
  | InteractiveBlock;

// === Section & Chapter ===

export interface Section {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface ChapterContent {
  id: string;
  classId: string;
  title: string;
  subtitle: string;
  objectives?: string[];
  sections: Section[];
}

// === Registry Types ===

export interface ChapterMeta {
  id: string;
  classId: string;
  number: number;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
}

export type ChapterLoader = () => Promise<ChapterContent>;
export type ChapterRegistry = Record<string, Record<Lang, ChapterLoader>>;
