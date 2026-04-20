import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { ChevronLeft } from 'lucide-react';

export function AboutScreen() {
  const setScreen = useStore((s) => s.setScreen);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md px-6 flex flex-col h-full overflow-hidden py-12 relative pb-24"
    >
      <div className="flex items-center mb-4 relative shrink-0">
        <button 
          onClick={() => setScreen('menu')}
          className="absolute left-0 p-2 -ml-2 text-graphite-700 hover:text-crimson-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-serif text-graphite-900 tracking-tight">Origin</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-crimson-800/80 mt-1">Product Lore</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-2 -mr-2 scrollbar-hide text-graphite-800">
        
        <div className="bg-imperium-panel p-6 rounded-none border border-imperium-border shadow-key text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-600">The Inspiration</h3>
            
            <p className="font-serif italic text-base leading-relaxed text-graphite-900">
              Forged in pursuit of total precision, the aesthetic and identity of Imperium blossom from a profound dedication to <span className="font-[cursive] text-crimson-700 font-bold ml-1 text-xl">Molk</span>.
            </p>
            
            <div className="h-[1px] w-12 bg-imperium-border mx-auto my-2" />
            
            <p className="text-[10px] leading-relaxed uppercase tracking-widest text-graphite-700/80">
              The crimson and sakura themes stand as a quiet testament to her elegance, a fusion of structured mechanical logic and organic warmth. Every interaction reflects the balance she brings.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-4 space-y-1 opacity-60">
          <div className="w-3 h-3 border border-crimson-800/40 rotate-45 mb-1" />
          <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-graphite-900">BIOWESS &copy; 2026</div>
          <div className="text-[8px] tracking-widest text-graphite-600 uppercase">Precision Architecture</div>
        </div>

      </div>
    </motion.div>
  );
}
