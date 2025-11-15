<template>
  <div class="rollup-container">
    <!-- 顶部标题区 -->
    <div class="header-banner">
      <div class="logo-container">
        <div class="rollup-logo">
          <span>R</span><span>O</span><span>L</span><span>L</span><span>U</span><span>P</span>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">Rollup - 下一代 JavaScript 模块打包器</h1>
        <p class="subtitle">专注于 ES 模块的高效打包解决方案</p>
        <div class="features">
          <span>Tree-shaking 优化</span>
          <span>ES 模块原生支持</span>
          <span>小巧高效</span>
          <span>插件生态系统</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>什么是 Rollup？</h2>
        </div>

        <div class="spec-grid">
          <div class="spec-card">
            <div class="spec-icon">💡</div>
            <h3>核心理念</h3>
            <ul>
              <li>为 JavaScript 库和框架设计的打包工具</li>
              <li>专注于 ES 模块标准</li>
              <li>优化 Tree-shaking 去除无用代码</li>
              <li>生成更小、更高效的代码包</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">🎯</div>
            <h3>设计目标</h3>
            <ul>
              <li>输出更小体积的代码包</li>
              <li>原生支持 ES 模块</li>
              <li>优化 Tree-shaking 能力</li>
              <li>简化库开发流程</li>
              <li>提供灵活的插件系统</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">⚡</div>
            <h3>性能优势</h3>
            <ul>
              <li>比 Webpack 更小的输出体积</li>
              <li>比 TypeScript 编译器更快的打包速度</li>
              <li>比 Parcel 更精细的代码优化</li>
              <li>比 Browserify 更现代的模块支持</li>
              <li>比 ESbuild 更成熟的插件生态</li>
            </ul>
          </div>
        </div>

        <div class="usage-stats">
          <div class="stat-grid">
            <div class="stat-card">
              <div class="stat-value">80%+</div>
              <div class="stat-label">流行库使用 Rollup</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">100+</div>
              <div class="stat-label">官方插件</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">1M+</div>
              <div class="stat-label">每周下载量</div>
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
            <div class="feature-icon">🌳</div>
            <h3>Tree-shaking</h3>
            <p>静态分析去除未使用代码</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📦</div>
            <h3>多种输出格式</h3>
            <p>ESM、CJS、UMD、IIFE 等格式支持</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🧩</div>
            <h3>插件系统</h3>
            <p>丰富的插件生态系统</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">⚙️</div>
            <h3>代码分割</h3>
            <p>动态导入自动代码分割</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>源码映射</h3>
            <p>完整 Source Map 支持</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>热更新</h3>
            <p>开发服务器支持热模块替换</p>
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
          <!-- 输入配置 -->
          <div v-show="activeTab === 0" class="config-group">
            <h3 class="group-title">输入配置</h3>

            <div class="config-card">
              <h4 class="config-name">input</h4>
              <div class="config-desc">
                <p>指定入口文件路径（字符串或对象）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">input: 'src/index.js'
// 多入口
input: {
  main: 'src/index.js',
  utils: 'src/utils.js'
}</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">external</h4>
              <div class="config-desc">
                <p>排除外部依赖（不打包入库）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">external: ['react', 'lodash']
// 函数形式
external: id => id.includes('node_modules')</pre>
              </div>
            </div>
          </div>

          <!-- 输出配置 -->
          <div v-show="activeTab === 1" class="config-group">
            <h3 class="group-title">输出配置</h3>

            <div class="config-card">
              <h4 class="config-name">output.dir</h4>
              <div class="config-desc">
                <p>输出目录（多入口时使用）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">output: {
  dir: 'dist'
}</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">output.file</h4>
              <div class="config-desc">
                <p>输出文件（单入口时使用）</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">output: {
  file: 'dist/bundle.js'
}</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">output.format</h4>
              <div class="config-desc">
                <p>输出模块格式</p>
                <p class="example-title">选项：</p>
                <ul>
                  <li><code>'es'</code>: ES 模块（默认）</li>
                  <li><code>'cjs'</code>: CommonJS</li>
                  <li><code>'umd'</code>: UMD（浏览器环境）</li>
                  <li><code>'iife'</code>: 自执行函数</li>
                  <li><code>'amd'</code>: AMD</li>
                  <li><code>'system'</code>: SystemJS</li>
                </ul>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">output.name</h4>
              <div class="config-desc">
                <p>UMD/IIFE 格式的全局变量名</p>
                <p class="example-title">示例：</p>
                <pre class="code-block">output: {
  name: 'MyLibrary'
}</pre>
              </div>
            </div>
          </div>

          <!-- 优化配置 -->
          <div v-show="activeTab === 2" class="config-group">
            <h3 class="group-title">优化配置</h3>

            <div class="config-card">
              <h4 class="config-name">treeshake</h4>
              <div class="config-desc">
                <p>启用 Tree-shaking 优化</p>
                <p class="example-title">选项：</p>
                <ul>
                  <li><code>true</code>：启用（默认）</li>
                  <li><code>false</code>：禁用</li>
                  <li><code>'smallest'</code>：最激进的优化</li>
                  <li><code>'recommended'</code>：推荐配置</li>
                  <li><code>Object</code>：自定义配置</li>
                </ul>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">plugins</h4>
              <div class="config-desc">
                <p>插件数组，扩展 Rollup 功能</p>
                <p class="example-title">常用插件：</p>
                <ul>
                  <li><code>@rollup/plugin-node-resolve</code>：解析 node_modules</li>
                  <li><code>@rollup/plugin-commonjs</code>：转换 CJS 模块</li>
                  <li><code>@rollup/plugin-babel</code>：Babel 支持</li>
                  <li><code>@rollup/plugin-typescript</code>：TypeScript 支持</li>
                  <li><code>rollup-plugin-terser</code>：代码压缩</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 高级配置 -->
          <div v-show="activeTab === 3" class="config-group">
            <h3 class="group-title">高级配置</h3>

            <div class="config-card">
              <h4 class="config-name">watch</h4>
              <div class="config-desc">
                <p>监听文件变化并重新打包</p>
                <p class="example-title">配置选项：</p>
                <ul>
                  <li><code>include</code>：监听的文件路径</li>
                  <li><code>exclude</code>：排除的文件</li>
                  <li><code>clearScreen</code>：是否清屏</li>
                </ul>
                <pre class="code-block">watch: {
  include: 'src/**',
  exclude: 'node_modules/**'
}</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">output.sourcemap</h4>
              <div class="config-desc">
                <p>生成 Source Map</p>
                <p class="example-title">选项：</p>
                <ul>
                  <li><code>true</code>：内联 Source Map</li>
                  <li><code>'inline'</code>：内联在文件中</li>
                  <li><code>'hidden'</code>：生成但不关联</li>
                  <li><code>false</code>：禁用（默认）</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 插件配置 -->
          <div v-show="activeTab === 4" class="config-group">
            <h3 class="group-title">插件配置示例</h3>

            <div class="config-card">
              <h4 class="config-name">TypeScript 支持</h4>
              <div class="config-desc">
                <pre class="code-block">import typescript from '@rollup/plugin-typescript';

plugins: [
  typescript({
    tsconfig: './tsconfig.json',
    exclude: ['**/*.test.ts']
  })
]</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">Babel 支持</h4>
              <div class="config-desc">
                <pre class="code-block">import { babel } from '@rollup/plugin-babel';

plugins: [
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  })
]</pre>
              </div>
            </div>

            <div class="config-card">
              <h4 class="config-name">代码压缩</h4>
              <div class="config-desc">
                <pre class="code-block">import { terser } from 'rollup-plugin-terser';

plugins: [
  terser({
    format: {
      comments: false
    },
    compress: {
      drop_console: true
    }
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
            <div class="scenario-icon">📚</div>
            <h3>JavaScript 库开发</h3>
            <p>生成体积小、效率高的库代码</p>
            <div class="tech-used">
              <span>React</span>
              <span>Vue</span>
              <span>D3</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🌐</div>
            <h3>框架核心打包</h3>
            <p>打包现代框架的核心代码</p>
            <div class="tech-used">
              <span>Svelte</span>
              <span>SolidJS</span>
              <span>Preact</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🧩</div>
            <h3>NPM 包发布</h3>
            <p>支持多格式输出发布到 NPM</p>
            <div class="tech-used">
              <span>ESM</span>
              <span>CJS</span>
              <span>UMD</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔗</div>
            <h3>浏览器扩展开发</h3>
            <p>打包浏览器扩展的脚本</p>
            <div class="tech-used">
              <span>Chrome Ext</span>
              <span>Firefox Addon</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <h3>Web Components</h3>
            <p>构建独立的 Web Components</p>
            <div class="tech-used">
              <span>Lit</span>
              <span>Stencil</span>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🛠️</div>
            <h3>命令行工具</h3>
            <p>打包命令行工具和脚本</p>
            <div class="tech-used">
              <span>Node CLI</span>
              <span>工具库</span>
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
          <!-- 基本配置 -->
          <div v-show="activeExample === 0" class="example-group">
            <h3 class="group-title">基础 Rollup 配置</h3>
            <pre class="code-block">// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.min.js',
    format: 'umd',
    name: 'MyLibrary',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    terser()
  ],
  external: ['lodash']
};</pre>
          </div>

          <!-- TypeScript 配置 -->
          <div v-show="activeExample === 1" class="example-group">
            <h3 class="group-title">TypeScript 项目配置</h3>
            <pre class="code-block">// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    peerDepsExternal(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types'
    })
  ]
};</pre>
          </div>

          <!-- React 组件库配置 -->
          <div v-show="activeExample === 2" class="example-group">
            <h3 class="group-title">React 组件库打包</h3>
            <pre class="code-block">// rollup.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.stories.tsx', '**/*.test.tsx']
    }),
    postcss({
      modules: true,
      extract: true,
      minimize: true
    }),
    image()
  ]
};</pre>
          </div>

          <!-- 多页面应用 -->
          <div v-show="activeExample === 3" class="example-group">
            <h3 class="group-title">多页面应用打包</h3>
            <pre class="code-block">// rollup.config.js
import multiInput from 'rollup-plugin-multi-input';
import html from '@rollup/plugin-html';

export default {
  input: ['src/home/index.js', 'src/about/index.js', 'src/contact/index.js'],
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    multiInput(),
    html({
      fileName: '[name].html',
      template: ({ attributes, bundle, files }) => {
        return `&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset="utf-8"&gt;
  &lt;title&gt;${attributes.html.title}&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id="app"&gt;&lt;/div&gt;
  &lt;script src="${files.js[0].fileName}"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;`;
      }
    })
  ]
};</pre>
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
              <h3>Vite 底层打包</h3>
              <p>Vite 在生产构建中使用 Rollup</p>
            </div>
          </div>

          <div class="integration-card webpack">
            <div class="integration-logo">Webpack</div>
            <div class="integration-desc">
              <h3>替代 Webpack</h3>
              <p>在库开发中替代 Webpack</p>
            </div>
          </div>

          <div class="integration-card esbuild">
            <div class="integration-logo">ESbuild</div>
            <div class="integration-desc">
              <h3>结合 ESbuild</h3>
              <p>使用 rollup-plugin-esbuild 提升性能</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 知名用户 -->
      <section class="users-section">
        <div class="section-header">
          <div class="icon">🏆</div>
          <h2>知名项目用户</h2>
        </div>

        <div class="users-grid">
          <div class="user-card">
            <div class="user-logo">React</div>
            <div class="user-desc">Facebook 的 UI 库</div>
          </div>
          <div class="user-card">
            <div class="user-logo">Vue</div>
            <div class="user-desc">渐进式 JavaScript 框架</div>
          </div>
          <div class="user-card">
            <div class="user-logo">Svelte</div>
            <div class="user-desc">编译型前端框架</div>
          </div>
          <div class="user-card">
            <div class="user-logo">D3</div>
            <div class="user-desc">数据可视化库</div>
          </div>
          <div class="user-card">
            <div class="user-logo">Preact</div>
            <div class="user-desc">轻量级 React 替代</div>
          </div>
          <div class="user-card">
            <div class="user-logo">Three.js</div>
            <div class="user-desc">3D 库</div>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Rollup - JavaScript 模块打包器 | 库开发首选 | </p>
      <div class="footer-links">
        <a href="https://rollupjs.org/" target="_blank">官方文档</a>
        <a href="https://github.com/rollup/rollup" target="_blank">GitHub</a>
        <a href="https://github.com/rollup/awesome" target="_blank">插件列表</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tabs = ref([
  '输入配置',
  '输出配置',
  '优化配置',
  '高级配置',
  '插件示例'
]);

const examples = ref([
  { title: '基础配置' },
  { title: 'TypeScript' },
  { title: 'React 库' },
  { title: '多页面' }
]);

const activeTab = ref(0);
const activeExample = ref(0);
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.rollup-container {
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
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .rollup-logo {
    font-size: 3rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 4px;
    letter-spacing: -1px;

    span {
      transition: all 0.25s ease;

      &:hover {
        transform: translateY(-5px);
      }

      &:nth-child(1) {
        color: #bfdbfe;
      }

      &:nth-child(2) {
        color: #93c5fd;
      }

      &:nth-child(3) {
        color: #60a5fa;
      }

      &:nth-child(4) {
        color: #3b82f6;
      }

      &:nth-child(5) {
        color: #2563eb;
      }

      &:nth-child(6) {
        color: #1d4ed8;
      }
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
    background: #dbeafe;
    color: #2563eb;
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
    color: #3b82f6;
  }

  h3 {
    margin-top: 0;
    color: #1e293b;
    font-size: 1.3rem;
    border-left: 4px solid #60a5fa;
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

.usage-stats {
  margin-top: 2rem;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: #2563eb;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #64748b;
    font-size: 1.05rem;
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
    color: #3b82f6;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #2563eb;
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
    background: #dbeafe;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #bfdbfe;
    }

    &.active {
      background: #3b82f6;
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
  color: #2563eb;
  margin-top: 0;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #dbeafe;
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
        color: #2563eb;
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
    color: #3b82f6;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #2563eb;
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
      background: #dbeafe;
      color: #2563eb;
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
    background: #dbeafe;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #bfdbfe;
    }

    &.active {
      background: #3b82f6;
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
      color: #2563eb;
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

  &.esbuild .integration-logo {
    background: linear-gradient(135deg, #fde68a, #fbbf24);
  }
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.2rem;
}

.user-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .user-logo {
    font-weight: 700;
    font-size: 1.4rem;
    color: #2563eb;
    margin-bottom: 0.5rem;
  }

  .user-desc {
    color: #64748b;
    font-size: 0.9rem;
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
      color: #2563eb;
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

    .rollup-logo {
      font-size: 2.4rem;
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
