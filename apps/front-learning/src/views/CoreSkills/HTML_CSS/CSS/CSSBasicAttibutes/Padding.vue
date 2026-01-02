<template>
  <div class="padding-guide">
    <h1 class="main-title">CSS Padding</h1>

    <!-- 基础介绍 -->
    <section class="intro-section">
      <h2 class="section-title">📚 基础概念</h2>
      <div class="content-card">
        <p class="highlight-text">padding用于定义元素的内边距，控制内容与边框之间的空间。</p>
        <div class="box-model">
          <div class="content-box">Content</div>
          <div class="padding-area"></div>
        </div>
      </div>
    </section>

    <!-- 基本用法 -->
    <section class="basic-usage">
      <h2 class="section-title">🛠️ 基本用法</h2>
      <div class="columns-container">
        <div class="code-card">
          <pre><code>/* 简写形式 */
padding: 20px;          /* 全边 */
padding: 10px 20px;     /* 上下 | 左右 */
padding: 5px 10px 15px; /* 上 | 左右 | 下 */
padding: 1px 2px 3px 4px;/* 上 | 右 | 下 | 左 */

/* 单边设置 */
padding-top: 10px;
padding-inline-start: 15px;</code></pre>
        </div>
        <div class="example-card">
          <div class="padding-example">
            <div class="demo-box">内容区域</div>
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

    <!-- 优缺点 -->
    <section class="pros-cons-section">
      <h2 class="section-title">⚖️ 优缺点分析</h2>
      <div class="columns-container">
        <div class="pros-card">
          <h3>✅ 优点</h3>
          <ul>
            <li v-for="(pro, index) in pros" :key="index">{{ pro }}</li>
          </ul>
        </div>
        <div class="cons-card">
          <h3>❌ 缺点</h3>
          <ul>
            <li v-for="(con, index) in cons" :key="index">{{ con }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="notice-grid">
        <div class="notice-card">
          <ul>
            <li v-for="(notice, index) in notices" :key="index">{{ notice }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const properties = reactive([
  { name: 'padding-block', desc: '逻辑垂直内边距', example: '10px 20px' },
  { name: 'padding-inline', desc: '逻辑水平内边距', example: '1rem' },
  { name: 'padding-top', desc: '上内边距', example: '5%' },
  { name: 'padding-trim', desc: '移除相邻边距', example: 'trim' }
])

const scenarios = reactive([
  { icon: '🖱️', title: '按钮点击区域', desc: '扩大可点击热区提升体验' },
  { icon: '🖼️', title: '图片容器', desc: '创建图片与边框的间距' },
  { icon: '📦', title: '内容容器', desc: '保证内容与容器边界的呼吸空间' },
  { icon: '📐', title: '布局调整', desc: '微调元素内部空间分布' }
])

const pros = reactive([
  '不影响外部布局',
  '支持百分比值',
  '可创建背景扩展效果',
  '良好的浏览器兼容性'
])

const cons = reactive([
  '影响元素计算尺寸',
  '百分比基于父元素宽度',
  '无法设置负值',
  '可能引发内容溢出'
])

const notices = reactive([
  '注意box-sizing的影响（content-box/border-box）',
  '内联元素垂直padding不会影响行高计算',
  '使用padding-trim需注意兼容性',
  '避免过度使用导致布局冗余空间'
])
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@accent-purple: #8e44ad;
@accent-green: #27ae60;
@warning-color: #e74c3c;
@background-light: #f8f9fa;

.padding-guide {
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
      background: linear-gradient(to right, @accent-purple, @accent-green);
      margin: 1rem auto;
    }
  }

  .section-title {
    color: @accent-purple;
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
    width: 300px;
    height: 200px;
    margin: 2rem auto;
    background: #f0f0f0;

    .content-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 50%;
      background: #fff;
      display: grid;
      place-items: center;
      z-index: 2;
    }

    .padding-area {
      position: absolute;
      top: 20%;
      left: 20%;
      right: 20%;
      bottom: 20%;
      background: rgba(@accent-purple, 0.1);
      border: 2px dashed @accent-purple;
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
    .padding-example {
      padding: 2rem;
      background: #fff;

      .demo-box {
        background: @accent-purple;
        color: white;
        padding: 2rem;
        border-radius: 8px;
        transition: padding 0.3s ease;

        &:hover {
          padding: 3rem;
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
    border-left: 4px solid @accent-purple;

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
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }
  }

  .pros-cons-section {

    .pros-card,
    .cons-card {
      padding: 1.5rem;
      border-radius: 8px;

      ul {
        padding-left: 1.5rem;
        list-style-type: '▹';
      }
    }

    .pros-card {
      background: #f0f8ff;
      border: 2px solid @accent-purple;
    }

    .cons-card {
      background: #fff0f0;
      border: 2px solid @warning-color;
    }
  }

  .notice-card {
    background: #fff9e6;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid #ffd700;

    ul {
      padding-left: 1.5rem;
      list-style-type: '❗';
    }
  }
}
</style>