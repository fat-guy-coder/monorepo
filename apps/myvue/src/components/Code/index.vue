<template>
    <div class="code-block-container">
      <!-- 代码工具栏 -->
      <div class="code-toolbar" v-if="!hiddenToolbar">
        <span class="language-tag">{{ formattedLanguage }}</span>
        <span v-if="title" class="title">{{ title }}</span>
        <button class="copy-button" @click="handleCopy" :disabled="isCopying" :aria-label="`复制${language}代码`">
          <span class="copy-icon" :class="{ copying: isCopying }">📋</span>
          <span class="copy-status">{{ copyStatusText }}</span>
        </button>
      </div>
  
      <!-- 代码显示区域 -->
      <pre ref="preElement" class="code-block"
        :class="[`language-${language}`, 'language-bash']"><code class="code-content">{{ code }}</code></pre>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch, nextTick } from 'vue'
  import { highlightElement } from 'prismjs'
  import 'prismjs/themes/prism-solarizedlight.min.css'
  import 'prismjs/plugins/toolbar/prism-toolbar.css'
  
  // 加载常用语言和插件
  import 'prismjs/components/prism-javascript'
  import 'prismjs/components/prism-typescript'
  import 'prismjs/components/prism-css'
  import 'prismjs/components/prism-json'
  
  // import 'prismjs/components/prism-markup-templating'
  // import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
  
  type Language = 'js' | 'ts' | 'html' | 'json' | 'css'
  
  const props = withDefaults(
    defineProps<{
      title?: string
      code: string
      language?: Language
      lineNumbers?: boolean
      hiddenToolbar?: boolean
    }>(),
    {
      language: 'js',
      lineNumbers: true,
      hiddenToolbar: false,
    },
  )
  
  const preElement = ref<HTMLElement | null>(null)
  const isCopying = ref(false)
  const copyStatusText = ref('复制')
  
  // 格式化显示的语言名称
  const formattedLanguage = computed(() => {
    const langMap: Record<Language, string> = {
      js: 'JavaScript',
      ts: 'TypeScript',
      html: 'HTML',
      json: 'JSON',
      css: 'Css'
    }
    return langMap[props.language] || props.language.toUpperCase()
  })
  
  // 高亮代码
  const highlightCode = () => {
    if (preElement.value) {
      highlightElement(preElement.value.querySelector('code')!)
    }
  }
  
  // 复制代码处理
  const handleCopy = async () => {
    try {
      isCopying.value = true
      await navigator.clipboard.writeText(props.code)
      copyStatusText.value = '已复制!'
      setTimeout(() => {
        copyStatusText.value = '复制'
        isCopying.value = false
      }, 2000)
    } catch (err) {
      copyStatusText.value = '复制失败'
      setTimeout(() => {
        copyStatusText.value = '复制'
        isCopying.value = false
      }, 1500)
    }
  }
  
  // 生命周期和观察
  onMounted(() => {
    nextTick(highlightCode)
  })
  
  watch(
    () => [props.code, props.language],
    () => nextTick(highlightCode),
  )
  </script>
  
  <style scoped>
  .title {
    color: #fff;
  }
  
  .code-block-container {
    position: relative;
    margin: 0rem 0;
    border-radius: 8px;
    background: #2d2d2d;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .code-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1.2rem;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
  
    h2 {
      color: #fff;
    }
  }
  
  .language-tag {
    color: #a0aec0;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .copy-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 4px;
    color: #cbd5e0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .copy-button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
  }
  
  .copy-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .copy-icon {
    transition: transform 0.2s ease;
  }
  
  .copy-icon.copying {
    animation: pulse 1s infinite;
  }
  
  .copy-status {
    font-size: 0.85rem;
  }
  
  .code-block {
    margin: 0;
    padding: 1.5rem !important;
    overflow: inherit;
  }
  
  .code-content {
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  /* 滚动条样式 */
  /* .code-block::-webkit-scrollbar {
    height: 6px;
  }
  
  .code-block::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .code-block::-webkit-scrollbar-thumb {
    background: #4a5568;
    border-radius: 3px;
  }
  
  .code-block::-webkit-scrollbar-thumb:hover {
    background: #718096;
  } */
  
  /* 行号样式 */
  :deep(.line-numbers .line-numbers-rows) {
    border-right: 1px solid #3f3f3f;
    padding: 1.5rem 0;
  }
  
  :deep(.line-numbers-rows > span) {
    color: #666 !important;
    pointer-events: none;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
  
    50% {
      transform: scale(1.2);
    }
  
    100% {
      transform: scale(1);
    }
  }
  </style>
  