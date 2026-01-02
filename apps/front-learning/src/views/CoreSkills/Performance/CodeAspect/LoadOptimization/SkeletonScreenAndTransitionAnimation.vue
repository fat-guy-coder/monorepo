<template>
  <div class="skeleton-transition-guide">
    <header class="guide-header">
      <h1 class="title">骨架屏 & 过渡动画优化方案</h1>
      <p class="subtitle">提升用户感知性能与体验流畅度</p>
    </header>

    <div class="content-columns">
      <section class="skeleton-section">
        <div class="section-header">
          <h2 class="section-title">🦴 骨架屏技术</h2>
          <div class="decorative-bone"></div>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">实现原理</h3>
          <ul class="principle-list">
            <li>在数据加载前预先渲染页面结构轮廓</li>
            <li>使用浅色占位块模拟实际内容布局</li>
            <li>保持与真实UI一致的DOM结构</li>
          </ul>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">核心优点</h3>
          <div class="advantages-grid">
            <div class="advantage-item">
              <div class="advantage-icon">⏱️</div>
              <p>降低用户感知等待时间</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">👁️</div>
              <p>保持视觉布局稳定性</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">💡</div>
              <p>明确内容即将加载的预期</p>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">典型使用场景</h3>
          <div class="scenario-tags">
            <span class="tag">内容型页面初始加载</span>
            <span class="tag">社交动态列表</span>
            <span class="tag">电商商品详情页</span>
            <span class="tag">数据仪表盘</span>
          </div>
        </div>

        <div class="code-showcase">
          <h3 class="code-title">实现示例</h3>
          <pre class="code-block"><code>// 骨架屏组件
const SkeletonLoader = defineComponent({
  setup() {
    return () => (
      &lt;div class="skeleton-container"&gt;
        &lt;div class="skeleton-header" /&gt;
        &lt;div class="skeleton-content"&gt;
          {Array(5).fill().map((_, i) => (
            &lt;div key={i} class="skeleton-row" /&gt;
          ))}
        &lt;/div&gt;
      &lt;/div&gt;
    )
  }
})

// 样式关键点
.skeleton-element {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}</code></pre>
        </div>
      </section>

      <div class="divider"></div>

      <section class="transition-section">
        <div class="section-header">
          <h2 class="section-title">✨ 过渡动画</h2>
          <div class="decorative-sparkle"></div>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">设计原则</h3>
          <ul class="principle-list">
            <li>保持动画时长在200-500ms之间</li>
            <li>使用缓动函数增强自然感</li>
            <li>遵循Material Design等动效规范</li>
          </ul>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">核心价值</h3>
          <div class="advantages-grid">
            <div class="advantage-item">
              <div class="advantage-icon">🔄</div>
              <p>平滑状态转换过程</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">👆</div>
              <p>增强用户操作反馈</p>
            </div>
            <div class="advantage-item">
              <div class="advantage-icon">🧭</div>
              <p>引导用户注意力流向</p>
            </div>
          </div>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">适用场景</h3>
          <div class="scenario-tags">
            <span class="tag">路由页面切换</span>
            <span class="tag">数据加载状态变化</span>
            <span class="tag">交互反馈（点击/悬停）</span>
            <span class="tag">列表项增删排序</span>
          </div>
        </div>

        <div class="code-showcase">
          <h3 class="code-title">实现示例</h3>
          <pre class="code-block"><code>// Vue过渡组件
&lt;transition
  name="fade-move"
  mode="out-in"
  @before-enter="beforeEnter"
  @enter="enter"
  @leave="leave"
&gt;
  &lt;router-view /&gt;
&lt;/transition&gt;

// 动画关键帧
.fade-move-enter-active,
.fade-move-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-move-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-move-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}</code></pre>
        </div>
      </section>
    </div>

    <section class="best-practice">
      <h2 class="section-title">🏆 最佳实践组合</h2>
      <div class="practice-steps">
        <div class="step">
          <div class="step-number">1</div>
          <p>数据加载前显示骨架屏</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-number">2</div>
          <p>数据到达时渐隐骨架屏</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-number">3</div>
          <p>内容呈现使用入场动画</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-number">4</div>
          <p>交互操作提供即时反馈</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 骨架屏props类型定义
interface SkeletonProps {
  rows?: number
  animated?: boolean
  rowHeight?: string
}

</script>

<style lang="less" scoped>
.skeleton-transition-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: #2d3748;
    font-weight: 700;
    background: linear-gradient(90deg, #6b46c1, #805ad5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #718096;
    font-weight: 400;
  }
}

.content-columns {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.divider {
  width: 1px;
  background: linear-gradient(to bottom,
      transparent,
      #e2e8f0,
      transparent);
  margin: 0 1rem;

  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
    margin: 1.5rem 0;
    background: linear-gradient(to right,
        transparent,
        #e2e8f0,
        transparent);
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  color: #2d3748;
  margin: 0;
}

.decorative-bone {
  width: 24px;
  height: 24px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3E%3Cpath d='M8 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'/%3E%3C/svg%3E");
}

.decorative-sparkle {
  width: 24px;
  height: 24px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3E%3Cpath d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'/%3E%3C/svg%3E");
}

.feature-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2f7;
}

.feature-title {
  font-size: 1.1rem;
  color: #4a5568;
  margin-top: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #6b46c1;
    margin-right: 0.5rem;
  }
}

.principle-list {
  padding-left: 1.2rem;

  li {
    margin-bottom: 0.6rem;
    color: #4a5568;
    position: relative;

    &::before {
      content: '•';
      color: #6b46c1;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.advantage-item {
  text-align: center;
  padding: 0.8rem;
  background: #f8fafc;
  border-radius: 0.375rem;

  p {
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
    color: #4a5568;
  }
}

.advantage-icon {
  font-size: 1.5rem;
  color: #6b46c1;
}

.scenario-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #e9d8fd;
  color: #553c9a;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
}

.code-showcase {
  margin-top: 2rem;
}

.code-title {
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.code-block {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  border: 1px solid #e2e8f0;

  code {
    color: #4a5568;
    white-space: pre;
  }
}

.best-practice {
  background: linear-gradient(135deg, #f6f3ff, #f0ebff);
  padding: 2rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
}

.practice-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
}

.step {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  p {
    margin: 0;
    font-weight: 500;
    color: #4a5568;
  }
}

.step-number {
  width: 24px;
  height: 24px;
  background: #6b46c1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

.step-arrow {
  color: #a0aec0;
  font-weight: bold;

  @media (max-width: 640px) {
    transform: rotate(90deg);
  }
}
</style>