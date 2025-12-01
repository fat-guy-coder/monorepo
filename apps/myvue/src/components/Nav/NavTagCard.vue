<template>
  <div class="nav-tag-card" :class="[
    `nav-tag-card--${direction}`,
    `nav-tag-card--${size}`,
    `nav-tag-card--rounded-${rounded}`,
    ...animationClasses,
    { 'nav-tag-card--borderless': !bordered, 'nav-tag-card--gradient': variant === 'gradient' },
  ]" :style="containerStyle" role="navigation" aria-label="内容导航卡片列表">
    <button v-for="(item, index) in items" :key="item.id ?? `${item.title}-${index}`" type="button"
      class="nav-tag-card__item" :class="{ 'is-active': item.id && item.id === activeId }" :style="itemStyleVars"
      @click="handleItemClick(item, index)">
      <div class="nav-tag-card__prefix">
        <slot name="prefix" :item="item" :index="index">
          <span v-if="showIndex" class="nav-tag-card__index">{{ index + 1 }}</span>
        </slot>
      </div>
      <div class="nav-tag-card__title">
        <slot name="title" :item="item" :index="index">
          {{ item.title }}
        </slot>
      </div>
      <div class="nav-tag-card__suffix">
        <slot name="suffix" :item="item" :index="index" />
      </div>
    </button>
  </div>
  <div class="nav-tag-card__container">
    <transition :enter-from-class="getAnimationStage('enter-from')"
      :enter-active-class="getAnimationStage('enter-active')" :enter-to-class="getAnimationStage('enter-to')"
      :leave-from-class="getAnimationStage('leave-from')" :leave-active-class="getAnimationStage('leave-active')"
      :leave-to-class="getAnimationStage('leave-to')" mode="out-in">
      <div :key="activeId" v-if="activeId">
        <slot :name="activeId"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { type AnimationType, type AnimationStage, getAnimationClassName } from '@/Function'

interface NavTagItem {
  id: string
  title: string
  [key: string]: unknown
}


const props = withDefaults(
  defineProps<{
    items: NavTagItem[]
    size?: 'small' | 'medium' | 'large'
    variant?: 'solid' | 'gradient'
    backgroundColors?: string[]
    backgroundColor?: string
    borderColor?: string
    bordered?: boolean
    rounded?: 'md' | 'lg' | 'pill'
    showIndex?: boolean
    enableScroll?: boolean
    direction?: 'horizontal' | 'vertical'
    animation?: AnimationType | AnimationType[]
    gap?: number | string
    transitionDuration?: number
  }>(),
  {
    items: () => [],
    size: 'medium',
    variant: 'solid',
    backgroundColors: () => [],
    bordered: true,
    rounded: 'md',
    showIndex: true,
    enableScroll: true,
    direction: 'horizontal',
    animation: 'fade',
    gap: '0.5rem',
    transitionDuration: 300,
  }
)

const getAnimationStage = (stage: AnimationStage): string => {
  return getAnimationClassName(props.animation, stage)
}


const emit = defineEmits<{
  (e: 'select', item: NavTagItem, index: number): void
}>()

const animationClasses = computed(() => {
  if (Array.isArray(props.animation)) {
    return props.animation.map(anim => `nav-tag-card--anim-${anim}`)
  }
  if (typeof props.animation === 'string') {
    return [`nav-tag-card--anim-${props.animation}`]
  }
  return []
})

const containerStyle = computed<CSSProperties>(() => ({
  '--transition-duration': `${props.transitionDuration}ms`,
  gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
}))

const resolvedGradient = computed(() => {
  if (props.backgroundColors.length >= 2) {
    return props.backgroundColors.join(', ')
  }
  return 'var(--color-primary), var(--color-secondary)'
})

const itemStyleVars = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.variant === 'gradient') {
    style['--nav-tag-bg'] = `linear-gradient(135deg, ${resolvedGradient.value})`
  } else if (props.backgroundColor) {
    style['--nav-tag-bg'] = props.backgroundColor
  }

  if (props.borderColor) {
    style['--nav-tag-border'] = props.borderColor
  }

  return style
})

const scrollToTarget = (targetId?: string) => {
  if (!targetId) return
  const element = document.getElementById(targetId)
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}


const activeId = defineModel<string | null>('activeId')

const handleItemClick = (item: NavTagItem, index: number) => {
  activeId.value = item.id
  emit('select', item, index)
  if (props.enableScroll && item.id) {
    scrollToTarget(item.id)
  }
}

defineExpose({ scrollToTarget })
</script>

<style lang="less" scoped>
.nav-tag-card {
  --nav-tag-bg: var(--color-bg-container);
  --nav-tag-border: var(--color-border);
  --nav-tag-text: var(--color-text);
  --nav-tag-radius-md: calc(var(--element-border-radius) * 2.5);
  --nav-tag-radius-lg: calc(var(--element-border-radius) * 4);
  --nav-tag-radius-pill: 999px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap-md);
  padding: clamp(12px, 3.5vw, 24px);
}

.nav-tag-card--vertical {
  flex-direction: column;
  align-items: stretch;
}

.nav-tag-card--borderless {
  --nav-tag-border: transparent;
}

.nav-tag-card__item {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--padding-md) var(--padding-xl);
  border: 1px solid var(--nav-tag-border);
  border-radius: var(--nav-tag-radius-md);
  background: var(--nav-tag-bg);
  color: var(--nav-tag-text);
  transition:
    transform var(--transition-duration, 0.3s) ease,
    box-shadow var(--transition-duration, 0.3s) ease,
    border-color var(--transition-duration, 0.3s) ease,
    background-color var(--transition-duration, 0.3s) ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, var(--color-gradient-group-1), var(--color-gradient-group-2), var(--color-gradient-group-1));
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity var(--transition-duration, 0.4s) ease;
    z-index: 0;
    animation: linear-wipe 2s linear infinite;
  }

  >* {
    position: relative;
    z-index: 1;
  }

  &:hover {
    border-color: var(--color-primary);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: var(--spacing-xs);
  }

  &.is-active {
    border-color: var(--color-highlight-border);
    background: var(--color-highlight-bg);
    color: var(--color-highlight-text);
    box-shadow: 0 4px 16px rgba(22, 119, 255, 0.3);

    &::before {
      opacity: 0;
    }

    .nav-tag-card__index {
      background: transparent;
      color: var(--color-highlight-text);
      border-color: var(--color-highlight-border);
    }

    .nav-tag-card__title {
      color: var(--color-highlight-text);
    }
  }
}

.nav-tag-card__prefix {
  background-color: transparent;
}

.nav-tag-card--gradient .nav-tag-card__item {
  color: var(--color-text-light-solid);

  &.is-active {
    background: var(--nav-tag-bg);
    border-color: transparent;

    .nav-tag-card__prefix {
      background-color: transparent;
    }

    &::before {
      opacity: 0;
    }
  }
}

.nav-tag-card--gradient .nav-tag-card__item.is-active {
  border-color: var(--color-highlight-border);
  background: var(--color-highlight-bg);
  color: var(--color-highlight-text);
  box-shadow: 0 4px 16px rgba(22, 119, 255, 0.3);

  .nav-tag-card__prefix {
    background: transparent;
  }
}

.nav-tag-card--small .nav-tag-card__item {
  padding: var(--padding-sm) var(--padding-md);
  font-size: 0.875rem;
  gap: var(--gap-sm);
}

.nav-tag-card--large .nav-tag-card__item {
  padding: var(--padding-lg) var(--padding-2xl);
  font-size: 1rem;
  gap: var(--gap-lg);
}

.nav-tag-card--rounded-lg .nav-tag-card__item {
  border-radius: var(--nav-tag-radius-lg);
}

.nav-tag-card--rounded-pill .nav-tag-card__item {
  border-radius: var(--nav-tag-radius-pill);
}

.nav-tag-card__index {
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
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  flex-shrink: 0;
}

.nav-tag-card--gradient .nav-tag-card__index {
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-text-light-solid);
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-tag-card__title {
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.5;
  color: var(--color-text);
  background: transparent;
}

.nav-tag-card__suffix {
  margin-left: auto;
}

// --- Animations ---
.nav-tag-card--anim-lift .nav-tag-card__item:hover {
  transform: translateY(-3px);
}

.nav-tag-card--anim-scale .nav-tag-card__item:hover {
  transform: scale(1.05) translateY(-2px);
}

.nav-tag-card--anim-slide .nav-tag-card__item:hover {
  transform: translateX(var(--spacing-sm)) translateY(-2px);
}

.nav-tag-card--anim-glow .nav-tag-card__item:hover {
  box-shadow: 0 0 20px var(--color-primary-light-7);
}

.nav-tag-card--anim-pulse .nav-tag-card__item.is-active {
  animation: pulse-border 1.5s infinite;
}

@keyframes linear-wipe {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
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

.nav-tag-card__container {
  position: relative;
  margin-top: var(--gap-md);
}


@media (max-width: 768px) {
  .nav-tag-card {
    gap: var(--gap-sm) !important;
  }

  .nav-tag-card--horizontal {
    flex-wrap: wrap;
  }

  .nav-tag-card__item {
    padding: var(--padding-sm) var(--padding-md);
    font-size: 0.875rem;
  }
}
</style>