<template>
  <div class="node-modules-container">
    <!-- 头部区域 -->
    <header class="hero">
      <div class="hero-content">
        <div class="node-icon">⬢</div>
        <h1>Node.js 模块查找机制详解</h1>
        <p class="subtitle">深入理解 require() 的工作方式与模块解析顺序</p>
      </div>
    </header>

    <main class="content">
      <!-- 介绍部分 -->
      <section class="intro-section">
        <div class="intro-card">
          <h2>Node.js 模块系统核心概念</h2>
          <div class="intro-grid">
            <div class="concept-card">
              <div class="icon">📦</div>
              <h3>模块</h3>
              <p>Node.js 中每个文件都被视为一个独立的模块</p>
            </div>
            <div class="concept-card">
              <div class="icon">🔄</div>
              <h3>require()</h3>
              <p>用于加载模块的核心函数，遵循 CommonJS 规范</p>
            </div>
            <div class="concept-card">
              <div class="icon">🗂️</div>
              <h3>node_modules</h3>
              <p>存放第三方模块的目录，Node.js 会自动查找</p>
            </div>
            <div class="concept-card">
              <div class="icon">🧠</div>
              <h3>模块缓存</h3>
              <p>Node.js 会缓存已加载模块以提高性能</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 查找步骤 -->
      <section class="steps-section">
        <h2 class="section-title">模块查找顺序</h2>
        <div class="steps-container">
          <div v-for="step in lookupSteps" :key="step.step" class="step-card">
            <div class="step-header">
              <div class="step-number">{{ step.step }}</div>
              <div class="step-icon">{{ step.icon }}</div>
              <h3>{{ step.title }}</h3>
            </div>
            <p>{{ step.description }}</p>
            <div class="code-example">
              <code>{{ step.example }}</code>
            </div>
            <div class="step-path" v-if="step.step === 4">
              <div class="path-item">/project/node_modules</div>
              <div class="path-item">/project</div>
              <div class="path-item">/node_modules</div>
              <div class="path-item">/home/user/node_modules</div>
              <div class="path-item">/usr/local/lib/node_modules</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 文件扩展名解析 -->
      <section class="extensions-section">
        <h2 class="section-title">文件扩展名解析顺序</h2>
        <div class="extensions-container">
          <div class="explanation">
            <p>当 require() 没有指定文件扩展名时，Node.js 会按以下顺序尝试解析：</p>
          </div>
          <div class="extensions-list">
            <div v-for="(ext, index) in extensions" :key="index" class="extension-item">
              <div class="ext-icon">{{ ext.icon }}</div>
              <div class="ext-name">{{ ext.ext }}</div>
              <div class="ext-desc">{{ ext.description }}</div>
            </div>
          </div>
          <div class="example-card">
            <h3>示例解析过程</h3>
            <p>require('./module') 会依次尝试加载：</p>
            <div class="file-attempts">
              <div class="file-attempt">module.js</div>
              <div class="file-attempt">module.json</div>
              <div class="file-attempt">module.node</div>
              <div class="file-attempt">module.mjs</div>
              <div class="file-attempt">module/index.js</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 目录模块处理 -->
      <section class="directory-section">
        <h2 class="section-title">目录模块处理</h2>
        <div class="directory-container">
          <div class="directory-explanation">
            <h3>{{ directoryModules.title }}</h3>
            <ul>
              <li v-for="(step, index) in directoryModules.steps" :key="index">{{ step }}</li>
            </ul>
          </div>
          <div class="package-example">
            <h3>package.json 示例</h3>
            <pre class="code-block">
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "lib/main.js", // 模块入口文件
  "exports": {
    ".": "./lib/main.js",
    "./feature": "./lib/feature.js"
  }
}</pre
            >
          </div>
        </div>
      </section>

      <!-- 缓存机制 -->
      <section class="cache-section">
        <h2 class="section-title">模块缓存机制</h2>
        <div class="cache-container">
          <div class="cache-card">
            <div class="cache-icon">💾</div>
            <h3>{{ caching.title }}</h3>
            <p>{{ caching.description }}</p>
            <ul>
              <li v-for="(point, index) in caching.points" :key="index">{{ point }}</li>
            </ul>
          </div>
          <div class="cache-diagram">
            <div class="module-load">
              <div class="module">模块 A</div>
              <div class="arrow">➡️</div>
              <div class="require">require('A')</div>
            </div>
            <div class="module-load">
              <div class="module">模块 B</div>
              <div class="arrow">➡️</div>
              <div class="require">require('A')</div>
            </div>
            <div class="cache-box">
              <div class="cache-title">缓存</div>
              <div class="cached-module">模块 A</div>
            </div>
            <div class="legend">
              <div class="legend-item">
                <div class="box new"></div>
                <span>首次加载</span>
              </div>
              <div class="legend-item">
                <div class="box cached"></div>
                <span>从缓存加载</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <h2 class="section-title">模块使用最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">✅</div>
            <h3>明确文件扩展名</h3>
            <p>在 require() 中明确指定文件扩展名以提高性能</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">📂</div>
            <h3>合理组织 node_modules</h3>
            <p>保持项目依赖在本地 node_modules，避免全局依赖</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🚫</div>
            <h3>避免循环依赖</h3>
            <p>合理设计模块结构，避免模块间的循环引用</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">⚡</div>
            <h3>利用缓存机制</h3>
            <p>模块初始化代码只会在首次加载时执行</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p> Node.js 模块机制详解 | 使用 Vue 3 + TypeScript 实现</p>
      <p>深入理解 Node.js 模块系统，构建更高效的应用程序</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// 模块查找步骤数据
const lookupSteps = ref([
  {
    step: 1,
    title: '核心模块检查',
    description: '检查是否是 Node.js 内置的核心模块（如 fs、path、http 等）',
    example: "require('fs')",
    icon: '🔍',
  },
  {
    step: 2,
    title: '文件模块检查',
    description: "检查是否是文件模块（以 '/'、'./' 或 '../' 开头）",
    example: "require('./myModule')",
    icon: '📄',
  },
  {
    step: 3,
    title: '目录模块检查',
    description: '如果路径指向一个目录，查找该目录下的 package.json 或 index.js',
    example: "require('./myDirectory')",
    icon: '📁',
  },
  {
    step: 4,
    title: 'node_modules 查找',
    description: '从当前目录开始向上级目录递归查找 node_modules 文件夹',
    example: "require('lodash')",
    icon: '📦',
  },
  {
    step: 5,
    title: '全局模块检查',
    description: '检查 NODE_PATH 环境变量中指定的全局模块路径',
    example: "require('global-module')",
    icon: '🌐',
  },
])

// 文件扩展名解析顺序
const extensions = ref([
  { ext: '.js', description: 'JavaScript 文件', icon: '⬜' },
  { ext: '.json', description: 'JSON 文件', icon: '🟧' },
  { ext: '.node', description: '编译的 C++ 插件', icon: '🟦' },
  { ext: '.mjs', description: 'ECMAScript 模块', icon: '🟩' },
  { ext: '.cjs', description: 'CommonJS 模块', icon: '🟪' },
])

// 缓存机制
const caching = ref({
  title: '模块缓存机制',
  description: 'Node.js 会对加载过的模块进行缓存，提高后续加载速度',
  points: [
    '每个模块只会在第一次加载时执行',
    '后续 require() 调用返回缓存版本',
    '缓存键是模块的完整解析路径',
    '可通过 require.cache 访问缓存对象',
  ],
})

// 目录模块处理
const directoryModules = ref({
  title: '目录模块处理流程',
  steps: [
    '检查目录中是否存在 package.json 文件',
    '如果存在，查找 main 字段指定的入口文件',
    '如果不存在 package.json 或 main 字段，尝试加载 index.js',
    '其次尝试 index.json',
    '最后尝试 index.node',
  ],
})
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #339933;
@secondary-color: #2b6cb0;
@accent-color: #4a5568;
@background-color: #f7fafc;
@card-bg: #ffffff;
@text-color: #2d3748;
@text-light: #718096;
@border-color: #e2e8f0;
@success-color: #48bb78;
@warning-color: #e53e3e;
@info-color: #4299e1;

// 字体
@font-family:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  sans-serif;

// 混合
.shadow-card() {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.03),
    0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 10px 15px rgba(0, 0, 0, 0.05),
      0 4px 6px rgba(0, 0, 0, 0.05);
  }
}

.gradient-border() {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    border-radius: 4px 4px 0 0;
  }
}

// 全局样式
.node-modules-container {
  font-family: @font-family;
  background-color: @background-color;
  color: @text-color;
  line-height: 1.6;
  padding: 0;
  margin: 0;
  min-height: 100vh;
}

// 页头样式
.hero {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  padding: 4rem 1.5rem 5rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(transparent, @background-color);
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .node-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2.8rem;
    margin: 0 0 1rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.4rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }
}

// 内容区域
.content {
  max-width: 1200px;
  margin: -3rem auto 0;
  padding: 0 1.5rem 3rem;
  position: relative;
}

// 章节标题
.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: @primary-color;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid @border-color;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: @accent-color;
  }
}

// 介绍部分
.intro-section {
  margin-bottom: 3rem;
}

.intro-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  .shadow-card();

  h2 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.8rem;
  }
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  background: lighten(@primary-color, 55%);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: lighten(@primary-color, 50%);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 1rem;
    color: @primary-color;
  }

  p {
    margin: 0;
    color: @text-light;
  }
}

// 步骤部分
.steps-section {
  margin-bottom: 3rem;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  .shadow-card();
  border-left: 5px solid @primary-color;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: @primary-color;
  }
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  gap: 1rem;

  .step-number {
    background: @primary-color;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-icon {
    font-size: 1.8rem;
  }

  h3 {
    margin: 0;
    font-size: 1.4rem;
    color: @text-color;
  }
}

.code-example {
  background: #f8f9fa;
  border-left: 3px solid @info-color;
  padding: 0.8rem 1rem;
  border-radius: 0 6px 6px 0;
  margin: 1.2rem 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;

  code {
    color: @text-color;
  }
}

.step-path {
  background: #edf2f7;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;

  .path-item {
    padding: 0.5rem 1rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    border-bottom: 1px dashed #cbd5e0;

    &:last-child {
      border-bottom: none;
    }
  }
}

// 文件扩展名部分
.extensions-section {
  margin-bottom: 3rem;
}

.extensions-container {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  .shadow-card();
}

.explanation {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid @border-color;

  p {
    margin: 0;
    font-size: 1.1rem;
  }
}

.extensions-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.extension-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem;
  background: lighten(@primary-color, 55%);
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
}

.ext-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.ext-name {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-family: 'Fira Code', monospace;
}

.ext-desc {
  color: @text-light;
  text-align: center;
  font-size: 0.9rem;
}

.example-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;

  h3 {
    margin-top: 0;
    color: @primary-color;
  }
}

.file-attempts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.file-attempt {
  background: white;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  border-left: 3px solid @info-color;
}

// 目录模块部分
.directory-section {
  margin-bottom: 3rem;
}

.directory-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.directory-explanation {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  .shadow-card();

  h3 {
    margin-top: 0;
    color: @primary-color;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: @primary-color;
        font-size: 1.2rem;
      }
    }
  }
}

.package-example {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  .shadow-card();

  h3 {
    margin-top: 0;
    color: @primary-color;
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  overflow-x: auto;
  margin-top: 1rem;
}

// 缓存机制部分
.cache-section {
  margin-bottom: 3rem;
}

.cache-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.cache-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  .shadow-card();

  .cache-icon {
    font-size: 3rem;
    margin-bottom: 1.2rem;
    color: @primary-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
    }
  }
}

.cache-diagram {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  .shadow-card();
  display: flex;
  flex-direction: column;
  align-items: center;
}

.module-load {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;

  .module {
    background: lighten(@success-color, 40%);
    padding: 1rem;
    border-radius: 8px;
    flex: 1;
    text-align: center;
    font-weight: 500;
  }

  .require {
    background: lighten(@info-color, 35%);
    padding: 1rem;
    border-radius: 8px;
    flex: 1;
    text-align: center;
    font-weight: 500;
  }

  .arrow {
    margin: 0 1rem;
    font-size: 1.5rem;
  }
}

.cache-box {
  border: 2px dashed @primary-color;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  width: 80%;
  margin-top: 1rem;

  .cache-title {
    font-weight: 700;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  .cached-module {
    background: lighten(@primary-color, 55%);
    padding: 1rem;
    border-radius: 6px;
    font-weight: 500;
  }
}

.legend {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .box {
    width: 20px;
    height: 20px;
    border-radius: 4px;

    &.new {
      background: lighten(@info-color, 35%);
    }

    &.cached {
      background: lighten(@primary-color, 55%);
    }
  }
}

// 最佳实践部分
.best-practices {
  margin-bottom: 3rem;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  .shadow-card();
  text-align: center;
  border-top: 3px solid @primary-color;

  .practice-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 1rem;
    color: @primary-color;
  }

  p {
    margin: 0;
    color: @text-light;
  }
}

// 页脚样式
.footer {
  text-align: center;
  padding: 2.5rem 1rem;
  margin-top: 3rem;
  background: @card-bg;
  border-top: 1px solid @border-color;
  color: @text-light;
  font-size: 0.95rem;

  p {
    margin: 0.4rem 0;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem 4rem;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
