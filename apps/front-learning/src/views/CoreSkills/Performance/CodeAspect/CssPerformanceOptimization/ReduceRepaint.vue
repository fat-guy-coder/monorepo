<template>
  <div class="reflow-repaint-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>CSS回流与重绘优化</h1>
        <p class="subtitle">最小化浏览器渲染操作，提升前端性能</p>

        <div class="performance-stats">
          <div class="stat-card">
            <div class="stat-value">60%</div>
            <div class="stat-label">性能提升</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">10×</div>
            <div class="stat-label">渲染效率提升</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">80%</div>
            <div class="stat-label">布局抖动减少</div>
          </div>
        </div>
      </div>

      <div class="visualization">
        <div class="render-pipeline">
          <div class="pipeline-stage" v-for="stage in pipelineStages" :key="stage.id"
            :style="{ backgroundColor: stage.color }">
            {{ stage.name }}
          </div>

          <div class="reflow-indicator">回流</div>
          <div class="repaint-indicator">重绘</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">回流与重绘原理</h2>

      <div class="concepts-grid">
        <div class="concept-card reflow">
          <div class="concept-header">
            <div class="concept-icon">🔄</div>
            <h3>回流 (Reflow)</h3>
          </div>
          <div class="concept-body">
            <p>当元素的几何属性（位置、尺寸）改变时，浏览器需要重新计算元素在文档中的位置和大小</p>
            <ul>
              <li>也称为布局 (Layout) 或重排 (Relayout)</li>
              <li>代价高昂的性能操作</li>
              <li>会触发后续的重绘</li>
            </ul>
          </div>
        </div>

        <div class="concept-card repaint">
          <div class="concept-header">
            <div class="concept-icon">🎨</div>
            <h3>重绘 (Repaint)</h3>
          </div>
          <div class="concept-body">
            <p>当元素的外观属性（颜色、背景等）改变但不影响布局时，浏览器需要更新元素的绘制</p>
            <ul>
              <li>也称为重绘 (Repaint)</li>
              <li>性能开销小于回流</li>
              <li>不改变元素布局</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="cost-comparison">
        <div class="cost-bar reflow-cost" :style="{ width: reflowCost + '%' }">
          <div class="cost-label">回流成本: 高</div>
        </div>
        <div class="cost-bar repaint-cost" :style="{ width: repaintCost + '%' }">
          <div class="cost-label">重绘成本: 中</div>
        </div>
        <div class="cost-bar composite-cost" :style="{ width: compositeCost + '%' }">
          <div class="cost-label">合成成本: 低</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">减少回流的CSS技巧</h2>

      <div class="optimization-cards">
        <div class="optimization-card">
          <div class="card-number">1</div>
          <div class="card-content">
            <h3>使用transform代替位置属性</h3>
            <p>避免使用top/left等触发回流的属性，改用transform进行动画</p>
            <div class="code-comparison">
              <div class="code-block bad">
                <pre><code>/* 触发回流 */
.element {
  top: 100px;
  left: 50px;
}</code></pre>
              </div>
              <div class="code-block good">
                <pre><code>/* 仅触发合成 */
.element {
  transform: translate(50px, 100px);
}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-number">2</div>
          <div class="card-content">
            <h3>避免布局抖动</h3>
            <p>避免在循环中交替读取和修改布局属性</p>
            <div class="code-comparison">
              <div class="code-block bad">
                <pre><code>// ❌ 布局抖动
for (let i = 0; i < items.length; i++) {
  // 读取（触发回流）
  const width = element.offsetWidth;

  // 修改（再次触发回流）
  element.style.width = width + 10 + 'px';
}</code></pre>
              </div>
              <div class="code-block good">
                <pre><code>// ✅ 批量读取和修改
const widths = [];
// 批量读取
for (let i = 0; i < items.length; i++) {
  widths[i] = element.offsetWidth;
}

// 批量修改
for (let i = 0; i < items.length; i++) {
  element.style.width = widths[i] + 10 + 'px';
}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-number">3</div>
          <div class="card-content">
            <h3>使用flexbox布局</h3>
            <p>Flexbox布局的性能通常优于传统浮动和定位布局</p>
            <div class="code-comparison">
              <div class="code-block bad">
                <pre><code>/* 传统浮动布局 */
.container {
  overflow: hidden; /* 清除浮动 */
}

.item {
  float: left;
  width: 25%;
  margin-right: 10px;
}</code></pre>
              </div>
              <div class="code-block good">
                <pre><code>/* Flexbox布局 */
.container {
  display: flex;
  gap: 10px;
}

.item {
  flex: 1;
}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-number">4</div>
          <div class="card-content">
            <h3>批量修改DOM</h3>
            <p>使用文档片段(document fragment)或隐藏元素来批量修改DOM</p>
            <div class="code-comparison">
              <div class="code-block bad">
                <pre><code>// ❌ 多次触发回流
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  document.body.appendChild(div);
}</code></pre>
              </div>
              <div class="code-block good">
                <pre><code>// ✅ 单次回流
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}

document.body.appendChild(fragment);</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">减少重绘的CSS技巧</h2>

      <div class="optimization-cards">
        <div class="optimization-card">
          <div class="card-number">1</div>
          <div class="card-content">
            <h3>使用opacity代替visibility</h3>
            <p>opacity属性可以在不触发重绘的情况下实现元素的淡入淡出</p>
            <div class="code-comparison">
              <div class="code-block bad">
                <pre><code>/* 可能触发重绘 */
.element {
  visibility: hidden;
}</code></pre>
              </div>
              <div class="code-block good">
                <pre><code>/* 仅触发合成 */
.element {
  opacity: 0;
  /* 确保不阻塞交互 */
  pointer-events: none;
}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-number">2</div>
          <div class="card-content">
            <h3>避免使用昂贵的CSS属性</h3>
            <p>某些CSS属性的渲染开销较大，应谨慎使用</p>
            <div class="expensive-properties">
              <div class="property-card bad">box-shadow</div>
              <div class="property-card bad">border-radius</div>
              <div class="property-card bad">filter</div>
              <div class="property-card bad">clip-path</div>
              <div class="property-card caution">opacity</div>
              <div class="property-card caution">transform</div>
            </div>
            <div class="tip">
              💡 提示：在动画中避免使用昂贵属性，或限制其影响范围
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-number">3</div>
          <div class="card-content">
            <h3>使用will-change属性</h3>
            <p>提前告知浏览器哪些属性将发生变化，使其提前优化</p>
            <div class="code-block good">
              <pre><code>/* 提示浏览器元素将发生变化 */
.animated-element {
  will-change: transform, opacity;
}

/* 使用后及时移除 */
.animated-element.animate {
  transform: translateX(100px);
  opacity: 0.5;
}</code></pre>
            </div>
            <div class="tip">
              ⚠️ 注意：不要过度使用will-change，仅用于真正需要优化的元素
            </div>
          </div>
        </div>

        <div class="optimization-card">
          <div class="card-number">4</div>
          <div class="card-content">
            <h3>限制重绘区域</h3>
            <p>使用contain属性限制重绘影响范围</p>
            <div class="code-block good">
              <pre><code>/* 限制重绘范围 */
.card {
  contain: paint;
}

/* 创建新的层 */
.animated {
  transform: translateZ(0);
}</code></pre>
            </div>
            <div class="visual-example">
              <div class="paint-boundary"></div>
              <div class="paint-area-limited">重绘区域受限</div>
              <div class="paint-area-full">重绘区域不受限</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">最佳实践清单</h2>

      <div class="practice-checklist">
        <div class="practice-category">
          <h3>布局优化</h3>
          <ul>
            <li class="checked">避免表格布局</li>
            <li class="checked">使用flexbox/grid布局</li>
            <li class="checked">避免频繁修改布局属性</li>
            <li class="checked">使用CSS动画而非JS动画</li>
            <li class="checked">分离动画层</li>
          </ul>
        </div>

        <div class="practice-category">
          <h3>样式优化</h3>
          <ul>
            <li class="checked">使用类而非内联样式</li>
            <li class="checked">避免深层嵌套选择器</li>
            <li class="checked">简化CSS选择器</li>
            <li class="checked">使用BEM等命名方法</li>
            <li class="checked">避免使用!important</li>
          </ul>
        </div>

        <div class="practice-category">
          <h3>渲染优化</h3>
          <ul>
            <li class="checked">使用transform和opacity</li>
            <li class="checked">减少图层数量</li>
            <li class="checked">优化图片和媒体资源</li>
            <li class="checked">使用content-visibility</li>
            <li class="checked">懒加载非关键资源</li>
          </ul>
        </div>
      </div>

      <div class="debugging-tools">
        <h3>回流重绘调试工具</h3>
        <div class="tools-grid">
          <div class="tool-card">
            <div class="tool-icon">🔍</div>
            <h4>Chrome DevTools</h4>
            <p>Performance面板分析渲染性能</p>
          </div>
          <div class="tool-card">
            <div class="tool-icon">📈</div>
            <h4>Rendering面板</h4>
            <p>可视化查看重绘区域</p>
          </div>
          <div class="tool-card">
            <div class="tool-icon">⚙️</div>
            <h4>Layout Shift Debugger</h4>
            <p>检测布局偏移问题</p>
          </div>
        </div>
      </div>
    </div>

    <div class="resources-section">
      <h2>性能优化资源</h2>
      <div class="resource-links">
        <a href="#" class="resource-link">CSS Triggers</a>
        <a href="#" class="resource-link">Google Web Fundamentals</a>
        <a href="#" class="resource-link">Browser Rendering Optimization</a>
        <a href="#" class="resource-link">MDN Web Docs</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 回流与重绘的成本比较
const reflowCost = ref(85);
const repaintCost = ref(60);
const compositeCost = ref(15);

// 渲染管道阶段
const pipelineStages = ref([
  { id: 1, name: 'JavaScript', color: '#3498db' },
  { id: 2, name: '样式计算', color: '#2ecc71' },
  { id: 3, name: '布局', color: '#e74c3c' },
  { id: 4, name: '绘制', color: '#f39c12' },
  { id: 5, name: '合成', color: '#9b59b6' }
]);
</script>

<style scoped lang="less">
@primary: #3498db;
@secondary: #2ecc71;
@accent: #9b59b6;
@warning: #f1c40f;
@danger: #e74c3c;
@dark: #2c3e50;
@light: #ecf0f1;
@text: #34495e;
@light-text: #7f8c8d;
@radius: 12px;
@shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
@transition: all 0.3s ease;

.reflow-repaint-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text;
  line-height: 1.6;

  * {
    box-sizing: border-box;
  }
}

.hero-section {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  background: linear-gradient(135deg, #1a237e, #5c6bc0);
  border-radius: @radius;
  padding: 40px;
  color: white;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    margin-top: 0;
    margin-bottom: 10px;
    font-weight: 800;
  }

  .subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    margin-bottom: 30px;
  }
}

.hero-content {
  flex: 1;
  min-width: 300px;
}

.visualization {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.performance-stats {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.stat-card {
  flex: 1;
  min-width: 100px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: @radius;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.25);
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
  }
}

.render-pipeline {
  display: flex;
  width: 100%;
  max-width: 500px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: @radius;
  position: relative;
  overflow: hidden;
}

.pipeline-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  z-index: 2;
}

.reflow-indicator {
  position: absolute;
  bottom: 10px;
  left: 40%;
  padding: 4px 12px;
  background: @danger;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  animation: pulse 2s infinite;
}

.repaint-indicator {
  position: absolute;
  bottom: 10px;
  left: 70%;
  padding: 4px 12px;
  background: @warning;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  animation: pulse 2s infinite;
  animation-delay: 0.5s;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.6;
  }
}

.section {
  background: white;
  border-radius: @radius;
  box-shadow: @shadow;
  padding: 30px;
  margin-bottom: 30px;

  .section-title {
    font-size: 1.8rem;
    color: @primary;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f1f3f4;
  }
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.concept-card {
  border-radius: @radius;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &.reflow {
    border-top: 4px solid @danger;
  }

  &.repaint {
    border-top: 4px solid @warning;
  }
}

.concept-header {
  padding: 20px;
  display: flex;
  align-items: center;
  background: #f8f9fa;

  .concept-icon {
    font-size: 2rem;
    margin-right: 15px;
  }

  h3 {
    margin: 0;
    font-size: 1.4rem;
  }
}

.concept-body {
  padding: 20px;
  background: white;

  p {
    margin-top: 0;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.cost-comparison {
  height: 50px;
  border-radius: @radius;
  overflow: hidden;
  display: flex;
  margin-top: 30px;
}

.cost-bar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  transition: width 1s ease;

  &.reflow-cost {
    background: @danger;
  }

  &.repaint-cost {
    background: @warning;
  }

  &.composite-cost {
    background: @secondary;
  }
}

.optimization-cards {
  display: grid;
  gap: 30px;
}

.optimization-card {
  display: flex;
  gap: 20px;
  border: 1px solid #e8eaed;
  border-radius: @radius;
  padding: 25px;
  transition: @transition;

  &:hover {
    border-color: @primary;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
}

.card-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: @primary;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  flex-shrink: 0;
}

.card-content {
  flex: 1;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @dark;
  }
}

.code-comparison {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.code-block {
  flex: 1;
  min-width: 300px;
  background: #2c3e50;
  color: #ecf0f1;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  position: relative;
  padding: 15px;

  &.bad {
    border-left: 4px solid @danger;
  }

  &.good {
    border-left: 4px solid @secondary;
  }

  pre {
    margin: 0;
  }

  &:before {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 0.8rem;
    font-weight: bold;
    opacity: 0.7;
  }

  &.bad:before {
    content: '❌ 避免使用';
    color: @danger;
  }

  &.good:before {
    content: '✅ 推荐使用';
    color: @secondary;
  }
}

.expensive-properties {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.property-card {
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: 500;

  &.bad {
    background: rgba(@danger, 0.15);
    color: @danger;
    border: 1px solid rgba(@danger, 0.3);
  }

  &.caution {
    background: rgba(@warning, 0.15);
    color: darken(@warning, 20%);
    border: 1px solid rgba(@warning, 0.3);
  }
}

.tip {
  background: #e3f2fd;
  color: @primary;
  border-radius: 8px;
  padding: 12px;
  font-size: 0.9rem;
  margin-top: 15px;
}

.visual-example {
  height: 150px;
  background: #f1f3f4;
  border-radius: 8px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}

.paint-boundary {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 2px dashed @primary;
  border-radius: 8px;
}

.paint-area-limited {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 100px;
  height: 100px;
  background: rgba(@secondary, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  padding: 10px;
  font-weight: 500;
}

.paint-area-full {
  position: absolute;
  top: 40px;
  right: 40px;
  width: 150px;
  height: 150px;
  background: rgba(@danger, 0.3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  padding: 10px;
  font-weight: 500;
}

.practice-checklist {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.practice-category {
  border: 1px solid #e8eaed;
  border-radius: @radius;
  padding: 25px;

  h3 {
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid #f1f3f4;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px 0;
      border-bottom: 1px dashed #e0e0e0;
      position: relative;
      padding-left: 30px;

      &.checked::before {
        content: '✓';
        position: absolute;
        left: 0;
        top: 10px;
        width: 20px;
        height: 20px;
        background: @secondary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      }
    }
  }
}

.debugging-tools {
  background: #f9f9f9;
  border-radius: @radius;
  padding: 25px;

  h3 {
    margin-top: 0;
    text-align: center;
    margin-bottom: 25px;
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tool-card {
  border: 1px solid #e0e0e0;
  border-radius: @radius;
  padding: 20px;
  text-align: center;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    border-color: @primary;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }

  .tool-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    color: @light-text;
  }
}

.resources-section {
  background: linear-gradient(to right, #1a237e, #283593);
  border-radius: @radius;
  padding: 30px;
  text-align: center;
  color: white;

  h2 {
    margin-top: 0;
    margin-bottom: 25px;
    font-size: 1.8rem;
  }
}

.resource-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.resource-link {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: @transition;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;

    .performance-stats {
      justify-content: center;
    }
  }

  .code-comparison {
    flex-direction: column;
  }

  .code-block {
    min-width: 100%;
  }
}
</style>