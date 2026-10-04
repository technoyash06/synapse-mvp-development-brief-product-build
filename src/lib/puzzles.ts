import type { CoreCategory, Puzzle } from '../types';
const choice = (id: string, prompt: string, options: string[], correctIndex: number) => ({ id, kind: 'choice' as const, prompt, options, correctIndex });
const memory = (id: string, memorise: string, options: string[]) => ({ id, kind: 'memory' as const, prompt: 'Which sequence did you see?', memorise, revealMs: 2400, options, correctIndex: 0 });
const speed = (id: string, prompt = 'Wait for the signal.') => ({ id, kind: 'speed' as const, prompt, signalLabel: 'TAP NOW' });
export const puzzleBank: Record<CoreCategory, Puzzle[]> = {
  Sequence: [
    { id: 'seq-squares', category: 'Sequence', difficulty: 1.08, intro: 'Find the rule, then choose what comes next.', questions: [choice('seq1', '2  ·  6  ·  12  ·  20  ·  ?', ['26', '28', '30', '32'], 2)] },
    { id: 'seq-double', category: 'Sequence', difficulty: 1.02, intro: 'Spot the change in pace.', questions: [choice('seq2', '5  ·  10  ·  20  ·  40  ·  ?', ['60', '70', '80', '90'], 2)] },
    { id: 'seq-primes', category: 'Sequence', difficulty: 1.15, intro: 'A precise pattern is hiding in plain sight.', questions: [choice('seq3', '3  ·  5  ·  9  ·  15  ·  ?', ['19', '21', '23', '25'], 2)] },
    { id: 'seq-reverse', category: 'Sequence', difficulty: 1.11, intro: 'Trace the relationship between each pair.', questions: [choice('seq4', '81  ·  27  ·  9  ·  3  ·  ?', ['0', '1', '2', '3'], 1)] },
    { id: 'seq-steps', category: 'Sequence', difficulty: 1.18, intro: 'Look at the increments, not just the numbers.', questions: [choice('seq5', '1  ·  4  ·  9  ·  16  ·  ?', ['20', '23', '25', '27'], 2)] }
  ],
  Memory: [
    { id: 'mem-shapes', category: 'Memory', difficulty: 1.1, intro: 'Memorise the pattern. It will disappear shortly.', questions: [memory('mem1', '◆  ○  ▲  ■  ◆', ['◆  ○  ▲  ■  ◆', '◆  ▲  ○  ■  ◆', '○  ◆  ▲  ■  ◆', '◆  ○  ■  ▲  ◆'])] },
    { id: 'mem-numbers', category: 'Memory', difficulty: 1.12, intro: 'Hold the order, not just the digits.', questions: [memory('mem2', '8  ·  3  ·  1  ·  9', ['8  ·  3  ·  1  ·  9', '8  ·  1  ·  3  ·  9', '9  ·  3  ·  1  ·  8', '8  ·  3  ·  9  ·  1'])] },
    { id: 'mem-arrows', category: 'Memory', difficulty: 1.16, intro: 'Keep your attention on direction and order.', questions: [memory('mem3', '↑  →  ↓  ←  ↑', ['↑  →  ↓  ←  ↑', '↑  ↓  →  ←  ↑', '←  →  ↓  ↑  ←', '↑  →  ←  ↓  ↑'])] },
    { id: 'mem-colors', category: 'Memory', difficulty: 1.17, intro: 'Remember the sequence as one connected thought.', questions: [memory('mem4', '●  ■  ●  ▲  ■', ['●  ■  ●  ▲  ■', '●  ▲  ●  ■  ■', '■  ●  ●  ▲  ■', '●  ■  ▲  ●  ■'])] },
    { id: 'mem-long', category: 'Memory', difficulty: 1.24, intro: 'A little more to hold onto this time.', questions: [memory('mem5', '4  ·  7  ·  2  ·  8  ·  5', ['4  ·  7  ·  2  ·  8  ·  5', '4  ·  2  ·  7  ·  8  ·  5', '5  ·  7  ·  2  ·  8  ·  4', '4  ·  7  ·  8  ·  2  ·  5'])] }
  ],
  Logic: [
    { id: 'logic-curious', category: 'Logic', difficulty: 1.14, intro: 'Use only the information in the prompt.', questions: [choice('log1', 'All strategists are curious. Some curious people are engineers. Which statement must be true?', ['Some engineers are strategists', 'All curious people are strategists', 'All strategists are curious', 'No engineers are strategists'], 2)] },
    { id: 'logic-marked', category: 'Logic', difficulty: 1.04, intro: 'Follow the rule to its direct conclusion.', questions: [choice('log2', 'Every red card is marked. This card is red. What follows?', ['It is marked', 'It might be marked', 'It is not marked', 'Nothing follows'], 0)] },
    { id: 'logic-order', category: 'Logic', difficulty: 1.2, intro: 'Sort the constraints before you decide.', questions: [choice('log3', 'Maya arrives before Ren. Ren arrives before Sol. Who can arrive last?', ['Maya', 'Ren', 'Sol', 'Cannot tell'], 2)] },
    { id: 'logic-sets', category: 'Logic', difficulty: 1.17, intro: 'Pay attention to what is guaranteed.', questions: [choice('log4', 'No analysts are late. Priya is an analyst. Which is true?', ['Priya is late', 'Priya is not late', 'All late people are analysts', 'Nothing follows'], 1)] },
    { id: 'logic-switch', category: 'Logic', difficulty: 1.22, intro: 'Work from the condition, not the assumption.', questions: [choice('log5', 'If a report is urgent, it is reviewed today. The report was not reviewed today. What follows?', ['It is urgent', 'It is not urgent', 'It may be urgent', 'The rule is false'], 1)] }
  ],
  Speed: [
    { id: 'speed-one', category: 'Speed', difficulty: 1.05, intro: 'Respond when the signal appears. Do not jump early.', questions: [speed('spd1')] },
    { id: 'speed-two', category: 'Speed', difficulty: 1.1, intro: 'Stay ready. Early taps count as a miss.', questions: [speed('spd2', 'Watch the centre of the board.')] },
    { id: 'speed-three', category: 'Speed', difficulty: 1.15, intro: 'Attention first, reaction second.', questions: [speed('spd3', 'Wait for the coral signal.')] },
    { id: 'speed-four', category: 'Speed', difficulty: 1.2, intro: 'A calm hand is a fast hand.', questions: [speed('spd4', 'Tap only after the state changes.')] },
    { id: 'speed-five', category: 'Speed', difficulty: 1.25, intro: 'One signal. One clean response.', questions: [speed('spd5', 'Stay focused on the target.')] }
  ],
  Focus: [
    { id: 'focus-b8', category: 'Focus', difficulty: 1.1, intro: 'Spot what others miss.', questions: [choice('foc1', 'Which item differs from the rest?', ['B8Q', 'B8Q', 'B8O', 'B8Q'], 2)] },
    { id: 'focus-letter', category: 'Focus', difficulty: 1.12, intro: 'Find the outlier with a steady eye.', questions: [choice('foc2', 'Which item differs from the rest?', ['MNP', 'MNP', 'MNP', 'MMP'], 3)] },
    { id: 'focus-zero', category: 'Focus', difficulty: 1.18, intro: 'Details decide this one.', questions: [choice('foc3', 'Which item differs from the rest?', ['6G9', '6G9', '6C9', '6G9'], 2)] },
    { id: 'focus-case', category: 'Focus', difficulty: 1.15, intro: 'Take in each mark before you commit.', questions: [choice('foc4', 'Which item differs from the rest?', ['QRM', 'QRM', 'QRM', 'QrM'], 3)] },
    { id: 'focus-shape', category: 'Focus', difficulty: 1.23, intro: 'Small differences, full attention.', questions: [choice('foc5', 'Which item differs from the rest?', ['△ ○ □', '△ ○ □', '△ ◇ □', '△ ○ □'], 2)] }
  ]
};
