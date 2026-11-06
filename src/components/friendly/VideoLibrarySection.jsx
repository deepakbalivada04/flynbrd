import React, { useState } from 'react';
import content from '../../content/content.json';
import { Play, Clock } from 'lucide-react';
import FadeIn from '../common/FadeIn';

const CATEGORY_COLORS = {
  prompting: {
    tag: 'text-[#D4252A] bg-[#D4252A]/10 border-[#D4252A]/20',
    play: 'bg-[#D4252A] group-hover:bg-[#b81d22] shadow-[#D4252A]/25',
    activeTab: 'bg-[#D4252A] text-white',
  },
  thinking: {
    tag: 'text-[#533788] bg-[#533788]/10 border-[#533788]/20',
    play: 'bg-[#533788] group-hover:bg-[#432c6e] shadow-[#533788]/25',
    activeTab: 'bg-[#533788] text-white',
  },
  space: {
    tag: 'text-[#EE7819] bg-[#EE7819]/10 border-[#EE7819]/20',
    play: 'bg-[#EE7819] group-hover:bg-[#c9620f] shadow-[#EE7819]/25',
    activeTab: 'bg-[#EE7819] text-white',
  },
  kits: {
    tag: 'text-[#1D9D53] bg-[#1D9D53]/10 border-[#1D9D53]/20',
    play: 'bg-[#1D9D53] group-hover:bg-[#168143] shadow-[#1D9D53]/25',
    activeTab: 'bg-[#1D9D53] text-white',
  },
};

export default function VideoLibrarySection() {
  const { label, body, tabs, videos } = content.videoLibrary;
  const [activeTab, setActiveTab] = useState('all');

  const filteredVideos = activeTab === 'all'
    ? videos
    : videos.filter((v) => v.category === activeTab);

  return (
    <section id="learning-system" className="bg-slate-50 py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <FadeIn delay={0}>
            <div className="text-xs font-mono uppercase tracking-wider text-[#2576BC] font-bold mb-3">
              {label}
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
              Lessons students can return to,{' '}
              <span className="bg-gradient-to-r from-[#2576BC] via-[#533788] to-[#2576BC] bg-clip-text text-transparent">
                at their own pace.
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={160}>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {body}
            </p>
          </FadeIn>
        </div>

        {/* Filter Tabs */}
        <FadeIn delay={200}>
          <div 
            role="tablist" 
            aria-label="Filter videos by project category"
            className="flex flex-wrap items-center gap-2 mb-12"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const catColor = CATEGORY_COLORS[tab.id];

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? catColor ? catColor.activeTab : 'bg-[#2576BC] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* 8 Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video, idx) => {
            const catTheme = CATEGORY_COLORS[video.category] || CATEGORY_COLORS.prompting;

            return (
              <FadeIn key={video.id} delay={idx * 60}>
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between h-full shadow-card hover:shadow-card-hover hover:border-slate-300 transition-all group text-left">
                  
                  {/* Clean Flat Thumbnail Box */}
                  <div className="relative h-40 w-full bg-slate-100/90 border-b border-slate-200 p-4 flex flex-col justify-between items-start">
                    
                    {/* Top: Category Tag & "Coming soon" */}
                    <div className="w-full flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] uppercase tracking-wider font-bold border ${catTheme.tag}`}>
                        {video.tag}
                      </span>
                      
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-mono uppercase tracking-wider font-medium">
                        Coming soon
                      </span>
                    </div>

                    {/* Play Button Icon */}
                    <div className="self-center my-auto flex items-center justify-center">
                      <div className={`w-11 h-11 rounded-full ${catTheme.play} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all`}>
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="self-end flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{video.duration}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#2576BC] transition-colors">
                      {video.title}
                    </h3>
                  </div>

                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
