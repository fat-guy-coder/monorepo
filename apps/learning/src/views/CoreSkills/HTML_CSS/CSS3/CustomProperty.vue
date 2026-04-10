<template>
  <div class="property-container">
    <!-- 标题部分 -->
    <header class="header">
      <h1>🎨 CSS @property 基本介绍</h1>
      <p class="subtitle">CSS Houdini 的强类型自定义属性</p>
      <div class="compatibility-warning">⚠️ 实验性特性，需Chrome 85+</div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 特性展示 -->
      <section class="card-section">
        <h2 class="section-title">
          <span class="icon">🌟</span>
          核心特性
        </h2>
        <div class="feature-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-header">
              <span class="feature-icon">{{ feature.icon }}</span>
              <h3>{{ feature.title }}</h3>
            </div>
            <p class="feature-desc">{{ feature.description }}</p>
            <div v-if="feature.code" class="feature-code">
              <pre>{{ feature.code }}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用方法 -->
      <section class="card-section">
        <h2 class="section-title">
          <span class="icon">⚙️</span>
          使用方法
        </h2>
        <div class="usage-steps">
          <div v-for="(step, index) in usageSteps" :key="index" class="step-card">
            <div class="step-header">
              <span class="step-number">#{{ index + 1 }}</span>
              <h3>{{ step.title }}</h3>
            </div>
            <pre class="step-code">{{ step.code }}</pre>
            <p class="step-desc">{{ step.description }}</p>
          </div>
        </div>
      </section>

      <!-- 应用场景 -->
      <div class="scenario-wrapper">
        <div class="scenario-card good">
          <h3>✅ 推荐场景</h3>
          <ul>
            <li v-for="(scene, index) in goodScenes" :key="index">{{ scene }}</li>
          </ul>
        </div>
        <div class="scenario-card bad">
          <h3>❌ 避免场景</h3>
          <ul>
            <li v-for="(scene, index) in badScenes" :key="index">{{ scene }}</li>
          </ul>
        </div>
      </div>

      <!-- 注意事项 -->
      <section class="notice-section">
        <h2 class="section-title">
          <span class="icon">⚠️</span>
          重要注意事项
        </h2>
        <div class="notice-grid">
          <div v-for="(note, index) in importantNotes" :key="index" class="notice-card">
            <span class="notice-icon">{{ note.icon }}</span>
            <h4>{{ note.title }}</h4>
            <p>{{ note.content }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface PropertyFeature {
  icon: string;
  title: string;
  description: string;
  code?: string;
}

interface UsageStep {
  title: string;
  code: string;
  description: string;
}

interface NoticeItem {
  icon: string;
  title: string;
  content: string;
}

const features = ref<PropertyFeature[]>([
  {
    icon: '🎯',
    title: '类型安全',
    description: '明确定义属性类型（length, color, number等）',
    code: '@property --angle {\n  syntax: "<angle>";\n  inherits: false;\n  initial-value: 0deg;\n}'
  },
  {
    icon: '🚀',
    title: '动画支持',
    description: '支持类型化数值的平滑过渡动画'
  },
  {
    icon: '🛡️',
    title: '语法校验',
    description: '浏览器会进行严格的类型检查'
  }
]);

const usageSteps = ref<UsageStep[]>([
  {
    title: '注册自定义属性',
    code: '@property --main-color {\n  syntax: "<color>";\n  inherits: false;\n  initial-value: #ff00ff;\n}',
    description: '在CSS中定义属性类型和初始值'
  },
  {
    title: '使用自定义属性',
    code: '.element {\n  --main-color: #00ff00;\n  background: var(--main-color);\n}',
    description: '像常规CSS变量一样使用'
  },
  {
    title: '应用动画',
    code: '@keyframes rotate {\n  to { --angle: 360deg; }\n}\n.element {\n  animation: rotate 2s infinite;\n}',
    description: '直接应用于CSS动画'
  }
]);

const goodScenes = ref([
  '需要类型化数值的动画场景',
  '需要严格类型检查的CSS变量',
  '需要继承控制的主题系统'
]);

const badScenes = ref([
  '简单的不需要动画的变量',
  '需要广泛浏览器支持的场景',
  '没有类型检查需求的变量'
]);

const importantNotes = ref<NoticeItem[]>([
  {
    icon: '💡',
    title: '浏览器支持',
    content: '目前仅Chromium内核浏览器支持'
  },
  {
    icon: '⚡',
    title: '性能注意',
    content: '避免注册过多属性导致内存问题'
  },
  {
    icon: '🔧',
    title: 'Polyfill',
    content: '可使用Houdini.js进行兼容处理'
  }
]);
</script>

<style scoped lang="less">
.property-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);

  .header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;

    h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .compatibility-warning {
      position: absolute;
      top: -10px;
      right: -20px;
      background: #ff9800;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.9rem;
      transform: rotate(5deg);
    }
  }

  .card-section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .section-title {
      font-size: 1.8rem;
      color: #34495e;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        font-size: 1.5em;
      }
    }
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;

    .feature-card {
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #2196F3;

      .feature-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;

        .feature-icon {
          font-size: 1.8rem;
        }
      }

      .feature-code {
        background: #2c3e50;
        color: white;
        padding: 1rem;
        border-radius: 6px;
        margin-top: 1rem;

        pre {
          font-family: 'Fira Code', monospace;
          white-space: pre-wrap;
        }
      }
    }
  }

  .usage-steps {
    display: grid;
    gap: 2rem;

    .step-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;

      .step-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;

        .step-number {
          background: #2196F3;
          color: white;
          padding: 0.5rem 0.8rem;
          border-radius: 4px;
        }
      }

      .step-code {
        background: #2c3e50;
        color: white;
        padding: 1rem;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
      }
    }
  }

  .scenario-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0;

    .scenario-card {
      padding: 1.5rem;
      border-radius: 8px;

      &.good {
        background: #e8f5e9;
        border: 2px solid #4CAF50;
      }

      &.bad {
        background: #ffebee;
        border: 2px solid #e53935;
      }

      ul {
        list-style: none;
        padding-left: 1rem;

        li {
          padding: 0.5rem 0;
          position: relative;

          &::before {
            content: "•";
            position: absolute;
            left: -1rem;
          }
        }
      }
    }
  }

  .notice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;

    .notice-card {
      padding: 1.5rem;
      background: #fff3e0;
      border-radius: 8px;

      .notice-icon {
        font-size: 1.8rem;
        display: block;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
