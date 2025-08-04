<template>
  <div class="opacity-guide">
    <h1 class="main-title">CSS Opacity 基本指南</h1>

    <!-- 基础介绍 -->
    <section class="intro-section">
      <h2 class="section-title">🔍 基础概念</h2>
      <div class="content-card">
        <p class="highlight-text">opacity属性控制元素的透明度，取值范围0.0（完全透明）到1.0（完全不透明）</p>
        <div class="opacity-visual">
          <div v-for="level in opacityLevels" :key="level.value" class="opacity-box" :style="{ opacity: level.value }">
            {{ level.label }}
          </div>
        </div>
      </div>
    </section>

    <!-- 使用方法 -->
    <section class="usage-section">
      <h2 class="section-title">🛠️ 使用方法</h2>
      <div class="columns-container">
        <div class="code-card">
          <pre><code>/* 基本用法 */
.element {
  opacity: 0.5; /* 半透明 */
}

/* 配合过渡效果 */
.fade-in {
  transition: opacity 0.3s ease;
  opacity: 1;
}

/* 配合伪类 */
.button:hover {
  opacity: 0.8;
}

/* 动画效果 */
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}</code></pre>
        </div>
        <div class="example-card">
          <div class="hover-demo">
            <div class="demo-box">悬停查看透明度变化</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="usage-scenarios">
      <h2 class="section-title">💡 使用场景</h2>
      <div class="scenario-grid">
        <div v-for="(scene, index) in scenarios" :key="index" class="scene-card">
          <div class="icon">{{ scene.icon }}</div>
          <h4>{{ scene.title }}</h4>
          <p>{{ scene.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 优缺点 -->
    <section class="pros-cons-section">
      <h2 class="section-title">⚖️ 优缺点分析</h2>
      <div class="columns-container">
        <div class="pros-card">
          <h3>✅ 优点</h3>
          <ul>
            <li v-for="(pro, index) in pros" :key="index">{{ pro }}</li>
          </ul>
        </div>
        <div class="cons-card">
          <h3>❌ 缺点</h3>
          <ul>
            <li v-for="(con, index) in cons" :key="index">{{ con }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="notice-grid">
        <div class="notice-card">
          <ul>
            <li v-for="(notice, index) in notices" :key="index">{{ notice }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const opacityLevels = reactive([
  { value: 1, label: '不透明' },
  { value: 0.75, label: '微透明' },
  { value: 0.5, label: '半透明' },
  { value: 0.25, label: '高透明' },
  { value: 0, label: '全透明' }
])

const scenarios = reactive([
  { icon: '🎨', title: '视觉过渡', desc: '悬停/点击状态切换效果' },
  { icon: '🖼️', title: '图片叠加', desc: '创建多层叠加视觉效果' },
  { icon: '📲', title: '加载状态', desc: '禁用元素的半透明效果' },
  { icon: '🎭', title: '淡入淡出', desc: '元素出现/消失的动画效果' }
])

const pros = reactive([
  '简单易用的透明度控制',
  '支持过渡动画效果',
  '不影响元素布局',
  '所有子元素继承透明度'
])

const cons = reactive([
  '无法单独设置子元素透明度',
  '可能影响文字可读性',
  '透明区域无法交互',
  '低版本IE兼容性问题'
])

const notices = reactive([
  '与visibility: hidden的区别（保留布局空间）',
  '使用rgba颜色实现背景透明但内容不透明',
  'opacity: 0的元素仍可触发点击事件',
  '动画性能优化建议使用合成层'
])
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@accent-purple: #8e44ad;
@accent-pink: #e84393;
@background-light: #f8f9fa;

.opacity-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui;

  .main-title {
    color: @primary-color;
    text-align: center;
    font-size: 2.4rem;
    margin-bottom: 3rem;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, @accent-purple, @accent-pink);
      margin: 1rem auto;
    }
  }

  .section-title {
    color: @accent-purple;
    margin: 2.5rem 0 1.5rem;
    font-size: 1.8rem;
    border-left: 4px solid @accent-pink;
    padding-left: 1rem;
  }

  .opacity-visual {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(5, 1fr);
    margin: 2rem 0;

    .opacity-box {
      height: 80px;
      background: @accent-purple;
      color: white;
      display: grid;
      place-items: center;
      border-radius: 8px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }
  }

  .columns-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .code-card {
    pre {
      margin: 0;
      background: darken(@background-light, 3%);
      padding: 1.5rem;
      border-radius: 8px;

      code {
        font-family: 'Fira Code', monospace;
        color: @primary-color;
        line-height: 1.6;
      }
    }
  }

  .hover-demo {
    padding: 2rem;
    background: @background-light;
    border-radius: 8px;

    .demo-box {
      height: 100px;
      background: @accent-pink;
      color: white;
      display: grid;
      place-items: center;
      border-radius: 8px;
      transition: opacity 0.3s ease;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }
  }

  .scenario-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

    .scene-card {
      text-align: center;
      padding: 1.5rem;
      background: #fff;
      border-radius: 12px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }
  }

  .pros-cons-section {

    .pros-card,
    .cons-card {
      padding: 1.5rem;
      border-radius: 8px;

      ul {
        padding-left: 1.5rem;
        list-style-type: '▹';
      }
    }

    .pros-card {
      background: lighten(@accent-purple, 40%);
      border: 2px solid @accent-purple;
    }

    .cons-card {
      background: lighten(@accent-pink, 40%);
      border: 2px solid @accent-pink;
    }
  }

  .notice-card {
    background: #fff3e0;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid #ffb300;

    ul {
      padding-left: 1.5rem;
      list-style-type: '❗';
    }
  }
}
</style>
