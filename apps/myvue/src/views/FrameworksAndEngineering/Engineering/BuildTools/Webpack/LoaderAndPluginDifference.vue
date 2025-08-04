<template>
  <div class="webpack-container">
    <header class="header">
      <h1>Webpack Loader 与 Plugin 核心区别解析</h1>
      <p>深入理解 Webpack 两大核心机制的原理与应用</p>
    </header>

    <div class="comparison-section">
      <div class="comparison-card loader-card">
        <div class="card-header">
          <div class="icon-wrapper">
            <div class="icon-bg loader-icon"></div>
          </div>
          <h2>Loader 加载器</h2>
        </div>

        <div class="card-content">
          <h3>作用</h3>
          <ul>
            <li>文件加载前的转换器</li>
            <li>处理单个文件的转换操作</li>
            <li>将非 JavaScript 模块转换为 Webpack 可处理模块</li>
            <li>支持链式调用，顺序执行</li>
          </ul>

          <h3>配置方式</h3>
          <pre><code class="language-javascript">module: {
  rules: [
    {
      test: /\.txt$/,
      use: [
        {
          loader: 'raw-loader',
          options: {
            esModule: false
          }
        }
      ]
    }
  ]
}</code></pre>

          <h3>底层原理</h3>
          <ul>
            <li>Loader 本质是一个函数，接收源文件内容作为参数</li>
            <li>返回转换后的 JavaScript 代码</li>
            <li>执行顺序：从右到左，从下到上</li>
            <li>支持同步和异步两种处理模式</li>
            <li>通过 pitch 方法可以控制执行流程</li>
          </ul>
        </div>
      </div>

      <div class="comparison-divider">
        <div class="divider-line"></div>
        <div class="vs-circle">VS</div>
      </div>

      <div class="comparison-card plugin-card">
        <div class="card-header">
          <div class="icon-wrapper">
            <div class="icon-bg plugin-icon"></div>
          </div>
          <h2>Plugin 插件</h2>
        </div>

        <div class="card-content">
          <h3>作用</h3>
          <ul>
            <li>执行更广泛的任务和自定义功能</li>
            <li>在 Webpack 生命周期中执行操作</li>
            <li>可以修改打包输出结果</li>
            <li>实现资源优化、环境注入等高级功能</li>
          </ul>

          <h3>配置方式</h3>
          <pre><code class="language-javascript">const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: './src/index.html'
    })
  ]
};</code></pre>

          <h3>底层原理</h3>
          <ul>
            <li>基于 Tapable 的事件流机制</li>
            <li>通过监听 Webpack 生命周期钩子执行自定义逻辑</li>
            <li>可以访问 Compiler 和 Compilation 对象</li>
            <li>能够修改输出资源或添加额外资源</li>
            <li>可自定义钩子实现插件间的通信</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="summary-section">
      <h2>核心区别总结</h2>
      <div class="differences-grid">
        <div class="grid-header">
          <div class="header-cell">对比维度</div>
          <div class="header-cell">Loader</div>
          <div class="header-cell">Plugin</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell">主要功能</div>
          <div class="grid-cell">文件转换</div>
          <div class="grid-cell">扩展功能</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell">执行时机</div>
          <div class="grid-cell">模块加载阶段</div>
          <div class="grid-cell">整个构建生命周期</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell">配置位置</div>
          <div class="grid-cell">module.rules</div>
          <div class="grid-cell">plugins 数组</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell">工作原理</div>
          <div class="grid-cell">文件内容转换函数</div>
          <div class="grid-cell">事件监听/钩子机制</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell">作用对象</div>
          <div class="grid-cell">单个文件</div>
          <div class="grid-cell">整个构建流程</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell">常见示例</div>
          <div class="grid-cell">babel-loader, css-loader</div>
          <div class="grid-cell">HtmlWebpackPlugin, CleanWebpackPlugin</div>
        </div>
      </div>
    </div>

    <div class="lifecycle-section">
      <h2>Webpack 构建生命周期中的 Loader 与 Plugin</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="(step, index) in lifecycleSteps" :key="index">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3>{{ step.title }}</h3>
            <div class="timeline-details">
              <div v-if="step.loader" class="loader-indicator">Loader</div>
              <div v-if="step.plugin" class="plugin-indicator">Plugin</div>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2023 Webpack 核心机制解析 | 深入理解前端构建工具</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const lifecycleSteps = ref([
  {
    title: '初始化',
    description: '准备参数，创建Compiler对象',
    plugin: true
  },
  {
    title: '开始编译',
    description: '执行run方法开始编译过程',
    plugin: true
  },
  {
    title: '解析模块',
    description: '根据配置中的入口文件，解析模块依赖',
    plugin: true
  },
  {
    title: '加载模块',
    description: '根据模块类型使用对应的Loader进行转换',
    loader: true
  },
  {
    title: '模块构建',
    description: '使用Loader转换后的模块进行AST分析',
    plugin: true
  },
  {
    title: '依赖收集',
    description: '递归收集所有模块的依赖关系',
    plugin: true
  },
  {
    title: '封包优化',
    description: '使用Plugin进行代码分割、优化等操作',
    plugin: true
  },
  {
    title: '生成资源',
    description: '根据模板生成最终输出文件',
    plugin: true
  },
  {
    title: '输出结果',
    description: '将生成的文件写入文件系统',
    plugin: true
  }
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 基础变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@loader-color: #4cc9f0;
@plugin-color: #f72585;
@background: #f8f9fa;
@text-color: #212529;
@border-color: #e9ecef;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@transition: all 0.3s ease;

// 重置与基础样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.webpack-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: @background;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 1.25rem;
    font-weight: 300;
    color: lighten(@text-color, 20%);
  }
}

// 对比卡片区域
.comparison-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
}

.comparison-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: @card-shadow;
  overflow: hidden;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.loader-card {
  border-top: 4px solid @loader-color;

  .icon-bg {
    background-color: fade(@loader-color, 15%);
  }
}

.plugin-card {
  border-top: 4px solid @plugin-color;

  .icon-bg {
    background-color: fade(@plugin-color, 15%);
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid @border-color;

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-left: 1rem;
  }
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-bg {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.loader-icon::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234cc9f0'%3E%3Cpath d='M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z'/%3E%3C/svg%3E");
}

.plugin-icon::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f72585'%3E%3Cpath d='M17 5.33C17 3.5 15.5 2 13.67 2H5.33C3.5 2 2 3.5 2 5.33v8.34c0 1.83 1.5 3.33 3.33 3.33h8.34c1.83 0 3.33-1.5 3.33-3.33V5.33M7 18v2h10v-2M11 16h2v4h-2'/%3E%3C/svg%3E");
}

.card-content {
  padding: 1.5rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.25rem 0 0.75rem;
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed @border-color;
  }

  ul {
    margin: 0.75rem 0 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;

      &::before {
        content: "•";
        color: @secondary-color;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }

  pre {
    background: lighten(@background, 1%);
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-size: 0.9rem;
    margin: 1rem 0;
    border: 1px solid @border-color;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      color: #495057;
    }
  }
}

// 对比分隔线
.comparison-divider {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.divider-line {
  flex: 1;
  width: 1px;
  background: @border-color;
}

.vs-circle {
  width: 60px;
  height: 60px;
  background: white;
  border: 1px solid @border-color;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: @text-color;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

// 总结表格区域
.summary-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @card-shadow;
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: @primary-color;
    font-size: 1.75rem;
  }
}

.differences-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;
}

.grid-header {
  display: contents;

  .header-cell {
    background: fade(@primary-color, 10%);
    padding: 1rem;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid @border-color;
  }
}

.grid-row {
  display: contents;

  &:nth-child(odd) {
    .grid-cell {
      background-color: lighten(@background, 1%);
    }
  }
}

.grid-cell {
  padding: 1rem;
  border-bottom: 1px solid @border-color;

  &:nth-child(1) {
    font-weight: 500;
  }

  &:nth-child(2) {
    color: @loader-color;
  }

  &:nth-child(3) {
    color: @plugin-color;
  }

  &:not(:last-child) {
    border-right: 1px solid @border-color;
  }
}

// 生命周期时间线
.lifecycle-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @card-shadow;
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: @primary-color;
    font-size: 1.75rem;
  }
}

.timeline {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 24px;
    width: 2px;
    background: @border-color;
  }
}

.timeline-item {
  display: flex;
  margin-bottom: 1.5rem;
  position: relative;
}

.timeline-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 2px solid @primary-color;
  margin-right: 1.5rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.timeline-content {
  flex: 1;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: @text-color;
  }
}

.timeline-details {
  background: lighten(@background, 1%);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid @border-color;

  p {
    margin-top: 0.5rem;
  }
}

.loader-indicator,
.plugin-indicator {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 0.5rem;
}

.loader-indicator {
  background: fade(@loader-color, 15%);
  color: darken(@loader-color, 15%);
}

.plugin-indicator {
  background: fade(@plugin-color, 15%);
  color: darken(@plugin-color, 15%);
}

// 页脚
.footer {
  text-align: center;
  padding: 2rem 0 1rem;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

// 响应式设计
@media (max-width: 900px) {
  .comparison-section {
    flex-direction: column;
  }

  .comparison-divider {
    display: none;
  }

  .timeline::before {
    left: 8px;
  }

  .timeline-marker {
    margin-right: 1rem;
  }
}

@media (max-width: 600px) {
  .differences-grid {
    grid-template-columns: 1fr;

    .grid-header {
      display: none;
    }

    .grid-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-bottom: 1px solid @border-color;
    }

    .grid-cell {
      border-right: none !important;

      &:first-child {
        grid-column: span 2;
        background: fade(@primary-color, 5%);
        font-weight: 600;
      }
    }
  }

  .header h1 {
    font-size: 2rem;
  }

  .card-header h2 {
    font-size: 1.5rem;
  }
}
</style>
