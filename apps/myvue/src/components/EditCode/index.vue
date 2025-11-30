<template>
  <div class="edit-code-container" :class="`layout-${layout}`">
    <div class="editors-wrapper" :class="`editor-layout-${editorLayout}`">
      <div v-for="(block, index) in localCodes" :key="block.id" class="editor-instance">
        <div class="editor-toolbar">
          <span>{{ block.title || block.language.toUpperCase() }}</span>
        </div>
        <codemirror
          v-model="block.code"
          :style="{ height: '100%' }"
          :autofocus="index === 0"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="getExtensions(block.language)"
        />
      </div>
    </div>
    <div class="preview-wrapper">
      <Preview :html="previewHtml" :css="previewCss" :js="previewJs" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { transform } from 'sucrase';

import Preview from './Preview.vue';
import { editCodeProps, CodeBlock } from './index.ts';

const props = defineProps(editCodeProps);

// 使用 ref 来处理 props，以便在组件内部修改
const localCodes = ref<CodeBlock[]>(props.codes.map(i => ({ ...i, code: i.code || '' })));

// 监听外部 props 的变化
watch(
  () => props.codes,
  (newCodes) => {
    localCodes.value = JSON.parse(JSON.stringify(newCodes));
  },
  { deep: true, immediate: true }
);

// 根据语言获取 CodeMirror 扩展
const getExtensions = (language) => {
  const langExts = {
    typescript: javascript({ typescript: true }),
    javascript: javascript(),
    html: html(),
    css: css(),
  };
  return [langExts[language] || javascript(), oneDark];
};

// 从代码块数组中聚合出 HTML, CSS, JS
const aggregatedCode = computed(() => {
  return localCodes.value.reduce((acc, block) => {
    if (block.language === 'html') acc.html += block.code;
    if (block.language === 'css') acc.css += block.code;
    if (block.language === 'javascript' || block.language === 'typescript') {
      acc.ts += block.code;
    }
    return acc;
  }, { html: '', css: '', ts: '' });
});

// 准备传递给预览组件的 props
const previewHtml = computed(() => aggregatedCode.value.html);
const previewCss = computed(() => aggregatedCode.value.css);
const previewJs = computed(() => {
  try {
    return transform(aggregatedCode.value.ts, { transforms: ['typescript'] }).code;
  } catch (e) {
    // 如果编译失败，在控制台打印错误，并返回空字符串
    console.error('TypeScript compilation failed:', e);
    return '';
  }
});

</script>

<style lang="less" scoped>
@import '../../assets/css/theme.less';

.edit-code-container {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: var(--element-border-radius);
  overflow: hidden;
  background-color: var(--color-bg-container);
  height: 600px; // 默认高度

  &.layout-horizontal {
    flex-direction: row;
  }
  &.layout-vertical {
    flex-direction: column;
  }
}

.editors-wrapper, .preview-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.editors-wrapper {
  border-right: 1px solid var(--color-border);
  &.editor-layout-row {
    flex-direction: row;
  }
  &.editor-layout-column {
    flex-direction: column;
  }
}

.layout-vertical .editors-wrapper {
  border-right: none;
  border-bottom: 1px solid var(--color-border);
}

.editor-instance {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }

  .editor-layout-row & {
    border-right: 1px solid var(--color-border);
    border-bottom: none;
    &:last-child {
      border-right: none;
    }
  }
}

.editor-toolbar {
  flex-shrink: 0;
  padding: var(--padding-sm) var(--padding-md);
  background-color: var(--color-bg-layout);
  color: var(--color-text-soft);
  font-size: 0.9em;
  border-bottom: 1px solid var(--color-border);
}

.preview-wrapper {
  background-color: #fff;
}

:deep(.cm-editor) {
  height: 100%;
  font-family: 'Fira Code', monospace;
}
</style>