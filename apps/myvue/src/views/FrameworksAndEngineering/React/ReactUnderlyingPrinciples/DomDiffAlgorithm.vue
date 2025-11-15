<template>
  <div class="diff-algorithm-container">
    <header class="header">
      <div class="header-content">
        <h1>React Diff算法解析</h1>
        <p class="subtitle">高效DOM更新的核心机制</p>
        <div class="algorithm-animation">
          <div class="node old">A</div>
          <div class="node old">B</div>
          <div class="node old">C</div>
          <div class="arrow">→</div>
          <div class="node new">A</div>
          <div class="node new">D</div>
          <div class="node new">C</div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="section-header">
          <i class="icon fas fa-question-circle"></i>
          <h2>什么是Diff算法？</h2>
        </div>
        <div class="card">
          <div class="definition">
            <p>Diff算法是React用于比较两棵虚拟DOM树差异的核心算法。通过高效的比较策略，React能够最小化DOM操作，从而提升应用性能。</p>

            <div class="key-points">
              <div class="point">
                <div class="point-icon">
                  <i class="fas fa-bolt"></i>
                </div>
                <h3>核心目标</h3>
                <p>在O(n)复杂度内完成树比较</p>
              </div>
              <div class="point">
                <div class="point-icon">
                  <i class="fas fa-sitemap"></i>
                </div>
                <h3>比较对象</h3>
                <p>新旧虚拟DOM树</p>
              </div>
              <div class="point">
                <div class="point-icon">
                  <i class="fas fa-rocket"></i>
                </div>
                <h3>性能提升</h3>
                <p>减少不必要的DOM操作</p>
              </div>
            </div>
          </div>

          <div class="dom-comparison">
            <h3>虚拟DOM vs 真实DOM操作</h3>
            <div class="comparison-chart">
              <div class="bar virtual-dom" style="width: 30%">
                <span>虚拟DOM操作：30ms</span>
              </div>
              <div class="bar real-dom" style="width: 100%">
                <span>真实DOM操作：100ms</span>
              </div>
            </div>
            <p class="chart-note">虚拟DOM操作相比直接操作真实DOM快3倍以上</p>
          </div>
        </div>
      </section>

      <section class="principles-section">
        <div class="section-header">
          <i class="icon fas fa-lightbulb"></i>
          <h2>Diff算法的核心策略</h2>
        </div>

        <div class="principles-grid">
          <div class="principle">
            <div class="principle-header">
              <div class="number">1</div>
              <h3>分层比较</h3>
            </div>
            <div class="principle-content">
              <p>React只会对相同层级的节点进行比较，不会跨层级移动节点。</p>
              <div class="tree-structure">
                <div class="level">
                  <div class="node">A</div>
                </div>
                <div class="level">
                  <div class="node">B</div>
                  <div class="node">C</div>
                </div>
                <div class="level">
                  <div class="node">D</div>
                  <div class="node">E</div>
                </div>
              </div>
            </div>
          </div>

          <div class="principle">
            <div class="principle-header">
              <div class="number">2</div>
              <h3>组件类型比较</h3>
            </div>
            <div class="principle-content">
              <p>如果组件类型不同，React会直接替换整个组件及其子节点。</p>
              <div class="type-change">
                <div class="old-component">
                  <div class="component-header">Button</div>
                  <div class="component-content">提交</div>
                </div>
                <div class="arrow">→</div>
                <div class="new-component">
                  <div class="component-header">Input</div>
                  <div class="component-content">请输入...</div>
                </div>
              </div>
            </div>
          </div>

          <div class="principle">
            <div class="principle-header">
              <div class="number">3</div>
              <h3>Key的使用</h3>
            </div>
            <div class="principle-content">
              <p>通过key标识元素，React可以识别列表中的元素变化。</p>
              <div class="key-example">
                <div class="old-list">
                  <div class="item" v-for="item in listItems" :key="item.id">
                    <span class="key">Key: {{ item.id }}</span>
                    <span>{{ item.text }}</span>
                  </div>
                </div>
                <div class="arrow">→</div>
                <div class="new-list">
                  <div class="item" v-for="item in updatedListItems" :key="item.id">
                    <span class="key">Key: {{ item.id }}</span>
                    <span>{{ item.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="algorithm-section">
        <div class="section-header">
          <i class="icon fas fa-code"></i>
          <h2>Diff算法伪代码实现</h2>
        </div>

        <div class="algorithm-steps">
          <div class="step">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>节点类型比较</h3>
            </div>
            <div class="step-content">
              <div class="code-block">
                <pre><code>function diff(oldNode, newNode) {
  // 1. 如果节点类型不同，直接替换
  if (oldNode.type !== newNode.type) {
    replaceNode(oldNode, newNode);
    return;
  }

  // 2. 更新节点属性
  updateAttributes(oldNode, newNode);

  // 3. 递归比较子节点
  diffChildren(oldNode.children, newNode.children);
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>子节点比较策略</h3>
            </div>
            <div class="step-content">
              <div class="code-block">
                <pre><code>function diffChildren(oldChildren, newChildren) {
  const patches = [];
  let lastIndex = 0;

  // 遍历新节点
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    let found = false;

    // 在旧节点中查找
    for (let j = 0; j < oldChildren.length; j++) {
      const oldChild = oldChildren[j];

      // 如果找到相同key的节点
      if (newChild.key === oldChild.key) {
        found = true;

        // 递归比较
        diff(oldChild, newChild);

        if (j < lastIndex) {
          // 需要移动节点
          patches.push({type: 'MOVE', from: j, to: i});
        } else {
          lastIndex = j;
        }
        break;
      }
    }

    if (!found) {
      // 新增节点
      patches.push({type: 'INSERT', node: newChild, index: i});
    }
  }

  // 标记删除不再存在的节点
  oldChildren.forEach((child, index) => {
    if (!newChildren.some(n => n.key === child.key)) {
      patches.push({type: 'REMOVE', index});
    }
  });

  applyPatches(patches);
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-header">
              <div class="step-number">3</div>
              <h3>Key的重要性</h3>
            </div>
            <div class="step-content">
              <div class="code-block">
                <pre><code>// 没有key的情况（性能较差）
&lt;ul&gt;
  {items.map(item => &lt;li&gt;{item.text}&lt;/li&gt;)}
&lt;/ul&gt;

// 有key的情况（性能优化）
&lt;ul&gt;
  {items.map(item => (
    &lt;li key={item.id}&gt;{item.text}&lt;/li&gt;
  ))}
&lt;/ul&gt;</code></pre>
              </div>
              <div class="key-importance">
                <div class="case">
                  <h4>使用索引作为Key的问题：</h4>
                  <div class="list">
                    <div class="item" v-for="(item, index) in badKeyExample" :key="index">
                      <span class="key">Key: {{ index }}</span>
                      <span>{{ item }}</span>
                    </div>
                  </div>
                  <div class="problem">删除第一个元素后，所有索引改变，导致不必要的更新</div>
                </div>
                <div class="case">
                  <h4>使用唯一ID作为Key：</h4>
                  <div class="list">
                    <div class="item" v-for="item in goodKeyExample" :key="item.id">
                      <span class="key">Key: {{ item.id }}</span>
                      <span>{{ item.text }}</span>
                    </div>
                  </div>
                  <div class="benefit">删除元素时，只有被删除的元素需要处理</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="optimization-section">
        <div class="section-header">
          <i class="icon fas fa-tachometer-alt"></i>
          <h2>性能优化实践</h2>
        </div>

        <div class="optimization-grid">
          <div class="optimization">
            <div class="optimization-icon">
              <i class="fas fa-key"></i>
            </div>
            <h3>使用稳定Key</h3>
            <p>避免使用索引作为Key，使用唯一且稳定的标识符</p>
          </div>

          <div class="optimization">
            <div class="optimization-icon">
              <i class="fas fa-code-branch"></i>
            </div>
            <h3>避免深层嵌套</h3>
            <p>减少组件树的层级深度，提高Diff效率</p>
          </div>

          <div class="optimization">
            <div class="optimization-icon">
              <i class="fas fa-cube"></i>
            </div>
            <h3>组件拆分</h3>
            <p>将大型组件拆分为小组件，减少Diff范围</p>
          </div>

          <div class="optimization">
            <div class="optimization-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3>使用PureComponent</h3>
            <p>通过浅比较避免不必要的渲染</p>
          </div>
        </div>

        <div class="performance-tips">
          <h3>性能对比：</h3>
          <table>
            <thead>
              <tr>
                <th>操作类型</th>
                <th>无优化</th>
                <th>使用Diff优化</th>
                <th>提升幅度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>列表更新</td>
                <td>120ms</td>
                <td>25ms</td>
                <td>480%</td>
              </tr>
              <tr>
                <td>树结构更新</td>
                <td>280ms</td>
                <td>45ms</td>
                <td>622%</td>
              </tr>
              <tr>
                <td>属性更新</td>
                <td>80ms</td>
                <td>15ms</td>
                <td>533%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p> React Diff算法解析 | 深入理解React核心机制</p>
      <div class="links">
        <a href="#"><i class="fab fa-react"></i> React官方文档</a>
        <a href="#"><i class="fab fa-github"></i> 算法源码</a>
        <a href="#"><i class="fas fa-book"></i> 高级React模式</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 列表数据示例
const listItems = ref([
  { id: 'item1', text: '项目 1' },
  { id: 'item2', text: '项目 2' },
  { id: 'item3', text: '项目 3' }
]);

const updatedListItems = ref([
  { id: 'item1', text: '项目 1' },
  { id: 'item4', text: '项目 4' },
  { id: 'item3', text: '项目 3' }
]);

// Key使用示例
const badKeyExample = ref(['项目 A', '项目 B', '项目 C']);
const goodKeyExample = ref([
  { id: 'id1', text: '项目 A' },
  { id: 'id2', text: '项目 B' },
  { id: 'id3', text: '项目 C' }
]);
</script>

<style lang="less" scoped>



// 配色方案
@primary: #61dafb;
@secondary: #282c34;
@accent: #ff6b6b;
@success: #51cf66;
@warning: #fcc419;
@background: #f8f9fa;
@card-bg: #ffffff;
@text: #2c3e50;
@text-light: #7f8c8d;
@border: #eaecef;

.diff-algorithm-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text;
  background-color: @background;
  min-height: 100vh;

  .header {
    text-align: center;
    padding: 60px 20px 40px;
    margin-bottom: 30px;
    background: linear-gradient(135deg, @primary 0%, darken(@primary, 20%) 100%);
    color: white;
    border-radius: 0 0 20px 20px;
    position: relative;
    overflow: hidden;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      font-weight: 300;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .algorithm-animation {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 30px;

      .node {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        animation: float 3s ease-in-out infinite;

        &.old {
          background: fade(@warning, 90%);
          color: darken(@warning, 30%);
          animation-delay: 0s;
        }

        &.new {
          background: fade(@success, 90%);
          color: darken(@success, 30%);
          animation-delay: 0.5s;
        }
      }

      .arrow {
        font-size: 2rem;
        color: @text-light;
      }
    }
  }

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 10px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.8rem;
      color: @text;
      margin: 0;
    }

    .icon {
      margin-right: 12px;
      color: @primary;
      font-size: 1.5rem;
    }
  }

  .intro-section {
    .card {
      background: @card-bg;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }

    .key-points {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin: 30px 0;

      .point {
        background: lighten(@background, 1%);
        border-radius: 12px;
        padding: 25px;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .point-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
          background: fade(@primary, 10%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            font-size: 2rem;
            color: @primary;
          }
        }

        h3 {
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: @secondary;
        }

        p {
          text-align: center;
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .dom-comparison {
      background: lighten(@primary, 35%);
      border-radius: 12px;
      padding: 20px;
      border-left: 4px solid @primary;

      h3 {
        font-size: 1.2rem;
        margin-top: 0;
        margin-bottom: 15px;
        color: darken(@primary, 20%);
      }

      .comparison-chart {
        height: 40px;
        display: flex;
        margin-bottom: 10px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .bar {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          height: 100%;
          transition: width 0.8s ease;

          &.virtual-dom {
            background: linear-gradient(90deg, @primary, darken(@primary, 10%));
          }

          &.real-dom {
            background: linear-gradient(90deg, @accent, darken(@accent, 10%));
          }
        }
      }

      .chart-note {
        text-align: center;
        font-style: italic;
        color: @text-light;
        font-size: 0.9rem;
      }
    }
  }

  .principles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
  }

  .principle {
    background: @card-bg;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .principle-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .number {
        width: 40px;
        height: 40px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 15px;
      }

      h3 {
        margin: 0;
        color: @text;
        font-size: 1.4rem;
      }
    }

    .principle-content {
      p {
        color: @text-light;
        line-height: 1.7;
        margin-bottom: 20px;
      }

      .tree-structure {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 15px;
        background: lighten(@background, 1%);
        border-radius: 8px;

        .level {
          display: flex;
          gap: 20px;

          .node {
            width: 50px;
            height: 50px;
            background: fade(@primary, 15%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
            color: darken(@primary, 20%);
          }
        }
      }

      .type-change {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        padding: 20px;

        .old-component,
        .new-component {
          border: 2px solid @border;
          border-radius: 8px;
          overflow: hidden;
          width: 120px;

          .component-header {
            background: fade(@accent, 20%);
            padding: 10px;
            text-align: center;
            font-weight: bold;
          }

          .component-content {
            padding: 15px;
            text-align: center;
          }
        }

        .arrow {
          font-size: 1.5rem;
          color: @text-light;
        }
      }

      .key-example {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 10px;

        .old-list,
        .new-list {
          flex: 1;

          .item {
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            background: lighten(@background, 1%);

            .key {
              font-size: 0.8rem;
              color: @text-light;
              margin-bottom: 5px;
            }
          }
        }

        .old-list .item {
          background: fade(@warning, 15%);
        }

        .new-list .item {
          background: fade(@success, 15%);
        }

        .arrow {
          font-size: 1.5rem;
          color: @text-light;
        }
      }
    }
  }

  .algorithm-steps {
    background: @card-bg;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 40px;
  }

  .step {
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid @border;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .step-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .step-number {
        width: 40px;
        height: 40px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 15px;
      }

      h3 {
        margin: 0;
        color: @text;
        font-size: 1.4rem;
      }
    }

    .code-block {
      background: lighten(@background, 1%);
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      border: 1px solid @border;
      margin-bottom: 25px;

      pre {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.5;
      }

      code {
        color: #24292e;
      }
    }

    .key-importance {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;

      .case {
        background: lighten(@background, 1%);
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        h4 {
          margin-top: 0;
          margin-bottom: 15px;
          color: @text;
        }

        .list {
          .item {
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            background: white;
            border: 1px solid @border;

            .key {
              font-size: 0.8rem;
              color: @text-light;
              margin-bottom: 5px;
            }
          }
        }

        .problem {
          margin-top: 15px;
          padding: 10px;
          background: fade(@accent, 10%);
          border-radius: 6px;
          color: darken(@accent, 20%);
          font-size: 0.9rem;
        }

        .benefit {
          margin-top: 15px;
          padding: 10px;
          background: fade(@success, 10%);
          border-radius: 6px;
          color: darken(@success, 20%);
          font-size: 0.9rem;
        }
      }
    }
  }

  .optimization-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .optimization {
      text-align: center;
      padding: 25px 20px;
      background: @card-bg;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      .optimization-icon {
        width: 70px;
        height: 70px;
        margin: 0 auto 15px;
        background: fade(@primary, 10%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 2rem;
          color: @primary;
        }
      }

      h3 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: @secondary;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }

  .performance-tips {
    background: @card-bg;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 20px;
      color: @text;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid @border;
      }

      th {
        background: lighten(@background, 1%);
        font-weight: 600;
        color: @text;
      }

      tr:hover {
        background: fade(@primary, 5%);
      }

      tr:last-child td {
        border-bottom: none;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 60px;
    padding-top: 30px;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border;

    .links {
      margin-top: 15px;

      a {
        color: @primary;
        text-decoration: none;
        margin: 0 15px;
        display: inline-block;
        font-weight: 500;

        i {
          margin-right: 5px;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}

@media (max-width: 768px) {
  .header {
    padding: 40px 20px 30px !important;

    h1 {
      font-size: 2rem !important;
    }

    .subtitle {
      font-size: 1.1rem !important;
    }

    .algorithm-animation {
      flex-wrap: wrap;

      .node {
        width: 50px !important;
        height: 50px !important;
        font-size: 1.2rem !important;
      }
    }
  }

  .section-header {
    h2 {
      font-size: 1.5rem !important;
    }
  }
}
</style>
