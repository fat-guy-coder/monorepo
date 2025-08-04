<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">🔢</span>
          数字分隔符
        </h1>
        <p class="page-subtitle">允许在数字之间创建可视化分隔符，提高数字的可读性</p>
      </header>

      <!-- 主要内容 -->
      <div class="card">
        <div class="card-body">
          <div class="code-block">
            <pre><code>const largeNumber = 1_000_000_000;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import '@/assets/css/unified-styles.css';
</script>
<style scoped>
/* 组件特定样式 */
.code-block {
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: var(--spacing-lg);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-family: var(--font-mono);
  overflow-x: auto;
}

.code-block code {
  color: var(--text-primary);
}
</style>
