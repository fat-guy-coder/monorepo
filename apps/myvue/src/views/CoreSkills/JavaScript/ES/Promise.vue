<template>
  <div class="promise-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>JavaScript Promise 详解</h1>
        <p class="subtitle">异步编程的现代解决方案</p>
        <a @click="goToByRouteName" style="cursor: pointer">promise的实现原理</a>
        <p>promise过于重要，需要重点掌握</p>
      </div>
      <div class="demo-area">
        <div class="promise-visualization">
          <div class="promise-flow">
            <div class="state pending">
              <div class="state-label">Pending</div>
              <div class="state-icon">⏳</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="state resolved">
              <div class="state-label">Fulfilled</div>
              <div class="state-icon">✅</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="state rejected">
              <div class="state-label">Rejected</div>
              <div class="state-icon">❌</div>
            </div>
          </div>

          <div class="demo-controls">
            <button class="run-button" @click="runDemo">运行 Promise 演示</button>
            <div class="demo-result">
              <div class="result-label">执行结果：</div>
              <div class="result-content">{{ demoResult }}</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <section class="intro-section">
        <div class="intro-card">
          <h2>什么是 Promise？</h2>
          <p>
            Promise 是 JavaScript
            中处理异步操作的现代解决方案。它代表一个异步操作的最终完成（或失败）及其结果值。 Promise
            提供了一种更优雅的方式来处理异步操作，避免了传统的回调地狱（Callback Hell）问题。
          </p>

          <div class="promise-states">
            <div class="state-card">
              <div class="state-icon pending">⏳</div>
              <h3>Pending（待定）</h3>
              <p>初始状态，操作尚未完成</p>
            </div>
            <div class="state-card">
              <div class="state-icon fulfilled">✅</div>
              <h3>Fulfilled（已兑现）</h3>
              <p>操作成功完成</p>
            </div>
            <div class="state-card">
              <div class="state-icon rejected">❌</div>
              <h3>Rejected（已拒绝）</h3>
              <p>操作失败</p>
            </div>
          </div>
        </div>
      </section>

      <section class="basic-usage">
        <h2 class="section-title">Promise 基本使用</h2>
        <div class="usage-grid">
          <div class="usage-card">
            <h3>创建 Promise</h3>
            <pre><code>{{ createPromiseCode }}</code></pre>
            <p>Promise 构造函数接收一个执行器函数，该函数有两个参数：resolve 和 reject</p>
          </div>
          <div class="usage-card">
            <h3>使用 Promise</h3>
            <pre><code>{{ usePromiseCode }}</code></pre>
            <p>使用 .then() 处理成功结果，.catch() 处理错误，.finally() 执行清理操作</p>
          </div>
        </div>
      </section>

      <section class="chaining-section">
        <h2 class="section-title">Promise 链式调用</h2>
        <div class="chaining-example">
          <div class="code-block">
            <pre><code>{{ chainingCode }}</code></pre>
          </div>
          <div class="explanation">
            <h3>链式调用原理</h3>
            <p>Promise 的 .then() 方法返回一个新的 Promise，允许链式调用：</p>
            <ul>
              <li>如果 .then() 的回调函数返回一个值，新 Promise 会以该值兑现</li>
              <li>如果 .then() 的回调函数返回另一个 Promise，新 Promise 会采用该 Promise 的状态</li>
              <li>如果 .then() 的回调函数抛出错误，新 Promise 会被拒绝</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="return-values">
        <h2 class="section-title">.then() 方法返回值</h2>
        <div class="return-grid">
          <div class="return-card">
            <h3>返回普通值</h3>
            <pre><code>{{ returnPrimitiveCode }}</code></pre>
            <div class="return-result">
              <p>结果: {{ returnPrimitiveResult || '点击运行查看结果' }}</p>
            </div>
            <button class="run-small" @click="runReturnPrimitive">运行</button>
            <p class="return-desc">返回普通值时，Promise 会立即以该值兑现</p>
          </div>
          <div class="return-card">
            <h3>返回 Promise</h3>
            <pre><code>{{ returnPromiseCode }}</code></pre>
            <div class="return-result">
              <p>结果: {{ returnPromiseResult || '点击运行查看结果' }}</p>
            </div>
            <button class="run-small" @click="runReturnPromise">运行</button>
            <p class="return-desc">返回 Promise 时，会等待该 Promise 解决后再继续链式调用</p>
          </div>
        </div>
      </section>

      <section class="static-methods">
        <h2 class="section-title">Promise 静态方法</h2>
        <div class="methods-grid">
          <div class="method-card" v-for="(method, index) in staticMethods" :key="index">
            <div class="method-header">
              <div class="method-name">Promise.{{ method.name }}</div>
              <div class="method-signature">{{ method.signature }}</div>
            </div>
            <div class="method-description">
              {{ method.description }}
            </div>
            <div class="method-example">
              <pre><code>{{ method.example }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="performance-section">
        <h2 class="section-title">性能与注意事项</h2>
        <div class="performance-grid">
          <div class="performance-card">
            <h3>性能问题</h3>
            <ul>
              <li>Promise 比回调函数有更高的内存开销</li>
              <li>链式 Promise 会创建多个微任务</li>
              <li>深层嵌套的 Promise 可能导致堆栈追踪困难</li>
              <li>大量 Promise 可能影响垃圾回收效率</li>
            </ul>
          </div>
          <div class="performance-card">
            <h3>最佳实践</h3>
            <ul>
              <li>避免不必要的 Promise 嵌套</li>
              <li>使用 async/await 简化代码</li>
              <li>总是添加 .catch() 处理错误</li>
              <li>使用 Promise.all() 并行处理独立操作</li>
              <li>避免在循环中创建不必要的 Promise</li>
            </ul>
          </div>
          <div class="performance-card">
            <h3>垃圾回收</h3>
            <p>Promise 对象在解决后不会被立即回收：</p>
            <ul>
              <li>已解决的 Promise 会保留在内存中，直到没有引用</li>
              <li>链式调用会创建中间 Promise 对象</li>
              <li>避免在长期运行的应用中保留未使用的 Promise 引用</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="use-cases">
        <h2 class="section-title">适用场景</h2>
        <div class="cases-grid">
          <div class="case-card" v-for="(useCase, index) in useCases" :key="index">
            <div class="case-icon">{{ useCase.icon }}</div>
            <div class="case-content">
              <h3>{{ useCase.title }}</h3>
              <p>{{ useCase.description }}</p>
              <div class="case-example">
                <pre><code>{{ useCase.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Promise 是现代 JavaScript 异步编程的基石，合理使用可以显著提高代码可读性和可维护性</p>
      <div class="resources">
        <h3>推荐资源：</h3>
        <ul>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
              target="_blank"
              >MDN Promise 文档</a
            >
          </li>
          <li><a href="https://promisesaplus.com/" target="_blank">Promises/A+ 规范</a></li>
          <li>
            <a href="https://javascript.info/async" target="_blank">JavaScript.info 异步教程</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['goToByRouteName'])

const goToByRouteName = () => {
  emit('goToByRouteName', 'PromiseImplementation')
}

const demoResult = ref('点击"运行Promise演示"按钮查看结果')
const returnPrimitiveResult = ref('')
const returnPromiseResult = ref('')

const createPromiseCode = `// 创建 Promise
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = Math.random() > 0.5;

    if (success) {
      resolve('操作成功！');
    } else {
      reject(new Error('操作失败！'));
    }
  }, 1000);
});`

const usePromiseCode = `// 使用 Promise
promise
  .then(result => {
    console.log(result); // 成功时执行
  })
  .catch(error => {
    console.error(error); // 失败时执行
  })
  .finally(() => {
    console.log('操作完成'); // 无论成功失败都会执行
  });`

const chainingCode = `// Promise 链式调用
fetch('/api/user')
  .then(response => response.json()) // 返回普通值
  .then(user => {
    return fetch(\`/api/posts/\${user.id}\`); // 返回新Promise
  })
  .then(response => response.json())
  .then(posts => {
    console.log('用户帖子:', posts);
  })
  .catch(error => {
    console.error('请求失败:', error);
  });`

const returnPrimitiveCode = `// .then() 返回普通值
Promise.resolve(10)
  .then(value => {
    console.log('第一步:', value);
    return value * 2; // 返回普通值
  })
  .then(value => {
    console.log('第二步:', value);
    return value + 5; // 返回普通值
  })
  .then(value => {
    console.log('最终结果:', value);
    return value;
  });`

const returnPromiseCode = `// .then() 返回 Promise
Promise.resolve(10)
  .then(value => {
    console.log('第一步:', value);
    return new Promise(resolve => {
      setTimeout(() => resolve(value * 2), 1000);
    }); // 返回Promise
  })
  .then(value => {
    console.log('第二步:', value);
    return new Promise(resolve => {
      setTimeout(() => resolve(value + 5), 1000);
    }); // 返回Promise
  })
  .then(value => {
    console.log('最终结果:', value);
    return value;
  });`

const staticMethods = [
  {
    name: 'resolve',
    signature: 'Promise.resolve(value)',
    description: '创建一个已解决的 Promise 对象',
    example: `// 创建已解决的 Promise
const resolvedPromise = Promise.resolve(42);

resolvedPromise.then(value => {
  console.log(value); // 42
});`,
  },
  {
    name: 'reject',
    signature: 'Promise.reject(reason)',
    description: '创建一个已拒绝的 Promise 对象',
    example: `// 创建已拒绝的 Promise
const rejectedPromise = Promise.reject(new Error('失败'));

rejectedPromise.catch(error => {
  console.error(error.message); // '失败'
});`,
  },
  {
    name: 'all',
    signature: 'Promise.all(iterable)',
    description: '等待所有 Promise 完成，或任一 Promise 失败',
    example: `// 并行执行多个 Promise
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise(resolve => setTimeout(resolve, 100, 3));

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [1, 2, 3]
  });`,
  },
  {
    name: 'allSettled',
    signature: 'Promise.allSettled(iterable)',
    description: '等待所有 Promise 完成（无论成功或失败）',
    example: `// 获取所有 Promise 的结果
const promises = [
  Promise.resolve(1),
  Promise.reject(new Error('失败')),
  Promise.resolve(3)
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('成功:', result.value);
      } else {
        console.log('失败:', result.reason.message);
      }
    });
  });`,
  },
  {
    name: 'race',
    signature: 'Promise.race(iterable)',
    description: '返回第一个解决（无论成功或失败）的 Promise',
    example: `// 获取最先完成的 Promise
const promise1 = new Promise(resolve => setTimeout(resolve, 500, '第一个'));
const promise2 = new Promise(resolve => setTimeout(resolve, 100, '第二个'));

Promise.race([promise1, promise2])
  .then(value => {
    console.log(value); // '第二个'
  });`,
  },
  {
    name: 'any',
    signature: 'Promise.any(iterable)',
    description: '返回第一个成功的 Promise，如果全部失败则返回 AggregateError',
    example: `// 获取第一个成功的 Promise
const promises = [
  Promise.reject(new Error('错误1')),
  new Promise(resolve => setTimeout(resolve, 200, '成功1')),
  Promise.reject(new Error('错误2'))
];

Promise.any(promises)
  .then(value => {
    console.log(value); // '成功1'
  });`,
  },
]

const useCases = [
  {
    icon: '🌐',
    title: 'API 请求',
    description: '处理网络请求和响应',
    example: `// 使用 fetch API
function getUserData(userId) {
  return fetch(\`https://api.example.com/users/\${userId}\`)
    .then(response => {
      if (!response.ok) {
        throw new Error('网络响应异常');
      }
      return response.json();
    });
}

// 使用
getUserData(123)
  .then(user => console.log(user))
  .catch(error => console.error(error));`,
  },
  {
    icon: '📁',
    title: '文件操作',
    description: '异步读取或写入文件',
    example: `// Node.js 文件读取
const fs = require('fs').promises;

function readFileAsync(path) {
  return fs.readFile(path, 'utf8')
    .then(data => JSON.parse(data))
    .catch(error => {
      console.error('文件读取失败:', error);
      return {};
    });
}

// 使用
readFileAsync('config.json')
  .then(config => console.log(config));`,
  },
  {
    icon: '⏱️',
    title: '定时操作',
    description: '实现带延迟的异步操作',
    example: `// 带延迟的 Promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用
delay(2000)
  .then(() => {
    console.log('2秒后执行');
    return delay(1000);
  })
  .then(() => {
    console.log('再1秒后执行');
  });`,
  },
  {
    icon: '🔄',
    title: '异步流程控制',
    description: '管理复杂的异步操作序列',
    example: `// 顺序执行异步操作
function executeSequentially(promises) {
  return promises.reduce((chain, promiseFunc) => {
    return chain.then(promiseFunc);
  }, Promise.resolve());
}

// 使用
executeSequentially([
  () => doTask1(),
  () => doTask2(),
  () => doTask3()
])
.then(finalResult => console.log(finalResult));`,
  },
]

const runDemo = () => {
  demoResult.value = 'Promise 执行中...'

  let promise: Promise<void> | null = new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3 ? resolve('成功完成操作！') : reject(new Error('操作失败！')) // eslint-disable-line
    }, 1500)
  })
    .then((result) => {
      demoResult.value = `✅ 成功: ${result}`
    })
    .catch((error) => {
      demoResult.value = `❌ 错误: ${error.message}`
    })
    .finally(() => {
      setTimeout(() => {
        demoResult.value = '演示完成，可以再次运行'
      }, 2000)
      promise = null
    })
}

const runReturnPrimitive = () => {
  returnPrimitiveResult.value = '执行中...'

  Promise.resolve(10)
    .then((value) => {
      returnPrimitiveResult.value = `第一步: ${value}`
      return value * 2
    })
    .then((value) => {
      returnPrimitiveResult.value += `\\n第二步: ${value}`
      return value + 5
    })
    .then((value) => {
      returnPrimitiveResult.value += `\\n最终结果: ${value}`
    })
}

const runReturnPromise = () => {
  returnPromiseResult.value = '执行中...'

  Promise.resolve(10)
    .then((value) => {
      returnPromiseResult.value = `第一步: ${value}`
      return new Promise((resolve) => {
        setTimeout(() => resolve(value * 2), 1000)
      })
    })
    .then((value) => {
      returnPromiseResult.value += `\\n第二步: ${value}`
      return new Promise((resolve) => {
        setTimeout(() => resolve(Number(value) + 5), 1000)
      })
    })
    .then((value) => {
      returnPromiseResult.value += `\\n最终结果: ${value}`
    })
}
</script>

<style lang="less" scoped>

// 颜色变量
@primary-color: #4a6cf7;
@primary-light: #e6eeff;
@secondary-color: #3a56d4;
@accent-color: #ff9800;
@text-color: #2c3e50;
@light-gray: #f8f9fc;
@border-color: #e0e6ed;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #4caf50;
@error-color: #f44336;

// 基础样式
.promise-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  .title-wrapper {
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @secondary-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.3rem;
      color: #666;
      font-weight: 300;
    }
  }
}

.demo-area {
  max-width: 900px;
  margin: 0 auto;

  .promise-visualization {
    background: @light-gray;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: @card-shadow;

    .promise-flow {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;

      .state {
        text-align: center;
        padding: 1.5rem;
        border-radius: 12px;
        min-width: 150px;
        box-shadow: @card-shadow;
        background: white;

        .state-icon {
          font-size: 2.5rem;
          margin: 0.5rem 0;
        }

        .state-label {
          font-weight: 600;
        }

        &.pending {
          border-top: 4px solid #ffc107;
        }

        &.resolved {
          border-top: 4px solid @success-color;
        }

        &.rejected {
          border-top: 4px solid @error-color;
        }
      }

      .flow-arrow {
        font-size: 2rem;
        color: #777;
      }
    }

    .demo-controls {
      text-align: center;

      .run-button {
        background: @primary-color;
        color: white;
        border: none;
        padding: 0.8rem 1.8rem;
        border-radius: 30px;
        font-size: 1.1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: darken(@primary-color, 10%);
          transform: translateY(-2px);
        }
      }

      .demo-result {
        margin-top: 1.5rem;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        box-shadow: @card-shadow;
        border: 1px solid @border-color;
        min-height: 80px;
        text-align: left;

        .result-label {
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: @primary-color;
        }

        .result-content {
          font-family: 'Source Code Pro', monospace;
          white-space: pre-line;
        }
      }
    }
  }
}

.content {
  display: grid;
  gap: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, @primary-color, @accent-color);
    border-radius: 2px;
  }
}

.intro-section {
  .intro-card {
    background: @light-gray;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: @card-shadow;

    h2 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }

    p {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .promise-states {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .state-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .state-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;

        &.pending {
          color: #ffc107;
        }

        &.fulfilled {
          color: @success-color;
        }

        &.rejected {
          color: @error-color;
        }
      }

      h3 {
        color: @secondary-color;
        margin: 0.5rem 0;
      }

      p {
        margin: 0;
        color: #666;
        font-size: 0.95rem;
      }
    }
  }
}

.basic-usage {
  .usage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .usage-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      border-top: 4px solid @primary-color;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 1rem;
      }

      pre {
        background: #2d2d2d;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;

        code {
          font-family: 'Source Code Pro', monospace;
          color: #f8f8f2;
          font-size: 0.95rem;
          line-height: 1.6;

          .comment {
            color: #6a9955;
          }
          .keyword {
            color: #c586c0;
          }
          .function {
            color: #dcdcaa;
          }
          .string {
            color: #ce9178;
          }
        }
      }

      p {
        margin: 1rem 0 0;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }
  }
}

.chaining-section {
  .chaining-example {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 1.5rem;
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: @card-shadow;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .code-block {
      pre {
        margin: 0;
        background: #2d2d2d;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;

        code {
          font-family: 'Source Code Pro', monospace;
          color: #f8f8f2;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      }
    }

    .explanation {
      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 1rem;
      }

      ul {
        padding-left: 1.2rem;

        li {
          margin-bottom: 0.8rem;
          line-height: 1.6;
        }
      }
    }
  }
}

.return-values {
  .return-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .return-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      border-top: 4px solid @primary-color;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 1rem;
      }

      pre {
        background: #2d2d2d;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;
        margin-bottom: 1rem;

        code {
          font-family: 'Source Code Pro', monospace;
          color: #f8f8f2;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      }

      .return-result {
        background: #f8f9fc;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        min-height: 60px;
        font-family: 'Source Code Pro', monospace;
        white-space: pre-line;
      }

      .run-small {
        background: @primary-light;
        color: @primary-color;
        border: 1px solid @primary-color;
        padding: 0.4rem 1rem;
        border-radius: 4px;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 1rem;
        transition: all 0.2s;

        &:hover {
          background: @primary-color;
          color: white;
        }
      }

      .return-desc {
        margin: 0;
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
}

.static-methods {
  .methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
  }

  .method-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;
    border-left: 4px solid @primary-color;

    .method-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;

      .method-name {
        font-weight: 700;
        color: @secondary-color;
        font-size: 1.2rem;
      }

      .method-signature {
        font-family: 'Source Code Pro', monospace;
        background: #f0f4f8;
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        font-size: 0.9rem;
        color: #d35400;
      }
    }

    .method-description {
      margin-bottom: 1rem;
      font-size: 0.95rem;
      color: #555;
      line-height: 1.7;
    }

    .method-example {
      pre {
        margin: 0;
        background: #2d2d2d;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;

        code {
          font-family: 'Source Code Pro', monospace;
          color: #f8f8f2;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.performance-section {
  .performance-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .performance-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;

    h3 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid @primary-light;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.8rem;
        line-height: 1.6;
      }
    }

    p {
      margin: 0 0 1rem;
      font-size: 0.95rem;
      color: #555;
      line-height: 1.7;
    }
  }
}

.use-cases {
  .cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
  }

  .case-card {
    display: flex;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;
    gap: 1.2rem;
    border-top: 3px solid @primary-color;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .case-icon {
      width: 50px;
      height: 50px;
      background: @primary-light;
      color: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .case-content {
      flex: 1;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.2rem;
      }

      p {
        margin: 0 0 1rem;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }

    .case-example {
      background: #2d2d2d;
      border-radius: 6px;
      padding: 0.8rem;
      margin-top: 0.5rem;

      pre {
        margin: 0;

        code {
          font-family: 'Source Code Pro', monospace;
          color: #f8f8f2;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.footer {
  margin-top: 4rem;
  padding: 2rem;
  text-align: center;
  background: @light-gray;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
  color: @secondary-color;
  box-shadow: @card-shadow;
  border-top: 2px solid fade(@primary-color, 30%);

  p {
    margin-bottom: 1.5rem;
  }

  .resources {
    margin-top: 1.5rem;

    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      li a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .promise-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .intro-card {
    padding: 1.5rem !important;
  }

  .chaining-example {
    grid-template-columns: 1fr !important;
  }
}
</style>
