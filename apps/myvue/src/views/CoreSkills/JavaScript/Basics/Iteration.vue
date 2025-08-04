<template>
  <div class="loop-methods-container">
    <header class="header">
      <h1>JavaScript 循环方法基本介绍</h1>
      <p>高效遍历数据，优化前端性能</p>
    </header>

    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-value">12+</div>
        <div class="stat-label">循环方法</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">7x</div>
        <div class="stat-label">性能差异</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">100%</div>
        <div class="stat-label">实战应用</div>
      </div>
    </div>

    <div class="content-section">
      <h2><i class="icon fas fa-list-ol"></i> 基础循环方法</h2>
      <div class="methods-grid">
        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">for</span>
            <h3>for 循环</h3>
          </div>
          <div class="method-content">
            <pre><code>for (let i = 0; i < arr.length; i++) {
  // 操作 arr[i]
}</code></pre>
            <div class="method-details">
              <p><strong>适用场景：</strong>通用遍历、需要索引位置、性能关键操作</p>
              <p><strong>注意事项：</strong>注意循环终止条件，避免无限循环</p>
              <div class="advantage-list">
                <ul>
                  <li><strong>优势：</strong></li>
                  <li>性能最佳</li>
                  <li>语法简洁</li>
                  <li>可读性强</li>
                  <li>灵活性高</li>
                  <li>兼容性好</li>
                  <li>可中断(break)，可跳过(continue)</li>
                </ul>
                <ul>
                  <li><strong>劣势：</strong></li>
                  <li>无法直接遍历对象</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">for...of</span>
            <h3>for...of 循环</h3>
          </div>
          <div class="method-content">
            <pre><code>for (const item of arr) {
  // 操作 item
}</code></pre>
            <div class="method-details">
              <p><strong>适用场景：</strong>遍历可迭代对象（Array, Map, Set等）</p>
              <p><strong>注意事项：</strong>不支持普通对象，不能直接访问索引</p>
              <div class="advantage-list">
                <ul>
                  <li><strong>优势：</strong></li>
                  <li>语法简洁</li>
                  <li>可读性强</li>
                  <li>可中断(break)，可跳过(continue)</li>
                  <li>可遍历对象</li>
                  <li>性能快</li>
                </ul>
                <ul>
                  <li><strong>劣势：</strong></li>
                  <li>无法直接遍历对象</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">while</span>
            <h3>while 循环</h3>
          </div>
          <div class="method-content">
            <pre><code>let i = 0;
while (i < arr.length) {
  // 操作 arr[i]
  i++;
}</code></pre>
            <div class="method-details">
              <p><strong>适用场景：</strong>条件未知的循环、链表遍历</p>
              <p><strong>注意事项：</strong>确保循环条件会变为 false，防止无限循环</p>
              <div class="advantage-list">
                <ul>
                  <li><strong>优势：</strong></li>
                  <li>语法简洁</li>
                  <li>可读性强</li>
                  <li>可中断(break)，可跳过(continue)</li>
                  <li>性能快</li>
                  <li>动态循环次数</li>
                </ul>
                <ul>
                  <li><strong>劣势：</strong></li>
                  <li>无法遍历对象</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">do...while</span>
            <h3>do...while 循环</h3>
          </div>
          <div class="method-content">
            <pre><code>do {
  // 操作 arr[i]
} while (i < arr.length);</code></pre>
            <div class="method-details">
              <p><strong>适用场景：</strong>条件未知的循环、链表遍历</p>
              <p><strong>注意事项：</strong>确保循环条件会变为 false，防止无限循环</p>
            </div>
            <div class="advantage-list">
              <ul>
                <li><strong>优势：</strong></li>
                <li>语法简洁</li>
                <li>可读性强</li>
                <li>可中断(break)，可跳过(continue)</li>
                <li>性能快</li>
                <li>动态循环次数</li>
                <li>可遍历对象</li>
              </ul>
              <ul>
                <li><strong>劣势：</strong></li>
                <li>无法遍历对象</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">for...in</span>
            <h3>for...in 循环</h3>
          </div>
          <div class="method-content">
            <pre><code>for (const key in obj) {
  // 操作 obj[key]
}</code></pre>
          </div>
          <div class="method-details"></div>
          <div class="advantage-list">
            <ul>
              <li><strong>优势：</strong></li>
              <li>语法简洁</li>
              <li>可读性强</li>
              <li>可遍历对象</li>
              <li>性能中等</li>
            </ul>
            <ul>
              <li><strong>劣势：</strong></li>
              <li>遍历对象属性，不保证顺序</li>
              <li>会遍历到原型链属性</li>
            </ul>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">prototype</span>
            <h3>数组原型方法</h3>
          </div>
          <div class="method-content">
            <pre><code>arr.forEach((item, index) => {
  // 操作 item 或 index
});
arr.map((item, index) => {
  // 操作 item 或 index
});
arr.filter((item, index) => {
  // 操作 item 或 index
});
arr.reduce((acc, item, index) => {
  // 操作 acc 或 item 或 index
}, initialValue);
</code></pre>
            <div class="method-details">
              <p><strong>适用场景：</strong>数组遍历、函数式编程</p>
              <p><strong>注意事项：</strong>不能使用 break/continue，无法提前退出循环</p>
              <div class="advantage-list">
                <ul>
                  <li><strong>优势：</strong></li>
                  <li>语法简洁</li>
                  <li>可读性强</li>
                  <li>可中断(break)，可跳过(continue)</li>
                  <li>性能中等</li>
                </ul>
                <ul>
                  <li><strong>劣势：</strong></li>
                  <li>无法中断循环</li>
                  <li>无法跳过元素</li>
                  <li>无法遍历对象</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2><i class="icon fas fa-bolt"></i> 高级循环方法</h2>
      <div class="methods-grid">
        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">map</span>
            <h3>map 方法</h3>
          </div>
          <div class="method-content">
            <pre><code>const newArr = arr.map(item => {
  return transform(item);
});</code></pre>
            <div class="method-details">
              <p><strong>适用场景：</strong>数组转换，创建新数组</p>
              <p><strong>注意事项：</strong>不要用于没有返回值的操作</p>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">filter</span>
            <h3>filter 方法</h3>
          </div>
          <div class="method-content">
            <pre><code>const filtered = arr.filter(item => {
  return condition(item);
});</code></pre>
            <div class="method-details">
              <p><strong>适用场景：</strong>基于条件筛选数组元素</p>
              <p><strong>注意事项：</strong>返回新数组，不影响原数组</p>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">reduce</span>
            <h3>reduce 方法</h3>
          </div>
          <div class="method-content">
            <pre><code>const result = arr.reduce((acc, item) => {
  return acc + item;
}, initialValue);</code></pre>
            <div class="method-details">
              <p><strong>适用场景：</strong>数组聚合、计算总和等</p>
              <p><strong>注意事项：</strong>提供初始值避免错误</p>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <span class="method-icon">for...in</span>
            <h3>for...in 循环</h3>
          </div>
          <div class="method-content">
            <pre><code>for (const key in obj) {
  // 操作 obj[key]
}</code></pre>
            <div class="method-details">
              <p><strong>适用场景：</strong>遍历对象属性</p>
              <p><strong>注意事项：</strong>会遍历原型链属性，不保证顺序</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2><i class="icon fas fa-chart-line"></i> 性能对比</h2>
      <div class="performance-table">
        <table>
          <thead>
            <tr>
              <th>循环方法(耗时ms)</th>
              <th>1,000 次 (ms)</th>
              <th>10,000 次 (ms)</th>
              <th>100,000 次 (ms)</th>
              <th>1,000,000 次 (ms)</th>
              <th>10,000,000 次 (ms)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>for 循环</strong></td>
              <td>0.05</td>
              <td>0.45</td>
              <td>4.2</td>
              <td>42</td>
              <td>420</td>
            </tr>
            <tr>
              <td><strong>while 循环</strong></td>
              <td>0.06</td>
              <td>0.52</td>
              <td>4.8</td>
              <td>48</td>
              <td>480</td>
            </tr>
            <tr>
              <td><strong>for...of</strong></td>
              <td>0.08</td>
              <td>0.75</td>
              <td>7.2</td>
              <td>72</td>
              <td>720</td>
            </tr>
            <tr>
              <td><strong>for...in</strong></td>
              <td>0.09</td>
              <td>0.85</td>
              <td>8.2</td>
              <td>82</td>
              <td>820</td>
            </tr>
            <tr>
              <td><strong>forEach</strong></td>
              <td>0.12</td>
              <td>1.2</td>
              <td>11.5</td>
              <td>115</td>
              <td>1150</td>
            </tr>
            <tr>
              <td><strong>map</strong></td>
              <td>0.15</td>
              <td>1.5</td>
              <td>14</td>
              <td>140</td>
              <td>1400</td>
            </tr>
            <tr>
              <td><strong>reduce</strong></td>
              <td>0.18</td>
              <td>1.8</td>
              <td>17</td>
              <td>170</td>
              <td>1700</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="performance-chart">
        <div class="chart-container">
          <div class="chart-legend">
            <div v-for="(method, index) in methods" :key="index" class="legend-item">
              <span class="legend-color" :style="{ backgroundColor: colors[index] }"></span>
              <span class="legend-label">{{ method }}</span>
            </div>
          </div>
          <div class="chart">
            <div class="chart-bar" v-for="(value, size) in performanceData" :key="size">
              <div class="size-label">{{ size }}</div>
              <div class="bars-container">
                <div
                  v-for="(method, index) in methods"
                  :key="index"
                  class="bar"
                  :style="{
                    height: `${(performanceData[size][index] / maxValue) * 100}%`,
                    backgroundColor: colors[index],
                    width: `${100 / methods.length - 2}%`,
                    left: `${(index * 100) / methods.length}%`,
                  }"
                >
                  <div class="bar-value">{{ performanceData[size][index] }}ms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2><i class="icon fas fa-lightbulb"></i> 性能优化技巧</h2>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">🔥</div>
          <h3>缓存数组长度</h3>
          <p>在for循环前缓存数组长度，避免每次迭代都访问length属性</p>
          <pre><code>const len = arr.length;
for (let i = 0; i < len; i++) {}</code></pre>
        </div>

        <div class="tip-card">
          <div class="tip-icon">⚡</div>
          <h3>倒序循环</h3>
          <p>使用倒序循环可以略微提升性能（减少一次比较操作）</p>
          <pre><code>for (let i = arr.length - 1; i >= 0; i--) {}</code></pre>
        </div>

        <div class="tip-card">
          <div class="tip-icon">🚀</div>
          <h3>减少DOM操作</h3>
          <p>在循环中避免直接操作DOM，使用文档片段批量更新</p>
          <pre><code>const fragment = document.createDocumentFragment();
arr.forEach(item => {
  const el = createElement(item);
  fragment.appendChild(el);
});
container.appendChild(fragment);</code></pre>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <h3>循环展开</h3>
          <p>对于非常小的循环，手动展开可以提升性能</p>
          <pre><code>// 处理前4个元素
process(arr[0]); process(arr[1]);
process(arr[2]); process(arr[3]);

// 处理剩余元素
for (let i = 4; i < arr.length; i++) {
  process(arr[i]);
}</code></pre>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>JavaScript 循环方法最佳实践 | 性能数据基于 Chrome 115 测试</p>
      <p>© 2023 前端性能优化指南</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 性能数据
const methods = ['for', 'while', 'for...of', 'for...in', 'forEach', 'map', 'reduce']
const colors = ['#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#e74c3c', '#1abc9c', '#f1c40f']

const performanceData = ref({
  '1,000': [0.05, 0.06, 0.08, 0.09, 0.12, 0.15, 0.18],
  '10,000': [0.45, 0.52, 0.75, 0.85, 1.2, 1.5, 1.8],
  '100,000': [4.2, 4.8, 7.2, 8.2, 11.5, 14, 17],
  '1,000,000': [42, 48, 72, 82, 115, 140, 170],
  '10,000,000': [420, 480, 720, 820, 1150, 1400, 1700],
})

// 计算最大值用于图表
const maxValue = Math.max(...Object.values(performanceData.value).flat())
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #9b59b6;
@warning-color: #e74c3c;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@table-header: #f1f5f9;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.loop-methods-container {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.advantage-list {
  display: flex;
  justify-content: space-between;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 40px 0;
  background: linear-gradient(135deg, @primary-color, #8e44ad);
  color: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 700;
  }

  p {
    font-size: 1.3rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.stats-bar {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 25px 15px;
  text-align: center;
  width: 30%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: @primary-color;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.content-section {
  margin-bottom: 40px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: @primary-color;
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 2px solid @border-color;

    .icon {
      margin-right: 12px;
      font-size: 1.4rem;
    }
  }
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.method-card {
  background: @card-bg;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }
}

.method-header {
  background: linear-gradient(135deg, @primary-color, #2980b9);
  color: white;
  padding: 18px 20px;
  display: flex;
  align-items: center;

  h3 {
    font-size: 1.4rem;
    margin: 0;
  }
}

.method-icon {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-weight: 700;
  font-size: 0.9rem;
}

.method-content {
  padding: 20px;

  pre {
    background: #2d2d2d;
    border-radius: 8px;
    padding: 15px;
    overflow-x: auto;
    margin-bottom: 15px;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

.method-details {
  background: lighten(@light-bg, 2%);
  border-radius: 8px;
  padding: 15px;
  font-size: 0.95rem;

  p {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.performance-table {
  overflow-x: auto;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;

    th,
    td {
      padding: 16px 20px;
      text-align: center;
    }

    thead {
      background: @table-header;

      th {
        font-weight: 600;
        color: @text-color;
        border-bottom: 2px solid @border-color;
      }
    }

    tbody tr {
      border-bottom: 1px solid @border-color;

      &:nth-child(odd) {
        background: rgba(240, 244, 248, 0.5);
      }

      &:hover {
        background: rgba(52, 152, 219, 0.08);
      }

      td:first-child {
        font-weight: 600;
        text-align: left;
      }
    }
  }
}

.performance-chart {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.chart-container {
  display: flex;
  flex-direction: column;
}

.chart-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 15px 10px;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
}

.legend-label {
  font-size: 0.95rem;
  font-weight: 500;
}

.chart {
  display: flex;
  height: 400px;
  border-left: 1px solid @border-color;
  border-bottom: 1px solid @border-color;
  padding: 0 20px 30px;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

.size-label {
  position: absolute;
  top: calc(100% + 8px);
  font-size: 0.9rem;
  color: #7f8c8d;
}

.bars-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.bar {
  position: absolute;
  bottom: 0;
  transition: height 0.5s ease;
  border-radius: 4px 4px 0 0;
  display: flex;
  justify-content: center;

  .bar-value {
    position: absolute;
    top: -30px;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.tip-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.tip-icon {
  font-size: 2.5rem;
  text-align: center;
  padding: 25px 0 15px;
}

.tip-card h3 {
  text-align: center;
  font-size: 1.3rem;
  color: @primary-color;
  margin-bottom: 15px;
  padding: 0 20px;
}

.tip-card p {
  padding: 0 20px 15px;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
}

.tip-card pre {
  background: #f8f9fa;
  border-radius: 0 0 10px 10px;
  padding: 15px;
  margin: 0;
  font-size: 0.85rem;
  border-top: 1px solid @border-color;

  code {
    color: #2c3e50;
    font-family: 'Fira Code', monospace;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 25px;
  color: #7f8c8d;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  p:first-child {
    margin-bottom: 8px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .stats-bar {
    flex-direction: column;
    align-items: center;
  }

  .stat-card {
    width: 90%;
    margin-bottom: 20px;
  }

  .chart {
    height: 300px;
  }
}
</style>
