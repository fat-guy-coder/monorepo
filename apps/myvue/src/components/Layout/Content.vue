<template>
  <main class="ui-layout-content" :style="componentStyle">
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

defineOptions({
  name: 'Content',
});

const { css = {} } = defineProps<{
  css?: Record<string, string>;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});
</script>

<style lang="less" scoped>
.ui-layout-content {
  --content-padding: var(--padding-3xl);

  flex: 1; // Grow to fill available space
  padding: var(--content-padding);
  overflow: auto; // Add scrollbars if content overflows
}
</style>