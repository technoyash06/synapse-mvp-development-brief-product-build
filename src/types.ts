export type CoreCategory = 'Sequence' | 'Memory' | 'Logic' | 'Speed' | 'Focus';
export type Category = CoreCategory | 'Mixed' | 'Weekly';
export type QuestionKind = 'choice' | 'memory' | 'speed';

export interface Question {
  id: string;
  kind: QuestionKind;
  prompt: string;
  options?: string[];
  correctIndex?: number;
  memorise?: string;
  revealMs?: number;
  signalLabel?: string;
}

export interface Puzzle {
  id: string;
  category: CoreCategory;
  difficulty: number;
  intro: string;
  questions: Question[];
}

export interface Challenge {
  id: string;
  dateKey: string;
  number: number;
  category: Category;
  estimate: string;
  difficulty: number;
  intro: string;
  questions: Question[];
}

export interface QuestionAttempt {
  correct: boolean;
  reactionTimeMs?: number;
}

export interface GameResult {
  id: string;
  dateKey: string;
  challengeId: string;
  challengeNumber: number;
  category: Category;
  score: number;
  timeMs: number;
  accuracy: number;
  percentile: number;
  correct: number;
  total: number;
  isPractice: boolean;
  streak: number;
  completedAt: number;
}
