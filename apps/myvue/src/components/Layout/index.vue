<template>
  <section class="ui-layout" :class="{ 'fixed-layout': hasFixedParts }">
    <!-- Header -->
    <component
      v-if="headerComponent"
      :is="headerComponent"
      :style="{ 
        height: `${headerState.isVisible ? headerState.size : 0}px`,
        position: headerState.isFixed ? 'static' : 'relative'
      }"
    />
    <div class="resizer horizontal" v-if="headerComponent && headerState.isVisible" @mousedown="handleResize('header', $event)"></div>

    <!-- Body -->
    <section class="ui-layout-body" :class="{'no-overflow': !hasFixedParts}">
      <component v-if="sideBarComponents[0]" :is="sideBarComponents[0]" :style="siderStyle(leftSiderState.isVisible ? leftSiderState.size : 0)" align="left" />
      <component v-if="contentComponent" :is="contentComponent" />
      <component v-if="sideBarComponents[1]" :is="sideBarComponents[1]" :style="siderStyle(rightSiderState.isVisible ? rightSiderState.size : 0)" align="right" />

      <div class="resizer vertical" v-if="sideBarComponents[0] && leftSiderState.isVisible" @mousedown="handleResize('leftSider', $event)" :style="{ left: `${leftSiderState.size - 1}px` }"></div>
      <div class="resizer vertical" v-if="sideBarComponents[1] && rightSiderState.isVisible" @mousedown="handleResize('rightSider', $event)" :style="{ right: `${rightSiderState.size - 1}px` }"></div>
      
      <div v-if="sideBarComponents[0]" class="unified-trigger vertical left" :style="{ left: leftSiderState.isVisible ? `${leftSiderState.size}px` : '0' }">
        <label v-if="leftSiderState.isVisible" class="control-item">
          <span>显示</span>
          <Switch v-model="leftSiderState.isVisible" size="small" />
        </label>
        <button v-else class="restore-trigger" @click="leftSiderState.isVisible = true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
        </button>
      </div>
      <div v-if="sideBarComponents[1]" class="unified-trigger vertical right" :style="{ right: rightSiderState.isVisible ? `${rightSiderState.size}px` : '0' }">
        <label v-if="rightSiderState.isVisible" class="control-item">
          <span>显示</span>
          <Switch v-model="rightSiderState.isVisible" size="small" />
        </label>
        <button v-else class="restore-trigger" @click="rightSiderState.isVisible = true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <div class="resizer horizontal" v-if="footerComponent && footerState.isVisible" @mousedown="handleResize('footer', $event)"></div>
    <component
      v-if="footerComponent"
      :is="footerComponent"
      :style="{ 
        height: `${footerState.isVisible ? footerState.size : 0}px`,
        position: footerState.isFixed ? 'static' : 'relative'
      }"
    />

    <!-- Header & Footer Triggers -->
    <div v-if="headerComponent" class="unified-trigger horizontal top" :style="{ top: headerState.isVisible && headerState.isFixed ? `${headerState.size}px` : '0' }">
      <div class="control-group">
        <label v-if="headerState.isVisible" class="control-item">
          <span>显示</span>
          <Switch v-model="headerState.isVisible" size="small" />
        </label>
        <label v-if="headerState.isVisible" class="control-item">
          <span>固定</span>
          <Switch v-model="headerState.isFixed" size="small" />
        </label>
        <button v-else class="restore-trigger" @click="headerState.isVisible = true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 16l-6-6 1.41-1.41L12 13.17l4.59-4.58L18 10z"/></svg>
        </button>
      </div>
    </div>
    <div v-if="footerComponent" class="unified-trigger horizontal bottom" :style="{ bottom: footerState.isVisible && footerState.isFixed ? `${footerState.size}px` : '0' }">
      <div class="control-group">
        <label v-if="footerState.isVisible" class="control-item">
          <span>显示</span>
          <Switch v-model="footerState.isVisible" size="small" />
        </label>
        <label v-if="footerState.isVisible" class="control-item">
          <span>固定</span>
          <Switch v-model="footerState.isFixed" size="small" />
        </label>
        <button v-else class="restore-trigger" @click="footerState.isVisible = true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>
        </button>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { computed, useSlots, type VNode, ref, type CSSProperties, reactive } from 'vue';
import Switch from '@/components/Switch/index.vue';

defineOptions({ name: 'Layout' });

// --- State Management ---
interface LayoutPartState { 
  isVisible: boolean; 
  isFixed: boolean;  // 新增：是否固定
  size: number; 
}

const headerState = reactive<LayoutPartState>({ 
  isVisible: true, 
  isFixed: true,  // 默认固定
  size: 64 
});

const footerState = reactive<LayoutPartState>({ 
  isVisible: true, 
  isFixed: true,  // 默认固定
  size: 64 
});

const leftSiderState = reactive<LayoutPartState>({ 
  isVisible: true, 
  isFixed: true,
  size: 200 
});

const rightSiderState = reactive<LayoutPartState>({ 
  isVisible: true, 
  isFixed: true,
  size: 200 
});

const stateMap = { 
  header: headerState, 
  footer: footerState, 
  leftSider: leftSiderState, 
  rightSider: rightSiderState 
};

// 计算是否有固定的 Header 或 Footer
const hasFixedParts = computed(() => {
  const hasFixedHeader = headerComponent.value && headerState.isVisible && headerState.isFixed;
  const hasFixedFooter = footerComponent.value && footerState.isVisible && footerState.isFixed;
  return hasFixedHeader || hasFixedFooter;
});

// --- Style & Resize Logic ---
const MIN_SIDER_WIDTH = 40;
const MIN_HEADER_FOOTER_HEIGHT = 40;

const siderStyle = (width: number): CSSProperties => ({ 
  width: `${width}px`, 
  flexBasis: `${width}px`, 
  flexShrink: 0, 
  overflow: 'hidden' 
});

const handleResize = (target: keyof typeof stateMap, event: MouseEvent) => {
  event.preventDefault();
  const startX = event.clientX, startY = event.clientY;
  const state = stateMap[target], initialSize = state.size;
  
  const onMouseMove = (moveEvent: MouseEvent) => {
    const deltaX = moveEvent.clientX - startX, deltaY = moveEvent.clientY - startY;
    let newSize = initialSize;
    
    if (target === 'header') newSize += deltaY;
    else if (target === 'footer') newSize -= deltaY;
    else if (target === 'leftSider') newSize += deltaX;
    else if (target === 'rightSider') newSize -= deltaX;
    
    const minSize = (target === 'header' || target === 'footer') ? MIN_HEADER_FOOTER_HEIGHT : MIN_SIDER_WIDTH;
    state.size = Math.max(minSize, newSize);
  };
  
  const onMouseUp = () => { 
    window.removeEventListener('mousemove', onMouseMove); 
    window.removeEventListener('mouseup', onMouseUp); 
    document.body.style.cursor = ''; 
    document.body.style.userSelect = ''; 
  };
  
  window.addEventListener('mousemove', onMouseMove); 
  window.addEventListener('mouseup', onMouseUp);
  document.body.style.userSelect = 'none';
  document.body.style.cursor = (target === 'header' || target === 'footer') ? 'row-resize' : 'col-resize';
};

// --- Slot Discovery ---
const slots = useSlots();
const getComponentFromVNodes = (nodes: VNode[], name: string) => 
  nodes.find(node => (node.type as any)?.name === name || (node.type as any)?.__name === name);

const getComponentsFromVNodes = (nodes: VNode[], name: string) => 
  nodes.filter(node => (node.type as any)?.name === name || (node.type as any)?.__name === name);

const defaultSlot = slots.default ? slots.default() : [];
const headerComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Header'));
const footerComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Footer'));
const sideBarComponents = computed(() => getComponentsFromVNodes(defaultSlot, 'SideBar'));
const contentComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Content'));
</script>

<style lang="less" scoped>
.ui-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 80vh; // 改为 min-height 而不是 height
  background: var(--color-background);
  overflow: hidden;
  position: relative;
  
  // 当没有固定 Header/Footer 时，整个容器可滚动
  &:not(.fixed-layout) {
    overflow-y: auto; // 整个布局容器滚动
  }
}

.ui-layout-body {
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  
  // 当有固定 Header/Footer 时，内容区域可滚动
  .ui-layout.fixed-layout & {
    flex: 1 1 auto;
    overflow-y: auto; // 只有内容区域滚动
    overflow-x: hidden;
  }
  &.no-overflow {
    overflow: auto;
  }
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

  &:hover {
    background: var(--color-background);
  }

  &.horizontal {
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 12px;
    display: flex;
    
    &.top {
      border-top: none;
      border-radius: 0 0 4px 4px;
    }
    
    &.bottom {
      border-bottom: none;
      border-radius: 4px 4px 0 0;
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
  }
}

.control-group {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

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
</style>