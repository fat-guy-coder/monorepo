<template>
  <div class="esbuild-container">
    <!-- 顶部标题区 -->
    <div class="header-banner">
      <div class="logo-container">
        <div class="esbuild-logo">
          <span>E</span><span>S</span><span>build</span>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">ESbuild - 极速 JavaScript 构建工具</h1>
        <p class="subtitle">下一代前端构建工具，速度提升 10-100 倍</p>
        <div class="features">
          <span>超快构建速度</span>
          <span>零配置启动</span>
          <span>多语言支持</span>
          <span>轻量级</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>什么是 ESbuild？</h2>
        </div>

        <div class="spec-grid">
          <div class="spec-card">
            <div class="spec-icon">💡</div>
            <h3>核心理念</h3>
            <ul>
              <li>重新思考前端构建工具的性能极限</li>
              <li>用 Go 语言编写，利用多核并行处理</li>
              <li>追求极致的构建速度和开发体验</li>
              <li>兼容现有 JavaScript 生态系统</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">🎯</div>
            <h3>设计目标</h3>
            <ul>
              <li>极速启动（毫秒级）</li>
              <li>强大的代码压缩能力</li>
              <li>开箱即用的 TypeScript/JSX 支持</li>
              <li>最小化依赖和复杂性</li>
              <li>提供简单易用的 API</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">⚡</div>
            <h3>性能对比</h3>
            <ul>
              <li>比 Webpack 快 10-100 倍</li>
              <li>比 Vite 开发服务器快 2-3 倍</li>
              <li>比 Rollup 快 5-20 倍</li>
              <li>比 Parcel 快 2-5 倍</li>
              <li>比 Terser 压缩快 10-100 倍</li>
            </ul>
          </div>
        </div>

        <div class="performance-chart">
          <div class="chart-header">
            <h3>构建工具速度对比（毫秒）</h3>
            <div class="chart-subtitle">典型项目构建时间（越小越好）</div>
          </div>
          <div class="chart-bars">
            <div class="bar-container esbuild">
              <div class="bar-label">ESbuild</div>
              <div class="bar" style="width: 10%"></div>
              <div class="bar-value">50ms</div>
            </div>
            <div class="bar-container vite">
              <div class="bar-label">Vite</div>
              <div class="bar" style="width: 25%"></div>
              <div class="bar-value">135ms</div>
            </div>
            <div class="bar-container rollup">
              <div class="bar-label">Rollup</div>
              <div class="bar" style="width: 35%"></div>
              <div class="bar-value">250ms</div>
            </div>
            <div class="bar-container webpack">
              <div class="bar-label">Webpack</div>
              <div class="bar" style="width: 100%"></div>
              <div class="bar-value">1200ms</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心功能 -->
      <section class="features-section">
        <div class="section-header">
          <div class="icon">✨</div>
          <h2>核心功能与优势</h2>
        </div>

        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>极速打包</h3>
            <p>Go 语言编写，并行处理，无需启动时间</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📦</div>
            <h3>开箱即用</h3>
            <p>支持 TypeScript、JSX、JSON 等格式</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>智能压缩</h3>
            <p>高级压缩算法，比 Terser 快 100 倍</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🌐</div>
            <h3>多平台支持</h3>
            <p>Windows、macOS、Linux 原生支持</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>插件系统</h3>
            <p>灵活扩展构建流程</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📝</div>
            <h3>Source Maps</h3>
            <p>完整支持 Source Map 生成</p>
          </div>
        </div>
      </section>

      <!-- 配置基础介绍 -->
      <section class="config-section">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>核心配置基础介绍</h2>
        </div>

        <div class="config-tabs">
          <div v-for="(tab, index) in tabs" :key="index" @click="activeTab = index"
            :class="['tab-item', { active: activeTab === index }]">
            {{ tab }}
          </div>
        </div>

        <div class="config-content">
          <!-- 入口配置 -->
          <div v-show="activeTab === 0" class="config-group">
            <h3 class="group-title">入口点配置</h3>

            <div class="config-card">
              <h4 class="config-name">entryPoints</h4>
              <div class="config-desc">
                <p>指定打包入口文件路径（字符串数组）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">entryPoints: ['src/index.tsx', 'src/utils.ts']</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">outdir</h4>
              <div class="config-desc">
                <p>输出目录（多入口点使用）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">outdir: 'dist'</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">outfile</h4>
              <div class="config-desc">
                <p>输出文件（单入口点使用）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">outfile: 'dist/bundle.js'</pre>
              </div>
            </div>
          </div>

          <!-- 输出配置 -->
          <div v-show="activeTab === 1" class="config-group">
            <h3 class="group-title">输出配置</h3>

            <div class="config-card">
              <h4 class="config-name">format</h4>
              <div class="config-desc">
                <p>输出格式：'iife', 'cjs', 'esm'</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">format: 'esm'</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">bundle</h4>
              <div class="config-desc">
                <p>是否打包所有依赖（默认 true）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">bundle: true</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">splitting</h4>
              <div class="config-desc">
                <p>是否启用代码分割（仅限 'esm' 格式）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">splitting: true</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">target</h4>
              <div class="config-desc">
                <p>目标 ECMAScript 版本</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">target: 'es2020'</pre>
              </div>
            </div>
          </div>

          <!-- 优化配置 -->
          <div v-show="activeTab === 2" class="config-group">
            <h3 class="group-title">优化配置</h3>

            <div class="config-card">
              <h4 class="config-name">minify</h4>
              <div class="config-desc">
                <p>是否压缩代码（默认 false）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">minify: true</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">treeShaking</h4>
              <div class="config-desc">
                <p>是否启用摇树优化（默认 true）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">treeShaking: true</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">sourcemap</h4>
              <div class="config-desc">
                <p>是否生成 Source Map</p>
                <p class="example-title">选项：</p>
                <ul>
                  <li><code>false</code>：不生成（默认）</li>
                  <li><code>true</code>：单独文件</li>
                  <li><code>'inline'</code>：内联在文件中</li>
                  <li><code>'external'</code>：单独文件但不包含内容</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 加载器配置 -->
          <div v-show="activeTab === 3" class="config-group">
            <h3 class="group-title">加载器配置</h3>

            <div class="config-card">
              <h4 class="config-name">loader</h4>
              <div class="config-desc">
                <p>文件类型与对应的加载器映射</p>
                <p class="example-title">可用加载器：</p>
                <ul>
                  <li><code>'js'</code>、<code>'jsx'</code></li>
                  <li><code>'ts'</code>、<code>'tsx'</code></li>
                  <li><code>'css'</code>、<code>'json'</code></li>
                  <li><code>'text'</code>、<code>'base64'</code></li>
                  <li><code>'file'</code>、<code>'dataurl'</code></li>
                </ul>
                <p class="example-title">示例：</p>
                <pre class="code-block">loader: {
  '.png': 'file',
  '.svg': 'dataurl',
  '.txt': 'text',
  '.css': 'css'
}</pre>
              </div>
            </div>
          </div>

          <!-- 插件配置 -->
          <div v-show="activeTab === 4" class="config-group">
            <h3 class="group-title">插件配置</h3>

            <div class="config-card">
              <h4 class="config-name">plugins</h4>
              <div class="config-desc">
                <p>插件数组，扩展 ESbuild 功能</p>
                <p class="example-title">示例插件：</p>
                <ul>
                  <li>esbuild-plugin-postcss2</li>
                  <li>esbuild-svg-plugin</li>
                  <li>esbuild-plugin-env</li>
                  <li>esbuild-plugin-html</li>
                </ul>
                <p class="example-title">代码示例：</p>
                <pre class="code-block">import { sassPlugin } from 'esbuild-sass-plugin'

plugins: [
  sassPlugin({
    cssImports: true
  })
]</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="scenarios-section">
        <div class="section-header">
          <div class="icon">🎯</div>
          <h2>使用场景</h2>
        </div>

        <div class="scenario-grid">
          <div class="scenario-card">
            <div class="scenario-icon">🚀</div>
            <h3>开发服务器</h3>
            <p>毫秒级启动速度，极速热更新</p>
            <div class="tech-used">
              <span>Vite</span>
              <span>Snowpack</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📦</div>
            <h3>生产打包</h3>
            <p>极速构建生产环境代码</p>
            <div class="tech-used">
              <span>CI/CD</span>
              <span>自动化部署</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📝</div>
            <h3>代码压缩</h3>
            <p>比 Terser 快 100 倍的压缩速度</p>
            <div class="tech-used">
              <span>替代 Terser</span>
              <span>压缩管道</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🧪</div>
            <h3>工具链开发</h3>
            <p>构建开发工具和 CLI 应用</p>
            <div class="tech-used">
              <span>CLI 工具</span>
              <span>IDE 插件</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔧</div>
            <h3>转换任务</h3>
            <p>TypeScript 转 JS、JSX 转换</p>
            <div class="tech-used">
              <span>代码转换</span>
              <span>格式转换</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">⚙️</div>
            <h3>与其他工具集成</h3>
            <p>作为 Webpack/Rollup 的插件使用</p>
            <div class="tech-used">
              <span>esbuild-loader</span>
              <span>rollup-plugin-esbuild</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 实战示例 -->
      <section class="examples-section">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>实战示例</h2>
        </div>

        <div class="example-tabs">
          <div v-for="(example, index) in examples" :key="index" @click="activeExample = index"
            :class="['example-tab', { active: activeExample === index }]">
            {{ example.title }}
          </div>
        </div>

        <div class="example-content">
          <!-- 基本打包 -->
          <div v-show="activeExample === 0" class="example-group">
            <h3 class="group-title">基本打包配置</h3>
            <pre class="code-block">// esbuild.config.js
const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/bundle.js',
  bundle: true,
  platform: 'browser',
  minify: true,
  sourcemap: true,
  target: 'es2020',
})
  .then(() => console.log('Build complete!'))
  .catch(() => process.exit(1));</pre>
          </div>

          <!-- 开发服务器 -->
          <div v-show="activeExample === 1" class="example-group">
            <h3 class="group-title">开发服务器配置</h3>
            <pre class="code-block">// esbuild-dev.js
const { serve } = require('esbuild');

serve(
  {
    servedir: 'public',
    port: 3000,
  },
  {
    entryPoints: ['src/index.jsx'],
    outfile: 'public/bundle.js',
    bundle: true,
    loader: {
      '.js': 'jsx',
      '.png': 'file',
    },
    sourcemap: true,
  }
).then((server) => {
  console.log(`Server running at http://localhost:${server.port}`);
});</pre>
          </div>

          <!-- Watch 模式 -->
          <div v-show="activeExample === 2" class="example-group">
            <h3 class="group-title">Watch 模式</h3>
            <pre class="code-block">// esbuild-watch.js
const { context } = require('esbuild');

context({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/bundle.js',
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
})
  .then((ctx) => {
    // 首次构建
    ctx.rebuild();

    // 启用 watch 模式
    ctx.watch();

    console.log('Watching for changes...');
  })
  .catch(() => process.exit(1));</pre>
          </div>

          <!-- 插件使用 -->
          <div v-show="activeExample === 3" class="example-group">
            <h3 class="group-title">使用插件示例</h3>
            <pre class="code-block">// esbuild-with-plugins.js
const { build } = require('esbuild');
const svgPlugin = require('esbuild-plugin-svg');
const postCssPlugin = require('esbuild-plugin-postcss2');

build({
  entryPoints: ['src/index.js'],
  outfile: 'dist/bundle.js',
  bundle: true,
  plugins: [
    svgPlugin(),
    postCssPlugin({
      plugins: [require('autoprefixer')]
    })
  ],
  loader: {
    '.svg': 'file',
    '.css': 'css'
  }
}).then(() => console.log('Build with plugins complete!'));</pre>
          </div>
        </div>
      </section>

      <!-- 与其他工具集成 -->
      <section class="integration-section">
        <div class="section-header">
          <div class="icon">🔌</div>
          <h2>与其他工具集成</h2>
        </div>

        <div class="integration-grid">
          <div class="integration-card vite">
            <div class="integration-logo">Vite</div>
            <div class="integration-desc">
              <h3>Vite 开发服务器</h3>
              <p>Vite 使用 ESbuild 预构建依赖和转换 TS/JSX</p>
            </div>
          </div>

          <div class="integration-card webpack">
            <div class="integration-logo">Webpack</div>
            <div class="integration-desc">
              <h3>esbuild-loader</h3>
              <p>替代 Babel 和 Terser，大幅提升构建速度</p>
            </div>
          </div>

          <div class="integration-card rollup">
            <div class="integration-logo">Rollup</div>
            <div class="integration-desc">
              <h3>rollup-plugin-esbuild</h3>
              <p>在 Rollup 中使用 ESbuild 处理 TS/JSX</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>ESbuild - 极速前端构建工具 | 性能王者 | © 2023</p>
      <div class="footer-links">
        <a href="https://esbuild.github.io/" target="_blank">官方文档</a>
        <a href="https://github.com/evanw/esbuild" target="_blank">GitHub</a>
        <a href="https://esbuild.github.io/plugins/" target="_blank">插件生态</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tabs = ref([
  '入口配置',
  '输出配置',
  '优化配置',
  '加载器配置',
  '插件配置'
]);

const examples = ref([
  { title: '基本打包' },
  { title: '开发服务器' },
  { title: 'Watch 模式' },
  { title: '插件使用' }
]);

const activeTab = ref(0);
const activeExample = ref(0);
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.esbuild-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .esbuild-logo {
    font-size: 3.5rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;

    span:first-child {
      color: #a78bfa;
    }

    span:nth-child(2) {
      color: #8b5cf6;
    }

    span:last-child {
      color: #ede9fe;
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

.features {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 0.95rem;
  opacity: 0.9;

  span {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.4rem 0.8rem;
    border-radius: 100px;
  }
}

.content-wrapper {
  padding: 0 2rem 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.5rem;

  .icon {
    font-size: 1.8rem;
    background: #e0e7ff;
    color: #4f46e5;
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
    color: #1e293b;
  }

  .section-subtitle {
    margin: 0.5rem 0 0;
    color: #64748b;
    font-size: 1.05rem;
  }
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.spec-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .spec-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #7c3aed;
  }

  h3 {
    margin-top: 0;
    color: #1e293b;
    font-size: 1.3rem;
    border-left: 4px solid #8b5cf6;
    padding-left: 0.8rem;
  }

  ul {
    padding-left: 1.2rem;
    margin: 1rem 0 0;

    li {
      margin-bottom: 0.6rem;
      line-height: 1.5;
    }
  }
}

.performance-chart {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;

  .chart-header {
    text-align: center;
    margin-bottom: 1.5rem;

    h3 {
      margin: 0 0 0.4rem;
      color: #4f46e5;
      font-size: 1.4rem;
    }

    .chart-subtitle {
      color: #64748b;
      font-size: 0.95rem;
    }
  }
}

.chart-bars {
  .bar-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;

    .bar-label {
      width: 80px;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .bar {
      height: 30px;
      border-radius: 4px;
      transition: width 1s ease;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), transparent);
        border-radius: 4px;
      }
    }

    .bar-value {
      font-size: 0.9rem;
      font-weight: 500;
      color: #4f46e5;
    }

    &.esbuild .bar {
      background: linear-gradient(90deg, #a78bfa, #8b5cf6);
    }

    &.vite .bar {
      background: linear-gradient(90deg, #a5b4fc, #818cf8);
    }

    &.rollup .bar {
      background: linear-gradient(90deg, #93c5fd, #60a5fa);
    }

    &.webpack .bar {
      background: linear-gradient(90deg, #f9a8d4, #f472b6);
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .feature-icon {
    font-size: 2.5rem;
    color: #8b5cf6;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #4f46e5;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
  }
}

.config-tabs {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;

  .tab-item {
    flex-shrink: 0;
    padding: 0.8rem 1.5rem;
    background: #e0e7ff;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #c7d2fe;
    }

    &.active {
      background: #4f46e5;
      color: white;
    }
  }
}

.config-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.group-title {
  font-size: 1.4rem;
  color: #4f46e5;
  margin-top: 0;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #e0e7ff;
}

.config-card {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .config-name {
    margin: 0 0 0.8rem;
    color: #2563eb;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: @font-code;
  }

  .config-desc {
    p {
      margin: 0.5rem 0;
      color: #334155;

      &.example-title {
        margin-top: 1rem;
        font-weight: 500;
        color: #4f46e5;
      }
    }

    ul {
      padding-left: 1.5rem;
      margin: 0.8rem 0;

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }
    }
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #8b5cf6;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #4f46e5;
    font-size: 1.3rem;
  }

  p {
    margin: 0 0 1.2rem;
    color: #64748b;
    font-size: 0.95rem;
  }

  .tech-used {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.6rem;

    span {
      background: #e0e7ff;
      color: #4f46e5;
      padding: 0.3rem 0.8rem;
      border-radius: 100px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  }
}

.example-tabs {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;

  .example-tab {
    flex-shrink: 0;
    padding: 0.8rem 1.5rem;
    background: #e0e7ff;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #c7d2fe;
    }

    &.active {
      background: #4f46e5;
      color: white;
    }
  }
}

.example-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.integration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.integration-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .integration-logo {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.3rem;
    color: white;
  }

  .integration-desc {
    padding: 1.5rem;
    flex: 1;

    h3 {
      margin-top: 0;
      color: #4f46e5;
    }

    p {
      margin: 0.5rem 0 0;
      color: #64748b;
    }
  }

  &.vite .integration-logo {
    background: linear-gradient(135deg, #a78bfa, #8b5cf6);
  }

  &.webpack .integration-logo {
    background: linear-gradient(135deg, #93c5fd, #60a5fa);
  }

  &.rollup .integration-logo {
    background: linear-gradient(135deg, #f9a8d4, #f472b6);
  }
}

.footer {
  text-align: center;
  padding: 2.5rem;
  color: #94a3b8;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 1rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: #4f46e5;
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
  background-color: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 1.2rem;
  font-family: @font-code;
  font-size: 0.92rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  margin: 0;
}

@media (max-width: 768px) {
  .header-banner {
    padding: 2rem 1rem;

    .esbuild-logo {
      font-size: 2.8rem;
    }
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .content-wrapper {
    padding: 0 1rem 2rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>
