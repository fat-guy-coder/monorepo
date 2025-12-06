//vue translation 设置动画类型
//切换动画形式
export type AnimationType =
  | 'lift'
  | 'scale'
  | 'slide'
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'glow'
  | 'pulse'

//动画阶段类名后缀
export type AnimationStage =
  | 'enter-from'
  | 'enter-active'
  | 'enter-to'
  | 'leave-from'
  | 'leave-active'
  | 'leave-to'

export const getAnimationClassName = (
  animation: AnimationType | AnimationType[],
  stage: AnimationStage,
): string => {
  return Array.isArray(animation)
    ? animation.map((i) => `${i}-${stage}`).join(' ')
    : `${animation}-${stage}`
}

export const getAnimationAllClassNames = (
  animation: AnimationType | AnimationType[],
): AnimationStage[] => {
  return ['enter-from', 'enter-active', 'enter-to', 'leave-from', 'leave-active', 'leave-to']
}

//动画属性类型
export type AnimationProperties = ('width' | 'height')[]

//生成节点的动画生成(宽高)
/**
 * 切换动画
 * @param element 元素
 * @param isOpening 是否展开
 * @param duration 动画时间
 * @param properties 动画属性: 'width' | 'height'
 * @returns
 */
export async function animateHeight(
  element: HTMLElement,
  isOpening: boolean,
  duration = 100,
  properties: AnimationProperties = ['height'],
  timeFunction: string = 'cubic-bezier(0.4, 0, 0.2, 1)',
) {
  if (duration <= 0) {
    properties.forEach((property) => {
      element.style[property] = isOpening ? 'auto' : '0px'
    })
    element.style.opacity = isOpening ? '1' : '0'
    element.style.display = isOpening ? '' : 'none'
    return
  }

  const startValues: Record<string, string | number> = {}
  const endValues: Record<string, string | number> = {}

  properties.forEach((property) => {
    if (isOpening) {
      element.style.display = ''
      element.style[property] = 'auto'
    }
    const { height, width } = element.getBoundingClientRect()
    element.style[property] = isOpening ? '0px' : `${property === 'height' ? height : width}px`
    startValues[property] = isOpening ? '0px' : `${property === 'height' ? height : width}px`
    endValues[property] = isOpening ? `${property === 'height' ? height : width}px` : '0px'
  })
  const animation = element.animate([startValues, endValues], {
    duration,
    easing: timeFunction,
  })

  return new Promise((resolve) => {
    animation.onfinish = () => {
      if (!isOpening) {
        element.style.display = 'none'
      }
      properties.forEach((property) => {
        element.style[property] = isOpening ? 'auto' : '0px'
      })
      resolve(true)
    }
  })
}

export type AnimationDurationOptions = {
  itemCount: number
  baseDuration?: number
  durationPerItem?: number
  maxDuration?: number
}

//根据列表数量获取动画时间
/**
 * 根据列表项数量计算动画时间
 * @param itemCount 列表项数量
 * @param baseDuration 基础动画时间 (ms)
 * @param durationPerItem 每个列表项增加的动画时间 (ms)
 * @param maxDuration 最大动画时间 (ms)
 * @returns 计算后的动画时间 (ms)
 */
export function calculateAnimationDuration({
  itemCount,
  baseDuration = 150,
  durationPerItem = 25,
  maxDuration = 800,
}: AnimationDurationOptions): number {
  const duration = baseDuration + itemCount * durationPerItem
  return Math.min(duration, maxDuration)
}
