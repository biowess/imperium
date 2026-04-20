import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ThemeIntensity } from '../../store/useStore';

export const SakuraParticles = React.memo(({ intensity }: { intensity: ThemeIntensity }) => {
  const count = useMemo(() => {
    switch (intensity) {
      case 'ultra': return 15; // capped for CPU/GPU perf
      case 'balanced': return 8;
      case 'minimal': return 3;
      default: return 0;
    }
  }, [intensity]);

  if (count === 0) return null;

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 15,
      scale: 0.3 + Math.random() * 0.5,
      rotation: Math.random() * 360,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-3 h-4 bg-crimson-400 rounded-tl-full rounded-br-full opacity-40 mix-blend-multiply"
          style={{ willChange: "transform, opacity" }}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            rotate: p.rotation,
            scale: p.scale,
          }}
          animate={{
            y: '110vh',
            x: `${p.x + (Math.random() * 10 - 5)}vw`,
            rotate: p.rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
});
