<template>
  <div class="object-creation-container">
    <header class="header">
      <h1>JavaScript对象创建方式</h1>
      <p class="subtitle">深入解析7种对象创建方法的原理与应用场景</p>
    </header>

    <div class="content">
      <section class="intro-section">
        <div class="intro-card">
          <h2>JavaScript对象基础</h2>
          <p>
            在JavaScript中，对象是语言的核心概念，几乎所有值都可以视为对象（除了原始类型）。对象是属性的集合，每个属性包含一个键和一个值。对象可以表示复杂的数据结构，是面向对象编程的基础。
          </p>
          <div class="object-representation">
            <div class="object-key">person</div>
            <div class="object-properties">
              <div class="property"><span class="key">name:</span> <span class="value">'张三'</span></div>
              <div class="property"><span class="key">age:</span> <span class="value">30</span></div>
              <div class="property"><span class="key">greet:</span> <span class="value">function() { ... }</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="methods-section">
        <div class="methods-tabs">
          <button v-for="(method, index) in methods" :key="index"
            :class="['tab-button', { 'active': activeTab === index }]" @click="activeTab = index">
            {{ method.name }}
          </button>
        </div>

        <div class="method-details">
          <div v-for="(method, index) in methods" :key="index" v-show="activeTab === index">
            <div class="method-header">
              <h2>{{ method.name }}</h2>
              <div class="method-tags">
                <span v-for="(tag, tagIndex) in method.tags" :key="tagIndex" :class="['tag', tag.toLowerCase()]">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="method-description">
              <p>{{ method.description }}</p>
            </div>

            <div class="method-content">
              <div class="code-example">
                <h3>代码示例</h3>
                <pre><code>{{ method.codeExample }}</code></pre>
              </div>

              <div class="details-grid">
                <div class="detail-card">
                  <div class="detail-icon">🔍</div>
                  <h3>原理</h3>
                  <p>{{ method.details.principle }}</p>
                </div>

                <div class="detail-card">
                  <div class="detail-icon">🎯</div>
                  <h3>适用场景</h3>
                  <ul>
                    <li v-for="(scenario, scenarioIndex) in method.details.scenarios" :key="scenarioIndex">
                      {{ scenario }}
                    </li>
                  </ul>
                </div>

                <div class="detail-card">
                  <div class="detail-icon">⚡</div>
                  <h3>性能特点</h3>
                  <p>{{ method.details.performance }}</p>
                </div>

                <div class="detail-card">
                  <div class="detail-icon">⚠️</div>
                  <h3>注意事项</h3>
                  <ul>
                    <li v-for="(note, noteIndex) in method.details.notes" :key="noteIndex">
                      {{ note }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2>对象创建方式比较</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="col-method">创建方式</div>
            <div class="col-prototype">原型链</div>
            <div class="col-inherit">继承支持</div>
            <div class="col-memory">内存使用</div>
            <div class="col-performance">创建性能</div>
            <div class="col-use">使用建议</div>
          </div>
          <div v-for="(method, index) in methods" :key="index" class="table-row"
            :class="{ 'active': activeTab === index }" @click="activeTab = index">
            <div class="col-method">{{ method.name }}</div>
            <div class="col-prototype">{{ method.comparison.prototype }}</div>
            <div class="col-inherit">{{ method.comparison.inheritance }}</div>
            <div class="col-memory">
              <div class="memory-bar" :style="{ width: method.comparison.memory + '%' }">
                {{ method.comparison.memory }}%
              </div>
            </div>
            <div class="col-performance">
              <div class="performance-bar" :style="{ width: method.comparison.performance + '%' }">
                {{ method.comparison.performance }}%
              </div>
            </div>
            <div class="col-use">{{ method.comparison.recommendation }}</div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2>对象创建最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card" v-for="(practice, index) in bestPractices" :key="index">
            <div class="practice-number">{{ index + 1 }}</div>
            <div class="practice-content">
              <h3>{{ practice.title }}</h3>
              <p>{{ practice.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>选择正确的对象创建方式可以使代码更高效、更易维护。根据具体需求选择最合适的对象创建方法。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const methods = ref([
  {
    name: "对象字面量",
    tags: ["最常用", "简单"],
    description: "使用花括号{}直接创建对象，是最简单直观的对象创建方式。",
    codeExample: `// 创建简单对象
const person = {
  name: '张三',
  age: 30,
  greet() {
    return \`你好，我是\${this.name}，今年\${this.age}岁\`;
  }
};

// 访问属性
console.log(person.name); // "张三"
console.log(person.greet()); // "你好，我是张三，今年30岁"`,
    details: {
      principle: "直接定义对象及其属性，创建的对象继承自Object.prototype。",
      scenarios: [
        "创建简单配置对象",
        "临时数据存储",
        "不需要多个实例的单次对象创建"
      ],
      performance: "创建速度最快，内存占用低。适合少量对象创建。",
      notes: [
        "每次创建都是新对象，无法复用原型方法",
        "不适合需要创建多个相似对象的场景"
      ]
    },
    comparison: {
      prototype: "Object.prototype",
      inheritance: "不支持",
      memory: 20,
      performance: 100,
      recommendation: "简单对象首选"
    }
  },
  {
    name: "new Object()",
    tags: ["构造函数", "基本"],
    description: "使用内置的Object构造函数创建对象，与对象字面量功能相同但更冗长。",
    codeExample: `// 创建空对象
const person = new Object();

// 添加属性
person.name = '李四';
person.age = 25;
person.greet = function() {
  return \`你好，我是\${this.name}\`;
};

// 或者传入属性描述
const car = new Object({
  brand: 'Toyota',
  model: 'Camry',
  year: 2022
});`,
    details: {
      principle: "调用Object构造函数创建空对象，然后添加属性。",
      scenarios: [
        "需要动态添加属性的场景",
        "与遗留代码兼容",
        "作为对象字面量的替代"
      ],
      performance: "性能与对象字面量相当，但语法更冗长。",
      notes: [
        "实际开发中较少使用，推荐使用对象字面量",
        "与对象字面量在功能上没有区别"
      ]
    },
    comparison: {
      prototype: "Object.prototype",
      inheritance: "不支持",
      memory: 20,
      performance: 95,
      recommendation: "不推荐使用"
    }
  },
  {
    name: "构造函数",
    tags: ["经典", "面向对象"],
    description: "使用自定义构造函数创建对象，可以创建多个相似对象。",
    codeExample: `// 定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.greet = function() {
    return \`你好，我是\${this.name}，今年\${this.age}岁\`;
  };
}

// 创建实例
const person1 = new Person('王五', 28);
const person2 = new Person('赵六', 32);

console.log(person1.greet()); // "你好，我是王五，今年28岁"
console.log(person2.greet()); // "你好，我是赵六，今年32岁"`,
    details: {
      principle: "使用new操作符调用函数，创建新对象并将其原型指向构造函数的prototype属性。",
      scenarios: [
        "需要创建多个相似对象",
        "需要封装和复用逻辑",
        "传统面向对象编程模式"
      ],
      performance: "创建速度中等，但每个实例包含方法的独立副本，内存占用较高。",
      notes: [
        "方法在每个实例上重复创建，浪费内存",
        "需要使用new关键字，否则this指向全局对象"
      ]
    },
    comparison: {
      prototype: "构造函数.prototype",
      inheritance: "支持（通过原型链）",
      memory: 70,
      performance: 75,
      recommendation: "传统项目中使用"
    }
  },
  {
    name: "Object.create()",
    tags: ["原型继承", "灵活"],
    description: "使用现有对象作为新对象的原型创建新对象。",
    codeExample: `// 原型对象
const personProto = {
  greet() {
    return \`你好，我是\${this.name}，今年\${this.age}岁\`;
  }
};

// 创建新对象并指定原型
const person = Object.create(personProto);
person.name = '周九';
person.age = 45;

console.log(person.greet()); // "你好，我是周九，今年45岁"

// 检查原型
console.log(Object.getPrototypeOf(person) === personProto); // true`,
    details: {
      principle: "创建一个新对象，使用现有对象作为新对象的原型。",
      scenarios: [
        "原型继承",
        "创建没有原型的对象（Object.create(null)）",
        "避免使用构造函数"
      ],
      performance: "性能良好，内存使用取决于原型对象的大小。",
      notes: [
        "可以创建没有原型的对象（纯净字典）",
        "需要手动添加属性",
        "适用于复杂原型链"
      ]
    },
    comparison: {
      prototype: "自定义对象/null",
      inheritance: "支持（原型委托）",
      memory: 40,
      performance: 80,
      recommendation: "原型继承场景"
    }
  },
  {
    name: "原型模式(寄生组合继承)",
    tags: ["高效", "共享方法"],
    description: "将方法定义在原型上，实现方法共享，减少内存消耗。",
    codeExample: `// 定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 在原型上添加方法
Person.prototype.greet = function() {
  return \`你好，我是\${this.name}，今年\${this.age}岁\`;
};

// 创建实例
const person1 = new Person('钱七', 35);
const person2 = new Person('孙八', 40);

console.log(person1.greet()); // "你好，我是钱七，今年35岁"
console.log(person2.greet()); // "你好，我是孙八，今年40岁"`,
    details: {
      principle: "通过构造函数的prototype属性共享方法，实例通过原型链访问方法。",
      scenarios: [
        "需要创建多个相似对象",
        "需要共享方法以节省内存",
        "实现基于原型的继承"
      ],
      performance: "创建速度快，内存占用低（方法共享）。",
      notes: [
        "需要正确理解原型链",
        "共享属性可能导致意外修改",
        "现代开发中推荐使用类语法"
      ]
    },
    comparison: {
      prototype: "构造函数.prototype",
      inheritance: "支持（原型链）",
      memory: 30,
      performance: 85,
      recommendation: "高效对象创建"
    }
  },
  {
    name: "工厂函数",
    tags: ["封装", "无new"],
    description: "使用函数封装对象创建过程，返回新对象。",
    codeExample: `// 工厂函数
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      return \`你好，我是\${this.name}，今年\${this.age}岁\`;
    }
  };
}

// 创建对象
const person1 = createPerson('吴十', 50);
const person2 = createPerson('郑十一', 55);

console.log(person1.greet()); // "你好，我是吴十，今年50岁"`,
    details: {
      principle: "函数内部创建并返回对象，不使用new操作符。",
      scenarios: [
        "需要创建多个相似对象",
        "避免使用new和this",
        "需要封装创建逻辑"
      ],
      performance: "性能与对象字面量相似，但增加了函数调用开销。",
      notes: [
        "无法使用instanceof检查类型",
        "每个对象包含方法的独立副本",
        "适合函数式编程"
      ]
    },
    comparison: {
      prototype: "Object.prototype",
      inheritance: "有限支持",
      memory: 60,
      performance: 70,
      recommendation: "函数式编程"
    }
  },
  {
    name: "类（ES6）",
    tags: ["现代", "推荐"],
    description: "ES6引入的类语法，是创建对象的现代推荐方式。",
    codeExample: `// 类定义
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 方法定义在原型上
  greet() {
    return \`你好，我是\${this.name}，今年\${this.age}岁\`;
  }

  // 静态方法
  static info() {
    return '这是一个Person类';
  }
}

// 创建实例
const person = new Person('黄十二', 60);
console.log(person.greet()); // "你好，我是黄十二，今年60岁"
console.log(Person.info()); // "这是一个Person类"

// 继承
class Employee extends Person {
  constructor(name, age, position) {
    super(name, age);
    this.position = position;
  }

  work() {
    return \`\${this.name}正在担任\${this.position}\`;
  }
}`,
    details: {
      principle: "类语法是构造函数的语法糖，方法定义在原型上。",
      scenarios: [
        "现代JavaScript开发",
        "需要类继承",
        "大型项目代码组织",
        "需要封装和抽象"
      ],
      performance: "性能与原型模式相当，现代JS引擎高度优化。",
      notes: [
        "本质仍是原型继承",
        "类声明不会提升（与函数不同）",
        "推荐使用类语法进行面向对象编程"
      ]
    },
    comparison: {
      prototype: "类.prototype",
      inheritance: "支持（extends）",
      memory: 35,
      performance: 90,
      recommendation: "现代开发首选"
    }
  }
]);

const bestPractices = ref([
  {
    title: "优先使用类语法",
    description: "在现代JavaScript项目中，优先使用ES6类语法，它提供了清晰的语法结构并支持继承。"
  },
  {
    title: "共享方法使用原型",
    description: "当需要创建多个实例时，将方法放在原型上以减少内存占用。"
  },
  {
    title: "简单对象用字面量",
    description: "对于不需要多个实例的简单对象，使用对象字面量是最直接的方式。"
  },
  {
    title: "避免在构造函数中定义方法",
    description: "在构造函数中定义方法会导致每个实例都有方法的副本，浪费内存。"
  },
  {
    title: "使用工厂函数封装创建逻辑",
    description: "当需要复杂的对象创建逻辑时，使用工厂函数封装创建过程。"
  },
  {
    title: "考虑使用Object.create()实现纯净字典",
    description: "当需要一个没有原型的纯净字典对象时，使用Object.create(null)。"
  }
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

// 颜色变量
@primary-color: #4a6cf7;
@primary-light: #e6eeff;
@secondary-color: #3a56d4;
@accent-color: #ff9800;
@text-color: #2c3e50;
@light-gray: #f8f9fc;
@border-color: #e0e6ed;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #4caf50;
@warning-color: #ffc107;

// 基础样式
.object-creation-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @secondary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #666;
    font-weight: 300;
  }
}

.content {
  display: grid;
  gap: 3rem;
}

.intro-section {
  .intro-card {
    background: @light-gray;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: @card-shadow;

    h2 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 0.5rem;
    }

    p {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }
}

.object-representation {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid @border-color;
  font-family: 'Roboto Mono', monospace;
  max-width: 400px;
  margin: 1rem auto 0;

  .object-key {
    font-weight: 700;
    color: @secondary-color;
    margin-bottom: 0.8rem;
  }

  .object-properties {
    padding-left: 1.5rem;
    border-left: 2px solid @primary-light;
  }

  .property {
    margin-bottom: 0.5rem;

    .key {
      color: #d35400;
      font-weight: 500;
    }

    .value {
      color: #2980b9;
    }
  }
}

.methods-section {
  .methods-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 1.5rem;

    .tab-button {
      background: @light-gray;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 30px;
      font-family: 'Noto Sans SC', sans-serif;
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: @primary-light;
        color: @primary-color;
      }

      &.active {
        background: @primary-color;
        color: white;
        box-shadow: 0 4px 10px rgba(@primary-color, 0.3);
      }
    }
  }

  .method-details {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: @card-shadow;
  }

  .method-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;

    h2 {
      color: @secondary-color;
      margin: 0 1rem 0.8rem 0;
      font-size: 1.8rem;
    }
  }

  .method-tags {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 0.8rem;

    .tag {
      font-size: 0.85rem;
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
      font-weight: 500;

      &.modern {
        background: #e3f2fd;
        color: #1565c0;
      }

      &.推荐 {
        background: #e8f5e9;
        color: #2e7d32;
      }

      &.简单,
      &.基本 {
        background: #fff8e1;
        color: #f57f17;
      }

      &.经典 {
        background: #f3e5f5;
        color: #6a1b9a;
      }

      &.高效,
      &.共享方法 {
        background: #e0f7fa;
        color: #00838f;
      }

      &.灵活 {
        background: #ffecb3;
        color: #ff8f00;
      }
    }
  }

  .method-description {
    margin-bottom: 1.8rem;

    p {
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .method-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .code-example {
    background: #f8f9fc;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid @border-color;

    h3 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    pre {
      margin: 0;
      background: #2d2d2d;
      border-radius: 6px;
      padding: 1.2rem;
      overflow-x: auto;

      code {
        font-family: 'Roboto Mono', monospace;
        color: #f8f8f2;
        font-size: 0.95rem;
        line-height: 1.6;

        .comment {
          color: #6a9955;
        }

        .string {
          color: #ce9178;
        }

        .keyword {
          color: #c586c0;
        }

        .function {
          color: #dcdcaa;
        }

        .number {
          color: #b5cea8;
        }
      }
    }
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .detail-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: @card-shadow;
    border-top: 3px solid @primary-color;

    .detail-icon {
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
    }

    h3 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 0.8rem;
      font-size: 1.3rem;
    }

    p,
    ul {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.7;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

.comparison-section {
  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid @accent-color;
  }
}

.comparison-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;

  .table-header {
    display: flex;
    background: @primary-color;
    color: white;
    font-weight: 500;
    padding: 1rem 1.5rem;

    .col-method {
      flex: 2;
      min-width: 150px;
    }

    .col-prototype {
      flex: 2;
    }

    .col-inherit {
      flex: 1;
    }

    .col-memory {
      flex: 2;
    }

    .col-performance {
      flex: 2;
    }

    .col-use {
      flex: 3;
    }
  }

  .table-row {
    display: flex;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid @border-color;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: @primary-light;
    }

    &.active {
      background: lighten(@primary-light, 2%);
      border-left: 3px solid @primary-color;
    }

    &:last-child {
      border-bottom: none;
    }

    >div {
      display: flex;
      align-items: center;
      font-size: 0.95rem;
    }

    .col-method {
      flex: 2;
      min-width: 150px;
      font-weight: 500;
      color: @secondary-color;
    }

    .col-prototype {
      flex: 2;
    }

    .col-inherit {
      flex: 1;
    }

    .col-memory {
      flex: 2;
    }

    .col-performance {
      flex: 2;
    }

    .col-use {
      flex: 3;
    }

    .memory-bar,
    .performance-bar {
      height: 24px;
      background: @primary-light;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.8rem;
      font-weight: 500;
      min-width: 50px;
      transition: width 0.5s ease;
    }

    .memory-bar {
      background: linear-gradient(to right, #4a6cf7, #3a56d4);
    }

    .performance-bar {
      background: linear-gradient(to right, #4caf50, #2e7d32);
    }
  }
}

.best-practices {
  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid @primary-color;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.8rem;
}

.practice-card {
  display: flex;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .practice-number {
    width: 60px;
    min-height: 100%;
    background: @primary-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .practice-content {
    padding: 1.5rem;

    h3 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 0.8rem;
      font-size: 1.25rem;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #555;
      line-height: 1.7;
    }
  }
}

.footer {
  margin-top: 3rem;
  padding: 1.5rem;
  text-align: center;
  background: @primary-light;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 500;
  color: @secondary-color;
  box-shadow: @card-shadow;
  border-top: 2px solid fade(@primary-color, 30%);
}

@media (max-width: 768px) {
  .object-creation-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .method-content {
    grid-template-columns: 1fr !important;
  }

  .details-grid {
    grid-template-columns: 1fr !important;
  }

  .comparison-table {
    overflow-x: auto;

    .table-header,
    .table-row {
      min-width: 800px;
    }
  }
}
</style>
