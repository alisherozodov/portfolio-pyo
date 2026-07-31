import confetti from 'canvas-confetti';
import { soundFX } from './sound';

export function setupKonamiListener(onUnlock: () => void) {
  const konamiSequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  let currentIndex = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const targetKey = konamiSequence[currentIndex].length === 1
      ? konamiSequence[currentIndex].toLowerCase()
      : konamiSequence[currentIndex];

    if (key === targetKey) {
      currentIndex++;
      if (currentIndex === konamiSequence.length) {
        // Trigger Easter Egg!
        soundFX.playEasterEgg();
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
        onUnlock();
        currentIndex = 0;
      }
    } else {
      currentIndex = 0;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}
