<template>
  <div class="turborepo-container">
    <header class="header">
      <h1>Turborepo 终极配置指南</h1>
      <p class="subtitle">构建高性能的 Monorepo 开发工作流</p>
    </header>

    <div class="content-wrapper">
      <section class="intro">
        <div class="card">
          <h2><span class="icon">⚡</span> 为什么选择 Turborepo？</h2>
          <div class="benefits">
            <div class="benefit">
              <div class="icon">🚀</div>
              <h3>增量构建</h3>
              <p>仅构建更改的部分，跳过未变更的工作区</p>
            </div>
            <div class="benefit">
              <div class="icon">🔁</div>
              <h3>并行执行</h3>
              <p>同时运行多个任务，最大化利用 CPU 资源</p>
            </div>
            <div class="benefit">
              <div class="icon">💾</div>
              <h3>智能缓存</h3>
              <p>本地和远程缓存，避免重复工作</p>
            </div>
            <div class="benefit">
              <div class="icon">🌐</div>
              <h3>云集成</h3>
              <p>与 Vercel 无缝集成，实现远程缓存</p>
            </div>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="value">10x</div>
              <div class="label">构建速度提升</div>
            </div>
            <div class="stat">
              <div class="value">80%</div>
              <div class="label">CI 时间减少</div>
            </div>
            <div class="stat">
              <div class="value">100%</div>
              <div class="label">缓存命中率</div>
            </div>
          </div>
        </div>
      </section>

      <section class="setup">
        <h2><span class="icon">🛠️</span> 环境设置</h2>
        <div class="card">
          <div class="setup-steps">
            <div class="step">
              <div class="step-header">1. 创建 Monorepo 项目</div>
              <div class="step-content">
                <p>使用您喜欢的包管理器初始化项目：</p>
                <div class="code-block">
                  <pre><code># 使用 pnpm
mkdir my-turborepo
cd my-turborepo
pnpm init

# 使用 npm
npm init -y

# 使用 yarn
yarn init -y</code></pre>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-header">2. 安装 Turborepo</div>
              <div class="step-content">
                <p>在项目中安装 Turborepo：</p>
                <div class="code-block">
                  <pre><code># 使用 pnpm
pnpm add turbo -Dw

# 使用 npm
npm install turbo --save-dev

# 使用 yarn
yarn add turbo -D</code></pre>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-header">3. 配置工作区</div>
              <div class="step-content">
                <p>创建基本目录结构：</p>
                <div class="code-block">
                  <pre><code># 创建 packages 目录
mkdir packages

# 创建 apps 目录
mkdir apps

# 示例包结构
packages/
├── config/         # 共享配置
│   ├── package.json
│   └── tsconfig.json
├── ui/             # UI 组件库
│   ├── package.json
│   └── src/
├── utils/          # 工具函数
│   ├── package.json
│   └── src/
└── types/          # 类型定义
    ├── package.json
    └── src/

apps/
├── web/            # 主应用
│   ├── package.json
│   └── src/
└── docs/           # 文档站点
    ├── package.json
    └── src/</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="configuration">
        <h2><span class="icon">⚙️</span> 核心配置</h2>
        <div class="card">
          <div class="config-sections">
            <div class="section">
              <h3>1. turbo.json 基础配置</h3>
              <p>创建 <code>turbo.json</code> 文件：</p>
              <div class="code-block">
                <pre><code>{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "outputs": ["dist/**", ".next/**"],
      "dependsOn": ["^build"]
    },
    "test": {
      "outputs": [],
      "dependsOn": ["build"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  },
  "globalDependencies": [".env"],
  "globalEnv": ["API_KEY", "ENV"],
  "extends": []
}</code></pre>
              </div>

              <h4>配置项详解：</h4>
              <table class="config-table">
                <thead>
                  <tr>
                    <th>配置项</th>
                    <th>类型</th>
                    <th>描述</th>
                    <th>默认值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>pipeline</code></td>
                    <td>Object</td>
                    <td>定义任务管道和依赖关系</td>
                    <td>必需</td>
                  </tr>
                  <tr>
                    <td><code>outputs</code></td>
                    <td>string[]</td>
                    <td>任务输出的文件/目录</td>
                    <td>[]</td>
                  </tr>
                  <tr>
                    <td><code>dependsOn</code></td>
                    <td>string[]</td>
                    <td>任务依赖的其他任务</td>
                    <td>[]</td>
                  </tr>
                  <tr>
                    <td><code>cache</code></td>
                    <td>boolean</td>
                    <td>是否缓存任务结果</td>
                    <td>true</td>
                  </tr>
                  <tr>
                    <td><code>persistent</code></td>
                    <td>boolean</td>
                    <td>是否为持久任务（如 dev 服务器）</td>
                    <td>false</td>
                  </tr>
                  <tr>
                    <td><code>globalDependencies</code></td>
                    <td>string[]</td>
                    <td>影响所有任务的全局文件依赖</td>
                    <td>[]</td>
                  </tr>
                  <tr>
                    <td><code>globalEnv</code></td>
                    <td>string[]</td>
                    <td>影响缓存的全局环境变量</td>
                    <td>[]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="section">
              <h3>2. 任务依赖关系</h3>
              <p>Turborepo 支持复杂的任务依赖关系：</p>
              <div class="dependency-types">
                <div class="type">
                  <h4>拓扑依赖 (^)</h4>
                  <p>依赖工作区内所有依赖包的任务</p>
                  <div class="code-block">
                    <pre><code>{
  "build": {
    "dependsOn": ["^build"] // 先构建所有依赖项
  }
}</code></pre>
                  </div>
                </div>

                <div class="type">
                  <h4>自身依赖</h4>
                  <p>依赖同一工作区的其他任务</p>
                  <div class="code-block">
                    <pre><code>{
  "test": {
    "dependsOn": ["build"] // 先构建再测试
  }
}</code></pre>
                  </div>
                </div>

                <div class="type">
                  <h4>跨工作区依赖</h4>
                  <p>依赖其他工作区的任务</p>
                  <div class="code-block">
                    <pre><code>{
  "deploy": {
    "dependsOn": ["build", "ui#build"] // 依赖自身和 ui 包的构建
  }
}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="caching">
        <h2><span class="icon">💾</span> 缓存策略</h2>
        <div class="card">
          <div class="caching-strategies">
            <div class="strategy">
              <h3>1. 本地缓存</h3>
              <p>Turborepo 默认使用本地缓存：</p>
              <div class="code-block">
                <pre><code># 查看缓存位置
turbo info

# 示例输出
Local cache directory: /Users/me/.cache/turbo
Local cache size: 1.2 GB

# 清除本地缓存
turbo run build --force</code></pre>
              </div>

              <h4>缓存命中流程：</h4>
              <div class="cache-flow">
                <div class="step">
                  <div class="number">1</div>
                  <div class="content">计算任务哈希（输入+依赖）</div>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <div class="number">2</div>
                  <div class="content">检查本地缓存是否存在匹配</div>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <div class="number">3</div>
                  <div class="content">命中则恢复输出，跳过执行</div>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <div class="number">4</div>
                  <div class="content">未命中则执行任务并缓存结果</div>
                </div>
              </div>
            </div>

            <div class="strategy">
              <h3>2. 远程缓存</h3>
              <p>与团队共享缓存，加速 CI/CD：</p>
              <div class="code-block">
                <pre><code># 登录 Vercel
npx turbo login

# 链接项目
npx turbo link

# 运行任务并上传缓存
turbo run build --remote-only

# 下载远程缓存
turbo run build --remote-only</code></pre>
              </div>

              <h4>高级远程缓存配置：</h4>
              <div class="code-block">
                <pre><code>// turbo.json
{
  "remoteCache": {
    "signature": true, // 启用签名验证
    "teamId": "team_123456", // 团队ID
    "teamSlug": "my-team", // 团队slug
    "apiUrl": "https://vercel.com/api", // 自定义API端点
    "timeout": 60 // 超时时间(秒)
  }
}</code></pre>
              </div>
            </div>

            <div class="strategy">
              <h3>3. 缓存优化策略</h3>
              <p>最大化缓存命中率：</p>
              <div class="tips">
                <div class="tip">
                  <h4>正确设置 outputs</h4>
                  <p>确保包含所有输出文件：</p>
                  <div class="code-block">
                    <pre><code>{
  "build": {
    "outputs": [
      "dist/**",
      "lib/**",
      "!**/*.map" // 排除源映射文件
    ]
  }
}</code></pre>
                  </div>
                </div>

                <div class="tip">
                  <h4>环境变量管理</h4>
                  <p>声明影响构建的环境变量：</p>
                  <div class="code-block">
                    <pre><code>{
  "build": {
    "env": ["NODE_ENV", "API_URL"]
  },
  "test": {
    "env": ["CI"]
  }
}</code></pre>
                  </div>
                </div>

                <div class="tip">
                  <h4>文件依赖声明</h4>
                  <p>指定影响任务输出的文件：</p>
                  <div class="code-block">
                    <pre><code>{
  "build": {
    "inputs": [
      "src/**/*.ts",
      "tsconfig.json",
      "package.json"
    ]
  }
}</code></pre>
                  </div>
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
              <h3>1. 自定义任务执行器</h3>
              <p>使用 <code>turbo run</code> 执行复杂任务流：</p>
              <div class="code-block">
                <pre><code># 基本执行
turbo run build

# 并行执行
turbo run lint test --parallel

# 指定工作区
turbo run build --filter=docs...

# 包含依赖项
turbo run build --filter=...ui

# 仅自上次提交更改的工作区
turbo run test --since=origin/main

# 忽略缓存
turbo run build --force

# 分析构建
turbo run build --graph=graph.html</code></pre>
              </div>
            </div>

            <div class="section">
              <h3>2. 集成测试覆盖率</h3>
              <p>配置测试覆盖率报告：</p>
              <div class="code-block">
                <pre><code>// turbo.json
{
  "pipeline": {
    "test": {
      "outputs": ["coverage/**"],
      "dependsOn": ["build"]
    }
  }
}

// package.json (工作区)
{
  "scripts": {
    "test": "jest --coverage"
  }
}

// 根目录命令
turbo run test --coverage --parallel</code></pre>
              </div>
            </div>

            <div class="section">
              <h3>3. 多环境配置</h3>
              <p>管理不同环境配置：</p>
              <div class="code-block">
                <pre><code>// turbo.json
{
  "pipeline": {
    "build": {
      "env": ["NODE_ENV"],
      "outputs": {
        "production": ["dist/**"],
        "development": ["dev-dist/**"]
      }
    }
  }
}

// 运行生产构建
NODE_ENV=production turbo run build

// 运行开发构建
NODE_ENV=development turbo run build</code></pre>
              </div>
            </div>

            <div class="section">
              <h3>4. CI/CD 集成</h3>
              <p>GitHub Actions 配置示例：</p>
              <div class="code-block">
                <pre><code>name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0  # 获取完整历史记录用于变更检测

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Login to Vercel
        run: npx turbo login --sso-team=my-team
        env:
          TURBO_TOKEN: $&#123;&#123; secrets.TURBO_TOKEN &#125;&#125;

      - name: Build with cache
        run: npx turbo run build test lint --remote-only
        env:
          TURBO_TEAM: my-team
          TURBO_TOKEN: $&#123;&#123; secrets.TURBO_TOKEN &#125;&#125;

      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: npx turbo run deploy --remote-only
        env:
          TURBO_TEAM: my-team
          TURBO_TOKEN: $&#123;&#123; secrets.TURBO_TOKEN &#125;&#125;</code></pre>
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
              <h3>缓存未命中</h3>
              <p><strong>问题：</strong> 相同代码构建未使用缓存</p>
              <p><strong>解决方案：</strong></p>
              <ul>
                <li>检查 <code>outputs</code> 配置是否完整</li>
                <li>确保 <code>inputs</code> 包含所有相关文件</li>
                <li>声明所有环境变量 (<code>env</code>)</li>
                <li>使用 <code>turbo run --dry-run</code> 调试</li>
              </ul>
            </div>

            <div class="issue">
              <h3>任务依赖问题</h3>
              <p><strong>问题：</strong> 任务未按正确顺序执行</p>
              <p><strong>解决方案：</strong></p>
              <ul>
                <li>检查 <code>dependsOn</code> 配置</li>
                <li>确保工作区依赖关系正确</li>
                <li>使用 <code>turbo run --graph</code> 可视化依赖</li>
                <li>验证工作区 <code>package.json</code> 依赖</li>
              </ul>
            </div>

            <div class="issue">
              <h3>远程缓存失败</h3>
              <p><strong>问题：</strong> 无法上传或下载远程缓存</p>
              <p><strong>解决方案：</strong></p>
              <ul>
                <li>验证 <code>TURBO_TOKEN</code> 是否正确</li>
                <li>检查网络连接和防火墙设置</li>
                <li>确保团队 ID 和 slug 正确</li>
                <li>使用 <code>--verbosity=verbose</code> 获取详细日志</li>
              </ul>
            </div>

            <div class="issue">
              <h3>构建不一致</h3>
              <p><strong>问题：</strong> 不同环境构建结果不同</p>
              <p><strong>解决方案：</strong></p>
              <ul>
                <li>使用 <code>globalDependencies</code> 声明共享文件</li>
                <li>确保所有环境变量已声明</li>
                <li>锁定依赖版本 (<code>packageManager</code>)</li>
                <li>使用 Docker 确保环境一致性</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="migration">
        <h2><span class="icon">🔄</span> 从其他工具迁移</h2>
        <div class="card">
          <div class="migration-options">
            <div class="option">
              <h3>从 Lerna 迁移</h3>
              <div class="steps">
                <div class="step">
                  <div class="number">1</div>
                  <div class="content">移除 Lerna 依赖</div>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <div class="number">2</div>
                  <div class="content">安装 Turborepo</div>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <div class="number">3</div>
                  <div class="content">转换 <code>lerna.json</code> 到 <code>turbo.json</code></div>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <div class="number">4</div>
                  <div class="content">替换 <code>lerna run</code> 为 <code>turbo run</code></div>
                </div>
              </div>
            </div>

            <div class="option">
              <h3>从 Nx 迁移</h3>
              <div class="steps">
                <div class="step">
                  <div class="number">1</div>
                  <div class="content">保留 Nx 项目结构</div>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <div class="number">2</div>
                  <div class="content">安装 Turborepo</div>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <div class="number">3</div>
                  <div class="content">转换 <code>nx.json</code> 到 <code>turbo.json</code></div>
                </div>
                <div class="arrow">→</div>
                <div class="step">
                  <div class="number">4</div>
                  <div class="content">逐步替换 Nx 命令</div>
                </div>
              </div>
            </div>

            <div class="option">
              <h3>迁移助手</h3>
              <p>使用官方工具简化迁移：</p>
              <div class="code-block">
                <pre><code># 安装迁移工具
npm install @turbo/codemod -g

# 从 Lerna 迁移
npx @turbo/codemod create-turbo-config --from=lerna

# 从 Nx 迁移
npx @turbo/codemod create-turbo-config --from=nx

# 从 Rush 迁移
npx @turbo/codemod create-turbo-config --from=rush</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Turborepo 提供了一种高效、可靠的 Monorepo 构建解决方案，适用于各种规模的项目</p>
      <p>
        更多信息请参考官方文档：<a href="https://turbo.build/repo" target="_blank"
          >https://turbo.build/repo</a
        >
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 此组件不需要额外的逻辑，仅用于展示Turborepo配置
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

.turborepo-container {
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

h4 {
  font-size: 1.2rem;
  color: @primary-color;
  margin: 15px 0 10px;
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

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;

  .stat {
    text-align: center;
    padding: 20px;

    .value {
      font-size: 2.5rem;
      font-weight: 700;
      color: @primary-color;
    }

    .label {
      font-size: 1rem;
      color: #666;
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

// 配置部分
.config-sections {
  display: grid;
  gap: 30px;

  .section {
    h3 {
      border-left: 4px solid @primary-color;
      padding-left: 15px;
    }
  }
}

.config-table {
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

.dependency-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .type {
    background: #f0f4ff;
    border-radius: 10px;
    padding: 20px;
  }
}

// 缓存部分
.caching-strategies {
  display: grid;
  gap: 30px;

  .strategy {
    h3 {
      border-bottom: 2px solid @border-color;
      padding-bottom: 10px;
    }
  }
}

.cache-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  .step {
    text-align: center;
    flex: 1;

    .number {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 10px;
      font-weight: bold;
    }
  }

  .arrow {
    font-size: 1.5rem;
    color: @primary-color;
    margin: 0 -15px;
  }
}

.tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .tip {
    background: #f0f4ff;
    border-radius: 10px;
    padding: 15px;
  }
}

// 高级部分
.advanced-sections {
  display: grid;
  gap: 30px;
}

// 问题解决
.issues {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .issue {
    background: #f8f9ff;
    border-radius: 10px;
    padding: 20px;
    border-left: 4px solid @info-color;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

// 迁移部分
.migration-options {
  display: grid;
  gap: 30px;

  .option {
    h3 {
      color: @primary-color;
    }
  }
}

.steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  .step {
    text-align: center;
    flex: 1;

    .number {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 10px;
      font-weight: bold;
    }
  }

  .arrow {
    font-size: 1.5rem;
    color: @primary-color;
    margin: 0 -15px;
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

  .stats {
    flex-direction: column;
    gap: 15px;
  }

  .cache-flow {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }

  .steps {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }
}
</style>
