<template>
  <div class="rendering-container">
    <header>
      <h1>现代Web应用渲染模式对比</h1>
      <p class="subtitle">探索SSR、CSR、SSG与ISR的核心概念、适用场景及优缺点</p>
    </header>

    <div class="modes-overview">
      <div class="mode-card" v-for="mode in renderingModes" :key="mode.id">
        <div class="mode-header" :class="mode.id">
          <h2>{{ mode.title }}</h2>
        </div>
        <div class="mode-content">
          <div class="section">
            <h3>概念</h3>
            <p>{{ mode.concept }}</p>
          </div>
          <div class="section">
            <h3>实现框架</h3>
            <div class="frameworks">
              <span v-for="framework in mode.frameworks" :key="framework">{{ framework }}</span>
            </div>
          </div>
          <div class="section">
            <h3>适用场景</h3>
            <ul>
              <li v-for="scenario in mode.scenarios" :key="scenario">{{ scenario }}</li>
            </ul>
          </div>
          <div class="section">
            <h3>优点</h3>
            <ul class="pros">
              <li v-for="pro in mode.pros" :key="pro">{{ pro }}</li>
            </ul>
          </div>
          <div class="section">
            <h3>缺点</h3>
            <ul class="cons">
              <li v-for="con in mode.cons" :key="con">{{ con }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <h2>渲染模式综合对比</h2>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>SSR</th>
            <th>CSR</th>
            <th>SSG</th>
            <th>ISR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in comparisonData" :key="item.property">
            <td>{{ item.property }}</td>
            <td :class="{ highlight: item.values[0] === '最佳' }">{{ item.values[0] }}</td>
            <td :class="{ highlight: item.values[1] === '最佳' }">{{ item.values[1] }}</td>
            <td :class="{ highlight: item.values[2] === '最佳' }">{{ item.values[2] }}</td>
            <td :class="{ highlight: item.values[3] === '最佳' }">{{ item.values[3] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="conclusion">
      <h2>选择建议</h2>
      <p>根据您的项目需求选择合适的渲染模式：</p>
      <ul>
        <li><strong>需要SEO优化</strong> → 优先考虑SSR、SSG或ISR</li>
        <li><strong>高度交互应用</strong> → CSR提供最佳用户体验</li>
        <li><strong>内容更新频繁</strong> → ISR提供最佳平衡方案</li>
        <li><strong>静态内容为主</strong> → SSG是最佳选择</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const renderingModes = ref([
  {
    id: 'ssr',
    title: 'SSR (Server-Side Rendering)',

    concept: '服务器在收到请求时实时生成HTML文档并发送给客户端',
    frameworks: ['Nuxt.js', 'Next.js', 'Angular Universal', 'Express + Vue'],
    scenarios: [
      '需要SEO优化的页面',
      '社交媒体分享内容',
      '首屏加载速度要求高的应用',
      '对低端设备兼容性要求高的场景',
    ],
    pros: ['优秀的SEO支持', '快速的首屏内容呈现', '一致的初始渲染体验', '更好的社交媒体分享预览'],
    cons: [
      '服务器成本更高',
      'TTFB(首字节时间)可能较长',
      '服务器端渲染可能导致交互延迟',
      '开发复杂性增加',
    ],
  },
  {
    id: 'csr',
    title: 'CSR (Client-Side Rendering)',

    concept: '浏览器下载最小HTML和JS，在客户端完成渲染和交互',
    frameworks: ['React', 'Vue.js', 'Angular', 'Svelte'],
    scenarios: [
      '高度交互的Web应用',
      '单页应用(SPA)',
      '需要丰富用户交互的场景',
      '不依赖SEO的内部应用',
    ],
    pros: ['丰富的交互体验', '页面切换流畅', '减少服务器负载', '开发体验相对简单'],
    cons: ['SEO效果不佳', '首屏加载时间较长', '对低端设备不友好', '初始空白页面问题'],
  },
  {
    id: 'ssg',
    title: 'SSG (Static Site Generation)',

    concept: '在构建时预先生成所有HTML页面，直接提供静态文件',
    frameworks: ['Gatsby', 'VuePress', 'Jekyll', 'Hugo', 'Next.js'],
    scenarios: [
      '内容不频繁变化的网站',
      '博客和文档站点',
      '营销页面和产品展示',
      '需要极致性能的网站',
    ],
    pros: [
      '极致的性能表现',
      '最高级别的安全性',
      '超低服务器成本',
      '易于部署和扩展',
      '优秀的SEO支持',
    ],
    cons: [
      '无法处理用户个性化内容',
      '内容更新需要重新构建',
      '不适合高度动态内容',
      '构建时间随内容增长',
    ],
  },
  {
    id: 'isr',
    title: 'ISR (Incremental Static Regeneration)',

    concept: 'SSG的增强版，允许在构建后按需或定时重新生成页面',
    frameworks: ['Next.js', 'Nuxt.js', 'SvelteKit'],
    scenarios: [
      '包含部分动态内容的静态网站',
      '电子商务产品页面',
      '新闻和博客平台',
      '需要平衡新鲜度和性能的应用',
    ],
    pros: [
      '保持SSG的性能优势',
      '内容可更新而无需完整重建',
      '支持个性化内容',
      '灵活的缓存策略',
      '良好的SEO支持',
    ],
    cons: [
      '架构更复杂',
      '首次访问可能看到过时内容',
      '需要额外的缓存管理',
      '较新的概念，工具链仍在发展中',
    ],
  },
])

const comparisonData = ref([
  { property: '首屏加载速度', values: ['快', '慢', '极快', '快'] },
  { property: 'SEO支持', values: ['优秀', '差', '优秀', '优秀'] },
  { property: '服务器负载', values: ['高', '低', '极低', '中低'] },
  { property: '交互体验', values: ['中', '优', '中', '中'] },
  { property: '内容实时性', values: ['高', '高', '低', '可配置'] },
  { property: '开发复杂度', values: ['高', '低', '低', '中高'] },
  { property: '扩展性', values: ['中', '高', '高', '高'] },
  { property: '适用场景', values: ['内容型网站', 'Web应用', '静态网站', '混合型网站'] },
])
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@danger-color: #e71d36;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;

* {
  box-sizing: border-box;
}

.rendering-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      color: @text-light;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .modes-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .mode-card {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    background: white;
    display: flex;
    flex-direction: column;
    height: 100%;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
    }

    .mode-header {
      padding: 1.5rem;
      color: white;
      display: flex;
      align-items: center;

      h2 {
        font-size: 1.25rem;
        margin: 0;
        font-weight: 600;
      }

      .mode-icon {
        width: 40px;
        height: 40px;
        margin-right: 1rem;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 24px;
          height: 24px;
          fill: white;
        }
      }

      &.ssr {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
      }

      &.csr {
        background: linear-gradient(135deg, @success-color, #0ead69);
      }

      &.ssg {
        background: linear-gradient(135deg, @warning-color, #ff5400);
      }

      &.isr {
        background: linear-gradient(135deg, #7209b7, #4361ee);
      }
    }

    .mode-content {
      padding: 1.5rem;
      flex-grow: 1;

      .section {
        margin-bottom: 1.5rem;

        h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: @primary-color;
          display: flex;
          align-items: center;

          &::after {
            content: '';
            flex-grow: 1;
            height: 1px;
            background: @border-color;
            margin-left: 0.75rem;
          }
        }

        p,
        ul {
          margin: 0;
          font-size: 0.95rem;
        }

        ul {
          padding-left: 1.25rem;

          li {
            margin-bottom: 0.4rem;
          }
        }

        .pros li {
          color: #198754;
          position: relative;
          padding-left: 1.2rem;

          &::before {
            content: '✓';
            position: absolute;
            left: 0;
            font-weight: bold;
          }
        }

        .cons li {
          color: #dc3545;
          position: relative;
          padding-left: 1.2rem;

          &::before {
            content: '✕';
            position: absolute;
            left: 0;
            font-weight: bold;
          }
        }

        .frameworks {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          span {
            background: @light-bg;
            border-radius: 4px;
            padding: 0.25rem 0.75rem;
            font-size: 0.85rem;
            color: @text-light;
          }
        }
      }
    }
  }

  .comparison-table {
    margin: 3rem 0;
    overflow-x: auto;

    h2 {
      text-align: center;
      color: @primary-color;
      margin-bottom: 1.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      th,
      td {
        padding: 1rem;
        text-align: center;
        border: 1px solid @border-color;
      }

      thead {
        background: linear-gradient(to bottom, #f1f3f9, #e2e7f5);

        th {
          font-weight: 600;
          color: @primary-color;
        }
      }

      tbody tr:nth-child(even) {
        background-color: @light-bg;
      }

      .highlight {
        background-color: rgba(@success-color, 0.15);
        font-weight: 600;
        color: darken(@success-color, 15%);
        position: relative;

        &::after {
          content: '★';
          position: absolute;
          top: 2px;
          right: 2px;
          font-size: 0.7rem;
          color: @warning-color;
        }
      }
    }
  }

  .conclusion {
    background: linear-gradient(135deg, #f8f9ff, #eef0ff);
    border-radius: 10px;
    padding: 2rem;
    border-left: 4px solid @primary-color;

    h2 {
      color: @primary-color;
      margin-top: 0;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
        padding-left: 1.5rem;
        position: relative;

        &::before {
          content: '→';
          position: absolute;
          left: 0;
          color: @primary-color;
          font-weight: bold;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .rendering-container {
    padding: 1.5rem 1rem;

    header h1 {
      font-size: 2rem;
    }

    .modes-overview {
      grid-template-columns: 1fr;
    }

    .comparison-table {
      table {
        font-size: 0.85rem;

        th,
        td {
          padding: 0.6rem;
        }
      }
    }
  }
}
</style>
