<template>
  <div class="border-guide-container">
    <!-- 标题部分 -->
    <h1 class="main-title">CSS边框</h1>

    <!-- 理论介绍部分 -->
    <section class="theory-section">
      <h2 class="section-title">边框基础</h2>
      <div class="text-content">
        <p>border是CSS核心属性，用于在元素周围创建装饰性边框。包含三个主要属性：</p>
        <ul>
          <li><strong>border-width</strong>: 定义边框厚度（默认medium）</li>
          <li><strong>border-style</strong>: 定义边框样式（必填属性）</li>
          <li><strong>border-color</strong>: 定义边框颜色（默认currentColor）</li>
        </ul>
      </div>
    </section>

    <!-- 交互演示区域 -->
    <section class="demo-section">
      <h2 class="section-title">实时边框演示</h2>
      <div class="demo-wrapper">
        <!-- 控制面板 -->
        <div class="controls-panel">
          <div class="control-item">
            <label>边框颜色</label>
            <input type="color" v-model="borderColor">
          </div>
          <div class="control-item">
            <label>边框宽度 {{ borderWidth }}px</label>
            <input type="range" v-model="borderWidth" min="0" max="20">
          </div>
          <div class="control-item">
            <label>边框样式</label>
            <select v-model="borderStyle">
              <option v-for="style in borderStyles" :key="style">{{ style }}</option>
            </select>
          </div>
          <div class="control-item">
            <label>圆角半径 {{ borderRadius }} <a-select v-model:value="unit" :options="unitOptions"></a-select> </label>
            <input type="range" v-model="borderRadius" min="0" max="100">
          </div>
        </div>

        <!-- 展示元素 -->
        <div class="demo-element" :style="{
          border: `${borderWidth}px ${borderStyle} ${borderColor}`,
          borderRadius: `${borderRadius}${unit}`
        }"></div>
      </div>
    </section>

    <!-- 分支属性介绍 -->
    <section class="sub-properties">
      <h2 class="section-title">分支属性基础介绍</h2>
      <div class="property-grid">
        <div class="property-card">
          <h3>border-radius</h3>
          <p>创建圆角效果，支持1-4个值，可使用百分比或长度单位</p>
          <pre><code>.rounded {
  border-radius: 4px 8px; /* 水平/垂直半径 */
}</code></pre>
        </div>
        <div class="property-card">
          <h3>border-image</h3>
          <p>使用图像作为边框，需配合slice和width属性使用</p>
          <pre><code>.fancy-border {
  border-image: url(border.png) 30 round;
}</code></pre>
        </div>
        <div class="property-card">
          <h3>border-collapse</h3>
          <p>控制表格边框合并方式，可选值：collapse | separate</p>
          <pre><code>table {
  border-collapse: collapse;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 使用建议 -->
    <section class="best-practices">
      <h2 class="section-title">最佳实践与注意事项</h2>
      <div class="tips-grid">
        <div class="tip-card warning">
          <h3>⚠️ 常见问题</h3>
          <ul>
            <li>忘记设置border-style会导致边框不可见</li>
            <li>百分比border-radius在不同尺寸下的表现差异</li>
            <li>border-image需要同时设置border-style</li>
          </ul>
        </div>
        <div class="tip-card recommendation">
          <h3>✅ 推荐用法</h3>
          <ul>
            <li>使用简写属性提高可读性</li>
            <li>优先使用HSLA颜色值方便透明度控制</li>
            <li>组合使用box-shadow实现复杂边框效果</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const borderColor = ref('#42b983')
const borderWidth = ref(4)
const borderStyle = ref('solid')
const borderRadius = ref(8)
const unit = ref('px')

const unitOptions = [
  { label: 'px', value: 'px' },
  { label: '%', value: '%' },
  { label: 'em', value: 'em' },
  { label: 'rem', value: 'rem' },
]

const borderStyles = [
  'none', 'solid', 'dashed', 'dotted',
  'double', 'groove', 'ridge', 'inset', 'outset'
]
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@secondary-color: #42b983;
@code-bg: #f8f9fa;
@warning-bg: #fff3cd;
@recommend-bg: #d4edda;

.border-guide-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;

  .main-title {
    color: darken(@secondary-color, 15%);
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 600;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .section-title {
    color: @primary-color;
    border-left: 4px solid @secondary-color;
    padding-left: 1rem;
    margin: 2rem 0;
  }

  .demo-wrapper {
    display: grid;
    gap: 2rem;
    grid-template-columns: 300px 1fr;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .controls-panel {
      display: grid;
      gap: 1.5rem;

      .control-item {
        display: grid;
        gap: 0.5rem;

        label {
          color: lighten(@primary-color, 20%);
          font-weight: 500;
        }

        input[type="range"] {
          accent-color: @secondary-color;
        }

        select {
          padding: 0.5rem;
          border: 2px solid #eee;
          border-radius: 6px;
          transition: all 0.2s;

          &:focus {
            border-color: @secondary-color;
            outline: none;
          }
        }
      }
    }

    .demo-element {
      width: 300px;
      height: 200px;
      background: lighten(@secondary-color, 45%);
      transition: all 0.3s ease;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
    }
  }

  .property-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    .property-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      h3 {
        color: @secondary-color;
        margin-top: 0;
      }

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

  .tips-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

    .tip-card {
      padding: 1.5rem;
      border-radius: 8px;

      &.warning {
        background: @warning-bg;
        border-left: 4px solid #ffc107;
      }

      &.recommendation {
        background: @recommend-bg;
        border-left: 4px solid #28a745;
      }

      h3 {
        margin-top: 0;
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
  .border-guide-container {
    padding: 1rem;

    .demo-wrapper {
      grid-template-columns: 1fr;

      .demo-element {
        width: 100%;
        height: 150px;
      }
    }
  }
}
</style>
