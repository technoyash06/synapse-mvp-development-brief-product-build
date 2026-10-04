import type { QuestionAttempt } from '../types';
export interface ScoreInput { attempts: QuestionAttempt[]; totalTimeMs: number; difficulty: number; }
export function calculateAccuracy(attempts: QuestionAttempt[]): number { return attempts.length === 0 ? 0 : Math.round((attempts.filter((attempt) => attempt.correct).length / attempts.length) * 100); }
/** Correctness owns the score; speed can add at most ~16% to a perfect run. */
export function calculateScore({ attempts, totalTimeMs, difficulty }: ScoreInput): number { const accuracy = calculateAccuracy(attempts) / 100; const reactions = attempts.flatMap((attempt) => attempt.reactionTimeMs === undefined ? [] : [attempt.reactionTimeMs]); const timingMs = reactions.length ? reactions.reduce((a, b) => a + b, 0) / reactions.length : totalTimeMs / Math.max(1, attempts.length); const speedBonus = Math.max(0, Math.min(1100, 1100 - timingMs / 115)); return Math.round(accuracy * (6500 + speedBonus) * difficulty); }
export function formatTime(timeMs: number): string { const seconds = Math.max(0, Math.round(timeMs / 1000)); return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; }
