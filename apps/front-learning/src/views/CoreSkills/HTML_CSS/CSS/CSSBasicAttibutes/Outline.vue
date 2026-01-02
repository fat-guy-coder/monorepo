<template>
  <div class="outline-container">
    <h1 class="title">CSS3 Outline基本属性</h1>

    <section class="intro-section">
      <h2 class="section-title">一、Outline 概述</h2>
      <p class="content-text">
        Outline（轮廓）是绘制在元素边框外围的线条，用于突出显示元素。与border不同，outline具有以下特点：
      </p>
      <ul class="feature-list">
        <li>不占据布局空间（不影响元素尺寸计算）</li>
        <li>可应用于任何可见元素</li>
        <li>支持多种样式（实线、虚线、点线等）</li>
        <li>常用于焦点指示和调试布局</li>
      </ul>
    </section>

    <section class="usage-section">
      <h2 class="section-title">二、基本用法</h2>
      <div class="example-block">
        <div class="outline-demo basic-outline">基础轮廓</div>
        <pre class="code-sample">{{ basicExample }}</pre>
      </div>
    </section>

    <section class="properties-section">
      <h2 class="section-title">三、分支属性</h2>
      <div class="example-grid">
        <div class="property-example">
          <div class="outline-demo style-demo">outline-style</div>
          <p class="property-desc">dotted | dashed | solid | double</p>
        </div>
        <div class="property-example">
          <div class="outline-demo color-demo">outline-color</div>
          <p class="property-desc">支持所有颜色格式</p>
        </div>
        <div class="property-example">
          <div class="outline-demo offset-demo">outline-offset</div>
          <p class="property-desc">偏移量: 10px</p>
        </div>
      </div>
    </section>

    <section class="scenario-section">
      <h2 class="section-title">四、效果</h2>
      <div class="scenario-example">
        <input v-model="inputValue" placeholder="焦点轮廓示例" class="focus-input" />
        <div class="hover-demo" @mouseover="hover = true" @mouseleave="hover = false">
          {{ hover ? '悬停中' : '悬停查看效果' }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref('');
const hover = ref(false);

const basicExample = `
outline: 3px solid #3498db;
`;
</script>

<style lang="less" scoped>
.outline-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  font-family: 'Segoe UI', system-ui;

  .title {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 2rem;
  }

  .section-title {
    color: #34495e;
    border-left: 4px solid #42b983;
    padding-left: 1rem;
    margin: 2rem 0;
  }

  .feature-list {
    line-height: 1.8;
    color: #7f8c8d;
    padding-left: 1.5rem;

    li {
      font-weight: 900;
    }
  }

  .example-block {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  .outline-demo {
    width: 200px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    background: #fff;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .basic-outline {
    outline: 3px solid #3498db;
  }

  .style-demo {
    outline: 3px dotted #e74c3c;
  }

  .color-demo {
    outline: 3px solid rgba(46, 204, 113, 0.8);
  }

  .offset-demo {
    outline: 2px solid #9b59b6;
    outline-offset: 10px;
  }

  .code-sample {
    background: #2d2d2d;
    color: #fff;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }

  .example-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .focus-input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #bdc3c7;

    &:focus {
      outline: 3px solid #f1c40f;
    }
  }

  .hover-demo {
    margin-top: 1rem;
    padding: 1rem;
    background: #ecf0f1;
    cursor: pointer;
    transition: outline 0.2s;

    &:hover {
      outline: 2px solid #e67e22;
    }
  }

  .property-desc {
    color: #7f8c8d;
    font-size: 0.9em;
    text-align: center;
    margin-top: 0.5rem;
  }
}
</style>