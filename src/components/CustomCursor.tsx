import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundFX } from '../utils/sound';

interface CustomCursorProps {
  enabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const hoverable = target.closest('a, button, [data-cursor], input, [role="button"]');
        if (hoverable) {
          if (!isHovered) {
            setIsHovered(true);
            soundFX.playHover();
          }
        } else if (isHovered) {
          setIsHovered(false);
        }
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      soundFX.playClick();
    };
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled, isHovered]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Subtle Precision Ring */}
      <motion.div
        className={`absolute rounded-full border border-[#A58B5E]/60 transition-colors duration-200 ${
          isHovered ? 'border-[#A58B5E] bg-[#A58B5E]/10' : ''
        }`}
        animate={{
          x: mousePos.x - 12,
          y: mousePos.y - 12,
          width: 24,
          height: 24,
          scale: isClicking ? 0.75 : isHovered ? 1.25 : 1
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.4 }}
      />

      {/* Center Precision Gold Dot */}
      <motion.div
        className="absolute w-2 h-2 bg-[#A58B5E] rounded-full shadow-[0_0_10px_rgba(165,139,94,0.8)]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isClicking ? 1.4 : isHovered ? 1.2 : 1
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 450 }}
      />
    </div>
  );
};
