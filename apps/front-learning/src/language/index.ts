import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import languageData from './language.json'

/**
 * 支持的语言列表
 */
export type SupportedLanguage = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR' | 'fr-FR' | 'de-DE' | 'es-ES' | 'ru-RU'

/**
 * 语言配置接口
 */
export interface LanguageConfig {
  /** 当前语言 */
  current: SupportedLanguage
  /** 默认语言 */
  default: SupportedLanguage
  /** 支持的语言列表 */
  supported: SupportedLanguage[]
  /** 是否自动检测浏览器语言 */
  autoDetect: boolean
  /** 是否持久化到localStorage */
  persist: boolean
  /** 存储key */
  storageKey: string
}

/**
 * 语言数据接口
 */
export interface LanguageData {
  [key: string]: string | LanguageData
}

/**
 * 语言管理器类
 */
class LanguageManager {
  private config: LanguageConfig
  private languages: Record<SupportedLanguage, LanguageData>
  private currentLanguage: Ref<SupportedLanguage>

  constructor(config?: Partial<LanguageConfig>) {
    this.config = {
      current: 'zh-CN',
      default: 'zh-CN',
      supported: ['zh-CN', 'en-US'],
      autoDetect: true,
      persist: true,
      storageKey: 'app-language',
      ...config,
    }

    // 初始化语言数据
    this.languages = languageData as unknown as Record<SupportedLanguage, LanguageData>

    // 从localStorage恢复语言设置
    if (this.config.persist) {
      const saved = localStorage.getItem(this.config.storageKey) as SupportedLanguage
      if (saved && this.config.supported.includes(saved)) {
        this.config.current = saved
      }
    }

    // 自动检测浏览器语言
    if (this.config.autoDetect && !this.config.persist) {
      const browserLang = this.detectBrowserLanguage()
      if (browserLang && this.config.supported.includes(browserLang)) {
        this.config.current = browserLang
      }
    }

    this.currentLanguage = ref(this.config.current)
  }

  /**
   * 检测浏览器语言
   */
  private detectBrowserLanguage(): SupportedLanguage | null {
    const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage
    if (!browserLang) return null

    // 精确匹配
    if (this.config.supported.includes(browserLang as SupportedLanguage)) {
      return browserLang as SupportedLanguage
    }

    // 语言代码匹配（如 en-US -> en）
    const langCode = browserLang.split('-')[0]
    const matched = this.config.supported.find((lang) => lang.startsWith(langCode))
    return matched || null
  }

  /**
   * 获取当前语言
   */
  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage.value
  }

  /**
   * 切换语言
   */
  setLanguage(lang: SupportedLanguage): void {
    if (!this.config.supported.includes(lang)) {
      console.warn(`Language ${lang} is not supported`)
      return
    }

    this.currentLanguage.value = lang
    this.config.current = lang

    // 持久化到localStorage
    if (this.config.persist) {
      localStorage.setItem(this.config.storageKey, lang)
    }

    // 更新HTML lang属性
    document.documentElement.lang = lang
  }

  /**
   * 获取翻译文本
   * @param key 翻译key，支持点号分隔的路径，如 'common.confirm'
   * @param params 参数对象，用于替换占位符
   * @param defaultValue 默认值
   */
  t(key: string, params?: Record<string, string | number>, defaultValue?: string): string {
    const lang = this.currentLanguage.value
    const data = this.languages[lang] || this.languages[this.config.default]

    // 支持点号分隔的路径
    const keys = key.split('.')
    let value: string | LanguageData = data

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return defaultValue || key
      }
    }

    // 如果是字符串，进行参数替换
    if (typeof value === 'string' && params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match
      })
    }

    return typeof value === 'string' ? value : defaultValue || key
  }

  /**
   * 检查语言是否支持
   */
  isSupported(lang: SupportedLanguage): boolean {
    return this.config.supported.includes(lang)
  }

  /**
   * 获取支持的语言列表
   */
  getSupportedLanguages(): SupportedLanguage[] {
    return [...this.config.supported]
  }

  /**
   * 获取语言数据
   */
  getLanguageData(lang?: SupportedLanguage): LanguageData {
    const targetLang = lang || this.currentLanguage.value
    return this.languages[targetLang] || {}
  }

  /**
   * 设置语言数据
   */
  setLanguageData(lang: SupportedLanguage, data: LanguageData): void {
    this.languages[lang] = data
  }

  /**
   * 获取响应式的当前语言
   */
  getCurrentLanguageRef(): Ref<SupportedLanguage> {
    return this.currentLanguage
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<LanguageConfig>): void {
    Object.assign(this.config, config)
  }

  /**
   * 获取配置
   */
  getConfig(): LanguageConfig {
    return { ...this.config }
  }
}

// 创建单例实例
let instance: LanguageManager | null = null

/**
 * 初始化语言管理器
 */
export function initLanguageManager(config?: Partial<LanguageConfig>): LanguageManager {
  if (!instance) {
    instance = new LanguageManager(config)
  }
  return instance
}

/**
 * 获取语言管理器实例
 */
export function getLanguageManager(): LanguageManager {
  if (!instance) {
    return initLanguageManager()
  }
  return instance
}

/**
 * Vue Composition API hook
 */
export function useLanguage() {
  const manager = getLanguageManager()
  const currentLang = manager.getCurrentLanguageRef()

  const t = (key: string, params?: Record<string, string | number>, defaultValue?: string) => {
    return manager.t(key, params, defaultValue)
  }

  const setLanguage = (lang: SupportedLanguage) => {
    manager.setLanguage(lang)
  }

  const supportedLanguages = computed(() => manager.getSupportedLanguages())

  return {
    currentLang,
    t,
    setLanguage,
    supportedLanguages,
    manager,
  }
}

// 默认导出
export default getLanguageManager()

