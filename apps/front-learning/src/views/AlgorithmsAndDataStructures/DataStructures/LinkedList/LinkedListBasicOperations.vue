<template>
  <div class="linked-list-container">
    <header>
      <h1>链表数据结构基础介绍</h1>
      <p class="subtitle">掌握链表的9个基本操作与实现原理</p>
    </header>

    <div class="linked-list-visualization">
      <div class="visual-header">
        <h2>链表可视化演示</h2>
        <div class="controls">
          <input type="number" v-model.number="newNodeValue" placeholder="节点值" min="1" max="99">
          <input type="number" v-model.number="insertPosition" placeholder="插入位置" min="0" :max="listSize">
          <button @click="insertNode">添加节点</button>
          <button @click="resetList" class="reset-btn">重置链表</button>
        </div>
      </div>

      <div class="list-display">
        <div class="node head-node">
          <div class="node-label">Head</div>
          <div class="pointer">→</div>
        </div>

        <div v-for="(node, index) in linkedList" :key="node.id" class="node" :class="{
          'new-node': node.isNew,
          'selected-node': selectedNodeId === node.id
        }">
          <div class="node-value">{{ node.value }}</div>
          <div class="node-pointer">→</div>
          <div class="node-actions">
            <button @click="deleteNode(index)" class="node-btn delete-btn">删除</button>
            <button @click="selectNode(node.id)" class="node-btn select-btn">选择</button>
          </div>
        </div>

        <div class="node tail-node">
          <div class="node-label">Null</div>
        </div>
      </div>

      <div class="list-info">
        <div class="info-item">链表长度: <span>{{ listSize }}</span></div>
        <div class="info-item">当前选中节点: <span>{{ selectedNodeValue }}</span></div>
        <div class="info-item">链表状态: <span>{{ listSize > 0 ? '已初始化' : '空链表' }}</span></div>
      </div>
    </div>

    <div class="operations-container">
      <div class="operations-header">
        <h2>链表基本操作</h2>
        <div class="tabs">
          <button v-for="(op, index) in operations" :key="index"
            :class="['tab-button', { active: activeOperation === index }]" @click="activeOperation = index">
            {{ op.title }}
          </button>
        </div>
      </div>

      <div class="operation-details">
        <div class="operation-info">
          <h3>{{ activeOperationData.title }}</h3>
          <div class="complexity">
            时间复杂度: <span>{{ activeOperationData.timeComplexity }}</span>
          </div>
          <p class="description">{{ activeOperationData.description }}</p>
        </div>

        <div class="code-section">
          <h4>代码实现</h4>
          <div class="code-block">
            <pre>{{ activeOperationData.code }}</pre>
          </div>
        </div>

        <div class="visual-example">
          <h4>操作示例</h4>
          <div class="example-content">
            <div class="linked-list-example">
              <div class="example-node" v-for="(node, idx) in operationExampleNodes" :key="idx">
                <div class="example-value">{{ node.value }}</div>
                <div class="example-pointer" v-if="idx < operationExampleNodes.length - 1">→</div>
              </div>
            </div>

            <div class="operation-result">
              <div v-if="activeOperation === 0">
                <p>创建包含 {{ operationExampleNodes.length }} 个节点的链表</p>
              </div>
              <div v-if="activeOperation === 1">
                <p>遍历结果: {{ traversalResult }}</p>
              </div>
              <div v-if="activeOperation === 2">
                <p>在位置 {{ insertExamplePos }} 插入新节点</p>
              </div>
              <div v-if="activeOperation === 3">
                <p>在链表头部插入新节点</p>
              </div>
              <div v-if="activeOperation === 4">
                <p>在链表尾部插入新节点</p>
              </div>
              <div v-if="activeOperation === 5">
                <p>删除位置 {{ deleteExamplePos }} 的节点</p>
              </div>
              <div v-if="activeOperation === 6">
                <p>删除链表头部节点</p>
              </div>
              <div v-if="activeOperation === 7">
                <p>删除链表尾部节点</p>
              </div>
              <div v-if="activeOperation === 8">
                <p>查找值为 {{ searchValue }} 的节点</p>
                <p v-if="searchResult !== null">找到节点，位置: {{ searchResult }}</p>
                <p v-else>未找到该节点</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2>链表与数组对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>操作</th>
              <th>链表</th>
              <th>数组</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>随机访问</td>
              <td>O(n)</td>
              <td>O(1)</td>
            </tr>
            <tr>
              <td>头部插入</td>
              <td>O(1)</td>
              <td>O(n)</td>
            </tr>
            <tr>
              <td>尾部插入</td>
              <td>O(n)</td>
              <td>O(1)</td>
            </tr>
            <tr>
              <td>中间插入</td>
              <td>O(n)</td>
              <td>O(n)</td>
            </tr>
            <tr>
              <td>内存使用</td>
              <td>动态分配</td>
              <td>预先分配</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer>
      <p>链表总结：灵活的内存使用 · 高效的插入删除 · 顺序访问数据结构</p>
      <div class="footer-links">
        <a href="#">查看更多数据结构</a>
        <a href="#">算法复杂度分析</a>
        <a href="#">实际应用案例</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 链表节点类型
interface ListNode {
  id: number;
  value: number;
  next: ListNode | null;
  isNew?: boolean;
}

// 生成唯一ID
let nodeIdCounter = 0;
const generateNodeId = () => ++nodeIdCounter;

// 链表数据
const linkedList = ref<ListNode[]>([]);
const selectedNodeId = ref<number | null>(null);
const newNodeValue = ref<number>(Math.floor(Math.random() * 90) + 10);
const insertPosition = ref<number>(0);

// 操作示例数据
const traversalResult = ref<string>('');
const insertExamplePos = ref<number>(2);
const deleteExamplePos = ref<number>(1);
const searchValue = ref<number>(25);
const searchResult = ref<number | null>(null);

// 链表大小
const listSize = computed(() => linkedList.value.length);

// 选中的节点值
const selectedNodeValue = computed(() => {
  if (selectedNodeId.value === null) return '无';
  const node = linkedList.value.find(n => n.id === selectedNodeId.value);
  return node ? node.value : '无';
});

// 初始化链表
const initializeList = () => {
  linkedList.value = [
    { id: generateNodeId(), value: 10, next: null },
    { id: generateNodeId(), value: 20, next: null },
    { id: generateNodeId(), value: 30, next: null },
    { id: generateNodeId(), value: 40, next: null }
  ];
};

// 重置链表
const resetList = () => {
  linkedList.value = [];
  selectedNodeId.value = null;
};

// 插入节点
const insertNode = () => {
  if (!newNodeValue.value) return;

  const newNode = {
    id: generateNodeId(),
    value: newNodeValue.value,
    next: null,
    isNew: true
  };

  const pos = insertPosition.value;

  // 位置无效时插入到末尾
  if (pos < 0 || pos > linkedList.value.length) {
    linkedList.value.push(newNode);
  }
  // 插入到指定位置
  else {
    linkedList.value.splice(pos, 0, newNode);
  }

  // 重置输入
  newNodeValue.value = Math.floor(Math.random() * 90) + 10;
  insertPosition.value = Math.min(linkedList.value.length, Math.max(0, pos));

  // 移除新节点标记
  setTimeout(() => {
    const index = linkedList.value.findIndex(n => n.id === newNode.id);
    if (index !== -1) {
      linkedList.value[index] = { ...linkedList.value[index], isNew: false };
    }
  }, 2000);
};

// 删除节点
const deleteNode = (index: number) => {
  if (index >= 0 && index < linkedList.value.length) {
    linkedList.value.splice(index, 1);
    if (selectedNodeId.value === linkedList.value[index]?.id) {
      selectedNodeId.value = null;
    }
  }
};

// 选择节点
const selectNode = (id: number) => {
  selectedNodeId.value = id;
};

// 操作数据
const operations = ref([
  {
    title: "1. 创建链表",
    description: "初始化一个链表结构，创建头节点并设置初始值。链表由节点组成，每个节点包含数据和指向下一个节点的指针。",
    timeComplexity: "O(1)",
    code: `class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// 创建链表
function createLinkedList(values) {
  if (!values.length) return null;

  const head = new ListNode(values[0]);
  let current = head;

  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  return head;
}`
  },
  {
    title: "2. 遍历链表",
    description: "访问链表中的每个节点，从头节点开始，沿着next指针依次访问每个节点，直到到达链表末尾。",
    timeComplexity: "O(n)",
    code: `function traverseLinkedList(head) {
  let current = head;
  const values = [];

  while (current !== null) {
    values.push(current.value);
    current = current.next;
  }

  return values;
}`
  },
  {
    title: "3. 在指定位置插入",
    description: "在链表的特定位置插入新节点。需要找到插入位置的前一个节点，调整指针将新节点插入链表中。",
    timeComplexity: "O(n)",
    code: `function insertAtPosition(head, value, position) {
  const newNode = new ListNode(value);

  // 在头部插入
  if (position === 0) {
    newNode.next = head;
    return newNode;
  }

  let current = head;
  let count = 0;

  // 找到插入位置的前一个节点
  while (current && count < position - 1) {
    current = current.next;
    count++;
  }

  if (current) {
    newNode.next = current.next;
    current.next = newNode;
  }

  return head;
}`
  },
  {
    title: "4. 在头部插入",
    description: "在链表的开头添加新节点。新节点成为新的头节点，指向原来的头节点。",
    timeComplexity: "O(1)",
    code: `function insertAtHead(head, value) {
  const newNode = new ListNode(value);
  newNode.next = head;
  return newNode;
}`
  },
  {
    title: "5. 在尾部插入",
    description: "在链表的末尾添加新节点。需要遍历链表找到最后一个节点，将其next指针指向新节点。",
    timeComplexity: "O(n)",
    code: `function insertAtTail(head, value) {
  const newNode = new ListNode(value);

  if (!head) {
    return newNode;
  }

  let current = head;
  while (current.next) {
    current = current.next;
  }

  current.next = newNode;
  return head;
}`
  },
  {
    title: "6. 删除指定位置节点",
    description: "删除链表中特定位置的节点。需要找到待删除节点的前一个节点，调整指针跳过待删除节点。",
    timeComplexity: "O(n)",
    code: `function deleteAtPosition(head, position) {
  if (!head) return null;

  // 删除头节点
  if (position === 0) {
    return head.next;
  }

  let current = head;
  let count = 0;

  // 找到删除位置的前一个节点
  while (current && count < position - 1) {
    current = current.next;
    count++;
  }

  if (current && current.next) {
    current.next = current.next.next;
  }

  return head;
}`
  },
  {
    title: "7. 删除头部节点",
    description: "删除链表的头节点。原头节点的下一个节点成为新的头节点。",
    timeComplexity: "O(1)",
    code: `function deleteHead(head) {
  if (!head) return null;
  return head.next;
}`
  },
  {
    title: "8. 删除尾部节点",
    description: "删除链表的最后一个节点。需要遍历链表找到倒数第二个节点，将其next指针置为null。",
    timeComplexity: "O(n)",
    code: `function deleteTail(head) {
  if (!head || !head.next) return null;

  let current = head;
  while (current.next && current.next.next) {
    current = current.next;
  }

  current.next = null;
  return head;
}`
  },
  {
    title: "9. 查找节点",
    description: "在链表中查找特定值的节点。遍历链表，比较每个节点的值，找到匹配的节点或到达链表末尾。",
    timeComplexity: "O(n)",
    code: `function findNode(head, target) {
  let current = head;
  let position = 0;

  while (current) {
    if (current.value === target) {
      return position;
    }
    current = current.next;
    position++;
  }

  return -1; // 未找到
}`
  }
]);

// 当前激活的操作
const activeOperation = ref(0);
const activeOperationData = computed(() => operations.value[activeOperation.value]);

// 操作示例节点
const operationExampleNodes = computed(() => {
  return [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 }
  ];
});

// 初始化
onMounted(() => {
  initializeList();

  // 设置遍历结果
  traversalResult.value = linkedList.value.map(node => node.value).join(' → ');
});
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@danger-color: #e71d36;
@light-color: #f8f9fa;
@dark-color: #212529;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.linked-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @dark-color;
  background-color: #ffffff;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 2px solid @border-color;

    h1 {
      font-size: 2.5rem;
      color: @secondary-color;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 1.2rem;
      color: lighten(@dark-color, 30%);
      max-width: 800px;
      margin: 0 auto;
    }
  }
}

.linked-list-visualization {
  background-color: @light-color;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 40px;
  box-shadow: @card-shadow;

  .visual-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    h2 {
      margin: 0;
      color: @secondary-color;
      font-size: 1.8rem;
    }

    .controls {
      display: flex;
      gap: 12px;
      align-items: center;

      input {
        padding: 10px 15px;
        border: 1px solid @border-color;
        border-radius: 6px;
        width: 100px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: @primary-color;
          box-shadow: 0 0 0 2px fade(@primary-color, 20%);
        }
      }

      button {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;

        &:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
      }

      .reset-btn {
        background: linear-gradient(135deg, @danger-color, darken(@danger-color, 10%));
      }
    }
  }

  .list-display {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    min-height: 150px;
    padding: 20px;
    background-color: #f9fbfd;
    border-radius: 8px;
    border: 1px dashed @border-color;
    margin-bottom: 25px;

    .node {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 8px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
      padding: 15px;
      position: relative;
      transition: all 0.3s ease;

      &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;
        opacity: 0;
        transition: opacity 0.3s;
      }

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

        &::before {
          opacity: 1;
        }
      }

      &.head-node,
      &.tail-node {
        background: linear-gradient(135deg, @accent-color, lighten(@accent-color, 10%));
        color: white;
        font-weight: bold;
      }

      &.new-node {
        animation: pulse 1.5s ease-in-out;
      }

      &.selected-node {
        box-shadow: 0 0 0 3px @primary-color;
      }

      .node-value {
        font-size: 1.3rem;
        font-weight: bold;
        min-width: 50px;
        text-align: center;
        color: @secondary-color;
      }

      .node-pointer {
        font-size: 1.5rem;
        margin: 0 15px;
        color: lighten(@dark-color, 40%);
      }

      .node-label {
        font-size: 1.2rem;
        font-weight: bold;
      }

      .node-actions {
        margin-left: 15px;
        display: flex;
        gap: 8px;

        .node-btn {
          padding: 5px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;

          &.delete-btn {
            background-color: @danger-color;
            color: white;

            &:hover {
              background-color: darken(@danger-color, 10%);
            }
          }

          &.select-btn {
            background-color: @success-color;
            color: white;

            &:hover {
              background-color: darken(@success-color, 10%);
            }
          }
        }
      }
    }
  }

  .list-info {
    display: flex;
    justify-content: space-around;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    padding: 15px;
    border-radius: 8px;

    .info-item {
      text-align: center;
      font-size: 1.1rem;

      span {
        font-weight: bold;
        background: rgba(255, 255, 255, 0.2);
        padding: 3px 10px;
        border-radius: 20px;
      }
    }
  }
}

.operations-container {
  background-color: @light-color;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;
  margin-bottom: 40px;

  .operations-header {
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    padding: 20px;
    color: white;

    h2 {
      margin: 0 0 15px 0;
      font-size: 1.8rem;
    }

    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .tab-button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;

        &.active {
          background: white;
          color: @primary-color;
        }

        &:hover:not(.active) {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }

  .operation-details {
    padding: 25px;

    .operation-info {
      margin-bottom: 25px;

      h3 {
        margin-top: 0;
        color: @secondary-color;
        font-size: 1.5rem;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: @accent-color;
          margin-right: 10px;
        }
      }

      .complexity {
        background: #eef7ff;
        display: inline-block;
        padding: 5px 15px;
        border-radius: 20px;
        margin-bottom: 15px;
        font-weight: 500;

        span {
          font-weight: bold;
          color: @primary-color;
        }
      }

      .description {
        font-size: 1.05rem;
        line-height: 1.7;
      }
    }

    .code-section {
      margin-bottom: 30px;

      h4 {
        color: @secondary-color;
        margin-bottom: 15px;
        font-size: 1.2rem;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: @accent-color;
          margin-right: 10px;
        }
      }
    }

    .code-block {
      background-color: #2d2d2d;
      color: #f8f8f2;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 1rem;
      line-height: 1.5;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .visual-example {
      h4 {
        color: @secondary-color;
        margin-bottom: 15px;
        font-size: 1.2rem;
      }

      .example-content {
        display: flex;
        gap: 30px;
        align-items: center;

        .linked-list-example {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #f0f7ff;
          padding: 20px;
          border-radius: 8px;
          flex: 1;

          .example-node {
            display: flex;
            align-items: center;
            background: white;
            border-radius: 8px;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
            padding: 15px;

            .example-value {
              font-size: 1.3rem;
              font-weight: bold;
              min-width: 50px;
              text-align: center;
              color: @secondary-color;
            }

            .example-pointer {
              font-size: 1.5rem;
              margin: 0 10px;
              color: lighten(@dark-color, 40%);
            }
          }
        }

        .operation-result {
          flex: 1;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
          font-size: 1.1rem;
          line-height: 1.7;
        }
      }
    }
  }
}

.comparison-section {
  background-color: @light-color;
  border-radius: 12px;
  padding: 30px;
  box-shadow: @card-shadow;
  margin-bottom: 40px;

  h2 {
    color: @secondary-color;
    margin-top: 0;
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 25px;
  }

  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      th,
      td {
        padding: 15px 20px;
        text-align: center;
        border: 1px solid @border-color;
      }

      thead {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;

        th {
          font-weight: 600;
          font-size: 1.1rem;
        }
      }

      tbody {
        tr:nth-child(even) {
          background-color: #f9fbfd;
        }

        td {
          font-weight: 500;

          &:first-child {
            text-align: left;
            font-weight: 600;
            color: @secondary-color;
          }
        }
      }
    }
  }
}

footer {
  margin-top: 50px;
  padding-top: 30px;
  text-align: center;
  border-top: 1px solid @border-color;

  p {
    font-size: 1.2rem;
    font-weight: 600;
    color: @secondary-color;
    margin-bottom: 20px;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;

      &:hover {
        color: @secondary-color;
        text-decoration: underline;
      }
    }
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(@success-color, 0.7);
  }

  70% {
    box-shadow: 0 0 0 12px rgba(@success-color, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(@success-color, 0);
  }
}

@media (max-width: 900px) {
  .linked-list-visualization {
    .visual-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;

      .controls {
        width: 100%;
        flex-wrap: wrap;

        input,
        button {
          flex: 1;
          min-width: 100px;
        }
      }
    }
  }

  .operation-details .visual-example .example-content {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .list-display {
    flex-direction: column;
    align-items: flex-start !important;

    .node {
      margin-bottom: 10px;
    }
  }

  .list-info {
    flex-direction: column;
    gap: 15px;
  }

  .operations-header .tabs {
    overflow-x: auto;
    padding-bottom: 10px;
  }
}
</style>
