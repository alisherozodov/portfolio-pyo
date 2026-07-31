import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThreeCanvas } from './ThreeCanvas';
import { PERSONAL_INFO } from '../data';
import { WebGLShapeType, WebGLPalette } from '../types';
import { Sparkles, Terminal, ArrowDown, ChevronRight, Cpu, Layers, Disc } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [shape, setShape] = useState<WebGLShapeType>('quantumKnot');
  const [palette, setPalette] = useState<WebGLPalette>('midnightCyber');

  const shapesList: { id: WebGLShapeType; label: string }[] = [
    { id: 'quantumKnot', label: 'Quantum Knot' },
    { id: 'particleField', label: 'Particle Swarm' },
    { id: 'torusMesh', label: 'Torus Mesh' },
    { id: 'cyberLattice', label: 'Cyber Lattice' },
  ];

  const paletteList: { id: WebGLPalette; label: string; bg: string }[] = [
    { id: 'midnightCyber', label: 'Champagne Gold', bg: 'bg-[#A58B5E]' },
    { id: 'solarFlare', label: 'Solar Amber', bg: 'bg-amber-500' },
    { id: 'emeraldMatrix', label: 'Warm Bronze', bg: 'bg-[#8c734b]' },
    { id: 'deepViolet', label: 'Platinum Dark', bg: 'bg-neutral-400' },
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden">
      
      {/* Three.js Interactive WebGL Background Canvas */}
      <ThreeCanvas shape={shape} palette={palette} />

      {/* Giant Transparent NYXLVOID Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="font-serif font-black text-white/[0.04] uppercase tracking-[0.25em] text-[16vw] leading-none whitespace-nowrap blur-[1px]">
          nyxlvoid
        </span>
      </div>

      {/* Hero Ambient Glow Layer */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#A58B5E]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Availability Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-[#A58B5E]/30 text-xs font-mono text-[#A58B5E] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A58B5E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A58B5E]"></span>
          </span>
          <span className="uppercase tracking-[0.2em] text-[10px] font-semibold">{PERSONAL_INFO.status}</span>
        </motion.div>

        {/* Main Staggered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05]"
        >
          Alisher Ozodov <br className="hidden sm:inline" />
          <span className="font-serif font-light text-[#A58B5E] block mt-3 text-xl sm:text-3xl md:text-4xl tracking-normal">
            AI Engineer & Developer
          </span>
        </motion.h1>

        {/* Bio Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl text-neutral-400 text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed mb-10 text-balance tracking-wide"
        >
          {PERSONAL_INFO.bio}
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <a
            href="#projects"
            data-cursor="pointer"
            onClick={() => soundFX.playClick()}
            className="group px-8 py-4 rounded-full bg-[#A58B5E] hover:bg-[#b89c6c] text-[#050505] font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3 shadow-[0_0_35px_rgba(165,139,94,0.35)] transition-all hover:scale-105"
          >
            <span>View Projects</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={() => {
              soundFX.playClick();
              onOpenTerminal();
            }}
            data-cursor="pointer"
            className="px-7 py-4 rounded-full glass text-[#A58B5E] border border-[#A58B5E]/30 hover:bg-[#A58B5E]/10 hover:border-[#A58B5E] font-mono text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2.5 transition-all hover:scale-105"
          >
            <Terminal className="w-4 h-4 text-[#A58B5E]" />
            <span>Open AI Terminal</span>
          </button>
        </motion.div>

        {/* 3D WebGL Controls Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-2xl p-3.5 rounded-3xl glass border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 shadow-2xl"
        >
          {/* Shape Switcher */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center overflow-x-auto">
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#A58B5E] mr-2 uppercase tracking-widest font-semibold">
              <Cpu className="w-3.5 h-3.5 text-[#A58B5E]" />
              <span>Geometry:</span>
            </div>
            {shapesList.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playClick();
                  setShape(item.id);
                }}
                data-cursor="pointer"
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all ${
                  shape === item.id
                    ? 'bg-[#A58B5E]/30 text-[#A58B5E] border border-[#A58B5E]/50 font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Palette Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#A58B5E] uppercase tracking-widest font-semibold">Palette:</span>
            <div className="flex items-center gap-1.5">
              {paletteList.map((pal) => (
                <button
                  key={pal.id}
                  onClick={() => {
                    soundFX.playClick();
                    setPalette(pal.id);
                  }}
                  data-cursor="pointer"
                  title={pal.label}
                  className={`w-5 h-5 rounded-full ${pal.bg} transition-all ${
                    palette === pal.id ? 'ring-2 ring-[#A58B5E] scale-125' : 'opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>



        {/* Scroll Indicator */}
        <motion.a
          href="#achievements"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-14 text-neutral-500 hover:text-[#A58B5E] transition-colors p-2"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
};
