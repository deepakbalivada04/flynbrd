import { useRef, useEffect, useState, useCallback } from 'react';
import { TRACKS } from '../../content/siteContent';

/* ─── Diagram: Typing code block ─── */
function CodeDiagram() {
  const lines = [
    'prompt = "classify this image"',
    'response = model.run(prompt)',
    'print(response.label)',
  ];

  return (
    <div className="font-mono text-xs text-accent/80 bg-surface p-3 border border-border leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className={i === lines.length - 1 ? 'caret-blink' : ''}>
          {line}
        </div>
      ))}
    </div>
  );
}

/* ─── Diagram: Neural network ─── */
function NeuralDiagram() {
  const layers = [3, 4, 2];
  const width = 160;
  const height = 120;
  const layerSpacing = width / (layers.length + 1);

  // Precompute node positions
  const nodes = layers.map((count, li) => {
    const x = layerSpacing * (li + 1);
    return Array.from({ length: count }, (_, ni) => {
      const ySpacing = height / (count + 1);
      return { x, y: ySpacing * (ni + 1) };
    });
  });

  // Pulse node indices (some nodes get the pulse animation)
  const pulseNodes = [[0, 1], [1, 0], [1, 3], [2, 0]];
  const isPulse = (li, ni) => pulseNodes.some(([l, n]) => l === li && n === ni);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[200px]" aria-label="Neural network diagram">
      {/* Connection lines */}
      {nodes.slice(0, -1).map((layer, li) =>
        layer.map((from, fi) =>
          nodes[li + 1].map((to, ti) => (
            <line
              key={`${li}-${fi}-${ti}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke="#1E1F23"
              strokeWidth="1"
            />
          ))
        )
      )}
      {/* Nodes */}
      {nodes.map((layer, li) =>
        layer.map((node, ni) => (
          <circle
            key={`n-${li}-${ni}`}
            cx={node.x}
            cy={node.y}
            r={4}
            fill={isPulse(li, ni) ? '#F5B82E' : '#1E1F23'}
            stroke={isPulse(li, ni) ? '#F5B82E' : '#555962'}
            strokeWidth="1"
            className={isPulse(li, ni) ? 'node-pulse' : ''}
          />
        ))
      )}
    </svg>
  );
}

/* ─── Diagram: Orbital path ─── */
function OrbitalDiagram() {
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[220px]" aria-label="Orbital trajectory diagram">
      {/* Orbit ellipse */}
      <ellipse
        cx="100" cy="60"
        rx="80" ry="40"
        fill="none"
        stroke="#555962"
        strokeWidth="1"
        className="orbit-path"
      />
      {/* Central body */}
      <circle cx="100" cy="60" r="3" fill="#555962" />
      {/* Satellite dot at the start position */}
      <circle cx="180" cy="60" r="4" fill="#F5B82E" />
    </svg>
  );
}

/* ─── Diagram: Exploded robot ─── */
function ExplodedDiagram() {
  return (
    <svg viewBox="0 0 160 140" className="w-full max-w-[180px]" aria-label="Exploded robot view">
      {/* Head / camera module — shifted up */}
      <rect x="55" y="4" width="50" height="24" rx="2"
        fill="none" stroke="#F5B82E" strokeWidth="1.5" />
      <circle cx="80" cy="16" r="5" fill="none" stroke="#F5B82E" strokeWidth="1" />

      {/* Body / controller board */}
      <rect x="45" y="38" width="70" height="35" rx="2"
        fill="none" stroke="#8A8F98" strokeWidth="1.5" />
      {/* Chip detail */}
      <rect x="62" y="46" width="16" height="12" rx="1"
        fill="none" stroke="#555962" strokeWidth="1" />
      <line x1="70" y1="46" x2="70" y2="42" stroke="#555962" strokeWidth="0.7" />
      <line x1="74" y1="46" x2="74" y2="42" stroke="#555962" strokeWidth="0.7" />

      {/* Chassis */}
      <rect x="40" y="82" width="80" height="18" rx="2"
        fill="none" stroke="#8A8F98" strokeWidth="1.5" />

      {/* Left wheel */}
      <rect x="28" y="108" width="24" height="14" rx="3"
        fill="none" stroke="#8A8F98" strokeWidth="1.5" />

      {/* Right wheel */}
      <rect x="108" y="108" width="24" height="14" rx="3"
        fill="none" stroke="#8A8F98" strokeWidth="1.5" />

      {/* Sonar sensor on body */}
      <path d="M92 50 L104 44 L104 56 Z"
        fill="none" stroke="#F5B82E" strokeWidth="1" />

      {/* Dashed assembly lines */}
      <line x1="80" y1="28" x2="80" y2="38" stroke="#555962"
        strokeWidth="0.7" strokeDasharray="2 2" />
      <line x1="80" y1="73" x2="80" y2="82" stroke="#555962"
        strokeWidth="0.7" strokeDasharray="2 2" />
      <line x1="50" y1="100" x2="40" y2="108" stroke="#555962"
        strokeWidth="0.7" strokeDasharray="2 2" />
      <line x1="110" y1="100" x2="120" y2="108" stroke="#555962"
        strokeWidth="0.7" strokeDasharray="2 2" />
    </svg>
  );
}

/* ─── Diagram picker ─── */
function CardDiagram({ type }) {
  switch (type) {
    case 'code': return <CodeDiagram />;
    case 'neural': return <NeuralDiagram />;
    case 'orbital': return <OrbitalDiagram />;
    case 'exploded': return <ExplodedDiagram />;
    default: return null;
  }
}

/* ─── Grid span configs ─── */
const GRID_CLASSES = [
  'col-span-12 md:col-span-7',         // Prompting
  'col-span-12 md:col-span-5 md:row-span-2', // How AI Thinks
  'col-span-12 md:col-span-7',         // Space Robotics
  'col-span-12',                        // Robot Kits
];

/* ─── Individual card ─── */
function TrackCard({ card, audience, gridClass }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Intersection Observer for fade-in */
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  /* 3D tilt handler */
  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current?.querySelector('.tilt-card');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 6;
    const rotateX = ((midY - y) / midY) * 6;
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current?.querySelector('.tilt-card');
    if (el) el.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }, []);

  const desc = audience === 'schools' ? card.forSchools : card.forStudents;

  return (
    <div
      ref={cardRef}
      className={`${gridClass} transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-card bg-surface-card border border-border p-6 sm:p-8 h-full flex flex-col">
        <span className="font-mono text-xs text-text-dim tracking-widest">{card.num}</span>
        <h3 className="text-xl font-semibold text-text mt-2">{card.title}</h3>
        <p className="text-sm text-text-secondary mt-3 leading-relaxed">{desc}</p>

        {/* Animated diagram area */}
        <div className="mt-auto pt-6 min-h-[120px] flex items-end">
          <CardDiagram type={card.diagram} />
        </div>
      </div>
    </div>
  );
}

/* ─── Main TrackGrid section ─── */
export default function TrackGrid({ audience }) {
  return (
    <section id="tracks" className="max-w-6xl mx-auto px-6 py-20 sm:py-28">
      <span className="section-tag">{TRACKS.tag}</span>
      <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-text mt-4">
        {TRACKS.headline}
      </h2>
      <p className="text-text-secondary mt-4 max-w-prose">{TRACKS.sub}</p>

      <div className="grid grid-cols-12 gap-4 mt-12">
        {TRACKS.cards.map((card, i) => (
          <TrackCard
            key={card.id}
            card={card}
            audience={audience}
            gridClass={GRID_CLASSES[i]}
          />
        ))}
      </div>
    </section>
  );
}
