<template>
  <div class="linked-list-reverse">
    <header>
      <h1>链表反转算法基本介绍</h1>
      <p>掌握链表操作的核心算法</p>
    </header>

    <main>
      <!-- 链表基础 -->
      <section class="linked-list-basic">
        <h2>链表基础</h2>
        <div class="content">
          <div class="definition">
            <p><strong>链表 (Linked List)</strong> 是一种线性数据结构，由一系列节点组成，每个节点包含数据和指向下一个节点的指针。</p>
            <div class="types">
              <div class="type">
                <h3>单链表</h3>
                <div class="node-list">
                  <div class="node">1</div>
                  <div class="arrow">→</div>
                  <div class="node">2</div>
                  <div class="arrow">→</div>
                  <div class="node">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                </div>
              </div>
              <div class="type">
                <h3>双链表</h3>
                <div class="node-list">
                  <div class="arrow">←</div>
                  <div class="node">1</div>
                  <div class="arrow">⇄</div>
                  <div class="node">2</div>
                  <div class="arrow">⇄</div>
                  <div class="node">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                </div>
              </div>
            </div>
          </div>

          <div class="node-structure">
            <h3>链表节点结构</h3>
            <div class="code-block">
              <pre><code>class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 反转算法 -->
      <section class="reverse-algorithm">
        <h2>链表反转算法</h2>
        <div class="algorithm-methods">
          <div class="method">
            <h3>1. 迭代反转法</h3>
            <div class="visualization">
              <div class="step">
                <div class="step-label">初始状态</div>
                <div class="node-list">
                  <div class="pointer prev">prev: null</div>
                  <div class="pointer curr">curr: 1</div>
                  <div class="node">1</div>
                  <div class="arrow">→</div>
                  <div class="node">2</div>
                  <div class="arrow">→</div>
                  <div class="node">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                </div>
              </div>
              <div class="step">
                <div class="step-label">第一步</div>
                <div class="node-list">
                  <div class="pointer prev">prev: 1</div>
                  <div class="pointer curr">curr: 2</div>
                  <div class="node reversed">1</div>
                  <div class="arrow reversed">←</div>
                  <div class="node">2</div>
                  <div class="arrow">→</div>
                  <div class="node">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                </div>
              </div>
              <div class="step">
                <div class="step-label">第二步</div>
                <div class="node-list">
                  <div class="pointer prev">prev: 2</div>
                  <div class="pointer curr">curr: 3</div>
                  <div class="node reversed">1</div>
                  <div class="arrow reversed">←</div>
                  <div class="node reversed">2</div>
                  <div class="arrow reversed">←</div>
                  <div class="node">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                </div>
              </div>
              <div class="step">
                <div class="step-label">完成</div>
                <div class="node-list">
                  <div class="pointer prev">prev: 3</div>
                  <div class="pointer curr">curr: null</div>
                  <div class="node reversed">1</div>
                  <div class="arrow reversed">←</div>
                  <div class="node reversed">2</div>
                  <div class="arrow reversed">←</div>
                  <div class="node reversed">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                </div>
              </div>
            </div>
            <div class="code-block">
              <pre><code>function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  while (curr !== null) {
    const nextTemp = curr.next; // 保存下一个节点
    curr.next = prev;  // 反转指针
    prev = curr;       // 移动prev
    curr = nextTemp;   // 移动curr
  }

  return prev; // prev成为新头节点
}</code></pre>
            </div>
          </div>

          <div class="method">
            <h3>2. 递归反转法</h3>
            <div class="visualization">
              <div class="step">
                <div class="step-label">递归深入</div>
                <div class="node-list">
                  <div class="node">1</div>
                  <div class="arrow">→</div>
                  <div class="node">2</div>
                  <div class="arrow">→</div>
                  <div class="node">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                  <div class="recursion">递归调用 reverse(2)</div>
                </div>
              </div>
              <div class="step">
                <div class="step-label">递归深入</div>
                <div class="node-list">
                  <div class="node">1</div>
                  <div class="arrow">→</div>
                  <div class="node">2</div>
                  <div class="arrow">→</div>
                  <div class="node">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                  <div class="recursion">递归调用 reverse(3)</div>
                </div>
              </div>
              <div class="step">
                <div class="step-label">递归返回</div>
                <div class="node-list">
                  <div class="node">1</div>
                  <div class="arrow">→</div>
                  <div class="node">2</div>
                  <div class="arrow reversed">←</div>
                  <div class="node reversed">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                  <div class="recursion">返回 reverse(3) = 3</div>
                </div>
              </div>
              <div class="step">
                <div class="step-label">递归返回</div>
                <div class="node-list">
                  <div class="node">1</div>
                  <div class="arrow reversed">←</div>
                  <div class="node reversed">2</div>
                  <div class="arrow reversed">←</div>
                  <div class="node reversed">3</div>
                  <div class="arrow">→</div>
                  <div class="node">null</div>
                  <div class="recursion">返回 reverse(2) = 3</div>
                </div>
              </div>
            </div>
            <div class="code-block">
              <pre><code>function reverseListRecursive(head: ListNode | null): ListNode | null {
  // 递归终止条件：空链表或只有一个节点
  if (head === null || head.next === null) {
    return head;
  }

  // 递归反转剩余链表
  const newHead = reverseListRecursive(head.next);

  // 反转当前节点
  head.next.next = head; // 将下一节点指向当前节点
  head.next = null;      // 断开原有连接

  return newHead; // 返回新头节点
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases">
        <h2>链表反转使用场景</h2>
        <div class="cases-grid">
          <div class="case">
            <div class="icon">🔍</div>
            <h3>回文链表检测</h3>
            <p>反转后半部分链表与前半部分比较</p>
            <pre><code>function isPalindrome(head: ListNode | null): boolean {
  // 1. 使用快慢指针找到中点
  // 2. 反转链表后半部分
  // 3. 比较前半部分和反转后的后半部分
  // 4. 恢复链表（可选）
}</code></pre>
          </div>

          <div class="case">
            <div class="icon">➕</div>
            <h3>两数相加</h3>
            <p>处理数字链表从低位到高位相加</p>
            <pre><code>function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  // 反转两个链表
  const r1 = reverseList(l1);
  const r2 = reverseList(l2);

  // 从高位开始相加
  // ...

  // 反转结果链表
  return reverseList(result);
}</code></pre>
          </div>

          <div class="case">
            <div class="icon">🔄</div>
            <h3>K个一组反转</h3>
            <p>每K个节点一组反转链表</p>
            <pre><code>function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // 1. 检查是否有K个节点
  // 2. 反转当前K个节点
  // 3. 递归处理后续链表
  // 4. 连接反转后的子链表
}</code></pre>
          </div>

          <div class="case">
            <div class="icon">📚</div>
            <h3>链表逆序输出</h3>
            <p>按从尾到头顺序输出链表元素</p>
            <pre><code>function printListReversingly(head: ListNode | null): void {
  // 反转链表
  const reversed = reverseList(head);

  // 顺序输出反转后的链表
  let current = reversed;
  while (current) {
    console.log(current.val);
    current = current.next;
  }

  // 恢复链表（可选）
  reverseList(reversed);
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 复杂度分析 -->
      <section class="complexity">
        <h2>算法复杂度分析</h2>
        <div class="complexity-table">
          <table>
            <thead>
              <tr>
                <th>方法</th>
                <th>时间复杂度</th>
                <th>空间复杂度</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>迭代法</td>
                <td>O(n)</td>
                <td>O(1)</td>
                <td>内存受限环境，长链表</td>
              </tr>
              <tr>
                <td>递归法</td>
                <td>O(n)</td>
                <td>O(n)</td>
                <td>代码简洁，短链表</td>
              </tr>
              <tr>
                <td>头插法</td>
                <td>O(n)</td>
                <td>O(1)</td>
                <td>原地反转，无额外空间</td>
              </tr>
              <tr>
                <td>栈方法</td>
                <td>O(n)</td>
                <td>O(n)</td>
                <td>简单实现，教学用途</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 反转演示 -->
      <section class="interactive-demo">
        <h2>链表反转演示</h2>
        <div class="demo-container">
          <div class="controls">
            <button @click="resetList">重置链表</button>
            <button @click="addNode">添加节点</button>
            <button @click="reverseIterative">迭代反转</button>
            <button @click="reverseRecursive">递归反转</button>
          </div>

          <div class="linked-list-display">
            <div class="list-original">
              <h3>原始链表</h3>
              <div class="node-list">
                <div v-for="(node, index) in listData" :key="'o' + index" class="node"
                  :class="{ active: currentIndex === index }">
                  {{ node.val }}
                  <span v-if="index < listData.length - 1" class="arrow">→</span>
                </div>
                <div class="node">null</div>
              </div>
            </div>

            <div class="list-reversed">
              <h3>反转后链表</h3>
              <div class="node-list">
                <div v-for="(node, index) in reversedData" :key="'r' + index" class="node reversed">
                  {{ node.val }}
                  <span v-if="index < reversedData.length - 1" class="arrow reversed">←</span>
                </div>
                <div class="node">null</div>
              </div>
            </div>
          </div>

          <div class="code-output">
            <h3>反转过程</h3>
            <pre>{{ reverseSteps }}</pre>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>© 2023 链表反转算法基本介绍 | 使用Vue3和TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 链表节点类
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 演示数据
const listData = ref<ListNode[]>([]);
const reversedData = ref<ListNode[]>([]);
const reverseSteps = ref<string[]>([]);
const currentIndex = ref(-1);

// 初始化链表
const initializeList = () => {
  listData.value = [
    new ListNode(1),
    new ListNode(2),
    new ListNode(3),
    new ListNode(4)
  ];

  // 设置next指针
  for (let i = 0; i < listData.value.length - 1; i++) {
    listData.value[i].next = listData.value[i + 1];
  }

  reversedData.value = [];
  reverseSteps.value = ['链表已初始化'];
  currentIndex.value = -1;
};

// 添加节点
const addNode = () => {
  const newValue = listData.value.length + 1;
  const newNode = new ListNode(newValue);

  if (listData.value.length > 0) {
    listData.value[listData.value.length - 1].next = newNode;
  }

  listData.value.push(newNode);
  reverseSteps.value.push(`添加节点: ${newValue}`);
};

// 重置链表
const resetList = () => {
  initializeList();
};

// 迭代反转链表
const reverseIterative = () => {
  reverseSteps.value = ['开始迭代反转...'];

  let prev: ListNode | null = null;
  let curr: ListNode | null = listData.value[0] || null;
  reversedData.value = [];

  let step = 0;
  const maxSteps = listData.value.length;

  const reverseStep = () => {
    if (step >= maxSteps || !curr) {
      // 反转完成，更新显示
      reversedData.value = [...listData.value].reverse();
      reverseSteps.value.push('反转完成!');
      return;
    }

    const nextTemp = curr.next;
    currentIndex.value = listData.value.findIndex(n => n === curr);

    // 记录步骤
    reverseSteps.value.push(`步骤 ${step + 1}:
      当前: ${curr.val},
      前驱: ${prev ? prev.val : 'null'},
      后继: ${nextTemp ? nextTemp.val : 'null'}`);

    // 反转指针
    curr.next = prev;
    prev = curr;
    curr = nextTemp;

    step++;
    setTimeout(reverseStep, 1000);
  };

  reverseStep();
};

// 递归反转链表
const reverseRecursive = () => {
  reverseSteps.value = ['开始递归反转...'];
  reversedData.value = [];
  currentIndex.value = -1;

  const reverse = (node: ListNode | null, depth: number): ListNode | null => {
    if (!node || !node.next) {
      reverseSteps.value.push(`递归终止，返回节点: ${node ? node.val : 'null'}`);
      return node;
    }

    reverseSteps.value.push(`递归深度 ${depth}: 处理节点 ${node.val}`);
    currentIndex.value = listData.value.findIndex(n => n === node);

    const newHead = reverse(node.next, depth + 1);

    // 反转指针
    node.next.next = node;
    node.next = null;

    reverseSteps.value.push(`回溯深度 ${depth}: 反转节点 ${node.val}`);

    return newHead;
  };

  const newHead = reverse(listData.value[0], 1);

  // 更新反转后的链表显示
  let current: ListNode | null = newHead;
  while (current) {
    reversedData.value.push(current);
    current = current.next;
  }

  reverseSteps.value.push('递归反转完成!');
};

// 初始化
initializeList();
</script>

<style lang="less" scoped>
@primary: #4361ee;
@secondary: #3a0ca3;
@accent: #4cc9f0;
@reverse-color: #f72585;
@light: #f8f9fa;
@dark: #212529;

// 基础样式
.linked-list-reverse {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: @dark;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: @secondary;
      background: linear-gradient(135deg, @secondary, @primary);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: lighten(@dark, 20%);
      font-size: 1.1rem;
    }
  }

  section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid @accent;
      color: @secondary;
    }
  }
}

// 链表基础部分
.linked-list-basic {
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .types {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;

    .type {
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;

      h3 {
        margin-top: 0;
        color: @primary;
        text-align: center;
      }
    }
  }

  .node-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .node {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: @light;
    border: 2px solid @primary;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .arrow {
    font-size: 1.5rem;
    color: @primary;
  }

  .code-block {
    background: #2d3748;
    border-radius: 8px;
    padding: 1.5rem;
    overflow: auto;
    margin-top: 1rem;

    pre {
      margin: 0;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }
}

// 反转算法部分
.reverse-algorithm {
  .algorithm-methods {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .method {
    h3 {
      color: @primary;
      margin-top: 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e9ecef;
    }
  }

  .visualization {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;

    .step {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;

      .step-label {
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: @primary;
        text-align: center;
      }
    }

    .node-list {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .node {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: @light;
      border: 2px solid @primary;
      border-radius: 50%;
      font-weight: bold;
      font-size: 1rem;

      &.reversed {
        border-color: @reverse-color;
        background: lighten(@reverse-color, 40%);
      }
    }

    .arrow {
      font-size: 1.2rem;
      color: @primary;

      &.reversed {
        color: @reverse-color;
      }
    }

    .pointer {
      padding: 0.3rem 0.5rem;
      background: @light;
      border: 1px dashed @accent;
      border-radius: 4px;
      font-size: 0.8rem;
      margin: 0 0.5rem;

      &.prev {
        background: lighten(@reverse-color, 40%);
        border-color: @reverse-color;
      }

      &.curr {
        background: lighten(@accent, 30%);
        border-color: @accent;
      }
    }

    .recursion {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: lighten(@accent, 30%);
      border: 1px solid @accent;
      border-radius: 4px;
      font-size: 0.9rem;
      text-align: center;
    }
  }

  .code-block {
    background: #2d3748;
    border-radius: 8px;
    padding: 1.5rem;
    overflow: auto;

    pre {
      margin: 0;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }
}

// 使用场景
.use-cases {
  .cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .case {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;

    .icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    h3 {
      text-align: center;
      color: @secondary;
      margin: 0.5rem 0;
    }

    p {
      text-align: center;
      color: lighten(@dark, 20%);
      margin-bottom: 1rem;
    }

    pre {
      background: #2d3748;
      border-radius: 6px;
      padding: 1rem;
      overflow: auto;
      margin: 0;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }
}

// 复杂度分析
.complexity {
  .complexity-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #e9ecef;
      }

      th {
        background: #f8f9fa;
        font-weight: 600;
      }

      tbody tr:hover {
        background-color: #f1f3f5;
      }
    }
  }
}

// 交互演示
.interactive-demo {
  .demo-container {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;

    button {
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 6px;
      background: @primary;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: darken(@primary, 10%);
        transform: translateY(-2px);
      }

      &:nth-child(3) {
        background: @reverse-color;

        &:hover {
          background: darken(@reverse-color, 10%);
        }
      }

      &:nth-child(4) {
        background: @accent;

        &:hover {
          background: darken(@accent, 10%);
        }
      }
    }
  }

  .linked-list-display {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .list-original,
  .list-reversed {
    h3 {
      text-align: center;
      color: @secondary;
      margin-bottom: 1rem;
    }
  }

  .node-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    min-height: 80px;
  }

  .node {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: @light;
    border: 2px solid @primary;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.2rem;
    position: relative;

    &.active {
      background: lighten(@accent, 30%);
      border-color: @accent;
      box-shadow: 0 0 10px fade(@accent, 50%);
    }

    &.reversed {
      border-color: @reverse-color;
      background: lighten(@reverse-color, 40%);
    }
  }

  .arrow {
    font-size: 1.2rem;
    color: @primary;
    margin: 0 0.5rem;

    &.reversed {
      color: @reverse-color;
    }
  }

  .code-output {
    background: #2d3748;
    border-radius: 8px;
    padding: 1.5rem;

    h3 {
      color: white;
      margin-top: 0;
    }

    pre {
      color: #cbd5e0;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      white-space: pre-wrap;
      margin: 0;
      min-height: 150px;
      max-height: 300px;
      overflow-y: auto;
    }
  }
}

// 页脚
footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  color: lighten(@dark, 30%);
  font-size: 0.9rem;
  border-top: 1px solid #e9ecef;
}
</style>
