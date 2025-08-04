<template>
  <div class="async-update-container">
    <header class="header">
      <h1>Vue<span class="highlight">异步更新</span>原理</h1>
      <p class="subtitle">深入理解Vue的响应式更新机制与优化策略</p>
    </header>

    <div class="content">
      <section class="card concept">
        <div class="concept-content">
          <div class="concept-text">
            <h2>什么是异步更新？</h2>
            <p>Vue的异步更新机制是指当响应式数据发生变化时，Vue不会立即更新DOM，而是将这些更新操作放入一个队列中，在下一个事件循环中批量执行。</p>

            <div class="key-benefits">
              <div class="benefit">
                <div class="icon">🚀</div>
                <h3>性能优化</h3>
                <p>避免不必要的重复渲染</p>
              </div>
              <div class="benefit">
                <div class="icon">🧩</div>
                <h3>批处理更新</h3>
                <p>合并多个数据变更</p>
              </div>
              <div class="benefit">
                <div class="icon">🔁</div>
                <h3>避免中间状态</h3>
                <p>确保DOM更新的一致性</p>
              </div>
            </div>
          </div>
          <div class="concept-image">
            <div class="update-flow">
              <div class="step">数据变更</div>
              <div class="arrow">→</div>
              <div class="step">更新队列</div>
              <div class="arrow">→</div>
              <div class="step">事件循环</div>
              <div class="arrow">→</div>
              <div class="step">DOM更新</div>
            </div>
          </div>
        </div>
      </section>

      <section class="card why-async">
        <h2>为什么需要异步更新？</h2>
        <div class="reasons">
          <div class="reason">
            <div class="reason-icon">1️⃣</div>
            <h3>性能优化</h3>
            <p>避免频繁操作DOM导致的性能问题。Vue会将多个数据变更合并为一次更新操作。</p>
          </div>
          <div class="reason">
            <div class="reason-icon">2️⃣</div>
            <h3>避免重复渲染</h3>
            <p>在同一个事件循环中多次修改数据，只触发一次组件渲染。</p>
          </div>
          <div class="reason">
            <div class="reason-icon">3️⃣</div>
            <h3>保证更新顺序</h3>
            <p>确保组件更新顺序符合预期，避免更新过程中的不一致状态。</p>
          </div>
          <div class="reason">
            <div class="reason-icon">4️⃣</div>
            <h3>利用事件循环</h3>
            <p>利用JavaScript事件循环机制，在微任务或宏任务中执行更新。</p>
          </div>
        </div>

        <div class="problem-example">
          <h3>同步更新问题示例</h3>
          <div class="example-content">
            <div class="code-block">
              <pre>// 同步更新时的伪代码
function updateData() {
  data.a = 1;  // 触发DOM更新
  data.b = 2;  // 再次触发DOM更新
  data.c = 3;  // 第三次触发DOM更新
}</pre>
              <div class="result">
                <div class="dom-update">DOM更新 1</div>
                <div class="dom-update">DOM更新 2</div>
                <div class="dom-update">DOM更新 3</div>
                <p class="performance">性能消耗: 高 (3次DOM操作)</p>
              </div>
            </div>
            <div class="vs">VS</div>
            <div class="code-block">
              <pre>// Vue异步更新伪代码
function updateData() {
  data.a = 1;  // 加入队列
  data.b = 2;  // 加入队列
  data.c = 3;  // 加入队列
  // 下一个事件循环中批量更新
  nextTick(() => {
    // 执行一次DOM更新
  });
}</pre>
              <div class="result">
                <div class="dom-update batch">批量DOM更新</div>
                <p class="performance good">性能消耗: 低 (1次DOM操作)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card implementation">
        <h2>实现原理与伪代码</h2>
        <div class="implementation-content">
          <div class="core-concepts">
            <h3>核心概念</h3>
            <ul>
              <li><strong>Watcher</strong> - 观察者，负责执行更新</li>
              <li><strong>Dep</strong> - 依赖收集器，管理Watcher依赖</li>
              <li><strong>Queue</strong> - 更新队列，存储待执行的Watcher</li>
              <li><strong>nextTick</strong> - 将回调延迟到下次DOM更新循环之后执行</li>
            </ul>
          </div>

          <div class="pseudo-code">
            <h3>Vue异步更新伪代码实现</h3>
            <pre class="code-block">// 更新队列
let queue = [];
let flushing = false;
let waiting = false;

// 将Watcher添加到队列
function queueWatcher(watcher) {
  if (!queue.includes(watcher)) {
    queue.push(watcher);
  }

  if (!waiting) {
    waiting = true;
    // 下一个事件循环执行flushQueue
    nextTick(flushQueue);
  }
}

// 执行队列中的所有Watcher
function flushQueue() {
  flushing = true;

  // 排序队列，确保正确的更新顺序
  queue.sort((a, b) => a.id - b.id);

  // 执行每个Watcher的run方法
  for (let i = 0; i < queue.length; i++) {
    const watcher = queue[i];
    watcher.run();
  }

  // 重置队列状态
  resetQueue();
}

function resetQueue() {
  queue = [];
  flushing = false;
  waiting = false;
}

// nextTick实现
const callbacks = [];
let pending = false;

function nextTick(cb) {
  callbacks.push(cb);

  if (!pending) {
    pending = true;
    // 根据环境选择微任务或宏任务实现
    if (typeof Promise !== 'undefined') {
      Promise.resolve().then(flushCallbacks);
    } else if (typeof MutationObserver !== 'undefined') {
      // 使用MutationObserver
    } else {
      // 降级到setTimeout
      setTimeout(flushCallbacks, 0);
    }
  }
}

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}</pre>
          </div>
        </div>
      </section>

      <section class="card event-loop">
        <h2>事件循环与更新时机</h2>
        <div class="loop-content">
          <div class="loop-diagram">
            <div class="loop-stage">
              <div class="stage-title">同步代码执行</div>
              <div class="stage-example">
                <div class="code-line">data.value = 1;</div>
                <div class="code-line">data.value = 2;</div>
                <div class="code-line">data.value = 3;</div>
              </div>
            </div>
            <div class="arrow-down">↓</div>
            <div class="loop-stage">
              <div class="stage-title">微任务队列</div>
              <div class="stage-items">
                <div class="microtask">flushCallbacks</div>
                <div class="microtask">Promise回调</div>
              </div>
            </div>
            <div class="arrow-down">↓</div>
            <div class="loop-stage">
              <div class="stage-title">DOM更新</div>
              <div class="stage-items">
                <div class="dom-update">执行批量更新</div>
              </div>
            </div>
            <div class="arrow-down">↓</div>
            <div class="loop-stage">
              <div class="stage-title">宏任务队列</div>
              <div class="stage-items">
                <div class="macrotask">setTimeout回调</div>
                <div class="macrotask">setInterval回调</div>
                <div class="macrotask">UI渲染</div>
              </div>
            </div>
          </div>

          <div class="loop-explanation">
            <h3>更新过程基础介绍</h3>
            <ol>
              <li>在同步代码中修改响应式数据时，触发setter</li>
              <li>setter通知依赖的Watcher，将其加入更新队列</li>
              <li>通过nextTick将flushQueue回调加入微任务队列</li>
              <li>同步代码执行完成后，开始执行微任务队列</li>
              <li>执行flushQueue，批量运行所有Watcher的更新函数</li>
              <li>Watcher更新函数执行虚拟DOM diff并更新实际DOM</li>
              <li>UI渲染（可能作为宏任务执行）</li>
            </ol>

            <div class="important-note">
              <div class="note-icon">💡</div>
              <p>Vue优先使用<strong>微任务(Promise)</strong>实现nextTick，确保在UI渲染前完成DOM更新。在不支持Promise的环境中会降级到宏任务(setTimeout)。</p>
            </div>
          </div>
        </div>
      </section>

      <section class="card next-tick">
        <h2>nextTick 使用与原理</h2>
        <div class="next-tick-content">
          <div class="usage">
            <h3>nextTick 使用场景</h3>
            <div class="usage-examples">
              <div class="example">
                <h4>DOM更新后操作</h4>
                <pre class="code-block">import { nextTick } from 'vue';

changeData() {
  this.message = '更新后的值';

  nextTick(() => {
    // DOM已经更新
    const element = document.getElementById('message');
    console.log(element.textContent); // '更新后的值'
  });
}</pre>
              </div>
              <div class="example">
                <h4>等待多个状态更新</h4>
                <pre class="code-block">async updateAll() {
  this.a = 1;
  this.b = 2;
  this.c = 3;

  await nextTick();
  // 所有DOM更新已完成
  this.performPostUpdateAction();
}</pre>
              </div>
            </div>
          </div>

          <div class="internal">
            <h3>nextTick 内部机制</h3>
            <div class="mechanism">
              <pre class="code-block">// 简化版nextTick实现
const callbacks = [];
let pending = false;

export function nextTick(callback) {
  // 将回调推入队列
  callbacks.push(() => {
    if (callback) callback();
  });

  if (!pending) {
    pending = true;
    // 选择最佳异步执行方式
    if (typeof Promise !== 'undefined') {
      Promise.resolve().then(flushCallbacks);
    } else if (typeof MutationObserver !== 'undefined') {
      // 使用MutationObserver监听DOM变化
      const observer = new MutationObserver(flushCallbacks);
      const textNode = document.createTextNode('1');
      observer.observe(textNode, { characterData: true });
      textNode.data = '2';
    } else {
      // 降级方案
      setTimeout(flushCallbacks, 0);
    }
  }
}

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (const callback of copies) {
    callback();
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="card best-practices">
        <h2>最佳实践与注意事项</h2>
        <div class="practices">
          <div class="practice">
            <h3>✅ 正确使用异步更新</h3>
            <ul>
              <li>在数据变化后需要操作DOM时，使用<code>nextTick</code></li>
              <li>避免在同一个事件循环中频繁修改数据</li>
              <li>使用计算属性和侦听器优化复杂逻辑</li>
            </ul>
          </div>

          <div class="practice">
            <h3>⚠️ 常见错误与陷阱</h3>
            <ul>
              <li>在数据变化后立即访问DOM属性（此时DOM尚未更新）</li>
              <li>误解异步更新时机导致逻辑错误</li>
              <li>在循环中修改大量数据导致性能问题</li>
            </ul>
          </div>

          <div class="practice">
            <h3>💡 性能优化建议</h3>
            <ul>
              <li>将大块数据更新拆分为多个异步任务</li>
              <li>使用<code>v-once</code>处理静态内容</li>
              <li>复杂列表使用虚拟滚动</li>
              <li>使用<code>requestAnimationFrame</code>优化动画</li>
            </ul>
          </div>
        </div>

        <div class="performance-tip">
          <div class="tip-icon">🚀</div>
          <p>Vue的异步更新机制通常足够高效，但在处理超大列表或复杂组件时，合理使用<code>nextTick</code>和优化策略可以进一步提升性能。</p>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Vue异步更新原理 | 深入响应式系统的核心机制</p>
      <div class="links">
        <a href="https://vuejs.org/guide/essentials/reactivity-fundamentals.html" target="_blank">官方文档</a>
        <a href="https://github.com/vuejs/core" target="_blank">源码实现</a>
        <a href="https://vueschool.io/articles/vuejs-tutorials/understanding-vue-js-reactivity/"
          target="_blank">深入教程</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 示例响应式数据
const activeSection = ref('concept');

onMounted(() => {
  console.log('Vue异步更新原理组件已挂载');
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.async-update-container {
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #334155;
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 700;
    color: #1e293b;

    .highlight {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e2e8f0;
    color: #1e293b;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: #3b82f6;
    }
  }
}

.concept {
  .concept-content {
    display: flex;
    gap: 30px;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .concept-text {
    flex: 1;

    p {
      margin-bottom: 20px;
      font-size: 1.1rem;
      color: #475569;
    }

    .key-benefits {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 30px;

      .benefit {
        text-align: center;
        padding: 25px 15px;
        background: #f0f7ff;
        border-radius: 10px;
        border: 1px solid #dbeafe;
        transition: all 0.3s ease;

        &:hover {
          background: #dbeafe;
          transform: translateY(-5px);
        }

        .icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #1e293b;
        }

        p {
          font-size: 0.95rem;
          color: #64748b;
          margin-bottom: 0;
        }
      }
    }
  }

  .concept-image {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .update-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 30px 20px;
    max-width: 600px;
    width: 100%;

    .step {
      background: #3b82f6;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      font-weight: 600;
      min-width: 120px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
    }

    .arrow {
      font-size: 1.5rem;
      color: #94a3b8;
      font-weight: bold;
    }
  }
}

.why-async {
  .reasons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .reason {
      background: white;
      border-radius: 10px;
      padding: 25px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      display: flex;
      gap: 15px;
      align-items: flex-start;

      &:hover {
        border-color: #3b82f6;
        box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
      }

      .reason-icon {
        font-size: 1.5rem;
        background: #e0f2fe;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: #0ea5e9;
      }

      h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: #1e293b;
      }

      p {
        color: #64748b;
        font-size: 0.95rem;
      }
    }
  }

  .problem-example {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
      text-align: center;
    }
  }

  .example-content {
    display: flex;
    justify-content: space-between;
    gap: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .vs {
      font-size: 2rem;
      font-weight: bold;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .code-block {
    flex: 1;
    background: #1e293b;
    color: #e2e8f0;
    padding: 18px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
    position: relative;
    border: 1px solid #334155;

    pre {
      margin: 0;
      padding: 0;
      background: transparent;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px 8px 0 0;
    }
  }

  .result {
    margin-top: 15px;
    text-align: center;

    .dom-update {
      background: #fecaca;
      color: #b91c1c;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-weight: 500;

      &.batch {
        background: #bbf7d0;
        color: #166534;
      }
    }

    .performance {
      font-weight: 500;
      color: #64748b;

      &.good {
        color: #166534;
        font-weight: 600;
      }
    }
  }
}

.implementation {
  .implementation-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .core-concepts {
    background: #f0f7ff;
    border-radius: 10px;
    padding: 25px;
    border-left: 4px solid #3b82f6;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 15px;
        line-height: 1.7;

        strong {
          color: #1d4ed8;
        }
      }
    }
  }

  .pseudo-code {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }
  }
}

.event-loop {
  .loop-content {
    display: flex;
    gap: 30px;

    @media (max-width: 900px) {
      flex-direction: column;
    }
  }

  .loop-diagram {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 30px;
    border: 1px solid #e2e8f0;

    .loop-stage {
      width: 100%;
      padding: 20px;
      margin-bottom: 15px;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .stage-title {
      font-weight: 600;
      margin-bottom: 15px;
      color: #3b82f6;
      padding-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
    }

    .stage-example,
    .stage-items {
      padding: 10px;
    }

    .code-line {
      background: #f8fafc;
      padding: 8px 12px;
      margin-bottom: 8px;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      border: 1px dashed #cbd5e1;
    }

    .microtask {
      background: #dcfce7;
      color: #166534;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .dom-update {
      background: #dbeafe;
      color: #1d4ed8;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .macrotask {
      background: #ffedd5;
      color: #9a3412;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .arrow-down {
      font-size: 1.8rem;
      color: #94a3b8;
      margin: 10px 0;
    }
  }

  .loop-explanation {
    flex: 1;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }

    ol {
      padding-left: 25px;
      margin-bottom: 25px;

      li {
        margin-bottom: 15px;
        line-height: 1.7;
        padding-left: 10px;
      }
    }

    .important-note {
      background: #fffbeb;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      gap: 15px;
      align-items: center;
      border-left: 4px solid #f59e0b;

      .note-icon {
        font-size: 1.8rem;
        color: #f59e0b;
      }

      p {
        color: #78350f;

        strong {
          color: #b45309;
        }
      }
    }
  }
}

.next-tick {
  .next-tick-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .usage,
  .internal {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;
  }

  .usage-examples {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;

    .example {
      h4 {
        font-size: 1.2rem;
        margin-bottom: 15px;
        color: #1e293b;
      }
    }
  }
}

.best-practices {
  .practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 30px;

    .practice {
      background: #f8fafc;
      border-radius: 10px;
      padding: 25px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 15px;
        color: #1e293b;
        padding-bottom: 10px;
        border-bottom: 1px solid #e2e8f0;
      }

      ul {
        padding-left: 25px;

        li {
          margin-bottom: 12px;
          line-height: 1.6;
          color: #475569;

          code {
            background: #e2e8f0;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Fira Code', monospace;
          }
        }
      }
    }
  }

  .performance-tip {
    background: #f0fdf4;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    gap: 15px;
    align-items: center;
    border-left: 4px solid #10b981;

    .tip-icon {
      font-size: 2rem;
      color: #10b981;
    }

    p {
      color: #166534;
      font-weight: 500;
    }
  }
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 15px 0;
  line-height: 1.5;
  border: 1px solid #334155;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px 8px 0 0;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px 0;
  border-top: 1px solid #e2e8f0;
  color: #64748b;

  .links {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;

    a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
      position: relative;
      padding: 5px 10px;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 2px;
        background: #3b82f6;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }
}
</style>
