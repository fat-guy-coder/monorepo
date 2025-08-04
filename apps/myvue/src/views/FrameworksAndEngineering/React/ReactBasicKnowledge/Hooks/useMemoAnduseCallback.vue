<template>
  <div class="memo-container">
    <header class="header">
      <h1>React性能优化利器</h1>
      <p class="subtitle">useMemo与useCallback深度解析</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-value">减少重新渲染</div>
            <div class="stat-label">优化组件性能</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🧠</div>
          <div class="stat-content">
            <div class="stat-value">避免重复计算</div>
            <div class="stat-label">提升执行效率</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-content">
            <div class="stat-value">稳定引用</div>
            <div class="stat-label">防止副作用依赖变动</div>
          </div>
        </div>
      </div>
    </header>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🎯</span>
        为什么需要useMemo和useCallback？
      </h2>

      <div class="problem-grid">
        <div class="problem-card">
          <div class="problem-icon">🔁</div>
          <h3>不必要的重新渲染</h3>
          <p>当父组件重新渲染时，即使子组件的props没有变化，React默认仍会重新渲染子组件</p>
        </div>

        <div class="problem-card">
          <div class="problem-icon">⏱️</div>
          <h3>昂贵的计算开销</h3>
          <p>组件内部的重计算逻辑在每次渲染时都会重复执行，消耗性能</p>
        </div>

        <div class="problem-card">
          <div class="problem-icon">🔄</div>
          <h3>依赖引用变动</h3>
          <p>函数和对象每次渲染都会创建新引用，导致依赖它们的useEffect重复触发</p>
        </div>
      </div>

      <div class="solution-card">
        <div class="solution-icon">💡</div>
        <div class="solution-content">
          <h3>解决方案</h3>
          <p>useMemo和useCallback通过在依赖项未变化时返回缓存的值/函数，避免不必要的重新计算和渲染，从而提升应用性能</p>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="comparison">
        <div class="hook-card memo">
          <div class="hook-header">
            <h2>useMemo</h2>
            <div class="hook-icon">📊</div>
          </div>
          <div class="hook-description">
            用于<b>缓存计算结果</b>，避免在每次渲染时重新计算
          </div>

          <h3 class="subheading">基本语法</h3>
          <pre><code>const memoizedValue = useMemo(() => {
  // 执行复杂计算
  return computedValue;
}, [dependencies]);</code></pre>

          <h3 class="subheading">适用场景</h3>
          <ul class="scenarios">
            <li><span class="check">✅</span> 复杂转换或计算</li>
            <li><span class="check">✅</span> 大数据集过滤或排序</li>
            <li><span class="check">✅</span> 创建大型数据结构</li>
            <li><span class="check">✅</span> 派生状态计算</li>
          </ul>

          <h3 class="subheading">示例：复杂计算</h3>
          <pre><code>function ExpensiveComponent({ items }) {
  // 使用useMemo缓存排序结果
  const sortedItems = useMemo(() => {
    console.log('执行排序...');
    return [...items].sort((a, b) => a.value - b.value);
  }, [items]); // 仅在items变更时重新计算

  return &lt;List items={sortedItems} />;
}</code></pre>
        </div>

        <div class="hook-card callback">
          <div class="hook-header">
            <h2>useCallback</h2>
            <div class="hook-icon">📝</div>
          </div>
          <div class="hook-description">
            用于<b>缓存函数引用</b>，避免在每次渲染时创建新函数
          </div>

          <h3 class="subheading">基本语法</h3>
          <pre><code>const memoizedCallback = useCallback(() => {
  // 函数逻辑
}, [dependencies]);</code></pre>

          <h3 class="subheading">适用场景</h3>
          <ul class="scenarios">
            <li><span class="check">✅</span> 传递给子组件的回调函数</li>
            <li><span class="check">✅</span> 作为其他Hook的依赖项</li>
            <li><span class="check">✅</span> 事件处理函数</li>
            <li><span class="check">✅</span> 避免不必要的副作用触发</li>
          </ul>

          <h3 class="subheading">示例：回调函数</h3>
          <pre><code>function ParentComponent() {
  const [count, setCount] = useState(0);

  // 使用useCallback缓存函数
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // 依赖项为空数组，函数只创建一次

  return (
    &lt;div>
      &lt;ChildComponent onIncrement={increment} />
      &lt;div>Count: {count}&lt;/div>
    &lt;/div>
  );
}

// 子组件使用React.memo避免不必要的重渲染
const ChildComponent = memo(({ onIncrement }) => {
  console.log('子组件渲染');
  return &lt;button onClick={onIncrement}>增加&lt;/button>;
});</code></pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">📊</span>
        何时使用useMemo和useCallback
      </h2>

      <div class="usage-guide">
        <div class="guide-card">
          <h3>使用useMemo的情况</h3>
          <div class="cases">
            <div class="case">
              <div class="case-icon">🧮</div>
              <div class="case-content">
                <h4>计算开销大的操作</h4>
                <p>当计算操作复杂且耗时（如大型数组处理、复杂数学运算）时</p>
              </div>
            </div>

            <div class="case">
              <div class="case-icon">📦</div>
              <div class="case-content">
                <h4>创建对象/数组</h4>
                <p>当需要返回的对象或数组会被用于依赖比较时</p>
              </div>
            </div>

            <div class="case">
              <div class="case-icon">📚</div>
              <div class="case-content">
                <h4>依赖下游渲染的属性</h4>
                <p>当计算值作为prop传递给用React.memo优化的子组件时</p>
              </div>
            </div>
          </div>
        </div>

        <div class="guide-card">
          <h3>使用useCallback的情况</h3>
          <div class="cases">
            <div class="case">
              <div class="case-icon">👶</div>
              <div class="case-content">
                <h4>回调传递给优化组件</h4>
                <p>当回调函数作为prop传递给用React.memo优化的子组件时</p>
              </div>
            </div>

            <div class="case">
              <div class="case-icon">🔄</div>
              <div class="case-content">
                <h4>作为其他Hook的依赖</h4>
                <p>当函数被用作useEffect、useMemo等Hook的依赖项时</p>
              </div>
            </div>

            <div class="case">
              <div class="case-icon">⚙️</div>
              <div class="case-content">
                <h4>防止副作用重复触发</h4>
                <p>当函数被用于事件监听器且不希望每次渲染都重新绑定事件时</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="decision-tree">
        <h3>使用决策树</h3>
        <div class="tree-container">
          <div class="tree-step">
            <div class="step-number">1</div>
            <div class="step-content">
              是否在渲染中执行了开销大的计算？
            </div>
            <div class="step-arrow">↓</div>
          </div>

          <div class="tree-step">
            <div class="step-number">2</div>
            <div class="step-content">
              是否传递对象/数组到用React.memo优化的子组件？
            </div>
            <div class="step-arrow">↓</div>
          </div>

          <div class="tree-step">
            <div class="step-number">3</div>
            <div class="step-content">
              是否在传递函数到优化的子组件？
            </div>
            <div class="step-arrow">↓</div>
          </div>

          <div class="tree-step">
            <div class="step-number">4</div>
            <div class="step-content">
              函数是否被用作其他Hook的依赖？
            </div>
          </div>

          <div class="conclusion">
            如果以上任一回答为"是"，则应考虑使用useMemo/useCallback
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🚀</span>
        实战应用示例
      </h2>

      <div class="example-section">
        <div class="example-card">
          <div class="example-header">
            <div class="example-icon">📊</div>
            <h3>复杂数据报表</h3>
          </div>

          <div class="example-code">
            <pre><code>function DataReport({ rawData }) {
  // 使用useMemo处理复杂数据转换
  const reportData = useMemo(() => {
    console.log('处理大数据集...');

    // 假设这些是复杂的数据处理操作
    const filtered = rawData.filter(item => item.active);
    const sorted = [...filtered].sort((a, b) => b.score - a.score);
    const grouped = groupBy(sorted, 'category');

    return {
      summary: calculateSummary(sorted),
      charts: prepareChartData(grouped)
    };
  }, [rawData]); // 仅在rawData变化时重新计算

  return (
    &lt;div>
      &lt;SummaryView data={reportData.summary} />
      &lt;Charts data={reportData.charts} />
    &lt;/div>
  );
}</code></pre>
          </div>

          <div class="explanation">
            <div class="explanation-icon">💡</div>
            <div class="explanation-content">
              此示例中，useMemo确保只有在原始数据变化时才执行复杂的转换和分组操作，
              避免每次渲染都重复这些开销大的计算
            </div>
          </div>
        </div>

        <div class="example-card">
          <div class="example-header">
            <div class="example-icon">📝</div>
            <h3>表单提交优化</h3>
          </div>

          <div class="example-code">
            <pre><code>function UserForm() {
  const [user, setUser] = useState({ name: '', email: '' });

  // 使用useCallback缓存提交函数
  const handleSubmit = useCallback(() => {
    api.post('/users', user).then(() => {
      showNotification('用户创建成功');
    });
  }, [user]); // 当user状态变化时更新回调函数

  // 使用useMemo缓存配置对象
  const formConfig = useMemo(() => ({
    fields: [
      { name: 'name', label: '姓名', required: true },
      { name: 'email', label: '邮箱', type: 'email' }
    ],
    onSubmit: handleSubmit
  }), [handleSubmit]);

  return (
    &lt;SmartForm
      config={formConfig}
      values={user}
      onChange={setUser}
    />
  );
}</code></pre>
          </div>

          <div class="explanation">
            <div class="explanation-icon">💡</div>
            <div class="explanation-content">
              此示例同时使用了useMemo和useCallback。useCallback缓存提交处理函数，
              useMemo缓存表单配置对象，确保SmartForm组件不会因配置对象引用变化而重新渲染
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">✅</span>
        最佳实践与注意事项
      </h2>

      <div class="best-practices">
        <div class="practice-card good">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>正确使用依赖数组</h3>
            <p>确保依赖数组中包含所有被使用的变量和函数，避免过时闭包问题</p>
          </div>
        </div>

        <div class="practice-card good">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>结合React.memo使用</h3>
            <p>当搭配React.memo优化子组件时，useMemo和useCallback才能发挥最大效果</p>
          </div>
        </div>

        <div class="practice-card good">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>优先考虑可读性</h3>
            <p>避免过度优化简单组件，只有当性能确实成为问题时才使用</p>
          </div>
        </div>

        <div class="practice-card bad">
          <div class="practice-icon">❌</div>
          <div class="practice-content">
            <h3>不要在渲染中执行副作用</h3>
            <p>useMemo函数应是纯函数，不应包含API调用等副作用操作</p>
          </div>
        </div>

        <div class="practice-card bad">
          <div class="practice-icon">❌</div>
          <div class="practice-content">
            <h3>避免依赖空数组</h3>
            <p>依赖数组为空会永久缓存值，可能导致使用过时的状态</p>
          </div>
        </div>

        <div class="practice-card bad">
          <div class="practice-icon">❌</div>
          <div class="practice-content">
            <h3>不要缓存所有函数和值</h3>
            <p>过度使用会增加内存消耗并阻碍垃圾回收，导致性能下降</p>
          </div>
        </div>
      </div>

      <div class="performance-tip">
        <div class="tip-icon">📌</div>
        <div class="tip-content">
          <h3>性能优化黄金法则</h3>
          <p>始终先编写清晰可读的代码，仅在性能分析表明存在问题时才进行优化。
            过度使用useMemo和useCallback可能适得其反，增加内存开销</p>
        </div>
      </div>
    </div>

    <footer class="summary">
      <h2>核心要点总结</h2>

      <div class="key-points">
        <div class="point">
          <div class="point-icon">⚡</div>
          <div class="point-content">
            <h4>useMemo</h4>
            <p>缓存计算结果，避免重复执行开销大的操作</p>
          </div>
        </div>

        <div class="point">
          <div class="point-icon">🔄</div>
          <div class="point-content">
            <h4>useCallback</h4>
            <p>缓存函数引用，避免不必要的子组件重新渲染</p>
          </div>
        </div>

        <div class="point">
          <div class="point-icon">🧩</div>
          <div class="point-content">
            <h4>依赖数组</h4>
            <p>正确指定依赖是确保优化效果和安全性的关键</p>
          </div>
        </div>

        <div class="point">
          <div class="point-icon">📌</div>
          <div class="point-content">
            <h4>合理使用</h4>
            <p>优先考虑可读性，仅在必要时进行优化</p>
          </div>
        </div>
      </div>

      <div class="final-note">
        <p>记住：<span class="highlight">"并非所有性能问题都需要useMemo/useCallback，
            但当确实需要时，它们是无价的工具"</span></p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要实际逻辑，仅用于演示
import { ref } from 'vue';

const activeTab = ref('memo');
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
@memo-color: #4caf50;
@callback-color: #2196f3;
@success-color: #42b983;
@warning-color: #ff9800;
@error-color: #e53935;

.memo-container {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.header {
  text-align: center;
  background: linear-gradient(135deg, fade(@primary-color, 10%), fade(@primary-color, 5%));
  border-radius: 16px;
  padding: 35px 30px;
  margin-bottom: 35px;
  border: 1px solid fade(@primary-color, 15%);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    color: @secondary-color;
  }

  .subtitle {
    font-size: 1.3rem;
    color: @text-secondary;
    margin-bottom: 30px;
  }
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 250px;

  .stat-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
    background: fade(@primary-color, 10%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-value {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 5px;
    color: @secondary-color;
  }

  .stat-label {
    color: @text-secondary;
    font-size: 0.9rem;
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

.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.problem-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-top: 4px solid fade(@primary-color, 50%);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .problem-icon {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    margin-top: 0;
    text-align: center;
    color: @secondary-color;
    font-size: 1.3rem;
  }

  p {
    color: @text-secondary;
    text-align: center;
  }
}

.solution-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: fade(@success-color, 10%);
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid @success-color;

  .solution-icon {
    font-size: 2rem;
    color: @success-color;
  }

  h3 {
    margin: 0 0 10px 0;
    color: darken(@success-color, 20%);
  }

  p {
    margin: 0;
    color: @text-primary;
  }
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.hook-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  &.memo {
    border-top: 4px solid @memo-color;
  }

  &.callback {
    border-top: 4px solid @callback-color;
  }
}

.hook-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 1.8rem;
  }

  .hook-icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
    background: fade(@primary-color, 8%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.hook-description {
  font-size: 1.1rem;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;
}

.subheading {
  font-size: 1.3rem;
  margin-top: 25px;
  margin-bottom: 15px;
  color: @secondary-color;
  padding-bottom: 8px;
  border-bottom: 1px dashed @border-color;
}

.scenarios {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;

  li {
    padding: 10px 0;
    border-bottom: 1px solid @border-color;
    display: flex;
    align-items: center;

    .check {
      margin-right: 10px;
      font-size: 1.2rem;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

pre,
code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

pre {
  background: #282c34;
  color: #abb2bf;
  padding: 18px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;

  code {
    background: transparent;
    padding: 0;
  }
}

.usage-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin: 30px 0;
}

.guide-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.cases {
  margin-top: 20px;
}

.case {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  .case-icon {
    font-size: 1.8rem;
    width: 50px;
    height: 50px;
    background: fade(@primary-color, 8%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  h4 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.decision-tree {
  background: fade(@primary-color, 5%);
  border-radius: 16px;
  padding: 30px;
  margin-top: 40px;

  h3 {
    text-align: center;
    margin-top: 0;
    font-size: 1.4rem;
    color: @secondary-color;
  }
}

.tree-container {
  max-width: 600px;
  margin: 0 auto;
}

.tree-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;

  .step-number {
    width: 36px;
    height: 36px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .step-content {
    background: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }

  .step-arrow {
    font-size: 1.5rem;
    color: @primary-color;
    margin-top: 10px;
  }
}

.conclusion {
  background: fade(@success-color, 15%);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  font-size: 1.1rem;
  border: 1px solid fade(@success-color, 30%);
}

.example-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.example-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.example-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;

  .example-icon {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    background: fade(@primary-color, 8%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
}

.explanation {
  display: flex;
  gap: 15px;
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 20px;
  margin-top: 25px;

  .explanation-icon {
    font-size: 1.8rem;
    color: @primary-color;
  }

  .explanation-content {
    flex: 1;
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.practice-card {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &.good {
    border-left: 4px solid @success-color;
  }

  &.bad {
    border-left: 4px solid @error-color;
  }

  .practice-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    margin-top: 5px;
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.15rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.performance-tip {
  display: flex;
  gap: 20px;
  background: rgba(255, 244, 229, 0.8);
  border-radius: 16px;
  padding: 25px;
  margin-top: 40px;
  border: 1px solid #ffd699;

  .tip-icon {
    font-size: 2rem;
    color: @warning-color;
  }

  h3 {
    margin: 0 0 10px 0;
    color: darken(@warning-color, 20%);
  }

  p {
    margin: 0;
    color: @text-primary;
  }
}

.summary {
  background: linear-gradient(135deg, fade(@primary-color, 10%), fade(@primary-color, 5%));
  border-radius: 16px;
  padding: 35px;
  border: 1px solid fade(@primary-color, 15%);
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 25px;
    color: @secondary-color;
  }
}

.key-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  max-width: 1000px;
  margin: 0 auto 30px;
}

.point {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);

  .point-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h4 {
    margin: 0 0 10px 0;
    color: @secondary-color;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    text-align: center;
  }
}

.final-note {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 25px;
  margin-top: 30px;

  p {
    font-size: 1.2rem;
    margin: 10px 0;

    .highlight {
      background: rgba(255, 255, 255, 0.9);
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 600;
      color: darken(@primary-color, 25%);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 25px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section {
    padding: 20px 15px;

    .section-title {
      font-size: 1.5rem;
    }
  }

  .comparison,
  .usage-guide {
    grid-template-columns: 1fr;
  }

  .hook-card,
  .guide-card {
    padding: 20px;
  }

  .stats {
    flex-direction: column;
    align-items: center;
  }

  .stat-card {
    width: 100%;
  }
}
</style>
