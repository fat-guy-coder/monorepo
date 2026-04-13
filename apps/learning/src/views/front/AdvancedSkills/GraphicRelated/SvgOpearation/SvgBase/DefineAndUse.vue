<template>
  <div class="svg-defs-container">
    <h1 class="main-title">SVG Defs 与 Use 元素基础介绍</h1>

    <!-- 介绍部分 -->
    <section class="intro-section">
      <h2 class="section-title">📝 基本概念</h2>
      <div class="concept-grid">
        <div class="concept-card">
          <h3>&lt;defs&gt; 元素</h3>
          <p>defs 元素用于存储图形对象，作为可重复使用的资源。它定义的内容不会直接显示在页面上,而是作为模板供后续使用。</p>
          <ul class="feature-list">
            <li>可以存储渐变、符号、路径等</li>
            <li>提高代码复用性</li>
            <li>便于集中管理图形资源</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>&lt;use&gt; 元素</h3>
          <p>use 元素可以在SVG文档中复制使用其他元素。它通过引用 defs 中定义的元素来实现重复使用。</p>
          <ul class="feature-list">
            <li>通过 href 属性引用目标元素</li>
            <li>可以改变位置和样式</li>
            <li>减少重复代码</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 功能基础介绍 -->
    <section class="detail-section">
      <h2 class="section-title">🔧 核心功能</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="icon-box">
            <svg width="40" height="40">
              <use href="#symbol-icon" />
            </svg>
          </div>
          <h3>代码复用</h3>
          <p>定义一次，多次使用</p>
        </div>
        <div class="feature-card">
          <div class="icon-box">
            <svg width="40" height="40">
              <use href="#gradient-icon" />
            </svg>
          </div>
          <h3>资源定义</h3>
          <p>渐变/滤镜/图案等复杂资源</p>
        </div>
      </div>
    </section>

    <!-- 代码示例 -->
    <section class="code-section">
      <h2 class="section-title">💻 代码示例</h2>
      <div class="code-tabs">
        <button v-for="tab in codeTabs" :key="tab.id" @click="activeTab = tab.id"
          :class="{ active: activeTab === tab.id }">
          {{ tab.label }}
        </button>
      </div>

      <div class="code-content">
        <pre v-show="activeTab === 'basic'"><code>{{ basicExample }}</code></pre>
        <pre v-show="activeTab === 'gradient'"><code>{{ gradientExample }}</code></pre>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="usage-section">
      <h2 class="section-title">📌 使用场景</h2>
      <div class="usage-grid">
        <div class="usage-card">
          <h3>图标系统</h3>
          <svg width="80" height="80">
            <use href="#reuse-icon" />
            <use href="#reuse-icon" x="20" y="20" opacity="0.6" />
          </svg>
        </div>
        <div class="usage-card">
          <h3>复杂图形</h3>
          <svg width="80" height="80">
            <use href="#pattern-shape" />
          </svg>
        </div>
      </div>
    </section>

    <!-- 定义隐藏的SVG资源 -->
    <svg style="display: none">
      <symbol id="symbol-icon" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </symbol>

      <linearGradient id="gradient-icon" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#42b983" />
        <stop offset="100%" stop-color="#3498db" />
      </linearGradient>

      <g id="reuse-icon">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </g>

      <pattern id="pattern-shape" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="8" fill="#e74c3c" />
      </pattern>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('basic');

const codeTabs = [
  { id: 'basic', label: '基础用法' },
  { id: 'gradient', label: '渐变示例' }
];

const basicExample = `<template>
  <svg>
    <defs>
      <g id="myShape">
        <rect width="50" height="50"/>
        <circle cx="25" cy="25" r="20"/>
      </g>
    </defs>

    <use href="#myShape" x="100"/>
    <use href="#myShape" x="200" fill="blue"/>
  </svg>
</template>`;

const gradientExample = `<svg>
  <defs>
    <linearGradient id="myGradient">
      <stop offset="0%" stop-color="#42b983"/>
      <stop offset="100%" stop-color="#3498db"/>
    </linearGradient>
  </defs>

  <rect fill="url(#myGradient)"
        width="200"
        height="100"/>
</svg>`;
</script>

<style lang="less" scoped>
.intro-section {
  .concept-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;

    .concept-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

    }
  }
}

.svg-defs-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 20px;
  font-family: 'Segoe UI', system-ui;

  .main-title {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.4rem;
  }

  .concept-svg {
    width: 100%;
    height: 200px;
    background: #f8f9fa;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .section-title {
    color: #34495e;
    border-left: 4px solid #42b983;
    padding-left: 1rem;
    margin: 2.5rem 0;
    font-size: 1.6rem;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .icon-box {
        width: 60px;
        height: 60px;
        background: #f8f9fa;
        border-radius: 50%;
        margin: 0 auto 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .code-section {
    margin: 3rem 0;

    .code-tabs {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;

      button {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 4px;
        background: #f8f9fa;
        cursor: pointer;
        transition: all 0.3s;

        &.active {
          background: #42b983;
          color: white;
        }
      }
    }

    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 1.5rem;
      border-radius: 8px;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', monospace;
      }
    }
  }

  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;

    .usage-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      svg {
        margin-top: 1rem;
        fill: #42b983;
      }
    }
  }
}

// 定义动画效果
.feature-card:hover .icon-box {
  animation: float 1.5s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}
</style>
