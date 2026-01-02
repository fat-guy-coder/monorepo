<template>
  <div class="react-19-features-container">
    <header class="page-header">
      <h1 class="title">React 19+ 新特性前瞻</h1>
      <p class="subtitle">探索编译器优化、Actions API、文档组件等下一代特性</p>
    </header>

    <main class="content">
      <!-- 版本概述 -->
      <section class="overview-section">
        <div class="card">
          <h2 class="card-title">React 19+ 版本概述</h2>
          <div class="card-content">
            <div class="overview-content">
              <p class="intro-text">
                React 19 带来了革命性的编译器优化、Actions API、文档组件等特性，进一步简化开发并提升性能。
              </p>
              <div class="version-highlights">
                <h3>核心亮点</h3>
                <div class="highlights-grid">
                  <div class="highlight-item">
                    <div class="highlight-icon">⚡</div>
                    <div class="highlight-text">
                      <h4>React编译器</h4>
                      <p>自动Memoization，减少手动优化</p>
                    </div>
                  </div>
                  <div class="highlight-item">
                    <div class="highlight-icon">🔄</div>
                    <div class="highlight-text">
                      <h4>Actions API</h4>
                      <p>统一的数据变更和表单处理</p>
                    </div>
                  </div>
                  <div class="highlight-item">
                    <div class="highlight-icon">📄</div>
                    <div class="highlight-text">
                      <h4>文档组件</h4>
                      <p>原生支持文档结构</p>
                    </div>
                  </div>
                  <div class="highlight-item">
                    <div class="highlight-icon">🎨</div>
                    <div class="highlight-text">
                      <h4>资源加载</h4>
                      <p>智能资源预加载和缓存</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- React 编译器 -->
      <section class="compiler-section">
        <div class="card">
          <h2 class="card-title">React 编译器 (React Compiler)</h2>
          <div class="card-content">
            <div class="compiler-content">
              <div class="compiler-intro">
                <h3>自动优化时代</h3>
                <p>React Compiler 自动分析组件代码，智能添加 memoization，减少手动优化工作。</p>

                <div class="compiler-comparison">
                  <div class="compiler-version">
                    <h4>React 18 及之前</h4>
                    <div class="code-block">
                      <pre><code>import { memo, useMemo, useCallback } from 'react';

// 需要手动优化
const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveCalculation(item));
  }, [data]);

  const handleUpdate = useCallback((newValue) => {
    onUpdate(newValue);
  }, [onUpdate]);

  return (
    &lt;div&gt;
      {processedData.map(item => (
        &lt;div key={item.id}&gt;{item.value}&lt;/div&gt;
      ))}
      &lt;button onClick={handleUpdate}&gt;Update&lt;/button&gt;
    &lt;/div&gt;
  );
});</code></pre>
                    </div>
                  </div>

                  <div class="compiler-version">
                    <h4>React 19 + 编译器</h4>
                    <div class="code-block">
                      <pre><code>// React Compiler 自动优化
const ExpensiveComponent = ({ data, onUpdate }) => {
  // 编译器自动 memoize 这个计算
  const processedData = data.map(item =>
    expensiveCalculation(item)
  );

  // 编译器自动 memoize 这个函数
  const handleUpdate = (newValue) => {
    onUpdate(newValue);
  };

  return (
    &lt;div&gt;
      {processedData.map(item => (
        &lt;div key={item.id}&gt;{item.value}&lt;/div&gt;
      ))}
      &lt;button onClick={handleUpdate}&gt;Update&lt;/button&gt;
    &lt;/div&gt;
  );
};</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <div class="compiler-features">
                <h3>编译器特性</h3>
                <div class="features-grid">
                  <div class="feature-item">
                    <h4>自动 Memoization</h4>
                    <p>智能识别纯计算和稳定函数，自动添加优化</p>
                  </div>
                  <div class="feature-item">
                    <h4>依赖分析</h4>
                    <p>精确分析依赖关系，避免不必要的重新渲染</p>
                  </div>
                  <div class="feature-item">
                    <h4>编译时优化</h4>
                    <p>在构建时进行优化，运行时零开销</p>
                  </div>
                  <div class="feature-item">
                    <h4>渐进采用</h4>
                    <p>可以逐步在项目中启用编译器</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Actions API -->
      <section class="actions-section">
        <div class="card">
          <h2 class="card-title">Actions API</h2>
          <div class="card-content">
            <div class="actions-content">
              <div class="actions-intro">
                <h3>统一的数据变更处理</h3>
                <p>Actions 提供声明式的方式来处理数据变更、表单提交和异步操作。</p>
              </div>

              <div class="actions-grid">
                <div class="action-card">
                  <div class="action-header">
                    <h3 class="action-name">useActionState</h3>
                    <span class="action-tag new">新增</span>
                  </div>
                  <div class="action-content">
                    <div class="action-info">
                      <h4>描述</h4>
                      <p>管理异步操作状态，提供 pending、error、data 状态</p>
                      <h4>使用场景</h4>
                      <ul>
                        <li>表单提交</li>
                        <li>数据变更操作</li>
                        <li>API调用</li>
                      </ul>
                    </div>
                    <div class="action-code">
                      <pre><code>import { useActionState } from 'react';

async function updateUser(prevState, formData) {
  try {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('更新失败');
    }

    return {
      success: true,
      message: '用户信息已更新'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

function UserProfile() {
  const [state, submitAction, isPending] = useActionState(updateUser, null);

  return (
    &lt;form action={submitAction}&gt;
      &lt;input name="name" placeholder="用户名" /&gt;
      &lt;input name="email" placeholder="邮箱" /&gt;
      &lt;button type="submit" disabled={isPending}&gt;
        {isPending ? '更新中...' : '更新信息'}
      &lt;/button&gt;
      {state?.message && (
        &lt;p className={state.success ? 'success' : 'error'}&gt;
          {state.message}
        &lt;/p&gt;
      )}
    &lt;/form&gt;
  );
}</code></pre>
                    </div>
                  </div>
                </div>

                <div class="action-card">
                  <div class="action-header">
                    <h3 class="action-name">useFormStatus</h3>
                    <span class="action-tag new">新增</span>
                  </div>
                  <div class="action-content">
                    <div class="action-info">
                      <h4>描述</h4>
                      <p>在表单子组件中访问父表单的状态</p>
                      <h4>使用场景</h4>
                      <ul>
                        <li>表单内组件状态同步</li>
                        <li>提交状态共享</li>
                        <li>嵌套表单组件</li>
                      </ul>
                    </div>
                    <div class="action-code">
                      <pre><code>import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    &lt;button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    &gt;
      {pending ? '提交中...' : '提交表单'}
    &lt;/button&gt;
  );
}

function ContactForm() {
  return (
    &lt;form action="/api/contact"&gt;
      &lt;input name="name" placeholder="姓名" /&gt;
      &lt;input name="email" placeholder="邮箱" /&gt;
      &lt;textarea name="message" placeholder="消息" /&gt;

      &lt;SubmitButton /&gt;
    &lt;/form&gt;
  );
}</code></pre>
                    </div>
                  </div>
                </div>

                <div class="action-card">
                  <div class="action-header">
                    <h3 class="action-name">useOptimistic</h3>
                    <span class="action-tag new">新增</span>
                  </div>
                  <div class="action-content">
                    <div class="action-info">
                      <h4>描述</h4>
                      <p>乐观更新UI，在操作完成前立即显示预期结果</p>
                      <h4>使用场景</h4>
                      <ul>
                        <li>即时反馈操作</li>
                        <li>聊天消息发送</li>
                        <li>点赞、收藏等交互</li>
                      </ul>
                    </div>
                    <div class="action-code">
                      <pre><code>import { useOptimistic, useActionState } from 'react';

function MessageList({ messages }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        ...newMessage,
        sending: true
      }
    ]
  );

  const [state, formAction] = useActionState(async (prevState, formData) => {
    const message = formData.get('message');

    // 乐观更新
    addOptimisticMessage({
      id: Math.random(),
      text: message,
      sender: 'You'
    });

    // 实际发送
    await sendMessage(message);

    return { success: true };
  }, null);

  return (
    &lt;div&gt;
      &lt;div className="messages"&gt;
        {optimisticMessages.map(message => (
          &lt;div
            key={message.id}
            className={`message ${message.sending ? 'sending' : ''}`}
          &gt;
            {message.text}
            {message.sending && &lt;span className="sending-indicator"&gt;发送中...&lt;/span&gt;}
          &lt;/div&gt;
        ))}
      &lt;/div&gt;

      &lt;form action={formAction}&gt;
        &lt;input name="message" placeholder="输入消息..." /&gt;
        &lt;button type="submit"&gt;发送&lt;/button&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  );
}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 文档组件 -->
      <section class="document-section">
        <div class="card">
          <h2 class="card-title">文档组件</h2>
          <div class="card-content">
            <div class="document-content">
              <div class="document-intro">
                <h3>原生文档结构支持</h3>
                <p>React 19 引入了原生文档组件，无需额外配置即可处理页面元数据。</p>
              </div>

              <div class="document-components">
                <div class="component-card">
                  <div class="component-header">
                    <h3 class="component-name">&lt;title&gt;, &lt;meta&gt;, &lt;link&gt;</h3>
                    <span class="component-tag new">新增</span>
                  </div>
                  <div class="component-content">
                    <div class="component-info">
                      <h4>描述</h4>
                      <p>在组件中直接使用文档标签，React会自动将它们移动到正确的位置</p>
                    </div>
                    <div class="component-code">
                      <pre><code>import { title, meta, link } from 'react';

function BlogPost({ post }) {
  return (
    &lt;article&gt;
      &lt;title&gt;{post.title} - My Blog&lt;/title&gt;
      &lt;meta name="description" content={post.excerpt} /&gt;
      &lt;meta property="og:title" content={post.title} /&gt;
      &lt;meta property="og:description" content={post.excerpt} /&gt;
      &lt;meta property="og:image" content={post.image} /&gt;
      &lt;link rel="canonical" href={post.url} /&gt;

      &lt;h1&gt;{post.title}&lt;/h1&gt;
      &lt;div className="content"&gt;
        {post.content}
      &lt;/div&gt;
    &lt;/article&gt;
  );
}

// 服务端渲染时，这些标签会自动注入到 &lt;head&gt; 中
// 客户端路由切换时，也会自动更新文档元数据</code></pre>
                    </div>
                  </div>
                </div>

                <div class="component-card">
                  <div class="component-header">
                    <h3 class="component-name">&lt;script&gt; 和 &lt;style&gt;</h3>
                    <span class="component-tag new">新增</span>
                  </div>
                  <div class="component-content">
                    <div class="component-info">
                      <h4>描述</h4>
                      <p>组件级别的脚本和样式管理，支持依赖去重和加载优化</p>
                    </div>
                    <div class="component-code">
                      <pre><code>import { script, style } from 'react';

function ChartComponent() {
  return (
    &lt;div&gt;
      &lt;script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        onLoad={() => console.log('Chart.js loaded')}
      /&gt;
      &lt;style&gt;
        {`
          .chart-container {
            width: 100%;
            height: 400px;
            background: #f5f5f5;
          }
        `}
      &lt;/style&gt;

      &lt;div className="chart-container"&gt;
        &lt;canvas id="myChart"&gt;&lt;/canvas&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

// React 会自动去重相同的脚本和样式
// 支持按需加载和代码分割</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 资源加载 -->
      <section class="resources-section">
        <div class="card">
          <h2 class="card-title">资源加载优化</h2>
          <div class="card-content">
            <div class="resources-content">
              <div class="resources-intro">
                <h3>智能资源管理</h3>
                <p>React 19 引入了新的资源加载API，提供更好的性能优化和用户体验。</p>
              </div>

              <div class="resources-grid">
                <div class="resource-card">
                  <div class="resource-header">
                    <h3 class="resource-name">use</h3>
                    <span class="resource-tag new">新增</span>
                  </div>
                  <div class="resource-content">
                    <div class="resource-info">
                      <h4>描述</h4>
                      <p>直接读取Promise、Context等资源，简化异步数据获取</p>
                      <h4>使用场景</h4>
                      <ul>
                        <li>Promise直接读取</li>
                        <li>Context消费</li>
                        <li>异步组件</li>
                      </ul>
                    </div>
                    <div class="resource-code">
                      <pre><code>import { use } from 'react';

// 直接读取 Promise
function UserProfile({ userId }) {
  const user = use(fetchUser(userId));

  return (
    &lt;div&gt;
      &lt;h1&gt;{user.name}&lt;/h1&gt;
      &lt;p&gt;{user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}

// 读取 Context（无需 Provider）
const ThemeContext = createContext();

function ThemedButton() {
  const theme = use(ThemeContext);

  return (
    &lt;button style={&#123; background: theme.primary &#125;}&gt;
      Themed Button
    &lt;/button&gt;
  );
}

// 配合 Suspense 使用
function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;UserProfile userId="123" /&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>
                    </div>
                  </div>
                </div>

                <div class="resource-card">
                  <div class="resource-header">
                    <h3 class="resource-name">资源预加载</h3>
                    <span class="resource-tag new">新增</span>
                  </div>
                  <div class="resource-content">
                    <div class="resource-info">
                      <h4>描述</h4>
                      <p>声明式资源预加载，提升页面加载性能</p>
                      <h4>使用场景</h4>
                      <ul>
                        <li>图片预加载</li>
                        <li>数据预获取</li>
                        <li>路由预加载</li>
                      </ul>
                    </div>
                    <div class="resource-code">
                      <pre><code>import { preload, prefetch } from 'react';

// 组件内预加载
function ProductImage({ productId }) {
  // 预加载图片
  preload(`/api/products/${productId}/image`);

  return (
    &lt;img
      src={`/api/products/${productId}/image`}
      alt="Product"
    /&gt;
  );
}

// 路由预加载
function Navigation() {
  return (
    &lt;nav&gt;
      &lt;a
        href="/products"
        onMouseEnter={() => prefetch('/api/products')}
      &gt;
        产品列表
      &lt;/a&gt;
    &lt;/nav&gt;
  );
}

// 数据预获取
function ProductPage({ productId }) {
  // 并行加载数据和图片
  const product = use(fetchProduct(productId));
  preload(`/api/products/${productId}/image`);

  return (
    &lt;div&gt;
      &lt;h1&gt;{product.name}&lt;/h1&gt;
      &lt;ProductImage productId={productId} /&gt;
    &lt;/div&gt;
  );
}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 其他增强 -->
      <section class="enhancements-section">
        <div class="card">
          <h2 class="card-title">其他重要增强</h2>
          <div class="card-content">
            <div class="enhancements-content">
              <div class="enhancements-grid">
                <div class="enhancement-card">
                  <div class="enhancement-header">
                    <h3 class="enhancement-name">Ref 作为 Prop</h3>
                    <span class="enhancement-tag improved">改进</span>
                  </div>
                  <div class="enhancement-content">
                    <div class="enhancement-info">
                      <h4>描述</h4>
                      <p>函数组件现在可以直接接收 ref 作为 prop，无需 forwardRef</p>
                    </div>
                    <div class="enhancement-code">
                      <pre><code>// React 18 及之前
const MyInput = forwardRef((props, ref) => {
  return &lt;input {...props} ref={ref} /&gt;
});

// React 19
function MyInput({ ref, ...props }) {
  return &lt;input {...props} ref={ref} /&gt;
}

// 使用方式保持不变
function Form() {
  const inputRef = useRef();

  return (
    &lt;form&gt;
      &lt;MyInput ref={inputRef} placeholder="输入内容" /&gt;
      &lt;button onClick={() => inputRef.current.focus()}&gt;
        聚焦输入框
      &lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
                    </div>
                  </div>
                </div>

                <div class="enhancement-card">
                  <div class="enhancement-header">
                    <h3 class="enhancement-name">Context 性能优化</h3>
                    <span class="enhancement-tag improved">改进</span>
                  </div>
                  <div class="enhancement-content">
                    <div class="enhancement-info">
                      <h4>描述</h4>
                      <p>Context 现在支持选择性地订阅部分值，减少不必要的重新渲染</p>
                    </div>
                    <div class="enhancement-code">
                      <pre><code>import { createContext, useContextSelector } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: 'John',
    email: 'john@example.com',
    preferences: {
      theme: 'dark',
      language: 'zh-CN'
    }
  });

  return (
    &lt;UserContext.Provider value={&#123; user, setUser &#125;}&gt;
      &#123;children&#125;
    &lt;/UserContext.Provider&gt;
  );
}

// 只订阅需要的部分
function ThemeSelector() {
  const theme = useContextSelector(
    UserContext,
    (value) => value.user.preferences.theme
  );

  return (
    &lt;select value={theme} onChange={/* ... */}&gt;
      &lt;option value="light"&gt;浅色&lt;/option&gt;
      &lt;option value="dark"&gt;深色&lt;/option&gt;
    &lt;/select&gt;
  );
}

// 当 user.name 或 user.email 变化时，ThemeSelector 不会重新渲染
// 只有当 theme 变化时才会重新渲染</code></pre>
                    </div>
                  </div>
                </div>

                <div class="enhancement-card">
                  <div class="enhancement-header">
                    <h3 class="enhancement-name">错误处理增强</h3>
                    <span class="enhancement-tag improved">改进</span>
                  </div>
                  <div class="enhancement-content">
                    <div class="enhancement-info">
                      <h4>描述</h4>
                      <p>更细粒度的错误处理和恢复机制</p>
                    </div>
                    <div class="enhancement-code">
                      <pre><code>import { ErrorBoundary, useErrorBoundary } from 'react';

function ProductDetails({ productId }) {
  const { showBoundary } = useErrorBoundary();

  try {
    const product = use(fetchProduct(productId));
    return &lt;ProductView product={product} /&gt;
  } catch (error) {
    // 可以选择性地处理错误
    if (error.status === 404) {
      return &lt;ProductNotFound /&gt;
    } else {
      // 将其他错误抛给 ErrorBoundary
      showBoundary(error);
    }
  }
}

function App() {
  return (
    &lt;ErrorBoundary
      fallback={&lt;ErrorPage /&gt;}
      onError={(error, errorInfo) => {
        // 记录错误
        logError(error, errorInfo);
      }}
      onReset={() => {
        // 错误恢复后的回调
        window.location.reload();
      }}
    &gt;
      &lt;ProductDetails productId="123" /&gt;
    &lt;/ErrorBoundary&gt;
  );
}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 迁移指南 -->
      <section class="migration-section">
        <div class="card">
          <h2 class="card-title">迁移到 React 19</h2>
          <div class="card-content">
            <div class="migration-content">
              <div class="migration-steps">
                <h3>升级步骤</h3>
                <div class="steps">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>安装 React 19</h4>
                      <div class="code-block">
                        <pre><code>npm install react@19 react-dom@19</code></pre>
                      </div>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>启用 React 编译器（可选）</h4>
                      <div class="code-block">
                        <pre><code>// 在构建工具中配置
// Vite 示例
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler']
        ]
      }
    })
  ]
});</code></pre>
                      </div>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>迁移 Actions API</h4>
                      <p>将表单处理和数据变更迁移到新的 Actions API</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h4>更新文档组件</h4>
                      <p>使用新的文档组件替代现有的 head 管理方案</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="migration-tips">
                <h3>迁移注意事项</h3>
                <div class="tips-grid">
                  <div class="tip">
                    <div class="tip-icon">⚠️</div>
                    <div class="tip-content">
                      <h4>编译器兼容性</h4>
                      <p>确保代码符合 React 编译器的要求（纯函数、稳定依赖）</p>
                    </div>
                  </div>
                  <div class="tip">
                    <div class="tip-icon">🔍</div>
                    <div class="tip-content">
                      <h4>Actions 测试</h4>
                      <p>充分测试新的 Actions API 在各种场景下的行为</p>
                    </div>
                  </div>
                  <div class="tip">
                    <div class="tip-icon">🚀</div>
                    <div class="tip-content">
                      <h4>渐进采用</h4>
                      <p>可以逐步启用编译器和新的 API</p>
                    </div>
                  </div>
                  <div class="tip">
                    <div class="tip-icon">📚</div>
                    <div class="tip-content">
                      <h4>第三方库</h4>
                      <p>检查使用的第三方库是否与 React 19 兼容</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="breaking-changes">
                <h3>重大变化</h3>
                <div class="changes-list">
                  <div class="change-item">
                    <h4>forwardRef 不再必需</h4>
                    <p>函数组件现在直接接收 ref prop</p>
                  </div>
                  <div class="change-item">
                    <h4>严格模式增强</h4>
                    <p>开发模式下会有更多的行为模拟来发现潜在问题</p>
                  </div>
                  <div class="change-item">
                    <h4>弃用警告</h4>
                    <p>一些旧的 API 可能会被标记为弃用</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加响应式数据或方法
</script>

<style lang="less" scoped>
.react-19-features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf7 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 32px 0;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin: 0;
    font-weight: 300;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  border: 1px solid #e1e8ed;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #e9ecef;
  }
}

.overview-content {
  .intro-text {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 24px;
    text-align: center;
  }
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.highlight-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .highlight-icon {
    font-size: 2rem;
    margin-right: 16px;
  }

  .highlight-text {
    h4 {
      margin: 0 0 4px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.compiler-content {
  .compiler-intro {
    margin-bottom: 32px;

    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    p {
      margin: 0 0 24px 0;
      color: #666;
    }
  }
}

.compiler-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.compiler-version {
  h4 {
    margin: 0 0 12px 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }
}

.code-block {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.compiler-features {
  h3 {
    margin: 0 0 20px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.feature-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;

  h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
}

.actions-content {
  .actions-intro {
    margin-bottom: 32px;

    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    p {
      margin: 0 0 24px 0;
      color: #666;
    }
  }
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.action-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.action-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  .action-name {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .action-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.new {
      background: #e8f5e8;
      color: #2e7d32;
    }
  }
}

.action-content {
  padding: 20px;
}

.action-info {
  margin-bottom: 16px;

  h4 {
    margin: 12px 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  ul {
    margin: 0 0 12px 0;
    padding-left: 20px;

    li {
      margin-bottom: 4px;
      color: #555;
      font-size: 0.9rem;
    }
  }
}

.action-code {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.document-content {
  .document-intro {
    margin-bottom: 32px;

    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    p {
      margin: 0 0 24px 0;
      color: #666;
    }
  }
}

.document-components {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.component-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  .component-name {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .component-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.new {
      background: #e8f5e8;
      color: #2e7d32;
    }
  }
}

.component-content {
  padding: 20px;
}

.component-info {
  margin-bottom: 16px;

  h4 {
    margin: 12px 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.component-code {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.resources-content {
  .resources-intro {
    margin-bottom: 32px;

    h3 {
      margin: 0 0 16px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    p {
      margin: 0 0 24px 0;
      color: #666;
    }
  }
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.resource-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.resource-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  .resource-name {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .resource-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.new {
      background: #e8f5e8;
      color: #2e7d32;
    }
  }
}

.resource-content {
  padding: 20px;
}

.resource-info {
  margin-bottom: 16px;

  h4 {
    margin: 12px 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  ul {
    margin: 0 0 12px 0;
    padding-left: 20px;

    li {
      margin-bottom: 4px;
      color: #555;
      font-size: 0.9rem;
    }
  }
}

.resource-code {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.enhancements-content {
  .enhancements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
  }
}

.enhancement-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.enhancement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;

  .enhancement-name {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .enhancement-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.improved {
      background: #e3f2fd;
      color: #1976d2;
    }
  }
}

.enhancement-content {
  padding: 20px;
}

.enhancement-info {
  margin-bottom: 16px;

  h4 {
    margin: 12px 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.enhancement-code {
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.migration-content {
  .migration-steps {
    margin-bottom: 32px;

    h3 {
      margin: 0 0 20px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }
  }
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  align-items: flex-start;

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    font-weight: 600;
    margin-right: 16px;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;

    h4 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0 0 12px 0;
      color: #666;
    }
  }
}

.migration-tips {
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tip {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }

  .tip-icon {
    font-size: 1.5rem;
    margin-right: 16px;
  }

  .tip-content {
    h4 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.breaking-changes {
  h3 {
    margin: 0 0 20px 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
}

.changes-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.change-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;

  h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .react-19-features-container {
    padding: 16px;
  }

  .page-header .title {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .highlights-grid,
  .compiler-comparison,
  .actions-grid,
  .document-components,
  .resources-grid,
  .enhancements-grid,
  .features-grid,
  .tips-grid,
  .changes-list {
    grid-template-columns: 1fr;
  }

  .step {
    flex-direction: column;
    align-items: flex-start;

    .step-number {
      margin-bottom: 12px;
    }
  }
}
</style>
