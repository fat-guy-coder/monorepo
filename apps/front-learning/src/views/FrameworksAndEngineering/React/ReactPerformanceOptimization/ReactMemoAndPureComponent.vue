<template>
  <div class="pure-component-container">
    <header class="header">
      <h1>React纯组件深度解析</h1>
      <p class="subtitle">优化性能的核心组件模式</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-value">性能提升</div>
            <div class="stat-label">减少不必要的渲染</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🧩</div>
          <div class="stat-content">
            <div class="stat-value">可预测性</div>
            <div class="stat-label">相同输入相同输出</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-content">
            <div class="stat-value">复用性</div>
            <div class="stat-label">无副作用组件</div>
          </div>
        </div>
      </div>
    </header>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">🔍</span>
        什么是纯组件？
      </h2>

      <div class="definition-card">
        <div class="definition-content">
          <p><strong>纯组件（Pure
              Components）</strong>是React中一种特殊的组件类型，它会对<code>props</code>和<code>state</code>进行浅比较，仅在数据发生变化时才重新渲染。</p>

          <div class="comparison">
            <div class="comparison-item">
              <div class="comparison-header">
                <div class="comparison-icon">🔄</div>
                <h3>常规组件</h3>
              </div>
              <ul>
                <li>父组件更新时总是重新渲染</li>
                <li>即使props/state相同也渲染</li>
                <li>render()方法频繁调用</li>
              </ul>
            </div>

            <div class="comparison-arrow">→</div>

            <div class="comparison-item">
              <div class="comparison-header">
                <div class="comparison-icon">🚀</div>
                <h3>纯组件</h3>
              </div>
              <ul>
                <li>仅在props/state变化时渲染</li>
                <li>浅比较避免不必要的渲染</li>
                <li>自动性能优化</li>
              </ul>
            </div>
          </div>

          <div class="principle">
            <div class="principle-icon">📌</div>
            <div class="principle-content">
              <h3>纯组件核心原则</h3>
              <p class="code">f(props, state) =&gt; UI</p>
              <p>相同props和state总是渲染相同的UI，没有副作用</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">📝</span>
        如何创建纯组件
      </h2>

      <div class="implementation-grid">
        <div class="implementation-card">
          <div class="implementation-header">
            <div class="implementation-icon">🧩</div>
            <h3>类组件实现</h3>
            <span class="tag">React.PureComponent</span>
          </div>

          <pre><code class="language-javascript">import React from 'react';

class PureButton extends React.PureComponent {
  render() {
    const { label, onClick } = this.props;
    console.log('PureButton渲染');
    return (
      &lt;button onClick={onClick}&gt;
        {label}
      &lt;/button&gt;
    );
  }
}

// 使用示例
&lt;PureButton
  label="点击我"
  onClick={() => console.log('点击')}
/&gt;</code></pre>

          <div class="notes">
            <h4>实现要点：</h4>
            <ul>
              <li>继承<code>React.PureComponent</code>而非<code>React.Component</code></li>
              <li>自动实现<code>shouldComponentUpdate</code>进行浅比较</li>
              <li>适用于有状态的类组件</li>
            </ul>
          </div>
        </div>

        <div class="implementation-card">
          <div class="implementation-header">
            <div class="implementation-icon">⚡</div>
            <h3>函数组件实现</h3>
            <span class="tag">React.memo</span>
          </div>

          <pre><code class="language-javascript">import React, { memo } from 'react';

const PureCard = memo(function PureCard({ title, content }) {
  console.log('PureCard渲染');
  return (
    &lt;div className="card"&gt;
      &lt;h3&gt;{title}&lt;/h3&gt;
      &lt;p&gt;{content}&lt;/p&gt;
    &lt;/div&gt;
  );
});

// 自定义比较函数
const PureCardCustom = memo(
  PureCard,
  (prevProps, nextProps) => {
    // 自定义比较逻辑
    return prevProps.title === nextProps.title
      && prevProps.content === nextProps.content;
  }
);</code></pre>

          <div class="notes">
            <h4>实现要点：</h4>
            <ul>
              <li>使用<code>React.memo</code>高阶组件包裹函数组件</li>
              <li>支持自定义比较函数作为第二参数</li>
              <li>适用于无状态函数组件</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>实现方式</th>
              <th>组件类型</th>
              <th>比较方法</th>
              <th>使用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>React.PureComponent</td>
              <td>类组件</td>
              <td>props和state浅比较</td>
              <td>有状态组件，需要生命周期方法</td>
            </tr>
            <tr>
              <td>React.memo</td>
              <td>函数组件</td>
              <td>props浅比较（可自定义）</td>
              <td>无状态组件，现代函数式组件</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">📊</span>
        浅比较机制基础介绍
      </h2>

      <div class="shallow-comparison">
        <div class="comparison-diagram">
          <div class="comparison-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>比较对象引用</h4>
              <p>检查新旧props/state是否同一对象</p>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="comparison-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>比较属性数量</h4>
              <p>对象键的数量是否相同</p>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="comparison-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>逐个属性比较</h4>
              <p>使用<code>Object.is()</code>比较每个属性值</p>
            </div>
          </div>
        </div>

        <div class="examples-grid">
          <div class="example-card">
            <div class="example-header">
              <div class="example-icon">✅</div>
              <h4>有效更新</h4>
            </div>
            <pre><code class="language-javascript">// 原始props
{ count: 0, label: '提交' }

// 更新后props → 触发渲染
{ count: 1, label: '提交' }</code></pre>
          </div>

          <div class="example-card">
            <div class="example-header">
              <div class="example-icon">⚠️</div>
              <h4>无效更新</h4>
            </div>
            <pre><code class="language-javascript">// 原始props
{ user: { name: 'John' } }

// 更新后props → 不会触发渲染
{ user: { name: 'John' } } // 不同对象引用但相同值</code></pre>
          </div>
        </div>

        <div class="warning-card">
          <div class="warning-icon">⚠️</div>
          <div class="warning-content">
            <h3>浅比较的局限性</h3>
            <p>纯组件无法检测深层对象或数组的变化，特别是当它们被原地修改时：</p>
            <pre><code class="language-javascript">// 错误：原地修改对象
const handleClick = () => {
  user.profile.age = 30; // 不会触发重新渲染
  setUser(user);
}

// 正确：创建新对象
const handleClick = () => {
  setUser({
    ...user,
    profile: { ...user.profile, age: 30 }
  });
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">🎯</span>
        纯组件最佳实践
      </h2>

      <div class="best-practices">
        <div class="practice-card">
          <div class="practice-icon">1</div>
          <div class="practice-content">
            <h3>不可变数据</h3>
            <p>始终返回新的对象/数组而非修改现有对象</p>
            <div class="code-snippet">
              <span class="code-comment">// 推荐：使用扩展运算符</span>
              <code>setList([...list, newItem]);</code>
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">2</div>
          <div class="practice-content">
            <h3>避免内联函数</h3>
            <p>内联函数会导致每次渲染生成新引用</p>
            <div class="code-snippet">
              <span class="code-comment">// 不推荐：内联函数</span>
              <code>&lt;Button onClick={() => handleClick()} /&gt;</code>
              <br>
              <span class="code-comment">// 推荐：记忆化回调</span>
              <code>const onClick = useCallback(() => handleClick(), []);</code>
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">3</div>
          <div class="practice-content">
            <h3>扁平化props</h3>
            <p>避免深层嵌套的对象结构</p>
            <div class="code-snippet">
              <span class="code-comment">// 不推荐：深层对象</span>
              <code>&lt;UserCard user={user} /&gt;</code>
              <br>
              <span class="code-comment">// 推荐：扁平化props</span>
              <code>&lt;UserCard name={user.name} avatar={user.avatar} /&gt;</code>
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">4</div>
          <div class="practice-content">
            <h3>组件拆分</h3>
            <p>将大型组件拆分为多个小型纯组件</p>
            <div class="code-snippet">
              <span class="code-comment">// 拆分前：复杂组件</span>
              <code>&lt;UserProfile user={user} /&gt;</code>
              <br>
              <span class="code-comment">// 拆分后：组合纯组件</span>
              <code>&lt;UserHeader {...user} /&gt;</code>
              <code>&lt;UserStats {...user} /&gt;</code>
            </div>
          </div>
        </div>
      </div>

      <div class="performance-graph">
        <h3>纯组件性能影响</h3>
        <div class="graph-container">
          <div class="graph-bar" style="width: 100%; background-color: #e74c3c;">
            <span>常规组件渲染次数</span>
          </div>
          <div class="graph-bar" style="width: 40%; background-color: #2ecc71;">
            <span>纯组件渲染次数</span>
          </div>
        </div>
        <div class="graph-note">
          在典型应用中，纯组件可减少60%以上的不必要的重新渲染
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">📱</span>
        纯组件使用场景
      </h2>

      <div class="scenarios-grid">
        <div class="scenario-card">
          <div class="scenario-header">
            <div class="scenario-icon">📊</div>
            <h3>数据展示组件</h3>
          </div>
          <p>展示静态或低频更新数据的组件</p>
          <ul>
            <li>卡片组件</li>
            <li>列表项</li>
            <li>数据表格行</li>
          </ul>
        </div>

        <div class="scenario-card">
          <div class="scenario-header">
            <div class="scenario-icon">🎮</div>
            <h3>UI控件</h3>
          </div>
          <p>按钮、输入框等基础UI元素</p>
          <ul>
            <li>自定义按钮</li>
            <li>图标组件</li>
            <li>工具提示</li>
          </ul>
        </div>

        <div class="scenario-card">
          <div class="scenario-header">
            <div class="scenario-icon">📚</div>
            <h3>大型列表</h3>
          </div>
          <p>渲染大量列表项的场景</p>
          <ul>
            <li>聊天消息列表</li>
            <li>产品目录</li>
            <li>社交动态流</li>
          </ul>
        </div>

        <div class="scenario-card">
          <div class="scenario-header">
            <div class="scenario-icon">🔌</div>
            <h3>高阶组件</h3>
          </div>
          <p>作为其他组件的容器</p>
          <ul>
            <li>布局组件</li>
            <li>上下文提供者</li>
            <li>错误边界</li>
          </ul>
        </div>
      </div>

      <div class="avoid-section">
        <h3 class="avoid-title">避免使用纯组件的情况</h3>
        <div class="avoid-list">
          <div class="avoid-item">
            <div class="avoid-icon">❌</div>
            <div class="avoid-content">
              <h4>频繁变化的组件</h4>
              <p>props/state频繁变化的组件，浅比较反而增加开销</p>
            </div>
          </div>
          <div class="avoid-item">
            <div class="avoid-icon">❌</div>
            <div class="avoid-content">
              <h4>深层嵌套对象</h4>
              <p>使用深层嵌套对象且不方便使用不可变数据的情况</p>
            </div>
          </div>
          <div class="avoid-item">
            <div class="avoid-icon">❌</div>
            <div class="avoid-content">
              <h4>依赖外部状态的组件</h4>
              <p>高度依赖全局状态或上下文的组件</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="icon">💎</span>
        总结
      </h2>

      <div class="summary">
        <div class="summary-content">
          <div class="pros-cons">
            <div class="pros">
              <h3>纯组件优势</h3>
              <ul>
                <li>自动性能优化，减少不必要的渲染</li>
                <li>代码更可预测，易于测试</li>
                <li>无副作用，提高组件复用性</li>
                <li>简化性能优化工作</li>
              </ul>
            </div>
            <div class="cons">
              <h3>使用注意事项</h3>
              <ul>
                <li>浅比较无法检测深层对象变化</li>
                <li>需要配合不可变数据模式</li>
                <li>可能阻碍必要的更新（如果使用不当）</li>
                <li>不适合所有场景</li>
              </ul>
            </div>
          </div>

          <div class="recommendation">
            <div class="recommendation-icon">💡</div>
            <div class="recommendation-content">
              <h3>专家建议</h3>
              <p>
                在大型React应用中，优先将叶子组件（特别是列表项）实现为纯组件。对于函数组件，默认使用<code>React.memo</code>包裹，除非有明确理由不这样做。始终配合不可变数据更新模式以获得最佳性能。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>React纯组件指南 · 优化应用性能 · {new Date().getFullYear()}</p>
      <div class="footer-links">
        <a href="#">React官方文档</a> ·
        <a href="#">性能优化指南</a> ·
        <a href="#">不可变数据模式</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要实际逻辑，仅用于演示
import { ref } from 'vue';

const activeTab = ref('definition');
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@text-primary: #2b2d42;
@text-secondary: #5c677d;
@border-color: #e1e4e8;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@warning-color: #f72585;
@success-color: #4cc9f0;

.pure-component-container {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.header {
  text-align: center;
  background: linear-gradient(135deg, lighten(@primary-color, 40%), lighten(@primary-color, 35%));
  border-radius: 16px;
  padding: 40px 30px;
  margin-bottom: 30px;
  border: 1px solid fade(@primary-color, 15%);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: darken(@primary-color, 20%);
  }

  .subtitle {
    font-size: 1.2rem;
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
  padding: 15px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 220px;

  .stat-icon {
    font-size: 1.8rem;
    width: 40px;
    height: 40px;
    background: fade(@primary-color, 10%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-value {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 2px;
    color: @text-primary;
  }

  .stat-label {
    color: @text-secondary;
    font-size: 0.85rem;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid fade(@primary-color, 10%);
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      font-size: 1.4rem;
    }
  }
}

.definition-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border-left: 4px solid @primary-color;
}

.comparison {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
  padding: 20px;
  background: fade(@primary-color, 5%);
  border-radius: 12px;
}

.comparison-item {
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);

  .comparison-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;

    .comparison-icon {
      font-size: 1.8rem;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
    }
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }
}

.comparison-arrow {
  font-size: 2rem;
  color: @primary-color;
  margin: 0 20px;
}

.principle {
  display: flex;
  gap: 15px;
  margin-top: 25px;
  padding: 15px;
  background: fade(@success-color, 10%);
  border-radius: 10px;
  border-left: 3px solid @success-color;

  .principle-icon {
    font-size: 1.8rem;
    color: @success-color;
  }

  .principle-content {
    flex: 1;

    p.code {
      font-family: 'Fira Code', monospace;
      background: fade(@success-color, 15%);
      padding: 10px;
      border-radius: 6px;
      margin: 10px 0;
    }
  }
}

.implementation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.implementation-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.implementation-header {
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, fade(@primary-color, 15%), fade(@primary-color, 8%));

  .implementation-icon {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    background: fade(@primary-color, 15%);
    color: @primary-color;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 0;
    font-size: 1.3rem;
    flex: 1;
    color: @text-primary;
  }

  .tag {
    background: fade(@primary-color, 15%);
    color: @primary-color;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }
}

pre,
code {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

pre {
  background: #2b2d42;
  color: #edf2f4;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 15px 0;

  code {
    background: transparent;
    padding: 0;
  }
}

.notes {
  padding: 0 15px 15px;

  h4 {
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 30px 0;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: fade(@primary-color, 5%);
      font-weight: 600;
      color: @text-primary;
    }

    tr:hover {
      background: fade(@primary-color, 3%);
    }
  }
}

.shallow-comparison {
  .comparison-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 25px 0;
  }

  .comparison-step {
    background: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    width: 80%;
    margin-bottom: 15px;
    text-align: center;

    .step-number {
      width: 32px;
      height: 32px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }

  .arrow {
    font-size: 1.5rem;
    color: @primary-color;
    margin: 5px 0;
  }
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.example-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  border-top: 3px solid fade(@success-color, 70%);

  .example-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;

    .example-icon {
      font-size: 1.5rem;
    }
  }

  pre {
    margin: 0;
  }
}

.warning-card {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  padding: 20px;
  background: fade(@warning-color, 8%);
  border-radius: 12px;
  border-left: 3px solid @warning-color;

  .warning-icon {
    font-size: 2rem;
    color: @warning-color;
    margin-top: 5px;
  }

  .warning-content {
    flex: 1;

    pre {
      margin-top: 10px;
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.practice-card {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  background: white;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-left: 3px solid @success-color;

  .practice-icon {
    font-size: 1.2rem;
    font-weight: bold;
    width: 32px;
    height: 32px;
    background: fade(@success-color, 15%);
    color: darken(@success-color, 25%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 3px;
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.05rem;
  }

  p {
    margin: 0 0 8px 0;
    font-size: 0.9rem;
    color: @text-secondary;
  }

  .code-snippet {
    background: fade(@success-color, 7%);
    padding: 10px;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;

    .code-comment {
      color: #6c757d;
      font-size: 0.8rem;
    }

    code {
      display: block;
      margin: 5px 0;
    }
  }
}

.performance-graph {
  margin-top: 40px;

  .graph-container {
    margin: 20px 0;
  }

  .graph-bar {
    height: 40px;
    margin-bottom: 15px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: white;
    font-weight: 500;
  }

  .graph-note {
    text-align: center;
    font-size: 0.9rem;
    color: @text-secondary;
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border-top: 3px solid fade(@primary-color, 50%);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .scenario-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;

    .scenario-icon {
      font-size: 1.4rem;
      width: 40px;
      height: 40px;
      background: fade(@primary-color, 10%);
      color: @primary-color;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  ul {
    padding-left: 20px;
    margin: 15px 0 0 0;

    li {
      margin-bottom: 5px;
      font-size: 0.9rem;
    }
  }
}

.avoid-section {
  margin-top: 40px;

  .avoid-title {
    color: @warning-color;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@warning-color, 20%);
  }
}

.avoid-list {
  margin-top: 20px;
}

.avoid-item {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;

  .avoid-icon {
    font-size: 1.5rem;
    color: @warning-color;
    margin-top: 3px;
  }

  h4 {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: @text-secondary;
  }
}

.summary {
  .summary-content {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  }

  .pros-cons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 30px;

    .pros {
      ul {
        padding-left: 25px;
        margin: 15px 0 0;

        li {
          margin-bottom: 10px;
          position: relative;

          &:before {
            content: "✓";
            color: @success-color;
            font-weight: bold;
            position: absolute;
            left: -25px;
          }
        }
      }
    }

    .cons {
      ul {
        padding-left: 25px;
        margin: 15px 0 0;

        li {
          margin-bottom: 10px;
          position: relative;

          &:before {
            content: "⚠️";
            position: absolute;
            left: -25px;
          }
        }
      }
    }
  }

  .recommendation {
    display: flex;
    gap: 18px;
    background: fade(@primary-color, 5%);
    border-radius: 12px;
    padding: 22px;
    border-left: 4px solid @primary-color;

    .recommendation-icon {
      font-size: 1.8rem;
      color: @primary-color;
      margin-top: 3px;
    }

    h3 {
      margin: 0 0 10px 0;
      color: @text-primary;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: @text-primary;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: @text-secondary;
  font-size: 0.9rem;

  .footer-links {
    margin-top: 10px;

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
  .header {
    padding: 30px 15px;

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
      font-size: 1.4rem;
    }
  }

  .implementation-grid {
    grid-template-columns: 1fr;
  }

  .comparison {
    flex-direction: column;

    .comparison-arrow {
      margin: 20px 0;
      transform: rotate(90deg);
    }
  }
}
</style>
