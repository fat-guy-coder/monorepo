<template>
  <div class="meta-container">
    <!-- 头部标题区 -->
    <header class="meta-header">
      <div class="header-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </div>
      <div class="header-text">
        <h1 class="title">import.meta</h1>
        <p class="subtitle">ES 模块元信息访问对象</p>
      </div>
    </header>

    <!-- 简介卡片 -->
    <section class="card intro-card">
      <h2 class="card-title">
        <span class="card-title-icon">📖</span>
        什么是 import.meta？
      </h2>
      <p class="card-desc">
        <code class="inline-code">import.meta</code> 是一个在 ES 模块内部可用的<strong>元信息对象</strong>，
        它由宿主环境（浏览器、Node.js、构建工具等）注入，用于暴露当前模块的上下文信息。
        它不是一个真正的对象，而是<strong>由 JavaScript 引擎在模块加载时动态创建</strong>的。
      </p>
      <div class="highlight-box">
        <span class="highlight-label">关键特性</span>
        仅在 ES 模块（<code>.mjs</code> 或 <code>type="module"</code>）中可用，CommonJS 中无法使用。
      </div>
    </section>

    <!-- 语法卡片 -->
    <section class="card syntax-card">
      <h2 class="card-title">
        <span class="card-title-icon">✏️</span>
        语法
      </h2>
      <div class="code-block">
        <pre><code><span class="token-comment">// 基本语法 —— 直接访问 import.meta 上的属性</span>
<span class="token-keyword">import</span>.<span class="token-property">meta</span>.<span class="token-method">url</span>

<span class="token-comment">// import.meta 本身不能被赋值或重新定义</span>
<span class="token-comment">// import.meta = {}; // ❌ 报错</span></code></pre>
      </div>
      <p class="card-note">
        <code class="inline-code">import.meta</code> 是一个<strong>可扩展的空对象</strong>，宿主环境可以在其上挂载任意属性。
        标准中只定义了 <code>import.meta.url</code> 和 <code>import.meta.resolve()</code>。
      </p>
    </section>

    <!-- 核心属性卡片 -->
    <section class="card props-card">
      <h2 class="card-title">
        <span class="card-title-icon">🔧</span>
        核心属性与方法
      </h2>
      <div class="props-grid">
        <div class="prop-item">
          <div class="prop-header">
            <code class="prop-name">import.meta.url</code>
            <span class="badge badge-standard">标准</span>
          </div>
          <p class="prop-desc">返回当前模块的完整 <strong>URL 地址</strong>。在浏览器中是页面的绝对 URL，在 Node.js 中是 <code>file://</code>
            协议的路径。</p>
          <div class="mini-code">
            <code>// 浏览器中可能得到：https://example.com/js/app.js</code>
          </div>
        </div>
        <div class="prop-item">
          <div class="prop-header">
            <code class="prop-name">import.meta.resolve()</code>
            <span class="badge badge-standard">标准</span>
          </div>
          <p class="prop-desc">以当前模块的 URL 为基准，<strong>解析模块标识符</strong>，返回完整的 URL 字符串。类似于 Node.js 的
            <code>require.resolve</code>。</p>
          <div class="mini-code">
            <code>// import.meta.resolve('./utils.js')
// → https://example.com/js/utils.js</code>
          </div>
        </div>
        <div class="prop-item">
          <div class="prop-header">
            <code class="prop-name">import.meta.env</code>
            <span class="badge badge-vite">Vite</span>
          </div>
          <p class="prop-desc">Vite 构建工具注入的环境变量对象，包含 <code>MODE</code>、<code>DEV</code>、<code>PROD</code> 等。在编译时被静态替换。
          </p>
          <div class="mini-code">
            <code>// import.meta.env.MODE === 'development'</code>
          </div>
        </div>
        <div class="prop-item">
          <div class="prop-header">
            <code class="prop-name">import.meta.glob()</code>
            <span class="badge badge-vite">Vite</span>
          </div>
          <p class="prop-desc">Vite 提供的<strong>文件批量导入</strong>方法，支持 glob 模式匹配，可懒加载或同步导入多个模块。</p>
          <div class="mini-code">
            <code>// const modules = import.meta.glob('./dir/*.vue')</code>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景卡片 -->
    <section class="card usage-card">
      <h2 class="card-title">
        <span class="card-title-icon">💡</span>
        典型使用场景
      </h2>
      <ul class="usage-list">
        <li class="usage-item">
          <span class="usage-marker"></span>
          <div>
            <strong>获取模块自身路径</strong>
            <p>通过 <code>import.meta.url</code> 拼接相对路径，加载同目录下的资源文件（图片、JSON、Worker 等）。</p>
          </div>
        </li>
        <li class="usage-item">
          <span class="usage-marker"></span>
          <div>
            <strong>动态创建 Web Worker</strong>
            <p>使用 <code>new URL('./worker.js', import.meta.url)</code> 构造 Worker 的准确路径，避免相对路径问题。</p>
          </div>
        </li>
        <li class="usage-item">
          <span class="usage-marker"></span>
          <div>
            <strong>环境判断与条件编译</strong>
            <p>借助 Vite 的 <code>import.meta.env</code> 在开发/生产环境执行不同逻辑，Dead Code 会在构建时被移除。</p>
          </div>
        </li>
        <li class="usage-item">
          <span class="usage-marker"></span>
          <div>
            <strong>批量导入模块</strong>
            <p>使用 <code>import.meta.glob()</code> 一次性导入整个目录的组件、路由或国际化文件。</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- 代码示例卡片 -->
    <section class="card example-card">
      <h2 class="card-title">
        <span class="card-title-icon">🚀</span>
        实战代码示例
      </h2>
      <div class="example-tabs">
        <div v-for="tab in examples" :key="tab.label" class="example-tab"
          :class="{ active: activeExample === tab.label }" @click="activeExample = tab.label">
          {{ tab.label }}
        </div>
      </div>
      <div class="code-block large-code">
        <pre><code>{{ currentExample.code }}</code></pre>
      </div>
    </section>

    <!-- 注意事项卡片 -->
    <footer class="card warning-card">
      <h2 class="card-title">
        <span class="card-title-icon">⚠️</span>
        注意事项
      </h2>
      <div class="warning-list">
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span><code>import.meta</code> 仅在 ES Module 中可用，CommonJS 模块中不存在该对象。</span>
        </div>
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span><code>import.meta.env</code> 等构建工具属性在编译时会被静态替换，运行时无法动态访问。</span>
        </div>
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span>不同宿主环境（浏览器 / Node.js / Deno / 构建工具）注入的属性不同，需注意兼容性。</span>
        </div>
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span>TypeScript 中需要配置 <code>"module": "ESNext"</code> 并引入对应的类型声明才能获得类型提示。</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 当前选中的代码示例标签
const activeExample = ref<string>('Worker')

// 代码示例数据
interface ExampleItem {
  label: string
  code: string
}

const examples: ExampleItem[] = [
  {
    label: 'Worker',
    code: `// 🧵 创建 Web Worker —— 利用 import.meta.url 获取准确路径
const workerUrl = new URL('./worker.ts', import.meta.url);
const worker = new Worker(workerUrl, { type: 'module' });

worker.postMessage({ type: 'INIT', payload: data });
worker.onmessage = (event) => {
  console.log('Worker 返回:', event.data);
};`
  },
  {
    label: '环境判断',
    code: `// 🌍 环境变量判断 —— Vite 编译时静态替换
if (import.meta.env.DEV) {
  console.log('当前为开发环境，开启调试工具');
  console.log('API 地址:', import.meta.env.VITE_API_BASE);
}

if (import.meta.env.PROD) {
  // 生产环境专属逻辑，构建时 DEV 分支会被 Tree Shaking 移除
  initPerformanceMonitor();
}`
  },
  {
    label: '批量导入',
    code: `// 📦 批量导入组件 —— Vite 的 import.meta.glob
const modules = import.meta.glob<{ default: Component }>(
  './components/**/*.vue',
  { eager: true }
);

// 遍历注册为全局组件
Object.entries(modules).forEach(([path, mod]) => {
  const name = path.match(/\\/([^/]+)\\.vue$/)?.[1];
  if (name) app.component(name, mod.default);
});`
  },
  {
    label: '资源路径',
    code: `// 🖼️ 动态加载同目录资源
function getAssetPath(filename: string): string {
  return new URL(\`./assets/\${filename}\`, import.meta.url).href;
}

const heroImage = getAssetPath('hero.webp');
const configJson = await fetch(getAssetPath('config.json')).then(r => r.json());

console.log('图片完整路径:', heroImage);
// → https://example.com/static/assets/hero.webp`
  },
  {
    label: 'resolve',
    code: `// 🔗 使用 import.meta.resolve() 解析模块路径
// 以当前模块为基准解析相对路径
const utilsPath = import.meta.resolve('./utils/helper.js');
console.log('解析后的路径:', utilsPath);
// → https://example.com/src/utils/helper.js

// 也可以解析裸模块标识符（需浏览器支持 import maps）
const lodashPath = import.meta.resolve('lodash');
console.log('lodash 路径:', lodashPath);`
  }
]

// 当前展示的示例
const currentExample = computed<ExampleItem>(() => {
  return examples.find((e) => e.label === activeExample.value) ?? examples[0]
})
</script>

<style lang="less" scoped>
// ========== 变量定义 ==========
@bg-primary: #fafbfc;
@bg-card: #ffffff;
@text-primary: #1a1a2e;
@text-secondary: #5a6070;
@text-muted: #8b919e;
@accent: #4f6ef7;
@accent-light: #eef1fe;
@accent-glow: rgba(79, 110, 247, 0.08);
@border: #e8ecf1;
@border-light: #f0f2f5;
@shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03);
@shadow-md: 0 4px 16px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.03);
@radius-lg: 16px;
@radius-md: 12px;
@radius-sm: 8px;
@transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

// ========== 全局容器 ==========
.meta-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  color: @text-primary;
  line-height: 1.7;
  background: @bg-primary;
  min-height: 100vh;
}

// ========== 头部 ==========
.meta-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 36px;
  padding: 28px 32px;
  background: @bg-card;
  border-radius: @radius-lg;
  box-shadow: @shadow-md;
  border: 1px solid @border-light;

  .header-icon {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: @accent-light;
    border-radius: @radius-md;
    color: @accent;
    flex-shrink: 0;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  .header-text {
    .title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      color: @text-primary;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, @accent 0%, #7c5cfc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      margin: 4px 0 0;
      font-size: 0.95rem;
      color: @text-secondary;
      font-weight: 400;
    }
  }
}

// ========== 卡片通用 ==========
.card {
  background: @bg-card;
  border-radius: @radius-lg;
  padding: 28px 30px;
  margin-bottom: 20px;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: box-shadow @transition;

  &:hover {
    box-shadow: @shadow-md;
  }
}

.card-title {
  font-size: 1.15rem;
  font-weight: 650;
  margin: 0 0 16px;
  color: @text-primary;
  display: flex;
  align-items: center;
  gap: 10px;

  .card-title-icon {
    font-size: 1.3rem;
    line-height: 1;
  }
}

.card-desc {
  margin: 0 0 14px;
  color: @text-secondary;
  font-size: 0.95rem;
}

.card-note {
  margin: 12px 0 0;
  font-size: 0.88rem;
  color: @text-muted;
}

// ========== 行内代码 ==========
.inline-code {
  background: #f4f5f8;
  color: #d9495e;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 0.9em;
  font-weight: 500;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;
}

// ========== 高亮提示框 ==========
.highlight-box {
  background: @accent-light;
  border-left: 3px solid @accent;
  padding: 12px 16px;
  border-radius: @radius-sm;
  font-size: 0.9rem;
  color: @text-primary;
  line-height: 1.6;

  .highlight-label {
    display: inline-block;
    background: @accent;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 20px;
    margin-right: 8px;
    vertical-align: middle;
  }
}

// ========== 代码块 ==========
.code-block {
  background: #1e1e2e;
  border-radius: @radius-md;
  padding: 18px 20px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  font-size: 0.88rem;
  line-height: 1.75;

  pre {
    margin: 0;
  }

  code {
    color: #cdd6f4;
  }

  .token-comment {
    color: #6c7086;
  }

  .token-keyword {
    color: #cba6f7;
  }

  .token-property {
    color: #89b4fa;
  }

  .token-method {
    color: #a6e3a1;
  }

  &.large-code {
    min-height: 140px;
    max-height: 280px;
    overflow-y: auto;
  }
}

.mini-code {
  background: #f8f9fb;
  border: 1px solid @border;
  border-radius: 6px;
  padding: 8px 12px;
  margin-top: 8px;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  font-size: 0.82rem;
  color: @text-secondary;
  overflow-x: auto;
}

// ========== 属性网格 ==========
.props-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.prop-item {
  background: #fafbfc;
  border-radius: @radius-md;
  padding: 18px 20px;
  border: 1px solid @border-light;
  transition: border-color @transition;

  &:hover {
    border-color: @accent;
  }

  .prop-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }

  .prop-name {
    font-weight: 650;
    font-size: 0.93rem;
    color: @text-primary;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }

  .badge {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 12px;
    letter-spacing: 0.03em;
    text-transform: uppercase;

    &.badge-standard {
      background: #e6f7e6;
      color: #2e7d32;
    }

    &.badge-vite {
      background: #fff3e0;
      color: #e65100;
    }
  }

  .prop-desc {
    margin: 0;
    font-size: 0.87rem;
    color: @text-secondary;
    line-height: 1.6;
  }
}

// ========== 使用场景列表 ==========
.usage-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.usage-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 16px;
  background: #fafbfc;
  border-radius: @radius-sm;
  border: 1px solid @border-light;
  transition: border-color @transition;

  &:hover {
    border-color: @accent;
  }

  .usage-marker {
    width: 8px;
    height: 8px;
    background: @accent;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 7px;
  }

  strong {
    display: block;
    font-size: 0.93rem;
    color: @text-primary;
    margin-bottom: 2px;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: @text-secondary;
  }
}

// ========== 示例标签切换 ==========
.example-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.example-tab {
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 0.84rem;
  font-weight: 500;
  cursor: pointer;
  background: #f4f5f8;
  color: @text-secondary;
  transition: all @transition;
  user-select: none;
  border: 1px solid transparent;

  &:hover {
    background: @accent-light;
    color: @accent;
  }

  &.active {
    background: @accent;
    color: #fff;
    box-shadow: 0 2px 8px rgba(79, 110, 247, 0.3);
  }
}

// ========== 注意事项 ==========
.warning-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.warning-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 0.9rem;
  color: @text-secondary;
  line-height: 1.6;
  padding: 10px 14px;
  background: #fffbf0;
  border-radius: @radius-sm;
  border: 1px solid #fef0c7;

  .warning-dot {
    width: 6px;
    height: 6px;
    background: #e6a817;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 7px;
  }
}

.warning-card {
  border-left: 3px solid #f0c040;
}

// ========== 滚动条美化 ==========
.code-block.large-code::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.code-block.large-code::-webkit-scrollbar-track {
  background: transparent;
}

.code-block.large-code::-webkit-scrollbar-thumb {
  background: #3b3b52;
  border-radius: 10px;
}

// ========== 全局平滑过渡 ==========
* {
  box-sizing: border-box;
}
</style>
