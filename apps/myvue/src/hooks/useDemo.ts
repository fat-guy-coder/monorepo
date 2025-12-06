import { onMounted, onUnmounted } from 'vue'

interface UseGradientAnimationOptions {
  // 挂靠的类名
  //默认为gradient-animation
  className?: string
  //渐变类型
  gradientType?: 'linear' | 'radial' | 'conic'
  // 渐变色组
  colors?: string[]
  // 渐变色组数量
  colorsCount?: number
  // 速度  数值越大，速度越快
  speed?: number
  // 方向  默认90deg
  direction?: '90deg' | '180deg' | '270deg' | '360deg' | '45deg' | '135deg' | '225deg' | '315deg'
  // 是否是hover效果 默认false
  isHoverEffect?: boolean
}

//主题基本渐变色
const themeGradientColors = 'var(--color-gradient-group-1)'

const defaultColors = [
  'var(--color-gradient-group-2)',
  'var(--color-gradient-group-3)',
  'var(--color-gradient-group-4)',
  'var(--color-gradient-group-5)',
  'var(--color-gradient-group-6)',
  'var(--color-gradient-group-7)',
  'var(--color-gradient-group-8)',
  'var(--color-gradient-group-9)',
  'var(--color-gradient-group-10)',
]

/**
 * A Vue composable to apply a dynamic background gradient animation to an element.
 * The styles are injected on mount and removed on unmount to avoid global scope pollution.
 *
 * @param options - Configuration for the gradient animation.
 */
export function useGradientAnimation(options: UseGradientAnimationOptions) {
  const {
    className = 'gradient-animation',
    colors = defaultColors,
    colorsCount = 5,
    speed = 20,
    direction = '90deg',
    isHoverEffect = false,
  } = options

  let styleElement: HTMLStyleElement | null = null

  const time = 60 / speed

  const getAnimationDetails = () => {
    const lowerDirection = direction.toLowerCase()
    let angle = 180 // Default to 'to bottom'

    if (lowerDirection.includes('deg')) {
      angle = parseInt(lowerDirection.match(/(-?\d+)/)?.[0] || '180', 10)
    } else if (lowerDirection.includes('to right')) {
      angle = 90
    } else if (lowerDirection.includes('to left')) {
      angle = 270
    } else if (lowerDirection.includes('to top')) {
      angle = 0
    } else if (lowerDirection.includes('to bottom')) {
      angle = 180
    }

    let backgroundSize
    let keyframes

    // Normalize angle to 0-360 range
    const normalizedAngle = ((angle % 360) + 360) % 360

    if (normalizedAngle === 90 || normalizedAngle === 270) {
      // Horizontal animation
      backgroundSize = `200% 100%`
      keyframes = `
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      `
    } else if (normalizedAngle === 0 || normalizedAngle === 180) {
      // Vertical animation
      backgroundSize = `100% 200%`
      keyframes = `
        0% { background-position: 0 200%; }
        100% { background-position: 0 -200%; }
      `
    } else if (
      normalizedAngle === 45 ||
      normalizedAngle === 135 ||
      normalizedAngle === 225 ||
      normalizedAngle === 315
    ) {
      // Diagonal animation
      backgroundSize = `200% 200%`
      keyframes = `
        0% { background-position: 200% 200%; }
        100% { background-position: -200% -200%; }
      `
    }

    return { backgroundSize, keyframes }
  }

  onMounted(() => {
    if (typeof document === 'undefined') return
    const keyframesName = `gradient-animation-${Math.random().toString(36).substring(7)}`
    const gradientColors = [
      themeGradientColors,
      ...colors.slice(0, colorsCount),
      themeGradientColors,
    ].join(', ')
    const { backgroundSize, keyframes } = getAnimationDetails()

    const styleContent = `
      @keyframes ${keyframesName} {
        ${keyframes}
      }
      .${className} {
        ${
          isHoverEffect
            ? `
        position: relative;
        overflow: hidden;
        border-radius: var(--border-radius);
        >* {
          position: relative;
          z-index: 1;
        }
        &::before {
        opacity: 0;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(${direction}, ${gradientColors});
        background-size: ${backgroundSize};
        animation: ${keyframesName} ${time}s linear infinite;
        z-index: 0;
        }
        &:hover {
          &::before {
            opacity: 1;
          }
        }
      `
            : `
      background-image: linear-gradient(${direction}, ${gradientColors});
      background-size: ${backgroundSize};
        animation: ${keyframesName} ${time}s linear infinite;`
        }
      }
    `

    let newCss = `@keyframes gradient-anim-wsofc3
{
  0%
  {
    background-position:200% 0
  }
  100%
  {
    background-position:-200% 0
  }
  
}
.home-id
{
  position:relative;
  overflow:hidden;
  background-image:linear-gradient(90deg,var(--color-gradient-group-1) 0%,var(--color-gradient-group-10) 25%,var(--color-gradient-group-11) 50%,var(--color-gradient-group-12) 75%,var(--color-gradient-group-1) 100%);
  background-size:200% 100%;
  animation:gradient-anim-wsofc3 2s linear 0s infinite normal running;
  }`
    styleElement = document.createElement('style')
    console.log(styleContent, newCss)
    styleElement.textContent = styleContent
    document.head.appendChild(styleElement)
  })

  onUnmounted(() => {
    if (styleElement && document.head.contains(styleElement)) {
      document.head.removeChild(styleElement)
      styleElement = null
    }
  })
}
