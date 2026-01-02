<template>
  <div class="native-methods-container">
    <!-- 头部区域 -->
    <header class="hero">
      <div class="hero-content">
        <div class="icon">✍️</div>
        <h1>前端手写原生方法指南</h1>
        <p class="subtitle">掌握 JavaScript 核心功能的实现原理</p>
      </div>
    </header>

    <main class="content">
      <!-- 介绍部分 -->
      <section class="intro-section">
        <div class="intro-card">
          <h2>为什么手写原生方法？</h2>
          <div class="intro-grid">
            <div class="reason-card">
              <div class="icon">💡</div>
              <h3>深入理解原理</h3>
              <p>通过手写实现，深入理解JavaScript核心方法的内部工作原理</p>
            </div>
            <div class="reason-card">
              <div class="icon">⚙️</div>
              <h3>提升编码能力</h3>
              <p>锻炼逻辑思维和问题解决能力，提升JavaScript编程水平</p>
            </div>
            <div class="reason-card">
              <div class="icon">🧪</div>
              <h3>面试必备技能</h3>
              <p>大多数前端技术面试都会考察手写原生方法的能力</p>
            </div>
            <div class="reason-card">
              <div class="icon">🚀</div>
              <h3>优化性能</h3>
              <p>理解底层实现有助于编写更高效的代码和性能优化</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 难度评级 -->
      <section class="difficulty-section">
        <h2 class="section-title">方法难度评级</h2>
        <div class="difficulty-levels">
          <div
            v-for="(level, index) in difficultyLevels"
            :key="index"
            class="level-card"
            :style="{ borderLeft: `4px solid ${level.color}` }"
          >
            <div class="level-header">
              <div class="level-dot" :style="{ backgroundColor: level.color }"></div>
              <h3>{{ level.level }}</h3>
            </div>
            <div class="methods-list">
              <span v-for="(method, idx) in level.methods" :key="idx" class="method-tag">
                {{ method }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 热门方法 -->
      <section class="popular-section">
        <h2 class="section-title">热门手写方法</h2>
        <div class="popular-methods">
          <div v-for="(method, index) in popularMethods" :key="index" class="popular-card">
            <div class="method-icon">📝</div>
            <div class="method-name">{{ method }}</div>
            <div class="method-desc">
              {{ getMethodDescription(method) }}
            </div>
          </div>
        </div>
      </section>

      <!-- 分类展示 -->
      <section class="categories-section">
        <h2 class="section-title">原生方法分类</h2>
        <div class="categories-container">
          <div v-for="(category, index) in categories" :key="index" class="category-card">
            <div class="category-header">
              <h3>{{ category.name }}</h3>
              <div class="method-count">{{ category.methods.length }} 个方法</div>
            </div>
            <div class="methods-grid">
              <div
                v-for="(method, idx) in category.methods"
                :key="idx"
                class="method-item"
                :class="{ popular: popularMethods.includes(method) }"
              >
                {{ method }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 学习建议 -->
      <section class="advice-section">
        <h2 class="section-title">学习建议</h2>
        <div class="advice-container">
          <div class="advice-card">
            <div class="advice-icon">1</div>
            <h3>从基础开始</h3>
            <p>先掌握简单的数组和字符串方法，如 push、pop、slice 等</p>
          </div>
          <div class="advice-card">
            <div class="advice-icon">2</div>
            <h3>理解核心概念</h3>
            <p>重点学习 this 绑定、闭包、递归等核心JavaScript概念</p>
          </div>
          <div class="advice-card">
            <div class="advice-icon">3</div>
            <h3>练习高阶函数</h3>
            <p>掌握 map、filter、reduce 等高阶函数的手写实现</p>
          </div>
          <div class="advice-card">
            <div class="advice-icon">4</div>
            <h3>异步编程</h3>
            <p>挑战 Promise 相关方法和 async/await 的实现</p>
          </div>
          <div class="advice-card">
            <div class="advice-icon">5</div>
            <h3>深入原型</h3>
            <p>学习 Object.create、new 关键字等原型相关方法的实现</p>
          </div>
          <div class="advice-card">
            <div class="advice-icon">6</div>
            <h3>测试验证</h3>
            <p>使用测试用例验证手写方法的正确性和边界情况</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>掌握原理，提升编码能力，应对技术面试挑战</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// 原生方法分类数据
const categories = ref([
  {
    name: '数组方法',
    methods: [
      'Array.prototype.map()',
      'Array.prototype.filter()',
      'Array.prototype.reduce()',
      'Array.prototype.forEach()',
      'Array.prototype.find()',
      'Array.prototype.findIndex()',
      'Array.prototype.some()',
      'Array.prototype.every()',
      'Array.prototype.flat()',
      'Array.prototype.flatMap()',
      'Array.prototype.sort()',
      'Array.prototype.includes()',
      'Array.prototype.concat()',
      'Array.prototype.slice()',
      'Array.prototype.splice()',
      'Array.prototype.push()',
      'Array.prototype.pop()',
      'Array.prototype.shift()',
      'Array.prototype.unshift()',
      'Array.prototype.reverse()',
      'Array.prototype.join()',
      'Array.prototype.indexOf()',
      'Array.prototype.lastIndexOf()',
    ],
  },
  {
    name: '对象方法',
    methods: [
      'Object.keys()',
      'Object.values()',
      'Object.entries()',
      'Object.assign()',
      'Object.create()',
      'Object.defineProperty()',
      'Object.defineProperties()',
      'Object.freeze()',
      'Object.seal()',
      'Object.preventExtensions()',
      'Object.getOwnPropertyDescriptor()',
      'Object.getOwnPropertyNames()',
      'Object.getPrototypeOf()',
      'Object.setPrototypeOf()',
      'Object.is()',
      'Object.fromEntries()',
    ],
  },
  {
    name: '字符串方法',
    methods: [
      'String.prototype.charAt()',
      'String.prototype.charCodeAt()',
      'String.prototype.concat()',
      'String.prototype.includes()',
      'String.prototype.endsWith()',
      'String.prototype.indexOf()',
      'String.prototype.lastIndexOf()',
      'String.prototype.localeCompare()',
      'String.prototype.match()',
      'String.prototype.matchAll()',
      'String.prototype.padEnd()',
      'String.prototype.padStart()',
      'String.prototype.repeat()',
      'String.prototype.replace()',
      'String.prototype.replaceAll()',
      'String.prototype.search()',
      'String.prototype.slice()',
      'String.prototype.split()',
      'String.prototype.startsWith()',
      'String.prototype.substring()',
      'String.prototype.toLowerCase()',
      'String.prototype.toUpperCase()',
      'String.prototype.trim()',
      'String.prototype.trimEnd()',
      'String.prototype.trimStart()',
    ],
  },
  {
    name: '函数方法',
    methods: [
      'Function.prototype.apply()',
      'Function.prototype.bind()',
      'Function.prototype.call()',
      'Function.prototype.toString()',
    ],
  },
  {
    name: '数字方法',
    methods: [
      'Number.isNaN()',
      'Number.isFinite()',
      'Number.isInteger()',
      'Number.isSafeInteger()',
      'Number.parseFloat()',
      'Number.parseInt()',
      'Number.prototype.toFixed()',
      'Number.prototype.toExponential()',
      'Number.prototype.toPrecision()',
      'Number.prototype.toString()',
      'Math.abs()',
      'Math.ceil()',
      'Math.floor()',
      'Math.round()',
      'Math.max()',
      'Math.min()',
      'Math.random()',
      'Math.pow()',
      'Math.sqrt()',
      'Math.sin()',
      'Math.cos()',
      'Math.tan()',
      'Math.log()',
      'Math.exp()',
    ],
  },
  {
    name: '日期方法',
    methods: [
      'Date.now()',
      'Date.parse()',
      'Date.UTC()',
      'Date.prototype.getDate()',
      'Date.prototype.getDay()',
      'Date.prototype.getFullYear()',
      'Date.prototype.getHours()',
      'Date.prototype.getMilliseconds()',
      'Date.prototype.getMinutes()',
      'Date.prototype.getMonth()',
      'Date.prototype.getSeconds()',
      'Date.prototype.getTime()',
      'Date.prototype.getTimezoneOffset()',
      'Date.prototype.setDate()',
      'Date.prototype.setFullYear()',
      'Date.prototype.setHours()',
      'Date.prototype.setMilliseconds()',
      'Date.prototype.setMinutes()',
      'Date.prototype.setMonth()',
      'Date.prototype.setSeconds()',
      'Date.prototype.setTime()',
      'Date.prototype.toISOString()',
      'Date.prototype.toLocaleDateString()',
      'Date.prototype.toLocaleString()',
      'Date.prototype.toLocaleTimeString()',
      'Date.prototype.toString()',
    ],
  },
  {
    name: 'Promise方法',
    methods: [
      'Promise.all()',
      'Promise.allSettled()',
      'Promise.any()',
      'Promise.race()',
      'Promise.reject()',
      'Promise.resolve()',
      'Promise.prototype.catch()',
      'Promise.prototype.finally()',
      'Promise.prototype.then()',
    ],
  },
  {
    name: 'JSON方法',
    methods: ['JSON.parse()', 'JSON.stringify()'],
  },
  {
    name: '其他工具方法',
    methods: [
      'Set.prototype.add()',
      'Set.prototype.delete()',
      'Set.prototype.has()',
      'Set.prototype.clear()',
      'Map.prototype.set()',
      'Map.prototype.get()',
      'Map.prototype.delete()',
      'Map.prototype.has()',
      'Map.prototype.clear()',
      'ArrayBuffer',
      'Int8Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'Int16Array',
      'Uint16Array',
      'Int32Array',
      'Uint32Array',
      'Float32Array',
      'Float64Array',
      'DataView',
      'Symbol.iterator',
      'Symbol.asyncIterator',
      'Symbol.toStringTag',
      'requestAnimationFrame()',
      'cancelAnimationFrame()',
      'setTimeout()',
      'setInterval()',
      'clearTimeout()',
      'clearInterval()',
    ],
  },
])

// 难度评级
const difficultyLevels = [
  {
    level: '简单',
    color: '#4CAF50',
    methods: [
      'Array.prototype.push()',
      'Array.prototype.pop()',
      'String.prototype.charAt()',
      'String.prototype.toUpperCase()',
      'Math.max()',
      'Math.min()',
    ],
  },
  {
    level: '中等',
    color: '#FFC107',
    methods: [
      'Array.prototype.map()',
      'Array.prototype.filter()',
      'Array.prototype.forEach()',
      'Object.keys()',
      'Object.assign()',
      'String.prototype.split()',
      'String.prototype.replace()',
      'Function.prototype.bind()',
    ],
  },
  {
    level: '困难',
    color: '#F44336',
    methods: [
      'Array.prototype.reduce()',
      'Array.prototype.flat()',
      'Promise.all()',
      'Promise.race()',
      'JSON.parse()',
      'JSON.stringify()',
      'Function.prototype.apply()',
      'Object.defineProperty()',
    ],
  },
  {
    level: '挑战',
    color: '#9C27B0',
    methods: [
      'Array.prototype.sort()',
      'Promise.allSettled()',
      'Object.create()',
      'Function.prototype.call()',
      'Generator函数',
      'Async/Await实现',
      'Proxy代理',
      'Reflect API',
    ],
  },
]

// 热门方法
const popularMethods = [
  'Array.prototype.map()',
  'Array.prototype.filter()',
  'Array.prototype.reduce()',
  'Object.keys()',
  'Object.assign()',
  'String.prototype.split()',
  'String.prototype.replace()',
  'Promise.all()',
  'JSON.parse()',
  'Function.prototype.bind()',
]
function getMethodDescription(method: string): string {
  const descriptions: Record<string, string> = {
    'Array.prototype.map()':
      '创建一个新数组，其结果是该数组中的每个元素调用一次提供的函数后的返回值',
    'Array.prototype.filter()': '创建一个新数组，其包含通过所提供函数实现的测试的所有元素',
    'Array.prototype.reduce()':
      '对数组中的每个元素执行一个提供的reducer函数，将其结果汇总为单个返回值',
    'Object.keys()': '返回一个由一个给定对象的自身可枚举属性组成的数组',
    'Object.assign()': '将所有可枚举属性的值从一个或多个源对象复制到目标对象',
    'String.prototype.split()': '使用指定的分隔符字符串将一个String对象分割成子字符串数组',
    'String.prototype.replace()': '返回一个由替换值替换部分或所有匹配项后的新字符串',
    'Promise.all()': '接收一个Promise的iterable类型，返回一个Promise实例',
    'JSON.parse()': '解析JSON字符串，构造由字符串描述的JavaScript值或对象',
    'Function.prototype.bind()':
      '创建一个新的函数，在bind被调用时，这个新函数的this被指定为bind的第一个参数',
  }

  return descriptions[method] || 'JavaScript核心方法，常用于数据处理和转换'
}
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #7209b7;
@background-color: #f8f9ff;
@card-bg: #ffffff;
@text-color: #2b2d42;
@text-light: #6c757d;
@border-color: #e2e8f0;
@success-color: #4cc9f0;
@warning-color: #f72585;
@info-color: #4895ef;

// 字体
@font-family:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  sans-serif;

// 混合
.shadow-card() {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.03),
    0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 10px 15px rgba(0, 0, 0, 0.05),
      0 4px 6px rgba(0, 0, 0, 0.05);
  }
}

.gradient-border() {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, @primary-color, @accent-color);
    border-radius: 4px 4px 0 0;
  }
}

// 全局样式
.native-methods-container {
  font-family: @font-family;
  background-color: @background-color;
  color: @text-color;
  line-height: 1.6;
  padding: 0;
  margin: 0;
  min-height: 100vh;
}

// 页头样式
.hero {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  padding: 4rem 1.5rem 5rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(transparent, @background-color);
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2.8rem;
    margin: 0 0 1rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.4rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }
}

// 内容区域
.content {
  max-width: 1200px;
  margin: -3rem auto 0;
  padding: 0 1.5rem 3rem;
  position: relative;
}

// 章节标题
.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: @primary-color;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid @border-color;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: @accent-color;
  }
}

// 介绍部分
.intro-section {
  margin-bottom: 3rem;
}

.intro-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  .shadow-card();

  h2 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.8rem;
  }
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.reason-card {
  background: lighten(@primary-color, 45%);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 1rem;
    color: @primary-color;
  }

  p {
    margin: 0;
    color: @text-light;
  }
}

// 难度评级
.difficulty-section {
  margin-bottom: 3rem;
}

.difficulty-levels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.level-card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  .shadow-card();
}

.level-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .level-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.75rem;
  }

  h3 {
    margin: 0;
    font-size: 1.3rem;
  }
}

.methods-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.method-tag {
  background: lighten(@background-color, 1%);
  border: 1px solid @border-color;
  border-radius: 4px;
  padding: 0.3rem 0.7rem;
  font-size: 0.85rem;
  color: @text-light;
}

// 热门方法
.popular-section {
  margin-bottom: 3rem;
}

.popular-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.popular-card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  .shadow-card();
  border-top: 3px solid @accent-color;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
}

.method-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: @primary-color;
}

.method-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: @primary-color;
  font-family: 'Fira Code', monospace;
}

.method-desc {
  color: @text-light;
  font-size: 0.95rem;
  line-height: 1.6;
}

// 分类展示
.categories-section {
  margin-bottom: 3rem;
}

.categories-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.category-card {
  background: @card-bg;
  border-radius: 10px;
  .shadow-card();
  overflow: hidden;
}

.category-header {
  background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 10%));
  color: white;
  padding: 1.2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.3rem;
  }
}

.method-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.8rem;
  padding: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.method-item {
  background: lighten(@background-color, 1%);
  border: 1px solid @border-color;
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 0.9rem;
  font-family: 'Fira Code', monospace;
  transition: all 0.2s ease;

  &:hover {
    background: lighten(@primary-color, 48%);
    border-color: @primary-color;
  }

  &.popular {
    position: relative;

    &::after {
      content: '热门';
      position: absolute;
      top: -8px;
      right: -8px;
      background: @warning-color;
      color: white;
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      border-radius: 20px;
      font-weight: bold;
    }
  }
}

// 学习建议
.advice-section {
  margin-bottom: 3rem;
}

.advice-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.advice-card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.8rem 1.5rem;
  .shadow-card();
  border-left: 4px solid @success-color;

  h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: @text-color;
  }

  p {
    margin: 0;
    color: @text-light;
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

.advice-icon {
  width: 36px;
  height: 36px;
  background: @success-color;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
}

// 页脚样式
.footer {
  text-align: center;
  padding: 2.5rem 1rem;
  margin-top: 3rem;
  background: @card-bg;
  border-top: 1px solid @border-color;
  color: @text-light;
  font-size: 0.95rem;

  p {
    margin: 0.4rem 0;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem 4rem;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }

  .methods-grid {
    grid-template-columns: 1fr;
  }

  .popular-card,
  .advice-card {
    padding: 1.2rem;
  }
}
</style>
