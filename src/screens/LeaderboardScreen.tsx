import React from 'react';
import { motion } from 'motion/react';
import { useStore, Difficulty } from '../store/useStore';
import { ChevronLeft, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

export function LeaderboardScreen() {
  const setScreen = useStore((s) => s.setScreen);
  const leaderboard = useStore((s) => s.leaderboard);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const difficulties: Difficulty[] = ['hard', 'medium', 'easy'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md px-6 flex flex-col h-full overflow-hidden py-12 relative pb-24"
    >
      <div className="flex items-center mb-12 relative shrink-0">
        <button 
          onClick={() => setScreen('menu')}
          className="absolute left-0 p-2 -ml-2 text-graphite-700 hover:text-crimson-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-serif text-graphite-900 tracking-tight">Records</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-600/80 mt-1">Best Times</span>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pb-8 pr-2 -mr-2 scrollbar-hide">
        {difficulties.map((diff, index) => (
          <motion.div 
            key={diff}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            className="group relative bg-imperium-panel p-6 rounded-none shadow-key border border-imperium-border flex items-center justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/60 pointer-events-none" />
            
            <div className="flex flex-col relative z-10">
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-crimson-700/80 mb-2">
                {diff} Protocol
              </span>
              <span className="text-4xl font-mono tracking-wider font-medium text-graphite-900 drop-shadow-sm">
                {formatTime(leaderboard[diff])}
              </span>
            </div>
            
            <div className={cn(
              "relative z-10 w-14 h-14 flex items-center justify-center shadow-inset-panel border border-white transition-all duration-300 rounded-none",
              leaderboard[diff] !== null ? "bg-gradient-to-br from-gold-300 to-gold-500 shadow-gold-glow" : "bg-imperium-surface"
            )}>
              <Trophy className={cn("w-6 h-6", leaderboard[diff] !== null ? "text-white" : "text-graphite-400")} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
