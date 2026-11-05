import React, { useState } from 'react';
import content from '../../content/content.json';
import { Play, Clock } from 'lucide-react';
import FadeIn from '../common/FadeIn';

export default function VideoLibrarySection() {
  const { label, body, tabs, videos } = content.videoLibrary;
  const [activeTab, setActiveTab] = useState('all');

  const filteredVideos = activeTab === 'all'
    ? videos
    : videos.filter((v) => v.category === activeTab);

  return (
    <section id="learning-system" className="bg-[#F6F0E4] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCCFB6]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <FadeIn delay={0}>
            <div className="label-mono mb-3 text-[#1F4236]">
              {label}
            </div>
          </FadeIn>
          
          <FadeIn delay={80}>
            <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-[#2A2320] mb-4">
              Lessons students can return to,{' '}
              <em className="italic text-[#C98A22] font-serif">at their own pace.</em>
            </h2>
          </FadeIn>

          <FadeIn delay={160}>
            <p className="body-editorial text-base sm:text-lg">
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
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#5E1F1C] text-[#F6F0E4] font-medium'
                      : 'bg-[#EFE6D3] text-[#2A2320]/80 hover:text-[#2A2320] border border-[#DCCFB6]'
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
          {filteredVideos.map((video, idx) => (
            <FadeIn key={video.id} delay={idx * 60}>
              <div className="card-quiet overflow-hidden flex flex-col justify-between h-full group">
                
                {/* Clean Flat Thumbnail Box (No gradients, no glow) */}
                <div className="relative h-40 w-full bg-[#EFE6D3] border-b border-[#DCCFB6] p-4 flex flex-col justify-between items-start">
                  
                  {/* Top: Category Tag & "Coming soon" */}
                  <div className="w-full flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-[#1F4236] uppercase tracking-wider font-medium">
                      {video.tag}
                    </span>
                    
                    <span className="px-2 py-0.5 rounded-full bg-[#5E1F1C] text-[#F6F0E4] text-[10px] font-mono uppercase tracking-wider font-medium">
                      Coming soon
                    </span>
                  </div>

                  {/* Play Button Icon */}
                  <div className="self-center my-auto flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#5E1F1C] text-[#F6F0E4] flex items-center justify-center shadow-soft group-hover:bg-[#C98A22] transition-colors">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="self-end flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#F6F0E4] border border-[#DCCFB6] text-[#2A2320] text-[11px] font-mono">
                    <Clock className="w-3 h-3 text-[#1F4236]" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <h3 className="heading-editorial text-lg text-[#2A2320] leading-snug group-hover:text-[#5E1F1C] transition-colors">
                    {video.title}
                  </h3>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}