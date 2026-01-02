<template>
  <div class="microtask-container">
    <header class="header">
      <h1 class="title">JavaScript 微任务(Microtask)</h1>
      <p class="subtitle">深入理解事件循环中的微任务机制</p>
    </header>

    <div class="content-section">
      <h2 class="section-title">🔍 微任务基本概念</h2>
      <div class="concept-card">
        <p>微任务是 JavaScript 事件循环中的一种任务类型，<strong>在当前宏任务执行完毕后立即执行</strong>，优先级高于下一个宏任务。</p>
        <div class="event-loop-flow">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">执行一个宏任务</div>
          </div>
          <div class="arrow">→</div>
          <div class="step highlight">
            <div class="step-number">2</div>
            <div class="step-content">执行所有微任务</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">UI渲染(如有需要)</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">执行下一个宏任务</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">📋 微任务的主要来源</h2>
      <div class="source-grid">
        <div v-for="source in microtaskSources" :key="source.type" class="source-card">
          <h3 class="source-type">{{ source.type }} <a @click="jumpToDetail(source.type)">跳转详细</a></h3>
          <div class="source-examples">
            <div v-for="(example, idx) in source.examples" :key="idx" class="example">
              <code>{{ example }}</code>
            </div>
          </div>
          <p class="source-desc">{{ source.desc }}</p>
          <div class="source-priority">
            优先级: <span class="priority-value">{{ source.priority }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">⚡ 微任务执行时机演示</h2>
      <div class="timing-demo">
        <div class="code-block">
          <div class="code-header">代码示例</div>
          <pre><code>console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
}).then(() => {
  console.log('promise2');
});

console.log('script end');</code></pre>
        </div>
        <div class="output-block">
          <div class="output-header">输出顺序</div>
          <div class="output-content">
            <div class="output-line">script start</div>
            <div class="output-line">script end</div>
            <div class="output-line highlight">promise1</div>
            <div class="output-line highlight">promise2</div>
            <div class="output-line">setTimeout</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">⚠️ 微任务过多的问题</h2>
      <div class="problem-card warning">
        <h3>微任务队列阻塞</h3>
        <p>当微任务队列中有太多任务时，会导致：</p>
        <ul>
          <li>阻塞主线程，导致页面无法及时响应</li>
          <li>UI渲染延迟，用户交互卡顿</li>
          <li>长时间运行的微任务可能阻塞后续宏任务</li>
        </ul>
        <div class="problem-example">
          <pre><code>function recursiveMicrotask() {
  Promise.resolve().then(() => {
    console.log('Microtask executed');
    recursiveMicrotask(); // 无限递归微任务
  });
}
recursiveMicrotask();</code></pre>
          <p class="warning-text">⚠️ 此代码会导致无限微任务循环，完全阻塞页面！</p>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">🚀 微任务优化策略</h2>
      <div class="optimize-grid">
        <div v-for="opt in optimizations" :key="opt.title" class="optimize-card">
          <h3>{{ opt.title }}</h3>
          <p>{{ opt.desc }}</p>
          <pre v-if="opt.code"><code>{{ opt.code }}</code></pre>
          <div v-if="opt.note" class="optimize-note">{{ opt.note }}</div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">📝 微任务使用注意事项</h2>
      <div class="note-grid">
        <div v-for="note in notes" :key="note.title" class="note-card">
          <h3>{{ note.title }}</h3>
          <p>{{ note.content }}</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>微任务是 JavaScript 异步编程的核心机制，合理使用可以提升应用响应速度</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface MicrotaskSource {
  type: string;
  examples: string[];
  desc: string;
  priority: string;
}

interface Optimization {
  title: string;
  desc: string;
  code?: string;
  note?: string;
}

interface Note {
  title: string;
  content: string;
}

const emit = defineEmits(['goToByRouteName']);

const jumpToDetail = (type: string) => {
  emit('goToByRouteName', type);
};

const microtaskSources: MicrotaskSource[] = [
  {
    type: 'Promise',
    examples: [
      'Promise.then()',
      'Promise.catch()',
      'Promise.finally()'
    ],
    desc: 'Promise 的异步回调都是微任务',
    priority: '高'
  },
  {
    type: 'QueueMicrotask',
    examples: [
      'queueMicrotask(() => {...})'
    ],
    desc: '专门用于添加微任务的 API，比 Promise.resolve() 更语义化',
    priority: '高'
  },
  {
    type: 'MutationObserver',
    examples: [
      'new MutationObserver(callback)',
      'observer.observe(node, config)'
    ],
    desc: 'DOM 变化观察器的回调是微任务',
    priority: '中'
  },
  {
    type: 'ProcessNextTick',
    examples: [
      'process.nextTick(() => {...})'
    ],
    desc: 'Node.js 环境中的微任务 API，优先级高于 Promise',
    priority: '最高(Node.js)'
  }
];

const optimizations: Optimization[] = [
  {
    title: '避免微任务无限递归',
    desc: '确保微任务不会无限触发自身',
    code: '// 错误示例\nfunction dangerous() {\n  Promise.resolve().then(dangerous);\n}\n\n// 正确做法\nfunction safe(count = 0) {\n  if (count >= 10) return;\n  Promise.resolve().then(() => {\n    safe(count + 1);\n  });\n}'
  },
  {
    title: '拆分长微任务',
    desc: '将耗时操作拆分为多个微任务或转为宏任务',
    code: 'function processChunk(data) {\n  if (!data.length) return;\n  \n  // 处理一小部分数据\n  const chunk = data.splice(0, 10);\n  process(chunk);\n  \n  // 使用 queueMicrotask 继续处理\n  queueMicrotask(() => processChunk(data));\n}',
    note: '对于大数据集，考虑使用 setTimeout 代替'
  },
  {
    title: '合理使用 queueMicrotask',
    desc: '优先使用 queueMicrotask 而非 Promise',
    code: '// 优于 Promise.resolve().then()\nqueueMicrotask(() => {\n  // 微任务逻辑\n});',
    note: '语义更清晰且性能略优'
  },
  {
    title: '注意执行顺序',
    desc: '理解不同微任务源的执行顺序',
    code: 'Promise.resolve().then(() => console.log("Promise 1"));\nqueueMicrotask(() => console.log("queueMicrotask"));\nPromise.resolve().then(() => console.log("Promise 2"));\n\n// 输出顺序:\n// Promise 1\n// queueMicrotask\n// Promise 2',
    note: '同类型微任务按添加顺序执行'
  }
];

const notes: Note[] = [
  {
    title: '与宏任务的区别',
    content: '微任务在当前宏任务结束后立即执行，而宏任务要等到下次事件循环'
  },
  {
    title: '执行时机',
    content: '微任务队列会在以下时机被清空：1) 每个宏任务之后 2) 每个回调之后(如果JS调用栈为空)'
  },
  {
    title: 'UI渲染时机',
    content: '浏览器通常会在微任务队列清空后进行UI渲染，过多的微任务会延迟渲染'
  },
  {
    title: 'Node.js 差异',
    content: 'Node.js 中 process.nextTick 比微任务优先级更高，属于"nextTick队列"'
  },
  {
    title: '错误处理',
    content: '微任务中的未捕获错误不会阻止后续微任务执行，但会触发 unhandledrejection 事件'
  },
  {
    title: '性能考量',
    content: '微任务适合轻量级任务，耗时操作应考虑拆分为宏任务'
  }
];
</script>

<style lang="less" scoped>

.microtask-container {
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
    background: linear-gradient(90deg, #3498db, #9b59b6);
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
    border-left: 4px solid #9b59b6;
    padding-left: 0.8rem;
  }
}

.concept-card {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;

  p {
    margin: 0.5rem 0;

    strong {
      color: #3498db;
    }
  }
}

.event-loop-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
  flex-wrap: wrap;

  .step {
    background-color: #fff;
    border-radius: 8px;
    padding: 0.8rem 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #eaecef;
    text-align: center;
    min-width: 120px;

    &.highlight {
      background-color: #f0f7ff;
      border-color: #3498db;
    }

    .step-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.8rem;
      height: 1.8rem;
      background-color: #9b59b6;
      color: white;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 auto 0.5rem;
    }

    .step-content {
      font-size: 0.9rem;
    }
  }

  .arrow {
    margin: 0 0.5rem;
    color: #7f8c8d;
    font-weight: bold;
  }
}

.source-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.source-card {
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

  .source-type {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #3498db;
  }

  .source-examples {
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

  .source-desc {
    font-size: 0.9rem;
    color: #555;
    margin: 0 0 0.8rem;
  }

  .source-priority {
    font-size: 0.85rem;
    color: #7f8c8d;

    .priority-value {
      color: #e74c3c;
      font-weight: 500;
    }
  }
}

.timing-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.code-block, .output-block {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;
  overflow: hidden;

  .code-header, .output-header {
    background-color: #f8f9fa;
    padding: 0.8rem 1.2rem;
    font-weight: 500;
    border-bottom: 1px solid #eaecef;
  }
}

.code-block {
  pre {
    margin: 0;
    padding: 1rem;
    background-color: #282c34;

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      color: #abb2bf;
      font-size: 0.9rem;
    }
  }
}

.output-block {
  .output-content {
    padding: 1rem;

    .output-line {
      padding: 0.3rem 0;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.9rem;

      &.highlight {
        color: #3498db;
        font-weight: 500;
      }
    }
  }
}

.problem-card {
  background-color: #fff8f0;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;

  &.warning {
    background-color: #fff5f5;
    border-left: 4px solid #e74c3c;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    color: #e74c3c;
  }

  ul {
    padding-left: 1.2rem;
    margin: 0.8rem 0;

    li {
      margin-bottom: 0.3rem;
    }
  }

  .problem-example {
    margin-top: 1rem;

    pre {
      background-color: #282c34;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;

      code {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        color: #abb2bf;
        font-size: 0.85rem;
      }
    }

    .warning-text {
      color: #e74c3c;
      font-size: 0.9rem;
      margin: 0.5rem 0 0;
      text-align: center;
      font-weight: 500;
    }
  }
}

.optimize-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.optimize-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  h3 {
    font-size: 1.1rem;
    margin-top: 0;
    color: #2c3e50;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin: 0.5rem 0;
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

  .optimize-note {
    font-size: 0.8rem;
    color: #7f8c8d;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed #eaecef;
  }
}

.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
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
  .microtask-container {
    padding: 1rem;
  }

  .source-grid, .optimize-grid, .note-grid {
    grid-template-columns: 1fr;
  }

  .header .title {
    font-size: 1.8rem;
  }
}
</style>
