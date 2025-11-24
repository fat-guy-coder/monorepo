<template>
  <component
    :is="linkType"
    :to="isRouterLink ? to : undefined"
    :href="!isRouterLink ? href : undefined"
    :target="target"
    :class="[
      'custom-link',
      `custom-link--${size}`,
      `custom-link--${variant}`,
      `custom-link--rounded-${rounded}`,
      `custom-link--anim-${animation}`,
      {
        'custom-link--bordered': bordered,
        'custom-link--block': block,
      },
    ]"
    :style="linkStyle"
  >
    <span v-if="icon" class="custom-link__icon">{{ icon }}</span>
    <span class="custom-link__text">
      <slot>{{ text }}</slot>
    </span>
    <span v-if="showArrow" class="custom-link__arrow">→</span>
  </component>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({
  name: 'CustomLink',
})

interface Props {
  /** 链接类型：'a' 或 'router' */
  type?: 'a' | 'router'
  /** 链接地址（router-link 使用 to，a 标签使用 href） */
  to?: string | object
  href?: string
  /** 链接文本 */
  text?: string
  /** 图标（emoji 或字符） */
  icon?: string
  /** 是否显示箭头 */
  showArrow?: boolean
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 样式变体：'solid' | 'gradient' */
  variant?: 'solid' | 'gradient'
  /** 单色背景色 */
  backgroundColor?: string
  /** 渐变背景色（数组，至少2个颜色） */
  gradientColors?: string[]
  /** 是否显示边框 */
  bordered?: boolean
  /** 圆角大小 */
  rounded?: 'sm' | 'md' | 'lg' | 'pill'
  /** 悬浮动效 */
  animation?: 'lift' | 'scale' | 'slide' | 'glow' | 'none'
  /** 是否块级显示 */
  block?: boolean
  /** target 属性（仅 a 标签） */
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'a',
  text: '',
  icon: '',
  showArrow: false,
  size: 'medium',
  variant: 'solid',
  backgroundColor: '#1677ff',
  gradientColors: () => [],
  bordered: true,
  rounded: 'md',
  animation: 'lift',
  block: false,
  target: '_self',
})

const isRouterLink = computed(() => props.type === 'router')
const linkType = computed(() => (isRouterLink.value ? RouterLink : 'a'))

const resolvedGradient = computed(() => {
  if (props.gradientColors.length >= 2) {
    return props.gradientColors.join(', ')
  }
  // 默认柔和渐变（蓝色系）
  if (props.variant === 'gradient') {
    return '#1677ff, #69b1ff, #91caff'
  }
  return ''
})

const linkStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}

  if (props.variant === 'gradient' && resolvedGradient.value) {
    style.background = `linear-gradient(135deg, ${resolvedGradient.value})`
    style.color = 'var(--color-text-light-solid)'
  } else if (props.variant === 'solid') {
    style.background = props.backgroundColor
    style.color = 'var(--color-text-light-solid)'
  }

  return style
})
</script>

<style lang="less" scoped>
.custom-link {
  --link-bg: var(--color-primary);
  --link-border: var(--color-border);
  --link-text: var(--color-text-light-solid);
  --link-radius-sm: 8px;
  --link-radius-md: 12px;
  --link-radius-lg: 16px;
  --link-radius-pill: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-sm);
  padding: var(--padding-md) var(--padding-xl);
  border: 1px solid var(--link-border);
  border-radius: var(--link-radius-md);
  background: var(--link-bg);
  color: var(--link-text);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    background 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border-color: var(--color-primary);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

// 尺寸变体
.custom-link--small {
  padding: var(--padding-sm) var(--padding-md);
  font-size: 0.875rem;
  gap: var(--gap-xs);
}

.custom-link--medium {
  padding: var(--padding-md) var(--padding-xl);
  font-size: 0.95rem;
  gap: var(--gap-sm);
}

.custom-link--large {
  padding: var(--padding-lg) var(--padding-2xl);
  font-size: 1.1rem;
  gap: var(--gap-md);
}

// 样式变体
.custom-link--solid {
  background: var(--link-bg);
  color: var(--link-text);
}

.custom-link--gradient {
  background: linear-gradient(135deg, var(--link-bg));
  color: var(--link-text);
  border-color: transparent;
}

// 圆角变体
.custom-link--rounded-sm {
  border-radius: var(--link-radius-sm);
}

.custom-link--rounded-md {
  border-radius: var(--link-radius-md);
}

.custom-link--rounded-lg {
  border-radius: var(--link-radius-lg);
}

.custom-link--rounded-pill {
  border-radius: var(--link-radius-pill);
}

// 边框
.custom-link--bordered {
  border: 1px solid var(--link-border);
}

.custom-link:not(.custom-link--bordered) {
  border: 1px solid transparent;
}

// 块级显示
.custom-link--block {
  display: flex;
  width: 100%;
}

// 动效变体
.custom-link--anim-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.custom-link--anim-scale:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.custom-link--anim-slide:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.custom-link--anim-glow:hover {
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.15),
    0 0 20px rgba(22, 119, 255, 0.3);
  filter: brightness(1.1);
}

.custom-link--anim-none:hover {
  transform: none;
}

// 图标和箭头
.custom-link__icon {
  display: inline-flex;
  align-items: center;
  font-size: 1.2em;
  line-height: 1;
}

.custom-link__text {
  flex: 1;
  text-align: center;
}

.custom-link__arrow {
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s ease;
  font-size: 1.1em;
  line-height: 1;
}

.custom-link:hover .custom-link__arrow {
  transform: translateX(2px);
}

// 响应式
@media (max-width: 768px) {
  .custom-link {
    padding: var(--padding-sm) var(--padding-lg);
    font-size: 0.9rem;
  }

  .custom-link--small {
    padding: var(--padding-xs) var(--padding-md);
    font-size: 0.8rem;
  }

  .custom-link--large {
    padding: var(--padding-md) var(--padding-xl);
    font-size: 1rem;
  }
}
</style>

