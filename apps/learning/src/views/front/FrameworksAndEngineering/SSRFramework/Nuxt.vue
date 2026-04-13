<template>
  <div class="nuxt-container">
    <header class="header">
      <h1>Nuxt.js 框架介绍</h1>
      <p class="subtitle">基于 Vue.js 的通用应用框架</p>
      <p><a href="https://nuxtjs.org.cn/" target="_blank">官方文档</a></p>
    </header>

    <div class="intro-section">
      <div class="logo-container">
        <div class="nuxt-logo">
          <span class="n">N</span>
          <span class="u">U</span>
          <span class="x">X</span>
          <span class="t">T</span>
        </div>
      </div>
      <p class="intro-text">
        Nuxt.js 是一个基于 Vue.js 的轻量级应用框架，用于创建现代、高性能的 Web 应用程序。它简化了通用应用（SSR）、静态站点生成（SSG）和单页应用（SPA）的开发流程。
      </p>
    </div>

    <section class="content-section">
      <h2 class="section-title">
        <span class="icon">🛠️</span>
        Nuxt.js 的核心作用
      </h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>服务器端渲染 (SSR)</h3>
          <p>提供开箱即用的服务器端渲染支持，改善 SEO 和首屏加载性能。</p>
        </div>
        <div class="feature-card">
          <h3>静态站点生成 (SSG)</h3>
          <p>可以预渲染所有页面为静态 HTML，适合内容为主的网站。</p>
        </div>
        <div class="feature-card">
          <h3>自动路由系统</h3>
          <p>基于文件结构自动生成路由配置，无需手动编写路由表。</p>
        </div>
        <div class="feature-card">
          <h3>模块化架构</h3>
          <p>通过模块系统轻松集成第三方库和服务。</p>
        </div>
        <div class="feature-card">
          <h3>开发便利性</h3>
          <p>内置 Webpack、Babel、热更新等，简化开发配置。</p>
        </div>
        <div class="feature-card">
          <h3>约定优于配置</h3>
          <p>通过合理的默认设置减少决策和配置时间。</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">
        <span class="icon">📦</span>
        重要概念
      </h2>
      <div class="concepts-list">
        <div class="concept-item">
          <h3>页面 (Pages)</h3>
          <p><code>pages/</code> 目录下的 Vue 文件会自动转换为路由。文件结构决定路由路径。</p>
          <pre>pages/
  index.vue        → /
  about.vue        → /about
  users/
    index.vue      → /users
    _id.vue        → /users/:id</pre>
        </div>
        <div class="concept-item">
          <h3>布局 (Layouts)</h3>
          <p>可复用的页面包装器，用于定义公共结构（如页眉、页脚）。</p>
          <pre>layouts/
  default.vue      → 默认布局
  admin.vue        → 管理后台布局</pre>
        </div>
        <div class="concept-item">
          <h3>组件 (Components)</h3>
          <p><code>components/</code> 目录下的 Vue 组件会自动导入，无需手动导入。</p>
        </div>
        <div class="concept-item">
          <h3>中间件 (Middleware)</h3>
          <p>在页面渲染前执行的函数，用于身份验证、日志等。</p>
        </div>
        <div class="concept-item">
          <h3>插件 (Plugins)</h3>
          <p>用于扩展 Vue 功能或添加第三方库。</p>
        </div>
        <div class="concept-item">
          <h3>Nuxt 配置</h3>
          <p><code>nuxt.config.ts</code> 文件用于自定义 Nuxt 应用的行为。</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">
        <span class="icon">🚀</span>
        快速开始
      </h2>
      <div class="quick-start">
        <h3>创建新项目</h3>
        <pre class="code-block">npx nuxi init my-app
cd my-app
npm install
npm run dev</pre>

        <h3>项目结构</h3>
        <div class="folder-structure">
          <pre>my-app/
├── assets/        # 静态资源
├── components/    # Vue 组件
├── composables/   # 组合式函数
├── layouts/       # 布局文件
├── pages/         # 页面组件
├── public/        # 公共文件
├── server/        # 服务器 API
└── nuxt.config.ts # Nuxt 配置</pre>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">
        <span class="icon">🎯</span>
        适用场景
      </h2>
      <div class="use-cases">
        <div class="use-case">
          <h3>内容网站</h3>
          <p>博客、新闻、文档等需要良好 SEO 的网站。</p>
        </div>
        <div class="use-case">
          <h3>电子商务</h3>
          <p>产品展示、购物车等需要快速首屏渲染的场景。</p>
        </div>
        <div class="use-case">
          <h3>企业应用</h3>
          <p>需要 SSR 或混合渲染的管理系统。</p>
        </div>
        <div class="use-case">
          <h3>渐进式 Web 应用</h3>
          <p>结合 PWA 模块创建离线可用的应用。</p>
        </div>
      </div>

      <div class="rendering-modes">
        <h3>渲染模式选择</h3>
        <table>
          <thead>
            <tr>
              <th>模式</th>
              <th>命令</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>通用 (SSR)</td>
              <td><code>npm run build</code></td>
              <td>需要 SEO 的动态应用</td>
            </tr>
            <tr>
              <td>静态 (SSG)</td>
              <td><code>npm run generate</code></td>
              <td>内容为主的网站</td>
            </tr>
            <tr>
              <td>单页 (SPA)</td>
              <td><code>npm run build</code> + <code>ssr: false</code></td>
              <td>不需要 SEO 的 Web 应用</td>
            </tr>
            <tr>
              <td>混合</td>
              <td>配置特定路由</td>
              <td>部分页面需要 SSR/SSG</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">
        <span class="icon">⚖️</span>
        优势与考量
      </h2>
      <div class="pros-cons">
        <div class="pros">
          <h3>优势</h3>
          <ul>
            <li>简化 Vue 项目的复杂配置</li>
            <li>优秀的 SEO 支持</li>
            <li>更快的首屏渲染</li>
            <li>丰富的模块生态系统</li>
            <li>自动代码分割</li>
            <li>开发体验优秀</li>
          </ul>
        </div>
        <div class="cons">
          <h3>考量</h3>
          <ul>
            <li>学习曲线略高于纯 Vue</li>
            <li>SSR 需要 Node.js 服务器</li>
            <li>某些第三方库可能需要额外配置</li>
            <li>部署比纯静态站点复杂</li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>Nuxt.js 3 是构建现代 Vue 应用的强大框架，适合各种规模的 Web 项目。</p>
      <div class="links">
        <a href="https://nuxt.com/" target="_blank" class="link-button">官方文档</a>
        <a href="https://github.com/nuxt/nuxt" target="_blank" class="link-button">GitHub</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>
.nuxt-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #1a1a1a;
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #00dc82;
      margin-bottom: 0.5rem;
      letter-spacing: -0.025em;
    }

    .subtitle {
      font-size: 1.25rem;
      color: #64748b;
      font-weight: 400;
    }
  }

  .intro-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3rem;

    .logo-container {
      margin-bottom: 1.5rem;
    }

    .nuxt-logo {
      display: flex;
      font-size: 3rem;
      font-weight: 800;

      .n { color: #00dc82; }
      .u { color: #2f855a; }
      .x { color: #38b2ac; }
      .t { color: #4299e1; }
    }

    .intro-text {
      max-width: 800px;
      text-align: center;
      font-size: 1.1rem;
      line-height: 1.7;
      color: #334155;
    }
  }

  .content-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 0.75rem;
        font-size: 1.5rem;
      }
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;

    .feature-card {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #00dc82;
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: #1e293b;
      }

      p {
        margin: 0;
        color: #475569;
        font-size: 0.95rem;
      }
    }
  }

  .concepts-list {
    display: grid;
    gap: 1.5rem;

    .concept-item {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #4299e1;

      h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: #1e293b;
      }

      p {
        margin: 0 0 1rem 0;
        color: #475569;
      }

      pre {
        background-color: #f8fafc;
        padding: 1rem;
        border-radius: 0.375rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
        overflow-x: auto;
        margin: 0;
        color: #334155;
        border: 1px solid #e2e8f0;
      }
    }
  }

  .quick-start {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 1rem;
      color: #1e293b;
    }

    .code-block {
      background-color: #f8fafc;
      padding: 1rem;
      border-radius: 0.375rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
      margin: 0 0 1.5rem 0;
      color: #334155;
      border: 1px solid #e2e8f0;
    }

    .folder-structure {
      background-color: #f8fafc;
      padding: 1rem;
      border-radius: 0.375rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: #334155;
      border: 1px solid #e2e8f0;
    }
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .use-case {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-top: 4px solid #38b2ac;

      h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: #1e293b;
      }

      p {
        margin: 0;
        color: #475569;
        font-size: 0.95rem;
      }
    }
  }

  .rendering-modes {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow-x: auto;

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 1rem;
      color: #1e293b;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }

      th {
        background-color: #f8fafc;
        font-weight: 600;
        color: #1e293b;
      }

      tr:nth-child(even) {
        background-color: #f8fafc;
      }

      code {
        background-color: #edf2f7;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
        color: #2d3748;
      }
    }
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros, .cons {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 1rem;
        color: #1e293b;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          color: #475569;
        }
      }
    }

    .pros {
      border-top: 4px solid #00dc82;
    }

    .cons {
      border-top: 4px solid #f56565;
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;

    p {
      color: #475569;
      margin-bottom: 1.5rem;
    }

    .links {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .link-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #00dc82;
      color: white;
      text-decoration: none;
      border-radius: 0.375rem;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover {
        background-color: #2f855a;
      }

      &:last-child {
        background-color: #4299e1;

        &:hover {
          background-color: #2b6cb0;
        }
      }
    }
  }
}
</style>
