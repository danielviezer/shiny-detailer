import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}','./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'neon': '#00B4FF',
        'neon-dim': '#0080CC',
        'dark': '#050810',
        'dark-2': '#080D1A',
        'dark-3': '#0D1526',
        'mid': '#112240',
      },
      fontFamily: {
        'display': ['var(--font-display)'],
        'body': ['var(--font-body)'],
      }
    },
  },
  plugins: [],
}
export default config
