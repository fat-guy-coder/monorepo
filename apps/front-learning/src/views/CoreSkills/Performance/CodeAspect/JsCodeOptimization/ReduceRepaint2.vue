<template>
  <div class="performance-optimization">
    <div class="hero">
      <h1>JavaScript减少回流与重绘</h1>
      <p class="subtitle">优化DOM操作，提升页面渲染性能</p>

      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-value">60%+</div>
          <div class="stat-label">性能提升</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">10×</div>
          <div class="stat-label">渲染效率</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">80%</div>
          <div class="stat-label">卡顿减少</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">回流与重绘机制</h2>
      <div class="explanation-grid">
        <div class="explanation-card">
          <div class="card-icon">🔄</div>
          <h3>回流 (Reflow)</h3>
          <p>当元素尺寸、布局或位置发生变化时，浏览器需要重新计算元素的几何属性并重新布局。</p>
          <ul class="trigger-list">
            <li>DOM元素添加/删除</li>
            <li>元素尺寸改变</li>
            <li>窗口大小调整</li>
            <li>计算布局属性</li>
          </ul>
        </div>

        <div class="explanation-card">
          <div class="card-icon">🎨</div>
          <h3>重绘 (Repaint)</h3>
          <p>当元素外观改变但布局不变时，浏览器需要重绘受影响区域的像素。</p>
          <ul class="trigger-list">
            <li>颜色/背景改变</li>
            <li>透明度变化</li>
            <li>阴影效果</li>
            <li>边框样式</li>
          </ul>
        </div>

        <div class="performance-card">
          <div class="performance-graph">
            <div class="cost-bar reflow-cost" :style="{ height: reflowCost + '%' }">
              <div class="cost-label">回流开销</div>
            </div>
            <div class="cost-bar repaint-cost" :style="{ height: repaintCost + '%' }">
              <div class="cost-label">重绘开销</div>
            </div>
            <div class="cost-bar composite-cost" :style="{ height: compositeCost + '%' }">
              <div class="cost-label">合成开销</div>
            </div>
          </div>
          <div class="conclusion">
            <p>回流成本 > 重绘成本 > 合成成本</p>
            <p>优先减少回流，其次减少重绘</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">JavaScript优化技巧</h2>

      <div class="optimization-card">
        <div class="card-number">1</div>
        <div class="card-content">
          <h3>批量DOM操作</h3>
          <p>将多次DOM操作合并为单次操作，减少布局计算次数</p>

          <div class="code-comparison">
            <div class="code-block bad">
              <pre><code>// ❌ 糟糕：每次操作都触发回流
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  document.body.appendChild(div);
}</code></pre>
              <div class="performance-impact">触发100次回流</div>
            </div>

            <div class="code-block good">
              <pre><code>// ✅ 优化：使用文档片段批量操作
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}

document.body.appendChild(fragment);</code></pre>
              <div class="performance-impact">仅触发1次回流</div>
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
              <pre><code>// ❌ 布局抖动：强制同步布局
const elements = document.querySelectorAll('.item');

for (let i = 0; i < elements.length; i++) {
  // 读取触发回流（获取布局信息）
  const width = elements[i].offsetWidth;

  // 修改触发回流（改变布局）
  elements[i].style.width = width + 10 + 'px';
}</code></pre>
              <div class="performance-impact">触发2N次回流</div>
            </div>

            <div class="code-block good">
              <pre><code>// ✅ 分离读写操作
const elements = document.querySelectorAll('.item');
const widths = [];

// 批量读取
for (let i = 0; i < elements.length; i++) {
  widths[i] = elements[i].offsetWidth;
}

// 批量写入
for (let i = 0; i < elements.length; i++) {
  elements[i].style.width = widths[i] + 10 + 'px';
}</code></pre>
              <div class="performance-impact">仅触发2次回流</div>
            </div>
          </div>
        </div>
      </div>

      <div class="optimization-card">
        <div class="card-number">3</div>
        <div class="card-content">
          <h3>使用requestAnimationFrame</h3>
          <p>将视觉变化安排在浏览器重绘之前执行</p>

          <div class="code-comparison">
            <div class="code-block bad">
              <pre><code>// ❌ 直接执行可能导致多次回流
function update() {
  element.style.top = window.scrollY + 'px';
  element.style.left = window.scrollX + 'px';

  window.addEventListener('scroll', update);
}</code></pre>
              <div class="performance-impact">滚动时频繁触发回流</div>
            </div>

            <div class="code-block good">
              <pre><code>// ✅ 使用requestAnimationFrame优化
function update() {
  requestAnimationFrame(() => {
    element.style.transform = `
      translate(${window.scrollX}px,
                ${window.scrollY}px)
    `;
  });
}

window.addEventListener('scroll', update);</code></pre>
              <div class="performance-impact">与浏览器刷新率同步</div>
            </div>
          </div>
        </div>
      </div>

      <div class="optimization-card">
        <div class="card-number">4</div>
        <div class="card-content">
          <h3>离线DOM操作</h3>
          <p>将元素移出文档流进行复杂操作</p>

          <div class="code-comparison">
            <div class="code-block bad">
              <pre><code>// ❌ 在文档流中修改大量DOM
const list = document.getElementById('list');

// 直接修改触发多次回流
for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  list.appendChild(item);
}</code></pre>
              <div class="performance-impact">触发100次回流</div>
            </div>

            <div class="code-block good">
              <pre><code>// ✅ 克隆节点离线操作
const list = document.getElementById('list');
const clone = list.cloneNode(false);

// 在副本上操作
for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  clone.appendChild(item);
}

// 单次替换操作
list.parentNode.replaceChild(clone, list);</code></pre>
              <div class="performance-impact">仅触发1次回流</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">高级优化策略</h2>

      <div class="strategy-grid">
        <div class="strategy-card">
          <div class="strategy-icon">📝</div>
          <h3>虚拟DOM</h3>
          <p>使用虚拟DOM库（如Vue、React）批量更新真实DOM，减少操作次数</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon">⚡</div>
          <h3>Web Workers</h3>
          <p>将复杂计算移至Web Worker，避免阻塞主线程</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon">🧪</div>
          <h3>性能监控</h3>
          <p>使用Performance API监测回流重绘性能</p>
          <pre class="inline-code">performance.mark('startUpdate');</pre>
        </div>
      </div>

      <div class="animation-optimization">
        <h3>动画优化原则</h3>
        <div class="principles">
          <div class="principle">
            <div class="badge">1</div>
            <p>优先使用CSS动画</p>
          </div>
          <div class="principle">
            <div class="badge">2</div>
            <p>使用transform和opacity</p>
          </div>
          <div class="principle">
            <div class="badge">3</div>
            <p>使用requestAnimationFrame</p>
          </div>
          <div class="principle">
            <div class="badge">4</div>
            <p>避免在动画中查询布局属性</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">性能检测工具</h2>

      <div class="tools-grid">
        <div class="tool-card">
          <div class="tool-icon">🔍</div>
          <h4>Chrome Performance</h4>
          <p>分析页面运行时性能，识别回流重绘问题</p>
        </div>

        <div class="tool-card">
          <div class="tool-icon">📊</div>
          <h4>Layout Shift Debugger</h4>
          <p>检测意外的布局偏移</p>
        </div>

        <div class="tool-card">
          <div class="tool-icon">📈</div>
          <h4>Rendering面板</h4>
          <p>可视化查看重绘区域和图层</p>
        </div>
      </div>

      <div class="practice-checklist">
        <h3>最佳实践清单</h3>
        <ul>
          <li v-for="(practice, index) in bestPractices" :key="index">
            <input type="checkbox" :id="'practice-' + index" />
            <label :for="'practice-' + index">{{ practice }}</label>
          </li>
        </ul>
      </div>
    </div>

    <div class="resources-section">
      <h2>性能优化资源</h2>
      <div class="resources">
        <a href="#" class="resource-link">Google Web Fundamentals</a>
        <a href="#" class="resource-link">MDN性能指南</a>
        <a href="#" class="resource-link">CSS Triggers参考</a>
        <a href="#" class="resource-link">Chrome DevTools文档</a>
      </div>
      <button class="action-button">获取完整指南</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const reflowCost = ref(75);
const repaintCost = ref(50);
const compositeCost = ref(10);

const bestPractices = ref([
  "批量DOM操作，避免频繁读写",
  "使用文档片段(document fragment)",
  "避免布局抖动(强制同步布局)",
  "使用requestAnimationFrame进行动画",
  "离线操作复杂DOM结构",
  "使用虚拟DOM框架",
  "避免在循环中查询布局属性",
  "优先使用transform和opacity",
  "使用CSS动画替代JS动画",
  "监控性能指标"
]);
</script>

<style scoped lang="less">


:root {
  --primary: #4361ee;
  --secondary: #3f37c9;
  --accent: #4895ef;
  --success: #4cc9f0;
  --warning: #f72585;
  --dark: #2b2d42;
  --light: #f8f9fa;
  --text: #495057;
  --light-text: #6c757d;
  --card-bg: #ffffff;
  --border: #e9ecef;
  --radius: 12px;
  --shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  line-height: 1.6;
}

.performance-optimization {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  border-radius: var(--radius);
  padding: 40px;
  margin-bottom: 40px;
  text-align: center;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 800;
  }

  .subtitle {
    font-size: 1.4rem;
    opacity: 0.9;
    margin-bottom: 30px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
}

.stats-container {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius);
  padding: 20px;
  min-width: 140px;
  backdrop-filter: blur(4px);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.25);
  }

  .stat-value {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 1rem;
    opacity: 0.9;
  }
}

.section {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 35px;
  margin-bottom: 30px;

  .section-title {
    font-size: 1.8rem;
    color: var(--primary);
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--border);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 60px;
      height: 3px;
      background: var(--accent);
      border-radius: 3px;
    }
  }
}

.explanation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.explanation-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-top: 4px solid var(--accent);

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: var(--dark);
  }

  p {
    margin-bottom: 15px;
    color: var(--light-text);
  }
}

.trigger-list {
  padding-left: 20px;
  color: var(--text);

  li {
    margin-bottom: 8px;
    position: relative;

    &::before {
      content: '•';
      color: var(--accent);
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
}

.performance-card {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.performance-graph {
  display: flex;
  align-items: flex-end;
  height: 200px;
  gap: 15px;
  padding: 20px;
  background: #f1f3f9;
  border-radius: var(--radius);
  margin-bottom: 20px;
}

.cost-bar {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  transition: height 1s ease;
  border-radius: 8px 8px 0 0;

  .cost-label {
    transform: rotate(-90deg);
    white-space: nowrap;
    font-size: 0.9rem;
  }

  &.reflow-cost {
    background: linear-gradient(to top, #e63946, #f72585);
    height: 75%;
  }

  &.repaint-cost {
    background: linear-gradient(to top, #ff9e00, #ffaa00);
    height: 50%;
  }

  &.composite-cost {
    background: linear-gradient(to top, #4cc9f0, #4895ef);
    height: 10%;
  }
}

.conclusion {
  background: #e7f5ff;
  padding: 15px;
  border-radius: var(--radius);
  text-align: center;
  font-weight: 600;
  color: var(--primary);

  p {
    margin: 5px 0;
  }
}

.optimization-card {
  display: flex;
  gap: 20px;
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 25px;
  margin-bottom: 25px;
  border: 1px solid var(--border);
  transition: var(--transition);

  &:hover {
    border-color: var(--accent);

  }
}

.card-number {
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 5px;
}

.card-content {
  flex: 1;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--dark);
    font-size: 1.4rem;
  }

  p {
    color: var(--light-text);
    margin-bottom: 20px;
  }
}

.code-comparison {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.code-block {
  flex: 1;
  min-width: 300px;
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  pre {
    padding: 20px;
    margin: 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #cbd5e1;
    overflow-x: auto;

    code {
      font-family: inherit;
    }
  }

  &.bad {
    border-top: 4px solid #f72585;

    pre code {
      .token.punctuation {
        color: #f8f9fa;
      }

      .token.keyword {
        color: #ff6b6b;
      }
    }
  }

  &.good {
    border-top: 4px solid #06d6a0;

    pre code {
      .token.punctuation {
        color: #f8f9fa;
      }

      .token.keyword {
        color: #4cc9f0;
      }
    }
  }
}

.performance-impact {
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
  font-size: 0.9rem;
  font-weight: 500;

  .bad & {
    color: #ff6b6b;
  }

  .good & {
    color: #06d6a0;
  }
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 35px;
}

.strategy-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
  }

  .strategy-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--primary);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 12px;
    color: var(--dark);
  }

  p {
    color: var(--light-text);
    margin-bottom: 15px;
  }
}

.inline-code {
  background: #f1f3f9;
  border-radius: 4px;
  padding: 3px 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: var(--primary);
  display: inline-block;
}

.animation-optimization {
  background: #e7f5ff;
  border-radius: var(--radius);
  padding: 25px;

  h3 {
    text-align: center;
    margin-bottom: 25px;
    color: var(--primary);
    font-size: 1.4rem;
  }
}

.principles {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.principle {
  background: white;
  border-radius: var(--radius);
  padding: 20px;
  text-align: center;
  width: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  .badge {
    width: 40px;
    height: 40px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin: 0 auto 15px;
  }

  p {
    font-weight: 500;
    color: var(--dark);
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 35px;
}

.tool-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 25px;
  text-align: center;
  transition: var(--transition);
  border: 1px solid var(--border);

  &:hover {
    border-color: var(--accent);
    transform: translateY(-5px);
  }

  .tool-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--primary);
  }

  h4 {
    font-size: 1.3rem;
    margin-bottom: 12px;
    color: var(--dark);
  }

  p {
    color: var(--light-text);
  }
}

.practice-checklist {
  background: #f8f9fa;
  border-radius: var(--radius);
  padding: 25px;

  h3 {
    text-align: center;
    margin-bottom: 25px;
    color: var(--primary);
  }

  ul {
    list-style: none;
    max-width: 700px;
    margin: 0 auto;
  }

  li {
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    input[type="checkbox"] {
      margin-right: 15px;
      width: 20px;
      height: 20px;
      accent-color: var(--primary);
    }

    label {
      font-size: 1.1rem;
      color: var(--text);
    }
  }
}

.resources-section {
  background: linear-gradient(135deg, #3a0ca3, #4361ee);
  border-radius: var(--radius);
  padding: 40px;
  text-align: center;
  color: white;
  margin-bottom: 40px;

  h2 {
    font-size: 2rem;
    margin-bottom: 25px;
  }
}

.resources {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.resource-link {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
  }
}

.action-button {
  background: white;
  color: var(--primary);
  border: none;
  padding: 14px 35px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 30px 20px;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .stats-container {
    flex-wrap: wrap;
  }

  .section {
    padding: 25px;
  }

  .code-comparison {
    flex-direction: column;
  }

  .code-block {
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .card-number {
    width: 35px;
    height: 35px;
    font-size: 1.1rem;
  }

  .optimization-card {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
