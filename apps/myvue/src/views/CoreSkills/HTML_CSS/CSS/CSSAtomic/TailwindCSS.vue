<template>
  <div class="tailwind-container">
    <header class="header">
      <div class="logo-container">
        <div class="tailwind-logo">
          <div class="logo-circle logo-blue"></div>
          <div class="logo-circle logo-teal"></div>
          <div class="logo-circle logo-green"></div>
        </div>
        <h1>Tailwind CSS</h1>
      </div>
      <p class="subtitle">实用优先的CSS框架，快速构建现代网站</p>
    </header>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
        </div>
        <h2>官方网站</h2>
      </div>
      <div class="section-content">
        <a href="https://www.tailwindcss.cn/docs" target="_blank" class="official-link">
          https://www.tailwindcss.cn/docs
        </a>
        <p class="section-description">
          Tailwind CSS官方文档提供了完整的指南、API参考和示例，是学习该框架的最佳资源。
        </p>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h2>核心概念</h2>
      </div>
      <div class="section-content">
        <div class="concept-grid">
          <div class="concept-card">
            <h3>实用优先</h3>
            <p>Tailwind提供低级别的实用类，让您直接在HTML中构建任何设计，无需编写自定义CSS。</p>
          </div>
          <div class="concept-card">
            <h3>响应式设计</h3>
            <p>通过添加响应式前缀（如md:, lg:）轻松创建响应式布局，无需媒体查询。</p>
          </div>
          <div class="concept-card">
            <h3>高度可定制</h3>
            <p>通过配置文件自定义颜色、间距、字体等设计系统，满足项目需求。</p>
          </div>
          <div class="concept-card">
            <h3>JIT模式</h3>
            <p>即时生成模式(JIT)按需生成样式，显著减少CSS文件大小并提高开发速度。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h2>代码示例</h2>
      </div>
      <div class="section-content">
        <div class="code-example">
          <div class="code-header">按钮组件</div>
          <pre><code>&lt;button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"&gt;
  点击我
&lt;/button&gt;</code></pre>
          <div class="code-preview">
            <button class="example-button">点击我</button>
          </div>
        </div>

        <div class="code-example">
          <div class="code-header">卡片组件</div>
          <pre><code>&lt;div class="max-w-sm rounded-xl overflow-hidden shadow-lg"&gt;
  &lt;img class="w-full" src="/img/card-top.jpg" alt="Card image"&gt;
  &lt;div class="px-6 py-4"&gt;
    &lt;div class="font-bold text-xl mb-2"&gt;卡片标题&lt;/div&gt;
    &lt;p class="text-gray-700 text-base"&gt;
      这是一个使用Tailwind CSS构建的卡片组件示例。
    &lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
          <div class="code-preview">
            <div class="example-card">
              <div class="card-image"></div>
              <div class="card-content">
                <div class="card-title">卡片标题</div>
                <p class="card-text">这是一个使用Tailwind CSS构建的卡片组件示例。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <h2>使用场景</h2>
      </div>
      <div class="section-content">
        <div class="scenario-grid">
          <div class="scenario-card">
            <h3>快速原型设计</h3>
            <p>通过组合实用类快速构建UI原型，无需编写自定义CSS。</p>
          </div>
          <div class="scenario-card">
            <h3>设计系统开发</h3>
            <p>使用配置文件定义设计约束，确保设计一致性。</p>
          </div>
          <div class="scenario-card">
            <h3>响应式网站</h3>
            <p>轻松创建适应不同屏幕尺寸的响应式布局。</p>
          </div>
          <div class="scenario-card">
            <h3>组件库开发</h3>
            <p>构建可复用的UI组件库，保持样式一致性。</p>
          </div>
          <div class="scenario-card">
            <h3>与框架集成</h3>
            <p>完美支持React、Vue、Angular等现代前端框架。</p>
          </div>
          <div class="scenario-card">
            <h3>主题定制</h3>
            <p>通过配置文件轻松创建自定义主题，满足品牌需求。</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Tailwind CSS 是一个功能强大、高度可定制的实用优先CSS框架，帮助开发人员快速构建现代用户界面。</p>
      <div class="footer-links">
        <a href="https://tailwindcss.com/docs" target="_blank">文档</a>
        <a href="https://github.com/tailwindlabs/tailwindcss" target="_blank">GitHub</a>
        <a href="https://tailwindui.com" target="_blank">Tailwind UI</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要响应式数据，纯展示组件
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量 - Tailwind主题色
@tailwind-blue: #3b82f6;
@tailwind-teal: #14b8a6;
@tailwind-green: #10b981;
@background: #f9fafb;
@card-bg: #ffffff;
@text-color: #1f2937;
@text-secondary: #6b7280;
@border-color: #e5e7eb;
@code-bg: #1e293b;
@header-bg: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);

// 混合宏
.box-shadow() {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

// 基础样式
.tailwind-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-color;
  background-color: @background;
}

.header {
  background: @header-bg;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  .box-shadow();

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .tailwind-logo {
    position: relative;
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;

    .logo-circle {
      position: absolute;
      border-radius: 50%;
      .transition();
    }

    .logo-blue {
      width: 80px;
      height: 80px;
      background-color: fade(@tailwind-blue, 15%);
      top: 0;
      left: 0;
      animation: pulse-blue 3s infinite;
    }

    .logo-teal {
      width: 60px;
      height: 60px;
      background-color: fade(@tailwind-teal, 15%);
      top: 10px;
      left: 10px;
      animation: pulse-teal 3s infinite 0.5s;
    }

    .logo-green {
      width: 40px;
      height: 40px;
      background-color: fade(@tailwind-green, 15%);
      top: 20px;
      left: 20px;
      animation: pulse-green 3s infinite 1s;
    }
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    background: linear-gradient(90deg, @tailwind-blue 0%, @tailwind-teal 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    letter-spacing: -0.025em;
  }

  .subtitle {
    font-size: 1.25rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.content-section {
  background: @card-bg;
  border-radius: 16px;
  overflow: hidden;
  .box-shadow();
  margin-bottom: 2rem;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(90deg, @tailwind-blue 0%, @tailwind-teal 100%);

    .section-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      margin-right: 1rem;

      svg {
        width: 24px;
        height: 24px;
        color: white;
      }
    }

    h2 {
      font-size: 1.4rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
  }

  .section-content {
    padding: 2rem;
  }
}

.official-link {
  display: inline-block;
  background: fade(@tailwind-blue, 10%);
  color: @tailwind-blue;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  text-decoration: none;
  .transition();

  &:hover {
    background: fade(@tailwind-blue, 20%);
  }
}

.section-description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: @text-secondary;
  max-width: 800px;
}

.concept-grid,
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.concept-card,
.scenario-card {
  background: fade(@tailwind-blue, 3%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid fade(@tailwind-blue, 10%);
  .transition();

  &:hover {
    transform: translateY(-3px);
    border-color: fade(@tailwind-blue, 20%);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  h3 {
    font-size: 1.2rem;
    color: @tailwind-blue;
    margin-top: 0;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: @tailwind-teal;
      margin-right: 0.75rem;
    }
  }

  p {
    margin: 0;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.code-example {
  margin-bottom: 2.5rem;

  .code-header {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
    color: @tailwind-blue;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: @tailwind-teal;
      margin-right: 0.75rem;
    }
  }

  pre {
    background: @code-bg;
    border-radius: 10px;
    padding: 1.25rem;
    overflow-x: auto;
    margin-bottom: 1.25rem;

    code {
      color: #cbd5e1;
      font-family: 'Fira Code', 'Source Code Pro', monospace;
      font-size: 0.95rem;
      line-height: 1.5;

      .tag {
        color: #f87171;
      }

      .attr {
        color: #60a5fa;
      }

      .value {
        color: #34d399;
      }
    }
  }
}

.code-preview {
  border: 1px solid @border-color;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  background: white;
}

.example-button {
  padding: 0.75rem 1.5rem;
  background: @tailwind-blue;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  .transition();

  &:hover {
    background: darken(@tailwind-blue, 10%);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
  }
}

.example-card {
  max-width: 320px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -2px rgba(0, 0, 0, 0.03);

  .card-image {
    height: 160px;
    background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%);
  }

  .card-content {
    padding: 1.5rem;

    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: @text-color;
    }

    .card-text {
      color: @text-secondary;
      line-height: 1.6;
      margin: 0;
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  color: @text-secondary;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;

    a {
      color: @tailwind-blue;
      text-decoration: none;
      font-weight: 500;
      .transition();

      &:hover {
        color: darken(@tailwind-blue, 15%);
        text-decoration: underline;
      }
    }
  }
}

// 动画
@keyframes pulse-blue {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes pulse-teal {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes pulse-green {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .tailwind-container {
    padding: 1.25rem;
  }

  .header {
    padding: 2rem 1rem;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .content-section .section-content {
    padding: 1.5rem;
  }

  .concept-grid,
  .scenario-grid {
    grid-template-columns: 1fr;
  }
}
</style>
