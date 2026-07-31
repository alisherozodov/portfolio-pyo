import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ProjectModal } from './components/ProjectModal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Footer } from './components/Footer';
import { AiTerminalModal } from './components/AiTerminalModal';
import { MatrixRain } from './components/MatrixRain';
import { Project } from './types';
import { soundFX } from './utils/sound';

export default function App() {
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize Lenis Smooth Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Setup Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        soundFX.playClick();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
    if (next) soundFX.playSuccess();
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0] font-sans selection:bg-[#A58B5E]/30 selection:text-[#A58B5E] overflow-x-hidden">
      
      {/* Sophisticated Dark Noise & Subtle Ambient Lighting */}
      <div className="noise" />
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#A58B5E] opacity-[0.03] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#3a3a3a] opacity-[0.05] rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Custom Magnetic Cursor */}
      <CustomCursor enabled={cursorEnabled} />

      {/* Main Navigation Bar */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onToggleZeroGravity={() => {}}
        isZeroGravity={false}
      />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <TechStack />
        <ProjectShowcase onSelectProject={(p) => setSelectedProject(p)} />
        <ExperienceTimeline />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <AiTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onTriggerMatrix={() => setIsMatrixActive(true)}
        onTriggerKonami={() => {}}
      />

      <MatrixRain
        active={isMatrixActive}
        onClose={() => setIsMatrixActive(false)}
      />
    </div>
  );
}
