<template>
  <div class="tree-traversal-container">
    <div class="header">
      <h1>树遍历算法基础介绍</h1>
      <p class="subtitle">探索树结构的深度优先与广度优先遍历方法</p>
    </div>

    <div class="navigation">
      <button v-for="section in sections" :key="section.id" @click="activeSection = section.id"
        :class="{ active: activeSection === section.id }">
        <i :class="section.icon"></i> {{ section.title }}
      </button>
    </div>

    <div class="content">
      <!-- 树遍历基础 -->
      <section v-if="activeSection === 'intro'" class="traversal-section">
        <div class="intro-content">
          <div class="tree-visualization">
            <div class="tree">
              <div class="node root">A</div>
              <div class="children">
                <div class="child">
                  <div class="node">B</div>
                  <div class="children">
                    <div class="child">
                      <div class="node">D</div>
                    </div>
                    <div class="child">
                      <div class="node">E</div>
                    </div>
                  </div>
                </div>
                <div class="child">
                  <div class="node">C</div>
                  <div class="children">
                    <div class="child">
                      <div class="node">F</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="intro-text">
            <h2><i class="fas fa-tree"></i> 树遍历基础</h2>
            <p>树是一种非线性的分层数据结构，由节点和边组成。树遍历是指按照特定顺序访问树中所有节点的过程。</p>

            <div class="traversal-types">
              <div class="type-card">
                <div class="type-icon">
                  <i class="fas fa-project-diagram"></i>
                </div>
                <h3>深度优先遍历(DFS)</h3>
                <p>沿着树的深度遍历节点，尽可能深地搜索树的分支</p>
              </div>
              <div class="type-card">
                <div class="type-icon">
                  <i class="fas fa-expand"></i>
                </div>
                <h3>广度优先遍历(BFS)</h3>
                <p>逐层遍历树，先访问根节点，然后访问所有子节点</p>
              </div>
            </div>

            <div class="tree-properties">
              <h3>树的基本术语：</h3>
              <ul>
                <li><strong>根节点(Root)</strong>：树的最顶层节点</li>
                <li><strong>子节点(Child)</strong>：从父节点延伸出的节点</li>
                <li><strong>叶节点(Leaf)</strong>：没有子节点的节点</li>
                <li><strong>深度(Depth)</strong>：从根节点到当前节点的边数</li>
                <li><strong>高度(Height)</strong>：从当前节点到最深叶节点的最长路径</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 深度优先遍历 -->
      <section v-if="activeSection === 'dfs'" class="traversal-section">
        <h2><i class="fas fa-code-branch"></i> 深度优先遍历(DFS)</h2>

        <div class="algorithm-group">
          <div class="algorithm-card">
            <h3><i class="fas fa-arrow-right"></i> 前序遍历 (Preorder)</h3>
            <div class="algorithm-description">
              <p>访问顺序：根节点 → 左子树 → 右子树</p>
              <div class="traversal-visual">
                <div class="traversal-path">
                  <span v-for="(node, idx) in preorderResult" :key="idx" :class="{ active: idx === preorderStep }"
                    class="path-node">
                    {{ node }}
                  </span>
                </div>
                <div class="traversal-controls">
                  <button @click="startPreorderDemo">开始演示</button>
                  <button @click="preorderStep = 0">重置</button>
                </div>
              </div>
            </div>
            <div class="algorithm-code">
              <pre><code class="typescript">// 前序遍历 - 递归实现
function preorder(root: TreeNode | null): void {
  if (root === null) return;

  // 1. 访问根节点
  console.log(root.val);

  // 2. 递归遍历左子树
  preorder(root.left);

  // 3. 递归遍历右子树
  preorder(root.right);
}

// 前序遍历 - 迭代实现
function preorderIterative(root: TreeNode | null): void {
  if (root === null) return;

  const stack: TreeNode[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    console.log(node.val); // 访问节点

    // 注意：先压入右子节点，再压入左子节点
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
}</code></pre>
            </div>
          </div>

          <div class="algorithm-card">
            <h3><i class="fas fa-arrow-right"></i> 中序遍历 (Inorder)</h3>
            <div class="algorithm-description">
              <p>访问顺序：左子树 → 根节点 → 右子树</p>
              <div class="traversal-visual">
                <div class="traversal-path">
                  <span v-for="(node, idx) in inorderResult" :key="idx" :class="{ active: idx === inorderStep }"
                    class="path-node">
                    {{ node }}
                  </span>
                </div>
                <div class="traversal-controls">
                  <button @click="startInorderDemo">开始演示</button>
                  <button @click="inorderStep = 0">重置</button>
                </div>
              </div>
            </div>
            <div class="algorithm-code">
              <pre><code class="typescript">// 中序遍历 - 递归实现
function inorder(root: TreeNode | null): void {
  if (root === null) return;

  // 1. 递归遍历左子树
  inorder(root.left);

  // 2. 访问根节点
  console.log(root.val);

  // 3. 递归遍历右子树
  inorder(root.right);
}

// 中序遍历 - 迭代实现
function inorderIterative(root: TreeNode | null): void {
  const stack: TreeNode[] = [];
  let current: TreeNode | null = root;

  while (current !== null || stack.length > 0) {
    // 遍历到最左侧节点
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    // 访问节点并转向右子树
    current = stack.pop()!;
    console.log(current.val);
    current = current.right;
  }
}</code></pre>
            </div>
          </div>

          <div class="algorithm-card">
            <h3><i class="fas fa-arrow-right"></i> 后序遍历 (Postorder)</h3>
            <div class="algorithm-description">
              <p>访问顺序：左子树 → 右子树 → 根节点</p>
              <div class="traversal-visual">
                <div class="traversal-path">
                  <span v-for="(node, idx) in postorderResult" :key="idx" :class="{ active: idx === postorderStep }"
                    class="path-node">
                    {{ node }}
                  </span>
                </div>
                <div class="traversal-controls">
                  <button @click="startPostorderDemo">开始演示</button>
                  <button @click="postorderStep = 0">重置</button>
                </div>
              </div>
            </div>
            <div class="algorithm-code">
              <pre><code class="typescript">// 后序遍历 - 递归实现
function postorder(root: TreeNode | null): void {
  if (root === null) return;

  // 1. 递归遍历左子树
  postorder(root.left);

  // 2. 递归遍历右子树
  postorder(root.right);

  // 3. 访问根节点
  console.log(root.val);
}

// 后序遍历 - 迭代实现
function postorderIterative(root: TreeNode | null): void {
  if (root === null) return;

  const stack: TreeNode[] = [root];
  const output: number[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!;
    output.push(node.val);

    // 先压入左子节点，再压入右子节点
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  // 反转结果得到后序遍历顺序
  output.reverse().forEach(val => console.log(val));
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 广度优先遍历 -->
      <section v-if="activeSection === 'bfs'" class="traversal-section">
        <h2><i class="fas fa-expand-arrows-alt"></i> 广度优先遍历(BFS)</h2>

        <div class="algorithm-group">
          <div class="algorithm-card">
            <h3><i class="fas fa-layer-group"></i> 层次遍历</h3>
            <div class="algorithm-description">
              <p>访问顺序：逐层访问节点，从左到右</p>
              <div class="bfs-visual">
                <div class="level" v-for="(level, idx) in bfsLevels" :key="idx">
                  <div class="level-label">第 {{ idx + 1 }} 层</div>
                  <div class="level-nodes">
                    <div v-for="(node, nidx) in level" :key="nidx" class="bfs-node"
                      :class="{ active: isBFSNodeActive(idx, nidx) }">
                      {{ node }}
                    </div>
                  </div>
                </div>
                <div class="traversal-controls">
                  <button @click="startBFSDemo">开始演示</button>
                  <button @click="resetBFS">重置</button>
                </div>
              </div>
            </div>
            <div class="algorithm-code">
              <pre><code class="typescript">// 层次遍历 - 使用队列实现
function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);

      // 将子节点加入队列
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// 层次遍历应用 - 求树的最大深度
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  let depth = 0;
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    depth++;
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 应用场景 -->
      <section v-if="activeSection === 'applications'" class="traversal-section">
        <h2><i class="fas fa-laptop-code"></i> 树遍历应用场景</h2>

        <div class="applications-grid">
          <div class="application-card">
            <div class="app-icon">
              <i class="fas fa-sitemap"></i>
            </div>
            <h3>文件系统遍历</h3>
            <p>深度优先遍历用于递归访问目录结构，广度优先遍历用于查找特定深度的文件</p>
          </div>

          <div class="application-card">
            <div class="app-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>DOM树操作</h3>
            <p>遍历DOM树查找特定元素，前序遍历用于创建DOM副本，后序遍历用于安全删除节点</p>
          </div>

          <div class="application-card">
            <div class="app-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h3>AI决策树</h3>
            <p>游戏AI中遍历决策树选择最优策略，深度优先用于穷尽可能性，广度优先用于查找最快解决方案</p>
          </div>

          <div class="application-card">
            <div class="app-icon">
              <i class="fas fa-network-wired"></i>
            </div>
            <h3>网络路由</h3>
            <p>路由器使用层次遍历查找最佳路径，深度优先用于探索所有可能路径</p>
          </div>

          <div class="application-card">
            <div class="app-icon">
              <i class="fas fa-sort-amount-down"></i>
            </div>
            <h3>表达式求值</h3>
            <p>后序遍历用于计算抽象语法树中的表达式值</p>
          </div>

          <div class="application-card">
            <div class="app-icon">
              <i class="fas fa-copy"></i>
            </div>
            <h3>序列化/反序列化</h3>
            <p>前序遍历用于序列化二叉树，广度优先遍历用于恢复树结构</p>
          </div>
        </div>
      </section>

      <!-- 复杂度分析 -->
      <section v-if="activeSection === 'complexity'" class="traversal-section">
        <h2><i class="fas fa-chart-bar"></i> 复杂度分析</h2>

        <div class="complexity-table">
          <table>
            <thead>
              <tr>
                <th>遍历算法</th>
                <th>时间复杂度</th>
                <th>空间复杂度</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>前序遍历</td>
                <td>O(n)</td>
                <td>O(h) - h为树高度</td>
                <td>复制树结构，前缀表达式</td>
              </tr>
              <tr>
                <td>中序遍历</td>
                <td>O(n)</td>
                <td>O(h)</td>
                <td>二叉搜索树排序输出</td>
              </tr>
              <tr>
                <td>后序遍历</td>
                <td>O(n)</td>
                <td>O(h)</td>
                <td>删除树节点，后缀表达式</td>
              </tr>
              <tr>
                <td>层次遍历</td>
                <td>O(n)</td>
                <td>O(w) - w为树宽度</td>
                <td>寻找最短路径，树深度</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="comparison">
          <div class="comparison-card">
            <h3>DFS vs BFS</h3>
            <div class="comparison-points">
              <div class="point">
                <div class="point-title">深度优先遍历(DFS)</div>
                <ul>
                  <li>空间复杂度较低：O(h)</li>
                  <li>适用于查找所有解或深层次解</li>
                  <li>实现简单（递归）</li>
                  <li>可能进入无限分支</li>
                </ul>
              </div>
              <div class="point">
                <div class="point-title">广度优先遍历(BFS)</div>
                <ul>
                  <li>空间复杂度较高：O(w)</li>
                  <li>适用于查找最短路径或最近解</li>
                  <li>需要队列数据结构</li>
                  <li>不会进入无限分支</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>树遍历是理解树结构和解决树相关问题的基础，掌握不同遍历方法及其应用场景至关重要</p>
      <div class="features">
        <span><i class="fas fa-lightbulb"></i> 理解树结构</span>
        <span><i class="fas fa-cogs"></i> 掌握遍历算法</span>
        <span><i class="fas fa-tasks"></i> 解决实际问题</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航部分
const sections = ref([
  { id: 'intro', title: '树遍历基础', icon: 'fas fa-tree' },
  { id: 'dfs', title: '深度优先遍历', icon: 'fas fa-code-branch' },
  { id: 'bfs', title: '广度优先遍历', icon: 'fas fa-expand-arrows-alt' },
  { id: 'applications', title: '应用场景', icon: 'fas fa-laptop-code' },
  { id: 'complexity', title: '复杂度分析', icon: 'fas fa-chart-bar' }
]);
const activeSection = ref('intro');

// 前序遍历演示
const preorderResult = ref(['A', 'B', 'D', 'E', 'C', 'F']);
const preorderStep = ref(0);
const startPreorderDemo = () => {
  preorderStep.value = 0;
  const interval = setInterval(() => {
    preorderStep.value++;
    if (preorderStep.value >= preorderResult.value.length) {
      clearInterval(interval);
    }
  }, 800);
};

// 中序遍历演示
const inorderResult = ref(['D', 'B', 'E', 'A', 'F', 'C']);
const inorderStep = ref(0);
const startInorderDemo = () => {
  inorderStep.value = 0;
  const interval = setInterval(() => {
    inorderStep.value++;
    if (inorderStep.value >= inorderResult.value.length) {
      clearInterval(interval);
    }
  }, 800);
};

// 后序遍历演示
const postorderResult = ref(['D', 'E', 'B', 'F', 'C', 'A']);
const postorderStep = ref(0);
const startPostorderDemo = () => {
  postorderStep.value = 0;
  const interval = setInterval(() => {
    postorderStep.value++;
    if (postorderStep.value >= postorderResult.value.length) {
      clearInterval(interval);
    }
  }, 800);
};

// BFS演示
const bfsLevels = ref([
  ['A'],
  ['B', 'C'],
  ['D', 'E', 'F']
]);
const bfsStep = ref(0);
const startBFSDemo = () => {
  bfsStep.value = 0;
  const interval = setInterval(() => {
    bfsStep.value++;
    if (bfsStep.value >= 6) { // 6个节点
      clearInterval(interval);
    }
  }, 800);
};
const resetBFS = () => {
  bfsStep.value = 0;
};
const isBFSNodeActive = (levelIdx: number, nodeIdx: number) => {
  let nodeCount = 0;
  for (let i = 0; i < levelIdx; i++) {
    nodeCount += bfsLevels.value[i].length;
  }
  nodeCount += nodeIdx;
  return nodeCount < bfsStep.value;
};
</script>

<style lang="less" scoped>



// 颜色定义
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #2c3e50;
@text-light: #7f8c8d;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.tree-traversal-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: @light-bg;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 30px 0;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: @text-light;
  }
}

.navigation {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;

  button {
    padding: 12px 25px;
    border: none;
    border-radius: 30px;
    background-color: lighten(@primary-color, 35%);
    color: @primary-color;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: lighten(@primary-color, 25%);
    }

    &.active {
      background-color: @primary-color;
      color: white;
      box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
    }

    i {
      font-size: 1.1rem;
    }
  }
}

.traversal-section {
  margin-bottom: 40px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: @primary-color;
    display: flex;
    align-items: center;
    gap: 10px;

    i {
      font-size: 1.4rem;
    }
  }
}

.intro-content {
  display: flex;
  gap: 40px;
  background: @card-bg;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .tree-visualization {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .tree {
      .node {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border: 2px solid @primary-color;
        border-radius: 50%;
        font-weight: 700;
        font-size: 1.4rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        &.root {
          background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 15%));
          color: white;
          border: none;
          transform: scale(1.1);
        }
      }

      .children {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-top: 40px;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 20px;
          background: @primary-color;
        }

        .child {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;

          &:before {
            content: '';
            position: absolute;
            top: -20px;
            width: 2px;
            height: 20px;
            background: @primary-color;
          }

          &:after {
            content: '';
            position: absolute;
            top: -20px;
            width: 100%;
            height: 2px;
            background: @primary-color;
          }

          .children {
            margin-top: 20px;
          }
        }
      }
    }
  }

  .intro-text {
    flex: 1;

    p {
      margin-bottom: 20px;
      line-height: 1.8;
    }
  }
}

.traversal-types {
  display: flex;
  gap: 20px;
  margin: 30px 0;

  .type-card {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .type-icon {
      width: 60px;
      height: 60px;
      background: rgba(52, 152, 219, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: @primary-color;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: @text-color;
    }

    p {
      font-size: 0.95rem;
      color: @text-light;
      margin: 0;
    }
  }
}

.tree-properties {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid @secondary-color;

  h3 {
    margin-bottom: 15px;
    color: @primary-color;
  }

  ul {
    list-style: none;

    li {
      padding: 10px 0;
      border-bottom: 1px solid @border-color;
      position: relative;
      padding-left: 25px;

      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: @secondary-color;
        font-size: 1.5rem;
      }

      &:last-child {
        border-bottom: none;
      }

      strong {
        color: @text-color;
      }
    }
  }
}

.algorithm-group {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.algorithm-card {
  background: @card-bg;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.4rem;
    padding: 20px;
    background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 10%));
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;

    i {
      font-size: 1.1rem;
    }
  }
}

.algorithm-description {
  padding: 25px;

  p {
    margin-bottom: 20px;
    font-weight: 500;
    color: @text-color;
  }
}

.algorithm-code {
  background: #2c3e50;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 25px;
    overflow-x: auto;

    code {
      color: #ecf0f1;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.traversal-visual {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  margin: 20px 0;

  .traversal-path {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;

    .path-node {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      border: 2px solid @primary-color;
      border-radius: 50%;
      font-weight: 700;
      font-size: 1.2rem;
      transition: all 0.3s ease;

      &.active {
        background: @secondary-color;
        color: white;
        transform: scale(1.1);
        box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
      }
    }
  }
}

.traversal-controls {
  display: flex;
  justify-content: center;
  gap: 15px;

  button {
    padding: 10px 25px;
    border: none;
    border-radius: 6px;
    background: @primary-color;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: darken(@primary-color, 10%);
      transform: translateY(-2px);
    }
  }
}

.bfs-visual {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .level {
    display: flex;
    align-items: center;
    gap: 20px;

    .level-label {
      width: 80px;
      font-weight: 500;
      color: @text-light;
    }

    .level-nodes {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    .bfs-node {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      border: 2px solid @primary-color;
      border-radius: 50%;
      font-weight: 700;
      transition: all 0.3s ease;

      &.active {
        background: @secondary-color;
        color: white;
        transform: scale(1.1);
        box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
      }
    }
  }
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;

  .application-card {
    background: @card-bg;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .app-icon {
      width: 70px;
      height: 70px;
      background: rgba(52, 152, 219, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: @primary-color;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @text-color;
    }

    p {
      color: @text-light;
      line-height: 1.7;
    }
  }
}

.complexity-table {
  background: @card-bg;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 15px 20px;
      text-align: left;
    }

    thead {
      background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 10%));

      th {
        color: white;
        font-weight: 500;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid @border-color;

        &:nth-child(even) {
          background: #f8f9fa;
        }

        &:last-child {
          border-bottom: none;
        }

        td:first-child {
          font-weight: 500;
        }
      }
    }
  }
}

.comparison {
  background: @card-bg;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .comparison-card {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: @primary-color;
    }
  }

  .comparison-points {
    display: flex;
    gap: 30px;

    .point {
      flex: 1;
      background: #f8f9fa;
      border-radius: 12px;
      padding: 20px;

      .point-title {
        font-weight: 700;
        font-size: 1.1rem;
        margin-bottom: 15px;
        color: @text-color;
      }

      ul {
        list-style: none;

        li {
          padding: 10px 0;
          position: relative;
          padding-left: 25px;

          &:before {
            content: '•';
            position: absolute;
            left: 0;
            color: @secondary-color;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 30px;
  margin-top: 30px;
  background: @card-bg;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  p {
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto 20px;
    line-height: 1.7;
  }

  .features {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;

    span {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      i {
        color: @secondary-color;
      }
    }
  }
}

@media (max-width: 900px) {
  .intro-content {
    flex-direction: column;
  }

  .traversal-types {
    flex-direction: column;
  }

  .comparison-points {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .navigation {
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .header {
    h1 {
      font-size: 2rem;
    }
  }

  .tree .children {
    gap: 20px !important;

    .child {
      .children {
        gap: 10px !important;
      }
    }
  }
}
</style>
