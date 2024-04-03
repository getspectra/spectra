import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)

export const en = defineConfig({
  lang: 'en-US',
  description: 'A declarative domain-specific language for permission management',

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Schema', link: '/schema' }
    ],

    editLink: {
      pattern: 'https://github.com/getspectra/spectra/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    sidebar: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Implementation', link: '/implementation' },
      {
        text: 'Concepts',
        items: [
          { text: '策略', link: '/concepts' },
          { text: '表达式', link: '/concepts' },
        ]
      },
      {
        text: 'Languages & SDK',
        items: [
          { text: 'PHP', link: '/php' },
          { text: 'JavaScript', link: '/js' },
          { text: 'Go', link: '/go' },
        ]
      }
    ],
  }
})
