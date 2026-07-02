/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        edn: {
          bronze: '#111111',
          bronzeDeep: '#000000',
          warm: '#F8F8F6',
          beige: '#F5F2EC',
          ink: '#111111',
          muted: '#6B6B6B',
          divider: '#E8E6E2',
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        heroZoom: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.08)' } },
        floatDust: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-40px) translateX(20px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        lightSweep: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)', opacity: '0' },
          '12%': { opacity: '0.5' },
          '30%': { transform: 'translateX(120%) skewX(-18deg)', opacity: '0' },
          '100%': { transform: 'translateX(120%) skewX(-18deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathe: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(17,17,17,0.22)' },
          '50%': { boxShadow: '0 0 28px 4px rgba(17,17,17,0.28)' },
        },
        microFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        heroZoom: 'heroZoom 30s ease-in-out infinite alternate',
        lightSweep: 'lightSweep 8s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        breathe: 'breathe 16s ease-in-out infinite',
        microFloat: 'microFloat 3s ease-in-out infinite',
        gradientShift: 'gradientShift 6s ease infinite',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
