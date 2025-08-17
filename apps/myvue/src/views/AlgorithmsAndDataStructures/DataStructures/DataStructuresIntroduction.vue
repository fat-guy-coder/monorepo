<template>
  <div class="data-structure-overview">
    <header>
      <h1>数据结构概览</h1>
      <p>探索计算机科学中核心数据结构的特性、分类与应用场景</p>
    </header>

    <div class="tabs">
      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: activeCategory === category }"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="category-section">
      <div class="structures-container">
        <div
          v-for="structure in filteredStructures"
          :key="structure.name"
          class="structure-card"
        >
          <div class="card-header">
            <h2><a @click="handleClick(structure.route)">{{ structure.name }}</a></h2>
            <span class="type-badge">{{ structure.type }}</span>
          </div>

          <div class="card-body">
            <div class="property">
              <h3>特点特性</h3>
              <ul>
                <li v-for="(feature, index) in structure.features" :key="index">{{ feature }}</li>
              </ul>
            </div>

            <div class="property">
              <h3>作用</h3>
              <p>{{ structure.purpose }}</p>
            </div>

            <div class="property">
              <h3>适用场景</h3>
              <ul>
                <li v-for="(scenario, index) in structure.scenarios" :key="index">{{ scenario }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="summary-section">
      <h2>数据结构选择指南</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>数据结构</th>
              <th>访问效率</th>
              <th>搜索效率</th>
              <th>插入效率</th>
              <th>删除效率</th>
              <th>内存使用</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ds in dataStructures" :key="ds.name">
              <td>{{ ds.name }}</td>
              <td :class="getEfficiencyClass(ds.efficiency.access)">{{ ds.efficiency.access }}</td>
              <td :class="getEfficiencyClass(ds.efficiency.search)">{{ ds.efficiency.search }}</td>
              <td :class="getEfficiencyClass(ds.efficiency.insertion)">{{ ds.efficiency.insertion }}</td>
              <td :class="getEfficiencyClass(ds.efficiency.deletion)">{{ ds.efficiency.deletion }}</td>
              <td :class="getEfficiencyClass(ds.efficiency.memory)">{{ ds.efficiency.memory }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer>
      <p>© 2023 数据结构概览 | 计算机科学基础</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 数据结构分类
const categories = ref([
  '全部',
  '线性结构',
  '树形结构',
  '散列结构',
  '图形结构',
  '其他结构'
])

const activeCategory = ref('全部')

interface DataStructuresIntroduction {
  name: string
  type: string
  features: string[]
  purpose: string
  scenarios: string[]
  route: string
  efficiency: {
    access: string
    search: string
    insertion: string
    deletion: string
    memory: string
  }
}

// 数据结构详细信息
const dataStructures = ref<DataStructuresIntroduction[]>([])

onMounted(async() => {
  const res = await import('./JSON/DataStructuresIntroduction.json')
  dataStructures.value = res.default
})

// 根据选择的分类过滤数据结构
const filteredStructures = computed(() => {
  if (activeCategory.value === '全部') {
    return dataStructures.value
  }
  return dataStructures.value.filter(ds => ds.type === activeCategory.value)
})

// 根据效率值返回对应的样式类
const getEfficiencyClass = (efficiency: string) => {
  if (efficiency === 'O(1)' || efficiency === '低') return 'efficiency-high'
  if (efficiency.includes('log') || efficiency === '中') return 'efficiency-medium'
  return 'efficiency-low'
}

const emit = defineEmits(['goToByRouteName'])

const handleClick = (route: string) => {
  emit('goToByRouteName', route)
}
</script>

<style lang="less" scoped>

// 颜色定义
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #e9ecef;
@success-color: #4cc9f0;
@warning-color: #f72585;
@info-color: #4895ef;
@efficiency-high: #2ec4b6;
@efficiency-medium: #ff9f1c;
@efficiency-low: #e71d36;

// 基础样式
.data-structure-overview {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: @background-light;
  color: @text-dark;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: @primary-color;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.1rem;
      color: @text-light;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2rem;

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 50px;
      background-color: lighten(@primary-color, 35%);
      color: @primary-color;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.95rem;

      &:hover {
        background-color: lighten(@primary-color, 25%);
      }

      &.active {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        box-shadow: 0 4px 12px rgba(67, 97, 238, 0.25);
      }
    }
  }

  .structures-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.75rem;
    margin-top: 1rem;
  }

  .structure-card {
    background-color: @card-bg;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid @border-color;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
    }

    .card-header {
      padding: 1.25rem 1.5rem;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 1.4rem;
        font-weight: 600;
        margin: 0;
      }

      .type-badge {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }

    .card-body {
      padding: 1.5rem;

      .property {
        margin-bottom: 1.25rem;

        &:last-child {
          margin-bottom: 0;
        }

        h3 {
          font-size: 1.1rem;
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: @primary-color;
          display: flex;
          align-items: center;

          &::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: @primary-color;
            margin-right: 10px;
          }
        }

        p {
          margin: 0.5rem 0 0;
          color: @text-dark;
        }

        ul {
          padding-left: 1.25rem;
          margin: 0.5rem 0 0;

          li {
            margin-bottom: 0.4rem;
            position: relative;
            padding-left: 1rem;

            &::before {
              content: '•';
              position: absolute;
              left: 0;
              color: @primary-color;
            }
          }
        }
      }
    }
  }

  .summary-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid @border-color;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: @primary-color;
    }

    .comparison-table {
      overflow-x: auto;
      background-color: @card-bg;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
      padding: 1.5rem;

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid @border-color;
        }

        th {
          background-color: lighten(@primary-color, 42%);
          color: @primary-color;
          font-weight: 600;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .efficiency-high {
          background-color: fade(@efficiency-high, 15%);
          color: darken(@efficiency-high, 20%);
          font-weight: 600;
        }

        .efficiency-medium {
          background-color: fade(@efficiency-medium, 15%);
          color: darken(@efficiency-medium, 20%);
          font-weight: 600;
        }

        .efficiency-low {
          background-color: fade(@efficiency-low, 15%);
          color: darken(@efficiency-low, 20%);
          font-weight: 600;
        }
      }
    }
  }

  footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border-color;
  }

  // 响应式设计
  @media (max-width: 768px) {
    padding: 1.5rem;

    header h1 {
      font-size: 2rem;
    }

    .structures-container {
      grid-template-columns: 1fr;
    }

    .tabs {
      gap: 0.5rem;

      button {
        padding: 0.6rem 1.2rem;
        font-size: 0.85rem;
      }
    }

    .comparison-table {
      padding: 0.5rem;

      table {
        th, td {
          padding: 0.75rem 0.5rem;
          font-size: 0.85rem;
        }
      }
    }
  }
}
</style>
