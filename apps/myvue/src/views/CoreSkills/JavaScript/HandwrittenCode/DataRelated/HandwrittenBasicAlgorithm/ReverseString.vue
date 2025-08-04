<template>
  <div class="string-reverse-container">
    <h1 class="main-title">JavaScript 字符串反转</h1>

    <!-- 方法导航 -->
    <div class="method-nav">
      <button v-for="method in methods" :key="method.id" :class="{ active: activeMethod === method.id }"
        @click="activeMethod = method.id">
        {{ method.label }}
      </button>
    </div>

    <!-- 方法展示区 -->
    <div class="method-container">
      <!-- 数组反转法 -->
      <div v-show="activeMethod === 'array'" class="method-card">
        <h2 class="method-title">
          <span class="icon">🔄</span>
          数组反转法
        </h2>
        <div class="method-content">
          <div class="explanation">
            <h3>实现思路</h3>
            <ol>
              <li>将字符串转换为字符数组</li>
              <li>使用数组的reverse()方法反转</li>
              <li>将数组转换回字符串</li>
            </ol>
          </div>
          <pre class="code-sample"><code>function reverseByArray(str: string): string {
  // 使用split将字符串转为数组
  const arr = str.split('');

  // 使用数组反转方法
  const reversedArr = arr.reverse();

  // 将数组合并为字符串
  return reversedArr.join('');
}</code></pre>
        </div>
      </div>

      <!-- 循环遍历法 -->
      <div v-show="activeMethod === 'loop'" class="method-card">
        <h2 class="method-title">
          <span class="icon">🔄</span>
          循环遍历法
        </h2>
        <div class="method-content">
          <div class="explanation">
            <h3>实现思路</h3>
            <ol>
              <li>创建空字符串用于存储结果</li>
              <li>从后向前遍历原字符串</li>
              <li>逐个字符拼接结果</li>
            </ol>
          </div>
          <pre class="code-sample"><code>function reverseByLoop(str: string): string {
  let reversed = '';

  // 从最后一个字符开始遍历
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}</code></pre>
        </div>
      </div>

      <!-- 递归法 -->
      <div v-show="activeMethod === 'recursion'" class="method-card">
        <h2 class="method-title">
          <span class="icon">🔄</span>
          递归实现法
        </h2>
        <div class="method-content">
          <div class="explanation">
            <h3>实现思路</h3>
            <ol>
              <li>递归终止条件：空字符串</li>
              <li>取出最后一个字符拼接</li>
              <li>递归处理剩余字符串</li>
            </ol>
          </div>
          <pre class="code-sample"><code>function reverseByRecursion(str: string): string {
  // 基线条件
  if (str === '') return '';

  // 取出最后一个字符 + 递归处理前面部分
  return str.slice(-1) + reverseByRecursion(str.slice(0, -1));
}</code></pre>
        </div>
      </div>

      <!-- 扩展运算符法 -->
      <div v-show="activeMethod === 'spread'" class="method-card">
        <h2 class="method-title">
          <span class="icon">🔄</span>
          ES6扩展运算符法
        </h2>
        <div class="method-content">
          <div class="explanation">
            <h3>实现思路</h3>
            <ol>
              <li>使用扩展运算符解构字符串</li>
              <li>直接反转生成的数组</li>
              <li>合并为字符串</li>
            </ol>
          </div>
          <pre class="code-sample"><code>function reverseBySpread(str: string): string {
  // 使用扩展运算符转为数组
  return [...str].reverse().join('');
}</code></pre>
        </div>
      </div>
    </div>

    <!-- 方法对比 -->
    <div class="comparison-table">
      <h2>方法对比分析</h2>
      <table>
        <thead>
          <tr>
            <th>方法</th>
            <th>时间复杂度</th>
            <th>空间复杂度</th>
            <th>适用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>数组反转法</td>
            <td>O(n)</td>
            <td>O(n)</td>
            <td>简单快速实现</td>
          </tr>
          <tr>
            <td>循环遍历法</td>
            <td>O(n)</td>
            <td>O(n)</td>
            <td>避免使用数组方法</td>
          </tr>
          <tr>
            <td>递归法</td>
            <td>O(n)</td>
            <td>O(n)</td>
            <td>理解递归思想</td>
          </tr>
          <tr>
            <td>扩展运算符法</td>
            <td>O(n)</td>
            <td>O(n)</td>
            <td>ES6+环境简洁写法</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const methods = [
  { id: 'array', label: '数组反转' },
  { id: 'loop', label: '循环遍历' },
  { id: 'recursion', label: '递归实现' },
  { id: 'spread', label: '扩展运算符' }
]

const activeMethod = ref('array')
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@text-color: #2c3e50;
@border-color: #ecf0f1;

.string-reverse-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.main-title {
  text-align: center;
  color: @text-color;
  margin-bottom: 2rem;
  font-size: 2.2rem;
}

.method-nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;

  button {
    padding: 0.8rem 1.5rem;
    border: 2px solid @border-color;
    background: white;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;

    &.active {
      background: @primary-color;
      color: white;
      border-color: @primary-color;
    }

    &:hover {
      transform: translateY(-2px);
    }
  }
}

.method-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  padding: 2rem;

  .method-title {
    color: @text-color;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;

    .icon {
      margin-right: 0.8rem;
    }
  }

  .method-content {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .explanation {
    h3 {
      color: @primary-color;
      margin-bottom: 1rem;
    }

    ol {
      padding-left: 1.5rem;
      line-height: 1.6;
      color: #7f8c8d;

      li {
        margin: 0.8rem 0;
      }
    }
  }

  .code-sample {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      color: #34495e;
      line-height: 1.5;
      display: block;
    }
  }
}

.comparison-table {
  margin-top: 3rem;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    th,
    td {
      padding: 1rem;
      text-align: left;
    }

    thead {
      background: @primary-color;
      color: white;

      th {
        font-weight: 600;
      }
    }

    tbody tr:nth-child(even) {
      background: #f8f9fa;
    }

    td {
      border-bottom: 1px solid @border-color;
    }
  }
}

@media (max-width: 768px) {
  .method-nav {
    flex-wrap: wrap;
  }

  .method-card {
    padding: 1.5rem;
  }
}
</style>
