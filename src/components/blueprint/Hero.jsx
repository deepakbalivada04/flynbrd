import { HERO, FOUNDING } from '../../content/siteContent';
import LLMDemo from './LLMDemo';

function Hero() {
  return (
    <section className="min-h-screen bg-grid relative flex items-center">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ─── Left column ─── */}
          <div className="lg:col-span-7">
            <p className="section-tag mb-6">[00] Introduction</p>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] text-text mb-6">
              {HERO.headline}{' '}
              <em className="text-accent">{HERO.headlineAccent}</em>
            </h1>

            <p className="text-body text-text-secondary max-w-prose mb-10">
              {HERO.sub}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href={HERO.ctaPrimary.href}
                className="bg-accent text-surface font-medium rounded-none px-6 py-3 hover:bg-accent-muted transition"
              >
                {HERO.ctaPrimary.label}
              </a>
              <a
                href={HERO.ctaSecondary.href}
                className="border border-border text-text-secondary hover:text-text hover:border-text-dim transition rounded-none px-6 py-3"
              >
                {HERO.ctaSecondary.label}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-mono text-xs text-text-dim">
                {FOUNDING.status}
              </span>
            </div>
          </div>

          {/* ─── Right column ─── */}
          <div className="lg:col-span-5">
            <LLMDemo />
            <p className="font-mono text-xs text-text-dim mt-3">
              {HERO.llmDemoLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
