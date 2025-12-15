<template>
  <header class="ui-layout-header" :class="{ 'is-fixed': fixed }" :style="componentStyle">
    <slot></slot>
  </header>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

defineOptions({
  name: 'Header',
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
.ui-layout-header {
  --header-height: var(--_header-height, 4rem); // 64px
  --header-padding: var(--_header-padding, 0 3.125rem); // 0 50px
  --header-bg: var(--color-background-soft);
  --header-border-color: var(--color-border);
  --header-z-index: var(--_header-z-index, 1000);
  

  flex-shrink: 0;
  height: var(--header-height);
  padding: var(--header-padding);
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border-color);
  transition: all 0.3s ease;
  text-align: center;

  &.is-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--header-z-index);
  }
}
</style>