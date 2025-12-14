import { onMounted, onUnmounted } from 'vue'
import {
  THEME_MAIN_GRADIENT_COLOR,
  THEME_HIGH_CONTRAST_NEON_COLORS,
  THEME_SECONDARY_GRADIENT_COLORS,
} from '@/assets/css/theme/index'
import { lightMinifyCode, lihlghtDecompressCode } from '@/function/code'
import { random, randPick } from '@/function/math'

// --- 类型定义 ---

/** 渐变类型 */
type GradientType = 'linear' | 'radial' | 'text' | 'box-shadow'

/** 基础颜色类型，可以是字符串或带位置的对象 */
type BaseColor = { color: string; position: string } | string

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

/** 动画触发时机 */
type TriggerTime = 'mounted' | 'hover' | 'active'

/** 随机化配置 */
type ColorsSequenceRandom = {
  allRandom?: boolean
  randomColorsCount?: boolean | number
  randomColorsOrder?: boolean
  randomDirection?: boolean
}

type ColorsSequenceCount = number | [number, number] | ColorsSequenceRandom

type Direction =
  | '0deg'
  | '90deg'
  | '180deg'
  | '270deg'
  | '45deg'
  | '135deg'
  | '225deg'
  | '315deg'
  | 'to top'
  | 'to right'
  | 'to bottom'
  | 'to left'
  | 'random'
  | 'at center'
  | 'at left'
  | 'at right'
  | 'at top'
  | 'at bottom'

/** useGradientAnimation Composable 的全局配置选项 */
interface UseGradientAnimationOptions {
  className?: string
  items?: Partial<UseGradientAnimationOptions>[]
  gradientTypes?: GradientType[]
  triggerTimes?: TriggerTime[]
  colors?: BaseColor[]
  colorsCount?: ColorsSequenceCount
  speed?: number
  direction?: Direction
  animation?: string | AnimationType
  coverBackground?: boolean
}

/** 动画生成所需的详细信息 */
interface AnimationDetails {
  backgroundSize: string
  keyframes: string
  direction: Direction
  type: GradientType
  isDiagonal?: boolean
  transform?: string
  prefixCode?: string
  keyframesName?: string
  styleKey?: string
}

/** 动画处理函数的参数 */
interface HandleAnimationOptions {
  direction: Direction
  type: GradientType
  colors?: string[]
  spread?: number
  blur?: number
  brightness?: number
  dirSet?: Set<string>
}

// --- CSS & 动画常量 ---

const CSS_PSEUDO_BASE = `content:'';position:absolute;`
const CSS_TRANSITION_OPACITY = 'transition:opacity 0.2s ease;'

// --- 核心动画处理函数 ---

/**
 * 处理线性/对角线渐变动画
 * @param {HandleAnimationOptions} options - 动画处理选项
 * @returns {AnimationDetails} - 动画细节对象
 */
function handleLinearAnimation({
  direction,
  type,
  dirSet,
}: HandleAnimationOptions): AnimationDetails {
  let backgroundSize = '200% 100%',
    keyframes = '0%{background-position:200% 0}100%{background-position:-200% 0}',
    isDiagonal = false,
    transform = '',
    finalDirection = direction

  const angleMap: Record<string, number> = {
    'to top': 0,
    'to right': 90,
    'to bottom': 180,
    'to left': 270,
  }
  const angle = angleMap[direction] ?? parseInt(direction.match(/(-?\d+)/)?.[0] || '180', 10)

  if (angle === 0 || angle === 180) {
    backgroundSize = '100% 200%'
    keyframes = '0%{background-position:0 200%}100%{background-position:0 -200%}'
  } else if (angle % 45 === 0 && angle % 90 !== 0) {
    isDiagonal = true
    backgroundSize = '200% 200%'
    keyframes = '0%{background-position:200% 200%}100%{background-position:-200% -200%}'
    const rotationMap: Record<number, { rotate: string; dir: string }> = {
      45: { rotate: '-45deg', dir: '90deg' },
      135: { rotate: '45deg', dir: '180deg' },
      225: { rotate: '135deg', dir: '270deg' },
      315: { rotate: '225deg', dir: '360deg' },
    }
    const diagonal = rotationMap[angle] || { rotate: '-45deg', dir: '90deg' }
    transform = `rotate(${diagonal.rotate})`

    if (dirSet) {
      const diagonalDirections = ['90deg', '180deg', '270deg', '360deg']
      const availableDirs = diagonalDirections.filter((d) => !dirSet.has(d))
      const pickedDir =
        availableDirs.length > 0 ? availableDirs[random(availableDirs.length)] : diagonal.dir
      finalDirection = pickedDir as Direction
      dirSet.add(finalDirection)
    } else {
      finalDirection = diagonal.dir as Direction
    }
  }

  const prefixCode = isDiagonal
    ? `position:relative;&::before{${CSS_TRANSITION_OPACITY}${CSS_PSEUDO_BASE}inset:-25%;transform:${transform};transform-origin:center;`
    : ''
  const suffixCode = isDiagonal ? '}' : ''

  return {
    backgroundSize,
    keyframes,
    direction: finalDirection,
    isDiagonal,
    transform,
    type,
    prefixCode: `${prefixCode}${suffixCode}`,
  }
}

/**
 * 处理径向渐变动画
 */
function handleRadialAnimation({ direction, type }: HandleAnimationOptions): AnimationDetails {
  return {
    backgroundSize: '200% 200%',
    keyframes:
      '0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}',
    direction: /at\s+/.test(direction)
      ? (`circle ${direction}` as Direction)
      : ('circle at center' as Direction),
    type,
  }
}

/**
 * 处理文本渐变动画
 */
function handleTextAnimation({ direction, type }: HandleAnimationOptions): AnimationDetails {
  return {
    backgroundSize: '100% 100%',
    keyframes: '0%{background-position:0% 0%}100%{background-position:100% 100%}',
    direction: direction as Direction,
    type,
    prefixCode:
      '-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;display:inline-block;',
  }
}

/**
 * 处理辉光阴影渐变动画
 */
function handleBoxShadowAnimation({
  direction,
  type,
  colors = THEME_HIGH_CONTRAST_NEON_COLORS,
  spread = 0.2,
  blur = 0.3,
  brightness = 1.6,
}: HandleAnimationOptions): AnimationDetails {
  const keyframesParts = Array.from({ length: 4 }, (_, i) => {
    const percent = Math.round((i * 100) / 4)
    const c1 = colors[i % colors.length]
    const c2 = colors[(i + 1) % colors.length]
    const c3 = colors[(i + 2) % colors.length]
    const c1Alpha = c1.startsWith('var(') ? c1 : `${c1}`
    const c2Alpha = c2.startsWith('var(') ? c2 : `${c2}`
    const c3Alpha = c3.startsWith('var(') ? c3 : `${c3}aa`

    return `${percent}% { box-shadow: 0 0 ${0.9 + blur * 0.5}rem ${spread}rem ${c1Alpha}, 0 0 ${1.4 + blur}rem ${spread * 2.3}rem ${c2Alpha}, 0 0 ${2.2 + blur * 2.2}rem ${spread * 3.6}rem ${c3Alpha}; }`
  })

  const endColors = [colors[0], colors[1], colors[2]]
  const [c1end, c2end, c3end] = endColors.map((c) => (c.startsWith('var(') ? c : `${c}`))

  keyframesParts.push(
    `100% { box-shadow: 0 0 ${0.9 + blur * 0.5}rem ${spread}rem ${c1end}, 0 0 ${1.4 + blur}rem ${spread * 2.3}rem ${c2end}, 0 0 ${2.2 + blur * 2.2}rem ${spread * 3.6}rem ${c3end}aa; }`,
  )

  return {
    backgroundSize: '100% 100%',
    keyframes: keyframesParts.join(''),
    direction: direction as Direction,
    type,
    prefixCode: `inset:0;border-radius:inherit;filter:blur(${blur}rem) brightness(${brightness});pointer-events:none;`,
  }
}

// --- Composable 主函数 ---

/**
 * @description 一个 Vue Composable，用于给元素应用动态背景渐变动画。
 * @param {UseGradientAnimationOptions} options - 全局配置选项
 */
export function useGradientAnimation(options: UseGradientAnimationOptions = {}) {
  const { items = [] } = options
  if (items.length > 0) {
    items.forEach((item) => useGradientAnimation({ ...options, ...item, items: [] }))
    return
  }

  let styleElement: HTMLStyleElement | null = null

  onMounted(() => {
    if (typeof document === 'undefined') return

    const config = { ...defaultOptions, ...options }
    const css = generateCssForAnimation(config)
   
    console.log(lihlghtDecompressCode(css, 'css'))
    styleElement = document.createElement('style')
    styleElement.textContent = lightMinifyCode(css, 'css')
    document.head.appendChild(styleElement)
  })

  onUnmounted(() => {
    if (styleElement && document.head.contains(styleElement)) {
      document.head.removeChild(styleElement)
      styleElement = null
    }
  })
}

// --- 辅助函数 ---

const defaultOptions: Required<Omit<UseGradientAnimationOptions, 'items'>> = {
  className: 'gradient-animation',
  colors: THEME_SECONDARY_GRADIENT_COLORS,
  colorsCount: 3,
  speed: 15,
  direction: '90deg',
  gradientTypes: ['linear'],
  triggerTimes: ['mounted'],
  coverBackground: false,
  animation: {
    name: '',
    iterationCount: 'infinite',
    direction: 'normal',
    duration: '',
    timingFunction: 'linear',
    delay: '0s',
    playState: 'running',
  },
}

/**
 * 根据配置生成完整的 CSS 动画代码。
 * @param {object} config - 合并后的配置对象。
 * @returns {string} - 生成的 CSS 字符串。
 */
function generateCssForAnimation(config: typeof defaultOptions): string {
  const { className, triggerTimes, gradientTypes, direction } = config
  const dirSet = new Set<string>()
  const keyframes: string[] = []
  const styles: string[] = []

  triggerTimes.forEach((trigger) => {
    const { gradientColors, baseColors } = prepareColors(config)
    const isRandomDirection =
      direction === 'random' || (config.colorsCount as ColorsSequenceRandom)?.randomDirection

    gradientTypes.forEach((type) => {
      const finalDirection = isRandomDirection
        ? randPick(getDirCandidates(type), dirSet, (v) => v)
        : direction

      const details = getAnimationDetailsForType(type, finalDirection, baseColors, dirSet)
      details.keyframesName = `gradient-anim-${Math.random().toString(36).slice(2, 8)}`

      keyframes.push(`@keyframes ${details.keyframesName} {${details.keyframes}}`)

      const animationDeclaration = buildAnimationDeclaration(details.keyframesName, config)
      const styleBlock = `background-image:${type}-gradient(${details.direction},${gradientColors})${config.coverBackground ? '!important' : ''};background-size:${details.backgroundSize};animation:${animationDeclaration};`

      const finalStyle = `${details.prefixCode || ''}${styleBlock}`
      styles.push(buildCssRule(className, trigger, finalStyle, details.isDiagonal))
    })
  })

  return `${styles.join('')}${keyframes.join('')}`
}

/**
 * 根据渐变类型获取动画细节。
 */
function getAnimationDetailsForType(
  type: GradientType,
  direction: Direction,
  colors: string[],
  dirSet: Set<string>,
): AnimationDetails {
  const options: HandleAnimationOptions = { direction, type, colors, dirSet }
  switch (type) {
    case 'linear':
      return handleLinearAnimation(options)
    case 'radial':
      return handleRadialAnimation(options)
    case 'text':
      return handleTextAnimation(options)
    case 'box-shadow':
      return handleBoxShadowAnimation(options)
    default:
      throw new Error(`Unsupported gradient type: ${type}`)
  }
}

/**
 * 准备和格式化颜色数组。
 */
function prepareColors(config: typeof defaultOptions): {
  gradientColors: string
  baseColors: string[]
} {
  const { colors, colorsCount } = config
  const randomOptions = (colorsCount as ColorsSequenceRandom) || {}
  let start = 0,
    end = colors.length

  if (randomOptions.randomColorsCount) {
    const count =
      typeof randomOptions.randomColorsCount === 'number'
        ? randomOptions.randomColorsCount
        : 1 + random(colors.length, 'floor')
    end = Math.max(1, Math.min(count, colors.length))
  } else if (typeof colorsCount === 'number') {
    end = colorsCount
  } else if (Array.isArray(colorsCount)) {
    ;[start, end] = colorsCount
  }

  let selectedColors = colors.slice(start, end)
  if (randomOptions.randomColorsOrder) {
    selectedColors = selectedColors.sort(() => Math.random() - 0.5)
  }

  const colorStops = selectedColors.map((c, i) =>
    typeof c === 'string'
      ? `${c} ${((i + 1) / (selectedColors.length + 1)) * 100}%`
      : `${c.color} ${c.position}`,
  )

  const gradientColorsArray = [
    `${THEME_MAIN_GRADIENT_COLOR} 0%`,
    ...colorStops,
    `${THEME_MAIN_GRADIENT_COLOR} 100%`,
  ]
  return {
    gradientColors: gradientColorsArray.join(','),
    baseColors: selectedColors.map((c) => (typeof c === 'string' ? c : c.color)),
  }
}

/**
 * 构建 CSS animation 属性字符串。
 */
function buildAnimationDeclaration(name: string, config: typeof defaultOptions): string {
  const { speed, animation } = config
  if (typeof animation === 'string') return `${name} ${animation}`

  const duration = animation.duration || `${60 / speed}s`
  return [
    name,
    duration,
    animation.timingFunction,
    animation.delay,
    animation.iterationCount,
    animation.direction,
    animation.playState,
  ]
    .filter(Boolean)
    .join(' ')
}

/**
 * 构建完整的 CSS 规则。
 */
function buildCssRule(
  className: string,
  trigger: TriggerTime,
  style: string,
  isDiagonal?: boolean,
): string {
  const suffix = trigger === 'mounted' ? '' : `:${trigger}`
  const pseudo = isDiagonal ? '::before' : ''

  if (trigger === 'mounted') {
    return `.${className}${pseudo} {${style}}`
  }

  const baseRule = `.${className}${pseudo} { opacity: 0; }`
  const triggerRule = `.${className}${suffix}${pseudo} { opacity: 1; ${trigger === 'active' ? 'z-index:3;' : ''} }`
  const animationRule = `.${className}${suffix} { ${style} }` // animation on main element for hover/active

  // For diagonal, animation is on pseudo, so we need to handle it differently
  if (isDiagonal) {
    return `.${className} { position: relative; overflow: hidden; } .${className}::before { ${CSS_PSEUDO_BASE}${CSS_TRANSITION_OPACITY} opacity:0; } .${className}${suffix}::before { opacity: 1; ${style} }`
  }

  return `.${className}${suffix} { ${style} }`
}

function getDirCandidates(type: GradientType): Direction[] {
  return type === 'linear'
    ? ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg']
    : ['at center', 'at left', 'at right', 'at top', 'at bottom']
}
