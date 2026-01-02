<template>
  <div class="hardware-accel-container">
    <header class="header">
      <h1>🚀 CSS硬件加速属性全集</h1>
      <p class="subtitle">浏览器GPU加速的CSS属性列表</p>
    </header>

    <main class="main-content">
      <!-- 属性分类 -->
      <section v-for="category in categories" :key="category.type" class="category-card">
        <div class="category-header">
          <span class="category-icon">{{ category.icon }}</span>
          <h2>{{ category.title }}</h2>
        </div>

        <div class="property-grid">
          <div v-for="property in category.properties" :key="property.name" class="property-card">
            <div class="property-header">
              <h3>{{ property.name }}</h3>
              <span class="property-type">{{ property.type }}</span>
            </div>
            <div class="code-sample">
              <pre>{{ property.code }}</pre>
            </div>
            <div class="property-desc">
              <p>{{ property.description }}</p>
              <div v-if="property.notes" class="notes">
                📌 {{ property.notes }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 注意事项 -->
    <footer class="footer-note">
      <h3>⚠️ 使用注意事项</h3>
      <ul>
        <li v-for="(tip, index) in tips" :key="index">{{ tip }}</li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface CSSProperty {
  name: string;
  type: string;
  code: string;
  description: string;
  notes?: string;
}

interface PropertyCategory {
  type: string;
  title: string;
  icon: string;
  properties: CSSProperty[];
}

const categories = ref<PropertyCategory[]>([
  {
    type: 'transform',
    title: '变换属性',
    icon: '🔄',
    properties: [
      {
        name: 'translate3d',
        type: '3D变换',
        code: 'transform: translate3d(100px, 0, 0);',
        description: '创建独立图层触发GPU加速',
        notes: '推荐替代translate使用'
      },
      {
        name: 'rotateZ',
        type: '3D旋转',
        code: 'transform: rotateZ(45deg);',
        description: 'Z轴旋转触发硬件加速'
      },
      {
        name: 'scale3d',
        type: '3D缩放',
        code: 'transform: scale3d(1.2, 1.2, 1);',
        description: '三维缩放操作'
      }
    ]
  },
  {
    type: 'composition',
    title: '合成属性',
    icon: '🎭',
    properties: [
      {
        name: 'will-change',
        type: '性能提示',
        code: 'will-change: transform;',
        description: '提前告知浏览器变化属性',
        notes: '使用后应及时移除'
      },
      {
        name: 'backface-visibility',
        type: '背面可见性',
        code: 'backface-visibility: hidden;',
        description: '强制创建独立图层'
      },
      {
        name: 'perspective',
        type: '透视投影',
        code: 'perspective: 1000px;',
        description: '创建3D渲染上下文'
      }
    ]
  },
  {
    type: 'effect',
    title: '视觉效果',
    icon: '✨',
    properties: [
      {
        name: 'opacity',
        type: '透明度',
        code: 'transition: opacity 0.3s;',
        description: '透明度变化由合成器处理'
      },
      {
        name: 'filter',
        type: '滤镜',
        code: 'filter: blur(5px);',
        description: '现代浏览器GPU加速滤镜',
        notes: '复杂滤镜可能影响性能'
      },
      {
        name: 'mask-image',
        type: '遮罩',
        code: 'mask-image: linear-gradient(black, transparent);',
        description: '部分浏览器硬件加速'
      }
    ]
  }
]);

const tips = ref([
  '避免过度创建图层导致内存占用',
  '优先使用transform和opacity进行动画',
  'will-change应谨慎使用并适时移除',
  '注意不同浏览器的硬件加速实现差异',
  '使用DevTools的Layers面板调试图层'
]);
</script>

<style scoped lang="less">
.hardware-accel-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.1rem;
    }
  }

  .category-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .category-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      h2 {
        font-size: 1.8rem;
        color: #34495e;
      }

      .category-icon {
        font-size: 2rem;
      }
    }
  }

  .property-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .property-card {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    border-left: 4px solid #3498db;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-3px);
    }

    .property-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h3 {
        color: #2c3e50;
        font-size: 1.1rem;
      }

      .property-type {
        font-size: 0.8rem;
        background: rgba(52, 152, 219, 0.1);
        color: #3498db;
        padding: 0.3rem 0.7rem;
        border-radius: 4px;
      }
    }

    .code-sample {
      pre {
        background: #2c3e50;
        color: #ecf0f1;
        padding: 1rem;
        border-radius: 6px;
        overflow-x: auto;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }

    .property-desc {
      margin-top: 1rem;
      color: #7f8c8d;
      line-height: 1.6;

      .notes {
        margin-top: 0.8rem;
        padding: 0.8rem;
        background: rgba(255, 229, 100, 0.15);
        border-radius: 4px;
        color: #e67e22;
      }
    }
  }

  .footer-note {
    background: #fff3cd;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 2rem;

    h3 {
      color: #856404;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding-left: 1rem;

      li {
        padding: 0.5rem 0;
        color: #856404;
        position: relative;

        &::before {
          content: "•";
          color: #ffc107;
          position: absolute;
          left: -1rem;
        }
      }
    }
  }
}
</style>
