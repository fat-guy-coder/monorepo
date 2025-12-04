import { onMounted, onUnmounted } from 'vue'

/** 渐变类型 */
type GradientType = 'linear' | 'radial' | 'conic' | 'text' | 'box-shadow'

/** 基础颜色类型，可以是字符串或带位置的对象 */
type BaseColor =
  | {
      colors: string
      position: string
    }
  | string

/** CSS animation 属性对象类型 */
interface AnimationType {
  name: string
  duration?: string
  timingFunction?: string
  delay?: string
  iterationCount?: string
  direction?: string
  playState?: string
}

/**
 * useGradientAnimation composable 的配置选项
 */
interface UseGradientAnimationOptions {
  /**
   * @description 应用动画效果的 CSS 类名
   * @default 'gradient-animation'
   */
  className?: string
  /**
   * @description 渐变类型
   * @default 'linear'
   */
  gradientType?: GradientType
  /**
   * @description 自定义渐变色数组
   * @default THEME_SECONDARY_GRADIENT_COLORS
   */
  colors?: BaseColor[]
  /**
   * @description 控制渐变色的数量或范围
   * - `number`: 从 `colors` 数组开头取 n 个颜色
   * - `[number, number]`: 从 `colors` 数组中截取指定范围的颜色
   * - `{ random: number }`: 从 `colors` 数组中随机取 n 个颜色
   * @default 2
   */
  colorsCount?: number | [number, number] | { random: number }
  /**
   * @description 动画速度，数值越大，速度越快
   * @default 20
   */
  speed?: number
  /**
   * @description 渐变方向。支持角度("45deg"), 关键字("to right"), 或径向位置("at center")
   * @default '90deg'
   */
  direction?: string
  /**
   * @description 自定义 animation 属性，可以是字符串或对象
   * @default { name: '', iterationCount: 'infinite', direction: 'normal', duration: '2s', timingFunction: 'linear', delay: '0s', playState: 'running' }
   */
  animation?: string | AnimationType
  /**
   * @description 是否仅在 hover 状态下应用动画
   * @default false
   */
  onlyHover?: boolean
  /**
   * @description 是否仅在 active 状态下应用动画 (通常与 onlyHover 结合使用)
   * @default false
   */
  onlyActive?: boolean
}

// --- CSS 代码常量，用于复用和压缩 ---
const CSS_POS_REL = 'position:relative;'
const CSS_OVERFLOW_HIDDEN = 'overflow:hidden;'
const CSS_PSEUDO_BASE = `content:'';position:absolute;`
const CSS_Z_INDEX_CHILD = `>*{${CSS_POS_REL}z-index:1;}`
const CSS_TRANSITION_OPACITY = 'transition:opacity .3s ease;'

/** 主题主渐变色变量 */
const THEME_MAIN_GRADIENT_COLORS = 'var(--color-gradient-group-1)'

/** 主题次要渐变色组变量 */
const THEME_SECONDARY_GRADIENT_COLORS = [
  'var(--color-gradient-group-2)','var(--color-gradient-group-3)','var(--color-gradient-group-4)','var(--color-gradient-group-5)','var(--color-gradient-group-6)','var(--color-gradient-group-7)','var(--color-gradient-group-8)','var(--color-gradient-group-9)','var(--color-gradient-group-10)',
]

/**
 * 压缩 CSS 字符串，移除所有不必要的空格、换行和注释
 * @param css - 原始 CSS 字符串
 * @returns 压缩后的 CSS 字符串
 */
function compressCss(css: string): string {
  return css.replace(/\s*\n\s*|\/\*.*?\*\//g, '').replace(/;\s*}/g, '}').replace(/\s*{\s*/g, '{').replace(/\s*:\s*/g, ':').replace(/\s*\,\s*/g, ',').trim()
}

/**
 * @description 一个 Vue composable，用于给元素应用动态背景渐变动画。
 * 样式在组件挂载时注入，在卸载时移除，以避免全局污染。
 * @param {UseGradientAnimationOptions} options - 动画配置选项
 */
export function useGradientAnimation(options: UseGradientAnimationOptions = {}) {
  const {
    className = 'gradient-animation',
    colors = THEME_SECONDARY_GRADIENT_COLORS,
    colorsCount = 2,
    speed = 20,
    direction = '90deg',
    gradientType = 'linear',
    animation = { name: '', iterationCount: 'infinite', direction: 'normal', duration: '2s', timingFunction: 'linear', delay: '0s', playState: 'running' },
    onlyHover = false,
    onlyActive = false,
  } = options

  let styleElement: HTMLStyleElement | null = null

  /** 原始渐变类型，用于后续分支判断 */
  const originalType: GradientType = gradientType

  /**
   * 根据 direction 推断底层的渐变类型（线性或径向）
   * @param dir - 方向字符串
   * @returns 'linear' | 'radial'
   */
  const inferUnderlyingType = (dir: string): 'linear' | 'radial' => 
    /deg|to\s+(left|right|top|bottom)/i.test(dir) ? 'linear' : 'radial'

  /** 动态计算出的底层渐变类型 */
  let dynamicGradientType: 'linear' | 'radial' | 'conic' = originalType as any
  /** 为特殊类型（如 'text'）准备的前置 CSS 代码 */
  let preCode = ''

  if (originalType === 'text' || originalType === 'box-shadow') {
    dynamicGradientType = inferUnderlyingType(direction)
    if (originalType === 'text') {
      preCode = `-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;display:inline-block;`
    }
  }

  /** 生成一个唯一的 keyframes 名称 */
  const keyframesName = `gradient-animation-${Math.random().toString(36).substring(7)}`

  /**
   * 根据底层渐变类型获取动画所需的具体参数
   * @returns {object} 包含 backgroundSize, keyframes, direction, isDiagonal, transform 的对象
   */
  const getAnimationDetails = () => {
    const lowerDirection = (direction || '').toLowerCase()
    switch (dynamicGradientType) {
      case 'linear': return handleLinearDiagonalAnimation(lowerDirection)
      case 'radial': return handleRadialAnimation(lowerDirection)
      case 'conic': // conic 暂未实现特殊动画，回退到 linear
      default: return handleLinearDiagonalAnimation('90deg')
    }
  }

  onMounted(() => {
    if (typeof document === 'undefined') return
    let baseColors: BaseColor[] = []
    if (typeof colorsCount === 'number') {
      baseColors = colors.slice(0, colorsCount)
    } else if (Array.isArray(colorsCount)) {
      baseColors = colors.slice(colorsCount[0], colorsCount[1])
    } else if (colorsCount?.random) {
      baseColors = [...colors].sort(() => Math.random() - 0.5).slice(0, colorsCount.random)
    }

    baseColors = baseColors.map((color, index) => 
      typeof color === 'string'
        ? `${color} ${((index + 1) / (baseColors.length + 2)) * 100}%`
        : `${color.colors} ${color.position}`
    )

    const gradientColors = [`${THEME_MAIN_GRADIENT_COLORS} 0%`, ...baseColors, `${THEME_MAIN_GRADIENT_COLORS} 100%`].join(',')

    const { backgroundSize, keyframes, direction: handlerDirection, isDiagonal, transform } = getAnimationDetails()

    const dynamicDirection = dynamicGradientType === 'radial'
      ? (/at\s+/i.test(direction) ? `circle ${direction.replace(/^(circle\s*)?/i, 'at ')}` : 'circle at center')
      : (handlerDirection || direction)

    const animationStringCode = typeof animation === 'string'
        ? animation
        : Object.values({ ...animation,name:animation.name || keyframesName, duration: animation.duration || `${60 / speed}s` }).join(' ')

    const styleKeyString = `${preCode}background-image:${dynamicGradientType}-gradient(${dynamicDirection},${gradientColors});background-size:${backgroundSize};animation:${animationStringCode};`

    let styleContent = ''
    const isHover = onlyHover || onlyActive

    switch (originalType) {
      case 'text':
        if (isHover) {
          const triggerSel = [`.${className}-hover:hover`, `.${className}-active:active`].join(',')
          styleContent = `.${className}-hover,.${className}-active{${CSS_POS_REL}transition:-webkit-text-fill-color .3s ease,color .3s ease;}${triggerSel}{${styleKeyString}}`
        } else {
          styleContent = `.${className}{${styleKeyString}}`
        }
        break

      case 'box-shadow':
        const boxShadowPseudoStyle = `${CSS_PSEUDO_BASE}inset:-12%;border-radius:inherit;${styleKeyString}filter:blur(20px);z-index:-1;pointer-events:none;`
        if (isHover) {
          styleContent = `.${className}-hover,.${className}-active{${CSS_POS_REL}}.${className}-hover::before,.${className}-active::before{${boxShadowPseudoStyle}opacity:0;${CSS_TRANSITION_OPACITY}}.${className}-hover:hover::before{opacity:1;}`
        } else {
          styleContent = `.${className}{${CSS_POS_REL}}.${className}::before{${boxShadowPseudoStyle}opacity:1;}`
        }
        break

      default: // linear & radial
        if (isDiagonal) {
          const diagonalPseudoStyle = `${CSS_PSEUDO_BASE}inset:-35%;${styleKeyString}transform:${transform};transform-origin:center;z-index:0;`
          if (isHover) {
            const sels = [`.${className}-hover`,`.${className}-active`]
            const baseSel = sels.join(',')
            const beforeSel = sels.map(s=>`${s}::before`).join(',')
            const hoverBeforeSel = sels.map(s=>`${s}:hover::before`).join(',')
            styleContent = `${baseSel}{${CSS_POS_REL}${CSS_OVERFLOW_HIDDEN}}${beforeSel}{${diagonalPseudoStyle}opacity:0;${CSS_TRANSITION_OPACITY}}${hoverBeforeSel}{opacity:1;}`
          } else {
            const baseSel = `.${className}`
            styleContent = `${baseSel}{${CSS_POS_REL}${CSS_OVERFLOW_HIDDEN}}${baseSel}::before{${diagonalPseudoStyle}}`
          }
        } else {
          if (isHover) {
            styleContent = `.${className}-hover,.${className}-active{${CSS_POS_REL}${CSS_OVERFLOW_HIDDEN}border-radius:var(--border-radius);${CSS_Z_INDEX_CHILD}}.${className}-hover::before,.${className}-active::before{${CSS_PSEUDO_BASE}top:0;left:0;right:0;bottom:0;${styleKeyString}z-index:0;opacity:0;${CSS_TRANSITION_OPACITY}}.${className}-hover:hover::before{opacity:1;}`
          } else {
            styleContent = `.${className}{${styleKeyString}}`
          }
        }
        break
    }

    styleContent += `@keyframes ${keyframesName}{${keyframes}}`
    console.log(styleContent)
    styleElement = document.createElement('style')
    styleElement.textContent = compressCss(styleContent)
    document.head.appendChild(styleElement)
  })

  onUnmounted(() => {
    if (styleElement && document.head.contains(styleElement)) {
      document.head.removeChild(styleElement)
      styleElement = null
    }
  })
}

/**
 * @description 处理线性渐变动画，特别是对角线方向的特殊情况
 * @param {string} direction - 小写的方向字符串
 * @returns {object} 动画参数 { backgroundSize, keyframes, direction, isDiagonal, transform }
 */
function handleLinearDiagonalAnimation(direction: string) {
  let backgroundSize = '200% 100%', keyframes = '0%{background-position:200% 0}100%{background-position:-200% 0}', isDiagonal = false, transform = '', finalDirection = direction

  const angleMap: Record<string, number> = { 'to top': 0, 'to right': 90, 'to bottom': 180, 'to left': 270 }
  const angle = angleMap[direction] ?? parseInt(direction.match(/(-?\d+)/)?.[0] || '180', 10)
  const normalizedAngle = ((angle % 360) + 360) % 360

  if (normalizedAngle === 0 || normalizedAngle === 180) {
    backgroundSize = '100% 200%'
    keyframes = '0%{background-position:0 200%}100%{background-position:0 -200%}'
  } else if (normalizedAngle !== 90 && normalizedAngle !== 270) {
    isDiagonal = true
    backgroundSize = '200% 200%'
    keyframes = '0%{background-position:200% 200%}100%{background-position:-200% -200%}'
    const rotationMap: Record<number, { rotate: string; dir: string }> = {
      45: { rotate: '-45deg', dir: '90deg' }, 135: { rotate: '135deg', dir: '180deg' },
      225: { rotate: '-225deg', dir: '270deg' }, 315: { rotate: '315deg', dir: '360deg' },
    }
    const diagonal = rotationMap[normalizedAngle] || { rotate: '-45deg', dir: '90deg' }
    transform = `rotate(${diagonal.rotate})`
    finalDirection = diagonal.dir
  }

  return { backgroundSize, keyframes, direction: finalDirection, isDiagonal, transform }
}

/**
 * @description 处理径向渐变动画
 * @param {string} direction - 小写的方向字符串
 * @returns {object} 动画参数 { backgroundSize, keyframes, direction, isDiagonal, transform }
 */
function handleRadialAnimation(direction: string) {
  return {
    backgroundSize: '200% 200%',
    keyframes: '0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}',
    direction: /at\s+/.test(direction) ? `circle ${direction}` : 'circle at center',
    isDiagonal: false,
    transform: '',
  }
}
