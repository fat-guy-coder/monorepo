<template>
  <div class="record-tuple-container">
    <!-- 标题部分 -->
    <header class="header">
      <h1>🆕 Record & Tuple 提案解析</h1>
      <p class="subtitle">JavaScript 不可变数据结构新方案</p>
      <div class="proposal-status">Stage 2 Proposal</div>
    </header>


    <!-- Record & Tuple 介绍 -->
    <section class="introduction-section">
      <h2 class="section-title">
        <span class="icon">📖</span>
        Record & Tuple 介绍
      </h2>
      <p>
        Record 和 Tuple 是 JavaScript 中的新提案，旨在提供不可变的数据结构。Record 是一种键值对集合，而 Tuple
        是一种有序的值集合。这些数据结构可以帮助开发者更好地管理状态和数据，确保数据的不可变性，从而减少错误和提高代码的可维护性。
      </p>
      <div>
        <h3>使用方法</h3>
        <p>
          Record 和 Tuple 提供了一种新的方式来处理不可变数据。在 JavaScript 中，使用 Record 和 Tuple 可以确保数据的不可变性，从而减少意外修改带来的错误。
        </p>
        <h4>Record 示例</h4>
        <pre class="code-sample">
          const person = #{ name: "Alice", age: 30 };
          // 尝试修改会抛出错误
          // person.age = 31; // TypeError
        </pre>
        <h4>Tuple 示例</h4>
        <pre class="code-sample">
          const coordinates = #[1, 2, 3];
          // 尝试修改会抛出错误
          // coordinates[0] = 4; // TypeError
        </pre>
      </div>
    </section>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 核心概念 -->
      <section class="concept-section">
        <h2 class="section-title">
          <span class="icon">🌟</span>
          核心特性
        </h2>
        <div class="feature-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-header">
              <span class="feature-icon">{{ feature.icon }}</span>
              <h3>{{ feature.title }}</h3>
            </div>
            <p class="feature-desc">{{ feature.description }}</p>
            <pre class="code-sample">{{ feature.syntax }}</pre>
          </div>
        </div>
      </section>

      <!-- 类型对比 -->
      <section class="comparison-section">
        <h2 class="section-title">
          <span class="icon">⚖️</span>
          类型对比
        </h2>
        <div class="type-table">
          <div class="table-header">
            <div>特性</div>
            <div>Record</div>
            <div>Tuple</div>
          </div>
          <div class="table-row" v-for="(row, index) in typeComparison" :key="index">
            <div class="row-title">{{ row.title }}</div>
            <div :class="['row-value', { yes: row.record }]">{{ row.record ? '✅' : '❌' }}</div>
            <div :class="['row-value', { yes: row.tuple }]">{{ row.tuple ? '✅' : '❌' }}</div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="scenario-section">
        <h2 class="section-title">
          <span class="icon">🎯</span>
          典型应用场景
        </h2>
        <div class="scenario-grid">
          <div v-for="(scene, index) in scenarios" :key="index" class="scene-card">
            <div class="scene-icon">{{ scene.icon }}</div>
            <h4>{{ scene.title }}</h4>
            <ul class="scene-points">
              <li v-for="(point, pIndex) in scene.points" :key="pIndex">{{ point }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <div class="notice-section">
        <h3>⚠️ 重要注意事项</h3>
        <ul>
          <li v-for="(note, index) in importantNotes" :key="index">{{ note }}</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Feature {
  icon: string;
  title: string;
  description: string;
  syntax: string;
}

interface ComparisonRow {
  title: string;
  record: boolean;
  tuple: boolean;
}

interface Scenario {
  icon: string;
  title: string;
  points: string[];
}

const features = ref<Feature[]>([
  {
    icon: "🔒",
    title: "深度不可变",
    description: "创建后无法修改内部任何层级的属性",
    syntax: "const record = #{ x: 1, y: 2 };\n// record.x = 3 会抛出错误"
  },
  {
    icon: "⚡",
    title: "结构共享",
    description: "重用未修改部分的内存结构",
    syntax: "const newRecord = #{ ...oldRecord, z: 3 };"
  },
  {
    icon: "🔍",
    title: "值比较",
    description: "直接比较数据结构内容而非引用",
    syntax: "#{ a: 1 } === #{ a: 1 } // true"
  }
]);

const typeComparison = ref<ComparisonRow[]>([
  { title: "不可变性", record: true, tuple: true },
  { title: "索引访问", record: true, tuple: true },
  { title: "动态键名", record: false, tuple: true },
  { title: "方法支持", record: false, tuple: false },
  { title: "类型推导", record: true, tuple: true }
]);

const scenarios = ref<Scenario[]>([
  {
    icon: "🔄",
    title: "状态管理",
    points: ["Redux状态树", "不可变数据流", "历史状态追踪"]
  },
  {
    icon: "🔐",
    title: "安全数据",
    points: ["配置信息存储", "防止意外修改", "共享数据保护"]
  },
  {
    icon: "📊",
    title: "数据比对",
    points: ["快速差异检测", "Memoization优化", "缓存键生成"]
  }
]);

const importantNotes = ref([
  '当前为Stage 2提案，语法可能变化',
  '需要Babel插件支持（@babel/plugin-proposal-record-and-tuple）',
  '不能包含可变数据结构',
  '适合存储基础类型值'
]);
</script>

<style lang="less" scoped>
@primary-color: #2196f3;
@warning-color: #ff9800;
@success-color: #4caf50;
@error-color: #e53935;

.record-tuple-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);

  .header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;

    h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .proposal-status {
      position: absolute;
      top: -1rem;
      right: -1rem;
      background: @warning-color;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transform: rotate(5deg);
    }
  }

  .concept-section {
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;

      .feature-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

        .feature-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;

          .feature-icon {
            font-size: 1.8rem;
          }
        }

        .code-sample {
          background: #2c3e50;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Fira Code', monospace;
          white-space: pre-wrap;
          margin-top: 1rem;
        }
      }
    }
  }

  .comparison-section {
    margin: 3rem 0;

    .type-table {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      overflow: hidden;

      .table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 1rem;
        background: @primary-color;
        color: white;
        font-weight: bold;
      }

      .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 1rem;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }

        .row-title {
          font-weight: 500;
        }

        .row-value.yes {
          color: @success-color;
        }
      }
    }
  }

  .scenario-section {
    .scenario-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;

      .scene-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        text-align: center;

        .scene-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .scene-points {
          list-style: none;
          padding-left: 0;

          li {
            padding: 0.3rem 0;
          }
        }
      }
    }
  }

  .notice-section {
    background: #fff3e0;
    border-radius: 12px;
    padding: 2rem;
    margin-top: 2rem;

    ul {
      list-style: none;
      padding-left: 1rem;

      li {
        padding: 0.5rem 0;
        position: relative;

        &::before {
          content: "•";
          color: @error-color;
          position: absolute;
          left: -1rem;
        }
      }
    }
  }
}
</style>
