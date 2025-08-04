<template>
  <div class="profiler-container">
    <header class="profiler-header">
      <div class="title-wrapper">
        <h1>React DevTools Profiler 指南</h1>
        <p class="subtitle">深入分析 React 应用性能</p>
      </div>
      <div class="profiler-visual">
        <div class="profiler-demo">
          <div class="profiler-graph">
            <div class="commit-bar" v-for="(commit, index) in commits" :key="index"
              :style="{ height: commit.height + 'px', backgroundColor: commit.color }"></div>
          </div>
          <div class="profiler-info">
            <div class="commit-info">Commit #{{ selectedCommit }}</div>
            <div class="flamegraph">
              <div class="flame-row" v-for="(component, idx) in flamegraphData" :key="idx">
                <div class="flame-bar" :style="{ width: component.width + '%', backgroundColor: component.color }">
                  {{ component.name }} ({{ component.duration }}ms)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📊</span>
          Profiler 是什么？
        </h2>
        <div class="definition">
          <p>React DevTools Profiler 是一个强大的性能分析工具，帮助开发者测量 React 应用的渲染性能，识别性能瓶颈。</p>

          <div class="key-points">
            <div class="point">
              <div class="icon">⏱️</div>
              <h4>测量渲染时间</h4>
              <p>精确测量组件渲染所需时间</p>
            </div>
            <div class="point">
              <div class="icon">🔍</div>
              <h4>识别瓶颈</h4>
              <p>定位导致性能问题的组件</p>
            </div>
            <div class="point">
              <div class="icon">📈</div>
              <h4>可视化分析</h4>
              <p>通过火焰图和提交图表展示性能数据</p>
            </div>
            <div class="point">
              <div class="icon">🔄</div>
              <h4>优化验证</h4>
              <p>验证性能优化措施的效果</p>
            </div>
          </div>

          <div class="profiler-features">
            <h3>核心功能</h3>
            <ul>
              <li>记录应用渲染的提交(commits)</li>
              <li>测量每个组件的渲染时间</li>
              <li>展示组件渲染原因(re-render reasons)</li>
              <li>比较不同提交之间的性能差异</li>
              <li>识别不必要的重新渲染</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          如何使用 Profiler
        </h2>
        <div class="usage-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>安装 React DevTools</h3>
              <p>在浏览器中安装 React Developer Tools 扩展</p>
              <div class="browsers">
                <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi"
                  target="_blank" class="browser chrome">Chrome</a>
                <a href="https://addons.mozilla.org/en-US/firefox/addon/react-devtools/" target="_blank"
                  class="browser firefox">Firefox</a>
                <a href="https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil"
                  target="_blank" class="browser edge">Edge</a>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>打开 Profiler 面板</h3>
              <p>在浏览器开发者工具中找到 React 面板，切换到 Profiler 标签</p>
              <div class="screenshot">
                <div class="browser-window">
                  <div class="browser-header">
                    <div class="browser-buttons">
                      <span class="close"></span>
                      <span class="minimize"></span>
                      <span class="maximize"></span>
                    </div>
                    <div class="browser-url">devtools://devtools/bundled/react_app.html</div>
                  </div>
                  <div class="browser-tabs">
                    <div class="tab active">Profiler</div>
                    <div class="tab">Components</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>记录性能分析</h3>
              <p>点击记录按钮，与你的应用交互，然后停止记录</p>
              <pre class="code-block">// 也可以通过编程方式记录
import { unstable_trace as trace } from 'scheduler/tracing';

trace('表单提交', performance.now(), () => {
  // 需要跟踪的代码
});</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>分析结果</h3>
              <p>检查火焰图、排名图和组件树，识别性能瓶颈</p>
              <div class="analysis-tips">
                <div class="tip">
                  <div class="icon">🔥</div>
                  <p>火焰图：显示组件渲染时间</p>
                </div>
                <div class="tip">
                  <div class="icon">🏆</div>
                  <p>排名图：按渲染时间排序组件</p>
                </div>
                <div class="tip">
                  <div class="icon">🌳</div>
                  <p>组件树：显示渲染原因</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🔍</span>
          解读 Profiler 数据
        </h2>
        <div class="data-interpretation">
          <div class="data-section">
            <h3>提交图表</h3>
            <div class="commit-chart">
              <div class="commit-bar" v-for="(commit, index) in 8" :key="index"
                :style="{ height: (20 + Math.random() * 80) + 'px' }"></div>
            </div>
            <ul>
              <li>每个条形代表一次提交（渲染周期）</li>
              <li>条形高度表示渲染时间</li>
              <li>颜色表示性能：绿色（快）→ 黄色 → 红色（慢）</li>
              <li>点击条形查看该次提交的详细信息</li>
            </ul>
          </div>

          <div class="data-section">
            <h3>火焰图</h3>
            <div class="flamegraph-demo">
              <div class="flame-row">
                <div class="flame-bar" style="width: 100%; background-color: #e74c3c;">App (42ms)</div>
              </div>
              <div class="flame-row">
                <div class="flame-bar" style="width: 70%; background-color: #e67e22;">Header (30ms)</div>
                <div class="flame-bar" style="width: 30%; background-color: #2ecc71;">MainContent (12ms)</div>
              </div>
              <div class="flame-row">
                <div class="flame-bar" style="width: 40%; background-color: #3498db;">Navbar (18ms)</div>
                <div class="flame-bar" style="width: 30%; background-color: #9b59b6;">SearchBar (12ms)</div>
                <div class="flame-bar" style="width: 15%; background-color: #1abc9c;">ProductList (6ms)</div>
                <div class="flame-bar" style="width: 15%; background-color: #f1c40f;">ProductItem (6ms)</div>
              </div>
            </div>
            <ul>
              <li>显示组件树结构及每个组件的渲染时间</li>
              <li>宽度表示组件渲染时间占父组件的比例</li>
              <li>颜色表示绝对渲染时间：绿色（快）→ 红色（慢）</li>
              <li>悬停查看组件渲染详细信息</li>
            </ul>
          </div>

          <div class="data-section">
            <h3>渲染原因</h3>
            <div class="render-reasons">
              <div class="reason">
                <div class="icon">📌</div>
                <div class="content">
                  <h4>Props 变化</h4>
                  <p>父组件传递的 props 发生变化</p>
                </div>
              </div>
              <div class="reason">
                <div class="icon">🏠</div>
                <div class="content">
                  <h4>State 变化</h4>
                  <p>组件内部状态发生变化</p>
                </div>
              </div>
              <div class="reason">
                <div class="icon">📜</div>
                <div class="content">
                  <h4>Hooks 变化</h4>
                  <p>useContext、useReducer 等 Hook 变化</p>
                </div>
              </div>
              <div class="reason">
                <div class="icon">🔄</div>
                <div class="content">
                  <h4>父组件重新渲染</h4>
                  <p>父组件渲染导致子组件重新渲染</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          使用场景
        </h2>
        <div class="use-cases">
          <div class="use-case">
            <div class="icon">⏱️</div>
            <div class="content">
              <h3>识别渲染瓶颈</h3>
              <p>查找渲染时间过长的组件，优化其性能</p>
              <pre class="code-block">// 优化前
const HeavyComponent = () => {
  // 复杂计算...
  return &lt;div&gt;...&lt;/div&gt;;
};

// 优化后
const OptimizedComponent = React.memo(() => {
  // 复杂计算...
  return &lt;div&gt;...&lt;/div&gt;
});</pre>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">🔄</div>
            <div class="content">
              <h3>减少不必要的重渲染</h3>
              <p>检测和修复不必要的组件重渲染</p>
              <pre class="code-block">// 问题：父组件状态变化导致所有子组件重渲染
const Parent = () => {
  const [state] = useState();
  return (
    &lt;&gt;
      &lt;ChildA /&gt;
      &lt;ChildB /&gt; // 不需要重渲染
    &lt;/&gt;
  );
};

// 修复：使用 React.memo 包装子组件
const ChildB = React.memo(() => { ... });</pre>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">📈</div>
            <div class="content">
              <h3>优化大型列表</h3>
              <p>分析虚拟列表或窗口化组件的性能</p>
              <pre class="code-block">// 优化大型列表
import { FixedSizeList } from 'react-window';

const List = () => (
  &lt;FixedSizeList
    height={600}
    width={300}
    itemSize={50}
    itemCount={1000}
  &gt;
    {({ index, style }) => (
      &lt;div style={style}&gt;Item {index}&lt;/div&gt;
    )}
  &lt;/FixedSizeList&gt;
);</pre>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">🧪</div>
            <div class="content">
              <h3>验证优化效果</h3>
              <p>比较优化前后的性能差异</p>
              <div class="comparison">
                <div class="before">
                  <h4>优化前</h4>
                  <p>总渲染时间: 120ms</p>
                  <p>组件重渲染次数: 15</p>
                </div>
                <div class="after">
                  <h4>优化后</h4>
                  <p>总渲染时间: 45ms</p>
                  <p>组件重渲染次数: 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">💎</span>
          Profiler 最佳实践
        </h2>
        <div class="best-practices">
          <div class="practice">
            <div class="icon">1</div>
            <div class="content">
              <h3>生产环境分析</h3>
              <p>在真实环境中分析性能（使用 React 的生产分析包）</p>
              <pre class="code-block">// 启用生产环境分析
import { unstable_createRoot as createRoot } from 'react-dom';

createRoot(
  document.getElementById('root'),
  { unstable_isConcurrent: true }
);</pre>
            </div>
          </div>

          <div class="practice">
            <div class="icon">2</div>
            <div class="content">
              <h3>聚焦关键路径</h3>
              <p>分析用户关键操作路径（如页面加载、表单提交）</p>
              <ul>
                <li>应用初始化渲染</li>
                <li>页面导航切换</li>
                <li>复杂表单交互</li>
                <li>数据加载和更新</li>
              </ul>
            </div>
          </div>

          <div class="practice">
            <div class="icon">3</div>
            <div class="content">
              <h3>比较分析</h3>
              <p>记录优化前后的分析结果，对比性能改进</p>
              <div class="comparison-chart">
                <div class="chart-bar before" style="height: 80px;">优化前</div>
                <div class="chart-bar after" style="height: 30px;">优化后</div>
              </div>
            </div>
          </div>

          <div class="practice">
            <div class="icon">4</div>
            <div class="content">
              <h3>结合其他工具</h3>
              <p>与 Chrome DevTools Performance 和 Lighthouse 结合使用</p>
              <div class="tools">
                <div class="tool">Chrome Performance</div>
                <div class="tool">Lighthouse</div>
                <div class="tool">React Profiler</div>
                <div class="tool">Bundle Analyzer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">⚙️</span>
          常见性能问题与解决方案
        </h2>
        <div class="solutions">
          <div class="solution">
            <h3>问题：不必要的重新渲染</h3>
            <div class="fix">
              <h4>解决方案：</h4>
              <ul>
                <li>使用 <code>React.memo</code> 包装组件</li>
                <li>正确使用 <code>useMemo</code> 和 <code>useCallback</code></li>
                <li>避免在渲染函数中创建新对象/函数</li>
              </ul>
            </div>
          </div>

          <div class="solution">
            <h3>问题：大型列表渲染缓慢</h3>
            <div class="fix">
              <h4>解决方案：</h4>
              <ul>
                <li>使用虚拟化列表（react-window, react-virtualized）</li>
                <li>实现窗口化渲染</li>
                <li>分页加载数据</li>
              </ul>
            </div>
          </div>

          <div class="solution">
            <h3>问题：复杂组件渲染时间长</h3>
            <div class="fix">
              <h4>解决方案：</h4>
              <ul>
                <li>拆分复杂组件为多个小组件</li>
                <li>使用 <code>useMemo</code> 缓存计算结果</li>
                <li>将复杂计算移出渲染函数</li>
              </ul>
            </div>
          </div>

          <div class="solution">
            <h3>问题：状态变化导致过多重渲染</h3>
            <div class="fix">
              <h4>解决方案：</h4>
              <ul>
                <li>使用状态管理库（Redux, MobX）</li>
                <li>批量状态更新（React 18 自动批处理）</li>
                <li>使用 <code>useReducer</code> 代替多个 <code>useState</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="profiler-footer">
      <p>React DevTools Profiler 是优化 React 应用性能不可或缺的工具</p>
      <div class="conclusion">定期使用 Profiler 分析应用性能，确保为用户提供流畅的体验</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 模拟提交数据
const commits = ref([
  { height: 30, color: '#2ecc71' },
  { height: 45, color: '#f1c40f' },
  { height: 65, color: '#e67e22' },
  { height: 25, color: '#2ecc71' },
  { height: 80, color: '#e74c3c' },
  { height: 35, color: '#2ecc71' },
  { height: 50, color: '#f1c40f' },
]);

// 当前选中的提交
const selectedCommit = ref(5);

// 火焰图数据
const flamegraphData = ref([
  { name: 'App', width: 100, duration: 42, color: '#e74c3c' },
  { name: 'Header', width: 70, duration: 30, color: '#e67e22' },
  { name: 'MainContent', width: 30, duration: 12, color: '#2ecc71' },
  { name: 'Navbar', width: 40, duration: 18, color: '#3498db' },
  { name: 'SearchBar', width: 30, duration: 12, color: '#9b59b6' },
  { name: 'ProductList', width: 15, duration: 6, color: '#1abc9c' },
  { name: 'ProductItem', width: 15, duration: 6, color: '#f1c40f' },
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;
@profiler-color: #9b59b6;
@error-color: #e74c3c;
@warning-color: #f39c12;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.profiler-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.profiler-header {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 40px;
  padding: 30px 0;
  justify-content: space-between;

  .title-wrapper {
    flex: 1;
    min-width: 300px;

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      color: @profiler-color;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.2rem;
      color: @light-text;
      max-width: 600px;
    }
  }

  .profiler-visual {
    flex: 1;
    min-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    .profiler-demo {
      width: 100%;
      max-width: 600px;
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

      .profiler-graph {
        display: flex;
        gap: 10px;
        height: 120px;
        align-items: flex-end;
        padding: 15px;
        border-bottom: 2px solid #eee;

        .commit-bar {
          flex: 1;
          min-width: 20px;
          border-radius: 4px 4px 0 0;
          transition: all 0.3s ease;

          &:hover {
            transform: scaleY(1.05);
            opacity: 0.9;
          }
        }
      }

      .profiler-info {
        padding: 15px 0;

        .commit-info {
          font-weight: 600;
          margin-bottom: 15px;
          color: @profiler-color;
        }

        .flamegraph {
          .flame-row {
            display: flex;
            margin-bottom: 4px;
            height: 28px;

            .flame-bar {
              height: 100%;
              margin-right: 4px;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 0.8rem;
              font-weight: 500;
              padding: 0 5px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              transition: all 0.2s ease;

              &:hover {
                transform: scale(1.02);
                z-index: 2;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              }
            }
          }
        }
      }
    }
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: @text-color;
  font-weight: 600;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 10px;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
    color: @profiler-color;
  }
}

// 定义部分
.definition {
  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.8;
  }
}

.key-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 25px;

  .point {
    text-align: center;
    padding: 20px;
    background: #f5f1fa;
    border-radius: 8px;
    border-top: 4px solid @profiler-color;

    .icon {
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: @profiler-color;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: @text-color;
    }

    p {
      color: @light-text;
      font-size: 0.9rem;
    }
  }
}

.profiler-features {
  margin-top: 30px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: @text-color;
  }

  ul {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;

    li {
      padding: 10px 0;
      position: relative;
      padding-left: 30px;

      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: @secondary-color;
        font-weight: bold;
      }
    }
  }
}

// 使用步骤
.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.step {
  display: flex;
  gap: 20px;
  align-items: flex-start;

  .step-number {
    min-width: 40px;
    height: 40px;
    background: @profiler-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 5px;
  }

  .step-content {
    flex: 1;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: @text-color;
    }

    p {
      color: @light-text;
      margin-bottom: 15px;
    }
  }
}

.browsers {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  flex-wrap: wrap;

  .browser {
    padding: 8px 20px;
    border-radius: 20px;
    font-weight: 500;
    color: white;

    &.chrome {
      background: #4285f4;
    }

    &.firefox {
      background: #ff7139;
    }

    &.edge {
      background: #0078d7;
    }
  }
}

.screenshot {
  margin-top: 15px;

  .browser-window {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    overflow: hidden;

    .browser-header {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      padding: 8px 15px;
      border-bottom: 1px solid #eaeaea;

      .browser-buttons {
        display: flex;
        gap: 8px;

        span {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;

          &.close {
            background: #ff5f56;
          }

          &.minimize {
            background: #ffbd2e;
          }

          &.maximize {
            background: #27c93f;
          }
        }
      }

      .browser-url {
        flex: 1;
        margin: 0 15px;
        background: white;
        padding: 3px 10px;
        border-radius: 15px;
        font-size: 0.85rem;
        color: @light-text;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .browser-tabs {
      display: flex;
      background: #f9f9f9;
      padding: 0 15px;

      .tab {
        padding: 8px 15px;
        font-size: 0.9rem;
        border-bottom: 2px solid transparent;

        &.active {
          border-bottom: 2px solid @profiler-color;
          font-weight: 500;
          color: @profiler-color;
        }
      }
    }
  }
}

// 代码块
.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 15px 0;
  border: 1px solid #e1e4e8;
}

.analysis-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;

  .tip {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f5f1fa;
    padding: 10px;
    border-radius: 8px;

    .icon {
      font-size: 1.5rem;
    }
  }
}

// 数据解读
.data-interpretation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.data-section {
  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: @text-color;
  }
}

.commit-chart {
  display: flex;
  gap: 10px;
  height: 150px;
  align-items: flex-end;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #eaeaea;
  border-radius: 8px;

  .commit-bar {
    flex: 1;
    min-width: 10px;
    background: linear-gradient(to top, #2ecc71, #f1c40f, #e74c3c);
    border-radius: 4px 4px 0 0;
    transition: transform 0.2s ease;

    &:hover {
      transform: scaleY(1.05);
    }
  }
}

.flamegraph-demo {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;

  .flame-row {
    display: flex;
    margin-bottom: 5px;
    height: 30px;

    .flame-bar {
      height: 100%;
      margin-right: 5px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.render-reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;

  .reason {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: #f5f1fa;
    border-radius: 8px;

    .icon {
      font-size: 1.8rem;
      flex-shrink: 0;
      color: @profiler-color;
    }

    h4 {
      font-size: 1.1rem;
      margin-bottom: 5px;
    }
  }
}

// 使用场景
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .use-case {
    display: flex;
    gap: 20px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
    border: 1px solid #eaeaea;

    .icon {
      font-size: 2rem;
      flex-shrink: 0;
      margin-top: 5px;
      color: @profiler-color;
    }

    .content {
      flex: 1;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 10px;
        color: @text-color;
      }

      p {
        color: @light-text;
        margin-bottom: 15px;
        font-size: 0.95rem;
      }
    }
  }
}

.comparison {
  display: flex;
  gap: 20px;
  margin-top: 15px;

  .before,
  .after {
    flex: 1;
    padding: 15px;
    border-radius: 8px;
    text-align: center;

    h4 {
      margin-bottom: 10px;
      font-size: 1.1rem;
    }
  }

  .before {
    background: #ffebee;
  }

  .after {
    background: #e8f5e9;
  }
}

// 最佳实践
.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
}

.practice {
  display: flex;
  gap: 20px;
  background: #f9fbfd;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid @profiler-color;

  .icon {
    min-width: 40px;
    height: 40px;
    background: @profiler-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .content {
    flex: 1;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: @text-color;
    }
  }
}

.comparison-chart {
  display: flex;
  gap: 20px;
  height: 100px;
  align-items: flex-end;
  margin-top: 15px;

  .chart-bar {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    border-radius: 4px 4px 0 0;

    &.before {
      background: @error-color;
    }

    &.after {
      background: @secondary-color;
    }
  }
}

.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;

  .tool {
    background: #e9e3f3;
    color: @profiler-color;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
  }
}

// 解决方案
.solutions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;

  .solution {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid @profiler-color;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      color: @error-color;
    }

    .fix {
      h4 {
        font-size: 1.1rem;
        margin-bottom: 10px;
        color: @text-color;
      }
    }
  }
}

.profiler-footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 1rem;

  .conclusion {
    margin-top: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    color: @profiler-color;
    max-width: 800px;
    margin: 20px auto 0;
    padding: 15px;
    background: rgba(155, 89, 182, 0.1);
    border-radius: 8px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .profiler-header {
    flex-direction: column;

    h1 {
      font-size: 2.2rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }

  .use-cases,
  .best-practices,
  .solutions {
    grid-template-columns: 1fr;
  }
}
</style>
