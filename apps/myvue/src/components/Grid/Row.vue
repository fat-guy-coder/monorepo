<template>
  <div class="row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, provide } from 'vue'

type GutterValue = number | [number, number] | { horizontal: number; vertical: number }
type ResponsiveGutter = Partial<Record<string, GutterValue>>

const breakpoints = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
const breakpointMedia: Record<string, string> = {
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px) and (max-width: 767.98px)',
  md: '(min-width: 768px) and (max-width: 991.98px)',
  lg: '(min-width: 992px) and (max-width: 1199.98px)',
  xl: '(min-width: 1200px) and (max-width: 1599.98px)',
  xxl: '(min-width: 1600px)',
}

const props = defineProps<{
  // gutter 支持数字、数组、对象、响应式对象等多种格式
  gutter?: number | [number, number] | { horizontal: number; vertical: number } | ResponsiveGutter
}>()


const screens = ref<Record<string, boolean>>({})

function calcScreens() {
  const result: Record<string, boolean> = {}
  for (const bp of breakpoints) {
    const media = window.matchMedia(breakpointMedia[bp])
    result[bp] = media.matches
  }
  screens.value = result
}
let mqls: MediaQueryList[] = []

function register() {
  for (const bp of breakpoints) {
    const mql = window.matchMedia(breakpointMedia[bp])
    const listener = () => {
      calcScreens()
    }
    mql.addEventListener('change', listener)
    // store both mql and listener for cleanup if needed
    // but for this small component we'll just simply clean all
    mqls.push(mql)
  }
  calcScreens()
}

function unregister() {
  for (const mql of mqls) {
    mql.onchange = null
  }
  mqls = []
}

onMounted(register)
onUnmounted(unregister)

function getCurrentBreakpoint() {
  for (let i = 0; i < breakpoints.length; i++) {
    const bp = breakpoints[i]
    if (screens.value[bp]) {
      return bp
    }
  }
  // default to xs
  return 'xs'
}

/**
 * 归一化 gutter
 */
const normalizedGutter = computed(() => {
  let horizontal = 0
  let vertical = 0
  const gutter = props.gutter
  if (!gutter) {
    return { horizontal: 0, vertical: 0 }
  }

  // 如果是响应式 gutter
  if (
    typeof gutter === 'object' &&
    !Array.isArray(gutter) &&
    Object.keys(gutter).some((key) => breakpoints.includes(key))
  ) {
    const currentBp = getCurrentBreakpoint()
    let bpGutter: GutterValue | undefined = undefined
    for (let i = breakpoints.length - 1; i >= 0; i--) {
      const bp = breakpoints[i]
      if ((gutter as ResponsiveGutter)[bp] !== undefined) {
        if (screens.value[bp]) {
          bpGutter = (gutter as ResponsiveGutter)[bp]
          break
        }
      }
    }
    if (!bpGutter) {
      bpGutter = (gutter as ResponsiveGutter)['xs'] || 0
    }
    if (typeof bpGutter === 'number') {
      horizontal = bpGutter
      vertical = 0
    } else if (Array.isArray(bpGutter)) {
      ;[horizontal = 0, vertical = 0] = bpGutter
    } else if (typeof bpGutter === 'object') {
      horizontal = bpGutter.horizontal ?? 0
      vertical = bpGutter.vertical ?? 0
    }
    return { horizontal, vertical }
  }

  // 原有格式处理
  if (typeof gutter === 'number') {
    horizontal = gutter
    vertical = gutter
  } else if (Array.isArray(gutter)) {
    ;[horizontal = 0, vertical = 0] = gutter
  } else if (typeof gutter === 'object') {
    horizontal = (gutter as { horizontal?: number }).horizontal ?? 0
    vertical = (gutter as { vertical?: number }).vertical ?? 0
  }
  return { horizontal, vertical }
})

provide('gutter', normalizedGutter)

const rowStyle = computed(() => {
  const { horizontal, vertical } = normalizedGutter.value
  return {
    marginLeft: `-${horizontal / 2}px`,
    marginRight: `-${horizontal / 2}px`,
    marginTop: `-${vertical / 2}px`,
    marginBottom: `-${vertical / 2}px`,
  }
})
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
</style>
