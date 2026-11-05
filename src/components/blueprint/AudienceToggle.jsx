import { AUDIENCE } from '../../content/siteContent';

export default function AudienceToggle({ audience, setAudience }) {
  return (
    <div className="sticky top-20 z-30 flex justify-center py-4">
      <div className="inline-flex items-center bg-surface-card border border-border">
        <button
          onClick={() => setAudience('schools')}
          className={`
            font-mono text-xs tracking-wider uppercase px-4 py-2 transition-colors
            ${audience === 'schools'
              ? 'bg-accent text-surface'
              : 'text-text-secondary hover:text-text'
            }
          `}
        >
          {AUDIENCE.schools}
        </button>
        <button
          onClick={() => setAudience('students')}
          className={`
            font-mono text-xs tracking-wider uppercase px-4 py-2 transition-colors
            ${audience === 'students'
              ? 'bg-accent text-surface'
              : 'text-text-secondary hover:text-text'
            }
          `}
        >
          {AUDIENCE.students}
        </button>
      </div>
    </div>
  );
}
