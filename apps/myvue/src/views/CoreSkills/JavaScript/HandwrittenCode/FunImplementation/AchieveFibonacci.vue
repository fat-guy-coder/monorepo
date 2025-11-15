<template>
  <div class="fibonacci-container">
    <header class="header">
      <h1>斐波那契数列实现方法</h1>
      <p class="subtitle">探索数学之美与算法实现的多样性</p>
    </header>

    <div class="intro-section">
      <div class="intro-card">
        <div class="intro-content">
          <h2>斐波那契数列介绍</h2>
          <p>斐波那契数列是一个经典的整数序列，由意大利数学家列奥纳多·斐波那契首次提出。在这个数列中，每个数字是前两个数字之和，序列从0和1开始。</p>

          <div class="sequence-display">
            <div class="sequence-formula">
              F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) (n ≥ 2)
            </div>
            <div class="sequence-numbers">
              <div class="fib-number" v-for="(num, index) in sequence" :key="index">
                <div class="index">F({{ index }})</div>
                <div class="value">{{ num }}</div>
              </div>
            </div>
          </div>

          <div class="math-properties">
            <h3>数学特性：</h3>
            <ul>
              <li>相邻两个斐波那契数的比值趋近于黄金比例(≈1.618)</li>
              <li>斐波那契数列在自然界中广泛存在（如植物花瓣、松果排列）</li>
              <li>斐波那契数列与黄金矩形、黄金螺旋有密切关系</li>
            </ul>
          </div>
        </div>
        <div class="intro-image">
          <div class="golden-spiral"></div>
          <div class="caption">斐波那契黄金螺旋</div>
        </div>
      </div>
    </div>

    <div class="methods-section">
      <h2>实现方法</h2>
      <p class="section-description">斐波那契数列可以通过多种编程方法实现，每种方法在时间复杂度、空间复杂度和适用场景上有所不同</p>

      <div class="method-tabs">
        <button
          v-for="method in methods"
          :key="method.id"
          :class="['tab-button', { active: activeMethod === method.id }]"
          @click="activeMethod = method.id"
        >
          {{ method.title }}
        </button>
      </div>

      <div class="method-content">
        <div v-for="method in methods" :key="method.id" v-show="activeMethod === method.id" class="method-details">
          <div class="method-header">
            <div class="complexity">
              <span class="time">时间复杂度: {{ method.timeComplexity }}</span>
              <span class="space">空间复杂度: {{ method.spaceComplexity }}</span>
            </div>
            <div class="method-icon">{{ method.icon }}</div>
          </div>

          <div class="implementation">
            <h3>实现思路:</h3>
            <ol>
              <li v-for="(step, index) in method.steps" :key="index">{{ step }}</li>
            </ol>
          </div>

          <div class="code-sample">
            <h3>代码实现:</h3>
            <pre><code>{{ method.code }}</code></pre>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>优点:</h4>
              <ul>
                <li v-for="(pro, idx) in method.pros" :key="idx">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点:</h4>
              <ul>
                <li v-for="(con, idx) in method.cons" :key="idx">{{ con }}</li>
              </ul>
            </div>
          </div>

          <div class="use-case">
            <h4>适用场景:</h4>
            <p>{{ method.useCase }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2>方法对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>方法</th>
              <th>时间复杂度</th>
              <th>空间复杂度</th>
              <th>优点</th>
              <th>缺点</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="method in methods" :key="method.id">
              <td>{{ method.title }}</td>
              <td>{{ method.timeComplexity }}</td>
              <td>{{ method.spaceComplexity }}</td>
              <td>{{ method.pros.join(', ') }}</td>
              <td>{{ method.cons.join(', ') }}</td>
              <td>{{ method.useCase }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer class="footer">
      <p> 算法与数学之美 | 斐波那契数列专题</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 斐波那契数列展示
const sequence = ref<number[]>([]);

// 当前选中的方法
const activeMethod = ref<string>('iterative');

// 生成斐波那契数列
onMounted(() => {
  generateSequence();
});

function generateSequence() {
  const fib = [0, 1];
  for (let i = 2; i <= 10; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  sequence.value = fib;
}

// 斐波那契数列实现方法
const methods = ref([
  {
    id: 'recursive',
    title: '递归实现',
    icon: '🔄',
    timeComplexity: 'O(2ⁿ)',
    spaceComplexity: 'O(n)',
    steps: [
      '定义基础情况：n=0时返回0，n=1时返回1',
      '对于n>1的情况，返回fib(n-1) + fib(n-2)',
      '递归调用直到达到基础情况'
    ],
    code: `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
//尾递归优化
function fibonacci(n: number, a = 0, b = 1): number {
  if (n <= 1) return b;
  return fibonacci(n - 1, b, a + b); // 尾递归优化
}
`,
    pros: [
      '代码简洁直观',
      '最接近数学定义',
      '易于理解'
    ],
    cons: [
      '指数级时间复杂度',
      '大量重复计算',
      '容易栈溢出'
    ],
    useCase: '仅适用于教学和小规模n值(n<20)'
  },
  {
    id: 'iterative',
    title: '迭代实现',
    icon: '⏱️',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    steps: [
      '初始化前两个值a=0, b=1',
      '从2循环到n',
      '每次迭代计算c = a + b',
      '更新a = b, b = c',
      '循环结束后返回b'
    ],
    code: `function fibonacci(n: number): number {
  if (n <= 1) return n;

  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    pros: [
      '线性时间复杂度',
      '常数空间复杂度',
      '无栈溢出风险'
    ],
    cons: [
      '代码稍复杂于递归',
      '需要理解迭代过程'
    ],
    useCase: '适用于大多数实际场景(n<1000)'
  },
  {
    id: 'memoization',
    title: '记忆化递归',
    icon: '📝',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    steps: [
      '创建缓存对象存储计算结果',
      '定义递归辅助函数',
      '在递归函数中检查缓存',
      '如果结果已缓存则直接返回',
      '否则计算结果并存入缓存'
    ],
    code: `function fibonacci(n: number): number {
  const memo: Record<number, number> = {};

  function fib(n: number): number {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];

    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
  }

  return fib(n);
}`,
    pros: [
      '线性时间复杂度',
      '避免重复计算',
      '保留递归的简洁性'
    ],
    cons: [
      '需要额外存储空间',
      '仍有递归深度限制'
    ],
    useCase: '需要递归实现的场景但n较大时'
  },
  {
    id: 'matrix',
    title: '矩阵幂方法',
    icon: '🧮',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    steps: [
      '定义斐波那契变换矩阵',
      '计算矩阵的n次幂',
      '使用矩阵快速幂算法优化',
      '结果矩阵的特定位置即为F(n)'
    ],
    code: `function fibonacci(n: number): number {
  if (n <= 1) return n;

  const base = [[1, 1], [1, 0]];
  return matrixPower(base, n - 1)[0][0];
}

function matrixPower(matrix: number[][], exp: number): number[][] {
  let result = [[1, 0], [0, 1]]; // 单位矩阵
  let base = matrix;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = multiplyMatrices(result, base);
    }
    base = multiplyMatrices(base, base);
    exp = Math.floor(exp / 2);
  }

  return result;
}

function multiplyMatrices(a: number[][], b: number[][]): number[][] {
  const result = [[0, 0], [0, 0]];

  result[0][0] = a[0][0]*b[0][0] + a[0][1]*b[1][0];
  result[0][1] = a[0][0]*b[0][1] + a[0][1]*b[1][1];
  result[1][0] = a[1][0]*b[0][0] + a[1][1]*b[1][0];
  result[1][1] = a[1][0]*b[0][1] + a[1][1]*b[1][1];

  return result;
}`,
    pros: [
      '对数级时间复杂度',
      '适合非常大的n值',
      '数学上最优雅的解法'
    ],
    cons: [
      '实现复杂',
      '需要矩阵运算知识',
      '对小n值不划算'
    ],
    useCase: '需要计算极大n值(n>100000)的场景'
  },
  {
    id: 'closed-form',
    title: '闭式公式(Binet公式)',
    icon: '✨',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    steps: [
      '使用黄金分割率φ = (1 + √5)/2',
      '计算ψ = (1 - √5)/2',
      '应用Binet公式: F(n) = (φⁿ - ψⁿ) / √5',
      '四舍五入到最接近的整数'
    ],
    code: `function fibonacci(n: number): number {
  const sqrt5 = Math.sqrt(5);
  const phi = (1 + sqrt5) / 2;
  const psi = (1 - sqrt5) / 2;

  return Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / sqrt5;
}`,
    pros: [
      '常数时间复杂度',
      '最直接的数学实现',
      '无需循环或递归'
    ],
    cons: [
      '浮点数精度问题',
      'n较大时可能不准确',
      '不能处理极大n值'
    ],
    useCase: 'n值较小且需要最佳性能的场景'
  }
]);


</script>

<style lang="less" scoped>

.fibonacci-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%);
  min-height: 100vh;
  color: #2d3748;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  border-radius: 16px;
  background: linear-gradient(120deg, #0c8599, #1098ad);
  color: white;
  box-shadow: 0 10px 20px rgba(8, 145, 178, 0.15);

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.intro-section {
  margin-bottom: 50px;
}

.intro-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  padding: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.intro-content {
  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: #0c8599;
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    margin-bottom: 25px;
  }
}

.sequence-display {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
}

.sequence-formula {
  font-family: 'Fira Code', monospace;
  background: #1e293b;
  color: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.1rem;
}

.sequence-numbers {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.fib-number {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e3fafc;
  border-radius: 12px;
  border: 2px solid #1098ad;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(8, 145, 178, 0.2);
  }

  .index {
    font-size: 0.9rem;
    color: #0c8599;
    font-weight: 500;
  }

  .value {
    font-size: 1.4rem;
    font-weight: 700;
    color: #0c8599;
  }
}

.math-properties {
  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #0c8599;
        font-size: 1.5rem;
        line-height: 1;
      }
    }
  }
}

.intro-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.golden-spiral {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #e3fafc, #c5f6fa);
  border-radius: 16px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    border: 2px solid #0c8599;
    transform: translate(-50%, -50%);
    animation: spiral 8s linear infinite;
  }

  @keyframes spiral {
    0% { width: 0; height: 0; opacity: 1; }
    100% { width: 300px; height: 300px; opacity: 0; }
  }
}

.caption {
  margin-top: 15px;
  font-style: italic;
  color: #868e96;
}

.methods-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 15px;
    color: #0c8599;
  }

  .section-description {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 30px;
    font-size: 1.1rem;
    color: #4a5568;
  }
}

.method-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.tab-button {
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  background: #e3fafc;
  font-weight: 500;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #0c8599;

  &:hover {
    background: #c5f6fa;
    transform: translateY(-3px);
  }

  &.active {
    background: #0c8599;
    color: white;
    box-shadow: 0 5px 15px rgba(8, 145, 178, 0.3);
  }
}

.method-content {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  padding: 30px;
}

.method-details {
  .method-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9ecef;
  }

  .complexity {
    display: flex;
    gap: 20px;
    font-weight: 500;

    .time::before {
      content: '⏱️ ';
    }

    .space::before {
      content: '💾 ';
    }
  }

  .method-icon {
    font-size: 3rem;
    color: #0c8599;
  }
}

.implementation {
  margin-bottom: 30px;

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
  }

  ol {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      padding-left: 10px;
      position: relative;

      &::marker {
        font-weight: 700;
        color: #0c8599;
      }
    }
  }
}

.code-sample {
  margin-bottom: 30px;

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
  }

  pre {
    background: #1e293b;
    color: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    overflow-x: auto;
    font-size: 0.95rem;
    line-height: 1.5;

    code {
      font-family: 'Fira Code', monospace;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;

  h4 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
  }

  ul {
    padding-left: 25px;
    margin: 0;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 25px;

      &::before {
        position: absolute;
        left: 0;
      }
    }
  }

  .pros {
    ul li::before {
      content: '✓ ';
      color: #40c057;
    }
  }

  .cons {
    ul li::before {
      content: '✗ ';
      color: #fa5252;
    }
  }
}

.use-case {
  background: #f1f3f9;
  border-radius: 12px;
  padding: 20px;

  h4 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 10px;
    color: #2d3748;
  }
}

.comparison-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 30px;
    color: #0c8599;
  }
}

.comparison-table {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;

    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }

    th {
      background: #e3fafc;
      color: #0c8599;
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:nth-child(even) {
      background: #f8f9fa;
    }

    tr:hover {
      background: #edf7ff;
    }
  }
}

.calculator-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 30px;
    color: #0c8599;
  }
}

.calculator {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  label {
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  input {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #0c8599;
      box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1);
    }
  }

  button {
    padding: 12px 25px;
    background: #0c8599;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #1098ad;
    }
  }
}

.method-select {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;

  label {
    font-weight: 500;
  }

  select {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    background: white;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #0c8599;
    }
  }
}

.result {
  text-align: center;
  padding: 20px;
  background: #e3fafc;
  border-radius: 12px;
  margin-top: 20px;

  .result-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0c8599;
    margin-bottom: 10px;
  }

  .calculation-time {
    font-size: 0.9rem;
    color: #495057;
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #718096;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .intro-card {
    padding: 20px;
  }

  .sequence-numbers {
    gap: 10px;
  }

  .fib-number {
    width: 70px;
    height: 70px;

    .index {
      font-size: 0.8rem;
    }

    .value {
      font-size: 1.2rem;
    }
  }

  .method-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-bottom: 10px;
  }

  .tab-button {
    padding: 10px 20px;
    font-size: 0.95rem;
    white-space: nowrap;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }

  .input-group {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>
