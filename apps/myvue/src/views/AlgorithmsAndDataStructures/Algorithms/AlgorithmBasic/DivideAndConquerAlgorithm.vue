<template>
  <div class="divide-conquer-container">
    <header class="header">
      <h1 class="title">分治算法基础介绍</h1>
      <div class="subtitle">Divide and Conquer Algorithm</div>
      <a class="jump-more" @click="jumpMore">跳转更多</a>
    </header>

    <div class="content">
      <section class="card intro-section">
        <div class="section-header">
          <div class="icon">📊</div>
          <h2>什么是分治算法？</h2>
        </div>
        <p class="description">
          分治算法（Divide and Conquer）是一种重要的算法设计思想，它通过将复杂问题分解为若干个规模较小的相同或相似子问题，
          递归解决这些子问题，再将子问题的解合并得到原问题的解。
        </p>
        <div class="algorithm-flow">
          <div class="flow-step">
            <div class="step-number">1</div>
            <h3>分解（Divide）</h3>
            <p>将原问题分解为若干规模较小的子问题</p>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">2</div>
            <h3>解决（Conquer）</h3>
            <p>递归解决子问题（若子问题足够小则直接求解）</p>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">3</div>
            <h3>合并（Combine）</h3>
            <p>将子问题的解合并为原问题的解</p>
          </div>
        </div>
      </section>

      <div class="card-row">
        <section class="card usage-section">
          <div class="section-header">
            <div class="icon">🔍</div>
            <h2>适用场景</h2>
          </div>
          <ul class="usage-list">
            <li>
              <div class="list-icon">✅</div>
              <div class="list-content">
                <h3>问题可分解</h3>
                <p>问题可以分解为多个相同/相似的子问题</p>
              </div>
            </li>
            <li>
              <div class="list-icon">✅</div>
              <div class="list-content">
                <h3>子问题独立</h3>
                <p>子问题之间相互独立，没有重叠部分</p>
              </div>
            </li>
            <li>
              <div class="list-icon">✅</div>
              <div class="list-content">
                <h3>可合并解</h3>
                <p>子问题的解可以合并为原问题的解</p>
              </div>
            </li>
          </ul>
        </section>

        <section class="card example-section">
          <div class="section-header">
            <div class="icon">💡</div>
            <h2>经典案例</h2>
          </div>
          <div class="examples">
            <div class="example">
              <h3>归并排序</h3>
              <p>将数组分为两半，分别排序后合并</p>
            </div>
            <div class="example">
              <h3>快速排序</h3>
              <p>选取基准值，分区后递归排序</p>
            </div>
            <div class="example">
              <h3>二分搜索</h3>
              <p>每次将搜索范围减半</p>
            </div>
            <div class="example">
              <h3>汉诺塔问题</h3>
              <p>将大问题分解为小规模汉诺塔问题</p>
            </div>
          </div>
        </section>
      </div>

      <section class="card code-section">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>代码示例 - 归并排序</h2>
        </div>
        <div class="code-container">
          <pre><code>function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  // 1. 分解：将数组分成两半
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // 2. 合并：合并两个有序数组
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  let result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}</code></pre>
        </div>
        <div class="complexity">
          <div class="complexity-item">
            <span>时间复杂度</span>
            <div class="badge">O(n log n)</div>
          </div>
          <div class="complexity-item">
            <span>空间复杂度</span>
            <div class="badge">O(n)</div>
          </div>
        </div>
      </section>

      <section class="card comparison-section">
        <div class="section-header">
          <div class="icon">⚖️</div>
          <h2>算法对比</h2>
        </div>
        <div class="comparison-table">
          <div class="table-header">
            <div class="header-item">算法</div>
            <div class="header-item">思想</div>
            <div class="header-item">适用问题</div>
            <div class="header-item">时间复杂度</div>
          </div>
          <div class="table-row">
            <div class="table-cell algo-name">分治</div>
            <div class="table-cell">分解-解决-合并</div>
            <div class="table-cell">可分解且子问题独立</div>
            <div class="table-cell">通常为 O(n log n)</div>
          </div>
          <div class="table-row">
            <div class="table-cell algo-name">贪心</div>
            <div class="table-cell">局部最优选择</div>
            <div class="table-cell">最优子结构问题</div>
            <div class="table-cell">通常为 O(n) 或 O(n²)</div>
          </div>
          <div class="table-row">
            <div class="table-cell algo-name">动态规划</div>
            <div class="table-cell">记忆化+状态转移</div>
            <div class="table-cell">重叠子问题+最优子结构</div>
            <div class="table-cell">通常为 O(n²) 或 O(n³)</div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>分治算法总结：将大问题分解为小问题，递归解决，合并结果</p>
      <p>关键：找到合适的分解策略和高效的合并方法</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const jumpMore = () => {
  router.push({
    name: 'DivideAndConquerAlgorithm2'
  });
};
// 这里可以添加组件逻辑，但当前组件主要是展示
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

.divide-conquer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(to right, #3498db, #2c3e50);
    border-radius: 12px;
    color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    .title {
      font-size: 2.8rem;
      margin: 10px 0;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .subtitle {
      font-size: 1.4rem;
      opacity: 0.9;
      font-weight: 300;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
    }

    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      border-bottom: 2px solid #eef2f7;
      padding-bottom: 15px;

      .icon {
        font-size: 2rem;
        margin-right: 15px;
        background: #3498db;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h2 {
        font-size: 1.8rem;
        color: #2c3e50;
        margin: 0;
      }
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #4a5568;
      margin-bottom: 25px;
    }
  }

  .intro-section {
    .algorithm-flow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;

      .flow-step {
        text-align: center;
        background: #f8fafc;
        border-radius: 10px;
        padding: 20px;
        width: 30%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

        .step-number {
          background: #3498db;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-weight: bold;
          font-size: 1.2rem;
        }

        h3 {
          color: #2c3e50;
          margin: 10px 0;
        }

        p {
          color: #4a5568;
          font-size: 0.95rem;
        }
      }

      .flow-arrow {
        font-size: 2rem;
        color: #3498db;
        font-weight: bold;
      }
    }
  }

  .card-row {
    display: flex;
    gap: 25px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .card {
      flex: 1;
    }
  }

  .usage-section {
    .usage-list {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        margin-bottom: 25px;
        padding: 15px;
        border-radius: 8px;
        background: #f8fafc;
        transition: all 0.3s ease;

        &:hover {
          background: #ebf5fb;
          transform: translateX(5px);
        }

        .list-icon {
          font-size: 1.5rem;
          margin-right: 15px;
          color: #3498db;
        }

        .list-content {
          h3 {
            margin: 0 0 8px 0;
            color: #2c3e50;
          }

          p {
            margin: 0;
            color: #4a5568;
            font-size: 0.95rem;
          }
        }
      }
    }
  }

  .example-section {
    .examples {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }

      .example {
        background: #f0f7ff;
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid #3498db;

        h3 {
          margin: 0 0 10px 0;
          color: #2c3e50;
        }

        p {
          margin: 0;
          color: #4a5568;
          font-size: 0.95rem;
        }
      }
    }
  }

  .code-section {
    .code-container {
      background: #2d3748;
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;
      margin-bottom: 20px;

      pre {
        margin: 0;

        code {
          color: #cbd5e0;
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          line-height: 1.5;
        }
      }
    }

    .complexity {
      display: flex;
      gap: 20px;
      justify-content: center;

      .complexity-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
          margin-bottom: 8px;
          color: #4a5568;
          font-size: 0.9rem;
        }

        .badge {
          background: #3498db;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: bold;
        }
      }
    }
  }

  .comparison-section {
    .comparison-table {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

      .table-header {
        display: flex;
        background: #3498db;
        color: white;
        font-weight: bold;

        .header-item {
          flex: 1;
          padding: 15px;
          text-align: center;
        }
      }

      .table-row {
        display: flex;
        border-bottom: 1px solid #e2e8f0;
        background: white;

        &:nth-child(even) {
          background: #f8fafc;
        }

        .table-cell {
          flex: 1;
          padding: 15px;
          text-align: center;

          &.algo-name {
            font-weight: bold;
            color: #2c3e50;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    background: #2c3e50;
    color: white;
    border-radius: 12px;
    font-size: 1.1rem;

    p {
      margin: 10px 0;

      &:first-child {
        font-weight: bold;
      }
    }
  }
}
</style>
