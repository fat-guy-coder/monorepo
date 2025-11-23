<template>
  <div class="navigation-container" :class="[
    `position-${position}`,
    `expand-${computedExpandDirection}`,
    {
      'is-expanded': isExpanded,
      'mobile-adaptive': props.mobileAdaptive && isMobile
    }
  ]" :style="containerStyle">
    <!-- 导航内容区域 -->
    <div class="navigation-content">
      <!-- 展开的导航项 -->
      <transition-group v-if="isExpanded && hasItems" name="nav-item" tag="div" class="navigation-items">
        <div v-for="(item, index) in navigationItems" :key="item.key || `nav-item-${index}`" class="navigation-item"
          :style="{ '--delay': `${index * 0.05}s` }" @click="handleItemClick(index, item)">
          <component :is="item" />
        </div>
      </transition-group>

      <!-- 主按钮 -->
      <button class="navigation-toggle" :class="{ 'is-active': isExpanded }" @click.stop="toggle"
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
import { ref, computed, onMounted, onUnmounted, useSlots } from 'vue'



// 定义位置类型
type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

// 定义展开方向类型
type ExpandDirection = 'left' | 'right' | 'top' | 'bottom'

// Props
interface Props {
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
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
  expandDirection: undefined,
  offset: () => ({
    bottom: '20px',
    right: '20px'
  }),
  mobileAdaptive: true,
  isMobile: false
})

// Emits
const emit = defineEmits<{
  toggle: [isExpanded: boolean]
  itemClick: [index: number, item?: any]
}>()

// 获取插槽
const slots = useSlots()

// 状态
const isExpanded = defineModel({ default: false })

// 获取导航项
const navigationItems = computed(() => {
  if (slots.default) {
    const defaultSlot = slots.default()
    // 过滤掉注释和文本节点
    return defaultSlot.filter(item => {
      if (!item) return false
      // 检查是否是有效的 VNode
      return item.type && typeof item.type !== 'string' || (typeof item.type === 'string' && item.type !== '')
    })
  }
  return []
})

// 是否有导航项
const hasItems = computed(() => navigationItems.value.length > 0)



// 计算展开方向
const computedExpandDirection = computed<ExpandDirection>(() => {
  // 如果明确指定了展开方向，优先使用
  if (props.expandDirection) {
    return props.expandDirection
  }

  // 如果启用移动端自适应，在移动端时根据位置调整
  if (props.mobileAdaptive && props.isMobile) {
    return getMobileExpandDirection()
  }

  // 根据位置自动计算展开方向
  return getAutoExpandDirection()
})


// 根据位置自动计算展开方向
const getAutoExpandDirection = (): ExpandDirection => {
  const { position } = props
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
  const { position } = props
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
  const { offset } = props

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
const handleItemClick = (index: number, item?: any) => {
  emit('itemClick', index, item)
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

  &.is-expanded {
    pointer-events: auto;
  }
}

/* 导航内容 */
.navigation-content {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1001;
}

/* 导航项容器 */
.navigation-items {
  display: flex;
  gap: 12px;
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
}

/* 展开方向：从右到左 */
.navigation-container.expand-right {
  .navigation-content {
    flex-direction: row;
  }

  .navigation-items {
    flex-direction: row;
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
}

/* 展开方向：从下到上 */
.navigation-container.expand-bottom {
  .navigation-content {
    flex-direction: column;
  }

  .navigation-items {
    flex-direction: column;
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
  transform: scale(0.8) translateY(20px);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--delay, 0s);
  pointer-events: auto;
  cursor: pointer;
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
    transform: translateX(20px) scale(0.8);
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
    transform: translateX(-20px) scale(0.8);
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
    transform: translateY(20px) scale(0.8);
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
    transform: translateY(-20px) scale(0.8);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 主按钮 */
.navigation-toggle {
  position: relative;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  margin-right: 30px;
  background: var(--color-primary);
  color: var(--color-background);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
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
          transform: translateY(8px) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
      }
    }
  }
}

/* 图标 */
.toggle-icon {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.icon-line {
  width: 20px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
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
  transition: all 0.3s ease;
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
