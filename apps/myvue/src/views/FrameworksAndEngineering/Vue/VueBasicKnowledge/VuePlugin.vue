<template>
  <div class="plugin-guide">
    <header class="header">
      <h1><code class="highlight">Vue</code> 插件指南</h1>
      <p class="subtitle">扩展Vue应用功能的强大工具</p>
    </header>

    <div class="content-container">
      <section class="card intro-section">
        <div class="icon-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z">
            </path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
          </svg>
          <h2>什么是Vue插件？</h2>
        </div>
        <p>Vue插件是用于扩展Vue功能的可重用代码，通常用于全局级别的功能增强。它们可以为Vue添加：</p>
        <ul class="feature-list">
          <li>全局方法或属性</li>
          <li>全局资源（指令/过滤器/过渡等）</li>
          <li>全局混入选项</li>
          <li>添加实例方法</li>
          <li>提供自己的API</li>
        </ul>
      </section>

      <div class="comparison-grid">
        <section class="card">
          <div class="icon-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <rect x="7" y="7" width="3" height="9"></rect>
              <rect x="14" y="7" width="3" height="5"></rect>
            </svg>
            <h2>插件 vs 组件</h2>
          </div>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>特性</th>
                <th>插件 (Plugin)</th>
                <th>组件 (Component)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>作用范围</td>
                <td>全局级别</td>
                <td>局部或全局注册</td>
              </tr>
              <tr>
                <td>主要用途</td>
                <td>添加全局功能</td>
                <td>构建UI和交互</td>
              </tr>
              <tr>
                <td>生命周期</td>
                <td>在应用启动时安装</td>
                <td>在模板中使用时创建</td>
              </tr>
              <tr>
                <td>注册方式</td>
                <td>使用 <code>app.use()</code></td>
                <td>使用 <code>app.component()</code> 或局部导入</td>
              </tr>
              <tr>
                <td>典型示例</td>
                <td>Vue Router, Vuex, UI库</td>
                <td>按钮, 表单, 卡片等UI元素</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="card">
          <div class="icon-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
              <path d="m15 5 4 4"></path>
            </svg>
            <h2>实现一个插件</h2>
          </div>
          <div class="code-block">
            <pre><code>// 示例：自定义通知插件
import type { App } from 'vue'

const NotificationPlugin = {
  install(app: App, options: any) {
    // 添加全局方法
    app.config.globalProperties.$notify = {
      show(message: string, type = 'info') {
        // 实现通知逻辑
        console.log(`[${type}] ${message}`)
      }
    }

    // 添加全局指令
    app.directive('highlight', {
      mounted(el, binding) {
        el.style.backgroundColor = binding.value || 'yellow'
      }
    })

    // 注入全局属性
    app.provide('notification', options)
  }
}

// 使用插件
createApp(App)
  .use(NotificationPlugin, { timeout: 3000 })
  .mount('#app')</code></pre>
          </div>
        </section>
      </div>

      <section class="card">
        <div class="icon-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <h2>常见插件类型</h2>
        </div>
        <div class="plugin-grid">
          <div class="plugin-card">
            <div class="plugin-icon router-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="8" rx="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2"></rect>
                <line x1="6" y1="8" x2="6" y2="8"></line>
                <line x1="6" y1="18" x2="6" y2="18"></line>
              </svg>
            </div>
            <h3>路由插件</h3>
            <p>Vue Router处理SPA导航</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-icon state-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <h3>状态管理</h3>
            <p>Vuex/Pinia管理全局状态</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-icon ui-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3>UI组件库</h3>
            <p>Element Plus, Vuetify等</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-icon util-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>工具类</h3>
            <p>日期处理、HTTP请求等</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>© 2023 Vue插件指南 | 使用Vue3 + TypeScript + Setup语法</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 用于示例的响应式数据
const pluginCount = ref(4)
const vueVersion = ref('3.2+')
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.plugin-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  background-color: #f9fafb;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  border-radius: 12px;
  color: white;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 10px;

    .highlight {
      background: rgba(255, 255, 255, 0.2);
      padding: 0 12px;
      border-radius: 8px;
      font-weight: 800;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content-container {
  display: grid;
  gap: 25px;
  margin-bottom: 40px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }
}

.icon-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;

  svg {
    color: #42b883;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
  }
}

.feature-list {
  padding-left: 25px;

  li {
    margin-bottom: 12px;
    line-height: 1.6;
    position: relative;

    &::before {
      content: "•";
      color: #42b883;
      font-weight: bold;
      position: absolute;
      left: -20px;
    }
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 14px 16px;
    text-align: left;
  }

  thead {
    background-color: #f0f7ff;

    th {
      font-weight: 600;
      color: #2c3e50;
      border-bottom: 2px solid #e1e8ef;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #edf2f7;

      &:nth-child(even) {
        background-color: #f9fbfd;
      }

      &:hover {
        background-color: #f0f7ff;
      }
    }

    td:first-child {
      font-weight: 500;
    }
  }

  code {
    background: #e7f8f1;
    color: #0d7e59;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
  }
}

.code-block {
  background: #2d3748;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 15px;

  pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #cbd5e0;

      .token {
        &.function {
          color: #63b3ed;
        }

        &.keyword {
          color: #f6ad55;
        }

        &.string {
          color: #68d391;
        }

        &.comment {
          color: #a0aec0;
        }

        &.punctuation {
          color: #cbd5e0;
        }
      }
    }
  }
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.plugin-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #42b883;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(66, 184, 131, 0.15);
  }

  h3 {
    margin: 15px 0 10px;
    color: #2c3e50;
    font-size: 1.2rem;
  }

  p {
    color: #4a5568;
    font-size: 0.95rem;
    margin: 0;
  }
}

.plugin-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin: 0 auto;

  svg {
    width: 28px;
    height: 28px;
  }

  &.router-icon {
    background: rgba(66, 153, 225, 0.1);
    color: #4299e1;
  }

  &.state-icon {
    background: rgba(237, 137, 54, 0.1);
    color: #ed8936;
  }

  &.ui-icon {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
  }

  &.util-icon {
    background: rgba(72, 187, 120, 0.1);
    color: #48bb78;
  }
}

.footer {
  text-align: center;
  padding: 25px 0;
  margin-top: 40px;
  color: #718096;
  font-size: 0.9rem;
  border-top: 1px solid #e2e8f0;
}
</style>
