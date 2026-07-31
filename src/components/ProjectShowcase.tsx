import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { Layers } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="py-24 px-4 sm:px-8 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono text-[#A58B5E] mb-4">
            <Layers className="w-3.5 h-3.5 text-[#A58B5E]" />
            <span className="uppercase tracking-[0.2em] text-[10px] font-semibold">PORTFOLIO</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              data-cursor="view"
              onClick={() => {
                soundFX.playClick();
                onSelectProject(project);
              }}
              className="group cursor-pointer rounded-3xl glass overflow-hidden border border-white/10 glass-card-hover flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Card Content - Name and Brief Bio */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-white mb-2 group-hover:text-[#A58B5E] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-300 text-sm font-sans leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
