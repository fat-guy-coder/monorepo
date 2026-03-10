<template>
  <div class="hooks-container">
    <header class="header">
      <h1>React useEffect与useLayoutEffect基础介绍</h1>
      <p class="subtitle">深入理解React核心副作用钩子</p>
    </header>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">⚛️</span>
        核心概念与对比
      </h2>

      <div class="comparison-card">
        <div class="hook-card effect">
          <div class="hook-header">useEffect</div>
          <div class="hook-body">
            <ul>
              <li><span class="highlight">异步</span>执行副作用</li>
              <li>在浏览器<span class="highlight">绘制完成后</span>执行</li>
              <li>适合数据获取、订阅等<span class="highlight">非阻塞操作</span></li>
              <li>不会阻塞浏览器渲染</li>
            </ul>
          </div>
        </div>

        <div class="vs-divider">VS</div>

        <div class="hook-card layout">
          <div class="hook-header">useLayoutEffect</div>
          <div class="hook-body">
            <ul>
              <li><span class="highlight">同步</span>执行副作用</li>
              <li>在DOM更新后，浏览器<span class="highlight">绘制前</span>执行</li>
              <li>适合DOM操作、布局计算等<span class="highlight">同步任务</span></li>
              <li>可能阻塞浏览器渲染</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="execution-flow">
        <div class="phase">
          <div class="phase-label">1. 渲染组件</div>
          <div class="phase-box">React计算DOM变化</div>
        </div>

        <div class="arrow">→</div>

        <div class="phase">
          <div class="phase-label">2. 提交到DOM</div>
          <div class="phase-box">DOM实际更新</div>
        </div>

        <div class="arrow">→</div>

        <div class="phase layout-phase">
          <div class="phase-label">useLayoutEffect</div>
          <div class="phase-box">同步执行DOM操作</div>
        </div>

        <div class="arrow">→</div>

        <div class="phase">
          <div class="phase-label">3. 浏览器绘制</div>
          <div class="phase-box">页面可见</div>
        </div>

        <div class="arrow">→</div>

        <div class="phase effect-phase">
          <div class="phase-label">useEffect</div>
          <div class="phase-box">异步执行副作用</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">📌</span>
        useEffect基础介绍
      </h2>

      <div class="card-grid">
        <div class="info-card">
          <h3>核心作用</h3>
          <ul>
            <li>处理<span class="highlight">副作用操作</span>（数据获取、订阅、手动DOM操作）</li>
            <li>替代类组件的<span class="highlight">componentDidMount</span>、<span
                class="highlight">componentDidUpdate</span>和<span class="highlight">componentWillUnmount</span></li>
            <li>在组件渲染后<span class="highlight">异步执行</span></li>
          </ul>
        </div>

        <div class="info-card">
          <h3>使用场景</h3>
          <ul>
            <li>API数据获取</li>
            <li>事件监听器添加/移除</li>
            <li>定时器设置/清除</li>
            <li>第三方库初始化</li>
            <li>非必要的DOM操作</li>
          </ul>
        </div>
      </div>

      <div class="code-section">
        <h3>useEffect使用示例</h3>
        <div class="code-snippet">
          <pre><code>import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // 数据获取 - 典型useEffect用例
  useEffect(() => {
    // 创建取消标志
    const abortController = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal
        });
        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };

    fetchUser();

    // 清理函数：取消请求和清理操作
    return () => {
      abortController.abort();
      console.log('取消未完成的请求');
    };
  }, [userId]); // 依赖数组：userId变化时重新执行

  // 窗口尺寸监听
  useEffect(() => {
    const handleResize = () => {
      console.log('窗口尺寸变化:', window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组：只在挂载/卸载时执行

  if (error) return &lt;div>错误: {error}&lt;/div>;
  if (!user) return &lt;div>加载中...&lt;/div>;

  return (
    &lt;div>
      &lt;h2>{user.name}&lt;/h2>
      &lt;p>{user.bio}&lt;/p>
    &lt;/div>
  );
}</code></pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">📐</span>
        useLayoutEffect基础介绍
      </h2>

      <div class="card-grid">
        <div class="info-card">
          <h3>核心作用</h3>
          <ul>
            <li>执行需要<span class="highlight">同步</span>完成的DOM操作</li>
            <li>在浏览器<span class="highlight">绘制前</span>执行，避免视觉闪烁</li>
            <li>用于测量DOM元素或应用同步布局变化</li>
            <li>行为类似类组件的<span class="highlight">componentDidMount</span>和<span
                class="highlight">componentDidUpdate</span></li>
          </ul>
        </div>

        <div class="info-card">
          <h3>使用场景</h3>
          <ul>
            <li>DOM元素尺寸测量</li>
            <li>同步更新DOM布局</li>
            <li>防止内容闪烁的样式调整</li>
            <li>基于DOM的动画初始化</li>
            <li>第三方DOM库集成</li>
          </ul>
        </div>
      </div>

      <div class="code-section">
        <h3>useLayoutEffect使用示例</h3>
        <div class="code-snippet">
          <pre><code>import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip({ content, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  // 使用useLayoutEffect同步计算位置
  useLayoutEffect(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    // 获取触发元素位置
    const triggerRect = triggerRef.current.getBoundingClientRect();
    // 获取工具提示尺寸
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // 计算位置 - 居中显示在触发元素上方
    const top = triggerRect.top - tooltipRect.height - 10;
    const left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;

    // 检查是否超出视口边界
    const adjustedTop = Math.max(top, 10);
    const adjustedLeft = Math.max(Math.min(left, window.innerWidth - tooltipRect.width - 10), 10);

    setPosition({ top: adjustedTop, left: adjustedLeft });
  }, [content]); // 依赖内容变化时重新计算

  return (
    &lt;div className="tooltip-container">
      &lt;span
        ref={triggerRef}
        className="tooltip-trigger"
      >
        {children}
      &lt;/span>

      {content && (
        &lt;div
          ref={tooltipRef}
          className="tooltip-content"
          style=&#123;&#123;
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            opacity: position.top ? 1 : 0 // 防止未定位时闪烁
            &#125;&#125;
        >
          {content}
        &lt;/div>
      )}
    &lt;/div>
  );
}</code></pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">⚖️</span>
        深度对比与使用决策
      </h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>useEffect</th>
              <th>useLayoutEffect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>执行时机</td>
              <td>在浏览器<span class="highlight">绘制后</span>异步执行</td>
              <td>在DOM更新后，浏览器<span class="highlight">绘制前</span>同步执行</td>
            </tr>
            <tr>
              <td>阻塞渲染</td>
              <td>❌ 不阻塞</td>
              <td>✅ 可能阻塞</td>
            </tr>
            <tr>
              <td>视觉影响</td>
              <td>可能导致<span class="highlight">布局闪烁</span></td>
              <td>防止<span class="highlight">视觉不一致</span></td>
            </tr>
            <tr>
              <td>使用频率</td>
              <td>⭐️⭐️⭐️⭐️⭐️ (常用)</td>
              <td>⭐️⭐️⭐️ (特殊场景)</td>
            </tr>
            <tr>
              <td>典型用例</td>
              <td>数据获取、事件监听、API调用</td>
              <td>DOM测量、布局计算、防闪烁</td>
            </tr>
            <tr>
              <td>性能影响</td>
              <td>低 - 不影响渲染性能</td>
              <td>中 - 可能延迟渲染</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="decision-tree">
        <h3>使用决策流程图</h3>
        <div class="tree-container">
          <div class="tree-node start">
            <div class="node-label">需要执行副作用吗？</div>
          </div>

          <div class="tree-arrow">↓</div>

          <div class="tree-node">
            <div class="node-label">是否涉及DOM测量或布局？</div>
            <div class="branch">
              <div class="branch-yes">是 → useLayoutEffect</div>
              <div class="branch-no">否 → useEffect</div>
            </div>
          </div>

          <div class="tree-arrow">↓</div>

          <div class="tree-node">
            <div class="node-label">是否需要防止视觉闪烁？</div>
            <div class="branch">
              <div class="branch-yes">是 → useLayoutEffect</div>
              <div class="branch-no">否 → useEffect</div>
            </div>
          </div>

          <div class="tree-arrow">↓</div>

          <div class="tree-node end">
            <div class="node-label">默认选择useEffect</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">💡</span>
        最佳实践与常见问题
      </h2>

      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">✅</div>
          <h3>最佳实践</h3>
          <ul>
            <li><strong>默认使用useEffect：</strong>除非有特殊需求</li>
            <li><strong>清理资源：</strong>两种hook都需要返回清理函数</li>
            <li><strong>依赖数组：</strong>精确声明依赖项避免无限循环</li>
            <li><strong>性能优化：</strong>避免在useLayoutEffect中执行耗时操作</li>
          </ul>
        </div>

        <div class="tip-card">
          <div class="tip-icon">⚠️</div>
          <h3>常见错误</h3>
          <ul>
            <li><strong>滥用useLayoutEffect：</strong>导致渲染阻塞</li>
            <li><strong>遗漏清理函数：</strong>造成内存泄漏</li>
            <li><strong>依赖数组错误：</strong>导致过期闭包问题</li>
            <li><strong>服务端渲染：</strong>useLayoutEffect在SSR中会警告</li>
          </ul>
        </div>

        <div class="tip-card">
          <div class="tip-icon">🚀</div>
          <h3>性能优化</h3>
          <ul>
            <li><strong>条件执行：</strong>只在必要时执行副作用</li>
            <li><strong>延迟计算：</strong>使用useMemo减少不必要计算</li>
            <li><strong>节流防抖：</strong>高频事件优化</li>
            <li><strong>代码分割：</strong>动态加载副作用重的模块</li>
          </ul>
        </div>
      </div>

      <div class="advanced-section">
        <h3>高级模式：结合使用两种钩子</h3>
        <div class="code-snippet">
          <pre><code>function ComplexComponent() {
  const [measurements, setMeasurements] = useState(null);
  const elementRef = useRef(null);

  // 使用useLayoutEffect进行DOM测量
  useLayoutEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setMeasurements({
        width: rect.width,
        height: rect.height
      });
    }
  }, []);

  // 使用useEffect进行数据获取
  useEffect(() => {
    if (!measurements) return;

    // 基于测量结果获取数据
    const fetchData = async () => {
      const response = await fetch(`/api/data?width=${measurements.width}`);
      // 处理响应...
    };

    fetchData();
  }, [measurements]); // 依赖测量结果

  return (
    &lt;div ref={elementRef}>
      {/* 组件内容 */}
    &lt;/div>
  );
}</code></pre>
        </div>
      </div>
    </div>

    <footer class="conclusion">
      <h2>核心要点总结</h2>
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-header effect">useEffect</div>
          <ul>
            <li>用于<span class="highlight">大多数副作用</span></li>
            <li><span class="highlight">异步</span>执行不阻塞渲染</li>
            <li>适合<span class="highlight">数据获取</span>和<span class="highlight">事件处理</span></li>
            <li>默认选择</li>
          </ul>
        </div>

        <div class="summary-card">
          <div class="card-header layout">useLayoutEffect</div>
          <ul>
            <li>用于<span class="highlight">DOM相关操作</span></li>
            <li><span class="highlight">同步</span>执行可能阻塞渲染</li>
            <li>防止<span class="highlight">布局闪烁</span></li>
            <li>特殊场景使用</li>
          </ul>
        </div>
      </div>

      <div class="final-tip">
        <p>记住：<span class="highlight">"默认使用useEffect，仅在需要同步DOM操作时使用useLayoutEffect"</span></p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里不需要实际逻辑，仅用于演示
import { ref } from 'vue';

const activeTab = ref('overview');
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #61dafb;
@secondary-color: #20232a;
@text-primary: #2c3e50;
@text-secondary: #5c677d;
@border-color: #e1e4e8;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@effect-color: #cc7b94;
@layout-effect-color: #3498db;
@warning-color: #ff9800;

.hooks-container {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.header {
  text-align: center;
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 35px 30px;
  margin-bottom: 35px;
  border: 1px solid fade(@primary-color, 15%);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    color: @secondary-color;
  }

  .subtitle {
    font-size: 1.3rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.7rem;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid fade(@primary-color, 10%);
    display: flex;
    align-items: center;
    gap: 12px;

    .icon {
      font-size: 1.5rem;
    }
  }
}

.comparison-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin: 30px 0;

  .hook-card {
    flex: 1;
    min-width: 300px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .hook-header {
      padding: 20px;
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
    }

    .hook-body {
      padding: 25px;
      background: white;

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 15px;
          position: relative;
          padding-left: 25px;

          &::before {
            content: "•";
            position: absolute;
            left: 0;
            color: @primary-color;
            font-weight: bold;
          }
        }
      }
    }

    &.effect {
      .hook-header {
        background: @effect-color;
        color: white;
      }

      .highlight {
        color: darken(@effect-color, 15%);
        font-weight: 600;
      }
    }

    &.layout {
      .hook-header {
        background: @layout-effect-color;
        color: white;
      }

      .highlight {
        color: darken(@layout-effect-color, 15%);
        font-weight: 600;
      }
    }
  }

  .vs-divider {
    font-size: 1.8rem;
    font-weight: 700;
    color: @text-secondary;
    padding: 0 15px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
}

.execution-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 40px 0;

  .phase {
    background: white;
    border-radius: 8px;
    padding: 15px;
    min-width: 140px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-top: 4px solid @primary-color;

    .phase-label {
      font-weight: 600;
      margin-bottom: 10px;
      color: @secondary-color;
    }

    .phase-box {
      font-size: 0.9rem;
      color: @text-secondary;
    }
  }

  .layout-phase {
    border-top-color: @layout-effect-color;
    background: fade(@layout-effect-color, 8%);
  }

  .effect-phase {
    border-top-color: @effect-color;
    background: fade(@effect-color, 8%);
  }

  .arrow {
    font-size: 1.5rem;
    color: @text-secondary;
    opacity: 0.7;
  }
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.info-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;

  h3 {
    margin-top: 0;
    color: @secondary-color;
    font-size: 1.3rem;
    border-bottom: 1px solid fade(@border-color, 50%);
    padding-bottom: 10px;
    margin-bottom: 15px;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 20px;

      &::before {
        content: "•";
        position: absolute;
        left: 0;
        color: @primary-color;
        font-weight: bold;
      }

      .highlight {
        color: darken(@primary-color, 20%);
        font-weight: 600;
      }
    }
  }
}

.code-section {
  margin-top: 30px;

  h3 {
    font-size: 1.3rem;
    color: @secondary-color;
    margin-bottom: 15px;
  }
}

.code-snippet {
  background: #282c34;
  color: #abb2bf;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow-x: auto;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

  code {
    display: block;
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 30px 0;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background-color: fade(@primary-color, 8%);
      color: @secondary-color;
      font-weight: 600;
    }

    tr {
      &:hover {
        background-color: fade(@primary-color, 3%);
      }
    }

    .highlight {
      color: darken(@primary-color, 20%);
      font-weight: 600;
    }
  }
}

.decision-tree {
  margin: 40px 0;

  .tree-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tree-node {
    background: white;
    border-radius: 12px;
    padding: 20px;
    min-width: 300px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    border: 2px solid fade(@primary-color, 20%);
    position: relative;

    .node-label {
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 10px;
    }

    .branch {
      display: flex;
      justify-content: space-around;
      margin-top: 15px;

      &-yes,
      &-no {
        padding: 8px 15px;
        border-radius: 30px;
        font-weight: 500;
      }

      &-yes {
        background: fade(@layout-effect-color, 15%);
        color: darken(@layout-effect-color, 25%);
      }

      &-no {
        background: fade(@effect-color, 15%);
        color: darken(@effect-color, 25%);
      }
    }

    &.start {
      border-top: 4px solid @primary-color;
    }

    &.end {
      border-top: 4px solid #42b983;
    }
  }

  .tree-arrow {
    font-size: 1.5rem;
    color: @text-secondary;
    margin: 5px 0;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.tip-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;

  .tip-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    text-align: center;
  }

  h3 {
    margin-top: 0;
    color: @secondary-color;
    font-size: 1.3rem;
    text-align: center;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: "•";
        position: absolute;
        left: 10px;
        color: @primary-color;
        font-weight: bold;
      }

      strong {
        color: @secondary-color;
      }
    }
  }
}

.advanced-section {
  margin-top: 40px;

  h3 {
    font-size: 1.3rem;
    color: @secondary-color;
    margin-bottom: 15px;
    text-align: center;
  }
}

.conclusion {
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 35px;
  border: 1px solid fade(@primary-color, 15%);
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 25px;
    color: @secondary-color;
  }
}

.summary-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin: 30px 0;

  .summary-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    min-width: 280px;
    max-width: 350px;

    .card-header {
      padding: 20px;
      font-size: 1.4rem;
      font-weight: 700;
      text-align: center;
      color: white;

      &.effect {
        background: @effect-color;
      }

      &.layout {
        background: @layout-effect-color;
      }
    }

    ul {
      padding: 20px;
      margin: 0;
      text-align: left;

      li {
        margin-bottom: 15px;
        position: relative;
        padding-left: 25px;

        &::before {
          content: "•";
          position: absolute;
          left: 10px;
          color: @primary-color;
          font-weight: bold;
        }

        .highlight {
          font-weight: 600;
        }
      }
    }
  }
}

.final-tip {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;

  p {
    font-size: 1.2rem;
    margin: 10px 0;

    .highlight {
      background: rgba(255, 255, 255, 0.9);
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 600;
      color: darken(@primary-color, 25%);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 25px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section {
    padding: 20px 15px;

    .section-title {
      font-size: 1.5rem;
    }
  }

  .comparison-card {
    gap: 25px;

    .vs-divider {
      margin: 10px 0;
    }
  }

  .execution-flow {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 15px 0;
    }
  }

  .decision-tree {
    .tree-arrow {
      transform: rotate(90deg);
    }
  }
}
</style>
