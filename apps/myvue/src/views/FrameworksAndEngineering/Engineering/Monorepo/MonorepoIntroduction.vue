<template>
  <div class="monorepo-guide">
    <header class="header">
      <div class="header-content">
        <h1>Monorepo 技术指南</h1>
        <p class="subtitle">现代前端架构的核心解决方案</p>
        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">72%</div>
            <div class="stat-label">大型项目采用Monorepo</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">3-5x</div>
            <div class="stat-label">依赖管理效率提升</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">85%</div>
            <div class="stat-label">代码复用率提升</div>
          </div>
        </div>
      </div>
      <div class="header-illustration">
        <div class="monorepo-diagram">
          <div class="main-repo">Monorepo</div>
          <div class="packages">
            <div class="package">Web App</div>
            <div class="package">Mobile App</div>
            <div class="package">Shared UI</div>
            <div class="package">API Service</div>
            <div class="package">Utils</div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="section">
        <h2 class="section-title">📚 Monorepo 基本概念</h2>
        <div class="definition-cards">
          <div class="definition-card">
            <div class="definition-icon">📁</div>
            <h3>什么是 Monorepo？</h3>
            <p>Monorepo（单一仓库）是一种软件开发策略，将多个相关项目的代码存储在同一个版本控制仓库中，而不是分散在多个独立仓库中。</p>
          </div>

          <div class="definition-card">
            <div class="definition-icon">🔄</div>
            <h3>与 Multirepo 对比</h3>
            <div class="comparison">
              <div class="comparison-item">
                <h4>Monorepo</h4>
                <ul>
                  <li>单一代码仓库</li>
                  <li>统一版本控制</li>
                  <li>集中依赖管理</li>
                </ul>
              </div>
              <div class="comparison-item">
                <h4>Multirepo</h4>
                <ul>
                  <li>多个独立仓库</li>
                  <li>分散依赖管理</li>
                  <li>独立版本控制</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="definition-card">
            <div class="definition-icon">🏢</div>
            <h3>采用 Monorepo 的公司</h3>
            <div class="company-logos">
              <div class="logo">Google</div>
              <div class="logo">Facebook</div>
              <div class="logo">Microsoft</div>
              <div class="logo">Twitter</div>
              <div class="logo">Uber</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">✨ Monorepo 核心优势</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">🧠</div>
            <h3>代码共享</h3>
            <p>多个项目可轻松共享公共代码、组件和工具库，避免重复开发。</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">🧩</div>
            <h3>依赖管理</h3>
            <p>统一管理所有依赖版本，避免版本冲突和依赖地狱问题。</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">🔗</div>
            <h3>原子提交</h3>
            <p>跨多个项目的更改可以在单个提交中完成，保持修改一致性。</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">🚀</div>
            <h3>简化工作流</h3>
            <p>统一构建、测试和发布流程，减少配置复杂性。</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">👥</div>
            <h3>团队协作</h3>
            <p>简化跨团队协作，所有开发者可见整个项目生态。</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">🔍</div>
            <h3>代码可见性</h3>
            <p>所有项目代码透明可见，便于发现和复用已有解决方案。</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">🛠️ Monorepo 实现工具</h2>
        <div class="tools-grid">
          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo nx">NX</div>
              <div class="tool-info">
                <h3>Nx</h3>
                <div class="tool-type">Monorepo工具链</div>
              </div>
            </div>
            <div class="tool-features">
              <ul>
                <li>强大的项目图分析</li>
                <li>增量构建与测试</li>
                <li>分布式任务执行</li>
                <li>丰富的插件生态系统</li>
              </ul>
            </div>
            <div class="tool-install">
              <span class="command">npx create-nx-workspace@latest</span>
            </div>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo turborepo">T</div>
              <div class="tool-info">
                <h3>Turborepo</h3>
                <div class="tool-type">高性能构建系统</div>
              </div>
            </div>
            <div class="tool-features">
              <ul>
                <li>增量构建</li>
                <li>并行执行</li>
                <li>云端缓存</li>
                <li>零配置</li>
              </ul>
            </div>
            <div class="tool-install">
              <span class="command">npx create-turbo@latest</span>
            </div>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo yarn">Y</div>
              <div class="tool-info">
                <h3>Yarn Workspaces</h3>
                <div class="tool-type">依赖管理方案</div>
              </div>
            </div>
            <div class="tool-features">
              <ul>
                <li>内置Monorepo支持</li>
                <li>依赖提升</li>
                <li>跨项目链接</li>
                <li>与Yarn无缝集成</li>
              </ul>
            </div>
            <div class="tool-install">
              <span class="command">yarn init -w</span>
            </div>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo pnpm">P</div>
              <div class="tool-info">
                <h3>PNPM Workspaces</h3>
                <div class="tool-type">高效依赖管理</div>
              </div>
            </div>
            <div class="tool-features">
              <ul>
                <li>高效的磁盘空间利用</li>
                <li>严格的依赖隔离</li>
                <li>高性能安装</li>
                <li>兼容Node模块解析</li>
              </ul>
            </div>
            <div class="tool-install">
              <span class="command">pnpm init</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">💻 Monorepo 实战示例</h2>
        <div class="implementation">
          <div class="code-examples">
            <div class="code-block">
              <h3>项目结构</h3>
              <pre><code>monorepo/
├── apps/
│   ├── web-app/       # 前端应用
│   └── mobile-app/    # 移动端应用
├── packages/
│   ├── shared-ui/     # 共享UI组件库
│   ├── utils/         # 工具函数库
│    └── api-client/    # API客户端库
├── package.json       # 根工作区配置
└── turbo.json         # Turborepo配置</code></pre>
            </div>

            <div class="code-block">
              <h3>共享组件使用</h3>
              <pre><code>// apps/web-app/src/App.vue
import { Button } from '@monorepo/shared-ui';

export default {
  components: {
    Button
  }
}</code></pre>
            </div>

            <div class="code-block">
              <h3>Turborepo 配置</h3>
              <pre><code>// turbo.json
{
  "pipeline": {
    "build": {
      "outputs": ["dist/**"],
      "dependsOn": ["^build"]
    },
    "test": {
      "outputs": [],
      "dependsOn": ["^build"]
    },
    "lint": {
      "outputs": [],
      "dependsOn": []
    }
  }
}</code></pre>
            </div>
          </div>

          <div class="workflow">
            <h3>Monorepo 工作流程</h3>
            <div class="workflow-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>创建共享包</h4>
                  <p>在 packages 目录下创建可复用库</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>配置工作区</h4>
                  <p>在根 package.json 中配置 workspaces</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>链接依赖</h4>
                  <p>在应用中使用 workspace: 协议引用本地包</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>运行任务</h4>
                  <p>使用工具链命令运行跨项目任务</p>
                </div>
              </div>
            </div>

            <div class="terminal-demo">
              <div class="terminal-header">Terminal</div>
              <div class="terminal-content">
                <p><span class="prompt">$</span> turbo run build test lint</p>
                <p class="output">• Packages in scope: web-app, mobile-app, shared-ui, utils</p>
                <p class="output">• Running build, test, lint in 4 packages</p>
                <p class="output">• Remote caching enabled</p>
                <p class="output success">✓ Tasks completed in 12.5s</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">📊 Monorepo 适用场景</h2>
        <div class="use-cases">
          <div class="case-card">
            <div class="case-icon">🌐</div>
            <h3>多平台应用</h3>
            <p>Web、移动端、桌面端应用共享业务逻辑和组件</p>
          </div>

          <div class="case-card">
            <div class="case-icon">🧩</div>
            <h3>微前端架构</h3>
            <p>多个微前端应用在同一仓库中协同开发</p>
          </div>

          <div class="case-card">
            <div class="case-icon">📚</div>
            <h3>组件库开发</h3>
            <p>组件库与演示应用在同一仓库中测试和开发</p>
          </div>

          <div class="case-card">
            <div class="case-icon">🔧</div>
            <h3>工具链开发</h3>
            <p>相关工具和插件在单一仓库中维护</p>
          </div>

          <div class="case-card">
            <div class="case-icon">🏗️</div>
            <h3>全栈项目</h3>
            <p>前端、后端、共享类型定义在单一仓库</p>
          </div>

          <div class="case-card">
            <div class="case-icon">👥</div>
            <h3>跨团队协作</h3>
            <p>多个团队协作开发相关产品</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">⚖️ Monorepo 决策指南</h2>
        <div class="decision-guide">
          <div class="pros-cons">
            <div class="pros">
              <h3>✅ 使用 Monorepo 的场景</h3>
              <ul>
                <li>多个紧密相关的项目</li>
                <li>需要频繁共享代码</li>
                <li>需要统一的构建/测试流程</li>
                <li>跨项目重构频繁</li>
                <li>团队熟悉Monorepo工具链</li>
              </ul>
            </div>

            <div class="cons">
              <h3>⚠️ 避免 Monorepo 的场景</h3>
              <ul>
                <li>无关的项目集合</li>
                <li>项目有不同安全要求</li>
                <li>项目版本周期差异大</li>
                <li>团队规模小且项目简单</li>
                <li>基础设施不支持大型仓库</li>
              </ul>
            </div>
          </div>

          <div class="migration-tips">
            <h3>迁移到 Monorepo 的建议</h3>
            <ol>
              <li>从关键共享代码开始逐步迁移</li>
              <li>选择适合的工具链（Nx、Turborepo等）</li>
              <li>建立统一的代码规范和流程</li>
              <li>配置适当的CI/CD流水线</li>
              <li>提供团队培训和文档支持</li>
            </ol>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Monorepo 技术指南 © 2023 | 简化复杂项目，提升协作效率 | 推荐工具：Nx, Turborepo, PNPM</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const activeTool = ref('nx');
</script>

<style lang="less" scoped>
.monorepo-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #2c3e50;
  background: #f8fafc;
  line-height: 1.6;
}

.header {
  display: flex;
  background: linear-gradient(135deg, #1a2a6c 0%, #2a9d8f 100%);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 40px;
  color: white;
  box-shadow: 0 10px 30px rgba(26, 42, 108, 0.2);

  .header-content {
    flex: 1;
    padding: 40px;

    h1 {
      font-size: 2.8rem;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      margin-bottom: 30px;
    }
  }

  .stats {
    display: flex;
    gap: 25px;

    .stat-item {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      padding: 15px 20px;
      text-align: center;
      min-width: 140px;

      .stat-value {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.85;
      }
    }
  }

  .header-illustration {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background: rgba(255, 255, 255, 0.1);

    .monorepo-diagram {
      display: flex;
      flex-direction: column;
      align-items: center;

      .main-repo {
        background: rgba(255, 255, 255, 0.9);
        color: #1a2a6c;
        padding: 25px 60px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 1.4rem;
        margin-bottom: 30px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .packages {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        max-width: 500px;

        .package {
          background: rgba(255, 255, 255, 0.85);
          color: #2a9d8f;
          padding: 20px;
          border-radius: 8px;
          min-width: 140px;
          text-align: center;
          font-weight: 600;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}

.section {
  margin-bottom: 50px;

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #eaecef;
    color: #1a2a6c;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.definition-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.definition-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .definition-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #2a9d8f;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #1a2a6c;
  }

  p {
    color: #555;
  }

  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    .comparison-item {
      padding: 15px;
      border-radius: 8px;
      background: #f8f9fc;

      h4 {
        margin-top: 0;
        color: #1a2a6c;
        border-bottom: 1px solid #eaecef;
        padding-bottom: 10px;
      }

      ul {
        padding-left: 20px;
        margin: 10px 0 0 0;

        li {
          margin-bottom: 8px;
          color: #555;
        }
      }
    }
  }

  .company-logos {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 15px;

    .logo {
      background: #e9f8f5;
      color: #2a9d8f;
      padding: 8px 15px;
      border-radius: 20px;
      font-weight: 500;
    }
  }
}

.benefits-grid,
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.benefit-card,
.case-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .benefit-icon,
  .case-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #2a9d8f;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #1a2a6c;
  }

  p {
    color: #555;
    margin: 0;
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.tool-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .tool-header {
    display: flex;
    padding: 25px;
    gap: 15px;
    align-items: center;
    background: linear-gradient(135deg, #f8f9fc 0%, #eef2f7 100%);

    .tool-logo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.8rem;
      color: white;

      &.nx {
        background: linear-gradient(135deg, #143984 0%, #00b4a0 100%);
      }

      &.turborepo {
        background: linear-gradient(135deg, #1a1a1a 0%, #4d4d4d 100%);
      }

      &.yarn {
        background: linear-gradient(135deg, #2c8ebb 0%, #67b246 100%);
      }

      &.pnpm {
        background: linear-gradient(135deg, #fbae00 0%, #f28200 100%);
      }
    }

    .tool-info {
      h3 {
        margin: 0 0 5px 0;
        color: #1a2a6c;
      }

      .tool-type {
        background: rgba(42, 157, 143, 0.15);
        color: #2a9d8f;
        font-size: 0.85rem;
        padding: 3px 10px;
        border-radius: 20px;
        display: inline-block;
      }
    }
  }

  .tool-features {
    padding: 20px 25px;

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 12px;
        color: #555;
        line-height: 1.5;
      }
    }
  }

  .tool-install {
    padding: 15px 25px;
    background: #f8f9fc;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;

    .command {
      color: #2a9d8f;
      font-weight: 500;
    }
  }
}

.implementation {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;

  .code-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .code-block {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      padding: 15px 20px;
      margin: 0;
      background: #f8f9fc;
      color: #1a2a6c;
      font-size: 1.1rem;
    }

    pre {
      margin: 0;
      padding: 20px;
      background: #2d2d2d;
      color: #f8f8f2;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }

  .workflow {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      color: #1a2a6c;
      padding-bottom: 15px;
      border-bottom: 1px solid #eaecef;
    }

    .workflow-steps {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 30px;

      .step {
        display: flex;
        gap: 15px;
        align-items: flex-start;

        .step-number {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #2a9d8f;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }

        .step-content {
          h4 {
            margin: 0 0 8px 0;
            color: #1a2a6c;
            font-size: 1.1rem;
          }

          p {
            margin: 0;
            color: #555;
            font-size: 0.95rem;
          }
        }
      }
    }

    .terminal-demo {
      background: #2d2d2d;
      border-radius: 8px;
      overflow: hidden;
      font-family: 'Fira Code', monospace;

      .terminal-header {
        padding: 10px 15px;
        background: #3c3c3c;
        color: #ccc;
        font-size: 0.9rem;
      }

      .terminal-content {
        padding: 20px;
        color: #f8f8f2;

        .prompt {
          color: #50fa7b;
          margin-right: 10px;
        }

        .output {
          color: #bd93f9;
          margin: 8px 0;
          padding-left: 24px;

          &.success {
            color: #50fa7b;
          }
        }
      }
    }
  }
}

.decision-guide {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;

    .pros,
    .cons {
      padding: 20px;
      border-radius: 8px;

      h3 {
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #eaecef;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      ul {
        padding-left: 20px;
        margin: 15px 0 0 0;

        li {
          margin-bottom: 12px;
          color: #555;
        }
      }
    }

    .pros {
      background: rgba(42, 157, 143, 0.05);
      border-left: 4px solid #2a9d8f;
    }

    .cons {
      background: rgba(239, 118, 122, 0.05);
      border-left: 4px solid #ef767a;
    }
  }

  .migration-tips {
    background: #f8f9fc;
    border-radius: 8px;
    padding: 25px;

    h3 {
      margin-top: 0;
      color: #1a2a6c;
    }

    ol {
      padding-left: 25px;
      margin: 15px 0 0 0;

      li {
        margin-bottom: 12px;
        color: #555;
        padding-left: 8px;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .header {
    flex-direction: column;

    .header-content {
      padding: 30px 20px;
    }
  }

  .implementation {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header .stats {
    flex-wrap: wrap;
  }

  .pros-cons {
    grid-template-columns: 1fr !important;
  }

  .definition-cards {
    grid-template-columns: 1fr;
  }

  .header-content {
    h1 {
      font-size: 2rem !important;
    }

    .subtitle {
      font-size: 1.1rem !important;
    }
  }

  .section-title {
    font-size: 1.5rem !important;
  }
}
</style>
