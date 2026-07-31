import React from 'react';
import { motion } from 'motion/react';
import { EDUCATION_STAGES } from '../data';
import { GraduationsCap, MapPin, Search, ExternalLink, School, BookOpen } from 'lucide-react';
import { soundFX } from '../utils/sound';

export const ExperienceTimeline: React.FC = () => {
  const handleFindOut = (searchQuery: string) => {
    soundFX.playClick();
    const query = encodeURIComponent(searchQuery);
    window.open(`https://www.google.com/search?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="education" className="py-24 px-4 sm:px-8 relative bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono text-[#A58B5E] mb-4">
            <School className="w-3.5 h-3.5 text-[#A58B5E]" />
            <span className="uppercase tracking-[0.2em] text-[10px] font-semibold">Academic Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Education
          </h2>
        </div>

        {/* Timeline Line & Cards */}
        <div className="relative border-l-2 border-[#A58B5E]/30 ml-4 sm:ml-8 space-y-10">
          {EDUCATION_STAGES.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-6 sm:pl-10"
              >
                {/* Node Dot */}
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#A58B5E] ring-4 ring-[#050505] shadow-[0_0_12px_#A58B5E]" />

                {/* Card */}
                <div className="p-6 sm:p-8 rounded-3xl glass border border-white/10 hover:border-[#A58B5E]/40 transition-all bg-[#070707]/90 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-[#A58B5E] font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5" />
                      {item.status}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#A58B5E]" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                    {item.schoolName}
                  </h3>

                  <p className="text-neutral-300 text-sm font-sans leading-relaxed mb-6">
                    {item.experienceNote}
                  </p>

                  <div className="flex items-center justify-end pt-4 border-t border-white/10">
                    {/* Find Out Search Button */}
                    <button
                      onClick={() => handleFindOut(item.searchQuery)}
                      data-cursor="pointer"
                      className="px-5 py-2.5 rounded-full bg-[#A58B5E]/15 hover:bg-[#A58B5E] text-[#A58B5E] hover:text-[#050505] border border-[#A58B5E]/30 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Find out</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
