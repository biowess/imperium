import React from 'react';
import { motion } from 'motion/react';
import { Play, Trophy, History, Settings, HelpCircle, Info } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';

export function MainMenu() {
  const setScreen = useStore((s) => s.setScreen);
  const startGame = useStore((s) => s.startGame);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center space-y-10 sm:space-y-12 w-full max-w-md px-6 relative my-auto py-12"
    >
      <div className="text-center space-y-6 relative">
        <motion.h1 
          className="text-6xl md:text-7xl font-serif text-crimson-800 tracking-tight drop-shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          Imperium
        </motion.h1>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400" />
          <div className="w-1.5 h-1.5 rotate-45 bg-crimson-500" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        <p className="text-graphite-700 uppercase tracking-[0.2em] text-xs font-semibold mt-4">
          Precision Sudoku Instrument
        </p>
      </div>

      <div className="flex flex-col space-y-4 w-full bg-imperium-panel/80 backdrop-blur-xl p-8 rounded-none shadow-panel border border-imperium-border">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full text-sm group tracking-widest"
          onClick={() => startGame()}
        >
          <Play className="w-4 h-4 mr-3 text-gold-300 group-hover:text-white transition-colors" />
          Initiate Sequence
        </Button>

        <Button 
          variant="secondary" 
          size="lg" 
          className="w-full text-sm tracking-widest uppercase"
          onClick={() => setScreen('leaderboard')}
        >
          <Trophy className="w-4 h-4 mr-3 text-gold-500" />
          Leaderboard
        </Button>

        <Button 
          variant="secondary" 
          size="lg" 
          className="w-full text-sm tracking-widest uppercase"
          onClick={() => setScreen('history')}
        >
          <History className="w-4 h-4 mr-3 text-crimson-700" />
          Archives
        </Button>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-2 border-t border-imperium-border/50">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-[10px] tracking-widest uppercase text-graphite-700 h-10 px-0 flex-col gap-1"
            onClick={() => setScreen('settings')}
          >
            <Settings className="w-4 h-4" />
            Config
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-[10px] tracking-widest uppercase text-graphite-700 h-10 px-0 flex-col gap-1"
            onClick={() => setScreen('help')}
          >
            <HelpCircle className="w-4 h-4" />
            Manual
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-[10px] tracking-widest uppercase text-graphite-700 h-10 px-0 flex-col gap-1"
            onClick={() => setScreen('about')}
          >
            <Info className="w-4 h-4" />
            Origin
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
