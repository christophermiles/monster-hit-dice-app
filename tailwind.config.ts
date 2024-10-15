import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular', // macOS 10.15+, iOS 13.3+
          'Menlo', // macOS
          'Droid Sans Mono', // Android
          'Cascadia Code', // Windows 11+
          'Consolas', // Windows 7+
          'DejaVu Sans Mono', // Linux
          'Source Code Pro', // Linux
          'monospace'
        ],
      },
    },
  },
  plugins: [],
}
export default config