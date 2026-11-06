import React, { useState, useEffect } from 'react';
import defaultReviews from '../../content/reviews.json';
import FadeIn from '../common/FadeIn';

export default function ReviewsSection() {
  const [data, setData] = useState(defaultReviews);

  useEffect(() => {
    fetch('/content/reviews.json')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Not found');
      })
      .then((json) => {
        if (json && typeof json.published === 'boolean') {
          setData(json);
        }
      })
      .catch(() => {
        // Fall back to imported reviews.json
      });
  }, []);

  // Show only when reviews.json has "published": true. Until then, hide this section.
  if (!data || !data.published || !data.reviews || data.reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="bg-slate-50 py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-6xl mx-auto text-left">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <FadeIn delay={0}>
            <div className="text-xs font-mono uppercase tracking-wider text-[#2576BC] font-bold mb-3">
              Testimonials
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              What teachers, parents, and students{' '}
              <span className="text-[#2576BC]">say.</span>
            </h2>
          </FadeIn>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.reviews.map((rev, idx) => (
            <FadeIn key={rev.id || idx} delay={idx * 60}>
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-card flex flex-col justify-between h-full">
                <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 font-medium">
                  “{rev.quote}”
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-[#2576BC] text-white font-mono text-xs flex items-center justify-center shrink-0">
                    {rev.initials || rev.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {rev.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {rev.role}, {rev.location}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}