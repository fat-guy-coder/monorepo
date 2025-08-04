<template>
  <div class="ts-properties-guide">
    <header class="guide-header">
      <h1 class="title">可选与只读属性基本指南</h1>
      <p class="subtitle">掌握TypeScript的属性修饰技巧</p>
    </header>

    <div class="content-grid">
      <!-- 可选属性 -->
      <section class="property-section">
        <h2 class="section-title">❓ 可选属性</h2>
        <div class="feature-card">
          <h3>接口中的可选属性</h3>
          <pre class="code-block"><code>interface User {
  id: number
  name: string
  email?: string  // 可选属性
  phone?: string
}</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>非必填的表单字段、API响应中的可选字段、配置对象的可选参数</p>
        </div>

        <div class="feature-card">
          <h3>类型中的可选属性</h3>
          <pre class="code-block"><code>type Config = {
  timeout: number
  retry?: boolean  // 可选属性
  logger?: (msg: string) => void
}</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>函数配置选项、插件参数、组件Props</p>
        </div>
      </section>

      <!-- 只读属性 -->
      <section class="property-section">
        <h2 class="section-title">🔒 只读属性</h2>
        <div class="feature-card">
          <h3>基础只读属性</h3>
          <pre class="code-block"><code>interface Point {
  readonly x: number
  readonly y: number
}

const p: Point = { x: 10, y: 20 }
p.x = 5 // 错误！无法分配到"x"，因为它是只读属性</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>不可变数据、配置常量、初始化后不应更改的值</p>
        </div>

        <div class="feature-card">
          <h3>Readonly工具类型</h3>
          <pre class="code-block"><code>interface Book {
  title: string
  author: string
}

const book: Readonly&lt;Book&gt; = {
  title: 'TypeScript Guide',
  author: 'Microsoft'
}

book.title = 'New Title' // 错误！</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>确保对象完全不可变、React状态管理、函数参数保护</p>
        </div>
      </section>

      <!-- 可选参数 -->
      <section class="property-section">
        <h2 class="section-title">🔄 可选参数</h2>
        <div class="feature-card">
          <h3>函数可选参数</h3>
          <pre class="code-block"><code>function createUser(
  name: string,
  age?: number,  // 可选参数
  country?: string
) {
  // ...
}

createUser('Alice') // 有效
createUser('Bob', 25) // 有效</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>非必填的函数参数、配置项处理、API调用参数</p>
        </div>

        <div class="feature-card">
          <h3>默认参数</h3>
          <pre class="code-block"><code>function greet(
  name: string,
  greeting: string = 'Hello'  // 默认参数
) {
  return `${greeting}, ${name}!`
}

greet('Alice') // "Hello, Alice!"
greet('Bob', 'Hi') // "Hi, Bob!"</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>提供参数默认值、简化函数调用、配置项默认值</p>
        </div>
      </section>
    </div>

    <section class="best-practice">
      <h2 class="section-title">🏆 最佳实践</h2>
      <div class="practice-grid">
        <div class="practice-card">
          <h3>可选属性实践</h3>
          <ul>
            <li>优先使用<code>undefined</code>而不是<code>null</code></li>
            <li>使用类型守卫检查可选属性</li>
            <li>避免过多可选属性（考虑拆分接口）</li>
          </ul>
        </div>
        <div class="practice-card">
          <h3>只读属性实践</h3>
          <ul>
            <li>对配置对象使用<code>Readonly</code></li>
            <li>配合<code>const</code>断言增强不可变性</li>
            <li>React组件的props应该只读</li>
          </ul>
        </div>
        <div class="practice-card">
          <h3>参数处理实践</h3>
          <ul>
            <li>可选参数应放在参数列表末尾</li>
            <li>默认参数可以替代简单可选参数</li>
            <li>复杂配置考虑使用对象参数</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="advanced-section">
      <h2 class="section-title">🚀 高级技巧</h2>
      <div class="advanced-grid">
        <div class="advanced-card">
          <h3>Required工具类型</h3>
          <pre class="code-block"><code>interface Props {
  name?: string
  age?: number
}

const requiredProps: Required&lt;Props&gt; = {
  name: 'Alice',
  age: 25
} // 所有属性变为必填</code></pre>
        </div>
        <div class="advanced-card">
          <h3>参数解构默认值</h3>
          <pre class="code-block"><code>function draw({
  color = 'red',  // 解构默认值
  width = 100,
  height = 100
} = {}) {
  // ...
}

draw() // 使用所有默认值
draw({ color: 'blue' })</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 示例类型定义
interface ExampleUser {
  readonly id: number
  name: string
  email?: string
}

// 示例函数
function exampleFunc(
  required: string,
  optional?: number,
  readonlyParam: readonly string[] = ['default']
) {
  // readonlyParam.push('new') // 错误！
}
</script>

<style lang="less" scoped>
.ts-properties-guide {
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

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.property-section {
  h2 {
    font-size: 1.5rem;
    color: #1e40af;
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
  margin-bottom: 3rem;
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

      code {
        background: #e2e8f0;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
      }
    }
  }
}

.advanced-section {
  margin-top: 2rem;
}

.advanced-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.advanced-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    color: #1e40af;
    font-size: 1.2rem;
  }

  pre {
    margin: 0;
  }
}
</style>