<template>
  <div class="workspace-container">
    <header class="header">
      <div class="logo-container">
        <div class="pnpm-logo">
          <div class="logo-text">pnpm</div>
        </div>
        <h1>pnpm-workspace.yaml 配置指南</h1>
      </div>
      <p class="subtitle">高效管理 Monorepo 项目的核心配置文件</p>
    </header>

    <div class="content">
      <section class="intro-section">
        <div class="intro-card">
          <h2>什么是 pnpm-workspace.yaml？</h2>
          <p>
            <code>pnpm-workspace.yaml</code> 是 PNPM 工作区（Monorepo）的核心配置文件，
            它定义了仓库中包含的包以及工作区的结构。通过此文件，PNPM 可以识别工作区内的所有包，
            并优化依赖安装和项目构建。
          </p>
        </div>
      </section>

      <section class="config-section">
        <h2><i class="icon-config"></i> 核心配置项</h2>

        <div class="config-table">
          <div class="table-header">
            <div class="col-key">配置项</div>
            <div class="col-desc">作用</div>
            <div class="col-example">示例值</div>
          </div>

          <div v-for="item in configItems" :key="item.key" class="table-row">
            <div class="col-key">
              <code>{{ item.key }}</code>
            </div>
            <div class="col-desc">{{ item.description }}</div>
            <div class="col-example">
              <pre>{{ item.example }}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="advanced-section">
        <h2><i class="icon-advanced"></i> 高级配置模式</h2>

        <div class="patterns-grid">
          <div v-for="pattern in advancedPatterns" :key="pattern.title" class="pattern-card">
            <h3>{{ pattern.title }}</h3>
            <p>{{ pattern.description }}</p>
            <div class="code-block">
              <pre>{{ pattern.example }}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="example-section">
        <h2><i class="icon-example"></i> 完整配置示例</h2>

        <div class="full-example">
          <pre class="code-block"># pnpm-workspace.yaml

packages:
  # 包含根目录下的所有包
  - 'packages/*'

  # 包含 components 目录下的所有包
  - 'components/**'

  # 包含 apps 目录下的所有应用
  - 'apps/*'

  # 排除测试目录
  - '!**/test/**'

  # 包含单个独立包
  - 'shared/utils'

# 共享配置
shared-workspace-lockfile: true
save-workspace-protocol: true
link-workspace-packages: true</pre>
        </div>
      </section>

      <section class="best-practices">
        <h2><i class="icon-best"></i> 最佳实践</h2>

        <div class="practices-grid">
          <div class="practice">
            <div class="practice-icon">📁</div>
            <h3>统一目录结构</h3>
            <p>保持所有包在统一目录下（如 packages/），便于管理</p>
          </div>
          <div class="practice">
            <div class="practice-icon">🔗</div>
            <h3>启用工作区协议</h3>
            <p>使用 <code>workspace:</code> 协议链接本地包</p>
          </div>
          <div class="practice">
            <div class="practice-icon">🧩</div>
            <h3>共享依赖</h3>
            <p>将通用依赖提升到根目录，减少重复安装</p>
          </div>
          <div class="practice">
            <div class="practice-icon">🚫</div>
            <h3>排除无关目录</h3>
            <p>使用 <code>!</code> 排除测试、文档等目录</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>PNPM Workspace 配置指南  | 高效 Monorepo 管理</p>
      <div class="footer-links">
        <a href="https://pnpm.io/workspaces" target="_blank">官方文档</a>
        <a href="https://pnpm.io/pnpm-workspace_yaml" target="_blank">配置参考</a>
        <a href="https://github.com/pnpm/pnpm" target="_blank">GitHub 仓库</a>
      </div>
      <p class="version">PNPM 版本: 7.x+ | 最后更新: {{ currentDate }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentDate = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const configItems = ref([
  {
    key: 'packages',
    description: '定义工作区中包含的包路径，支持 glob 模式',
    example: `packages:
  - 'packages/*'
  - 'apps/*'
  - '!**/test/**'`
  },
  {
    key: 'shared-workspace-lockfile',
    description: '使用共享的 lockfile 文件（默认为 true）',
    example: `shared-workspace-lockfile: true`
  },
  {
    key: 'save-workspace-protocol',
    description: '在 package.json 中使用 workspace: 协议（默认为 true）',
    example: `save-workspace-protocol: true`
  },
  {
    key: 'link-workspace-packages',
    description: '链接工作区包而不是从 registry 安装（默认为 true）',
    example: `link-workspace-packages: true`
  },
  {
    key: 'ignore-workspace-cycles',
    description: '忽略工作区中的循环依赖（慎用）',
    example: `ignore-workspace-cycles: true`
  },
  {
    key: 'hoist-workspace-packages',
    description: '将工作区包提升到根 node_modules（默认为 true）',
    example: `hoist-workspace-packages: true`
  },
  {
    key: 'hoist',
    description: '提升指定依赖到根 node_modules',
    example: `hoist:
  - 'react'
  - 'react-dom'`
  },
  {
    key: 'hoist-pattern',
    description: '使用模式匹配提升依赖',
    example: `hoist-pattern:
  - '*eslint*'
  - '*babel*'`
  },
  {
    key: 'shamefully-hoist',
    description: '强制提升所有依赖（兼容某些工具，不推荐）',
    example: `shamefully-hoist: true`
  },
  {
    key: 'package-import-method',
    description: '包链接方式（auto/hardlink/copy/clone）',
    example: `package-import-method: 'hardlink'`
  },
  {
    key: 'resolution-mode',
    description: '依赖解析模式（highest/direct）',
    example: `resolution-mode: 'highest'`
  }
]);

const advancedPatterns = ref([
  {
    title: '多目录结构',
    description: '管理分布在多个目录中的包',
    example: `packages:
  # 主包目录
  - 'packages/*'

  # 独立工具库
  - 'tools/*'

  # 应用目录
  - 'apps/*'

  # 文档目录
  - 'docs'`
  },
  {
    title: '嵌套工作区',
    description: '在子目录中定义嵌套工作区',
    example: `packages:
  - 'packages/*'
  - 'services/*'

  # 嵌套工作区
  - 'nested-workspace/packages/*'`
  },
  {
    title: '选择性包含',
    description: '包含特定目录但排除子目录',
    example: `packages:
  # 包含 packages 目录但排除 deprecated 包
  - 'packages/*'
  - '!packages/deprecated/*'

  # 包含 apps 目录但排除测试目录
  - 'apps/*'
  - '!apps/*/test'`
  },
  {
    title: '私有包配置',
    description: '管理私有包的特殊配置',
    example: `packages:
  - 'packages/*'
  - 'private-packages/*'

# 私有包使用独立的 lockfile
shared-workspace-lockfile: false`
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@text-lighter: #999;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.workspace-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7ff;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
  font-size: 15px;
}

.header {
  text-align: center;
  margin-bottom: 25px;
  padding: 20px 0;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  border-radius: 10px;
  color: white;

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .pnpm-logo {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

    .logo-text {
      font-weight: bold;
      font-size: 1.2rem;
      color: @primary-color;
    }
  }

  h1 {
    margin: 0;
    font-size: 2rem;
    letter-spacing: -0.3px;
  }

  .subtitle {
    font-size: 1.05rem;
    margin-top: 8px;
    opacity: 0.9;
    font-weight: 300;
  }
}

.intro-section {
  margin-bottom: 25px;

  .intro-card {
    background: @card-bg;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-left: 3px solid @accent-color;

    h2 {
      margin-top: 0;
      margin-bottom: 15px;
      color: @secondary-color;
      font-size: 1.4rem;
    }

    p {
      margin: 0;
      color: @text-light;
      line-height: 1.7;

      code {
        background: fade(@primary-color, 10%);
        color: @primary-color;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
      }
    }
  }
}

.config-section, .advanced-section, .example-section, .best-practices {
  background: @card-bg;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
  }
}

.config-table {
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  font-size: 14px;
}

.table-header {
  display: flex;
  background: fade(@primary-color, 7%);
  font-weight: 600;
  color: @primary-color;
  border-bottom: 1px solid #f0f0f0;

  .col-key {
    flex: 1.2;
    padding: 10px 12px;
    border-right: 1px solid #f0f0f0;
  }

  .col-desc {
    flex: 2.5;
    padding: 10px 12px;
    border-right: 1px solid #f0f0f0;
  }

  .col-example {
    flex: 1.8;
    padding: 10px 12px;
  }
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(even) {
    background: #fafbff;
  }

  .col-key {
    flex: 1.2;
    padding: 10px 12px;
    border-right: 1px solid #f0f0f0;
    font-weight: 500;

    code {
      font-family: 'Fira Code', monospace;
      color: @primary-color;
    }
  }

  .col-desc {
    flex: 2.5;
    padding: 10px 12px;
    border-right: 1px solid #f0f0f0;
    color: @text-light;
    font-size: 0.95em;
  }

  .col-example {
    flex: 1.8;
    padding: 10px 12px;

    pre {
      margin: 0;
      font-size: 0.85em;
      line-height: 1.4;
      white-space: pre-wrap;
      font-family: 'Fira Code', monospace;
      color: @text-light;
      background: #f9f9ff;
      padding: 6px 8px;
      border-radius: 4px;
      border: 1px solid #f0f0f0;
      overflow-x: auto;
    }
  }
}

.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 18px;
  margin-top: 15px;
}

.pattern-card {
  background: #f9f9ff;
  border-radius: 6px;
  padding: 16px;
  border-left: 3px solid @accent-color;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: @primary-color;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 12px;
    color: @text-light;
    font-size: 0.95em;
    line-height: 1.6;
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85em;
  line-height: 1.4;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.full-example {
  margin-top: 15px;

  .code-block {
    font-size: 0.9em;
    padding: 15px;
  }
}

.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 18px;
    margin-top: 15px;
  }

  .practice {
    background: #f9f9ff;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    border: 1px solid #f0f0f0;

    .practice-icon {
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    h3 {
      margin: 0 0 8px;
      color: @primary-color;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: @text-light;
      font-size: 0.9em;
      line-height: 1.5;

      code {
        font-family: 'Fira Code', monospace;
        color: @primary-color;
        background: fade(@primary-color, 10%);
        padding: 1px 4px;
        border-radius: 3px;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px 0;
  color: @text-lighter;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 12px 0;

    a {
      color: @primary-color;
      text-decoration: none;
      font-size: 0.9rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .version {
    margin-top: 5px;
    font-size: 0.8rem;
  }
}

// 图标类
.icon-config::before { content: "⚙️"; }
.icon-advanced::before { content: "🚀"; }
.icon-example::before { content: "📋"; }
.icon-best::before { content: "✅"; }

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.7rem;
  }

  .table-header,
  .table-row {
    flex-direction: column;
  }

  .col-key,
  .col-desc,
  .col-example {
    flex: none !important;
    width: 100%;
    border-right: none !important;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 12px !important;
  }

  .table-row .col-example {
    border-bottom: none;
  }

  .patterns-grid {
    grid-template-columns: 1fr;
  }

  .best-practices .practices-grid {
    grid-template-columns: 1fr;
  }
}
</style>
