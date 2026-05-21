/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: '#FFFFFF',
        dark: {
          bg: '#000000',
          card: '#0A0A0A',
          border: '#262626',
          accent: '#161616',
          textMuted: '#737373',
          textLight: '#E5E5E5',
        }
      },
    },
  },
  plugins: [],
}
