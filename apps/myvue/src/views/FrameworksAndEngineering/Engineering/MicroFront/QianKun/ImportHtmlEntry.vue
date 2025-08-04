<template>
  <div class="import-html-container">
    <header class="hero-section">
      <div class="hero-content">
        <h1>import-html-entry</h1>
        <p class="subtitle">微前端架构中的 HTML 入口加载解决方案</p>
        <div class="hero-badges">
          <span class="badge">微前端核心</span>
          <span class="badge">HTML Entry</span>
          <span class="badge">模块加载</span>
        </div>
      </div>
      <div class="hero-graphic">
        <div class="graphic-container">
          <div class="html-entry"></div>
          <div class="js-module"></div>
          <div class="css-module"></div>
          <div class="arrow"></div>
          <div class="browser"></div>
        </div>
      </div>
    </header>

    <main class="content-container">
      <section class="card">
        <h2 class="section-title">什么是 import-html-entry？</h2>
        <div class="section-content">
          <p>
            <code>import-html-entry</code> 是一个用于微前端架构的 JavaScript 库，由 qiankun 微前端框架团队开发。
            它提供了一种创新的方式从 HTML 入口加载子应用，解决了微前端中资源加载和隔离的关键问题。
          </p>

          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon html-icon">HTML</div>
              <h3>HTML 入口</h3>
              <p>以 HTML 文件作为应用入口，而非传统的 JS 入口</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon css-icon">CSS</div>
              <h3>样式隔离</h3>
              <p>自动处理 CSS 加载和样式隔离问题</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon js-icon">JS</div>
              <h3>脚本执行</h3>
              <p>控制 JavaScript 的执行时机和上下文</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon sandbox-icon">沙箱</div>
              <h3>沙箱环境</h3>
              <p>为子应用创建独立的执行环境</p>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="section-title">核心作用</h2>
        <div class="section-content">
          <div class="purpose-grid">
            <div class="purpose-item">
              <div class="purpose-number">1</div>
              <div>
                <h3>HTML 解析</h3>
                <p>解析 HTML 内容，提取其中的 script 和 link 标签</p>
              </div>
            </div>
            <div class="purpose-item">
              <div class="purpose-number">2</div>
              <div>
                <h3>资源加载</h3>
                <p>并行加载所有外部资源（JS、CSS）</p>
              </div>
            </div>
            <div class="purpose-item">
              <div class="purpose-number">3</div>
              <div>
                <h3>执行控制</h3>
                <p>控制脚本执行顺序和时机</p>
              </div>
            </div>
            <div class="purpose-item">
              <div class="purpose-number">4</div>
              <div>
                <h3>样式隔离</h3>
                <p>自动处理 CSS 样式隔离问题</p>
              </div>
            </div>
            <div class="purpose-item">
              <div class="purpose-number">5</div>
              <div>
                <h3>生命周期</h3>
                <p>提供应用加载的生命周期管理</p>
              </div>
            </div>
          </div>

          <div class="problem-solution">
            <div class="problem">
              <h4>传统微前端问题</h4>
              <ul>
                <li>需要手动管理资源依赖</li>
                <li>样式冲突难以避免</li>
                <li>脚本执行顺序难以控制</li>
                <li>跨应用通信复杂</li>
              </ul>
            </div>
            <div class="solution">
              <h4>import-html-entry 解决方案</h4>
              <ul>
                <li>HTML 入口自动处理资源</li>
                <li>自动样式隔离机制</li>
                <li>脚本顺序执行控制</li>
                <li>沙箱隔离的运行时环境</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="section-title">基本使用</h2>
        <div class="section-content">
          <div class="usage-steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3>安装依赖</h3>
              <div class="code-block">
                <pre>npm install import-html-entry --save</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <h3>加载 HTML 入口</h3>
              <div class="code-block">
                <pre>import importHTML from 'import-html-entry';

const htmlUrl = 'https://example.com/sub-app.html';

// 加载 HTML 入口
importHTML(htmlUrl).then(res => {
  console.log('HTML 内容:', res.template);

  // 执行脚本
  res.execScripts().then(exports => {
    console.log('子应用导出:', exports);
    // 获取子应用的 mount 和 unmount 方法
    const { mount, unmount } = exports;

    // 挂载子应用
    mount();
  });
});</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <h3>高级配置选项</h3>
              <div class="code-block">
                <pre>importHTML(htmlUrl, {
  // 获取资源的自定义函数
  fetch: customFetchFunction,

  // 是否加载 HTML 中的图片
  getPublicPath: (url) => publicPath,

  // 自定义模板处理函数
  processTemplate: (tpl) => processedTpl
}).then(/* ... */);</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="section-title">核心原理剖析</h2>
        <div class="section-content">
          <div class="workflow-diagram">
            <div class="diagram-step">
              <div class="step-circle">1</div>
              <h3>加载 HTML</h3>
              <p>通过 fetch 获取 HTML 内容</p>
            </div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-step">
              <div class="step-circle">2</div>
              <h3>解析 HTML</h3>
              <p>提取 scripts 和 styles</p>
            </div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-step">
              <div class="step-circle">3</div>
              <h3>获取资源</h3>
              <p>并行加载所有外部资源</p>
            </div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-step">
              <div class="step-circle">4</div>
              <h3>处理样式</h3>
              <p>创建 style 标签并隔离</p>
            </div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-step">
              <div class="step-circle">5</div>
              <h3>执行脚本</h3>
              <p>在沙箱中按顺序执行 JS</p>
            </div>
          </div>

          <div class="technical-details">
            <div class="detail-section">
              <h3>1. HTML 解析过程</h3>
              <p>使用正则表达式和 DOM 解析器提取关键元素：</p>
              <div class="code-block">
                <pre>function parseHTML(html, baseURI) {
  // 提取所有 script 标签
  const scripts = [];
  const scriptRegex = /&lt;script.*?&gt;([\s\S]*?)&lt;\/script&gt;/gi;

  // 提取所有 link 标签 (CSS)
  const styles = [];
  const styleRegex = /&lt;link.*?rel="stylesheet".*?&gt;/gi;

  // 处理模板中的资源引用
  const processedHTML = html.replace(/(href|src)="([^"]*)"/gi, (match, p1, p2) => {
    return `${p1}="${new URL(p2, baseURI).href}"`;
  });

  return {
    template: processedHTML,
    scripts,
    styles
  };
}</pre>
              </div>
            </div>

            <div class="detail-section">
              <h3>2. 脚本执行机制</h3>
              <p>关键函数 <code>execScripts</code> 的执行流程：</p>
              <div class="code-block">
                <pre>function execScripts(scripts, proxyWindow) {
  // 创建沙箱环境
  const sandbox = createSandbox(proxyWindow);

  // 按顺序执行脚本
  return scripts.reduce((promiseChain, script) => {
    return promiseChain.then(() => {
      // 在沙箱环境中执行脚本
      return evalScript(script, sandbox);
    });
  }, Promise.resolve());
}

function evalScript(script, sandbox) {
  // 创建自执行函数包装代码
  const code = `;(function(window, self){${script}}).bind(window)`;

  // 在沙箱环境中执行
  return sandbox.evaluate(code);
}</pre>
              </div>
            </div>

            <div class="detail-section">
              <h3>3. 样式隔离技术</h3>
              <p>通过多种策略实现样式隔离：</p>
              <div class="code-block">
                <pre>function processStyles(styles) {
  styles.forEach(style => {
    // 创建 style 元素
    const styleElement = document.createElement('style');
    styleElement.textContent = style;

    // 添加作用域隔离
    const scopedCSS = scoper(style, `[data-app-id="${appId}"]`);
    styleElement.textContent = scopedCSS;

    // 添加到 DOM
    document.head.appendChild(styleElement);

    // 记录样式以便卸载
    mountedElements.push(styleElement);
  });
}

// 卸载时移除样式
function unmount() {
  mountedElements.forEach(element => element.remove());
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="section-title">微前端架构中的应用</h2>
        <div class="section-content">
          <div class="architecture-diagram">
            <div class="main-app">主应用 (Container)</div>
            <div class="app-connector">↘</div>
            <div class="sub-apps">
              <div class="sub-app">
                <div class="app-icon">A</div>
                <div>子应用 A</div>
              </div>
              <div class="sub-app">
                <div class="app-icon">B</div>
                <div>子应用 B</div>
              </div>
              <div class="sub-app">
                <div class="app-icon">C</div>
                <div>子应用 C</div>
              </div>
            </div>
          </div>

          <div class="integration-details">
            <h3>在 qiankun 中的工作流程</h3>
            <ol>
              <li>主应用注册子应用（提供 entry HTML URL）</li>
              <li>路由变化匹配到子应用</li>
              <li>调用 <code>importHTML</code> 加载子应用资源</li>
              <li>创建沙箱环境</li>
              <li>执行子应用脚本，获取生命周期钩子</li>
              <li>调用子应用的 mount 方法</li>
              <li>子应用渲染到指定容器</li>
              <li>路由切换时调用 unmount 清理资源</li>
            </ol>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="section-title">最佳实践与注意事项</h2>
        <div class="section-content">
          <div class="best-practices">
            <div class="practice">
              <h3>✅ 资源路径处理</h3>
              <p>确保子应用使用相对路径或配置正确的 publicPath</p>
            </div>
            <div class="practice">
              <h3>✅ 沙箱隔离</h3>
              <p>为每个子应用创建独立的 JS 沙箱环境</p>
            </div>
            <div class="practice">
              <h3>✅ 样式隔离</h3>
              <p>使用 Shadow DOM 或 CSS 前缀进行样式隔离</p>
            </div>
            <div class="practice">
              <h3>✅ 生命周期管理</h3>
              <p>实现完整的 mount/unmount 生命周期</p>
            </div>
          </div>

          <div class="warnings">
            <div class="warning">
              <h3>⚠️ 避免全局污染</h3>
              <p>子应用应避免修改全局对象和样式</p>
            </div>
            <div class="warning">
              <h3>⚠️ 脚本执行顺序</h3>
              <p>确保按正确顺序执行脚本，特别是依赖库</p>
            </div>
            <div class="warning">
              <h3>⚠️ 资源预加载</h3>
              <p>对于大型应用，考虑资源预加载优化体验</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">import-html-entry</div>
        <div class="footer-links">
          <a href="#">GitHub</a>
          <a href="#">文档</a>
          <a href="#">qiankun 微前端</a>
        </div>
        <div class="footer-copyright">
          © 2023 微前端技术解析 | 基于 qiankun 框架
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 模拟 import-html-entry 加载过程的状态
const loadingProgress = ref(0);
const currentStep = ref(0);
const steps = [
  "加载 HTML 入口",
  "解析资源",
  "加载脚本和样式",
  "创建沙箱环境",
  "执行脚本",
  "应用挂载完成"
];

// 模拟加载过程
const simulateLoading = () => {
  const interval = setInterval(() => {
    if (loadingProgress.value < 100) {
      loadingProgress.value += 10;
      if (loadingProgress.value % 20 === 0) {
        currentStep.value = Math.min(currentStep.value + 1, steps.length - 1);
      }
    } else {
      clearInterval(interval);
    }
  }, 300);
};

onMounted(() => {
  simulateLoading();
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --accent-color: #4895ef;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --success-color: #4cc9f0;
  --warning-color: #f72585;
  --border-radius: 10px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.import-html-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
  line-height: 1.6;
  min-height: 100vh;
  padding-bottom: 40px;
}

.hero-section {
  background: linear-gradient(135deg, #4f6df5 0%, #3a56e6 100%);
  color: white;
  padding: 60px 20px 80px;
  position: relative;
  overflow: hidden;

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    text-align: center;

    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.4rem;
      max-width: 700px;
      margin: 0 auto 25px;
      opacity: 0.9;
      font-weight: 400;
    }
  }

  .hero-badges {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 20px;

    .badge {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 8px 18px;
      border-radius: 50px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }

  .hero-graphic {
    max-width: 1200px;
    margin: 50px auto 0;
    height: 200px;
    position: relative;

    .graphic-container {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .html-entry, .js-module, .css-module, .browser {
        position: absolute;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
      }

      .html-entry {
        width: 150px;
        height: 100px;
        background: linear-gradient(45deg, #ff6b6b, #ff8e53);
        left: 15%;
        top: 20%;
        z-index: 3;
        font-size: 1.5rem;
      }

      .js-module {
        width: 80px;
        height: 80px;
        background: linear-gradient(45deg, #4facfe, #00f2fe);
        left: 30%;
        top: 50%;
        z-index: 2;
        font-size: 1.2rem;
      }

      .css-module {
        width: 80px;
        height: 80px;
        background: linear-gradient(45deg, #42e695, #3bb2b8);
        left: 25%;
        top: 10%;
        z-index: 2;
        font-size: 1.2rem;
      }

      .arrow {
        position: absolute;
        left: 40%;
        width: 120px;
        height: 8px;
        background: white;
        border-radius: 4px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 1;

        &::after {
          content: '';
          position: absolute;
          right: -10px;
          top: -6px;
          border: 10px solid transparent;
          border-left-color: white;
        }
      }

      .browser {
        width: 200px;
        height: 140px;
        background: white;
        left: 60%;
        top: 30%;
        z-index: 4;
        color: var(--dark-color);
        flex-direction: column;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: #e2e8f0;
        }

        &::after {
          content: '子应用加载完成';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.9rem;
          font-weight: 600;
        }
      }
    }
  }
}

.content-container {
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

.card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 30px;
  overflow: hidden;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  background: linear-gradient(90deg, #f0f4f8, #e6edf7);
  padding: 18px 25px;
  margin: 0;
  font-size: 1.5rem;
  color: var(--dark-color);
  border-bottom: 1px solid #e2e8f0;
}

.section-content {
  padding: 25px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.feature-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 25px 20px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: var(--transition);

  &:hover {
    border-color: var(--accent-color);
    transform: translateY(-3px);
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    margin: 0 auto 15px;
    color: white;
  }

  .html-icon { background: linear-gradient(45deg, #ff6b6b, #ff8e53); }
  .css-icon { background: linear-gradient(45deg, #42e695, #3bb2b8); }
  .js-icon { background: linear-gradient(45deg, #4facfe, #00f2fe); }
  .sandbox-icon { background: linear-gradient(45deg, #a166ab, #5073b8); }

  h3 {
    margin: 10px 0 15px;
    color: var(--dark-color);
    font-size: 1.2rem;
  }

  p {
    color: #64748b;
    font-size: 0.95rem;
    margin: 0;
  }
}

.purpose-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.purpose-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 8px;

  .purpose-number {
    width: 36px;
    height: 36px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 8px;
    color: var(--dark-color);
  }

  p {
    color: #64748b;
    font-size: 0.95rem;
    margin: 0;
  }
}

.problem-solution {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 30px;

  .problem, .solution {
    padding: 20px;
    border-radius: 8px;
  }

  .problem {
    background: #fff0f0;
    border-left: 4px solid var(--warning-color);

    h4 {
      color: var(--warning-color);
      margin-bottom: 15px;
    }
  }

  .solution {
    background: #f0f7ff;
    border-left: 4px solid var(--primary-color);

    h4 {
      color: var(--primary-color);
      margin-bottom: 15px;
    }
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
      font-size: 0.95rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.usage-steps {
  margin-top: 20px;
}

.step {
  margin-bottom: 35px;
  padding-bottom: 35px;
  border-bottom: 1px dashed #e2e8f0;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .step-number {
    width: 36px;
    height: 36px;
    background: var(--accent-color);
    color: white;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--dark-color);
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 18px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  margin-top: 15px;
  line-height: 1.5;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.workflow-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 30px 0;
}

.diagram-step {
  text-align: center;
  padding: 20px;
  min-width: 150px;
  background: #f0f7ff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.1);

  .step-circle {
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0 auto 15px;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 8px;
    color: var(--dark-color);
  }

  p {
    font-size: 0.9rem;
    color: #64748b;
    margin: 0;
  }
}

.diagram-arrow {
  font-size: 1.5rem;
  color: var(--accent-color);
  font-weight: bold;
}

.technical-details {
  margin-top: 40px;
}

.detail-section {
  margin-bottom: 35px;

  h3 {
    font-size: 1.2rem;
    color: var(--dark-color);
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2e8f0;
  }

  p {
    margin-bottom: 15px;
    color: #475569;
  }
}

.architecture-diagram {
  text-align: center;
  margin: 30px 0;

  .main-app {
    display: inline-block;
    background: var(--primary-color);
    color: white;
    padding: 15px 30px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
  }

  .app-connector {
    font-size: 1.5rem;
    color: var(--accent-color);
    margin: 15px 0;
  }

  .sub-apps {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
  }

  .sub-app {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 20px;
    min-width: 120px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: var(--transition);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .app-icon {
      width: 60px;
      height: 60px;
      background: #f0f7ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
      margin: 0 auto 15px;
    }
  }
}

.integration-details {
  margin-top: 40px;
  padding: 25px;
  background: #f0f7ff;
  border-radius: 8px;

  h3 {
    text-align: center;
    margin-bottom: 25px;
    color: var(--primary-color);
  }

  ol {
    max-width: 600px;
    margin: 0 auto;
    counter-reset: step-counter;

    li {
      margin-bottom: 20px;
      padding-left: 50px;
      position: relative;
      color: #475569;

      &::before {
        counter-increment: step-counter;
        content: counter(step-counter);
        position: absolute;
        left: 0;
        top: 0;
        width: 36px;
        height: 36px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }
  }
}

.best-practices, .warnings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.practice, .warning {
  padding: 20px;
  border-radius: 8px;
}

.practice {
  background: #f0fdf4;
  border-left: 4px solid #10b981;

  h3 {
    color: #10b981;
    margin-bottom: 10px;

    &::before {
      content: '✓ ';
    }
  }
}

.warning {
  background: #fef2f2;
  border-left: 4px solid #ef4444;

  h3 {
    color: #ef4444;
    margin-bottom: 10px;

    &::before {
      content: '⚠ ';
    }
  }
}

.footer {
  margin-top: 60px;
  padding: 40px 20px 20px;
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 15px;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 20px;

    a {
      color: var(--primary-color);
      text-decoration: none;
      transition: var(--transition);

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 15px 60px;

    .hero-content {
      h1 {
        font-size: 2.5rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }
  }

  .problem-solution {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .workflow-diagram {
    flex-direction: column;

    .diagram-arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }

  .sub-apps {
    flex-direction: column;
    align-items: center;
  }
}
</style>
