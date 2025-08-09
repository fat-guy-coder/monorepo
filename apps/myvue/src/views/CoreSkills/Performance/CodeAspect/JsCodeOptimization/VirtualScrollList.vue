<template>
  <div class="virtual-scroll-container">
    <!-- 头部标题区域 -->
    <header class="header">
      <h1><i class="fas fa-list-ol"></i> Vue3 虚拟滚动列表技术</h1>
      <p class="subtitle">高效渲染大型数据集，提升应用性能</p>
    </header>

    <!-- 主内容区域 -->
    <main class="content">
      <div>
        <h3>原理:直接上图</h3>
        <img :src="VirtualScrollList1" alt="虚拟滚动列表原理" />
        <img :src="VirtualScrollList" alt="虚拟滚动列表原理" />
      </div>

      <!-- 原理介绍卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-lightbulb"></i>
          <h2>虚拟滚动原理</h2>
        </div>
        <div class="card-content">
          <p>
            虚拟滚动（Virtual
            Scrolling）是一种仅渲染可见区域内元素的技术，避免渲染整个大型列表导致的性能问题。
          </p>

          <div class="highlight-box">
            <p>
              <strong>核心思想：</strong>
              只渲染用户当前可见的列表项，通过占位容器模拟整个列表的高度。
            </p>
          </div>

          <div class="visualization">
            <div class="viewport">
              <div class="visible-area">
                <div v-for="i in 5" :key="i" class="visible-item">可见项目 {{ i }}</div>
              </div>
              <div class="invisible-area top"></div>
              <div class="invisible-area bottom"></div>
            </div>
            <div class="legend">
              <div class="legend-item">
                <div class="color-box visible"></div>
                <span>可见区域（已渲染）</span>
              </div>
              <div class="legend-item">
                <div class="color-box invisible"></div>
                <span>不可见区域（未渲染）</span>
              </div>
            </div>
          </div>

          <h3>实现机制</h3>
          <ul class="key-points">
            <li>
              <i class="fas fa-check-circle success"></i>
              <p><strong>容器高度计算：</strong> 计算整个列表的总高度（项目数量 × 项目高度）</p>
            </li>
            <li>
              <i class="fas fa-check-circle success"></i>
              <p><strong>可见区域计算：</strong> 根据滚动位置确定哪些项目在视口中</p>
            </li>
            <li>
              <i class="fas fa-check-circle success"></i>
              <p><strong>动态渲染：</strong> 只渲染可见区域内的项目，其他位置用空白占位</p>
            </li>
            <li>
              <i class="fas fa-check-circle success"></i>
              <p><strong>滚动位置调整：</strong> 使用transform调整列表位置，保持滚动体验</p>
            </li>
          </ul>

          <div class="comparison">
            <div class="problem">
              <i class="fas fa-exclamation-triangle warning"></i>
              <h4>传统列表问题</h4>
              <p>渲染10,000个列表项会创建10,000个DOM节点，导致：</p>
              <ul>
                <li>内存占用高（100-500MB）</li>
                <li>渲染时间长（3-10秒）</li>
                <li>滚动卡顿（FPS低于10）</li>
              </ul>
            </div>
            <div class="solution">
              <i class="fas fa-check-circle success"></i>
              <h4>虚拟滚动解决方案</h4>
              <p>仅渲染可见的20-30个项目：</p>
              <ul>
                <li>内存占用低（5-10MB）</li>
                <li>渲染时间短（10-50ms）</li>
                <li>滚动流畅（FPS 50-60）</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Vue3实现 -->
      <section class="card">
        <div class="card-header">
          <i class="fab fa-vuejs vue-icon"></i>
          <h2>Vue3 实现</h2>
        </div>
        <div class="card-content">
          <p>在Vue3中使用Composition API实现虚拟滚动：</p>

          <pre class="code-block"><code>// 虚拟滚动组件
&lt;template&gt;
  &lt;div class="virtual-list" ref="container" @scroll="handleScroll"&gt;
    &lt;div class="list-phantom" :style="{ height: totalHeight + 'px' }"&gt;&lt;/div&gt;
    &lt;div class="list-content" :style="{ transform: `translateY(${offset}px)` }"&gt;
      &lt;div v-for="item in visibleData" :key="item.id" class="list-item"&gt;
      &#123;&#123; item.content &#125;&#125;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  data: { type: Array, required: true }, // 所有数据
  itemHeight: { type: Number, default: 50 } // 每项高度
});

const container = ref&lt;HTMLElement | null&gt;(null);
const visibleCount = ref(0); // 可见项数量
const startIndex = ref(0); // 起始索引
const offset = ref(0); // 偏移量

// 计算总高度
const totalHeight = computed(() => {
  return props.data.length * props.itemHeight;
});

// 计算可见数据
const visibleData = computed(() => {
  return props.data.slice(
    startIndex.value,
    Math.min(startIndex.value + visibleCount.value, props.data.length)
  );
});

// 处理滚动
const handleScroll = () => {
  if (!container.value) return;

  const scrollTop = container.value.scrollTop;
  startIndex.value = Math.floor(scrollTop / props.itemHeight);
  offset.value = scrollTop - (scrollTop % props.itemHeight);
};

// 初始化可见项数量
onMounted(() => {
  if (container.value) {
    visibleCount.value = Math.ceil(container.value.clientHeight / props.itemHeight);
  }
});
&lt;/script&gt;</code></pre>

          <div class="controls">
            <div class="config">
              <label>
                <span>数据量：</span>
                <input type="range" min="100" max="10000" v-model="dataSize" @input="generateData" />
                {{ dataSize }} 条
              </label>
              <label>
                <span>项目高度：</span>
                <input type="range" min="30" max="100" v-model="itemHeight" />
                {{ itemHeight }}px
              </label>
            </div>
            <div class="buttons">
              <button @click="generateData"><i class="fas fa-sync-alt"></i> 重新生成数据</button>
            </div>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="stat-value">{{ totalItems }}</div>
              <div class="stat-label">总项目数</div>
            </div>
            <div class="stat">
              <div class="stat-value">{{ renderedItems }}</div>
              <div class="stat-label">渲染项目数</div>
            </div>
            <div class="stat">
              <div class="stat-value">{{ renderTime }}ms</div>
              <div class="stat-label">渲染时间</div>
            </div>
            <div class="stat">
              <div class="stat-value">{{ memoryUsage }}MB</div>
              <div class="stat-label">内存占用</div>
            </div>
          </div>

          <!-- 虚拟滚动列表实现 -->
          <div class="virtual-list" ref="container" @scroll="handleScroll">
            <div class="list-phantom" :style="{ height: totalHeight + 'px' }"></div>
            <div class="list-content" :style="{ transform: `translateY(${offset}px)` }">
              <div v-for="item in visibleData" :key="item.id" class="list-item" :style="{ height: itemHeight + 'px' }">
                <div class="item-content">
                  <span class="item-index">#{{ item.id }}</span>
                  <span class="item-text">{{ item.text }}</span>
                  <span class="item-tag" :style="{ backgroundColor: item.color }">{{
                    item.tag
                  }}</span>
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
          <p>虚拟滚动适用于需要高效渲染大型列表的场景：</p>

          <ul class="use-cases">
            <li>
              <i class="fas fa-table"></i>
              <div>
                <h4>大型数据表格</h4>
                <p>渲染包含数千行的大型数据集</p>
              </div>
            </li>
            <li>
              <i class="fas fa-comments"></i>
              <div>
                <h4>聊天应用</h4>
                <p>显示大量聊天记录和消息</p>
              </div>
            </li>
            <li>
              <i class="fas fa-map"></i>
              <div>
                <h4>地图标记</h4>
                <p>显示大量位置标记和POI点</p>
              </div>
            </li>
            <li>
              <i class="fas fa-shopping-cart"></i>
              <div>
                <h4>电商产品列表</h4>
                <p>展示数千种商品的列表</p>
              </div>
            </li>
            <li>
              <i class="fas fa-image"></i>
              <div>
                <h4>图片库</h4>
                <p>显示大量图片的网格布局</p>
              </div>
            </li>
            <li>
              <i class="fas fa-timeline"></i>
              <div>
                <h4>时间线视图</h4>
                <p>展示大量历史事件或日志</p>
              </div>
            </li>
          </ul>

          <h3>性能对比</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>指标</th>
                  <th>传统列表 (10000项)</th>
                  <th>虚拟滚动 (10000项)</th>
                  <th>提升</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DOM节点数</td>
                  <td>10,000</td>
                  <td>20-30</td>
                  <td>99.7%</td>
                </tr>
                <tr>
                  <td>初始渲染时间</td>
                  <td>3000-5000ms</td>
                  <td>10-50ms</td>
                  <td>99%</td>
                </tr>
                <tr>
                  <td>内存占用</td>
                  <td>100-500MB</td>
                  <td>5-10MB</td>
                  <td>95%</td>
                </tr>
                <tr>
                  <td>滚动FPS</td>
                  <td>5-10</td>
                  <td>50-60</td>
                  <td>5-10倍</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>何时不需要虚拟滚动？</h3>
          <ul class="when-not">
            <li>小型列表（少于100项）</li>
            <li>项目高度不固定的情况（需要动态计算）</li>
            <li>需要完整DOM操作的项目（如复杂交互）</li>
            <li>不支持CSS transform的旧浏览器</li>
          </ul>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>Vue3 虚拟滚动列表技术 | 使用 Composition API 实现 | 提升大型应用性能</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import VirtualScrollList from '@/assets/js/virtual-list.webp'
import VirtualScrollList1 from '@/assets/js/virtual-list1.webp'

// 配置参数
const dataSize = ref(1000)
const itemHeight = ref(60)

// 数据生成
const allData = ref<any[]>([])
const generateData = () => {
  const startTime = performance.now()

  const newData = []
  const tags = ['科技', '财经', '体育', '娱乐', '教育', '健康']
  const colors = ['#4361ee', '#3f37c9', '#4895ef', '#4cc9f0', '#f72585', '#7209b7']

  for (let i = 0; i < dataSize.value; i++) {
    const tagIndex = Math.floor(Math.random() * tags.length)
    newData.push({
      id: i + 1,
      text: `列表项目 ${i + 1} - ${loremIpsum()}`,
      tag: tags[tagIndex],
      color: colors[tagIndex],
    })
  }

  allData.value = newData
  const endTime = performance.now()
  renderTime.value = (endTime - startTime).toFixed(2)
  updateMemoryUsage()
}

// 生成随机文本
const loremIpsum = () => {
  const words = [
    'Lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
  ]
  let result = ''
  const wordCount = Math.floor(Math.random() * 5) + 3 // 3-7个词
  for (let i = 0; i < wordCount; i++) {
    result += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return result.trim()
}

// 虚拟滚动实现
const container = ref<HTMLElement | null>(null)
const visibleCount = ref(0) // 可见项数量
const startIndex = ref(0) // 起始索引
const offset = ref(0) // 偏移量
const renderTime = ref('0') // 渲染时间
const memoryUsage = ref('0') // 内存占用

// 计算总高度
const totalHeight = computed(() => {
  return allData.value.length * itemHeight.value
})

// 计算可见数据
const visibleData = computed(() => {
  return allData.value.slice(
    startIndex.value,
    Math.min(startIndex.value + visibleCount.value, allData.value.length),
  )
})

// 处理滚动
const handleScroll = () => {
  if (!container.value) return

  const scrollTop = container.value.scrollTop
  startIndex.value = Math.floor(scrollTop / itemHeight.value)
  offset.value = scrollTop - (scrollTop % itemHeight.value)
}

// 初始化可见项数量
const initVisibleCount = () => {
  if (container.value) {
    visibleCount.value = Math.ceil(container.value.clientHeight / itemHeight.value) + 5
  }
}

// 更新内存使用情况
const updateMemoryUsage = () => {
  // 模拟内存使用计算
  const baseMemory = 5
  const itemMemory = allData.value.length * 0.0005
  memoryUsage.value = (baseMemory + itemMemory).toFixed(2)
}

// 计算统计数据
const totalItems = computed(() => allData.value.length)
const renderedItems = computed(() => visibleData.value.length)

// 初始化和事件监听
onMounted(() => {
  generateData()
  initVisibleCount()
  window.addEventListener('resize', initVisibleCount)
})

onUnmounted(() => {
  window.removeEventListener('resize', initVisibleCount)
})
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

.virtual-scroll-container {
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

  code {
    display: block;
    white-space: pre;
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px 0;

  .config {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
      display: flex;
      align-items: center;
      gap: 10px;

      span {
        min-width: 100px;
      }

      input[type='range'] {
        flex: 1;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
  }

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
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 20px 0;

  .stat {
    padding: 15px;
    border-radius: 8px;
    background: rgba(@primary, 0.05);
    text-align: center;

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: @primary;
    }

    .stat-label {
      font-size: 0.9rem;
      color: @text-light;
    }
  }
}

.virtual-list {
  height: 400px;
  overflow-y: auto;
  position: relative;
  border: 1px solid @border;
  border-radius: 8px;

  .list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }

  .list-content {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }

  .list-item {
    padding: 0 15px;
    border-bottom: 1px solid @border;
    display: flex;
    align-items: center;

    .item-content {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 10px 0;
    }

    .item-index {
      font-weight: bold;
      color: @primary;
      min-width: 50px;
    }

    .item-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item-tag {
      background: @primary-light;
      color: white;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      min-width: 60px;
      text-align: center;
    }

    &:nth-child(odd) {
      background: rgba(@primary, 0.03);
    }

    &:hover {
      background: rgba(@primary, 0.08);
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

    ul {
      padding-left: 25px;
      margin-top: 10px;

      li {
        margin-bottom: 5px;
      }
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
      min-width: 30px;
      text-align: center;
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
      content: '•';
      color: @warning;
      font-weight: bold;
      position: absolute;
      left: -20px;
    }
  }
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid @border;
  }

  th {
    background: rgba(@primary, 0.1);
    color: @primary;
    font-weight: 600;
  }

  tr:hover {
    background: rgba(@primary, 0.03);
  }
}

.visualization {
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .viewport {
    height: 200px;
    border: 2px solid @primary;
    border-radius: 8px;
    position: relative;
    overflow: hidden;

    .visible-area {
      position: absolute;
      top: 50%;
      left: 10%;
      right: 10%;
      height: 40%;
      background: rgba(@primary, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;

      .visible-item {
        background: @primary;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.9rem;
        width: 80%;
        text-align: center;
      }
    }

    .invisible-area {
      position: absolute;
      left: 0;
      right: 0;
      background: rgba(@text-light, 0.1);

      &.top {
        top: 0;
        height: 30%;
      }

      &.bottom {
        bottom: 0;
        height: 30%;
      }
    }
  }

  .legend {
    display: flex;
    justify-content: center;
    gap: 20px;

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;

      .color-box {
        width: 20px;
        height: 20px;
        border-radius: 4px;

        &.visible {
          background: @primary;
        }

        &.invisible {
          background: rgba(@text-light, 0.2);
        }
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
