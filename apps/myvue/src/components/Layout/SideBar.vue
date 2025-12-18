<template>
  <aside class="ui-layout-sider" :class="['align-' + align]">
    <slot></slot>
  </aside>
</template>

<script setup lang="ts">
defineOptions({ name: 'SideBar' });

defineProps<{
  align?: 'left' | 'right';
}>();
</script>

<style lang="less" scoped>
.ui-layout-sider {
  transition: all 0.3s ease;
  background-color: transparent;
  height: auto;
  flex-shrink: 0; // Prevent shrinking
  border: 1px solid var(--color-border);
  &[style*="width: 0px"] {
    padding-left: 0;
    padding-right: 0;
  }

  &.align-left {
    border-left: none;
  }

  &.align-right {
    border-right: none;
  }
}
</style>