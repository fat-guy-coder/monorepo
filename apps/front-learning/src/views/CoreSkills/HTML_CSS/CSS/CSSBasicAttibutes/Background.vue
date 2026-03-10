<template>
  <div class="background-guide">
    <h1 class="main-title">CSS Background 基本指南</h1>

    <!-- 基础介绍 -->
    <section class="intro-section">
      <h2 class="section-title">🎨 基础属性</h2>
      <div class="content-card">
        <p class="highlight-text">background是用于定义元素背景样式的复合属性，包含多个子属性</p>
        <div class="basic-properties">
          <div class="prop-item" v-for="prop in basicProps" :key="prop.name">
            <span class="prop-name">{{ prop.name }}</span>
            <span class="prop-desc">{{ prop.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 复合写法 -->
    <section class="shorthand-section">
      <h2 class="section-title">📝 复合写法</h2>
      <div class="columns-container">
        <div class="code-card">
          <pre><code>/* 基本语法 */
.element {
  background:
    url(image.jpg)     /* 图片 */
    center/cover       /* 定位/尺寸 */
    no-repeat          /* 重复方式 */
    fixed              /* 附着方式 */
    padding-box        /* 绘制区域 */
    content-box        /* 定位区域 */
    #f5f6fa;           /* 背景颜色 */
}

/* 渐变示例 */
.gradient-box {
  background: linear-gradient(
    45deg,
    #ff6b6b 20%,
    #4ecdc4
  );
}</code></pre>
        </div>
        <div class="example-card">
          <div class="demo-box gradient-demo"></div>
          <div class="demo-box image-demo"></div>
        </div>
      </div>
    </section>

    <!-- 分支属性 -->
    <section class="sub-properties">
      <h2 class="section-title">🔧 分支属性基础介绍</h2>
      <div class="grid-container">
        <div v-for="prop in subProps" :key="prop.name" class="prop-card">
          <div class="prop-header">
            <span class="prop-name">{{ prop.name }}</span>
            <span class="prop-syntax">{{ prop.syntax }}</span>
          </div>
          <p class="prop-desc">{{ prop.desc }}</p>
          <code class="prop-example">{{ prop.example }}</code>
          <div class="usage-tags">
            <span v-for="tag in prop.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="notice-grid">
        <div class="notice-card">
          <ul>
            <li v-for="(note, index) in notices" :key="index">{{ note }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const basicProps = reactive([
  { name: 'background-color', desc: '背景颜色' },
  { name: 'background-image', desc: '背景图片/渐变' },
  { name: 'background-position', desc: '定位起始位置' },
  { name: 'background-size', desc: '背景尺寸' },
  { name: 'background-repeat', desc: '重复方式' },
  { name: 'background-attachment', desc: '滚动附着方式' }
])

const subProps = reactive([
  {
    name: 'background-clip',
    syntax: 'border-box | padding-box | content-box | text',
    desc: '控制背景绘制区域',
    example: 'background-clip: text;',
    tags: ['文字效果', '高级裁剪']
  },
  {
    name: 'background-blend-mode',
    syntax: 'multiply | screen | overlay | ...',
    desc: '混合多个背景层的模式',
    example: 'background-blend-mode: multiply;',
    tags: ['图像处理', '混合模式']
  },
  {
    name: 'background-origin',
    syntax: 'border-box | padding-box | content-box',
    desc: '决定定位基准',
    example: 'background-origin: content-box;',
    tags: ['定位基准', '对齐控制']
  }
])

const scenarios = reactive([
  {
    icon: '🖼️',
    title: '全屏背景',
    desc: '使用cover尺寸实现响应式全屏背景',
    style: {
      background: 'url(/pattern.jpg) center/cover no-repeat'
    }
  },
  {
    icon: '🎨',
    title: '渐变按钮',
    desc: '线性渐变创建现代按钮效果',
    style: {
      background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)'
    }
  },
  {
    icon: '🔲',
    title: '纹理叠加',
    desc: '多背景层叠加创建复杂效果',
    style: {
      background:
        'linear-gradient(rgba(0,0,0,0.5), url(/texture.png)'
    }
  }
])

const notices = reactive([
  '多背景层写法按从前到后顺序堆叠',
  '使用base64编码小图片优化加载',
  '注意background-size的兼容性',
  '渐变背景建议添加fallback颜色'
])
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@accent-blue: #3498db;
@accent-orange: #e67e22;
@background-light: #f8f9fa;

.background-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Helvetica Neue', system-ui;

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

  .basic-properties {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-top: 1.5rem;

    .prop-item {
      padding: 1rem;
      background: @background-light;
      border-radius: 8px;

      .prop-name {
        color: @accent-blue;
        font-weight: 600;
        margin-right: 1rem;
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
    .demo-box {
      height: 150px;
      border-radius: 12px;
      margin-bottom: 1rem;

      &.gradient-demo {
        background: linear-gradient(135deg, #a8edea, #fed6e3);
      }

      &.image-demo {
        background: url('data:image/svg+xml,...') center/cover;
      }
    }
  }

  .grid-container {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .prop-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .prop-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;

      .prop-name {
        color: @accent-blue;
      }

      .prop-syntax {
        color: #7f8c8d;
        font-family: monospace;
      }
    }

    .usage-tags {
      margin-top: 1rem;

      span {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        background: @background-light;
        border-radius: 20px;
        margin-right: 0.5rem;
        font-size: 0.9em;
      }
    }
  }

  .scenario-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    .scene-card {
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      text-align: center;

      .scene-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .scene-preview {
        height: 120px;
        border-radius: 8px;
        margin-top: 1rem;
        border: 2px solid #eee;
      }
    }
  }

  .notice-card {
    background: #fff3e0;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid #ffb300;

    ul {
      padding-left: 1.5rem;
      list-style-type: '❗';

      li {
        margin-bottom: 0.8rem;
      }
    }
  }
}
</style>
