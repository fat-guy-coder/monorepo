<template>
  <div class="kmp-container">
    <h1 class="main-title">KMP字符串匹配算法</h1>
    <div class="subtitle">Knuth-Morris-Pratt算法：高效字符串搜索的经典解决方案</div>

    <div class="content-wrapper">
      <!-- 左侧内容区 -->
      <div class="content-left">
        <section class="card">
          <h2>算法介绍</h2>
          <p>KMP算法是一种高效的字符串匹配算法，由Donald Knuth、Vaughan Pratt和James H. Morris于1977年联合发表。</p>
          <p>该算法通过利用匹配失败时的已知信息避免不必要的回溯，将时间复杂度从O(m*n)优化到O(m+n)。</p>
          <div class="complexity">
            <div class="complexity-item">
              <span class="complexity-label">时间复杂度</span>
              <span class="complexity-value">O(m + n)</span>
            </div>
            <div class="complexity-item">
              <span class="complexity-label">空间复杂度</span>
              <span class="complexity-value">O(m)</span>
            </div>
          </div>
        </section>

        <section class="card">
          <h2>核心思想</h2>
          <ol class="idea-list">
            <li>
              <strong>部分匹配表(PMT)</strong>
              <p>预处理模式串，构建最长公共前后缀长度表</p>
            </li>
            <li>
              <strong>避免回溯</strong>
              <p>当匹配失败时，根据PMT表移动模式串位置</p>
            </li>
            <li>
              <strong>跳跃式匹配</strong>
              <p>文本串指针不回溯，只移动模式串指针</p>
            </li>
          </ol>
        </section>

        <section class="card">
          <h2>算法步骤</h2>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>构建Next数组</h3>
                <p>计算模式串每个位置的最长公共前后缀长度</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>初始化指针</h3>
                <p>文本指针i=0，模式指针j=0</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>开始匹配</h3>
                <p>当i小于文本长度且j小于模式长度时循环</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>字符匹配</h3>
                <p>若文本[i]==模式[j]，则i++,j++</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>处理不匹配</h3>
                <p>若j>0，则j=next[j-1]，否则i++</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">6</div>
              <div class="step-content">
                <h3>匹配成功</h3>
                <p>若j等于模式长度，则找到匹配位置</p>
              </div>
            </div>
          </div>
        </section>

        <section class="card">
          <h2>算法实现</h2>
          <pre class="code-block">function buildNext(pattern: string): number[] {
  const next: number[] = new Array(pattern.length).fill(0);
  let len = 0;  // 当前公共前后缀长度
  let i = 1;

  while (i < pattern.length) {
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
}

function kmpSearch(text: string, pattern: string): number {
  const next = buildNext(pattern);
  let i = 0; // text指针
  let j = 0; // pattern指针

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) {
        return i - j; // 找到匹配
      }
    } else {
      if (j > 0) {
        j = next[j - 1];
      } else {
        i++;
      }
    }
  }
  return -1; // 未找到
}</pre>
        </section>
      </div>

      <!-- 右侧演示区 -->
      <div class="content-right">
        <div class="demo-card">
          <h2>动态演示</h2>
          <div class="demo-container">
            <canvas ref="canvas" width="680" height="300"></canvas>
            <div class="controls">
              <div class="input-group">
                <label>文本串：</label>
                <input v-model="text" type="text" maxlength="30" />
              </div>
              <div class="input-group">
                <label>模式串：</label>
                <input v-model="pattern" type="text" maxlength="15" />
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
          </div>
          <div class="status">
            <div>匹配状态: <span :class="statusClass">{{ statusText }}</span></div>
            <div>Next数组: [{{ nextArray.join(', ') }}]</div>
          </div>
        </div>

        <div class="legend">
          <h3>图例说明</h3>
          <div class="legend-items">
            <div class="legend-item">
              <div class="color-box matched"></div>
              <span>已匹配字符</span>
            </div>
            <div class="legend-item">
              <div class="color-box current"></div>
              <span>当前比较字符</span>
            </div>
            <div class="legend-item">
              <div class="color-box pointer"></div>
              <span>文本指针</span>
            </div>
            <div class="legend-item">
              <div class="color-box pattern-pointer"></div>
              <span>模式指针</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>KMP算法通过避免不必要的回溯显著提高字符串匹配效率，特别适用于在长文本中搜索固定模式</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// 组件状态
const text = ref('ABABDABACDABABCABAB')
const pattern = ref('ABABCABAB')
const isAnimating = ref(false)
const speed = ref(5)
const statusText = ref('等待开始')
const nextArray = ref<number[]>([])
const statusClass = ref('status-waiting')

// Canvas引用
const canvas = ref<HTMLCanvasElement | null>(null)

// 动画控制变量
let animationFrame: number | null = null
let textPointer = 0
let patternPointer = 0
let matched = false
let stepCounter = 0
let nextArrayBuilt = false
let animationStartTime = 0

// 构建Next数组
const buildNext = (patternStr: string): number[] => {
  const next: number[] = new Array(patternStr.length).fill(0)
  let len = 0
  let i = 1

  while (i < patternStr.length) {
    if (patternStr[i] === patternStr[len]) {
      len++
      next[i] = len
      i++
    } else {
      if (len > 0) {
        len = next[len - 1]
      } else {
        next[i] = 0
        i++
      }
    }
  }
  return next
}

// 重置动画
const resetAnimation = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  isAnimating.value = false
  textPointer = 0
  patternPointer = 0
  matched = false
  stepCounter = 0
  nextArrayBuilt = false
  statusText.value = '等待开始'
  statusClass.value = 'status-waiting'

  nextArray.value = buildNext(pattern.value)
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
  const interval = 1100 - (speed.value * 100) // 速度控制

  if (elapsed < interval) {
    animationFrame = requestAnimationFrame(animateStep)
    return
  }

  animationStartTime = now
  stepCounter++

  // KMP算法逻辑
  if (textPointer < text.value.length && patternPointer < pattern.value.length) {
    if (text.value[textPointer] === pattern.value[patternPointer]) {
      // 匹配成功
      textPointer++
      patternPointer++

      if (patternPointer === pattern.value.length) {
        // 完全匹配
        matched = true
        isAnimating.value = false
        statusText.value = `匹配成功! 位置: ${textPointer - patternPointer}`
        statusClass.value = 'status-success'
      }
    } else {
      // 匹配失败
      if (patternPointer > 0) {
        patternPointer = nextArray.value[patternPointer - 1]
      } else {
        textPointer++
      }
    }
  } else {
    // 匹配结束
    isAnimating.value = false
    if (!matched) {
      statusText.value = '未找到匹配'
      statusClass.value = 'status-failed'
    }
  }

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
  const cellSize = 40
  const padding = 20
  const patternY = 80
  const textY = 180

  // 清除画布
  ctx.clearRect(0, 0, width, height)

  // 绘制文本串
  ctx.font = '18px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let i = 0; i < text.value.length; i++) {
    const x = padding + i * cellSize + cellSize / 2

    // 背景
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(padding + i * cellSize, textY - cellSize / 2, cellSize, cellSize)

    // 边框
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.strokeRect(padding + i * cellSize, textY - cellSize / 2, cellSize, cellSize)

    // 字符
    ctx.fillStyle = '#333'
    ctx.fillText(text.value[i], x, textY)

    // 指针
    if (i === textPointer) {
      ctx.fillStyle = '#4e6ef2'
      ctx.beginPath()
      ctx.arc(x, textY + 30, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.fillText('i', x, textY + 30)
    }

    // 匹配部分
    if (i >= textPointer - patternPointer && i < textPointer) {
      ctx.fillStyle = 'rgba(76, 175, 80, 0.3)'
      ctx.fillRect(padding + i * cellSize, textY - cellSize / 2, cellSize, cellSize)
    }
  }

  // 绘制模式串
  for (let j = 0; j < pattern.value.length; j++) {
    const x = padding + (textPointer - patternPointer + j) * cellSize + cellSize / 2

    // 背景
    ctx.fillStyle = '#e3f2fd'
    ctx.fillRect(
      padding + (textPointer - patternPointer + j) * cellSize,
      patternY - cellSize / 2,
      cellSize,
      cellSize
    )

    // 边框
    ctx.strokeStyle = '#bbdefb'
    ctx.lineWidth = 1
    ctx.strokeRect(
      padding + (textPointer - patternPointer + j) * cellSize,
      patternY - cellSize / 2,
      cellSize,
      cellSize
    )

    // 字符
    ctx.fillStyle = '#1976d2'
    ctx.fillText(pattern.value[j], x, patternY)

    // 指针
    if (j === patternPointer) {
      ctx.fillStyle = '#ff5722'
      ctx.beginPath()
      ctx.arc(x, patternY - 30, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.fillText('j', x, patternY - 30)
    }

    // 当前比较字符
    if (j === patternPointer && textPointer < text.value.length) {
      ctx.fillStyle = 'rgba(255, 152, 0, 0.3)'
      ctx.fillRect(
        padding + (textPointer - patternPointer + j) * cellSize,
        patternY - cellSize / 2,
        cellSize,
        cellSize
      )
    }
  }

  // 绘制连接线
  if (textPointer < text.value.length && patternPointer < pattern.value.length) {
    const textX = padding + textPointer * cellSize + cellSize / 2
    const patternX = padding + (textPointer - patternPointer + patternPointer) * cellSize + cellSize / 2

    ctx.beginPath()
    ctx.moveTo(textX, textY - 25)
    ctx.lineTo(patternX, patternY + 25)
    ctx.strokeStyle = text.value[textPointer] === pattern.value[patternPointer] ? '#4caf50' : '#f44336'
    ctx.lineWidth = 2
    ctx.stroke()

    // 绘制比较结果
    ctx.fillStyle = text.value[textPointer] === pattern.value[patternPointer] ? '#4caf50' : '#f44336'
    ctx.font = '14px Arial'
    ctx.fillText(
      text.value[textPointer] === pattern.value[patternPointer] ? '匹配' : '不匹配',
      (textX + patternX) / 2,
      (textY + patternY) / 2 - 10
    )
  }

  // 绘制标题
  ctx.fillStyle = '#333'
  ctx.font = 'bold 16px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('文本串:', 20, textY - 50)
  ctx.fillText('模式串:', 20, patternY - 50)

  // 绘制步骤计数
  ctx.fillStyle = '#666'
  ctx.font = '14px Arial'
  ctx.fillText(`步骤: ${stepCounter}`, width - 100, 30)
}

// 监听输入变化
watch([text, pattern], resetAnimation)

// 初始化
onMounted(() => {
  nextArray.value = buildNext(pattern.value)
  drawCanvas()
})
</script>

<style scoped lang="less">
@primary-color: #4e6ef2;
@secondary-color: #6c757d;
@success-color: #4caf50;
@warning-color: #ff9800;
@error-color: #f44336;
@background-light: #f8f9fa;
@border-color: #e0e0e0;

.kmp-container {
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
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;

  canvas {
    display: block;
    margin: 0 auto;
    background: white;
    border-radius: 6px;
    border: 1px solid @border-color;
  }
}

.controls {
  margin-top: 20px;

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

.status {
  background: white;
  border-radius: 8px;
  padding: 15px;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  div {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
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

.status-failed {
  color: @error-color;
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
  grid-template-columns: repeat(2, 1fr);
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

    &.matched {
      background: rgba(76, 175, 80, 0.3);
    }

    &.current {
      background: rgba(255, 152, 0, 0.3);
    }

    &.pointer {
      background: #4e6ef2;
    }

    &.pattern-pointer {
      background: #ff5722;
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  margin-top: 20px;
  background: @background-light;
  border-radius: 12px;
  font-style: italic;
  color: #666;
  font-size: 1.1rem;
  border-top: 2px solid #e0e0e0;
}

@media (max-width: 1100px) {
  .content-wrapper {
    flex-direction: column;
  }

  .steps .step {
    flex: 0 0 100%;
  }
}
</style>
