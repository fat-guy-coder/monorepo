<template>
  <div class="hooks-container">
    <header>
      <h1>React Hooks 原理解析</h1>
      <p>深入理解React Hooks的工作机制与实现原理</p>
    </header>

    <div class="content-wrapper">
      <div class="visualization">
        <div class="hooks-structure">
          <div class="component-header">
            <div class="component-name">函数组件</div>
          </div>

          <div class="hooks-chain">
            <div v-for="(hook, index) in hooksChain" :key="index" class="hook-node">
              <div class="node-header">
                <div class="hook-type">{{ hook.type }}</div>
                <div class="hook-index">#{{ index + 1 }}</div>
              </div>
              <div class="hook-state">
                <div class="state-label">状态:</div>
                <div class="state-value">{{ hook.state }}</div>
              </div>
              <div v-if="hook.deps" class="hook-deps">
                <div class="deps-label">依赖:</div>
                <div class="deps-value">{{ hook.deps }}</div>
              </div>
            </div>
          </div>

          <div class="hooks-legend">
            <div class="legend-item">
              <div class="color-box useState"></div>
              <span>useState</span>
            </div>
            <div class="legend-item">
              <div class="color-box useEffect"></div>
              <span>useEffect</span>
            </div>
            <div class="legend-item">
              <div class="color-box useContext"></div>
              <span>useContext</span>
            </div>
          </div>
        </div>

        <div class="hooks-example">
          <div class="example-title">Hooks执行顺序</div>
          <div class="execution-flow">
            <div class="flow-step" v-for="(step, index) in executionSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">{{ step }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="explanation">
        <section>
          <h2>Hooks的核心原理</h2>
          <p>React Hooks 允许在函数组件中使用状态和其他React特性，其核心机制基于：</p>

          <ul>
            <li><strong>链表数据结构</strong>：Hooks以链表形式存储在组件对应的Fiber节点上</li>
            <li><strong>执行顺序一致性</strong>：Hooks的调用顺序在每次渲染中必须保持完全一致</li>
            <li><strong>状态隔离</strong>：每个Hook都有自己独立的状态存储</li>
            <li><strong>闭包机制</strong>：Hooks利用闭包保存状态和函数引用</li>
          </ul>
        </section>

        <section>
          <h2>Hooks的工作机制</h2>
          <ol>
            <li>首次渲染时，React为每个Hook创建节点并添加到链表中</li>
            <li>Hook节点包含状态值、依赖项等关键信息</li>
            <li>后续渲染时，React按照相同顺序遍历链表获取Hook状态</li>
            <li>状态更新时，React重新执行组件函数并应用更新后的Hook状态</li>
            <li>Effect Hooks在渲染后执行，并会根据依赖项决定是否重新执行</li>
          </ol>
        </section>

        <section class="code-section">
          <h2>伪代码实现</h2>
          <div class="code-block">
            <pre><code>// 简化版Hooks实现
let currentHookFiber = null; // 当前正在渲染的Fiber节点
let workInProgressHook = null; // 当前正在处理的Hook

function renderWithHooks(Component, props) {
  // 设置当前Fiber节点
  currentHookFiber = createFiber(Component);

  // 重置Hook链表
  currentHookFiber.memoizedState = null;
  workInProgressHook = null;

  // 执行组件函数
  const children = Component(props);

  // 重置当前Fiber
  currentHookFiber = null;
  return children;
}

function useState(initialState) {
  return useReducer(null, initialState);
}

function useReducer(reducer, initialState) {
  // 获取当前Hook
  const hook = updateWorkInProgressHook();

  if (!hook.memoizedState) {
    // 首次渲染：初始化状态
    hook.memoizedState = [
      typeof initialState === 'function'
        ? initialState()
        : initialState,
      dispatchAction.bind(null, currentHookFiber, hook.queue)
    ];
  }

  return hook.memoizedState;
}

function useEffect(create, deps) {
  const hook = updateWorkInProgressHook();

  // 检查依赖项是否变化
  if (hook.memoizedState) {
    const [prevDestroy, prevDeps] = hook.memoizedState;
    if (depsAreSame(prevDeps, deps)) {
      return;
    }
    // 依赖变化，执行上一次的清理函数
    if (typeof prevDestroy === 'function') {
      prevDestroy();
    }
  }

  // 调度effect
  scheduleEffect(() => {
    const destroy = create();
    hook.memoizedState = [destroy, deps];
    return destroy;
  });
}

function updateWorkInProgressHook() {
  let hook;

  if (workInProgressHook) {
    // 后续Hook：移动到下一个
    workInProgressHook = workInProgressHook.next;
    hook = workInProgressHook;
  } else {
    // 首个Hook
    hook = currentHookFiber.memoizedState;
    workInProgressHook = hook;
  }

  if (!hook) {
    // 创建新Hook节点
    hook = {
      memoizedState: null, // 存储状态
      next: null           // 下一个Hook
    };

    if (workInProgressHook) {
      workInProgressHook.next = hook;
    } else {
      currentHookFiber.memoizedState = hook;
    }

    workInProgressHook = hook;
  }

  return hook;
}

function dispatchAction(fiber, queue, action) {
  // 创建更新对象
  const update = {
    action,
    next: null
  };

  // 将更新加入队列
  if (!queue.pending) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  // 调度重新渲染
  scheduleWork(fiber);
}</code></pre>
          </div>
        </section>

        <section>
          <h2>常用Hooks原理</h2>
          <div class="hooks-details">
            <div class="hook-card">
              <div class="hook-header useState">useState</div>
              <div class="hook-content">
                <p>基于useReducer实现，返回状态值和更新函数</p>
                <ul>
                  <li>状态存储在Hook节点的memoizedState属性</li>
                  <li>更新函数会创建更新对象并加入队列</li>
                  <li>重新渲染时应用所有更新</li>
                </ul>
              </div>
            </div>

            <div class="hook-card">
              <div class="hook-header useEffect">useEffect</div>
              <div class="hook-content">
                <p>处理副作用，在渲染后执行</p>
                <ul>
                  <li>依赖数组变化时才会重新执行</li>
                  <li>每次执行前会调用上一次的清理函数</li>
                  <li>异步执行，不阻塞浏览器绘制</li>
                </ul>
              </div>
            </div>

            <div class="hook-card">
              <div class="hook-header useContext">useContext</div>
              <div class="hook-content">
                <p>访问React上下文</p>
                <ul>
                  <li>不需要依赖链表，直接从上下文读取值</li>
                  <li>当上下文值变化时触发组件重新渲染</li>
                  <li>可以跨层级访问数据</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Hooks使用规则</h2>
          <div class="rules">
            <div class="rule-card">
              <div class="rule-number">1</div>
              <p>只在React函数组件或自定义Hook中调用Hook</p>
            </div>
            <div class="rule-card">
              <div class="rule-number">2</div>
              <p>不要在循环、条件或嵌套函数中调用Hook</p>
            </div>
            <div class="rule-card">
              <div class="rule-number">3</div>
              <p>使用lint规则确保Hook的正确使用</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 展示用的Hooks链表
const hooksChain = ref([
  { type: 'useState', state: 'count: 0', deps: null },
  { type: 'useEffect', state: 'effectFn', deps: '[]' },
  { type: 'useState', state: 'text: ""', deps: null },
  { type: 'useContext', state: 'theme: light', deps: null },
  { type: 'useEffect', state: 'resizeHandler', deps: '[window]' }
]);

// Hooks执行顺序
const executionSteps = ref([
  '执行组件函数',
  '调用第一个useState',
  '调用第一个useEffect',
  '调用第二个useState',
  '调用useContext',
  '调用第二个useEffect',
  '返回JSX进行渲染',
  '渲染完成后执行Effect清理函数（如果需要）',
  '执行Effect回调函数'
]);
</script>

<style lang="less" scoped>


.hooks-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f7ff 100%);
  color: #2c3e50;
  line-height: 1.6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 100, 0.08);

  header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(52, 152, 219, 0.2);

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
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .hooks-structure {
    background: #f8fbff;
    border-radius: 10px;
    border: 1px solid #e1ebfa;
    padding: 1.5rem;
    margin-bottom: 1.8rem;

    .component-header {
      text-align: center;
      margin-bottom: 1.5rem;

      .component-name {
        display: inline-block;
        background: #e3f2fd;
        padding: 0.5rem 1.5rem;
        border-radius: 30px;
        font-weight: 600;
        color: #1a73e8;
        border: 1px dashed #64b5f6;
      }
    }

    .hooks-chain {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .hook-node {
        background: white;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        border-left: 4px solid;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        &.useState {
          border-color: #4caf50;
        }

        &.useEffect {
          border-color: #ff9800;
        }

        &.useContext {
          border-color: #9c27b0;
        }

        .node-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 1rem;
          background: #f5f9ff;
          border-bottom: 1px solid #e8f0fe;

          .hook-type {
            font-weight: 600;
            font-size: 1.1rem;
          }

          .hook-index {
            background: #e8f0fe;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            font-weight: 500;
            color: #1a73e8;
          }
        }

        .hook-state,
        .hook-deps {
          display: flex;
          padding: 0.8rem 1rem;
          font-size: 0.95rem;

          .state-label,
          .deps-label {
            font-weight: 500;
            min-width: 50px;
            color: #5f6368;
          }

          .state-value,
          .deps-value {
            color: #1a73e8;
            font-weight: 500;
          }
        }

        .hook-deps {
          background: #f9fbfd;
          border-top: 1px solid #f1f3f4;
        }
      }
    }

    .hooks-legend {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.5rem;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.95rem;
        color: #5f6368;

        .color-box {
          width: 16px;
          height: 16px;
          border-radius: 3px;

          &.useState {
            background: #4caf50;
          }

          &.useEffect {
            background: #ff9800;
          }

          &.useContext {
            background: #9c27b0;
          }
        }
      }
    }
  }

  .hooks-example {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    .example-title {
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #2c3e50;
      text-align: center;
    }

    .execution-flow {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      .flow-step {
        display: flex;
        align-items: center;
        background: #f8fbff;
        border-radius: 8px;
        padding: 0.8rem 1rem;
        border-left: 3px solid #64b5f6;

        .step-number {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          background: #e3f2fd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          font-weight: 500;
          color: #1a73e8;
        }

        .step-content {
          font-size: 0.95rem;
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
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
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
      line-height: 1.7;
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
        }
      }
    }
  }

  .hooks-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;

    .hook-card {
      background: #f8fbff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e1f0ff;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
      }

      .hook-header {
        padding: 0.8rem 1rem;
        font-weight: 600;
        color: white;
        font-size: 1.1rem;

        &.useState {
          background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
        }

        &.useEffect {
          background: linear-gradient(135deg, #ff9800 0%, #ffc107 100%);
        }

        &.useContext {
          background: linear-gradient(135deg, #9c27b0 0%, #e040fb 100%);
        }
      }

      .hook-content {
        padding: 1rem;

        p {
          margin-top: 0;
          color: #5f6368;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0.8rem 0;

          li {
            margin-bottom: 0.5rem;
            color: #3f51b5;
            font-size: 0.95rem;
          }
        }
      }
    }
  }

  .rules {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.2rem;

    .rule-card {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: #f0f7ff;
      border-radius: 8px;
      padding: 1.2rem;
      border-left: 4px solid #1a73e8;

      .rule-number {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background: #1a73e8;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        font-weight: 500;
        color: #2c3e50;
      }
    }
  }
}

@media (max-width: 768px) {
  .hooks-container {
    padding: 1.5rem;
  }

  .content-wrapper {
    gap: 1.5rem;
  }

  .visualization,
  .explanation section {
    padding: 1.2rem;
  }
}
</style>
