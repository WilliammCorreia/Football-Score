/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/plugins/**/*.{js,ts}',
    './app/App.{js,ts,vue}',
    './app/app.{js,ts,vue}',
    './app/Error.{js,ts,vue}',
    './app/error.{js,ts,vue}',
    './app/app.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // ============================================
        // PRIMARY = Pitch Green (vert forêt profond)
        // ============================================
        'primary': {
          50: '#EFF6F2',
          100: '#D5E8DD',
          200: '#ABCFBC',
          300: '#7FB89C',
          400: '#4F9F7A',
          500: '#1F8158', // base
          600: '#166842',
          700: '#0E4F31',
          800: '#083C25',
          900: '#042C1B',
          hover: '#166842',
        },
        // ============================================
        // ACCENT = Or trophée (Premium)
        // ============================================
        'accent': {
          50: '#FBF6E8',
          100: '#F6EBC4',
          200: '#EBD580',
          300: '#DDBA48',
          400: '#D4A537', // base
          500: '#B68A1D',
          600: '#8E6A12',
        },
        // ============================================
        // SÉMANTIQUE (utilisé partout dans l'app)
        // ============================================
        'background-app': '#F8F8F5', // crème chaude, calme
        'surface': '#FFFFFF', // cards
        'surface-muted': '#F2F2EE', // cards alternées / fond léger
        'border': '#E8E8E0', // borders subtiles
        'border-strong': '#CFCFC4', // borders prononcées

        'text-main': '#0E1A14', // charbon (presque noir teinté vert)
        'text-muted': '#5E6A65', // gris-vert calme
        'text-soft': '#9DA8A3', // gris très clair (placeholders, captions)

        'danger': '#C73838', // carton rouge
        'danger-bg': '#FCEEEE',
        'success': '#1F8158', // = primary 500
        'warning': '#D4A537', // = accent 400
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        // hiérarchie claire avec line-height & letter-spacing intégrés
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.625rem', letterSpacing: '-0.005em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.015em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        eyebrow: '0.15em', // pour les labels en caps
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(14, 26, 20, 0.04)',
        md: '0 4px 12px -2px rgba(14, 26, 20, 0.08), 0 2px 4px -2px rgba(14, 26, 20, 0.04)',
        lg: '0 12px 28px -8px rgba(14, 26, 20, 0.12), 0 4px 8px -4px rgba(14, 26, 20, 0.06)',
        card: '0 1px 3px 0 rgba(14, 26, 20, 0.05), 0 1px 2px -1px rgba(14, 26, 20, 0.04)',
      },
      transitionTimingFunction: {
        snappy: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
};
