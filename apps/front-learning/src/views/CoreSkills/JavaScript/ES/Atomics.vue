<template>
  <div class="atomics-container">
    <header class="header">
      <h1>JavaScript Atomics 指南</h1>
      <p>在多线程环境中安全操作共享内存</p>
    </header>

    <div class="content-card">
      <h2><span class="icon">📚</span> 概念介绍</h2>
      <p>
        <strong>Atomics</strong>
        对象提供了一组静态方法，用于在共享内存缓冲区（SharedArrayBuffer）上执行原子操作。
        这些操作在多线程环境（如 Web
        Workers）中是安全的，确保当一个线程操作共享内存时，其他线程不能同时操作同一内存区域。
      </p>
      <p>原子操作是"不可分割"的操作，在执行过程中不会被中断，从而避免了多线程环境中的竞态条件。</p>
    </div>

    <div class="content-card">
      <h2><span class="icon">⚙️</span> 主要作用</h2>
      <ul class="feature-list">
        <li><span class="badge">线程安全</span> 确保多线程环境下的数据一致性</li>
        <li><span class="badge">同步机制</span> 提供 wait() 和 notify() 方法实现线程同步</li>
        <li><span class="badge">性能优化</span> 避免锁机制的开销，实现高效的并发操作</li>
        <li><span class="badge">内存共享</span> 在多个线程间高效共享数据</li>
      </ul>
    </div>

    <div class="content-card">
      <h2><span class="icon">💻</span> 使用方法</h2>
      <h3>基本操作示例</h3>
      <div class="code-block">
        <pre><code>// 创建共享内存缓冲区
const sharedBuffer = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sharedBuffer);

// 主线程设置初始值
Atomics.store(sharedArray, 0, 10);

// 创建 Worker
const worker = new Worker('worker.js');

// 在 Worker 中安全地增加数值
// worker.js 内容:
self.onmessage = () => {
  // 原子性地增加索引0处的值
  Atomics.add(sharedArray, 0, 5);

  // 获取当前值
  const currentValue = Atomics.load(sharedArray, 0);
  console.log('Worker updated value:', currentValue);
};</code></pre>
      </div>

      <h3>同步操作示例</h3>
      <div class="code-block">
        <pre><code>// 主线程
Atomics.store(sharedArray, 0, 0); // 初始化值

// 启动等待
worker.postMessage('start');

// 等待 worker 完成
Atomics.wait(sharedArray, 0, 0);

console.log('Worker completed! Value is now:', Atomics.load(sharedArray, 0));

// Worker 线程
self.onmessage = () => {
  // 模拟长时间计算
  setTimeout(() => {
    Atomics.store(sharedArray, 0, 100);
    Atomics.notify(sharedArray, 0, 1); // 通知主线程
  }, 2000);
};</code></pre>
      </div>
    </div>

    <div class="content-card">
      <h2><span class="icon">🔍</span> 适用场景</h2>
      <div class="scenario-grid">
        <div class="scenario-card">
          <div class="scenario-icon">🧮</div>
          <h3>高性能计算</h3>
          <p>将大型计算任务拆分到多个线程</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🎮</div>
          <h3>游戏开发</h3>
          <p>物理引擎、AI计算等并行处理</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">📈</div>
          <h3>数据处理</h3>
          <p>大数据分析、实时数据处理</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🤖</div>
          <h3>机器学习</h3>
          <p>并行训练模型和推理</p>
        </div>
      </div>
    </div>

    <div class="content-card warning">
      <h2><span class="icon">⚠️</span> 注意事项</h2>
      <ul class="warning-list">
        <li>
          浏览器安全策略要求站点启用跨域隔离（Cross-Origin Isolation）才能使用 SharedArrayBuffer
        </li>
        <li>过度使用原子操作可能导致性能问题，应在必要时使用</li>
        <li>Atomics 方法只能用于 Int32Array 和 BigInt64Array 类型的数组</li>
        <li>确保正确处理 Atomics.wait() 超时情况</li>
        <li>调试多线程代码比单线程更复杂，需使用专门工具</li>
        <li>不是所有环境都支持 Atomics API，需检查兼容性</li>
      </ul>
    </div>

    <footer class="footer">
      <p> JavaScript 并发编程指南 | 使用 Vue 3 + TypeScript 构建</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
// 由于Atomics主要用于Web Workers，本组件仅用于展示说明
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@warning-color: #e74c3c;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.atomics-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 0;
  background: linear-gradient(135deg, @primary-color, #8e44ad);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.content-card {
  background-color: @card-bg;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  border-left: 4px solid @primary-color;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }

  &.warning {
    border-left-color: @warning-color;
    background-color: lighten(@warning-color, 45%);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: @primary-color;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 12px;
    }
  }

  h3 {
    font-size: 1.4rem;
    margin: 25px 0 15px;
    color: #2980b9;
  }
}

.feature-list {
  list-style: none;
  padding: 0;

  li {
    padding: 12px 0;
    border-bottom: 1px dashed @border-color;
    display: flex;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }
  }

  .badge {
    display: inline-block;
    background-color: @secondary-color;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    margin-right: 12px;
    min-width: 100px;
    text-align: center;
  }
}

.code-block {
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  margin: 15px 0;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;

  pre {
    margin: 0;
  }

  code {
    color: #f8f8f2;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.scenario-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  }

  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
  }
}

.warning-list {
  list-style: none;
  padding: 0;

  li {
    padding: 12px 0;
    padding-left: 30px;
    position: relative;
    border-bottom: 1px solid rgba(231, 76, 60, 0.2);

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: '⚠️';
      position: absolute;
      left: 0;
      top: 12px;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: #7f8c8d;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .content-card {
    padding: 20px 15px;
  }

  .scenario-grid {
    grid-template-columns: 1fr;
  }
}
</style>
