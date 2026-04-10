<template>
  <div class="fiber-container">
    <header class="header">
      <h1>React Fiber架构深度解析</h1>
      <div class="subtitle">新一代React核心调度引擎</div>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="intro-section">
          <div class="intro-card">
            <div class="intro-icon">⚡</div>
            <div class="intro-content">
              <p>React Fiber是React 16+的核心架构重构，彻底改变了React的渲染机制，解决了大型应用中的性能问题，并为并发渲染和Suspense等功能奠定了基础。</p>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">一、Fiber解决的问题</h2>
          <div class="content-card">
            <h3>1. 传统递归渲染的问题</h3>
            <p>在Fiber之前，React使用递归方式处理组件树更新：</p>
            <div class="recursion-problem">
              <div class="problem-item">
                <div class="problem-icon">⛔</div>
                <div>
                  <h4>同步阻塞渲染</h4>
                  <p>一旦开始渲染过程，直到整个组件树处理完成前无法中断</p>
                </div>
              </div>
              <div class="problem-item">
                <div class="problem-icon">⏱️</div>
                <div>
                  <h4>长时间任务阻塞主线程</h4>
                  <p>大型应用渲染时间可能超过16ms，导致掉帧和卡顿</p>
                </div>
              </div>
              <div class="problem-item">
                <div class="problem-icon">🚫</div>
                <div>
                  <h4>无法优先处理高优先级更新</h4>
                  <p>所有更新任务都按顺序处理，无法为交互事件提供即时响应</p>
                </div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>2. Fiber架构的目标</h3>
            <div class="goals-grid">
              <div class="goal-card">
                <div class="goal-icon">⏱️</div>
                <h4>增量渲染</h4>
                <p>将渲染工作拆分成小任务单元</p>
              </div>
              <div class="goal-card">
                <div class="goal-icon">🎯</div>
                <h4>任务优先级</h4>
                <p>区分不同优先级的更新任务</p>
              </div>
              <div class="goal-card">
                <div class="goal-icon">⏯️</div>
                <h4>可中断/恢复</h4>
                <p>渲染过程可暂停后继续</p>
              </div>
              <div class="goal-card">
                <div class="goal-icon">🔄</div>
                <h4>并发处理</h4>
                <p>在帧空闲时执行渲染任务</p>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">二、Fiber核心概念</h2>
          <div class="content-card">
            <h3>1. Fiber节点结构</h3>
            <p>每个组件对应一个Fiber节点，包含组件状态和渲染所需信息：</p>
            <div class="code-block">
              <pre><code>interface Fiber {
  // 组件类型信息
  tag: WorkTag;          // 组件类型 (函数组件/类组件/DOM元素等)
  type: any;             // 组件函数或类

  // 状态信息
  stateNode: any;        // 组件实例或DOM节点
  memoizedProps: any;    // 上次渲染使用的props
  memoizedState: any;    // 上次渲染使用的state

  // 链表关系
  return: Fiber | null;  // 父节点
  child: Fiber | null;   // 第一个子节点
  sibling: Fiber | null; // 下一个兄弟节点

  // 副作用标记
  flags: Flags;          // 需要执行的副作用类型
  nextEffect: Fiber | null; // 下一个有副作用的节点

  // 工作进度
  alternate: Fiber | null; // 当前节点对应的workInProgress节点

  // 任务优先级
  lanes: Lanes;          // 本次更新的优先级
  childLanes: Lanes;     // 子树的优先级
}</code></pre>
            </div>
          </div>

          <div class="content-card">
            <h3>2. Fiber链表结构</h3>
            <p>Fiber节点通过链表连接，替代了传统的树结构：</p>
            <div class="fiber-structure">
              <div class="fiber-node">App</div>
              <div class="arrow-down">↓</div>
              <div class="children">
                <div class="fiber-node">Header</div>
                <div class="arrow-right">→</div>
                <div class="fiber-node">Content</div>
                <div class="arrow-right">→</div>
                <div class="fiber-node">Footer</div>
              </div>
              <div class="arrow-down">↓</div>
              <div class="children">
                <div class="fiber-node">Section</div>
                <div class="arrow-right">→</div>
                <div class="fiber-node">Sidebar</div>
              </div>
            </div>
            <p class="structure-note">↑ 深度优先遍历形成的链表结构，便于中断和恢复</p>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">三、Fiber工作原理</h2>
          <div class="content-card">
            <h3>1. 双缓冲技术</h3>
            <p>React同时维护两棵Fiber树：</p>
            <div class="double-buffer">
              <div class="buffer-pair">
                <div class="buffer-card">
                  <div class="buffer-title">Current树</div>
                  <div class="buffer-content">
                    <p>当前屏幕上显示的状态</p>
                    <ul>
                      <li>渲染完成后成为新的current</li>
                      <li>用于与workInProgress树比较</li>
                    </ul>
                  </div>
                </div>
                <div class="buffer-card">
                  <div class="buffer-title">WorkInProgress树</div>
                  <div class="buffer-content">
                    <p>正在构建的新状态</p>
                    <ul>
                      <li>异步构建，可中断</li>
                      <li>完成后一次性切换</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="swap-process">
                <div class="swap-arrow">⇄</div>
                <div class="swap-text">Commit阶段完成后切换</div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>2. 任务优先级系统</h3>
            <p>React根据更新来源分配不同优先级：</p>
            <div class="priority-levels">
              <div class="priority immediate">
                <div class="priority-name">Immediate (最高)</div>
                <div class="priority-desc">点击、输入等交互事件</div>
              </div>
              <div class="priority high">
                <div class="priority-name">User-blocking</div>
                <div class="priority-desc">动画、过渡效果</div>
              </div>
              <div class="priority normal">
                <div class="priority-name">Normal</div>
                <div class="priority-desc">数据获取、普通更新</div>
              </div>
              <div class="priority low">
                <div class="priority-name">Low</div>
                <div class="priority-desc">分析日志、非关键更新</div>
              </div>
              <div class="priority idle">
                <div class="priority-name">Idle (最低)</div>
                <div class="priority-desc">空闲时执行的任务</div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>3. 调度算法流程</h3>
            <div class="scheduler-flow">
              <div class="flow-step">
                <div class="step-number">1</div>
                <div class="step-content">创建更新任务并分配优先级</div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-step">
                <div class="step-number">2</div>
                <div class="step-content">调度器检查帧剩余时间</div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-step">
                <div class="step-number">3</div>
                <div class="step-content">执行任务直到时间片用完</div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-step">
                <div class="step-number">4</div>
                <div class="step-content">暂停任务，交还主线程控制权</div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-step">
                <div class="step-number">5</div>
                <div class="step-content">主线程空闲时恢复任务</div>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">四、Fiber渲染流程</h2>
          <div class="content-card">
            <h3>1. 协调阶段（可中断）</h3>
            <div class="reconciliation-details">
              <div class="phase-card">
                <div class="phase-title">工作内容</div>
                <ul>
                  <li>创建WorkInProgress树</li>
                  <li>执行组件渲染函数</li>
                  <li>对比新旧Fiber节点</li>
                  <li>收集副作用（增删改）</li>
                </ul>
              </div>
              <div class="phase-card">
                <div class="phase-title">特点</div>
                <ul>
                  <li>可暂停、可中止、可重做</li>
                  <li>无副作用，安全中断</li>
                  <li>按优先级处理任务</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h3>2. 提交阶段（不可中断）</h3>
            <div class="commit-process">
              <div class="commit-step">
                <div class="step-header">Before Mutation</div>
                <ul>
                  <li>执行getSnapshotBeforeUpdate</li>
                  <li>调度useEffect</li>
                </ul>
              </div>
              <div class="arrow">→</div>
              <div class="commit-step">
                <div class="step-header">Mutation</div>
                <ul>
                  <li>执行DOM更新操作</li>
                  <li>执行useLayoutEffect销毁函数</li>
                </ul>
              </div>
              <div class="arrow">→</div>
              <div class="commit-step">
                <div class="step-header">Layout</div>
                <ul>
                  <li>执行useLayoutEffect创建函数</li>
                  <li>执行componentDidMount/Update</li>
                </ul>
              </div>
            </div>
            <div class="commit-note">
              <p>提交阶段同步执行，不可中断，确保UI一致性</p>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">五、Fiber带来的优势</h2>
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">🚀</div>
              <h3>流畅的用户体验</h3>
              <p>避免长时间任务阻塞主线程，确保动画流畅</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">⚡</div>
              <h3>即时交互响应</h3>
              <p>高优先级更新可中断低优先级任务</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🧩</div>
              <h3>并发渲染能力</h3>
              <p>支持Suspense、useTransition等新特性</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">📊</div>
              <h3>更好的错误处理</h3>
              <p>错误边界可捕获渲染过程的错误</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>React Fiber架构解析  | 基于React v18+实现原理</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 这里可以添加组件逻辑（如果需要）
const fiberDetails = ref({
  version: '18.2.0',
  releaseDate: '2022-06-14'
});
</script>

<style lang="less" scoped>
.fiber-container {
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
  margin-bottom: 40px;
  padding: 30px 0;
  background: linear-gradient(135deg, #1e5799 0%, #207cca 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 5px 20px rgba(30, 87, 153, 0.3);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    font-weight: 400;
  }
}

.content-wrapper {
  display: flex;
}

.main-content {
  flex: 1;
}

.intro-section {
  margin-bottom: 40px;
}

.intro-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #3498db;

  .intro-icon {
    font-size: 3.5rem;
    margin-right: 25px;
    color: #3498db;
  }

  .intro-content {
    flex: 1;

    p {
      font-size: 1.15rem;
      line-height: 1.7;
      color: #444;
      margin: 0;
    }
  }
}

.section {
  margin-bottom: 50px;
}

.section-title {
  color: #2c3e50;
  padding-bottom: 12px;
  border-bottom: 2px solid #3498db;
  margin-top: 0;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.content-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  }

  h3 {
    color: #2980b9;
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 1px dashed #eaecef;
    font-size: 1.4rem;
  }
}

.recursion-problem {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  .problem-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    background: #fff8f0;
    padding: 18px;
    border-radius: 8px;
    border-left: 4px solid #e67e22;

    .problem-icon {
      font-size: 2rem;
      color: #e67e22;
      margin-top: 5px;
    }

    h4 {
      margin: 0 0 8px 0;
      color: #d35400;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #7f8c8d;
      line-height: 1.5;
    }
  }
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 25px;

  .goal-card {
    text-align: center;
    padding: 25px 15px;
    background: #e1f0fa;
    border-radius: 10px;
    transition: all 0.3s;

    &:hover {
      background: #d1e8f5;
      transform: scale(1.03);
    }

    .goal-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: #2980b9;
    }

    h4 {
      margin: 0 0 10px 0;
      color: #2c3e50;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #7f8c8d;
    }
  }
}

.code-block {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      font-size: 0.95rem;
      line-height: 1.5;

      .comment {
        color: #6272a4;
      }

      .keyword {
        color: #ff79c6;
      }

      .string {
        color: #f1fa8c;
      }

      .type {
        color: #8be9fd;
      }

      .variable {
        color: #50fa7b;
      }

      .property {
        color: #f8f8f2;
      }
    }
  }
}

.fiber-structure {
  text-align: center;
  margin: 30px 0;
  padding: 20px;
  background: #f0f7ff;
  border-radius: 10px;

  .fiber-node {
    display: inline-block;
    padding: 12px 25px;
    background: #3498db;
    color: white;
    border-radius: 6px;
    font-weight: 500;
    box-shadow: 0 3px 8px rgba(52, 152, 219, 0.3);
    margin: 10px;
  }

  .arrow-down,
  .arrow-right {
    color: #3498db;
    font-size: 1.5rem;
    margin: 10px 0;
  }

  .arrow-right {
    display: inline-block;
    margin: 0 10px;
  }

  .children {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .structure-note {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin-top: 15px;
    font-style: italic;
  }
}

.double-buffer {
  .buffer-pair {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin: 30px 0;

    .buffer-card {
      width: 280px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

      .buffer-title {
        background: #3498db;
        color: white;
        padding: 15px;
        text-align: center;
        font-weight: 600;
        font-size: 1.1rem;
      }

      .buffer-content {
        padding: 20px;
        background: white;

        p {
          margin-top: 0;
          font-weight: 500;
        }

        ul {
          padding-left: 20px;
          margin-bottom: 0;

          li {
            margin-bottom: 10px;
            color: #555;
          }
        }
      }
    }
  }

  .swap-process {
    text-align: center;
    margin: 20px 0;

    .swap-arrow {
      font-size: 2rem;
      color: #3498db;
    }

    .swap-text {
      font-weight: 500;
      color: #555;
    }
  }
}

.priority-levels {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 25px 0;

  .priority {
    padding: 20px;
    border-radius: 8px;
    font-weight: 500;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s;

    &:hover {
      transform: translateX(5px);
    }

    .priority-name {
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 8px;
    }
  }

  .immediate {
    background: linear-gradient(to right, #ffebee, #ffffff);
    border-left: 5px solid #f44336;
  }

  .high {
    background: linear-gradient(to right, #fff8e1, #ffffff);
    border-left: 5px solid #ffc107;
  }

  .normal {
    background: linear-gradient(to right, #e3f2fd, #ffffff);
    border-left: 5px solid #2196f3;
  }

  .low {
    background: linear-gradient(to right, #e8f5e9, #ffffff);
    border-left: 5px solid #4caf50;
  }

  .idle {
    background: linear-gradient(to right, #f5f5f5, #ffffff);
    border-left: 5px solid #9e9e9e;
  }
}

.scheduler-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 30px 0;

  .flow-step {
    width: 100%;
    max-width: 500px;
    display: flex;
    align-items: center;
    background: #e1f0fa;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #bbdefb;

    .step-number {
      width: 40px;
      height: 40px;
      background: #3498db;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 20px;
      flex-shrink: 0;
    }

    .step-content {
      font-weight: 500;
      color: #2c3e50;
    }
  }

  .flow-arrow {
    color: #3498db;
    font-size: 1.5rem;
  }
}

.reconciliation-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 20px;

  .phase-card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 20px;
    border-top: 4px solid #3498db;

    .phase-title {
      font-weight: 600;
      margin-bottom: 15px;
      color: #2980b9;
      text-align: center;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 12px;
        color: #555;
        line-height: 1.5;
      }
    }
  }
}

.commit-process {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;

  .commit-step {
    background: #e1f0fa;
    border-radius: 10px;
    padding: 20px;
    width: 200px;
    text-align: center;
    border-top: 4px solid #2980b9;

    .step-header {
      font-weight: 600;
      margin-bottom: 15px;
      color: #2c3e50;
    }

    ul {
      padding-left: 15px;
      text-align: left;
      margin: 0;

      li {
        margin-bottom: 10px;
        font-size: 0.95rem;
        color: #555;
      }
    }
  }

  .arrow {
    color: #3498db;
    font-size: 2rem;
    display: flex;
    align-items: center;
  }
}

.commit-note {
  text-align: center;
  font-style: italic;
  color: #7f8c8d;
  margin-top: 15px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;

  .benefit-card {
    text-align: center;
    padding: 30px 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .benefit-icon {
      font-size: 3rem;
      margin-bottom: 20px;
      color: #3498db;
    }

    h3 {
      margin: 0 0 15px 0;
      color: #2c3e50;
    }

    p {
      margin: 0;
      color: #7f8c8d;
      line-height: 1.6;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .intro-card {
    flex-direction: column;
    text-align: center;

    .intro-icon {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }

  .reconciliation-details {
    grid-template-columns: 1fr;
  }

  .commit-process {
    flex-direction: column;
    align-items: center;

    .arrow {
      transform: rotate(90deg);
      padding: 15px 0;
    }
  }

  .double-buffer .buffer-pair {
    flex-direction: column;
    align-items: center;
  }
}
</style>
