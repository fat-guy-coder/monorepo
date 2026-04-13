<template>
  <div class="bun-container">
    <div class="bun-card">
      <!-- 头部 -->
      <div class="header">
        <div class="header-top">
          <h1>
            <span class="header-icon">🐰</span>
            Bun
          </h1>
          <span class="version-badge">v1.3+</span>
        </div>
        <p class="subtitle">一体化 JavaScript/TypeScript 全栈工具链 · 用 Zig 编写，基于 JavaScriptCore</p>
        <p class="intro">Bun 将运行时、包管理器、打包器、测试运行器四大核心能力集成于一身，彻底告别工具碎片化。[reference:0][reference:1]</p>
      </div>

      <!-- 核心功能模块网格 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">⚡</span>
          <h2>核心功能模块</h2>
          <span class="section-hint">开箱即用的全栈工具链</span>
        </div>
        <div class="modules-grid">
          <!-- 运行时模块 -->
          <div class="module-card">
            <div class="module-icon runtime">🚀</div>
            <div class="module-content">
              <h3>JavaScript 运行时</h3>
              <p class="module-desc">Bun 的核心运行时原生支持 TypeScript、JSX 和 TSX 文件，无需外部转译器，启动速度比 Node.js 快 4
                倍，内存占用更低。[reference:2]</p>
              <div class="command-example">
                <code>bun run index.ts</code>
                <code>bun run app.tsx</code>
              </div>
              <div class="feature-tags">
                <span class="tag">ESM & CommonJS</span>
                <span class="tag">Watch Mode</span>
                <span class="tag">HMR</span>
                <span class="tag">.env 自动加载</span>
              </div>
            </div>
          </div>
          <!-- 包管理器模块 -->
          <div class="module-card">
            <div class="module-icon pkg">📦</div>
            <div class="module-content">
              <h3>包管理器</h3>
              <p class="module-desc">npm 兼容的包管理器，依赖解析速度比 npm 快 10-25 倍，支持 bun.lockb
                二进制锁文件和智能缓存机制。[reference:3][reference:4]</p>
              <div class="command-example">
                <code>bun install</code>
                <code>bun add express</code>
                <code>bunx cowsay "Hello"</code>
              </div>
              <div class="feature-tags">
                <span class="tag">工作区支持</span>
                <span class="tag">隔离安装</span>
                <span class="tag">bun update --interactive</span>
                <span class="tag">bun why</span>
              </div>
            </div>
          </div>
          <!-- 打包器模块 -->
          <div class="module-card">
            <div class="module-icon bundler">🔨</div>
            <div class="module-content">
              <h3>打包器 & 转译器</h3>
              <p class="module-desc">原生打包器支持 Tree Shaking、代码压缩、代码拆分，可同时处理服务端和客户端代码，比 Webpack 快 100
                倍以上。[reference:5][reference:6]</p>
              <div class="command-example">
                <code>bun build ./index.tsx --outdir ./dist</code>
                <code>await Bun.build({ entrypoints, outdir })</code>
              </div>
              <div class="feature-tags">
                <span class="tag">Tree Shaking</span>
                <span class="tag">Minification</span>
                <span class="tag">Code Splitting</span>
                <span class="tag">--watch</span>
              </div>
            </div>
          </div>
          <!-- 测试运行器模块 -->
          <div class="module-card">
            <div class="module-icon test">🧪</div>
            <div class="module-content">
              <h3>测试运行器</h3>
              <p class="module-desc">Jest 兼容的测试运行器，内置 Mock、快照和代码覆盖率，运行速度比 Jest 快 10-50 倍，支持热重载 Watch
                模式。[reference:7][reference:8]</p>
              <div class="command-example">
                <code>bun test</code>
                <code>bun test --watch</code>
                <code>bun test math.test.ts</code>
              </div>
              <div class="feature-tags">
                <span class="tag">expect API</span>
                <span class="tag">Mock & Spy</span>
                <span class="tag">快照测试</span>
                <span class="tag">覆盖率</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- HTTP 与数据库模块 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">🌐</span>
          <h2>网络与数据模块</h2>
        </div>
        <div class="modules-grid half">
          <!-- HTTP Server -->
          <div class="module-card">
            <div class="module-icon http">🌍</div>
            <div class="module-content">
              <h3>HTTP 服务器 & WebSocket</h3>
              <p class="module-desc">Bun.serve() 提供内置的高性能 HTTP 服务器，原生支持 WebSocket，API 简洁高效。[reference:9]</p>
              <div class="command-example mini">
                <code>Bun.serve({ port: 3000, fetch(req) { ... } })</code>
                <code>const server = serve({ port: 3000 })</code>
              </div>
            </div>
          </div>
          <!-- 数据库集成 -->
          <div class="module-card">
            <div class="module-icon db">🗄️</div>
            <div class="module-content">
              <h3>数据库客户端</h3>
              <p class="module-desc">Bun.SQL 统一 API 原生支持 PostgreSQL、MySQL/MariaDB 和 SQLite，内置 Redis 客户端性能比 ioredis 快 7.9
                倍。[reference:10][reference:11]</p>
              <div class="command-example mini">
                <code>import { sql, SQL } from "bun"</code>
                <code>const postgres = new SQL("postgres://...")</code>
              </div>
              <div class="feature-tags small">
                <span class="tag">PostgreSQL</span>
                <span class="tag">MySQL</span>
                <span class="tag">SQLite</span>
                <span class="tag">Redis</span>
                <span class="tag">S3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级功能模块 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">🔧</span>
          <h2>高级功能模块</h2>
        </div>
        <div class="modules-grid triple">
          <!-- FFI -->
          <div class="module-card compact">
            <div class="module-icon ffi">🔌</div>
            <div class="module-content">
              <h3>FFI（外部函数接口）</h3>
              <p class="module-desc">通过 bun:ffi 模块直接从 JavaScript 调用 C/C++/Rust/Zig 等原生库函数，几乎零开销。[reference:12]</p>
              <div class="command-example mini">
                <code>import { dlopen, FFIType } from "bun:ffi"</code>
              </div>
            </div>
          </div>
          <!-- Shell -->
          <div class="module-card compact">
            <div class="module-icon shell">💻</div>
            <div class="module-content">
              <h3>Bun Shell</h3>
              <p class="module-desc">跨平台的类 bash Shell，通过 $ 函数在 JavaScript/TypeScript 中无缝执行 Shell 命令。[reference:13]</p>
              <div class="command-example mini">
                <code>import { $ } from "bun"</code>
                <code>await $`ls -la`</code>
              </div>
            </div>
          </div>
          <!-- HTML 入口 -->
          <div class="module-card compact">
            <div class="module-icon html">📄</div>
            <div class="module-content">
              <h3>HTML 入口 & 静态站点</h3>
              <p class="module-desc">零配置直接运行 HTML 文件，自动处理 JS/CSS/React 转译打包，支持 HMR 和 React Fast
                Refresh。[reference:14][reference:15]</p>
              <div class="command-example mini">
                <code>bun ./index.html</code>
                <code>bun build --compile index.html</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">🎯</span>
          <h2>适用场景</h2>
        </div>
        <div class="scene-grid">
          <div class="scene-item">
            <span class="scene-bullet">✨</span>
            <div><strong>新项目快速启动</strong> — 零配置运行 TypeScript，无需安装额外工具链。[reference:16]</div>
          </div>
          <div class="scene-item">
            <span class="scene-bullet">📦</span>
            <div><strong>Monorepo 依赖管理</strong> — 工作区隔离安装，依赖目录功能，bun why 分析依赖链。[reference:17]</div>
          </div>
          <div class="scene-item">
            <span class="scene-bullet">⚡</span>
            <div><strong>性能敏感场景</strong> — 启动快 4 倍、包安装快 25 倍、打包快 100 倍，极致效率。[reference:18]</div>
          </div>
          <div class="scene-item">
            <span class="scene-bullet">🔄</span>
            <div><strong>渐进式迁移 Node.js</strong> — 100% Node.js API 兼容，可直接替换 npm run、node 等命令。[reference:19]</div>
          </div>
          <div class="scene-item">
            <span class="scene-bullet">🔬</span>
            <div><strong>脚本与自动化</strong> — 跨平台 Shell 脚本，bunx 直接执行 npm 包，替代 npx。[reference:20]</div>
          </div>
          <div class="scene-item">
            <span class="scene-bullet">🏗️</span>
            <div><strong>全栈开发</strong> — 一个工具搞定前后端，内置数据库客户端和 S3 对象存储 API。[reference:21]</div>
          </div>
        </div>
      </section>

      <!-- 底部 -->
      <div class="footer-note">
        <span>🐰 告别 npm + Webpack + Jest 的工具链碎片化 —— 一个 Bun 就够了。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无交互逻辑
</script>

<style lang="less" scoped>
// 设计变量
@primary-dark: #1a1a2e;
@primary-mid: #2d3561;
@accent-orange: #f59e0b;
@accent-light: #fef3c7;
@bg-light: #fafcff;
@card-bg: #ffffff;
@border-light: #e2e8f0;
@text-main: #1e293b;
@text-muted: #475569;

.bun-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #fafafa 0%, #f0f4f8 100%);
  padding: 2rem 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
}

.bun-card {
  max-width: 1280px;
  width: 100%;
  background: @card-bg;
  border-radius: 32px;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.08), 0 4px 18px -6px rgba(0, 0, 0, 0.04);
  padding: 2.5rem 2.5rem 2rem;
  border: 1px solid rgba(245, 158, 11, 0.12);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 640px) {
    padding: 1.8rem 1.5rem;
    border-radius: 24px;
  }
}

.header {
  margin-bottom: 2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid @border-light;

  .header-top {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    h1 {
      font-size: 2.6rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 0;
      color: @primary-dark;
      display: flex;
      align-items: center;
      gap: 12px;

      .header-icon {
        font-size: 2.4rem;
        background: linear-gradient(135deg, #fef3c7, #fde68a);
        width: 58px;
        height: 58px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        box-shadow: 0 4px 10px rgba(245, 158, 11, 0.15);
      }
    }

    .version-badge {
      background: @accent-light;
      color: @accent-orange;
      padding: 0.2rem 1rem;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.9rem;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
  }

  .subtitle {
    font-size: 1.1rem;
    color: @text-muted;
    margin: 0.8rem 0 0.4rem 0;
    font-weight: 500;
  }

  .intro {
    font-size: 0.98rem;
    color: @text-main;
    margin: 0.6rem 0 0 0;
    line-height: 1.6;
  }
}

.section {
  margin-bottom: 2.2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;

  .section-icon {
    font-size: 1.5rem;
    background: @bg-light;
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    color: @primary-mid;
    border: 1px solid @border-light;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 650;
    margin: 0;
    color: @primary-dark;
    letter-spacing: -0.01em;
  }

  .section-hint {
    margin-left: auto;
    font-size: 0.85rem;
    color: @text-muted;
    background: @bg-light;
    padding: 0.2rem 0.8rem;
    border-radius: 20px;

    @media (max-width: 480px) {
      margin-left: 0;
      width: 100%;
      margin-top: 4px;
    }
  }
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  &.half {
    grid-template-columns: repeat(2, 1fr);
  }

  &.triple {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;

    &.half,
    &.triple {
      grid-template-columns: 1fr;
    }
  }
}

.module-card {
  background: @bg-light;
  border-radius: 20px;
  padding: 1.2rem 1.4rem 1.4rem;
  border: 1px solid @border-light;
  transition: all 0.15s;
  display: flex;
  gap: 14px;

  &:hover {
    background: white;
    border-color: rgba(245, 158, 11, 0.3);
    box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.06);
  }

  &.compact {
    padding: 1rem 1.2rem;
  }

  .module-icon {
    font-size: 2rem;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    flex-shrink: 0;
    background: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

    &.runtime {
      background: #e0f2fe;
      color: #0284c7;
    }

    &.pkg {
      background: #dcfce7;
      color: #16a34a;
    }

    &.bundler {
      background: #fef3c7;
      color: #d97706;
    }

    &.test {
      background: #fce7f3;
      color: #db2777;
    }

    &.http {
      background: #e0e7ff;
      color: #4f46e5;
    }

    &.db {
      background: #ffedd5;
      color: #ea580c;
    }

    &.ffi {
      background: #f1f5f9;
      color: #334155;
    }

    &.shell {
      background: #ecfccb;
      color: #4d7c0f;
    }

    &.html {
      background: #fae8ff;
      color: #a21caf;
    }
  }

  .module-content {
    flex: 1;

    h3 {
      font-size: 1.2rem;
      font-weight: 650;
      margin: 0 0 0.4rem 0;
      color: @primary-dark;
    }

    .module-desc {
      font-size: 0.9rem;
      line-height: 1.55;
      color: @text-main;
      margin: 0 0 0.8rem 0;
    }

    .command-example {
      background: #1e293b;
      padding: 0.5rem 0.8rem;
      border-radius: 12px;
      margin-bottom: 0.8rem;

      code {
        display: block;
        color: #e2e8f0;
        font-family: 'SF Mono', 'Menlo', monospace;
        font-size: 0.8rem;
        line-height: 1.6;

        &:not(:last-child) {
          margin-bottom: 2px;
        }
      }

      &.mini {
        padding: 0.35rem 0.7rem;

        code {
          font-size: 0.75rem;
        }
      }
    }

    .feature-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      &.small .tag {
        font-size: 0.7rem;
        padding: 0.15rem 0.6rem;
      }

      .tag {
        background: white;
        padding: 0.2rem 0.7rem;
        border-radius: 30px;
        font-size: 0.75rem;
        font-weight: 500;
        color: @primary-mid;
        border: 1px solid @border-light;
      }
    }
  }
}

.scene-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  .scene-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: @bg-light;
    padding: 0.9rem 1.1rem;
    border-radius: 16px;
    border: 1px solid @border-light;
    font-size: 0.9rem;
    color: @text-main;
    line-height: 1.5;

    .scene-bullet {
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    strong {
      color: @primary-dark;
    }
  }
}

.footer-note {
  margin-top: 1.8rem;
  text-align: center;
  border-top: 1px solid @border-light;
  padding-top: 1.5rem;

  span {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    padding: 0.45rem 2rem;
    border-radius: 60px;
    color: @primary-dark;
    font-weight: 550;
    border: 1px solid rgba(245, 158, 11, 0.2);
    display: inline-block;
    font-size: 0.95rem;
  }
}

code {
  font-family: 'SF Mono', 'Menlo', 'Monaco', 'Cascadia Code', 'Consolas', monospace;
}
</style>
