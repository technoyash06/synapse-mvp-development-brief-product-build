import type { GameResult } from '../types';

export interface PublicResult { challenge: number; score: number; percent: number; time: number; streak: number; }
const limits = { challenge: [1, 9_999_999], score: [0, 10_000], percent: [1, 65], time: [0, 3_600_000], streak: [0, 9_999] } as const;
function validInteger(value: string | null, [min, max]: readonly [number, number]): number | null { if (!value || !/^\d+$/.test(value)) return null; const parsed = Number(value); return Number.isSafeInteger(parsed) && parsed >= min && parsed <= max ? parsed : null; }

/** MVP transport boundary: replace query parameters with a backend-signed result ID later. */
export function parsePublicResult(params: URLSearchParams): PublicResult | null {
  const challenge = validInteger(params.get('challenge'), limits.challenge); const score = validInteger(params.get('score'), limits.score); const percent = validInteger(params.get('percent'), limits.percent); const time = validInteger(params.get('time'), limits.time); const streak = validInteger(params.get('streak'), limits.streak);
  return challenge === null || score === null || percent === null || time === null || streak === null ? null : { challenge, score, percent, time, streak };
}
export function resultToPublic(result: GameResult): PublicResult { return { challenge: result.challengeNumber, score: result.score, percent: 100 - result.percentile, time: result.timeMs, streak: result.streak }; }
export function createPublicResultUrl(result: GameResult, baseUrl: string): string {
  const url = new URL('/result', baseUrl); const values = resultToPublic(result); Object.entries(values).forEach(([key, value]) => url.searchParams.set(key, String(value))); return url.toString();
}
