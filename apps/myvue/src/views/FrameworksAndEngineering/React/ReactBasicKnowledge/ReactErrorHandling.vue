<template>
  <div class="react-error-guide">
    <header>
      <h1>React 错误处理基本介绍</h1>
      <p>掌握 React 应用中的错误边界、捕获和处理策略</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">5+</div>
          <div class="stat-label">核心方法</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">3</div>
          <div class="stat-label">错误边界类型</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 概述部分 -->
      <div class="section">
        <h2>📌 React 错误处理概述</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <h3>为什么需要错误处理？</h3>
            <ul>
              <li>防止整个应用因局部错误而崩溃</li>
              <li>提供优雅的错误恢复机制</li>
              <li>增强用户体验，避免白屏</li>
              <li>收集错误信息用于调试改进</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>React 错误处理特点</h3>
            <ul>
              <li>组件树错误不会传播到父组件</li>
              <li>未捕获错误会导致整个组件树卸载</li>
              <li>错误边界是主要的错误处理机制</li>
              <li>异步代码需要特殊处理</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>错误处理原则</h3>
            <div class="principles">
              <div class="principle">局部化处理</div>
              <div class="principle">优雅降级</div>
              <div class="principle">信息透明</div>
              <div class="principle">快速恢复</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 错误边界 -->
      <div class="section">
        <h2>🛡️ 错误边界 (Error Boundaries)</h2>
        <div class="error-boundary-flow">
          <div class="boundary-card">
            <h3>什么是错误边界？</h3>
            <p>
              错误边界是 React 组件，用于捕获其子组件树中任何位置的 JavaScript
              错误，记录这些错误，并显示备用 UI。
            </p>
            <div class="boundary-visual">
              <div class="component-tree">
                <div class="component boundary">ErrorBoundary</div>
                <div class="tree-arrow">↓</div>
                <div class="component-group">
                  <div class="component">Header</div>
                  <div class="component error">
                    ProductList <span class="error-badge">Error</span>
                  </div>
                  <div class="component">Footer</div>
                </div>
              </div>
            </div>
          </div>

          <div class="implementation">
            <h3>实现错误边界组件</h3>
            <div class="code-columns">
              <div class="code-block">
                <h4>类组件实现</h4>
                <pre>
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // 更新 state 以显示备用 UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return &lt;FallbackUI error={this.state.error} />;
    }
    return this.props.children;
  }
}

// 使用
&lt;ErrorBoundary>
  &lt;MyComponent />
&lt;/ErrorBoundary></pre
                >
              </div>
              <div class="code-block">
                <h4>Hook 实现 (使用 react-error-boundary)</h4>
                <pre>
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    &lt;div role="alert">
      &lt;p>出错了:&lt;/p>
      &lt;pre>{error.message}&lt;/pre>
      &lt;button onClick={resetErrorBoundary}>重试&lt;/button>
    &lt;/div>
  );
}

function App() {
  return (
    &lt;ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      &lt;MyComponent />
    &lt;ErrorBoundary>
  );
}</pre
                >
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3>错误边界最佳实践</h3>
            <div class="practices-grid">
              <div class="practice">
                <div class="icon">📍</div>
                <h4>战略位置放置</h4>
                <p>在关键组件周围放置错误边界，如路由组件、复杂组件</p>
              </div>
              <div class="practice">
                <div class="icon">🔄</div>
                <h4>提供恢复机制</h4>
                <p>在备用 UI 中提供重试或刷新选项</p>
              </div>
              <div class="practice">
                <div class="icon">📝</div>
                <h4>记录错误信息</h4>
                <p>使用 componentDidCatch 记录错误到监控系统</p>
              </div>
              <div class="practice">
                <div class="icon">🚫</div>
                <h4>避免过度使用</h4>
                <p>不要在每个组件上使用错误边界，保持合理粒度</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他错误处理方式 -->
      <div class="section">
        <h2>⚙️ 其他错误处理技术</h2>
        <div class="techniques-grid">
          <div class="technique-card">
            <h3>1. Try/Catch 处理</h3>
            <p>适用于：事件处理、异步代码、非 React 代码</p>
            <pre class="code-block">
function handleClick() {
  try {
    // 可能出错的代码
    riskyOperation();
  } catch (error) {
    // 处理错误
    showErrorToast(error.message);
    logError(error);
  }
}

async function fetchData() {
  try {
    const data = await apiCall();
    setData(data);
  } catch (error) {
    setErrorState(error);
  }
}</pre
            >
          </div>

          <div class="technique-card">
            <h3>2. 错误状态处理</h3>
            <p>使用状态管理处理预期错误</p>
            <pre class="code-block">
function DataFetcher() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('/api/data');
        setData(await result.json());
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return &lt;ErrorDisplay message={error} />;
  }

  return &lt;DataView data={data} />;
}</pre
            >
          </div>

          <div class="technique-card">
            <h3>3. 全局错误处理</h3>
            <p>捕获未处理的错误和 Promise 拒绝</p>
            <pre class="code-block">
// 捕获未处理的错误
window.addEventListener('error', (event) => {
  logError(event.error);
});

// 捕获未处理的 Promise 拒绝
window.addEventListener('unhandledrejection', (event) => {
  logError(event.reason);
});

// React 18+ 全局错误处理
import { unstable_createRoot } from 'react-dom';

const root = unstable_createRoot(container);
root.render(
  &lt;React.unstable_ErrorBoundary
    fallback={&lt;GlobalErrorScreen />}
  >
    &lt;App />
  &lt;/React.unstable_ErrorBoundary>
);</pre
            >
          </div>

          <div class="technique-card">
            <h3>4. 错误报告服务</h3>
            <p>集成专业错误监控服务</p>
            <div class="services">
              <div class="service">Sentry</div>
              <div class="service">Bugsnag</div>
              <div class="service">Rollbar</div>
              <div class="service">LogRocket</div>
            </div>
            <pre class="code-block">
import * as Sentry from '@sentry/react';

// 初始化
Sentry.init({
  dsn: 'YOUR_DSN',
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// 错误边界集成
const SentryErrorBoundary = Sentry.ErrorBoundary;

// 手动捕获错误
try {
  riskyOperation();
} catch (err) {
  Sentry.captureException(err);
}</pre
            >
          </div>
        </div>
      </div>

      <!-- 错误类型处理 -->
      <div class="section">
        <h2>🔍 特定错误类型处理</h2>
        <div class="error-types">
          <div class="error-type">
            <h3>渲染错误</h3>
            <p>组件渲染过程中发生的错误</p>
            <div class="solution"><span class="method">处理方法：</span> 错误边界</div>
            <pre class="code-block">
function ProductCard({ product }) {
  // 如果 product 为 null，会抛出错误
  return &lt;div>{product.name}&lt;/div>;
}</pre
            >
          </div>

          <div class="error-type">
            <h3>生命周期错误</h3>
            <p>在生命周期方法中发生的错误</p>
            <div class="solution"><span class="method">处理方法：</span> 错误边界 + try/catch</div>
            <pre class="code-block">
class UserProfile extends React.Component {
  componentDidMount() {
    try {
      fetchUserData();
    } catch (error) {
      // 处理错误
    }
  }
}</pre
            >
          </div>

          <div class="error-type">
            <h3>事件处理错误</h3>
            <p>在事件处理函数中发生的错误</p>
            <div class="solution"><span class="method">处理方法：</span> try/catch</div>
            <pre class="code-block">
function handleSubmit() {
  try {
    validateForm();
    submitForm();
  } catch (error) {
    showToast(error.message);
  }
}</pre
            >
          </div>

          <div class="error-type">
            <h3>异步错误</h3>
            <p>在 Promise、async/await 中的错误</p>
            <div class="solution"><span class="method">处理方法：</span> catch 方法 + 错误状态</div>
            <pre class="code-block">
useEffect(() => {
  fetchData()
    .then(setData)
    .catch(error => {
      setError(error);
    });
}, []);</pre
            >
          </div>
        </div>
      </div>

      <!-- 错误处理策略 -->
      <div class="section">
        <h2>🎯 React 错误处理策略</h2>
        <div class="strategy-cards">
          <div class="strategy-card">
            <div class="strategy-header">防御性编程</div>
            <ul>
              <li>使用 PropTypes 或 TypeScript</li>
              <li>空值检查 (optional chaining)</li>
              <li>默认值和回退内容</li>
            </ul>
            <pre class="code-block">
// 使用可选链操作符
product?.name

// 提供默认值
const name = user.name || '未知用户';

// 回退内容
{data ? &lt;DataView data={data} /> : &lt;Loading />}</pre
            >
          </div>

          <div class="strategy-card">
            <div class="strategy-header">分层处理</div>
            <ul>
              <li>顶层：全局错误边界</li>
              <li>路由级：每个路由错误边界</li>
              <li>组件级：关键组件错误边界</li>
              <li>操作级：try/catch 局部处理</li>
            </ul>
            <div class="layer-visual">
              <div class="layer">全局边界</div>
              <div class="layer-arrow">↓</div>
              <div class="layer">路由边界</div>
              <div class="layer-arrow">↓</div>
              <div class="layer">组件边界</div>
              <div class="layer-arrow">↓</div>
              <div class="layer">try/catch</div>
            </div>
          </div>

          <div class="strategy-card">
            <div class="strategy-header">用户友好的错误反馈</div>
            <ul>
              <li>提供清晰的错误信息</li>
              <li>避免技术术语</li>
              <li>提供解决方案或下一步</li>
              <li>设计友好的错误页面</li>
            </ul>
            <div class="error-example">
              <div class="error-card">
                <div class="error-icon">⚠️</div>
                <h4>请求失败</h4>
                <p>无法加载数据，请检查网络连接后重试</p>
                <button class="retry-btn">重试</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>React 错误处理指南 © 2023 | 使用 Vue 3 + TypeScript 实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 示例错误数据
const errorExample = ref({
  message: "Cannot read property 'name' of null",
  componentStack: `
    at ProductCard (webpack-internal:///./src/components/ProductCard.js:25:5)
    at ProductList (webpack-internal:///./src/components/ProductList.js:10:7)
    at ErrorBoundary (webpack-internal:///./src/components/ErrorBoundary.js:9:5)
    at App (webpack-internal:///./src/App.js:15:5)
  `,
})
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.react-error-guide {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background-color: #f8fafc;
  min-height: 100vh;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;

      .stat-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        padding: 15px 25px;
        min-width: 120px;

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.85;
        }
      }
    }
  }

  .content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 30px;
  }

  .section {
    margin-bottom: 40px;

    h2 {
      font-size: 1.8rem;
      color: #4361ee;
      margin-bottom: 25px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eef2ff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 80px;
        height: 3px;
        background: #4361ee;
        border-radius: 3px;
      }
    }
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;

    .overview-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.3rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;
          position: relative;
          font-size: 0.95rem;
          color: #475569;

          &::before {
            content: '•';
            color: #4361ee;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }

      .principles {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;

        .principle {
          background: #eef2ff;
          color: #4361ee;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      }
    }
  }

  .error-boundary-flow {
    .boundary-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      margin-bottom: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.3rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        color: #475569;
        margin-bottom: 20px;
      }
    }

    .boundary-visual {
      background: #f8f9fe;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      justify-content: center;

      .component-tree {
        display: flex;
        flex-direction: column;
        align-items: center;

        .component {
          background: white;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 12px 20px;
          text-align: center;
          margin: 5px 0;
          position: relative;
          min-width: 180px;

          &.boundary {
            background: #eef2ff;
            border-color: #a3bffa;
            font-weight: 600;
            color: #434190;
          }

          &.error {
            background: #fff5f5;
            border-color: #fed7d7;
            color: #c53030;
          }
        }

        .tree-arrow {
          margin: 10px 0;
          color: #a0aec0;
          font-weight: bold;
        }

        .component-group {
          display: flex;
          gap: 15px;

          .component {
            min-width: 120px;
          }
        }

        .error-badge {
          background: #feb2b2;
          color: #c53030;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          margin-left: 8px;
        }
      }
    }

    .implementation {
      background: white;
      border-radius: 10px;
      padding: 25px;
      margin-bottom: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.3rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 20px;
      }

      .code-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
        }

        .code-block {
          background: #f8f9fe;
          border-radius: 8px;
          padding: 15px;
          border: 1px solid #e2e8f0;

          h4 {
            font-size: 1.1rem;
            color: #4c51bf;
            margin-top: 0;
            margin-bottom: 10px;
          }

          pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            line-height: 1.5;
            margin: 0;
          }
        }
      }
    }

    .best-practices {
      h3 {
        font-size: 1.3rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 20px;
      }

      .practices-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;

        .practice {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          transition: transform 0.2s ease;

          &:hover {
            transform: translateY(-3px);
          }

          .icon {
            font-size: 1.8rem;
            margin-bottom: 10px;
          }

          h4 {
            font-size: 1.1rem;
            color: #4c51bf;
            margin-top: 0;
            margin-bottom: 10px;
          }

          p {
            font-size: 0.9rem;
            color: #4a5568;
            margin: 0;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .techniques-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .technique-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.9rem;
        color: #4a5568;
        margin-bottom: 15px;
        font-style: italic;
      }

      .services {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 15px;

        .service {
          background: #eef2ff;
          color: #4c51bf;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
      }
    }
  }

  .error-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .error-type {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 10px;
      }

      p {
        font-size: 0.9rem;
        color: #4a5568;
        margin-bottom: 15px;
      }

      .solution {
        background: #f0fff4;
        padding: 8px 12px;
        border-radius: 6px;
        margin-bottom: 15px;
        font-size: 0.9rem;

        .method {
          font-weight: 600;
          color: #2f855a;
        }
      }
    }
  }

  .strategy-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .strategy-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      .strategy-header {
        font-size: 1.3rem;
        font-weight: 600;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px solid #eef2ff;
      }

      ul {
        padding-left: 20px;
        margin: 0 0 20px 0;

        li {
          margin-bottom: 10px;
          position: relative;
          font-size: 0.95rem;
          color: #475569;

          &::before {
            content: '•';
            color: #4361ee;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }

      .layer-visual {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-top: 15px;

        .layer {
          background: #eef2ff;
          color: #4c51bf;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: 500;
          min-width: 150px;
          text-align: center;
        }

        .layer-arrow {
          color: #a0aec0;
          font-weight: bold;
        }
      }

      .error-example {
        background: #f8f9fe;
        border-radius: 8px;
        padding: 15px;
        margin-top: 15px;

        .error-card {
          background: white;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          padding: 20px;
          text-align: center;

          .error-icon {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: #e53e3e;
          }

          h4 {
            font-size: 1.2rem;
            color: #c53030;
            margin: 0 0 10px 0;
          }

          p {
            font-size: 0.9rem;
            color: #4a5568;
            margin-bottom: 15px;
          }

          .retry-btn {
            background: #4299e1;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: background 0.2s;

            &:hover {
              background: #3182ce;
            }
          }
        }
      }
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    overflow-x: auto;
    line-height: 1.5;
    margin: 15px 0;
  }

  footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #64748b;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
  }

  @media (max-width: 768px) {
    header {
      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }

      .stats {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
    }
  }
}
</style>
