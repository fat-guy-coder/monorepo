<template>
  <section class="layout"
    :class="{ 'overflow-y-auto': isNotFixedHeaderAndFooter, 'sidebar-full-height-layout': isAllFullHeight }">
    <!-- Header -->
    <component v-if="headerComponent && !isJustFixedFooter && !isAllFullHeight" :is="headerComponent"
      v-model:headerState="headerState">
    </component>
    <component v-if="sideBarComponents[0] && isAllFullHeight" :is="sideBarComponents[0]"
      :style="siderStyle({ width: leftSiderState.isVisible ? leftSiderState.size : 0, position: leftSiderState.isFixed ? 'sticky' : 'static', top: leftSiderState.top })"
      align="left" />
    <div class="resizer vertical" v-if="sideBarComponents[0] && leftSiderState.isVisible && isAllFullHeight"
      @mousedown="handleResize('leftSider', $event)" :style="{ left: `${leftSiderState.size}px` }"></div>
    <div class="resizer vertical" v-if="sideBarComponents[1] && rightSiderState.isVisible && isAllFullHeight"
      @mousedown="handleResize('rightSider', $event)" :style="{ right: `${offsetRightSiderLeft}px` }"></div>
    <div class="resizer horizontal" v-if="headerComponent && headerState.isVisible && !isAllFullHeight"
      @mousedown="handleResize('header', $event)"></div>
    <!-- Body -->
    <section class="layout-body" :class="{ 'overflow-y-auto': isFixedHeaderOrFooter && !isAllFullHeight }">
      <!-- Header -->
      <component v-if="headerComponent && (isJustFixedFooter || isAllFullHeight)" :is="headerComponent"
        v-model:headerState="headerState" />
      <!-- content-container -->
      <div class="layout-content" :class="{ 'overflow-y-auto': isFixedHeaderAndFooter }">
        <component v-if="sideBarComponents[0] && !isAllFullHeight" :is="sideBarComponents[0]"
          :style="siderStyle({ width: leftSiderState.isVisible ? leftSiderState.size : 0, position: leftSiderState.isFixed ? 'sticky' : 'static', top: leftSiderState.top })"
          align="left" />
        <component v-if="contentComponent" :is="contentComponent" />
        <component v-if="sideBarComponents[1] && !isAllFullHeight" :is="sideBarComponents[1]"
          :style="siderStyle({ width: rightSiderState.isVisible ? rightSiderState.size : 0, position: rightSiderState.isFixed ? 'sticky' : 'static', top: rightSiderState.top })"
          align="right" />
      </div>
      <!-- Footer -->
      <component v-if="footerComponent && (isJustFixedHeader || isAllFullHeight)" :is="footerComponent"
        v-model:footerState="footerState" />
      <div class="resizer vertical" v-if="sideBarComponents[0] && leftSiderState.isVisible && !isAllFullHeight"
        @mousedown="handleResize('leftSider', $event)" :style="{ left: `${leftSiderState.size}px` }"></div>
      <div class="resizer vertical" v-if="sideBarComponents[1] && rightSiderState.isVisible && !isAllFullHeight"
        @mousedown="handleResize('rightSider', $event)" :style="{ right: `${offsetRightSiderLeft}px` }"></div>
      <div v-if="sideBarComponents[0]" class="unified-trigger vertical left"
        :style="{ left: leftSiderState.isVisible ? `${leftSiderState.size}px` : '0' }">
        <div class="control-group">
          <label v-if="leftSiderState.isVisible" class="control-item">
            <span>是否显示</span>
            <Switch v-model="leftSiderState.isVisible" size="small" />
          </label>
          <label v-if="leftSiderState.isVisible" class="control-item">
            <span>固定位置</span>
            <Switch v-model="leftSiderState.isFixed" size="small" />
          </label>
          <label v-if="leftSiderState.isVisible" class="control-item">
            <span>可折叠</span>
            <Switch v-model="leftSiderState.collapsible" size="small" />
          </label>
          <label v-if="leftSiderState.isVisible" class="control-item">
            <span>占满高度</span>
            <Switch v-model="leftSiderState.isFullHeight" size="small" />
          </label>
          <button v-else class="restore-trigger" @click="leftSiderState.isVisible = true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="sideBarComponents[1]" class="unified-trigger vertical right"
        :style="{ right: rightSiderState.isVisible ? `${offsetRightSiderLeft}px` : '0' }">
        <div class="control-group">
          <label v-if="rightSiderState.isVisible" class="control-item">
            <span>是否显示</span>
            <Switch v-model="rightSiderState.isVisible" size="small" />
          </label>
          <label v-if="rightSiderState.isVisible" class="control-item">
            <span>固定位置</span>
            <Switch v-model="rightSiderState.isFixed" size="small" />
          </label>
          <label v-if="rightSiderState.isVisible" class="control-item">
            <span>可折叠</span>
            <Switch v-model="rightSiderState.collapsible" size="small" />
          </label>
          <label v-if="rightSiderState.isVisible" class="control-item">
            <span>占满高度</span>
            <Switch v-model="rightSiderState.isFullHeight" size="small" />
          </label>
          <button v-else class="restore-trigger" @click="rightSiderState.isVisible = true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <div class="resizer horizontal" v-if="footerComponent && footerState.isVisible && !isAllFullHeight"
      @mousedown="handleResize('footer', $event)"></div>
    <component v-if="footerComponent && !isJustFixedHeader && !isAllFullHeight" :is="footerComponent"
      v-model:footerState="footerState" />
    <component v-if="sideBarComponents[1] && isAllFullHeight" :is="sideBarComponents[1]"
      :style="siderStyle({ width: rightSiderState.isVisible ? rightSiderState.size : 0, position: rightSiderState.isFixed ? 'sticky' : 'static', top: rightSiderState.top })"
      align="right" />
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots, type VNode, reactive, type CSSProperties } from 'vue'
import type { LayoutPartState } from './index'
import { Switch } from '@/components'
import { throttle } from '@/function/common'

defineOptions({ name: 'Layout' })

// --- State Management ---

const headerState = reactive<LayoutPartState>({
  isVisible: true,
  isFixed: true, // 默认固定
  size: 64,
})

const footerState = reactive<LayoutPartState>({
  isVisible: true,
  isFixed: true, // 默认固定
  size: 64,
})

const leftSiderState = reactive<LayoutPartState>({
  isVisible: true,
  isFixed: true,
  size: 200,
  top: 0,
})

const rightSiderState = reactive<LayoutPartState>({
  isVisible: true,
  isFixed: true,
  size: 200,
  top: 0,
})

const stateMap = {
  header: headerState,
  footer: footerState,
  leftSider: leftSiderState,
  rightSider: rightSiderState,
}

// 计算是否有固定的 Header 或 Footer
const hasFixedParts = computed(() => {
  const hasFixedHeader = headerComponent.value && headerState.isVisible && headerState.isFixed
  const hasFixedFooter = footerComponent.value && footerState.isVisible && footerState.isFixed
  return hasFixedHeader && hasFixedFooter
})

// 计算是否只有固定的 Header
const isJustFixedHeader = computed(() => {
  return headerState.isFixed && !footerState.isFixed
})

// 计算是否只有固定的 Footer
const isJustFixedFooter = computed(() => {
  return !headerState.isFixed && footerState.isFixed
})

// 计算是否同时固定的 Header 和 Footer
const isFixedHeaderAndFooter = computed(() => {
  return headerState.isFixed && footerState.isFixed
})

//计算是否同时都不固定的 Header 和 Footer
const isNotFixedHeaderAndFooter = computed(() => {
  return !headerState.isFixed && !footerState.isFixed
})
// 计算是否固定的 Header 或 Footer
const isFixedHeaderOrFooter = computed(() => {
  return headerState.isFixed || footerState.isFixed
})

//因为动态切换overflow元素带来的滚动条宽度变化，导致的偏移修复
const offsetRightSiderLeft = computed(() => {
  return rightSiderState.size + (isFixedHeaderAndFooter.value ? 10 : 0)
})


// 计算sidebar是否左右侧都占满高度
const isAllFullHeight = computed(() => {
  return leftSiderState.isFullHeight && rightSiderState.isFullHeight
})

// --- Style & Resize Logic ---
const MIN_SIDER_WIDTH = 40
const MIN_HEADER_FOOTER_HEIGHT = 40

const siderStyle = ({ width, position, top }: CSSProperties): CSSProperties => ({
  width: `${width}px`,
  flexBasis: `${width}px`,
  flexShrink: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  position: position,
  top: `${top}px`,
})


const handleResize = throttle((target: keyof typeof stateMap, event: MouseEvent) => {
  event.preventDefault()
  const startX = event.clientX,
    startY = event.clientY
  const state = stateMap[target],
    initialSize = state.size

  const onMouseMove = (moveEvent: MouseEvent) => {
    const deltaX = moveEvent.clientX - startX,
      deltaY = moveEvent.clientY - startY
    let newSize = initialSize

    if (target === 'header') newSize += deltaY
    else if (target === 'footer') newSize -= deltaY
    else if (target === 'leftSider') newSize += deltaX
    else if (target === 'rightSider') newSize -= deltaX

    const minSize =
      target === 'header' || target === 'footer' ? MIN_HEADER_FOOTER_HEIGHT : MIN_SIDER_WIDTH
    state.size = Math.max(minSize, newSize)
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  document.body.style.userSelect = 'none'
  document.body.style.cursor =
    target === 'header' || target === 'footer' ? 'row-resize' : 'col-resize'
}, 200)

// --- Slot Discovery ---
const slots = useSlots()
const getComponentFromVNodes = (nodes: VNode[], name: string) =>
  nodes.find((node) => (node.type as any)?.name === name || (node.type as any)?.__name === name)

const getComponentsFromVNodes = (nodes: VNode[], name: string) =>
  nodes.filter((node) => (node.type as any)?.name === name || (node.type as any)?.__name === name)

const defaultSlot = slots.default ? slots.default() : []
const headerComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Header'))
const footerComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Footer'))
const sideBarComponents = computed(() => getComponentsFromVNodes(defaultSlot, 'SideBar'))
const contentComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Content'))
</script>

<style lang="less">
.layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%; // 改为 min-height 而不是 height
  background: var(--color-background);
  position: relative;


  &.sidebar-full-height-layout {
    flex-direction: row;

    .layout-body {
      flex: 1;
    }

  }

  .layout-content {
    display: flex;
    flex: 1;
    flex-direction: row;
  }

  .overflow-y-auto {
    overflow-y: auto;
    height: 100%;
    position: relative;
  }

  &.overflow-y-auto {
    overflow-y: auto;
    height: 100%;
    position: relative;
  }

  .resizer {
    background-color: transparent;
    position: relative;
    z-index: 20;

    &::before {
      content: '';
      position: absolute;
      transition: background-color 0.3s ease;
    }

    &:hover::before {
      background-color: #007bff;
    }

    &.vertical {
      width: 2px;
      cursor: col-resize;
      position: absolute;
      top: 0;
      bottom: 0;

      &::before {
        top: 0;
        bottom: 0;
        left: -4px;
        right: -4px;
      }
    }

    &.horizontal {
      height: 2px;
      cursor: row-resize;
      width: 100%;

      &::before {
        left: 0;
        right: 0;
        top: -4px;
        bottom: -4px;
      }
    }
  }

  .unified-trigger {
    position: absolute;
    background: var(--color-background-mute);
    border: 1px solid var(--color-border);
    line-height: 1;
    transition: all 0.3s ease;
    z-index: 25;
    padding: 4px 12px;
    display: flex;

    &:hover {
      background: var(--color-background);
    }

    &.horizontal {
      left: 50%;
      transform: translateX(-50%);
      transform-origin: center bottom;
      padding: 8px 4px;

      &.top {
        top: 100%;
        border-top: none;
        border-radius: 0 0 4px 4px;
      }

      &.is-hidden {
        top: 0;
      }

      &.bottom {
        bottom: 100%;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
      }

      &.top.is-hidden {
        top: 0;
      }

      &.bottom.is-hidden {
        top: -2rem;
      }
    }

    &.vertical {
      top: 50%;
      transform: translateY(-50%);
      padding: 8px 4px;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &.left {
        border-left: none;
        border-radius: 0 4px 4px 0;

      }

      &.right {
        border-right: none;
        border-radius: 4px 0 0 4px;
      }

      &.is-hidden {
        left: 0px;
      }

      &.left.is-hidden {
        left: -2rem;
      }

      &.right.is-hidden {
        right: -2rem;
      }
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;
      background-color: transparent;

      .control-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        cursor: pointer;
        white-space: nowrap;
      }

      .restore-trigger {
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        display: block;
      }
    }
  }
}
</style>
