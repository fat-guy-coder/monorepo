<template>
  <div class="lru-container">
    <header class="header">
      <h1>LRU算法基本介绍</h1>
      <p>最近最少使用缓存淘汰策略</p>
    </header>

    <div class="content">
      <div class="columns">
        <section class="section">
          <h2>核心概念</h2>
          <div class="card">
            <h3>什么是LRU?</h3>
            <p>LRU (Least Recently Used) 是一种缓存淘汰策略，当缓存空间不足时，优先移除最近最少使用的数据</p>
          </div>
          <div class="card">
            <h3>解决问题</h3>
            <ul>
              <li>缓存空间有限时的淘汰策略</li>
              <li>提高缓存命中率</li>
              <li>优化内存使用效率</li>
            </ul>
          </div>
          <div class="card">
            <h3>关键特性</h3>
            <ul>
              <li>时间复杂度：O(1) 的插入和访问</li>
              <li>空间复杂度：O(n)</li>
              <li>基于时间局部性原理</li>
            </ul>
          </div>
        </section>

        <section class="section">
          <h2>实现思路</h2>
          <div class="card">
            <h3>数据结构设计</h3>
            <div class="data-structure">
              <div class="ds-item">
                <div class="ds-label">双向链表</div>
                <div class="ds-desc">按访问时间排序，头部是最新访问，尾部是最久未访问</div>
              </div>
              <div class="ds-item">
                <div class="ds-label">哈希表</div>
                <div class="ds-desc">存储键到链表节点的映射，实现O(1)访问</div>
              </div>
            </div>
          </div>
          <div class="card">
            <h3>基本操作</h3>
            <div class="operations">
              <div class="op">
                <div class="op-title">访问数据</div>
                <ol>
                  <li>通过哈希表查找节点</li>
                  <li>将节点移到链表头部</li>
                  <li>返回节点值</li>
                </ol>
              </div>
              <div class="op">
                <div class="op-title">插入数据</div>
                <ol>
                  <li>创建新节点并添加到链表头部</li>
                  <li>将键值对存入哈希表</li>
                  <li>如果超出容量，移除链表尾部节点</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="section">
        <h2>代码实现</h2>
        <div class="code-group">
          <div class="code-block">
            <h3>节点定义</h3>
            <pre><code>class LRUNode {
  key: any;
  value: any;
  prev: LRUNode | null;
  next: LRUNode | null;

  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}</code></pre>
          </div>

          <div class="code-block">
            <h3>LRU缓存类</h3>
            <pre><code>class LRUCache {
  private capacity: number;
  private cache: Map&lt;any, LRUNode&gt;;
  private head: LRUNode;
  private tail: LRUNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    // 使用虚拟头尾节点
    this.head = new LRUNode(null, null);
    this.tail = new LRUNode(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // 将节点移到链表头部
  private moveToHead(node: LRUNode) {
    this.removeNode(node);
    this.addToHead(node);
  }

  // 从链表中移除节点
  private removeNode(node: LRUNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  // 添加节点到头部
  private addToHead(node: LRUNode) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  // 移除尾部节点
  private removeTail() {
    const node = this.tail.prev!;
    this.removeNode(node);
    return node;
  }

  // 获取数据
  get(key: any): any {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key)!;
    this.moveToHead(node);
    return node.value;
  }

  // 插入数据
  put(key: any, value: any) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToHead(node);
    } else {
      const node = new LRUNode(key, value);
      this.cache.set(key, node);
      this.addToHead(node);
      if (this.cache.size > this.capacity) {
        const tail = this.removeTail();
        this.cache.delete(tail.key);
      }
    }
  }
}</code></pre>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>使用场景</h2>
        <div class="usage-grid">
          <div class="usage-card">
            <div class="icon">💾</div>
            <h3>数据库缓存</h3>
            <p>MySQL查询缓存，Redis缓存淘汰</p>
          </div>
          <div class="usage-card">
            <div class="icon">🌐</div>
            <h3>Web服务器</h3>
            <p>Nginx反向代理缓存，CDN边缘缓存</p>
          </div>
          <div class="usage-card">
            <div class="icon">📱</div>
            <h3>移动应用</h3>
            <p>图片缓存，API响应缓存</p>
          </div>
          <div class="usage-card">
            <div class="icon">🧠</div>
            <h3>操作系统</h3>
            <p>页面置换算法，文件系统缓存</p>
          </div>
        </div>
      </section>

      <section class="section demo-section">
        <h2>LRU算法演示</h2>
        <div class="demo-container">
          <div class="controls">
            <div class="control-group">
              <label>缓存容量: {{ capacity }}</label>
              <input type="range" min="3" max="10" v-model="capacity">
            </div>
            <div class="control-group">
              <input v-model="newKey" placeholder="输入键" @keyup.enter="addItem">
              <input v-model="newValue" placeholder="输入值" @keyup.enter="addItem">
              <button @click="addItem">添加数据</button>
            </div>
            <div class="control-group">
              <input v-model="accessKey" placeholder="输入要访问的键" @keyup.enter="accessItem">
              <button @click="accessItem">访问数据</button>
              <button @click="resetCache">重置缓存</button>
            </div>
          </div>

          <div class="visualization">
            <div class="cache-display">
              <div class="cache-header">
                <div class="cache-label">LRU缓存 (容量: {{ capacity }})</div>
                <div class="cache-stats">
                  命中率: {{ hitRate }}% | 当前大小: {{ lruCache.size }}
                </div>
              </div>
              <div class="cache-body">
                <div v-for="(node, index) in cacheNodes" :key="node.key" class="cache-item" :class="{
                  'new-item': node.isNew,
                  'accessed': node.accessed
                }" @click="accessItem(node.key)">
                  <div class="cache-key">{{ node.key }}</div>
                  <div class="cache-value">{{ node.value }}</div>
                  <div class="cache-status">
                    <span v-if="index === 0">最新</span>
                    <span v-else-if="index === cacheNodes.length - 1">最久未用</span>
                  </div>
                </div>
                <div v-if="cacheNodes.length === 0" class="empty-cache">
                  缓存为空，请添加数据
                </div>
              </div>
            </div>

            <div class="operation-log">
              <h3>操作日志</h3>
              <div class="log-container">
                <div v-for="(log, index) in operationLogs" :key="index" class="log-entry">
                  {{ log }}
                </div>
                <div v-if="operationLogs.length === 0" class="empty-log">
                  暂无操作记录
                </div>
              </div>
            </div>
          </div>

          <div class="lru-explanation">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>数据访问</h4>
                <p>访问数据时，该数据项会被移动到链表头部，表示最近使用过</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>数据添加</h4>
                <p>新数据总是添加到链表头部</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>缓存淘汰</h4>
                <p>当缓存满时，移除链表尾部的数据（最近最少使用）</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';

// LRU节点类
class LRUNode {
  key: any;
  value: any;
  prev: LRUNode | null;
  next: LRUNode | null;

  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// LRU缓存类
class LRUCache {
  private capacity: number;
  private cache: Map<any, LRUNode>;
  private head: LRUNode;
  private tail: LRUNode;
  private accessCount: number;
  private hitCount: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.accessCount = 0;
    this.hitCount = 0;

    // 使用虚拟头尾节点
    this.head = new LRUNode(null, null);
    this.tail = new LRUNode(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // 将节点移到链表头部
  private moveToHead(node: LRUNode) {
    this.removeNode(node);
    this.addToHead(node);
  }

  // 从链表中移除节点
  private removeNode(node: LRUNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  // 添加节点到头部
  private addToHead(node: LRUNode) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  // 移除尾部节点
  private removeTail() {
    const node = this.tail.prev!;
    this.removeNode(node);
    return node;
  }

  // 获取数据
  get(key: any): any {
    this.accessCount++;
    if (!this.cache.has(key)) return null;

    this.hitCount++;
    const node = this.cache.get(key)!;
    this.moveToHead(node);
    return node.value;
  }

  // 插入数据
  put(key: any, value: any) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToHead(node);
    } else {
      const node = new LRUNode(key, value);
      this.cache.set(key, node);
      this.addToHead(node);
      if (this.cache.size > this.capacity) {
        const tail = this.removeTail();
        this.cache.delete(tail.key);
        return tail; // 返回被移除的节点
      }
    }
    return null;
  }

  // 获取缓存大小
  get size() {
    return this.cache.size;
  }

  // 获取命中率
  get hitRate() {
    return this.accessCount > 0
      ? Math.round((this.hitCount / this.accessCount) * 100)
      : 0;
  }

  // 获取所有节点（按链表顺序）
  get nodes() {
    const nodes: LRUNode[] = [];
    let current = this.head.next;
    while (current && current !== this.tail) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  }
}

// 演示数据
const capacity = ref(5);
const newKey = ref('');
const newValue = ref('');
const accessKey = ref('');
const operationLogs = ref<string[]>([]);
const lruCache = reactive(new LRUCache(capacity.value));

// 缓存节点（用于显示）
const cacheNodes = computed(() => {
  return lruCache.nodes.map(node => ({
    key: node.key,
    value: node.value,
    isNew: false,
    accessed: false
  }));
});

// 命中率
const hitRate = computed(() => lruCache.hitRate);

// 添加数据
function addItem() {
  if (!newKey.value || !newValue.value) return;

  const removedNode = lruCache.put(newKey.value, newValue.value);

  // 标记新添加的节点
  const newNode = cacheNodes.value.find(node => node.key === newKey.value);
  if (newNode) {
    newNode.isNew = true;
    setTimeout(() => newNode.isNew = false, 1000);
  }

  // 记录操作日志
  const log = `添加数据: ${newKey.value} = ${newValue.value}`;
  operationLogs.value.unshift(log);

  if (removedNode) {
    const removeLog = `缓存已满，移除数据: ${removedNode.key}`;
    operationLogs.value.unshift(removeLog);
  }

  // 重置输入
  newKey.value = '';
  newValue.value = '';
}

// 访问数据
function accessItem(key?: any) {
  const accessKeyValue = key || accessKey.value;
  if (!accessKeyValue) return;

  const value = lruCache.get(accessKeyValue);

  if (value === null) {
    const log = `访问失败: 键 ${accessKeyValue} 不存在`;
    operationLogs.value.unshift(log);
  } else {
    // 标记访问的节点
    const accessedNode = cacheNodes.value.find(node => node.key === accessKeyValue);
    if (accessedNode) {
      accessedNode.accessed = true;
      setTimeout(() => accessedNode.accessed = false, 1000);
    }

    const log = `访问数据: ${accessKeyValue} = ${value}`;
    operationLogs.value.unshift(log);
  }

  // 重置输入
  accessKey.value = '';
}

// 重置缓存
function resetCache() {
  (lruCache as any).cache.clear();
  (lruCache as any).head.next = (lruCache as any).tail;
  (lruCache as any).tail.prev = (lruCache as any).head;
  operationLogs.value.unshift('缓存已重置');
}

// 初始添加一些数据
const initialData = [
  { key: 'A', value: 'Apple' },
  { key: 'B', value: 'Banana' },
  { key: 'C', value: 'Cherry' },
  { key: 'D', value: 'Date' }
];

initialData.forEach(item => {
  lruCache.put(item.key, item.value);
});
</script>

<style lang="less" scoped>
.lru-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-top: 0;
  }
}

.content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f4f8;
    color: #3498db;
  }
}

.card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
  }

  h3 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p,
  li {
    color: #5a6b7c;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 0.8rem 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
}

.data-structure {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.ds-item {
  background: #e0f2fe;
  padding: 1rem;
  border-radius: 8px;

  .ds-label {
    font-weight: bold;
    color: #0369a1;
    margin-bottom: 0.5rem;
  }

  .ds-desc {
    font-size: 0.95rem;
  }
}

.operations {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.op {
  background: #f0fdf4;
  padding: 1rem;
  border-radius: 8px;

  .op-title {
    font-weight: bold;
    color: #15803d;
    margin-bottom: 0.5rem;
  }

  ol {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.3rem;
      font-size: 0.95rem;
    }
  }
}

.code-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;

  h3 {
    margin-top: 0;
    color: #e2e8f0;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.usage-card {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 10px;
  padding: 1.8rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    margin: 0 0 0.8rem;
    color: #1e40af;
  }

  p {
    margin: 0;
    color: #4b5563;
    line-height: 1.5;
    font-size: 0.95rem;
  }
}

.demo-section {
  background: #f9fafb;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.demo-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #e0f2fe;
  padding: 1.5rem;
  border-radius: 8px;
}

.control-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  label {
    font-weight: 500;
    min-width: 100px;
  }

  input[type="range"] {
    flex: 1;
    max-width: 300px;
  }

  input[type="text"] {
    padding: 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    min-width: 120px;

    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    }
  }

  button {
    background: #4f46e5;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    white-space: nowrap;

    &:hover {
      background: #4338ca;
    }
  }
}

.visualization {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.cache-display {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.cache-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #4f46e5;
  color: white;
  font-weight: 500;
}

.cache-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.cache-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f1f5f9;
  }

  &.new-item {
    animation: pulse 1s;
    background: #dcfce7;
    border-color: #86efac;
  }

  &.accessed {
    background: #dbeafe;
    border-color: #93c5fd;
  }
}

.cache-key {
  font-weight: bold;
  color: #1e40af;
}

.cache-value {
  flex: 1;
  text-align: right;
  padding: 0 1rem;
}

.cache-status {
  font-size: 0.85rem;
  color: #64748b;
  font-style: italic;
}

.empty-cache,
.empty-log {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-style: italic;
}

.operation-log {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  h3 {
    margin: 0;
    padding: 1rem;
    background: #4f46e5;
    color: white;
  }
}

.log-container {
  padding: 1rem;
  height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

.log-entry {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #f1f5f9;
  border-radius: 6px;
  font-size: 0.9rem;
  border-left: 3px solid #4f46e5;
}

.lru-explanation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.step {
  display: flex;
  gap: 1rem;
  background: #f0fdf4;
  padding: 1.5rem;
  border-radius: 8px;

  .step-number {
    width: 36px;
    height: 36px;
    background: #15803d;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-content {
    h4 {
      margin: 0 0 0.5rem;
      color: #15803d;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #3f3f46;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.5rem;
  }

  .controls {
    padding: 1rem;
  }

  .control-group {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
    }
  }
}
</style>
