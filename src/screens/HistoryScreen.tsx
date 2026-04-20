import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export function HistoryScreen() {
  const setScreen = useStore((s) => s.setScreen);
  const history = useStore((s) => s.history);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (ms: number) => {
    const d = new Date(ms);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md px-6 flex flex-col h-full overflow-hidden py-12 relative pb-24"
    >
      <div className="flex items-center mb-8 relative shrink-0">
        <button 
          onClick={() => setScreen('menu')}
          className="absolute left-0 p-2 -ml-2 text-graphite-700 hover:text-crimson-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-serif text-graphite-900 tracking-tight">Archives</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-crimson-800/80 mt-1">Operational Ledger</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-8 scrollbar-hide pr-2 -mr-2">
        {history.length === 0 ? (
          <div className="text-center mt-12 text-graphite-700/60 font-medium">
            The archive is empty.
          </div>
        ) : (
          history.map((entry, i) => (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.5) }}
              className={cn(
                "p-5 rounded-none shadow-key border bg-imperium-panel flex justify-between items-center relative overflow-hidden",
                entry.result === 'won' ? "border-gold-300/40" : 
                entry.result === 'lost' ? "border-crimson-300/50" : "border-imperium-border"
              )}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/60 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col">
                <div className="text-[10px] font-bold uppercase tracking-widest text-crimson-700 mb-1">
                  {entry.difficulty}
                </div>
                <div className="text-xs text-graphite-700/70 mb-2 font-mono">
                  {formatDate(entry.date)}
                </div>
                <div className="text-sm font-medium text-graphite-900 uppercase tracking-widest">
                  {entry.result}
                </div>
              </div>
              <div className="text-right relative z-10">
                <div className="text-2xl font-mono tracking-wider font-semibold text-graphite-900 drop-shadow-sm">
                  {formatTime(entry.time)}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-crimson-800/80 mt-2 font-bold">
                  {entry.mistakes} Errors
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
