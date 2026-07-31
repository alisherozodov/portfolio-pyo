import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Terminal, Sparkles, Menu, X, Code, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTerminal: () => void;
  onToggleZeroGravity: () => void;
  isZeroGravity: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenTerminal,
  onToggleZeroGravity,
  isZeroGravity,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Socials', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'achievements', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Left spacing placeholder */}
        <div className="w-8" />

        {/* Desktop Links (Glass Pill Navigation) */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl glass border border-white/10 shadow-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                data-cursor="pointer"
                onClick={() => soundFX.playClick()}
                className={`relative px-4 py-2 text-[10px] font-mono tracking-[0.25em] uppercase transition-colors duration-200 rounded-xl ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-[#A58B5E]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-[#A58B5E]/20 rounded-xl border border-[#A58B5E]/40"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls (Terminal, Audio, CTA) */}
        <div className="flex items-center gap-2">
          
          {/* Sound Audio FX Toggle */}
          <button
            onClick={onToggleSound}
            data-cursor="pointer"
            title={soundEnabled ? 'Disable UI Sound Effects' : 'Enable UI Sound Effects'}
            className={`p-2.5 rounded-2xl glass transition-all ${
              soundEnabled
                ? 'bg-[#A58B5E]/20 text-[#A58B5E] border-[#A58B5E]/40'
                : 'text-neutral-400 hover:text-white hover:border-[#A58B5E]/30'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* AI Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            data-cursor="pointer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl glass text-xs font-mono text-[#A58B5E] border border-[#A58B5E]/30 hover:bg-[#A58B5E]/10 hover:border-[#A58B5E] transition-all group"
          >
            <Terminal className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform text-[#A58B5E]" />
            <span className="hidden sm:inline tracking-wider uppercase text-[10px] font-bold">Terminal</span>
            <span className="hidden xl:inline text-[9px] px-1.5 py-0.5 rounded bg-[#A58B5E]/15 text-[#A58B5E] border border-[#A58B5E]/30">
              ⌘K
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl glass-card text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-3 p-4 rounded-3xl glass-card border border-white/10 pointer-events-auto flex flex-col gap-2 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  soundFX.playClick();
                }}
                className="px-4 py-3 text-sm font-mono text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
