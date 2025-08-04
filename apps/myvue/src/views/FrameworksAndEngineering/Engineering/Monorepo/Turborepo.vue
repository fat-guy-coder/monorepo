<template>
  <div class="turborepo-container">
    <header class="app-header">
      <h1>Turborepo 基础介绍</h1>
      <p class="subtitle">下一代高性能 monorepo 构建系统</p>
      <p><a href="https://turbo.net.cn/docs" target="_blank">Turborepo 官方文档</a></p>
    </header>

    <div class="content-wrapper">
      <!-- 概念介绍 -->
      <section class="concept-section">
        <div class="info-card">
          <div class="header-with-icon">
            <div class="icon">⚡</div>
            <h2>什么是 Turborepo？</h2>
          </div>
          <p>Turborepo 是 Vercel 推出的高性能 monorepo 构建系统，专为 JavaScript 和 TypeScript 项目设计。它通过智能缓存和并行化执行大幅提升构建速度，优化多包项目的开发体验。
          </p>

          <div class="key-features">
            <div class="feature">
              <div class="feature-icon">🚀</div>
              <h3>极速构建</h3>
              <p>增量构建和智能缓存</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🧠</div>
              <h3>智能编排</h3>
              <p>任务依赖关系自动管理</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🔍</div>
              <h3>零配置</h3>
              <p>开箱即用，简单集成</p>
            </div>
          </div>
        </div>

        <div class="comparison-table">
          <h3>与传统构建工具对比</h3>
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Turborepo</th>
                <th>传统工具</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>构建速度</td>
                <td class="better">快 10-100 倍</td>
                <td>慢</td>
              </tr>
              <tr>
                <td>增量构建</td>
                <td class="better">✔️ 智能缓存</td>
                <td>❌ 有限支持</td>
              </tr>
              <tr>
                <td>并行处理</td>
                <td class="better">✔️ 自动并行</td>
                <td>❌ 需要手动配置</td>
              </tr>
              <tr>
                <td>配置复杂度</td>
                <td class="better">简单 JSON 配置</td>
                <td>复杂脚本</td>
              </tr>
              <tr>
                <td>云缓存</td>
                <td class="better">✔️ 支持</td>
                <td>❌ 不支持</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 核心功能 -->
      <section class="features-section">
        <h2 class="section-title">核心功能与优势</h2>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-header">
              <div class="icon">📦</div>
              <h3>增量构建</h3>
            </div>
            <p>Turborepo 自动缓存构建结果，只重新构建变更的部分</p>
            <div class="cache-visual">
              <div class="build">第一次构建</div>
              <div class="arrow">→</div>
              <div class="cache">缓存结果</div>
              <div class="arrow">→</div>
              <div class="build fast">后续构建 (快 90%)</div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-header">
              <div class="icon">🧩</div>
              <h3>任务管道</h3>
            </div>
            <p>定义任务依赖关系，自动确定执行顺序</p>
            <pre class="code-block">// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"], // 先构建依赖项
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]   // 测试前先构建
    }
  }
}</pre>
          </div>

          <div class="feature-card">
            <div class="feature-header">
              <div class="icon">⚡</div>
              <h3>并行执行</h3>
            </div>
            <p>独立任务并行执行，最大化利用 CPU 资源</p>
            <div class="parallel-visual">
              <div class="core">
                <div class="task" style="background: #3498db;">任务 A</div>
                <div class="task" style="background: #2ecc71;">任务 B</div>
              </div>
              <div class="core">
                <div class="task" style="background: #e74c3c;">任务 C</div>
                <div class="task" style="background: #9b59b6;">任务 D</div>
              </div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-header">
              <div class="icon">☁️</div>
              <h3>远程缓存</h3>
            </div>
            <p>与团队成员共享构建缓存，实现"一次构建，处处可用"</p>
            <pre class="code-block"># 启用远程缓存
npx turbo login
npx turbo link

# 构建并上传缓存
npx turbo build --remote-only</pre>
          </div>
        </div>
      </section>

      <!-- 使用指南 -->
      <section class="usage-section">
        <h2 class="section-title">使用指南</h2>

        <div class="setup-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>创建 Turborepo 项目</h3>
              <pre class="code-block"># 创建新项目
npx create-turbo@latest

# 或添加到现有项目
cd my-monorepo
yarn add turbo -DW</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>配置 turbo.json</h3>
              <p>定义构建管道和任务依赖</p>
              <pre class="code-block">{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
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
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>配置 package.json</h3>
              <p>添加 Turborepo 命令脚本</p>
              <pre class="code-block">{
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "dev": "turbo run dev --parallel"
  }
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>运行 Turborepo 命令</h3>
              <pre class="code-block"># 运行构建 (所有包)
npm run build

# 运行测试 (所有包)
npm run test

# 仅构建特定包
npx turbo run build --filter=web-app

# 开发模式 (并行运行)
npm run dev</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>管理缓存</h3>
              <pre class="code-block"># 清除 Turborepo 缓存
npx turbo prune --scope=web-app

# 生成构建依赖图
npx turbo run build --graph

# 查看缓存状态
npx turbo run build --dry=json</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级功能 -->
      <section class="advanced-section">
        <h2 class="section-title">高级功能</h2>

        <div class="advanced-grid">
          <div class="advanced-card">
            <div class="advanced-header">
              <div class="icon">🔗</div>
              <h3>任务依赖图</h3>
            </div>
            <div class="advanced-content">
              <p>可视化任务依赖关系，优化构建流程</p>
              <pre class="code-block"># 生成依赖图
npx turbo run build --graph

# 输出为 HTML 文件
npx turbo run build --graph=graph.html</pre>
              <div class="graph-visual">
                <div class="node">build</div>
                <div class="arrow">↓</div>
                <div class="nodes">
                  <div class="node">package-a build</div>
                  <div class="node">package-b build</div>
                </div>
                <div class="arrow">↓</div>
                <div class="node">test</div>
              </div>
            </div>
          </div>

          <div class="advanced-card">
            <div class="advanced-header">
              <div class="icon">🚫</div>
              <h3>选择性构建</h3>
            </div>
            <div class="advanced-content">
              <p>仅构建受影响的包，跳过未变更的部分</p>
              <pre class="code-block"># 仅构建自上次提交后变更的包
npx turbo run build --since=HEAD^1

# 仅构建特定包及其依赖
npx turbo run build --filter=web-app...

# 排除特定包
npx turbo run build --filter=!docs</pre>
            </div>
          </div>

          <div class="advanced-card">
            <div class="advanced-header">
              <div class="icon">🔑</div>
              <h3>环境变量管理</h3>
            </div>
            <div class="advanced-content">
              <p>控制环境变量对缓存的影响</p>
              <pre class="code-block">// turbo.json
{
  "pipeline": {
    "build": {
      "env": ["NODE_ENV", "API_KEY"],
      "outputs": ["dist/**"]
    },
    "test": {
      "env": ["CI"],
      "outputs": []
    }
  }
}</pre>
            </div>
          </div>

          <div class="advanced-card">
            <div class="advanced-header">
              <div class="icon">📦</div>
              <h3>输出配置</h3>
            </div>
            <div class="advanced-content">
              <p>定义缓存输出，确保正确缓存构建产物</p>
              <pre class="code-block">// turbo.json
{
  "pipeline": {
    "build": {
      "outputs": [
        "dist/**",         // 所有 dist 内容
        ".next/**",        // Next.js 构建输出
        "!dist/tmp/**"     // 排除临时文件
      ]
    }
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="scenarios-section">
        <h2 class="section-title">使用场景</h2>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-icon">🧩</div>
            <h3>组件库开发</h3>
            <p>管理多个 UI 组件包及其文档</p>
            <div class="structure">
              <div class="package">components/button</div>
              <div class="package">components/input</div>
              <div class="package">components/docs</div>
              <div class="package">storybook</div>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🌐</div>
            <h3>全栈应用</h3>
            <p>统一管理前端、后端和共享代码</p>
            <div class="structure">
              <div class="package">apps/web</div>
              <div class="package">apps/mobile</div>
              <div class="package">apps/api</div>
              <div class="package">packages/shared</div>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <h3>跨平台应用</h3>
            <p>构建 Web、移动端和桌面端应用</p>
            <div class="structure">
              <div class="package">apps/web</div>
              <div class="package">apps/ios</div>
              <div class="package">apps/android</div>
              <div class="package">apps/desktop</div>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🧪</div>
            <h3>微前端架构</h3>
            <p>协调多个独立前端应用</p>
            <div class="structure">
              <div class="package">apps/header</div>
              <div class="package">apps/dashboard</div>
              <div class="package">apps/admin</div>
              <div class="package">apps/shell</div>
            </div>
          </div>
        </div>

        <div class="performance-gain">
          <h3>性能提升示例</h3>
          <div class="gains">
            <div class="gain">
              <div class="gain-label">传统构建</div>
              <div class="gain-bar slow">3 min 45s</div>
            </div>
            <div class="gain">
              <div class="gain-label">首次 Turborepo 构建</div>
              <div class="gain-bar medium">1 min 20s</div>
            </div>
            <div class="gain">
              <div class="gain-label">后续 Turborepo 构建</div>
              <div class="gain-bar fast">8.7s</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 集成示例 -->
      <section class="integration-section">
        <h2 class="section-title">框架集成示例</h2>

        <div class="integration-tabs">
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <div v-if="activeTab === 0" class="integration-content">
              <h3>Next.js 集成</h3>
              <pre class="code-block">// apps/web/next.config.js
const { withTurbo } = require('@turbo/next');

module.exports = withTurbo({
  reactStrictMode: true,
});

// turbo.json
{
  "pipeline": {
    "dev": {
      "cache": false
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**"]
    },
    "start": {
      "cache": false
    }
  }
}</pre>
            </div>

            <div v-if="activeTab === 1" class="integration-content">
              <h3>React + Vite 集成</h3>
              <pre class="code-block">// apps/web/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});

// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "preview": {
      "cache": false
    }
  }
}</pre>
            </div>

            <div v-if="activeTab === 2" class="integration-content">
              <h3>Node.js 后端集成</h3>
              <pre class="code-block">// apps/api/package.json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}

// turbo.json
{
  "pipeline": {
    "build": {
      "outputs": ["dist/**"]
    },
    "start": {
      "cache": false,
      "persistent": true
    }
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <h2 class="section-title">最佳实践</h2>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">📦</div>
            <h3>正确配置输出</h3>
            <p>明确定义构建输出目录，确保缓存正确</p>
            <pre class="code-block">"outputs": ["dist/**", ".next/**"]</pre>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔗</div>
            <h3>管理任务依赖</h3>
            <p>使用 dependsOn 确保正确构建顺序</p>
            <pre class="code-block">"dependsOn": ["^build", "generate-types"]</pre>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🚫</div>
            <h3>禁用开发缓存</h3>
            <p>开发模式禁用缓存避免意外行为</p>
            <pre class="code-block">"dev": { "cache": false }</pre>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔒</div>
            <h3>环境变量管理</h3>
            <p>指定影响构建的环境变量</p>
            <pre class="code-block">"env": ["NODE_ENV", "API_KEY"]</pre>
          </div>

          <div class="practice-card">
            <div class="practice-icon">☁️</div>
            <h3>使用远程缓存</h3>
            <p>团队共享缓存加速 CI/CD</p>
            <pre class="code-block">npx turbo run build --remote-only</pre>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📊</div>
            <h3>监控构建性能</h3>
            <p>使用 --dry=json 分析构建过程</p>
            <pre class="code-block">npx turbo run build --dry=json</pre>
          </div>
        </div>
      </section>

      <!-- 迁移指南 -->
      <section class="migration-section">
        <h2 class="section-title">迁移到 Turborepo</h2>

        <div class="migration-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>安装 Turborepo</h3>
              <pre class="code-block">yarn add turbo -DW
# 或
npm install turbo --save-dev</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>创建 turbo.json</h3>
              <p>定义构建管道和任务</p>
              <pre class="code-block">{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>更新 package.json 脚本</h3>
              <pre class="code-block">{
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test"
  }
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>运行并优化</h3>
              <pre class="code-block"># 首次构建
npm run build

# 分析构建
npx turbo run build --dry=json

# 根据分析优化配置</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ref([
  { title: 'Next.js' },
  { title: 'React + Vite' },
  { title: 'Node.js' }
]);

const activeTab = ref(0);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@better-color: #2ecc71;
@worse-color: #e74c3c;

.turborepo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background-color: @light-bg;
  color: #333;
  min-height: 100vh;
  line-height: 1.6;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .subtitle {
    margin: 10px 0 0;
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  border-bottom: 2px solid @primary-color;
  padding-bottom: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
}

// 概念介绍部分
.concept-section {
  .info-card {
    background-color: #eef2ff;
    border-left: 4px solid @primary-color;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 30px;

    .header-with-icon {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .icon {
        font-size: 2rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h2 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.6rem;
      }
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
  }

  .key-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 25px;

    .feature {
      background-color: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      transition: transform 0.3s ease;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .feature-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0 0 10px 0;
        color: @secondary-color;
      }

      p {
        margin: 0;
        color: #555;
        font-size: 0.95rem;
      }
    }
  }

  .comparison-table {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 20px;
    margin-top: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      color: @secondary-color;
      font-size: 1.4rem;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        border: 1px solid @border-color;
        padding: 12px 15px;
        text-align: left;
      }

      th {
        background-color: #f5f5f5;
        font-weight: 600;
      }

      .better {
        color: @better-color;
        font-weight: 500;
      }

      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
    }
  }
}

// 核心功能部分
.features-section {
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
    margin-top: 20px;
  }

  .feature-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .feature-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .icon {
        font-size: 1.8rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.3rem;
      }
    }

    p {
      color: #555;
      margin-bottom: 15px;
    }
  }
}

.cache-visual {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  .build,
  .cache {
    background-color: #e3f2fd;
    border-radius: 8px;
    padding: 12px;
    text-align: center;
    flex: 1;
    font-weight: 500;
  }

  .fast {
    background-color: #e8f5e9;
  }

  .arrow {
    margin: 0 10px;
    color: @primary-color;
    font-weight: bold;
  }
}

.parallel-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 15px;

  .core {
    background-color: #f5f7fa;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .task {
      padding: 12px;
      border-radius: 6px;
      color: white;
      text-align: center;
      font-weight: 500;
    }
  }
}

// 使用指南部分
.usage-section {
  .setup-steps {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 20px;
  }

  .step {
    display: flex;
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .step-number {
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: @primary-color;
      color: white;
      font-size: 2rem;
      font-weight: bold;
      flex-shrink: 0;
    }

    .step-content {
      padding: 25px;
      flex: 1;

      h3 {
        margin-top: 0;
        color: @secondary-color;
        font-size: 1.4rem;
      }
    }
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 18px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow: auto;
  margin: 15px 0;
}

// 高级功能部分
.advanced-section {
  .advanced-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-top: 20px;
  }

  .advanced-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .advanced-header {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background: linear-gradient(to right, #f0f4ff, #e6f7ff);
      border-bottom: 1px solid @border-color;

      .icon {
        font-size: 1.8rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.3rem;
      }
    }

    .advanced-content {
      padding: 20px;

      p {
        margin-top: 0;
        color: #555;
      }
    }
  }
}

.graph-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;

  .node {
    background-color: #e3f2fd;
    border-radius: 8px;
    padding: 10px 20px;
    margin: 5px 0;
    font-weight: 500;
    text-align: center;
    min-width: 150px;
  }

  .nodes {
    display: flex;
    gap: 15px;
    margin: 5px 0;
  }

  .arrow {
    margin: 5px 0;
    color: @primary-color;
    font-weight: bold;
  }
}

// 使用场景部分
.scenarios-section {
  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .scenario-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 25px;
    text-align: center;
    transition: transform 0.3s ease;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .scenario-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: @primary-color;
    }

    h3 {
      margin: 0 0 10px 0;
      color: @secondary-color;
      font-size: 1.3rem;
    }

    p {
      margin: 0 0 15px 0;
      color: #555;
    }
  }

  .structure {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;

    .package {
      background-color: #e3f2fd;
      border-radius: 6px;
      padding: 10px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
}

.performance-gain {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;

  h3 {
    margin-top: 0;
    color: @secondary-color;
    font-size: 1.4rem;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  .gains {
    margin-top: 15px;
  }

  .gain {
    margin-bottom: 15px;

    .gain-label {
      margin-bottom: 5px;
      font-weight: 500;
    }

    .gain-bar {
      height: 30px;
      border-radius: 4px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      transition: width 0.5s ease;
    }

    .slow {
      background-color: #e74c3c;
      width: 100%;
    }

    .medium {
      background-color: #f39c12;
      width: 60%;
    }

    .fast {
      background-color: #2ecc71;
      width: 25%;
    }
  }
}

// 集成部分
.integration-section {
  .integration-tabs {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .tabs {
    display: flex;
    background-color: #f0f4ff;
    border-bottom: 1px solid @border-color;

    button {
      flex: 1;
      padding: 15px 20px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 500;
      color: #555;
      transition: all 0.3s;

      &.active {
        background-color: @primary-color;
        color: white;
      }

      &:not(.active):hover {
        background-color: #e0e6ff;
      }
    }
  }

  .tab-content {
    padding: 25px;

    .integration-content {
      h3 {
        margin-top: 0;
        color: @secondary-color;
        font-size: 1.4rem;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
    }
  }
}

// 最佳实践部分
.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .practice-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 25px 20px;
    text-align: center;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

    .practice-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: @primary-color;
    }

    h3 {
      margin: 0 0 10px 0;
      color: @secondary-color;
      font-size: 1.3rem;
    }

    p {
      margin: 0 0 15px 0;
      color: #555;
    }

    pre {
      background-color: #f5f7fa;
      border-left: 3px solid @primary-color;
      padding: 10px;
      border-radius: 0 4px 4px 0;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      text-align: left;
      margin: 0;
    }
  }
}

// 迁移指南部分
.migration-section {
  .migration-steps {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 20px;
  }

  .step {
    display: flex;
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .step-number {
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: @primary-color;
      color: white;
      font-size: 2rem;
      font-weight: bold;
      flex-shrink: 0;
    }

    .step-content {
      padding: 25px;
      flex: 1;

      h3 {
        margin-top: 0;
        color: @secondary-color;
        font-size: 1.4rem;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .step {
    flex-direction: column !important;

    .step-number {
      width: 100% !important;
      height: 50px !important;
    }
  }

  .features-grid,
  .advanced-grid,
  .scenarios-grid,
  .practices-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
