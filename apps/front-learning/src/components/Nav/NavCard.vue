<template>
  <div
    class="nav-carx"
    :class="[
      `nav-carx--${direction}`,
      `nav-carx--${size}`,
      `nav-carx--rounded-${rounded}`,
      ...animationClasses,
      { 'nav-carx--borderless': !bordered, 'nav-carx--gradient': variant === 'gradient' },
    ]"
    :style="componentStyle"
    role="navigation"
    aria-label="内容导航卡片列表"
  >
    <button
      v-for="(item, index) in items"
      :key="item.id ?? `${item.title}-${index}`"
      type="button"
      class="nav-carx__item gradient-animation-linear-hover"
      :class="{ 'is-active': item.id && item.id === activeId }"
      @click="handleItemClick(item, index)"
    >
      <div class="nav-carx__prefix">
        <slot name="prefix" :item="item" :index="index">
          <span v-if="showIndex" class="nav-carx__index">{{ index + 1 }}</span>
        </slot>
      </div>
      <div class="nav-carx__title">
        <slot name="title" :item="item" :index="index">
          {{ item.title }}
        </slot>
      </div>
      <div class="nav-carx__suffix">
        <slot name="suffix" :item="item" :index="index" />
      </div>
    </button>
  </div>
  <div class="nav-carx__container">
    <transition
      :enter-from-class="getAnimationStage('enter-from')"
      :enter-active-class="getAnimationStage('enter-active')"
      :enter-to-class="getAnimationStage('enter-to')"
      :leave-from-class="getAnimationStage('leave-from')"
      :leave-active-class="getAnimationStage('leave-active')"
      :leave-to-class="getAnimationStage('leave-to')"
      mode="out-in"
    >
      <div class="nav-carx__container-item" :key="activeId" v-if="activeId">
        <slot :name="activeId"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { type AnimationType, type AnimationStage, getAnimationClassName } from '@/function'

interface NavTagItem {
  id: string
  title: string
  [key: string]: unknown
}

const {
  items = [],
  size = 'medium',
  variant = 'solid',
  bordered = true,
  rounded = 'md',
  showIndex = true,
  enableScroll = true,
  justifyContent = 'center',
  direction = 'horizontal',
  animation = 'fade',
  transitionDuration = 300,
  css = {},
} = defineProps<{
  items: NavTagItem[]
  size?: 'small' | 'medium' | 'large'
  variant?: 'solid' | 'gradient'
  bordered?: boolean
  rounded?: 'md' | 'lg' | 'pill'
  justifyContent?: 'start' | 'center' | 'end'
  showIndex?: boolean
  enableScroll?: boolean
  direction?: 'horizontal' | 'vertical'
  animation?: AnimationType | AnimationType[]
  transitionDuration?: number
  css?: Record<string, string>
}>()

const getAnimationStage = (stage: AnimationStage): string => {
  return getAnimationClassName(animation, stage)
}

const emit = defineEmits<{ 
  (e: 'select', item: NavTagItem, index: number): void
}>()

const animationClasses = computed(() => {
  if (Array.isArray(animation)) {
    return animation.map((anim) => `nav-carx--anim-${anim}`)
  }
  if (typeof animation === 'string') {
    return [`nav-carx--anim-${animation}`]
  }
  return []
})

const componentStyle = computed<CSSProperties>(() => ({
  '--transition-duration': `${transitionDuration}ms`,
  justifyContent: justifyContent,
  ...css,
}))

const scrollToTarget = (targetId?: string) => {
  if (!targetId) return
  const element = document.getElementById(targetId)
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const activeId = defineModel<string | null>('activeId')

const handleItemClick = (item: NavTagItem, index: number) => {
  activeId.value = item.id
  emit('select', item, index)
  if (enableScroll && item.id) {
    scrollToTarget(item.id)
  }
}

defineExpose({ scrollToTarget })
</script>

<style lang="less" scoped>
.nav-carx {
  --nav-card-bg: var(--color-background);
  --nav-card-border: var(--color-border);
  --nav-card-text: var(--color-text);
  --nav-card-radius-md: var(--border-radius-md);
  --nav-card-radius-lg: var(--border-radius-lg);
  --nav-card-radius-pill: 999px;
  --nav-carx-gap: var(--gap-md);
  --nav-color-border-hover: var(--color-border-hover);
  --nav-box-shadow: var(--box-shadow-md);
  --nav-box-shadow-hover: var(--box-shadow-hover-md);
  --nav-transition-duration: var(--transition-duration);
  --nav-bg-transparent: var(--nav-bg-transparent, transparent);
  background-color: var(--nav-bg-transparent);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--nav-carx-gap);
  padding: clamp(12px, 3.5vw, 24px);
}

.nav-carx--vertical {
  flex-direction: column;
  align-items: stretch;
}

.nav-carx--borderless {
  --nav-card-border: transparent;
}

.nav-carx__item {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--padding-md) var(--padding-xl);
  border: 1px solid var(--nav-card-border);
  border-radius: var(--nav-card-radius-md);
  background: var(--nav-card-bg);
  color: var(--nav-card-text);
  transition:
    transform var(--nav-transition-duration) ease,
    box-shadow var(--nav-transition-duration) ease,
    border-color var(--nav-transition-duration) ease;
  box-shadow: var(--box-shadow-xs);
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: var(--nav-color-border-hover);
    box-shadow: var(--nav-box-shadow-hover);
  }

  &:active {
    transform: translateY(0rem);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: var(--spacing-xs);
  }

  &.is-active {
    border-color: var(--color-highlight-border);
    background: var(--color-highlight-bg);
    color: var(--color-highlight-text);
    box-shadow: var(--box-shadow-md);

    &::before {
      opacity: 0;
    }

    .nav-carx__index {
      background: transparent;
      color: var(--color-highlight-text);
      border-color: var(--color-highlight-border);
    }

    .nav-carx__title {
      color: var(--color-highlight-text);
    }
  }
}

.nav-carx__prefix {
  background-color: transparent;
}

.nav-carx--small .nav-carx__item {
  padding: var(--padding-sm) var(--padding-md);
  font-size: 0.875rem;
  gap: var(--gap-sm);
}

.nav-carx--large .nav-carx__item {
  padding: var(--padding-lg) var(--padding-2xl);
  font-size: 1rem;
  gap: var(--gap-lg);
}

.nav-carx--rounded-lg .nav-carx__item {
  border-radius: var(--nav-card-radius-lg);
}

.nav-carx--rounded-pill .nav-carx__item {
  border-radius: var(--nav-card-radius-pill);
}

.nav-carx__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: calc(var(--spacing-xl) + var(--spacing-sm));
  height: calc(var(--spacing-xl) + var(--spacing-sm));
  border-radius: 50%;
  background: transparent;
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid var(--color-border);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
  flex-shrink: 0;
}

.nav-carx__title {
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.5;
  color: var(--color-text);
  background: transparent;
}

.nav-carx__suffix {
  margin-left: auto;
}

// --- Animations ---
.nav-carx--anim-lift .nav-carx__item:hover {
  transform: translateY(-3px);
}

.nav-carx--anim-scale .nav-carx__item:hover {
  transform: scale(1.05) translateY(-2px);
}

.nav-carx--anim-slide .nav-carx__item:hover {
  transform: translateX(var(--spacing-sm)) translateY(-2px);
}

.nav-carx--anim-glow .nav-carx__item:hover {
  box-shadow: 0 0 20px var(--color-primary-light-7);
}

.nav-carx--anim-pulse .nav-carx__item.is-active {
  animation: pulse-border 1.5s infinite;
}

@keyframes pulse-border {
  0%,
  100% {
    box-shadow: 0 0 0 0 var(--color-highlight-bg);
  }

  50% {
    box-shadow: 0 0 0 5px transparent;
  }
}

.nav-carx__container {
  position: relative;
  margin-top: var(--gap-md);
}

@media (max-width: 768px) {
  .nav-carx {
    gap: var(--gap-sm) !important;
  }

  .nav-carx--horizontal {
    flex-wrap: wrap;
  }

  .nav-carx__item {
    padding: var(--padding-sm) var(--padding-md);
    font-size: 0.875rem;
  }
}
</style>