import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00a388',
        'accent-ai': '#E6FF00',
        'accent-deal': '#FF008C',
        'background-light': '#f9fafa',
        'background-dark': '#0d1217',
        'card-dark': '#1C1E22',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
} satisfies Config
