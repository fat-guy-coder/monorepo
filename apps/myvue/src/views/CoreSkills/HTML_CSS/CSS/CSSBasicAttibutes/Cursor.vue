<template>
  <div class="cursor-guide">
    <h1 class="main-title">CSS Cursor 交互指南</h1>

    <!-- 基础介绍 -->
    <section class="intro-section">
      <h2 class="section-title">🖱️ 光标属性</h2>
      <div class="content-card">
        <p class="highlight-text">cursor属性控制鼠标悬停时的指针样式，用于增强交互可视化反馈</p>
        <p class="sub-text">浏览器支持超过40种光标类型，可分为6大类：</p>
        <div class="category-grid">
          <div v-for="cate in categories" :key="cate.name" class="category-card">
            <span class="cate-icon">{{ cate.icon }}</span>
            <h3>{{ cate.name }}</h3>
            <p>{{ cate.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 属性值列表 -->
    <section class="cursor-list-section">
      <h2 class="section-title">📋 属性值全览</h2>
      <div class="cursor-grid">
        <div v-for="item in cursorItems" :key="item.value" class="cursor-item" :style="{ cursor: item.value }"
          @mouseenter="currentCursor = item.value">
          <div class="cursor-header">
            <span class="cursor-value">{{ item.value }}</span>
            <span class="cursor-demo">当前样式 →</span>
          </div>
          <p class="cursor-desc">{{ item.description }}</p>
          <div class="usage-scene">
            <span class="scene-label">适用场景：</span>
            {{ item.scene }}
          </div>
        </div>
      </div>
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/cursor" target="_blank">
        更多光标类型参考 MDN
      </a>
    </section>

    <!-- 实时预览 -->
    <section class="preview-section">
      <h2 class="section-title">👀 实时预览</h2>
      <div class="preview-card">
        <div class="preview-box" :style="{ cursor: currentCursor }">
          当前光标：{{ currentCursor }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const categories = reactive([
  {
    name: '基础交互',
    icon: '🖱️',
    desc: '默认/指针/文本等基本类型'
  },
  {
    name: '方向指示',
    icon: '↔️',
    desc: '表示可调整大小的双向箭头'
  },
  {
    name: '操作状态',
    icon: '⏳',
    desc: '等待/进度/不可用等状态'
  },
  {
    name: '滚动控制',
    icon: '🖱️',
    desc: '滚动相关的手形光标'
  }
])

const cursorItems = reactive([
  {
    value: 'default',
    description: '默认箭头光标',
    scene: '常规元素默认状态'
  },
  {
    value: 'pointer',
    description: '手形点击光标',
    scene: '可点击元素如按钮/链接'
  },
  {
    value: 'text',
    description: '文本输入光标',
    scene: '可编辑文本区域'
  },
  {
    value: 'wait',
    description: '等待状态',
    scene: '系统繁忙/加载中'
  },
  {
    value: 'help',
    description: '帮助指示',
    scene: '有说明信息的元素'
  },
  {
    value: 'not-allowed',
    description: '禁止操作',
    scene: '禁用状态按钮/控件'
  },
  {
    value: 'zoom-in',
    description: '放大操作',
    scene: '图片查看器放大功能'
  },
  {
    value: 'grab',
    description: '可抓取状态',
    scene: '可拖拽元素'
  },
  {
    value: 'grabbing',
    description: '正在抓取状态',
    scene: '拖拽中'
  },
  {
    value: 'crosshair',
    description: '十字线光标',
    scene: '精确坐标点'
  },
  {
    value: 'vertical-text',
    description: '垂直文本光标',
    scene: '需要垂直文本输入的场景'
  },
  {
    value: 'alias',
    description: '别名光标',
    scene: '文件/文件夹'
  },
  {
    value: 'copy',
    description: '复制光标',
    scene: '可复制元素'
  },
  {
    value: 'move',
    description: '移动光标',
    scene: '可移动元素'
  },
  {
    value: 'cell',
    description: '单元格光标',
    scene: '表格单元格'
  },
  {
    value: 'col-resize',
    description: '列调整光标',
    scene: '表格列调整'
  },
  {
    value: 'row-resize',
    description: '行调整光标',
    scene: '表格行调整'
  },
  {
    value: 'all-scroll',
    description: '全屏滚动光标',
    scene: '需要全屏滚动的场景'
  }
])

const currentCursor = ref('default')
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@accent-blue: #3498db;
@accent-purple: #9b59b6;
@background-light: #f8f9fa;

.cursor-guide {
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
      background: linear-gradient(to right, @accent-blue, @accent-purple);
      margin: 1rem auto;
    }
  }

  .section-title {
    color: @accent-purple;
    margin: 2.5rem 0 1.5rem;
    font-size: 1.8rem;
    border-left: 4px solid @accent-blue;
    padding-left: 1rem;
  }

  .category-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-top: 2rem;

    .category-card {
      padding: 1.5rem;
      background: @background-light;
      border-radius: 8px;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .cate-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 1rem;
      }
    }
  }

  .cursor-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .cursor-item {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;

    &:hover {
      border-color: @accent-blue;
      box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
    }

    .cursor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .cursor-value {
        color: @accent-purple;
        font-family: 'Fira Code', monospace;
      }

      .cursor-demo {
        color: #7f8c8d;
        font-size: 0.9em;
      }
    }

    .usage-scene {
      margin-top: 1rem;
      padding: 0.8rem;
      background: lighten(@accent-blue, 40%);
      border-radius: 4px;
      font-size: 0.9em;

      .scene-label {
        color: @accent-blue;
        font-weight: 500;
      }
    }
  }

  .preview-card {
    .preview-box {
      height: 120px;
      background: @background-light;
      border-radius: 8px;
      display: grid;
      place-items: center;
      font-size: 1.2rem;
      color: @accent-purple;
      border: 2px dashed @accent-blue;
    }
  }
}
</style>