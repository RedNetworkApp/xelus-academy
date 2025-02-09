import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              color: '#fff',
              fontSize: '1.875rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            p: {
              color: '#9ca3af',
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            ul: {
              color: '#9ca3af',
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            li: {
              color: '#9ca3af',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            blockquote: {
              color: '#60a5fa',
              borderLeftColor: '#60a5fa',
              fontStyle: 'italic',
              marginTop: '2rem',
              marginBottom: '2rem',
              paddingLeft: '1rem',
            },
            strong: {
              color: '#fff',
            },
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config;
