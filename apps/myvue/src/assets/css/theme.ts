// Ant Design Vue 主题配置（四套主题：light / dark / warm / cool）
// 参考：https://www.antdv.com/docs/vue/customize-theme-cn
// 说明：尽量使用官方 Token（color 系列），并结合 base.less 中定义的色板

export type ThemeTokens = {
  // Brand & Status
  colorPrimary: string
  colorInfo?: string
  colorSuccess?: string
  colorWarning?: string
  colorError?: string
  // Text
  colorTextBase?: string
  colorText?: string
  colorTextSecondary?: string
  colorTextTertiary?: string
  colorTextQuaternary?: string
  colorTextLightSolid?: string
  // Link
  colorLink?: string
  colorLinkHover?: string
  colorLinkActive?: string
  // Backgrounds
  colorBgBase?: string
  colorBgLayout?: string
  colorBgContainer?: string
  colorBgElevated?: string
  // Fill / Border
  colorFill?: string
  colorFillSecondary?: string
  colorFillTertiary?: string
  colorFillQuaternary?: string
  colorBorder?: string
  colorBorderSecondary?: string
}

export const theme: Record<'light' | 'dark' | 'warm' | 'cool', ThemeTokens> = {
  // 亮色（黑白灰）
  light: {
    // brand & status（采用 Ant Design 默认蓝为品牌色，保证可读性和一致性）
    colorPrimary: '#1677ff',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',

    // text（来自 base.less 的灰阶）
    colorTextBase: '#111827', // gray-900
    colorText: '#111827',
    colorTextSecondary: '#374151', // gray-700
    colorTextTertiary: '#6b7280', // gray-500
    colorTextQuaternary: '#9ca3af', // gray-400
    colorTextLightSolid: '#ffffff',

    // link（与品牌色一致）
    colorLink: '#1677ff',
    colorLinkHover: '#69b1ff',
    colorLinkActive: '#0958d9',

    // background（来自 base.less 的 white 系列）
    colorBgBase: '#ffffff',
    colorBgLayout: '#f8f8f8',   // white-soft
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',

    // fill / border（来自 base.less 的 gray 系列）
    colorFill: '#f8f8f8',              // soft
    colorFillSecondary: '#f2f2f2',     // mute
    colorFillTertiary: '#f2f2f2',
    colorFillQuaternary: '#f2f2f2',
    colorBorder: '#e5e7eb',            // gray-200
    colorBorderSecondary: '#d1d5db',   // gray-300
  },

  // 暗色
  dark: {
    // brand & status（保持品牌色不变，便于识别；状态色采用官方默认）
    colorPrimary: '#1677ff',
    colorInfo: '#1677ff',
    colorSuccess: '#49aa19',
    colorWarning: '#d89614',
    colorError: '#a61d24',

    // text（来自 base.less 的暗色文字）
    colorTextBase: '#e5e7eb', // 接近 gray-200/100 的明亮文本
    colorText: '#e5e7eb',
    colorTextSecondary: '#9ca3af', // gray-400
    colorTextTertiary: '#6b7280',  // gray-500
    colorTextQuaternary: '#4b5563', // gray-600
    colorTextLightSolid: '#ffffff',

    // link
    colorLink: '#69b1ff',
    colorLinkHover: '#a3c9ff',
    colorLinkActive: '#1677ff',

    // background（来自 base.less 的 black 系列）
    colorBgBase: '#181818',
    colorBgLayout: '#222222',   // black-soft
    colorBgContainer: '#1e1e1e', // black-light（自定义）
    colorBgElevated: '#222222',

    // fill / border
    colorFill: '#222222',              // soft
    colorFillSecondary: '#282828',     // mute
    colorFillTertiary: '#282828',
    colorFillQuaternary: '#222222',
    colorBorder: '#374151',            // gray-700
    colorBorderSecondary: '#4b5563',   // gray-600
  },

  // 暖色主题（来自 base.less 的暖色系）
  warm: {
    // brand & status（品牌色采用暖橙）
    colorPrimary: '#d97706', // @warm-primary
    colorInfo: '#d97706',
    colorSuccess: '#16a34a', // 取常用绿色（tailwind green-600）
    colorWarning: '#f59e0b', // @warm-accent 近似为 warning
    colorError: '#dc2626',   // 常用红色

    // text
    colorTextBase: '#7c2d12', // @warm-text
    colorText: '#7c2d12',
    colorTextSecondary: '#9a3412', // @warm-text-soft
    colorTextTertiary: '#d97706', // 主色降权
    colorTextQuaternary: '#fdba74', // 边框/高亮浅色
    colorTextLightSolid: '#fff7ed',

    // link（与品牌色一致）
    colorLink: '#d97706',
    colorLinkHover: '#b45309',
    colorLinkActive: '#7c2d12',

    // background（来自 base.less 的 warm 系列）
    colorBgBase: '#fff7ed',
    colorBgLayout: '#ffedd5',
    colorBgContainer: '#fff7ed',
    colorBgElevated: '#ffedd5',

    // fill / border
    colorFill: '#fff7ed',
    colorFillSecondary: '#ffedd5',
    colorFillTertiary: '#fed7aa',
    colorFillQuaternary: '#fed7aa',
    colorBorder: '#fdba74',
    colorBorderSecondary: '#f59e0b',
  },

  // 冷色主题（来自 base.less 的冷色系）
  cool: {
    // brand & status（品牌色采用冷蓝）
    colorPrimary: '#0284c7', // @cool-primary
    colorInfo: '#0284c7',
    colorSuccess: '#16a34a',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',

    // text
    colorTextBase: '#0c4a6e', // @cool-text
    colorText: '#0c4a6e',
    colorTextSecondary: '#075985', // @cool-text-soft
    colorTextTertiary: '#0369a1', // 深一点
    colorTextQuaternary: '#7dd3fc',
    colorTextLightSolid: '#f0f9ff',

    // link
    colorLink: '#0284c7',
    colorLinkHover: '#0369a1',
    colorLinkActive: '#075985',

    // background（来自 base.less 的 cool 系列）
    colorBgBase: '#f0f9ff',
    colorBgLayout: '#e0f2fe',
    colorBgContainer: '#f0f9ff',
    colorBgElevated: '#e0f2fe',

    // fill / border
    colorFill: '#f0f9ff',
    colorFillSecondary: '#e0f2fe',
    colorFillTertiary: '#bae6fd',
    colorFillQuaternary: '#bae6fd',
    colorBorder: '#7dd3fc',
    colorBorderSecondary: '#bae6fd',
  }
}
