<template>
  <div class="hooks-container">
    <header class="header">
      <div class="logo-container">
        <div class="react-logo">
          <div class="react-logo-inner"></div>
        </div>
        <h1>React Hooks 调用规则解析</h1>
      </div>
      <p class="subtitle">为什么 Hooks 必须在顶层调用？深入理解其原理</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <!-- 介绍部分 -->
        <section class="section intro-section">
          <div class="card">
            <h2><i class="icon-question"></i>React Hooks 的基本规则</h2>
            <div class="rule-box">
              <div class="rule-item">
                <div class="rule-icon">1</div>
                <div class="rule-content">
                  <h3>只在顶层调用 Hooks</h3>
                  <p>不要在循环、条件或嵌套函数中调用 Hooks</p>
                </div>
              </div>
              <div class="rule-item">
                <div class="rule-icon">2</div>
                <div class="rule-content">
                  <h3>只在 React 函数组件中调用 Hooks</h3>
                  <p>不要在普通 JavaScript 函数中调用 Hooks</p>
                </div>
              </div>
            </div>

            <div class="problem-example">
              <h3>错误示例：条件调用 Hook</h3>
              <div class="code-block error">
                <pre><code>function MyComponent() {
  // ❌ 错误：在条件语句中调用 Hook
  if (condition) {
    useEffect(() => {
      // ...
    });
  }

  return &lt;div&gt;...&lt;/div&gt;;
}</code></pre>
              </div>

              <h3>正确示例：顶层调用 Hook</h3>
              <div class="code-block success">
                <pre><code>function MyComponent() {
  // ✅ 正确：在顶层调用 Hook
  useEffect(() => {
    if (condition) {
      // 在 effect 内部使用条件
    }
  });

  return &lt;div&gt;...&lt;/div&gt;;
}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 原理部分 -->
        <section class="section principles-section">
          <div class="card">
            <h2><i class="icon-gear"></i>底层原理：为什么必须遵循这个规则</h2>

            <div class="principle-explanation">
              <div class="principle-item">
                <div class="principle-icon">🧠</div>
                <div class="principle-content">
                  <h3>Hooks 的链表存储机制</h3>
                  <p>React 使用单向链表来跟踪组件中的所有 Hook 调用。每个 Hook 节点包含状态和指向下一个 Hook 的指针。</p>
                  <div class="linked-list-diagram">
                    <div class="node">useState<br><small>state: 0</small></div>
                    <div class="arrow">→</div>
                    <div class="node">useEffect<br><small>effect</small></div>
                    <div class="arrow">→</div>
                    <div class="node">useRef<br><small>ref</small></div>
                    <div class="arrow">→</div>
                    <div class="node">null</div>
                  </div>
                </div>
              </div>

              <div class="principle-item">
                <div class="principle-icon">🔢</div>
                <div class="principle-content">
                  <h3>调用顺序的重要性</h3>
                  <p>React 依赖于 Hook 的调用顺序来正确关联状态和效果。在渲染之间保持相同的调用顺序是至关重要的。</p>
                  <div class="sequence-diagram">
                    <div class="render">
                      <div class="render-title">第一次渲染</div>
                      <div class="hook-sequence">
                        <span class="hook">useState</span>
                        <span class="hook">useEffect</span>
                        <span class="hook">useState</span>
                      </div>
                    </div>
                    <div class="render">
                      <div class="render-title">第二次渲染</div>
                      <div class="hook-sequence">
                        <span class="hook">useState</span>
                        <span class="hook">useEffect</span>
                        <span class="hook">useState</span>
                      </div>
                    </div>
                    <div class="sequence-match">顺序匹配 ✅</div>
                  </div>
                </div>
              </div>

              <div class="principle-item">
                <div class="principle-icon">⚠️</div>
                <div class="principle-content">
                  <h3>条件调用导致的问题</h3>
                  <p>当 Hook 调用顺序改变时，React 无法正确关联状态和效果，导致数据错乱和错误。</p>
                  <div class="problem-sequence">
                    <div class="render">
                      <div class="render-title">第一次渲染</div>
                      <div class="hook-sequence">
                        <span class="hook">useState</span>
                        <span class="hook">useEffect</span>
                        <span class="hook">useState</span>
                      </div>
                    </div>
                    <div class="render">
                      <div class="render-title">第二次渲染</div>
                      <div class="hook-sequence">
                        <span class="hook">useState</span>
                        <span class="hook condition">条件跳过</span>
                        <span class="hook">useState</span>
                      </div>
                    </div>
                    <div class="sequence-mismatch">顺序不匹配 ❌</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="technical-details">
              <h3>React 内部实现原理</h3>
              <div class="code-block">
                <pre><code>// 简化的 React 内部实现
let currentHook = null;
let firstHook = null;
let nextHook = null;

function useState(initialValue) {
  const hook = {
    state: initialValue,
    next: null
  };

  if (!firstHook) {
    firstHook = hook;
  } else {
    currentHook.next = hook;
  }

  currentHook = hook;
  nextHook = hook.next;

  return [hook.state, setState];
}</code></pre>
              </div>

              <div class="explanation-points">
                <div class="point">
                  <div class="point-icon">🔗</div>
                  <div class="point-content">
                    <h4>链表数据结构</h4>
                    <p>React 使用链表按顺序存储所有 Hook，每个 Hook 节点包含状态和指向下一个 Hook 的指针</p>
                  </div>
                </div>
                <div class="point">
                  <div class="point-icon">📝</div>
                  <div class="point-content">
                    <h4>基于调用顺序的关联</h4>
                    <p>React 根据 Hook 的调用顺序将渲染与正确的状态关联起来</p>
                  </div>
                </div>
                <div class="point">
                  <div class="point-icon">🔄</div>
                  <div class="point-content">
                    <h4>渲染间的一致性</h4>
                    <p>在重新渲染时，React 期望以完全相同的顺序找到所有 Hook</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 问题案例 -->
        <section class="section problem-section">
          <div class="card">
            <h2><i class="icon-bug"></i>违反规则的后果</h2>

            <div class="problem-case">
              <div class="case-desc">
                <h3>状态错位问题</h3>
                <p>当条件性调用 Hook 时，状态可能会关联到错误的 Hook</p>
              </div>
              <div class="case-example">
                <div class="code-block">
                  <pre><code>function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ❌ 错误：条件调用 Hook
  if (userId) {
    useEffect(() => {
      fetchUser(userId).then(setUser);
    }, [userId]);
  }

  // ...
}</code></pre>
                </div>
              </div>
            </div>

            <div class="problem-case">
              <div class="case-desc">
                <h3>Hook 计数不匹配</h3>
                <p>React 在组件渲染前后比较 Hook 数量，不匹配会抛出错误</p>
              </div>
              <div class="case-example">
                <div class="error-message">
                  <div class="error-icon">❌</div>
                  <div>
                    <h4>React 错误提示</h4>
                    <p>Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="problem-case">
              <div class="case-desc">
                <h3>Effect 管理混乱</h3>
                <p>条件调用 useEffect 可能导致 effect 清理和设置不匹配</p>
              </div>
              <div class="case-example">
                <div class="effect-diagram">
                  <div class="render">
                    <div class="render-title">首次渲染</div>
                    <div class="effect-sequence">
                      <div class="effect">设置 Effect A</div>
                    </div>
                  </div>
                  <div class="render">
                    <div class="render-title">二次渲染</div>
                    <div class="effect-sequence">
                      <div class="effect cleanup">清理 Effect A</div>
                      <div class="effect">设置 Effect B</div>
                    </div>
                  </div>
                  <div class="render">
                    <div class="render-title">三次渲染</div>
                    <div class="effect-sequence">
                      <div class="effect cleanup">清理 Effect B</div>
                      <div class="effect">设置 Effect A</div>
                    </div>
                  </div>
                  <div class="effect-error">Effect 管理混乱 ❌</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 解决方案 -->
        <section class="section solution-section">
          <div class="card">
            <h2><i class="icon-check"></i>正确使用 Hooks 的模式</h2>

            <div class="solution-strategies">
              <div class="strategy">
                <div class="strategy-icon">🔄</div>
                <div class="strategy-content">
                  <h3>在 effect 内部使用条件</h3>
                  <p>将条件逻辑移到 Hook 内部，而不是外部</p>
                  <div class="code-block">
                    <pre><code>useEffect(() => {
  if (condition) {
    // 执行条件操作
  }
}, [dependencies]);</code></pre>
                  </div>
                </div>
              </div>

              <div class="strategy">
                <div class="strategy-icon">🎣</div>
                <div class="strategy-content">
                  <h3>自定义 Hook 封装</h3>
                  <p>将条件逻辑封装在自定义 Hook 中</p>
                  <div class="code-block">
                    <pre><code>function useConditionalEffect(condition, effect, deps) {
  useEffect(() => {
    if (condition) {
      return effect();
    }
  }, [condition, ...deps]);
}

// 使用
useConditionalEffect(shouldFetch, () => {
  fetchData();
}, [shouldFetch]);</code></pre>
                  </div>
                </div>
              </div>

              <div class="strategy">
                <div class="strategy-icon">🧩</div>
                <div class="strategy-content">
                  <h3>拆分组件</h3>
                  <p>将有条件的逻辑拆分到子组件中</p>
                  <div class="code-block">
                    <pre><code>function ParentComponent() {
  return (
    &lt;div&gt;
      {condition && &lt;ChildWithEffect /&gt;}
    &lt;/div&gt;
  );
}

function ChildWithEffect() {
  useEffect(() => {
    // 只在 condition 为 true 时运行
  }, []);

  return &lt;div&gt;...&lt;/div&gt;;
}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div class="linter-section">
              <h3>使用 ESLint 插件</h3>
              <div class="linter-desc">
                <p>React 团队提供了 <code>eslint-plugin-react-hooks</code> 来强制 Hook 规则</p>
                <div class="code-block">
                  <pre><code>// .eslintrc.js
module.exports = {
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>© 2023 React Hooks 原理解析 | 使用 Vue3 制作</p>
      <p>React 是 Facebook 的注册商标</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要复杂逻辑，主要是静态内容展示
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #61dafb;
@primary-dark: #00a3cc;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@success-color: #10b981;
@warning-color: #f59e0b;
@error-color: #ef4444;

// 混合
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition {
  transition: all 0.3s ease;
}

// 全局样式
.hooks-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: @background;
  color: @text-color;
  min-height: 100vh;
  line-height: 1.6;
  padding: 0;
  margin: 0;
}

.header {
  background: linear-gradient(135deg, darken(@primary-color, 15%), @primary-color);
  color: white;
  text-align: center;
  padding: 2.5rem 1rem;
  margin-bottom: 2rem;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 300;
  }
}

// React Logo动画
.react-logo {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
  animation: rotate 15s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.7);
  }

  &::before {
    transform: rotate(60deg);
  }

  &::after {
    transform: rotate(-60deg);
  }

  .react-logo-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section {
  .card {
    background: @card-bg;
    border-radius: 12px;
    padding: 2rem;
    .box-shadow;

    h2 {
      font-size: 1.75rem;
      color: @primary-dark;
      margin-top: 0;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      i {
        font-size: 1.5rem;
      }
    }

    h3 {
      color: @text-color;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-size: 1.3rem;
    }

    p {
      color: @text-secondary;
      margin-bottom: 1rem;
    }
  }
}

.rule-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .rule-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    background: lighten(@primary-color, 45%);
    border-radius: 10px;
    padding: 1.5rem;

    .rule-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      font-size: 1.25rem;
      font-weight: bold;
      flex-shrink: 0;
    }
  }
}

.problem-example {
  margin-top: 2rem;

  .code-block {
    background: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 1.25rem;
    margin: 1.5rem 0;
    overflow-x: auto;

    pre {
      margin: 0;
      font-size: 0.95rem;
    }

    code {
      font-family: 'Fira Code', monospace;
      color: #2f363d;
    }

    &.error {
      border-left: 4px solid @error-color;
    }

    &.success {
      border-left: 4px solid @success-color;
    }
  }
}

.principle-explanation {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;

  .principle-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
    background: lighten(@primary-color, 45%);
    border-radius: 10px;

    .principle-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }
  }
}

.linked-list-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  .box-shadow;

  .node {
    background: lighten(@primary-color, 30%);
    border: 2px solid @primary-color;
    border-radius: 8px;
    padding: 1rem;
    min-width: 120px;
    text-align: center;
    font-weight: 500;
  }

  .arrow {
    font-size: 1.5rem;
    color: @text-secondary;
  }
}

.sequence-diagram,
.problem-sequence {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  .box-shadow;

  .render {
    display: flex;
    align-items: center;
    gap: 1rem;

    .render-title {
      font-weight: 500;
      min-width: 120px;
    }

    .hook-sequence {
      display: flex;
      gap: 0.5rem;

      .hook {
        background: lighten(@success-color, 40%);
        border: 1px solid @success-color;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;

        &.condition {
          background: lighten(@error-color, 40%);
          border-color: @error-color;
        }
      }
    }
  }

  .sequence-match {
    text-align: center;
    font-weight: bold;
    color: @success-color;
    margin-top: 0.5rem;
  }

  .sequence-mismatch {
    text-align: center;
    font-weight: bold;
    color: @error-color;
    margin-top: 0.5rem;
  }
}

.technical-details {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    border-radius: 8px;
    padding: 1.25rem;
    margin: 1.5rem 0;
    overflow-x: auto;

    pre {
      margin: 0;
    }

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
    }
  }
}

.explanation-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .point {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: white;
    border-radius: 8px;
    padding: 1.25rem;
    .box-shadow;

    .point-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
      color: @primary-color;
    }
  }
}

.problem-case {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .case-desc {
    margin-bottom: 1rem;
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: lighten(@error-color, 40%);
    border-left: 4px solid @error-color;
    border-radius: 0 8px 8px 0;
    padding: 1.25rem;

    .error-icon {
      font-size: 2rem;
    }
  }
}

.effect-diagram {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  .box-shadow;

  .render {
    display: flex;
    align-items: center;
    gap: 1rem;

    .render-title {
      font-weight: 500;
      min-width: 100px;
    }

    .effect-sequence {
      display: flex;
      gap: 0.5rem;

      .effect {
        background: lighten(@primary-color, 40%);
        border: 1px solid @primary-color;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;

        &.cleanup {
          background: lighten(@warning-color, 40%);
          border-color: @warning-color;
        }
      }
    }
  }

  .effect-error {
    text-align: center;
    font-weight: bold;
    color: @error-color;
    margin-top: 0.5rem;
  }
}

.solution-strategies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;

  .strategy {
    background: lighten(@success-color, 45%);
    border-radius: 10px;
    padding: 1.5rem;

    .strategy-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: @success-color;
    }

    .code-block {
      background: #f6f8fa;
      border: 1px solid #e1e4e8;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
  }
}

.linter-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;

  .code-block {
    background: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 1.25rem;
    margin: 1.5rem 0;
    overflow-x: auto;
  }
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  background: @card-bg;
  color: @text-secondary;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

// 响应式设计
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .content-wrapper {
    padding: 0 1rem;
  }
}
</style>
