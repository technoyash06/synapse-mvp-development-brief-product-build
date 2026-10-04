import { describe, expect, it } from 'vitest';
import { addLocalDays, localDateKey, localDayDifference } from './local-date';
describe('local date handling', () => {
  it('formats the player local calendar date without ISO UTC conversion', () => { expect(localDateKey(new Date(2026, 0, 5, 0, 15))).toBe('2026-01-05'); });
  it('moves across a local date boundary safely', () => { expect(localDateKey(addLocalDays(new Date(2026, 2, 1), -1))).toBe('2026-02-28'); expect(localDayDifference(new Date(2026, 0, 5), new Date(2026, 0, 7))).toBe(2); });
});
