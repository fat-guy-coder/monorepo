<template>
  <div class="red-black-tree-container">
    <header class="page-header">
      <h1>红黑树(Red-Black Tree)</h1>
      <p class="subtitle">自平衡二叉查找树的高效实现</p>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="card">
          <h2>什么是红黑树?</h2>
          <p>红黑树是一种自平衡的二叉查找树，它在每个节点上增加了一个存储位表示节点的颜色（红色或黑色）。通过对任何一条从根到叶子的路径上各个节点着色方式的限制，红黑树确保没有一条路径会比其他路径长出两倍，因而是近似平衡的。</p>
        </div>
      </section>

      <div class="two-column-layout">
        <section class="structure-section">
          <div class="card">
            <h2>红黑树性质</h2>
            <ul class="properties-list">
              <li class="property-item">
                <div class="property-icon color-rule"></div>
                <div class="property-content">
                  <h3>颜色规则</h3>
                  <p>每个节点要么是红色，要么是黑色</p>
                </div>
              </li>
              <li class="property-item">
                <div class="property-icon root-rule"></div>
                <div class="property-content">
                  <h3>根节点规则</h3>
                  <p>根节点永远是黑色的</p>
                </div>
              </li>
              <li class="property-item">
                <div class="property-icon red-rule"></div>
                <div class="property-content">
                  <h3>红色节点规则</h3>
                  <p>红色节点的子节点必须是黑色的（不能有两个连续的红色节点）</p>
                </div>
              </li>
              <li class="property-item">
                <div class="property-icon path-rule"></div>
                <div class="property-content">
                  <h3>路径规则</h3>
                  <p>从任一节点到其每个叶子节点的所有路径都包含相同数量的黑色节点</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="card">
            <h2>优缺点分析</h2>
            <div class="pros-cons">
              <div class="pros">
                <h3>优点</h3>
                <ul>
                  <li>查找、插入、删除的最坏时间复杂度均为O(log n)</li>
                  <li>相对于AVL树，插入和删除操作需要更少的旋转</li>
                  <li>在实践中性能优秀，被广泛用于系统编程</li>
                  <li>保证树的高度最多为2log(n+1)</li>
                </ul>
              </div>
              <div class="cons">
                <h3>缺点</h3>
                <ul>
                  <li>实现相对复杂，需要考虑多种情况</li>
                  <li>相比普通二叉搜索树有额外的存储开销（颜色位）</li>
                  <li>旋转和重新着色操作可能影响性能</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="visualization-section">
          <div class="card">
            <h2>红黑树演示</h2>
            <div class="visualization-controls">
              <div class="control-group">
                <button @click="insertRandomNode" class="btn primary">插入随机节点</button>
                <button @click="deleteSelectedNode" class="btn secondary" :disabled="!selectedNode">删除选中节点</button>
                <button @click="resetTree" class="btn outline">重置</button>
              </div>
              <div class="control-group">
                <input
                  v-model.number="customValue"
                  type="number"
                  placeholder="输入节点值"
                  class="input"
                >
                <button @click="insertCustomNode" class="btn primary">插入</button>
                <button @click="searchNode" class="btn secondary">搜索</button>
              </div>
            </div>

            <div class="tree-container">
              <div class="tree-visual" ref="treeContainer">
                <div class="tree-lines">
                  <svg class="connectors" :width="svgWidth" :height="svgHeight">
                    <path
                      v-for="(connector, index) in connectors"
                      :key="index"
                      :d="connector.path"
                      class="tree-connector"
                      :class="connector.type"
                    />
                  </svg>
                </div>
                <div class="tree-nodes">
                  <div
                    v-for="node in treeNodes"
                    :key="node.id"
                    class="tree-node"
                    :class="{
                      'red': node.color === 'red',
                      'black': node.color === 'black',
                      'selected': selectedNode === node.id,
                      'new': node.isNew,
                      'searched': node.isSearched
                    }"
                    :style="{
                      left: `${node.x}px`,
                      top: `${node.y}px`
                    }"
                    @click="selectNode(node.id)"
                  >
                    <div class="node-content">
                      <span class="node-value">{{ node.value }}</span>
                      <span class="node-color" :class="node.color"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tree-info">
              <div class="info-item">
                <span class="label">树高度:</span>
                <span class="value">{{ treeStats.height }}</span>
              </div>
              <div class="info-item">
                <span class="label">节点数量:</span>
                <span class="value">{{ treeStats.nodeCount }}</span>
              </div>
              <div class="info-item">
                <span class="label">黑色节点:</span>
                <span class="value">{{ treeStats.blackCount }}</span>
              </div>
              <div class="info-item">
                <span class="label">红色节点:</span>
                <span class="value">{{ treeStats.redCount }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="operations-section">
        <div class="card">
          <h2>操作与旋转</h2>
          <div class="operations-grid">
            <div class="operation">
              <h3>左旋转</h3>
              <div class="rotation-diagram">
                <div class="before-rotation">
                  <div class="node-diagram root">P</div>
                  <div class="node-connections">
                    <div class="left-child">
                      <div class="node-diagram">A</div>
                    </div>
                    <div class="right-child">
                      <div class="node-diagram">Q</div>
                      <div class="child-nodes">
                        <div class="node-diagram">B</div>
                        <div class="node-diagram">C</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="rotation-arrow">→</div>
                <div class="after-rotation">
                  <div class="node-diagram root">Q</div>
                  <div class="node-connections">
                    <div class="left-child">
                      <div class="node-diagram">P</div>
                      <div class="child-nodes">
                        <div class="node-diagram">A</div>
                        <div class="node-diagram">B</div>
                      </div>
                    </div>
                    <div class="right-child">
                      <div class="node-diagram">C</div>
                    </div>
                  </div>
                </div>
              </div>
              <p>以节点P为支点进行左旋转，将P的右孩子Q提升为新的根节点，P成为Q的左子树。</p>
            </div>

            <div class="operation">
              <h3>右旋转</h3>
              <div class="rotation-diagram">
                <div class="before-rotation">
                  <div class="node-diagram root">Q</div>
                  <div class="node-connections">
                    <div class="left-child">
                      <div class="node-diagram">P</div>
                      <div class="child-nodes">
                        <div class="node-diagram">A</div>
                        <div class="node-diagram">B</div>
                      </div>
                    </div>
                    <div class="right-child">
                      <div class="node-diagram">C</div>
                    </div>
                  </div>
                </div>
                <div class="rotation-arrow">→</div>
                <div class="after-rotation">
                  <div class="node-diagram root">P</div>
                  <div class="node-connections">
                    <div class="left-child">
                      <div class="node-diagram">A</div>
                    </div>
                    <div class="right-child">
                      <div class="node-diagram">Q</div>
                      <div class="child-nodes">
                        <div class="node-diagram">B</div>
                        <div class="node-diagram">C</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p>以节点Q为支点进行右旋转，将Q的左孩子P提升为新的根节点，Q成为P的右子树。</p>
            </div>
          </div>
        </div>
      </section>

      <section class="algorithms-section">
        <div class="card">
          <h2>核心算法</h2>
          <div class="algorithm-tabs">
            <button
              v-for="(algo, index) in algorithms"
              :key="index"
              @click="activeAlgorithm = index"
              class="tab-btn"
              :class="{ active: activeAlgorithm === index }"
            >
              {{ algo.name }}
            </button>
          </div>
          <div class="algorithm-content">
            <h3>{{ algorithms[activeAlgorithm].name }}</h3>
            <p>{{ algorithms[activeAlgorithm].description }}</p>
            <div class="algorithm-steps">
              <h4>主要步骤:</h4>
              <ul>
                <li v-for="(step, index) in algorithms[activeAlgorithm].steps" :key="index">
                  {{ step }}
                </li>
              </ul>
            </div>
            <pre class="code-block"><code>{{ algorithms[activeAlgorithm].code }}</code></pre>
          </div>
        </div>
      </section>

      <section class="use-cases-section">
        <div class="card">
          <h2>应用场景</h2>
          <div class="use-cases-grid">
            <div class="use-case">
              <div class="use-case-icon">⚙️</div>
              <h3>Java集合框架</h3>
              <p>Java中的TreeMap和TreeSet使用红黑树实现，提供有序的键值对存储。</p>
            </div>
            <div class="use-case">
              <div class="use-case-icon">🔧</div>
              <h3>C++ STL</h3>
              <p>C++标准模板库中的map、multimap、set和multiset通常使用红黑树实现。</p>
            </div>
            <div class="use-case">
              <div class="use-case-icon">📁</div>
              <h3>Linux内核</h3>
              <p>Linux内核的完全公平调度器(CFS)使用红黑树来管理进程调度。</p>
            </div>
            <div class="use-case">
              <div class="use-case-icon">🗃️</div>
              <h3>数据库系统</h3>
              <p>许多数据库系统使用红黑树作为索引结构，特别是在内存数据库中。</p>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <div class="card">
          <h2>与其他平衡树比较</h2>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>红黑树</th>
                  <th>AVL树</th>
                  <th>B树</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>平衡严格度</td>
                  <td>宽松平衡</td>
                  <td>严格平衡</td>
                  <td>多路平衡</td>
                </tr>
                <tr>
                  <td>查找性能</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                </tr>
                <tr>
                  <td>插入/删除性能</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                </tr>
                <tr>
                  <td>旋转次数</td>
                  <td>少</td>
                  <td>多</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>适用场景</td>
                  <td>频繁插入删除</td>
                  <td>频繁查找</td>
                  <td>磁盘存储</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'

// 树节点接口
interface TreeNode {
  id: number
  value: number
  color: 'red' | 'black'
  x: number
  y: number
  isNew?: boolean
  isSearched?: boolean
}

// 连接线接口
interface Connector {
  path: string
  type: 'left' | 'right'
}

// 响应式数据
const treeNodes = reactive<TreeNode[]>([])
const connectors = reactive<Connector[]>([])
const selectedNode = ref<number | null>(null)
const customValue = ref<number | null>(null)
const activeAlgorithm = ref(0)
const treeContainer = ref<HTMLElement | null>(null)
const svgWidth = ref(800)
const svgHeight = ref(400)

// 树统计信息
const treeStats = reactive({
  height: 0,
  nodeCount: 0,
  blackCount: 0,
  redCount: 0
})

// 初始化树
const initializeTree = () => {
  treeNodes.length = 0
  connectors.length = 0

  // 创建初始红黑树
  const nodes = [
    { id: 1, value: 13, color: 'black', x: 400, y: 50 },
    { id: 2, value: 8, color: 'red', x: 250, y: 150 },
    { id: 3, value: 17, color: 'red', x: 550, y: 150 },
    { id: 4, value: 1, color: 'black', x: 175, y: 250 },
    { id: 5, value: 11, color: 'black', x: 325, y: 250 },
    { id: 6, value: 15, color: 'black', x: 475, y: 250 },
    { id: 7, value: 25, color: 'black', x: 625, y: 250 },
    { id: 8, value: 6, color: 'red', x: 150, y: 350 }
  ]

  treeNodes.push(...nodes as TreeNode[])

  // 创建连接线
  const newConnectors = [
    { path: 'M400,70 L275,130', type: 'left' },
    { path: 'M400,70 L525,130', type: 'right' },
    { path: 'M250,170 L190,230', type: 'left' },
    { path: 'M250,170 L310,230', type: 'right' },
    { path: 'M550,170 L490,230', type: 'left' },
    { path: 'M550,170 L610,230', type: 'right' },
    { path: 'M175,270 L160,330', type: 'left' }
  ]

  connectors.push(...newConnectors as Connector[])

  updateTreeStats()
}

// 更新树统计信息
const updateTreeStats = () => {
  treeStats.nodeCount = treeNodes.length
  treeStats.blackCount = treeNodes.filter(node => node.color === 'black').length
  treeStats.redCount = treeNodes.filter(node => node.color === 'red').length
  treeStats.height = 4 // 简化计算
}

// 插入随机节点
const insertRandomNode = () => {
  const newValue = Math.floor(Math.random() * 50) + 1

  // 确保值不重复
  if (treeNodes.some(node => node.value === newValue)) {
    insertRandomNode()
    return
  }

  // 创建新节点
  const newNode: TreeNode = {
    id: Date.now(),
    value: newValue,
    color: Math.random() > 0.5 ? 'red' : 'black',
    x: 300 + Math.random() * 200,
    y: 100 + Math.random() * 300,
    isNew: true
  }

  treeNodes.push(newNode)

  // 更新连接线（简化实现）
  updateConnectors()

  updateTreeStats()

  // 1秒后移除新节点标记
  setTimeout(() => {
    const node = treeNodes.find(n => n.id === newNode.id)
    if (node) {
      node.isNew = false
    }
  }, 1000)
}

// 插入自定义节点
const insertCustomNode = () => {
  if (customValue.value === null) return

  const newValue = customValue.value

  // 确保值不重复
  if (treeNodes.some(node => node.value === newValue)) {
    alert('该值已存在！')
    return
  }

  // 创建新节点
  const newNode: TreeNode = {
    id: Date.now(),
    value: newValue,
    color: Math.random() > 0.5 ? 'red' : 'black',
    x: 300 + Math.random() * 200,
    y: 100 + Math.random() * 300,
    isNew: true
  }

  treeNodes.push(newNode)
  customValue.value = null

  // 更新连接线
  updateConnectors()

  updateTreeStats()

  // 1秒后移除新节点标记
  setTimeout(() => {
    const node = treeNodes.find(n => n.id === newNode.id)
    if (node) {
      node.isNew = false
    }
  }, 1000)
}

// 搜索节点
const searchNode = () => {
  if (customValue.value === null) return

  const target = customValue.value
  const node = treeNodes.find(n => n.value === target)

  if (node) {
    // 清除之前的搜索标记
    treeNodes.forEach(n => { n.isSearched = false })

    // 标记搜索到的节点
    node.isSearched = true

    // 3秒后清除搜索标记
    setTimeout(() => {
      node.isSearched = false
    }, 3000)
  } else {
    alert(`未找到值为 ${target} 的节点`)
  }
}

// 选择节点
const selectNode = (nodeId: number) => {
  selectedNode.value = nodeId
}

// 删除选中节点
const deleteSelectedNode = () => {
  if (selectedNode.value === null) return

  const index = treeNodes.findIndex(node => node.id === selectedNode.value)
  if (index !== -1) {
    treeNodes.splice(index, 1)
    selectedNode.value = null

    // 更新连接线
    updateConnectors()

    updateTreeStats()
  }
}

// 更新连接线（简化实现）
const updateConnectors = () => {
  connectors.length = 0

  // 这里应该根据树的实际结构计算连接线
  // 简化实现：随机生成一些连接线
  if (treeNodes.length > 1) {
    for (let i = 1; i < Math.min(treeNodes.length, 8); i++) {
      const parentIndex = Math.floor((i - 1) / 2)
      const parent = treeNodes[parentIndex]
      const child = treeNodes[i]

      if (parent && child) {
        connectors.push({
          path: `M${parent.x + 25},${parent.y + 25} L${child.x + 25},${child.y + 25}`,
          type: i % 2 === 0 ? 'right' : 'left'
        })
      }
    }
  }
}

// 重置树
const resetTree = () => {
  initializeTree()
  selectedNode.value = null
  customValue.value = null
}

// 算法定义
const algorithms = [
  {
    name: '插入操作',
    description: '红黑树的插入操作首先像普通二叉搜索树一样插入节点，并将新节点着色为红色，然后通过旋转和重新着色来恢复红黑树的性质。',
    steps: [
      '像普通BST一样插入新节点',
      '将新节点着色为红色',
      '如果违反红黑树性质，进行修复',
      '修复可能涉及颜色翻转和旋转操作'
    ],
    code: `function insert(root, value) {
  // 普通BST插入
  let node = new Node(value);
  node.color = RED;

  // 插入节点
  // ... BST插入逻辑

  // 修复红黑树性质
  return insertFixup(root, node);
}

function insertFixup(root, node) {
  while (node.parent && node.parent.color === RED) {
    if (node.parent === node.parent.parent.left) {
      let uncle = node.parent.parent.right;
      if (uncle && uncle.color === RED) {
        // 情况1: 叔叔节点是红色
        node.parent.color = BLACK;
        uncle.color = BLACK;
        node.parent.parent.color = RED;
        node = node.parent.parent;
      } else {
        if (node === node.parent.right) {
          // 情况2: 节点是右孩子
          node = node.parent;
          root = leftRotate(root, node);
        }
        // 情况3: 节点是左孩子
        node.parent.color = BLACK;
        node.parent.parent.color = RED;
        root = rightRotate(root, node.parent.parent);
      }
    } else {
      // 对称情况
      // ... 类似逻辑处理右子树情况
    }
  }
  root.color = BLACK;
  return root;
}`
  },
  {
    name: '删除操作',
    description: '红黑树的删除操作比插入更复杂，需要处理多种情况以确保删除后树仍然保持平衡。',
    steps: [
      '像普通BST一样删除节点',
      '如果删除的节点是黑色，需要进行修复',
      '修复过程涉及兄弟节点的颜色和旋转',
      '可能需要多次旋转和重新着色'
    ],
    code: `function deleteNode(root, value) {
  // 查找要删除的节点
  let node = findNode(root, value);
  if (!node) return root;

  let originalColor = node.color;
  let replacement;

  if (!node.left) {
    replacement = node.right;
    transplant(root, node, node.right);
  } else if (!node.right) {
    replacement = node.left;
    transplant(root, node, node.left);
  } else {
    let successor = minimum(node.right);
    originalColor = successor.color;
    replacement = successor.right;

    if (successor.parent === node) {
      if (replacement) replacement.parent = successor;
    } else {
      transplant(root, successor, successor.right);
      successor.right = node.right;
      successor.right.parent = successor;
    }

    transplant(root, node, successor);
    successor.left = node.left;
    successor.left.parent = successor;
    successor.color = node.color;
  }

  if (originalColor === BLACK) {
    root = deleteFixup(root, replacement);
  }

  return root;
}`
  },
  {
    name: '左旋转',
    description: '左旋转操作用于调整树的结构，保持树的平衡。',
    steps: [
      '将节点P的右孩子Q设置为新的父节点',
      '将Q的左子树设置为P的右子树',
      '将P设置为Q的左子树',
      '更新父节点指针'
    ],
    code: `function leftRotate(root, node) {
  let rightChild = node.right;
  node.right = rightChild.left;

  if (rightChild.left) {
    rightChild.left.parent = node;
  }

  rightChild.parent = node.parent;

  if (!node.parent) {
    root = rightChild;
  } else if (node === node.parent.left) {
    node.parent.left = rightChild;
  } else {
    node.parent.right = rightChild;
  }

  rightChild.left = node;
  node.parent = rightChild;

  return root;
}`
  },
  {
    name: '右旋转',
    description: '右旋转是左旋转的对称操作，也用于调整树的结构。',
    steps: [
      '将节点Q的左孩子P设置为新的父节点',
      '将P的右子树设置为Q的左子树',
      '将Q设置为P的右子树',
      '更新父节点指针'
    ],
    code: `function rightRotate(root, node) {
  let leftChild = node.left;
  node.left = leftChild.right;

  if (leftChild.right) {
    leftChild.right.parent = node;
  }

  leftChild.parent = node.parent;

  if (!node.parent) {
    root = leftChild;
  } else if (node === node.parent.right) {
    node.parent.right = leftChild;
  } else {
    node.parent.left = leftChild;
  }

  leftChild.right = node;
  node.parent = leftChild;

  return root;
}`
  }
]

// 组件挂载时初始化树
onMounted(() => {
  initializeTree()

  // 设置SVG尺寸
  nextTick(() => {
    if (treeContainer.value) {
      svgWidth.value = treeContainer.value.offsetWidth
      svgHeight.value = treeContainer.value.offsetHeight
    }
  })
})
</script>

<style lang="less" scoped>
.red-black-tree-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 10px;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .subtitle {
    margin: 0;
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #2c3e50;
    border-bottom: 2px solid #eaecef;
    padding-bottom: 10px;
    font-size: 1.5rem;
  }
}

.intro-section {
  .card {
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #555;
    }
  }
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.properties-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.property-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
}

.property-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;

  &.color-rule {
    background: linear-gradient(135deg, #c0392b 0%, #2c3e50 100%);
  }

  &.root-rule {
    background: #2c3e50;
  }

  &.red-rule {
    background: #c0392b;
  }

  &.path-rule {
    background: #3498db;
  }

  &::before {
    color: white;
    font-weight: bold;
  }

  &.color-rule::before {
    content: 'C';
  }

  &.root-rule::before {
    content: 'R';
  }

  &.red-rule::before {
    content: 'X';
  }

  &.path-rule::before {
    content: 'P';
  }
}

.property-content {
  h3 {
    margin: 0 0 8px;
    color: #2c3e50;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    line-height: 1.5;
    color: #666;
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  h3 {
    margin-top: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #eaecef;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }

  .pros {
    h3 {
      color: #27ae60;
    }

    li {
      color: #2ecc71;
    }
  }

  .cons {
    h3 {
      color: #e74c3c;
    }

    li {
      color: #e74c3c;
    }
  }
}

.visualization-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;

  .control-group {
    display: flex;
    gap: 10px;
    align-items: center;

    @media (max-width: 600px) {
      flex-wrap: wrap;
    }
  }
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background-color: #c0392b;
    color: white;

    &:hover {
      background-color: #a93226;
    }
  }

  &.secondary {
    background-color: #3498db;
    color: white;

    &:hover:not(:disabled) {
      background-color: #2980b9;
    }

    &:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }
  }

  &.outline {
    background-color: transparent;
    border: 1px solid #bdc3c7;
    color: #7f8c8d;

    &:hover {
      background-color: #ecf0f1;
    }
  }
}

.input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 120px;
}

.tree-container {
  position: relative;
  margin: 20px 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  min-height: 400px;
}

.tree-visual {
  position: relative;
  width: 100%;
  height: 400px;
}

.tree-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connectors {
  position: absolute;
  top: 0;
  left: 0;
}

.tree-connector {
  fill: none;
  stroke: #95a5a6;
  stroke-width: 2;

  &.left {
    stroke-dasharray: 5, 5;
  }
}

.tree-nodes {
  position: relative;
  width: 100%;
  height: 100%;
}

.tree-node {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &.red {
    background: #e74c3c;
    color: white;
  }

  &.black {
    background: #2c3e50;
    color: white;
  }

  &.selected {
    box-shadow: 0 0 0 3px #f39c12;
  }

  &.new {
    animation: pulse 1.5s infinite;
  }

  &.searched {
    animation: highlight 1.5s infinite;
  }

  .node-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .node-value {
    font-weight: bold;
    font-size: 14px;
  }

  .node-color {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 2px;

    &.red {
      background: #e74c3c;
    }

    &.black {
      background: #2c3e50;
    }
  }
}

.tree-info {
  display: flex;
  justify-content: space-around;
  background: #ecf0f1;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;

  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .label {
      font-size: 0.8rem;
      color: #7f8c8d;
    }

    .value {
      font-weight: bold;
      font-size: 1.2rem;
      color: #2c3e50;
    }
  }
}

.operations-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.operation {
  h3 {
    color: #2c3e50;
    margin-top: 0;
  }

  p {
    line-height: 1.5;
    color: #555;
  }
}

.rotation-diagram {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  .before-rotation, .after-rotation {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .rotation-arrow {
    font-size: 2rem;
    color: #3498db;
    margin: 0 20px;
  }
}

.node-diagram {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 5px;

  &.root {
    background: #2c3e50;
  }
}

.node-connections {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    width: 2px;
    height: 10px;
    background: #95a5a6;
  }
}

.left-child, .right-child {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    width: 2px;
    height: 10px;
    background: #95a5a6;
  }
}

.left-child::before {
  right: 50%;
}

.right-child::before {
  left: 50%;
}

.child-nodes {
  display: flex;
  justify-content: space-around;
  width: 120px;
  margin-top: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: #95a5a6;
  }
}

.algorithm-tabs {
  display: flex;
  border-bottom: 1px solid #eaecef;
  margin-bottom: 20px;

  .tab-btn {
    padding: 10px 20px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-weight: 500;
    color: #7f8c8d;
    transition: all 0.2s;

    &:hover {
      color: #c0392b;
    }

    &.active {
      color: #c0392b;
      border-bottom-color: #c0392b;
    }
  }
}

.algorithm-content {
  h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  p {
    line-height: 1.6;
    margin-bottom: 20px;
  }
}

.algorithm-steps {
  margin-bottom: 20px;

  h4 {
    color: #2c3e50;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
      color: #555;
    }
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.4;
  font-size: 0.9rem;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.use-case {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #c0392b;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  .use-case-icon {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  p {
    margin-bottom: 0;
    line-height: 1.5;
    color: #555;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    tr:hover {
      background: #f8f9fa;
    }
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(231, 76, 60, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0);
  }
}

@keyframes highlight {
  0% {
    box-shadow: 0 0 0 0 rgba(243, 156, 18, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(243, 156, 18, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(243, 156, 18, 0);
  }
}
</style>
