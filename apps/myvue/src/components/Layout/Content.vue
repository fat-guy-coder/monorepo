<template>
  <main class="ui-layout-content" :style="componentStyle">
    <slot>content</slot>
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
  --content-bg: var(--color-background); // PaleGreen
  text-align: center;
  background: var(--content-bg);
  width: 100%;
}
</style>