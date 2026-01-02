<template>
  <div class="ssr-hydration-container">
    <div class="header">
      <h1>SSR 中的脱水与注水机制</h1>
      <p class="subtitle">理解服务器端渲染的核心数据传递技术</p>
      <div class="badges">
        <span class="vue">Vue.js</span>
        <span class="react">React</span>
        <span class="nuxt">Nuxt.js</span>
        <span class="next">Next.js</span>
      </div>
    </div>

    <div class="overview-cards">
      <div class="overview-card dehydration">
        <div class="icon">💧</div>
        <h2>脱水 (Dehydration)</h2>
        <p>将应用状态从服务器序列化到客户端的过程</p>
      </div>

      <div class="process-arrow">➡️</div>

      <div class="overview-card hydration">
        <div class="icon">💦</div>
        <h2>注水 (Hydration)</h2>
        <p>在客户端重建应用状态并附加事件处理的过程</p>
      </div>
    </div>

    <div class="content-section">
      <div class="tabs">
        <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content">
        <!-- 概念解释 -->
        <div v-if="activeTab === 'concept'" class="concept-section">
          <div class="definition-cards">
            <div class="definition-card">
              <h3>脱水 (Dehydration)</h3>
              <p>在服务器端渲染过程中，将 Vue 组件的状态（数据、状态、上下文等）序列化为字符串，并嵌入到 HTML 响应中的过程。</p>
              <div class="analogy">
                <div class="analogy-icon">📦</div>
                <p>就像将水（应用状态）从容器（服务器）中倒出并封装（序列化）以便运输</p>
              </div>
            </div>

            <div class="definition-card">
              <h3>注水 (Hydration)</h3>
              <p>在客户端接收到 HTML 后，解析脱水数据，重建 Vue 应用状态，并将事件处理程序附加到已有 DOM 的过程。</p>
              <div class="analogy">
                <div class="analogy-icon">🚰</div>
                <p>就像将封装的水（序列化状态）倒入容器（客户端应用）中恢复其原始形态</p>
              </div>
            </div>
          </div>

          <div class="comparison">
            <h3>脱水与注水对比</h3>
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>脱水 (Dehydration)</th>
                  <th>注水 (Hydration)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>发生位置</td>
                  <td>服务器端</td>
                  <td>客户端</td>
                </tr>
                <tr>
                  <td>主要目的</td>
                  <td>序列化应用状态</td>
                  <td>重建应用状态</td>
                </tr>
                <tr>
                  <td>关键输出</td>
                  <td>嵌入 HTML 的 JSON 数据</td>
                  <td>可交互的 Vue 应用</td>
                </tr>
                <tr>
                  <td>性能影响</td>
                  <td>增加服务器响应时间</td>
                  <td>增加客户端初始化时间</td>
                </tr>
                <tr>
                  <td>数据大小</td>
                  <td>应尽量最小化</td>
                  <td>解析后占用内存</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 工作流程 -->
        <div v-if="activeTab === 'workflow'" class="workflow-section">
          <div class="workflow-diagram">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>服务器请求处理</h3>
                <p>服务器接收请求，创建 Vue 应用实例</p>
              </div>
            </div>

            <div class="connector">↓</div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>数据获取与渲染</h3>
                <p>获取所需数据，渲染组件为 HTML 字符串</p>
              </div>
            </div>

            <div class="connector">↓</div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>脱水 (Dehydration)</h3>
                <p>序列化应用状态到 window.__INITIAL_STATE__</p>
              </div>
            </div>

            <div class="connector">↓</div>

            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>发送 HTML 响应</h3>
                <p>包含渲染结果和序列化状态的 HTML 发送到客户端</p>
              </div>
            </div>

            <div class="connector">↓</div>

            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>客户端接收</h3>
                <p>浏览器解析 HTML 并显示静态内容</p>
              </div>
            </div>

            <div class="connector">↓</div>

            <div class="step">
              <div class="step-number">6</div>
              <div class="step-content">
                <h3>注水 (Hydration)</h3>
                <p>Vue 解析状态，重建应用，附加事件处理</p>
              </div>
            </div>

            <div class="connector">↓</div>

            <div class="step">
              <div class="step-number">7</div>
              <div class="step-content">
                <h3>应用交互就绪</h3>
                <p>应用完全可交互，SPA 体验开始</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 使用场景 -->
        <div v-if="activeTab === 'scenarios'" class="scenarios-section">
          <div class="scenario-cards">
            <div class="scenario-card">
              <div class="scenario-icon">🔍</div>
              <h3>SEO 优化</h3>
              <p>搜索引擎可以抓取完整渲染的 HTML 内容</p>
              <div class="benefits">
                <span>提升搜索排名</span>
                <span>内容可索引</span>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">⚡</div>
              <h3>首屏性能</h3>
              <p>用户立即看到内容，无需等待 JS 加载执行</p>
              <div class="benefits">
                <span>降低 LCP 时间</span>
                <span>提升用户体验</span>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📱</div>
              <h3>低端设备支持</h3>
              <p>在性能较差的设备上也能快速显示内容</p>
              <div class="benefits">
                <span>更广的兼容性</span>
                <span>更好的可访问性</span>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🔄</div>
              <h3>动态内容缓存</h3>
              <p>结合 CDN 缓存已渲染页面，减少服务器负载</p>
              <div class="benefits">
                <span>提高扩展性</span>
                <span>降低服务器成本</span>
              </div>
            </div>
          </div>

          <div class="when-to-use">
            <h3>何时使用脱水与注水</h3>
            <div class="use-cases">
              <div class="case">
                <div class="case-icon">✅</div>
                <div>
                  <h4>适合使用</h4>
                  <ul>
                    <li>内容为主的网站（博客、新闻、电商）</li>
                    <li>需要 SEO 优化的公开页面</li>
                    <li>首屏加载速度关键的应用</li>
                    <li>社交媒体分享内容预览</li>
                  </ul>
                </div>
              </div>

              <div class="case">
                <div class="case-icon">⚠️</div>
                <div>
                  <h4>谨慎使用</h4>
                  <ul>
                    <li>高度交互的管理后台</li>
                    <li>实时数据仪表盘</li>
                    <li>对 TTI 要求极高的应用</li>
                    <li>服务器资源有限的情况</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 实现示例 -->
        <div v-if="activeTab === 'implementation'" class="implementation-section">
          <div class="code-samples">
            <div class="code-sample">
              <h3>服务器端 - 脱水过程</h3>
              <pre><code>// 创建 Vue 应用实例
const app = createSSRApp(App)

// 获取路由和 store
const router = createRouter()
const store = createStore()

// 设置路由
app.use(router)
app.use(store)

// 等待路由就绪
await router.isReady()

// 渲染组件为 HTML
const html = await renderToString(app)

// 序列化状态（脱水）
const initialState = dehydrateStore(store)

// 将状态注入 HTML
const finalHtml = `
  &lt;!DOCTYPE html&gt;
  &lt;html&gt;
    &lt;head&gt;&lt;!-- 元数据 --&gt;&lt;/head&gt;
    &lt;body&gt;
      &lt;div id="app"&gt;${html}&lt;/div&gt;
      &lt;script&gt;
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      &lt;/script&gt;
    &lt;/body&gt;
  &lt;/html&gt;
`

// 发送响应
res.send(finalHtml)</code></pre>
            </div>

            <div class="code-sample">
              <h3>客户端 - 注水过程</h3>
              <pre><code>// 创建 Vue 应用实例
const app = createSSRApp(App)

// 创建路由和 store
const router = createRouter()
const store = createStore()

// 从 window 获取脱水状态
if (window.__INITIAL_STATE__) {
  // 还原 store 状态（注水）
  store.hydrate(window.__INITIAL_STATE__)
}

// 挂载应用
app.use(router)
app.use(store)

// 注水：将静态 HTML 转换为交互式应用
router.isReady().then(() => {
  app.mount('#app', true) // true 表示启用注水模式
})

// 清理全局状态
delete window.__INITIAL_STATE__</code></pre>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <div class="practices">
              <div class="practice">
                <div class="icon">📦</div>
                <div>
                  <h4>最小化脱水数据</h4>
                  <p>只序列化必要数据，避免传输冗余状态</p>
                </div>
              </div>

              <div class="practice">
                <div class="icon">🔒</div>
                <div>
                  <h4>安全考虑</h4>
                  <p>避免序列化敏感数据，使用 XSS 防护</p>
                </div>
              </div>

              <div class="practice">
                <div class="icon">⚖️</div>
                <div>
                  <h4>状态一致性</h4>
                  <p>确保服务器和客户端初始状态匹配</p>
                </div>
              </div>

              <div class="practice">
                <div class="icon">🚫</div>
                <div>
                  <h4>避免副作用</h4>
                  <p>注水过程中不应触发额外数据获取</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="conclusion-section">
      <h2>脱水与注水的重要性</h2>
      <div class="importance">
        <div class="point">
          <div class="point-icon">🚀</div>
          <h3>性能优化</h3>
          <p>平衡服务器渲染和客户端交互的最佳方案</p>
        </div>

        <div class="point">
          <div class="point-icon">🔗</div>
          <h3>状态一致性</h3>
          <p>确保服务器和客户端渲染结果完全一致</p>
        </div>

        <div class="point">
          <div class="point-icon">🔄</div>
          <h3>无缝过渡</h3>
          <p>实现从静态内容到交互应用的平滑转换</p>
        </div>
      </div>

      <div class="final-tip">
        <p>脱水与注水是 SSR 架构中的关键技术，正确实现可以显著提升应用性能、SEO 和用户体验。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = [
  { id: 'concept', label: '概念解释' },
  { id: 'workflow', label: '工作流程' },
  { id: 'scenarios', label: '使用场景' },
  { id: 'implementation', label: '实现示例' }
];

const activeTab = ref('concept');
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@dehydration-color: #4cc9f0;
@hydration-color: #2ec4b6;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.ssr-hydration-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-light;
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }

  .badges {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;

      &.vue {
        background-color: fade(#42b883, 15%);
        color: #42b883;
      }

      &.react {
        background-color: fade(#61dafb, 15%);
        color: #61dafb;
      }

      &.nuxt {
        background-color: fade(#00dc82, 15%);
        color: #00dc82;
      }

      &.next {
        background-color: fade(#000000, 15%);
        color: #000000;
      }
    }
  }
}

.overview-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  .overview-card {
    flex: 1;
    min-width: 280px;
    max-width: 400px;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    box-shadow: @card-shadow;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &.dehydration {
      border-top: 4px solid @dehydration-color;
      background: linear-gradient(135deg, fade(@dehydration-color, 5%), fade(@dehydration-color, 15%));
    }

    &.hydration {
      border-top: 4px solid @hydration-color;
      background: linear-gradient(135deg, fade(@hydration-color, 5%), fade(@hydration-color, 15%));
    }

    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1.5rem;
      margin: 0 0 1rem;
      color: @text-dark;
    }

    p {
      margin: 0;
      font-size: 1.05rem;
      color: @text-light;
    }
  }

  .process-arrow {
    font-size: 2rem;
    color: @text-light;
  }
}

.content-section {
  margin-bottom: 3rem;

  .tabs {
    display: flex;
    border-bottom: 1px solid @border-color;
    margin-bottom: 2rem;

    button {
      padding: 0.8rem 1.5rem;
      background: none;
      border: none;
      font-size: 1rem;
      font-weight: 500;
      color: @text-light;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;

      &.active {
        color: @primary-color;
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background-color: @primary-color;
          border-radius: 3px 3px 0 0;
        }
      }

      &:hover:not(.active) {
        background-color: @light-bg;
      }
    }
  }
}

.definition-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  .definition-card {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    p {
      margin-bottom: 1.5rem;
      font-size: 1rem;
    }

    .analogy {
      display: flex;
      gap: 1rem;
      background-color: @light-bg;
      border-radius: 8px;
      padding: 1rem;

      .analogy-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
      }

      p {
        margin: 0;
        font-style: italic;
        color: @text-light;
      }
    }
  }
}

.comparison {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @primary-color;
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    thead {
      th {
        font-weight: 600;
        background-color: @light-bg;
      }
    }

    tbody tr {
      &:nth-child(even) {
        background-color: fade(@light-bg, 50%);
      }

      &:hover {
        background-color: darken(@light-bg, 2%);
      }
    }
  }
}

.workflow-section {
  .workflow-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    .step {
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      width: 100%;
      max-width: 600px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateX(5px);
      }

      .step-number {
        width: 40px;
        height: 40px;
        background-color: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 1.5rem;
        flex-shrink: 0;
      }

      .step-content {
        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
        }

        p {
          margin: 0;
          color: @text-light;
        }
      }
    }

    .connector {
      font-size: 1.5rem;
      color: @text-light;
      height: 30px;
    }
  }
}

.scenarios-section {
  .scenario-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .scenario-card {
      background-color: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .scenario-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.8rem;
        color: @text-dark;
      }

      p {
        margin: 0 0 1rem;
        color: @text-light;
        font-size: 0.95rem;
      }

      .benefits {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5rem;

        span {
          padding: 0.3rem 0.8rem;
          background-color: @light-bg;
          border-radius: 20px;
          font-size: 0.85rem;
        }
      }
    }
  }

  .when-to-use {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: @primary-color;
      text-align: center;
    }

    .use-cases {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .case {
        display: flex;
        gap: 1rem;
        padding: 1.5rem;
        border-radius: 8px;
        background-color: fade(@light-bg, 50%);

        .case-icon {
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        h4 {
          margin: 0 0 0.8rem;
          font-size: 1.1rem;
        }

        ul {
          margin: 0;
          padding-left: 1.2rem;

          li {
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
          }
        }
      }
    }
  }
}

.implementation-section {
  .code-samples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;

    .code-sample {
      background-color: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: @card-shadow;

      h3 {
        margin: 0;
        padding: 1rem 1.5rem;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        font-size: 1.1rem;
      }

      pre {
        margin: 0;
        padding: 1.5rem;
        overflow-x: auto;
        background-color: #2d2d2d;

        code {
          color: #f8f8f2;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }

  .best-practices {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: @primary-color;
      text-align: center;
    }

    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .practice {
        display: flex;
        gap: 1rem;
        align-items: flex-start;

        .icon {
          font-size: 1.8rem;
          flex-shrink: 0;
          margin-top: 0.3rem;
        }

        h4 {
          margin: 0 0 0.3rem;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }
  }
}

.conclusion-section {
  background: linear-gradient(135deg, #f8f9ff, #eef0ff);
  border-radius: 12px;
  padding: 2.5rem;
  margin-top: 2rem;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .importance {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .point {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;

      .point-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.8rem;
        color: @text-dark;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }

  .final-tip {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    font-style: italic;
    border-left: 4px solid @primary-color;
  }
}

@media (max-width: 768px) {
  .ssr-hydration-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .overview-cards {
    flex-direction: column;

    .process-arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
  }

  .tabs {
    overflow-x: auto;
    flex-wrap: nowrap;

    button {
      white-space: nowrap;
    }
  }
}
</style>
