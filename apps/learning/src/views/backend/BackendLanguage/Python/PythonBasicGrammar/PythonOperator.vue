<template>
  <div class="operators-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>Python 运算符</h1>
        </div>
        <p class="subtitle">操作数据的符号 · 表达式的基础</p>
        <div class="divider"></div>
        <p class="intro-text">
          运算符用于对变量和值执行操作。Python 提供了丰富的运算符集合，
          理解它们的用法和优先级是编写正确逻辑的关键。
        </p>
      </div>
    </header>

    <!-- 运算符优先级速览 -->
    <section class="section-card priority-card">
      <div class="section-header">
        <span class="section-icon">📊</span>
        <h2>运算符优先级</h2>
      </div>
      <p class="priority-desc">从高到低排列，同一行优先级相同。不确定时请使用括号 <code>()</code> 明确意图。</p>
      <div class="priority-list">
        <div v-for="(level, index) in priorityLevels" :key="index" class="priority-level">
          <span class="level-badge">{{ index + 1 }}</span>
          <span class="level-operators">{{ level }}</span>
        </div>
      </div>
    </section>

    <!-- 运算符分类网格 -->
    <div class="categories-grid">
      <section v-for="category in operatorCategories" :key="category.name" class="category-card">
        <div class="category-header">
          <span class="category-icon">{{ category.icon }}</span>
          <h2>{{ category.name }}</h2>
        </div>
        <p class="category-desc">{{ category.description }}</p>
        <table class="operator-table">
          <thead>
            <tr>
              <th>运算符</th>
              <th>描述</th>
              <th>示例</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="op in category.operators" :key="op.symbol">
              <td><code>{{ op.symbol }}</code></td>
              <td>{{ op.desc }}</td>
              <td><code>{{ op.example }}</code></td>
            </tr>
          </tbody>
        </table>
        <div class="category-note" v-if="category.note">
          <span>💡 {{ category.note }}</span>
        </div>
      </section>
    </div>

    <!-- 底部提示 -->
    <footer class="guide-footer">
      <p>🧪 在交互式环境中尝试这些运算符，动手实践是最好的学习方式。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 运算符条目接口
interface Operator {
  symbol: string
  desc: string
  example: string
}

// 运算符分类接口
interface OperatorCategory {
  name: string
  icon: string
  description: string
  operators: Operator[]
  note?: string
}

// 运算符优先级数据（从高到低）
const priorityLevels: string[] = [
  '**',
  '+x, -x, ~x',
  '*, /, //, %',
  '+, -',
  '<<, >>',
  '&',
  '^',
  '|',
  '==, !=, >, <, >=, <=, is, is not, in, not in',
  'not',
  'and',
  'or',
  '=, +=, -=, *=, /=, //=, %=, **=, &=, |=, ^=, >>=, <<='
]

// 所有运算符分类数据
const operatorCategories: OperatorCategory[] = [
  {
    name: '算术运算符',
    icon: '➕',
    description: '用于执行基本的数学运算。',
    operators: [
      { symbol: '+', desc: '加法', example: '3 + 2 → 5' },
      { symbol: '-', desc: '减法', example: '5 - 2 → 3' },
      { symbol: '*', desc: '乘法', example: '3 * 4 → 12' },
      { symbol: '/', desc: '除法（结果为浮点数）', example: '7 / 2 → 3.5' },
      { symbol: '//', desc: '整除（向下取整）', example: '7 // 2 → 3' },
      { symbol: '%', desc: '取模（余数）', example: '7 % 2 → 1' },
      { symbol: '**', desc: '幂运算', example: '2 ** 3 → 8' }
    ],
    note: '除法 / 总是返回浮点数，整除 // 返回整数（若操作数均为整数）'
  },
  {
    name: '比较运算符',
    icon: '⚖️',
    description: '比较两个值，返回布尔值 True 或 False。',
    operators: [
      { symbol: '==', desc: '等于', example: '5 == 5 → True' },
      { symbol: '!=', desc: '不等于', example: '5 != 3 → True' },
      { symbol: '>', desc: '大于', example: '5 > 3 → True' },
      { symbol: '<', desc: '小于', example: '3 < 5 → True' },
      { symbol: '>=', desc: '大于等于', example: '5 >= 5 → True' },
      { symbol: '<=', desc: '小于等于', example: '3 <= 5 → True' }
    ],
    note: '支持链式比较：3 < x < 10'
  },
  {
    name: '赋值运算符',
    icon: '📝',
    description: '用于为变量赋值，复合赋值运算符可简化运算与赋值。',
    operators: [
      { symbol: '=', desc: '基本赋值', example: 'x = 5' },
      { symbol: '+=', desc: '加法赋值', example: 'x += 3 (等价 x = x + 3)' },
      { symbol: '-=', desc: '减法赋值', example: 'x -= 2' },
      { symbol: '*=', desc: '乘法赋值', example: 'x *= 4' },
      { symbol: '/=', desc: '除法赋值', example: 'x /= 2' },
      { symbol: '//=', desc: '整除赋值', example: 'x //= 3' },
      { symbol: '%=', desc: '取模赋值', example: 'x %= 2' },
      { symbol: '**=', desc: '幂赋值', example: 'x **= 3' }
    ]
  },
  {
    name: '逻辑运算符',
    icon: '🔀',
    description: '用于组合条件表达式，返回布尔值或操作数之一（短路求值）。',
    operators: [
      { symbol: 'and', desc: '逻辑与（两者为真才为真）', example: 'True and False → False' },
      { symbol: 'or', desc: '逻辑或（一者为真即为真）', example: 'True or False → True' },
      { symbol: 'not', desc: '逻辑非（取反）', example: 'not True → False' }
    ],
    note: '短路特性：and 左侧为假时不计算右侧，or 左侧为真时不计算右侧'
  },
  {
    name: '位运算符',
    icon: '🔢',
    description: '对整数的二进制位进行操作。',
    operators: [
      { symbol: '&', desc: '按位与', example: '5 & 3 (0101 & 0011) → 1' },
      { symbol: '|', desc: '按位或', example: '5 | 3 (0101 | 0011) → 7' },
      { symbol: '^', desc: '按位异或', example: '5 ^ 3 (0101 ^ 0011) → 6' },
      { symbol: '~', desc: '按位取反', example: '~5 → -6 (补码)' },
      { symbol: '<<', desc: '左移', example: '5 << 1 → 10' },
      { symbol: '>>', desc: '右移', example: '5 >> 1 → 2' }
    ],
    note: '位运算符仅适用于整数'
  },
  {
    name: '成员运算符',
    icon: '🔍',
    description: '测试序列（字符串、列表、元组等）中是否存在指定值。',
    operators: [
      { symbol: 'in', desc: '值在序列中', example: "'a' in 'apple' → True" },
      { symbol: 'not in', desc: '值不在序列中', example: "'b' not in 'apple' → True" }
    ],
    note: '字典中 in 检查的是键，而非值'
  },
  {
    name: '身份运算符',
    icon: '🆔',
    description: '比较两个对象的内存地址是否相同（是否为同一对象）。',
    operators: [
      { symbol: 'is', desc: '是同一个对象', example: 'a is b' },
      { symbol: 'is not', desc: '不是同一个对象', example: 'a is not b' }
    ],
    note: 'is 比较身份，== 比较值。小整数和短字符串可能被缓存，导致 is 结果出乎意料。'
  }
]
</script>

<style lang="less" scoped>
// ========== 简约现代变量 ==========
@primary-blue: #306998;
@primary-yellow: #FFD43B;
@bg-page: #f8fafc;
@card-bg: #ffffff;
@text-dark: #1e293b;
@text-soft: #475569;
@text-light: #64748b;
@border-light: #e2e8f0;
@code-bg: #1e293b;
@code-text: #e2e8f0;
@shadow-sm: 0 6px 14px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02);
@shadow-hover: 0 12px 24px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.02);
@border-radius-lg: 24px;
@border-radius-md: 16px;
@transition: all 0.2s ease;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.operators-guide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: @bg-page;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// ----- 头部 -----
.guide-header {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 2.2rem 2.5rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;

  .header-content {
    .title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.5rem;

      .python-icon {
        font-size: 3.2rem;
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, @primary-blue 0%, #1e4a6b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.3rem;
      font-weight: 500;
      color: @primary-blue;
      margin-bottom: 1rem;
    }

    .divider {
      width: 60px;
      height: 4px;
      background: @primary-yellow;
      border-radius: 4px;
      margin: 1.2rem 0 1.5rem;
    }

    .intro-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: @text-soft;
      max-width: 85%;
    }
  }
}

// ----- 通用卡片样式 -----
.section-card {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 1.8rem 2rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: @transition;

  &:hover {
    box-shadow: @shadow-hover;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
    border-bottom: 1.5px dashed @border-light;
    padding-bottom: 0.8rem;

    .section-icon {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 650;
      color: @text-dark;
    }
  }
}

// ----- 优先级卡片特殊样式 -----
.priority-card {
  .priority-desc {
    margin-bottom: 1.5rem;
    color: @text-soft;

    code {
      background: #ecfdf3;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      color: #0f5c3e;
    }
  }

  .priority-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .priority-level {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px dotted @border-light;

    .level-badge {
      width: 32px;
      height: 32px;
      background: @primary-blue;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9rem;
      flex-shrink: 0;
    }

    .level-operators {
      font-family: 'JetBrains Mono', monospace;
      color: @text-soft;
      font-size: 0.95rem;
    }
  }
}

// ----- 分类网格 -----
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.8rem;
}

.category-card {
  background: @card-bg;
  border-radius: @border-radius-md;
  padding: 1.6rem 1.6rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: @transition;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: @shadow-hover;
    transform: translateY(-2px);
  }

  .category-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0.5rem;

    .category-icon {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 650;
      color: @text-dark;
    }
  }

  .category-desc {
    font-size: 0.95rem;
    color: @text-soft;
    margin-bottom: 1.2rem;
  }

  .operator-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    margin-bottom: 1rem;

    th,
    td {
      padding: 0.6rem 0.4rem;
      text-align: left;
      border-bottom: 1px solid @border-light;
    }

    th {
      font-weight: 600;
      color: @primary-blue;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    td:first-child {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      color: #0f5c3e;
    }

    td:last-child {
      font-family: 'JetBrains Mono', monospace;
      color: @text-light;
      font-size: 0.85rem;
    }

    code {
      background: transparent;
      padding: 0;
    }
  }

  .category-note {
    margin-top: auto;
    padding-top: 0.8rem;
    border-top: 1px dashed @border-light;

    span {
      font-size: 0.85rem;
      color: @text-light;
      background: #fef3e7;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      display: inline-block;
    }
  }
}

// ----- 底部 -----
.guide-footer {
  text-align: center;
  margin-top: 0.5rem;

  p {
    background: @card-bg;
    display: inline-block;
    padding: 0.9rem 2.2rem;
    border-radius: 50px;
    box-shadow: @shadow-sm;
    border: 1px solid @border-light;
    color: @text-light;
  }
}

// ----- 响应式 -----
@media (max-width: 768px) {
  .operators-guide {
    padding: 1.2rem 1rem;
    gap: 1.5rem;
  }

  .guide-header {
    padding: 1.8rem 1.5rem;

    .header-content .title-row h1 {
      font-size: 2.2rem;
    }
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 1.5rem 1.2rem;
  }

  .priority-level .level-operators {
    font-size: 0.85rem;
    word-break: break-word;
  }
}
</style>
