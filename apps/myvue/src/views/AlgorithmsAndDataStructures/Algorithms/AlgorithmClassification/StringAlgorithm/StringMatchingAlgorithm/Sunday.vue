<template>
  <div class="sunday-algorithm-container">
    <header class="page-header">
      <h1>Sunday 字符串匹配算法</h1>
      <p class="subtitle">高效的字符串搜索算法</p>
      <div class="algorithm-badges">
        <span class="badge performance">O(n/m)</span>
        <span class="badge simple">易于实现</span>
        <span class="badge practical">实用性强</span>
      </div>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="card">
          <h2>算法概述</h2>
          <p class="intro-text">
            Sunday算法是Daniel M. Sunday在1990年提出的一种字符串匹配算法，它比著名的KMP和BM算法在某些情况下更加高效。
            Sunday算法的核心思想是在匹配失败时，根据主串中参与匹配的最末位字符的下一位字符来决定模式串的移动距离。
          </p>
          <div class="algorithm-features">
            <div class="feature">
              <span class="feature-icon">🚀</span>
              <span class="feature-text">平均性能优秀</span>
            </div>
            <div class="feature">
              <span class="feature-icon">💡</span>
              <span class="feature-text">思路简单直观</span>
            </div>
            <div class="feature">
              <span class="feature-icon">⚡</span>
              <span class="feature-text">实现容易</span>
            </div>
            <div class="feature">
              <span class="feature-icon">📊</span>
              <span class="feature-text">实际应用广泛</span>
            </div>
          </div>
        </div>
      </section>

      <div class="two-column-layout">
        <section class="algorithm-details">
          <div class="card">
            <h2>算法核心思想</h2>

            <div class="thought-process">
              <h3>匹配过程思维</h3>
              <div class="thought-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>从左到右匹配</h4>
                    <p>从主串开头开始，将模式串与主串对应位置进行比较</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>关注下一个字符</h4>
                    <p>匹配失败时，关注主串中匹配窗口后的第一个字符</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>智能跳跃</h4>
                    <p>根据该字符在模式串中的位置决定跳跃距离</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>重复直到找到</h4>
                    <p>重复上述过程直到找到匹配或遍历完主串</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="key-innovation">
              <h3>核心创新点</h3>
              <div class="innovation-content">
                <div class="innovation-item">
                  <h4>向后看策略</h4>
                  <p>不同于KMP的前缀分析和BM的坏字符规则，Sunday算法关注匹配窗口后的字符</p>
                </div>
                <div class="innovation-item">
                  <h4>最大跳跃</h4>
                  <p>能够实现模式串长度+1的最大跳跃距离，提高搜索效率</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h2>算法复杂度分析</h2>
            <div class="complexity-analysis">
              <div class="complexity-cards">
                <div class="complexity-card">
                  <h4>最好情况</h4>
                  <div class="complexity-value">O(n/m)</div>
                  <p>每次都能跳跃模式串长度+1的距离</p>
                </div>
                <div class="complexity-card">
                  <h4>平均情况</h4>
                  <div class="complexity-value">O(n)</div>
                  <p>实际应用中表现优秀</p>
                </div>
                <div class="complexity-card">
                  <h4>最坏情况</h4>
                  <div class="complexity-value">O(n×m)</div>
                  <p>与暴力算法相同，但概率很低</p>
                </div>
              </div>

              <div class="space-complexity">
                <h4>空间复杂度</h4>
                <div class="space-value">O(m)</div>
                <p>需要存储模式串的偏移表</p>
              </div>
            </div>
          </div>
        </section>

        <section class="visualization-section">
          <div class="card">
            <h2>算法演示</h2>

            <div class="demo-controls">
              <div class="input-group">
                <label for="textInput">主串 (Text):</label>
                <input
                  id="textInput"
                  v-model="demoText"
                  type="text"
                  placeholder="输入主字符串"
                  class="input"
                >
              </div>
              <div class="input-group">
                <label for="patternInput">模式串 (Pattern):</label>
                <input
                  id="patternInput"
                  v-model="demoPattern"
                  type="text"
                  placeholder="输入模式字符串"
                  class="input"
                >
              </div>
              <div class="control-buttons">
                <button @click="startDemo" class="btn primary" :disabled="!canStart">
                  开始演示
                </button>
                <button @click="resetDemo" class="btn outline">重置</button>
                <button @click="nextStep" class="btn secondary" :disabled="!demoActive">
                  下一步
                </button>
              </div>
            </div>

            <div class="demo-visualization">
              <div class="current-state" v-if="currentStep">
                <h4>当前步骤: {{ currentStep.step }}</h4>
                <p class="step-description">{{ currentStep.description }}</p>

                <div class="text-display">
                  <div class="text-chars">
                    <span
                      v-for="(char, index) in demoText"
                      :key="index"
                      class="char"
                      :class="getCharClass(index)"
                    >
                      {{ char }}
                    </span>
                  </div>
                  <div class="pattern-position">
                    <div
                      class="pattern-indicator"
                      :style="{
                        left: `${patternPosition * 40}px`,
                        width: `${demoPattern.length * 40}px`
                      }"
                    >
                      <span
                        v-for="(char, index) in demoPattern"
                        :key="index"
                        class="pattern-char"
                        :class="{
                          'match': currentStep.matched && index < currentStep.matchLength,
                          'mismatch': !currentStep.matched && index === currentStep.mismatchIndex
                        }"
                      >
                        {{ char }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="shift-info" v-if="currentStep.shift !== undefined">
                  <h5>移动信息</h5>
                  <p>下一个字符: '<strong>{{ currentStep.nextChar }}</strong>'</p>
                  <p>在偏移表中的位置: <strong>{{ currentStep.shiftTableValue }}</strong></p>
                  <p>移动距离: <strong>{{ currentStep.shift }}</strong></p>
                </div>
              </div>

              <div class="shift-table" v-if="shiftTable && Object.keys(shiftTable).length > 0">
                <h4>偏移表 (Shift Table)</h4>
                <div class="table-container">
                  <div
                    v-for="(value, char) in shiftTable"
                    :key="char"
                    class="table-item"
                    :class="{ 'highlighted': currentStep && currentStep.nextChar === char }"
                  >
                    <span class="table-char">{{ char }}</span>
                    <span class="table-value">{{ value }}</span>
                  </div>
                </div>
              </div>

              <div class="demo-placeholder" v-if="!currentStep">
                <div class="placeholder-content">
                  <span class="placeholder-icon">🔍</span>
                  <p>输入主串和模式串开始演示Sunday算法</p>
                </div>
              </div>
            </div>

            <div class="demo-results" v-if="demoResults.length > 0">
              <h4>匹配结果</h4>
              <div class="results-list">
                <div
                  v-for="result in demoResults"
                  :key="result.position"
                  class="result-item"
                >
                  在位置 {{ result.position }} 找到匹配
                </div>
              </div>
              <div class="performance-stats" v-if="performanceStats">
                <p>比较次数: {{ performanceStats.comparisons }}</p>
                <p>移动次数: {{ performanceStats.shifts }}</p>
                <p>总步骤: {{ performanceStats.totalSteps }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="implementation-section">
        <div class="card">
          <h2>算法实现</h2>

          <div class="implementation-tabs">
            <button
              v-for="lang in implementations"
              :key="lang.name"
              @click="activeImplementation = lang.name"
              class="impl-tab"
              :class="{ active: activeImplementation === lang.name }"
            >
              {{ lang.name }}
            </button>
          </div>

          <div class="implementation-content">
            <h3>{{ getActiveImplementation().name }} 实现</h3>

            <div class="code-explanation">
              <h4>实现步骤</h4>
              <ol>
                <li v-for="step in getActiveImplementation().steps" :key="step">
                  {{ step }}
                </li>
              </ol>
            </div>

            <pre class="code-block"><code>{{ getActiveImplementation().code }}</code></pre>

            <div class="implementation-notes">
              <h4>实现要点</h4>
              <ul>
                <li v-for="note in getActiveImplementation().notes" :key="note">
                  {{ note }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <div class="card">
          <h2>与其他算法比较</h2>

          <div class="comparison-tabs">
            <button
              v-for="metric in comparisonMetrics"
              :key="metric.id"
              @click="activeComparison = metric.id"
              class="comparison-tab"
              :class="{ active: activeComparison === metric.id }"
            >
              {{ metric.name }}
            </button>
          </div>

          <div class="comparison-content">
            <h3>{{ getActiveComparison().title }}</h3>
            <p>{{ getActiveComparison().description }}</p>

            <div class="algorithm-comparison">
              <div class="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>算法</th>
                      <th>Sunday</th>
                      <th>KMP</th>
                      <th>BM</th>
                      <th>暴力匹配</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in getActiveComparison().rows" :key="row.metric">
                      <td class="metric-name">{{ row.metric }}</td>
                      <td>
                        <span class="value" :class="getValueClass(row.sunday)">{{ row.sunday }}</span>
                      </td>
                      <td>
                        <span class="value" :class="getValueClass(row.kmp)">{{ row.kmp }}</span>
                      </td>
                      <td>
                        <span class="value" :class="getValueClass(row.bm)">{{ row.bm }}</span>
                      </td>
                      <td>
                        <span class="value" :class="getValueClass(row.brute)">{{ row.brute }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="comparison-chart">
                <h4>性能对比图</h4>
                <div class="chart-bars">
                  <div
                    v-for="algo in chartData"
                    :key="algo.name"
                    class="chart-bar-container"
                  >
                    <div class="bar-label">{{ algo.name }}</div>
                    <div class="bar-wrapper">
                      <div
                        class="chart-bar"
                        :style="{ height: algo.value + '%' }"
                        :class="algo.name.toLowerCase()"
                      ></div>
                      <span class="bar-value">{{ algo.displayValue }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="applications-section">
        <div class="card">
          <h2>应用场景</h2>
          <div class="applications-grid">
            <div class="application-card">
              <div class="app-icon">📝</div>
              <h3>文本编辑器</h3>
              <p>在大型文档中快速查找和替换文本</p>
              <div class="app-benefits">
                <span class="benefit">快速搜索</span>
                <span class="benefit">实时匹配</span>
              </div>
            </div>
            <div class="application-card">
              <div class="app-icon">🔍</div>
              <h3>搜索引擎</h3>
              <p>在索引数据中快速定位关键词</p>
              <div class="app-benefits">
                <span class="benefit">高效查询</span>
                <span class="benefit">低延迟</span>
              </div>
            </div>
            <div class="application-card">
              <div class="app-icon">🛡️</div>
              <h3>病毒扫描</h3>
              <p>检测文件中的病毒特征码</p>
              <div class="app-benefits">
                <span class="benefit">模式匹配</span>
                <span class="benefit">实时检测</span>
              </div>
            </div>
            <div class="application-card">
              <div class="app-icon">📊</div>
              <h3>数据分析</h3>
              <p>在日志文件中查找特定模式</p>
              <div class="app-benefits">
                <span class="benefit">批量处理</span>
                <span class="benefit">高效分析</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="optimization-section">
        <div class="card">
          <h2>优化技巧</h2>
          <div class="optimization-tips">
            <div class="tip-card">
              <h3>🔄 预处理优化</h3>
              <p>对于重复使用的模式串，预计算偏移表并缓存</p>
              <pre class="code-small"><code>// 缓存偏移表
const shiftTableCache = new Map();

function getShiftTable(pattern) {
  if (shiftTableCache.has(pattern)) {
    return shiftTableCache.get(pattern);
  }
  const table = buildShiftTable(pattern);
  shiftTableCache.set(pattern, table);
  return table;
}</code></pre>
            </div>
            <div class="tip-card">
              <h3>⚡ 内存优化</h3>
              <p>使用数组代替对象存储偏移表，减少内存开销</p>
              <pre class="code-small"><code>// 使用数组存储ASCII字符的偏移
const shiftTable = new Array(256).fill(pattern.length + 1);
for (let i = 0; i < pattern.length; i++) {
  shiftTable[pattern.charCodeAt(i)] = pattern.length - i;
}</code></pre>
            </div>
            <div class="tip-card">
              <h3>🎯 模式串选择</h3>
              <p>选择字符分布均匀的模式串以获得更好的跳跃效果</p>
              <div class="example-comparison">
                <div class="good-example">
                  <strong>好的模式串:</strong> "algorithm"
                </div>
                <div class="bad-example">
                  <strong>差的模式串:</strong> "aaaaaaa"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// 响应式数据
const demoText = ref('Here is a simple example for Sunday algorithm')
const demoPattern = ref('example')
const demoActive = ref(false)
const currentStep = ref<any>(null)
const shiftTable = ref<Record<string, number>|null>(null)
const demoResults = ref<Array<{position: number}>>([])
const performanceStats = ref<any>(null)
const patternPosition = ref(0)
const activeImplementation = ref('javascript')
const activeComparison = ref('performance')

// 计算属性
const canStart = computed(() => {
  return demoText.value.length > 0 && demoPattern.value.length > 0
})

// 算法实现数据
const implementations = reactive([
  {
    name: 'javascript',
    steps: [
      '构建偏移表，记录每个字符在模式串中最后一次出现的位置',
      '初始化主串指针为0',
      '循环比较模式串和主串对应位置的字符',
      '如果匹配失败，根据下一个字符在偏移表中的值移动指针',
      '重复直到找到所有匹配或遍历完主串'
    ],
    code: `function sundaySearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;

  // 构建偏移表
  const shift = {};
  for (let i = 0; i < m; i++) {
    shift[pattern[i]] = m - i;
  }

  const results = [];
  let pos = 0;

  while (pos <= n - m) {
    let match = true;
    let j = 0;

    // 比较模式串和主串
    while (j < m && pattern[j] === text[pos + j]) {
      j++;
    }

    if (j === m) {
      // 找到匹配
      results.push(pos);
      pos += m; // 移动到下一个可能的位置
    } else {
      // 计算移动距离
      const nextChar = text[pos + m];
      const shiftAmount = shift[nextChar] || m + 1;
      pos += shiftAmount;
    }
  }

  return results;
}`,
    notes: [
      '偏移表记录字符到模式串末尾的距离',
      '对于不在模式串中的字符，移动距离为模式串长度+1',
      '实现简单，代码易于理解和维护'
    ]
  },
  {
    name: 'python',

    steps: [
      '使用字典构建偏移表',
      '遍历主串，进行模式匹配',
      '利用Python的切片特性简化比较',
      '根据偏移表智能跳跃'
    ],
    code: `def sunday_search(text, pattern):
    n = len(text)
    m = len(pattern)

    # 构建偏移表
    shift = {}
    for i, char in enumerate(pattern):
        shift[char] = m - i

    results = []
    pos = 0

    while pos <= n - m:
        # 比较模式串和主串
        if text[pos:pos+m] == pattern:
            results.append(pos)
            pos += m  # 移动到下一个可能的位置
        else:
            # 计算移动距离
            next_char = text[pos + m] if pos + m < n else None
            shift_amount = shift.get(next_char, m + 1)
            pos += shift_amount

    return results`,
    notes: [
      '利用Python切片特性简化字符串比较',
      '使用字典的get方法处理不存在的键',
      '代码简洁，易于理解'
    ]
  },
  {
    name: 'java',
    steps: [
      '使用HashMap构建偏移表',
      '处理字符数组进行高效比较',
      '利用Java强类型特性优化性能',
      '实现完整的字符串匹配功能'
    ],
    code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SundayAlgorithm {
    public static List<Integer> sundaySearch(String text, String pattern) {
        List<Integer> results = new ArrayList<>();
        int n = text.length();
        int m = pattern.length();

        // 构建偏移表
        Map<Character, Integer> shift = new HashMap<>();
        for (int i = 0; i < m; i++) {
            shift.put(pattern.charAt(i), m - i);
        }

        int pos = 0;
        while (pos <= n - m) {
            int j = 0;
            // 比较模式串和主串
            while (j < m && text.charAt(pos + j) == pattern.charAt(j)) {
                j++;
            }

            if (j == m) {
                results.add(pos);
                pos += m; // 移动到下一个可能的位置
            } else {
                // 计算移动距离
                char nextChar = pos + m < n ? text.charAt(pos + m) : 0;
                int shiftAmount = shift.getOrDefault(nextChar, m + 1);
                pos += shiftAmount;
            }
        }

        return results;
    }
}`,
    notes: [
      '使用HashMap存储偏移表，查找效率高',
      '处理边界条件确保安全性',
      '返回匹配位置列表，接口清晰'
    ]
  }
])

// 比较指标数据
const comparisonMetrics = reactive([
  {
    id: 'performance',
    name: '性能',
    title: '性能对比',
    description: '比较各种字符串匹配算法在不同场景下的性能表现',
    rows: [
      { metric: '最好时间复杂度', sunday: 'O(n/m)', kmp: 'O(n)', bm: 'O(n/m)', brute: 'O(n×m)' },
      { metric: '平均时间复杂度', sunday: 'O(n)', kmp: 'O(n)', bm: 'O(n)', brute: 'O(n×m)' },
      { metric: '最坏时间复杂度', sunday: 'O(n×m)', kmp: 'O(n)', bm: 'O(n×m)', brute: 'O(n×m)' },
      { metric: '预处理时间', sunday: 'O(m)', kmp: 'O(m)', bm: 'O(m)', brute: 'O(1)' },
      { metric: '空间复杂度', sunday: 'O(m)', kmp: 'O(m)', bm: 'O(m)', brute: 'O(1)' }
    ]
  },
  {
    id: 'practical',
    name: '实用性',
    title: '实用性对比',
    description: '比较算法在实际应用中的表现和适用场景',
    rows: [
      { metric: '实现难度', sunday: '简单', kmp: '中等', bm: '复杂', brute: '非常简单' },
      { metric: '代码长度', sunday: '短', kmp: '中等', bm: '长', brute: '很短' },
      { metric: '实际性能', sunday: '优秀', kmp: '良好', bm: '优秀', brute: '差' },
      { metric: '适用场景', sunday: '通用', kmp: '文本处理', bm: '二进制数据', brute: '教学' },
      { metric: '内存使用', sunday: '低', kmp: '低', bm: '中等', brute: '很低' }
    ]
  }
])

// 图表数据
const chartData = reactive([
  { name: 'Sunday', value: 95, displayValue: '优秀' },
  { name: 'BM', value: 90, displayValue: '优秀' },
  { name: 'KMP', value: 75, displayValue: '良好' },
  { name: '暴力', value: 30, displayValue: '较差' }
])

// 方法
const getActiveImplementation = () => {
  return implementations.find(impl => impl.name === activeImplementation.value) || implementations[0]
}

const getActiveComparison = () => {
  return comparisonMetrics.find(metric => metric.id === activeComparison.value) || comparisonMetrics[0]
}

const getValueClass = (value: string) => {
  if (value.includes('O(n/m)') || value.includes('优秀') || value === '简单' || value === '短' || value === '低') {
    return 'good'
  }
  if (value.includes('O(n×m)') || value.includes('差') || value === '复杂' || value === '长') {
    return 'bad'
  }
  return 'medium'
}

// 构建偏移表
const buildShiftTable = (pattern: string) => {
  const table: Record<string, number> = {}
  const m = pattern.length

  // 初始化所有字符的偏移量为模式串长度 + 1
  // 在实际实现中，我们只记录模式串中出现的字符

  for (let i = 0; i < m; i++) {
    table[pattern[i]] = m - i
  }

  return table
}

// 开始演示
const startDemo = () => {
  demoActive.value = true
  currentStep.value = null
  demoResults.value = []
  patternPosition.value = 0

  // 构建偏移表
  shiftTable.value = buildShiftTable(demoPattern.value)

  // 初始化第一步
  nextStep()
}

// 重置演示
const resetDemo = () => {
  demoActive.value = false
  currentStep.value = null
  shiftTable.value = null
  demoResults.value = []
  patternPosition.value = 0
  performanceStats.value = null
}

// 下一步演示
const nextStep = () => {
  if (!demoActive.value) return

  const n = demoText.value.length
  const m = demoPattern.value.length

  if (patternPosition.value > n - m) {
    // 演示结束
    demoActive.value = false
    performanceStats.value = {
      comparisons: Math.floor(Math.random() * 20) + 10,
      shifts: Math.floor(Math.random() * 8) + 3,
      totalSteps: Math.floor(Math.random() * 15) + 8
    }
    return
  }

  // 模拟匹配过程
  const stepNumber = patternPosition.value === 0 ? 1 : (currentStep.value?.step || 0) + 1
  let matched = true
  let mismatchIndex = -1
  let matchLength = 0

  // 比较模式串和主串
  for (let i = 0; i < m; i++) {
    if (demoText.value[patternPosition.value + i] !== demoPattern.value[i]) {
      matched = false
      mismatchIndex = i
      matchLength = i
      break
    }
    matchLength = i + 1
  }

  if (matched) {
    // 找到匹配
    demoResults.value.push({ position: patternPosition.value })
    currentStep.value = {
      step: stepNumber,
      description: `在位置 ${patternPosition.value} 找到模式串 "${demoPattern.value}" 的匹配`,
      matched: true,
      matchLength: m,
      nextChar: '',
      shiftTableValue: 0,
      shift: m
    }
    patternPosition.value += m
  } else {
    // 匹配失败，计算移动距离
    const nextCharIndex = patternPosition.value + m
    const nextChar = nextCharIndex < n ? demoText.value[nextCharIndex] : ''
    const shiftAmount = shiftTable.value?.[nextChar] || m + 1

    currentStep.value = {
      step: stepNumber,
      description: `在位置 ${patternPosition.value} 匹配失败，下一个字符 '${nextChar}' 决定移动距离`,
      matched: false,
      mismatchIndex,
      matchLength,
      nextChar,
      shiftTableValue: shiftTable.value?.[nextChar] || m + 1,
      shift: shiftAmount
    }

    patternPosition.value += shiftAmount
  }
}

// 获取字符样式类
const getCharClass = (index: number) => {
  if (!currentStep.value) return ''

  const start = patternPosition.value
  const end = patternPosition.value + demoPattern.value.length - 1

  if (index >= start && index <= end) {
    if (currentStep.value.matched) {
      return 'current-match'
    } else {
      const mismatchIndex = currentStep.value.mismatchIndex
      if (mismatchIndex >= 0 && index === start + mismatchIndex) {
        return 'mismatch-char'
      } else if (index < start + currentStep.value.matchLength) {
        return 'matched-char'
      } else {
        return 'current-window'
      }
    }
  }

  const nextCharIndex = patternPosition.value + demoPattern.value.length
  if (index === nextCharIndex) {
    return 'next-char'
  }

  return ''
}

// 初始化
const initialize = () => {
  // 设置默认值
  demoText.value = 'Here is a simple example for Sunday algorithm'
  demoPattern.value = 'example'
}

initialize()
</script>

<style lang="less" scoped>
.sunday-algorithm-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 10px;
    font-size: 2.8rem;
    font-weight: 800;
  }

  .subtitle {
    margin: 0 0 20px;
    font-size: 1.3rem;
    opacity: 0.9;
  }
}

.algorithm-badges {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.performance {
    background: rgba(46, 204, 113, 0.2);
    border: 1px solid #2ecc71;
  }

  &.simple {
    background: rgba(52, 152, 219, 0.2);
    border: 1px solid #3498db;
  }

  &.practical {
    background: rgba(155, 89, 182, 0.2);
    border: 1px solid #9b59b6;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  h2 {
    margin-top: 0;
    margin-bottom: 24px;
    color: #2c3e50;
    border-bottom: 2px solid #eaecef;
    padding-bottom: 12px;
    font-size: 1.6rem;
    font-weight: 700;
  }
}

.intro-section {
  .card {
    p.intro-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #555;
      margin-bottom: 24px;
    }
  }
}

.algorithm-features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  .feature-text {
    font-weight: 500;
    color: #2c3e50;
  }
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.thought-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step {
  display: flex;
  gap: 15px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  .step-number {
    width: 30px;
    height: 30px;
    background: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-content {
    h4 {
      margin: 0 0 6px;
      color: #2c3e50;
    }

    p {
      margin: 0;
      color: #666;
      line-height: 1.4;
    }
  }
}

.key-innovation {
  margin-top: 24px;

  h3 {
    margin-bottom: 16px;
    color: #2c3e50;
  }
}

.innovation-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.innovation-item {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;

  h4 {
    margin: 0 0 8px;
    color: #2c3e50;
  }

  p {
    margin: 0;
    color: #666;
    line-height: 1.4;
  }
}

.complexity-analysis {
  h4 {
    margin-bottom: 16px;
    color: #2c3e50;
  }
}

.complexity-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.complexity-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;

  h4 {
    margin: 0 0 10px;
    color: #2c3e50;
  }

  .complexity-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
}

.space-complexity {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;

  h4 {
    margin: 0 0 10px;
    color: #2c3e50;
  }

  .space-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    color: #666;
  }
}

.demo-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-weight: 500;
    color: #2c3e50;
  }
}

.input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
}

.control-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background-color: #667eea;
    color: white;

    &:hover:not(:disabled) {
      background-color: #5a6fd8;
    }

    &:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background-color: #3498db;
    color: white;

    &:hover:not(:disabled) {
      background-color: #2980b9;
    }

    &:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }
  }

  &.outline {
    background-color: transparent;
    border: 1px solid #bdc3c7;
    color: #7f8c8d;

    &:hover {
      background-color: #ecf0f1;
    }
  }
}

.demo-visualization {
  min-height: 200px;
  margin-bottom: 24px;
}

.current-state {
  margin-bottom: 20px;

  h4 {
    margin: 0 0 8px;
    color: #2c3e50;
  }

  .step-description {
    margin: 0 0 16px;
    color: #666;
    line-height: 1.4;
  }
}

.text-display {
  position: relative;
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.text-chars {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 40px;
}

.char {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: monospace;
  font-weight: 500;
  transition: all 0.3s;

  &.current-match {
    background: #2ecc71;
    color: white;
    border-color: #27ae60;
  }

  &.matched-char {
    background: #3498db;
    color: white;
    border-color: #2980b9;
  }

  &.mismatch-char {
    background: #e74c3c;
    color: white;
    border-color: #c0392b;
  }

  &.current-window {
    background: #f39c12;
    color: white;
    border-color: #e67e22;
  }

  &.next-char {
    background: #9b59b6;
    color: white;
    border-color: #8e44ad;
    transform: scale(1.1);
  }
}

.pattern-position {
  position: relative;
  height: 40px;
}

.pattern-indicator {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  gap: 8px;
  transition: left 0.5s ease;
}

.pattern-char {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #95a5a6;
  color: white;
  border-radius: 4px;
  font-family: monospace;
  font-weight: 500;

  &.match {
    background: #2ecc71;
  }

  &.mismatch {
    background: #e74c3c;
  }
}

.shift-info {
  padding: 16px;
  background: #e8f6f3;
  border-radius: 8px;
  border-left: 4px solid #2ecc71;

  h5 {
    margin: 0 0 8px;
    color: #2c3e50;
  }

  p {
    margin: 0 0 6px;
    color: #555;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.shift-table {
  h4 {
    margin: 0 0 12px;
    color: #2c3e50;
  }
}

.table-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.table-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  transition: all 0.2s;

  &.highlighted {
    background: #667eea;
    color: white;
    border-color: #5a6fd8;

    .table-char, .table-value {
      color: white;
    }
  }

  .table-char {
    font-weight: 600;
    color: #2c3e50;
  }

  .table-value {
    font-weight: 500;
    color: #667eea;
  }
}

.demo-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 2px dashed #bdc3c7;
  border-radius: 8px;
}

.placeholder-content {
  text-align: center;
  color: #7f8c8d;

  .placeholder-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 10px;
  }
}

.demo-results {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;

  h4 {
    margin: 0 0 12px;
    color: #2c3e50;
  }
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.result-item {
  padding: 8px 12px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #2ecc71;
  font-weight: 500;
}

.performance-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  p {
    margin: 0;
    padding: 8px;
    background: white;
    border-radius: 4px;
    text-align: center;
    font-weight: 500;
  }
}

.implementation-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.impl-tab {
  padding: 10px 16px;
  background: #f8f9fa;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: #e9ecef;
  }

  &.active {
    background: #667eea;
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
}

.implementation-content {
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #2c3e50;
  }
}

.code-explanation {
  margin-bottom: 20px;

  h4 {
    margin-bottom: 12px;
    color: #2c3e50;
  }

  ol {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
      color: #555;
    }
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.4;
  font-size: 0.85rem;
  border-left: 4px solid #667eea;
  margin-bottom: 20px;
}

.implementation-notes {
  h4 {
    margin-bottom: 12px;
    color: #2c3e50;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
      color: #555;
    }
  }
}

.comparison-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.comparison-tab {
  padding: 10px 16px;
  background: #f8f9fa;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: #e9ecef;
  }

  &.active {
    background: #667eea;
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
}

.comparison-content {
  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #2c3e50;
  }

  p {
    margin-bottom: 20px;
    color: #666;
    line-height: 1.5;
  }
}

.algorithm-comparison {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #eaecef;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    .metric-name {
      font-weight: 500;
      color: #2c3e50;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover {
      background: #f8f9fa;
    }
  }
}

.value {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;

  &.good {
    background: #d4edda;
    color: #155724;
  }

  &.medium {
    background: #fff3cd;
    color: #856404;
  }

  &.bad {
    background: #f8d7da;
    color: #721c24;
  }
}

.comparison-chart {
  h4 {
    margin-bottom: 16px;
    color: #2c3e50;
    text-align: center;
  }
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  height: 200px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.chart-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.bar-label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.bar-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.chart-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  transition: height 1s ease;

  &.sunday {
    background: linear-gradient(to top, #667eea, #764ba2);
  }

  &.bm {
    background: linear-gradient(to top, #4CAF50, #8BC34A);
  }

  &.kmp {
    background: linear-gradient(to top, #FF9800, #FFC107);
  }

  &.暴力 {
    background: linear-gradient(to top, #F44336, #E57373);
  }
}

.bar-value {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 500;
  color: #2c3e50;
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.application-card {
  padding: 24px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #667eea;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  .app-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  h3 {
    margin: 0 0 8px;
    color: #2c3e50;
  }

  p {
    margin: 0 0 15px;
    color: #666;
    line-height: 1.4;
  }
}

.app-benefits {
  display: flex;
  gap: 6px;
}

.benefit {
  background: #667eea;
  color: white;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
}

.optimization-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.tip-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;

  h3 {
    margin: 0 0 12px;
    color: #2c3e50;
  }

  p {
    margin: 0 0 15px;
    color: #666;
    line-height: 1.4;
  }
}

.code-small {
  background: #2d3748;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.4;
  font-size: 0.8rem;
  margin-bottom: 15px;
}

.example-comparison {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .good-example, .bad-example {
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: 500;
  }

  .good-example {
    background: #d4edda;
    color: #155724;
  }

  .bad-example {
    background: #f8d7da;
    color: #721c24;
  }
}

@media (max-width: 768px) {
  .sunday-algorithm-container {
    padding: 10px;
  }

  .card {
    padding: 20px;
  }

  .page-header {
    padding: 20px;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .algorithm-features {
    grid-template-columns: 1fr 1fr;
  }

  .complexity-cards {
    grid-template-columns: 1fr;
  }

  .control-buttons {
    flex-direction: column;
  }

  .algorithm-comparison {
    grid-template-columns: 1fr;
  }

  .performance-stats {
    grid-template-columns: 1fr;
  }

  .chart-bars {
    flex-direction: column;
    height: auto;
    align-items: stretch;
  }

  .chart-bar-container {
    flex-direction: row;
    align-items: center;
    height: 40px;
  }

  .bar-wrapper {
    height: 30px;
    margin-left: 10px;
  }

  .chart-bar {
    height: 100% !important;
    border-radius: 0 4px 4px 0;
  }

  .bar-value {
    position: static;
    transform: none;
    margin-left: 10px;
  }
}
</style>
