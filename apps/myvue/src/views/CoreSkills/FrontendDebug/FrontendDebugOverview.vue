<template>
  <div class="debugging-guide">
    <div class="hero-section">
      <div class="hero-content">
        <h1>前端调试技术基本指南</h1>
        <p>掌握现代前端调试工具与方法，高效解决开发问题</p>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">70%</div>
            <div class="stat-label">开发时间用于调试</div>
          </div>
          <div class="stat">
            <div class="stat-value">90%+</div>
            <div class="stat-label">开发者使用浏览器工具</div>
          </div>
          <div class="stat">
            <div class="stat-value">40%</div>
            <div class="stat-label">效率提升</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="debug-icons">
          <div class="icon" v-for="(icon, idx) in icons" :key="idx" :style="iconStyle(idx)">
            {{ icon }}
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <!-- 浏览器开发者工具 -->
      <div class="section">
        <h2 class="section-title">
          <span class="icon">🔍</span> 浏览器开发者工具
        </h2>
        <div class="technique-cards">
          <div class="card">
            <div class="card-header">
              <div class="card-icon">🛠️</div>
              <h3>Console 控制台</h3>
            </div>
            <div class="card-content">
              <p>调试 JavaScript 代码，查看日志、错误信息和变量值</p>
              <div class="use-case">
                <strong>使用场景：</strong>
                <ul>
                  <li>输出调试信息</li>
                  <li>查看错误堆栈</li>
                  <li>交互式执行代码</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>无需额外工具</li>
                    <li>实时交互</li>
                    <li>支持多种日志级别</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>输出信息过多时难以过滤</li>
                    <li>生产环境可能禁用</li>
                  </ul>
                </div>
              </div>
              <div class="code-example">
                <pre><code>// 基本日志
console.log('用户登录:', user);

// 警告与错误
console.warn('API响应缓慢');
console.error('请求失败', error);

// 分组日志
console.group('用户详情');
console.log('姓名:', name);
console.log('邮箱:', email);
console.groupEnd();</code></pre>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-icon">📝</div>
              <h3>Elements/DOM 检查器</h3>
            </div>
            <div class="card-content">
              <p>检查和实时编辑 HTML 与 CSS</p>
              <div class="use-case">
                <strong>使用场景：</strong>
                <ul>
                  <li>排查布局问题</li>
                  <li>测试 CSS 修改</li>
                  <li>查看元素状态</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>所见即所得</li>
                    <li>实时编辑反馈</li>
                    <li>可视化盒模型</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>修改不会持久化</li>
                    <li>复杂状态难以模拟</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-icon">📊</div>
              <h3>Network 网络分析</h3>
            </div>
            <div class="card-content">
              <p>监控网络请求，分析性能问题</p>
              <div class="use-case">
                <strong>使用场景：</strong>
                <ul>
                  <li>API 请求调试</li>
                  <li>性能优化</li>
                  <li>资源加载问题</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>详细请求信息</li>
                    <li>时间线分析</li>
                    <li>模拟慢速网络</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>HTTPS 请求需配置</li>
                    <li>无法调试 WebSocket 内容</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 源码调试工具 -->
      <div class="section">
        <h2 class="section-title">
          <span class="icon">🔧</span> 源码调试工具
        </h2>
        <div class="technique-cards">
          <div class="card">
            <div class="card-header">
              <div class="card-icon">🐞</div>
              <h3>Source Map 调试</h3>
            </div>
            <div class="card-content">
              <p>在浏览器中直接调试 TypeScript 或压缩后的代码</p>
              <div class="use-case">
                <strong>使用场景：</strong>
                <ul>
                  <li>调试 TypeScript 代码</li>
                  <li>排查压缩后代码问题</li>
                  <li>框架源码调试</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>直接调试原始源码</li>
                    <li>完整的断点功能</li>
                    <li>支持变量监控</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>需要正确配置 Source Map</li>
                    <li>可能暴露源代码结构</li>
                  </ul>
                </div>
              </div>
              <div class="code-example">
                <pre><code>// vite.config.ts
export default defineConfig({
  build: {
    sourcemap: true, // 启用 Source Map
  },
  plugins: [vue()]
})

// webpack.config.js
module.exports = {
  devtool: 'source-map', // 开发环境使用
  // 生产环境使用 'hidden-source-map'
}</code></pre>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-icon">🔌</div>
              <h3>VS Code 调试器</h3>
            </div>
            <div class="card-content">
              <p>在编辑器中直接调试浏览器中运行的代码</p>
              <div class="use-case">
                <strong>使用场景：</strong>
                <ul>
                  <li>复杂逻辑调试</li>
                  <li>无需切换工具</li>
                  <li>团队协作调试</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>熟悉的开发环境</li>
                    <li>强大的断点功能</li>
                    <li>与代码导航集成</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>需要额外配置</li>
                    <li>对某些框架支持有限</li>
                  </ul>
                </div>
              </div>
              <div class="code-example">
                <pre><code>// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Vue: Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 高级调试技术 -->
      <div class="section">
        <h2 class="section-title">
          <span class="icon">🚀</span> 高级调试技术
        </h2>
        <div class="technique-cards">
          <div class="card">
            <div class="card-header">
              <div class="card-icon">📱</div>
              <h3>远程调试</h3>
            </div>
            <div class="card-content">
              <p>在桌面环境中调试移动设备上的页面</p>
              <div class="use-case">
                <strong>使用场景：</strong>
                <ul>
                  <li>移动端兼容性问题</li>
                  <li>真机性能分析</li>
                  <li>设备特定问题排查</li>
                </ul>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>真实设备环境</li>
                    <li>完整开发者工具功能</li>
                    <li>网络模拟</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>需要 USB 连接</li>
                    <li>Android 需特殊配置</li>
                    <li>iOS 需要 macOS</li>
                  </ul>
                </div>
              </div>
              <div class="steps">
                <h4>设置步骤：</h4>
                <ol>
                  <li>启用设备开发者选项和 USB 调试</li>
                  <li>通过 USB 连接设备</li>
                  <li>Chrome 访问 chrome://inspect</li>
                  <li>选择设备上的页面进行调试</li>
                </ol>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-icon">📦</div>
              <h3>调试工具库</h3>
            </div>
            <div class="card-content">
              <p>使用专门的调试库增强调试能力</p>
              <div class="use-case">
                <strong>使用场景：</strong>
                <ul>
                  <li>复杂状态管理调试</li>
                  <li>性能瓶颈分析</li>
                  <li>生产环境调试</li>
                </ul>
              </div>
              <div class="tools">
                <div class="tool">
                  <h4>Vue Devtools</h4>
                  <p>调试 Vue 组件、状态和事件</p>
                </div>
                <div class="tool">
                  <h4>Redux DevTools</h4>
                  <p>时间旅行调试 Redux 状态</p>
                </div>
                <div class="tool">
                  <h4>React Developer Tools</h4>
                  <p>检查 React 组件树和 props</p>
                </div>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>框架特定功能</li>
                    <li>增强可视化</li>
                    <li>时间旅行调试</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>需要安装扩展</li>
                    <li>可能影响性能</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-icon">🔗</div>
              <h3>代理工具调试</h3>
            </div>
            <div class="card-content">
              <p>使用代理工具拦截和修改网络请求</p>
              <div class="use-case">
                <strong>使用场景：</strong>
                <ul>
                  <li>API 模拟与桩模块</li>
                  <li>修改请求/响应内容</li>
                  <li>调试线上问题</li>
                </ul>
              </div>
              <div class="tools">
                <div class="tool">
                  <h4>Charles</h4>
                  <p>功能强大的 HTTP 代理/监控工具</p>
                </div>
                <div class="tool">
                  <h4>Fiddler</h4>
                  <p>Windows 平台的 Web 调试代理</p>
                </div>
                <div class="tool">
                  <h4>Whistle</h4>
                  <p>基于 Node 的跨平台 Web 调试代理</p>
                </div>
              </div>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>强大的请求拦截能力</li>
                    <li>支持 HTTPS</li>
                    <li>跨设备调试</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>需要安装和配置</li>
                    <li>证书信任问题</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 调试工作流程 -->
      <div class="section workflow">
        <h2 class="section-title">
          <span class="icon">🔄</span> 高效调试工作流程
        </h2>

        <div class="workflow-steps">
          <div class="step" v-for="(step, idx) in workflowSteps" :key="idx">
            <div class="step-number">{{ idx + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-tools" v-if="step.tools">
                <span v-for="(tool, tIdx) in step.tools" :key="tIdx">{{ tool }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 调试技巧 -->
      <div class="section tips">
        <h2 class="section-title">
          <span class="icon">💡</span> 专家调试技巧
        </h2>

        <div class="tip-cards">
          <div class="tip-card">
            <div class="tip-icon">1️⃣</div>
            <h3>条件断点</h3>
            <p>设置只在特定条件下触发的断点，避免频繁暂停</p>
            <pre><code>// 仅在特定条件下中断
if (user.id === 42) {
  debugger; // 条件断点
}</code></pre>
          </div>

          <div class="tip-card">
            <div class="tip-icon">2️⃣</div>
            <h3>日志点</h3>
            <p>无需修改代码即可添加日志，不影响执行流程</p>
            <pre><code>// 在调试器中添加日志点
console.log('当前状态:', state);</code></pre>
          </div>

          <div class="tip-card">
            <div class="tip-icon">3️⃣</div>
            <h3>性能分析</h3>
            <p>使用 Performance 面板记录和分析运行时性能</p>
            <pre><code>// 程序化性能测量
console.time('计算耗时');
// 复杂计算...
console.timeEnd('计算耗时');</code></pre>
          </div>

          <div class="tip-card">
            <div class="tip-icon">4️⃣</div>
            <h3>异常捕获</h3>
            <p>在未捕获异常时自动中断，快速定位错误</p>
            <pre><code>// 启用未捕获异常中断
// Chrome: Sources → Pause on exceptions</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>掌握这些调试技术和工具，将极大提升您解决前端问题的效率</p>
      <div class="resources">
        <a href="#">Chrome 开发者文档</a>
        <a href="#">VS Code 调试指南</a>
        <a href="#">移动端调试教程</a>
        <a href="#">调试工具库</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 图标数据
const icons = ref(['🐞', '🔍', '🛠️', '📱', '📝', '📊', '🔧', '🚀']);

// 工作流程步骤
const workflowSteps = ref([
  {
    title: '重现问题',
    description: '确定问题发生的具体条件和步骤',
    tools: ['用户反馈', '错误报告']
  },
  {
    title: '定位问题',
    description: '确定问题发生的组件、模块或网络请求',
    tools: ['控制台日志', '网络面板', '错误堆栈']
  },
  {
    title: '隔离问题',
    description: '创建最小可重现示例，排除无关因素',
    tools: ['CodePen', 'JSFiddle', '独立测试环境']
  },
  {
    title: '诊断原因',
    description: '使用调试工具分析问题根本原因',
    tools: ['断点调试', '状态检查', '性能分析']
  },
  {
    title: '修复验证',
    description: '实施修复并验证问题是否解决',
    tools: ['单元测试', '集成测试', '手动测试']
  },
  {
    title: '预防措施',
    description: '添加测试或监控防止问题再次发生',
    tools: ['单元测试', 'E2E测试', '错误监控']
  }
]);

// 图标样式计算
const iconStyle = (index: number) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B',
    '#FB5607', '#8338EC', '#3A86FF', '#38B000'
  ];

  const animations = [
    'bounce', 'pulse', 'spin', 'float',
    'wave', 'tada', 'jump', 'shake'
  ];

  const sizes = [2, 1.8, 2.2, 1.9, 2.1, 1.7, 2.0, 1.8];

  return {
    color: colors[index % colors.length],
    animation: `${animations[index % animations.length]} 3s infinite`,
    fontSize: `${sizes[index % sizes.length]}rem`,
    animationDelay: `${index * 0.2}s`
  };
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.debugging-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;

  .hero-section {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    background: linear-gradient(135deg, #1a237e, #283593);
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

      .stats {
        display: flex;
        gap: 2rem;
        margin-top: 1.5rem;

        .stat {
          .stat-value {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
          }

          .stat-label {
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

      .debug-icons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;

        .icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #eee;

      .icon {
        font-size: 1.8rem;
      }
    }
  }

  .technique-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;

    .card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .card-header {
        padding: 1.5rem;
        background: linear-gradient(135deg, #3f51b5, #303f9f);
        color: white;
        display: flex;
        align-items: center;
        gap: 1rem;

        .card-icon {
          font-size: 2rem;
        }

        h3 {
          margin: 0;
          font-size: 1.5rem;
        }
      }

      .card-content {
        padding: 1.5rem;

        p {
          color: #4a5568;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .use-case {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;

          strong {
            color: #2c3e50;
          }

          ul {
            padding-left: 1.5rem;
            margin: 0.5rem 0 0;

            li {
              margin-bottom: 0.3rem;
              color: #4a5568;
            }
          }
        }

        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;

          .pros,
          .cons {
            background: white;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

            h4 {
              margin-top: 0;
              margin-bottom: 0.8rem;
              color: #2c3e50;
            }

            ul {
              padding-left: 1.2rem;
              margin: 0;

              li {
                margin-bottom: 0.5rem;
                color: #4a5568;
              }
            }
          }

          .pros {
            border-left: 4px solid #4caf50;
          }

          .cons {
            border-left: 4px solid #f44336;
          }
        }

        .code-example {
          background: #2d2d2d;
          border-radius: 8px;
          padding: 1.2rem;
          margin-top: 1rem;
          overflow-x: auto;

          pre {
            margin: 0;

            code {
              font-family: 'Fira Code', monospace;
              color: #f8f8f2;
              font-size: 0.9rem;
              line-height: 1.5;
            }
          }
        }

        .tools {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;

          .tool {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;

            h4 {
              margin-top: 0;
              margin-bottom: 0.5rem;
              color: #2c3e50;
            }

            p {
              margin: 0;
              font-size: 0.9rem;
              color: #7f8c8d;
            }
          }
        }

        .steps {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;

          h4 {
            margin-top: 0;
            color: #2c3e50;
          }

          ol {
            padding-left: 1.5rem;
            margin: 0.5rem 0 0;

            li {
              margin-bottom: 0.5rem;
              color: #4a5568;
            }
          }
        }
      }
    }
  }

  .workflow {
    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .step {
        display: flex;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .step-number {
          min-width: 60px;
          background: linear-gradient(135deg, #3f51b5, #303f9f);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .step-content {
          padding: 1.5rem;

          h3 {
            margin-top: 0;
            margin-bottom: 0.8rem;
            color: #2c3e50;
          }

          p {
            color: #7f8c8d;
            margin-bottom: 1rem;
          }

          .step-tools {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;

            span {
              background: #e3f2fd;
              color: #1976d2;
              padding: 0.3rem 0.8rem;
              border-radius: 20px;
              font-size: 0.8rem;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  .tips {
    .tip-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .tip-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        text-align: center;

        .tip-icon {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        h3 {
          margin: 0;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        p {
          color: #7f8c8d;
          margin-bottom: 1rem;
        }

        pre {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          text-align: left;
          font-size: 0.85rem;

          code {
            font-family: 'Fira Code', monospace;
          }
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

    .resources {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.5rem;

      a {
        color: #3f51b5;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #303f9f;
          text-decoration: underline;
        }
      }
    }
  }
}

// 动画定义
@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes wave {

  0%,
  100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(10deg);
  }

  75% {
    transform: rotate(-10deg);
  }
}

@keyframes tada {
  0% {
    transform: scale(1);
  }

  10%,
  20% {
    transform: scale(0.9) rotate(-3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(3deg);
  }

  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(-3deg);
  }

  100% {
    transform: scale(1) rotate(0);
  }
}

@keyframes jump {

  0%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20px);
  }

  60% {
    transform: translateY(-10px);
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  20%,
  60% {
    transform: translateX(-10px);
  }

  40%,
  80% {
    transform: translateX(10px);
  }
}

@media (max-width: 768px) {
  .debugging-guide {
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

        .stats {
          flex-wrap: wrap;
          gap: 1rem;
        }
      }

      .hero-visual {
        .debug-icons {
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;

          .icon {
            width: 60px;
            height: 60px;
            font-size: 1.8rem;
          }
        }
      }
    }

    .content-container {
      padding: 1.5rem;
    }

    .section .section-title {
      font-size: 1.6rem;
    }
  }
}
</style>
