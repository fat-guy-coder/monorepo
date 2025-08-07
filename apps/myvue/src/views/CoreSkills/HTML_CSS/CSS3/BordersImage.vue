<template>
  <div class="border-image-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🖼 CSS border-image 基本指南</h1>
      <p class="subtitle">用图像绘制惊艳边框的艺术</p>
      <div class="header-border"></div>
    </header>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- 属性语法 -->
      <section class="section syntax">
        <h2 class="section-title">📜 属性语法</h2>
        <div class="syntax-card">
          <pre class="code-block"><code>border-image:
  source slice / width / outset repeat;</code></pre>
          <div class="property-grid">
            <div class="property">
              <h3>source</h3>
              <p>边框图像路径<br /><code>url('...')</code></p>
            </div>
            <div class="property">
              <h3>slice</h3>
              <p>图像切割比例<br /><code>number | %</code></p>
            </div>
            <div class="property">
              <h3>width</h3>
              <p>边框宽度<br /><code>length | number</code></p>
            </div>
            <div class="property">
              <h3>outset</h3>
              <p>外延距离<br /><code>length | number</code></p>
            </div>
            <div class="property">
              <h3>repeat</h3>
              <p>重复方式<br /><code>stretch | repeat | round</code></p>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础示例 -->
      <section class="section basic">
        <h2 class="section-title">🎨 基础应用</h2>
        <div class="example-grid">
          <BorderExample title="简单边框" :code="basicExampleCode" image="border-1.png" />
          <BorderExample title="渐变边框" :code="gradientExampleCode" image="border-2.png" />
        </div>
      </section>

      <!-- 动态演示 -->
      <section class="section demo">
        <h2 class="section-title">🎮 动态演示</h2>
        <div class="demo-container">
          <div class="controls">
            <div class="control-group">
              <label>Slice: {{ sliceValue }}</label>
              <input type="range" v-model="sliceValue" min="0" max="50" />
            </div>
            <div class="control-group">
              <label>Repeat Mode:</label>
              <select v-model="repeatMode">
                <option value="stretch">stretch</option>
                <option value="repeat">repeat</option>
                <option value="round">round</option>
              </select>
            </div>
          </div>
          <div class="dynamic-border" :style="dynamicStyle">调节参数实时查看效果</div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="section notice">
        <h2 class="section-title">⚠️ 重要注意事项</h2>
        <div class="notice-grid">
          <div class="notice-card warning">
            <div class="icon">❗</div>
            <h3>图像尺寸</h3>
            <p>推荐使用SVG或等比例切割的位图</p>
          </div>
          <div class="notice-card tip">
            <div class="icon">💡</div>
            <h3>回退方案</h3>
            <pre class="code-block"><code>border: 2px solid #000;
border-image: url(...) 30 round;</code></pre>
          </div>
        </div>
      </section>
    </main>

    <!-- 最佳实践 -->
    <footer class="doc-footer">
      <div class="best-practice">
        <h3>🏆 最佳实践建议</h3>
        <div class="tips">
          <div class="tip">使用SVG图像保证清晰度</div>
          <div class="tip">配合border-width定义尺寸</div>
          <div class="tip">测试不同重复模式的表现</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BorderExample from '../Components/BorderExample.vue'

const sliceValue = ref(30)
const repeatMode = ref('stretch')

const dynamicStyle = computed(() => ({
  borderImage: `url(border-pattern.png) ${sliceValue.value} / 30px / 0 ${repeatMode.value}`,
}))

const basicExampleCode = `.element {
  border: 30px solid;
  border-image: url(frame.png) 30 round;
}`

const gradientExampleCode = `.gradient-border {
  border: 20px solid;
  border-image: linear-gradient(45deg, #3498db, #e74c3c) 1;
}`
</script>

<style lang="less" scoped>


.border-image-doc {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem 3rem;
  background: linear-gradient(145deg, #f8fafb 0%, #ffffff 100%);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', sans-serif;

  .doc-header {
    text-align: center;
    margin-bottom: 3rem;

    .title {
      color: #3498db;
      font-size: 2.8rem;
      margin: 1rem 0;
      text-shadow: 2px 2px 4px rgba(52, 152, 219, 0.1);
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.4rem;
      letter-spacing: 0.05em;
    }

    .header-border {
      width: 200px;
      height: 4px;
      margin: 1.5rem auto;
      border-image: linear-gradient(90deg, #3498db, #e74c3c) 30;
      border-width: 2px;
    }
  }

  .doc-content {
    .section {
      margin-bottom: 3rem;

      .section-title {
        color: #2c3e50;
        font-size: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
      }

      .syntax-card {
        padding: 2rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

        .property-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;

          .property {
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: center;

            h3 {
              color: #3498db;
              margin-bottom: 0.5rem;
            }
          }
        }
      }

      .example-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .demo-container {
        padding: 2rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

        .controls {
          margin-bottom: 2rem;

          .control-group {
            margin: 1rem 0;

            label {
              display: block;
              margin-bottom: 0.5rem;
              color: #2c3e50;
            }

            input,
            select {
              width: 100%;
              padding: 0.5rem;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
          }
        }

        .dynamic-border {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #2c3e50;
          border: 30px solid;
          transition: border-image 0.3s ease;
        }
      }

      .notice-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;

        .notice-card {
          padding: 1.5rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;

          &.warning {
            background: #f9ebec;
            border-left: 4px solid #e74c3c;
          }

          &.tip {
            background: #ebf8f2;
            border-left: 4px solid #2ecc71;
          }

          .icon {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
        }
      }
    }

    .code-block {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
    }
  }

  .doc-footer {
    margin-top: 4rem;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;

    .tips {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .tip {
        padding: 1rem;
        background: white;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
    }
  }
}

@media (max-width: 768px) {
  .border-image-doc {
    padding: 1rem;
    margin: 1rem;

    .doc-header .title {
      font-size: 2rem;
    }

    .property-grid,
    .example-grid,
    .notice-grid,
    .tips {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
