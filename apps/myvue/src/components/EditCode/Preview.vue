<template>
  <div ref="host" class="preview-host"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  html: { type: String, default: '' },
  css: { type: String, default: '' },
  js: { type: String, default: '' },
});

const host = ref(null);

const updatePreview = () => {
  if (!host.value) return;

  let shadowRoot = host.value.shadowRoot;
  if (!shadowRoot) {
    shadowRoot = host.value.attachShadow({ mode: 'open' });
  }

  shadowRoot.innerHTML = `
    <style>
      ${props.css}
    </style>
    ${props.html}
    <script>
      try {
        ${props.js}
      } catch (e) {
        console.error(e);
      }
    </script>
  `;
};

// 监听代码变化并更新预览
watch(
  () => [props.html, props.css, props.js],
  updatePreview,
  { deep: true }
);

// 组件挂载后首次更新
onMounted(updatePreview);

</script>

<style scoped>
.preview-host {
  width: 100%;
  height: 100%;
  background-color: #fff; /* 预览区域默认背景色 */
}
</style>
