<template>
  <component :is="as" class="ui-card" :class="[
    `size-${size}`,
    `variant--${variant}`,
    // 'gradient-animation-hover',
    { 'is-hoverable': hoverable, }
  ]">
    <div v-if="hasTitle" class="ui-card__header">
      <slot name="title">
        <component :is="titleInfo.tag" class="ui-card__title">
          {{ titleInfo.content }}
        </component>
      </slot>
    </div>
    <div class="ui-card__body">
      <slot name="body">
        <slot />
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
  as?: string
  title?: string
  h1?: string
  h2?: string
  h3?: string
  h4?: string
  h5?: string
  h6?: string
  variant?: 'default' | 'section-card'
  borderColor?: string
  bordered?: boolean
  hoverable?: boolean
  padding?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  title: '',
  variant: 'default',
  size: 'md',
})

const slots = useSlots()

const titleInfo = computed(() => {
  const headings: Record<string, string | undefined> = {
    h1: props.h1,
    h2: props.h2,
    h3: props.h3,
    h4: props.h4,
    h5: props.h5,
    h6: props.h6,
  }
  for (const tag in headings) {
    if (headings[tag]) {
      return { tag, content: headings[tag] }
    }
  }
  return { tag: 'h3', content: props.title }
})

const hasTitle = computed(() => 
  !!(props.title || props.h1 || props.h2 || props.h3 || props.h4 || props.h5 || props.h6 || slots.title)
)
</script>

<style lang="less" scoped>
.ui-card {
  // --- 自有 CSS 变量定义 ---
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
  --card--title-margin: 0 ;

  // Section Variant Styles
  --section-card-padding: var(--padding-3xl);
  --section-card-border-radius: var(--border-radius-lg);
  --section-card-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  --section-card-shadow-hover: 0 0.5rem 1.875rem rgba(0, 0, 0, 0.12);
  --section-card-transform-hover: translateY(-0.125rem);

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

  // Section 变体
  &.variant--section-card {
    padding: var(--section-card-padding);
    border-radius: var(--section-card-border-radius);
    box-shadow: var(--section-card-shadow);

    &.is-hoverable:hover {
      box-shadow: var(--section-card-shadow-hover);
      transform: var(--section-card-transform-hover);
    }
  }
}

.ui-card__header {
  margin-bottom: var(--margin-xl);
  background-color: transparent;
}

.ui-card__title {
  color: var(--card-title-color);
  background-color: transparent;
  margin: var(--card--title-margin);
}

.variant--section-card .ui-card__title {
    font-size: 1.2em;
}

.ui-card__body {
  color: var(--card-text-color);
}
</style>