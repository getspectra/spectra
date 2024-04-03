import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '一种用于权限管理的声明式领域特定语言',

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    nav: [
      { text: '首页', link: '/zh/' },
      { text: '定义', link: '/zh/schema' }
    ],

    editLink: {
      pattern: 'https://github.com/getspectra/spectra/edit/main/:path',
      text: '在 GitHub 上编辑此页面'
    },

    sidebar: [
      { text: '入门', link: '/zh/getting-started' },
      { text: '实现', link: '/zh/implementation' },
      {
        text: '概念',
        items: [
          { text: '策略', link: '/zh/concepts' },
          { text: '表达式', link: '/zh/concepts' },
        ]
      },
      {
        text: '语言 & SDK',
        items: [
          { text: 'PHP', link: '/zh/php' },
          { text: 'JavaScript', link: '/zh/js' },
          { text: 'Go', link: '/zh/go' },
        ]
      }
    ],
  }
})
