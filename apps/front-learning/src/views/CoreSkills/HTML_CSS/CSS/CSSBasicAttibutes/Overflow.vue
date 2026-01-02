<template>
  <div class="overflow-guide-container">
    <!-- 主标题 -->
    <h1 class="main-title">CSS Overflow</h1>

    <!-- 理论介绍 -->
    <section class="theory-section">
      <h2 class="section-title">🎯 核心概念</h2>
      <div class="text-content">
        <p>overflow 属性控制内容溢出容器时的表现方式，包含以下主要值：</p>
        <ul>
          <li><strong>visible</strong>：默认值，内容不会被裁剪</li>
          <li><strong>hidden</strong>：裁剪溢出内容且不显示滚动条</li>
          <li><strong>scroll</strong>：始终显示滚动条</li>
          <li><strong>auto</strong>：仅在需要时显示滚动条</li>
        </ul>
        <p>支持单独控制轴向：overflow-x / overflow-y</p>
      </div>
    </section>

    <!-- 交互演示区 -->
    <section class="demo-section">
      <h2 class="section-title">🖥️ 实时演示</h2>
      <div class="demo-wrapper">
        <!-- 控制面板 -->
        <div class="controls-panel">
          <div class="control-item">
            <label>选择 overflow 类型</label>
            <Select v-model="overflowType">
              <option v-for="type in overflowTypes" :key="type">{{ type }}</option>
            </select>
          </div>

          <div class="control-item">
            <label>内容宽度 {{ contentWidth }}%</label>
            <input type="range" v-model="contentWidth" min="100" max="200" @input="generateContent">
          </div>

          <div class="control-item">
            <label>容器高度 {{ containerHeight }}px</label>
            <input type="range" v-model="containerHeight" min="100" max="400">
          </div>
        </div>

        <!-- 演示容器 -->
        <div class="demo-container" :style="{
          overflow: overflowType,
          height: `${containerHeight}px`
        }">
          <div class="content-box" :style="{ width: `${contentWidth}%` }">
            <div v-for="n in 15" :key="n" class="content-item">内容块 {{ n }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="usage-section">
      <h2 class="section-title">💡 典型应用场景</h2>
      <div class="usage-grid">
        <div class="usage-card">
          <h3>隐藏滚动条</h3>
          <pre><code>.hide-scrollbar {
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
}</code></pre>
        </div>

        <div class="usage-card">
          <h3>清除浮动</h3>
          <h4>使用 overflow: hidden 清除浮动实际是触发了<a @click="goto">BFC</a></h4>
          <pre><code>.clearfix::after {
  content: "";
  clear: both;
  display: table;
}</code></pre>
        </div>

        <div class="usage-card">
          <h3>模态框背景锁定</h3>
          <pre><code>body.modal-open {
  overflow: hidden;
}</code></pre>
        </div>

        <div class="usage-card">
          <h3>响应式表格</h3>
          <pre><code>.responsive-table {
  overflow-x: auto;
  min-height: 10em;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h2 class="section-title">⚠️ 重要注意事项</h2>
      <div class="notice-grid">
        <div class="notice-card warning">
          <h3>常见问题</h3>
          <ul>
            <li>同时设置 overflow-x/y 时需保持相同值</li>
            <li>position: sticky 需要容器设置 overflow: visible</li>
            <li>flex 容器中 overflow 表现可能不一致</li>
          </ul>
        </div>

        <div class="notice-card tip">
          <h3>最佳实践</h3>
          <ul>
            <li>优先使用 overflow: auto 代替 scroll</li>
            <li>移动端使用 -webkit-overflow-scrolling: touch</li>
            <li>配合 max-height 实现优雅降级</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goto = () => {
  router.push({
    name: 'BFC_IFC'
  })
}

const overflowType = ref('visible')
const containerHeight = ref(200)
const contentWidth = ref(100)

const overflowTypes = [
  'visible',
  'hidden',
  'scroll',
  'auto',
  'overlay' // Chrome 特有值
]

const generateContent = () => {
  if (contentWidth.value > 180) {
    contentWidth.value = 200
  }
}
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@secondary-color: #42b983;
@warning-bg: #fff3cd;
@tip-bg: #d4edda;
@code-bg: #f8f9fa;

.overflow-guide-container {
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

        select {
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

        input[type="range"] {
          width: 100%;
          accent-color: @secondary-color;
        }
      }
    }

    .demo-container {
      border: 2px solid #eee;
      border-radius: 8px;
      padding: 1rem;
      transition: height 0.3s ease;

      .content-box {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
        transition: width 0.3s ease;

        .content-item {
          background: lighten(@secondary-color, 45%);
          padding: 1rem;
          border-radius: 4px;
          border: 1px solid #eee;
          text-align: center;
        }
      }
    }
  }

  .usage-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    .usage-card {
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
  .overflow-guide-container {
    padding: 1rem;

    .demo-wrapper {
      grid-template-columns: 1fr;

      .demo-container {
        height: 300px !important;
      }
    }
  }
}
</style>
