import type { Challenge, GameResult } from '../types';
import { formatTime } from '../lib/scoring';
import Brand from './Brand';
export default function ShareCard({ challenge, result }: { challenge: Challenge; result: GameResult }) { return <article className="share-preview"><div><Brand number={challenge.number}/><span>{result.category.toUpperCase()}</span></div><strong>{result.score.toLocaleString()}</strong><p>Top {100 - result.percentile}% · {formatTime(result.timeMs)} · {result.streak}-day streak</p><footer>Can you beat me?</footer></article>; }
