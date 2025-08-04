<template>
  <div class="date-guide">
    <!-- 导航区 -->
    <nav class="guide-nav">
      <h1>📅 JavaScript Date 基本指南</h1>
      <div class="nav-links">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`" @click.prevent="scrollTo(section.id)"
          class="nav-link">
          {{ section.title }}
        </a>
      </div>
    </nav>

    <!-- 内容区 -->
    <main class="guide-content">
      <!-- 基础用法 -->
      <section id="basic" class="content-section">
        <h2>📌 基础用法</h2>
        <div class="method-grid">
          <div class="method-card">
            <h3>创建日期对象</h3>
            <div class="code-compare">
              <pre><code class="language-ts">// 当前时间
const now = new Date();

// 指定时间
const date1 = new Date(2024, 0, 15); // 月份从0开始
const date2 = new Date("2024-01-15T08:30:00");</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 实例方法 -->
      <section id="methods" class="content-section">
        <h2>🛠️ 核心方法</h2>
        <div class="method-table">
          <table>
            <thead>
              <tr>
                <th>方法类别</th>
                <th>方法名称</th>
                <th>示例</th>
                <th>返回值</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="method in dateMethods" :key="method.name">
                <td>{{ method.category }}</td>
                <td><code>{{ method.name }}</code></td>
                <td><code>{{ method.example }}</code></td>
                <td>{{ method.return }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 使用示例 -->
      <section id="example" class="content-section">
        <h2>🎯 应用示例</h2>
        <div class="example-grid">
          <div class="example-card">
            <h3>日期格式化</h3>
            <pre><code class="language-ts">function formatDate(date: Date): string {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0')
  ].join('-');
}</code></pre>
          </div>

          <div class="example-card">
            <h3>倒计时组件</h3>
            <pre><code class="language-html">&lt;script setup lang="ts"&gt;
const targetDate = new Date(2024, 11, 31);
const [days, hours, minutes, seconds] = useCountdown(targetDate);
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="countdown"&gt;
    { days }天 { hours }:{ minutes }:{ seconds }
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section id="notice" class="content-section">
        <h2>⚠️ 注意事项</h2>
        <div class="notice-grid">
          <div class="notice-card" v-for="(note, index) in notices" :key="index">
            <div class="notice-icon">{{ note.icon }}</div>
            <div>
              <h3>{{ note.title }}</h3>
              <p>{{ note.content }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sections = ref([
  { id: 'basic', title: '基础用法' },
  { id: 'methods', title: '核心方法' },
  { id: 'example', title: '应用示例' },
  { id: 'notice', title: '注意事项' }
]);

const dateMethods = ref([
  {
    category: '获取日期',
    name: 'getFullYear()',
    example: 'new Date().getFullYear()',
    return: '2024'
  },
  {
    category: '获取日期',
    name: 'getMonth()',
    example: 'new Date().getMonth()',
    return: '0 (1月) - 11 (12月)'
  },
  {
    category: '设置时间',
    name: 'setHours(hours, min?, sec?, ms?)',
    example: 'date.setHours(8, 30)',
    return: '更新时间戳'
  },
  {
    category: '格式化',
    name: 'toLocaleDateString()',
    example: 'date.toLocaleDateString("zh-CN")',
    return: '"2024/1/15"'
  },
  {
    category: '获取日期',
    name: 'getDate()',
    example: 'new Date().getDate()',
    return: '1 - 31'
  },
  {
    category: '获取日期',
    name: 'getDay()',
    example: 'new Date().getDay()',
    return: '0 (周日) - 6 (周六)'
  },
  {
    category: '设置日期',
    name: 'setDate(date)',
    example: 'date.setDate(15)',
    return: '更新时间戳'
  },
  {
    category: '格式化',
    name: 'toISOString()',
    example: 'date.toISOString()',
    return: '"2024-01-15T08:30:00.000Z"'
  }
]);



const notices = ref([
  {
    icon: '🌍',
    title: '时区问题',
    content: '注意本地时间与UTC时间的差异，建议使用ISO 8601格式'
  },
  {
    icon: '📆',
    title: '月份陷阱',
    content: 'getMonth()返回0-11，需要+1显示实际月份'
  },
  {
    icon: '⏳',
    title: '性能优化',
    content: '避免在循环中频繁创建Date对象'
  },
  {
    icon: '🔄',
    title: '不可变性',
    content: 'Date对象是可变的，修改会影响原实例'
  }
]);

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
</script>

<style scoped lang="less">
.date-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.guide-nav {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 1.5rem;
    font-size: 2rem;
    text-align: center;
  }

  .nav-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  scroll-margin-top: 1rem;

  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    border-left: 4px solid #3498db;
    padding-left: 1rem;
    margin: 2rem 0;
  }
}

.method-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      border: 1px solid #eee;
      text-align: left;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
    }

    code {
      background: #f3f3f3;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Fira Code', monospace;
    }
  }
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;

  h3 {
    margin: 0;
    padding: 1rem;
    background: #e9ecef;
    font-size: 1.1rem;
  }

  pre {
    margin: 0;
    padding: 1rem;
    font-size: 0.9rem;
  }
}

.notice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.notice-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .notice-icon {
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #2c3e50;
  }

  p {
    margin: 0;
    color: #666;
    line-height: 1.6;
  }
}

@media (max-width: 768px) {
  .date-guide {
    padding: 1rem;
  }

  .method-table {
    font-size: 0.9rem;
  }
}

pre code {
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
  color: #2c3e50;
}
</style>
