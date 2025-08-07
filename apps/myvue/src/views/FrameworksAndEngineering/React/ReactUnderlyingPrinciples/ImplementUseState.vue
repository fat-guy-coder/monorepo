<template>
  <div class="use-state-container">
    <header>
      <h1>React useState 原理解析</h1>
      <p>深入理解React状态管理的核心机制</p>
    </header>

    <div class="content-wrapper">
      <div class="visualization">
        <div class="state-lifecycle">
          <div class="phase">
            <div class="phase-title">初始化阶段</div>
            <div class="phase-content">
              <div class="state-item" v-for="(state, index) in initialState" :key="index">
                <div class="state-index">#{{ index + 1 }}</div>
                <div class="state-info">
                  <div class="state-name">{{ state.name }}</div>
                  <div class="state-value">{{ state.value }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="arrow">
            <svg width="60" height="24" viewBox="0 0 60 24">
              <path d="M0,12 L50,12" stroke="#3498db" stroke-width="2" fill="none" />
              <polygon points="50,12 40,8 40,16" fill="#3498db" />
            </svg>
          </div>

          <div class="phase">
            <div class="phase-title">更新阶段</div>
            <div class="phase-content">
              <div class="state-item" v-for="(state, index) in updatedState" :key="index">
                <div class="state-index">#{{ index + 1 }}</div>
                <div class="state-info">
                  <div class="state-name">{{ state.name }}</div>
                  <div class="state-value">{{ state.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="state-machine">
          <div class="machine-title">useState 内部状态机</div>
          <div class="machine-diagram">
            <div class="state-node" :class="{ active: currentStep === 0 }">
              <div class="node-label">调用useState</div>
              <div class="node-state">创建状态节点</div>
            </div>

            <div class="arrow">
              <svg width="60" height="24" viewBox="0 0 60 24">
                <path d="M0,12 L50,12" stroke="#3498db" stroke-width="2" fill="none" />
                <polygon points="50,12 40,8 40,16" fill="#3498db" />
              </svg>
            </div>

            <div class="state-node" :class="{ active: currentStep === 1 }">
              <div class="node-label">状态更新</div>
              <div class="node-state">加入更新队列</div>
            </div>

            <div class="arrow">
              <svg width="60" height="24" viewBox="0 0 60 24">
                <path d="M0,12 L50,12" stroke="#3498db" stroke-width="2" fill="none" />
                <polygon points="50,12 40,8 40,16" fill="#3498db" />
              </svg>
            </div>

            <div class="state-node" :class="{ active: currentStep === 2 }">
              <div class="node-label">重新渲染</div>
              <div class="node-state">应用新状态</div>
            </div>
          </div>

          <div class="machine-controls">
            <button @click="prevStep" :disabled="currentStep === 0">上一步</button>
            <button @click="nextStep" :disabled="currentStep === 2">下一步</button>
            <button @click="resetState">重置状态</button>
          </div>
        </div>

        <div class="interactive-demo">
          <div class="demo-title">useState 交互演示</div>
          <div class="counter-demo">
            <div class="counter-value">计数: {{ count }}</div>
            <div class="counter-controls">
              <button @click="increment">增加</button>
              <button @click="decrement">减少</button>
              <button @click="reset">重置</button>
            </div>
            <div class="counter-info">
              <div class="info-item">
                <span>状态值:</span>
                <span>{{ count }}</span>
              </div>
              <div class="info-item">
                <span>更新函数:</span>
                <span>setCount</span>
              </div>
              <div class="info-item">
                <span>渲染次数:</span>
                <span>{{ renderCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="explanation">
        <section>
          <h2>useState 的核心原理</h2>
          <p>React的<code>useState</code>是函数组件管理状态的基础Hook，其核心机制基于：</p>

          <ul>
            <li><strong>闭包机制</strong>：状态和更新函数在闭包中维护，确保状态隔离</li>
            <li><strong>链表存储</strong>：组件状态以链表形式存储在Fiber节点上</li>
            <li><strong>顺序依赖</strong>：Hook调用顺序在每次渲染中必须保持一致</li>
            <li><strong>批量更新</strong>：多个状态更新会被合并处理，减少渲染次数</li>
          </ul>
        </section>

        <section>
          <h2>useState 的工作流程</h2>
          <ol>
            <li><strong>组件初始化</strong>：首次渲染时创建状态节点</li>
            <li><strong>状态获取</strong>：返回当前状态值和更新函数</li>
            <li><strong>状态更新</strong>：调用更新函数将变更加入队列</li>
            <li><strong>重新渲染</strong>：React调度组件重新渲染</li>
            <li><strong>状态应用</strong>：渲染时使用更新后的状态值</li>
            <li><strong>循环处理</strong>：后续更新重复步骤3-5</li>
          </ol>
        </section>

        <section class="code-section">
          <h2>useState 实现原理</h2>
          <div class="code-block">
            <pre><code>// 简化版useState实现
let stateIndex = 0; // 当前状态索引
let states = [];    // 存储所有状态
let setters = [];   // 存储所有更新函数
let renderCount = 0; // 渲染计数器

function useState(initialValue) {
  // 获取当前状态的索引
  const index = stateIndex;

  // 首次渲染时初始化状态
  if (typeof states[index] === 'undefined') {
    states[index] = typeof initialValue === 'function'
      ? initialValue()
      : initialValue;
  }

  // 创建更新函数（闭包保存索引）
  if (!setters[index]) {
    setters[index] = (newValue) => {
      // 如果是函数，传入当前状态值
      if (typeof newValue === 'function') {
        states[index] = newValue(states[index]);
      } else {
        states[index] = newValue;
      }

      // 触发重新渲染
      scheduleRender();
    };
  }

  // 增加状态索引（为下一个Hook准备）
  stateIndex++;

  // 返回当前状态和更新函数
  return [states[index], setters[index]];
}

function scheduleRender() {
  // 实际React中会调度重新渲染
  // 这里简化处理：重置索引并增加渲染计数
  stateIndex = 0;
  renderCount++;
  // 触发组件重新渲染...
}</code></pre>
          </div>
        </section>

        <section>
          <h2>useState 使用模式</h2>
          <div class="usage-patterns">
            <div class="pattern-card">
              <div class="pattern-header">基础用法</div>
              <div class="pattern-content">
                <pre><code>const [state, setState] = useState(initialValue);</code></pre>
                <p>初始化状态并获取状态值和更新函数</p>
              </div>
            </div>

            <div class="pattern-card">
              <div class="pattern-header">函数式更新</div>
              <div class="pattern-content">
                <pre><code>setState(prevState => prevState + 1);</code></pre>
                <p>基于前一个状态计算新状态</p>
              </div>
            </div>

            <div class="pattern-card">
              <div class="pattern-header">惰性初始化</div>
              <div class="pattern-content">
                <pre><code>const [state, setState] = useState(() => {
  return computeExpensiveValue();
});</code></pre>
                <p>避免重复计算初始值</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>注意事项</h2>
          <div class="tips">
            <div class="tip-card">
              <div class="tip-icon">⚠️</div>
              <div class="tip-content">
                <h3>状态更新是异步的</h3>
                <p>调用setState后立即读取状态可能不是最新值</p>
              </div>
            </div>

            <div class="tip-card">
              <div class="tip-icon">❗</div>
              <div class="tip-content">
                <h3>对象状态合并</h3>
                <p>更新对象状态时不会自动合并，需要使用扩展运算符</p>
                <code>setUser(prev => ({ ...prev, name: 'Alice' }));</code>
              </div>
            </div>

            <div class="tip-card">
              <div class="tip-icon">🔁</div>
              <div class="tip-content">
                <h3>避免循环更新</h3>
                <p>在渲染函数中直接调用setState会导致无限循环</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 状态生命周期展示
const initialState = ref([
  { name: 'count', value: 0 },
  { name: 'theme', value: 'light' },
  { name: 'user', value: '{}' }
]);

const updatedState = ref([
  { name: 'count', value: 5 },
  { name: 'theme', value: 'dark' },
  { name: 'user', value: '{name: "John"}' }
]);

// 状态机控制
const currentStep = ref(0);
const nextStep = () => {
  if (currentStep.value < 2) currentStep.value++;
};
const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};
const resetState = () => {
  currentStep.value = 0;
};

// 交互演示
const count = ref(0);
const renderCount = ref(0);
const increment = () => {
  count.value++;
  renderCount.value++;
};
const decrement = () => {
  count.value--;
  renderCount.value++;
};
const reset = () => {
  count.value = 0;
  renderCount.value++;
};
</script>

<style lang="less" scoped>


.use-state-container {
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
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  .state-lifecycle {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .phase {
      flex: 1;
      text-align: center;

      .phase-title {
        font-weight: 600;
        margin-bottom: 1.2rem;
        color: #2c3e50;
        font-size: 1.2rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #f0f7ff;
      }

      .phase-content {
        background: #f8fbff;
        border-radius: 8px;
        padding: 1.2rem;
        min-height: 200px;
        border: 1px solid #e1ebfa;
      }
    }

    .arrow {
      flex-shrink: 0;
      margin: 0 0.5rem;
    }
  }

  .state-machine {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    .machine-title {
      font-weight: 600;
      margin-bottom: 1.2rem;
      color: #2c3e50;
      font-size: 1.2rem;
      text-align: center;
    }

    .machine-diagram {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;

      .state-node {
        flex: 1;
        background: #f8fbff;
        border: 1px solid #e1ebfa;
        border-radius: 8px;
        padding: 1.2rem;
        text-align: center;
        transition: all 0.3s ease;
        max-width: 180px;

        &.active {
          background: #e3f2fd;
          border-color: #64b5f6;
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
          transform: translateY(-5px);

          .node-label {
            color: #1a73e8;
          }
        }

        .node-label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        .node-state {
          font-size: 0.95rem;
          color: #5f6368;
        }
      }

      .arrow {
        flex-shrink: 0;
        margin: 0 0.5rem;
      }
    }

    .machine-controls {
      display: flex;
      justify-content: center;
      gap: 1rem;

      button {
        background: #1a73e8;
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
          background: #0d62da;
          transform: translateY(-2px);
        }

        &:active:not(:disabled) {
          transform: translateY(0);
        }

        &:disabled {
          background: #b0c9f0;
          cursor: not-allowed;
        }

        &:last-child {
          background: #34a853;

          &:hover:not(:disabled) {
            background: #2d9449;
          }
        }
      }
    }
  }

  .interactive-demo {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    .demo-title {
      font-weight: 600;
      margin-bottom: 1.2rem;
      color: #2c3e50;
      font-size: 1.2rem;
      text-align: center;
    }

    .counter-demo {
      background: #f8fbff;
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid #e1ebfa;
      text-align: center;

      .counter-value {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #1a73e8;
      }

      .counter-controls {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        button {
          background: #1a73e8;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;

          &:hover {
            background: #0d62da;
            transform: translateY(-2px);
          }

          &:active {
            transform: translateY(0);
          }

          &:nth-child(2) {
            background: #ea4335;

            &:hover {
              background: #d32f2f;
            }
          }

          &:last-child {
            background: #34a853;

            &:hover {
              background: #2d9449;
            }
          }
        }
      }

      .counter-info {
        background: #e3f2fd;
        border-radius: 6px;
        padding: 1rem;
        text-align: left;

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #bbdefb;

          &:last-child {
            border-bottom: none;
          }

          span:first-child {
            font-weight: 500;
            color: #5f6368;
          }

          span:last-child {
            font-family: 'JetBrains Mono', monospace;
            color: #1a73e8;
          }
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
        position: relative;

        &::before {
          content: "•";
          color: #1a73e8;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }

        strong {
          color: #1a73e8;
        }
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

  .usage-patterns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;

    .pattern-card {
      background: #f8fbff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e1f0ff;

      .pattern-header {
        background: #e3f2fd;
        padding: 0.8rem 1rem;
        font-weight: 600;
        color: #1a73e8;
        font-size: 1.1rem;
      }

      .pattern-content {
        padding: 1.2rem;

        pre {
          background: #f0f7ff;
          border-radius: 6px;
          padding: 0.8rem;
          overflow-x: auto;
          margin-bottom: 0.8rem;

          code {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            color: #1a73e8;
          }
        }

        p {
          margin: 0;
          color: #5f6368;
          font-size: 0.95rem;
        }
      }
    }
  }

  .tips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;

    .tip-card {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: #f8fbff;
      border-radius: 8px;
      padding: 1.2rem;
      border-left: 3px solid #1a73e8;

      .tip-icon {
        flex-shrink: 0;
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        background: #e3f2fd;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tip-content {
        h3 {
          margin: 0 0 0.5rem;
          color: #2c3e50;
        }

        p {
          margin: 0 0 0.5rem;
          color: #5f6368;
          font-size: 0.95rem;
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
}

.state-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: white;
  border-radius: 6px;
  margin-bottom: 0.8rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .state-index {
    width: 28px;
    height: 28px;
    background: #e3f2fd;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #1a73e8;
  }

  .state-info {
    flex: 1;

    .state-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .state-value {
      font-size: 0.9rem;
      color: #5f6368;
      font-family: 'JetBrains Mono', monospace;
    }
  }
}

@media (max-width: 768px) {
  .use-state-container {
    padding: 1.5rem;
  }

  .content-wrapper {
    gap: 1.5rem;
  }

  .visualization,
  .explanation section {
    padding: 1.2rem;
  }

  .state-lifecycle {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
  }

  .machine-diagram {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
  }
}
</style>
