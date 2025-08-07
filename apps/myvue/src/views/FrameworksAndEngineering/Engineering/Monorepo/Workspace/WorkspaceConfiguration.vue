<template>
  <div class="pnpm-workspace-container">
    <header class="header">
      <h1>PNPM Workspace 完整配置指南</h1>
      <p class="subtitle">从零开始构建高效 Monorepo 工作流</p>
    </header>

    <div class="content-wrapper">
      <section class="intro">
        <div class="card">
          <h2><span class="icon">🚀</span> 为什么选择 PNPM Workspace？</h2>
          <div class="benefits">
            <div class="benefit">
              <div class="icon">📦</div>
              <h3>高效磁盘利用</h3>
              <p>所有依赖存储在单一位置，避免重复下载</p>
            </div>
            <div class="benefit">
              <div class="icon">⚡</div>
              <h3>闪电般安装速度</h3>
              <p>比 npm/yarn 快 2 倍以上</p>
            </div>
            <div class="benefit">
              <div class="icon">🔗</div>
              <h3>严格依赖管理</h3>
              <p>避免幽灵依赖和依赖冲突</p>
            </div>
            <div class="benefit">
              <div class="icon">🧩</div>
              <h3>内置 Monorepo 支持</h3>
              <p>无需额外工具即可管理多包项目</p>
            </div>
          </div>

          <div class="comparison">
            <h3>PNPM vs 其他包管理器</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>PNPM</th>
                    <th>NPM</th>
                    <th>Yarn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>磁盘空间使用</td>
                    <td class="best">✅ 最优</td>
                    <td>❌ 重复存储</td>
                    <td>❌ 重复存储</td>
                  </tr>
                  <tr>
                    <td>安装速度</td>
                    <td class="best">✅ 最快</td>
                    <td>⏱️ 中等</td>
                    <td>⏱️ 中等</td>
                  </tr>
                  <tr>
                    <td>Monorepo 支持</td>
                    <td class="best">✅ 内置</td>
                    <td>⚠️ 需 Lerna</td>
                    <td>⚠️ 需 Workspaces</td>
                  </tr>
                  <tr>
                    <td>严格依赖</td>
                    <td class="best">✅ 防止幽灵依赖</td>
                    <td>❌ 允许幽灵依赖</td>
                    <td>❌ 允许幽灵依赖</td>
                  </tr>
                  <tr>
                    <td>安全性</td>
                    <td class="best">✅ 内容可寻址存储</td>
                    <td>⚠️ 普通存储</td>
                    <td>⚠️ 普通存储</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section class="setup">
        <h2><span class="icon">🛠️</span> 环境设置</h2>
        <div class="card">
          <div class="setup-steps">
            <div class="step">
              <div class="step-header">1. 安装 PNPM</div>
              <div class="step-content">
                <p>使用以下命令全局安装 PNPM：</p>
                <div class="code-block">
                  <pre><code># 使用 npm
npm install -g pnpm

# 使用 Homebrew (macOS)
brew install pnpm

# 使用 Scoop (Windows)
scoop install pnpm

# 使用脚本
curl -fsSL https://get.pnpm.io/install.sh | sh -</code></pre>
                </div>
                <p>验证安装：</p>
                <div class="code-block">
                  <pre><code>pnpm --version
# 应输出类似：7.15.0</code></pre>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-header">2. 初始化项目</div>
              <div class="step-content">
                <p>创建项目目录并初始化：</p>
                <div class="code-block">
                  <pre><code>mkdir my-monorepo
cd my-monorepo
pnpm init</code></pre>
                </div>
                <p>生成的 <code>package.json</code>：</p>
                <div class="code-block">
                  <pre><code>{
  "name": "my-monorepo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}</code></pre>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-header">3. 配置 Workspace</div>
              <div class="step-content">
                <p>创建 <code>pnpm-workspace.yaml</code> 文件：</p>
                <div class="code-block">
                  <pre><code>touch pnpm-workspace.yaml</code></pre>
                </div>
                <p>编辑文件内容：</p>
                <div class="code-block">
                  <pre><code># pnpm-workspace.yaml
packages:
  # 包含 packages 目录下所有子目录
  - 'packages/**'

  # 包含 apps 目录下所有子目录
  - 'apps/*'

  # 排除 test 目录
  - '!**/test/**'

  # 包含根目录下的单个包
  - 'common'</code></pre>
                </div>
                <p>目录结构示例：</p>
                <div class="code-block">
                  <pre><code>my-monorepo/
├── pnpm-workspace.yaml
├── package.json
├── packages/
│   ├── ui-kit/        # 共享UI组件库
│   │   ├── package.json
│   │   └── src/
│   ├── utils/         # 共享工具函数
│   │   ├── package.json
│   │   └── src/
│   └── config/        # 共享配置
│       ├── package.json
│       └── src/
├── apps/
│   ├── web-app/       # 前端应用
│   │   ├── package.json
│   │   └── src/
│   └── admin-panel/   # 管理后台
│       ├── package.json
│       └── src/
└── common/            # 根目录包
    ├── package.json
    └── src/</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="package-management">
        <h2><span class="icon">📦</span> 包管理</h2>
        <div class="card">
          <div class="management-types">
            <div class="type">
              <div class="type-header">
                <h3>添加依赖</h3>
              </div>
              <div class="type-content">
                <p><strong>全局依赖（所有包共用）</strong> - 添加到根目录：</p>
                <div class="code-block">
                  <pre><code># 添加开发依赖
pnpm add -Dw typescript eslint prettier

# 添加生产依赖
pnpm add -w axios lodash</code></pre>
                </div>

                <p><strong>特定包依赖</strong> - 使用 <code>--filter</code>：</p>
                <div class="code-block">
                  <pre><code># 为 web-app 添加 React
pnpm add react --filter web-app

# 为多个包添加依赖
pnpm add dayjs --filter web-app --filter admin-panel

# 为所有包添加依赖
pnpm add cross-env -r</code></pre>
                </div>

                <p><strong>工作区内包依赖</strong> - 引用本地包：</p>
                <div class="code-block">
                  <pre><code># 在 web-app 中引用 ui-kit
pnpm add @my-monorepo/ui-kit --filter web-app --workspace

# 等价于在 web-app/package.json 中添加：
{
  "dependencies": {
    "@my-monorepo/ui-kit": "workspace:*"
  }
}</code></pre>
                </div>
              </div>
            </div>

            <div class="type">
              <div class="type-header">
                <h3>依赖管理最佳实践</h3>
              </div>
              <div class="type-content">
                <p><strong>1. 版本一致性</strong> - 使用 <code>overrides</code> 统一依赖版本：</p>
                <div class="code-block">
                  <pre><code>// 根目录 package.json
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0",
      "react-dom": "18.2.0",
      "typescript": "^5.0.0"
    }
  }
}</code></pre>
                </div>

                <p><strong>2. 避免循环依赖</strong> - 使用 <code>pnpm why</code> 检查依赖关系：</p>
                <div class="code-block">
                  <pre><code># 检查 react 依赖关系
pnpm why react -r

# 输出示例
Packages:
@my-monorepo/web-app  18.2.0
@my-monorepo/admin-panel  18.2.0
@my-monorepo/ui-kit  18.1.0  → 应升级到 18.2.0</code></pre>
                </div>

                <p><strong>3. 依赖类型管理</strong> - 正确使用 dependency 类型：</p>
                <table class="dependency-table">
                  <thead>
                    <tr>
                      <th>依赖类型</th>
                      <th>命令</th>
                      <th>存储位置</th>
                      <th>使用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>dependencies</td>
                      <td><code>pnpm add &lt;pkg&gt;</code></td>
                      <td>包目录/node_modules</td>
                      <td>生产环境依赖</td>
                    </tr>
                    <tr>
                      <td>devDependencies</td>
                      <td><code>pnpm add -D &lt;pkg&gt;</code></td>
                      <td>包目录/node_modules</td>
                      <td>开发环境依赖</td>
                    </tr>
                    <tr>
                      <td>peerDependencies</td>
                      <td><code>pnpm add -P &lt;pkg&gt;</code></td>
                      <td>不在 node_modules</td>
                      <td>插件开发，依赖宿主环境</td>
                    </tr>
                    <tr>
                      <td>optionalDependencies</td>
                      <td><code>pnpm add -O &lt;pkg&gt;</code></td>
                      <td>包目录/node_modules</td>
                      <td>可选依赖，安装失败不中断</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="scripts">
        <h2><span class="icon">📜</span> 脚本管理</h2>
        <div class="card">
          <div class="script-types">
            <div class="type">
              <div class="type-header">
                <h3>运行脚本</h3>
              </div>
              <div class="type-content">
                <p><strong>基本用法</strong> - 使用 <code>pnpm run</code>：</p>
                <div class="code-block">
                  <pre><code># 运行特定包的脚本
pnpm --filter web-app run dev

# 简写形式
pnpm -F web-app dev

# 运行所有包的 test 脚本
pnpm -r run test

# 并行运行脚本 (--parallel)
pnpm -r --parallel run build</code></pre>
                </div>

                <p><strong>复杂过滤</strong> - 组合使用过滤条件：</p>
                <div class="code-block">
                  <pre><code># 运行名称以 "app-" 开头的包的 build 脚本
pnpm --filter='app-*' run build

# 运行依赖 @my-monorepo/ui-kit 的包的脚本
pnpm --filter='...@my-monorepo/ui-kit' run lint

# 运行自上次提交以来更改的包的测试
pnpm --filter='...[origin/master]' run test</code></pre>
                </div>
              </div>
            </div>

            <div class="type">
              <div class="type-header">
                <h3>高级脚本配置</h3>
              </div>
              <div class="type-content">
                <p><strong>1. 根目录脚本管理</strong> - 统一执行命令：</p>
                <div class="code-block">
                  <pre><code>// 根目录 package.json
{
  "scripts": {
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "lint": "pnpm -r run lint",
    "dev": "pnpm run --parallel --stream dev",
    "clean": "pnpm -r exec -- rm -rf dist node_modules"
  }
}</code></pre>
                </div>

                <p><strong>2. 工作流脚本</strong> - 复杂任务编排：</p>
                <div class="code-block">
                  <pre><code>// 根目录 package.json
{
  "scripts": {
    "prepare": "husky install",
    "preinstall": "npx only-allow pnpm",
    "postinstall": "pnpm run generate-types",
    "generate-types": "pnpm -F @my-monorepo/types run build",
    "ci": "run-s lint test build",
    "release": "bumpp package.json packages/*/package.json"
  }
}</code></pre>
                </div>

                <p><strong>3. 跨包脚本执行</strong> - 使用 <code>pnpm exec</code>：</p>
                <div class="code-block">
                  <pre><code># 在所有包中运行 eslint
pnpm -r exec eslint --fix

# 在特定包中运行命令
pnpm --filter @my-monorepo/web-app exec next telemetry disable</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="advanced">
        <h2><span class="icon">🚀</span> 高级配置</h2>
        <div class="card">
          <div class="advanced-sections">
            <div class="section">
              <h3>1. 版本管理与发布</h3>
              <p>使用 <code>changesets</code> 管理版本和发布：</p>
              <div class="steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <p>安装 changesets：</p>
                    <div class="code-block">
                      <pre><code>pnpm add -Dw @changesets/cli</code></pre>
                    </div>
                  </div>
                </div>

                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <p>初始化 changesets：</p>
                    <div class="code-block">
                      <pre><code>pnpm changeset init</code></pre>
                    </div>
                    <p>生成的 <code>.changeset/config.json</code>：</p>
                    <div class="code-block">
                      <pre><code>{
  "$schema": "https://unpkg.com/@changesets/config@2.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch"
}</code></pre>
                    </div>
                  </div>
                </div>

                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <p>添加变更集：</p>
                    <div class="code-block">
                      <pre><code>pnpm changeset</code></pre>
                    </div>
                  </div>
                </div>

                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <p>版本管理和发布：</p>
                    <div class="code-block">
                      <pre><code># 更新版本号
pnpm changeset version

# 发布到 npm
pnpm changeset publish

# 完整的 CI 发布脚本
{
  "scripts": {
    "release": "pnpm build && pnpm test && changeset publish"
  }
}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <h3>2. 依赖优化</h3>
              <p>使用 <code>.npmrc</code> 文件优化依赖安装：</p>
              <div class="code-block">
                <pre><code># .npmrc
# 使用最新版本依赖
prefer-frozen-lockfile=false

# 并发安装数
child-concurrency=20

# 启用副作用缓存
side-effects-cache=true

# 禁用自动安装 peerDependencies
auto-install-peers=false

# 设置存储路径
virtual-store-dir=.pnpm-store
modules-dir=node_modules

# 忽略脚本（安全）
ignore-scripts=true

# 仅允许使用 pnpm
engine-strict=true</code></pre>
              </div>
            </div>

            <div class="section">
              <h3>3. 与 Turborepo 集成</h3>
              <p>结合 Turborepo 实现增量构建和缓存：</p>
              <div class="steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <p>安装 Turborepo：</p>
                    <div class="code-block">
                      <pre><code>pnpm add -Dw turbo</code></pre>
                    </div>
                  </div>
                </div>

                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <p>配置 <code>turbo.json</code>：</p>
                    <div class="code-block">
                      <pre><code>{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    }
  }
}</code></pre>
                    </div>
                  </div>
                </div>

                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <p>更新根目录 <code>package.json</code>：</p>
                    <div class="code-block">
                      <pre><code>{
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "dev": "turbo run dev --parallel"
  }
}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <h3>4. CI/CD 集成</h3>
              <p>GitHub Actions 配置示例：</p>
              <div class="code-block">
                <pre><code># .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Setup PNPM
        uses: pnpm/action-setup@v2
        with:
          version: 7

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build

      - name: Test
        run: pnpm test

  release:
    if: github.ref == 'refs/heads/main'
    needs: [build]
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Setup PNPM
        uses: pnpm/action-setup@v2
        with:
          version: 7

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Create release
        run: pnpm release
        env:
          GITHUB_TOKEN: $&#123;&#123; secrets.GITHUB_TOKEN &#125;&#125;
          NPM_TOKEN: $&#123;&#123; secrets.NPM_TOKEN &#125;&#125;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="troubleshooting">
        <h2><span class="icon">⚠️</span> 常见问题解决</h2>
        <div class="card">
          <div class="issues">
            <div class="issue">
              <h3>幽灵依赖 (Phantom Dependencies)</h3>
              <p><strong>问题：</strong> 使用未在 package.json 中声明的依赖</p>
              <p><strong>解决方案：</strong> 使用 <code>.npmrc</code> 严格模式</p>
              <div class="code-block">
                <pre><code># .npmrc
# 启用严格模式
strict-peer-dependencies=true
hoist=false</code></pre>
              </div>
            </div>

            <div class="issue">
              <h3>依赖冲突</h3>
              <p><strong>问题：</strong> 不同包需要同一依赖的不同版本</p>
              <p><strong>解决方案：</strong> 使用 <code>overrides</code> 统一版本</p>
              <div class="code-block">
                <pre><code>// 根目录 package.json
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0",
      "react-dom": "18.2.0"
    }
  }
}</code></pre>
              </div>
            </div>

            <div class="issue">
              <h3>循环依赖</h3>
              <p><strong>问题：</strong> 包 A 依赖包 B，同时包 B 又依赖包 A</p>
              <p><strong>解决方案：</strong> 使用 <code>pnpm why</code> 检测并重构代码</p>
              <div class="code-block">
                <pre><code># 检测循环依赖
pnpm -r exec npx dpdm src --circular

# 重构方案：
# 1. 提取共享代码到新包
# 2. 使用依赖注入
# 3. 合并相关包</code></pre>
              </div>
            </div>

            <div class="issue">
              <h3>安装速度慢</h3>
              <p><strong>问题：</strong> 首次安装或 CI 环境安装缓慢</p>
              <p><strong>解决方案：</strong> 优化 <code>.npmrc</code> 配置</p>
              <div class="code-block">
                <pre><code># .npmrc
# 启用并发安装
child-concurrency=20

# 使用最新 lockfile
prefer-frozen-lockfile=false

# 设置存储路径
state-dir=/tmp/.pnpm-store

# 使用本地缓存
store-dir=~/.pnpm-store</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>PNPM Workspace 提供了一种高效、可靠的 Monorepo 解决方案，适用于各种规模的项目</p>
      <p>
        更多信息请参考官方文档：<a href="https://pnpm.io/workspaces" target="_blank"
          >https://pnpm.io/workspaces</a
        >
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 此组件不需要额外的逻辑，仅用于展示PNPM Workspace配置
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #6c5ce7;
@secondary-color: #5d4de0;
@accent-color: #ff6b6b;
@light-bg: #f8f9ff;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e7ff;
@success-color: #00b894;
@warning-color: #fdcb6e;
@danger-color: #ff7675;
@info-color: #74b9ff;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.pnpm-workspace-container {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @light-bg;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, #5d4de0);
  color: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.2);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: @card-bg;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.8rem;
  color: @primary-color;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8eaed;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

h3 {
  font-size: 1.4rem;
  color: @secondary-color;
  margin: 20px 0 15px;
}

.card {
  background-color: @card-bg;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid @border-color;
}

// 介绍部分
.benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 25px 0;

  .benefit {
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background: #f0f4ff;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      margin: 10px 0;
      color: @primary-color;
    }
  }
}

.comparison {
  margin-top: 30px;

  .comparison-table {
    overflow-x: auto;
    margin-top: 20px;

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border: 1px solid @border-color;
      }

      thead {
        background: @primary-color;
        color: white;

        th {
          font-weight: 500;
        }
      }

      tbody {
        tr {
          &:nth-child(even) {
            background: #f8f9ff;
          }
        }

        .best {
          background: #e6f7ee;
          font-weight: 600;
          position: relative;

          &::after {
            content: '✓';
            margin-left: 5px;
            color: @success-color;
          }
        }
      }
    }
  }
}

// 设置部分
.setup-steps {
  display: grid;
  gap: 30px;

  .step {
    border-left: 4px solid @primary-color;
    padding-left: 20px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -12px;
      top: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: @primary-color;
    }

    .step-header {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 15px;
      color: @primary-color;
    }

    .step-content {
      p {
        margin-bottom: 10px;
      }
    }
  }
}

// 代码块样式
.code-block {
  background-color: #f8f9ff;
  border-radius: 8px;
  padding: 18px;
  margin: 18px 0;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  border: 1px solid @border-color;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  code {
    color: #2c3e50;
    line-height: 1.5;
  }
}

// 管理部分
.management-types {
  display: grid;
  gap: 25px;

  .type {
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;

    .type-header {
      padding: 15px 20px;
      background: #f0f4ff;
      border-bottom: 1px solid @border-color;

      h3 {
        margin: 0;
      }
    }

    .type-content {
      padding: 20px;

      p {
        margin-bottom: 15px;
      }
    }
  }
}

.dependency-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border: 1px solid @border-color;
  }

  thead {
    background: @primary-color;
    color: white;

    th {
      font-weight: 500;
    }
  }

  tbody {
    tr:nth-child(even) {
      background: #f8f9ff;
    }
  }
}

// 脚本部分
.script-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .type {
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;

    .type-header {
      padding: 15px 20px;
      background: #f0f4ff;
      border-bottom: 1px solid @border-color;

      h3 {
        margin: 0;
      }
    }

    .type-content {
      padding: 20px;
    }
  }
}

// 高级部分
.advanced-sections {
  display: grid;
  gap: 30px;

  .section {
    h3 {
      border-left: 4px solid @primary-color;
      padding-left: 15px;
      margin-bottom: 20px;
    }
  }
}

.steps {
  display: grid;
  gap: 20px;

  .step {
    display: flex;
    gap: 15px;

    .step-number {
      width: 30px;
      height: 30px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 3px;
    }
  }
}

// 问题解决
.issues {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .issue {
    border: 1px solid @border-color;
    border-radius: 10px;
    padding: 20px;
    background: #f8f9ff;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  font-style: italic;
  color: #666;
  margin-top: 20px;
  border-top: 1px solid @border-color;
  line-height: 1.8;

  a {
    color: @primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .content-wrapper {
    padding: 20px;
  }

  .script-types {
    grid-template-columns: 1fr;
  }
}
</style>
