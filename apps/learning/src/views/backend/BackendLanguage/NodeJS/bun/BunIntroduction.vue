<template>
  <div class="bun-intro">
    <div class="container">
      <!-- Hero 区域 -->
      <header class="hero">
        <div class="hero-badge">⚡ 下一代 JavaScript 运行时</div>
        <h1>
          Bun
          <span class="accent">· 极速全能</span>
        </h1>
        <p class="subtitle">
          一个集运行时、包管理器、打包工具、测试运行器于一体的现代化工具链
        </p>
        <div class="hero-stats">
          <span>🚀 启动速度提升 4x</span>
          <span>📦 安装依赖快 10-100x</span>
          <span>🟦 原生 TypeScript 支持</span>
        </div>
      </header>

      <!-- 什么是 Bun -->
      <section class="section">
        <h2>📌 什么是 Bun？</h2>
        <div class="card">
          <p>
            <strong>Bun</strong> 是一个从头构建的 JavaScript/TypeScript
            运行时，同时集成了<strong>包管理器</strong>、<strong>打包工具</strong>和<strong>测试运行器</strong>。
            它旨在替代 Node.js、npm、esbuild 等众多工具，提供统一、高性能的开发体验。
          </p>
          <p>
            Bun 专注于性能，启动速度极快，原生支持 TypeScript、JSX，并且能够直接运行 CommonJS 和 ESM 模块，无需任何配置。
          </p>
        </div>
      </section>

      <!-- 核心优势 网格 -->
      <section class="section">
        <h2>✨ 核心优势</h2>
        <div class="advantages-grid">
          <div class="advantage-card">
            <div class="icon">⚡</div>
            <h3>极速性能</h3>
            <p>启动速度比 Node.js 快 4 倍，执行速度极快，包管理速度比 npm/pnpm 快 10-100 倍。</p>
          </div>
          <div class="advantage-card">
            <div class="icon">🟦</div>
            <h3>原生 TypeScript</h3>
            <p>无需额外配置即可直接运行 .ts 和 .tsx 文件，内置类型检查与转译。</p>
          </div>
          <div class="advantage-card">
            <div class="icon">🧩</div>
            <h3>一体化工具链</h3>
            <p>内置包管理器 (bun install)、打包器 (bun build)、测试运行器 (bun test)，告别工具碎片化。</p>
          </div>
          <div class="advantage-card">
            <div class="icon">🌿</div>
            <h3>兼容 Node.js 生态</h3>
            <p>支持绝大部分 npm 包，兼容 CommonJS/ESM，可无缝迁移现有项目。</p>
          </div>
        </div>
      </section>

      <!-- 底层实现 -->
      <section class="section">
        <h2>⚙️ 底层实现</h2>
        <div class="card">
          <ul class="feature-list">
            <li><strong>编程语言</strong>：使用 <code>Zig</code> 语言编写，具备底层内存控制和高性能特性。</li>
            <li><strong>JavaScript 引擎</strong>：基于 <strong>JavaScriptCore</strong>（Safari 引擎），而非 V8，启动开销更低、内存占用更少。</li>
            <li><strong>异步 I/O</strong>：使用自定义的事件循环和系统调用优化，最大限度提高吞吐量。</li>
            <li><strong>原生 API</strong>：直接提供 Bun 特有的高效 API，如
              <code>Bun.file()</code>、<code>Bun.serve()</code>、<code>Bun.write()</code> 等。</li>
          </ul>
        </div>
      </section>

      <!-- 与 Node.js 对比表格 -->
      <section class="section">
        <h2>🆚 Bun vs Node.js</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div>特性</div>
            <div>Bun</div>
            <div>Node.js</div>
          </div>
          <div class="table-row">
            <div>启动速度</div>
            <div class="highlight">极快 (~4x)</div>
            <div>较慢</div>
          </div>
          <div class="table-row">
            <div>TypeScript 支持</div>
            <div class="highlight">原生，无需配置</div>
            <div>需 ts-node / 编译</div>
          </div>
          <div class="table-row">
            <div>包管理器</div>
            <div class="highlight">内置 bun install (超高速)</div>
            <div>需 npm/yarn/pnpm</div>
          </div>
          <div class="table-row">
            <div>打包工具</div>
            <div class="highlight">内置 bun build</div>
            <div>需 webpack/esbuild 等</div>
          </div>
          <div class="table-row">
            <div>测试运行器</div>
            <div class="highlight">内置 bun test (Jest 兼容)</div>
            <div>需 Jest/Mocha 等</div>
          </div>
          <div class="table-row">
            <div>生态成熟度</div>
            <div>快速增长，兼容大部分 npm 包</div>
            <div>极度成熟，海量模块</div>
          </div>
        </div>
        <p class="note">注：Bun 在开发体验和性能方面优势明显，Node.js 在服务器端和企业级应用中依然占据主导地位。</p>
      </section>

      <!-- 生态与发展 -->
      <section class="section">
        <h2>🌱 生态与发展</h2>
        <div class="card">
          <p>Bun 自 2022 年发布以来发展迅猛，目前已经达到 <strong>v1.x 稳定版</strong>，并被越来越多的开源项目和生产环境采用。其生态系统包括：</p>
          <ul>
            <li>支持绝大多数 Node.js 原生模块（通过兼容层）</li>
            <li>强大的社区插件和工具（如 Bun 适配的框架：Elysia、Hono 等）</li>
            <li>官方提供丰富的文档和命令行工具</li>
            <li>持续优化 Windows 支持（目前主要针对 macOS/Linux）</li>
          </ul>
          <p>尽管 Bun 尚在快速发展阶段，但其性能优势和一体的开发体验已经吸引大量开发者尝试，未来有望成为 JavaScript 生态中的重要力量。</p>
        </div>
      </section>

      <!-- 代码示例 -->
      <section class="section">
        <h2>💻 快速上手示例</h2>
        <div class="card code-card">
          <p>创建一个简单的 HTTP 服务器（文件 <code>server.ts</code>）：</p>
          <pre><code>// 使用 Bun 原生 API
Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Hello from Bun!");
  },
});

console.log("Server running at http://localhost:3000");</code></pre>
          <p>运行命令：<code>bun run server.ts</code> 或直接 <code>bun server.ts</code>。</p>
          <p>安装依赖：<code>bun install &lt;package&gt;</code> 速度极快。</p>
        </div>
      </section>

      <footer class="footer">
        <p>
          ✨ Bun 正在改变 JavaScript 工具链的格局。了解更多请访问
          <a href="https://bun.sh" target="_blank" rel="noopener">bun.sh</a>
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯静态介绍组件，无需额外逻辑
</script>

<style scoped lang="less">
// ========== 变量定义 ==========
@primary-dark: #0f172a;
@accent: #f59e0b;
@accent-gradient: linear-gradient(135deg, #f59e0b, #d97706);
@bg-page: #f8fafc;
@card-bg: #ffffff;
@border-radius: 24px;
@shadow-sm: 0 4px 14px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.05);
@shadow-md: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
@font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
@font-mono: 'SF Mono', 'Menlo', 'Monaco', 'Cascadia Code', monospace;

// ========== 全局重置 ==========
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bun-intro {
  background-color: @bg-page;
  font-family: @font-sans;
  color: @primary-dark;
  line-height: 1.5;
  padding: 2rem 1.5rem;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  // Hero 区域
  .hero {
    text-align: center;
    margin-bottom: 4rem;
    padding: 1rem 0;

    .hero-badge {
      display: inline-block;
      background: rgba(245, 158, 11, 0.1);
      color: @accent;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.25rem 1rem;
      border-radius: 40px;
      margin-bottom: 1.5rem;
      letter-spacing: 0.3px;
    }

    h1 {
      font-size: 3.2rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;

      .accent {
        background: @accent-gradient;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #475569;
      max-width: 600px;
      margin: 0 auto 1.5rem;
    }

    .hero-stats {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.2rem;

      span {
        background: @card-bg;
        padding: 0.4rem 1rem;
        border-radius: 40px;
        font-size: 0.85rem;
        font-weight: 500;
        box-shadow: @shadow-sm;
        color: #334155;
      }
    }
  }

  // 通用章节
  .section {
    margin-bottom: 3.5rem;

    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      display: inline-block;
      background: linear-gradient(to right, @primary-dark, @primary-dark);
      background-size: 0 2px;
      background-repeat: no-repeat;
      background-position: bottom left;
      padding-bottom: 0.3rem;
      border-left: 5px solid @accent;
      padding-left: 1rem;
    }

    .card {
      background: @card-bg;
      border-radius: @border-radius;
      padding: 1.8rem;
      box-shadow: @shadow-sm;
      transition: all 0.25s ease;
      border: 1px solid rgba(0, 0, 0, 0.03);

      &:hover {
        box-shadow: @shadow-md;
        transform: translateY(-2px);
      }

      p,
      ul {
        margin-bottom: 1rem;
        color: #334155;
      }

      ul {
        padding-left: 1.5rem;
      }

      li {
        margin: 0.6rem 0;
      }

      code {
        background: #f1f5f9;
        padding: 0.2rem 0.4rem;
        border-radius: 8px;
        font-family: @font-mono;
        font-size: 0.85rem;
        color: #c2410c;
      }
    }
  }

  // 优势网格
  .advantages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.8rem;

    .advantage-card {
      background: @card-bg;
      border-radius: @border-radius;
      padding: 1.8rem 1.5rem;
      text-align: center;
      box-shadow: @shadow-sm;
      transition: all 0.25s;
      border: 1px solid rgba(0, 0, 0, 0.02);

      &:hover {
        transform: translateY(-5px);
        box-shadow: @shadow-md;
      }

      .icon {
        font-size: 2.8rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 0.8rem;
      }

      p {
        color: #475569;
        font-size: 0.95rem;
        line-height: 1.5;
      }
    }
  }

  // 对比表格
  .comparison-table {
    background: @card-bg;
    border-radius: @border-radius;
    overflow: hidden;
    box-shadow: @shadow-sm;
    border: 1px solid #eef2ff;

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #eef2ff;

      &:last-child {
        border-bottom: none;
      }
    }

    .table-header {
      background: #f9fafb;
      font-weight: 700;
      color: #0f172a;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .table-row {
      font-size: 0.95rem;

      .highlight {
        color: @accent;
        font-weight: 600;
        background: rgba(245, 158, 11, 0.08);
        display: inline-block;
        padding: 0.2rem 0.6rem;
        border-radius: 20px;
      }
    }
  }

  .note {
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 1rem;
    text-align: right;
  }

  // 代码卡片
  .code-card {
    pre {
      background: #0f172a;
      color: #e2e8f0;
      padding: 1.2rem;
      border-radius: 16px;
      overflow-x: auto;
      font-family: @font-mono;
      font-size: 0.85rem;
      margin: 1.2rem 0;
      line-height: 1.45;

      code {
        background: transparent;
        color: inherit;
        padding: 0;
        font-family: @font-mono;
      }
    }

    p {
      margin: 0.75rem 0;
    }
  }

  .feature-list {
    list-style: none;
    padding-left: 0 !important;

    li {
      padding-left: 1.5rem;
      position: relative;
      margin-bottom: 0.8rem;

      &::before {
        content: "▹";
        position: absolute;
        left: 0;
        color: @accent;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
    color: #5b6e8c;
    font-size: 0.9rem;

    a {
      color: @accent;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;

      &:hover {
        color: #d97706;
        text-decoration: underline;
      }
    }
  }

  // 响应式
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;

    .hero h1 {
      font-size: 2.2rem;
    }

    .hero-stats {
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }

    .comparison-table {

      .table-header,
      .table-row {
        grid-template-columns: 1fr 1fr 1fr;
        font-size: 0.8rem;
        padding: 0.8rem 1rem;
      }
    }

    .advantages-grid {
      gap: 1.2rem;
    }

    h2 {
      font-size: 1.5rem !important;
    }
  }

  // 小优化：滚动条美观
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #eef2ff;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
}
</style>
