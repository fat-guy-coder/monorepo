<template>
  <div ref="referenceRef" class="tooltip-trigger">
    <slot></slot>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isMounted && isVisible"
        ref="floatingRef"
        class="tooltip-floating"
        :style="floatingStyles"
        @mouseenter="handleFloatingEnter"
        @mouseleave="handleFloatingLeave"
      >
        <div class="tooltip-content">
          <slot name="title">{{ title }}</slot>
        </div>
        <div ref="arrowRef" class="tooltip-arrow" :style="arrowStyles"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
  reactive,
  type CSSProperties,
} from 'vue'

// --- Types ---
type Placement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'
type Trigger = 'hover' | 'click' | 'focus'

// --- Props ---
const props = withDefaults(
  defineProps<{
    title?: string
    placement?: Placement
    trigger?: Trigger | Trigger[]
    mouseEnterDelay?: number // ms
    mouseLeaveDelay?: number // ms
  }>(),
  {
    placement: 'top',
    trigger: 'hover',
    mouseEnterDelay: 100,
    mouseLeaveDelay: 100,
  },
)

const isMounted = ref(false)

// --- Refs for positioning ---
const referenceRef = ref<HTMLElement | null>(null)
const floatingRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

// --- Visibility State ---
const isVisible = ref(false)
let showTimer: any = null
let hideTimer: any = null

// --- Positioning State ---
const floatingStyles = reactive<CSSProperties>({})
const arrowStyles = reactive<CSSProperties>({})

// --- Core Logic ---
const show = () => {
  clearTimeout(hideTimer)
  if (isVisible.value) return
  showTimer = setTimeout(() => {
    isVisible.value = true
  }, props.mouseEnterDelay)
}

const hide = () => {
  clearTimeout(showTimer)
  hideTimer = setTimeout(() => {
    isVisible.value = false
  }, props.mouseLeaveDelay)
}

const toggle = () => {
  isVisible.value ? hide() : show()
}

// --- Event Handlers ---
const triggers = computed(() => (Array.isArray(props.trigger) ? props.trigger : [props.trigger]))

const handleMouseEnter = () => triggers.value.includes('hover') && show()
const handleMouseLeave = () => triggers.value.includes('hover') && hide()
const handleFocus = () => triggers.value.includes('focus') && show()
const handleBlur = () => triggers.value.includes('focus') && hide()
const handleClick = (e: MouseEvent) => {
  if (triggers.value.includes('click')) {
    e.stopPropagation()
    toggle()
  }
}

// Keep tooltip open when hovering over it
const handleFloatingEnter = () => clearTimeout(hideTimer)
const handleFloatingLeave = () => hide()

const handleClickOutside = (e: MouseEvent) => {
  if (
    isVisible.value &&
    !referenceRef.value?.contains(e.target as Node) &&
    !floatingRef.value?.contains(e.target as Node)
  ) {
    hide()
  }
}

// --- Manual Positioning ---
const updatePosition = async () => {
  if (!referenceRef.value || !floatingRef.value || !arrowRef.value) return

  const refRect = referenceRef.value.getBoundingClientRect()
  const floatRect = floatingRef.value.getBoundingClientRect()
  const arrowSize = 8
  const arrowHalf = arrowSize / 2
  const gap = 6 // A bit more gap for aesthetics

  let top = 0
  let left = 0
  const arrowStyle: CSSProperties = {}

  const [mainPlacement, alignment] = props.placement.split('-') as [string, 'start' | 'end' | undefined]

  // --- Calculate Floating Element Position ---
  if (mainPlacement === 'top' || mainPlacement === 'bottom') {
    // Vertical placements (top, bottom)
    switch (alignment) {
      case 'start':
        left = refRect.left
        break
      case 'end':
        left = refRect.right - floatRect.width
        break
      default: // center
        left = refRect.left + refRect.width / 2 - floatRect.width / 2
        break
    }
    if (mainPlacement === 'top') {
      top = refRect.top - floatRect.height - gap
    } else {
      top = refRect.bottom + gap
    }
  } else {
    // Horizontal placements (left, right)
    switch (alignment) {
      case 'start':
        top = refRect.top
        break
      case 'end':
        top = refRect.bottom - floatRect.height
        break
      default: // center
        top = refRect.top + refRect.height / 2 - floatRect.height / 2
        break
    }
    if (mainPlacement === 'left') {
      left = refRect.left - floatRect.width - gap
    } else {
      left = refRect.right + gap
    }
  }

  // --- Calculate Arrow Position ---
  const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[mainPlacement] as string

  arrowStyle[staticSide as any] = `-${arrowHalf}px`

  if (mainPlacement === 'top' || mainPlacement === 'bottom') {
    const arrowLeft = refRect.left + refRect.width / 2 - left - arrowHalf
    arrowStyle.left = `${arrowLeft}px`
    arrowStyle.transform = 'rotate(45deg)'
  } else {
    const arrowTop = refRect.top + refRect.height / 2 - top - arrowHalf
    arrowStyle.top = `${arrowTop}px`
    arrowStyle.transform = 'rotate(45deg)'
  }

  Object.assign(floatingStyles, {
    top: `${top + window.scrollY}px`,
    left: `${left + window.scrollX}px`,
  })
  Object.assign(arrowStyles, arrowStyle)
}

// --- Lifecycle Hooks ---
watch(isVisible, (val) => {
  if (val) {
    nextTick(updatePosition)
  } else {
    // Reset styles when hidden
    Object.keys(floatingStyles).forEach((key) => delete floatingStyles[key as keyof CSSProperties])
    Object.keys(arrowStyles).forEach((key) => delete arrowStyles[key as keyof CSSProperties])
  }
})

onMounted(() => {
  isMounted.value = true
  if (referenceRef.value) {
    referenceRef.value.addEventListener('mouseenter', handleMouseEnter)
    referenceRef.value.addEventListener('mouseleave', handleMouseLeave)
    referenceRef.value.addEventListener('focus', handleFocus)
    referenceRef.value.addEventListener('blur', handleBlur)
    referenceRef.value.addEventListener('click', handleClick)
  }
  if (triggers.value.includes('click')) {
    document.addEventListener('mousedown', handleClickOutside)
  }
})

onUnmounted(() => {
  if (referenceRef.value) {
    referenceRef.value.removeEventListener('mouseenter', handleMouseEnter)
    referenceRef.value.removeEventListener('mouseleave', handleMouseLeave)
    referenceRef.value.removeEventListener('focus', handleFocus)
    referenceRef.value.removeEventListener('blur', handleBlur)
    referenceRef.value.removeEventListener('click', handleClick)
  }
  document.removeEventListener('mousedown', handleClickOutside)
  clearTimeout(showTimer)
  clearTimeout(hideTimer)
})
</script>

<style lang="less" scoped>
.tooltip-trigger {
  display: inline-block;
}

.tooltip-floating {
  // --- Own CSS Variables --- 
  --tooltip-bg: var(--color-background-elevated, var(--color-gray-800));
  --tooltip-text-color: var(--color-text-elevated, var(--color-gray-100));
  --tooltip-padding: var(--padding-sm) var(--padding-md);
  --tooltip-border-radius: var(--border-radius-md);
  --tooltip-box-shadow: var(--box-shadow-lg);
  --tooltip-z-index: 1070; // High z-index for tooltips

  // --- Component Styles ---
  position: absolute;
  z-index: var(--tooltip-z-index);
  background-color: var(--tooltip-bg);
  color: var(--tooltip-text-color);
  border-radius: var(--tooltip-border-radius);
  padding: var(--tooltip-padding);
  box-shadow: var(--tooltip-box-shadow);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  max-width: 300px;
  pointer-events: auto; // Allow hovering over the tooltip itself
}

.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: inherit;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
