<template>
  <section class="layout" :class="{ 'overflow-y-auto': isNotFixedHeaderAndFooter }">
    <!-- Header -->
    <component
      v-if="headerComponent && !isJustFixedFooter"
      :is="headerComponent"
      v-model:headerState="headerState"
    >
    </component>
    <div
      class="resizer horizontal"
      v-if="headerComponent && headerState.isVisible"
      @mousedown="handleResize('header', $event)"
    ></div>
    <!-- Body -->
    <section class="layout-body" :class="{ 'overflow-y-auto': isFixedHeaderOrFooter }">
      <component
        v-if="headerComponent && isJustFixedFooter"
        :is="headerComponent"
        v-model:headerState="headerState"
      />
      <div class="layout-body-content" :class="{ 'overflow-y-auto': isFixedHeaderAndFooter }">
        <component
          v-if="sideBarComponents[0]"
          :is="sideBarComponents[0]"
          :style="siderStyle(leftSiderState.isVisible ? leftSiderState.size : 0)"
          align="left"
        />
        <component v-if="contentComponent" :is="contentComponent" />
        <component
          v-if="sideBarComponents[1]"
          :is="sideBarComponents[1]"
          :style="siderStyle(rightSiderState.isVisible ? rightSiderState.size : 0)"
          align="right"
        />
      </div>
      <component
        v-if="footerComponent && isJustFixedHeader"
        :is="footerComponent"
        v-model:footerState="footerState"
      />
      <div
        class="resizer vertical"
        v-if="sideBarComponents[0] && leftSiderState.isVisible"
        @mousedown="handleResize('leftSider', $event)"
        :style="{ left: `${leftSiderState.size - 1}px` }"
      ></div>
      <div
        class="resizer vertical"
        v-if="sideBarComponents[1] && rightSiderState.isVisible"
        @mousedown="handleResize('rightSider', $event)"
        :style="{ right: `${rightSiderState.size - 1}px` }"
      ></div>

      <div
        v-if="sideBarComponents[0]"
        class="unified-trigger vertical left"
        :style="{ left: leftSiderState.isVisible ? `${leftSiderState.size}px` : '0' }"
      >
        <div class="control-group">
          <label v-if="leftSiderState.isVisible" class="control-item">
            <span>是否显示</span>
            <Switch v-model="leftSiderState.isVisible" size="small" />
          </label>
          <label v-if="leftSiderState.isVisible" class="control-item">
            <span>固定位置</span>
            <Switch v-model="leftSiderState.isFixed" size="small" />
          </label>
          <button v-else class="restore-trigger" @click="leftSiderState.isVisible = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-if="sideBarComponents[1]"
        class="unified-trigger vertical right"
        :style="{ right: rightSiderState.isVisible ? `${rightSiderState.size + 10}px` : '0' }"
      >
        <div class="control-group">
          <label v-if="rightSiderState.isVisible" class="control-item">
            <span>是否显示</span>
            <Switch v-model="rightSiderState.isVisible" size="small" />
          </label>
          <label v-if="rightSiderState.isVisible" class="control-item">
            <span>固定位置</span>
            <Switch v-model="rightSiderState.isFixed" size="small" />
          </label>
          <button v-else class="restore-trigger" @click="rightSiderState.isVisible = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <div
      class="resizer horizontal"
      v-if="footerComponent && footerState.isVisible"
      @mousedown="handleResize('footer', $event)"
    ></div>
    <component
      v-if="footerComponent && !isJustFixedHeader"
      :is="footerComponent"
      v-model:footerState="footerState"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots, type VNode, reactive, type CSSProperties } from 'vue'
import type { LayoutPartState } from './index'
import { Switch } from '@/components'

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
})

const rightSiderState = reactive<LayoutPartState>({
  isVisible: true,
  isFixed: true,
  size: 200,
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
  console.log(hasFixedHeader && hasFixedFooter)
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
// --- Style & Resize Logic ---
const MIN_SIDER_WIDTH = 40
const MIN_HEADER_FOOTER_HEIGHT = 40

const siderStyle = (width: number): CSSProperties => ({
  width: `${width}px`,
  flexBasis: `${width}px`,
  flexShrink: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
})

const handleResize = (target: keyof typeof stateMap, event: MouseEvent) => {
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
}

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

  .layout-body-content {
    display: flex;
    flex: 1;
    flex-direction: row;
    position: relative;
  }

  .overflow-y-auto {
    overflow-y: auto;
  }

  &.overflow-y-auto {
    overflow-y: auto;
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
        top: -36px;
      }
    }
    &.vertical {
      top: 20rem;
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
