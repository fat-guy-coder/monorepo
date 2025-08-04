<template>
  <div class="special-types-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🔮 JavaScript 特殊数据类型指南</h1>
      <p class="subtitle">超越基本类型的独特存在</p>
      <div class="header-glow"></div>
    </header>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- Null & Undefined -->
      <section class="section null-undefined">
        <h2 class="section-title">🕳️ Null vs Undefined</h2>
        <div class="comparison-grid">
          <div class="type-card null-card">
            <div class="type-header">
              <span class="icon">❔</span>
              <h3>null</h3>
            </div>
            <pre class="code-block"><code>let empty = null;
typeof null; // 'object'</code></pre>
            <div class="usage">
              <p>✅ 表示空值 ✅ 需要显式赋值</p>
            </div>
          </div>

          <div class="type-card undefined-card">
            <div class="type-header">
              <span class="icon">🌀</span>
              <h3>undefined</h3>
            </div>
            <pre class="code-block"><code>let uninitialized;
console.log(uninitialized); // undefined</code></pre>
            <div class="usage">
              <p>✅ 未初始化 ✅ 函数默认返回值</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Symbol -->
      <section class="section symbol">
        <h2 class="section-title">🔣 Symbol 类型</h2>
        <div class="symbol-container">
          <div class="symbol-features">
            <div class="feature-card">
              <div class="icon">🔒</div>
              <h4>唯一性</h4>
              <pre class="code-block"><code>const s1 = Symbol();
const s2 = Symbol();
console.log(s1 === s2); // false</code></pre>
            </div>
            <div class="feature-card">
              <div class="icon">🌐</div>
              <h4>全局注册</h4>
              <pre class="code-block"><code>const gs = Symbol.for('key');
console.log(Symbol.keyFor(gs)); // 'key'</code></pre>
            </div>
          </div>
          <div class="symbol-usage">
            <h3>典型使用场景</h3>
            <ul>
              <li>对象唯一属性键</li>
              <li>定义私有属性</li>
              <li>防止属性名冲突</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- BigInt -->
      <section class="section bigint">
        <h2 class="section-title">🧮 BigInt 类型</h2>
        <div class="bigint-grid">
          <div class="example-card">
            <pre class="code-block"><code>const big = 12345678901234567890n;
console.log(big + 1n); // 12345678901234567891n</code></pre>
          </div>
          <div class="features">
            <div class="feature">
              <h3>📏 精度保证</h3>
              <p>精确表示任意大整数</p>
            </div>
            <div class="feature">
              <h3>⚡ 运算限制</h3>
              <p>不能与Number直接运算</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 特殊值 -->
      <section class="section special-values">
        <h2 class="section-title">⚠️ 特殊数值</h2>
        <div class="value-grid">
          <div class="value-card">
            <h3>NaN</h3>
            <pre class="code-block"><code>console.log(0/0); // NaN
console.log(NaN === NaN); // false</code></pre>
            <p>使用<code>Number.isNaN()</code>检测</p>
          </div>
          <div class="value-card">
            <h3>Infinity</h3>
            <pre class="code-block"><code>console.log(1/0); // Infinity
console.log(-1/0); // -Infinity</code></pre>
            <p>表示数学意义上的无穷大</p>
          </div>
        </div>
      </section>

      <!-- 类型检测 -->
      <section class="section type-check">
        <h2 class="section-title">🕵️ 类型检测方法</h2>
        <table class="type-table">
          <thead>
            <tr>
              <th>类型</th>
              <th>typeof</th>
              <th>toString</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>null</td>
              <td>'object'</td>
              <td>[object Null]</td>
            </tr>
            <tr>
              <td>undefined</td>
              <td>'undefined'</td>
              <td>[object Undefined]</td>
            </tr>
            <tr>
              <td>Symbol</td>
              <td>'symbol'</td>
              <td>[object Symbol]</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <!-- 注意事项 -->
    <footer class="doc-footer">
      <div class="notice-board">
        <h3>🚨 重要注意事项</h3>
        <div class="notice-list">
          <div class="notice-item">
            <div class="icon">❗</div>
            <p>undefined == null 返回 true</p>
          </div>
          <div class="notice-item">
            <div class="icon">❗</div>
            <p>Symbol 值不能与其他类型运算</p>
          </div>
          <div class="notice-item">
            <div class="icon">❗</div>
            <p>BigInt 不能用于 Math 方法</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code&display=swap');

.special-types-doc {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem 3rem;
  background: linear-gradient(145deg, #f8fafb 0%, #ffffff 100%);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', sans-serif;

  .doc-header {
    text-align: center;
    margin-bottom: 3rem;

    .title {
      color: #6c5ce7;
      font-size: 2.8rem;
      margin: 1rem 0;
      text-shadow: 2px 2px 4px rgba(108, 92, 231, 0.1);
    }

    .subtitle {
      color: #636e72;
      font-size: 1.4rem;
      letter-spacing: 0.05em;
    }

    .header-glow {
      width: 120px;
      height: 4px;
      background: linear-gradient(90deg, #6c5ce7 0%, #00b894 100%);
      margin: 1.5rem auto;
      border-radius: 2px;
    }
  }

  .doc-content {
    .section {
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      .section-title {
        color: #2d3436;
        font-size: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
      }

      .comparison-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;

        .type-card {
          padding: 1.5rem;
          border-radius: 8px;

          &.null-card {
            background: #f8f9fa;
            border-left: 4px solid #6c5ce7;
          }
          &.undefined-card {
            background: #f8f9fa;
            border-left: 4px solid #00b894;
          }

          .type-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;

            .icon {
              font-size: 2rem;
            }
          }
        }
      }

      .symbol-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;

        .symbol-features {
          display: grid;
          gap: 1.5rem;

          .feature-card {
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 8px;

            .icon {
              font-size: 2rem;
            }
          }
        }

        .symbol-usage {
          ul {
            list-style: none;
            padding-left: 1.5rem;

            li {
              position: relative;
              padding: 0.5rem 0;

              &::before {
                content: '▹';
                position: absolute;
                left: -1.5rem;
                color: #6c5ce7;
              }
            }
          }
        }
      }

      .bigint-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;

        .features {
          display: grid;
          gap: 1rem;

          .feature {
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 8px;
          }
        }
      }

      .value-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;

        .value-card {
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
        }
      }

      .type-table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #6c5ce7;
          color: white;
        }

        tr:nth-child(even) {
          background: #f8f9fa;
        }
      }
    }

    .code-block {
      background: #2d3436;
      color: #dfe6e9;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
  }

  .doc-footer {
    .notice-board {
      background: #ffeaa7;
      padding: 2rem;
      border-radius: 8px;
      border-left: 4px solid #fdcb6e;

      h3 {
        color: #d63031;
        margin-bottom: 1rem;
      }

      .notice-list {
        .notice-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;

          .icon {
            font-size: 1.5rem;
            color: #d63031;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .special-types-doc {
    padding: 1rem;
    margin: 1rem;

    .doc-header .title {
      font-size: 2rem;
    }

    .comparison-grid,
    .symbol-container,
    .bigint-grid,
    .value-grid {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
