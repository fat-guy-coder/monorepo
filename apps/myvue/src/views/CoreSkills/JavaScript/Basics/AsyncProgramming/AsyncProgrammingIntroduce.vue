<template>
  <div class="async-programming-docs">
    <h1>JavaScript 异步编程核心机制</h1>

    <h2>JavaScript 有一个基于事件循环的运行时模型，事件循环负责执行代码、收集和处理事件以及执行队列中的子任务</h2>

    <div class="image-analysis">
      <h2 style="grid-column: 1; text-align: center; align-self: center">
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Event_loop" target="_blank">摘自MDN</a>
      </h2>
      <div class="item"><img :src="img" alt="加载失败" loading="lazy" /></div>
      <pre class="code item">
<code>function foo(b) {
  const a = 10;
  return a + b + 11;
}
function bar(x) {
  const y = 3;
  return foo(x * y);
}
const baz = bar(7); // 将 42 赋值给 baz
        </code></pre>
      <div class="item">
        <h3><b>栈</b> :函数调用形成了一个由若干帧堆叠而成的栈</h3>
        <p>1.当调用 bar 时，第一个帧被创建并压入栈中，帧中包含了 bar 的参数引用和局部变量。</p>
        <p>
          2.当 bar 调用 foo 时，第二个帧被创建并被压入栈中，放在第一个帧之上，帧中包含 foo
          的参数引用和局部变量。
        </p>
        <p>3.当 foo 执行完毕然后返回时，第二个帧就被弹出栈（剩下 bar 函数的调用帧）。</p>
        <p>4.当 bar 也执行完毕然后返回时，第一个帧也被弹出，栈就被清空了。</p>
      </div>
      <div class="item">
        <h3>
          <b>堆</b>
          :对象被分配在堆中，堆是一个用来表示一大块（通常是非结构化的）内存区域的计算机术语
        </h3>
      </div>

      <div class="item">
        <h3>
          <b>队列</b>
        </h3>
        <p>
          运行时包含一个待处理消息的消息队列。每一个消息都关联着一个用以处理这个消息的回调函数。
          在事件循环期间的某个时刻，运行时会开始处理最先进入队列的消息。被处理的消息会被移出队列，并作为输入参数来调用与之关联的函数。正如前面所提到的，调用一个函数总是会为其创造一个新的栈帧。
          函数的处理会一直进行到执行栈再次为空为止；然后事件循环将会处理队列中的下一个消息（如果还有的话）
        </p>
      </div>
      <div class="item">
        <h3>
          <b>事件循环</b>
        </h3>
        <h4>之所以称之为事件循环，是因为它经常按照类似如下的方式被实现</h4>
        <pre class="code"><code>while (queue.waitForMessage()) {
  queue.processNextMessage();
}
</code></pre>
      </div>
      <div class="item">
        <h3>
          <b>添加消息</b>
        </h3>
        <p>
          函数 setTimeout() 接受的前两个参数：一个是待加入队列的消息，一个是时间值（可选，默认为 0）
        </p>
        <p>这个时间值代表了消息被实际加入到队列的最小延迟时间</p>
        <p>如果有其他消息，setTimeout() 消息必须等待其他消息处理完</p>
        <p><b> 因此第二个参数仅仅表示最少延迟时间，而非确切的等待时间 </b></p>
      </div>
      <div class="item">
        <h3>
          <b>永不阻塞</b>
        </h3>
        <p>
          <b> 处理 I/O 通常通过事件和回调来执行</b>，所以当应用程序正等待一个 IndexedDB
          查询返回或者一个 fetch() 请求返回时，它仍然可以处理其他事情，比如用户输入
        </p>
      </div>
    </div>

    <div>
      <div class="item"></div>
      <h3><b>setInterval() 和 setTimeout()</b></h3>
      <p>
        <b>setTimeout()</b> 函数用于在指定的延迟时间后执行一个函数。它只会执行一次。
        <br />
        <b>setInterval()</b> 函数则会在指定的时间间隔内重复执行一个函数，直到调用
        <b>clearInterval()</b> 停止它。
      </p>
      <pre class="code"><code>
    setTimeout(() => {
      console.log('这条消息将在1秒后显示');
    }, 1000);

    const intervalId = setInterval(() => {
      console.log('这条消息每隔1秒显示一次');
    }, 1000);

    // 停止 setInterval
    clearInterval(intervalId);
        </code></pre>
    </div>

    <div class="item">
      <h3><b>requestAnimationFrame()</b></h3>
      <h3>requestAnimationFrame() 是一个用于创建动画的函数，它会在浏览器下次重绘之前调用指定的回调函数。<b>它既不是宏任务也不是微任务</b>
        ，它是一个用于创建平滑动画效果的浏览器API。它允许开发者在下一次浏览器重绘之前执行特定的回调函数，从而更新动画状态</h3>
      <p>
        <b>requestAnimationFrame()</b>
        是一个用于创建动画的函数，它会在浏览器下次重绘之前调用指定的回调函数。
        这使得动画更加流畅，并且可以根据浏览器的刷新率进行优化。
      </p>
      <pre class="code"><code>
    function animate() {
      // 动画逻辑
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
        </code></pre>
    </div>

    <div class="mechanism-container">
      <!-- Event Loop 机制 -->
      <div class="concept-card event-loop">
        <div class="concept-header">
          <div class="icon-box">
            <div class="loop-icon">🔄</div>
          </div>
          <h2>Event Loop 运行机制</h2>
        </div>
        <div class="concept-body">
          <div class="timeline-diagram">
            <div class="phase" v-for="phase in eventLoopPhases" :key="phase.name">
              <span class="phase-name">{{ phase.name }}</span>
              <span class="phase-desc">{{ phase.desc }}</span>
            </div>
            <div class="microtask-queue">微任务队列</div>
          </div>

          <pre class="execution-order"><code>{{ executionOrderExample }}</code></pre>
        </div>
      </div>

      <div>
        <h3><b>宏任务与微任务</b></h3>
        <p>
          在 JavaScript 中，任务被分为两种类型：宏任务和微任务。宏任务包括 setTimeout、setInterval 和 I/O 操作等，而微任务则包括 Promise 的回调和 MutationObserver。
        </p>
        <p>
          宏任务是指在事件循环中每次执行的任务，它们会在执行栈为空时被处理。微任务则是在当前宏任务执行完毕后立即执行的任务，优先级高于宏任务。
        </p>
        <p>
          例如，当一个宏任务（如 setTimeout）完成后，事件循环会检查微任务队列并执行所有微任务，直到微任务队列为空，然后再继续处理下一个宏任务。
        </p>
        <p>
          这种机制确保了微任务能够在宏任务之间快速执行，从而提高了代码的响应性和性能。
        </p>
      </div>

      <!-- 任务类型对比 -->
      <div class="comparison-grid">
        <div class="macro-task">
          <h3>📦 宏任务 (Macrotask)</h3>
          <ul>
            <li v-for="item in macroTasks" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="micro-task">
          <h3>🎯 微任务 (Microtask)</h3>
          <ul>
            <li v-for="item in microTasks" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <!-- 执行顺序演示 -->
      <div class="execution-demo">
        <h2>⚙️ 执行顺序演示</h2>
        <div class="code-columns">
          <div class="code-example">
            <pre><code>{{ sequenceExample.code }}</code></pre>
          </div>
          <div class="execution-steps">
            <div v-for="(step, index) in sequenceExample.steps" :key="index" class="step"
              :style="{ '--delay': index * 0.1 + 's' }">
              {{ step }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import img from '@/assets/image/js/the_javascript_runtime_environment_example.svg'

// Event Loop阶段定义
const eventLoopPhases = reactive([
  { name: 'Timers', desc: '执行setTimeout/setInterval回调' },
  { name: 'I/O', desc: '执行I/O相关回调' },
  { name: 'Idle', desc: '内部使用' },
  { name: 'Poll', desc: '检索新I/O事件' },
  { name: 'Check', desc: '执行setImmediate回调' },
  { name: 'Close', desc: '执行关闭事件回调' },
])

// 任务类型示例
const macroTasks = reactive([
  'setTimeout',
  'setInterval',
  'I/O操作',
  'UI渲染',
  'ajax和fetch请求',
  'setImmediate (Node.js)',
])

const microTasks = reactive([
  'Promise.then/catch/finally',
  'MutationObserver',
  'process.nextTick (Node.js)',
  'queueMicrotask',
])

// 执行顺序示例
const sequenceExample = reactive({
  code: `console.log('1. 同步代码');
console.log('2. 同步代码');
queueMicrotask(() => console.log('3. 微任务'));
Promise.resolve()
  .then(() => console.log('4. 微任务1'))
  .then(() => console.log('5. 微任务2'));
setTimeout(() => console.log('6. 宏任务'), 0);
1. 同步代码
2. 同步代码
3. 微任务
4. 微任务1
5. 微任务2
6. 宏任务
`,

  steps: [
    '1. 执行同步代码',
    '2. 收集微任务',
    '3. 执行所有微任务',
    '4. 渲染页面 (如有需要)',
    '5. 执行下一个宏任务',
    '6. 重复事件循环',
  ],
})

const executionOrderExample = `执行顺序规则：
1. 同步代码 > 微任务 > 渲染 > 宏任务
2. 每个宏任务执行后都会清空微任务队列
3. 微任务队列优先级高于宏任务`
</script>

<style lang="less" scoped>
//

code {
  color: #fff;
}

.code {
  background: #000;
}

.async-programming-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2.5rem;
    font-size: 2.4rem;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #3498db, #2ecc71);
      margin: 1.5rem auto;
    }
  }

  .image-analysis {
    padding: 2rem;
    margin-bottom: 2rem;
    display: grid;
    background: #fff;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    gap: 2rem;

    .content {
      width: 300px;

      p {
        margin: 0;
      }
    }

    .item {
      transition: all 0.5s ease-in;
      border: rgba(36, 36, 36, 0.2) 1px solid;
      border-radius: 5px;
      padding: 0.5rem;

      &:hover {
        box-shadow: 2rem 2rem 2rem rgba(0, 0, 0, 0.2);
        transform: translate(-0.2rem, -0.2rem);
      }
    }
  }

  .mechanism-container {
    display: grid;
    gap: 2rem;
  }

  .concept-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-3px);
    }

    .concept-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;

      .icon-box {
        background: #3498db20;
        padding: 1rem;
        border-radius: 50%;

        .loop-icon {
          font-size: 2rem;
          animation: rotate 8s linear infinite;
        }
      }

      h2 {
        margin: 0;
        color: #2c3e50;
      }
    }

    &.event-loop {
      border-top: 4px solid #3498db;
    }
  }

  .timeline-diagram {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    position: relative;
    padding: 2rem 0;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 2px;
      background: #3498db;
      z-index: 0;
    }

    .phase {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      z-index: 1;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.05);
      }

      .phase-name {
        display: block;
        font-weight: bold;
        color: #3498db;
        margin-bottom: 0.5rem;
      }

      .phase-desc {
        font-size: 0.9rem;
        color: #666;
      }
    }

    .microtask-queue {
      position: absolute;
      right: -20px;
      top: 20%;
      background: #2ecc71;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      transform: rotate(15deg);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0;

    >div {
      padding: 1.5rem;
      border-radius: 12px;

      h3 {
        margin-top: 0;
        padding-bottom: 1rem;
        border-bottom: 2px solid;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: '▹';
            position: absolute;
            left: 0;
            color: #666;
          }
        }
      }
    }

    .macro-task {
      border: 2px solid #3498db;

      h3 {
        border-color: #3498db;
        color: #3498db;
      }
    }

    .micro-task {
      border: 2px solid #2ecc71;

      h3 {
        border-color: #2ecc71;
        color: #2ecc71;
      }
    }
  }

  .execution-demo {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .code-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 1.5rem;
    }

    .code-example pre {
      background: #2d3436;
      color: #dfe6e9;
      padding: 1rem;
      border-radius: 8px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }

    .execution-steps {
      .step {
        padding: 1rem;
        margin: 0.5rem 0;
        background: #f8f9fa;
        border-radius: 6px;
        color: #000;
        opacity: 0;
        animation: fadeInUp 0.5s ease-out forwards;
        animation-delay: var(--delay);

        &:nth-child(odd) {
          transform: translateX(10px);
        }

        &:nth-child(even) {
          transform: translateX(-10px);
        }
      }
    }
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
