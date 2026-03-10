<template>
  <div class="qiankun-principle">
    <header class="header">
      <div class="logo-title">
        <div class="logo">Q</div>
        <h1>乾坤微前端框架原理剖析</h1>
      </div>
      <p class="subtitle">深入解析乾坤微前端的设计思想与实现机制</p>
    </header>

    <div class="content-container">
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>核心原理目录</h2>
        </div>
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.id" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.title }}</span>
          </li>
        </ul>
      </aside>

      <main class="main-content">
        <section v-show="activeSection === 'overview'" class="principle-section">
          <div class="section-header">
            <h2>乾坤架构设计思想</h2>
            <p>乾坤基于single-spa封装，提供了更完善的微前端解决方案</p>
          </div>

          <div class="principle-card">
            <h3>核心设计目标</h3>
            <ul class="principle-list">
              <li>实现应用间的技术栈无关性</li>
              <li>提供完善的沙箱隔离机制</li>
              <li>实现应用的独立开发与部署</li>
              <li>支持应用间平滑通信</li>
              <li>优化应用的加载性能</li>
            </ul>
          </div>

          <div class="architecture-diagram">
            <div class="architecture-row">
              <div class="arch-component main-app">
                <div class="arch-title">主应用</div>
                <div class="arch-content">
                  <div class="arch-item">路由管理</div>
                  <div class="arch-item">应用注册</div>
                  <div class="arch-item">状态管理</div>
                </div>
              </div>
            </div>

            <div class="architecture-connector">乾坤核心</div>

            <div class="architecture-row">
              <div class="arch-component">
                <div class="arch-title">JS沙箱</div>
                <div class="arch-content">
                  <div class="arch-item">Proxy隔离</div>
                  <div class="arch-item">快照机制</div>
                </div>
              </div>
              <div class="arch-component">
                <div class="arch-title">样式隔离</div>
                <div class="arch-content">
                  <div class="arch-item">Shadow DOM</div>
                  <div class="arch-item">CSS Scoped</div>
                </div>
              </div>
              <div class="arch-component">
                <div class="arch-title">资源加载</div>
                <div class="arch-content">
                  <div class="arch-item">HTML Entry</div>
                  <div class="arch-item">预加载</div>
                </div>
              </div>
            </div>

            <div class="architecture-connector">子应用生命周期</div>

            <div class="architecture-row">
              <div class="arch-component sub-app">
                <div class="arch-title">子应用A</div>
                <div class="arch-content">
                  <div class="arch-item">bootstrap</div>
                  <div class="arch-item">mount</div>
                  <div class="arch-item">unmount</div>
                </div>
              </div>
              <div class="arch-component sub-app">
                <div class="arch-title">子应用B</div>
                <div class="arch-content">
                  <div class="arch-item">bootstrap</div>
                  <div class="arch-item">mount</div>
                  <div class="arch-item">unmount</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'sandbox'" class="principle-section">
          <div class="section-header">
            <h2>JS沙箱隔离机制</h2>
            <p>乾坤通过代理和快照技术实现JavaScript执行环境的隔离</p>
          </div>

          <div class="principle-cards">
            <div class="principle-card">
              <h3>1. Proxy沙箱（默认）(简易沙箱)</h3>
              <div class="code-block">
                <pre><code>class qiankunSandbox {
  constructor() {
    const rawWindow = window;
    const fakeWindow = {};

    this.proxy = new Proxy(fakeWindow, {
      set(target, p, value) {
        // 只修改fakeWindow，不影响全局
        target[p] = value;
        return true;
      },
      get(target, p) {
        // 优先使用fakeWindow中的属性
        return target[p] || rawWindow[p];
      }
    });

    // 执行代码，执行代码时，会自动将window替换为proxy, 并将变量用with包裹挂载到全局
    execScripts(code) {
      const fn = new Function(`with(window) {
        ${code}
      }`);
      fn(this.proxy);
    }

  }
}</code></pre>
              </div>
              <ul class="feature-list">
                <li>使用ES6 Proxy代理window对象</li>
                <li>每个子应用拥有独立的fakeWindow</li>
                <li>属性访问优先从fakeWindow获取</li>
                <li>支持多实例同时运行</li>
              </ul>
            </div>

            <div class="principle-card">
              <h3>2. Snapshot沙箱（兼容模式）</h3>
              <div class="code-block">
                <pre><code>class SnapshotSandbox {
  constructor() {
    this.proxy = window;
    this.modifyPropsMap = {};
    this.windowSnapshot = {};
  }

  active() {
    // 保存window快照
    this.windowSnapshot = {};
    for (const prop in window) {
      this.windowSnapshot[prop] = window[prop];
    }
    // 恢复之前的修改
    Object.keys(this.modifyPropsMap).forEach(p => {
      window[p] = this.modifyPropsMap[p];
    });
  }

  inactive() {
    // 记录变更并恢复快照
    for (const prop in window) {
      if (window[prop] !== this.windowSnapshot[prop]) {
        this.modifyPropsMap[prop] = window[prop];
        window[prop] = this.windowSnapshot[prop];
      }
    }
  }
}</code></pre>
              </div>
              <ul class="feature-list">
                <li>兼容不支持Proxy的浏览器</li>
                <li>激活时保存window状态快照</li>
                <li>失活时恢复window状态</li>
                <li>只支持单实例运行</li>
              </ul>
            </div>
          </div>

          <div class="comparison">
            <h3>沙箱机制对比</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>Proxy沙箱</th>
                    <th>Snapshot沙箱</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>兼容性</td>
                    <td>IE不兼容</td>
                    <td>全浏览器兼容</td>
                  </tr>
                  <tr>
                    <td>多实例</td>
                    <td>✅ 支持</td>
                    <td>❌ 不支持</td>
                  </tr>
                  <tr>
                    <td>性能</td>
                    <td>⭐️⭐️⭐️⭐️</td>
                    <td>⭐️⭐️ (大量属性遍历)</td>
                  </tr>
                  <tr>
                    <td>隔离性</td>
                    <td>⭐️⭐️⭐️⭐️⭐️</td>
                    <td>⭐️⭐️⭐️</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'css-isolation'" class="principle-section">
          <div class="section-header">
            <h2>样式隔离机制</h2>
            <p>乾坤提供多种样式隔离方案，防止子应用间样式冲突</p>
          </div>

          <div class="principle-cards">
            <div class="principle-card">
              <h3>1. Shadow DOM隔离</h3>
              <div class="code-block">
                <pre><code>// 创建Shadow DOM容器
const shadowContainer = document.createElement('div');
shadowContainer.attachShadow({ mode: 'open' });

// 将子应用挂载到Shadow DOM中
export function mount(props) {
  render({ container: shadowContainer.shadowRoot });
}</code></pre>
              </div>
              <ul class="feature-list">
                <li>基于Web Components标准</li>
                <li>完全隔离的DOM作用域</li>
                <li>样式自然隔离，无法穿透</li>
                <li>兼容性要求较高</li>
              </ul>
            </div>

            <div class="principle-card">
              <h3>2. Scoped CSS</h3>
              <div class="code-block">
                <pre><code>// 乾坤实现的样式作用域化
function scopedCSS(styleElement, appName) {
  // 为所有CSS规则添加前缀选择器
  const prefix = `qiankun-app-${appName}`;
  const rules = styleElement.sheet.cssRules;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    styleElement.sheet.deleteRule(i);
    styleElement.sheet.insertRule(
      `${prefix} ${rule.selectorText} { ${rule.style.cssText} }`,
      i
    );
  }
}</code></pre>
              </div>
              <ul class="feature-list">
                <li>运行时动态重写CSS规则</li>
                <li>为所有选择器添加应用前缀</li>
                <li>支持所有浏览器</li>
                <li>不隔离原生DOM API操作</li>
              </ul>
            </div>
          </div>

          <div class="isolation-diagram">
            <div class="isolation-card">
              <div class="isolation-title">样式隔离前</div>
              <div class="style-example">
                <div class="css-rule">.container { background: #f0f0f0; }</div>
                <div class="css-rule">.button { color: blue; }</div>
                <div class="conflict-warning">潜在冲突区域</div>
              </div>
            </div>

            <div class="isolation-arrow">⇒</div>

            <div class="isolation-card isolation-shadow">
              <div class="isolation-title">Shadow DOM隔离</div>
              <div class="style-example">
                <div class="shadow-root">
                  #shadow-root (open)
                  <div class="css-rule">.container { background: #f0f0f0; }</div>
                  <div class="css-rule">.button { color: blue; }</div>
                </div>
                <div class="no-conflict">无冲突</div>
              </div>
            </div>

            <div class="isolation-arrow">⇒</div>

            <div class="isolation-card isolation-scoped">
              <div class="isolation-title">Scoped CSS隔离</div>
              <div class="style-example">
                <div class="css-rule">.appA .container { background: #f0f0f0; }</div>
                <div class="css-rule">.appA .button { color: blue; }</div>
                <div class="no-conflict">作用域隔离</div>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'html-entry'" class="principle-section">
          <div class="section-header">
            <h2>HTML Entry机制</h2>
            <p>乾坤通过解析HTML入口文件加载子应用资源</p>
            <p>通过import-html-entry实现</p>
          </div>

          <div class="process-flow">
            <div class="process-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>获取HTML入口文件</h3>
                <p>根据子应用配置的entry URL获取HTML内容</p>
                <div class="code-block">
                  <pre><code>fetch('//child-app.com/entry.html')
  .then(response => response.text())</code></pre>
                </div>
              </div>
            </div>

            <div class="process-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>解析HTML资源</h3>
                <p>提取所有script/link标签，过滤主应用已有资源</p>
                <div class="code-block">
                  <pre><code>const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');

// 提取所有脚本和样式
const scripts = doc.scripts;
const links = doc.querySelectorAll('link[rel="stylesheet"]');</code></pre>
                </div>
              </div>
            </div>

            <div class="process-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>动态加载执行js资源</h3>
                <p>按顺序加载并执行所有js资源文件</p>
                <div class="code-block">
                  <pre><code>function loadScript(url) {
  return new Promise((resolve, reject) => {
    //拿到js内容
    fetch(url)
      .then(response =>resolve(response.text()))
      .catch(reject)
  });
  scripts.forEach(script => {
    loadScript(script.src).then(text => {
      qiankunSandbox.execScripts(text);
    });
  });
}</code></pre>
                </div>
              </div>
            </div>

            <div class="process-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>动态加载执行css资源</h3>
                <p>按顺序加载并执行所有css资源文件</p>
                <div class="code-block">
                  <pre><code>function loadCSS(url) {
return new Promise((resolve, reject) => {
//拿到css内容
fetch(url)
.then(response =>resolve(response.text()))
.catch(reject)
});
}
links.forEach(link => {
loadCSS(link.href).then(text => {
  scopedCSS(text, appName)//改写css选择器，添加前缀
});
});
//或者 创建Shadow DOM容器
const shadowContainer = document.createElement('div');
shadowContainer.attachShadow({ mode: 'open' });
// 将子应用挂载到Shadow DOM中
render({ container: shadowContainer.shadowRoot });
</code></pre>
                </div>
              </div>
            </div>

            <div class="process-step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>执行子应用入口</h3>
                <p>调用子应用导出的生命周期钩子函数</p>
                <div class="code-block">
                  <pre><code>// 从全局获取子应用导出
const appExports = window[appName];

// 执行bootstrap和mount
appExports.bootstrap().then(() => {
  appExports.mount({ container });
});</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="entry-diagram">
            <div class="entry-card">
              <h3>HTML Entry示例</h3>
              <div class="html-code">
                <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id="root"&gt;&lt;/div&gt;
  &lt;script src="runtime.js"&gt;&lt;/script&gt;
  &lt;script src="vendors.js"&gt;&lt;/script&gt;
  &lt;script src="main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
              </div>
            </div>
            <div class="parsed-resources">
              <h3>乾坤解析结果</h3>
              <div class="resource-list">
                <div class="resource-item css">styles.css</div>
                <div class="resource-item js">runtime.js</div>
                <div class="resource-item js">vendors.js</div>
                <div class="resource-item js">main.js</div>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'lifecycle'" class="principle-section">
          <div class="section-header">
            <h2>应用生命周期管理</h2>
            <p>乾坤通过标准化生命周期钩子管理子应用状态</p>
          </div>

          <div class="lifecycle-flow">
            <div class="lifecycle-stage">
              <div class="stage-header">注册阶段</div>
              <div class="stage-card">
                <h3>registerMicroApps</h3>
                <p>主应用注册子应用配置信息</p>
                <div class="code-tiny">
                  <pre><code>registerMicroApps([
  {
    name: 'app1',
    entry: '//app1.com',
    container: '#container',
    activeRule: '/app1',
    loader: loading => showLoading(loading)
  }
]);</code></pre>
                </div>
              </div>
            </div>

            <div class="lifecycle-stage">
              <div class="stage-header">初始化阶段</div>
              <div class="stage-card">
                <h3>bootstrap</h3>
                <p>子应用初次加载时执行</p>
                <div class="code-tiny">
                  <pre><code>export async function bootstrap() {
  // 初始化全局变量
  // 执行一次性的初始化逻辑
}</code></pre>
                </div>
              </div>
            </div>

            <div class="lifecycle-stage">
              <div class="stage-header">挂载阶段</div>
              <div class="stage-card">
                <h3>mount</h3>
                <p>子应用挂载到容器时执行</p>
                <div class="code-tiny">
                  <pre><code>export async function mount(props) {
  // 渲染应用
  ReactDOM.render(&lt;App /&gt;,
    props.container || document.getElementById('root'));
}</code></pre>
                </div>
              </div>
            </div>

            <div class="lifecycle-stage">
              <div class="stage-header">更新阶段</div>
              <div class="stage-card">
                <h3>update (可选)</h3>
                <p>应用状态更新时执行</p>
                <div class="code-tiny">
                  <pre><code>export async function update(props) {
  // 响应全局状态更新
  // 重新渲染部分组件
}</code></pre>
                </div>
              </div>
            </div>

            <div class="lifecycle-stage">
              <div class="stage-header">卸载阶段</div>
              <div class="stage-card">
                <h3>unmount</h3>
                <p>子应用从容器移除时执行</p>
                <div class="code-tiny">
                  <pre><code>export async function unmount(props) {
  // 清理定时器
  // 取消事件监听
  // 销毁应用实例
  ReactDOM.unmountComponentAtNode(
    props.container || document.getElementById('root')
  );
}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="lifecycle-sequence">
            <h3>生命周期流程图</h3>
            <div class="sequence-diagram">
              <div class="sequence-item">
                <div class="sequence-node">应用注册</div>
                <div class="sequence-arrow">→</div>
              </div>
              <div class="sequence-item">
                <div class="sequence-node">路由匹配</div>
                <div class="sequence-arrow">→</div>
              </div>
              <div class="sequence-item">
                <div class="sequence-node">加载资源</div>
                <div class="sequence-arrow">→</div>
              </div>
              <div class="sequence-item">
                <div class="sequence-node">执行bootstrap</div>
                <div class="sequence-arrow">→</div>
              </div>
              <div class="sequence-item">
                <div class="sequence-node">执行mount</div>
                <div class="sequence-arrow">→</div>
              </div>
              <div class="sequence-item">
                <div class="sequence-node">应用运行</div>
                <div class="sequence-arrow">→</div>
              </div>
              <div class="sequence-item">
                <div class="sequence-node">路由变更</div>
                <div class="sequence-arrow">→</div>
              </div>
              <div class="sequence-item">
                <div class="sequence-node">执行unmount</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>乾坤微前端框架原理图解 • 实现思路深度解析</p>
      <div class="footer-links">
        <a href="https://qiankun.umijs.org/" target="_blank">官方文档</a>
        <a href="https://github.com/umijs/qiankun" target="_blank">GitHub仓库</a>
        <a href="https://www.yuque.com/umijs/qiankun" target="_blank">最佳实践</a>
      </div>
      <p class="copyright"> 微前端技术研究 | 乾坤原理剖析</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeSection = ref('overview');

const navItems = [
  { id: 'overview', title: '架构概述', icon: '🏗️' },
  { id: 'sandbox', title: 'JS沙箱原理', icon: '📦' },
  { id: 'css-isolation', title: '样式隔离', icon: '🎨' },
  { id: 'html-entry', title: 'HTML Entry', icon: '📄' },
  { id: 'lifecycle', title: '生命周期', icon: '🔄' }
];


</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@light-bg: #f8f9fa;
@border-color: #e0e6ed;
@text-color: #2c3e50;
@light-text: #666;
@card-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
@code-bg: #2d2d2d;

.qiankun-principle {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafbfc;
  color: @text-color;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #1a73e8, @primary-color);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .logo-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;

    .logo {
      width: 46px;
      height: 46px;
      background: white;
      color: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: bold;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    h1 {
      margin: 0;
      font-weight: 600;
      font-size: 1.7rem;
    }
  }

  .subtitle {
    margin: 0;
    font-size: 1.05rem;
    opacity: 0.92;
    padding-left: 62px;
  }
}

.content-container {
  display: flex;
  flex: 1;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem;
  gap: 1.8rem;
}

.sidebar {
  width: 240px;
  background: white;
  border-radius: 10px;
  box-shadow: @card-shadow;
  align-self: flex-start;
  overflow: hidden;

  .sidebar-header {
    padding: 1.2rem 1.5rem;
    background: fade(@primary-color, 8%);
    border-bottom: 1px solid @border-color;

    h2 {
      margin: 0;
      font-size: 1.2rem;
      color: @secondary-color;
    }
  }

  .nav-list {
    list-style: none;
    padding: 0.8rem 0;
    margin: 0;

    li {
      padding: 0.85rem 1.8rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover {
        background: fade(@primary-color, 5%);
      }

      &.active {
        background: fade(@primary-color, 10%);
        color: @primary-color;
        border-left: 4px solid @primary-color;
        font-weight: 500;

        .nav-icon {
          transform: scale(1.1);
        }
      }

      .nav-icon {
        font-size: 1.2rem;
        transition: transform 0.2s ease;
      }

      .nav-text {
        font-size: 0.95rem;
      }
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.principle-section {
  background: white;
  border-radius: 10px;
  box-shadow: @card-shadow;
  padding: 1.8rem 2.2rem;

  .section-header {
    margin-bottom: 1.8rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid @border-color;

    h2 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1.6rem;
    }

    p {
      margin: 0;
      color: @light-text;
      font-size: 1rem;
    }
  }
}

.principle-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  h3 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    display: flex;
    align-items: center;

    &:before {
      content: "•";
      color: @primary-color;
      margin-right: 0.6rem;
      font-size: 1.8rem;
    }
  }
}

.principle-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.principle-list {
  padding-left: 1.5rem;
  margin: 0;

  li {
    margin-bottom: 0.7rem;
    position: relative;
    padding-left: 1.5rem;

    &:before {
      content: "—";
      position: absolute;
      left: 0;
      color: @primary-color;
    }
  }
}

.feature-list {
  padding-left: 1.5rem;
  margin: 1.2rem 0 0;

  li {
    margin-bottom: 0.6rem;
    padding-left: 1.8rem;
    position: relative;

    &:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: @primary-color;
      font-weight: bold;
    }
  }
}

.code-block {
  background: @code-bg;
  color: #f5f5f5;
  border-radius: 8px;
  padding: 1.2rem;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 1rem 0;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);

  pre {
    margin: 0;
  }

  code {
    font-family: inherit;
  }
}

.code-tiny {
  .code-block;
  font-size: 0.85rem;
  padding: 0.9rem 1rem;
}

.comparison {
  margin-top: 2rem;

  h3 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 1.2rem;
    font-size: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;

    th,
    td {
      padding: 0.9rem 1.2rem;
      text-align: left;
      border: 1px solid @border-color;
    }

    th {
      background: fade(@primary-color, 7%);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: @light-bg;
    }
  }
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 2rem 0;

  .architecture-row {
    display: flex;
    justify-content: center;
    gap: 1.8rem;
    width: 100%;
  }

  .arch-component {
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    box-shadow: @card-shadow;
    overflow: hidden;
    flex: 1;

    .arch-title {
      background: fade(@primary-color, 10%);
      padding: 0.8rem 1rem;
      font-weight: 600;
      color: @secondary-color;
      text-align: center;
      border-bottom: 1px solid @border-color;
    }

    .arch-content {
      padding: 1.2rem;

      .arch-item {
        background: fade(@primary-color, 5%);
        padding: 0.6rem 1rem;
        margin-bottom: 0.7rem;
        border-radius: 4px;
        font-size: 0.9rem;
        text-align: center;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .main-app {
    max-width: 500px;
    border: 2px solid fade(@primary-color, 50%);

    .arch-title {
      background: fade(@primary-color, 15%);
    }
  }

  .sub-app {
    border: 2px solid fade(#2ecc71, 30%);

    .arch-title {
      background: fade(#2ecc71, 10%);
    }
  }

  .architecture-connector {
    background: fade(@primary-color, 10%);
    color: @primary-color;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-weight: 500;
    font-size: 0.9rem;
  }
}

.isolation-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.8rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.isolation-card {
  background: white;
  border: 1px solid @border-color;
  border-radius: 8px;
  box-shadow: @card-shadow;
  width: 280px;
  overflow: hidden;

  .isolation-title {
    background: fade(@primary-color, 8%);
    padding: 0.8rem;
    text-align: center;
    font-weight: 500;
    border-bottom: 1px solid @border-color;
  }

  .style-example {
    padding: 1.2rem;
    min-height: 180px;
    display: flex;
    flex-direction: column;

    .css-rule {
      background: #f0f4f8;
      padding: 0.6rem;
      margin-bottom: 0.7rem;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
    }

    .conflict-warning {
      background: rgba(231, 76, 60, 0.1);
      color: #e74c3c;
      margin-top: auto;
      padding: 0.6rem;
      text-align: center;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .no-conflict {
      background: rgba(46, 204, 113, 0.1);
      color: #27ae60;
      margin-top: auto;
      padding: 0.6rem;
      text-align: center;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .shadow-root {
      background: #eef5ff;
      padding: 1rem;
      border-radius: 6px;
      border: 1px dashed #b3d1ff;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
    }
  }
}

.isolation-shadow {
  border: 2px solid fade(@primary-color, 40%);
}

.isolation-scoped {
  border: 2px solid fade(#9b59b6, 40%);
}

.isolation-arrow {
  font-size: 1.8rem;
  color: @light-text;
}

.process-flow {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  margin: 2rem 0;
}

.process-step {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  .step-number {
    background: @primary-color;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
    margin-top: 0.5rem;
  }

  .step-content {
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: @secondary-color;
      font-size: 1.2rem;
    }

    p {
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: @light-text;
    }
  }
}

.entry-diagram {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;

  .entry-card,
  .parsed-resources {
    flex: 1;
    min-width: 300px;
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    box-shadow: @card-shadow;
    overflow: hidden;
  }

  .html-code {
    padding: 1.2rem;
    background: #f8fafd;
    font-size: 0.85rem;
  }

  .parsed-resources {
    h3 {
      background: fade(@primary-color, 8%);
      padding: 0.8rem 1rem;
      margin: 0;
      font-size: 1.1rem;
      text-align: center;
      border-bottom: 1px solid @border-color;
    }

    .resource-list {
      padding: 1.2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;

      .resource-item {
        padding: 0.8rem;
        border-radius: 6px;
        text-align: center;
        font-weight: 500;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;

        &.css {
          background: fade(#3498db, 10%);
          color: #2980b9;
        }

        &.js {
          background: fade(#9b59b6, 10%);
          color: #8e44ad;
        }
      }
    }
  }
}

.lifecycle-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.lifecycle-stage {
  background: white;
  border: 1px solid @border-color;
  border-radius: 8px;
  box-shadow: @card-shadow;
  overflow: hidden;

  .stage-header {
    background: fade(@primary-color, 10%);
    padding: 0.8rem;
    text-align: center;
    font-weight: 500;
    border-bottom: 1px solid @border-color;
  }

  .stage-card {
    padding: 1.2rem;

    h3 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: @secondary-color;
      font-size: 1.15rem;
    }

    p {
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

.lifecycle-sequence {
  margin-top: 2.5rem;

  h3 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 1.2rem;
    font-size: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }
}

.sequence-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;

  .sequence-item {
    display: flex;
    align-items: center;
  }

  .sequence-node {
    background: white;
    border: 1px solid @border-color;
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    box-shadow: @card-shadow;
    font-weight: 500;
    white-space: nowrap;
  }

  .sequence-arrow {
    font-size: 1.5rem;
    color: @light-text;
    padding: 0 0.5rem;
  }
}

.footer {
  background: @secondary-color;
  color: white;
  padding: 1.8rem 2rem;
  text-align: center;
  margin-top: 2rem;

  p {
    margin: 0.5rem 0;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1.8rem;
    margin: 1.2rem 0;

    a {
      color: #a0c4ff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: white;
      }
    }
  }

  .copyright {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 1.2rem;
  }
}

@media (max-width: 900px) {
  .content-container {
    flex-direction: column;
    padding: 1rem;
  }

  .sidebar {
    width: 100%;
  }

  .principle-cards {
    grid-template-columns: 1fr;
  }

  .architecture-row {
    flex-direction: column;
  }

  .isolation-diagram {
    flex-direction: column;
  }
}
</style>
