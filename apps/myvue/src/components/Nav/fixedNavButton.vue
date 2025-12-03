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
      <transition-group v-if="isExpanded && items && items.length > 0" name="nav-item" tag="div"
        class="navigation-items">
        <div v-for="(item, index) in items" :key="item.value || `nav-item-${index}`" class="navigation-item"
          :style="{ '--delay': `${index * 0.05}s` }" @click="handleItemClick(item)">
          <div class="nav-item" :class="['gradient-animation']">
            <slot :name="item.value" v-if="$slots[item.value]" :item="item"></slot>
            <template v-else>
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-text">{{ item.label }}</span>
            </template>
          </div>
        </div>
      </transition-group>
      <!-- 主按钮 -->
      <button class="navigation-toggle" :class="{ 'is-active': isExpanded, }" @click.stop="toggle"
        :aria-label="isExpanded ? '收起导航' : '展开导航'">
        <span class="toggle-icon">
          <span class="icon-line"></span>
          <span class="icon-line"></span>
          <span class="icon-line"></span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { NavItem } from './index'


// 定义位置类型
type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

// 定义展开方向类型
type ExpandDirection = 'left' | 'right' | 'top' | 'bottom'

// Props
interface Props {
  items?: NavItem[]
  // 位置：默认右下角
  position?: Position
  // 展开方向：默认从左到右（如果传了位置会根据位置自动调整，但此参数优先级更高）
  expandDirection?: ExpandDirection
  // 距离边缘的距离
  offset?: {
    top?: number | string
    right?: number | string
    bottom?: number | string
    left?: number | string
  }
  // 移动端是否自动调整位置和展开方向
  mobileAdaptive?: boolean
  //是否是手机端
  isMobile: boolean
  //是否使用
  userBgGradient?: {
    colorsCount?: number,
    type?: 'linear' | 'radial' | 'text' | 'box-shadow'
  }
}



const { position = 'bottom-right', expandDirection, offset = { bottom: '1.5rem', right: '1.5rem' }, mobileAdaptive = true, isMobile = false, userBgGradient } = defineProps<Props>()


// Emits
const emit = defineEmits<{
  (e: 'toggle', isExpanded: boolean): void
  (e: 'itemClick', item: NavItem): void
}>()

// 获取插槽
// const slots = useSlots()

// 状态
const isExpanded = defineModel({ default: false })

// // 获取导航项
// const navigationItems = computed(() => {
//   if (slots.default) {
//     const defaultSlot = slots.default()
//     // 过滤掉注释和文本节点
//     console.log(defaultSlot)
//     return defaultSlot.filter(item => {
//       if (!item) return false
//       // 检查是否是有效的 VNode
//       return item.type && typeof item.type !== 'string' || (typeof item.type === 'string' && item.type !== '')
//     })
//   }
//   return []
// })

// // 是否有导航项
// const hasItems = computed(() => navigationItems.value.length > 0)



// 计算展开方向
const computedExpandDirection = computed<ExpandDirection>(() => {
  // 如果明确指定了展开方向，优先使用
  if (expandDirection) {
    return expandDirection
  }

  // 如果启用移动端自适应，在移动端时根据位置调整
  if (mobileAdaptive && isMobile) {
    return getMobileExpandDirection()
  }

  // 根据位置自动计算展开方向
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

  return style
})

// 切换展开/收起
const toggle = () => {
  isExpanded.value = !isExpanded.value
  emit('toggle', isExpanded.value)
}

// 处理导航项点击
const handleItemClick = (item: NavItem): void => {
  emit('itemClick', item)
  // 点击后可以自动收起（可选）
  // toggle()
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
  --nav-item-padding: var(--padding-sm) var(--padding-md);
  --nav-item-gap: var(--gap-md);
  --nav-item-font-size: var(--font-size-xs);
  --nav-item-font-weight: var(--font-weight-medium);
  --nav-item-border-color: var(--color-border);
  --nav-item-border-width: var(--border-width);
  --nav-item-border-radius: var(--border-radius-sm);
  --nav-item-box-shadow: var(--box-shadow-xs);
  --nav-item-box-shadow-hover: var(--box-shadow-sm);

  --nav-item-transform-x: 0.125rem;
  --nav-item-transform-y: 0.125rem;
  --nav-item-transform-scale: 1.05;
  --nav-item-transform-duration: 0.3s;
  --nav-item-transform-easing: cubic-bezier(0.34, 1.56, 0.64, 1);

  --nav-item-transform-slide-y: 1.25rem;
  --nav-item-transform-slide-x: 1.25rem;
  --nav-item-transform-slide-scale: 0.8;

  --navigation-toggle-width: calc(var(--nav-item-font-size) * 4);
  --navigation-toggle-height: calc(var(--nav-item-font-size) * 4);
  --navigation-toggle-icon-size:1rem;

  --navigation-toggle-border-radius: var(--border-radius-full);
  --navigation-toggle-background: var(--color-secondary);
  --navigation-toggle-color: var(--color-text);
  --navigation-toggle-box-shadow: var(--box-shadow-xs);
  --navigation-toggle-box-shadow-hover: var(--box-shadow-sm);
  
  --navigation-toggle-icon-line-width: 1.25rem;
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

  &.is-active {
    background: var(--color-secondary);
    transform: rotate(180deg);

    .toggle-icon {
      .icon-line {
        &:nth-child(1) {
          transform: translateY(0.5rem) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: translateY(-0.5rem) rotate(-45deg);
        }
      }
    }
  }
}

/* 图标 */
.toggle-icon {
  position: relative;
  width: var(--navigation-toggle-icon-size);
  height: var(--navigation-toggle-icon-size);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
}

.icon-line {
  width: var(--navigation-toggle-icon-line-width);
  height: 2px;
  background: currentColor;
  border-radius: var(--border-radius-xs);
  transition: all 0.3s ease;
  transform-origin: center;
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
        width: 52px;
        height: 52px;
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
