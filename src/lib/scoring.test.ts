import { describe, expect, it } from 'vitest';
import { calculateScore } from './scoring';
describe('scoring', () => {
  it('weights correctness above speed', () => { const slowCorrect = calculateScore({ attempts: [{ correct: true }], totalTimeMs: 100_000, difficulty: 1 }); const instantIncorrect = calculateScore({ attempts: [{ correct: false }], totalTimeMs: 1, difficulty: 1 }); expect(slowCorrect).toBeGreaterThan(instantIncorrect); });
  it('uses reaction timing for speed challenges instead of screen wait time', () => { const fastReaction = calculateScore({ attempts: [{ correct: true, reactionTimeMs: 180 }], totalTimeMs: 30_000, difficulty: 1 }); const slowReaction = calculateScore({ attempts: [{ correct: true, reactionTimeMs: 1_000 }], totalTimeMs: 1_000, difficulty: 1 }); expect(fastReaction).toBeGreaterThan(slowReaction); expect(fastReaction).toBeGreaterThan(6_500); });
});
