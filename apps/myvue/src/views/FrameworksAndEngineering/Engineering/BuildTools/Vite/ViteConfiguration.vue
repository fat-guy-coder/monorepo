<template>
  <div class="vite-config-container">
    <!-- 顶部标题区 -->
    <div class="header-banner">
      <div class="logo-icon">⚡</div>
      <div class="header-content">
        <h1 class="main-title">Vite 配置指南</h1>
        <p class="subtitle">下一代前端开发与构建工具</p>
        <div class="features">
          <span>极速服务启动</span>
          <span>热更新超快</span>
          <span>开箱即用</span>
          <span>高度可扩展</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 核心价值 -->
      <section class="core-value-section">
        <div class="section-header">
          <div class="icon">💡</div>
          <h2>为什么选择 Vite？</h2>
        </div>

        <div class="value-grid">
          <div class="value-card">
            <div class="value-icon">🚀</div>
            <h3>闪电般快速</h3>
            <p>本地服务器启动时间不超过300ms</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🔄</div>
            <h3>即时HMR</h3>
            <p>模块热替换快到几乎无感</p>
          </div>
          <div class="value-card">
            <div class="value-icon">📦</div>
            <h3>开箱即用</h3>
            <p>支持 TS/JSX/CSS 等无需配置</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🧩</div>
            <h3>插件生态</h3>
            <p>Rollup 插件兼容 + Vite 专属插件</p>
          </div>
        </div>
      </section>

      <!-- 核心配置项 -->
      <section class="config-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>核心配置项基础介绍</h2>
          <div class="section-subtitle">在 vite.config.js/ts 文件中配置</div>
        </div>

        <div class="config-tabs">
          <div class="tabs-header">
            <div v-for="(category, index) in configCategories" :key="index"
              :class="['tab', { active: activeCategory === index }]" @click="activeCategory = index">
              {{ category.name }}
            </div>
          </div>

          <div class="tab-content">
            <!-- 基础配置 -->
            <div v-if="activeCategory === 0" class="config-table">
              <div class="table-header">
                <div>配置项</div>
                <div>类型</div>
                <div>默认值</div>
                <div>描述</div>
              </div>

              <div class="table-row" v-for="(item, index) in baseConfig" :key="index">
                <div class="config-name"><code>{{ item.name }}</code></div>
                <div>{{ item.type }}</div>
                <div><code>{{ item.default }}</code></div>
                <div>{{ item.description }}</div>
              </div>
            </div>

            <!-- 服务端配置 -->
            <div v-if="activeCategory === 1" class="config-table">
              <div class="table-header">
                <div>配置项</div>
                <div>类型</div>
                <div>默认值</div>
                <div>描述</div>
              </div>

              <div class="table-row" v-for="(item, index) in serverConfig" :key="index">
                <div class="config-name"><code>{{ item.name }}</code></div>
                <div>{{ item.type }}</div>
                <div><code>{{ item.default }}</code></div>
                <div>{{ item.description }}</div>
              </div>
            </div>

            <!-- 构建配置 -->
            <div v-if="activeCategory === 2" class="config-table">
              <div class="table-header">
                <div>配置项</div>
                <div>类型</div>
                <div>默认值</div>
                <div>描述</div>
              </div>

              <div class="table-row" v-for="(item, index) in buildConfig" :key="index">
                <div class="config-name"><code>{{ item.name }}</code></div>
                <div>{{ item.type }}</div>
                <div><code>{{ item.default }}</code></div>
                <div>{{ item.description }}</div>
              </div>
            </div>

            <!-- 高级配置 -->
            <div v-if="activeCategory === 3" class="config-table">
              <div class="table-header">
                <div>配置项</div>
                <div>类型</div>
                <div>默认值</div>
                <div>描述</div>
              </div>

              <div class="table-row" v-for="(item, index) in advancedConfig" :key="index">
                <div class="config-name"><code>{{ item.name }}</code></div>
                <div>{{ item.type }}</div>
                <div><code>{{ item.default }}</code></div>
                <div>{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置文件示例 -->
      <section class="examples-section">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>配置文件示例</h2>
        </div>

        <div class="examples-grid">
          <div class="example-card">
            <h3 class="example-title">基础配置</h3>
            <pre class="code-block">import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/my-project/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://backend-server',
        changeOrigin: true
      }
    }
  }
})</pre>
          </div>

          <div class="example-card">
            <h3 class="example-title">多环境配置</h3>
            <pre class="code-block">import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    build: {
      outDir: 'dist/' + mode,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia']
          }
        }
      }
    }
  }
})</pre>
          </div>

          <div class="example-card">
            <h3 class="example-title">高级配置</h3>
            <pre class="code-block">import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      mozjpeg: { quality: 75, progressive: true },
      optipng: { optimizationLevel: 5 }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})</pre>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases">
        <div class="section-header">
          <div class="icon">🎯</div>
          <h2>配置使用场景</h2>
        </div>

        <div class="case-grid">
          <div class="case-card">
            <div class="case-icon">🌐</div>
            <div class="case-content">
              <h3>开发环境代理</h3>
              <p>配置代理解决跨域问题：</p>
              <pre class="code-block">server: {
  proxy: {
    '/api': {
      target: 'https://api.example.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}</pre>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">📱</div>
            <div class="case-content">
              <h3>移动端适配</h3>
              <p>配置viewport适配方案：</p>
              <pre class="code-block">import postcssPxToViewport from 'postcss-px-to-viewport'

css: {
  postcss: {
    plugins: [
      postcssPxToViewport({
        viewportWidth: 375,
        unitPrecision: 5,
        propList: ['*']
      })
    ]
  }
}</pre>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">🔒</div>
            <div class="case-content">
              <h3>安全配置</h3>
              <p>防止源码泄露：</p>
              <pre class="code-block">build: {
  sourcemap: false,
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true
    }
  }
}</pre>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">🚀</div>
            <div class="case-content">
              <h3>性能优化</h3>
              <p>代码分割与预加载：</p>
              <pre class="code-block">build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['vue', 'vue-router'],
        charts: ['echarts', 'd3'],
        utils: ['lodash', 'dayjs']
      }
    }
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>Vite 配置最佳实践</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-number">1</div>
            <div class="practice-content">
              <h3>使用环境变量</h3>
              <p>创建 <code>.env</code>、<code>.env.development</code> 和 <code>.env.production</code> 文件管理环境变量</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">2</div>
            <div class="practice-content">
              <h3>配置路径别名</h3>
              <p>使用别名简化导入路径：</p>
              <pre class="code-block">resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    'components': path.resolve(__dirname, 'src/components')
  }
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">3</div>
            <div class="practice-content">
              <h3>利用CSS预处理器</h3>
              <p>全局注入SCSS变量：</p>
              <pre class="code-block">css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/styles/variables.scss";`
    }
  }
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">4</div>
            <div class="practice-content">
              <h3>优化生产构建</h3>
              <p>配置代码分割和压缩：</p>
              <pre class="code-block">build: {
  chunkSizeWarningLimit: 1000,
  minify: 'terser',
  terserOptions: {
    compress: { drop_console: true }
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 插件推荐 -->
      <section class="plugins-section">
        <div class="section-header">
          <div class="icon">🧩</div>
          <h2>常用插件推荐</h2>
        </div>

        <div class="plugins-grid">
          <div class="plugin-card">
            <div class="plugin-icon">🔄</div>
            <h3>@vitejs/plugin-vue</h3>
            <p>Vue单文件组件支持</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-icon">🔄</div>
            <h3>@vitejs/plugin-vue-jsx</h3>
            <p>Vue JSX支持</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-icon">⏱️</div>
            <h3>vite-plugin-inspect</h3>
            <p>调试Vite插件中间状态</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-icon">📦</div>
            <h3>vite-plugin-compression</h3>
            <p>Gzip/Brotli压缩静态资源</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-icon">🖼️</div>
            <h3>vite-plugin-imagemin</h3>
            <p>图片压缩优化</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-icon">📱</div>
            <h3>vite-plugin-pwa</h3>
            <p>PWA支持</p>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Vite官方文档：<a href="https://vitejs.dev/" target="_blank">vitejs.dev</a> | 最新版本：v4.x | </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const configCategories = [
  { name: '基础配置', index: 0 },
  { name: '服务器配置', index: 1 },
  { name: '构建配置', index: 2 },
  { name: '高级配置', index: 3 },
];

const activeCategory = ref(0);

// 基础配置数据
const baseConfig = [
  {
    name: 'root',
    type: 'string',
    default: 'process.cwd()',
    description: '项目根目录（index.html所在位置）'
  },
  {
    name: 'base',
    type: 'string',
    default: '/',
    description: '公共基础路径（部署在子路径时使用）'
  },
  {
    name: 'mode',
    type: 'string',
    default: "'development' | 'production'",
    description: '指定环境模式，影响环境变量加载'
  },
  {
    name: 'plugins',
    type: 'array',
    default: '[]',
    description: '需要使用的Vite插件数组'
  },
  {
    name: 'publicDir',
    type: 'string',
    default: "'public'",
    description: '静态资源目录，名称不以public开头'
  },
  {
    name: 'resolve.alias',
    type: 'object',
    default: '{}',
    description: '设置导入路径别名'
  },
  {
    name: 'resolve.extensions',
    type: 'string[]',
    default: "['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']",
    description: '导入时省略的扩展名列表'
  },
  {
    name: 'envDir',
    type: 'string',
    default: 'root',
    description: '加载.env文件的目录'
  }
];

// 服务器配置数据
const serverConfig = [
  {
    name: 'server.host',
    type: 'string | boolean',
    default: "'localhost'",
    description: '指定服务器主机名'
  },
  {
    name: 'server.port',
    type: 'number',
    default: '5173',
    description: '指定服务器端口'
  },
  {
    name: 'server.strictPort',
    type: 'boolean',
    default: 'false',
    description: '端口占用时是否退出'
  },
  {
    name: 'server.open',
    type: 'boolean | string',
    default: 'false',
    description: '启动时是否自动打开浏览器'
  },
  {
    name: 'server.proxy',
    type: 'object',
    default: '{}',
    description: '配置后端API代理'
  },
  {
    name: 'server.https',
    type: 'boolean | object',
    default: 'false',
    description: '启用TLS + HTTP/2，需要证书'
  },
  {
    name: 'server.cors',
    type: 'boolean | object',
    default: 'true',
    description: '配置CORS响应头'
  }
];

// 构建配置数据
const buildConfig = [
  {
    name: 'build.outDir',
    type: 'string',
    default: "'dist'",
    description: '输出目录'
  },
  {
    name: 'build.assetsDir',
    type: 'string',
    default: "'assets'",
    description: '静态资源存放目录'
  },
  {
    name: 'build.assetsInlineLimit',
    type: 'number',
    default: '4096',
    description: '小于此值的资源内联为base64'
  },
  {
    name: 'build.sourcemap',
    type: 'boolean | "inline" | "hidden"',
    default: 'false',
    description: '是否生成sourcemap'
  },
  {
    name: 'build.minify',
    type: 'boolean | "terser" | "esbuild"',
    default: "'esbuild'",
    description: '代码压缩器'
  },
  {
    name: 'build.chunkSizeWarningLimit',
    type: 'number',
    default: '500',
    description: '块大小警告阈值(kb)'
  },
  {
    name: 'build.rollupOptions',
    type: 'object',
    default: '{}',
    description: '直接自定义Rollup打包配置'
  }
];

// 高级配置数据
const advancedConfig = [
  {
    name: 'css.modules',
    type: 'object',
    default: '{}',
    description: '配置CSS模块行为'
  },
  {
    name: 'css.preprocessorOptions',
    type: 'object',
    default: '{}',
    description: 'CSS预处理器全局配置'
  },
  {
    name: 'css.devSourcemap',
    type: 'boolean',
    default: 'false',
    description: '开发时是否生成CSS sourcemap'
  },
  {
    name: 'json.namedExports',
    type: 'boolean',
    default: 'true',
    description: '是否支持从JSON导入具名导出'
  },
  {
    name: 'define',
    type: 'object',
    default: '{}',
    description: '定义全局常量替换方式'
  },
  {
    name: 'logLevel',
    type: 'string',
    default: "'info'",
    description: '控制台输出日志级别'
  },
  {
    name: 'clearScreen',
    type: 'boolean',
    default: 'true',
    description: '启动时是否清屏'
  },
  {
    name: 'envPrefix',
    type: 'string | string[]',
    default: "'VITE_'",
    description: '客户端环境变量前缀'
  }
];
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.vite-config-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header-banner {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, #41d1a1, #36b2d0);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-icon {
    font-size: 4rem;
    flex-shrink: 0;
  }

  .header-content {
    flex: 1;
  }
}

.main-title {
  font-size: 2.8rem;
  margin: 0 0 0.8rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin: 0 0 1rem;
  font-weight: 400;
}

.features {
  display: flex;
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
    background: #ddf7ed;
    color: #41d1a1;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
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

.core-value-section {
  margin-bottom: 3rem;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.5rem;
}

.value-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-top: 4px solid #41d1a1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .value-icon {
    font-size: 2.8rem;
    margin-bottom: 1.2rem;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #1e293b;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

.config-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.config-tabs {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background: #ddf7ed;
  border-bottom: 1px solid #e2e8f0;

  .tab {
    padding: 1rem 1.8rem;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;

    &:hover {
      color: #109b72;
      background: #c7f0e0;
    }

    &.active {
      color: #109b72;
      border-bottom: 3px solid #109b72;
      background: #c7f0e0;
    }
  }
}

.tab-content {
  padding: 1.5rem;
  background: white;
}

.config-table {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(100px, 0.8fr) minmax(100px, 0.8fr) minmax(200px, 2fr);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: contents;

  >div {
    padding: 1rem;
    background: #ddf7ed;
    font-weight: 600;
    color: #109b72;
    text-align: left;
  }
}

.table-row {
  display: contents;

  >div {
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
  }

  &:last-child>div {
    border-bottom: none;
  }
}

.config-name {
  font-family: @font-code;
  font-weight: 600;
  color: #109b72;
}

.examples-section {
  margin-bottom: 3rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.8rem;
}

.example-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .example-title {
    margin-top: 0;
    color: #109b72;
    font-size: 1.2rem;
    border-left: 4px solid #41d1a1;
    padding-left: 0.8rem;
  }
}

.use-cases {
  margin-bottom: 3rem;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.8rem;
}

.case-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 1.2rem;

  .case-icon {
    font-size: 2.5rem;
    color: #41d1a1;
    flex-shrink: 0;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #1e293b;
    font-size: 1.25rem;
  }

  p {
    margin: 0.5rem 0 0.8rem;
    color: #64748b;
    line-height: 1.7;
  }
}

.best-practices {
  margin-bottom: 3rem;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;

  .practice-number {
    background: #41d1a1;
    color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
    margin-top: 0.3rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #1e293b;
    font-size: 1.25rem;
  }

  p {
    margin: 0.5rem 0 1rem;
    color: #64748b;
    line-height: 1.7;

    code {
      font-family: @font-code;
      background: #ddf7ed;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      color: #109b72;
    }
  }
}

.plugins-section {
  margin-bottom: 3rem;
}

.plugins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.plugin-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .plugin-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #41d1a1;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    color: #1e293b;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.92rem;
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
  margin: 1rem 0;
}

.footer {
  text-align: center;
  padding: 2.5rem;
  color: #94a3b8;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 1rem;

  a {
    color: #109b72;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .header-banner {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .main-title {
    font-size: 2.2rem;
  }

  .features {
    justify-content: center;
  }

  .tabs-header {
    flex-direction: column;

    .tab {
      text-align: center;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  .config-table {
    grid-template-columns: 1fr;
    overflow-x: auto;

    .table-header>div,
    .table-row>div {
      min-width: 150px;
    }
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0 1rem 2rem;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }

  .examples-grid,
  .case-grid,
  .practices-grid {
    grid-template-columns: 1fr;
  }
}
</style>
