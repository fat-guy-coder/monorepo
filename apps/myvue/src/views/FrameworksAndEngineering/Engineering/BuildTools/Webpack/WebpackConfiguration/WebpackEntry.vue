<template>
  <div class="webpack-entry-container">
    <!-- 顶部标题区 -->
    <div class="header-section">
      <div class="logo-container">
        <div class="webpack-logo">
          <span>W</span><span>e</span><span>b</span><span>p</span><span>a</span><span>c</span><span>k</span>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">Webpack Entry 配置基础介绍</h1>
        <p class="subtitle">应用程序的入口起点，构建依赖图的起点</p>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🚪</div>
          <h2>什么是 Entry?</h2>
        </div>

        <div class="intro-content">
          <p>Entry 是 Webpack 构建的<strong>起点</strong>，指示 Webpack 从哪个模块开始构建其内部依赖图。Webpack 会找出入口起点直接或间接依赖的所有模块和库。</p>

          <div class="entry-process">
            <div class="process-card">
              <div class="process-icon">1</div>
              <div class="process-desc">Webpack 从 entry 指定的入口文件开始</div>
            </div>
            <div class="process-arrow">→</div>
            <div class="process-card">
              <div class="process-icon">2</div>
              <div class="process-desc">分析入口文件的依赖关系</div>
            </div>
            <div class="process-arrow">→</div>
            <div class="process-card">
              <div class="process-icon">3</div>
              <div class="process-desc">递归构建依赖图</div>
            </div>
            <div class="process-arrow">→</div>
            <div class="process-card">
              <div class="process-icon">4</div>
              <div class="process-desc">输出打包后的 bundle</div>
            </div>
          </div>

          <div class="entry-importance">
            <h3 class="importance-title">Entry 的重要性</h3>
            <ul>
              <li><strong>起点</strong>：整个构建过程的起始点</li>
              <li><strong>依赖图基础</strong>：决定依赖关系的起点</li>
              <li><strong>输出基础</strong>：影响输出文件的名称和数量</li>
              <li><strong>优化基础</strong>：影响代码分割和懒加载策略</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 配置类型 -->
      <section class="types-section">
        <div class="section-header">
          <div class="icon">📝</div>
          <h2>Entry 配置类型</h2>
        </div>

        <div class="config-tabs">
          <div v-for="(type, index) in entryTypes" :key="index" @click="activeType = index"
            :class="['type-tab', { active: activeType === index }]">
            {{ type.title }}
          </div>
        </div>

        <div class="type-content">
          <!-- 单入口字符串 -->
          <div v-show="activeType === 0" class="type-detail">
            <h3 class="type-title">单入口（字符串）</h3>
            <p class="type-desc">最简单的入口配置形式，适合单页面应用（SPA）</p>

            <div class="config-card">
              <h4 class="config-name">配置示例</h4>
              <pre class="code-block">module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};</pre>
            </div>

            <div class="type-details">
              <div class="detail-card">
                <div class="detail-icon">📦</div>
                <h4>输出文件</h4>
                <p>生成单个 bundle 文件（默认名称为 main.js）</p>
              </div>

              <div class="detail-card">
                <div class="detail-icon">🌐</div>
                <h4>适用场景</h4>
                <p>小型应用、单页面应用或不需要代码分割的场景</p>
              </div>

              <div class="detail-card">
                <div class="detail-icon">⚠️</div>
                <h4>注意事项</h4>
                <p>所有依赖都会打包到同一个文件中，可能导致文件体积过大</p>
              </div>
            </div>
          </div>

          <!-- 单入口数组 -->
          <div v-show="activeType === 1" class="type-detail">
            <h3 class="type-title">单入口（数组）</h3>
            <p class="type-desc">多个文件作为单个入口，最终合并到一个 chunk 中</p>

            <div class="config-card">
              <h4 class="config-name">配置示例</h4>
              <pre class="code-block">module.exports = {
  entry: [
    './src/polyfills.js', // 引入 polyfills
    './src/index.js'      // 应用主入口
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};</pre>
            </div>

            <div class="type-details">
              <div class="detail-card">
                <div class="detail-icon">🔗</div>
                <h4>合并原理</h4>
                <p>按照数组顺序合并文件，常用于引入 polyfill 或全局样式</p>
              </div>

              <div class="detail-card">
                <div class="detail-icon">🧩</div>
                <h4>依赖关系</h4>
                <p>数组中的文件会被合并并作为一个入口点处理</p>
              </div>

              <div class="detail-card">
                <div class="detail-icon">📌</div>
                <h4>顺序重要性</h4>
                <p>文件顺序很重要，会按照数组顺序依次执行</p>
              </div>
            </div>
          </div>

          <!-- 多入口对象 -->
          <div v-show="activeType === 2" class="type-detail">
            <h3 class="type-title">多入口（对象）</h3>
            <p class="type-desc">多个独立的入口文件，每个入口生成一个 chunk</p>

            <div class="config-card">
              <h4 class="config-name">配置示例</h4>
              <pre class="code-block">module.exports = {
  entry: {
    app: './src/app.js',        // 应用主入口
    admin: './src/admin.js',    // 管理后台入口
    vendor: ['react', 'react-dom'] // 第三方库
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};</pre>
            </div>

            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">键名作用</div>
                <div class="detail-content">决定输出文件的 [name] 占位符值</div>
              </div>

              <div class="detail-item">
                <div class="detail-label">值类型</div>
                <div class="detail-content">可以是字符串、数组或描述对象</div>
              </div>

              <div class="detail-item">
                <div class="detail-label">输出文件</div>
                <div class="detail-content">每个入口生成一个独立的 bundle 文件</div>
              </div>

              <div class="detail-item">
                <div class="detail-label">依赖共享</div>
                <div class="detail-content">不同入口间的公共依赖可以提取为公共 chunk</div>
              </div>
            </div>

            <h4 class="sub-section-title">适用场景</h4>
            <div class="scenario-grid">
              <div class="scenario-card">
                <div class="scenario-icon">📱</div>
                <h5>多页面应用</h5>
                <p>每个页面有自己的入口文件</p>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">🧪</div>
                <h5>独立功能模块</h5>
                <p>如独立的管理后台或特殊功能模块</p>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">📚</div>
                <h5>第三方库分离</h5>
                <p>将第三方库单独打包</p>
              </div>
            </div>
          </div>

          <!-- 动态入口函数 -->
          <div v-show="activeType === 3" class="type-detail">
            <h3 class="type-title">动态入口（函数）</h3>
            <p class="type-desc">使用函数生成动态入口配置，适用于高级场景</p>

            <div class="config-card">
              <h4 class="config-name">配置示例</h4>
              <pre class="code-block">module.exports = {
  entry: () => {
    // 根据环境变量动态生成入口
    if (process.env.NODE_ENV === 'development') {
      return {
        main: './src/index.dev.js',
        mock: './src/mock-api.js'
      }
    } else {
      return {
        main: './src/index.prod.js'
      }
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};</pre>
            </div>

            <div class="dynamic-features">
              <h4 class="sub-section-title">动态入口的优势</h4>

              <div class="feature-grid">
                <div class="feature-card">
                  <div class="feature-icon">🔄</div>
                  <h5>环境适配</h5>
                  <p>根据环境变量动态调整入口</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon">📁</div>
                  <h5>文件扫描</h5>
                  <p>自动扫描目录创建多页面入口</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon">⚙️</div>
                  <h5>条件配置</h5>
                  <p>根据条件添加测试模块或调试工具</p>
                </div>
              </div>
            </div>

            <div class="dynamic-usage">
              <h4 class="sub-section-title">使用场景</h4>

              <div class="usage-case">
                <div class="usage-icon">1</div>
                <div class="usage-desc">
                  <h5>多页面应用自动扫描</h5>
                  <p>扫描 pages 目录自动生成入口配置</p>
                </div>
              </div>

              <div class="usage-case">
                <div class="usage-icon">2</div>
                <div class="usage-desc">
                  <h5>A/B 测试</h5>
                  <p>根据用户特征动态加载不同入口</p>
                </div>
              </div>

              <div class="usage-case">
                <div class="usage-icon">3</div>
                <div class="usage-desc">
                  <h5>环境特定模块</h5>
                  <p>开发环境添加 mock 数据模块</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级配置 -->
      <section class="advanced-section">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>Entry 高级配置</h2>
        </div>

        <div class="advanced-grid">
          <div class="option-card">
            <div class="option-header">
              <div class="option-icon">🏷️</div>
              <h3>依赖声明</h3>
            </div>
            <div class="option-content">
              <p>声明入口文件间的共享依赖</p>
              <pre class="code-block">entry: {
  app: {
    import: './src/app.js',
    dependOn: 'shared'
  },
  admin: {
    import: './src/admin.js',
    dependOn: 'shared'
  },
  shared: ['react', 'react-dom']
}</pre>
            </div>
          </div>

          <div class="option-card">
            <div class="option-header">
              <div class="option-icon">📊</div>
              <h3>运行时配置</h3>
            </div>
            <div class="option-content">
              <p>配置入口的运行时和依赖关系</p>
              <pre class="code-block">entry: {
  app: {
    import: './src/app.js',
    runtime: 'app-runtime',
    dependOn: 'vendors'
  },
  vendors: ['react', 'react-dom']
}</pre>
            </div>
          </div>

          <div class="option-card">
            <div class="option-header">
              <div class="option-icon">📁</div>
              <h3>多页面自动配置</h3>
            </div>
            <div class="option-content">
              <p>自动化多页面入口配置</p>
              <pre class="code-block">// 使用 glob 自动扫描 pages 目录
const entry = {};
glob.sync('./src/pages/**/index.js').forEach(path => {
  const name = path.split('/')[3]; // 获取页面名称
  entry[name] = path;
});

module.exports = {
  entry,
  // ...其他配置
};</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="icon">🌟</div>
          <h2>Entry 配置最佳实践</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">1</div>
            <div class="practice-content">
              <h3>SPA 应用</h3>
              <p>使用单入口配置，结合代码分割</p>
              <pre class="code-block">entry: './src/index.js'</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">2</div>
            <div class="practice-content">
              <h3>多页面应用</h3>
              <p>使用多入口配置，每个页面独立入口</p>
              <pre class="code-block">entry: {
  home: './src/pages/home.js',
  about: './src/pages/about.js',
  contact: './src/pages/contact.js'
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">3</div>
            <div class="practice-content">
              <h3>大型应用</h3>
              <p>分离第三方库和运行时代码</p>
              <pre class="code-block">entry: {
  main: './src/index.js',
  vendors: ['react', 'react-dom']
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">4</div>
            <div class="practice-content">
              <h3>渐进式应用</h3>
              <p>核心应用入口 + 功能模块入口</p>
              <pre class="code-block">entry: {
  core: './src/core.js',
  analytics: './src/analytics.js',
  chat: './src/chat-widget.js'
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="faq-section">
        <div class="section-header">
          <div class="icon">❓</div>
          <h2>常见问题与解决方案</h2>
        </div>

        <div class="faq-grid">
          <div class="faq-card">
            <div class="faq-question">
              <div class="question-icon">Q</div>
              <h4>入口文件路径错误</h4>
            </div>
            <div class="faq-answer">
              <div class="answer-icon">A</div>
              <p>使用绝对路径或 path.resolve 避免路径问题</p>
              <pre class="code-block">const path = require('path');

entry: path.resolve(__dirname, 'src/index.js')</pre>
            </div>
          </div>

          <div class="faq-card">
            <div class="faq-question">
              <div class="question-icon">Q</div>
              <h4>多入口公共依赖重复打包</h4>
            </div>
            <div class="faq-answer">
              <div class="answer-icon">A</div>
              <p>使用 dependOn 或 SplitChunksPlugin 提取公共模块</p>
              <pre class="code-block">optimization: {
  splitChunks: {
    chunks: 'all'
  }
}</pre>
            </div>
          </div>

          <div class="faq-card">
            <div class="faq-question">
              <div class="question-icon">Q</div>
              <h4>动态入口未返回正确格式</h4>
            </div>
            <div class="faq-answer">
              <div class="answer-icon">A</div>
              <p>确保动态入口函数返回字符串、数组或对象</p>
              <pre class="code-block">entry: () => {
  return new Promise((resolve) => {
    resolve({
      main: './src/index.js'
    });
  });
}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Webpack Entry 配置基础介绍 | 构建起点 | © 2023</p>
      <div class="footer-links">
        <a href="https://webpack.js.org/concepts/entry-points/" target="_blank">官方文档</a>
        <a href="https://github.com/webpack/webpack" target="_blank">GitHub</a>
        <a href="https://webpack.js.org/configuration/entry-context/" target="_blank">配置参考</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const entryTypes = ref([
  { title: '单入口（字符串）' },
  { title: '单入口（数组）' },
  { title: '多入口（对象）' },
  { title: '动态入口（函数）' },
]);

const activeType = ref(0);
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.webpack-entry-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
  padding-bottom: 2rem;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .webpack-logo {
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
        color: #ede9fe;
      }

      &:nth-child(2) {
        color: #ddd6fe;
      }

      &:nth-child(3) {
        color: #c4b5fd;
      }

      &:nth-child(4) {
        color: #a78bfa;
      }

      &:nth-child(5) {
        color: #8b5cf6;
      }

      &:nth-child(6) {
        color: #7c3aed;
      }

      &:nth-child(7) {
        color: #6d28d9;
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

.content-wrapper {
  padding: 0 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.5rem;

  .icon {
    font-size: 1.8rem;
    background: #ede9fe;
    color: #7c3aed;
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
}

.intro-content {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  p {
    margin: 0 0 1.5rem;
    font-size: 1.1rem;
    line-height: 1.7;

    strong {
      color: #7c3aed;
      font-weight: 600;
    }
  }
}

.entry-process {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;

  .process-card {
    background: #f5f3ff;
    border-radius: 12px;
    padding: 1.2rem;
    text-align: center;
    flex: 1;
    max-width: 22%;

    .process-icon {
      width: 40px;
      height: 40px;
      background: #7c3aed;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin: 0 auto 0.8rem;
    }

    .process-desc {
      font-size: 0.95rem;
      color: #4b5563;
    }
  }

  .process-arrow {
    color: #a78bfa;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 -10px;
  }
}

.entry-importance {
  background: #f5f3ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;

  .importance-title {
    font-size: 1.3rem;
    color: #7c3aed;
    margin-top: 0;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #ddd6fe;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;

      strong {
        color: #7c3aed;
      }
    }
  }
}

.config-tabs {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;

  .type-tab {
    flex-shrink: 0;
    padding: 0.8rem 1.5rem;
    background: #ede9fe;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #ddd6fe;
    }

    &.active {
      background: #8b5cf6;
      color: white;
    }
  }
}

.type-content {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.type-detail {
  .type-title {
    font-size: 1.5rem;
    color: #7c3aed;
    margin-top: 0;
  }

  .type-desc {
    color: #4b5563;
    font-size: 1.1rem;
    margin: 0 0 1.5rem;
  }
}

.config-card {
  margin-bottom: 1.8rem;

  .config-name {
    font-size: 1.1rem;
    color: #7c3aed;
    margin: 0 0 0.8rem;
    font-weight: 600;
  }
}

.type-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
  margin-top: 1.5rem;

  .detail-card {
    background: #f5f3ff;
    border-radius: 10px;
    padding: 1.2rem;

    .detail-icon {
      font-size: 1.5rem;
      margin-bottom: 0.8rem;
      color: #7c3aed;
    }

    h4 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;

  .detail-item {
    background: #f5f3ff;
    border-radius: 8px;
    padding: 1rem;

    .detail-label {
      font-weight: 600;
      color: #7c3aed;
      margin-bottom: 0.3rem;
    }

    .detail-content {
      font-size: 0.95rem;
      color: #4b5563;
    }
  }
}

.sub-section-title {
  font-size: 1.2rem;
  color: #7c3aed;
  margin: 1.5rem 0 1rem;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;

  .scenario-card {
    background: #f5f3ff;
    border-radius: 10px;
    padding: 1.2rem;
    text-align: center;

    .scenario-icon {
      font-size: 1.8rem;
      color: #7c3aed;
      margin-bottom: 0.8rem;
    }

    h5 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.9rem;
    }
  }
}

.dynamic-features {
  margin: 2rem 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;

  .feature-card {
    background: #f5f3ff;
    border-radius: 10px;
    padding: 1.2rem;
    text-align: center;

    .feature-icon {
      font-size: 1.8rem;
      color: #7c3aed;
      margin-bottom: 0.8rem;
    }

    h5 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.9rem;
    }
  }
}

.dynamic-usage {
  margin-top: 2rem;
}

.usage-case {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .usage-icon {
    width: 32px;
    height: 32px;
    background: #7c3aed;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
  }

  .usage-desc {
    h5 {
      margin: 0 0 0.3rem;
      font-size: 1.1rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.5rem;
}

.option-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .option-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem;
    background: #ede9fe;

    .option-icon {
      font-size: 1.5rem;
      color: #7c3aed;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
      color: #1e293b;
    }
  }

  .option-content {
    padding: 1.2rem;

    p {
      margin-top: 0;
      color: #4b5563;
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .practice-icon {
    width: 60px;
    background: #ede9fe;
    color: #7c3aed;
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .practice-content {
    padding: 1.2rem;
    flex: 1;

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.2rem;
      color: #1e293b;
    }

    p {
      margin: 0 0 0.8rem;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.faq-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .faq-question {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem;
    background: #f5f3ff;

    .question-icon {
      width: 28px;
      height: 28px;
      background: #7c3aed;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }

    h4 {
      margin: 0;
      font-size: 1.1rem;
      color: #1e293b;
    }
  }

  .faq-answer {
    display: flex;
    gap: 0.8rem;
    padding: 1.2rem;

    .answer-icon {
      width: 28px;
      height: 28px;
      background: #a78bfa;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }

    p {
      margin: 0 0 0.8rem;
      color: #4b5563;
    }
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 2rem 1rem;
  color: #94a3b8;
  font-size: 0.95rem;
  margin-top: 2rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: #7c3aed;
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
  margin: 0.8rem 0;
}

@media (max-width: 768px) {
  .header-section {
    padding: 2rem 1rem;

    .webpack-logo {
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
    padding: 0 1rem;
  }

  .entry-process {
    flex-direction: column;
    gap: 1rem;

    .process-card {
      max-width: 100%;
      width: 100%;
    }

    .process-arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }
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
