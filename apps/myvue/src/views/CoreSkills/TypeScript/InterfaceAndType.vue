<template>
  <div class="type-interface-guide">
    <header class="guide-header">
      <h1 class="title">Interface 与 Type 基本指南</h1>
      <p class="subtitle">掌握TypeScript的核心类型定义方式</p>
    </header>

    <div class="comparison-section">
      <h2 class="section-title">🆚 核心区别对比</h2>
      <div class="comparison-grid">
        <div class="comparison-card interface-card">
          <h3>Interface 特性</h3>
          <ul>
            <li>主要用于<b>对象形状</b>描述</li>
            <li>支持<b>声明合并</b></li>
            <li>可被<b>类实现(implements)</b></li>
            <li>可<b>扩展(extends)</b>其他接口</li>
            <li>Vue Props首选定义方式</li>
          </ul>
        </div>
        <div class="comparison-card type-card">
          <h3>Type 特性</h3>
          <ul>
            <li>可定义<b>任意类型</b>（联合、元组等）</li>
            <li>支持<b>复杂类型运算</b></li>
            <li>可使用<b>条件类型</b></li>
            <li>适合<b>工具类型</b>创建</li>
            <li>React Props常用定义方式</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content-columns">
      <!-- Interface部分 -->
      <section class="interface-section">
        <h2 class="section-title">📜 Interface 基础介绍</h2>

        <div class="feature-card">
          <h3>基础对象定义</h3>
          <pre class="code-block"><code>interface User {
  id: number
  name: string
  age?: number  // 可选属性
  readonly createdAt: Date  // 只读属性
}</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>API响应数据、组件Props、复杂配置对象</p>
        </div>

        <div class="feature-card">
          <h3>接口继承</h3>
          <pre class="code-block"><code>interface Animal {
  name: string
}

interface Dog extends Animal {
  breed: string
  bark(): void
}</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>类型层次结构、基础类型扩展</p>
        </div>

        <div class="feature-card">
          <h3>声明合并</h3>
          <pre class="code-block"><code>interface Window {
  title: string
}

interface Window {
  size: number
}

// 合并为 { title: string; size: number }</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>全局类型扩展、库类型定义</p>
        </div>
      </section>

      <!-- Type部分 -->
      <section class="type-section">
        <h2 class="section-title">✨ Type 基础介绍（类型别名）</h2>

        <div class="feature-card">
          <h3>联合与交叉类型</h3>
          <pre class="code-block"><code>type ID = number | string
type Admin = User & { permissions: string[] }</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>灵活的类型组合、复用已有类型</p>
        </div>

        <div class="feature-card">
          <h3>元组与字面量类型</h3>
          <pre class="code-block"><code>type Point = [number, number]
type Status = 'pending' | 'success' | 'error'</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>固定长度数组、有限状态集合</p>
        </div>

        <div class="feature-card">
          <h3>条件与映射类型</h3>
          <pre class="code-block"><code>type Nullable&lt;T&gt; = T | null
type ReadonlyUser = Readonly&lt;User&gt;
type Keys = keyof User</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>高级类型编程、工具类型创建</p>
        </div>
      </section>
    </div>

    <section class="best-practice">
      <h2 class="section-title">🏆 最佳实践</h2>
      <div class="practice-grid">
        <div class="practice-card">
          <h3>何时用 Interface？</h3>
          <ul>
            <li>定义对象形状时</li>
            <li>需要声明合并时</li>
            <li>类需要实现接口时</li>
            <li>Vue组件Props定义</li>
          </ul>
        </div>
        <div class="practice-card">
          <h3>何时用 Type？</h3>
          <ul>
            <li>需要联合/交叉类型时</li>
            <li>定义元组或字面量类型时</li>
            <li>创建工具类型时</li>
            <li>需要条件类型时</li>
          </ul>
        </div>
        <div class="practice-card">
          <h3>项目配置建议</h3>
          <pre class="code-block"><code>// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 示例类型定义
interface ExampleUser {
  id: number
  name: string
}

type ExampleStatus = 'active' | 'inactive'
</script>

<style lang="less" scoped>
.type-interface-guide {
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
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    font-weight: 400;
  }
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
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 2px;
  }
}

.comparison-section {
  margin-bottom: 3rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.comparison-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    color: #1e40af;
    font-size: 1.3rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.8rem;
      color: #475569;

      b {
        color: #1e40af;
      }
    }
  }
}

.interface-card {
  border-top: 4px solid #3b82f6;
}

.type-card {
  border-top: 4px solid #8b5cf6;
}

.content-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: #1e40af;
    font-size: 1.2rem;
  }
}

.usage-scenario {
  margin: 0.8rem 0 0;
  font-size: 0.9rem;
  color: #64748b;

  b {
    color: #475569;
  }
}

.code-block {
  background: #1e293b;
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #f8fafc;
    line-height: 1.5;
    white-space: pre;
  }
}

.best-practice {
  margin-top: 3rem;
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    color: #1e40af;
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
      color: #475569;
    }
  }

  pre {
    margin: 0;
  }
}
</style>
