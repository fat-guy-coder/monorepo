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
  --sider-bg: #f08080; // LightCoral

  background: var(--sider-bg);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow: hidden;
  flex-shrink: 0; // Prevent shrinking

  &[style*="width: 0px"] {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>