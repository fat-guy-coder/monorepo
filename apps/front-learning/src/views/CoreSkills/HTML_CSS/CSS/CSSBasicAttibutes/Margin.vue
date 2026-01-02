<template>
  <div class="margin-guide">
    <h1 class="main-title">CSS Margin</h1>

    <!-- 基础介绍 -->
    <section class="intro-section">
      <h2 class="section-title">📚 基础概念</h2>
      <div class="content-card">
        <p class="highlight-text">margin用于定义元素的外边距，控制元素与周围元素的距离。</p>
        <div class="box-model">
          <div class="element-box">
            Content
            <div class="margin-area"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 基本用法 -->
    <section class="basic-usage">
      <h2 class="section-title">🛠️ 基本用法</h2>
      <div class="columns-container">
        <div class="code-card">
          <pre><code>/* 简写形式 */
margin: 10px;          /* 全边 */
margin: 10px 20px;     /* 上下 | 左右 */
margin: 5px 10px 15px; /* 上 | 左右 | 下 */
margin: 1px 2px 3px 4px;/* 上 | 右 | 下 | 左 */

/* 单边设置 */
margin-top: 10px;
margin-inline-start: 20px;</code></pre>
        </div>
        <div class="example-card">
          <div class="margin-example">
            <div class="box a">Box A</div>
            <div class="box b">Box B</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 分支属性 -->
    <section class="sub-properties">
      <h2 class="section-title">🔧 相关属性</h2>
      <div class="grid-container">
        <div v-for="prop in properties" :key="prop.name" class="prop-card">
          <h3>{{ prop.name }}</h3>
          <p>{{ prop.desc }}</p>
          <code>{{ prop.example }}</code>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="usage-scenarios">
      <h2 class="section-title">💡 使用场景</h2>
      <div class="scenario-grid">
        <div v-for="(scene, index) in scenarios" :key="index" class="scene-card">
          <div class="icon">{{ scene.icon }}</div>
          <h4>{{ scene.title }}</h4>
          <p>{{ scene.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 间距合并 -->
    <section class="collapsing-section">
      <h2 class="section-title">⚠️ 外边距合并</h2>
      <h3><a href="https://www.w3school.com.cn/css/css_margin_collapse.asp" target="_blank">w3school 外边距合并</a>
      </h3>
      <div class="columns-container">
        <div class="explain-card">
          <h3>发生条件</h3>
          <ul>
            <li v-for="(condition, index) in collapsingConditions" :key="index">{{ condition }}</li>
          </ul>
        </div>
        <div class="solution-card">
          <h3>解决方案</h3>
          <ul>
            <li v-for="(solution, index) in collapsingSolutions" :key="index">{{ solution }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- margin-inline -->
    <section class="logical-property">
      <h2 class="section-title">🌐 margin-inline</h2>
      <div class="content-card">
        <div class="columns-container">
          <div class="desc-box">
            <p>逻辑属性，用于设置水平方向外边距：</p>
            <ul>
              <li>代替margin-left/right</li>
              <li>支持书写方向</li>
              <li>兼容性：现代浏览器</li>
            </ul>
          </div>
          <pre class="code-box"><code>.element {
  margin-inline: 20px; /* 左右 */
  margin-inline-start: 30px; /* 起始边 */
}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const properties = reactive([
  { name: 'margin-top', desc: '上外边距', example: '10px | 5%' },
  { name: 'margin-inline', desc: '逻辑水平外边距', example: '20px' },
  { name: 'margin-block', desc: '逻辑垂直外边距', example: '1rem' },
  { name: 'margin-collapse', desc: '控制外边距合并', example: 'collapse | discard' }
])

const scenarios = reactive([
  { icon: '📏', title: '元素间距', desc: '控制相邻元素之间的间隔距离' },
  { icon: '🎯', title: '居中布局', desc: 'margin: auto实现水平居中' },
  { icon: '📐', title: '响应式留白', desc: '根据屏幕尺寸调整外边距' },
  { icon: '🖼️', title: '图片排版', desc: '控制图片与文字间距' }
])

const collapsingConditions = reactive([
  '相邻块级元素垂直外边距',
  '父元素与第一个/最后一个子元素',
  '空块级元素上下边距'
])

const collapsingSolutions = reactive([
  '使用padding代替margin',
  '创建BFC容器(overflow: hidden)',
  '使用flex/grid布局',
  '添加透明边框'
])
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@accent-blue: #3498db;
@warning-color: #e74c3c;
@background-light: #f8f9fa;

.margin-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui;

  .main-title {
    color: @primary-color;
    text-align: center;
    font-size: 2.4rem;
    margin-bottom: 3rem;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, @accent-blue, #2ecc71);
      margin: 1rem auto;
    }
  }

  .section-title {
    color: @accent-blue;
    margin: 2.5rem 0 1.5rem;
    font-size: 1.8rem;
  }

  .content-card {
    background: @background-light;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .box-model {
    position: relative;
    height: 200px;
    background: #f0f0f0;
    margin: 2rem 0;

    .element-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 150px;
      height: 100px;
      background: #fff;
      border: 2px solid @accent-blue;
      display: grid;
      place-items: center;

      .margin-area {
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border: 2px dashed rgba(@accent-blue, 0.3);
      }
    }
  }

  .columns-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .code-card {
    pre {
      margin: 0;
      background: darken(@background-light, 3%);
      padding: 1.5rem;
      border-radius: 8px;

      code {
        font-family: 'Fira Code', monospace;
        color: @primary-color;
        line-height: 1.6;
      }
    }
  }

  .example-card {
    .margin-example {
      display: flex;
      flex-direction: column;
      gap: 30px;
      padding: 2rem;
      background: #fff;

      .box {
        padding: 1rem;
        border: 2px solid @accent-blue;

        &.a {
          margin-bottom: 20px;
        }

        &.b {
          margin-top: 30px;
        }
      }
    }
  }

  .grid-container {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .prop-card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid @accent-blue;

    h3 {
      color: @primary-color;
      margin-bottom: 0.5rem;
    }

    code {
      display: block;
      margin-top: 0.8rem;
      color: @warning-color;
      font-family: monospace;
    }
  }

  .scenario-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

    .scene-card {
      text-align: center;
      padding: 1.5rem;
      background: #fff;
      border-radius: 12px;

      .icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }
  }

  .collapsing-section {

    .explain-card,
    .solution-card {
      padding: 1.5rem;
      border-radius: 8px;

      ul {
        padding-left: 1.5rem;
        list-style-type: '👉';
      }
    }

    .explain-card {
      background: #ffeeee;
      border: 2px solid @warning-color;
    }

    .solution-card {
      background: #eeffee;
      border: 2px solid #2ecc71;
    }
  }

  .logical-property {
    .desc-box {
      padding-right: 2rem;

      ul {
        list-style-type: '✅';
        padding-left: 1.5rem;
      }
    }

    .code-box {
      background: darken(@background-light, 3%);
      padding: 1.5rem;
      border-radius: 8px;
    }
  }
}
</style>