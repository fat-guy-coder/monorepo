<template>
  <div class="time-slicing-container">
    <!-- 头部标题区域 -->
    <header class="header">
      <h1><i class="fas fa-hourglass-half"></i> 基于 requestIdleCallback 的时间切片技术</h1>
      <p class="subtitle">优化长任务执行，保持应用流畅响应</p>
    </header>

    <!-- 主内容区域 -->
    <main class="content">
      <!-- requestIdleCallback 介绍 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-info-circle"></i>
          <h2>requestIdleCallback 介绍</h2>
        </div>
        <div class="card-content">
          <div class="definition">
            <p>
              <strong>requestIdleCallback</strong> 是浏览器提供的
              API，允许开发者在浏览器空闲期间执行后台任务。
            </p>
            <p>
              它会在浏览器一帧的剩余时间（idle
              period）执行回调函数，避免影响关键任务（如动画和用户交互）。
            </p>
          </div>

          <div class="api-signature">
            <pre>const idleCallbackId = requestIdleCallback(callback, options);</pre>
          </div>

          <div>
            <h3>requestIdleCallback 的执行时机</h3>
            <img class="request-idle-callback-image" :src="RequestIdleCallback" alt="" />
          </div>

          <div class="params">
            <h3>参数说明：</h3>
            <div class="param">
              <div class="param-name">callback</div>
              <div class="param-desc">
                空闲时段执行的回调函数，接收 <code>IdleDeadline</code> 参数
              </div>
            </div>
            <div class="param">
              <div class="param-name">options (可选)</div>
              <div class="param-desc">
                <ul>
                  <li><code>timeout</code>: 指定回调的最长等待时间（毫秒）</li>
                </ul>
              </div>
            </div>

            <h3>IdleDeadline 对象：</h3>
            <div class="param">
              <div class="param-name">timeRemaining()</div>
              <div class="param-desc">返回当前空闲时段剩余的毫秒数（通常 ≤ 50ms）</div>
            </div>
            <div class="param">
              <div class="param-name">didTimeout</div>
              <div class="param-desc">表示任务执行是否超过约定时间</div>
            </div>
          </div>

          <div class="browser-support">
            <h3>浏览器支持情况：</h3>
            <div class="browsers">
              <div class="browser">
                <i class="fab fa-chrome"></i>
                <span>Chrome 47+</span>
              </div>
              <div class="browser">
                <i class="fab fa-firefox"></i>
                <span>Firefox 55+</span>
              </div>
              <div class="browser">
                <i class="fab fa-edge"></i>
                <span>Edge 79+</span>
              </div>
              <div class="browser unsupported">
                <i class="fab fa-safari"></i>
                <span>Safari 不支持</span>
              </div>
            </div>
            <p class="note">* 对于不支持的浏览器，可以使用 setTimeout 作为回退方案</p>
          </div>
        </div>
      </section>

      <!-- 时间切片原理 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-cogs"></i>
          <h2>时间切片实现原理</h2>
        </div>
        <div class="card-content">
          <div class="principle-visualization">
            <div class="frame">
              <div class="frame-label">16.6ms (60fps)</div>
              <div class="tasks">
                <div class="task critical">关键任务<br />(动画/交互)</div>
                <div class="task idle">空闲时间</div>
              </div>
              <div class="idle-callback">
                <div class="callback" v-for="i in 3" :key="i">
                  <div class="callback-label">时间切片任务 {{ i }}</div>
                </div>
              </div>
            </div>
            <div class="timeline">
              <div class="time-marker">0ms</div>
              <div class="time-marker">16.6ms</div>
              <div class="time-marker">33.3ms</div>
            </div>
          </div>

          <div class="design-steps">
            <h3>设计思路：</h3>
            <ol>
              <li>
                <strong>任务分解</strong>
                <p>将大型任务分解为多个可执行的小单元（切片）</p>
              </li>
              <li>
                <strong>空闲调度</strong>
                <p>使用 requestIdleCallback 在浏览器空闲时间执行任务切片</p>
              </li>
              <li>
                <strong>时间监控</strong>
                <p>通过 IdleDeadline.timeRemaining() 监控剩余时间</p>
              </li>
              <li>
                <strong>中断与恢复</strong>
                <p>当空闲时间不足时暂停任务，等待下一个空闲时段</p>
              </li>
              <li>
                <strong>超时处理</strong>
                <p>设置 timeout 确保任务最终被执行</p>
              </li>
            </ol>
          </div>

          <div class="comparison">
            <div class="without">
              <h4><i class="fas fa-times-circle error"></i> 未使用时间切片</h4>
              <div class="frame">
                <div class="long-task">长任务阻塞主线程</div>
                <div class="result">页面卡顿，交互延迟</div>
              </div>
            </div>
            <div class="with">
              <h4><i class="fas fa-check-circle success"></i> 使用时间切片</h4>
              <div class="frame">
                <div class="task">关键任务</div>
                <div class="slice">切片任务</div>
                <div class="result">流畅交互，响应迅速</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 实现示例 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>Vue3 实现示例</h2>
        </div>
        <div class="card-content">
          <div class="code-section">
            <h3>时间切片核心逻辑：</h3>
            <pre class="code-block"><code>import { ref } from 'vue';

// 兼容性处理
const requestIdleCallback = window.requestIdleCallback ||
  function(cb) { return setTimeout(() => { cb({ timeRemaining: () => 5 }); }, 0); };

export function useTimeSlicing() {
  const isProcessing = ref(false);
  const progress = ref(0);

  function processTask(taskItems: any[], chunkSize: number, callback: (item: any) => void) {
    isProcessing.value = true;
    progress.value = 0;

    let index = 0;
    const total = taskItems.length;

    function nextChunk(deadline: IdleDeadline) {
      while (index < total && deadline.timeRemaining() > 1) {
        // 处理当前切片
        for (let i = 0; i < chunkSize && index < total; i++, index++) {
          callback(taskItems[index]);
        }

        progress.value = Math.floor((index / total) * 100);
      }

      if (index < total) {
        // 请求下一个空闲时段
        requestIdleCallback(nextChunk, { timeout: 100 });
      } else {
        isProcessing.value = false;
      }
    }

    // 启动处理
    requestIdleCallback(nextChunk, { timeout: 100 });
  }

  return { isProcessing, progress, processTask };
}</code></pre>
          </div>

          <div class="demo-section">
            <h3>实际应用演示：</h3>
            <div class="demo-controls">
              <div class="control-group">
                <label>
                  <span>任务数量：</span>
                  <input type="range" min="100" max="10000" v-model="taskCount" />
                  {{ taskCount }} 条
                </label>
              </div>
              <div class="control-group">
                <label>
                  <span>切片大小：</span>
                  <input type="range" min="1" max="100" v-model="chunkSize" />
                  {{ chunkSize }} 条/切片
                </label>
              </div>
              <div class="buttons">
                <button @click="startProcessing" :disabled="isProcessing">
                  <i class="fas fa-play"></i> {{ isProcessing ? '处理中...' : '开始处理' }}
                </button>
                <button @click="resetProcessing" class="secondary">
                  <i class="fas fa-redo"></i> 重置
                </button>
              </div>
            </div>

            <div class="progress-container">
              <div class="progress-bar" :style="{ width: progress + '%' }">
                <div class="progress-text">{{ progress }}%</div>
              </div>
            </div>

            <div class="stats">
              <div class="stat">
                <div class="stat-value">{{ processedItems }}</div>
                <div class="stat-label">已处理项目</div>
              </div>
              <div class="stat">
                <div class="stat-value">{{ timeRemaining }}ms</div>
                <div class="stat-label">剩余空闲时间</div>
              </div>
              <div class="stat">
                <div class="stat-value">{{ performanceRating }}</div>
                <div class="stat-label">性能评级</div>
              </div>
            </div>

            <div class="log-container">
              <div class="log-header">
                <h4>执行日志：</h4>
                <button @click="clearLogs" class="small">
                  <i class="fas fa-trash-alt"></i> 清空
                </button>
              </div>
              <div class="logs">
                <div v-for="(log, index) in logs" :key="index" class="log-entry">
                  <i class="fas" :class="log.icon" :style="{ color: log.color }"></i>
                  [{{ log.time }}] {{ log.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-th-list"></i>
          <h2>使用场景</h2>
        </div>
        <div class="card-content">
          <div class="scenarios">
            <div class="scenario">
              <div class="icon">
                <i class="fas fa-table"></i>
              </div>
              <div class="content">
                <h3>大型数据渲染</h3>
                <p>渲染包含数千行的表格或列表，避免页面卡顿</p>
              </div>
            </div>
            <div class="scenario">
              <div class="icon">
                <i class="fas fa-search"></i>
              </div>
              <div class="content">
                <h3>复杂搜索/过滤</h3>
                <p>处理大型数据集的实时搜索和过滤操作</p>
              </div>
            </div>
            <div class="scenario">
              <div class="icon">
                <i class="fas fa-chart-bar"></i>
              </div>
              <div class="content">
                <h3>数据可视化</h3>
                <p>渲染包含大量数据点的图表</p>
              </div>
            </div>
            <div class="scenario">
              <div class="icon">
                <i class="fas fa-cogs"></i>
              </div>
              <div class="content">
                <h3>批量数据处理</h3>
                <p>处理大型文件导入或批量数据转换</p>
              </div>
            </div>
          </div>

          <div class="case-study">
            <h3>实际案例：电商平台产品过滤</h3>
            <div class="case-content">
              <div class="problem">
                <h4><i class="fas fa-exclamation-triangle"></i> 问题：</h4>
                <p>当用户尝试在包含10,000+商品的电商平台应用筛选条件时，页面会冻结3-5秒</p>
              </div>
              <div class="solution">
                <h4><i class="fas fa-check-circle"></i> 解决方案：</h4>
                <p>使用时间切片技术将过滤任务分解为多个小任务，每次处理200个商品，在空闲时间执行</p>
              </div>
              <div class="results">
                <h4><i class="fas fa-chart-line"></i> 结果：</h4>
                <ul>
                  <li>页面卡顿时间从5秒降至几乎不可感知</li>
                  <li>FPS从10提升到55+</li>
                  <li>用户满意度提升32%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-exclamation-triangle"></i>
          <h2>注意事项</h2>
        </div>
        <div class="card-content">
          <div class="warnings">
            <div class="warning">
              <div class="icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="content">
                <h3>超时设置</h3>
                <p>合理设置 timeout 值，避免任务长时间无法执行</p>
              </div>
            </div>
            <div class="warning">
              <div class="icon">
                <i class="fas fa-microchip"></i>
              </div>
              <div class="content">
                <h3>任务粒度</h3>
                <p>确保单个任务切片可以在空闲时间内完成（通常 &lt; 5ms）</p>
              </div>
            </div>
            <div class="warning">
              <div class="icon">
                <i class="fas fa-mobile-alt"></i>
              </div>
              <div class="content">
                <h3>移动设备</h3>
                <p>移动设备上的空闲时间通常更短，需调整切片大小</p>
              </div>
            </div>
            <div class="warning">
              <div class="icon">
                <i class="fas fa-sync-alt"></i>
              </div>
              <div class="content">
                <h3>任务优先级</h3>
                <p>对于高优先级任务，不要完全依赖 requestIdleCallback</p>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践：</h3>
            <ul>
              <li>监控空闲时间：始终检查 <code>timeRemaining()</code> 并据此调整任务量</li>
              <li>避免DOM操作：在空闲回调中尽量减少DOM操作</li>
              <li>提供反馈：长时间任务应显示进度指示器</li>
              <li>兼容处理：为不支持 requestIdleCallback 的浏览器提供回退方案</li>
              <li>任务取消：提供取消长时间任务的机制</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>基于 requestIdleCallback 的时间切片技术 | Vue3 实现 | 优化大型应用性能</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import RequestIdleCallback from '@/assets/image/js/requestIdleCallback.png'

// 演示数据
const taskCount = ref(5000)
const chunkSize = ref(25)
const isProcessing = ref(false)
const progress = ref(0)
const processedItems = ref(0)
const timeRemaining = ref(0)
const logs = ref<{ time: string; message: string; icon: string; color: string }[]>([])

// 生成日志时间戳
const getTimeStamp = () => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
}

// 添加日志
const addLog = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
  const icons = {
    info: 'fa-info-circle',
    success: 'fa-check-circle',
    warning: 'fa-exclamation-triangle',
    error: 'fa-times-circle',
  }

  const colors = {
    info: '#4361ee',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  }

  logs.value.unshift({
    time: getTimeStamp(),
    message,
    icon: icons[type],
    color: colors[type],
  })

  // 保持最多50条日志
  if (logs.value.length > 50) {
    logs.value.pop()
  }
}

// 性能评级
const performanceRating = computed(() => {
  if (!isProcessing.value) return '空闲'
  if (timeRemaining.value > 20) return '极佳'
  if (timeRemaining.value > 10) return '良好'
  if (timeRemaining.value > 5) return '正常'
  return '紧张'
})

// 开始处理任务
const startProcessing = () => {
  if (isProcessing.value) return

  isProcessing.value = true
  progress.value = 0
  processedItems.value = 0
  addLog(`开始处理 ${taskCount.value} 项任务，切片大小: ${chunkSize.value}`, 'info')

  // 模拟任务数据
  const taskItems = Array.from({ length: taskCount.value }, (_, i) => i)

  // 兼容性处理
  const requestIdleCallback =
    window.requestIdleCallback ||
    function (cb: (deadline: IdleDeadline) => void) {
      return setTimeout(() => {
        cb({
          timeRemaining: () => 5,
          didTimeout: false,
        })
      }, 0)
    }

  let index = 0

  const nextChunk = (deadline: IdleDeadline) => {
    timeRemaining.value = Math.floor(deadline.timeRemaining())
    const startTime = performance.now()

    while (index < taskCount.value && deadline.timeRemaining() > 1) {
      // 处理当前切片
      const chunkEnd = Math.min(index + chunkSize.value, taskCount.value)

      // 模拟任务处理
      for (let i = index; i < chunkEnd; i++) {
        // 这里可以执行实际的任务处理逻辑
        processedItems.value = i + 1
      }

      index = chunkEnd
      progress.value = Math.floor((index / taskCount.value) * 100)
    }

    const endTime = performance.now()
    const duration = endTime - startTime

    if (index < taskCount.value) {
      addLog(
        `处理切片: ${index - chunkSize.value} - ${index} (耗时: ${duration.toFixed(2)}ms, 空闲时间剩余: ${timeRemaining.value}ms)`,
        'info',
      )
      requestIdleCallback(nextChunk, { timeout: 100 })
    } else {
      isProcessing.value = false
      addLog(`任务完成! 共处理 ${taskCount.value} 项任务`, 'success')
    }
  }

  // 启动处理
  requestIdleCallback(nextChunk, { timeout: 100 })
}

// 重置处理
const resetProcessing = () => {
  isProcessing.value = false
  progress.value = 0
  processedItems.value = 0
  timeRemaining.value = 0
  addLog('任务已重置', 'info')
}

// 清空日志
const clearLogs = () => {
  logs.value = []
  addLog('日志已清空', 'info')
}

// 初始日志
onMounted(() => {
  addLog('时间切片演示已初始化', 'info')
  addLog("调整参数后点击'开始处理'按钮", 'info')
})
</script>

<style lang="less" scoped>
@primary: #4361ee;
@primary-light: #4895ef;
@secondary: #3f37c9;
@success: #4cc9f0;
@warning: #ff9e00;
@error: #f44336;
@text: #2b2d42;
@text-light: #8d99ae;
@background: #f8f9fa;
@card-bg: #ffffff;
@border: #e9ecef;
@shadow: rgba(149, 157, 165, 0.1);

.time-slicing-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: @background;
  color: @text;
  line-height: 1.6;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary, @secondary);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px @shadow;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .subtitle {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px @shadow;
  border: 1px solid @border;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(149, 157, 165, 0.2);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    color: @primary;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.6rem;
      margin: 0;
    }

    i {
      font-size: 1.5rem;
    }
  }
}

.definition {
  background: rgba(@primary, 0.05);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 3px solid @primary;
}

.api-signature {
  background: #2b2d42;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  margin: 20px 0;
}

.params {
  .param {
    display: flex;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px dashed @border;

    &:last-child {
      border-bottom: none;
    }

    .param-name {
      min-width: 200px;
      font-weight: 600;
      font-family: 'Fira Code', monospace;
      color: @primary;
    }

    .param-desc {
      flex: 1;

      ul {
        padding-left: 20px;
        margin: 5px 0;

        li {
          margin-bottom: 5px;
        }
      }
    }
  }
}

.browser-support {
  margin-top: 25px;

  .browsers {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 15px 0;

    .browser {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 15px;
      background: rgba(@primary, 0.08);
      border-radius: 30px;

      &.unsupported {
        background: rgba(@error, 0.08);
      }

      i {
        font-size: 1.2rem;
      }
    }
  }

  .note {
    font-size: 0.9rem;
    color: @text-light;
    font-style: italic;
  }
}

.request-idle-callback-image {
  width: 100%;
  object-fit: cover;
}

.principle-visualization {
  border: 1px solid @border;
  border-radius: 8px;
  padding: 20px;
  background: rgba(@primary, 0.03);
  margin: 20px 0;

  .frame {
    height: 100px;
    background: rgba(@text-light, 0.05);
    border: 1px solid @border;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;

    .frame-label {
      position: absolute;
      top: 5px;
      left: 5px;
      font-size: 0.8rem;
      color: @text-light;
    }

    .tasks {
      display: flex;
      height: 100%;

      .task {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight: 500;

        &.critical {
          width: 40%;
          background: rgba(@error, 0.15);
          color: darken(@error, 10%);
        }

        &.idle {
          flex: 1;
          background: rgba(@success, 0.15);
          color: darken(@success, 20%);
        }
      }
    }

    .idle-callback {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;

      .callback {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px dashed @border;

        &:first-child {
          border-left: none;
        }

        .callback-label {
          font-size: 0.8rem;
          text-align: center;
          padding: 3px;
          background: rgba(@primary, 0.7);
          color: white;
          border-radius: 3px;
        }
      }
    }
  }

  .timeline {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: @text-light;
  }
}

.design-steps {
  margin: 25px 0;

  ol {
    padding-left: 20px;

    li {
      margin-bottom: 20px;
      padding-left: 10px;

      strong {
        display: block;
        margin-bottom: 5px;
        color: @primary;
      }

      p {
        margin: 5px 0 0 0;
        color: @text-light;
      }
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;

  .without,
  .with {
    border-radius: 8px;
    padding: 15px;

    h4 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 0;

      .error {
        color: @error;
      }

      .success {
        color: #4caf50;
      }
    }

    .frame {
      height: 80px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      color: white;
      margin-top: 10px;

      .result {
        margin-top: 10px;
        font-size: 0.9rem;
        color: @text;
        text-align: center;
      }
    }
  }

  .without {
    background: rgba(@error, 0.05);

    .frame {
      background: rgba(@error, 0.3);

      .long-task {
        background: rgba(@error, 0.7);
        padding: 10px 20px;
        border-radius: 4px;
      }
    }
  }

  .with {
    background: rgba(@success, 0.05);

    .frame {
      background: rgba(@success, 0.3);
      flex-direction: column;

      .task,
      .slice {
        padding: 5px 15px;
        border-radius: 4px;
        margin: 2px;
      }

      .task {
        background: rgba(@primary, 0.7);
      }

      .slice {
        background: rgba(@success, 0.7);
      }
    }
  }
}

.code-block {
  background: #f8f9fa;
  color: #2b2d42;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.demo-controls {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  margin: 25px 0;

  .control-group {
    label {
      display: block;
      margin-bottom: 12px;

      span {
        display: inline-block;
        min-width: 100px;
      }

      input[type='range'] {
        width: 200px;
        vertical-align: middle;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: flex-end;
    gap: 10px;

    button {
      background: @primary;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        background: @secondary;
        transform: translateY(-2px);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }

      &.secondary {
        background: @card-bg;
        color: @primary;
        border: 1px solid @border;

        &:hover {
          background: @background;
        }
      }

      &.small {
        padding: 5px 10px;
        font-size: 0.9rem;
      }
    }
  }
}

.progress-container {
  height: 40px;
  background: @background;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid @border;
  position: relative;
  margin: 20px 0;

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, @primary, @primary-light);
    border-radius: 20px;
    transition: width 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 50px;

    .progress-text {
      color: white;
      padding: 0 15px;
      font-weight: bold;
      font-size: 0.9rem;
    }
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin: 25px 0;

  .stat {
    background: rgba(@primary, 0.05);
    border-radius: 8px;
    padding: 15px;
    text-align: center;

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: @primary;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 0.9rem;
      color: @text-light;
    }
  }
}

.log-container {
  border: 1px solid @border;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background: rgba(@primary, 0.05);
    border-bottom: 1px solid @border;

    h4 {
      margin: 0;
    }
  }

  .logs {
    height: 200px;
    overflow-y: auto;
    padding: 10px;
    background: #2b2d42;
    color: #f8f9fa;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;

    .log-entry {
      padding: 8px 5px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      gap: 10px;

      &:last-child {
        border-bottom: none;
      }

      i {
        min-width: 16px;
      }
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;

  .scenario {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: rgba(@primary, 0.05);
    border-radius: 8px;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }

    .icon {
      width: 50px;
      height: 50px;
      background: rgba(@primary, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 1.5rem;
        color: @primary;
      }
    }

    .content {
      flex: 1;

      h3 {
        margin: 0 0 5px 0;
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

.case-study {
  border: 1px solid @border;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  background: rgba(@primary, 0.03);

  h3 {
    margin-top: 0;
    color: @primary;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .case-content {
    > div {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px dashed @border;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      h4 {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 0 0 10px 0;
      }
    }

    ul {
      padding-left: 25px;
      margin: 10px 0;

      li {
        margin-bottom: 8px;
        position: relative;

        &::before {
          content: '•';
          color: @primary;
          font-weight: bold;
          position: absolute;
          left: -15px;
        }
      }
    }
  }
}

.warnings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;

  .warning {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: rgba(@warning, 0.05);
    border-radius: 8px;
    border-left: 3px solid @warning;

    .icon {
      width: 40px;
      height: 40px;
      background: rgba(@warning, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 1.2rem;
        color: @warning;
      }
    }

    .content {
      flex: 1;

      h3 {
        margin: 0 0 5px 0;
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

.best-practices {
  border-top: 1px solid @border;
  padding-top: 20px;
  margin-top: 20px;

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      padding-left: 10px;
      position: relative;

      &::before {
        content: '—';
        color: @primary;
        position: absolute;
        left: -15px;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: @text-light;
  font-size: 0.9rem;
  border-top: 1px solid @border;
}
</style>
