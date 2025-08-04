<template>
  <div class="float-container">
    <h1 class="title">CSS浮动基本指南</h1>

    <section>
      <h2>浮动介绍</h2>
      <p>设计初衷竟然只是为了实现"文字环绕图片"的效果</p>
      <p><b>浮动会使元素的display属性变为block</b>，使inline的元素变为block可以设置宽高</p>
    </section>

    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-group">
        <label>浮动方向：</label>
        <button v-for="dir in directions" :key="dir" @click="floatDirection = dir"
          :class="{ active: floatDirection === dir }">
          {{ dir }}
        </button>
      </div>
      <div>
        <h3>浮动副作用</h3>
        <p> 这可能导致父容器高度塌陷，因为浮动元素不再撑开父容器的高度。</p>
        <p>
          为了解决这个问题，我们需要清除浮动。常见的清除浮动方法包括使用clearfix、overflow:
          hidden和伪元素清除等。
        </p>
      </div>
      <div class="control-group">
        <label>清除方式：</label>
        <select v-model="clearMethod" class="styled-select">
          <option v-for="method in clearMethods" :key="method.value" :value="method.value">
            {{ method.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- 演示区域 -->
    <div class="demo-container" :class="clearMethod">
      <div class="float-box" :class="floatDirection" :style="{
        width: boxWidth + 'px',
        height: boxHeight + 'px',
        backgroundColor: boxColor,
      }" @mousedown="startResize">
        <div class="size-display">{{ boxWidth }}×{{ boxHeight }}</div>
      </div>

      <div class="content-flow">
        <p v-for="(text, index) in sampleText" :key="index">{{ text }}</p>
        <div class="clear-indicator" v-if="showClearIndicator">⬇ 清除浮动生效 ⬇</div>
      </div>
    </div>

    <!-- 说明区域 -->
    <div class="info-grid">
      <div class="info-card usage">
        <h3>🎯 主要用途</h3>
        <ul>
          <li v-for="(use, index) in useCases" :key="index">
            <span class="emoji">{{ use.emoji }}</span>
            <div>
              <h4>{{ use.title }}</h4>
              <p>{{ use.desc }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="info-card code-sample">
        <h3>📝 代码示例</h3>
        <pre class="code-block"><code>{{ cssCode }}</code></pre>
        <pre class="code-block"><code>{{ clearMethodCode }}</code></pre>
      </div>

      <div class="info-card pros-cons">
        <div class="pros">
          <h3>✅ 优点</h3>
          <ul>
            <li v-for="(pro, index) in pros" :key="index">{{ pro }}</li>
          </ul>
        </div>
        <div class="cons">
          <h3>❌ 缺点</h3>
          <ul>
            <li v-for="(con, index) in cons" :key="index">{{ con }}</li>
          </ul>
        </div>
      </div>

      <div class="info-card clear-property">
        <h3>🧹 清除浮动 (clear)</h3>
        <p>CSS的<code>clear</code>属性用于控制元素的哪一侧不允许浮动元素。</p>
        <ul>
          <li><code>none</code>：默认值，允许两侧都有浮动元素。</li>
          <li><code>left</code>：左侧不允许浮动元素。</li>
          <li><code>right</code>：右侧不允许浮动元素。</li>
          <li><code>both</code>：两侧都不允许浮动元素。</li>
        </ul>
        <pre class="code-block"><code>/* 示例 */
      .clear-left {
        clear: left;
      }
      .clear-right {
        clear: right;
      }
      .clear-both {
        clear: both;
      }</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type FloatDirection = 'left' | 'right' | 'none'
type ClearMethod = 'none' | 'clearfix' | 'overflow' | 'pseudo'

const floatDirection = ref<FloatDirection>('left')
const clearMethod = ref<ClearMethod>('none')
const boxWidth = ref(150)
const boxHeight = ref(100)
const isResizing = ref(false)

const directions: FloatDirection[] = ['left', 'right', 'none']
const clearMethods = [
  { value: 'none', label: '不清除' },
  { value: 'clearfix', label: 'Clearfix方法' },
  { value: 'overflow', label: 'overflow: hidden' },
  { value: 'pseudo', label: '伪元素清除' },
]

const sampleText = [
  'CSS的float属性最初设计用于实现文字环绕图片的效果，后来被广泛用于网页布局。',
  '浮动元素会脱离正常文档流，但仍在文档流中占据位置，这使得周围内容会环绕它排列。',
  '使用浮动布局时需要注意清除浮动，防止父容器高度塌陷。常见清除方法包括...',
]

const useCases = [
  { emoji: '🖼️', title: '图片环绕', desc: '实现图文混排效果' },
  { emoji: '📰', title: '多栏布局', desc: '创建传统新闻布局' },
  { emoji: '🧩', title: '元素排列', desc: '横向排列块级元素' },
]

const pros = ['简单直观的布局方式', '良好的浏览器兼容性', '自然的文字环绕效果', '适合简单布局场景']

const cons = ['需要手动清除浮动', '布局不够灵活', '响应式支持较弱', '现代布局逐渐被Flex/Grid取代']

const boxColor = computed(() => {
  return floatDirection.value === 'left' ? 'rgba(52, 152, 219, 0.2)' : 'rgba(231, 76, 60, 0.2)'
})

const cssCode = computed(() => {
  return `.float-element {
  float: ${floatDirection.value};
  width: ${boxWidth.value}px;
  height: ${boxHeight.value}px;
}`
})

const clearMethodCode = computed(() => {
  switch (clearMethod.value) {
    case 'clearfix':
      return '.container::after {\n  content: "";\n  display: table;\n  clear: both;\n}'
    case 'overflow':
      return '.container {\n  overflow: hidden;\n}'
    case 'pseudo':
      return '.container::after {\n  content: "";\n  display: block;\n  clear: both;\n}'
    default:
      return '/* 不应用清除方法 */'
  }
})

const showClearIndicator = computed(() => clearMethod.value !== 'none')

const startResize = (e: MouseEvent) => {
  const startX = e.clientX
  const startY = e.clientY
  const startWidth = boxWidth.value
  const startHeight = boxHeight.value

  const doResize = (moveEvent: MouseEvent) => {
    const deltaX = moveEvent.clientX - startX
    const deltaY = moveEvent.clientY - startY
    boxWidth.value = Math.max(50, startWidth + deltaX)
    boxHeight.value = Math.max(50, startHeight + deltaY)
  }

  const stopResize = () => {
    window.removeEventListener('mousemove', doResize)
    window.removeEventListener('mouseup', stopResize)
  }

  window.addEventListener('mousemove', doResize)
  window.addEventListener('mouseup', stopResize)
}
</script>

<style scoped>
.float-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #111827;
  background-color: #f9fafb;
}

.title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
}

.title::after {
  display: none;
}

section {
  background: #fff;
  padding: 1.2rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.control-panel {
  background: #fff;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #e5e7eb;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  box-shadow: none;
  transform: none;
}

button:hover:not(.active) {
  background-color: #f3f4f6;
}

.styled-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
}

.demo-container {
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  min-height: 250px;
  background: #fff;
}

.float-box {
  border: 2px solid #3b82f6;
  border-radius: 4px;
  padding: 1rem;
  cursor: move;
  position: relative;
  background-color: rgba(59, 130, 246, 0.1);
}

.float-box.right {
  border-color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
}

.size-display {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 0.8em;
  color: #64748b;
}

.content-flow {
  color: #374151;
  line-height: 1.6;
}

.clear-indicator {
  color: #16a34a;
  text-align: center;
  padding: 1rem 0 0 0;
  font-weight: bold;
  animation: none;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: white;
  padding: 1.2rem 1.5rem;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #e5e7eb;
}

.code-block {
  background: #1f2937;
  color: #e5e7eb;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
  font-size: 0.9em;
}

.pros h3 {
  color: #16a34a;
}

.cons h3 {
  color: #dc2626;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  position: relative;
  margin-bottom: 0.5rem;
  padding-left: 1.2em;
}

li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #9ca3af;
}

/* 清除浮动样式 */
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

.overflow {
  overflow: hidden;
}

.pseudo::after {
  content: '';
  display: block;
  clear: both;
}
</style>
