import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    // Increased precision and depth in base styling
    const baseStyles = "inline-flex relative overflow-hidden items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
    
    const variants = {
      primary: "bg-gradient-to-b from-crimson-700 to-crimson-900 text-white shadow-key hover:shadow-glow hover:from-crimson-600 hover:to-crimson-800 border-t border-crimson-500 border-b border-graphite-900 uppercase tracking-widest text-sm font-semibold",
      secondary: "bg-gradient-to-b from-imperium-surface to-[#f5efeb] text-graphite-800 shadow-key hover:shadow-[0_4px_12px_rgba(223,179,107,0.15)] border-t border-white border-b border-imperium-border hover:text-crimson-800 font-medium",
      ghost: "text-graphite-700 hover:bg-crimson-100/30 hover:text-crimson-800",
      icon: "bg-imperium-surface text-graphite-800 shadow-key hover:shadow-gold-glow hover:text-crimson-700 border border-imperium-border",
    };

    const sizes = {
      sm: "h-9 px-5 text-xs rounded-none",
      md: "h-12 px-8 text-sm rounded-none",
      lg: "h-14 px-10 text-sm rounded-none",
      icon: "h-12 w-12 rounded-none",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ y: 1, scale: 0.98, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
        {/* Subtle top glare line for mechanical feel */}
        {variant !== 'ghost' && (
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
