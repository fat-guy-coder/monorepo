<template>
  <div class="data-type-container">
    <!-- 标题部分 -->
    <header class="header">
      <h1>🎯 JavaScript 引用数据类型</h1>
    </header>

    <h3>基本数据类型存储在栈内存中，引用数据类型是存储在堆内存中的，变量保存的是内存地址引用</h3>

    <section class="memory-explanation">
      <h2 class="section-title">
        <span class="icon">💾</span>
        内存存储机制
      </h2>

      <div class="memory-types">
        <div class="memory-type stack-memory">
          <h3>栈内存 (Stack)</h3>
          <ul>
            <li>栈内存是一个有序的数据结构,遵循"后进先出"原则</li>
            <li>存储基本数据类型的值和引用类型的地址引用</li>
            <li>空间较小但读取速度快</li>
            <li>系统自动分配和释放内存</li>
            <li>存储的数据大小固定</li>
          </ul>
        </div>

        <div class="memory-type heap-memory">
          <h3>堆内存 (Heap)</h3>
          <ul>
            <li>堆内存是一个无序的内存空间</li>
            <li>主要存储引用类型的数据本身</li>
            <li>空间较大但读取速度相对较慢</li>
            <li>需要手动清理内存(JavaScript通过垃圾回收机制自动完成)</li>
            <li>存储的数据大小可动态调整</li>
          </ul>
        </div>
      </div>

      <div class="memory-process">
        <h3>存储过程</h3>
        <p>当我们创建一个引用类型的数据(如对象)时:</p>
        <ol>
          <li>对象的具体数据被存储在堆内存中</li>
          <li>系统会为这个对象分配一个内存地址</li>
          <li>变量实际保存的是这个内存地址(引用)</li>
          <li>当需要访问对象时,系统会通过内存地址找到堆内存中的实际数据</li>
        </ol>
      </div>
    </section>


    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 存储方式示意图 -->
      <div class="memory-diagram">
        <div class="stack">
          <h3>栈内存 (Stack)</h3>
          <div class="stack-items">
            <div v-for="item in stackData" :key="item.name" class="stack-item">
              <span class="var-name">{{ item.name }}</span>
              <span class="var-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
        <div class="heap">
          <h3>堆内存 (Heap)</h3>
          <div class="heap-objects">
            <div class="heap-object" v-for="obj in heapData" :key="obj.address">
              <div class="obj-header">地址: {{ obj.address }}</div>
              <div class="obj-content">
                <div v-for="(value, key) in obj.data" :key="key" class="obj-property">
                  {{ key }}: {{ value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心特性 -->
      <section class="card-section">
        <h2 class="section-title">
          <span class="icon">🌟</span>
          核心特性
        </h2>
        <div class="feature-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <pre v-if="feature.code" class="code-sample">{{ feature.code }}</pre>
          </div>
        </div>
      </section>

      <!-- 类型对比表格 -->
      <div class="comparison-table">
        <h2 class="section-title">
          <span class="icon">⚖️</span>
          与基本类型对比
        </h2>
        <table>
          <thead>
            <tr>
              <th>对比项</th>
              <th>引用类型</th>
              <th>基本类型</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in comparisonData" :key="index">
              <td>{{ row.name }}</td>
              <td :class="{ highlight: row.reference }">{{ row.reference }}</td>
              <td :class="{ highlight: row.primitive }">{{ row.primitive }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  code?: string;
}

interface ComparisonRow {
  name: string;
  reference: string;
  primitive: string;
}

const stackData = ref([
  { name: 'num', value: '42' },
  { name: 'str', value: '"Hello"' },
  { name: 'objRef', value: '0x123' }
]);

const heapData = ref([
  {
    address: '0x123',
    data: {
      name: '"Example"',
      value: '100'
    }
  }
]);

const features = ref<FeatureItem[]>([
  {
    icon: '📦',
    title: '堆内存存储',
    description: '实际数据存储在堆内存中，变量保存的是内存地址引用',
    code: 'let obj = { a: 1 };\nlet copy = obj;'
  },
  {
    icon: '🔗',
    title: '动态大小',
    description: '可以动态添加/删除属性，大小不固定',
    code: 'obj.newProp = "dynamic";'
  },
  {
    icon: '🔄',
    title: '按引用传递',
    description: '赋值和传参时传递内存地址',
    code: 'function change(obj) {\n  obj.value = 100;\n}'
  }
]);

const comparisonData = ref<ComparisonRow[]>([
  {
    name: '存储位置',
    reference: '堆内存',
    primitive: '栈内存'
  },
  {
    name: '赋值行为',
    reference: '复制引用地址',
    primitive: '复制实际值'
  },
  {
    name: '大小',
    reference: '动态变化',
    primitive: '固定大小'
  },
  {
    name: '比较方式',
    reference: '比较引用地址',
    primitive: '比较实际值'
  }
]);
</script>

<style scoped lang="less">
.data-type-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);

  .header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.1rem;
    }
  }

  .memory-diagram {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    margin-bottom: 3rem;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .stack,
    .heap {
      padding: 1.5rem;
      border-radius: 8px;

      h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
      }
    }

    .stack {
      background: #e3f2fd;
      border: 2px solid #2196F3;

      .stack-items {
        display: grid;
        gap: 1rem;

        .stack-item {
          background: white;
          padding: 1rem;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          font-family: 'Fira Code', monospace;

          .var-name {
            color: #2196F3;
          }
        }
      }
    }

    .heap {
      background: #f0f4c3;
      border: 2px solid #cddc39;

      .heap-objects {
        display: grid;
        gap: 1rem;

        .heap-object {
          background: white;
          border-radius: 6px;
          overflow: hidden;

          .obj-header {
            background: #cddc39;
            padding: 0.5rem;
            font-family: 'Fira Code', monospace;
          }

          .obj-content {
            padding: 1rem;

            .obj-property {
              padding: 0.3rem 0;
              font-family: 'Fira Code', monospace;
            }
          }
        }
      }
    }
  }

  .card-section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .section-title {
      font-size: 1.8rem;
      color: #34495e;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        font-size: 1.5em;
      }
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;

      .feature-card {
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #2196F3;

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .code-sample {
          background: #2c3e50;
          color: white;
          padding: 1rem;
          border-radius: 6px;
          margin-top: 1rem;
          font-family: 'Fira Code', monospace;
          white-space: pre-wrap;
        }
      }
    }
  }

  .comparison-table {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;

      th,
      td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }

      th {
        background: #f8f9fa;
      }

      .highlight {
        color: #2196F3;
        font-weight: 500;
      }
    }
  }
}
</style>
