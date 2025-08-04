<template>
  <div class="webcomponent-container">
    <header class="header">
      <h1><span class="wc-text">WebComponent</span> 技术介绍</h1>
      <p class="subtitle">构建可复用、封装良好的自定义 HTML 元素</p>
      <p>
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/Web_Components" target="_blank"
          >MDN 文档</a
        >
      </p>
    </header>

    <div class="content">
      <section class="card intro">
        <div class="intro-content">
          <div class="intro-text">
            <h2>什么是 WebComponent？</h2>
            <p>
              WebComponent
              是一套允许开发者创建可重用的自定义元素的技术规范，它使开发者能够创建封装样式和行为的自定义
              HTML 元素。
            </p>
            <p class="highlight">核心组成：</p>
            <ul>
              <li><strong>Custom Elements</strong> - 定义自定义元素及其行为</li>
              <li><strong>Shadow DOM</strong> - 封装样式和标记结构</li>
              <li><strong>HTML Templates</strong> - 声明可复用的标记模板</li>
              <li><strong>HTML Imports</strong> - 模块化导入组件（已弃用，被 ES Modules 替代）</li>
            </ul>
          </div>
          <div class="intro-image">
            <div class="architecture">
              <div class="layer shadow-dom">Shadow DOM</div>
              <div class="layer custom-element">Custom Element</div>
              <div class="layer html-template">HTML Template</div>
              <div class="layer es-module">ES Module</div>
            </div>
          </div>
        </div>
      </section>

      <section class="card core-tech">
        <h2>核心技术与实现方式</h2>
        <div class="tech-cards">
          <div class="tech-card">
            <div class="tech-icon">🔧</div>
            <h3>Custom Elements</h3>
            <p>创建自定义 HTML 标签并定义其行为</p>
            <pre class="code-block">
class MyElement extends HTMLElement {
  constructor() {
    super();
    // 元素初始化
  }

  connectedCallback() {
    // 元素插入DOM时调用
  }
}

customElements.define('my-element', MyElement);</pre
            >
          </div>

          <div class="tech-card">
            <div class="tech-icon">🔧</div>
            <h3>自定义生命周期</h3>
            <p>自定义元素的生命周期</p>
            <pre class="code-block">
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    // 必须首先调用 super 方法
    super();
  }

  connectedCallback() {
    console.log("自定义元素添加至页面。");
  }

  disconnectedCallback() {
    console.log("自定义元素从页面中移除。");
  }

  adoptedCallback() {
    console.log("自定义元素移动至新页面。");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`属性 ${name} 已变更。`);
  }
}</pre
            >
          </div>

          <div class="tech-card">
            <div class="tech-icon">🔒</div>
            <h3>Shadow DOM</h3>
            <p>创建封装的 DOM 树，隔离样式</p>
            <pre class="code-block">
const shadow = this.attachShadow({ mode: 'open' });
shadow.innerHTML = `
  &lt;style&gt;
    /* 样式仅在此组件内生效 */
    p { color: blue; }
  &lt;/style&gt;
  &lt;p&gt;封装的内容&lt;/p&gt;
`;</pre
            >
          </div>

          <div class="tech-card">
            <div class="tech-icon">📋</div>
            <h3>HTML Templates</h3>
            <p>定义可复用的标记结构</p>
            <pre class="code-block">
&lt;template id="user-card"&gt;
  &lt;div class="card"&gt;
    &lt;img src="avatar.png"&gt;
    &lt;div class="name"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

// 使用模板
const template = document.getElementById('user-card');
const content = template.content.cloneNode(true);</pre
            >
          </div>
        </div>
      </section>

      <section class="card usage">
        <h2>如何使用 WebComponent</h2>
        <div class="usage-steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>定义自定义元素</h3>
            <p>创建继承自 HTMLElement 的类</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>添加 Shadow DOM</h3>
            <p>封装组件内部结构和样式</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>定义模板和样式</h3>
            <p>使用 &lt;template&gt; 和 &lt;style&gt;</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">4</div>
            <h3>注册自定义元素</h3>
            <p>使用 customElements.define()</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">5</div>
            <h3>在 HTML 中使用</h3>
            <p>&lt;my-component&gt;&lt;/my-component&gt;</p>
          </div>
        </div>

        <div class="full-example">
          <h3>完整示例：用户卡片组件</h3>
          <pre class="code-block">
class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.count = 0;

    shadow.innerHTML = `
      &lt;style&gt;
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          max-width: 200px;
          font-family: sans-serif;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        img {
          width: 100%;
          border-radius: 50%;
        }
        .name {
          font-weight: bold;
          margin-top: 10px;
          text-align: center;
        }
      &lt;/style&gt;
      &lt;div class="card"&gt;
        &lt;img src="https://via.placeholder.com/150" alt="Avatar"&gt;
        &lt;div class="name"&gt;${this.getAttribute('name')}&lt;/div&gt;
        &lt;button @click="handleClick"&gt;点击&lt;/button&gt;
      &lt;/div&gt;
    `;
  }
  handleClick() {
    this.count++;
    console.log("按钮被点击了", this.count);
  }
}

customElements.define('user-card', UserCard);</pre
          >

          <div class="example-preview">
            <h4>预览效果：</h4>
            <div class="preview-content">
              <div class="card-preview">
                <img src="https://via.placeholder.com/150" alt="Avatar" />
                <div class="name-preview">张三</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card scenarios">
        <h2>适用场景</h2>
        <div class="scenario-cards">
          <div class="scenario">
            <div class="scenario-icon">🌐</div>
            <h3>跨框架组件</h3>
            <p>在 React、Vue、Angular 等不同框架中复用</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">📦</div>
            <h3>UI组件库</h3>
            <p>构建框架无关的UI组件库</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">🔌</div>
            <h3>第三方插件</h3>
            <p>提供可嵌入的第三方服务组件</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">🧩</div>
            <h3>微前端集成</h3>
            <p>作为微前端架构的集成点</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">📱</div>
            <h3>嵌入式组件</h3>
            <p>在CMS、博客等系统中嵌入复杂功能</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">🛡️</div>
            <h3>样式隔离组件</h3>
            <p>需要严格样式隔离的场景</p>
          </div>
        </div>
      </section>

      <section class="card comparison">
        <h2>WebComponent 的优缺点</h2>
        <div class="pros-cons">
          <div class="pros">
            <h3>✅ 优点</h3>
            <ul>
              <li><strong>浏览器原生支持</strong> - 无需额外框架</li>
              <li><strong>框架无关性</strong> - 可在任何框架或原生JS中使用</li>
              <li><strong>真正的封装</strong> - Shadow DOM 提供样式和行为隔离</li>
              <li><strong>长期兼容性</strong> - 基于Web标准，不会随框架淘汰</li>
              <li><strong>可复用性</strong> - 一次开发，随处使用</li>
              <li><strong>渐进式增强</strong> - 可以逐步采用</li>
            </ul>
          </div>
          <div class="cons">
            <h3>⚠️ 缺点与挑战</h3>
            <ul>
              <li><strong>浏览器兼容性</strong> - 旧版浏览器需要polyfill</li>
              <li><strong>SEO不友好</strong> - 动态内容不易被爬虫抓取</li>
              <li><strong>样式定制困难</strong> - Shadow DOM 限制了外部样式访问</li>
              <li><strong>学习曲线</strong> - 需要掌握新的API和概念</li>
              <li><strong>开发体验</strong> - 缺少框架级的开发工具</li>
              <li><strong>状态管理</strong> - 需要自行实现状态共享机制</li>
            </ul>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <ul>
            <li>使用 <code>&lt;slot&gt;</code> 元素提供内容分发机制</li>
            <li>通过属性(attributes)或属性(properties)传递数据</li>
            <li>使用 Custom Events 进行组件通信</li>
            <li>为旧浏览器提供 polyfill</li>
            <li>结合 Lit 或 Stencil 等工具提升开发体验</li>
            <li>遵循 Web Component 命名规范（必须包含连字符）</li>
          </ul>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>WebComponent | 浏览器原生组件化解决方案</p>
      <div class="links">
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/Web_Components" target="_blank"
          >MDN 文档</a
        >
        <a href="https://webcomponents.org/" target="_blank">WebComponents.org</a>
        <a href="https://lit.dev/" target="_blank">Lit 框架</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// 示例响应式数据
const activeTech = ref('Custom Elements')

onMounted(() => {
  console.log('WebComponent介绍组件已挂载')
})
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.webcomponent-container {
  font-family:
    'Noto Sans SC',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #334155;
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 700;
    color: #1e293b;

    .wc-text {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e2e8f0;
    color: #1e293b;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: #4361ee;
    }
  }
}

.intro {
  .intro-content {
    display: flex;
    gap: 30px;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .intro-text {
    flex: 1;

    p {
      margin-bottom: 15px;
      font-size: 1.1rem;
      color: #475569;
    }

    .highlight {
      font-weight: 600;
      color: #3a0ca3;
      margin: 20px 0 10px;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        line-height: 1.7;

        strong {
          color: #4361ee;
        }
      }
    }
  }

  .intro-image {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .architecture {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .layer {
      padding: 25px;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateX(10px);
      }
    }

    .shadow-dom {
      background: linear-gradient(135deg, #4895ef, #4361ee);
    }

    .custom-element {
      background: linear-gradient(135deg, #3f37c9, #3a0ca3);
    }

    .html-template {
      background: linear-gradient(135deg, #560bad, #480ca8);
    }

    .es-module {
      background: linear-gradient(135deg, #7209b7, #5a189a);
    }
  }
}

.core-tech {
  .tech-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 25px;
    margin-top: 20px;
  }

  .tech-card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      border-color: #4361ee;
      box-shadow: 0 6px 15px rgba(67, 97, 238, 0.1);
    }

    .tech-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 10px;
      color: #3a0ca3;
    }

    p {
      color: #64748b;
      margin-bottom: 15px;
    }
  }
}

.usage {
  .usage-steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 30px 0;

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .step {
    text-align: center;
    padding: 20px;
    background: #f0f7ff;
    border-radius: 10px;
    min-width: 150px;
    transition: all 0.3s ease;
    border: 1px solid #b4d0ff;

    @media (max-width: 900px) {
      margin-bottom: 20px;
    }

    &:hover {
      background: #d6e7ff;
      transform: translateY(-5px);
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: #4361ee;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin: 0 auto 15px;
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #3a0ca3;
    }

    p {
      font-size: 0.95rem;
      color: #64748b;
    }
  }

  .step-arrow {
    font-size: 1.8rem;
    color: #94a3b8;
    padding: 0 10px;

    @media (max-width: 900px) {
      transform: rotate(90deg);
      margin: -10px auto;
      padding: 10px 0;
    }
  }

  .full-example {
    margin-top: 40px;
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #3a0ca3;
    }
  }

  .example-preview {
    margin-top: 30px;

    h4 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      color: #3a0ca3;
    }

    .preview-content {
      display: flex;
      justify-content: center;
    }

    .card-preview {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      max-width: 200px;
      font-family: sans-serif;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background: white;

      img {
        width: 100%;
        border-radius: 50%;
      }

      .name-preview {
        font-weight: bold;
        margin-top: 10px;
        text-align: center;
        color: #3a0ca3;
      }
    }
  }
}

.scenarios {
  .scenario-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .scenario {
    background: #f0f7ff;
    padding: 25px 20px;
    border-radius: 10px;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid #b4d0ff;

    &:hover {
      background: #d6e7ff;
      transform: translateY(-5px);
    }

    .scenario-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: #3a0ca3;
    }

    p {
      color: #64748b;
      font-size: 0.95rem;
    }
  }
}

.comparison {
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros,
  .cons {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid;
    }
  }

  .pros {
    border-top: 4px solid #4ade80;

    h3 {
      color: #16a34a;
      border-bottom-color: #4ade80;
    }

    li::marker {
      color: #16a34a;
    }
  }

  .cons {
    border-top: 4px solid #f87171;

    h3 {
      color: #dc2626;
      border-bottom-color: #f87171;
    }

    li::marker {
      color: #dc2626;
    }
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 15px;
      line-height: 1.6;

      strong {
        color: #3a0ca3;
      }
    }
  }

  .best-practices {
    background: #f0f7ff;
    border-radius: 10px;
    padding: 25px;
    border-left: 4px solid #4361ee;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #3a0ca3;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 25px;

        &::before {
          content: '★';
          position: absolute;
          left: 0;
          color: #4361ee;
        }
      }
    }

    code {
      background: #e2e8f0;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }
  }
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin-top: 15px;
  line-height: 1.5;
  border: 1px solid #334155;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px 8px 0 0;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px 0;
  border-top: 1px solid #e2e8f0;
  color: #64748b;

  .links {
    margin-top: 15px;

    a {
      color: #4361ee;
      text-decoration: none;
      margin: 0 15px;
      font-weight: 500;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 2px;
        background: #4361ee;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }

  .usage-steps {
    .step-arrow {
      margin: 10px auto;
    }
  }
}
</style>
