import type { GameResult } from '../types';
import { addLocalDays, localDateKey, parseLocalDateKey } from './local-date';
const STORAGE_KEY = 'synapse.progress.v2';
export interface StorageLike { getItem(key: string): string | null; setItem(key: string, value: string): void; }
export interface ProgressState { official: Record<string, GameResult>; history: GameResult[]; onboarded: boolean; }
export const emptyProgress = (): ProgressState => ({ official: {}, history: [], onboarded: false });
function browserStorage(): StorageLike | undefined { return typeof localStorage === 'undefined' ? undefined : localStorage; }
export function readProgress(storage: StorageLike | undefined = browserStorage()): ProgressState { if (!storage) return emptyProgress(); try { const value = JSON.parse(storage.getItem(STORAGE_KEY) ?? 'null'); return value?.official && value?.history ? { ...value, onboarded: Boolean(value.onboarded) } : emptyProgress(); } catch { return emptyProgress(); } }
function writeProgress(state: ProgressState, storage: StorageLike | undefined = browserStorage()): void { storage?.setItem(STORAGE_KEY, JSON.stringify(state)); }
export function getStreak(official: Record<string, GameResult>, date = new Date()): number { let cursor = new Date(date.getFullYear(), date.getMonth(), date.getDate()); let streak = 0; while (official[localDateKey(cursor)]) { streak += 1; cursor = addLocalDays(cursor, -1); } return streak; }
export function recordOfficialAttempt(result: GameResult, storage?: StorageLike): { result: GameResult; saved: boolean } { const state = readProgress(storage); const existing = state.official[result.dateKey]; if (existing) return { result: existing, saved: false }; const official = { ...state.official, [result.dateKey]: result }; const enriched = { ...result, streak: getStreak(official, parseLocalDateKey(result.dateKey)) }; official[result.dateKey] = enriched; writeProgress({ ...state, official, history: [enriched, ...state.history] }, storage); return { result: enriched, saved: true }; }
export function recordPracticeResult(result: GameResult, storage?: StorageLike): GameResult { const state = readProgress(storage); writeProgress({ ...state, history: [result, ...state.history] }, storage); return result; }
export function getTodayOfficial(date = new Date(), storage?: StorageLike): GameResult | undefined { return readProgress(storage).official[localDateKey(date)]; }
export function getPersonalBest(storage?: StorageLike): number { return Math.max(0, ...readProgress(storage).history.map((result) => result.score)); }
export function markOnboarded(storage?: StorageLike): void { const state = readProgress(storage); writeProgress({ ...state, onboarded: true }, storage); }
