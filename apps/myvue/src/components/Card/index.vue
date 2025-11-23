<template>
  <div
    class="ui-card"
    :class="[
      `size-${size}`,
      { 'is-hoverable': hoverable, 'is-bordered': bordered }
    ]"
    :style="{
      '--card-border-color': borderColor,
      '--card-radius': 'var(--element-border-radius)',
      '--card-bg': 'var(--element-background)',
      '--card-text': 'var(--color-text)',
      '--card-heading': 'var(--color-heading)',
      '--card-padding': padding || 'var(--element-padding)',
      '--card-shadow': '0 2px 8px rgba(0,0,0,0.08)',
      '--card-shadow-hover': '0 6px 18px rgba(0,0,0,0.12)'
    } as any"
  >
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
import { computed, useSlots } from 'vue'

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

const props = withDefaults(defineProps<Props>(), {
  title: '',
  borderColor: 'var(--color-primary)',
  bordered: true,
  hoverable: true,
  padding: '',
  size: 'md'
})

const slots = useSlots()
const hasTitle = computed(() => !!(props.title || (slots && (slots as any).title)))
</script>

<style lang="less" scoped>
.ui-card {
  position: relative;
  color: var(--card-text);
  background: var(--card-bg);
  border-radius: var(--card-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
  transition: box-shadow 0.25s ease, transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
  border: 1px solid transparent;

  &.is-bordered {
    border-color: var(--card-border-color);
  }

  &.is-hoverable:hover {
    box-shadow: var(--card-shadow-hover);
    transform: translateY(-2px);
  }

  /* 尺寸 */
  &.size-sm {
    --card-padding: calc(var(--element-padding) * 0.75);
    font-size: 0.92rem;
  }
  &.size-md {
    --card-padding: var(--element-padding);
    font-size: 1rem;
  }
  &.size-lg {
    --card-padding: calc(var(--element-padding) * 1.25);
    font-size: 1.06rem;
  }
}

.ui-card__header {
  margin-bottom: 8px;
}

.ui-card__title {
  color: var(--card-heading);
  font-weight: 600;
  font-size: 1.05em;
}

.ui-card__body {
  color: var(--card-text);
}
</style>

