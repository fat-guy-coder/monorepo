<template>
  <div class="csp-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1 class="title">内容安全策略 (CSP)</h1>
      <p class="subtitle">构建强大的前端安全防线</p>
    </header>

    <!-- 安全摘要 -->
    <div class="security-summary">
      <div class="security-item">
        <div class="icon">🛡️</div>
        <div class="content">
          <h3>XSS攻击防御率</h3>
          <div class="progress-bar">
            <div class="progress" style="width: 95%"></div>
            <span>95%</span>
          </div>
        </div>
      </div>
      <div class="security-item">
        <div class="icon">🔒</div>
        <div class="content">
          <h3>点击劫持防御率</h3>
          <div class="progress-bar">
            <div class="progress" style="width: 100%"></div>
            <span>100%</span>
          </div>
        </div>
      </div>
      <div class="security-item">
        <div class="icon">🚫</div>
        <div class="content">
          <h3>数据泄露防护</h3>
          <div class="progress-bar">
            <div class="progress" style="width: 85%"></div>
            <span>85%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content-grid">
      <!-- 什么是CSP -->
      <div class="card what-is-csp">
        <div class="card-header">
          <div class="card-icon">❓</div>
          <h2>什么是内容安全策略(CSP)?</h2>
        </div>
        <div class="card-body">
          <p>CSP是一种安全层，通过指定允许加载资源的来源，帮助检测和缓解某些类型的攻击，包括跨站脚本(XSS)和数据注入攻击。</p>

          <div class="analogy">
            <div class="analogy-icon">🏰</div>
            <div class="analogy-content">
              <h3>类比：Web应用的"门禁系统"</h3>
              <p>就像大楼的门禁系统只允许授权人员进入，CSP只允许来自可信来源的资源加载和执行。</p>
            </div>
          </div>

          <div class="key-points">
            <div class="point">
              <div class="point-icon">✅</div>
              <p>限制资源加载来源（脚本、样式、图片等）</p>
            </div>
            <div class="point">
              <div class="point-icon">✅</div>
              <p>阻止内联脚本执行</p>
            </div>
            <div class="point">
              <div class="point-icon">✅</div>
              <p>报告违规行为</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CSP如何工作 -->
      <div class="card csp-workflow">
        <div class="card-header">
          <div class="card-icon">⚙️</div>
          <h2>CSP如何工作？</h2>
        </div>
        <div class="card-body">
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>定义策略</h3>
                <p>通过HTTP头或meta标签定义内容安全策略</p>
                <div class="code-example">
                  <pre><code>Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://trusted.cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src *;
  report-uri /csp-report</code></pre>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>浏览器执行策略</h3>
                <p>浏览器解析策略并只加载允许的资源</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>拦截违规资源</h3>
                <p>阻止加载或执行不符合策略的资源</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>生成违规报告</h3>
                <p>将违规行为发送到指定报告端点</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要配置指令 -->
      <div class="card csp-directives">
        <div class="card-header">
          <div class="card-icon">🔧</div>
          <h2>CSP主要配置指令</h2>
        </div>
        <div class="card-body">
          <div class="directive-tabs">
            <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id">
              {{ tab.label }}
            </button>
          </div>

          <div class="directive-content">
            <div v-if="activeTab === 'fetch'" class="directive-group">
              <div class="directive-item">
                <h3>default-src</h3>
                <p>其他资源类型的默认策略</p>
                <div class="values">
                  <div class="value">
                    <code>'self'</code>
                    <span>只允许同源资源</span>
                  </div>
                  <div class="value">
                    <code>'none'</code>
                    <span>禁止加载任何资源</span>
                  </div>
                  <div class="value">
                    <code>https:</code>
                    <span>允许所有HTTPS资源</span>
                  </div>
                </div>
              </div>

              <div class="directive-item">
                <h3>script-src</h3>
                <p>控制JavaScript的执行来源</p>
                <div class="values">
                  <div class="value">
                    <code>'unsafe-inline'</code>
                    <span>允许内联脚本（不推荐）</span>
                  </div>
                  <div class="value">
                    <code>'unsafe-eval'</code>
                    <span>允许eval()函数（不推荐）</span>
                  </div>
                  <div class="value">
                    <code>'nonce-{value}'</code>
                    <span>允许特定nonce的内联脚本</span>
                  </div>
                </div>
              </div>

              <div class="directive-item">
                <h3>style-src</h3>
                <p>控制样式表的加载来源</p>
                <div class="values">
                  <div class="value">
                    <code>'self'</code>
                    <span>只允许同源样式</span>
                  </div>
                  <div class="value">
                    <code>'unsafe-inline'</code>
                    <span>允许内联样式</span>
                  </div>
                  <div class="value">
                    <code>'sha256-...'</code>
                    <span>允许特定哈希的内联样式</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'document'" class="directive-group">
              <div class="directive-item">
                <h3>base-uri</h3>
                <p>限制&lt;base&gt;元素的URL</p>
                <div class="code-example">
                  <pre><code>base-uri 'self'; // 只允许同源base URL</code></pre>
                </div>
              </div>

              <div class="directive-item">
                <h3>form-action</h3>
                <p>限制表单可以提交的URL</p>
                <div class="code-example">
                  <pre><code>form-action 'self' https://api.example.com;</code></pre>
                </div>
              </div>

              <div class="directive-item">
                <h3>frame-ancestors</h3>
                <p>限制页面是否可以被嵌入（frame, iframe等）</p>
                <div class="values">
                  <div class="value">
                    <code>'none'</code>
                    <span>禁止任何嵌入</span>
                  </div>
                  <div class="value">
                    <code>'self'</code>
                    <span>只允许同源页面嵌入</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'reporting'" class="directive-group">
              <div class="directive-item">
                <h3>report-uri</h3>
                <p>指定违规报告发送的URL（CSP2）</p>
                <div class="code-example">
                  <pre><code>report-uri /csp-violation-report-endpoint;</code></pre>
                </div>
              </div>

              <div class="directive-item">
                <h3>report-to</h3>
                <p>指定违规报告发送的端点（CSP3）</p>
                <div class="code-example">
                  <pre><code>report-to csp-endpoint;</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CSP在网络安全中的作用 -->
      <div class="card csp-security">
        <div class="card-header">
          <div class="card-icon">🛡️</div>
          <h2>CSP在网络安全中的作用</h2>
        </div>
        <div class="card-body">
          <div class="security-grid">
            <div class="security-item">
              <div class="icon red">XSS</div>
              <h3>防御跨站脚本攻击</h3>
              <ul>
                <li>阻止未经授权的外部脚本执行</li>
                <li>限制内联脚本执行</li>
                <li>防止恶意事件处理程序注入</li>
                <li>阻止javascript: URL执行</li>
              </ul>
            </div>

            <div class="security-item">
              <div class="icon blue">🔍</div>
              <h3>防御点击劫持</h3>
              <ul>
                <li>使用frame-ancestors指令</li>
                <li>替代X-Frame-Options头部</li>
                <li>精确控制页面嵌入权限</li>
                <li>支持更灵活的来源控制</li>
              </ul>
            </div>

            <div class="security-item">
              <div class="icon green">📦</div>
              <h3>限制资源加载</h3>
              <ul>
                <li>防止恶意资源加载</li>
                <li>阻止数据泄露到外部域</li>
                <li>控制插件内容执行</li>
                <li>防止混合内容问题</li>
              </ul>
            </div>

            <div class="security-item">
              <div class="icon purple">📝</div>
              <h3>违规报告与分析</h3>
              <ul>
                <li>检测潜在攻击尝试</li>
                <li>监控策略有效性</li>
                <li>识别错误配置</li>
                <li>帮助优化安全策略</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- CSP配置示例 -->
      <div class="card csp-examples">
        <div class="card-header">
          <div class="card-icon">📋</div>
          <h2>CSP配置示例</h2>
        </div>
        <div class="card-body">
          <div class="example-tabs">
            <button v-for="example in examples" :key="example.id" :class="{ active: activeExample === example.id }"
              @click="activeExample = example.id">
              {{ example.label }}
            </button>
          </div>

          <div class="example-content">
            <div v-if="activeExample === 'strict'">
              <h3>严格策略 (推荐)</h3>
              <div class="code-example">
                <pre><code>Content-Security-Policy:
  default-src 'none';
  script-src 'self' 'nonce-{{ randomNonce }}';
  style-src 'self' 'sha256-{{ styleHash }}';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  form-action 'self';
  frame-ancestors 'none';
  base-uri 'self';
  report-uri /csp-report;
  upgrade-insecure-requests;</code></pre>
              </div>
              <div class="features">
                <div class="feature">
                  <div class="icon">✅</div>
                  <p>完全禁止内联脚本</p>
                </div>
                <div class="feature">
                  <div class="icon">✅</div>
                  <p>使用nonce或hash执行必要内联脚本</p>
                </div>
                <div class="feature">
                  <div class="icon">✅</div>
                  <p>禁止框架嵌入</p>
                </div>
              </div>
            </div>

            <div v-if="activeExample === 'vue'">
              <h3>Vue应用策略</h3>
              <div class="code-example">
                <pre><code>Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'nonce-{{ randomNonce }}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  connect-src 'self' https://api.example.com;
  font-src 'self';
  frame-ancestors 'none';
  report-to csp-endpoint;</code></pre>
              </div>
              <div class="notes">
                <h4>Vue应用注意事项：</h4>
                <ul>
                  <li>Vue需要<code>'unsafe-eval'</code>用于运行时模板编译</li>
                  <li>使用Vue CLI构建时可避免<code>'unsafe-eval'</code></li>
                  <li>内联样式需要<code>'unsafe-inline'</code>或使用哈希</li>
                  <li>推荐使用nonce处理内联脚本</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="best-practices">
      <h2>CSP实施最佳实践</h2>
      <div class="practices-grid">
        <div class="practice-item">
          <div class="number">1</div>
          <p>从<code>Content-Security-Policy-Report-Only</code>开始</p>
        </div>
        <div class="practice-item">
          <div class="number">2</div>
          <p>使用<code>default-src 'none'</code>作为起点</p>
        </div>
        <div class="practice-item">
          <div class="number">3</div>
          <p>避免使用<code>'unsafe-inline'</code>和<code>'unsafe-eval'</code></p>
        </div>
        <div class="practice-item">
          <div class="number">4</div>
          <p>为每个页面生成唯一的nonce值</p>
        </div>
        <div class="practice-item">
          <div class="number">5</div>
          <p>实现报告端点并定期分析报告</p>
        </div>
        <div class="practice-item">
          <div class="number">6</div>
          <p>使用<code>frame-ancestors</code>防御点击劫持</p>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2023 Web安全指南 | 内容安全策略是现代化Web应用的基本安全要求</p>
      <p>记住：CSP不是万能的，应作为深度防御策略的一部分</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 配置标签页
const tabs = [
  { id: 'fetch', label: '资源加载指令' },
  { id: 'document', label: '文档指令' },
  { id: 'reporting', label: '报告指令' }
];
const activeTab = ref('fetch');

// 示例标签页
const examples = [
  { id: 'strict', label: '严格策略' },
  { id: 'vue', label: 'Vue应用策略' }
];
const activeExample = ref('strict');

// 生成随机nonce值（模拟）
const randomNonce = 'R8B7k2Jx9FgT3dQw5ZpL4YhN6MvE1cS';
const styleHash = '3dQw5ZpL4YhN6MvE1cSR8B7k2Jx9FgT';
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

:root {
  --primary: #3498db;
  --primary-dark: #2980b9;
  --secondary: #2ecc71;
  --accent: #9b59b6;
  --danger: #e74c3c;
  --warning: #f39c12;
  --dark: #2c3e50;
  --light: #ecf0f1;
  --gray: #95a5a6;
  --light-gray: #bdc3c7;
  --border-radius: 10px;
  --box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.csp-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  color: var(--dark);
  line-height: 1.6;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);


  .title {
    font-size: 2.5rem;
    color: #000;
    margin-bottom: 0.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.4rem;
    color: var(--gray);
    font-weight: 400;
  }
}

.security-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .security-item {
    display: flex;
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 1.5rem;
    align-items: center;

    .icon {
      font-size: 2.5rem;
      margin-right: 1.5rem;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e3f2fd;
      border-radius: 50%;
    }

    .content {
      flex: 1;

      h3 {
        margin-bottom: 0.8rem;
        font-size: 1.2rem;
        color: var(--dark);
      }
    }
  }
}

.progress-bar {
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  .progress {
    height: 100%;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    border-radius: 5px;
  }

  span {
    position: absolute;
    right: 0;
    top: -25px;
    font-weight: bold;
    color: var(--primary);
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  &-header {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: linear-gradient(to right, var(--primary), var(--primary-dark));
    color: white;

    .card-icon {
      font-size: 2rem;
      margin-right: 1rem;
      background: rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      font-size: 1.6rem;
      font-weight: 500;
    }
  }

  &-body {
    padding: 1.5rem;

    p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
  }
}

.what-is-csp {
  .analogy {
    display: flex;
    margin: 1.5rem 0;
    padding: 1rem;
    background: #e3f2fd;
    border-radius: var(--border-radius);

    .analogy-icon {
      font-size: 2.5rem;
      margin-right: 1rem;
    }

    .analogy-content {
      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        color: var(--dark);
      }
    }
  }

  .key-points {
    .point {
      display: flex;
      margin-bottom: 1rem;
      padding: 0.8rem;
      background: #f8f9fa;
      border-radius: 8px;

      .point-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        color: var(--secondary);
      }

      p {
        margin: 0;
        flex: 1;
      }
    }
  }
}

.csp-workflow {
  .workflow-steps {
    .step {
      display: flex;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px dashed #eee;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .step-number {
        width: 32px;
        height: 32px;
        background: var(--primary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 1rem;
        flex-shrink: 0;
      }

      .step-content {
        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--dark);
        }

        p {
          margin-bottom: 0.8rem;
          font-size: 1rem;
        }
      }
    }
  }
}

.csp-directives {
  grid-column: span 2;

  .directive-tabs {
    display: flex;
    border-bottom: 1px solid #eee;
    margin-bottom: 1.5rem;

    button {
      padding: 0.8rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      color: var(--gray);
      position: relative;

      &.active {
        color: var(--primary);

        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--primary);
        }
      }
    }
  }

  .directive-content {
    .directive-group {
      .directive-item {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: var(--primary);
        }

        p {
          margin-bottom: 1rem;
          color: var(--gray);
        }

        .values {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;

          .value {
            background: #f5f7fa;
            padding: 0.8rem;
            border-radius: 6px;
            border-left: 3px solid var(--primary);

            code {
              display: block;
              font-weight: bold;
              margin-bottom: 0.3rem;
              color: var(--dark);
            }

            span {
              font-size: 0.9rem;
              color: var(--gray);
            }
          }
        }
      }
    }
  }
}

.csp-security {
  grid-column: span 2;

  .security-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .security-item {
      background: #f8f9fa;
      border-radius: var(--border-radius);
      padding: 1.5rem;
      transition: var(--transition);
      border-top: 4px solid var(--primary);

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;

        &.red {
          background: #ffebee;
          color: #e53935;
        }

        &.blue {
          background: #e3f2fd;
          color: #1e88e5;
        }

        &.green {
          background: #e8f5e9;
          color: #43a047;
        }

        &.purple {
          background: #f3e5f5;
          color: #8e24aa;
        }
      }

      h3 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        color: var(--dark);
      }

      ul {
        list-style: none;

        li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--primary);
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}

.csp-examples {
  grid-column: span 2;

  .example-tabs {
    display: flex;
    border-bottom: 1px solid #eee;
    margin-bottom: 1.5rem;

    button {
      padding: 0.8rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      color: var(--gray);
      position: relative;

      &.active {
        color: var(--primary);

        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--primary);
        }
      }
    }
  }

  .example-content {
    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: var(--dark);
    }

    .features {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1.5rem;

      .feature {
        display: flex;
        align-items: center;
        background: #e8f5e9;
        padding: 0.5rem 1rem;
        border-radius: 20px;

        .icon {
          margin-right: 0.5rem;
          color: var(--secondary);
        }
      }
    }

    .notes {
      background: #fff8e1;
      border-radius: var(--border-radius);
      padding: 1.5rem;
      margin-top: 1.5rem;

      h4 {
        margin-bottom: 0.8rem;
        color: var(--dark);
      }

      ul {
        list-style: none;

        li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--warning);
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}

.code-example {
  background: #2c3e50;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  line-height: 1.5;

  pre {
    margin: 0;
  }

  code {
    font-family: inherit;
  }
}

.best-practices {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  margin-bottom: 2rem;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    color: var(--dark);
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: var(--primary);
      margin: 0.8rem auto;
      border-radius: 2px;
    }
  }

  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .practice-item {
    background: #f0f7ff;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    display: flex;
    align-items: center;

    .number {
      width: 36px;
      height: 36px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 1rem;
      flex-shrink: 0;
    }

    p {
      margin: 0;
      font-size: 1.1rem;

      code {
        background: #e3f2fd;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-family: monospace;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem 0;
  color: var(--gray);
  font-size: 0.9rem;

  p {
    margin-bottom: 0.3rem;

    &:last-child {
      font-style: italic;
      color: var(--dark);
    }
  }
}

@media (max-width: 900px) {

  .csp-directives,
  .csp-security,
  .csp-examples {
    grid-column: 1;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .header {
    padding: 1.5rem;

    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }

  .security-summary {
    grid-template-columns: 1fr;
  }
}
</style>