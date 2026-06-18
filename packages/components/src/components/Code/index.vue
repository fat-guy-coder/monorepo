<template>
    <div class="code-block-container" :style="componentStyle">
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
  import { ref, computed, onMounted, watch, nextTick, type CSSProperties } from 'vue'
  import { highlightElement } from 'prismjs'
  import 'prismjs/themes/prism-solarizedlight.min.css'
  import 'prismjs/plugins/toolbar/prism-toolbar.css'

  defineOptions({
    name: 'CodeBlock',
  })

  // 加载常用语言和插件
  import 'prismjs/components/prism-javascript'
  import 'prismjs/components/prism-typescript'
  import 'prismjs/components/prism-css'
  import 'prismjs/components/prism-json'
	import 'prismjs/components/prism-go'
	import 'prismjs/components/prism-bash'

  type Language = 'js' | 'ts' | 'html' | 'json' | 'css' | 'go' | 'bash' | 'shell' | 'text' | 'gdscript'

  const {
    title,
    code,
    language = 'js',
    lineNumbers = true, // lineNumbers 暂未实现，保留 prop
    hiddenToolbar = false,
    css = {},
  } = defineProps<{
    title?: string
    code: string
    language?: Language
    lineNumbers?: boolean
    hiddenToolbar?: boolean
    css?: Record<string, string>
  }>() 

  const preElement = ref<HTMLElement | null>(null)
  const isCopying = ref(false)
  const copyStatusText = ref('复制')

  const componentStyle = computed(() => {
    return { ...css } as CSSProperties;
  });

  // 格式化显示的语言名称
  const formattedLanguage = computed(() => {
    const langMap: Record<Language, string> = {
      js: 'JavaScript',
      ts: 'TypeScript',
      html: 'HTML',
      json: 'JSON',
      css: 'CSS',
      go: 'Go',
      bash: 'Bash',
      shell: 'Shell',
      text: 'Text',
      gdscript: 'GDScript'
    }
    return langMap[language] || language.toUpperCase()
  })

  // 高亮代码
  const highlightCode = () => {
    if (preElement.value) {
      const codeElement = preElement.value.querySelector('code');
      if (codeElement) {
        highlightElement(codeElement);
      }
    }
  }

  // 复制代码处理
  const handleCopy = async () => {
    try {
      isCopying.value = true
      await navigator.clipboard.writeText(code)
      copyStatusText.value = '已复制!'
      setTimeout(() => {
        copyStatusText.value = '复制'
        isCopying.value = false
      }, 2000)
    } catch {
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
    () => [code, language],
    () => nextTick(highlightCode),
  )
  </script>

  <style lang="less" scoped>
  .title {
    color: var(--color-text);
  }

  .code-block-container {
    --code-container-bg: var(--color-background);
    --code-container-border-color: var(--color-border);
    --code-container-shadow: var(--box-shadow-sm);
    --code-container-radius: var(--border-radius-md);

    --code-toolbar-bg: var(--color-background-soft);
    --code-toolbar-border-color: var(--color-border);
    --code-toolbar-title-color: var(--color-text);
    
    --code-lang-tag-color: var(--color-text-secondary);
    
    --code-copy-btn-bg: var(--color-background-soft);
    --code-copy-btn-border-color: var(--color-border);
    --code-copy-btn-color: var(--color-text);
    --code-copy-btn-hover-bg: var(--color-background-mute);
    --code-copy-btn-hover-border-color: var(--color-border-hover);
    --code-copy-status-color: var(--color-text-secondary);
    
    --code-block-bg: var(--color-background-mute);
    --code-block-color: var(--color-text);
    --code-content-color: var(--color-text);

    position: relative;
    margin: 0;
    border-radius: var(--code-container-radius);
    background: var(--code-container-bg);
    border: 1px solid var(--code-container-border-color);
    box-shadow: var(--code-container-shadow);
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
    overflow: hidden; // 确保圆角生效
  }

  .code-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--padding-md) var(--padding-lg);
    background: var(--code-toolbar-bg);
    border-bottom: 1px solid var(--code-toolbar-border-color);
    backdrop-filter: blur(4px);
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease;

    h2 {
      color: var(--color-text);
    }
  }

  .language-tag {
    color: var(--code-lang-tag-color);
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .copy-button {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
    padding: var(--padding-xs) var(--padding-md);
    background: var(--code-copy-btn-bg);
    border: 1px solid var(--code-copy-btn-border-color);
    border-radius: var(--border-radius-sm);
    color: var(--code-copy-btn-color);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: var(--code-copy-btn-hover-bg);
      border-color: var(--code-copy-btn-hover-border-color);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .copy-icon {
    transition: transform 0.2s ease;
  }

  .copy-icon.copying {
    animation: pulse 1s infinite;
  }

  .copy-status {
    font-size: 0.85rem;
    color: var(--code-copy-status-color);
  }

  .code-block {
    margin: 0;
    padding: var(--padding-xl) !important;
    overflow: auto;
    background: var(--code-block-bg);
    color: var(--code-block-color);
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  .code-content {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--code-content-color);
    transition: color 0.3s ease;
  }

  /* Prism.js 语法高亮颜色覆盖 - 使用主题变量 */
  :deep(.token.comment),
  :deep(.token.prolog),
  :deep(.token.doctype),
  :deep(.token.cdata) {
    color: var(--color-text-tertiary);
    font-style: italic;
  }

  :deep(.token.punctuation) {
    color: var(--color-text-secondary);
  }

  :deep(.token.property),
  :deep(.token.tag),
  :deep(.token.boolean),
  :deep(.token.number),
  :deep(.token.constant),
  :deep(.token.symbol),
  :deep(.token.deleted) {
    color: var(--color-error);
  }

  :deep(.token.selector),
  :deep(.token.attr-name),
  :deep(.token.string),
  :deep(.token.char),
  :deep(.token.builtin),
  :deep(.token.inserted) {
    color: var(--color-success);
  }

  :deep(.token.operator),
  :deep(.token.entity),
  :deep(.token.url),
  :deep(.language-css .token.string),
  :deep(.style .token.string) {
    color: var(--color-warning);
  }

  :deep(.token.atrule),
  :deep(.token.attr-value),
  :deep(.token.keyword) {
    color: var(--color-primary);
  }

  :deep(.token.function),
  :deep(.token.class-name) {
    color: var(--color-info);
  }

  :deep(.token.regex),
  :deep(.token.important),
  :deep(.token.variable) {
    color: var(--color-accent);
  }

  /* 滚动条样式 */
  .code-block::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  .code-block::-webkit-scrollbar-track {
    background: var(--color-background-soft);
    border-radius: 3px;
  }

  .code-block::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 3px;
    transition: background 0.3s ease;

    &:hover {
      background: var(--color-border-hover);
    }
  }

  /* 行号样式 */
  :deep(.line-numbers .line-numbers-rows) {
    border-right: 1px solid var(--color-border);
    padding: var(--padding-xl) 0;
    transition: border-color 0.3s ease;
  }

  :deep(.line-numbers-rows > span) {
    color: var(--color-text-tertiary) !important;
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