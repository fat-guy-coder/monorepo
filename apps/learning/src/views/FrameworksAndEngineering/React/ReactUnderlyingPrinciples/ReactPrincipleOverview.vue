<template>
  <div class="react-principles-container">
    <header class="header">
      <h1>React原理深度解析</h1>
      <div class="subtitle">设计思路 · 底层原理 · 更新流程</div>
    </header>

    <div class="content-wrapper">
      <aside class="sidebar">
        <div class="toc">
          <div class="toc-title">内容大纲</div>
          <ul>
            <li v-for="(item, index) in tocItems" :key="index" @click="scrollTo(item.id)">
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div class="info-box">
          <h3>React核心特性</h3>
          <ul>
            <li>声明式UI</li>
            <li>组件化开发</li>
            <li>虚拟DOM</li>
            <li>单向数据流</li>
            <li>JSX语法</li>
          </ul>
        </div>
      </aside>

      <main class="main-content">
        <section id="design" class="section">
          <h2 class="section-title">一、React设计思路</h2>
          <div class="content-card">
            <h3>1. 声明式编程</h3>
            <p>React采用声明式编程范式，开发者只需描述UI应该是什么样子，而不需要关心如何更新到屏幕上。</p>
            <div class="principle">
              <div class="principle-item">
                <div class="principle-icon">✓</div>
                <div>
                  <strong>声明式优势：</strong>
                  <ul>
                    <li>代码更简洁易读</li>
                    <li>减少副作用</li>
                    <li>易于维护和调试</li>
                  </ul>
                </div>
              </div>
              <div class="principle-item">
                <div class="principle-icon">⟺</div>
                <div>
                  <strong>对比命令式：</strong>
                  <ul>
                    <li>避免直接操作DOM</li>
                    <li>不再需要手动管理状态更新</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>2. 组件化设计</h3>
            <p>React的核心思想是将UI拆分为独立可复用的组件，每个组件管理自己的状态和生命周期。</p>
            <div class="component-architecture">
              <div class="component-level top">
                <div class="component-node">App</div>
                <div class="connector"></div>
              </div>
              <div class="component-level middle">
                <div class="component-node">Header</div>
                <div class="component-node">MainContent</div>
                <div class="component-node">Sidebar</div>
              </div>
              <div class="component-level bottom">
                <div class="component-node">ProductList</div>
                <div class="component-node">UserProfile</div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>3. 虚拟DOM机制</h3>
            <p>虚拟DOM是React的核心创新，它在内存中维护一个轻量级的DOM表示，通过高效的Diff算法计算出最小更新操作。</p>
            <div class="vdom-process">
              <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-content">状态变化时创建新虚拟DOM树</div>
              </div>
              <div class="arrow">↓</div>
              <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-content">对比新旧虚拟DOM树</div>
              </div>
              <div class="arrow">↓</div>
              <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-content">计算最小差异（Diff算法）</div>
              </div>
              <div class="arrow">↓</div>
              <div class="process-step">
                <div class="step-number">4</div>
                <div class="step-content">批量更新真实DOM</div>
              </div>
            </div>
          </div>
        </section>

        <section id="core" class="section">
          <h2 class="section-title">二、React底层原理</h2>
          <div class="content-card">
            <h3>1. Fiber架构</h3>
            <p>React 16引入的Fiber架构彻底重构了核心算法，解决了大型应用中的性能问题。</p>
            <div class="fiber-features">
              <div class="feature">
                <div class="feature-icon">⏱️</div>
                <div>
                  <h4>增量渲染</h4>
                  <p>将渲染工作拆分为多个小任务，避免长时间阻塞主线程</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🎯</div>
                <div>
                  <h4>任务优先级</h4>
                  <p>为不同类型更新分配不同优先级（如动画、用户输入）</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <div>
                  <h4>任务恢复</h4>
                  <p>渲染过程可中断并可恢复，避免界面卡顿</p>
                </div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>2. 双缓存机制</h3>
            <p>React使用双缓存技术协调当前UI与正在计算的更新：</p>
            <div class="double-buffer">
              <div class="buffer-container">
                <div class="buffer current">
                  <div class="buffer-header">当前Fiber树</div>
                  <div class="buffer-content">正在屏幕上显示的UI</div>
                </div>
                <div class="buffer work">
                  <div class="buffer-header">WorkInProgress树</div>
                  <div class="buffer-content">正在构建的新UI</div>
                </div>
              </div>
              <div class="buffer-swap">
                <div class="swap-arrow">⇄</div>
                <div class="swap-text">Commit阶段完成后交换</div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>3. Diffing算法</h3>
            <p>React的DOM Diff算法基于两个重要假设：</p>
            <div class="diff-rules">
              <div class="rule">
                <div class="rule-badge">假设1</div>
                <p>不同类型的元素会产生不同的树结构</p>
              </div>
              <div class="rule">
                <div class="rule-badge">假设2</div>
                <p>开发者可以通过key属性标识子元素在不同渲染中的稳定性</p>
              </div>
            </div>
            <div class="diff-example">
              <h4>Diff策略对比：</h4>
              <table>
                <thead>
                  <tr>
                    <th>场景</th>
                    <th>策略</th>
                    <th>性能</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>根元素类型不同</td>
                    <td>直接销毁重建整棵树</td>
                    <td>💰💰💰</td>
                  </tr>
                  <tr>
                    <td>相同类型的DOM元素</td>
                    <td>更新属性，递归子元素</td>
                    <td>💰💰</td>
                  </tr>
                  <tr>
                    <td>相同类型的组件</td>
                    <td>更新组件props，触发重新渲染</td>
                    <td>💰</td>
                  </tr>
                  <tr>
                    <td>列表元素（带key）</td>
                    <td>基于key匹配最小移动操作</td>
                    <td>💰</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="update" class="section">
          <h2 class="section-title">三、React更新流程</h2>
          <div class="content-card">
            <h3>1. 调度阶段</h3>
            <p>React将更新任务分为不同优先级，调度器决定何时执行任务。</p>
            <div class="priority-levels">
              <div class="priority immediate">立即执行（Immediate）</div>
              <div class="priority user-blocking">用户阻塞（User-blocking）</div>
              <div class="priority normal">普通（Normal）</div>
              <div class="priority low">低（Low）</div>
              <div class="priority idle">空闲（Idle）</div>
            </div>
          </div>

          <div class="content-card">
            <h3>2. 协调阶段（Render Phase）</h3>
            <p>此阶段构建WorkInProgress树，计算DOM更新，可中断且无副作用。</p>
            <div class="reconciliation-flow">
              <div class="flow-step">
                <div class="flow-icon">1</div>
                <div class="flow-text">创建WorkInProgress节点</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step">
                <div class="flow-icon">2</div>
                <div class="flow-text">递归处理子节点</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step">
                <div class="flow-icon">3</div>
                <div class="flow-text">标记DOM副作用（增删改）</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step">
                <div class="flow-icon">4</div>
                <div class="flow-text">生成副作用链表</div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>3. 提交阶段（Commit Phase）</h3>
            <p>此阶段同步执行DOM更新，不可中断，包含三个子阶段：</p>
            <div class="commit-stages">
              <div class="stage">
                <div class="stage-title">Before Mutation</div>
                <ul>
                  <li>执行getSnapshotBeforeUpdate</li>
                  <li>调度useEffect</li>
                </ul>
              </div>
              <div class="stage">
                <div class="stage-title">Mutation</div>
                <ul>
                  <li>执行DOM更新操作</li>
                  <li>执行useLayoutEffect销毁函数</li>
                </ul>
              </div>
              <div class="stage">
                <div class="stage-title">Layout</div>
                <ul>
                  <li>执行useLayoutEffect创建函数</li>
                  <li>执行componentDidMount/Update</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>4. 完整更新流程图解</h3>
            <div class="update-flow-diagram">
              <div class="diagram-row">
                <div class="diagram-node">状态变更</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node">调度更新</div>
              </div>
              <div class="diagram-row">
                <div class="diagram-arrow">↓</div>
                <div class="diagram-spacer"></div>
                <div class="diagram-arrow">↓</div>
              </div>
              <div class="diagram-row">
                <div class="diagram-node-group">
                  <div class="diagram-node">协调阶段</div>
                  <div class="diagram-subnode">创建WIP树</div>
                  <div class="diagram-subnode">Diff计算</div>
                  <div class="diagram-subnode">收集副作用</div>
                </div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node-group">
                  <div class="diagram-node">提交阶段</div>
                  <div class="diagram-subnode">Before Mutation</div>
                  <div class="diagram-subnode">Mutation</div>
                  <div class="diagram-subnode">Layout</div>
                </div>
              </div>
              <div class="diagram-row">
                <div class="diagram-arrow">↓</div>
                <div class="diagram-spacer"></div>
                <div class="diagram-arrow">↓</div>
              </div>
              <div class="diagram-row">
                <div class="diagram-node">帧空闲时</div>
                <div class="diagram-arrow">→</div>
                <div class="diagram-node">执行useEffect</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>React原理基础介绍  | 基于React v18+核心架构</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tocItems = ref([
  { id: 'design', title: 'React设计思路' },
  { id: 'core', title: 'React底层原理' },
  { id: 'update', title: 'React更新流程' }
]);

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style lang="less" scoped>
.react-principles-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #eaecef;

  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    font-weight: 500;
  }
}

.content-wrapper {
  display: flex;
  gap: 30px;
}

.sidebar {
  flex: 0 0 260px;
  position: sticky;
  top: 20px;
  height: fit-content;

  .toc {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    padding: 20px;
    margin-bottom: 20px;

    .toc-title {
      font-weight: 600;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      color: #3498db;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 10px 15px;
        margin: 5px 0;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        color: #555;

        &:hover {
          background: #f0f7ff;
          color: #2980b9;
        }
      }
    }
  }

  .info-box {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    padding: 20px;

    h3 {
      margin-top: 0;
      color: #3498db;
    }

    ul {
      padding-left: 20px;
      color: #555;

      li {
        margin: 8px 0;
      }
    }
  }
}

.main-content {
  flex: 1;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  color: #2c3e50;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 1.8rem;
}

.content-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 25px;
  margin-bottom: 25px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  }

  h3 {
    color: #2980b9;
    margin-top: 0;
    padding-bottom: 10px;
    border-bottom: 1px dashed #eaecef;
  }

  p {
    line-height: 1.7;
    color: #444;
  }
}

.principle {
  display: flex;
  gap: 20px;
  margin: 20px 0;

  .principle-item {
    flex: 1;
    display: flex;
    gap: 15px;
    background: #f8fafc;
    padding: 15px;
    border-radius: 8px;
    border-left: 3px solid #3498db;

    .principle-icon {
      font-size: 24px;
      font-weight: bold;
      color: #3498db;
      min-width: 40px;
      height: 40px;
      background: #e1f0fa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ul {
      padding-left: 20px;
      margin: 10px 0 0 0;

      li {
        margin-bottom: 5px;
        color: #555;
      }
    }
  }
}

.component-architecture {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  .component-level {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 15px 0;
    position: relative;

    &.top {
      margin-bottom: 40px;
    }

    &.middle {
      margin: 25px 0;
    }

    &.bottom {
      margin-top: 40px;
    }
  }

  .component-node {
    width: 120px;
    height: 80px;
    background: #e1f0fa;
    border: 2px solid #3498db;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #2980b9;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.15);
  }

  .connector {
    position: absolute;
    bottom: -25px;
    height: 25px;
    width: 2px;
    background: #3498db;
  }
}

.vdom-process {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;

  .process-step {
    background: #e1f0fa;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    flex: 1;
    max-width: 200px;
    border: 1px solid #bbdefb;
  }

  .step-number {
    background: #3498db;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    font-weight: bold;
  }

  .step-content {
    font-size: 0.95rem;
    color: #2c3e50;
  }

  .arrow {
    color: #3498db;
    font-size: 1.5rem;
    padding: 0 10px;
  }
}

.fiber-features {
  display: flex;
  gap: 20px;
  margin: 20px 0;

  .feature {
    flex: 1;
    display: flex;
    gap: 15px;
    background: #f8fafc;
    padding: 20px;
    border-radius: 8px;
    border-left: 3px solid #3498db;

    .feature-icon {
      font-size: 24px;
      min-width: 40px;
      height: 40px;
      background: #e1f0fa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h4 {
      margin: 0 0 8px 0;
      color: #2980b9;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #555;
      line-height: 1.5;
    }
  }
}

.double-buffer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  .buffer-container {
    display: flex;
    gap: 40px;
    margin: 20px 0;
  }

  .buffer {
    width: 200px;
    height: 150px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

    &.current {
      background: linear-gradient(145deg, #e1f0fa, #bbdefb);
      border: 2px solid #3498db;
    }

    &.work {
      background: linear-gradient(145deg, #fff8e1, #ffecb3);
      border: 2px solid #ffb300;
    }
  }

  .buffer-header {
    background: rgba(0, 0, 0, 0.05);
    padding: 10px;
    font-weight: 600;
    text-align: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .buffer-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-align: center;
    font-size: 0.95rem;
  }

  .buffer-swap {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;

    .swap-arrow {
      font-size: 24px;
      color: #3498db;
    }

    .swap-text {
      font-weight: 500;
      color: #555;
    }
  }
}

.diff-rules {
  display: flex;
  gap: 20px;
  margin: 20px 0;

  .rule {
    flex: 1;
    background: #fff8e1;
    border: 1px solid #ffd54f;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
  }

  .rule-badge {
    background: #ffb300;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    font-weight: bold;
    font-size: 1.2rem;
  }
}

.diff-example {
  margin-top: 30px;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background: #f5f7fa;
      font-weight: 600;
      color: #2c3e50;
    }

    tr:hover {
      background: #f8f9fa;
    }
  }
}

.priority-levels {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;

  .priority {
    padding: 15px 20px;
    border-radius: 6px;
    font-weight: 500;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

    &.immediate {
      background: #ffebee;
      border-left: 4px solid #f44336;
    }

    &.user-blocking {
      background: #fff8e1;
      border-left: 4px solid #ffc107;
    }

    &.normal {
      background: #e3f2fd;
      border-left: 4px solid #2196f3;
    }

    &.low {
      background: #e8f5e9;
      border-left: 4px solid #4caf50;
    }

    &.idle {
      background: #f5f5f5;
      border-left: 4px solid #9e9e9e;
    }
  }
}

.reconciliation-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;

  .flow-step {
    background: #e1f0fa;
    border-radius: 8px;
    padding: 15px 20px;
    text-align: center;
    flex: 1;
    max-width: 200px;
    border: 1px solid #bbdefb;
  }

  .flow-icon {
    background: #3498db;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .flow-arrow {
    color: #3498db;
    font-size: 1.5rem;
    padding: 0 10px;
  }
}

.commit-stages {
  display: flex;
  gap: 20px;
  margin: 20px 0;

  .stage {
    flex: 1;
    background: #f8fafc;
    border-radius: 8px;
    padding: 20px;
    border-top: 3px solid #3498db;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .stage-title {
      font-weight: 600;
      margin-bottom: 15px;
      color: #2980b9;
      text-align: center;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 10px;
        color: #555;
        line-height: 1.5;
      }
    }
  }
}

.update-flow-diagram {
  background: #f0f7ff;
  border-radius: 10px;
  padding: 25px;
  margin-top: 20px;

  .diagram-row {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .diagram-node {
    background: #3498db;
    color: white;
    padding: 12px 25px;
    border-radius: 6px;
    font-weight: 500;
    box-shadow: 0 3px 6px rgba(52, 152, 219, 0.3);
  }

  .diagram-node-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .diagram-subnode {
    background: #aed6f1;
    color: #2c3e50;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 0.9rem;
    width: 160px;
  }

  .diagram-arrow {
    color: #3498db;
    font-size: 1.5rem;
    padding: 0 15px;
    display: flex;
    align-items: center;
  }
}

.footer {
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
  }

  .sidebar {
    position: relative;
    top: 0;
    flex: 0 0 auto;
    margin-bottom: 30px;
  }

  .principle,
  .fiber-features,
  .diff-rules,
  .commit-stages {
    flex-direction: column;
    gap: 15px;
  }

  .vdom-process,
  .reconciliation-flow {
    flex-direction: column;
    gap: 15px;

    .process-step,
    .flow-step {
      max-width: 100%;
    }
  }
}
</style>
