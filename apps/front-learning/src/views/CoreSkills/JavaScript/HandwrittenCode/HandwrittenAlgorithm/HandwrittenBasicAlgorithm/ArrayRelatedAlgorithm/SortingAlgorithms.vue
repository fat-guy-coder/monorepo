<template>
  <div class="sorting-container">
    <h1>数组排序算法基本介绍</h1>
    <div class="intro">
      <p>
        排序是计算机科学中最基础的算法之一。本组件详细介绍了10种常见的排序算法，包括每种算法的基本思想、代码实现、使用场景、复杂度分析和优缺点。
      </p>
      <p><a @click="goToDetail">跳转详细</a></p>
    </div>

    <div class="algorithm-grid">
      <div
        v-for="(algorithm, index) in algorithms"
        :key="algorithm.name"
        class="algorithm-card"
        :class="{ active: activeAlgorithm === index }"
        @click="activeAlgorithm = index"
      >
        <div class="card-header">
          <div class="algorithm-icon" :style="{ backgroundColor: algorithm.color }">
            {{ algorithm.name.charAt(0) }}
          </div>
          <h3>{{ algorithm.name }}</h3>
          <div class="time-complexity">
            <span>时间复杂度:</span>
            <div class="complexity-value">{{ algorithm.complexity.time }}</div>
          </div>
        </div>
        <div class="card-body">
          <p>{{ algorithm.shortDesc }}</p>
          <div class="algorithm-tags">
            <span v-for="tag in algorithm.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeAlgorithm !== null" class="algorithm-detail">
      <div class="detail-header">
        <h2>{{ currentAlgorithm.name }} 排序</h2>
        <div class="complexity-details">
          <div class="complexity-item">
            <span>时间复杂度(最佳):</span>
            <span class="complexity-value best">{{ currentAlgorithm.complexity.best }}</span>
          </div>
          <div class="complexity-item">
            <span>时间复杂度(平均):</span>
            <span class="complexity-value avg">{{ currentAlgorithm.complexity.avg }}</span>
          </div>
          <div class="complexity-item">
            <span>时间复杂度(最差):</span>
            <span class="complexity-value worst">{{ currentAlgorithm.complexity.worst }}</span>
          </div>
          <div class="complexity-item">
            <span>空间复杂度:</span>
            <span class="complexity-value space">{{ currentAlgorithm.complexity.space }}</span>
          </div>
          <div class="complexity-item">
            <span>稳定性:</span>
            <span
              class="complexity-value"
              :class="{ stable: currentAlgorithm.stable, unstable: !currentAlgorithm.stable }"
            >
              {{ currentAlgorithm.stable ? '稳定' : '不稳定' }}
            </span>
          </div>
        </div>
      </div>

      <div class="detail-content">
        <div class="section">
          <h3>基本思想</h3>
          <p>{{ currentAlgorithm.idea }}</p>
        </div>

        <div class="section">
          <h3>步骤</h3>
          <ul>
            <li v-for="(step, idx) in currentAlgorithm.steps" :key="idx">{{ step }}</li>
          </ul>
        </div>

        <div class="section">
          <h3>代码实现 (TypeScript)</h3>
          <pre><code>{{ currentAlgorithm.code }}</code></pre>
        </div>

        <div class="section">
          <h3>使用场景</h3>
          <p>{{ currentAlgorithm.scenario }}</p>
        </div>

        <div class="section">
          <h3>性能表现</h3>
          <p>{{ currentAlgorithm.performance }}</p>
        </div>

        <div class="section">
          <h3>优缺点</h3>
          <div class="pros-cons">
            <div class="pros">
              <h4>优点:</h4>
              <ul>
                <li v-for="(pro, idx) in currentAlgorithm.pros" :key="idx">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点:</h4>
              <ul>
                <li v-for="(con, idx) in currentAlgorithm.cons" :key="idx">{{ con }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>提示: 点击上方的算法卡片查看详细内容</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, onMounted } from 'vue'

const emit = defineEmits(['goToByRouteName'])

function goToDetail() {
  emit('goToByRouteName', 'SortingAlgorithm')
}

interface Algorithm {
  name: string
  shortDesc: string
  color: string
  tags: string[]
  steps: string[]
  complexity: {
    time: string
    best: string
    avg: string
    worst: string
    space: string
  }
  stable: boolean
  idea: string
  code: string
  scenario: string
  performance: string
  pros: string[]
  cons: string[]
}

const algorithms = ref<Algorithm[]>([])

onMounted(async() => {
  const data = await import('../../../../JSON/SortingAlgorithms.json')
  algorithms.value = data.default as Algorithm[]
})

const activeAlgorithm = ref<number | null>(null)

const currentAlgorithm = computed(() => {
  return activeAlgorithm.value !== null ? algorithms.value[activeAlgorithm.value] : algorithms.value[0]
})
</script>

<style scoped lang="less">


.sorting-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .intro {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  .algorithm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .algorithm-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    &.active {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      border: 2px solid #3498db;
    }

    .card-header {
      padding: 1.2rem;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;

      .algorithm-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 1rem;
      }

      h3 {
        margin: 0;
        flex-grow: 1;
        font-size: 1.2rem;
      }

      .time-complexity {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        span {
          font-size: 0.8rem;
          color: #777;
        }

        .complexity-value {
          font-weight: bold;
          font-size: 1.1rem;
          color: #e74c3c;
        }
      }
    }

    .card-body {
      padding: 1.2rem;

      p {
        margin: 0 0 1rem 0;
        color: #555;
        line-height: 1.5;
      }
    }

    .algorithm-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag {
        background: #e0e7ff;
        color: #4f46e5;
        padding: 0.3rem 0.7rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
  }

  .algorithm-detail {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    margin-top: 1.5rem;

    .detail-header {
      padding: 1.5rem;
      background: #2c3e50;
      color: white;

      h2 {
        margin: 0 0 1rem 0;
        font-size: 1.8rem;
      }
    }

    .complexity-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 8px;

      .complexity-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);

        span:first-child {
          color: #ecf0f1;
        }

        .complexity-value {
          font-weight: bold;

          &.best {
            color: #2ecc71;
          }

          &.avg {
            color: #f39c12;
          }

          &.worst {
            color: #e74c3c;
          }

          &.space {
            color: #3498db;
          }

          &.stable {
            color: #2ecc71;
          }

          &.unstable {
            color: #e74c3c;
          }
        }
      }
    }

    .detail-content {
      padding: 2rem;

      .section {
        margin-bottom: 2rem;

        h3 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
          font-size: 1.4rem;
        }

        p {
          line-height: 1.7;
          color: #444;
          margin-bottom: 1.5rem;
        }
      }

      pre {
        background: #2d3748;
        border-radius: 8px;
        padding: 1.5rem;
        overflow-x: auto;
        margin: 1.5rem 0;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

        code {
          font-family: 'Source Code Pro', monospace;
          font-size: 0.95rem;
          color: #e2e8f0;
          line-height: 1.5;
        }
      }

      .pros-cons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        .pros,
        .cons {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.5rem;

          h4 {
            margin-top: 0;
            color: #2c3e50;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid;
          }

          ul {
            padding-left: 1.5rem;
            margin: 1rem 0 0 0;

            li {
              margin-bottom: 0.7rem;
              line-height: 1.5;
            }
          }
        }

        .pros {
          border-top: 4px solid #2ecc71;

          h4 {
            border-color: #2ecc71;
          }
        }

        .cons {
          border-top: 4px solid #e74c3c;

          h4 {
            border-color: #e74c3c;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
}
</style>
