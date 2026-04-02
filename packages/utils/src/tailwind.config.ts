import type { Config } from 'tailwindcss'

/**
 * Shared Tailwind Config
 *
 * For Tailwind v4, theme is defined in CSS via @theme directive.
 * This config extends IDE intellisense for @apply and custom utilities.
 *
 * Usage in app:
 *   import config from 'utils/tailwind'
 *   export default { ...config, content: ['./src/**/*.{vue,ts}'] }
 */
export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-text)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        muted: 'var(--color-text-soft)',
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-error)',
      },
    },
  },
  plugins: [],
} satisfies Config
