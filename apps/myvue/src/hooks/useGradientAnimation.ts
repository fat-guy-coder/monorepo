import { onMounted, onUnmounted } from 'vue'
import {
  THEME_MAIN_GRADIENT_COLOR,
  THEME_HIGH_CONTRAST_NEON_COLORS,
  THEME_SECONDARY_GRADIENT_COLORS,
} from '@/assets/css/theme/index'
import { lightMinifyCode, lihlghtDecompressCode } from '@/Function'
import { random, randPick } from '@/Function/math'

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

/** 方向集合 */
const DIRECTION_CANDIDATES = [
  //文本 和 背景 线性渐变
  '0deg',
  '90deg',
  '180deg',
  '270deg',
  '45deg',
  '135deg',
  '225deg',
  '315deg',
  'to top',
  'to right',
  'to bottom',
  'to left',
  //径向  背景 渐变
  'at center',
  'at left',
  'at right',
  'at top',
  'at bottom',
]

type Direction = (typeof DIRECTION_CANDIDATES)[number]

//随机方向池，用于随机选择方向
const getDirCandidates = (type: GradientType, trigger: TriggerTime) => {
  if (type === 'linear') {
    return ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg']
  } else {
    return ['at center', 'at left', 'at right', 'at top', 'at bottom']
  }
}

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
  opacity?: number //透明度
  // 颜色段数
  colorsCount?: ColorsSequenceCount
  speed?: number //速度
  direction?: Direction //方向
  animation?: string | AnimationType //动画
  prefixName?: string //前缀名称,防止动画名称冲突
  coverBackground?: boolean //是否需要覆盖元素底层背景
}

// --- CSS 代码常量 ---
const CSS_STATIC = `position:relative;overflow:hidden;z-index:1;&::before{transition:opacity 0.2s ease;content:'';position:absolute;z-index:-1;transform-origin:center;`

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
  insertPseudoCode?: string //插入伪元素的css代码
  prefixCode?: string //伪元素之外的前缀代码
  finalDirection?: number //最终渐变呈现方向
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
  index?: number //当前序号
}

/** 处理线性/对角线渐变动画 */
function handleLinearAnimation({ direction, type }: HandleAnimationOptions): AnimationDetails {
  const numberAngle = parseInt(direction.match(/(-?\d+)/)?.[0] || '180', 10)
  let backgroundSize = '200% 100%',
    keyframes = '0%{background-position:200% 0}100%{background-position:-200% 0}',
    isDiagonal = false,
    transform = '',
    gradientDirection = direction, //渐变方向(对角线会旋转)
    finalDirection = numberAngle //最终方向

  const angleMap: Record<string, number> = {
    'to top': 0,
    'to right': 90,
    'to bottom': 180,
    'to left': 270,
  }
  let angle = (angleMap[direction] ?? numberAngle) - (numberAngle % 90 === 0 ? 90 : 0)

  gradientDirection = (angle + 'deg') as Direction

  //根据方向获得背景位置的开始和结束位置和背景大小
  const getBackgroundPositionAndSize = (
    xOrY: 'x' | 'y' | 'diagonal',
    degree: '90' | '270' | '0' | '180' | '45' | '135' | '225' | '315',
  ) => {
    const posMap = {
      x: {
        90: { start: '-200% 0', end: '200% 0' },
        270: { start: '200% 0', end: '-200% 0' },
        backgroundSize: '200% 100%',
      },
      y: {
        0: { start: '0 -200%', end: '0 200%' },
        180: { start: '0 200%', end: '0 -200%' },
        backgroundSize: '100% 200%',
      },
      diagonal: {
        45: { start: '200% 200%', end: '-200% -200%' },
        135: { start: '-200% 200%', end: '200% -200%' },
        225: { start: '-200% -200%', end: '200% 200%' },
        315: { start: '200% -200%', end: '-200% 200%' },
        backgroundSize: '200% 200%',
      },
    }
    const backgroundSize = (posMap[xOrY] as any)[degree].backgroundSize
    //起始位置
    const start = (posMap[xOrY] as any)[degree].start
    //结束位置
    const end = (posMap[xOrY] as any)[degree].end
    return {
      backgroundSize,
      keyframes: `0%{background-position:${start}}100%{background-position:${end}}`,
    }
  }
  if (angle % 180 === 0) {
    //这个是Y轴方向的动画
    angle = angle % 360 === 0 ? 0 : 180
    backgroundSize = '100% 200%'
    //angle == 0 根据角度获取背景位置的负号符
    keyframes = `0%{background-position:${angle == 0 ? '0 -200%' : '0 200%'}}100%{background-position:${angle == 0 ? '0 200%' : '0 -200%'}}`
  } else if (angle % 90 === 0) {
    //这个是X轴方向的动画
    angle = angle === 90 || angle === -270 ? 90 : 270
    backgroundSize = '200% 100%'
    //angle == 90 根据角度获取背景位置的负号符
    keyframes = `0%{background-position:${angle == 90 ? '-200% 0' : '200% 0'}}100%{background-position:${angle == 90 ? '200% 0' : '-200% 0'}}`
  } else {
    //其他方向就为斜线动画，旋转45度
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
    gradientDirection = diagonal.dir as Direction
  }

  return {
    finalDirection, //最终方向
    backgroundSize, //渐变背景大小
    keyframes, //动画关键帧
    direction: gradientDirection, //动画方向
    isDiagonal, //是否是斜线动画
    transform, //伪元素变换 旋转用于线性渐变斜线动画
    type, //渐变类型
    insertPseudoCode: isDiagonal ? `inset:-25%;transform:${transform};` : 'inset:0;', //插入代码
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
    backgroundSize: '400% 400%',
    keyframes: '0%{background-position:0% 0%}100%{background-position:100% 100%}',
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
  //style元素
  let styleElement: HTMLStyleElement | null = null

  onMounted(() => {
    const {
      items = [], //子项配置
      className = 'gradient-animation', //全局默认的 CSS 类名
      colors = THEME_SECONDARY_GRADIENT_COLORS, //渐变颜色组
      opacity = 1, //透明度
      colorsCount = 3, //渐变颜色段数
      speed = 15, //背景渐变动画速度
      direction = '90deg', //全局默认的渐变方向
      gradientTypes = ['linear'], //渐变类型
      triggerTimes = ['mounted'], //背景渐变动画触发时机
      // coverBackground = false, //是否需要覆盖元素底层背景
      prefixName = 'gradient-anim-', //前缀名称,防止
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
    if (typeof document === 'undefined') return

    //自定义渐变色数组配置子项
    if (items.length > 0) {
      items.forEach((item) => {
        useGradientAnimation(item)
      })
      return
    }

    //方向集合，用于随机选择方向
    const dirSet = new Set<string>()

    //获取需要公共伪元素的css代码(三种触发时机下公用的伪元素css代码)
    const getCommonPseudoElementCSS = () => {
      return `&::before{${CSS_STATIC}}`
    }

    //时间单位
    const timeUnit = 's'

    let newCss = `.${className}{${getCommonPseudoElementCSS()}}`

    console.log(newCss)

    //动画代码列表
    const keyframesList: string[] = []
    //css代码
    let css = ``

    //每个触发时机下伪元素的css代码包裹，用于包裹伪元素的css代码
    const getPseudoElementCSS = (code: string) => {
      return `&::before{${code}}`
    }

    //获取每个关键渐变类型的动态css动画代码
    const getEveryDynamicCssCodeByTrigger = (
      trigger: TriggerTime,
      code: string,
      needPseudoElementCSS: boolean = false, //需要伪元素的css代码包裹 box-shadow 不需要
    ) => {
      let prefixCode, suffixCode: string
      switch (trigger) {
        case 'mounted':
          prefixCode = ''
          suffixCode = ''
          break
        case 'hover':
          prefixCode = '&:hover{'
          suffixCode = '}'
          break
        case 'active':
          prefixCode = '&:active{'
          suffixCode = '}'
          break
        default:
          prefixCode = ''
          suffixCode = ''
          break
      }
      return `${prefixCode + getPseudoElementCSS(code) + suffixCode}`
      // return `${prefixCode}${needPseudoElementCSS ? getPseudoElementCSS(code) : code}${suffixCode}`
    }

    //每个状态下渐变动画的配置信息
    triggerTimes.forEach((trigger) => {
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
      //渐变色组起始位置
      let start = 0
      //渐变色组结束位置
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
      baseColors = colors.slice(start, end)
      if (shouldRandomize) {
        baseColors = colors.toSorted(randomColorsOrder ? () => Math.random() - 0.5 : undefined)
      }
      baseColors = baseColors.map((c, i) =>
        typeof c === 'string'
          ? `${c} ${((i + 1) / (baseColors.length + 1)) * 100}%`
          : `${c.color} ${c.position}`,
      )
      //渐变色组颜色并填充主题背景色
      baseColors = [
        `${THEME_MAIN_GRADIENT_COLOR} 0%`,
        ...baseColors,
        `${THEME_MAIN_GRADIENT_COLOR} 100%`,
      ]
      //生成线性渐变颜色css字符串
      const gradientColorsString = baseColors.join(',')

      //生成动画声明 kfn动画名
      const animDecl = (kfn: string) =>
        typeof animation === 'string'
          ? `${kfn} ${animation}`
          : `${kfn} ${animation.duration || 60 / speed + timeUnit} ${animation.timingFunction} ${animation.delay} ${animation.iterationCount}  ${animation.direction} ${animation.playState}`

      let randowDirection = direction
      //所有触发时机下生成对应的不同渐变类型动画样式配置
      gradientTypes.map((i) => {
        if (direction === 'random' || randomDirection) {
          randowDirection = randPick(getDirCandidates(i, trigger), dirSet, (v) => v) as Direction
        }
        //获得每个渐变类型动画的配置信息
        let item: AnimationDetails = {
          backgroundSize: '',
          keyframes: '',
          direction: '90deg',
          type: 'linear',
          animation: '',
          insertPseudoCode: '',
        }
        switch (i) {
          case 'linear':
            item = handleLinearAnimation({ direction: randowDirection, type: i })
            break
          case 'radial':
            item = handleRadialAnimation({ direction: randowDirection, type: i })
            break
          case 'text':
            item = handleTextAnimation({ direction: randowDirection, type: i })
            break
          case 'box-shadow':
            const newColors = baseColors.map((i) => (typeof i === 'string' ? i : i.color))
            item = handleBoxShadowAnimation({
              direction: randowDirection,
              type: i,
              colors: newColors,
            })
        }

        item.keyframesName = `${prefixName + Math.random().toString(36).slice(2, 8)}`
        keyframesList.push(`@keyframes ${item.keyframesName}{${item.keyframes}}`)
        getEveryDynamicCssCodeByTrigger(
          trigger,
          `${item.prefixCode ?? '' + item.insertPseudoCode}background-image:${item.type}-gradient(${item.direction || direction},${gradientColorsString});background-size:${item.backgroundSize};animation:${animDecl(item.keyframesName)};`,
        )
        css += `.${className}{${CSS_STATIC + item.insertPseudoCode}background-image:${item.type}-gradient(${item.direction || direction},${gradientColorsString});background-size:${item.backgroundSize};animation:${animDecl(item.keyframesName)};}}`
        return item
      })
    })
    css += keyframesList.join('\n')
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
