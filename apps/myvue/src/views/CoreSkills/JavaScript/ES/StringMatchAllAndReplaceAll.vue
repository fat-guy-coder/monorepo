<style scoped></style>
<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">📜</span>
          字符串处理：matchAll() & replaceAll()
        </h1>
        <p class="page-subtitle">ES2020+ 字符串方法详解</p>
      </header>

      <!-- 导航区 -->
      <nav class="guide-nav">
        <div class="nav-links">
          <a v-for="section in sections" :key="section.id" :href="`#${section.id}`"
            @click.prevent="scrollTo(section.id)" class="nav-link">
            {{ section.title }}
          </a>
        </div>
      </nav>

      <!-- 方法对比 -->
      <div id="compare" class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🆚</span>
            新旧方法对比
          </h2>
        </div>
        <div class="method-comparison">
          <div class="comparison-card">
            <div class="method-header">
              <span class="icon">🆕</span>
              <h3>现代方法</h3>
            </div>
            <div class="method-header old">
              <span class="icon">🕰️</span>
              <h3>传统方法</h3>
            </div>
          </div>
          <div class="comparison-grid">
            <div class="pros-cons">
              <h4>matchAll() 优势</h4>
              <ul>
                <li>直接返回迭代器</li>
                <li>完整捕获组信息</li>
                <li>更简洁的语法</li>
              </ul>
            </div>
            <div class="pros-cons old">
              <h4>传统方式缺点</h4>
              <ul>
                <li>需要循环处理</li>
                <li>需要手动维护状态</li>
                <li>代码冗余</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- matchAll详解 -->
      <div id="matchall" class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔍</span>
            matchAll() 基本介绍
          </h2>
        </div>
        <div class="method-demo">
          <div class="code-example">
            <h3>基本用法</h3>
            <pre><code class="language-ts">const logData = `[ERROR] 404 Not Found
[INFO] User logged in
[DEBUG] Connection established`;

// 使用matchAll提取日志级别和信息
const logRegex = /\[(\w+)\] (.+)/g;
const matches = Array.from(logData.matchAll(logRegex));

// 结果：
// [
//   ['[ERROR] 404 Not Found', 'ERROR', '404 Not Found'],
//   ['[INFO] User logged in', 'INFO', 'User logged in'],
//   ['[DEBUG] Connection established', 'DEBUG', 'Connection established']
// ]</code></pre>
          </div>

          <div class="use-case">
            <h3>💡 典型场景</h3>
            <div class="scenario-card">
              <div class="scenario-icon">📝</div>
              <p>解析结构化文本数据</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🛠️</div>
              <p>批量提取复杂格式信息</p>
            </div>
          </div>
        </div>
      </div>

      <!-- replaceAll详解 -->
      <div id="replaceall" class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔄</span>
            replaceAll() 基本指南
          </h2>
        </div>
        <div class="method-demo reverse">
          <div class="use-case">
            <h3>💡 典型场景</h3>
            <div class="scenario-card">
              <div class="scenario-icon">🔒</div>
              <p>敏感词批量替换</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🎨</div>
              <p>统一文本格式化</p>
            </div>
          </div>

          <div class="code-example">
            <h3>高级用法</h3>
            <pre><code class="language-ts">// 使用函数进行动态替换
const text = "Price: $5.99, $10.50, $20.00";
const converted = text.replaceAll(/\$(\d+\.\d{2})/g, (match, p1) => {
  return `¥${(parseFloat(p1) * 6.5).toFixed(2)}`;
});

// 结果："Price: ¥38.94, ¥68.25, ¥130.00"

// 简单字符串替换
const output = "Hello world!".replaceAll("world", "Vue3");
// 结果："Hello Vue3!"</code></pre>
          </div>
        </div>
      </div>

      <!-- 注意事项 -->
      <div id="notice" class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">⚠️</span>
            关键注意事项
          </h2>
        </div>
        <div class="notice-grid">
          <div class="notice-card danger">
            <div class="notice-icon">🚫</div>
            <div>
              <h3>正则标志要求</h3>
              <p>matchAll() 必须使用带 g 标志的正则表达式</p>
              <pre><code class="language-ts">// 会抛出TypeError
'123'.matchAll(/\d/);</code></pre>
            </div>
          </div>

          <div class="notice-card warning">
            <div class="notice-icon">💡</div>
            <div>
              <h3>浏览器兼容性</h3>
              <p>旧版浏览器需要polyfill支持</p>
              <div class="compatibility">
                <span class="chrome">Chrome 73+</span>
                <span class="firefox">Firefox 67+</span>
                <span class="safari">Safari 13.1+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vue3集成示例 -->
      <div id="vue3" class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🖥️</span>
            实战示例
          </h2>
        </div>
        <div class="vue-demo">
          <div class="demo-container">
            <div class="input-group">
              <textarea v-model="inputText" placeholder="输入待处理文本..."></textarea>
              <input v-model="searchPattern" placeholder="搜索模式">
              <input v-model="replacement" placeholder="替换内容">
            </div>
            <div class="output-result">
              <h4>处理结果：</h4>
              <pre>{{ processedText }}</pre>
            </div>
          </div>
          <pre><code class="language-ts">&lt;script setup lang="ts"&gt;
import { ref, computed } from 'vue';

const inputText = ref('');
const searchPattern = ref('');
const replacement = ref('');

const processedText = computed(() => {
  try {
    // 处理字符串替换
    return inputText.value.replaceAll(
      new RegExp(searchPattern.value, 'g'),
      replacement.value
    );
  } catch (e) {
    return '无效的正则表达式';
  }
});
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import '@/assets/css/unified-styles.css';

const sections = ref([
  { id: 'compare', title: '方法对比' },
  { id: 'matchall', title: 'matchAll()' },
  { id: 'replaceall', title: 'replaceAll()' },
  { id: 'notice', title: '注意事项' },
  { id: 'matchallexample', title: '示例' }
]);

const inputText = ref(`[2023-09-20] User 'admin' logged in
[2023-09-20] File uploaded: example.jpg
[2023-09-20] Error: File not found`);
const searchPattern = ref('\\d{4}-\\d{2}-\\d{2}');
const replacement = ref('[DATE]');

const processedText = computed(() => {
  try {
    return inputText.value.replace(
      new RegExp(searchPattern.value, 'g'),
      replacement.value
    );
  } catch (e) {
    return '无效的正则表达式';
  }
});

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
</script>

<style scoped>
/* 组件特定样式 */
.guide-nav {
  background: linear-gradient(135deg, var(--primary-color), var(--success-color));
  color: white;
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.method-comparison {
  background: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.comparison-card {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}

.method-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  background: var(--success-bg);
}

.method-header.old {
  background: var(--bg-secondary);
}

.method-header .icon {
  font-size: 1.5rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.pros-cons {
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
}

.pros-cons.old {
  background: var(--warning-bg);
}

.pros-cons ul {
  list-style: none;
  padding: 0;
}

.pros-cons li {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

.method-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.method-demo.reverse {
  grid-template-columns: 1fr 1.2fr;
}

.code-example {
  background: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.code-example pre {
  margin: 0;
}

.use-case .scenario-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  margin: var(--spacing-md) 0;
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}

.scenario-icon {
  font-size: 1.8rem;
}

.notice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.notice-card {
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  display: flex;
  gap: var(--spacing-md);
}

.notice-card.danger {
  background: var(--error-bg);
  border-left: 4px solid var(--error-color);
}

.notice-card.warning {
  background: var(--warning-bg);
  border-left: 4px solid var(--warning-color);
}

.notice-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.compatibility {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.compatibility span {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
}

.compatibility .chrome {
  background: var(--success-bg);
}

.compatibility .firefox {
  background: var(--warning-bg);
}

.compatibility .safari {
  background: var(--primary-bg);
}

.vue-demo {
  background: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.input-group textarea {
  height: 150px;
  padding: var(--spacing-md);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}

.input-group input {
  padding: var(--spacing-sm);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
}

.output-result pre {
  background: var(--bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  white-space: pre-wrap;
}

pre code {
  font-family: var(--font-mono);
  line-height: 1.5;
  color: var(--text-primary);
}

/* 响应式调整 */
@media (max-width: 768px) {

  .method-demo,
  .demo-container {
    grid-template-columns: 1fr;
  }
}
</style>
