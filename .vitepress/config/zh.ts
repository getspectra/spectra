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
      { text: '定义', link: '/zh/schema' },
      { text: '生成器', link: '/zh/builder' },
      { text: '验证器', link: '/zh/validator' }
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

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2024-${new Date().getFullYear()} Spectra Team`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  }
})
