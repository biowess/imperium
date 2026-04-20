import React from 'react';
import { useStore } from '../../store/useStore';
import { SakuraParticles } from './SakuraParticles';

export function Layout({ children }: { children: React.ReactNode }) {
  const themeIntensity = useStore((s) => s.themeIntensity);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-imperium-bg selection:bg-crimson-200 text-graphite-900 font-sans flex flex-col items-center justify-start">
      
      {/* Circuit Grid - GPU accelerated bounds using a fixed CSS gradient */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.25] mix-blend-multiply pointer-events-none" />
      
      {/* Deep Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-imperium-bg/50 to-imperium-bg pointer-events-none z-0" />

      {/* Holographic scanning line */}
      {themeIntensity !== 'performance' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="w-full h-[15vh] bg-gradient-to-b from-transparent via-crimson-600/5 to-transparent animate-scan" />
        </div>
      )}

      {/* Ambient particles (Opt-in only based on performance setting) */}
      {themeIntensity !== 'performance' && (
        <SakuraParticles intensity={themeIntensity} />
      )}

      {/* Content wrapper */}
      <main className="relative z-10 w-full max-w-2xl mx-auto h-full flex flex-col items-center overflow-x-hidden overflow-y-auto no-scrollbar">
        {children}
      </main>

    </div>
  );
}
