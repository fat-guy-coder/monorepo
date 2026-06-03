import { onMounted, reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark' | 'warm' | 'cool' | 'eye-friendly'
export type ThemeLabel = '亮色' | '暗色' | '暖色' | '冷色' | '护眼'
export type ThemeIcon = '☀️' | '🌙' | '🔥' | '❄️' | '👀'

export interface ThemeConfig {
  value: Theme
  label: ThemeLabel
  icon: ThemeIcon
}

export interface NavItem {
  icon: string
  label: string
  value: string
}

export interface UIConfig {
  theme: Theme
  themes: ThemeConfig[]
  navItems: NavItem[]
}
export const useUIConfigStore = defineStore('uiconfig', () => {
  const storeage = localStorage.getItem('uiConfig')
  const uiConfig = reactive<UIConfig>(storeage ? JSON.parse(storeage) : {
    theme: 'light',
    themes: [
      { value: 'light', label: '亮色', icon: '☀️' },
      { value: 'dark', label: '暗色', icon: '🌙' },
      { value: 'warm', label: '暖色', icon: '🔥' },
      { value: 'cool', label: '冷色', icon: '❄️' },
      { value: 'eye-friendly', label: '护眼', icon: '👀' },],
    navItems: [
      {
        icon: '👤',
        label: '用户',
        value: 'user',
      },
      {
        icon: '☀☽',
        label: '主题',
        value: 'theme',
      }
    ],
  })


  function setTheme(newTheme: Theme) {
    uiConfig.theme = newTheme

  }

  // Set initial theme on load
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', uiConfig.theme)
  }

  const setNavItems = (newNavItems: NavItem[]) => {
    uiConfig.navItems = newNavItems
  }

  onMounted(() => {
    useUIConfigStore().$subscribe(() => { localStorage.setItem('uiConfig', JSON.stringify(uiConfig)) }, { flush: 'sync' })
  })

  return { ...toRefs(uiConfig), setTheme, setNavItems, }
})
