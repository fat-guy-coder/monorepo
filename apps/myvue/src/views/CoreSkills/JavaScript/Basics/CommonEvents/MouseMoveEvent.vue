<template>
  <div class="mouse-events-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>JavaScript鼠标事件详解</h1>
        <p class="subtitle">全面掌握鼠标交互的核心机制</p>
      </div>
      <div class="demo-area">
        <div
          class="interactive-box"
          ref="demoBox"
          @mousemove="handleMouseMove"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @click="handleClick"
          @dblclick="handleDblClick"
          @contextmenu="handleContextMenu"
          @wheel="handleWheel"
        >
          <div class="demo-instructions">
            <div class="instruction">在此区域体验各种鼠标事件</div>
            <div class="instruction">移动、点击、滚动、右键等操作</div>
          </div>

          <div class="position-tracker">
            <div class="position-label">X: {{ mousePosition.x }}</div>
            <div class="position-label">Y: {{ mousePosition.y }}</div>
          </div>

          <div
            class="draggable-box"
            :style="{
              top: draggablePosition.y + 'px',
              left: draggablePosition.x + 'px',
            }"
            @mousedown="startDrag"
          >
            拖拽我
          </div>

          <div class="event-log">
            <div class="log-title">事件日志</div>
            <div class="log-content">
              <div v-for="(event, index) in eventLog" :key="index" class="log-entry">
                <span class="event-type">{{ event.type }}</span>
                <span class="event-details">{{ event.details }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <section class="intro-section">
        <div class="intro-card">
          <h2>鼠标事件基础</h2>
          <p>
            鼠标事件是Web开发中最常用的事件类型之一，它们允许开发者响应用户与页面的交互。
            从简单的点击检测到复杂的拖拽操作，鼠标事件为创建丰富的用户界面提供了基础支持。
          </p>
          <div class="event-flow">
            <div class="flow-step">
              <div class="step-icon">1</div>
              <h3>用户操作</h3>
              <p>移动、点击或滚动鼠标</p>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">2</div>
              <h3>事件触发</h3>
              <p>浏览器生成对应事件</p>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">3</div>
              <h3>事件处理</h3>
              <p>执行绑定的事件处理函数</p>
            </div>
          </div>
        </div>
      </section>

      <section class="events-section">
        <h2 class="section-title">鼠标事件类型详解</h2>

        <div class="events-grid">
          <div
            v-for="(event, index) in mouseEvents"
            :key="index"
            class="event-card"
            :class="{ highlight: event.highlight }"
          >
            <div class="card-header">
              <div class="event-name">{{ event.name }}</div>
              <div class="event-tags">
                <span v-for="(tag, tagIndex) in event.tags" :key="tagIndex" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="card-body">
              <div class="description">
                {{ event.description }}
              </div>

              <div class="details">
                <h4>🎯 适用场景</h4>
                <div class="detail-item">
                  <ul>
                    <li v-for="(scenario, sIndex) in event.scenarios" :key="sIndex">
                      {{ scenario }}
                    </li>
                  </ul>
                </div>

                <div class="code-example">
                  <h4>代码示例</h4>
                  <pre><code>{{ event.code }}</code></pre>
                </div>
              </div>

              <div class="event-properties">
                <h4>事件对象常用属性</h4>
                <div class="properties-grid">
                  <div v-for="(prop, pIndex) in event.properties" :key="pIndex" class="property">
                    <div class="prop-name">{{ prop.name }}</div>
                    <div class="prop-desc">{{ prop.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">鼠标事件最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card" v-for="(practice, index) in bestPractices" :key="index">
            <div class="practice-number">{{ index + 1 }}</div>
            <div class="practice-content">
              <h3>{{ practice.title }}</h3>
              <p>{{ practice.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2 class="section-title">鼠标事件 vs 指针事件</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="col-criteria">特性</div>
            <div class="col-type">鼠标事件</div>
            <div class="col-type">指针事件</div>
          </div>
          <div class="table-row" v-for="(row, index) in comparisonData" :key="index">
            <div class="col-criteria">{{ row.criteria }}</div>
            <div class="col-type">{{ row.mouse }}</div>
            <div class="col-type">{{ row.pointer }}</div>
          </div>
        </div>
      </section>

      <section class="advanced-section">
        <h2 class="section-title">高级鼠标交互模式</h2>
        <div class="advanced-grid">
          <div class="pattern-card" v-for="(pattern, index) in advancedPatterns" :key="index">
            <div class="pattern-icon">{{ pattern.icon }}</div>
            <div class="pattern-content">
              <h3>{{ pattern.title }}</h3>
              <p>{{ pattern.description }}</p>
              <div class="pattern-example">
                <pre><code>{{ pattern.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>掌握鼠标事件是创建丰富交互体验的基础，合理使用可以显著提升用户体验</p>
      <div class="resources">
        <h3>推荐资源：</h3>
        <ul>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank"
              >MDN鼠标事件文档</a
            >
          </li>
          <li>
            <a href="https://javascript.info/mouse-events-basics" target="_blank"
              >JavaScript.info鼠标事件教程</a
            >
          </li>
          <li>
            <a href="https://www.w3.org/TR/pointerevents/" target="_blank">W3C指针事件规范</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 交互区域数据
const demoBox = ref<HTMLElement | null>(null)
const mousePosition = reactive({ x: 0, y: 0 })
const draggablePosition = reactive({ x: 100, y: 100 })
const isDragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })
const eventLog = ref<{ type: string; details: string }[]>([])

// 鼠标事件处理函数
const handleMouseMove = (e: MouseEvent) => {
  if (demoBox.value) {
    const rect = demoBox.value.getBoundingClientRect()
    mousePosition.x = e.clientX - rect.left
    mousePosition.y = e.clientY - rect.top

    logEvent('mousemove', `(${mousePosition.x}, ${mousePosition.y})`)
  }

  if (isDragging.value) {
    draggablePosition.x = e.clientX - dragStart.x
    draggablePosition.y = e.clientY - dragStart.y
  }
}

const handleMouseDown = (e: MouseEvent) => {
  logEvent('mousedown', `按钮: ${e.button}`)
}

const handleMouseUp = (e: MouseEvent) => {
  logEvent('mouseup', `按钮: ${e.button}`)
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove as any)
  document.removeEventListener('mouseup', handleMouseUp as any)
}

const handleMouseEnter = () => {
  logEvent('mouseenter', '鼠标进入区域')
}

const handleMouseLeave = () => {
  logEvent('mouseleave', '鼠标离开区域')
}

const handleClick = (e: MouseEvent) => {
  logEvent('click', `按钮: ${e.button}`)
}

const handleDblClick = () => {
  logEvent('dblclick', '双击事件')
}

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  logEvent('contextmenu', '右键菜单')
}

const handleWheel = (e: WheelEvent) => {
  const direction = e.deltaY > 0 ? '向下' : '向上'
  logEvent('wheel', `滚动方向: ${direction}`)
}

const startDrag = (e: MouseEvent) => {
  e.stopPropagation()
  isDragging.value = true
  dragStart.x = e.clientX - draggablePosition.x
  dragStart.y = e.clientY - draggablePosition.y

  document.addEventListener('mousemove', handleMouseMove as any)
  document.addEventListener('mouseup', handleMouseUp as any)
}

const logEvent = (type: string, details: string) => {
  // 限制日志数量
  if (eventLog.value.length > 10) {
    eventLog.value.pop()
  }

  eventLog.value.unshift({
    type,
    details,
  })
}

// 事件数据
const mouseEvents = ref([
  {
    name: 'click',
    highlight: true,
    tags: ['最常用', '交互'],
    description: '当鼠标指针在元素上点击（按下并释放）时触发。',
    scenarios: ['按钮点击操作', '导航菜单选择', '表单提交', '元素选择'],
    code: `// HTML
<button id="myButton">点击我</button>

// JavaScript
document.getElementById('myButton')
  .addEventListener('click', function(event) {
    console.log('按钮被点击!', event);
  });`,
    properties: [
      { name: 'clientX, clientY', description: '事件发生时鼠标在视口中的坐标' },
      { name: 'target', description: '事件最初发生的元素' },
      { name: 'button', description: '按下的鼠标按钮（0=左键,1=中键,2=右键）' },
    ],
  },
  {
    name: 'dblclick',
    tags: ['交互'],
    description: '当鼠标指针在元素上快速连续点击两次时触发。',
    scenarios: [
      '文件/项目打开操作',
      '文本编辑中的选择单词',
      '列表项展开/折叠',
      '媒体播放器播放/暂停',
    ],
    code: `// HTML
<div id="editable">双击编辑内容</div>

// JavaScript
document.getElementById('editable')
  .addEventListener('dblclick', function() {
    this.contentEditable = true;
    this.focus();
  });`,
    properties: [
      { name: 'detail', description: '记录连续点击次数（双击为2）' },
      { name: 'altKey', description: '事件发生时Alt键是否按下' },
      { name: 'ctrlKey', description: '事件发生时Ctrl键是否按下' },
    ],
  },
  {
    name: 'mousedown',
    tags: ['交互', '拖拽'],
    description: '当鼠标指针在元素上按下按钮时触发。',
    scenarios: ['拖拽操作的开始', '自定义按钮按下效果', '绘图应用的开始绘制', '游戏中的攻击/动作'],
    code: `// 开始拖拽操作
element.addEventListener('mousedown', (e) => {
  // 记录初始位置
  dragStartX = e.clientX;
  dragStartY = e.clientY;

  // 设置元素为可拖拽状态
  isDragging = true;
});`,
    properties: [
      { name: 'buttons', description: '按下的所有鼠标按钮的位掩码' },
      { name: 'relatedTarget', description: '对于mouseover/mouseout，表示相关元素' },
    ],
  },
  {
    name: 'mouseup',
    tags: ['交互', '拖拽'],
    description: '当鼠标指针在元素上释放按钮时触发。',
    scenarios: ['拖拽操作的结束', '自定义按钮释放效果', '绘图应用的结束绘制', '游戏中的释放动作'],
    code: `// 结束拖拽操作
element.addEventListener('mouseup', (e) => {
  if (isDragging) {
    // 执行拖拽结束逻辑
    isDragging = false;

    // 检查放置区域是否有效
    if (isValidDropTarget) {
      // 执行放置操作
    }
  }
});`,
    properties: [
      { name: 'button', description: '释放的鼠标按钮' },
      { name: 'shiftKey', description: '事件发生时Shift键是否按下' },
    ],
  },
  {
    name: 'mousemove',
    tags: ['跟踪', '拖拽'],
    description: '当鼠标指针在元素上移动时触发。',
    scenarios: [
      '鼠标位置跟踪',
      '拖拽操作中的元素移动',
      '绘图应用中的绘制',
      '游戏中的角色/视角移动',
    ],
    code: `// 跟踪鼠标位置
element.addEventListener('mousemove', (e) => {
  // 更新鼠标位置显示
  mouseX = e.clientX;
  mouseY = e.clientY;

  // 拖拽中更新元素位置
  if (isDragging) {
    element.style.left = \`\${e.clientX - offsetX}px\`;
    element.style.top = \`\${e.clientY - offsetY}px\`;
  }
});`,
    properties: [
      { name: 'movementX, movementY', description: '距离上一次事件的移动距离' },
      { name: 'pageX, pageY', description: '相对于整个文档的坐标' },
    ],
  },
  {
    name: 'mouseover',
    tags: ['悬停'],
    description: '当鼠标指针移动到元素或其子元素上时触发。',
    scenarios: ['显示工具提示', '悬停效果（颜色变化、动画）', '下拉菜单显示', '预览功能'],
    code: `// 显示工具提示
element.addEventListener('mouseover', (e) => {
  tooltip.style.display = 'block';
  tooltip.textContent = element.dataset.tooltip;

  // 定位工具提示
  positionTooltip(e.clientX, e.clientY);
});`,
    properties: [
      { name: 'relatedTarget', description: '鼠标来自的元素' },
      { name: 'layerX, layerY', description: '相对于当前层的坐标' },
    ],
  },
  {
    name: 'mouseout',
    tags: ['悬停'],
    description: '当鼠标指针离开元素或其子元素时触发。',
    scenarios: ['隐藏工具提示', '移除悬停效果', '关闭下拉菜单', '结束预览'],
    code: `// 隐藏工具提示
element.addEventListener('mouseout', (e) => {
  // 确保鼠标没有移动到工具提示上
  if (!tooltip.contains(e.relatedTarget)) {
    tooltip.style.display = 'none';
  }
});`,
    properties: [{ name: 'relatedTarget', description: '鼠标前往的元素' }],
  },
  {
    name: 'mouseenter',
    tags: ['悬停'],
    description: '当鼠标指针首次进入元素区域时触发（不冒泡）。',
    scenarios: ['精确的悬停检测', '性能敏感的悬停效果', '不需要冒泡的悬停场景'],
    code: `// 添加悬停类（性能优化）
element.addEventListener('mouseenter', () => {
  element.classList.add('hover');
});

// 使用CSS实现相同效果（推荐）
// .element:hover { ... }`,
    properties: [
      { name: 'bubbles', description: 'false - 不冒泡' },
      { name: 'composed', description: 'false - 不跨越Shadow DOM边界' },
    ],
  },
  {
    name: 'mouseleave',
    tags: ['悬停'],
    description: '当鼠标指针离开元素区域时触发（不冒泡）。',
    scenarios: ['精确的离开检测', '移除性能敏感的悬停效果', '不需要冒泡的离开场景'],
    code: `// 移除悬停类
element.addEventListener('mouseleave', () => {
  element.classList.remove('hover');
});`,
    properties: [{ name: 'bubbles', description: 'false - 不冒泡' }],
  },
  {
    name: 'contextmenu',
    tags: ['交互'],
    description: '当鼠标右键点击元素时触发，通常在显示上下文菜单前触发。',
    scenarios: ['自定义右键菜单', '禁用默认上下文菜单', '特殊上下文操作'],
    code: `// 显示自定义右键菜单
element.addEventListener('contextmenu', (e) => {
  // 阻止默认上下文菜单
  e.preventDefault();

  // 显示自定义菜单
  customMenu.style.left = \`\${e.clientX}px\`;
  customMenu.style.top = \`\${e.clientY}px\`;
  customMenu.style.display = 'block';
});`,
    properties: [{ name: 'defaultPrevented', description: '是否阻止了默认行为' }],
  },
  {
    name: 'wheel',
    tags: ['滚动'],
    description: '当鼠标滚轮在元素上滚动时触发。',
    scenarios: ['自定义滚动行为', '缩放功能实现', '水平滚动控制', '3D场景导航'],
    code: `// 自定义缩放功能
element.addEventListener('wheel', (e) => {
  e.preventDefault();

  // 计算缩放方向
  const delta = Math.sign(e.deltaY);
  const scaleFactor = delta > 0 ? 0.9 : 1.1;

  // 应用缩放
  currentScale *= scaleFactor;
  element.style.transform = \`scale(\${currentScale})\`;
});`,
    properties: [
      { name: 'deltaX, deltaY, deltaZ', description: '各方向上的滚动量' },
      { name: 'deltaMode', description: '滚动量单位（0=像素,1=行,2=页）' },
    ],
  },
])

const bestPractices = ref([
  {
    title: '使用事件委托',
    description: '对于大量相似元素，在父元素上使用事件委托减少事件监听器数量',
  },
  {
    title: '避免频繁操作DOM',
    description: '在mousemove事件中避免直接操作DOM，使用requestAnimationFrame优化性能',
  },
  {
    title: '合理使用mouseenter/mouseleave',
    description: '当不需要事件冒泡时使用mouseenter/mouseleave替代mouseover/mouseout',
  },
  {
    title: '考虑移动设备兼容性',
    description: '在移动设备上使用touch事件或指针事件作为后备',
  },
  {
    title: '提供键盘可访问性',
    description: '确保所有鼠标交互功能也可通过键盘操作实现',
  },
  {
    title: '节流高频事件',
    description: '对mousemove等高频事件使用节流(throttle)减少处理频率',
  },
])

const comparisonData = ref([
  { criteria: '设备支持', mouse: '仅鼠标', pointer: '鼠标、触摸、笔等' },
  { criteria: '事件类型', mouse: '特定设备事件', pointer: '统一指针事件' },
  { criteria: '多点触控', mouse: '不支持', pointer: '原生支持' },
  { criteria: '压力感应', mouse: '不支持', pointer: '支持（如笔压）' },
  { criteria: '浏览器支持', mouse: '所有浏览器', pointer: '现代浏览器' },
  { criteria: '使用建议', mouse: '简单场景', pointer: '复杂交互/跨设备' },
])

const advancedPatterns = ref([
  {
    icon: '🔄',
    title: '拖放(Drag & Drop)',
    description: '实现元素的拖拽和放置功能，结合mousedown、mousemove和mouseup事件',
    example: `// 开始拖拽
element.addEventListener('mousedown', (e) => {
  dragStart = { x: e.clientX, y: e.clientY };
  isDragging = true;
});

// 移动元素
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const dx = e.clientX - dragStart.x;
  const dy = e.clientY - dragStart.y;

  element.style.transform = \`translate(\${dx}px, \${dy}px)\`;
});

// 结束拖拽
document.addEventListener('mouseup', () => {
  isDragging = false;
});`,
  },
  {
    icon: '🎨',
    title: '绘图应用',
    description: '使用mousemove和mousedown实现画布绘图功能',
    example: `// 开始绘制
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

// 绘制路径
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

// 结束绘制
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});`,
  },
  {
    icon: '🎮',
    title: '游戏控制',
    description: '使用鼠标事件实现游戏角色控制和交互',
    example: `// 角色移动
gameArea.addEventListener('mousemove', (e) => {
  const rect = gameArea.getBoundingClientRect();
  player.x = e.clientX - rect.left - player.width/2;
  player.y = e.clientY - rect.top - player.height/2;
});

// 射击
gameArea.addEventListener('mousedown', (e) => {
  if (e.button === 0) { // 左键
    fireBullet(e.clientX, e.clientY);
  }
});`,
  },
  {
    icon: '📊',
    title: '数据可视化交互',
    description: '在图表中实现工具提示、数据点选择和缩放功能',
    example: `// 显示数据点详情
chart.addEventListener('mousemove', (e) => {
  const dataPoint = findNearestDataPoint(e.offsetX, e.offsetY);

  if (dataPoint) {
    tooltip.innerHTML = \`<strong>\${dataPoint.label}</strong>: \${dataPoint.value}\`;
    tooltip.style.display = 'block';
  } else {
    tooltip.style.display = 'none';
  }
});

// 缩放图表
chart.addEventListener('wheel', (e) => {
  e.preventDefault();
  zoomChart(e.deltaY < 0 ? 1.1 : 0.9);
});`,
  },
])

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove as any)
  document.removeEventListener('mouseup', handleMouseUp as any)
})
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #4a6cf7;
@primary-light: #e6eeff;
@secondary-color: #3a56d4;
@accent-color: #ff9800;
@text-color: #2c3e50;
@light-gray: #f8f9fc;
@border-color: #e0e6ed;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #4caf50;
@warning-color: #ffc107;

// 基础样式
.mouse-events-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  .title-wrapper {
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @secondary-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.3rem;
      color: #666;
      font-weight: 300;
    }
  }
}

.demo-area {
  max-width: 900px;
  margin: 0 auto;

  .interactive-box {
    position: relative;
    height: 400px;
    background: @light-gray;
    border-radius: 16px;
    border: 2px solid @primary-color;
    overflow: hidden;
    cursor: default;

    .demo-instructions {
      position: absolute;
      top: 20px;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 10;

      .instruction {
        font-size: 1.1rem;
        color: @primary-color;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
    }

    .position-tracker {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.9);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      box-shadow: @card-shadow;

      .position-label {
        font-family: 'Courier New', monospace;
        font-size: 0.95rem;
        color: @secondary-color;
      }
    }

    .draggable-box {
      position: absolute;
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      cursor: grab;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s;

      &:active {
        cursor: grabbing;
        transform: scale(0.95);
      }
    }

    .event-log {
      position: absolute;
      bottom: 20px;
      left: 20px;
      right: 20px;
      height: 120px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 8px;
      box-shadow: @card-shadow;
      overflow: hidden;

      .log-title {
        background: @primary-color;
        color: white;
        padding: 0.5rem 1rem;
        font-weight: 500;
      }

      .log-content {
        height: calc(100% - 36px);
        overflow-y: auto;
        padding: 0.5rem;

        .log-entry {
          padding: 0.5rem;
          border-bottom: 1px solid @border-color;
          display: flex;

          &:last-child {
            border-bottom: none;
          }

          .event-type {
            width: 120px;
            font-weight: 600;
            color: @secondary-color;
          }

          .event-details {
            flex: 1;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

.content {
  display: grid;
  gap: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, @primary-color, @accent-color);
    border-radius: 2px;
  }
}

.intro-section {
  .intro-card {
    background: @light-gray;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: @card-shadow;

    h2 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }

    p {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .event-flow {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1.5rem;

    .flow-step {
      flex: 1;
      min-width: 200px;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;

      .step-icon {
        width: 50px;
        height: 50px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }

      h3 {
        color: @primary-color;
        margin: 0.5rem 0;
        font-size: 1.3rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #666;
      }
    }

    .flow-arrow {
      display: flex;
      align-items: center;
      color: #777;
      font-weight: 700;
      min-width: 50px;
      text-align: center;
      font-size: 1.5rem;

      @media (max-width: 768px) {
        transform: rotate(90deg);
        margin: 1rem 0;
      }
    }
  }
}

.events-section {
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1.8rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .event-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    }

    &.highlight {
      border-top: 4px solid @accent-color;
    }

    .card-header {
      padding: 1.2rem 1.5rem;
      background: @primary-light;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .event-name {
        font-size: 1.4rem;
        font-weight: 700;
        color: @primary-color;
      }
    }

    .event-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      .tag {
        background: white;
        color: @primary-color;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid fade(@primary-color, 30%);
      }
    }

    .card-body {
      padding: 1.5rem;

      .description {
        margin-bottom: 1.5rem;
        font-size: 1rem;
        line-height: 1.7;
        color: #555;
      }

      .details {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
        }

        .detail-item {
          h4 {
            color: @secondary-color;
            margin-top: 0;
            margin-bottom: 0.8rem;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .detail-icon {
              font-size: 1.2rem;
            }
          }

          ul {
            padding-left: 1.5rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              font-size: 0.95rem;
              line-height: 1.6;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        .code-example {
          h4 {
            color: @secondary-color;
            margin-top: 0;
            margin-bottom: 0.8rem;
            font-size: 1.1rem;
          }

          pre {
            background: #2d2d2d;
            border-radius: 8px;
            padding: 1.2rem;
            overflow-x: auto;

            code {
              font-family: 'Courier New', monospace;
              color: #f8f8f2;
              font-size: 0.95rem;
              line-height: 1.6;

              .comment {
                color: #6a9955;
              }
              .keyword {
                color: #c586c0;
              }
              .function {
                color: #dcdcaa;
              }
              .string {
                color: #ce9178;
              }
            }
          }
        }
      }

      .event-properties {
        h4 {
          color: @secondary-color;
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.8rem;

          .property {
            background: @light-gray;
            border-radius: 6px;
            padding: 0.8rem;

            .prop-name {
              font-weight: 600;
              color: @primary-color;
              margin-bottom: 0.3rem;
              font-size: 0.9rem;
            }

            .prop-desc {
              font-size: 0.85rem;
              color: #666;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
}

.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .practice-card {
    display: flex;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .practice-number {
      width: 60px;
      min-height: 100%;
      background: @primary-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .practice-content {
      padding: 1.5rem;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.25rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }
  }
}

.comparison-section {
  .comparison-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;

    .table-header {
      display: flex;
      background: @primary-color;
      color: white;
      font-weight: 500;

      > div {
        padding: 1.2rem 1.5rem;
        flex: 1;
        text-align: center;
      }

      .col-criteria {
        flex: 1.5;
        text-align: left;
      }
    }

    .table-row {
      display: flex;
      border-bottom: 1px solid @border-color;

      &:nth-child(even) {
        background: @light-gray;
      }

      &:last-child {
        border-bottom: none;
      }

      > div {
        padding: 1.2rem 1.5rem;
        flex: 1;
        display: flex;
        align-items: center;
      }

      .col-criteria {
        flex: 1.5;
        font-weight: 500;
      }

      .col-type {
        text-align: center;
        justify-content: center;
      }
    }
  }
}

.advanced-section {
  .advanced-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .pattern-card {
    display: flex;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;
    gap: 1.2rem;
    border-top: 3px solid @primary-color;

    .pattern-icon {
      width: 50px;
      height: 50px;
      background: @primary-light;
      color: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .pattern-content {
      flex: 1;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }

      p {
        margin: 0 0 1rem;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }

    .pattern-example {
      background: #2d2d2d;
      border-radius: 6px;
      padding: 0.8rem;
      margin-top: 0.5rem;

      pre {
        margin: 0;

        code {
          font-family: 'Courier New', monospace;
          color: #f8f8f2;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.footer {
  margin-top: 4rem;
  padding: 2rem;
  text-align: center;
  background: @light-gray;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
  color: @secondary-color;
  box-shadow: @card-shadow;
  border-top: 2px solid fade(@primary-color, 30%);

  p {
    margin-bottom: 1.5rem;
  }

  .resources {
    margin-top: 1.5rem;

    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      li a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .mouse-events-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .intro-card {
    padding: 1.5rem !important;
  }

  .events-grid {
    grid-template-columns: 1fr !important;
  }

  .details {
    grid-template-columns: 1fr !important;
  }

  .interactive-box {
    height: 500px !important;
  }
}
</style>
