<template>
  <div class="microtask-container">
    <header class="header">
      <h1>JavaScript queueMicrotask 介绍</h1>
      <p>深入理解微任务队列机制及其应用</p>
    </header>

    <div class="content-grid">
      <!-- 概念部分 -->
      <section class="card concept">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>概念解析</h2>
        </div>
        <div class="content">
          <p class="definition">
            <code>queueMicrotask()</code>
            是一个将函数添加到微任务队列的全局方法，用于在当前任务完成后、渲染前执行。
          </p>

          <div class="event-loop">
            <h3>事件循环中的位置</h3>
            <div class="loop-diagram">
              <div class="loop-item">1. 执行宏任务</div>
              <div class="loop-arrow">→</div>
              <div class="loop-item active">2. 执行所有微任务</div>
              <div class="loop-arrow">→</div>
              <div class="loop-item">3. 渲染更新</div>
              <div class="loop-arrow">→</div>
              <div class="loop-item">4. 下一个宏任务</div>
            </div>
          </div>

          <div class="comparison">
            <h3>与其他异步方法的比较</h3>
            <div class="comparison-grid">
              <div class="method">
                <h4>queueMicrotask</h4>
                <p>微任务队列</p>
                <div class="priority">高优先级</div>
              </div>
              <div class="method">
                <h4>Promise</h4>
                <p>微任务队列</p>
                <div class="priority">高优先级</div>
              </div>
              <div class="method">
                <h4>setTimeout</h4>
                <p>宏任务队列</p>
                <div class="priority">低优先级</div>
              </div>
              <div class="method">
                <h4>requestAnimationFrame</h4>
                <p>渲染前执行</p>
                <div class="priority">中优先级</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 作用部分 -->
      <section class="card purpose">
        <div class="section-header">
          <div class="icon">🎯</div>
          <h2>核心作用</h2>
        </div>

        <div class="content">
          <div class="purpose-grid">
            <div class="purpose-item">
              <div class="purpose-icon">⚡</div>
              <h3>异步高优先级执行</h3>
              <p>在当前任务完成后立即执行，无需等待渲染</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">🔄</div>
              <h3>状态一致性</h3>
              <p>确保DOM更新前完成相关操作</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">📦</div>
              <h3>批处理操作</h3>
              <p>收集多个操作一次性执行</p>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">🚫</div>
              <h3>避免渲染阻塞</h3>
              <p>替代setTimeout(0)避免延迟</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用方法 -->
      <section class="card usage">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>使用方法</h2>
        </div>

        <div class="content">
          <div class="basic-usage">
            <h3>基本用法</h3>
            <pre><code>// 将函数加入微任务队列
queueMicrotask(() => {
  console.log('微任务已执行');
});

console.log('同步任务先执行');
// 输出顺序:
// 同步任务先执行
// 微任务已执行</code></pre>
          </div>

          <div class="advanced-usage">
            <h3>高级用法</h3>
            <div class="code-examples">
              <div class="code-example">
                <h4>批量更新状态</h4>
                <pre><code>let count = 0;
const increment = () => {
  count++;

  // 避免频繁重渲染
  queueMicrotask(() => {
    updateUI(count);
  });
};</code></pre>
              </div>

              <div class="code-example">
                <h4>错误处理</h4>
                <pre><code>queueMicrotask(() => {
  try {
    riskyOperation();
  } catch (error) {
    handleError(error);
  }
});</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="card scenarios">
        <div class="section-header">
          <div class="icon">📋</div>
          <h2>使用场景</h2>
        </div>

        <div class="content">
          <div class="scenario-grid">
            <div class="scenario">
              <div class="scenario-icon">1</div>
              <h3>确保DOM一致性</h3>
              <p>在DOM操作后确保状态更新</p>
              <pre><code>element.addEventListener('click', () => {
  // 立即执行DOM操作
  element.classList.add('active');

  // 微任务中确保状态一致性
  queueMicrotask(() => {
    updateState(element);
  });
});</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">2</div>
              <h3>批处理操作</h3>
              <p>收集多个操作一次性执行</p>
              <pre><code>let updates = [];

function scheduleUpdate(update) {
  updates.push(update);

  if (!isUpdateScheduled) {
    isUpdateScheduled = true;
    queueMicrotask(processUpdates);
  }
}

function processUpdates() {
  // 处理所有更新
  updates.forEach(update => update());
  updates = [];
  isUpdateScheduled = false;
}</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">3</div>
              <h3>Promise封装</h3>
              <p>创建自定义异步逻辑</p>
              <pre><code>function asyncTask() {
  return new Promise(resolve => {
    queueMicrotask(() => {
      // 执行任务
      const result = compute();
      resolve(result);
    });
  });
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="card pros-cons">
        <div class="section-header">
          <div class="icon">⚖️</div>
          <h2>优缺点</h2>
        </div>

        <div class="content">
          <div class="comparison">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li><span class="highlight">高优先级</span> - 在渲染前执行</li>
                <li><span class="highlight">零延迟</span> - 比setTimeout(0)更快</li>
                <li><span class="highlight">标准化</span> - 官方API替代hack方案</li>
                <li><span class="highlight">轻量级</span> - 比Promise.resolve()更轻量</li>
                <li><span class="highlight">无渲染阻塞</span> - 不影响UI响应</li>
              </ul>
            </div>

            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li><span class="highlight">过度使用风险</span> - 可能导致长任务</li>
                <li><span class="highlight">错误处理</span> - 未捕获错误会导致全局错误</li>
                <li><span class="highlight">递归风险</span> - 递归调用可能阻塞事件循环</li>
                <li><span class="highlight">兼容性</span> - IE不支持，需要polyfill</li>
                <li><span class="highlight">调试困难</span> - 异步堆栈跟踪较复杂</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="card best-practices">
        <div class="section-header">
          <div class="icon">✅</div>
          <h2>最佳实践</h2>
        </div>

        <div class="content">
          <div class="practices">
            <div class="practice">
              <div class="practice-icon">1</div>
              <h3>替代setTimeout(0)</h3>
              <p>使用queueMicrotask替代setTimeout(fn, 0)实现更及时的执行</p>
            </div>

            <div class="practice">
              <div class="practice-icon">2</div>
              <h3>封装错误处理</h3>
              <p>始终在微任务中处理可能的错误</p>
              <pre><code>queueMicrotask(() => {
  try {
    // 可能出错的操作
  } catch (error) {
    console.error('微任务错误:', error);
  }
});</code></pre>
            </div>

            <div class="practice">
              <div class="practice-icon">3</div>
              <h3>避免长任务</h3>
              <p>保持微任务简短，避免阻塞渲染</p>
            </div>

            <div class="practice">
              <div class="practice-icon">4</div>
              <h3>与Promise结合</h3>
              <p>在Promise链中插入微任务</p>
              <pre><code>fetchData()
  .then(data => {
    queueMicrotask(() => processData(data));
  })
  .then(result => {
    // 后续处理
  });</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>
        queueMicrotask
        提供了一种高效管理异步操作的方式，合理使用可以优化应用性能，但需注意避免过度使用导致微任务队列过载
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑为空，仅用于展示
</script>

<style lang="less" scoped>
.microtask-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 32px;
  padding: 28px;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.4rem;
    margin: 0 0 12px;
    color: #1e40af;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: #4b5563;
    margin: 0;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .icon {
    font-size: 1.8rem;
    margin-right: 16px;
    color: #3b82f6;
  }

  h2 {
    font-size: 1.6rem;
    margin: 0;
    color: #1e40af;
    border-bottom: 2px solid #dbeafe;
    padding-bottom: 8px;
  }
}

/* 概念部分样式 */
.concept {
  .definition {
    font-size: 1.1rem;
    background: #eff6ff;
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid #3b82f6;
    margin-bottom: 24px;
  }

  .event-loop {
    margin-bottom: 24px;

    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .loop-diagram {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 16px;

      .loop-item {
        background: #f0f9ff;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        border: 1px solid #dbeafe;

        &.active {
          background: #dbeafe;
          border-color: #3b82f6;
          color: #1e40af;
        }
      }

      .loop-arrow {
        color: #93c5fd;
        font-weight: bold;
      }
    }
  }

  .comparison {
    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .method {
      background: #f0f9ff;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      border: 1px solid #dbeafe;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      }

      h4 {
        margin: 0 0 8px;
        color: #1e40af;
      }

      p {
        margin: 0 0 8px;
        color: #4b5563;
        font-size: 0.95rem;
      }

      .priority {
        font-size: 0.9rem;
        padding: 4px 8px;
        border-radius: 20px;
        display: inline-block;

        &:after {
          content: '优先级';
          margin-left: 4px;
        }
      }
    }
  }
}

/* 作用部分样式 */
.purpose {
  .purpose-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .purpose-item {
    background: #f0fdf4;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    border: 1px solid #bbf7d0;

    .purpose-icon {
      font-size: 2rem;
      margin-bottom: 12px;
      color: #10b981;
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 8px;
      color: #065f46;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 使用方法样式 */
.usage {
  .basic-usage,
  .advanced-usage {
    margin-bottom: 24px;

    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  .code-examples {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .code-example {
    h4 {
      font-size: 1.1rem;
      margin: 0 0 12px;
      color: #1e40af;
    }
  }
}

/* 使用场景样式 */
.scenarios {
  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .scenario {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    .scenario-icon {
      width: 32px;
      height: 32px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-bottom: 16px;
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 8px;
      color: #1e40af;
    }

    p {
      margin: 0 0 16px;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 优缺点样式 */
.pros-cons {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros,
  .cons {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
    }

    ul {
      padding-left: 20px;
      margin: 0;
    }

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 10px;
    }

    .highlight {
      font-weight: 600;
      color: #1e40af;
      display: inline-block;
      margin-right: 4px;
    }
  }

  .pros {
    h3 {
      color: #065f46;
      border-color: #bbf7d0;
    }

    .highlight {
      color: #065f46;
    }
  }

  .cons {
    h3 {
      color: #b91c1c;
      border-color: #fecaca;
    }

    .highlight {
      color: #b91c1c;
    }
  }
}

/* 最佳实践样式 */
.best-practices {
  .practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .practice {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    position: relative;

    .practice-icon {
      position: absolute;
      top: -12px;
      right: -12px;
      width: 30px;
      height: 30px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 12px;
      color: #1e40af;
    }

    p {
      margin: 0 0 16px;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 代码块通用样式 */
pre {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 16px;

  code {
    color: #cbd5e1;
  }
}

/* 页脚样式 */
.footer {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
  text-align: center;
  font-size: 1.05rem;
  color: #4b5563;
  line-height: 1.7;
}
</style>
