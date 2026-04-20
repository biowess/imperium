/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import { Layout } from './components/ui/Layout';
import { MainMenu } from './screens/MainMenu';
import { GameScreen } from './screens/GameScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { HelpScreen } from './screens/HelpScreen';
import { AnimatePresence, motion } from 'motion/react';

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500); // 2.5s splash
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-imperium-bg overflow-hidden"
    >
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.4] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-crimson-800/10 blur-3xl rounded-full" />
      
      <div className="relative z-10 flex flex-col items-center flex-1 justify-center">
        <motion.h1 
          initial={{ opacity: 0, tracking: "0em" }}
          animate={{ opacity: 1, tracking: "0.05em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-serif text-crimson-800 tracking-tight drop-shadow-sm mb-8"
        >
          Imperium
        </motion.h1>

        {/* Loading Scanner */}
        <div className="w-32 h-[1px] bg-imperium-border relative overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-gold-glow"
          />
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 pb-8 text-center"
      >
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-graphite-900 border border-imperium-border px-4 py-2 bg-imperium-surface shadow-key">
          BIOWESS 2026
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const screen = useStore((s) => s.screen);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <>
            {screen === 'menu' && <MainMenu key="menu" />}
            {screen === 'game' && <GameScreen key="game" />}
            {screen === 'leaderboard' && <LeaderboardScreen key="leaderboard" />}
            {screen === 'history' && <HistoryScreen key="history" />}
            {screen === 'settings' && <SettingsScreen key="settings" />}
            {screen === 'about' && <AboutScreen key="about" />}
            {screen === 'help' && <HelpScreen key="help" />}
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
