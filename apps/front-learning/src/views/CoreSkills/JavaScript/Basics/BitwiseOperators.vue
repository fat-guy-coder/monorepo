<template>
  <div class="bitwise-container">
    <header class="app-header">
      <h1>JavaScript 位运算基础介绍</h1>
      <p class="subtitle">探索二进制操作的艺术：原理、技巧与实践应用</p>
    </header>

    <div class="content-wrapper">
      <!-- 介绍部分 -->
      <section class="intro-section">
        <div class="info-card">
          <h2>什么是位运算？</h2>
          <p>位运算直接操作整数的二进制位（bit）。在JavaScript中，位运算会将操作数转换为32位有符号整数（补码形式）进行操作。</p>

          <div class="binary-visualization">
            <div class="bit-header">32位整数表示 (示例: 42)</div>
            <div class="bit-grid">
              <div v-for="(bit, index) in bits42" :key="index" :class="['bit', index === 0 ? 'sign-bit' : '']">
                {{ bit }}
              </div>
            </div>
            <div class="bit-index">
              <span>31</span>
              <span>30</span>
              <span class="dots">...</span>
              <span>1</span>
              <span>0</span>
            </div>
            <div class="bit-description">
              <div class="sign">符号位 (0=正数, 1=负数)</div>
              <div class="value">数值位 (从右到左表示2^0到2^30)</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 运算符概览 -->
      <section class="operators-section">
        <h2 class="section-title">位运算符概览</h2>
        <div class="operators-grid">
          <div v-for="(operator, index) in operators" :key="index" class="operator-card"
            @click="activeOperator = operator">
            <div class="operator-symbol">{{ operator.symbol }}</div>
            <div class="operator-info">
              <h3>{{ operator.name }}</h3>
              <p>{{ operator.description }}</p>
              <div class="example">{{ operator.example }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 详细解释 -->
      <section class="details-section" v-if="activeOperator">
        <div class="detail-card">
          <div class="detail-header">
            <span class="symbol">{{ activeOperator.symbol }}</span>
            <h3>{{ activeOperator.name }}</h3>
          </div>

          <div class="detail-body">
            <div class="truth-table">
              <h4>真值表：</h4>
              <table>
                <thead>
                  <tr>
                    <th>A</th>
                    <th>B</th>
                    <th>A {{ activeOperator.symbol }} B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, idx) in activeOperator.truthTable" :key="idx">
                    <td>{{ row.a }}</td>
                    <td>{{ (row as any).b }}</td>
                    <td>{{ row.result }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="code-example">
              <h4>代码示例：</h4>
              <pre>{{ activeOperator.codeExample }}</pre>
            </div>
          </div>

          <div class="use-cases">
            <h4>使用场景：</h4>
            <ul>
              <li v-for="(useCase, idx) in activeOperator.useCases" :key="idx">{{ useCase }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases-section">
        <h2 class="section-title">实际应用场景</h2>

        <div class="use-case-card">
          <div class="use-case-header">
            <div class="icon">🔐</div>
            <h3>权限控制系统</h3>
          </div>
          <p>使用位掩码表示和检查权限，每个权限用一个位表示</p>
          <pre class="use-case-code">const READ = 1;     // 0001
const WRITE = 2;    // 0010
const EXECUTE = 4;  // 0100

let userPermissions = READ | WRITE; // 0011

// 检查写权限
const canWrite = (userPermissions & WRITE) === WRITE;</pre>
        </div>

        <div class="use-case-card">
          <div class="use-case-header">
            <div class="icon">🎨</div>
            <h3>颜色操作</h3>
          </div>
          <p>使用位运算提取和组合RGB颜色值</p>
          <pre class="use-case-code">// 从32位颜色值提取RGB分量
function getRGB(color) {
  const r = (color >> 16) & 0xFF;
  const g = (color >> 8) & 0xFF;
  const b = color & 0xFF;
  return [r, g, b];
}

// 组合RGB分量
function toRGB(r, g, b) {
  return (r << 16) | (g << 8) | b;
}</pre>
        </div>

        <div class="use-case-card">
          <div class="use-case-header">
            <div class="icon">⚡</div>
            <h3>性能优化</h3>
          </div>
          <p>使用位运算进行快速数学计算</p>
          <pre class="use-case-code">// 判断奇偶性 (比%更快)
const isEven = num => (num & 1) === 0;

// 快速乘以2的幂
const multiplyByPowerOfTwo = (num, power) => num << power;

// 快速除以2的幂 (保留符号)
const divideByPowerOfTwo = (num, power) => num >> power;

// 交换两个变量的值
let a = 5, b = 10;
a ^= b;
b ^= a;
a ^= b;</pre>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="notes-section">
        <h2 class="section-title">重要注意事项</h2>
        <div class="notes-grid">
          <div class="note-card">
            <div class="note-icon">⚠️</div>
            <h3>32位限制</h3>
            <p>所有位运算操作都会将操作数转换为32位有符号整数（补码形式），超出部分会被截断。</p>
          </div>

          <div class="note-card">
            <div class="note-icon">🔢</div>
            <h3>小数处理</h3>
            <p>位运算只对整数有效，小数部分会被丢弃：<code>5.9 | 0</code> → <code>5</code></p>
          </div>

          <div class="note-card">
            <div class="note-icon">🔄</div>
            <h3>负数表示</h3>
            <p>JavaScript使用补码表示负数：<code>~5</code> → <code>-6</code></p>
          </div>

          <div class="note-card">
            <div class="note-icon">📏</div>
            <h3>位运算优先级</h3>
            <p>位运算符优先级低于算术运算符：<code>1 + 2 << 3</code> → <code>24</code> (不是<code>1 + (2<<3)</code>)</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 42的二进制表示 (32位)
const bits42 = '00000000000000000000000000101010'.split('');

// 位运算符数据
const operators = ref([
  {
    symbol: '&',
    name: '按位与 (AND)',
    description: '两个操作数的对应位都为1时，结果位才为1',
    example: '5 & 3 → 1 (0101 & 0011 = 0001)',
    truthTable: [
      { a: 0, b: 0, result: 0 },
      { a: 0, b: 1, result: 0 },
      { a: 1, b: 0, result: 0 },
      { a: 1, b: 1, result: 1 }
    ],
    codeExample: '// 检查特定位是否设置\nconst FLAG_A = 1; // 0001\nconst FLAG_B = 2; // 0010\n\nconst settings = FLAG_A | FLAG_B; // 0011\nconst hasFlagA = (settings & FLAG_A) !== 0; // true',
    useCases: [
      '权限检查和验证',
      '掩码操作',
      '提取特定位的值',
      '判断奇偶性 (num & 1)'
    ]
  },
  {
    symbol: '|',
    name: '按位或 (OR)',
    description: '两个操作数的对应位有一个为1时，结果位就为1',
    example: '5 | 3 → 7 (0101 | 0011 = 0111)',
    truthTable: [
      { a: 0, b: 0, result: 0 },
      { a: 0, b: 1, result: 1 },
      { a: 1, b: 0, result: 1 },
      { a: 1, b: 1, result: 1 }
    ],
    codeExample: '// 设置特定位\nconst FLAG_A = 1; // 0001\nconst FLAG_B = 2; // 0010\n\nlet settings = 0;\nsettings |= FLAG_A; // 设置A标志位\nsettings |= FLAG_B; // 设置B标志位',
    useCases: [
      '组合权限或标志位',
      '设置特定位为1',
      '合并多个选项'
    ]
  },
  {
    symbol: '^',
    name: '按位异或 (XOR)',
    description: '两个操作数的对应位不同时，结果位为1',
    example: '5 ^ 3 → 6 (0101 ^ 0011 = 0110)',
    truthTable: [
      { a: 0, b: 0, result: 0 },
      { a: 0, b: 1, result: 1 },
      { a: 1, b: 0, result: 1 },
      { a: 1, b: 1, result: 0 }
    ],
    codeExample: '// 切换特定位状态\nconst FLAG_A = 1; // 0001\n\nlet settings = 0;\nsettings ^= FLAG_A; // 开启A标志位 (0→1)\nsettings ^= FLAG_A; // 关闭A标志位 (1→0)\n\n// 交换两个变量的值\nlet a = 5, b = 10;\na ^= b;\nb ^= a;\na ^= b;',
    useCases: [
      '切换位状态',
      '交换两个变量的值（不使用临时变量）',
      '简单加密算法',
      '找出只出现一次的数字'
    ]
  },
  {
    symbol: '~',
    name: '按位非 (NOT)',
    description: '反转操作数的每一位，0变1，1变0',
    example: '~5 → -6 (~00000000000000000000000000000101 = 11111111111111111111111111111010)',
    truthTable: [
      { a: 0, result: 1 },
      { a: 1, result: 0 }
    ],
    codeExample: '// 创建掩码\nconst MASK = ~(1 << 3); // 11111111111111111111111111110111\n\n// 清除特定位\nlet value = 15; // 1111\nvalue &= MASK;  // 清除第3位 → 0111 (7)',
    useCases: [
      '创建位掩码',
      '反转所有位',
      '配合其他运算符清除特定位'
    ]
  },
  {
    symbol: '<<',
    name: '左移 (Left Shift)',
    description: '将第一个操作数的所有位向左移动指定位数，右侧补0',
    example: '5 << 2 → 20 (0101 << 2 = 10100)',
    codeExample: '// 快速乘以2的幂\nfunction multiplyByPowerOfTwo(num, power) {\n  return num << power;\n}\n\n// 创建特定模式\nconst MASK = 1 << 3; // 00001000 (8)',
    useCases: [
      '快速乘以2的幂次方',
      '创建位掩码',
      '高效生成特定二进制模式'
    ]
  },
  {
    symbol: '>>',
    name: '有符号右移 (Sign-propagating Right Shift)',
    description: '将第一个操作数的所有位向右移动指定位数，左侧补符号位',
    example: '-5 >> 1 → -3 (11111111111111111111111111111011 >> 1 = 11111111111111111111111111111101)',
    codeExample: '// 快速除以2的幂（保留符号）\nfunction divideByPowerOfTwo(num, power) {\n  return num >> power;\n}\n\n// 提取带符号的整数值\nconst highByte = (value >> 8) & 0xFF;',
    useCases: [
      '快速除以2的幂次方（保留符号）',
      '提取特定位段（带符号）',
      '处理有符号整数'
    ]
  },
  {
    symbol: '>>>',
    name: '无符号右移 (Zero-fill Right Shift)',
    description: '将第一个操作数的所有位向右移动指定位数，左侧补0',
    example: '-5 >>> 1 → 2147483645 (11111111111111111111111111111011 >>> 1 = 01111111111111111111111111111101)',
    codeExample: '// 处理无符号整数\nconst unsignedValue = -1 >>> 0; // 4294967295\n\n// 提取颜色分量\nfunction getRedComponent(color) {\n  return (color >>> 16) & 0xFF;\n}',
    useCases: [
      '处理无符号整数',
      '提取颜色分量',
      '将负数转换为大正数',
      '处理高位数据'
    ]
  }
]);

const activeOperator = ref(operators.value[0]);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;

.bitwise-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background-color: @light-bg;
  color: #333;
  min-height: 100vh;
  line-height: 1.6;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .subtitle {
    margin: 10px 0 0;
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  border-bottom: 2px solid @primary-color;
  padding-bottom: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
}

// 介绍部分样式
.intro-section {
  .info-card {
    background-color: #e3f2fd;
    border-left: 4px solid @primary-color;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 30px;

    h2 {
      margin-top: 0;
      color: #1565c0;
      font-size: 1.6rem;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
  }

  .binary-visualization {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 15px;
    margin-top: 15px;
    font-family: monospace;

    .bit-header {
      font-weight: bold;
      margin-bottom: 10px;
      color: #555;
      text-align: center;
    }

    .bit-grid {
      display: grid;
      grid-template-columns: repeat(32, 1fr);
      gap: 2px;
      margin-bottom: 5px;
    }

    .bit {
      background-color: #bbdefb;
      text-align: center;
      padding: 8px 0;
      font-size: 0.75rem;
      border-radius: 3px;
      font-weight: bold;

      &.sign-bit {
        background-color: #ffccbc;
      }
    }

    .bit-index {
      display: grid;
      grid-template-columns: repeat(32, 1fr);
      gap: 2px;
      font-size: 0.6rem;
      color: #777;

      span {
        text-align: center;
      }

      .dots {
        grid-column: span 28;
        text-align: center;
      }
    }

    .bit-description {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      font-size: 0.9rem;
      color: #555;

      .sign {
        color: @accent-color;
      }

      .value {
        color: #2e7d32;
      }
    }
  }
}

// 运算符卡片样式
.operators-section {
  .operators-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .operator-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    display: flex;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      border-color: @primary-color;
    }

    .operator-symbol {
      font-size: 2.5rem;
      font-weight: bold;
      min-width: 60px;
      color: @primary-color;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
    }

    .operator-info {
      flex: 1;

      h3 {
        margin-top: 0;
        margin-bottom: 10px;
        color: @secondary-color;
        font-size: 1.4rem;
      }

      p {
        color: #555;
        margin-bottom: 10px;
        font-size: 0.95rem;
      }

      .example {
        background-color: #e3f2fd;
        padding: 8px 12px;
        border-radius: 6px;
        font-family: monospace;
        font-size: 0.9rem;
        color: #1565c0;
      }
    }
  }
}

// 详细解释样式
.details-section {
  margin-top: 30px;

  .detail-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .detail-header {
      background: linear-gradient(135deg, @primary-color, darken(@primary-color, 10%));
      color: white;
      padding: 20px;
      display: flex;
      align-items: center;

      .symbol {
        font-size: 2.5rem;
        font-weight: bold;
        margin-right: 15px;
        min-width: 50px;
        text-align: center;
      }

      h3 {
        margin: 0;
        font-size: 1.6rem;
      }
    }

    .detail-body {
      padding: 20px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 25px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .truth-table {
        h4 {
          margin-top: 0;
          color: @secondary-color;
        }

        table {
          width: 100%;
          border-collapse: collapse;

          th,
          td {
            border: 1px solid @border-color;
            padding: 10px;
            text-align: center;
          }

          th {
            background-color: #f5f5f5;
            font-weight: 600;
          }

          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        }
      }

      .code-example {
        h4 {
          margin-top: 0;
          color: @secondary-color;
        }

        pre {
          background-color: #2d2d2d;
          color: #f8f8f2;
          border-radius: 8px;
          padding: 18px;
          font-family: 'Fira Code', monospace;
          overflow: auto;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
        }
      }
    }

    .use-cases {
      padding: 20px;
      border-top: 1px solid @border-color;
      background-color: #f9f9f9;

      h4 {
        margin-top: 0;
        color: @secondary-color;
        font-size: 1.2rem;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 8px;
          line-height: 1.5;
        }
      }
    }
  }
}

// 使用场景部分
.use-cases-section {
  margin-top: 40px;

  .use-case-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .use-case-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .icon {
        font-size: 2rem;
        margin-right: 15px;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.5rem;
      }
    }

    p {
      color: #555;
      margin-bottom: 15px;
      font-size: 1.1rem;
    }

    .use-case-code {
      background-color: #f5f7fa;
      border-left: 4px solid @primary-color;
      padding: 15px;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      overflow: auto;
      border-radius: 0 6px 6px 0;
      margin: 0;
      line-height: 1.5;
    }
  }
}

// 注意事项部分
.notes-section {
  margin-top: 40px;

  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .note-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .note-icon {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    h3 {
      margin: 10px 0;
      color: @secondary-color;
      font-size: 1.3rem;
    }

    p {
      color: #555;
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.6;

      code {
        background-color: #f1f1f1;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
      }
    }
  }
}
</style>
