import { PROOF_STRIP } from '../../content/siteContent';

export default function ProofStrip() {
  return (
    <section className="bg-surface-raised border-y border-border">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <span className="section-tag">{PROOF_STRIP.tag}</span>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-start">
          {PROOF_STRIP.items.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col sm:flex-row sm:items-start">
              {/* Vertical hairline separator between items on desktop */}
              {i > 0 && (
                <div className="hidden sm:block w-px self-stretch bg-border mx-8 shrink-0" />
              )}
              {/* Horizontal hairline separator on mobile */}
              {i > 0 && (
                <div className="sm:hidden hairline my-6" />
              )}
              <div>
                <p className="font-semibold text-text text-sm">{item.title}</p>
                <p className="text-text-secondary text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
