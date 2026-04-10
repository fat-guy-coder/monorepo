<template>
  <div class="hover-container" ref="containerRef">
    <!-- 触发器插槽 -->
    <div class="trigger-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <slot name="trigger"></slot>
    </div>

    <!-- 内容插槽 -->
    <transition name="fade">
      <div v-show="isVisible" class="content-wrapper" :style="[contentPosition, contentStyle]">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

const isVisible = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const contentPosition = ref({ left: '0', top: '0' })

// 合并样式
const props = defineProps({
  contentStyle: {
    type: Object,
    default: () => ({
      width: 'minmax(300px, 1fr)',
      'max-width': '80vw'
    })
  }
})

// 计算最佳显示位置
const calculatePosition = async () => {
  await nextTick()
  if (!containerRef.value) return

  const triggerRect = containerRef.value.getBoundingClientRect()
  const contentHeight = 200 // 预估内容高度，可根据实际情况调整
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const positions = {
    top: triggerRect.top - contentHeight - 10,
    bottom: triggerRect.bottom + 10,
    left: triggerRect.left,
    right: viewport.width - triggerRect.right
  }

  // 自动选择合适位置
  let vertical = 'bottom'
  if (positions.top < 0 && positions.bottom + contentHeight < viewport.height) {
    vertical = 'bottom'
  } else if (positions.bottom + contentHeight > viewport.height) {
    vertical = 'top'
  }

  contentPosition.value = {
    left: `${triggerRect.left}px`,
    top: vertical === 'bottom'
      ? `${triggerRect.bottom + 10}px`
      : `${triggerRect.top - contentHeight - 10}px`
  }
}

// 事件处理
const handleMouseEnter = () => {
  isVisible.value = true
  calculatePosition()
}

const handleMouseLeave = () => {
  isVisible.value = false
}
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@shadow-color: rgba(0, 0, 0, 0.1);

.hover-container {
  display: inline-block;
  position: relative;

  .trigger-wrapper {
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  .content-wrapper {
    position: fixed;
    z-index: 999;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px @shadow-color;
    padding: 1.2rem;
    min-width: 300px;
    max-width: 80vw;
    transition: transform 0.2s, opacity 0.2s;

    // 默认宽度控制
    width: var(--content-width, minmax(300px, 1fr));
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
