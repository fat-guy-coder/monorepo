<template>
  <div class="nullish-guide">
    <!-- 标题部分 -->
    <div class="guide-header">
      <h1>空值合并操作符 <span class="operator">??</span> 基本指南</h1>
      <div class="decorative-line"></div>
    </div>

    <!-- 核心概念卡片 -->
    <div class="concept-card">
      <div class="section-title">
        <div class="icon">🎯</div>
        <h2>核心定义</h2>
      </div>
      <div class="definition">
        <p>
          空值合并操作符 <code>??</code> 是一个逻辑操作符，<br />当左侧操作数为 <code>null</code> 或
          <code>undefined</code> 时返回右侧操作数，否则返回左侧操作数
        </p>
        <div class="syntax-diagram">
          <span class="value">左侧值</span>
          <span class="operator-symbol">??</span>
          <span class="value">默认值</span>
        </div>
      </div>
    </div>

    <!-- 对比演示模块 -->
    <div class="comparison-card">
      <div class="section-title">
        <div class="icon">🆚</div>
        <h2>与传统逻辑运算符对比</h2>
      </div>

      <div class="comparison-grid">
        <!-- 场景1：空字符串 -->
        <div class="scenario">
          <h3>空字符串处理</h3>
          <div class="code-compare">
            <div class="old-code">
              <pre>
const value = '' || 'default'; 
// → 'default'</pre
              >
            </div>
            <div class="arrow">⇒</div>
            <div class="new-code">
              <pre>
const value = '' ?? 'default'; 
// → ''</pre
              >
            </div>
          </div>
        </div>

        <!-- 场景2：0值 -->
        <div class="scenario">
          <h3>数值0处理</h3>
          <div class="code-compare">
            <div class="old-code">
              <pre>
const count = 0 || 5; 
// → 5</pre
              >
            </div>
            <div class="arrow">⇒</div>
            <div class="new-code">
              <pre>
const count = 0 ?? 5; 
// → 0</pre
              >
            </div>
          </div>
        </div>

        <!-- 场景3：结合可选链 -->
        <div class="scenario">
          <h3>与可选链结合使用</h3>
          <div class="code-compare">
            <div class="old-code">
              <pre>
const name = user.info 
  ? user.info.name 
  : 'Anonymous';</pre
              >
            </div>
            <div class="arrow">⇒</div>
            <div class="new-code">
              <pre>
const name = user?.info?.name 
  ?? 'Anonymous';</pre
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技术细节卡片 -->
    <div class="tech-card">
      <div class="section-title">
        <div class="icon">📌</div>
        <h2>关键特性与注意事项</h2>
      </div>

      <div class="detail-grid">
        <div class="detail-item pro">
          <h3>✅ 优势场景</h3>
          <ul>
            <li>精确处理 <code>null/undefined</code>，保留其他 falsy 值</li>
            <li>避免 <code>0</code>、<code>''</code>、<code>false</code> 被意外覆盖</li>
            <li>可链式组合：<code>a ?? b ?? c</code></li>
          </ul>
        </div>

        <div class="detail-item caution">
          <h3>⚠️ 使用限制</h3>
          <ul>
            <li>不可直接与 <code>&&</code> 或 <code>||</code> 组合使用</li>
            <li>需通过括号明确优先级：<code>(a ?? b) || c</code></li>
            <li>TypeScript 需要 3.7+ 版本支持</li>
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
        <div class="browser-logos">
          <div class="browser chrome"></div>
          <div class="browser firefox"></div>
          <div class="browser safari"></div>
        </div>
        <p>
          通过 Babel 插件 <code>@babel/plugin-proposal-nullish-coalescing-operator</code> 实现兼容
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 无交互逻辑
</script>

<style scoped>
.nullish-guide {
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

.operator {
  color: #e84393;
  font-weight: bold;
}

.decorative-line {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, #6c5ce7, #00b894);
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
  gap: 1rem;
  font-size: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.operator-symbol {
  color: #e84393;
  font-weight: bold;
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

.pro {
  background: #e8f7ff;
  border: 2px solid #74b9ff;
}

.caution {
  background: #ffeaea;
  border: 2px solid #ff7675;
}

.support-card .compatibility {
  text-align: center;
}

.browser-logos {
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
.safari::after {
  background: #34c759;
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
