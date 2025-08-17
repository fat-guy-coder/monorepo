<template>
  <div class="bf-rk-container">
    <header class="header">
      <h1 class="title">字符串匹配算法</h1>
      <div class="subtitle">暴力匹配(BF)与Rabin-Karp(RK)算法详解</div>
      <div class="algorithm-badges">
        <div class="badge bf-badge">BF算法</div>
        <div class="badge rk-badge">RK算法</div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 算法对比概览 -->
      <section class="comparison-section">
        <h2 class="section-title">算法对比概览</h2>
        <div class="comparison-grid">
          <div class="comparison-header">
            <div></div>
            <div>暴力匹配 (BF)</div>
            <div>Rabin-Karp (RK)</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-label">核心思想</div>
            <div>逐个字符比较</div>
            <div>哈希值比较</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-label">时间复杂度</div>
            <div>O(m×n)</div>
            <div>O(m+n)</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-label">空间复杂度</div>
            <div>O(1)</div>
            <div>O(1)</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-label">优点</div>
            <div>实现简单，无需预处理</div>
            <div>平均性能好，适合多模式匹配</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-label">缺点</div>
            <div>效率低，文本大时性能差</div>
            <div>哈希冲突可能影响性能</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-label">适用场景</div>
            <div>短文本、简单应用</div>
            <div>大文本、多模式匹配</div>
          </div>
        </div>
      </section>

      <!-- 暴力匹配算法详情 -->
      <section class="algorithm-section bf-section">
        <div class="section-header">
          <div class="algorithm-icon">👊</div>
          <h2>暴力匹配算法 (Brute-Force)</h2>
        </div>

        <div class="algorithm-content">
          <div class="text-block">
            <h3>算法介绍</h3>
            <p>暴力匹配算法是最简单直观的字符串匹配算法，也称为朴素字符串匹配算法。该算法通过逐个比较文本和模式串的字符来查找匹配位置。</p>
            <p>BF算法不需要任何预处理，实现简单，但效率较低，最坏情况下的时间复杂度为O(m×n)，其中m是模式串长度，n是文本长度。</p>
          </div>

          <div class="text-block">
            <h3>算法思路</h3>
            <p>BF算法的核心思想是：从文本的第一个字符开始，将模式串与文本当前位置对齐，然后逐个比较对应位置的字符。</p>
            <p>如果所有字符都匹配，则找到了一个匹配位置；如果某个字符不匹配，则将模式串向右移动一位，重新开始比较。</p>
            <div class="visualization">
              <div class="text-line">
                <span class="text-char" v-for="(char, index) in demoText" :key="'text'+index">{{ char }}</span>
              </div>
              <div class="pattern-line" :style="{ left: bfPosition * 40 + 'px' }">
                <span class="pattern-char" v-for="(char, index) in demoPattern" :key="'pattern'+index">{{ char }}</span>
              </div>
              <div class="comparison-indicator" :style="{ left: (bfPosition + bfCompareIndex) * 40 + 20 + 'px' }">↑</div>
            </div>
          </div>

          <div class="text-block">
            <h3>算法步骤</h3>
            <ol class="algorithm-steps">
              <li>初始化文本指针i为0</li>
              <li>当i ≤ n - m时（n为文本长度，m为模式串长度）：
                <ol>
                  <li>设置模式指针j为0</li>
                  <li>当j < m 且 text[i+j] == pattern[j]时，j增加1</li>
                  <li>如果j等于m，则匹配成功，返回位置i</li>
                  <li>否则，i增加1</li>
                </ol>
              </li>
              <li>如果遍历完文本未找到匹配，返回-1</li>
            </ol>
          </div>

          <div class="text-block">
            <h3>算法实现</h3>
            <pre class="code-block">function bruteForce(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;

  // 遍历所有可能的起始位置
  for (let i = 0; i <= n - m; i++) {
    let j;
    // 检查当前位置的匹配
    for (j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) {
        break; // 字符不匹配，跳出内层循环
      }
    }
    // 完全匹配
    if (j === m) {
      return i; // 返回匹配位置
    }
  }
  return -1; // 未找到匹配
}</pre>
          </div>
        </div>
      </section>

      <!-- Rabin-Karp算法详情 -->
      <section class="algorithm-section rk-section">
        <div class="section-header">
          <div class="algorithm-icon">🔢</div>
          <h2>Rabin-Karp 算法</h2>
        </div>

        <div class="algorithm-content">
          <div class="text-block">
            <h3>算法介绍</h3>
            <p>Rabin-Karp算法由Michael O. Rabin和Richard M. Karp于1987年提出，是一种基于哈希的字符串匹配算法。</p>
            <p>该算法通过比较模式串的哈希值和文本中子串的哈希值来寻找匹配位置，利用滚动哈希技术高效计算哈希值，平均时间复杂度为O(n+m)。</p>
          </div>

          <div class="text-block">
            <h3>算法思路</h3>
            <p>RK算法的核心思想是：</p>
            <ol>
              <li>计算模式串的哈希值</li>
              <li>计算文本中第一个与模式串等长子串的哈希值</li>
              <li>比较两个哈希值：
                <ul>
                  <li>如果相等，则进一步验证字符是否完全匹配</li>
                  <li>如果不相等，则继续计算下一个子串的哈希值</li>
                </ul>
              </li>
              <li>使用滚动哈希技术高效计算后续子串的哈希值</li>
            </ol>
            <div class="hash-demo">
              <div class="hash-row">
                <div class="hash-label">模式串哈希:</div>
                <div class="hash-value">{{ patternHash }}</div>
              </div>
              <div class="hash-row">
                <div class="hash-label">文本子串哈希:</div>
                <div class="hash-value">{{ currentHash }}</div>
                <div :class="['match-indicator', { match: isHashMatch }]">
                  {{ isHashMatch ? '✓ 匹配' : '✗ 不匹配' }}
                </div>
              </div>
            </div>
          </div>

          <div class="text-block">
            <h3>算法步骤</h3>
            <ol class="algorithm-steps">
              <li>计算模式串的哈希值hashPattern</li>
              <li>计算文本中第一个m长度子串的哈希值hashText</li>
              <li>遍历文本中所有可能的起始位置：
                <ol>
                  <li>如果hashText等于hashPattern，则逐个字符比较验证</li>
                  <li>使用滚动哈希计算下一个子串的哈希值：
                    <div class="formula">
                      hashText = (base × (hashText - text[i] × base<sup>m-1</sup>) + text[i+m]) mod prime
                    </div>
                  </li>
                </ol>
              </li>
              <li>如果找到完全匹配，返回位置；否则返回-1</li>
            </ol>
          </div>

          <div class="text-block">
            <h3>算法实现</h3>
            <pre class="code-block">function rabinKarp(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;
  const base = 256; // 字符集大小
  const prime = 101; // 大质数

  // 计算base^(m-1) % prime
  let h = 1;
  for (let i = 0; i < m - 1; i++) {
    h = (h * base) % prime;
  }

  // 计算初始哈希值
  let hashPattern = 0;
  let hashText = 0;
  for (let i = 0; i < m; i++) {
    hashPattern = (base * hashPattern + pattern.charCodeAt(i)) % prime;
    hashText = (base * hashText + text.charCodeAt(i)) % prime;
  }

  // 遍历文本
  for (let i = 0; i <= n - m; i++) {
    // 哈希值匹配
    if (hashPattern === hashText) {
      // 验证字符级匹配
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) return i;
    }

    // 计算下一个子串的哈希值
    if (i < n - m) {
      hashText = (base * (hashText - text.charCodeAt(i) * h) +
                 text.charCodeAt(i + m)) % prime;
      // 处理负值
      if (hashText < 0) hashText += prime;
    }
  }
  return -1;
}</pre>
          </div>
        </div>
      </section>

      <!-- 应用场景 -->
      <section class="applications-section">
        <h2 class="section-title">应用场景</h2>
        <div class="applications-grid">
          <div class="app-card">
            <div class="app-icon">📝</div>
            <h3>文本编辑器</h3>
            <p>BF算法常用于简单文本搜索功能</p>
          </div>
          <div class="app-card">
            <div class="app-icon">🔍</div>
            <h3>搜索引擎</h3>
            <p>RK算法适合大规模文本的关键词匹配</p>
          </div>
          <div class="app-card">
            <div class="app-icon">📚</div>
            <h3>文献检索</h3>
            <p>RK算法高效处理大量文档搜索</p>
          </div>
          <div class="app-card">
            <div class="app-icon">🔄</div>
            <h3>代码比较</h3>
            <p>BF算法用于简单差异检测</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>BF算法简单直观，适合小规模数据；RK算法通过哈希技术提高效率，适合大规模文本处理</p>
      <p>© 2023 字符串匹配算法 | 计算机科学基础</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// BF算法演示数据
const demoText = "ABABABACABA";
const demoPattern = "ABAC";
const bfPosition = ref(0);
const bfCompareIndex = ref(0);

// RK算法演示数据
const patternHash = ref(1861); // 示例哈希值
const currentHash = ref(1923); // 示例哈希值
const isHashMatch = computed(() => patternHash.value === currentHash.value);

// 模拟BF算法演示
onMounted(() => {
  let position = 0;
  let compareIndex = 0;

  const animateBF = () => {
    if (position > demoText.length - demoPattern.length) {
      position = 0;
      compareIndex = 0;
    }

    if (compareIndex < demoPattern.length) {
      bfPosition.value = position;
      bfCompareIndex.value = compareIndex;

      // 模拟比较过程
      setTimeout(() => {
        compareIndex++;
        animateBF();
      }, 500);
    } else {
      setTimeout(() => {
        position++;
        compareIndex = 0;
        animateBF();
      }, 800);
    }
  };

  animateBF();
});

// 模拟RK算法哈希值变化
onMounted(() => {
  const hashes = [1923, 1745, 2018, 1861, 1923, 1745, 2018];
  let index = 0;

  setInterval(() => {
    currentHash.value = hashes[index];
    index = (index + 1) % hashes.length;
  }, 1500);
});
</script>

<style scoped lang="less">
@primary-color: #3f51b5;
@secondary-color: #5c6bc0;
@bf-color: #f44336;
@rk-color: #4caf50;
@background-light: #f8f9fa;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

.bf-rk-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 30px 0;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #f5f7fa, #e4e7eb);
  border-radius: 12px;
  box-shadow: @card-shadow;

  .title {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    color: @text-light;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
}

.algorithm-badges {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  .badge {
    padding: 8px 25px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 1.1rem;

    &.bf-badge {
      background: fade(@bf-color, 15%);
      color: darken(@bf-color, 10%);
      border: 2px solid fade(@bf-color, 30%);
    }

    &.rk-badge {
      background: fade(@rk-color, 15%);
      color: darken(@rk-color, 10%);
      border: 2px solid fade(@rk-color, 30%);
    }
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 40px;
}

.section-title {
  color: @primary-color;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
}

.comparison-section {
  background: @background-light;
  border-radius: 12px;
  padding: 30px;
  box-shadow: @card-shadow;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;

  .comparison-header {
    display: contents;

    & > div {
      padding: 15px 20px;
      background: lighten(@primary-color, 45%);
      font-weight: 600;
      color: @primary-color;
      text-align: center;

      &:first-child {
        text-align: left;
      }
    }
  }

  .comparison-row {
    display: contents;

    & > div {
      padding: 15px 20px;
      border-bottom: 1px solid @border-color;
      border-right: 1px solid @border-color;
      display: flex;
      align-items: center;

      &:last-child {
        border-right: none;
      }

      &:nth-child(3n+1) {
        background: #f9f9f9;
        font-weight: 500;
      }
    }

    &:last-child > div {
      border-bottom: none;
    }
  }
}

.algorithm-section {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;

  &.bf-section {
    border-top: 4px solid @bf-color;
  }

  &.rk-section {
    border-top: 4px solid @rk-color;
  }
}

.section-header {
  background: linear-gradient(135deg, #f5f7fa, #e4e7eb);
  padding: 25px 30px;
  display: flex;
  align-items: center;
  gap: 20px;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    color: @text-color;
  }

  .algorithm-icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
}

.algorithm-content {
  background: white;
  padding: 30px;

  .text-block {
    margin-bottom: 40px;

    h3 {
      color: @primary-color;
      font-size: 1.4rem;
      margin-top: 0;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;
    }

    p {
      line-height: 1.7;
      margin-bottom: 15px;
      color: @text-color;
    }

    ol, ul {
      padding-left: 25px;
      margin: 15px 0;

      li {
        margin-bottom: 10px;
        line-height: 1.6;
      }
    }
  }
}

.visualization {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 25px;
  margin-top: 20px;
  position: relative;
  height: 120px;
  border: 1px solid #eee;

  .text-line {
    display: flex;
    gap: 5px;
    margin-bottom: 30px;

    .text-char {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e3f2fd;
      border-radius: 4px;
      font-weight: 500;
    }
  }

  .pattern-line {
    display: flex;
    gap: 5px;
    position: absolute;
    top: 60px;
    transition: left 0.5s ease;

    .pattern-char {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffcdd2;
      border-radius: 4px;
      font-weight: 500;
      color: #c62828;
    }
  }

  .comparison-indicator {
    position: absolute;
    top: 45px;
    color: @bf-color;
    font-weight: bold;
    font-size: 1.2rem;
    transition: left 0.5s ease;
  }
}

.hash-demo {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #eee;

  .hash-row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .hash-label {
    width: 150px;
    font-weight: 500;
    color: @text-light;
  }

  .hash-value {
    flex: 1;
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
    font-weight: 600;
    color: @text-color;
  }

  .match-indicator {
    margin-left: 20px;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: 600;

    &.match {
      background: fade(@rk-color, 15%);
      color: darken(@rk-color, 15%);
    }

    &:not(.match) {
      background: fade(@bf-color, 15%);
      color: darken(@bf-color, 15%);
    }
  }
}

.formula {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px 20px;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  margin: 15px 0;
  line-height: 1.6;

  sup {
    font-size: 0.8rem;
  }
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 15px;
}

.applications-section {
  background: @background-light;
  border-radius: 12px;
  padding: 30px;
  box-shadow: @card-shadow;
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.app-card {
  background: white;
  border-radius: 10px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  }

  .app-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    margin: 0 0 10px;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
  }
}

.footer {
  text-align: center;
  padding: 30px;
  margin-top: 20px;
  background: @background-light;
  border-radius: 12px;
  color: #666;
  font-size: 1rem;
  border-top: 2px solid #e0e0e0;

  p {
    margin: 5px 0;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 20px;

    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .comparison-grid {
    grid-template-columns: 1fr;

    .comparison-header {
      display: none;
    }

    .comparison-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-bottom: 1px solid @border-color;

      & > div {
        padding: 12px 15px;
        border-right: none;
        border-bottom: none;

        &:first-child {
          background: #f9f9f9;
          font-weight: 500;
        }
      }
    }
  }

  .section-header {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 10px;

    h2 {
      font-size: 1.5rem;
    }
  }

  .algorithm-content {
    padding: 20px;
  }

  .visualization {
    padding: 15px;
    height: auto;

    .text-line, .pattern-line {
      flex-wrap: wrap;
    }
  }
}
</style>
