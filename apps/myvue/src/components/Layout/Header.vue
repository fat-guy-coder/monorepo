<template>
  <header class="ui-layout-header">
    <slot></slot>
  </header>
</template>

<script setup lang="ts">
defineOptions({ name: 'Header' });
</script>

<style lang="less" scoped>
.ui-layout-header {
  --header-bg: var(--color-background-soft);
  --header-border-color: var(--color-border);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border-color);
  transition: all 0.3s ease;
  overflow: hidden;
  flex-shrink: 0; // Prevent shrinking

  &[style*="height: 0px"] {
    padding-top: 0;
    padding-bottom: 0;
    border-bottom-width: 0;
  }
}
</style>