<template>
  <div class="zindex-container">
    <h1 class="main-title">CSS z-index 层叠奥秘</h1>

    <div class="theory-content">
      <h2>z-index 是什么？</h2>
      <p>z-index 是 CSS 中的一个属性，用于控制元素的堆叠顺序。</p>
      <p>z-index 的值可以是数字，也可以是 auto。</p>
      <p>z-index 的值越大，元素越靠前。</p>
      <p>z-index 的值越小，元素越靠后。</p>
      <p>z-index 的值为 auto 时，元素的堆叠顺序由其父元素的 z-index 决定。</p>
    </div>


    <div class="content-wrapper">
      <!-- 理论讲解 -->
      <div class="theory-section">
        <div class="theory-card">
          <h2>📚 核心概念</h2>
          <div class="concept-grid">
            <div class="concept-item">
              <h3>层叠上下文</h3>
              <p>由特定属性创建的独立层叠环境</p>
              <code>position: relative/absolute/fixed<br />opacity < 1<br />transform<br />filter<br />...</code>
            </div>
            <div class="concept-item">
              <h3>层叠等级</h3>
              <p>同一上下文中元素的堆叠顺序</p>
              <code>z-index: auto | &lt;integer&gt;</code>
            </div>
          </div>
        </div>

        <div class="theory-card">
          <h2>🎯 使用场景</h2>
          <ul class="use-case-list">
            <li>模态对话框</li>
            <li>下拉菜单</li>
            <li>悬浮提示</li>
            <li>自定义滚动条</li>
            <li>复杂动画元素</li>
          </ul>
        </div>
      </div>

      <!-- 交互演示 -->
      <div class="demo-section">
        <div class="demo-stack">
          <div v-for="(item, index) in stackItems" :key="index" class="stack-item" :style="{
            zIndex: item.zIndex,
            backgroundColor: itemColors[index],
            transform: `translate(${item.offsetX}px, ${item.offsetY}px)`,
          }" @mousedown="startDragging(index, $event)">
            <div class="item-header">
              <span>Layer {{ index + 1 }}</span>
              <input type="number" v-model.number="item.zIndex" class="zindex-input" />
            </div>
          </div>
        </div>
      </div>

      <!-- 注意事项 -->
      <div class="notice-section">
        <div class="notice-card warning">
          <h3>⚠️ 常见问题</h3>
          <ul>
            <li>z-index 不生效？检查定位属性</li>
            <li>父级层叠上下文限制子元素层级</li>
            <li>避免使用过大数值（维护性问题）</li>
          </ul>
        </div>

        <div class="notice-card tip">
          <h3>💡 最佳实践</h3>
          <ul>
            <li>使用CSS变量管理层级</li>
            <li>采用层叠上下文分组策略</li>
            <li>使用Sass/Less变量系统</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface StackItem {
  zIndex: number | string
  offsetX: number
  offsetY: number
}

const itemColors = ['#3498db', '#2ecc71', '#e67e22', '#9b59b6']
const stackItems = reactive<StackItem[]>([
  { zIndex: 3, offsetX: 0, offsetY: 0 },
  { zIndex: 2, offsetX: 20, offsetY: 20 },
  { zIndex: 1, offsetX: 40, offsetY: 40 },
  { zIndex: 0, offsetX: 60, offsetY: 60 },
])

let dragIndex = -1
let startX = 0
let startY = 0

const startDragging = (index: number, e: MouseEvent) => {
  dragIndex = index
  startX = e.clientX - stackItems[index].offsetX
  startY = e.clientY - stackItems[index].offsetY

  const moveHandler = (moveEvent: MouseEvent) => {
    if (dragIndex === -1) return
    stackItems[dragIndex].offsetX = moveEvent.clientX - startX
    stackItems[dragIndex].offsetY = moveEvent.clientY - startY
  }

  const stopHandler = () => {
    dragIndex = -1
    window.removeEventListener('mousemove', moveHandler)
    window.removeEventListener('mouseup', stopHandler)
  }

  window.addEventListener('mousemove', moveHandler)
  window.addEventListener('mouseup', stopHandler)
}
</script>

<style scoped>
.zindex-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #111827;
  background-color: #f9fafb;
}

.main-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
}

.main-title::after {
  display: none;
}

.theory-content {
  box-shadow: none;
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
  margin-bottom: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.content-wrapper {
  display: grid;
  gap: 1.5rem;
}

.theory-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.theory-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.theory-card h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.concept-grid {
  display: grid;
  gap: 1rem;
}

.concept-item {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
}

.concept-item code {
  font-size: 0.9em;
}

.use-case-list {
  display: grid;
  gap: 0.5rem;
  padding-left: 0;
  list-style: none;
}

.use-case-list li {
  position: relative;
  padding-left: 1.2rem;
}

.use-case-list li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: #3b82f6;
}

.demo-section {
  position: relative;
  min-height: 350px;
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.demo-stack {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.stack-item {
  position: absolute;
  width: 250px;
  height: 150px;
  border-radius: 8px;
  padding: 1rem;
  cursor: move;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.stack-item:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.zindex-input {
  width: 50px;
  padding: 0.3rem;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-align: center;
}

.notice-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.notice-card {
  padding: 1.5rem;
  border-radius: 8px;
}

.notice-card h3 {
  margin-top: 0;
  margin-bottom: 0.8rem;
}

.notice-card ul {
  padding-left: 1rem;
  margin: 0;
}

.notice-card li {
  font-size: 0.95rem;
}

.notice-card.warning {
  background: #fef2f2;
  border-left: 3px solid #ef4444;
}

.notice-card.tip {
  background: #eff6ff;
  border-left: 3px solid #3b82f6;
}

code {
  font-family: 'Fira Code', monospace;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 4px;
}
</style>
