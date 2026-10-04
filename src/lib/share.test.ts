import { describe, expect, it } from 'vitest';
import type { Challenge, GameResult } from '../types';
import { parsePublicResult, createPublicResultUrl } from './public-result';
import { createShareResultPayload, linkedInPostText, linkedInShareUrl } from './share';
const challenge: Challenge = { id: 'daily-2026-08-25', dateKey: '2026-08-25', number: 237, category: 'Focus', estimate: '1 min', difficulty: 1.1, intro: 'Spot it.', questions: [] };
const result: GameResult = { id: 'local-only', dateKey: '2026-08-25', challengeId: challenge.id, challengeNumber: 237, category: 'Focus', score: 8720, timeMs: 32000, accuracy: 100, percentile: 92, correct: 1, total: 1, isPractice: false, streak: 7, completedAt: 0 };
describe('public result sharing', () => {
  it('generates a complete share payload and public URL without local result IDs', () => { const payload = createShareResultPayload(challenge, result); const postText = linkedInPostText(challenge, result); expect(payload.text).toContain('🧠 SYNAPSE #237'); expect(payload.text).toContain('Score: 8,720'); expect(payload.publicResultUrl).toContain('challenge=237'); expect(payload.publicResultUrl).not.toContain('local-only'); expect(postText).not.toContain(payload.publicResultUrl); expect(postText).toContain('Can you beat me?'); expect(linkedInShareUrl(payload)).toContain(encodeURIComponent(payload.publicResultUrl)); });
  it('parses a valid public result and rejects tampered values', () => { expect(parsePublicResult(new URLSearchParams('challenge=237&score=8720&percent=8&time=32000&streak=7'))).toEqual({ challenge: 237, score: 8720, percent: 8, time: 32000, streak: 7 }); expect(parsePublicResult(new URLSearchParams('challenge=bad&score=-2&percent=200&time=abc&streak=7'))).toBeNull(); });
  it('creates a canonical result URL', () => { expect(createPublicResultUrl(result, 'https://play.synapse.test')).toBe('https://play.synapse.test/result?challenge=237&score=8720&percent=8&time=32000&streak=7'); });
});
