<template>
  <div class="macrotask-container">
    <header class="header">
      <h1 class="title">JavaScript 宏任务(Macrotask)</h1>
      <p class="subtitle">深入理解事件循环中的宏任务机制</p>
    </header>

    <div class="content-section">
      <h2 class="section-title">🔍 宏任务基本概念</h2>
      <div class="concept-card">
        <p>宏任务是 JavaScript 事件循环中的一种任务类型，每个事件循环迭代中会执行一个宏任务队列中的一个任务。</p>
        <p>与微任务(Microtask)不同，宏任务在每次事件循环中<b>只执行一个</b>，然后检查并执行所有微任务。</p>
      </div>
      <div class="image-placeholder">
        <div class="event-loop-image">
          <div class="loop">事件循环</div>
          <div class="macrotask">宏任务队列</div>
          <div class="microtask">微任务队列</div>
          <div class="render">渲染步骤</div>
          <div class="arrow"></div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">📋 常见的宏任务类型</h2>
      <div class="task-grid">
        <div v-for="task in macrotasks" :key="task.type" class="task-card">
          <h3 class="task-type">{{ task.type }}</h3>
          <div class="task-examples">
            <div v-for="(example, idx) in task.examples" :key="idx" class="example">
              <code>{{ example }}</code>
            </div>
          </div>
          <p class="task-desc">{{ task.desc }}</p>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">⚠️ 宏任务过多的问题</h2>
      <div class="problem-card warning">
        <h3>宏任务队列阻塞</h3>
        <p>当宏任务队列中有太多任务时，会导致：</p>
        <ul>
          <li>页面响应变慢，用户交互延迟</li>
          <li>动画卡顿，渲染不流畅</li>
          <li>长时间运行的任务可能阻塞主线程</li>
        </ul>
      </div>

      <h3 class="optimize-title">优化策略</h3>
      <div class="optimize-grid">
        <div v-for="opt in optimizations" :key="opt.title" class="optimize-card">
          <h4>{{ opt.title }}</h4>
          <p>{{ opt.desc }}</p>
          <pre v-if="opt.code"><code>{{ opt.code }}</code></pre>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">📝 宏任务使用注意事项</h2>
      <div class="note-grid">
        <div v-for="note in notes" :key="note.title" class="note-card">
          <h3>{{ note.title }}</h3>
          <p>{{ note.content }}</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>宏任务是 JavaScript 并发模型的核心概念，合理使用可以提升应用性能</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Macrotask {
  type: string;
  examples: string[];
  desc: string;
}

interface Optimization {
  title: string;
  desc: string;
  code?: string;
}

interface Note {
  title: string;
  content: string;
}

const macrotasks: Macrotask[] = [
  {
    type: '定时器',
    examples: [
      'setTimeout(callback, delay)',
      'setInterval(callback, delay)',
      'requestAnimationFrame(callback)'
    ],
    desc: '延迟执行或周期性执行的任务，注意 requestAnimationFrame 是特殊的宏任务，在渲染前执行'
  },
  {
    type: '网络请求',
    examples: [
      'XMLHttpRequest 回调',
      'fetch().then() 的回调',
      'WebSocket 事件回调'
    ],
    desc: '网络请求完成后的回调都是宏任务，即使使用 Promise 封装'
  },
  {
    type: 'DOM 事件',
    examples: [
      'element.addEventListener() 回调',
      'window.onload 回调',
      'UI 交互事件回调'
    ],
    desc: '用户交互触发的事件处理函数都是宏任务'
  },
  {
    type: 'I/O 操作',
    examples: [
      'Node.js 中的 fs.readFile 回调',
      'IndexedDB 操作回调',
      'LocalStorage 操作完成回调'
    ],
    desc: '文件系统或数据库操作完成后的回调'
  },
  {
    type: 'UI 渲染',
    examples: [
      '浏览器重排/重绘',
      'CSS 动画回调',
      '过渡效果结束事件'
    ],
    desc: '浏览器渲染管道的各个阶段也是宏任务'
  }
];

const optimizations: Optimization[] = [
  {
    title: '任务拆分',
    desc: '将长任务拆分为多个小任务，避免阻塞主线程',
    code: '// 使用 setTimeout 拆分任务\nfunction processChunk(data, chunkSize, callback) {\n  let index = 0;\n  function doChunk() {\n    const chunk = data.slice(index, index + chunkSize);\n    // 处理当前块...\n    index += chunkSize;\n    if (index < data.length) {\n      setTimeout(doChunk, 0);\n    } else {\n      callback();\n    }\n  }\n  doChunk();\n}'
  },
  {
    title: '使用 Web Workers',
    desc: '将计算密集型任务移到 Worker 线程',
    code: '// 主线程\nconst worker = new Worker("worker.js");\nworker.postMessage(data);\nworker.onmessage = (e) => {\n  // 处理结果\n};\n\n// worker.js\nself.onmessage = (e) => {\n  const result = heavyComputation(e.data);\n  self.postMessage(result);\n};'
  },
  {
    title: '合理使用 requestAnimationFrame',
    desc: '动画相关任务使用 rAF 可以对齐浏览器刷新率',
    code: 'function animate() {\n  // 动画逻辑...\n  requestAnimationFrame(animate);\n}\nrequestAnimationFrame(animate);'
  },
  {
    title: '避免嵌套定时器',
    desc: '多层嵌套的 setTimeout/setInterval 会导致任务堆积',
    code: '// 不推荐\nfunction recursiveTimeout() {\n  // 任务逻辑...\n  setTimeout(recursiveTimeout, 0);\n}\n\n// 推荐\nfunction task() {\n  // 任务逻辑...\n  if (shouldContinue) {\n    setTimeout(task, reasonableDelay);\n  }\n}'
  }
];

const notes: Note[] = [
  {
    title: '执行顺序',
    content: '宏任务按入队顺序执行，但不同类型的宏任务可能有不同的优先级（如用户交互事件通常优先级较高）'
  },
  {
    title: '与微任务的区别',
    content: '微任务(Promise、MutationObserver等)会在当前宏任务执行完后立即执行，而宏任务要等到下次事件循环'
  },
  {
    title: '零延迟定时器',
    content: 'setTimeout(callback, 0) 并不真的立即执行，只是尽快放入宏任务队列'
  },
  {
    title: 'Node.js 差异',
    content: 'Node.js 中 setImmediate 是特殊的宏任务，通常比 setTimeout(fn, 0) 更快执行'
  },
  {
    title: '长任务影响',
    content: '单个宏任务执行时间过长会阻塞页面渲染，建议控制在 50ms 以内'
  },
  {
    title: '任务优先级',
    content: '浏览器会优先处理用户交互相关的宏任务（如点击事件），然后是渲染任务，最后是其他任务'
  }
];
</script>

<style lang="less" scoped>

.macrotask-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2c3e50;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaecef;

  .title {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    background: linear-gradient(90deg, #42b983, #3498db);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
    font-weight: 400;
  }
}

.content-section {
  margin-bottom: 2.5rem;

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    color: #2c3e50;
    border-left: 4px solid #42b983;
    padding-left: 0.8rem;
  }
}

.concept-card {
  background-color: #f8f9fa;
  padding: 1.2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #3498db;

  p {
    margin: 0.5rem 0;

    b {
      color: #e74c3c;
    }
  }
}

.image-placeholder {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  text-align: center;
  color: #7f8c8d;

  .event-loop-image {
    position: relative;
    height: 120px;

    .loop, .macrotask, .microtask, .render {
      position: absolute;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .loop {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #42b983;
      color: white;
    }

    .macrotask {
      top: 20%;
      left: 20%;
      background-color: #3498db;
      color: white;
    }

    .microtask {
      top: 20%;
      right: 20%;
      background-color: #9b59b6;
      color: white;
    }

    .render {
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #e74c3c;
      color: white;
    }

    .arrow {
      position: absolute;
      width: 20px;
      height: 20px;
      border-right: 2px solid #7f8c8d;
      border-bottom: 2px solid #7f8c8d;
      transform: rotate(-45deg);
      top: 40%;
      left: 30%;
    }
  }
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
}

.task-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .task-type {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #3498db;
  }

  .task-examples {
    margin-bottom: 0.8rem;

    .example {
      background-color: #f8f9fa;
      padding: 0.5rem;
      margin-bottom: 0.3rem;
      border-radius: 4px;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.85rem;
      overflow-x: auto;
    }
  }

  .task-desc {
    font-size: 0.9rem;
    color: #555;
    margin: 0;
  }
}

.problem-card {
  background-color: #fff8f0;
  padding: 1.2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #e67e22;

  &.warning {
    background-color: #fff5f5;
    border-left-color: #e74c3c;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    color: #e74c3c;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.3rem;
    }
  }
}

.optimize-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin: 1.5rem 0 1rem;
}

.optimize-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
}

.optimize-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  h4 {
    font-size: 1.1rem;
    margin-top: 0;
    color: #42b983;
  }

  p {
    font-size: 0.9rem;
    color: #555;
  }

  pre {
    background-color: #f8f9fa;
    padding: 0.8rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0.8rem 0 0;

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.8rem;
      color: #333;
    }
  }
}

.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
}

.note-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  h3 {
    font-size: 1.1rem;
    margin-top: 0;
    color: #3498db;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0;
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .macrotask-container {
    padding: 1rem;
  }

  .task-grid, .optimize-grid, .note-grid {
    grid-template-columns: 1fr;
  }

  .header .title {
    font-size: 1.8rem;
  }
}
</style>
