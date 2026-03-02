"use client";

import React from 'react';
import { motion } from 'framer-motion';

import { cn } from "@/lib/utils"
import { getSectionClass, getContainerClass } from '@/lib/design-system';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'gray' | 'gradient' | 'dark' | 'transparent';
  animate?: boolean;
  id?: string;
}

const backgroundClasses = {
  white: 'bg-white dark:bg-gray-900',
  gray: 'bg-gray-50 dark:bg-gray-800',
  gradient: 'bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900',
  dark: 'bg-gray-900 text-white',
  transparent: 'bg-transparent',
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  containerClassName,
  size = 'lg',
  background = 'transparent',
  animate = true,
  id,
}) => {
  const sectionClass = getSectionClass(size);
  const containerClass = getContainerClass();

  const content = (
    <section
      id={id}
      className={cn(
        sectionClass,
        backgroundClasses[background],
        className
      )}
    >
      <div className={cn(containerClass, containerClassName)}>
        {children}
      </div>
    </section>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

