<template>
  <div class="string-matching-container">
    <header class="header">
      <h1 class="title">字符串匹配算法详解</h1>
      <div class="subtitle">探索多种高效字符串搜索技术的原理与实现</div>
    </header>

    <div class="content-wrapper">
      <!-- 算法导航 -->
      <div class="algorithm-nav">
        <div
          v-for="(algo, index) in algorithms"
          :key="index"
          :class="['nav-item', { active: activeAlgorithm === index }]"
          @click="activeAlgorithm = index"
        >
          <div class="algo-icon">{{ algo.icon }}</div>
          <div class="algo-name">{{ algo.name }}</div>
        </div>
      </div>

      <!-- 算法详情 -->
      <div class="algorithm-details">
        <div class="algorithm-card">
          <!-- 算法简介 -->
          <section class="algo-intro">
            <div class="algo-header">
              <div class="algo-icon">{{ currentAlgorithm.icon }}</div>
              <h2>{{ currentAlgorithm.name }}</h2>
              <div class="algo-year">{{ currentAlgorithm.year }}</div>
              <div class="algo-formWho">发明者:{{ currentAlgorithm.formWho }}</div>
            </div>
            <div class="algo-description">{{ currentAlgorithm.description }}</div>
          </section>

          <div class="algo-content">
            <!-- 算法思路 -->
            <section class="algo-section">
              <h3><span class="section-icon">💡</span> 算法思路</h3>
              <p>{{ currentAlgorithm.idea }}</p>
            </section>

            <!-- 算法步骤 -->
            <section class="algo-section">
              <h3><span class="section-icon">📝</span> 算法步骤</h3>
              <ol class="algo-steps">
                <li v-for="(step, index) in currentAlgorithm.steps" :key="index">{{ step }}</li>
              </ol>
            </section>

            <!-- 算法实现 -->
            <section class="algo-section">
              <h3><span class="section-icon">💻</span> 算法实现</h3>
              <pre class="code-block">{{ currentAlgorithm.implementation }}</pre>
            </section>

            <!-- 复杂度分析 -->
            <section class="algo-section">
              <h3><span class="section-icon">📊</span> 复杂度分析</h3>
              <div class="complexity-table">
                <div class="complexity-row">
                  <div class="complexity-cell header">时间复杂度</div>
                  <div class="complexity-cell header">空间复杂度</div>
                  <div class="complexity-cell header">最坏情况</div>
                  <div class="complexity-cell header">平均情况</div>
                </div>
                <div class="complexity-row">
                  <div class="complexity-cell">{{ currentAlgorithm.complexity.time }}</div>
                  <div class="complexity-cell">{{ currentAlgorithm.complexity.space }}</div>
                  <div class="complexity-cell">{{ currentAlgorithm.complexity.worst }}</div>
                  <div class="complexity-cell">{{ currentAlgorithm.complexity.average }}</div>
                </div>
              </div>
            </section>

            <!-- 算法比较 -->
            <section class="algo-section">
              <h3><span class="section-icon">⚖️</span> 算法比较</h3>
              <div class="comparison">
                <div class="comparison-item" v-for="(item, index) in currentAlgorithm.comparison" :key="index">
                  <div class="comparison-title">{{ item.title }}</div>
                  <div class="comparison-content">{{ item.content }}</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- 算法比较图 -->
    <section class="comparison-chart">
      <h2><span class="section-icon">📈</span> 算法性能比较</h2>
      <div class="chart-container">
        <div class="chart-bar" v-for="(algo, index) in algorithms" :key="index">
          <div class="chart-label">{{ algo.name }}</div>
          <div class="chart-bar-bg">
            <div
              class="chart-bar-fill"
              :style="{ width: algo.complexity.chart + '%' }"
              :class="'bar-' + index"
            ></div>
          </div>
          <div class="chart-value">{{ algo.complexity.time }}</div>
        </div>
      </div>
      <div class="chart-legend">
        <div class="legend-item">BF: O(mn)</div>
        <div class="legend-item">RK: O(mn) (最坏)</div>
        <div class="legend-item">KMP: O(m+n)</div>
        <div class="legend-item">BM: O(mn) (最坏)</div>
        <div class="legend-item">Sunday: O(mn) (最坏)</div>
      </div>
    </section>

    <footer class="footer">
      <p>字符串匹配是计算机科学中的基础问题，广泛应用于文本编辑、生物信息学、数据检索等领域</p>
      <p> 算法可视化 | 探索计算的本质</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeAlgorithm = ref(0);

const algorithms = [
  {
    id: 'bf',
    name: '暴力匹配 (Brute-Force)',
    icon: '👊',
    year: '1960s',
    formWho:'none',
    description: '最简单直观的字符串匹配算法，通过逐个比较字符来查找模式串在文本中的位置。',
    idea: '从文本的第一个字符开始，逐个比较文本和模式串的字符。如果匹配失败，则将模式串向右移动一位，重新开始比较。',
    steps: [
      '从文本的第一个字符开始',
      '将模式串与文本当前位置对齐',
      '逐个比较模式串和文本对应位置的字符',
      '如果所有字符匹配，则匹配成功',
      '如果出现不匹配，则将模式串向右移动一位',
      '重复上述过程直到找到匹配或遍历完整个文本'
    ],
    implementation: `function bruteForce(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;

  for (let i = 0; i <= n - m; i++) {
    let j;
    for (j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) {
        break;
      }
    }
    if (j === m) {
      return i; // 匹配成功
    }
  }
  return -1; // 未找到匹配
}`,
    complexity: {
      time: 'O(mn)',
      space: 'O(1)',
      worst: 'O(mn)',
      average: 'O(mn)',
      chart: 100
    },
    comparison: [
      { title: '优点', content: '实现简单，不需要预处理' },
      { title: '缺点', content: '效率低，特别是当模式串较长且文本较大时' },
      { title: '适用场景', content: '短模式串或小规模文本匹配' }
    ]
  },
  {
    id: 'rk',
    name: 'Rabin-Karp 算法',
    icon: '🔢',
    year: '1987',
    formWho:'Michael O. Rabin和Richard M. Karp',
    description: '基于哈希函数的字符串匹配算法，通过比较哈希值来减少不必要的字符比较。',
    idea: '利用哈希函数计算模式串的哈希值和文本中每个可能子串的哈希值。如果哈希值匹配，则进一步验证字符是否完全匹配。',
    steps: [
      '计算模式串的哈希值',
      '计算文本中第一个与模式串等长子串的哈希值',
      '逐个比较哈希值',
      '如果哈希值匹配，则进行字符级验证',
      '使用滚动哈希更新下一个子串的哈希值',
      '重复直到找到匹配或遍历完整个文本'
    ],
    implementation: `function rabinKarp(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;
  const base = 256; // 字符集大小
  const prime = 101; // 大质数

  // 计算哈希值
  let patternHash = 0;
  let textHash = 0;
  let h = 1;

  for (let i = 0; i < m - 1; i++) {
    h = (h * base) % prime;
  }

  for (let i = 0; i < m; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
    textHash = (base * textHash + text.charCodeAt(i)) % prime;
  }

  for (let i = 0; i <= n - m; i++) {
    if (patternHash === textHash) {
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

    // 更新滚动哈希
    if (i < n - m) {
      textHash = (base * (textHash - text.charCodeAt(i) * h) +
                 text.charCodeAt(i + m)) % prime;
      if (textHash < 0) textHash += prime;
    }
  }
  return -1;
}`,
    complexity: {
      time: 'O(m+n)',
      space: 'O(1)',
      worst: 'O(mn)',
      average: 'O(m+n)',
      chart: 70
    },
    comparison: [
      { title: '优点', content: '平均效率高，适用于多模式匹配' },
      { title: '缺点', content: '哈希冲突可能导致性能下降' },
      { title: '适用场景', content: '多模式匹配、大文本搜索' }
    ]
  },
  {
    id: 'kmp',
    name: 'KMP 算法',
    icon: '🔍',
    year: '1977',
    formWho:'D.E.Knuth, J.H.Morris, V.R.Pratt',
    description: '高效的字符串匹配算法，利用部分匹配表避免不必要的比较。',
    idea: '当匹配失败时，利用已匹配部分的信息，避免文本指针回溯，通过部分匹配表确定模式串下一次比较的位置。',
    steps: [
      '预处理模式串，构建部分匹配表（next数组）',
      '初始化文本指针和模式指针',
      '逐个比较字符',
      '当字符匹配时，两个指针都前进',
      '当字符不匹配时，根据next数组调整模式指针位置',
      '重复直到找到匹配或遍历完整个文本'
    ],
    implementation: `function kmpSearch(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;
  const next = buildNext(pattern);

  let i = 0; // 文本指针
  let j = 0; // 模式指针

  while (i < n) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === m) return i - j; // 匹配成功
    } else if (j > 0) {
      j = next[j - 1]; // 根据next数组跳转
    } else {
      i++;
    }
  }
  return -1;
}

function buildNext(pattern: string): number[] {
  const m = pattern.length;
  const next = new Array(m).fill(0);
  let len = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      next[i] = len;
      i++;
    } else {
      if (len > 0) {
        len = next[len - 1];
      } else {
        next[i] = 0;
        i++;
      }
    }
  }
  return next;
}`,
    complexity: {
      time: 'O(m+n)',
      space: 'O(m)',
      worst: 'O(m+n)',
      average: 'O(m+n)',
      chart: 40
    },
    comparison: [
      { title: '优点', content: '保证线性时间复杂度，无回溯' },
      { title: '缺点', content: '需要额外的空间存储next数组' },
      { title: '适用场景', content: '长模式串、重复性高的文本' }
    ]
  },
  {
    id: 'bm',
    name: 'Boyer-Moore 算法',
    icon: '🚀',
    year: '1977',
    formWho:'Boyer and Moore',
    description: '高效的字符串匹配算法，从模式串尾部开始比较，利用坏字符和好后缀规则跳过大量字符。',
    idea: '从模式串的末尾开始比较字符，当发生不匹配时，使用坏字符规则和好后缀规则计算模式串的移动距离，从而跳过大量不必要的比较。',
    steps: [
      '预处理模式串，构建坏字符表和好后缀表',
      '将模式串与文本对齐，从右向左比较字符',
      '当字符匹配时，继续向左比较',
      '当字符不匹配时，计算移动距离（取坏字符规则和好后缀规则的最大值）',
      '移动模式串并重复比较过程',
      '重复直到找到匹配或模式串移出文本'
    ],
    implementation: `function boyerMoore(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;

  // 构建坏字符表
  const badChar = buildBadCharTable(pattern);

  let s = 0; // 模式串相对于文本的偏移

  while (s <= n - m) {
    let j = m - 1;

    // 从右向左比较
    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    if (j < 0) {
      return s; // 匹配成功
    } else {
      // 计算坏字符规则的移动距离
      const badShift = j - (badChar[text.charCodeAt(s + j)] || -1);
      s += Math.max(1, badShift);
    }
  }
  return -1;
}

function buildBadCharTable(pattern: string): number[] {
  const table = new Array(256).fill(-1);
  for (let i = 0; i < pattern.length; i++) {
    table[pattern.charCodeAt(i)] = i;
  }
  return table;
}`,
    complexity: {
      time: 'O(mn)',
      space: 'O(m)',
      worst: 'O(mn)',
      average: 'O(n/m)',
      chart: 30
    },
    comparison: [
      { title: '优点', content: '实际应用中非常高效，特别是长模式串' },
      { title: '缺点', content: '预处理较复杂，实现难度大' },
      { title: '适用场景', content: '文本编辑器、IDE搜索功能' }
    ]
  },
  {
    id: 'sunday',
    name: 'Sunday 算法',
    icon: '⏩',
    year: '1990',
    formWho:'Daniel M. Sunday',
    description: '高效的字符串匹配算法，利用文本中模式串后一位字符的信息进行跳跃。',
    idea: '在匹配失败时，查看文本中模式串后一位的字符，根据该字符在模式串中的位置进行跳跃，从而跳过大量不必要的比较。',
    steps: [
      '预处理模式串，构建字符偏移表',
      '将模式串与文本对齐',
      '从前往后比较字符',
      '当字符不匹配时，查看文本中模式串后一位字符',
      '根据该字符在模式串中的位置计算偏移量',
      '移动模式串并重复比较过程'
    ],
    implementation: `function sundaySearch(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;

  // 构建偏移表
  const shift = buildShiftTable(pattern);

  let i = 0; // 文本指针

  while (i <= n - m) {
    let j;
    for (j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) break;
    }

    if (j === m) return i; // 匹配成功

    // 检查文本中模式串后一位字符
    const nextChar = text[i + m];
    const offset = shift[nextChar] !== undefined ?
                  m - shift[nextChar] :
                  m + 1;

    i += offset;
  }
  return -1;
}

function buildShiftTable(pattern: string): { [key: string]: number } {
  const table: { [key: string]: number } = {};
  for (let i = 0; i < pattern.length; i++) {
    table[pattern[i]] = i;
  }
  return table;
}`,
    complexity: {
      time: 'O(mn)',
      space: 'O(m)',
      worst: 'O(mn)',
      average: 'O(n)',
      chart: 35
    },
    comparison: [
      { title: '优点', content: '实现简单，跳跃效率高' },
      { title: '缺点', content: '最坏情况下性能不佳' },
      { title: '适用场景', content: '通用字符串匹配，特别是英文字符' }
    ]
  }
];

const currentAlgorithm = computed(() => {
  return algorithms[activeAlgorithm.value];
});
</script>

<style scoped lang="less">
@primary-color: #3f51b5;
@secondary-color: #5c6bc0;
@success-color: #4caf50;
@warning-color: #ff9800;
@error-color: #f44336;
@background-light: #f8f9fa;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

.string-matching-container {
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
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid @border-color;

  .title {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    color: @text-light;
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.content-wrapper {
  display: flex;
  gap: 30px;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.algorithm-nav {
  flex: 0 0 220px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    flex: 0 0 auto;
  }
}

.nav-item {
  background: @background-light;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid transparent;

  &:hover {
    background: lighten(@primary-color, 45%);
    transform: translateY(-3px);
  }

  &.active {
    background: lighten(@primary-color, 40%);
    border-color: @primary-color;
    box-shadow: @card-shadow;

    .algo-icon {
      background: @primary-color;
      color: white;
    }

    .algo-name {
      color: @primary-color;
      font-weight: 600;
    }
  }

  .algo-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    transition: all 0.3s ease;
  }

  .algo-name {
    font-size: 1rem;
    font-weight: 500;
    flex: 1;
    transition: color 0.3s ease;
  }
}

.algorithm-details {
  flex: 1;
}

.algorithm-card {
  background: @background-light;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;
}

.algo-intro {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  padding: 30px;

  .algo-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;

    .algo-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
    }

    h2 {
      flex: 1;
      margin: 0;
      font-size: 1.8rem;
    }

    .algo-year {
      background: rgba(255, 255, 255, 0.2);
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
    }
    .algo-formWho {
      background: rgba(255, 255, 255, 0.2);
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
    }
  }

  .algo-description {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 800px;
  }
}

.algo-content {
  padding: 30px;
}

.algo-section {
  margin-bottom: 30px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: @primary-color;
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid @border-color;

    .section-icon {
      font-size: 1.6rem;
    }
  }
}

.algo-steps {
  padding-left: 20px;

  li {
    margin-bottom: 12px;
    line-height: 1.6;
    padding-left: 10px;

    &::marker {
      color: @primary-color;
      font-weight: bold;
    }
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

.complexity-table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;

  .complexity-row {
    display: contents;
  }

  .complexity-cell {
    padding: 12px 15px;
    border-bottom: 1px solid @border-color;
    border-right: 1px solid @border-color;

    &:nth-child(4n) {
      border-right: none;
    }

    &.header {
      background: lighten(@primary-color, 45%);
      font-weight: 600;
      color: @primary-color;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  .comparison-item {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

    .comparison-title {
      font-weight: 600;
      color: @primary-color;
      margin-bottom: 8px;
      font-size: 1.1rem;
    }

    .comparison-content {
      color: @text-light;
      line-height: 1.6;
    }
  }
}

.comparison-chart {
  background: @background-light;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: @card-shadow;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: @primary-color;
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 30px;

    .section-icon {
      font-size: 1.8rem;
    }
  }
}

.chart-container {
  display: grid;
  gap: 15px;
}

.chart-bar {
  display: flex;
  align-items: center;
  gap: 15px;

  .chart-label {
    width: 180px;
    font-weight: 500;
    color: @text-color;
  }

  .chart-bar-bg {
    flex: 1;
    height: 25px;
    background: #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
  }

  .chart-bar-fill {
    height: 100%;
    border-radius: 12px;
    transition: width 1s ease;

    &.bar-0 { background: linear-gradient(90deg, #f44336, #ff9800); }
    &.bar-1 { background: linear-gradient(90deg, #ff9800, #ffc107); }
    &.bar-2 { background: linear-gradient(90deg, #4caf50, #8bc34a); }
    &.bar-3 { background: linear-gradient(90deg, #2196f3, #03a9f4); }
    &.bar-4 { background: linear-gradient(90deg, #9c27b0, #673ab7); }
  }

  .chart-value {
    width: 100px;
    text-align: right;
    font-weight: 500;
    color: @text-light;
  }
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 25px;
  font-size: 0.9rem;
  color: @text-light;

  .legend-item {
    padding: 5px 15px;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.03);
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  color: @text-light;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  p {
    margin: 5px 0;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 20px 0;

    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .algo-intro {
    padding: 20px;

    .algo-header {
      flex-wrap: wrap;

      h2 {
        font-size: 1.5rem;
      }
    }
  }

  .complexity-table {
    grid-template-columns: repeat(2, 1fr);

    .complexity-cell {
      &:nth-child(2n) {
        border-right: none;
      }
    }
  }

  .chart-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    .chart-bar-bg {
      width: 100%;
    }

    .chart-value {
      text-align: left;
    }
  }
}
</style>
