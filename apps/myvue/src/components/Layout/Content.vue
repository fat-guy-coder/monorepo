<template>
  <main class="ui-layout-content" :style="componentStyle">
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
defineOptions({ name: 'Content' });
const { css = {} } = defineProps<{
  css?: Record<string, string>;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});
</script>

<style lang="less" scoped>
.ui-layout-content {
  --content-bg: #98fb98; // PaleGreen
  --content-padding: var(--padding-3xl);

  padding: var(--content-padding);
  background: var(--content-bg);
  width: 100%;
}
</style>