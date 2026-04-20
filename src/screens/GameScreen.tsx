import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { SudokuBoard } from '../components/game/SudokuBoard';
import { NumberPad } from '../components/game/NumberPad';
import { ChevronLeft, Trophy, Play, Pause } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

export function GameScreen() {
  const timer = useStore(s => s.timer);
  const mistakes = useStore(s => s.mistakes);
  const difficulty = useStore(s => s.difficulty);
  const setScreen = useStore(s => s.setScreen);
  const tickTimer = useStore(s => s.tickTimer);
  const isPaused = useStore(s => s.isPaused);
  const resumeGame = useStore(s => s.resumeGame);
  const pauseGame = useStore(s => s.pauseGame);
  const gameState = useStore(s => s.gameState);
  const abandonGame = useStore(s => s.abandonGame);
  const clearSelection = useStore(s => s.clearSelection);

  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    if (gameState === 'playing') {
      abandonGame();
    }
    setScreen('menu');
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.sudoku-cell') && !target.closest('.numpad-btn') && !target.closest('.control-btn')) {
      clearSelection();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full h-full py-4 sm:py-6 px-4 overflow-hidden"
      onPointerDown={handleContainerClick}
    >
      {/* Top Bar - Chronograph Style */}
      <div className="w-full max-w-[420px] px-2 flex items-center justify-between shrink-0 mb-4 z-10">
        
        <div className="flex gap-2">
          <button 
            onClick={handleBack}
            className="group flex flex-col items-center gap-1 text-graphite-700 hover:text-crimson-800 transition-colors"
          >
            <div className="w-10 h-10 rounded-none bg-imperium-surface shadow-key group-active:shadow-key-pressed border border-imperium-border flex items-center justify-center transition-all">
              <ChevronLeft className="w-5 h-5 text-graphite-800 group-hover:text-crimson-700" />
            </div>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center bg-imperium-surface px-6 py-2 rounded-none shadow-inset-panel border border-imperium-border min-w-[120px]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-crimson-800 font-bold mb-0.5">
            {difficulty}
          </span>
          <span className="text-xl font-mono tracking-widest text-graphite-900 drop-shadow-sm font-semibold">
            {formatTime(timer)}
          </span>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col items-center justify-center gap-1 bg-imperium-surface border border-imperium-border w-14 h-10 shadow-inset-panel rounded-none">
            <div className="text-[8px] text-graphite-700 uppercase tracking-widest font-bold leading-none mt-1">Errors</div>
            <div className={cn("text-sm font-mono font-medium drop-shadow-sm leading-none mb-1", mistakes >= 2 ? "text-crimson-600" : "text-graphite-900")}>
              {mistakes}/3
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 min-h-0 w-full max-w-[420px] shrink flex flex-col items-center justify-center">
        <SudokuBoard />
        
        <AnimatePresence>
          {isPaused && gameState === 'playing' && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-[-10px] bg-graphite-900/60 z-20 flex flex-col items-center justify-center rounded-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-400 mb-2">System Suspended</span>
              <span className="text-3xl font-serif text-white mb-8 tracking-wide drop-shadow-md">Paused</span>
              <Button onClick={() => resumeGame()} variant="primary" size="lg" className="px-12">
                Resume Game
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NumberPad />

      <AnimatePresence>
        {(gameState === 'won' || gameState === 'lost') && (
          <ResultModal result={gameState} time={timer} onMenu={() => setScreen('menu')} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ResultModal({ result, time, onMenu }: { result: string, time: number, onMenu: () => void }) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-graphite-900/50 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-imperium-panel p-10 rounded-none shadow-board max-w-[360px] w-full text-center border border-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-none bg-crimson-50 flex items-center justify-center mb-6 shadow-inset-panel border border-crimson-100">
             <Trophy className={cn("w-8 h-8", result === 'won' ? "text-gold-500" : "text-graphite-400")} />
          </div>
          
          <h2 className="text-4xl font-serif text-graphite-900 mb-3 tracking-tight">
            {result === 'won' ? 'Victory' : 'Defeat'}
          </h2>
          
          <p className="text-graphite-700/80 mb-8 text-sm leading-relaxed px-4">
            {result === 'won' 
              ? `Puzzle solved in ${formatTime(time)}. A truly precise operation.`
              : 'Maximum errors reached. The sequence was terminated.'}
          </p>

          <Button onClick={onMenu} variant="primary" className="w-full">
            Return to Protocol
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
