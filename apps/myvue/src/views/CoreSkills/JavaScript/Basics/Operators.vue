<template>
  <div class="operator-docs">
    <h1>JavaScript 运算符全解</h1>

    <div v-for="category in operatorCategories" :key="category.name" class="category-card">
      <h2 :class="`category-header ${category.className}`">{{ category.name }}</h2>
      <div class="operator-list">
        <div v-for="op in category.operators" :key="op.symbol" class="operator-item">
          <div class="symbol-box">
            <span class="operator-symbol">{{ op.symbol }}</span>
            <span class="operator-name">{{ op.name }}</span>
          </div>
          <p class="operator-desc">{{ op.description }}</p>
          <pre class="example-code"><code>{{ op.example }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Operator {
  name: string
  symbol: string
  description: string
  example: string
}

interface OperatorCategory {
  name: string
  className: string
  operators: Operator[]
}

const operatorCategories = reactive<OperatorCategory[]>([
  {
    name: '算术运算符',
    className: 'arithmetic',
    operators: [
      { symbol: '+', name: '加法', description: '对两个操作数进行加法运算', example: '5 + 3 // 8' },
      { symbol: '-', name: '减法', description: '对两个操作数进行减法运算', example: '5 - 3 // 2' },
      {
        symbol: '*',
        name: '乘法',
        description: '对两个操作数进行乘法运算',
        example: '5 * 3 // 15',
      },
      { symbol: '/', name: '除法', description: '对两个操作数进行除法运算', example: '6 / 2 // 3' },
      { symbol: '%', name: '取余', description: '返回除法运算的余数', example: '7 % 3 // 1' },
      { symbol: '**', name: '幂运算', description: '计算基数的指数次幂', example: '2 ** 3 // 8' },
      // ... existing code ...
      {
        symbol: '++',
        name: '自增',
        description: '将操作数的值增加1',
        example:
          'let a = 5; a++  ++a// a is 6 i++	后置自增	先返回当前值，再自增	返回原值  ++i	前置自增	先自增，再返回新值	返回新值',
      },
      {
        symbol: '--',
        name: '自减',
        description: '将操作数的值减少1',
        example: 'let a = 5; a--  --a// a is 4',
      },
      // ... existing code ...
    ],
  },
  {
    name: '比较运算符',
    className: 'comparison',
    operators: [
      {
        symbol: '==',
        name: '等于',
        description: '比较值是否相等（自动类型转换）',
        example: "'5' == 5 // true",
      },
      {
        symbol: '===',
        name: '严格等于',
        description: '比较值和类型是否相等',
        example: "'5' === 5 // false",
      },
      {
        symbol: '!=',
        name: '不等于',
        description: '值不相等（自动类型转换）',
        example: "'5' != 5 // false",
      },
      {
        symbol: '!==',
        name: '严格不等于',
        description: '值或类型不相等',
        example: "'5' !== 5 // true",
      },
      {
        symbol: '>',
        name: '大于',
        description: '左操作数是否大于右操作数',
        example: '5 > 3 // true',
      },
      {
        symbol: '<',
        name: '小于',
        description: '左操作数是否小于右操作数',
        example: '5 < 3 // false',
      },
    ],
  },
  {
    name: '逻辑运算符',
    className: 'logical',
    operators: [
      {
        symbol: '&&',
        name: '逻辑与',
        description: '两个操作数都为true时返回true',
        example: 'true && false // false',
      },
      {
        symbol: '||',
        name: '逻辑或',
        description: '任一操作数为true时返回true',
        example: 'true || false // true',
      },
      { symbol: '!', name: '逻辑非', description: '反转操作数的布尔值', example: '!true // false' },
    ],
  },
  {
    name: '赋值运算符',
    className: 'assignment',
    operators: [
      {
        symbol: '=',
        name: '赋值',
        description: '将右侧的值赋给左侧的变量',
        example: 'let a = 5 // a is 5',
      },
      {
        symbol: '+=',
        name: '加赋值',
        description: '将右侧的值加到左侧的变量上',
        example: 'a += 3 // a is 8',
      },
      {
        symbol: '-=',
        name: '减赋值',
        description: '从左侧的变量中减去右侧的值',
        example: 'a -= 2 // a is 6',
      },
      {
        symbol: '*=',
        name: '乘赋值',
        description: '将左侧的变量乘以右侧的值',
        example: 'a *= 2 // a is 12',
      },
      {
        symbol: '/=',
        name: '除赋值',
        description: '将左侧的变量除以右侧的值',
        example: 'a /= 3 // a is 4',
      },
      {
        symbol: '%=',
        name: '取余赋值',
        description: '将左侧的变量取余右侧的值',
        example: 'a %= 5 // a is 4',
      },
    ],
  },
  {
    name: '三元运算符',
    className: 'ternary',
    operators: [
      {
        symbol: '?',
        name: '三元运算符',
        description: '根据条件返回不同的值',
        example: 'a ? b : c',
      },
    ],
  },
  {
    name: '位运算符',
    className: 'bitwise',
    operators: [
      {
        symbol: '&',
        name: '按位与',
        description: '对两个操作数的每个位进行与运算',
        example: '5 & 3 // 1',
      },
      {
        symbol: '|',
        name: '按位或',
        description: '对两个操作数的每个位进行或运算',
        example: '5 | 3 // 7',
      },
      {
        symbol: '^',
        name: '按位异或',
        description: '对两个操作数的每个位进行异或运算',
        example: '5 ^ 3 // 6',
      },
      {
        symbol: '~',
        name: '按位非',
        description: '对操作数的每个位进行取反',
        example: '~5 // -6',
      },
      {
        symbol: '<<',
        name: '左移',
        description: '将操作数的位向左移动指定的位数',
        example: '5 << 1 // 10',
      },
      {
        symbol: '>>',
        name: '右移',
        description: '将操作数的位向右移动指定的位数',
        example: '5 >> 1 // 2',
      },
    ],
  },
])
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;500&family=Roboto:wght@300;500&display=swap');

.operator-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }

  .category-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    overflow: hidden;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-5px);
    }

    .category-header {
      padding: 1rem 2rem;
      margin: 0;
      font-size: 1.5rem;
      color: white;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 5px;
      }

      &.arithmetic {
        background: #3498db;
      }

      &.comparison {
        background: #2ecc71;
      }

      &.logical {
        background: #e67e22;
      }

      &.assignment {
        background: #f312bb;
      }

      &.ternary {
        background: #43da82;
      }

      &.bitwise {
        background: #e67e22;
      }
    }

    .operator-list {
      padding: 1rem 2rem;
    }

    .operator-item {
      margin: 1.5rem 0;
      padding: 1rem;
      border-radius: 6px;
      background: #f8f9fa;

      .symbol-box {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;

        .operator-symbol {
          font-family: 'Roboto Mono', monospace;
          font-size: 1.8rem;
          font-weight: 500;
          color: #2c3e50;
        }

        .operator-name {
          font-size: 1.2rem;
          color: #34495e;
        }
      }

      .operator-desc {
        color: #7f8c8d;
        margin: 0.5rem 0;
        line-height: 1.6;
      }

      .example-code {
        background: #2c3e50;
        color: #ecf0f1;
        padding: 0.8rem;
        border-radius: 4px;
        margin: 0.5rem 0;
        overflow-x: auto;

        code {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9rem;
        }
      }

      &:not(:last-child) {
        border-bottom: 2px solid #e0e0e0;
      }
    }
  }
}
</style>
