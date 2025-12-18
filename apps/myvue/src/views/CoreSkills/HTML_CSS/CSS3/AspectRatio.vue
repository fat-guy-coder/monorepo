<template>
  <div class="aspect-ratio-guide">
    <!-- 导航区 -->
    <nav class="guide-nav">
      <h1>🎬 CSS宽高比（Aspect Ratio）指南</h1>
      <div class="nav-links">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`" @click.prevent="scrollTo(section.id)"
          class="nav-link">
          {{ section.title }}
        </a>
      </div>
    </nav>

    <h3>
      🎨宽高比是指一个元素的宽度与高度之间的比例关系。它在设计和布局中起着重要作用，确保元素在不同屏幕尺寸和设备上保持一致的视觉效果。常见的宽高比包括16:9（适用于视频）、1:1（适用于图片）和4:3（传统显示器）。使用宽高比可以帮助设计师和开发者创建响应式和美观的界面。
    </h3>


    <!-- 内容区 -->
    <main class="guide-content">
      <!-- 概述 -->
      <section id="overview" class="content-section">
        <h2>🌍 核心概念</h2>
        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">📐</div>
            <h3>什么是宽高比？</h3>
            <p>元素宽度与高度的比例关系，如16:9、1:1、4:3等</p>
            <div class="ratio-visual" style="--ratio: 16/9"></div>
          </div>
          <div class="concept-card">
            <div class="concept-icon">⚙️</div>
            <h3>属性语法</h3>
            <pre><code>aspect-ratio: &lt;width&gt; / &lt;height&gt;;
/* 示例 */
aspect-ratio: 16/9;
aspect-ratio: 1;</code></pre>
          </div>
        </div>
      </section>

      <!-- 使用方法 -->
      <section id="usage" class="content-section">
        <h2>🛠️ 使用方法</h2>
        <div class="method-comparison">
          <div class="method-card">
            <h3>传统方式 vs 新属性</h3>
            <div class="code-compare">
              <div>
                <h4>传统Padding技巧</h4>
                <pre><code class="language-css">.container {
  position: relative;
  padding-top: 56.25%; /* 16:9 */
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}</code></pre>
              </div>
              <div>
                <h4>现代aspect-ratio</h4>
                <pre><code class="language-css">.container {
  aspect-ratio: 16/9;
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section id="scenarios" class="content-section">
        <h2>🚀 使用场景</h2>
        <div class="scenario-grid">
          <div class="scenario-card" v-for="scenario in scenarios" :key="scenario.title">
            <div class="scenario-preview" :style="{ aspectRatio: scenario.ratio }">
              <div class="inner-box">{{ scenario.ratio }}</div>
            </div>
            <h3>{{ scenario.title }}</h3>
            <p>{{ scenario.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Vue3示例 -->
      <section id="vue3" class="content-section">
        <h2>🖥️示例</h2>
        <div class="vue-demo">
          <div class="demo-controls">
            <label>选择比例：</label>
            <Select v-model="selectedRatio">
              <option v-for="ratio in ratios" :key="ratio" :value="ratio">{{ ratio }}</option>
            </select>
          </div>
          <div class="ratio-box" :style="{ aspectRatio: selectedRatio }">
            <span>{{ selectedRatio }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sections = ref([
  { id: 'overview', title: '核心概念' },
  { id: 'usage', title: '使用方法' },
  { id: 'scenarios', title: '使用场景' },
  { id: 'vue3', title: '示例' }
]);

const scenarios = ref([
  {
    title: '响应式图片',
    ratio: '16/9',
    desc: '保持图片在不同尺寸下的比例'
  },
  {
    title: '视频容器',
    ratio: '16/9',
    desc: '适配不同比例的视频嵌入'
  },
  {
    title: '产品卡片',
    ratio: '1/1',
    desc: '统一商品图片展示比例'
  },
  {
    title: '广告横幅',
    ratio: '4/1',
    desc: '保持横幅广告的视觉效果'
  }
]);

const ratios = ref(['16/9', '4/3', '1/1', '3/4', '9/16']);
const selectedRatio = ref('16/9');

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
</script>

<style scoped lang="less">
.aspect-ratio-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.guide-nav {
  background: linear-gradient(135deg, #2c3e50, #27ae60);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 1.5rem;
    font-size: 2rem;
    text-align: center;
  }

  .nav-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  scroll-margin-top: 1rem;

  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    border-left: 4px solid #27ae60;
    padding-left: 1rem;
    margin: 2rem 0;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;

  .concept-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .ratio-visual {
    width: 100%;
    background: #27ae60;
    margin-top: 1rem;
    aspect-ratio: var(--ratio);
    border-radius: 4px;
  }
}

.method-comparison {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.code-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  pre {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 6px;
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;

  .scenario-preview {
    background: #e8f5e9;
    border-radius: 4px;
    margin-bottom: 1rem;
    position: relative;

    .inner-box {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #27ae60;
    }
  }
}

.vue-demo {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .demo-controls {
    margin-bottom: 1rem;

    select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  .ratio-box {
    background: #e8f5e9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #27ae60;
    border-radius: 4px;
  }
}

@media (max-width: 768px) {
  .aspect-ratio-guide {
    padding: 1rem;
  }
}

pre code {
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
  color: #2c3e50;
}
</style>
