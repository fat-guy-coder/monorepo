<template>
  <a :href="href" :target="target" :class="[
    'custom-link',
    `custom-link--type-${type}`,
    `custom-link--size-${size}`,
    `custom-link--rounded-${rounded}`,
    `custom-link--anim-${animation}`,
    `custom-link--gradient-anim-${gradientAnimation}`,
    {
      'custom-link--bordered': bordered,
      'custom-link--block': block,
    },
  ]" @click="handleClick">
    <span v-if="icon" class="custom-link__icon">{{ icon }}</span>
    <span class="custom-link__text">
      <slot>{{ text }}</slot>
    </span>
    <span v-if="showArrow" class="custom-link__arrow">→</span>
  </a>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { type RouteLocationNamedRaw } from 'vue-router'

defineOptions({
  name: 'CustomLink',
})

interface Props {
  /** 链接地址 (常规a标签) */
  href?: string
  /** 路由对象 (vue-router) */
  route?: RouteLocationNamedRaw | string
  /** 滚动目标的元素ID */
  id?: string
  /** 链接文本 */
  text?: string
  /** 组件类型 */
  type?: 'a' | 'card'
  /** 图标（emoji 或字符） */
  icon?: string
  /** 是否显示箭头 */
  showArrow?: boolean
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 是否显示边框 */
  bordered?: boolean
  /** 圆角大小 */
  rounded?: 'sm' | 'md' | 'lg' | 'pill'
  /** 悬浮动效 */
  animation?: 'lift' | 'scale' | 'slide' | 'glow' | 'none'
  /** 渐变动画类型 */
  gradientAnimation?: 'linear' | 'round'
  /** 是否块级显示 */
  block?: boolean
  /** target 属性（仅 a 标签） */
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const props = withDefaults(defineProps<Props>(), {
  href: 'javascript:void(0);', // 默认无操作
  type: 'a',
  text: '',
  icon: '',
  showArrow: false,
  size: 'medium',
  bordered: false,
  rounded: 'md',
  animation: 'lift',
  gradientAnimation: 'linear',
  block: false,
  target: '_self',
})

const goToByName = inject<((name: string) => void)>('goToByName');
if (!goToByName) {
  throw new Error('goToByName is not provided')
}

const handleClick = (event: MouseEvent) => {
  if (props.id) {
    event.preventDefault()
    const element = document.getElementById(props.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    return
  }

  if (props.route) {
    event.preventDefault()
    goToByName(typeof props.route === 'string' ? props.route : props.route.name as string)
    return
  }
}
</script>

<style lang="less" scoped>
.custom-link {
  --link-bg: transparent;
  --link-text: var(--color-link-text);
  --link-border: var(--color-border);
  --link-radius-sm: 8px;
  --link-radius-md: 12px;
  --link-radius-lg: 16px;
  --link-radius-pill: 999px;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-sm);
  padding: var(--padding-md) var(--padding-xl);
  border: 1px solid transparent;
  border-radius: var(--link-radius-md);
  background-color: var(--link-bg);
  color: var(--link-text);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &.custom-link--bordered {
    border-color: var(--link-border);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.custom-link--type-card {
  --link-bg: var(--color-link-text);
  --link-text: var(--color-bg-container);

  &.custom-link--bordered {
    border-color: var(--color-primary-dark-2);
  }
}

// --- Gradient Animations ---
.custom-link__text {
  position: relative;
  z-index: 1;
  transition: color 0.4s ease;
}

.custom-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  opacity: 0;
  pointer-events: none;
}

.custom-link:hover::before {
  opacity: 1;
}

// Card Background Animation
.custom-link--type-card.custom-link--gradient-anim-linear:before {
  background: linear-gradient(90deg, var(--color-gradient-group-1), var(--color-gradient-group-2), var(--color-gradient-group-1));
  background-size: 200% 100%;
  animation: linear-wipe 2s linear infinite;
}

.custom-link--type-card.custom-link--gradient-anim-round:before {
  background: radial-gradient(circle, var(--color-gradient-group-1) 0%, var(--color-gradient-group-2) 70%, var(--color-gradient-group-3) 100%);
  transform: scale(0);
}

.custom-link--type-card.custom-link--gradient-anim-round:hover::before {
  transform: scale(2.5);
}

// A-type Text Animation
.custom-link--type-a .custom-link__text {
  background-clip: text;
  -webkit-background-clip: text;
}

.custom-link--type-a:hover .custom-link__text {
  color: transparent; // Make original text transparent to show gradient
}

.custom-link--type-a.custom-link--gradient-anim-linear:hover .custom-link__text {
  background-image: linear-gradient(90deg, var(--color-gradient-group-1), var(--color-gradient-group-2), var(--color-gradient-group-1));
  background-size: 200% 100%;
  animation: linear-wipe 2s linear infinite;
}

.custom-link--type-a.custom-link--gradient-anim-round:hover .custom-link__text {
  background-image: radial-gradient(circle, var(--color-gradient-group-1), var(--color-gradient-group-2));
}

@keyframes linear-wipe {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

// --- Standard Styles ---

// 尺寸变体
.custom-link--size-small {
  padding: var(--padding-sm) var(--padding-md);
  font-size: 0.875rem;
  gap: var(--gap-xs);
}

.custom-link--size-medium {
  padding: var(--padding-md) var(--padding-xl);
  font-size: 0.95rem;
  gap: var(--gap-sm);
}

.custom-link--size-large {
  padding: var(--padding-lg) var(--padding-2xl);
  font-size: 1.1rem;
  gap: var(--gap-md);
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

// 块级显示
.custom-link--block {
  display: flex;
  width: 100%;
}

// 动效变体
.custom-link--anim-lift:hover {
  transform: translateY(-3px);
}

.custom-link--anim-scale:hover {
  transform: scale(1.05);
}

.custom-link--anim-slide:hover {
  transform: translateX(4px);
}

.custom-link--anim-glow:hover {
  box-shadow: 0 0 20px rgba(22, 119, 255, 0.3);
}

.custom-link--anim-none:hover {
  transform: none;
}

// 图标和箭头
.custom-link__icon {
  font-size: 1.2em;
  line-height: 1;
}

.custom-link__text {
  flex: 1;
  text-align: center;
}

.custom-link__arrow {
  transition: transform 0.3s ease;
  font-size: 1.1em;
  line-height: 1;
}

.custom-link:hover .custom-link__arrow {
  transform: translateX(2px);
}
</style>