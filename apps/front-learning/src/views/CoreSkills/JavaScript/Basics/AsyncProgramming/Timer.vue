<template>
  <div class="timer-container">
    <header class="header">
      <div class="title-container">
        <h1>JavaScript 定时器介绍</h1>
        <p>掌握 setTimeout、setInterval 及高性能定时器的实现原理</p>
      </div>
      <div class="visual-timer">
        <div class="timer-circle" :style="timerCircleStyle">
          <div class="timer-progress" :style="timerProgressStyle"></div>
          <div class="timer-center"></div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 基础知识部分 -->
      <section class="section">
        <div class="section-header">
          <h2><i class="icon">⏱️</i> 定时器基础</h2>
          <div class="divider"></div>
        </div>

        <div class="section-content">
          <div class="info-grid">
            <div class="info-card">
              <div class="info-icon">⌛</div>
              <h3>定时器作用</h3>
              <ul>
                <li>延迟执行代码</li>
                <li>周期性执行任务</li>
                <li>实现动画效果</li>
                <li>节流与防抖</li>
                <li>轮询数据更新</li>
              </ul>
            </div>

            <div class="info-card">
              <div class="info-icon">⚙️</div>
              <h3>核心API</h3>
              <div class="api-list">
                <div class="api-item">
                  <code>setTimeout(fn, delay)</code>
                  <span>延迟执行一次</span>
                </div>
                <div class="api-item">
                  <code>setInterval(fn, interval)</code>
                  <span>周期性执行</span>
                </div>
                <div class="api-item">
                  <code>clearTimeout(id)</code>
                  <span>取消定时器</span>
                </div>
                <div class="api-item">
                  <code>clearInterval(id)</code>
                  <span>取消定时器</span>
                </div>
              </div>
            </div>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">基本用法示例</span>
              <button class="copy-button" @click="copyCode('basicExample')">复制</button>
            </div>
            <pre><code ref="basicExample">// setTimeout 示例
const timeoutId = setTimeout(() => {
  console.log('2秒后执行');
}, 2000);

// setInterval 示例
const intervalId = setInterval(() => {
  console.log('每秒执行一次');
}, 1000);

// 清除定时器
clearTimeout(timeoutId);
clearInterval(intervalId);</code></pre>
          </div>
        </div>
      </section>

      <!-- 参数介绍部分 -->
      <section class="section">
        <div class="section-header">
          <h2><i class="icon">🔍</i> 参数介绍</h2>
          <div class="divider"></div>
        </div>

        <div class="section-content">
          <div class="parameter-table">
            <div class="table-header">
              <div class="col">参数位置</div>
              <div class="col">参数类型</div>
              <div class="col">说明</div>
              <div class="col">默认值</div>
            </div>

            <div class="table-row">
              <div class="col">第一个参数</div>
              <div class="col">Function | String</div>
              <div class="col">要执行的函数或代码字符串（不推荐）</div>
              <div class="col">-</div>
            </div>

            <div class="table-row">
              <div class="col">第二个参数</div>
              <div class="col">Number</div>
              <div class="col">延迟/间隔时间（毫秒）</div>
              <div class="col">0</div>
            </div>

            <div class="table-row">
              <div class="col">后续参数</div>
              <div class="col">Any</div>
              <div class="col">传递给回调函数的参数</div>
              <div class="col">timerId</div>
            </div>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">参数传递示例</span>
              <button class="copy-button" @click="copyCode('paramExample')">复制</button>
            </div>
            <pre><code ref="paramExample">// 传递参数给回调函数
setTimeout((name, age) => {
  console.log(`姓名: ${name}, 年龄: ${age}`);
}, 1000, '张三', 25);

// 输出：姓名: 张三, 年龄: 25</code></pre>
          </div>

          <div class="note-box">
            <div class="note-icon">⚠️</div>
            <p>
              注意：回调函数中的 <code>this</code> 在严格模式下为
              <code>undefined</code>，非严格模式下指向
              <code>window</code> 对象。建议使用箭头函数或绑定上下文。
            </p>
          </div>
        </div>
      </section>

      <!-- 适用场景部分 -->
      <section class="section">
        <div class="section-header">
          <h2><i class="icon">🚀</i> 适用场景</h2>
          <div class="divider"></div>
        </div>

        <div class="section-content">
          <div class="scenario-grid">
            <div class="scenario-card">
              <div class="scenario-icon">⏳</div>
              <h3>延迟执行</h3>
              <p>页面加载后延迟执行某些操作，如显示提示信息</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🔄</div>
              <h3>周期性任务</h3>
              <p>定期检查数据更新、轮询服务器状态</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🎚️</div>
              <h3>节流与防抖</h3>
              <p>优化高频事件处理（滚动、输入、调整大小）</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🎮</div>
              <h3>动画实现</h3>
              <p>简单的动画效果实现（现代动画建议使用 requestAnimationFrame）</p>
            </div>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">防抖函数实现</span>
              <button class="copy-button" @click="copyCode('debounceExample')">复制</button>
            </div>
            <pre><code ref="debounceExample">function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用示例
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce(() => {
  console.log('执行搜索操作');
}, 300));</code></pre>
          </div>
        </div>
      </section>

      <!-- 注意事项部分 -->
      <section class="section">
        <div class="section-header">
          <h2><i class="icon">⚠️</i> 注意事项</h2>
          <div class="divider"></div>
        </div>

        <div class="section-content">
          <div class="warnings">
            <div class="warning-item">
              <div class="warning-icon">1</div>
              <div>
                <h3>定时器清除</h3>
                <p>务必在组件卸载或不需要时清除定时器，防止内存泄漏</p>
              </div>
            </div>

            <div class="warning-item">
              <div class="warning-icon">2</div>
              <div>
                <h3>执行时间不确定</h3>
                <p>定时器不是精确的，会受到主线程阻塞的影响</p>
              </div>
            </div>

            <div class="warning-item">
              <div class="warning-icon">3</div>
              <div>
                <h3>最小延迟时间</h3>
                <p>浏览器中最小延迟为 4ms（HTML5 规范要求）</p>
              </div>
            </div>

            <div class="warning-item">
              <div class="warning-icon">4</div>
              <div>
                <h3>上下文问题</h3>
                <p>回调函数中的 <code>this</code> 指向可能不是预期对象</p>
              </div>
            </div>

            <div class="warning-item">
              <div class="warning-icon">5</div>
              <div>
                <h3>异步执行</h3>
                <p>定时器回调是异步执行的，不会阻塞主线程</p>
              </div>
            </div>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">Vue 组件中的定时器清理</span>
              <button class="copy-button" @click="copyCode('vueExample')">复制</button>
            </div>
            <pre><code ref="vueExample">import { onMounted, onUnmounted, ref } from 'vue';

export default {
  setup() {
    const timerId = ref&lt;number | null&gt;(null);

    onMounted(() => {
      timerId.value = setInterval(() => {
        console.log('定时任务执行');
      }, 1000);
    });

    onUnmounted(() => {
      if (timerId.value) {
        clearInterval(timerId.value);
      }
    });

    return { timerId };
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 高精度定时器部分 -->
      <section class="section">
        <div class="section-header">
          <h2><i class="icon">🎯</i> 高精度定时器</h2>
          <div class="divider"></div>
        </div>

        <div class="section-content">
          <div class="precision-info">
            <p>由于 JavaScript 的单线程特性，传统定时器在以下情况下会出现延迟：</p>
            <ul>
              <li>主线程长时间阻塞（复杂计算、同步操作）</li>
              <li>页面处于后台状态（浏览器节流）</li>
              <li>设备性能限制</li>
            </ul>

            <p>实现高精度定时器的策略：</p>
            <ol>
              <li>使用 <code>performance.now()</code> 获取高精度时间戳</li>
              <li>记录每次执行的系统时间</li>
              <li>计算时间偏差并进行补偿</li>
              <li>动态调整下次执行时间</li>
            </ol>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span class="code-title">高精度定时器实现</span>
              <button class="copy-button" @click="copyCode('precisionExample')">复制</button>
            </div>
            <pre><code ref="precisionExample">class HighPrecisionTimer {
  private callback: () => void;
  private interval: number;
  private expected: number;
  private timeoutId: number | null;
  private startTime: number;

  constructor(callback: () => void, interval: number) {
    this.callback = callback;
    this.interval = interval;
    this.expected = 0;
    this.timeoutId = null;
    this.startTime = 0;
  }

  start() {
    this.startTime = performance.now();
    this.expected = this.startTime + this.interval;
    this.timeoutId = setTimeout(this.step.bind(this), this.interval);
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private step() {
    const now = performance.now();
    const drift = now - this.expected;

    // 执行回调
    this.callback();

    // 计算下次执行时间（补偿时间偏差）
    this.expected += this.interval;
    const nextTime = Math.max(0, this.interval - drift);

    this.timeoutId = setTimeout(this.step.bind(this), nextTime);
  }
}

// 使用示例
const timer = new HighPrecisionTimer(() => {
  console.log('高精度定时器执行');
}, 1000);
timer.start();</code></pre>
          </div>
        </div>
      </section>

      <!-- 交互演示部分 -->
      <section class="section">
        <div class="section-header">
          <h2><i class="icon">🧪</i> 定时器演示</h2>
          <div class="divider"></div>
        </div>

        <div class="section-content">
          <div class="demo-container">
            <div class="demo-controls">
              <div class="control-group">
                <label>定时器类型：</label>
                <Select v-model="demoType">
                  <option value="timeout">setTimeout</option>
                  <option value="interval">setInterval</option>
                  <option value="precision">高精度定时器</option>
                </select>
              </div>

              <div class="control-group">
                <label>延迟/间隔时间 (ms)：</label>
                <input type="number" v-model="demoInterval" min="10" max="5000" />
              </div>

              <div class="button-group">
                <button class="demo-button" @click="startDemo">
                  {{ isRunning ? '停止' : '开始' }}
                </button>
                <button class="demo-button" @click="resetDemo">重置</button>
              </div>
            </div>

            <div class="demo-output">
              <div class="output-header">
                <span>执行日志</span>
                <span>偏差: {{ lastDrift !== null ? lastDrift + 'ms' : '-' }}</span>
              </div>
              <div class="output-content">
                <div v-for="(log, index) in demoLogs" :key="index" class="log-entry">
                  <span class="log-time">[{{ log.time }}]</span>
                  <span class="log-message">{{ log.message }}</span>
                  <span v-if="log.drift !== null" class="log-drift">(偏差: {{ log.drift }}ms)</span>
                </div>
                <div v-if="demoLogs.length === 0" class="empty-log">点击"开始"按钮启动定时器</div>
              </div>
            </div>

            <div class="stats-container">
              <div class="stat-card">
                <div class="stat-value">{{ executionCount }}</div>
                <div class="stat-label">执行次数</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ avgDrift !== null ? avgDrift.toFixed(2) : '0.00' }}</div>
                <div class="stat-label">平均偏差 (ms)</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ maxDrift !== null ? maxDrift : '0' }}</div>
                <div class="stat-label">最大偏差 (ms)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>JavaScript 定时器是异步编程的重要工具 | 合理使用定时器可以提升用户体验和程序性能</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

// 演示相关状态
const demoType = ref<'timeout' | 'interval' | 'precision'>('interval')
const demoInterval = ref(1000)
const isRunning = ref(false)
const demoLogs = ref<Array<{ time: string; message: string; drift: number | null }>>([])
const executionCount = ref(0)
const lastDrift = ref<number | null>(null)
const avgDrift = ref<number | null>(null)
const maxDrift = ref<number | null>(null)
const driftSamples = ref<number[]>([])

let timerId: number | null = null
let precisionTimer: HighPrecisionTimer | null = null
let startTimestamp: number | null = null

class HighPrecisionTimer {
  private callback: () => void
  private interval: number
  private expected: number
  private timeoutId: number | null
  private startTime: number

  constructor(callback: () => void, interval: number) {
    this.callback = callback
    this.interval = interval
    this.expected = 0
    this.timeoutId = null
    this.startTime = 0
  }

  start() {
    this.startTime = performance.now()
    this.expected = this.startTime + this.interval
    this.timeoutId = window.setTimeout(this.step.bind(this), this.interval)
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  private step() {
    const now = performance.now()
    const drift = now - this.expected

    // 执行回调
    this.callback()

    // 记录偏差
    recordDrift(drift)

    // 计算下次执行时间（补偿时间偏差）
    this.expected += this.interval
    const nextTime = Math.max(0, this.interval - drift)

    this.timeoutId = window.setTimeout(this.step.bind(this), nextTime)
  }
}

// 记录时间偏差
function recordDrift(drift: number) {
  driftSamples.value.push(Math.abs(drift))
  lastDrift.value = drift
  executionCount.value++

  // 计算平均偏差
  const sum = driftSamples.value.reduce((acc, val) => acc + val, 0)
  avgDrift.value = sum / driftSamples.value.length

  // 计算最大偏差
  maxDrift.value = Math.max(...driftSamples.value)
}

// 添加日志
function addLog(message: string, drift: number | null = null) {
  const now = new Date()
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

  demoLogs.value.push({
    time: timeString,
    message,
    drift,
  })

  // 限制日志数量
  if (demoLogs.value.length > 20) {
    demoLogs.value.shift()
  }
}

// 开始演示
function startDemo() {
  if (isRunning.value) {
    stopDemo()
    return
  }

  // 重置状态
  isRunning.value = true
  demoLogs.value = []
  executionCount.value = 0
  lastDrift.value = null
  avgDrift.value = null
  maxDrift.value = null
  driftSamples.value = []
  startTimestamp = performance.now()

  addLog('定时器启动')

  const interval = Math.max(10, Math.min(5000, demoInterval.value))

  switch (demoType.value) {
    case 'timeout':
      timerId = window.setTimeout(() => {
        addLog('setTimeout 执行')
        isRunning.value = false
      }, interval)
      break

    case 'interval':
      timerId = window.setInterval(() => {
        const now = performance.now()
        const drift = startTimestamp ? now - startTimestamp - executionCount.value * interval : 0
        recordDrift(drift)
        startTimestamp = now

        addLog(`setInterval 执行 (${executionCount.value})`, drift)
      }, interval)
      break

    case 'precision':
      precisionTimer = new HighPrecisionTimer(() => {
        addLog(`高精度定时器执行 (${executionCount.value})`, lastDrift.value)
      }, interval)
      precisionTimer.start()
      break
  }
}

// 停止演示
function stopDemo() {
  isRunning.value = false

  if (timerId) {
    if (demoType.value === 'interval') {
      clearInterval(timerId)
    } else {
      clearTimeout(timerId)
    }
    timerId = null
  }

  if (precisionTimer) {
    precisionTimer.stop()
    precisionTimer = null
  }

  addLog('定时器已停止')
}

// 重置演示
function resetDemo() {
  stopDemo()
  demoLogs.value = []
  executionCount.value = 0
  lastDrift.value = null
  avgDrift.value = null
  maxDrift.value = null
  driftSamples.value = []
}

// 复制代码
function copyCode(refName: string) {
  const codeElement = document.querySelector(`[ref="${refName}"]`)
  if (codeElement) {
    const code = codeElement.textContent || ''
    navigator.clipboard.writeText(code).then(() => {
      alert('代码已复制到剪贴板')
    })
  }
}

// 定时器动画效果
const timerProgress = ref(0)
const timerCircleStyle = computed(() => ({
  transform: `rotate(${timerProgress.value * 360}deg)`,
}))

const timerProgressStyle = computed(() => ({
  transform: `rotate(${timerProgress.value * 360}deg)`,
}))

// 清理定时器
onUnmounted(() => {
  stopDemo()
})

// 定时器动画循环
function animateTimer() {
  if (isRunning.value) {
    timerProgress.value = (timerProgress.value + 0.002) % 1
  } else {
    timerProgress.value = 0
  }
  requestAnimationFrame(animateTimer)
}

animateTimer()
</script>

<style lang="less" scoped>
.timer-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    sans-serif;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 30px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .title-container {
    max-width: 600px;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.1rem;
      opacity: 0.9;
    }
  }
}

.visual-timer {
  position: relative;
  width: 160px;
  height: 160px;

  .timer-circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
    transition: transform 0.1s linear;

    .timer-progress {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      clip: rect(0, 80px, 160px, 0);
      background: rgba(255, 255, 255, 0.3);
      transition: transform 0.1s linear;
    }

    .timer-center {
      position: absolute;
      width: 130px;
      height: 130px;
      background: #3b82f6;
      border-radius: 50%;
      top: 15px;
      left: 15px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
  padding: 30px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    transform: translateY(-3px);
  }
}

.section-header {
  margin-bottom: 25px;

  h2 {
    font-size: 1.8rem;
    color: #1e40af;
    display: flex;
    align-items: center;
    gap: 12px;

    .icon {
      background: #dbeafe;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
  }

  .divider {
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #93c5fd);
    margin-top: 15px;
    border-radius: 2px;
  }
}

.section-content {
  p {
    margin-bottom: 20px;
    font-size: 1.05rem;
    color: #475569;
    line-height: 1.7;
  }

  .highlight {
    background: #dbeafe;
    color: #1e40af;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.info-card {
  background: #f1f5f9;
  border-radius: 16px;
  padding: 25px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }

  .info-icon {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  h3 {
    color: #1e40af;
    margin-bottom: 15px;
    font-size: 1.4rem;
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      position: relative;

      &:before {
        content: '•';
        color: #3b82f6;
        font-weight: bold;
        position: absolute;
        left: -18px;
      }
    }
  }
}

.api-list {
  .api-item {
    padding: 12px 0;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;

    &:last-child {
      border-bottom: none;
    }

    code {
      font-family: 'Fira Code', monospace;
      background: #dbeafe;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.95rem;
      margin-bottom: 5px;
    }

    span {
      color: #64748b;
      font-size: 0.95rem;
    }
  }
}

.code-block {
  background: #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
  margin: 25px 0;
  border: 1px solid #e2e8f0;

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background-color: #e2e8f0;
    border-bottom: 1px solid #cbd5e1;

    .code-title {
      font-weight: 600;
      color: #1e293b;
    }

    .copy-button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.2s;

      &:hover {
        background: #2563eb;
      }
    }
  }

  pre {
    padding: 20px;
    overflow-x: auto;
  }

  code {
    font-family: 'Fira Code', Consolas, Monaco, monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #1e293b;
  }
}

.parameter-table {
  border-radius: 12px;
  overflow: hidden;
  margin: 25px 0;
  border: 1px solid #e2e8f0;

  .table-header,
  .table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr 1fr;
  }

  .table-header {
    background: #3b82f6;
    color: white;
    font-weight: 600;

    .col {
      padding: 15px 20px;
    }
  }

  .table-row {
    background: white;
    border-bottom: 1px solid #e2e8f0;

    &:nth-child(even) {
      background: #f8fafc;
    }

    &:last-child {
      border-bottom: none;
    }

    .col {
      padding: 15px 20px;
      display: flex;
      align-items: center;
    }
  }
}

.note-box {
  display: flex;
  gap: 15px;
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
  padding: 18px;
  border-radius: 0 8px 8px 0;
  margin: 25px 0;

  .note-icon {
    font-size: 1.5rem;
    color: #f59e0b;
  }

  p {
    margin: 0;
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.scenario-card {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .scenario-icon {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  h3 {
    color: #1e40af;
    margin-bottom: 12px;
    font-size: 1.3rem;
  }

  p {
    color: #475569;
    font-size: 1rem;
    margin-bottom: 0;
  }
}

.warnings {
  margin: 25px 0;

  .warning-item {
    display: flex;
    gap: 20px;
    padding: 20px;
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }

    .warning-icon {
      width: 36px;
      height: 36px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }

    h3 {
      color: #1e40af;
      margin-bottom: 5px;
      font-size: 1.2rem;
    }

    p {
      margin: 0;
      color: #475569;
    }
  }
}

.precision-info {
  background: #f0f9ff;
  border-radius: 12px;
  padding: 25px;
  margin: 25px 0;

  p {
    font-weight: 500;
    margin-bottom: 15px;
  }

  ul,
  ol {
    padding-left: 30px;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
      position: relative;

      &:before {
        position: absolute;
        left: -20px;
      }
    }
  }

  ul li:before {
    content: '•';
    color: #3b82f6;
    font-weight: bold;
  }

  ol {
    counter-reset: item;

    li {
      counter-increment: item;

      &:before {
        content: counter(item) '.';
        color: #3b82f6;
        font-weight: bold;
      }
    }
  }
}

.demo-container {
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 25px;
  margin-top: 20px;
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
  align-items: center;

  .control-group {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-weight: 500;
      color: #1e293b;
    }

    select,
    input {
      padding: 10px 15px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      background: white;
      font-family: inherit;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }
    }

    input {
      width: 120px;
    }
  }

  .button-group {
    display: flex;
    gap: 15px;
    margin-left: auto;
  }

  .demo-button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;

    &:hover {
      background: #2563eb;
    }
  }
}

.demo-output {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 25px;
  border: 1px solid #e2e8f0;

  .output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background-color: #e2e8f0;
    color: #1e293b;
    font-weight: 500;
  }

  .output-content {
    padding: 20px;
    min-height: 200px;
    max-height: 300px;
    overflow-y: auto;

    .log-entry {
      padding: 10px 0;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      gap: 15px;
      align-items: center;

      &:last-child {
        border-bottom: none;
      }

      .log-time {
        color: #64748b;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }

      .log-message {
        flex: 1;
      }

      .log-drift {
        color: #ef4444;
        font-weight: 500;
      }
    }

    .empty-log {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 160px;
      color: #94a3b8;
      font-style: italic;
    }
  }
}

.stats-container {
  display: flex;
  gap: 20px;

  .stat-card {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    .stat-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 10px;
    }

    .stat-label {
      color: #64748b;
      font-size: 0.95rem;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px;
  color: #64748b;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;

    .visual-timer {
      margin-top: 30px;
    }
  }

  .section {
    padding: 20px;
  }

  .demo-controls {
    flex-direction: column;
    align-items: stretch;

    .button-group {
      margin-left: 0;
      justify-content: center;
    }
  }

  .stats-container {
    flex-direction: column;
  }
}
</style>
