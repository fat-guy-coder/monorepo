<template>
  <div class="document-container">
    <h1 class="title gradient-text">浏览器渲染机制：重绘与回流</h1>

    <section class="content-section">
      <h2 class="section-title">🎯 基本概念</h2>
      <div class="concept-card">
        <h3 class="concept-title">回流 (Reflow)</h3>
        <p class="concept-desc">
          当元素的布局属性发生变化，导致浏览器需要重新计算元素几何属性并重新排列布局的过程。
          属于<strong class="highlight">高开销</strong>操作。
        </p>
      </div>

      <div class="concept-card">
        <h3 class="concept-title">重绘 (Repaint)</h3>
        <p class="concept-desc">
          当元素的外观样式发生改变但不影响布局时（如颜色变化），浏览器会重新绘制元素。 开销<strong class="highlight">相对较小</strong>。
        </p>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">⚡ 常见触发场景</h2>

      <div class="grid-container">
        <div class="trigger-card danger">
          <h3>回流触发场景</h3>
          <ul>
            <li>调整窗口大小</li>
            <li>增删DOM元素</li>
            <li>修改盒模型属性（width/height/padding等）</li>
            <li>读取offset*、scroll*等布局属性</li>
            <li>激活CSS伪类（如:hover）</li>
          </ul>
        </div>

        <div class="trigger-card warning">
          <h3>重绘触发场景</h3>
          <ul>
            <li>修改颜色相关属性</li>
            <li>修改背景图片</li>
            <li>修改边框样式</li>
            <li>修改visibility属性</li>
            <li>修改文本阴影</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="pro-tips">
      <h2>💡 优化建议</h2>
      <ul class="advices">
        <li>使用transform替代top/left动画</li>
        <li>使用visibility代替display:none</li>
        <li>避免频繁的DOM查询，尽量缓存DOM元素</li>
        <li>使用DocumentFragment处理批量DOM操作</li>
        <li>复杂动画考虑使用requestAnimationFrame</li>
        <li>尽量减少使用inline style，优先使用class</li>
        <li>批量更新DOM时使用requestIdleCallback</li>
        <li>避免使用过多的setTimeout/setInterval，考虑使用IntersectionObserver</li>
        <li>使用懒加载技术优化图片和资源加载</li>
        <li>合理使用keep-alive缓存组件状态</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
// 类型声明示例
interface LayoutElement extends HTMLElement {
  cachedWidth?: number
}
</script>

<style scoped>
.document-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
}

.gradient-text {
  background: linear-gradient(45deg, #42b883, #35495e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.content-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.grid-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.trigger-card {
  padding: 1rem;
  border-radius: 8px;
  color: white;
}

.trigger-card.danger {
  background: linear-gradient(135deg, #ff6b6b, #ff4757);
}

.trigger-card.warning {
  background: linear-gradient(135deg, #ffd93d, #ffb347);
}

.code-block {
  background: #282c34;
  color: #abb2bf;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.optimize-card {
  margin: 1rem 0;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.pro-tips {
  background: #e3f2fd;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;

  .advices {
    list-style: none;

    li {
      margin: 1rem 0;
    }
  }
}

.highlight {
  color: #42b883;
  font-weight: 600;
}
</style>
