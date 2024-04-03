import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'Spectra',

  lastUpdated: true,
  cleanUrls: false,
  metaChunk: true,

  sitemap: {
    hostname: 'https://getspectra.vercel.app',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/spectra-logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/spectra-logo-mini.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Spectra | A declarative domain-specific language for permission management' }],
    ['meta', { property: 'og:site_name', content: 'Spectra' }],
    ['meta', { property: 'og:image', content: 'https://getspectra.vercel.app/spectra-og.jpg' }],
    ['meta', { property: 'og:url', content: 'https://getspectra.vercel.app/' }],
  ],

  themeConfig: {
    logo: { src: '/spectra-logo-mini.svg', width: 24, height: 24 },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/getspectra' }
    ],

    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '',
    //     apiKey: '',
    //     indexName: 'spectra',
    //     // locales: { ...zhSearch, ...ptSearch }
    //   }
    // },
  }
})
