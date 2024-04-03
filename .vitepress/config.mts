import { defineConfig } from 'vitepress'
import { en } from './config/en'
import { shared } from './config/shared'
import { zh } from './config/zh'

export default defineConfig({
  ...shared,
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh },
  }
})
