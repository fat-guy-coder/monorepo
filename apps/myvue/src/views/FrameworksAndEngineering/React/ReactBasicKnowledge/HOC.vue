<template>
  <div class="hoc-guide">
    <header class="header-banner">
      <div class="header-content">
        <h1>React 高阶组件(HOC)基本指南</h1>
        <p class="subtitle">提升组件复用性与逻辑抽象的进阶模式</p>
        <div class="hoc-features">
          <div class="feature-card">逻辑复用</div>
          <div class="feature-card">组件增强</div>
          <div class="feature-card">Props操作</div>
          <div class="feature-card">渲染控制</div>
        </div>
      </div>
      <div class="hoc-visual">
        <div class="hoc-diagram">
          <div class="base-component">基础组件</div>
          <div class="hoc-function">高阶组件函数</div>
          <div class="enhanced-component">增强组件</div>
          <div class="arrow">⇒</div>
          <div class="arrow">⇒</div>
        </div>
      </div>
    </header>

    <main class="content-container">
      <!-- 什么是高阶组件 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="icon">🧠</span>
          高阶组件是什么？
        </h2>

        <div class="definition-grid">
          <div class="definition-card">
            <div class="card-icon">🔄</div>
            <h3>函数式编程概念</h3>
            <p>高阶组件是接收组件并返回新组件的函数</p>
          </div>

          <div class="definition-card">
            <div class="card-icon">🧩</div>
            <h3>逻辑复用机制</h3>
            <p>用于封装和重用跨组件的通用逻辑</p>
          </div>

          <div class="definition-card">
            <div class="card-icon">🔧</div>
            <h3>组件增强工具</h3>
            <p>在不修改原组件的情况下扩展功能</p>
          </div>
        </div>

        <div class="core-concept">
          <h3>核心概念：高阶函数 → 高阶组件</h3>
          <pre
            class="code-block">const EnhancedComponent = <span class="hoc-function">higherOrderComponent</span>(<span class="base-component">BaseComponent</span>);</pre>
        </div>
      </section>

      <!-- 类组件中使用HOC -->
      <section class="content-section class-component">
        <h2 class="section-title">
          <span class="icon">🛠️</span>
          类组件中的高阶组件
        </h2>

        <div class="use-case">
          <div class="use-case-text">
            <h3>传统类组件HOC模式</h3>
            <p>在React类组件时代，高阶组件是最主要的逻辑复用模式</p>
            <ul>
              <li>通过继承或组合扩展组件功能</li>
              <li>操作props、state和生命周期方法</li>
              <li>实现条件渲染和访问控制</li>
            </ul>
          </div>

          <div class="code-sample">
            <pre class="code-block"><code class="language-jsx">// 类组件HOC定义示例
function withLoading(Component) {
  return class extends React.Component {
    state = { loading: true };

    componentDidMount() {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }

    render() {
      const { loading } = this.state;
      return loading ?
        &lt;LoadingSpinner /&gt; :
        &lt;Component {...this.props} /&gt;;
    }
  };
}

// 使用高阶组件
class UserProfile extends React.Component {/* ... */}
const EnhancedProfile = withLoading(UserProfile);</code></pre>
          </div>
        </div>
      </section>

      <!-- 函数组件中使用HOC -->
      <section class="content-section function-component">
        <h2 class="section-title">
          <span class="icon">⚡</span>
          函数组件中的高阶组件
        </h2>

        <div class="use-case">
          <div class="use-case-text">
            <h3>函数组件+HOC组合模式</h3>
            <p>函数组件同样可以使用高阶组件进行增强</p>
            <ul>
              <li>HOC包装函数组件实现逻辑复用</li>
              <li>无需修改原组件代码</li>
              <li>可以与Hooks混合使用</li>
            </ul>
          </div>

          <div class="code-sample">
            <pre class="code-block"><code class="language-jsx">// 函数组件HOC定义
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      checkAuth().then(auth => setIsAuthenticated(auth));
    }, []);

    if (!isAuthenticated) return &lt;LoginPage /&gt;;
    return &lt;Component {...props} /&gt;;
  };
}

// 使用高阶组件
const UserDashboard = () => &lt;div&gt;用户仪表盘&lt;/div&gt;;
const ProtectedDashboard = withAuth(UserDashboard);</code></pre>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="content-section use-cases">
        <h2 class="section-title">
          <span class="icon">📌</span>
          高阶组件使用场景
        </h2>

        <div class="use-case-grid">
          <div class="use-case-card">
            <div class="use-case-icon">🔐</div>
            <h3>权限控制</h3>
            <p>控制用户访问权限，拦截未授权组件</p>
          </div>

          <div class="use-case-card">
            <div class="use-case-icon">📦</div>
            <h3>数据获取</h3>
            <p>封装数据获取逻辑，提供加载状态</p>
          </div>

          <div class="use-case-card">
            <div class="use-case-icon">🎭</div>
            <h3>状态管理</h3>
            <p>跨组件共享状态和逻辑</p>
          </div>

          <div class="use-case-card">
            <div class="use-case-icon">📝</div>
            <h3>日志记录</h3>
            <p>跟踪组件生命周期和用户交互</p>
          </div>
        </div>
      </section>

      <!-- HOC实现模式 -->
      <section class="content-section patterns">
        <h2 class="section-title">
          <span class="icon">📐</span>
          HOC实现模式
        </h2>

        <div class="pattern-tabs">
          <div v-for="(pattern, index) in patterns" :key="index"
            :class="['pattern-tab', { active: activePattern === index }]" @click="activePattern = index">
            {{ pattern.title }}
          </div>
        </div>

        <div class="pattern-content">
          <div v-if="activePattern === 0" class="pattern-detail">
            <h3>属性代理</h3>
            <p>最常用的HOC模式，通过包裹组件操作props和渲染</p>

            <pre class="code-block"><code class="language-jsx">function proxyHOC(WrappedComponent) {
  return class extends React.Component {
    render() {
      // 过滤或添加props
      const newProps = {
        ...this.props,
        extraProp: '额外属性'
      };

      return &lt;WrappedComponent {...newProps} /&gt;;
    }
  };
}</code></pre>

            <div class="pattern-pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li>直接控制props传递</li>
                  <li>支持组合多个HOC</li>
                  <li>不破坏原组件结构</li>
                </ul>
              </div>

              <div class="cons">
                <h4>⚠️ 注意事项</h4>
                <ul>
                  <li>不能访问原组件实例</li>
                  <li>需要手动传递ref</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="activePattern === 1" class="pattern-detail">
            <h3>继承反转</h3>
            <p>通过继承原组件访问其状态和方法</p>

            <pre class="code-block"><code class="language-jsx">function inheritHOC(WrappedComponent) {
  return class extends WrappedComponent {
    componentDidMount() {
      // 访问原组件方法
      if (super.componentDidMount) {
        super.componentDidMount();
      }
      // 添加额外逻辑
    }

    render() {
      // 渲染劫持
      const elementsTree = super.render();
      return React.cloneElement(elementsTree, {
        className: 'enhanced-component'
      });
    }
  };
}</code></pre>

            <div class="pattern-pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li>可以访问原组件的state</li>
                  <li>可以覆盖生命周期方法</li>
                  <li>实现渲染劫持</li>
                </ul>
              </div>

              <div class="cons">
                <h4>⚠️ 注意事项</h4>
                <ul>
                  <li>可能破坏原组件行为</li>
                  <li>过度耦合导致维护困难</li>
                  <li>无法用于函数组件</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="content-section best-practices">
        <h2 class="section-title">
          <span class="icon">🏆</span>
          HOC最佳实践
        </h2>

        <div class="practice-grid">
          <div class="practice-card">
            <div class="practice-number">1</div>
            <div class="practice-content">
              <h3>命名规范</h3>
              <p>使用with前缀命名HOC函数</p>
              <p class="example">withLogger, withAuth, withData</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">2</div>
            <div class="practice-content">
              <h3>透传Props</h3>
              <p>确保不相关的Props传递给包装组件</p>
              <pre class="mini-code">return &lt;WrappedComponent {...this.props} /&gt;</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">3</div>
            <div class="practice-content">
              <h3>Ref转发</h3>
              <p>使用React.forwardRef传递ref引用</p>
              <pre class="mini-code">return React.forwardRef((props, ref) => { ... })</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">4</div>
            <div class="practice-content">
              <h3>显示名称</h3>
              <p>设置displayName便于调试</p>
              <pre class="mini-code">MyComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`</pre>
            </div>
          </div>
        </div>

        <div class="comparison-section">
          <h3>HOC vs React Hooks</h3>

          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>高阶组件</th>
                  <th>React Hooks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>逻辑复用</td>
                  <td>⭐️⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️⭐️⭐️</td>
                </tr>
                <tr>
                  <td>组件嵌套</td>
                  <td>多层包装组件</td>
                  <td>无额外组件层级</td>
                </tr>
                <tr>
                  <td>学习曲线</td>
                  <td>中等</td>
                  <td>较陡峭</td>
                </tr>
                <tr>
                  <td>适用场景</td>
                  <td>类组件/跨组件逻辑</td>
                  <td>函数组件/细粒度逻辑</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="conclusion">
            <p>虽然React Hooks在现代开发中逐渐替代了许多HOC的使用场景，但高阶组件仍然是处理横切关注点、权限控制和全局状态注入的强大工具。</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="guide-footer">
      <p>React高阶组件基本指南 · 提升组件复用性 · {{ currentYear }}</p>
      <div class="footer-links">
        <a href="#">React官方文档</a>
        <a href="#">高级组件模式</a>
        <a href="#">HOC最佳实践</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const patterns = [
  {
    title: '属性代理模式',
    description: '最常用的HOC模式，通过包裹组件操作props'
  },
  {
    title: '继承反转模式',
    description: '通过继承原始组件访问其状态和方法'
  },
];

const activePattern = ref(0);
const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@primary-color: #4361ee;
@primary-light: rgba(67, 97, 238, 0.1);
@class-color: #3a0ca3;
@function-color: #f72585;
@text-primary: #2b2d42;
@text-secondary: #5c677d;
@border-color: #e1e4e8;
@background: #f8fafc;
@card-bg: #ffffff;
@code-bg: #2b2d42;
@warning-color: #ff9e00;
@success-color: #06d6a0;
@error-color: #ef476f;

.hoc-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text-primary;
  line-height: 1.6;
  background-color: @background;
}

.header-banner {
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0 40px;
  background: linear-gradient(135deg, #f0f4ff, #e6eeff);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(67, 97, 238, 0.15);

  .header-content {
    padding: 40px;
    flex: 1;
    min-width: 300px;

    h1 {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 10px;
      color: @primary-color;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 1.2rem;
      color: @text-secondary;
      margin-bottom: 30px;
    }
  }

  .hoc-visual {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 400px;
    background: rgba(255, 255, 255, 0.7);
  }
}

.hoc-features {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;

  .feature-card {
    background: rgba(67, 97, 238, 0.1);
    color: @primary-color;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
  }
}

.hoc-diagram {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  padding: 20px;

  .base-component,
  .hoc-function,
  .enhanced-component {
    font-weight: 600;
    padding: 15px 25px;
    border-radius: 12px;
    text-align: center;
    position: relative;
    min-width: 120px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .base-component {
    background: lighten(@primary-color, 42%);
    border: 2px solid lighten(@primary-color, 30%);
  }

  .hoc-function {
    background: lighten(@primary-color, 38%);
    border: 2px dashed lighten(@primary-color, 25%);
    font-style: italic;
  }

  .enhanced-component {
    background: lighten(@primary-color, 35%);
    border: 3px solid @primary-color;
    font-weight: 700;
  }

  .arrow {
    font-size: 1.5rem;
    color: @primary-color;
    font-weight: 700;
  }
}

.content-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.content-section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);

  &.class-component {
    border-top: 4px solid @class-color;
  }

  &.function-component {
    border-top: 4px solid @function-color;
  }
}

.section-title {
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    font-size: 1.4rem;
  }
}

.definition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.definition-card {
  background: rgba(67, 97, 238, 0.05);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(67, 97, 238, 0.1);
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    margin: 0 0 10px;
    color: @primary-color;
  }

  p {
    margin: 0;
    color: @text-secondary;
  }
}

.core-concept {
  background: rgba(67, 97, 238, 0.05);
  border-radius: 12px;
  padding: 25px;
  text-align: center;

  h3 {
    margin-top: 0;
    color: @primary-color;
  }
}

.code-block {
  font-family: 'Fira Code', monospace;
  background: @code-bg;
  color: #edf2f4;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 20px 0;

  .hoc-function {
    color: #f72585;
    font-weight: 600;
  }

  .base-component {
    color: #4cc9f0;
  }
}

.use-case {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .use-case-text {
    h3 {
      margin-top: 0;
      color: @text-primary;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 10px;
      }
    }
  }
}

.use-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.use-case-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-top: 3px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .use-case-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    margin: 0 0 10px;
    color: @text-primary;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.pattern-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.pattern-tab {
  background: rgba(67, 97, 238, 0.1);
  color: @primary-color;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(67, 97, 238, 0.2);
  }

  &.active {
    background: @primary-color;
    color: white;
  }
}

.pattern-content {
  background: rgba(67, 97, 238, 0.05);
  border-radius: 16px;
  padding: 25px;

  h3 {
    margin-top: 0;
    color: @primary-color;
  }
}

.pattern-pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 20px;

  .pros,
  .cons {
    padding: 20px;
    border-radius: 12px;
  }

  .pros {
    background: rgba(6, 214, 160, 0.08);
    border-left: 3px solid @success-color;
  }

  .cons {
    background: rgba(239, 71, 111, 0.08);
    border-left: 3px solid @error-color;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
    }
  }
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.practice-card {
  display: flex;
  gap: 15px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .practice-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: @primary-color;
    min-width: 50px;
    height: 50px;
    background: rgba(67, 97, 238, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .practice-content {
    h3 {
      margin: 0 0 8px;
      font-size: 1.1rem;
    }

    p {
      margin: 0 0 5px;
      color: @text-secondary;
    }

    .example {
      font-style: italic;
      color: @primary-color;
    }

    .mini-code {
      font-family: 'Fira Code', monospace;
      background: rgba(43, 45, 66, 0.05);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
      margin-top: 10px;
      color: @text-primary;
    }
  }
}

.comparison-section {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @primary-color;
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 20px 0;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 500px;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: rgba(67, 97, 238, 0.08);
      font-weight: 600;
      color: @primary-color;
    }

    tr:hover {
      background: rgba(67, 97, 238, 0.03);
    }

    td:nth-child(2),
    td:nth-child(3) {
      text-align: center;
    }
  }
}

.conclusion {
  background: rgba(67, 97, 238, 0.05);
  border-left: 3px solid @primary-color;
  padding: 15px 20px;
  border-radius: 0 8px 8px 0;
  margin-top: 20px;

  p {
    margin: 0;
  }
}

.guide-footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid @border-color;
  color: @text-secondary;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;

    a {
      color: @primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .header-banner {
    flex-direction: column;

    .header-content {
      padding: 30px 20px;
    }

    .hoc-visual {
      min-width: auto;
      padding: 20px;
    }
  }

  .hoc-diagram {
    flex-direction: column;
    gap: 15px;

    .arrow {
      transform: rotate(90deg);
    }
  }

  .definition-grid,
  .use-case-grid,
  .practice-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .content-section {
    padding: 25px 20px;
  }

  .pattern-pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
