<template>
  <div class="communication-container">
    <header class="header">
      <h1>React 组件通信基本介绍</h1>
      <p class="subtitle">掌握 8 种组件通信方式及其最佳实践</p>
    </header>

    <div class="content-wrapper">
      <!-- 通信方式概览 -->
      <section class="section overview">
        <div class="section-header">
          <div class="icon">🔗</div>
          <h2>组件通信方式概览</h2>
        </div>

        <div class="card">
          <div class="methods-grid">
            <div class="method-card" v-for="(method, index) in methods" :key="index">
              <div class="method-icon" :style="{ backgroundColor: method.color }">
                {{ method.icon }}
              </div>
              <h3>{{ method.name }}</h3>
              <p>{{ method.desc }}</p>
              <div class="method-tags">
                <span v-for="(tag, tagIndex) in method.tags" :key="tagIndex">{{ tag }}</span>
              </div>
            </div>
          </div>

          <div class="complexity-chart">
            <h3>通信方式复杂度对比</h3>
            <div class="chart">
              <div v-for="(method, index) in methods" :key="index" class="chart-item">
                <div class="method-name">{{ method.name }}</div>
                <div class="chart-bar">
                  <div class="bar" :style="{
                    width: `${method.complexity * 20}%`,
                    backgroundColor: method.color
                  }"></div>
                </div>
                <div class="complexity-value">{{ method.complexity }}/5</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 详细通信方式 -->
      <section class="section details">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>通信方式基础介绍</h2>
        </div>

        <div class="tabs">
          <button v-for="(method, index) in methods" :key="index" :class="{ active: activeMethod === index }"
            @click="activeMethod = index">
            {{ method.name }}
          </button>
        </div>

        <!-- Props 通信 -->
        <div v-show="activeMethod === 0" class="method-detail">
          <div class="method-header">
            <div class="icon" style="background-color: #4361ee;">1</div>
            <h3>Props 通信</h3>
            <div class="method-badge">父子组件通信</div>
          </div>

          <div class="method-content">
            <div class="method-info">
              <h4>基本介绍</h4>
              <p>Props（属性）是 React 中最基本的组件通信方式，通过父组件向子组件传递数据。</p>

              <h4>工作原理</h4>
              <ul>
                <li>父组件通过属性向子组件传递数据</li>
                <li>子组件通过 props 对象接收数据</li>
                <li>Props 是只读的，子组件不能直接修改</li>
                <li>当 props 变化时，子组件会重新渲染</li>
              </ul>

              <h4>使用场景</h4>
              <ul>
                <li>父组件向子组件传递数据</li>
                <li>配置子组件的行为和外观</li>
                <li>传递回调函数让子组件与父组件通信</li>
                <li>简单的组件层级关系</li>
              </ul>
            </div>

            <div class="method-diagram">
              <div class="parent">
                <div class="component">父组件</div>
                <div class="props">
                  <div class="prop">数据</div>
                  <div class="arrow">↓</div>
                </div>
              </div>
              <div class="child">
                <div class="component">子组件</div>
              </div>
            </div>
          </div>

          <div class="code-examples">
            <div class="code-example">
              <h4>父组件传递数据</h4>
              <pre><code class="javascript">function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;h2&gt;父组件&lt;/h2&gt;
      &lt;ChildComponent
        count={count}
        onIncrement={() => setCount(count + 1)}
      /&gt;
    &lt;/div&gt;
  );
}</code></pre>
            </div>

            <div class="code-example">
              <h4>子组件接收数据</h4>
              <pre><code class="javascript">function ChildComponent({ count, onIncrement }) {
  return (
    &lt;div&gt;
      &lt;h3&gt;子组件&lt;/h3&gt;
      &lt;p&gt;计数: {count}&lt;/p&gt;
      &lt;button onClick={onIncrement}&gt;增加&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
            </div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>简单直观，符合 React 单向数据流</li>
                <li>易于理解和调试</li>
                <li>类型安全（结合 TypeScript）</li>
                <li>适用于大多数父子组件场景</li>
              </ul>
            </div>

            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>只能用于父子组件通信</li>
                <li>多层嵌套时会出现 "props drilling" 问题</li>
                <li>过多的 props 会使组件难以维护</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Context API -->
        <div v-show="activeMethod === 1" class="method-detail">
          <div class="method-header">
            <div class="icon" style="background-color: #3a0ca3;">2</div>
            <h3>Context API</h3>
            <div class="method-badge">跨层级通信</div>
          </div>

          <div class="method-content">
            <div class="method-info">
              <h4>基本介绍</h4>
              <p>Context 提供了一种在组件树中共享数据的方式，避免通过中间元素逐层传递 props。</p>

              <h4>工作原理</h4>
              <ul>
                <li>创建 Context 对象</li>
                <li>使用 Provider 提供数据</li>
                <li>在子组件中使用 Consumer 或 useContext Hook 消费数据</li>
                <li>当 Context 值变化时，消费组件会重新渲染</li>
              </ul>

              <h4>使用场景</h4>
              <ul>
                <li>主题切换（深色/浅色模式）</li>
                <li>用户认证信息共享</li>
                <li>多语言国际化</li>
                <li>全局配置设置</li>
                <li>避免多层 props 传递</li>
              </ul>
            </div>

            <div class="method-diagram">
              <div class="context-provider">
                <div class="component">Provider</div>
                <div class="context-data">Context 数据</div>
              </div>
              <div class="tree">
                <div class="component">组件A</div>
                <div class="component">组件B</div>
                <div class="component consumer">组件C (Consumer)</div>
                <div class="component">组件D</div>
                <div class="component consumer">组件E (Consumer)</div>
              </div>
            </div>
          </div>

          <div class="code-examples">
            <div class="code-example">
              <h4>创建 Context</h4>
              <pre><code class="javascript">import React, { createContext, useState, useContext } from 'react';

// 创建 Context
const ThemeContext = createContext();

// 创建 Provider 组件
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    &lt;ThemeContext.Provider value=&#123;&#123; theme, toggleTheme &#125;&#125;&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
}</code></pre>
            </div>

            <div class="code-example">
              <h4>使用 Context</h4>
              <pre><code class="javascript">// 在应用顶层使用 Provider
function App() {
  return (
    &lt;ThemeProvider&gt;
      &lt;Header /&gt;
      &lt;MainContent /&gt;
      &lt;Footer /&gt;
    &lt;/ThemeProvider&gt;
  );
}

// 在子组件中使用 Context
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    &lt;header className={`header-${theme}`}&gt;
      &lt;button onClick={toggleTheme}&gt;
        切换主题: {theme === 'light' ? '🌞' : '🌙'}
      &lt;/button&gt;
    &lt;/header&gt;
  );
}</code></pre>
            </div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>解决 props drilling 问题</li>
                <li>跨层级组件通信</li>
                <li>使用简单，React 内置支持</li>
                <li>结合 useContext Hook 非常简洁</li>
              </ul>
            </div>

            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>过度使用会使组件复用性降低</li>
                <li>Provider 值变化会导致所有消费者重新渲染</li>
                <li>不适合高频更新的数据</li>
                <li>调试相对复杂</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Redux -->
        <div v-show="activeMethod === 2" class="method-detail">
          <div class="method-header">
            <div class="icon" style="background-color: #f72585;">3</div>
            <h3>Redux</h3>
            <div class="method-badge">状态管理</div>
          </div>

          <div class="method-content">
            <div class="method-info">
              <h4>基本介绍</h4>
              <p>Redux 是 JavaScript 应用的可预测状态容器，用于管理全局应用状态。</p>

              <h4>核心概念</h4>
              <ul>
                <li><strong>Store</strong>: 保存应用状态的单一数据源</li>
                <li><strong>Action</strong>: 描述发生的事件</li>
                <li><strong>Reducer</strong>: 纯函数，根据 action 更新状态</li>
                <li><strong>Dispatch</strong>: 触发 action 的方法</li>
              </ul>

              <h4>使用场景</h4>
              <ul>
                <li>大型复杂应用的状态管理</li>
                <li>需要全局访问的状态</li>
                <li>需要时间旅行调试的应用</li>
                <li>需要中间件处理异步逻辑</li>
                <li>跨组件共享状态</li>
              </ul>
            </div>

            <div class="method-diagram">
              <div class="redux-flow">
                <div class="component">组件</div>
                <div class="arrow">Dispatch →</div>
                <div class="component">Action</div>
                <div class="arrow">→</div>
                <div class="component">Reducer</div>
                <div class="arrow">→</div>
                <div class="component">Store</div>
                <div class="arrow">→ 状态更新 →</div>
                <div class="component">组件</div>
              </div>
            </div>
          </div>

          <div class="code-examples">
            <div class="code-example">
              <h4>创建 Store</h4>
              <pre><code class="javascript">import { createStore } from 'redux';

// 初始状态
const initialState = { count: 0 };

// Reducer 函数
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// 创建 Store
const store = createStore(counterReducer);</code></pre>
            </div>

            <div class="code-example">
              <h4>在 React 中使用</h4>
              <pre><code class="javascript">import { Provider, useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    &lt;div&gt;
      &lt;h2&gt;计数器: {count}&lt;/h2&gt;
      &lt;button onClick={() => dispatch({ type: 'INCREMENT' })}&gt;增加&lt;/button&gt;
      &lt;button onClick={() => dispatch({ type: 'DECREMENT' })}&gt;减少&lt;/button&gt;
    &lt;/div&gt;
  );
}

function App() {
  return (
    &lt;Provider store={store}&gt;
      &lt;Counter /&gt;
    &lt;/Provider&gt;
  );
}</code></pre>
            </div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>单一数据源，状态可预测</li>
                <li>强大的调试能力（时间旅行）</li>
                <li>丰富的中间件生态系统</li>
                <li>适用于大型复杂应用</li>
              </ul>
            </div>

            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>学习曲线陡峭</li>
                <li>需要编写大量模板代码</li>
                <li>小型项目中使用可能过度复杂</li>
                <li>状态更新可能导致不必要的重新渲染</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 其他通信方式 -->
        <div v-show="activeMethod === 3" class="method-detail">
          <div class="method-header">
            <div class="icon" style="background-color: #4cc9f0;">4</div>
            <h3>其他通信方式</h3>
            <div class="method-badge">灵活选择</div>
          </div>

          <div class="other-methods">
            <div class="method-card">
              <div class="icon" style="background-color: #7209b7;">📤</div>
              <h4>事件总线 (Event Bus)</h4>
              <p>使用发布-订阅模式实现组件间通信</p>
              <pre><code class="javascript">// 创建事件总线
const EventBus = {
  events: {},
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(data));
    }
  },
  on(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }
};

// 组件A 发送事件
EventBus.emit('user-updated', user);

// 组件B 监听事件
EventBus.on('user-updated', (user) => {
  setUser(user);
});</code></pre>
              <div class="method-scene">场景: 任意组件间通信，但需谨慎使用</div>
            </div>

            <div class="method-card">
              <div class="icon" style="background-color: #f77f00;">📦</div>
              <h4>状态提升 (State Lifting)</h4>
              <p>将共享状态提升到最近的共同父组件</p>
              <pre><code class="javascript">function Parent() {
  const [count, setCount] = useState(0);

  return (
    &lt;&gt;
      &lt;ChildA count={count} /&gt;
      &lt;ChildB setCount={setCount} /&gt;
    &lt;/&gt;
  );
}

function ChildA({ count }) {
  return &lt;div&gt;计数: {count}&lt;/div&gt;;
}

function ChildB({ setCount }) {
  return &lt;button onClick={() => setCount(c => c + 1)}&gt;增加&lt;/button&gt;;
}</code></pre>
              <div class="method-scene">场景: 兄弟组件间通信</div>
            </div>

            <div class="method-card">
              <div class="icon" style="background-color: #06d6a0;">🔄</div>
              <h4>Ref 与 ForwardRef</h4>
              <p>使用 ref 直接访问组件实例或 DOM 元素</p>
              <pre><code class="javascript">// 父组件
function Parent() {
  const childRef = useRef();

  const handleClick = () => {
    childRef.current.focus();
  };

  return (
    &lt;&gt;
      &lt;button onClick={handleClick}&gt;聚焦输入框&lt;/button&gt;
      &lt;Child ref={childRef} /&gt;
    &lt;/&gt;
  );
}

// 子组件
const Child = forwardRef((props, ref) => {
  return &lt;input ref={ref} /&gt;;
});</code></pre>
              <div class="method-scene">场景: 父组件操作子组件DOM或方法</div>
            </div>

            <div class="method-card">
              <div class="icon" style="background-color: #ef476f;">🪝</div>
              <h4>自定义 Hooks</h4>
              <p>创建可复用的状态逻辑进行组件间通信</p>
              <pre><code class="javascript">// 创建自定义 Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);

  return { count, increment, decrement };
}

// 在多个组件中使用
function ComponentA() {
  const { count, increment } = useCounter();
  // ...
}

function ComponentB() {
  const { count, decrement } = useCounter();
  // ...
}</code></pre>
              <div class="method-scene">场景: 共享状态逻辑，非状态本身</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 选择指南 -->
      <section class="section selection">
        <div class="section-header">
          <div class="icon">✅</div>
          <h2>通信方式选择指南</h2>
        </div>

        <div class="card">
          <div class="selection-grid">
            <div class="scenario-card">
              <div class="icon">👪</div>
              <h3>父子组件通信</h3>
              <ul>
                <li><strong>简单数据传递</strong>: Props</li>
                <li><strong>操作子组件</strong>: Ref + ForwardRef</li>
                <li><strong>回调通信</strong>: Props 传递函数</li>
              </ul>
            </div>

            <div class="scenario-card">
              <div class="icon">👬</div>
              <h3>兄弟组件通信</h3>
              <ul>
                <li><strong>共享父组件状态</strong>: 状态提升</li>
                <li><strong>复杂场景</strong>: Context 或 Redux</li>
                <li><strong>临时解决方案</strong>: 事件总线</li>
              </ul>
            </div>

            <div class="scenario-card">
              <div class="icon">🌐</div>
              <h3>跨层级组件通信</h3>
              <ul>
                <li><strong>主题/全局配置</strong>: Context API</li>
                <li><strong>用户认证状态</strong>: Context 或 Redux</li>
                <li><strong>复杂应用状态</strong>: Redux</li>
              </ul>
            </div>

            <div class="scenario-card">
              <div class="icon">🚀</div>
              <h3>大型应用通信</h3>
              <ul>
                <li><strong>状态管理</strong>: Redux, MobX, Zustand</li>
                <li><strong>异步处理</strong>: Redux + Thunk/Saga</li>
                <li><strong>性能优化</strong>: 选择合适的状态管理库</li>
              </ul>
            </div>
          </div>

          <div class="selection-chart">
            <h3>通信方式适用场景矩阵</h3>
            <table>
              <thead>
                <tr>
                  <th>通信方式</th>
                  <th>父子组件</th>
                  <th>兄弟组件</th>
                  <th>跨层级</th>
                  <th>全局状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Props</td>
                  <td>⭐️⭐️⭐️⭐️⭐️</td>
                  <td>❌</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td>Context API</td>
                  <td>⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️</td>
                </tr>
                <tr>
                  <td>Redux</td>
                  <td>⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️⭐️⭐️</td>
                </tr>
                <tr>
                  <td>状态提升</td>
                  <td>⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️⭐️</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td>事件总线</td>
                  <td>⭐️⭐️</td>
                  <td>⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>React 组件通信基本介绍 | 掌握多种通信方式 | 使用 Vue3(TS + Setup) 实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeMethod = ref(0);

const methods = [
  {
    name: "Props 通信",
    icon: "📤",
    color: "#4361ee",
    desc: "父组件通过属性向子组件传递数据和回调函数",
    tags: ["父子通信", "简单直接"],
    complexity: 1
  },
  {
    name: "Context API",
    icon: "🌐",
    color: "#3a0ca3",
    desc: "跨层级组件共享数据，避免 props drilling",
    tags: ["跨层级", "内置支持"],
    complexity: 3
  },
  {
    name: "Redux",
    icon: "🔄",
    color: "#f72585",
    desc: "可预测的状态管理容器，适合大型应用",
    tags: ["全局状态", "复杂应用"],
    complexity: 4
  },
  {
    name: "其他方式",
    icon: "➕",
    color: "#4cc9f0",
    desc: "事件总线、状态提升、Refs、自定义 Hooks 等",
    tags: ["灵活方案", "特殊场景"],
    complexity: 2
  }
];
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css');

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

.communication-container {
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
    color: #000000;
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

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.method-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .method-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: white;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: var(--secondary-color);
  }

  p {
    color: #666;
    margin-bottom: 15px;
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

.method-tags {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;

  span {
    background: rgba(67, 97, 238, 0.1);
    color: var(--primary-color);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }
}

.complexity-chart {
  background: rgba(67, 97, 238, 0.03);
  border-radius: 10px;
  padding: 25px;

  h3 {
    text-align: center;
    font-size: 1.4rem;
    margin-bottom: 25px;
    color: var(--secondary-color);
  }
}

.chart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  .method-name {
    width: 120px;
    font-weight: 500;
  }

  .chart-bar {
    flex: 1;
    height: 20px;
    background: #e9ecef;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 15px;

    .bar {
      height: 100%;
      border-radius: 10px;
    }
  }

  .complexity-value {
    width: 60px;
    text-align: right;
    font-weight: 500;
    color: var(--secondary-color);
  }
}

.tabs {
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
      color: rgb(241, 180, 180);
    }
  }
}

.method-detail {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.method-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.8rem;
    color: var(--secondary-color);
  }
}

.method-badge {
  background: var(--primary-color);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-left: auto;
}

.method-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
}

.method-info {
  h4 {
    font-size: 1.3rem;
    margin: 20px 0 15px;
    color: var(--secondary-color);
    position: relative;
    padding-left: 15px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 6px;
      height: 20px;
      background: var(--primary-color);
      border-radius: 3px;
    }

    &:first-child {
      margin-top: 0;
    }
  }

  p,
  ul {
    margin-bottom: 15px;
    line-height: 1.7;
  }

  ul {
    padding-left: 25px;

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

.method-diagram {
  background: rgba(67, 97, 238, 0.03);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .parent,
  .child,
  .context-provider,
  .tree {
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    margin: 10px;
  }

  .parent {
    background: rgba(67, 97, 238, 0.1);
  }

  .child {
    background: rgba(67, 97, 238, 0.05);
  }

  .component {
    background: white;
    padding: 15px;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    margin: 10px 0;

    &.consumer {
      background: rgba(6, 214, 160, 0.1);
    }
  }

  .props {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;

    .prop {
      background: var(--primary-color);
      color: white;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
    }

    .arrow {
      margin: 10px 0;
      color: var(--primary-color);
      font-size: 1.2rem;
    }
  }

  .context-provider {
    background: rgba(58, 12, 163, 0.1);
  }

  .context-data {
    background: rgba(58, 12, 163, 0.2);
    padding: 10px;
    border-radius: 6px;
    margin-top: 10px;
  }

  .tree {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    width: 100%;
  }

  .redux-flow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .component,
    .arrow {
      margin: 5px;
    }

    .arrow {
      color: var(--primary-color);
      font-weight: bold;
    }
  }
}

.code-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.code-example {
  h4 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: var(--secondary-color);
  }

  pre {
    background: #2b2d42;
    color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  background: rgba(67, 97, 238, 0.03);
  border-radius: 8px;
  padding: 25px;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  ul {
    padding-left: 25px;

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

  .pros {
    ul li:before {
      color: var(--success-color);
    }
  }

  .cons {
    ul li:before {
      color: #ef476f;
    }
  }
}

.other-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.method-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    margin: 0 auto 15px;
  }

  h4 {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  p {
    text-align: center;
    margin-bottom: 15px;
    color: #666;
  }

  pre {
    background: #2b2d42;
    color: white;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
    }
  }
}

.method-scene {
  background: rgba(67, 97, 238, 0.05);
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 500;
  text-align: center;
}

.selection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.scenario-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  ul {
    text-align: left;
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

      strong {
        color: var(--secondary-color);
      }
    }
  }
}

.selection-chart {
  background: rgba(67, 97, 238, 0.03);
  border-radius: 10px;
  padding: 25px;

  h3 {
    text-align: center;
    font-size: 1.4rem;
    margin-bottom: 25px;
    color: var(--secondary-color);
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 15px;
      text-align: center;
    }

    thead {
      background: rgba(67, 97, 238, 0.1);

      th {
        font-weight: 600;
        color: var(--secondary-color);
      }
    }

    tbody tr {
      border-bottom: 1px solid var(--border-color);

      &:nth-child(even) {
        background: rgba(0, 0, 0, 0.02);
      }

      td:first-child {
        font-weight: 500;
        text-align: left;
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

  .methods-grid,
  .code-examples,
  .pros-cons,
  .other-methods,
  .selection-grid {
    grid-template-columns: 1fr;
  }

  .method-content {
    grid-template-columns: 1fr;
  }

  .selection-chart {
    overflow-x: auto;

    table {
      min-width: 600px;
    }
  }
}
</style>
