import { onMounted, onUnmounted } from 'vue'
import {
  THEME_SECONDARY_GRADIENT_COLORS,
  THEME_MAIN_GRADIENT_COLORS,
  THEME_HIGH_CONTRAST_NEON_COLORS,
} from '@/assets/css/theme/index'
import { lightMinifyCode, lihlghtDecompressCode } from '@/Function'
import { random } from '@/Function/math'
import NullishCoalescing from '@/views/CoreSkills/JavaScript/ES/NullishCoalescing.vue'

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

//是否随机动画色段,动画方向
type ColorsSequenceRandom = {
  allRandom?: boolean //是否全随机
  randomColorsCount?: boolean | number //是否随机色段数
  randomColorsOrder?: boolean //是否随机色段次序
  randomDirection?: boolean //是否随机方向
}

type ColorsSequenceCount = number | [number, number] | ColorsSequenceRandom

type Direction =
  | '90deg'
  | '180deg'
  | '270deg'
  | '360deg'
  | '45deg'
  | '135deg'
  | '225deg'
  | '315deg'
  | 'to top'
  | 'to right'
  | 'to bottom'
  | 'to left'

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
  colors?: BaseColor[] //颜色数组
  // 颜色段数
  colorsCount?: ColorsSequenceCount
  speed?: number //速度
  direction?: Direction //方向
  animation?: string | AnimationType //动画
}

// --- CSS 代码常量 ---
const CSS_OVERFLOW_HIDDEN = 'position:relative;overflow:hidden;' //溢出隐藏
const CSS_PSEUDO_BASE = `content:'';position:absolute;` //伪元素基础样式
const CSS_TRANSITION_OPACITY = 'transition:opacity 0.2s ease;' //透明度过渡

/**
 * 格式化并美化输出 CSS 代码，超级标准版，便于阅读。
 * 会缩进、换行、对齐冒号和分号，使 CSS 代码结构清晰。
 * @param css 原始 CSS 字符串
 * @returns 格式化后的 CSS 字符串
 */
function formatCss(css: string): string {
  let indent = 0
  const INDENT = '  '
  let result = ''
  let i = 0
  const len = css.length

  while (i < len) {
    const char = css[i]

    if (char === '{') {
      result += ' {\n'
      indent++
      // 跳过紧跟的空白
      while (css[i + 1] === ' ' || css[i + 1] === '\n') i++
    } else if (char === '}') {
      result += '\n'
      indent--
      if (indent < 0) indent = 0 // 修复：防止缩进为负数
      result += INDENT.repeat(indent) + '}\n'
      // 跳过紧跟的空白
      while (css[i + 1] === ' ' || css[i + 1] === '\n') i++
    } else if (char === ';') {
      result += ';\n' + INDENT.repeat(indent)
      // 跳过紧跟的空白
      while (css[i + 1] === ' ' || css[i + 1] === '\n') i++
    } else if (char === ':') {
      result += ': '
    } else if (char === ',') {
      result += ', '
    } else if (char === '/' && css[i + 1] === '*') {
      // 注释处理
      let comment = ''
      while (i < len && !(css[i] === '*' && css[i + 1] === '/')) {
        comment += css[i]
        i++
        // 防止到头还没闭合
        if (i + 1 >= len) break
      }
      if (css[i] === '*' && css[i + 1] === '/') {
        comment += '*/'
        i++
      }
      result += comment + '\n' + INDENT.repeat(indent)
    } else {
      // 首行缩进
      if (result.length === 0 || result.endsWith('\n')) {
        result += INDENT.repeat(indent)
      }
      result += char
    }
    i++
  }

  // 移除多余空行
  result = result.replace(/\n\s*\n/g, '\n')

  // 去除首末多余空白
  return result.trim()
}

/** 处理线性/对角线渐变动画 */
function handleLinearAnimation(direction: string, type: GradientType) {
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
    backgroundSize, //渐变背景大小
    keyframes, //动画关键帧
    keyframesName: '', //动画名称
    direction: finalDirection, //动画方向
    isDiagonal, //是否是斜线动画
    transform, //伪元素变换 旋转用于线性渐变斜线动画
    type, //渐变类型
    animation: '', //动画
    prefixCode: isDiagonal
      ? `&::before{${CSS_TRANSITION_OPACITY}${CSS_PSEUDO_BASE}inset:-35%;transform:${transform};transform-origin:center;`
      : '', //前缀代码
    suffixCode: isDiagonal ? '}' : '', //后缀代码
    styleKey: '', //样式代码
  }
}

/** 处理径向渐变动画 */
function handleRadialAnimation(direction: string, type: GradientType) {
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
    prefixCode: '',
    suffixCode: '',
  }
}

/** 处理文本渐变动画 */
function handleTextAnimation(direction: string, type: GradientType) {
  return {
    backgroundSize: '100% 100%',
    keyframes: '0%{background-position:0% 0%}100%{background-position:100% 100%}',
    keyframesName: '',
    isDiagonal: false,
    direction: direction,
    type,
    prefixCode:
      '-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;display:inline-block;',
    suffixCode: '',
    styleKey: '',
  }
}

/** 处理荧光阴影渐变动画 */
/** 这里我们自定义一组亮眼的荧光色彩，且让动画效果更明显 */
/**
 * 处理荧光阴影渐变动画
 * @param direction 动画方向
 * @param type 渐变类型
 * @param colors 渐变色数组
 * @param options 可选: 控制光晕宽度、模糊度等 { spread?: number, blur?: number, brightness?: number }
 */
function handleBoxShadowAnimation(
  direction: string,
  type: GradientType,
  colors: BaseColor[] = THEME_HIGH_CONTRAST_NEON_COLORS,
  options?: {
    spread?: number // 光晕的 spread，单位 rem，控制收窄
    blur?: number // 模糊半径，单位 rem
    brightness?: number // 亮度
  },
) {
  const neonColors: string[] = colors.map((i) => (typeof i === 'string' ? i : i.color))
  const {
    spread = 0.2, // 光晕扩散
    blur = 0.3, // 模糊(光晕)大小
    brightness = 1.6, // 光晕亮度
  } = options || {}

  // 用参数控制各色的 box-shadow spread&blur
  const sequence = [0, 1, 2, 3]
  const n = sequence.length

  let keyframes = ''
  for (let i = 0; i < n; i++) {
    const percent = Math.round((i * 100) / n)
    // 支持 css 变量，如果 neonColors 里是 css 变量语法则直接拼接
    const c1 = neonColors[i % neonColors.length]
    const c2 = neonColors[(i + 1) % neonColors.length]
    const c3 = neonColors[(i + 2) % neonColors.length]

    // alpha 通道用 aa，如果是变量不拼aa
    const c1Alpha = c1.startsWith('var(') ? c1 : `${c1}`
    const c2Alpha = c2.startsWith('var(') ? c2 : `${c2}`
    const c3Alpha = c3.startsWith('var(') ? c3 : `${c3}aa`

    keyframes += `
      ${percent}% {
        box-shadow: 
          0 0 ${0.9 + blur * 0.5}rem ${spread}rem ${c1Alpha}, 
          0 0 ${1.4 + blur}rem ${spread * 2.3}rem ${c2Alpha}, 
          0 0 ${2.2 + blur * 2.2}rem ${spread * 3.6}rem ${c3Alpha};
      }`
  }
  // 闭合循环
  const c1end = neonColors[0 % neonColors.length]
  const c2end = neonColors[1 % neonColors.length]
  const c3end = neonColors[2 % neonColors.length]
  const c1endAlpha = c1end.startsWith('var(') ? c1end : `${c1end}`
  const c2endAlpha = c2end.startsWith('var(') ? c2end : `${c2end}`
  const c3endAlpha = c3end.startsWith('var(') ? c3end : `${c3end}aa`
  keyframes += `
    100% {
      box-shadow:
        0 0 ${0.9 + blur * 0.5}rem ${spread}rem ${c1endAlpha},
        0 0 ${1.4 + blur}rem ${spread * 2.3}rem ${c2endAlpha},
        0 0 ${2.2 + blur * 2.2}rem ${spread * 3.6}rem ${c3endAlpha};
    }`
  keyframes = keyframes.trim()

  // 前缀用inset:0，且不再往外撑破父元素，filter可调
  return {
    backgroundSize: '100% 100%',
    keyframes,
    keyframesName: '',
    isDiagonal: false,
    direction,
    type,
    prefixCode: `inset:0;border-radius:inherit;filter:blur(${blur}rem) brightness(${brightness});pointer-events:none;`, // 防止撑大父容器
    suffixCode: '',
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
    colorsCount = 2,
    speed = 15,
    gradientTypes = ['linear'],
    triggerTimes = ['mounted', 'hover', 'active'],
    animation = {
      name: '',
      iterationCount: 'infinite',
      direction: 'normal', //光晕收窄
      duration: null,
      timingFunction: 'linear',
      delay: '0s',
      playState: 'running',
    },
  } = options

  let { direction = '90deg' } = options

  if (items.length > 0) {
    items.forEach((item) => {
      useGradientAnimation(item)
    })
    return
  }
  //style元素
  let styleElement: HTMLStyleElement | null = null

  const getDirCandidates = (type: GradientType) => {
    return type === 'linear'
      ? ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg']
      : ['at center', 'at left', 'at right', 'at top', 'at bottom']
  }

  onMounted(() => {
    if (typeof document === 'undefined') return

    const dirSet = new Set<string>()
    //随机选择
    const randPick = <T>(arr: T[], exclude: Set<string>, toKey: (v: T) => string): T => {
      const filtered = arr.filter((v) => !exclude.has(toKey(v)))
      const result = filtered.length > 0 ? filtered[random(filtered.length)] : arr[0]
      exclude.add(toKey(result))
      return result as T
    }

    //获得配置信息数组
    const stateConfigs = triggerTimes.map((trigger) => {
      //随机处理
      let {
        allRandom = false, //是否全随机
        randomColorsCount = false, //是否随机色段数
        randomColorsOrder = false, //是否随机色段次序
        randomDirection = false, //是否随机方向
      } = (colorsCount as ColorsSequenceRandom) || {}

      const randomList = [allRandom, randomColorsCount, randomColorsOrder, randomDirection]

      //是否随机生成
      const shouldRandomize = randomList.some(Boolean)
      if (shouldRandomize) {
        if (allRandom) {
          randomColorsCount = true
          randomDirection = true
          randomColorsOrder = true
        }
      }
   
      let baseColors: BaseColor[] = []

      let start = 0

      let end = (() => {
        if (randomColorsCount) {
          if (typeof randomColorsCount === 'number') return randomColorsCount
          // 如果是 true，则在 1 ~ colors.length 之间随机
          return 1 + random(colors.length, 'floor')
        } else if (typeof colorsCount === 'number') {
          return colorsCount
        } else if (Array.isArray(colorsCount)) {
          // 范围取整随机
          const [min, max] = colorsCount as [number, number]
          start = min
          return max
        }
        return colors.length
      })()
      end = Math.max(1, Math.min(end, colors.length))
      if (shouldRandomize) {
        baseColors = colors.toSorted(randomColorsOrder ? () => Math.random() - 0.5 : undefined)
      }

      baseColors = colors.slice(start, end)
      const colorStops = baseColors.map((c, i) =>
        typeof c === 'string'
          ? `${c} ${((i + 1) / (baseColors.length + 1)) * 100}%`
          : `${c.color} ${c.position}`,
      )
      //生成线性渐变颜色
      const gradientColors = [
        `${THEME_MAIN_GRADIENT_COLORS} 0%`,
        ...colorStops,
        `${THEME_MAIN_GRADIENT_COLORS} 100%`,
      ].join(',')
      //所有触发时机下生成对应的不同渐变类型动画样式配置
      const allGradientTypesConfig = gradientTypes.map((i) => {
        if (randomDirection) {
          direction = randPick(getDirCandidates(i), dirSet, (v) => v) as Direction
        }
        switch (i) {
          case 'linear':
            return handleLinearAnimation(direction, i)
          case 'radial':
            return handleRadialAnimation(direction, i)
          case 'text':
            return handleTextAnimation(direction, i)
          case 'box-shadow':
            const newColors = baseColors.map((i) => (typeof i === 'string' ? i : i.color))
            return handleBoxShadowAnimation(direction, i, newColors)
        }
      })
      //生成动画声明
      const animDecl = (kfn: string) =>
        typeof animation === 'string'
          ? `${kfn} ${animation}`
          : `${kfn} ${animation.duration || (60 / speed) * end + 's'} ${animation.timingFunction} ${animation.delay} ${animation.iterationCount}  ${animation.direction} ${animation.playState}`

      allGradientTypesConfig.map((i) => {
        i.keyframesName = `gradient-anim-${Math.random().toString(36).slice(2, 8)}`
        i.styleKey = `${CSS_OVERFLOW_HIDDEN + i.prefixCode}background-image:${i.type}-gradient(${i.direction || direction},${gradientColors});background-size:${i.backgroundSize};animation:${animDecl(i.keyframesName)};${i.suffixCode}` //生成样式代码
        return i
      })
      return {
        //返回配置信息
        allGradientTypesConfig,
        triggerTime: trigger, //当前触发时机
        classNameSuffix: trigger === 'mounted' ? '' : ':' + trigger, //触发时机类名后缀
      }
    })
    //css代码
    let css = ``

    //每种触发时机下生成对应的不同渐变类型动画样式配置
    stateConfigs.forEach((cfg) => {
      const isHover = cfg.triggerTime === 'hover'
      const isActive = cfg.triggerTime === 'active'
      const itemClassName = className + cfg.classNameSuffix
      cfg.allGradientTypesConfig.map((i) => {
        const isLandD = i.type === 'linear' && i.isDiagonal ? '::before' : ''
        const hoverStyle = isHover ? `${isLandD}opacity:0;&:hover${isLandD}{opacity:1;}` : ''
        const activeStyle = isActive
          ? `${isLandD}opacity:0;&:active${isLandD}{opacity:1;}
        }`
          : ''
        css += `@keyframes ${i.keyframesName}{${i.keyframes}}`
        css += `.${itemClassName}{${i.styleKey + hoverStyle + activeStyle}}`
      })
    })
    console.log(formatCss(css))
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
