<template>
  <div class="error-handling-container">
    <header class="header">
      <h1>Vue项目错误处理</h1>
      <p class="subtitle">构建健壮、用户友好的Vue应用程序</p>
      <div class="decoration">
        <div class="circle red"></div>
        <div class="circle yellow"></div>
        <div class="circle green"></div>
      </div>
    </header>

    <main class="content">
      <section class="overview-section">
        <div class="section-header">
          <i class="icon fas fa-exclamation-triangle"></i>
          <h2>为什么需要错误处理？</h2>
        </div>
        <div class="card">
          <div class="reasons">
            <div class="reason">
              <div class="reason-icon">
                <i class="fas fa-user-shield"></i>
              </div>
              <h3>提升用户体验</h3>
              <p>避免应用崩溃，提供友好的错误提示</p>
            </div>
            <div class="reason">
              <div class="reason-icon">
                <i class="fas fa-bug"></i>
              </div>
              <h3>快速定位问题</h3>
              <p>记录错误信息，加速调试过程</p>
            </div>
            <div class="reason">
              <div class="reason-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3>提高应用稳定性</h3>
              <p>防止局部错误影响整体功能</p>
            </div>
            <div class="reason">
              <div class="reason-icon">
                <i class="fas fa-server"></i>
              </div>
              <h3>监控与警报</h3>
              <p>及时发现生产环境中的问题</p>
            </div>
          </div>

          <div class="error-impact">
            <h3>未处理错误的影响：</h3>
            <ul>
              <li><i class="fas fa-times-circle red"></i> 应用崩溃或白屏</li>
              <li><i class="fas fa-times-circle red"></i> 糟糕的用户体验</li>
              <li><i class="fas fa-times-circle red"></i> 数据丢失或损坏</li>
              <li><i class="fas fa-times-circle red"></i> 调试困难</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="methods-section">
        <div class="section-header">
          <i class="icon fas fa-tools"></i>
          <h2>Vue错误处理方法</h2>
        </div>

        <div class="methods-tabs">
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <div v-show="activeTab === 0" class="method">
              <h3>全局错误处理器</h3>
              <p>捕获所有未处理的Vue错误和组件渲染错误</p>

              <div class="code-block">
                <pre><code>// main.ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 全局错误处理器
app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err)
  console.log('发生错误的组件:', vm)
  console.log('错误信息:', info)

  // 发送错误到监控服务
  logErrorToService(err, vm, info)

  // 显示用户友好的错误提示
  showErrorNotification('应用发生错误，请稍后再试')
}

app.mount('#app')</code></pre>
              </div>

              <div class="use-case">
                <h4><i class="fas fa-check-circle"></i> 使用场景：</h4>
                <ul>
                  <li>应用级错误处理</li>
                  <li>最后一道错误防线</li>
                  <li>错误日志收集</li>
                </ul>
              </div>
            </div>

            <div v-show="activeTab === 1" class="method">
              <h3>errorCaptured 生命周期钩子</h3>
              <p>捕获子组件树中的错误，可以阻止错误向上传播</p>

              <div class="code-block">
                <pre><code>// ParentComponent.vue
import { defineComponent } from 'vue'

export default defineComponent({
  errorCaptured(err, vm, info) {
    // 处理错误
    console.error('捕获到子组件错误:', err)

    // 阻止错误继续向上传播
    return false

    // 返回true允许错误继续向上传播
  }
})</code></pre>
              </div>

              <div class="use-case">
                <h4><i class="fas fa-check-circle"></i> 使用场景：</h4>
                <ul>
                  <li>组件级错误边界</li>
                  <li>隔离组件错误</li>
                  <li>局部错误处理</li>
                </ul>
              </div>
            </div>

            <div v-show="activeTab === 2" class="method">
              <h3>异步错误处理</h3>
              <p>处理Promise、async/await等异步操作中的错误</p>

              <div class="code-block">
                <pre><code>// 处理Promise错误
fetchData()
  .then(data => process(data))
  .catch(error => {
    console.error('请求失败:', error)
    showToast('数据加载失败')
  })

// 使用async/await
async function loadData() {
  try {
    const data = await fetchData()
    process(data)
  } catch (error) {
    console.error('加载数据错误:', error)
    showError('数据加载失败，请重试')
  }
}

// 全局未处理的Promise错误
window.addEventListener('unhandledrejection', event => {
  console.error('未处理的Promise错误:', event.reason)
  event.preventDefault()
})</code></pre>
              </div>

              <div class="use-case">
                <h4><i class="fas fa-check-circle"></i> 使用场景：</h4>
                <ul>
                  <li>API请求错误处理</li>
                  <li>定时器操作</li>
                  <li>WebSockets/事件监听</li>
                </ul>
              </div>
            </div>

            <div v-show="activeTab === 3" class="method">
              <h3>错误边界组件</h3>
              <p>使用特殊组件捕获子组件树中的JavaScript错误</p>

              <div class="code-block">
                <pre><code>// ErrorBoundary.vue
&lt;template&gt;
  &lt;div v-if="hasError" class="error-boundary"&gt;
    &lt;h3&gt;组件渲染出错&lt;/h3&gt;
    &lt;p&gt;{{ errorMessage }}&lt;/p&gt;
    &lt;button @click="reset"&gt;重试&lt;/button&gt;
  &lt;/div&gt;
  &lt;slot v-else&gt;&lt;/slot&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
import { ref, onErrorCaptured } from 'vue'

const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((err) => {
  hasError.value = true
  errorMessage.value = err.message
  // 阻止错误继续向上传播
  return false
})

function reset() {
  hasError.value = false
  errorMessage.value = ''
}
&lt;/script&gt;</code></pre>
              </div>

              <div class="use-case">
                <h4><i class="fas fa-check-circle"></i> 使用场景：</h4>
                <ul>
                  <li>隔离第三方组件错误</li>
                  <li>保护关键UI区域</li>
                  <li>提供组件级错误恢复</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices-section">
        <div class="section-header">
          <i class="icon fas fa-star"></i>
          <h2>错误处理最佳实践</h2>
        </div>

        <div class="practices">
          <div class="practice">
            <div class="number">1</div>
            <div class="content">
              <h3>分层处理错误</h3>
              <p>组件级 → 路由级 → 全局级</p>
            </div>
          </div>
          <div class="practice">
            <div class="number">2</div>
            <div class="content">
              <h3>提供用户反馈</h3>
              <p>使用Toast、Notification或错误页面</p>
            </div>
          </div>
          <div class="practice">
            <div class="number">3</div>
            <div class="content">
              <h3>记录错误日志</h3>
              <p>集成Sentry、Bugsnag等监控工具</p>
            </div>
          </div>
          <div class="practice">
            <div class="number">4</div>
            <div class="content">
              <h3>错误恢复机制</h3>
              <p>提供重试、刷新或替代方案</p>
            </div>
          </div>
        </div>

        <div class="monitoring">
          <h3>错误监控集成：</h3>
          <div class="tools">
            <div class="tool">
              <div class="logo sentry"></div>
              <h4>Sentry</h4>
            </div>
            <div class="tool">
              <div class="logo bugsnag"></div>
              <h4>Bugsnag</h4>
            </div>
            <div class="tool">
              <div class="logo rollbar"></div>
              <h4>Rollbar</h4>
            </div>
            <div class="tool">
              <div class="logo datadog"></div>
              <h4>Datadog</h4>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="section-header">
          <i class="icon fas fa-code"></i>
          <h2>错误处理演示</h2>
        </div>

        <div class="demo-area">
          <div class="demo-controls">
            <button class="btn error" @click="triggerError('component')">
              触发组件错误
            </button>
            <button class="btn error" @click="triggerError('async')">
              触发异步错误
            </button>
            <button class="btn error" @click="triggerError('event')">
              触发事件错误
            </button>
            <button class="btn reset" @click="resetDemo">
              重置演示
            </button>
          </div>

          <div class="demo-result">
            <div v-if="errorType" class="error-boundary">
              <div class="error-header">
                <i class="fas fa-exclamation-circle"></i>
                <h3>错误类型: {{ errorType }}</h3>
              </div>

              <div class="error-content">
                <p>{{ errorMessage }}</p>

                <div class="stack-trace" v-if="showStackTrace">
                  <pre>Error: 演示错误发生在{{ errorType }}中
    at triggerError (ErrorHandling.vue:128)
    at callWithErrorHandling (runtime-core.esm-bundler.js:165)
    at callWithAsyncErrorHandling (runtime-core.esm-bundler.js:174)</pre>
                </div>

                <div class="actions">
                  <button @click="showStackTrace = !showStackTrace">
                    {{ showStackTrace ? '隐藏' : '显示' }}堆栈跟踪
                  </button>
                  <button @click="resetDemo">
                    <i class="fas fa-redo"></i> 恢复应用
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="healthy-state">
              <div class="state-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>应用状态正常</h3>
              <p>点击上方按钮触发不同类型错误</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p> Vue错误处理指南 | 构建更健壮的Vue应用</p>
      <div class="links">
        <a href="#"><i class="fab fa-vuejs"></i> Vue官方文档</a>
        <a href="#"><i class="fab fa-github"></i> 示例代码</a>
        <a href="#"><i class="fas fa-book"></i> 错误处理手册</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = [
  { title: '全局处理' },
  { title: '生命周期钩子' },
  { title: '异步错误' },
  { title: '错误边界' }
];

const activeTab = ref(0);
const errorType = ref('');
const errorMessage = ref('');
const showStackTrace = ref(false);

function triggerError(type: string) {
  errorType.value = type;
  showStackTrace.value = false;

  switch (type) {
    case 'component':
      errorMessage.value = '组件渲染过程中发生错误';
      // 模拟组件渲染错误
      throw new Error('演示：组件渲染错误');
      break;
    case 'async':
      errorMessage.value = '异步操作中发生错误';
      // 模拟异步错误
      setTimeout(() => {
        throw new Error('演示：异步错误');
      }, 100);
      break;
    case 'event':
      errorMessage.value = '事件处理函数中发生错误';
      // 在下一个tick中抛出错误以模拟事件处理错误
      setTimeout(() => {
        throw new Error('演示：事件处理错误');
      }, 0);
      break;
  }
}

function resetDemo() {
  errorType.value = '';
  errorMessage.value = '';
  showStackTrace.value = false;
}
</script>

<style lang="less" scoped>



// 配色方案
@primary: #e74c3c;
@secondary: #3498db;
@accent: #9b59b6;
@success: #2ecc71;
@warning: #f39c12;
@background: #f8f9fc;
@card-bg: #ffffff;
@text: #2c3e50;
@text-light: #7f8c8d;
@border: #eaecef;
@dark: #34495e;

.error-handling-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text;
  background-color: @background;
  min-height: 100vh;

  .header {
    text-align: center;
    padding: 60px 20px 40px;
    margin-bottom: 30px;
    background: linear-gradient(135deg, @primary 0%, darken(@primary, 15%) 100%);
    color: white;
    border-radius: 0 0 20px 20px;
    position: relative;
    overflow: hidden;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      font-weight: 300;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .decoration {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 30px;

      .circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        opacity: 0.3;
        animation: pulse 2s infinite;

        &.red {
          background: #ff6b6b;
          animation-delay: 0s;
        }

        &.yellow {
          background: #ffd93d;
          animation-delay: 0.5s;
        }

        &.green {
          background: #6bcb77;
          animation-delay: 1s;
        }
      }
    }
  }

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 10px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.8rem;
      color: @text;
      margin: 0;
    }

    .icon {
      margin-right: 12px;
      color: @primary;
      font-size: 1.5rem;
    }
  }

  .overview-section {
    .card {
      background: @card-bg;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }

    .reasons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 30px;

      .reason {
        text-align: center;
        padding: 25px 20px;
        background: lighten(@background, 1%);
        border-radius: 12px;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .reason-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 15px;
          background: fade(@secondary, 10%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            font-size: 2rem;
            color: @secondary;
          }
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: @dark;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .error-impact {
      background: lighten(@primary, 40%);
      border-radius: 12px;
      padding: 20px;
      border-left: 4px solid @primary;

      h3 {
        font-size: 1.2rem;
        margin-top: 0;
        margin-bottom: 15px;
        color: darken(@primary, 15%);
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          font-weight: 500;

          i {
            margin-right: 10px;
            font-size: 1.2rem;

            &.red {
              color: @primary;
            }
          }
        }
      }
    }
  }

  .methods-section {
    .methods-tabs {
      background: @card-bg;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }

    .tabs {
      display: flex;
      background: lighten(@background, 1%);
      border-bottom: 1px solid @border;

      button {
        flex: 1;
        padding: 18px 20px;
        background: none;
        border: none;
        font-size: 1.1rem;
        font-weight: 500;
        color: @text-light;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;

        &.active {
          color: @primary;
          font-weight: 600;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: @primary;
          }
        }

        &:hover:not(.active) {
          background: fade(@primary, 5%);
          color: darken(@primary, 10%);
        }
      }
    }

    .tab-content {
      padding: 30px;

      .method {
        h3 {
          font-size: 1.5rem;
          color: @dark;
          margin-top: 0;
          margin-bottom: 15px;
        }

        p {
          color: @text-light;
          margin-bottom: 25px;
          line-height: 1.7;
        }

        .code-block {
          background: lighten(@background, 1%);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 25px;
          overflow-x: auto;
          font-family: 'Fira Code', monospace;
          border: 1px solid @border;

          pre {
            margin: 0;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          code {
            color: #24292e;
          }
        }

        .use-case {
          background: fade(@success, 8%);
          border-radius: 8px;
          padding: 20px;
          border-left: 4px solid @success;

          h4 {
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            margin-top: 0;
            margin-bottom: 15px;
            color: darken(@success, 15%);

            i {
              margin-right: 8px;
            }
          }

          ul {
            padding-left: 20px;
            margin: 0;

            li {
              margin-bottom: 8px;
              color: @text;
            }
          }
        }
      }
    }
  }

  .best-practices-section {
    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 30px;

      .practice {
        display: flex;
        background: @card-bg;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .number {
          width: 40px;
          height: 40px;
          background: @accent;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          flex-shrink: 0;
          margin-right: 15px;
        }

        .content {
          h3 {
            font-size: 1.1rem;
            margin-top: 0;
            margin-bottom: 8px;
            color: @text;
          }

          p {
            margin: 0;
            color: @text-light;
            font-size: 0.95rem;
          }
        }
      }
    }

    .monitoring {
      background: @card-bg;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 20px;
        color: @text;
      }

      .tools {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 15px;

        .tool {
          text-align: center;
          padding: 20px;
          background: lighten(@background, 1%);
          border-radius: 10px;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          }

          .logo {
            width: 60px;
            height: 60px;
            margin: 0 auto 15px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;

            &.sentry {
              background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23362d59"/><path d="M50,15 L65,50 L50,85 L35,50 Z" fill="white"/></svg>');
            }

            &.bugsnag {
              background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23494975"/><circle cx="50" cy="50" r="35" fill="white"/></svg>');
            }

            &.rollbar {
              background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230054a0"/><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="white"/></svg>');
            }

            &.datadog {
              background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23632ca6"/><circle cx="50" cy="50" r="20" fill="white"/></svg>');
            }
          }

          h4 {
            margin: 0;
            color: @dark;
          }
        }
      }
    }
  }

  .demo-section {
    .demo-area {
      background: @card-bg;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    }

    .demo-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      padding: 20px;
      background: lighten(@background, 1%);
      border-bottom: 1px solid @border;

      .btn {
        padding: 12px 20px;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;

        &.error {
          background: fade(@primary, 10%);
          color: @primary;

          &:hover {
            background: fade(@primary, 20%);
          }
        }

        &.reset {
          background: fade(@success, 10%);
          color: darken(@success, 10%);

          &:hover {
            background: fade(@success, 20%);
          }
        }
      }
    }

    .demo-result {
      padding: 30px;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;

      .error-boundary {
        width: 100%;
        max-width: 600px;
        background: lighten(@primary, 42%);
        border-radius: 12px;
        padding: 30px;
        border-left: 5px solid @primary;

        .error-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          i {
            font-size: 2.5rem;
            color: @primary;
            margin-right: 15px;
          }

          h3 {
            margin: 0;
            color: darken(@primary, 15%);
          }
        }

        .error-content {
          p {
            font-size: 1.1rem;
            margin-bottom: 25px;
            color: @dark;
          }

          .stack-trace {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 25px;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            overflow-x: auto;
          }

          .actions {
            display: flex;
            gap: 15px;

            button {
              padding: 10px 20px;
              border: none;
              border-radius: 6px;
              background: fade(@dark, 10%);
              color: @dark;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;

              &:hover {
                background: fade(@dark, 20%);
              }

              i {
                margin-right: 8px;
              }
            }
          }
        }
      }

      .healthy-state {
        text-align: center;

        .state-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 20px;
          background: fade(@success, 10%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            font-size: 3.5rem;
            color: @success;
          }
        }

        h3 {
          font-size: 1.8rem;
          margin-bottom: 15px;
          color: darken(@success, 15%);
        }

        p {
          color: @text-light;
          font-size: 1.1rem;
          margin: 0;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 60px;
    padding-top: 30px;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border;

    .links {
      margin-top: 15px;

      a {
        color: @primary;
        text-decoration: none;
        margin: 0 15px;
        display: inline-block;
        font-weight: 500;

        i {
          margin-right: 5px;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 40px 20px 30px !important;

    h1 {
      font-size: 2rem !important;
    }

    .subtitle {
      font-size: 1.1rem !important;
    }
  }

  .tabs {
    flex-wrap: wrap;

    button {
      flex: 1 0 50% !important;
      padding: 15px !important;
      font-size: 1rem !important;
    }
  }

  .demo-controls {
    justify-content: center;
  }
}
</style>
