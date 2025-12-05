import { onMounted, onUnmounted } from 'vue'

/** 渐变类型 */
type GradientType = 'linear' | 'radial' | 'text' | 'box-shadow'

/** 基础颜色类型，可以是字符串或带位置的对象 */
type BaseColor = { colors: string; position: string } | string

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

//是否随机动画色段,动画方向
type ColorsSequenceRandom = {
  allRandom?: boolean //是否全随机
  randomColorsCount?: number //是否随机色段数
  randomColorsOrder?: boolean //是否随机色段次序
  randomDirection?: boolean //是否随机方向
}

type ColorsSequenceCount = number | [number, number] | ColorsSequenceRandom

/** useGradientAnimation composable 的全局配置选项 */
interface UseGradientAnimationOptions {
  /** 全局默认的 CSS 类名 */
  className?: string
  /** 渐变动画项数组 */
  items?: Partial<UseGradientAnimationOptions>[]
  /** 全局线性渐变类型数组 默认值，会被 item 内的同名属性覆盖 */
  gradientTypes?: GradientType[]
  /* 需要的触发时机*/
  triggerTimes?: TriggerTime[]
  colors?: BaseColor[]
  colorsCount?: ColorsSequenceCount
  speed?: number
  direction?: string
  animation?: string | AnimationType
}

// --- CSS 代码常量 ---
const CSS_OVERFLOW_HIDDEN = 'position:relative;overflow:hidden;'
const CSS_PSEUDO_BASE = `content:'';position:absolute;`
const CSS_TRANSITION_OPACITY = 'transition:opacity 0s ease;'

// --- 默认颜色变量 ---
const THEME_MAIN_GRADIENT_COLORS = 'var(--color-gradient-group-1)'
// 主题次要渐变颜色变量数组 根据 theme.less 中的定义顺序
const THEME_SECONDARY_GRADIENT_COLORS = [
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
  'var(--color-gradient-group-12)',
  'var(--color-gradient-group-13)',
  'var(--color-gradient-group-14)',
]

/** 压缩 CSS 字符串 */
function compressCss(css: string): string {
  return css
    .replace(/\s*\n\s*|\/\*.*?\*\//g, '')
    .replace(/;\s*}/g, '}')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*,\s*/g, ',')
    .trim()
}

/** 根据 direction 推断底层的渐变类型 */
const inferUnderlyingType = (dir: string): 'linear' | 'radial' =>
  /deg|to\s+(left|right|top|bottom)/i.test(dir) ? 'linear' : 'radial'

/** 处理线性/对角线渐变动画 */
function handleLinearAnimation(direction: string, type: 'linear' | 'radial') {
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
  // const normalizedAngle = ((angle % 360) + 360) % 360
  if (angle === 0 || angle === 180) {
    backgroundSize = '100% 200%'
    keyframes = '0%{background-position:0 200%}100%{background-position:0 -200%}'
  } else if (angle !== 90 && angle !== 270) {
    isDiagonal = true
    backgroundSize = '200% 200%'
    keyframes = '0%{background-position:200% 200%}100%{background-position:-200% -200%}'
    const rotationMap: Record<number, { rotate: string; dir: string }> = {
      45: { rotate: '-45deg', dir: '90deg' },
      135: { rotate: '135deg', dir: '180deg' },
      225: { rotate: '-225deg', dir: '270deg' },
      315: { rotate: '315deg', dir: '360deg' },
    }
    const diagonal = rotationMap[angle] || { rotate: '-45deg', dir: '90deg' }
    transform = `rotate(${diagonal.rotate})`
    finalDirection = diagonal.dir
  }
  return {
    backgroundSize,
    keyframes,
    keyframesName: '',
    direction: finalDirection,
    isDiagonal,
    transform,
    type,
    animation: '',
    styleKey: '',
  }
}

/** 处理径向渐变动画 */
function handleRadialAnimation(direction: string, type: 'linear' | 'radial') {
  return {
    backgroundSize: '200% 200%',
    keyframes:
      '0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}',
    direction: /at\s+/.test(direction) ? `circle ${direction}` : 'circle at center',
    isDiagonal: false,
    transform: '',
    type,
    keyframesName: '',
    animation: '',
    styleKey: '',
  }
}

/**
 * @description 一个 Vue composable，用于给元素应用动态背景渐变动画。
 */
export function useGradientAnimation(options: UseGradientAnimationOptions = {}) {
  const {
    items = [],
    className = 'gradient-animation',
    colors = THEME_SECONDARY_GRADIENT_COLORS,
    colorsCount,
    speed = 20,
    direction = '90deg',
    gradientTypes = ['linear'],
    triggerTimes = ['mounted', 'hover', 'active'],
    animation = {
      name: '',
      iterationCount: 'infinite',
      direction: 'normal',
      duration: '2s',
      timingFunction: 'linear',
      delay: '0s',
      playState: 'running',
    },
  } = options
  const globalDefaults = {
    colorsCount,
    speed,
    direction,
    gradientTypes,
    triggerTimes,
    animation,
    colors,
  }
  let styleElement: HTMLStyleElement | null = null

  onMounted(() => {
    if (typeof document === 'undefined') return

    const randPick = <T>(arr: T[], exclude: Set<string>, toKey: (v: T) => string): T => {
      const filtered = arr.filter((v) => !exclude.has(toKey(v)))
      return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : arr[0]
    }
    const shuffle = <T>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5)

    const usedDirections = new Set<string>()
    const usedColorStops = new Set<string>()

    //获得配置信息数组
    const stateConfigs = triggerTimes.map((trigger) => {
      const mergedItem = { className, ...globalDefaults }

      const { gradientTypes, colors, speed, animation } = mergedItem

      let { direction, colorsCount } = mergedItem

      let {
        allRandom = false,
        randomColorsCount = 3,
        randomColorsOrder = false,
        randomDirection = false,
      } = (colorsCount as ColorsSequenceRandom) || {}

      let randomList = [allRandom, randomColorsCount, randomColorsOrder, randomDirection]

      //是否随机生成
      const shouldRandomize = randomList.some(Boolean)
      if (shouldRandomize) {
        const underlyingType = inferUnderlyingType(direction)
        if (allRandom) {
          randomColorsCount = Math.floor(Math.random() * colors.length)
          randomDirection = true
          randomColorsOrder = true
        }
        const dirCandidates =
          underlyingType === 'linear'
            ? ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg']
            : ['at center', 'at left', 'at right', 'at top', 'at bottom']
        direction = randomDirection ? randPick(dirCandidates, usedDirections, (v) => v) : direction
        usedDirections.add(direction)
      }
      const hasText = gradientTypes.includes('text')
      const hasBoxShadow = gradientTypes.includes('box-shadow')
      const preTextCode = hasText
        ? '-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;display:inline-block;'
        : ''
      let baseColors: BaseColor[] = []

      if (typeof colorsCount === 'number') baseColors = colors.slice(0, colorsCount)
      else if (Array.isArray(colorsCount)) baseColors = colors.slice(colorsCount[0], colorsCount[1])
      else if (shouldRandomize) {
        baseColors = colors
          .toSorted(randomColorsOrder ? () => Math.random() - 0.5 : undefined)
          .slice(0, randomColorsCount)
      }
      const colorStops = baseColors.map((c, i) =>
        typeof c === 'string'
          ? `${c} ${((i + 1) / (baseColors.length + 1)) * 100}%`
          : `${c.colors} ${c.position}`,
      )
      const gradientColors = [
        `${THEME_MAIN_GRADIENT_COLORS} 0%`,
        ...colorStops,
        `${THEME_MAIN_GRADIENT_COLORS} 100%`,
      ].join(',')

      const set = new Set(['linear', 'radial'])

      const underlyingTypes = gradientTypes
        .map((i) => {
          if (i === 'text' || i === 'box-shadow') {
            return inferUnderlyingType(direction)
          }
          return i
        })
        .filter((i) => set.has(i))

      const details = underlyingTypes.map((i) =>
        i === 'radial' ? handleRadialAnimation(direction, i) : handleLinearAnimation(direction, i),
      )
      const animDecl = (kfn: string) =>
        typeof animation === 'string'
          ? `${kfn} ${animation}`
          : `${kfn} ${animation.duration || 60 / speed + 's'} ${animation.timingFunction || 'linear'} ${animation.delay || '0s'} ${animation.iterationCount || 'infinite'} ${animation.direction || 'normal'} ${animation.playState || 'running'}`

      let hasDiagonal = false
      details.map((i) => {
        i.keyframesName = `gradient-anim-${Math.random().toString(36).slice(2, 8)}`
        i.styleKey = `${preTextCode}${CSS_OVERFLOW_HIDDEN}background-image:${i.type}-gradient(${i.direction || direction},${gradientColors});background-size:${i.backgroundSize};animation:${animDecl(i.keyframesName)};`
        // i.animation = animDecl(i.keyframesName)
        if (i.isDiagonal) hasDiagonal = true
        return i
      })
      return {
        details,
        classNameSuffix: trigger === 'mounted' ? '' : '-' + trigger,
        hasDiagonal,
        hasText,
        hasBoxShadow,
      }
    })
    let css = ``
    // const mountedCfg = stateConfigs.find((c) => c.triggerTime === 'mounted')!
    // const hoverCfg = stateConfigs.find((c) => c.triggerTime === 'hover')!
    // const activeCfg = stateConfigs.find((c) => c.triggerTime === 'active')!

    //   const needsPseudoLayers =
    //   (mountedCfg&&hasDiagonal(mountedCfg.details)) ||
    //   (mountedCfg&&mountedCfg.hasBoxShadow) ||
    //  (activeCfg&&hasDiagonal(activeCfg.details)) ||
    //  (activeCfg&&activeCfg.hasBoxShadow) ||
    //     hasDiagonal(hoverCfg.details) ||
    //     hoverCfg.hasBoxShadow  ||

    //   const classNameList = [];

    //   if (mountedCfg.isText) {
    //     css += `.${classNameText}{${mountedCfg.styleKey}}`
    //     css += `.${hoverClassNameText}{${hoverCfg.styleKey}}`
    //     css += `.${activeClassNameText}{${activeCfg.styleKey}}`
    //   } else if (needsPseudoLayers) {
    //     const getLayerStyle = (cfg: typeof mountedCfg) => {
    //       if (cfg.isBoxShadow)
    //         return `${CSS_PSEUDO_BASE}inset:-12%;border-radius:inherit;${cfg.styleKey}filter:blur(20px);`
    //       if (cfg.isDiagonal)
    //         return `${CSS_PSEUDO_BASE}inset:-35%;${cfg.styleKey}transform:${cfg.transform};transform-origin:center;`
    //       return `${CSS_PSEUDO_BASE}inset:0;${cfg.styleKey}`
    //     }
    //     css += `.${className}{${CSS_OVERFLOW_HIDDEN}}`
    //     css += `.${className}::before{${getLayerStyle(mountedCfg)}z-index:-2;opacity:1;${CSS_TRANSITION_OPACITY}}`
    //     css += `.${className}::after{${getLayerStyle(hoverCfg)}z-index:-1;opacity:0;${CSS_TRANSITION_OPACITY}}`
    //     css += `.${className}:hover::before{opacity:0;}`
    //     css += `.${className}:hover::after{opacity:1;}`
    //     css += `.${className}:active::before{${getLayerStyle(activeCfg)}z-index:0;opacity:1;}`
    //     css += `.${className}:active::after{opacity:0;}`
    //   } else {
    //     css += `.${className}{${CSS_OVERFLOW_HIDDEN}${mountedCfg.styleKey}}`
    //     css += `.${className}::before{${CSS_PSEUDO_BASE}inset:0;${hoverCfg.styleKey}z-index:0;opacity:0;${CSS_TRANSITION_OPACITY}}`
    //     css += `.${className}::after{${CSS_PSEUDO_BASE}inset:0;${activeCfg.styleKey}z-index:1;opacity:0;${CSS_TRANSITION_OPACITY}}`
    //     css += `.${className}:hover{background-image:none;}`
    //     css += `.${className}:hover::before{opacity:1;}`
    //     css += `.${className}:active{background-image:none;}`
    //     css += `.${className}:active::before{opacity:0;}`
    //     css += `.${className}:active::after{opacity:1;}`
    //   }
    stateConfigs.forEach((cfg) => {
      const itemClassName = className + cfg.classNameSuffix
      cfg.details.map((i) => {
        css += `@keyframes ${i.keyframesName}{${i.keyframes}};`
        css += `.${itemClassName}{${i.styleKey}};`
      })
      const needsPseudoLayers = cfg.hasDiagonal || cfg.hasBoxShadow || cfg.hasText
      if (needsPseudoLayers) {
        const getLayerStyle = (cfg: any) => {
          if (cfg.hasBoxShadow)
            return `${CSS_PSEUDO_BASE}inset:-12%;border-radius:inherit;${cfg.styleKey}filter:blur(20px);`
          if (cfg.hasDiagonal)
            return `${CSS_PSEUDO_BASE}inset:-35%;${cfg.styleKey}transform:${cfg.transform};transform-origin:center;`
          return `${CSS_PSEUDO_BASE}inset:0;${cfg.styleKey}`
        }
        css += `.${itemClassName}{${CSS_OVERFLOW_HIDDEN}}`
        css += `.${itemClassName}::before{${getLayerStyle(cfg)}z-index:-2;opacity:1;${CSS_TRANSITION_OPACITY}};&:hover::before{opacity:0;}`
        css += `.${itemClassName}::after{${getLayerStyle(cfg)}z-index:-1;opacity:0;${CSS_TRANSITION_OPACITY}};hover::after{opacity:1;}`
        css += `.${itemClassName}:active::before{${getLayerStyle(cfg)}z-index:0;opacity:1;}`
        css += `.${itemClassName}:active::after{opacity:0;}`
      }
      // css += `@keyframes ${cfg.keyframesName}{${cfg.keyframes}}`
    })
    // 将 css 格式化为可读的格式后输出  不要删除这个函数
    function formatCss(css: string) {
      // 简单的格式化: 每个 { 后换行缩进，每个 } 后换行，不处理注释
      let indent = 0
      return css
        .replace(/([\{\}])/g, '\n$1\n')
        .split('\n')
        .map((line) => {
          if (line.trim() === '}') indent--
          let res = '  '.repeat(indent) + line.trim()
          if (line.trim() === '{') indent++
          return res
        })
        .filter(Boolean)
        .join('\n')
        .replace(/;\s*/g, ';\n  ')
    }
    // css = compressCss(css)
    // console.log(css)
    let newCss = `@keyframes gradient-anim-0la464{0%{background-position:200% 0}100%{background-position:-200% 0}};.home-id{position:relative;overflow:hidden;background-image:linear-gradient(90deg,var(--color-gradient-group-1) 0%,var(--color-gradient-group-10) 25%,var(--color-gradient-group-11) 50%,var(--color-gradient-group-12) 75%,var(--color-gradient-group-1) 100%);background-size:200% 100%;animation:gradient-anim-0la464 2s linear 0s infinite normal running};`
    styleElement = document.createElement('style')
    styleElement.textContent = newCss
    document.head.appendChild(styleElement)
  })

  onUnmounted(() => {
    if (styleElement && document.head.contains(styleElement)) {
      document.head.removeChild(styleElement)
      styleElement = null
    }
  })
}
