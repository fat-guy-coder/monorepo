<template>
  <div class="workspace-container">
    <!-- 头部区域 -->
    <div class="header-section">
      <div class="logo-container">
        <div class="pnpm-logo">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z" fill="#F69220">
            </path>
            <path
              d="M256,86.7c93.6,0,169.3,75.7,169.3,169.3S349.6,425.3,256,425.3S86.7,349.6,86.7,256S162.4,86.7,256,86.7z"
              fill="#FFFFFF"></path>
            <path
              d="M256,120c-74.9,0-135.7,60.8-135.7,135.7c0,74.9,60.8,135.7,135.7,135.7c74.9,0,135.7-60.8,135.7-135.7 C391.7,180.8,330.9,120,256,120z"
              fill="#F69220"></path>
            <path
              d="M256,153.3c56.7,0,102.7,46,102.7,102.7S312.7,358.7,256,358.7S153.3,312.7,153.3,256S199.3,153.3,256,153.3z"
              fill="#FFFFFF"></path>
          </svg>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">PNPM Workspace 基础介绍</h1>
        <p class="subtitle">高效管理 JavaScript Monorepo 的解决方案</p>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>什么是 PNPM Workspace？</h2>
        </div>

        <div class="intro-content">
          <p>
            <strong>PNPM Workspace</strong> 是 PNPM 提供的 Monorepo 管理解决方案，它允许你在单个代码仓库中管理多个项目（package），同时共享依赖关系。
            通过符号链接和硬链接技术，PNPM 可以极大减少磁盘空间占用并加速依赖安装过程。
          </p>

          <div class="key-features">
            <h3 class="section-subtitle">核心优势</h3>
            <ul>
              <li><strong>高效磁盘利用</strong>：所有依赖只安装一次且全局共享</li>
              <li><strong>跨包链接</strong>：本地包之间自动相互链接</li>
              <li><strong>并行执行</strong>：支持在多个包上并行运行脚本</li>
              <li><strong>过滤命令</strong>：支持按特定包或目录执行命令</li>
              <li><strong>依赖隔离</strong>：每个包仍保持独立的依赖环境</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 为什么需要 Workspace -->
      <section class="why-section">
        <div class="section-header">
          <div class="icon">❓</div>
          <h2>为什么需要 Workspace？</h2>
        </div>

        <div class="why-grid">
          <div class="why-card">
            <div class="why-icon">1</div>
            <h3>减少重复依赖</h3>
            <p>多个项目共享相同依赖时只需安装一次</p>
          </div>

          <div class="why-card">
            <div class="why-icon">2</div>
            <h3>简化本地开发</h3>
            <p>本地包之间无需发布即可相互引用</p>
          </div>

          <div class="why-card">
            <div class="why-icon">3</div>
            <h3>统一依赖管理</h3>
            <p>集中管理所有项目的依赖版本</p>
          </div>

          <div class="why-card">
            <div class="why-icon">4</div>
            <h3>批量执行命令</h3>
            <p>一键在所有包上运行测试或构建</p>
          </div>
        </div>
      </section>

      <!-- 快速开始 -->
      <section class="quickstart-section">
        <div class="section-header">
          <div class="icon">⚡</div>
          <h2>快速开始</h2>
        </div>

        <div class="quickstart-steps">
          <div class="step">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>初始化工作区</h3>
            </div>
            <div class="step-content">
              <p>在项目根目录创建 <code>pnpm-workspace.yaml</code> 文件：</p>
              <pre class="code-block"># pnpm-workspace.yaml
packages:
  # 包含所有 packages 目录下的包
  - 'packages/**'
  # 包含根目录的包（可选）
  - '!**/test/**' # 排除 test 目录</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>创建项目结构</h3>
            </div>
            <div class="step-content">
              <p>典型的 Monorepo 目录结构：</p>
              <pre class="code-block">monorepo/
├── pnpm-workspace.yaml
├── package.json
├── packages/
│   ├── ui-kit/
│   │   ├── package.json
│   │   ├── src/
│   │   └── ...
│   ├── web-app/
│   │   ├── package.json
│   │   ├── src/
│   │   └── ...
│   └── shared/
│       ├── package.json
│        └── ...</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-header">
              <div class="step-number">3</div>
              <h3>安装依赖</h3>
            </div>
            <div class="step-content">
              <p>安装全局依赖（所有包共享）：</p>
              <pre class="code-block"># 安装全局依赖（根目录）
pnpm add -w typescript -D</pre>

              <p>安装特定包的依赖：</p>
              <pre class="code-block"># 为 web-app 包安装 react
pnpm --filter web-app add react react-dom</pre>

              <p>安装本地包依赖：</p>
              <pre class="code-block"># 在 web-app 中依赖本地 ui-kit 包
pnpm --filter web-app add ui-kit@workspace:*</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心命令 -->
      <section class="commands-section">
        <div class="section-header">
          <div class="icon">⌨️</div>
          <h2>核心 Workspace 命令</h2>
        </div>

        <div class="commands-grid">
          <div class="command-card">
            <div class="command-header">
              <div class="command-icon">📦</div>
              <h3>安装依赖</h3>
            </div>
            <pre class="code-block"># 安装所有依赖（根目录）
pnpm install

# 为指定包安装依赖
pnpm --filter &lt;package-name&gt; add &lt;dependency&gt;

# 全局安装依赖（所有包共享）
pnpm add -w &lt;dependency&gt;</pre>
          </div>

          <div class="command-card">
            <div class="command-header">
              <div class="command-icon">🏃</div>
              <h3>运行脚本</h3>
            </div>
            <pre class="code-block"># 在指定包运行脚本
pnpm --filter &lt;package-name&gt; run &lt;script&gt;

# 在所有包运行脚本（并行）
pnpm -r run &lt;script&gt;

# 在依赖包上运行脚本
pnpm --filter ...&lt;package-name&gt; run &lt;script&gt;</pre>
          </div>

          <div class="command-card">
            <div class="command-header">
              <div class="command-icon">🔗</div>
              <h3>链接包</h3>
            </div>
            <pre class="code-block"># 链接所有本地包
pnpm recursive link

# 将特定包链接到全局
pnpm link --global

# 使用全局链接的包
pnpm link --global &lt;package-name&gt;</pre>
          </div>

          <div class="command-card">
            <div class="command-header">
              <div class="command-icon">🔍</div>
              <h3>过滤选项</h3>
            </div>
            <pre class="code-block"># 选择特定包
--filter &lt;package-name&gt;

# 选择包及其依赖
--filter &lt;package-name&gt;...

# 选择包及其依赖（包括依赖的依赖）
--filter ...&lt;package-name&gt;

# 选择包及其被依赖项
--filter &lt;package-name&gt;^...</pre>
          </div>
        </div>
      </section>

      <!-- 高级配置 -->
      <section class="config-section">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>高级配置</h2>
        </div>

        <div class="config-grid">
          <div class="config-card">
            <h3>共享配置</h3>
            <p>使用 <code>pnpm.overrides</code> 强制所有包使用特定依赖版本：</p>
            <pre class="code-block">// package.json
{
  "pnpm": {
    "overrides": {
      "react": "^18.2.0",
      "typescript": "~4.8.2"
    }
  }
}</pre>
          </div>

          <div class="config-card">
            <h3>Hoisting 设置</h3>
            <p>控制依赖提升行为：</p>
            <pre class="code-block"># .npmrc
# 禁用自动提升
hoist=false

# 提升所有依赖到根 node_modules
hoist-pattern[]=*

# 提升特定依赖
hoist-pattern[]=@babel/*</pre>
          </div>

          <div class="config-card">
            <h3>Workspace 配置文件</h3>
            <p>高级 <code>pnpm-workspace.yaml</code> 配置：</p>
            <pre class="code-block">packages:
  - 'packages/**'
  - 'components/**'
  - '!**/test/**' # 排除测试目录
  - '!**/__mocks__/**' # 排除 mock 目录

# 共享的 npmrc 配置
shared-workspace-lockfile: true
save-workspace-protocol: true</pre>
          </div>

          <div class="config-card">
            <h3>并行执行限制</h3>
            <p>控制并行执行的进程数：</p>
            <pre class="code-block"># 最多并行 4 个进程
pnpm -r --workspace-concurrency=4 run build

# 按拓扑顺序运行（先依赖包）
pnpm -r --sort run build</pre>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="scenarios-section">
        <div class="section-header">
          <div class="icon">💼</div>
          <h2>典型使用场景</h2>
        </div>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🧩</div>
              <h3>UI 组件库</h3>
            </div>
            <div class="scenario-content">
              <ul>
                <li>核心组件包</li>
                <li>文档站点</li>
                <li>示例项目</li>
                <li>测试工具包</li>
              </ul>
              <pre class="code-block">packages/
├── core            # 核心组件
├── icons           # 图标库
├── docs            # 文档网站
├── example-react   # React 示例
└── example-vue     # Vue 示例</pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🌐</div>
              <h3>全栈应用</h3>
            </div>
            <div class="scenario-content">
              <ul>
                <li>Web 前端</li>
                <li>移动应用</li>
                <li>后端服务</li>
                <li>共享代码</li>
              </ul>
              <pre class="code-block">packages/
├── web-app        # 前端应用
├── mobile-app     # 移动应用
├── api-service    # 后端API
├── shared         # 共享代码
└── config         # 通用配置</pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">📚</div>
              <h3>多包库</h3>
            </div>
            <div class="scenario-content">
              <ul>
                <li>核心库</li>
                <li>插件系统</li>
                <li>适配器</li>
                <li>CLI 工具</li>
              </ul>
              <pre class="code-block">packages/
├── core-lib       # 核心库
├── plugin-auth    # 认证插件
├── plugin-db      # 数据库插件
├── cli            # 命令行工具
└── utils          # 工具函数</pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">🏢</div>
              <h3>企业级架构</h3>
            </div>
            <div class="scenario-content">
              <ul>
                <li>微前端架构</li>
                <li>共享服务</li>
                <li>设计系统</li>
                <li>工具链</li>
              </ul>
              <pre class="code-block">packages/
├── auth-service   # 认证服务
├── design-system  # 设计系统
├── app-shell      # 微前端壳
├── dashboard      # 仪表盘应用
└── admin-panel    # 管理面板</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="practice-section">
        <div class="section-header">
          <div class="icon">🏆</div>
          <h2>Workspace 最佳实践</h2>
        </div>

        <div class="practice-list">
          <div class="practice-item">
            <div class="practice-icon">1</div>
            <div class="practice-content">
              <h3>使用 workspace 协议</h3>
              <p>在 package.json 中引用本地包时，使用 <code>"ui-kit": "workspace:*"</code> 而不是版本号。PNPM 会自动处理链接并确保在发布时替换为正确的版本号。</p>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-icon">2</div>
            <div class="practice-content">
              <h3>共享依赖管理</h3>
              <p>将公共依赖提升到根目录安装：<code>pnpm add -w react react-dom</code>。这样可以确保所有包使用相同版本的依赖，减少重复安装。</p>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-icon">3</div>
            <div class="practice-content">
              <h3>使用变更集管理版本</h3>
              <p>集成 <code>@changesets/cli</code> 进行版本管理和变更日志生成：</p>
              <pre class="code-block">pnpm add -w @changesets/cli
pnpm changeset init
pnpm changeset # 创建变更记录
pnpm changeset version # 升级版本号
pnpm changeset publish # 发布所有包</pre>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-icon">4</div>
            <div class="practice-content">
              <h3>优化构建顺序</h3>
              <p>使用 <code>--filter</code> 和 <code>...</code> 语法确保按依赖顺序构建：</p>
              <pre class="code-block"># 先构建依赖项，再构建目标包
pnpm --filter my-app... run build

# 并行构建所有包（最大并行数 4）
pnpm -r --workspace-concurrency=4 run build</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="faq-section">
        <div class="section-header">
          <div class="icon">❔</div>
          <h2>常见问题解答</h2>
        </div>

        <div class="faq-grid">
          <div class="faq-card">
            <h3>Q: PNPM Workspace 与其他 Monorepo 工具相比有什么优势？</h3>
            <p><strong>A:</strong> PNPM 使用硬链接技术节省磁盘空间（比 npm/Yarn 节省 40%-60%），安装速度更快，并且具有更精确的 node_modules 结构，避免幻影依赖问题。
            </p>
          </div>

          <div class="faq-card">
            <h3>Q: 如何处理不同包需要不同版本的依赖？</h3>
            <p><strong>A:</strong> PNPM 允许不同包使用不同版本的依赖，它们会被分别安装。如果需要强制使用相同版本，可以在根 package.json 中使用
              <code>pnpm.overrides</code> 配置。
            </p>
          </div>

          <div class="faq-card">
            <h3>Q: 如何从现有项目迁移到 PNPM Workspace？</h3>
            <p><strong>A:</strong> 迁移步骤：
            <ol>
              <li>创建 pnpm-workspace.yaml</li>
              <li>安装 PNPM: <code>npm install -g pnpm</code></li>
              <li>删除各包 node_modules 和 lock 文件</li>
              <li>运行 <code>pnpm install</code></li>
              <li>将本地依赖改为 <code>workspace:*</code> 协议</li>
            </ol>
            </p>
          </div>

          <div class="faq-card">
            <h3>Q: Workspace 支持哪些类型项目？</h3>
            <p><strong>A:</strong> PNPM Workspace 支持任何 Node.js 项目，包括 React、Vue、Angular 前端项目，Express、NestJS 后端服务，以及 React
              Native 移动应用等。</p>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>PNPM Workspace 基础介绍 | 高效 Monorepo 管理方案 | © 2023</p>
      <div class="footer-links">
        <a href="https://pnpm.io/workspaces" target="_blank">官方文档</a>
        <a href="https://pnpm.io/filtering" target="_blank">过滤命令</a>
        <a href="https://pnpm.io/only-allow-pnpm" target="_blank">强制使用 PNPM</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 本组件不需要复杂的逻辑，仅用于展示信息
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

@color-primary: #f69220;
@color-primary-light: #ffb366;
@color-primary-dark: #e07400;
@color-bg: #f8f9fb;
@color-card: #ffffff;
@color-text: #2d3748;
@color-text-light: #718096;
@color-border: #e2e8f0;

.workspace-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: @color-bg;
  color: @color-text;
  line-height: 1.6;
  padding-bottom: 2rem;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, @color-primary, @color-primary-dark);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .pnpm-logo {
    width: 90px;
    height: 90px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    svg {
      width: 50px;
      height: 50px;
    }
  }
}

.main-title {
  font-size: 2.5rem;
  margin: 0 0 0.8rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin: 0 0 1.5rem;
  font-weight: 400;
}

.content-wrapper {
  padding: 0 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid @color-border;

  .icon {
    font-size: 1.8rem;
    background: lighten(@color-primary-light, 35%);
    color: @color-primary;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: darken(@color-text, 10%);
  }
}

.intro-content {
  background: @color-card;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.key-features {
  margin-top: 2.5rem;

  .section-subtitle {
    font-size: 1.4rem;
    color: @color-primary-dark;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid lighten(@color-primary-light, 25%);
  }

  ul {
    list-style-type: none;
    padding-left: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;

    li {
      position: relative;
      padding-left: 1.8rem;
      margin-bottom: 0.8rem;
      font-size: 1.05rem;

      &:before {
        content: "•";
        position: absolute;
        left: 0;
        color: @color-primary;
        font-size: 1.5rem;
        line-height: 1;
      }

      strong {
        color: @color-primary-dark;
      }
    }
  }
}

.why-grid,
.commands-grid,
.config-grid,
.scenarios-grid,
.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.why-card {
  background: @color-card;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-top: 3px solid @color-primary;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .why-icon {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: lighten(@color-primary-light, 35%);
    color: @color-primary;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: @color-primary-dark;
  }

  p {
    margin: 0;
    color: @color-text-light;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.quickstart-steps {
  background: @color-card;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  margin-top: 1.5rem;
}

.step {
  padding: 1.5rem;
  border-bottom: 1px solid @color-border;

  &:last-child {
    border-bottom: none;
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.2rem;

    .step-number {
      width: 32px;
      height: 32px;
      background: @color-primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
      color: @color-primary-dark;
    }
  }

  .step-content {
    p {
      margin: 0 0 0.8rem;
      color: @color-text-light;
    }
  }
}

.command-card,
.config-card {
  background: @color-card;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid @color-border;

  .command-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    background: lighten(@color-primary-light, 35%);
    border-bottom: 1px solid @color-border;

    .command-icon {
      font-size: 1.5rem;
    }

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: @color-primary;
    }
  }

  pre {
    margin: 0;
  }
}

.config-card {
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    color: @color-primary-dark;
    font-size: 1.2rem;
  }

  p {
    color: @color-text-light;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.scenario-card {
  background: @color-card;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid @color-border;

  .scenario-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    background: lighten(@color-primary-light, 35%);
    border-bottom: 1px solid @color-border;

    .scenario-icon {
      font-size: 1.5rem;
    }

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: @color-primary-dark;
    }
  }

  .scenario-content {
    padding: 1.5rem;

    ul {
      padding-left: 1.5rem;
      margin: 0 0 1rem;
      color: @color-text-light;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.practice-list {
  background: @color-card;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  margin-top: 1.5rem;
}

.practice-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid @color-border;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0.5rem;
  }

  .practice-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    background: lighten(@color-primary-light, 35%);
    color: @color-primary;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .practice-content {
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      font-size: 1.2rem;
      color: @color-primary-dark;
    }

    p,
    pre {
      margin: 0;
      color: @color-text-light;
      font-size: 0.95rem;
      line-height: 1.6;
    }

    code {
      font-family: @font-code;
      background: lighten(@color-primary-light, 40%);
      padding: 2px 6px;
      border-radius: 4px;
      color: @color-primary-dark;
    }
  }
}

.faq-card {
  background: @color-card;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-left: 4px solid @color-primary;

  h3 {
    margin-top: 0;
    font-size: 1.1rem;
    color: @color-primary;
  }

  p {
    margin: 0.5rem 0 0;
    color: @color-text-light;
    font-size: 0.95rem;
    line-height: 1.5;

    strong {
      color: @color-primary;
    }

    ol {
      margin: 0.8rem 0;
      padding-left: 1.5rem;
    }
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 2rem 1rem;
  color: @color-text-light;
  font-size: 0.95rem;
  margin-top: 2rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: @color-primary;
      text-decoration: none;
      margin: 0 1rem;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.code-block {
  background-color: darken(@color-bg, 5%);
  color: @color-text;
  border-radius: 8px;
  padding: 1rem;
  font-family: @font-code;
  font-size: 0.92rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  margin: 0.8rem 0;
  border: 1px solid @color-border;
}

@media (max-width: 768px) {
  .header-section {
    padding: 2rem 1rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .content-wrapper {
    padding: 0 1rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }

  .why-grid,
  .commands-grid,
  .config-grid,
  .scenarios-grid,
  .faq-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
  }

  .pnpm-logo {
    width: 70px;
    height: 70px;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  .section-header {
    .icon {
      width: 40px;
      height: 40px;
      font-size: 1.4rem;
    }
  }
}
</style>
