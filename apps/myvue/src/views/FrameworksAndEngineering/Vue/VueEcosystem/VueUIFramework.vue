<template>
  <div class="ui-frameworks-container">
    <header class="header">
      <h1>Vue.js UI框架概览</h1>
      <p class="subtitle">精选最受欢迎的Vue UI框架，助力高效开发</p>
      <div class="stats">
        <div class="stat-item">
          <i class="icon-star"></i>
          <span>基于2025年最新数据</span>
        </div>
        <div class="stat-item">
          <i class="icon-component"></i>
          <span>涵盖{{ frameworks.length }}个主流框架</span>
        </div>
      </div>
    </header>

    <div class="framework-grid">
      <div v-for="(framework, index) in frameworks" :key="framework.name"
        :class="['framework-card', `card-${index % 4}`]">
        <div class="card-header">
          <div class="framework-logo">
            <div :class="['logo-placeholder', `logo-${index % 4}`]">
              {{ framework.name.charAt(0) }}
            </div>
          </div>
          <div class="framework-title">
            <h2>{{ framework.name }}</h2>
            <div class="framework-tags">
              <span class="tag" v-for="tag in framework.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <div class="card-content">
          <div class="info-row">
            <div class="info-label">热度指数</div>
            <div class="info-value">
              <div class="heat-bar">
                <div class="heat-fill" :style="{ width: framework.heat + '%' }"></div>
                <span>{{ framework.heat }}/100</span>
              </div>
            </div>
          </div>

          <div class="info-row">
            <div class="info-label">生态成熟度</div>
            <div class="info-value">
              <div class="rating">
                <i v-for="star in 5" :key="star"
                  :class="['icon', star <= framework.ecosystem ? 'icon-star-filled' : 'icon-star']"></i>
              </div>
            </div>
          </div>

          <div class="info-row">
            <div class="info-label">使用难度</div>
            <div class="info-value">
              <div class="difficulty">
                <div v-for="level in 3" :key="level"
                  :class="['difficulty-level', level <= framework.difficulty ? 'active' : '']"></div>
                <span class="difficulty-label">
                  {{ ['简单', '中等', '复杂'][framework.difficulty - 1] }}
                </span>
              </div>
            </div>
          </div>

          <div class="description">
            <h3>框架特点</h3>
            <p>{{ framework.description }}</p>
          </div>
        </div>

        <div class="card-footer">
          <a :href="framework.docs" target="_blank" class="btn-docs">文档</a>
          <a :href="framework.github" target="_blank" class="btn-github">GitHub</a>
        </div>
      </div>
    </div>

    <div class="comparison">
      <h2>框架特性对比</h2>
      <div class="comparison-table">
        <div class="table-row header">
          <div class="table-cell">框架名称</div>
          <div class="table-cell">Vue3支持</div>
          <div class="table-cell">TypeScript</div>
          <div class="table-cell">移动端优化</div>
          <div class="table-cell">主题定制</div>
        </div>
        <div v-for="framework in frameworks" :key="'comparison-' + framework.name" class="table-row">
          <div class="table-cell name">{{ framework.name }}</div>
          <div class="table-cell">
            <i v-if="framework.features.vue3" class="icon-check"></i>
          </div>
          <div class="table-cell">
            <i v-if="framework.features.typescript" class="icon-check"></i>
          </div>
          <div class="table-cell">
            <i v-if="framework.features.mobile" class="icon-check"></i>
          </div>
          <div class="table-cell">
            <i v-if="framework.features.theming" class="icon-check"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义框架数据结构
interface Framework {
  name: string;
  tags: string[];
  heat: number; // 热度指数 0-100
  ecosystem: number; // 生态系统评分 1-5
  difficulty: number; // 使用难度 1-3 (1=简单, 2=中等, 3=复杂)
  description: string;
  docs: string;
  github: string;
  features: {
    vue3: boolean;
    typescript: boolean;
    mobile: boolean;
    theming: boolean;
  };
}

// 框架数据
const frameworks = ref<Framework[]>([
  {
    name: "Element Plus",
    tags: ["企业级", "组件丰富", "高度可定制"],
    heat: 95,
    ecosystem: 5,
    difficulty: 1,
    description: "Element Plus是Element UI的Vue3版本，提供了一套完整的企业级UI组件，拥有庞大的社区和丰富的文档资源。",
    docs: "https://element-plus.org/",
    github: "https://github.com/element-plus/element-plus",
    features: {
      vue3: true,
      typescript: true,
      mobile: false,
      theming: true
    }
  },
  {
    name: "Vuetify",
    tags: ["Material Design", "响应式", "主题多样"],
    heat: 90,
    ecosystem: 5,
    difficulty: 2,
    description: "Vuetify实现了Material Design规范，提供精美的UI组件和布局系统，支持SSR和PWA，拥有活跃的社区和详细的文档。",
    docs: "https://vuetifyjs.com/",
    github: "https://github.com/vuetifyjs/vuetify",
    features: {
      vue3: true,
      typescript: true,
      mobile: true,
      theming: true
    }
  },
  {
    name: "Ant Design Vue",
    tags: ["企业级", "Ant Design风格", "专业"],
    heat: 85,
    ecosystem: 4,
    difficulty: 2,
    description: "Ant Design Vue是Ant Design的Vue实现，提供高质量的企业级UI组件，特别适合中后台管理系统开发。",
    docs: "https://www.antdv.com/",
    github: "https://github.com/vueComponent/ant-design-vue",
    features: {
      vue3: true,
      typescript: true,
      mobile: false,
      theming: true
    }
  },
  {
    name: "Quasar Framework",
    tags: ["全平台", "高性能", "一体化"],
    heat: 80,
    ecosystem: 5,
    difficulty: 3,
    description: "Quasar是一个高性能的Vue框架，支持构建SPA、SSR、PWA、移动应用和桌面应用，提供开箱即用的解决方案。",
    docs: "https://quasar.dev/",
    github: "https://github.com/quasarframework/quasar",
    features: {
      vue3: true,
      typescript: true,
      mobile: true,
      theming: true
    }
  },
  {
    name: "Naive UI",
    tags: ["轻量级", "现代设计", "TypeScript友好"],
    heat: 75,
    ecosystem: 3,
    difficulty: 1,
    description: "Naive UI是一个轻量级、现代的Vue UI库，完全使用TypeScript开发，提供清晰的API和灵活的主题定制能力。",
    docs: "https://www.naiveui.com/",
    github: "https://github.com/tusen-ai/naive-ui",
    features: {
      vue3: true,
      typescript: true,
      mobile: false,
      theming: true
    }
  },
  {
    name: "PrimeVue",
    tags: ["UI套件", "主题丰富", "企业级"],
    heat: 70,
    ecosystem: 4,
    difficulty: 2,
    description: "PrimeVue提供了一套完整的UI组件，拥有多种设计主题和模板，特别适合企业级应用开发。",
    docs: "https://primefaces.org/primevue/",
    github: "https://github.com/primefaces/primevue",
    features: {
      vue3: true,
      typescript: true,
      mobile: true,
      theming: true
    }
  }
]);
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@background: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2d3748;
@text-secondary: #718096;
@border-color: #e2e8f0;
@success-color: #06d6a0;
@warning-color: #ffd166;
@danger-color: #ef476f;
@info-color: #118ab2;

// 混合宏
.box-shadow() {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

// 基础样式
.ui-frameworks-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-color;
  background-color: @background;
}

.header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: @primary-color;
    letter-spacing: -0.025em;
  }

  .subtitle {
    font-size: 1.1rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto 1.5rem;
    line-height: 1.6;
  }

  .stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1.5rem;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      color: @text-secondary;

      .icon-star,
      .icon-component {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: fade(@primary-color, 15%);
        border-radius: 6px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .icon-star::after {
        width: 12px;
        height: 12px;
        background: radial-gradient(circle, @primary-color 30%, transparent 30%),
          linear-gradient(0deg, transparent 42%, @primary-color 42%, @primary-color 58%, transparent 58%),
          linear-gradient(60deg, transparent 42%, @primary-color 42%, @primary-color 58%, transparent 58%),
          linear-gradient(120deg, transparent 42%, @primary-color 42%, @primary-color 58%, transparent 58%);
      }

      .icon-component::after {
        width: 14px;
        height: 14px;
        border: 2px solid @primary-color;
        border-radius: 3px;
      }
    }
  }
}

.framework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.framework-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  .box-shadow();
  .transition();

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07),
      0 4px 6px -2px rgba(0, 0, 0, 0.03);
  }

  // 卡片颜色变体
  &.card-0 {
    border-top: 4px solid @primary-color;
  }

  &.card-1 {
    border-top: 4px solid @secondary-color;
  }

  &.card-2 {
    border-top: 4px solid @success-color;
  }

  &.card-3 {
    border-top: 4px solid @info-color;
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid @border-color;

  .framework-logo {
    margin-right: 1rem;

    .logo-placeholder {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: 700;
      color: white;
    }

    .logo-0 {
      background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 15%));
    }

    .logo-1 {
      background: linear-gradient(135deg, @secondary-color, lighten(@secondary-color, 15%));
    }

    .logo-2 {
      background: linear-gradient(135deg, @success-color, lighten(@success-color, 15%));
    }

    .logo-3 {
      background: linear-gradient(135deg, @info-color, lighten(@info-color, 15%));
    }
  }

  .framework-title {
    h2 {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
  }

  .framework-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.65rem;
      border-radius: 20px;
      background-color: fade(@primary-color, 10%);
      color: @primary-color;
      font-weight: 500;
    }
  }
}

.card-content {
  padding: 1.5rem;

  .info-row {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;

    .info-label {
      width: 110px;
      font-size: 0.9rem;
      color: @text-secondary;
      font-weight: 500;
    }

    .info-value {
      flex: 1;
    }
  }

  .heat-bar {
    height: 26px;
    background-color: fade(@primary-color, 10%);
    border-radius: 20px;
    position: relative;
    overflow: hidden;

    .heat-fill {
      height: 100%;
      background: linear-gradient(90deg, fade(@primary-color, 30%), @primary-color);
      border-radius: 20px;
      .transition(width);
    }

    span {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      font-size: 0.8rem;
      font-weight: 600;
      color: white;
      z-index: 2;
    }
  }

  .rating {
    display: flex;
    gap: 0.25rem;

    .icon {
      color: @border-color;
      font-size: 1.1rem;

      &.icon-star-filled {
        color: @warning-color;
      }
    }
  }

  .difficulty {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .difficulty-level {
      width: 24px;
      height: 8px;
      border-radius: 4px;
      background-color: @border-color;

      &.active {
        background-color: @primary-color;
      }
    }

    .difficulty-label {
      font-size: 0.85rem;
      font-weight: 500;
      margin-left: 0.5rem;
    }
  }

  .description {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid @border-color;

    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
      color: @text-secondary;
    }

    p {
      font-size: 0.95rem;
      line-height: 1.6;
      color: @text-secondary;
    }
  }
}

.card-footer {
  display: flex;
  padding: 0 1.5rem 1.5rem;
  gap: 0.75rem;

  a {
    flex: 1;
    text-align: center;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.95rem;
    .transition();

    &.btn-docs {
      background-color: fade(@primary-color, 10%);
      color: @primary-color;

      &:hover {
        background-color: fade(@primary-color, 20%);
      }
    }

    &.btn-github {
      background-color: #1a202c;
      color: white;

      &:hover {
        background-color: lighten(#1a202c, 5%);
      }
    }
  }
}

.comparison {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  .box-shadow();

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: @primary-color;
    text-align: center;
  }
}

.comparison-table {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid @border-color;

  .table-row {
    display: flex;

    &:nth-child(even) {
      background-color: fade(@primary-color, 3%);
    }

    &.header {
      background-color: @primary-color;

      .table-cell {
        color: white;
        font-weight: 600;
      }
    }
  }

  .table-cell {
    flex: 1;
    padding: 1rem;
    text-align: center;
    font-size: 0.95rem;

    &.name {
      font-weight: 500;
      text-align: left;
    }

    .icon-check {
      display: inline-block;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: @success-color;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 45%;
        left: 50%;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .framework-grid {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    overflow-x: auto;

    .table-row {
      min-width: 600px;
    }
  }
}
</style>
