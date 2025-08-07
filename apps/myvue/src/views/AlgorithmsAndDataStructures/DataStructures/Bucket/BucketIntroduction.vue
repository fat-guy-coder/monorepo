<template>
  <div class="bucket-container">
    <header class="header">
      <h1>桶数据结构解析</h1>
      <p class="subtitle">高效数据分组与分布处理的利器</p>
    </header>

    <div class="content">
      <div class="columns">
        <div class="column">
          <section class="concept-section">
            <div class="section-header">
              <div class="bucket-icon">
                <svg width="40" height="40" viewBox="0 0 24 24">
                  <path fill="#4f5bd5"
                    d="M3,4H21A1,1 0 0,1 22,5V19A1,1 0 0,1 21,20H3A1,1 0 0,1 2,19V5A1,1 0 0,1 3,4M12,6V8H20V6H12M12,10V12H20V10H12M12,14V16H20V14H12M8,16C8,17.11 7.11,18 6,18C4.89,18 4,17.1 4,16C4,14.9 4.9,14 6,14C7.1,14 8,14.9 8,16M6,11.92C7.12,11.92 8,11.03 8,9.92C8,8.81 7.11,7.92 6,7.92C4.89,7.92 4,8.81 4,9.92C4,11.03 4.89,11.92 6,11.92M8,6C8,7.11 7.11,8 6,8C4.89,8 4,7.1 4,6C4,4.9 4.9,4 6,4C7.1,4 8,4.9 8,6Z" />
                </svg>
              </div>
              <h2>桶结构基本概念</h2>
            </div>

            <div class="definition">
              <p><strong>桶(Bucket)</strong>是一种将元素分配到不同容器中的数据结构，每个容器称为一个桶。桶结构通过将数据集划分为多个较小的子集，使后续操作更高效。</p>

              <div class="properties">
                <div class="property">
                  <div class="prop-icon">1</div>
                  <div>
                    <h3>分组机制</h3>
                    <p>根据元素特性分配到特定桶中</p>
                  </div>
                </div>
                <div class="property">
                  <div class="prop-icon">2</div>
                  <div>
                    <h3>均匀分布</h3>
                    <p>理想情况下元素均匀分布在桶中</p>
                  </div>
                </div>
                <div class="property">
                  <div class="prop-icon">3</div>
                  <div>
                    <h3>并行处理</h3>
                    <p>桶之间可独立处理，适合并行</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="complexity">
              <h3>时间复杂度分析</h3>
              <div class="complexity-table">
                <div class="complexity-row">
                  <div class="op">桶创建</div>
                  <div class="time">O(n)</div>
                </div>
                <div class="complexity-row">
                  <div class="op">桶排序</div>
                  <div class="time">O(n + k)，k为桶数</div>
                </div>
                <div class="complexity-row">
                  <div class="op">元素查找</div>
                  <div class="time">O(1)平均，O(n)最坏</div>
                </div>
                <div class="complexity-row">
                  <div class="op">范围查询</div>
                  <div class="time">O(√n)平均</div>
                </div>
              </div>
            </div>
          </section>

          <section class="application-section">
            <div class="section-header">
              <h2>桶结构应用场景</h2>
            </div>

            <div class="applications">
              <div class="app-card">
                <div class="app-icon">📊</div>
                <div>
                  <h3>统计分析</h3>
                  <p>数据分箱、直方图生成</p>
                </div>
              </div>
              <div class="app-card">
                <div class="app-icon">🔢</div>
                <div>
                  <h3>高效排序</h3>
                  <p>桶排序基数排序</p>
                </div>
              </div>
              <div class="app-card">
                <div class="app-icon">🌐</div>
                <div>
                  <h3>分布式系统</h3>
                  <p>数据分片存储</p>
                </div>
              </div>
              <div class="app-card">
                <div class="app-icon">🔍</div>
                <div>
                  <h3>范围查询</h3>
                  <p>数据库索引优化</p>
                </div>
              </div>
              <div class="app-card">
                <div class="app-icon">🧮</div>
                <div>
                  <h3>哈希表实现</h3>
                  <p>解决哈希冲突</p>
                </div>
              </div>
              <div class="app-card">
                <div class="app-icon">📶</div>
                <div>
                  <h3>流处理</h3>
                  <p>滑动窗口统计</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="column">
          <section class="implementation-section">
            <div class="section-header">
              <h2>桶结构实现与算法</h2>
            </div>

            <div class="algorithm">
              <div class="algo-header">
                <h3>1. 桶排序算法</h3>
                <div class="algo-tag">平均O(n+k)</div>
              </div>
              <p class="algo-desc">分布式排序算法，将数组元素分配到有限数量的桶中，然后对每个桶分别排序</p>

              <div class="steps">
                <div class="step">
                  <div class="step-num">1</div>
                  <p>确定桶的数量和范围</p>
                </div>
                <div class="step">
                  <div class="step-num">2</div>
                  <p>将元素分配到对应的桶中</p>
                </div>
                <div class="step">
                  <div class="step-num">3</div>
                  <p>对每个桶内部进行排序</p>
                </div>
                <div class="step">
                  <div class="step-num">4</div>
                  <p>合并所有桶得到有序数组</p>
                </div>
              </div>

              <div class="code-block">
                <div class="code-header">桶排序实现代码</div>
                <pre>function bucketSort(arr: number[], bucketSize = 5): number[] {
  if (arr.length === 0) return arr;

  // 1. 寻找数据范围
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  // 2. 初始化桶
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = Array(bucketCount).fill(null).map(() => []);

  // 3. 分配元素到桶中
  for (const num of arr) {
    const bucketIndex = Math.floor((num - min) / bucketSize);
    buckets[bucketIndex].push(num);
  }

  // 4. 对每个桶排序并合并
  const sortedArr: number[] = [];
  for (const bucket of buckets) {
    // 使用插入排序对每个小桶排序
    insertionSort(bucket);
    sortedArr.push(...bucket);
  }

  return sortedArr;
}

// 辅助排序函数
function insertionSort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}</pre>
              </div>
            </div>

            <div class="algorithm">
              <div class="algo-header">
                <h3>2. 桶数据结构实现</h3>
                <div class="algo-tag">基础实现</div>
              </div>

              <div class="code-block">
                <div class="code-header">桶结构核心实现</div>
                <pre>class BucketStructure&lt;T&gt; {
  private buckets: T[][];
  private bucketSize: number;
  private minValue: number;
  private maxValue: number;

  // 初始化桶结构
  constructor(min: number, max: number, bucketSize: number) {
    this.minValue = min;
    this.maxValue = max;
    this.bucketSize = bucketSize;

    // 计算桶数量
    const bucketCount = Math.ceil((max - min) / bucketSize);
    this.buckets = Array(bucketCount)
      .fill(null)
      .map(() => []);
  }

  // 添加元素到桶
  add(element: T, value: number): void {
    const bucketIndex = this.getBucketIndex(value);
    this.buckets[bucketIndex].push(element);
  }

  // 查询特定桶的元素
  getBucket(value: number): T[] {
    return this.buckets[this.getBucketIndex(value)];
  }

  // 范围查询
  rangeQuery(min: number, max: number): T[] {
    const results: T[] = [];
    const minIndex = this.getBucketIndex(min);
    const maxIndex = this.getBucketIndex(max);

    for (let i = minIndex; i <= maxIndex; i++) {
      // 检查桶内元素是否在范围内
      for (const elem of this.buckets[i]) {
        // 实际应用中需要额外的值映射逻辑
        results.push(elem);
      }
    }

    return results;
  }

  // 计算桶索引
  private getBucketIndex(value: number): number {
    return Math.min(
      Math.floor((value - this.minValue) / this.bucketSize),
      this.buckets.length - 1
    );
  }

  // 获取所有桶
  getAllBuckets(): T[][] {
    return this.buckets;
  }
}</pre>
              </div>
            </div>

            <div class="algorithm">
              <div class="algo-header">
                <h3>3. 桶在哈希表中的应用</h3>
                <div class="algo-tag">哈希冲突解决</div>
              </div>
              <p class="algo-desc">大多数哈希表使用桶来处理哈希碰撞，将哈希到同一位置的元素存储在同一个桶中</p>

              <div class="code-block">
                <div class="code-header">哈希表桶实现片段</div>
                <pre>class HashTable&lt;K, V&gt; {
  private buckets: Array&lt;Array&lt;[K, V]&gt;&gt;;
  private size: number;

  constructor(size = 32) {
    this.size = size;
    this.buckets = Array(size).fill(null).map(() => []);
  }

  // 哈希函数
  private hash(key: K): number {
    const str = String(key);
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return Math.abs(hash) % this.size;
  }

  // 添加键值对
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // 检查键是否已存在
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value; // 更新值
        return;
      }
    }

    // 添加到桶中
    bucket.push([key, value]);
  }

  // 获取值
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }

    return undefined;
  }
}</pre>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section class="comparison-section">
        <div class="section-header">
          <h2>桶与其他数据结构对比</h2>
        </div>

        <div class="comparison-table">
          <div class="table-header">
            <div class="col">数据结构</div>
            <div class="col">访问效率</div>
            <div class="col">范围查询</div>
            <div class="col">内存使用</div>
            <div class="col">适用场景</div>
          </div>
          <div class="table-row">
            <div class="col">桶结构</div>
            <div class="col">O(1)平均</div>
            <div class="col">优秀</div>
            <div class="col">中等</div>
            <div class="col">均匀分布数据、范围查询</div>
          </div>
          <div class="table-row">
            <div class="col">数组</div>
            <div class="col">O(1)</div>
            <div class="col">差</div>
            <div class="col">低</div>
            <div class="col">随机访问、索引明确</div>
          </div>
          <div class="table-row">
            <div class="col">链表</div>
            <div class="col">O(n)</div>
            <div class="col">差</div>
            <div class="col">低</div>
            <div class="col">频繁插入删除</div>
          </div>
          <div class="table-row">
            <div class="col">二叉搜索树</div>
            <div class="col">O(log n)</div>
            <div class="col">良好</div>
            <div class="col">中等</div>
            <div class="col">有序数据、动态数据集</div>
          </div>
          <div class="table-row">
            <div class="col">哈希表</div>
            <div class="col">O(1)</div>
            <div class="col">差</div>
            <div class="col">高</div>
            <div class="col">精确查找、键值存储</div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>桶结构总结：数据分组 → 均匀分布 → 并行处理 → 高效范围操作</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
//
//

.bucket-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  background: linear-gradient(135deg, #fafbff 0%, #f0f4ff 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 128, 0.08);
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2e3a8c;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #2e3a8c 0%, #4f5bd5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #6b7280;
    font-weight: 400;
  }
}

.content {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.columns {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.column {
  flex: 1;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e7ff;

  h2 {
    font-size: 1.6rem;
    color: #2e3a8c;
    margin: 0;
  }
}

.bucket-icon {
  width: 44px;
  height: 44px;
  background: #e0e7ff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;

  svg {
    width: 28px;
    height: 28px;
  }
}

.definition {
  p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
}

.properties {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.property {
  display: flex;
  background: #f3f7ff;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #e0e7ff;

  .prop-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #4f5bd5 0%, #2e3a8c 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  h3 {
    font-size: 1.1rem;
    color: #2e3a8c;
    margin: 0 0 0.3rem;
  }

  p {
    font-size: 0.95rem;
    color: #6b7280;
    margin: 0;
  }
}

.complexity {
  margin-top: 2rem;

  h3 {
    font-size: 1.3rem;
    color: #2e3a8c;
    margin-bottom: 1rem;
  }
}

.complexity-table {
  border: 1px solid #e0e7ff;
  border-radius: 10px;
  overflow: hidden;

  .complexity-row {
    display: flex;
    border-bottom: 1px solid #eef2ff;
    background: white;

    &:nth-child(odd) {
      background: #f8faff;
    }

    &:last-child {
      border-bottom: none;
    }

    .op {
      flex: 1;
      padding: 0.8rem 1.2rem;
      font-weight: 500;
    }

    .time {
      width: 200px;
      padding: 0.8rem 1.2rem;
      background: #eef2ff;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      color: #2e3a8c;
    }
  }
}

.application-section {
  margin-top: 2.5rem;
}

.applications {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
}

.app-card {
  display: flex;
  background: white;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0 4px 10px rgba(79, 91, 213, 0.1);
  border: 1px solid #eef2ff;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(79, 91, 213, 0.15);
  }

  .app-icon {
    font-size: 1.8rem;
    margin-right: 1rem;
    width: 44px;
    height: 44px;
    background: #f0f5ff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h3 {
    font-size: 1.1rem;
    color: #2e3a8c;
    margin: 0 0 0.3rem;
  }

  p {
    font-size: 0.95rem;
    color: #6b7280;
    margin: 0;
  }
}

.algorithm {
  margin-bottom: 2.5rem;
  border: 1px solid #e0e7ff;
  border-radius: 12px;
  overflow: hidden;

  .algo-header {
    display: flex;
    align-items: center;
    padding: 1.2rem 1.5rem;
    background: linear-gradient(135deg, #f0f5ff 0%, #e0e7ff 100%);

    h3 {
      font-size: 1.3rem;
      color: #2e3a8c;
      margin: 0;
      flex: 1;
    }
  }

  .algo-tag {
    background: #4f5bd5;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .algo-desc {
    padding: 1rem 1.5rem;
    margin: 0;
    color: #4b5563;
    border-bottom: 1px solid #eef2ff;
  }
}

.steps {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  background: #f8faff;

  .step {
    text-align: center;
    flex: 1;
    max-width: 22%;

    .step-num {
      width: 36px;
      height: 36px;
      background: #4f5bd5;
      color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      margin: 0 auto 0.8rem;
    }

    p {
      font-size: 0.95rem;
      color: #4b5563;
      margin: 0;
    }
  }
}

.code-block {
  margin: 0;

  .code-header {
    background: #e0e7ff;
    color: #2e3a8c;
    padding: 0.8rem 1.2rem;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
    font-size: 0.95rem;
    border-bottom: 1px solid #c7d2fe;
  }

  pre {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.95rem;
    padding: 1.2rem;
    margin: 0;
    overflow-x: auto;
    background: #f8fafc;
    color: #1e293b;
    line-height: 1.6;
  }
}

.comparison-section {
  margin-top: 2rem;
}

.comparison-table {
  border: 1px solid #e0e7ff;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;

  .table-header,
  .table-row {
    display: flex;
    border-bottom: 1px solid #eef2ff;

    .col {
      flex: 1;
      padding: 1rem;
      font-weight: 500;

      &:first-child {
        flex: 0 0 160px;
      }
    }
  }

  .table-header {
    background: linear-gradient(135deg, #4f5bd5 0%, #2e3a8c 100%);
    color: white;
    font-weight: 600;
  }

  .table-row {
    background: white;

    &:nth-child(even) {
      background: #f8faff;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.footer {
  margin-top: 2.5rem;
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  border-radius: 12px;
  font-weight: 500;
  color: #2e3a8c;
  font-size: 1.1rem;
}

@media (max-width: 900px) {
  .columns {
    flex-direction: column;
    gap: 2.5rem;
  }

  .steps {
    flex-wrap: wrap;

    .step {
      min-width: 48%;
      margin-bottom: 1.5rem;
    }
  }
}

@media (max-width: 600px) {
  .bucket-container {
    padding: 1.2rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.2rem;
  }

  .steps .step {
    min-width: 100%;
  }

  .comparison-table {
    overflow-x: auto;

    .table-header,
    .table-row {
      min-width: 600px;
    }
  }
}
</style>
