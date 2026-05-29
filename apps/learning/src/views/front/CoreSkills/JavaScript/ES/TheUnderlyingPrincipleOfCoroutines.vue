<template>
  <div class="generator-container">
    <!-- 头部标题区 -->
    <header class="generator-header">
      <div class="header-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4 6h16M4 12h10M4 18h16" />
          <circle cx="17" cy="12" r="2.5" fill="currentColor" stroke="none" />
          <path d="M17 9.5v-2M17 14.5v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </div>
      <div class="header-text">
        <h1 class="title">生成器 (Generator)</h1>
        <p class="subtitle">协程与执行上下文栈的底层运作机制</p>
      </div>
    </header>

    <!-- 核心概念卡片 -->
    <section class="card concept-card">
      <h2 class="card-title">
        <span class="card-title-icon">⚡</span>
        什么是生成器？
      </h2>
      <p class="card-desc">
        <strong>生成器函数</strong>（<code class="inline-code">function*</code>）是 ES6 引入的一种特殊函数，它能被<strong>暂停和恢复</strong>。
        从实现角度看，生成器本质是一个<strong>携带状态的迭代器</strong>，每次调用 <code class="inline-code">next()</code> 方法，它都会从上次暂停的地方继续执行，
        直到遇见下一个 <code class="inline-code">yield</code> 表达式或函数结束。
      </p>
      <div class="highlight-box">
        <span class="highlight-label">协程</span>
        生成器是 JavaScript 对<strong>半协程（semi-coroutine）</strong>的一种实现。它允许函数执行中途让出控制权，并在之后重新获取控制权，而整个过程发生在单线程内。
      </div>
    </section>

    <!-- 协程与调用栈卡片（重点） -->
    <section class="card stack-card">
      <h2 class="card-title">
        <span class="card-title-icon">🧠</span>
        底层原理：执行上下文栈与协程调度
      </h2>
      <div class="stack-visual">
        <div class="stack-frames">
          <div class="frame label">全局执行上下文</div>
          <div class="frame active" v-if="stackState === 'run'">生成器执行上下文 (运行中)</div>
          <div class="frame saved" v-else-if="stackState === 'suspend'">生成器上下文已保存 (暂停)</div>
          <div class="frame empty" v-else>生成器上下文已结束</div>
        </div>
        <div class="stack-controls">
          <button :class="{ active: stackState === 'run' }" @click="stackState = 'run'">▶ 执行中 (Executing)</button>
          <button :class="{ active: stackState === 'suspend' }" @click="stackState = 'suspend'">⏸ 暂停
            (Suspended)</button>
          <button :class="{ active: stackState === 'closed' }" @click="stackState = 'closed'">⏹ 结束 (Closed)</button>
        </div>
      </div>
      <div class="stack-explanation">
        <p>
          <strong>JavaScript 引擎维护一个执行上下文栈（调用栈）</strong>。普通函数调用会将新的执行上下文推入栈顶，函数返回时弹出。
          但生成器函数不同：
        </p>
        <ul class="step-list">
          <li>
            <span class="step-marker">1</span>
            <span><strong>创建生成器</strong> —— 调用 <code class="inline-code">function*</code>
              并不会立即执行函数体，而是创建一个<strong>生成器对象</strong>，其内部槽位 <code>[[GeneratorContext]]</code>
              保存了函数的执行上下文，但该上下文<strong>被挂起</strong>，不推入调用栈。</span>
          </li>
          <li>
            <span class="step-marker">2</span>
            <span><strong>调用 <code>next()</code></strong> —— 引擎将保存的生成器上下文重新推入栈顶，恢复执行。此时生成器处于 <code>executing</code>
              状态。</span>
          </li>
          <li>
            <span class="step-marker">3</span>
            <span><strong>遇到 <code>yield</code></strong> —— 引擎执行 <code>GeneratorYield</code>
              抽象操作：将当前上下文从栈顶移除，并把<strong>代码位置、词法环境、变量状态</strong>完整保存回
              <code>[[GeneratorContext]]</code>，然后将值返回给外部调用者。生成器转为 <code>suspended</code> 状态。</span>
          </li>
          <li>
            <span class="step-marker">4</span>
            <span><strong>再次调用 <code>next()</code></strong> —— 重复步骤2，从上次保存的位置继续，并可接收外部传入的值作为 <code>yield</code>
              表达式的结果。</span>
          </li>
          <li>
            <span class="step-marker">5</span>
            <span><strong>函数结束或 <code>return</code></strong> —— 生成器上下文被销毁，状态变为 <code>completed</code>。后续
              <code>next()</code> 返回 <code>{ value: undefined, done: true }</code>。</span>
          </li>
        </ul>
        <p class="card-note">
          正是这种<strong>“保存执行上下文 → 弹出 → 重新推入”</strong>的机制，让生成器函数可以跨越多个调用栈帧实现暂停与恢复，这也是协程最核心的实现方式。
        </p>
      </div>
    </section>

    <!-- 生成器状态机卡片 -->
    <section class="card state-card">
      <h2 class="card-title">
        <span class="card-title-icon">🔄</span>
        生成器的内部状态转换
      </h2>
      <div class="state-diagram">
        <div class="state-item" :class="{ highlight: currentState === 'suspendedStart' }">
          <span class="state-name">suspendedStart</span>
          <span class="state-desc">创建后，初始暂停</span>
        </div>
        <span class="arrow" @click="currentState = 'executing'">→ next() →</span>
        <div class="state-item" :class="{ highlight: currentState === 'executing' }">
          <span class="state-name">executing</span>
          <span class="state-desc">正在执行</span>
        </div>
        <span class="arrow" @click="currentState = 'suspendedYield'">→ yield →</span>
        <div class="state-item" :class="{ highlight: currentState === 'suspendedYield' }">
          <span class="state-name">suspendedYield</span>
          <span class="state-desc">遇到 yield，暂停</span>
        </div>
        <span class="arrow" @click="currentState = 'executing'">→ next() →</span>
        <div class="state-item" :class="{ highlight: currentState === 'completed' }">
          <span class="state-name">completed</span>
          <span class="state-desc">执行完毕（return）</span>
        </div>
      </div>
      <p class="state-note">
        点击箭头可查看状态流转。生成器的 <code>[[GeneratorState]]</code> 内部槽位严格遵循该状态机，<strong>任何时刻只能处于其中一个状态</strong>。
      </p>
    </section>

    <!-- 双向通信卡片 -->
    <section class="card communication-card">
      <h2 class="card-title">
        <span class="card-title-icon">📡</span>
        yield 与 next 的双向数据通道
      </h2>
      <div class="com-pair">
        <div class="com-box out">
          <div class="com-label">生成器 → 外部</div>
          <code class="com-code">yield 返回值</code>
          <p>每次执行 <code>yield</code> 时，其右侧表达式的值会作为本次 <code>next()</code> 返回对象的 <code>value</code> 传出。</p>
        </div>
        <div class="com-arrow">⇄</div>
        <div class="com-box in">
          <div class="com-label">外部 → 生成器</div>
          <code class="com-code">next(arg) 传入</code>
          <p>调用 <code>next(arg)</code> 时，参数 <code>arg</code> 会成为<strong>上一次</strong> <code>yield</code>
            表达式的结果值，在生成器内部恢复后使用。</p>
        </div>
      </div>
      <div class="code-block">
        <pre><code><span class="token-keyword">function*</span> <span class="token-func">twoWay</span>() {
  <span class="token-keyword">const</span> received = <span class="token-keyword">yield</span> <span class="token-string">'Hello from generator'</span>;
  <span class="token-keyword">yield</span> <span class="token-string">`Received: </span><span class="token-interpolation">${received}</span><span class="token-string">`</span>;
}

<span class="token-keyword">const</span> gen = <span class="token-func">twoWay</span>();
console.<span class="token-method">log</span>(gen.<span class="token-method">next</span>().<span class="token-property">value</span>);  <span class="token-comment">// 'Hello from generator'</span>
console.<span class="token-method">log</span>(gen.<span class="token-method">next</span>(<span class="token-string">'DATA'</span>).<span class="token-property">value</span>); <span class="token-comment">// 'Received: DATA'</span></code></pre>
      </div>
    </section>

    <!-- 进阶示例卡片 -->
    <section class="card example-card">
      <h2 class="card-title">
        <span class="card-title-icon">🧪</span>
        深入理解：手动模拟生成器调度
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
      <p class="example-desc">{{ currentExample.desc }}</p>
    </section>

    <!-- 注意事项卡片 -->
    <footer class="card warning-card">
      <h2 class="card-title">
        <span class="card-title-icon">⚠️</span>
        关键要点与注意事项
      </h2>
      <div class="warning-list">
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span>生成器上下文被保存在堆内存中，不会随调用栈弹出而销毁，因此生成器可以<strong>跨多次事件循环恢复</strong>。</span>
        </div>
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span>生成器是单线程模型下的协作式多任务，并非真正的并行。引擎绝不会抢占生成器的执行，只有显式 <code>yield</code> 才能让出控制权。</span>
        </div>
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span><code>yield*</code> 表达式用于委托给另一个生成器或可迭代对象，底层会自动处理内外 <code>next()</code> 和 <code>return()</code>
            的转发。</span>
        </div>
        <div class="warning-item">
          <span class="warning-dot"></span>
          <span>生成器对象的 <code>return()</code> 和 <code>throw()</code> 方法可以提前终止生成器或向其内部注入异常，这是生成器完成清理工作的关键。</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 栈状态演示
type StackView = 'run' | 'suspend' | 'closed'
const stackState = ref<StackView>('suspend')

// 状态机演示
type GenState = 'suspendedStart' | 'executing' | 'suspendedYield' | 'completed'
const currentState = ref<GenState>('suspendedStart')

// 代码示例
interface ExampleItem {
  label: string
  code: string
  desc: string
}

const activeExample = ref<string>('异步流程控制')

const examples: ExampleItem[] = [
  {
    label: '异步流程控制',
    code: `// 🧵 用生成器模拟 async/await 的早期思想
function asyncFlow(generatorFunc: () => Generator) {
  const iterator = generatorFunc();
  function handle(result: IteratorResult<any>) {
    if (result.done) return Promise.resolve(result.value);
    return Promise.resolve(result.value).then(
      res => handle(iterator.next(res)),
      err => handle(iterator.throw(err))
    );
  }
  try {
    return handle(iterator.next());
  } catch (e) {
    return Promise.reject(e);
  }
}

// 使用方式
asyncFlow(function* () {
  const user = yield fetch('/api/user').then(r => r.json());
  const posts = yield fetch(\`/api/posts/\${user.id}\`).then(r => r.json());
  return posts;
}).then(result => console.log('最终结果', result));`,
    desc: '通过手动控制生成器的 next/throw，我们可以在 yield 后等待 Promise 完成，再将结果传回生成器内部，这就是 async/await 的雏形。'
  },
  {
    label: '状态机实现',
    code: `// 🤖 用生成器实现一个可暂停的有限状态机
function* trafficLight() {
  while (true) {
    yield '🔴 RED';
    yield '🟡 YELLOW';
    yield '🟢 GREEN';
  }
}

const light = trafficLight();
console.log(light.next().value); // 🔴 RED
console.log(light.next().value); // 🟡 YELLOW
console.log(light.next().value); // 🟢 GREEN
// 无限循环，但每次都从上次 yield 后继续，不会阻塞`,
    desc: '生成器内部的 while(true) 是安全的，因为 yield 会暂停循环。这种特性非常适合实现无限序列和状态机。'
  },
  {
    label: '惰性求值',
    code: `// 🦥 惰性计算斐波那契数列（无限序列）
function* fibonacci(): Generator<number> {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
const first5 = Array.from({ length: 5 }, () => fib.next().value);
console.log(first5); // [1, 1, 2, 3, 5]

// 按需取用，不会一次性计算所有值`,
    desc: '生成器只在调用 next() 时才计算下一个值，实现了惰性求值，极大节省了内存（特别是对于无限序列）。'
  }
]

const currentExample = computed<ExampleItem>(() => {
  return examples.find(e => e.label === activeExample.value) ?? examples[0]
})
</script>

<style lang="less" scoped>
// ========== 变量定义 ==========
@bg-primary: #fafbfc;
@bg-card: #ffffff;
@text-primary: #1a1a2e;
@text-secondary: #4b5563;
@text-muted: #8b919e;
@accent: #0d9488; // teal-600
@accent-light: #f0fdfa; // teal-50
@accent-glow: rgba(13, 148, 136, 0.08);
@border: #e2e8f0;
@border-light: #f1f5f9;
@shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03);
@shadow-md: 0 4px 16px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.03);
@radius-lg: 16px;
@radius-md: 12px;
@radius-sm: 8px;
@transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

// ========== 容器 ==========
.generator-container {
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  color: @text-primary;
  line-height: 1.7;
  background: @bg-primary;
  min-height: 100vh;
}

// ========== 头部 ==========
.generator-header {
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
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, @accent 0%, #0f766e 100%);
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
  background: #f1f5f9;
  color: #0f766e;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 0.9em;
  font-weight: 500;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
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

  .token-keyword {
    color: #cba6f7;
  }

  .token-func {
    color: #f9e2af;
  }

  .token-string {
    color: #a6e3a1;
  }

  .token-interpolation {
    color: #fab387;
  }

  .token-method {
    color: #89dceb;
  }

  .token-property {
    color: #89b4fa;
  }

  .token-comment {
    color: #6c7086;
  }

  &.large-code {
    min-height: 160px;
    max-height: 340px;
    overflow-y: auto;
  }
}

// ========== 栈可视化 ==========
.stack-visual {
  margin-bottom: 20px;
}

.stack-frames {
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
  margin-bottom: 16px;

  .frame {
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 0.85rem;
    border: 1px solid @border;
    background: #f8fafc;
    color: @text-secondary;

    &.label {
      border-style: dashed;
    }

    &.active {
      background: #e0f2fe;
      border-color: #0ea5e9;
      color: #0369a1;
      font-weight: 600;
    }

    &.saved {
      background: #fef3c7;
      border-color: #d97706;
      color: #92400e;
      font-weight: 600;
    }

    &.empty {
      background: #f1f5f9;
      color: @text-muted;
    }
  }
}

.stack-controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  button {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid @border;
    background: white;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all @transition;

    &:hover {
      background: @accent-light;
    }

    &.active {
      background: @accent;
      color: white;
      border-color: @accent;
    }
  }
}

.stack-explanation {
  .step-list {
    list-style: none;
    padding: 0;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      font-size: 0.9rem;
      color: @text-secondary;

      .step-marker {
        width: 20px;
        height: 20px;
        background: @accent;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        font-weight: 700;
        flex-shrink: 0;
        margin-top: 2px;
      }
    }
  }
}

// ========== 状态图 ==========
.state-diagram {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;

  .state-item {
    padding: 10px 14px;
    border-radius: @radius-sm;
    background: #f8fafc;
    border: 1px solid @border;
    text-align: center;
    min-width: 110px;
    transition: all @transition;

    .state-name {
      display: block;
      font-weight: 600;
      font-size: 0.85rem;
      color: @text-primary;
    }

    .state-desc {
      font-size: 0.7rem;
      color: @text-muted;
      margin-top: 2px;
    }

    &.highlight {
      background: @accent-light;
      border-color: @accent;

      .state-name {
        color: @accent;
      }
    }
  }

  .arrow {
    font-weight: 700;
    color: @accent;
    font-size: 0.85rem;
    cursor: pointer;
    padding: 0 4px;

    &:hover {
      color: #0f766e;
    }
  }
}

.state-note {
  font-size: 0.88rem;
  color: @text-muted;
}

// ========== 双向通信 ==========
.com-pair {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;

  .com-box {
    flex: 1;
    padding: 16px;
    border-radius: @radius-sm;
    background: #f8fafc;
    border: 1px solid @border;

    &.out {
      border-left: 4px solid #3b82f6;
    }

    &.in {
      border-left: 4px solid #10b981;
    }

    .com-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: @text-secondary;
      margin-bottom: 6px;
    }

    .com-code {
      font-size: 0.9rem;
      font-family: monospace;
      color: @accent;
    }

    p {
      font-size: 0.82rem;
      color: @text-muted;
      margin: 8px 0 0;
    }
  }

  .com-arrow {
    font-size: 1.5rem;
    color: @accent;
    font-weight: bold;
  }
}

// ========== 示例标签 ==========
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
    box-shadow: 0 2px 8px rgba(13, 148, 136, 0.3);
  }
}

.example-desc {
  margin-top: 12px;
  font-size: 0.85rem;
  color: @text-secondary;
}

// ========== 警告卡片 ==========
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
  background: #fffbeb;
  border-radius: @radius-sm;
  border: 1px solid #fde68a;

  .warning-dot {
    width: 6px;
    height: 6px;
    background: #d97706;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 7px;
  }
}

.warning-card {
  border-left: 3px solid #f59e0b;
}

// ========== 滚动条 ==========
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

* {
  box-sizing: border-box;
}
</style>
