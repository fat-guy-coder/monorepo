<template>
  <div class="webpack-loader-reference">
    <!-- 标题区域 -->
    <header class="header">
      <h1>Webpack 实用 Loader 参考指南</h1>
      <p class="subtitle">提升开发体验与项目优化的专业加载器集合</p>
    </header>

    <!-- 控制区域 -->
    <div class="controls">
      <div class="search-box">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="搜索 loader..."
          class="search-input"
        >
        <span class="search-icon">🔍</span>
      </div>

      <div class="category-filter">
        <button
          v-for="category in categories"
          :key="category"
          @click="toggleCategory(category)"
          :class="{ active: selectedCategories.includes(category) }"
          class="category-btn"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Loader 展示区域 -->
    <div class="loader-container">
      <div
        v-for="(loader, index) in filteredLoaders"
        :key="index"
        class="loader-card"
      >
        <div class="loader-header">
          <div>
            <h2>{{ loader.name }}</h2>
            <div class="popularity">
              <span v-for="n in 5" :key="n" :class="{ filled: n <= loader.popularity }">★</span>
            </div>
          </div>
          <div class="install-badge">
            npm install {{ loader.package }} --save-dev
          </div>
        </div>

        <div class="loader-content">
          <div class="section">
            <h3>作用描述</h3>
            <p>{{ loader.description }}</p>
          </div>

          <div class="section">
            <h3>使用场景</h3>
            <ul>
              <li v-for="(scenario, i) in loader.scenarios" :key="i">{{ scenario }}</li>
            </ul>
          </div>

          <div class="section">
            <h3>配置示例</h3>
            <pre>{{ loader.configExample }}</pre>
          </div>

          <div class="section">
            <h3>注意事项</h3>
            <ul>
              <li v-for="(note, i) in loader.notes" :key="i">{{ note }}</li>
            </ul>
          </div>
        </div>

        <div class="loader-footer">
          <div class="tags">
            <span v-for="(tag, i) in loader.tags" :key="i" class="tag">{{ tag }}</span>
          </div>
          <div class="docs-link">
            <a :href="loader.docs" target="_blank">查看文档 →</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <footer class="footer">
      <p>共 {{ filteredLoaders.length }} 个实用 loader | Webpack 5 | Vue 3 + TypeScript</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Loader 类型定义
interface WebpackLoader {
  name: string;
  package: string;
  description: string;
  popularity: number; // 1-5
  scenarios: string[];
  configExample: string;
  notes: string[];
  tags: string[];
  docs: string;
}

// Loader 数据
const loaders = ref<WebpackLoader[]>([
  {
    name: "svg-sprite-loader",
    package: "svg-sprite-loader",
    description: "将多个 SVG 文件合并成一个 SVG 雪碧图，减少 HTTP 请求并简化 SVG 使用",
    popularity: 5,
    scenarios: [
      "项目中大量使用 SVG 图标",
      "需要将多个 SVG 合并优化",
      "希望以 symbol 方式引用 SVG"
    ],
    configExample: `{
  test: /\.svg$/,
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'icon-[name]'
      }
    },
    'svgo-loader' // 可选的 SVG 优化
  ]
}`,
    notes: [
      "需要配合 file-loader 排除不需要处理的 SVG",
      "使用 symbol 模式时，需要在 HTML 中注入 SVG",
      "支持自定义 symbol ID 命名规则"
    ],
    tags: ["SVG", "优化", "雪碧图"],
    docs: "https://github.com/JetBrains/svg-sprite-loader"
  },
  {
    name: "image-webpack-loader",
    package: "image-webpack-loader",
    description: "自动压缩图片资源（JPG, PNG, GIF, SVG），显著减小图片体积",
    popularity: 5,
    scenarios: [
      "项目中有大量图片资源需要优化",
      "需要自动化压缩图片而不损失质量",
      "提升页面加载速度"
    ],
    configExample: `{
  test: /\.(jpe?g|png|gif|svg)$/,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.90], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      }
    }
  ]
}`,
    notes: [
      "压缩过程较耗时，建议在 production 构建时使用",
      "可配置不同图片格式的压缩参数",
      "与 file-loader 或 url-loader 配合使用"
    ],
    tags: ["图片优化", "压缩", "性能"],
    docs: "https://github.com/tcoopman/image-webpack-loader"
  },
  {
    name: "thread-loader",
    package: "thread-loader",
    description: "将耗时的 loader 放在 worker 池中运行，实现多线程并行处理",
    popularity: 4,
    scenarios: [
      "项目构建速度慢需要优化",
      "有 CPU 密集型的 loader 处理（如 Babel, TypeScript）",
      "多核 CPU 机器上提升构建性能"
    ],
    configExample: `{
  test: /\.js$/,
  use: [
    'thread-loader',
    'babel-loader'
  ]
}`,
    notes: [
      "每个 worker 都是独立的 Node.js 进程",
      "适用于 CPU 密集型 loader，不适用于 I/O 密集型",
      "预热需要时间，小型项目可能效果不明显"
    ],
    tags: ["性能优化", "多线程", "构建加速"],
    docs: "https://webpack.js.org/loaders/thread-loader/"
  },
  {
    name: "cache-loader",
    package: "cache-loader",
    description: "缓存 loader 处理结果，避免重复处理未变更的文件，加速增量构建",
    popularity: 4,
    scenarios: [
      "开发环境下需要快速热更新",
      "处理大型项目时减少构建时间",
      "loader 处理成本高且文件变更不频繁"
    ],
    configExample: `{
  test: /\.js$/,
  use: [
    'cache-loader',
    'babel-loader'
  ]
}`,
    notes: [
      "Webpack 5 内置了持久化缓存，可能不再需要",
      "适用于 Webpack 4 或更早版本",
      "会增加内存使用量"
    ],
    tags: ["缓存", "性能优化", "开发体验"],
    docs: "https://webpack.js.org/loaders/cache-loader/"
  },
  {
    name: "i18n-loader",
    package: "@intlify/webpack-loader",
    description: "为 Vue 应用提供国际化支持，自动处理多语言文件",
    popularity: 4,
    scenarios: [
      "多语言网站或应用开发",
      "需要按需加载语言包",
      "Vue 项目中使用 vue-i18n"
    ],
    configExample: `{
  test: /\.(json5?|ya?ml)$/, // 处理 json, json5, yaml, yml
  type: 'javascript/auto',
  loader: '@intlify/webpack-loader',
  options: {
    include: [path.resolve(__dirname, 'locales')]
  }
}`,
    notes: [
      "与 vue-i18n 配合使用效果最佳",
      "支持多种语言文件格式（JSON, YAML）",
      "可以按需加载语言包，减少初始包大小"
    ],
    tags: ["国际化", "i18n", "Vue", "多语言"],
    docs: "https://github.com/intlify/bundle-tools/tree/main/packages/webpack-loader"
  },
  {
    name: "markdown-loader",
    package: "markdown-loader",
    description: "将 Markdown 文件转换为 HTML 或 React/Vue 组件",
    popularity: 4,
    scenarios: [
      "文档站点构建",
      "博客系统开发",
      "需要将 Markdown 集成到组件中"
    ],
    configExample: `// 基本用法
{
  test: /\.md$/,
  use: 'markdown-loader'
}

// 高级用法：配合 vue-loader
{
  test: /\.md$/,
  use: [
    'vue-loader',
    {
      loader: 'markdown-loader',
      options: {
        raw: true,
        // 其他 markdown-it 选项
      }
    }
  ]
}`,
    notes: [
      "通常需要配合 html-loader 或 vue-loader 使用",
      "可配置 markdown-it 插件扩展功能",
      "支持 front-matter 提取元数据"
    ],
    tags: ["Markdown", "文档", "静态站点"],
    docs: "https://webpack.js.org/loaders/markdown-loader/"
  },
  {
    name: "raw-loader",
    package: "raw-loader",
    description: "将文件作为原始字符串导入，适用于处理文本文件",
    popularity: 3,
    scenarios: [
      "导入 HTML 片段作为字符串",
      "处理文本文件内容",
      "需要获取文件的原始内容"
    ],
    configExample: `{
  test: /\.txt$/,
  use: 'raw-loader'
}

// 在代码中使用
import txtContent from './document.txt';`,
    notes: [
      "文件内容作为字符串导入",
      "不适合大型文件，会增加包大小",
      "Webpack 5 中可以使用 asset/source 代替"
    ],
    tags: ["文本处理", "原始内容", "简单"],
    docs: "https://webpack.js.org/loaders/raw-loader/"
  },
  {
    name: "yaml-loader",
    package: "yaml-loader",
    description: "加载 YAML 文件并解析为 JavaScript 对象",
    popularity: 3,
    scenarios: [
      "使用 YAML 格式的配置文件",
      "处理静态数据文件",
      "需要将 YAML 转换为 JSON 结构"
    ],
    configExample: `{
  test: /\.ya?ml$/,
  type: 'json', // Webpack 5 特性
  use: 'yaml-loader'
}

// 在代码中使用
import config from './config.yml';`,
    notes: [
      "输出 JSON 格式的数据",
      "支持 YAML 1.2 规范",
      "与 JSON 文件一样会被 tree-shaking"
    ],
    tags: ["YAML", "配置", "数据"],
    docs: "https://webpack.js.org/loaders/yaml-loader/"
  },
  {
    name: "graphql-tag/loader",
    package: "graphql-tag",
    description: "加载 .graphql 或 .gql 文件并解析为 GraphQL AST",
    popularity: 4,
    scenarios: [
      "使用 Apollo Client 或 Relay 的 GraphQL 项目",
      "需要预解析 GraphQL 查询",
      "分离 GraphQL 查询到单独文件中"
    ],
    configExample: `{
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  use: 'graphql-tag/loader'
}

// 在代码中使用
import query from './query.graphql';`,
    notes: [
      "避免在运行时解析 GraphQL，提高性能",
      "支持片段（fragments）导入",
      "输出可被 GraphQL 客户端直接使用的 AST"
    ],
    tags: ["GraphQL", "查询", "Apollo"],
    docs: "https://github.com/apollographql/graphql-tag"
  },
  {
    name: "csv-loader",
    package: "csv-loader",
    description: "加载 CSV 文件并解析为 JavaScript 数组或对象",
    popularity: 3,
    scenarios: [
      "处理数据可视化项目中的 CSV 数据",
      "导入结构化表格数据",
      "需要将 CSV 转换为 JSON 格式"
    ],
    configExample: `{
  test: /\.csv$/,
  use: [
    {
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    }
  ]
}`,
    notes: [
      "输出 JSON 数组或对象",
      "支持自定义分隔符和列处理",
      "可配置数据类型自动转换"
    ],
    tags: ["CSV", "数据", "表格"],
    docs: "https://webpack.js.org/loaders/csv-loader/"
  },
  {
    name: "xml-loader",
    package: "xml-loader",
    description: "加载 XML 文件并解析为 JavaScript 对象",
    popularity: 3,
    scenarios: [
      "处理 XML 格式的配置文件",
      "集成 XML 格式的 API 响应",
      "需要将 XML 转换为 JSON 结构"
    ],
    configExample: `{
  test: /\.xml$/,
  use: {
    loader: 'xml-loader',
    options: {
      explicitArray: false, // 不强制转为数组
      mergeAttrs: true      // 合并属性和子元素
    }
  }
}`,
    notes: [
      "基于 xml2js 库实现",
      "可配置解析选项满足不同需求",
      "输出结构化的 JavaScript 对象"
    ],
    tags: ["XML", "数据", "配置"],
    docs: "https://webpack.js.org/loaders/xml-loader/"
  },
  {
    name: "vue-svg-loader",
    package: "vue-svg-loader",
    description: "将 SVG 文件作为 Vue 组件导入，支持 SVG 操作和样式控制",
    popularity: 5,
    scenarios: [
      "在 Vue 项目中需要操作 SVG 元素",
      "希望为 SVG 添加动态样式或交互",
      "需要组件化方式管理 SVG"
    ],
    configExample: `{
  test: /\.svg$/,
  use: [
    'vue-loader',
    {
      loader: 'vue-svg-loader',
      options: {
        svgo: {
          plugins: [
            { removeDoctype: true },
            { removeComments: true },
            { removeViewBox: false }
          ]
        }
      }
    }
  ]
}`,
    notes: [
      "导入后 SVG 变为 Vue 组件",
      "支持 SVG 内部元素的 class 和 style 绑定",
      "可配置 SVGO 优化选项"
    ],
    tags: ["SVG", "Vue", "组件化"],
    docs: "https://vue-svg-loader.js.org/"
  },
  {
    name: "webpack-bundle-analyzer",
    package: "webpack-bundle-analyzer",
    description: "可视化分析 Webpack 输出包的组成和大小（作为插件使用）",
    popularity: 5,
    scenarios: [
      "分析打包体积，优化应用大小",
      "查找可以拆分的模块",
      "识别意外包含的大型依赖"
    ],
    configExample: `// 在 webpack.config.js 中使用
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html',
      openAnalyzer: false
    })
  ]
}`,
    notes: [
      "作为插件而非 loader 使用",
      "生成交互式可视化报告",
      "建议在 CI/CD 流程中生成报告"
    ],
    tags: ["分析", "优化", "打包"],
    docs: "https://github.com/webpack-contrib/webpack-bundle-analyzer"
  },
  {
    name: "prerender-spa-plugin",
    package: "prerender-spa-plugin",
    description: "为单页应用生成静态 HTML，提升 SEO 和首屏加载速度",
    popularity: 4,
    scenarios: [
      "需要改善 SPA 的 SEO",
      "提升首屏加载性能",
      "生成静态页面用于预渲染"
    ],
    configExample: `const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  plugins: [
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/about', '/contact'],
      renderer: new Renderer({
        headless: true,
        renderAfterDocumentEvent: 'custom-render-event'
      })
    })
  ]
}`,
    notes: [
      "需要无头浏览器（如 Puppeteer）支持",
      "配置要预渲染的路由",
      "适用于静态内容较多的页面"
    ],
    tags: ["SEO", "预渲染", "性能"],
    docs: "https://github.com/chrisvfritz/prerender-spa-plugin"
  }
]);

// 可用分类
const categories = ref<string[]>([
  "全部",
  "性能优化",
  "资源处理",
  "开发体验",
  "特殊文件",
  "Vue专属",
  "SEO相关"
]);

// 选中的分类
const selectedCategories = ref<string[]>(["全部"]);

// 搜索词
const searchTerm = ref<string>("");

// 切换分类
const toggleCategory = (category: string) => {
  if (category === "全部") {
    selectedCategories.value = ["全部"];
    return;
  }

  const index = selectedCategories.value.indexOf(category);

  if (index > -1) {
    selectedCategories.value.splice(index, 1);
    // 如果移除了所有分类，自动选择"全部"
    if (selectedCategories.value.length === 0) {
      selectedCategories.value.push("全部");
    }
  } else {
    // 移除"全部"如果选择了具体分类
    const allIndex = selectedCategories.value.indexOf("全部");
    if (allIndex > -1) {
      selectedCategories.value.splice(allIndex, 1);
    }
    selectedCategories.value.push(category);
  }
};

// 过滤 loader
const filteredLoaders = computed(() => {
  return loaders.value.filter(loader => {
    // 分类过滤（通过标签匹配）
    const categoryMatch = selectedCategories.value.includes("全部") ||
                          loader.tags.some(tag =>
                            selectedCategories.value.includes(tag)
                          );

    // 搜索过滤
    const searchMatch = !searchTerm.value ||
                        loader.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                        loader.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                        loader.tags.some(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()));

    return categoryMatch && searchMatch;
  });
});
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;
@info-color: #118ab2;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.webpack-loader-reference {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: @light-bg;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
    color: @secondary-color;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;

  .search-box {
    position: relative;
    flex: 1;
    max-width: 500px;

    .search-input {
      width: 100%;
      padding: 12px 15px 12px 40px;
      border: 1px solid @border-color;
      border-radius: 30px;
      font-size: 1rem;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 2px 8px rgba(67, 97, 238, 0.2);
      }
    }

    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #777;
    }
  }

  .category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;

    .category-btn {
      padding: 8px 16px;
      background: white;
      border: 1px solid @border-color;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;

      &:hover {
        background-color: #f0f0f0;
      }

      &.active {
        background-color: @primary-color;
        color: white;
        border-color: @primary-color;
      }
    }
  }
}

.loader-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.loader-card {
  background: @card-bg;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }
}

.loader-header {
  padding: 15px 20px;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.4rem;
    margin-bottom: 5px;
  }

  .popularity {
    color: #ddd;
    font-size: 0.9rem;

    .filled {
      color: @warning-color;
    }
  }

  .install-badge {
    background: rgba(255,255,255,0.2);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-family: 'Courier New', monospace;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.loader-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .section {
    h3 {
      font-size: 1.1rem;
      color: @primary-color;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid @border-color;
    }

    p, ul {
      margin-bottom: 5px;
      color: lighten(@text-color, 15%);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 8px;
      }
    }

    pre {
      background: @light-bg;
      border-left: 3px solid @primary-color;
      padding: 12px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.4;
      border-radius: 0 4px 4px 0;
      white-space: pre-wrap;
      color: #333;
      margin-top: 8px;
    }
  }
}

.loader-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: fade(@primary-color, 5%);
  border-top: 1px solid @border-color;

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    .tag {
      background: fade(@primary-color, 15%);
      color: @primary-color;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
    }
  }

  .docs-link a {
    color: @primary-color;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 20px 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
  margin-top: auto;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;

    .search-box {
      max-width: 100%;
    }
  }

  .loader-container {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }

  .loader-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    .install-badge {
      width: 100%;
      max-width: none;
    }
  }
}

@media (max-width: 480px) {
  .category-filter {
    justify-content: flex-start;
  }

  .header {
    padding: 10px 0;

    h1 {
      font-size: 1.8rem;
    }
  }
}
</style>
