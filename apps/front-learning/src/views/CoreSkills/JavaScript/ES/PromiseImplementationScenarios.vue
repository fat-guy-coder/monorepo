<template>
  <div class="promise-scenarios-container">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1 class="main-title">🚀 Promise 实现场景基本介绍</h1>
      <p class="subtitle">了解异步编程的核心模式与高级应用，并实现基本场景</p>
      <p><a @click="goToPromiseScenarios">Promise 场景实现</a></p>
    </header>

    <!-- 场景导航 -->
    <nav class="scenario-nav">
      <div class="nav-container">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          :class="{ active: activeScenario === scenario.id }"
          @click="activeScenario = scenario.id"
        >
          <span class="scenario-icon">{{ scenario.icon }}</span>
          <span class="scenario-label">{{ scenario.label }}</span>
        </button>
      </div>
    </nav>

    <!-- 场景内容 -->
    <main class="scenario-content">
      <!-- 链式调用 -->
      <section v-if="activeScenario === 'chain'" class="scenario-section">
        <div class="scenario-header">
          <h2>🔗 链式调用实现</h2>
          <p>实现Promise的链式调用，支持then、catch、finally方法</p>
        </div>

        <div class="implementation-grid">
          <div class="code-card">
            <h3>核心实现</h3>
            <pre><code>class MyPromise {
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  private value: any = null;
  private reason: any = null;
  private onFulfilledCallbacks: Function[] = [];
  private onRejectedCallbacks: Function[] = [];

  constructor(executor: (resolve: Function, reject: Function) => void) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  private resolve(value: any) {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
      this.onFulfilledCallbacks.forEach(callback => callback());
    }
  }

  private reject(reason: any) {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
      this.onRejectedCallbacks.forEach(callback => callback());
    }
  }

  then(onFulfilled?: Function, onRejected?: Function) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value: any) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason: any) => { throw reason };

    const promise2 = new MyPromise((resolve: Function, reject: Function) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled!(this.value);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected!(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      } else {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled!(this.value);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected!(this.reason);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }
}</code></pre>
          </div>

          <div class="demo-card">
            <h3>使用示例</h3>
            <pre><code>// 测试链式调用
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Hello'), 1000);
});

promise
  .then(value => {
    console.log(value); // Hello
    return value + ' World';
  })
  .then(value => {
    console.log(value); // Hello World
    return value + '!';
  })
  .then(value => {
    console.log(value); // Hello World!
  })
  .catch(error => {
    console.error('Error:', error);
  });</code></pre>
          </div>
        </div>
      </section>

      <!-- 并发控制 -->
      <section v-if="activeScenario === 'concurrency'" class="scenario-section">
        <div class="scenario-header">
          <h2>🚦 并发控制实现</h2>
          <p>实现Promise并发控制器，限制同时执行的异步任务数量</p>
        </div>

        <div class="implementation-grid">
          <div class="code-card">
            <h3>并发控制器</h3>
            <pre><code>class PromisePool {
  private maxConcurrent: number;
  private queue: (() => Promise&lt;any&gt;)[] = [];
  private activeCount = 0;
  private results: any[] = [];

  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
  }

  add(task: () => Promise&lt;any&gt;): Promise&lt;any&gt; {
    return new Promise((resolve, reject) => {
      const execute = () => {
        this.activeCount++;
        task()
          .then(res => {
            this.results.push(res);
            resolve(res);
          })
          .catch(reject)
          .finally(() => {
            this.activeCount--;
            this.next();
          });
      };

      if (this.activeCount < this.maxConcurrent) {
        execute();
      } else {
        this.queue.push(execute);
      }
    });
  }

  private next() {
    if (this.queue.length > 0 && this.activeCount < this.maxConcurrent) {
      const nextTask = this.queue.shift();
      nextTask?.();
    }
  }

  async addAll(tasks: (() => Promise&lt;any&gt;)[]): Promise&lt;any[]&gt; {
    const promises = tasks.map(task => this.add(task));
    return Promise.all(promises);
  }
}</code></pre>
          </div>

          <div class="demo-card">
            <h3>使用示例</h3>
            <pre><code>// 创建并发控制器
const pool = new PromisePool(2); // 最大并发数2

// 模拟异步任务
const createTask = (id: number) => () =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(`任务 ${id} 完成`);
      resolve(id);
    }, Math.random() * 2000)
  );

// 添加多个任务
const tasks = Array.from({ length: 10 }, (_, i) => createTask(i + 1));

// 执行所有任务
pool.addAll(tasks).then(results => {
  console.log('所有任务完成:', results);
});</code></pre>
            <button @click="runConcurrencyDemo" class="demo-btn">运行演示</button>
            <div class="demo-output">
              <p v-if="concurrencyDemoResult">{{ concurrencyDemoResult }}</p>
              <p v-else>点击按钮查看结果</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Scheduler实现 -->
      <section v-if="activeScenario === 'scheduler'" class="scenario-section">
        <div class="scenario-header">
          <h2>📅 Scheduler 实现</h2>
          <p>实现任务调度器，支持添加、执行、暂停、恢复任务</p>
        </div>

        <div class="implementation-grid">
          <div class="code-card">
            <h3>Scheduler 核心实现</h3>
            <pre><code>class Scheduler {
  private queue: (() => Promise&lt;any&gt;)[] = [];
  private running = false;
  private paused = false;

  add(task: () => Promise&lt;any&gt;): Promise&lt;any&gt; {
    return new Promise((resolve, reject) => {
      const wrappedTask = async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      this.queue.push(wrappedTask);
      if (this.running && !this.paused) {
        this.process();
      }
    });
  }

  async start() {
    if (this.running) return;
    this.running = true;
    this.paused = false;
    await this.process();
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.process();
  }

  private async process() {
    while (this.queue.length > 0 && this.running && !this.paused) {
      const task = this.queue.shift();
      if (task) {
        await task();
      }
    }
  }

  clear() {
    this.queue = [];
  }

  getQueueLength() {
    return this.queue.length;
  }
}</code></pre>
          </div>

          <div class="demo-card">
            <h3>使用示例</h3>
            <pre><code>// 创建调度器
const scheduler = new Scheduler();

// 添加任务
const task1 = () => new Promise(resolve =>
  setTimeout(() => resolve('任务1完成'), 1000));
const task2 = () => new Promise(resolve =>
  setTimeout(() => resolve('任务2完成'), 800));
const task3 = () => new Promise(resolve =>
  setTimeout(() => resolve('任务3完成'), 600));

// 添加任务到调度器
scheduler.add(task1).then(console.log);
scheduler.add(task2).then(console.log);
scheduler.add(task3).then(console.log);

// 开始执行
scheduler.start();

// 可以暂停和恢复
setTimeout(() => scheduler.pause(), 500);
setTimeout(() => scheduler.resume(), 2000);</code></pre>
            <button @click="runSchedulerDemo" class="demo-btn">运行演示</button>
            <div class="demo-output">
              <p v-if="schedulerDemoResult">{{ schedulerDemoResult }}</p>
              <p v-else>点击按钮查看结果</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 超时控制 -->
      <section v-if="activeScenario === 'timeout'" class="scenario-section">
        <div class="scenario-header">
          <h2>⏱️ 超时控制实现</h2>
          <p>为Promise添加超时控制，防止长时间等待</p>
        </div>

        <div class="implementation-grid">
          <div class="code-card">
            <h3>超时控制实现</h3>
            <pre><code>// 带超时的Promise包装器
function withTimeout&lt;T&gt;(
  promise: Promise&lt;T&gt;,
  timeout: number,
  timeoutMessage = '操作超时'
): Promise&lt;T&gt; {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, timeout);

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timer));
  });
}

// 可取消的Promise
class CancellablePromise&gt;T&gt; {
  private promise: Promise&lt;T&gt;;
  private reject: (reason?: any) => void;

  constructor(executor: (resolve: (value: T) => void, reject: (reason?: any) => void) => void) {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      executor(resolve, reject);
    });
  }

  then&lt;TResult1 = T, TResult2 = never&gt;(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike&lt;TResult1&gt;) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike&lt;TResult2&gt;) | null
  ): Promise&lt;TResult1 | TResult2&gt; {
    return this.promise.then(onfulfilled, onrejected);
  }

  catch&lt;TResult = never&gt;(
    onrejected?: ((reason: any) => TResult | PromiseLike&lt;TResult&gt;) | null
  ): Promise&lt;T | TResult&gt; {
    return this.promise.catch(onrejected);
  }

  cancel(reason = '操作已取消') {
    this.reject(new Error(reason));
  }
}</code></pre>
          </div>

          <div class="demo-card">
            <h3>使用示例</h3>
            <pre><code>// 超时控制示例
const longTask = () => new Promise(resolve =>
  setTimeout(() => resolve('任务完成'), 3000));

// 2秒超时
withTimeout(longTask(), 2000, '任务超时')
  .then(result => console.log('成功:', result))
  .catch(error => console.log('失败:', error.message));

// 可取消的Promise
const cancellableTask = new CancellablePromise(resolve => {
  setTimeout(() => resolve('任务完成'), 2000);
});

cancellableTask
  .then(result => console.log('成功:', result))
  .catch(error => console.log('失败:', error.message));

// 1秒后取消
setTimeout(() => cancellableTask.cancel(), 1000);</code></pre>
            <button @click="runTimeoutDemo" class="demo-btn">运行演示</button>
            <div class="demo-output">
              <p v-if="timeoutDemoResult">{{ timeoutDemoResult }}</p>
              <p v-else>点击按钮查看结果</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Promise和Generator实现async -->
      <section v-if="activeScenario === 'async'" class="scenario-section">
        <div class="scenario-header">
          <h2>🔄 Promise和Generator实现async</h2>
          <p>使用Promise和Generator实现async/await功能</p>
        </div>

        <div class="implementation-grid">
          <div class="code-card">
            <h3>async/await 实现</h3>
            <pre><code>// 使用Generator和Promise实现async/await
function asyncToGenerator(generatorFn: Function) {
  return function (...args: any[]) {
    const gen = generatorFn.apply(this, args);

    return new Promise((resolve, reject) => {
      function step(key: string, arg?: any) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        const { value, done } = generatorResult;

        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            function onFulfilled(val) {
              step("next", val);
            },
            function onRejected(err) {
              step("throw", err);
            }
          );
        }
      }

      step("next");
    });
  };
}

// 示例：将async函数转换为Generator
function* asyncExample() {
  try {
    const result1 = yield new Promise(resolve =>
      setTimeout(() => resolve('第一步'), 1000));
    console.log(result1);

    const result2 = yield new Promise(resolve =>
      setTimeout(() => resolve('第二步'), 800));
    console.log(result2);

    return '完成';
  } catch (error) {
    console.error('错误:', error);
    throw error;
  }
}

// 使用asyncToGenerator包装
const asyncFunction = asyncToGenerator(asyncExample);</code></pre>
          </div>

          <div class="demo-card">
            <h3>使用示例</h3>
            <pre><code>// 使用实现的async函数
asyncFunction()
  .then(result => console.log('最终结果:', result))
  .catch(error => console.error('错误:', error));

// 对比原生async/await
async function nativeAsync() {
  try {
    const result1 = await new Promise(resolve =>
      setTimeout(() => resolve('第一步'), 1000));
    console.log(result1);

    const result2 = await new Promise(resolve =>
      setTimeout(() => resolve('第二步'), 800));
    console.log(result2);

    return '完成';
  } catch (error) {
    console.error('错误:', error);
    throw error;
  }
}</code></pre>

          </div>
        </div>
      </section>

      <!-- 高级应用 -->
      <section v-if="activeScenario === 'advanced'" class="scenario-section">
        <div class="scenario-header">
          <h2>🚀 高级应用场景</h2>
          <p>Promise的高级应用和实际场景</p>
        </div>

        <div class="advanced-grid">
          <div class="advanced-card">
            <h3>重试机制</h3>
            <pre><code>function withRetry&lt;T&gt;(
    fn: () => Promise&lt;T&gt;,
  maxRetries = 3,
  delay = 1000
): Promise&lt;T&gt; {
  return new Promise((resolve, reject) => {
    const attempt = (retryCount: number) => {
      fn()
        .then(resolve)
        .catch(error => {
          if (retryCount >= maxRetries) {
            reject(error);
          } else {
            console.log(`重试 #${retryCount + 1}`);
            setTimeout(() => attempt(retryCount + 1), delay);
          }
        });
    };
    attempt(0);
  });
}</code></pre>
          </div>

          <div class="advanced-card">
            <h3>缓存机制</h3>
            <pre><code>class PromiseCache {
  private cache = new Map&lt;string, Promise&lt;any&gt;&gt;();

  async get&lt;T&gt;(key: string, fn: () => Promise&lt;T&gt;): Promise&lt;T&gt; {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const promise = fn();
    this.cache.set(key, promise);

    try {
      const result = await promise;
      return result;
    } catch (error) {
      this.cache.delete(key);
      throw error;
    }
  }
}</code></pre>
          </div>

          <div class="advanced-card">
            <h3>进度通知</h3>
            <pre><code>class ProgressPromise&lt;T&gt; {
  private promise: Promise&lt;T&gt;;
  private progressCallbacks: ((progress: number) => void)[] = [];

  constructor(executor: (resolve: (value: T) => void, reject: (reason?: any) => void, progress: (progress: number) => void) => void) {
    this.promise = new Promise((resolve, reject) => {
      executor(resolve, reject, (progress) => {
        this.progressCallbacks.forEach(callback => callback(progress));
      });
    });
  }

  onProgress(callback: (progress: number) => void) {
    this.progressCallbacks.push(callback);
    return this;
  }

  then&lt;TResult1 = T, TResult2 = never&gt;(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike&lt;TResult1&gt;) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike&lt;TResult2&gt;) | null
  ): Promise&lt;TResult1 | TResult2&gt; {
    return this.promise.then(onfulfilled, onrejected);
  }
}</code></pre>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>



<script lang="ts" setup>
import { ref } from 'vue';

// 场景配置
const scenarios = [
  { id: 'chain', label: '链式调用', icon: '🔗' },
  { id: 'concurrency', label: '并发控制', icon: '🚦' },
  { id: 'scheduler', label: 'Scheduler', icon: '📅' },
  { id: 'timeout', label: '超时控制', icon: '⏱️' },
  { id: 'async', label: 'async实现', icon: '🔄' },
  { id: 'advanced', label: '高级应用', icon: '🚀' }
];

const activeScenario = ref('chain');

// 演示结果
const chainDemoResult = ref('');
const concurrencyDemoResult = ref('');
const schedulerDemoResult = ref('');
const timeoutDemoResult = ref('');
const asyncDemoResult = ref('');

// 链式调用演示


// 并发控制演示
const runConcurrencyDemo = () => {
  concurrencyDemoResult.value = '执行中...';

  class PromisePool {
    private maxConcurrent: number;
    private queue: (() => Promise<any>)[] = [];
    private activeCount = 0;
    private results: any[] = [];

    constructor(maxConcurrent = 3) {
      this.maxConcurrent = maxConcurrent;
    }

    add(task: () => Promise<any>): Promise<any> {
      return new Promise((resolve, reject) => {
        const execute = () => {
          this.activeCount++;
          task()
            .then(res => {
              this.results.push(res);
              resolve(res);
            })
            .catch(reject)
            .finally(() => {
              this.activeCount--;
              this.next();
            });
        };

        if (this.activeCount < this.maxConcurrent) {
          execute();
        } else {
          this.queue.push(execute as () => Promise<any>);
        }
      });
    }

    private next() {
      if (this.queue.length > 0 && this.activeCount < this.maxConcurrent) {
        const nextTask = this.queue.shift();
        nextTask?.();
      } else if (this.activeCount === 0 && this.queue.length === 0) {
        concurrencyDemoResult.value = `所有任务完成! 共 ${this.results.length} 个任务`;
      }
    }
  }

  const pool = new PromisePool(2);
  concurrencyDemoResult.value = '任务开始 (并发数: 2)...';

  for (let i = 1; i <= 5; i++) {
    pool.add(() =>
      new Promise(resolve =>
        setTimeout(() => {
          resolve(i);
        }, Math.random() * 2000)
      )
    );
  }
};

// Scheduler演示
const runSchedulerDemo = () => {
  schedulerDemoResult.value = '执行中...';

  class Scheduler {
    private queue: (() => Promise<any>)[] = [];
    private running = false;
    private paused = false;

    add(task: () => Promise<any>): Promise<any> {
      return new Promise((resolve, reject) => {
        const wrappedTask = async () => {
          try {
            const result = await task();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };

        this.queue.push(wrappedTask);
        if (this.running && !this.paused) {
          this.process();
        }
      });
    }

    async start() {
      if (this.running) return;
      this.running = true;
      this.paused = false;
      await this.process();
    }

    private async process() {
      while (this.queue.length > 0 && this.running && !this.paused) {
        const task = this.queue.shift();
        if (task) {
          await task();
        }
      }
    }
  }

  const scheduler = new Scheduler();
  schedulerDemoResult.value = '调度器启动...';

  scheduler.add(() => new Promise(resolve => setTimeout(() => resolve('任务1完成'), 1000)));
  scheduler.add(() => new Promise(resolve => setTimeout(() => resolve('任务2完成'), 800)));
  scheduler.add(() => new Promise(resolve => setTimeout(() => resolve('任务3完成'), 600)));

  scheduler.start().then(() => {
    schedulerDemoResult.value = '所有任务完成!';
  });
};

// 超时控制演示
const runTimeoutDemo = () => {
  timeoutDemoResult.value = '执行中...';

  function withTimeout<T>(
    promise: Promise<T>,
    timeout: number,
    timeoutMessage = '操作超时'
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(timeoutMessage));
      }, timeout);

      promise
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timer));
    });
  }

  const longTask = () => new Promise(resolve => setTimeout(() => resolve('任务完成'), 3000));

  withTimeout(longTask(), 2000, '任务超时')
    .then(result => {
      timeoutDemoResult.value = `成功: ${result}`;
    })
    .catch(error => {
      timeoutDemoResult.value = `失败: ${error.message}`;
    });
};

// async实现演示
const runAsyncDemo = () => {
  asyncDemoResult.value = '执行中...';

  function asyncToGenerator(generatorFn: Function) {
    return function (...args: any[]) {
      const gen = generatorFn.apply(this as any, args);

      return new Promise((resolve, reject) => {
        function step(key: string, arg?: any) {
          let generatorResult;
          try {
            generatorResult = gen[key](arg);
          } catch (error) {
            return reject(error);
          }

          const { value, done } = generatorResult;

          if (done) {
            return resolve(value);
          } else {
            return Promise.resolve(value).then(
              function onFulfilled(val) {
                step("next", val);
              },
              function onRejected(err) {
                step("throw", err);
              }
            );
          }
        }

        step("next");
      });
    };
  }





};

const emit = defineEmits(['goToByRouteName'])

const goToPromiseScenarios = () => {
  emit('goToByRouteName', 'PromiseScenarios')
}
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #2c3e50;
@secondary-color: #3498db;
@accent-color: #e74c3c;
@success-color: #27ae60;
@warning-color: #f39c12;
@light-bg: #f8f9fa;
@border-color: #e9ecef;
@text-color: #495057;
@code-bg: #f1f3f4;

.promise-scenarios-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background: white;
}

// 页面标题
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, @light-bg 0%, #ffffff 100%);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .main-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #6c757d;
    font-weight: 400;
  }
}

// 场景导航
.scenario-nav {
  margin-bottom: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;

  .nav-container {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;

    button {
      flex: 1;
      min-width: 140px;
      padding: 1rem;
      background: @light-bg;
      border: none;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        background: lighten(@secondary-color, 40%);
        transform: translateY(-2px);
      }

      &.active {
        background: @secondary-color;
        color: white;
        box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
      }

      .scenario-icon {
        font-size: 1.5rem;
      }

      .scenario-label {
        font-size: 0.8rem;
      }
    }
  }
}

// 场景内容
.scenario-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;
}

.scenario-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid @border-color;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6c757d;
    font-size: 1rem;
  }
}

// 实现网格
.implementation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

// 代码卡片
.code-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid @secondary-color;

  h3 {
    color: @primary-color;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  pre {
    background: @code-bg;
    border-radius: 6px;
    padding: 1rem;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-x: auto;
    margin: 0;

    code {
      color: @primary-color;
    }
  }
}

// 演示卡片
.demo-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid @success-color;

  h3 {
    color: @primary-color;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  pre {
    background: @code-bg;
    border-radius: 6px;
    padding: 1rem;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-x: auto;
    margin-bottom: 1rem;
  }

  .demo-btn {
    background: @success-color;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;

    &:hover {
      background: darken(@success-color, 10%);
      transform: translateY(-2px);
    }
  }

  .demo-output {
    background: white;
    border-radius: 6px;
    padding: 1rem;
    border: 1px solid @border-color;
    min-height: 60px;
    font-family: monospace;
    font-size: 0.9rem;
    white-space: pre-line;
  }
}

// 高级应用网格
.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.advanced-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid @accent-color;

  h3 {
    color: @primary-color;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  pre {
    background: @code-bg;
    border-radius: 6px;
    padding: 1rem;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-x: auto;
    margin: 0;

    code {
      color: @primary-color;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .promise-scenarios-container {
    padding: 1rem;
  }

  .page-header .main-title {
    font-size: 2rem;
  }

  .scenario-nav .nav-container {
    flex-wrap: wrap;

    button {
      min-width: calc(50% - 0.25rem);
    }
  }

  .implementation-grid {
    grid-template-columns: 1fr;
  }

  .advanced-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .page-header .main-title {
    font-size: 1.5rem;
  }

  .scenario-header h2 {
    font-size: 1.5rem;
  }
}
</style>
