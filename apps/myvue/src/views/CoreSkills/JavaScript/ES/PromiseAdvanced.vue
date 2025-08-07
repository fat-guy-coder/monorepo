<template>
  <div class="promise-container">
    <header class="header">
      <h1>Promise进阶使用指南</h1>
      <p class="subtitle">掌握Promise的高级技巧与最佳实践</p>
    </header>

    <div class="content-wrapper">
      <section class="execution-order">
        <h2><span class="icon">🔄</span> Promise执行顺序</h2>
        <div class="card">
          <p>
            理解Promise的执行顺序是掌握异步编程的关键。JavaScript的事件循环决定了Promise的执行时机。
          </p>

          <div class="code-block">
            <pre><code>console.log('开始');

// 宏任务
setTimeout(() => console.log('setTimeout'), 0);

// Promise（微任务）
Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

console.log('结束');

/* 输出顺序:
   开始
   结束
   Promise 1
   Promise 2
   setTimeout
*/</code></pre>
          </div>

          <div class="principles">
            <h3>执行原则：</h3>
            <ul>
              <li>
                <strong>微任务优先</strong>：Promise回调属于微任务，比宏任务(setTimeout等)优先执行
              </li>
              <li><strong>事件循环</strong>：每个事件循环包含一个宏任务和所有微任务</li>
              <li><strong>链式顺序</strong>：每个then回调会创建一个新的微任务</li>
              <li><strong>嵌套顺序</strong>：嵌套Promise会影响执行顺序</li>
            </ul>
          </div>

          <div class="advanced-example">
            <h3>复杂执行顺序示例：</h3>
            <div class="code-block">
              <pre><code>console.log('开始');

setTimeout(() => {
  console.log('setTimeout 1');
  Promise.resolve().then(() => console.log('嵌套 Promise'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    return Promise.resolve();
  })
  .then(() => {
    console.log('Promise 2');
    setTimeout(() => console.log('Promise中的setTimeout'), 0);
  });

console.log('结束');

/* 输出顺序:
   开始
   结束
   Promise 1
   Promise 2
   setTimeout 1
   嵌套 Promise
   Promise中的setTimeout
*/</code></pre>
            </div>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="concurrency">
          <h2><span class="icon">🏎️</span> 并发控制</h2>
          <div class="card">
            <h3>Promise.race和Promise.all一起使用</h3>
            <p>Promise.race和Promise.all一起使用，实现并发控制。</p>

            <div class="code-block">
              <pre><code>// 并发控制
const urls = [/* 100个URL */];
const fetchTasks = urls.map(url => () => fetch(url));

batchRequests(fetchTasks, 10)
  .then(responses => console.log('所有请求完成'))
  .catch(err => console.error('请求出错:', err));


async function batchRequests(tasks, concurrency = 5) {
    const results = [];
    const set = new Set();

    for (const task of tasks) {
      const p = task();
      results.push(p);
      set.add(p.then(e=>{
        set.delete(p);
      }).catch(err=>{
        set.delete(p);
        results.push(err);
      }));
      if (set.size >= concurrency) {
       await  Promise.race(set)
      }
    }
    return Promise.all(results);
 }
</code></pre>
            </div>

            <h3>使用场景：</h3>
            <ul>
              <li>并发控制</li>
              <li>批量请求</li>
              <li>超时控制</li>
            </ul>
          </div>
        </section>

        <section class="recycling">
          <h2><span class="icon">♻️</span> Promise实例回收</h2>
          <div class="card">
            <p>Promise实例的内存管理是性能优化的关键点。</p>

            <h3>回收时机：</h3>
            <ul>
              <li>当Promise状态变为fulfilled或rejected</li>
              <li>所有关联的then/catch回调执行完毕</li>
              <li>没有被其他对象引用</li>
            </ul>

            <h3>内存泄漏常见原因：</h3>
            <ul>
              <li>长时间未完成的Promise（如未取消的请求）</li>
              <li>在闭包中保留对Promise的引用</li>
              <li>未清除的定时器引用Promise</li>
              <li>DOM事件监听器未移除</li>
            </ul>

            <h3>优化建议：</h3>
            <div class="code-block">
              <pre><code>// 1. 使用AbortController取消请求
const controller = new AbortController();
fetch(url, { signal: controller.signal })
  .then(/* ... */)
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('请求已取消');
    }
  });

// 在组件卸载时取消请求
onUnmounted(() => controller.abort());

// 2. 避免在闭包中保留引用
function processData() {
  const largeData = getLargeData(); // 大数据

  return fetch('/process')
    .then(() => {
      // 处理完成后清除大对象
      largeData = null;
    });
}

// 3. 使用WeakRef避免阻止垃圾回收
const weakRef = new WeakRef(largeObject);
fetch('/save')
  .then(() => {
    const obj = weakRef.deref();
    if (obj) {
      // 如果对象还存在则使用
    }
  });</code></pre>
            </div>
          </div>
        </section>
      </div>

      <section class="advanced-techniques">
        <h2><span class="icon">🚀</span> 高级技巧</h2>
        <div class="card-grid">
          <div class="technique-card">
            <h3>取消Promise</h3>
            <p>原生Promise不支持取消，但可以通过包装实现取消功能。</p>
            <div class="code-block">
              <pre><code>function cancellablePromise(promise) {
  let isCancelled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      value => !isCancelled && resolve(value),
      error => !isCancelled && reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCancelled = true;
    }
  };
}

// 使用示例
const { promise, cancel } = cancellablePromise(fetch('/data'));
promise.then(/* ... */).catch(/* ... */);

// 取消操作
cancel();</code></pre>
            </div>
          </div>

          <div class="technique-card">
            <h3>进度通知</h3>
            <p>Promise不直接支持进度通知，但可以通过扩展实现。</p>
            <div class="code-block">
              <pre><code>function progressPromise(executor) {
  const progressCallbacks = [];

  const promise = new Promise((resolve, reject) => {
    executor(
      resolve,
      reject,
      (progress) => {
        progressCallbacks.forEach(cb => cb(progress));
      }
    );
  });

  promise.progress = (callback) => {
    progressCallbacks.push(callback);
    return promise;
  };

  return promise;
}

// 使用示例
const uploadPromise = progressPromise((resolve, reject, progress) => {
  // 模拟上传进度
  let percent = 0;
  const interval = setInterval(() => {
    percent += 10;
    progress(percent);
    if (percent >= 100) {
      clearInterval(interval);
      resolve();
    }
  }, 200);
});

uploadPromise
  .progress(p => console.log(`进度: ${p}%`))
  .then(() => console.log('上传完成'));</code></pre>
            </div>
          </div>

          <div class="technique-card">
            <h3>重试机制</h3>
            <p>实现可配置的请求重试逻辑。</p>
            <div class="code-block">
              <pre><code>function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      fn().then(resolve).catch(error => {
        if (n === 0) {
          reject(error);
        } else {
          console.log(`重试剩余次数: ${n}, 等待 ${delay}ms`);
          setTimeout(() => attempt(n - 1), delay);
        }
      });
    };

    attempt(retries);
  });
}

// 使用示例
retry(() => fetch('/unstable-api'), 5, 2000)
  .then(data => console.log('成功获取数据'))
  .catch(err => console.error('最终失败:', err));</code></pre>
            </div>
          </div>

          <div class="technique-card">
            <h3>批量请求控制</h3>
            <p>控制并发请求数量，防止过多请求同时发出。</p>
            <div class="code-block">
              <pre><code>async function batchRequests(tasks, concurrency = 5) {
  const results = [];
  const executing = [];

  for (const task of tasks) {
    const p = task().then(result => {
      executing.splice(executing.indexOf(p), 1);
      return result;
    });

    results.push(p);
    executing.push(p);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// 使用示例
const urls = [/* 100个URL */];
const fetchTasks = urls.map(url => () => fetch(url));

batchRequests(fetchTasks, 10)
  .then(responses => console.log('所有请求完成'))
  .catch(err => console.error('请求出错:', err));</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="performance">
        <h2><span class="icon">⚡</span> 性能优化</h2>
        <div class="card">
          <div class="optimizations">
            <div class="optimization">
              <h3>避免Promise嵌套</h3>
              <p>过度嵌套Promise会增加内存使用并降低性能。</p>
              <div class="code-block">
                <pre><code>// 反模式 - 嵌套Promise
loadUser().then(user => {
  loadPosts(user.id).then(posts => {
    loadComments(posts[0].id).then(comments => {
      // ...
    });
  });
});

// 优化 - 扁平化
loadUser()
  .then(user => loadPosts(user.id))
  .then(posts => loadComments(posts[0].id))
  .then(comments => {
    // ...
  });</code></pre>
              </div>
            </div>

            <div class="optimization">
              <h3>减少不必要的Promise</h3>
              <p>避免为同步操作创建Promise。</p>
              <div class="code-block">
                <pre><code>// 不必要的Promise
function getConfig() {
  return new Promise(resolve => {
    resolve({ theme: 'dark' });
  });
}

// 优化 - 直接返回值或使用Promise.resolve
function getConfig() {
  return Promise.resolve({ theme: 'dark' });
  // 或者如果不需要异步，直接返回对象
}</code></pre>
              </div>
            </div>

            <div class="optimization">
              <h3>批量处理异步操作</h3>
              <p>使用Promise.all代替顺序执行。</p>
              <div class="code-block">
                <pre><code>// 低效 - 顺序执行
async function processAll(items) {
  const results = [];
  for (const item of items) {
    results.push(await processItem(item));
  }
  return results;
}

// 高效 - 并行执行
async function processAll(items) {
  const promises = items.map(item => processItem(item));
  return Promise.all(promises);
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>掌握Promise的进阶使用可以显著提升异步代码的质量和性能。</p>
      <p class="tip">提示：使用浏览器开发者工具的Performance和Memory面板分析Promise性能</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 此组件不需要额外的逻辑，仅用于展示Promise进阶使用
async function concurrentControl(formList: any[], limit: number = 5) {
  const tasks = formList.map((item, index) => () => {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          resolve(item)
        },
        1000 + index * 100,
      )
    })
  })
  const result: any[] = []
  const set = new Set()
  for (const task of tasks) {
    const p = task()
      .then((e) => {
        set.delete(p)
        result.push(e)
        return e
      })
      .catch((e) => {
        set.delete(p)
        result.push(e)
        return e
      })
    set.add(p)
    //或者2
    //result.push(p)
    if (set.size >= limit) {
      await Promise.race(set)
    }
  }
  //执行set中剩下的任务
  await Promise.allSettled(set).then((e) => {
    result.concat(e.map((e: any) => e.value || e.reason))
  })
  return result
  //或者2
  //return Promise.all(result)
}

//concurrentControl([1, 2, 3, 4, 5, 6, 7, 8, 9, 10],3)
</script>

<style lang="less" scoped>

// 颜色变量
@primary-color: #5e35b1;
@secondary-color: #3949ab;
@accent-color: #7e57c2;
@light-bg: #f5f7fa;
@card-bg: #ffffff;
@text-color: #333333;
@border-color: #e0e0e0;
@code-bg: #f8f9fc;
@success-color: #43a047;
@warning-color: #ffb300;
@danger-color: #e53935;
@info-color: #1e88e5;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.promise-container {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @light-bg;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, #4527a0);
  color: white;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.8rem;
  color: @primary-color;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8eaed;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

h3 {
  font-size: 1.4rem;
  color: @secondary-color;
  margin: 20px 0 15px;
}

.card {
  background-color: @card-bg;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  border-left: 4px solid @primary-color;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  border-radius: 8px;
  padding: 18px;
  margin: 18px 0;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  border: 1px solid @border-color;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  code {
    color: #2c3e50;
    line-height: 1.5;
  }
}

// 列表样式
ul {
  padding-left: 25px;
  margin: 15px 0;

  li {
    margin-bottom: 10px;
    position: relative;

    &::before {
      content: '•';
      position: absolute;
      left: -15px;
      color: @primary-color;
      font-weight: bold;
    }
  }
}

// 高级技巧卡片网格
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.technique-card {
  background-color: @card-bg;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-top: 3px solid @accent-color;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  h3 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 15px;
  }
}

// 优化区块
.optimizations {
  display: grid;
  gap: 25px;
}

.optimization {
  padding: 20px;
  border-radius: 8px;
  background-color: #f0f4ff;

  h3 {
    color: @info-color;
  }
}

.footer {
  text-align: center;
  padding: 25px;
  font-style: italic;
  color: #666;
  margin-top: 20px;
  border-top: 1px solid @border-color;
  line-height: 1.8;

  .tip {
    font-size: 0.9rem;
    color: #999;
    margin-top: 10px;
    background-color: #fff8e1;
    padding: 10px;
    border-radius: 8px;
    display: inline-block;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .content-wrapper {
    padding: 20px;
  }

  .columns {
    grid-template-columns: 1fr;
  }
}
</style>
