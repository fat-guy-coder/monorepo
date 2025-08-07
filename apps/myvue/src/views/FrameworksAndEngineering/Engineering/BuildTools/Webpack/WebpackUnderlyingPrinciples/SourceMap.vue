<template>
  <div class="sourcemap-guide">
    <header class="header">
      <div class="header-content">
        <h1>Webpack Source Map 基本介绍</h1>
        <p>连接编译代码与源代码的桥梁，提升调试效率</p>
      </div>
      <div class="map-visualization">
        <div class="compiled-code">编译代码</div>
        <div class="map-arrow">
          <i class="fas fa-arrow-right"></i>
          <div class="map-line"></div>
        </div>
        <div class="source-map">Source Map</div>
        <div class="map-arrow">
          <i class="fas fa-arrow-right"></i>
          <div class="map-line"></div>
        </div>
        <div class="source-code">源代码</div>
      </div>
    </header>

    <div class="content-container">
      <aside class="sidebar">
        <nav>
          <ul>
            <li v-for="section in sections" :key="section.id">
              <a :href="`#${section.id}`" @click.prevent="scrollTo(section.id)"
                :class="{ active: activeSection === section.id }">
                <i :class="section.icon"></i>
                <span>{{ section.title }}</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="sidebar-footer">
          <div class="map-indicator">
            <div class="map-dot"></div>
            <span>Source Map 已启用</span>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <section id="introduction" class="section">
          <div class="section-header">
            <i class="fas fa-map"></i>
            <h2>什么是 Source Map？</h2>
          </div>

          <div class="content-card">
            <p><strong>Source Map</strong> 是一种文件格式，它建立了编译后代码（如压缩、转换后的 JavaScript）与原始源代码之间的映射关系。</p>

            <div class="analogy">
              <div class="analogy-icon">
                <i class="fas fa-road"></i>
              </div>
              <div class="analogy-content">
                <h3>Source Map 就像地图导航</h3>
                <p>就像地图帮助你在陌生城市导航一样，Source Map 帮助浏览器在压缩混淆后的代码中定位到原始源代码位置。</p>
              </div>
            </div>

            <div class="key-points">
              <h3>核心功能</h3>
              <div class="points-grid">
                <div class="point">
                  <div class="point-icon">
                    <i class="fas fa-bug"></i>
                  </div>
                  <h4>精确调试</h4>
                  <p>在浏览器中直接调试原始代码</p>
                </div>
                <div class="point">
                  <div class="point-icon">
                    <i class="fas fa-file-code"></i>
                  </div>
                  <h4>错误追踪</h4>
                  <p>获取原始代码的错误堆栈信息</p>
                </div>
                <div class="point">
                  <div class="point-icon">
                    <i class="fas fa-search"></i>
                  </div>
                  <h4>代码审查</h4>
                  <p>审查转换前的原始代码逻辑</p>
                </div>
                <div class="point">
                  <div class="point-icon">
                    <i class="fas fa-tachometer-alt"></i>
                  </div>
                  <h4>性能分析</h4>
                  <p>在性能分析中关联原始代码</p>
                </div>
              </div>
            </div>

            <div class="file-structure">
              <h3>Source Map 文件结构</h3>
              <pre class="code-block">{
  "version": 3,                 // Source Map 版本
  "file": "app.min.js",         // 编译后的文件名
  "sourceRoot": "",             // 源文件根目录
  "sources": [                  // 源文件列表
    "app.js",
    "utils.js"
  ],
  "sourcesContent": [ ... ],    // 源文件内容（可选）
  "names": [ ... ],             // 所有变量/函数名
  "mappings": "AAAA,SAASC,OAASC..."  // 编码后的映射信息
}</pre>
            </div>
          </div>
        </section>

        <section id="configuration" class="section">
          <div class="section-header">
            <i class="fas fa-cog"></i>
            <h2>Source Map 配置指南</h2>
          </div>

          <div class="content-card">
            <h3>Webpack 基础配置</h3>
            <p>在 webpack.config.js 中通过 devtool 属性配置 Source Map：</p>

            <div class="config-tabs">
              <div class="tabs-header">
                <button :class="{ active: activeConfigTab === 'basic' }"
                  @click="activeConfigTab = 'basic'">基础配置</button>
                <button :class="{ active: activeConfigTab === 'dev' }" @click="activeConfigTab = 'dev'">开发环境</button>
                <button :class="{ active: activeConfigTab === 'prod' }" @click="activeConfigTab = 'prod'">生产环境</button>
              </div>

              <div class="tab-content">
                <div v-if="activeConfigTab === 'basic'" class="code-block">
                  <pre><code>// webpack.config.js
module.exports = {
  // ...其他配置
  devtool: 'source-map', // 生成完整的 source map 文件

  // 高级配置
  output: {
    sourceMapFilename: '[file].map[query]', // 自定义 source map 文件名
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'], // 加载现有的 source map
        enforce: 'pre',
      },
      // ...其他 loader
    ]
  }
};</code></pre>
                </div>

                <div v-if="activeConfigTab === 'dev'" class="code-block">
                  <pre><code>// 开发环境推荐配置
module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  // 优点：
  // - 快速构建（cheap）
  // - 精确到行（module）
  // - 适合开发环境
  // - 错误信息准确

  devServer: {
    // 启用 source map 支持
    devMiddleware: {
      writeToDisk: true, // 将 source map 写入磁盘
    }
  }
};</code></pre>
                </div>

                <div v-if="activeConfigTab === 'prod'" class="code-block">
                  <pre><code>// 生产环境推荐配置
module.exports = {
  mode: 'production',
  devtool: 'hidden-source-map',

  // 优点：
  // - 生成完整 source map
  // - 不暴露源文件（hidden）
  // - 不内联到 bundle 中
  // - 通过错误监控系统使用

  // 另一种选择：
  // devtool: 'nosources-source-map'
  // - 提供错误堆栈但不暴露源代码

  plugins: [
    // 安全地将 source map 上传到错误监控系统
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      publicPath: 'https://example.com/sourcemaps/',
      moduleFilenameTemplate: 'webpack:///[resourcePath]'
    })
  ]
};</code></pre>
                </div>
              </div>
            </div>

            <h3>不同 devtool 选项对比</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>devtool 选项</th>
                    <th>构建速度</th>
                    <th>重新构建速度</th>
                    <th>生产安全</th>
                    <th>质量</th>
                    <th>适用环境</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="option in devtoolOptions" :key="option.name">
                    <td><code>{{ option.name }}</code></td>
                    <td>
                      <div class="speed-bar" :style="{ width: option.buildSpeed + '%' }"></div>
                      <span>{{ option.buildSpeed }}%</span>
                    </td>
                    <td>
                      <div class="speed-bar" :style="{ width: option.rebuildSpeed + '%' }"></div>
                      <span>{{ option.rebuildSpeed }}%</span>
                    </td>
                    <td :class="option.prodSafe ? 'safe' : 'unsafe'">
                      <i :class="option.prodSafe ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'"></i>
                      {{ option.prodSafe ? '安全' : '不安全' }}
                    </td>
                    <td>{{ option.quality }}</td>
                    <td>{{ option.environment }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="principle" class="section">
          <div class="section-header">
            <i class="fas fa-microscope"></i>
            <h2>Source Map 底层原理</h2>
          </div>

          <div class="content-card">
            <h3>映射机制</h3>
            <p>Source Map 的核心是映射算法，它将编译后代码的位置映射回原始源代码位置。</p>

            <div class="mapping-visual">
              <div class="mapping-row">
                <div class="compiled">
                  <div class="title">编译后代码</div>
                  <div class="line">1: function a(){...}</div>
                  <div class="line">2: console.log("error")</div>
                  <div class="line highlight">3: throw new Error()</div>
                  <div class="line">4: // ...</div>
                </div>
                <div class="arrow">
                  <i class="fas fa-arrow-right"></i>
                </div>
                <div class="source-map">
                  <div class="title">Source Map</div>
                  <div class="mapping">第3行 → 原始文件: app.js</div>
                  <div class="mapping highlight">第3行, 第10列 → 原始文件第20行, 第5列</div>
                </div>
                <div class="arrow">
                  <i class="fas fa-arrow-right"></i>
                </div>
                <div class="source">
                  <div class="title">原始源代码</div>
                  <div class="line">18: function process() {</div>
                  <div class="line">19: // 处理逻辑</div>
                  <div class="line highlight">20: throw new CustomError('发生错误');</div>
                  <div class="line">21: }</div>
                </div>
              </div>
            </div>

            <div class="vlq-explanation">
              <h3>VLQ 编码</h3>
              <p>Source Map 使用 <strong>VLQ（Variable Length Quantity）</strong> 编码来高效存储映射信息。</p>

              <div class="vlq-example">
                <div class="vlq-code">AAAA,SAASC,OAASC</div>
                <div class="vlq-desc">
                  <p>每个逗号分隔的部分对应编译后文件中的一行</p>
                  <p>每个片段包含 1-5 个字段：</p>
                  <ol>
                    <li>编译后代码的列</li>
                    <li>原始文件索引</li>
                    <li>原始代码行</li>
                    <li>原始代码列</li>
                    <li>名称索引（可选）</li>
                  </ol>
                </div>
              </div>

              <div class="vlq-process">
                <div class="step">
                  <div class="step-number">1</div>
                  <p>将位置信息转换为相对值</p>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <p>将数值转换为 Base64 VLQ</p>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <p>连接所有映射点形成 mappings 字符串</p>
                </div>
              </div>
            </div>

            <div class="generation-flow">
              <h3>生成流程</h3>
              <div class="flow-chart">
                <div class="flow-step">
                  <div class="step-icon"><i class="fas fa-file-code"></i></div>
                  <div class="step-label">原始源代码</div>
                </div>
                <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="flow-step">
                  <div class="step-icon"><i class="fas fa-cogs"></i></div>
                  <div class="step-label">Loader 处理</div>
                </div>
                <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="flow-step">
                  <div class="step-icon"><i class="fas fa-code"></i></div>
                  <div class="step-label">生成 AST</div>
                </div>
                <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="flow-step">
                  <div class="step-icon"><i class="fas fa-map-marked-alt"></i></div>
                  <div class="step-label">生成 Source Map</div>
                </div>
                <div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="flow-step">
                  <div class="step-icon"><i class="fas fa-file-export"></i></div>
                  <div class="step-label">输出 bundle + .map</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="use-cases" class="section">
          <div class="section-header">
            <i class="fas fa-laptop-code"></i>
            <h2>使用场景与最佳实践</h2>
          </div>

          <div class="content-card">
            <h3>典型使用场景</h3>

            <div class="scenarios">
              <div class="scenario">
                <div class="scenario-icon">
                  <i class="fas fa-bug"></i>
                </div>
                <div class="scenario-content">
                  <h4>浏览器调试</h4>
                  <p>在 Chrome DevTools 中直接调试原始代码，设置断点、检查变量</p>
                </div>
              </div>

              <div class="scenario">
                <div class="scenario-icon">
                  <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="scenario-content">
                  <h4>错误监控</h4>
                  <p>在 Sentry、Bugsnag 等系统中还原原始错误堆栈</p>
                </div>
              </div>

              <div class="scenario">
                <div class="scenario-icon">
                  <i class="fas fa-tachometer-alt"></i>
                </div>
                <div class="scenario-content">
                  <h4>性能分析</h4>
                  <p>在性能分析工具中关联原始代码，识别瓶颈</p>
                </div>
              </div>

              <div class="scenario">
                <div class="scenario-icon">
                  <i class="fas fa-code"></i>
                </div>
                <div class="scenario-content">
                  <h4>代码审查</h4>
                  <p>审查压缩混淆后的代码时理解原始逻辑</p>
                </div>
              </div>
            </div>

            <h3>不同环境的推荐配置</h3>
            <div class="env-recommendations">
              <div class="env-card">
                <h4>开发环境</h4>
                <ul>
                  <li><strong>推荐</strong>: <code>eval-cheap-module-source-map</code></li>
                  <li>快速构建和重新构建</li>
                  <li>精确到行（忽略列）</li>
                  <li>支持原始源代码</li>
                </ul>
              </div>

              <div class="env-card">
                <h4>测试环境</h4>
                <ul>
                  <li><strong>推荐</strong>: <code>cheap-module-source-map</code></li>
                  <li>生成外部 source map 文件</li>
                  <li>更好的错误追踪</li>
                  <li>比开发环境略慢</li>
                </ul>
              </div>

              <div class="env-card">
                <h4>生产环境</h4>
                <ul>
                  <li><strong>推荐</strong>: <code>hidden-source-map</code></li>
                  <li>生成完整 source map</li>
                  <li>不上传至公开服务器</li>
                  <li>通过错误监控系统使用</li>
                  <li>替代方案: <code>nosources-source-map</code></li>
                </ul>
              </div>
            </div>

            <h3>安全最佳实践</h3>
            <div class="security-practices">
              <div class="practice">
                <div class="practice-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <div class="practice-content">
                  <h4>不要公开 source map</h4>
                  <p>避免将 source map 部署到公开服务器，防止源代码泄露</p>
                </div>
              </div>

              <div class="practice">
                <div class="practice-icon">
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="practice-content">
                  <h4>上传到错误监控系统</h4>
                  <p>将 source map 上传到 Sentry、Bugsnag 等系统进行安全存储</p>
                </div>
              </div>

              <div class="practice">
                <div class="practice-icon">
                  <i class="fas fa-key"></i>
                </div>
                <div class="practice-content">
                  <h4>访问控制</h4>
                  <p>如果必须提供 source map，添加身份验证和访问控制</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="optimization" class="section">
          <div class="section-header">
            <i class="fas fa-rocket"></i>
            <h2>性能优化与问题解决</h2>
          </div>

          <div class="content-card">
            <h3>Source Map 性能优化</h3>

            <div class="optimization-methods">
              <div class="method">
                <div class="method-icon">
                  <i class="fas fa-bolt"></i>
                </div>
                <div class="method-content">
                  <h4>使用更快的 devtool 选项</h4>
                  <p>在开发环境中选择构建速度更快的选项：</p>
                  <ul>
                    <li><code>eval</code> - 最快的选项，但功能有限</li>
                    <li><code>eval-cheap-source-map</code> - 快速且忽略列信息</li>
                    <li><code>eval-cheap-module-source-map</code> - 推荐，支持原始源代码</li>
                  </ul>
                </div>
              </div>

              <div class="method">
                <div class="method-icon">
                  <i class="fas fa-cube"></i>
                </div>
                <div class="method-content">
                  <h4>减少源文件大小</h4>
                  <p>优化源文件可减少 source map 大小：</p>
                  <ul>
                    <li>移除未使用的代码（Tree Shaking）</li>
                    <li>避免过长的标识符</li>
                    <li>使用模块化架构</li>
                  </ul>
                </div>
              </div>

              <div class="method">
                <div class="method-icon">
                  <i class="fas fa-wrench"></i>
                </div>
                <div class="method-content">
                  <h4>高级配置优化</h4>
                  <p>通过插件进行精细控制：</p>
                  <div class="code-block small">
                    <pre><code>// 只对特定文件生成 source map
new webpack.SourceMapDevToolPlugin({
  test: /\.(js|css)($|\?)/i,
  filename: '[file].map',
  module: true,
  columns: false // 忽略列信息提升性能
})</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <h3>常见问题与解决方案</h3>
            <div class="troubleshooting">
              <div class="issue">
                <div class="issue-header">
                  <i class="fas fa-exclamation-circle"></i>
                  <h4>Source Map 未生效</h4>
                </div>
                <div class="issue-solution">
                  <p><strong>可能原因</strong>: 浏览器缓存、路径错误、配置问题</p>
                  <p><strong>解决方案</strong>:</p>
                  <ol>
                    <li>清除浏览器缓存并硬刷新</li>
                    <li>检查网络面板是否加载了 .map 文件</li>
                    <li>确认 devtool 配置正确</li>
                  </ol>
                </div>
              </div>

              <div class="issue">
                <div class="issue-header">
                  <i class="fas fa-sync-alt"></i>
                  <h4>构建速度慢</h4>
                </div>
                <div class="issue-solution">
                  <p><strong>可能原因</strong>: 使用完整 source-map、大型项目、配置不当</p>
                  <p><strong>解决方案</strong>:</p>
                  <ol>
                    <li>开发环境使用更快的 devtool 选项</li>
                    <li>使用 <code>cheap</code> 选项忽略列信息</li>
                    <li>排除 node_modules 目录</li>
                  </ol>
                </div>
              </div>

              <div class="issue">
                <div class="issue-header">
                  <i class="fas fa-lock"></i>
                  <h4>源代码暴露风险</h4>
                </div>
                <div class="issue-solution">
                  <p><strong>可能原因</strong>: 生产环境部署了 source map</p>
                  <p><strong>解决方案</strong>:</p>
                  <ol>
                    <li>使用 <code>hidden-source-map</code></li>
                    <li>通过 CI/CD 自动上传到错误监控系统后删除</li>
                    <li>添加服务器访问控制</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section conclusion">
          <div class="section-header">
            <i class="fas fa-flag-checkered"></i>
            <h2>总结与最佳实践</h2>
          </div>

          <div class="content-card">
            <div class="summary">
              <p>Source Map 是现代 Web 开发中不可或缺的工具，它架起了编译后代码与原始源代码之间的桥梁。</p>

              <div class="key-takeaways">
                <h3>核心要点</h3>
                <ul>
                  <li>开发环境：使用 <code>eval-cheap-module-source-map</code> 平衡速度与功能</li>
                  <li>生产环境：使用 <code>hidden-source-map</code> 并通过错误监控系统使用</li>
                  <li>安全第一：切勿将 source map 文件部署到公开服务器</li>
                  <li>性能优化：选择适合需求的 devtool 选项，避免过度开销</li>
                </ul>
              </div>

              <div class="final-tip">
                <i class="fas fa-lightbulb"></i>
                <p>正确配置 Source Map 可以节省调试时间，提升开发体验，同时确保生产环境的安全性和性能。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>Webpack Source Map 基本介绍 | Vue3 + TypeScript 实现</p>
      <p>© 2023 Webpack 高级开发技术</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 活动导航项
const activeSection = ref('introduction');
const activeConfigTab = ref('basic');

// 导航部分
const sections = ref([
  { id: 'introduction', title: 'Source Map 简介', icon: 'fas fa-map' },
  { id: 'configuration', title: '配置指南', icon: 'fas fa-cog' },
  { id: 'principle', title: '底层原理', icon: 'fas fa-microscope' },
  { id: 'use-cases', title: '使用场景', icon: 'fas fa-laptop-code' },
  { id: 'optimization', title: '性能优化', icon: 'fas fa-rocket' }
]);

// devtool 选项比较数据
const devtoolOptions = ref([
  {
    name: 'eval',
    buildSpeed: 100,
    rebuildSpeed: 100,
    prodSafe: false,
    quality: '转换后代码',
    environment: '开发'
  },
  {
    name: 'eval-source-map',
    buildSpeed: 70,
    rebuildSpeed: 70,
    prodSafe: false,
    quality: '原始源代码',
    environment: '开发'
  },
  {
    name: 'cheap-source-map',
    buildSpeed: 60,
    rebuildSpeed: 60,
    prodSafe: false,
    quality: '转换后代码（行）',
    environment: '开发'
  },
  {
    name: 'cheap-module-source-map',
    buildSpeed: 50,
    rebuildSpeed: 50,
    prodSafe: false,
    quality: '原始源代码（行）',
    environment: '开发/测试'
  },
  {
    name: 'source-map',
    buildSpeed: 40,
    rebuildSpeed: 40,
    prodSafe: true,
    quality: '原始源代码',
    environment: '生产'
  },
  {
    name: 'hidden-source-map',
    buildSpeed: 40,
    rebuildSpeed: 40,
    prodSafe: true,
    quality: '原始源代码',
    environment: '生产'
  },
  {
    name: 'nosources-source-map',
    buildSpeed: 45,
    rebuildSpeed: 45,
    prodSafe: true,
    quality: '无源代码',
    environment: '生产'
  }
]);

// 滚动监听
const handleScroll = () => {
  const sectionElements = sections.value.map(s =>
    document.getElementById(s.id)
  ).filter(Boolean) as HTMLElement[];

  const scrollPosition = window.scrollY + 100;

  sectionElements.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight) {
      activeSection.value = section.id;
    }
  });
};

// 滚动到指定区域
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = id;
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>



// 变量定义
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@success-color: #2ec4b6;
@error-color: #e71d36;
@warning-color: #ff9f1c;
@text-color: #2b2d42;
@light-bg: #f8f9fa;
@border-color: #e9ecef;
@card-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
@sidebar-width: 280px;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  color: @text-color;
  line-height: 1.6;
  background-color: #f0f2f5;
  overflow-x: hidden;
}

.sourcemap-guide {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

// 页眉样式
.header {
  background: linear-gradient(135deg, darken(@secondary-color, 10%), @primary-color);
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  .header-content {
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;
    z-index: 2;
    position: relative;

    h1 {
      font-size: 2.6rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.3rem;
      opacity: 0.9;
    }
  }
}

.map-visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  >div {
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    font-weight: 500;
    text-align: center;
    min-width: 150px;
  }

  .map-arrow {
    padding: 0 1rem;
    position: relative;

    i {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.7);
    }

    .map-line {
      position: absolute;
      height: 2px;
      width: 100%;
      background: rgba(255, 255, 255, 0.3);
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      z-index: -1;
    }
  }
}

// 内容布局
.content-container {
  display: flex;
  flex: 1;
}

.sidebar {
  width: @sidebar-width;
  background: @light-bg;
  border-right: 1px solid @border-color;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: calc(100vh - 80px);

  nav ul {
    list-style: none;
    flex: 1;

    li {
      margin-bottom: 0.3rem;
    }

    a {
      display: flex;
      align-items: center;
      padding: 0.9rem 1.5rem;
      text-decoration: none;
      color: @text-color;
      font-weight: 500;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;

      i {
        font-size: 1.1rem;
        width: 25px;
        margin-right: 0.8rem;
      }

      &:hover {
        background: rgba(@primary-color, 0.05);
        color: @primary-color;
      }

      &.active {
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        border-left: 4px solid @primary-color;
        font-weight: 600;
      }
    }
  }
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid @border-color;

  .map-indicator {
    display: flex;
    align-items: center;
    background: rgba(@accent-color, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: darken(@accent-color, 20%);
    font-weight: 500;

    .map-dot {
      width: 12px;
      height: 12px;
      background: @accent-color;
      border-radius: 50%;
      margin-right: 0.7rem;
      animation: pulse 1.5s infinite;
    }
  }
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}

.main-content {
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
}

// 章节样式
.section {
  margin-bottom: 3rem;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    i {
      font-size: 1.8rem;
      color: @primary-color;
      margin-right: 1rem;
    }

    h2 {
      font-size: 1.8rem;
      color: @secondary-color;
    }
  }
}

.content-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @card-shadow;
  margin-bottom: 2rem;
  border: 1px solid @border-color;

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem;
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  h4 {
    font-size: 1.2rem;
    margin: 1.2rem 0 0.8rem;
    color: darken(@text-color, 10%);
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
}

// 类比部分
.analogy {
  display: flex;
  background: rgba(@accent-color, 0.08);
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid @accent-color;

  .analogy-icon {
    margin-right: 1.5rem;

    i {
      font-size: 3rem;
      color: @accent-color;
    }
  }

  .analogy-content {
    flex: 1;

    h3 {
      margin-top: 0;
      color: darken(@accent-color, 20%);
    }
  }
}

// 关键点网格
.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .point {
    text-align: center;
    padding: 1.5rem;
    background: rgba(@primary-color, 0.05);
    border-radius: 8px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    .point-icon {
      width: 60px;
      height: 60px;
      background: rgba(@primary-color, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;

      i {
        font-size: 1.8rem;
        color: @primary-color;
      }
    }

    h4 {
      margin: 0.5rem 0;
      color: @primary-color;
    }
  }
}

// 代码块样式
.code-block {
  background: #2b2b2b;
  color: #f8f8f2;
  font-family: 'Source Code Pro', monospace;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;

  pre {
    margin: 0;
    padding: 1.5rem;

    code {
      display: block;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }

  &.small {
    pre {
      padding: 1rem;

      code {
        font-size: 0.85rem;
      }
    }
  }
}

// 配置标签页
.config-tabs {
  margin: 1.5rem 0;

  .tabs-header {
    display: flex;
    border-bottom: 2px solid @border-color;
    margin-bottom: -1px;

    button {
      padding: 0.8rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
      color: @text-color;
      position: relative;
      transition: all 0.3s;

      &:hover {
        color: @primary-color;
      }

      &.active {
        color: @primary-color;
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: @primary-color;
          border-radius: 3px 3px 0 0;
        }
      }
    }
  }

  .tab-content {
    border: 1px solid @border-color;
    border-radius: 0 8px 8px 8px;
    overflow: hidden;
  }
}

// 比较表格
.comparison-table {
  margin: 2rem 0;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: @light-bg;
      font-weight: 600;
    }

    tr:hover {
      background: rgba(@primary-color, 0.03);
    }

    .safe {
      color: @success-color;
    }

    .unsafe {
      color: @error-color;
    }

    .speed-bar {
      height: 8px;
      background: linear-gradient(to right, @success-color, @warning-color);
      border-radius: 4px;
      margin-bottom: 0.3rem;
    }
  }
}

// 映射可视化
.mapping-visual {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid @border-color;

  .mapping-row {
    display: flex;
    align-items: stretch;

    >div {
      flex: 1;
      padding: 1rem;
      border-radius: 6px;
      background: white;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

      .title {
        font-weight: 600;
        margin-bottom: 1rem;
        color: @primary-color;
      }
    }

    .compiled,
    .source {
      .line {
        padding: 0.3rem;
        font-family: 'Source Code Pro', monospace;
        font-size: 0.9rem;

        &.highlight {
          background: rgba(@warning-color, 0.1);
          border-left: 3px solid @warning-color;
        }
      }
    }

    .source-map {
      .mapping {
        padding: 0.5rem;
        font-family: 'Source Code Pro', monospace;
        font-size: 0.9rem;

        &.highlight {
          background: rgba(@accent-color, 0.1);
          border-left: 3px solid @accent-color;
        }
      }
    }

    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;

      i {
        font-size: 1.5rem;
        color: @accent-color;
      }
    }
  }
}

// 响应式调整
@media (max-width: 1100px) {
  .content-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid @border-color;
  }

  .main-content {
    padding: 1.5rem;
  }

  .header {
    padding: 1.5rem;

    .header-content h1 {
      font-size: 2rem;
    }
  }
}

@media (max-width: 768px) {
  .mapping-visual .mapping-row {
    flex-direction: column;
    gap: 1rem;

    .arrow {
      padding: 1rem 0;

      i {
        transform: rotate(90deg);
      }
    }
  }

  .map-visualization {
    flex-direction: column;
    gap: 1rem;

    .map-arrow {
      padding: 0.5rem 0;

      i {
        transform: rotate(90deg);
      }

      .map-line {
        height: 100%;
        width: 2px;
      }
    }
  }

  .points-grid {
    grid-template-columns: 1fr;
  }
}
</style>
