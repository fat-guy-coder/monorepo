<template>
  <div class="math-docs-container">
    <h1 class="title">📐 JavaScript Math 对象文档</h1>

    <!-- 概述部分 -->
    <section class="overview-card">
      <h2 class="section-title">🔍 概述</h2>
      <p class="content">
        Math 是 JavaScript 内置的数学对象，提供基础数学函数和常量的访问。ES6+
        新增了多个实用方法，增强了数学计算能力。
      </p>
    </section>

    <!-- 基础属性 -->
    <section class="properties-card">
      <h3>🔢 常用属性</h3>
      <div class="grid-container">
        <div v-for="(desc, key) in mathConstants" :key="key" class="property-item">
          <span class="constant-name">Math.{{ key }}</span>
          <span class="constant-value">{{ desc.value.toFixed(5) }}</span>
          <p class="constant-desc">{{ desc.description }}</p>
        </div>
      </div>
    </section>

    <!-- 传统方法 -->
    <section class="methods-card">
      <h3>🛠️ 传统常用方法</h3>
      <div class="method-grid">
        <div v-for="method in basicMethods" :key="method.name" class="method-item">
          <div class="method-header">
            <span class="method-name">Math.{{ method.name }}({{ method.args }})</span>
            <span class="method-example">{{ method.example }}</span>
          </div>
          <p class="method-desc">{{ method.description }}</p>
        </div>
      </div>
    </section>

    <!-- ES6+ 新增方法 -->
    <section class="es6-methods-card">
      <h3>🚀 ES6+ 新增方法</h3>
      <div class="es6-grid">
        <div v-for="method in es6Methods" :key="method.name" class="es6-item">
          <div class="method-title">
            <span class="icon">✨</span>
            Math.{{ method.name }}()
          </div>
          <div class="method-detail">
            <p>{{ method.description }}</p>
            <pre><code>{{ method.examples.join('\n') }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-card">
      <h3>⚠️ 注意事项</h3>
      <ul>
        <li>浮点数计算存在精度问题，需注意舍入误差</li>
        <li>参数类型不符合要求时返回NaN</li>
        <li>ES6新增方法需考虑浏览器兼容性</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const mathConstants = reactive({
      PI: {
        value: Math.PI,
        description: '圆周率常数',
      },
      E: {
        value: Math.E,
        description: '自然对数的底数',
      },
      LN2: {
        value: Math.LN2,
        description: '2的自然对数',
      },
    })

    const basicMethods = reactive([
      {
        name: 'sqrt',
        args: 'x',
        example: 'Math.sqrt(9) → 3',
        description: '计算平方根',
      },
      {
        name: 'pow',
        args: 'x, y',
        example: 'Math.pow(2, 3) → 8',
        description: `计算x的y次幂
新写法 2**3 → 8`,
      },
      {
        name: 'abs',
        args: 'x',
        example: 'Math.abs(-5) → 5',
        description: '返回绝对值',
      },
      {
        name: 'ceil',
        args: 'x',
        example: 'Math.ceil(4.1) → 5',
        description: '向上取整',
      },
      {
        name: 'floor',
        args: 'x',
        example: 'Math.floor(4.9) → 4',
        description: '向下取整',
      },
      {
        name: 'random',
        args: '',
        example: 'Math.random() → 0~1',
        description: '生成[0,1)随机数',
      },
      {
        name: 'max',
        args: '...values',
        example: 'Math.max(1, 2, 3) → 3',
        description: '返回最大值',
      },
      {
        name: 'min',
        args: '...values',
        example: 'Math.min(1, 2, 3) → 1',
        description: '返回最小值',
      },
      {
        name: 'round',
        args: 'x',
        example: 'Math.round(4.5) → 5',
        description: '四舍五入',
      },
      {
        name: 'sin',
        args: 'x',
        example: 'Math.sin(Math.PI / 2) → 1',
        description: '计算正弦',
      },
      {
        name: 'cos',
        args: 'x',
        example: 'Math.cos(0) → 1',
        description: '计算余弦',
      },
      {
        name: 'tan',
        args: 'x',
        example: 'Math.tan(Math.PI / 4) → 1',
        description: '计算正切',
      },
      {
        name: 'log',
        args: 'x',
        example: 'Math.log(Math.E) → 1',
        description: '计算自然对数',
      },
      {
        name: 'exp',
        args: 'x',
        example: 'Math.exp(1) → 2.71828',
        description: '计算e的x次幂',
      },
      {
        name: 'sqrt',
        args: 'x',
        example: 'Math.sqrt(16) → 4',
        description: '计算平方根',
      },
      {
        name: 'cbrt',
        args: 'x',
        example: 'Math.cbrt(27) → 3',
        description: '计算立方根',
      },
      {
        name: 'hypot',
        args: '...values',
        example: 'Math.hypot(3, 4) → 5',
        description: '计算参数平方和的平方根',
      },
    ])

    const es6Methods = reactive([
      {
        name: 'trunc',
        description: '去除小数部分，保留整数',
        examples: ['Math.trunc(4.9)    // 4', 'Math.trunc(-4.1)   // -4'],
      },
      {
        name: 'sign',
        description: '判断数值符号',
        examples: ['Math.sign(5)      // 1', 'Math.sign(-5)     // -1', 'Math.sign(0)      // 0'],
      },
      {
        name: 'cbrt',
        description: '计算立方根',
        examples: ['Math.cbrt(27)     // 3', 'Math.cbrt(64)     // 4'],
      },
      {
        name: 'hypot',
        description: '计算参数平方和的平方根',
        examples: ['Math.hypot(3,4)   // 5', 'Math.hypot(5,12)  // 13'],
      },
    ])

    return { mathConstants, basicMethods, es6Methods }
  },
})
</script>

<style scoped>
.math-docs-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Segoe UI', system-ui;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

/* 卡片通用样式 */
.overview-card,
.properties-card,
.methods-card,
.es6-methods-card,
.notice-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.property-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  transition: transform 0.2s;
}

.property-item:hover {
  transform: translateY(-2px);
}

.constant-name {
  font-weight: 600;
  color: #34495e;
}

.constant-value {
  float: right;
  color: #3498db;
}

.method-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.method-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.es6-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.es6-item {
  background: #f4f5f7;
  border-left: 4px solid #3498db;
  padding: 1rem;
  border-radius: 6px;
}

pre {
  background: #282c34;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
}

code {
  font-family: 'Fira Code', monospace;
  color: #abb2bf;
  font-size: 0.9em;
}

.notice-card {
  background: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.method-title {
  font-size: 1.1em;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.icon {
  margin-right: 0.5rem;
}
</style>
