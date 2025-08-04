<template>
  <div class="number-docs-container">
    <header class="doc-header">
      <h1 class="gradient-title">ES6+ Number 新特性基本指南</h1>
      <p class="header-subtitle">现代JavaScript数值处理最佳实践</p>
    </header>

    <section class="method-section">
      <h2 class="section-title">🔧 number精度限制</h2>
      <div class="container">
        <p>整数（不使用小数点或指数计数法）最多为 15 位。</p>
        <p>小数的最大位数是 17，但是浮点运算并不总是 100% 准确</p>
      </div>
    </section>

    <!-- 核心方法展示 -->
    <section class="method-section">
      <h2 class="section-title">🔧 新增静态方法</h2>

      <div class="method-grid">
        <!-- 方法卡片 -->
        <div
          v-for="method in numberMethods"
          :key="method.name"
          class="method-card"
          :class="method.type"
        >
          <div class="method-header">
            <span class="method-icon">{{ method.icon }}</span>
            <h3 class="method-name">{{ method.name }}</h3>
          </div>
          <p class="method-desc">{{ method.description }}</p>
          <div class="method-example">
            <pre><code>{{ method.example }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增属性展示 -->
    <section class="property-section">
      <h2 class="section-title">📌 新增静态属性</h2>

      <div class="property-grid">
        <div v-for="prop in numberProperties" :key="prop.name" class="property-card">
          <div class="property-header">
            <span class="property-symbol">#</span>
            <h3>{{ prop.name }}</h3>
          </div>
          <p class="property-value">Value: {{ prop.value }}</p>
          <p class="property-usage">{{ prop.usage }}</p>
        </div>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section class="best-practice">
      <h2 class="section-title">🚀 最佳实践示例</h2>

      <div class="practice-grid">
        <div class="code-example">
          <h3>安全数值验证</h3>
          <pre><code>
interface NumberValidation {
  (value: unknown): boolean
}

const isSafeNumber: NumberValidation = (val) => {
  return typeof val === 'number' &&
    Number.isFinite(val) &&
    Math.abs(val) <= Number.MAX_SAFE_INTEGER
}
          </code></pre>
        </div>

        <div class="code-example">
          <h3>精度计算处理</h3>
          <pre><code>
const preciseAdd = (a: number, b: number): number => {
  const factor = 10 ** Math.max(
    String(a).split('.')[1]?.length || 0,
    String(b).split('.')[1]?.length || 0
  )
  return (a * factor + b * factor) / factor
}
          </code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 响应式数据
const numberMethods = [
  {
    name: 'Number.isNaN()',
    type: 'validation',
    icon: '✅',
    description: '安全检测NaN值，不会进行类型转换',
    example: 'Number.isNaN(NaN) // true\nNumber.isNaN("NaN") // false',
  },
  {
    name: 'Number.isFinite()',
    type: 'validation',
    icon: '🌐',
    description: '检测有限数值，过滤Infinity和NaN',
    example: 'Number.isFinite(Infinity) // false\nNumber.isFinite(42) // true',
  },
  {
    name: 'Number.isInteger()',
    type: 'check',
    icon: '🔢',
    description: '检测整数，自动过滤浮点数',
    example: 'Number.isInteger(5.0) // true\nNumber.isInteger(5.1) // false',
  },
  {
    name: 'Number.parseFloat()',
    type: 'conversion',
    icon: '🎯',
    description: '更规范的浮点数转换方法',
    example: "Number.parseFloat('42.5px') // 42.5",
  },
]

const numberProperties = [
  {
    name: 'EPSILON',
    value: Number.EPSILON,
    usage: '浮点数计算精度容差阈值',
  },
  {
    name: 'MAX_SAFE_INTEGER',
    value: Number.MAX_SAFE_INTEGER,
    usage: '最大安全整数 (2^53 - 1)',
  },
  {
    name: 'MIN_SAFE_INTEGER',
    value: Number.MIN_SAFE_INTEGER,
    usage: '最小安全整数 -(2^53 - 1)',
  },
]
</script>

<style scoped>
h2,
pre {
  color: #ffffff;
}
.number-docs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui;
}

.doc-header {
  text-align: center;
  margin-bottom: 3rem;
}

.gradient-title {
  background: linear-gradient(45deg, #3b82f6, #10b981);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2.5rem;
}

.header-subtitle {
  color: #64748b;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

.method-grid,
.property-grid,
.practice-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.method-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.method-card:hover {
  transform: translateY(-3px);
}

.method-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.method-icon {
  font-size: 1.8rem;
}

.method-name {
  color: #1e293b;
  margin: 0;
}

.method-desc {
  color: #64748b;
  line-height: 1.6;
}

.method-example pre {
  background: #1e293b;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.method-example code {
  font-family: 'JetBrains Mono', monospace;
  color: #cbd5e1;
  font-size: 0.9em;
}

.property-card {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
}

.property-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.property-symbol {
  background: #3b82f6;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.best-practice {
  margin-top: 3rem;
}

.code-example {
  background: #1e293b;
  padding: 1.5rem;
  border-radius: 12px;
}

.code-example h3 {
  color: #cbd5e1;
  margin-top: 0;
}

.method-card.validation {
  border-top: 4px solid #10b981;
}
.method-card.check {
  border-top: 4px solid #f59e0b;
}
.method-card.conversion {
  border-top: 4px solid #8b5cf6;
}
.container {
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
}
</style>
