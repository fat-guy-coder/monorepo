<template>
  <div class="optional-catch-guide">
    <h1 class="main-title">ES 可选Catch基本介绍</h1>

    <!-- 基础介绍 -->
    <section class="intro-section">
      <h2 class="section-title">🔍 什么是可选Catch？</h2>
      <div class="comparison-card">
        <div class="content-card">
          <p class="highlight-text">
            可选Catch允许在<code>try...catch</code>语句中省略catch参数，简化不需要错误对象的错误处理场景
          </p>
          <div class="code-comparison">
            <div class="traditional">
              <h3>传统写法</h3>
              <pre><code>try {
  riskyOperation();
} catch (e) {  // 必须声明e
  console.log('操作失败');
}</code></pre>
            </div>
            <div class="optional">
              <h3>可选Catch写法</h3>
              <pre><code>try {
  riskyOperation();
} catch {  // 省略参数
  console.log('操作失败');
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用示例 -->
    <section class="usage-section">
      <h2 class="section-title">💡 核心用法</h2>
      <div class="code-grid">
        <div class="code-card" v-for="(example, index) in codeExamples" :key="index">
          <div class="card-header">
            <span class="example-icon">📌</span>
            <h3>{{ example.title }}</h3>
          </div>
          <pre><code>{{ example.code }}</code></pre>
          <p class="code-desc">{{ example.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="scenario-section">
      <h2 class="section-title">🌐 使用场景</h2>
      <div class="scenario-grid">
        <div class="scenario-card" v-for="(scene, index) in scenarios" :key="index">
          <div class="scene-icon">{{ scene.icon }}</div>
          <h3>{{ scene.title }}</h3>
          <p>{{ scene.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="notice-card">
        <ul>
          <li v-for="(note, index) in notices" :key="index">
            <span class="warning-icon">❗</span>{{ note }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const codeExamples = reactive([
  {
    title: '基础用法',
    code: `try {
  JSON.parse(invalidJson);
} catch {
  console.error('解析失败');
}`,
    desc: '不需要错误详细信息时简化代码'
  },
  {
    title: '资源清理',
    code: `let resource = acquireResource();
try {
  useResource(resource);
} catch {
  handleFailure();
} finally {
  releaseResource(resource);
}`,
    desc: '配合finally进行资源清理'
  },
  {
    title: '异步操作',
    code: `async function fetchData() {
  try {
    await fetch('/api');
  } catch {
    showNetworkError();
  }
}`,
    desc: '处理异步操作中的通用错误'
  }
])

const scenarios = reactive([
  {
    icon: '🛡️',
    title: '错误日志记录',
    desc: '只需要记录错误发生不需要具体信息'
  },
  {
    icon: '⚡',
    title: '性能敏感场景',
    desc: '避免创建不必要的错误对象'
  },
  {
    icon: '📦',
    title: '第三方库封装',
    desc: '隐藏底层错误细节暴露通用错误'
  }
])

const notices = reactive([
  '无法获取错误对象的具体信息（栈跟踪、错误类型等）',
  'TypeScript需要4.0+版本支持该语法',
  '不兼容IE等旧浏览器（需要Babel转换）',
  '不能与常规catch(e)混合使用'
])
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@accent-blue: #3498db;
@warning-color: #e67e22;

.optional-catch-guide {
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
      background: linear-gradient(to right, @accent-blue, @warning-color);
      margin: 1rem auto;
    }
  }

  .section-title {
    color: @accent-blue;
    margin: 2rem 0 1.5rem;
    font-size: 1.8rem;
    border-left: 4px solid @warning-color;
    padding-left: 1rem;
  }

  .comparison-card {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .code-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 1.5rem;

      pre {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
      }
    }
  }

  .code-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .code-card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      .example-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
      }
    }

    pre {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }

    .code-desc {
      color: #666;
      margin-top: 1rem;
    }
  }

  .scenario-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    .scenario-card {
      background: #fff;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .scene-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }
  }

  .notice-card {
    background: #fff3e0;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid @warning-color;

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;

        .warning-icon {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
