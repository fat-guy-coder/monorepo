<template>
  <div class="logical-assignment-guide">
    <!-- 标题部分 -->
    <div class="guide-header">
      <h1>逻辑赋值运算符 <span class="operator-group">&&= ||= ??=</span></h1>
      <div class="decorative-line"></div>
    </div>

    <!-- 核心概念卡片 -->
    <div class="concept-card">
      <div class="section-title">
        <div class="icon">🔗</div>
        <h2>复合赋值新特性</h2>
      </div>
      <div class="syntax-diagram">
        <div class="operator-example">
          <code>a &&= b</code>
          <span>等价于</span>
          <code>a = a && b</code>
        </div>
        <div class="operator-example">
          <code>a ||= b</code>
          <span>等价于</span>
          <code>a = a || b</code>
        </div>
        <div class="operator-example">
          <code>a ??= b</code>
          <span>等价于</span>
          <code>a = a ?? b</code>
        </div>
      </div>
    </div>

    <!-- 对比演示模块 -->
    <div class="comparison-card">
      <div class="section-title">
        <div class="icon">🔄</div>
        <h2>传统写法 vs 逻辑赋值运算符</h2>
      </div>

      <div class="comparison-grid">
        <!-- 逻辑与赋值 -->
        <div class="scenario">
          <h3>&&= 运算符</h3>
          <div class="code-compare">
            <div class="old-code">
              <pre>
if (user.profile) {
  user.profile = user.profile && updateProfile();
}</pre
              >
            </div>
            <div class="arrow">⇒</div>
            <div class="new-code">
              <pre>user.profile &&= updateProfile();</pre>
            </div>
          </div>
        </div>

        <!-- 逻辑或赋值 -->
        <div class="scenario">
          <h3>||= 运算符</h3>
          <div class="code-compare">
            <div class="old-code">
              <pre>
config.timeout = 
  config.timeout || 3000;</pre
              >
            </div>
            <div class="arrow">⇒</div>
            <div class="new-code">
              <pre>config.timeout ||= 3000;</pre>
            </div>
          </div>
        </div>

        <!-- 空值合并赋值 -->
        <div class="scenario">
          <h3>??= 运算符</h3>
          <div class="code-compare">
            <div class="old-code">
              <pre>
if (data.page === null || 
    data.page === undefined) {
  data.page = 1;
}</pre
              >
            </div>
            <div class="arrow">⇒</div>
            <div class="new-code">
              <pre>data.page ??= 1;</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技术细节卡片 -->
    <div class="tech-card">
      <div class="section-title">
        <div class="icon">⚡</div>
        <h2>核心特性与注意事项</h2>
      </div>

      <div class="detail-grid">
        <div class="detail-item feature">
          <h3>✅ 优势特性</h3>
          <ul>
            <li>简化条件赋值代码结构</li>
            <li>保持短路求值特性</li>
            <li>支持链式属性访问：<code>obj.nested.prop ||= value</code></li>
          </ul>
        </div>

        <div class="detail-item limitation">
          <h3>⚠️ 使用限制</h3>
          <ul>
            <li>左侧必须是已定义的变量/属性</li>
            <li>不可用于未声明的变量</li>
            <li>与普通赋值运算符优先级不同</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 浏览器支持 -->
    <div class="support-card">
      <div class="section-title">
        <div class="icon">🌍</div>
        <h2>浏览器兼容方案</h2>
      </div>
      <div class="compatibility">
        <div class="browser-icons">
          <div class="browser chrome"></div>
          <div class="browser firefox"></div>
          <div class="browser edge"></div>
        </div>
        <p>
          通过 Babel 插件 <code>@babel/plugin-proposal-logical-assignment-operators</code> 实现兼容
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 无交互逻辑
</script>

<style scoped>
.logical-assignment-guide {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2d3436;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;
}

.guide-header h1 {
  font-size: 2.4rem;
  margin-bottom: 1rem;
}

.operator-group {
  color: #e84393;
  font-family: monospace;
}

.decorative-line {
  width: 150px;
  height: 4px;
  background: linear-gradient(90deg, #6c5ce7, #00cec9);
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
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
}

.operator-example {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-family: monospace;
}

.operator-example code {
  font-size: 1.2rem;
  color: #e84393;
}

.comparison-grid {
  display: grid;
  gap: 2rem;
}

.scenario h3 {
  color: #2d3436;
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

.feature {
  background: #e8f7ff;
  border: 2px solid #74b9ff;
}

.limitation {
  background: #ffeaea;
  border: 2px solid #ff7675;
}

.support-card .compatibility {
  text-align: center;
}

.browser-icons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
}

.browser {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: #f1f2f6;
  position: relative;
}

.browser::after {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-radius: 6px;
}

.chrome::after {
  background: #4285f4;
}
.firefox::after {
  background: #ff9500;
}
.edge::after {
  background: #0078d7;
}

code {
  background: #f1f2f6;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

pre {
  overflow-x: auto;
  margin: 0;
  line-height: 1.6;
}
</style>
