import { onMounted, onUnmounted } from 'vue'
import {
  THEME_MAIN_GRADIENT_COLOR,
  THEME_HIGH_CONTRAST_NEON_COLORS,
  THEME_SECONDARY_GRADIENT_COLORS,
  THEME_FONT_GRADIENT_COLORS,
  THEME__MAIN_TEXT_COLOR,
} from '@/assets/css/theme/index'
import { lightMinifyCode, decompressCodeAdvanced } from '@/Function/code'
import { random, randPick } from '@/Function/math'

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

//是否随机动画色段,动画方向
type ColorsSequenceRandom = {
  allRandom?: boolean //是否全随机
  randomColorsCount?: boolean | number //是否随机色段数 数字为确定色段数
  randomColorsOrder?: boolean //是否随机色段次序
  randomDirection?: boolean //是否随机方向
}

type ColorsSequenceCount = number | [number, number] | ColorsSequenceRandom

const LINEAR_DIRECTION_CANDIDATES = [
  '0deg',
  '90deg',
  '180deg',
  '270deg',
  '45deg',
  '135deg',
  '225deg',
  '315deg',
  '360deg',
] as const

const RADIAL_DIRECTION_CANDIDATES = [
  'at center',
  'at left',
  'at right',
  'at top',
  'at bottom',
] as const

/** 方向集合 */
const DIRECTION_CANDIDATES = [
  ...LINEAR_DIRECTION_CANDIDATES,
  ...RADIAL_DIRECTION_CANDIDATES,
  'random',
] as const

type Direction = (typeof DIRECTION_CANDIDATES)[number]

//随机方向池，用于随机选择方向
const getDirCandidates = (type: GradientType): Direction[] => {
  return type === 'linear'
    ? (LINEAR_DIRECTION_CANDIDATES as unknown as Direction[])
    : (RADIAL_DIRECTION_CANDIDATES as unknown as Direction[])
}

const STATIC_CSS_CODE = `position:relative;overflow:hidden;z-index:1;&::before{transition:opacity 0.2s ease;content:'';position:absolute;z-index:-1;transform-origin:center;}`

//荧光阴影渐变配置
interface BoxShadowConfig {
  x: string
  y: string
  spread: number
  blur: number
  brightness: number
  boxShadowColors?: string[]
}

/** useGradientAnimation composable 的全局配置选项 */
interface UseGradientAnimationOptions {
  boxShadowConfig?: BoxShadowConfig
  /** 全局默认的 CSS 类名 */
  className?: string
  /** 渐变动画项数组 */
  items?: Partial<UseGradientAnimationOptions>[]
  /** 全局线性渐变类型数组 默认值，会被 item 内的同名属性覆盖 */
  gradientTypes?: GradientType[]
  /* 需要的触发时机*/
  triggerTimes?: TriggerTime[]
  colors?: BaseColor[] //颜色数组
  textGradientColors?: string[] //字体渐变颜色组
  boxShadowColors?: string[] //盒阴影渐变颜色组
  opacity?: number //透明度
  // 颜色段数
  colorsCount?: ColorsSequenceCount
  speed?: number //速度
  timeUnit?: 's' | 'ms' //时间单位
  direction?: Direction //方向
  animation?: string | AnimationType //动画
  prefixName?: string //前缀名称,防止动画名称冲突
  keyframe?: string //动画关键帧定义
}

/** 动画详情 */
interface AnimationDetails {
  backgroundSize: string
  keyframes: string
  keyframesName?: string
  direction?: Direction
  transform?: string
  type: GradientType
  animation?: string
  insertPseudoElementsCode?: string //插入伪元素内的css代码
  prefixCode?: string //伪元素之外的前缀代码
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
  isText?: boolean //是否是文本渐变
}

// 将解构参数抽离为一个专门的函数
function getGradientAnimationParams(options: UseGradientAnimationOptions = {}) {
  const {
    items = [], //子项配置 子项配置会递归调用 useGradientAnimation
    className = 'gradient-animation', //全局默认的 CSS 类名
    colors = THEME_SECONDARY_GRADIENT_COLORS, //渐变颜色组
    textGradientColors = THEME_FONT_GRADIENT_COLORS, //字体渐变颜色组
    boxShadowColors = THEME_HIGH_CONTRAST_NEON_COLORS, //荧光阴影渐变颜色组
    boxShadowConfig = {
      x: '0',
      y: '0',
      blur: 0,
      spread: 0.2,
      brightness: 1,
    },
    opacity = 1, //全局透明度
    colorsCount = 3, //渐变颜色段数
    speed = 15, //背景渐变动画速度
    timeUnit = 's', //时间单位
    direction = '0deg', //方向
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
    keyframe,
  } = options
  return {
    items,
    className,
    colors,
    textGradientColors,
    boxShadowColors,
    boxShadowConfig,
    opacity,
    colorsCount,
    speed,
    timeUnit,
    keyframe,
    gradientTypes,
    triggerTimes,
    prefixName,
    animation,
    direction,
  }
}

/** 应用渐变动画
 * @description 一个 Vue composable，用于给元素应用动态背景渐变动画。
 * @param options 应用渐变动画的配置选项
 * @returns 应用渐变动画的配置选项
 */
export function useGradientAnimation(options: UseGradientAnimationOptions = {}) {
  //style元素
  let styleElement: HTMLStyleElement | null = null

  onMounted(() => {
    // 使用抽离的函数获得所有参数
    const {
      items,
      className,
      colors,
      textGradientColors,
      boxShadowColors,
      boxShadowConfig,
      opacity,
      colorsCount,
      speed,
      timeUnit,
      gradientTypes,
      triggerTimes,
      prefixName,
      animation,
      direction,
    } = getGradientAnimationParams(options)
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

    //时间单位

    //往大括号里加css代码 大括号是class的{}
    const getAllDynamicCssCode = (code: string) =>
      `.${className}{${STATIC_CSS_CODE}opacity:${opacity};` + code + '}'

    //动画代码 动画代码在大括号外面
    let keyframesCode: string = ''

    //大括号里面的动画代码
    let KeyCode: string = ''

    //每个状态下渐变动画的配置信息
    triggerTimes.forEach((trigger) => {
      //渐变色段
      let baseColors: BaseColor[] = []
      //生成动画声明 kfn动画名
      const animDecl = (kfn: string) =>
        typeof animation === 'string'
          ? `${kfn} ${animation}`
          : `${kfn} ${animation.duration || 60 / speed + timeUnit} ${animation.timingFunction} ${animation.delay} ${animation.iterationCount}  ${animation.direction} ${animation.playState}`

      //核心背景样式css code
      let itemKeyCode: string = ''

      //临时方向
      let temDirection = direction

      const isRandomDirection =
        direction === 'random' ||
        (colorsCount as ColorsSequenceRandom).randomDirection ||
        (colorsCount as ColorsSequenceRandom).allRandom

      //所有触发时机下生成对应的不同渐变类型动画样式配置
      gradientTypes.map((i) => {
        //获得每个渐变类型动画的配置信息
        let item: AnimationDetails = {
          backgroundSize: '',
          keyframes: '',
          direction: '0deg',
          type: i,
          animation: '',
          insertPseudoElementsCode: '',
        }
        if (isRandomDirection) {
          temDirection = randPick(getDirCandidates(i), dirSet, (v) => v)
        }
        console.log(temDirection)
        switch (i) {
          case 'linear':
            item = handleLinearAnimation({ direction: temDirection, type: i })
            //渐变色组颜色并填充主题背景色
            baseColors = [
              `${THEME_MAIN_GRADIENT_COLOR} 0%`,
              ...handleRandomColors(colors, colorsCount),
              `${THEME_MAIN_GRADIENT_COLOR} 100%`,
            ]
            itemKeyCode = `${item.insertPseudoElementsCode ?? ''}background-image:${item.type}-gradient(${item.direction || direction},${baseColors.join(',')});background-size:${item.backgroundSize};`
            break
          case 'radial':
            item = handleRadialAnimation({ direction: temDirection, type: i })
            itemKeyCode = `background-image:${item.type}-gradient(${item.direction || direction},${baseColors.join(',')});background-size:${item.backgroundSize};`
            break
          case 'text':
            item = handleTextAnimation({ direction: temDirection, type: i })
            baseColors = [
              `${THEME__MAIN_TEXT_COLOR} 0%`,
              ...handleRandomColors(textGradientColors, colorsCount),
              `${THEME__MAIN_TEXT_COLOR} 100%`,
            ]
            itemKeyCode = `${item.insertPseudoElementsCode ?? ''}background-image:${item.type}-gradient(${item.direction || direction},${baseColors.join(',')});background-size:${item.backgroundSize};`
            console.log(itemKeyCode)
            break
          case 'box-shadow':
            item = handleBoxShadowAnimation({
              type: i,
              boxShadowConfig,
              boxShadowColors,
            })
            item.type = item.type
            break
        }
        //随机动画帧名
        item.keyframesName = `${prefixName + Math.random().toString(36).slice(2, 8)}`
        //动态添加动画关键帧代码
        keyframesCode += `@keyframes ${item.keyframesName}{${item.keyframes}}`
        //动态添加动画样式代码
        KeyCode +=
          (item.prefixCode ?? '') +
          getPseudoClassAndPseudoElementWrapByTrigger(
            trigger,
            `${itemKeyCode}animation:${animDecl(item.keyframesName)};`,
            !!item.insertPseudoElementsCode,
          )
        return item
      })
    })
    //初始化css代码
    let css = getAllDynamicCssCode(KeyCode)
    css += keyframesCode
    console.log(decompressCodeAdvanced(css, 'css'))
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

//根据方向获得背景位置的开始和结束位置和背景大小
const getBackgroundPositionAndSize = (
  xOrY: 'x' | 'y' | 'diagonal',
  degree?: '90' | '270' | '0' | '180',
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
      start: '0 -200%',
      end: '0 200%',
      backgroundSize: '100% 200%',
    },
  }
  const backgroundSize = (posMap[xOrY] as any).backgroundSize
  //起始位置
  const start =
    xOrY === 'diagonal' ? (posMap[xOrY] as any).start : (posMap[xOrY] as any)[degree ?? '0'].start
  //结束位置
  const end =
    xOrY === 'diagonal' ? (posMap[xOrY] as any).end : (posMap[xOrY] as any)[degree ?? '0'].end
  return {
    backgroundSize,
    keyframes: `0%{background-position:${start}}  100%{background-position:${end}}`,
  }
}

/** 处理线性/对角线渐变动画 */
function handleLinearAnimation({
  direction,
  type,
  isText,//文本渐变不需要处理对角线
}: HandleAnimationOptions): AnimationDetails {
  const numberAngle = parseInt(direction.match(/(-?\d+)/)?.[0] || '180', 10)
  let backgroundSize = '200% 100%',
    keyframes = '0%{background-position:200% 0}100%{background-position:-200% 0}',
    isDiagonal = false,
    transform = '',
    gradientDirection //渐变方向(对角线会旋转)

  const angleMap: Record<string, number> = {
    'to top': 0,
    'to right': 90,
    'to bottom': 180,
    'to left': 270,
  }
  let angle = angleMap[direction] ?? numberAngle - 90
  if (angle < 0) angle += 360
  if (angle > 360) angle -= 360

  gradientDirection = (angle + 'deg') as Direction
  transform = 'rotate(0deg)'
  if (angle % 180 === 0) {
    //这个是Y轴方向的动画
    angle = angle % 360 === 0 ? 0 : 180
    backgroundSize = getBackgroundPositionAndSize(
      'y',
      angle.toString() as '0' | '180',
    ).backgroundSize
    keyframes = getBackgroundPositionAndSize('y', angle.toString() as '0' | '180').keyframes
  } else if (angle % 90 === 0) {
    //这个是X轴方向的动画
    angle = angle === 90 ? 90 : 270
    backgroundSize = getBackgroundPositionAndSize(
      'x',
      angle.toString() as '90' | '270',
    ).backgroundSize
    keyframes = getBackgroundPositionAndSize('x', angle.toString() as '90' | '270').keyframes
  } else {
    //如果是文本不处理对角线，因为对角线需要伪元素旋转，而文字是写在元素里的，伪元素的背景不起作用
    if (!isText) {
      //其他方向就为斜线动画，渐变方向不动,旋转相应角度就可以了
      isDiagonal = true
      transform = `rotate(${numberAngle}deg)`
      backgroundSize = getBackgroundPositionAndSize('diagonal').backgroundSize
      keyframes = getBackgroundPositionAndSize('diagonal').keyframes
      gradientDirection = '0deg' as Direction
    }
  }
  return {
    backgroundSize, //渐变背景大小
    keyframes, //动画关键帧
    direction: gradientDirection, //动画方向
    transform, //伪元素变换 旋转用于线性渐变斜线动画
    type, //渐变类型
    insertPseudoElementsCode: isDiagonal
      ? `inset:-25%;transform:${transform};`
      : `inset:0;transform:${transform};`, //插入代码 如果是对角线动画，则需要旋转伪元素和扩大伪元素的尺寸
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

/** 处理文本渐变动画
 *  0deg, to right: 渐变动画向右走（动画由左到右）
 *  90deg, to top: 渐变动画向上走（动画由下到上）
 *  180deg, to left: 渐变动画向左走（动画由右到左）
 *  270deg, to bottom: 渐变动画向下走（动画由上到下）
 */
function handleTextAnimation({ direction, type }: HandleAnimationOptions): AnimationDetails {
  //文本用的其实是线性渐变
  // 270deg => to bottom（动画向下，渐变方向 to top）
  const {
    backgroundSize,
    keyframes,
    direction: gradientDirection,
  } = handleLinearAnimation({ direction, type, isText: true })
  return {
    backgroundSize,
    keyframes,
    direction: gradientDirection, // 渐变方向应与动画方向相反
    type: 'linear',
    prefixCode:
      '-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;display:inline-block;',
  }
}

//随机色段处理
function handleRandomColors(colors: BaseColor[], colorsCount: ColorsSequenceCount): BaseColor[] {
  let baseColors: BaseColor[] = []
  //随机处理
  let {
    allRandom = false, //是否全随机
    randomColorsCount = false, //是否随机色段数
    randomColorsOrder = false, //是否随机色段次序
    randomDirection = false, //是否随机方向
  } = (colorsCount as ColorsSequenceRandom) || {}
  //全随机
  if (allRandom) {
    randomColorsCount = true
    randomDirection = true
    randomColorsOrder = true
  }
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
  //范围内随机取值
  end = Math.max(1, Math.min(end, colors.length))
  baseColors = colors.slice(start, end)
  //随机排序
  if (randomColorsOrder) {
    baseColors.sort(() => Math.random() - 0.5)
  }
  //颜色填充主题背景色
  baseColors = baseColors.map((c, i) =>
    typeof c === 'string'
      ? `${c} ${((i + 1) / (baseColors.length + 1)) * 100}%`
      : `${c.color} ${c.position}`,
  )
  return baseColors
}

/**
 * 处理荧光阴影渐变动画（两种模式：普通渐变，或旋转闪烁模式）
 * @param direction 动画方向
 * @param type 渐变类型
 * @param boxShadowConfig 盒阴影参数，包含 colors, x, y, spread, blur, brightness, mode
 */
function handleBoxShadowAnimation({
  type,
  boxShadowConfig,
  boxShadowColors,
}: {
  type: GradientType
  boxShadowConfig: BoxShadowConfig
  boxShadowColors: string[]
}): AnimationDetails {
  const { x, y, spread, blur, brightness } = boxShadowConfig
  boxShadowColors = boxShadowConfig.boxShadowColors || boxShadowColors
  // 强制把 x, y, spread, blur 转成 number
  const numX = typeof x === 'number' ? x : parseFloat(x)
  const numY = typeof y === 'number' ? y : parseFloat(y)
  const numSpread = typeof spread === 'number' ? spread : parseFloat(spread)
  const numBlur = typeof blur === 'number' ? blur : parseFloat(blur)

  // 只做色彩切换动画 (不同颜色切换，不是多层渐变叠加)
  let keyframes = ''
  const n = boxShadowColors.length
  for (let i = 0; i < n; i++) {
    const percent = Math.round((i * 100) / n)
    const color = boxShadowColors[i]
    const colorValue = color.startsWith('var(') ? color : `${color}`
    keyframes += `
      ${percent}% {
        box-shadow: ${numX}rem ${numY}rem ${(0.9 + numBlur * 0.5).toFixed(2)}rem ${numSpread.toFixed(2)}rem ${colorValue};
      }`
  }
  // 闭合为第一个颜色
  const color0 = boxShadowColors[0]
  const color0Value = color0.startsWith('var(') ? color0 : `${color0}`
  keyframes += `
    100% {
      box-shadow: ${numX}rem ${numY}rem ${(0.9 + numBlur * 0.5).toFixed(2)}rem ${numSpread.toFixed(2)}rem ${color0Value};
    }`
  keyframes = keyframes.trim()
  return {
    backgroundSize: '100% 100%',
    keyframes,
    type,
    prefixCode: `border-radius:inherit;filter:brightness(${brightness});pointer-events:none;`,
  }
}

//每个触发时机下伪元素的css代码包裹，用于包裹伪元素的css代码
const getPseudoElementCSS = (code: string) => {
  return `&::before{${code}}`
}

//伪类和伪元素css包裹
const getPseudoClassAndPseudoElementWrapByTrigger = (
  trigger: TriggerTime,
  code: string,
  needPseudoElementCSS: boolean = true, //需要伪元素的css代码包裹 box-shadow和text 不需要
) => {
  let prefixCode: string = '',
    suffixCode: string = ''
  switch (trigger) {
    case 'mounted':
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
  }
  return `${prefixCode}${needPseudoElementCSS ? getPseudoElementCSS(code) : code}${suffixCode}`
}
