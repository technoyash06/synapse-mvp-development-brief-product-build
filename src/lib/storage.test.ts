import { describe, expect, it } from 'vitest';
import type { GameResult } from '../types';
import { getStreak, recordOfficialAttempt, type StorageLike } from './storage';
const memoryStorage = (): StorageLike => { const map = new Map<string, string>(); return { getItem: (key) => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) }; };
const result = (dateKey: string): GameResult => ({ id: dateKey, dateKey, challengeId: 'test', challengeNumber: 1, category: 'Focus', score: 8000, timeMs: 1000, accuracy: 100, percentile: 90, correct: 1, total: 1, isPractice: false, streak: 0, completedAt: 0 });
describe('official attempt and streak rules', () => {
  it('accepts only one official attempt per local day', () => { const store = memoryStorage(); const first = recordOfficialAttempt(result('2026-08-25'), store); const second = recordOfficialAttempt({ ...result('2026-08-25'), score: 9000 }, store); expect(first.saved).toBe(true); expect(second.saved).toBe(false); expect(second.result.score).toBe(8000); });
  it('counts consecutive local official dates for streaks', () => { const official = { '2026-08-23': result('2026-08-23'), '2026-08-24': result('2026-08-24'), '2026-08-25': result('2026-08-25') }; expect(getStreak(official, new Date(2026, 7, 25))).toBe(3); });
});
