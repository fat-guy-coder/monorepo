<template>
  <div class="stack-algorithms-container">
    <!-- 标题区域 -->
    <header class="header">
      <h1>栈相关算法介绍</h1>
      <p>掌握数据结构核心，解决复杂问题</p>
    </header>

    <!-- 栈结构可视化 -->
    <div class="stack-visualization">
      <div class="stack-container">
        <div
          v-for="(item, index) in stackElements"
          :key="index"
          class="stack-element"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          {{ item }}
        </div>
        <div class="stack-base">栈底</div>
      </div>
      <div class="stack-operations">
        <div class="operation push" @click="pushElement">入栈 (Push)</div>
        <div class="operation pop" @click="popElement">出栈 (Pop)</div>
      </div>
    </div>

    <!-- 算法列表 -->
    <div class="algorithms-section">
      <div class="section-header">
        <div class="icon">📚</div>
        <h2>核心栈算法</h2>
      </div>

      <div class="algorithm-tabs">
        <div
          v-for="(algorithm, index) in algorithms"
          :key="index"
          class="tab"
          :class="{ active: activeAlgorithm === index }"
          @click="activeAlgorithm = index"
        >
          {{ algorithm.name }}
        </div>
      </div>

      <div class="algorithm-content">
        <div
          v-for="(algorithm, index) in algorithms"
          :key="index"
          v-show="activeAlgorithm === index"
        >
          <h3>{{ algorithm.name }}</h3>
          <p class="algorithm-description">{{ algorithm.description }}</p>

          <div class="complexity">
            <div class="complexity-item">
              <span>时间复杂度</span>
              <span class="value">{{ algorithm.complexity.time }}</span>
            </div>
            <div class="complexity-item">
              <span>空间复杂度</span>
              <span class="value">{{ algorithm.complexity.space }}</span>
            </div>
          </div>

          <div class="code-section">
            <h4>算法实现 (TypeScript)</h4>
            <pre><code>{{ algorithm.code }}</code></pre>
          </div>

          <div class="use-cases">
            <h4>使用场景</h4>
            <ul>
              <li v-for="(useCase, idx) in algorithm.useCases" :key="idx">{{ useCase }}</li>
            </ul>
          </div>

          <div class="visual-example" v-if="algorithm.visual">
            <h4>算法演示</h4>
            <div class="visual-content">
              <div class="step" v-for="(step, stepIdx) in algorithm.visual.steps" :key="stepIdx">
                <div class="step-label">步骤 {{ stepIdx + 1 }}:</div>
                <div class="step-content">{{ step }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 应用场景 -->
    <div class="applications-section">
      <div class="section-header">
        <div class="icon">🚀</div>
        <h2>栈算法的实际应用</h2>
      </div>

      <div class="applications-grid">
        <div class="application-card">
          <div class="app-icon">🧮</div>
          <h3>表达式求值</h3>
          <p>使用栈处理中缀转后缀表达式并计算值</p>
        </div>
        <div class="application-card">
          <div class="app-icon">🧭</div>
          <h3>浏览器历史</h3>
          <p>前进后退功能使用双栈实现</p>
        </div>
        <div class="application-card">
          <div class="app-icon">📱</div>
          <h3>撤销操作</h3>
          <p>编辑器中的撤销功能使用栈存储操作历史</p>
        </div>
        <div class="application-card">
          <div class="app-icon">🔍</div>
          <h3>语法检查</h3>
          <p>检查括号匹配、HTML标签闭合等</p>
        </div>
        <div class="application-card">
          <div class="app-icon">📊</div>
          <h3>图遍历</h3>
          <p>深度优先搜索(DFS)使用栈实现</p>
        </div>
        <div class="application-card">
          <div class="app-icon">🏗️</div>
          <h3>内存管理</h3>
          <p>函数调用栈管理程序执行流程</p>
        </div>
      </div>
    </div>

    <!-- 复杂度比较 -->
    <div class="complexity-section">
      <div class="section-header">
        <div class="icon">📈</div>
        <h2>算法复杂度比较</h2>
      </div>

      <div class="complexity-table">
        <table>
          <thead>
            <tr>
              <th>算法</th>
              <th>时间复杂度</th>
              <th>空间复杂度</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(algo, index) in algorithms" :key="index">
              <td>{{ algo.name }}</td>
              <td>{{ algo.complexity.time }}</td>
              <td>{{ algo.complexity.space }}</td>
              <td>{{ algo.useCases[0] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer class="footer">
      <p>栈相关算法介绍 | 数据结构与算法核心知识</p>
      <p> 计算机科学基础</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 栈可视化数据
const stackElements = ref(['A', 'B', 'C', 'D', 'E'])
const pushElement = () => {
  const chars = 'FGHIJKLMNOPQRSTUVWXYZ'
  const randomChar = chars.charAt(Math.floor(Math.random() * chars.length))
  stackElements.value.push(randomChar)
}
const popElement = () => {
  if (stackElements.value.length > 0) {
    stackElements.value.pop()
  }
}

// 当前激活的算法
const activeAlgorithm = ref(0)

// 算法数据
const algorithms = reactive([
  {
    name: '有效的括号',
    description: '检查字符串中的括号是否有效闭合，使用栈来跟踪开括号',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
    },
    code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of s) {
    if (['(', '{', '['].includes(char)) {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
    useCases: ['代码编辑器中的语法检查', '表达式解析前的验证', 'HTML/XML标签闭合检查'],
    visual: {
      steps: [
        "遇到开括号 '('、'{' 或 '[' 时入栈",
        "遇到闭括号 ')'、'}' 或 ']' 时检查栈顶元素是否匹配",
        '如果匹配则出栈，否则返回无效',
        '遍历结束后栈应为空',
      ],
    },
  },
  {
    name: '逆波兰表达式求值',
    description: '计算后缀表达式（逆波兰表示法）的值，使用栈存储操作数',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
    },
    code: `function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (['+', '-', '*', '/'].includes(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      let result: number;

      switch (token) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = Math.trunc(a / b); break;
        default: result = 0;
      }

      stack.push(result);
    } else {
      stack.push(parseInt(token, 10));
    }
  }

  return stack.pop()!;
}`,
    useCases: ['计算器实现', '编译器中的表达式求值', '数学公式解析'],
    visual: {
      steps: [
        '遍历表达式中的每个token',
        '遇到操作数时入栈',
        '遇到运算符时弹出栈顶两个操作数',
        '执行运算并将结果入栈',
        '最后栈中剩余的元素即为结果',
      ],
    },
  },
  {
    name: '最小栈',
    description: '设计一个栈，支持push、pop、top操作，并能在常数时间内检索到最小元素',
    complexity: {
      time: 'O(1) 所有操作',
      space: 'O(n)',
    },
    code: `class MinStack {
  private stack: number[];
  private minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

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
}`,
    useCases: [
      '需要快速访问最小元素的场景',
      '实时数据流中的最小值跟踪',
      '算法优化中的辅助数据结构',
    ],
    visual: {
      steps: [
        '使用两个栈：主栈和最小栈',
        '每次push操作时，如果值小于等于最小栈顶元素，则同时压入最小栈',
        'pop操作时，如果弹出的值等于最小栈顶元素，则同时弹出最小栈顶',
        'getMin操作直接返回最小栈顶元素',
      ],
    },
  },
  {
    name: '下一个更大元素',
    description: '对于数组中每个元素，找到下一个比它大的元素，使用单调栈优化',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
    },
    code: `function nextGreaterElements(nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = new Array(n).fill(-1);
  const stack: number[] = [];

  for (let i = 0; i < 2 * n; i++) {
    const idx = i % n;
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[idx]) {
      const top = stack.pop()!;
      result[top] = nums[idx];
    }

    if (i < n) {
      stack.push(idx);
    }
  }

  return result;
}`,
    useCases: ['股票分析中的价格趋势预测', '数组模式识别', '数据处理管道中的元素关系分析'],
    visual: {
      steps: [
        '初始化结果数组为-1，创建空栈',
        '遍历数组（可循环处理环形数组）',
        '当栈不为空且当前元素大于栈顶元素时，更新结果并出栈',
        '将当前索引入栈',
        '处理完成后返回结果数组',
      ],
    },
  },
  {
    name: '柱状图中最大矩形',
    description: '在柱状图中找到最大的矩形面积，使用栈优化计算过程',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
    },
    code: `function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let maxArea = 0;
  let i = 0;

  while (i <= heights.length) {
    const current = i < heights.length ? heights[i] : 0;

    if (stack.length === 0 || current >= heights[stack[stack.length - 1]]) {
      stack.push(i++);
    } else {
      const top = stack.pop()!;
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, heights[top] * width);
    }
  }

  return maxArea;
}`,
    useCases: ['图表分析中的最大面积计算', '图像处理中的区域检测', '地理信息系统中的地形分析'],
    visual: {
      steps: [
        '遍历每个柱体，索引为i',
        '当栈为空或当前柱体高度大于等于栈顶柱体高度时，索引入栈',
        '否则计算栈顶柱体形成的矩形面积',
        '高度为柱体高度，宽度为当前i与栈顶前一个索引的差减一',
        '更新最大面积并继续处理',
      ],
    },
  },
  {
    name: '用栈实现队列',
    description: '使用两个栈实现先入先出(FIFO)的队列操作',
    complexity: {
      time: '摊还 O(1)',
      space: 'O(n)',
    },
    code: `class MyQueue {
  private inStack: number[];
  private outStack: number[];

  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x: number): void {
    this.inStack.push(x);
  }

  pop(): number {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
    return this.outStack.pop()!;
  }

  peek(): number {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty(): boolean {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}`,
    useCases: ['需要队列功能但只提供栈API的环境', '多栈环境中的数据处理', '算法设计中数据结构转换'],
    visual: {
      steps: [
        '使用两个栈：输入栈和输出栈',
        'push操作直接压入输入栈',
        'pop/peek操作时，如果输出栈为空，则将输入栈元素全部弹出压入输出栈',
        '然后从输出栈弹出元素',
        'empty操作检查两个栈是否都为空',
      ],
    },
  },
])
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@header-gradient: linear-gradient(135deg, #6a11cb, #2575fc);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.stack-algorithms-container {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 50px 20px;
  background: @header-gradient;
  color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.4rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }
}

.stack-visualization {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.stack-container {
  width: 200px;
  border: 2px solid @primary-color;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  min-height: 300px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 10px;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  position: relative;
}

.stack-element {
  width: 90%;
  height: 50px;
  background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 10%));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 6px;
  margin-bottom: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
  animation-delay: var(--delay);
  animation-fill-mode: backwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stack-base {
  position: absolute;
  bottom: -30px;
  width: 220px;
  height: 30px;
  background: #d0d0d0;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #555;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.stack-operations {
  display: flex;
  gap: 20px;
  margin-top: 50px;
}

.operation {
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &.push {
    background: @secondary-color;
    color: white;

    &:hover {
      background: darken(@secondary-color, 10%);
      transform: translateY(-3px);
    }
  }

  &.pop {
    background: #e74c3c;
    color: white;

    &:hover {
      background: darken(#e74c3c, 10%);
      transform: translateY(-3px);
    }
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid @border-color;

  .icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, @primary-color, #8e44ad);
    color: white;
    border-radius: 50%;
  }

  h2 {
    font-size: 1.9rem;
    color: @text-color;
  }
}

.algorithms-section,
.applications-section,
.complexity-section {
  background: @card-bg;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.algorithm-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

.tab {
  padding: 12px 25px;
  border-radius: 30px;
  background: #f1f1f1;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: #e0e0e0;
  }

  &.active {
    background: @primary-color;
    color: white;
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }
}

.algorithm-content {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: @primary-color;
  }
}

.algorithm-description {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 20px;
  color: #444;
}

.complexity {
  display: flex;
  gap: 30px;
  margin: 20px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.complexity-item {
  display: flex;
  flex-direction: column;

  span {
    font-size: 0.95rem;
    color: #777;
  }

  .value {
    font-size: 1.2rem;
    font-weight: 700;
    color: @text-color;
  }
}

.code-section {
  margin: 30px 0;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #555;
  }
}

pre {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  overflow-x: auto;

  code {
    color: #f8f8f2;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.use-cases {
  margin: 30px 0;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #555;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 10px 0;
      border-bottom: 1px dashed @border-color;
      padding-left: 25px;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 10px;
        top: 10px;
        color: @primary-color;
        font-weight: 700;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.visual-example {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #555;
  }
}

.step {
  display: flex;
  margin-bottom: 10px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .step-label {
    font-weight: 600;
    min-width: 80px;
    color: @primary-color;
  }

  .step-content {
    flex: 1;
  }
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.application-card {
  background: white;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-top: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .app-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: @text-color;
  }

  p {
    color: #7f8c8d;
    font-size: 1rem;
  }
}

.complexity-table {
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 16px 20px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: #f1f5f9;
      font-weight: 600;
      color: @text-color;
    }

    tbody tr {
      &:nth-child(odd) {
        background: rgba(240, 244, 248, 0.5);
      }

      &:hover {
        background: rgba(52, 152, 219, 0.08);
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  color: #7f8c8d;
  font-size: 1rem;
  border-top: 1px solid @border-color;

  p:first-child {
    margin-bottom: 8px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 40px 15px;

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .stack-container {
    width: 150px;
    min-height: 250px;
  }

  .stack-operations {
    flex-direction: column;
    gap: 15px;
  }

  .algorithm-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 10px;
  }
}
</style>
