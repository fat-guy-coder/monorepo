<template>
  <div class="iterator-container">
    <header class="header">
      <h1 class="title">JavaScript 迭代器介绍</h1>
      <div class="subtitle">掌握遍历数据结构的核心机制</div>
    </header>

    <div class="content-grid">
      <!-- 左侧内容区域 -->
      <main class="main-content">
        <section class="section">
          <div class="concept-card">
            <h2 class="section-title">迭代器是什么？</h2>
            <p class="paragraph">
              <span class="highlight">迭代器（Iterator）</span>是 ECMAScript 6 引入的一种<span
                class="highlight"
                >遍历机制</span
              >，它提供了一种统一的方式来访问各种数据结构中的元素。迭代器是一个对象，它实现了<strong>迭代器协议</strong>，即包含一个返回迭代器对象的
              <code>next()</code> 方法。
            </p>
            <div class="illustration">
              <div class="iterator-flow">
                <div class="data">数据结构</div>
                <div class="arrow">→</div>
                <div class="iterator">迭代器</div>
                <div class="arrow">→</div>
                <div class="next">next()</div>
                <div class="arrow">→</div>
                <div class="result">{ value: any, done: boolean }</div>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">迭代器协议</h2>
          <div class="protocol-grid">
            <div class="protocol-card">
              <h3><code>next()</code> 方法</h3>
              <p>迭代器必须实现一个 <code>next()</code> 方法，该方法返回一个包含两个属性的对象：</p>
              <ul>
                <li><strong>value</strong>: 当前迭代的值</li>
                <li><strong>done</strong>: 布尔值，表示迭代是否完成</li>
              </ul>
            </div>
            <div class="protocol-card">
              <h3>迭代器示例</h3>
              <pre>
const iterator = {
  data: [1, 2, 3],
  index: 0,
  next() {
    return this.index < this.data.length
      ? { value: this.data[this.index++], done: false }
      : { value: undefined, done: true };
  }
};</pre
              >
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">创建与使用迭代器</h2>
          <div class="usage-container">
            <div class="usage-section">
              <h3>1. 数组迭代器</h3>
              <pre>
const arr = ['a', 'b', 'c'];
const arrIterator = arr[Symbol.iterator]();

console.log(arrIterator.next()); // { value: 'a', done: false }
console.log(arrIterator.next()); // { value: 'b', done: false }
console.log(arrIterator.next()); // { value: 'c', done: false }
console.log(arrIterator.next()); // { value: undefined, done: true }</pre
              >
            </div>

            <div class="usage-section">
              <h3>2. Map 迭代器</h3>
              <pre>
const map = new Map();
map.set('name', 'Alice');
map.set('age', 30);

const mapIterator = map[Symbol.iterator]();

console.log(mapIterator.next());
// { value: ['name', 'Alice'], done: false }

console.log(mapIterator.next());
// { value: ['age', 30], done: false }</pre
              >
            </div>

            <div class="usage-section">
              <h3>3. 自定义迭代器</h3>
              <pre>
class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    const step = this.step;

    return {
      next() {
        if ((step > 0 && current <= end) ||
            (step < 0 && current >= end)) {
          const value = current;
          current += step;
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
}

// 使用自定义迭代器
for (const num of new Range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}</pre
              >
            </div>
          </div>
        </section>
        <section class="section">
          <h2 class="section-title">迭代器使用场景</h2>
          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <div class="scenario-content">
              <h3>for...of 循环</h3>
              <p>遍历可迭代对象的标准方式</p>
              <pre>
for (const item of iterable) {
  // 处理每个元素
}</pre
              >
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔀</div>
            <div class="scenario-content">
              <h3>扩展运算符</h3>
              <p>将可迭代对象转换为数组</p>
              <pre>
const set = new Set([1, 2, 3]);
const arr = [...set]; // [1, 2, 3]</pre
              >
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🎯</div>
            <div class="scenario-content">
              <h3>解构赋值</h3>
              <p>从可迭代对象中提取值</p>
              <pre>
const [first, second] = 'abc';
// first = 'a', second = 'b'</pre
              >
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <div class="scenario-content">
              <h3>异步迭代</h3>
              <p>使用 async/await 处理异步数据流</p>
              <pre>
for await (const chunk of asyncIterable) {
  // 处理异步数据
}</pre
              >
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">内置可迭代对象</h2>
          <div class="builtin-grid">
            <div class="builtin-card">Array</div>
            <div class="builtin-card">String</div>
            <div class="builtin-card">Map</div>
            <div class="builtin-card">Set</div>
            <div class="builtin-card">TypedArray</div>
            <div class="builtin-card">NodeList</div>
            <div class="builtin-card">Arguments</div>
            <div class="builtin-card">Generator</div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">迭代器 vs 可迭代对象</h2>
          <div class="comparison-table">
            <div class="table-row header">
              <div class="table-cell">特性</div>
              <div class="table-cell">迭代器</div>
              <div class="table-cell">可迭代对象</div>
            </div>
            <div class="table-row">
              <div class="table-cell">定义</div>
              <div class="table-cell">具有 next() 方法的对象</div>
              <div class="table-cell">具有 [Symbol.iterator] 方法的对象</div>
            </div>
            <div class="table-row">
              <div class="table-cell">目的</div>
              <div class="table-cell">遍历元素</div>
              <div class="table-cell">提供迭代器</div>
            </div>
            <div class="table-row">
              <div class="table-cell">示例</div>
              <div class="table-cell">arr[Symbol.iterator]()</div>
              <div class="table-cell">数组、集合</div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <div class="benefits">
        <div class="benefit-card">
          <h3>迭代器的优点</h3>
          <ul>
            <li>统一的遍历接口</li>
            <li>支持惰性计算</li>
            <li>可以遍历无限序列</li>
            <li>节省内存空间</li>
          </ul>
        </div>
        <div class="benefit-card">
          <h3>注意事项</h3>
          <ul>
            <li>迭代器是单向的</li>
            <li>迭代完成后无法复用</li>
            <li>不支持随机访问</li>
            <li>同步迭代器无法处理异步</li>
          </ul>
        </div>
      </div>
      <p class="footer-summary">
        迭代器是 JavaScript
        中强大的抽象机制，它提供了一种统一的方式来遍历各种数据结构。理解迭代器对于编写现代
        JavaScript 代码至关重要。
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 示例迭代器状态
const iteratorExamples = ref([
  { name: '数组迭代器', code: 'arr[Symbol.iterator]()' },
  { name: '字符串迭代器', code: 'str[Symbol.iterator]()' },
  { name: 'Map 迭代器', code: 'map[Symbol.iterator]()' },
  { name: 'Set 迭代器', code: 'set[Symbol.iterator]()' },
  { name: '生成器函数', code: 'function* generator()' },
])
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4a6cf7;
@secondary-color: #6e45e2;
@accent-color: #ff6b6b;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(74, 108, 247, 0.08);
@code-bg: #f1f5ff;

// 基础样式
.iterator-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-light;
    font-weight: 400;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.section {
  margin-bottom: 2.5rem;
  background: @light-bg;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @primary-color;
    color: darken(@primary-color, 15%);
  }
}

.paragraph {
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.highlight {
  background-color: rgba(74, 108, 247, 0.12);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 500;
  color: darken(@primary-color, 10%);
}

// 概念卡片
.concept-card {
  padding: 1.5rem;
  border-radius: 10px;
  background: white;
  box-shadow: @card-shadow;
}

// 协议网格
.protocol-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.protocol-card {
  padding: 1.25rem;
  border-radius: 8px;
  background: white;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }

  h3 {
    margin-top: 0;
    font-size: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
    color: @primary-color;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.75rem;
    }
  }

  pre {
    background: @code-bg;
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    overflow-x: auto;
    margin-top: 1rem;
  }
}

// 使用场景卡片
.scenario-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1.25rem;
  background: white;
  border-radius: 8px;
  box-shadow: @card-shadow;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 6px 16px rgba(74, 108, 247, 0.15);
  }

  .scenario-icon {
    font-size: 1.8rem;
    min-width: 50px;
    height: 50px;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scenario-content {
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: @secondary-color;
    }

    p {
      margin: 0.25rem 0 0.75rem;
      color: @text-light;
      font-size: 0.95rem;
    }

    pre {
      background: @code-bg;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.85rem;
      overflow-x: auto;
    }
  }
}

// 迭代器流程图
.illustration {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: @card-shadow;
  overflow-x: auto;

  .iterator-flow {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    > div {
      padding: 0.75rem 1.25rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
      flex-shrink: 0;
    }

    .data {
      background: rgba(74, 108, 247, 0.15);
      color: darken(@primary-color, 15%);
      border: 1px solid rgba(74, 108, 247, 0.3);
    }

    .iterator {
      background: rgba(110, 69, 226, 0.15);
      color: darken(@secondary-color, 15%);
      border: 1px solid rgba(110, 69, 226, 0.3);
    }

    .next {
      background: rgba(255, 107, 107, 0.15);
      color: darken(@accent-color, 15%);
      border: 1px solid rgba(255, 107, 107, 0.3);
    }

    .result {
      background: rgba(76, 184, 135, 0.15);
      color: darken(#4cb887, 25%);
      border: 1px solid rgba(76, 184, 135, 0.3);
    }

    .arrow {
      color: @secondary-color;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    .iterator-flow {
      flex-direction: column;
      align-items: stretch;

      .arrow {
        text-align: center;
        &::before {
          content: '↓';
          display: block;
        }
      }
    }
  }
}

// 内置可迭代对象网格
.builtin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;

  .builtin-card {
    background: white;
    border: 1px solid @border-color;
    border-radius: 6px;
    padding: 0.75rem;
    text-align: center;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      background: @primary-color;
      color: white;
      border-color: @primary-color;
      box-shadow: 0 4px 8px rgba(74, 108, 247, 0.2);
    }
  }
}

// 比较表格
.comparison-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.95rem;

  .table-row {
    display: table-row;

    &.header {
      font-weight: 600;
      background: rgba(74, 108, 247, 0.08);
    }

    &:not(.header):hover {
      background: rgba(74, 108, 247, 0.03);
    }
  }

  .table-cell {
    display: table-cell;
    padding: 0.75rem;
    border-bottom: 1px solid @border-color;

    &:first-child {
      font-weight: 500;
      color: @primary-color;
    }
  }
}

// 使用示例容器
.usage-container {
  .usage-section {
    background: white;
    border-radius: 8px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
    box-shadow: @card-shadow;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
    }

    pre {
      background: @code-bg;
      padding: 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      overflow-x: auto;
      margin: 0;
    }
  }
}

// 页脚
.footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;

  .benefits {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .benefit-card {
    background: @light-bg;
    border-radius: 10px;
    padding: 1.25rem;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
      font-size: 1.2rem;
    }

    ul {
      padding-left: 1.25rem;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: @primary-color;
          font-weight: bold;
        }
      }
    }
  }

  .footer-summary {
    text-align: center;
    font-size: 1.05rem;
    font-weight: 500;
    margin: 1.5rem 0 0;
    padding: 1.25rem;
    background: linear-gradient(135deg, rgba(74, 108, 247, 0.08), rgba(110, 69, 226, 0.08));
    border-radius: 10px;
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .iterator-container {
    padding: 1rem;
  }

  .header .title {
    font-size: 2rem;
  }

  .protocol-grid {
    grid-template-columns: 1fr;
  }
}

code,
pre {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
}

pre {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, @primary-color, @secondary-color);
    border-radius: 4px 0 0 4px;
  }
}
</style>
