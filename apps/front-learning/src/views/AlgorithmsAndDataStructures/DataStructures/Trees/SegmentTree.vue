<template>
  <div class="segment-tree-container">
    <header class="page-header">
      <h1>线段树(Segment Tree)</h1>
      <p class="subtitle">高效的区间查询与更新数据结构</p>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="card">
          <h2>什么是线段树?</h2>
          <p>线段树是一种二叉树数据结构，用于存储区间或线段的信息。它允许在O(log n)时间内进行区间查询和区间更新操作，特别适合处理各种区间相关的问题，如区间求和、区间最大值、区间最小值等。</p>
        </div>
      </section>

      <div class="two-column-layout">
        <section class="structure-section">
          <div class="card">
            <h2>线段树特性</h2>
            <ul class="properties-list">
              <li class="property-item">
                <div class="property-icon structure"></div>
                <div class="property-content">
                  <h3>完全二叉树结构</h3>
                  <p>线段树通常构建为完全二叉树，便于数组存储和索引计算</p>
                </div>
              </li>
              <li class="property-item">
                <div class="property-icon storage"></div>
                <div class="property-content">
                  <h3>区间信息存储</h3>
                  <p>每个节点存储一个区间的聚合信息(和、最大值、最小值等)</p>
                </div>
              </li>
              <li class="property-item">
                <div class="property-icon query"></div>
                <div class="property-content">
                  <h3>高效区间查询</h3>
                  <p>区间查询时间复杂度为O(log n)，n为数据规模</p>
                </div>
              </li>
              <li class="property-item">
                <div class="property-icon update"></div>
                <div class="property-content">
                  <h3>高效区间更新</h3>
                  <p>支持区间更新操作，结合懒惰传播技术可达到O(log n)</p>
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
                  <li>区间查询和更新操作高效</li>
                  <li>支持多种区间操作(求和、最值等)</li>
                  <li>结构灵活，可扩展性强</li>
                  <li>结合懒惰传播可批量更新</li>
                </ul>
              </div>
              <div class="cons">
                <h3>缺点</h3>
                <ul>
                  <li>实现相对复杂</li>
                  <li>空间复杂度较高(O(n))</li>
                  <li>构建时间O(n)</li>
                  <li>不适用于所有区间问题</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card">
            <h2>应用场景</h2>
            <div class="use-cases-mini">
              <div class="use-case-item">
                <h3>区间统计</h3>
                <p>计算区间和、平均值、最大值、最小值</p>
              </div>
              <div class="use-case-item">
                <h3>范围查询</h3>
                <p>数据库系统中的范围索引和查询</p>
              </div>
              <div class="use-case-item">
                <h3>游戏开发</h3>
                <p>碰撞检测、可见性计算</p>
              </div>
              <div class="use-case-item">
                <h3>计算几何</h3>
                <p>区间覆盖、线段相交等问题</p>
              </div>
            </div>
          </div>
        </section>

        <section class="visualization-section">
          <div class="card">
            <h2>线段树演示</h2>
            <div class="demo-controls">
              <div class="control-group">
                <label>数组大小:</label>
                <Select v-model="arraySize" @change="initializeArray">
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                </select>
              </div>
              <div class="control-group">
                <button @click="randomizeArray" class="btn primary">随机生成数组</button>
                <button @click="buildTree" class="btn secondary">构建线段树</button>
              </div>
            </div>

            <div class="array-display">
              <h3>原始数组</h3>
              <div class="array-elements">
                <div
                  v-for="(value, index) in originalArray"
                  :key="index"
                  class="array-element"
                  :class="{
                    'in-query-range': isInQueryRange(index),
                    'updated': isUpdated(index)
                  }"
                >
                  <span class="index">{{ index }}</span>
                  <span class="value">{{ value }}</span>
                </div>
              </div>
            </div>

            <div class="operation-controls">
              <div class="operation-type">
                <h3>操作类型</h3>
                <div class="operation-buttons">
                  <button
                    @click="currentOperation = 'query'"
                    :class="{ active: currentOperation === 'query' }"
                    class="op-btn"
                  >
                    区间查询
                  </button>
                  <button
                    @click="currentOperation = 'update'"
                    :class="{ active: currentOperation === 'update' }"
                    class="op-btn"
                  >
                    区间更新
                  </button>
                </div>
              </div>

              <div class="operation-params">
                <div class="param-group">
                  <label>区间起点:</label>
                  <input
                    v-model.number="rangeStart"
                    type="number"
                    min="0"
                    :max="arraySize - 1"
                    class="param-input"
                  >
                </div>
                <div class="param-group">
                  <label>区间终点:</label>
                  <input
                    v-model.number="rangeEnd"
                    type="number"
                    :min="rangeStart"
                    :max="arraySize - 1"
                    class="param-input"
                  >
                </div>
                <div class="param-group" v-if="currentOperation === 'update'">
                  <label>更新值:</label>
                  <input
                    v-model.number="updateValue"
                    type="number"
                    class="param-input"
                  >
                </div>
                <button
                  @click="executeOperation"
                  class="btn primary execute-btn"
                  :disabled="!isValidRange"
                >
                  {{ currentOperation === 'query' ? '执行查询' : '执行更新' }}
                </button>
              </div>
            </div>

            <div class="segment-tree-visualization">
              <h3>线段树结构</h3>
              <div class="tree-container" ref="treeContainer">
                <div class="tree-levels">
                  <div
                    v-for="(level, levelIndex) in treeLevels"
                    :key="levelIndex"
                    class="tree-level"
                  >
                    <div
                      v-for="node in level"
                      :key="node.id"
                      class="tree-node"
                      :class="{
                        'queried': node.isQueried,
                        'updated': node.isUpdated,
                        'leaf': node.isLeaf
                      }"
                      :style="{
                        left: `${node.x}%`,
                        top: `${node.y}px`
                      }"
                    >
                      <div class="node-interval">
                        [{{ node.start }}, {{ node.end }}]
                      </div>
                      <div class="node-value">
                        {{ node.value }}
                      </div>
                    </div>
                  </div>
                </div>
                <svg class="tree-connectors" :width="treeWidth" :height="treeHeight">
                  <path
                    v-for="connector in connectors"
                    :key="connector.id"
                    :d="connector.path"
                    class="connector"
                    :class="{
                      'queried': connector.queried,
                      'updated': connector.updated
                    }"
                  />
                </svg>
              </div>
            </div>

            <div class="operation-result" v-if="operationResult">
              <h3>操作结果</h3>
              <p>{{ operationResult }}</p>
            </div>
          </div>
        </section>
      </div>

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
            <div class="algorithm-complexity">
              <strong>时间复杂度:</strong> {{ algorithms[activeAlgorithm].timeComplexity }}
              <strong>空间复杂度:</strong> {{ algorithms[activeAlgorithm].spaceComplexity }}
            </div>
            <pre class="code-block"><code>{{ algorithms[activeAlgorithm].code }}</code></pre>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <div class="card">
          <h2>实现细节</h2>
          <div class="implementation-grid">
            <div class="implementation-item">
              <h3>树节点结构</h3>
              <pre class="code-small"><code>class SegmentTreeNode {
  start: number;    // 区间起点
  end: number;      // 区间终点
  sum: number;      // 区间和
  left: SegmentTreeNode | null;
  right: SegmentTreeNode | null;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.sum = 0;
    this.left = null;
    this.right = null;
  }
}</code></pre>
            </div>
            <div class="implementation-item">
              <h3>数组存储方式</h3>
              <pre class="code-small"><code>// 使用数组存储线段树(完全二叉树)
// 对于节点i:
//   左孩子: 2*i + 1
//   右孩子: 2*i + 2
//   父节点: Math.floor((i-1)/2)

class ArraySegmentTree {
  private tree: number[];
  private n: number;

  constructor(data: number[]) {
    this.n = data.length;
    this.tree = new Array(4 * this.n);
    this.build(data, 0, 0, this.n - 1);
  }

  // 构建线段树
  private build(data: number[],
               idx: number,
               start: number,
               end: number): void {
    if (start === end) {
      this.tree[idx] = data[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this.build(data, 2*idx+1, start, mid);
    this.build(data, 2*idx+2, mid+1, end);

    this.tree[idx] = this.tree[2*idx+1] +
                     this.tree[2*idx+2];
  }
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="variants-section">
        <div class="card">
          <h2>线段树变种</h2>
          <div class="variants-grid">
            <div class="variant">
              <h3>懒惰传播线段树</h3>
              <p>支持高效的区间更新操作，通过延迟更新机制减少操作次数。</p>
              <div class="variant-features">
                <span class="feature-tag">区间更新</span>
                <span class="feature-tag">延迟更新</span>
                <span class="feature-tag">O(log n)</span>
              </div>
            </div>
            <div class="variant">
              <h3>持久化线段树</h3>
              <p>支持访问历史版本，常用于可持久化数据结构的实现。</p>
              <div class="variant-features">
                <span class="feature-tag">版本控制</span>
                <span class="feature-tag">历史查询</span>
                <span class="feature-tag">函数式</span>
              </div>
            </div>
            <div class="variant">
              <h3>二维线段树</h3>
              <p>扩展到二维空间，支持二维区间查询和更新操作。</p>
              <div class="variant-features">
                <span class="feature-tag">二维区间</span>
                <span class="feature-tag">空间索引</span>
                <span class="feature-tag">O(log²n)</span>
              </div>
            </div>
            <div class="variant">
              <h3>动态开点线段树</h3>
              <p>避免预先分配所有空间，按需创建节点，节省内存。</p>
              <div class="variant-features">
                <span class="feature-tag">动态内存</span>
                <span class="feature-tag">稀疏数据</span>
                <span class="feature-tag">按需分配</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <div class="card">
          <h2>与其他数据结构比较</h2>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>数据结构</th>
                  <th>区间查询</th>
                  <th>区间更新</th>
                  <th>构建时间</th>
                  <th>空间复杂度</th>
                  <th>适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>线段树</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                  <td>O(n)</td>
                  <td>O(n)</td>
                  <td>通用区间操作</td>
                </tr>
                <tr>
                  <td>树状数组</td>
                  <td>O(log n)</td>
                  <td>O(log n)</td>
                  <td>O(n)</td>
                  <td>O(n)</td>
                  <td>前缀和、单点更新</td>
                </tr>
                <tr>
                  <td>稀疏表</td>
                  <td>O(1)</td>
                  <td>O(n)</td>
                  <td>O(n log n)</td>
                  <td>O(n log n)</td>
                  <td>静态区间查询</td>
                </tr>
                <tr>
                  <td>平方分解</td>
                  <td>O(√n)</td>
                  <td>O(√n)</td>
                  <td>O(n)</td>
                  <td>O(n)</td>
                  <td>简单区间操作</td>
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
import { ref, reactive, onMounted, nextTick, computed } from 'vue'

// 线段树节点接口
interface SegmentTreeNode {
  id: number
  start: number
  end: number
  value: number
  x: number
  y: number
  isQueried?: boolean
  isUpdated?: boolean
  isLeaf?: boolean
}

// 连接线接口
interface TreeConnector {
  id: string
  path: string
  queried?: boolean
  updated?: boolean
}

// 响应式数据
const originalArray = ref<number[]>([])
const treeLevels = reactive<SegmentTreeNode[][]>([])
const connectors = reactive<TreeConnector[]>([])
const arraySize = ref(8)
const currentOperation = ref<'query' | 'update'>('query')
const rangeStart = ref(0)
const rangeEnd = ref(3)
const updateValue = ref(10)
const operationResult = ref('')
const activeAlgorithm = ref(0)
const treeContainer = ref<HTMLElement | null>(null)
const treeWidth = ref(800)
const treeHeight = ref(400)

// 计算属性
const isValidRange = computed(() => {
  return rangeStart.value >= 0 &&
         rangeEnd.value < arraySize.value &&
         rangeStart.value <= rangeEnd.value
})

// 初始化数组
const initializeArray = () => {
  originalArray.value = Array.from({ length: arraySize.value },
    (_, i) => Math.floor(Math.random() * 20) + 1
  )
  operationResult.value = ''
  clearTreeVisualization()
}

// 随机化数组
const randomizeArray = () => {
  initializeArray()
}

// 构建线段树
const buildTree = () => {
  if (originalArray.value.length === 0) {
    initializeArray()
  }

  // 清空之前的树
  treeLevels.length = 0
  connectors.length = 0

  // 构建线段树数据
  const buildSegmentTree = (start: number, end: number, level: number = 0): SegmentTreeNode => {
    const nodeId = Date.now() + Math.random()
    const node: SegmentTreeNode = {
      id: nodeId,
      start,
      end,
      value: 0,
      x: 0,
      y: level * 80 + 50,
      isLeaf: start === end
    }

    if (start === end) {
      // 叶子节点
      node.value = originalArray.value[start]
    } else {
      // 内部节点
      const mid = Math.floor((start + end) / 2)
      const leftChild = buildSegmentTree(start, mid, level + 1)
      const rightChild = buildSegmentTree(mid + 1, end, level + 1)
      node.value = leftChild.value + rightChild.value

      // 添加连接线
      connectors.push({
        id: `${nodeId}-left`,
        path: `M${node.x + 25},${node.y + 25} L${leftChild.x + 25},${leftChild.y + 25}`
      })
      connectors.push({
        id: `${nodeId}-right`,
        path: `M${node.x + 25},${node.y + 25} L${rightChild.x + 25},${rightChild.y + 25}`
      })
    }

    // 确保当前层级存在
    if (!treeLevels[level]) {
      treeLevels[level] = []
    }
    treeLevels[level].push(node)

    return node
  }

  // 构建树
  buildSegmentTree(0, originalArray.value.length - 1)

  // 计算节点位置
  calculateNodePositions()

  operationResult.value = '线段树构建完成'
}

// 计算节点位置
const calculateNodePositions = () => {
  treeLevels.forEach((level, levelIndex) => {
    const levelWidth = 100 / (level.length + 1)
    level.forEach((node, nodeIndex) => {
      node.x = (nodeIndex + 1) * levelWidth
    })
  })
}

// 清除树可视化状态
const clearTreeVisualization = () => {
  treeLevels.forEach(level => {
    level.forEach(node => {
      node.isQueried = false
      node.isUpdated = false
    })
  })
  connectors.forEach(connector => {
    connector.queried = false
    connector.updated = false
  })
}

// 检查索引是否在查询范围内
const isInQueryRange = (index: number) => {
  return index >= rangeStart.value && index <= rangeEnd.value
}

// 检查索引是否被更新
const isUpdated = (index: number) => {
  // 简化实现，实际应该根据更新操作来标记
  return false
}

// 执行操作
const executeOperation = () => {
  if (!isValidRange.value) return

  clearTreeVisualization()

  if (currentOperation.value === 'query') {
    // 执行区间查询
    const result = simulateRangeQuery(rangeStart.value, rangeEnd.value)
    operationResult.value = `区间 [${rangeStart.value}, ${rangeEnd.value}] 的和为: ${result}`
  } else {
    // 执行区间更新
    simulateRangeUpdate(rangeStart.value, rangeEnd.value, updateValue.value)
    operationResult.value = `区间 [${rangeStart.value}, ${rangeEnd.value}] 更新为: ${updateValue.value}`
  }
}

// 模拟区间查询
const simulateRangeQuery = (start: number, end: number): number => {
  let sum = 0

  const query = (nodeIndex: number, nodeStart: number, nodeEnd: number): number => {
    if (nodeStart >= start && nodeEnd <= end) {
      // 当前节点区间完全在查询范围内
      markNodeAsQueried(nodeIndex, nodeStart, nodeEnd)
      return getNodeValue(nodeIndex, nodeStart, nodeEnd)
    }

    if (nodeEnd < start || nodeStart > end) {
      // 当前节点区间与查询区间无重叠
      return 0
    }

    // 部分重叠，递归查询左右子树
    const mid = Math.floor((nodeStart + nodeEnd) / 2)
    const leftSum = query(nodeIndex * 2 + 1, nodeStart, mid)
    const rightSum = query(nodeIndex * 2 + 2, mid + 1, nodeEnd)

    return leftSum + rightSum
  }

  sum = query(0, 0, originalArray.value.length - 1)
  return sum
}

// 模拟区间更新
const simulateRangeUpdate = (start: number, end: number, value: number) => {
  const update = (nodeIndex: number, nodeStart: number, nodeEnd: number) => {
    if (nodeStart >= start && nodeEnd <= end) {
      // 当前节点区间完全在更新范围内
      markNodeAsUpdated(nodeIndex, nodeStart, nodeEnd)
      return
    }

    if (nodeEnd < start || nodeStart > end) {
      // 当前节点区间与更新区间无重叠
      return
    }

    // 部分重叠，递归更新左右子树
    const mid = Math.floor((nodeStart + nodeEnd) / 2)
    update(nodeIndex * 2 + 1, nodeStart, mid)
    update(nodeIndex * 2 + 2, mid + 1, nodeEnd)

    markNodeAsUpdated(nodeIndex, nodeStart, nodeEnd)
  }

  update(0, 0, originalArray.value.length - 1)
}

// 标记节点为已查询
const markNodeAsQueried = (nodeIndex: number, start: number, end: number) => {
  // 在实际实现中，这里应该找到对应的可视化节点并标记
  // 简化实现：标记所有层级的对应节点
  treeLevels.forEach(level => {
    level.forEach(node => {
      if (node.start === start && node.end === end) {
        node.isQueried = true
      }
    })
  })
}

// 标记节点为已更新
const markNodeAsUpdated = (nodeIndex: number, start: number, end: number) => {
  // 简化实现
  treeLevels.forEach(level => {
    level.forEach(node => {
      if (node.start === start && node.end === end) {
        node.isUpdated = true
      }
    })
  })
}

// 获取节点值（简化实现）
const getNodeValue = (nodeIndex: number, start: number, end: number): number => {
  if (start === end) {
    return originalArray.value[start]
  }

  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += originalArray.value[i]
  }
  return sum
}

// 算法定义
const algorithms = [
  {
    name: '构建算法',
    description: '线段树的构建过程采用分治策略，递归地将区间分成两半，直到区间长度为1。',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: `function buildTree(arr, tree, node, start, end) {
  if (start === end) {
    // 叶子节点
    tree[node] = arr[start];
  } else {
    const mid = Math.floor((start + end) / 2);
    const leftNode = 2 * node + 1;
    const rightNode = 2 * node + 2;

    // 递归构建左右子树
    buildTree(arr, tree, leftNode, start, mid);
    buildTree(arr, tree, rightNode, mid + 1, end);

    // 合并左右子树结果
    tree[node] = tree[leftNode] + tree[rightNode];
  }
}

// 使用示例
const arr = [1, 3, 5, 7, 9, 11];
const tree = new Array(4 * arr.length);
buildTree(arr, tree, 0, 0, arr.length - 1);`
  },
  {
    name: '区间查询',
    description: '查询区间信息时，从根节点开始，如果当前节点区间完全包含在查询区间内，则直接返回；否则递归查询左右子树。',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    code: `function queryTree(tree, node, start, end, queryStart, queryEnd) {
  if (queryStart > end || queryEnd < start) {
    // 查询区间与当前节点区间无重叠
    return 0;
  }

  if (queryStart <= start && queryEnd >= end) {
    // 当前节点区间完全包含在查询区间内
    return tree[node];
  }

  // 部分重叠，递归查询左右子树
  const mid = Math.floor((start + end) / 2);
  const leftNode = 2 * node + 1;
  const rightNode = 2 * node + 2;

  const leftSum = queryTree(tree, leftNode, start, mid, queryStart, queryEnd);
  const rightSum = queryTree(tree, rightNode, mid + 1, end, queryStart, queryEnd);

  return leftSum + rightSum;
}

// 使用示例
const sum = queryTree(tree, 0, 0, arr.length - 1, 1, 4);
// 查询区间[1,4]的和`
  },
  {
    name: '单点更新',
    description: '更新单个元素时，从根节点开始，递归找到对应的叶子节点进行更新，然后回溯更新所有祖先节点。',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    code: `function updateTree(tree, node, start, end, index, value) {
  if (start === end) {
    // 找到目标叶子节点
    tree[node] = value;
  } else {
    const mid = Math.floor((start + end) / 2);
    const leftNode = 2 * node + 1;
    const rightNode = 2 * node + 2;

    if (index >= start && index <= mid) {
      // 目标在左子树
      updateTree(tree, leftNode, start, mid, index, value);
    } else {
      // 目标在右子树
      updateTree(tree, rightNode, mid + 1, end, index, value);
    }

    // 更新当前节点
    tree[node] = tree[leftNode] + tree[rightNode];
  }
}

// 使用示例
updateTree(tree, 0, 0, arr.length - 1, 2, 10);
// 将索引2的元素更新为10`
  },
  {
    name: '懒惰传播',
    description: '懒惰传播技术允许延迟区间更新操作，只有在需要时才进行实际更新，大大提高区间更新的效率。',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    code: `class LazySegmentTree {
  constructor(data) {
    this.n = data.length;
    this.tree = new Array(4 * this.n);
    this.lazy = new Array(4 * this.n).fill(0);
    this.build(data, 0, 0, this.n - 1);
  }

  // 区间更新
  updateRange(node, start, end, l, r, value) {
    // 检查是否有延迟更新
    if (this.lazy[node] !== 0) {
      this.tree[node] += (end - start + 1) * this.lazy[node];

      if (start !== end) {
        // 非叶子节点，标记子节点需要延迟更新
        this.lazy[2*node+1] += this.lazy[node];
        this.lazy[2*node+2] += this.lazy[node];
      }

      this.lazy[node] = 0;
    }

    if (start > end || start > r || end < l) {
      return;
    }

    if (start >= l && end <= r) {
      // 当前区间完全在更新范围内
      this.tree[node] += (end - start + 1) * value;

      if (start !== end) {
        this.lazy[2*node+1] += value;
        this.lazy[2*node+2] += value;
      }
      return;
    }

    // 部分重叠，递归更新
    const mid = Math.floor((start + end) / 2);
    this.updateRange(2*node+1, start, mid, l, r, value);
    this.updateRange(2*node+2, mid+1, end, l, r, value);

    this.tree[node] = this.tree[2*node+1] + this.tree[2*node+2];
  }
}`
  }
]

// 组件挂载时初始化
onMounted(() => {
  initializeArray()

  // 设置树容器尺寸
  nextTick(() => {
    if (treeContainer.value) {
      treeWidth.value = treeContainer.value.offsetWidth
      treeHeight.value = treeContainer.value.offsetHeight
    }
  })
})
</script>

<style lang="less" scoped>
.segment-tree-container {
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
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
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
  color: white;
  font-weight: bold;

  &.structure {
    background: #9b59b6;
    &::before { content: 'T'; }
  }

  &.storage {
    background: #3498db;
    &::before { content: 'S'; }
  }

  &.query {
    background: #2ecc71;
    &::before { content: 'Q'; }
  }

  &.update {
    background: #e74c3c;
    &::before { content: 'U'; }
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

.use-cases-mini {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.use-case-item {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #9b59b6;

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
    color: #666;
  }
}

.demo-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  .control-group {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-weight: 500;
      color: #2c3e50;
    }

    select, input {
      padding: 6px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
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
    background-color: #9b59b6;
    color: white;

    &:hover {
      background-color: #8e44ad;
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
}

.array-display {
  margin-bottom: 20px;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }
}

.array-elements {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.array-element {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 2px solid #bdc3c7;
  border-radius: 6px;
  background: white;
  min-width: 60px;
  transition: all 0.3s;

  &.in-query-range {
    border-color: #3498db;
    background: #ebf5fb;
  }

  &.updated {
    border-color: #e74c3c;
    background: #fdedec;
  }

  .index {
    font-size: 0.8rem;
    color: #7f8c8d;
    margin-bottom: 5px;
  }

  .value {
    font-weight: bold;
    font-size: 1.1rem;
    color: #2c3e50;
  }
}

.operation-controls {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.operation-type {
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }
}

.operation-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.op-btn {
  padding: 10px;
  background: #ecf0f1;
  border: 2px solid #bdc3c7;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &.active {
    background: #9b59b6;
    border-color: #8e44ad;
    color: white;
  }

  &:hover:not(.active) {
    background: #dde4e6;
  }
}

.operation-params {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.param-group {
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    min-width: 80px;
    font-weight: 500;
    color: #2c3e50;
  }
}

.param-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 80px;
}

.execute-btn {
  align-self: flex-start;
  margin-top: 10px;
}

.segment-tree-visualization {
  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2c3e50;
  }
}

.tree-container {
  position: relative;
  height: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: auto;
  background: #f8f9fa;
}

.tree-levels {
  position: relative;
  height: 100%;
}

.tree-level {
  position: relative;
  height: 80px;
  display: flex;
  justify-content: center;
}

.tree-node {
  position: absolute;
  width: 80px;
  height: 60px;
  background: white;
  border: 2px solid #9b59b6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 2;

  &.queried {
    background: #ebf5fb;
    border-color: #3498db;
    animation: pulse-blue 1.5s infinite;
  }

  &.updated {
    background: #fdedec;
    border-color: #e74c3c;
    animation: pulse-red 1.5s infinite;
  }

  &.leaf {
    background: #e8f6f3;
    border-color: #1abc9c;
  }

  .node-interval {
    font-size: 0.7rem;
    color: #7f8c8d;
    margin-bottom: 4px;
  }

  .node-value {
    font-weight: bold;
    font-size: 1rem;
    color: #2c3e50;
  }
}

.tree-connectors {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connector {
  fill: none;
  stroke: #95a5a6;
  stroke-width: 2;
  transition: all 0.3s;

  &.queried {
    stroke: #3498db;
    stroke-width: 3;
  }

  &.updated {
    stroke: #e74c3c;
    stroke-width: 3;
  }
}

.operation-result {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
    color: #9b59b6;
  }
}

.algorithm-tabs {
  display: flex;
  border-bottom: 1px solid #eaecef;
  margin-bottom: 20px;
  flex-wrap: wrap;

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
      color: #9b59b6;
    }

    &.active {
      color: #9b59b6;
      border-bottom-color: #9b59b6;
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
    margin-bottom: 15px;
  }
}

.algorithm-complexity {
  margin-bottom: 20px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;

  strong {
    color: #2c3e50;
    margin-right: 15px;

    &:not(:first-child) {
      margin-left: 15px;
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

.implementation-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.implementation-item {
  h3 {
    margin-top: 0;
    color: #2c3e50;
  }
}

.code-small {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.4;
  font-size: 0.8rem;
}

.variants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.variant {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #9b59b6;

  h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.5;
    color: #555;
  }
}

.variant-features {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.feature-tag {
  background: #9b59b6;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
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

@keyframes pulse-blue {
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
}

@keyframes pulse-red {
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

@media (max-width: 768px) {
  .segment-tree-container {
    padding: 10px;
  }

  .card {
    padding: 15px;
  }

  .demo-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .operation-controls {
    grid-template-columns: 1fr;
  }

  .operation-buttons {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .array-elements {
    justify-content: center;
  }
}
</style>
