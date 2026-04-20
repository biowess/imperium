import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { SudokuCell } from './SudokuCell';

export const SudokuBoard = React.memo(() => {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={boardRef}
      className="p-1 sm:p-2 bg-imperium-surface shadow-board ring-1 ring-white relative overflow-hidden rounded-none aspect-square w-full max-w-[420px] max-h-full mx-auto"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Texture overlays */}
      <div className="absolute inset-0 wood-texture mix-blend-overlay pointer-events-none opacity-[0.15]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-crimson-900/5 to-gold-400/5 pointer-events-none" />
      
      {/* Board Edge */}
      <div className="relative grid grid-cols-9 grid-rows-9 gap-0 border-[3px] border-graphite-900 overflow-hidden bg-imperium-bg w-full h-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]">
        {Array.from({ length: 81 }).map((_, i) => (
          <SudokuCell key={i} index={i} />
        ))}
      </div>
    </motion.div>
  );
});
