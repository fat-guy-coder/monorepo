<template>
  <div class="iterator-doc">
    <header class="doc-header">
      <h1>ES Iterator 指南</h1>
    </header>

    <main class="doc-content">
      <section class="section concept">
        <h2>🔍 迭代器核心概念</h2>
        <h3>迭代器与迭代器协议</h3>
        <p>迭代器是一种访问集合元素的方式，允许我们逐个访问集合中的元素而不需要暴露集合的内部结构。迭代器协议定义了如何实现迭代器，使得对象可以被遍历。</p>
        <div class="definition-box">
          <div><strong>迭代协议</strong>由两部分组成：<br />
            1. **Iterable**: 任何实现了 `@@iterator` 方法的对象，允许使用 `for...of` 循环进行遍历。<br />
            2. **Iterator**: 迭代器对象，包含 `next()` 方法，每次调用返回一个包含 `value` 和 `done` 属性的对象。</div>

        </div>

        <div class="structure">
          <h3>🏗️ 迭代器工作流程</h3>
          <pre class="mermaid">
            flowchart LR
            A[可迭代对象] --> B[调用Symbol.iterator]
            B --> C[获取迭代器对象]
            C --> D{调用next()}
            D -->|返回value,done| E[处理值]
            E --> D
          </pre>
        </div>
      </section>

      <section class="section usage">
        <h2>🛠️ 基本使用方法</h2>

        <div class="code-group">
          <div class="code-block">
            <h3>原生对象迭代</h3>
            <pre><code class="language-typescript">// 数组迭代
const arr = [1, 2, 3];
const it = arr[Symbol.iterator]();

console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: undefined, done: true }</code></pre>
          </div>

          <div class="code-block">
            <h3>自定义迭代器</h3>
            <pre><code class="language-typescript">class Range implements Iterable&lt;number&gt; {
  constructor(
    public start: number,
    public end: number,
    public step = 1
  ) {}

  *[Symbol.iterator](): Iterator&lt;number&gt; {
    let current = this.start;
    while (current <= this.end) {
      yield current;
      current += this.step;
    }
  }
}

// 使用示例
for (const num of new Range(1, 5)) {
  console.log(num); // 1,2,3,4,5
}</code></pre>
          </div>
        </div>
      </section>

      <section class="section scenarios">
        <h2>🎯 主要应用场景</h2>

        <div class="scenario-cards">
          <div class="card">
            <h3>🔄 自定义数据结构</h3>
            <ul>
              <li>树形结构遍历</li>
              <li>矩阵行列迭代</li>
              <li>分页数据流</li>
            </ul>
          </div>

          <div class="card">
            <h3>🎮 惰性求值</h3>
            <ul>
              <li>大数据分块处理</li>
              <li>无限序列生成</li>
              <li>按需加载数据</li>
            </ul>
          </div>

          <div class="card">
            <h3>🛠️ 通用迭代模式</h3>
            <ul>
              <li>统一迭代接口</li>
              <li>与解构赋值配合</li>
              <li>扩展运算符使用</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section considerations">
        <h2>⚠️ 重要注意事项</h2>

        <div class="warning-cards">
          <div class="warning">
            <h3>❌ 不可重用性</h3>
            <p>迭代器是消耗品，遍历完成后需要重新获取</p>
            <pre><code class="language-typescript">const it = [1,2,3][Symbol.iterator]();
console.log([...it]); // [1,2,3]
console.log([...it]); // []</code></pre>
          </div>

          <div class="warning">
            <h3>⏸️ 可中断迭代</h3>
            <p>使用return方法实现清理逻辑</p>
            <pre><code class="language-typescript">const iterable = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next() { /*...*/ },
      return() {
        console.log('Iteration stopped');
        return { done: true };
      }
    };
  }
};</code></pre>
          </div>

          <div class="warning">
            <h3>♾️ 无限迭代</h3>
            <p>需要明确的终止条件</p>
            <pre><code class="language-typescript">function* infiniteSeq() {
  let n = 0;
  while(true) { // 必须谨慎使用
    yield n++;
  }
}</code></pre>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
pre {
  color: #fff;
}

.iterator-doc {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
}

.doc-header {
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 1.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.section {
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #42b883;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.code-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.code-block {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

pre {
  background: #1e1e1e !important;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: #fff;
}

.scenario-cards,
.warning-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.card,
.warning {
  padding: 1.5rem;
  border-radius: 8px;
  background: #f8f9fa;
}

.warning {
  background: #fff5f5;
  border-left: 4px solid #ff6b6b;
}

.definition-box {
  background: #e3fafc;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.mermaid {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

@media (max-width: 768px) {

  .code-group,
  .scenario-cards,
  .warning-cards {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 1rem;
  }
}
</style>
