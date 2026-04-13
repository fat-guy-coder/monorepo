<template>
  <div class="css-performance-docs">
    <h1>CSS 性能优化基本指南</h1>

    <div class="optimization-container">
      <div v-for="category in optimizationCategories" :key="category.name" class="category-card">
        <div class="category-header">
          <h2>{{ category.name }}</h2>
        </div>

        <div class="optimization-list">
          <div v-for="item in category.items" :key="item.title" class="optimization-item">
            <div class="item-header">
              <h3>{{ item.title }}</h3>
              <span class="priority-tag" :class="item.priority">
                {{ priorityMap[item.priority] }}
              </span>
            </div>

            <p class="item-desc">{{ item.description }}</p>

            <div class="code-comparison">
              <div class="code-bad">
                <h4>❌ 不推荐</h4>
                <pre><code>{{ item.example.bad }}</code></pre>
              </div>
              <div class="code-good">
                <h4>✅ 推荐</h4>
                <pre><code>{{ item.example.good }}</code></pre>
              </div>
            </div>

            <div class="metrics">
              <div class="metric" v-if="item.impact">
                <span class="metric-icon">⚡</span>
                性能影响：{{ item.impact }}
              </div>
              <div class="metric" v-if="item.savings">
                <span class="metric-icon">💾</span>
                资源节省：{{ item.savings }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface OptimizationItem {
  title: string
  description: string
  example: {
    bad: string
    good: string
  }
  priority: 'critical' | 'high' | 'medium'
  impact?: string
  savings?: string
}

interface OptimizationCategory {
  name: string
  icon: any
  style: { background: string; color: string }
  items: OptimizationItem[]
}

const priorityMap = {
  critical: '关键优化',
  high: '推荐优化',
  medium: '可选优化',
}

const optimizationCategories = reactive<OptimizationCategory[]>([
  {
    name: '选择器优化',
    icon: '选择器', // Changed from IconSelector to text
    style: { background: '#ffe08a', color: '#946c00' },
    items: [
      {
        title: '避免复杂选择器',
        description: '减少选择器嵌套层级和复杂匹配',
        example: {
          bad: '.nav ul li a span {}',
          good: '.nav-item-text {}',
        },
        priority: 'high',
        impact: '减少50%样式计算时间',
      },
      {
        title: '避免通用选择器',
        description: '减少匹配元素范围',
        example: {
          bad: 'div * {}',
          good: '.container > .child {}',
        },
        priority: 'medium',
      }
    ],
  },
  {
    name: '布局与绘制',
    icon: '布局', // Changed from IconPaint to text
    style: { background: '#89d3ff', color: '#005c8a' },
    items: [
      {
        title: '避免布局抖动',
        description: '批量读取/修改样式属性',
        example: {
          bad: `// 多次触发回流
el.style.width = '100px';
const height = el.offsetHeight;
el.style.height = height + 'px';`,
          good: `// 使用requestAnimationFrame
requestAnimationFrame(() => {
  el.style.width = '100px';
  el.style.height = el.offsetHeight + 'px';
});`,
        },
        priority: 'critical',
        impact: '减少80%布局回流',
      },
    ],
  },
  {
    name: '动画优化',
    icon: '动画', // Changed from IconAnimation to text
    style: { background: '#ff9e80', color: '#c43c00' },
    items: [
      {
        title: '使用合成属性',
        description: '优先使用transform和opacity，提升动画性能，调起GPU加速，不会触发回流与重绘',
        example: {
          bad: 'left: calc(100% - 50px);',
          good: 'transform: translateX(calc(100% - 50px));',
        },
        priority: 'critical',
        impact: '提升60%动画帧率',
      },
    ],
  },
  {
    name: '资源加载',
    icon: '资源', // Changed from IconBox to text
    style: { background: '#c5e1a5', color: '#33691e' },
    items: [
      {
        title: '按需加载CSS',
        description: '使用媒体查询分割CSS',
        example: {
          bad: '<link rel="stylesheet" href="all.css">',
          good: '<link rel="stylesheet" media="print" href="print.css">',
        },
        priority: 'high',
        savings: '减少40%首屏CSS体积',
      },
      {
        title: '使用CSS Sprites',
        description: '将多个小图标合并成一张大图',
        example: {
          bad: '<img src="icon1.png"> <img src="icon2.png"> <img src="icon3.png">',
          good: '<img src="sprites.png" class="icon">',
        },
        priority: 'high',
        savings: '减少50%图片请求',
      }
    ],
  },
  {
    name: '现代技术',
    icon: '现代', // Changed from IconRocket to text
    style: { background: '#ce93d8', color: '#6a1b9a' },
    items: [
      {
        title: '使用CSS Containment',
        description: '限制浏览器渲染范围',
        example: {
          bad: '/* 无contain属性 */',
          good: '.widget { contain: layout paint; }',
        },
        priority: 'medium',
        impact: '提升30%渲染性能',
      },
    ],
  },
  // New optimization items added
  {
    name: '字体优化',
    icon: '字体',
    style: { background: '#ffccbc', color: '#c75b29' },
    items: [
      {
        title: '使用系统字体',
        description: '减少字体加载时间',
        example: {
          bad: 'font-family: "CustomFont", sans-serif;',
          good: 'font-family: system-ui, sans-serif;',
        },
        priority: 'high',
        impact: '提升50%字体渲染速度',
      },
    ],
  },
  {
    name: '图片优化',
    icon: '图片',
    style: { background: '#b2ebf2', color: '#00796b' },
    items: [
      {
        title: '使用适当格式',
        description: '选择合适的图片格式',
        example: {
          bad: '<img src="image.png">',
          good: '<img src="image.webp">',
        },
        priority: 'high',
        impact: '减少70%图片加载时间',
      },
    ],
  },
])
</script>

<style lang="less" scoped>


.metric {
  color: #000;
}

.css-performance-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0;
  font-family: 'Inter', sans-serif;

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 0rem;
    font-size: 2.4rem;
    position: relative;
  }

  .category-card {
    background: white;
    border-radius: 12px;
    margin: 5rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-5px);
    }

    .category-header {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      border-bottom: 2px solid #eee;

      .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h2 {
        margin: 0;
        font-size: 1.3rem;
        color: #2c3e50;
      }
    }

    .optimization-list {
      padding: 1.5rem;
    }

    .optimization-item {
      margin: 1.5rem 0;
      padding: 1rem;
      border-radius: 8px;
      background: #f8f9fa;

      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.8rem;

        h3 {
          margin: 0;
          font-size: 1.1rem;
          color: #34495e;
        }

        .priority-tag {
          font-size: 0.8rem;
          padding: 4px 10px;
          border-radius: 12px;

          &.critical {
            background: #ff5252;
            color: white;
          }

          &.high {
            background: #ffa726;
            color: white;
          }

          &.medium {
            background: #66bb6a;
            color: white;
          }
        }
      }

      .item-desc {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .code-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 1rem 0;

        .code-bad,
        .code-good {
          pre {
            background: #2d3436;
            color: #dfe6e9;
            padding: 1rem;
            border-radius: 6px;
            margin: 0.5rem 0;
            font-family: 'Roboto Mono', monospace;
            font-size: 0.85rem;
            line-height: 1.5;
          }

          h4 {
            margin: 0.5rem 0;
            font-size: 0.9rem;
          }
        }

        .code-bad {
          h4 {
            color: #ff5252;
          }

          pre {
            border-left: 3px solid #ff5252;
          }
        }

        .code-good {
          h4 {
            color: #66bb6a;
          }

          pre {
            border-left: 3px solid #66bb6a;
          }
        }
      }

      .metrics {
        display: flex;
        gap: 1.5rem;
        margin-top: 1rem;
        font-size: 0.9rem;

        .metric {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 6px 12px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 20px;

          .metric-icon {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
