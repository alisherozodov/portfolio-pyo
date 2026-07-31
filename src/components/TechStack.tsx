import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ACHIEVEMENTS, SKILL_CATEGORIES } from '../data';
import { Award, Trophy, CheckCircle2, Cpu, Sparkles, Star, ShieldCheck, Globe, Code2 } from 'lucide-react';
import { soundFX } from '../utils/sound';

export const TechStack: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(ACHIEVEMENTS[0]);

  const getAchievementIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-[#A58B5E]" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-[#A58B5E]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#A58B5E]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-[#A58B5E]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#A58B5E]" />;
      default: return <Award className="w-6 h-6 text-[#A58B5E]" />;
    }
  };

  return (
    <section id="achievements" className="py-24 px-4 sm:px-8 relative bg-[#050505]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono text-[#A58B5E] mb-4">
              <Trophy className="w-3.5 h-3.5 text-[#A58B5E]" />
              <span className="uppercase tracking-[0.2em] text-[10px] font-semibold">Honors & Qualifications</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Achievements
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm font-sans leading-relaxed tracking-wide">
            Recognized across academic olympiads, language certifications, and IT competitions.
          </p>
        </div>

        {/* Top Achievements Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ACHIEVEMENTS.map((item, idx) => {
            const isSelected = selectedAchievement.id === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedAchievement(item);
                }}
                data-cursor="pointer"
                className={`group p-6 rounded-3xl glass cursor-pointer transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-[#A58B5E] bg-[#A58B5E]/10 shadow-[0_0_30px_rgba(165,139,94,0.25)] scale-[1.02]'
                    : 'hover:border-[#A58B5E]/40 hover:bg-white/5'
                }`}
              >
                {/* Number Watermark */}
                <span className="absolute top-4 right-6 font-serif font-bold text-4xl text-white/5 group-hover:text-[#A58B5E]/20 transition-colors">
                  0{idx + 1}
                </span>

                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl glass border border-[#A58B5E]/30 group-hover:border-[#A58B5E] transition-colors">
                    {getAchievementIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg group-hover:text-[#A58B5E] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#070707] border border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Result / Score:</span>
                  <span className="font-serif font-bold text-lg text-[#A58B5E]">
                    {item.value}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
