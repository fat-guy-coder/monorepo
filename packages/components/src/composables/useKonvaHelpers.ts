import { ref, computed } from 'vue'

// 统一配色方案
export const DSA_COLORS = {
  primary: '#06b6d4',       // cyan-500
  primaryLight: '#cffafe',  // cyan-100
  highlight: '#facc15',     // yellow-400
  inserting: '#4ade80',     // green-400
  deleting: '#f87171',      // red-400
  searching: '#fb923c',     // orange-400
  text: '#1e293b',          // slate-800
  textLight: '#ffffff',
  border: '#94a3b8',        // slate-400
  arrow: '#64748b',         // slate-500
  bg: '#f8fafc',            // slate-50
}

// 通用动画配置
export const animConfig = {
  duration: 0.4,   // 秒
  easing: 'easeInOut' as const,
}

// 创建补间动画
export function tweenTo(
  node: any,
  props: Record<string, number>,
  duration = animConfig.duration,
): Promise<void> {
  return new Promise(resolve => {
    node.to({ ...props, duration, easing: (window as any).Konva?.Easings?.EaseInOut, onFinish: resolve })
  })
}

// 延迟
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ===== 数组可视化布局计算 =====
export interface ArrayBar {
  id: number
  value: number
  color: string
  label: string
}

export function useArrayLayout(
  bars: () => ArrayBar[],
  containerWidth: () => number,
  barMaxHeight = 280,
  barWidth = 52,
  gap = 8,
) {
  const totalWidth = computed(() => bars().length * (barWidth + gap) - gap)
  const startX = computed(() => Math.max(20, (containerWidth() - totalWidth.value) / 2))

  function barX(index: number): number {
    return startX.value + index * (barWidth + gap)
  }

  function barHeight(value: number, maxVal: number): number {
    const ratio = maxVal > 0 ? value / maxVal : 0.2
    return Math.max(20, ratio * barMaxHeight) // 最小值 20px
  }

  function barY(height: number, baseY: number): number {
    return baseY - height
  }

  return { totalWidth, startX, barX, barHeight, barY, barWidth }
}
