<template>
  <div class="generator-container">
    <header class="header">
      <h1>ES6 Generator 介绍</h1>
      <p>一种可以暂停和恢复执行的函数，为异步编程和迭代控制提供强大支持</p>
    </header>

    <main class="content">
      <section class="section">
        <div class="section-header">
          <h2><i class="icon">⚙️</i> Generator 是什么？</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <p>
            <span class="highlight">Generator（生成器）</span>是 ES6
            引入的一种特殊函数，它可以在执行过程中多次暂停和恢复。
          </p>
          <p>
            与传统函数不同，生成器函数在调用时不会立即执行，而是返回一个生成器对象，该对象遵循可迭代协议和迭代器协议。
          </p>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">基本语法</span>
              <button class="copy-button" @click="copyCode('basicSyntax')">复制</button>
            </div>
            <pre><code ref="basicSyntax">function* myGenerator() {
  yield '第一个值';
  yield '第二个值';
  return '最终结果';
}

const gen = myGenerator();
console.log(gen.next().value); // '第一个值'
console.log(gen.next().value); // '第二个值'
console.log(gen.next().value); // '最终结果'</code></pre>
          </div>

          <div class="feature-list">
            <div class="feature">
              <div class="feature-icon">📌</div>
              <div>
                <h3>主要特点</h3>
                <ul>
                  <li>使用 <code>function*</code> 语法声明</li>
                  <li>使用 <code>yield</code> 关键字暂停执行并返回值</li>
                  <li>通过 <code>next()</code> 方法恢复执行</li>
                  <li>可以双向通信（传入值和返回值）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2><i class="icon">🔧</i> 核心特性</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>yield 表达式</h3>
              <p>
                生成器函数执行到 yield 时会暂停，并将 yield 后面的表达式值作为返回对象的 value 值。
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">⏯️</div>
              <h3>next() 方法</h3>
              <p>恢复生成器的执行，返回一个包含 value 和 done 属性的对象。</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon">📨</div>
              <h3>双向通信</h3>
              <p>next() 方法可以接收参数，该参数会作为上一个 yield 表达式的返回值。</p>
            </div>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">双向通信示例</span>
              <button class="copy-button" @click="copyCode('twoWayExample')">复制</button>
            </div>
            <pre><code ref="twoWayExample">function* twoWayGenerator() {
  const name = yield "你的名字是?";
  const age = yield `你好 ${name}, 你多大了?`;
  return `${name}今年${age}岁`;
}

const gen = twoWayGenerator();
console.log(gen.next().value); // "你的名字是?"
console.log(gen.next("小明").value); // "你好 小明, 你多大了?"
console.log(gen.next(25).value); // "小明今年25岁"</code></pre>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2><i class="icon">🚀</i> 适用场景</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="use-case">
            <div class="use-case-header">
              <div class="use-case-icon">💤</div>
              <h3>惰性求值</h3>
            </div>
            <p>生成器可以按需生成值，避免一次性计算所有值，节省内存。</p>
          </div>

          <div class="use-case">
            <div class="use-case-header">
              <div class="use-case-icon">⏳</div>
              <h3>异步编程</h3>
            </div>
            <p>配合 Promise 可以实现类似 async/await 的同步风格异步代码。</p>

            <div class="code-block">
              <div class="code-header">
                <span class="code-title">异步操作控制流</span>
                <button class="copy-button" @click="copyCode('asyncExample')">复制</button>
              </div>
              <pre><code ref="asyncExample">function asyncTask(time) {
  return new Promise(resolve =>
    setTimeout(resolve, time)
  );
}

function* asyncGenerator() {
  yield asyncTask(1000);
  console.log('第一步完成');
  yield asyncTask(1500);
  console.log('第二步完成');
}

// 运行生成器
function runGenerator(gen) {
  const g = gen();
  function next() {
    const result = g.next();
    if (result.done) return;
    result.value.then(next);
  }
  next();
}

runGenerator(asyncGenerator);</code></pre>
            </div>
          </div>

          <div class="use-case">
            <div class="use-case-header">
              <div class="use-case-icon">∞</div>
              <h3>无限数据流</h3>
            </div>
            <p>可以创建无限序列而不会耗尽内存。</p>

            <div class="code-block">
              <div class="code-header">
                <span class="code-title">斐波那契数列</span>
                <button class="copy-button" @click="copyCode('fibonacciExample')">复制</button>
              </div>
              <pre><code ref="fibonacciExample">function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
// 可以无限继续...</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2><i class="icon">📌</i> 注意事项</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="note-card">
            <div class="note-icon">ℹ️</div>
            <p>生成器函数调用时不会执行函数体，而是返回生成器对象</p>
          </div>

          <div class="note-card">
            <div class="note-icon">ℹ️</div>
            <p>每次调用生成器函数都会返回一个新的生成器对象</p>
          </div>

          <div class="note-card">
            <div class="note-icon">ℹ️</div>
            <p>使用 <code>return()</code> 方法可以提前终止生成器</p>
          </div>

          <div class="note-card">
            <div class="note-icon">ℹ️</div>
            <p><code>throw()</code> 方法可以在生成器内部抛出异常</p>
          </div>

          <div class="note-card">
            <div class="note-icon">ℹ️</div>
            <p>生成器对象同时也是可迭代对象，可以使用 <code>for...of</code> 循环</p>
          </div>

          <div class="comparison">
            <h3>生成器与普通函数的对比</h3>
            <div class="comparison-grid">
              <div class="comparison-item">
                <h4>普通函数</h4>
                <ul>
                  <li>运行到结束（Run to completion）</li>
                  <li>一次性执行所有代码</li>
                  <li>无法暂停和恢复</li>
                  <li>返回单个值</li>
                </ul>
              </div>

              <div class="comparison-item">
                <h4>生成器函数</h4>
                <ul>
                  <li>运行-暂停-继续（Run-pause-continue）</li>
                  <li>可分步执行</li>
                  <li>可暂停和恢复多次</li>
                  <li>可返回多个值</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2><i class="icon">🧪</i> 交互示例</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="example-container">
            <h3>可重置计数器</h3>
            <div class="code-block">
              <div class="code-header">
                <span class="code-title">实现代码</span>
                <button class="copy-button" @click="copyCode('counterExample')">复制</button>
              </div>
              <pre><code ref="counterExample">function* resetableCounter() {
  let count = 0;
  while (true) {
    const reset = yield count;
    if (reset) {
      count = 0;
    } else {
      count++;
    }
  }
}</code></pre>
            </div>

            <div class="example-controls">
              <button class="control-button" @click="runCounter('next')">
                <i>▶️</i> 下一步 (next)
              </button>
              <button class="control-button" @click="runCounter('reset')">
                <i>🔄</i> 重置 (reset)
              </button>
            </div>

            <div class="example-output">
              <div class="output-header">
                <span>执行输出</span>
                <button class="clear-button" @click="clearOutput">清空</button>
              </div>
              <div class="output-content">
                <div v-for="(output, index) in counterOutputs" :key="index" class="output-line">
                  <span class="output-prefix">&gt;</span> {{ output }}
                </div>
                <div v-if="counterOutputs.length === 0" class="empty-output">
                  点击"下一步"按钮执行生成器
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>
        Generator 是 JavaScript 中强大的异步编程和流程控制工具 | 在实际开发中，async/await
        通常更易用，但理解 Generator 有助于深入理解 JavaScript 异步机制
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const counterOutputs = ref<string[]>([])
let counterGenerator: Generator | null = null

function* resetableCounter() {
  let count = 0
  while (true) {
    const reset: boolean = yield count
    if (reset) {
      count = 0
    } else {
      count++
    }
  }
}

function initCounter() {
  counterGenerator = resetableCounter()
  counterOutputs.value = []
  counterOutputs.value.push('生成器已初始化，调用 next() 开始执行')
}

function runCounter(action: 'next' | 'reset') {
  if (!counterGenerator) initCounter()

  try {
    if (action === 'reset') {
      const result = counterGenerator!.next(true)
      counterOutputs.value.push(
        `counter.next(true) => { value: ${result.value}, done: ${result.done} }`,
      )
    } else {
      const result = counterGenerator!.next()
      counterOutputs.value.push(
        `counter.next() => { value: ${result.value}, done: ${result.done} }`,
      )
    }
  } catch (error) {
    counterOutputs.value.push(`错误: ${error}`)
  }
}

function clearOutput() {
  counterOutputs.value = []
}

function copyCode(refName: string) {
  const codeElement = document.querySelector(`[ref="${refName}"]`)
  if (codeElement) {
    const code = codeElement.textContent || ''
    navigator.clipboard.writeText(code).then(() => {
      alert('代码已复制到剪贴板')
    })
  }
}

// 初始化生成器
initCounter()
</script>

<style lang="less" scoped>
.generator-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    sans-serif;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border-radius: 16px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
  padding: 30px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    transform: translateY(-3px);
  }
}

.section-header {
  margin-bottom: 25px;

  h2 {
    font-size: 1.8rem;
    color: #1e40af;
    display: flex;
    align-items: center;
    gap: 12px;

    .icon {
      background: #dbeafe;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
  }

  .divider {
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #93c5fd);
    margin-top: 15px;
    border-radius: 2px;
  }
}

.section-content {
  p {
    margin-bottom: 20px;
    font-size: 1.05rem;
    color: #475569;
    line-height: 1.7;
  }

  .highlight {
    background: #dbeafe;
    color: #1e40af;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
  }
}

.code-block {
  background: #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
  margin: 25px 0;
  border: 1px solid #e2e8f0;

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background-color: #e2e8f0;
    border-bottom: 1px solid #cbd5e1;

    .code-title {
      font-weight: 600;
      color: #1e293b;
    }

    .copy-button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.2s;

      &:hover {
        background: #2563eb;
      }
    }
  }

  pre {
    padding: 20px;
    overflow-x: auto;
  }

  code {
    font-family: 'Fira Code', Consolas, Monaco, monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #1e293b;
  }
}

.feature-list {
  margin: 25px 0;

  .feature {
    display: flex;
    gap: 20px;
    background: #f1f5f9;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;

    .feature-icon {
      font-size: 1.8rem;
    }

    h3 {
      margin-bottom: 12px;
      color: #1e40af;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        position: relative;

        &:before {
          content: '•';
          color: #3b82f6;
          font-weight: bold;
          position: absolute;
          left: -18px;
        }
      }
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 25px 0;

  .feature-card {
    background: #f1f5f9;
    border-radius: 12px;
    padding: 25px;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    .feature-icon {
      font-size: 2rem;
      margin-bottom: 15px;
    }

    h3 {
      color: #1e40af;
      margin-bottom: 12px;
      font-size: 1.3rem;
    }

    p {
      color: #475569;
      font-size: 1rem;
      margin-bottom: 0;
    }
  }
}

.use-case {
  margin-bottom: 30px;

  .use-case-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;

    .use-case-icon {
      font-size: 1.8rem;
      background: #dbeafe;
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1.4rem;
      color: #1e40af;
    }
  }
}

.note-card {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  background: #f1f5f9;
  padding: 18px;
  border-radius: 10px;
  margin-bottom: 15px;

  .note-icon {
    font-size: 1.4rem;
    margin-top: 2px;
  }

  p {
    margin: 0;
    flex: 1;
  }
}

.comparison {
  margin-top: 30px;

  h3 {
    font-size: 1.4rem;
    color: #1e40af;
    margin-bottom: 20px;
    text-align: center;
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .comparison-item {
      background: #f1f5f9;
      border-radius: 12px;
      padding: 25px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      h4 {
        text-align: center;
        margin-bottom: 20px;
        color: #1e40af;
        font-size: 1.3rem;
        padding-bottom: 15px;
        border-bottom: 2px solid #dbeafe;
      }

      ul {
        padding-left: 25px;

        li {
          margin-bottom: 12px;
          position: relative;

          &:before {
            content: '•';
            color: #3b82f6;
            font-weight: bold;
            position: absolute;
            left: -18px;
          }
        }
      }
    }
  }
}

.example-container {
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 25px;

  h3 {
    font-size: 1.5rem;
    color: #1e40af;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.example-controls {
  display: flex;
  gap: 15px;
  margin: 20px 0;

  .control-button {
    flex: 1;
    background: #3b82f6;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1.05rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover {
      background: #2563eb;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.example-output {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;

  .output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background-color: #0f172a;
    color: #94a3b8;
    font-weight: 500;

    .clear-button {
      background: #475569;
      color: white;
      border: none;
      padding: 5px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;

      &:hover {
        background: #64748b;
      }
    }
  }

  .output-content {
    padding: 20px;
    min-height: 150px;
    max-height: 300px;
    overflow-y: auto;

    .output-line {
      color: #cbd5e1;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      margin-bottom: 8px;
      display: flex;

      .output-prefix {
        color: #94a3b8;
        margin-right: 10px;
      }
    }

    .empty-output {
      color: #94a3b8;
      font-style: italic;
      text-align: center;
      padding: 30px 0;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px;
  color: #64748b;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .section {
    padding: 20px;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .example-controls {
    flex-direction: column;
  }
}
</style>
