<template>
  <div class="optional-chaining-guide">
    <!-- 标题部分 -->
    <div class="guide-header">
      <h1>可选链操作符 <span class="operator">?.</span> 基本介绍</h1>
      <div class="decorative-line"></div>
    </div>

    <!-- 核心概念卡片 -->
    <div class="concept-card">
      <div class="section-title">
        <div class="icon">🛡️</div>
        <h2>什么是可选链？</h2>
      </div>
      <div class="definition">
        <p>
          可选链操作符
          <code>?.</code>
          允许读取位于连接对象链深处的属性的值，<br />无需明确验证链中的每个引用是否有效。
        </p>
        <div class="syntax-diagram">
          <span>obj</span>
          <span class="chain">?.</span>
          <span>prop1</span>
          <span class="chain">?.</span>
          <span>prop2</span>
        </div>
      </div>
    </div>

    <!-- 使用对比模块 -->
    <div class="comparison-card">
      <div class="section-title">
        <div class="icon">⚖️</div>
        <h2>传统写法 vs 可选链写法</h2>
      </div>

      <div class="comparison-grid">
        <!-- 场景1：对象属性 -->
        <div class="scenario">
          <h3>访问嵌套对象属性</h3>
          <div class="code-compare">
            <div class="old-code">
              <pre>
const street = user &&
  user.address &&
  user.address.street;</pre>
            </div>
            <div class="arrow">⇒</div>
            <div class="new-code">
              <pre>const street = user?.address?.street;</pre>
            </div>
          </div>
        </div>

        <!-- 场景2：数组元素 -->
        <div class="scenario">
          <h3>访问数组元素</h3>
          <div class="code-compare">
            <div class="old-code">
              <pre>
const firstItem = arr &&
  arr.length &&
  arr[0];</pre>
            </div>
            <div class="arrow">⇒</div>
            <div class="new-code">
              <pre>const firstItem = arr?.[0];</pre>
            </div>
          </div>
        </div>

        <!-- 场景3：函数调用 -->
        <div class="scenario">
          <h3>安全函数调用</h3>
          <div class="code-compare">
            <div class="old-code">
              <pre>
const result = obj.method &&
  obj.method();</pre>
            </div>
            <div class="arrow">⇒</div>
            <div class="new-code">
              <pre>const result = obj.method?.();</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技术细节卡片 -->
    <div class="tech-card">
      <div class="section-title">
        <div class="icon">📌</div>
        <h2>技术特性与注意事项</h2>
      </div>

      <div class="detail-grid">
        <div class="detail-item pro">
          <h3>✅ 优势特性</h3>
          <ul>
            <li>自动短路特性：遇到 null/undefined 立即停止</li>
            <li>兼容多种访问形式：支持 <code>.</code>、<code>[]</code>、<code>()</code></li>
            <li>TypeScript 类型安全：自动推导可能为 undefined 的类型</li>
          </ul>
        </div>

        <div class="detail-item caution">
          <h3>⚠️ 使用注意</h3>
          <ul>
            <li>不能用于赋值操作：<code>obj?.prop = 1</code> ❌</li>
            <li>过度使用会掩盖潜在的数据结构问题</li>
            <li>浏览器兼容性需要编译处理（Babel）</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 浏览器支持 -->
    <div class="support-card">
      <div class="section-title">
        <div class="icon">🌐</div>
        <h2>浏览器兼容方案</h2>
      </div>
      <div class="compatibility">
        <div class="browser-support">
          <div class="browser chrome"></div>
          <div class="browser firefox"></div>
          <div class="browser safari"></div>
          <div class="browser edge"></div>
        </div>
        <p>通过 Babel 插件 <code>@babel/plugin-proposal-optional-chaining</code> 实现兼容</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 无交互逻辑
</script>

<style scoped>
.optional-chaining-guide {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;
}

.guide-header h1 {
  font-size: 2.4rem;
  margin-bottom: 1rem;
}

.operator {
  color: #e74c3c;
  font-weight: bold;
}

.decorative-line {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #e67e22);
  margin: 0 auto;
}

.concept-card,
.comparison-card,
.tech-card,
.support-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.icon {
  font-size: 2rem;
}

h2 {
  margin: 0;
  font-size: 1.8rem;
}

.syntax-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.chain {
  color: #e74c3c;
  font-weight: bold;
}

.comparison-grid {
  display: grid;
  gap: 2rem;
}

.scenario h3 {
  color: #34495e;
  margin-bottom: 1rem;
}

.code-compare {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.old-code,
.new-code {
  flex: 1;
}

.old-code pre {
  background: #f1f2f6;
  color: #666;
  padding: 1rem;
  border-radius: 6px;
}

.new-code pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 6px;
}

.arrow {
  font-size: 1.5rem;
  color: #7f8c8d;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.detail-item {
  padding: 1.5rem;
  border-radius: 8px;
}

.pro {
  background: #e8f5e9;
  border: 2px solid #81c784;
}

.caution {
  background: #ffebee;
  border: 2px solid #e57373;
}

.support-card .compatibility {
  text-align: center;
}

.browser-support {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
}

.browser {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: #eee;
}

code {
  background: #f1f2f6;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

pre {
  overflow-x: auto;
  margin: 0;
}
</style>
