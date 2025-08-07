<template>
  <div class="async-component-guide">
    <header class="guide-header">
      <h1>Vue异步组件基本指南</h1>
      <p>优化应用性能与用户体验的关键技术</p>
      <div class="header-animation">
        <div class="component-placeholder">
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
        <div class="arrow">➔</div>
        <div class="loaded-component">
          <div class="component-content">组件内容</div>
        </div>
      </div>
    </header>

    <main class="guide-content">
      <section class="section">
        <h2 class="section-title">什么是异步组件？</h2>
        <div class="section-content">
          <div class="definition">
            <p>异步组件是Vue提供的一种优化技术，允许你将组件拆分成独立的代码块，<strong>仅在需要时加载</strong>。这可以显著减少应用的初始加载时间，提升用户体验。</p>

            <div class="comparison">
              <div class="comparison-card">
                <h3>同步组件</h3>
                <ul>
                  <li>立即加载所有组件</li>
                  <li>初始包体积较大</li>
                  <li>加载时间较长</li>
                  <li>适用于小型应用</li>
                </ul>
              </div>
              <div class="comparison-card">
                <h3>异步组件</h3>
                <ul>
                  <li>按需加载组件</li>
                  <li>初始包体积更小</li>
                  <li>加载时间更短</li>
                  <li>适用于中大型应用</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">核心作用与优势</h2>
        <div class="section-content">
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">⚡</div>
              <h3>减少初始加载时间</h3>
              <p>只加载当前路由所需的组件</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">📦</div>
              <h3>优化资源利用率</h3>
              <p>避免加载用户可能永远不会访问的组件</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🚀</div>
              <h3>提升用户体验</h3>
              <p>更快的首屏加载，更流畅的交互</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🧩</div>
              <h3>代码分割</h3>
              <p>配合Webpack实现自动代码分割</p>
            </div>
          </div>

          <div class="performance-chart">
            <div class="chart">
              <div class="chart-bar sync" style="height: 90%">
                <span>同步加载: 1200KB</span>
              </div>
              <div class="chart-bar async" style="height: 30%">
                <span>异步加载: 400KB</span>
              </div>
            </div>
            <div class="chart-labels">
              <div>初始包大小对比</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">基本使用方法</h2>
        <div class="section-content">
          <div class="usage-steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3>使用defineAsyncComponent</h3>
              <div class="code-block">
                <pre>import { defineAsyncComponent } from 'vue';

// 基本异步组件定义
const AsyncComponent = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
);</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <h3>在组件中使用</h3>
              <div class="code-block">
                <pre>&lt;template&gt;
  &lt;div&gt;
    &lt;!-- 像普通组件一样使用 --&gt;
    &lt;AsyncComponent /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() =&gt;
  import('./components/MyComponent.vue')
);
&lt;/script&gt;</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <h3>路由懒加载</h3>
              <div class="code-block">
                <pre>// router.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue') // 路由级懒加载
  },
  {
    path: '/user/:id',
    component: () => import('./views/UserProfile.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">高级用法：加载与错误状态</h2>
        <div class="section-content">
          <div class="advanced-usage">
            <div class="code-sample">
              <div class="code-block">
                <pre>const AsyncComponentWithStates = defineAsyncComponent({
  // 加载函数
  loader: () => import('./components/ComplexComponent.vue'),

  // 加载中显示的组件
  loadingComponent: LoadingSpinner,

  // 加载失败时显示的组件
  errorComponent: ErrorDisplay,

  // 加载超时时间（毫秒）
  timeout: 3000,

  // 延迟显示加载状态（毫秒）
  delay: 200,

  // 错误处理函数
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 重试获取
      retry();
    } else {
      // 处理失败
      fail();
    }
  }
});</pre>
              </div>
            </div>

            <div class="state-demo">
              <div class="state-controls">
                <button @click="loadState = 'loading'" :class="{ active: loadState === 'loading' }">加载中</button>
                <button @click="loadState = 'error'" :class="{ active: loadState === 'error' }">加载错误</button>
                <button @click="loadState = 'loaded'" :class="{ active: loadState === 'loaded' }">加载完成</button>
              </div>

              <div class="state-display">
                <div v-if="loadState === 'loading'" class="loading-state">
                  <div class="spinner"></div>
                  <p>正在加载组件...</p>
                </div>

                <div v-else-if="loadState === 'error'" class="error-state">
                  <div class="error-icon">⚠️</div>
                  <p>组件加载失败</p>
                  <button @click="retryLoad">重试</button>
                </div>

                <div v-else class="loaded-state">
                  <div class="component-preview">
                    <div class="component-header">用户仪表盘</div>
                    <div class="component-content">
                      <div class="chart">📊 数据图表</div>
                      <div class="stats">📈 统计信息</div>
                    </div>
                  </div>
                  <p>组件加载成功!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">底层实现原理</h2>
        <div class="section-content">
          <div class="implementation">
            <div class="workflow-diagram">
              <div class="step">
                <div class="step-number">1</div>
                <h4>组件注册</h4>
                <p>Vue识别异步组件定义</p>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <h4>占位渲染</h4>
                <p>渲染占位内容或加载状态</p>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">3</div>
                <h4>代码加载</h4>
                <p>Webpack/Vite加载组件代码</p>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">4</div>
                <h4>组件解析</h4>
                <p>Vue解析并渲染实际组件</p>
              </div>
            </div>

            <div class="code-explanation">
              <h3>核心机制解析</h3>
              <div class="code-block">
                <pre>// Vue内部的简化实现逻辑
function defineAsyncComponent(source) {
  let resolvedComp;

  return {
    async setup() {
      // 第一次渲染时开始加载
      if (!resolvedComp) {
        try {
          // 执行加载器函数
          resolvedComp = await source.loader();
        } catch (err) {
          // 错误处理
          handleError(err);
          return () => h(source.errorComponent);
        }
      }

      // 返回实际组件
      return resolvedComp;
    }
  }
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">最佳使用场景</h2>
        <div class="section-content">
          <div class="scenarios-grid">
            <div class="scenario-card">
              <div class="scenario-icon">🌐</div>
              <h3>路由级组件</h3>
              <p>根据路由按需加载页面组件</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">📊</div>
              <h3>大型数据组件</h3>
              <p>复杂图表、数据可视化组件</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🎮</div>
              <h3>交互式功能</h3>
              <p>富文本编辑器、复杂表单等</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🔒</div>
              <h3>权限控制组件</h3>
              <p>仅特定用户可见的功能组件</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🔄</div>
              <h3>低优先级内容</h3>
              <p>页面底部组件、推荐内容等</p>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">📱</div>
              <h3>移动端优化</h3>
              <p>减少移动设备初始加载量</p>
            </div>
          </div>

          <div class="case-study">
            <h3>实际应用案例</h3>
            <div class="case">
              <h4>电商网站产品详情页</h4>
              <p><strong>问题:</strong> 产品详情页包含大量组件（画廊、规格选择、推荐等），导致加载缓慢</p>
              <p><strong>解决方案:</strong> 使用异步组件拆分：</p>
              <ul>
                <li>优先加载核心产品信息</li>
                <li>延迟加载画廊和评论组件</li>
                <li>用户滚动时加载推荐产品</li>
              </ul>
              <p><strong>结果:</strong> 首屏加载时间减少62%，跳出率降低27%</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">性能优化技巧</h2>
        <div class="section-content">
          <div class="optimization-tips">
            <div class="tip">
              <div class="tip-icon">💡</div>
              <p><strong>预加载策略</strong> - 使用<code>webpackPrefetch</code>在空闲时加载可能需要的组件</p>
              <div class="code-block small">
                <pre>// 添加预加载提示
const Component = defineAsyncComponent(() =&gt;
  import(/* webpackPrefetch: true */ './Component.vue')
);</pre>
              </div>
            </div>

            <div class="tip">
              <div class="tip-icon">💡</div>
              <p><strong>分组加载</strong> - 将相关组件组合到同一个异步块中</p>
              <div class="code-block small">
                <pre>// 使用相同注释分组
const ComponentA = defineAsyncComponent(() =&gt;
  import(/* webpackChunkName: "group-1" */ './ComponentA.vue')
);

const ComponentB = defineAsyncComponent(() =&gt;
  import(/* webpackChunkName: "group-1" */ './ComponentB.vue')
);</pre>
              </div>
            </div>

            <div class="tip">
              <div class="tip-icon">💡</div>
              <p><strong>条件加载</strong> - 基于用户交互或条件加载组件</p>
              <div class="code-block small">
                <pre>import { ref } from 'vue';

const showAdvanced = ref(false);
const AdvancedComponent = ref(null);

function loadAdvanced() {
  import('./AdvancedComponent.vue').then(module =&gt; {
    AdvancedComponent.value = module.default;
    showAdvanced.value = true;
  });
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="guide-footer">
      <div class="footer-content">
        <div class="footer-logo">Vue异步组件指南</div>
        <div class="footer-links">
          <a href="#" class="footer-link">官方文档</a>
          <a href="#" class="footer-link">性能优化</a>
          <a href="#" class="footer-link">示例项目</a>
        </div>
        <div class="footer-copyright">
          © 2023 Vue异步组件基本指南 | 基于Vue 3 Composition API
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 加载状态管理
const loadState = ref('loading');

// 模拟重试加载
const retryLoad = () => {
  loadState.value = 'loading';
  setTimeout(() => {
    loadState.value = 'loaded';
  }, 1500);
};

// 初始加载
setTimeout(() => {
  loadState.value = 'loaded';
}, 2000);
</script>

<style lang="less" scoped>


:root {
  --primary-color: #4361ee;
  --primary-light: #eef2ff;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --success-color: #4ade80;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --light-color: #f8fafc;
  --dark-color: #1e293b;
  --text-color: #334155;
  --border-color: #e2e8f0;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

.async-component-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--light-color);
  color: var(--text-color);
  line-height: 1.6;
  min-height: 100vh;
  padding: 0 0 40px;
}

.guide-header {
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(135deg, #4f6df5 0%, #3a56e6 100%);
  color: white;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 15px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 1.3rem;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
  }
}

.header-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 40px;

  .component-placeholder, .loaded-component {
    width: 200px;
    height: 150px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .arrow {
    font-size: 40px;
    color: rgba(255, 255, 255, 0.7);
  }
}

.loading-bar {
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: loading 1.5s infinite;
  }

  &:nth-child(1) { width: 90%; }
  &:nth-child(2) { width: 70%; }
  &:nth-child(3) { width: 80%; }
}

@keyframes loading {
  100% {
    left: 100%;
  }
}

.loaded-component {
  .component-content {
    background: rgba(255, 255, 255, 0.3);
    padding: 15px;
    border-radius: 8px;
    font-weight: 600;
  }
}

.guide-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 16px;
  margin-bottom: 30px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
}

.section-title {
  background: linear-gradient(90deg, #4f6df5, #3a56e6);
  padding: 18px 30px;
  margin: 0;
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
}

.section-content {
  padding: 30px;
}

.definition {
  p {
    font-size: 1.1rem;
    margin-bottom: 25px;
    line-height: 1.8;
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 30px;

  .comparison-card {
    background: var(--primary-light);
    border-radius: 12px;
    padding: 25px;
    border-left: 4px solid var(--primary-color);

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: var(--secondary-color);
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 25px;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--primary-color);
          font-weight: bold;
        }
      }
    }
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.benefit-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
  }

  .benefit-icon {
    font-size: 40px;
    margin-bottom: 15px;
  }

  h3 {
    margin: 0 0 15px;
    color: var(--secondary-color);
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.95rem;
  }
}

.performance-chart {
  max-width: 500px;
  margin: 40px auto 0;

  .chart {
    display: flex;
    height: 200px;
    align-items: flex-end;
    gap: 40px;
    justify-content: center;
    padding: 0 20px;

    .chart-bar {
      width: 60px;
      border-radius: 8px 8px 0 0;
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 10px;
      font-weight: 500;
      color: white;

      span {
        position: absolute;
        bottom: -30px;
        white-space: nowrap;
      }

      &.sync {
        background: linear-gradient(to top, #ef4444, #f87171);
      }

      &.async {
        background: linear-gradient(to top, #4ade80, #86efac);
      }
    }
  }

  .chart-labels {
    text-align: center;
    margin-top: 40px;
    font-weight: 500;
  }
}

.usage-steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 35px;
}

.step {
  position: relative;
  padding-left: 50px;

  .step-number {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  h3 {
    margin: 0 0 15px;
    font-size: 1.3rem;
    color: var(--secondary-color);
  }
}

.code-block {
  background: #1e293b;
  color: #cbd5e1;
  border-radius: 12px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  &.small {
    font-size: 0.85rem;
    padding: 15px;
  }
}

.advanced-usage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.state-demo {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: var(--card-shadow);
  border-top: 4px solid var(--accent-color);
}

.state-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  button {
    flex: 1;
    padding: 10px;
    background: var(--primary-light);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;

    &:hover, &.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
  }
}

.state-display {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;

  .loading-state, .error-state, .loaded-state {
    text-align: center;
  }
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--primary-light);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state {
  .error-icon {
    font-size: 40px;
    margin-bottom: 15px;
  }

  button {
    margin-top: 15px;
    padding: 8px 20px;
    background: var(--error-color);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
  }
}

.loaded-state {
  .component-preview {
    width: 200px;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;

    .component-header {
      background: var(--primary-color);
      color: white;
      padding: 10px;
      text-align: center;
      font-weight: 500;
    }

    .component-content {
      padding: 15px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;

      .chart, .stats {
        background: var(--primary-light);
        padding: 15px;
        border-radius: 8px;
        text-align: center;
      }
    }
  }
}

.implementation {
  .workflow-diagram {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 40px;

    .step {
      flex: 1;
      min-width: 150px;
      text-align: center;
      padding: 20px;
      position: relative;

      .step-number {
        position: relative;
        margin: 0 auto 15px;
      }

      h4 {
        margin: 0 0 10px;
        color: var(--secondary-color);
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--text-color);
      }
    }

    .arrow {
      font-size: 24px;
      color: var(--primary-color);
      padding: 0 10px;
    }
  }
}

.code-explanation {
  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--secondary-color);
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
  }

  .scenario-icon {
    font-size: 40px;
    margin-bottom: 15px;
  }

  h3 {
    margin: 0 0 10px;
    color: var(--secondary-color);
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.95rem;
  }
}

.case-study {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid var(--primary-color);

  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 20px;
  }

  .case {
    h4 {
      margin-top: 0;
      color: var(--secondary-color);
    }

    p {
      margin-bottom: 15px;
    }

    ul {
      padding-left: 20px;
      margin-bottom: 15px;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

.optimization-tips {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.tip {
  display: flex;
  gap: 15px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-color);
  align-items: flex-start;

  .tip-icon {
    font-size: 28px;
    flex-shrink: 0;
    margin-top: 5px;
  }

  p {
    margin: 0 0 15px;

    strong {
      color: var(--secondary-color);
    }
  }
}

.guide-footer {
  margin-top: 60px;
  padding: 40px 20px 20px;
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 15px;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 20px;

    .footer-link {
      color: var(--primary-color);
      text-decoration: none;
      transition: var(--transition);

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .guide-header {
    padding: 40px 15px;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .comparison {
    grid-template-columns: 1fr;
  }

  .header-animation {
    flex-direction: column;
    gap: 20px;

    .arrow {
      transform: rotate(90deg);
    }
  }
}
</style>
