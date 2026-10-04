import { describe, expect, it } from 'vitest';
import { challengeNumber, getDailyChallenge } from './challenges';
import { puzzleBank } from './puzzles';
describe('daily challenge selection', () => {
  it('uses a continuous number from the fixed launch epoch', () => { expect(challengeNumber(new Date(2026, 0, 5))).toBe(1); expect(challengeNumber(new Date(2026, 0, 14))).toBe(10); });
  it('selects the same puzzle for the same local date', () => { const date = new Date(2026, 7, 25); expect(getDailyChallenge(date)).toEqual(getDailyChallenge(date)); });
  it('ships at least five data-driven puzzles per core category', () => { expect(Object.values(puzzleBank).every((puzzles) => puzzles.length >= 5)).toBe(true); });
});
