<template>
  <div class="router-container">
    <header class="header">
      <h1>前端路由实现原理</h1>
      <p class="subtitle">深入理解Hash与History两种路由模式</p>
    </header>

    <div class="content-wrapper">
      <!-- 路由概念部分 -->
      <section class="section concept">
        <div class="section-header">
          <div class="icon">🧩</div>
          <h2>前端路由核心概念</h2>
        </div>
        <div class="card">
          <div class="concept-grid">
            <div class="concept-item">
              <div class="icon">🔗</div>
              <h3>什么是前端路由？</h3>
              <p>前端路由是在单页面应用(SPA)中，通过JavaScript动态管理页面视图切换的技术，无需向服务器发送请求即可更新页面内容。</p>
            </div>
            <div class="concept-item">
              <div class="icon">🎯</div>
              <h3>实现目标</h3>
              <ul>
                <li>URL变化时页面不刷新</li>
                <li>根据URL显示对应组件</li>
                <li>支持前进后退操作</li>
                <li>提供编程式导航API</li>
              </ul>
            </div>
            <div class="concept-item">
              <div class="icon">📦</div>
              <h3>核心模块</h3>
              <ul>
                <li><strong>Router</strong> - 路由管理器</li>
                <li><strong>Route</strong> - 路由匹配规则</li>
                <li><strong>Link</strong> - 路由导航组件</li>
                <li><strong>History</strong> - 路由历史记录</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 实现思路 -->
      <section class="section implementation">
        <div class="section-header">
          <div class="icon">💡</div>
          <h2>路由实现思路</h2>
        </div>
        <div class="card">
          <div class="strategy-tabs">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab }}
            </button>
          </div>

          <div v-show="activeTab === 0" class="tab-content">
            <div class="strategy-grid">
              <div class="strategy-item">
                <div class="step">1</div>
                <h3>监听URL变化</h3>
                <p>通过事件监听URL变化：</p>
                <ul>
                  <li><strong>hashchange</strong> - 监听hash变化</li>
                  <li><strong>popstate</strong> - 监听history变化</li>
                </ul>
              </div>
              <div class="strategy-item">
                <div class="step">2</div>
                <h3>路由匹配</h3>
                <p>根据当前URL匹配预定义的路由规则</p>
                <ul>
                  <li>路径参数解析</li>
                  <li>通配符匹配</li>
                  <li>嵌套路由处理</li>
                </ul>
              </div>
              <div class="strategy-item">
                <div class="step">3</div>
                <h3>视图渲染</h3>
                <p>渲染匹配到的组件视图</p>
                <ul>
                  <li>动态组件切换</li>
                  <li>路由守卫执行</li>
                  <li>页面过渡效果</li>
                </ul>
              </div>
              <div class="strategy-item">
                <div class="step">4</div>
                <h3>历史记录管理</h3>
                <p>维护路由历史堆栈</p>
                <ul>
                  <li>记录路由状态</li>
                  <li>支持前进/后退</li>
                  <li>提供导航控制</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 1" class="tab-content">
            <h3>Hash模式实现方案</h3>
            <div class="feature-grid">
              <div class="feature-item">
                <div class="icon">🔗</div>
                <h4>URL格式</h4>
                <p>http://example.com/#/path</p>
              </div>
              <div class="feature-item">
                <div class="icon">✅</div>
                <h4>优点</h4>
                <ul>
                  <li>兼容性好（IE8+）</li>
                  <li>无需服务器配置</li>
                  <li>实现简单</li>
                </ul>
              </div>
              <div class="feature-item">
                <div class="icon">⚠️</div>
                <h4>缺点</h4>
                <ul>
                  <li>URL包含#不美观</li>
                  <li>SEO支持有限</li>
                </ul>
              </div>
            </div>

            <div class="implementation-diagram">
              <div class="diagram-title">Hash模式工作原理</div>
              <div class="diagram-flow">
                <div class="flow-item">URL改变</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">触发hashchange</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">路由匹配</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">更新视图</div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 2" class="tab-content">
            <h3>History模式实现方案</h3>
            <div class="feature-grid">
              <div class="feature-item">
                <div class="icon">🔗</div>
                <h4>URL格式</h4>
                <p>http://example.com/path</p>
              </div>
              <div class="feature-item">
                <div class="icon">✅</div>
                <h4>优点</h4>
                <ul>
                  <li>URL美观</li>
                  <li>完整路径支持</li>
                  <li>更好的SEO支持</li>
                </ul>
              </div>
              <div class="feature-item">
                <div class="icon">⚠️</div>
                <h4>缺点</h4>
                <ul>
                  <li>需要服务器配置</li>
                  <li>兼容性较差（IE10+）</li>
                  <li>实现较复杂</li>
                </ul>
              </div>
            </div>

            <div class="implementation-diagram">
              <div class="diagram-title">History模式工作原理</div>
              <div class="diagram-flow">
                <div class="flow-item">URL改变</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">触发popstate</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">路由匹配</div>
                <div class="flow-arrow">→</div>
                <div class="flow-item">更新视图</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 代码实现 -->
      <section class="section code-implementation">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>核心代码实现</h2>
        </div>

        <div class="card">
          <div class="code-tabs">
            <button v-for="(codeTab, index) in codeTabs" :key="index" :class="{ active: activeCodeTab === index }"
              @click="activeCodeTab = index">
              {{ codeTab }}
            </button>
          </div>

          <!-- Hash路由器实现 -->
          <div v-show="activeCodeTab === 0" class="code-block">
            <pre><code class="javascript">class HashRouter {
  constructor(routes = []) {
    this.routes = routes; // 路由配置
    this.currentRoute = null; // 当前路由
    this.history = []; // 路由历史记录

    // 初始化监听hash变化
    window.addEventListener('hashchange', this.handleHashChange.bind(this));

    // 初始加载
    window.addEventListener('DOMContentLoaded', () => {
      if (!window.location.hash) {
        window.location.hash = '/'; // 默认路由
      } else {
        this.handleHashChange(); // 处理当前hash
      }
    });
  }

  // 处理hash变化
  handleHashChange() {
    const path = window.location.hash.slice(1) || '/'; // 去掉#获取路径

    // 查找匹配的路由
    const route = this.matchRoute(path);

    // 更新当前路由
    this.currentRoute = route;

    // 添加到历史记录
    this.history.push(route);

    // 渲染组件
    this.render(route.component);
  }

  // 路由匹配函数
  matchRoute(path) {
    // 查找匹配的路由配置
    return this.routes.find(route => {
      // 简单路径匹配，实际应支持参数和通配符
      return route.path === path;
    }) || this.routes.find(route => route.path === '*'); // 匹配通配符
  }

  // 渲染组件到视图
  render(component) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = ''; // 清空容器
      const node = document.createElement('div');
      node.innerHTML = component;
      app.appendChild(node); // 添加新组件
    }
  }

  // 编程式导航
  push(path) {
    window.location.hash = `#${path}`;
  }

  replace(path) {
    window.location.replace(`#${path}`);
    this.handleHashChange();
  }

  go(n) {
    window.history.go(n);
  }
}

// 使用示例
const router = new HashRouter([
  { path: '/', component: '&lt;h1&gt;Home Page&lt;/h1&gt;' },
  { path: '/about', component: '&lt;h1&gt;About Us&lt;/h1&gt;' },
  { path: '/contact', component: '&lt;h1&gt;Contact Page&lt;/h1&gt;' },
  { path: '*', component: '&lt;h1&gt;404 Not Found&lt;/h1&gt;' }
]);</code></pre>
          </div>

          <!-- History路由器实现 -->
          <div v-show="activeCodeTab === 1" class="code-block">
            <pre><code class="javascript">class HistoryRouter {
  constructor(routes = []) {
    this.routes = routes; // 路由配置
    this.currentRoute = null; // 当前路由
    this.history = []; // 路由历史记录

    // 初始化监听popstate事件
    window.addEventListener('popstate', this.handlePopState.bind(this));

    // 初始加载
    window.addEventListener('DOMContentLoaded', () => {
      const path = window.location.pathname;
      this.navigateTo(path, false); // 不添加历史记录
    });
  }

  // 处理浏览器前进后退
  handlePopState(event) {
    const path = window.location.pathname;
    this.navigateTo(path, false);
  }

  // 导航到指定路径
  navigateTo(path, addToHistory = true) {
    // 查找匹配的路由
    const route = this.matchRoute(path);

    // 更新当前路由
    this.currentRoute = route;

    // 添加到历史记录
    if (addToHistory) {
      this.history.push(route);
    }

    // 渲染组件
    this.render(route.component);
  }

  // 路由匹配函数
  matchRoute(path) {
    // 查找匹配的路由配置
    return this.routes.find(route => {
      // 简单路径匹配，实际应支持参数和通配符
      return route.path === path;
    }) || this.routes.find(route => route.path === '*'); // 匹配通配符
  }

  // 渲染组件到视图
  render(component) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = ''; // 清空容器
      const node = document.createElement('div');
      node.innerHTML = component;
      app.appendChild(node); // 添加新组件
    }
  }

  // 编程式导航 - push
  push(path) {
    window.history.pushState({}, '', path);
    this.navigateTo(path);
  }

  // 编程式导航 - replace
  replace(path) {
    window.history.replaceState({}, '', path);
    this.navigateTo(path, false);
  }

  // 前进后退
  go(n) {
    window.history.go(n);
  }
}

// 使用示例
const router = new HistoryRouter([
  { path: '/', component: '&lt;h1&gt;Home Page&lt;/h1&gt;' },
  { path: '/about', component: '&lt;h1&gt;About Us&lt;/h1&gt;' },
  { path: '/contact', component: '&lt;h1&gt;Contact Page&lt;/h1&gt;' },
  { path: '*', component: '&lt;h1&gt;404 Not Found&lt;/h1&gt;' }
]);</code></pre>
          </div>

          <!-- 路由对比 -->
          <div v-show="activeCodeTab === 2" class="comparison">
            <h3>Hash模式 vs History模式</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>Hash模式</th>
                    <th>History模式</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>URL美观度</td>
                    <td>包含#符号</td>
                    <td>标准URL格式</td>
                  </tr>
                  <tr>
                    <td>兼容性</td>
                    <td>IE8+</td>
                    <td>IE10+</td>
                  </tr>
                  <tr>
                    <td>服务器配置</td>
                    <td>无需特殊配置</td>
                    <td>需配置404回退</td>
                  </tr>
                  <tr>
                    <td>SEO支持</td>
                    <td>有限支持</td>
                    <td>良好支持</td>
                  </tr>
                  <tr>
                    <td>实现复杂度</td>
                    <td>简单</td>
                    <td>中等</td>
                  </tr>
                  <tr>
                    <td>适用场景</td>
                    <td>简单应用/兼容性要求高</td>
                    <td>标准应用/需要SEO</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="recommendation">
              <h4>选择建议</h4>
              <div class="recommend-grid">
                <div class="recommend-item">
                  <div class="icon">✅</div>
                  <h5>使用Hash模式当：</h5>
                  <ul>
                    <li>需要支持旧版浏览器</li>
                    <li>没有服务器配置权限</li>
                    <li>开发简单原型应用</li>
                  </ul>
                </div>
                <div class="recommend-item">
                  <div class="icon">🚀</div>
                  <h5>使用History模式当：</h5>
                  <ul>
                    <li>需要标准URL格式</li>
                    <li>需要SEO优化</li>
                    <li>使用现代浏览器</li>
                    <li>能配置服务器</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>前端路由实现原理 | Hash模式 vs History模式 | 使用 Vue3(TS + Setup) 实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);
const tabs = ['实现思路', 'Hash模式', 'History模式'];

const activeCodeTab = ref(0);
const codeTabs = ['Hash路由器实现', 'History路由器实现', '路由模式对比'];
</script>

<style lang="less" scoped>



:root {
  --primary-color: #4361ee;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --light-bg: #f8f9fa;
  --card-bg: #ffffff;
  --text-color: #2b2d42;
  --border-color: #e9ecef;
  --success-color: #06d6a0;
  --warning-color: #ffd166;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --border-radius: 12px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.router-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-color);
  background-color: var(--light-bg);
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: var(--border-radius);
  color: white;
  box-shadow: var(--shadow);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.section {
  .section-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;

    .icon {
      font-size: 2rem;
      background: rgba(67, 97, 238, 0.1);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      font-size: 1.8rem;
      color: var(--text-color);
    }
  }
}

.card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 25px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.concept-item {
  background: rgba(67, 97, 238, 0.03);
  border-radius: 10px;
  padding: 25px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  p,
  ul {
    font-size: 1rem;
    line-height: 1.7;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 20px;

      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
      }
    }
  }
}

.strategy-tabs,
.code-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 25px;
  flex-wrap: wrap;

  button {
    padding: 12px 20px;
    background: rgba(67, 97, 238, 0.08);
    border: none;
    border-radius: 8px;
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(67, 97, 238, 0.15);
    }

    &.active {
      background: var(--primary-color);
      color: white;
    }
  }
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.strategy-item {
  background: rgba(67, 97, 238, 0.03);
  border-radius: 10px;
  padding: 25px;
  position: relative;

  .step {
    position: absolute;
    top: -15px;
    left: -15px;
    width: 40px;
    height: 40px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 25px;

      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--success-color);
        font-weight: bold;
      }
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.feature-item {
  background: rgba(67, 97, 238, 0.03);
  border-radius: 10px;
  padding: 20px;

  .icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 12px;
    color: var(--secondary-color);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 25px;

      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
      }
    }
  }
}

.implementation-diagram {
  background: rgba(58, 12, 163, 0.03);
  border-radius: 10px;
  padding: 25px;
  margin: 30px 0;

  .diagram-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
    color: var(--secondary-color);
  }

  .diagram-flow {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .flow-item {
    background: var(--primary-color);
    color: white;
    padding: 12px 25px;
    border-radius: 30px;
    font-weight: 500;
  }

  .flow-arrow {
    font-size: 1.5rem;
    color: var(--secondary-color);
    font-weight: bold;
  }
}

.code-block {
  background: #2b2d42;
  color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  pre {
    margin: 0;
    padding: 25px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 30px 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    thead {
      background: var(--primary-color);
      color: white;

      th {
        font-weight: 500;
      }
    }

    tbody tr {
      &:nth-child(odd) {
        background: rgba(67, 97, 238, 0.03);
      }

      &:hover {
        background: rgba(67, 97, 238, 0.08);
      }
    }
  }
}

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.recommend-item {
  background: rgba(67, 97, 238, 0.03);
  border-radius: 10px;
  padding: 25px;

  .icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  h5 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 25px;

      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 25px 0;
  color: #6c757d;
  font-size: 0.9rem;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .concept-grid,
  .strategy-grid,
  .feature-grid,
  .recommend-grid {
    grid-template-columns: 1fr;
  }

  .diagram-flow {
    flex-direction: column;

    .flow-arrow {
      transform: rotate(90deg);
    }
  }
}
</style>
