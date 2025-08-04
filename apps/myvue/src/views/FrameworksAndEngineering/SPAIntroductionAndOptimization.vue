<template>
  <div class="spa-container">
    <div class="header">
      <h1>单页应用 (SPA) 介绍</h1>
      <p class="subtitle">现代 Web 应用开发的核心模式</p>
    </div>

    <div class="content">
      <section class="concept-section">
        <h2><span class="icon">📚</span> SPA 基本概念</h2>
        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🌐</div>
            <h3>什么是 SPA？</h3>
            <p>SPA（Single Page Application）是一种 Web 应用程序模型，它在初始加载时加载单个 HTML 页面，并通过 JavaScript 动态更新内容，而无需重新加载整个页面。</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>与传统多页应用的区别</h3>
            <div class="comparison">
              <div class="mpa">
                <h4>多页应用 (MPA)</h4>
                <ul>
                  <li>每次导航加载完整新页面</li>
                  <li>服务器端渲染</li>
                  <li>页面间跳转刷新</li>
                  <li>SEO 友好</li>
                </ul>
              </div>
              <div class="spa">
                <h4>单页应用 (SPA)</h4>
                <ul>
                  <li>初始加载后动态更新内容</li>
                  <li>客户端渲染</li>
                  <li>无缝页面切换</li>
                  <li>类似原生应用体验</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="architecture-section">
        <h2><span class="icon">🏗️</span> SPA 架构与实现原理</h2>
        <div class="architecture-grid">
          <div class="architecture-card">
            <h3>核心架构组件</h3>
            <div class="architecture-diagram">
              <div class="layer client">
                <div class="layer-label">客户端</div>
                <div class="components">
                  <div class="component">HTML/CSS/JS 入口文件</div>
                  <div class="component">应用框架 (Vue/React/Angular)</div>
                  <div class="component">路由系统</div>
                  <div class="component">状态管理</div>
                </div>
              </div>

              <div class="connector">⇅ API 通信</div>

              <div class="layer server">
                <div class="layer-label">服务器</div>
                <div class="components">
                  <div class="component">RESTful / GraphQL API</div>
                  <div class="component">数据库</div>
                  <div class="component">认证服务</div>
                  <div class="component">文件存储</div>
                </div>
              </div>
            </div>
          </div>

          <div class="architecture-card">
            <h3>工作原理流程</h3>
            <div class="workflow">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>初始加载</h4>
                  <p>浏览器请求并加载初始 HTML、CSS 和 JavaScript 文件</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>应用初始化</h4>
                  <p>JavaScript 框架初始化，渲染初始页面</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>用户交互</h4>
                  <p>用户与应用交互触发路由变化或数据请求</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>动态更新</h4>
                  <p>客户端路由处理导航，API 获取数据，动态更新 DOM</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">5</div>
                <div class="step-content">
                  <h4>持续交互</h4>
                  <p>整个应用生命周期内无需完整页面刷新</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <h2><span class="icon">🔧</span> SPA 关键技术实现</h2>
        <div class="tech-grid">
          <div class="tech-card">
            <div class="tech-header">
              <div class="tech-icon">🛣️</div>
              <h3>客户端路由</h3>
            </div>
            <div class="tech-content">
              <p>管理应用内导航而不触发页面刷新</p>
              <ul>
                <li><strong>Hash 路由</strong>：使用 URL hash (#) 实现</li>
                <li><strong>History API</strong>：使用 pushState/replaceState</li>
                <li><strong>路由库</strong>：Vue Router, React Router</li>
              </ul>
              <pre class="code">// Vue Router 示例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
});</pre>
            </div>
          </div>

          <div class="tech-card">
            <div class="tech-header">
              <div class="tech-icon">🔄</div>
              <h3>动态内容加载</h3>
            </div>
            <div class="tech-content">
              <p>异步获取和渲染内容</p>
              <ul>
                <li>AJAX / Fetch API</li>
                <li>Axios 等 HTTP 库</li>
                <li>组件级数据获取</li>
                <li>懒加载组件</li>
              </ul>
              <pre class="code">// Vue 组件数据获取示例
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const data = ref(null);

    axios.get('/api/data')
      .then(response => data.value = response.data);

    return { data };
  }
}</pre>
            </div>
          </div>

          <div class="tech-card">
            <div class="tech-header">
              <div class="tech-icon">📦</div>
              <h3>状态管理</h3>
            </div>
            <div class="tech-content">
              <p>集中管理应用状态</p>
              <ul>
                <li>组件状态 (本地状态)</li>
                <li>全局状态管理 (Vuex/Pinia, Redux)</li>
                <li>状态持久化</li>
                <li>状态同步策略</li>
              </ul>
              <pre class="code">// Pinia 状态管理示例
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({ user: null }),
  actions: {
    async login(credentials) {
      this.user = await api.login(credentials);
    }
  }
});</pre>
            </div>
          </div>

          <div class="tech-card">
            <div class="tech-header">
              <div class="tech-icon">⚡</div>
              <h3>性能优化</h3>
            </div>
            <div class="tech-content">
              <p>解决 SPA 特有性能问题</p>
              <ul>
                <li>代码分割 (Code Splitting)</li>
                <li>懒加载路由</li>
                <li>缓存策略</li>
                <li>虚拟 DOM 高效更新</li>
              </ul>
              <pre class="code">// 路由懒加载示例 (Vue)
const UserProfile = () => import('./UserProfile.vue');

const routes = [
  { path: '/user/:id', component: UserProfile }
];</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="scenarios-section">
        <h2><span class="icon">🚀</span> SPA 适用场景</h2>
        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">💼</div>
              <h3>企业级应用</h3>
            </div>
            <div class="scenario-content">
              <ul>
                <li>CRM 系统</li>
                <li>项目管理工具</li>
                <li>数据分析仪表盘</li>
                <li>内部管理系统</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">📱</div>
              <h3>社交/媒体应用</h3>
            </div>
            <div class="scenario-content">
              <ul>
                <li>社交媒体平台</li>
                <li>内容管理系统</li>
                <li>实时聊天应用</li>
                <li>流媒体服务</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🛒</div>
              <h3>电子商务</h3>
            </div>
            <div class="scenario-content">
              <ul>
                <li>产品展示与筛选</li>
                <li>购物车管理</li>
                <li>用户个人中心</li>
                <li>订单跟踪系统</li>
              </ul>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">📊</div>
              <h3>数据可视化</h3>
            </div>
            <div class="scenario-content">
              <ul>
                <li>实时数据仪表盘</li>
                <li>交互式报表</li>
                <li>金融交易平台</li>
                <li>监控系统</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="pros-cons-section">
        <h2><span class="icon">⚖️</span> SPA 优缺点分析</h2>
        <div class="comparison-grid">
          <div class="pros-card">
            <h3>优势</h3>
            <ul>
              <li>
                <span class="pros-icon">🚀</span>
                <div>
                  <h4>流畅的用户体验</h4>
                  <p>页面切换无刷新，类似原生应用的体验</p>
                </div>
              </li>
              <li>
                <span class="pros-icon">⚡</span>
                <div>
                  <h4>高效的前后端分离</h4>
                  <p>前后端独立开发部署，API 驱动架构</p>
                </div>
              </li>
              <li>
                <span class="pros-icon">📱</span>
                <div>
                  <h4>易于转换为 PWA</h4>
                  <p>天然适合渐进式 Web 应用开发</p>
                </div>
              </li>
              <li>
                <span class="pros-icon">🧩</span>
                <div>
                  <h4>组件化开发</h4>
                  <p>促进代码复用和维护</p>
                </div>
              </li>
              <li>
                <span class="pros-icon">🔄</span>
                <div>
                  <h4>离线功能支持</h4>
                  <p>通过 Service Workers 实现离线访问</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="cons-card">
            <h3>挑战与缺点</h3>
            <ul>
              <li>
                <span class="cons-icon">🐢</span>
                <div>
                  <h4>初始加载性能</h4>
                  <p>首次加载需要下载大量资源</p>
                </div>
              </li>
              <li>
                <span class="cons-icon">🔍</span>
                <div>
                  <h4>SEO 优化难度</h4>
                  <p>需要额外处理搜索引擎爬取</p>
                </div>
              </li>
              <li>
                <span class="cons-icon">🛠️</span>
                <div>
                  <h4>开发复杂度</h4>
                  <p>需要掌握现代前端框架和工具链</p>
                </div>
              </li>
              <li>
                <span class="cons-icon">📶</span>
                <div>
                  <h4>网络依赖</h4>
                  <p>API 调用失败可能导致功能不可用</p>
                </div>
              </li>
              <li>
                <span class="cons-icon">📱</span>
                <div>
                  <h4>内存管理</h4>
                  <p>长期运行需注意内存泄漏问题</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="frameworks-section">
        <h2><span class="icon">🛠️</span> SPA 开发框架</h2>
        <div class="frameworks-grid">
          <div class="framework-card vue">
            <div class="framework-header">
              <div class="framework-logo">V</div>
              <h3>Vue.js</h3>
            </div>
            <div class="framework-content">
              <ul>
                <li><strong>渐进式框架</strong> - 灵活采用所需功能</li>
                <li><strong>组合式 API</strong> - 更好的逻辑复用</li>
                <li><strong>单文件组件</strong> - 模板、脚本、样式一体化</li>
                <li><strong>生态系统</strong> - Vue Router, Pinia, Vite</li>
              </ul>
            </div>
          </div>

          <div class="framework-card react">
            <div class="framework-header">
              <div class="framework-logo">R</div>
              <h3>React</h3>
            </div>
            <div class="framework-content">
              <ul>
                <li><strong>组件化架构</strong> - 基于组件的开发模式</li>
                <li><strong>虚拟 DOM</strong> - 高效UI更新</li>
                <li><strong>JSX 语法</strong> - JavaScript 和 HTML 混合</li>
                <li><strong>丰富生态</strong> - React Router, Redux, Next.js</li>
              </ul>
            </div>
          </div>

          <div class="framework-card angular">
            <div class="framework-header">
              <div class="framework-logo">A</div>
              <h3>Angular</h3>
            </div>
            <div class="framework-content">
              <ul>
                <li><strong>完整解决方案</strong> - 包含路由、HTTP等工具</li>
                <li><strong>TypeScript 优先</strong> - 强类型支持</li>
                <li><strong>依赖注入</strong> - 强大的DI系统</li>
                <li><strong>企业级特性</strong> - 表单验证、国际化等</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="future-section">
        <h2><span class="icon">🔮</span> SPA 的未来发展</h2>
        <div class="trends-grid">
          <div class="trend-card">
            <h3>混合渲染模式</h3>
            <p>结合 SSR 和 CSR 优势的混合渲染方案</p>
            <ul>
              <li>Next.js (React)</li>
              <li>Nuxt.js (Vue)</li>
              <li>Angular Universal</li>
            </ul>
          </div>

          <div class="trend-card">
            <h3>微前端架构</h3>
            <p>将大型 SPA 拆分为独立开发部署的子应用</p>
            <ul>
              <li>模块联邦 (Webpack 5)</li>
              <li>Single-SPA 框架</li>
              <li>Qiankun 微前端方案</li>
            </ul>
          </div>

          <div class="trend-card">
            <h3>边缘计算</h3>
            <p>在 CDN 边缘节点运行部分逻辑</p>
            <ul>
              <li>Cloudflare Workers</li>
              <li>Vercel Edge Functions</li>
              <li>Netlify Edge Handlers</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>单页应用 (SPA) 是现代 Web 开发的重要模式，平衡用户体验与开发效率</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示，无逻辑代码
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');

.spa-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.07);
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #3498db, #9b59b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.15rem;
      color: #7f8c8d;
      font-weight: 400;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .content {
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  }

  section {
    margin-bottom: 3.5rem;

    h2 {
      font-size: 1.7rem;
      color: #3498db;
      margin-bottom: 1.8rem;
      padding-bottom: 0.8rem;
      border-bottom: 2px solid #e0f7fa;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4rem;
      }
    }
  }

  .concept-section {
    .concept-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;

      .concept-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;

        .concept-icon {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1rem;
          text-align: center;
        }

        p {
          font-size: 1.05rem;
          color: #4a5568;
          text-align: center;
          line-height: 1.7;
        }

        .comparison {
          display: flex;
          gap: 1.5rem;
          margin-top: 1.5rem;

          .mpa,
          .spa {
            flex: 1;
            background: white;
            border-radius: 8px;
            padding: 1.2rem;
            border: 1px solid #e2e8f0;

            h4 {
              font-size: 1.1rem;
              text-align: center;
              margin-top: 0;
              margin-bottom: 1rem;
              padding-bottom: 0.5rem;
              border-bottom: 1px solid #e2e8f0;
            }

            ul {
              padding-left: 1.2rem;
              margin: 0;

              li {
                margin-bottom: 0.7rem;
                color: #4a5568;
                font-size: 0.95rem;
                line-height: 1.5;
              }
            }
          }

          .mpa {
            border-top: 3px solid #3498db;
          }

          .spa {
            border-top: 3px solid #9b59b6;
          }
        }
      }
    }
  }

  .architecture-section {
    .architecture-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;

      .architecture-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .architecture-diagram {
          .layer {
            border: 1px solid #cbd5e0;
            border-radius: 8px;
            padding: 1.2rem;
            margin-bottom: 1rem;

            .layer-label {
              font-weight: 600;
              margin-bottom: 0.8rem;
              font-size: 1.1rem;
              color: #3498db;
            }

            .components {
              display: grid;
              grid-template-columns: 1fr;
              gap: 0.8rem;

              .component {
                background: #edf2f7;
                padding: 0.8rem;
                border-radius: 6px;
                font-size: 0.95rem;
                text-align: center;
              }
            }

            &.client {
              background: #e3f2fd;
            }

            &.server {
              background: #e8f5e9;
            }
          }

          .connector {
            text-align: center;
            padding: 0.8rem;
            font-weight: 500;
            color: #718096;
          }
        }

        .workflow {
          .step {
            display: flex;
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px dashed #cbd5e0;

            &:last-child {
              margin-bottom: 0;
              padding-bottom: 0;
              border-bottom: none;
            }

            .step-number {
              width: 36px;
              height: 36px;
              background: #3498db;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              font-size: 1.1rem;
              margin-right: 1.2rem;
              flex-shrink: 0;
            }

            .step-content {
              h4 {
                font-size: 1.1rem;
                color: #2c3e50;
                margin-top: 0;
                margin-bottom: 0.5rem;
              }

              p {
                font-size: 0.95rem;
                color: #4a5568;
                margin: 0;
              }
            }
          }
        }
      }
    }
  }

  .implementation-section {
    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.8rem;

      .tech-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        .tech-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .tech-icon {
            font-size: 1.8rem;
            margin-right: 0.8rem;
          }

          h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin: 0;
          }
        }

        .tech-content {
          p {
            color: #4a5568;
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
          }

          ul {
            padding-left: 1.2rem;
            margin-bottom: 0.8rem;

            li {
              margin-bottom: 0.5rem;
              color: #4a5568;
              font-size: 0.95rem;
              line-height: 1.5;

              strong {
                color: #2c3e50;
              }
            }
          }

          .code {
            background: #2d3748;
            color: #e2e8f0;
            border-radius: 8px;
            padding: 1.2rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            line-height: 1.6;
          }
        }
      }
    }
  }

  .scenarios-section {
    .scenarios-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.8rem;

      .scenario-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        .scenario-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .scenario-icon {
            font-size: 1.8rem;
            margin-right: 0.8rem;
          }

          h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin: 0;
          }
        }

        .scenario-content {
          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.7rem;
              color: #4a5568;
              font-size: 0.95rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }

  .pros-cons-section {
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.8rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .pros-card,
      .cons-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
          text-align: center;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        ul {
          padding-left: 0;
          margin: 0;

          li {
            list-style: none;
            display: flex;
            padding: 1rem;
            margin-bottom: 0.8rem;
            background: white;
            border-radius: 8px;
            border: 1px solid #e2e8f0;

            .pros-icon,
            .cons-icon {
              font-size: 1.5rem;
              margin-right: 1rem;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              flex-shrink: 0;
            }

            .pros-icon {
              background: #e3f2fd;
              color: #3498db;
            }

            .cons-icon {
              background: #fce8e6;
              color: #e74c3c;
            }

            div {
              h4 {
                font-size: 1.1rem;
                color: #2c3e50;
                margin-top: 0;
                margin-bottom: 0.3rem;
              }

              p {
                font-size: 0.9rem;
                color: #718096;
                margin: 0;
              }
            }
          }
        }
      }

      .pros-card {
        border-top: 4px solid #2ecc71;
      }

      .cons-card {
        border-top: 4px solid #e74c3c;
      }
    }
  }

  .frameworks-section {
    .frameworks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.8rem;

      .framework-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        &.vue {
          border-top: 4px solid #42b983;
        }

        &.react {
          border-top: 4px solid #61dafb;
        }

        &.angular {
          border-top: 4px solid #dd0031;
        }

        .framework-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .framework-logo {
            width: 50px;
            height: 50px;
            background: #3498db;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.5rem;
            margin-right: 1rem;
          }

          h3 {
            font-size: 1.5rem;
            color: #2c3e50;
            margin: 0;
          }
        }

        .framework-content {
          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.8rem;
              color: #4a5568;
              font-size: 0.95rem;
              line-height: 1.5;

              strong {
                color: #2c3e50;
              }
            }
          }
        }
      }
    }
  }

  .future-section {
    .trends-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.8rem;

      .trend-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 0.8rem;
        }

        p {
          color: #4a5568;
          font-size: 0.95rem;
          margin-bottom: 0.8rem;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.7rem;
            color: #4a5568;
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
    color: #718096;
    font-size: 0.95rem;
    font-style: italic;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;

    .header {
      h1 {
        font-size: 1.9rem;
      }
    }

    .content {
      padding: 1.8rem;
    }

    section {
      margin-bottom: 2.5rem;
    }

    .concept-grid,
    .architecture-grid,
    .tech-grid,
    .scenarios-grid,
    .frameworks-grid,
    .trends-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }
  }
}
</style>
