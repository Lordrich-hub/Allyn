import type { Config } from 'tailwindcss'
import { colors } from '@afroluxe/ui'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        surface: colors.surface,
        primary: colors.primary,
        accent: colors.accent,
        'accent-secondary': colors.accentSecondary,
        text: colors.text,
        muted: colors.muted,
        border: colors.border,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
