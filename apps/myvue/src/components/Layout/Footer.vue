<template>
  <footer class="ui-layout-footer">
    <slot></slot>
  </footer>
</template>

<script setup lang="ts">
defineOptions({ name: 'Footer' });
</script>

<style lang="less" scoped>
.ui-layout-footer {
  --footer-bg: var(--color-background-soft);
  --footer-border-color: var(--color-border);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--footer-bg);
  border-top: 1px solid var(--footer-border-color);
  transition: all 0.3s ease;
  overflow: hidden;
  flex-shrink: 0; // Prevent shrinking

  &[style*="height: 0px"] {
    padding-top: 0;
    padding-bottom: 0;
    border-top-width: 0;
  }
}
</style>