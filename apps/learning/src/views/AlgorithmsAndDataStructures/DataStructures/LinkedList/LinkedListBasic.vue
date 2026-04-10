<template>
  <div class="linked-list-container">
    <!-- 头部介绍区域 -->
    <div class="header">
      <div class="header-content">
        <h1>链表数据结构</h1>
        <p>动态存储的线性数据结构</p>
        <div class="list-visualization">
          <div class="linked-list">
            <div class="node" v-for="(node, index) in nodes" :key="index" :style="nodeStyle(index)">
              <div class="node-value">{{ node.value }}</div>
              <div class="next-pointer" v-if="index !== nodes.length - 1">
                <div class="pointer-line"></div>
                <div class="pointer-arrow">→</div>
              </div>
            </div>
          </div>
          <div class="list-controls">
            <button @click="insertNode">插入节点</button>
            <button @click="deleteNode">删除节点</button>
            <button @click="reverseList">反转链表</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 链表概念介绍 -->
    <div class="section concepts">
      <div class="section-header">
        <div class="icon">📝</div>
        <h2>链表基本概念</h2>
      </div>
      <div class="content">
        <div class="concept-cards">
          <div class="concept-card">
            <div class="card-icon">🔗</div>
            <h3>什么是链表？</h3>
            <p>链表是一种线性数据结构，其中的元素称为节点。每个节点包含两部分：</p>
            <ul>
              <li><strong>数据域</strong> - 存储实际数据</li>
              <li><strong>指针域</strong> - 存储下一个节点的地址</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon">📚</div>
            <h3>链表 vs 数组</h3>
            <table>
              <tr>
                <th>特性</th>
                <th>链表</th>
                <th>数组</th>
              </tr>
              <tr>
                <td>内存分配</td>
                <td>动态</td>
                <td>静态</td>
              </tr>
              <tr>
                <td>插入/删除效率</td>
                <td>O(1)</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>随机访问</td>
                <td>不支持</td>
                <td>支持</td>
              </tr>
              <tr>
                <td>内存使用</td>
                <td>指针额外空间</td>
                <td>连续空间</td>
              </tr>
            </table>
          </div>

          <div class="concept-card">
            <div class="card-icon">⚙️</div>
            <h3>链表核心操作</h3>
            <div class="operations">
              <div class="op">
                <div class="op-icon">➕</div>
                <div>插入节点</div>
              </div>
              <div class="op">
                <div class="op-icon">➖</div>
                <div>删除节点</div>
              </div>
              <div class="op">
                <div class="op-icon">🔍</div>
                <div>查找节点</div>
              </div>
              <div class="op">
                <div class="op-icon">🔄</div>
                <div>遍历链表</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 链表分类 -->
    <div class="section types">
      <div class="section-header">
        <div class="icon">📊</div>
        <h2>链表分类</h2>
      </div>
      <div class="content">
        <div class="list-types">
          <div class="list-type">
            <div class="type-header">
              <div class="type-icon">1️⃣</div>
              <h3>单链表</h3>
            </div>
            <div class="type-diagram">
              <div class="diagram-node">Head</div>
              <div class="arrow">→</div>
              <div class="diagram-node">5</div>
              <div class="arrow">→</div>
              <div class="diagram-node">8</div>
              <div class="arrow">→</div>
              <div class="diagram-node">3</div>
              <div class="arrow">→</div>
              <div class="diagram-node">null</div>
            </div>
            <div class="type-desc">
              <p>每个节点包含一个指向下一个节点的指针，最后一个节点指向 null</p>
              <ul>
                <li>简单高效</li>
                <li>单向遍历</li>
                <li>内存开销小</li>
              </ul>
            </div>
          </div>

          <div class="list-type">
            <div class="type-header">
              <div class="type-icon">2️⃣</div>
              <h3>双向链表</h3>
            </div>
            <div class="type-diagram">
              <div class="diagram-node">Head</div>
              <div class="double-arrow">⇄</div>
              <div class="diagram-node">5</div>
              <div class="double-arrow">⇄</div>
              <div class="diagram-node">8</div>
              <div class="double-arrow">⇄</div>
              <div class="diagram-node">3</div>
              <div class="double-arrow">⇄</div>
              <div class="diagram-node">null</div>
            </div>
            <div class="type-desc">
              <p>每个节点包含两个指针，分别指向前一个和后一个节点</p>
              <ul>
                <li>支持双向遍历</li>
                <li>插入/删除更高效</li>
                <li>需要额外内存存储前驱指针</li>
              </ul>
            </div>
          </div>

          <div class="list-type">
            <div class="type-header">
              <div class="type-icon">🔁</div>
              <h3>循环链表</h3>
            </div>
            <div class="type-diagram">
              <div class="diagram-node">Head</div>
              <div class="arrow">→</div>
              <div class="diagram-node">5</div>
              <div class="arrow">→</div>
              <div class="diagram-node">8</div>
              <div class="arrow">→</div>
              <div class="diagram-node">3</div>
              <div class="arrow">→</div>
              <div class="diagram-node">Head</div>
            </div>
            <div class="type-desc">
              <p>尾节点指向头节点，形成一个闭环</p>
              <ul>
                <li>没有 null 指针</li>
                <li>适合环形数据结构</li>
                <li>需要特殊处理边界条件</li>
              </ul>
            </div>
          </div>

          <div class="list-type">
            <div class="type-header">
              <div class="type-icon">🔁</div>
              <h3>回文链表</h3>
            </div>
            <div class="type-diagram">
              <div class="diagram-node">Head</div>
              <div class="arrow">→</div>
              <div class="diagram-node">5</div>
              <div class="arrow">→</div>
              <div class="diagram-node">8</div>
              <div class="arrow">→</div>
              <div class="diagram-node">8</div>
              <div class="arrow">→</div>
              <div class="diagram-node">5</div>
              <div class="arrow">→</div>
              <div class="diagram-node">Head</div>
            </div>
            <div class="type-desc">
              <p>回文链表是指链表中的元素从前往后和从后往前读都是一样的</p>
              <ul>
                <li>需要反转链表后半部分</li>
                <li>然后比较前半部分和后半部分</li>
                <li>需要额外空间存储后半部分</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 应用场景 -->
    <div class="section applications">
      <div class="section-header">
        <div class="icon">🚀</div>
        <h2>链表应用场景</h2>
      </div>
      <div class="content">
        <div class="app-grid">
          <div class="app-card">
            <div class="app-icon">📋</div>
            <h3>实现栈和队列</h3>
            <p>链表可以高效实现栈(LIFO)和队列(FIFO)结构，支持O(1)时间的插入和删除操作</p>
          </div>

          <div class="app-card">
            <div class="app-icon">🖼️</div>
            <h3>图像处理</h3>
            <p>图像中的多边形通常用链表表示，每个节点存储一个顶点坐标</p>
          </div>

          <div class="app-card">
            <div class="app-icon">🗃️</div>
            <h3>内存管理</h3>
            <p>操作系统使用链表管理空闲内存块和已分配内存块</p>
          </div>

          <div class="app-card">
            <div class="app-icon">🌐</div>
            <h3>浏览器历史记录</h3>
            <p>浏览器的前进后退功能通常使用双向链表实现</p>
          </div>

          <div class="app-card">
            <div class="app-icon">🎵</div>
            <h3>音乐播放列表</h3>
            <p>音乐播放器的播放列表通常用链表实现，支持动态添加和删除歌曲</p>
          </div>

          <div class="app-card">
            <div class="app-icon">🧾</div>
            <h3>哈希表冲突解决</h3>
            <p>哈希表中使用链表解决哈希冲突（链表法）</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 链表算法 -->
    <div class="section algorithms">
      <div class="section-header">
        <div class="icon">🧠</div>
        <h2>链表经典算法</h2>
      </div>
      <div class="content">
        <div class="algorithm-cols">
          <div class="algorithm">
            <h3>反转链表</h3>
            <p>将链表中的节点顺序完全反转</p>
            <div class="code-block">
              <pre>
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    // 保存下一个节点
    const next = curr.next;
    // 反转当前节点指针
    curr.next = prev;
    // 移动指针
    prev = curr;
    curr = next;
  }

  return prev;
}</pre
              >
            </div>
            <div class="complexity">
              <div class="complexity-item">
                <div class="complexity-icon">⏱️</div>
                <div>时间复杂度: O(n)</div>
              </div>
              <div class="complexity-item">
                <div class="complexity-icon">💾</div>
                <div>空间复杂度: O(1)</div>
              </div>
            </div>
          </div>

          <div class="algorithm">
            <h3>检测链表是否有环</h3>
            <p>判断链表中是否存在环（循环链表）</p>
            <div class="code-block">
              <pre>
function hasCycle(head) {
  // 快慢指针初始化指向head
  let slow = head;
  let fast = head;

  // 快指针走到末尾时停止
  while (fast && fast.next) {
    // 慢指针走一步，快指针走两步
    slow = slow.next;
    fast = fast.next.next;

    // 快慢指针相遇，说明有环
    if (slow === fast) return true;
  }

  // 无环
  return false;
}</pre
              >
            </div>
            <div class="complexity">
              <div class="complexity-item">
                <div class="complexity-icon">⏱️</div>
                <div>时间复杂度: O(n)</div>
              </div>
              <div class="complexity-item">
                <div class="complexity-icon">💾</div>
                <div>空间复杂度: O(1)</div>
              </div>
            </div>
          </div>

          <div class="algorithm">
            <h3>合并两个有序链表</h3>
            <p>将两个升序链表合并为一个新的升序链表</p>
            <div class="code-block">
              <pre>
function mergeTwoLists(l1, l2) {
  // 创建一个哨兵节点
  const dummy = new ListNode(-1);
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  // 连接剩余部分
  curr.next = l1 ? l1 : l2;

  return dummy.next;
}</pre
              >
            </div>
            <div class="complexity">
              <div class="complexity-item">
                <div class="complexity-icon">⏱️</div>
                <div>时间复杂度: O(n+m)</div>
              </div>
              <div class="complexity-item">
                <div class="complexity-icon">💾</div>
                <div>空间复杂度: O(1)</div>
              </div>
            </div>
          </div>

          <div class="algorithm">
            <h3>删除倒数第N个节点</h3>
            <p>删除链表的倒数第N个节点</p>
            <div class="code-block">
              <pre>
function removeNthFromEnd(head, n) {
  // 创建哨兵节点
  const dummy = new ListNode(0);
  dummy.next = head;

  let slow = dummy;
  let fast = dummy;

  // 快指针先走n+1步
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // 快慢指针同步移动
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  // 删除指定节点
  slow.next = slow.next.next;

  return dummy.next;
}</pre
              >
            </div>
            <div class="complexity">
              <div class="complexity-item">
                <div class="complexity-icon">⏱️</div>
                <div>时间复杂度: O(n)</div>
              </div>
              <div class="complexity-item">
                <div class="complexity-icon">💾</div>
                <div>空间复杂度: O(1)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优缺点总结 -->
    <div class="section summary">
      <div class="section-header">
        <div class="icon">💎</div>
        <h2>链表总结</h2>
      </div>
      <div class="content">
        <div class="summary-grid">
          <div class="pros">
            <h3>链表优点</h3>
            <ul>
              <li>动态内存分配，无需预先知道数据大小</li>
              <li>高效的插入和删除操作(O(1))</li>
              <li>内存利用率高 - 按需分配</li>
              <li>扩展简单，容易实现其他数据结构（栈、队列）</li>
              <li>不会产生内存碎片</li>
            </ul>
          </div>

          <div class="cons">
            <h3>链表缺点</h3>
            <ul>
              <li>不支持随机访问，查找效率低(O(n))</li>
              <li>额外的内存空间存储指针</li>
              <li>缓存不友好（内存不连续）</li>
              <li>实现相对复杂，容易产生内存泄漏</li>
              <li>反向遍历困难（单链表）</li>
            </ul>
          </div>
        </div>

        <div class="key-insight">
          <div class="lightbulb">💡</div>
          <p>
            <strong>何时选择链表：</strong>
            当需要频繁插入/删除元素且数据量不确定时，链表是理想选择。<br />
            <strong>何时选择数组：</strong> 当需要频繁随机访问元素且数据量固定时，数组效率更高。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 链表节点类型定义
interface ListNode {
  value: number
  next?: ListNode
}

// 链表节点数据
const nodes = ref<ListNode[]>([
  { value: 5 },
  { value: 8 },
  { value: 3 },
  { value: 12 },
  { value: 7 },
])

// 节点样式
const nodeStyle = (index: number) => {
  const colors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  return {
    '--node-color': colors[index % colors.length],
  }
}

// 插入节点
const insertNode = () => {
  const newValue = Math.floor(Math.random() * 50) + 1
  const insertIndex = Math.floor(Math.random() * (nodes.value.length + 1))

  nodes.value.splice(insertIndex, 0, { value: newValue })
}

// 删除节点
const deleteNode = () => {
  if (nodes.value.length <= 1) return

  const deleteIndex = Math.floor(Math.random() * nodes.value.length)
  nodes.value.splice(deleteIndex, 1)
}

// 反转链表
const reverseList = () => {
  nodes.value = [...nodes.value].reverse()
}
</script>

<style lang="less" scoped>
@indigo-50: #f8fafc;
@primary-color: #6366f1;
@indigo-700: #4f46e5;
@indigo-500: #6366f1;
@indigo-300: #a5b4fc;
@indigo-100: #e0e7ff;
@green-500: #10b981;
@amber-500: #f59e0b;
@red-500: #ef4444;
@violet-500: #8b5cf6;
@pink-500: #ec4899;
@teal-500: #14b8a6;
@background-light: #f8fafc;
@text-dark: #1e293b;
@text-light: #64748b;
@border-radius: 12px;
@box-shadow:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -4px rgba(0, 0, 0, 0.1);

.linked-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: @text-dark;
  line-height: 1.6;
  background-color: @background-light;
}

.header {
  margin-bottom: 2.5rem;

  .header-content {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, lighten(@indigo-500, 35%), @indigo-100);
    border-radius: @border-radius;
    box-shadow: @box-shadow;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, darken(@indigo-500, 10%), @indigo-700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.3rem;
      color: @indigo-700;
      margin-bottom: 1.5rem;
    }
  }

  .list-visualization {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    .linked-list {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.7);
      border-radius: @border-radius;
      border: 2px dashed @indigo-300;

      .node {
        position: relative;
        display: flex;
        align-items: center;

        .node-value {
          width: 60px;
          height: 60px;
          background-color: var(--node-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 600;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 2;
          transition: all 0.3s ease;
        }

        .next-pointer {
          position: relative;
          width: 60px;
          height: 4px;
          background-color: @text-light;

          .pointer-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: @indigo-500;
          }

          .pointer-arrow {
            position: absolute;
            top: -10px;
            right: -5px;
            font-size: 1.5rem;
            color: @indigo-500;
          }
        }
      }
    }

    .list-controls {
      display: flex;
      gap: 1rem;

      button {
        padding: 0.75rem 1.5rem;
        background: @indigo-500;
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        &:hover {
          background: @indigo-700;
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }

        &:active {
          transform: translateY(1px);
        }
      }
    }
  }
}

.section {
  background: white;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  margin-bottom: 2.5rem;
  overflow: hidden;
  border: 1px solid @indigo-300;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.25rem 1.75rem;
    background: linear-gradient(135deg, @indigo-500, darken(@indigo-500, 10%));

    .icon {
      font-size: 1.75rem;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      color: white;
      background: rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      justify-content: center;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
    }
  }

  .content {
    padding: 2rem;
  }

  &.concepts {
    .concept-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .concept-card {
        background: @indigo-50;
        border-radius: @border-radius;
        padding: 1.75rem;
        border-top: 3px solid @indigo-500;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1.25rem;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: @indigo-700;
        }

        p {
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;

          th,
          td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
          }

          th {
            background-color: @indigo-100;
            color: @indigo-700;
            font-weight: 600;
          }

          tr:last-child td {
            border-bottom: none;
          }
        }

        .operations {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1rem;

          .op {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid @indigo-300;

            .op-icon {
              font-size: 1.8rem;
              margin-bottom: 0.5rem;
            }
          }
        }
      }
    }
  }

  &.types {
    .list-types {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.75rem;

      .list-type {
        background: @indigo-50;
        border-radius: @border-radius;
        padding: 1.75rem;
        border-top: 3px solid @indigo-500;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .type-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;

          .type-icon {
            font-size: 1.75rem;
            margin-right: 0.75rem;
          }

          h3 {
            margin: 0;
            font-size: 1.4rem;
            color: @indigo-700;
          }
        }

        .type-diagram {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          border: 1px solid @indigo-300;

          .diagram-node {
            padding: 0.75rem 1.25rem;
            background: @indigo-500;
            color: white;
            border-radius: 30px;
            font-weight: 600;
          }

          .arrow {
            color: @indigo-700;
            font-size: 1.5rem;
          }

          .double-arrow {
            color: @indigo-700;
            font-size: 1.5rem;
          }
        }

        .type-desc {
          p {
            font-weight: 500;
            margin-bottom: 0.75rem;
          }

          ul {
            padding-left: 1.5rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              position: relative;
              padding-left: 1.5rem;

              &:before {
                content: '•';
                position: absolute;
                left: 0;
                color: @indigo-500;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }

  &.applications {
    .app-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .app-card {
        background: white;
        border-radius: @border-radius;
        padding: 1.75rem;
        text-align: center;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-color: @indigo-300;
        }

        .app-icon {
          font-size: 2.5rem;
          margin-bottom: 1.25rem;
          color: @indigo-500;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: @indigo-700;
        }

        p {
          color: @text-light;
          margin-bottom: 0;
          font-size: 0.95rem;
        }
      }
    }
  }

  &.algorithms {
    .algorithm-cols {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .algorithm {
        background: @indigo-50;
        border-radius: @border-radius;
        padding: 1.75rem;
        border-left: 4px solid @indigo-500;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        h3 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: @indigo-700;
          font-size: 1.45rem;
        }

        p {
          color: @text-light;
          margin-bottom: 1.25rem;
        }

        .code-block {
          background: #1e293b;
          border-radius: 8px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;

          pre {
            margin: 0;
            font-family: 'Fira Code', monospace;
            font-size: 0.95rem;
            color: #e2e8f0;
            line-height: 1.6;
          }
        }

        .complexity {
          display: flex;
          gap: 1.5rem;

          .complexity-item {
            display: flex;
            align-items: center;
            background: white;
            padding: 0.8rem;
            border-radius: 8px;
            border-left: 3px solid @indigo-500;

            .complexity-icon {
              font-size: 1.25rem;
              margin-right: 0.75rem;
              color: @indigo-500;
            }
          }
        }
      }
    }
  }

  &.summary {
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;

      .pros,
      .cons {
        background: white;
        border-radius: @border-radius;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: @indigo-700;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid @indigo-300;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 0.75rem;
            position: relative;
            padding-left: 1.75rem;

            &:before {
              content: '•';
              position: absolute;
              left: 0;
              color: @indigo-500;
              font-size: 1.5rem;
              line-height: 1;
            }
          }
        }
      }

      .pros {
        border-top: 4px solid @green-500;
      }

      .cons {
        border-top: 4px solid @red-500;
      }
    }

    .key-insight {
      background: linear-gradient(135deg, @indigo-100, lighten(@indigo-100, 2%));
      padding: 1.5rem;
      border-radius: @border-radius;
      display: flex;
      border-left: 4px solid @indigo-500;

      .lightbulb {
        font-size: 2rem;
        margin-right: 1.25rem;
        color: @amber-500;
      }

      p {
        margin: 0;
        font-size: 1.1rem;
        color: @text-dark;
        line-height: 1.7;

        strong {
          color: @indigo-700;
          font-weight: 600;
        }
      }
    }
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header {
    .header-content {
      padding: 1.5rem;

      h1 {
        font-size: 2.2rem;
      }

      p {
        font-size: 1.1rem;
      }
    }

    .list-visualization {
      .linked-list {
        padding: 1rem;

        .node {
          .node-value {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }

          .next-pointer {
            width: 40px;
          }
        }
      }

      .list-controls {
        flex-wrap: wrap;

        button {
          flex: 1;
          min-width: 140px;
        }
      }
    }
  }

  .section {
    .content {
      padding: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
  .header {
    .header-content {
      padding: 1.25rem;

      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }
    }

    .list-visualization {
      .linked-list {
        gap: 0.5rem;
        padding: 0.75rem;

        .node {
          .node-value {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .next-pointer {
            width: 30px;
            height: 3px;

            .pointer-arrow {
              top: -8px;
              right: -4px;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }

  .section {
    .section-header {
      padding: 1rem;
      flex-direction: column;
      text-align: center;

      .icon {
        margin-right: 0;
        margin-bottom: 0.75rem;
      }
    }
  }

  .section.algorithms .algorithm-cols {
    grid-template-columns: 1fr;
  }
}
</style>
