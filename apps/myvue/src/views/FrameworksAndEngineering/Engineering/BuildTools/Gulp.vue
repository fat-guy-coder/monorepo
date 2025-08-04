<template>
  <div class="gulp-container">
    <!-- 头部区域 -->
    <div class="header-section">
      <div class="logo-container">
        <div class="gulp-logo">
          <svg width="100" height="100" viewBox="0 0 256 256">
            <path fill="#CF4647"
              d="M128 0C57.307 0 0 57.307 0 128s57.307 128 128 128 128-57.307 128-128S198.693 0 128 0z" />
            <path fill="#FFF" d="M197.2 97.2l-70.3 71.4-39.3-39.8-11.7 11.7 51.1 51.8 82-83.2z" />
          </svg>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">Gulp.js 任务自动化基础介绍</h1>
        <p class="subtitle">基于流的自动化构建工具核心机制解析</p>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>Gulp 是什么？</h2>
        </div>

        <div class="intro-content">
          <div class="intro-grid">
            <div class="intro-card">
              <div class="intro-icon">🛠️</div>
              <h3>自动化构建工具</h3>
              <p>简化前端开发工作流程</p>
            </div>

            <div class="intro-card">
              <div class="intro-icon">🌊</div>
              <h3>基于流的处理</h3>
              <p>使用 Node.js 流进行高效操作</p>
            </div>

            <div class="intro-card">
              <div class="intro-icon">📦</div>
              <h3>插件生态系统</h3>
              <p>超过 3500 个官方和社区插件</p>
            </div>

            <div class="intro-card">
              <div class="intro-icon">⚡</div>
              <h3>高性能</h3>
              <p>任务并行处理，减少 I/O 操作</p>
            </div>
          </div>

          <div class="comparison-container">
            <div class="comparison-card">
              <h3>Gulp vs Grunt</h3>
              <ul>
                <li>内存流 vs 临时文件</li>
                <li>代码配置 vs JSON 配置</li>
                <li>并行执行 vs 顺序执行</li>
                <li>更简洁的 API vs 更复杂的配置</li>
              </ul>
            </div>

            <div class="comparison-card">
              <h3>Gulp vs Webpack</h3>
              <ul>
                <li>任务运行器 vs 模块打包器</li>
                <li>流式处理 vs 静态依赖分析</li>
                <li>文件处理 vs 模块管理</li>
                <li>并行任务 vs 单一入口</li>
              </ul>
            </div>
          </div>

          <div class="code-highlight">
            <pre class="code-block">// Gulp 基本使用示例
const { src, dest, series } = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

function scripts() {
  return src('src/js/*.js')
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

exports.build = series(scripts);</pre>
          </div>
        </div>
      </section>

      <!-- 核心概念 -->
      <section class="concepts-section">
        <div class="section-header">
          <div class="icon">🧠</div>
          <h2>核心概念</h2>
        </div>

        <div class="concepts-grid">
          <div class="concept-card">
            <h3>任务 (Tasks)</h3>
            <p>Gulp 的核心构建单元，可以是公共任务或私有任务</p>
            <pre class="code-block">// 公共任务
function clean() {
  return del(['dist']);
}

// 私有任务
function buildAssets() {
  // ...构建逻辑
}

exports.clean = clean;
exports.build = series(clean, buildAssets);</pre>
          </div>

          <div class="concept-card">
            <h3>流 (Streams)</h3>
            <p>基于 Node.js 流的处理方式，减少 I/O 操作</p>
            <div class="stream-flow">
              <div class="flow-step">
                <div>源文件</div>
                <div>→</div>
                <div>gulp.src()</div>
              </div>
              <div class="flow-step">
                <div>插件处理</div>
                <div>→</div>
                <div>.pipe(plugin())</div>
              </div>
              <div class="flow-step">
                <div>输出</div>
                <div>→</div>
                <div>.pipe(gulp.dest())</div>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <h3>Globs</h3>
            <p>文件匹配模式，支持多种通配符语法</p>
            <div class="glob-examples">
              <div class="glob-item">
                <code>src/js/*.js</code>
                <span>匹配 js 目录下所有 JS 文件</span>
              </div>
              <div class="glob-item">
                <code>src/**/*.scss</code>
                <span>递归匹配所有 SCSS 文件</span>
              </div>
              <div class="glob-item">
                <code>!src/vendor</code>
                <span>排除 vendor 目录</span>
              </div>
              <div class="glob-item">
                <code>src/{images,fonts}/*</code>
                <span>匹配多个目录</span>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <h3>异步处理</h3>
            <p>Gulp 4.x 对异步处理的支持</p>
            <div class="async-methods">
              <div class="method">
                <h4>Callback</h4>
                <pre class="code-block">function callbackTask(done) {
  setTimeout(() => {
    done();
  }, 1000);
}</pre>
              </div>
              <div class="method">
                <h4>Promise</h4>
                <pre class="code-block">function promiseTask() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置与使用 -->
      <section class="configuration-section">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>配置与使用</h2>
        </div>

        <div class="config-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>安装</h3>
              <pre class="code-block"># 全局安装 CLI
npm install --global gulp-cli

# 项目本地安装
npm install --save-dev gulp</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>创建 gulpfile.js</h3>
              <pre class="code-block">// gulpfile.js
const { src, dest } = require('gulp');

function copyFiles() {
  return src('src/*.html')
    .pipe(dest('dist'));
}

exports.default = copyFiles;</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>添加插件</h3>
              <pre class="code-block">npm install --save-dev gulp-sass gulp-autoprefixer</pre>
              <pre class="code-block">// 使用插件
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function styles() {
  return src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest('dist/css'));
}

exports.styles = styles;</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>任务组合</h3>
              <pre class="code-block">const { series, parallel } = require('gulp');

function clean() { /* ... */ }
function scripts() { /* ... */ }
function styles() { /* ... */ }
function images() { /* ... */ }

exports.build = series(
  clean,
  parallel(
    scripts,
    styles,
    images
  )
);</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases-section">
        <div class="section-header">
          <div class="icon">💼</div>
          <h2>使用场景</h2>
        </div>

        <div class="use-cases-grid">
          <div class="use-case-card">
            <div class="case-icon">🎨</div>
            <h3>样式处理</h3>
            <ul>
              <li>SASS/LESS 编译</li>
              <li>自动添加浏览器前缀</li>
              <li>CSS 压缩与优化</li>
              <li>生成 Source Maps</li>
            </ul>
          </div>

          <div class="use-case-card">
            <div class="case-icon">📜</div>
            <h3>脚本处理</h3>
            <ul>
              <li>JavaScript 转译 (Babel)</li>
              <li>代码压缩与混淆</li>
              <li>代码检查与格式化</li>
              <li>模块打包与合并</li>
            </ul>
          </div>

          <div class="use-case-card">
            <div class="case-icon">🖼️</div>
            <h3>图像优化</h3>
            <ul>
              <li>图片压缩 (PNG, JPG, SVG)</li>
              <li>生成 WebP 格式</li>
              <li>精灵图生成</li>
              <li>响应式图片处理</li>
            </ul>
          </div>

          <div class="use-case-card">
            <div class="case-icon">📁</div>
            <h3>文件操作</h3>
            <ul>
              <li>文件复制与移动</li>
              <li>模板渲染 (EJS, Pug)</li>
              <li>文件重命名</li>
              <li>目录清理</li>
            </ul>
          </div>

          <div class="use-case-card">
            <div class="case-icon">🔄</div>
            <h3>开发服务器</h3>
            <ul>
              <li>启动本地服务器</li>
              <li>文件更改自动刷新</li>
              <li>API 代理设置</li>
              <li>HTTPS 支持</li>
            </ul>
          </div>

          <div class="use-case-card">
            <div class="case-icon">🚀</div>
            <h3>部署流程</h3>
            <ul>
              <li>自动化构建</li>
              <li>版本控制 (hash)</li>
              <li>FTP/SFTP 部署</li>
              <li>CDN 上传</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 优缺点分析 -->
      <section class="pros-cons-section">
        <div class="section-header">
          <div class="icon">⚖️</div>
          <h2>优缺点分析</h2>
        </div>

        <div class="pros-cons-grid">
          <div class="pros-section">
            <h3 class="section-title">优势</h3>
            <div class="pros-card">
              <div class="pros-icon">✅</div>
              <div class="pros-content">
                <h4>性能优异</h4>
                <p>基于内存流的处理方式，减少磁盘 I/O</p>
              </div>
            </div>

            <div class="pros-card">
              <div class="pros-icon">✅</div>
              <div class="pros-content">
                <h4>简洁易用</h4>
                <p>代码化的配置更直观，API 简单易学</p>
              </div>
            </div>

            <div class="pros-card">
              <div class="pros-icon">✅</div>
              <div class="pros-content">
                <h4>强大的插件系统</h4>
                <p>丰富的插件生态系统覆盖几乎所有需求</p>
              </div>
            </div>

            <div class="pros-card">
              <div class="pros-icon">✅</div>
              <div class="pros-content">
                <h4>灵活的任务控制</h4>
                <p>任务的并行、串行组合，支持条件执行</p>
              </div>
            </div>
          </div>

          <div class="cons-section">
            <h3 class="section-title">不足之处</h3>
            <div class="cons-card">
              <div class="cons-icon">⚠️</div>
              <div class="cons-content">
                <h4>模块化支持有限</h4>
                <p>需要额外的插件支持现代模块系统</p>
              </div>
            </div>

            <div class="cons-card">
              <div class="cons-icon">⚠️</div>
              <div class="cons-content">
                <h4>调试复杂性</h4>
                <p>流处理错误调试有时比较复杂</p>
              </div>
            </div>

            <div class="cons-card">
              <div class="cons-icon">⚠️</div>
              <div class="cons-content">
                <h4>学习曲线</h4>
                <p>需要理解 Node.js 流的概念</p>
              </div>
            </div>

            <div class="cons-card">
              <div class="cons-icon">⚠️</div>
              <div class="cons-content">
                <h4>与现代工具的整合</h4>
                <p>在复杂项目中可能需要与 Webpack 等工具配合</p>
              </div>
            </div>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践建议</h3>
          <div class="practice-grid">
            <div class="practice-card">
              <div class="practice-icon">1</div>
              <p>按功能拆分任务，避免单个巨型任务</p>
            </div>

            <div class="practice-card">
              <div class="practice-icon">2</div>
              <p>使用 gulp-plumber 优雅处理错误</p>
            </div>

            <div class="practice-card">
              <div class="practice-icon">3</div>
              <p>合理使用并行任务提升构建速度</p>
            </div>

            <div class="practice-card">
              <div class="practice-icon">4</div>
              <p>利用 gulp-watch 实现精确文件监视</p>
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
            <div class="plugin-header">
              <h3>gulp-sass</h3>
              <div class="plugin-downloads">1.5M+/周</div>
            </div>
            <p>SASS/SCSS 编译工具</p>
            <pre class="code-block">npm install gulp-sass sass --save-dev</pre>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <h3>gulp-babel</h3>
              <div class="plugin-downloads">850K+/周</div>
            </div>
            <p>JavaScript 转译工具</p>
            <pre class="code-block">npm install gulp-babel @babel/core @babel/preset-env --save-dev</pre>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <h3>gulp-imagemin</h3>
              <div class="plugin-downloads">600K+/周</div>
            </div>
            <p>图片压缩工具</p>
            <pre class="code-block">npm install gulp-imagemin --save-dev</pre>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <h3>gulp-postcss</h3>
              <div class="plugin-downloads">900K+/周</div>
            </div>
            <p>CSS 处理平台</p>
            <pre class="code-block">npm install gulp-postcss autoprefixer cssnano --save-dev</pre>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <h3>gulp-uglify</h3>
              <div class="plugin-downloads">1.2M+/周</div>
            </div>
            <p>JavaScript 压缩工具</p>
            <pre class="code-block">npm install gulp-uglify --save-dev</pre>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <h3>gulp-concat</h3>
              <div class="plugin-downloads">1.8M+/周</div>
            </div>
            <p>文件合并工具</p>
            <pre class="code-block">npm install gulp-concat --save-dev</pre>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Gulp.js 任务自动化基础介绍 | 基于流的构建工具 | © 2023</p>
      <div class="footer-links">
        <a href="https://gulpjs.com" target="_blank">官方文档</a>
        <a href="https://github.com/gulpjs/gulp" target="_blank">GitHub 仓库</a>
        <a href="https://gulpjs.com/docs/en/getting-started/quick-start" target="_blank">快速入门</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 本组件不需要复杂的逻辑，仅用于展示信息
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

@color-primary: #cf4647;
@color-primary-light: #da6465;
@color-primary-dark: #b63a3b;
@color-bg: #f8f9fb;
@color-card: #ffffff;
@color-text: #2d3748;
@color-text-light: #718096;
@color-border: #e2e8f0;

.gulp-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: @color-bg;
  color: @color-text;
  line-height: 1.6;
  padding-bottom: 2rem;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, @color-primary, @color-primary-dark);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .gulp-logo {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 80px;
      height: 80px;
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

.content-wrapper {
  padding: 0 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid @color-border;

  .icon {
    font-size: 1.8rem;
    background: lighten(@color-primary-light, 35%);
    color: @color-primary;
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
    color: darken(@color-text, 10%);
  }
}

.intro-content,
.concepts-grid,
.plugins-grid {
  background: @color-card;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.intro-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  background: lighten(@color-primary-light, 40%);
  border: 1px solid @color-border;

  .intro-icon {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  h3 {
    margin: 0 0 0.6rem;
    color: @color-primary-dark;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: @color-text-light;
  }
}

.comparison-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .comparison-card {
    padding: 1.5rem;
    border-radius: 10px;
    background: @color-card;
    border: 1px solid @color-border;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      color: @color-primary;
      font-size: 1.3rem;
      border-bottom: 1px solid @color-border;
      padding-bottom: 0.5rem;
    }

    ul {
      padding-left: 1.5rem;
      margin: 1rem 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
    }
  }
}

.code-highlight {
  margin-top: 1.5rem;
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  padding: 1.5rem;
  border: 1px solid @color-border;
  border-radius: 10px;
  background: @color-card;

  h3 {
    color: @color-primary;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @color-border;
  }

  p {
    margin: 0.5rem 0 1rem;
  }
}

.stream-flow,
.async-methods {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1.2rem 0;
}

.flow-step,
.method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  background: lighten(@color-primary-light, 42%);
  border-radius: 8px;
  font-size: 0.95rem;
}

.glob-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  .glob-item {
    padding: 0.8rem;
    background: lighten(@color-primary-light, 42%);
    border-radius: 8px;
    font-size: 0.9rem;

    code {
      font-family: @font-code;
      font-weight: 600;
      display: block;
      margin-bottom: 0.3rem;
      color: @color-primary-dark;
    }

    span {
      display: block;
      font-size: 0.85rem;
      color: @color-text-light;
    }
  }
}

.config-steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 1.5rem;
}

.step {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  .step-number {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    background: @color-primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
    margin-top: 0.3rem;
  }

  .step-content {
    flex: 1;

    h3 {
      margin-top: 0;
      color: @color-primary;
    }
  }
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.use-case-card {
  padding: 1.5rem;
  border: 1px solid @color-border;
  border-radius: 10px;
  background: @color-card;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

  .case-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 1rem;
    color: @color-primary-dark;
  }

  ul {
    padding-left: 1.2rem;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }
  }
}

.pros-cons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.pros-section,
.cons-section {
  padding: 1.5rem;
  border-radius: 12px;

  .section-title {
    color: @color-primary;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @color-border;
  }
}

.pros-section {
  background: lighten(#48bb78, 45%);
  border: 1px solid lighten(#48bb78, 30%);
}

.cons-section {
  background: lighten(#f56565, 40%);
  border: 1px solid lighten(#f56565, 30%);
}

.pros-card,
.cons-card {
  display: flex;
  gap: 1rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid @color-border;

  &:last-child {
    border-bottom: none;
  }

  .pros-icon,
  .cons-icon {
    font-size: 1.5rem;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pros-content,
  .cons-content {
    flex: 1;

    h4 {
      margin: 0 0 0.5rem;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
    }
  }
}

.best-practices {
  margin-top: 2.5rem;

  h3 {
    color: @color-primary;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @color-border;
  }
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.practice-card {
  display: flex;
  gap: 1rem;
  padding: 1.2rem;
  background: @color-card;
  border-radius: 10px;
  border: 1px solid @color-border;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  .practice-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    background: @color-primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
  }
}

.plugins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.plugin-card {
  padding: 1.5rem;
  border: 1px solid @color-border;
  border-radius: 10px;
  background: @color-card;

  .plugin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      color: @color-primary-dark;
    }

    .plugin-downloads {
      font-size: 0.85rem;
      background: lighten(@color-primary-light, 40%);
      color: @color-primary-dark;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
    }
  }

  p {
    margin: 0 0 1rem;
    font-size: 0.95rem;
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 2rem 1rem;
  color: @color-text-light;
  font-size: 0.95rem;
  margin-top: 4rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: @color-primary;
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
  background-color: darken(@color-bg, 5%);
  color: @color-text;
  border-radius: 8px;
  padding: 1rem;
  font-family: @font-code;
  font-size: 0.92rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  margin: 0.8rem 0;
  border: 1px solid @color-border;
}

@media (max-width: 768px) {
  .header-section {
    padding: 2rem 1rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .content-wrapper {
    padding: 0 1rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }

  .step {
    flex-direction: column;
    gap: 1rem;

    .step-number {
      margin: 0;
    }
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
  }

  .gulp-logo {
    width: 80px;
    height: 80px;

    svg {
      width: 60px;
      height: 60px;
    }
  }

  .section-header {
    .icon {
      width: 40px;
      height: 40px;
      font-size: 1.4rem;
    }
  }

  .pros-cons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
