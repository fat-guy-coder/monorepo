<!-- BorderExample.vue -->
<template>
  <div class="border-example">
    <div class="example-preview"></div>
    <pre class="code-block"><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  code: string
  image?: string
}>()
</script>

<style lang="less">
.border-example {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

  .example-preview {
    height: 150px;
    background: #f8f9fa;
    border: 30px solid;
    border-image: url('../assets/border-demo.png') 30 round;
  }

  .code-block {
    padding: 1rem;
    margin: 0;
    border-radius: 0 0 12px 12px;
  }
}
</style>
