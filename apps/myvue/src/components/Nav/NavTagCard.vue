<template>
  <div
    class="nav-tag-card"
    :class="[
      `nav-tag-card--${direction}`,
      `nav-tag-card--${size}`,
      `nav-tag-card--rounded-${rounded}`,
      `nav-tag-card--anim-${animation}`,
      { 'nav-tag-card--borderless': !bordered, 'nav-tag-card--gradient': variant === 'gradient' },
    ]"
    :style="containerStyle"
    role="navigation"
    aria-label="内容导航卡片列表"
  >
    <button
      v-for="(item, index) in items"
      :key="item.id ?? `${item.title}-${index}`"
      type="button"
      class="nav-tag-card__item"
      :class="{ 'is-active': item.id && item.id === activeId }"
      :style="itemStyleVars"
      @click="handleItemClick(item, index)"
    >
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
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

interface NavTagItem {
  id?: string
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
    activeId?: string | null
    animation?: 'lift' | 'scale' | 'slide'
    gap?: number | string
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
    activeId: null,
    animation: 'lift',
    gap: '0.5rem',
  }
)

const emit = defineEmits<{
  (e: 'select', payload: { item: NavTagItem; index: number }): void
}>()

const containerStyle = computed<CSSProperties>(() => ({
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

const handleItemClick = (item: NavTagItem, index: number) => {
  emit('select', { item, index })
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
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;
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
    background: var(--color-fill);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    border-color: var(--color-primary);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);

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
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: var(--color-text-light-solid);
    box-shadow: 0 4px 16px rgba(22, 119, 255, 0.3);

    &::before {
      opacity: 0;
    }

    .nav-tag-card__index {
      background: transparent;
      color: var(--color-text-light-solid);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
}

.nav-tag-card--gradient .nav-tag-card__item {
  color: var(--color-text-light-solid);

  &::before {
    background: rgba(255, 255, 255, 0.1);
  }

  &:hover::before {
    opacity: 1;
  }

  &.is-active {
    background: var(--nav-tag-bg);
    border-color: transparent;

    &::before {
      opacity: 0;
    }
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
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
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
  color: var(--color-text-light-solid);
  background: transparent;
}

.nav-tag-card__suffix {
  margin-left: auto;
}

.nav-tag-card--anim-lift .nav-tag-card__item:hover {
  transform: translateY(-3px);
}

.nav-tag-card--anim-scale .nav-tag-card__item:hover {
  transform: scale(1.05) translateY(-2px);
}

.nav-tag-card--anim-slide .nav-tag-card__item:hover {
  transform: translateX(var(--spacing-sm)) translateY(-2px);
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

