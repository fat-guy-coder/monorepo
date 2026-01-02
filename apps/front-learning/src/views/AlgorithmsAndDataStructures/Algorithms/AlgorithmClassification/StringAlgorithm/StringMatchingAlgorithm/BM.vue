<template>
  <div class="bm-container">
    <header class="header">
      <div class="title-container">
        <h1 class="title">Boyer-Moore 字符串匹配算法</h1>
        <div class="subtitle">高效的字符串搜索算法</div>
      </div>
      <div class="algorithm-info">
        <div class="info-item">
          <div class="info-label">时间复杂度</div>
          <div class="info-value">O(n/m) (平均)</div>
        </div>
        <div class="info-item">
          <div class="info-label">空间复杂度</div>
          <div class="info-value">O(m)</div>
        </div>
        <div class="info-item">
          <div class="info-label">发明年份</div>
          <div class="info-value">1977</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 左侧内容区 -->
      <div class="content-left">
        <section class="card">
          <h2 class="card-title">算法介绍</h2>
          <p>
            Boyer-Moore算法由Robert S. Boyer和J Strother
            Moore于1977年发明，是一种高效的字符串匹配算法。
          </p>
          <p>
            该算法采用启发式规则从右向左比较字符，当出现不匹配时，利用<b class="highlight"
              >坏字符规则</b
            >和<b class="highlight">好后缀规则</b>跳过大量不必要的比较，从而显著提高匹配效率。
          </p>

          <div class="features">
            <div class="feature">
              <div class="feature-icon">🚀</div>
              <div class="feature-content">
                <h3>高效性</h3>
                <p>实际应用中比其他算法更快</p>
              </div>
            </div>
            <div class="feature">
              <div class="feature-icon">🧠</div>
              <div class="feature-content">
                <h3>启发式规则</h3>
                <p>利用坏字符和好后缀规则</p>
              </div>
            </div>
            <div class="feature">
              <div class="feature-icon">🔍</div>
              <div class="feature-content">
                <h3>逆向比较</h3>
                <p>从模式串尾部开始比较</p>
              </div>
            </div>
          </div>
        </section>

        <section class="card">
          <h2 class="card-title">核心规则</h2>
          <div class="rules">
            <div class="rule">
              <div class="rule-header">
                <div class="rule-icon">❗</div>
                <h3>坏字符规则 (Bad Character Rule)</h3>
              </div>
              <div class="rule-content">
                <p>当文本与模式串不匹配时：</p>
                <ol>
                  <li>将文本中导致不匹配的字符称为<b>坏字符</b></li>
                  <li>在模式串中查找该坏字符最后出现的位置</li>
                  <li>将模式串移动到使坏字符对齐的位置</li>
                </ol>
                <div class="rule-formula">移动距离 = 坏字符位置 - 模式串中该字符最后出现的位置</div>
              </div>
            </div>

            <div class="rule">
              <div class="rule-header">
                <div class="rule-icon">✅</div>
                <h3>好后缀规则 (Good Suffix Rule)</h3>
              </div>
              <div class="rule-content">
                <p>当发现部分匹配的后缀时：</p>
                <ol>
                  <li>将匹配的后缀称为<b>好后缀</b></li>
                  <li>在模式串中查找该好后缀出现的其他位置</li>
                  <li>将模式串移动到使好后缀对齐的位置</li>
                </ol>
                <div class="rule-formula">移动距离 = 好后缀位置 - 模式串中该后缀最后出现的位置</div>
              </div>
            </div>
          </div>
        </section>

        <section class="card">
          <h2 class="card-title">算法步骤</h2>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>预处理</h3>
                <p>构建坏字符表和好后缀表</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>对齐</h3>
                <p>将模式串与文本起始位置对齐</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>比较</h3>
                <p>从右向左比较字符</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>匹配判断</h3>
                <p>若全部匹配，记录位置</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>处理不匹配</h3>
                <p>根据规则计算移动距离</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">6</div>
              <div class="step-content">
                <h3>移动模式串</h3>
                <p>移动模式串并重复过程</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 右侧演示区 -->
      <div class="content-right">
        <div class="demo-card">
          <h2 class="card-title">动态演示</h2>
          <div class="demo-container">
            <div class="controls">
              <div class="input-group">
                <label>文本串:</label>
                <input v-model="text" type="text" maxlength="40" />
              </div>
              <div class="input-group">
                <label>模式串:</label>
                <input v-model="pattern" type="text" maxlength="15" />
              </div>
              <div class="control-buttons">
                <button @click="startAnimation" :disabled="isAnimating">▶️ 开始</button>
                <button @click="pauseAnimation" :disabled="!isAnimating">⏸️ 暂停</button>
                <button @click="resetAnimation">🔄 重置</button>
                <div class="speed-control">
                  <label>速度:</label>
                  <input type="range" min="1" max="10" v-model="speed" />
                </div>
              </div>
            </div>

            <div class="canvas-container">
              <canvas ref="canvas" width="700" height="350"></canvas>
            </div>

            <div class="status">
              <div class="status-item">
                <span class="status-label">状态:</span>
                <span :class="['status-value', statusClass]">{{ statusText }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">移动次数:</span>
                <span class="status-value">{{ shiftCount }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">比较次数:</span>
                <span class="status-value">{{ compareCount }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">规则应用:</span>
                <span class="status-value">{{ lastRule }}</span>
              </div>
            </div>
          </div>

          <div class="rules-explanation">
            <h3>当前规则应用</h3>
            <div class="rule-detail" v-if="currentRule === 'bad'">
              <div class="rule-title">坏字符规则:</div>
              <div class="rule-description">
                文本中的字符 <span class="char-highlight">{{ currentBadChar }}</span> 在位置
                {{ currentPatternPos }} 不匹配， 模式串中该字符最后出现在位置
                {{ badCharTable[currentBadChar] ?? -1 }}， 移动距离 = {{ currentPatternPos }} - ({{
                  badCharTable[currentBadChar] ?? -1
                }}) = {{ currentShift }}
              </div>
            </div>
            <div class="rule-detail" v-else-if="currentRule === 'good'">
              <div class="rule-title">好后缀规则:</div>
              <div class="rule-description">
                已匹配后缀: <span class="char-highlight">{{ currentGoodSuffix }}</span
                >， 在模式串中最后出现在位置 {{ goodSuffixPos }}， 移动距离 = {{ pattern.length }} -
                {{ goodSuffixPos }} - 1 = {{ currentShift }}
              </div>
            </div>
            <div class="rule-detail" v-else>
              <div class="rule-title">等待开始...</div>
              <div class="rule-description">算法开始后将显示规则应用细节</div>
            </div>
          </div>
        </div>

        <div class="code-section">
          <h2 class="card-title">算法实现</h2>
          <div class="tabs">
            <button :class="['tab', { active: activeTab === 'bm' }]" @click="activeTab = 'bm'">
              Boyer-Moore
            </button>
            <button :class="['tab', { active: activeTab === 'bad' }]" @click="activeTab = 'bad'">
              坏字符表
            </button>
            <button :class="['tab', { active: activeTab === 'good' }]" @click="activeTab = 'good'">
              好后缀表
            </button>
          </div>

          <pre class="code-block" v-if="activeTab === 'bm'">
function boyerMooreSearch(text: string, pattern: string): number {
  const n = text.length;
  const m = pattern.length;

  // 构建坏字符表
  const badCharTable = buildBadCharTable(pattern);

  let s = 0; // 模式串相对于文本的偏移

  while (s <= n - m) {
    let j = m - 1;

    // 从右向左比较字符
    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    // 找到匹配
    if (j < 0) {
      return s;
    }
    // 不匹配时应用坏字符规则
    else {
      const badChar = text[s + j];
      const badCharShift = j - (badCharTable[badChar] ?? -1);
      s += Math.max(1, badCharShift);
    }
  }

  return -1; // 未找到匹配
}</pre
          >

          <pre class="code-block" v-if="activeTab === 'bad'">
// 构建坏字符表
function buildBadCharTable(pattern: string): Record&lt;string , number&gt; {
  const table: Record&lt;string, number&gt; = {};
  const m = pattern.length;

  for (let i = 0; i < m - 1; i++) {
    table[pattern[i]] = i;
  }

  return table;
}

// 示例: pattern = "EXAMPLE"
// table = {
//   'E': 6,
//   'X': 1,
//   'A': 2,
//   'M': 3,
//   'P': 4,
//   'L': 5
// }</pre
          >

          <pre class="code-block" v-if="activeTab === 'good'">
// 构建好后缀表
function buildGoodSuffixTable(pattern: string): number[] {
  const m = pattern.length;
  const table = new Array(m).fill(0);

  // 后缀指针
  let lastPrefix = m;

  // 从后向前遍历
  for (let i = m - 1; i >= 0; i--) {
    if (isPrefix(pattern, i + 1)) {
      lastPrefix = i + 1;
    }
    table[i] = lastPrefix - i + m - 1;
  }

  // 处理部分匹配的情况
  for (let i = 0; i < m - 1; i++) {
    const suffixLen = suffixLength(pattern, i);
    table[suffixLen] = m - 1 - i + suffixLen;
  }

  return table;
}

// 判断是否前缀匹配
function isPrefix(pattern: string, p: number): boolean {
  const m = pattern.length;
  for (let i = p, j = 0; i < m; i++, j++) {
    if (pattern[i] !== pattern[j]) {
      return false;
    }
  }
  return true;
}

// 计算后缀长度
function suffixLength(pattern: string, p: number): number {
  let len = 0;
  const m = pattern.length;

  for (let i = p, j = m - 1; i >= 0 && pattern[i] === pattern[j]; i--, j--) {
    len += 1;
  }

  return len;
}</pre
          >
        </div>
      </div>
    </div>

    <div class="applications">
      <h2 class="section-title">实际应用</h2>
      <div class="app-grid">
        <div class="app-card">
          <div class="app-icon">🔍</div>
          <h3>文本编辑器</h3>
          <p>用于快速搜索文档内容</p>
        </div>
        <div class="app-card">
          <div class="app-icon">🌐</div>
          <h3>搜索引擎</h3>
          <p>高效检索关键词</p>
        </div>
        <div class="app-card">
          <div class="app-icon">📖</div>
          <h3>生物信息学</h3>
          <p>DNA序列匹配</p>
        </div>
        <div class="app-card">
          <div class="app-icon">🔐</div>
          <h3>数据安全</h3>
          <p>病毒特征码扫描</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Boyer-Moore算法在实际应用中通常比KMP等算法更快，特别在模式串较长或字母表较大时表现优异</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// 组件状态
const text = ref('HERE IS A SIMPLE EXAMPLE')
const pattern = ref('EXAMPLE')
const isAnimating = ref(false)
const speed = ref(5)
const statusText = ref('等待开始')
const shiftCount = ref(0)
const compareCount = ref(0)
const statusClass = ref('status-waiting')
const lastRule = ref('无')
const currentRule = ref('')
const currentBadChar = ref('')
const currentPatternPos = ref(0)
const currentShift = ref(0)
const currentGoodSuffix = ref('')
const goodSuffixPos = ref(0)
const activeTab = ref('bm')

// Canvas引用
const canvas = ref<HTMLCanvasElement | null>(null)

// 算法变量
let animationFrame: number | null = null
let shift = 0
let patternPos = 0
let badCharTable: Record<string, number> = {}
let animationStartTime = 0

// 构建坏字符表
const buildBadCharTable = (patternStr: string): Record<string, number> => {
  const table: Record<string, number> = {}
  const m = patternStr.length

  for (let i = 0; i < m - 1; i++) {
    table[patternStr[i]] = i
  }

  return table
}

// 重置动画
const resetAnimation = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }

  isAnimating.value = false
  shift = 0
  patternPos = 0
  shiftCount.value = 0
  compareCount.value = 0
  statusText.value = '等待开始'
  statusClass.value = 'status-waiting'
  lastRule.value = '无'
  currentRule.value = ''

  badCharTable = buildBadCharTable(pattern.value)
  drawCanvas()
}

// 开始动画
const startAnimation = () => {
  if (isAnimating.value) return

  resetAnimation()
  isAnimating.value = true
  statusText.value = '匹配中...'
  statusClass.value = 'status-running'
  animationStartTime = performance.now()
  animateStep()
}

// 暂停动画
const pauseAnimation = () => {
  if (!isAnimating.value) return

  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }

  isAnimating.value = false
  statusText.value = '已暂停'
  statusClass.value = 'status-paused'
}

// 动画步骤
const animateStep = () => {
  if (!isAnimating.value) return

  const now = performance.now()
  const elapsed = now - animationStartTime
  const interval = 1100 - speed.value * 100 // 速度控制

  if (elapsed < interval) {
    animationFrame = requestAnimationFrame(animateStep)
    return
  }

  animationStartTime = now

  const n = text.value.length
  const m = pattern.value.length

  // 检查边界
  if (shift > n - m) {
    statusText.value = '未找到匹配'
    statusClass.value = 'status-failed'
    isAnimating.value = false
    drawCanvas()
    return
  }

  // 从右向左比较
  patternPos = m - 1
  while (patternPos >= 0 && pattern.value[patternPos] === text.value[shift + patternPos]) {
    patternPos--
    compareCount.value++
  }

  // 找到匹配
  if (patternPos < 0) {
    statusText.value = `匹配成功! 位置: ${shift}`
    statusClass.value = 'status-success'
    isAnimating.value = false
    drawCanvas()
    return
  }

  // 应用坏字符规则
  const badChar = text.value[shift + patternPos]
  const badCharPos = badCharTable[badChar] ?? -1
  const shiftAmount = Math.max(1, patternPos - badCharPos)

  currentRule.value = 'bad'
  currentBadChar.value = badChar
  currentPatternPos.value = patternPos
  currentShift.value = shiftAmount
  lastRule.value = '坏字符规则'

  shift += shiftAmount
  shiftCount.value++
  compareCount.value++

  drawCanvas()

  if (isAnimating.value) {
    animationFrame = requestAnimationFrame(animateStep)
  }
}

// 绘制Canvas
const drawCanvas = () => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  const width = canvas.value.width
  const height = canvas.value.height
  const cellSize = 35
  const paddingX = 50
  const paddingY = 80
  const textY = paddingY
  const patternY = paddingY + 100

  // 清除画布
  ctx.clearRect(0, 0, width, height)

  // 绘制标题
  ctx.fillStyle = '#333'
  ctx.font = 'bold 18px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('文本串:', 20, textY - 30)
  ctx.fillText('模式串:', 20, patternY - 30)

  // 设置文本样式
  ctx.font = '16px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // 绘制文本串
  for (let i = 0; i < text.value.length; i++) {
    const x = paddingX + i * cellSize + cellSize / 2

    // 绘制单元格背景
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(paddingX + i * cellSize, textY - cellSize / 2, cellSize, cellSize)

    // 绘制单元格边框
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.strokeRect(paddingX + i * cellSize, textY - cellSize / 2, cellSize, cellSize)

    // 绘制字符
    ctx.fillStyle = '#333'
    ctx.fillText(text.value[i], x, textY)

    // 高亮当前比较位置
    if (i >= shift && i < shift + pattern.value.length) {
      if (i === shift + patternPos) {
        // 当前比较字符（坏字符）
        ctx.fillStyle = 'rgba(244, 67, 54, 0.3)'
        ctx.fillRect(paddingX + i * cellSize, textY - cellSize / 2, cellSize, cellSize)

        // 绘制指针
        ctx.fillStyle = '#f44336'
        ctx.beginPath()
        ctx.arc(x, textY + 30, 8, 0, Math.PI * 2)
        ctx.fill()
      } else if (i > shift + patternPos) {
        // 已匹配字符
        ctx.fillStyle = 'rgba(76, 175, 80, 0.3)'
        ctx.fillRect(paddingX + i * cellSize, textY - cellSize / 2, cellSize, cellSize)
      }
    }
  }

  // 绘制模式串
  for (let j = 0; j < pattern.value.length; j++) {
    const x = paddingX + (shift + j) * cellSize + cellSize / 2

    // 绘制单元格背景
    ctx.fillStyle = '#e3f2fd'
    ctx.fillRect(paddingX + (shift + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize)

    // 绘制单元格边框
    ctx.strokeStyle = '#bbdefb'
    ctx.lineWidth = 1
    ctx.strokeRect(paddingX + (shift + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize)

    // 绘制字符
    ctx.fillStyle = '#1976d2'
    ctx.fillText(pattern.value[j], x, patternY)

    // 高亮当前比较位置
    if (j === patternPos) {
      // 当前比较字符
      ctx.fillStyle = 'rgba(255, 152, 0, 0.3)'
      ctx.fillRect(paddingX + (shift + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize)

      // 绘制指针
      ctx.fillStyle = '#ff9800'
      ctx.beginPath()
      ctx.arc(x, patternY - 30, 8, 0, Math.PI * 2)
      ctx.fill()
    } else if (j > patternPos) {
      // 已匹配字符
      ctx.fillStyle = 'rgba(76, 175, 80, 0.3)'
      ctx.fillRect(paddingX + (shift + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize)
    }
  }

  // 绘制连接线
  if (patternPos >= 0) {
    const textX = paddingX + (shift + patternPos) * cellSize + cellSize / 2
    const patternX = paddingX + (shift + patternPos) * cellSize + cellSize / 2

    ctx.beginPath()
    ctx.moveTo(textX, textY + 20)
    ctx.lineTo(patternX, patternY - 20)
    ctx.strokeStyle = '#f44336'
    ctx.lineWidth = 2
    ctx.stroke()

    // 绘制比较结果
    ctx.fillStyle = '#f44336'
    ctx.font = '14px Arial'
    ctx.fillText('不匹配', textX, (textY + patternY) / 2)
  }

  // 绘制移位指示器
  if (shift > 0) {
    const startX = paddingX + shift * cellSize
    ctx.beginPath()
    ctx.moveTo(startX, patternY + 40)
    ctx.lineTo(startX, patternY + 60)
    ctx.lineTo(startX - 15, patternY + 50)
    ctx.closePath()
    ctx.fillStyle = '#3f51b5'
    ctx.fill()

    ctx.font = '14px Arial'
    ctx.fillStyle = '#3f51b5'
    ctx.fillText(`移位: ${shift}`, startX - 10, patternY + 80)
  }
}

// 监听输入变化
watch([text, pattern], resetAnimation)

// 初始化
onMounted(() => {
  badCharTable = buildBadCharTable(pattern.value)
  drawCanvas()
})
</script>

<style scoped lang="less">
@primary-color: #3f51b5;
@secondary-color: #5c6bc0;
@success-color: #4caf50;
@warning-color: #ff9800;
@error-color: #f44336;
@insert-color: #2196f3;
@delete-color: #f44336;
@replace-color: #ff9800;
@match-color: #4caf50;
@background-light: #f8f9fa;
@border-color: #e0e0e0;

.bm-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #fff;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;

  .title-container {
    .title {
      color: @primary-color;
      margin: 0 0 5px;
      font-size: 2.2rem;
    }

    .subtitle {
      color: #666;
      font-size: 1.1rem;
    }
  }
}

.algorithm-info {
  display: flex;
  gap: 25px;

  .info-item {
    text-align: center;

    .info-label {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 5px;
    }

    .info-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: @primary-color;
    }
  }
}

.content-wrapper {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
}

.content-left {
  flex: 1;
}

.content-right {
  flex: 1;
}

.card {
  background: @background-light;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .card-title {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e0e0e0;
    font-size: 1.6rem;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 25px;

  .feature {
    display: flex;
    gap: 15px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

    .feature-icon {
      font-size: 2rem;
    }

    .feature-content {
      h3 {
        margin: 0 0 5px;
        font-size: 1.1rem;
        color: #333;
      }

      p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
      }
    }
  }
}

.rules {
  display: flex;
  flex-direction: column;
  gap: 25px;

  .rule {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

    .rule-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;

      .rule-icon {
        font-size: 1.8rem;
      }

      h3 {
        margin: 0;
        font-size: 1.3rem;
      }
    }

    .rule-content {
      p {
        margin: 0 0 15px;
        line-height: 1.6;
      }

      ol {
        padding-left: 20px;
        margin: 0 0 15px;

        li {
          margin-bottom: 8px;
        }
      }
    }

    .rule-formula {
      background: #f9f9f9;
      border-left: 4px solid @primary-color;
      padding: 12px 15px;
      font-family: 'Courier New', monospace;
      font-weight: 600;
      color: #333;
      border-radius: 0 4px 4px 0;
    }
  }
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  .step {
    display: flex;
    gap: 15px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

    .step-number {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
      font-size: 1.2rem;
    }

    .step-content {
      h3 {
        margin: 0 0 8px;
        font-size: 1.1rem;
        color: #333;
      }

      p {
        margin: 0;
        color: #666;
        font-size: 0.95rem;
        line-height: 1.4;
      }
    }
  }
}

.demo-card {
  background: @background-light;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.demo-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.controls {
  margin-bottom: 20px;

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    label {
      width: 70px;
      font-weight: 500;
      color: @secondary-color;
    }

    input {
      flex: 1;
      padding: 10px 15px;
      border: 1px solid @border-color;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 0 0 2px rgba(@primary-color, 0.2);
      }
    }
  }
}

.control-buttons {
  display: flex;
  gap: 15px;
  align-items: center;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background: @primary-color;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;

    &:hover {
      background: darken(@primary-color, 8%);
      transform: translateY(-2px);
    }

    &:disabled {
      background: #b0b0b0;
      cursor: not-allowed;
      transform: none;
    }
  }

  .speed-control {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      color: @secondary-color;
    }

    input {
      width: 150px;
    }
  }
}

.canvas-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 15px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
}

.status {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;

  .status-item {
    display: flex;
    gap: 10px;

    .status-label {
      font-weight: 500;
      color: #666;
    }

    .status-value {
      font-weight: 600;
    }
  }
}

.status-waiting {
  color: #666;
}

.status-running {
  color: @primary-color;
}

.status-paused {
  color: @warning-color;
}

.status-success {
  color: @success-color;
}

.status-failed {
  color: @error-color;
}

.rules-explanation {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h3 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.2rem;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
}

.rule-detail {
  margin-top: 15px;

  .rule-title {
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  }

  .rule-description {
    color: #555;
    line-height: 1.6;

    .char-highlight {
      background: #fff9c4;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }
  }
}

.code-section {
  background: @background-light;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  .tab {
    padding: 8px 20px;
    border: none;
    border-radius: 6px;
    background: #e0e0e0;
    color: #666;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      background: @primary-color;
      color: white;
    }

    &:hover:not(.active) {
      background: #d0d0d0;
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

.applications {
  background: @background-light;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;

  .section-title {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
    font-size: 1.8rem;
  }
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
}

.app-card {
  background: white;
  border-radius: 10px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
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
  font-style: italic;
  color: #666;
  font-size: 1.1rem;
  border-top: 2px solid #e0e0e0;
}

.highlight {
  background: #fff9c4;
  padding: 0 4px;
  border-radius: 4px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .algorithm-info {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
