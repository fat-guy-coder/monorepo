<template>
  <div class="ui-card" :class="[
    `size-${size}`,
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
  position: relative;
  color: var(--color-text);
  background: var(--color-background);
  border-radius: var(--border-radius-md);
  padding: var(--padding-2xl);
  //box-shadow: var(--box-shadow-md);
  transition: box-shadow 0.25s ease, transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
  border: var(--border-width) solid var(--color-border);

  &.is-hoverable:hover {
    box-shadow: var(--box-shadow-hover-md);
    transform: translate(-1spx, -1px);
    border: var(--border-width) solid var(--color-border-hover);
    //background-color: var(--color-background-soft);
  }

  /* 尺寸 */
  &.size-sm {
    padding: var(--padding-2xl);
    font-size: var(--font-size-sm);
  }

  &.size-md {
    padding: calc(var(--padding-2xl) * 0.75);
    font-size: var(--font-size-normal);
  }

  &.size-lg {
    padding: calc(var(--padding-2xl) * 1.25);
    font-size: 1.06rem;
  }
}

.ui-card__header {
  margin-bottom: 8px;
}

.ui-card__title {
  color: var(--color-heading);
  font-weight: 600;
  font-size: 1.05em;
}

.ui-card__body {
  color: var(--color-text);
}
</style>
