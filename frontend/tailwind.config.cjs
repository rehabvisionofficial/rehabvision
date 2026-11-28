/** @type {import('tailwindcss').Config} */
// Design tokens. Theme: "range of motion" — deep petrol ink on a cool mist
// surface, cedar teal for action, sunlit amber for a reached target. Soft,
// layered radii: big panels 28px, controls 16px, buttons fully round.
// CommonJS (.cjs) on purpose: Node 22 caches ES-module configs, so a running
// dev server would never see edits to this file without a restart.
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Bundled with the site (no third-party font request). Arabic falls to Plex Sans Arabic.
        sans: ['"Bricolage Grotesque Variable"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        mono: ['"Bricolage Grotesque Variable"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#14323A',     // petrol: text and dark surfaces, 12.6:1 on mist
        muted: '#4D6870',   // secondary text, 5.6:1 on mist
        rule: '#D5E2E0',    // hairlines
        paper: '#E8F0EF',   // quiet surface inside panels
        mist: '#F3F7F6',    // page background
        accent: {
          DEFAULT: '#0F7B6C', // cedar teal, 5.1:1 on white
          hover: '#0A6457',
          tint: '#DDF1EC',
          soft: '#A8DCCF',
        },
        amber: { DEFAULT: '#F2B33D', ink: '#7A4E00', tint: '#FFF1D2' },
        danger: { DEFAULT: '#C2333A', tint: '#FDECEC' },
        caution: { DEFAULT: '#7A4E00', tint: '#FFF1D2' },
        success: { DEFAULT: '#0F7B6C', tint: '#DDF1EC' },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        // tinted with the petrol ink, never neutral grey
        soft: '0 1px 2px rgb(20 50 58 / 0.06), 0 8px 24px -12px rgb(20 50 58 / 0.18)',
        lift: '0 2px 4px rgb(20 50 58 / 0.06), 0 22px 48px -20px rgb(20 50 58 / 0.35)',
        ring: '0 0 0 4px rgb(15 123 108 / 0.18)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'alert-in': {
          '0%': { opacity: '0', transform: 'translateY(-6px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        tick: {
          '0%': { transform: 'scale(1.25)', color: '#0F7B6C' },
          '100%': { transform: 'none' },
        },
        'icon-in': {
          '0%': { opacity: '0', transform: 'rotate(-90deg) scale(0.6)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'dialog-in': {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        shimmer: {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '-100% 0' },
        },
        'rule-draw': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-2px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '70%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        'fade-in': 'fade-in 0.4s ease-out backwards',
        'alert-in': 'alert-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        tick: 'tick 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'icon-in': 'icon-in 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        'dialog-in': 'dialog-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        shimmer: 'shimmer 1.4s linear infinite',
        'rule-draw': 'rule-draw 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards',
        shake: 'shake 0.35s ease-out',
        pop: 'pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
