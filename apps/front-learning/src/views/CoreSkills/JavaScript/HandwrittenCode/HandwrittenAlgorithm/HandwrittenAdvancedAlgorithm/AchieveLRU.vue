<template>
  <div class="lru-container">
    <div class="header">
      <h1>LRU (最近最少使用) 缓存算法</h1>
      <p class="subtitle">一种高效的内存管理策略</p>
    </div>

    <div class="content-wrapper">
      <div class="algorithm-section">
        <div class="section">
          <h2>算法介绍</h2>
          <div class="card">
            <p>
              LRU (Least Recently Used)
              是一种缓存淘汰策略，移除最近最少使用的项目以腾出空间给新项目。
            </p>
            <p>
              核心思想：如果一个数据在最近一段时间没有被访问到，那么在将来它被访问的可能性也很小。
            </p>
            <div class="features">
              <div class="feature-item">
                <div class="feature-icon">📌</div>
                <h3>应用场景</h3>
                <p>浏览器缓存、数据库缓存、操作系统页面置换、Redis内存管理等</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">⚙️</div>
                <h3>时间效率</h3>
                <p>插入和访问操作时间复杂度为 O(1)</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📏</div>
                <h3>空间效率</h3>
                <p>空间复杂度为 O(n)，n为缓存容量</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>实现思路</h2>
          <div class="card">
            <div class="implementation-points">
              <div class="point">
                <div class="point-number">1</div>
                <p>使用双向链表维护缓存项的访问顺序：</p>
                <ul>
                  <li>最近访问的节点置于链表头部</li>
                  <li>最近最少使用的节点位于链表尾部</li>
                </ul>
              </div>
              <div class="point">
                <div class="point-number">2</div>
                <p>使用哈希表提供 O(1) 时间复杂度的查找：</p>
                <ul>
                  <li>键映射到链表中的节点</li>
                  <li>快速定位节点位置</li>
                </ul>
              </div>
              <div class="point">
                <div class="point-number">3</div>
                <p>核心操作：</p>
                <ul>
                  <li><strong>访问(get)</strong>：将节点移至链表头部</li>
                  <li><strong>添加(put)</strong>：若存在则更新并移至头部，若不存在则创建新节点</li>
                  <li><strong>淘汰</strong>：当缓存满时，移除链表尾部节点</li>
                </ul>
              </div>
              <div class="point">
                <div class="point-number">4</div>
                <p>数据结构关系图：</p>
                <div class="diagram">
                  <div class="hash-table">
                    <div class="hash-title">HashMap</div>
                    <div class="hash-row">
                      <div class="hash-key">Key1</div>
                      <div class="hash-arrow">→</div>
                      <div class="hash-value">Node1</div>
                    </div>
                    <div class="hash-row">
                      <div class="hash-key">Key2</div>
                      <div class="hash-arrow">→</div>
                      <div class="hash-value">Node2</div>
                    </div>
                    <div class="hash-row">
                      <div class="hash-key">...</div>
                      <div class="hash-arrow">→</div>
                      <div class="hash-value">...</div>
                    </div>
                  </div>
                  <div class="linked-list">
                    <div class="node head-node">
                      <div class="node-header">Head</div>
                    </div>
                    <div class="node">
                      <div class="node-header">Node1 (最近使用)</div>
                      <div class="node-content">Key: Key1<br />Value: Value1</div>
                    </div>
                    <div class="node">
                      <div class="node-header">Node2</div>
                      <div class="node-content">Key: Key2<br />Value: Value2</div>
                    </div>
                    <div class="node tail-node">
                      <div class="node-header">Tail (最近最少使用)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>JavaScript 实现代码</h2>
          <div class="card">
            <pre class="code-block"><code>class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    // 更新记录为最近使用
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // 删除旧值
    } else if (this.cache.size >= this.capacity) {
      // 删除最久未使用的记录（Map第一个键）
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value); // 添加新记录
  }

  // 获取当前缓存内容（用于展示）
  getEntries() {
    return Array.from(this.cache.entries()).reverse();
  }
}</code></pre>
          </div>
        </div>
      </div>

      <div class="visualization-section">
        <h2>LRU 可视化交互演示</h2>
        <div class="demo-card">
          <div class="cache-controls">
            <div class="control-group">
              <label for="capacity">缓存容量：</label>
              <input
                type="number"
                id="capacity"
                v-model.number="cacheCapacity"
                min="2"
                max="10"
                @change="resetCache"
              />
            </div>
            <div class="control-group">
              <label for="key">键：</label>
              <input type="text" id="key" v-model.trim="newKey" placeholder="输入键..." />
            </div>
            <div class="control-group">
              <label for="value">值：</label>
              <input type="text" id="value" v-model.trim="newValue" placeholder="输入值..." />
            </div>
            <div class="button-group">
              <button class="btn put-btn" @click="putItem">添加缓存 (PUT)</button>
              <button class="btn get-btn" @click="getItem">获取缓存 (GET)</button>
              <button class="btn reset-btn" @click="resetCache">重置缓存</button>
            </div>
          </div>

          <div class="cache-status">
            <div class="status-item">
              <span class="status-label">当前大小：</span>
              <span class="status-value">{{ cacheSize }} / {{ cacheCapacity }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">操作结果：</span>
              <span class="status-value">{{ operationResult || '-' }}</span>
            </div>
          </div>

          <div class="cache-display">
            <div class="cache-header">
              <div class="cache-title">缓存内容 (最近使用 → 最近最少使用)</div>
            </div>
            <div class="cache-items-wrapper">
              <div
                v-for="(item, index) in cacheEntries"
                :key="index"
                class="cache-item"
                :class="{
                  'new-item': item.isNew,
                  'accessed-item': item.isAccessed,
                }"
              >
                <div class="item-header">
                  <span class="item-key">{{ item.key }}</span>
                  <span class="item-timestamp">{{ item.timestamp }}</span>
                </div>
                <div class="item-value">{{ item.value }}</div>
              </div>
              <div v-if="cacheEntries.length === 0" class="empty-cache">
                缓存为空，请添加项目...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

class LRUCache {
  capacity: number
  cache: Map<string, any>

  constructor(capacity: number) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key: string): any {
    if (!this.cache.has(key)) return -1

    // 更新记录为最近使用
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)

    return value
  }

  put(key: string, value: any): void {
    if (this.cache.has(key)) {
      this.cache.delete(key) // 删除旧值
    } else if (this.cache.size >= this.capacity) {
      // 删除最久未使用的记录（Map第一个键）
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey as string)
    }
    this.cache.set(key, value) // 添加新记录
  }

  // 获取当前缓存内容（用于展示）
  getEntries(): any[] {
    return Array.from(this.cache.entries())
      .map(([key, value]) => ({
        key,
        value,
        timestamp: new Date().toLocaleTimeString(),
      }))
      .reverse()
  }
}

// 响应式数据
const cacheCapacity = ref(4)
const newKey = ref('')
const newValue = ref('')
const operationResult = ref('')
const lruCache = ref<LRUCache | null>(null)
const lastOperation = ref({ type: '', key: '' })

// 初始化缓存
const initCache = () => {
  lruCache.value = new LRUCache(cacheCapacity.value)
}

// 重置缓存
const resetCache = () => {
  initCache()
  lastOperation.value = { type: '', key: '' }
  operationResult.value = '缓存已重置'
  setTimeout(() => (operationResult.value = ''), 2000)
}

// 获取当前缓存大小
const cacheSize = computed(() => {
  return lruCache.value ? lruCache.value.cache.size : 0
})

// 获取缓存条目（带标记）
const cacheEntries = computed(() => {
  if (!lruCache.value) return []

  const entries: any[] = lruCache.value.getEntries()

  // 标记新增和访问的项目
  return entries.map((entry) => {
    return {
      ...entry,
      isNew: lastOperation.value.type === 'put' && lastOperation.value.key === entry.key,
      isAccessed: lastOperation.value.type === 'get' && lastOperation.value.key === entry.key,
    }
  })
})

// 添加项目到缓存
const putItem = () => {
  if (!newKey.value || !newValue.value) {
    operationResult.value = '键和值不能为空'
    return
  }

  if (!lruCache.value) initCache()

  const existed = lruCache.value!.cache.has(newKey.value)
  lruCache.value!.put(newKey.value, newValue.value)

  lastOperation.value = { type: 'put', key: newKey.value }
  operationResult.value = existed
    ? `更新键 "${newKey.value}" 的值为 "${newValue.value}"`
    : `添加新键 "${newKey.value}" 值为 "${newValue.value}"`

  // 清空输入
  newKey.value = ''
  newValue.value = ''
}

// 从缓存获取项目
const getItem = () => {
  if (!newKey.value) {
    operationResult.value = '请输入要获取的键'
    return
  }

  if (!lruCache.value) {
    operationResult.value = '缓存未初始化'
    return
  }

  const value = lruCache.value.get(newKey.value)

  if (value === -1) {
    operationResult.value = `键 "${newKey.value}" 不存在`
  } else {
    lastOperation.value = { type: 'get', key: newKey.value }
    operationResult.value = `获取键 "${newKey.value}" 的值为 "${value}"`
  }

  newKey.value = ''
}

// 初始化
onMounted(initCache)
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@success-color: #4ade80;
@warning-color: #facc15;
@danger-color: #f87171;
@light-bg: #f8fafc;
@card-bg: #ffffff;
@text-color: #334155;
@border-color: #e2e8f0;
@shadow:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);

.lru-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: @text-color;
  background-color: @light-bg;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

.section {
  margin-bottom: 32px;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: @secondary-color;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid @accent-color;
  }
}

.card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: @shadow;
  padding: 24px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  p {
    line-height: 1.7;
    margin-bottom: 16px;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.feature-item {
  background: lighten(@light-bg, 1%);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid @border-color;

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: @primary-color;
  }

  p {
    font-size: 0.95rem;
    margin-bottom: 0;
    color: lighten(@text-color, 10%);
  }
}

.implementation-points {
  .point {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }

  .point-number {
    width: 36px;
    height: 36px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
    margin-right: 16px;
  }

  ul {
    padding-left: 20px;
    margin-top: 8px;

    li {
      margin-bottom: 6px;
      line-height: 1.5;
    }
  }
}

.diagram {
  display: flex;
  gap: 24px;
  margin-top: 16px;
  padding: 16px;
  background: lighten(@light-bg, 1%);
  border-radius: 8px;
  overflow-x: auto;

  .hash-table {
    min-width: 200px;

    .hash-title {
      font-weight: 600;
      margin-bottom: 8px;
      color: @secondary-color;
    }

    .hash-row {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-bottom: 1px solid @border-color;

      &:last-child {
        border-bottom: none;
      }
    }

    .hash-key {
      padding: 4px 8px;
      background: lighten(@accent-color, 35%);
      border-radius: 4px;
      font-weight: 500;
    }

    .hash-arrow {
      margin: 0 8px;
      color: @primary-color;
    }
  }

  .linked-list {
    display: flex;
    gap: 16px;
    align-items: center;

    .node {
      min-width: 150px;
      border: 2px solid @primary-color;
      border-radius: 8px;
      overflow: hidden;

      .node-header {
        background: @primary-color;
        color: white;
        padding: 8px 12px;
        font-size: 0.9rem;
        font-weight: 500;
      }

      .node-content {
        padding: 12px;
        font-size: 0.9rem;
      }
    }

    .head-node,
    .tail-node {
      min-width: 100px;
      background: @light-bg;
      border: 2px dashed @border-color;

      .node-header {
        background: @light-bg;
        color: @text-color;
        font-weight: 600;
      }
    }
  }
}

.code-block {
  background: #2d3748;
  border-radius: 8px;
  padding: 18px;
  overflow-x: auto;
  color: #e2e8f0;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;

  code {
    display: block;
  }
}

.visualization-section {
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: @secondary-color;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid @accent-color;
  }
}

.demo-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: @shadow;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cache-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.control-group {
  display: flex;
  flex-direction: column;

  label {
    font-weight: 500;
    margin-bottom: 6px;
    color: @text-color;
  }

  input {
    padding: 10px 12px;
    border: 1px solid @border-color;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: @primary-color;
      box-shadow: 0 0 0 3px fade(@primary-color, 20%);
    }
  }
}

.button-group {
  display: flex;
  gap: 12px;
  align-self: flex-end;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
}

.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
}

.put-btn {
  background: @primary-color;
  color: white;

  &:hover {
    background: darken(@primary-color, 5%);
    box-shadow: 0 4px 6px fade(@primary-color, 20%);
  }
}

.get-btn {
  background: @success-color;
  color: white;

  &:hover {
    background: darken(@success-color, 5%);
    box-shadow: 0 4px 6px fade(@success-color, 20%);
  }
}

.reset-btn {
  background: @light-bg;
  color: @text-color;
  border: 1px solid @border-color;

  &:hover {
    background: darken(@light-bg, 2%);
  }
}

.cache-status {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: lighten(@light-bg, 1%);
  border-radius: 8px;
  border: 1px solid @border-color;

  .status-item {
    display: flex;
    align-items: center;
  }

  .status-label {
    font-weight: 500;
    color: @text-color;
  }

  .status-value {
    font-weight: 600;
    margin-left: 8px;
    color: @primary-color;
  }
}

.cache-display {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: @light-bg;
  border-radius: 8px;
  border: 1px solid @border-color;
  overflow: hidden;
}

.cache-header {
  padding: 14px 20px;
  background: @primary-color;
  color: white;
  font-weight: 600;
}

.cache-items-wrapper {
  flex-grow: 1;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  align-content: flex-start;
  max-height: 400px;
  overflow-y: auto;
}

.cache-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid @border-color;
  transition: all 0.3s ease;
  animation: fadeIn 0.4s ease-out;

  &.new-item {
    border: 2px solid @success-color;
    box-shadow: 0 0 0 3px fade(@success-color, 20%);
    animation: highlight 1.5s ease;
  }

  &.accessed-item {
    border: 2px solid @accent-color;
    box-shadow: 0 0 0 3px fade(@accent-color, 20%);
    animation: highlight 1.5s ease;
  }
}

.item-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  background: fade(@primary-color, 8%);
  border-bottom: 1px solid @border-color;
}

.item-key {
  font-weight: 600;
  color: @primary-color;
}

.item-timestamp {
  font-size: 0.75rem;
  color: lighten(@text-color, 30%);
}

.item-value {
  padding: 14px 12px;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 500;
}

.empty-cache {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  color: lighten(@text-color, 40%);
  font-style: italic;
  grid-column: 1 / -1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes highlight {
  0% {
    box-shadow: 0 0 0 0 fade(@success-color, 50%);
  }
  50% {
    box-shadow: 0 0 0 8px fade(@success-color, 0%);
  }
  100% {
    box-shadow: none;
  }
}
</style>
