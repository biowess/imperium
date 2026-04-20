import React from 'react';
import { motion } from 'motion/react';
import { useStore, Difficulty, ThemeIntensity } from '../store/useStore';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { cn } from '../lib/utils';

export function SettingsScreen() {
  const {
    setScreen,
    defaultDifficulty, setDefaultDifficulty,
    themeIntensity, setThemeIntensity,
    clearHistory, resetLeaderboard
  } = useStore();

  const [confirmConfig, setConfirmConfig] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const closeConfirm = () => setConfirmConfig(null);
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
  const themes: { value: ThemeIntensity; label: string }[] = [
    { value: 'ultra', label: 'Ultra' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'performance', label: 'Performance' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md px-6 flex flex-col h-full overflow-hidden py-12 relative pb-24"
    >
      <ConfirmModal 
        isOpen={!!confirmConfig}
        title={confirmConfig?.title || ''}
        message={confirmConfig?.message || ''}
        onConfirm={() => {
          confirmConfig?.onConfirm();
          closeConfirm();
        }}
        onCancel={closeConfirm}
      />

      <div className="flex items-center mb-10 relative shrink-0">
        <button 
          onClick={() => setScreen('menu')}
          className="absolute left-0 p-2 -ml-2 text-graphite-700 hover:text-crimson-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-serif text-graphite-900 tracking-tight">Configuration</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-crimson-800/80 mt-1">System Settings</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pb-8 pr-2 -mr-2 scrollbar-hide">
        
        {/* Difficulty */}
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-graphite-700 mb-3 ml-2 drop-shadow-sm">Default Protocol</h3>
          <div className="bg-imperium-panel p-1.5 rounded-none flex shadow-key border border-imperium-border">
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setDefaultDifficulty(d)}
                className={cn(
                  "flex-1 py-3 rounded-none text-xs font-bold tracking-widest transition-all uppercase",
                  defaultDifficulty === d 
                    ? "bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-gold-glow -my-0.5 z-10 border border-gold-300" 
                    : "text-graphite-700 hover:bg-black/5"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </section>

        {/* Visuals */}
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-graphite-700 mb-3 ml-2 drop-shadow-sm">Visual Fidelity</h3>
          <div className="bg-imperium-panel p-1.5 rounded-none flex flex-col gap-1 border border-imperium-border shadow-key">
            {themes.map(t => (
              <button
                key={t.value}
                onClick={() => setThemeIntensity(t.value)}
                className={cn(
                  "w-full text-left px-5 py-3 rounded-none text-xs tracking-widest uppercase font-bold transition-all border",
                  themeIntensity === t.value 
                    ? "bg-crimson-50 text-crimson-800 border-crimson-200 shadow-inset-panel" 
                    : "text-graphite-700 border-transparent hover:bg-black/5 hover:text-graphite-900"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-graphite-800/50 mt-3 ml-2 uppercase tracking-wide leading-relaxed font-semibold">
            Performance drops ambient particles and heavy background processing.
          </p>
        </section>

        {/* Data */}
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-graphite-700 mb-3 ml-2 drop-shadow-sm">Data Core</h3>
          <div className="space-y-3">
            <Button
              variant="secondary"
              className="w-full justify-center font-bold tracking-widest text-xs uppercase shadow-none border border-imperium-border"
              onClick={() => {
                setConfirmConfig({
                  title: 'Clear History',
                  message: 'This action will permanently delete all saved history data.',
                  onConfirm: clearHistory
                });
              }}
            >
              Purge Archives
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-center font-bold tracking-widest text-xs uppercase shadow-none border border-imperium-border text-crimson-800"
              onClick={() => {
                setConfirmConfig({
                  title: 'Reset Leaderboard',
                  message: 'This action will permanently delete all saved leaderboard data.',
                  onConfirm: resetLeaderboard
                });
              }}
            >
              Reset Leaderboards
            </Button>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
