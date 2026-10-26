import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}','./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        graphite: '#161616',
        line: 'rgba(255,255,255,0.14)',
        muted: '#a3a6ab',
        silver: '#d4d7db',
        paper: '#f4f4f2',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '380px',
      },
    },
  },
  plugins: [],
}
export default config
