import type { Category, Challenge, CoreCategory, Puzzle } from '../types';
import { localDateKey, localDayDifference } from './local-date';
import { puzzleBank } from './puzzles';
export const LAUNCH_EPOCH = new Date(2026, 0, 5);
const weekdayCategories: Category[] = ['Weekly', 'Sequence', 'Memory', 'Logic', 'Speed', 'Focus', 'Mixed'];
const coreCategories: CoreCategory[] = ['Sequence', 'Memory', 'Logic', 'Speed', 'Focus'];
export function challengeNumber(date = new Date()): number { return Math.max(1, localDayDifference(LAUNCH_EPOCH, date) + 1); }
function seededIndex(seed: number, length: number, salt = 0): number { return Math.abs(Math.imul(seed + 37 + salt * 101, 2654435761)) % length; }
function selectPuzzle(category: CoreCategory, number: number, salt = 0): Puzzle { const pool = puzzleBank[category]; return pool[seededIndex(number, pool.length, salt)]; }
export function categoryForDate(date = new Date()): Category { return weekdayCategories[date.getDay()]; }
export function getDailyChallenge(date = new Date()): Challenge {
  const number = challengeNumber(date); const category = categoryForDate(date); const dateKey = localDateKey(date);
  if (category === 'Mixed' || category === 'Weekly') { const count = category === 'Weekly' ? 3 : 2; const selected = Array.from({ length: count }, (_, index) => selectPuzzle(coreCategories[seededIndex(number, coreCategories.length, index)], number, index)); return { id: `daily-${dateKey}`, dateKey, number, category, estimate: '1 min', difficulty: category === 'Weekly' ? 1.25 : 1.18, intro: category === 'Weekly' ? 'A three-part weekly check-in.' : 'A compact cross-training session.', questions: selected.flatMap((puzzle) => puzzle.questions) }; }
  const puzzle = selectPuzzle(category, number); return { id: `daily-${dateKey}`, dateKey, number, category, estimate: '1 min', difficulty: puzzle.difficulty, intro: puzzle.intro, questions: puzzle.questions };
}
export function getPracticeChallenge(date = new Date(), offset = 1): Challenge { const base = getDailyChallenge(date); const category = coreCategories[seededIndex(base.number, coreCategories.length, offset)]; const puzzle = selectPuzzle(category, base.number, offset + 9); return { ...base, id: `practice-${base.dateKey}-${offset}`, category, difficulty: puzzle.difficulty, intro: puzzle.intro, questions: puzzle.questions }; }
