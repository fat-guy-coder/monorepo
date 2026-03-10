<template>
  <div class="list-style-guide">
    <!-- 主标题 -->
    <h1 class="main-title">CSS List-Style 基本指南</h1>

    <!-- 理论介绍 -->
    <section class="theory-section">
      <h2 class="section-title">📋 属性组成</h2>
      <div class="text-content">
        <p>list-style 是以下三个属性的简写：</p>
        <ul class="property-list">
          <li><strong>list-style-type</strong> - 设置列表项标记类型</li>
          <li><strong>list-style-position</strong> - 设置标记位置（inside/outside）</li>
          <li><strong>list-style-image</strong> - 使用自定义图像作为标记</li>
        </ul>
      </div>
    </section>

    <!-- 交互演示区 -->
    <section class="demo-section">
      <h2 class="section-title">🎮 实时演示</h2>
      <div class="demo-wrapper">
        <!-- 控制面板 -->
        <div class="controls-panel">
          <div class="control-item">
            <label>列表类型</label>
            <Select v-model="listType">
              <option v-for="type in listTypes" :key="type.value" :value="type">
                {{ type.label }}
              </option>
            </select>
          </div>

          <div class="control-item">
            <label>标记位置</label>
            <div class="button-group">
              <button v-for="pos in positions" :key="pos" :class="{ active: position === pos }" @click="position = pos">
                {{ pos }}
              </button>
            </div>
          </div>

          <div class="control-item">
            <label>自定义图标</label>
            <input type="text" v-model="customImage" placeholder="输入图片URL" @change="handleImageInput">
            <div class="image-preview" v-if="showCustomImage">
              <img :src="customImage" alt="自定义标记">
            </div>
          </div>

          <div class="control-item">
            <label>
              <input type="checkbox" v-model="useCustomStyle"> 使用自定义样式
            </label>
          </div>
        </div>

        <!-- 演示列表 -->
        <ul class="demo-list" :style="(listStyles as any)" :class="{ 'custom-style': useCustomStyle }">
          <li v-for="item in 5" :key="item">列表项 {{ item }}</li>
        </ul>
      </div>
    </section>

    <!-- 使用示例 -->
    <section class="examples-section">
      <h2 class="section-title">💡 应用示例</h2>
      <div class="example-grid">
        <div class="example-card">
          <h3>基础样式</h3>
          <pre><code>ul {
  list-style: square outside;
}

ol {
  list-style: decimal-leading-zero inside;
}</code></pre>
        </div>

        <div class="example-card">
          <h3>自定义图标</h3>
          <pre><code>ul.custom {
  list-style-image: url('marker.png');
  /* 备用方案 */
  list-style-type: disc;
}</code></pre>
        </div>

        <div class="example-card">
          <h3>高级技巧</h3>
          <pre><code>/* 使用伪元素自定义样式 */
ul.reset {
  list-style: none;
  padding-left: 0;
}

li::before {
  content: '➤';
  margin-right: 0.5em;
  color: #42b983;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="notice-grid">
        <div class="notice-card warning">
          <h3>常见问题</h3>
          <ul>
            <li>list-style-image会覆盖list-style-type</li>
            <li>某些浏览器不支持复杂的list-style-type值</li>
            <li>position: inside可能影响文本对齐</li>
          </ul>
        </div>

        <div class="notice-card tip">
          <h3>最佳实践</h3>
          <ul>
            <li>始终提供备用list-style-type</li>
            <li>需要精确控制时使用伪元素方案</li>
            <li>考虑RTL语言的标记位置</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type ListType = {
  value: string
  label: string
}

// 响应式数据
const listType = ref<ListType>({ value: 'disc', label: '实心圆 ●' })
const position = ref('outside')
const customImage = ref('')
const showCustomImage = ref(false)
const useCustomStyle = ref(false)

// 可用选项
const listTypes: ListType[] = [
  { value: 'disc', label: '实心圆 ●' },
  { value: 'circle', label: '空心圆 ○' },
  { value: 'square', label: '方块 ■' },
  { value: 'decimal', label: '数字 1.' },
  { value: 'lower-roman', label: '小写罗马数字 i.' },
  { value: 'upper-alpha', label: '大写字母 A.' }
]

const positions = ['inside', 'outside']

// 计算列表样式
const listStyles = computed(() => ({
  listStyleType: showCustomImage.value ? 'none' : listType.value.value,
  listStylePosition: position.value,
  listStyleImage: showCustomImage.value ? `url(${customImage.value})` : 'none'
}))

// 处理图片输入
const handleImageInput = () => {
  showCustomImage.value = customImage.value.length > 0
}
</script>

<style lang="less">
@primary-color: #2c3e50;
@secondary-color: #42b983;
@warning-bg: #fff3cd;
@tip-bg: #d4edda;
@code-bg: #f8f9fa;

.list-style-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui;

  .main-title {
    color: darken(@secondary-color, 15%);
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .section-title {
    color: @primary-color;
    border-left: 4px solid @secondary-color;
    padding-left: 1rem;
    margin: 2.5rem 0;
  }

  .demo-wrapper {
    display: grid;
    gap: 2rem;
    grid-template-columns: 280px 1fr;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .controls-panel {
      display: grid;
      gap: 1.5rem;

      .control-item {
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: lighten(@primary-color, 20%);
          font-weight: 500;
        }

        select,
        input[type="text"] {
          width: 100%;
          padding: 0.5rem;
          border: 2px solid #eee;
          border-radius: 6px;
          transition: all 0.2s;

          &:focus {
            border-color: @secondary-color;
            outline: none;
          }
        }

        .button-group {
          display: flex;
          gap: 0.5rem;

          button {
            flex: 1;
            padding: 0.5rem;
            border: 2px solid #eee;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;

            &.active {
              background: @secondary-color;
              color: white;
              border-color: @secondary-color;
            }
          }
        }

        .image-preview {
          margin-top: 0.5rem;

          img {
            max-width: 50px;
            height: auto;
            border-radius: 4px;
          }
        }
      }
    }

    .demo-list {
      padding-left: 2rem;
      border: 2px dashed #eee;
      border-radius: 8px;
      transition: all 0.3s ease;

      li {
        padding: 0.5rem 0;
        transition: transform 0.2s;

        &:hover {
          transform: translateX(5px);
        }
      }

      &.custom-style {
        list-style: none;
        padding-left: 0;

        li::before {
          content: '✦';
          color: @secondary-color;
          margin-right: 0.8rem;
          font-weight: bold;
        }
      }
    }
  }

  .example-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    .example-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      pre {
        background: @code-bg;
        padding: 1rem;
        border-radius: 6px;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          color: darken(@secondary-color, 15%);
        }
      }
    }
  }

  .notice-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

    .notice-card {
      padding: 1.5rem;
      border-radius: 8px;

      &.warning {
        background: @warning-bg;
        border-left: 4px solid #ffc107;
      }

      &.tip {
        background: @tip-bg;
        border-left: 4px solid #28a745;
      }

      ul {
        padding-left: 1.2rem;

        li {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .list-style-guide {
    padding: 1rem;

    .demo-wrapper {
      grid-template-columns: 1fr;

      .demo-list {
        min-height: 200px;
      }
    }
  }
}
</style>
