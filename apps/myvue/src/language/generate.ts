import type { SupportedLanguage } from './index'

// Node.js环境下的文件系统操作
// 注意：此文件需要在Node.js环境中运行，不能直接在浏览器中使用
// 使用类型声明来避免TypeScript错误，实际运行时会在Node.js环境中
// Node.js模块类型声明（仅在Node.js环境中可用）
// @ts-expect-error - 这些模块在浏览器中不存在，仅在Node.js环境中使用
type NodeFS = {
  existsSync: (path: string) => boolean
  mkdirSync: (path: string, options?: { recursive?: boolean }) => void
  writeFileSync: (path: string, data: string, encoding: string) => void
  readFileSync: (path: string, encoding: string) => string
}
// @ts-expect-error - 这些模块在浏览器中不存在，仅在Node.js环境中使用
type NodePath = {
  dirname: (path: string) => string
  join: (...paths: string[]) => string
}
// @ts-expect-error - 这些模块在浏览器中不存在，仅在Node.js环境中使用
type NodeCrypto = {
  createHash: (algorithm: string) => {
    update: (data: string) => { digest: (encoding: string) => string }
  }
}

let fs: NodeFS | null = null
let pathModule: NodePath | null = null

// 动态导入Node.js模块（仅在Node.js环境中）
if (typeof window === 'undefined') {
  try {
    // @ts-expect-error - Node.js环境下的动态导入，浏览器中不存在
    fs = require('fs')
    // @ts-expect-error - Node.js环境下的动态导入，浏览器中不存在
    pathModule = require('path')
  } catch (error) {
    console.warn('Node.js modules not available, file operations will be disabled')
  }
}

/**
 * 翻译API配置接口
 */
export interface TranslateAPIConfig {
  /** API名称 */
  name: string
  /** API类型 */
  type: 'google' | 'baidu' | 'youdao' | 'microsoft' | 'libre' | 'custom'
  /** API端点URL */
  endpoint?: string
  /** API密钥（如果需要） */
  apiKey?: string
  /** App ID（百度翻译需要） */
  appId?: string
  /** 是否启用 */
  enabled: boolean
  /** 优先级（数字越小优先级越高） */
  priority: number
  /** 自定义请求函数 */
  translateFn?: (text: string, from: string, to: string) => Promise<string>
}

/**
 * 翻译API配置列表
 */
export const translateAPIs: TranslateAPIConfig[] = [
  {
    name: 'LibreTranslate',
    type: 'libre',
    endpoint: 'https://libretranslate.de/translate',
    enabled: true,
    priority: 1,
  },
  {
    name: 'Google Translate (Free)',
    type: 'google',
    endpoint: 'https://translate.googleapis.com/translate_a/single',
    enabled: true,
    priority: 2,
  },
  {
    name: '百度翻译',
    type: 'baidu',
    endpoint: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
    enabled: false, // 需要API密钥
    priority: 3,
    apiKey: '', // 需要配置
    appId: '', // 需要配置
  },
  {
    name: '有道翻译',
    type: 'youdao',
    endpoint: 'https://openapi.youdao.com/api',
    enabled: false, // 需要API密钥
    priority: 4,
    apiKey: '', // 需要配置
    appId: '', // 需要配置
  },
  {
    name: 'Microsoft Translator',
    type: 'microsoft',
    endpoint: 'https://api.cognitive.microsofttranslator.com/translate',
    enabled: false, // 需要API密钥
    priority: 5,
    apiKey: '', // 需要配置
  },
]

/**
 * 语言代码映射
 */
const languageCodeMap: Record<SupportedLanguage, string> = {
  'zh-CN': 'zh',
  'en-US': 'en',
  'ja-JP': 'ja',
  'ko-KR': 'ko',
  'fr-FR': 'fr',
  'de-DE': 'de',
  'es-ES': 'es',
  'ru-RU': 'ru',
}

/**
 * 获取语言代码
 */
function getLanguageCode(lang: SupportedLanguage): string {
  return languageCodeMap[lang] || lang.split('-')[0]
}

/**
 * LibreTranslate API翻译
 */
async function translateWithLibre(
  text: string,
  from: string,
  to: string,
  endpoint: string
): Promise<string> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: 'text',
      }),
    })

    if (!response.ok) {
      throw new Error(`LibreTranslate API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.translatedText || text
  } catch (error) {
    console.error('LibreTranslate error:', error)
    throw error
  }
}

/**
 * Google Translate API翻译（免费版）
 */
async function translateWithGoogle(
  text: string,
  from: string,
  to: string,
  endpoint: string
): Promise<string> {
  try {
    const url = `${endpoint}?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.statusText}`)
    }

    const data = await response.json()
    // Google返回的数据格式: [[["翻译结果",...],...],...]
    if (Array.isArray(data) && data[0] && Array.isArray(data[0]) && data[0][0] && Array.isArray(data[0][0])) {
      return data[0][0][0] || text
    }
    return text
  } catch (error) {
    console.error('Google Translate error:', error)
    throw error
  }
}

/**
 * 百度翻译API
 */
async function translateWithBaidu(
  text: string,
  from: string,
  to: string,
  config: TranslateAPIConfig
): Promise<string> {
  if (!config.appId || !config.apiKey) {
    throw new Error('Baidu API requires appId and apiKey')
  }

  try {
    // 动态导入crypto模块
    // @ts-ignore - Node.js环境下的动态导入
    const crypto = typeof window === 'undefined' ? require('crypto') : null
    if (!crypto) {
      throw new Error('crypto module is only available in Node.js environment')
    }
    const salt = Date.now().toString()
    const sign = crypto
      .createHash('md5')
      .update(config.appId + text + salt + config.apiKey)
      .digest('hex')

    const params = new URLSearchParams({
      q: text,
      from,
      to,
      appid: config.appId,
      salt,
      sign,
    })

    const response = await fetch(`${config.endpoint}?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`Baidu API error: ${response.statusText}`)
    }

    const data = await response.json()
    if (data.error_code) {
      throw new Error(`Baidu API error: ${data.error_msg}`)
    }

    return data.trans_result?.[0]?.dst || text
  } catch (error) {
    console.error('Baidu Translate error:', error)
    throw error
  }
}

/**
 * 有道翻译API
 */
async function translateWithYoudao(
  text: string,
  from: string,
  to: string,
  config: TranslateAPIConfig
): Promise<string> {
  if (!config.appId || !config.apiKey) {
    throw new Error('Youdao API requires appId and apiKey')
  }

  try {
    // 动态导入crypto模块
    // @ts-ignore - Node.js环境下的动态导入
    const crypto = typeof window === 'undefined' ? require('crypto') : null
    if (!crypto) {
      throw new Error('crypto module is only available in Node.js environment')
    }
    const salt = Date.now().toString()
    const curtime = Math.round(Date.now() / 1000).toString()
    const signStr = config.appId + truncate(text) + salt + curtime + config.apiKey
    const sign = crypto.createHash('sha256').update(signStr).digest('hex')

    const params = new URLSearchParams({
      q: text,
      from,
      to,
      appKey: config.appId,
      salt,
      sign,
      signType: 'v3',
      curtime,
    })

    const response = await fetch(`${config.endpoint}?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`Youdao API error: ${response.statusText}`)
    }

    const data = await response.json()
    if (data.errorCode !== '0') {
      throw new Error(`Youdao API error: ${data.errorCode}`)
    }

    return data.translation?.[0] || text
  } catch (error) {
    console.error('Youdao Translate error:', error)
    throw error
  }
}

/**
 * 截断文本（有道翻译要求）
 */
function truncate(text: string): string {
  const len = text.length
  return len <= 20 ? text : text.substring(0, 10) + len + text.substring(len - 10)
}

/**
 * 使用配置的API进行翻译
 */
async function translateWithAPI(
  text: string,
  from: SupportedLanguage,
  to: SupportedLanguage,
  apiConfig: TranslateAPIConfig
): Promise<string> {
  const fromCode = getLanguageCode(from)
  const toCode = getLanguageCode(to)

  // 如果源语言和目标语言相同，直接返回
  if (fromCode === toCode) {
    return text
  }

  // 使用自定义函数
  if (apiConfig.translateFn) {
    return apiConfig.translateFn(text, fromCode, toCode)
  }

  // 根据API类型选择翻译方法
  switch (apiConfig.type) {
    case 'libre':
      if (!apiConfig.endpoint) throw new Error('LibreTranslate endpoint is required')
      return translateWithLibre(text, fromCode, toCode, apiConfig.endpoint)

    case 'google':
      if (!apiConfig.endpoint) throw new Error('Google Translate endpoint is required')
      return translateWithGoogle(text, fromCode, toCode, apiConfig.endpoint)

    case 'baidu':
      return translateWithBaidu(text, fromCode, toCode, apiConfig)

    case 'youdao':
      return translateWithYoudao(text, fromCode, toCode, apiConfig)

    default:
      throw new Error(`Unsupported API type: ${apiConfig.type}`)
  }
}

/**
 * 递归翻译对象
 */
async function translateObject(
  obj: string | Record<string, unknown> | unknown[],
  from: SupportedLanguage,
  to: SupportedLanguage,
  apis: TranslateAPIConfig[]
): Promise<string | Record<string, unknown> | unknown[]> {
  if (typeof obj === 'string') {
    // 翻译字符串
    const enabledAPIs = apis.filter((api) => api.enabled).sort((a, b) => a.priority - b.priority)

    for (const api of enabledAPIs) {
      try {
        const translated = await translateWithAPI(obj, from, to, api)
        // 添加延迟避免请求过快
        await new Promise((resolve) => setTimeout(resolve, 200))
        return translated
      } catch (error) {
        console.warn(`Translation failed with ${api.name}, trying next API...`, error)
        continue
      }
    }

    // 所有API都失败，返回原文
    console.error('All translation APIs failed, returning original text')
    return obj
  } else if (Array.isArray(obj)) {
    // 翻译数组
    return Promise.all(obj.map((item) => translateObject(item, from, to, apis)))
  } else if (obj && typeof obj === 'object') {
    // 翻译对象
    const result: Record<string, unknown> = {}
    for (const key in obj) {
      const value = obj[key]
      if (typeof value === 'string') {
        result[key] = await translateObject(value, from, to, apis)
      } else if (Array.isArray(value)) {
        result[key] = await translateObject(value, from, to, apis)
      } else if (value && typeof value === 'object') {
        result[key] = await translateObject(value as Record<string, unknown>, from, to, apis)
      } else {
        result[key] = value
      }
    }
    return result
  } else {
    // 其他类型直接返回
    return obj
  }
}

/**
 * 生成翻译文件
 * @param sourceLang 源语言
 * @param targetLangs 目标语言列表
 * @param sourceData 源语言数据
 * @param outputDir 输出目录
 * @param apis 翻译API配置列表
 */
export async function generateTranslations(
  sourceLang: SupportedLanguage,
  targetLangs: SupportedLanguage[],
  sourceData: Record<string, unknown>,
  outputDir: string = './src/language',
  apis: TranslateAPIConfig[] = translateAPIs
): Promise<void> {
  if (!fs || !path) {
    throw new Error('File system operations are only available in Node.js environment')
  }

  console.log(`开始生成翻译文件，源语言: ${sourceLang}, 目标语言: ${targetLangs.join(', ')}`)

  if (!fs || !pathModule) {
    throw new Error('File system operations are only available in Node.js environment')
  }

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 为每个目标语言生成翻译
  for (const targetLang of targetLangs) {
    if (targetLang === sourceLang) {
      console.log(`跳过 ${targetLang}（与源语言相同）`)
      continue
    }

    console.log(`正在翻译到 ${targetLang}...`)

    try {
      const translatedData = await translateObject(sourceData, sourceLang, targetLang, apis)

      // 保存到文件
      const outputPath = pathModule!.join(outputDir, `${targetLang}.json`)
      fs.writeFileSync(outputPath, JSON.stringify(translatedData, null, 2), 'utf-8')

      console.log(`✓ ${targetLang} 翻译完成，已保存到 ${outputPath}`)
    } catch (error) {
      console.error(`✗ ${targetLang} 翻译失败:`, error)
    }
  }

  console.log('翻译生成完成！')
}

/**
 * 更新language.json文件
 * @param translations 翻译数据对象，格式: { 'zh-CN': {...}, 'en-US': {...} }
 * @param outputPath 输出文件路径
 */
export function updateLanguageFile(
  translations: Partial<Record<SupportedLanguage, Record<string, unknown>>>,
  outputPath: string = './src/language/language.json'
): void {
  if (!fs || !pathModule) {
    throw new Error('File system operations are only available in Node.js environment')
  }

  const dir = pathModule.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf-8')
  console.log(`语言文件已更新: ${outputPath}`)
}

/**
 * 批量翻译并更新language.json
 * @param sourceLang 源语言
 * @param targetLangs 目标语言列表
 * @param sourceData 源语言数据
 * @param outputPath 输出文件路径
 * @param apis 翻译API配置列表
 */
export async function generateAndUpdateLanguageFile(
  sourceLang: SupportedLanguage,
  targetLangs: SupportedLanguage[],
  sourceData: Record<string, unknown>,
  outputPath: string = './src/language/language.json',
  apis: TranslateAPIConfig[] = translateAPIs
): Promise<void> {
  if (!fs || !pathModule) {
    throw new Error('File system operations are only available in Node.js environment')
  }

  // 读取现有文件
  let existingData: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {}
  if (fs.existsSync(outputPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(outputPath, 'utf-8')) as Partial<
        Record<SupportedLanguage, Record<string, unknown>>
      >
    } catch (error) {
      console.warn('无法读取现有语言文件，将创建新文件')
    }
  }

  // 添加源语言数据
  existingData[sourceLang] = sourceData

  // 翻译到目标语言
  for (const targetLang of targetLangs) {
    if (targetLang === sourceLang) {
      continue
    }

    console.log(`正在翻译到 ${targetLang}...`)

    try {
      const translatedData = await translateObject(sourceData, sourceLang, targetLang, apis)
      if (typeof translatedData === 'object' && !Array.isArray(translatedData)) {
        existingData[targetLang] = translatedData as Record<string, unknown>
      } else {
        console.warn(`翻译结果格式不正确，跳过 ${targetLang}`)
      }
      console.log(`✓ ${targetLang} 翻译完成`)
    } catch (error) {
      console.error(`✗ ${targetLang} 翻译失败:`, error)
      // 如果翻译失败，保留现有数据或使用空对象
      if (!existingData[targetLang]) {
        existingData[targetLang] = {}
      }
    }
  }

  // 更新文件
  updateLanguageFile(existingData, outputPath)
}

// 如果直接运行此文件（仅在Node.js环境中）
// 注意：此代码块仅在Node.js环境中执行，用于命令行工具
// 在浏览器环境中会被忽略
if (typeof window === 'undefined') {
  // 示例用法（可以通过命令行参数或环境变量配置）
  const sourceData = {
    common: {
      confirm: '确认',
      cancel: '取消',
      save: '保存',
    },
  }

  // 可以通过命令行运行: node generate.ts
  // 或者在其他Node.js脚本中导入使用
  // generateAndUpdateLanguageFile(
  //   'zh-CN',
  //   ['en-US', 'ja-JP'],
  //   sourceData,
  //   './src/language/language.json'
  // ).catch(console.error)
}

