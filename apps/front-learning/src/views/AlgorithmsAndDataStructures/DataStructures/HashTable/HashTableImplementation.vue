<template>
  <div class="hash-table-container">
    <header>
      <h1>JavaScript 哈希表实现基本介绍</h1>
      <p>深入理解哈希表原理与实现</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="intro-card">
          <div class="intro-content">
            <h2>什么是哈希表？</h2>
            <p>哈希表（Hash Table）是一种使用哈希函数组织数据的数据结构，支持高效的数据插入、删除和查找操作。在理想情况下，这些操作的时间复杂度为 O(1)。</p>

            <div class="key-features">
              <div class="feature">
                <div class="feature-icon">⚡</div>
                <div class="feature-text">平均 O(1) 时间复杂度</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <div class="feature-text">基于键值对存储</div>
              </div>
              <div class="feature">
                <div class="feature-icon">📊</div>
                <div class="feature-text">解决哈希冲突</div>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <div class="hash-visual">
              <div class="hash-function">hash(key) = key % 7</div>
              <div class="buckets">
                <div class="bucket" v-for="(bucket, index) in buckets" :key="index">
                  <div class="bucket-index">[{{ index }}]</div>
                  <div class="bucket-items">
                    <div v-for="(item, i) in bucket" :key="i" class="item">
                      {{ item.key }}: {{ item.value }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="implementation-section">
        <h2>哈希表实现基本介绍</h2>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-header">1. 哈希函数</div>
            <div class="step-content">
              <p>将键转换为数组索引的核心函数。好的哈希函数应具备：</p>
              <ul>
                <li>一致性：相同键总是产生相同索引</li>
                <li>均匀性：键值均匀分布在数组中</li>
                <li>高效性：计算速度快</li>
              </ul>
              <pre><code>function hash(key, size) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * 31) % size;
  }
  return hash;
}</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-header">2. 冲突解决（链地址法）</div>
            <div class="step-content">
              <p>当不同键映射到相同索引时，使用链表存储多个键值对</p>
              <div class="conflict-visual">
                <div class="key">"apple"</div>
                <div class="arrow">→ hash(apple) = 3 →</div>
                <div class="bucket">[3] → apple:10</div>

                <div class="key">"orange"</div>
                <div class="arrow">→ hash(orange) = 3 →</div>
                <div class="bucket">[3] → apple:10 → orange:20</div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-header">3. 哈希表类实现</div>
            <div class="step-content">
              <p>完整哈希表实现，包含set、get、remove等方法</p>
              <pre><code>class HashTable {
  constructor(size = 13) {
    this.size = size;
    this.buckets = Array(size).fill(null).map(() => []);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 31) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // 检查键是否已存在
    const existing = bucket.find(item => item.key === key);
    if (existing) {
      existing.value = value; // 更新值
    } else {
      bucket.push({ key, value }); // 添加新项
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find(item => item.key === key);
    return item ? item.value : undefined;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const itemIndex = bucket.findIndex(item => item.key === key);

    if (itemIndex !== -1) {
      bucket.splice(itemIndex, 1);
      return true;
    }
    return false;
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="interactive-section">
        <h2>哈希表交互演示</h2>
        <div class="interactive-demo">
          <div class="controls">
            <div class="control-group">
              <input v-model="newKey" placeholder="键" class="input-field">
              <input v-model="newValue" placeholder="值" class="input-field">
              <button @click="insertItem" class="action-btn">添加/更新</button>
            </div>
            <div class="control-group">
              <input v-model="searchKey" placeholder="查找键" class="input-field">
              <button @click="searchItem" class="action-btn">查找</button>
              <button @click="removeItem" class="action-btn remove">删除</button>
            </div>
          </div>

          <div class="result-area">
            <div v-if="operationResult" class="operation-result">
              {{ operationResult }}
            </div>
          </div>

          <div class="hash-table-visual">
            <div class="bucket" v-for="(bucket, index) in hashTable.buckets" :key="index">
              <div class="bucket-header">桶 {{ index }}</div>
              <div class="bucket-items">
                <div v-for="(item, i) in bucket" :key="i" class="item">
                  <span class="item-key">{{ item.key }}</span>
                  <span class="item-value">{{ item.value }}</span>
                </div>
                <div v-if="bucket.length === 0" class="empty-item">空</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="analysis-section">
        <div class="performance-analysis">
          <h2>性能分析</h2>
          <div class="performance-grid">
            <div class="metric-card">
              <div class="metric-title">最佳情况</div>
              <div class="metric-value">O(1)</div>
              <div class="metric-desc">无冲突时的操作时间</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">平均情况</div>
              <div class="metric-value">O(1)</div>
              <div class="metric-desc">良好负载因子下的操作时间</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">最坏情况</div>
              <div class="metric-value">O(n)</div>
              <div class="metric-desc">所有键映射到同一桶</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">负载因子</div>
              <div class="metric-value">&lt; 0.7</div>
              <div class="metric-desc">元素数/桶数，应保持在0.7以下</div>
            </div>
          </div>
        </div>

        <div class="use-cases">
          <h2>哈希表使用场景</h2>
          <div class="use-case-grid">
            <div class="case-card">
              <div class="case-icon">🗂️</div>
              <div class="case-title">数据缓存</div>
              <div class="case-desc">快速存储和检索计算结果</div>
            </div>
            <div class="case-card">
              <div class="case-icon">🔍</div>
              <div class="case-title">快速查找</div>
              <div class="case-desc">字典、索引等需要快速查询的场景</div>
            </div>
            <div class="case-card">
              <div class="case-icon">🆔</div>
              <div class="case-title">唯一性检测</div>
              <div class="case-desc">检测重复元素或用户</div>
            </div>
            <div class="case-card">
              <div class="case-icon">📝</div>
              <div class="case-title">词频统计</div>
              <div class="case-desc">统计文本中单词出现频率</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

class HashTable {
  size: number;
  buckets: Array<Array<{ key: string, value: any }>>;

  constructor(size = 13) {
    this.size = size;
    this.buckets = Array(size).fill(null).map(() => []);
  }

  hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 31) % this.size;
    }
    return hash;
  }

  set(key: string, value: any) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const existing = bucket.find(item => item.key === key);

    if (existing) {
      existing.value = value;
    } else {
      bucket.push({ key, value });
    }
  }

  get(key: string): any {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find(item => item.key === key);
    return item ? item.value : undefined;
  }

  remove(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const itemIndex = bucket.findIndex(item => item.key === key);

    if (itemIndex !== -1) {
      bucket.splice(itemIndex, 1);
      return true;
    }
    return false;
  }
}

// 创建哈希表实例
const hashTable = reactive(new HashTable(7));

// 初始化一些数据
hashTable.set('apple', 10);
hashTable.set('orange', 20);
hashTable.set('banana', 30);
hashTable.set('grape', 40);
hashTable.set('mango', 50);

// 交互功能
const newKey = ref('');
const newValue = ref('');
const searchKey = ref('');
const operationResult = ref('');

const insertItem = () => {
  if (!newKey.value) {
    operationResult.value = '请输入键名';
    return;
  }

  hashTable.set(newKey.value, newValue.value);
  operationResult.value = `已设置: ${newKey.value} = ${newValue.value}`;
  newKey.value = '';
  newValue.value = '';
};

const searchItem = () => {
  if (!searchKey.value) {
    operationResult.value = '请输入要查找的键名';
    return;
  }

  const value = hashTable.get(searchKey.value);
  if (value !== undefined) {
    operationResult.value = `查找到: ${searchKey.value} = ${value}`;
  } else {
    operationResult.value = `未找到键: ${searchKey.value}`;
  }
};

const removeItem = () => {
  if (!searchKey.value) {
    operationResult.value = '请输入要删除的键名';
    return;
  }

  const success = hashTable.remove(searchKey.value);
  if (success) {
    operationResult.value = `已删除: ${searchKey.value}`;
  } else {
    operationResult.value = `未找到键: ${searchKey.value}`;
  }
  searchKey.value = '';
};

// 可视化数据
const buckets = [
  [{ key: 'grape', value: 40 }],
  [],
  [{ key: 'mango', value: 50 }],
  [{ key: 'apple', value: 10 }, { key: 'orange', value: 20 }],
  [],
  [{ key: 'banana', value: 30 }],
  []
];
</script>

<style lang="less" scoped>


.hash-table-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 100%);
  color: #1e293b;
  line-height: 1.6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 100, 0.05);

  header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(99, 102, 241, 0.1);

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.3rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1rem;
      color: #64748b;
      max-width: 700px;
      margin: 0 auto;
    }
  }
}

.intro-section {
  margin-bottom: 1.5rem;

  .intro-card {
    display: flex;
    gap: 1.5rem;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .intro-content {
      flex: 1;

      h2 {
        font-size: 1.5rem;
        color: #1e293b;
        margin-top: 0;
        margin-bottom: 1rem;
      }

      p {
        color: #475569;
        font-size: 1rem;
        margin-bottom: 1.2rem;
      }
    }

    .intro-image {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.key-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.8rem;

  .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f1f5f9;
    border-radius: 8px;
    padding: 0.8rem;
    font-size: 0.9rem;

    .feature-icon {
      font-size: 1.2rem;
    }
  }
}

.hash-visual {
  width: 100%;
  max-width: 500px;

  .hash-function {
    background: #e0e7ff;
    border-radius: 6px;
    padding: 0.8rem;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: #4338ca;
  }

  .buckets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;

    .bucket {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      overflow: hidden;

      .bucket-index {
        background: #f1f5f9;
        padding: 0.3rem;
        text-align: center;
        font-weight: 500;
        font-size: 0.85rem;
      }

      .bucket-items {
        min-height: 30px;
        padding: 0.3rem;
        font-size: 0.85rem;

        .item {
          padding: 0.2rem;
          margin-bottom: 0.2rem;
          background: #f8fafc;
          border-radius: 3px;
        }
      }
    }
  }
}

.implementation-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-top: 0;
    margin-bottom: 1.2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #f1f5f9;
  }
}

.implementation-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .step {
    background: #f8fafc;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;

    .step-header {
      background: #e0e7ff;
      padding: 0.8rem 1rem;
      font-weight: 600;
      font-size: 1.1rem;
      color: #4338ca;
    }

    .step-content {
      padding: 1.2rem;

      p {
        color: #475569;
        margin-top: 0;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0.8rem 0;

        li {
          margin-bottom: 0.5rem;
          color: #475569;
        }
      }
    }
  }
}

.conflict-visual {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;

  .key,
  .bucket {
    background: white;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
  }

  .arrow {
    color: #94a3b8;
  }
}

pre {
  background: #f1f5f9;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.85rem;
  margin: 0.8rem 0;

  code {
    font-family: 'JetBrains Mono', monospace;
    color: #4338ca;
  }
}

.interactive-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-top: 0;
    margin-bottom: 1.2rem;
  }
}

.interactive-demo {
  .controls {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #e2e8f0;

    .control-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      margin-bottom: 0.8rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .input-field {
    flex: 1;
    min-width: 120px;
    padding: 0.6rem 0.8rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #6366f1;
    }
  }

  .action-btn {
    background: #4f46e5;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
    font-size: 0.9rem;

    &:hover {
      background: #4338ca;
    }

    &.remove {
      background: #dc2626;

      &:hover {
        background: #b91c1c;
      }
    }
  }

  .operation-result {
    background: #e0f2fe;
    border-radius: 6px;
    padding: 0.8rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #0c4a6e;
  }
}

.hash-table-visual {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  background: #f8fafc;

  .bucket {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    overflow: hidden;

    .bucket-header {
      background: #dbeafe;
      padding: 0.4rem;
      text-align: center;
      font-weight: 500;
      font-size: 0.85rem;
    }

    .bucket-items {
      min-height: 40px;
      padding: 0.4rem;

      .item {
        display: flex;
        justify-content: space-between;
        padding: 0.3rem;
        margin-bottom: 0.2rem;
        background: white;
        border-radius: 4px;
        font-size: 0.85rem;

        .item-key {
          font-weight: 500;
        }

        .item-value {
          color: #4338ca;
          font-weight: 500;
        }
      }

      .empty-item {
        color: #94a3b8;
        font-size: 0.8rem;
        text-align: center;
        padding: 0.3rem;
      }
    }
  }
}

.analysis-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.performance-analysis,
.use-cases {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-top: 0;
    margin-bottom: 1.2rem;
  }
}

.performance-grid,
.use-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.2rem;
  text-align: center;
  border: 1px solid #e2e8f0;

  .metric-title {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .metric-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: #4338ca;
    margin-bottom: 0.5rem;
  }

  .metric-desc {
    font-size: 0.85rem;
    color: #64748b;
  }
}

.case-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.2rem;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  }

  .case-icon {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  .case-title {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.3rem;
  }

  .case-desc {
    font-size: 0.85rem;
    color: #64748b;
  }
}

@media (max-width: 768px) {
  .hash-table-container {
    padding: 1rem;
  }

  .intro-card {
    padding: 1rem;
  }

  .implementation-section,
  .interactive-section,
  .performance-analysis,
  .use-cases {
    padding: 1rem;
  }
}
</style>
