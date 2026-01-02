<template>
  <div class="hash-table-container">
    <header class="header">
      <h1>哈希表（Hash Table）基本介绍</h1>
      <p class="subtitle">高效查找的数据结构实现原理与应用场景</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="section">
          <h2>基本概念</h2>
          <div class="concept-container">
            <div class="concept-card">
              <div class="concept-icon">🔑</div>
              <h3>哈希函数</h3>
              <p>将任意大小的数据映射到固定大小值的函数，用于确定数据在表中的位置</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">📦</div>
              <h3>桶（Bucket）</h3>
              <p>哈希表中存储数据的位置，每个桶可以存储一个或多个键值对</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">⚡</div>
              <h3>冲突解决</h3>
              <p>当不同键映射到同一位置时，通过链地址法或开放寻址法解决冲突</p>
            </div>
          </div>
        </section>

        <div class="columns-container">
          <section class="section">
            <h2>哈希表特点</h2>
            <ul class="feature-list">
              <li v-for="(feature, index) in features" :key="index" class="feature-item">
                <div class="feature-icon">
                  <span v-html="feature.icon"></span>
                </div>
                <div>
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </div>
              </li>
            </ul>
          </section>

          <section class="section">
            <h2>冲突解决算法</h2>
            <div class="algorithm-grid">
              <div v-for="(algo, index) in algorithms" :key="index" class="algorithm-card">
                <h3>{{ algo.name }}</h3>
                <p>{{ algo.description }}</p>
                <div class="algorithm-details">
                  <span class="complexity">时间复杂度: {{ algo.timeComplexity }}</span>
                  <span class="usage">使用率: {{ algo.usage }}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="columns-container">
          <section class="section">
            <h2>哈希表优点</h2>
            <ul class="pros-list">
              <li v-for="(pro, index) in pros" :key="index" class="pro-item">
                <div class="pro-icon">✅</div>
                <div>
                  <h3>{{ pro.title }}</h3>
                  <p>{{ pro.description }}</p>
                </div>
              </li>
            </ul>
          </section>

          <section class="section">
            <h2>哈希表缺点</h2>
            <ul class="cons-list">
              <li v-for="(con, index) in cons" :key="index" class="con-item">
                <div class="con-icon">⚠️</div>
                <div>
                  <h3>{{ con.title }}</h3>
                  <p>{{ con.description }}</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <section class="section">
          <h2>应用场景</h2>
          <div class="applications-container">
            <div v-for="(app, index) in applications" :key="index" class="application-card">
              <div class="app-icon">
                <span v-html="app.icon"></span>
              </div>
              <div>
                <h3>{{ app.title }}</h3>
                <p>{{ app.description }}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <div class="complexity-card">
          <h3>时间复杂度对比</h3>
          <table>
            <thead>
              <tr>
                <th>操作</th>
                <th>平均情况</th>
                <th>最坏情况</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>查找</td>
                <td>O(1)</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>插入</td>
                <td>O(1)</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>删除</td>
                <td>O(1)</td>
                <td>O(n)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="hash-functions">
          <h3>常见哈希函数</h3>
          <ul>
            <li v-for="(func, index) in hashFunctions" :key="index">
              <strong>{{ func.name }}:</strong> {{ func.description }}
            </li>
          </ul>
        </div>

        <div class="tips">
          <h3>优化技巧</h3>
          <ul>
            <li>选择负载因子阈值（通常0.7-0.8）</li>
            <li>使用质数作为表大小减少冲突</li>
            <li>选择高质量的哈希函数</li>
            <li>动态调整表大小</li>
            <li>考虑内存局部性</li>
          </ul>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>哈希表为什么快？——底层原理解析</h2>
      <div class="hash-fast-reason">
        <p>
          哈希表之所以查找、插入和删除操作都非常快，核心原因在于<strong>哈希函数</strong>和<strong>数组下标直接寻址</strong>的结合：
        </p>
        <ul>
          <li>
            <strong>哈希函数：</strong
            >将任意类型的键（如字符串、数字等）通过哈希算法转换为一个整数索引，这个索引直接对应数组中的位置。
          </li>
          <li>
            <strong>数组寻址：</strong
            >哈希表底层通常用一个数组存储数据，通过哈希函数计算出的索引，可以<strong>直接定位</strong>到数组的某个位置，避免了线性查找。
          </li>
          <li>
            <strong>冲突处理：</strong
            >当不同的键被哈希到同一个位置时，通过链表（链地址法）或探测（开放寻址法）等方式解决冲突，保证大部分情况下操作仍然很快。
          </li>
          <li>
            <strong>负载因子与动态扩容：</strong
            >当哈希表元素过多时，会自动扩容并重新分布数据，保持查找效率。
          </li>
        </ul>
        <p>
          <strong>总结：</strong>哈希表的高效性来自于“<span style="color: #409eff"
            >用哈希函数将键映射为数组下标，直接定位</span
          >”，避免了逐个遍历，大大提升了查找和插入的速度。
        </p>
      </div>
    </section>

    <footer class="footer">
      <p>
        哈希表是现代编程中最重要的数据结构之一，广泛应用于数据库索引、缓存实现和语言内置数据结构
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const features = ref([
  { icon: '⚡', title: '高效查找', description: '平均时间复杂度O(1)，比数组和链表更快' },
  { icon: '📊', title: '键值对存储', description: '通过键直接访问值，适合快速查找场景' },
  { icon: '🔄', title: '动态扩展', description: '当负载因子过高时可自动扩容' },
  {
    icon: '🔀',
    title: '无序存储',
    description: '不保持插入顺序，但现代实现如LinkedHashMap可保持顺序',
  },
  { icon: '📏', title: '空间换时间', description: '需要额外内存存储哈希表结构' },
])

const algorithms = ref([
  {
    name: '链地址法',
    description: '每个桶使用链表存储多个元素',
    timeComplexity: 'O(1+n/m)',
    usage: '80%',
  },
  {
    name: '开放寻址法',
    description: '探测空槽位存放冲突元素',
    timeComplexity: 'O(1/(1-α))',
    usage: '15%',
  },
  {
    name: '双重哈希',
    description: '使用第二个哈希函数解决冲突',
    timeComplexity: 'O(1)',
    usage: '3%',
  },
  {
    name: '布谷鸟哈希',
    description: '使用两个表交替存放元素',
    timeComplexity: 'O(1)',
    usage: '2%',
  },
])

const pros = ref([
  { title: '快速访问', description: '通过键直接访问值，平均O(1)时间复杂度' },
  { title: '插入高效', description: '插入操作通常非常快，平均O(1)时间复杂度' },
  { title: '灵活键类型', description: '支持多种数据类型作为键（需实现hashCode）' },
  { title: '动态调整', description: '可根据负载因子自动扩容/缩容' },
])

const cons = ref([
  { title: '冲突问题', description: '不同键可能映射到同一位置，需要解决冲突' },
  { title: '无序存储', description: '不保持元素插入顺序（除非使用特殊实现）' },
  { title: '空间开销', description: '需要分配足够空间减少冲突，内存利用率不高' },
  { title: '最坏情况性能', description: '冲突严重时性能可能退化到O(n)' },
])

const applications = ref([
  { icon: '🗄️', title: '数据库索引', description: '快速定位记录位置，提高查询效率' },
  { icon: '🌐', title: '缓存实现', description: 'Memcached、Redis等缓存系统核心数据结构' },
  { icon: '🔍', title: '字典实现', description: '编程语言中的字典、映射等数据结构基础' },
  { icon: '🆔', title: '唯一性检测', description: '快速检测元素是否存在，如重复内容过滤' },
  { icon: '🔑', title: '密码存储', description: '存储密码哈希值而非明文（加盐处理）' },
  { icon: '🧩', title: '图算法', description: '存储节点和边的信息，快速访问邻接节点' },
])

const hashFunctions = ref([
  { name: '除留余数法', description: 'h(k) = k mod m，m为质数效果最好' },
  { name: '乘法哈希', description: 'h(k) = floor(m * (k * A mod 1))，A为黄金比例常数' },
  { name: 'MD5', description: '广泛使用的密码散列函数，产生128位散列值' },
  { name: 'SHA系列', description: '安全哈希算法，用于密码学和数据完整性验证' },
  { name: 'MurmurHash', description: '非加密型哈希函数，适合一般哈希检索操作' },
])
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #e74c3c;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.hash-table-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
  }
}

.content-wrapper {
  display: flex;
  gap: 25px;
}

.main-content {
  flex: 3;
}

.sidebar {
  flex: 1;
  min-width: 300px;
}

.section {
  background: @light-bg;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h2 {
    color: @primary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 30%);
  }
}

.concept-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.concept-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    color: @secondary-color;
    margin-bottom: 10px;
  }
}

.columns-container {
  display: flex;
  gap: 20px;

  & > * {
    flex: 1;
  }
}

.feature-list,
.pros-list,
.cons-list {
  list-style: none;
}

.feature-item,
.pro-item,
.con-item {
  display: flex;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid fade(@border-color, 50%);

  &:last-child {
    border-bottom: none;
  }
}

.feature-icon,
.pro-icon,
.con-icon {
  font-size: 1.5rem;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pro-icon {
  color: @secondary-color;
}

.con-icon {
  color: @accent-color;
}

.algorithm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.algorithm-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: @card-shadow;
  border-left: 4px solid @primary-color;

  h3 {
    color: @primary-color;
    margin-bottom: 8px;
  }

  .algorithm-details {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.85rem;

    .complexity {
      background: fade(@primary-color, 10%);
      padding: 3px 8px;
      border-radius: 4px;
    }

    .usage {
      background: fade(@secondary-color, 10%);
      padding: 3px 8px;
      border-radius: 4px;
    }
  }
}

.applications-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.application-card {
  display: flex;
  gap: 15px;
  align-items: center;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: @card-shadow;
  border-left: 4px solid @secondary-color;

  .app-icon {
    font-size: 2rem;
    min-width: 50px;
  }
}

.complexity-card,
.hash-functions,
.tips {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }
}

table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background-color: fade(@primary-color, 10%);
  }

  tr:last-child td {
    border-bottom: none;
  }
}

ul {
  padding-left: 20px;

  li {
    margin-bottom: 10px;
  }
}

.footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid @border-color;
  color: #7f8c8d;
  font-style: italic;
}

@media (max-width: 1100px) {
  .content-wrapper {
    flex-direction: column;
  }

  .columns-container {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .concept-container,
  .algorithm-grid,
  .applications-container {
    grid-template-columns: 1fr;
  }
}
</style>
