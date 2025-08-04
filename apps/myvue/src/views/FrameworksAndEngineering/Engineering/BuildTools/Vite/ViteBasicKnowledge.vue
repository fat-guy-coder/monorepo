<template>
  <div class="vite-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Vite：下一代前端工具</h1>
        <p>闪电般快速的现代前端构建工具</p>
        <p><a href="https://vitejs.cn/vite3-cn/guide/" target="_blank">Vite 官网</a></p>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-value">10-100x</div>
            <div class="stat-label">开发速度提升</div>
          </div>
          <div class="stat">
            <div class="stat-value">1M+</div>
            <div class="stat-label">周下载量</div>
          </div>
          <div class="stat">
            <div class="stat-value">90%+</div>
            <div class="stat-label">开发者满意度</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="lightning">
          <div class="bolt"></div>
          <div class="bolt delay-1"></div>
          <div class="bolt delay-2"></div>
        </div>
        <div class="logo-text">Vite</div>
      </div>
    </div>

    <div class="content-container">
      <!-- 核心概念部分 -->
      <div class="section core-concepts">
        <h2 class="section-title">
          <span class="icon">⚡</span> Vite 核心概念
        </h2>

        <div class="concept-cards">
          <div class="concept-card">
            <div class="card-icon">🌐</div>
            <h3>原生 ESM</h3>
            <p>浏览器直接加载 ES 模块，无需打包</p>
          </div>
          <div class="concept-card">
            <div class="card-icon">🚀</div>
            <h3>按需编译</h3>
            <p>仅编译当前页面所需模块</p>
          </div>
          <div class="concept-card">
            <div class="card-icon">📦</div>
            <h3>依赖预构建</h3>
            <p>将 CommonJS 模块转换为 ESM</p>
          </div>
          <div class="concept-card">
            <div class="card-icon">🔌</div>
            <h3>插件架构</h3>
            <p>兼容 Rollup 插件生态系统</p>
          </div>
        </div>
      </div>

      <!-- 底层实现部分 -->
      <div class="section implementation">
        <h2 class="section-title">
          <span class="icon">🔧</span> 底层实现原理
        </h2>

        <div class="architecture">
          <div class="layer browser-layer">
            <div class="layer-title">浏览器</div>
            <div class="layer-items">
              <div class="item">加载 ESM</div>
              <div class="item">热模块替换</div>
              <div class="item">按需加载</div>
            </div>
          </div>

          <div class="arrow">⬇️</div>

          <div class="layer vite-layer">
            <div class="layer-title">Vite 开发服务器</div>
            <div class="layer-items">
              <div class="item">路由拦截</div>
              <div class="item">模块转换</div>
              <div class="item">HMR API</div>
            </div>
          </div>

          <div class="arrow">⬇️</div>

          <div class="layer esbuild-layer">
            <div class="layer-title">ESBuild</div>
            <div class="layer-items">
              <div class="item">依赖预构建</div>
              <div class="item">TS/JSX 编译</div>
              <div class="item">代码压缩</div>
            </div>
          </div>
        </div>

        <div class="code-comparison">
          <div class="comparison-item">
            <h3>传统打包工具</h3>
            <div class="code-block">
              <pre><code>// 启动时打包整个应用
import A from './A'
import B from './B'
import C from './C'
// 更多导入...

// 打包所有模块
const bundle = pack([A, B, C, ...])</code></pre>
            </div>
          </div>
          <div class="comparison-item">
            <h3>Vite 开发模式</h3>
            <div class="code-block">
              <pre><code>// 按需加载
// 仅当需要时编译模块
router.get('/src/A.js', (req, res) => {
  const code = compile('A.js')
  res.send(code)
})</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景部分 -->
      <div class="section use-cases">
        <h2 class="section-title">
          <span class="icon">🚀</span> 使用场景
        </h2>

        <div class="use-case-cards">
          <div class="use-case-card">
            <div class="case-icon">💻</div>
            <h3>现代框架开发</h3>
            <p>Vue, React, Svelte, Lit 等</p>
            <ul>
              <li>开箱即用的支持</li>
              <li>框架特定的 HMR</li>
              <li>优化的构建流程</li>
            </ul>
          </div>
          <div class="use-case-card">
            <div class="case-icon">📱</div>
            <h3>库开发</h3>
            <p>组件库、工具库开发</p>
            <ul>
              <li>多格式输出支持</li>
              <li>轻量级开发环境</li>
              <li>TypeScript 集成</li>
            </ul>
          </div>
          <div class="use-case-card">
            <div class="case-icon">🌐</div>
            <h3>静态网站</h3>
            <p>文档、博客、营销页面</p>
            <ul>
              <li>快速启动开发服务器</li>
              <li>Markdown 支持</li>
              <li>SSG 静态站点生成</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 生态系统部分 -->
      <div class="section ecosystem">
        <h2 class="section-title">
          <span class="icon">🌱</span> 生态系统
        </h2>

        <div class="ecosystem-tabs">
          <button v-for="(tab, index) in ecosystemTabs" :key="index" :class="{ active: activeTab === index }"
            @click="activeTab = index">
            {{ tab.title }}
          </button>
        </div>

        <div class="ecosystem-content">
          <div class="plugins-grid">
            <div class="plugin-card" v-for="(plugin, idx) in ecosystemTabs[activeTab].plugins" :key="idx">
              <div class="plugin-name">{{ plugin.name }}</div>
              <div class="plugin-desc">{{ plugin.description }}</div>
              <div class="plugin-install">npm: {{ plugin.package }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 优势对比部分 -->
      <div class="section advantages">
        <h2 class="section-title">
          <span class="icon">🏆</span> Vite 优势
        </h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Vite</th>
                <th>Webpack</th>
                <th>Create React App</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>启动时间</td>
                <td class="vite-cell">100-500ms</td>
                <td>10-30s</td>
                <td>5-15s</td>
              </tr>
              <tr>
                <td>热更新速度</td>
                <td class="vite-cell">50-200ms</td>
                <td>500ms-3s</td>
                <td>1-5s</td>
              </tr>
              <tr>
                <td>配置复杂度</td>
                <td class="vite-cell">简单</td>
                <td>复杂</td>
                <td>中等</td>
              </tr>
              <tr>
                <td>生产构建</td>
                <td class="vite-cell">Rollup</td>
                <td>Webpack</td>
                <td>Webpack</td>
              </tr>
              <tr>
                <td>ESM 支持</td>
                <td class="vite-cell">原生</td>
                <td>需插件</td>
                <td>需插件</td>
              </tr>
              <tr>
                <td>TypeScript</td>
                <td class="vite-cell">开箱即用</td>
                <td>需配置</td>
                <td>支持</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="benefits">
          <div class="benefit-card">
            <div class="benefit-icon">🚀</div>
            <div class="benefit-content">
              <h3>极速启动</h3>
              <p>原生 ESM 加载，无需打包整个应用</p>
            </div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔥</div>
            <div class="benefit-content">
              <h3>快速热更新</h3>
              <p>基于 ES 模块的 HMR，保持应用状态</p>
            </div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🧩</div>
            <div class="benefit-content">
              <h3>丰富功能</h3>
              <p>TypeScript、JSX、CSS 模块等开箱即用</p>
            </div>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">⚙️</div>
            <div class="benefit-content">
              <h3>简化配置</h3>
              <p>合理的默认配置，减少样板代码</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 迁移指南部分 -->
      <div class="section migration">
        <h2 class="section-title">
          <span class="icon">🔄</span> 迁移到 Vite
        </h2>

        <div class="migration-steps">
          <div class="step" v-for="(step, index) in migrationSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-code" v-if="step.code">
                <pre><code>{{ step.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Vite 代表了前端工具的未来，提供前所未有的开发体验</p>
      <div class="resources">
        <a href="#">官方文档</a>
        <a href="#">插件库</a>
        <a href="#">迁移指南</a>
        <a href="#">GitHub 仓库</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 生态系统数据
const ecosystemTabs = ref([
  {
    title: '官方插件',
    plugins: [
      { name: '@vitejs/plugin-vue', description: 'Vue 单文件组件支持', package: '@vitejs/plugin-vue' },
      { name: '@vitejs/plugin-react', description: 'React 快速刷新支持', package: '@vitejs/plugin-react' },
      { name: '@vitejs/plugin-legacy', description: '传统浏览器支持', package: '@vitejs/plugin-legacy' },
      { name: 'vite-plugin-pwa', description: '渐进式 Web 应用支持', package: 'vite-plugin-pwa' }
    ]
  },
  {
    title: '社区插件',
    plugins: [
      { name: 'vite-plugin-pages', description: '基于文件系统的路由', package: 'vite-plugin-pages' },
      { name: 'vite-plugin-md', description: 'Markdown 作为组件', package: 'vite-plugin-md' },
      { name: 'vite-plugin-svg-icons', description: 'SVG 图标处理', package: 'vite-plugin-svg-icons' },
      { name: 'vite-plugin-inspect', description: '检查 Vite 中间件状态', package: 'vite-plugin-inspect' }
    ]
  },
  {
    title: '框架集成',
    plugins: [
      { name: 'Vitepress', description: 'Vite 驱动的静态站点生成器', package: 'vitepress' },
      { name: 'Astro', description: '岛屿架构的现代框架', package: 'astro' },
      { name: 'SvelteKit', description: 'Svelte 应用框架', package: '@sveltejs/kit' },
      { name: 'SolidStart', description: 'SolidJS 元框架', package: 'solid-start' }
    ]
  }
]);

const activeTab = ref(0);

// 迁移步骤
const migrationSteps = ref([
  {
    title: '安装 Vite',
    description: '在项目中添加 Vite 依赖',
    code: 'npm install vite --save-dev'
  },
  {
    title: '创建配置文件',
    description: '在项目根目录创建 vite.config.js',
    code: `// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})`
  },
  {
    title: '更新脚本命令',
    description: '修改 package.json 中的脚本',
    code: `"scripts": {
  "dev": "vite",       // 启动开发服务器
  "build": "vite build", // 生产环境构建
  "preview": "vite preview" // 预览生产构建
}`
  },
  {
    title: '转换入口文件',
    description: '将 index.html 移到根目录并添加模块入口',
    code: `script type="module" src="/src/main.js"/script`
  },
  {
    title: '处理静态资源',
    description: '更新引用静态资源的路径',
    code: `// 旧方式:
import logo from './assets/logo.png'

// Vite 方式:
import logo from '/src/assets/logo.png'`
  }
]);

</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.vite-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;

  .hero-section {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    background: linear-gradient(135deg, #646cff, #4850d8);
    border-radius: 16px;
    padding: 2.5rem;
    color: white;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

    .hero-content {
      flex: 1;
      min-width: 300px;

      h1 {
        font-size: 2.8rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1.4rem;
        opacity: 0.9;
        margin-bottom: 2rem;
      }

      .hero-stats {
        display: flex;
        gap: 2rem;
        margin-top: 1.5rem;

        .stat {
          .stat-value {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
          }

          .stat-label {
            font-size: 1rem;
            opacity: 0.85;
          }
        }
      }
    }

    .hero-visual {
      flex: 1;
      min-width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .lightning {
        position: relative;
        width: 200px;
        height: 200px;

        .bolt {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 80px;
          background: #ffd700;
          clip-path: polygon(50% 0%, 10% 100%, 50% 70%, 90% 100%);
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: lightning 1.5s infinite;

          &.delay-1 {
            animation-delay: 0.3s;
            width: 30px;
            height: 60px;
            background: #ffea00;
          }

          &.delay-2 {
            animation-delay: 0.6s;
            width: 20px;
            height: 40px;
            background: #fff200;
          }

          @keyframes lightning {
            0% {
              opacity: 0;
            }

            10% {
              opacity: 1;
            }

            20% {
              opacity: 0;
            }

            100% {
              opacity: 0;
            }
          }
        }
      }

      .logo-text {
        margin-top: 1rem;
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: 1px;
        background: linear-gradient(45deg, #ffd700, #ffea00);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .content-container {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #eee;

      .icon {
        font-size: 1.8rem;
      }
    }
  }

  .core-concepts {
    .concept-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .concept-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        text-align: center;
        transition: transform 0.3s ease;
        border-top: 4px solid #646cff;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        h3 {
          margin: 0;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        p {
          color: #7f8c8d;
          margin: 0;
        }
      }
    }
  }

  .implementation {
    .architecture {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      .layer {
        width: 100%;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .layer-title {
          font-weight: 700;
          margin-bottom: 1rem;
          color: #2c3e50;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .layer-items {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 1rem;

          .item {
            background: #f1f3f9;
            padding: 0.8rem 1.2rem;
            border-radius: 8px;
            font-size: 0.95rem;
          }
        }
      }

      .vite-layer {
        background: linear-gradient(135deg, #f1f3ff, #e6e9ff);
        border-left: 4px solid #646cff;
      }

      .esbuild-layer {
        background: linear-gradient(135deg, #e6f7ff, #d1eeff);
        border-left: 4px solid #1e90ff;
      }

      .arrow {
        font-size: 1.5rem;
        margin: 0.5rem 0;
      }
    }

    .code-comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;

      .comparison-item {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        h3 {
          background: #f8f9fa;
          margin: 0;
          padding: 1rem;
          color: #2c3e50;
          font-size: 1.2rem;
        }

        .code-block {
          padding: 1.5rem;
          background: #2d2d2d;
          color: #f8f8f2;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          overflow-x: auto;
        }
      }
    }
  }

  .use-cases {
    .use-case-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .use-case-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        border-top: 4px solid #646cff;

        .case-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        h3 {
          margin: 0;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        p {
          color: #7f8c8d;
          margin-bottom: 1rem;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.5rem;
            color: #4a5568;
          }
        }
      }
    }
  }

  .ecosystem {
    .ecosystem-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;

      button {
        background: #f1f3f9;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
          background: #e6e9ff;
        }

        &.active {
          background: #646cff;
          color: white;
        }
      }
    }

    .ecosystem-content {
      .plugins-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .plugin-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          border-left: 4px solid #646cff;

          .plugin-name {
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          .plugin-desc {
            color: #7f8c8d;
            margin-bottom: 1rem;
            min-height: 50px;
          }

          .plugin-install {
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            background: #f8f9fa;
            padding: 0.5rem;
            border-radius: 6px;
            color: #4a5568;
          }
        }
      }
    }
  }

  .advantages {
    .comparison-table {
      overflow-x: auto;
      margin-bottom: 2rem;

      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        th,
        td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .vite-cell {
          background: #f1f3ff;
          color: #646cff;
          font-weight: 600;
        }
      }
    }

    .benefits {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .benefit-card {
        display: flex;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        align-items: center;

        .benefit-icon {
          font-size: 2rem;
          margin-right: 1rem;
          min-width: 50px;
        }

        .benefit-content {
          h3 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          p {
            color: #7f8c8d;
            margin: 0;
          }
        }
      }
    }
  }

  .migration {
    .migration-steps {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .step {
        display: flex;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .step-number {
          min-width: 60px;
          background: linear-gradient(135deg, #646cff, #4850d8);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .step-content {
          padding: 1.5rem;
          flex: 1;

          h3 {
            margin-top: 0;
            margin-bottom: 0.8rem;
            color: #2c3e50;
          }

          p {
            color: #4a5568;
            margin-bottom: 1rem;
          }

          .step-code {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            overflow-x: auto;
            font-size: 0.9rem;

            pre {
              margin: 0;

              code {
                font-family: 'Fira Code', monospace;
              }
            }
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    padding: 2rem;
    color: #7f8c8d;

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .resources {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.5rem;

      a {
        color: #646cff;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #4850d8;
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .vite-container {
    padding: 10px;

    .hero-section {
      padding: 1.5rem;

      .hero-content {
        h1 {
          font-size: 2rem;
        }

        p {
          font-size: 1.1rem;
        }

        .hero-stats {
          flex-wrap: wrap;
          gap: 1rem;
        }
      }
    }

    .content-container {
      padding: 1.5rem;
    }

    .section .section-title {
      font-size: 1.6rem;
    }
  }
}
</style>
