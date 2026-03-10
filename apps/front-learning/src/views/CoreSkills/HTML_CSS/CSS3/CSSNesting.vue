<template>
  <div class="nesting-container">
    <header class="hero-banner">
      <h1 class="title">CSS 嵌套特性基本指南</h1>
    </header>

    <!-- 特性简介 -->
    <section class="section intro-section">
      <div class="content-box">
        <h2 class="section-title sparkle">🎨 什么是CSS嵌套？</h2>
        <p class="highlight-text">
          原生CSS嵌套允许开发者使用Sass/Less风格的嵌套语法，提高样式代码的可读性和维护性
        </p>
      </div>
    </section>

    <!-- 基本用法 -->
    <section class="section usage-section">
      <div class="content-box">
        <h2 class="section-title">📖 基本使用方法</h2>

        <div class="comparison-group">
          <!-- 传统写法 -->
          <div class="code-card">
            <h3 class="code-title">传统CSS写法</h3>
            <pre class="code-block">.parent {
  color: blue;
}
.parent .child {
  font-size: 1.2rem;
}
.parent:hover {
  opacity: 0.8;
}</pre>
          </div>

          <!-- 嵌套写法 -->
          <div class="code-card nesting">
            <h3 class="code-title">嵌套语法</h3>
            <pre class="code-block">.parent {
  color: blue;

  .child {
    font-size: 1.2rem;
  }

  &:hover {
    opacity: 0.8;
  }
}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="section scenario-section">
      <div class="content-box">
        <h2 class="section-title">💡 典型使用场景</h2>

        <div class="scenario-grid">
          <div v-for="(scenario, index) in scenarios" :key="index" class="scenario-card">
            <div class="card-icon">{{ scenario.emoji }}</div>
            <h3 class="card-title">{{ scenario.title }}</h3>
            <pre class="card-code">{{ scenario.code }}</pre>
            <p class="card-desc">{{ scenario.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 兼容性提示 -->
    <section class="section notice-section">
      <div class="content-box">
        <h2 class="section-title">⚠️ 注意事项</h2>
        <ul class="notice-list">
          <li v-for="(notice, index) in notices" :key="index">
            {{ notice }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const scenarios = [
  {
    emoji: '🖥️',
    title: 'BEM命名优化',
    code: '.block {\n  &__element { ... }\n  &--modifier { ... }\n}',
    description: '简化BEM命名模式的层级关系'
  },
  {
    emoji: '📱',
    title: '媒体查询嵌套',
    code: '.container {\n  @media (min-width: 768px) { ... }\n}',
    description: '在组件作用域内组织响应式样式'
  },
  {
    emoji: '🎭',
    title: '伪类嵌套',
    code: '.button {\n  &:hover { ... }\n  &:focus { ... }\n}',
    description: '集中管理交互状态样式'
  }
] as const;

const notices = [
  '需使用现代浏览器（Chrome 112+、Firefox 117+）',
  '嵌套层数建议不超过4层',
  '避免过度嵌套导致选择器权重过高',
  '与Less/Sass嵌套语法存在细微差异'
];
</script>

<style lang="less">
@primary-color: #2c3e50;
@secondary-color: #3498db;
@accent-color: #e74c3c;
@bg-color: #f8f9fa;
@text-color: #34495e;

.nesting-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;

  .hero-banner {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #3498db, #2ecc71);
    text-align: center;
    border-radius: 0 0 2rem 2rem;
    margin-bottom: 3rem;

    .title {
      color: white;
      font-size: 2.8rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .section {
    padding: 3rem 2rem;
    background: @bg-color;
    margin-bottom: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    &-title {
      color: @primary-color;
      font-size: 1.8rem;
      margin-bottom: 2rem;
      position: relative;
      padding-left: 1.2rem;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 1.2em;
        background: @secondary-color;
        border-radius: 2px;
      }

      &.sparkle::after {
        content: '✨';
        margin-left: 0.5rem;
      }
    }
  }

  .comparison-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;

    .code-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.8rem;
      transition: transform 0.3s;

      &.nesting {
        border: 2px solid fade(@secondary-color, 20%);
        background: fade(@secondary-color, 5%);
      }

      &:hover {
        transform: translateY(-5px);
      }

      .code-title {
        color: @primary-color;
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }
    }
  }

  .code-block {
    background: lighten(@primary-color, 70%);
    padding: 1rem;
    border-radius: 0.6rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    overflow-x: auto;
  }

  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;

    .scenario-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.8rem;
      text-align: center;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
      }

      .card-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .card-title {
        color: @primary-color;
        margin: 1rem 0;
      }

      .card-code {
        background: @bg-color;
        padding: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.85rem;
        margin: 1rem 0;
      }

      .card-desc {
        color: lighten(@text-color, 20%);
        font-size: 0.9rem;
      }
    }
  }

  .notice-list {
    background: fade(@accent-color, 5%);
    padding: 1.5rem;
    border-radius: 0.8rem;
    border-left: 4px solid @accent-color;

    li {
      margin: 0.8rem 0;
      padding-left: 1rem;
      position: relative;

      &::before {
        content: '•';
        color: @accent-color;
        position: absolute;
        left: 0;
      }
    }
  }
}

/* 原生CSS嵌套示例 */
.content-box {
  max-width: 1000px;
  margin: 0 auto;

  & .section-title {
    font-weight: 600;

    &:hover {
      color: darken(@secondary-color, 10%);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
}
</style>
