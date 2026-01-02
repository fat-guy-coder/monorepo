<template>
  <div class="use-effect-container">
    <header>
      <h1>React useEffect 原理解析</h1>
      <p>深入理解React副作用管理的核心机制</p>
    </header>

    <div class="content-wrapper">
      <div class="visualization">
        <div class="effect-lifecycle">
          <div class="phase">
            <div class="phase-title">组件挂载</div>
            <div class="phase-content">
              <div class="effect-step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h3>渲染组件</h3>
                  <p>执行组件函数，返回JSX</p>
                </div>
              </div>

              <div class="effect-arrow"></div>

              <div class="effect-step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h3>调度Effect</h3>
                  <p>将Effect加入执行队列</p>
                </div>
              </div>

              <div class="effect-arrow"></div>

              <div class="effect-step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h3>执行Effect</h3>
                  <p>浏览器完成绘制后执行</p>
                </div>
              </div>
            </div>
          </div>

          <div class="phase">
            <div class="phase-title">组件更新</div>
            <div class="phase-content">
              <div class="effect-step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h3>检查依赖</h3>
                  <p>比较新旧依赖数组</p>
                </div>
              </div>

              <div class="effect-arrow"></div>

              <div class="effect-step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h3>清理旧Effect</h3>
                  <p>执行上一次的清理函数</p>
                </div>
              </div>

              <div class="effect-arrow"></div>

              <div class="effect-step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h3>执行新Effect</h3>
                  <p>运行新的副作用函数</p>
                </div>
              </div>
            </div>
          </div>

          <div class="phase">
            <div class="phase-title">组件卸载</div>
            <div class="phase-content">
              <div class="effect-step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h3>触发卸载</h3>
                  <p>组件从DOM中移除</p>
                </div>
              </div>

              <div class="effect-arrow"></div>

              <div class="effect-step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h3>执行清理</h3>
                  <p>调用所有Effect的清理函数</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="effect-demo">
          <div class="demo-title">useEffect 执行流程</div>
          <div class="timeline">
            <div class="timeline-item" v-for="(item, index) in timeline" :key="index">
              <div class="timeline-badge" :class="item.type">{{ index + 1 }}</div>
              <div class="timeline-content">
                <div class="timeline-title">{{ item.title }}</div>
                <div class="timeline-desc">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="explanation">
        <section>
          <h2>useEffect 的核心原理</h2>
          <p>React的<code>useEffect</code>是管理副作用的Hook，用于处理数据获取、订阅、手动DOM操作等。其核心机制基于：</p>

          <ul>
            <li><strong>副作用隔离</strong>：将副作用与UI渲染分离</li>
            <li><strong>依赖驱动</strong>：通过依赖数组控制执行时机</li>
            <li><strong>清理机制</strong>：每次执行前清理上一次的副作用</li>
            <li><strong>异步执行</strong>：在浏览器完成绘制后执行，不阻塞渲染</li>
          </ul>
        </section>

        <section>
          <h2>useEffect 的工作流程</h2>
          <ol>
            <li><strong>组件渲染</strong>：React执行组件函数</li>
            <li><strong>Effect声明</strong>：组件内部调用useEffect</li>
            <li><strong>调度阶段</strong>：React将Effect加入执行队列</li>
            <li><strong>渲染完成</strong>：浏览器完成DOM更新和绘制</li>
            <li><strong>执行Effect</strong>：按顺序执行队列中的Effect</li>
            <li><strong>返回清理函数</strong>：Effect可返回清理函数用于下次执行前调用</li>
            <li><strong>依赖变化</strong>：依赖数组变化时重复3-6步</li>
            <li><strong>组件卸载</strong>：执行所有Effect的清理函数</li>
          </ol>
        </section>

        <section class="code-section">
          <h2>useEffect 实现原理</h2>
          <div class="code-block">
            <pre><code>// 简化版useEffect实现
let effectIndex = 0; // 当前Effect索引
let effects = [];    // 存储所有Effect
let cleanupFunctions = []; // 清理函数数组

function useEffect(callback, dependencies) {
  // 获取当前Effect的索引
  const index = effectIndex;

  // 获取上一次的依赖和清理函数
  const prevDependencies = effects[index]?.dependencies;
  const prevCleanup = cleanupFunctions[index];

  // 检查依赖是否变化
  const hasChanged = !dependencies ||
    !prevDependencies ||
    dependencies.some((dep, i) => dep !== prevDependencies[i]);

  if (hasChanged) {
    // 如果依赖变化，执行清理函数
    if (typeof prevCleanup === 'function') {
      prevCleanup();
    }

    // 调度Effect执行
    scheduleEffect(() => {
      // 执行回调并存储返回的清理函数
      const cleanup = callback();
      cleanupFunctions[index] = cleanup;
    });

    // 存储当前依赖
    effects[index] = { dependencies };
  }

  // 增加索引（为下一个Effect准备）
  effectIndex++;
}

function scheduleEffect(effectFn) {
  // 实际React中会使用调度器
  // 这里简化为使用setTimeout模拟异步执行
  setTimeout(effectFn, 0);
}

// 组件卸载时执行所有清理函数
function cleanupAllEffects() {
  cleanupFunctions.forEach(cleanup => {
    if (typeof cleanup === 'function') {
      cleanup();
    }
  });
  // 重置索引和数组
  effectIndex = 0;
  effects = [];
  cleanupFunctions = [];
}</code></pre>
          </div>
        </section>

        <section>
          <h2>useEffect 使用模式</h2>
          <div class="usage-patterns">
            <div class="pattern-card">
              <div class="pattern-header">无依赖</div>
              <div class="pattern-content">
                <pre><code>useEffect(() => {
  // 每次渲染后执行
  return () => { /* 清理函数 */ };
});</code></pre>
                <p>每次组件更新后都会执行</p>
              </div>
            </div>

            <div class="pattern-card">
              <div class="pattern-header">空依赖</div>
              <div class="pattern-content">
                <pre><code>useEffect(() => {
  // 仅在挂载时执行
  return () => {
    // 卸载时清理
  };
}, []);</code></pre>
                <p>仅在组件挂载和卸载时执行</p>
              </div>
            </div>

            <div class="pattern-card">
              <div class="pattern-header">带依赖</div>
              <div class="pattern-content">
                <pre><code>useEffect(() => {
  // 当count变化时执行
}, [count]);</code></pre>
                <p>仅在特定依赖变化时执行</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>常见用例</h2>
          <div class="use-cases">
            <div class="case-card">
              <div class="case-icon">🌐</div>
              <div class="case-content">
                <h3>数据获取</h3>
                <p>在组件挂载时获取数据，依赖变化时重新获取</p>
                <pre><code>useEffect(() => {
  const fetchData = async () => {
    const data = await fetch(url);
    setData(data);
  };
  fetchData();
}, [url]); // url变化时重新获取</code></pre>
              </div>
            </div>

            <div class="case-card">
              <div class="case-icon">🔔</div>
              <div class="case-content">
                <h3>事件订阅</h3>
                <p>添加事件监听器，卸载时移除</p>
                <pre><code>useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);</code></pre>
              </div>
            </div>

            <div class="case-card">
              <div class="case-icon">⏱️</div>
              <div class="case-content">
                <h3>定时器管理</h3>
                <p>设置定时器，依赖变化时重置</p>
                <pre><code>useEffect(() => {
  const timer = setInterval(() => {
    // 执行操作
  }, 1000);

  return () => clearInterval(timer);
}, [deps]);</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>注意事项</h2>
          <div class="tips">
            <div class="tip-card">
              <div class="tip-header">依赖数组</div>
              <p>确保包含所有Effect中使用的值，避免过时闭包</p>
              <code>useEffect(() => {...}, [prop, state]);</code>
            </div>

            <div class="tip-card">
              <div class="tip-header">异步函数</div>
              <p>不能在Effect中直接使用async函数，需要内部定义</p>
              <code>useEffect(() => { async function fetch() {...} fetch(); }, []);</code>
            </div>

            <div class="tip-card">
              <div class="tip-header">无限循环</div>
              <p>在Effect中设置状态时，确保不会导致无限更新循环</p>
              <code>useEffect(() => { setCount(count + 1); }, [count]); // 错误！</code>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="interactive-demo">
      <div class="demo-container">
        <div class="demo-header">useEffect 交互演示</div>
        <div class="demo-content">
          <div class="counter-section">
            <div class="counter-value">计数器: {{ count }}</div>
            <div class="counter-controls">
              <button @click="increment">增加</button>
              <button @click="decrement">减少</button>
              <button @click="reset">重置</button>
            </div>
          </div>

          <div class="effect-section">
            <div class="effect-info">
              <div class="info-item">
                <span>Effect执行次数:</span>
                <span>{{ effectCount }}</span>
              </div>
              <div class="info-item">
                <span>清理函数调用:</span>
                <span>{{ cleanupCount }}</span>
              </div>
              <div class="info-item">
                <span>当前依赖值:</span>
                <span>{{ count }}</span>
              </div>
            </div>

            <div class="effect-controls">
              <label>
                <input type="checkbox" v-model="enableEffect" />
                启用Effect
              </label>
              <label>
                <input type="checkbox" v-model="logToConsole" />
                控制台日志
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from 'vue';

// 时间线数据
const timeline = ref([
  {
    type: 'render',
    title: '组件渲染',
    description: 'React执行组件函数，生成虚拟DOM'
  },
  {
    type: 'schedule',
    title: 'Effect调度',
    description: '将useEffect回调加入执行队列'
  },
  {
    type: 'paint',
    title: '浏览器绘制',
    description: '浏览器完成DOM更新和页面绘制'
  },
  {
    type: 'effect',
    title: '执行Effect',
    description: '按顺序执行所有Effect回调函数'
  },
  {
    type: 'cleanup',
    title: '返回清理函数',
    description: 'Effect可以返回一个清理函数'
  },
  {
    type: 'update',
    title: '依赖变化',
    description: '当依赖项变化时，重复上述流程'
  },
  {
    type: 'unmount',
    title: '组件卸载',
    description: '执行所有Effect的清理函数'
  }
]);

// 交互演示数据
const count = ref(0);
const effectCount = ref(0);
const cleanupCount = ref(0);
const enableEffect = ref(true);
const logToConsole = ref(true);

const increment = () => {
  count.value++;
};

const decrement = () => {
  if (count.value > 0) count.value--;
};

const reset = () => {
  count.value = 0;
};

// 模拟useEffect
const effectCleanup = ref<(() => void) | null>(null);

watchEffect((onCleanup) => {
  if (!enableEffect.value) return;

  effectCount.value++;
  if (logToConsole.value) {
    console.log(`Effect执行 #${effectCount.value}, 计数: ${count.value}`);
  }

  // 模拟清理函数
  onCleanup(() => {
    cleanupCount.value++;
    if (logToConsole.value) {
      console.log(`清理函数调用 #${cleanupCount.value}, 计数: ${count.value}`);
    }
  });
});

// 组件卸载时清理
onUnmounted(() => {
  if (logToConsole.value) {
    console.log('组件卸载，执行所有清理');
  }
});
</script>

<style lang="less" scoped>


.use-effect-container {
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
  margin-bottom: 2rem;

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

  .effect-lifecycle {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .phase {
      background: #f8fbff;
      border-radius: 10px;
      border: 1px solid #e1ebfa;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      .phase-title {
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        color: white;
        padding: 0.8rem 1rem;
        font-weight: 600;
        font-size: 1.1rem;
        text-align: center;
      }

      .phase-content {
        padding: 1.2rem;
      }
    }
  }

  .effect-demo {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    .demo-title {
      font-weight: 600;
      margin-bottom: 1.2rem;
      color: #2c3e50;
      font-size: 1.2rem;
      text-align: center;
    }

    .timeline {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 16px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #64b5f6;
      }

      .timeline-item {
        display: flex;
        margin-bottom: 1.5rem;
        position: relative;

        &:last-child {
          margin-bottom: 0;
        }

        .timeline-badge {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          position: relative;
          z-index: 1;

          &.render {
            background: #4caf50;
          }

          &.schedule {
            background: #ff9800;
          }

          &.paint {
            background: #2196f3;
          }

          &.effect {
            background: #9c27b0;
          }

          &.cleanup {
            background: #f44336;
          }

          &.update {
            background: #00bcd4;
          }

          &.unmount {
            background: #607d8b;
          }
        }

        .timeline-content {
          margin-left: 1rem;
          flex: 1;
          background: #f8fbff;
          border-radius: 8px;
          padding: 0.8rem 1rem;
          border: 1px solid #e1ebfa;

          .timeline-title {
            font-weight: 600;
            margin-bottom: 0.3rem;
            color: #2c3e50;
          }

          .timeline-desc {
            font-size: 0.95rem;
            color: #5f6368;
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
        text-align: center;
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
          text-align: center;
        }
      }
    }
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;

    .case-card {
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      .case-icon {
        font-size: 2rem;
        text-align: center;
        padding: 1rem;
        background: #f8fbff;
      }

      .case-content {
        padding: 1.2rem;

        h3 {
          margin: 0 0 0.8rem;
          color: #2c3e50;
          text-align: center;
        }

        p {
          margin: 0 0 0.8rem;
          color: #5f6368;
          font-size: 0.95rem;
          text-align: center;
        }

        pre {
          background: #f0f7ff;
          border-radius: 6px;
          padding: 0.8rem;
          overflow-x: auto;
          font-size: 0.8rem;

          code {
            font-family: 'JetBrains Mono', monospace;
            color: #1a73e8;
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
      background: #f8fbff;
      border-radius: 8px;
      padding: 1.2rem;
      border-left: 3px solid #1a73e8;

      .tip-header {
        font-weight: 600;
        margin-bottom: 0.8rem;
        color: #1a73e8;
      }

      p {
        margin: 0 0 0.8rem;
        color: #5f6368;
        font-size: 0.95rem;
      }

      code {
        display: block;
        background: #e3f2fd;
        color: #1a5fb4;
        padding: 0.8rem;
        border-radius: 6px;
        font-size: 0.9rem;
        overflow-x: auto;
      }
    }
  }
}

.interactive-demo {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .demo-container {
    border: 1px solid #e1ebfa;
    border-radius: 8px;
    overflow: hidden;

    .demo-header {
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      color: white;
      padding: 0.8rem 1rem;
      font-weight: 600;
      font-size: 1.1rem;
      text-align: center;
    }

    .demo-content {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .counter-section {
        background: #f8fbff;
        border-radius: 8px;
        padding: 1.2rem;
        border: 1px solid #e1ebfa;
        text-align: center;

        .counter-value {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #1a73e8;
        }

        .counter-controls {
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
      }

      .effect-section {
        background: #f8fbff;
        border-radius: 8px;
        padding: 1.2rem;
        border: 1px solid #e1ebfa;

        .effect-info {
          background: #e3f2fd;
          border-radius: 6px;
          padding: 1rem;
          margin-bottom: 1.2rem;

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
              font-weight: 500;
            }
          }
        }

        .effect-controls {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;

          label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            color: #5f6368;

            input[type="checkbox"] {
              width: 18px;
              height: 18px;
            }
          }
        }
      }
    }
  }
}

.effect-step {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;

  &:last-child {
    margin-bottom: 0;
  }

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
    margin-right: 1rem;
  }

  .step-content {
    h3 {
      margin: 0 0 0.3rem;
      font-size: 1.1rem;
      color: #2c3e50;
    }

    p {
      margin: 0;
      color: #5f6368;
      font-size: 0.95rem;
    }
  }
}

.effect-arrow {
  height: 20px;
  margin-left: 16px;
  border-left: 2px dashed #3498db;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .use-effect-container {
    padding: 1.5rem;
  }

  .content-wrapper {
    gap: 1.5rem;
  }

  .visualization,
  .explanation section {
    padding: 1.2rem;
  }

  .effect-lifecycle {
    grid-template-columns: 1fr;
  }
}
</style>
