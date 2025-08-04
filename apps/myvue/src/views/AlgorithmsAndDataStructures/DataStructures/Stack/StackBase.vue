<template>
  <div class="stack-container">
    <header>
      <h1>数据结构：栈（Stack）</h1>
      <p class="subtitle">后进先出（LIFO）原理与应用</p>
    </header>

    <div class="visualization-section">
      <div class="stack-visual">
        <div class="stack-base">栈底</div>
        <div v-for="(item, index) in stackItems" :key="index" class="stack-item" :style="{
          'background-color': itemColors[index % itemColors.length],
          'z-index': stackItems.length - index
        }">
          {{ item }}
        </div>
        <div class="stack-top">栈顶</div>
      </div>

      <div class="stack-controls">
        <button @click="pushItem" class="control-btn push-btn">
          <span class="btn-icon">+</span> Push (入栈)
        </button>
        <button @click="popItem" class="control-btn pop-btn">
          <span class="btn-icon">-</span> Pop (出栈)
        </button>
        <button @click="resetStack" class="control-btn reset-btn">
          <span class="btn-icon">↺</span> 重置
        </button>
      </div>
    </div>

    <div class="content-grid">
      <!-- 基本概念部分 -->
      <section class="section">
        <h2>栈的基本概念</h2>

        <div class="concept-card">
          <h3>定义</h3>
          <p>栈（Stack）是一种<strong>后进先出</strong>（LIFO: Last In First Out）的线性数据结构。只能在一端（称为栈顶）进行插入（入栈）和删除（出栈）操作。</p>
        </div>

        <div class="concept-card">
          <h3>核心特性</h3>
          <ul>
            <li><strong>LIFO 原则</strong>：最后入栈的元素最先出栈</li>
            <li><strong>受限访问</strong>：只能访问栈顶元素</li>
            <li><strong>动态大小</strong>：大多数实现支持动态扩展</li>
            <li><strong>基本操作</strong>：push(入栈), pop(出栈), peek(查看栈顶)等</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>时间复杂度</h3>
          <table class="complexity-table">
            <thead>
              <tr>
                <th>操作</th>
                <th>时间复杂度</th>
                <th>空间复杂度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>入栈 (Push)</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>出栈 (Pop)</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>查看栈顶 (Peek)</td>
                <td>O(1)</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>搜索元素</td>
                <td>O(n)</td>
                <td>O(1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 栈的实现部分 -->
      <section class="section">
        <h2>栈的实现</h2>

        <div class="implementation-tabs">
          <button v-for="(impl, index) in implementations" :key="index" :class="{ active: activeImpl === index }"
            @click="activeImpl = index" class="impl-tab">
            {{ impl.title }}
          </button>
        </div>

        <div class="implementation-content">
          <div v-if="activeImpl === 0" class="code-block">
            <h3>数组实现</h3>
            <pre>class ArrayStack {
  private items: any[];

  constructor() {
    this.items = [];
  }

  // 入栈
  push(element: any): void {
    this.items.push(element);
  }

  // 出栈
  pop(): any {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // 查看栈顶
  peek(): any {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  // 是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 栈大小
  size(): number {
    return this.items.length;
  }

  // 清空栈
  clear(): void {
    this.items = [];
  }
}</pre>
          </div>

          <div v-if="activeImpl === 1" class="code-block">
            <h3>链表实现</h3>
            <pre>class Node {
  constructor(
    public value: any,
    public next: Node | null = null
  ) {}
}

class LinkedListStack {
  private top: Node | null = null;
  private count: number = 0;

  // 入栈
  push(value: any): void {
    const node = new Node(value);
    if (this.top) {
      node.next = this.top;
    }
    this.top = node;
    this.count++;
  }

  // 出栈
  pop(): any {
    if (!this.top) return null;
    const value = this.top.value;
    this.top = this.top.next;
    this.count--;
    return value;
  }

  // 查看栈顶
  peek(): any {
    return this.top ? this.top.value : null;
  }

  // 是否为空
  isEmpty(): boolean {
    return this.count === 0;
  }

  // 栈大小
  size(): number {
    return this.count;
  }
}</pre>
          </div>
        </div>
      </section>

      <!-- 栈的应用部分 -->
      <section class="section">
        <h2>栈的应用场景</h2>

        <div class="application-card">
          <div class="app-icon">1</div>
          <div class="app-content">
            <h3>函数调用栈</h3>
            <p>程序执行时，函数调用和返回使用栈结构管理。每次调用函数时，将其推入调用栈，函数返回时从栈顶弹出。</p>
          </div>
        </div>

        <div class="application-card">
          <div class="app-icon">2</div>
          <div class="app-content">
            <h3>表达式求值</h3>
            <p>栈用于中缀表达式转后缀表达式，以及后缀表达式的求值过程。</p>
            <div class="code-block">
              <pre>// 后缀表达式求值 (逆波兰表示法)
function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(Math.trunc(a / b)); break;
      }
    }
  }

  return stack.pop()!;
}</pre>
            </div>
          </div>
        </div>

        <div class="application-card">
          <div class="app-icon">3</div>
          <div class="app-content">
            <h3>括号匹配</h3>
            <p>使用栈检查表达式中的括号是否正确匹配。</p>
            <div class="code-block">
              <pre>function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record&lt;string, string&gt; = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    if (['(', '[', '{'].includes(char)) {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}</pre>
            </div>
          </div>
        </div>

        <div class="application-card">
          <div class="app-icon">4</div>
          <div class="app-content">
            <h3>浏览器历史记录</h3>
            <p>浏览器的前进后退功能使用两个栈实现：一个栈存储后退历史，另一个存储前进历史。</p>
          </div>
        </div>

        <div class="application-card">
          <div class="app-icon">5</div>
          <div class="app-content">
            <h3>撤销操作 (Undo/Redo)</h3>
            <p>文本编辑器和图像处理软件的撤销功能通常使用栈实现，每次操作被压入栈中。</p>
          </div>
        </div>
      </section>

      <!-- 算法问题部分 -->
      <section class="section">
        <h2>栈的经典算法问题</h2>

        <div class="algorithm-card">
          <h3>1. 最小栈</h3>
          <p>设计一个支持 push、pop、top 操作，并能在常数时间内检索到最小元素的栈。</p>
          <div class="code-block">
            <pre>class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop(): void {
    const val = this.stack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}</pre>
          </div>
        </div>

        <div class="algorithm-card">
          <h3>2. 用栈实现队列</h3>
          <p>使用两个栈实现一个先入先出（FIFO）的队列。</p>
          <div class="code-block">
            <pre>class MyQueue {
  private inStack: number[] = [];
  private outStack: number[] = [];

  push(x: number): void {
    this.inStack.push(x);
  }

  pop(): number {
    if (this.outStack.length === 0) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
    return this.outStack.pop()!;
  }

  peek(): number {
    if (this.outStack.length === 0) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty(): boolean {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}</pre>
          </div>
        </div>

        <div class="algorithm-card">
          <h3>3. 每日温度</h3>
          <p>给定一个温度列表，生成一个列表表示需要等待多少天才能有更高的温度。</p>
          <div class="code-block">
            <pre>function dailyTemperatures(temperatures: number[]): number[] {
  const result = new Array(temperatures.length).fill(0);
  const stack: number[] = []; // 存储索引

  for (let i = 0; i < temperatures.length; i++) {
    // 当当前温度大于栈顶温度时
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop()!;
      result[idx] = i - idx; // 计算天数差
    }
    stack.push(i);
  }

  return result;
}</pre>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p>© 2023 数据结构学习指南 | 栈（Stack）专题</p>
      <p class="tip">提示：栈是计算机科学中最重要的基础数据结构之一，掌握其原理和应用对编程至关重要</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 栈可视化数据
const stackItems = ref<string[]>([]);
const itemColors = ref<string[]>([
  '#4a6cf7', '#6b48ff', '#ff6b6b', '#1dd1a1', '#feca57', '#ff9ff3'
]);

// 栈操作函数
const pushItem = () => {
  const newItem = `Item ${stackItems.value.length + 1}`;
  stackItems.value.push(newItem);
};

const popItem = () => {
  if (stackItems.value.length > 0) {
    stackItems.value.pop();
  }
};

const resetStack = () => {
  stackItems.value = [];
};

// 实现方式选项卡
const implementations = ref([
  { title: "数组实现" },
  { title: "链表实现" }
]);
const activeImpl = ref(0);
</script>

<style lang="less" scoped>
.stack-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  color: #2d3748;
  background: #f8fafc;
  min-height: 100vh;
}

header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #4a6cf7 0%, #6b48ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #718096;
    font-weight: 400;
  }
}

.visualization-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.stack-visual {
  position: relative;
  width: 220px;
  min-height: 400px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;
  border-left: 2px dashed #4a6cf7;
  border-right: 2px dashed #4a6cf7;
  border-bottom: 2px dashed #4a6cf7;
  padding: 0 20px 10px;
}

.stack-base,
.stack-top {
  position: absolute;
  color: #718096;
  font-size: 0.9rem;
}

.stack-base {
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
}

.stack-top {
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
}

.stack-item {
  width: 180px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  margin: 4px 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stack-controls {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.control-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .btn-icon {
    margin-right: 0.5rem;
    font-weight: bold;
    font-size: 1.2rem;
  }
}

.push-btn {
  background: linear-gradient(135deg, #4a6cf7 0%, #6b48ff 100%);
  color: white;
}

.pop-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff9ff3 100%);
  color: white;
}

.reset-btn {
  background: #e2e8f0;
  color: #4a5568;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  h2 {
    font-size: 1.5rem;
    color: #1a202c;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
  }
}

.concept-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.7rem;
      line-height: 1.5;
      color: #4a5568;
    }
  }
}

.complexity-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: #f0f7ff;
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.implementation-tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.impl-tab {
  padding: 0.8rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #718096;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    color: #4a6cf7;
  }

  &.active {
    color: #4a6cf7;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 3px;
      background: #4a6cf7;
      border-radius: 3px 3px 0 0;
    }
  }
}

.application-card {
  display: flex;
  gap: 1rem;
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;

  .app-icon {
    flex: 0 0 40px;
    height: 40px;
    background: #4a6cf7;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .app-content {
    flex: 1;

    h3 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-top: 0;
      margin-bottom: 0.8rem;
    }

    p {
      color: #4a5568;
      line-height: 1.6;
    }
  }
}

.algorithm-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

.code-block {
  background: #2d3748;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
  margin-top: 1rem;

  h3 {
    color: #cbd5e0;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  pre {
    margin: 0;
    color: #cbd5e0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 0.9rem;

  .tip {
    font-style: italic;
    color: #f44336;
    margin-top: 0.5rem;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .stack-visual {
    width: 180px;
    min-height: 300px;
  }

  .stack-item {
    width: 150px;
    height: 40px;
  }

  .stack-controls {
    flex-direction: column;
    width: 100%;

    .control-btn {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
