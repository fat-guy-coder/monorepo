<template>
  <div class="sandbox-libraries-container">
    <header>
      <div class="header-content">
        <h1>JavaScript 沙箱库技术</h1>
        <p>安全执行不受信任代码的现代解决方案</p>
        <div class="header-stats">
          <div class="stat">
            <div class="stat-value">99.9%</div>
            <div class="stat-label">安全隔离</div>
          </div>
          <div class="stat">
            <div class="stat-value">30+</div>
            <div class="stat-label">流行沙箱库</div>
          </div>
          <div class="stat">
            <div class="stat-value">5ms</div>
            <div class="stat-label">平均启动时间</div>
          </div>
        </div>
      </div>
      <div class="header-graphic">
        <div class="sandbox-animation">
          <div class="untrusted-code">不受信任代码</div>
          <div class="sandbox-layer">沙箱隔离层</div>
          <div class="host-app">主应用程序</div>
        </div>
      </div>
    </header>

    <div class="content-grid">
      <!-- 概念部分 -->
      <section class="concept-section">
        <div class="section-header">
          <h2><i class="icon-concept"></i> 沙箱库核心概念</h2>
          <div class="divider"></div>
        </div>

        <div class="concept-cards">
          <div class="concept-card">
            <div class="concept-icon">
              <i class="icon-isolation"></i>
            </div>
            <h3>代码隔离</h3>
            <p>创建独立执行环境，防止恶意代码访问主应用或用户系统</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">
              <i class="icon-security"></i>
            </div>
            <h3>安全防护</h3>
            <p>限制对敏感API的访问，如文件系统、网络请求等</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">
              <i class="icon-performance"></i>
            </div>
            <h3>性能优化</h3>
            <p>轻量级执行环境，最小化对主应用性能的影响</p>
          </div>
        </div>

        <div class="sandbox-workflow">
          <h3>沙箱工作流程</h3>
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>初始化沙箱环境</h4>
                <p>创建隔离的JavaScript执行上下文</p>
              </div>
            </div>
            <div class="step-arrow"></div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>加载执行代码</h4>
                <p>在沙箱中运行不受信任的代码</p>
              </div>
            </div>
            <div class="step-arrow"></div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>限制API访问</h4>
                <p>拦截和过滤危险的API调用</p>
              </div>
            </div>
            <div class="step-arrow"></div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>安全返回结果</h4>
                <p>获取处理后的安全输出</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 流行沙箱库介绍 -->
      <section class="libraries-section">
        <div class="section-header">
          <h2><i class="icon-library"></i> 流行沙箱库介绍</h2>
          <div class="divider"></div>
        </div>

        <div class="library-cards">
          <div class="library-card">
            <div class="library-header">
              <div class="library-icon" style="background-color: #3178c6;">
                <i class="icon-typescript"></i>
              </div>
              <h3>VM2</h3>
              <span class="library-version">v3.9.16</span>
            </div>
            <p class="library-description">Node.js的高级沙箱环境，使用代理技术实现强大的隔离</p>

            <div class="library-features">
              <span>异步支持</span>
              <span>时间限制</span>
              <span>资源控制</span>
            </div>

            <div class="library-install">
              <code>npm install vm2</code>
            </div>

            <div class="library-example">
              <pre><code>const { VM } = require('vm2');
const vm = new VM({
  timeout: 1000,
  sandbox: {}
});

vm.run('process.exit()'); // 抛出异常</code></pre>
            </div>
          </div>

          <div class="library-card">
            <div class="library-header">
              <div class="library-icon" style="background-color: #41b883;">
                <i class="icon-vue"></i>
              </div>
              <h3>Sandbox</h3>
              <span class="library-version">v1.0.0</span>
            </div>
            <p class="library-description">浏览器环境的轻量级沙箱，基于Proxy API实现</p>

            <div class="library-features">
              <span>浏览器兼容</span>
              <span>简单API</span>
              <span>低开销</span>
            </div>

            <div class="library-install">
              <code>npm install sandbox</code>
            </div>

            <div class="library-example">
              <pre><code>import { createSandbox } from 'sandbox';

const sandbox = createSandbox({
  globals: { console }
});

sandbox.execute('console.log("Safe!")');</code></pre>
            </div>
          </div>

          <div class="library-card">
            <div class="library-header">
              <div class="library-icon" style="background-color: #764abc;">
                <i class="icon-react"></i>
              </div>
              <h3>Realms-Shim</h3>
              <span class="library-version">v1.2.0</span>
            </div>
            <p class="library-description">ECMAScript提案Realm API的polyfill实现</p>

            <div class="library-features">
              <span>标准提案</span>
              <span>未来兼容</span>
              <span>强隔离</span>
            </div>

            <div class="library-install">
              <code>npm install @realms/shim</code>
            </div>

            <div class="library-example">
              <pre><code>import { Realm } from '@realms/shim';

const realm = new Realm();
const result = realm.evaluate('1 + 1'); // 2</code></pre>
            </div>
          </div>

          <div class="library-card">
            <div class="library-header">
              <div class="library-icon" style="background-color: #f0db4f;">
                <i class="icon-js"></i>
              </div>
              <h3>Secure-Eval</h3>
              <span class="library-version">v0.5.2</span>
            </div>
            <p class="library-description">安全的eval替代方案，支持自定义上下文和限制</p>

            <div class="library-features">
              <span>安全eval</span>
              <span>执行限制</span>
              <span>上下文控制</span>
            </div>

            <div class="library-install">
              <code>npm install secure-eval</code>
            </div>

            <div class="library-example">
              <pre><code>import secureEval from 'secure-eval';

const context = { a: 1, b: 2 };
const result = secureEval('a + b', context); // 3</code></pre>
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
            <div class="use-case-icon">
              <i class="icon-plugin"></i>
            </div>
            <h3>插件系统</h3>
            <p>允许用户扩展应用功能而不危及系统安全</p>
            <div class="case-details">
              <div class="detail">
                <span class="detail-label">推荐库</span>
                <span class="detail-value">VM2, Realms-Shim</span>
              </div>
              <div class="detail">
                <span class="detail-label">关键特性</span>
                <span class="detail-value">API白名单、资源限制</span>
              </div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="use-case-icon">
              <i class="icon-editor"></i>
            </div>
            <h3>在线代码编辑器</h3>
            <p>安全执行用户输入的代码片段</p>
            <div class="case-details">
              <div class="detail">
                <span class="detail-label">推荐库</span>
                <span class="detail-value">Sandbox, Secure-Eval</span>
              </div>
              <div class="detail">
                <span class="detail-label">关键特性</span>
                <span class="detail-value">时间限制、内存限制</span>
              </div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="use-case-icon">
              <i class="icon-cms"></i>
            </div>
            <h3>CMS用户内容</h3>
            <p>安全渲染用户生成的HTML/JS内容</p>
            <div class="case-details">
              <div class="detail">
                <span class="detail-label">推荐库</span>
                <span class="detail-value">Sandbox, DOMPurify+Sandbox</span>
              </div>
              <div class="detail">
                <span class="detail-label">关键特性</span>
                <span class="detail-value">DOM隔离、XSS防护</span>
              </div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="use-case-icon">
              <i class="icon-server"></i>
            </div>
            <h3>服务器函数执行</h3>
            <p>安全执行用户提交的服务器端函数</p>
            <div class="case-details">
              <div class="detail">
                <span class="detail-label">推荐库</span>
                <span class="detail-value">VM2, Isolate</span>
              </div>
              <div class="detail">
                <span class="detail-label">关键特性</span>
                <span class="detail-value">文件系统隔离、进程限制</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 选择指南 -->
      <section class="selection-section">
        <div class="section-header">
          <h2><i class="icon-guide"></i> 沙箱库选择指南</h2>
          <div class="divider"></div>
        </div>

        <div class="selection-table">
          <div class="table-header">
            <div>沙箱库</div>
            <div>运行环境</div>
            <div>隔离级别</div>
            <div>性能开销</div>
            <div>学习曲线</div>
          </div>

          <div class="table-row">
            <div>VM2</div>
            <div>Node.js</div>
            <div>高</div>
            <div>中</div>
            <div>中</div>
          </div>

          <div class="table-row">
            <div>Sandbox</div>
            <div>浏览器</div>
            <div>中</div>
            <div>低</div>
            <div>低</div>
          </div>

          <div class="table-row">
            <div>Realms-Shim</div>
            <div>浏览器/Node</div>
            <div>高</div>
            <div>低</div>
            <div>中</div>
          </div>

          <div class="table-row">
            <div>Secure-Eval</div>
            <div>浏览器/Node</div>
            <div>中</div>
            <div>低</div>
            <div>低</div>
          </div>
        </div>

        <div class="selection-criteria">
          <h3>选择考虑因素</h3>
          <div class="criteria-grid">
            <div class="criterion">
              <div class="criterion-icon">
                <i class="icon-environment"></i>
              </div>
              <h4>运行环境</h4>
              <p>Node.js环境需要更强大的隔离，浏览器环境更关注轻量级</p>
            </div>

            <div class="criterion">
              <div class="criterion-icon">
                <i class="icon-security"></i>
              </div>
              <h4>安全需求</h4>
              <p>高敏感场景需要进程级隔离（如WebAssembly）</p>
            </div>

            <div class="criterion">
              <div class="criterion-icon">
                <i class="icon-performance"></i>
              </div>
              <h4>性能要求</h4>
              <p>实时应用需低开销沙箱，批处理可接受更高开销</p>
            </div>

            <div class="criterion">
              <div class="criterion-icon">
                <i class="icon-api"></i>
              </div>
              <h4>API支持</h4>
              <p>根据需求选择支持特定API（如DOM、网络等）的沙箱</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <div class="footer-content">
        <div class="footer-summary">
          <h3>沙箱库安全实践</h3>
          <p>沙箱库提供强大的代码隔离能力，但安全配置至关重要。遵循最小权限原则，持续审计沙箱配置，结合CSP等安全机制，构建多层防御体系。</p>
        </div>

        <div class="footer-links">
          <a href="#">沙箱安全指南</a>
          <a href="#">性能优化</a>
          <a href="#">最佳实践</a>
          <a href="#">漏洞数据库</a>
        </div>
      </div>

      <div class="footer-copyright">
        <p>© 2023 Web安全实验室 | JavaScript沙箱技术研究 v1.5</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑（空，因为这是一个展示型组件）
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.sandbox-libraries-container {
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

    .header-graphic {
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
        justify-content: center;
        align-items: center;

        .untrusted-code,
        .sandbox-layer,
        .host-app {
          position: absolute;
          width: 90%;
          padding: 25px;
          text-align: center;
          font-weight: 600;
          .border-radius();
          .box-shadow();
          .transition();
        }

        .untrusted-code {
          top: 0;
          background: lighten(@warning-color, 35%);
          border: 2px solid @warning-color;
          color: darken(@warning-color, 20%);
          z-index: 30;
          animation: pulse 3s infinite;
        }

        .sandbox-layer {
          top: 50%;
          transform: translateY(-50%);
          background: lighten(@success-color, 50%);
          border: 2px solid @success-color;
          color: darken(@success-color, 20%);
          z-index: 20;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .host-app {
          bottom: 0;
          background: lighten(@primary-color, 40%);
          border: 2px solid @primary-color;
          color: darken(@primary-color, 20%);
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

  // 概念部分样式
  .concept-section {
    .concept-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 40px;

      .concept-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 30px 25px;
        text-align: center;
        border-top: 4px solid @primary-color;

        .concept-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: lighten(@primary-color, 40%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;

          i {
            font-size: 2rem;
            color: @primary-color;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: @text-dark;
        }

        p {
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .sandbox-workflow {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 30px;
      border: 1px solid @border-color;

      h3 {
        font-size: 1.4rem;
        text-align: center;
        margin-bottom: 30px;
        color: @primary-color;
      }

      .workflow-steps {
        display: flex;
        justify-content: space-between;
        position: relative;

        @media (max-width: 768px) {
          flex-direction: column;
          gap: 30px;
        }

        .step {
          position: relative;
          z-index: 2;
          background: @card-bg;
          .box-shadow();
          .border-radius();
          padding: 20px;
          width: 22%;
          text-align: center;

          @media (max-width: 768px) {
            width: 100%;
          }

          .step-number {
            width: 40px;
            height: 40px;
            background: @primary-color;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.2rem;
            margin: 0 auto 15px;
          }

          h4 {
            font-size: 1.1rem;
            margin-bottom: 8px;
          }

          p {
            color: @text-light;
            font-size: 0.9rem;
          }
        }

        .step-arrow {
          position: absolute;
          top: 50%;
          left: 25%;
          width: 25%;
          height: 2px;
          background: @primary-color;

          &:after {
            content: '';
            position: absolute;
            right: 0;
            top: -5px;
            width: 12px;
            height: 12px;
            border-right: 2px solid @primary-color;
            border-top: 2px solid @primary-color;
            transform: rotate(45deg);
          }

          @media (max-width: 768px) {
            display: none;
          }

          &:nth-child(2) {
            left: 50%;
          }

          &:nth-child(4) {
            left: 75%;
          }
        }
      }
    }
  }

  // 沙箱库部分
  .libraries-section {
    .library-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 25px;

      .library-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px;
        border-top: 4px solid @primary-color;
        .transition();

        &:hover {
          transform: translateY(-5px);
        }

        .library-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          position: relative;

          .library-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;

            i {
              font-size: 1.8rem;
              color: white;
            }
          }

          h3 {
            font-size: 1.4rem;
            margin-right: 10px;
          }

          .library-version {
            background: @light-bg;
            padding: 3px 8px;
            border-radius: 20px;
            font-size: 0.8rem;
            color: @text-light;
          }
        }

        .library-description {
          color: @text-light;
          margin-bottom: 15px;
          min-height: 60px;
        }

        .library-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;

          span {
            background: lighten(@primary-color, 45%);
            color: @primary-color;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
          }
        }

        .library-install {
          background: @code-bg;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          overflow-x: auto;
        }

        .library-example {
          pre {
            background: @code-bg;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.85rem;
            border-left: 3px solid @primary-color;

            code {
              font-family: 'Fira Code', monospace;
              color: @text-dark;
            }
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
      gap: 25px;

      .use-case-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 30px 25px;
        border-top: 4px solid @primary-color;
        .transition();

        &:hover {
          transform: translateY(-5px);
        }

        .use-case-icon {
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
          margin-bottom: 20px;
          min-height: 60px;
        }

        .case-details {
          .detail {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid @border-color;

            &:last-child {
              border-bottom: none;
            }

            .detail-label {
              font-weight: 500;
            }

            .detail-value {
              color: @primary-color;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  // 选择指南部分
  .selection-section {
    .selection-table {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      overflow: hidden;
      margin-bottom: 30px;
      border: 1px solid @border-color;

      .table-header,
      .table-row {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
        padding: 15px 20px;
      }

      .table-header {
        background: @primary-color;
        color: white;
        font-weight: 600;
      }

      .table-row {
        &:nth-child(even) {
          background: @light-bg;
        }

        div {
          padding: 8px 5px;
          display: flex;
          align-items: center;
        }
      }
    }

    .selection-criteria {
      .criteria-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;

        .criterion {
          background: @card-bg;
          .box-shadow();
          .border-radius();
          padding: 25px;
          text-align: center;

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

          h4 {
            font-size: 1.2rem;
            margin-bottom: 10px;
          }

          p {
            color: @text-light;
            font-size: 0.9rem;
          }
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

// 动画
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.03);
  }

  100% {
    transform: scale(1);
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

.icon-isolation:before {
  content: "\e901";
}

.icon-security:before {
  content: "\e902";
}

.icon-performance:before {
  content: "\e903";
}

.icon-library:before {
  content: "\e904";
}

.icon-typescript:before {
  content: "\e905";
}

.icon-vue:before {
  content: "\e906";
}

.icon-react:before {
  content: "\e907";
}

.icon-js:before {
  content: "\e908";
}

.icon-scenario:before {
  content: "\e909";
}

.icon-plugin:before {
  content: "\e90a";
}

.icon-editor:before {
  content: "\e90b";
}

.icon-cms:before {
  content: "\e90c";
}

.icon-server:before {
  content: "\e90d";
}

.icon-guide:before {
  content: "\e90e";
}

.icon-environment:before {
  content: "\e90f";
}

.icon-api:before {
  content: "\e910";
}
</style>
