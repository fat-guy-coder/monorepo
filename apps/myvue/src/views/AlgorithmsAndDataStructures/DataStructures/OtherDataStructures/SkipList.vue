<template>
  <div class="skip-list-container">
    <header class="page-header">
      <h1>跳表(Skip List)详解</h1>
      <p class="subtitle">一种高效的随机化数据结构</p>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="card">
          <h2>什么是跳表?</h2>
          <p>跳表是一种随机化数据结构，它通过维护多级索引来实现快速查找，是对有序链表的优化。跳表的查找、插入和删除操作的平均时间复杂度均为O(log n)。</p>
        </div>
      </section>

      <div class="two-column-layout">
        <section class="structure-section">
          <div class="card">
            <h2>结构特点</h2>
            <ul class="feature-list">
              <li>
                <h3>多层结构</h3>
                <p>跳表由多层链表组成，最底层包含所有元素，每上一层节点数量大致减半。</p>
              </li>
              <li>
                <h3>随机化索引</h3>
                <p>每个节点的层数是随机决定的，通过"抛硬币"方式决定是否提升到更高层。</p>
              </li>
              <li>
                <h3>有序性</h3>
                <p>所有层中的元素都保持有序，这是实现快速查找的基础。</p>
              </li>
              <li>
                <h3>头节点</h3>
                <p>跳表有一个特殊的头节点，它拥有最高层数，指向各层的第一个节点。</p>
              </li>
            </ul>
          </div>

          <div class="card">
            <h2>优缺点</h2>
            <div class="pros-cons">
              <div class="pros">
                <h3>优点</h3>
                <ul>
                  <li>实现相对简单，比平衡树更容易理解和实现</li>
                  <li>平均时间复杂度为O(log n)，性能优秀</li>
                  <li>支持范围查询，可以高效地查找区间内的元素</li>
                  <li>并发环境下表现良好</li>
                </ul>
              </div>
              <div class="cons">
                <h3>缺点</h3>
                <ul>
                  <li>空间复杂度较高，需要额外存储索引指针</li>
                  <li>最坏情况下性能可能退化到O(n)</li>
                  <li>随机化特性可能带来性能波动</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="visualization-section">
          <div class="card">
            <h2>结构演示</h2>
            <div class="visualization-controls">
              <button @click="insertRandomNode" class="btn primary">插入随机节点</button>
              <button @click="resetSkipList" class="btn secondary">重置</button>
              <div class="search-control">
                <input
                  v-model="searchValue"
                  type="number"
                  placeholder="输入搜索值"
                  @keyup.enter="searchNode"
                >
                <button @click="searchNode" class="btn primary">搜索</button>
              </div>
            </div>
            <div class="skip-list-visual">
              <div class="levels">
                <div
                  v-for="(level, levelIndex) in skipList.levels"
                  :key="levelIndex"
                  class="level"
                  :class="{ 'top-level': levelIndex === skipList.levels.length - 1 }"
                >
                  <div class="level-label">L{{ levelIndex }}</div>
                  <div class="nodes">
                    <div class="head-node">HEAD</div>
                    <div
                      v-for="(node, nodeIndex) in level"
                      :key="nodeIndex"
                      class="node"
                      :class="{
                        'searched': node.value === searchedValue,
                        'new-node': node.isNew
                      }"
                      :style="{ '--node-value': node.value }"
                    >
                      <div class="node-value">{{ node.value }}</div>
                      <div class="node-pointers">
                        <div
                          v-for="pointer in node.pointers"
                          :key="pointer.level"
                          class="pointer"
                          :class="{
                            'active': pointer.active,
                            'search-path': pointer.searchPath
                          }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="visualization-info">
              <p v-if="searchResult !== null">{{ searchResult }}</p>
              <p v-else>点击"插入随机节点"或输入值搜索来查看跳表操作</p>
            </div>
          </div>
        </section>
      </div>

      <section class="algorithms-section">
        <div class="card">
          <h2>相关算法</h2>
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
            <pre class="code-block"><code>{{ algorithms[activeAlgorithm].code }}</code></pre>
          </div>
        </div>
      </section>

      <section class="use-cases-section">
        <div class="card">
          <h2>使用场景</h2>
          <div class="use-cases-grid">
            <div class="use-case">
              <h3>Redis有序集合</h3>
              <p>Redis使用跳表实现有序集合(sorted set)，支持快速的范围查询和排名操作。</p>
            </div>
            <div class="use-case">
              <h3>LevelDB/RocksDB</h3>
              <p>这些键值存储引擎使用跳表作为内存中的数据结构，用于快速查找和排序。</p>
            </div>
            <div class="use-case">
              <h3>并发数据结构</h3>
              <p>跳表在并发环境下表现良好，常用于实现并发有序映射和集合。</p>
            </div>
            <div class="use-case">
              <h3>替代平衡树</h3>
              <p>当需要有序数据结构但不想实现复杂的平衡树时，跳表是一个优秀的选择。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// 跳表节点类型定义
interface SkipListNode {
  value: number
  level: number
  pointers: Array<{
    level: number
    active: boolean
    searchPath?: boolean
  }>
  isNew?: boolean
}

// 跳表结构定义
interface SkipListStructure {
  levels: SkipListNode[][]
}

// 响应式数据
const skipList = reactive<SkipListStructure>({
  levels: []
})

const searchValue = ref<number | null>(null)
const searchedValue = ref<number | null>(null)
const searchResult = ref<string | null>(null)
const activeAlgorithm = ref(0)

// 初始化跳表
const initializeSkipList = () => {
  skipList.levels = [
    [
      { value: 3, level: 2, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }] },
      { value: 6, level: 1, pointers: [{ level: 0, active: true }, { level: 1, active: true }] },
      { value: 7, level: 3, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }, { level: 3, active: true }] },
      { value: 9, level: 2, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }] },
      { value: 12, level: 1, pointers: [{ level: 0, active: true }, { level: 1, active: true }] },
      { value: 17, level: 2, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }] },
      { value: 19, level: 1, pointers: [{ level: 0, active: true }, { level: 1, active: true }] },
      { value: 21, level: 3, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }, { level: 3, active: true }] },
    ]
  ]

  // 构建多层结构
  buildLevels()
}

// 构建多层结构
const buildLevels = () => {
  const baseLevel = skipList.levels[0]
  const maxLevel = Math.max(...baseLevel.map(node => node.level))

  // 清空现有层级
  skipList.levels = [baseLevel]

  // 构建更高层级
  for (let i = 1; i <= maxLevel; i++) {
    const levelNodes = baseLevel.filter(node => node.level >= i)
    skipList.levels.push(levelNodes)
  }
}

// 插入随机节点
const insertRandomNode = () => {
  const baseLevel = skipList.levels[0]
  const newValue = Math.floor(Math.random() * 30) + 1

  // 确保值不重复
  if (baseLevel.some(node => node.value === newValue)) {
    insertRandomNode()
    return
  }

  // 随机确定层数（1-4层）
  const newLevel = Math.min(Math.floor(Math.log2(baseLevel.length + 1)) + 1, 4)

  // 创建新节点
  const newNode: SkipListNode = {
    value: newValue,
    level: newLevel,
    pointers: Array.from({ length: newLevel + 1 }, (_, i) => ({
      level: i,
      active: true
    })),
    isNew: true
  }

  // 找到插入位置
  let insertIndex = 0
  while (insertIndex < baseLevel.length && baseLevel[insertIndex].value < newValue) {
    insertIndex++
  }

  // 插入节点
  baseLevel.splice(insertIndex, 0, newNode)

  // 重新构建层级
  buildLevels()

  // 1秒后移除新节点标记
  setTimeout(() => {
    newNode.isNew = false
  }, 1000)
}

// 搜索节点
const searchNode = () => {
  if (searchValue.value === null) return

  const target = searchValue.value
  searchedValue.value = target
  searchResult.value = null

  // 模拟搜索过程
  const baseLevel = skipList.levels[0]
  const found = baseLevel.some(node => node.value === target)

  if (found) {
    searchResult.value = `找到值为 ${target} 的节点`
  } else {
    searchResult.value = `未找到值为 ${target} 的节点`
  }

  // 3秒后清除搜索状态
  setTimeout(() => {
    searchedValue.value = null
  }, 3000)
}

// 重置跳表
const resetSkipList = () => {
  initializeSkipList()
  searchedValue.value = null
  searchResult.value = null
}

// 算法定义
const algorithms = [
  {
    name: '查找算法',
    description: '从最高层开始查找，如果当前节点的下一个节点值小于目标值，则向右移动；否则向下移动到下一层继续查找。',
    code: `function search(skipList, target) {
  let current = skipList.head;
  for (let level = skipList.maxLevel - 1; level >= 0; level--) {
    while (current.forward[level] && current.forward[level].value < target) {
      current = current.forward[level];
    }
  }
  current = current.forward[0];
  return current && current.value === target ? current : null;
}`
  },
  {
    name: '插入算法',
    description: '首先查找插入位置，然后随机生成新节点的层数，最后更新相关指针将新节点插入到跳表中。',
    code: `function insert(skipList, value) {
  const update = new Array(skipList.maxLevel);
  let current = skipList.head;

  // 查找插入位置
  for (let level = skipList.maxLevel - 1; level >= 0; level--) {
    while (current.forward[level] && current.forward[level].value < value) {
      current = current.forward[level];
    }
    update[level] = current;
  }

  // 随机确定层数
  let newLevel = randomLevel();
  if (newLevel > skipList.maxLevel) {
    // 调整跳表最大层数
    for (let i = skipList.maxLevel; i < newLevel; i++) {
      update[i] = skipList.head;
    }
    skipList.maxLevel = newLevel;
  }

  // 创建新节点并更新指针
  const newNode = new SkipListNode(value, newLevel);
  for (let level = 0; level < newLevel; level++) {
    newNode.forward[level] = update[level].forward[level];
    update[level].forward[level] = newNode;
  }
}`
  },
  {
    name: '删除算法',
    description: '首先查找要删除的节点，然后更新所有指向该节点的指针，使其跳过该节点。',
    code: `function delete(skipList, value) {
  const update = new Array(skipList.maxLevel);
  let current = skipList.head;

  // 查找要删除的节点
  for (let level = skipList.maxLevel - 1; level >= 0; level--) {
    while (current.forward[level] && current.forward[level].value < value) {
      current = current.forward[level];
    }
    update[level] = current;
  }

  current = current.forward[0];
  if (current && current.value === value) {
    // 更新指针跳过该节点
    for (let level = 0; level < skipList.maxLevel; level++) {
      if (update[level].forward[level] !== current) break;
      update[level].forward[level] = current.forward[level];
    }

    // 如果删除了最高层的节点，调整跳表最大层数
    while (skipList.maxLevel > 1 &&
           skipList.head.forward[skipList.maxLevel - 1] === null) {
      skipList.maxLevel--;
    }
  }
}`
  }
]

// 组件挂载时初始化跳表
onMounted(() => {
  initializeSkipList()
})
</script>

<style lang="less" scoped>
.skip-list-container {
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
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
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
  grid-template-columns: 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }

    h3 {
      margin: 0 0 8px;
      color: #3498db;
      font-size: 1.2rem;
    }

    p {
      margin: 0;
      line-height: 1.5;
      color: #666;
    }
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
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &.primary {
      background-color: #3498db;
      color: white;

      &:hover {
        background-color: #2980b9;
      }
    }

    &.secondary {
      background-color: #ecf0f1;
      color: #2c3e50;

      &:hover {
        background-color: #dde4e6;
      }
    }
  }

  .search-control {
    display: flex;
    gap: 8px;
    margin-left: auto;

    input {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 120px;
    }
  }
}

.skip-list-visual {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
}

.levels {
  display: flex;
  flex-direction: column-reverse;
  gap: 30px;
}

.level {
  display: flex;
  align-items: center;
  position: relative;

  &.top-level {
    .level-label {
      background: #2c3e50;
      color: white;
    }
  }

  .level-label {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #3498db;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
}

.nodes {
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #bdc3c7;
    z-index: 1;
  }
}

.head-node {
  background: #2c3e50;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: bold;
  margin-right: 20px;
  position: relative;
  z-index: 2;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  position: relative;
  z-index: 2;

  &.searched {
    .node-value {
      background: #e74c3c;
      color: white;
      animation: pulse 1s infinite;
    }
  }

  &.new-node {
    .node-value {
      background: #27ae60;
      color: white;
      animation: pulse 1s infinite;
    }
  }

  .node-value {
    background: #3498db;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .node-pointers {
    display: flex;
    flex-direction: column;
    align-items: center;

    .pointer {
      width: 30px;
      height: 4px;
      background: #95a5a6;
      margin-bottom: 2px;
      border-radius: 2px;

      &.active {
        background: #e74c3c;
      }

      &.search-path {
        background: #f39c12;
      }
    }
  }
}

.visualization-info {
  margin-top: 15px;
  padding: 10px;
  background: #ecf0f1;
  border-radius: 4px;
  text-align: center;
  font-style: italic;
  color: #7f8c8d;
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
      color: #3498db;
    }

    &.active {
      color: #3498db;
      border-bottom-color: #3498db;
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
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;

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
</style>
