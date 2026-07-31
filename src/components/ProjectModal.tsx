import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Zap, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] flex flex-col rounded-3xl glass border border-white/20 bg-[#070707] shadow-2xl z-10 overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 bg-[#070707] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#A58B5E]/20 text-[#A58B5E] text-[10px] font-mono uppercase tracking-widest border border-[#A58B5E]/30 font-semibold">
                {project.category}
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
                {project.title}
              </h2>
            </div>
            
            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              data-cursor="pointer"
              className="p-2 rounded-full glass text-neutral-400 hover:text-white hover:border-white/30 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-auto p-6 sm:p-8 space-y-6">
            {/* Banner Image */}
            <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 bg-neutral-900 border border-white/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80" />
            </div>

            {/* Title & Short Bio */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-[#A58B5E] mb-3 uppercase tracking-wider">
                {project.subtitle}
              </p>
              <p className="text-neutral-300 text-sm sm:text-base font-sans leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="px-6 py-3 rounded-full bg-[#A58B5E] hover:bg-[#b89c6c] text-[#050505] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
                >
                  <span>Open Website</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="px-6 py-3 rounded-full glass text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4 text-[#A58B5E]" />
                  <span>View GitHub</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
