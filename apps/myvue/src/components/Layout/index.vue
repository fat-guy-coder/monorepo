<template>
  <section class="ui-layout" :class="layoutClasses" :style="componentStyle">
    <!-- 模式: 侧边栏-顶部-内容 (stc) -->
    <template v-if="mode === 'stc'">
      <SideBar v-if="$slots.sider" v-bind="siderProps" v-model:collapsed="internalCollapsed">
        <slot name="sider"></slot>
      </SideBar>
      <section class="ui-layout ui-layout--vertical" :style="contentWrapperStyle">
        <Header v-if="$slots.header" v-bind="headerProps"><slot name="header"></slot></Header>
        <Content><slot name="content"></slot></Content>
        <Footer v-if="$slots.footer" v-bind="footerProps"><slot name="footer"></slot></Footer>
      </section>
    </template>

    <!-- 模式: 顶部-侧边栏-内容 (tsc) -->
    <template v-else-if="mode === 'tsc'">
      <Header v-if="$slots.header" v-bind="headerProps"><slot name="header"></slot></Header>
      <section class="ui-layout ui-layout--horizontal" :style="contentWrapperStyle">
        <SideBar v-if="$slots.sider" v-bind="siderProps" v-model:collapsed="internalCollapsed">
          <slot name="sider"></slot>
        </SideBar>
        <Content><slot name="content"></slot></Content>
      </section>
    </template>

    <!-- 默认模式: 顶部-内容-底部 (tcf) -->
    <template v-else>
       <section class="ui-layout ui-layout--vertical" :style="contentWrapperStyle">
        <Header v-if="$slots.header" v-bind="headerProps"><slot name="header"></slot></Header>
        <Content><slot name="content"></slot></Content>
        <Footer v-if="$slots.footer" v-bind="footerProps"><slot name="footer"></slot></Footer>
      </section>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch, useSlots, type CSSProperties } from 'vue';
import Header from './Header.vue';
import SideBar from './SideBar.vue';
import Content from './Content.vue';
import Footer from './Footer.vue';

type LayoutMode = 'tcf' | 'tsc' | 'stc';

const {
  mode = 'tcf',
  collapsed = false,
  siderProps = {},
  headerProps = {},
  footerProps = {},
  css = {},
} = defineProps<{
  mode?: LayoutMode;
  collapsed?: boolean;
  siderProps?: InstanceType<typeof SideBar>['$props'];
  headerProps?: InstanceType<typeof Header>['$props'];
  footerProps?: InstanceType<typeof Footer>['$props'];
  css?: Record<string, string>;
}>();

const emit = defineEmits<{ (e: 'update:collapsed', collapsed: boolean): void; }>();

const slots = useSlots();
const internalCollapsed = ref(collapsed);

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

// This computed property calculates the necessary padding to avoid content being overlapped by fixed elements.
const contentWrapperStyle = computed(() => {
  const style: CSSProperties = {};
  
  if (headerProps.fixed) {
    // Default header height is 4rem
    style.paddingTop = '4rem'; 
  }

  if (footerProps.fixed) {
    // Assuming a default footer height, as it's content-based. This might need adjustment.
    style.paddingBottom = '4rem';
  }

  if (siderProps.fixed) {
    const siderWidth = internalCollapsed.value 
      ? (siderProps.collapsedWidth || '5rem') 
      : (siderProps.width || '12.5rem');
    const widthValue = typeof siderWidth === 'number' ? `${siderWidth}px` : siderWidth;

    if (siderProps.align === 'right') {
      style.paddingRight = widthValue;
    } else {
      style.paddingLeft = widthValue;
    }
  }

  return style;
});

watch(() => collapsed, (newVal) => {
  internalCollapsed.value = newVal;
});

watch(internalCollapsed, (newVal) => {
  if (newVal !== collapsed) {
    emit('update:collapsed', newVal);
  }
});

const hasSider = computed(() => {
  return (mode === 'tsc' || mode === 'stc') && slots.sider;
});

const layoutClasses = computed(() => [
  `ui-layout--mode-${mode}`,
  {
    'ui-layout--has-sider': hasSider.value,
    'ui-layout--vertical': !hasSider.value || mode === 'stc',
    'ui-layout--horizontal': hasSider.value && mode !== 'stc',
  },
]);
</script>

<style lang="less" scoped>
.ui-layout {
  --layout-bg: var(--_layout-bg, var(--color-background));

  display: flex;
  width: 100%;
  min-height: 100vh;
  background: var(--layout-bg);
  transition: background-color 0.3s ease;

  &.ui-layout--vertical {
    flex-direction: column;
  }

  &.ui-layout--horizontal {
    flex-direction: row;
  }
}
</style>