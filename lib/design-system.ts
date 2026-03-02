// Design System - Luxury Photography Theme
export const designSystem = {
  // Color Palette - Sophisticated & Elegant
  colors: {
    // Primary: Deep Charcoal & Gold Accent
    primary: {
      50: '#fefdf8',
      100: '#fef7e0',
      200: '#fdecc4',
      300: '#fbdb9b',
      400: '#f7c065',
      500: '#f3a73f',
      600: '#e4912a',
      700: '#bd7424',
      800: '#975d26',
      900: '#7a4d22',
    },
    // Secondary: Warm Charcoal
    secondary: {
      50: '#f8f8f8',
      100: '#f0f0f0',
      200: '#e4e4e4',
      300: '#d1d1d1',
      400: '#b4b4b4',
      500: '#9a9a9a',
      600: '#818181',
      700: '#6a6a6a',
      800: '#5a5a5a',
      900: '#4a4a4a',
    },
    // Accent: Sophisticated Teal
    accent: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    // Neutral: Warm Grays
    neutral: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
    }
  },

  // Typography Scale - Elegant & Readable
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
      display: ['Montserrat', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.2rem', letterSpacing: '0.025em' }],
      sm: ['0.875rem', { lineHeight: '1.4rem', letterSpacing: '0.015em' }],
      base: ['1rem', { lineHeight: '1.6rem', letterSpacing: '0.01em' }],
      lg: ['1.125rem', { lineHeight: '1.8rem', letterSpacing: '0.005em' }],
      xl: ['1.25rem', { lineHeight: '1.9rem', letterSpacing: '0em' }],
      '2xl': ['1.5rem', { lineHeight: '2.2rem', letterSpacing: '-0.005em' }],
      '3xl': ['1.875rem', { lineHeight: '2.5rem', letterSpacing: '-0.01em' }],
      '4xl': ['2.25rem', { lineHeight: '2.8rem', letterSpacing: '-0.015em' }],
      '5xl': ['3rem', { lineHeight: '3.2rem', letterSpacing: '-0.02em' }],
      '6xl': ['3.75rem', { lineHeight: '3.8rem', letterSpacing: '-0.025em' }],
      '7xl': ['4.5rem', { lineHeight: '4.5rem', letterSpacing: '-0.03em' }],
      '8xl': ['6rem', { lineHeight: '6rem', letterSpacing: '-0.035em' }],
      '9xl': ['8rem', { lineHeight: '8rem', letterSpacing: '-0.04em' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    }
  },

  // Spacing Scale
  spacing: {
    section: {
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-24',
      xl: 'py-32',
    },
    container: {
      sm: 'px-4',
      md: 'px-6',
      lg: 'px-8',
    }
  },

  // Animation Presets
  animations: {
    fadeInUp: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    fadeInRight: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    scaleIn: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.5, ease: "easeOut" }
    },
    staggerContainer: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.3
        }
      }
    }
  },

  // Component Variants - Luxury Photography Theme
  components: {
    button: {
      primary: "bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-700 text-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary-400/20 hover:border-primary-400/40",
      secondary: "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border-2 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300",
      accent: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300",
      ghost: "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300",
      outline: "border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300",
    },
    card: {
      default: "bg-white dark:bg-neutral-900 rounded-3xl shadow-soft hover:shadow-medium transition-all duration-500 border border-neutral-200/50 dark:border-neutral-800/50",
      elevated: "bg-white dark:bg-neutral-900 rounded-3xl shadow-large hover:shadow-2xl transition-all duration-700 border border-neutral-200/50 dark:border-neutral-800/50 hover:-translate-y-1",
      glass: "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-neutral-800/30 shadow-xl",
      luxury: "bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-3xl shadow-large border border-primary-200/30 dark:border-primary-800/30",
    },
    input: {
      default: "bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl px-4 py-3 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20 transition-all duration-300",
      luxury: "bg-gradient-to-r from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 border-2 border-neutral-200/50 dark:border-neutral-700/50 rounded-2xl px-6 py-4 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20 transition-all duration-300",
    }
  },

  // Layout Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Grid System
  grid: {
    container: 'max-w-7xl mx-auto',
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }
  }
}

// Utility functions for consistent styling
export const getButtonClass = (variant: keyof typeof designSystem.components.button = 'primary') => {
  return `px-6 py-3 rounded-full font-semibold transition-all duration-300 ${designSystem.components.button[variant]}`
}

export const getCardClass = (variant: keyof typeof designSystem.components.card = 'default') => {
  return `p-6 ${designSystem.components.card[variant]}`
}

export const getSectionClass = (size: keyof typeof designSystem.spacing.section = 'lg') => {
  return `w-full ${designSystem.spacing.section[size]}`
}

export const getContainerClass = (size: keyof typeof designSystem.spacing.container = 'md') => {
  return `${designSystem.grid.container} ${designSystem.spacing.container[size]}`
}
