<template>
  <footer class="ui-layout-footer" :class="{ 'is-fixed': fixed }" :style="componentStyle">
    <slot></slot>
  </footer>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

defineOptions({
  name: 'Footer',
});

const { css = {}, fixed = false } = defineProps<{
  css?: Record<string, string>;
  fixed?: boolean;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});
</script>

<style lang="less" scoped>
.ui-layout-footer {
  --footer-padding: var(--_footer-padding, 1.5rem 3.125rem); // 24px 50px
  --footer-bg: var(--_footer-bg, var(--color-background-soft));
  --footer-border-color: var(--_footer-border-color, var(--color-border));
  --footer-z-index: var(--_footer-z-index, 1000);

  flex-shrink: 0;
  padding: var(--footer-padding);
  background: var(--footer-bg);
  border-top: 1px solid var(--footer-border-color);
  text-align: center;
  transition: all 0.3s ease;

  &.is-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--footer-z-index);
  }
}
</style>