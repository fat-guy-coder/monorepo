<template>
  <div class="typescript-guide">
    <header class="guide-header">
      <h1 class="title">TypeScript 基本介绍</h1>
      <p class="subtitle">JavaScript的超集，静态类型检查的强大工具</p>
    </header>

    <div class="content-grid">
      <!-- 简介部分 -->
      <section class="intro-section">
        <h2 class="section-title">🌟 TypeScript 是什么？</h2>
        <div class="intro-card">
          <p>TypeScript是由微软开发的开源编程语言，它是JavaScript的超集，通过添加<strong>静态类型定义</strong>，使开发者能够在代码运行前发现错误，提高代码质量和开发效率。</p>
          <div class="highlight-box">
            <div class="highlight-item">
              <div class="icon">🔄</div>
              <p>编译为纯JavaScript</p>
            </div>
            <div class="highlight-item">
              <div class="icon">🧠</div>
              <p>强大的类型系统</p>
            </div>
            <div class="highlight-item">
              <div class="icon">⚡</div>
              <p>渐进式采用</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置指南 -->
      <section class="config-section">
        <h2 class="section-title">⚙️ 项目配置指南</h2>
        <div class="config-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>安装TypeScript</h3>
              <pre class="code-block"><code>npm install -D typescript</code></pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>初始化tsconfig.json</h3>
              <pre class="code-block"><code>npx tsc --init</code></pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Vue项目集成</h3>
              <pre class="code-block"><code>// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})</code></pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>推荐tsconfig配置</h3>
              <pre class="code-block"><code>{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心优势 -->
      <section class="benefits-section">
        <h2 class="section-title">✨ TypeScript 核心优势</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">🚨</div>
            <h3>早期错误检测</h3>
            <p>在编译阶段捕获类型错误，减少运行时错误</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📝</div>
            <h3>代码即文档</h3>
            <p>类型定义本身就是最好的代码文档</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🧩</div>
            <h3>更好的代码补全</h3>
            <p>IDE基于类型系统提供智能提示</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔧</div>
            <h3>重构安全</h3>
            <p>大规模重构时保持代码一致性</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🌐</div>
            <h3>生态系统支持</h3>
            <p>主流框架和库都提供类型定义</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">⚡</div>
            <h3>渐进式采用</h3>
            <p>可以逐步将JavaScript项目迁移到TypeScript</p>
          </div>
        </div>
      </section>

      <!-- 基础示例 -->
      <section class="examples-section">
        <h2 class="section-title">💡 基础类型示例</h2>
        <div class="example-tabs">
          <div class="example-tab" :class="{ active: activeTab === 'interface' }" @click="activeTab = 'interface'">接口
          </div>
          <div class="example-tab" :class="{ active: activeTab === 'type' }" @click="activeTab = 'type'">类型别名</div>
          <div class="example-tab" :class="{ active: activeTab === 'generic' }" @click="activeTab = 'generic'">泛型</div>
        </div>
        <div class="example-content">
          <pre v-if="activeTab === 'interface'" class="code-block"><code>interface User {
  id: number
  name: string
  email?: string  // 可选属性
  readonly createdAt: Date  // 只读属性
}

function printUser(user: User) {
  console.log(user.name)
}</code></pre>
          <pre v-if="activeTab === 'type'" class="code-block"><code>type Point = {
  x: number
  y: number
}

type ID = number | string  // 联合类型

type Callback&lt;T&gt; = (data: T) => void  // 泛型类型别名</code></pre>
          <pre v-if="activeTab === 'generic'" class="code-block"><code>function identity&lt;T&gt;(arg: T): T {
  return arg
}

interface ApiResponse&lt;T&gt; {
  data: T
  status: number
}

class Queue&lt;T&gt; {
  private data: T[] = []
  push(item: T) { this.data.push(item) }
  pop(): T | undefined { return this.data.shift() }
}</code></pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('interface')
</script>

<style lang="less" scoped>
.typescript-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #2d3748;
    font-weight: 800;
    background: linear-gradient(90deg, #3178c6, #4d82c9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    font-weight: 400;
  }
}

.content-grid {
  display: grid;
  gap: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: #2d3748;
  margin-top: 0;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #3178c6, #4d82c9);
    border-radius: 2px;
  }
}

.intro-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  p {
    font-size: 1.1rem;
    color: #475569;
    margin-top: 0;
  }
}

.highlight-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.highlight-item {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .icon {
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-weight: 500;
    color: #334155;
  }
}

.config-steps {
  display: grid;
  gap: 1.5rem;
}

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 32px;
  height: 32px;
  background: #3178c6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content {
  flex: 1;

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #1e40af;
  }
}

.code-block {
  background: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 0;

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #f8fafc;
    line-height: 1.5;
    white-space: pre;
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.benefit-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  .benefit-icon {
    font-size: 2rem;
    color: #3178c6;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #1e40af;
  }

  p {
    margin: 0;
    color: #475569;
    font-size: 0.95rem;
  }
}

.example-tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.example-tab {
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-right: 0.5rem;
  border-bottom: 3px solid transparent;
  font-weight: 500;
  color: #64748b;

  &.active {
    color: #1e40af;
    border-bottom-color: #3178c6;
  }

  &:hover {
    color: #1e40af;
  }
}

.example-content {
  background: #1e293b;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>