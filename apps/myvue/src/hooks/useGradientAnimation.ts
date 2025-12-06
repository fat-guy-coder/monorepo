import { GradientIcon } from './../views/CoreSkills/HTML_CSS/Components/RelativeColorScheme'
import { onMounted, onUnmounted } from 'vue'
import {
  THEME_MAIN_GRADIENT_COLOR,
  THEME_HIGH_CONTRAST_NEON_COLORS,
  THEME_SECONDARY_GRADIENT_COLORS,
} from '@/assets/css/theme/index'
import { lightMinifyCode, lihlghtDecompressCode } from '@/Function'
import { random } from '@/Function/math'

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
  | 'random'

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
  coverBackground?: boolean //是否需要覆盖元素底层背景
}

// --- CSS 代码常量 ---
const CSS_POSITION_RELATIVE = 'position:relative;>*{ position: relative;z-index: 1;}' //相对定位
const CSS_OVERFLOW_HIDDEN = 'overflow:hidden;' //溢出隐藏
const CSS_PSEUDO_BASE = `content:'';position:absolute;` //伪元素基础样式
const CSS_TRANSITION_OPACITY = 'transition:opacity 0.2s ease;' //透明度过渡

/** 动画详情 */
interface AnimationDetails {
  backgroundSize: string
  keyframes: string
  keyframesName?: string
  direction: Direction
  isDiagonal?: boolean
  transform?: string
  type: GradientType
  animation?: string
  prefixCode?: string
  suffixCode?: string
  styleKey?: string
}

/** 渐变动画函数参数 */
interface HandleAnimationOptions {
  direction: Direction
  type: GradientType
  spread?: number // 光晕的 spread，单位 rem，控制收窄
  blur?: number // 模糊半径，单位 rem
  brightness?: number // 亮度
  colors?: string[] // 颜色数组
  dirSet?: Set<string> // 方向集合 并且随机方向
}

/** 处理线性/对角线渐变动画 */
function handleLinearAnimation({ direction, type }: HandleAnimationOptions): AnimationDetails {
  let backgroundSize = '200% 100%',
    keyframes = '0%{background-position:200% 0}100%{background-position:-200% 0}',
    isDiagonal = false,
    transform = '',
    gradientDirection = direction,
    finalDirection = 0

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
    finalDirection = parseInt(diagonal.dir) + parseInt(diagonal.rotate)
    if (finalDirection > 360) {
      finalDirection = finalDirection % 360
    }
    console.log(finalDirection + 'finalDirection')
    gradientDirection = diagonal.dir as Direction
  }

  return {
    backgroundSize, //渐变背景大小
    keyframes, //动画关键帧
    direction: gradientDirection, //动画方向
    isDiagonal, //是否是斜线动画
    transform, //伪元素变换 旋转用于线性渐变斜线动画
    type, //渐变类型
    prefixCode: isDiagonal
      ? `&::before{${CSS_TRANSITION_OPACITY}${CSS_PSEUDO_BASE}inset:-25%;transform:${transform};transform-origin:center;`
      : '', //前缀代码
    suffixCode: isDiagonal ? '}' : '', //后缀代码
  }
}

/** 处理径向渐变动画 */
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

/** 处理文本渐变动画 */
function handleTextAnimation({ direction, type }: HandleAnimationOptions): AnimationDetails {
  return {
    backgroundSize: '100% 100%',
    keyframes: '0%{background-position:0% 0%}100%{background-position:100% 100%}',
    keyframesName: '',
    isDiagonal: false,
    direction: direction as Direction,
    type,
    prefixCode:
      '-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;display:inline-block;',
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
function handleBoxShadowAnimation({
  direction,
  type,
  colors = THEME_HIGH_CONTRAST_NEON_COLORS,
  spread = 0.2, // 光晕扩散
  blur = 0.3, // 模糊(光晕)大小
  brightness = 1.6, // 光晕亮度
}: HandleAnimationOptions): AnimationDetails {
  // 用参数控制各色的 box-shadow spread&blur
  const sequence = [0, 1, 2, 3]
  const n = sequence.length
  let keyframes = ''
  for (let i = 0; i < n; i++) {
    const percent = Math.round((i * 100) / n)
    // 支持 css 变量，如果 neonColors 里是 css 变量语法则直接拼接
    const c1 = colors[i % colors.length]
    const c2 = colors[(i + 1) % colors.length]
    const c3 = colors[(i + 2) % colors.length]

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
  const c1end = colors[0 % colors.length]
  const c2end = colors[1 % colors.length]
  const c3end = colors[2 % colors.length]
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
    direction: direction as Direction,
    type,
    prefixCode: `inset:0;border-radius:inherit;filter:blur(${blur}rem) brightness(${brightness});pointer-events:none;`, // 防止撑大父容器
  }
}

/**
 * @description 一个 Vue composable，用于给元素应用动态背景渐变动画。
 */
export function useGradientAnimation(options: UseGradientAnimationOptions = {}) {
  const {
    items = [], //子项配置
    className = 'gradient-animation', //全局默认的 CSS 类名
    colors = THEME_SECONDARY_GRADIENT_COLORS, //渐变颜色组
    colorsCount = 3, //渐变颜色段数
    speed = 15, //背景渐变动画速度
    direction = '90deg', //全局默认的渐变方向
    gradientTypes = ['linear'], //渐变类型
    triggerTimes = ['mounted'], //背景渐变动画触发时机
    coverBackground = false, //是否需要覆盖元素底层背景
    animation = {
      name: '', //动画名称
      iterationCount: 'infinite', //动画迭代次数
      direction: 'normal', //背景渐变动画方向
      duration: null, //背景渐变动画持续时间
      timingFunction: 'linear', //背景渐变动画缓动函数
      delay: '0s', //背景渐变动画延迟
      playState: 'running', //背景渐变动画状态
    },
  } = options

  const coverBackgroundCode = coverBackground ? `!important` : ''

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

  //方向集合，用于随机选择方向
  const dirSet = new Set<string>()

  onMounted(() => {
    if (typeof document === 'undefined') return

    //随机选择
    const randPick = <T>(arr: T[], exclude: Set<string>, toKey: (v: T) => string): T => {
      const filtered = arr.filter((v) => !exclude.has(toKey(v)))
      const result = filtered.length > 0 ? filtered[random(filtered.length)] : arr[0]
      exclude.add(toKey(result))
      return result as T
    }

    //每个状态下渐变动画的配置信息
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
        `${THEME_MAIN_GRADIENT_COLOR} 0%`,
        ...colorStops,
        `${THEME_MAIN_GRADIENT_COLOR} 100%`,
      ].join(',')

      let finalDirection = direction
      //所有触发时机下生成对应的不同渐变类型动画样式配置
      const allGradientTypesConfig = gradientTypes.map((i) => {
        if (randomDirection) {
          finalDirection = randPick(getDirCandidates(i), dirSet, (v) => v) as Direction
        }
        switch (i) {
          case 'linear':
            return handleLinearAnimation({ direction: finalDirection, type: i })
          case 'radial':
            return handleRadialAnimation({ direction: finalDirection, type: i })
          case 'text':
            return handleTextAnimation({ direction: finalDirection, type: i })
          case 'box-shadow':
            const newColors = baseColors.map((i) => (typeof i === 'string' ? i : i.color))
            return handleBoxShadowAnimation({
              direction: finalDirection,
              type: i,
              colors: newColors,
            })
        }
      })
      //生成动画声明
      const animDecl = (kfn: string) =>
        typeof animation === 'string'
          ? `${kfn} ${animation}`
          : `${kfn} ${animation.duration || 60 / speed + 's'} ${animation.timingFunction} ${animation.delay} ${animation.iterationCount}  ${animation.direction} ${animation.playState}`

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
