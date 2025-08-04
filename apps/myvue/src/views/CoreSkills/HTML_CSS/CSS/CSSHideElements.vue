<template>
  <div class="hide-methods-container">
    <h1 class="title">CSS隐藏元素方法</h1>
    <div class="method-list">
      <div v-for="(method, index) in methods" :key="index" class="method-card">
        <div class="method-header">
          <span class="index">#{{ index + 1 }}</span>
          <h2 class="method-title">{{ method.title }}</h2>
        </div>

        <div class="method-content">
          <div class="description">
            <h3>方法介绍</h3>
            <p>{{ method.description }}</p>
          </div>

          <div class="code-example">
            <h3>代码示例</h3>
            <pre><code>{{ method.codeExample }}</code></pre>
          </div>

          <div class="use-cases">
            <h3>使用场景</h3>
            <ul>
              <li v-for="(scene, i) in method.useCases" :key="i">{{ scene }}</li>
            </ul>
          </div>

          <div class="pros-cons">
            <h3>优缺点</h3>
            <ul>
              <li v-for="(item, i) in method.prosCons" :key="i">{{ item }}</li>
            </ul>
          </div>

          <div v-if="method.notes" class="notes">
            <h3>注意事项</h3>
            <p>{{ method.notes }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface MethodItem {
  title: string
  description: string
  codeExample: string
  useCases: string[]
  prosCons: string[]
  notes?: string
}

const methods = reactive<MethodItem[]>([
  {
    title: 'display: none',
    description: '完全从文档流中移除元素，不占据任何空间',
    codeExample: `.hidden-element {
  display: none;
}`,
    useCases: [
      '需要彻底移除元素时',
      '不影响布局的隐藏',
      '不需要过渡动画的场景'
    ],
    prosCons: [
      '✓ 完全隐藏且不占空间',
      '✓ 浏览器不会渲染元素',
      '× 无法添加过渡动画',
      '× 会导致回流重绘'
    ],
    notes: '屏幕阅读器通常无法访问该元素'
  },
  {
    title: 'visibility: hidden',
    description: '隐藏元素但保留其占位空间',
    codeExample: `.hidden-element {
  visibility: hidden;
}`,
    useCases: [
      '需要保留元素占位时',
      '需要隐藏但保持布局',
      '子元素需要切换可见性'
    ],
    prosCons: [
      '✓ 保留元素空间',
      '✓ 支持子元素可见性切换',
      '× 仍会触发点击事件',
      '× 无法添加过渡动画'
    ],
    notes: '元素仍会响应事件处理器'
  },
  {
    title: 'opacity: 0',
    description: '使元素完全透明但保持交互性',
    codeExample: `.hidden-element {
  opacity: 0;
  transition: opacity 0.3s;
}`,
    useCases: [
      '需要淡入淡出动画',
      '需要隐藏但保持交互',
      '需要无障碍访问时'
    ],
    prosCons: [
      '✓ 支持过渡动画',
      '✓ 元素仍可交互',
      '× 仍占据布局空间',
      '× 可能误触事件'
    ]
  },
  {
    title: '绝对定位移出屏幕',
    description: '使用绝对定位将元素移出可视区域',
    codeExample: `.hidden-element {
  position: absolute;
  left: -9999px;
  top: -9999px;
}`,
    useCases: [
      '需要屏幕阅读器可访问',
      '需要保留元素功能',
      '表单隐藏输入'
    ],
    prosCons: [
      '✓ 可访问性友好',
      '✓ 保持元素功能',
      '× 可能影响滚动条',
      '× 需要定位上下文'
    ]
  },
  {
    title: 'clip-path 裁剪',
    description: '使用裁剪路径隐藏元素内容',
    codeExample: `.hidden-element {
  clip-path: inset(100%);
}`,
    useCases: [
      '需要平滑过渡动画',
      '现代浏览器支持',
      '需要保留元素空间'
    ],
    prosCons: [
      '✓ 支持动画过渡',
      '✓ 不改变布局',
      '× 兼容性问题',
      '× 仍需处理事件'
    ]
  }
])
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@secondary-color: #42b983;
@code-bg: #f5f7fa;
@border-color: #eaecef;

.hide-methods-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;

  .title {
    text-align: center;
    color: @primary-color;
    margin-bottom: 3rem;
    font-weight: 600;
  }

  .method-list {
    display: grid;
    gap: 2rem;
  }

  .method-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-4px);
    }

    .method-header {
      padding: 1.5rem;
      border-bottom: 2px solid @border-color;
      display: flex;
      align-items: center;
      gap: 1rem;

      .index {
        color: @secondary-color;
        font-weight: bold;
        font-size: 1.2em;
      }

      .method-title {
        margin: 0;
        color: @primary-color;
        font-size: 1.5em;
      }
    }

    .method-content {
      padding: 1.5rem;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        font-size: 1.2em;
        border-left: 4px solid @secondary-color;
        padding-left: 0.8rem;
      }

      .description p {
        line-height: 1.6;
        color: lighten(@primary-color, 20%);
      }

      .code-example {
        pre {
          background: @code-bg;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;

          code {
            font-family: 'Fira Code', monospace;
            color: darken(@secondary-color, 15%);
          }
        }
      }

      ul {
        padding-left: 1.5rem;

        li {
          margin: 0.5rem 0;
          line-height: 1.6;
          color: lighten(@primary-color, 20%);
        }
      }

      .notes {
        background: #fff9e6;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid #ffd700;
        margin-top: 1rem;

        p {
          margin: 0;
          color: #856404;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .hide-methods-container {
    padding: 1rem;

    .method-card {
      .method-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>
