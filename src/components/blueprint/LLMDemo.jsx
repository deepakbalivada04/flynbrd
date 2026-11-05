import { useState, useEffect, useRef } from 'react';

const PREDICTIONS = {
  the: [
    { token: 'robot', prob: 0.34 },
    { token: 'model', prob: 0.22 },
    { token: 'student', prob: 0.18 },
    { token: 'system', prob: 0.15 },
    { token: 'next', prob: 0.11 },
  ],
  ai: [
    { token: 'model', prob: 0.28 },
    { token: 'system', prob: 0.24 },
    { token: 'can', prob: 0.19 },
    { token: 'learns', prob: 0.17 },
    { token: 'powered', prob: 0.12 },
  ],
  build: [
    { token: 'a', prob: 0.31 },
    { token: 'the', prob: 0.25 },
    { token: 'your', prob: 0.20 },
    { token: 'robots', prob: 0.14 },
    { token: 'and', prob: 0.10 },
  ],
  robot: [
    { token: 'arm', prob: 0.29 },
    { token: 'learns', prob: 0.23 },
    { token: 'kit', prob: 0.21 },
    { token: 'that', prob: 0.16 },
    { token: 'moves', prob: 0.11 },
  ],
  learn: [
    { token: 'how', prob: 0.30 },
    { token: 'to', prob: 0.26 },
    { token: 'about', prob: 0.19 },
    { token: 'from', prob: 0.14 },
    { token: 'by', prob: 0.11 },
  ],
  code: [
    { token: 'that', prob: 0.27 },
    { token: 'runs', prob: 0.24 },
    { token: 'for', prob: 0.20 },
    { token: 'your', prob: 0.17 },
    { token: 'in', prob: 0.12 },
  ],
  sensor: [
    { token: 'data', prob: 0.32 },
    { token: 'reads', prob: 0.24 },
    { token: 'module', prob: 0.19 },
    { token: 'array', prob: 0.14 },
    { token: 'input', prob: 0.11 },
  ],
  neural: [
    { token: 'network', prob: 0.38 },
    { token: 'net', prob: 0.22 },
    { token: 'pathway', prob: 0.17 },
    { token: 'layer', prob: 0.13 },
    { token: 'signal', prob: 0.10 },
  ],
  prompt: [
    { token: 'engineering', prob: 0.30 },
    { token: 'the', prob: 0.24 },
    { token: 'design', prob: 0.20 },
    { token: 'chain', prob: 0.15 },
    { token: 'tuning', prob: 0.11 },
  ],
};

const FALLBACK = [
  { token: 'is', prob: 0.26 },
  { token: 'and', prob: 0.22 },
  { token: 'the', prob: 0.20 },
  { token: 'a', prob: 0.18 },
  { token: 'to', prob: 0.14 },
];

function LLMDemo() {
  const [input, setInput] = useState('');
  const [predictions, setPredictions] = useState(FALLBACK);
  const [animKey, setAnimKey] = useState(0);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const trimmed = input.trim();
      if (!trimmed) {
        setPredictions(FALLBACK);
        setAnimKey((k) => k + 1);
        return;
      }

      const lastWord = trimmed.split(/\s+/).pop().toLowerCase();
      const match = PREDICTIONS[lastWord] || FALLBACK;
      setPredictions(match);
      setAnimKey((k) => k + 1);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input]);

  return (
    <div className="bg-surface-card border border-border p-5 sm:p-6">
      <p className="font-mono text-[11px] text-text-dim tracking-widest uppercase mb-3">
        Type a word →
      </p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="the"
        className="bg-surface border border-border text-text font-mono text-sm px-3 py-2 w-full focus:border-accent outline-none transition-colors"
      />

      <div className="mt-5 space-y-3" key={animKey}>
        {predictions.map((p) => (
          <PredictionRow key={p.token} token={p.token} prob={p.prob} />
        ))}
      </div>
    </div>
  );
}

function PredictionRow({ token, prob }) {
  const pct = Math.round(prob * 100);

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm text-text w-24 shrink-0 truncate">
        {token}
      </span>
      <div className="flex-1 h-2 bg-surface rounded-sm overflow-hidden">
        <div
          className="h-full bg-accent prob-bar"
          style={{ '--bar-width': prob, transform: `scaleX(${prob})` }}
        />
      </div>
      <span className="font-mono text-xs text-text-dim w-10 text-right shrink-0">
        {pct}%
      </span>
    </div>
  );
}

export default LLMDemo;
