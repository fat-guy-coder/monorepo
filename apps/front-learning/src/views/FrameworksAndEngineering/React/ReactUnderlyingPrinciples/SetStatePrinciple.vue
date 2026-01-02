<template>
  <div class="react-state-container">
    <header>
      <h1>React setState 原理解析</h1>
      <p>深入理解React状态更新的核心机制</p>
    </header>

    <div class="content-wrapper">
      <div class="visualization">
        <div class="state-flow">
          <div class="flow-step">
            <div class="step-icon">1</div>
            <div class="step-content">
              <h3>调用setState</h3>
              <p>组件调用setState(newState)</p>
            </div>
          </div>

          <div class="flow-arrow"></div>

          <div class="flow-step">
            <div class="step-icon">2</div>
            <div class="step-content">
              <h3>状态更新入队</h3>
              <p>更新请求放入pending队列</p>
            </div>
          </div>

          <div class="flow-arrow"></div>

          <div class="flow-step">
            <div class="step-icon">3</div>
            <div class="step-content">
              <h3>批处理更新</h3>
              <p>React合并多个setState调用</p>
            </div>
          </div>

          <div class="flow-arrow"></div>

          <div class="flow-step">
            <div class="step-icon">4</div>
            <div class="step-content">
              <h3>更新组件</h3>
              <p>触发reconciliation和re-render</p>
            </div>
          </div>
        </div>

        <div class="state-machine">
          <div class="state-title">状态更新队列</div>
          <div class="queue-container">
            <div v-for="(update, index) in updateQueue" :key="index" class="queue-item">
              {{ update }}
            </div>
          </div>
          <button @click="addUpdate">模拟setState调用</button>
          <button @click="processQueue">处理队列</button>
        </div>
      </div>

      <div class="explanation">
        <section>
          <h2>setState的核心原理</h2>
          <p>React的<code>setState</code>方法用于更新组件的状态并触发重新渲染。其核心机制是异步批量更新：</p>

          <ul>
            <li><strong>异步更新</strong>：setState不会立即更新组件状态，而是将更新请求放入队列</li>
            <li><strong>批量处理</strong>：React会合并多个setState调用，避免不必要的渲染</li>
            <li><strong>状态合并</strong>：多个setState调用会进行浅合并（shallow merge）</li>
            <li><strong>事务机制</strong>：更新在React事务中执行，确保一致性</li>
          </ul>
        </section>

        <section>
          <h2>setState的工作流程</h2>
          <ol>
            <li>调用setState(newState)时，React不会立即修改state</li>
            <li>将更新请求添加到组件的更新队列（pending state queue）</li>
            <li>将组件标记为"脏组件"（dirty component），加入更新队列</li>
            <li>事件处理函数执行完成后，React会批量处理所有更新</li>
            <li>合并队列中的所有更新，计算新的state</li>
            <li>调用shouldComponentUpdate决定是否更新</li>
            <li>执行组件更新（reconciliation）</li>
            <li>调用render方法重新渲染</li>
          </ol>
        </section>

        <section class="code-section">
          <h2>伪代码实现</h2>
          <div class="code-block">
            <pre><code>// 简化版setState实现
class Component {
  constructor() {
    this.state = {};
    this.pendingState = null;
    this.isBatchingUpdates = false;
    this.dirtyComponents = [];
  }

  setState(partialState) {
    // 将更新合并到pendingState
    this.pendingState = {
      ...this.pendingState,
      ...partialState
    };

    if (!this.isBatchingUpdates) {
      // 如果没有批量更新，立即处理
      this.processUpdate();
    } else {
      // 否则将组件标记为dirty
      enqueueUpdate(this);
    }
  }

  processUpdate() {
    // 应用pendingState到state
    if (this.pendingState) {
      this.state = {
        ...this.state,
        ...this.pendingState
      };
      this.pendingState = null;
    }

    // 触发重新渲染
    this.forceUpdate();
  }

  forceUpdate() {
    // 执行组件的重新渲染
    const newVNode = this.render();
    // 对比新旧VNode，更新DOM
    reconcile(this._currentVNode, newVNode);
  }
}

// 批量更新机制
function batchedUpdates(callback) {
  // 开启批量更新模式
  isBatchingUpdates = true;

  try {
    callback(); // 执行事件处理函数
  } finally {
    // 关闭批量更新，处理所有更新
    isBatchingUpdates = false;
    flushUpdates();
  }
}

function flushUpdates() {
  // 处理所有dirty组件
  while (dirtyComponents.length) {
    const component = dirtyComponents.shift();
    component.processUpdate();
  }
}</code></pre>
          </div>
        </section>

        <section>
          <h2>注意事项</h2>
          <div class="tips">
            <div class="tip-card">
              <div class="tip-header">状态依赖</div>
              <p>更新状态时如需依赖当前状态，应使用函数形式：</p>
              <code>setState(prev => ({ count: prev.count + 1 }))</code>
            </div>

            <div class="tip-card">
              <div class="tip-header">异步特性</div>
              <p>setState后立即读取state可能不是最新值，因为更新是异步的</p>
            </div>

            <div class="tip-card">
              <div class="tip-header">生命周期</div>
              <p>在componentDidMount等生命周期中调用setState会触发额外渲染</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const updateQueue = ref<string[]>([]);
let updateCount = 1;

const addUpdate = () => {
  updateQueue.value.push(`更新 #${updateCount++}`);
};

const processQueue = () => {
  if (updateQueue.value.length > 0) {
    setTimeout(() => {
      updateQueue.value = [];
      updateCount = 1;
    }, 500);
  }
};
</script>

<style lang="less" scoped>


.react-state-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f9fbfd;
  color: #2c3e50;
  line-height: 1.6;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.1rem;
      color: #7f8c8d;
      max-width: 700px;
      margin: 0 auto;
    }
  }
}

.content-wrapper {
  display: flex;
  gap: 2.5rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.visualization {
  flex: 1;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .state-flow {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .flow-step {
      display: flex;
      align-items: flex-start;
      gap: 1rem;

      .step-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.1rem;
      }

      .step-content {
        h3 {
          margin: 0 0 0.3rem;
          font-size: 1.2rem;
          color: #2c3e50;
        }

        p {
          margin: 0;
          color: #7f8c8d;
          font-size: 0.95rem;
        }
      }
    }

    .flow-arrow {
      height: 20px;
      margin-left: 16px;
      border-left: 2px dashed #3498db;
    }
  }

  .state-machine {
    background: #f0f7ff;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #e1f0ff;

    .state-title {
      font-weight: 600;
      margin-bottom: 1rem;
      color: #2980b9;
      font-size: 1.1rem;
    }

    .queue-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.2rem;
      min-height: 50px;

      .queue-item {
        background: #e3f2fd;
        padding: 0.5rem 0.8rem;
        border-radius: 6px;
        font-size: 0.9rem;
        color: #1a73e8;
        border: 1px solid #bbdefb;
        animation: fadeIn 0.3s ease;
      }
    }

    button {
      background: #1a73e8;
      color: white;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      margin-right: 0.8rem;
      transition: all 0.2s ease;

      &:hover {
        background: #0d62da;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }

      &:last-child {
        background: #34a853;

        &:hover {
          background: #2d9449;
        }
      }
    }
  }
}

.explanation {
  flex: 1.5;

  section {
    background: white;
    padding: 1.8rem;
    border-radius: 10px;
    margin-bottom: 1.8rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }

    h2 {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-top: 0;
      margin-bottom: 1.2rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f7ff;
    }

    p,
    li {
      color: #34495e;
    }

    code {
      font-family: 'JetBrains Mono', monospace;
      background: #f5f8ff;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      color: #d6327c;
      font-size: 0.95rem;
    }

    ul,
    ol {
      padding-left: 1.5rem;
      margin: 1.2rem 0;

      li {
        margin-bottom: 0.6rem;
        line-height: 1.7;
      }
    }
  }

  .code-section {
    .code-block {
      background: #f8fbff;
      border: 1px solid #e1ebfa;
      border-radius: 8px;
      overflow: hidden;
      margin: 1.2rem 0;

      pre {
        margin: 0;
        padding: 1.2rem;
        overflow-x: auto;

        code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
          background: transparent;
          padding: 0;
          color: #2c3e50;
          display: block;

          .comment {
            color: #7f8c8d;
          }

          .keyword {
            color: #d6327c;
            font-weight: 500;
          }

          .func {
            color: #2980b9;
          }
        }
      }
    }
  }

  .tips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;

    .tip-card {
      background: #f0f7ff;
      border-radius: 8px;
      padding: 1.2rem;
      border: 1px solid #e1f0ff;

      .tip-header {
        font-weight: 600;
        margin-bottom: 0.7rem;
        color: #2980b9;
      }

      code {
        display: inline-block;
        margin-top: 0.5rem;
        background: #d6e7ff;
        color: #1a5fb4;
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        font-size: 0.9rem;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
