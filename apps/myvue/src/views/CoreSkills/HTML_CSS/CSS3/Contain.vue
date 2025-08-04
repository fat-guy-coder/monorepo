<template>
  <div class="contain-demo">
    <!-- 介绍部分 -->
    <section class="intro-section">
      <h2>CSS Contain 属性</h2>

      <h3>
        CSS 属性 contain 标示了元素及其内容尽可能<b>独立</b>于文档树的其余部分。contain属性使 DOM 的一部分得以被隔离，且通过将布局、样式、绘制、尺寸或其任意组合的计算 <b> 限制于 DOM
          子树而非整个页面使性能受益</b>。contain也可用于限制
        CSS 计数器和引号的作用域。<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/contain" target="_blank"
          rel="noopener noreferrer">摘自MDN</a>
      </h3>
      <h3>优点</h3>
      <ul>
        <li>在容器内对被局限属性的修改不会传播到被局限元素外的页面的其余部分。</li>
        <li>局限的主要益处在于浏览器无需经常重渲 DOM 或页面布局，由此在静态页面的渲染中带来小幅性能收益，在更动态的应用中带来更多的性能收益</li>
      </ul>
      <div class="description">
        <p>🚀 <strong>contain</strong> 属性用于限制元素及其子元素的渲染影响范围，通过隔离内容提升页面性能</p>
        <p>📌 主要应用场景：复杂界面优化、无限滚动列表、动画性能提升</p>
      </div>
    </section>

    <!-- 控制面板 -->
    <section class="control-section">
      <div class="controls">
        <div class="control-group">
          <label>选择contain类型：</label>
          <select v-model="selectedContain">
            <option v-for="type in containTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>

        <div class="control-group">
          <label>
            <input type="checkbox" v-model="enableAnimation">
            启用动画
          </label>
        </div>

        <div class="control-group">
          <button @click="addElement">添加元素(+10)</button>
          <button @click="resetElements">重置元素</button>
        </div>
      </div>
    </section>

    <!-- 演示区域 -->
    <section class="demo-section">
      <div class="demo-container" :class="[selectedContain, { 'with-animation': enableAnimation }]"
        :style="{ contain: selectedContain }">
        <div v-for="n in elementCount" :key="n" class="demo-element"></div>
      </div>

      <!-- 代码展示 -->
      <pre class="code-display">
.demo-container {
  contain: <span class="highlight">{{ selectedContain || 'none' }}</span>;
}</pre>
    </section>

    <!-- 类型说明 -->
    <section class="type-section">
      <h3>📖 属性值说明</h3>
      <div class="type-grid">
        <div v-for="type in containTypes" :key="type.value" class="type-card">
          <h4>{{ type.label }}</h4>
          <code>{{ type.value }}</code>
          <p>{{ type.description }}</p>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h3>⚠️ 注意事项</h3>
      <ul>
        <li>合理选择contain类型，过度使用可能适得其反</li>
        <li>使用`size`时需要明确指定元素尺寸</li>
        <li>注意浏览器兼容性（现代浏览器支持良好）</li>
        <li>结合`content-visibility`使用效果更佳</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedContain = ref('none');
const elementCount = ref(50);
const enableAnimation = ref(false);

const containTypes = [
  {
    value: 'none',
    label: '默认',
    description: '无contain效果'
  },
  {
    value: 'layout',
    label: '布局隔离',
    description: '隔离布局影响，防止元素外布局变化'
  },
  {
    value: 'paint',
    label: '绘制隔离',
    description: '限制子元素绘制到元素边界外'
  },
  {
    value: 'size',
    label: '尺寸隔离',
    description: '元素尺寸不受子元素影响，需指定明确尺寸'
  },
  {
    value: 'content',
    label: '内容隔离',
    description: '等效于同时开启layout和paint'
  },
  {
    value: 'strict',
    label: '严格模式',
    description: '等效于同时开启layout、paint和size'
  }
];

const addElement = () => {
  elementCount.value += 10;
};

const resetElements = () => {
  elementCount.value = 50;
};
</script>

<style lang="less">
@primary-color: #2c3e50;
@secondary-color: #42b983;
@warning-color: #e74c3c;

.contain-demo {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Segoe UI', system-ui;

  section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .intro-section {
    h2 {
      color: @primary-color;
      border-bottom: 3px solid @secondary-color;
      padding-bottom: 0.8rem;
    }

    .description {
      padding: 1rem 0;
      line-height: 1.6;

      p {
        margin: 0.8rem 0;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 6px;
      }
    }
  }

  .control-section {
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;

      .control-group {
        display: flex;
        align-items: center;
        gap: 0.8rem;

        select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          min-width: 200px;
        }

        button {
          padding: 0.6rem 1.2rem;
          background: @secondary-color;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s;

          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  }

  .demo-section {
    .demo-container {
      position: relative;
      height: 400px;
      border: 2px dashed #ddd;
      border-radius: 8px;
      padding: 1rem;
      overflow: auto;
      margin-bottom: 1.5rem;

      &.with-animation .demo-element {
        animation: scale 1.5s infinite alternate;
      }

      .demo-element {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: @secondary-color;
        margin: 5px;
        border-radius: 4px;
        opacity: 0.8;
      }
    }

    .code-display {
      background: #282c34;
      color: #abb2bf;
      padding: 1rem;
      border-radius: 8px;
      font-family: 'Fira Code', monospace;

      .highlight {
        color: #e06c75;
        font-weight: bold;
      }
    }
  }

  .type-section {
    .type-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;

      .type-card {
        padding: 1.2rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid @secondary-color;

        h4 {
          margin: 0 0 0.8rem;
          color: @primary-color;
        }

        code {
          display: block;
          margin-bottom: 0.8rem;
          color: @secondary-color;
          font-weight: bold;
        }
      }
    }
  }

  .notice-section {
    background: #fff9f9;
    border: 2px solid @warning-color;

    ul {
      padding-left: 1.5rem;

      li {
        margin: 0.8rem 0;
        padding-left: 0.5rem;
        border-left: 3px solid @warning-color;
      }
    }
  }
}

@keyframes scale {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.2);
  }
}
</style>
