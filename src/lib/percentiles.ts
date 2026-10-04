/** MVP simulation boundary. Replace this module with a backend percentile lookup later. */
export function simulatedPercentile(score: number, accuracy: number): number { return Math.min(99, Math.max(35, Math.round(35 + accuracy * 0.38 + (Math.min(10_000, score) / 10_000) * 27))); }
