<template>
  <div class="generics-guide">
    <header class="guide-header">
      <h1 class="title">TypeScript 泛型基本介绍</h1>
      <p class="subtitle">创建灵活可复用的类型安全代码</p>
    </header>

    <div class="content-grid">
      <!-- 基础泛型 -->
      <section class="generics-section">
        <h2 class="section-title">🛠️ 基础泛型</h2>
        <div class="feature-card">
          <h3>泛型函数</h3>
          <pre class="code-block"><code>// 简单的泛型函数
function identity&lt;T&gt;(arg: T): T {
  return arg
}

// 使用
const output1 = identity&lt;string&gt;("hello") // 显式指定类型
const output2 = identity(42) // 类型推断</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>数据处理函数、工具函数、类型转换</p>
        </div>

        <div class="feature-card">
          <h3>泛型接口</h3>
          <pre class="code-block"><code>interface KeyValuePair&lt;K, V&gt; {
  key: K
  value: V
}

// 使用
const pair1: KeyValuePair&lt;number, string&gt; = { key: 1, value: "one" }
const pair2: KeyValuePair&lt;string, boolean&gt; = { key: "isActive", value: true }</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>API响应类型、数据容器、映射关系</p>
        </div>
      </section>

      <!-- 泛型约束 -->
      <section class="generics-section">
        <h2 class="section-title">🔗 泛型约束</h2>
        <div class="feature-card">
          <h3>基础约束</h3>
          <pre class="code-block"><code>interface HasLength {
  length: number
}

function logLength&lt;T extends HasLength&gt;(arg: T): void {
  console.log(arg.length)
}

logLength&lt;"hello"&gt; // 5
logLength&lt;[1, 2, 3]&gt; // 3
// logLength(42) // 错误！数字没有length属性</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>确保类型具有特定属性、限制泛型范围</p>
        </div>

        <div class="feature-card">
          <h3>类型参数约束</h3>
          <pre class="code-block"><code>function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K) {
  return obj[key]
}

const person = { name: "Alice", age: 25 }
getProperty&lt;typeof person, "name"&gt;(person, "name") // "Alice"
// getProperty(person, "email") // 错误！</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>安全属性访问、动态属性操作</p>
        </div>
      </section>

      <!-- 高级泛型 -->
      <section class="generics-section">
        <h2 class="section-title">🚀 高级泛型</h2>
        <div class="feature-card">
          <h3>泛型类</h3>
          <pre class="code-block"><code>class GenericNumber&lt;T&gt; {
  zeroValue: T
  add: (x: T, y: T) => T

  constructor(zeroValue: T, add: (x: T, y: T) => T) {
    this.zeroValue = zeroValue
    this.add = add
  }
}

// 使用
const myNumber = new GenericNumber&lt;number&gt;(0, (x, y) => x + y)
const myString = new GenericNumber&lt;string&gt;("", (x, y) => x + y)</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>数据容器、集合类、通用服务</p>
        </div>

        <div class="feature-card">
          <h3>条件类型</h3>
          <pre class="code-block"><code>type IsString&lt;T&gt; = T extends string ? true : false

type A = IsString&lt;string&gt; // true
type B = IsString&lt;number&gt; // false

// 从函数类型提取返回类型
type ReturnType&lt;T&gt; = T extends (...args: any[]) => infer R ? R : never</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>类型运算、高级类型工具、类型推导</p>
        </div>
      </section>

      <!-- 泛型工具 -->
      <section class="generics-section">
        <h2 class="section-title">🧰 泛型工具</h2>
        <div class="feature-card">
          <h3>内置工具类型</h3>
          <pre class="code-block"><code>interface User {
  name: string
  age?: number
  email: string
}

// 所有属性变为可选
type PartialUser = Partial&lt;User&gt;

// 所有属性变为必填
type RequiredUser = Required&lt;User&gt;

// 选择特定属性
type NameAndAge = Pick&lt;User, 'name' | 'age'&gt;

// 排除特定属性
type WithoutEmail = Omit&lt;User, 'email'&gt;</code></pre>
          <p class="usage-scenario"><b>使用场景：</b>类型转换、部分更新、视图模型</p>
        </div>
      </section>
    </div>

    <section class="benefits-section">
      <h2 class="section-title">✨ 泛型的优势</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">🛡️</div>
          <h3>类型安全</h3>
          <p>在编译时捕获类型错误，避免运行时问题</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">♻️</div>
          <h3>代码复用</h3>
          <p>一套逻辑处理多种类型，减少重复代码</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🧠</div>
          <h3>智能推断</h3>
          <p>TypeScript能自动推断泛型的具体类型</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">⚡</div>
          <h3>性能优化</h3>
          <p>编译后泛型会擦除，不会增加运行时开销</p>
        </div>
      </div>
    </section>

    <section class="best-practice">
      <h2 class="section-title">🏆 最佳实践</h2>
      <div class="practice-tips">
        <div class="tip-card">
          <h3>命名约定</h3>
          <pre class="code-block"><code>// 使用有意义的单字母大写名称
function firstElement&lt;T&gt;(arr: T[]): T | undefined {
  return arr[0]
}

// 多个类型参数
function map&lt;K, V, R&gt;(
  obj: Record&lt;K, V&gt;,
  transform: (key: K, value: V) => R
): R[] {
  return Object.entries(obj).map(([k, v]) => transform(k as K, v as V))
}</code></pre>
        </div>
        <div class="tip-card">
          <h3>Vue中的泛型</h3>
          <pre class="code-block"><code>// 泛型组合式函数
function useFetch&lt;T&gt;(url: string): Promise&lt;T&gt; {
  return fetch(url).then(res => res.json())
}

// 在组件中使用
const user = await useFetch&lt;User&gt;('/api/user')

// 泛型组件
const GenericList = defineComponent({
  props: {
    items: Array as PropType&lt;T[]&gt;,
    renderItem: Function as PropType&lt;(item: T) => VNode&gt;
  }
})</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 示例泛型类型
type Nullable<T> = T | null
type Dictionary<T> = Record<string, T>

// 示例泛型函数
function lastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}

// 示例条件类型
type Flatten<T> = T extends Array<infer U> ? U : T
</script>

<style lang="less" scoped>
.generics-guide {
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

.generics-section {
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

.benefits-section {
  margin-bottom: 3rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.benefit-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;

  .benefit-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }

  h3 {
    margin: 0.5rem 0;
    color: #1e40af;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
  }
}

.best-practice {
  margin-top: 2rem;
}

.practice-tips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.tip-card {
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
