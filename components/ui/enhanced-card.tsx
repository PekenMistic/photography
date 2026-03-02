"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient' | 'bordered';
  hover?: boolean;
  animate?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

const variants = {
  default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md',
  elevated: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl',
  glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
  gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg',
  bordered: 'bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 shadow-md',
};

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const hoverEffects = {
  default: 'hover:shadow-lg hover:-translate-y-1',
  elevated: 'hover:shadow-2xl hover:-translate-y-2',
  glass: 'hover:bg-white/20',
  gradient: 'hover:shadow-xl hover:-translate-y-1',
  bordered: 'hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg hover:-translate-y-1',
};

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className,
  variant = 'default',
  hover = true,
  animate = true,
  padding = 'md',
  onClick,
}) => {
  const cardClass = cn(
    'rounded-2xl transition-all duration-300',
    variants[variant],
    paddings[padding],
    hover && hoverEffects[variant],
    onClick && 'cursor-pointer',
    className
  );

  const content = (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={hover ? { y: -4 } : undefined}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

// Card sub-components
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
);

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const titleSizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className, 
  size = 'md' 
}) => (
  <h3 className={cn(
    'font-bold text-gray-900 dark:text-white',
    titleSizes[size],
    className
  )}>
    {children}
  </h3>
);

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ 
  children, 
  className 
}) => (
  <p className={cn(
    'text-gray-600 dark:text-gray-300 leading-relaxed',
    className
  )}>
    {children}
  </p>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={cn('', className)}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={cn('mt-6 pt-4 border-t border-gray-200 dark:border-gray-700', className)}>
    {children}
  </div>
);
