<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">🧮</span>
          JavaScript BigInt 基本指南
        </h1>
        <p class="page-subtitle">大整数运算解决方案</p>
      </header>

      <!-- 基本用法 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔧</span>
            基本使用方法
          </h2>
        </div>
        <div class="usage-grid">
          <div class="usage-card">
            <div class="card-header">
              <span class="icon">🔢</span>
              <h3>创建方式</h3>
            </div>
            <pre class="code-block"><code>const big1 = 12345678901234567890n; // 字面量
const big2 = BigInt("9007199254740993"); // 构造函数
const hex = 0x1fffffffffffffn; // 十六进制
const binary = 0b10111111111111111n; // 二进制</code></pre>
          </div>

          <div class="usage-card">
            <div class="card-header">
              <span class="icon">⚡</span>
              <h3>基本运算</h3>
            </div>
            <pre class="code-block"><code>const a = 10n;
const b = 20n;

console.log(a + b); // 30n
console.log(b / a); // 2n
console.log(a ** 3n); // 1000n
console.log(5n % 2n); // 1n</code></pre>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">💼</span>
            典型使用场景
          </h2>
        </div>
        <div class="case-grid">
          <div class="case-card">
            <div class="case-icon">🏦</div>
            <h3>金融计算</h3>
            <p>高精度货币计算，避免浮点误差</p>
            <pre class="code-block"><code>const cents = 12345678901234567890n; // 以分为单位</code></pre>
          </div>

          <div class="case-card">
            <div class="case-icon">⏱️</div>
            <h3>时间戳处理</h3>
            <p>处理微秒级时间戳计算</p>
            <pre class="code-block"><code>const timestamp = 1640995200000000n;</code></pre>
          </div>

          <div class="case-card">
            <div class="case-icon">🔐</div>
            <h3>密码学运算</h3>
            <p>大素数计算和加密算法</p>
            <pre class="code-block"><code>const prime = 957496696762772407663n;</code></pre>
          </div>
        </div>
      </div>

      <!-- 注意事项 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">⚠️</span>
            重要注意事项
          </h2>
        </div>
        <div class="notice-grid">
          <div class="notice-card warning">
            <div class="notice-header">
              <span class="icon">🚫</span>
              <h3>类型混合</h3>
            </div>
            <p>不能与 Number 直接运算</p>
            <pre class="code-block"><code>// 错误示例
console.log(1n + 2);
// TypeError: Cannot mix BigInt and other types</code></pre>
          </div>

          <div class="notice-card warning">
            <div class="notice-header">
              <span class="icon">📦</span>
              <h3>JSON 序列化</h3>
            </div>
            <p>默认无法序列化，需要自定义转换</p>
            <pre class="code-block"><code>const data = { value: 123n };
JSON.stringify(data);
// TypeError: Do not know how to serialize...</code></pre>
          </div>

          <div class="notice-card warning">
            <div class="notice-header">
              <span class="icon">🔍</span>
              <h3>类型检测</h3>
            </div>
            <p>使用 typeof 检测类型</p>
            <pre class="code-block"><code>typeof 1n; // "bigint"
Number.isInteger(1n); // false</code></pre>
          </div>
        </div>
      </div>

      <!-- 转换方法 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔄</span>
            类型转换方法
          </h2>
        </div>
        <div class="conversion-table">
          <table>
            <thead>
              <tr>
                <th>转换类型</th>
                <th>方法示例</th>
                <th>结果</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>转 Number</td>
                <td>Number(123n)</td>
                <td>123（可能丢失精度）</td>
              </tr>
              <tr>
                <td>转 String</td>
                <td>String(123n)</td>
                <td>"123"</td>
              </tr>
              <tr>
                <td>转 Boolean</td>
                <td>Boolean(0n)</td>
                <td>false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 最佳实践 -->
      <div class="card">
        <div class="card-body">
          <h3 class="text-lg font-semibold mb-md">🏆 最佳实践建议</h3>
          <div class="practice-list">
            <div class="practice-item">
              <div class="icon">✅</div>
              <p>在数字超过 2^53 时使用 BigInt</p>
            </div>
            <div class="practice-item">
              <div class="icon">✅</div>
              <p>统一使用 BigInt 类型进行计算</p>
            </div>
            <div class="practice-item">
              <div class="icon">✅</div>
              <p>优先使用字面量后缀 n 语法</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/unified-styles.css';
</script>

<style scoped>
/* 组件特定样式 */
.usage-grid,
.case-grid,
.notice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.usage-card,
.case-card,
.notice-card {
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
}

.card-header,
.notice-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.card-header .icon,
.notice-header .icon {
  font-size: 2rem;
}

.notice-card.warning {
  border-left: 4px solid var(--error-color);
}

.case-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.conversion-table {
  overflow-x: auto;
}

.conversion-table table {
  width: 100%;
  border-collapse: collapse;
}

.conversion-table th,
.conversion-table td {
  padding: var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.conversion-table th {
  background: var(--primary-color);
  color: white;
}

.conversion-table tr:nth-child(even) {
  background: var(--bg-secondary);
}

.code-block {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  overflow-x: auto;
  margin: var(--spacing-md) 0;
  border: 1px solid var(--border-light);
}

.practice-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.practice-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}

.practice-item .icon {
  font-size: 1.5rem;
  color: var(--success-color);
}

.practice-item p {
  margin: 0;
  color: var(--text-secondary);
}

/* 响应式调整 */
@media (max-width: 768px) {

  .usage-grid,
  .case-grid,
  .notice-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
