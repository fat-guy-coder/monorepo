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

    <!-- Math.random() 底层实现机制 -->
    <section class="random-mechanism-card">
      <h3>🎲 Math.random() 底层实现机制</h3>
      <div class="mechanism-content">
        <div class="mechanism-overview">
          <h4>🔧 实现原理</h4>
          <p>Math.random() 使用伪随机数生成器(PRNG)算法，通常基于线性同余法(LCG)实现。</p>
        </div>

        <div class="algorithm-details">
          <h4>📊 线性同余法公式</h4>
          <div class="formula-box">
            <code>X<sub>n+1</sub> = (a × X<sub>n</sub> + c) mod m</code>
          </div>
          <div class="parameter-list">
            <div class="parameter-item">
              <span class="param-name">a (乘数):</span>
              <span class="param-value">通常选择较大的质数</span>
            </div>
            <div class="parameter-item">
              <span class="param-name">c (增量):</span>
              <span class="param-value">通常为奇数</span>
            </div>
            <div class="param-item">
              <span class="param-name">m (模数):</span>
              <span class="param-value">2<sup>32</sup> 或 2<sup>64</sup></span>
            </div>
            <div class="parameter-item">
              <span class="param-name">X<sub>0</sub> (种子):</span>
              <span class="param-value">初始值，通常基于时间戳</span>
            </div>
          </div>
        </div>

        <div class="implementation-steps">
          <h4>⚙️ 实现步骤</h4>
          <div class="step-list">
            <div class="step-item">
              <span class="step-number">1</span>
              <div class="step-content">
                <strong>种子初始化</strong>
                <p>使用当前时间戳、进程ID等作为初始种子值</p>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">2</span>
              <div class="step-content">
                <strong>线性变换</strong>
                <p>应用线性同余公式生成下一个随机数</p>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">3</span>
              <div class="step-content">
                <strong>归一化处理</strong>
                <p>将生成的整数除以模数，得到[0,1)区间的小数</p>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">4</span>
              <div class="step-content">
                <strong>精度控制</strong>
                <p>控制输出精度，通常为53位浮点数</p>
              </div>
            </div>
          </div>
        </div>

        <div class="browser-implementations">
          <h4>🌐 不同浏览器的实现</h4>
          <div class="browser-grid">
            <div class="browser-item">
              <div class="browser-header">
                <span class="browser-icon">🦊</span>
                <span class="browser-name">Firefox</span>
              </div>
              <p>使用 xorshift 算法，周期为 2<sup>128</sup>-1</p>
            </div>
            <div class="browser-item">
              <div class="browser-header">
                <span class="browser-icon">🌐</span>
                <span class="browser-name">Chrome</span>
              </div>
              <p>使用 xorshift128+ 算法，性能更优</p>
            </div>
            <div class="browser-item">
              <div class="browser-header">
                <span class="browser-icon">🦁</span>
                <span class="browser-name">Safari</span>
              </div>
              <p>基于 arc4random 算法，安全性更高</p>
            </div>
            <div class="browser-item">
              <div class="browser-header">
                <span class="browser-icon">⚡</span>
                <span class="browser-name">Edge</span>
              </div>
              <p>使用与Chrome相同的 xorshift128+ 算法</p>
            </div>
          </div>
        </div>

        <div class="security-considerations">
          <h4>🔒 安全性考虑</h4>
          <div class="security-list">
            <div class="security-item warning">
              <span class="security-icon">⚠️</span>
              <div class="security-content">
                <strong>不可用于加密</strong>
                <p>Math.random() 是伪随机数，可预测，不适合密码学应用</p>
              </div>
            </div>
            <div class="security-item info">
              <span class="security-icon">ℹ️</span>
              <div class="security-content">
                <strong>适合一般用途</strong>
                <p>游戏、动画、测试等场景使用完全安全</p>
              </div>
            </div>
            <div class="security-item success">
              <span class="security-icon">✅</span>
              <div class="security-content">
                <strong>加密需求使用</strong>
                <p>crypto.getRandomValues() 提供真随机数</p>
              </div>
            </div>
          </div>
        </div>

        <div class="code-example">
          <h4>💻 模拟实现示例</h4>
          <pre><code>class SimpleRandom {
  constructor(seed = Date.now()) {
    this.seed = seed;
  }

  // 简单的线性同余法实现
  next() {
    this.seed = (this.seed * 1664525 + 1013904223) % Math.pow(2, 32);
    return this.seed / Math.pow(2, 32);
  }

  // 生成指定范围的随机数
  random(min = 0, max = 1) {
    return min + (max - min) * this.next();
  }
}

// 使用示例
const random = new SimpleRandom();
console.log(random.random()); // [0, 1)
console.log(random.random(1, 10)); // [1, 10)</code></pre>
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
  name: 'MathDocumentation',
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
.random-mechanism-card,
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

/* Math.random() 机制样式 */
.random-mechanism-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mechanism-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mechanism-overview h4,
.algorithm-details h4,
.implementation-steps h4,
.browser-implementations h4,
.security-considerations h4,
.code-example h4 {
  color: #000;
  margin-bottom: 1rem;
  font-size: 1.2em;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.5rem;
}

.formula-box {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin: 1rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.formula-box code {
  font-size: 1.3em;
  color: #000;
  font-weight: 600;
}

.parameter-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.parameter-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.param-name {
  font-weight: 600;
  color: #ffd700;
  display: block;
  margin-bottom: 0.5rem;
}

.param-value {
  color: #ffffff;
  font-size: 0.9em;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.step-number {
  background: #ffd700;
  color: #333;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content strong {
  color: #ffd700;
  display: block;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #ffffff;
  margin: 0;
  font-size: 0.9em;
}

.browser-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.browser-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.browser-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.browser-icon {
  font-size: 1.5em;
}

.browser-name {
  font-weight: 600;
  color: #ffd700;
}

.browser-item p {
  color: #ffffff;
  font-size: 0.9em;
  margin: 0;
}

.security-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.security-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.security-item.warning {
  background: rgba(255, 193, 7, 0.2);
  border-color: rgba(255, 193, 7, 0.4);
}

.security-item.info {
  background: rgba(23, 162, 184, 0.2);
  border-color: rgba(23, 162, 184, 0.4);
}

.security-item.success {
  background: rgba(40, 167, 69, 0.2);
  border-color: rgba(40, 167, 69, 0.4);
}

.security-icon {
  font-size: 1.2em;
  flex-shrink: 0;
}

.security-content strong {
  color: #ffd700;
  display: block;
  margin-bottom: 0.5rem;
}

.security-content p {
  color: #ffffff;
  margin: 0;
  font-size: 0.9em;
}

.code-example pre {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.code-example code {
  color: #ffffff;
}
</style>
