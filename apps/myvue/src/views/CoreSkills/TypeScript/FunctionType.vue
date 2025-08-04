<template>
  <div class="function-types-guide">
    <header class="guide-header">
      <h1 class="title">TypeScript 函数类型基本介绍</h1>
      <p class="subtitle">全面掌握函数类型定义的各种方式</p>
    </header>

    <div class="content-grid">
      <!-- 基础函数类型 -->
      <section class="type-section">
        <h2 class="section-title">🛠️ 基础函数类型</h2>
        <div class="feature-card">
          <h3>函数声明</h3>
          <pre class="code-block"><code>// 直接定义函数
function add(x: number, y: number): number {
  return x + y
}

// 函数类型注解
let subtract: (a: number, b: number) => number
subtract = function(x, y) { return x - y }</code></pre>
        </div>

        <div class="feature-card">
          <h3>箭头函数</h3>
          <pre class="code-block"><code>// 箭头函数类型
const multiply: (x: number, y: number) => number
  = (x, y) => x * y

// 简写形式
type MathOp = (x: number, y: number) => number
const divide: MathOp = (x, y) => x / y</code></pre>
        </div>
      </section>

      <!-- 函数参数特性 -->
      <section class="type-section">
        <h2 class="section-title">🎛️ 函数参数特性</h2>
        <div class="feature-card">
          <h3>可选参数</h3>
          <pre class="code-block"><code>function greet(name: string, title?: string): string {
  return title ? `Hello, ${title} ${name}` : `Hello, ${name}`
}

// 可选参数必须在最后
function log(message: string, userId?: string): void {
  console.log(message, userId || 'Anonymous')
}</code></pre>
        </div>

        <div class="feature-card">
          <h3>默认参数</h3>
          <pre class="code-block"><code>function createUser(
  name: string,
  role: string = 'user',  // 默认值
  isActive: boolean = true
) {
  // ...
}

// 类型推断会自动工作
createUser('Alice') // role='user', isActive=true</code></pre>
        </div>
      </section>

      <!-- 高级函数类型 -->
      <section class="type-section">
        <h2 class="section-title">🚀 高级函数类型</h2>
        <div class="feature-card">
          <h3>函数重载</h3>
          <pre class="code-block"><code>// 重载签名
function getData(id: number): Data
function getData(query: string): Data[]

// 实现签名
function getData(param: number | string): Data | Data[] {
  if (typeof param === 'number') {
    return findById(param)
  } else {
    return findByQuery(param)
  }
}</code></pre>
        </div>

        <div class="feature-card">
          <h3>泛型函数</h3>
          <pre class="code-block"><code>// 基础泛型函数
function identity&lt;T&gt;(arg: T): T {
  return arg
}

// 泛型约束
function longest&lt;T extends { length: number }&gt;(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

// 在Vue组合式函数中使用
function useFetch&lt;T&gt;(url: string): Promise&lt;T&gt; {
  return fetch(url).then(res => res.json())
}</code></pre>
        </div>
      </section>

      <!-- 特殊函数类型 -->
      <section class="type-section">
        <h2 class="section-title">✨ 特殊函数类型</h2>
        <div class="feature-card">
          <h3>this类型</h3>
          <pre class="code-block"><code>interface User {
  name: string
  age: number
  greet(this: User): void
}

const user: User = {
  name: 'Alice',
  age: 25,
  greet() {
    console.log(`Hi, I'm ${this.name}`)
  }
}</code></pre>
        </div>

        <div class="feature-card">
          <h3>可调用对象</h3>
          <pre class="code-block"><code>interface StringTransformer {
  (input: string): string
  prefix: string
}

const transformer: StringTransformer = (input) => {
  return transformer.prefix + input
}
transformer.prefix = 'Hello '</code></pre>
        </div>
      </section>
    </div>

    <section class="best-practice">
      <h2 class="section-title">🏆 最佳实践</h2>
      <div class="practice-grid">
        <div class="practice-card">
          <h3>Vue中的函数类型</h3>
          <pre class="code-block"><code>// 组件emits类型
const emit = defineEmits&lt;{
  (e: 'update', value: number): void
  (e: 'submit'): void
}&gt;()

// 事件处理函数
const handleClick: (event: MouseEvent) => void = (e) => {
  console.log(e.clientX)
}</code></pre>
        </div>

        <div class="practice-card">
          <h3>类型推断技巧</h3>
          <pre class="code-block"><code>// 自动推断返回类型
function sum(a: number, b: number) { // 返回number
  return a + b
}

// 使用typeof获取函数类型
type SumFunc = typeof sum // (a: number, b: number) => number

// Parameters工具类型获取参数类型
type SumParams = Parameters&lt;SumFunc&gt; // [number, number]</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 示例函数类型定义
type Callback<T = void> = (result: T) => void

// 示例泛型函数
function makeArray<T>(value: T, length: number): T[] {
  return Array(length).fill(value)
}

// 示例重载函数
function padLeft(value: string, padding: number): string
function padLeft(value: string, padding: string): string
function padLeft(value: string, padding: any): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + value
  }
  return padding + value
}
</script>

<style lang="less" scoped>
.function-types-guide {
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

.type-section {
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
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
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

  pre {
    margin: 0;
  }
}
</style>
