<template>
  <div class="framework-comparison">
    <header class="comparison-header">
      <div class="header-content">
        <h1>React vs Vue 对比分析</h1>
        <p class="subtitle">深入解析两大主流前端框架的核心差异</p>
        <div class="framework-logos">
          <div class="logo-card react">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                  stroke="#61DAFB" stroke-width="1.5" />
                <path
                  d="M12 17C16.4183 17 20 13.4183 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13.4183 7.58172 17 12 17Z"
                  stroke="#61DAFB" stroke-width="1.5" />
                <path d="M8.92893 14.5C10.1735 16.1667 13.1301 16.1667 14.3747 14.5" stroke="#61DAFB" stroke-width="1.5"
                  stroke-linecap="round" />
                <path d="M8.92893 9.5C10.1735 7.83333 13.1301 7.83333 14.3747 9.5" stroke="#61DAFB" stroke-width="1.5"
                  stroke-linecap="round" />
                <path d="M9.57153 12H14.4284" stroke="#61DAFB" stroke-width="1.5" stroke-linecap="round" />
                <path d="M17.4285 12C17.4285 13.933 18.9955 15.5 20.9285 15.5" stroke="#61DAFB" stroke-width="1.5"
                  stroke-linecap="round" />
                <path d="M3.07153 12C3.07153 13.933 4.63853 15.5 6.57153 15.5" stroke="#61DAFB" stroke-width="1.5"
                  stroke-linecap="round" />
              </svg>
            </div>
            <div class="logo-text">React</div>
          </div>
          <div class="vs">VS</div>
          <div class="logo-card vue">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L2 20H22L12 4Z" stroke="#41B883" stroke-width="1.5" stroke-linejoin="round" />
                <path d="M12 4L18.5 16.5H5.5L12 4Z" stroke="#41B883" stroke-width="1.5" stroke-linejoin="round" />
                <path d="M12 10L8.5 16.5H15.5L12 10Z" stroke="#41B883" stroke-width="1.5" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="logo-text">Vue</div>
          </div>
        </div>
      </div>
    </header>

    <main class="content-container">
      <!-- 核心对比表格 -->
      <section class="section comparison-table">
        <h2 class="section-title">
          <span class="icon">📊</span>
          核心特性对比
        </h2>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>对比维度</th>
                <th>React</th>
                <th>Vue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>设计理念</td>
                <td>函数式编程，组件即函数</td>
                <td>渐进式框架，逐步采用</td>
              </tr>
              <tr>
                <td>核心库大小</td>
                <td>~6.4kb (React DOM)</td>
                <td>~9.6kb (Vue 3)</td>
              </tr>
              <tr>
                <td>学习曲线</td>
                <td>较陡峭，需要理解JSX和Hook概念</td>
                <td>较平缓，基于标准HTML/CSS/JS</td>
              </tr>
              <tr>
                <td>模板语法</td>
                <td>JSX (JavaScript语法扩展)</td>
                <td>HTML-based模板</td>
              </tr>
              <tr>
                <td>状态管理</td>
                <td>Context API / Redux / MobX</td>
                <td>Vuex / Pinia</td>
              </tr>
              <tr>
                <td>响应式原理</td>
                <td>手动管理状态 (useState/useReducer)</td>
                <td>自动依赖追踪 (Proxy)</td>
              </tr>
              <tr>
                <td>路由解决方案</td>
                <td>React Router</td>
                <td>Vue Router</td>
              </tr>
              <tr>
                <td>样式方案</td>
                <td>CSS-in-JS / CSS Modules</td>
                <td>Scoped CSS / CSS Modules</td>
              </tr>
              <tr>
                <td>移动端方案</td>
                <td>React Native</td>
                <td>Weex / NativeScript</td>
              </tr>
              <tr>
                <td>SSR支持</td>
                <td>Next.js</td>
                <td>Nuxt.js</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 底层实现对比 -->
      <section class="section implementation-section">
        <h2 class="section-title">
          <span class="icon">⚙️</span>
          底层实现原理
        </h2>

        <div class="comparison-cards">
          <div class="card react">
            <h3>React 核心机制</h3>
            <div class="features">
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <div class="feature-content">
                  <h4>虚拟DOM</h4>
                  <p>通过虚拟DOM进行高效的UI更新</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🧬</div>
                <div class="feature-content">
                  <h4>Fiber架构</h4>
                  <p>全新的调度算法实现增量渲染</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🧪</div>
                <div class="feature-content">
                  <h4>Hooks系统</h4>
                  <p>函数组件中使用状态和生命周期</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔗</div>
                <div class="feature-content">
                  <h4>单向数据流</h4>
                  <p>父组件通过props向子组件传递数据</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card vue">
            <h3>Vue 核心机制</h3>
            <div class="features">
              <div class="feature">
                <div class="feature-icon">🔍</div>
                <div class="feature-content">
                  <h4>响应式系统</h4>
                  <p>基于Proxy的自动依赖追踪</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">📝</div>
                <div class="feature-content">
                  <h4>模板编译</h4>
                  <p>模板编译为高效的渲染函数</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🧩</div>
                <div class="feature-content">
                  <h4>组合式API</h4>
                  <p>类似React Hooks的逻辑复用方式</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">📦</div>
                <div class="feature-content">
                  <h4>依赖注入</h4>
                  <p>provide/inject实现跨组件通信</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 学习曲线对比 -->
      <section class="section learning-section">
        <h2 class="section-title">
          <span class="icon">📚</span>
          学习曲线对比
        </h2>

        <div class="learning-chart">
          <div class="chart-container">
            <div class="chart">
              <div class="chart-title">React学习路径</div>
              <div class="steps">
                <div class="step beginner">HTML/CSS基础</div>
                <div class="step intermediate">JavaScript核心</div>
                <div class="step advanced">JSX语法</div>
                <div class="step expert">组件生命周期</div>
                <div class="step expert">Hooks系统</div>
                <div class="step master">状态管理(Redux)</div>
              </div>
            </div>

            <div class="chart">
              <div class="chart-title">Vue学习路径</div>
              <div class="steps">
                <div class="step beginner">HTML/CSS基础</div>
                <div class="step intermediate">JavaScript核心</div>
                <div class="step intermediate">Vue模板语法</div>
                <div class="step advanced">组件系统</div>
                <div class="step advanced">Vue响应式原理</div>
                <div class="step expert">Vuex/Pinia</div>
              </div>
            </div>
          </div>

          <div class="learning-factors">
            <div class="factor-card">
              <h3>React学习难点</h3>
              <ul>
                <li>JSX语法与JavaScript混合</li>
                <li>Hooks规则和依赖项管理</li>
                <li>状态管理库的选择与集成</li>
                <li>函数式编程概念</li>
                <li>性能优化技巧</li>
              </ul>
            </div>

            <div class="factor-card">
              <h3>Vue学习优势</h3>
              <ul>
                <li>基于HTML的模板语法</li>
                <li>单文件组件结构清晰</li>
                <li>响应式系统自动处理依赖</li>
                <li>官方工具链整合度高</li>
                <li>渐进式采用策略</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能对比 -->
      <section class="section performance-section">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          性能对比
        </h2>

        <div class="performance-metrics">
          <div class="metric-card">
            <h3>渲染性能</h3>
            <div class="metric-chart">
              <div class="metric">
                <div class="label">首次加载</div>
                <div class="bar-container">
                  <div class="bar react" style="width: 65%">650ms</div>
                  <div class="bar vue" style="width: 60%">600ms</div>
                </div>
              </div>
              <div class="metric">
                <div class="label">更新性能</div>
                <div class="bar-container">
                  <div class="bar react" style="width: 75%">75ms</div>
                  <div class="bar vue" style="width: 70%">70ms</div>
                </div>
              </div>
              <div class="metric">
                <div class="label">内存占用</div>
                <div class="bar-container">
                  <div class="bar react" style="width: 80%">3.8MB</div>
                  <div class="bar vue" style="width: 70%">3.4MB</div>
                </div>
              </div>
            </div>
          </div>

          <div class="optimization-card">
            <h3>性能优化策略</h3>
            <div class="strategies">
              <div class="strategy react">
                <h4>React优化</h4>
                <ul>
                  <li>React.memo 避免不必要渲染</li>
                  <li>useMemo/useCallback 缓存计算</li>
                  <li>代码分割和懒加载</li>
                  <li>虚拟化长列表</li>
                  <li>并发模式(Suspense)</li>
                </ul>
              </div>

              <div class="strategy vue">
                <h4>Vue优化</h4>
                <ul>
                  <li>v-once 单次渲染</li>
                  <li>v-memo 缓存模板片段</li>
                  <li>计算属性缓存</li>
                  <li>异步组件</li>
                  <li>响应式数据扁平化</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 生态系统对比 -->
      <section class="section ecosystem-section">
        <h2 class="section-title">
          <span class="icon">🌐</span>
          生态系统对比
        </h2>

        <div class="ecosystem-cards">
          <div class="ecosystem-card react">
            <h3>React生态系统</h3>
            <div class="ecosystem-grid">
              <div class="ecosystem-item">
                <div class="icon">🛠️</div>
                <div class="name">状态管理</div>
                <div class="techs">Redux, MobX, Recoil, Zustand</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">🚏</div>
                <div class="name">路由</div>
                <div class="techs">React Router, Reach Router</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">💅</div>
                <div class="name">样式方案</div>
                <div class="techs">Styled Components, Emotion, CSS Modules</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">📱</div>
                <div class="name">移动端</div>
                <div class="techs">React Native</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">🔍</div>
                <div class="name">测试工具</div>
                <div class="techs">Jest, React Testing Library</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">📦</div>
                <div class="name">SSR框架</div>
                <div class="techs">Next.js, Gatsby, Remix</div>
              </div>
            </div>
          </div>

          <div class="ecosystem-card vue">
            <h3>Vue生态系统</h3>
            <div class="ecosystem-grid">
              <div class="ecosystem-item">
                <div class="icon">🛠️</div>
                <div class="name">状态管理</div>
                <div class="techs">Vuex, Pinia</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">🚏</div>
                <div class="name">路由</div>
                <div class="techs">Vue Router</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">💅</div>
                <div class="name">样式方案</div>
                <div class="techs">Scoped CSS, CSS Modules, UnoCSS</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">📱</div>
                <div class="name">移动端</div>
                <div class="techs">Weex, NativeScript-Vue</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">🔍</div>
                <div class="name">测试工具</div>
                <div class="techs">Vitest, Vue Testing Library</div>
              </div>
              <div class="ecosystem-item">
                <div class="icon">📦</div>
                <div class="name">SSR框架</div>
                <div class="techs">Nuxt.js</div>
              </div>
            </div>
          </div>
        </div>

        <div class="adoption-stats">
          <div class="stat-card">
            <h3>市场采用率</h3>
            <div class="stat-chart">
              <div class="stat">
                <div class="label">全球使用率</div>
                <div class="bar-container">
                  <div class="bar react" style="width: 78%">78%</div>
                  <div class="bar vue" style="width: 52%">52%</div>
                </div>
              </div>
              <div class="stat">
                <div class="label">开发者满意度</div>
                <div class="bar-container">
                  <div class="bar react" style="width: 84%">84%</div>
                  <div class="bar vue" style="width: 91%">91%</div>
                </div>
              </div>
              <div class="stat">
                <div class="label">招聘需求</div>
                <div class="bar-container">
                  <div class="bar react" style="width: 82%">82%</div>
                  <div class="bar vue" style="width: 45%">45%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景推荐 -->
      <section class="section use-cases-section">
        <h2 class="section-title">
          <span class="icon">🎯</span>
          使用场景推荐
        </h2>

        <div class="use-cases">
          <div class="case-card react">
            <h3>选择 React 的场景</h3>
            <ul>
              <li>大型企业级应用开发</li>
              <li>需要跨平台开发(React Native)</li>
              <li>高度交互的数据可视化应用</li>
              <li>需要庞大社区支持的项目</li>
              <li>对函数式编程有要求的团队</li>
              <li>需要最新实验性特性的项目</li>
            </ul>
            <div class="case-examples">
              <div class="example">Facebook</div>
              <div class="example">Instagram</div>
              <div class="example">Netflix</div>
              <div class="example">Airbnb</div>
            </div>
          </div>

          <div class="case-card vue">
            <h3>选择 Vue 的场景</h3>
            <ul>
              <li>中小型项目快速原型开发</li>
              <li>需要渐进式采用框架的项目</li>
              <li>团队JavaScript水平参差不齐</li>
              <li>需要较低学习曲线的项目</li>
              <li>需要更简洁代码风格的项目</li>
              <li>单页面应用(SPA)开发</li>
            </ul>
            <div class="case-examples">
              <div class="example">阿里巴巴</div>
              <div class="example">小米</div>
              <div class="example">GitLab</div>
              <div class="example">任天堂</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section conclusion-section">
        <h2 class="section-title">
          <span class="icon">🏁</span>
          结论总结
        </h2>

        <div class="conclusion-content">
          <div class="conclusion-card">
            <h3>React 优势</h3>
            <ul>
              <li>庞大的开发者社区和生态系统</li>
              <li>Facebook长期维护和支持</li>
              <li>灵活性强，不限制设计模式</li>
              <li>React Native实现跨平台开发</li>
              <li>更高的就业市场需求</li>
            </ul>
          </div>

          <div class="conclusion-card">
            <h3>Vue 优势</h3>
            <ul>
              <li>更平缓的学习曲线</li>
              <li>优秀的开发体验和文档</li>
              <li>内置功能更全面(路由、状态管理)</li>
              <li>更简洁的模板语法</li>
              <li>更高的开发者满意度</li>
            </ul>
          </div>

          <div class="final-verdict">
            <div class="verdict-content">
              <div class="icon">📌</div>
              <h3>最终建议</h3>
              <p>React和Vue都是优秀的前端框架，技术选择应基于项目需求、团队技能和长期维护考虑。</p>
              <p>对于大型复杂应用，React的灵活性和生态系统更具优势；对于中小型项目或快速开发，Vue的简洁性和开发体验更优。</p>
              <p>两者都在持续进化，掌握核心JavaScript能力比框架本身更重要。</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>React vs Vue 对比分析 · {{ currentYear }}</p>
      <div class="resources">
        <a href="https://reactjs.org/" target="_blank" class="resource-link">React官方文档</a>
        <a href="https://vuejs.org/" target="_blank" class="resource-link">Vue官方文档</a>
        <a href="https://2022.stateofjs.com/" target="_blank" class="resource-link">State of JS 2022</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

@primary: #4361ee;
@primary-light: rgba(67, 97, 238, 0.1);
@react-color: #61dafb;
@vue-color: #41b883;
@text-primary: #2b2d42;
@text-secondary: #4a5568;
@border: #e2e8f0;
@background: #f8fafc;
@card-bg: #ffffff;
@success: #06d6a0;
@warning: #ffd166;
@error: #ef476f;

.framework-comparison {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text-primary;
  line-height: 1.6;
  background-color: @background;
}

.comparison-header {
  margin: 30px 0 40px;
  background: linear-gradient(135deg, #f0f4ff, #e6eeff);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(67, 97, 238, 0.15);
  padding: 40px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 10px;
    color: @primary;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    margin-bottom: 30px;
  }
}

.framework-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 30px;

  .logo-card {
    width: 200px;
    height: 200px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &.react {
      background: rgba(97, 218, 251, 0.1);
      border: 1px solid rgba(97, 218, 251, 0.3);
    }

    &.vue {
      background: rgba(65, 184, 131, 0.1);
      border: 1px solid rgba(65, 184, 131, 0.3);
    }

    .logo-icon {
      width: 100px;
      height: 100px;
      margin-bottom: 15px;
    }

    .logo-text {
      font-size: 1.8rem;
      font-weight: 700;

      .react & {
        color: @react-color;
      }

      .vue & {
        color: @vue-color;
      }
    }
  }

  .vs {
    font-size: 1.8rem;
    font-weight: 700;
    color: @text-secondary;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    font-size: 1.4rem;
  }
}

.comparison-table {
  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 15px 20px;
      text-align: left;
    }

    thead {
      background: @primary;
      color: white;

      th {
        font-weight: 600;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid @border;

        &:nth-child(odd) {
          background: rgba(67, 97, 238, 0.03);
        }

        &:last-child {
          border-bottom: none;
        }

        td:first-child {
          font-weight: 500;
        }

        td:nth-child(2) {
          color: @react-color;
          font-weight: 500;
        }

        td:nth-child(3) {
          color: @vue-color;
          font-weight: 500;
        }
      }
    }
  }
}

.comparison-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .card {
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

    h3 {
      margin-top: 0;
      margin-bottom: 25px;
      font-size: 1.4rem;
      padding-bottom: 15px;
      border-bottom: 2px solid;
    }

    &.react {
      border-top: 4px solid @react-color;

      h3 {
        color: @react-color;
        border-bottom-color: rgba(97, 218, 251, 0.3);
      }
    }

    &.vue {
      border-top: 4px solid @vue-color;

      h3 {
        color: @vue-color;
        border-bottom-color: rgba(65, 184, 131, 0.3);
      }
    }
  }
}

.features {
  .feature {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    align-items: flex-start;

    .feature-icon {
      font-size: 1.8rem;
      min-width: 40px;
    }

    .feature-content {
      h4 {
        margin: 0 0 8px;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: @text-secondary;
      }
    }
  }
}

.learning-section {
  .learning-chart {
    .chart-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 30px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .chart {
      background: white;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      .chart-title {
        font-weight: 600;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid @border;
      }
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .step {
        padding: 12px 20px;
        border-radius: 30px;
        font-weight: 500;
        text-align: center;
        transition: all 0.3s ease;

        &:hover {
          transform: translateX(5px);
        }

        &.beginner {
          background: rgba(111, 207, 151, 0.2);
          color: darken(@vue-color, 10%);
        }

        &.intermediate {
          background: rgba(97, 218, 251, 0.2);
          color: darken(@react-color, 10%);
        }

        &.advanced {
          background: rgba(67, 97, 238, 0.2);
          color: darken(@primary, 10%);
        }

        &.expert {
          background: rgba(239, 71, 111, 0.2);
          color: darken(@error, 10%);
        }

        &.master {
          background: rgba(6, 214, 160, 0.2);
          color: darken(@success, 20%);
        }
      }
    }
  }

  .learning-factors {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .factor-card {
      background: white;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      h3 {
        margin-top: 0;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid @border;
      }

      ul {
        margin: 0;
        padding-left: 20px;

        li {
          margin-bottom: 10px;
          position: relative;
          padding-left: 20px;

          &:before {
            content: "•";
            color: @primary;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}

.performance-section {
  .performance-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .metric-card {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      margin-bottom: 25px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }
  }

  .metric {
    margin-bottom: 20px;

    .label {
      font-weight: 500;
      margin-bottom: 8px;
    }

    .bar-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .bar {
      height: 35px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: white;
      font-weight: 500;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

      &.react {
        background: linear-gradient(90deg, @react-color, lighten(@react-color, 15%));
        justify-content: flex-start;
      }

      &.vue {
        background: linear-gradient(90deg, @vue-color, lighten(@vue-color, 15%));
        justify-content: flex-end;
      }
    }
  }

  .optimization-card {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      margin-bottom: 25px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }

    .strategies {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .strategy {
      padding: 20px;
      border-radius: 12px;

      h4 {
        margin-top: 0;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid @border;
      }

      &.react {
        background: rgba(97, 218, 251, 0.05);
        border-top: 3px solid @react-color;
      }

      &.vue {
        background: rgba(65, 184, 131, 0.05);
        border-top: 3px solid @vue-color;
      }

      ul {
        margin: 0;
        padding-left: 20px;

        li {
          margin-bottom: 10px;
          position: relative;
          padding-left: 20px;

          &:before {
            content: "•";
            color: @primary;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}

.ecosystem-section {
  .ecosystem-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .ecosystem-card {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

    h3 {
      margin-top: 0;
      margin-bottom: 25px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }

    &.react {
      border-top: 4px solid @react-color;
    }

    &.vue {
      border-top: 4px solid @vue-color;
    }
  }

  .ecosystem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .ecosystem-item {
    padding: 20px;
    border-radius: 12px;
    background: rgba(67, 97, 238, 0.03);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    .icon {
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    .name {
      font-weight: 500;
      margin-bottom: 8px;
    }

    .techs {
      font-size: 0.9rem;
      color: @text-secondary;
      line-height: 1.5;
    }
  }

  .adoption-stats {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      margin-bottom: 25px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }
  }

  .stat {
    margin-bottom: 20px;

    .label {
      font-weight: 500;
      margin-bottom: 8px;
    }

    .bar-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .bar {
      height: 30px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: white;
      font-weight: 500;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

      &.react {
        background: linear-gradient(90deg, @react-color, lighten(@react-color, 15%));
        justify-content: flex-start;
      }

      &.vue {
        background: linear-gradient(90deg, @vue-color, lighten(@vue-color, 15%));
        justify-content: flex-end;
      }
    }
  }
}

.use-cases-section {
  .use-cases {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .case-card {
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

    h3 {
      margin-top: 0;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }

    ul {
      margin: 0 0 20px;
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 20px;

        &:before {
          content: "•";
          color: @primary;
          position: absolute;
          left: 0;
        }
      }
    }

    &.react {
      border-top: 4px solid @react-color;
    }

    &.vue {
      border-top: 4px solid @vue-color;
    }
  }

  .case-examples {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .example {
      background: rgba(67, 97, 238, 0.08);
      padding: 8px 15px;
      border-radius: 30px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
}

.conclusion-section {
  .conclusion-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .conclusion-card {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 20px;

        &:before {
          content: "•";
          color: @primary;
          position: absolute;
          left: 0;
        }
      }
    }
  }

  .final-verdict {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    color: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(67, 97, 238, 0.3);

    .verdict-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;

      .icon {
        font-size: 3rem;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 1.8rem;
        margin: 0 0 20px;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.7;
        margin: 0 0 15px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid @border;
  color: @text-secondary;

  .resources {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;

    .resource-link {
      color: @primary;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .comparison-header {
    padding: 30px 20px;
  }

  .section {
    padding: 25px 20px;
  }

  .section-title {
    font-size: 1.4rem;
  }
}
</style>
