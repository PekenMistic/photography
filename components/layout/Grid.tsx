"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  stagger?: boolean;
}

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

const colClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 3,
  gap = 'lg',
  className,
  animate = true,
  stagger = true,
}) => {
  const gridClass = cn(
    'grid',
    colClasses[cols],
    gapClasses[gap],
    className
  );

  if (animate && stagger) {
    return (
      <motion.div
        className={gridClass}
        variants={designSystem.animations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={designSystem.animations.fadeInUp}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (animate) {
    return (
      <motion.div
        className={gridClass}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={gridClass}>
      {children}
    </div>
  );
};
