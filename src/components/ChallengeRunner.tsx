import { useEffect, useRef, useState } from 'react';
import type { Challenge, Question, QuestionAttempt } from '../types';
import { formatTime } from '../lib/scoring';
import Brand from './Brand';
import Avatars from './Avatars';

interface Props { challenge: Challenge; isPractice: boolean; onFinish: (attempts: QuestionAttempt[], elapsedMs: number) => void; onBack: () => void; }
export default function ChallengeRunner({ challenge, isPractice, onFinish, onBack }: Props) {
  const [index, setIndex] = useState(0); const [attempts, setAttempts] = useState<QuestionAttempt[]>([]); const [elapsed, setElapsed] = useState(0); const [memorising, setMemorising] = useState(challenge.questions[0].kind === 'memory'); const [speedState, setSpeedState] = useState<'waiting' | 'ready' | 'false-start'>('waiting'); const [helpOpen, setHelpOpen] = useState(false); const [round, setRound] = useState(0);
  const startedAt = useRef(Date.now()); const signalAt = useRef(0); const complete = useRef(false); const signalTimer = useRef<number | undefined>(undefined); const question = challenge.questions[index];
  useEffect(() => { const timer = window.setInterval(() => setElapsed(Date.now() - startedAt.current), 250); return () => window.clearInterval(timer); }, []);
  useEffect(() => { setMemorising(question.kind === 'memory'); setSpeedState('waiting'); if (signalTimer.current) window.clearTimeout(signalTimer.current); let timer: number | undefined; if (question.kind === 'memory') timer = window.setTimeout(() => setMemorising(false), question.revealMs ?? 2400); if (question.kind === 'speed') { timer = window.setTimeout(() => { signalAt.current = performance.now(); setSpeedState('ready'); }, 950 + Math.floor(Math.random() * 1350)); signalTimer.current = timer; } return () => { if (timer) window.clearTimeout(timer); }; }, [question, round]);
  function submit(attempt: QuestionAttempt) { if (complete.current) return; const next = [...attempts, attempt]; if (index === challenge.questions.length - 1) { complete.current = true; onFinish(next, Date.now() - startedAt.current); return; } setAttempts(next); setIndex((value) => value + 1); }
  function choose(option: number) { if (!memorising) submit({ correct: option === question.correctIndex }); }
  function tapSpeed() { if (speedState === 'waiting') { if (signalTimer.current) window.clearTimeout(signalTimer.current); setSpeedState('false-start'); window.setTimeout(() => submit({ correct: false }), 650); return; } if (speedState === 'ready') submit({ correct: true, reactionTimeMs: performance.now() - signalAt.current }); }
  function restart() { setIndex(0); setAttempts([]); setElapsed(0); startedAt.current = Date.now(); complete.current = false; setRound((value) => value + 1); }
  return <main className={`page game-page accent-${challenge.category.toLowerCase()}`}>
    <header className="game-header"><button className="icon-button" onClick={onBack} aria-label="Back to home">←</button><Brand number={challenge.number}/><div className="header-actions"><button className="text-icon" onClick={() => setHelpOpen(!helpOpen)} aria-expanded={helpOpen}>?</button><button className="text-icon" aria-label="Settings">⋯</button></div></header>
    <div className="game-utility"><span>{isPractice ? 'PRACTICE' : challenge.category.toUpperCase()}</span><strong aria-label={`Elapsed time ${formatTime(elapsed)}`}>◷ {formatTime(elapsed)}</strong><button onClick={restart}>Restart</button></div>
    <div className="slim-progress"><span style={{ width: `${(index / challenge.questions.length) * 100}%` }}/></div>
    <section className="puzzle-stage" aria-live="polite"><p className="puzzle-kicker">{question.kind === 'memory' && memorising ? 'MEMORISE THIS' : `${index + 1} OF ${challenge.questions.length}`}</p>{question.kind === 'memory' && memorising ? <div className="memory-display">{question.memorise}</div> : <Puzzle question={question} speedState={speedState} onChoose={choose} onSpeed={tapSpeed}/>}</section>
    <div className="puzzle-controls"><button disabled>Undo</button><button onClick={() => setHelpOpen(true)}>Hint</button></div>
    <section className="how-to"><button onClick={() => setHelpOpen(!helpOpen)}><span>How to play</span><span>{helpOpen ? '−' : '+'}</span></button>{helpOpen && <p>{question.kind === 'speed' ? 'Tap once only after the signal appears. An early tap is recorded as a miss.' : question.kind === 'memory' ? 'Study the sequence, then select the exact order when it disappears.' : 'Choose the answer that best completes the puzzle. Your first choice is final.'}</p>}</section>
    <section className="game-social"><Avatars/><button>Compare results</button></section>
  </main>;
}
function Puzzle({ question, speedState, onChoose, onSpeed }: { question: Question; speedState: string; onChoose: (i: number) => void; onSpeed: () => void }) {
  if (question.kind === 'speed') return <><h1 className="puzzle-prompt">{speedState === 'false-start' ? 'Too soon.' : speedState === 'ready' ? 'Now.' : question.prompt}</h1><button className={`signal-tile ${speedState}`} onClick={onSpeed}>{speedState === 'false-start' ? 'FALSE START' : speedState === 'ready' ? question.signalLabel : 'WAIT'}</button></>;
  return <><h1 className={`puzzle-prompt ${question.kind === 'memory' ? 'memory-question' : ''}`}>{question.prompt}</h1><div className="puzzle-options">{question.options?.map((option, index) => <button key={`${option}-${index}`} onClick={() => onChoose(index)}>{option}</button>)}</div></>;
}
