// --- 默认颜色变量 ---
export const THEME_MAIN_GRADIENT_COLOR = 'var(--color-gradient-group-1)'
// 主题次要渐变颜色变量数组 根据 theme.less 中的定义顺序
export const THEME_SECONDARY_GRADIENT_COLORS = [
  'var(--color-gradient-group-2)',
  'var(--color-gradient-group-3)',
  'var(--color-gradient-group-4)',
  'var(--color-gradient-group-5)',
  'var(--color-gradient-group-6)',
  'var(--color-gradient-group-7)',
  'var(--color-gradient-group-8)',
  'var(--color-gradient-group-9)',
  'var(--color-gradient-group-10)',
  'var(--color-gradient-group-11)',
]
//高对比度 neon 颜色变量数组
export const THEME_HIGH_CONTRAST_NEON_COLORS = [
  'var(--color-gradient-group-11)',
  'var(--color-gradient-group-12)',
  'var(--color-gradient-group-13)',
  'var(--color-gradient-group-14)',
]

export const THEME__MAIN_TEXT_COLOR = 'var(--color-text)'

//

//字体渐变颜色变量数组
export const THEME_FONT_GRADIENT_COLORS = [
  'var(--font-gradient-1)',
  'var(--font-gradient-2)',
  'var(--font-gradient-3)',
  'var(--font-gradient-4)',
  'var(--font-gradient-5)',
]

export const THEME_ALL_GRADIENT_COLORS = [
  ...THEME_SECONDARY_GRADIENT_COLORS,
  ...THEME_HIGH_CONTRAST_NEON_COLORS,
]
