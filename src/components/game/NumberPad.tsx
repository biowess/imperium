import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../../store/useStore';
import { Pencil, Lightbulb, Eraser, Play, Pause } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function NumberPad() {
  const placeNumber = useStore(s => s.placeNumber);
  const removeNumber = useStore(s => s.removeNumber);
  const useHint = useStore(s => s.useHint);
  const usedHint = useStore(s => s.usedHint);
  const isPaused = useStore(s => s.isPaused);
  const pauseGame = useStore(s => s.pauseGame);
  const resumeGame = useStore(s => s.resumeGame);
  
  // We strictly subscribe to what is necessary for badge counts
  const puzzle = useStore(s => s.puzzle);
  const userEntries = useStore(s => s.userEntries);
  const solution = useStore(s => s.solution);

  const [isPencilMode, setIsPencilMode] = useState(false);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const getRemaining = (num: number) => {
    let count = 0;
    for (let i = 0; i < 81; i++) {
      const val = puzzle[i] !== 0 ? puzzle[i] : userEntries[i];
      if (val === num && val === solution[i]) {
        count++;
      }
    }
    return 9 - count;
  };

  return (
    <div className="w-full max-w-[420px] flex flex-col gap-2 mt-4 lg:mt-6 shrink-0 z-10 pb-4">
      
      {/* Controls Container - 4 Columns */}
      <div className="grid grid-cols-4 gap-2 w-full p-2 bg-black/5 border border-white/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
        
        <button
          onClick={() => removeNumber()}
          className="control-btn group relative h-12 bg-imperium-surface shadow-key active:shadow-key-pressed active:translate-y-px border border-imperium-border flex items-center justify-center transition-all hover:border-crimson-200"
        >
          <div className="absolute inset-0 border-t border-white pointer-events-none opacity-80" />
          <Eraser className="w-5 h-5 text-graphite-700 group-hover:text-crimson-700" />
        </button>

        <button
          onClick={() => setIsPencilMode(!isPencilMode)}
          className={cn(
            "control-btn group relative h-12 active:shadow-key-pressed active:translate-y-px transition-all flex items-center justify-center border",
            isPencilMode ? "bg-gradient-to-b from-crimson-700 to-crimson-900 border-crimson-800 shadow-glow" : "bg-imperium-surface border-imperium-border shadow-key hover:border-crimson-200"
          )}
        >
          <div className="absolute inset-0 border-t border-white/50 pointer-events-none opacity-80" />
          <Pencil className={cn("w-5 h-5", isPencilMode ? "text-white" : "text-graphite-700 group-hover:text-crimson-700")} />
        </button>

        <button
          onClick={() => useHint()}
          disabled={usedHint}
          className="control-btn group relative h-12 bg-imperium-surface shadow-key active:shadow-key-pressed active:translate-y-px border border-imperium-border flex items-center justify-center transition-all hover:border-gold-300 disabled:opacity-40 disabled:hover:border-imperium-border"
        >
          <div className="absolute inset-0 border-t border-white pointer-events-none opacity-80" />
          <Lightbulb className="w-5 h-5 text-graphite-700 group-hover:text-gold-500" />
        </button>

        <button
          onClick={() => isPaused ? resumeGame() : pauseGame()}
          className="control-btn group relative h-12 bg-imperium-surface shadow-key active:shadow-key-pressed active:translate-y-px border border-imperium-border flex items-center justify-center transition-all hover:border-gold-300"
        >
          <div className="absolute inset-0 border-t border-white pointer-events-none opacity-80" />
          {isPaused ? <Play className="w-5 h-5 text-graphite-700 group-hover:text-gold-500 ml-0.5" /> : <Pause className="w-5 h-5 text-graphite-700 group-hover:text-gold-500" />}
        </button>

      </div>

      {/* Numbers - 5 Columns */}
      <div className="grid grid-cols-5 gap-2 w-full p-2 bg-black/5 border border-white/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
        {numbers.map((num) => {
          const remaining = getRemaining(num);
          const isExhausted = remaining <= 0;

          return (
            <motion.button
              key={num}
              whileHover={{ y: -1 }}
              whileTap={{ y: 1, scale: 0.95, boxShadow: "inset 0 2px 4px rgba(133,22,36,0.1), inset 0 1px 2px rgba(0,0,0,0.05)" }}
              onClick={() => placeNumber(num, isPencilMode)}
              disabled={isExhausted}
              className={cn(
                "numpad-btn relative h-12 sm:h-14 text-2xl font-serif flex items-center justify-center transition-all duration-200 rounded-none",
                isExhausted 
                  ? "bg-imperium-surface/40 border border-imperium-border/50 text-graphite-700/30 shadow-none pointer-events-none"
                  : "bg-imperium-surface border border-imperium-border shadow-key text-graphite-900 hover:text-crimson-800"
              )}
            >
              {/* Inner Glare */}
              {!isExhausted && <div className="absolute inset-0 border-t border-white pointer-events-none opacity-80" />}
              
              {num}

              {/* Number Usage Badge */}
              {!isExhausted && remaining < 9 && (
                 <div className="absolute bottom-1 right-1 text-[9px] font-sans text-crimson-700/60 font-bold bg-crimson-50/50 px-1 border border-crimson-100/50">
                   {remaining}
                 </div>
              )}
            </motion.button>
          );
        })}
        
        {/* Placeholder for the 10th slot to complete the 5x2 grid elegantly */}
        <div className="h-12 sm:h-14 bg-imperium-surface/20 border border-imperium-border/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] pointer-events-none" />
      </div>

    </div>
  );
}
