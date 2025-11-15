<template>
  <div class="rush-guide-container">
    <header>
      <h1>Rush.js 多仓库管理解决方案</h1>
      <p class="subtitle">高效管理大型 JavaScript 项目的工具集</p>
      <p>
        <a href="https://rushjs.io/zh-cn/pages/intro/welcome/" target="_blank">Rush.js 中文官网</a>
      </p>
    </header>

    <div class="hero-section">
      <div class="hero-content">
        <h2>加速开发 · 统一依赖 · 优化协作</h2>
        <p>专为大型项目设计的 Monorepo 工具，解决多包管理的复杂性</p>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-value">70%+</div>
          <div class="stat-label">构建时间减少</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">90%+</div>
          <div class="stat-label">依赖冲突解决</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">100%</div>
          <div class="stat-label">版本一致性</div>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <!-- Rush.js 简介部分 -->
      <section class="section intro-section">
        <h2>Rush.js 是什么？</h2>

        <div class="intro-content">
          <p class="intro-text">
            Rush 是由 Microsoft 开发的开源工具，用于管理包含多个相互依赖的 JavaScript
            项目的存储库（Monorepo）。它解决了大型项目中常见的依赖管理、版本控制和构建效率问题。
          </p>

          <div class="comparison">
            <div class="comparison-card">
              <h3>传统多仓库方案</h3>
              <ul>
                <li>依赖版本碎片化</li>
                <li>跨项目更新困难</li>
                <li>重复安装依赖</li>
                <li>构建流程不一致</li>
                <li>CI/CD 配置复杂</li>
              </ul>
            </div>

            <div class="vs">VS</div>

            <div class="comparison-card rush">
              <h3>Rush.js 方案</h3>
              <ul>
                <li>统一依赖管理</li>
                <li>原子级版本控制</li>
                <li>共享依赖安装</li>
                <li>并行化构建</li>
                <li>标准化工作流</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心功能部分 -->
      <section class="section features-section">
        <h2>核心功能</h2>

        <div class="features-container">
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>统一依赖管理</h3>
            <p>所有项目共享单一 node_modules 文件夹，避免重复安装</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>增量构建</h3>
            <p>只构建已更改的包及其依赖项，大幅提升构建速度</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>自动链接</h3>
            <p>自动链接项目间依赖，无需手动发布和安装</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>原子级版本控制</h3>
            <p>统一管理所有包的版本号，确保依赖一致性</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>策略执行</h3>
            <p>强制实施编码规范、依赖策略和项目规则</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>CI/CD 集成</h3>
            <p>内置支持主流 CI 系统，优化流水线性能</p>
          </div>
        </div>
      </section>

      <!-- 配置项基础介绍部分 -->
      <section class="section config-section">
        <h2>核心配置项基础介绍</h2>

        <div class="config-table">
          <div class="table-header">
            <div class="col-param">参数</div>
            <div class="col-type">类型</div>
            <div class="col-default">默认值</div>
            <div class="col-desc">描述</div>
          </div>

          <div class="table-row">
            <div class="col-param">rushVersion</div>
            <div class="col-type">string</div>
            <div class="col-default">-</div>
            <div class="col-desc">指定使用的 Rush 版本</div>
          </div>

          <div class="table-row">
            <div class="col-param">npmVersion</div>
            <div class="col-type">string</div>
            <div class="col-default">-</div>
            <div class="col-desc">指定使用的 npm 版本</div>
          </div>

          <div class="table-row highlight">
            <div class="col-param">projectFolderMinDepth</div>
            <div class="col-type">number</div>
            <div class="col-default">2</div>
            <div class="col-desc">项目文件夹最小深度，防止误扫描</div>
          </div>

          <div class="table-row highlight">
            <div class="col-param">projectFolderMaxDepth</div>
            <div class="col-type">number</div>
            <div class="col-default">2</div>
            <div class="col-desc">项目文件夹最大深度，控制扫描范围</div>
          </div>

          <div class="table-row">
            <div class="col-param">repository.url</div>
            <div class="col-type">string</div>
            <div class="col-default">-</div>
            <div class="col-desc">Git 仓库 URL，用于自动化发布</div>
          </div>

          <div class="table-row">
            <div class="col-param">ensureConsistentVersions</div>
            <div class="col-type">boolean</div>
            <div class="col-default">true</div>
            <div class="col-desc">确保所有项目使用相同的依赖版本</div>
          </div>

          <div class="table-row highlight">
            <div class="col-param">suppressNodeLtsWarning</div>
            <div class="col-type">boolean</div>
            <div class="col-default">false</div>
            <div class="col-desc">是否抑制 Node.js LTS 版本警告</div>
          </div>

          <div class="table-row">
            <div class="col-param">eventHooks</div>
            <div class="col-type">object</div>
            <div class="col-default">-</div>
            <div class="col-desc">构建事件钩子配置</div>
          </div>

          <div class="table-row highlight">
            <div class="col-param">gitPolicy</div>
            <div class="col-type">object</div>
            <div class="col-default">-</div>
            <div class="col-desc">Git 提交策略配置</div>
          </div>

          <div class="table-row">
            <div class="col-param">telemetryEnabled</div>
            <div class="col-type">boolean</div>
            <div class="col-default">true</div>
            <div class="col-desc">是否允许发送匿名遥测数据</div>
          </div>
        </div>

        <div class="config-example">
          <h3>rush.json 配置示例</h3>
          <div class="code-block">
            <pre>
{
  "$schema": "https://developer.microsoft.com/json-schemas/rush/v5/rush.schema.json",
  "rushVersion": "5.70.0",
  "npmVersion": "8.19.2",
  "nodeSupportedVersionRange": ">=16.13.0 &lt;17.0.0",

  "projectFolderMinDepth": 2,
  "projectFolderMaxDepth": 3,

  "projects": [
    {
      "packageName": "@company/core",
      "projectFolder": "core"
    },
    {
      "packageName": "@company/ui",
      "projectFolder": "libraries/ui"
    },
    {
      "packageName": "@company/api",
      "projectFolder": "services/api"
    }
  ],

  "ensureConsistentVersions": true,
  "suppressNodeLtsWarning": false,

  "gitPolicy": {
    "allowedEmailRegExps": ["@company\\.com$"],
    "sampleEmail": "developer@company.com"
  },

  "eventHooks": {
    "preRushInstall": [],
    "postRushInstall": ["do something"]
  }
}</pre
            >
          </div>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section class="section scenarios-section">
        <h2>使用场景</h2>

        <div class="scenarios-container">
          <div class="scenario-card">
            <h3>微前端架构</h3>
            <p>管理多个相互依赖的微前端应用，共享组件和工具库</p>
            <div class="scenario-benefits">
              <span>统一依赖</span>
              <span>原子发布</span>
              <span>跨应用调试</span>
            </div>
          </div>

          <div class="scenario-card">
            <h3>UI 组件库</h3>
            <p>维护包含多个独立组件和文档站点的设计系统</p>
            <div class="scenario-benefits">
              <span>自动版本</span>
              <span>按需构建</span>
              <span>变更追踪</span>
            </div>
          </div>

          <div class="scenario-card">
            <h3>全栈 Monorepo</h3>
            <p>统一管理前端应用、后端服务和共享代码库</p>
            <div class="scenario-benefits">
              <span>端到端测试</span>
              <span>依赖共享</span>
              <span>统一构建</span>
            </div>
          </div>

          <div class="scenario-card">
            <h3>插件生态系统</h3>
            <p>开发具有多个扩展插件和核心 SDK 的应用程序</p>
            <div class="scenario-benefits">
              <span>并行开发</span>
              <span>自动链接</span>
              <span>批量发布</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 工作流程部分 -->
      <section class="section workflow-section">
        <h2>Rush 工作流程</h2>

        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>初始化项目</h3>
              <div class="code-block">
                <pre>rush init</pre>
              </div>
              <p>创建基本 rush.json 配置文件和项目结构</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>添加新包</h3>
              <div class="code-block">
                <pre>rush add --package @company/new-package</pre>
              </div>
              <p>创建新包目录并添加到 rush.json 配置</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>安装依赖</h3>
              <div class="code-block">
                <pre>rush update</pre>
              </div>
              <p>统一安装所有依赖到公共 node_modules</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>增量构建</h3>
              <div class="code-block">
                <pre>rush build --to my-package</pre>
              </div>
              <p>仅构建指定包及其依赖项</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>版本与发布</h3>
              <div class="code-block">
                <pre>
rush version --bump
rush publish</pre
                >
              </div>
              <p>统一更新版本号并发布所有变更包</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践部分 -->
      <section class="section best-practices-section">
        <h2>最佳实践</h2>

        <div class="practices-container">
          <div class="practice-card">
            <h3>项目结构优化</h3>
            <ul>
              <li>按功能分组项目 (core/, libs/, apps/)</li>
              <li>保持项目文件夹深度一致</li>
              <li>为共享配置创建 config 包</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>构建性能优化</h3>
            <ul>
              <li>使用 rush build --parallel 并行构建</li>
              <li>配置增量构建策略</li>
              <li>启用构建缓存</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>Git 策略</h3>
            <ul>
              <li>配置 Git 钩子自动格式化</li>
              <li>使用 rush change 管理变更日志</li>
              <li>设置提交邮件策略</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>CI/CD 优化</h3>
            <ul>
              <li>使用 rush install --purge 清理环境</li>
              <li>配置只构建受影响包</li>
              <li>并行执行测试任务</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p> JavaScript Monorepo 解决方案 | Rush.js 权威指南</p>
      <p class="tip">
        提示：Rush 适用于大型项目，对于小型项目建议使用更简单的工具如 Lerna 或 Yarn Workspaces
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// TypeScript 逻辑可以留空或用于未来扩展
</script>

<style lang="less" scoped>
.rush-guide-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  color: #2d3748;
  background: #f8fafc;
  min-height: 100vh;
}

header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #4a6cf7 0%, #6b48ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #718096;
    font-weight: 400;
  }
}

.hero-section {
  display: flex;
  flex-wrap: wrap;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  .hero-content {
    flex: 1;
    min-width: 300px;
    padding-right: 2rem;

    h2 {
      font-size: 1.8rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.1rem;
      color: #4a5568;
      line-height: 1.6;
      max-width: 600px;
    }
  }

  .hero-stats {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .stat-item {
    background: #f0f7ff;
    border-radius: 8px;
    padding: 1.2rem;
    text-align: center;
    min-width: 140px;
    border-top: 3px solid #4a6cf7;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #4a6cf7;
    margin-bottom: 0.3rem;
  }

  .stat-label {
    font-size: 0.95rem;
    color: #718096;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  h2 {
    font-size: 1.5rem;
    color: #1a202c;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f0f4f8;
  }
}

.intro-section {
  .intro-content {
    p.intro-text {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #4a5568;
      margin-bottom: 2rem;
    }
  }

  .comparison {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }

  .comparison-card {
    flex: 1;
    min-width: 280px;
    background: #f8fafc;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;

    &.rush {
      background: #f0f7ff;
      border-color: #4a6cf7;
    }

    h3 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 1rem;
      text-align: center;
    }

    ul {
      padding-left: 1.2rem;
      margin-bottom: 0;

      li {
        margin-bottom: 0.7rem;
        line-height: 1.5;
        color: #4a5568;
      }
    }
  }

  .vs {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: #718096;
  }
}

.features-section {
  .features-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .feature-card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(74, 108, 247, 0.1);
    }
  }

  .feature-icon {
    width: 50px;
    height: 50px;
    background: #f0f7ff;
    border-radius: 8px;
    margin-bottom: 1rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      background: #4a6cf7;
      border-radius: 4px;
    }
  }

  h3 {
    font-size: 1.15rem;
    color: #2d3748;
    margin-top: 0;
    margin-bottom: 0.8rem;
  }

  p {
    color: #4a5568;
    margin: 0;
    font-size: 0.95rem;
  }
}

.config-section {
  .config-table {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .table-header {
    display: flex;
    background: #f0f7ff;
    font-weight: 600;
    color: #2d3748;
    border-bottom: 1px solid #e2e8f0;
  }

  .table-row {
    display: flex;
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }

    &.highlight {
      background: #f8fafc;
    }
  }

  .col-param,
  .col-type,
  .col-default,
  .col-desc {
    padding: 0.8rem 1rem;
  }

  .col-param {
    width: 25%;
    font-weight: 500;
  }

  .col-type {
    width: 15%;
    color: #4a5568;
  }

  .col-default {
    width: 15%;
    color: #4a5568;
  }

  .col-desc {
    width: 45%;
  }

  .config-example {
    h3 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 1rem;
    }
  }
}

.scenarios-section {
  .scenarios-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .scenario-card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 0.8rem;
    }

    p {
      color: #4a5568;
      margin-bottom: 1.2rem;
      min-height: 60px;
    }
  }

  .scenario-benefits {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      background: #e6f7ff;
      border-radius: 4px;
      padding: 0.3rem 0.8rem;
      font-size: 0.85rem;
      color: #1890ff;
    }
  }
}

.workflow-section {
  .workflow-steps {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .step {
    display: flex;
    gap: 1rem;
  }

  .step-number {
    flex: 0 0 36px;
    height: 36px;
    background: #4a6cf7;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .step-content {
    flex: 1;

    h3 {
      font-size: 1.15rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 0.8rem;
    }
  }
}

.best-practices-section {
  .practices-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .practice-card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.15rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    ul {
      padding-left: 1.2rem;
      margin-bottom: 0;

      li {
        margin-bottom: 0.7rem;
        line-height: 1.5;
        color: #4a5568;
      }
    }
  }
}

.code-block {
  background: #2d3748;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
  margin-bottom: 1.2rem;

  pre {
    margin: 0;
    color: #cbd5e0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 0.9rem;

  .tip {
    font-style: italic;
    color: #f44336;
    margin-top: 0.5rem;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;

    .hero-content {
      padding-right: 0;
      margin-bottom: 1.5rem;
    }
  }

  .table-header,
  .table-row {
    flex-wrap: wrap;
  }

  .col-param,
  .col-type,
  .col-default,
  .col-desc {
    width: 100% !important;
    padding: 0.5rem;
  }

  .col-param {
    font-weight: 600;
    background: #f0f7ff;
  }
}
</style>
