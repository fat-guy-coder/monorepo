<template>
  <div class="html-guide-container">
    <h1 class="main-title">HTML 超文本标记语言指南</h1>

    <!-- 核心介绍 -->
    <section class="intro-section">
      <div class="definition-card">
        <h2 class="section-title">🎯 HTML 定义</h2>
        <p class="content-text">
          HTML（HyperText Markup Language）是用于创建网页的标准标记语言，它通过标签定义文档结构和内容。
          <span class="highlight">核心功能：</span>
        </p>
        <ul class="feature-list">
          <li>定义网页内容结构</li>
          <li>嵌入多媒体资源</li>
          <li>建立超文本链接</li>
          <li>语义化内容标记</li>
        </ul>
      </div>
    </section>

    <!-- 发展历史 -->
    <section class="history-section">
      <h2 class="section-title">🕰️ 发展历程</h2>
      <div class="timeline">
        <div v-for="(item, index) in historyItems" :key="index" class="timeline-item"
          :class="{ 'left-align': index % 2 === 0 }">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3>{{ item.year }} - {{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="usage-section">
      <h2 class="section-title">💡 主要应用场景</h2>
      <div class="usage-grid">
        <div v-for="(usage, index) in usageScenarios" :key="index" class="usage-card">
          <div class="usage-icon">{{ usage.icon }}</div>
          <h3>{{ usage.title }}</h3>
          <p>{{ usage.description }}</p>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h2 class="section-title">⚠️ 开发注意事项</h2>
      <div class="notice-list">
        <div v-for="(notice, index) in notices" :key="index" class="notice-item" :class="notice.type">
          <div class="notice-icon">
            {{ notice.type === 'warning' ? '❗' : '💡' }}
          </div>
          <div class="notice-content">
            <h3>{{ notice.title }}</h3>
            <p>{{ notice.content }}</p>
            <p>{{ notice.reason }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 基础示例 -->
    <section class="code-section">
      <h2 class="section-title">📝 基础HTML结构</h2>
      <pre class="code-sample">
&lt;!DOCTYPE html&gt;
&lt;html lang="zh-CN"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;页面标题&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;我的第一个网页&lt;/h1&gt;
  &lt;p&gt;欢迎来到HTML世界&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface HistoryItem {
  year: string;
  title: string;
  description: string;
}

interface UsageScenario {
  icon: string;
  title: string;
  description: string;
}

interface Notice {
  type: 'warning' | 'tip';
  title: string;
  content: string;
  reason: string
}

const historyItems = ref<HistoryItem[]>([
  {
    year: "1991",
    title: "HTML诞生",
    description: "Tim Berners-Lee创建HTML 1.0规范"
  },
  {
    year: "1995",
    title: "HTML 2.0",
    description: "成为第一个官方标准"
  },
  {
    year: "1997",
    title: "HTML 3.2",
    description: "W3C推荐标准，增加表格和表单"
  },
  {
    year: "2014",
    title: "HTML5",
    description: "现代Web开发基石，新增语义化标签"
  }
]);

const usageScenarios = ref<UsageScenario[]>([
  {
    icon: "🌐",
    title: "网页开发",
    description: "构建网页内容结构和基础布局"
  },
  {
    icon: "📱",
    title: "移动应用",
    description: "Hybrid App的界面开发基础"
  },
  {
    icon: "📧",
    title: "电子邮件",
    description: "构建响应式邮件模板"
  }
]);

const notices = ref<Notice[]>([
  {
    type: "warning",
    title: "语义化标签",
    content: "避免滥用div，合理使用header/nav/main等语义标签",
    reason: "语义化标签可以提高代码可读性，便于搜索引擎优化，并有助于无障碍访问"
  },
  {
    type: "tip",
    title: "可访问性",
    content: "始终为图片添加alt属性，使用ARIA标签",
    reason: "为图片添加alt属性可以提高可访问性，使用ARIA标签可以增强交互体验"
  },
  {
    type: "warning",
    title: "标签嵌套",
    content: "禁止块级元素嵌套行内元素（如div包裹span）",
    reason: "块级元素嵌套行内元素会导致布局混乱，影响页面美观和可读性"
  }
]);
</script>

<style lang="less" scoped>
.html-guide-container {
  max-width: 1000px;
  margin: 1rem auto;
  padding: 20px;
  font-family: 'Segoe UI', system-ui;

  .main-title {
    color: #2c3e50;
    text-align: center;
    font-size: 2.4rem;
  }

  .section-title {
    color: #34495e;
    border-left: 4px solid #42b983;
    padding-left: 1rem;
    margin: 3rem 0 2rem;
    font-size: 1.6rem;
  }

  .definition-card {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 0.5rem;

    .highlight {
      color: #e74c3c;
      font-weight: 600;
    }

    .feature-list {
      columns: 2;
      line-height: 1.8;
      color: #7f8c8d;
      padding-left: 1.5rem;

      li {
        margin: 1rem 0;
      }
    }
  }

  .timeline {
    position: relative;
    padding-left: 30px;
    margin-left: 20px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background: #42b983;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 2rem;
      padding-left: 30px;

      .timeline-marker {
        position: absolute;
        left: -8px;
        top: 5px;
        width: 16px;
        height: 16px;
        background: #fff;
        border: 3px solid #42b983;
        border-radius: 50%;
      }

      .timeline-content {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        h3 {
          color: #2c3e50;
          margin: 0 0 0.5rem;
        }

        p {
          color: #7f8c8d;
          line-height: 1.6;
        }
      }
    }
  }

  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .usage-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      transition: transform 0.3s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-5px);
      }

      .usage-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        color: #2c3e50;
        margin: 0.5rem 0;
      }
    }
  }

  .notice-list {
    .notice-item {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1rem 0;

      &.warning {
        background: #fdecea;
        border-left: 4px solid #e74c3c;
      }

      &.tip {
        background: #e8f4fc;
        border-left: 4px solid #3498db;
      }

      .notice-icon {
        font-size: 1.5rem;
      }

      h3 {
        color: #2c3e50;
        margin: 0 0 0.5rem;
      }
    }
  }

  .code-sample {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
  }
}
</style>