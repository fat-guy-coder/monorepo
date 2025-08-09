<template>
  <div class="time-slicing-container">
    <!-- 头部标题区域 -->
    <header class="header">
      <h1><i class="fas fa-hourglass-half"></i> Vue3 时间切片技术</h1>
      <p class="subtitle">通过分块处理任务优化大型数据渲染，保持应用响应性</p>
    </header>

    <!-- 主内容区域 -->
    <main class="content">
      <!-- 原理介绍卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-lightbulb"></i>
          <h2>时间切片原理</h2>
        </div>
        <div class="card-content">
          <p>时间切片（Time Slicing）是一种将大型任务分解为多个小任务并在多个帧中执行的技术，避免长时间阻塞主线程。</p>

          <div class="highlight-box">
            <p><strong>核心思想：</strong> 将JavaScript任务分解为小片段，在浏览器空闲时间执行，保证UI流畅响应。</p>
          </div>

          <h3>实现机制</h3>
          <ul class="key-points">
            <li>
              <i class="fas fa-check-circle success"></i>
              <p><strong>任务分块：</strong> 将大型任务（如渲染10000条数据）分解为多个小任务（如每次渲染50条）</p>
            </li>
            <li>
              <i class="fas fa-check-circle success"></i>
              <p><strong>空闲时间执行：</strong> 使用 <code>requestIdleCallback</code> 或 <code>setTimeout</code> 在浏览器空闲期执行任务</p>
            </li>
            <li>
              <i class="fas fa-check-circle success"></i>
              <p><strong>渲染优先级：</strong> 保证用户交互和动画等高优先级任务优先执行</p>
            </li>
          </ul>

          <div class="comparison">
            <div class="problem">
              <i class="fas fa-exclamation-triangle warning"></i>
              <h4>问题</h4>
              <p>一次性渲染10000条数据会导致页面冻结3-5秒，用户无法进行任何交互。</p>
            </div>
            <div class="solution">
              <i class="fas fa-check-circle success"></i>
              <h4>解决方案</h4>
              <p>分100次渲染，每次100条，每次执行后让出主线程，保持UI响应。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 原生JS实现 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>原生JS实现</h2>
        </div>
        <div class="card-content">
          <p>使用 <code>requestIdleCallback</code> 实现基础时间切片：</p>

          <pre class="code-block"><code>function processChunk(startIndex, total) {
  const CHUNK_SIZE = 50;
  let endIndex = Math.min(startIndex + CHUNK_SIZE, total);

  // 处理当前分块
  for (let i = startIndex; i < endIndex; i++) {
    // 渲染或处理数据项
  }

  if (endIndex < total) {
    // 请求下一个空闲时间段
    requestIdleCallback(() => {
      processChunk(endIndex, total);
    }, { timeout: 100 });
  }
}

// 开始处理
processChunk(0, 10000);</code></pre>

          <div class="controls">
            <button @click="runNativeTask" :disabled="nativeStatus === '处理中'">
              <i class="fas fa-play"></i> 运行原生示例
            </button>
            <button class="secondary" @click="resetNative">
              <i class="fas fa-redo"></i> 重置
            </button>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="stat-value">{{ nativeProcessed }}</div>
              <div class="stat-label">已处理项目</div>
            </div>
            <div class="stat">
              <div class="stat-value">{{ nativeProgress }}%</div>
              <div class="stat-label">完成进度</div>
            </div>
            <div class="stat">
              <div class="stat-value" :class="nativeStatusClass">{{ nativeStatus }}</div>
              <div class="stat-label">状态</div>
            </div>
          </div>

          <div class="list-container">
            <div v-for="item in nativeItems" :key="item.id" class="list-item">
              <i class="fas fa-circle" :style="{ color: item.color }"></i>
              {{ item.text }}
            </div>
          </div>
        </div>
      </section>

      <!-- 原生JS实现 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>原生JS实现</h2>
        </div>
        <div class="card-content">
          <p>使用 <code>requestAnimationFrame</code> 实现基础时间切片：</p>

          <pre class="code-block"><code>function processChunk(startIndex, total) {
  const CHUNK_SIZE = 50;
  let endIndex = Math.min(startIndex + CHUNK_SIZE, total);

  // 处理当前分块
  for (let i = startIndex; i < endIndex; i++) {
    // 渲染或处理数据项
  }

  if (endIndex < total) {
    // 请求下一个空闲时间段
    requestAnimationFrame(() => {
      processChunk(endIndex, total);
    });
  }
}

// 开始处理
processChunk(0, 10000);</code></pre>
        </div>
      </section>

      <!-- Vue3和setTimeout实现 -->
      <section class="card">
        <div class="card-header">
          <i class="fab fa-vuejs vue-icon"></i>
          <h2>Vue3 和 setTimeout 实现</h2>
        </div>
        <div class="card-content">
          <p>在Vue3中，我们可以使用Composition API实现时间切片：</p>

          <pre class="code-block"><code>import { ref, onMounted } from 'vue';

export default {
  setup() {
    const items = ref([]);
    const processed = ref(0);
    const total = 1000;

    const processChunk = (start) => {
      const CHUNK_SIZE = 50;
      let end = Math.min(start + CHUNK_SIZE, total);

      // 处理当前分块
      for (let i = start; i < end; i++) {
        items.value.push({
          id: i,
          text: `Item ${i+1}`,
        });
      }

      processed.value = end;

      if (end < total) {
        // 使用setTimeout让出主线程 也可以使用requestIdleCallback 但是requestIdleCallback在低版本浏览器不兼容
        // 使用setTimeout进入宏任务队列，等待主线程空闲时执行
        setTimeout(() => processChunk(end), 0);
      }
    }

    onMounted(() => {
      processChunk(0);
    });

    return { items, processed, total };
  }
}</code></pre>

          <div class="controls">
            <button @click="runVueTask" :disabled="vueStatus === '处理中'">
              <i class="fas fa-play"></i> 运行Vue示例
            </button>
            <button class="secondary" @click="resetVue">
              <i class="fas fa-redo"></i> 重置
            </button>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="stat-value">{{ vueProcessed }}</div>
              <div class="stat-label">已处理项目</div>
            </div>
            <div class="stat">
              <div class="stat-value">{{ vueProgress }}%</div>
              <div class="stat-label">完成进度</div>
            </div>
            <div class="stat">
              <div class="stat-value" :class="vueStatusClass">{{ vueStatus }}</div>
              <div class="stat-label">状态</div>
            </div>
          </div>

          <div class="list-container">
            <div v-for="item in vueItems" :key="item.id" class="list-item">
              <i class="fab fa-vuejs vue-icon"></i>
              {{ item.text }}
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
          <p>时间切片适用于处理大型任务而不影响UI响应性的场景：</p>

          <ul class="use-cases">
            <li>
              <i class="fas fa-table"></i>
              <div>
                <h4>大型列表/表格渲染</h4>
                <p>渲染数千行数据时保持滚动流畅</p>
              </div>
            </li>
            <li>
              <i class="fas fa-calculator"></i>
              <div>
                <h4>复杂计算</h4>
                <p>大数据处理、图像处理等CPU密集型任务</p>
              </div>
            </li>
            <li>
              <i class="fas fa-search"></i>
              <div>
                <h4>实时搜索/过滤</h4>
                <p>大型数据集的高效过滤</p>
              </div>
            </li>
            <li>
              <i class="fas fa-chart-line"></i>
              <div>
                <h4>数据可视化</h4>
                <p>渲染大量图表元素</p>
              </div>
            </li>
          </ul>

          <h3>何时不需要时间切片？</h3>
          <ul class="when-not">
            <li>小型数据集（少于1000条）</li>
            <li>不需要用户交互的后台任务</li>
            <li>执行时间短于16ms的任务</li>
          </ul>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>Vue3 时间切片示例 | 使用 Vue3 Composition API 实现 | 通过合理使用时间切片技术提升大型应用响应性</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, } from 'vue'

// 原生JS示例数据
const nativeItems = ref<{ id: number, text: string, color: string }[]>([])
const nativeProcessed = ref(0)
const nativeTotal = 500
const nativeStatus = ref('等待中')

// Vue示例数据
const vueItems = ref<{ id: number, text: string }[]>([])
const vueProcessed = ref(0)
const vueTotal = 500
const vueStatus = ref('等待中')

// 计算属性
const nativeProgress = computed(() => {
  return Math.round((nativeProcessed.value / nativeTotal) * 100)
})

const vueProgress = computed(() => {
  return Math.round((vueProcessed.value / vueTotal) * 100)
})

const nativeStatusClass = computed(() => {
  return nativeStatus.value === '处理中' ? 'status-processing' : 'status-completed'
})

const vueStatusClass = computed(() => {
  return vueStatus.value === '处理中' ? 'status-processing' : 'status-completed'
})

// 原生JS任务处理
const runNativeTask = () => {
  if (nativeStatus.value === '处理中') return

  nativeItems.value = []
  nativeProcessed.value = 0
  nativeStatus.value = '处理中'

  const processChunk = (start: number) => {
    const CHUNK_SIZE = 20
    const end = Math.min(start + CHUNK_SIZE, nativeTotal)

    // 处理当前分块
    for (let i = start; i < end; i++) {
      nativeItems.value.push({
        id: i,
        text: `原生项目 ${i + 1}`,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      })
    }

    nativeProcessed.value = end

    if (end < nativeTotal) {
      // 使用setTimeout模拟时间切片
      setTimeout(() => processChunk(end), 0)
    } else {
      nativeStatus.value = '已完成'
    }
  }

  processChunk(0)
}

// Vue任务处理
const runVueTask = () => {
  if (vueStatus.value === '处理中') return

  vueItems.value = []
  vueProcessed.value = 0
  vueStatus.value = '处理中'

  const processChunk = (start: number) => {
    const CHUNK_SIZE = 20
    const end = Math.min(start + CHUNK_SIZE, vueTotal)

    // 处理当前分块
    for (let i = start; i < end; i++) {
      vueItems.value.push({
        id: i,
        text: `Vue项目 ${i + 1}`
      })
    }

    vueProcessed.value = end

    if (end < vueTotal) {
      // 使用setTimeout让出主线程
      setTimeout(() => processChunk(end), 0)
    } else {
      vueStatus.value = '已完成'
    }
  }

  processChunk(0)
}

// 重置函数
const resetNative = () => {
  nativeItems.value = []
  nativeProcessed.value = 0
  nativeStatus.value = '等待中'
}

const resetVue = () => {
  vueItems.value = []
  vueProcessed.value = 0
  vueStatus.value = '等待中'
}
</script>

<style lang="less" scoped>
@primary: #4361ee;
@primary-light: #4895ef;
@secondary: #3f37c9;
@success: #4cc9f0;
@warning: #ff9e00;
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
    font-size: 2.5rem;
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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
      font-size: 1.8rem;
      margin: 0;
    }

    i {
      font-size: 1.5rem;
    }

    .vue-icon {
      color: #42b883;
    }
  }
}

.highlight-box {
  background: rgba(@primary, 0.1);
  border-left: 4px solid @primary;
  padding: 15px;
  border-radius: 0 8px 8px 0;
  margin: 20px 0;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
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

.controls {
  display: flex;
  gap: 10px;
  margin: 20px 0;

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
      opacity: 0.6;
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
  }
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  text-align: center;

  .stat {
    padding: 15px;
    border-radius: 8px;
    background: rgba(@primary, 0.05);
    min-width: 120px;

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: @primary;

      &.status-processing {
        color: @warning;
      }

      &.status-completed {
        color: #4caf50;
      }
    }

    .stat-label {
      font-size: 0.9rem;
      color: @text-light;
    }
  }
}

.list-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid @border;
  border-radius: 8px;
  padding: 10px;
  margin-top: 15px;

  .list-item {
    padding: 10px;
    margin: 5px 0;
    background: rgba(@primary, 0.05);
    border-radius: 6px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      background: rgba(@primary, 0.1);
      transform: translateX(5px);
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 25px 0;

  .problem,
  .solution {
    padding: 20px;
    border-radius: 8px;

    h4 {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
  }

  .problem {
    background: rgba(@warning, 0.05);
    border-left: 4px solid @warning;
  }

  .solution {
    background: rgba(@success, 0.05);
    border-left: 4px solid @success;
  }
}

.key-points {
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 15px 0;

    i {
      margin-top: 5px;

      &.success {
        color: @success;
      }
    }
  }
}

.use-cases {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 15px;
    background: rgba(@primary, 0.05);
    border-radius: 8px;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }

    i {
      font-size: 1.5rem;
      color: @primary;
    }

    h4 {
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

.when-not {
  padding-left: 25px;
  margin: 15px 0;

  li {
    margin-bottom: 10px;
    position: relative;

    &::before {
      content: "•";
      color: @warning;
      font-weight: bold;
      position: absolute;
      left: -20px;
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
