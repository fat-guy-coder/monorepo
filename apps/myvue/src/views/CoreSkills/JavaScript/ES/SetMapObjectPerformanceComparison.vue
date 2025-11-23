<template>
  <div class="performance-comparison">
    <header class="docs-header">
      <h1>Set、Map、Object 性能对比分析</h1>
      <p class="subtitle">深入解析三种数据结构的性能差异</p>
    </header>

    <Nav :list="sections" />

    <div class="content-wrapper">
      <!-- 概述 -->
      <section id="overview" class="method-card">
        <h2>🔍 概述</h2>
        <div class="info-box">
          <h3>为什么需要性能比较？</h3>
          <p>
            在 JavaScript 开发中，Set、Map 和 Object
            都是常用的数据结构，但它们在不同场景下的性能表现差异很大。了解这些差异可以帮助我们选择最适合的数据结构。
          </p>

          <h3>测试维度</h3>
          <ul>
            <li><strong>查询性能：</strong>查找元素的速度</li>
            <li><strong>添加性能：</strong>插入新元素的速度</li>
            <li><strong>删除性能：</strong>移除元素的速度</li>
            <li><strong>修改性能：</strong>更新元素的速度</li>
            <li><strong>内存占用：</strong>不同数据量下的内存使用情况</li>
          </ul>
        </div>
      </section>

      <!-- 数据结构特点 -->
      <section id="features" class="method-card">
        <h2>🎯 数据结构特点</h2>
        <div class="features-grid">
          <div class="feature-item">
            <h3>Object</h3>
            <div class="feature-content">
              <h4>优点</h4>
              <ul>
                <li>键值对存储，支持复杂键</li>
                <li>JSON 序列化支持</li>
                <li>广泛兼容性</li>
              </ul>
              <h4>缺点</h4>
              <ul>
                <li>键只能是字符串或 Symbol</li>
                <li>原型链查找开销</li>
                <li>属性遍历顺序不确定</li>
              </ul>
            </div>
          </div>

          <div class="feature-item">
            <h3>Map</h3>
            <div class="feature-content">
              <h4>优点</h4>
              <ul>
                <li>键可以是任意类型</li>
                <li>插入顺序保持</li>
                <li>更好的性能</li>
                <li>专门的迭代方法</li>
              </ul>
              <h4>缺点</h4>
              <ul>
                <li>ES6+ 支持</li>
                <li>JSON 序列化需要转换</li>
                <li>内存占用相对较高</li>
              </ul>
            </div>
          </div>

          <div class="feature-item">
            <h3>Set</h3>
            <div class="feature-content">
              <h4>优点</h4>
              <ul>
                <li>唯一值集合</li>
                <li>插入顺序保持</li>
                <li>高效的查找和删除</li>
                <li>专门的方法（has, add, delete）</li>
              </ul>
              <h4>缺点</h4>
              <ul>
                <li>只能存储值，不能键值对</li>
                <li>ES6+ 支持</li>
                <li>不支持索引访问</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能测试 -->
      <section id="performance-tests" class="method-card highlight">
        <h2>⚡ 性能测试结果</h2>

        <div class="performance-results">
          <!-- 获取性能 -->
          <div class="performance-section">
            <h3>🔍 获取性能对比(耗时ms)</h3>
            <div class="chart-container">
              <canvas ref="accessChart" id="accessChart" width="800" height="400"></canvas>
            </div>
            <div class="results-table">
              <table>
                <thead>
                  <tr>
                    <th>数据量</th>
                    <th>Array (ms)</th>
                    <th>Object (ms)</th>
                    <th>Map (ms)</th>
                    <th>Set (ms)</th>
                    <th>最快</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, size) in testResults.access" :key="size">
                    <td>{{ result.size }}</td>
                    <td>{{ result.arrayRange }}</td>
                    <td>{{ result.objectRange }}</td>
                    <td>{{ result.mapRange }}</td>
                    <td>{{ result.setRange }}</td>
                    <td class="fastest">{{ result.fastest }}</td>
                    <td>{{ result.note }}</td>
                  </tr>
                </tbody>
              </table>
              <p class="note">备注：Map访问最快，array次之，object最慢</p>
            </div>
          </div>
          <!-- 查询性能 -->
          <div class="performance-section">
            <h3>🔍 查询性能对比(耗时ms)</h3>
            <div class="chart-container">
              <canvas ref="queryChart" width="800" height="400"></canvas>
            </div>
            <div class="results-table">
              <table>
                <thead>
                  <tr>
                    <th>数据量</th>
                    <th>Array (ms)</th>
                    <th>Object (ms)</th>
                    <th>Map (ms)</th>
                    <th>Set (ms)</th>
                    <th>最快</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, size) in testResults.query" :key="size">
                    <td>{{ result.size }}</td>
                    <td>{{ result.arrayRange }}</td>
                    <td>{{ result.objectRange }}</td>
                    <td>{{ result.mapRange }}</td>
                    <td>{{ result.setRange }}</td>
                    <td class="fastest">{{ result.fastest }}</td>
                    <td>{{ result.note }}</td>
                  </tr>
                </tbody>
              </table>
              <p class="note">备注：Map和Set查询最快，object次之，array最慢O(n)</p>
            </div>
          </div>

          <!-- 添加性能 -->
          <div class="performance-section">
            <h3>➕ 添加性能对比(耗时ms)</h3>
            <div class="chart-container">
              <canvas ref="addChart" width="800" height="400"></canvas>
            </div>
            <div class="results-table">
              <table>
                <thead>
                  <tr>
                    <th>数据量</th>
                    <th>Array (ms)</th>
                    <th>Object (ms)</th>
                    <th>Map (ms)</th>
                    <th>Set (ms)</th>
                    <th>最快</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, size) in testResults.add" :key="size">
                    <td>{{ result.size }}</td>
                    <td>{{ result.arrayRange }}</td>
                    <td>{{ result.objectRange }}</td>
                    <td>{{ result.mapRange }}</td>
                    <td>{{ result.setRange }}</td>
                    <td class="fastest">{{ result.fastest }}</td>
                    <td>{{ result.note }}</td>
                  </tr>
                </tbody>
              </table>
              <p class="note">
                备注：array添加最快<b>这是push的性能</b>，Map和Set次之，object次之，<b
                  >乱序加入array最慢O(n)</b
                >
              </p>
            </div>
          </div>

          <!-- 删除性能 -->
          <div class="performance-section">
            <h3>🗑️ 删除性能对比(耗时ms)</h3>
            <div class="chart-container">
              <canvas ref="deleteChart" width="800" height="400"></canvas>
            </div>
            <div class="results-table">
              <table>
                <thead>
                  <tr>
                    <th>数据量</th>
                    <th>Array (ms)</th>
                    <th>Object (ms)</th>
                    <th>Map (ms)</th>
                    <th>Set (ms)</th>
                    <th>最快</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, size) in testResults.delete" :key="size">
                    <td>{{ size }}</td>
                    <td>{{ result.arrayRange }}</td>
                    <td>{{ result.objectRange }}</td>
                    <td>{{ result.mapRange }}</td>
                    <td>{{ result.setRange }}</td>
                    <td class="fastest">{{ result.fastest }}</td>
                    <td>{{ result.note }}</td>
                  </tr>
                </tbody>
              </table>
              <p class="note">备注：Map和Set最快，object次之，array最慢O(n)</p>
            </div>
          </div>

          <!-- 修改性能 -->
          <div class="performance-section">
            <h3>✏️ 修改性能对比(耗时ms)</h3>
            <div class="chart-container">
              <canvas ref="updateChart" width="800" height="400"></canvas>
            </div>
            <div class="results-table">
              <table>
                <thead>
                  <tr>
                    <th>数据量</th>
                    <th>Array (ms)</th>
                    <th>Object (ms)</th>
                    <th>Map (ms)</th>
                    <th>Set (ms)</th>
                    <th>最快</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, size) in testResults.update" :key="size">
                    <td>{{ size }}</td>
                    <td>{{ result.arrayRange }}</td>
                    <td>{{ result.objectRange }}</td>
                    <td>{{ result.mapRange }}</td>
                    <td>{{ result.setRange }}</td>
                    <td class="fastest">{{ result.fastest }}</td>
                    <td>{{ result.note }}</td>
                  </tr>
                </tbody>
              </table>
              <p class="note">备注：array最快，Map和Set次之，object最慢</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能分析 -->
      <section id="analysis" class="method-card">
        <h2>📊 性能分析</h2>
        <div class="analysis-grid">
          <div class="analysis-item">
            <h3>综合性能</h3>
            <ul>
              <li><strong>Array：</strong>{{ testResults.summary.Array }}</li>
              <li><strong>Object：</strong>{{ testResults.summary.Object }}</li>
            </ul>
          </div>
          <div class="analysis-item">
            <h3>综合性能</h3>
            <ul>
              <li><strong>Map：</strong>{{ testResults.summary.Map }}</li>
              <li><strong>Set：</strong>{{ testResults.summary.Set }}</li>
            </ul>
          </div>
          <div class="analysis-item">
            <h3>小数据量 (10-1000)</h3>
            <ul>
              <li><strong>Array：</strong>性能最佳，原生实现</li>
              <li><strong>Object：</strong>性能最佳，原生实现</li>
              <li><strong>Map：</strong>性能接近 Object</li>
              <li><strong>Set：</strong>查找性能优秀</li>
            </ul>
          </div>

          <div class="analysis-item">
            <h3>中等数据量 (1000-10000)</h3>
            <ul>
              <li><strong>Array：</strong>性能最佳，原生实现</li>
              <li><strong>Map：</strong>开始显现优势</li>
              <li><strong>Set：</strong>唯一值场景最佳</li>
              <li><strong>Object：</strong>性能开始下降</li>
            </ul>
          </div>

          <div class="analysis-item">
            <h3>大数据量 (10000+)</h3>
            <ul>
              <li><strong>Array：</strong>性能最佳，原生实现</li>
              <li><strong>Map：</strong>综合性能最佳</li>
              <li><strong>Set：</strong>查找和删除最快</li>
              <li><strong>Object：</strong>性能明显下降</li>
            </ul>
          </div>
          <div class="analysis-item">
            <h3>使用建议</h3>
            <ul>
              <li
                v-for="recommendation in testResults.summary.recommendations"
                :key="recommendation"
              >
                {{ recommendation }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 使用建议 -->
      <section id="recommendations" class="method-card highlight">
        <h2>💡 使用建议</h2>
        <div class="recommendations-grid">
          <div class="recommendation-item">
            <h3>选择 Object 的场景</h3>
            <CodeBlock :code="objectUseCases" language="js" />
            <ul>
              <li>需要 JSON 序列化</li>
              <li>键是简单的字符串</li>
              <li>数据量较小（< 1000）</li>
              <li>需要兼容旧浏览器</li>
            </ul>
          </div>

          <div class="recommendation-item">
            <h3>选择 Map 的场景</h3>
            <CodeBlock :code="mapUseCases" language="js" />
            <ul>
              <li>键是对象或其他复杂类型</li>
              <li>需要保持插入顺序</li>
              <li>频繁的增删操作</li>
              <li>大数据量场景</li>
            </ul>
          </div>

          <div class="recommendation-item">
            <h3>选择 Set 的场景</h3>
            <CodeBlock :code="setUseCases" language="js" />
            <ul>
              <li>需要存储唯一值</li>
              <li>频繁的查找操作</li>
              <li>去重场景</li>
              <li>集合运算</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 代码示例 -->
      <section id="examples" class="method-card">
        <h2>💻 实际应用示例</h2>
        <div class="examples-grid">
          <div class="example-item">
            <h3>缓存实现</h3>
            <CodeBlock :code="cacheExample" language="js" />
          </div>

          <div class="example-item">
            <h3>事件监听器管理</h3>
            <CodeBlock :code="eventListenerExample" language="js" />
          </div>

          <div class="example-item">
            <h3>数据去重</h3>
            <CodeBlock :code="deduplicationExample" language="js" />
          </div>

          <div class="example-item">
            <h3>配置管理</h3>
            <CodeBlock :code="configExample" language="js" />
          </div>
        </div>
      </section>

      <!-- 内存占用 -->
      <section id="memory" class="method-card">
        <h2>💾 内存占用对比</h2>
        <div class="memory-info">
          <div class="memory-item">
            <h3>内存占用特点</h3>
            <ul>
              <li><strong>Object：</strong>内存占用最小，但原型链开销</li>
              <li><strong>Map：</strong>内存占用中等，但性能稳定</li>
              <li><strong>Set：</strong>内存占用相对较高，但查找极快</li>
            </ul>
          </div>
          <div class="memory-item">
            <h3>优化建议</h3>
            <ul>
              <li>及时清理不需要的数据</li>
              <li>使用 WeakMap/WeakSet 避免内存泄漏</li>
              <li>考虑数据结构的生命周期</li>
              <li>监控内存使用情况</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CodeBlock from '@/components/Code/index.vue'
import Nav from '@/components/Nav/ScrollNav.vue'
import testResults from '../JSON/dataStructurePerformence.json'

const sections = [
  { id: 'overview', name: '概述' },
  { id: 'features', name: '数据结构特点' },
  { id: 'performance-tests', name: '性能测试' },
  { id: 'analysis', name: '性能分析' },
  { id: 'recommendations', name: '使用建议' },
  { id: 'examples', name: '实际应用' },
  { id: 'memory', name: '内存占用' },
]

onMounted(() => {
  drawCharts()
})

type Operation = 'query' | 'add' | 'delete' | 'update'

type TestResults = {
  [index in Operation]: {
    arrayAverage: number
    arrayRange: string
    objectAverage: number
    objectRange: string
    mapAverage: number
    mapRange: string
    setAverage: number
    setRange: string
    size: '1万次' | '10万次' | '100万次' | '1000万次' | '1亿次'
    fastest: 'Object' | 'Map' | 'Set' | 'array'
    note: string
  }[]

  // totalTests: number
}

const accessChart = ref<HTMLCanvasElement>()
const queryChart = ref<HTMLCanvasElement>()
const addChart = ref<HTMLCanvasElement>()
const deleteChart = ref<HTMLCanvasElement>()
const updateChart = ref<HTMLCanvasElement>()

interface OperationResult {
  arrayAverage: number
  arrayRange: string
  objectAverage: number
  objectRange: string
  mapAverage: number
  mapRange: string
  setAverage: number
  setRange: string
  size: '1万次' | '10万次' | '100万次' | '1000万次' | '1亿次'
  fastest: 'Object' | 'Map' | 'Set' | 'array'
  note: string
}

// 绘制图表
const drawCharts = () => {
  // 获取性能图表
  drawChart(accessChart.value!, testResults.access as OperationResult[])
  // 查询性能图表
  drawChart(queryChart.value!, testResults.query as OperationResult[])

  // 添加性能图表
  drawChart(addChart.value!, testResults.add as OperationResult[])

  // 删除性能图表
  drawChart(deleteChart.value!, testResults.delete as OperationResult[])

  // 修改性能图表
  drawChart(updateChart.value!, testResults.update as OperationResult[])
}

const colors = {
  object: '#ef4444',
  map: '#3b82f6',
  set: '#10b981',
  array: '#8b5cf6',
}

// 绘制单个图表
const drawChart = (canvas: HTMLCanvasElement, data: TestResults[Operation]) => {
  const ctx = canvas.getContext('2d')!

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制标题

  // 绘制图例
  // const legendY = 50
  // ctx.font = '12px Arial'
  // ctx.fillStyle = colors.object
  // ctx.fillText('Object', 100, legendY)
  // ctx.fillStyle = colors.map
  // ctx.fillText('Map', 200, legendY)
  // ctx.fillStyle = colors.set
  // ctx.fillText('Set', 300, legendY)

  const length = data.length

  // 绘制数据
  const chartWidth = canvas.width
  const chartHeight = canvas.height
  const gap = 80

  const barWidth = (chartWidth - gap * 3) / (length * 4)

  data.forEach((item, index) => {
    const currentGap = index === 0 ? 0 : index === 1 ? gap : index === 2 ? gap * 2 : gap * 3
    const x = index * ((chartWidth - gap * 3) / length) + currentGap
    const maxValue = Math.max(
      item.objectAverage,
      item.mapAverage,
      item.setAverage,
      item.arrayAverage,
    )

    drawBar()

    function drawBar() {
      // Array
      const arrayHeight = (item.arrayAverage / maxValue) * chartHeight || 2
      ctx.fillStyle = colors.array
      ctx.fillRect(x, canvas.height - 50 - arrayHeight, barWidth, arrayHeight)

      // Object
      const objHeight = (item.objectAverage / maxValue) * chartHeight || 2
      ctx.fillStyle = colors.object
      ctx.fillRect(x + barWidth, canvas.height - 50 - objHeight, barWidth, objHeight)

      // Map
      const mapHeight = (item.mapAverage / maxValue) * chartHeight || 2
      ctx.fillStyle = colors.map
      ctx.fillRect(x + barWidth * 2, canvas.height - 50 - mapHeight, barWidth, mapHeight)

      // Set
      const setHeight = (item.setAverage / maxValue) * chartHeight || 2
      ctx.fillStyle = colors.set
      ctx.fillRect(x + barWidth * 3, canvas.height - 50 - setHeight, barWidth, setHeight)
    }

    // 标签
    ctx.fillStyle = '#6b7280'
    ctx.fillText(item.size.toString(), x + barWidth * 1.5, canvas.height - 30)

    //颜色小方块
    ctx.fillStyle =
      index === 0
        ? colors.array
        : index === 1
          ? colors.object
          : index === 2
            ? colors.map
            : colors.set
    ctx.fillRect(x + barWidth * 1.5, canvas.height - 25, 50, 30)

    // 标签
    ctx.fillStyle = '#fff'
    ctx.font = '12px Arial'
    ctx.fillText(
      index === 0 ? 'Array' : index === 1 ? 'Object' : index === 2 ? 'Map' : 'Set',
      x + barWidth * 1.5,
      canvas.height - 10,
    )
  })
}

// 代码示例
const objectUseCases = `
// 配置对象
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

// 用户信息
const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
};

// 缓存
const cache = {};
cache['user:1'] = userData;
`.trim()

const mapUseCases = `
// 事件监听器管理
const eventListeners = new Map();
eventListeners.set(button, handler);

// 对象作为键
const userSessions = new Map();
userSessions.set(userObject, sessionData);

// 复杂数据结构
const metadata = new Map();
metadata.set(document, { scrollPosition: 100 });
`.trim()

const setUseCases = `
// 去重
const uniqueIds = new Set([1, 2, 2, 3, 3, 4]);

// 权限检查
const allowedRoles = new Set(['admin', 'moderator']);

// 集合运算
const set1 = new Set([1, 2, 3]);
const set2 = new Set([2, 3, 4]);
const intersection = new Set([...set1].filter(x => set2.has(x)));
`.trim()

const cacheExample = `
// 高性能缓存实现
class Cache {
  constructor() {
    this.map = new Map();
    this.maxSize = 1000;
  }

  set(key, value) {
    if (this.map.size >= this.maxSize) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
    this.map.set(key, value);
  }

  get(key) {
    return this.map.get(key);
  }

  has(key) {
    return this.map.has(key);
  }
}
`.trim()

const eventListenerExample = `
// 事件监听器管理
class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  addListener(element, event, handler) {
    if (!this.listeners.has(element)) {
      this.listeners.set(element, new Map());
    }

    const elementListeners = this.listeners.get(element);
    if (!elementListeners.has(event)) {
      elementListeners.set(event, new Set());
    }

    elementListeners.get(event).add(handler);
    element.addEventListener(event, handler);
  }

  removeListener(element, event, handler) {
    const elementListeners = this.listeners.get(element);
    if (elementListeners) {
      const eventHandlers = elementListeners.get(event);
      if (eventHandlers) {
        eventHandlers.delete(handler);
        element.removeEventListener(event, handler);
      }
    }
  }
}
`.trim()

const deduplicationExample = `
// 数组去重
function deduplicateArray(arr) {
  return [...new Set(arr)];
}

// 对象数组去重
function deduplicateObjects(arr, key) {
  const seen = new Set();
  return arr.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

// 高性能去重
const uniqueValues = new Set();
data.forEach(item => {
  if (!uniqueValues.has(item.id)) {
    uniqueValues.add(item.id);
    // 处理唯一项
  }
});
`.trim()

const configExample = `
// 配置管理
class ConfigManager {
  constructor() {
    this.config = new Map();
    this.defaults = new Map();
  }

  set(key, value) {
    this.config.set(key, value);
  }

  get(key) {
    return this.config.has(key)
      ? this.config.get(key)
      : this.defaults.get(key);
  }

  setDefault(key, value) {
    this.defaults.set(key, value);
  }

  has(key) {
    return this.config.has(key) || this.defaults.has(key);
  }

  delete(key) {
    this.config.delete(key);
  }
}
`.trim()
</script>

<style scoped lang="less">
.canvas2 {
  transform-style: preserve-3d;
  transform: rotateZ(180deg) rotateY(180deg);
}
.performance-comparison {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  line-height: 1.5;
  color: #2c3e50;
  background: #f8f9fa;
  min-height: 100vh;
  position: relative;
}

.docs-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 8px;
  color: white;
  box-shadow: 0 2px 10px rgba(79, 70, 229, 0.2);

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    color: white;
  }

  .subtitle {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 400;
  }
}

.content-wrapper {
  display: grid;
  gap: 1rem;
}

.method-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &.highlight {
    border: 2px solid #4f46e5;
    background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  }

  h2 {
    color: #1f2937;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  h3 {
    color: #374151;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
  }

  h4 {
    color: #6b7280;
    font-size: 1rem;
    font-weight: 500;
    margin: 0.75rem 0 0.25rem 0;
  }
}

.info-box {
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  padding: 1rem;
  border-radius: 6px;
  border-left: 3px solid #4f46e5;
  margin-bottom: 1rem;

  h3 {
    color: #1f2937;
    margin-top: 0;
    font-size: 1.1rem;
  }

  ul {
    margin: 0.75rem 0;
    padding-left: 1.25rem;

    li {
      margin-bottom: 0.25rem;
      line-height: 1.5;
      font-size: 0.95rem;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.note {
  color: #6b7280;
  font-size: 1.5rem;
  margin-top: 1rem;
}

.feature-item {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;

  h3 {
    color: #1f2937;
    margin-top: 0;
    font-size: 1.2rem;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .feature-content {
    h4 {
      color: #374151;
      margin: 0.75rem 0 0.25rem 0;
      font-size: 0.95rem;
    }

    ul {
      margin: 0.5rem 0;
      padding-left: 1rem;
      font-size: 0.9rem;

      li {
        margin-bottom: 0.25rem;
        color: #6b7280;
      }
    }
  }
}

.test-controls {
  text-align: center;
  margin-bottom: 1.5rem;

  .test-btn {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .test-summary {
    margin-top: 1rem;
    color: #6b7280;
    font-size: 0.9rem;
  }
}

.performance-section {
  margin-bottom: 2rem;

  h3 {
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .chart-container {
    margin: 1rem 0;
    background: white;
    border-radius: 6px;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    overflow-x: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .chart-canvas {
      margin: 0 auto;
    }
    .chart-button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
      gap: 10px;
      .chart-button-item {
        width: 100px;
        height: 30px;
        border-radius: 5px;
        display: flex;
        color: white;
        font-size: 12px;
        font-weight: 500;
        justify-content: center;
        align-items: center;
        &:nth-child(1) {
          background: #ef4444;
        }
        &:nth-child(2) {
          background: #3b82f6;
        }
        &:nth-child(3) {
          background: #10b981;
        }
      }
    }
  }

  .results-table {
    margin-top: 1rem;

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      th,
      td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
        font-size: 0.9rem;
      }

      th {
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        color: white;
        font-weight: 600;
      }

      tr:hover {
        background: #f8faff;
      }

      .fastest {
        font-weight: 600;
        color: #10b981;
      }
    }
  }
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;

  .analysis-item {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #e5e7eb;

    h3 {
      color: #1f2937;
      margin-top: 0;
      font-size: 1.1rem;
    }

    ul {
      margin: 0.5rem 0;
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.25rem;
        color: #6b7280;
        font-size: 0.9rem;
      }
    }
  }
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .recommendation-item {
    background: white;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #e5e7eb;

    h3 {
      color: #1f2937;
      margin-top: 0;
      font-size: 1.1rem;
    }

    ul {
      margin: 0.75rem 0;
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.25rem;
        color: #6b7280;
        font-size: 0.9rem;
      }
    }
  }
}

.examples-grid {


  .example-item {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #e5e7eb;

    h3 {
      color: #1f2937;
      margin-top: 0;
      font-size: 1.1rem;
    }
  }
}

.memory-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;

  .memory-item {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #e5e7eb;

    h3 {
      color: #1f2937;
      margin-top: 0;
      font-size: 1.1rem;
    }

    ul {
      margin: 0.5rem 0;
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.25rem;
        color: #6b7280;
        font-size: 0.9rem;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .performance-comparison {
    padding: 0.75rem;
  }

  .docs-header {
    padding: 1rem;

    h1 {
      font-size: 1.75rem;
    }
  }

  .method-card {
    padding: 1rem;
  }

  .features-grid,
  .analysis-grid,
  .recommendations-grid,
  .examples-grid {
    grid-template-columns: 1fr;
  }

  .chart-container {
    canvas {
      max-width: 100%;
      height: auto;
    }
  }
}

// 代码块样式优化
:deep(.code-block) {
  margin: 0.75rem 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.85rem;
}

// 导航样式
.toc {
  position: sticky;
  top: 20px;
  right: 20px;
  z-index: 10;
  margin-bottom: 1.5rem;
}

// 紧凑的间距
p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

// 更好的视觉层次
strong {
  color: #1f2937;
  font-weight: 600;
}

// 代码高亮
code {
  background: #f1f5f9;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem;
  color: #dc2626;
}
</style>
