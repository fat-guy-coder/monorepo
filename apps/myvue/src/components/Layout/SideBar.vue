<template>
  <aside class="ui-layout-sider" :class="['align-' + align, { 'is-fixed': fixed }]" :style="componentStyle">
    <div class="ui-layout-sider__children">
      <slot></slot>
    </div>
    <div v-if="collapsible" class="ui-layout-sider__trigger" @click="toggleCollapse">
      <slot name="trigger">
        <span class="trigger-icon">{{ internalCollapsed ? '▶' : '◀' }}</span>
      </slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, type CSSProperties } from 'vue';

defineOptions({
  name: 'SideBar',
});

// Breakpoint map based on common screen sizes
const breakpointMap: Record<string, string> = {
  xs: '(max-width: 575px)',
  sm: '(max-width: 767px)',
  md: '(max-width: 991px)',
  lg: '(max-width: 1199px)',
  xl: '(max-width: 1599px)',
};

const {
  collapsed = false,
  collapsible = false,
  breakpoint,
  width = '12.5rem', // 200px
  collapsedWidth = '5rem', // 80px
  fixed = false,
  align = 'left',
  css = {},
} = defineProps<{
  collapsed?: boolean;
  collapsible?: boolean;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: number | string;
  collapsedWidth?: number | string;
  fixed?: boolean;
  align?: 'left' | 'right';
  css?: Record<string, string>;
}>();

const emit = defineEmits<{
  (e: 'update:collapsed', collapsed: boolean): void;
  (e: 'collapse', collapsed: boolean): void;
}>();

const internalCollapsed = ref(collapsed);
const isBelowBreakpoint = ref(false);

let mediaQueryList: MediaQueryList | null = null;

const componentStyle = computed<CSSProperties>(() => {
  const currentWidth = internalCollapsed.value ? collapsedWidth : width;
  const widthValue = typeof currentWidth === 'number' ? `${currentWidth}px` : currentWidth;
  
  return {
    flex: `0 0 ${widthValue}`,
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue,
    ...css,
  };
});

const toggleCollapse = () => {
  const newCollapsedState = !internalCollapsed.value;
  internalCollapsed.value = newCollapsedState;
  emit('update:collapsed', newCollapsedState);
  emit('collapse', newCollapsedState);
};

const handleMediaQuery = (e: MediaQueryListEvent) => {
  isBelowBreakpoint.value = e.matches;
  if (e.matches && !internalCollapsed.value) {
    internalCollapsed.value = true;
    emit('update:collapsed', true);
    emit('collapse', true);
  }
};

watch(() => collapsed, (newVal) => {
  internalCollapsed.value = newVal;
});

onMounted(() => {
  if (breakpoint) {
    const query = breakpointMap[breakpoint];
    if (query) {
      mediaQueryList = window.matchMedia(query);
      isBelowBreakpoint.value = mediaQueryList.matches;
      if (isBelowBreakpoint.value && !internalCollapsed.value) {
        internalCollapsed.value = true;
        emit('update:collapsed', true);
        emit('collapse', true);
      }
      mediaQueryList.addEventListener('change', handleMediaQuery);
    }
  }
});

onBeforeUnmount(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', handleMediaQuery);
  }
});

</script>

<style lang="less" scoped>
.ui-layout-sider {
  --sider-bg: var(--color-background-soft);
  --sider-border-color: var(--color-border);
  --sider-trigger-bg: var(--color-background-mute);
  --sider-trigger-hover-bg: var(--color-background);
  --sider-trigger-color: var(--color-text-secondary);
  --sider-trigger-height: var(--_sider-trigger-height, 3rem); // 48px
  --sider-z-index: var(--_sider-z-index, 1010);

  position: relative;
  background: var(--sider-bg);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  &.align-left {
    border-right: 1px solid var(--sider-border-color);
  }

  &.align-right {
    order: 1; // Ensure it moves to the right in a flex container
    border-left: 1px solid var(--sider-border-color);
  }

  &.is-fixed {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: var(--sider-z-index);

    &.align-left {
      left: 0;
    }
    &.align-right {
      right: 0;
    }
  }
}

.ui-layout-sider__children {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.ui-layout-sider__trigger {
  flex-shrink: 0;
  height: var(--sider-trigger-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--sider-trigger-bg);
  color: var(--sider-trigger-color);
  cursor: pointer;
  transition: all 0.2s ease;

  &.align-left {
    border-top: 1px solid var(--sider-border-color);
  }
  &.align-right {
    border-top: 1px solid var(--sider-border-color);
  }
}

.trigger-icon {
  font-size: 0.75rem;
}
</style>