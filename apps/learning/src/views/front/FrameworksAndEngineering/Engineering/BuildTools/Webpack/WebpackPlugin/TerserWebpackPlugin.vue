<template>
  <div class="terser-plugin-container">
    <header>
      <h1>Terser Webpack Plugin 基本介绍</h1>
      <p>JavaScript 代码压缩优化利器</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="intro-card">
          <div class="intro-content">
            <h2>什么是 Terser Webpack Plugin？</h2>
            <p>Terser Webpack Plugin 是一个用于在 Webpack 构建过程中压缩和优化 JavaScript 代码的插件。它基于 Terser 库，是 UglifyJS 的现代替代品，支持 ES6+
              语法，并提供了更高效的代码压缩能力。</p>

            <div class="features">
              <div class="feature">
                <div class="feature-icon">⚡</div>
                <div class="feature-text">高效的代码压缩</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <div class="feature-text">支持 ES6+ 语法</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔧</div>
                <div class="feature-text">高度可配置</div>
              </div>
              <div class="feature">
                <div class="feature-icon">📦</div>
                <div class="feature-text">多进程并行压缩</div>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <div class="size-comparison">
              <div class="comparison-bar original-bar">
                <span>原始文件: 512KB</span>
              </div>
              <div class="comparison-bar terser-bar">
                <span>Terser压缩后: 198KB</span>
              </div>
              <div class="stats">压缩率: 61.3%</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs-section">
        <div class="tabs-header">
          <div v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: activeTab === index }"
            @click="activeTab = index">
            {{ tab.title }}
          </div>
        </div>

        <div class="tabs-content">
          <div v-show="activeTab === 0" class="tab-pane">
            <h2>安装与基本使用</h2>
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>安装插件</h3>
                  <pre><code>npm install terser-webpack-plugin --save-dev</code></pre>
                  <p>或使用 yarn/pnpm:</p>
                  <pre><code>yarn add -D terser-webpack-plugin</code></pre>
                  <pre><code>pnpm add -D terser-webpack-plugin</code></pre>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>在 Webpack 配置中引入</h3>
                  <pre><code>// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};</code></pre>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>基本配置示例</h3>
                  <pre><code>// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,         // 启用多进程并行压缩
        extractComments: false, // 不提取注释到单独文件
        terserOptions: {
          compress: {
            drop_console: true, // 移除 console 语句
          },
        },
      }),
    ],
  },
};</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 1" class="tab-pane">
            <h2>配置项基本介绍</h2>
            <div class="config-table">
              <table>
                <thead>
                  <tr>
                    <th>配置项</th>
                    <th>类型</th>
                    <th>默认值</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>test</td>
                    <td>RegExp | string | Array</td>
                    <td>/\.m?js(\?.*)?$/i</td>
                    <td>匹配需要压缩的文件</td>
                  </tr>
                  <tr>
                    <td>include</td>
                    <td>RegExp | string | Array</td>
                    <td>undefined</td>
                    <td>指定需要压缩的文件</td>
                  </tr>
                  <tr>
                    <td>exclude</td>
                    <td>RegExp | string | Array</td>
                    <td>undefined</td>
                    <td>排除不需要压缩的文件</td>
                  </tr>
                  <tr>
                    <td>parallel</td>
                    <td>boolean | number</td>
                    <td>true</td>
                    <td>启用多进程并行压缩，可指定进程数</td>
                  </tr>
                  <tr>
                    <td>minify</td>
                    <td>function</td>
                    <td>TerserPlugin.terserMinify</td>
                    <td>自定义压缩函数</td>
                  </tr>
                  <tr>
                    <td>terserOptions</td>
                    <td>object</td>
                    <td>{}</td>
                    <td>Terser 压缩选项（详见下方）</td>
                  </tr>
                  <tr>
                    <td>extractComments</td>
                    <td>boolean | string | RegExp | function</td>
                    <td>true</td>
                    <td>是否提取注释到单独文件</td>
                  </tr>
                </tbody>
              </table>

              <h3>TerserOptions 配置</h3>
              <table>
                <thead>
                  <tr>
                    <th>配置项</th>
                    <th>类型</th>
                    <th>默认值</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ecma</td>
                    <td>number</td>
                    <td>undefined</td>
                    <td>指定 ECMAScript 版本 (5, 2015, 2016 等)</td>
                  </tr>
                  <tr>
                    <td>parse</td>
                    <td>object</td>
                    <td>{}</td>
                    <td>解析器选项</td>
                  </tr>
                  <tr>
                    <td>compress</td>
                    <td>boolean | object</td>
                    <td>{}</td>
                    <td>压缩选项（详见下方）</td>
                  </tr>
                  <tr>
                    <td>mangle</td>
                    <td>boolean | object</td>
                    <td>true</td>
                    <td>混淆选项（变量名缩短）</td>
                  </tr>
                  <tr>
                    <td>module</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>是否处理 ES6 模块</td>
                  </tr>
                  <tr>
                    <td>output</td>
                    <td>object</td>
                    <td>{}</td>
                    <td>输出格式选项</td>
                  </tr>
                  <tr>
                    <td>format</td>
                    <td>object</td>
                    <td>{}</td>
                    <td>输出格式选项（同 output）</td>
                  </tr>
                  <tr>
                    <td>toplevel</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>是否混淆顶级作用域变量</td>
                  </tr>
                </tbody>
              </table>

              <h3>Compress 配置选项</h3>
              <table>
                <thead>
                  <tr>
                    <th>配置项</th>
                    <th>类型</th>
                    <th>默认值</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>drop_console</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>移除所有 console.* 调用</td>
                  </tr>
                  <tr>
                    <td>drop_debugger</td>
                    <td>boolean</td>
                    <td>true</td>
                    <td>移除 debugger 语句</td>
                  </tr>
                  <tr>
                    <td>pure_funcs</td>
                    <td>Array&lt;string&gt;</td>
                    <td>[]</td>
                    <td>移除指定的函数调用（如 ['console.log']）</td>
                  </tr>
                  <tr>
                    <td>dead_code</td>
                    <td>boolean</td>
                    <td>true</td>
                    <td>移除不可达代码</td>
                  </tr>
                  <tr>
                    <td>unused</td>
                    <td>boolean</td>
                    <td>true</td>
                    <td>移除未使用的变量和函数</td>
                  </tr>
                  <tr>
                    <td>booleans</td>
                    <td>boolean</td>
                    <td>true</td>
                    <td>优化布尔表达式</td>
                  </tr>
                  <tr>
                    <td>loops</td>
                    <td>boolean</td>
                    <td>true</td>
                    <td>优化循环</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-show="activeTab === 2" class="tab-pane">
            <h2>使用场景与示例</h2>
            <div class="scenarios">
              <div class="scenario-card">
                <div class="scenario-icon">🚀</div>
                <div class="scenario-content">
                  <h3>生产环境代码优化</h3>
                  <p>移除调试代码、注释和空白，减少文件大小</p>
                  <pre><code>new TerserPlugin({
  terserOptions: {
    compress: {
      drop_console: true,  // 移除 console
      drop_debugger: true, // 移除 debugger
      pure_funcs: ['console.info'] // 移除 console.info
    },
    format: {
      comments: false, // 移除所有注释
    }
  },
  extractComments: false, // 不提取注释到单独文件
})</code></pre>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">🔒</div>
                <div class="scenario-content">
                  <h3>代码混淆保护</h3>
                  <p>缩短变量名，增加代码逆向难度</p>
                  <pre><code>new TerserPlugin({
  terserOptions: {
    mangle: {
      properties: {
        regex: /^_/, // 混淆以下划线开头的属性
        reserved: ['$super'] // 保留特定名称
      },
      toplevel: true // 混淆顶级作用域变量
    }
  }
})</code></pre>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">🧩</div>
                <div class="scenario-content">
                  <h3>多进程并行压缩</h3>
                  <p>利用多核 CPU 加速构建过程</p>
                  <pre><code>new TerserPlugin({
  parallel: true, // 启用并行压缩
  // 或指定进程数
  // parallel: 4,
})</code></pre>
                </div>
              </div>

              <div class="scenario-card">
                <div class="scenario-icon">⚙️</div>
                <div class="scenario-content">
                  <h3>高级代码优化</h3>
                  <p>应用 Terser 的高级优化选项</p>
                  <pre><code>new TerserPlugin({
  terserOptions: {
    compress: {
      arguments: true,     // 优化参数
      booleans_as_integers: true, // 布尔值作为整数
      hoist_funs: true,    // 函数提升
      join_vars: true,     // 合并变量声明
      reduce_vars: true,   // 减少变量使用
      sequences: true,     // 连续表达式优化
      unused: true,        // 移除未使用代码
    }
  }
})</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 3" class="tab-pane">
            <h2>最佳实践</h2>
            <div class="best-practices">
              <div class="practice-card">
                <div class="practice-header">开发与生产环境配置</div>
                <div class="practice-content">
                  <p>根据环境启用不同的压缩选项：</p>
                  <pre><code>const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  optimization: {
    minimize: isProduction,
    minimizer: isProduction ? [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ] : [],
  },
};</code></pre>
                </div>
              </div>

              <div class="practice-card">
                <div class="practice-header">保留许可证注释</div>
                <div class="practice-content">
                  <p>提取并保留许可证注释到单独文件：</p>
                  <pre><code>new TerserPlugin({
  extractComments: {
    condition: /^\**!|@preserve|@license|@cc_on/i,
    filename: (fileData) => {
      return `licenses/${fileData.filename}.LICENSE.txt`;
    },
    banner: (licenseFile) => {
      return `License information can be found in ${licenseFile}`;
    },
  },
})</code></pre>
                </div>
              </div>

              <div class="practice-card">
                <div class="practice-header">性能优化</div>
                <div class="practice-content">
                  <p>合理配置并行处理和缓存：</p>
                  <pre><code>new TerserPlugin({
  parallel: true, // 启用多进程
  cache: true,    // 启用缓存（Webpack 5+）
  // 或自定义缓存目录
  // cache: 'path/to/cache'
})</code></pre>
                </div>
              </div>

              <div class="practice-card">
                <div class="practice-header">排除特定文件</div>
                <div class="practice-content">
                  <p>避免压缩已经压缩过的库文件：</p>
                  <pre><code>new TerserPlugin({
  exclude: /\.min\.js$/, // 排除 .min.js 文件
  // 或指定特定文件
  // exclude: ['vendor.js']
})</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <h2>压缩效果对比</h2>
        <div class="comparison-demo">
          <div class="code-panels">
            <div class="code-panel">
              <div class="panel-header">原始代码</div>
              <pre><code>// 用户信息处理函数
function processUserData(user) {
  // 打印用户信息
  console.log('Processing user:', user.name);

  // 计算年龄
  const age = calculateAge(user.birthDate);

  // 验证用户是否成年
  const isAdult = age >= 18;

  // 返回处理结果
  return {
    id: user.id,
    name: user.name,
    age: age,
    isAdult: isAdult,
    status: isAdult ? 'verified' : 'pending'
  };
}

// 辅助函数：计算年龄
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}</code></pre>
            </div>

            <div class="arrow">⇒</div>

            <div class="code-panel">
              <div class="panel-header">压缩后代码</div>
              <pre><code>function processUserData(e){console.log("Processing user:",e.name);
const t=function(e){const t=new Date,n=new Date(e);
let r=t.getFullYear()-n.getFullYear();
const o=t.getMonth()-n.getMonth();
return(o&#60;0||0===o&&t.getDate()&#60;n.getDate())&&r--,r}(e.birthDate);
return{id:e.id,name:e.name,age:t,isAdult:t>=18,status:t>=18?"verified":"pending"}}</code></pre>
            </div>
          </div>

          <div class="stats-card">
            <div class="stat-item">
              <div class="stat-label">文件大小减少</div>
              <div class="stat-value">68%</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">代码行数减少</div>
              <div class="stat-value">83%</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">变量名缩短</div>
              <div class="stat-value">22/28</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { title: '安装与使用' },
  { title: '配置选项' },
  { title: '使用场景' },
  { title: '最佳实践' }
];
</script>

<style lang="less" scoped>


.terser-plugin-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 100%);
  color: #1e293b;
  line-height: 1.6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 100, 0.05);

  header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(99, 102, 241, 0.2);

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.1rem;
      color: #64748b;
      max-width: 700px;
      margin: 0 auto;
    }
  }
}

.intro-section {
  margin-bottom: 2.5rem;

  .intro-card {
    display: flex;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .intro-content {
      flex: 1.5;
      padding: 2rem;

      h2 {
        font-size: 1.8rem;
        color: #1e293b;
        margin-top: 0;
        margin-bottom: 1.2rem;
      }

      p {
        color: #475569;
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
      }

      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.2rem;

        .feature {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: #f1f5f9;
          border-radius: 8px;
          padding: 0.8rem;
          border: 1px solid #e2e8f0;

          .feature-icon {
            font-size: 1.5rem;
          }

          .feature-text {
            font-weight: 500;
          }
        }
      }
    }

    .intro-image {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: #f8fafc;

      .size-comparison {
        width: 100%;
        max-width: 400px;

        .comparison-bar {
          height: 40px;
          border-radius: 8px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          color: white;
          font-weight: 600;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            z-index: -1;
          }

          &.original-bar {
            background: linear-gradient(90deg, #64748b, #94a3b8);

            &::before {
              width: 100%;
              background: linear-gradient(90deg, #475569, #64748b);
            }
          }

          &.terser-bar {
            background: linear-gradient(90deg, #6366f1, #8b5cf6);

            &::before {
              width: 39%;
              background: linear-gradient(90deg, #4f46e5, #7c3aed);
            }
          }
        }

        .stats {
          text-align: center;
          font-weight: 600;
          color: #1e293b;
          font-size: 1.1rem;
          padding: 0.5rem;
          background: #e0e7ff;
          border-radius: 6px;
        }
      }
    }
  }
}

.tabs-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  .tabs-header {
    display: flex;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;

    .tab-item {
      flex: 1;
      padding: 1.2rem;
      text-align: center;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        background: #f1f5f9;
      }

      &.active {
        color: #6366f1;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #6366f1;
        }
      }
    }
  }

  .tabs-content {
    padding: 2rem;

    h2 {
      font-size: 1.5rem;
      color: #1e293b;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f1f5f9;
    }

    h3 {
      font-size: 1.2rem;
      color: #334155;
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }
  }
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .step {
    display: flex;
    gap: 1.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }

    .step-number {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      background: #e0e7ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #6366f1;
      font-size: 1.2rem;
    }

    .step-content {
      flex: 1;

      h3 {
        margin: 0 0 0.8rem;
        color: #1e293b;
      }

      pre {
        background: #f1f5f9;
        border-radius: 8px;
        padding: 1rem;
        overflow-x: auto;
        margin-bottom: 0.8rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #4338ca;
        }
      }

      p {
        margin: 0.5rem 0;
        color: #64748b;
      }
    }
  }
}

.config-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    min-width: 600px;

    th,
    td {
      padding: 0.8rem 1rem;
      text-align: left;
      border: 1px solid #e2e8f0;
    }

    thead {
      background: #f1f5f9;

      th {
        font-weight: 600;
        color: #1e293b;
      }
    }

    tbody {
      tr:nth-child(even) {
        background: #f8fafc;
      }
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .scenario-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }

    .scenario-icon {
      font-size: 2rem;
      text-align: center;
      padding: 1.2rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }

    .scenario-content {
      padding: 1.5rem;

      h3 {
        margin: 0 0 0.8rem;
        color: #1e293b;
      }

      p {
        margin: 0 0 1rem;
        color: #64748b;
      }

      pre {
        background: #f1f5f9;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        font-size: 0.8rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          color: #4338ca;
        }
      }
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .practice-card {
    background: #f8fafc;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;

    .practice-header {
      background: #e0e7ff;
      padding: 0.8rem 1rem;
      font-weight: 600;
      color: #4338ca;
      font-size: 1.1rem;
      border-bottom: 1px solid #c7d2fe;
    }

    .practice-content {
      padding: 1.2rem;

      p {
        margin: 0 0 0.8rem;
        color: #475569;
      }

      pre {
        background: #f1f5f9;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        margin-bottom: 0.8rem;
        font-size: 0.85rem;

        code {
          font-family: 'JetBrains Mono', monospace;
          color: #4338ca;
        }
      }
    }
  }
}

.comparison-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .comparison-demo {
    .code-panels {
      display: flex;
      gap: 2rem;
      margin-bottom: 1.5rem;

      @media (max-width: 900px) {
        flex-direction: column;
      }

      .code-panel {
        flex: 1;
        background: #f1f5f9;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #e2e8f0;

        .panel-header {
          background: #e0e7ff;
          padding: 0.8rem 1rem;
          font-weight: 600;
          color: #4338ca;
          border-bottom: 1px solid #c7d2fe;
        }

        pre {
          margin: 0;
          padding: 1.2rem;
          overflow-x: auto;
          max-height: 400px;

          code {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            color: #4338ca;
          }
        }
      }

      .arrow {
        display: flex;
        align-items: center;
        font-size: 2rem;
        color: #94a3b8;
        font-weight: 700;

        @media (max-width: 900px) {
          justify-content: center;
          transform: rotate(90deg);
        }
      }
    }

    .stats-card {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;

      .stat-item {
        text-align: center;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

        .stat-label {
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #6366f1;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .terser-plugin-container {
    padding: 1.5rem;
  }

  .intro-card {
    flex-direction: column;
  }

  .tabs-header {
    flex-wrap: wrap;

    .tab-item {
      flex: 1 0 50%;
    }
  }
}
</style>
