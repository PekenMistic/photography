"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient' | 'glass' | 'luxury' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  animate?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary: 'bg-gradient-to-r from-luxury-charcoal-900 to-luxury-charcoal-800 hover:from-luxury-charcoal-800 hover:to-luxury-charcoal-700 text-white shadow-luxury hover:shadow-glow border border-luxury-gold-400/20 hover:border-luxury-gold-400/40',
  secondary: 'bg-white dark:bg-luxury-charcoal-900 text-luxury-charcoal-900 dark:text-white border-2 border-luxury-charcoal-300 dark:border-luxury-charcoal-700 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-800 shadow-luxury hover:shadow-luxury-lg',
  ghost: 'text-luxury-charcoal-700 dark:text-luxury-charcoal-300 hover:bg-luxury-charcoal-100 dark:hover:bg-luxury-charcoal-800',
  outline: 'border-2 border-luxury-charcoal-300 dark:border-luxury-charcoal-700 text-luxury-charcoal-700 dark:text-luxury-charcoal-300 hover:bg-luxury-charcoal-50 dark:hover:bg-luxury-charcoal-800',
  gradient: 'bg-gradient-to-r from-luxury-gold-500 to-luxury-teal-500 hover:from-luxury-gold-600 hover:to-luxury-teal-600 text-white shadow-luxury-lg hover:shadow-glow-lg',
  glass: 'bg-white/80 dark:bg-luxury-charcoal-900/80 backdrop-luxury border border-luxury-charcoal-200/30 dark:border-luxury-charcoal-800/30 text-luxury-charcoal-900 dark:text-white hover:bg-white/90 dark:hover:bg-luxury-charcoal-900/90',
  luxury: 'bg-gradient-to-br from-luxury-gold-50 to-luxury-teal-50 dark:from-luxury-gold-900/10 dark:to-luxury-teal-900/10 border border-luxury-gold-200/50 dark:border-luxury-gold-800/50 text-luxury-charcoal-900 dark:text-luxury-charcoal-100 hover:shadow-luxury',
  accent: 'bg-gradient-to-r from-luxury-teal-500 to-luxury-gold-500 hover:from-luxury-teal-600 hover:to-luxury-gold-600 text-white shadow-luxury hover:shadow-glow',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  animate = true,
  glow = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const buttonClass = cn(
    'relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-luxury-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    glow && 'shadow-glow-lg',
    className
  );

  const content = (
    <>
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  if (animate) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-block"
      >
        <button
          className={buttonClass}
          disabled={disabled || loading}
          {...props}
        >
          {content}
        </button>
      </motion.div>
    );
  }

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};
