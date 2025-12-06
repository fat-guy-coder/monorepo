<template>
  <div class="ui-card" :class="[
    `size-${size}`,
    'gradient-animation',
    { 'is-hoverable': hoverable, }
  ]">
    <div v-if="hasTitle" class="ui-card__header">
      <slot name="title">
        <div class="ui-card__title">{{ title }}</div>
      </slot>
    </div>

    <div class="ui-card__body">
      <slot name="body">
        <slot />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, type CSSProperties } from 'vue'

interface Props {
  title?: string
  /** 边框颜色（默认主题主色） */
  borderColor?: string
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否 hover 提升阴影 */
  hoverable?: boolean
  /** 卡片内边距（可传如 '16px' 或 'var(--element-padding)'） */
  padding?: string
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg'
}

const { title = '', size = 'md' } = defineProps<Props>()

const slots = useSlots()
const hasTitle = computed(() => !!(title || (slots && (slots as any).title)))
</script>

<style lang="less" scoped>
.ui-card {
  // --- Internal CSS Variables for Card ---
  --card-padding: var(--padding-2xl);
  --card-padding-sm: var(--padding-2xl);
  --card-padding-md: calc(var(--padding-2xl) * 0.75);
  --card-padding-lg: calc(var(--padding-2xl) * 1.25);
  --card-bg-color: var(--color-background);
  --card-bg-color-hover: var(--color-background-soft);
  --card-text-color: var(--color-text);
  --card-title-color: var(--color-heading);
  --card-border-radius: var(--border-radius-md);
  --card-border-width: var(--border-width);
  --card-border-color: var(--color-border);
  --card-border-color-hover: var(--color-border-hover);
  --card-box-shadow: var(--box-shadow-md);
  --card-box-shadow-hover: var(--box-shadow-hover-md);

  position: relative;
  color: var(--card-text-color);
  background: var(--card-bg-color);
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  border: var(--card-border-width) solid var(--card-border-color);
  transition: box-shadow 0.25s ease, transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;

  &.is-hoverable:hover {
    box-shadow: var(--card-box-shadow-hover);
    transform: translate(-1px, -1px);
    border-color: var(--card-border-color-hover);
    background-color: var(--card-bg-color-hover);
  }

  /* 尺寸 */
  &.size-sm {
    padding: var(--card-padding-sm);
    font-size: var(--font-size-sm);
  }

  &.size-md {
    padding: var(--card-padding-md);
    font-size: var(--font-size-normal);
  }

  &.size-lg {
    padding: var(--card-padding-lg);
    font-size: 1rem;
  }
}

.ui-card__header {
  margin-bottom: var(--margin-2xl);
}

.ui-card__title {
  color: var(--card-title-color);
  font-weight: 600;
  font-size: 1.05em;
}

.ui-card__body {
  color: var(--card-text-color);
}
</style>