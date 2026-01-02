<template>
  <div class="drag-api-container">
    <header class="guide-header">
      <h1>HTML5 拖拽 API 基本指南</h1>
      <p>掌握现代 Web 应用中的拖拽交互实现</p>
    </header>

    <div class="content-wrapper">
      <!-- 导航 -->
      <nav class="navigation">
        <ul>
          <li v-for="section in sections" :key="section.id" @click="scrollToSection(section.id)">
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <!-- 内容区域 -->
      <div class="content">
        <!-- 介绍部分 -->
        <section id="introduction" class="guide-section">
          <h2>HTML5 拖拽 API 概述</h2>
          <div class="intro-content">
            <div class="intro-text">
              <p>
                HTML5 拖拽 API 允许开发者创建丰富的拖拽交互体验，无需依赖外部库。
                它提供了一套完整的事件系统和数据传递机制，可以轻松实现元素拖拽、文件上传和复杂界面交互。
              </p>
              <div class="feature-grid">
                <div class="feature-card">
                  <div class="feature-icon">📦</div>
                  <h3>原生支持</h3>
                  <p>现代浏览器内置支持，无需额外库</p>
                </div>
                <div class="feature-card">
                  <div class="feature-icon">🔄</div>
                  <h3>数据传递</h3>
                  <p>可在拖拽过程中传递复杂数据</p>
                </div>
                <div class="feature-card">
                  <div class="feature-icon">🎨</div>
                  <h3>视觉反馈</h3>
                  <p>自定义拖拽图像和放置区域样式</p>
                </div>
              </div>
            </div>
            <div class="demo-area">
              <div class="drag-demo">
                <div
                  class="draggable-item"
                  draggable="true"
                  @dragstart="handleDragStart"
                  @dragend="handleDragEnd"
                >
                  <div class="drag-handle">≡</div>
                  <div>拖拽我</div>
                </div>
                <div
                  class="drop-zone"
                  @dragover="handleDragOver"
                  @dragenter="handleDragEnter"
                  @dragleave="handleDragLeave"
                  @drop="handleDrop"
                >
                  <div v-if="!droppedItem">放置区域</div>
                  <div v-else class="dropped-item">
                    <div class="drag-handle">≡</div>
                    <div>已放置元素</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 核心事件 -->
        <section id="core-events" class="guide-section">
          <h2>核心事件系统</h2>

          <div class="events-grid">
            <div class="event-card">
              <h3>拖拽源事件</h3>
              <div class="event-list">
                <div class="event-item">
                  <div class="event-name">dragstart</div>
                  <div class="event-desc">当用户开始拖动元素时触发</div>
                </div>
                <div class="event-item">
                  <div class="event-name">drag</div>
                  <div class="event-desc">在拖动元素过程中持续触发</div>
                </div>
                <div class="event-item">
                  <div class="event-name">dragend</div>
                  <div class="event-desc">当拖动操作结束时触发</div>
                </div>
              </div>
            </div>

            <div class="event-card">
              <h3>放置目标事件</h3>
              <div class="event-list">
                <div class="event-item">
                  <div class="event-name">dragenter</div>
                  <div class="event-desc">当拖动的元素进入有效放置目标时触发</div>
                </div>
                <div class="event-item">
                  <div class="event-name">dragover</div>
                  <div class="event-desc">当拖动的元素在放置目标上移动时持续触发</div>
                </div>
                <div class="event-item">
                  <div class="event-name">dragleave</div>
                  <div class="event-desc">当拖动的元素离开放置目标时触发</div>
                </div>
                <div class="event-item">
                  <div class="event-name">drop</div>
                  <div class="event-desc">当元素被放置到目标区域时触发</div>
                </div>
              </div>
            </div>

            <div class="event-card">
              <h3>事件生命周期</h3>
              <div class="event-flow">
                <div class="flow-item">1. dragstart</div>
                <div class="flow-arrow">↓</div>
                <div class="flow-item">2. dragenter (目标)</div>
                <div class="flow-arrow">↓</div>
                <div class="flow-item">3. dragover (目标)</div>
                <div class="flow-arrow">↓</div>
                <div class="flow-item">4. drop (目标) 或 dragleave (目标)</div>
                <div class="flow-arrow">↓</div>
                <div class="flow-item">5. dragend</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 基本实现 -->
        <section id="basic-implementation" class="guide-section">
          <h2>基本实现</h2>

          <div class="implementation-steps">
            <div class="step-card">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>使元素可拖拽</h3>
                <p>添加 draggable 属性并处理 dragstart 事件</p>
                <pre class="code-block">
&lt;div
  draggable="true"
  @dragstart="handleDragStart"
&gt;
  可拖拽元素
&lt;/div&gt;

// 处理拖拽开始事件
const handleDragStart = (e: DragEvent) => {
  // 设置拖拽数据
  e.dataTransfer?.setData('text/plain', '自定义数据');

  // 设置拖拽图像
  const dragImage = e.target as HTMLElement;
  e.dataTransfer?.setDragImage(dragImage, 0, 0);
};</pre
                >
              </div>
            </div>

            <div class="step-card">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>创建放置区域</h3>
                <p>处理放置区域相关事件</p>
                <pre class="code-block">
&lt;div
  class="drop-zone"
  @dragover="handleDragOver"
  @dragenter="handleDragEnter"
  @dragleave="handleDragLeave"
  @drop="handleDrop"
&gt;
  放置区域
&lt;/div&gt;

// 处理拖拽悬停事件 - 必须阻止默认行为
const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

// 处理放置事件
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  const data = e.dataTransfer?.getData('text/plain');
  console.log('接收到的数据:', data);
};</pre
                >
              </div>
            </div>

            <div class="step-card">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>完整 Vue 组件示例</h3>
                <p>使用 Composition API 实现的拖拽组件</p>
                <pre class="code-block">
&lt;template&gt;
  &lt;div class="drag-container"&gt;
    &lt;div
      v-for="item in items"
      :key="item.id"
      draggable="true"
      @dragstart="dragStart(item.id)"
      @dragend="dragEnd"
      class="draggable-item"
    &gt;
    &#123;&#123; item.content &#125;&#125;
    &lt;/div&gt;

    &lt;div
      class="drop-zone"
      @dragover.prevent
      @dragenter="dragEnter"
      @dragleave="dragLeave"
      @drop="drop"
    &gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue';

const items = ref([
  { id: 1, content: '项目 1' },
  { id: 2, content: '项目 2' },
  { id: 3, content: '项目 3' },
]);

let draggedItemId: number | null = null;

const dragStart = (id: number) => {
  draggedItemId = id;
};

const dragEnd = () => {
  draggedItemId = null;
};

const dragEnter = (e: DragEvent) => {
  (e.target as HTMLElement).classList.add('drag-over');
};

const dragLeave = (e: DragEvent) => {
  (e.target as HTMLElement).classList.remove('drag-over');
};

const drop = () => {
  if (draggedItemId !== null) {
    console.log(`项目 ${draggedItemId} 被放置`);
  }
};
&lt;/script&gt;</pre
                >
              </div>
            </div>
          </div>
        </section>

        <!-- 拖拽排序 -->
        <section id="drag-sorting" class="guide-section">
          <h2>拖拽排序实现</h2>

          <div class="sorting-content">
            <div class="sorting-demo">
              <div class="sortable-list">
                <div
                  v-for="(item, index) in sortableItems"
                  :key="item.id"
                  draggable="true"
                  class="sortable-item"
                  :class="{ dragging: currentDragIndex === index }"
                  @dragstart="startSorting(index)"
                  @dragover="handleSortOver(index, $event)"
                  @dragenter.prevent
                  @dragend="endSorting"
                  @drop="handleDrop"
                >
                  <div class="item-handle">≡</div>
                  <div class="item-content">{{ item.content }}</div>
                  <div class="item-index">#{{ index + 1 }}</div>
                </div>
              </div>
            </div>

            <div class="sorting-code">
              <h3>拖拽排序核心逻辑</h3>
              <pre class="code-block">
const sortableItems = ref([
  { id: 1, content: '任务 1' },
  { id: 2, content: '任务 2' },
  { id: 3, content: '任务 3' },
  { id: 4, content: '任务 4' },
]);

let currentDragIndex = ref(-1);
let draggedItem: any = null;

const startSorting = (index: number) => {
  currentDragIndex.value = index;
  draggedItem = sortableItems.value[index];
  event.dataTransfer?.setData('text/plain', index.toString());
  event.dataTransfer.effectAllowed = 'move';
};

const handleSortOver = (index: number, event: DragEvent) => {
  event.preventDefault();

  // 只处理不同位置的拖拽
  if (currentDragIndex.value !== index) {
    const items = [...sortableItems.value];
    const dragged = items[currentDragIndex.value];

    // 移除被拖拽的元素
    items.splice(currentDragIndex.value, 1);
    // 插入到新位置
    items.splice(index, 0, dragged);

    sortableItems.value = items;
    currentDragIndex.value = index;
  }
};

const endSorting = () => {
  currentDragIndex.value = -1;
};</pre
              >
            </div>
          </div>
        </section>

        <!-- 文件拖拽上传 -->
        <section id="file-upload" class="guide-section">
          <h2>文件拖拽上传</h2>

          <div class="file-upload-demo">
            <div
              class="upload-zone"
              :class="{ active: isUploadZoneActive }"
              @dragover.prevent="activateUploadZone"
              @dragenter.prevent="activateUploadZone"
              @dragleave="deactivateUploadZone"
              @drop="handleFileDrop"
            >
              <div class="upload-icon">📤</div>
              <div class="upload-text">
                <p>拖拽文件到此处上传</p>
                <p class="hint">支持多个文件同时上传</p>
              </div>
            </div>

            <div class="file-list" v-if="uploadedFiles.length > 0">
              <div class="file-item" v-for="(file, index) in uploadedFiles" :key="index">
                <div class="file-icon">
                  <span v-if="file.type.startsWith('image/')">🖼️</span>
                  <span v-else>📄</span>
                </div>
                <div class="file-info">
                  <div class="file-name">{{ file.name }}</div>
                  <div class="file-size">{{ formatFileSize(file.size) }}</div>
                </div>
                <div class="file-actions">
                  <button @click="removeFile(index)">删除</button>
                </div>
              </div>
            </div>
          </div>

          <div class="file-upload-code">
            <pre class="code-block">
&lt;div
  class="upload-zone"
  @dragover.prevent="isUploadZoneActive = true"
  @dragenter.prevent="isUploadZoneActive = true"
  @dragleave="isUploadZoneActive = false"
  @drop="handleFileDrop"
&gt;
  拖拽文件到此处
&lt;/div&gt;

const isUploadZoneActive = ref(false);
const uploadedFiles = ref&lt;File[]&gt;([]);

const handleFileDrop = (e: DragEvent) => {
  e.preventDefault();
  isUploadZoneActive.value = false;

  if (e.dataTransfer?.files) {
    const files = Array.from(e.dataTransfer.files);

    // 过滤文件类型
    const validFiles = files.filter(file =>
      file.type.startsWith('image/') ||
      file.type === 'application/pdf'
    );

    uploadedFiles.value = [...uploadedFiles.value, ...validFiles];
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
};</pre
            >
          </div>
        </section>

        <!-- 性能优化 -->
        <section id="optimization" class="guide-section">
          <h2>性能优化与最佳实践</h2>

          <div class="optimization-grid">
            <div class="optimization-card">
              <h3>⚡ 减少重排重绘</h3>
              <ul>
                <li>使用 transform 代替 top/left 定位</li>
                <li>避免在 dragover 中修改 DOM 结构</li>
                <li>使用虚拟列表处理大量可拖拽元素</li>
              </ul>
            </div>

            <div class="optimization-card">
              <h3>🎯 事件处理优化</h3>
              <ul>
                <li>使用事件委托减少事件监听器</li>
                <li>节流 dragover 事件处理</li>
                <li>避免在频繁事件中执行复杂操作</li>
              </ul>
            </div>

            <div class="optimization-card">
              <h3>✨ 用户体验增强</h3>
              <ul>
                <li>提供清晰的拖拽视觉反馈</li>
                <li>添加放置区域高亮效果</li>
                <li>实现平滑的动画过渡</li>
                <li>提供触摸设备支持</li>
              </ul>
            </div>
          </div>

          <div class="advanced-optimization">
            <h3>高级优化技巧</h3>
            <pre class="code-block">
// 使用 CSS contain 属性优化性能
.draggable-item {
  contain: strict;
}

// 使用 requestAnimationFrame 优化拖拽动画
let lastTime = 0;
const handleDrag = (e: DragEvent) => {
  const now = Date.now();
  if (now - lastTime > 16) { // 约60fps
    updatePosition(e);
    lastTime = now;
  }
};

// 使用 Web Workers 处理复杂数据
if (window.Worker) {
  const worker = new Worker('drag-worker.js');
  worker.postMessage({ action: 'processDragData', data: largeDataSet });
}</pre
            >
          </div>
        </section>

        <!-- 浏览器兼容性 -->
        <section id="compatibility" class="guide-section">
          <h2>浏览器兼容性与注意事项</h2>

          <div class="compatibility-content">
            <div class="browser-support">
              <h3>浏览器支持情况</h3>
              <div class="support-table">
                <div class="support-row">
                  <div class="browser">Chrome</div>
                  <div class="version">4+</div>
                  <div class="status full">完全支持</div>
                </div>
                <div class="support-row">
                  <div class="browser">Firefox</div>
                  <div class="version">3.5+</div>
                  <div class="status full">完全支持</div>
                </div>
                <div class="support-row">
                  <div class="browser">Safari</div>
                  <div class="version">6+</div>
                  <div class="status partial">部分支持</div>
                </div>
                <div class="support-row">
                  <div class="browser">Edge</div>
                  <div class="version">12+</div>
                  <div class="status full">完全支持</div>
                </div>
                <div class="support-row">
                  <div class="browser">IE</div>
                  <div class="version">10+</div>
                  <div class="status partial">部分支持</div>
                </div>
              </div>
            </div>

            <div class="considerations">
              <h3>重要注意事项</h3>
              <ul>
                <li>在 dragover 事件中必须调用 preventDefault() 才能触发 drop 事件</li>
                <li>移动设备支持有限，需添加触摸事件处理</li>
                <li>某些浏览器对拖拽文件有限制（如 Safari）</li>
                <li>安全限制：跨域拖拽数据访问受限</li>
                <li>使用 dataTransfer 传递复杂数据需序列化/反序列化</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 总结 -->
        <section id="conclusion" class="guide-section">
          <h2>总结</h2>

          <div class="conclusion-content">
            <div class="key-points">
              <h3>核心要点</h3>
              <ul>
                <li>HTML5 拖拽 API 提供强大的原生拖拽功能</li>
                <li>理解拖拽生命周期和事件流是成功实现的关键</li>
                <li>合理使用 dataTransfer 对象传递数据</li>
                <li>提供视觉反馈增强用户体验</li>
                <li>针对性能关键点进行优化</li>
              </ul>
            </div>

            <div class="resources">
              <h3>学习资源</h3>
              <ul>
                <li>
                  <a
                    href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API"
                    target="_blank"
                    >MDN 拖拽 API 文档</a
                  >
                </li>
                <li>
                  <a href="https://html.spec.whatwg.org/multipage/dnd.html" target="_blank"
                    >HTML 拖拽规范</a
                  >
                </li>
                <li>
                  <a href="https://www.w3schools.com/html/html5_draganddrop.asp" target="_blank"
                    >W3Schools 拖拽教程</a
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="final-note">
            <p>
              HTML5 拖拽 API 为现代 Web
              应用提供了强大的交互能力。通过合理使用事件系统和性能优化技巧，
              开发者可以创建流畅、直观的拖拽体验。虽然在某些复杂场景下可能需要使用第三方库， 但原生
              API 在大多数情况下已经足够强大且高效。
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航部分
const sections = ref([
  { id: 'introduction', title: '介绍' },
  { id: 'core-events', title: '核心事件' },
  { id: 'basic-implementation', title: '基本实现' },
  { id: 'drag-sorting', title: '拖拽排序' },
  { id: 'file-upload', title: '文件上传' },
  { id: 'optimization', title: '性能优化' },
  { id: 'compatibility', title: '兼容性' },
  { id: 'conclusion', title: '总结' },
])

// 拖拽状态
const droppedItem = ref(false)
const isUploadZoneActive = ref(false)
const uploadedFiles = ref<File[]>([])

// 拖拽排序示例数据
const sortableItems = ref([
  { id: 1, content: '设计首页布局' },
  { id: 2, content: '实现用户认证' },
  { id: 3, content: '开发购物车功能' },
  { id: 4, content: '编写单元测试' },
])
const currentDragIndex = ref(-1)

// 滚动到指定部分
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 基本拖拽处理函数
const handleDragStart = (e: DragEvent) => {
  e.dataTransfer?.setData('text/plain', 'demo-item')
  ;(e.target as HTMLElement).classList.add('dragging')
}

const handleDragEnd = (e: DragEvent) => {
  ;(e.target as HTMLElement).classList.remove('dragging')
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}

const handleDragEnter = (e: DragEvent) => {
  ;(e.target as HTMLElement).classList.add('drag-over')
}

const handleDragLeave = (e: DragEvent) => {
  ;(e.target as HTMLElement).classList.remove('drag-over')
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  ;(e.target as HTMLElement).classList.remove('drag-over')
  droppedItem.value = true
}

// 拖拽排序处理函数
const startSorting = (index: number) => {
  currentDragIndex.value = index
}

const handleSortOver = (index: number, e: DragEvent) => {
  e.preventDefault()

  if (currentDragIndex.value !== index) {
    const items = [...sortableItems.value]
    const [dragged] = items.splice(currentDragIndex.value, 1)
    items.splice(index, 0, dragged)

    sortableItems.value = items
    currentDragIndex.value = index
  }
}

const endSorting = () => {
  currentDragIndex.value = -1
}

// 文件上传处理函数
const activateUploadZone = (e: DragEvent) => {
  e.preventDefault()
  isUploadZoneActive.value = true
}

const deactivateUploadZone = () => {
  isUploadZoneActive.value = false
}

const handleFileDrop = (e: DragEvent) => {
  e.preventDefault()
  isUploadZoneActive.value = false

  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    const files = Array.from(e.dataTransfer.files)
    uploadedFiles.value = [...uploadedFiles.value, ...files.slice(0, 3)]
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}
</script>

<style scoped lang="less">
@primary-color: #4a7bf7;
@secondary-color: #6c5ce7;
@text-color: #2d3436;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@code-bg: #f5f7fa;
@code-border: #e0e0e0;
@success-color: #2ecc71;
@warning-color: #f39c12;
@error-color: #e74c3c;

.drag-api-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.guide-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.content-wrapper {
  display: flex;
  gap: 2rem;
}

.navigation {
  flex: 0 0 200px;
  position: sticky;
  top: 2rem;
  height: fit-content;
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.8rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background: lighten(@primary-color, 40%);
        color: @primary-color;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
}

.content {
  flex: 1;
}

.guide-section {
  margin-bottom: 3rem;

  h2 {
    color: @secondary-color;
    font-size: 1.8rem;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid lighten(@secondary-color, 40%);
  }
}

.intro-content {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;

  .intro-text {
    flex: 1;

    p {
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
  }

  .demo-area {
    flex: 0 0 300px;
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: @card-shadow;

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }

  p {
    font-size: 0.9rem;
    color: lighten(@text-color, 20%);
    margin: 0;
  }
}

.drag-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: @card-shadow;

  .draggable-item,
  .dropped-item {
    padding: 1rem;
    background: @primary-color;
    color: white;
    border-radius: 6px;
    cursor: grab;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;

    &:active {
      cursor: grabbing;
    }

    &.dragging {
      opacity: 0.6;
    }

    .drag-handle {
      margin-right: 0.8rem;
      font-size: 1.2rem;
      cursor: move;
    }
  }

  .drop-zone {
    min-height: 120px;
    border: 2px dashed @border-color;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &.drag-over {
      border-color: @primary-color;
      background: lighten(@primary-color, 45%);
    }

    .dropped-item {
      background: @success-color;
    }
  }
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.event-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    margin-top: 0;
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }
}

.event-list {
  .event-item {
    padding: 1rem 0;
    border-bottom: 1px solid @light-bg;

    &:last-child {
      border-bottom: none;
    }

    .event-name {
      font-weight: 600;
      color: @secondary-color;
    }

    .event-desc {
      font-size: 0.9rem;
      color: lighten(@text-color, 20%);
    }
  }
}

.event-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;

  .flow-item {
    background: @light-bg;
    padding: 0.8rem;
    border-radius: 6px;
    width: 100%;
    text-align: center;
  }

  .flow-arrow {
    font-size: 1.2rem;
    color: @primary-color;
  }
}

.implementation-steps {
  margin-top: 1.5rem;
}

.step-card {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  .step-number {
    flex: 0 0 40px;
    height: 40px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .step-content {
    flex: 1;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }
  }
}

.code-block {
  display: block;
  background: @code-bg;
  color: @text-color;
  border-radius: 6px;
  padding: 1.2rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin: 1rem 0 0;
  line-height: 1.5;
  border: 1px solid @code-border;
  border-left: 3px solid @primary-color;
}

.sorting-content {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;

  .sorting-demo {
    flex: 1;
  }

  .sorting-code {
    flex: 1;
  }
}

.sortable-list {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
}

.sortable-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  margin-bottom: 0.8rem;
  background: @light-bg;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: grab;

  &:last-child {
    margin-bottom: 0;
  }

  &.dragging {
    background: lighten(@primary-color, 40%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .item-handle {
    margin-right: 0.8rem;
    font-size: 1.2rem;
    cursor: move;
    color: #777;
  }

  .item-content {
    flex: 1;
  }

  .item-index {
    background: @primary-color;
    color: white;
    border-radius: 12px;
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
  }
}

.file-upload-demo {
  margin-top: 1.5rem;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
}

.upload-zone {
  border: 2px dashed @border-color;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &.active {
    border-color: @primary-color;
    background: lighten(@primary-color, 45%);
  }

  .upload-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .upload-text {
    font-size: 1.1rem;

    .hint {
      font-size: 0.9rem;
      color: #777;
      margin-top: 0.5rem;
    }
  }
}

.file-list {
  margin-top: 1.5rem;

  .file-item {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-bottom: 1px solid @light-bg;

    &:last-child {
      border-bottom: none;
    }

    .file-icon {
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    .file-info {
      flex: 1;

      .file-name {
        font-weight: 500;
      }

      .file-size {
        font-size: 0.8rem;
        color: #777;
      }
    }

    .file-actions button {
      background: @error-color;
      color: white;
      border: none;
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
    }
  }
}

.file-upload-code {
  margin-top: 1.5rem;
}

.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.optimization-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.advanced-optimization {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    margin-top: 0;
    color: @primary-color;
  }
}

.compatibility-content {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;

  .browser-support,
  .considerations {
    flex: 1;
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: @card-shadow;
  }
}

.support-table {
  .support-row {
    display: flex;
    padding: 0.8rem 0;
    border-bottom: 1px solid @light-bg;

    &:last-child {
      border-bottom: none;
    }

    .browser {
      flex: 1;
      font-weight: 500;
    }

    .version {
      flex: 0 0 80px;
      text-align: right;
    }

    .status {
      flex: 0 0 120px;
      text-align: right;
      font-weight: 500;

      &.full {
        color: @success-color;
      }

      &.partial {
        color: @warning-color;
      }
    }
  }
}

.considerations {
  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;
    }
  }
}

.conclusion-content {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;

  .key-points,
  .resources {
    flex: 1;
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: @card-shadow;

    h3 {
      margin-top: 0;
      color: @primary-color;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @light-bg;
    }
  }
}

.final-note {
  background: lighten(@primary-color, 48%);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 4px solid @primary-color;

  p {
    line-height: 1.6;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .navigation {
    position: static;
    margin-bottom: 1.5rem;
  }

  .intro-content,
  .sorting-content,
  .compatibility-content {
    flex-direction: column;
  }
}
</style>
