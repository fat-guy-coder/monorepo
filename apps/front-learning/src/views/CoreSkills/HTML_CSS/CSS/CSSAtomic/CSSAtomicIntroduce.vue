<template>
  <div class="css-atomic-container">
    <!-- 头部区域 -->
    <div class="header">
      <h1>CSS原子化设计</h1>
      <p>现代前端开发的样式管理范式</p>
      <div class="atomic-tags">
        <span v-for="tag in tags" :key="tag" :class="tagClass(tag)">{{ tag }}</span>
      </div>
    </div>

    <!-- 概念解释 -->
    <div class="section concept">
      <div class="section-header">
        <div class="icon">🧩</div>
        <h2>什么是CSS原子化？</h2>
      </div>
      <div class="content">
        <p>
          <strong>CSS原子化</strong>是一种将样式分解为最小、不可再分单元的方法论。
          每个CSS类只负责一个具体的样式属性（如边距、颜色、字体大小等），
          通过组合这些原子类来构建复杂的UI组件。
        </p>
        <div class="atomic-demo">
          <div class="demo-title">传统CSS vs 原子化CSS</div>
          <div class="demo-comparison">
            <div class="traditional">
              <code>
                .btn {<br>
                &nbsp;&nbsp;padding: 12px 24px;<br>
                &nbsp;&nbsp;background: #3498db;<br>
                &nbsp;&nbsp;color: white;<br>
                &nbsp;&nbsp;font-weight: bold;<br>
                &nbsp;&nbsp;border-radius: 8px;<br>
                }
              </code>
            </div>
            <div class="atomic">
              <code>
                &lt;button class="<br>
                &nbsp;&nbsp;py-3 px-6<br>
                &nbsp;&nbsp;bg-blue-500<br>
                &nbsp;&nbsp;text-white<br>
                &nbsp;&nbsp;font-bold<br>
                &nbsp;&nbsp;rounded-lg<br>
                "&gt;<br>
                &nbsp;&nbsp;点击我<br>
                &lt;/button&gt;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用场景 -->
    <div class="section use-cases">
      <div class="section-header">
        <div class="icon">🚀</div>
        <h2>适用场景</h2>
      </div>
      <div class="content">
        <div class="case-card" v-for="(caseItem, index) in useCases" :key="index">
          <div class="case-icon">{{ caseItem.icon }}</div>
          <div class="case-content">
            <h3>{{ caseItem.title }}</h3>
            <p>{{ caseItem.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 优缺点对比 -->
    <div class="section pros-cons">
      <div class="section-header">
        <div class="icon">⚖️</div>
        <h2>优缺点分析</h2>
      </div>
      <div class="comparison">
        <div class="pros">
          <h3>优势</h3>
          <ul>
            <li v-for="(pro, index) in advantages" :key="index">
              <div class="check-icon">✅</div>
              {{ pro }}
            </li>
          </ul>
        </div>
        <div class="cons">
          <h3>劣势</h3>
          <ul>
            <li v-for="(con, index) in disadvantages" :key="index">
              <div class="cross-icon">❌</div>
              {{ con }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Tailwind介绍 -->
    <div class="section tailwind">
      <div class="section-header">
        <div class="icon"></div>
        <h2>Tailwind CSS - 原子化的完美实践</h2>
      </div>
      <div class="content">
        <div class="tailwind-intro">
          <p>
            Tailwind CSS 是一个功能类优先的CSS框架，它提供了大量预定义的原子类，
            让开发者可以直接在HTML中通过组合类名来构建设计。
          </p>
          <div class="tailwind-features">
            <div class="feature" v-for="(feature, index) in tailwindFeatures" :key="index">
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="feature-text">
                <strong>{{ feature.title }}</strong>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="tailwind-demo">
          <div class="demo-card">
            <div class="card-header">不使用Tailwind</div>
            <div class="card-content">
              <code>
                /* styles.css */<br>
                .alert {<br>
                &nbsp;&nbsp;padding: 1rem;<br>
                &nbsp;&nbsp;border-radius: 0.375rem;<br>
                &nbsp;&nbsp;background-color: #fef3c7;<br>
                &nbsp;&nbsp;color: #92400e;<br>
                }
              </code>
            </div>
          </div>

          <div class="demo-card">
            <div class="card-header">使用Tailwind</div>
            <div class="card-content">
              <code>
                &lt;div class="<br>
                &nbsp;&nbsp;p-4<br>
                &nbsp;&nbsp;rounded-md<br>
                &nbsp;&nbsp;bg-amber-100<br>
                &nbsp;&nbsp;text-amber-900<br>
                "&gt;<br>
                &nbsp;&nbsp;这是一个警告提示<br>
                &lt;/div&gt;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="section summary">
      <div class="section-header">
        <div class="icon">💎</div>
        <h2>总结</h2>
      </div>
      <div class="content">
        <div class="summary-card">
          <p>
            CSS原子化是现代前端开发的重要趋势，它通过<strong>组合小型的、单一职责的类</strong>，
            提供了更灵活、更可维护的样式方案。虽然有一定的学习曲线，但在大型项目、
            设计系统构建和团队协作中，它能显著提高开发效率和一致性。
          </p>
          <p>
            <strong>Tailwind CSS</strong> 作为原子化CSS的领先框架，提供了完整的工具链和设计系统，
            是实践原子化理念的优秀选择。
          </p>
          <div class="recommendation">
            <div class="lightbulb">💡</div>
            <p>
              推荐在组件化框架（如Vue、React）中使用CSS原子化，结合设计令牌和约束系统，
              可获得最佳开发体验。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tags = ref([
  'CSS架构', '功能类优先', '可复用性', 'Tailwind', '设计系统', '开发效率'
]);

const useCases = ref([
  {
    icon: '📱',
    title: '大型项目开发',
    description: '在复杂项目中保持样式一致性和可维护性'
  },
  {
    icon: '👥',
    title: '团队协作',
    description: '减少样式冲突，统一设计语言，提高协作效率'
  },
  {
    icon: '🎨',
    title: '设计系统',
    description: '构建可扩展的设计系统，确保UI一致性'
  },
  {
    icon: '⚡',
    title: '性能优化',
    description: '减少未使用的CSS，提高页面加载速度'
  }
]);

const advantages = ref([
  '减少CSS体积：只生成实际使用的样式',
  '消除样式冲突：类名具有高度特异性',
  '设计一致性：使用预定义的设计令牌',
  '开发效率：直接在HTML中组合样式',
  '易于维护：修改设计系统即可全局更新',
  '响应式设计：内置响应式前缀（如md:text-lg）'
]);

const disadvantages = ref([
  '学习曲线：需要记忆大量类名',
  'HTML臃肿：类名列表可能变得很长',
  '可读性挑战：对新手可能不够直观',
  '设计限制：受限于预定义的设计系统',
  '过度抽象：可能不适合小型简单项目'
]);

const tailwindFeatures = ref([
  {
    icon: '🎨',
    title: '全面的设计系统',
    description: '预定义的色彩、间距、字体、阴影等设计令牌'
  },
  {
    icon: '🔄',
    title: '响应式设计',
    description: '通过前缀轻松实现响应式布局（sm:, md:, lg:）'
  },
  {
    icon: '🎭',
    title: '状态变体',
    description: '内置hover、focus、active等状态处理'
  },
  {
    icon: '🧩',
    title: '插件系统',
    description: '可扩展自定义功能类和组件'
  }
]);

const tagClass = (tag: string) => {
  const tagColors: Record<string, string> = {
    'CSS架构': 'bg-blue-100 text-blue-800',
    '功能类优先': 'bg-purple-100 text-purple-800',
    '可复用性': 'bg-green-100 text-green-800',
    'Tailwind': 'bg-teal-100 text-teal-800',
    '设计系统': 'bg-amber-100 text-amber-800',
    '开发效率': 'bg-indigo-100 text-indigo-800'
  };
  return tagColors[tag] || 'bg-gray-100 text-gray-800';
};


</script>

<style lang="less" scoped>
@primary-color: #6366f1;
@background-light: #f8fafc;
@text-dark: #1e293b;
@text-light: #64748b;
@border-radius: 12px;
@box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

.css-atomic-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: @text-dark;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 2rem 0 3rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, @primary-color, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.25rem;
    color: @text-light;
    margin-bottom: 1.5rem;
  }

  .atomic-tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    max-width: 600px;
    margin: 0 auto;

    span {
      padding: 0.4rem 0.9rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
    }
  }
}

.section {
  background: white;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  margin-bottom: 2.5rem;
  overflow: hidden;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.5rem 1.75rem;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    border-bottom: 1px solid #e2e8f0;

    .icon {
      font-size: 1.75rem;
      margin-right: 1rem;
      display: flex;
      align-items: center;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
    }
  }

  .content {
    padding: 2rem;
  }

  &.concept {
    .content {
      p {
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
        line-height: 1.7;
      }
    }

    .atomic-demo {
      background: @background-light;
      border-radius: @border-radius;
      padding: 1.5rem;
      margin-top: 1.5rem;

      .demo-title {
        text-align: center;
        font-weight: 600;
        color: @primary-color;
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px dashed #cbd5e1;
      }

      .demo-comparison {
        display: flex;
        gap: 1.5rem;

        @media (max-width: 768px) {
          flex-direction: column;
        }

        &>div {
          flex: 1;
          padding: 1.5rem;
          border-radius: 8px;

          code {
            display: block;
            background: #1e293b;
            color: #f1f5f9;
            padding: 1.25rem;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
            font-size: 0.95rem;
            line-height: 1.7;
            overflow-x: auto;
          }
        }

        .traditional {
          background: linear-gradient(135deg, #fef2f2, #ffedd5);
        }

        .atomic {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        }
      }
    }
  }

  &.use-cases {
    .case-card {
      display: flex;
      align-items: flex-start;
      padding: 1.25rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      background: @background-light;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .case-icon {
        font-size: 1.75rem;
        margin-right: 1.25rem;
        min-width: 50px;
        text-align: center;
      }

      .case-content {
        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          color: #0f172a;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 1rem;
        }
      }
    }
  }

  &.pros-cons {
    .comparison {
      display: flex;
      gap: 1.5rem;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      &>div {
        flex: 1;
        padding: 1.25rem;
        border-radius: 8px;
      }

      .pros {
        background: linear-gradient(135deg, #f0fdf4, #dcfce7);

        h3 {
          color: #15803d;
          margin-top: 0;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #bbf7d0;
        }
      }

      .cons {
        background: linear-gradient(135deg, #fef2f2, #fee2e2);

        h3 {
          color: #b91c1c;
          margin-top: 0;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #fecaca;
        }
      }

      ul {
        padding: 0;
        margin: 0;
        list-style: none;

        li {
          display: flex;
          align-items: flex-start;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);

          .check-icon,
          .cross-icon {
            margin-right: 0.75rem;
            min-width: 24px;
          }
        }
      }
    }
  }

  &.tailwind {
    .section-header {
      background: linear-gradient(135deg, #e0f2fe, #dbeafe);
    }

    .tailwind-features {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      margin: 2rem 0;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }

      .feature {
        display: flex;
        background: white;
        border-radius: 8px;
        padding: 1.25rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

        .feature-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-text {
          strong {
            display: block;
            margin-bottom: 0.25rem;
          }
        }
      }
    }

    .tailwind-demo {
      display: flex;
      gap: 1.5rem;
      margin-top: 2rem;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .demo-card {
        flex: 1;
        border: 1px solid #e2e8f0;
        border-radius: @border-radius;
        overflow: hidden;

        .card-header {
          padding: 0.75rem 1.25rem;
          font-weight: 600;
          background: @background-light;
          border-bottom: 1px solid #e2e8f0;
        }

        .card-content {
          padding: 1.25rem;
          background: #0f172a;

          code {
            display: block;
            color: #f1f5f9;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            line-height: 1.7;
          }
        }

        &:first-child .card-header {
          color: #ef4444;
        }

        &:last-child .card-header {
          color: #22c55e;
        }
      }
    }
  }

  &.summary {
    .section-header {
      background: linear-gradient(135deg, #ede9fe, #f5f3ff);
    }

    .summary-card {
      background: linear-gradient(135deg, #fdf2f8, #f0fdfa);
      border-radius: @border-radius;
      padding: 1.75rem;

      p {
        font-size: 1.1rem;
        margin-bottom: 1.25rem;
        line-height: 1.7;

        strong {
          color: @primary-color;
        }
      }

      .recommendation {
        display: flex;
        align-items: flex-start;
        background: white;
        border-radius: 8px;
        padding: 1.25rem;
        margin-top: 1.5rem;
        border-left: 4px solid @primary-color;

        .lightbulb {
          font-size: 1.5rem;
          margin-right: 1rem;
          color: #f59e0b;
        }

        p {
          margin: 0;
          font-style: italic;
        }
      }
    }
  }
}
</style>
