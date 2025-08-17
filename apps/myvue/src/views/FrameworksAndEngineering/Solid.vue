<script setup lang="ts">
import { ref } from 'vue';

// 性能对比数据
const performanceData = ref([
  { framework: 'SolidJS', speed: 100, memory: 100 },
  { framework: 'Svelte', speed: 95, memory: 95 },
  { framework: 'Vue', speed: 85, memory: 90 },
  { framework: 'React', speed: 70, memory: 80 },
  { framework: 'Angular', speed: 60, memory: 70 },
]);

// 学习曲线评分
const learningCurveData = ref([
  { framework: 'SolidJS', difficulty: 7, popularity: 8 },
  { framework: 'Svelte', difficulty: 5, popularity: 7 },
  { framework: 'Vue', difficulty: 4, popularity: 9 },
  { framework: 'React', difficulty: 6, popularity: 10 },
  { framework: 'Angular', difficulty: 8, popularity: 7 },
]);

// 生态库列表
const libraries = ref([
  { name: 'Solid Start', category: '框架', description: 'Solid的元框架，类似Next.js/Nuxt' },
  { name: 'Solid Router', category: '路由', description: '官方路由解决方案' },
  { name: 'Solid Store', category: '状态管理', description: '响应式状态管理工具' },
  { name: 'Solid Styled Components', category: '样式', description: 'CSS-in-JS解决方案' },
  { name: 'Solid Testing Library', category: '测试', description: '组件测试工具' },
  { name: 'Motion One', category: '动画', description: '高性能动画库' },
]);
</script>

<template>
  <div class="solid-intro">
    <header class="hero">
      <div class="logo-container">
        <div class="solid-logo">S</div>
        <h1>SolidJS 框架介绍</h1>
      </div>
      <p class="subtitle">高性能、响应式的前端框架</p>
      <p><a href="https://solid.yayujs.com/" target="_blank">SolidJS 官方文档</a></p>
    </header>

    <main class="content">
      <!-- 介绍部分 -->
      <section class="section intro-section">
        <h2 class="section-title">什么是 SolidJS？</h2>
        <div class="card">
          <p>SolidJS 是一个用于构建用户界面的声明式 JavaScript 库，由 Ryan Carniato 创建。</p>
          <p>它结合了 React 的声明式组件模型和 Svelte 的编译时优化理念，同时提供了接近原生 JavaScript 的性能。</p>

          <div class="highlight-box">
            <h3>核心理念</h3>
            <ul>
              <li>真正的响应式系统（基于细粒度响应式原语）</li>
              <li>编译时优化（无虚拟DOM）</li>
              <li>接近原生性能的执行效率</li>
              <li>极小的包体积</li>
              <li>类似 React 的 JSX 语法</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 学习曲线 -->
      <section class="section learning-section">
        <h2 class="section-title">学习曲线</h2>
        <div class="comparison-grid">
          <div class="comparison-card">
            <h3>对于 React 开发者</h3>
            <p>如果你熟悉 React，Solid 的学习曲线相对平缓：</p>
            <ul>
              <li>相似的 JSX 语法和组件结构</li>
              <li>Hook 风格 API（createEffect, createMemo 等）</li>
              <li>不同的响应式实现原理</li>
              <li>需要理解"编译时"优化的思想</li>
            </ul>
            <div class="rating">适应难度：★★★☆☆</div>
          </div>

          <div class="comparison-card">
            <h3>对于 Vue 开发者</h3>
            <p>Vue 开发者需要适应一些新概念：</p>
            <ul>
              <li>JSX 替代模板语法</li>
              <li>更显式的响应式系统</li>
              <li>函数式组件风格</li>
              <li>没有类似 Vue 的"选项式"API</li>
            </ul>
            <div class="rating">适应难度：★★★★☆</div>
          </div>

          <div class="comparison-card">
            <h3>对于新手开发者</h3>
            <p>对于完全的新手：</p>
            <ul>
              <li>需要理解响应式编程概念</li>
              <li>JSX 语法需要学习</li>
              <li>概念较少，核心API精简</li>
              <li>优秀的文档和示例</li>
            </ul>
            <div class="rating">适应难度：★★★☆☆</div>
          </div>
        </div>
      </section>

      <!-- 特点 -->
      <section class="section features-section">
        <h2 class="section-title">核心特点</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>极致性能</h3>
            <p>Solid 在多个基准测试中表现优于 React、Vue 和 Svelte，接近原生 JavaScript 性能。</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📦</div>
            <h3>微小体积</h3>
            <p>运行时仅 6-7KB（gzip），比大多数框架小一个数量级，编译后的代码非常精简。</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🧠</div>
            <h3>编译时优化</h3>
            <p>Solid 在构建时进行优化，消除虚拟 DOM 开销，生成最高效的更新代码。</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>细粒度响应式</h3>
            <p>基于 Signal 的响应式系统，只更新实际变化的 DOM 部分，没有组件树重新渲染。</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>单向数据流</h3>
            <p>简单可预测的数据流模型，易于调试和跟踪状态变化。</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>灵活的模板</h3>
            <p>支持 JSX、模板字符串或 HyperScript，开发者可以选择最喜欢的模板方式。</p>
          </div>
        </div>
      </section>

      <!-- 性能对比 -->
      <section class="section performance-section">
        <h2 class="section-title">性能对比</h2>
        <div class="performance-chart">
          <div class="chart-header">
            <div class="chart-label">框架</div>
            <div class="chart-bar-label">速度(越高越好)</div>
            <div class="chart-bar-label">内存效率(越高越好)</div>
          </div>

          <div
            v-for="(item, index) in performanceData"
            :key="index"
            class="chart-row"
          >
            <div class="chart-label">{{ item.framework }}</div>
            <div class="chart-bar">
              <div
                class="bar speed-bar"
                :style="{ width: item.speed + '%' }"
              >
                {{ item.speed }}
              </div>
            </div>
            <div class="chart-bar">
              <div
                class="bar memory-bar"
                :style="{ width: item.memory + '%' }"
              >
                {{ item.memory }}
              </div>
            </div>
          </div>
        </div>

        <div class="performance-notes">
          <p>注：性能数据基于 Krausest js-framework-benchmark 测试结果（2023年）</p>
        </div>
      </section>

      <!-- 生态系统 -->
      <section class="section ecosystem-section">
        <h2 class="section-title">生态系统</h2>
        <div class="ecosystem-grid">
          <div class="ecosystem-card">
            <h3>核心库</h3>
            <ul>
              <li><strong>solid-js</strong> - 核心运行时</li>
              <li><strong>solid-js/web</strong> - DOM 渲染器</li>
              <li><strong>solid-js/store</strong> - 状态管理</li>
              <li><strong>solid-js/html</strong> - HTML 模板标签</li>
            </ul>
          </div>

          <div class="ecosystem-card">
            <h3>路由</h3>
            <ul>
              <li><strong>solid-router</strong> - 官方路由解决方案</li>
              <li><strong>solid-app-router</strong> - 实验性路由</li>
              <li><strong>@solidjs/router</strong> - 最新路由库</li>
            </ul>
          </div>

          <div class="ecosystem-card">
            <h3>UI 框架</h3>
            <ul>
              <li><strong>solid-styled-components</strong> - CSS-in-JS</li>
              <li><strong>suid</strong> - Material UI 实现</li>
              <li><strong>solid-bootstrap</strong> - Bootstrap 组件</li>
              <li><strong>hope-ui</strong> - 类 Chakra UI 组件库</li>
            </ul>
          </div>
        </div>

        <h3 class="libraries-title">常用库</h3>
        <div class="libraries-grid">
          <div
            v-for="(lib, index) in libraries"
            :key="index"
            class="library-card"
          >
            <div class="library-category">{{ lib.category }}</div>
            <div class="library-name">{{ lib.name }}</div>
            <div class="library-description">{{ lib.description }}</div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2023 SolidJS 介绍 | 使用 Vue 3 + TypeScript 构建</p>
      <p>数据来源：SolidJS 官方文档及社区资源</p>
    </footer>
  </div>
</template>

<style lang="less" scoped>
// 颜色变量
@primary-color: #2c4f7c;
@secondary-color: #4a6fa5;
@accent-color: #ff6b6b;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #333333;
@text-light: #666666;
@border-color: #e0e0e0;
@success-color: #4caf50;
@warning-color: #ff9800;
@info-color: #2196f3;

// 字体
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

// 混合
.shadow-card() {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.12);
  }
}

// 全局样式
.solid-intro {
  font-family: @font-family;
  background-color: @background-color;
  color: @text-color;
  line-height: 1.6;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

// 页头样式
.hero {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  padding: 3rem 1.5rem;
  text-align: center;
  border-radius: 0 0 20px 20px;
  margin-bottom: 2rem;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .solid-logo {
    width: 60px;
    height: 60px;
    background: white;
    color: @primary-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    .shadow-card();
  }

  h1 {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-top: 0.5rem;
    font-weight: 300;
  }
}

// 内容区域
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

// 章节标题
.section-title {
  font-size: 1.75rem;
  color: @primary-color;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid @border-color;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: @accent-color;
  }
}

// 卡片样式
.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem;
  .shadow-card();

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
}

.highlight-box {
  background: lighten(@info-color, 45%);
  border-left: 4px solid @info-color;
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;

  h3 {
    margin-top: 0;
    color: darken(@info-color, 15%);
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

// 学习曲线部分
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.comparison-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem;
  .shadow-card();

  h3 {
    color: @primary-color;
    margin-top: 0;
  }

  ul {
    padding-left: 1.25rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  .rating {
    background: lighten(@warning-color, 40%);
    color: darken(@warning-color, 20%);
    padding: 0.5rem;
    border-radius: 6px;
    font-weight: 600;
    margin-top: 1rem;
    text-align: center;
  }
}

// 特点部分
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem;
  .shadow-card();
  text-align: center;

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: @text-light;
    margin-bottom: 0;
  }
}

// 性能图表
.performance-section {
  margin-bottom: 3rem;
}

.performance-chart {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem;
  .shadow-card();
  margin-bottom: 1rem;
}

.chart-header {
  display: grid;
  grid-template-columns: 120px 1fr 1fr;
  gap: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid @border-color;
}

.chart-row {
  display: grid;
  grid-template-columns: 120px 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;
  align-items: center;
}

.chart-label {
  font-weight: 500;
}

.chart-bar {
  background: lighten(@border-color, 5%);
  border-radius: 4px;
  height: 30px;
  position: relative;
}

.bar {
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  color: white;
  font-weight: 500;
  font-size: 0.85rem;
  min-width: 40px;
}

.speed-bar {
  background: linear-gradient(90deg, lighten(@success-color, 10%), @success-color);
}

.memory-bar {
  background: linear-gradient(90deg, lighten(@info-color, 10%), @info-color);
}

.performance-notes {
  font-size: 0.85rem;
  color: @text-light;
  text-align: right;
}

// 生态系统部分
.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.ecosystem-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem;
  .shadow-card();

  h3 {
    color: @primary-color;
    margin-top: 0;
    border-bottom: 1px solid @border-color;
    padding-bottom: 0.5rem;
  }

  ul {
    padding-left: 1.25rem;

    li {
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }
  }
}

.libraries-title {
  font-size: 1.5rem;
  color: @primary-color;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
}

.libraries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.library-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.25rem;
  .shadow-card();
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
  }
}

.library-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: @text-light;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.library-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: @primary-color;
  margin-bottom: 0.5rem;
}

.library-description {
  color: @text-light;
  font-size: 0.95rem;
  line-height: 1.6;
}

// 页脚样式
.footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  background: @card-bg;
  border-top: 1px solid @border-color;
  color: @text-light;
  font-size: 0.9rem;

  p {
    margin: 0.3rem 0;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }

  .performance-chart,
  .chart-header,
  .chart-row {
    grid-template-columns: 1fr;
  }

  .chart-header {
    display: none;
  }

  .chart-row {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid @border-color;
    padding-bottom: 1rem;
  }

  .chart-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
}
</style>
