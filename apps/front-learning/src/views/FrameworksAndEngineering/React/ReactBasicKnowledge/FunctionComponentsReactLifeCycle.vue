<template>
  <div class="react-lifecycle-container">
    <header class="header">
      <div class="banner">
        <h1>React函数式组件生命周期</h1>
        <p class="subtitle">深入解析Hooks在组件生命周期的应用</p>
      </div>
      <div class="framework-icon">
        <div class="react-logo">⚛️</div>
      </div>
    </header>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🔄</span>
        函数式组件生命周期概述
      </h2>

      <div class="info-card">
        <p>在React函数式组件中，生命周期通过<strong>React Hooks</strong>实现：</p>

        <div class="lifecycle-map">
          <div class="phase">
            <div class="phase-header">挂载阶段(Mounting)</div>
            <div class="hooks">
              <div class="hook-card">useState</div>
              <div class="hook-card">useEffect<span class="hook-desc">(空依赖数组)</span></div>
              <div class="hook-card">useLayoutEffect<span class="hook-desc">(空依赖数组)</span></div>
            </div>
          </div>

          <div class="arrow">→</div>

          <div class="phase">
            <div class="phase-header">更新阶段(Updating)</div>
            <div class="hooks">
              <div class="hook-card">useState</div>
              <div class="hook-card">useEffect<span class="hook-desc">(有依赖数组)</span></div>
              <div class="hook-card">useLayoutEffect<span class="hook-desc">(有依赖数组)</span></div>
              <div class="hook-card">useMemo</div>
              <div class="hook-card">useCallback</div>
            </div>
          </div>

          <div class="arrow">→</div>

          <div class="phase">
            <div class="phase-header">卸载阶段(Unmounting)</div>
            <div class="hooks">
              <div class="hook-card">useEffect<span class="hook-desc">清理函数</span></div>
              <div class="hook-card">useLayoutEffect<span class="hook-desc">清理函数</span></div>
            </div>
          </div>
        </div>

        <div class="note">
          <strong>关键概念：</strong>函数式组件没有类组件中<code>componentDidMount</code>、<code>componentDidUpdate</code>等生命周期方法，而是通过<b>Hooks</b>在渲染过程和副作用管理中实现类似功能
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">📌</span>
        挂载阶段(Mounting)
      </h2>

      <div class="card-grid">
        <div class="info-card">
          <h3>触发时机</h3>
          <ul>
            <li>组件首次插入DOM</li>
            <li>组件实例被创建并渲染</li>
            <li>只执行一次</li>
          </ul>
        </div>

        <div class="info-card">
          <h3>常用Hooks</h3>
          <div class="hook-detail">
            <div class="hook-name">useState</div>
            <p>初始化组件状态</p>
          </div>
          <div class="hook-detail">
            <div class="hook-name">useEffect</div>
            <p>执行副作用操作（网络请求、订阅等）</p>
          </div>
          <div class="hook-detail">
            <div class="hook-name">useLayoutEffect</div>
            <p>同步执行DOM操作</p>
          </div>
        </div>
      </div>

      <div class="code-section">
        <h3>挂载阶段示例代码</h3>
        <div class="code-snippet">
          <pre><code>function UserProfile({ userId }) {
  // useState - 初始化状态 (挂载阶段)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect - 空依赖数组，仅在挂载时运行
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };

    fetchUser();

    // 返回的清理函数将在卸载时执行
    return () => {
      // 取消网络请求等清理操作
    };
  }, []); // 空依赖数组确保只运行一次

  // useLayoutEffect - DOM操作
  useLayoutEffect(() => {
    // 组件挂载后立即执行的DOM操作
    const element = document.getElementById('profile-header');
    if (element) {
      element.style.backgroundColor = '#f0f0f0';
    }
  }, []);

  if (loading) return &lt;div>Loading...&lt;/div>;

  return (
    &lt;div id="profile-header">
      &lt;h1>{user.name}&lt;/h1>
      &lt;p>{user.bio}&lt;/p>
    &lt;/div>
  );
}</code></pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🔄</span>
        更新阶段(Updating)
      </h2>

      <div class="card-grid">
        <div class="info-card">
          <h3>触发时机</h3>
          <ul>
            <li>状态(state)发生变化</li>
            <li>属性(props)发生变化</li>
            <li>父组件重新渲染</li>
            <li>上下文(context)值变化</li>
          </ul>
        </div>

        <div class="info-card">
          <h3>常用Hooks</h3>
          <div class="hook-detail">
            <div class="hook-name">useState</div>
            <p>更新状态并触发重新渲染</p>
          </div>
          <div class="hook-detail">
            <div class="hook-name">useEffect</div>
            <p>依赖变化时执行副作用操作</p>
          </div>
          <div class="hook-detail">
            <div class="hook-name">useMemo</div>
            <p>记忆计算结果避免重复计算</p>
          </div>
          <div class="hook-detail">
            <div class="hook-name">useCallback</div>
            <p>记忆函数避免子组件不必要的重渲染</p>
          </div>
        </div>
      </div>

      <div class="code-section">
        <h3>更新阶段示例代码</h3>
        <div class="code-snippet">
          <pre><code>function ProductList({ category }) {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');

  // useEffect - 依赖category变化时重新获取数据
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products?category=${category}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [category]); // 依赖于category

  // useMemo - 记忆过滤结果，避免重复计算
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]); // 依赖变化时重新计算

  // useCallback - 记忆事件处理函数
  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []); // 空依赖数组：函数不会改变

  return (
    &lt;>
      &lt;input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter products..."
      />
      &lt;ul>
        {filteredProducts.map(product => (
          &lt;ProductItem key={product.id} product={product} />
        ))}
      &lt;/ul>
    &lt;/>
  );
}</code></pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🗑️</span>
        卸载阶段(Unmounting)
      </h2>

      <div class="card-grid">
        <div class="info-card">
          <h3>触发时机</h3>
          <ul>
            <li>组件从DOM中移除</li>
            <li>父组件不再渲染该组件</li>
            <li>条件渲染导致组件消失</li>
          </ul>
        </div>

        <div class="info-card">
          <h3>清理机制</h3>
          <div class="hook-detail">
            <div class="hook-name">useEffect清理函数</div>
            <p>取消网络请求、定时器、事件监听等</p>
          </div>
          <div class="hook-detail">
            <div class="hook-name">useLayoutEffect清理函数</div>
            <p>同步清理DOM相关操作</p>
          </div>
        </div>
      </div>

      <div class="code-section">
        <h3>卸载清理示例代码</h3>
        <div class="code-snippet">
          <pre><code>function RealTimeDataWidget() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 创建WebSocket连接
    const socket = new WebSocket('wss://api.example.com/realtime');

    socket.addEventListener('message', (event) => {
      setData(JSON.parse(event.data));
    });

    // 清理函数 - 在组件卸载时执行
    return () => {
      // 关闭WebSocket连接
      socket.close();
      console.log('WebSocket连接已关闭');
    };
  }, []); // 空依赖数组：仅在挂载/卸载时运行

  return (
    &lt;div>
      &lt;h2>实时数据流&lt;/h2>
      {/* 渲染数据 */}
    &lt;/div>
  );
}</code></pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">⏱️</span>
        useEffect vs useLayoutEffect
      </h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>useEffect</th>
              <th>useLayoutEffect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>执行时机</td>
              <td>在浏览器绘制后异步执行</td>
              <td>在DOM更新后、浏览器绘制前同步执行</td>
            </tr>
            <tr>
              <td>使用场景</td>
              <td>数据获取、订阅、事件监听等副作用</td>
              <td>需要同步读取或操作DOM的场景</td>
            </tr>
            <tr>
              <td>性能影响</td>
              <td>不会阻塞浏览器渲染</td>
              <td>可能阻塞浏览器渲染</td>
            </tr>
            <tr>
              <td>代码示例</td>
              <td class="code-cell">
                useEffect(() => {<br>
                &nbsp;&nbsp;// 数据获取<br>
                &nbsp;&nbsp;fetchData();<br>
                }, []);
              </td>
              <td class="code-cell">
                useLayoutEffect(() => {<br>
                &nbsp;&nbsp;// DOM测量/操作<br>
                &nbsp;&nbsp;const width = ref.current.offsetWidth;<br>
                &nbsp;&nbsp;setWidth(width);<br>
                }, []);
              </td>
            </tr>
            <tr>
              <td>使用频率</td>
              <td>⭐️⭐️⭐️⭐️⭐️ (常用)</td>
              <td>⭐️⭐️⭐️ (特殊场景)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="phase-diagram">
        <div class="phase-stage">
          <div class="phase-label">1. 渲染</div>
          <div class="phase-box">React渲染组件</div>
        </div>

        <div class="arrow">→</div>

        <div class="phase-stage">
          <div class="phase-label">2. 提交到DOM</div>
          <div class="phase-box">DOM更新</div>
        </div>

        <div class="arrow">→</div>

        <div class="phase-stage layout-phase">
          <div class="phase-label">useLayoutEffect</div>
          <div class="phase-box">同步执行</div>
        </div>

        <div class="arrow">→</div>

        <div class="phase-stage">
          <div class="phase-label">3. 浏览器绘制</div>
          <div class="phase-box">页面可见</div>
        </div>

        <div class="arrow">→</div>

        <div class="phase-stage effect-phase">
          <div class="phase-label">useEffect</div>
          <div class="phase-box">异步执行</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">💡</span>
        最佳实践与常见问题
      </h2>

      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">✅</div>
          <h3>生命周期优化技巧</h3>
          <ul>
            <li><strong>依赖数组精确：</strong>确保useEffect依赖数组包含所有变化的值</li>
            <li><strong>清理资源：</strong>始终清理定时器、订阅和网络请求</li>
            <li><strong>避免无限循环：</strong>不要在没有依赖数组的情况下更新状态</li>
            <li><strong>按需使用：</strong>useLayoutEffect仅在需要同步DOM操作时使用</li>
          </ul>
        </div>

        <div class="tip-card">
          <div class="tip-icon">⚠️</div>
          <h3>常见错误</h3>
          <ul>
            <li><strong>遗漏依赖：</strong>导致状态过期(stale state)</li>
            <li><strong>不必要的依赖：</strong>导致频繁重新运行副作用</li>
            <li><strong>忘记清理：</strong>导致内存泄漏</li>
            <li><strong>滥用useEffect：</strong>将事件处理逻辑放在useEffect中</li>
          </ul>
        </div>

        <div class="tip-card">
          <div class="tip-icon">🚀</div>
          <h3>性能优化</h3>
          <ul>
            <li>使用<code>useMemo</code>缓存昂贵计算</li>
            <li>使用<code>useCallback</code>避免子组件不必要重渲染</li>
            <li>使用<code>React.memo</code>记忆组件</li>
            <li>复杂组件使用<code>useReducer</code>管理状态</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="conclusion">
      <div class="summary">
        <h2>React函数式组件生命周期核心要点</h2>
        <ul>
          <li><strong>挂载阶段：</strong>使用<code>useEffect</code>空依赖数组执行初始化操作，类似<code>componentDidMount</code></li>
          <li><strong>更新阶段：</strong>使用带依赖数组的<code>useEffect</code>响应变化，类似<code>componentDidUpdate</code></li>
          <li><strong>卸载阶段：</strong>通过<code>useEffect</code>返回的清理函数执行资源释放，类似<code>componentWillUnmount</code></li>
          <li><strong>DOM操作：</strong>使用<code>useLayoutEffect</code>进行同步DOM操作</li>
          <li><strong>性能优化：</strong><code>useMemo</code>和<code>useCallback</code>避免不必要计算和渲染</li>
        </ul>
      </div>

      <div class="callout">
        <p>理解函数式组件的生命周期是掌握React现代开发的关键</p>
        <p class="highlight">正确管理组件生命周期可以避免内存泄漏、提高性能并创建更稳定的应用</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里不需要实际逻辑，仅用于演示
import { ref } from 'vue';

const activeTab = ref('mounting');
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #61dafb;
@secondary-color: #20232a;
@text-primary: #2c3e50;
@text-secondary: #5c677d;
@border-color: #e1e4e8;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@mount-color: #61dafb;
@update-color: #42b983;
@unmount-color: #ff6b6b;
@effect-color: #cc7b94;
@layout-effect-color: #3498db;
@warning-color: #ff9800;

.react-lifecycle-container {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 35px;
  border: 1px solid fade(@primary-color, 15%);

  .banner {
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      color: @secondary-color;
    }

    .subtitle {
      font-size: 1.3rem;
      color: @text-secondary;
    }
  }

  .framework-icon {
    .react-logo {
      font-size: 6rem;
      opacity: 0.9;
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.7rem;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid fade(@primary-color, 10%);
    display: flex;
    align-items: center;
    gap: 12px;

    .icon {
      font-size: 1.5rem;
    }
  }
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.info-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;

  h3 {
    margin-top: 0;
    color: @secondary-color;
    font-size: 1.3rem;
    border-bottom: 1px solid fade(@border-color, 50%);
    padding-bottom: 10px;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
      position: relative;

      &::before {
        content: "•";
        position: absolute;
        left: -15px;
        color: @primary-color;
        font-weight: bold;
      }
    }
  }
}

.lifecycle-map {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  flex-wrap: wrap;
  margin: 25px 0;

  .phase {
    background: white;
    border-radius: 12px;
    padding: 20px;
    min-width: 220px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    text-align: center;

    .phase-header {
      font-weight: 700;
      font-size: 1.2rem;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid @border-color;
    }
  }

  .mounting {
    border-top: 4px solid @mount-color;
  }

  .updating {
    border-top: 4px solid @update-color;
  }

  .unmounting {
    border-top: 4px solid @unmount-color;
  }

  .arrow {
    font-size: 2rem;
    color: @text-secondary;
    opacity: 0.7;
  }

  .hook-card {
    background: fade(@primary-color, 10%);
    padding: 10px 15px;
    border-radius: 30px;
    margin: 8px auto;
    font-weight: 500;
    font-family: 'Fira Code', monospace;

    .hook-desc {
      font-size: 0.8rem;
      margin-left: 5px;
      opacity: 0.7;
    }
  }
}

.hook-detail {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dashed @border-color;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .hook-name {
    font-family: 'Fira Code', monospace;
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 5px;
  }
}

.code-section {
  margin-top: 30px;

  h3 {
    font-size: 1.3rem;
    color: @secondary-color;
    margin-bottom: 15px;
  }
}

.code-snippet {
  background: #282c34;
  color: #abb2bf;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow-x: auto;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.comparison-table {
  overflow-x: auto;
  margin: 30px 0;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background-color: fade(@primary-color, 8%);
      color: @secondary-color;
      font-weight: 600;
    }

    tr {
      &:hover {
        background-color: fade(@primary-color, 3%);
      }
    }

    .code-cell {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
}

.phase-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 40px 0;

  .phase-stage {
    background: white;
    border-radius: 8px;
    padding: 15px;
    min-width: 140px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-top: 4px solid @primary-color;

    .phase-label {
      font-weight: 600;
      margin-bottom: 10px;
      color: @secondary-color;
    }

    .phase-box {
      font-size: 0.9rem;
      color: @text-secondary;
    }
  }

  .layout-phase {
    border-top-color: @layout-effect-color;
    background: fade(@layout-effect-color, 8%);
  }

  .effect-phase {
    border-top-color: @effect-color;
    background: fade(@effect-color, 8%);
  }

  .arrow {
    font-size: 1.5rem;
    color: @text-secondary;
    opacity: 0.7;
  }
}

.tip-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;

  .tip-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    margin-top: 0;
    color: @secondary-color;
    font-size: 1.3rem;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 12px;
      position: relative;

      strong {
        color: @secondary-color;
      }
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 35px;
  border: 1px solid fade(@primary-color, 15%);

  .summary {
    max-width: 800px;
    margin: 0 auto;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      margin-top: 0;
      margin-bottom: 25px;
      color: @secondary-color;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 15px;
        padding-left: 10px;
        position: relative;

        &::before {
          content: "•";
          position: absolute;
          left: -10px;
          color: @primary-color;
          font-weight: bold;
        }

        strong {
          color: @secondary-color;
        }
      }
    }
  }

  .callout {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    padding: 20px;
    margin-top: 30px;
    text-align: center;

    p {
      margin: 10px 0;
      font-size: 1.1rem;
    }

    .highlight {
      font-size: 1.3rem;
      font-weight: 600;
      color: @primary-color;
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
    padding: 20px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }

    .framework-icon {
      margin-top: 20px;
    }
  }

  .section {
    padding: 20px 15px;

    .section-title {
      font-size: 1.5rem;
    }
  }

  .lifecycle-map {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 15px 0;
    }
  }

  .phase-diagram {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 15px 0;
    }
  }
}
</style>
