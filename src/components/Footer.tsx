import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data';
import { Github, Linkedin, Twitter, Mail, Send, ArrowUp, Check } from 'lucide-react';
import { soundFX } from '../utils/sound';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    soundFX.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`, '_blank');
  };

  const socialLinks = [
    {
      name: 'Telegram',
      href: PERSONAL_INFO.telegram,
      icon: Send,
      username: '@nyxlvoid',
      onClick: undefined
    },
    {
      name: 'GitHub',
      href: PERSONAL_INFO.github,
      icon: Github,
      username: 'alisherozodov',
      onClick: undefined
    },
    {
      name: 'LinkedIn',
      href: PERSONAL_INFO.linkedin,
      icon: Linkedin,
      username: 'alisherozodov',
      onClick: undefined
    },
    {
      name: 'X',
      href: PERSONAL_INFO.twitter,
      icon: Twitter,
      username: 'alisherozodov',
      onClick: undefined
    },
    {
      name: 'Email',
      href: '#',
      icon: copied ? Check : Mail,
      username: PERSONAL_INFO.email,
      onClick: handleEmailClick
    }
  ];

  return (
    <footer id="contact" className="py-16 px-4 sm:px-8 bg-[#050505] relative border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-10">
        
        {/* Minimal Socials Header */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-[#A58B5E] uppercase tracking-[0.3em] font-semibold block">
            SOCIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Connect
          </h2>
        </div>

        {/* Minimal Icon Row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.onClick ? '_self' : '_blank'}
              rel="noreferrer"
              data-cursor="pointer"
              title={`${s.name}: ${s.username}`}
              onClick={(e) => {
                if (s.onClick) {
                  s.onClick(e);
                } else {
                  soundFX.playClick();
                }
              }}
              className="p-4 rounded-2xl glass text-neutral-400 hover:text-[#A58B5E] hover:border-[#A58B5E]/40 border border-white/10 transition-all hover:scale-110 flex items-center gap-2 group"
            >
              <s.icon className="w-5 h-5 text-[#A58B5E] group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs text-neutral-300 group-hover:text-white transition-colors">
                {s.name === 'Email' && copied ? 'Copied & Opening Gmail!' : s.name}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom Line */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            made with ❤️ by nyxlvoid
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="pointer"
            className="p-2 px-4 rounded-full glass text-neutral-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 uppercase text-[10px] font-mono tracking-widest"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#A58B5E]" />
          </button>
        </div>

      </div>
    </footer>
  );
};

