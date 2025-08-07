<template>
  <div class="event-delegation">
    <header class="header">
      <div class="header-content">
        <h1>🎯 JavaScript 事件委托</h1>
        <p>高效处理 DOM 事件的强大技术</p>
      </div>
      <div class="visualization">
        <div class="delegation-flow">
          <div class="flow-item">事件触发</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item">事件冒泡</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item">父元素捕获</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item">委托处理</div>
        </div>
      </div>
    </header>

    <div class="content-container">
      <!-- 概念部分 -->
      <section class="concept-section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>事件委托概念</h2>
        </div>
        <div class="concept-content">
          <div class="definition-card">
            <p>
              <strong>事件委托</strong>是一种利用事件冒泡机制的技术，它将事件监听器添加到父元素而不是每个子元素上。
              当子元素触发事件时，事件会冒泡到父元素，父元素上的监听器通过 <code>event.target</code> 识别事件源并进行处理。
            </p>
          </div>

          <div class="bubbling-example">
            <h3>事件冒泡机制</h3>
            <div class="bubbling-container">
              <div class="element grandparent" @click="handleClick('祖元素')">
                <div class="label">document</div>
                <div class="element parent" @click="handleClick('父元素')">
                  <div class="label">ul (委托元素)</div>
                  <div class="element child" @click="handleClick('子元素1')">
                    <div class="label">li 1</div>
                  </div>
                  <div class="element child" @click="handleClick('子元素2')">
                    <div class="label">li 2</div>
                  </div>
                  <div class="element child" @click="handleClick('子元素3')">
                    <div class="label">li 3</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bubbling-result">
              <p v-if="clickResult">点击了: {{ clickResult }}</p>
              <p v-else>点击上面的元素查看事件冒泡路径</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 代码示例 -->
      <section class="code-section">
        <div class="section-header">
          <div class="section-icon">💻</div>
          <h2>代码示例</h2>
        </div>

        <div class="code-tabs">
          <button v-for="(tab, index) in codeTabs" :key="index"
            :class="['tab-button', { active: activeCodeTab === index }]" @click="activeCodeTab = index">
            {{ tab }}
          </button>
        </div>

        <div class="code-content">
          <div v-show="activeCodeTab === 0" class="code-example">
            <h3>传统事件处理方式</h3>
            <pre><code>// 为每个列表项添加点击事件
const items = document.querySelectorAll('#list li');

items.forEach(item => {
  item.addEventListener('click', function() {
    console.log('点击了:', this.textContent);
    this.classList.add('active');
  });
});

// 问题：
// 1. 每个元素都有独立的事件监听器
// 2. 内存占用较高
// 3. 动态添加的元素需要单独绑定事件</code></pre>

            <div class="performance-comparison">
              <div class="performance-card">
                <div class="performance-title">5个元素</div>
                <div class="performance-value">5个监听器</div>
              </div>
              <div class="performance-card">
                <div class="performance-title">50个元素</div>
                <div class="performance-value">50个监听器</div>
              </div>
              <div class="performance-card">
                <div class="performance-title">500个元素</div>
                <div class="performance-value">500个监听器</div>
              </div>
            </div>
          </div>

          <div v-show="activeCodeTab === 1" class="code-example">
            <h3>事件委托方式</h3>
            <pre><code>// 只需一个事件监听器在父元素上
const list = document.getElementById('list');

list.addEventListener('click', function(event) {
  // 检查事件源是否是列表项
  if (event.target.tagName === 'LI') {
    console.log('点击了:', event.target.textContent);
    event.target.classList.add('active');
  }

  // 或者使用更精细的选择器匹配
  if (event.target.matches('.item')) {
    // 处理特定类名的元素
  }
});

// 优点：
// 1. 只需一个事件监听器
// 2. 自动处理动态添加的元素
// 3. 内存使用更高效</code></pre>

            <div class="performance-comparison">
              <div class="performance-card efficient">
                <div class="performance-title">5个元素</div>
                <div class="performance-value">1个监听器</div>
              </div>
              <div class="performance-card efficient">
                <div class="performance-title">50个元素</div>
                <div class="performance-value">1个监听器</div>
              </div>
              <div class="performance-card efficient">
                <div class="performance-title">500个元素</div>
                <div class="performance-value">1个监听器</div>
              </div>
            </div>
          </div>

          <div v-show="activeCodeTab === 2" class="code-example">
            <h3>事件委托实际应用</h3>
            <pre><code>// 表格行点击处理
document.querySelector('#data-table').addEventListener('click', e => {
  const row = e.target.closest('tr');
  if (!row) return;

  console.log('行点击:', row.rowIndex);

  // 根据特定按钮处理
  if (e.target.matches('.delete-btn')) {
    deleteItem(row.dataset.id);
  }

  if (e.target.matches('.edit-btn')) {
    editItem(row.dataset.id);
  }
});

// 动态内容处理
const container = document.getElementById('dynamic-content');

container.addEventListener('click', e => {
  if (e.target.matches('.new-item')) {
    // 处理动态添加的元素
  }
});

// 事件委托移除事件
function setupHandler() {
  container.addEventListener('click', clickHandler);
}

function removeHandler() {
  container.removeEventListener('click', clickHandler);
}

function clickHandler(e) {
  // 事件处理逻辑
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="usage-section">
        <div class="section-header">
          <div class="section-icon">💡</div>
          <h2>使用场景</h2>
        </div>

        <div class="usage-grid">
          <div class="usage-card">
            <div class="usage-icon">📋</div>
            <h3>大型列表/表格</h3>
            <p>处理包含大量项目的列表或表格行点击事件</p>
          </div>
          <div class="usage-card">
            <div class="usage-icon">🔄</div>
            <h3>动态内容</h3>
            <p>为动态添加的元素提供事件处理</p>
          </div>
          <div class="usage-card">
            <div class="usage-icon">📊</div>
            <h3>性能优化</h3>
            <p>减少内存使用，提高页面性能</p>
          </div>
          <div class="usage-card">
            <div class="usage-icon">🧩</div>
            <h3>组件开发</h3>
            <p>在UI框架中处理复杂组件事件</p>
          </div>
        </div>

        <div class="advanced-usage">
          <h3>高级使用场景</h3>
          <div class="advanced-grid">
            <div class="advanced-card">
              <div class="advanced-icon">🔗</div>
              <div>
                <h4>事件代理库</h4>
                <p>使用类似 jQuery 的 on() 方法实现委托</p>
              </div>
            </div>
            <div class="advanced-card">
              <div class="advanced-icon">🎯</div>
              <div>
                <h4>精确事件匹配</h4>
                <p>使用 event.target.matches() 精确选择元素</p>
              </div>
            </div>
            <div class="advanced-card">
              <div class="advanced-icon">🚫</div>
              <div>
                <h4>阻止不必要处理</h4>
                <p>通过 event.stopPropagation() 控制事件流</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 事件移除 -->
      <section class="removal-section">
        <div class="section-header">
          <div class="section-icon">🗑️</div>
          <h2>移除事件监听器</h2>
        </div>

        <div class="removal-content">
          <div class="removal-description">
            <p>
              <code>removeEventListener()</code> 用于从元素上移除先前添加的事件监听器。
              正确移除不再需要的事件监听器对于避免内存泄漏和优化性能至关重要。
            </p>

            <div class="syntax-card">
              <h3>语法</h3>
              <pre>element.removeEventListener(type, listener[, options]);
element.removeEventListener(type, listener[, useCapture]);</pre>
            </div>

            <div class="removal-reasons">
              <h3>为什么需要移除事件监听器？</h3>
              <ul>
                <li v-for="(reason, index) in removalReasons" :key="index">
                  <div class="reason-icon">⚠️</div>
                  <div>{{ reason }}</div>
                </li>
              </ul>
            </div>
          </div>

          <div class="removal-examples">
            <h3>使用示例</h3>
            <div class="example-card">
              <h4>基本用法</h4>
              <pre><code>// 添加事件监听器
const button = document.getElementById('myButton');
const handleClick = () => console.log('按钮被点击');

button.addEventListener('click', handleClick);

// 移除事件监听器
button.removeEventListener('click', handleClick);</code></pre>
            </div>

            <div class="example-card">
              <h4>事件委托中的移除</h4>
              <pre><code>const list = document.getElementById('myList');
const handler = (e) => {
  if (e.target.matches('li')) {
    console.log('列表项点击:', e.target.textContent);
  }
};

// 添加委托事件
list.addEventListener('click', handler);

// 当不再需要时移除
function cleanup() {
  list.removeEventListener('click', handler);
  console.log('事件监听器已移除');
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="considerations-section">
        <div class="section-header">
          <div class="section-icon">⚠️</div>
          <h2>注意事项</h2>
        </div>

        <div class="considerations-grid">
          <div class="consideration-card">
            <div class="consideration-icon">🔍</div>
            <h3>事件目标匹配</h3>
            <p>使用 event.target 时要小心，它可能是嵌套元素</p>
            <pre>// 使用 closest() 方法
const item = event.target.closest('.list-item');</pre>
          </div>
          <div class="consideration-card">
            <div class="consideration-icon">🚫</div>
            <h3>事件冒泡中断</h3>
            <p>stopPropagation() 会阻止事件到达委托元素</p>
            <pre>// 避免在子元素中使用
event.stopPropagation();</pre>
          </div>
          <div class="consideration-card">
            <div class="consideration-icon">⚡</div>
            <h3>性能考量</h3>
            <p>避免在大型委托中使用复杂的选择器匹配</p>
            <pre>// 保持选择器简单
event.target.matches('li')</pre>
          </div>
          <div class="consideration-card">
            <div class="consideration-icon">🧪</div>
            <h3>事件委托测试</h3>
            <p>确保为动态内容编写全面的测试用例</p>
            <pre>// 测试事件是否被正确处理
simulateClick(dynamicElement);</pre>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="summary">
          <h3>事件委托总结</h3>
          <p>
            事件委托是 JavaScript 中强大的事件处理模式，它利用事件冒泡机制在父元素上处理多个子元素的事件。
            这种技术提高了性能、减少了内存使用，并简化了动态内容的事件处理。
          </p>
        </div>
        <div class="footer-links">
          <a href="https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events#%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98"
            target="_blank">MDN 文档</a>
          <a href="https://javascript.info/event-delegation" target="_blank">JavaScript.info 教程</a>
          <a href="https://dmitripavlutin.com/javascript-event-delegation/" target="_blank">高级指南</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const codeTabs = ['传统方式', '事件委托', '实际应用'];
const activeCodeTab = ref(1);
const clickResult = ref('');

const removalReasons = [
  '防止内存泄漏 - 避免未使用的监听器占用内存',
  '提高性能 - 减少不必要的事件处理',
  '避免重复处理 - 防止事件被多次处理',
  '组件卸载时清理 - 在单页应用中尤为重要',
  '满足业务需求 - 某些场景需要临时禁用事件'
];

const handleClick = (element: string) => {
  clickResult.value = element;
};
</script>

<style lang="less" scoped>


.event-delegation {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #2d3748;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;

  * {
    box-sizing: border-box;
  }
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(120deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  color: white;

  .header-content {
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    p {
      font-size: 1.2rem;
      color: #dbeafe;
      margin-top: 0;
    }
  }
}

.visualization {
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.delegation-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;

  .flow-item {
    background: rgba(255, 255, 255, 0.9);
    color: #2563eb;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .flow-arrow {
    font-size: 1.8rem;
    color: white;
    font-weight: bold;
  }
}

.content-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(120deg, #eff6ff 0%, #dbeafe 100%);
  border-bottom: 2px solid #d1d5db;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #1d4ed8;
  }

  .section-icon {
    font-size: 1.8rem;
    margin-right: 1.2rem;
    background: #3b82f6;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
}

.concept-section {
  .concept-content {
    padding: 2rem;
  }
}

.definition-card {
  background: #f0f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #3b82f6;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4b5563;
    margin: 0;

    strong {
      color: #1e40af;
    }

    code {
      background: #dbeafe;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      color: #1d4ed8;
      font-family: 'Fira Code', monospace;
    }
  }
}

.bubbling-example {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;

  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
}

.bubbling-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.element {
  padding: 1.5rem;
  margin: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-align: center;
  min-width: 150px;

  .label {
    font-weight: 600;
    margin-top: 0.5rem;
  }

  &:hover {
    transform: scale(1.05);
  }
}

.grandparent {
  background: #93c5fd;
  border: 2px solid #3b82f6;

  .label {
    color: #1e40af;
  }
}

.parent {
  background: #bfdbfe;
  border: 2px solid #60a5fa;

  .label {
    color: #1d4ed8;
  }
}

.child {
  background: #dbeafe;
  border: 2px solid #93c5fd;
  margin: 15px 0;

  .label {
    color: #2563eb;
  }
}

.bubbling-result {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #dbeafe;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  color: #1e40af;
}

.code-section {
  .code-tabs {
    display: flex;
    padding: 0 2rem;
    background: #f1f5f9;
  }
}

.tab-button {
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: #e0f2fe;
    color: #1d4ed8;
  }

  &.active {
    background: white;
    color: #1d4ed8;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #3b82f6;
    }
  }
}

.code-content {
  padding: 1.5rem 2rem;
}

.code-example {
  pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.2rem;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;

    code {
      display: block;
    }
  }
}

.performance-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.performance-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;

  &.efficient {
    border-color: #10b981;
    background: #f0fdf4;

    .performance-title,
    .performance-value {
      color: #047857;
    }
  }

  .performance-title {
    color: #4b5563;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .performance-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1d4ed8;
  }
}

.usage-section {
  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }
}

.usage-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
  }

  .usage-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: #3b82f6;
  }

  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    margin: 0;
    line-height: 1.6;
  }
}

.advanced-usage {
  padding: 1.5rem 2rem;

  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.advanced-card {
  display: flex;
  padding: 1.5rem;
  background: #f0f9ff;
  border-radius: 10px;
  border-left: 4px solid #3b82f6;
  align-items: center;

  .advanced-icon {
    font-size: 1.8rem;
    margin-right: 1.5rem;
    color: #3b82f6;
    flex-shrink: 0;
  }

  h4 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    color: #4b5563;
    margin: 0;
    line-height: 1.6;
  }
}

.removal-section {
  .removal-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 1.5rem 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.removal-description {
  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 1.5rem;

    code {
      background: #dbeafe;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      color: #1d4ed8;
      font-family: 'Fira Code', monospace;
    }
  }
}

.syntax-card {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1.2rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  margin-bottom: 1.5rem;

  h3 {
    color: #93c5fd;
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
  }

  pre {
    margin: 0;
    overflow-x: auto;
  }
}

.removal-reasons {
  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid #e5e7eb;

    &:last-child {
      border-bottom: none;
    }

    .reason-icon {
      margin-right: 1rem;
      font-size: 1.2rem;
      color: #ef4444;
      flex-shrink: 0;
    }
  }
}

.removal-examples {
  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
}

.example-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  border: 1px solid #e5e7eb;

  h4 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  pre {
    background: #f1f5f9;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;

    code {
      display: block;
    }
  }
}

.considerations-section {
  .considerations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }
}

.consideration-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
  }

  .consideration-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }

  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  pre {
    background: #f1f5f9;
    padding: 0.8rem;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    overflow-x: auto;
  }
}

.footer {
  background: linear-gradient(120deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 3rem 2rem;

  .summary {
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #e0f2fe;
    }

    p {
      font-size: 1.1rem;
      color: #cbd5e1;
      line-height: 1.7;
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;

    a {
      color: #93c5fd;
      text-decoration: none;
      padding: 0.8rem 1.5rem;
      border-radius: 50px;
      border: 1px solid #334155;
      transition: all 0.3s ease;

      &:hover {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }
    }
  }
}

@media (max-width: 768px) {
  .event-delegation {
    padding: 1rem;
  }

  .header {
    padding: 1.5rem;

    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .section-header {
    padding: 1rem;

    h2 {
      font-size: 1.5rem;
    }
  }

  .delegation-flow {
    flex-direction: column;
    gap: 0.5rem;

    .flow-arrow {
      transform: rotate(90deg);
    }
  }

  .bubbling-container {
    flex-direction: column;
    align-items: center;
  }

  .element {
    width: 100%;
    max-width: 300px;
  }
}
</style>
