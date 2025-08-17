<template>
  <div class="edit-distance-container">
    <h1 class="main-title">编辑距离算法</h1>
    <div class="subtitle">Levenshtein距离：量化字符串相似度的经典方法</div>

    <div class="content-wrapper">
      <!-- 左侧内容区 -->
      <div class="content-left">
        <section class="card">
          <h2>算法介绍</h2>
          <p>编辑距离（Edit Distance），又称Levenshtein距离，是衡量两个字符串相似度的指标。</p>
          <p>它定义为将一个字符串转换为另一个字符串所需的最少编辑操作次数，允许的编辑操作包括：</p>
          <div class="operations">
            <div class="operation">
              <div class="operation-icon insert">+</div>
              <div class="operation-info">
                <h3>插入字符</h3>
                <p>在字符串中插入一个字符</p>
              </div>
            </div>
            <div class="operation">
              <div class="operation-icon delete">-</div>
              <div class="operation-info">
                <h3>删除字符</h3>
                <p>从字符串中删除一个字符</p>
              </div>
            </div>
            <div class="operation">
              <div class="operation-icon replace">↔</div>
              <div class="operation-info">
                <h3>替换字符</h3>
                <p>将一个字符替换为另一个字符</p>
              </div>
            </div>
          </div>
          <div class="complexity">
            <div class="complexity-item">
              <span class="complexity-label">时间复杂度</span>
              <span class="complexity-value">O(m×n)</span>
            </div>
            <div class="complexity-item">
              <span class="complexity-label">空间复杂度</span>
              <span class="complexity-value">O(m×n)</span>
            </div>
          </div>
        </section>

        <section class="card">
          <h2>核心思想</h2>
          <ol class="idea-list">
            <li>
              <strong>动态规划</strong>
              <p>将问题分解为更小的子问题并存储中间结果</p>
            </li>
            <li>
              <strong>二维矩阵</strong>
              <p>使用二维矩阵存储子问题的编辑距离</p>
            </li>
            <li>
              <strong>状态转移</strong>
              <p>根据字符是否相等决定操作方式</p>
            </li>
          </ol>
          <div class="formula">
            <p>状态转移方程：</p>
            <div class="formula-box">
              <p>dp[i][j] =
                <span v-if="showFormula">
                  min(
                  <span class="op-delete">dp[i-1][j] + 1</span>,
                  <span class="op-insert">dp[i][j-1] + 1</span>,
                  <span class="op-replace">dp[i-1][j-1] + cost</span>
                  )
                </span>
                <span v-else>点击查看</span>
              </p>
              <button class="toggle-formula" @click="showFormula = !showFormula">
                {{ showFormula ? '隐藏公式' : '显示公式' }}
              </button>
            </div>
            <div class="formula-desc" v-if="showFormula">
              <p>其中 cost =
                <span class="formula-highlight">str1[i-1] == str2[j-1] ? 0 : 1</span>
              </p>
            </div>
          </div>
        </section>

        <section class="card">
          <h2>算法步骤</h2>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>初始化矩阵</h3>
                <p>创建大小为 (m+1) × (n+1) 的二维数组</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>设置边界条件</h3>
                <p>第一行和第一列初始化为0到n/m</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>填充矩阵</h3>
                <p>遍历矩阵每个位置，计算最小编辑距离</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>计算操作成本</h3>
                <p>根据字符是否相等确定替换操作成本</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>回溯路径</h3>
                <p>从右下角回溯到左上角，确定操作序列</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">6</div>
              <div class="step-content">
                <h3>返回结果</h3>
                <p>矩阵右下角的值即为编辑距离</p>
              </div>
            </div>
          </div>
        </section>

        <section class="card">
          <h2>算法实现</h2>
          <pre class="code-block">function minEditDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;

  // 创建DP矩阵
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  // 初始化边界条件
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // 填充DP矩阵
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 计算操作成本
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;

      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,     // 删除操作
        dp[i][j - 1] + 1,     // 插入操作
        dp[i - 1][j - 1] + cost // 替换操作
      );
    }
  }

  return dp[m][n]; // 返回编辑距离
}</pre>
        </section>
      </div>

      <!-- 右侧演示区 -->
      <div class="content-right">
        <div class="demo-card">
          <h2>动态演示</h2>
          <div class="demo-container">
            <div class="demo-controls">
              <div class="input-group">
                <label>字符串1：</label>
                <input v-model="str1" type="text" maxlength="12" />
              </div>
              <div class="input-group">
                <label>字符串2：</label>
                <input v-model="str2" type="text" maxlength="12" />
              </div>
              <div class="control-buttons">
                <button @click="startAnimation" :disabled="isAnimating">▶️ 开始</button>
                <button @click="pauseAnimation" :disabled="!isAnimating">⏸️ 暂停</button>
                <button @click="resetAnimation">🔄 重置</button>
                <div class="speed-control">
                  <label>速度：</label>
                  <input type="range" min="1" max="10" v-model="speed" />
                </div>
              </div>
            </div>
            <div class="matrix-container">
              <canvas ref="matrixCanvas" width="600" height="380"></canvas>
            </div>
            <div class="operations-display">
              <h3>操作序列</h3>
              <div class="operations-sequence">
                <div v-for="(op, index) in operations" :key="index" class="operation-item">
                  <div class="op-index">{{ index + 1 }}.</div>
                  <div :class="['op-type', opClass(op.type)]">{{ opTypeText(op.type) }}</div>
                  <div class="op-details">{{ opDetails(op) }}</div>
                </div>
                <div v-if="operations.length === 0" class="empty-ops">
                  操作序列将在这里显示
                </div>
              </div>
            </div>
          </div>
          <div class="status">
            <div>编辑距离: <span class="distance-value">{{ editDistance }}</span></div>
            <div>状态: <span :class="statusClass">{{ statusText }}</span></div>
          </div>
        </div>

        <div class="legend">
          <h3>图例说明</h3>
          <div class="legend-items">
            <div class="legend-item">
              <div class="color-box init"></div>
              <span>初始值</span>
            </div>
            <div class="legend-item">
              <div class="color-box insert"></div>
              <span>插入操作</span>
            </div>
            <div class="legend-item">
              <div class="color-box delete"></div>
              <span>删除操作</span>
            </div>
            <div class="legend-item">
              <div class="color-box replace"></div>
              <span>替换操作</span>
            </div>
            <div class="legend-item">
              <div class="color-box match"></div>
              <span>字符匹配</span>
            </div>
            <div class="legend-item">
              <div class="color-box current"></div>
              <span>当前单元格</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="applications">
      <h2>应用场景</h2>
      <div class="app-grid">
        <div class="app-card">
          <div class="app-icon">🔍</div>
          <h3>拼写检查</h3>
          <p>查找最接近的正确拼写</p>
        </div>
        <div class="app-card">
          <div class="app-icon">🧬</div>
          <h3>DNA序列比对</h3>
          <p>分析生物序列相似性</p>
        </div>
        <div class="app-card">
          <div class="app-icon">🤖</div>
          <h3>自然语言处理</h3>
          <p>文本相似度计算</p>
        </div>
        <div class="app-card">
          <div class="app-icon">📝</div>
          <h3>版本控制</h3>
          <p>文档差异分析</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

// 组件状态
const str1 = ref('kitten')
const str2 = ref('sitting')
const isAnimating = ref(false)
const speed = ref(5)
const statusText = ref('等待开始')
const editDistance = ref(0)
const showFormula = ref(false)
const statusClass = ref('status-waiting')
const operations = ref<any[]>([])

// Canvas引用
const matrixCanvas = ref<HTMLCanvasElement | null>(null)

// 动画控制变量
let animationFrame: number | null = null
let dpMatrix: number[][] = []
let animationQueue: {i: number, j: number}[] = []
let currentStep = 0
let animationStartTime = 0
let isBacktracking = false

// 操作类型常量
const OP_MATCH = 0
const OP_REPLACE = 1
const OP_INSERT = 2
const OP_DELETE = 3

// 初始化DP矩阵
const initMatrix = () => {
  const m = str1.value.length
  const n = str2.value.length

  dpMatrix = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

  // 初始化边界
  for (let i = 0; i <= m; i++) {
    dpMatrix[i][0] = i
    animationQueue.push({i, j: 0})
  }

  for (let j = 0; j <= n; j++) {
    dpMatrix[0][j] = j
    animationQueue.push({i: 0, j})
  }

  // 添加内部单元格
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      animationQueue.push({i, j})
    }
  }
}

// 回溯操作路径
const backtrackOperations = () => {
  const ops: any[] = []
  let i = str1.value.length
  let j = str2.value.length

  while (i > 0 || j > 0) {
    const current = dpMatrix[i][j]
    const cost = (i > 0 && j > 0 && str1.value[i-1] !== str2.value[j-1]) ? 1 : 0

    // 检查是否匹配或替换
    if (i > 0 && j > 0 && dpMatrix[i][j] === dpMatrix[i-1][j-1] + cost) {
      if (cost === 0) {
        ops.unshift({ type: OP_MATCH, char1: str1.value[i-1], char2: str2.value[j-1], i, j })
      } else {
        ops.unshift({ type: OP_REPLACE, char1: str1.value[i-1], char2: str2.value[j-1], i, j })
      }
      i--
      j--
    }
    // 检查删除操作
    else if (i > 0 && dpMatrix[i][j] === dpMatrix[i-1][j] + 1) {
      ops.unshift({ type: OP_DELETE, char1: str1.value[i-1], i, j })
      i--
    }
    // 检查插入操作
    else if (j > 0 && dpMatrix[i][j] === dpMatrix[i][j-1] + 1) {
      ops.unshift({ type: OP_INSERT, char2: str2.value[j-1], i, j })
      j--
    }
  }

  operations.value = ops
}

// 重置动画
const resetAnimation = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }

  isAnimating.value = false
  currentStep = 0
  animationQueue = []
  dpMatrix = []
  operations.value = []
  editDistance.value = 0
  statusText.value = '等待开始'
  statusClass.value = 'status-waiting'
  isBacktracking = false

  initMatrix()
  drawMatrix()
}

// 开始动画
const startAnimation = () => {
  if (isAnimating.value) return

  resetAnimation()
  isAnimating.value = true
  statusText.value = '构建矩阵...'
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
  const interval = 1100 - (speed.value * 100) // 速度控制

  if (elapsed < interval) {
    animationFrame = requestAnimationFrame(animateStep)
    return
  }

  animationStartTime = now

  if (currentStep < animationQueue.length) {
    const {i, j} = animationQueue[currentStep]

    if (i === 0 || j === 0) {
      // 边界已经初始化
    } else {
      const cost = str1.value[i-1] === str2.value[j-1] ? 0 : 1
      dpMatrix[i][j] = Math.min(
        dpMatrix[i-1][j] + 1,    // 删除
        dpMatrix[i][j-1] + 1,    // 插入
        dpMatrix[i-1][j-1] + cost // 替换
      )
    }

    currentStep++
    drawMatrix(i, j)

    // 完成矩阵构建
    if (currentStep === animationQueue.length) {
      editDistance.value = dpMatrix[str1.value.length][str2.value.length]
      isBacktracking = true
      statusText.value = '回溯操作路径...'
      backtrackOperations()
      statusText.value = '演示完成'
      statusClass.value = 'status-success'
      isAnimating.value = false
    }
  }

  if (isAnimating.value) {
    animationFrame = requestAnimationFrame(animateStep)
  }
}

// 绘制DP矩阵
const drawMatrix = (highlightI = -1, highlightJ = -1) => {
  if (!matrixCanvas.value) return

  const ctx = matrixCanvas.value.getContext('2d')
  if (!ctx) return

  const m = str1.value.length
  const n = str2.value.length
  const cellSize = 40
  const padding = 60
  const headerSize = 30

  // 清除画布
  ctx.clearRect(0, 0, matrixCanvas.value.width, matrixCanvas.value.height)

  // 设置样式
  ctx.font = '16px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // 绘制字符串1（行）
  for (let i = 0; i <= m; i++) {
    const y = padding + i * cellSize + cellSize / 2

    if (i > 0) {
      ctx.fillStyle = '#333'
      ctx.fillText(str1.value[i-1], headerSize / 2, y)
    }

    // 行号
    ctx.fillStyle = '#666'
    ctx.fillText(i.toString(), headerSize / 2, padding - headerSize / 2)
  }

  // 绘制字符串2（列）
  for (let j = 0; j <= n; j++) {
    const x = padding + j * cellSize + cellSize / 2

    if (j > 0) {
      ctx.fillStyle = '#333'
      ctx.fillText(str2.value[j-1], x, padding - headerSize / 2)
    }

    // 列号
    ctx.fillStyle = '#666'
    ctx.fillText(j.toString(), padding - headerSize / 2, padding - headerSize / 2)
  }

  // 绘制矩阵单元格
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      const x = padding + j * cellSize
      const y = padding + i * cellSize

      // 确定单元格背景色
      if (i === 0 && j === 0) {
        ctx.fillStyle = '#e0f7fa' // 初始单元格
      } else if (i === 0 || j === 0) {
        ctx.fillStyle = '#f5f5f5' // 边界单元格
      } else if (i === highlightI && j === highlightJ) {
        ctx.fillStyle = '#fff9c4' // 当前单元格
      } else if (dpMatrix[i][j] !== undefined) {
        // 根据操作类型着色
        const cost = (str1.value[i-1] === str2.value[j-1]) ? 0 : 1
        const fromTop = dpMatrix[i][j] === dpMatrix[i-1][j] + 1
        const fromLeft = dpMatrix[i][j] === dpMatrix[i][j-1] + 1
        const fromDiag = dpMatrix[i][j] === dpMatrix[i-1][j-1] + cost

        if (fromDiag && cost === 0) {
          ctx.fillStyle = '#c8e6c9' // 匹配
        } else if (fromDiag) {
          ctx.fillStyle = '#ffccbc' // 替换
        } else if (fromLeft) {
          ctx.fillStyle = '#bbdefb' // 插入
        } else if (fromTop) {
          ctx.fillStyle = '#ffcdd2' // 删除
        } else {
          ctx.fillStyle = '#f5f5f5' // 默认
        }
      } else {
        ctx.fillStyle = '#f5f5f5' // 未计算
      }

      // 绘制单元格背景
      ctx.fillRect(x, y, cellSize, cellSize)

      // 绘制单元格边框
      ctx.strokeStyle = '#ddd'
      ctx.lineWidth = 1
      ctx.strokeRect(x, y, cellSize, cellSize)

      // 绘制单元格值
      if (dpMatrix[i]?.[j] !== undefined) {
        ctx.fillStyle = '#333'
        ctx.fillText(dpMatrix[i][j].toString(), x + cellSize / 2, y + cellSize / 2)
      }
    }
  }

  // 绘制网格标题
  ctx.fillStyle = '#333'
  ctx.font = 'bold 16px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('字符串1', headerSize / 2, padding - headerSize * 1.5)
  ctx.fillText('字符串2', padding - headerSize / 2, padding - headerSize * 1.5)
}

// 操作类型文本
const opTypeText = (type: number) => {
  switch (type) {
    case OP_MATCH: return '匹配'
    case OP_REPLACE: return '替换'
    case OP_INSERT: return '插入'
    case OP_DELETE: return '删除'
    default: return '操作'
  }
}

// 操作类名
const opClass = (type: number) => {
  switch (type) {
    case OP_MATCH: return 'op-match'
    case OP_REPLACE: return 'op-replace'
    case OP_INSERT: return 'op-insert'
    case OP_DELETE: return 'op-delete'
    default: return ''
  }
}

// 操作详情
const opDetails = (op: any) => {
  switch (op.type) {
    case OP_MATCH:
      return `字符 '${op.char1}' 匹配`
    case OP_REPLACE:
      return `将 '${op.char1}' 替换为 '${op.char2}'`
    case OP_INSERT:
      return `插入字符 '${op.char2}'`
    case OP_DELETE:
      return `删除字符 '${op.char1}'`
    default:
      return ''
  }
}

// 初始化
onMounted(() => {
  initMatrix()
  drawMatrix()
})

// 监听输入变化
watch([str1, str2], resetAnimation)
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

.edit-distance-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #fff;
  min-height: 100vh;
}

.main-title {
  text-align: center;
  color: @primary-color;
  margin-bottom: 5px;
  font-size: 2.5rem;
}

.subtitle {
  text-align: center;
  color: @secondary-color;
  margin-bottom: 40px;
  font-size: 1.1rem;
}

.content-wrapper {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.content-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.content-right {
  flex: 1;
}

.card {
  background: @background-light;
  border-radius: 12px;
  padding: 20px 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  h2 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e0e0e0;
    font-size: 1.6rem;
  }
}

.operations {
  display: flex;
  gap: 15px;
  margin: 20px 0;

  .operation {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 15px;
    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  .operation-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 12px;

    &.insert {
      background: fade(@insert-color, 20%);
      color: darken(@insert-color, 10%);
    }

    &.delete {
      background: fade(@delete-color, 20%);
      color: darken(@delete-color, 10%);
    }

    &.replace {
      background: fade(@replace-color, 20%);
      color: darken(@replace-color, 10%);
    }
  }

  .operation-info {
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

.complexity {
  display: flex;
  gap: 20px;
  margin-top: 15px;

  .complexity-item {
    background: white;
    padding: 12px 20px;
    border-radius: 8px;
    text-align: center;
    flex: 1;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  .complexity-label {
    display: block;
    font-size: 0.9rem;
    color: @secondary-color;
  }

  .complexity-value {
    display: block;
    font-size: 1.4rem;
    font-weight: bold;
    color: @primary-color;
  }
}

.idea-list {
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 25px;
    padding-left: 30px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 5px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: @primary-color;
    }

    strong {
      color: @primary-color;
      font-size: 1.1rem;
    }

    p {
      margin: 8px 0 0;
      color: #555;
    }
  }
}

.formula {
  margin-top: 25px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  .formula-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px 20px;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
    font-size: 1.1rem;
    margin: 10px 0;

    .op-insert { color: @insert-color; }
    .op-delete { color: @delete-color; }
    .op-replace { color: @replace-color; }
  }

  .formula-desc {
    margin-top: 10px;
    font-size: 0.95rem;
    color: #555;

    .formula-highlight {
      background: #fff9c4;
      padding: 2px 5px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
    }
  }

  .toggle-formula {
    background: none;
    border: 1px solid @primary-color;
    color: @primary-color;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;

    &:hover {
      background: fade(@primary-color, 10%);
    }
  }
}

.steps {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  .step {
    flex: 0 0 calc(50% - 15px);
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
  }

  .step-number {
    width: 36px;
    height: 36px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  .step-content {
    h3 {
      margin: 0 0 5px;
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

.demo-card {
  background: @background-light;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h2 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.6rem;
  }
}

.demo-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.demo-controls {
  margin-bottom: 20px;

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    label {
      width: 80px;
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

.matrix-container {
  display: flex;
  justify-content: center;
  overflow: auto;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  max-height: 400px;
}

.operations-display {
  background: @background-light;
  border-radius: 8px;
  padding: 15px;

  h3 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.2rem;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
}

.operations-sequence {
  max-height: 200px;
  overflow-y: auto;
  padding: 10px 0;
}

.operation-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  .op-index {
    width: 30px;
    font-weight: 500;
    color: #666;
  }

  .op-type {
    width: 70px;
    padding: 4px 8px;
    border-radius: 4px;
    text-align: center;
    font-weight: 500;
    color: white;

    &.op-match { background: @match-color; }
    &.op-replace { background: @replace-color; }
    &.op-insert { background: @insert-color; }
    &.op-delete { background: @delete-color; }
  }

  .op-details {
    margin-left: 15px;
    flex: 1;
  }
}

.empty-ops {
  text-align: center;
  padding: 20px;
  color: #999;
  font-style: italic;
}

.status {
  background: white;
  border-radius: 8px;
  padding: 15px;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;

  .distance-value {
    font-weight: bold;
    color: @primary-color;
    font-size: 1.2rem;
  }
}

.status-waiting {
  color: @secondary-color;
  font-weight: 500;
}

.status-running {
  color: @primary-color;
  font-weight: 500;
}

.status-paused {
  color: @warning-color;
  font-weight: 500;
}

.status-success {
  color: @success-color;
  font-weight: bold;
}

.legend {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h3 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.2rem;
  }
}

.legend-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;

  .color-box {
    width: 20px;
    height: 20px;
    border-radius: 4px;

    &.init { background: #e0f7fa; }
    &.insert { background: #bbdefb; }
    &.delete { background: #ffcdd2; }
    &.replace { background: #ffccbc; }
    &.match { background: #c8e6c9; }
    &.current { background: #fff9c4; }
  }
}

.applications {
  background: @background-light;
  border-radius: 12px;
  padding: 25px;
  margin-top: 20px;

  h2 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.8rem;
  }
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.app-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
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

@media (max-width: 1100px) {
  .content-wrapper {
    flex-direction: column;
  }

  .steps .step {
    flex: 0 0 100%;
  }

  .legend-items {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
