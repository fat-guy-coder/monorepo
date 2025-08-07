<template>
  <div class="react-comparison-container">
    <div class="header">
      <h1><i class="icon-react"></i> React 函数式组件 vs 类组件</h1>
      <p class="subtitle">基本解析两种组件模式的差异与最佳实践</p>
    </div>

    <div class="intro-card">
      <div class="intro-content">
        <h3>React组件演进</h3>
        <p>React组件经历了从类组件到函数式组件的演进过程。随着React Hooks的引入，函数式组件已成为现代React开发的主流模式。</p>
        <div class="key-points">
          <div class="point">
            <div class="point-icon">2015</div>
            <div>
              <h4>类组件时代</h4>
              <p>React 0.13引入类组件，提供完整的生命周期和状态管理</p>
            </div>
          </div>
          <div class="point">
            <div class="point-icon">2018</div>
            <div>
              <h4>Hooks诞生</h4>
              <p>React 16.8引入Hooks，函数式组件获得完整能力</p>
            </div>
          </div>
          <div class="point">
            <div class="point-icon">2023+</div>
            <div>
              <h4>函数式主导</h4>
              <p>函数式组件成为社区推荐标准，新项目首选</p>
            </div>
          </div>
        </div>
      </div>
      <div class="adoption-chart">
        <div class="chart-bar"
          style="width: 85%; background: linear-gradient(90deg, var(--functional-gradient), var(--functional-dark));">
          <span>函数式组件 85%</span>
        </div>
        <div class="chart-bar"
          style="width: 15%; background: linear-gradient(90deg, var(--class-gradient), var(--class-dark)); margin-top: 8px">
          <span>类组件 15%</span>
        </div>
        <div class="chart-caption">2024年React社区组件使用统计</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-syntax"></i> 语法对比</h2>
        <p>两种组件的基本语法结构差异</p>
      </div>

      <div class="comparison-cards">
        <div class="card functional">
          <div class="card-header">
            <h3>函数式组件</h3>
            <div class="card-badge">现代写法</div>
          </div>
          <pre class="code-snippet">import React, { useState, useEffect } from 'react';

function FunctionalComponent(props) {
  // 状态管理
  const [count, setCount] = useState(0);

  // 副作用处理
  useEffect(() => {
    document.title = `点击次数: ${count}`;
    return () => console.log('清理');
  }, [count]);

  // 事件处理
  const handleClick = () => {
    setCount(c => c + 1);
  };

  return (
    &lt;div&gt;
      &lt;p&gt;计数: {count}&lt;/p&gt;
      &lt;button onClick={handleClick}&gt;增加&lt;/button&gt;
    &lt;/div&gt;
  );
}

export default FunctionalComponent;</pre>
          <div class="features">
            <div class="feature">
              <i class="feature-icon">✓</i>
              <span>更简洁的函数语法</span>
            </div>
            <div class="feature">
              <i class="feature-icon">✓</i>
              <span>无this绑定问题</span>
            </div>
            <div class="feature">
              <i class="feature-icon">✓</i>
              <span>更少的样板代码</span>
            </div>
          </div>
        </div>

        <div class="card class-based">
          <div class="card-header">
            <h3>类组件</h3>
            <div class="card-badge">传统写法</div>
          </div>
          <pre class="code-snippet">import React from 'react';

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    // 状态初始化
    this.state = { count: 0 };
    // 方法绑定
    this.handleClick = this.handleClick.bind(this);
  }

  // 生命周期方法
  componentDidMount() {
    document.title = `点击次数: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `点击次数: ${this.state.count}`;
  }

  componentWillUnmount() {
    console.log('清理');
  }

  // 事件处理方法
  handleClick() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  render() {
    return (
      &lt;div&gt;
        &lt;p&gt;计数: {this.state.count}&lt;/p&gt;
        &lt;button onClick={this.handleClick}&gt;增加&lt;/button&gt;
      &lt;/div&gt;
    );
  }
}

export default ClassComponent;</pre>
          <div class="features">
            <div class="feature">
              <i class="feature-icon">ⓘ</i>
              <span>基于ES6类语法</span>
            </div>
            <div class="feature">
              <i class="feature-icon">⚠</i>
              <span>需要处理this绑定</span>
            </div>
            <div class="feature">
              <i class="feature-icon">ⓘ</i>
              <span>更多样板代码</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-features"></i> 核心特性对比</h2>
        <p>两种组件模式在关键功能上的差异</p>
      </div>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th width="22%">特性</th>
              <th width="39%">函数式组件</th>
              <th width="39%">类组件</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>状态管理</strong></td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon functional">✓</i>
                  <div>
                    <p>使用useState Hook</p>
                    <p class="detail">状态被拆分为独立变量，更新更细粒度</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon">✓</i>
                  <div>
                    <p>this.state和this.setState</p>
                    <p class="detail">单一状态对象，更新时自动合并</p>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td><strong>生命周期</strong></td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon functional">✓</i>
                  <div>
                    <p>使用useEffect Hook</p>
                    <p class="detail">基于依赖数组的副作用管理，更灵活</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon">✓</i>
                  <div>
                    <p>componentDidMount, componentDidUpdate等</p>
                    <p class="detail">明确的生命周期方法，更结构化</p>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td><strong>上下文访问</strong></td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon functional">✓</i>
                  <div>
                    <p>useContext Hook</p>
                    <p class="detail">简洁的上下文消费方式</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon">✓</i>
                  <div>
                    <p>Context.Consumer或this.context</p>
                    <p class="detail">需要static contextType或Consumer包裹</p>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td><strong>Refs使用</strong></td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon functional">✓</i>
                  <div>
                    <p>useRef Hook</p>
                    <p class="detail">创建可变引用对象，跨渲染保持稳定</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon">✓</i>
                  <div>
                    <p>React.createRef()或回调ref</p>
                    <p class="detail">挂载在实例属性上，this.refName访问</p>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td><strong>错误处理</strong></td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon">⚠</i>
                  <div>
                    <p>需使用错误边界组件封装</p>
                    <p class="detail">函数式组件自身无法捕获渲染错误</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon">✓</i>
                  <div>
                    <p>定义getDerivedStateFromError或componentDidCatch</p>
                    <p class="detail">类组件可直接实现错误边界</p>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td><strong>代码复用</strong></td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon functional">✓</i>
                  <div>
                    <p>自定义Hooks</p>
                    <p class="detail">强大的逻辑复用能力，自然组合</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon">ⓘ</i>
                  <div>
                    <p>高阶组件或渲染属性</p>
                    <p class="detail">模式较复杂，容易产生"包装地狱"</p>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td><strong>性能优化</strong></td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon functional">✓</i>
                  <div>
                    <p>React.memo包裹</p>
                    <p class="detail">useMemo和useCallback细粒度控制</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="feature-detail">
                  <i class="feature-icon">✓</i>
                  <div>
                    <p>PureComponent或shouldComponentUpdate</p>
                    <p class="detail">组件级优化，控制整个组件更新</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-pros-cons"></i> 优缺点对比</h2>
        <p>两种组件模式的利弊分析</p>
      </div>

      <div class="pros-cons">
        <div class="pros-cons-column functional">
          <h3>函数式组件优势</h3>
          <ul>
            <li><strong>代码更简洁</strong> - 减少约30%-50%代码量</li>
            <li><strong>更易理解和测试</strong> - 纯函数特性，无副作用</li>
            <li><strong>更好的TypeScript支持</strong> - 类型推导更简单</li>
            <li><strong>更优的性能潜力</strong> - 避免类实例化开销</li>
            <li><strong>未来兼容性</strong> - React团队发展重点</li>
            <li><strong>逻辑复用更灵活</strong> - 自定义Hooks</li>
          </ul>

          <h3>函数式组件劣势</h3>
          <ul>
            <li><strong>学习曲线</strong> - 需要掌握Hooks规则</li>
            <li><strong>状态管理分散</strong> - 多个useState调用</li>
            <li><strong>不能直接使用错误边界</strong> - 需封装在类组件中</li>
            <li><strong>细粒度优化要求更高</strong> - 需手动管理依赖</li>
          </ul>
        </div>

        <div class="pros-cons-column class-based">
          <h3>类组件优势</h3>
          <ul>
            <li><strong>生命周期明确</strong> - 代码结构更清晰</li>
            <li><strong>错误处理内置</strong> - 可直接捕获错误</li>
            <li><strong>状态集中管理</strong> - 单一state对象</li>
            <li><strong>更熟悉</strong> - 面向对象开发者的熟悉模式</li>
            <li><strong>遗留代码支持</strong> - 维护老项目必需</li>
          </ul>

          <h3>类组件劣势</h3>
          <ul>
            <li><strong>this绑定问题</strong> - 常见错误来源</li>
            <li><strong>代码冗余</strong> - 大量样板代码</li>
            <li><strong>逻辑复用困难</strong> - 高阶组件复杂</li>
            <li><strong>性能问题</strong> - 类实例化额外开销</li>
            <li><strong>未来支持有限</strong> - React团队不再积极开发</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-decision"></i> 选择指南</h2>
        <p>何时选择函数式组件或类组件</p>
      </div>

      <div class="decision-guide">
        <div class="guide-section">
          <h3>推荐使用函数式组件</h3>
          <div class="scenarios">
            <div class="scenario">
              <div class="scenario-icon">🔄</div>
              <div>
                <h4>新项目开发</h4>
                <p>所有新React项目应优先使用函数式组件</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🧩</div>
              <div>
                <h4>UI展示组件</h4>
                <p>无状态或简单状态的UI展示组件</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">📊</div>
              <div>
                <h4>复杂逻辑组件</h4>
                <p>需要组合多个数据源和副作用的组件</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🚀</div>
              <div>
                <h4>性能敏感组件</h4>
                <p>需要细粒度性能优化的组件</p>
              </div>
            </div>
          </div>
        </div>

        <div class="guide-section">
          <h3>可能需要类组件</h3>
          <div class="scenarios">
            <div class="scenario">
              <div class="scenario-icon">🛠️</div>
              <div>
                <h4>错误边界组件</h4>
                <p>需要实现componentDidCatch的组件</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">📜</div>
              <div>
                <h4>遗留代码维护</h4>
                <p>维护未重构的老项目时</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🏗️</div>
              <div>
                <h4>特定生命周期需求</h4>
                <p>需要getSnapshotBeforeUpdate等特殊生命周期</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🧑‍🏫</div>
              <div>
                <h4>教学目的</h4>
                <p>讲解React历史和类组件概念时</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="migration-tip">
        <div class="tip-icon">🔄</div>
        <div>
          <h4>迁移建议</h4>
          <p>现有类组件无需立即重写，但新开发应使用函数式组件。大型项目可采用渐进式迁移策略。</p>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-summary"></i> 总结</h2>
        <p>React组件模式的对比结论</p>
      </div>

      <div class="summary">
        <div class="conclusion">
          <div class="conclusion-header">
            <h3>函数式组件是现代React的标准选择</h3>
            <div class="recommended-badge">推荐</div>
          </div>
          <ul>
            <li>更简洁、更易读的代码结构</li>
            <li>更强大的逻辑复用能力（自定义Hooks）</li>
            <li>更好的TypeScript支持</li>
            <li>更小的打包体积</li>
            <li>React团队未来的发展方向</li>
          </ul>
        </div>

        <div class="final-thoughts">
          <p>"React Hooks的引入改变了React开发方式，函数式组件不再是无状态组件的代名词，它们现在可以完全替代类组件，并提供更优雅的代码组织和逻辑复用能力。"</p>
          <p class="author">- React核心团队成员 Dan Abramov</p>
        </div>
      </div>
    </div>

    <div class="footer-note">
      本指南基于React 18+版本，更多信息请参考<a href="https://react.dev/" target="_blank">React官方文档</a>
    </div>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加组件逻辑
</script>

<style lang="less" scoped>


:root {
  --functional-light: #e3f2fd;
  --functional: #42a5f5;
  --functional-dark: #1e88e5;
  --functional-gradient: #64b5f6;

  --class-light: #f3e5f5;
  --class: #ab47bc;
  --class-dark: #8e24aa;
  --class-gradient: #ba68c8;

  --text-primary: #2d3748;
  --text-secondary: #718096;
  --border-light: #e2e8f0;
  --card-bg: #ffffff;
  --background: #f8fafc;
}

.react-comparison-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 25px;
  background-color: var(--background);
  color: var(--text-primary);
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 40px 0 30px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    .icon-react {
      display: inline-block;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #61dafb, #2b6cb0);
      border-radius: 50%;
      position: relative;

      &::before {
        content: "⚛";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.8rem;
        color: white;
      }
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
  }
}

.intro-card {
  background: linear-gradient(135deg, rgba(97, 218, 251, 0.05), rgba(43, 108, 176, 0.05));
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  border-left: 4px solid var(--functional);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  .intro-content {
    flex: 1;
    min-width: 300px;

    h3 {
      font-size: 1.7rem;
      margin-bottom: 20px;
      color: var(--text-primary);
    }

    p {
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 25px;
      color: var(--text-primary);
    }
  }

  .key-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 25px;

    .point {
      display: flex;
      gap: 15px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      }

      .point-icon {
        min-width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--functional), 0.1);
        color: var(--functional-dark);
        border-radius: 50%;
        font-weight: 700;
        font-size: 1.1rem;
      }

      h4 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: var(--text-primary);
      }

      p {
        font-size: 0.92rem;
        color: var(--text-secondary);
        margin: 0;
      }
    }
  }

  .adoption-chart {
    flex: 1;
    min-width: 300px;
    padding: 25px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .chart-bar {
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: white;
      font-weight: 600;
      font-size: 0.95rem;
      transition: width 1s ease;
    }

    .chart-caption {
      text-align: center;
      margin-top: 15px;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
  }
}

.section {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 35px;
  margin-bottom: 35px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(var(--functional), 0.1);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 10px;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 15px;

      [class^="icon-"] {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--functional), 0.1);
        color: var(--functional);
        border-radius: 50%;
        font-size: 1.2rem;
      }
    }

    p {
      color: var(--text-secondary);
      font-size: 1.05rem;
      padding-left: 51px;
    }
  }
}

.comparison-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;
  margin: 25px 0;

  .card {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
    }

    .card-header {
      padding: 22px 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-size: 1.4rem;
        margin: 0;
      }

      .card-badge {
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
      }
    }

    .code-snippet {
      margin: 0;
      border-radius: 0;
      max-height: 380px;
      overflow-y: auto;
    }

    .features {
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 15px;

      .feature {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.95rem;
        font-weight: 500;

        .feature-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.9rem;
          font-weight: bold;
        }
      }
    }
  }

  .functional {
    .card-header {
      background: linear-gradient(135deg, var(--functional-light), var(--functional));
      color: white;

      .card-badge {
        background: rgba(255, 255, 255, 0.25);
        color: white;
      }
    }

    .features .feature-icon {
      background: rgba(var(--functional), 0.15);
      color: var(--functional-dark);
    }
  }

  .class-based {
    .card-header {
      background: linear-gradient(135deg, var(--class-light), var(--class));
      color: white;

      .card-badge {
        background: rgba(255, 255, 255, 0.25);
        color: white;
      }
    }

    .features .feature-icon {
      background: rgba(var(--class), 0.15);
      color: var(--class-dark);
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 25px 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;

    th,
    td {
      padding: 16px 20px;
      vertical-align: top;
      border-bottom: 1px solid var(--border-light);
    }

    thead {
      background: linear-gradient(135deg, var(--functional-light), var(--class-light));

      th {
        font-weight: 700;
        font-size: 1.1rem;
        color: var(--text-primary);

        &:first-child {
          border-radius: 12px 0 0 0;
        }

        &:last-child {
          border-radius: 0 12px 0 0;
        }
      }
    }

    tbody {
      tr {
        &:hover {
          background: rgba(var(--functional), 0.03);
        }

        td:first-child {
          font-weight: 700;
        }
      }
    }
  }

  .feature-detail {
    display: flex;
    gap: 12px;

    .feature-icon {
      min-width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-weight: bold;
      font-size: 1rem;
      flex-shrink: 0;

      &.functional {
        background: rgba(var(--functional), 0.15);
        color: var(--functional-dark);
      }
    }

    p {
      margin: 0;
      font-weight: 500;

      &.detail {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-top: 5px;
      }
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;

  .pros-cons-column {
    padding: 25px;
    border-radius: 14px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

    h3 {
      font-size: 1.3rem;
      padding-bottom: 10px;
      margin-top: 0;
      border-bottom: 2px solid rgba(0, 0, 0, 0.05);
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 15px;
        line-height: 1.6;
        position: relative;

        &::before {
          position: absolute;
          left: -20px;
        }
      }
    }
  }

  .functional {
    background: rgba(var(--functional), 0.05);
    border-top: 4px solid var(--functional);

    h3:first-of-type {
      color: var(--functional-dark);
    }

    ul li::before {
      content: "◆";
      color: var(--functional);
    }
  }

  .class-based {
    background: rgba(var(--class), 0.05);
    border-top: 4px solid var(--class);

    h3:first-of-type {
      color: var(--class-dark);
    }

    ul li::before {
      content: "◆";
      color: var(--class);
    }
  }
}

.decision-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;
  margin: 25px 0;

  .guide-section {
    padding: 25px;
    border-radius: 14px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    background: white;

    h3 {
      font-size: 1.3rem;
      padding-bottom: 15px;
      margin-top: 0;
      border-bottom: 2px solid rgba(0, 0, 0, 0.05);
    }

    &.functional-section h3 {
      color: var(--functional-dark);
      border-bottom-color: rgba(var(--functional), 0.2);
    }

    &.class-section h3 {
      color: var(--class-dark);
      border-bottom-color: rgba(var(--class), 0.2);
    }
  }

  .scenarios {
    .scenario {
      display: flex;
      gap: 15px;
      padding: 15px 0;
      border-bottom: 1px solid var(--border-light);

      &:last-child {
        border-bottom: none;
      }

      .scenario-icon {
        font-size: 1.5rem;
        min-width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.03);
        border-radius: 10px;
      }

      h4 {
        margin: 0 0 5px;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: var(--text-secondary);
      }
    }
  }

  .migration-tip {
    display: flex;
    gap: 20px;
    padding: 25px;
    margin-top: 25px;
    border-radius: 14px;
    background: rgba(255, 237, 158, 0.3);
    border-left: 4px solid #ffc107;

    .tip-icon {
      font-size: 2rem;
      min-width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h4 {
      margin: 0 0 10px;
      font-size: 1.2rem;
      color: #e65100;
    }

    p {
      margin: 0;
      font-size: 1rem;
      line-height: 1.6;
    }
  }
}

.summary {
  .conclusion {
    padding: 30px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(66, 165, 245, 0.1), rgba(30, 136, 229, 0.1));
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background: var(--functional);
    }

    .conclusion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h3 {
        font-size: 1.5rem;
        margin: 0;
        color: var(--functional-dark);
      }

      .recommended-badge {
        background: var(--functional);
        color: white;
        padding: 8px 18px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 0.95rem;
      }
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 15px;
        font-size: 1.1rem;
        font-weight: 500;
        position: relative;
        padding-left: 30px;

        &::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0;
          width: 24px;
          height: 24px;
          background: rgba(var(--functional), 0.2);
          color: var(--functional-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      }
    }
  }

  .final-thoughts {
    margin-top: 30px;
    padding: 25px;
    background: white;
    border-radius: 14px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    border-left: 4px solid var(--functional);
    font-style: italic;

    p {
      margin: 0 0 15px;
      font-size: 1.1rem;
      line-height: 1.8;

      &.author {
        text-align: right;
        font-style: normal;
        color: var(--text-secondary);
        font-size: 0.95rem;
        margin-bottom: 0;
      }
    }
  }
}

.code-snippet {
  background: #2d3747;
  color: #e2e8f0;
  padding: 22px;
  border-radius: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 0.92rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 15px 0;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

  .comment {
    color: #a0aec0;
  }

  .keyword {
    color: #63b3ed;
  }

  .function {
    color: #f6e05e;
  }

  .string {
    color: #68d391;
  }

  .variable {
    color: #f6ad55;
  }
}

.footer-note {
  text-align: center;
  padding: 20px;
  color: var(--text-secondary);
  font-size: 0.95rem;
  border-top: 1px dashed var(--border-light);
  margin-top: 30px;

  a {
    color: var(--functional-dark);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .intro-card .key-points {
    grid-template-columns: 1fr;
  }

  .comparison-cards {
    grid-template-columns: 1fr;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }

  .decision-guide {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 25px 20px;
  }
}
</style>
