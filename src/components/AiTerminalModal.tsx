import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal as TerminalIcon, Send, Sparkles, CornerDownLeft, Bot, User, Trash2 } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface AiTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerMatrix: () => void;
  onTriggerKonami: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
}

export const AiTerminalModal: React.FC<AiTerminalModalProps> = ({
  isOpen,
  onClose,
  onTriggerMatrix,
  onTriggerKonami,
}) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'system',
      text: `Type nyxl --help to see the commands`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleCommandOrSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || loading) return;

    soundFX.playClick();
    setInput('');

    // User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);

    const lower = textToSend.toLowerCase().trim();
    const cleanCmd = lower.replace(/^nyxl\s*(--)?/, '').trim();

    // System CLI command handlers
    if (cleanCmd === 'help' || cleanCmd === '?' || lower === 'nyxl') {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'system',
          text: `AVAILABLE COMMANDS:\n • help        - Show CLI command list\n • skills      - List technical stack\n • projects    - List flagship projects\n • contact     - Show contact info & socials\n • matrix      - Trigger matrix digital rain\n • clear       - Clear terminal output`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    if (cleanCmd === 'clear') {
      setMessages([]);
      return;
    }

    if (cleanCmd === 'matrix') {
      onTriggerMatrix();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'system',
          text: `[SYSTEM] Matrix code rain canvas sequence initialized! Press ESC to exit rain.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    if (cleanCmd === 'skills' || cleanCmd === 'tech') {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'system',
          text: `TECHNICAL STACK:\n • Frontend: React, TypeScript, Tailwind CSS, Motion/GSAP, WebGL/Three.js\n • Backend & Services: Node.js, Express, Python, Vercel, Netlify, Telegram Bot API\n • Domain: AI Development & Web Engineering`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    if (cleanCmd === 'projects' || cleanCmd === 'work') {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'system',
          text: `PROJECTS BY ALISHER OZODOV:\n 1. Techify - Tech Products Store (https://github.com/alisherozodov/techify)\n 2. The Aurora Group - Debate & Speaking Night Events (https://theauroragroup.vercel.app)\n 3. The Uzbekistan Times - News Portal (https://theuzbekistantimes.netlify.app)\n 4. SAT Yangiaryk - SAT Prep Centre Site (https://satyangiaryk.vercel.app)\n 5. Turbocoin - Clicker Web App (https://turboclicker.netlify.app/)\n 6. Zakovat Bot - Telegram Quiz Bot (https://t.me/zakovatazavr_bot)\n 7. Robocoder - Robotics & Coding Site (https://ss-robocoder.netlify.app)`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    if (cleanCmd === 'contact' || cleanCmd === 'socials') {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'system',
          text: `CONTACT & SOCIALS:\n • Telegram: @nyxlvoid (https://t.me/nyxlvoid)\n • GitHub: alisherozodov (https://github.com/alisherozodov)\n • LinkedIn: alisherozodov (https://linkedin.com/in/alisherozodov)\n • X: alisherozodov (https://x.com/alisherozodov)\n • Email: aiisher.ozodoff@gmail.com`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }

    // Call Server-side Gemini AI Endpoint for arbitrary questions
    setLoading(true);
    let replyText = "";
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });
      if (res.ok) {
        const data = await res.json();
        replyText = data.reply || data.error || "";
      }
    } catch (err) {
      console.warn("API route unavailable, using client fallback", err);
    }

    if (!replyText) {
      replyText = getClientFallbackReply(textToSend);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setLoading(false);
  };

  function getClientFallbackReply(inputMsg: string): string {
    const m = (inputMsg || "").trim().toLowerCase();
    
    if (m === 'help' || m === 'nyxl --help') {
      return "Commands you can try: 'skills', 'projects', 'contact', 'matrix', 'clear'. Or ask about Alisher's projects and experience.";
    }
    if (m.includes('project') || m.includes('portfolio') || m.includes('work')) {
      return "Alisher's built projects like Techify, The Aurora Group, SAT Yangiaryk, Turbocoin, Zakovat Bot, and Robocoder. Type 'projects' to check them out.";
    }
    if (m.includes('skill') || m.includes('stack') || m.includes('tech')) {
      return "Main stack includes Python, TypeScript, React, Node.js, PyTorch, Tailwind, and FastAPI.";
    }
    if (m.includes('contact') || m.includes('social') || m.includes('reach') || m.includes('email')) {
      return "Reach Alisher on Telegram @nyxlvoid, GitHub @alisherozodov, or via email at aiisher.ozodoff@gmail.com.";
    }
    if (m.includes('who am i') || m.includes('who am i?')) {
      return "You're a guest visiting Alisher's terminal portfolio workspace. Welcome.";
    }
    if (m.includes('who are you') || m.includes('who r u') || m.includes('what are you')) {
      return "I'm Nyxl, a nonchalant AI running inside this portfolio terminal. What's on your mind?";
    }
    if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('sup') || m.includes('yo')) {
      return "Hey, what's up? Ask me about projects, tech stack, or anything else.";
    }
    
    return `Got it: "${inputMsg}". I'm Nyxl, feel free to ask about Alisher's projects, skills, or run 'help' for terminal commands.`;
  }

  const presetPrompts = [
    "Summarize Alisher's projects",
    "What achievements does Alisher have?",
    "Tell me about Alisher's education",
    "matrix"
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl h-[620px] rounded-3xl glass border border-[#A58B5E]/30 bg-[#070707] shadow-[0_0_50px_rgba(165,139,94,0.15)] flex flex-col z-10 overflow-hidden scanlines"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#050505] border-b border-[#A58B5E]/20">
            <div className="flex items-center gap-3">
              <TerminalIcon className="w-4 h-4 text-[#A58B5E]" />
              <span className="font-mono text-xs text-[#A58B5E] font-bold uppercase tracking-widest">
                Nyxl CLI
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMessages([])}
                title="Clear screen"
                className="text-neutral-400 hover:text-[#A58B5E] text-xs transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-auto p-6 font-mono text-xs space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                  {msg.sender === 'user' && <span className="text-[#A58B5E]">User</span>}
                  {msg.sender === 'ai' && <span className="text-[#A58B5E] flex items-center gap-1"><Bot className="w-3 h-3" /> Gemini AI</span>}
                  {msg.sender === 'system' && <span className="text-amber-400">System</span>}
                  <span>[{msg.timestamp}]</span>
                </div>
                <div className={`p-3 rounded-xl whitespace-pre-wrap leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#A58B5E]/10 text-neutral-200 border border-[#A58B5E]/30'
                    : msg.sender === 'ai'
                    ? 'bg-[#A58B5E]/15 text-white border border-[#A58B5E]/40'
                    : 'bg-white/5 text-neutral-300 border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-[#A58B5E] font-mono text-xs animate-pulse">
                <Bot className="w-4 h-4" />
                <span>Gemini AI is processing response...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* ZSH Style Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommandOrSend();
            }}
            className="p-4 bg-[#050505] border-t border-[#A58B5E]/20 flex items-center gap-2 font-mono text-xs"
          >
            <div className="flex items-center gap-1 select-none shrink-0">
              <span className="text-emerald-400 font-bold">➜</span>
              <span className="text-cyan-400 font-bold">~</span>
              <span className="text-[#A58B5E] font-bold">guest</span>
              <span className="text-neutral-400 font-bold">%</span>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="nyxl --help"
              className="flex-1 bg-transparent text-neutral-100 font-mono text-xs focus:outline-none placeholder:text-neutral-600 pl-1"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-full bg-[#A58B5E] hover:bg-[#b89c6c] disabled:opacity-40 text-[#050505] transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
