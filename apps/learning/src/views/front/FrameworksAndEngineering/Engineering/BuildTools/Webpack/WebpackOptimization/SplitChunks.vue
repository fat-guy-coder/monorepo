<template>
  <div class="split-chunks-container">
    <header class="header">
      <h1>Webpack <span class="highlight">SplitChunks</span> 配置基础介绍</h1>
      <p class="subtitle">优化代码分割，提升应用加载性能</p>
    </header>

    <div class="content">
      <div class="intro-cards">
        <div class="intro-card">
          <div class="icon">
            <i class="fas fa-puzzle-piece"></i>
          </div>
          <h3>什么是代码分割？</h3>
          <p>将代码拆分为多个文件（chunk），按需加载，减少初始加载时间。</p>
        </div>
        <div class="intro-card">
          <div class="icon">
            <i class="fas fa-rocket"></i>
          </div>
          <h3>为什么需要 SplitChunks？</h3>
          <p>避免重复依赖，共享公共模块，优化缓存利用率，提升加载性能。</p>
        </div>
        <div class="intro-card">
          <div class="icon">
            <i class="fas fa-sliders-h"></i>
          </div>
          <h3>配置核心</h3>
          <p>通过优化缓存组（cacheGroups）配置，实现精细化的代码分割策略。</p>
        </div>
      </div>

      <section class="config-section">
        <h2 class="section-title">
          <i class="fas fa-cog"></i> SplitChunks 核心配置
        </h2>

        <div class="config-options">
          <div class="option-card" v-for="(option, index) in configOptions" :key="index">
            <div class="option-header">
              <h3>{{ option.name }}</h3>
              <span class="option-type">{{ option.type }}</span>
            </div>
            <div class="option-content">
              <p>{{ option.description }}</p>

              <div class="option-values" v-if="option.values">
                <h4>可选值：</h4>
                <ul>
                  <li v-for="(value, valueIndex) in option.values" :key="valueIndex">
                    <code>{{ value.value }}</code> - {{ value.description }}
                  </li>
                </ul>
              </div>

              <div class="option-default" v-if="option.default !== undefined">
                <h4>默认值：</h4>
                <code>{{ option.default }}</code>
              </div>

              <div class="option-example" v-if="option.example">
                <h4>配置示例：</h4>
                <pre><code>{{ option.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cache-groups">
        <h2 class="section-title">
          <i class="fas fa-layer-group"></i> CacheGroups 缓存组配置
        </h2>

        <div class="groups-intro">
          <p>缓存组是 <code>splitChunks</code> 的核心，通过定义不同的缓存组，可以精细控制代码分割策略。</p>
          <p>每个缓存组继承 <code>splitChunks</code> 的全局配置，并可以覆盖这些配置。</p>
        </div>

        <div class="group-options">
          <div class="group-card" v-for="(group, index) in cacheGroups" :key="index">
            <div class="group-header">
              <h3>{{ group.name }}</h3>
              <span class="group-type">{{ group.type }}</span>
            </div>
            <div class="group-content">
              <p>{{ group.description }}</p>

              <div class="group-config">
                <h4>配置属性：</h4>
                <ul>
                  <li v-for="(prop, propIndex) in group.properties" :key="propIndex">
                    <code>{{ prop.name }}</code>: {{ prop.description }}
                  </li>
                </ul>
              </div>

              <div class="group-example">
                <h4>配置示例：</h4>
                <pre><code>{{ group.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="examples">
        <h2 class="section-title">
          <i class="fas fa-code"></i> 完整配置示例
        </h2>

        <div class="example-tabs">
          <button v-for="(tab, index) in exampleTabs" :key="index" @click="activeExample = index"
            :class="{ active: activeExample === index }">
            {{ tab.label }}
          </button>
        </div>

        <div class="example-content">
          <div class="example-description">
            <h3>{{ exampleTabs[activeExample].label }}</h3>
            <p>{{ exampleTabs[activeExample].description }}</p>
          </div>
          <pre><code>{{ exampleTabs[activeExample].code }}</code></pre>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">
          <i class="fas fa-check-circle"></i> 最佳实践与优化建议
        </h2>

        <div class="practices">
          <div class="practice-card">
            <div class="icon">
              <i class="fas fa-balance-scale"></i>
            </div>
            <h3>平衡策略</h3>
            <ul>
              <li>避免创建过多小文件（增加HTTP请求）</li>
              <li>避免创建过大文件（影响加载时间）</li>
              <li>理想大小：30KB-150KB</li>
              <li>使用 <code>minSize</code> 和 <code>maxSize</code> 控制大小</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="icon">
              <i class="fas fa-users"></i>
            </div>
            <h3>共享依赖</h3>
            <ul>
              <li>将第三方库（node_modules）分离为独立 chunk</li>
              <li>分离框架代码（React, Vue, Angular 等）</li>
              <li>使用 <code>test: /[\\/]node_modules[\\/]/</code> 匹配</li>
              <li>设置较高的 <code>priority</code> 确保优先分离</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="icon">
              <i class="fas fa-sync-alt"></i>
            </div>
            <h3>缓存优化</h3>
            <ul>
              <li>利用内容哈希创建持久缓存</li>
              <li>将变动较少的代码分离为独立 chunk</li>
              <li>业务代码与第三方库分离</li>
              <li>使用 <code>filename: '[name].[contenthash].js'</code></li>
            </ul>
          </div>
        </div>

        <div class="performance-tips">
          <h3><i class="fas fa-lightbulb"></i> 性能优化技巧</h3>
          <div class="tips-grid">
            <div class="tip">
              <div class="tip-icon">
                <i class="fas fa-search"></i>
              </div>
              <h4>分析工具</h4>
              <p>使用 <code>webpack-bundle-analyzer</code> 分析包内容</p>
            </div>
            <div class="tip">
              <div class="tip-icon">
                <i class="fas fa-tachometer-alt"></i>
              </div>
              <h4>异步加载</h4>
              <p>结合动态 <code>import()</code> 实现按需加载</p>
            </div>
            <div class="tip">
              <div class="tip-icon">
                <i class="fas fa-cogs"></i>
              </div>
              <h4>优化策略</h4>
              <p>根据应用特点调整 <code>maxAsyncRequests</code> 和 <code>maxInitialRequests</code></p>
            </div>
            <div class="tip">
              <div class="tip-icon">
                <i class="fas fa-file-medical-alt"></i>
              </div>
              <h4>运行时文件</h4>
              <p>使用 <code>runtimeChunk</code> 分离 Webpack 运行时文件</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p> Webpack SplitChunks 配置指南 | 使用 Vue 3 和 TypeScript 实现</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 当前激活的示例标签
const activeExample = ref(0);

// 示例标签
const exampleTabs = [
  {
    label: "基础配置",
    description: "适合中小型项目的简单配置，分离第三方库和公共模块。",
    code: `module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,  // 超过20KB才拆分
      minRemainingSize: 0,
      minChunks: 1,    // 至少被引用1次
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\\\/]node_modules[\\\\/]/,
          priority: -10,  // 优先级
          reuseExistingChunk: true,
        },
        common: {
          minChunks: 2,   // 至少被引用2次
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};`
  },
  {
    label: "高级配置",
    description: "针对大型项目的优化配置，精细化控制各种依赖的分割策略。",
    code: `module.exports = {
  optimization: {
    runtimeChunk: 'single',  // 分离运行时文件
    splitChunks: {
      chunks: 'all',
      minSize: 30000,        // 30KB以上才拆分
      maxSize: 200000,       // 最大200KB
      minChunks: 1,
      maxAsyncRequests: 6,   // 减少异步请求数
      maxInitialRequests: 4, // 减少初始请求数
      automaticNameDelimiter: '~',
      cacheGroups: {
        // 分离Vue相关依赖
        vue: {
          test: /[\\\\/]node_modules[\\\\/](vue|vue-router|vuex)[\\\\/]/,
          name: 'vue',
          chunks: 'all',
          priority: 20,
        },
        // 分离Element Plus
        elementPlus: {
          test: /[\\\\/]node_modules[\\\\/]element-plus[\\\\/]/,
          name: 'element-plus',
          chunks: 'all',
          priority: 15,
        },
        // 其他第三方库
        vendors: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        // 公共模块
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
        // 样式文件
        styles: {
          name: 'styles',
          test: /\\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};`
  },
  {
    label: "性能优化配置",
    description: "针对性能敏感应用的极致优化配置，最大化利用缓存和并行加载。",
    code: `module.exports = {
  optimization: {
    runtimeChunk: {
      name: 'runtime',  // 单独分离运行时文件
    },
    splitChunks: {
      chunks: 'all',
      minSize: 50000,   // 50KB以上才拆分
      maxSize: 250000,  // 最大250KB
      minChunks: 2,
      maxAsyncRequests: 5,  // 限制异步请求数
      maxInitialRequests: 3, // 限制初始请求数
      automaticNameDelimiter: '~',
      hidePathInfo: true,  // 隐藏路径信息
      cacheGroups: {
        // 框架代码
        framework: {
          test: /[\\\\/]node_modules[\\\\/](react|react-dom|react-router|redux)[\\\\/]/,
          name: 'framework',
          chunks: 'all',
          priority: 30,
          enforce: true,
        },
        // 工具库
        utilities: {
          test: /[\\\\/]node_modules[\\\\/](lodash|moment|axios|classnames)[\\\\/]/,
          name: 'utilities',
          chunks: 'all',
          priority: 20,
        },
        // 其他第三方库
        vendors: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        // 公共业务模块
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
          enforce: true,
        },
        // CSS文件单独处理
        styles: {
          name: 'styles',
          test: /\\.(css|scss|less)$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};`
  }
];

// SplitChunks 配置选项
const configOptions = [
  {
    name: "chunks",
    type: "string | function",
    description: "指定哪些类型的 chunk 会被优化",
    values: [
      { value: "'async'", description: "只处理异步 chunk（默认值）" },
      { value: "'initial'", description: "只处理同步 chunk" },
      { value: "'all'", description: "同时处理异步和同步 chunk" }
    ],
    default: "'async'",
    example: `splitChunks: {
  chunks: 'all'
}`
  },
  {
    name: "minSize",
    type: "number",
    description: "生成 chunk 的最小大小（单位：字节），小于此值的模块不会被拆分",
    default: "20000",
    example: `splitChunks: {
  minSize: 30000 // 30KB
}`
  },
  {
    name: "maxSize",
    type: "number",
    description: "尝试将大于 maxSize 的 chunk 拆分成更小的 chunk",
    default: "0（无限制）",
    example: `splitChunks: {
  maxSize: 250000 // 250KB
}`
  },
  {
    name: "minChunks",
    type: "number",
    description: "模块被引用多少次以上才被拆分",
    default: "1",
    example: `splitChunks: {
  minChunks: 2 // 至少被引用2次
}`
  },
  {
    name: "maxAsyncRequests",
    type: "number",
    description: "按需加载时的最大并行请求数",
    default: "30",
    example: `splitChunks: {
  maxAsyncRequests: 6 // 限制异步请求数
}`
  },
  {
    name: "maxInitialRequests",
    type: "number",
    description: "入口点的最大并行请求数",
    default: "30",
    example: `splitChunks: {
  maxInitialRequests: 4 // 限制初始请求数
}`
  },
  {
    name: "automaticNameDelimiter",
    type: "string",
    description: "生成名称时使用的分隔符",
    default: "'~'",
    example: `splitChunks: {
  automaticNameDelimiter: '-'
}`
  },
  {
    name: "name",
    type: "boolean | string | function",
    description: "设置 chunk 的名称，设为 false 将保持 chunk 名称不变",
    default: "true",
    example: `splitChunks: {
  name: 'vendors'
}`
  },
  {
    name: "cacheGroups",
    type: "object",
    description: "定义缓存组，用于更精细地控制代码分割",
    default: "{}",
    example: `splitChunks: {
  cacheGroups: {
    vendors: {
      test: /[\\\\/]node_modules[\\\\/]/,
      priority: -10
    }
  }
}`
  }
];

// CacheGroups 配置
const cacheGroups = [
  {
    name: "vendors",
    type: "常用配置",
    description: "用于分离 node_modules 中的第三方库",
    properties: [
      { name: "test", description: "匹配模块路径的正则表达式" },
      { name: "priority", description: "优先级，数值越大优先级越高" },
      { name: "filename", description: "指定生成的 chunk 文件名" },
      { name: "reuseExistingChunk", description: "是否复用已存在的 chunk" }
    ],
    example: `cacheGroups: {
  vendors: {
    test: /[\\\\/]node_modules[\\\\/]/,
    priority: -10,
    filename: 'vendors.[contenthash].js',
    reuseExistingChunk: true
  }
}`
  },
  {
    name: "common",
    type: "常用配置",
    description: "用于分离业务代码中的公共模块",
    properties: [
      { name: "minChunks", description: "模块被引用多少次以上才被拆分" },
      { name: "chunks", description: "指定 chunks 类型" },
      { name: "name", description: "指定 chunk 名称" },
      { name: "enforce", description: "强制分离，忽略其他限制" }
    ],
    example: `cacheGroups: {
  common: {
    minChunks: 2,
    chunks: 'initial',
    name: 'common',
    enforce: true
  }
}`
  },
  {
    name: "styles",
    type: "样式配置",
    description: "用于处理 CSS 等样式文件",
    properties: [
      { name: "type", description: "按模块类型匹配（如 'css/mini-extract'）" },
      { name: "test", description: "匹配文件类型的正则表达式" },
      { name: "chunks", description: "指定 chunks 类型" },
      { name: "enforce", description: "强制分离样式文件" }
    ],
    example: `cacheGroups: {
  styles: {
    name: 'styles',
    test: /\\.(css|scss)$/,
    chunks: 'all',
    enforce: true
  }
}`
  },
  {
    name: "framework",
    type: "框架配置",
    description: "用于分离框架代码（如 React, Vue 等）",
    properties: [
      { name: "test", description: "匹配特定框架路径" },
      { name: "name", description: "指定 chunk 名称" },
      { name: "priority", description: "设置较高优先级" },
      { name: "enforce", description: "强制分离框架代码" }
    ],
    example: `cacheGroups: {
  vue: {
    test: /[\\\\/]node_modules[\\\\/](vue|vue-router|vuex)[\\\\/]/,
    name: 'vue',
    priority: 20,
    enforce: true
  }
}`
  }
];
</script>

<style lang="less" scoped>



.split-chunks-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8fafc;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 700;

      .highlight {
        color: #3498db;
        background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
        padding: 0.2rem 0.8rem;
        border-radius: 8px;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .intro-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .intro-card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        width: 70px;
        height: 70px;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;

        i {
          font-size: 2rem;
          color: white;
        }
      }

      h3 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        color: #4a5568;
        line-height: 1.7;
      }
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin: 2.5rem 0 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #eef2f7;
    color: #2c3e50;
    display: flex;
    align-items: center;

    i {
      margin-right: 0.8rem;
      color: #3498db;
    }
  }

  .config-section {
    margin-bottom: 3rem;

    .config-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .option-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .option-header {
        padding: 1.2rem 1.5rem;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          font-size: 1.3rem;
          margin: 0;
        }

        .option-type {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
        }
      }

      .option-content {
        padding: 1.5rem;

        p {
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 1.2rem;
        }

        .option-values,
        .option-default,
        .option-example {
          margin-bottom: 1.2rem;
        }

        h4 {
          font-size: 1.1rem;
          margin-top: 0;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            color: #4a5568;
            line-height: 1.5;

            code {
              background: #f1f5f9;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
              color: #d35400;
            }
          }
        }

        .option-default code {
          background: #f1f5f9;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          display: inline-block;
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          color: #c0392b;
        }

        .option-example pre {
          background: #2c3e50;
          border-radius: 8px;
          padding: 1.2rem;
          overflow-x: auto;

          code {
            font-family: 'Fira Code', monospace;
            color: #e0e0e0;
            font-size: 0.9rem;
            line-height: 1.5;

            .hljs-attr {
              color: #82aaff;
            }

            .hljs-string {
              color: #c3e88d;
            }

            .hljs-number {
              color: #f78c6c;
            }
          }
        }
      }
    }
  }

  .cache-groups {
    margin-bottom: 3rem;

    .groups-intro {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      p {
        color: #4a5568;
        line-height: 1.7;
        margin-bottom: 0.8rem;

        &:last-child {
          margin-bottom: 0;
        }

        code {
          background: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          color: #d35400;
        }
      }
    }

    .group-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .group-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .group-header {
        padding: 1.2rem 1.5rem;
        background: linear-gradient(135deg, #9b59b6, #8e44ad);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          font-size: 1.3rem;
          margin: 0;
        }

        .group-type {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
        }
      }

      .group-content {
        padding: 1.5rem;

        p {
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 1.2rem;
        }

        .group-config {
          margin-bottom: 1.2rem;

          h4 {
            font-size: 1.1rem;
            margin-top: 0;
            margin-bottom: 0.8rem;
            color: #2c3e50;
          }

          ul {
            padding-left: 1.5rem;
            margin: 0;

            li {
              margin-bottom: 0.8rem;
              color: #4a5568;
              line-height: 1.5;

              code {
                background: #f1f5f9;
                padding: 0.2rem 0.4rem;
                border-radius: 4px;
                font-family: 'Fira Code', monospace;
                font-size: 0.9rem;
                color: #d35400;
              }
            }
          }
        }

        .group-example {
          pre {
            background: #2c3e50;
            border-radius: 8px;
            padding: 1.2rem;
            overflow-x: auto;

            code {
              font-family: 'Fira Code', monospace;
              color: #e0e0e0;
              font-size: 0.9rem;
              line-height: 1.5;

              .hljs-attr {
                color: #82aaff;
              }

              .hljs-string {
                color: #c3e88d;
              }
            }
          }
        }
      }
    }
  }

  .examples {
    margin-bottom: 3rem;

    .example-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;

      button {
        background: #f1f5f9;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 0.6rem 1.2rem;
        cursor: pointer;
        transition: all 0.2s;

        &.active,
        &:hover {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }
      }
    }

    .example-content {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .example-description {
        padding: 1.5rem;
        border-bottom: 1px solid #f1f5f9;

        h3 {
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        p {
          color: #4a5568;
          line-height: 1.7;
        }
      }

      pre {
        margin: 0;
        padding: 1.5rem;
        background: #2c3e50;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          color: #e0e0e0;
          font-size: 0.95rem;
          line-height: 1.5;

          .hljs-keyword {
            color: #ff9a76;
          }

          .hljs-title {
            color: #82aaff;
          }

          .hljs-attr {
            color: #82aaff;
          }

          .hljs-string {
            color: #c3e88d;
          }

          .hljs-number {
            color: #f78c6c;
          }
        }
      }
    }
  }

  .best-practices {
    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;

      .practice-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3498db, #2c3e50);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;

          i {
            font-size: 1.5rem;
            color: white;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            color: #4a5568;
            line-height: 1.5;

            code {
              background: #f1f5f9;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
              color: #d35400;
            }
          }
        }
      }
    }

    .performance-tips {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #2c3e50;
        display: flex;
        align-items: center;

        i {
          margin-right: 0.7rem;
          color: #3498db;
        }
      }

      .tips-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;

        .tip {
          display: flex;
          gap: 1rem;

          .tip-icon {
            width: 50px;
            height: 50px;
            background: #f1f5f9;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;

            i {
              font-size: 1.2rem;
              color: #3498db;
            }
          }

          h4 {
            font-size: 1.1rem;
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          p {
            color: #4a5568;
            margin: 0;
            line-height: 1.6;

            code {
              background: #f1f5f9;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
              color: #d35400;
            }
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;
  }
}

@media (max-width: 768px) {
  .split-chunks-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
