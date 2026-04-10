<template>
  <div class="container">
    <!-- 类型比较 -->
    <section class="method-section">
      <h2 class="section-title">类型比较：== vs ===</h2>
      <ul class="method-list">
        <li class="method-item">
          <div class="method-header">
            <span class="method-name">== (宽松相等)</span>
          </div>
          <div class="method-detail">
            <div class="method-desc">宽松相等运算符会在比较前进行类型转换。</div>
            <pre class="code-block"><code>5 == '5' // true</code></pre>
            <div class="pros-cons">
              <div class="pros">
                <h3 class="section-title">✅ 优点</h3>
                <ul>
                  <li>简洁，适用于简单比较</li>
                  <li>能比较不同类型的值</li>
                </ul>
              </div>
              <div class="cons">
                <h3 class="section-title">❌ 缺点</h3>
                <ul>
                  <li>可能导致意外的结果</li>
                  <li>不推荐在严格比较中使用</li>
                </ul>
              </div>
            </div>
            <div class="examples">
              <h3 class="section-title">🌰 示例</h3>
              <div class="example-item">
                <pre class="code-block"><code>5 == '5' // true</code></pre>
                <div class="output">输出结果: <span class="result">true</span></div>
              </div>
              <div class="example-item">
                <pre class="code-block"><code>null == undefined // true</code></pre>
                <div class="output">输出结果: <span class="result">true</span></div>
              </div>
            </div>
          </div>
        </li>
        <li class="method-item">
          <div class="method-header">
            <span class="method-name">=== (严格相等)</span>
          </div>
          <div class="method-detail">
            <div class="method-desc">严格相等运算符在比较前不进行类型转换。</div>
            <pre class="code-block"><code>5 === '5' // false</code></pre>
            <div class="pros-cons">
              <div class="pros">
                <h3 class="section-title">✅ 优点</h3>
                <ul>
                  <li>更安全，避免类型转换带来的问题</li>
                  <li>推荐在所有比较中使用</li>
                </ul>
              </div>
              <div class="cons">
                <h3 class="section-title">❌ 缺点</h3>
                <ul>
                  <li>需要确保比较的值类型一致</li>
                </ul>
              </div>
            </div>
            <div class="examples">
              <h3 class="section-title">🌰 示例</h3>
              <div class="example-item">
                <pre class="code-block"><code>5 === '5' // false</code></pre>
                <div class="output">输出结果: <span class="result">false</span></div>
              </div>
              <div class="example-item">
                <pre class="code-block"><code>null === undefined // false</code></pre>
                <div class="output">输出结果: <span class="result">false</span></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
h2,
h3 {
  color: #000;
}

.container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.method-section {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid;
}

.method-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.method-item {
  margin: 1rem 0;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  padding: 1rem;
  background: #f8f9fa;
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.method-name {
  font-family: 'Fira Code', monospace;
  color: #2c3e50;
  font-size: 1.2rem;
}

.method-detail {
  padding: 1rem 0;
}

.method-desc {
  color: #666;
  margin-bottom: 1rem;
}

.code-block {
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.pros-cons {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin: 1rem 0;
}

.pros ul,
.cons ul {
  padding-left: 1.2rem;
  margin: 0.5rem 0;
}

.pros li {
  color: #27ae60;
}

.cons li {
  color: #c0392b;
}

.output {
  margin-top: 0.5rem;
  font-family: monospace;
  color: #95a5a6;
}

.result {
  color: #e67e22;
  font-weight: bold;
}
</style>
