import type { Challenge, GameResult } from '../types';
import { createPublicResultUrl } from './public-result';
export interface ShareResultPayload { title: string; text: string; url: string; publicResultUrl: string; futureOgImageUrl?: string; }
export function gameUrl(): string { const configured = import.meta.env.VITE_PUBLIC_GAME_URL; if (configured) return configured.replace(/\/$/, ''); return typeof window === 'undefined' ? 'https://synapse.example.com' : window.location.origin; }
/** One payload works for the Web Share API today and public result URLs/OG images later. */
export function createShareResultPayload(challenge: Challenge, result: GameResult): ShareResultPayload { const baseUrl = gameUrl(); const publicResultUrl = createPublicResultUrl(result, baseUrl); const topPercent = 100 - result.percentile; return { title: `SYNAPSE #${challenge.number} — Score ${result.score.toLocaleString()}`, text: `🧠 SYNAPSE #${challenge.number}\n\nScore: ${result.score.toLocaleString()}\nTop ${topPercent}%\n🔥 ${result.streak}-day streak\n\nCan you beat me?\n\n${publicResultUrl}`, url: publicResultUrl, publicResultUrl, futureOgImageUrl: undefined }; }
/** LinkedIn already receives the URL from its share dialog; keep the copied post copy URL-free. */
export function linkedInPostText(challenge: Challenge, result: GameResult): string { return `🧠 SYNAPSE #${challenge.number}\n\nScore: ${result.score.toLocaleString()}\nTop ${100 - result.percentile}%\n🔥 ${result.streak}-day streak\n\nCan you beat me?`; }
/** Opens LinkedIn's public URL share dialog; the player reviews and publishes the post themselves. */
export function linkedInShareUrl(payload: ShareResultPayload): string { return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(payload.publicResultUrl)}`; }
export async function copyShareText(text: string): Promise<void> { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return; } const area = document.createElement('textarea'); area.value = text; area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); }
