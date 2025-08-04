<template>
  <div class="flow-control-docs">
    <h1>JavaScript 流程控制全指南</h1>

    <div v-for="category in flowCategories" :key="category.type" class="category-card">
      <div class="category-header" :style="headerStyle(category.type)">
        <h2>{{ category.name }}</h2>
        <span class="badge">{{ category.items.length }}种用法</span>
      </div>

      <div class="item-container">
        <div v-for="item in category.items" :key="item.title" class="control-item">
          <div class="item-header">
            <h3>{{ item.title }}</h3>
            <span class="syntax-tag">{{ item.syntax }}</span>
          </div>

          <div class="item-body">
            <p class="description">{{ item.description }}</p>

            <div class="example-section">
              <h4>示例代码</h4>
              <pre class="example-code"><code>{{ item.example }}</code></pre>
              <p class="output">输出结果：{{ item.output }}</p>
            </div>

            <div v-if="item.notes" class="notes">
              <span class="warning-icon">⚠</span>
              {{ item.notes }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

type FlowControlType = 'conditional' | 'loop' | 'jump' | 'other'

interface FlowControlItem {
  title: string
  syntax: string
  description: string
  example: string
  output?: string
  notes?: string
}

interface FlowControlCategory {
  type: FlowControlType
  name: string
  items: FlowControlItem[]
}

const flowCategories = reactive<FlowControlCategory[]>([
  {
    type: 'conditional',
    name: '条件控制',
    items: [
      {
        title: 'if 语句',
        syntax: 'if (condition) { ... }',
        description: '基础条件判断，当条件为真时执行代码块',
        example: `let score = 85;
if (score > 60) {
  console.log('及格');
}`,
        output: "'及格'",
      },
      {
        title: 'if-else 语句',
        syntax: 'if (condition) { ... } else { ... }',
        description: '二选一执行路径',
        example: `let age = 18;
if (age >= 18) {
  console.log('成年人');
} else {
  console.log('未成年人');
}`,
        output: "'成年人'",
      },
      {
        title: 'else if 语句',
        syntax: 'if (condition) { ... } else if (condition) { ... }',
        description: '用于多个条件的判断',
        example: `let score = 75;
    if (score >= 90) {
      console.log('优秀');
    } else if (score >= 60) {
      console.log('及格');
    } else {
      console.log('不及格');
    }`,
        output: "'及格'",
      },
      {
        title: 'switch 语句',
        syntax: `switch(expression) {
  case value1:
    // code
    break;
  default:
    // code
}`,
        description: '多分支条件选择',
        example: `let day = 3;
switch(day) {
  case 1://可以穿透
  case 2: console.log('周一二'); break;
  case 3: console.log('周三'); break;
  case 4: console.log('周四'); break;
  default: console.log('其他');
}`,
        output: "'周三'",
        notes: '必须使用break防止case穿透',
      },
    ],
  },
  {
    type: 'loop',
    name: '循环控制',
    items: [
      {
        title: 'for 循环',
        syntax: 'for (init; condition; step) { ... }',
        description: '经典循环结构，适合已知循环次数的情况',
        example: `for (let i = 0; i < 3; i++) {
    console.log(i);
  }`,
        output: '0 1 2',
      },
      {
        title: 'while 循环',
        syntax: 'while (condition) { ... }',
        description: '条件前置循环，适合不确定循环次数的情况',
        example: `let count = 3;
  while (count-- > 0) {
    console.log(count);
  }`,
        output: '2 1 0',
      },
      {
        title: 'do...while 循环',
        syntax: 'do { ... } while (condition);',
        description: '条件后置循环，至少执行一次',
        example: `let count = 0;
  do {
    console.log(count);
    count++;
  } while (count < 3);`,
        output: '0 1 2',
      },
      {
        title: 'for...of 循环',
        syntax: 'for (const item of iterable) { ... }',
        description: '遍历可迭代对象（数组、字符串等）',
        example: `const colors = ['red', 'green', 'blue'];
  for (const color of colors) {
    console.log(color);
  }`,
        output: "'red' 'green' 'blue'",
      },
      {
        title: 'for...in 循环',
        syntax: 'for (const key in object) { ... }',
        description: '遍历对象的可枚举属性',
        example: `const obj = { a: 1, b: 2, c: 3 };
  for (const key in obj) {
    console.log(key, obj[key]);
  }`,
        output: "'a' 1, 'b' 2, 'c' 3",
      },
    ],
  },
  {
    type: 'jump',
    name: '流程跳转',
    items: [
      {
        title: 'break 语句',
        syntax: 'break [label];',
        description: '立即终止当前循环或switch语句',
        example: `for (let i = 0; i < 5; i++) {
  if (i === 3) break;
  console.log(i);
}`,
        output: '0 1 2',
      },
      {
        title: 'continue 语句',
        syntax: 'continue [label];',
        description: '跳过当前循环的剩余代码，进入下次迭代',
        example: `for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}`,
        output: '0 1 3 4',
      },
      {
        title: '标签语句',
        syntax: 'label: statement',
        description: '配合break/continue控制多层嵌套循环',
        example: `outer:
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer;
    console.log(i, j);
  }
}`,
        output: '0 0, 0 1, 0 2, 1 0',
      },
    ],
  },
  {
    type: 'other',
    name: '异常处理',
    items: [
      {
        title: 'try...catch 语句',
        syntax: 'try { ... } catch (error) { ... } finally { ... }',
        description: '捕获并处理代码执行过程中的异常',
        example: `try {
  // 可能抛出错误的代码
  throw new Error('发生错误');
} catch (error) {
  console.log(error.message);
} finally {
  // 无论是否发生错误都会执行
  console.log('清理工作');
}`,
        output: '发生错误\n清理工作',
      },
      {
        title: 'throw 语句',
        syntax: 'throw expression;',
        description: '抛出一个用户自定义的异常',
        example: `function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为0');
  }
  return a / b;
}`,
        output: 'Error: 除数不能为0',
      }
    ]
  }
])

const headerStyle = (type: FlowControlType) => ({
  backgroundColor: {
    conditional: '#3498db',
    loop: '#2ecc71',
    jump: '#e67e22',
    other: '#9b59b6',
  }[type],
})
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Roboto:wght@300;500&display=swap');

span {
  color: #fff;
}

.flow-control-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2.5rem;
    font-size: 2.4rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .category-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2.5rem;
    overflow: hidden;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-3px);
    }

    .category-header {
      padding: 1.2rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;

      h2 {
        margin: 0;
        font-size: 1.6rem;
        font-weight: 600;
      }

      .badge {
        background: rgba(255, 255, 255, 0.2);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.9rem;
      }
    }

    .item-container {
      padding: 1.5rem 2rem;
    }

    .control-item {
      margin: 1.5rem 0;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      transition: box-shadow 0.2s;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .item-header {
        padding: 1rem 1.5rem;
        background: #f8f9fa;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          margin: 0;
          color: #34495e;
          font-size: 1.2rem;
        }

        .syntax-tag {
          font-family: 'Fira Code', monospace;
          background: #e0e0e0;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      }

      .item-body {
        padding: 1rem 1.5rem;

        .description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .example-section {
          margin: 1rem 0;

          h4 {
            color: #7f8c8d;
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
          }

          .example-code {
            background: #2d3436;
            color: #dfe6e9;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
          }

          .output {
            color: #27ae60;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            padding-left: 1rem;
          }
        }

        .notes {
          background: #fff3cd;
          color: #856404;
          padding: 0.8rem;
          border-radius: 4px;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .warning-icon {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
