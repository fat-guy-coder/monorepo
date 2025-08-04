<template>
  <div class="hooks-container">
    <header class="header">
      <h1 class="title">React Hooks 基本解析</h1>
      <div class="subtitle">函数式组件的强大工具集</div>
    </header>

    <div class="content-wrapper">
      <section class="intro-section">
        <h2 class="section-title">什么是 Hooks？</h2>
        <div class="definition-card">
          <p>Hooks 是 React 16.8 引入的新特性，允许你在函数组件中使用状态(state)和其他 React 特性，而无需编写 class 组件。</p>
          <div class="key-points">
            <div class="point">
              <div class="icon">💡</div>
              <div>允许函数组件使用状态和生命周期</div>
            </div>
            <div class="point">
              <div class="icon">🔄</div>
              <div>提供可复用状态逻辑的方式</div>
            </div>
            <div class="point">
              <div class="icon">🧩</div>
              <div>避免 class 组件的复杂性和 this 问题</div>
            </div>
          </div>
        </div>
      </section>

      <section class="hooks-section">
        <h2 class="section-title">核心 Hooks 及其作用</h2>
        <div class="hooks-grid">
          <div v-for="hook in coreHooks" :key="hook.name" class="hook-card">
            <div class="hook-header">
              <div class="hook-icon">{{ hook.icon }}</div>
              <div class="hook-name">{{ hook.name }}</div>
            </div>
            <div class="hook-description">{{ hook.description }}</div>
            <div class="hook-usage">
              <div class="usage-title">使用场景:</div>
              <ul>
                <li v-for="(scenario, idx) in hook.scenarios" :key="idx">{{ scenario }}</li>
              </ul>
            </div>
            <div class="code-example">
              <pre><code>{{ hook.code }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="rules-section">
        <h2 class="section-title">Hooks 使用规则</h2>
        <div class="rule-card">
          <div class="rule-header">
            <div class="rule-number">1</div>
            <h3>只在最顶层使用 Hooks</h3>
          </div>
          <div class="rule-content">
            <p>不要在循环、条件或嵌套函数中调用 Hook，确保每次组件渲染时都以<strong>相同的顺序</strong>调用 Hook。</p>
            <div class="rule-diagram">
              <div class="correct">
                <div class="label">✅ 正确</div>
                <div class="code-line">function MyComponent() {</div>
                <div class="code-line indent">useState(); // 1st Hook</div>
                <div class="code-line indent">useEffect(); // 2nd Hook</div>
                <div class="code-line indent">useContext(); // 3rd Hook</div>
                <div class="code-line">}</div>
              </div>
              <div class="incorrect">
                <div class="label">❌ 错误</div>
                <div class="code-line">function MyComponent() {</div>
                <div class="code-line indent">if (condition) {</div>
                <div class="code-line indent-2">useState(); // 条件中的 Hook</div>
                <div class="code-line indent">}</div>
                <div class="code-line indent">useEffect();</div>
                <div class="code-line">}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="rule-card">
          <div class="rule-header">
            <div class="rule-number">2</div>
            <h3>只在 React 函数中调用 Hooks</h3>
          </div>
          <div class="rule-content">
            <p>不要在普通的 JavaScript 函数中调用 Hook。只在以下位置调用 Hook：</p>
            <ul class="rule-list">
              <li>React 函数组件中</li>
              <li>自定义 Hook 中</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="why-section">
        <h2 class="section-title">为什么有这些规则？</h2>
        <div class="explanation">
          <div class="explanation-card">
            <div class="explanation-header">状态顺序依赖</div>
            <div class="explanation-content">
              <p>React 依赖于 Hook 的调用顺序来正确关联状态和对应的 useState 调用。</p>
              <div class="visualization">
                <div class="state-row">
                  <div class="state-label">首次渲染:</div>
                  <div class="state-box">useState('A')</div>
                  <div class="state-box">useState('B')</div>
                  <div class="state-box">useState('C')</div>
                </div>
                <div class="arrow">↓</div>
                <div class="state-row">
                  <div class="state-label">状态存储:</div>
                  <div class="state-index">0</div>
                  <div class="state-index">1</div>
                  <div class="state-index">2</div>
                </div>
                <div class="arrow">↓</div>
                <div class="state-row">
                  <div class="state-label">二次渲染:</div>
                  <div class="state-box">useState('A') // 索引 0</div>
                  <div class="state-box">useState('B') // 索引 1</div>
                  <div class="state-box">useState('C') // 索引 2</div>
                </div>
              </div>
            </div>
          </div>

          <div class="explanation-card">
            <div class="explanation-header">条件语句的问题</div>
            <div class="explanation-content">
              <p>如果 Hook 在条件语句中，渲染顺序可能发生变化：</p>
              <div class="problem-visualization">
                <div class="render">
                  <div class="render-title">首次渲染 (condition=true):</div>
                  <div class="state-row">
                    <div class="state-box">useState('A')</div>
                    <div class="state-box">useState('B')</div>
                    <div class="state-box">useState('C')</div>
                  </div>
                  <div class="state-indexes">
                    <div>索引 0</div>
                    <div>索引 1</div>
                    <div>索引 2</div>
                  </div>
                </div>

                <div class="arrow">↓</div>

                <div class="render">
                  <div class="render-title">二次渲染 (condition=false):</div>
                  <div class="state-row">
                    <div class="state-box">useState('A')</div>
                    <div class="state-box">useState('C')</div>
                  </div>
                  <div class="state-indexes">
                    <div>索引 0 (A)</div>
                    <div class="mismatch">索引 1 (应该是 B，但现在是 C)</div>
                  </div>
                  <div class="error-message">状态错位导致数据错误！</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="custom-hooks">
        <h2 class="section-title">自定义 Hooks</h2>
        <div class="custom-hooks-content">
          <p>自定义 Hook 是一个 JavaScript 函数，其名称以 "use" 开头，可以调用其他 Hook。</p>

          <div class="custom-hook-example">
            <div class="example-title">useWindowSize 示例:</div>
            <div class="code-block">
              <pre><code>import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// 在组件中使用
function MyComponent() {
  const size = useWindowSize();
  return (
    &lt;div&gt;
      当前窗口尺寸: {size.width} x {size.height}
    &lt;/div&gt;
  );
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <p>React Hooks 使函数组件拥有了类组件的功能，同时提供了更好的代码复用和逻辑组织方式。</p>
        <p>遵循 Hooks 规则可以避免难以追踪的 bug 和不可预测的行为。</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 核心Hooks数据
const coreHooks = ref([
  {
    name: 'useState',
    icon: '⚡',
    description: '用于在函数组件中添加和管理状态',
    scenarios: [
      '管理组件内部状态',
      '存储用户输入值',
      '控制UI元素显示/隐藏'
    ],
    code: `const [count, setCount] = useState(0);\n\n<button onClick={() => setCount(count + 1)}>\n  点击次数: {count}\n</button>`
  },
  {
    name: 'useEffect',
    icon: '🌐',
    description: '用于执行副作用操作（数据获取、订阅等）',
    scenarios: [
      'API数据获取',
      'DOM操作',
      '设置定时器和事件监听',
      '清理资源'
    ],
    code: `useEffect(() => {\n  // 组件挂载时执行\n  fetchData();\n  \n  // 清理函数\n  return () => {\n    clearInterval(timer);\n  };\n}, [dependency]); // 依赖数组`
  },
  {
    name: 'useContext',
    icon: '📦',
    description: '用于在组件树中共享数据，避免props层层传递',
    scenarios: [
      '主题切换',
      '用户认证信息',
      '多语言国际化',
      '全局配置'
    ],
    code: `const ThemeContext = createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <div>当前主题: {theme}</div>;\n}`
  },
  {
    name: 'useReducer',
    icon: '🔄',
    description: 'useState的替代方案，适用于复杂状态逻辑',
    scenarios: [
      '状态逻辑较复杂',
      '下一个状态依赖于之前的状态',
      '需要维护多个子状态',
      '状态更新逻辑需要复用'
    ],
    code: `const initialState = { count: 0 };\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    default:\n      throw new Error();\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n  return (\n    <>\n      计数: {state.count}\n      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n    </>\n  );\n}`
  },
  {
    name: 'useCallback',
    icon: '📌',
    description: '返回一个记忆化的回调函数，避免不必要的重新渲染',
    scenarios: [
      '传递给子组件的回调函数',
      '依赖项相同的函数复用',
      '性能优化场景'
    ],
    code: `const memoizedCallback = useCallback(\n  () => {\n    doSomething(a, b);\n  },\n  [a, b], // 依赖项\n);`
  },
  {
    name: 'useMemo',
    icon: '🧠',
    description: '返回一个记忆化的值，避免复杂计算的重复执行',
    scenarios: [
      '计算昂贵的值',
      '避免子组件不必要的重新渲染',
      '优化组件性能'
    ],
    code: `const memoizedValue = useMemo(() => \n  computeExpensiveValue(a, b),\n  [a, b] // 依赖项\n);`
  },
  {
    name: 'useRef',
    icon: '📎',
    description: '返回一个可变的ref对象，其.current属性被初始化为传入的参数',
    scenarios: [
      '访问DOM元素',
      '存储可变值而不触发重新渲染',
      '保存前一个状态',
      '定时器ID存储'
    ],
    code: `const inputRef = useRef(null);\n\nconst onButtonClick = () => {\n  inputRef.current.focus();\n};\n\nreturn (\n  <>\n    <input ref={inputRef} type="text" />\n    <button onClick={onButtonClick}>聚焦输入框</button>\n  </>\n);`
  },
  {
    name: '自定义 Hook',
    icon: '✨',
    description: '将组件逻辑提取到可重用的函数中',
    scenarios: [
      '复用状态逻辑',
      '抽象复杂行为',
      '共享通用功能',
      '简化组件代码'
    ],
    code: `function useFriendStatus(friendID) {\n  const [isOnline, setIsOnline] = useState(null);\n\n  useEffect(() => {\n    function handleStatusChange(status) {\n      setIsOnline(status.isOnline);\n    }\n    \n    ChatAPI.subscribe(friendID, handleStatusChange);\n    return () => {\n      ChatAPI.unsubscribe(friendID, handleStatusChange);\n    };\n  }, [friendID]);\n\n  return isOnline;\n}`
  }
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.hooks-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  color: #333;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 20px rgba(106, 17, 203, 0.15);

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.2rem;
    font-weight: 300;
    opacity: 0.9;
  }
}

.content-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #3498db;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background: #6a11cb;
  }
}

.intro-section {
  margin-bottom: 3rem;

  .definition-card {
    background: #f0f7ff;
    border-radius: 10px;
    padding: 1.5rem;
    border-left: 4px solid #3498db;

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }
  }

  .key-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;

    .point {
      display: flex;
      align-items: flex-start;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

      .icon {
        font-size: 1.5rem;
        margin-right: 1rem;
      }
    }
  }
}

.hooks-section {
  margin-bottom: 3rem;

  .hooks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .hook-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #eef2f7;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
    }

    .hook-header {
      display: flex;
      align-items: center;
      padding: 1.2rem 1.5rem;
      background: linear-gradient(to right, #3498db, #6a11cb);
      color: white;
    }

    .hook-icon {
      font-size: 1.8rem;
      margin-right: 1rem;
    }

    .hook-name {
      font-size: 1.4rem;
      font-weight: 600;
    }

    .hook-description {
      padding: 1.2rem 1.5rem;
      font-size: 1rem;
      color: #444;
      border-bottom: 1px solid #eee;
    }

    .hook-usage {
      padding: 1rem 1.5rem;

      .usage-title {
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #2c3e50;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
      }
    }

    .code-example {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 1rem;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.85rem;
      overflow-x: auto;

      pre {
        margin: 0;
      }
    }
  }
}

.rules-section {
  margin-bottom: 3rem;

  .rule-card {
    background: #fff9f0;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 1.5rem;
    border: 1px solid #ffe9c7;

    .rule-header {
      display: flex;
      align-items: center;
      padding: 1.2rem 1.5rem;
      background: #ff9800;
      color: white;

      .rule-number {
        width: 32px;
        height: 32px;
        background: white;
        color: #ff9800;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 1rem;
      }

      h3 {
        margin: 0;
        font-size: 1.4rem;
      }
    }

    .rule-content {
      padding: 1.5rem;

      p {
        font-size: 1.05rem;
        margin-bottom: 1.2rem;
      }
    }

    .rule-diagram {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;

      .correct,
      .incorrect {
        flex: 1;
        padding: 1rem;
        border-radius: 8px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }

      .correct {
        background: #e8f5e9;
        border: 1px solid #66bb6a;
      }

      .incorrect {
        background: #ffebee;
        border: 1px solid #ef5350;
      }

      .label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-family: 'Inter', sans-serif;
      }

      .code-line {
        margin-bottom: 0.25rem;

        &.indent {
          padding-left: 1.5rem;
        }

        &.indent-2 {
          padding-left: 3rem;
        }
      }
    }

    .rule-list {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.why-section {
  margin-bottom: 3rem;

  .explanation {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .explanation-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .explanation-header {
      background: #6a11cb;
      color: white;
      padding: 1rem 1.5rem;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .explanation-content {
      padding: 1.5rem;

      p {
        margin-top: 0;
        margin-bottom: 1rem;
      }
    }

    .visualization {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;

      .state-row {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin: 1rem 0;
      }

      .state-label {
        font-weight: 600;
        margin-right: 0.5rem;
      }

      .state-box {
        background: #3498db;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }

      .state-index {
        background: #e0e0e0;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        font-weight: bold;
      }

      .arrow {
        font-size: 1.5rem;
        text-align: center;
        margin: 0.5rem 0;
        color: #777;
      }
    }

    .problem-visualization {
      .render {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;

        .render-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .state-row {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .state-box {
          background: #3498db;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
        }

        .state-indexes {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.5rem;

          div {
            padding: 0.3rem 0.8rem;
            background: #e0e0e0;
            border-radius: 4px;
            font-size: 0.85rem;

            &.mismatch {
              background: #ffcdd2;
              color: #c62828;
            }
          }
        }

        .error-message {
          color: #c62828;
          font-weight: bold;
          text-align: center;
          margin-top: 0.5rem;
        }
      }
    }
  }
}

.custom-hooks {
  .custom-hooks-content {
    p {
      font-size: 1.05rem;
      margin-bottom: 1.5rem;
    }
  }

  .custom-hook-example {
    background: #f5f7ff;
    border-radius: 10px;
    padding: 1.5rem;
    border-left: 4px solid #6a11cb;

    .example-title {
      font-weight: 600;
      margin-bottom: 1rem;
      color: #2c3e50;
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.85rem;

    pre {
      margin: 0;
      line-height: 1.5;
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem 1rem 1rem;
  margin-top: 2rem;
  color: #666;
  font-size: 1.05rem;
  border-top: 1px solid #eee;

  p {
    margin: 0.5rem 0;
  }
}

@media (max-width: 768px) {
  .hooks-container {
    padding: 1rem;
  }

  .content-wrapper {
    padding: 1.5rem;
  }

  .header {
    padding: 1.5rem 1rem;

    .title {
      font-size: 2rem;
    }
  }

  .hooks-grid {
    grid-template-columns: 1fr !important;
  }

  .rule-diagram {
    flex-direction: column;
  }
}
</style>
