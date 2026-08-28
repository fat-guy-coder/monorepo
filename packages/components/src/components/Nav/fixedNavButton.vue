<template>
  <div class="navigation-container" :class="[
    `position-${position}`,
    `expand-${computedExpandDirection}`,
    {
      'is-expanded': isExpanded,
      'mobile-adaptive': mobileAdaptive && isMobile
    }
  ]" :style="containerStyle">
    <!-- 导航内容区域 -->
    <div class="navigation-content">
      <!-- 展开的导航项 -->
      <transition-group v-if="isExpanded && hasItems" name="nav-item" tag="div"
        class="navigation-items">
        <div v-for="(item, index) in items" :key="item.value || `nav-item-${index}`" class="navigation-item"
          :style="{ '--delay': `${index * 0.05}s` }" @click="handleItemClick(item)">
          <div class="nav-item">
            <slot :name="item.value" v-if="$slots[item.value]" :item="item"></slot>
            <template v-else>
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-text">{{ item.label }}</span>
            </template>
          </div>
        </div>
      </transition-group>
      <!-- 主按钮（折叠态：小圆片气泡；展开态：小 x） -->
      <button class="navigation-toggle" :class="{ 'is-active': isExpanded, }" @click.stop="toggle"
        :aria-label="isExpanded ? '收起导航' : '展开导航'">
        <span class="toggle-icon">
          <span class="bubble-dot"></span>
          <span class="close-x" aria-hidden="true">
            <span class="x-line"></span>
            <span class="x-line"></span>
          </span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import type { NavItem } from './index'


// 定义位置类型
type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

// 定义展开方向类型
type ExpandDirection = 'left' | 'right' | 'top' | 'bottom'

const {
  items,
  position = 'bottom-right',
  expandDirection,
  offset = { bottom: '1.5rem', right: '1.5rem' },
  mobileAdaptive = true,
  isMobile = false,
  css = {},
} = defineProps<{
  items?: NavItem[]
  position?: Position
  expandDirection?: ExpandDirection
  offset?: {
    top?: number | string
    right?: number | string
    bottom?: number | string
    left?: number | string
  }
  mobileAdaptive?: boolean
  isMobile: boolean
  css?: Record<string, string>
}>()


// 是否有导航项
const hasItems = computed(() => items && items.length > 0)


// Emits
const emit = defineEmits<{
  (e: 'toggle', isExpanded: boolean): void
  (e: 'itemClick', item: NavItem): void
}>()

// 状态
const isExpanded = defineModel({ default: false })

// 计算展开方向
const computedExpandDirection = computed<ExpandDirection>(() => {
  if (expandDirection) {
    return expandDirection
  }
  if (mobileAdaptive && isMobile) {
    return getMobileExpandDirection()
  }
  return getAutoExpandDirection()
})


// 根据位置自动计算展开方向
const getAutoExpandDirection = (): ExpandDirection => {
  switch (position) {
    case 'top-left':
      return 'bottom'
    case 'top-right':
      return 'bottom'
    case 'bottom-left':
      return 'right'
    case 'bottom-right':
      return 'left'
    default:
      return 'left'
  }
}

// 移动端展开方向
const getMobileExpandDirection = (): ExpandDirection => {
  switch (position) {
    case 'top-left':
    case 'top-right':
      return 'bottom'
    case 'bottom-left':
    case 'bottom-right':
      return 'top'
    default:
      return 'top'
  }
}

// 容器样式
const containerStyle = computed(() => {
  const style: Record<string, string> = {}

  if (offset.top !== undefined) {
    style.top = typeof offset.top === 'number' ? `${offset.top}px` : offset.top
  }
  if (offset.right !== undefined) {
    style.right = typeof offset.right === 'number' ? `${offset.right}px` : offset.right
  }
  if (offset.bottom !== undefined) {
    style.bottom = typeof offset.bottom === 'number' ? `${offset.bottom}px` : offset.bottom
  }
  if (offset.left !== undefined) {
    style.left = typeof offset.left === 'number' ? `${offset.left}px` : offset.left
  }

  return { ...style, ...css } as CSSProperties;
})

// 切换展开/收起
const toggle = () => {
  isExpanded.value = !isExpanded.value
  emit('toggle', isExpanded.value)
}

// 处理导航项点击
const handleItemClick = (item: NavItem): void => {
  emit('itemClick', item)
}


// 暴露方法
defineExpose({
  toggle,
  expand: () => { isExpanded.value = true },
  collapse: () => { isExpanded.value = false },
  isExpanded: () => isExpanded.value
})
</script>

<style lang="less" scoped>
.navigation-container {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  background-color: transparent;

  &.is-expanded {
    pointer-events: auto;
  }

  --nav-item-color: var(--color-text);
  --nav-item-hover-color: var(--color-primary);
  --nav-item-background: var(--color-background-soft);
  --nav-item-padding: 0.3rem 0.55rem;
  --nav-item-gap: 0.25rem;
  --nav-item-font-size: 0.65rem;
  --nav-item-font-weight: var(--font-weight-medium);
  --nav-item-border-color: var(--color-border);
  --nav-item-border-width: var(--border-width);
  --nav-item-border-radius: var(--border-radius-sm);
  --nav-item-box-shadow: var(--box-shadow-xs);
  --nav-item-box-shadow-hover: var(--box-shadow-sm);

  --nav-item-transform-x: 0.125rem;
  --nav-item-transform-y: 0.125rem;
  --nav-item-transform-scale: 1.05;
  --nav-item-transform-duration: var(--transition-duration);
  --nav-item-transform-easing: cubic-bezier(0.34, 1.56, 0.64, 1);

  --nav-item-transform-slide-y: 1.25rem;
  --nav-item-transform-slide-x: 1.25rem;
  --nav-item-transform-slide-scale: 0.8;

  --navigation-toggle-width: calc(var(--nav-item-font-size) * 3);
  --navigation-toggle-height: calc(var(--nav-item-font-size) * 3);
  --navigation-toggle-icon-size: var(--font-size);
  --navigation-toggle-bubble-size: 0.45rem;

  --navigation-toggle-border-radius: var(--border-radius-full);
  --navigation-toggle-background: var(--color-secondary);
  --navigation-toggle-color: var(--color-text);
  --navigation-toggle-box-shadow: var(--box-shadow-xs);
  --navigation-toggle-box-shadow-hover: var(--box-shadow-sm);

  --navigation-toggle-icon-line-width: 0.7rem;
}


/* 导航项样式 */
.nav-item {
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--nav-item-gap);
  padding: var(--nav-item-padding);
  background: var(--nav-item-background);
  color: var(--nav-item-color);
  border: var(--nav-item-border-width) solid var(--nav-item-border-color);
  border-radius: var(--nav-item-border-radius);
  box-shadow: var(--nav-item-box-shadow);
  cursor: pointer;
  transition: border-color var(--nav-item-transform-duration) var(--nav-item-transform-easing), transform var(--nav-item-transform-duration) var(--nav-item-transform-easing), box-shadow var(--nav-item-transform-duration) var(--nav-item-transform-easing);

  /* 悬停样式 */
  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(var(--nav-item-transform-y)) scale(var(--nav-item-transform-scale));
    box-shadow: var(--nav-item-box-shadow-hover);
  }
}

.nav-icon {
  font-size: var(--nav-item-font-size);
  line-height: 1;
}

.nav-text {
  font-size: var(--nav-item-font-size);
  font-weight: var(--font-weight-medium);
  line-height: 1;
}

/* 导航内容 */
.navigation-content {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1001;
  background-color: transparent;
  align-content: center;
}

/* 导航项容器 */
.navigation-items {
  display: flex;
  gap: var(--nav-item-gap);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* 展开方向：从左到右 */
.navigation-container.expand-left {
  .navigation-content {
    flex-direction: row-reverse;
  }

  .navigation-items {
    flex-direction: row-reverse;
  }

  .is-active {
    margin-right: 10px;
  }
}

/* 展开方向：从右到左 */
.navigation-container.expand-right {
  .navigation-content {
    flex-direction: row;
  }

  .navigation-items {
    flex-direction: row;
  }

  .is-active {
    margin-left: 10px;
  }
}

/* 展开方向：从上到下 */
.navigation-container.expand-top {
  .navigation-content {
    flex-direction: column-reverse;
  }

  .navigation-items {
    flex-direction: column-reverse;
  }

  .is-active {
    margin-bottom: 10px;
  }
}

/* 展开方向：从下到上 */
.navigation-container.expand-bottom {
  .navigation-content {
    flex-direction: column;
  }

  .navigation-items {
    flex-direction: column;
  }

  .is-active {
    margin-top: 10px;
  }
}

/* 位置调整 */
.navigation-container.position-bottom-right {
  bottom: 0;
  right: 0;
}

.navigation-container.position-bottom-left {
  bottom: 0;
  left: 0;
}

.navigation-container.position-top-right {
  top: 0;
  right: 0;
}

.navigation-container.position-top-left {
  top: 0;
  left: 0;
}

/* 导航项 */
.navigation-item {
  opacity: 0;
  transform: scale(0.8) translateY(var(--nav-item-transform-slide-y));
  transition: scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), translateY 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--delay, 0s);
  pointer-events: auto;
  cursor: pointer;
  background: transparent;
}

/* 展开状态下的导航项 */
.navigation-container.is-expanded {
  .navigation-item {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 展开动画 - 从左到右 */
.navigation-container.expand-left.is-expanded {
  .navigation-item {
    animation: slideInLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--delay, 0s);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(var(--nav-item-transform-slide-x)) scale(var(--nav-item-transform-slide-scale));
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* 展开动画 - 从右到左 */
.navigation-container.expand-right.is-expanded {
  .navigation-item {
    animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--delay, 0s);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-var(--nav-item-transform-slide-x)) scale(var(--nav-item-transform-slide-scale));
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* 展开动画 - 从上到下 */
.navigation-container.expand-top.is-expanded {
  .navigation-item {
    animation: slideInTop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--delay, 0s);
  }
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(var(--nav-item-transform-slide-y)) scale(var(--nav-item-transform-slide-scale));
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 展开动画 - 从下到上 */
.navigation-container.expand-bottom.is-expanded {
  .navigation-item {
    animation: slideInBottom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--delay, 0s);
  }
}

@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(-var(--nav-item-transform-slide-y)) scale(var(--nav-item-transform-slide-scale));
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 主按钮 */
.navigation-toggle {
  position: relative;
  width: var(--navigation-toggle-width);
  height: var(--navigation-toggle-height);
  border: none;
  border-radius: 50%;
  background: var(--navigation-toggle-background);
  color: var(--navigation-toggle-color);
  cursor: pointer;
  box-shadow: var(--navigation-toggle-box-shadow);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;

  &:hover {
    transform: scale(1.1);
    box-shadow: var(--navigation-toggle-box-shadow-hover);
  }

  &:active {
    transform: scale(0.95);
  }
}

/* 图标容器：折叠态小圆片气泡 ↔ 展开态小 x */
.toggle-icon {
  position: relative;
  width: var(--navigation-toggle-icon-size);
  height: var(--navigation-toggle-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

// 折叠态：气泡（小圆片）
.bubble-dot {
  width: var(--navigation-toggle-bubble-size);
  height: var(--navigation-toggle-bubble-size);
  border-radius: 50%;
  background: currentColor;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

// 展开态：小 x（两个交叉线）
.close-x {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  .x-line {
    position: absolute;
    width: var(--navigation-toggle-icon-line-width);
    height: 2px;
    background: currentColor;
    border-radius: var(--border-radius-xs);

    &:nth-child(1) {
      transform: rotate(45deg);
    }

    &:nth-child(2) {
      transform: rotate(-45deg);
    }
  }
}

// 展开时：气泡淡出 → x 淡入
.navigation-toggle.is-active {
  .bubble-dot {
    opacity: 0;
    transform: scale(0);
  }

  .close-x {
    opacity: 1;
    transform: scale(1);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .navigation-container {
    &.mobile-adaptive {
      .navigation-items {
        gap: 8px;
      }

      .navigation-item {
        .nav-item-content {
          min-width: 44px;
          min-height: 44px;
          padding: 10px;
          font-size: 12px;
        }
      }

      .navigation-toggle {
        width: 44px;
        height: 44px;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
}

/* 导航项进入/离开动画 */
.nav-item-enter-active,
.nav-item-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.nav-item-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.nav-item-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>