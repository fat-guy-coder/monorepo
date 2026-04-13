<template>
  <div class="ssr-explainer">
    <!-- 头部介绍 -->
    <header class="header">
      <div class="header-content">
        <h1>Vue服务器端渲染(SSR)基础介绍</h1>
        <p class="subtitle">提升应用性能与SEO优化的关键技术</p>
      </div>
      <div class="stats">
        <div class="stat">
          <div class="value">70%</div>
          <div class="label">首屏加载提升</div>
        </div>
        <div class="stat">
          <div class="value">5倍</div>
          <div class="label">搜索引擎优化提升</div>
        </div>
        <div class="stat">
          <div class="value">100%</div>
          <div class="label">支持SEO爬取</div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 基本概念 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🧠</span> SSR基本概念</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="concept-grid">
            <div class="concept-item">
              <div class="concept-icon">🔍</div>
              <h3>什么是SSR？</h3>
              <p>Server-Side Rendering（服务器端渲染）是指在服务器上将Vue组件渲染成HTML字符串，直接发送到浏览器，最后在客户端"激活"为可交互应用的技术。</p>
            </div>

            <div class="concept-item">
              <div class="concept-icon">🔄</div>
              <h3>SSR vs CSR</h3>
              <div class="comparison">
                <div>
                  <h4>CSR (客户端渲染)</h4>
                  <ul>
                    <li>浏览器下载空HTML</li>
                    <li>下载JavaScript</li>
                    <li>执行JavaScript生成内容</li>
                    <li>用户看到完整页面</li>
                  </ul>
                </div>
                <div>
                  <h4>SSR (服务器端渲染)</h4>
                  <ul>
                    <li>服务器生成完整HTML</li>
                    <li>浏览器直接显示内容</li>
                    <li>下载JavaScript</li>
                    <li>激活为可交互应用</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="concept-item">
              <div class="concept-icon">🎯</div>
              <h3>为什么需要SSR？</h3>
              <ul>
                <li><strong>SEO优化</strong>：爬虫可以直接抓取渲染好的内容</li>
                <li><strong>首屏性能</strong>：用户更快看到内容，减少白屏时间</li>
                <li><strong>低端设备支持</strong>：服务器执行渲染减轻客户端压力</li>
                <li><strong>更好的用户体验</strong>：快速加载关键内容</li>
              </ul>
            </div>
          </div>

          <div class="architecture">
            <h3>SSR架构流程图</h3>
            <div class="ssr-flow">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>浏览器请求页面</h4>
                  <p>用户访问URL</p>
                </div>
              </div>

              <div class="arrow">→</div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>服务器处理请求</h4>
                  <p>Node.js服务器接收请求</p>
                </div>
              </div>

              <div class="arrow">→</div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>渲染Vue应用</h4>
                  <p>服务器创建Vue实例并渲染</p>
                </div>
              </div>

              <div class="arrow">→</div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>发送HTML响应</h4>
                  <p>包含完整内容的HTML</p>
                </div>
              </div>

              <div class="arrow">→</div>

              <div class="step">
                <div class="step-number">5</div>
                <div class="step-content">
                  <h4>客户端激活</h4>
                  <p>JavaScript接管HTML使其可交互</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心实现 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">⚙️</span> Vue SSR实现机制</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="implementation">
            <div class="implementation-step">
              <h3>1. 创建Vue应用实例</h3>
              <p>创建可复用工厂函数避免状态交叉污染</p>
              <div class="code-block">
                <pre>// app.js
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  return createSSRApp(App)
}</pre>
              </div>
            </div>

            <div class="implementation-step">
              <h3>2. 服务器入口</h3>
              <p>使用@vue/server-renderer渲染应用</p>
              <div class="code-block">
                <pre><code>// server.js
import express from 'express'
import { renderToString } from '@vue/server-renderer'
import { createApp } from './app.js'

const server = express()

server.get('*', async (req, res) => {
  const app = createApp()

  const html = await renderToString(app)

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR</title>
      </head>
      <body>
        <div id="app">${html}</div>
        &lt;script src="/client.js"&gt;&lt;/script&gt;
      </body>
    </html>
  `)
})

server.listen(3000)</code></pre>
              </div>
            </div>

            <div class="implementation-step">
              <h3>3. 客户端入口</h3>
              <p>客户端激活静态HTML</p>
              <div class="code-block">
                <pre>// client.js
import { createApp } from './app.js'

// 创建应用并挂载到DOM
const app = createApp()
app.mount('#app')</pre>
              </div>
            </div>

            <div class="implementation-step">
              <h3>4. 路由集成</h3>
              <p>使用Vue Router处理SSR路由</p>
              <div class="code-block">
                <pre>// router.js
import { createMemoryHistory, createRouter } from 'vue-router'

export function createRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]
  })
}

// 服务器端需匹配请求URL
server.get('*', async (req, res) => {
  const router = createRouter()
  await router.push(req.url)
  await router.isReady()

  // ...渲染应用
})</pre>
              </div>
            </div>
          </div>

          <div class="hydration-process">
            <h3>客户端激活(Hydration)过程</h3>
            <div class="hydration-steps">
              <div class="hydration-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>HTML结构匹配</h4>
                  <p>Vue将客户端组件与服务器渲染的DOM结构匹配</p>
                </div>
              </div>

              <div class="hydration-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>事件监听器附加</h4>
                  <p>为现有DOM元素附加事件监听器</p>
                </div>
              </div>

              <div class="hydration-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>虚拟DOM关联</h4>
                  <p>将服务器渲染的DOM与虚拟DOM关联</p>
                </div>
              </div>

              <div class="hydration-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>接管应用</h4>
                  <p>应用变为完全交互式SPA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🚀</span> SSR使用场景</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="scenarios">
            <div class="scenario">
              <div class="scenario-icon">🔍</div>
              <div class="scenario-content">
                <h3>SEO关键页面</h3>
                <ul>
                  <li>产品目录页面</li>
                  <li>博客和新闻文章</li>
                  <li>营销着陆页</li>
                </ul>
              </div>
            </div>

            <div class="scenario">
              <div class="scenario-icon">🚀</div>
              <div class="scenario-content">
                <h3>性能敏感应用</h3>
                <ul>
                  <li>慢速网络环境</li>
                  <li>低端移动设备</li>
                  <li>高跳出率页面</li>
                </ul>
              </div>
            </div>

            <div class="scenario">
              <div class="scenario-icon">📱</div>
              <div class="scenario-content">
                <h3>社交媒体分享</h3>
                <ul>
                  <li>动态OG元标签</li>
                  <li>Twitter卡片预览</li>
                  <li>富媒体共享预览</li>
                </ul>
              </div>
            </div>

            <div class="scenario">
              <div class="scenario-icon">🔐</div>
              <div class="scenario-content">
                <h3>内容安全需求</h3>
                <ul>
                  <li>隐藏敏感数据</li>
                  <li>防止XSS攻击</li>
                  <li>安全关键数据</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="decision-tree">
            <h3>SSR决策树</h3>
            <div class="tree">
              <div class="node root">
                <div class="question">需要SEO优化？</div>
                <div class="branches">
                  <div class="branch">
                    <div class="answer">是 →</div>
                    <div class="node">
                      <div class="question">页面内容动态？</div>
                      <div class="branches">
                        <div class="branch">
                          <div class="answer">是 →</div>
                          <div class="node">
                            <div class="recommendation">强烈推荐SSR</div>
                          </div>
                        </div>
                        <div class="branch">
                          <div class="answer">否 →</div>
                          <div class="node">
                            <div class="recommendation">考虑预渲染</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="branch">
                    <div class="answer">否 →</div>
                    <div class="node">
                      <div class="question">首屏性能重要？</div>
                      <div class="branches">
                        <div class="branch">
                          <div class="answer">是 →</div>
                          <div class="node">
                            <div class="recommendation">推荐SSR</div>
                          </div>
                        </div>
                        <div class="branch">
                          <div class="answer">否 →</div>
                          <div class="node">
                            <div class="recommendation">使用CSR</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 解决方案 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🛠️</span> SSR解决方案</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="solutions">
            <div class="solution">
              <div class="solution-header">
                <div class="solution-logo">V</div>
                <h3>Nuxt.js</h3>
              </div>
              <div class="solution-content">
                <p>基于Vue的SSR框架，提供开箱即用的解决方案</p>
                <ul>
                  <li>自动路由系统</li>
                  <li>数据预取机制</li>
                  <li>模块化架构</li>
                  <li>静态站点生成</li>
                </ul>
                <div class="code-snippet">
                  <pre>// 创建Nuxt应用
npx nuxi init my-app

// 页面组件
export default defineComponent({
  async asyncData({ params }) {
    const post = await fetchPost(params.id)
    return { post }
  }
})</pre>
                </div>
              </div>
            </div>

            <div class="solution">
              <div class="solution-header">
                <div class="solution-logo">Q</div>
                <h3>Quasar Framework</h3>
              </div>
              <div class="solution-content">
                <p>高性能Vue框架，支持SSR和多种平台</p>
                <ul>
                  <li>跨平台支持</li>
                  <li>丰富的UI组件</li>
                  <li>CLI构建工具</li>
                  <li>性能优化</li>
                </ul>
                <div class="code-snippet">
                  <pre>// 启用SSR模式
quasar create my-app --mode ssr

// 构建应用
quasar build -m ssr</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3>SSR最佳实践</h3>
            <div class="practices-grid">
              <div class="practice">
                <div class="practice-icon">📦</div>
                <h4>代码分割</h4>
                <p>使用异步组件和懒加载路由</p>
              </div>

              <div class="practice">
                <div class="practice-icon">🚫</div>
                <h4>避免副作用</h4>
                <p>不在beforeCreate和created中访问DOM</p>
              </div>

              <div class="practice">
                <div class="practice-icon">💧</div>
                <h4>数据预取</h4>
                <p>使用asyncData或serverPrefetch获取数据</p>
              </div>

              <div class="practice">
                <div class="practice-icon">🌐</div>
                <h4>同构代码</h4>
                <p>确保代码在服务端和客户端都能运行</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">✅</span> 总结</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="summary-grid">
            <div class="pros">
              <h3>SSR优势</h3>
              <ul>
                <li>🚀 显著提升首屏加载速度</li>
                <li>🔍 完整的SEO支持</li>
                <li>📱 优化的移动端体验</li>
                <li>🔄 更好的用户交互体验</li>
                <li>🔗 可共享的链接预览</li>
              </ul>
            </div>

            <div class="cons">
              <h3>SSR挑战</h3>
              <ul>
                <li>⚙️ 服务器资源消耗增加</li>
                <li>🐞 调试复杂度提高</li>
                <li>🔄 需要处理同构代码</li>
                <li>⏱️ 开发配置更复杂</li>
                <li>💧 注意客户端激活过程</li>
              </ul>
            </div>
          </div>

          <div class="resources">
            <h3>学习资源</h3>
            <div class="resource-list">
              <a href="https://vuejs.org/guide/scaling-up/ssr.html" target="_blank" class="resource-card">
                <div class="resource-icon">📘</div>
                <div class="resource-content">
                  <h4>Vue官方SSR指南</h4>
                  <p>详细API和概念解释</p>
                </div>
              </a>

              <a href="https://nuxtjs.org/" target="_blank" class="resource-card">
                <div class="resource-icon">🛠️</div>
                <div class="resource-content">
                  <h4>Nuxt.js文档</h4>
                  <p>最流行的Vue SSR框架</p>
                </div>
              </a>

              <a href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" class="resource-card">
                <div class="resource-icon">💻</div>
                <div class="resource-content">
                  <h4>Vue HackerNews</h4>
                  <p>官方SSR示例项目</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p> Vue SSR技术基础介绍 | 提升应用性能与SEO优化</p>
      <div class="footer-links">
        <a href="https://vuejs.org" target="_blank">Vue官网</a>
        <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>
        <a href="https://quasar.dev" target="_blank">Quasar框架</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const stats = ref([
  { value: '70%', label: '首屏加载提升' },
  { value: '5倍', label: '搜索引擎优化提升' },
  { value: '100%', label: '支持SEO爬取' }
]);
</script>

<style lang="less" scoped>
@primary: #42b983;
@dark-primary: darken(@primary, 10%);
@secondary: #2c3e50;
@accent: #4a6cf7;
@light-bg: #f8f9fa;
@border: #e1e4e8;
@text: #2c3e50;
@code-bg: #f6f8fa;

.ssr-explainer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: @text;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, @primary 0%, @accent 100%);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: 'SSR';
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 200px;
    font-weight: 800;
    opacity: 0.05;
    pointer-events: none;
  }

  .header-content {
    position: relative;
    z-index: 2;
    margin-bottom: 30px;

    h1 {
      font-size: 2.8rem;
      margin: 0 0 15px 0;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      margin: 0;
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    z-index: 2;

    .stat {
      text-align: center;
      flex: 1;

      .value {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 5px;
      }

      .label {
        font-size: 1rem;
        opacity: 0.9;
      }
    }
  }
}

.section {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-header {
    margin-bottom: 30px;

    h2 {
      font-size: 1.8rem;
      margin: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 15px;
        font-size: 1.8rem;
      }
    }

    .divider {
      height: 3px;
      width: 80px;
      background: linear-gradient(to right, @primary, @accent);
      margin-top: 15px;
      border-radius: 3px;
    }
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.concept-item {
  background: @light-bg;
  border-radius: 12px;
  padding: 25px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .concept-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    color: @primary;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: @dark-primary;
  }

  ul {
    padding-left: 20px;
    margin: 15px 0;

    li {
      margin-bottom: 10px;
      line-height: 1.5;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 15px;

  div {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    padding: 15px;

    h4 {
      margin-top: 0;
      font-size: 1.1rem;
      color: @accent;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }

    ul {
      padding-left: 20px;
      margin: 10px 0 0 0;

      li {
        margin-bottom: 8px;
        font-size: 0.95rem;
      }
    }
  }
}

.architecture {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h3 {
    text-align: center;
    margin-top: 0;
    font-size: 1.6rem;
    color: @secondary;
    padding-bottom: 15px;
    border-bottom: 1px solid @border;
    margin-bottom: 30px;
  }
}

.ssr-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .step {
    text-align: center;
    flex: 1;

    .step-number {
      width: 40px;
      height: 40px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px auto;
      font-weight: bold;
      font-size: 1.2rem;
    }

    h4 {
      margin: 0 0 8px 0;
      font-size: 1.1rem;
      color: @primary;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #666;
    }
  }

  .arrow {
    color: @accent;
    font-size: 1.8rem;
    margin: 0 -10px;
    position: relative;
    top: -15px;
  }
}

.implementation {
  .implementation-step {
    margin-bottom: 35px;

    h3 {
      font-size: 1.5rem;
      color: @dark-primary;
      margin-top: 0;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }

    p {
      margin-top: 0;
      margin-bottom: 15px;
      color: #555;
    }
  }
}

.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  border-left: 4px solid @primary;

  pre {
    margin: 0;
    font-family: 'Fira Code', monospace;
    line-height: 1.5;
    font-size: 0.95rem;
    color: @secondary;
  }
}

.hydration-process {
  margin-top: 40px;

  h3 {
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 30px;
    color: @secondary;
  }
}

.hydration-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;

  .hydration-step {
    background: @light-bg;
    border-radius: 12px;
    padding: 25px;
    text-align: center;

    .step-number {
      width: 40px;
      height: 40px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px auto;
      font-weight: bold;
      font-size: 1.2rem;
    }

    h4 {
      margin: 0 0 10px 0;
      font-size: 1.1rem;
      color: @primary;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #666;
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.scenario {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .scenario-icon {
    font-size: 2rem;
    margin-right: 15px;
    color: @primary;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      font-size: 0.95rem;
    }
  }
}

.decision-tree {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h3 {
    text-align: center;
    margin-top: 0;
    font-size: 1.6rem;
    margin-bottom: 30px;
  }
}

.tree {
  .node {
    text-align: center;
    position: relative;

    &.root {
      margin-bottom: 50px;
    }
  }

  .question {
    background: @primary;
    color: white;
    padding: 15px;
    border-radius: 8px;
    display: inline-block;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .branches {
    display: flex;
    justify-content: center;
    gap: 80px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: 50%;
      height: 20px;
      width: 2px;
      background: @primary;
    }
  }

  .branch {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: 50%;
      height: 20px;
      width: 2px;
      background: @primary;
    }
  }

  .answer {
    color: @primary;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .recommendation {
    background: @light-bg;
    padding: 15px;
    border-radius: 8px;
    border: 2px solid @primary;
    font-weight: bold;
  }
}

.solutions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.solution {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07);

  .solution-header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: linear-gradient(to right, @primary, @accent);
    color: white;

    .solution-logo {
      width: 50px;
      height: 50px;
      background: white;
      color: @primary;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: bold;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      font-size: 1.7rem;
    }
  }

  .solution-content {
    padding: 25px;

    p {
      margin-top: 0;
      font-size: 1.1rem;
      color: #555;
      margin-bottom: 20px;
    }

    ul {
      padding-left: 20px;
      margin-bottom: 20px;

      li {
        margin-bottom: 10px;
      }
    }
  }
}

.code-snippet {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  border-left: 3px solid @primary;
  overflow-x: auto;

  pre {
    margin: 0;
    line-height: 1.5;
  }
}

.best-practices {
  h3 {
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 30px;
    color: @secondary;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;

  .practice {
    text-align: center;
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    .practice-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: @primary;
    }

    h4 {
      margin: 0 0 10px 0;
      color: @primary;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #666;
    }
  }
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.6rem;
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid @border;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 15px;
      padding-left: 35px;
      position: relative;
      line-height: 1.5;

      &::before {
        position: absolute;
        left: 0;
        top: 3px;
        font-size: 1.3rem;
      }
    }
  }
}

.pros ul li::before {
  content: '✓';
  color: @primary;
}

.cons ul li::before {
  content: '⚠️';
}

.resources {
  h3 {
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 30px;
    color: @secondary;
  }
}

.resource-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.resource-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .resource-icon {
    font-size: 2.5rem;
    margin-right: 20px;
    color: @primary;
  }

  h4 {
    margin: 0 0 5px 0;
    color: @primary;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #666;
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 40px;
  color: #7f8c8d;
  border-top: 1px solid @border;

  p {
    margin: 0 0 15px 0;
    font-size: 1rem;
  }

  .footer-links {
    a {
      margin: 0 15px;
      color: @primary;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 20px;

    .header-content {
      h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }

    .stats {
      flex-direction: column;
      gap: 15px;
    }
  }

  .ssr-flow {
    flex-direction: column;
    gap: 30px;

    .arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }

  .branch-container {
    flex-direction: column;
  }

  .solutions {
    grid-template-columns: 1fr;
  }
}
</style>
