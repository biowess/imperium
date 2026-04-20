import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export function HelpScreen() {
  const setScreen = useStore((s) => s.setScreen);

  const sections = [
    {
      title: "Grid Rules",
      content: "Sudoku is played on a 9x9 grid, divided into nine 3x3 subgrids called 'boxes'. The objective is to fill the empty cells with digits from 1 to 9."
    },
    {
      title: "How to Play",
      content: "Each row, column, and 3x3 box must contain the digits 1 through 9 exactly once. No duplicates are allowed in any of these three structures."
    },
    {
      title: "Mistakes",
      content: "Placing a number that directly conflicts with the solution registers as an error. If three errors are accumulated, the protocol terminates and the game is lost."
    },
    {
      title: "Hints",
      content: "A single tactical hint can be requested per session. Activating the lightbulb will reveal the exact correct digit for your currently selected cell."
    },
    {
      title: "Pencil Mode",
      content: "Activate the Pencil icon to draft potential numbers into a cell without committing them. This is essential for solving complex patterns."
    },
    {
      title: "Highlighting",
      content: "Selecting any populated cell will cause all identical numbers across the grid to illuminate, aiding in visual cross-referencing."
    },
    {
      title: "Timer and Progress",
      content: "The chronograph begins the moment you initiate the sequence. Your final time determines your rank in the leaderboard archives upon victory."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md px-6 flex flex-col h-full overflow-hidden py-12 relative pb-24"
    >
      <div className="flex items-center mb-8 relative shrink-0 z-10">
        <button 
          onClick={() => setScreen('menu')}
          className="absolute left-0 p-2 -ml-2 text-graphite-700 hover:text-crimson-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-serif text-graphite-900 tracking-tight">Manual</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-600 mt-1">Operator Guide</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-8 pr-2 -mr-2 scrollbar-hide z-10 text-graphite-800">
        
        {sections.map((sec, idx) => (
          <div key={idx} className="bg-imperium-panel p-5 rounded-none border border-imperium-border shadow-key relative overflow-hidden group hover:border-gold-300 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-crimson-700/20 group-hover:bg-crimson-500 transition-colors" />
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-graphite-900 mb-2 drop-shadow-sm ml-2">
              {sec.title}
            </h3>
            <p className="text-xs font-serif leading-relaxed text-graphite-700/90 ml-2">
              {sec.content}
            </p>
          </div>
        ))}

      </div>
    </motion.div>
  );
}
