<template>
  <div class="linked-list-container">
    <header class="header">
      <h1>链表相关算法</h1>
      <p class="subtitle">常用算法原理与实现思路详解</p>
    </header>

    <div class="search-box">
      <input type="text" v-model="searchTerm" placeholder="搜索链表算法..." class="search-input" />
      <button class="search-btn">
        <i class="icon-search"></i>
      </button>
    </div>

    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-value">{{ algorithms.length }}</span>
        <span class="stat-label">种算法</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">12</span>
        <span class="stat-label">常见问题</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">8</span>
        <span class="stat-label">核心技巧</span>
      </div>
    </div>

    <div class="algorithm-list">
      <div
        v-for="(algo, index) in filteredAlgorithms"
        :key="algo.id"
        class="algorithm-card"
        :class="{ featured: index < 3 }"
      >
        <div class="card-header">
          <div class="algorithm-rank">{{ index + 1 }}</div>
          <h2 class="algorithm-title">{{ algo.title }}</h2>
          <div class="difficulty" :class="algo.difficulty">
            {{ algo.difficulty }}
          </div>
        </div>

        <div class="algorithm-description">
          <p>{{ algo.description }}</p>
        </div>

        <div class="algorithm-details">
          <div class="detail-item">
            <span class="detail-label">时间复杂度:</span>
            <span class="detail-value">{{ algo.timeComplexity }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">空间复杂度:</span>
            <span class="detail-value">{{ algo.spaceComplexity }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">核心思路:</span>
            <span class="detail-value">{{ algo.coreIdea }}</span>
          </div>
        </div>

        <div class="algorithm-code">
          <pre>{{ algo.codeSnippet }}</pre>
        </div>

        <div class="algorithm-tags">
          <span v-for="tag in algo.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>链表算法总结 © 2023 | 前端开发与算法学习</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Algorithm {
  id: number
  title: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  coreIdea: string
  codeSnippet: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
}

const searchTerm = ref('')

const algorithms = ref<Algorithm[]>([
  {
    id: 1,
    title: '反转链表',
    description: '将链表中的节点顺序反转，使尾节点成为头节点',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    coreIdea: '使用三个指针（prev, current, next）遍历链表并改变指向',
    codeSnippet: `function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    difficulty: 'easy',
    tags: ['双指针', '基础操作'],
  },
  {
    id: 2,
    title: '合并两个有序链表',
    description: '将两个升序链表合并为一个新的升序链表',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(1)',
    coreIdea: '使用虚拟头节点，比较两个链表节点大小，逐个连接',
    codeSnippet: `function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(-1);
  let current = dummy;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  current.next = l1 || l2;
  return dummy.next;
}`,
    difficulty: 'easy',
    tags: ['双指针', '归并'],
  },
  {
    id: 3,
    title: '链表的中间结点',
    description: '找到链表的中间节点，如果有两个中间节点则返回第二个',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    coreIdea: '使用快慢指针，快指针每次走两步，慢指针每次走一步',
    codeSnippet: `function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
    difficulty: 'easy',
    tags: ['快慢指针'],
  },
  {
    id: 4,
    title: '删除链表的倒数第N个结点',
    description: '删除链表的倒数第n个节点并返回头节点',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    coreIdea: '使用快慢指针，快指针先走n步，然后快慢指针一起移动',
    codeSnippet: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let slow = dummy;
  let fast = dummy;

  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
}`,
    difficulty: 'medium',
    tags: ['双指针', '虚拟头节点'],
  },
  {
    id: 5,
    title: '环形链表检测',
    description: '判断链表中是否存在环',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    coreIdea: 'Floyd判圈算法（龟兔赛跑），快指针每次走两步，慢指针走一步',
    codeSnippet: `function hasCycle(head) {
  if (!head) return false;

  let slow = head;
  let fast = head.next;

  while (fast && fast.next) {
    if (slow === fast) return true;
    slow = slow.next;
    fast = fast.next.next;
  }

  return false;
}`,
    difficulty: 'easy',
    tags: ['快慢指针', 'Floyd算法'],
  },
  {
    id: 6,
    title: '环形链表入口点',
    description: '如果链表有环，找到环的入口节点',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    coreIdea: '先使用快慢指针找到相遇点，然后一个指针从头开始，另一个从相遇点开始',
    codeSnippet: `function detectCycle(head) {
  if (!head) return null;

  let slow = head;
  let fast = head;
  let hasCycle = false;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }

  if (!hasCycle) return null;

  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}`,
    difficulty: 'medium',
    tags: ['快慢指针', 'Floyd算法'],
  },
  {
    id: 7,
    title: '相交链表',
    description: '找到两个链表相交的起始节点',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(1)',
    coreIdea: '双指针分别遍历两个链表，到达尾部后交换到另一个链表头部',
    codeSnippet: `function getIntersectionNode(headA, headB) {
  let pA = headA;
  let pB = headB;

  while (pA !== pB) {
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }

  return pA;
}`,
    difficulty: 'easy',
    tags: ['双指针', '链表遍历'],
  },
  {
    id: 8,
    title: '回文链表',
    description: '判断链表是否为回文结构',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    coreIdea: '找到中点，反转后半部分，然后比较前后两部分',
    codeSnippet: `function isPalindrome(head) {
  // 找到中点
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 反转后半部分
  let prev = null;
  while (slow) {
    const next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  // 比较两部分
  let left = head;
  let right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
}`,
    difficulty: 'medium',
    tags: ['快慢指针', '链表反转'],
  },
  {
    id: 9,
    title: '链表排序',
    description: '在O(n log n)时间复杂度和常数级空间复杂度下对链表进行排序',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    coreIdea: '使用归并排序，先分割链表再合并',
    codeSnippet: `function sortList(head) {
  if (!head || !head.next) return head;

  // 分割链表
  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const mid = slow.next;
  slow.next = null;

  // 递归排序
  const left = sortList(head);
  const right = sortList(mid);

  // 合并有序链表
  return merge(left, right);
}

function merge(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;
  return dummy.next;
}`,
    difficulty: 'medium',
    tags: ['归并排序', '递归'],
  },
  {
    id: 10,
    title: '旋转链表',
    description: '将链表每个节点向右移动k个位置',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    coreIdea: '先成环，然后找到新的头节点并断开',
    codeSnippet: `function rotateRight(head, k) {
  if (!head || k === 0) return head;

  // 计算链表长度并成环
  let len = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    len++;
  }
  tail.next = head;

  // 计算实际需要移动的步数
  const steps = len - (k % len);

  // 找到新的尾节点并断开
  let newTail = head;
  for (let i = 0; i < steps - 1; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}`,
    difficulty: 'medium',
    tags: ['链表成环', '链表遍历'],
  },
])

const filteredAlgorithms = computed(() => {
  if (!searchTerm.value) return algorithms.value
  const term = searchTerm.value.toLowerCase()
  return algorithms.value.filter(
    (algo) =>
      algo.title.toLowerCase().includes(term) ||
      algo.description.toLowerCase().includes(term) ||
      algo.tags.some((tag) => tag.toLowerCase().includes(term)),
  )
})
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@text-lighter: #999;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.linked-list-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7ff;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @secondary-color;
    margin: 0;
    font-size: 2.5rem;
  }

  .subtitle {
    color: @text-light;
    font-size: 1.1rem;
    margin-top: 10px;
  }
}

.search-box {
  display: flex;
  margin-bottom: 25px;
  max-width: 600px;
  margin: 0 auto 30px;

  .search-input {
    flex: 1;
    padding: 12px 20px;
    border: 2px solid @primary-color;
    border-radius: 30px 0 0 30px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: @secondary-color;
    }
  }

  .search-btn {
    padding: 12px 25px;
    background: @primary-color;
    color: white;
    border: none;
    border-radius: 0 30px 30px 0;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: darken(@primary-color, 10%);
    }

    .icon-search {
      font-size: 18px;
    }
  }
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;

  .stat-item {
    text-align: center;
    padding: 15px 25px;
    background: @card-bg;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-width: 120px;

    .stat-value {
      display: block;
      font-size: 2rem;
      font-weight: bold;
      color: @primary-color;
      margin-bottom: 5px;
    }

    .stat-label {
      color: @text-light;
      font-size: 0.9rem;
    }
  }
}

.algorithm-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.algorithm-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 25px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  border-left: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  &.featured {
    position: relative;
    overflow: hidden;

    &::before {
      content: '常考';
      position: absolute;
      top: 15px;
      right: -30px;
      background: @accent-color;
      color: white;
      padding: 3px 35px;
      font-size: 0.8rem;
      transform: rotate(45deg);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  .algorithm-rank {
    background: @primary-color;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }

  .algorithm-title {
    margin: 0;
    font-size: 1.6rem;
    color: @text-color;
    flex: 1;
  }

  .difficulty {
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;

    &.easy {
      background: fade(@success-color, 15%);
      color: darken(@success-color, 15%);
    }

    &.medium {
      background: fade(@warning-color, 15%);
      color: darken(@warning-color, 15%);
    }

    &.hard {
      background: fade(@danger-color, 15%);
      color: darken(@danger-color, 15%);
    }
  }
}

.algorithm-description {
  color: @text-light;
  line-height: 1.6;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid @border-color;
}

.algorithm-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;

  .detail-item {
    display: flex;
    align-items: center;

    .detail-label {
      font-weight: 600;
      color: @text-color;
      margin-right: 8px;
      min-width: 90px;
    }

    .detail-value {
      color: @text-light;
    }
  }
}

.algorithm-code {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;

  pre {
    margin: 0;
  }
}

.algorithm-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .tag {
    background: fade(@primary-color, 10%);
    color: @primary-color;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px 0;
  color: @text-lighter;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

@media (max-width: 768px) {
  .stats-bar {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .algorithm-details {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;

    .algorithm-rank {
      margin-bottom: 10px;
    }

    .difficulty {
      margin-top: 10px;
    }
  }
}
</style>
