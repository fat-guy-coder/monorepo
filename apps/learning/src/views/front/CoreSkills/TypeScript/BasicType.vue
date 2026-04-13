<template>
  <div class="ts-types-guide">
    <header class="guide-header">
      <h1 class="title">TypeScript 基础类型系统</h1>
      <p class="subtitle">JavaScript的超集，静态类型检查的强大工具</p>
    </header>

    <div class="types-container">
      <!-- 基本类型 -->
      <section class="type-section">
        <h2 class="section-title">🎯 基本原始类型</h2>
        <div class="type-grid">
          <TypeCard v-for="type in primitiveTypes" :key="type.name" :type="type" />
        </div>
      </section>

      <!-- 特殊类型 -->
      <section class="type-section">
        <h2 class="section-title">✨ 特殊基础类型</h2>
        <div class="type-grid">
          <TypeCard v-for="type in specialTypes" :key="type.name" :type="type" />
        </div>
      </section>

      <section class="type-section any-unknown-section">
        <h2 class="section-title">🧐 any vs unknown 区别</h2>
        <div class="any-unknown-grid">
          <div class="any-unknown-card">
            <h3>any</h3>
            <p>
              <code>any</code> 类型允许你绕过类型检查，赋值给 <strong>任何类型</strong> 的变量或参数。使用 <code>any</code> 后，TypeScript
              不会对该值进行类型检查，极大地降低了类型系统的安全性。
            </p>
            <pre><code>let value: any = 123;
value = "hello";
value = false;

let str: string = value; // ✅ 允许，完全跳过类型检查
</code></pre>
            <ul>
              <li>适合快速原型开发或迁移老项目</li>
              <li>类型安全性低，建议谨慎使用</li>
            </ul>
          </div>
          <div class="any-unknown-card">
            <h3>unknown</h3>
            <p>
              <code>unknown</code> 也是顶级类型，可以接受任何类型的值。但与 <code>any</code>
              不同，<strong>不能直接赋值给其他类型</strong>，必须先进行类型检查或类型断言，类型安全性更高。
            </p>
            <pre><code>let input: unknown = "hello";
input = 42;

let str2: string = input; // ❌ 报错，需类型断言
if (typeof input === "string") {
  str2 = input; // ✅ 类型缩小后可赋值
}
</code></pre>
            <ul>
              <li>推荐用于不确定类型的外部数据（如API返回值）</li>
              <li>强制类型检查，提升类型安全</li>
            </ul>
          </div>
        </div>
        <div class="any-unknown-summary">
          <strong>总结：</strong>
          <span><code>any</code> 放弃类型检查，<code>unknown</code> 强制类型检查。实际开发中，优先考虑 <code>unknown</code>，避免滥用
            <code>any</code>。</span>
        </div>
      </section>
      <!-- 引用类型 -->
      <section class="type-section">
        <h2 class="section-title">🧩 引用类型</h2>
        <div class="type-grid">
          <TypeCard v-for="type in referenceTypes" :key="type.name" :type="type" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import TypeCard from './Components/TypeCard.vue'

interface TypeExample {
  name: string
  code: string
  description: string
  scenarios: string[]
}

const primitiveTypes: TypeExample[] = [
  {
    name: 'number',
    code: `let age: number = 25
let price: number = 9.99
let hex: number = 0xf00d`,
    description: '表示数字类型，包括整数和浮点数',
    scenarios: ['年龄/价格等数值计算', '数学运算结果', '需要精确计算的场景']
  },
  {
    name: 'string',
    code: `let name: string = 'Alice'
let sentence: string = \`Hello, \${name}!\`
let color: string = "blue"`,
    description: '表示文本数据类型，可以使用单引号、双引号或模板字符串',
    scenarios: ['用户输入处理', 'UI文本展示', '字符串拼接操作']
  },
  {
    name: 'boolean',
    code: `let isDone: boolean = false
let hasValue: boolean = Boolean(1)
let isActive = true  // 类型推断`,
    description: '表示逻辑值 true/false',
    scenarios: ['条件判断', '开关状态', '表单验证结果']
  },
  {
    name: 'symbol',
    code: `const sym1 = Symbol()
const sym2 = Symbol('description')
const objKey = Symbol('unique')`,
    description: '表示唯一的常量值，常用于对象属性键',
    scenarios: ['创建唯一标识符', '防止属性名冲突', '高级对象模式']
  }
]

const specialTypes: TypeExample[] = [
  {
    name: 'any',
    code: `let dynamic: any = 4
dynamic = 'maybe a string'
dynamic = false  // 可以随意改变类型`,
    description: '任意类型，关闭类型检查',
    scenarios: ['迁移JS项目', '处理第三方库', '暂时无法确定类型']
  },
  {
    name: 'unknown',
    code: `let notSure: unknown = 4
notSure = 'maybe a string'
// notSure.toFixed()  // 错误：需要类型检查`,
    description: '类型安全的any，操作前需要类型断言或检查',
    scenarios: ['API响应处理', '用户输入验证', '比any更安全的替代']
  },
  {
    name: 'void',
    code: `function warn(): void {
  console.log('Warning!')
}
let unusable: void = undefined`,
    description: '表示没有返回值的函数',
    scenarios: ['函数无返回值', '事件处理函数', '副作用操作']
  },
  {
    name: 'never',
    code: `function error(message: string): never {
  throw new Error(message)
}
function infiniteLoop(): never {
  while(true) {}
}`,
    description: '表示永远不会返回的值',
    scenarios: ['总是抛出错误的函数', '无限循环', '类型收窄的穷尽检查']
  }
]

const referenceTypes: TypeExample[] = [
  {
    name: 'array',
    code: `let list: number[] = [1, 2, 3]
let names: Array<string> = ['a', 'b']
let matrix: number[][] = [[1,2], [3,4]]`,
    description: '表示同类型元素的集合',
    scenarios: ['数据列表处理', '表格数据存储', '需要迭代操作的场景']
  },
  {
    name: 'tuple',
    code: `let point: [number, number] = [10, 20]
let person: [string, number] = ['Alice', 25]
const rgb: [number, number, number] = [255, 0, 0]`,
    description: '固定长度和类型的数组',
    scenarios: ['React useState返回值', '坐标点表示', '严格结构的数据']
  },
  {
    name: 'object',
    code: `let user: {
  name: string;
  age?: number
} = { name: 'Alice' }

interface Point {
  x: number
  y: number
}`,
    description: '非原始类型的对象',
    scenarios: ['复杂数据结构', 'API响应对象', '配置参数定义']
  },
  {
    name: 'enum',
    code: `enum Direction {
  Up = 'UP',
  Down = 'DOWN'
}
enum Color {
  Red,  // 0
  Green // 1
}`,
    description: '定义命名常量集合',
    scenarios: ['状态管理', '有限选项集合', '提高代码可读性']
  }
]
</script>

<style lang="less" scoped>
.ts-types-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #2d3748;
    font-weight: 800;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    font-weight: 400;
  }
}

.types-container {
  display: grid;
  gap: 3rem;
}

.type-section {
  h2 {
    font-size: 1.8rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.any-unknown-section {
  margin-top: 32px;
}

.any-unknown-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 16px;
}

.any-unknown-card {
  background: #f4f8fb;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  padding: 18px 20px;
  box-shadow: 0 1px 4px rgba(52, 152, 219, 0.06);
}

.any-unknown-card h3 {
  margin-top: 0;
  color: #2980b9;
  font-size: 1.1em;
}

.any-unknown-card pre {
  background: #eef6fa;
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 0.95em;
  margin: 10px 0;
  overflow-x: auto;
}

.any-unknown-card ul {
  margin: 8px 0 0 18px;
  padding: 0;
  color: #555;
  font-size: 0.97em;
}

.any-unknown-summary {
  background: #eafaf1;
  border-left: 4px solid #27ae60;
  border-radius: 6px;
  padding: 12px 18px;
  color: #218c5a;
  font-size: 1em;
}

@media (max-width: 800px) {
  .any-unknown-grid {
    grid-template-columns: 1fr;
  }
}
</style>