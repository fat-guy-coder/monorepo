<template>
  <div class="date-container">
    <!-- 标题部分 -->
    <header class="header">
      <h1>📅 JavaScript Date 对象基本介绍</h1>
    </header>

    <h2>Date 对象用于处理日期和时间</h2>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 对象概览 -->
      <section class="overview-section">
        <h2 class="section-title">
          <span class="icon">📖</span>
          对象概览
        </h2>
        <div class="overview-grid">
          <div class="overview-card">
            <h3>创建日期对象</h3>
            <pre class="code-sample">// 当前时间
new Date();

// 指定时间戳
new Date(1672531200000);

// 日期字符串
new Date('2023-01-01');

// 指定年月日
new Date(2023, 0, 1);</pre>
          </div>
          <div class="overview-card">
            <h3>存储原理</h3>
            <ul class="principle-list">
              <li>存储自1970-01-01 00:00:00 UTC的毫秒数</li>
              <li>内部使用UTC时间存储</li>
              <li>本地时间根据时区转换</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 实例方法 -->
      <section class="method-section">
        <h2 class="section-title">
          <span class="icon">🛠️</span>
          实例方法
        </h2>
        <div class="method-grid">
          <div v-for="(group, index) in methodGroups" :key="index" class="method-group">
            <h3 class="group-title">{{ group.title }}</h3>
            <div class="method-list">
              <div v-for="(method, mIndex) in group.methods" :key="mIndex" class="method-card">
                <div class="method-header">
                  <span class="method-name">{{ method.name }}</span>
                  <span class="method-returns">→ {{ method.returns }}</span>
                </div>
                <p class="method-desc">{{ method.description }}</p>
                <pre class="code-sample">{{ method.example }}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <div class="notice-section">
        <h3>⚠️ 注意事项</h3>
        <ul>
          <li>月份从0开始（0=1月，11=12月）</li>
          <li>星期从0开始（0=周日，6=周六）</li>
          <li>夏令时可能影响计算结果</li>
          <li>推荐使用UTC方法处理跨时区应用</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface MethodGroup {
  title: string;
  methods: MethodItem[];
}

interface MethodItem {
  name: string;
  returns: string;
  description: string;
  example: string;
}

const methodGroups = ref<MethodGroup[]>([
  {
    title: "获取时间分量",
    methods: [
      {
        name: "getFullYear()",
        returns: "number",
        description: "获取四位年份（本地时区）",
        example: "new Date().getFullYear() // 2023"
      },
      {
        name: "getMonth()",
        returns: "number",
        description: "获取月份（0-11）",
        example: "new Date().getMonth() // 0（一月）"
      },
      {
        name: "getDate()",
        returns: "number",
        description: "获取当月第几天（1-31）",
        example: "new Date().getDate() // 15"
      }
    ]
  },
  {
    title: "UTC时间方法",
    methods: [
      {
        name: "getUTCFullYear()",
        returns: "number",
        description: "获取UTC四位年份",
        example: "new Date().getUTCFullYear()"
      },
      {
        name: "getUTCHours()",
        returns: "number",
        description: "获取UTC小时（0-23）",
        example: "new Date().getUTCHours()"
      },
      {
        name: "getUTCMinutes()",
        returns: "number",
        description: "获取UTC分钟（0-59）",
        example: "new Date().getUTCMinutes()"
      }
    ]
  },
  {
    title: "设置时间",
    methods: [
      {
        name: "setFullYear(year)",
        returns: "number",
        description: "设置四位年份（返回时间戳）",
        example: "date.setFullYear(2024)"
      },
      {
        name: "setMonth(month)",
        returns: "number",
        description: "设置月份（0-11）",
        example: "date.setMonth(11) // 十二月"
      },
      {
        name: "setDate(day)",
        returns: "number",
        description: "设置当月第几天",
        example: "date.setDate(25)"
      }
    ]
  },
  {
    title: "转换方法",
    methods: [
      {
        name: "toString()",
        returns: "string",
        description: "返回完整日期时间字符串",
        example: "Sat Jan 01 2023 00:00:00 GMT+0800"
      },
      {
        name: "toISOString()",
        returns: "string",
        description: "返回ISO 8601格式字符串",
        example: "2023-01-01T16:00:00.000Z"
      },
      {
        name: "toLocaleString()",
        returns: "string",
        description: "返回本地格式字符串",
        example: "2023/1/1 00:00:00"
      }
    ]
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #2196f3;
@text-color: #2c3e50;
@code-bg: #2c3e50;

.date-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);

  .header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      color: @text-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: lighten(@text-color, 30%);
      font-size: 1.1rem;
    }
  }

  .overview-section {
    margin-bottom: 3rem;

    .overview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;

      .overview-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

        .principle-list {
          list-style: none;
          padding-left: 1rem;

          li {
            padding: 0.3rem 0;
            position: relative;

            &::before {
              content: "•";
              color: @primary-color;
              position: absolute;
              left: -1rem;
            }
          }
        }

        .code-sample {
          background: @code-bg;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Fira Code', monospace;
          white-space: pre-wrap;
        }
      }
    }
  }

  .method-section {
    .method-grid {
      display: grid;
      gap: 2rem;

      .method-group {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

        .group-title {
          color: @primary-color;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #eee;
        }

        .method-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;

          .method-card {
            padding: 1rem;
            background: lighten(@primary-color, 45%);
            border-radius: 8px;

            .method-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 0.5rem;

              .method-name {
                font-family: 'Fira Code', monospace;
                color: @primary-color;
              }

              .method-returns {
                color: #666;
                font-size: 0.9em;
              }
            }

            .code-sample {
              background: darken(@primary-color, 35%);
              color: white;
              padding: 0.5rem;
              border-radius: 4px;
              font-family: 'Fira Code', monospace;
              margin-top: 0.5rem;
            }
          }
        }
      }
    }
  }

  .notice-section {
    background: #fff3e0;
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 2rem;

    ul {
      list-style: none;
      padding-left: 1rem;

      li {
        padding: 0.5rem 0;
        position: relative;

        &::before {
          content: "•";
          color: @primary-color;
          position: absolute;
          left: -1rem;
        }
      }
    }
  }
}
</style>