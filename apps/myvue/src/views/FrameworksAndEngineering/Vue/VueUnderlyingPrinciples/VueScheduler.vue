<template>
  <div class="scheduler-container">
    <header class="header">
      <h1>Vue Scheduler 调度器机制</h1>
      <p class="subtitle">深入理解 Vue 的异步更新队列与任务调度</p>
    </header>

    <div class="content">
      <div class="intro-card">
        <div class="icon-box">⏱️</div>
        <div class="intro-content">
          <h2>什么是 Scheduler？</h2>
          <p>Scheduler 是 Vue 响应式系统中的核心调度机制，负责管理组件更新的时机和顺序。它通过批处理更新和异步执行的方式，优化了 Vue 应用的性能和渲染效率。</p>
        </div>
      </div>

      <div class="core-concept">
        <h2>Scheduler 的核心作用</h2>
        <div class="concepts-grid">
          <div class="concept-card" v-for="concept in coreConcepts" :key="concept.title">
            <div class="concept-icon" :style="{ backgroundColor: concept.color }">
              {{ concept.icon }}
            </div>
            <h3>{{ concept.title }}</h3>
            <p>{{ concept.description }}</p>
          </div>
        </div>
      </div>

      <div class="workflow-section">
        <h2>Scheduler 工作流程</h2>
        <div class="workflow-diagram">
          <div class="workflow-step" v-for="(step, index) in workflowSteps" :key="index">
            <div class="step-header">
              <div class="step-number">{{ index + 1 }}</div>
              <h3>{{ step.title }}</h3>
            </div>
            <div class="step-content">
              <p>{{ step.description }}</p>
              <div v-if="step.code" class="step-code">
                <pre><code>{{ step.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="implementation-section">
        <h2>简易 Scheduler 实现</h2>
        <div class="code-explanation">
          <p>下面是一个简化版的 Scheduler 实现，展示了 Vue 调度器的核心逻辑：</p>

          <div class="code-block">
            <pre><code>class Scheduler {
  private queue: (() => void)[] = [];
  private flushing = false;
  private waiting = false;

  // 添加任务到队列
  queueJob(job: () => void): void {
    if (!this.queue.includes(job)) {
      this.queue.push(job);
    }
    this.queueFlush();
  }

  // 安排队列刷新
  queueFlush(): void {
    if (!this.flushing && !this.waiting) {
      this.waiting = true;

      // 使用微任务异步执行
      Promise.resolve().then(() => {
        this.flushJobs();
      });
    }
  }

  // 执行队列中的所有任务
  flushJobs(): void {
    this.waiting = false;
    this.flushing = true;

    // 对任务排序以确保:
    // 1. 父组件在子组件之前更新
    // 2. 用户自定义 watcher 在渲染 watcher 之前执行
    this.queue.sort((a, b) => a.id - b.id);

    try {
      for (let i = 0; i < this.queue.length; i++) {
        const job = this.queue[i];
        job();
      }
    } finally {
      // 重置状态
      this.queue.length = 0;
      this.flushing = false;

      // 检查是否有新的任务加入
      if (this.queue.length) {
        this.queueFlush();
      }
    }
  }
}

// 创建全局调度器实例
const scheduler = new Scheduler();</code></pre>
          </div>

          <div class="implementation-details">
            <h3>关键实现细节</h3>
            <ul>
              <li><strong>任务去重</strong>：相同任务不会重复添加到队列</li>
              <li><strong>异步执行</strong>：使用 Promise 微任务机制执行队列</li>
              <li><strong>任务排序</strong>：确保父组件先于子组件更新</li>
              <li><strong>递归检查</strong>：执行完成后检查是否有新任务加入</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2>Scheduler 最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card" v-for="practice in bestPractices" :key="practice.title">
            <div class="practice-icon">{{ practice.icon }}</div>
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <h2>任务调度机制对比</h2>
        <div class="comparison-grid">
          <div class="comparison-header">调度方式</div>
          <div class="comparison-header">执行时机</div>
          <div class="comparison-header">优点</div>
          <div class="comparison-header">缺点</div>

          <div class="comparison-row">同步执行</div>
          <div>立即执行</div>
          <div>简单直接</div>
          <div>导致多次渲染，性能差</div>

          <div class="comparison-row">setTimeout</div>
          <div>下一个宏任务</div>
          <div>兼容性好</div>
          <div>执行时机不可控，可能延迟</div>

          <div class="comparison-row">Promise (微任务)</div>
          <div>当前任务完成后</div>
          <div>执行时机更合理</div>
          <div>旧浏览器兼容性问题</div>

          <div class="comparison-row">Vue Scheduler</div>
          <div>微任务 + 批处理</div>
          <div>高效、有序、避免重复渲染</div>
          <div>实现较复杂</div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2023 Vue Scheduler 基础介绍 | 理解 Vue 响应式系统的核心机制</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

// 核心概念数据
const coreConcepts = ref([
  {
    icon: '🔄',
    title: '异步批量更新',
    description: '将多个同步的数据变更收集起来，在一次异步任务中统一更新，避免不必要的重复渲染',
    color: '#e3f2fd'
  },
  {
    icon: '⚖️',
    title: '更新顺序控制',
    description: '确保父组件在子组件之前更新，用户自定义 watcher 在渲染 watcher 之前执行',
    color: '#e8f5e9'
  },
  {
    icon: '🚀',
    title: '性能优化',
    description: '通过批处理和异步执行，减少 DOM 操作次数，提高应用性能',
    color: '#fff8e1'
  },
  {
    icon: '🧩',
    title: '生命周期整合',
    description: '将组件的更新与 Vue 的生命周期钩子（如 updated）整合，确保正确的执行顺序',
    color: '#f3e5f5'
  }
]);

// 工作流程步骤
const workflowSteps = ref([
  {
    title: '数据变更触发',
    description: '当响应式数据发生变化时，依赖该数据的组件更新函数被标记为需要更新',
    code: `// 响应式数据变化示例
const state = reactive({ count: 0 });

// 修改数据
state.count++;  // 触发更新`
  },
  {
    title: '任务入队',
    description: '更新函数被添加到 Scheduler 的队列中，Scheduler 会对任务进行去重',
    code: `// 伪代码 - 任务入队
function triggerUpdate(component) {
  if (!queue.includes(component.update)) {
    queue.push(component.update);
  }
  scheduleFlush();
}`
  },
  {
    title: '安排刷新',
    description: 'Scheduler 使用 Promise.resolve().then() 安排一个微任务来执行队列刷新',
    code: `// 伪代码 - 安排刷新
function scheduleFlush() {
  if (!isFlushing && !isWaiting) {
    isWaiting = true;
    Promise.resolve().then(flushJobs);
  }
}`
  },
  {
    title: '任务排序',
    description: '在刷新队列前，Scheduler 会对任务进行排序，确保父组件先于子组件更新',
    code: `// 伪代码 - 任务排序
function flushJobs() {
  queue.sort((a, b) => a.id - b.id);
  // ...
}`
  },
  {
    title: '执行更新',
    description: '按顺序执行队列中的所有更新任务，触发组件的重新渲染',
    code: `// 伪代码 - 执行更新
function flushJobs() {
  // ...
  for (const job of queue) {
    job();
  }
}`
  },
  {
    title: '状态重置',
    description: '清空任务队列，重置状态，并检查是否有新任务加入',
    code: `// 伪代码 - 重置状态
function flushJobs() {
  // ...
  queue.length = 0;
  isFlushing = false;

  if (queue.length) {
    scheduleFlush();
  }
}`
  }
]);

// 最佳实践
const bestPractices = ref([
  {
    icon: '⏱️',
    title: '避免同步依赖',
    description: '不要在数据变更后立即依赖 DOM 更新，使用 nextTick 确保更新完成'
  },
  {
    icon: '🔄',
    title: '批量数据变更',
    description: '将多次数据变更放在同一事件循环中，减少不必要的渲染'
  },
  {
    icon: '📊',
    title: '监控更新性能',
    description: '使用 Vue Devtools 监控组件更新次数和性能'
  },
  {
    icon: '🧪',
    title: '测试异步行为',
    description: '在单元测试中正确处理异步更新，使用 flushPromises 确保更新完成'
  }
]);


</script>

<style scoped lang="less">
// 变量定义
@primary-color: #42b983;
@secondary-color: #35495e;
@accent-color: #ff6b6b;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e1e4e8;
@text-color: #2c3e50;
@light-text: #6c757d;
@success-color: #42b983;
@warning-color: #f39c12;
@shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@radius: 10px;

// 基础样式
.scheduler-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #42b983, #35495e);
  border-radius: @radius;
  box-shadow: @shadow;
  color: white;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.content {
  padding: 0 20px;
}

.intro-card {
  display: flex;
  align-items: center;
  background: @card-bg;
  border-radius: @radius;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: @shadow;

  .icon-box {
    font-size: 3.5rem;
    margin-right: 30px;
    min-width: 80px;
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    color: @secondary-color;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.15rem;
    line-height: 1.8;
  }
}

.core-concept {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid @primary-color;
    display: inline-block;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.concept-card {
  background: @card-bg;
  border-radius: @radius;
  padding: 25px;
  box-shadow: @shadow;
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  .concept-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 20px;
    transition: transform 0.3s ease;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: @primary-color;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin: 0;
  }
}

.workflow-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 40px;
  }
}

.workflow-diagram {
  position: relative;
  padding-left: 40px;

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 30px;
    bottom: 30px;
    width: 4px;
    background: linear-gradient(to bottom, #42b983, #ff6b6b);
    border-radius: 2px;
    z-index: 1;
  }
}

.workflow-step {
  position: relative;
  margin-bottom: 40px;
  background: @card-bg;
  border-radius: @radius;
  box-shadow: @shadow;
  overflow: hidden;
  z-index: 2;

  &:last-child {
    margin-bottom: 0;
  }
}

.step-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #42b983, #4fc08d);
  color: white;

  .step-number {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: white;
    color: #42b983;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-right: 15px;
    flex-shrink: 0;
  }

  h3 {
    margin: 0;
    font-size: 1.4rem;
  }
}

.step-content {
  padding: 25px;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 20px;
  }
}

.step-code {
  background: #2c3e50;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;

  pre {
    margin: 0;
    color: #f8f8f2;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  code {
    display: block;
    white-space: pre;
  }
}

.implementation-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
  }
}

.code-explanation {
  background: @card-bg;
  border-radius: @radius;
  padding: 30px;
  box-shadow: @shadow;

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 25px;
  }
}

.code-block {
  background: #2c3e50;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
  overflow-x: auto;

  pre {
    margin: 0;
    color: #f8f8f2;
    font-size: 0.95rem;
    line-height: 1.5;
    white-space: pre;
  }
}

.implementation-details {
  background: #f0f7ff;
  border-radius: @radius;
  padding: 25px;

  h3 {
    font-size: 1.3rem;
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 20px;
  }

  ul {
    padding-left: 25px;
    margin: 0;

    li {
      margin-bottom: 12px;
      font-size: 1.05rem;
      line-height: 1.6;

      &::marker {
        color: @primary-color;
      }
    }
  }
}

.best-practices {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.practice-card {
  background: @card-bg;
  border-radius: @radius;
  padding: 25px;
  box-shadow: @shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .practice-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: @secondary-color;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin: 0;
  }
}

.comparison-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 30px;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: @radius;
  overflow: hidden;
  box-shadow: @shadow;

  >div {
    padding: 15px;
    border-bottom: 1px solid @border-color;
    border-right: 1px solid @border-color;

    &:nth-child(4n) {
      border-right: none;
    }
  }
}

.comparison-header {
  background: @primary-color;
  color: white;
  font-weight: bold;
  text-align: center;
  border-right: 1px solid darken(@primary-color, 10%) !important;
}

.comparison-row {
  background: #f0f7ff;
  font-weight: 500;
}

.footer {
  text-align: center;
  padding: 30px 20px;
  margin-top: 50px;
  color: @light-text;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: repeat(2, 1fr);

    >div:nth-child(2n) {
      border-right: none;
    }
  }

  .intro-card {
    flex-direction: column;
    text-align: center;

    .icon-box {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  .workflow-diagram {
    padding-left: 20px;

    &::before {
      left: 10px;
    }
  }
}
</style>
