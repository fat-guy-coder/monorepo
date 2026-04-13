<template>
  <div class="sandbox-container">
    <header>
      <div class="header-content">
        <h1>前端沙箱技术基本介绍</h1>
        <p>安全执行不受信任代码的核心解决方案</p>
        <div class="header-stats">
          <div class="stat">
            <div class="stat-value">99%</div>
            <div class="stat-label">安全隔离</div>
          </div>
          <div class="stat">
            <div class="stat-value">5+</div>
            <div class="stat-label">主流技术</div>
          </div>
          <div class="stat">
            <div class="stat-value">&lt;10ms</div>
            <div class="stat-label">执行开销</div>
          </div>
        </div>
      </div>
      <div class="header-visual">
        <div class="sandbox-animation">
          <div class="host-app">主应用</div>
          <div class="sandbox">
            <div class="sandbox-label">沙箱环境</div>
            <div class="untrusted-code">不受信任代码</div>
          </div>
          <div class="isolation-barrier"></div>
        </div>
      </div>
    </header>

    <div class="content-grid">
      <!-- 概念介绍 -->
      <section class="concept-section">
        <div class="section-header">
          <h2><i class="icon-concept"></i> 沙箱概念介绍</h2>
          <div class="divider"></div>
        </div>

        <div class="concept-cards">
          <div class="concept-card">
            <div class="concept-icon">
              <i class="icon-security"></i>
            </div>
            <h3>什么是沙箱？</h3>
            <p>沙箱是一种安全机制，用于隔离执行不受信任的代码，防止其对主应用或用户系统造成损害。</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">
              <i class="icon-isolation"></i>
            </div>
            <h3>核心目标</h3>
            <ul>
              <li>防止全局环境污染</li>
              <li>阻止恶意代码执行</li>
              <li>限制资源访问权限</li>
              <li>保护用户隐私数据</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="concept-icon">
              <i class="icon-architecture"></i>
            </div>
            <h3>工作原理</h3>
            <p>沙箱通过创建独立的执行环境，拦截和过滤所有外部访问，只允许安全的操作。</p>
            <div class="workflow">
              <div class="step">1. 创建隔离环境</div>
              <div class="step">2. 加载执行代码</div>
              <div class="step">3. 拦截危险操作</div>
              <div class="step">4. 返回安全结果</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases-section">
        <div class="section-header">
          <h2><i class="icon-scenario"></i> 使用场景</h2>
          <div class="divider"></div>
        </div>

        <div class="use-case-cards">
          <div class="use-case-card">
            <div class="case-icon">
              <i class="icon-plugin"></i>
            </div>
            <h3>插件系统</h3>
            <p>安全执行第三方插件，扩展应用功能</p>
            <div class="case-details">
              <div class="tech-tag">Proxy沙箱</div>
              <div class="tech-tag">快照沙箱</div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-icon">
              <i class="icon-editor"></i>
            </div>
            <h3>在线编辑器</h3>
            <p>执行用户输入的代码片段</p>
            <div class="case-details">
              <div class="tech-tag">Web Worker</div>
              <div class="tech-tag">iframe</div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-icon">
              <i class="icon-microfrontend"></i>
            </div>
            <h3>微前端架构</h3>
            <p>隔离不同团队开发的子应用</p>
            <div class="case-details">
              <div class="tech-tag">Proxy沙箱</div>
              <div class="tech-tag">CSS Scoped</div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-icon">
              <i class="icon-ad"></i>
            </div>
            <h3>广告平台</h3>
            <p>安全执行第三方广告代码</p>
            <div class="case-details">
              <div class="tech-tag">iframe</div>
              <div class="tech-tag">CSP</div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-icon">
              <i class="icon-cms"></i>
            </div>
            <h3>用户生成内容</h3>
            <p>安全展示用户提交的HTML/JS</p>
            <div class="case-details">
              <div class="tech-tag">DOM解析器</div>
              <div class="tech-tag">Sanitizer API</div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-icon">
              <i class="icon-form"></i>
            </div>
            <h3>支付表单</h3>
            <p>隔离处理敏感支付信息</p>
            <div class="case-details">
              <div class="tech-tag">iframe隔离</div>
              <div class="tech-tag">Shadow DOM</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 实现技术 -->
      <section class="tech-section">
        <div class="section-header">
          <h2><i class="icon-tech"></i> 实现技术</h2>
          <div class="divider"></div>
        </div>

        <div class="tech-tabs">
          <div class="tab-header">
            <button v-for="(tech, index) in technologies" :key="index" :class="{ active: activeTech === index }"
              @click="activeTech = index">
              {{ tech.name }}
            </button>
          </div>

          <div class="tab-content">
            <div v-if="activeTech !== null" class="tech-details">
              <h3>{{ technologies[activeTech].name }}</h3>
              <div class="tech-description">
                <p>{{ technologies[activeTech].description }}</p>

                <div class="tech-features">
                  <h4>核心特性</h4>
                  <ul>
                    <li v-for="(feature, idx) in technologies[activeTech].features" :key="idx">
                      {{ feature }}
                    </li>
                  </ul>
                </div>

                <div class="code-example">
                  <h4>实现示例</h4>
                  <pre><code>{{ technologies[activeTech].code }}</code></pre>
                </div>
              </div>

              <div class="tech-pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li v-for="(pro, idx) in technologies[activeTech].pros" :key="'pro-' + idx">
                      <i class="icon-check"></i> {{ pro }}
                    </li>
                  </ul>
                </div>

                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li v-for="(con, idx) in technologies[activeTech].cons" :key="'con-' + idx">
                      <i class="icon-warning"></i> {{ con }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 沙箱选择指南 -->
      <section class="selection-section">
        <div class="section-header">
          <h2><i class="icon-guide"></i> 沙箱选择指南</h2>
          <div class="divider"></div>
        </div>

        <div class="selection-criteria">
          <div class="criterion">
            <div class="criterion-icon">
              <i class="icon-security"></i>
            </div>
            <h3>安全需求</h3>
            <p>高安全场景选择iframe或Web Worker，中低安全场景可用Proxy沙箱</p>
          </div>

          <div class="criterion">
            <div class="criterion-icon">
              <i class="icon-performance"></i>
            </div>
            <h3>性能要求</h3>
            <p>实时应用选择轻量级方案（Proxy），批处理任务可用Web Worker</p>
          </div>

          <div class="criterion">
            <div class="criterion-icon">
              <i class="icon-compatibility"></i>
            </div>
            <h3>兼容性</h3>
            <p>现代浏览器使用Proxy，旧版浏览器使用快照沙箱或iframe</p>
          </div>

          <div class="criterion">
            <div class="criterion-icon">
              <i class="icon-resource"></i>
            </div>
            <h3>资源访问</h3>
            <p>需要DOM访问使用iframe或Proxy，纯计算任务使用Web Worker</p>
          </div>
        </div>

        <div class="tech-comparison">
          <h3>沙箱技术对比</h3>
          <table>
            <thead>
              <tr>
                <th>技术</th>
                <th>隔离级别</th>
                <th>性能</th>
                <th>兼容性</th>
                <th>使用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Proxy沙箱</td>
                <td>高</td>
                <td>中</td>
                <td>现代浏览器</td>
                <td>微前端、插件系统</td>
              </tr>
              <tr>
                <td>快照沙箱</td>
                <td>中</td>
                <td>高</td>
                <td>所有浏览器</td>
                <td>旧版浏览器支持</td>
              </tr>
              <tr>
                <td>iframe</td>
                <td>非常高</td>
                <td>低</td>
                <td>所有浏览器</td>
                <td>广告、第三方内容</td>
              </tr>
              <tr>
                <td>Web Worker</td>
                <td>完全</td>
                <td>高</td>
                <td>现代浏览器</td>
                <td>计算密集型任务</td>
              </tr>
              <tr>
                <td>CSS Scoped</td>
                <td>样式级</td>
                <td>高</td>
                <td>Vue/React</td>
                <td>组件样式隔离</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <footer>
      <div class="footer-content">
        <div class="footer-summary">
          <h3>沙箱技术总结</h3>
          <p>前端沙箱是构建安全Web应用的关键技术，通过隔离执行环境保护主应用和用户数据。选择合适沙箱方案需平衡安全、性能和兼容性需求。</p>
        </div>

        <div class="footer-links">
          <a href="#">安全最佳实践</a>
          <a href="#">沙箱实现示例</a>
          <a href="#">性能优化指南</a>
          <a href="#">案例研究</a>
        </div>
      </div>

      <div class="footer-copyright">
        <p> 前端安全实验室 | 沙箱技术指南 v1.4</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTech = ref<number | null>(0);

const technologies = [
  {
    name: "Proxy沙箱",
    description: "使用ES6 Proxy API拦截和过滤所有属性访问，创建安全的执行环境。",
    features: [
      "基于JavaScript代理机制",
      "运行时拦截所有操作",
      "细粒度访问控制",
      "无需修改全局环境"
    ],
    code: `// 创建Proxy沙箱示例
const sandbox = new Proxy({}, {
  get(target, prop) {
    if (prop === 'document') {
      console.warn('Blocked document access');
      return undefined;
    }
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    if (prop === 'window') {
      return false; // 阻止修改window
    }
    return Reflect.set(target, prop, value);
  }
});

// 在沙箱中执行代码
const executeInSandbox = (code) => {
  return new Function('sandbox', \`with(sandbox){\${code}}\`)(sandbox);
};`,
    pros: [
      "真正的隔离环境",
      "细粒度的权限控制",
      "良好的开发体验",
      "不污染全局环境"
    ],
    cons: [
      "需要ES6 Proxy支持",
      "性能开销相对较高",
      "无法完全隔离原型链访问"
    ]
  },
  {
    name: "快照沙箱",
    description: "通过记录和恢复全局状态实现隔离，适合不支持Proxy的环境。",
    features: [
      "兼容旧版浏览器",
      "激活时记录全局状态",
      "停用时恢复原始状态",
      "运行时无代理开销"
    ],
    code: `class SnapshotSandbox {
  constructor() {
    this.snapshot = {};
    this.modifications = {};
  }

  activate() {
    // 记录全局状态快照
    for (const prop in window) {
      this.snapshot[prop] = window[prop];
    }
    // 应用之前修改
    Object.keys(this.modifications).forEach(prop => {
      window[prop] = this.modifications[prop];
    });
  }

  deactivate() {
    // 记录当前修改
    for (const prop in window) {
      if (window[prop] !== this.snapshot[prop]) {
        this.modifications[prop] = window[prop];
        window[prop] = this.snapshot[prop];
      }
    }
  }
}`,
    pros: [
      "兼容性好（支持IE9+）",
      "运行时性能高",
      "实现相对简单",
      "支持DOM操作"
    ],
    cons: [
      "会污染全局环境",
      "无法并行运行多个沙箱",
      "不支持完全隔离",
      "状态恢复可能不完整"
    ]
  },
  {
    name: "iframe沙箱",
    description: "利用浏览器原生隔离机制，提供最高级别的安全隔离。",
    features: [
      "浏览器原生支持",
      "进程级隔离",
      "DOM和样式完全隔离",
      "通过postMessage通信"
    ],
    code: `<!-- 使用iframe沙箱 -->
<iframe
  sandbox="allow-scripts allow-same-origin"
  src="untrusted.html"
></iframe>

// 主应用与沙箱通信
const iframe = document.getElementById('sandbox');
iframe.contentWindow.postMessage({ action: 'run' }, '*');

// 沙箱内接收消息
window.addEventListener('message', (event) => {
  if (event.source === parent) {
    // 执行安全代码
  }
});`,
    pros: [
      "最高级别的安全隔离",
      "完全独立的执行环境",
      "支持多源内容加载",
      "浏览器内置安全机制"
    ],
    cons: [
      "通信机制复杂",
      "性能开销较大",
      "UI集成困难",
      "资源加载限制"
    ]
  },
  {
    name: "Web Worker",
    description: "在独立线程中执行代码，提供真正的运行环境隔离。",
    features: [
      "真正的多线程隔离",
      "无法访问DOM",
      "通过消息传递通信",
      "适合计算密集型任务"
    ],
    code: `// 主线程创建Worker
const worker = new Worker('sandbox-worker.js');

// 向Worker发送任务
worker.postMessage({
  code: 'function fib(n) { return n <= 1 ? n : fib(n-1)+fib(n-2); } return fib(10);'
});

// 接收Worker结果
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// sandbox-worker.js
self.onmessage = (e) => {
  try {
    const result = new Function(e.data.code)();
    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error });
  }
};`,
    pros: [
      "真正的运行环境隔离",
      "不阻塞主线程",
      "高性能计算支持",
      "无法访问DOM/全局对象"
    ],
    cons: [
      "无法访问DOM",
      "通信需要序列化",
      "不支持所有Web API",
      "启动开销较大"
    ]
  },
  {
    name: "CSS Scoped",
    description: "Vue/React等框架提供的组件级样式隔离解决方案。",
    features: [
      "组件级样式隔离",
      "自动添加唯一属性选择器",
      "支持深度选择器",
      "框架内置支持"
    ],
    code: `<!-- Vue单文件组件示例 -->
\<template\>
  <div class="component">...</div>
\</template\>

<script setup>
// 组件逻辑
\</script\>

<style scoped>
/* 只作用于当前组件 */
.component {
  padding: 1rem;
}
</style>

/* 编译后的CSS */
.component[data-v-f3f3eg9] {
padding: 1rem;
}`,
    pros: [
      "简单易用",
      "零配置启用",
      "良好的开发体验",
      "性能开销小"
    ],
    cons: [
      "仅样式隔离",
      "不是完全隔离（全局样式仍可影响）",
      "深度选择器可能破坏封装",
      "仅限于框架组件"
    ]
  }
];
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@success-color: #2a9d8f;
@warning-color: #f8961e;
@error-color: #e63946;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@code-bg: #f1f3f5;

// 混合
.box-shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.border-radius {
  border-radius: 10px;
}

.transition {
  transition: all 0.3s ease;
}

// 基础样式
.sandbox-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @light-bg;
  color: @text-dark;
  line-height: 1.6;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;
    padding: 30px;
    background: linear-gradient(135deg, #f0f4ff, #e6f7ff);
    .border-radius();
    .box-shadow();

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .header-content {
      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 10px;
      }

      p {
        font-size: 1.2rem;
        color: @text-light;
        margin-bottom: 30px;
      }

      .header-stats {
        display: flex;
        gap: 20px;

        .stat {
          text-align: center;
          padding: 15px;
          background: rgba(255, 255, 255, 0.7);
          .border-radius();
          .box-shadow();

          .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: @primary-color;
          }

          .stat-label {
            font-size: 0.9rem;
            color: @text-light;
          }
        }
      }
    }

    .header-visual {
      display: flex;
      align-items: center;
      justify-content: center;

      .sandbox-animation {
        width: 100%;
        max-width: 400px;
        height: 300px;
        position: relative;
        display: flex;
        flex-direction: column;
        border: 2px solid @border-color;
        .border-radius();
        overflow: hidden;

        .host-app {
          flex: 1;
          padding: 20px;
          background: lighten(@primary-color, 45%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: @primary-color;
        }

        .sandbox {
          flex: 1;
          padding: 20px;
          background: lighten(@success-color, 50%);
          position: relative;

          .sandbox-label {
            position: absolute;
            top: 10px;
            left: 10px;
            font-weight: 600;
            color: @success-color;
          }

          .untrusted-code {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 15px;
            background: lighten(@warning-color, 35%);
            border: 1px solid @warning-color;
            .border-radius();
          }
        }

        .isolation-barrier {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 4px;
          background: repeating-linear-gradient(45deg,
              @primary-color,
              @primary-color 10px,
              lighten(@primary-color, 30%) 10px,
              lighten(@primary-color, 30%) 20px);
          transform: translateX(-50%);
          z-index: 10;
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .section-header {
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: @text-dark;
      display: flex;
      align-items: center;

      i {
        margin-right: 12px;
        font-size: 1.8rem;
        color: @primary-color;
      }
    }

    .divider {
      flex-grow: 1;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, transparent);
      margin-left: 20px;
    }
  }

  // 概念部分
  .concept-section {
    .concept-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;

      .concept-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px;
        border-top: 4px solid @primary-color;
        .transition();

        &:hover {
          transform: translateY(-5px);
        }

        .concept-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: lighten(@primary-color, 40%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;

          i {
            font-size: 1.8rem;
            color: @primary-color;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
        }

        p {
          color: @text-light;
          margin-bottom: 15px;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 8px;
            position: relative;
            padding-left: 25px;

            &:before {
              content: '';
              position: absolute;
              left: 0;
              top: 8px;
              width: 12px;
              height: 12px;
              background: @primary-color;
              border-radius: 50%;
            }
          }
        }

        .workflow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 15px;

          .step {
            background: lighten(@success-color, 45%);
            color: darken(@success-color, 20%);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
          }
        }
      }
    }
  }

  // 使用场景部分
  .use-cases-section {
    .use-case-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;

      .use-case-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px;
        border-top: 4px solid @primary-color;
        .transition();
        height: 100%;

        &:hover {
          transform: translateY(-5px);
        }

        .case-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: lighten(@primary-color, 40%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;

          i {
            font-size: 1.8rem;
            color: @primary-color;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }

        p {
          color: @text-light;
          margin-bottom: 15px;
          min-height: 60px;
        }

        .case-details {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 15px;

          .tech-tag {
            background: lighten(@success-color, 40%);
            color: darken(@success-color, 20%);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
          }
        }
      }
    }
  }

  // 技术部分
  .tech-section {
    .tech-tabs {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      overflow: hidden;

      .tab-header {
        display: flex;
        flex-wrap: wrap;
        background: @primary-color;

        button {
          padding: 15px 25px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          .transition();

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          &.active {
            background: white;
            color: @primary-color;
            font-weight: 600;
          }
        }
      }

      .tab-content {
        padding: 30px;

        .tech-details {
          h3 {
            font-size: 1.8rem;
            margin-bottom: 20px;
            color: @primary-color;
          }

          .tech-description {
            margin-bottom: 25px;

            p {
              font-size: 1.1rem;
              line-height: 1.7;
              margin-bottom: 20px;
            }

            .tech-features {
              background: lighten(@primary-color, 45%);
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 25px;

              h4 {
                font-size: 1.2rem;
                margin-bottom: 15px;
                color: @secondary-color;
              }

              ul {
                padding-left: 20px;

                li {
                  margin-bottom: 10px;
                  position: relative;
                  padding-left: 25px;

                  &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 8px;
                    width: 12px;
                    height: 12px;
                    background: @primary-color;
                    border-radius: 50%;
                  }
                }
              }
            }

            .code-example {
              h4 {
                font-size: 1.2rem;
                margin-bottom: 15px;
                color: @secondary-color;
              }

              pre {
                background: @code-bg;
                padding: 20px;
                border-radius: 8px;
                overflow-x: auto;
                border-left: 3px solid @primary-color;

                code {
                  font-family: 'Fira Code', monospace;
                  font-size: 0.9rem;
                  line-height: 1.6;
                }
              }
            }
          }

          .tech-pros-cons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;

            @media (max-width: 768px) {
              grid-template-columns: 1fr;
            }

            .pros,
            .cons {
              padding: 20px;
              border-radius: 8px;
            }

            .pros {
              background: lighten(@success-color, 50%);
              border: 1px solid fade(@success-color, 30%);

              h4 {
                font-size: 1.2rem;
                margin-bottom: 15px;
                color: darken(@success-color, 20%);
              }

              ul li {
                margin-bottom: 10px;
                display: flex;
                align-items: flex-start;

                i {
                  color: @success-color;
                  margin-right: 10px;
                  margin-top: 4px;
                }
              }
            }

            .cons {
              background: lighten(@warning-color, 40%);
              border: 1px solid fade(@warning-color, 30%);

              h4 {
                font-size: 1.2rem;
                margin-bottom: 15px;
                color: darken(@warning-color, 20%);
              }

              ul li {
                margin-bottom: 10px;
                display: flex;
                align-items: flex-start;

                i {
                  color: @warning-color;
                  margin-right: 10px;
                  margin-top: 4px;
                }
              }
            }
          }
        }
      }
    }
  }

  // 选择指南部分
  .selection-section {
    .selection-criteria {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;

      .criterion {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px;
        text-align: center;
        border-top: 4px solid @primary-color;

        .criterion-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: lighten(@primary-color, 40%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;

          i {
            font-size: 1.8rem;
            color: @primary-color;
          }
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        p {
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .tech-comparison {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 25px;
      overflow-x: auto;

      h3 {
        font-size: 1.4rem;
        margin-bottom: 20px;
        color: @primary-color;
      }

      table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid @border-color;
        }

        thead {
          background: @primary-color;
          color: white;

          th {
            font-weight: 600;
          }
        }

        tbody tr:nth-child(even) {
          background: @light-bg;
        }

        tbody tr:hover {
          background: lighten(@primary-color, 45%);
        }
      }
    }
  }

  // 页脚样式
  footer {
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid @border-color;

    .footer-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 30px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .footer-summary {
        h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: @primary-color;
        }

        p {
          color: @text-light;
          line-height: 1.7;
        }
      }

      .footer-links {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        align-items: center;
        justify-content: flex-end;

        @media (max-width: 768px) {
          justify-content: flex-start;
        }

        a {
          padding: 10px 20px;
          background: lighten(@primary-color, 40%);
          color: @primary-color;
          border-radius: 30px;
          font-weight: 500;
          text-decoration: none;
          .transition();

          &:hover {
            background: @primary-color;
            color: white;
          }
        }
      }
    }

    .footer-copyright {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid @border-color;
      color: @text-light;
      font-size: 0.9rem;
    }
  }
}

// 图标字体
@font-face {
  font-family: 'sandbox-icons';
  src: url('data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAf0AAsAAAAADFQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFDGNtYXAAAAFoAAAAVAAAAFQXVtGJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAqAAAAKgzQc2C2hlYWQAAARgAAAANgAAADYD5wOzaGhlYQAABJQAAAAkAAAAJAdCA4dobXR4AAAEvAAAABQAAAAUCAQAAGxvY2EAAATQAAAAEAAAABAB4gGcbWF4cAAABOAAAAAgAAAAIAETAChuYW1lAAAE4AAAAXkAAAF5ChzBxXBvc3QAAAY4AAAAIAAAACAAAwAAAAMD7AGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QMDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkD//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAQAAAAEAAAAAAAAAAAAA') format('woff');
}

[class^="icon-"],
[class*=" icon-"] {
  font-family: 'sandbox-icons' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-concept:before {
  content: "\e900";
}

.icon-scenario:before {
  content: "\e901";
}

.icon-tech:before {
  content: "\e902";
}

.icon-guide:before {
  content: "\e903";
}

.icon-security:before {
  content: "\e904";
}

.icon-isolation:before {
  content: "\e905";
}

.icon-architecture:before {
  content: "\e906";
}

.icon-plugin:before {
  content: "\e907";
}

.icon-editor:before {
  content: "\e908";
}

.icon-microfrontend:before {
  content: "\e909";
}

.icon-ad:before {
  content: "\e90a";
}

.icon-cms:before {
  content: "\e90b";
}

.icon-form:before {
  content: "\e90c";
}

.icon-performance:before {
  content: "\e90d";
}

.icon-compatibility:before {
  content: "\e90e";
}

.icon-resource:before {
  content: "\e90f";
}

.icon-check:before {
  content: "\e910";
}

.icon-warning:before {
  content: "\e911";
}
</style>
