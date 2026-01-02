<template>
  <div class="will-change-container">
    <h1 class="title">CSS will-change 解析</h1>

    <section class="intro-section">
      <h2 class="section-title">一、属性概述</h2>
      <div class="content-box">
        <p class="content-text">
          will-change 是一个CSS性能优化属性，用于预先告知浏览器元素可能发生的变化类型，使浏览器提前做好优化准备。
          <span class="highlight">重要特性：</span>
        </p>
        <ul class="feature-list">
          <li>提前分配GPU资源创建合成层</li>
          <li>优化复杂动画/过渡的性能表现</li>
          <li>需要与transform/opacity等属性配合使用</li>
          <li>过度使用可能适得其反</li>
        </ul>
      </div>
    </section>

    <section class="usage-section">
      <h2 class="section-title">二、基本用法</h2>
      <div class="example-block">
        <div class="animation-box" :class="{ active: animate }" @click="toggleAnimation">
          {{ animate ? '正在动画' : '点击触发动画' }}
        </div>
        <pre class="code-sample">{{ usageExample }}</pre>
      </div>
    </section>

    <section class="principle-section">
      <h2 class="section-title">三、工作原理</h2>
      <div class="principle-grid">
        <div class="principle-card">
          <div class="number-badge">1</div>
          <h3>创建合成层</h3>
          <p>浏览器提前为元素创建独立的图形层</p>
        </div>
        <div class="principle-card">
          <div class="number-badge">2</div>
          <h3>资源预分配</h3>
          <p>分配GPU资源并优化渲染路径</p>
        </div>
        <div class="principle-card">
          <div class="number-badge">3</div>
          <h3>变化预测</h3>
          <p>根据指定属性优化重绘策略</p>
        </div>
      </div>
    </section>

    <section class="scenario-section">
      <h2 class="section-title">四、使用场景</h2>
      <div class="scenario-list">
        <div class="scenario-item">
          <span class="icon">🎮</span>
          <div>
            <h3>复杂动画</h3>
            <p>3D变换/连续位移动画</p>
          </div>
        </div>
        <div class="scenario-item">
          <span class="icon">🖥️</span>
          <div>
            <h3>高频交互</h3>
            <p>拖拽/视差滚动效果</p>
          </div>
        </div>
      </div>
    </section>

    <section class="notice-section">
      <h2 class="section-title">五、注意事项</h2>
      <div class="notice-grid">
        <div class="notice-card warning">
          <h3>⚠️ 不要滥用</h3>
          <p>每个will-change都会消耗额外内存</p>
        </div>
        <div class="notice-card tip">
          <h3>💡 最佳实践</h3>
          <p>动画结束后移除will-change</p>
          <p>怎么移除will-change？</p>
          <p>js移除</p>
          <pre><code>
            element.style.willChange = 'auto';
          </code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const animate = ref(false);
const toggleAnimation = () => {
  animate.value = !animate.value;
};

const usageExample = `<style lang="less">
.animation-element {
  will-change: transform, opacity;
  transition: transform 0.3s;

  &.active {
    transform: translateX(200px);
  }
}
</style>`;
</script>

<style lang="less" scoped>
.will-change-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 20px;
  font-family: 'Segoe UI', system-ui;

  .title {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.2rem;
  }

  .section-title {
    color: #34495e;
    border-left: 4px solid #42b983;
    padding-left: 1rem;
    margin: 2.5rem 0;
    font-size: 1.5rem;
  }

  .content-box {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #eee;
  }

  .highlight {
    color: #e74c3c;
    font-weight: 600;
  }

  .feature-list {
    line-height: 1.8;
    color: #7f8c8d;
    padding-left: 1.5rem;

    li {
      margin: 0.8rem 0;
    }
  }

  .example-block {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .animation-box {
    width: 200px;
    height: 100px;
    background: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;

    &.active {
      transform: translateX(200px) rotate(360deg);
      opacity: 0.7;
    }
  }

  .code-sample {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 1rem;
    border-radius: 6px;
    margin-top: 1rem;
    overflow-x: auto;
  }

  .principle-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .principle-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #eee;
    text-align: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      color: #2c3e50;
      margin: 1rem 0;
    }

    p {
      color: #7f8c8d;
      font-size: 0.95rem;
    }
  }

  .number-badge {
    width: 40px;
    height: 40px;
    background: #42b983;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-weight: bold;
  }

  .scenario-list {
    display: grid;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .scenario-item {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #eee;

    .icon {
      font-size: 2rem;
      margin-right: 1.5rem;
    }

    h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    p {
      color: #7f8c8d;
    }
  }

  .notice-grid {
    display: grid;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .notice-card {
    padding: 1.5rem;
    border-radius: 8px;
    color: white;

    &.warning {
      background: #e74c3c;
    }

    &.tip {
      background: #2ecc71;
    }

    h3 {
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
    }
  }
}
</style>