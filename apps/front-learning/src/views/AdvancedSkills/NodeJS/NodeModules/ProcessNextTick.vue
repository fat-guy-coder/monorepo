<template>
  <div class="nexttick-container">
    <header class="nexttick-header">
      <h1>Node.js process.nextTick 基础介绍</h1>
      <p class="subtitle">深入理解 Node.js 事件循环的核心机制</p>
      <div class="event-loop-diagram">
        <div class="event-loop">
          <div class="phase" v-for="(phase, index) in eventLoopPhases" :key="index" :class="phase.class">
            <div class="phase-icon">{{ phase.icon }}</div>
            <div class="phase-name">{{ phase.name }}</div>
          </div>
          <div class="nexttick-position">
            <div class="marker">⬇️</div>
            <div class="label">process.nextTick 队列</div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📚</span>
          process.nextTick 是什么？
        </h2>
        <div class="definition">
          <p><code>process.nextTick</code> 是 Node.js 事件循环中的一个特殊队列，它允许在当前操作完成后、事件循环继续之前立即执行回调函数。</p>

          <div class="comparison">
            <div class="method">
              <h3>setImmediate</h3>
              <ul>
                <li>在事件循环的检查阶段执行</li>
                <li>优先级低于 nextTick</li>
                <li>适合 I/O 操作后的回调</li>
              </ul>
            </div>

            <div class="method highlight">
              <h3>process.nextTick</h3>
              <ul>
                <li>在当前操作后立即执行</li>
                <li>优先级最高</li>
                <li>适合需要立即执行的微任务</li>
              </ul>
            </div>

            <div class="method">
              <h3>setTimeout</h3>
              <ul>
                <li>在事件循环的定时器阶段执行</li>
                <li>优先级最低</li>
                <li>适合延迟执行的任务</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">⚙️</span>
          工作原理
        </h2>
        <div class="workflow">
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>调用 process.nextTick</h3>
                <p>当调用 <code>process.nextTick(callback)</code> 时，回调函数被添加到 nextTick 队列</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>当前操作完成</h3>
                <p>Node.js 完成当前操作（执行完当前脚本）</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>处理 nextTick 队列</h3>
                <p>在事件循环继续之前，Node.js 清空 nextTick 队列中的所有回调</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>事件循环继续</h3>
                <p>继续事件循环的下一个阶段（定时器、I/O 等）</p>
              </div>
            </div>
          </div>

          <div class="visualization">
            <h3>执行顺序可视化</h3>
            <pre class="code-block">console.log('开始');

process.nextTick(() => {
  console.log('nextTick 回调');
});

setImmediate(() => {
  console.log('setImmediate 回调');
});

console.log('结束');

// 输出顺序:
// 开始
// 结束
// nextTick 回调
// setImmediate 回调</pre>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">💻</span>
          使用方式
        </h2>
        <div class="usage">
          <div class="usage-example">
            <h3>基本用法</h3>
            <pre class="code-block">process.nextTick(() => {
  console.log('在事件循环继续之前执行');
});</pre>
          </div>

          <div class="usage-example">
            <h3>传递参数</h3>
            <pre class="code-block">function callback(arg1, arg2) {
  console.log(`参数: ${arg1}, ${arg2}`);
}

process.nextTick(callback, 'Hello', 'World');</pre>
          </div>

          <div class="usage-example">
            <h3>递归调用</h3>
            <pre class="code-block">function recursiveTask(count) {
  if (count >= 5) return;

  console.log(`递归调用: ${count}`);
  process.nextTick(() => {
    recursiveTask(count + 1);
  });
}

recursiveTask(0);</pre>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          主要应用场景
        </h2>
        <div class="use-cases">
          <div class="use-case">
            <div class="icon">🛡️</div>
            <div class="content">
              <h3>API 错误处理</h3>
              <p>确保在用户代码执行后处理错误</p>
              <pre class="code-block">function asyncOperation(callback) {
  // 模拟异步操作
  process.nextTick(() => {
    try {
      // 执行操作
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  });
}</pre>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">⚡</div>
            <div class="content">
              <h3>事件发射后处理</h3>
              <p>确保监听器在事件发射后立即注册</p>
              <pre class="code-block">const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    process.nextTick(() => {
      this.emit('ready');
    });
  }
}

const emitter = new MyEmitter();
emitter.on('ready', () => {
  console.log('发射器已准备好');
});</pre>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">🔄</div>
            <div class="content">
              <h3>CPU 密集型任务分解</h3>
              <p>避免阻塞事件循环</p>
              <pre class="code-block">function processChunk(data, callback) {
  let index = 0;

  function next() {
    if (index >= data.length) return callback();

    // 处理一小块数据
    const chunk = data.slice(index, index + 100);
    index += 100;

    // 处理下一块
    process.nextTick(next);
  }

  process.nextTick(next);
}</pre>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">🏗️</div>
            <div class="content">
              <h3>构造函数初始化</h3>
              <p>确保实例完全初始化</p>
              <pre class="code-block">class Database {
  constructor() {
    this.connected = false;

    process.nextTick(() => {
      this.connect();
      this.connected = true;
    });
  }

  connect() {
    // 连接数据库
  }
}</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">⚠️</span>
          注意事项与最佳实践
        </h2>
        <div class="best-practices">
          <div class="practice">
            <h3>避免递归调用导致饥饿</h3>
            <p>递归调用 <code>process.nextTick</code> 会阻止事件循环继续，导致 I/O 饥饿</p>
            <pre class="code-block">// 避免这样的代码
function recursiveNextTick() {
  process.nextTick(recursiveNextTick);
}
recursiveNextTick();</pre>
          </div>

          <div class="practice">
            <h3>不要用于 CPU 密集型操作</h3>
            <p><code>process.nextTick</code> 不是真正的异步，长时间运行的任务会阻塞事件循环</p>
          </div>

          <div class="practice">
            <h3>与 Promise 结合使用</h3>
            <p>在 Promise 中优先使用 <code>queueMicrotask</code>，但 <code>process.nextTick</code> 优先级更高</p>
            <pre class="code-block">Promise.resolve().then(() => {
  console.log('Promise 微任务');
});

process.nextTick(() => {
  console.log('nextTick 微任务');
});

// 输出:
// nextTick 微任务
// Promise 微任务</pre>
          </div>

          <div class="practice">
            <h3>错误处理</h3>
            <p>确保处理 <code>process.nextTick</code> 中的错误，避免未捕获异常</p>
            <pre class="code-block">process.nextTick(() => {
  try {
    // 可能出错的代码
  } catch (err) {
    console.error('捕获到错误:', err);
  }
});</pre>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📊</span>
          性能比较
        </h2>
        <div class="performance-comparison">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>方法</th>
                  <th>执行时机</th>
                  <th>优先级</th>
                  <th>适合场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>process.nextTick</code></td>
                  <td>当前操作后立即</td>
                  <td>最高</td>
                  <td>微任务、初始化</td>
                </tr>
                <tr>
                  <td><code>queueMicrotask</code></td>
                  <td>当前任务后，下一个任务前</td>
                  <td>高</td>
                  <td>Promise 回调</td>
                </tr>
                <tr>
                  <td><code>setImmediate</code></td>
                  <td>事件循环的检查阶段</td>
                  <td>中</td>
                  <td>I/O 后回调</td>
                </tr>
                <tr>
                  <td><code>setTimeout(0)</code></td>
                  <td>事件循环的定时器阶段</td>
                  <td>低</td>
                  <td>延迟任务</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="performance-tip">
            <h3>性能提示</h3>
            <p><code>process.nextTick</code> 是 Node.js 中最快的异步方法，但在递归调用时要小心，避免阻塞事件循环。</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="nexttick-footer">
      <p><code>process.nextTick</code> 是 Node.js 事件循环的核心机制之一，合理使用可以优化应用性能</p>
      <div class="conclusion">在需要立即执行但不想阻塞当前操作的场景中，<code>process.nextTick</code> 是最佳选择</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 事件循环阶段数据
const eventLoopPhases = [
  { name: '定时器', class: 'timers', icon: '⏱️' },
  { name: '待定回调', class: 'pending', icon: '🔄' },
  { name: '空闲/准备', class: 'idle', icon: '💤' },
  { name: '轮询', class: 'poll', icon: '🔍' },
  { name: '检查', class: 'check', icon: '✅' },
  { name: '关闭回调', class: 'close', icon: '❌' },
];
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;
@error-color: #e74c3c;
@warning-color: #f39c12;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nexttick-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.nexttick-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    max-width: 600px;
    margin: 0 auto 30px;
  }
}

.event-loop-diagram {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  .event-loop {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    position: relative;
    padding-top: 60px;

    .phase {
      background: #eaf7ff;
      border-radius: 8px;
      padding: 15px;
      width: 150px;
      text-align: center;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .phase-icon {
        font-size: 2.5rem;
        margin-bottom: 10px;
      }

      .phase-name {
        font-weight: 600;
        color: @primary-color;
      }
    }

    .nexttick-position {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;

      .marker {
        font-size: 1.8rem;
      }

      .label {
        background: @secondary-color;
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
        margin-top: 5px;
      }
    }
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: @text-color;
  font-weight: 600;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

// 定义部分
.definition {
  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.8;
  }
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;

  .method {
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: #e0e0e0;
    }

    &.highlight {
      border: 2px solid @primary-color;
      transform: scale(1.02);

      &:before {
        background: @primary-color;
      }

      h3 {
        color: @primary-color;
      }
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      font-weight: 600;
    }

    ul {
      list-style-type: none;

      li {
        padding: 8px 0;
        position: relative;
        padding-left: 25px;

        &:before {
          content: '•';
          position: absolute;
          left: 10px;
          color: @primary-color;
          font-size: 1.2rem;
        }
      }
    }
  }
}

// 工作流程
.workflow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 25px;

    .step {
      display: flex;
      gap: 20px;
      align-items: flex-start;

      .step-number {
        min-width: 40px;
        height: 40px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: 700;
        flex-shrink: 0;
        margin-top: 5px;
      }

      .step-content {
        flex: 1;

        h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: @text-color;
        }

        p {
          margin-bottom: 15px;
          color: @light-text;
        }
      }
    }
  }

  .visualization {
    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @text-color;
    }
  }
}

// 代码块
.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 15px 0;
  border: 1px solid #e1e4e8;
}

// 使用方式
.usage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .usage-example {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid @primary-color;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @primary-color;
    }
  }
}

// 使用场景
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .use-case {
    display: flex;
    gap: 20px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
    border: 1px solid #eaeaea;

    .icon {
      font-size: 2rem;
      flex-shrink: 0;
      margin-top: 5px;
    }

    .content {
      flex: 1;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 10px;
        color: @text-color;
      }

      p {
        color: @light-text;
        margin-bottom: 15px;
        font-size: 0.95rem;
      }
    }
  }
}

// 最佳实践
.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;

  .practice {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid @warning-color;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @warning-color;
    }

    p {
      color: @light-text;
      margin-bottom: 15px;
    }
  }
}

// 性能比较
.performance-comparison {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
      }

      th {
        background: #eaf7ff;
        color: @primary-color;
        font-weight: 600;
      }

      tr:hover {
        background: #f9fbfd;
      }

      code {
        background: #eaf7ff;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
      }
    }
  }

  .performance-tip {
    background: #e8f5e9;
    border-radius: 8px;
    padding: 20px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @secondary-color;
    }

    p {
      color: @light-text;
      line-height: 1.7;
    }
  }
}

.nexttick-footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 1rem;

  .conclusion {
    margin-top: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    color: @primary-color;
    max-width: 800px;
    margin: 20px auto 0;
    padding: 15px;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 8px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .nexttick-header h1 {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .event-loop .phase {
    width: 120px;
  }
}
</style>
