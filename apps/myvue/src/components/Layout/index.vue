<template>
  <section :is="hasOuterSider ? 'section' : 'div'" class="ui-layout" :class="layoutClasses">
    <template v-if="headerComponent">
      <component :is="headerComponent" />
    </template>
    
    <section class="ui-layout ui-layout--horizontal">
      <template v-if="sideBarComponents[0]">
        <component :is="sideBarComponents[0]" />
      </template>
      
      <div class="ui-layout ui-layout--vertical">
        <template v-if="contentComponent">
          <component :is="contentComponent" />
        </template>
        <template v-else-if="nestedLayoutComponent">
          <component :is="nestedLayoutComponent" />
        </template>
      </div>
      
      <template v-if="sideBarComponents[1]">
        <component :is="sideBarComponents[1]" :align="'right'" />
      </template>
    </section>
    
    <template v-if="footerComponent">
      <component :is="footerComponent" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots, type VNode } from 'vue';

defineOptions({
  name: 'Layout',
});

const slots = useSlots();

const getComponentFromVNodes = (nodes: VNode[], name: string) => {
  return nodes.find(node => (node.type as any)?.name === name || (node.type as any)?.__name === name);
};

const getComponentsFromVNodes = (nodes: VNode[], name: string) => {
  return nodes.filter(node => (node.type as any)?.name === name || (node.type as any)?.__name === name);
};

const defaultSlot = slots.default ? slots.default() : [];

const headerComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Header'));
const footerComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Footer'));
const sideBarComponents = computed(() => getComponentsFromVNodes(defaultSlot, 'SideBar'));
const contentComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Content'));
const nestedLayoutComponent = computed(() => getComponentFromVNodes(defaultSlot, 'Layout'));

const hasOuterSider = computed(() => sideBarComponents.value.length > 0);

const layoutClasses = computed(() => [
  {
    'ui-layout--has-sider': hasOuterSider.value,
    'ui-layout--vertical': !hasOuterSider.value,
    'ui-layout--horizontal': hasOuterSider.value,
  },
]);

</script>

<style lang="less" scoped>
.ui-layout {
  display: flex;
  flex: 1;
  width: 100%;
  background: var(--color-background);

  &.ui-layout--vertical {
    flex-direction: column;
    min-height: 100vh;
  }

  &.ui-layout--horizontal {
    flex-direction: row;
  }
}
</style>
