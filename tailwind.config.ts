import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'hero-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      backdropBlur: {
        xs: '2px',
      },
      backdropFilter: {
        'luxury': 'blur(16px) saturate(180%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(28, 25, 23, 0.07), 0 10px 20px -2px rgba(28, 25, 23, 0.04)',
        'medium': '0 4px 25px -5px rgba(28, 25, 23, 0.1), 0 10px 10px -5px rgba(28, 25, 23, 0.04)',
        'large': '0 10px 40px -10px rgba(28, 25, 23, 0.15), 0 20px 25px -5px rgba(28, 25, 23, 0.1)',
        'luxury': '0 4px 20px -2px rgba(28, 25, 23, 0.1), 0 2px 8px -2px rgba(28, 25, 23, 0.06)',
        'luxury-lg': '0 10px 40px -4px rgba(28, 25, 23, 0.15), 0 4px 16px -4px rgba(28, 25, 23, 0.1)',
        'glow': '0 0 20px rgba(243, 167, 63, 0.3)',
        'glow-lg': '0 0 40px rgba(243, 167, 63, 0.4)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.3)',
        'glow-teal-lg': '0 0 40px rgba(20, 184, 166, 0.4)',
      },
  		colors: {
        luxury: {
          gold: {
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
          charcoal: {
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
          },
          teal: {
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
        },
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			scroll: {
  				to: {
  					transform: "translate(calc(-50% - 0.5rem))",
  				},
  			},
  			"meteor-effect": {
  				"0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
  				"70%": { opacity: "1" },
  				"100%": {
  					transform: "rotate(215deg) translateX(-500px)",
  					opacity: "0",
  				},
  			},
  			gradient: {
  				"0%, 100%": {
  					"background-size": "200% 200%",
  					"background-position": "left center",
  				},
  				"50%": {
  					"background-size": "200% 200%",
  					"background-position": "right center",
  				},
  			},
  			"spin-slow": {
  				"0%": { transform: "rotate(0deg)" },
  				"100%": { transform: "rotate(360deg)" },
  			},
  			"luxury-float": {
  				"0%, 100%": { transform: "translateY(0px)" },
  				"50%": { transform: "translateY(-20px)" },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
  			"meteor-effect": "meteor-effect 1s linear infinite",
  			gradient: "gradient 6s ease infinite",
  			"spin-slow": "spin-slow 20s linear infinite",
  			"luxury-float": "luxury-float 6s ease-in-out infinite",
  		}
  	}
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate")
  ],
};
export default config;
