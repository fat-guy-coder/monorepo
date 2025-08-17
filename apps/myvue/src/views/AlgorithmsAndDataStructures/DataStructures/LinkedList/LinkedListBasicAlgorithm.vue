<template>
  <div class="linked-list-container">
    <div class="header">
      <h1>链表基础算法介绍</h1>
      <p class="subtitle">掌握链表操作的高级技巧与应用场景</p>
      <div class="complexity-badges">
        <div class="badge">
          <div class="icon">⏱️</div>
          <span>时间复杂度: O(n)</span>
        </div>
        <div class="badge">
          <div class="icon">💾</div>
          <span>空间复杂度: O(1)</span>
        </div>
      </div>
    </div>

    <div class="algorithm-selector">
      <div
        v-for="algorithm in algorithms"
        :key="algorithm.id"
        :class="{ active: activeAlgorithm === algorithm.id }"
        @click="activeAlgorithm = algorithm.id"
      >
        {{ algorithm.name }}
      </div>
    </div>

    <div class="algorithm-details">
      <div class="algorithm-info">
        <div class="algorithm-header">
          <div class="icon">{{ activeAlgorithmData.icon }}</div>
          <h2>{{ activeAlgorithmData.name }}</h2>
        </div>

        <div class="algorithm-description">
          <h3>算法描述</h3>
          <p>{{ activeAlgorithmData.description }}</p>
        </div>

        <div class="algorithm-steps">
          <h3>算法步骤</h3>
          <ol>
            <li v-for="(step, index) in activeAlgorithmData.steps" :key="index">
              {{ step }}
            </li>
          </ol>
        </div>

        <div class="algorithm-scenarios">
          <h3>使用场景</h3>
          <ul>
            <li v-for="(scenario, index) in activeAlgorithmData.scenarios" :key="index">
              {{ scenario }}
            </li>
          </ul>
        </div>
      </div>

      <div class="algorithm-code">
        <h3>TypeScript 实现</h3>
        <pre><code>{{ activeAlgorithmData.code }}</code></pre>

        <div class="complexity-analysis">
          <h3>复杂度分析</h3>
          <div class="complexity">
            <div class="metric">
              <span class="label">时间复杂度</span>
              <span class="value">{{ activeAlgorithmData.complexity.time }}</span>
            </div>
            <div class="metric">
              <span class="label">空间复杂度</span>
              <span class="value">{{ activeAlgorithmData.complexity.space }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="visualization">
      <h2>算法可视化</h2>
      <div class="linked-list-visual">
        <div
          v-for="(node, index) in listData"
          :key="index"
          class="list-node"
          :class="{
            active: visualization.activeIndex === index,
            head: index === 0,
            tail: index === listData.length - 1,
          }"
        >
          <div class="node-value">{{ node.value }}</div>
          <div class="node-pointer" v-if="index < listData.length - 1">
            <div class="pointer-line"></div>
            <div class="pointer-arrow">→</div>
          </div>
        </div>
      </div>

      <div class="visual-controls">
        <button @click="prevStep" :disabled="visualization.stepIndex === 0">◀ 上一步</button>
        <button
          @click="nextStep"
          :disabled="visualization.stepIndex >= visualization.totalSteps - 1"
        >
          下一步 ▶
        </button>
      </div>

      <div class="visual-description">
        <p>{{ visualization.steps[visualization.stepIndex] }}</p>
      </div>
    </div>

    <div class="applications">
      <h2>链表算法在实际中的应用</h2>
      <div class="application-cards">
        <div class="app-card">
          <div class="icon">💾</div>
          <h3>内存管理</h3>
          <p>操作系统使用链表管理空闲内存块，分配和回收内存</p>
        </div>
        <div class="app-card">
          <div class="icon">📁</div>
          <h3>文件系统</h3>
          <p>文件分配表(FAT)使用链表结构存储文件块位置</p>
        </div>
        <div class="app-card">
          <div class="icon">🌐</div>
          <h3>浏览器历史</h3>
          <p>浏览器前进后退功能使用双向链表实现</p>
        </div>
        <div class="app-card">
          <div class="icon">🎵</div>
          <h3>音乐播放器</h3>
          <p>播放列表使用循环链表实现循环播放功能</p>
        </div>
      </div>
    </div>

    <div class="practice-section">
      <h2>算法练习建议</h2>
      <div class="practice-tips">
        <div class="tip">
          <div class="number">1</div>
          <p>手动模拟算法过程，在白板上逐步推演</p>
        </div>
        <div class="tip">
          <div class="number">2</div>
          <p>实现链表基本操作（插入、删除、反转等）</p>
        </div>
        <div class="tip">
          <div class="number">3</div>
          <p>解决LeetCode链表相关问题（中等难度）</p>
        </div>
        <div class="tip">
          <div class="number">4</div>
          <p>尝试使用递归和迭代两种方法实现算法</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 链表节点定义
class ListNode {
  val: number
  next: ListNode | null

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

// 算法数据
const algorithms = ref([
  {
    id: 'reverse',
    name: '反转链表',
    icon: '🔄',
    description: '将链表中的节点顺序完全反转，头节点变为尾节点，尾节点变为头节点。',
    steps: [
      '初始化三个指针：prev（前一节点，初始null）、curr（当前节点，初始头节点）、next（下一节点）',
      '遍历链表，每次迭代：保存curr.next到next、将curr.next指向prev、prev移动到curr、curr移动到next',
      '当curr为null时，prev即为新链表的头节点',
    ],
    scenarios: ['需要从后向前处理链表元素时', '解决回文链表问题', '某些特定场景需要逆序访问链表'],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
    },
    code: `// 迭代法反转链表
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

// 递归法反转链表
// 链表反转函数（递归实现）
function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  // 递归终止条件：空链表或单个节点
  if (head === null || head.next === null) {
    return head;
  }

  // 递归反转剩余部分
  const reversedRest = reverseList(head.next);

  // 将当前节点添加到反转后链表的尾部
  head.next.next = head;
  head.next = null;

  return reversedRest;
}
`,
  },
  {
    id: 'cycle',
    name: '检测环形链表',
    icon: '⭕',
    description: '检测链表中是否存在环，即链表的某个节点可以通过连续 next 指针再次到达。',
    steps: [
      '使用两个指针：slow（每次移动一步）和fast（每次移动两步）',
      '从链表头开始同时移动两个指针',
      '如果链表有环，快指针最终会追上慢指针（两者相遇）',
      '如果快指针到达链表尾部（null），则链表无环',
    ],
    scenarios: ['检测链表是否循环引用', '内存泄漏检测', '解决环形链表相关问题'],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
    },
    code: `function hasCycle(head: ListNode | null): boolean {
  if (head === null || head.next === null) {
    return false;
  }

  let slow: ListNode | null = head;
  let fast: ListNode | null = head.next;

  while (slow !== fast) {
    if (fast === null || fast.next === null) {
      return false;
    }

    slow = slow!.next;
    fast = fast.next.next;
  }

  return true;
}`,
  },
  {
    id: 'merge',
    name: '合并有序链表',
    icon: '🤝',
    description: '将两个升序排列的链表合并为一个新的升序链表并返回。',
    steps: [
      '创建一个哨兵节点(dummy)作为新链表的起始点',
      '使用指针current指向哨兵节点',
      '比较两个链表的当前节点值，将较小值的节点连接到current后',
      '移动较小值链表和current指针',
      '重复直到其中一个链表为空',
      '将剩余链表连接到current后',
    ],
    scenarios: ['合并多个有序数据流', '归并排序的链表实现', '合并多个排序结果'],
    complexity: {
      time: 'O(n+m)',
      space: 'O(1)',
    },
    code: `function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // 连接剩余部分
  current.next = l1 === null ? l2 : l1;

  return dummy.next;
}`,
  },
  {
    id: 'nth',
    name: '删除倒数第N节点',
    icon: '🗑️',
    description: '删除链表的倒数第n个节点，并返回链表的头节点。',
    steps: [
      '创建哨兵节点(dummy)指向头节点，处理头节点被删除的情况',
      '初始化两个指针：first和second，都指向dummy',
      '将first指针向前移动n+1步（创建n+1的间隔）',
      '同时移动first和second，直到first到达链表尾部',
      '此时second指向倒数第n+1个节点，修改其next指针跳过倒数第n个节点',
      '返回dummy.next',
    ],
    scenarios: ['需要从链表末尾删除节点', '实现特定位置的链表操作', '解决链表删除相关问题'],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
    },
    code: `function removeNthFromEnd(
  head: ListNode | null,
  n: number
): ListNode | null {
  const dummy = new ListNode(0);
  dummy.next = head;

  let first: ListNode | null = dummy;
  let second: ListNode | null = dummy;

  // 先移动first指针，创建n+1的间隔
  for (let i = 0; i <= n; i++) {
    first = first!.next;
  }

  // 同时移动两个指针
  while (first !== null) {
    first = first.next;
    second = second!.next;
  }

  // 删除目标节点
  second!.next = second!.next!.next;

  return dummy.next;
}`,
  },
  {
    id: 'intersection',
    name: '链表相交点',
    icon: '🔀',
    description:
      '找到两个单链表相交的起始节点。如果两个链表没有交点，返回 null。其他的算法复杂度太高，这个算法复杂度最低',
    steps: [
      '初始化两个指针pA和pB分别指向headA和headB',
      '同时向前移动两个指针',
      '当pA到达链表尾部时，将其重定位到headB',
      '当pB到达链表尾部时，将其重定位到headA',
      '当pA和pB相遇时，即为相交节点（若不相交，最终会同时为null）',
    ],
    scenarios: ['寻找两个链表的公共部分', '解决链表交叉问题', '内存共享检测'],
    complexity: {
      time: 'O(m+n)',
      space: 'O(1)',
    },
    code: `function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  if (headA === null || headB === null) return null;

  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }

  return pA;
}`,
  },
])

const activeAlgorithm = ref('reverse')

const activeAlgorithmData = computed(() => {
  return algorithms.value.find((a) => a.id === activeAlgorithm.value) || algorithms.value[0]
})

// 可视化数据
const listData = ref([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }])

const visualization = ref({
  stepIndex: 0,
  totalSteps: 5,
  activeIndex: 0,
  steps: [
    '初始化：prev = null, curr = 头节点',
    '第一步：保存next节点，将curr.next指向prev',
    '第二步：prev移动到curr位置，curr移动到next位置',
    '第三步：重复上述过程直到curr为null',
    '完成：prev成为新的头节点',
  ],
})

function nextStep() {
  if (visualization.value.stepIndex < visualization.value.totalSteps - 1) {
    visualization.value.stepIndex++
    visualization.value.activeIndex =
      visualization.value.stepIndex < listData.value.length
        ? visualization.value.stepIndex
        : listData.value.length - 1
  }
}

function prevStep() {
  if (visualization.value.stepIndex > 0) {
    visualization.value.stepIndex--
    visualization.value.activeIndex = visualization.value.stepIndex
  }
}
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #7209b7;
@success-color: #2ec4b6;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.linked-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-light;
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }
}

.complexity-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  .badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: fade(@primary-color, 10%);
    border-radius: 20px;
    font-size: 0.95rem;
    font-weight: 500;

    .icon {
      font-size: 1.2rem;
    }
  }
}

.algorithm-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;

  div {
    padding: 0.8rem 1.5rem;
    background-color: @light-bg;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    border: 1px solid @border-color;

    &:hover {
      background-color: darken(@light-bg, 3%);
    }

    &.active {
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-color: transparent;
      box-shadow: 0 4px 10px fade(@primary-color, 30%);
    }
  }
}

.algorithm-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.algorithm-info {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  .algorithm-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    .icon {
      font-size: 2rem;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      margin: 0;
      font-size: 1.8rem;
    }
  }

  h3 {
    color: @primary-color;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  .algorithm-description p {
    line-height: 1.7;
  }

  .algorithm-steps {
    ol {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
        padding-left: 0.5rem;
      }
    }
  }

  .algorithm-scenarios {
    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.6rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: @primary-color;
          font-size: 1.5rem;
          line-height: 1;
        }
      }
    }
  }
}

.algorithm-code {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  pre {
    background-color: #2d2d2d;
    border-radius: 8px;
    padding: 1.5rem;
    overflow-x: auto;
    font-family: 'Fira Code', 'Courier New', monospace;

    code {
      color: #f8f8f2;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }

  .complexity-analysis {
    margin-top: 1.5rem;

    h3 {
      color: @primary-color;
      margin-bottom: 1rem;
    }

    .complexity {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      .metric {
        background-color: fade(@success-color, 10%);
        border-radius: 8px;
        padding: 1rem;
        text-align: center;

        .label {
          display: block;
          font-size: 0.9rem;
          color: @text-light;
          margin-bottom: 0.3rem;
        }

        .value {
          display: block;
          font-size: 1.3rem;
          font-weight: 700;
          color: @success-color;
        }
      }
    }
  }
}

.visualization {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  margin-bottom: 2rem;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .linked-list-visual {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    min-height: 120px;
    margin-bottom: 1.5rem;

    .list-node {
      display: flex;
      align-items: center;
      position: relative;

      .node-value {
        width: 50px;
        height: 50px;
        background-color: #f0f4ff;
        border: 2px solid @primary-color;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 2;
      }

      .node-pointer {
        position: relative;
        display: flex;
        align-items: center;
        margin-left: 0.5rem;

        .pointer-line {
          width: 30px;
          height: 2px;
          background-color: @text-light;
        }

        .pointer-arrow {
          color: @text-light;
          margin-left: -5px;
        }
      }

      &.active .node-value {
        background-color: lighten(@primary-color, 40%);
        transform: scale(1.1);
        box-shadow: 0 0 10px fade(@primary-color, 50%);
      }

      &.head .node-value::before {
        content: '头';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.8rem;
        color: @text-light;
      }

      &.tail .node-value::before {
        content: '尾';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.8rem;
        color: @text-light;
      }
    }
  }

  .visual-controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    button {
      padding: 0.5rem 1.5rem;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border: none;
      border-radius: 30px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:disabled {
        background: @light-bg;
        color: @text-light;
        cursor: not-allowed;
        opacity: 0.6;
      }

      &:not(:disabled):hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px fade(@primary-color, 30%);
      }
    }
  }

  .visual-description {
    background-color: fade(@success-color, 10%);
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    font-style: italic;
    border-left: 3px solid @success-color;
  }
}

.applications {
  margin-bottom: 2rem;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .application-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .app-card {
      background-color: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.8rem;
        color: @text-dark;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }
}

.practice-section {
  background: linear-gradient(135deg, #f8f9ff, #eef0ff);
  border-radius: 12px;
  padding: 2rem;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .practice-tips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .tip {
      display: flex;
      align-items: flex-start;
      gap: 1rem;

      .number {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5;
      }
    }
  }
}

@media (max-width: 768px) {
  .linked-list-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .algorithm-details {
    grid-template-columns: 1fr;
  }

  .linked-list-visual {
    gap: 0.5rem !important;

    .node-pointer {
      margin-left: 0.2rem !important;

      .pointer-line {
        width: 15px !important;
      }
    }
  }
}
</style>
