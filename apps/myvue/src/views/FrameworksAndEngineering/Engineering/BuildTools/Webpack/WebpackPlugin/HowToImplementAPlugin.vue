<template>
  <div class="webpack-plugin-guide">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Webpack 插件开发指南</h1>
        <p>掌握插件开发，扩展 Webpack 构建能力</p>
        <div class="hero-stats">
          <div class="stat">
            <div class="number">90%+</div>
            <div class="label">现代构建工具使用插件机制</div>
          </div>
          <div class="stat">
            <div class="number">200+</div>
            <div class="label">官方和社区插件</div>
          </div>
          <div class="stat">
            <div class="number">100%</div>
            <div class="label">可定制性</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="plugin-diagram">
          <div class="webpack-core">Webpack 核心</div>
          <div class="plugin-connector"></div>
          <div class="plugin-box" v-for="(plugin, idx) in plugins" :key="idx" :style="pluginStyle(idx)">
            <div class="plugin-icon">🔌</div>
            <div class="plugin-name">{{ plugin }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="section">
        <h2 class="section-title">
          <span class="icon">🧩</span> Webpack 插件基础
        </h2>
        <div class="columns">
          <div class="column">
            <div class="card">
              <h3>什么是 Webpack 插件？</h3>
              <p>Webpack 插件是具有 <code>apply</code> 方法的 JavaScript 对象。插件可以访问整个 Webpack 编译生命周期，允许开发者在编译过程中执行自定义操作。</p>
              <p>与 loader 不同，插件可以执行更广泛的任务，包括资源优化、包分析、环境变量注入等。</p>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h3>插件 vs Loader</h3>
              <div class="comparison">
                <div class="comparison-item loader">
                  <h4>Loader</h4>
                  <ul>
                    <li>处理单个文件</li>
                    <li>在模块加载时转换文件</li>
                    <li>管道式处理</li>
                    <li>例如: Babel, Sass, file-loader</li>
                  </ul>
                </div>
                <div class="comparison-item plugin">
                  <h4>Plugin</h4>
                  <ul>
                    <li>作用于整个构建过程</li>
                    <li>在编译生命周期中执行操作</li>
                    <li>更广泛的功能</li>
                    <li>例如: HtmlWebpackPlugin, MiniCssExtractPlugin</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">⚙️</span> 插件实现原理
        </h2>

        <div class="lifecycle">
          <div class="phase" v-for="(phase, idx) in lifecyclePhases" :key="idx">
            <div class="phase-header">
              <div class="phase-number">{{ idx + 1 }}</div>
              <h3>{{ phase.name }}</h3>
            </div>
            <div class="phase-description">
              <p>{{ phase.description }}</p>
              <div class="hooks">
                <div class="hook" v-for="(hook, hIdx) in phase.hooks" :key="hIdx">
                  <div class="hook-name">{{ hook }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card principle-card">
          <h3>Tapable 事件系统</h3>
          <p>Webpack 的核心是 <code>Tapable</code> 库，它提供了事件发布/订阅机制。插件通过"tap"（监听）到这些事件钩子上，在特定时刻执行自定义逻辑。</p>
          <pre><code class="language-javascript">compiler.hooks.someHook.tap('MyPlugin', (params) => {
  // 插件逻辑
});</code></pre>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">👨‍💻</span> 创建你的第一个插件
        </h2>

        <div class="steps">
          <div class="step" v-for="(step, idx) in creationSteps" :key="idx">
            <div class="step-number">{{ idx + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="code-example" v-if="step.code">
                <pre><code class="language-javascript">{{ step.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="full-example">
          <h3>完整插件示例</h3>
          <pre><code class="language-javascript">class FileListPlugin {
  constructor(options) {
    this.options = options || {};
    this.filename = this.options.filename || 'filelist.md';
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
      // 创建文件头
      let filelist = '# 文件列表\\n\\n';

      // 遍历所有编译过的资源文件
      for (let filename in compilation.assets) {
        filelist += `- ${filename}\\n`;
      }

      // 将文件列表作为新的资源添加到编译中
      compilation.assets[this.filename] = {
        source: () => filelist,
        size: () => filelist.length
      };

      callback();
    });
  }
}

module.exports = FileListPlugin;</code></pre>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">🚧</span> 插件开发注意事项
        </h2>

        <div class="warnings">
          <div class="warning-card" v-for="(warning, idx) in warnings" :key="idx">
            <div class="warning-icon">⚠️</div>
            <div class="warning-content">
              <h3>{{ warning.title }}</h3>
              <p>{{ warning.description }}</p>
            </div>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <ul>
            <li>使用清晰的插件名称和日志信息</li>
            <li>提供有意义的错误信息和文档</li>
            <li>使用异步钩子时正确处理回调</li>
            <li>避免修改原始编译对象</li>
            <li>合理使用缓存提高性能</li>
            <li>编写单元测试确保插件稳定性</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">🚀</span> 高级插件技巧
        </h2>

        <div class="advanced-techniques">
          <div class="technique">
            <h3>自定义钩子</h3>
            <p>创建自定义钩子让其他插件可以扩展你的插件功能</p>
            <pre><code class="language-javascript">const { SyncHook } = require('tapable');

class MyPlugin {
  constructor() {
    this.hooks = {
      beforeProcess: new SyncHook(['data']),
      afterProcess: new SyncHook(['result'])
    };
  }

  apply(compiler) {
    // 其他插件可以监听这些钩子
  }
}</code></pre>
          </div>

          <div class="technique">
            <h3>跨插件通信</h3>
            <p>通过 compilation 的全局数据共享实现插件间通信</p>
            <pre><code class="language-javascript">// 插件A
compilation.myPluginData = { shared: true };

// 插件B
if (compilation.myPluginData && compilation.myPluginData.shared) {
  // 使用共享数据
}</code></pre>
          </div>

          <div class="technique">
            <h3>自定义模块</h3>
            <p>使用 NormalModuleFactory 创建自定义模块类型</p>
            <pre><code class="language-javascript">compiler.hooks.normalModuleFactory.tap('MyPlugin', factory => {
  factory.hooks.createModule.tap('MyPlugin', data => {
    if (data.resource.includes('.custom')) {
      return new CustomModule(data);
    }
  });
});</code></pre>
          </div>
        </div>
      </div>

      <div class="resources-section">
        <h2 class="section-title">
          <span class="icon">📚</span> 学习资源
        </h2>

        <div class="resources">
          <a href="#" class="resource-card">
            <div class="resource-icon">📖</div>
            <div class="resource-content">
              <h3>Webpack 官方文档</h3>
              <p>Plugin API 完整参考</p>
            </div>
          </a>

          <a href="#" class="resource-card">
            <div class="resource-icon">🔍</div>
            <div class="resource-content">
              <h3>Tapable 文档</h3>
              <p>Webpack 插件系统核心库</p>
            </div>
          </a>

          <a href="#" class="resource-card">
            <div class="resource-icon">💡</div>
            <div class="resource-content">
              <h3>Webpack 源码</h3>
              <p>学习官方插件实现</p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>通过掌握 Webpack 插件开发，你可以创建强大的构建工具扩展，解决项目特定需求</p>
      <div class="footer-links">
        <a href="#">Webpack 文档</a>
        <a href="#">插件示例库</a>
        <a href="#">高级技巧</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 插件名称列表
const plugins = ref([
  'HtmlWebpackPlugin',
  'MiniCssExtractPlugin',
  'CleanWebpackPlugin',
  'BundleAnalyzerPlugin',
  'DefinePlugin',
  'MyCustomPlugin'
]);

// 生命周期阶段
const lifecyclePhases = ref([
  {
    name: '初始化阶段',
    description: '准备环境，应用配置和插件',
    hooks: [
      'initialize',
      'environment',
      'afterEnvironment',
      'entryOption'
    ]
  },
  {
    name: '编译阶段',
    description: '创建编译对象，开始模块解析',
    hooks: [
      'beforeCompile',
      'compile',
      'thisCompilation',
      'compilation',
      'make'
    ]
  },
  {
    name: '优化阶段',
    description: '优化模块和资源',
    hooks: [
      'optimize',
      'optimizeModules',
      'optimizeChunks',
      'optimizeTree'
    ]
  },
  {
    name: '产出阶段',
    description: '生成最终输出文件',
    hooks: [
      'emit',
      'afterEmit',
      'done'
    ]
  }
]);

// 创建步骤
const creationSteps = ref([
  {
    title: '创建插件类',
    description: '定义一个类并包含 apply 方法',
    code: `class MyFirstPlugin {
  apply(compiler) {
    // 插件逻辑
  }
}`
  },
  {
    title: '选择生命周期钩子',
    description: '根据需求选择合适的钩子',
    code: `compiler.hooks.emit.tap('MyPlugin', (compilation) => {
  // 在生成资源到输出目录前执行
});`
  },
  {
    title: '访问编译对象',
    description: '通过 compilation 对象访问模块和资源',
    code: `compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
  compilation.hooks.optimizeChunkAssets.tapAsync(
    'MyPlugin',
    (chunks, callback) => {
      // 处理块资源
      callback();
    }
  );
});`
  },
  {
    title: '修改编译资源',
    description: '添加、修改或删除编译资源',
    code: `compilation.assets['new-file.txt'] = {
  source: () => 'Hello, Webpack Plugin!',
  size: () => 23
};`
  },
  {
    title: '处理异步操作',
    description: '对于异步钩子，确保调用回调函数',
    code: `compiler.hooks.emit.tapAsync(
  'MyAsyncPlugin',
  (compilation, callback) => {
    someAsyncOperation().then(() => {
      // 完成操作
      callback();
    });
  }
);`
  }
]);

// 注意事项
const warnings = ref([
  {
    title: '避免阻塞主线程',
    description: '长时间操作应使用异步钩子或工作线程'
  },
  {
    title: '谨慎修改核心对象',
    description: '直接修改 compiler 或 compilation 可能导致不可预测行为'
  },
  {
    title: '注意执行顺序',
    description: '插件执行顺序很重要，使用 stage 选项控制'
  },
  {
    title: '正确处理错误',
    description: '使用 compilation.errors/warnings 而不是抛出异常'
  },
  {
    title: '考虑缓存',
    description: '利用缓存机制提高后续构建性能'
  },
  {
    title: '保持幂等性',
    description: '多次调用插件应产生相同结果'
  }
]);

// 插件样式计算
const pluginStyle = (index: number) => {
  const colors = [
    'linear-gradient(135deg, #43cea2, #185a9d)',
    'linear-gradient(135deg, #ff7e5f, #feb47b)',
    'linear-gradient(135deg, #654ea3, #da98b4)',
    'linear-gradient(135deg, #3a7bd5, #00d2ff)',
    'linear-gradient(135deg, #ff416c, #ff4b2b)',
    'linear-gradient(135deg, #7f00ff, #e100ff)'
  ];

  const delay = index * 0.1;

  return {
    background: colors[index % colors.length],
    animationDelay: `${delay}s`
  };
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.webpack-plugin-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background: #f8f9fa;
  line-height: 1.6;

  .hero-section {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    background: linear-gradient(135deg, #1a2a6c, #2a5298);
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
          .number {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
          }

          .label {
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
      align-items: center;
      justify-content: center;

      .plugin-diagram {
        position: relative;
        width: 100%;
        height: 300px;

        .webpack-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 1.5rem 3rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.2rem;
          text-align: center;
          backdrop-filter: blur(5px);
          z-index: 10;
        }

        .plugin-connector {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 50%;
        }

        .plugin-box {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          opacity: 0;
          animation: plugin-appear 0.5s forwards;

          .plugin-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          .plugin-name {
            font-size: 0.9rem;
            font-weight: 500;
          }

          @keyframes plugin-appear {
            to {
              opacity: 1;
            }
          }
        }

        // 定位插件位置
        .plugin-box:nth-child(1) {
          top: 10%;
          left: 10%;
        }

        .plugin-box:nth-child(2) {
          top: 10%;
          right: 10%;
        }

        .plugin-box:nth-child(3) {
          top: 50%;
          left: 5%;
          transform: translateY(-50%);
        }

        .plugin-box:nth-child(4) {
          top: 50%;
          right: 5%;
          transform: translateY(-50%);
        }

        .plugin-box:nth-child(5) {
          bottom: 10%;
          left: 10%;
        }

        .plugin-box:nth-child(6) {
          bottom: 10%;
          right: 10%;
        }
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

      .icon {
        font-size: 1.8rem;
      }
    }
  }

  .columns {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .column {
      flex: 1;
      min-width: 300px;
    }
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    height: 100%;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    p {
      color: #4a5568;
    }

    code {
      background: #f1f3f9;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }

    .comparison {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;

      .comparison-item {
        flex: 1;
        padding: 1rem;
        border-radius: 8px;

        h4 {
          margin-top: 0;
          margin-bottom: 1rem;
          text-align: center;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 0.5rem;
          }
        }

        &.loader {
          background: #e3f2fd;
          border: 1px solid #bbdefb;
        }

        &.plugin {
          background: #e8f5e9;
          border: 1px solid #c8e6c9;
        }
      }
    }
  }

  .lifecycle {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .phase {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .phase-header {
        padding: 1.2rem;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;
        display: flex;
        align-items: center;

        .phase-number {
          width: 30px;
          height: 30px;
          background: white;
          color: #3498db;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-right: 1rem;
        }

        h3 {
          margin: 0;
          font-size: 1.2rem;
        }
      }

      .phase-description {
        padding: 1.2rem;

        p {
          color: #4a5568;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .hooks {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .hook {
            background: #f1f3f9;
            padding: 0.4rem 0.8rem;
            border-radius: 4px;
            font-size: 0.85rem;
            font-family: 'Fira Code', monospace;
          }
        }
      }
    }
  }

  .principle-card {
    pre {
      background: #2d2d2d;
      border-radius: 8px;
      padding: 1.2rem;
      overflow-x: auto;
      font-size: 0.95rem;

      code {
        background: none;
        padding: 0;
        color: #f8f8f2;
        font-family: 'Fira Code', monospace;
      }
    }
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .step {
      display: flex;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      .step-number {
        min-width: 60px;
        background: linear-gradient(135deg, #3498db, #8e44ad);
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

        .code-example {
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

  .full-example {
    background: #2d2d2d;
    border-radius: 12px;
    padding: 1.5rem;
    overflow-x: auto;
    margin-top: 2rem;

    h3 {
      color: white;
      margin-top: 0;
    }

    pre {
      margin: 0;

      code {
        font-family: 'Fira Code', monospace;
        color: #f8f8f2;
        font-size: 0.95rem;
        line-height: 1.5;
      }
    }
  }

  .warnings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .warning-card {
      display: flex;
      background: #fff8e1;
      border-left: 4px solid #ffc107;
      border-radius: 0 8px 8px 0;
      padding: 1.2rem;

      .warning-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        color: #ff9800;
      }

      .warning-content {
        h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        p {
          color: #4a5568;
          margin: 0;
        }
      }
    }
  }

  .best-practices {
    background: #e8f5e9;
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid #4caf50;

    h3 {
      margin-top: 0;
      color: #2c3e50;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0;

      li {
        margin-bottom: 0.8rem;
        color: #4a5568;
      }
    }
  }

  .advanced-techniques {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .technique {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      p {
        color: #4a5568;
      }

      pre {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1rem;
        overflow-x: auto;
        font-size: 0.9rem;

        code {
          font-family: 'Fira Code', monospace;
        }
      }
    }
  }

  .resources {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .resource-card {
      display: flex;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      text-decoration: none;
      color: inherit;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .resource-icon {
        font-size: 2rem;
        margin-right: 1rem;
        color: #3498db;
      }

      .resource-content {
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

  .footer {
    text-align: center;
    padding: 2rem;
    color: #7f8c8d;

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 2rem;

      a {
        color: #3498db;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #e74c3c;
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .webpack-plugin-guide {
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

    .section-title {
      font-size: 1.6rem;
    }
  }
}
</style>