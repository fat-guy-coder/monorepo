<template>
  <div class="loader-container">
    <header class="header">
      <h1>Webpack Loaders 基础介绍</h1>
      <p class="subtitle">了解常见loader的功能、配置和使用场景</p>
    </header>

    <section class="intro-section">
      <h2>什么是Webpack Loader?</h2>
      <p>Loader是Webpack的核心功能之一，用于对模块的源代码进行转换。它们允许你在导入或加载文件时预处理文件，将非JavaScript文件转换为Webpack能够处理的模块。</p>
      <div class="loader-process">
        <div class="step">
          <div class="step-icon">1</div>
          <div class="step-text">源文件</div>
        </div>
        <div class="arrow">→</div>
        <div class="step">
          <div class="step-icon">2</div>
          <div class="step-text">Loader处理</div>
        </div>
        <div class="arrow">→</div>
        <div class="step">
          <div class="step-icon">3</div>
          <div class="step-text">JavaScript模块</div>
        </div>
      </div>
    </section>

    <section class="loader-list">
      <div class="loader-card" v-for="(loader, index) in loaders" :key="loader.name">
        <div class="loader-header">
          <div class="loader-icon" :class="`icon-${index % 5}`">
            <span>{{ loader.name.charAt(0) }}</span>
          </div>
          <div class="loader-title">
            <h2>{{ loader.name }}</h2>
            <div class="loader-tags">
              <span class="tag" v-for="tag in loader.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <div class="loader-content">
          <div class="loader-description">
            <h3>作用</h3>
            <p>{{ loader.description }}</p>
          </div>

          <div class="loader-config">
            <h3>配置方法</h3>
            <pre><code>{{ loader.config }}</code></pre>
          </div>

          <div class="loader-usage">
            <h3>使用场景</h3>
            <ul>
              <li v-for="(scenario, i) in loader.useCases" :key="i">{{ scenario }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="best-practices">
      <h2>Loader 使用最佳实践</h2>
      <div class="practice-grid">
        <div class="practice-card">
          <div class="practice-icon">📁</div>
          <h3>顺序很重要</h3>
          <p>Loader执行顺序是从右到左（或从下到上），确保loader的顺序正确</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">⚙️</div>
          <h3>性能优化</h3>
          <p>使用include/exclude缩小loader处理范围，提升构建速度</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">📝</div>
          <h3>配置清晰</h3>
          <p>为每个loader添加明确的注释，说明其作用和配置项</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">🔄</div>
          <h3>链式调用</h3>
          <p>多个loader可以链式调用，前一个loader的输出是后一个loader的输入</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p> Webpack Loader 指南 | 持续更新中</p>
      <p>了解更多Webpack知识，请访问官方文档: <a href="https://webpack.js.org/" target="_blank">webpack.js.org</a></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义loader类型
interface Loader {
  name: string;
  description: string;
  config: string;
  useCases: string[];
  tags: string[];
}

// 常见loader数据
const loaders = ref<Loader[]>([
  {
    name: "babel-loader",
    description: "使用Babel转换JavaScript文件，将ES6+代码转换为向后兼容的JavaScript版本。",
    config: `module: {
  rules: [
    {
      test: /\\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }
  ]
}`,
    useCases: [
      "转换现代JavaScript语法为旧版本浏览器兼容的语法",
      "使用JSX语法开发React应用",
      "使用TypeScript开发但需要转换为JavaScript"
    ],
    tags: ["JavaScript", "编译", "转换"]
  },
  {
    name: "css-loader",
    description: "解析CSS文件中的@import和url()，处理模块依赖关系，返回CSS代码。",
    config: `module: {
  rules: [
    {
      test: /\\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true, // 启用CSS模块
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    }
  ]
}`,
    useCases: [
      "在JavaScript中导入CSS文件",
      "使用CSS模块实现局部作用域样式",
      "处理CSS中的资源路径"
    ],
    tags: ["CSS", "样式", "预处理"]
  },
  {
    name: "style-loader",
    description: "将CSS注入到DOM中，通过创建<style>标签将CSS添加到页面头部。",
    config: `module: {
  rules: [
    {
      test: /\\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}`,
    useCases: [
      "在开发环境中快速注入样式",
      "HMR（热模块替换）支持",
      "不需要单独提取CSS的小型项目"
    ],
    tags: ["CSS", "注入", "样式"]
  },
  {
    name: "sass-loader",
    description: "加载Sass/SCSS文件并编译为CSS。通常与css-loader和style-loader一起使用。",
    config: `module: {
  rules: [
    {
      test: /\\.s[ac]ss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers')
            }
          }
        }
      ]
    }
  ]
}`,
    useCases: [
      "使用Sass/SCSS预处理器编写样式",
      "利用Sass的变量、嵌套、混合等功能",
      "提高CSS开发效率和可维护性"
    ],
    tags: ["Sass", "SCSS", "预处理器"]
  },
  {
    name: "file-loader",
    description: "将文件解析为URL并生成文件到输出目录，返回文件的公共URL。",
    config: `module: {
  rules: [
    {
      test: /\\.(png|jpe?g|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'images/'
          }
        }
      ]
    }
  ]
}`,
    useCases: [
      "处理图片、字体等静态资源",
      "生成带哈希值的文件名用于缓存",
      "将资源复制到输出目录"
    ],
    tags: ["资源", "文件", "图片"]
  },
  {
    name: "url-loader",
    description: "类似于file-loader，但可以在文件大小低于指定阈值时返回DataURL（base64编码）。",
    config: `module: {
  rules: [
    {
      test: /\\.(png|jpe?g|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8KB的文件转为base64
            name: '[name].[hash].[ext]',
            outputPath: 'images/'
          }
        }
      ]
    }
  ]
}`,
    useCases: [
      "将小图片转换为base64嵌入到代码中",
      "减少小文件的HTTP请求",
      "大文件自动回退到file-loader处理"
    ],
    tags: ["资源", "base64", "优化"]
  },
  {
    name: "vue-loader",
    description: "解析Vue单文件组件（.vue文件），提取其中的template、script和style。",
    config: `const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  module: {
    rules: [
      {
        test: /\\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}`,
    useCases: [
      "开发Vue单文件组件应用",
      "处理Vue组件中的模板、样式和逻辑",
      "与Vue生态工具集成（如Vuex、Vue Router）"
    ],
    tags: ["Vue", "单文件组件", "框架"]
  },
  {
    name: "ts-loader",
    description: "将TypeScript编译为JavaScript，支持TypeScript的所有特性。",
    config: `module: {
  rules: [
    {
      test: /\\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }
  ]
}`,
    useCases: [
      "开发TypeScript项目",
      "在JavaScript项目中使用TypeScript文件",
      "利用TypeScript的类型检查功能"
    ],
    tags: ["TypeScript", "编译", "类型检查"]
  },
  {
    name: "eslint-loader",
    description: "在Webpack构建过程中使用ESLint检查代码规范，可在开发时实时提示错误。",
    config: `module: {
  rules: [
    {
      enforce: 'pre', // 前置loader，先于其他loader执行
      test: /\\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      options: {
        fix: true, // 自动修复可修复的问题
        emitWarning: true // 将错误显示为警告
      }
    }
  ]
}`,
    useCases: [
      "在构建过程中进行代码质量检查",
      "统一团队代码风格",
      "自动修复可修复的代码问题"
    ],
    tags: ["代码质量", "规范", "检查"]
  }
]);
</script>

<style lang="less" scoped>
.loader-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  background-color: #f8fafc;
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e2e8f0;

    h1 {
      font-size: 2.5rem;
      color: #3498db;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #718096;
    }
  }

  .intro-section {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 35px;

    h2 {
      color: #3498db;
      margin-top: 0;
      border-left: 4px solid #3498db;
      padding-left: 12px;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 25px;
    }

    .loader-process {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 25px;

      .step {
        text-align: center;
        min-width: 120px;

        .step-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 10px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
        }

        .step-text {
          font-weight: 500;
          color: #2d3748;
        }
      }

      .arrow {
        font-size: 24px;
        color: #a0aec0;
        margin: 0 20px;
      }
    }
  }

  .loader-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 25px;
    margin-bottom: 40px;

    .loader-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
      }

      .loader-header {
        display: flex;
        align-items: center;
        padding: 20px;
        background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
        border-bottom: 1px solid #e2e8f0;

        .loader-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-weight: bold;
          font-size: 20px;
          color: white;

          &.icon-0 {
            background: linear-gradient(135deg, #3498db, #1abc9c);
          }

          &.icon-1 {
            background: linear-gradient(135deg, #9b59b6, #e74c3c);
          }

          &.icon-2 {
            background: linear-gradient(135deg, #f39c12, #d35400);
          }

          &.icon-3 {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
          }

          &.icon-4 {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
          }
        }

        .loader-title {
          h2 {
            margin: 0;
            color: #2c3e50;
            font-size: 1.6rem;
          }
        }

        .loader-tags {
          margin-top: 5px;

          .tag {
            display: inline-block;
            background: #edf2f7;
            color: #4a5568;
            font-size: 0.8rem;
            padding: 3px 10px;
            border-radius: 20px;
            margin-right: 8px;
          }
        }
      }

      .loader-content {
        padding: 20px;

        h3 {
          color: #3498db;
          margin-top: 0;
          margin-bottom: 12px;
          font-size: 1.2rem;
          display: flex;
          align-items: center;

          &::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #3498db;
            margin-right: 10px;
          }
        }

        .loader-description {
          margin-bottom: 20px;

          p {
            margin: 0;
            color: #4a5568;
          }
        }

        .loader-config {
          margin-bottom: 20px;
          background: #f8fafc;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #e2e8f0;

          pre {
            margin: 0;
            padding: 15px;
            overflow-x: auto;
            font-size: 0.9rem;
            background: #f8fafc;

            code {
              font-family: 'Fira Code', 'Courier New', monospace;
              color: #2d3748;
              line-height: 1.5;
            }
          }
        }

        .loader-usage {
          ul {
            padding-left: 20px;
            margin: 0;

            li {
              margin-bottom: 8px;
              position: relative;
              padding-left: 20px;

              &::before {
                content: '•';
                position: absolute;
                left: 0;
                color: #3498db;
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }
  }

  .best-practices {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 40px;

    h2 {
      color: #3498db;
      margin-top: 0;
      margin-bottom: 25px;
      text-align: center;
      font-size: 1.8rem;
    }

    .practice-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;

      .practice-card {
        background: #f8fafc;
        padding: 25px;
        border-radius: 8px;
        text-align: center;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        .practice-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h3 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 12px;
        }

        p {
          margin: 0;
          color: #4a5568;
          font-size: 0.95rem;
        }
      }
    }
  }

  .footer {
    text-align: center;
    padding: 20px;
    color: #718096;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;

    a {
      color: #3498db;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .loader-list {
    grid-template-columns: 1fr !important;
  }

  .practice-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
