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
  --nav-tag-bg: var(--element-background);
  --nav-tag-border: var(--color-border);
  --nav-tag-text: var(--color-text);
  --nav-tag-radius-md: 10px;
  --nav-tag-radius-lg: 16px;
  --nav-tag-radius-pill: 999px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  border: 1px solid var(--nav-tag-border);
  border-radius: var(--nav-tag-radius-md);
  background: var(--nav-tag-bg);
  color: var(--nav-tag-text);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: var(--color-border-hover);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &.is-active {
    border-color: var(--color-primary);
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2);
  }
}

.nav-tag-card--gradient .nav-tag-card__item {
  color: var(--color-text-light-solid);
}

.nav-tag-card--small .nav-tag-card__item {
  padding: 0.6rem 0.9rem;
  font-size: 0.85rem;
}

.nav-tag-card--large .nav-tag-card__item {
  padding: 1rem 1.4rem;
  font-size: 1rem;
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
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.nav-tag-card--solid .nav-tag-card__index {
  background: var(--element-background-mute);
  color: var(--color-text);
  border-color: var(--color-border);
}

.nav-tag-card__title {
  font-weight: 600;
  letter-spacing: 0.01em;
}

.nav-tag-card__suffix {
  margin-left: auto;
}

.nav-tag-card--anim-lift .nav-tag-card__item:hover {
  transform: translateY(-2px);
}

.nav-tag-card--anim-scale .nav-tag-card__item:hover {
  transform: scale(1.02);
}

.nav-tag-card--anim-slide .nav-tag-card__item:hover {
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .nav-tag-card {
    gap: 0.5rem !important;
  }

  .nav-tag-card--horizontal {
    flex-wrap: wrap;
  }
}
</style>

