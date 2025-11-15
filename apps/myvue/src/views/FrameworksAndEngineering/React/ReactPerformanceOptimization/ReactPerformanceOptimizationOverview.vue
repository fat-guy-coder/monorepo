<template>
  <div class="react-optimization-container">
    <header>
      <h1>React性能优化指南</h1>
      <p class="subtitle">提升React应用性能的关键技术与实践</p>
    </header>

    <div class="hero-section">
      <div class="hero-content">
        <h2>构建高效React应用的全面解决方案</h2>
        <p>从渲染优化到资源管理，掌握提升React应用性能的核心技术</p>
      </div>
      <div class="performance-stats">
        <div class="stat-card">
          <div class="stat-value">60%+</div>
          <div class="stat-label">渲染时间减少</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">40%+</div>
          <div class="stat-label">内存使用降低</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">50%+</div>
          <div class="stat-label">打包体积优化</div>
        </div>
      </div>
    </div>

    <div class="optimization-grid">
      <!-- 组件优化部分 -->
      <section class="section">
        <h2>组件级优化技术</h2>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">1</div>
            <h3>React.memo</h3>
          </div>
          <p>通过记忆化组件避免不必要的重新渲染</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>纯展示组件</li>
              <li>频繁重新渲染的组件</li>
              <li>接受复杂props的组件</li>
            </ul>

            <h4>示例代码：</h4>
            <div class="code-block">
              <pre>import React, { memo } from 'react';

const UserProfile = ({ user }) => (
  &lt;div&gt;
    &lt;h4&gt;{user.name}&lt;/h4&gt;
    &lt;p&gt;{user.email}&lt;/p&gt;
  &lt;/div&gt;
);

// 使用memo包裹组件
export default memo(UserProfile);</pre>
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">2</div>
            <h3>useMemo & useCallback</h3>
          </div>
          <p>避免不必要的重新计算和函数创建</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>复杂计算的结果缓存</li>
              <li>避免函数作为props时的重新创建</li>
              <li>优化依赖数组中的引用类型</li>
            </ul>

            <h4>示例代码：</h4>
            <div class="code-block">
              <pre>import React, { useMemo, useCallback } from 'react';

function ProductList({ products, onSelect }) {
  // 缓存计算密集型操作的结果
  const totalPrice = useMemo(() => {
    return products.reduce((sum, product) => sum + product.price, 0);
  }, [products]);

  // 缓存函数引用
  const handleSelect = useCallback((productId) => {
    onSelect(productId);
  }, [onSelect]);

  return (
    &lt;div&gt;
      &lt;h3&gt;总价: {totalPrice}&lt;/h3&gt;
      {products.map(product => (
        &lt;ProductItem
          key={product.id}
          product={product}
          onSelect={handleSelect}
        /&gt;
      ))}
    &lt;/div&gt;
  );
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 渲染优化部分 -->
      <section class="section">
        <h2>渲染优化技术</h2>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">3</div>
            <h3>虚拟化长列表</h3>
          </div>
          <p>只渲染可视区域内的列表项</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>包含大量数据的列表/表格</li>
              <li>无限滚动场景</li>
              <li>大型数据集展示</li>
            </ul>

            <h4>示例代码：</h4>
            <div class="code-block">
              <pre>import React from 'react';
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  &lt;div style={style}&gt;
    Row {index}
  &lt;/div&gt;
);

const VirtualizedList = () => (
  &lt;List
    height={500}
    itemCount={10000}
    itemSize={35}
    width={300}
  &gt;
    {Row}
  &lt;/List&gt;
);

export default VirtualizedList;</pre>
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">4</div>
            <h3>避免内联函数和对象</h3>
          </div>
          <p>减少props变化导致的重新渲染</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>传递给子组件的回调函数</li>
              <li>作为props的对象/数组</li>
              <li>样式对象传递</li>
            </ul>

            <h4>示例代码：</h4>
            <div class="code-block">
              <pre>// 避免内联函数
// 不推荐：&lt;button onClick={() => handleClick(id)}&gt;Click&lt;/button&gt;

// 推荐做法：
function MyComponent({ id }) {
  const handleClick = useCallback(() => {
    // 处理点击
  }, [id]);

  return &lt;button onClick={handleClick}&gt;Click&lt;/button&gt;;
}

// 避免内联样式对象
// 不推荐：&lt;div style=&#123;&#123; color: 'red', padding: '10px' &#125;&#125;&gt;

// 推荐做法：
const styles = {
  container: {
    color: 'red',
    padding: '10px'
  }
};

function MyComponent() {
  return &lt;div style={styles.container}&gt;Content&lt;/div&gt;;
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 资源优化部分 -->
      <section class="section">
        <h2>资源优化技术</h2>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">5</div>
            <h3>代码分割</h3>
          </div>
          <p>按需加载应用代码</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>大型应用初始化优化</li>
              <li>路由级别的组件加载</li>
              <li>非关键功能延迟加载</li>
            </ul>

            <h4>示例代码：</h4>
            <div class="code-block">
              <pre>import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 使用React.lazy动态导入组件
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    &lt;Router&gt;
      &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
        &lt;Routes&gt;
          &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
          &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
          &lt;Route path="/contact" element={&lt;Contact /&gt;} /&gt;
        &lt;/Routes&gt;
      &lt;/Suspense&gt;
    &lt;/Router&gt;
  );
}

export default App;</pre>
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">6</div>
            <h3>图片和资源优化</h3>
          </div>
          <p>减少资源加载时间和体积</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>图像密集型应用</li>
              <li>移动端应用优化</li>
              <li>低带宽环境优化</li>
            </ul>

            <h4>优化策略：</h4>
            <div class="code-block">
              <pre>// 1. 使用现代图像格式（WebP, AVIF）
// 2. 实施图片懒加载
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

&lt;LazyLoadImage
  src="image.jpg"
  alt="Description"
  effect="blur"
  placeholderSrc="placeholder.jpg"
/&gt;

// 3. 使用CDN加速资源加载
// 4. 压缩和优化静态资源
// 5. 使用资源预加载
&lt;link rel="preload" href="critical.css" as="style" /&gt;
&lt;link rel="prefetch" href="next-page.js" as="script" /&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 状态管理优化 -->
      <section class="section">
        <h2>状态管理优化</h2>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">7</div>
            <h3>状态提升与下降</h3>
          </div>
          <p>合理组织状态位置减少渲染范围</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>组件树中状态位置不合理</li>
              <li>父组件状态导致子组件频繁渲染</li>
              <li>多个组件需要访问同一状态</li>
            </ul>

            <h4>优化策略：</h4>
            <div class="code-block">
              <pre>// 状态提升：将状态移动到最近的共同祖先
function ParentComponent() {
  const [value, setValue] = useState('');

  return (
    &lt;&gt;
      &lt;ChildA value={value} onChange={setValue} /&gt;
      &lt;ChildB value={value} /&gt;
    &lt;/&gt;
  );
}

// 状态下降：将状态移动到更具体的子组件
function FormComponent() {
  // 将输入框状态下降到具体组件
  return (
    &lt;form&gt;
      &lt;InputField /&gt;
      &lt;SubmitButton /&gt;
    &lt;/form&gt;
  );
}

function InputField() {
  const [value, setValue] = useState('');
  return &lt;input value={value} onChange={e => setValue(e.target.value)} /&gt;;
}</pre>
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">8</div>
            <h3>使用状态管理库优化</h3>
          </div>
          <p>高效管理全局状态</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>大型应用中跨组件状态共享</li>
              <li>需要状态持久化的场景</li>
              <li>复杂状态逻辑的场景</li>
            </ul>

            <h4>优化策略：</h4>
            <div class="code-block">
              <pre>// 使用Redux Toolkit进行状态管理
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
  }
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// React组件中使用
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    &lt;div&gt;
      &lt;button onClick={() => dispatch(counterSlice.actions.decrement())}&gt;-&lt;/button&gt;
      &lt;span&gt;{count}&lt;/span&gt;
      &lt;button onClick={() => dispatch(counterSlice.actions.increment())}&gt;+&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能分析 -->
      <section class="section">
        <h2>性能分析与调试</h2>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">9</div>
            <h3>使用React DevTools</h3>
          </div>
          <p>识别性能瓶颈</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>组件渲染性能分析</li>
              <li>识别不必要的重新渲染</li>
              <li>调试状态变化</li>
            </ul>

            <h4>关键功能：</h4>
            <div class="code-block">
              <pre>1. 组件树检查：查看组件层次结构和props
2. Profiler工具：记录组件渲染时间
3. 高亮更新：显示哪些组件在重新渲染
4. 组件依赖图：可视化组件依赖关系

// 在代码中使用Profiler API
import { Profiler } from 'react';

function onRenderCallback(
  id, // 发生提交的 Profiler 树的 "id"
  phase, // "mount"（组件挂载）或 "update"（组件更新）
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整棵子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
  interactions // 属于本次更新的 interactions 的集合
) {
  // 聚合或记录渲染时间
}

&lt;Profiler id="Navigation" onRender={onRenderCallback}&gt;
  &lt;Navigation /&gt;
&lt;/Profiler&gt;</pre>
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-header">
            <div class="card-icon">10</div>
            <h3>生产环境构建</h3>
          </div>
          <p>优化最终用户使用的应用版本</p>

          <div class="card-content">
            <h4>使用场景：</h4>
            <ul>
              <li>应用部署前的最后优化</li>
              <li>性能关键型应用</li>
              <li>移动端应用优化</li>
            </ul>

            <h4>优化策略：</h4>
            <div class="code-block">
              <pre>// 1. 使用生产环境构建
// Create React App
npm run build

// Webpack配置
module.exports = {
  mode: 'production',
  // 其他生产环境配置
};

// 2. 启用Gzip压缩
// 3. 使用CDN分发资源
// 4. 服务端渲染(SSR)优化首屏加载

// 5. 检查生产环境优化
// 安装webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

// 在webpack配置中添加
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};</pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p> React性能优化指南 | 提升应用性能的最佳实践</p>
      <p class="tip">提示：性能优化应基于实际测量，避免过早和过度优化</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// TypeScript逻辑可以留空或用于未来扩展
</script>

<style lang="less" scoped>
.react-optimization-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  color: #2d3748;
  background: #f8fafc;
  min-height: 100vh;
}

header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #4a6cf7 0%, #6b48ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #718096;
    font-weight: 400;
  }
}

.hero-section {
  display: flex;
  flex-wrap: wrap;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  .hero-content {
    flex: 1;
    min-width: 300px;
    padding-right: 2rem;

    h2 {
      font-size: 1.8rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.1rem;
      color: #4a5568;
      line-height: 1.6;
      max-width: 600px;
    }
  }

  .performance-stats {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .stat-card {
    background: linear-gradient(135deg, #4a6cf7 0%, #6b48ff 100%);
    border-radius: 8px;
    padding: 1.2rem 1.5rem;
    text-align: center;
    min-width: 140px;
    color: white;
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
  }

  .stat-label {
    font-size: 0.95rem;
    opacity: 0.9;
  }
}

.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  h2 {
    font-size: 1.5rem;
    color: #1a202c;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
  }
}

.optimization-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(74, 108, 247, 0.1);
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .card-icon {
    width: 36px;
    height: 36px;
    background: #4a6cf7;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-right: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    color: #2d3748;
    margin: 0;
  }
}

.card-content {
  h4 {
    font-size: 1.1rem;
    color: #2d3748;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 1rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
      color: #4a5568;
    }
  }
}

.code-block {
  background: #2d3748;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
  margin-bottom: 1.2rem;

  pre {
    margin: 0;
    color: #cbd5e0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 0.9rem;

  .tip {
    font-style: italic;
    color: #f44336;
    margin-top: 0.5rem;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .optimization-grid {
    grid-template-columns: 1fr;
  }

  .hero-section {
    flex-direction: column;

    .hero-content {
      padding-right: 0;
      margin-bottom: 1.5rem;
    }
  }
}
</style>
