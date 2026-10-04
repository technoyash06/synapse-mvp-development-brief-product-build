import { ImageResponse } from '@vercel/og';
import { parsePublicResult } from '../src/lib/public-result';
export const config = { runtime: 'edge' };
/** Dynamic 1200×627 public result card; no LinkedIn marks or proprietary assets. */
export default function handler(request: Request) {
  const result = parsePublicResult(new URL(request.url).searchParams);
  if (!result) return new Response('Invalid result', { status: 400 });
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#f8f9fa', color: '#202124', padding: '74px 86px', fontFamily: 'Arial, sans-serif' }}><div style={{ display: 'flex', alignItems: 'center', color: '#0a66c2', fontSize: 30, fontWeight: 800, letterSpacing: '-1px' }}><span style={{ display: 'flex', width: 30, height: 30, marginRight: 14, borderRadius: 15, background: '#0a66c2', color: '#ffffff', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>+</span>SYNAPSE #{result.challenge}</div><div style={{ display: 'flex', flexDirection: 'column', marginTop: 86 }}><span style={{ color: '#68727c', fontSize: 22, fontWeight: 700, letterSpacing: '3px' }}>SCORE</span><span style={{ fontSize: 124, fontWeight: 800, letterSpacing: '-9px', lineHeight: 1.05 }}>{result.score.toLocaleString()}</span></div><div style={{ display: 'flex', marginTop: 'auto', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid #dce1e5', paddingTop: 29 }}><span style={{ color: '#0a66c2', fontSize: 29, fontWeight: 800 }}>TOP {result.percent}%</span><span style={{ fontSize: 28, fontWeight: 700 }}> {result.streak} DAY STREAK</span><span style={{ color: '#4f5963', fontSize: 26 }}>Can you beat me?</span></div></div>, { width: 1200, height: 627 });
}
