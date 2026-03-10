<template>
  <div class="font-guide">
    <h1 class="main-title">CSS 字体系统基本指南</h1>

    <!-- 基础介绍 -->
    <section class="intro-section">
      <h2 class="section-title">📚 字体基础</h2>
      <div class="content-card">
        <p class="highlight-text">字体系统是网页排版的核心，直接影响可读性和视觉体验</p>
        <div class="font-types">
          <div class="type-card serif">
            <h3>衬线体</h3>
            <p>Times New Roman</p>
          </div>
          <div class="type-card sans-serif">
            <h3>无衬线体</h3>
            <p>Arial</p>
          </div>
          <div class="type-card monospace">
            <h3>等宽字体</h3>
            <p>Courier New</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 字体属性 -->
    <section class="properties-section">
      <h2 class="section-title">🔡 字体属性</h2>
      <div class="property-grid">
        <div v-for="prop in fontProperties" :key="prop.name" class="property-card">
          <div class="prop-header">
            <span class="prop-name">{{ prop.name }}</span>
            <span class="prop-syntax">{{ prop.syntax }}</span>
          </div>
          <p class="prop-desc">{{ prop.desc }}</p>
          <code class="prop-example">{{ prop.example }}</code>
          <div v-for="property in prop.properties" :key="property.name" class="prop-property">
            <span class="prop-property-desc">{{ property.desc }}</span>:
            <span class="prop-property-name">{{ property.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 字体引入 -->
    <section class="font-face-section">
      <h2 class="section-title">💾 字体引入</h2>
      <div class="columns-container">
        <div class="code-card">
          <pre><code>/* 定义字体 */
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2'),
       url('myfont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* 使用字体 */
.body-text {
  font-family: 'MyFont', sans-serif;
}</code></pre>
        </div>
        <div class="notice-card">
          <h3>注意事项</h3>
          <ul>
            <li v-for="(note, index) in fontNotes" :key="index">{{ note }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const fontProperties = reactive([
  {
    name: 'font-family',
    syntax: 'font-family: [字体名称]',
    desc: '定义字体栈，按优先级使用字体',
    example: "font-family: 'Helvetica Neue', Arial, sans-serif;",
    properties: [
      {
        name: 'Helvetica Neue',
        desc: '苹果系统字体',
      },
      {
        name: 'Arial',
        desc: 'Windows系统字体',
      },
      {
        name: 'sans-serif',
        desc: '无衬线字体',
      }
    ]
  },
  {
    name: 'font-size',
    syntax: 'font-size: <length>',
    desc: '设置字号，推荐使用rem/em单位',
    example: 'font-size: 1.125rem; // 18px',
    properties: []
  },
  {
    name: 'font-weight',
    syntax: 'font-weight: 100-900',
    desc: '字体粗细，常用400(normal)/700(bold)',
    example: 'font-weight: 600;',
    properties: [
      {
        name: '数字形式,数字越大越粗',
        desc: '100-900',
      },
      {
        name: '关键字',
        desc: 'normal/bold/lighter/bolder',
      }
    ]
  },
  {
    name: 'font-style',
    syntax: 'font-style: normal/italic',
    desc: '设置斜体样式',
    example: 'font-style: italic;',
    properties: [
      {
        name: 'normal',
        desc: '正常',
      },
      {
        name: 'italic',
      }
    ]
  },
  {
    name: 'line-height',
    syntax: 'line-height: <number>',
    desc: '行高，推荐无单位值',
    example: 'line-height: 1.6;',
    properties: [
      {
        name: '数字形式(比例),会把比例传递给后代',
        desc: '1.6',
      },
      {
        name: '百分比,会把比例传递给后代',
        desc: '160%',
      },
      {
        name: '数字+单位',
        desc: '20px/20em/20rem',
      }
    ]
  },
  {
    name: 'font-variant',
    syntax: 'font-variant: small-caps',
    desc: '字体变体，如小型大写字母',
    example: 'font-variant: small-caps;',
    properties: [
      {
        name: 'small-caps',
        desc: '小型大写字母',
      },
      {
        name: 'normal',
        desc: '正常',
      },
      {
        name: 'none',
        desc: '无',
      }
    ]
  }
])

const fontNotes = reactive([
  '使用WOFF2格式获得最佳性能',
  '注意字体版权许可',
  '优先使用系统自带字体',
  '使用font-display控制加载行为',
  '为中文指定备用字体'
])
</script>

<style lang="less">
@primary-color: #2c3e50;
@accent-blue: #2980b9;
@accent-orange: #d35400;
@background-light: #f8f9fa;

.font-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Helvetica Neue', system-ui;

  .main-title {
    color: @primary-color;
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, @accent-blue, @accent-orange);
      margin: 1rem auto;
    }
  }

  .section-title {
    color: @accent-blue;
    margin: 2.5rem 0 1.5rem;
    font-size: 1.8rem;
    border-left: 4px solid @accent-orange;
    padding-left: 1rem;
  }

  .font-types {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 2rem;

    .type-card {
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;

      &.serif {
        background: lighten(@accent-blue, 40%);
        border: 2px solid @accent-blue;
      }

      &.sans-serif {
        background: lighten(@accent-orange, 40%);
        border: 2px solid @accent-orange;
      }

      &.monospace {
        background: #f0f0f0;
        border: 2px solid #95a5a6;
      }
    }
  }

  .property-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .property-card {
    background: @background-light;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid @accent-orange;

    .prop-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;

      .prop-name {
        color: @primary-color;
        font-weight: 600;
      }

      .prop-syntax {
        color: #7f8c8d;
        font-family: monospace;
      }
    }

    .prop-example {
      display: block;
      margin-top: 1rem;
      padding: 0.8rem;
      background: darken(@background-light, 3%);
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
    }
  }

  .columns-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
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

  .notice-card {
    background: lighten(@accent-blue, 40%);
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid @accent-blue;

    ul {
      padding-left: 1.5rem;
      list-style-type: '👉';

      li {
        margin-bottom: 0.8rem;
      }
    }
  }
}
</style>
